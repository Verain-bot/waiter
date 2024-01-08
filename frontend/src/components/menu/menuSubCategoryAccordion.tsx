import React, { useState } from 'react';
type MenuAccordionProps = {
    name: string;
    children: React.ReactNode;
};

export const MenuAccordion: React.FC<MenuAccordionProps> = (props) => {
    const id = 'MenuAccordion' + props.name.replace(' ', '')

    return (
        <div className="accordion mx-0 p-0 mb-3 mt-0" id={id+'accordion'}>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        className="accordion-button bg-primary-subtle text-primary-emphasis py-2 border border-primary-subtle"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={'#' + id}
                    >
                        <strong>
                            {props.name}
                        </strong>
                    </button>
                </h2>
                <div id={id} className="accordion-collapse collapse show" >
                    <div className="accordion-body container">{props.children}</div>
                </div>
            </div>
        </div>
    );
};
