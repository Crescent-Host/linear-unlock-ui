import { ReactNode } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { ethers } from "ethers";

interface Props {
  children: ReactNode;
  provider: ethers.providers.Web3Provider | null;
  setProvider: (p: ethers.providers.Web3Provider) => void;
  web3Modal: any;
}

export default function Layout({ children, provider, setProvider, web3Modal }: Props) {
  const connectWallet = async () => {
    if (!web3Modal) return;
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    setProvider(provider);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>Nether</Typography>
          <Button color="inherit" onClick={connectWallet}>
            Connect Wallet
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
}
