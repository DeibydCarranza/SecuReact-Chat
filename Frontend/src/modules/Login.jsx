// Login.jsx
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password.trim() !== '' && (password.trim() === 'alice' || password.trim() === 'bob')) {
      onLogin();
    } else {
      console.log('Por favor ingresa una contraseña');
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
}

export default Login;
