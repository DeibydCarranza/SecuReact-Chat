import { Route,Routes } from "react-router-dom"
import { useState } from "react"
import { MessageService } from "./modules/MessageService"
import { Login } from "./modules/Login"
import './assets/App.css'
import { SocketClient } from "./modules/SocketClient"
import io from 'socket.io-client';
export function App(){
  const [users, setUsers] = useState([])                    // {socketID,from}

  return(
    <SocketClient.Provider value={io('/')}>
      <Routes>
        <Route path='/' element={ <Login setUsers={setUsers}/> }/>
        <Route path='/home/:user' element={ <MessageService setUsers={setUsers} users={users}/> }/>
      </Routes>
    </SocketClient.Provider>
  )
}