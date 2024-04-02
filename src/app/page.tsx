'use client'
import { retrieveMessage } from '../utils/ethersUtils';
import Preview from './components/Preview';
import Interact from './components/Interact';
// import Head from 'next/head';
// import { useState, useEffect } from 'react';
// import { useAccount, useConnect, useDisconnect, useReadContract, useReadContracts}from 'wagmi';
import { contractConfig } from '../config';
// import { abi } from '../utils/abi';
// import { baseSepolia } from 'wagmi/chains';
// import { formatEther } from 'viem';
// import MintNft from './components/MintNft';
// import SetBillboardMessage from './components/SetBillboardMessage';



function App() {
  // const account = useAccount()
  // const { connectors, connect, status } = useConnect()
  // const { disconnect } = useDisconnect()

  // const contractAddress = contractConfig.address ;
  // const [billboardMessage, setBillboardMessage] = useState<string>('');

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
  // const [formattedAdjustedPrice, setFormattedAdjustedPrice] = useState(null);

  return (
    <div className='flex flex-col md:flex-row'>
      <Preview />
      <Interact />


      {/* <div>
        <div>
          {
            isPending ? 
              <div>Pending</div> : 
              (billboard ? 
                <div>
                  <p>Billboard Title: {billboard.result}</p>
                  <p>Cost to replace: {formatEther(adjustedPrice.result)?.toString()} ETH</p>
                  <MintNft />
                  <SetBillboardMessage cost={adjustedPrice.result || 0n}  /> 
                </div> 
              : null)
          }

        </div> */}
        {/* <div>Billboard Title: {billboardMessage}</div>
        <div>Cost to Advertise: {adjustedPrice.data ? formatEther(adjustedPrice.data).toString() : 'data is not defined' } </div> */}
        {/* <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div> */}
    </div>
  )
}

export default App
