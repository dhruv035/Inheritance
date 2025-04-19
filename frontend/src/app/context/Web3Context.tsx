"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { 
  WILL_CONTRACT_ABI, 
  WILL_CONTRACT_ADDRESS 
} from '../constants/contract';

interface Web3ContextType {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  contract: ethers.Contract | null;
  balance: string;
  owner: string;
  heir: string;
  timeout: string;
  isOwner: boolean;
  isHeir: boolean;
  connectWallet: () => Promise<void>;
  withdraw: (amount: string) => Promise<void>;
  takeControl: (newHeir: string) => Promise<void>;
  depositFunds: (amount: string) => Promise<void>;
  refreshContractData: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [owner, setOwner] = useState<string>('');
  const [heir, setHeir] = useState<string>('');
  const [timeout, setTimeout] = useState<string>('');
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isHeir, setIsHeir] = useState<boolean>(false);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask to use this application');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(WILL_CONTRACT_ADDRESS, WILL_CONTRACT_ABI, signer);
      
      setAccount(accounts[0]);
      setProvider(provider);
      setContract(contract);
      
      await refreshContractData();
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const refreshContractData = async () => {
    if (!contract || !provider) return;
    
    try {
      // Get contract balance
      const balance = await provider.getBalance(WILL_CONTRACT_ADDRESS);
      setBalance(ethers.formatEther(balance));
      
      // Get owner and heir
      const owner = await contract.owner();
      const heir = await contract.heir();
      const timeout = await contract.Timeout();
      
      setOwner(owner);
      setHeir(heir);
      setTimeout(ethers.formatUnits(timeout, 0));
      
      // Check if connected account is owner or heir
      if (account) {
        setIsOwner(account.toLowerCase() === owner.toLowerCase());
        setIsHeir(account.toLowerCase() === heir.toLowerCase());
      }
    } catch (error) {
      console.error('Error refreshing contract data:', error);
    }
  };

  const withdraw = async (amount: string) => {
    if (!contract) return;
    
    try {
      const tx = await contract.withdraw(ethers.parseEther(amount));
      await tx.wait();
      await refreshContractData();
    } catch (error) {
      console.error('Error withdrawing:', error);
    }
  };

  const takeControl = async (newHeir: string) => {
    if (!contract) return;
    
    try {
      const tx = await contract.takeControl(newHeir);
      await tx.wait();
      await refreshContractData();
    } catch (error) {
      console.error('Error taking control:', error);
    }
  };

  const depositFunds = async (amount: string) => {
    if (!contract || !provider) return;
    
    try {
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: WILL_CONTRACT_ADDRESS,
        value: ethers.parseEther(amount)
      });
      await tx.wait();
      await refreshContractData();
    } catch (error) {
      console.error('Error depositing funds:', error);
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });
      
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  useEffect(() => {
    if (contract && account) {
      refreshContractData();
    }
  }, [contract, account]);

  return (
    <Web3Context.Provider
      value={{
        account,
        provider,
        contract,
        balance,
        owner,
        heir,
        timeout,
        isOwner,
        isHeir,
        connectWallet,
        withdraw,
        takeControl,
        depositFunds,
        refreshContractData
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

declare global {
  interface Window {
    ethereum: any;
  }
} 