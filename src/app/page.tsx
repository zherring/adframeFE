'use client'

import { useAccount, useConnect, useDisconnect, useReadContract} from 'wagmi';
import { abi } from '../contracts/abi';
import { baseSepolia } from 'wagmi/chains';

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const contractAddress = '0x34E4745fd669df2151D9044f07717C4ccBF41ed2';

  const billboardMessage = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'billboard',
    chainId: baseSepolia.id,
  })

  return (
    <>
      <div>
        <h2>Account</h2>
        <div>Billboard Title: {billboardMessage.data}</div>

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
