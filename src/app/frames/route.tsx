/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { redirect } from "frames.js/core";
import { getTokenUrl } from "frames.js";
import { retrieveMessage, retrieveUrl } from "@/utils/ethersUtils";
import { contractConfig } from "@/config"
import { stringify } from "querystring";
import { base } from "viem/chains";

const frames = createFrames({
  basePath: "/frames"
});
const address = contractConfig.address;

const handleRequest = frames(async (ctx) => {
  if (ctx.pressedButton?.action === "post_redirect") {
    // when post_redirect button is clicked you must return a redirect response
    return redirect(`/frames/`)
  }

    console.log(ctx);

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
      <div tw="bg-black text-white text-6xl w-full h-full justify-center items-center flex flex-col gap-4 text-center">
          <span>{message}</span>
          <br />
          <span tw="text-3xl text-center">{url}</span>
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
        // <Button action="post_redirect">Refresh</Button>
    ]
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;