import { DIDSession } from "did-session";
import { ComposeClient } from "@composedb/client";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import * as KeyResolver from "key-did-resolver";

import definition from "../ceramic/runtime-schema.json" assert { type: "json" };

import dotenv from "dotenv";
dotenv.config();

async function main() {
  const compose = new ComposeClient({
    ceramic: "http://localhost:7007",
    //@ts-ignore
    definition,
  });

  const key = Buffer.from(process.env.CERAMIC_DID_PRIVATE_KEY!, "hex");
  const provider = new Ed25519Provider(key);

  const did = new DID({ provider, resolver: KeyResolver.getResolver() });

  await did.authenticate();

  compose.setDID(did);

  const createMetadataMutation = `
    mutation CreateNftMetadata($nftMetadata: CreateNftMetadataInput!){
      createNftMetadata(input: $nftMetadata){
        document{
          id
          name 
          description
        }
      }
    }
  `;

  // for (let tokenId = 2; tokenId < 101; tokenId++) {
  //   console.log(tokenId);
  //   const response = await compose.executeQuery(createMetadataMutation, {
  //     nftMetadata: {
  //       content: {
  //         tokenContract: process.env.NEXT_PUBLIC_LIZARD_NFT_ADDRESS!,
  //         tokenId,
  //         name: `ᗷEᗩᗪ DAO Lizard #${tokenId}`,
  //         description: "ᗷEᗩᗪᘔ.EᑎᑕOᗰᑭᗩᔕᔕ.ᗩᒪᒪ.ᗪᖇEᗩᗰᔕ https://ilovebeadz.xyz",
  //         external_url: "https://ilovebeadz.xyz",
  //         image: "https://ilovebeadz.xyz/liz-nft.png",
  //         attributes: [],
  //       },
  //     },
  //   });
  //
  //   console.log(response);
  // }

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

  console.log((response?.data?.nftMetadataIndex as any).edges);
}

main();
