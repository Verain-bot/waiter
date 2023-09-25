import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.sass'
import Header from './components/header'
import OrderCard from './components/orderCard'
const App = ()=> {

  return (
    <>
      <Header/>
      <main>
        <div className="col-12 ">
          
            <div className="row w-100 p-0 m-0">
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            </div>
          </div>
      </main>
    </>
  )
}




export default App
