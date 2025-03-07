import {useRef,useState,useEffect,useContext} from 'react'
import * as bootstrap from 'bootstrap';
import ReviewItem  from '../reviews/reviewItem';
import  Rate  from '../reviews/rate';
import { useRatingContext } from '../../context/RatingContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigation } from 'react-router-dom';

const App = ()=>{
    const ref = useRef(null)
    const [data, setData] = useRatingContext()
    const [show, setShow] = useState(false)
    const navigation = useNavigation()
    const closeModal = ()=>{
        setShow(false)
    
    }

    useEffect(()=>{
        
        if(data.canRate || data.showReviews){
            setShow(true)
        }

    },[data])

    useEffect(()=>{
      if (navigation.state==='idle')
      {
        setShow(false)
        window.scrollTo(0,0)
      }
      
    },[navigation.state])
    
    return(
        <Modal show={show} onHide={closeModal} backdrop='static' centered>
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='container m-0 p-0'>

            {data.canRate&&<Rate setShow={setShow} />}
            {data.showReviews&&<div className='row d-flex align-items-center justify-content-center mt-5'>
                    <h3 className='text-center'>Reviews</h3>
                </div>}
            {data.showReviews&&data.reviews.map((value)=><ReviewItem {...value} />)}
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
}



export default App