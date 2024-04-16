'use client'
import { retrieveMessage } from '../utils/ethersUtils';
import Preview from './components/Preview';
import Interact from './components/Interact';
import { contractConfig } from '../config';
import { Suspense } from 'react';

function InteractFallback() {
  return <div>Loading...</div>
}

function App() {

  return (
    <div className='flex flex-col md:flex-row'>
      <Preview />
      <Suspense fallback={<InteractFallback />}>
        <Interact />
      </Suspense>
    </div>
  )
}

export default App
