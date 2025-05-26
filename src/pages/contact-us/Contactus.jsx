
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Contactus.css';
import React from 'react';
import { baseUrl } from '../../utils/constant';
import toast from 'react-hot-toast';

const ContactUs = ( ) => {


  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    message: Yup.string().required('Message is required'),
  });

   const addInquiry =async (values,onSuccess) => {
    try{

      const formData = new FormData();
      formData.append('first_name', values.firstName);
      formData.append('last_name', values.lastName);
      formData.append('email', values.email);
      formData.append('phone_number', values.phone);
      formData.append('message', values.message);


    var result=  await fetch(baseUrl+"addInquiry.php",{
        method:"POST",
        headers: {
          'Accept': 'application/json',

        },
        body:formData,
      })

      var data= await result.json();

      if(data.success){
        toast.success(data.message);
        if(onSuccess) {
          onSuccess();
        }
      }else{
        toast.error(data.message);
      }

    }catch (error) {
      console.error(error);
      toast.error('An error occurred while uploading the notice.');
    }
  }

  return (
    <div className="contact-form-main">
      <div className="contact-form-container">
        <h2 className="contact-us-title">Contact Us</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            addInquiry(values, () => {
              resetForm();
            }
            )
          }}

        >
          {({ isSubmitting }) => (
            <Form className="contact-form">
              <div className="form-group">
                <Field type="text" name="firstName" placeholder="First Name" />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-group">
                <Field type="text" name="lastName" placeholder="Last Name" />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-group">
                <Field type="email" name="email" placeholder="Email Address" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <Field type="tel" name="phone" placeholder="Phone Number" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>
              <div className="form-group">
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Your Message"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="error"
                />
              </div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactUs;
