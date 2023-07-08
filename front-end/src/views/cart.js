import { CartCredits } from './components/cart/cartCredits';
import { CartFooter } from './components/cart/cartFooter';
import { CartItem, CartTotal } from './components/cart/cartItem';

import { Header } from './components/header/header';

const App = ()=>{
    return(
        <>
        <Header />
        <div class='col-12 col-md-6'>

            <div class='row card shadow'>
                <h5 class='card-title'>Cart</h5>
                <div class='list-group list-group-flush'>
                    <CartItem name='Pizza' price='231'/>
                    <CartItem name='Pizza' price='231'/>
                    <CartItem name='Pizza' price='231'/>
                    <CartItem name='Pizza' price='231'/>
                    <CartTotal />
                </div>
            </div>

            <CartCredits />
            <CartFooter />
        </div>
        </>
            
    )
}



export default App