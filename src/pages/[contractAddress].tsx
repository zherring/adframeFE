// pages/[contractAddress].tsx
import { useRouter } from 'next/router';
import { useReadContract } from 'wagmi';
import { abi } from '../utils/abi'; // Adjust the path as necessary

export default function ContractPage() {
  const router = useRouter();
  const { contractAddress } = router.query;

  const { data, isError, isLoading } = useReadContract({
    address: contractAddress,
    contractInterface: abi,
    functionName: 'billboard', // Assuming 'billboard' is the function to get the message
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error or no data</div>;

  // Pass `data` to your frame component or use it directly here
  return (
    <div>
      Billboard Message: {data}
      {/* Render your frame component here and pass `data` as props */}
    </div>
  );
}