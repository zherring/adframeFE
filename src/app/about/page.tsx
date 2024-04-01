"use client"

import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useReadContract, useReadContracts} from 'wagmi';
import { contractConfig } from '../../config';
import { abi } from '../../utils/abi';
import { baseSepolia } from 'wagmi/chains';
import { formatEther } from 'viem';

export default function Page() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const contractAddress = contractConfig.address ;
  const [billboardMessage, setBillboardMessage] = useState<string>('');
  return (
    <div>
      <h2>Connect</h2>
      {account.address} <br />
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          type="button"
        >
          {connector.name}
        </button>
      ))}
      <div>{status}</div>
      <div>{error?.message}</div>
    </div>
  )
}