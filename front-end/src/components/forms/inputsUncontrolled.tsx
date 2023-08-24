import { useId } from "react";
import { Form } from "react-bootstrap";
import { useNavigation } from "react-router-dom";

type InputPropsUncontrolled = {
    name: string;
    inputName: string;
    disabled?: boolean;
    prepend? : string;
    type?: string;
    maxLength?: number;
    defaultValue?: string;
    required?: boolean;
    invalidText?: string;
}

export const Input = (props:InputPropsUncontrolled) => {
    const navigation = useNavigation()
    const disabled = props.disabled?true:navigation.state=='idle'?false:true
    const id = useId()

    return (
        <div className="col-12">
            
            <div className="input-group mb-3">

            {props.prepend && <span className="input-group-text" id="inputGroupPrepend">{props.prepend}</span>}
            <div className="form-floating">
            
                <input
                    type={props.type || "text"}
                    className="form-control"
                    name={props.inputName}
                    required = {true}
                    disabled={disabled}
                    maxLength={props.maxLength}
                    placeholder={props.name}

                    defaultValue={props.defaultValue}
                    id={id}
                    />
            <label className="form-label" htmlFor={id}>{props.name}</label>
            </div>
            
            </div>
        </div>
    );
};


export const Check = (props: InputPropsUncontrolled) => {
    const navigation = useNavigation()
    const disabled = props.disabled?true:navigation.state=='idle'?false:true
    return (
        // <div className="form-check">
            <Form.Group>

            <Form.Check 
                className={` ${props.name === null ? "m-0" : ""}`}
                required={props.required}
                label={props.name}
                name={props.inputName}
                feedback={props.invalidText}
                feedbackType="invalid"
                disabled={disabled}
                />

            </Form.Group>

            // {/* <label className="form-check-label" htmlFor={`checkboxInput${props.inputName}`}>{props.name}</label> */}

        // </div>
    );
};
