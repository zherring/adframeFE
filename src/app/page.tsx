'use client'
import { retrieveMessage } from '../utils/ethersUtils';
import Preview from './components/Preview';
import Interact from './components/Interact';
import { contractConfig } from '../config';
import { Suspense } from 'react';
import { AdProvider } from '../context/SetMessage';

function InteractFallback() {
  return <div>Loading...</div>
}

function App() {

  return (
    <div className='flex flex-col md:flex-row'>
      <AdProvider>
        <Preview />
        <Suspense fallback={<InteractFallback />}>
          <Interact />
        </Suspense>
      </AdProvider>
    </div>
  )
}

export default App
