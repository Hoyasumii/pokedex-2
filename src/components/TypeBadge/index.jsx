// React Imports
import PropTypes from 'prop-types';

// CSS Imports
import "./index.css";

// JSON Data
import types from '../../data/types.json';

export default function TypeBadge({ type }) {
    <div className={ `pokemon-type ${type}` }>
        { types[type] }
    </div>
}

TypeBadge.propTypes = {
    type: PropTypes.string.isRequired
};