import { NextApiRequest, NextApiResponse } from "next";

const metadataHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.json({
    description: "ᗷEᗩᗪᘔ.EᑎᑕOᗰᑭᗩᔕᔕ.ᗩᒪᒪ.ᗪᖇEᗩᗰᔕ https://ilovebeadz.xyz",
    external_url: "https://ilovebeadz.xyz",
    image:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGQ2YWM1NWU4NGU5ZTk1ZWUxMDgzMDQyMmFkZDVkODZlMGIzY2JiYiZjdD1n/vHublFw0x9L44N36Ju/giphy.gif",
    name: `ᗷEᗩᗪ DAO BEADZ`,
  });
};

export default metadataHandler;
