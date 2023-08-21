type InputPropsUncontrolled = {
    name: string;
    inputName: string;
    disabled?: boolean;
    prepend? : string;
    type?: string;
    maxLength?: number;
    placeholder?: string;
}

export const Input = (props:InputPropsUncontrolled) => {
    
    return (
        <div className="col-12">
            <label className="form-label">{props.name}</label>
            <div className="input-group">

            {props.prepend && <span className="input-group-text" id="inputGroupPrepend">{props.prepend}</span>}
            
                <input
                    type={props.type || "text"}
                    className="form-control"
                    name={props.inputName}
                    required
                    disabled={props.disabled}
                    maxLength={props.maxLength}
                    placeholder={props.placeholder}
                    />
            
            </div>
        </div>
    );
};


export const Check = (props: InputPropsUncontrolled) => {
    return (
        <div className="form-check">
            <input className={`form-check-input ${props.name === null ? "m-0" : ""}`} type="checkbox" name={props.inputName} id={`checkboxInput${props.inputName}`} />
            <label className="form-check-label" htmlFor={`checkboxInput${props.inputName}`}>{props.name}</label>
        </div>
    );
};
