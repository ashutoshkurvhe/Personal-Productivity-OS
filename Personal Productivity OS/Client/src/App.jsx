import { useEffect } from 'react'
import { subscribeUser } from './utils/subscriber';
import './App.css'

function App() {
  useEffect(() => {
    subscribeUser();
  }, []);
  return (
    <>
        
    </>
  )
}

export default App
