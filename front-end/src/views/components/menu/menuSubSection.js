import { MenuAccordion } from './menuSubCategoryAccordion'
import { MenuItem } from './menuItem'
export const MenuSection = (props) =>{
    return(
        <MenuAccordion name={props.name}>
                    
            <MenuItem name='Pizza' />
            <MenuItem name='Pizza 2' />
            <MenuItem name='Pizza 3' />
            <MenuItem name='Pizza 4' />
            <MenuItem name='Pizza 5' />
            
            
        </MenuAccordion>
    )
}