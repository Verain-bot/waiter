import { CartItem, CartTotal } from './components/cart/cartItem';
import { Header } from './components/header/header';
import { QuantityModifier } from './components/menu/menuItem';
import { useState } from 'react';
const App = ()=>{
    return(
        <>
        <Header />
        <main id="main" class="main">

            <div class='container m-0 p-0'>
                <div class='row p-2 d-flex align-items-center justify-content-center'>

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


                </div>
                
            </div>

        </main>
        </>
            
    )
}



export default App