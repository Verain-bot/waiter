import React, { useState } from "react";

type StarSelectorProps = {
};

const StarSelector: React.FC<StarSelectorProps> = (props) => {
    const [stars, setStars] = useState<number[]>([0, 0, 0, 0, 0]);

    const click = (num: number) => {
        return () => {
            const updatedStars = Array.from({ length: 5 }, (_, index) => (index < num ? 1 : 0));
            setStars(updatedStars);
        };
    };

    return (
        <div>
            <span className='text-warning p-0'>
                {stars.map((item, key) => (
                    <i
                        className={`bi ${item === 1 ? "bi-star-fill" : "bi-star"}`}
                        onClick={click(key + 1)}
                        key={key}
                    />
                ))}
            </span>
        </div>
    );
};

type RateProps = {
    // Add any additional props here
};

const Rate: React.FC<RateProps> = (props) => {
    return (
        <div className='row m-0 p-2'>
            <div className='col-12 d-flex flex-column'>
                <h3>Rate</h3>
                <div className='row pointer' style={{ fontSize: "40px" }}>
                    <StarSelector />
                </div>
                <textarea placeholder='Please write your review here' className='form-control rounded'></textarea>
                <button className='btn btn-outline-dark m-2'>Submit</button>
            </div>
        </div>
    );
};

export default Rate;
