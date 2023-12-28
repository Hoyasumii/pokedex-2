/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */

// React Imports
import { useState, useEffect } from 'react';

// CSS Imports
import module from "./.module.css";
import "./dynamic.css";

// JS Scripts
import getInput from '../../scripts/getInput';
import useAPI from '../../scripts/useAPI';
import unslugify from '../../scripts/unslugify';

// JSON Data
import stats from '../../data/stats.json';
import types from '../../data/types.json';

export default function Modal({ running, setRunning, id, setId }) { 
    // TODO: Usar esse id para criar um acesso rápido ao carregamento

    const [ modalTitle, setModalTitle ] = useState();

    const [ modalBody, setModalBody ] = useState();
    
    useEffect(() => {
        
        if (id === null) {
            if (getInput() === "") {
                setModalTitle("Erro");
                setModalBody("O campo de pesquisa está vazio.");
                return;
            } 
        }
        
        setModalTitle("Pesquisando");
        setModalBody((
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        ));
        
        useAPI(getInput()).then((data) => {

            const pokemonTypes = data.types.map((item) => {

                const type = item.type.name;

                return (
                    <div className={ `pokemon-type ${type}` }>
                        { types[item.type.name] }
                    </div>
                );
            });

            let totalStats = 0;

            const pokemonStats = data.stats.map((item) => {
                totalStats += item.base_stat;
                return (
                    <div>
                        <div><s>{ stats[`${item.stat.name}`] }</s>: { item.base_stat }</div>
                    </div>
                );
            });
        
            setModalTitle("Pokémon Encontrado!");
            setModalBody((
                <>
                    <div className={ module.pokemonContainer }>
                        
                        <img className={ module.pokemonImg } src={ data.sprites.other['official-artwork'].front_default } alt="" srcSet="" />

                        <div className={ module.infoContainer }>
                            <div>
                                <div className={ module.pokemonName }>
                                    { unslugify(data.name) }
                                    <div className={ module.pokemonNumber }>#{ data.id } </div>
                                </div>
                                <div className={ module.typesContainer }>{ pokemonTypes.map(type => type) } </div>
                            </div>

                            <div className="grid blue">
                                <div><s>Peso:</s> { data.weight / 10 } kg</div>
                                <div><s>Altura:</s> { data.height / 10 } m</div>
                                <div><s>Exp. base:</s> { data.base_experience == null ? "Desconhecido" : `${ data.base_experience }` }</div>
                                <div><s>Estatísticas:</s> { totalStats }</div>
                            </div>

                            <div className="grid gray">
                                { pokemonStats.map(stat => stat) }
                            </div>

                        </div>
                        
                    </div>

                    <div className={ module.moves }>Movimentos:</div>
                    <div className="grid s4">
                        { data.moves.map((move) => {
                            return <div className='gray-2'><s>{ unslugify(move.move.name) }</s></div>
                        }) }

                    </div>
                </>
            ));
        }).catch(() => {
            setModalTitle("Erro");
            setModalBody((<p>O Pokémon buscado não existe.</p>));
        })

        setRunning(false);
        setId(null);

    }, [ running, setRunning, id, setId ]);

    return (
        <>
            <div className="modal modal-lg fade" id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalLabel">{ modalTitle }</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"  onClick={() => setRunning(false)}></button>
                        </div>
                        <div className="modal-body text-center">
                            { modalBody }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}