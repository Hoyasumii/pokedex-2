export default function Icon({ name, classname = "" }) {
	return <i className={`bi bi-${name} ${classname}`}></i>;
}
