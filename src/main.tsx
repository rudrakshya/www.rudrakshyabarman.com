import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// During development, we'll use the client router
// In production, the server will handle routing
import { ClientRouter } from "@react-router/client-runtime";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClientRouter />
  </StrictMode>,
)