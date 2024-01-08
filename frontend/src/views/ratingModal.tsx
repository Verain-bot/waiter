import {useRef,useState,useEffect,useContext} from 'react'
import * as bootstrap from 'bootstrap';
import ReviewItem  from '../components/reviews/reviewItem';
import  Rate  from '../components/reviews/rate';
import { ModalLayout } from '../components/modal/modal';
import useModal from '../hooks/useModal';
import { useRatingContext } from '../context/RatingContext';

const App = ()=>{
    const ref = useRef(null)
    const Modal = useModal('review')
    const [data, setData] = useRatingContext()

    useEffect(()=>{
        
        if(Modal!==null && (data.canRate || data.showReviews)){
            Modal.open()
        }

    },[data])
    
    return(
        <ModalLayout 
            title={data.title}
            id="review"
            footer={<button type="button" className={`btn btn-outline-dark`}  onClick={Modal.close} data-bs-dismiss="modal">Close</button>}
            body={<Body />}
        />
    )
}


const Body= ()=>{

    const [data, setData] = useRatingContext()

    return(
        <div className='container m-0 p-0'>

            {data.canRate&&<Rate />}
            {data.showReviews&&<div className='row d-flex align-items-center justify-content-center mt-5'>
                    <h3 className='text-center'>Reviews</h3>
                </div>}
            {data.showReviews&&data.reviews.map((value)=><ReviewItem {...value} />)}
            
        
        </div>
    )
}

export default App