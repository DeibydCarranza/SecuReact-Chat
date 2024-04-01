import '../assets/ChatsCards.css'

export function ChatsCard({userName, preview, avatar, time, onClick}){

  // Función onClick pasando el username
  const handleClick = () => {
    onClick(userName); 
  };
  return(
    <ul className="section-chats">
        <li className="section-chat-user" onClick={handleClick}>
            <img src={avatar} alt="avatar" />
            <section className='section-chat-texts'>
              <span className="section-chat-name">{userName}</span>
              <span className="section-chat-message">{preview}</span>
            </section>
            <span className="section-chat-hour">{time}</span>
        </li>
    </ul>
  )
}

