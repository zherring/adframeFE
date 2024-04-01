import { http, createConfig } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'


export const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'AdFrame' }),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID! }),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http('https://base-sepolia.g.alchemy.com/v2/vDvACwN90WnCv03zxWTxsdyJJyF_7IAk'),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
