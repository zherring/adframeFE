/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { retrieveMessage, retrieveUrl } from "@/utils/ethersUtils";
import { contractConfig } from "@/config"
import { stringify } from "querystring";
// import { GetServerSideProps } from 'next';

const frames = createFrames();
const address = contractConfig.address;

const handleRequest = frames(async () => {
  let message;
  let url;
  try {
    // Use the retrieveMessage function to get the message
    message = await retrieveMessage(address);
    url = await retrieveUrl(address);
  } catch (error) {
    console.error('Error fetching message:', error);
    message = 'Error loading message'; // Fallback message in case of an error
  }

  function isValidUrl(string : string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
  const validUrl = isValidUrl(url || '');

  return {
    image: (
      <div tw="bg-black text-white text-6xl w-full h-full justify-center items-center flex flex-col gap-4">
          <span>{message}</span>
          <br />
          <span tw="text-3xl">{url}</span>
      </div>
    ),
    buttons: [
      // @ts-ignore
      validUrl ? <Button action="link" target={url}>{url}</Button> : null,
      <Button action="link" target={"https://adframe.vercel.app"}>Advertize</Button>,
      <Button action="link" target={"https://adframe.vercel.app"}>RevShare</Button>
    ]
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;