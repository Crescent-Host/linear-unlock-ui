import { Web3Modal } from "@web3modal/react";
import { EthereumClient } from "@web3modal/ethereum";

type Props = {
  projectId: string;
  ethereumClient: EthereumClient;
};

export default function Web3ModalClient({
  projectId,
  ethereumClient,
}: Props) {
  return (
    <Web3Modal
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
}
