import React, { useState } from 'react';
import SetAd from './InteractSub/SetAd';
import MintNft from './InteractSub/MintNft';
import Claim from './InteractSub/Claim';

const Interact: React.FC = () => {
  const [activeTab, setActiveTab] = useState('setAd');

  return ( 
    <div className='flex flex-col gap-4 center h-[100vh] md:w-2/3 w-full justify-center p-5'>
      <div className="tabs flex flex-row gap-4">
        <button onClick={() => setActiveTab('setAd')} className={`${activeTab === 'setAd' ? 'active' : ''} cursor-pointer`}>Set Ad</button>
        <button onClick={() => setActiveTab('mint')} className={`${activeTab === 'mint' ? 'active' : ''} cursor-pointer`}>Mint NFT</button>
        <button onClick={() => setActiveTab('claim')} className={`${activeTab === 'claim' ? 'active' : ''} cursor-pointer`}>Claim</button>
      </div>
      <div className="tab-content">
        {activeTab === 'setAd' && <SetAd />}
        {activeTab === 'mint' && <MintNft />}
        {activeTab === 'claim' && <Claim />}
      </div>
    </div>
  );
};

export default Interact;