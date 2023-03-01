import { NextApiRequest, NextApiResponse } from "next";

const metadataHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.json({
    description: "ᗷEᗩᗪᘔ.EᑎᑕOᗰᑭᗩᔕᔕ.ᗩᒪᒪ.ᗪᖇEᗩᗰᔕ https://ilovebeadz.xyz",
    external_url: "https://ilovebeadz.xyz",
    image:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTI4MGEwZTMxMTQ3MGE5YTZmOGMzZjZiNDkzY2RiYjdjMTQ5NTM3MSZjdD1n/vHublFw0x9L44N36Ju/giphy.gif",
    name: `ᗷEᗩᗪ DAO BEADZ`,
  });
};

export default metadataHandler;
