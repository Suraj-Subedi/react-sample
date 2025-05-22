import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Dashboard.css';


const SignupSchema = Yup.object().shape({
  teacherCount: Yup.number()
    .required('Teacher count is required')
    .positive('Teacher count must be positive')
    .integer('Teacher count must be an integer'),
  studentCount: Yup.number()
    .required('Student count is required')
    .positive('Student count must be positive')
    .integer('Student count must be an integer'),
  messagePrincipal: Yup.string().required('Message from Principal is required'),
  messageVicePrincipal: Yup.string().required(
    'Message from Vice Principal is required'
  ),
  ourVision: Yup.string().required('Our Vision is required'),
  ourMission: Yup.string().required('Our Mission is required'),
  schoolEmail: Yup.string()
    .email('Invalid email address')
    .required('School email is required'),
  schoolContactNumber: Yup.string().required('Contact number is required'),
  schoolLocation: Yup.string().required('School location is required'),
  facebookLink: Yup.string().required('Facebook link is required'),
});

const Dashboard = ({ updateDashboardAnalytics, me, permissions }) => {


  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <Formik
        initialValues={{
          principalImage: '',
          vicePrincipalImage: '',
          teacherCount: '',
          studentCount: '',
          messagePrincipal: '',
          messageVicePrincipal: '',
          ourVision: '',
          ourMission: '',
          schoolEmail: '',
          schoolContactNumber: '',
          schoolLocation: '',
          facebookLink: '',
          schoolLogo: '',
        }}
        //  validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          const formData = new FormData();
          Object.keys(values).forEach((key) => {
            if (values[key] instanceof File) {
              formData.append(key, values[key]);
            } else {
              formData.append(key, values[key]);
            }
          });

          dispatch(updateDashboardAnalytics({ formData }));
          resetForm();
        }}
      >
        {({ setFieldValue }) => (
          <Form className="dashboard-form">
            <div className="field-container">
              <label htmlFor="principalImage">Principal Image</label>
              <input
                type="file"
                name="principalImage"
                accept="image/*"
                onChange={(event) =>
                  setFieldValue('principalImage', event.target.files[0])
                }
              />
            </div>

            <div className="field-container">
              <label htmlFor="vicePrincipalImage">Vice Principal Image</label>
              <input
                type="file"
                name="vicePrincipalImage"
                accept="image/*"
                onChange={(event) =>
                  setFieldValue('vicePrincipalImage', event.target.files[0])
                }
              />
            </div>

            <div className="field-container">
              <label htmlFor="teacherCount">Teacher Count</label>
              <Field name="teacherCount" placeholder="Enter teacher count" />
              <ErrorMessage
                name="teacherCount"
                component="div"
                className="error-div"
              />
            </div>

            <div className="field-container">
              <label htmlFor="studentCount">Student Count</label>
              <Field name="studentCount" placeholder="Enter student count" />
              <ErrorMessage
                name="studentCount"
                component="div"
                className="error-div"
              />
            </div>

            <div className="field-container">
              <label htmlFor="messagePrincipal">Message from Principal</label>
              <Field
                as="textarea"
                name="messagePrincipal"
                placeholder="Enter Principal's message"
              />
              <ErrorMessage
                name="messagePrincipal"
                component="div"
                className="error-div"
              />
            </div>

            <div className="field-container">
              <label htmlFor="messageVicePrincipal">
                Message from Vice Principal
              </label>
              <Field
                as="textarea"
                name="messageVicePrincipal"
                placeholder="Enter Vice Principal's message"
              />
              <ErrorMessage
                name="messageVicePrincipal"
                component="div"
                className="error-div"
              />
            </div>

            <div className="field-container">
              <label htmlFor="ourVision">Our Vision</label>
              <Field
                as="textarea"
                name="ourVision"
                placeholder="Enter Vision"
              />
              <ErrorMessage
                name="ourVision"
                component="div"
                className="error-div"
              />
            </div>

            <div className="field-container">
              <label htmlFor="ourMission">Our Mission</label>
              <Field
                as="textarea"
                name="ourMission"
                placeholder="Enter Mission"
              />
              <ErrorMessage
                name="ourMission"
                component="div"
                className="error-div"
              />
            </div>

            <div className="field-container">
              <label htmlFor="schoolEmail">School Email</label>
              <Field name="schoolEmail" placeholder="Enter email" />
              <ErrorMessage
                name="schoolEmail"
                component="div"
                className="error-div"
              />
            </div>

            <div className="field-container">
              <label htmlFor="schoolContactNumber">Contact Number</label>
              <Field
                name="schoolContactNumber"
                placeholder="Enter contact number"
              />
              <ErrorMessage
                name="schoolContactNumber"
                component="div"
                className="error-div"
              />
            </div>

            <div className="field-container">
              <label htmlFor="schoolLocation">School Location</label>
              <Field
                name="schoolLocation"
                placeholder="Enter school location"
              />
              <ErrorMessage
                name="schoolLocation"
                component="div"
                className="error-div"
              />
            </div>

            <div className="field-container">
              <label htmlFor="facebookLink">Facebook Link</label>
              <Field name="facebookLink" placeholder="Enter Facebook URL" />
              <ErrorMessage
                name="facebookLink"
                component="div"
                className="error-div"
              />
            </div>

            <div className="field-container">
              <label htmlFor="schoolLogo">School Logo</label>
              <input
                type="file"
                name="schoolLogo"
                accept="image/*"
                onChange={(event) =>
                  setFieldValue('schoolLogo', event.target.files[0])
                }
              />
              <ErrorMessage
                name="schoolLogo"
                component="div"
                className="error-div"
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};





export default Dashboard;
