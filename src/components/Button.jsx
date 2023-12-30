// React Imports
import PropTypes from "prop-types";

export default function Button({ children, onclick, classname="" }) {
    return (
        <button className={ `btn btn-dark ${classname}` } type="button" onClick={ onclick }>{ children }</button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onclick: PropTypes.func.isRequired,
    classname: PropTypes.string
};