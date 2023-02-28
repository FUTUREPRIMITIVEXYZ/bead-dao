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
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const [mintData, setMintData] = useState<any>(null);

  const mint = async (payload: MintPayload) => {
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
        if (res.error) throw Error();
        return res;
      });

    toast.promise(mintRequestPromise, {
      loading: "Submitting transaction...",
      success: "Transaction submitted!",
      error: "Transaction failed",
    });

    try {
      const response = await mintRequestPromise;
      if (response.error) return;

      const { txHash } = response;

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
        loading: (
          <div>
            Waiting for transaction... (
            <a
              className="underline"
              href={`https://goerli.etherscan.io/tx/${txHash}`}
            >
              Etherscan
            </a>
            )
          </div>
        ),
        success: (tokenId) => (
          <div>
            Lizard minted! (
            <Link
              className="underline"
              href={`/account/${address}?tokenId=${tokenId}`}
            >
              View
            </Link>
            )
          </div>
        ),
        error: "Error minting lizard",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const claim = async ({ address }: Claim) => {
    const claimRequestPromise = fetch("/api/claim", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipient: address }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) throw Error();
        return res;
      });

    toast.promise(claimRequestPromise, {
      loading: "Claiming beads...",
      success: "Beads claimed!",
      error: "Bead claim failed",
    });
  };

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

    if (!signature) return;

    const lizardContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_LIZARD_NFT_ADDRESS!,
      [
        "function mint(address lizard, uint256 signatureBlockNumber, bytes lizardSignature, bytes32[] lizardProof, address recipient)",
        "function balanceOf(address owner) returns (uint256)",
      ],
      signer as any
    );

    const balance = await lizardContract.callStatic.balanceOf(address);

    if (balance > 0) {
      await claim({ address });
    } else {
      await mint({
        lizard: keyAddress,
        signatureBlockNumber: number,
        lizardSignature: signature,
        lizardProof: proof,
        recipient: address,
      });
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
            <video
              className="object-cover h-[353px] w-[367px]"
              src="/lizzlfying.webm"
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
            />
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
