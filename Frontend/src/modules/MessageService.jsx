import { useEffect, useState, useRef } from 'react';
import { useLocation } from "react-router-dom"
import { ChatsCard } from './ChatsCard.jsx';
import Message from './Message';
import { Input } from './Input.jsx';
import { TitleChatCard } from './TitleChatsCard.jsx'
import { useContext } from 'react';
import { SocketClient } from './SocketClient';
import * as symmetric from '../utils/encrypt.js'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

export function MessageService() {
  const socketClient = useContext(SocketClient)
  const [messages,setMessages]=useState([])                 // {socketID, banner[]}
  const [selectedChat, setSelectedChat] = useState({});     // {socketID,from}
	const [userBroadcast, setUsersBroadcast] = useState('') 
  const user = useLocation()
	const noFirstBroadcast = useRef(false)
  const [selectedBanner,setBanner] = useState([])           // banner[]
  const [users, setUsers] = useState([])                    // {socketID,from, publicKey}
	const [icon, setIcon] = useState(faLock);
  
  
  useEffect(()=>{

    if(user.state.userName !== ''){
      socketClient.emit("Discover",{userName: user.state.userName, publicKey: user.state.keys.publicKey})
      socketClient.on("LoggedUsers",(usersTable)=>{
        
        if(usersTable.length !== 0){
          setUsers([...usersTable])
        }
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
  /* 
    Define el banner de la conversación para que React pueda renderizar el arreglo (banner)
  */
  useEffect(()=>{
    if(messages.length !== 0){
      const conversation = messages.find(messageSesion => messageSesion.socketID === selectedChat.socketID)
      if(conversation){
        const conversationBanner = conversation.banner 
        setBanner(conversationBanner)
      }
    }
  },[messages])

  const handleIconChange = () => {
    const newIcon = icon === faLock ? faLockOpen : faLock;
    setIcon(newIcon);
    
    if (newIcon === faLock) {
      symmetric.encryptMessages(messages,user.state.secret,selectedChat);
    } else {
      symmetric.decrypt(messages,user.state.secret,selectedChat);
    }
  };
  console.log("Current Banner ->\n",selectedBanner)
  console.log("Conversations  ->\n",messages)
  console.log("Users          ->\n",users)
  console.log("LLaves        ->\n",user.state.keys)

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
            users.map((user) => (
              <ChatsCard
                key={user.socketID*user.from}
                user={user}
                setSelectedChat={setSelectedChat}
                selectedChat={selectedChat}
              ></ChatsCard>
            ))
          }
        </div>
      </div>

      <div className='message-main-conversation'>
        <TitleChatCard selectedChat={selectedChat}/>
        <div className='message-main-conversation-conversation'>
          {selectedBanner.map((messages)=>(
            <Message 
                key={messages.content+messages.time} 
                from={messages.from} 
                texto={messages.content} 
                hora={messages.time}/>
          ))}
        </div>
        
        <div className='message-main-conversation-input'>
          <Input socketClient={socketClient} selectedChat={selectedChat} setMessages={setMessages} messages={messages} handleIconChange={handleIconChange} icon={icon} secret={user.state.secret}/>
        </div>
      </div>
    </main>	
  );
}
