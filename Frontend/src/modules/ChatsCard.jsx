import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import '../assets/ChatsCards.css'

export function ChatsCard({user, setSelectedChat,selectedChat}){
  const [background,setBackground] = useState('')
  // update selectedChat and background of element
  const selectChat = () =>{
    if(background !== ''){
      setBackground("")
    }else{
      setBackground("#9500ff")
      setSelectedChat(user)
    }
  }
  // update background of element if another element was selected
  useEffect(()=>{
    if(selectedChat.from !== user.from){
      setBackground("")
    }
  },[selectedChat])
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

