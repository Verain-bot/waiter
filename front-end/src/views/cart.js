import { CartItem, CartTotal } from './components/cart/cartItem';
import { Header } from './components/header/header';
import { QuantityModifier } from './components/menu/menuItem';
import { useState } from 'react';
const App = ()=>{
    return(
        <>
        <Header />
        
            <div class='col-12 col-md-6 card shadow'>

                <h5 class='card-title'>Cart</h5>

                <div class='list-group list-group-flush'>
                    <CartItem name='Pizza' price='231'/>
                    <CartItem name='Pizza' price='231'/>
                    <CartItem name='Pizza' price='231'/>
                    <CartItem name='Pizza' price='231'/>
                    <CartTotal />
                    
                </div>

            </div>
        </>
            
    )
}



export default App