
export default function OrderPlaceHolder() {
  return (
        <PlaceholderOrderItem />
  )
}

const PlaceholderOrderItem = ()=>{
    const color = 'secondary'
    const num = Math.floor(Math.random() * 6) + 1
    return(
      <div className="row card shadow m-3 zoom" style={{cursor: 'pointer'}}   >
        <div className={`card-header bg-${color}-subtle`} >
            <div className="row" >
                <div className={`col-8 text-${color}-emphasis`}>
                <p className="placeholder-wave">
                    <span className="placeholder col-12"></span>
                </p>
                </div>
                <div className="col-4 text-end">
                <span className={`badge bg-${color}-subtle border border-${color}-subtle text-${color}-emphasis rounded-pill`} data-bs-theme='dark'>
                    
                </span>
                </div>
            </div>
        </div>
    
        
            <ul className={`list-group list-group-flush bg-${color} pt-2 pb-3 px-0 position-relative w-100`} >
            <div>
                
                <li className="list-group-item "  >
                    <span className="text-secondary">
                        <p className="placeholder-wave">
                            {
                                new Array(num).fill(<span className="placeholder col-12"></span>)
                            }
                        </p>
                    </span>
                </li>
            </div>
            </ul>
            
      </div>


        // <div className="col-12 px-3 " data-bs-theme='light'>
        // <p className="placeholder-wave">
        //     <span className="placeholder col-12"></span>
        //     <span className="placeholder col-12"></span>
        //     <span className="placeholder col-12"></span>
        //     <span className="placeholder col-12"></span>
        //     <span className="placeholder col-12"></span>
        // </p>
        // </div>
    )
}