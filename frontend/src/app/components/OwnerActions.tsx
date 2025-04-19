"use client";

import { useState } from "react";
import { useWeb3 } from "../context/Web3Context";

export const OwnerActions = () => {
  const { isOwner, withdraw, balance, depositFunds } = useWeb3();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawAmount) return;
    
    await withdraw(withdrawAmount);
    setWithdrawAmount("");
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositAmount) return;
    
    await depositFunds(depositAmount);
    setDepositAmount("");
  };

  if (!isOwner) {
    return null;
  }

  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-bold mb-4">Owner Actions</h2>
      
      <div className="space-y-4">
        <form onSubmit={handleWithdraw}>
          <h3 className="font-semibold">Withdraw Funds</h3>
          <div className="flex mt-2">
            <input
              type="text"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="ETH amount"
              className="border p-2 mr-2"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2"
            >
              Withdraw
            </button>
          </div>
        </form>

        <form onSubmit={handleDeposit}>
          <h3 className="font-semibold">Deposit Funds</h3>
          <div className="flex mt-2">
            <input
              type="text"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="ETH amount"
              className="border p-2 mr-2"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white p-2"
            >
              Deposit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 