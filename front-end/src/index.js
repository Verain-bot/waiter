import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Error from './views/error'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, RouterProvider, createBrowserRouter} from 'react-router-dom';
import RouteList from './utilities/routeList';
import { MessageProvider } from './context/MessageContext';
import { SearchBarContextProvider } from './context/SearchBarContext';
import { SearchContextProvider } from './context/SearchContext';
import { RatingContextProvider } from './context/RatingContext';
import { LoginContextProvider, useLoginContext } from './context/LoginContext';
import { CartContextProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const MainApp = ()=>{
  const loginContext = useLoginContext()

  const router = useMemo(()=>createBrowserRouter([{
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: RouteList.map(({path, element, ldr, action}) => ({
      path: path,
      element: element,
      loader: ldr,
      action: action? action(loginContext) : null
    }))
  }])
,[])

  return(
    <RouterProvider router={router} />
  )
}



root.render(
  <React.StrictMode>

    <MessageProvider>
      <SearchContextProvider>
        <RatingContextProvider>
          <SearchBarContextProvider>
            <CartContextProvider>

              <LoginContextProvider>
                <MainApp />
              </LoginContextProvider>
      
            </CartContextProvider>
          </SearchBarContextProvider>
        </RatingContextProvider>
      </SearchContextProvider>
    </MessageProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


reportWebVitals();

// add serviceWorker
console.log(navigator)

if ('serviceWorker' in navigator)
{
  window.addEventListener('load', async () => {
    try{
      const registration = await navigator.serviceWorker.register('/service-worker.js')
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
