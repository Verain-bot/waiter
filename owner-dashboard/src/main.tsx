import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { OrderContextProvider } from './Contexts/orderContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OrderContextProvider>
      <App />
    </OrderContextProvider>
  </React.StrictMode>,
)

// add ServiceWorker

if ('serviceWorker' in navigator)
{
  window.addEventListener('load', async () => {
    try{
      const registration = await navigator.serviceWorker.register('/sw.js')
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    }
    catch(err){
      console.log('SW registration failed: ', err);
    }
  })
}
