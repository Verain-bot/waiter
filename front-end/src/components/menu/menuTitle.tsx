import React, { useEffect, useState } from 'react';
import { Stars } from './stars';

type MenuTitleProps = {
    name: string;
    type: string[];
};

export const MenuTitle: React.FC<MenuTitleProps> = (props) => {
    const [restaurantType, setRestaurantType] = useState<string>('');

    useEffect(() => {
        let type = '';
        props.type.forEach((item) => {
            type = type + item + ' ' + String.fromCharCode(183) + ' ';
        });
        setRestaurantType(type.slice(0, -2));
    }, [props.type]);

    return (
        <div className="card p-4 mb-0 d-flex align-items-center justify-content-center">
            <h3>{props.name}</h3>
            <span className="text-secondary">{restaurantType} </span>
            <Stars stars={4.2} numRatings={34} withNumber={true} />
        </div>
    );
};
