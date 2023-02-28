import type { NextPage } from "next";
import Head from "next/head";
import { Background } from "../components/background";
import { Button } from "../components/button";
import { ethers } from "ethers";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { useAccount, useSigner } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";
import URL from "url-parse";
import {
  getPublicKeysFromScan,
  getSignatureFromScan,
} from "pbt-chip-client/kong";

import parseKeys from "../helpers/parseKeys";
import LizardForwarder from "../public/LizardForwarder.json";

const provider = new ethers.providers.AlchemyProvider(
  "goerli",
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!
);

const Scan: NextPage = () => {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const [mintData, setMintData] = useState<any>(null);

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

    if (!address) {
      openConnectModal?.();
      return;
    }

    const { hash, number } = await provider.getBlock("latest");

    if (!address || !signer) alert("Please connect a wallet");

    const signature = await getSignatureFromScan({
      chipPublicKey: keys.primaryPublicKeyRaw,
      address: address!,
      hash,
    });

    const forwarder = new ethers.Contract(
      process.env.NEXT_PUBLIC_LIZARD_FORWARDER_ADDRESS!,
      LizardForwarder.abi,
      provider
    );

    const lizard = new ethers.Contract(
      process.env.NEXT_PUBLIC_LIZARD_NFT_ADDRESS!,
      [
        "function mint(address lizard, uint256 signatureBlockNumber, bytes lizardSignature, bytes32[] lizardProof, address recipient)",
      ]
    );

    const populatedTx = await lizard.populateTransaction.mint(
      keyAddress,
      number,
      signature,
      proof,
      address
    );

    const calldata = populatedTx.data;

    const nonce = await forwarder.callStatic.getNonce(address);

    const messageHash = await forwarder.callStatic.getMessageHash({
      from: address,
      to: lizard.address,
      nonce,
      data: calldata,
    });

    const domain = {
      name: "LizardForwarder",
      version: "0.0.1",
      chainId: 5,
      verifyingContract: forwarder.address,
    };

    // The named list of all type definitions
    const types = {
      ForwardRequest: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "nonce", type: "uint256" },
        { name: "data", type: "bytes" },
      ],
    };

    // The data to sign
    const mintData = {
      from: address,
      to: lizard.address,
      nonce: nonce.toNumber(),
      data: calldata,
    };

    if (!signer) return;

    const deepLinkStorageValue = window.localStorage.getItem(
      "WALLETCONNECT_DEEPLINK_CHOICE"
    );
    if (deepLinkStorageValue) {
      window.localStorage.setItem(
        "WALLETCONNECT_DEEPLINK_CHOICE_CACHED",
        deepLinkStorageValue
      );
      window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    }

    const deeplink = JSON.parse(
      window.localStorage.getItem("WALLETCONNECT_DEEPLINK_CHOICE_CACHED") ??
        "{}"
    ).href;

    const mintPromise = (signer as any)._signTypedData(domain, types, mintData);

    toast.promise(mintPromise, {
      loading: (
        <div>
          Waiting for signature... (
          <a href={deeplink} target="_blank" className="underline">
            Open Wallet
          </a>
          )
        </div>
      ),
      success: "Message signed",
      error: "Error signing message",
    });

    const mintSignature = await mintPromise;

    if (!mintSignature) return;

    const mintRequestPayload = { ...mintData, signature: mintSignature };
    const mintRequestPromise = fetch("/api/mint", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mintRequestPayload),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) throw Error();
        return res;
      });

    toast.promise(mintRequestPromise, {
      loading: "Submitting transaction...",
      success: "Transaction submitted",
      error: "You've exceeded the rate limit, max 1 liz per hour",
    });

    try {
      const response = await mintRequestPromise;
      if (response.error) return;

      const { txHash } = response;

      // const txHash =
      //   "0x45de18eb8bb2cf4cfbf801452581b5821aabc047c7e36436699502d0c0ac67a9";

      const getTokenId = async (hash: string): Promise<string> => {
        const tx = await provider.getTransaction(txHash);
        const txPromise = tx.wait();

        const txResult = await txPromise;
        const { logs } = txResult;
        const tokenId = logs[0].topics.at(-1);
        return ethers.BigNumber.from(tokenId).toString();
      };

      const tokenIdPromise = getTokenId(txHash);

      toast.promise(tokenIdPromise, {
        loading: "Waiting for transaction...",
        success: (tokenId) => (
          <div>
            Lizard minted! (
            <Link href={`/account/${address}?tokenId=${tokenId}`}>View</Link>)
          </div>
        ),
        error: "Error minting lizard",
      });
    } catch (error) {
      console.error(error);
    }
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
            <Image
              height={353}
              width={367}
              alt="liz gif"
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODM0Y2U4OWYxOWYwYzFjMDZjMGMzODA3YWM2NjcwMTE2ZjFkNDMwYyZjdD1n/1evRUodu486GKealQp/giphy-downsized-large.gif"
              objectFit="cover"
            />
            {/* <video
              className="object-cover h-[353px] w-[367px]"
              src="/lizzlfying.webm"
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
            /> */}
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <Button onClick={scan} className="mb-4">
                <div className="py-3 px-4 text-[20px] whitespace-nowrap text-white rounded-full cursor-pointer font-medium">
                  Mint a Lizard!
                </div>
              </Button>
            </div>
          </div>
        </div>
      </Background>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Scan;
