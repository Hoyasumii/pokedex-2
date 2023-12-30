// React Imports
import PropTypes from 'prop-types'

export default function Container({ children, classname }) {
    return (
        <div className={ `container my-5 ${ classname }`}>
            {children}
        </div>
    )
}

Container.propTypes = {
    children: PropTypes.node.isRequired,
    classname: PropTypes.string
}