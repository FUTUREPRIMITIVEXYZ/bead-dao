import type { NextPage } from "next";
import Head from "next/head";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { Background } from "../../components/background";
import useGetNfts from "../../utils/hooks/useGetNfts";
import { useRouter } from "next/router";
import { fetchEnsName } from "@wagmi/core";
import { NftViewer, Nft } from "../../components/nftViewer";
import { RefreshIcon } from "../../components/refreshIcon";
import useGetBeads from "../../utils/hooks/useGetBeads";
import { Modal } from "../../components/modal";
import { MintSuccess } from "../../components/mintSuccess";
import { BeadSuccess } from "../../components/beadSuccess";
import { BeadLoading } from "../../components/beadLoading";

const Address: NextPage = () => {
  const [ensName, setEnsName] = useState<string | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);

  const [displayedNft, setDisplayedNft] = useState<Nft>({
    image: "/liz-nft.png",
    name: "No lizards. Go mint",
    address: "",
    format: "jpeg",
    contract: "",
    tokenId: "",
  });
  const { address } = useAccount();

  const router = useRouter();
  const { query } = router;
  const { address: queryAddress, beadClaim, minted, beadLoading } = query;

  const addressFromUrl = Array.isArray(queryAddress)
    ? queryAddress[0]
    : queryAddress;

  useEffect(() => {
    async function getEnsName() {
      if (queryAddress) {
        const ensName = await fetchEnsName({
          address: queryAddress as `0x${string}`,
        });

        if (ensName) {
          setEnsName(ensName);
        }
      }
    }

    getEnsName();
  }, [queryAddress]);

  const {
    data,
    mutate: refetch,
    isValidating,
    isLoading,
  } = useGetNfts({ address: addressFromUrl });

  useEffect(() => {
    if (!isValidating && !isLoading && data && data.length === 0) {
      router.push("/scan");
    }
  }, [isValidating, isLoading, data, data?.length, router]);

  const { data: beadData } = useGetBeads(
    displayedNft.contract,
    displayedNft.tokenId
  );

  useEffect(() => {
    if (data && data.length) {
      setDisplayedNft({
        // image: data[0].image,
        image: "https://media.giphy.com/media/NKrCnXI49QmrEe5FhK/giphy.gif",
        name: data[0].name,
        address: data[0].address,
        format: data[0].format,
        contract: data[0].contract,
        tokenId: data[0].tokenId,
      });

      return;
    }
  }, [data]);

  useEffect(() => {
    if (minted === "true") {
      setModalContent(<MintSuccess />);
      setShowModal(true);

      return;
    }

    if (beadClaim === "true") {
      setModalContent(<BeadSuccess />);
      setShowModal(true);

      return;
    }
  }, [minted, beadClaim]);

  console.log({ showModal, modalContent });

  return (
    <div>
      <Head>
        <title>Bead DAO</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background>
        {isValidating || isLoading ? (
          <div className="flex flex-col justify-center items-center h-full">
            <div className="relative ">
              <video
                className="object-cover h-[353px] w-[367px]"
                src="/lizzlfying.webm"
                autoPlay
                loop
              />
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="py-3 px-4 text-3xl whitespace-nowrap text-white rounded-full cursor-pointer font-bold">
                  LOADING....
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {addressFromUrl && data && data.length !== 0 && (
              <div className="flex flex-col justify-center items-center">
                <div className="flex justify-end items-center w-full p-5">
                  <RefreshIcon handleClick={() => refetch()} />
                </div>
                <NftViewer
                  nft={displayedNft}
                  ownedBy={
                    ensName ||
                    (addressFromUrl
                      ? `${addressFromUrl.slice(0, 4)}...${addressFromUrl.slice(
                          -4
                        )}`
                      : "")
                  }
                  balance={beadData.balance}
                />
              </div>
            )}
          </div>
        )}
      </Background>
      {showModal && (
        <Modal
          onClose={() => {
            setModalContent(null);
            setShowModal(false);
          }}
        >
          {modalContent}
        </Modal>
      )}
      {beadLoading === "true" && <BeadLoading />}
    </div>
  );
};

export default Address;
