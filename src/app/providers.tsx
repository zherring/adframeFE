'use client'
import '@rainbow-me/rainbowkit/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { config } from '@/wagmi'

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'viem/chains';


// grab the key 
const alchemyApiKey = process.env.ALCHEMY_API_KEY;

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {props.children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
