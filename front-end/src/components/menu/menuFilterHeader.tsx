import React, { useState } from 'react';
import { OutlinedCheck } from '../forms/inputsControlled';
import useScrollDirection from '../../hooks/useScrollDirection';

type MenuHeaderProps = {
    selections: Set<string>
    setSelections: React.Dispatch<React.SetStateAction<Set<string>>>
}

export const MenuHeader = ({selections, setSelections} : MenuHeaderProps) => {
    const show = useScrollDirection() === 'up';
    const selectionsClone = new Set(selections)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        if (e.target.checked) {
            setSelections(selectionsClone.add(e.target.value));
        } else {
            selectionsClone.delete(e.target.value)
            setSelections(selectionsClone)
        }
        
        
        return
    }


    return (
        <div className={`container d-flex flex-row overflow-auto sticky-top shadow card p-2 m-0 my-5 menu-header-${show ? 'show' : 'hide'}` }>
            <OutlinedCheck name='Veg' buttonClass='btn-outline-success rounded-pill btn-badge' onClick={handleChange} value='VEG,dt' />
            <OutlinedCheck name='Non-Veg' buttonClass='btn-outline-danger rounded-pill btn-badge' onClick={handleChange} value='NON_VEG,dt' />
            <OutlinedCheck name='Egg' buttonClass='btn-outline-warning rounded-pill btn-badge' onClick={handleChange} value='EGG,dt' />
            <OutlinedCheck name='Bestsellers' buttonClass='btn-outline-dark rounded-pill btn-badge' onClick={handleChange} value='Bestseller,si' />
            <OutlinedCheck name='Popular' buttonClass='btn-outline-primary rounded-pill btn-badge' onClick={handleChange} value='Popular,si' />
        </div>
    );
};
