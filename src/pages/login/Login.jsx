import React from 'react';
import LoginForm from '../../Forms/LoginForm';

const Login = ({ isLoading, login }) => {
  return (
    <>
      <LoginForm login={login} />
    </>
  );
};


export default Login;
