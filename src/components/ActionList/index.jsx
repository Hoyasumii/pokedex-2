// React Imports
import React, { useEffect } from "react";
import PropTypes from "prop-types";

// Components
import Button from "../Button";
import Icon from "../Icon";

// Contexts
import Context from "../../scripts/Context";

// CSS Imports
import "./index.css";

// JS Scripts
import setInput from "../../scripts/form/setInput";

export default function ActionList({ onclick }) {

    const context = React.useContext(Context);

    return ( <> {
        context.filteredList.length > 0 ?
            <div className="pokemon-list-container">
                <button onClick={() => {
                    setInput("pokemon-name", "");
                    context.setFilteredList([]);
                }} className="input-clear-button">
                    <Icon name="x" />
                </button>
                <ul className="list-group pokemon-list">
                    {
                        context.filteredList.map((item, index) => {
                            return <li className="list-group-item list-group-item-action" key={`${ item }-${index}-list`} onClick={ onclick }>{item}</li>
                        })
                    }
                </ul>
            </div>
        : ""
    } </> );
}

ActionList.propTypes = {
    onclick: PropTypes.func.isRequired
}