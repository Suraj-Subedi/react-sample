import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const ChangePassword = () => {
  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .required('Current password is required')
      .min(8, 'Password must be at least 8 characters'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters')
      .notOneOf(
        [Yup.ref('currentPassword')],
        'New password cannot be the same as current password'
      ),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    async function ChangePassword() {
      try {
        const response = await fetch('http://localhost:5001/api/change-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        const json = await response.json();
        // handle response
      } catch (error) {
        console.error(error.message);
      }
    }

    ChangePassword();

    setTimeout(() => {
      alert('Password changed successfully');
      resetForm();
      setSubmitting(false);
    }, 2000);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Change Password</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="form">
            {[
              { name: 'currentPassword', label: 'Current Password' },
              { name: 'newPassword', label: 'New Password' },
              { name: 'confirmPassword', label: 'Confirm Password' },
            ].map(({ name, label }) => (
              <div className="input-root" key={name}>
                <label htmlFor={name} className="input-label">{label}</label>
                <Field type="password" id={name} name={name} className="input" />
                <ErrorMessage name={name} component="div" className="form-error" />
              </div>
            ))}

            <button type="submit" disabled={isSubmitting} className="submit-button">
              {isSubmitting ? 'Changing...' : 'Change Password'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
