// React Imports
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

// Components
import Header from "./components/Header";
import PokemonForm from "./components/PokemonForm";
import Container from "./components/Container";
import Modal from "./components/Modal";
import LastSearches from "./components/LastSearches";

// Contexts
import Context from "./scripts/Context";

// CSS Imports
import './dynamic.css';

// JS Scripts
import myModal from "./scripts/myModal";
import unslugify from "./scripts/unslugify";

// LocalStorage Scripts
import create from "./scripts/localStorage/create";

function App() {

	create();

	// Mechanical States
	const [ running, setRunning ] = useState(false);
	const [ ls, setLs] = useState([]);
	const [ pokemonList, setPokemonList ] = useState(new Set());
	
	// Page States
	const [ about, setAbout ] = useState("");

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
	(async (path) => {
		const response = await fetch(path);
		const text = await response.text();
		setAbout(<ReactMarkdown className="paragraph">{ text }</ReactMarkdown>);
	})("/sobre.md");
	
	// Getting Pokemon list
	(async () => {
		const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5000");
		const data = await response.json();
		
		data.results.map(item => {
			setPokemonList((pokemonList) => pokemonList.add(unslugify(item.name)));
		});
	})();

	return (
		<Context.Provider value={{ running, setRunning, setLs, pokemonList }}>
			<Header />

			{/* <div className="pokemon-container">
			</div> */}

			<PokemonForm placeholder="Pesquise o Pokémon" name="pokemon-name" onclick={() => setRunning(true) } />

			<hr className="m-0" />

			<Container hasMultipleChildren={true}>

				<div className="grid gap-5">

					<div>
						<h2>Sobre o Projeto</h2>
						{ about }
					</div>

					<div>
						<LastSearches onclick={ () => {
							localStorage.clear();
							create();
							setLs(localStorage.getItem("data"));
						} } />
					</div>

				</div>

			</Container>
			
			<Modal />
		</Context.Provider>
	)
}

export default App
// TODO: Rever a importância desse Container e Refatorar as classes CSS
// TODO: Criar as keys para divs vazias