import React, { useState, useEffect } from 'react';
import { Copy } from 'react-feather'
  
  const  Preview: React.FC = () => {
    const [origin, setOrigin] = useState('');
  
    useEffect(() => {
      // This code runs on the client side after the component has mounted
      const fullUrl = window.location.origin + "/frames"
      setOrigin(fullUrl);
    }, []);

    // TODO
    // add a link to the adframe
    // add a link to the image
    
    

    return ( 
    <div className="h-[100vh] flex flex-col justify-around md:w-1/3 bg-black w-full relative pl-5 pr-5">
      <div className="pt-10 content-module-1">
        <p>Drop the adframe into your channel.</p>
        <p>Share ad revenue with your community.</p>  
      </div>
      <div className="content-module-2">
        <div className="flex items-center">
          <div className="flex-1">
            <input type="text" value={origin} disabled className="w-full text-gray-700" />
          </div>
            <button onClick={() => navigator.clipboard.writeText(origin)} className="">
              <div className="text-gray-500 hover:text-gray-400">
                <Copy />
              </div>
            </button>
        </div>
      </div>
      <div className="content-module-3 relative">
        <p>The current ad (view audience on <a target="_blank" href="https://opensea.io/collection/adframenft">OpenSea</a>):</p>
        <img src="api/nft/image" alt="Dynamic Image" className='rounded-sm' />
        {/* <img src="/images/fcaster-example.png" alt="adframe" className='w-[422px]' />
        <img src="api/nft/image" alt="Dynamic Image" className='absolute top-[182px] left-[52px] w-[230px]' /> */}
      </div>
      <div className='w-full sticky bottom-0'>
        <a href="https://forms.gle/x84sRf3gu11ra8vi8" target="_blank" className="block w-full bottom-0 border-2 border-gray-500 text-gray-500 hover:text-gray-400 text-center text-white py-2 px-4 rounded ">
          Create your own ad frame
        </a>

      </div>
    </div>
  );
};

export default Preview;

