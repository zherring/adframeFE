import React from 'react';
import { useAd } from '../../context/SetMessage'; 

const PreviewImage = () => {
  const { adText, adUrl } = useAd();
  return (
    <div>
      <div className='w-[340px] h-[340px] bg-black flex flex-col justify-center items-center'>
        <div className='text-white text-2xl roboto text-center'>{adText}</div>
        <div className='text-white text-xs roboto text-center'>{adUrl}</div>
      </div>
    </div>
  )
};

export default PreviewImage;

