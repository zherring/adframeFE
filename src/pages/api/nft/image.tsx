import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { contractConfig } from '../../../config'; 
import { retrieveMessage, retrieveUrl } from '../../../utils/ethersUtils';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const contractAddress = contractConfig.address;
  const message = await retrieveMessage(contractAddress);
  const url = await retrieveUrl(contractAddress);
  
  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength - 3)}...`;
  }

  // Truncate message and URL to fit within the image
  const truncatedMessage = truncateText(message, 50); // Adjust maxLength as needed

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', color: 'white', fontFamily: 'sans-serif' }}>
        <h1 style={{ 
          textAlign: 'center', 
          fontSize: '48px', 
          margin: '0',
          fontFamily: 'var(--font-spline)',
          whiteSpace: 'wrap',
        }}>{truncatedMessage}</h1>
        <p style={{ 
          fontSize: '24px', 
          margin: '20px 0 0 0',
          fontFamily: 'var(--font-spline)'
        }}>{url}</p>
      </div>
    ),
    {
      width: 650,
      height: 650,
    },
  );
}
