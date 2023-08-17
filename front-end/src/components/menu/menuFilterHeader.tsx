import React, { useState } from 'react';
import { OutlinedCheck } from '../forms/inputsControlled';
import useScrollDirection from '../../hooks/useScrollDirection';

export const MenuHeader: React.FC = () => {
    const show = useScrollDirection() === 'up';
    const [selections, setSelections]: [Set<string >, React.Dispatch<React.SetStateAction<Set<string>>>] = useState(new Set());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelections(selections.add(e.target.name));
        } else {
            selections.delete(e.target.name)
            setSelections(selections)
        }
        console.log(selections)
        
        return
    }


    return (
        <div className={`container d-flex flex-row overflow-auto sticky-top shadow card p-2 m-0 my-5 menu-header-${show ? 'show' : 'hide'}`}>
            <OutlinedCheck name='Veg' buttonClass='btn-outline-success rounded-pill btn-badge' onClick={handleChange} />
            <OutlinedCheck name='NonVeg' buttonClass='btn-outline-danger rounded-pill btn-badge' onClick={handleChange} />
            <OutlinedCheck name='Egg' buttonClass='btn-outline-warning rounded-pill btn-badge' onClick={handleChange} />
            <OutlinedCheck name='Bestsellers' buttonClass='btn-outline-dark rounded-pill btn-badge' onClick={handleChange} />
            <OutlinedCheck name='Popular' buttonClass='btn-outline-primary rounded-pill btn-badge' onClick={handleChange} />
        </div>
    );
};
