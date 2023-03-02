import { NextApiRequest, NextApiResponse } from "next";
import { GetNftsForContractOptions } from "alchemy-sdk";
import { ethers } from "ethers";
import supabase from "../../utils/supabase";

import alchemy from "../../utils/alchemy";

const provider = new ethers.providers.AlchemyProvider(
  "goerli",
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!
);

const votingWeightsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const lizardz = await alchemy.nft.getNftsForContract(
    process.env.NEXT_PUBLIC_LIZARD_NFT_ADDRESS!,
    {
      pageSize: 10000,
    }
  );

  const promises = lizardz.nfts.map(async (nft) => {
    const registry = "0xc49B4a8368B545DECeE584258343bE469E65EAc6";

    const accountRegistry = new ethers.Contract(
      registry,
      ["function account(address, uint256) returns (address)"],
      provider
    );

    const account = await accountRegistry.callStatic.account(
      ethers.utils.getAddress(nft.contract.address),
      nft.tokenId
    );

    console.log(account);

    return { ...nft, account };
  });

  const nftsWithAccounts = await Promise.all(promises);

  console.log(nftsWithAccounts);

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

  console.log(beadzByTokenBoundAccount);

  const votingWeights = nftsWithAccounts.map((nft) => {
    return {
      [nft.tokenId]: beadzByTokenBoundAccount[nft.account],
    };
  });

  return res.json(votingWeights);
};

export default votingWeightsHandler;
