import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { useEffect } from 'react'

const SITE_ID = 'e3e9d980-a545-47a5-a1df-dc843bade4bb';

function WrapperApp() {
  useEffect(() => {
    if (window.PixelFactoryAnalytics) {
      window.PixelFactoryAnalytics.trackPageView(SITE_ID);
      window.PixelFactoryAnalytics.setupClickTracking(SITE_ID);
    }
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WrapperApp />
  </StrictMode>,
)
