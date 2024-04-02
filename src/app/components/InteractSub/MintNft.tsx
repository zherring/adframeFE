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

  // const { write } = useWriteContract({
  //   ...contractConfig,
  //   onSuccess(data) {
  //     setTransactionStatus('pending');
  //     setTransactionHash(data.hash);
  //     // Optionally, wait for the transaction to be confirmed
  //   },
  //   onError(error) {
  //     console.error(error);
  //     setTransactionStatus('error');
  //   },
  // });

  // const setBillboardMessage = (message: string, url: string, cost: bigint) => {
  //   const result = writeContract({
  //         abi,
  //         address: contractConfig.address,
  //         functionName: 'setBillboard',
  //         args: [message, url],
  //         value: cost
  //        }) 
  // }

//   const mintNFT = () => {
//     const result = writeContract({
//     abi,
//     address: contractConfig.address,
//     functionName: 'mintNFT',
//   })
//   console.log("minted", minted.isSuccess);

// }


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