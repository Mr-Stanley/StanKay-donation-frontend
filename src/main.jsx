import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import './index.css'
import App from './App.jsx'
// import { AuthProvider } from './AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  // <AuthProvider>
  <StrictMode>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </StrictMode>,
  // </AuthProvider>,
)
