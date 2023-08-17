import React from 'react';
import { Stars } from '../menu/stars';

type RestaurantListItemProps = {
    img: string;
    name: string;
    type: string;
};

const RestaurantListItem: React.FC<RestaurantListItemProps> = (props) => {
    return (
        <div className="col-12 card pointer p-2 mb-3 d-flex flex-row shadow align-items-center m-md-3">
            <div className="row">
                <div className="col-4">
                    <img className="img-thumbnail rounded border-0 p-0 shadow" src={props.img} alt="No Image Found" />
                </div>

                <div className="col-8">
                    <div className="row card-title p-1 pb-0">
                        {props.name}
                        <span className="small p-0">
                            <Stars stars={4.5} numRatings={389} withNumber={true} />
                        </span>
                        <span className="small p-0 text-muted">{props.type}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantListItem;
