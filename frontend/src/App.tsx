import './App.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Message from './components/modal/messageModal';
import './styles.sass'
import { useEffect } from 'react';
import {Outlet, useLocation, useMatches, useNavigate, useNavigation} from 'react-router-dom';
import Review from './components/modal/ratingModal'
import { Header } from './components/header/header';
import LoadingScreen from './views/loading'
import { useMessageContext } from './context/MessageContext';
import { useLoginContext } from './context/LoginContext';
import RouteList, { PATHS, PathType } from './utilities/routeList';
import Footer from './components/footer/footer';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComp from './components/error/ErrorComp';
import { useSearchContext } from './context/SearchContext';

const App = () => {
  const [login, setLogin] = useLoginContext()
  const navigation = useNavigation();
  const matches = useMatches()
  const navigate = useNavigate()
  const [message, setMessage] = useMessageContext()
  const [search, setSearch] = useSearchContext()

  useEffect(()=>{
    window.scrollTo(0,0)
    setSearch('')
    if(matches.length > 0 && login.login !== null)
      {
        // find index
        const index = parseInt(matches[matches.length-1].id.split('-')[1])
        
        if(RouteList[index].pathType.includes(PathType.LOGGED_IN) && !RouteList[index].pathType.includes(PathType.LOGGED_OUT) && (login.login == false || login.user == null))
        {
          navigate(PATHS.LOGIN)
          setMessage({
            heading: 'Login Required',
            body: 'Please login to continue',
            type: 'error'
          })
        }

        else if(RouteList[index].pathType.includes(PathType.LOGGED_OUT)  && !RouteList[index].pathType.includes(PathType.LOGGED_IN) && (login.login == true || login.user != null))
        {
          navigate(PATHS.RESTAURANT_LIST)
        }

      }
  }, [JSON.stringify(matches), login.login])

  return (
    <main id="main" className="main">
      
      <div className='container m-0 p-0'>

          <Message />
          <Review />
          <Header />
        <div className='row'>

          {navigation.state === 'loading' &&
            <LoadingScreen />
          }

          {navigation.state !== 'loading' &&
          <div className='view d-flex justify-content-center loading-content'>
            <ErrorBoundary FallbackComponent={ErrorComp} onReset={()=> window.location.reload()}>
              <Outlet />
            </ErrorBoundary>
          </div>
          }
        
          
        </div>
          <Footer />
      </div>
    </main>
  )
}

export default App;
