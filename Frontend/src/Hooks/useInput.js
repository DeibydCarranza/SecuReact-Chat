import { useState, useEffect } from "react"
import * as symmetric from '../utils/encrypt.js'

export function useInput({socketClient, selectedChat, secret}){
    const date = new Date()
    const [inputMessage,setInputMessage] = useState('')
    const [banner, setBanner] = useState([])
    useEffect(()=>{
        socketClient.on("Response",(request)=>{
            console.log("*****RECIBI*****")
            copyMessage(request)
        })
        return ()=>{socketClient.off("Response",(request)=>copyMessage(request))}
    },)

    const copyMessage = (inputElement) => {
        setBanner([...banner,inputElement])
    }    
    const handleSubmit = (event) => {
        event.preventDefault()
        const message = {
						content:{mensaje:symmetric.encryptMessage(secret,inputMessage),signature:''},
            from: selectedChat.socketID,
            time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
						integrity: true
        }
        console.log("<——————————— Enviaste",message)
        socketClient.emit("Request", message)
        message.from ='Me'
        copyMessage(message)
        setInputMessage('')
    }
    const onChange = (event) => {
        setInputMessage(event.target.value)
    }
    console.log("CUSTOM HOOK")
    return ({onChange:onChange,handleSubmit:handleSubmit,setBanner:setBanner, banner:banner, inputMessage:inputMessage})
}
