'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import SetAd from './InteractSub/SetAd';
import MintNft from './InteractSub/MintNft';
import Admin from './InteractSub/Admin';
// import Audience from './InteractSub/Audience';

const Interact: React.FC = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('set');

  useEffect(() => {
    if (searchParams) {
      // Retrieve the 'tab' parameter from the URL search parameters
      const tab = searchParams.get('tab');
      // Check if the tab parameter is one of the expected values and update the activeTab state
      if (tab && ['set', 'mint', 'admin'].includes(tab)) {
        setActiveTab(tab);
      } else { setActiveTab('set') }
    }
  }, [searchParams]); // Depend on searchParams to re-run the effect when query parameters change

  return ( 
    <div className='flex flex-col gap-4 md:w-2/3 w-full p-5 mt-10'>
      {/* <Audience /> */}
      <div className="tabs flex flex-row gap-4">
        <button onClick={() => setActiveTab('set')} className={`${activeTab === 'set' ? 'active' : ''}`}>📢 Place Ad</button>
        <button onClick={() => setActiveTab('mint')} className={`${activeTab === 'mint' ? 'active' : ''} `}>🤑 Revshare</button>
        <button onClick={() => setActiveTab('admin')} className={`${activeTab === 'admin' ? 'active' : ''} `}>🔐 Admin</button>
      </div>
      <div className="tab-content">
        {activeTab === 'set' && <SetAd />}
        {activeTab === 'mint' && <MintNft />}
        {activeTab === 'admin' && <Admin />}
      </div>
    </div>
  );
};

export default Interact;