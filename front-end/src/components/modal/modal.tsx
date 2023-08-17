import React, { ReactNode } from 'react';

type ModalLayoutProps = {
    id: string;
    title?: string;
    body?: ReactNode;
    footer?: ReactNode;
};

export const ModalLayout: React.FC<ModalLayoutProps> = (props) => {
    return (
        <div className="modal fade" id={props.id} tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header d-flex align-items-center justify-content-center">
                        <h5 className="modal-title">{props.title}</h5>
                    </div>
                    <div className="modal-body">{props.body}</div>
                    <div className="modal-footer">{props.footer}</div>
                </div>
            </div>
        </div>
    );
};
