import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import supabase from "../../utils/supabase";
import alchemy from "../../utils/alchemy";
import { orderBy } from "lodash";

const provider = new ethers.providers.AlchemyProvider(
  "goerli",
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!
);

const governanceBoardHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const lizardOwners = await alchemy.nft.getOwnersForContract(
    process.env.NEXT_PUBLIC_LIZARD_NFT_ADDRESS!,
    { withTokenBalances: true }
  );

  const promises = lizardOwners.owners.map(async (owner) => {
    const registry = "0xc49B4a8368B545DECeE584258343bE469E65EAc6";

    const accountRegistry = new ethers.Contract(
      registry,
      ["function account(address, uint256) returns (address)"],
      provider
    );

    const tokenId = ethers.BigNumber.from(
      owner.tokenBalances[0].tokenId
    ).toNumber();

    const account = await accountRegistry.callStatic.account(
      process.env.NEXT_PUBLIC_LIZARD_NFT_ADDRESS!,
      tokenId
    );

    return { owner: owner.ownerAddress, tokenId, account };
  });

  const ownersWithAccounts = await Promise.all(promises);

  const beadz = await alchemy.nft.getOwnersForContract(
    process.env.NEXT_PUBLIC_BEADZ_NFT_ADDRESS!,
    { withTokenBalances: true }
  );

  const beadzByTokenBoundAccount: { [key: string]: number } =
    beadz.owners.reduce((acc, current) => {
      return {
        ...acc,
        [ethers.utils.getAddress(current.ownerAddress)]:
          current.tokenBalances[0].balance,
      };
    }, {});

  const governance = ownersWithAccounts.map((nft) => {
    return {
      account: nft.owner,
      balance: beadzByTokenBoundAccount[nft.account],
      tokenId: nft.tokenId,
    };
  });

  const sortedGovernance = orderBy(governance, "balance", "desc");

  return res.json(sortedGovernance);
};

export default governanceBoardHandler;
