import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { OrderContextProvider } from './Contexts/orderContext';
import { PauseResumeItemModalProvider } from './Contexts/menuItemModalContext';
import MenuListView from './views/menuListView';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import OrderListView from './views/orderListView';
import ItemListView from './views/itemListView';
import Error from './views/error';
import RouteList from './helper/routeList';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <Error />,
  // @ts-ignore
  children: RouteList.map((route)=>({
    path: route.path,
    element: route.element,
    loader: route.ldr,
    action: route.action
  }))
}])


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <PauseResumeItemModalProvider >
    <OrderContextProvider>
      <RouterProvider router={router}/>
    </OrderContextProvider>
  </PauseResumeItemModalProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
