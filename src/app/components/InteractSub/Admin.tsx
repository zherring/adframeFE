import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { contractConfig } from '../../../config';
import { abi } from '../../../utils/abi';



const Admin: React.FC = () => {

  const account = useAccount()
  const [userOwnsNFT, setUserOwnsNFT] = useState(false);


  const minted = useReadContract({
    abi,
    address: contractConfig.address,
    functionName: 'tokenOfOwnerByIndex',
    args: [account.address ?? '0x0000000000000000000000000000000000000000', 0n],
  });

  console.log(minted.isSuccess, minted.data);
  const { writeContract } = useWriteContract();


  return (
    <div id="admin" className='flex flex-row flex-wrap gap-10'>
          <p className='italic flex-full w-full'><em>Admin Functions for the AdFrame</em></p>
          <div className='flex-2'>
            <h3>AdFrame Revenue</h3>
            <p>10% of all ad revenue goes to the contract deployer.</p>
            <button className="border-2 border-gray-500 text-gray-400 text-center py-2 px-4 rounded mt-5" disabled={true}>Withdraw Revenue</button>
          </div>
          <div className='flex-2'>
            <h3>AdFrame Audience</h3>
            <p>Control who is in their ad network.</p>
            <p><input className='mr-2' type="checkbox"></input>Only allow Farcaster users to set ads</p>
            <p><input className='mr-2' type="checkbox"></input>Only allow Farcaster users to mint NFTs</p>
            {/* <button className="border-2 border-gray-500 text-gray-4000 text-center py-2 px-4 rounded mt-5" disabled={true}>Upload Whitelist</button> */}
          </div>
          <div className='flex-1'>
            <h3>Set Ad Banner URI</h3>
            <p>Set where the ad images are served.</p>
            <input className="text-gray-600" value="https://adframe.xyz/api/[contractAddress]/[tokenId]" disabled={true} type='text'></input>
            <button className="border-2 border-gray-500 text-gray-400 text-center py-2 px-4 rounded mt-5" disabled={true}>Set URI</button>
          </div>
          <div className='flex-1'>
            <h3>Set Base Price and Rates</h3>
            <p>Admins can set the base cost, as well as increase and decrease rate for their adframe.</p>
            <label>Base Price</label><input className="text-gray-600" value="0.0027" disabled={true} type='text'></input> <br />
            <label>Increase Rate </label><input className="text-gray-600" value="0.00027" disabled={true} type='text'></input> <span>/ per NFT</span><br />
            <label>Decrease Rate</label><input className="text-gray-600" value="0.000008" disabled={true} type='text'></input> <span>/ per block</span><br />
          </div>
    </div>
  )
}

export default Admin;

