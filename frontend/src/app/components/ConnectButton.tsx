"use client";

import { useWeb3 } from "../context/Web3Context";

export const ConnectButton = () => {
  const { account, connectWallet } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <button
      onClick={connectWallet}
      className="bg-blue-500 text-white p-2"
    >
      {account ? formatAddress(account) : "Connect Wallet"}
    </button>
  );
}; 