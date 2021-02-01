import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const Modal = props => {
	const { store, actions } = useContext(Context);

	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Estas seguro?</h5>
						<button
							onClick={() => actions.deleteModal()}
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<p>Warning: Estas seguro que quieres borrar, esta acción no se puede deshacer...</p>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-danger"
							data-dismiss="modal"
							onClick={() => actions.deleteContactsByID(store.id_contact.id)}>
							Sí, Borrar!!!
						</button>
						<button type="button" className="btn btn-success" onClick={() => actions.deleteModal()}>
							NO, Cancelar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
Modal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool
};

/**
 * Define the default values for
 * your component's properties
 **/
Modal.defaultProps = {
	show: false,
	onClose: null
};
