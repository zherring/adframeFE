import React, { useState, useEffect } from 'react';
import { useAccount, useConnect, useWriteContract, useDisconnect, useReadContract} from 'wagmi';
import { contractConfig, chainConfig } from '../../config'

import { abi } from '../../contracts/abi';



const MintNft: React.FC = () => {


  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const { data: hash, writeContract } = useWriteContract() 

  const mintNFT = () => {
    const result = writeContract({
          abi,
          address: contractConfig.address,
          functionName: 'mintNFT',
         }) 
  }

  return (
    <div>
      {account.status === 'connected' && (
        <button onClick={mintNFT}>Mint NFT</button>
      )}
    </div>
  )
}

export default MintNft;