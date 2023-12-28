import "./dynamic.css";

export default function Input({ placeholder, inputId, buttonText, onclick }) {

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            onclick();
        }
    }

    return (
        <div className="input-group shadow-sm pokemon-input">
            <input type="text" id={inputId} className="form-control" placeholder={placeholder} autoComplete="off" onKeyPress={handleKeyPress} />
            <button className="btn btn-dark" type="button" onClick={onclick}>{buttonText}</button>
        </div>
    )
}