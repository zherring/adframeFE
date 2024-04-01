'use client'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query'

import { isValidAddress } from '../utils/validAddress';  // Function to validate addresses
import { useAccount, useClient, useConnect, useDisconnect, useReadContracts } from 'wagmi';
import { contractConfig } from '../config';
import { abi } from '../utils/abi';
import { baseSepolia } from 'wagmi/chains';
import { formatEther } from 'viem';
// import MintNft from '../components/MintNft';
// import SetBillboardMessage from './components/SetBillboardMessage';


const ContractAddressPage = () => {
  const router = useRouter();
  const { contractAddress } = router.query;

  const account = useAccount();


  // Successful
  // const queryClient = useQueryClient();
  // console.log("QueryClient in component:", queryClient);

  // Breaks things
  const client = useClient();
  console.log("client:", client)
  

  
  // const { connectors, connect, status } = useConnect();
  // const { disconnect } = useDisconnect();
  // const [billboardMessage, setBillboardMessage] = useState<string>('');


  // const { 
  //   data,
  //   error,
  //   isPending
  // } = useReadContracts({
  //   contracts: [{
  //     abi,
  //     address: contractAddress as `0x${string}`,
  //     functionName: 'billboard',
  //     chainId: baseSepolia.id,
  //   }, {
  //     abi,
  //     address: contractAddress as `0x${string}`,
  //     functionName: 'getAdjustedPrice',
  //     chainId: baseSepolia.id,
  //   }]
  // })

  // const [billboard, adjustedPrice] = data || [] 
  // const [formattedAdjustedPrice, setFormattedAdjustedPrice] = useState(null);

  // useEffect(() => {
  //   if (contractAddress && isValidAddress(contractAddress as string)) {
  //     // If the address is valid, you can fetch data related to the contract address
  //   } else {
  //     // If the address is invalid or not provided, you can redirect or show an error
  //   }
  // }, [contractAddress]);

  // // Render your page components based on contractAddress

  return (
    <div>
      Hello world! Contract page!
      {account.isConnected ? account.address : "Not connected"}
      <div>
        <h2>Connect</h2>
        {/* <button onClick={() => connect({ connector: injected() })}>
          Connect
        </button> */}
        {/* {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))} */}
        {/* <div>{status}</div> */}
        {/* <div>{error?.message}</div> */}
      </div>
    </div>
  );
};

export default ContractAddressPage;
