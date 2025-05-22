// ApplyNowForm.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Form.css';


const ApplyNowForm = ({ registrationRequest }) => {


  const validationSchema = Yup.object().shape({
    Nameofthestudent: Yup.string().required('Name of the student is required'),
    Grade: Yup.string().required('Grade is required'),
    address: Yup.string().required('Address is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    Age: Yup.number().required('Age is required'),
    ParentName: Yup.string().required('Parent name is required'),
    Occupation: Yup.string().required('Occupation is required'),
    Mobile: Yup.string()
      .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
      .required('Mobile number is required'),
    Transportation: Yup.string().required('Transportation option is required'),
  });

  return (
    <Formik
      initialValues={{
        Nameofthestudent: '',
        Grade: '',
        address: '',
        email: '',
        phone: '',
        Age: '',
        ParentName: '',
        Occupation: '',
        Mobile: '',
        Transportation: '',
        HowDidYouHear: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {

      }}
    >
      {({ errors, touched }) => (
        <Form className="apply-form">
          <h1 className="form-title">Apply Now</h1>

          <section>
            <h2 className="section-title">Student Details</h2>
            <div className="field-container">
              <Field
                name="Nameofthestudent"
                placeholder="Name of the Student"
                className="form-field"
              />
              {errors.Nameofthestudent && touched.Nameofthestudent && (
                <div className="error">{errors.Nameofthestudent}</div>
              )}
            </div>
            <div className="field-container">
              <Field as="select" name="Grade" className="form-field">
                <option value="" label="Select Grade" />
                {[...Array(12).keys()].map((i) => (
                  <option
                    key={i}
                    value={`Class-${i + 1}`}
                    label={`Class ${i + 1}`}
                  />
                ))}
              </Field>
              {errors.Grade && touched.Grade && (
                <div className="error">{errors.Grade}</div>
              )}
            </div>
            <div className="field-container">
              <Field
                name="address"
                placeholder="Address"
                className="form-field"
              />
              {errors.address && touched.address && (
                <div className="error">{errors.address}</div>
              )}
            </div>
            <div className="field-container">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="form-field"
              />
              {errors.email && touched.email && (
                <div className="error">{errors.email}</div>
              )}
            </div>
            <div className="field-container">
              <Field
                name="phone"
                placeholder="Phone Number"
                className="form-field"
              />
              {errors.phone && touched.phone && (
                <div className="error">{errors.phone}</div>
              )}
            </div>
            <div className="field-container">
              <Field name="Age" placeholder="Age" className="form-field" />
              {errors.Age && touched.Age && (
                <div className="error">{errors.Age}</div>
              )}
            </div>
          </section>

          <section>
            <h2 className="section-title">Parent Details</h2>
            <div className="field-container">
              <Field
                name="ParentName"
                placeholder="Parent Name"
                className="form-field"
              />
              {errors.ParentName && touched.ParentName && (
                <div className="error">{errors.ParentName}</div>
              )}
            </div>
            <div className="field-container">
              <Field
                name="Occupation"
                placeholder="Occupation"
                className="form-field"
              />
              {errors.Occupation && touched.Occupation && (
                <div className="error">{errors.Occupation}</div>
              )}
            </div>
            <div className="field-container">
              <Field
                name="Mobile"
                placeholder="Mobile Number"
                className="form-field"
              />
              {errors.Mobile && touched.Mobile && (
                <div className="error">{errors.Mobile}</div>
              )}
            </div>
            <div className="field-container radio-group">
              <label>
                <Field type="radio" name="Transportation" value="Yes" />{' '}
                Transportation Required
              </label>
              <label>
                <Field type="radio" name="Transportation" value="No" /> No
                Transportation
              </label>
              {errors.Transportation && touched.Transportation && (
                <div className="error">{errors.Transportation}</div>
              )}
            </div>
          </section>

          <section>
            <div className="field-container">
              <Field as="select" name="HowDidYouHear" className="form-field">
                <option value="" label="How did you hear about us?" />
                <option value="Social Media" label="Social Media" />
                <option value="Neighbourhood" label="Neighbourhood" />
                <option value="Website" label="Website" />
                <option value="Others" label="Others" />
              </Field>
            </div>
          </section>

          <button type="submit" className="submit-btn">
            Submit Application
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ApplyNowForm;
