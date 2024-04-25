import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';


export default async function handler(req: NextRequest) {

  const url = new URL(req.url);

  const adMessage = url.searchParams.get('message') || 'This Space for Sale'
  const adUrl =  url.searchParams.get('url') || 'adframe.xyz'
  
  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength - 3)}...`;
  }

  // Truncate message and URL to fit within the image

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', color: 'white', fontFamily: 'sans-serif' }}>
        <h1 style={{ 
          textAlign: 'center', 
          fontSize: '48px', 
          margin: '0',
          fontFamily: 'var(--font-spline)',
          whiteSpace: 'wrap',
        }}>{adMessage}</h1>
        <p style={{ 
          fontSize: '24px', 
          margin: '20px 0 0 0',
          fontFamily: 'var(--font-spline)'
        }}>{adUrl}</p>
      </div>
    ),
    {
      width: 650,
      height: 650,
    },
  );
}
