import { ComposeClient } from "@composedb/client";
import { NextApiRequest, NextApiResponse } from "next";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import * as KeyResolver from "key-did-resolver";

import definition from "../../../ceramic/runtime-schema.json";

type MetadataRequest = {
  tokenId: string;
};

const metadataHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { tokenId } = req.query as MetadataRequest;

  const compose = new ComposeClient({
    ceramic: "http://localhost:7007",
    //@ts-ignore
    definition,
  });

  const response = await compose.executeQuery(`
    query {
      nftMetadataIndex(first:100) {
        edges {
          node {
            id
            tokenId
            name
            description
            image
            external_url
          }
        }
      }
    }
  `);

  console.log(response);

  return res.json({
    description: "ᗷEᗩᗪᘔ.EᑎᑕOᗰᑭᗩᔕᔕ.ᗩᒪᒪ.ᗪᖇEᗩᗰᔕ https://ilovebeadz.xyz",
    external_url: "https://ilovebeadz.xyz",
    name: `ᗷEᗩᗪ DAO Lizard #${tokenId}`,
    image: "https://ilovebeadz.xyz/liz-nft.png",
  });
};

export default metadataHandler;
