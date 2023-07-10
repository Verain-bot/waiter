import {useRef,useState,useEffect,useContext} from 'react'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
import { ReviewItem } from './components/reviews/reviewItem';
import { Rate } from './components/reviews/rate';
import { RatingsContext } from '../App';

const App = ()=>{
    const ref = useRef(null)
    const [Modal, setModal] = useState(null)
    const [data, setData] = useContext(RatingsContext)

    useEffect(()=>{
        if (Modal===null){
            var m = new bootstrap.Modal(ref.current)
            setModal(m)
        }
        
        if(Modal!==null && (data.canRate || data.showReviews)){
            open()
        }

    },[Modal,data])

    const open = ()=>{
        Modal.show()
    }
    
    const close = ()=>{
        Modal.hide()
    }
    return(
        <>
        <div class="modal fade" id="review" tabindex="-1" role="dialog" ref={ref}>
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class={`modal-header`} >
                <h5 class="modal-title" >{data.title}</h5>
                <button class="btn" onClick={close} aria-label="Close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body p-0">
                
                <div class='container m-0 p-0'>

                    {data.canRate&&<Rate />}
                    {data.showReviews&&<div class='row d-flex align-items-center justify-content-center mt-5'>
                            <h3 class='text-center'>Reviews</h3>
                        </div>}
                    {data.showReviews&&data.reviews.map((value)=><ReviewItem {...value} />)}
                    

                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class={`btn btn-outline-dark`} onClick={close} data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default App