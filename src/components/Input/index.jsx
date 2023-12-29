/* eslint-disable react/prop-types */

// React Imports
import { useState } from "react";

// CSS Imports
import "./dynamic.css";

// JS Scripts
import unslugify from "../../scripts/unslugify";
import setInput from "../../scripts/form/setInput";

export default function Input({ placeholder, inputId, buttonText, onclick, autoCompleteArray }) {

    let autoCompleteList = Array.from(autoCompleteArray);
    const [ filteredList, setFilteredList ] = useState([]);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            onclick();
        }
    }

    const onchange = (event) => {
        const value = event.target.value;
        
        if (value === "" || value.length < 2) {
            setFilteredList([]);
            return;
        }

        setFilteredList(autoCompleteList.filter(item => item.slice(0, value.length) === unslugify(value)));

    };

    return (
        <div className="pokemon-container">
            <div className="pokemon-form">
                <input type="text" id={inputId} className="form-control shadow-sm" placeholder={placeholder} autoComplete="off" onKeyPress={handleKeyPress} onChange={ onchange } />
                <button className="btn btn-dark w-fit" type="button" onClick={onclick}>{buttonText}</button>
            </div>
            {
                filteredList.length > 0 ?
                    <ul className="list-group pokemon-list">
                        {
                            filteredList.map((item, index) => {
                                return <li className="list-group-item list-group-item-action" key={index} onClick={() => {
                                    setInput(item);
                                    setFilteredList([]);
                                    onclick();
                                }
                                }>{item}</li>
                            })
                        }
                    </ul>
                : ""
            }
        </div>
    )
}