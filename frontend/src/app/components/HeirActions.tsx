"use client";

import { useState } from "react";
import { useWeb3 } from "../context/Web3Context";
import { ethers } from "ethers";

export const HeirActions = () => {
  const { isHeir, takeControl } = useWeb3();
  const [newHeir, setNewHeir] = useState("");

  const handleTakeControl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ethers.isAddress(newHeir)) {
      alert("Please enter a valid Ethereum address");
      return;
    }
    
    await takeControl(newHeir);
    setNewHeir("");
  };

  if (!isHeir) {
    return null;
  }

  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-bold mb-4">Heir Actions</h2>
      
      <form onSubmit={handleTakeControl}>
        <h3 className="font-semibold">Take Control</h3>
        <p className="text-sm text-gray-600 my-2">
          Take control if owner is inactive for the timeout period.
        </p>
        
        <input
          type="text"
          value={newHeir}
          onChange={(e) => setNewHeir(e.target.value)}
          placeholder="New heir address (0x...)"
          className="w-full border p-2 mb-2"
          required
        />
        
        <button
          type="submit"
          className="w-full bg-purple-500 text-white p-2"
        >
          Take Control
        </button>
      </form>
    </div>
  );
}; 