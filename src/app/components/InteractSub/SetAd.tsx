import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContracts } from 'wagmi';
import { contractConfig, chainConfig } from '../../../config'
import { abi } from '../../../utils/abi';
import { baseSepolia } from 'wagmi/chains';
import { formatEther, parseEther } from 'viem';

const SetAd: React.FC = ({  }) => {

  const contractAddress = contractConfig.address ;
  const account = useAccount();

  const { 
    data,
    error,
    isPending
  } = useReadContracts({
    contracts: [{
      abi,
      address: contractAddress,
      functionName: 'billboard',
      chainId: baseSepolia.id,
    }, {
      abi,
      address: contractAddress,
      functionName: 'getAdjustedPrice',
      chainId: baseSepolia.id,
    }]
  })

  const [billboard, adjustedPrice] = data || [] 
  const [userAdjustedPrice, setUserAdjustedPrice] = useState<string>('');
  const [userAdjustedPriceInt, setUserAdjustedPriceInt] = useState<bigint>(0n);

  const { data: hash, writeContract } = useWriteContract() 

  const setBillboardMessage = (message: string, url: string, cost: bigint) => {
    const result = writeContract({
          abi,
          address: contractConfig.address,
          functionName: 'setBillboard',
          args: [message, url],
          value: cost
         }) 
  }

  const [message, setMessage] = useState('Paint Together. Mint Daily');
  const [url, setUrl] = useState('basepaint.xyz');


  useEffect(() => {
    if (adjustedPrice?.result !== undefined) {
      const initialPrice = formatEther(adjustedPrice.result);
      setUserAdjustedPrice(initialPrice);
      setUserAdjustedPriceInt(adjustedPrice.result);
    }
  }, [adjustedPrice]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAdjustedPrice(e.target.value);
    const priceBigInt = BigInt(parseEther(e.target.value)); 
    setUserAdjustedPriceInt(priceBigInt);
  };


  return (
    <div>
        <div className='flex flex-col gap-4'>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} /> <br />
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} /> <br />
          <input type="text" value={userAdjustedPrice} onChange={handlePriceChange} />
          {account.status === 'connected' ? (
            <button onClick={() => setBillboardMessage(message, url, userAdjustedPriceInt)}>Place Ad</button>
          ) : (
            <span>Connect your wallet to place your ad</span>
          )}
        </div>
    </div>
  )
}

export default SetAd;