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
    ceramic: "https://ceramic-node-production.up.railway.app",
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

  if (response.errors) {
    return res.json({
      description: "ᗷEᗩᗪᘔ.EᑎᑕOᗰᑭᗩᔕᔕ.ᗩᒪᒪ.ᗪᖇEᗩᗰᔕ https://ilovebeadz.xyz",
      external_url: "https://ilovebeadz.xyz",
      name: `ᗷEᗩᗪ DAO Lizard #${tokenId}`,
      image: "https://ilovebeadz.xyz/liz-nft.png",
    });
  } else {
    const tokenMetadata = (response.data?.nftMetadataIndex as any).edges
      .filter((edge: any) => edge.node.tokenId === parseInt(tokenId))
      .at(0).node;

    const { id: _id, tokenId: _tokenId, ...metadata } = tokenMetadata;

    return res.json(metadata);
  }
};

export default metadataHandler;
