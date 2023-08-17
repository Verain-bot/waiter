import React, { useState } from 'react';

type MenuModalProps = {
    id: string;
    sections: string[];
};

export const MenuModal: React.FC<MenuModalProps> = (props) => {
    return (
        <div className="modal fade" id={props.id} tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header d-flex align-items-center justify-content-center">
                        <h5 className="modal-title text-white" id="exampleModalLongTitle">
                            Menu
                        </h5>
                    </div>
                    <div className="modal-body">
                        <ul>
                            {props.sections.map((section) => (
                                <MenuModalItem name={section} key={section} />
                            ))}
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

type MenuModalItemProps = {
    name: string;
};

const MenuModalItem: React.FC<MenuModalItemProps> = (props) => {
    const [url, setUrl] = useState<string>('#MenuAccordion' + props.name.replace(' ', '') + 'accordion');
    return (
        <li className="text-white p-2 pointer">
            <a href={url} className="link-light">
                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">
                    {props.name}
                </button>
            </a>
        </li>
    );
};
