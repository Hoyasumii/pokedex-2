/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */

// React Imports
import { useState, useEffect } from "react";
import JsxParser from 'react-jsx-parser';

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
import showdown from "showdown";
import unslugify from "./scripts/unslugify";

// LocalStorage Scripts
import create from "./scripts/localStorage/create";
import size from "./scripts/localStorage/size";
import get from "./scripts/localStorage/get";

// JSON Data
import about from "./data/about.json";

function App() {

	// TODO: Criar o README.md
	// TODO: Usar o localStorage para armazenar as últimas buscas e ter um botão de limpar as últimas buscas. Eu preciso instanciar o localStorage antes de usar ele

	const [ running, setRunning ] = useState(false);

	const [ ls, setLs] = useState([]);

	useEffect(() => {

		if (running) {
			myModal("modal");
		}
	}
	, [ running ]);

	useEffect(() => {
		create();
		setLs(localStorage.getItem("data"));
	}, [ ls ]);

	const converterObj = new showdown.Converter();

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
					{ about.map((item) => {
						return (
							<JsxParser jsx={converterObj.makeHtml(item)} className="paragraph" />
						)
					}) }
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
					
					{(() => {
						if (size() > 0) {
							return (
								<div className="simple-list">
									{ get().map((item) => {
										return (
											<Card name={ unslugify(item) } />
										)
									}) }
								</div>
							)
						} else {
							return (
								<div className="alert alert-primary" role="alert">
									Ainda não há buscas realizadas
								</div>
							)
						}
					})()}
					
				</div>
			</div>

		</Container>
		
		<Modal running={running} setRunning={setRunning} setLs={setLs} />
		</>
	)
}

export default App
