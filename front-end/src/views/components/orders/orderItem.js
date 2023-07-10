export const OrderListItem = (props)=>{
    return(
        <div class='row'>
            <hr class='p-0 m-0'/>
            <div class='col-12 p-2'>
                <div class='row px-2'>
                    
                    <div class='col-9 p-1 m-0'>
                        <span class='text-muted small m-0 p-0'>#{props.id}</span>
                        <h6 class='p-0 m-0'>{props.restaurant}</h6>
                        <span class='small m-0 p-0'>{props.quantity} item(s)</span>
                    </div>
                    <div class='col-3 p-0 m-0 d-flex flex-column justify-content-center align-items-center'>
                        
                        <span class='text-muted small'>Total:</span>
                        <h6 class='p-0 m-0'>{props.price}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}