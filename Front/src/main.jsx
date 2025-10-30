import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './sass/app.scss'
import App from './App.jsx'
import Header from './components/Header.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <App />
  </StrictMode>,
)
