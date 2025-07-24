export default function Input({
	placeholder,
	type = "text",
	name,
	onchange,
	onkeyup,
	classname = "",
}) {
	return (
		<input
			type={type}
			name={name}
			id={name}
			placeholder={placeholder}
			onChange={onchange}
			className={`form-control shadow-sm ${classname}`}
			onKeyUp={onkeyup}
			autoComplete="off"
		/>
	);
}
