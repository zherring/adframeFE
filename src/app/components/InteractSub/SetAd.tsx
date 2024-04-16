import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContracts, deserialize} from 'wagmi';
import { contractConfig, chainConfig } from '../../../config'
import { abi } from '../../../utils/abi';
import { base } from 'wagmi/chains';
import { formatEther, parseEther } from 'viem';
import { Copy } from 'react-feather';

const SetAd: React.FC = ({  }) => {

  const [origin, setOrigin] = useState('');
  
  useEffect(() => {
    // This code runs on the client side after the component has mounted
    const fullUrl = window.location.origin + "/frames"
    setOrigin(fullUrl);
  }, []);    

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
      chainId: base.id,
    }, {
      abi,
      address: contractAddress,
      functionName: 'getAdjustedPrice',
      chainId: base.id,
    }]
  })

  const [billboard, adjustedPrice] = data || [] 
  // console.log("adjusted Price",typeof(adjustedPrice.result));
  const [userAdjustedPrice, setUserAdjustedPrice] = useState<string>('');
  const [userAdjustedPriceInt, setUserAdjustedPriceInt] = useState<bigint>(0n);

  const { data: hash, writeContract } = useWriteContract() 

  const [message, setMessage] = useState('');
  const [url, setUrl] = useState('https://');

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
          <input type="text" placeholder="Your message goes here" value={message} onChange={(e) => setMessage(e.target.value)} /> <br />
          <input type="text" placeholder="Your url" value={url} onChange={(e) => setUrl(e.target.value)} /> <br />
          <input type="text" value={userAdjustedPrice} onChange={handlePriceChange} />
          {account.status === 'connected' ? (         
            <button onClick={ () => 
              // @ts-ignore
              writeContract({
                abi,
                address: contractConfig.address,
                functionName: 'setBillboard',
                args: [message, url],
                // @ts-ignore
                value: userAdjustedPriceInt
              })
            }>Place Ad</button>
          ) : (
          <span>Connect your wallet to place your ad</span>
          )}
        </div>
        <div className="flex items-center">
          <div className="flex-1">
            <input type="text" value={origin} disabled className="w-full text-gray-700" />
          </div>
            <button onClick={() => navigator.clipboard.writeText(origin)} className="">
              <div className="text-gray-500 hover:text-gray-400">
                <Copy />
              </div>
            </button>
        </div>
    </div>
  )
}

export default SetAd;