import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Error from './views/error'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, RouterProvider, createBrowserRouter} from 'react-router-dom';
import RouteList from './utilities/routeList';
import { LoginContextProvider, useLoginContext } from './context/LoginContext';

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
    <LoginContextProvider>
      <MainApp />
    </LoginContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
