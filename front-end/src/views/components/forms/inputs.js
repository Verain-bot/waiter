export const TextInput = (props) => {

    const handleChange = (e) => {
        props.set(e.target.value)
    }

    return(
        <div class="col-12">
        <label for="yourUsername" class="form-label">{props.name}</label>
        <div class="input-group has-validation">
          <span class="input-group-text" id="inputGroupPrepend">+91</span>
          <input type={props.type} name="username" class="form-control" id="yourUsername" required value={props.value} onChange={handleChange} />
        </div>
      </div>
    )
}

export const Check = (props) => {
    return(
        <div class="col-12">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                <label class="form-check-label" for="rememberMe">Remember me</label>
            </div>
        </div>
    )
}

export const Button = (props) => {
    return(
        <div class="col-12">
            <button class="btn btn-primary w-100" type="submit" disabled={props.disabled} onClick={props.onClick} >{props.name}</button>
        </div>
    )
}