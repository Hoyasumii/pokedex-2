// React Imports
import PropTypes from "prop-types";

export default function Icon({ name, classname="" }) {
    return (
        <i className={ `bi bi-${name} ${classname}` }></i>
    );
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    classname: PropTypes.string
};