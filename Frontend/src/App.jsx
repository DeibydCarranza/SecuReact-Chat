import { Route,Routes } from "react-router-dom"
import { MessageService } from "./modules/MessageService"
import { Login } from "./modules/Login"
import './assets/App.css'

export function App(){
  return(
    <Routes>
      <Route path='/' element={ <Login/> }/>
      <Route path='/home/:user' element={ <MessageService/> }/>
    </Routes>
  )
}