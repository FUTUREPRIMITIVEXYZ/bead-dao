import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import {alchemyService as alchemy} from "@/services/alchemy-service";
import { orderBy } from "lodash";
import lizardAccounts from "../../../public/lizardAccounts.json";

const governanceBoardHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const lizardOwners = await alchemy.nft.getOwnersForContract(
    process.env.NEXT_PUBLIC_LIZARD_NFT_ADDRESS!,
    { withTokenBalances: true }
  );

  const ownersWithAccounts = lizardOwners.owners.map((owner) => {
    const tokenId = ethers.BigNumber.from(
      owner.tokenBalances[0].tokenId
    ).toNumber();

    const account = lizardAccounts[tokenId - 1];

    return { owner: owner.ownerAddress, tokenId, account };
  });

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
