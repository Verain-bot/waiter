import React from 'react';

type TableProps = {
    title: string;
    subTitle?: string;
    info?: string;
    children: React.ReactNode;
};

const Table: React.FC<TableProps> = (props) => {
    return (
        <div className='row card p-2 shadow'>
            <div className='col-12'>
                <div className='row d-flex align-items-center justify-content-center'>
                    <div className='col-11 d-flex flex-column'>
                        <span className='card-title mb-0 pb-0'> {props.title}</span>
                        <span className='card-subtitle small mt-0 mb-4'> {props.subTitle}</span>
                    </div>
                    <div className='col-1 d-flex flex-column justify-content-center align-items-center'>
                        {props.info && (
                            <button
                                type="button"
                                className="btn"
                                data-bs-container="body"
                                data-bs-toggle="popover"
                                data-bs-placement="left"
                                data-bs-content={props.info}
                            >
                                <i className='bi bi-info-circle pointer' />
                            </button>
                        )}
                    </div>
                </div>

                {props.children}

            </div>
        </div>
    );
};

export default Table;
