import React from 'react';
import { Stars } from '../menu/stars';
import { Link } from 'react-router-dom';
import { PATHS } from '../../utilities/routeList';
import { makeURL } from '../../utilities/APIRoutes';
import PlaceHolderImage from '../../Media/placeholderRestaurant.jpeg';
type RestaurantListItemProps = {
    img: string;
    name: string;
    type: string;
    id : number | string;
    rating: number;
    totalRatings: number;
};

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = PlaceHolderImage;
}


const RestaurantListItem: React.FC<RestaurantListItemProps> = (props) => {
    const href = makeURL(PATHS.MENU, {'restaurantID' : props.id})
    
    return (
        <Link to={href}>

        <div className="col-12 card pointer p-2 mb-3 d-flex flex-row shadow align-items-center m-md-3">
            <div className="row">
                <div className="col-4">
                    <img className="img-thumbnail rounded border-0 p-0 img-restaurant" src={props.img || PlaceHolderImage} alt="No Image Found" onError={handleImageError} />
                </div>

                <div className="col-8">
                    <div className="row card-title p-1 pb-0">
                        {props.name}
                        <span className="small p-0">
                            <Stars stars={props.rating} numRatings={props.totalRatings} withNumber={true} />
                        </span>
                        <span className="small p-0 text-muted">{props.type}</span>
                    </div>
                </div>
            </div>
        </div>
        </Link>
    );
};

export default RestaurantListItem;
