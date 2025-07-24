export default function Button({ children, onclick, classname = "" }) {
	return (
		<button
			className={`btn ${classname.includes("btn") ? classname : "btn-dark"} ${classname}`}
			type="button"
			onClick={onclick}
		>
			{children}
		</button>
	);
}
