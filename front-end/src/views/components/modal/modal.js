export const ModalLayout = (props) =>{
    return(
        <div class="modal fade" id={props.id} tabindex="-1" role="dialog" >
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header d-flex align-items-center justify-content-center">
                <h5 class="modal-title" >{props.title}</h5>
            </div>

            <div class="modal-body">
                {props.body}
            </div>

            <div class="modal-footer">
                {props.footer}
            </div>
        </div>
        </div>
        </div>
    )
}