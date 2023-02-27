import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { Card } from "../components/card";
import { Background } from "../components/background";
import WalletIcon from "../components/walletIcon";
import { OpenSeaIcon } from "../components/openseaIcon";
import { EtherscanIcon } from "../components/etherscanIcon";
import { TwitterIcon } from "../components/twitterIcon";
// import { GraphViewIcon } from "../components/graphViewIcon";
import { AddressBar } from "../components/addressBar";
import useGetNfts from "../utils/hooks/useGetNfts";
import { useRouter } from "next/router";
import { fetchEnsName } from "@wagmi/core";

const Account: NextPage = () => {
  // we have to do this for conditional render b/c of react hydration error
  // const [connectedAcc, setConnectedAcc] = useState("");
  const [addressToFetch, setAddressToFetch] = useState<string | undefined>("");
  const [displayChildren, setDisplayChildren] = useState(false);
  const [ensName, setEnsName] = useState<string | undefined>();
  const { address } = useAccount();

  const router = useRouter();
  const { query } = router;
  const { wallet } = query;

  // useEffect(() => {
  //   if (address) {
  //     setConnectedAcc(`${address.slice(0, 4)}...${address.slice(-4)}`);
  //   }
  // }, [address]);

  useEffect(() => {
    if (wallet) {
      setAddressToFetch(Array.isArray(wallet) ? wallet[0] : wallet);
    } else {
      setAddressToFetch(address);
    }
  }, [address, wallet]);

  useEffect(() => {
    async function getEnsName() {
      if (addressToFetch) {
        const ensName = await fetchEnsName({
          address: addressToFetch as `0x${string}`,
        });

        if (ensName) {
          setEnsName(ensName);
        }
      }
    }

    getEnsName();
  }, [addressToFetch]);

  const { data } = useGetNfts({ address: addressToFetch });

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
      <Background height="h-[100vh]">
        <div>
          <Card>
            <div className="flex flex-col space-y-4 items-start justify-center">
              <Image
                className="bg-contain h-full w-full border-2 border-solid border-black rounded-2xl overflow-hidden"
                height={348}
                width={348}
                alt="beaded lizard image"
                src={data ? data[0].image : "/liz-nft.png"}
              />
              <div className="mb-4 flex items-center space-x-2 justify-start font-bold text-address-color-secondary">
                <WalletIcon height={25} width={24} />
                <span className="whitespace-nowrap">Owned by</span>
                <a href={"/"} className="cursor-pointer">
                  {addressToFetch && (
                    <span className="rounded-3xl bg-address py-1 px-4 cursor-pointer">
                      {ensName ||
                        `${addressToFetch.slice(0, 4)}...${addressToFetch.slice(
                          -4
                        )}`}
                    </span>
                  )}
                </a>
              </div>
              {data && <h1 className="text-3xl font-bold">{data[0].name}</h1>}
              {/* <AddressBar
                text={
                  data
                    ? `${data[0].address.slice(0, 4)}...${data[0].address.slice(
                        -4
                      )}`
                    : "no data"
                }
                link={`https://etherscan.io/address/${addressToFetch}`}
              /> */}
              <div className="flex items-center justify-start space-x-4">
                <a href="https://opensea.io" target="_blank" rel="noreferrer">
                  <OpenSeaIcon />
                </a>
                <a
                  href={`https://etherscan.io/address/${address || ""}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <EtherscanIcon />
                </a>
                <a
                  href={`https://twitter.com/ilovebeadz`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <TwitterIcon />
                </a>
              </div>
            </div>
          </Card>
          {displayChildren && (
            <Card>
              <div className="grid grid-cols-2 gap-4 place-content-between">
                {(data || []).map((lizard, i) => (
                  <div key={i} className="w-full overflow-hidden">
                    <Image
                      src={lizard.image || "/liz-nft.png"}
                      alt="lizard image"
                      height={154}
                      width={154}
                    />
                    <div className="font-xm font-bold">{lizard.name}</div>
                    <AddressBar
                      text="lizzymcguire.beaddao.eth"
                      link="https://google.com"
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </Background>
    </div>
  );
};

export default Account;
