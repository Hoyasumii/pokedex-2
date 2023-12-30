// React Imports
import React from "react";
import PropTypes from "prop-types";

// Contexts
import Context from "../../scripts/Context";

// CSS Imports
import "./dynamic.css";

export default function ActionList({ onclick }) {

    const context = React.useContext(Context);

    return (
        <> {
        context.filteredList.length > 0 ?
            <ul className="list-group pokemon-list">
                {
                    context.filteredList.map((item, index) => {
                        return <li className="list-group-item list-group-item-action" key={`${ item }-${index}-list`} onClick={ onclick }>{item}</li>
                    })
                }
            </ul>
        : ""
        } </>
        
    )

}

ActionList.propTypes = {
    onclick: PropTypes.func.isRequired
}