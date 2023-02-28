import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useAccount } from "wagmi";
import { Button } from "../components/button";
import { useEffect, useState } from "react";
import { Alchemy, Network, Contract } from "alchemy-sdk";
import { Background } from "../components/background";
import { NavLink } from "../components/navLink";
import Link from "next/link";
import { Modal } from "../components/modal";
import { How } from "../components/how";
import { TelegramIcon } from "../components/telegramIcon";
import { IgIcon } from "../components/igIcon";
import { TwitIconFilled } from "../components/twitIconFilled";

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);
  const { address } = useAccount();

  const links = [
    {
      link: "https://eips.ethereum.org/EIPS/eip-6551",
      text: "About",
      external: true,
    },
    {
      link: "/how",
      text: "How to Mint",
      modal: true,
      modalContent: <How />,
    },
    // commenting out for now as leader board is not finished and mint can only be accessed via scan
    {
      link: "/governanceBoard",
      text: "Governance Board",
    },
    // {
    //   link: "/scan",
    //   text: "Mint",
    // },
    {
      link: `/account/${address}`,
      text: "My wallet",
    },
  ];

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
      <Background>
        <div className="h-[100%] flex flex-col justify-end items-center space-y-8">
          {links.map((item, i) => (
            <div key={i}>
              {item.modal ? (
                <NavLink
                  key={item.link}
                  className="cursor-pointer"
                  onClick={() => {
                    setModalContent(item.modalContent);
                    setShowModal(true);
                  }}
                >
                  <div className="text-center text-xl font-bold first-letter:capitalize">
                    {item.text}
                  </div>
                </NavLink>
              ) : (
                <NavLink key={item.link} className="cursor-pointer">
                  {item.external ? (
                    <a href={item.link} target="_blank" rel="noreferrer">
                      <div className="text-center text-xl font-bold first-letter:capitalize">
                        {item.text}
                      </div>
                    </a>
                  ) : (
                    <Link href={item.link}>
                      <div className="text-center text-xl font-bold first-letter:capitalize">
                        {item.text}
                      </div>
                    </Link>
                  )}
                </NavLink>
              )}
            </div>
          ))}
          <div className="flex justify-center items-center space-x-4">
            <a
              className="cursor-pointer"
              href="https://t.me/beaddao"
              target="_blank"
              rel="noreferrer"
            >
              <TelegramIcon />
            </a>
            <a
              className="cursor-pointer"
              href="https://twitter.com/ilovebeadz"
              target="_blank"
              rel="noreferrer"
            >
              <TwitIconFilled />
            </a>
            <a
              className="cursor-pointer"
              href="https://www.instagram.com/ar/1251248262474299/"
              target="_blank"
              rel="noreferrer"
            >
              <IgIcon />
            </a>
          </div>
        </div>
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
    </div>
  );
};

export default Home;
