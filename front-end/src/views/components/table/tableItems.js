
export const TableHeading = (props)=>{
    return(
                <div class='row'>
                    <div class='col-12 p-0'>
                        <div class='row p-2'>
                            <div class= {`col-${String(props.width)}`}>
                                <strong>
                                    
                                    {props.left}
                                </strong>
                            </div>
                            <div class= {`col-${String(12-props.width)} d-flex align-items-center justify-content-center`}>
                                <strong>
                                    {props.right}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>

    )
}


export const TableItem = (props)=>{
    return(
                <div class='row'>
                    <hr class='p-0 m-0'/>
                    <div class='col-12 p-0 m-0'>
                        <div class='row p-2'>
                            <div class= {`col-${String(props.width)}`}>
                                
                                {props.left}
                                
                            </div>
                            <div class= {`col-${String(12-props.width)} d-flex align-items-center justify-content-center`}>
                                {props.right}
                            </div>
                        </div>
                    </div>
                </div>

    )
}