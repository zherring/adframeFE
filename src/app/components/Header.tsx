import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header: React.FC = () => {
  return ( 
    <header className='p-2 flex w-full justify-between items-center absolute z-50'>
      <img className='w-8' src="images/logo.svg" alt="logo" />
      <ConnectButton />
    </header>
  );
};

export default Header;