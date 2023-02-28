import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import supabase from "../../../utils/supabase";
import alchemy from "../../../utils/alchemy";

const votingWeightsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { account } = req.query;
  if (!account) {
    return res.status(400).json({ error: "account is required" });
  }

  const accountToFetch = Array.isArray(account) ? account[0] : account;

  const nfts = await alchemy.nft.getNftsForOwner(accountToFetch, {
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
