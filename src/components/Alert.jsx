// React Imports
import PropTypes from 'prop-types';

export default function Alert({ children }) {
    return (
        <div className="alert alert-dark" role="alert">
            { children }
        </div>
    )
}

Alert.propTypes = {
    children: PropTypes.any.isRequired
}