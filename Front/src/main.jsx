import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './sass/app.scss'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <App />
  </StrictMode>,
)
