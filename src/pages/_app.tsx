import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { Box, Experimental_CssVarsProvider } from "@mui/material";
import Layout from "components/Layout";
import * as theming from "custom_theme";
import "styles/globals.scss";

let web3Modal: Web3Modal | null = null;

export default function App({ Component, pageProps }: AppProps) {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: {}
      });
    }
  }, []);

  return (
    <Experimental_CssVarsProvider theme={theming.customTheme} defaultMode="dark">
      <Box sx={{ bgcolor: "darkPurple.main" }} height="100%" width="100%">
        <Layout provider={provider} setProvider={setProvider} web3Modal={web3Modal}>
          <Component {...pageProps} />
        </Layout>
      </Box>
    </Experimental_CssVarsProvider>
  );
}
