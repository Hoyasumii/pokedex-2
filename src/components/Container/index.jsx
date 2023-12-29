/* eslint-disable react/prop-types */

// CSS Imports
import module from './.module.css'

export default function Container({ children, hasMultipleChildren=false, moreClassesIfMultipleChildren="" }) {
    return (
        <div className={ hasMultipleChildren ? `container my-5 ${ moreClassesIfMultipleChildren }` : module.containerSingleChildren }>
            {children}
        </div>
    )
}