'use client'
import { retrieveMessage } from '../utils/ethersUtils';
import Preview from './components/Preview';
import Interact from './components/Interact';
import { contractConfig } from '../config';


function App() {

  return (
    <div className='flex flex-col md:flex-row'>
      <Preview />
      <Interact />
    </div>
  )
}

export default App
