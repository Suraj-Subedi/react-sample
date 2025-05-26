import React from 'react';
import LoginForm from '../../Forms/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = ({ isLoading, login }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  return (
    <>
      <LoginForm login={login} />
    </>
  );
};

export default Login;
