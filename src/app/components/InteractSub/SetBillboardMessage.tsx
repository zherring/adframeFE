import React, { useState, useEffect } from 'react';
import { useAccount, useConnect, useWriteContract, useReadContracts, useDisconnect, useReadContract} from 'wagmi';
import { contractConfig, chainConfig } from '../../config'


import { abi } from '../../utils/abi';

interface SetBillboardMessageProps {
  cost: bigint;
}

const SetBillboardMessage: React.FC<SetBillboardMessageProps> = ({ cost }) => {

  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const { data: hash, writeContract } = useWriteContract() 

  console.log("cost prop passed", cost);

  const setBillboardMessage = (message: string, url: string, cost: bigint) => {
    const result = writeContract({
          abi,
          address: contractConfig.address,
          functionName: 'setBillboard',
          args: [message, url],
          value: cost
         }) 
    console.log("clicked!", message, url, cost);
  }

  const [message, setMessage] = useState('Paint Together. Mint Daily');
  const [url, setUrl] = useState('basepaint.xyz');

  return (
    <div>
      {account.status === 'connected' && (
        <div>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
          <button onClick={() => setBillboardMessage(message, url, cost)}>Set Billboard Message</button>
        </div>
      )}
    </div>
  )
}

export default SetBillboardMessage;