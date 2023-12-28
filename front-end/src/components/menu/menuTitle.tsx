import React, { useEffect, useState } from 'react';
import { Stars } from './stars';

type MenuTitleProps = {
    name: string;
    type: string[];
    stars: number;
    numRatings: number;
    phone: string;
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
            <a 
            className='btn btn-outline-success position-absolute border-0 rounded-circle' 
            style={{top: 10, right: 10, fontSize: 20}} 
            href={`tel:${props.phone}`}
            onClick={()=>console.log(props.phone)}
            >
                <i className='bi bi-telephone'></i>
            </a>
            <h3>{props.name}</h3>
            <span className="text-secondary">{restaurantType} </span>
            <Stars stars={props.stars} numRatings={props.numRatings} withNumber={true} />
        </div>
    );
};
