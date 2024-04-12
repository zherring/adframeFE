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

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', color: 'white', fontFamily: 'sans-serif' }}>
        <h1 style={{ textAlign: 'center', fontSize: '48px', margin: '0' }}>{message}</h1>
        <p style={{ fontSize: '24px', margin: '20px 0 0 0' }}>{url}</p>
      </div>
    ),
    {
      width: 650,
      height: 650,
    },
  );
}
