type CartFooterProps = {}

export const CartFooter = (props : CartFooterProps) =>{
    return(
        <div className='row sticky-bottom d-flex flex-row'>
            <button className='btn btn-dark col-6'>
                <strong>
                    Menu
                </strong>
            </button>

            <button className='btn btn-danger col-6'>
                <strong>
                    Checkout
                </strong>
            </button>

        </div>
    )
}