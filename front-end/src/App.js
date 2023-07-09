import './App.css';
import Main from './views/login';
import Menu from './views/menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import RestaurantList from './views/restaurantList';
import Loading from './views/loading';
import Message from './views/messageModal';
import './styles.sass'
import { createContext, useState } from 'react';
import Cart from './views/cart'
import {Route, Routes} from 'react-router-dom';

export const SearchContext = createContext(null)
export const MessageContext = createContext(null)

const App = () => {
  const [search,setSearch] = useState('')
  const [message,setMessage] = useState({'heading':'', 'body':'', 'type':''})

  return (
    <main id="main" class="main">
      <div class='container m-0 p-0'>
      <div class='row p-2 d-flex align-items-center justify-content-center'>
    <SearchContext.Provider value={[search,setSearch]}>
    <MessageContext.Provider value={[message,setMessage]}>
      <Message />


      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/res" element={<RestaurantList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/loading" element={<Loading />} />
      </ Routes>
    </MessageContext.Provider>
    </SearchContext.Provider>
    </div>
                
    </div>
    </main>
  )
}

export default App;
