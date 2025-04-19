"use client";

import { ConnectButton } from "./components/ConnectButton";
import { ContractInfo } from "./components/ContractInfo";
import { OwnerActions } from "./components/OwnerActions";
import { HeirActions } from "./components/HeirActions";
import { useWeb3 } from "./context/Web3Context";

export default function Home() {
  const { account } = useWeb3();

  return (
    <main className="max-w-4xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ethereum Will Contract</h1>
        <ConnectButton />
      </header>

      {!account ? (
        <div className="text-center p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="mb-4">
            Connect your wallet to interact with the contract.
          </p>
          <ConnectButton />
        </div>
      ) : (
        <div className="space-y-6">
          <ContractInfo />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OwnerActions />
            <HeirActions />
          </div>
        </div>
      )}
    </main>
  );
}
