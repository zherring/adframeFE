import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { contractConfig } from '../../../config';
import { baseSepolia } from 'wagmi/chains';
import { abi } from '../../../utils/abi';
import { writeContract } from 'viem/actions';
import Claim from './Claim';


const MintNft: React.FC = () => {

  const account = useAccount()
  const [userOwnsNFT, setUserOwnsNFT] = useState(false);


  const minted = useReadContract({
    abi,
    address: contractConfig.address,
    functionName: 'tokenOfOwnerByIndex',
    args: [account.address ?? '0x0000000000000000000000000000000000000000', 0n],
  });

  console.log(minted.isSuccess, minted.data);
  const { writeContract } = useWriteContract();


  return (
    <div>
      {account.status === 'connected' ? (
        minted.isSuccess ? (
          <div>
            <Claim />
          </div>
        ) : (
          <div>
            <p>Mint your NFT to qualify for future earnings.</p>
            <button 
              onClick={ () => 
                writeContract({
                  abi,
                  address: contractConfig.address,
                  functionName: 'mintNFT',
                })}
                className="border-2 border-gray-500 text-gray-400 text-center py-2 px-4 rounded hover:text-white mt-5"
                >Mint NFT</button>
          </div>
        )
      ) : (
        <span>Connect your wallet to mint an NFT</span>
      )}
    </div>
  )
}

export default MintNft;