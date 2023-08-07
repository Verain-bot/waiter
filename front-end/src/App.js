import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Message from './views/messageModal';
import './styles.sass'
import { createContext, useEffect, useRef, useState } from 'react';
import {Outlet, Route, Routes, useNavigation} from 'react-router-dom';
import Review from './views/ratingModal'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
import { Header } from './views/components/header/header';
import LoadingScreen from './views/loading'
import { useStorage } from './hooks';


export const SearchContext = createContext(null)
export const MessageContext = createContext(null)
export const RatingsContext = createContext(null)
export const LoginContext = createContext(null)
export const SearchBarContext = createContext(null)
export const CartContext = createContext(null)

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
  const [cart,setCart] = useStorage('cart',[])
  const navigation = useNavigation()

  useEffect(()=>{
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
    
    console.log('cart', JSON.stringify(cart) )
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
    <CartContext.Provider value={[cart,setCart]}>
      <Message />
      <Review />
      <Header />

      {navigation.state === 'loading'&&
        <LoadingScreen />
      }

      {navigation.state !== 'loading'&&
        <Outlet />
      }


    </CartContext.Provider>
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
