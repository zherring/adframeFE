/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { retrieveMessage, retrieveUrl } from "@/utils/ethersUtils";
import { contractConfig } from "@/config"
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

  return {
    image: (
      <div tw="bg-black text-white text-6xl w-full h-full justify-center items-center flex flex-col gap-4">
          <span>{message}</span>
          <br />
          <span tw="text-3xl">{url}</span>
      </div>
    ),
    buttons: [
      <Button action="link" target={"#"}>Advertize</Button>,
      <Button action="link" target={"#"}>RevShare</Button>
    ]
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;