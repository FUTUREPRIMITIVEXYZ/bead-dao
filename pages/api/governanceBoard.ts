import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import supabase from "../../utils/supabase";
import alchemy from "../../utils/alchemy";

const contractAddress = process.env.NEXT_PUBLIC_LIZARD_NFT_ADDRESS || "";

const governanceBoardHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { data } = await supabase
      .from("lizards")
      .select("tokenId, beadCount")
      .eq("tokenContract", ethers.utils.getAddress(contractAddress));

    if (!data) {
      return res.json([]);
    }

    const response = await Promise.all(
      data.map((row) => alchemy.nft.getOwnersForNft(contractAddress, 1))
    );

    response[0].owners[0];

    const output = data.map((row, i) => ({
      account: response[i].owners[0],
      balance: row.beadCount,
      tokenId: row.tokenId,
    }));

    return res.json(output);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server failed" });
  }
};

export default governanceBoardHandler;
