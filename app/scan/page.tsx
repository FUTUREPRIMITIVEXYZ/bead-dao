'use client'

import type { NextPage } from 'next'
import Head from 'next/head'
import { Background } from '../components/background'
import { Button } from '../components/button'
import { ethers } from 'ethers'
import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import { useAccount } from 'wagmi'
import { toast, Toaster } from 'react-hot-toast'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import URL from 'url-parse'
import { getPublicKeysFromScan, getSignatureFromScan } from 'pbt-chip-client/kong'
import parseKeys from '@/utils/parseKeys'
import Image from 'next/image'
import { useModal } from 'connectkit'
import { useSearchParam } from 'react-use'

const provider = new ethers.providers.AlchemyProvider(
  'goerli',
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!
)

type MintPayload = {
  lizard: string
  signatureBlockNumber: number
  lizardSignature: string
  lizardProof: string[]
  recipient: string
}

const Scan: NextPage = () => {
  const searchParams = useSearchParams();
  console.log(searchParams.get("start"));

  const {setOpen} = useModal();

  const [tapLoading, setTapLoading] = useState(false)
  const [mintLoading, setMintLoading] = useState(false)
  const isLoading = mintLoading

  const { address, isConnected, isDisconnected } = useAccount()

  const [buttonCta, setButtonCta] = useState<string>("Connect Wallet");

  useEffect(() => {
    if (!isLoading && isConnected) {
      return setButtonCta("Verify Lizard");
    }
    if (!isConnected) {
      return setButtonCta("Connect Wallet");
    }
  }, [isConnected, isLoading, isDisconnected, address])

  const cta = () => {
    if (!isLoading && isConnected) {
      return initiateTap();
    }
    if (!isConnected) {
      return setOpen(true);
    }
  }

  const initiateTap = async () => {
    try {
      setTapLoading(true)
      window.focus()
      const url = URL(window.location.href, true)

      let keys: any = parseKeys(url.query.static)
      if (!keys) {
        keys = await getPublicKeysFromScan()
      }

      const primaryKey = keys?.primaryPublicKeyRaw

      if (!primaryKey) {
        throw Error('Invalid primary key')
      }

      const keyAddress = ethers.utils.computeAddress(`0x${primaryKey}`)

      const lizardTree = await fetch('/lizardTree.json').then((res) => res.json())

      const tree = StandardMerkleTree.load(lizardTree)

      const proof = tree.getProof([keyAddress])

      if (!tree.verify([keyAddress], proof)) {
        throw Error('Not a lizard')
      }

      const { hash, number } = await provider.getBlock('latest')

      if (!address) {
        throw Error('No wallet connected')
      }

      const signature = await getSignatureFromScan({
        chipPublicKey: keys.primaryPublicKeyRaw,
        address: address!,
        hash,
      })

      if (!signature) {
        throw Error('No signature returned')
      }

      setTapLoading(false)

      /**
       * @todo
       * redirect to /mint from here
       * https://www.figma.com/file/YkwW4NwSkYhjvwUay6LD20/ETHDenver2022-BEADDAO?type=design&node-id=516%3A710&mode=design&t=eJj4kFCk1hhnI5si-1
       */

      // mint({
      //   lizard: keyAddress,
      //   signatureBlockNumber: number,
      //   lizardSignature: signature,
      //   lizardProof: proof,
      //   recipient: address,
      // })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.toString())
      }
      setTapLoading(false)
    } finally {
      setTapLoading(false)
    }
  }

  // const mint = async (payload: MintPayload) => {
  //   try {
  //     setMintLoading(true)
  //     const mintRequestPromise = fetch('/api/mint', {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         console.log(res.error)
  //         if (res.error) throw Error(res.error)
  //         return res
  //       })

  //     toast.promise(mintRequestPromise, {
  //       loading: 'Submitting transaction...',
  //       success: 'Transaction submitted!',
  //       error: 'Transaction failed. You can only mint once per hour per chip',
  //     })

  //     const response = await mintRequestPromise
  //     if (response.error) throw Error('Error minting lizard')

  //     const { txHash } = response

  //     console.log(txHash)

  //     const txPromise = provider.waitForTransaction(txHash)

  //     toast.promise(txPromise, {
  //       loading: 'Waiting for transaction...',
  //       success: 'Beadz minted!',
  //       error: 'Uh oh, transaction failed',
  //     })

  //     const tx = await txPromise

  //     console.log(tx)

  //     console.log(response)

  //     if (response.firstLizard) {
  //       router.push(`/account/${address}?minted=true`)
  //     } else {
  //       router.push(`/account/${address}?beadClaim=true`)
  //     }

  //     setMintLoading(false)
  //   } catch (error) {
  //     // if (error instanceof Error) {
  //     //   toast.error(error.toString());
  //     // }
  //     console.error(error)
  //     setMintLoading(false)
  //   } finally {
  //     setMintLoading(false)
  //   }
  // }

  return (
    <div className="font-[Inter]">
      <Head>
        <title>Bead DAO</title>
        <meta name="description" content="Generated by @rainbow-me/create-rainbowkit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background>
        <div className="flex flex-col justify-center items-center min-h-full">
          <Button className="mb-4" onClick={cta}>
            <div className="py-1 px-2 text-3xl whitespace-nowrap text-white rounded-full cursor-pointer font-medium">
              {buttonCta}
            </div>
          </Button>
        </div>
        {tapLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-start bg-black bg-opacity-30">
            <div className="h-64 w-64 mt-4 bg-white rounded-lg overflow-hidden shadow mb-4">
              <Image
                className="w-64 h-64 mb-4"
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGY3ZGRmNTU1YjAxNjM2ODQzY2Y2MzU4YmZhMjEwOGFlYzNhZTE3NCZjdD1z/QtX9VvsqoJ9nNpRVGF/giphy.gif"
                alt="processing gif"
                width={64}
                height={64}
              />
            </div>
            <div className="bg-white rounded-md px-4 py-2 font-bold">
              Tap the chip again to verify
            </div>
          </div>
        )}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="h-64 w-64 mt-8 bg-white rounded-lg overflow-hidden shadow mb-4">
              <Image
                className="w-64 h-64 mb-4"
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2ZkNWIxZDMxNTM0MTBmNGU2NTU4NzhjYTE4ZDhiMDg2NTk2MTAzZSZjdD1z/yYmPdb7UNlih5LlpL8/giphy.gif"
                width={64}
                height={64}
                alt="loading image"
              />
            </div>
          </div>
        )}
        <Toaster position="bottom-center" />
      </Background>
    </div>
  )
}

export default Scan
