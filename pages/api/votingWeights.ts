import { NextApiRequest, NextApiResponse } from "next";
import { GetNftsForContractOptions } from "alchemy-sdk";
import supabase from "../../utils/supabase";

import alchemy from "../../utils/alchemy";

const votingWeightsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { nfts } = await alchemy.nft.getNftsForContract(
    "0x07F884bFBB6B8e440e746543b4BE87737121A085",
    {
      pageSize: 10000,
    }
  );

  const votingWeightsDummy = nfts.map((nft) => ({ [nft.tokenId]: 1 }));

  console.log(nfts);
  console.log(votingWeightsDummy);

  // const { data, error } = await supabase.from("lizards").select();
  //
  // const weights = data?.map((token) => ({ [token.tokenId]: token.beadCount }));
  //
  // if (!weights) {
  //   return res.status(500).json([]);
  // }
  //
  // console.log(weights);

  return res.json(votingWeightsDummy);
};

export default votingWeightsHandler;
