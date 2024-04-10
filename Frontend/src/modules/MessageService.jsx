import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useLocation } from "react-router-dom"
import '../App.css';
import { ChatsCard } from './ChatsCard.jsx';
import Message from './Message';
import { Input } from './Input.jsx';
import { TitleChatCard } from './TitleChatsCard.jsx'

const socketClient = io('/');

export function MessageService() {

  const [messages,setMessages]=useState([]) 
  const [selectedChat, setSelectedChat] = useState(null);
  const [users, setUsers] = useState([]) 
	const [userBroadcast, setUsersBroadcast] = useState('') 
  const user = useLocation()
	const noFirstBroadcast = useRef(false)
	

  useEffect(()=>{
    console.log(`user: ${user.state.userName}\n\r secret: ${user.state.secret}`)
    if(user.state.userName !== ''){
      socketClient.emit("Discover",user.state.userName)
			socketClient.on("LoggedUsers",(usersTable)=>{
				// case: 1st user connected
				if(usersTable.length !== 0)
					setUsers([...usersTable])
				})
			return ()=>{socketClient.off("LoggedUsers",()=>{})}
    }
  },[])

	useEffect(()=>{
		socketClient.on("Broadcast Request",(userInfo)=>{
			setUsersBroadcast(userInfo)
		})
		return ()=>{socketClient.off("Broadcast Request",()=>{})}
	},[socketClient])

	/*
		avoid executing setUsers the first time the component is 
		loaded and only execute it every time the dependency is modified
	*/
	useEffect(()=>{
		if(noFirstBroadcast.current === true)
			setUsers([...users,userBroadcast])
		if(!noFirstBroadcast.current)
			noFirstBroadcast.current = true
	},[userBroadcast])

  return (
    // Plantilla principal después del inicio de sesión
    <main className="message-main">
      <div className='message-main-contacts'>
        <div className='message-main-contacts-title'> 
          <h2>Usuarios</h2>
        </div>
        <div className='module-contact-target'>
          { 
						(users.length !== 0)  && 
            users.map((userRegister) => (
              <ChatsCard
                key={userRegister.socketID * userRegister.from}
                user={userRegister}
                // avatar={avatar}
                // preview={preview}
                // time={time}
                setSelectedChat={setSelectedChat}
              ></ChatsCard>
            ))
          }
        </div>
      </div>

      <div className='message-main-conversation'>
        <TitleChatCard selectedChat={selectedChat}/>
        <div className='message-main-conversation-conversation' style={{ overflowY: 'scroll'}}>
          {messages.map((messages)=>(
            <Message 
                key={messages.content+messages.time} 
                from={messages.from} 
                texto={messages.content} 
                hora={messages.time}/>
          ))}
        </div>
        
        <div className='message-main-conversation-input'>
          <Input socketClient={socketClient} userName={user.state.userName} setMessages={setMessages}/>
        </div>
      </div>
    </main>	
  );
}
