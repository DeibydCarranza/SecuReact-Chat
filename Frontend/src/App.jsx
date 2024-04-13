import { Route,Routes } from "react-router-dom"
import { useState } from "react"
import { MessageService } from "./modules/MessageService"
import { Login } from "./modules/Login"
import './assets/App.css'

export function App(){
  const [users, setUsers] = useState([])                    // {socketID,from}

  return(
    <Routes>
      <Route path='/' element={ <Login setUsers={setUsers}/> }/>
      <Route path='/home/:user' element={ <MessageService setUsers={setUsers} users={users}/> }/>
    </Routes>
  )
}