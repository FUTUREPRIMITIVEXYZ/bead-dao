import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useAccount } from "wagmi";
import { ReactNode, useState } from "react";
import { Background } from "../components/background";
import { NavLink } from "../components/navLink";
import Link from "next/link";
import { Modal } from "../components/modal";
import { How } from "../components/how";
import infoIcon from "public/icons/infoDock-icon.png";
import twitterIcon from "public/icons/twitter-icon.png";
import telegramIcon from "public/icons/telegram-icon.png";
import igIcon from "public/icons/ig-fx-icon.png";

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']

const getDateTime = () => {
  const date = new Date();
  return {
    weekday: days[date.getDay()],
    month: months[date.getMonth()],
    date: date.getDate(),
    time: date.getHours() + ":" + String(date.getMinutes()).padStart(2, "0")
  }
}

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);
  const { address } = useAccount();

  const links = [
    {
      link: "/",
      text: "About",
      external: false,
      detailed: false,
    },
    {
      link: "https://eips.ethereum.org/EIPS/eip-6551",
      text: "About",
      external: true,
      detailed: true,
    },
    {
      link: "",
      text: "How to Mint",
      modal: true,
      modalContent: <How />,
      detailed: false,
    },
    {
      link: `/account/${address}`,
      text: "My wallet",
      detailed: false,
    },
  ];
  const { weekday, month, date, time } = getDateTime();
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
        <div className="min-h-full mt-5 flex flex-col justify-between items-center">
          <div className="flex flex-col items-center">
            <div className="text-white font-joker text-xl">
              {weekday}, {month} {date}
            </div>
            <div className="text-white font-inter font-semibold text-[5rem]">
              {time}
            </div>
          </div>
          {links
            // will bring all `detailed` items on top
            .sort((a,b) => (Number(b.detailed) - Number(a.detailed)))
            .map((item, i) => (
              <div key={i}>
                <LinkWrapper isExternal={item.external || false} href={item.link}>
                  <NavLink
                    key={item.link}
                    className="cursor-pointer"
                    onClick={item.modal ? () => {
                      setModalContent(item.modalContent);
                      setShowModal(true);
                    }: () => {console.log("hmm")}}
                    detailed={item.detailed}
                  >
                    <div className="text-center text-xl font-bold first-letter:capitalize">
                        {item.text}
                    </div>
                  </NavLink>
                </LinkWrapper>
              </div>
          ))}
          <div className="flex justify-center items-center space-x-4 rounded-[41px] bg-link backdrop-blur-sm w-full py-4">
            <a
              className="cursor-pointer"
              href="https://t.me/beaddao"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={infoIcon} width={60} height={60} alt="info dock icon" />
            </a>
            <a
              className="cursor-pointer"
              href="https://t.me/beaddao"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={telegramIcon} width={60} height={60} alt="info dock icon" />
            </a>
            <a
              className="cursor-pointer"
              href="https://twitter.com/ilovebeadz"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={twitterIcon} width={60} height={60} alt="twitter dock icon" />
            </a>
            <a
              className="cursor-pointer"
              href="https://www.instagram.com/ar/1251248262474299/"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={igIcon} width={60} height={60} alt="instagram dock icon" />
            </a>
          </div>
        </div>
      </Background>
      {showModal && (
        <Modal
          title={"How to Mint"}
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

const LinkWrapper = ({children, isExternal, href}: {children: ReactNode, isExternal: boolean, href: string}) => {
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link href={href}>
      {children}
    </Link>
  )
}

export default Home;
