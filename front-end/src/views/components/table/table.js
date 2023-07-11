export const Table = (props) =>{
    return(
        <div class='row card p-2 shadow'>
            <div class='col-12'>
                <div class='row d-flex align-items-center justify-content-center'>
                    <div class='col-11 d-flex flex-column'>
                        <span class='card-title mb-0 pb-0'> {props.title}</span>
                        <span class='card-subtitle small mt-0 mb-4'> {props.subTitle}</span>
                    </div>
                    <div class='col-1 d-flex flex-column justify-content-center align-items-center'>
                    {props.info&&<button type="button" class="btn" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="left" data-bs-content={props.info}>
                    <i class='bi bi-info-circle pointer' />
                    </button>}
                    </div>
                </div>

                {props.children}

            </div>
        </div>
    )
}
