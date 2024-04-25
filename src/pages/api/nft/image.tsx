import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export default async function handler(req: NextRequest) {

  const url = new URL(req.url);

  const adMessage = url.searchParams.get('message') || 'Sponsor to Cross the Threshhold'
  const adUrl =  url.searchParams.get('url') || ''
  
  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength - 3)}...`;
  }

  // Truncate message and URL to fit within the image

  return new ImageResponse(
    (
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'black', 
        color: 'white', 
        fontFamily: 'sans-serif',
        backgroundImage: 'url(https://zherring-portfolio.s3.amazonaws.com/basedghouls-bg.png)', // Update this URL
        backgroundSize: 'cover', // Ensures the background covers the whole area
        backgroundPosition: 'center' // Centers the background image
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          fontSize: '48px', 
          margin: '0',
          fontFamily: 'var(--font-spline)',
          whiteSpace: 'wrap',
        }}>{adMessage}</h1>
        <p style={{ 
          fontSize: '20px', 
          color: '#B1B1B1',
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
