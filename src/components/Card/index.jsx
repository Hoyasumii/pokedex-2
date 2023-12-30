// React Imports
import React from 'react';
import PropTypes from 'prop-types';

// CSS Imports
import module from './.module.css';

// Form Scripts
import setInput from '../../scripts/form/setInput';

// Contexts
import Context from '../../scripts/Context';

export default function Card({ name }) {

    const context = React.useContext(Context);

    return (
        <button className={ module.card } onClick={() => { 
            setInput('pokemon-name', name);
            context.setRunning(true);
        }}>
            <s>{ name }</s>
        </button>
    );
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
};
