import { http, createConfig } from '@wagmi/core'
import { baseSepolia } from 'viem/chains'


export const chainConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
})

export const contractConfig = {
  address: '0x7580b8a27C4616becE43670c614748444a5E000F' as `0x${string}`,
};