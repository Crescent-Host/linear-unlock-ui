import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

import * as theming from "custom_theme";
import "styles/globals.scss";

import { Box, Experimental_CssVarsProvider } from "@mui/material";
import Layout from "components/Layout";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { base, baseGoerli } from "wagmi/chains";

/**
 * -----------------------------
 * CHAINS + WEB3 CONFIG
 * -----------------------------
 */
const chains = [base, baseGoerli];

const projectId = "83fde4ab80cf5b97cff4927c19d25825";

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

/**
 * -----------------------------
 * CLIENT-ONLY WEB3MODAL
 * (THIS IS THE FIX)
 * -----------------------------
 */
const Web3ModalClient = dynamic(
  () =>
    import("@web3modal/react").then((mod) => {
      return function Modal() {
        return (
          <mod.Web3Modal
            projectId={projectId}
            ethereumClient={ethereumClient}
            themeMode="dark"
            themeVariables={{
              "--w3m-font-family": "Roboto, sans-serif",
              "--w3m-accent-color": "#730DE7",
              "--w3m-background-color": "#2e1d4b",
            }}
          />
        );
      };
    }),
  { ssr: false }
);

/**
 * -----------------------------
 * APP
 * -----------------------------
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Experimental_CssVarsProvider
      theme={theming.customTheme}
      defaultMode="dark"
    >
      <WagmiConfig config={wagmiConfig}>
        <Box
          sx={{ bgcolor: "darkPurple.main" }}
          minHeight="100vh"
          width="100%"
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Box>
      </WagmiConfig>

      {/* CLIENT ONLY — NO SSR CRASH */}
      <Web3ModalClient />
    </Experimental_CssVarsProvider>
  );
}
