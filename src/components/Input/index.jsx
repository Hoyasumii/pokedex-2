import "./dynamic.css";

export default function Input({ placeholder, inputId, buttonText, onclick }) {
    return (
        <div className="input-group shadow-sm pokemon-input">
            <input type="text" id={inputId} className="form-control" placeholder={placeholder} autoComplete="off" />
            <button className="btn btn-primary" type="button" onClick={onclick}>{buttonText}</button>
        </div>
    )
}