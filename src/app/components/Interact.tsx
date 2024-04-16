import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation'
import SetAd from './InteractSub/SetAd';
import MintNft from './InteractSub/MintNft';
import Claim from './InteractSub/Claim';

const Interact: React.FC = () => {
  // const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('set');

  // useEffect(() => {
  //   if (searchParams) {
  //     // Retrieve the 'tab' parameter from the URL search parameters
  //     const tab = searchParams.get('tab');
  //     // Check if the tab parameter is one of the expected values and update the activeTab state
  //     if (tab && ['set', 'mint', 'claim'].includes(tab)) {
  //       setActiveTab(tab);
  //     } else { setActiveTab('set') }
  //   }
  // }, [searchParams]); // Depend on searchParams to re-run the effect when query parameters change


  return ( 
    <div className='flex flex-col gap-4 center h-[100vh] md:w-2/3 w-full justify-center p-5'>
      <div className="tabs flex flex-row gap-4">
        <button onClick={() => setActiveTab('set')} className={`${activeTab === 'set' ? 'active' : ''} cursor-pointer`}>Set Ad</button>
        <button onClick={() => setActiveTab('mint')} className={`${activeTab === 'mint' ? 'active' : ''} cursor-pointer`}>Mint NFT</button>
        <button onClick={() => setActiveTab('claim')} className={`${activeTab === 'claim' ? 'active' : ''} cursor-pointer`}>Claim</button>
      </div>
      <div className="tab-content">
        {activeTab === 'set' && <SetAd />}
        {activeTab === 'mint' && <MintNft />}
        {activeTab === 'claim' && <Claim />}
      </div>
    </div>
  );
};

export default Interact;