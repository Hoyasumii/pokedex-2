import modules from './.module.css'

export default function Header() {
    return (
        <div className={ modules.mainHeader }>
            <div className={ modules.header }>
                <h1>Consumindo a <div className={ modules.title }>PokéAPI</div></h1>
                <p>Feito por <a href="https://hoyasumii.github.io/Hoyasumii/" target='_blank' rel='noreferrer'>Alan Reis</a></p>
            </div>
        </div>
    )
}