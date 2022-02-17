import React from 'react';
import { useAuth } from 'react-use-auth';

const Login = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <button onClick={isAuthenticated() ? logout : login}>
      {isAuthenticated() ? `Logout` : `Login`}
    </button>
  );
};

export default Login;