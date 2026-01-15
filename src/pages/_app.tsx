import type { AppProps } from "next/app";
import * as theming from "custom_theme";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base, baseGoerli } from "wagmi/chains";
import { Box, Experimental_CssVarsProvider } from "@mui/material";

import "styles/globals.scss";
import Layout from "components/Layout";

/**
 * CHAINS
 */
const chains = [base, baseGoerli];

/**
 * WalletConnect Project ID
 */
const projectId = "83fde4ab80cf5b97cff4927c19d25825";

/**
 * Wagmi + Web3Modal config
 */
const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId }),
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId,
    chains,
  }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Experimental_CssVarsProvider
      theme={theming.customTheme}
      defaultMode="dark"
    >
      <WagmiConfig config={wagmiConfig}>
        <Box sx={{ bgcolor: "darkPurple.main" }} minHeight="100vh">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Box>
      </WagmiConfig>

      {/* 🔑 FIX IS HERE */}
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode="dark"

        /** ⛔️ CRITICAL FIX */
        enableInjected={false}
        enableExplorer={true}

        themeVariables={{
          "--w3m-font-family": "Roboto, sans-serif",
          "--w3m-accent-color": "#730DE7",
          "--w3m-background-color": "#2e1d4b",
        }}
      />
    </Experimental_CssVarsProvider>
  );
}
