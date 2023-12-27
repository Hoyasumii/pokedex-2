import module from './.module.css'

export default function Container({ children }) {
    return (
        <div className={ module.container }>
            {children}
        </div>
    )
}