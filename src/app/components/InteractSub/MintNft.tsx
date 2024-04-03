import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { contractConfig } from '../../../config';
import { baseSepolia } from 'wagmi/chains';
import { abi } from '../../../utils/abi';
import { writeContract } from 'viem/actions';



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
      status: {account.status}  
      address: {account.address} <br />
      owner: {minted.isSuccess} <br />
      {account.status === 'connected' ? (
        minted.isSuccess ? (
          <span> Already Minted </span>
        ) : (
          <button onClick={ () => 
            writeContract({
              abi,
              address: contractConfig.address,
              functionName: 'mintNFT',
            })
          }>Mint NFT</button>
        )
      ) : (
        <span>Connect your wallet to mint an NFT</span>
      )}
    </div>
  )
}

export default MintNft;