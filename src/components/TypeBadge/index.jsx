// CSS Imports
import "./index.css";

// JSON Data
import types from "../../data/types.json";

export default function TypeBadge({ type }) {
	return <div className={`pokemon-type ${type}`}>{types[type]}</div>;
}
