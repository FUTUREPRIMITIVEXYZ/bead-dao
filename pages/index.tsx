import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { Badge } from "../components/badge";
import Image from "next/image";
import { useAccount } from "wagmi";
import { Button } from "../components/button";

const Home: NextPage = () => {
  const { account, isConnected, isDisconnected } = useAccount();

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

      <main className="w-full h-[100vh] bg-main bg-contain">
        <section className="h-full w-full flex flex-col items-center justify-around space-y-4">
          <div className="flex items-center space-between">
            <Badge>bead DAO</Badge>
            <Badge>@ETHDenver</Badge>
          </div>
          <div className="border-2 border-solid border-black rounded-2xl">
            <Image
              className="bg-contain"
              height={348}
              width={348}
              alt="beaded lizard image"
              src="/lizz.jpg"
            />
          </div>
          <div className="">
            {isDisconnected && (
              <ConnectButton
              // showBalance={{ smallScreen: false, largeScreen: true }}
              />
            )}
            {isConnected && (
              <Button>
                <div className="font-bold text-3xl p-4">Mint Lizards</div>
              </Button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
