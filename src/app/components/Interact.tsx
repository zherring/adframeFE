import React, { useState } from 'react';
import SetAd from './InteractSub/SetAd';
import MintNft from './InteractSub/MintNft';

const Interact: React.FC = () => {
  const [activeTab, setActiveTab] = useState('setAd');

  return ( 
    <div className='flex flex-col gap-4 center h-[100vh] md:w-2/3 w-full justify-center'>
      <h2>Interact</h2>
      <div className="tabs">
        <button onClick={() => setActiveTab('setAd')} className={`${activeTab === 'setAd' ? 'active' : ''} cursor-pointer`}>Set Ad</button>
        <button onClick={() => setActiveTab('mint')} className={`${activeTab === 'mint' ? 'active' : ''} cursor-pointer`}>Mint NFT</button>
        {/* <button onClick={() => setActiveTab('tab3')} className={activeTab === 'tab3' ? 'active' : ''}>Tab 3</button> */}
      </div>
      <div className="tab-content">
        {activeTab === 'setAd' && <SetAd cost={BigInt(100)} />}
        {activeTab === 'mint' && <MintNft />}
        {/* {activeTab === 'tab3' && <TabThree />} */}
      </div>
    </div>
  );
};

export default Interact;