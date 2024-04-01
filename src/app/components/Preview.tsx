import React, { useState, useEffect } from 'react';
  
  const  Preview: React.FC = () => {
    const [origin, setOrigin] = useState('');
  
    useEffect(() => {
      // This code runs on the client side after the component has mounted
      setOrigin(window.location.origin);
    }, []);

    // TODO
    // add a link to the adframe
    // add a link to the image
    
    return ( 
    <div className="h-[100vh] flex flex-col justify-center md:w-1/3 bg-black w-full relative">
      <div className="content-module-1">
        <p>Drop the adframe into your channel.</p>
        <p>Share ad revenue with your community.</p>
      </div>
      <div className="content-module-2">
        <div className="flex items-center">
          <input type="text" value={origin} disabled className="bg-gray-200 text-gray-700 border-0 p-2" />
          <button onClick={() => navigator.clipboard.writeText("https://dynamic.url")} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Copy
          </button>
        </div>
      </div>
      <div className="content-module-3">
        <img src="api/images/?" alt="Dynamic Image" />
      </div>
      <button className="absolute w-full bottom-0 bg-blue-500 text-white py-2 px-4 rounded ">
        Create your own ad frame
      </button>
    </div>
  );
};

export default Preview;

