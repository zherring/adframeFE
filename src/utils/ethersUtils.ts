
import { ethers } from 'ethers';
import { abi } from './abi'; // Adjust the path as necessary

const baseProviderUrl = 'https://mainnet.base.org';
const provider = new ethers.JsonRpcProvider(baseProviderUrl);

export async function retrieveMessage(contractAddress: string): Promise<string> {
  const contract = new ethers.Contract(contractAddress, abi, provider);
    try {
      const message = await contract.billboard();
      return message;
    } catch (error) {
      console.error('Error fetching the billboard message from Base:', error);
      throw new Error('Failed to retrieve the billboard message.');
    }
}

// Function to retrieve the URL
export async function retrieveUrl(contractAddress: string): Promise<string> {
  // Create a contract instance with the provided address
  const contract = new ethers.Contract(contractAddress, abi, provider);
  try {
    const url = await contract.billboardURL();
    return url;
  } catch (error) {
    console.error('Error fetching the URL:', error);
    throw new Error('Failed to retrieve the URL.');
  }
}

// Function to retrieve the epochs
export async function retrieveEpochs(contractAddress: string): Promise<number> {
  // Create a contract instance with the provided address
  const contract = new ethers.Contract(contractAddress, abi, provider);

  try {
    const epochs = await contract.epochs();
    return epochs;
  } catch (error) {
    console.error('Error fetching the epochs:', error);
    throw new Error('Failed to retrieve the epochs.');
  }
}

// Function to retrieve the active tokens
export async function retrieveActiveTokens(contractAddress: string): Promise<number> {
  // Create a contract instance with the provided address
  const contract = new ethers.Contract(contractAddress, abi, provider);

  try {
    const totalActiveTokens = await contract.totalActiveTokens();
    return totalActiveTokens;
  } catch (error) {
    console.error('Error fetching the active tokens:', error);
    throw new Error('Failed to retrieve the active tokens.');
  }
}