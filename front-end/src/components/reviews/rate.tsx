import React, { useEffect, useRef, useState } from "react";
import { useRatingContext } from "../../context/RatingContext";
import { Form } from "react-router-dom";
import { PATHS } from "../../utilities/routeList";
import { makeURL } from "../../utilities/APIRoutes";

type StarSelectorProps = {
    setStars: React.Dispatch<React.SetStateAction<number[]>>;
    stars: number[];
};

const StarSelector: React.FC<StarSelectorProps> = (props) => {

    const click = (num: number) => {
        return () => {
            const updatedStars = Array.from({ length: 5 }, (_, index) => (index < num ? 1 : 0));
            props.setStars(updatedStars);
        };
    };

    return (
        <div>
            <span className='text-warning p-0'>
                {props.stars.map((item, key) => (
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
    const [starsArr, setStarsArr] = useState<number[]>([0, 0, 0, 0, 0]);
    const stars = starsArr.reduce((acc, curr) => acc + curr, 0);
    const [rating, setRating] = useRatingContext()

    useEffect(()=>{
        setStarsArr(Array.from({ length: 5 }, (_, index) => (index < rating.starsSelected ? 1 : 0)))
    }, [rating.starsSelected, rating.reviewWritten])

    return (
        <div className='row m-0 p-2'>
            <div className='col-12 d-flex flex-column'>
                <Form method="PATCH" action={rating.actionURL} >
                    <h3>Rate</h3>
                    <div className='row pointer' style={{ fontSize: "40px" }}>
                        <StarSelector setStars={setStarsArr} stars={starsArr} />
                    </div>
                    <input type="hidden" name={rating.starFieldName} value={stars} />
                    <textarea placeholder='Please write your review here' className='form-control rounded w-100' name={rating.bodyFieldName} defaultValue={rating.reviewWritten}></textarea>
                    <button className='btn btn-primary w-100 my-2' data-bs-dismiss="modal" >Submit</button>
                </Form>
            </div>
        </div>
    );
};

export default Rate;
