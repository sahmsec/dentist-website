import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Globals first, components second. Component stylesheets are pulled in by the
// components themselves further down this import graph, so loading tokens and
// base here means a component rule always wins a specificity tie against the
// shared vocabulary it is overriding (e.g. .header__cta beating .btn).
import './styles/tokens.css'
import './styles/base.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
