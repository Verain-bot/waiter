import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type MenuModalProps = {
    sections: string[];
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
};


export const MenuModal: React.FC<MenuModalProps> = (props) => {

    const open = ()=>{
        props.setShow(true)
    }

    const close = ()=>{
        props.setShow(false)
    }

    return(
        <Modal show={props.show} onHide={close} centered >
        <Modal.Header closeButton className='bg-dark text-light' closeVariant='white'>
          <Modal.Title>Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark'>
        <ul>
            {props.sections.map((section) => (
                <MenuModalItem name={section} key={section} close={close} />
            ))}
        </ul>
        </Modal.Body>
      </Modal>
    )
};

type MenuModalItemProps = {
    name: string;
    close: ()=>void;
};

const MenuModalItem: React.FC<MenuModalItemProps> = (props) => {
    const [url, setUrl] = useState<string>('#MenuAccordion' + props.name.replace(' ', '') + 'accordion');

    const handleClick = ()=>{
        props.close()
    }

    return (
        <li className="text-white p-2 pointer">
            <a href={url} className="link-light">
                <button type="button" className="btn btn-dark" onClick={handleClick} >
                    {props.name}
                </button>
            </a>
        </li>
    );
};
