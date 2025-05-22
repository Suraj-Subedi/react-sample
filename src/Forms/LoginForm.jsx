
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Form.css';
import React,{ useState } from 'react';
import { baseUrl } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Required'),
});

const LoginForm = () => {

  let navigate = useNavigate()


  const login =async (values) => {
    try{

      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('password', values.password);

    var result=  await fetch(baseUrl+"login.php",{
        method:"POST",
        body:formData,
      })

      var data= await result.json();

      if(data.success){
        toast.success(data.message);
        localStorage.setItem('accessToken', data.token);
        navigate('/admin');
      }else{
        toast.error(data.message);
      }

    }catch (error) {}
  }


  return (
    <div className="school-signin-container">
      <div className="school-form-container">
        <h1 className="form-heading">Admin login</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            login(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="form-content">
              <div className="form-field-container">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="input-field"
                />
                {errors.email && touched.email ? (
                  <div className="error">{errors.email}</div>
                ) : null}
              </div>
              <div className="form-field-container">
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input-field"
                />
                {errors.password && touched.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}
              </div>
              <button className="submit-button" type="submit">
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
