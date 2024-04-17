import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Copy } from 'react-feather'
import { useEthereumData } from '../../context/EthereumDataContext'; // Adjust the import path as necessary

  
  const  Preview: React.FC = () => {

    const ethereumData = useEthereumData();
    if (!ethereumData) {
      return <div>Loading...</div>;
    }

    const encodedMessage = encodeURIComponent(ethereumData.message);
    const encodedUrl = encodeURIComponent(ethereumData.url);
  
    return ( 
    <div className="h-[100vh] flex flex-col justify-around md:w-2/5 md:min-w-[400px] bg-black w-full relative pl-5 pr-5">
      <div className="pt-10 content-module-1">
        <aside>adframe.xyz</aside>
        <h1 className='text-white text-2xl mb-5'>Simple Ads on Farcaster</h1>
        <ol className='text-sm'>
          <li>1. Launch your adframe.</li>
          <li>2. Drop the adframe into your channel.</li>
          <li>3. Share ad revenue with your channel.</li>  
        </ol>
      </div>
      <div className="content-module-3 relative">
        {/* <p>How it looks in Farcaster 👇</p> */}
        <div className='flex flex-col items-center mt-5 w-full p-5 rounded-md bg-[#20162A]'>

        <Image src="/images/example-header.svg" width={340} height={57} alt="example-header" className='opacity-50' />
        <div className='flex flex-col items-center overflow-hidden'>
          <div className='flex flex-col items-center overflow-hidden rounded-lg bg-[#2a2a32] gap-2'>
            <Image src={`/api/nft/image?message=${encodedMessage}&url=${encodedUrl}`} width={340} height={340} alt="Dynamic Image" className='rounded-sm' />
            <div className='flex flex-row items-center flex-wrap justify-between w-full gap-2 py-1 px-2'>
              {ethereumData.url && (
                <a href={ethereumData.url} target="_blank" rel="noopener noreferrer" className='min-w-[100px] truncate text-sm bg-[#403A47] flex-1 text-gray-300 text-center py-2 hover:text-gray-100 rounded-md'>
                  {ethereumData.url} →
                </a>
              )}
              <a href="/?tab=set" className="text-xs bg-[#403A47] min-w-[100px] flex-1 text-gray-300 text-center py-2 hover:text-gray-100 rounded-md my-1">Buy This Space</a>
              {/* <a href="/?tab=mint" className="text-xs bg-[#403A47] min-w-[100px] flex-1 text-gray-300 text-center py-2 hover:text-gray-100 rounded-md my-1">Mint</a> */}
            </div>
          </div>
        </div>
          <Image width={340} height={57} src="/images/example-footer.svg" alt="example-footer" className='opacity-50' />
        </div>
        {/* <img src="/images/fcaster-example.png" alt="adframe" className='w-[422px]' />
        <img src="api/nft/image" alt="Dynamic Image" className='absolute top-[182px] left-[52px] w-[230px]' /> */}
      </div>
      <div className='w-full sticky bottom-0'>
        <a href="https://forms.gle/x84sRf3gu11ra8vi8" target="_blank" className="block w-full bottom-0 border-2 border-gray-500 text-sm text-gray-400 text-center py-2 px-4 rounded hover:text-white uppercase ">
          Create your own AdFrame (beta)
        </a>

      </div>
    </div>
  );
};

export default Preview;

