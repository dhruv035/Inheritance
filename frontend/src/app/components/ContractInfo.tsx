"use client";

import { useWeb3 } from "../context/Web3Context";

export const ContractInfo = () => {
  const { balance, owner, heir, timeout } = useWeb3();

  // Simple format for timeout in days
  const formatTimeout = (seconds: string) => {
    const days = parseInt(seconds) / (60 * 60 * 24);
    return `${days} days`;
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Will Contract</h2>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Balance:</span>
          <span>{balance} ETH</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Owner:</span>
          <span title={owner}>{owner ? formatAddress(owner) : "Loading..."}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Heir:</span>
          <span title={heir}>{heir ? formatAddress(heir) : "Loading..."}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Timeout Period:</span>
          <span>{timeout ? formatTimeout(timeout) : "Loading..."}</span>
        </div>
      </div>
    </div>
  );
}; 