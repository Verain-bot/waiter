import { useScrollDirection } from "../../../hooks"
import { MenuModal } from "./menuModal"

export const MenuCartFooter = () => {
    return(
        <div class="card p-2 rounded fixed-bottom mx-auto my-0 bg-danger col-12 menu-cart-footer text-white">
            <div class='container'>
                <div class='row menu-footer-row'>
                    <div class='col-12 text-center'>
                    <i class='bi bi-cart'></i>

                        <b> View Cart </b>(2)
                    </div>

                
                </div>
            </div>
        </div>
    )
}

export const MenuFooter = (props) =>{

    const scroll = useScrollDirection()

    return(
        <>
        <MenuModal id='MenuModal' sections={props.sections} />
        <div class={`fixed-bottom ${scroll==='up'?'menu-footer-show':'menu-footer-hide'}`} data-bs-toggle="modal" data-bs-target="#MenuModal">
            <div class='container d-flex align-items-center justify-content-center'>
                <div class='col-3 bg-dark text-white rounded p-2 text-center pointer'>
                    <i class='bi bi-card-list'></i>
                    <span> Menu</span>
                </div>
            </div>
        </div>
        </>
    )
}