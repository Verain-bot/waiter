import React, { useEffect, useState } from 'react';

type StarsProps = {
    stars: number;
    withNumber?: boolean;
    numRatings?: number;
};

export const Stars: React.FC<StarsProps> = (props) => {
    const [stars, setStars] = useState<number[]>([0, 0, 0, 0, 0]);

    useEffect(() => {
        const s: number[] = [];
        let numStars = props.stars;
        for (let i = 0; i < 5; i++) {
            if (numStars >= 1) {
                s.push(1);
                numStars--;
            } else if (numStars >= 0.5) {
                s.push(0.5);
                numStars -= 0.5;
            } else {
                s.push(0);
            }
        }

        setStars(s);
    }, [props.stars]);

    return (
        <span className="text-warning p-0">
            {props.withNumber && <b>{props.stars} </b>}
            {stars.map((item, index) => {
                if (item === 1) {
                    return <i key={index} className="bi bi-star-fill" />;
                } else if (item === 0.5) {
                    return <i key={index} className="bi bi-star-half" />;
                } else {
                    return <i key={index} className="bi bi-star" />;
                }
            })}
            {props.numRatings && (
                <span className="text-dark">({props.numRatings})</span>
            )}
        </span>
    );
};
