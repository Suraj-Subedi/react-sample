import React from 'react';
import './Components.css';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay" onClick={onClose}>
      <div
        className="delete-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="delete-modal-header">
          <h2 className="delete-modal-title">Are you sure?</h2>
        </div>
        <div className="delete-modal-body">
          <p className="delete-modal-text">
            Are you sure you want to delete this? This action cannot be undone.
          </p>
        </div>
        <div className="delete-modal-footer">
          <button
            className="delete-modal-btn delete-modal-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="delete-modal-btn delete-modal-confirm"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
