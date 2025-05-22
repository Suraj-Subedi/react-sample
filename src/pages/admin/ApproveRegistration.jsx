import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import './ApproveRegistration.css';

import ViewModal from '../../Components/ViewModal';

const ApproveRegistration = ({
  isLoading,
  isSubmitting,
  registrationRequests,
  fetchRegistrationRequests,
  approveRegistrationRequest,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [individualForm, setIndividualForm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [forms, setForms] = useState([]);

  const filteredForms = forms.filter(
    (form) =>
      form.Nameofthestudent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleApprove = (formId) => {
    dispatch(approveRegistrationRequest({ registrationId: formId }));
    dispatch(fetchRegistrationRequests());
  };

  const handleView = (formId) => {
    const data = registrationRequests.filter((forms) => {
      return forms._id == formId;
    });
    setIndividualForm(data[0]);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(fetchRegistrationRequests());
  }, []);

  useEffect(() => {
    if (registrationRequests.length > 0) {
      setForms(registrationRequests);
    }
  }, [registrationRequests]);

  return (
    <div className="approve-registration-container">
      {isOpen && (
        <ViewModal
          isOpen={isOpen}
          onClose={onClose}
          requestData={individualForm}
          handleApprove={handleApprove}
        />
      )}

      <h2 className="approve-registration-title">Approve Registration</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="registration-list">
        {filteredForms.map((form) => (
          <div className="registration-item" key={form._id}>
            <div className="registration-item-details">
              <p>
                <strong>Name:</strong> {form.Nameofthestudent}
              </p>
              <p>
                <strong>Email:</strong> {form.email}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                {form.isApproved ? 'Approved' : 'Pending'}
              </p>
            </div>
            <div className="registration-item-actions">
              <button
                onClick={() => handleView(form._id)}
                className="view-button"
              >
                View
              </button>
              {form.isApproved == false && (
                <button
                  onClick={() => handleApprove(form._id)}
                  className="approve-button"
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApproveRegistration;
