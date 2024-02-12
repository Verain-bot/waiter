import React from 'react'
import { LoaderFunction, useLoaderData, useNavigate, useNavigation } from 'react-router'
import { makeRequest } from '../helper/fetchData'
import { APIRoutes } from '../helper/APIRoutes'
import PauseResumeMenuItemModal from '../components/modals/pauseResumeMenuItemModal'
import { usePauseResumeItemModal } from '../Contexts/menuItemModalContext'

type MenuFetch = {
  id: number
  name: string
  price: number
  isActive: boolean
}

export default function MenuListView() {
  const data = useLoaderData() as MenuFetch[]

  const inactiveItems = data.sort((a,b)=>a.name.localeCompare(b.name)).filter((item)=>!item.isActive).map((item)=><ListItem name={item.name} price={item.price} id={item.id} key={item.id} />)
  const activeItems = data.sort((a,b)=>a.name.localeCompare(b.name)).filter((item)=>item.isActive).map((item)=><ListItem name={item.name} price={item.price} isActive key={item.id} id={item.id} />)

  return (
    <main>
      <div className="container">
        <div className="row my-3 text-center">
            <h1>
              Menu Items
            </h1>    
        </div>
        <div className="row d-flex align-items-center justify-content-center flex-lg-row flex-column ">

        <div className='col-xl-4 col-lg-5 col-md-6 col-12 p-2'>
          <div className=" p-0 card shadow ">
            <div className="card-body bg-danger-subtle pt-2 pb-0 ">
            <h5 className="card-title text-danger-emphasis ">
              Inactive Items
            </h5>
            </div>

            <ul className="list-group list-group-flush px-0 py-2 pt-1 bg-danger">
              <div className="menu-list">
              {inactiveItems.length===0 && <li className="list-group-item text-center text-danger">No Inactive Items</li>}
              {inactiveItems}
              </div>
            </ul>
          </div>
        </div>

        <div className='col-1 d-flex align-items-center justify-content-center'>
          <i className='bi bi-arrow-left-right text-center text-dark d-none d-lg-block' style={{fontSize: 50}}></i>
          <i className='bi bi-arrow-down-up text-center text-dark d-lg-none d-block' style={{fontSize: 50}}></i>
        </div>

        <div className='col-xl-4 col-lg-5 col-md-6 col-12 px-2'>
        <div className="p-0 card shadow">
          <div className="card-body bg-success-subtle pt-2 pb-0">
          <h5 className="card-title text-success-emphasis">
            Active Items
          </h5>
          </div>

          <ul className="list-group list-group-flush px-0 py-2 pt-1 bg-success ">
            <div className="menu-list">

            {activeItems.length===0 && <li className="list-group-item text-center text-success">No Active Items</li>}
            {activeItems}
            </div>
          </ul>
        </div>
        </div>
        </div>
      </div>
      
    </main>
  )
}

type ListItemProps= {
  name: string
  price: number
  isActive?: boolean
  id: number
}

const ListItem = (props : ListItemProps)=>{
  const clsName = props.isActive?"text-danger bi-x-circle":"text-success bi-check-circle"
  const [modalProps, setModalProps] = usePauseResumeItemModal()
  

  const handleClick = ()=>{
    setModalProps({
      show: true,
      menuItemID: props.id,
      itemName: props.name,
      currentlyActive: props.isActive??false
    })
  }
  
  return(
    <li className="list-group-item">
      <div className='container'>
        <div className="row">
          <div className="col-7">

        <strong className=''>
          {props.name}
        </strong>
          </div>
          <div className="col-5 text-end">
            <span className=''>
              Rs. {props.price}

              <i className={"bi ms-3 px-0"+ clsName} onClick={handleClick} />
            </span>
          </div>
        </div>
      </div>
    </li>
  )
}


export const MenuListLoader : LoaderFunction = async (Arg) =>{
  const {json,message, response} = await makeRequest(APIRoutes.ADMIN_MENU, Arg.request, new FormData())
  return json.results
}