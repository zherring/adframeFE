import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { contractConfig } from '../config'; // Your default contract address

const HomePage = () => {
  
  const router = useRouter();
  
  useEffect(() => {
    router.push(`/${contractConfig.address}`);
  }, [router]);

  // Optionally, you can add a loading state or a splash screen while redirecting
  return (
    <div>...Loading</div>
  );
};

export default HomePage;
