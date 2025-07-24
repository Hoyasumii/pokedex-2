// Components
import TypeBadge from "../TypeBadge";

// CSS Imports
import "./index.css";

// JS Scripts
import unslugify from "../../scripts/unslugify";

// JSON classes
import translateStats from "../../data/stats.json";

export default function ShowPokemon({ pokemon }) {
	const types = pokemon.types.map((item) => {
		return <TypeBadge key={item} type={item} />;
	});

	const stats = [];

	Object.keys(pokemon.stats).forEach((item) => {
		stats.push(
			<div key={`stat-${item}`} className="white-text">
				<s>{translateStats[item]}</s>: {pokemon.stats[item]}
			</div>,
		);
	});

	return (
		<>
			<div className="show-pokemon-container">
				<img className="pokemon-image" src={pokemon.sprite} alt="" srcSet="" />

				<div className="info-container">
					<div>
						<div className="pokemon-name">
							{unslugify(pokemon.name)}
							<div className="pokemon-number">#{pokemon.id} </div>
						</div>
						<div className="types-container">{types} </div>
					</div>

					<div className="grid blue bordered">
						<div className="white-text">
							<s>Peso:</s> {pokemon.weight} kg
						</div>
						<div className="white-text">
							<s>Altura:</s> {pokemon.height} m
						</div>
						<div className="white-text">
							<s>Exp. base:</s> {pokemon.baseExperience}
						</div>
						<div className="white-text">
							<s>Estatísticas:</s> {pokemon.totalStats}
						</div>
					</div>

					<div className="grid gray bordered">{stats.map((stat) => stat)}</div>
				</div>
			</div>

			<div className="moves-title">Movimentos:</div>
			<div className="grid s4">
				{pokemon.moves.map((move) => {
					return (
						<div key={move} className="gray-2 white-text bordered move">
							<s>{unslugify(move)}</s>
						</div>
					);
				})}
			</div>
		</>
	);
}
