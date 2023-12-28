/* eslint-disable react-hooks/rules-of-hooks */

// React Imports
import { useState, useEffect } from "react";

// Components
import Header from "./components/Header";
import Input from "./components/Input";
import Container from "./components/Container";
import Modal from "./components/Modal";

// CSS Imports
import './App.css';

// JS Scripts
import myModal from "./scripts/myModal";

function App() {

	// TODO: Criar uma pergunta simples do plural de Pokémon e explicar que o plural de Pokémon é Pokémon. Colocar essa pergunta num botão de interrogação no canto da página
	// TODO: CSS Modules não são tão funcionais assim!
	// TODO: Criar o README.md

	const [ running, setRunning ] = useState(false);

	const [ id, setId ] = useState(null);


	useEffect(() => {

		if (running) {
			myModal("modal");
		}
	}
	, [ running ]);

	return (
		<>
		<Header />
		<Container>
			<Input placeholder="Pesquise o Pokémon pelo nome" inputId="pokemon-name" buttonText="Pesquisar" onclick={() => setRunning(true) } />
		</Container>
		<hr />
		<Modal running={running} setRunning={setRunning} id={id} setId={setId} />
		</>
	)
}

export default App
