import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

const Header: React.FC = () => {
  return ( 
    <header className='p-2 flex w-full justify-between items-center absolute z-50'>
      <Image width={50} height={50} className='w-8 invisible' src="images/logo.svg" alt="logo" />
      <ConnectButton />
    </header>
  );
};

export default Header;