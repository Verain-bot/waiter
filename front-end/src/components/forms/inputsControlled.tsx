import { ChangeEvent, useEffect, useState } from "react";

type InputControlledProps = {
    name: string;
    value: string;
    set: (value: string) => void;
    type?: string;
    disabled?: boolean;
}

type IntegerInputControlledProps = InputControlledProps & {
    maxlen?: number;
    prepend?: string;
}


export const TextInput = (props: InputControlledProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.set(e.target.value);
    };

    return (
        <div className="col-12">
            <label className="form-label">{props.name}</label>
            <div className="input-group has-validation">
                <input
                    type={props.type || "text"}
                    className="form-control"
                    required
                    value={props.value}
                    onChange={handleChange}
                    disabled={props.disabled}
                />
            </div>
        </div>
    );
};

export const IntegerInput = (props: IntegerInputControlledProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // regex for integer
        const regex = new RegExp("^[0-9]*$");
        if (regex.test(e.target.value) && (!props.maxlen || e.target.value.length <= props.maxlen)) {
            props.set(e.target.value);
        }
    };

    return (
        <div className="col-12">
            <label className="form-label">{props.name}</label>
            <div className="input-group has-validation">
                {props.prepend && <span className="input-group-text" id="inputGroupPrepend">{props.prepend}</span>}
                <input
                    type="number"
                    pattern="[0-9]*"
                    name="username"
                    className="form-control"
                    id="yourUsername"
                    required
                    value={props.value}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export const Check = (props: InputControlledProps) => {
    return (
        <div className="form-check">
            <input className={`form-check-input ${props.name === null ? "m-0" : ""}`} type="checkbox" value={props.value} id={`checkboxInput${props.name}`} />
            <label className="form-check-label" htmlFor={`checkboxInput${props.name}`}> {props.name} </label>
        </div>
    );
};


export const OutlinedCheck = (props: {name: string; onClick: React.ChangeEventHandler<HTMLInputElement>; buttonClass: string}) => {
    const id = "OutlinedCheckbox" + props.name;

    return (
        <div className="mx-2">
            <input type="checkbox" className="btn-check" id={id} name={props.name} onChange={props.onClick} />
            <label className={`btn ${props.buttonClass}`} htmlFor={id}>{props.name}</label><br />
        </div>
    );
};


export const Button = (props: {disabled?: boolean; onClick: (e: React.MouseEvent<HTMLButtonElement>)=>void; name: string }) => {
    return (
        <div className="col-12">
            <button className="btn btn-primary w-100" type="submit" disabled={props.disabled} onClick={props.onClick}>{props.name}</button>
        </div>
    );
};

export const LinkFooter = (props: { text: string; linkText: string }) => {
    return (
        <span>
            {props.text}&nbsp;
            <a href="#" className="link-primary">{props.linkText}</a>
        </span>
    );
};
