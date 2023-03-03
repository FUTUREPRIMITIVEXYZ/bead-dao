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
import { configureChains, Connector, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";

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
            rpcUrl: `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
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

const { chains, provider, webSocketProvider } = configureChains(
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

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
