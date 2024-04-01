import { useState } from 'react';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import Login from './modules/Login'; // Importar el componente Login
import { ChatsCard } from './modules/ChatsCard.jsx';
import Message from './modules/Message';

const socketClient = io('/');

const users = [
  {
    userName: 'Bob',
    preview: 'Madre mía Willy',
    avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-man-avatar-with-circle-frame-vector-ilustration-png-image_6110328.png',
    time: '2:09 PM'
  },
  {
    userName: 'Alice',
    preview: 'Así pasa cuando sucede',
    avatar: 'https://www.svgrepo.com/show/382097/female-avatar-girl-face-woman-user-9.svg',
    time: '5:19 PM'
  }
]

export function App() {
	// login 

	const [loggedIn, setLoggedIn] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return <Login onLogin={handleLogin} />; // Utilizar el componente Login
  }

  // Actualizar chat al hacer clic en contacto
  const handleChatSelect = (userName) => {
    setSelectedChat(userName); 
  };



  return (
    // Plantilla principal después del inicio de sesión
    <main className="message-main">
      <div className='message-main-contacts'>
        <div className='message-main-contacts-title'> 
          <h2>Usuarios</h2>
        </div>
        <div className='module-contact-target'>
          {
            users.map(({userName, preview, avatar, time}) => (
              <ChatsCard
                key={userName}
                userName={userName}
                avatar={avatar}
                preview={preview}
                time={time}
                onClick={() => handleChatSelect(userName)}
              ></ChatsCard>
            ))
          }
        </div>
      </div>

      <div className='message-main-conversation'>
        <div className='module-contact'>
          {selectedChat ? (
            <img src={users.find(user => user.userName === selectedChat)?.avatar} alt="Avatar" className="contact-avatar" style={{ width: '50px', height: '50px' }} />

          ) : (
            <FontAwesomeIcon className="contact-icon" icon={faUser} />
          )}
          <h2 className='module-contect'>{selectedChat || "Contact"}</h2>
        </div>

        <div className='message-main-conversation-conversation'>
          <Message isMe={true} texto="Mensaje enviado" />
          <Message isMe={false} texto="Mensaje recibido" />
          <Message isMe={true} texto="Mensaje envido" />
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
