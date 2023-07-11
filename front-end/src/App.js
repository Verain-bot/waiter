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
import { createContext, useEffect, useState } from 'react';
import Cart from './views/cart'
import {Route, Routes} from 'react-router-dom';
import OrderDetail from './views/orderDetail';
import Review from './views/ratingModal'
import OrderList from './views/orderList';
import Credits from './views/credits'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
import { Header } from './views/components/header/header';


export const SearchContext = createContext(null)
export const MessageContext = createContext(null)
export const RatingsContext = createContext(null)
export const LoginContext = createContext(null)
export const SearchBarContext = createContext(null)

const App = () => {
  const [search,setSearch] = useState('')
  const [message,setMessage] = useState({'heading':'', 'body':'', 'type':''})
  const [ratings, setRatings] = useState({
    'title' : 'Title',
    'canRate' : false,
    'showReviews': false,
    'reviews' : [
        {
            'name' : 'Verain',
            'stars' : 4,
            'body' : 'Something, Something, Something, Something, Something, Something, Something, Something, Something, Something, Something, Something, Something, Something, '
        },
    ]
})
  const [login, setLogin] = useState({login:false, user:{}})
  const [searchBar, setSearchBar] = useState(false)

  useEffect(()=>{
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
    console.log('asd')
  })


  return (
    <main id="main" class="main">
      <div class='container m-0 p-0'>
      <div class='row p-2 d-flex align-items-center justify-content-center'>
    
    <SearchContext.Provider value={[search,setSearch]}>
    <MessageContext.Provider value={[message,setMessage]}>
    <RatingsContext.Provider value={[ratings, setRatings]}>
    <LoginContext.Provider value={[login, setLogin]}>
    <SearchBarContext.Provider value={[searchBar, setSearchBar]}>

      <Message />
      <Review />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/res" element={<RestaurantList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/order" element={<OrderDetail />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/credits" element={<Credits />} />
      </ Routes>

    </SearchBarContext.Provider>
    </LoginContext.Provider>
    </RatingsContext.Provider>
    </MessageContext.Provider>
    </SearchContext.Provider>
    </div>
                
    </div>
    </main>
  )
}

export default App;
