import { NextApiRequest, NextApiResponse } from "next";
import {
  DefenderRelaySigner,
  DefenderRelayProvider,
} from "defender-relay-client/lib/ethers";
import { BigNumber, ethers } from "ethers";
// import supabase from "@/utils/supabase";
import {alchemyService as alchemy} from "@/services/alchemy-service";
import { add } from "date-fns";

type ClaimRequest = {
  recipient: string;
  keyAddress: string;
};

const claimHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { recipient, keyAddress } = req.body as ClaimRequest;

  console.log(req.body);

  const relayerCredentials = {
    apiKey: process.env.RELAYER_API_KEY!,
    apiSecret: process.env.RELAYER_API_SECRET!,
  };
  const provider = new DefenderRelayProvider(relayerCredentials);
  const signer = new DefenderRelaySigner(relayerCredentials, provider, {
    speed: "fast",
  });

  const nfts = await alchemy.nft.getNftsForOwner(recipient, {
    contractAddresses: [process.env.NEXT_PUBLIC_LIZARD_NFT_ADDRESS!],
  });

  const lizard = nfts.ownedNfts[0];
  console.log(nfts.ownedNfts[0]);

  // const { data } = await supabase
  //   .from("lizards")
  //   .select()
  //   .eq("tokenContract", ethers.utils.getAddress(lizard.contract.address))
  //   .eq("tokenId", lizard.tokenId)
  //   .single();

  // if (!data) return res.status(404).json({ error: "Lizard not found" });

  // if (data.lastClaim[keyAddress] != undefined) {
  //   if (
  //     new Date() <
  //     add(Date.parse(data.lastClaim[keyAddress]), {
  //       minutes: parseInt(process.env.BEAD_CLAIM_RATE_LIMIT_MINUTES!),
  //     })
  //   ) {
  //     console.log("rate limited");
  //     return res.status(400).json({ error: "Cannot claim more beads yet" });
  //   }
  // }

  // const { error } = await supabase
  //   .from("lizards")
  //   .update({
  //     beadCount:
  //       parseInt(data.beadCount) + parseInt(process.env.BEAD_COUNT_PER_CLAIM!),
  //     lastClaim: { ...data.lastClaim, [keyAddress]: new Date() },
  //   })
  //   .eq("tokenContract", ethers.utils.getAddress(lizard.contract.address))
  //   .eq("tokenId", lizard.tokenId)
  //   .select();

  // if (error) return res.status(500).json({ error: "Error claiming beads" });

  // console.log(data);

  return res.json({});
};

export default claimHandler;
