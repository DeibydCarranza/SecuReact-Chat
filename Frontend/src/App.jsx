import { useState } from 'react';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import './App.css';

const socketClient = io('/');

export function App() {
	// login 
  const [loggedIn, setLoggedIn] = useState(false);
	const [password, setPassword] = useState('');

  const handleLogin = () => {
		if (password.trim() !== '' && password.trim() === 'alice' ) {
      setLoggedIn(true);
    } else {
      console.log('Por favor ingresa una contraseña válida');
    }
  };

	const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  if (!loggedIn) {
    return (
      <div className="login-container">
        <h2>Iniciar sesión</h2>
				<input
          type="password"
          placeholder="secret"
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={handleLogin}>Iniciar sesión</button>
      </div>
    );
  }




  return (
    // Plantilla principal después del inicio de sesión
    <main className="message-main">
      <div className='message-main-contacts'>
        <div className='message-main-contacts-title'> 
          <h2>Usuarios</h2>
        </div>
        <div className='module-contact-target'>
          <FontAwesomeIcon icon={faUser} />
          <h3>Contact</h3>
          <span>Status</span>
        </div>
      </div>

      <div className='message-main-conversation'>
        <div className='module-contact'>
          <FontAwesomeIcon className="contact-icon" icon={faUser} />
          <h2 className='module-contect'>Contact</h2>
        </div>

        <div className='message-main-conversation-conversation'>
          <div className='module-message'>
            <p className='message'>Message</p>
            <p className='hora'>12:00</p>
          </div>
        </div>
        <div className='message-main-conversation-input'>
          <form className='module-input'>
            <input className='module-input-input' type="text" />
            <button className='module-input-button' label='write your message'> Send </button>
          </form>
          <button className='module-gen-key'> Llave </button>
        </div>
      </div>
    </main>	
  );
}
