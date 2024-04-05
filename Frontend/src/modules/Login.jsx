// Login.jsx
import React, { useState } from 'react';

function Login({ onLogin, setUser}) {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password.trim() !== '' && (password.trim() === 'alice' || password.trim() === 'bob')) {
      /*
          Forma parte de la implementacióon especial para pasar el username a App.jsx
      */
      setUser(password)
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
        type="text"
        placeholder="user"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <input
        type="password"
        placeholder="secreto"
        onChange={handlePasswordChange}
        required
      />
      <div className='login-option'>
        <input
          type="checkbox"
          id='generar'
        />
        <label htmlFor="generar">Generar</label>
        <input
          type="checkbox"
          id='upload'
        />
        <label htmlFor="upload">Cargar</label>
      </div>
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
}

export default Login;
