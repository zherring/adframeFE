'use client'

import { useAccount, useConnect, useDisconnect, useReadContract} from 'wagmi';
import { contractConfig } from '../config';
import { abi } from '../contracts/abi';
import { baseSepolia } from 'wagmi/chains';
import { formatEther } from 'viem';
import MintNft from './components/MintNft';
import SetBillboardMessage from './components/SetBillboardMessage';

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const contractAddress = contractConfig.address ;

  const billboardMessage = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'billboard',
    chainId: baseSepolia.id,
  })

  const adjustedPrice = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'getAdjustedPrice',
    chainId: baseSepolia.id,
  })
    // console.log(adjustedPrice.data ? ethers.formatEther(adjustedPrice.data) : 'Data is undefined');
  console.log("adjusted price", adjustedPrice.data);
  return (
    <>
      <div>
        <h2>Account</h2>
        <div>Billboard Title: {billboardMessage.data}</div>
        <div>Cost to Advertise: {adjustedPrice.data ? formatEther(adjustedPrice.data).toString() : 'data is not defined' } </div>
        <MintNft />
        <SetBillboardMessage cost={adjustedPrice.data || 0n}  />
        <div>
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
      </div>
    </>
  )
}

export default App
