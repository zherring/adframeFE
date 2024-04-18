import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { contractConfig } from '../../config';
import { ChevronDown } from 'react-feather';



const Header: React.FC = () => {

  const address = contractConfig.address;
  
  return ( 
    <header className='p-2 flex w-full justify-between items-center absolute z-50'>
      <a className='text-xs text-gray-700 flex flex-row gap-2 truncate' href={`https://basescan.org/address/${address}`}>contract <ChevronDown size={16}  />{address}</a>
      <ConnectButton />
    </header>
  );
};

export default Header;