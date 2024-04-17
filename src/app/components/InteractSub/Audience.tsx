import React, { useState, useEffect } from 'react';
import { useEthereumData } from '../../../context/EthereumDataContext';

const Audience: React.FC = () => {

  const ethereumData = useEthereumData();
  if (!ethereumData) {
    return <div>Loading...</div>;
  }

  console.log("logging ethereumData", typeof(ethereumData.activeTokens))
  return (
    <div className='mt-5 flex flex-row gap-10'>
      <div className=''>
        <span className="text-sm text-gray-300">Audience Size</span> <br />
        <span className='text-4xl font-bold'>{ethereumData.activeTokens.toString()}</span> <br /> 
        <span className='text-xs'><a href="https://opensea.io/collection/adframenft" target='_blank'>View on OpenSea</a></span>
      </div>
      <div className=''>
        <span className="text-sm text-gray-300">Contracts</span> <br />
        <span className='text-4xl font-bold'>{ethereumData.activeTokens.toString()}</span> <br /> 
        {/* <span className='text-xs'><a href="https://opensea.io/collection/adframenft" target='_blank'>View on OpenSea</a></span> */}
      </div>
      <p>
        {/* Epoch {ethereumData.epochs} */}
      </p>
    </div>
  )
}

export default Audience;

