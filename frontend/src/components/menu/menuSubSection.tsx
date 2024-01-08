import React from 'react';
import { MenuAccordion } from './menuSubCategoryAccordion';
import { MenuItem } from './menuItem';
import { MenuItemListFetch } from '../../views/menu';

type MenuSectionProps = {
    name: string;
    items: MenuItemListFetch[];
};

export const MenuSection: React.FC<MenuSectionProps> = (props) => {
    return (
        <MenuAccordion name={props.name}>
            {props.items.map((item) => (
                <MenuItem {...item} key={item.id} />
            ))}
        </MenuAccordion>
    );
};
