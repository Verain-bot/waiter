import { MenuAccordion } from './menuSubCategoryAccordion'
import { MenuItem } from './menuItem'
export const MenuSection = (props) =>{
    return(
        <MenuAccordion name={props.name}>
                    
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            
        </MenuAccordion>
    )
}