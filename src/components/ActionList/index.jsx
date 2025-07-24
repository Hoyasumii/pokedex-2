// React Imports
import React from "react";

// Components
import Icon from "../Icon";

// Contexts
import Context from "../../scripts/Context";

// CSS Imports
import "./index.css";

// JS Scripts
import setInput from "../../scripts/form/setInput";

export default function ActionList({ onclick }) {
	const context = React.useContext(Context);

	return (
		<>
			{" "}
			{context.filteredList.length > 0 ? (
				<div className="pokemon-list-container">
					<button
						type="button"
						onClick={() => {
							setInput("pokemon-name", "");
							context.setFilteredList([]);
						}}
						className="input-clear-button"
					>
						<Icon name="x" />
					</button>
					<ul className="list-group pokemon-list">
						{context.filteredList.map((item, index) => {
							return (
								<li
									className="list-group-item list-group-item-action"
									key={`${item}-${index.toString()}-list`}
									onClick={onclick}
								>
									{item}
								</li>
							);
						})}
					</ul>
				</div>
			) : (
				""
			)}{" "}
		</>
	);
}
