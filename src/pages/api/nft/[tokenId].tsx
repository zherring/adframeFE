import { NextApiRequest, NextApiResponse } from 'next';
import { contractConfig } from '../../../config'; 
import { retrieveMessage, retrieveUrl } from '../../../utils/ethersUtils';

type NftMetadata = {
  name: string;
  description: string;
  image: string;
  message: string;
  url: string;
};

const contractAddress = contractConfig.address;
const url = await retrieveUrl(contractAddress);
const message = await retrieveMessage(contractAddress);

export default function handler(req: NextApiRequest, res: NextApiResponse<NftMetadata | { error: string }>) {
  const tokenId = req.query.tokenId;

  if (!contractAddress) {
    return res.status(500).json({ error: 'Default contract address is not configured.' });
  }

  // Define the metadata structure using the default contract address
  const metadata: NftMetadata = {
    name: "AdFrame #" + tokenId,
    description: "A unique NFT that displays your message on a digital billboard.",
    image: generateImageUrl(message, url),
    message: message,
    url: url,
  };

  // Send the metadata as a JSON response
  res.status(200).json(metadata);
}

// This function generates the URL for the image based on the contract address.
function generateImageUrl(message: string, url: string) {
  const baseUrl = "https://adframe.xyz"
    // Encode the parameters to ensure they are safe for URL inclusion
    const encodedMessage = encodeURIComponent(message);
    const encodedUrl = encodeURIComponent(url);
  
  return `${baseUrl}/api/nft/image?message=${encodedMessage}&url=${encodedUrl}`;
}
