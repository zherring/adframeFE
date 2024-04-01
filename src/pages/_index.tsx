// 'use client'

// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { contractConfig } from '../config'; // Your default contract address

// import { useAccount, useConnect, useDisconnect } from 'wagmi'

// const HomePage = () => {

//   const account = useAccount()
//   const { connectors, connect, status, error } = useConnect()
//   // const { disconnect } = useDisconnect()
//   // const router = useRouter();
  
//   // useEffect(() => {
//   //   router.push(`/${contractConfig.address}`);
//   // }, [router]);

//   // Optionally, you can add a loading state or a splash screen while redirecting
//   return (
//     <div>
//       Hello World <br/>
//       {account.address} <br/>
//       {account.status} <br/>
//     </div>
//   );
// };

// export default HomePage;
