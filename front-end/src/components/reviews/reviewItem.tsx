import React from 'react';
import { Stars } from '../menu/stars';

type ReviewItemProps = {
    name: string;
    stars: number;
    body: string;
};

const ReviewItem: React.FC<ReviewItemProps> = (props) => {
    return (
        <div className='row m-0 p-2'>
            <hr />
            <div className='col-12 d-flex flex-column'>
                <strong className='p-0'>{props.name}</strong>
                <Stars stars={props.stars} withNumber />
                <p>{props.body}</p>
            </div>
        </div>
    );
};

export default ReviewItem;
