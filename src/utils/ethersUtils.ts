
import { ethers } from 'ethers';
import { abi } from './abi'; // Adjust the path as necessary

const baseProviderUrl = 'https://sepolia.base.org';

export async function retrieveMessage(contractAddress: string): Promise<string> {
  
  const provider = new ethers.JsonRpcProvider(baseProviderUrl);
  const contract = new ethers.Contract(contractAddress, abi, provider);
  
  // console.log("loggingprovider, contract", provider, contract);
  // return "test";
    try {
      const message = await contract.billboard();
      return message;
    } catch (error) {
      console.error('Error fetching the billboard message from Sepolia Base:', error);
      throw new Error('Failed to retrieve the billboard message.');
    }
}