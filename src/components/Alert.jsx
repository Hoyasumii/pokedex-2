export default function Alert({ children }) {
	return (
		<div className="alert alert-dark" role="alert">
			{children}
		</div>
	);
}
