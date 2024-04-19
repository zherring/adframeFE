import { http, createConfig } from '@wagmi/core'
import { baseSepolia, base } from 'viem/chains'


export const chainConfig = createConfig({
  chains: [baseSepolia, base],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
})

export const contractConfig = {
  address: '0x5B3C417F29e6b14F1DD6734eD3D6fA470C9B7174' as `0x${string}`,
};