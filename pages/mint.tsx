import type { NextPage } from "next";
import Head from "next/head";
import { Background } from "../components/background";
import { Button } from "../components/button";
import { ethers } from "ethers";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { useAccount, useSigner, useConnect } from "wagmi";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import URL from "url-parse";
import useSWRMutation from "swr/mutation";
import {
  getPublicKeysFromScan,
  getSignatureFromScan,
} from "pbt-chip-client/kong";

import parseKeys from "../helpers/parseKeys";

const provider = new ethers.providers.AlchemyProvider(
  "goerli",
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!
);

type MintPayload = {
  lizard: string;
  signatureBlockNumber: number;
  lizardSignature: string;
  lizardProof: string[];
  recipient: string;
};

const Scan: NextPage = () => {
  const router = useRouter();
  const { openConnectModal } = useConnectModal();
  const [clientIsConnected, setclientIsConnected] = useState(false);

  const [tapLoading, setTapLoading] = useState(false);
  const [mintLoading, setMintLoading] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);

  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      setclientIsConnected(true);
    }
  }, [address]);

  const initiateTap = async () => {
    try {
      setTapLoading(true);
      window.focus();
      const url = URL(window.location.href, true);

      let keys: any = parseKeys(url.query.static);
      if (!keys) {
        keys = await getPublicKeysFromScan();
      }

      const primaryKey = keys?.primaryPublicKeyRaw;

      if (!primaryKey) {
        throw Error("Invalid primary key");
      }

      const keyAddress = ethers.utils.computeAddress(`0x${primaryKey}`);

      const lizardTree = await fetch("/lizardTree.json").then((res) =>
        res.json()
      );

      const tree = StandardMerkleTree.load(lizardTree);

      const proof = tree.getProof([keyAddress]);

      if (!tree.verify([keyAddress], proof)) {
        throw Error("Not a lizard");
      }

      const { hash, number } = await provider.getBlock("latest");

      if (!address) {
        throw Error("No wallet connected");
      }

      const signature = await getSignatureFromScan({
        chipPublicKey: keys.primaryPublicKeyRaw,
        address: address!,
        hash,
      });

      if (!signature) {
        throw Error("No signature returned");
      }

      const lizardContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_LIZARD_NFT_ADDRESS!,
        ["function balanceOf(address owner) returns (uint256)"],
        provider
      );

      const balance = await lizardContract.callStatic.balanceOf(address);

      setTapLoading(false);

      if (balance > 0) {
        claim({ address, keyAddress });
      } else {
        mint({
          lizard: keyAddress,
          signatureBlockNumber: number,
          lizardSignature: signature,
          lizardProof: proof,
          recipient: address,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.toString());
      }
      setTapLoading(false);
    } finally {
      setTapLoading(false);
    }
  };

  const mint = async (payload: MintPayload) => {
    try {
      setMintLoading(true);
      const mintRequestPromise = fetch("/api/mint", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) throw Error(res.error);
          return res;
        });

      toast.promise(mintRequestPromise, {
        loading: "Submitting transaction...",
        success: "Transaction submitted!",
        error: "Transaction failed",
      });

      const response = await mintRequestPromise;
      if (response.error) throw Error("Error minting lizard");

      const { txHash } = response;

      const tx = await provider.getTransaction(txHash);
      tx.wait();

      router.push(`/account/${address}?minted=true`);

      setMintLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.toString());
      }
      console.error(error);
      setMintLoading(false);
    } finally {
      setMintLoading(false);
    }
  };

  const claim = async ({
    address,
    keyAddress,
  }: {
    address: string;
    keyAddress: string;
  }) => {
    try {
      setMintLoading(true);
      await fetch("/api/claim", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipient: address, keyAddress }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) throw Error(res.error);
          return res;
        });

      router.push(`/account/${address}?beadClaim=true`);

      setMintLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.toString());
      }
      console.error(error);
      setMintLoading(false);
    } finally {
      setMintLoading(false);
    }
  };

  const isLoading = mintLoading || claimLoading;

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
        <div className="flex flex-col justify-center items-center min-h-full">
          {!clientIsConnected && (
            <div>
              <Button className="mb-4" onClick={openConnectModal}>
                <div className="py-3 px-4 text-[20px] whitespace-nowrap text-white rounded-full cursor-pointer font-medium">
                  Connect Wallet
                </div>
              </Button>
            </div>
          )}
          {!isLoading && clientIsConnected && (
            <Button className="mb-4" onClick={initiateTap}>
              <div className="py-3 px-4 text-[20px] whitespace-nowrap text-white rounded-full cursor-pointer font-medium">
                Mint
              </div>
            </Button>
          )}
        </div>
        {tapLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-start bg-black bg-opacity-30">
            <div className="h-64 w-64 mt-4 bg-white rounded-lg overflow-hidden shadow mb-4">
              <img
                className="w-64 h-64 mb-4"
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGY3ZGRmNTU1YjAxNjM2ODQzY2Y2MzU4YmZhMjEwOGFlYzNhZTE3NCZjdD1z/QtX9VvsqoJ9nNpRVGF/giphy.gif"
              />
            </div>
            <div className="bg-white rounded-full px-4 py-2 font-bold">
              Tap the chip again
            </div>
          </div>
        )}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="h-64 w-64 mt-8 bg-white rounded-lg overflow-hidden shadow mb-4">
              <img
                className="w-64 h-64 mb-4"
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2ZkNWIxZDMxNTM0MTBmNGU2NTU4NzhjYTE4ZDhiMDg2NTk2MTAzZSZjdD1z/yYmPdb7UNlih5LlpL8/giphy.gif"
              />
            </div>
          </div>
        )}
        <Toaster />
      </Background>
    </div>
  );
};

export default Scan;
