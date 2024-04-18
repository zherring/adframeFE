import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdState {
  adText: string;
  adUrl: string;
  setAdText: (text: string) => void;
  setAdUrl: (url: string) => void;
}

const defaultState: AdState = {
  adText: '',
  adUrl: 'https://',
  setAdText: () => {},
  setAdUrl: () => {},
};

const AdContext = createContext<AdState>(defaultState);

export const AdProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adText, setAdText] = useState('');
  const [adUrl, setAdUrl] = useState('https://');

  return (
    <AdContext.Provider value={{ adText, adUrl, setAdText, setAdUrl }}>
      {children}
    </AdContext.Provider>
  );
};

export const useAd = () => useContext(AdContext);