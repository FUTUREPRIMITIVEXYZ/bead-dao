import { NextApiRequest, NextApiResponse } from "next";
import alchemy from "../../../utils/alchemy";

import lizardAccounts from "../../../public/lizardAccounts.json";
import { parseInt } from "lodash";

const lizardHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { account } = req.query;
  if (!account) {
    return res.status(400).json({ error: "account is required" });
  }

  const accountToFetch = Array.isArray(account) ? account[0] : account;

  const nfts = await alchemy.nft.getNftsForOwner(accountToFetch, {
    contractAddresses: [process.env.NEXT_PUBLIC_LIZARD_NFT_ADDRESS!],
  });

  const lizard = nfts.ownedNfts[0];

  if (!lizard)
    return res.status(404).json({ error: "Account does not own lizard" });

  const tba = lizardAccounts[parseInt(lizard.tokenId) - 1];

  const beadz = await alchemy.nft.getNftsForOwner(tba, {
    contractAddresses: [process.env.NEXT_PUBLIC_BEADZ_NFT_ADDRESS!],
  });

  const response = {
    ...lizard,
    account: tba,
    beadCount: beadz.ownedNfts[0].balance,
  };

  return res.json(response);
};

export default lizardHandler;
