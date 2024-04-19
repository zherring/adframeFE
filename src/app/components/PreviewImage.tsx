import React from 'react';
import { useAd } from '../../context/SetMessage'; 

const PreviewImage = () => {
  const { adText, adUrl } = useAd();
  return (
    <div>
      <div className='w-[340px] h-[340px] bg-black flex flex-col justify-center items-center bg-[url(https://zherring-portfolio.s3.amazonaws.com/basedghouls-bg.png)] bg-cover bg-center'>
        <div className='text-white text-2xl roboto text-center'>{adText}</div>
        <div className='text-white text-xs roboto text-center'>{adUrl}</div>
      </div>
    </div>
  )
};

export default PreviewImage;

