import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import '../assets/ChatsCards.css'

export function ChatsCard({user, setSelectedChat,selectedChat}){
  const [background,setBackground] = useState('')
  const selectChat = () =>{
    if(background !== ''){
      setBackground("")
    }else{
      if(selectedChat !== user.from){
        setBackground("#9500ff")
        setSelectedChat(user.from)
      }
    }
  }
  return(
    <ul className="section-chats">
        <li className="section-chat-user" onClick={selectChat} style={{backgroundColor:background}}>
            {/* <img src={avatar} alt="avatar" /> */}
            <FontAwesomeIcon  className="section-chat-img" icon={faUser} />
            <section className='section-chat-texts'>
              <span className="section-chat-name">{user.from}</span>
              {/* <span className="section-chat-message">{preview}</span> */}
            </section>
            {/* <span className="section-chat-hour">{time}</span> */}
        </li>
    </ul>
  )
}

