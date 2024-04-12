import { http, createConfig } from '@wagmi/core'
import { baseSepolia } from 'viem/chains'


export const chainConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
})

export const contractConfig = {
  address: '0x87D4fF75896066D4424B28313614E59acC1Cd9ab' as `0x${string}`,
};