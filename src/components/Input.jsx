// React Imports
import PropTypes from 'prop-types';

export default function Input({ placeholder, type="text", name, onchange, onkeyup, classname="" }) {
    return (
        <input type={ type } name={ name } id={ name } placeholder={ placeholder } onChange={ onchange } className={ `form-control shadow-sm ${classname}` } onKeyUp={ onkeyup } autoComplete='off' />
    );
}

Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    onchange: PropTypes.func,
    onkeyup: PropTypes.func,
    classname: PropTypes.string
};