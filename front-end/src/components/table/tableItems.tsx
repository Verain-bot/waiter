import React from 'react';

type TableHeadingProps = {
    width: number;
    left: React.ReactNode;
    right: React.ReactNode;
};

const TableHeading: React.FC<TableHeadingProps> = (props) => {
    return (
        <div className='row'>
            <div className='col-12 p-0'>
                <div className='row p-2'>
                    <div className={`col-${String(props.width)}`}>
                        <strong>
                            {props.left}
                        </strong>
                    </div>
                    <div className={`col-${String(12 - props.width)} d-flex align-items-center justify-content-center`}>
                        <strong>
                            {props.right}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

type TableItemProps = {
    width: number;
    left?: React.ReactNode;
    right?: React.ReactNode;
    nohr?: boolean;
};

const TableItem: React.FC<TableItemProps> = (props) => {
    return (
        <div className='row'>
            {!props.nohr && <hr className='p-0 m-0' />}
            <div className='col-12 p-0 m-0'>
                <div className='row p-2'>
                    <div className={`col-${String(props.width)}`}>
                        {props.left}
                    </div>
                    <div className={`col-${String(12 - props.width)} d-flex align-items-center justify-content-center`}>
                        {props.right}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { TableHeading, TableItem };
