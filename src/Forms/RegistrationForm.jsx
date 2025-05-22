import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Form.css';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Last name is required'),
  address: Yup.string().required('Address is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  password: Yup.string().required('Required').min(7, 'Too Short!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const RegistrationForm = () => (
  <div className="main-form-container">
    <div className="form-container">
      <h1>Signup</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          address: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="form-div">
            <div className="fields-container">
              <Field
                name="firstName"
                placeholder="First name"
                className="registration-form-fields"
              />
              {errors.firstName && touched.firstName ? (
                <div className="error-div">{errors.firstName}</div>
              ) : null}
            </div>

            <div className="fields-container">
              <Field
                name="lastName"
                placeholder="Last name"
                className="registration-form-fields"
              />
              {errors.lastName && touched.lastName ? (
                <div className="error-div">{errors.lastName}</div>
              ) : null}
            </div>

            <div className="fields-container">
              <Field
                name="address"
                placeholder="Address"
                className="registration-form-fields"
              />
              {errors.address && touched.address ? (
                <div className="error-div">{errors.address}</div>
              ) : null}
            </div>

            <div className="fields-container">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="registration-form-fields"
              />
              {errors.email && touched.email ? (
                <div className="error-div">{errors.email}</div>
              ) : null}
            </div>

            <div className="fields-container">
              <Field
                name="phone"
                placeholder="Phone number"
                className="registration-form-fields"
              />
              {errors.phone && touched.phone ? (
                <div className="error-div">{errors.phone}</div>
              ) : null}
            </div>

            <div className="fields-container">
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="registration-form-fields"
              />
              {errors.password && touched.password ? (
                <div className="error-div">{errors.password}</div>
              ) : null}
            </div>

            <div className="fields-container">
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="registration-form-fields"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className="error-div">{errors.confirmPassword}</div>
              ) : null}
            </div>

            <button className="submit-btn" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

export default RegistrationForm;
