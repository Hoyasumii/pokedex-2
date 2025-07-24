// Components
import Button from "./Button";
import Icon from "./Icon";
import Card from "./Card";
import Alert from "./Alert";

// JS Scripts
import mySlug from "../scripts/mySlug";
import unslugify from "../scripts/unslugify";
import getDataSize from "../scripts/localStorage/getDataSize";
import getData from "../scripts/localStorage/getData";

export default function LastSearches({ onclick }) {
	return (
		<>
			<div className="simple-flex mb-3">
				<h2>Últimas Buscas</h2>
				<Button onclick={onclick}>
					<Icon name="bi bi-trash" />
				</Button>
			</div>

			{getDataSize() > 0 ? (
				<div className="simple-list">
					{getData().map((item) => {
						return <Card key={`card-${mySlug(item)}`} name={unslugify(item)} />;
					})}
				</div>
			) : (
				<Alert>Ainda não há buscas realizadas</Alert>
			)}
		</>
	);
}
