import { NextApiRequest, NextApiResponse } from "next";
import { Alchemy, Network, Contract } from "alchemy-sdk";
import { createClient } from "@supabase/supabase-js";

type AccountRequest = {
  address: string;
  tokenId: string;
};

const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, tokenId } = req.query as AccountRequest;

  const provider = await alchemy.config.getProvider();

  const registry = "0xc49B4a8368B545DECeE584258343bE469E65EAc6";

  const accountRegistry = new Contract(
    registry,
    ["function account(address, uint256) returns (address)"],
    provider
  );

  const account = await accountRegistry.callStatic.account(address, tokenId);

  await supabase
    .from("account")
    .upsert({ address: account, registry, tokenContract: address, tokenId });

  return res.json({ account, tokenContract: address, tokenId });
};

export default handler;
