import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../utils/supabase";

const votingWeightsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { data, error } = await supabase.from("lizards").select();

  const weights = data?.map((token) => ({ [token.tokenId]: token.beadCount }));

  if (!weights) {
    return res.status(500).json([]);
  }

  console.log(weights);

  return res.json(weights);
};

export default votingWeightsHandler;
