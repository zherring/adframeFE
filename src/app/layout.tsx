import './globals.css'
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import { Spline_Sans_Mono } from 'next/font/google'
import { type ReactNode } from 'react'
import Header from './components/Header'
import { Providers } from './providers'
import { EthereumDataProvider } from '../context/EthereumDataContext';


// const inter = Inter({ subsets: ['latin'] })
const spline = Spline_Sans_Mono({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-spline',
});

export default function RootLayout(props: { children: ReactNode }) {
  const layout = "layout";

  return (
    <html lang="en">
      <body className={spline.className}>
        <Providers>
          <EthereumDataProvider>
            <Header />
            {props.children}
          </EthereumDataProvider>
        </Providers>
      </body>
    </html>
  )
}
