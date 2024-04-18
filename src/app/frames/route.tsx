/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { getTokenUrl } from "frames.js";
import { retrieveMessage, retrieveUrl } from "@/utils/ethersUtils";
import { contractConfig } from "@/config"
import { stringify } from "querystring";
import { base } from "viem/chains";
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
      <Button action="link" target={"https://adframe.xyz/?tab=set"}>Advertize</Button>,
      <Button 
        action="mint"
        target={getTokenUrl({
        address: "0x34E4745fd669df2151D9044f07717C4ccBF41ed2",
        chain: base
        })}>Mint</Button>,
    ]
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;