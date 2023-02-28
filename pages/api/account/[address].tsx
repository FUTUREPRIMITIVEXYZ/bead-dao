import { NextApiRequest, NextApiResponse } from "next";
import { Alchemy, Network, Contract } from "alchemy-sdk";
import { createClient } from "@supabase/supabase-js";

type AccountRequest = {
  address: string;
};

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query as AccountRequest;

  const registry = "0xc49B4a8368B545DECeE584258343bE469E65EAc6";

  const { data, error } = await supabase
    .from("account")
    .select("address, tokenContract, tokenId")
    .eq("address", address)
    .eq("registry", registry)
    .single();

  if (error) {
    return res.status(404).json({ error: "Not found" });
  }

  return res.json(data);
};

export default handler;
