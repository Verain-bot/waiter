import logo from './logo.svg';
import './App.css';
import Main from './views/login';
import Menu from './views/menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './styles.sass'

import {Route, Routes} from 'react-router-dom';

const App = () => {
  return (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/menu" element={<Menu />} />
  </ Routes>
  )
}

export default App;
