export default function Modal({ tabIndex = "-1", id, title, children }) {
	return (
		<div
			className="modal modal-lg fade"
			id={id}
			tabIndex={tabIndex}
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5">{title}</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body text-center">{children}</div>
				</div>
			</div>
		</div>
	);
}
