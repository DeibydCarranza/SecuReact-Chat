import '../assets/ChatsCards.css'

export function ChatsCard({}){

  return(
    <ul className="section-chats">
        <li className="section-chat-user">
            <img src="https://www.svgrepo.com/show/382097/female-avatar-girl-face-woman-user-9.svg" alt="" />
            <section className='section-chat-texts'>
              <span className="section-chat-name">Alice</span>
              <span className="section-chat-message">Te envío mi secreto</span>
            </section>
            <span className="section-chat-hour">2:09 PM</span>
        </li>
    </ul>
  )
}

