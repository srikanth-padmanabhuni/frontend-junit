import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setLoginSuccess('')
      setLoginError('Please enter both username and password.');
    } else {
      setLoginError('');
      setLoginSuccess('Login successful!')
    }
  };

  return (
    <form data-testid="login-form" onSubmit={handleSubmit}>
      <div>
        <input
          data-testid="username-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          data-testid="password-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button data-testid="submit-button" type="submit">
        Login
      </button>
      {loginSuccess && <p data-testid="success-message">{loginSuccess}</p>}
      {loginError && <p data-testid="error-message">{loginError}</p>}
    </form>
  );
}

export default App;
