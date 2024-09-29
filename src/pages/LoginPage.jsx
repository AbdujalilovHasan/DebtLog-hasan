import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const users = [
  {
    login: 'hasan',
    password: '8811',
  },
];

function LoginPage({ setIsLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();

    const foundUser = users.find(
      (user) => user.login === username && user.password === password
    );

    if (foundUser) {
      toast.success('Hush kelibsiz');
      setIsLogin(true);
      localStorage.setItem('is_login', '1');
      navigate('/');
    } else {
      toast.error('Xatolik bor');
    }
  };

  return (
    <div style={{background: '#486694'}} className="login-page d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow" style={{ width: '400px' }}>
        <div className="card-body">
          <div className="logo">
            <h4 style={{ color: '#2C4371' }} className="mb-4 cursor-pointer text-center">
              <i className="bi bi-bank"></i> DebtLog
            </h4>
          </div>
          <h4 className="text-center">Login</h4>
          <form onSubmit={login}>
            <div className="mb-3">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                name="username"
                placeholder="User name"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                required
              />
            </div>
            <button style={{ background: '#486694', padding: '8px 12px', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px' }} type="submit" className="w-100">
              Send
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

LoginPage.propTypes = {
  setIsLogin: PropTypes.func.isRequired,
};

export default LoginPage;