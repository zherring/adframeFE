import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContracts, deserialize} from 'wagmi';
import { contractConfig, chainConfig } from '../../../config'
import { abi } from '../../../utils/abi';
import { base } from 'wagmi/chains';
import { formatEther, parseEther } from 'viem';
import { Copy } from 'react-feather';
import { useAd } from '../../../context/SetMessage';

const SetAd: React.FC = ({  }) => {

  const [origin, setOrigin] = useState('');
  // const { setAdText, setAdUrl } = useEthereumData();

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

  const { adText, setAdText, adUrl, setAdUrl } = useAd();

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
          <input type="text" placeholder="Your message goes here" 
            value={adText} 
            onChange={(e) => setAdText(e.target.value)} /> 
            <br />
          <input type="text" placeholder="Your url" 
            value={adUrl} 
            onChange={(e) => setAdUrl(e.target.value)} /> 
            <br />
          <input type="text" value={userAdjustedPrice} onChange={handlePriceChange} />
          {account.status === 'connected' ? (   
            <div>
              <button onClick={ () => 
                // @ts-ignore
                writeContract({
                  abi,
                  address: contractConfig.address,
                  functionName: 'setBillboard',
                  args: [adText, adUrl],
                  // @ts-ignore
                  value: userAdjustedPriceInt
                })}
                className="border-2 w-50 border-gray-500 text-gray-400 text-center py-2 px-4 rounded hover:text-white mt-5"
                >Place Ad
              </button> 
              <button
                onClick={() => navigator.clipboard.writeText("https://adframe.xyz/frames/")} 
                className="border-2 w-50 border-gray-500 text-gray-400 text-center py-2 ml-5 px-4 rounded hover:text-white mt-5">
                Share AdFrame
              </button>
            </div>
          ) : (
          <span>Connect your wallet to place your ad</span>
          )}
        </div>
    </div>
  )
}

export default SetAd;