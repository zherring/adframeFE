import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { contractConfig } from '../../../config';
import { baseSepolia } from 'wagmi/chains';
import { abi } from '../../../utils/abi';
import { writeContract } from 'viem/actions';

const Claim: React.FC = () => {

  const account = useAccount()

  const minted = useReadContract({
    abi,
    address: contractConfig.address,
    functionName: 'tokenOfOwnerByIndex',
    args: [account.address ?? '0x0000000000000000000000000000000000000000', 0n],
  });

  const { writeContract } = useWriteContract();

  return (
    <div>
      <p>Claim your earning!</p>
      <button 
        onClick={() => writeContract({
          abi,
          address: contractConfig.address,
          functionName: 'claimShareAll',
          args: [minted.data ?? 0n],
      })}
      className="border-2 border-gray-500 text-gray-400 text-center py-2 px-4 rounded hover:text-white mt-5"
      >Claim</button>
    </div>
  )
}

export default Claim;

