import { http, createConfig } from '@wagmi/core'
import { baseSepolia } from 'viem/chains'
 
export const chainConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
})

export const contractConfig = {
  address: '0x34E4745fd669df2151D9044f07717C4ccBF41ed2' as `0x${string}`,
};