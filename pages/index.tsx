import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { Badge } from "../components/badge";
import Image from "next/image";
import { useAccount } from "wagmi";
import { Button } from "../components/button";
import { useEffect, useState } from "react";
import { Alchemy, Network, Contract } from "alchemy-sdk";

const contractAddress = "0x8ee9a60cb5c0e7db414031856cb9e0f1f05988d1";
const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
});

const Home: NextPage = () => {
  // we have to do this for conditional render b/c of react hydration error
  const [displayMint, setDisplayMint] = useState(false);

  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      setDisplayMint(true);
    }
  }, [address]);

  async function mint() {
    const provider = await alchemy.config.getProvider();
    const lizContract = new Contract(
      contractAddress,
      ["function mint(address, address)"],
      provider
    );
  }

  return (
    <div className="">
      <Head>
        <title>Bead DAO</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full h-[100vh] bg-main bg-contain">
        <div className="h-full w-full flex flex-col items-center justify-between py-4 pb-20">
          <div
            className={`w-full flex items-center justify-between px-4 md:px-4`}
          >
            <Badge>bead DAO</Badge>
            <ConnectButton showBalance={false} chainStatus={"none"} />
          </div>
          {/* <div className="border-2 border-solid border-black rounded-2xl overflow-hidden"> */}
          <Image
            className="bg-contain h-full w-full border-2 border-solid border-black rounded-2xl overflow-hidden"
            height={348}
            width={348}
            alt="beaded lizard image"
            src="/liz-nft.png"
          />
          {/* </div> */}
          {!displayMint && <div></div>}
          {displayMint && (
            <Button>
              <div className="font-bold text-3xl p-4 text-white">
                Mint Lizards
              </div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
