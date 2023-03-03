import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";

import alchemy from "../../utils/alchemy";
import lizardAccounts from "../../public/lizardAccounts.json";

const votingWeightsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
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

  const votingWeights = lizardAccounts.map((account, index) => {
    return {
      [index + 1]: beadzByTokenBoundAccount[account],
    };
  });

  return res.json(votingWeights);
};

export default votingWeightsHandler;
