import React, { useState } from 'react';

type MenuAccordionProps = {
    name: string;
    children: React.ReactNode;
};

export const MenuAccordion: React.FC<MenuAccordionProps> = (props) => {
    const [id, setId] = useState('MenuAccordion' + props.name.replace(' ', ''));

    return (
        <div className="accordion mx-0 p-0 mb-3 mt-0" id={id + 'accordion'}>
            <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                    <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={'#' + id}
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                    >
                        {props.name}
                    </button>
                </h2>
                <div id={id} className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                    <div className="accordion-body container">{props.children}</div>
                </div>
            </div>
        </div>
    );
};
