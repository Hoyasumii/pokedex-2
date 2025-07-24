export default function Container({ children, classname }) {
	return <div className={`container my-5 ${classname}`}>{children}</div>;
}
