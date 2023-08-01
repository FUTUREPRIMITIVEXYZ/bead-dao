import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, Connector, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { NextSeo } from "next-seo";

import { MagicConnectConnector } from "@everipedia/wagmi-magic-connector";

export const rainbowMagicConnector = ({ chains }: any) => ({
  id: "magic",
  name: "Magic",
  iconUrl: "https://dashboard.magic.link/images/logo.svg",
  iconBackground: "#fff",
  createConnector: () => {
    const connector = new MagicConnectConnector({
      chains: chains,
      options: {
        apiKey: "pk_live_B2F2B987B9826713",
        magicSdkConfiguration: {
          network: {
            rpcUrl:
              "https://eth-mainnet.gateway.pokt.network/v1/lb/92fd9951b65f78fa784377d2",
            chainId: 5,
          },
        },
      },
    });
    return {
      connector,
    };
  },
});

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
    }),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ chains }),
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
      // @ts-ignore
      rainbowMagicConnector({ chains }) as Connector,
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <NextSeo
    titleTemplate="Ilovebeadz | %s"
    defaultTitle="Ilovebeadz"
    description="" // @todo
    openGraph={{
      url: "", // @todo
      title: "Ilovebeadz",
      description:
        "", // @todo
      images: [
        {
          url: "", // @todo
          alt: "Ilovebeadz",
          type: "image/jpeg",
        },
      ],
      site_name: "Ilovebeadz",
    }}
    twitter={{
      handle: "@Ilovebeadz",
      site: "https://twitter.com/Ilovebeadz",
      cardType: "summary_large_image",
    }}
    additionalLinkTags={[
      {
        rel: "preload",
        href: "/fonts/Jokerman/Jokerman.otf",
        as: "font",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/Inter/Inter-Bold.ttf",
        as: "font",
        crossOrigin: "anonymous",
      }
    ]}
  />
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
    </>
  );
}

export default MyApp;
