import type { NextPage } from "next";
import Head from "next/head";
import { Background } from "@/components/background";
import Image from "next/image";
import { Button } from "@/components/button";
import { ethers } from "ethers";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import URL from "url-parse";
import parseKeys from "@/utils/parseKeys";
import {
  getPublicKeysFromScan,
  getSignatureFromScan,
} from "pbt-chip-client/kong";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const provider = new ethers.providers.AlchemyProvider(
  "homestead",
  "ZlrIeucrcyJtYsCY9bnsfd3Yw5oM97PJ"
);

const Scan: NextPage = () => {
  const { address } = useAccount();

  const scan = async () => {
    const url = URL(window.location.href, true);

    let keys: any = parseKeys(url.query.static);
    if (!keys) {
      keys = await getPublicKeysFromScan();
    }

    const primaryKey = keys?.primaryPublicKeyRaw;

    if (!primaryKey) {
      return;
    }

    const keyAddress = ethers.utils.computeAddress(`0x${primaryKey}`);

    const lizardTree = await fetch("/lizardTree.json").then((res) =>
      res.json()
    );

    const tree = StandardMerkleTree.load(lizardTree);

    const proof = tree.getProof([keyAddress]);

    if (!tree.verify([keyAddress], proof))
      alert("Sorry, this chip is not a lizard");

    window.location.href = "https://t.me/beaddao";
    return;

    // const { hash, number } = await provider.getBlock("latest");
    //
    // if (!address) alert("Please connect a wallet");
    //
    // const signature = await getSignatureFromScan({
    //   chipPublicKey: keys.primaryPublicKeyRaw,
    //   address: address!,
    //   hash,
    // });
    //
    // console.log(keyAddress, number, signature, proof, address);
  };

  return (
    <div className="font-[Inter]">
      <Head>
        <title>Bead DAO</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background>
        <div className="flex flex-col justify-center items-center h-full">
          <div className="relative ">
            <video
              className="object-cover h-[353px] w-[367px]"
              src="/lizzlfying.webm"
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
            />
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <Button onClick={scan}>
                <div className="py-3 px-4 text-[20px] whitespace-nowrap text-white rounded-full cursor-pointer font-medium">
                  Join BEAD DAO
                </div>
              </Button>
            </div>
          </div>
        </div>
      </Background>
    </div>
  );
};

export default Scan;
