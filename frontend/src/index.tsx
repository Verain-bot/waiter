import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Error from './views/error'
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import RouteList from './utilities/routeList';
import { MessageProvider } from './context/MessageContext';
import { SearchBarContextProvider } from './context/SearchBarContext';
import { SearchContextProvider } from './context/SearchContext';
import { RatingContextProvider } from './context/RatingContext';
import { LoginContextProvider, useLoginContext } from './context/LoginContext';
import { CartContextProvider } from './context/CartContext';
import { getMessagingInstance } from './utilities/firebase';
import { onMessage } from 'firebase/messaging';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const MainApp = ()=>{
  const loginContext = useLoginContext()

  const router = useMemo(()=>createBrowserRouter([{
    path: '/',
    element: <App />,
    errorElement: <Error />,
    // @ts-ignore
    children: RouteList.map(({path, element, ldr, action}) => ({
      path: path,
      element: element,
      loader: ldr? ldr : null,
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

const OM = (async ()=>{
  const messaging = await getMessagingInstance()
    if (messaging)
    onMessage(messaging, (payload : any)=>{
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: process.env.PUBLIC_URL+'/192.png',
  })
})

})()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
