/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */

// React Imports
import React, { useState, useEffect } from 'react';

// Contexts
import Context from '../../scripts/Context';

// CSS Imports
import module from "./.module.css";
import "./dynamic.css";

// JS Scripts
import getInput from '../../scripts/form/getInput';
import useAPI from '../../scripts/useAPI';
import unslugify from '../../scripts/unslugify';

// LocalStorage Scripts
import add from '../../scripts/localStorage/add';

// Form Scripts
import clearInput from '../../scripts/form/clearInput';

// JSON Data
import stats from '../../data/stats.json';
import types from '../../data/types.json';

export default function Modal() { 

    const [ modalTitle, setModalTitle ] = useState();

    const [ modalBody, setModalBody ] = useState();

    const context = React.useContext(Context);
    
    useEffect(() => {

        if (!context.running) {
            return;
        }
        
        if (getInput() === "") {
            setModalTitle("Erro");
            setModalBody("O campo de pesquisa está vazio.");
            context.setRunning(false);
            return;
        }
        
        setModalTitle("Pesquisando");
        setModalBody((
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        ));
        
        useAPI(getInput()).then((data) => {
            
            add(data.name, context.setLs);

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
                        <div className='white-text'><s>{ stats[`${item.stat.name}`] }</s>: { item.base_stat }</div>
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
                                <div className='white-text'><s>Peso:</s> { data.weight / 10 } kg</div>
                                <div className='white-text'><s>Altura:</s> { data.height / 10 } m</div>
                                <div className='white-text'><s>Exp. base:</s> { data.base_experience == null ? "Desconhecido" : `${ data.base_experience }` }</div>
                                <div className='white-text'><s>Estatísticas:</s> { totalStats }</div>
                            </div>

                            <div className="grid gray">
                                { pokemonStats.map(stat => stat) }
                            </div>

                        </div>
                        
                    </div>

                    <div className={ module.moves }>Movimentos:</div>
                    <div className="grid s4">
                        { data.moves.map((move) => {
                            return <div className='gray-2 white-text'><s>{ unslugify(move.move.name) }</s></div>
                        }) }

                    </div>
                </>
            ));
        }).catch(() => {
            setModalTitle("Erro");
            setModalBody((<p>O Pokémon buscado não existe.</p>));
        })

        clearInput();
        context.setRunning(false);

    }, [ context.running ]);

    return (
        <>
            <div className="modal modal-lg fade" id="modal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalLabel">{ modalTitle }</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"  onClick={() => context.setRunning(false)}></button>
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