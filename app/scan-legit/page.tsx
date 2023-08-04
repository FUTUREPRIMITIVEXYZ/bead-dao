'use client'

import type { NextPage } from 'next'
import Head from 'next/head'
import { Background } from '../components/background'
import { Button } from '../components/button'
import { ethers } from 'ethers'
import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import { useAccount, usePublicClient } from 'wagmi'
import { toast, Toaster } from 'react-hot-toast'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import URL from 'url-parse'
import { getPublicKeysFromScan, getSignatureFromScan } from 'pbt-chip-client/kong'
import parseKeys from '@/utils/parseKeys'
import Image from 'next/image'
import { useSearchParam } from 'react-use'

import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'

import { hashMessage, keccak256, encodePacked } from 'viem'

import { useConnectModal } from '@rainbow-me/rainbowkit'

import { useBeadMint, beadABI, beadAddress } from '@/generated'

type MintPayload = {
  lizard: string
  signatureBlockNumber: number
  lizardSignature: string
  lizardProof: string[]
  recipient: string
}

const Scan: NextPage = () => {
  const searchParams = useSearchParams()
  const isFromHomePage = searchParams.get('start') // if the page was routed from the home page
  const keysStatic = searchParams.get('static')

  const { address, isConnected, status } = useAccount()
  const { openConnectModal } = useConnectModal()

  const publicClient = usePublicClient({
    chainId: 11155111,
  })

  const { data, isLoading, isSuccess, write } = useBeadMint()

  const {
    trigger: triggerScan,
    data: mintSignature,
    isMutating: scanLoading,
  } = useSWRMutation('/scan', async () => {
    if (!address) {
      throw Error('Wallet not connected')
    }

    let keys: any = parseKeys(keysStatic)
    if (!keys) {
      keys = await getPublicKeysFromScan()
    }

    const primaryKey = keys?.primaryPublicKeyRaw

    if (!primaryKey) {
      throw Error('Could not fetch lizard key')
    }

    const keyAddress = ethers.utils.computeAddress(`0x${primaryKey}`)

    const lizardTree = await fetch('/lizardTree-v2.json').then((res) => res.json())

    const tree = StandardMerkleTree.load(lizardTree)

    const proof = tree.getProof([keyAddress])

    if (!tree.verify([keyAddress], proof)) {
      throw Error('Not a lizard')
    }

    const { hash, number } = await publicClient.getBlock()

    console.log(hash, number)

    if (!hash || !number) {
      throw Error('Error fetching block information')
    }

    const beadId = await publicClient.readContract({
      address: '0xe84011D1b695bcf5b92700b09D973D5688e7682f',
      abi: beadABI,
      functionName: 'beadId',
      args: [address, number],
    })

    console.log(beadId)

    const signature =
      '0xb81ecf1a55b79b25562585d4238a276704b5634a7edb42674c3c565630ca2914210b7ccb53b74a36670431d965e34c5d1c5cb8e54726084537848a7232fb10361b'

    // const signature = await getSignatureFromScan({
    //   chipPublicKey: keys.primaryPublicKeyRaw,
    //   address: address!,
    //   hash: hash,
    // })

    console.log(signature)

    const image = `https://cloudflare-ipfs.com/ipfs/bafybeiemt555y6bsgkree3ee4o4v52wgvk275hb2ml5mvv4r24viq74vpq/${beadId}.png`

    console.log(image)

    if (!signature) {
      throw Error('No signature returned')
    }

    return {
      signature,
      proof,
      blockNumber: number,
      image,
    }
  })

  // const [tapLoading, setTapLoading] = useState(false)
  // const [mintLoading, setMintLoading] = useState(false)
  // const isLoading = mintLoading
  //
  //
  // const [buttonCta, setButtonCta] = useState<string>('Connect Wallet')
  // const [tapCta, setTapCta] = useState<string>('Tap the chip again to verify')
  //
  // useEffect(() => {
  //   if (isFromHomePage) {
  //     setTapCta('Tap a Lizard chip to mint Beadz')
  //     return setTapLoading(true)
  //   }
  // }, [isFromHomePage])
  //
  // useEffect(() => {
  //   if (!isLoading && isConnected) {
  //     return setButtonCta('Verify Lizard')
  //   }
  //   if (!isConnected) {
  //     return setButtonCta('Connect Wallet')
  //   }
  // }, [isConnected, isLoading, isDisconnected, address])
  //
  // const cta = () => {
  //   if (!isLoading && isConnected) {
  //     return initiateTap()
  //   }
  //   if (!isConnected) {
  //     openConnectModal?.()
  //   }
  // }

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

  console.log(isConnected, status)

  return (
    <div className="font-[Inter]">
      <Head>
        <title>Bead DAO</title>
        <meta name="description" content="Generated by @rainbow-me/create-rainbowkit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background>
        <div className="flex flex-col items-center justify-center min-h-full">
          {!isConnected && (
            <Button className="mb-4" onClick={openConnectModal}>
              <div className="px-2 py-1 text-3xl font-medium text-white rounded-full cursor-pointer whitespace-nowrap">
                Connect Wallet
              </div>
            </Button>
          )}
          {isConnected && !mintSignature && (
            <Button className="mb-4" onClick={() => triggerScan()}>
              <div className="px-2 py-1 text-3xl font-medium text-white rounded-full cursor-pointer whitespace-nowrap">
                Verify Lizard
              </div>
            </Button>
          )}
        </div>
        {scanLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-start bg-black bg-opacity-30">
            <div className="w-64 h-64 mt-4 mb-4 overflow-hidden bg-white rounded-lg shadow">
              <Image
                className="w-64 h-64 mb-4"
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGY3ZGRmNTU1YjAxNjM2ODQzY2Y2MzU4YmZhMjEwOGFlYzNhZTE3NCZjdD1z/QtX9VvsqoJ9nNpRVGF/giphy.gif"
                alt="processing gif"
                width={64}
                height={64}
              />
            </div>
            <div className="px-4 py-2 font-bold bg-white rounded-md">
              Tap the chip again to verify
            </div>
          </div>
        )}
        {/* {isLoading && ( */}
        {/*   <div className="absolute inset-0 flex flex-col items-center justify-center"> */}
        {/*     <div className="w-64 h-64 mt-8 mb-4 overflow-hidden bg-white rounded-lg shadow"> */}
        {/*       <Image */}
        {/*         className="w-64 h-64 mb-4" */}
        {/*         src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2ZkNWIxZDMxNTM0MTBmNGU2NTU4NzhjYTE4ZDhiMDg2NTk2MTAzZSZjdD1z/yYmPdb7UNlih5LlpL8/giphy.gif" */}
        {/*         width={64} */}
        {/*         height={64} */}
        {/*         alt="loading image" */}
        {/*       /> */}
        {/*     </div> */}
        {/*   </div> */}
        {/* )} */}
        <Toaster position="bottom-center" />
      </Background>
    </div>
  )
}

export default Scan
