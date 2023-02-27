import { NextApiRequest, NextApiResponse } from "next";
type MetadataRequest = {
  tokenId: string;
};

const metadataHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { tokenId } = req.query as MetadataRequest;

  return res.json({
    description: "ᗷEᗩᗪᘔ.EᑎᑕOᗰᑭᗩᔕᔕ.ᗩᒪᒪ.ᗪᖇEᗩᗰᔕ https://ilovebeadz.xyz",
    external_url: "https://ilovebeadz.xyz",
    image: "https://ilovebeadz.xyz/liz-nft.png",
    name: `ᗷEᗩᗪ DAO Lizard #${tokenId}`,
  });
};

export default metadataHandler;
