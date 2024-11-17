import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/navbar/index.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div  style={{
        position: 'absolute',
        width: 'full',
        height: '188px',
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.83) 0%, rgba(0, 0, 0, 0) 100%)',
      }} className=''>
    <Navbar />
    <App />
    </div>
  </StrictMode>,
)
