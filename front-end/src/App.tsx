import './App.css';
import * as bootstrap from 'bootstrap';
//import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Message from './views/messageModal';
import './styles.sass'
import { useEffect } from 'react';
import {Outlet, useMatches, useNavigate, useNavigation} from 'react-router-dom';
import Review from './views/ratingModal'
import { Header } from './components/header/header';
import LoadingScreen from './views/loading'
import { useMessageContext } from './context/MessageContext';
import { useLoginContext } from './context/LoginContext';
import RouteList, { PATHS, PathType } from './utilities/routeList';

const App = () => {
  const [login, setLogin] = useLoginContext()
  const navigation = useNavigation();
  const matches = useMatches()
  const navigate = useNavigate()
  const [message, setMessage] = useMessageContext()



  useEffect(() => {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
  },[])

  useEffect(()=>{
    console.log(matches)

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
          setMessage({
            heading: 'Already Logged In',
            body: 'You are already logged in. If you wish to view this page, please logout.',
            type: 'error'
          })
        }

      }
  }, [JSON.stringify(matches), login.login])

  return (
    <main id="main" className="main">
      <div className='container m-0 p-0'>
        <div className='row p-2 d-flex align-items-center justify-content-center'>
              
          <Message />
          <Review />
          <Header />

          {navigation.state === 'loading' &&
            <LoadingScreen />
          }

          {navigation.state !== 'loading' &&
            <Outlet />
          }

        </div>
      </div>
    </main>
  )
}

export default App;
