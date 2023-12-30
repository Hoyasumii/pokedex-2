// React Imports
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

// Components
import Header from "./components/Header";
import PokemonForm from "./components/PokemonForm";
import Container from "./components/Container";
import Modal from "./components/Modal";
import Loading from "./components/Loading";
import ShowPokemon from "./components/ShowPokemon";
import LastSearches from "./components/LastSearches";
import ActionList from "./components/ActionList";

// Contexts
import Context from "./scripts/Context";

// CSS Imports
import './App.css';

// JS Scripts
import myModal from "./scripts/myModal";
import unslugify from "./scripts/unslugify";
import setInput from "./scripts/form/setInput";
import getInputValue from "./scripts/form/getInputValue";
import ApiServe from "./scripts/ApiServe";
import clearInput from "./scripts/form/clearInput";
import sendingDataToLS from "./scripts/localStorage/sendingDataToLS";

// JS Classes
import Pokemon from "./scripts/classes/Pokemon";

// LocalStorage Scripts
import createIfNotExist from "./scripts/localStorage/createIfNotExist";

function App() {

	createIfNotExist();

	// Mechanical States
	const [ running, setRunning ] = useState(false);
	const [ ls, setLs] = useState([]);
	const [ pokemonList, setPokemonList ] = useState(new Set());
    const [ filteredList, setFilteredList ] = useState([]);
	
	// Page States
	const [ about, setAbout ] = useState("");
	const [ searchModalTitle, setSearchModalTitle ] = useState("");
	const [ searchModalBody, setSearchModalBody ] = useState("");

	useEffect(() => {

		if (!running) {
            return;
        }
        
		setRunning(false);
		myModal("show-pokemon-modal");
		
		if (getInputValue('pokemon-name') === "") {
            setSearchModalTitle("Erro");
            setSearchModalBody("O campo de pesquisa está vazio.");
            return;
        }

		setSearchModalTitle("Pesquisando");
        setSearchModalBody(<Loading />);

		ApiServe(getInputValue("pokemon-name")).then((data) => {
			sendingDataToLS(data.name, setLs);
			setSearchModalTitle("Pokémon Encontrado!");
			const pokemon = new Pokemon(data);
			setSearchModalBody(<ShowPokemon pokemon={ pokemon } />);
        }).catch(() => {
            setSearchModalTitle("Erro");
            setSearchModalBody((<p>O Pokémon buscado não existe.</p>));
        })

		clearInput();
		
	}
	, [ searchModalBody, running ]);

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
		<Context.Provider value={{ running, setRunning, setLs, pokemonList, filteredList, setFilteredList, setSearchModalTitle, setSearchModalBody }}>
			<Header />

			<div className="pokemon-container">

				<PokemonForm placeholder="Pesquise o Pokémon" name="pokemon-name" onclick={() => setRunning(true) } />

				<ActionList onclick={ (event) => {
					setInput('pokemon-name', event.target.innerText);
					setFilteredList([]);
					setRunning(true);
				} } />

			</div>

			<hr className="m-0 mx-5" />

			<Container>

				<div className="grid gap-5">

					<div>
						<h2>Sobre o Projeto</h2>
						{ about }
					</div>

					<div>
						<LastSearches onclick={ () => {
							localStorage.clear();
							createIfNotExist();
							setLs(localStorage.getItem("data"));
						} } />
					</div>

				</div>

			</Container>
			
			<Modal id="show-pokemon-modal" title={ searchModalTitle }>
				{ searchModalBody }
			</Modal>

		</Context.Provider>
	)
}

export default App