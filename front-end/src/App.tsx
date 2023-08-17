import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Message from './views/messageModal';
import './styles.sass'
import { useEffect } from 'react';
import {Outlet, useNavigation} from 'react-router-dom';
import Review from './views/ratingModal'
import * as bootstrap from 'bootstrap';
import { Header } from './components/header/header';
import LoadingScreen from './views/loading'
import { MessageProvider } from './context/MessageContext';
import { SearchBarContextProvider } from './context/SearchBarContext';
import { SearchContextProvider } from './context/SearchContext';
import { RatingContextProvider } from './context/RatingContext';
import { LoginContextProvider } from './context/LoginContext';
import { CartContextProvider } from './context/CartContext';


const App = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
  })

  return (
    <main id="main" className="main">
      <div className='container m-0 p-0'>
        <div className='row p-2 d-flex align-items-center justify-content-center'>

          <SearchContextProvider>
            <RatingContextProvider>
                <LoginContextProvider>
                  <SearchBarContextProvider>
                    <CartContextProvider>
                      <MessageProvider>
                      <Message />
                      <Review />
                      <Header />

                      {navigation.state === 'loading' &&
                        <LoadingScreen />
                      }

                      {navigation.state !== 'loading' &&
                        <Outlet />
                      }
                      </MessageProvider>
                    </CartContextProvider>
                  </SearchBarContextProvider>
                </LoginContextProvider>
              </RatingContextProvider>
            </SearchContextProvider>

        </div>
      </div>
    </main>
  )
}

export default App;
