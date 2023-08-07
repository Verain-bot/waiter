import { MenuAccordion } from './menuSubCategoryAccordion'
import { MenuItem } from './menuItem'
export const MenuSection = (props) =>{
    return(
                
        <MenuAccordion name={props.name}>
        {props.items.map((item)=>(<MenuItem {...item}  restaurantID={props.restaurantID} />))}
        </MenuAccordion>
        
    )
}