// React Imports
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Contexts
import Context from "../../scripts/Context";

// Components
import Input from "../Input";
import Button from "../Button";
import Icon from "../Icon";

// CSS Imports
import "./dynamic.css";

// JS Scripts
import mySlug from "../../scripts/mySlug";
import setInput from "../../scripts/form/setInput";

export default function PokemonForm({ placeholder, name, onclick }) {

    const context = React.useContext(Context);

    let autoCompleteList = Array.from(context.pokemonList);
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

        setFilteredList(autoCompleteList.filter(item => {
            return mySlug(item).includes(mySlug(value));
        }));

    };

    useEffect(() => {
        if (context.running) {
            setFilteredList([]);
            return;
        }
    }, [ context.running ]);

    return (
        <div className="pokemon-container">
            <div className="pokemon-form">
                <Input name={ name } id={ name } placeholder={ placeholder } onkeyup={ handleKeyPress } onchange={ onchange } />
                <Button onclick={ onclick }>
                    <Icon name="search" />
                </Button>
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

PokemonForm.propTypes = {
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onclick: PropTypes.func.isRequired
}