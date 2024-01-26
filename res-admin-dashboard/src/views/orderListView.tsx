import PromptModal from '../components/modals/promptModal';
import OrderPlaceHolder from '../components/orderCardPlaceholder';
import OrderCard from '../components/orderCard'
//import OrderPlaceHolder from './components/orderCardPlaceholder';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import React from 'react'
import { useOrderContext } from '../Contexts/orderContext';

type Props = {
}

export default function OrderListView(props: Props) {
    const [data, _] = useOrderContext()
    return (
        <main>
            
                
                <ResponsiveMasonry columnsCountBreakPoints={{250: 1, 700: 2, 1000: 3, 1200: 4}} >
                <Masonry >
                {
                    data===null?  new Array(11).fill(<OrderPlaceHolder />)  : data.map((item )=>
                    <OrderCard {...item} key={item.id} />
                    )
                }
                </Masonry>
                </ResponsiveMasonry>
        </main>
    )
}
