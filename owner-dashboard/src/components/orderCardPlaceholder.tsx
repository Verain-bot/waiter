
export default function OrderPlaceHolder() {
  return (
        <PlaceholderOrderItem />
  )
}

const PlaceholderOrderItem = ()=>{
    return(

        <div className="col-12 p-3 " data-bs-theme='light'>
    <p className="placeholder-wave">
        <span className="placeholder col-10"></span>
        <span className="placeholder col-12"></span>
        <span className="placeholder col-12"></span>
        <span className="placeholder col-8"></span>
        <span className="placeholder col-10"></span>
        <span className="placeholder col-11"></span>
        <span className="placeholder col-12"></span>
        <span className="placeholder col-11"></span>
        <span className="placeholder col-12"></span>
        <span className="placeholder col-11"></span>
        <span className="placeholder col-12"></span>
        <span className="placeholder col-11"></span>
        <span className="placeholder col-12"></span>
        <span className="placeholder col-10"></span>
        <span className="placeholder col-8"></span>
    </p>
</div>
    )
}