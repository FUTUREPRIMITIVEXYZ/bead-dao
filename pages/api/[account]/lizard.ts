import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import supabase from "../../../utils/supabase";
import alchemy from "../../../utils/alchemy";

const votingWeightsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { account } = req.query;

  const nfts = await alchemy.nft.getNftsForOwner(account, {
    contractAddresses: [process.env.NEXT_PUBLIC_LIZARD_NFT_ADDRESS!],
  });

  const lizard = nfts.ownedNfts[0];

  const { data } = await supabase
    .from("lizards")
    .select()
    .eq("tokenContract", ethers.utils.getAddress(lizard.contract.address))
    .eq("tokenId", lizard.tokenId)
    .single();

  return res.json(data);
};

export default votingWeightsHandler;
