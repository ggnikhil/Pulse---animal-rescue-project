import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './features/shared/global.scss'
import App from './App.jsx'
import { ScoutProvider } from './features/scout/scout.context.jsx'
import { InformerProvider } from './features/informer/informer.context.jsx'

const AppProviders = ({ children }) => (
  <ScoutProvider>
    <InformerProvider>
      {children}
    </InformerProvider>
  </ScoutProvider>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
)