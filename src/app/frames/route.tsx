/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

const frames = createFrames();
const handleRequest = frames(async (ctx) => {
  // const billboardMessage = ctx.searchParams.billboardMessage as string || 'Default message';
  
  return {
    // image: <span>{billboardMessage}</span>,
    image: <span>test</span>,
    buttons: [<Button action="post">Click me</Button>],
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;