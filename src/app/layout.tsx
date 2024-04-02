import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { type ReactNode } from 'react'
import Header from './components/Header'
import { Providers } from './providers'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout(props: { children: ReactNode }) {
  const layout = "layout";

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {props.children}
        </Providers>
      </body>
    </html>
  )
}
