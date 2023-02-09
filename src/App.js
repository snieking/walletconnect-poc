import './App.css';
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum';

import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';
import Connect from './connect/Connect';
import Sign from './sign/Sign';

const chains = [arbitrum, mainnet, polygon];

// Wagmi client
const { provider, webSocketProvider } = configureChains(chains, [
  walletConnectProvider({ projectId: '8e8f5efd6eaca678b2c1052aa47509b3' }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: '8e8f5efd6eaca678b2c1052aa47509b3',
    version: '1', // or "2"
    appName: 'web3Modal',
    chains,
  }),
  provider,
  webSocketProvider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Connect />
        <Sign />
      </WagmiConfig>
      <Web3Modal
        projectId='8e8f5efd6eaca678b2c1052aa47509b3'
        ethereumClient={ethereumClient}
      />
    </>
  );
}

export default App;
