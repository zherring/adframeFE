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
      <h1>Claim</h1>
      <button onClick={() => writeContract({
        abi,
        address: contractConfig.address,
        functionName: 'claimShareAll',
        args: [minted.data ?? 0n],
      })}>Claim</button>
    </div>
  )
}

export default Claim;

