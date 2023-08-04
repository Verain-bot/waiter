import {useRef,useState,useEffect,useContext} from 'react'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
import { ReviewItem } from './components/reviews/reviewItem';
import { Rate } from './components/reviews/rate';
import { RatingsContext } from '../App';
import { ModalLayout } from './components/modal/modal';
import { useModal } from '../hooks';

const App = ()=>{
    const ref = useRef(null)
    const Modal = useModal('review')
    const [data, setData] = useContext(RatingsContext)

    useEffect(()=>{
        
        if(Modal!==null && (data.canRate || data.showReviews)){
            Modal.open()
        }

    },[Modal,data])
    
    return(
        <ModalLayout 
            title={data.title}
            id="review"
            footer={<button type="button" class={`btn btn-outline-dark`} onClick={Modal.close} data-dismiss="modal">Close</button>}
            body={<Body props={data} />}
        />
    )
}


const Body= (props)=>{

    const [data, setData] = useContext(RatingsContext)

    return(
        <div class='container m-0 p-0'>

            {data.canRate&&<Rate />}
            {data.showReviews&&<div class='row d-flex align-items-center justify-content-center mt-5'>
                    <h3 class='text-center'>Reviews</h3>
                </div>}
            {data.showReviews&&data.reviews.map((value)=><ReviewItem {...value} />)}
            

        </div>
    )
}

export default App