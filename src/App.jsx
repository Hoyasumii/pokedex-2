/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */

// React Imports
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

// Components
import Header from "./components/Header";
import Input from "./components/Input";
import Container from "./components/Container";
import Modal from "./components/Modal";
import Card from "./components/Card";

// CSS Imports
import './App.css';

// JS Scripts
import myModal from "./scripts/myModal";
import unslugify from "./scripts/unslugify";

// LocalStorage Scripts
import create from "./scripts/localStorage/create";
import size from "./scripts/localStorage/size";
import get from "./scripts/localStorage/get";

function App() {

	const [ running, setRunning ] = useState(false);
	const [ ls, setLs] = useState([]);
	const [ about, setAbout ] = useState("");
	const [ pokemonList, setPokeonList ] = useState([]);

	create();
	
	useEffect(() => {

		if (running) {
			myModal("modal");
		}
	}
	, [ running ]);

	useEffect(() => {
		setLs(localStorage.getItem("data"));
	}, [ ls ]);

	// Setting About section
	useEffect(() => {
		const useMarkdown = async (path) => {
			const response = await fetch(path);
			const text = await response.text();
			setAbout(<ReactMarkdown className="paragraph">{ text }</ReactMarkdown>);
		}
		useMarkdown("/sobre.md");
	}, []);

	// Getting Pokemon list
	useEffect(() => {
		const getPokemonList = async () => {
			const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5000");
			const data = await response.json().results;
			


			// const pokemonNames = data.results.map(item => {
			// 	return item.name;
			// });
			print(data);
		}
		getPokemonList();
		// console.log(pokemonList)
	}, []);

	return (
		<>
		<Header />

		<Container>
			<Input placeholder="Pesquise o Pokémon" inputId="pokemon-name" buttonText="Pesquisar" onclick={() => setRunning(true) } />
		</Container>

		<hr className="m-0" />

		<Container hasMultipleChildren={true}>

			<div className="grid gap-5">
				<div>
					<h2>Sobre o Projeto</h2>
					{ about }
				</div>
				<div>
					<div className="simple-flex mb-3">
						<h2>Últimas Buscas</h2>
						<button className="btn btn-dark" onClick={() => { 
							localStorage.clear(); 
							create();
							setLs(localStorage.getItem("data"));
						}}>
							<i className="bi bi-trash"></i>
						</button>
					</div>

					{
						size() > 0 ? (
							<div className="simple-list">
								{ get().map((item) => {
									return (
										<Card name={ unslugify(item) } setRunning={setRunning} />
									)
								}) }
							</div>
						) :  (
							<div className="alert alert-primary" role="alert">
								Ainda não há buscas realizadas
							</div>
						)
					}
					
				</div>
			</div>

		</Container>
		
		<Modal running={running} setRunning={setRunning} setLs={setLs} />
		</>
	)
}

export default App
