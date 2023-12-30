// CSS Imports
import module from './.module.css'

// TODO: Repensar em como esse container vai funcionar

export default function Container({ children, hasMultipleChildren=false, moreClassesIfMultipleChildren="" }) {
    return (
        <div className={ hasMultipleChildren ? `container my-5 ${ moreClassesIfMultipleChildren }` : module.containerSingleChildren }>
            {children}
        </div>
    )
}