// React Imports
import React, { useEffect } from "react";
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

export default function PokemonForm({ placeholder, name, onclick }) {

    const context = React.useContext(Context);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            onclick();
        }
    }

    const onchange = (event) => {
        
        const value = event.target.value;
        
        if (value === "" || value.length < 2) {
            context.setFilteredList([]);
            return;
        }

        context.setFilteredList(Array.from(context.pokemonList).filter(item => {
            return mySlug(item).includes(mySlug(value));
        }));

    };

    useEffect(() => {
        if (context.running) {
            context.setFilteredList([]);
            return;
        }
    }, [ context, context.running ]);

    return (
        <div className="pokemon-form">
            <Input name={ name } id={ name } placeholder={ placeholder } onkeyup={ handleKeyPress } onchange={ onchange } />
            <Button onclick={ onclick }>
                <Icon name="search" />
            </Button>
        </div>
    )
}

PokemonForm.propTypes = {
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onclick: PropTypes.func.isRequired
}