import module from './.module.css'

export default function Container({ children, hasMultipleChildren=false }) {
    return (
        <div className={ hasMultipleChildren ? "container my-5" : module.containerSingleChildren }>
            {children}
        </div>
    )
}