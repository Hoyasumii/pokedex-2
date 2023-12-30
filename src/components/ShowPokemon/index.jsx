// React Import
import PropTypes from 'prop-types';

// Components
import TypeBadge from '../TypeBadge';

// CSS Imports
import module from "./.module.css";

// JS Scripts
import unslugify from '../../scripts/unslugify';

// JSON classes
import translateStats from '../../data/stats.json';

export default function ShowPokemon({ pokemon }) { 

    const types = pokemon.types.map((item) => {
        return <TypeBadge key={ item } type={ item } />;
    });

    const stats = [ ];

    Object.keys(pokemon.stats).forEach((item) => {
        stats.push((
            <div key={ `stat-${ item }` } className='white-text'><s>{ translateStats[ item ] }</s>: { pokemon.stats[ item ] }</div>
        ));
    });

    return (
        <>
            <div className={ module.pokemonModalContainer }>
                
                <img className={ module.pokemonImg } src={ pokemon.sprite } alt="" srcSet="" />

                <div className={ module.infoContainer }>
                    <div>
                        <div className={ module.pokemonName }>
                            { unslugify(pokemon.name) }
                            <div className={ module.pokemonNumber }>#{ pokemon.id } </div>
                        </div>
                        <div className={ module.typesContainer }>{ types } </div>
                    </div>

                    <div className="grid blue">
                        <div className='white-text'><s>Peso:</s> { pokemon.weight } kg</div>
                        <div className='white-text'><s>Altura:</s> { pokemon.height } m</div>
                        <div className='white-text'><s>Exp. base:</s> { pokemon.base_experience == null ? "Desconhecido" : `${ pokemon.base_experience }` }</div>
                        <div className='white-text'><s>Estatísticas:</s> { pokemon.totalStats }</div>
                    </div>

                    <div className="grid gray">
                        { stats.map(stat => stat) }
                    </div>

                </div>
                
            </div>

            <div className={ module.moves }>Movimentos:</div>
            <div className="grid s4">
                { pokemon.moves.map((move) => {
                    return <div key={ move } className='gray-2 white-text'><s>{ unslugify(move) }</s></div>
                }) }

            </div>
        </>
    );

}

ShowPokemon.propTypes = {
    pokemon: PropTypes.object.isRequired
};