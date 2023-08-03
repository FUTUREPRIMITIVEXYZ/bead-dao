'use client'
import Image from 'next/image'
import { Background } from '../components/background'
import { Button } from '../components/button'
import { useAccount } from 'wagmi'
// import { toast, Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { Input } from '@/components'
import { ConnectKitButton } from 'connectkit'
import { BeadLoading } from '@/components/beadLoading'
import { useHasMounted } from '@/hooks'

interface MintProps {}

const MintState = {
  PREMINT: 'PREMINT',
  MINTING: 'MINTING',
  MINTERROR: 'MINTERROR',
  MINTED: 'MINTED',
} as const
type MintStateType = (typeof MintState)[keyof typeof MintState]

function MintImage({ caption }: { caption: string }) {
  return (
    <figure className="flex flex-col items-center gap-4">
      <Image
        alt="image name"
        src="/beaddao.png"
        width={1080}
        height={1080}
        className="flex items-center justify-center w-full bg-white rounded-lg aspect-square"
      />
      <figcaption className="text-xl font-bold">image name</figcaption>
    </figure>
  )
}

const BEAD_NUMBER = 10

function Mint({}: MintProps) {
  const { address } = useAccount()
  const [message, setMessage] = useState('')
  const [mintState, setMintState] = useState<MintStateType>(MintState.PREMINT)
  const hasMounted = useHasMounted()
  const canMint = !!message

  if (!address) {
    return (
      <Background className="px-3">
        <div className="flex flex-col w-full gap-4 p-6 mt-10 md:max-w-lg rounded-xl bg-lightbrown bg-opacity-80 backdrop-blur-3xl">
          <div className="flex flex-col gap-8">
            <MintImage caption="Image Name" />
            <ConnectKitButton.Custom>
              {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
                return (
                  <Button
                    // disabled={!hasRequiredFields}
                    variant="default"
                    onClick={show}
                  >
                    Connect to Mint
                  </Button>
                )
              }}
            </ConnectKitButton.Custom>
          </div>
        </div>
      </Background>
    )
  } else if (address) {
    return (
      <>
        {mintState === MintState.PREMINT && (
          <Background className="flex flex-col items-center justify-center px-3">
            <div className="flex flex-col w-full gap-4 p-6 mt-10 md:max-w-lg rounded-xl bg-lightbrown bg-opacity-80 backdrop-blur-3xl">
              <MintImage caption="Image Name" />
              <form className="flex flex-col items-center w-full gap-6">
                <Input
                  name="message"
                  label="Mint a message with your bead"
                  placeholder="Type your message here"
                  onChange={(e) => setMessage(e.target.value)}
                />

                <Button
                  disabled={!canMint}
                  type="submit"
                  onClick={() => setMintState(MintState.MINTING)}
                >
                  Mint Bead
                </Button>
              </form>
            </div>
          </Background>
        )}
        {mintState === MintState.MINTING && (
          <Background className="flex flex-col items-center justify-center px-3">
            <div className="flex flex-col gap-4 mt-10 md:max-w-lg rounded-xl bg-lightbrown bg-opacity-80 backdrop-blur-3xl">
              <div className="flex flex-col items-center w-full gap-6 aspect-square">
                <BeadLoading />
                <Button
                  // disabled={!hasRequiredFields}
                  type="submit"
                  onClick={() => setMintState(MintState.MINTED)}
                >
                  Go to MINTED
                </Button>
              </div>
            </div>
          </Background>
        )}
        {mintState === MintState.MINTERROR && (
          <Background className="flex flex-col items-center justify-center px-3">
            <div className="flex flex-col w-full gap-4 p-6 mt-10 md:max-w-lg rounded-xl bg-lightbrown bg-opacity-80 backdrop-blur-3xl">
              <div className="flex flex-col items-center gap-6">
                <h1 className="text-xl font-bold">:(</h1>
                <h1 className="text-xl font-bold">Oopsie, something went wrong</h1>

                <Button type="submit" onClick={() => setMintState(MintState.PREMINT)}>
                  Try Again
                </Button>
              </div>
            </div>
          </Background>
        )}
        {mintState === MintState.MINTED && (
          <Background className="flex flex-col items-center justify-center px-3">
            <div className="flex flex-col w-full gap-4 p-6 mt-10 md:max-w-lg rounded-xl bg-lightbrown bg-opacity-80 backdrop-blur-3xl">
              <MintImage caption={`You Minted Bead #${BEAD_NUMBER}!`} />

              <Button type="submit" onClick={() => setMintState(MintState.MINTING)}>
                View on OpenSea
              </Button>
              <Button variant="aquaGrey" onClick={() => setMintState(MintState.MINTING)}>
                Back Home
              </Button>
            </div>
          </Background>
        )}
      </>
    )
  }
  return null
}

export default Mint
