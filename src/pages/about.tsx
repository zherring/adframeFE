import React from 'react';
import { fetchMetadata } from "frames.js/next";


export async function generateMetadata() {
  return {
    title: "About Page",
    // provide full URL to your /frames endpoint
    ...(await fetchMetadata(
      new URL("/frames", process.env.VERCEL_URL || "http://localhost:3000")
    )),
  };
}

function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page.</p>
    </div>
  );
}

export default About;