import logo from './logo.svg';
import './App.css';
import Main from './views/index';
import {Route, Routes} from 'react-router-dom';

const App = () => {
  return (
  <Routes>
    <Route path="/" element={<Main />} />
  </ Routes>
  )
}

export default App;
