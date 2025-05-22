import React from 'react';
import './Components.css';

const ViewModal = ({ isOpen, onClose, requestData, handleApprove }) => {
  if (!isOpen) return null;

  return (
    <div className="unique-modal-overlay">
      <div className="unique-modal-container">
        <div className="unique-modal-header">
          <h2>Registration Request</h2>
          <button className="unique-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="unique-modal-body">
          <div className="unique-modal-content">
            <p>
              <strong>Name:</strong> {requestData.Nameofthestudent}
            </p>
            <p>
              <strong>Age:</strong> {requestData.Age}
            </p>
            <p>
              <strong>Email:</strong> {requestData.email}
            </p>
            <p>
              <strong>Address:</strong> {requestData.address}
            </p>
            <p>
              <strong>Contact:</strong> {requestData.phone}
            </p>
            <p>
              <strong>Grade:</strong> {requestData.Grade}
            </p>
            <p>
              <strong>ParentName:</strong> {requestData.ParentName}
            </p>
            <p>
              <strong>Occupation:</strong> {requestData.Occupation}
            </p>
            <p>
              <strong>Guardian Contact No. :</strong> {requestData.Mobile}
            </p>
            <p>
              <strong>Transportation required</strong>{' '}
              {requestData.Transportation}
            </p>
            <p>
              <strong>HowDidYouHear</strong> {requestData.HowDidYouHear}
            </p>
            <p>
              <strong>Status</strong>{' '}
              {!requestData.isApproved ? 'Pending' : 'Approved'}
            </p>
          </div>
        </div>
        <div className="unique-modal-footer">
          <button
            className="unique-modal-approve"
            onClick={async () => {
              await handleApprove(requestData._id);
              onClose();
            }}
          >
            Approve
          </button>
          <button className="unique-modal-reject" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
