import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({
  setShowModal,
  handleDelete,
  deleteOne,
  title,
  message,
}) => {
  return (
    <div className="modal-confirm">
      <div className="card">
        <div className="card-header">Confirmation</div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-danger fw-semibold">{message}</p>
          <div className="d-flex justify-content-end gap-3">
            <button
              onClick={() => handleDelete(deleteOne)}
              className="btn btn-sm bg-warning bg-gradient fw-semibold"
            >
              Delete
            </button>
            <button
              className="btn btn-sm bg-info bg-gradient fw-semibold"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
