'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as ethersUtils from '../utils/ethersUtils'; // Adjust the path as necessary
import { contractConfig } from '../config';

interface EthereumData {
  message: string;
  url: string;
  // epochs: number;
  activeTokens: number;
}

// Create the context with an undefined initial value
const EthereumDataContext = createContext<EthereumData | undefined>(undefined);

interface EthereumDataProviderProps {
  children: ReactNode; 
}

// Define a provider component
export const EthereumDataProvider: React.FC<EthereumDataProviderProps> = ({ children }) => {
  const [data, setData] = useState<EthereumData>({
    message: '', 
    url: '', 
    // epochs: 0, 
    activeTokens: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const contractAddress = contractConfig.address;
      const message = await ethersUtils.retrieveMessage(contractAddress);
      const url = await ethersUtils.retrieveUrl(contractAddress);
      // const epochs = await ethersUtils.retrieveEpochs(contractAddress);
      const activeTokens = await ethersUtils.retrieveActiveTokens(contractAddress);

      setData({ 
        message, 
        url, 
        activeTokens
      });
    };

    fetchData().catch(console.error);
  }, []);


  return (
    <EthereumDataContext.Provider value={data}>
      {children}
    </EthereumDataContext.Provider>
  );
};

// Hook to use the Ethereum data in a component
export const useEthereumData = () => {
  const context = useContext(EthereumDataContext);
  if (context === undefined) {
    throw new Error('useEthereumData must be used within a EthereumDataProvider');
  }
  return context;
};