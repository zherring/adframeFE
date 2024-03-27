/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
// import { useState, useEffect } from 'react';
// import { useAccount, useConnect, useDisconnect, useReadContract, useReadContracts} from 'wagmi';
// import { contractConfig } from '../config';
// import { abi } from '../contracts/abi';
// import { baseSepolia } from 'wagmi/chains';
// import { formatEther } from 'viem';

// const contractAddress = contractConfig.address ;
// const [billboardMessage, setBillboardMessage] = useState<string>('');

const test = "new test";

// const { 
//   data,
//   error,
//   isPending
// } = useReadContracts({
//   contracts: [{
//     abi,
//     address: contractAddress,
//     functionName: 'billboard',
//     chainId: baseSepolia.id,
//   }, {
//     abi,
//     address: contractAddress,
//     functionName: 'getAdjustedPrice',
//     chainId: baseSepolia.id,
//   }]
// })

// const [billboard, adjustedPrice] = data || [] 


const frames = createFrames();
const handleRequest = frames(async () => {
  return {
    image: <span>{test}</span>,
    buttons: [<Button action="post">Click me</Button>],
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;