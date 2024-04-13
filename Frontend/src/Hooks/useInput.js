import { useState, useEffect } from "react"

export function useInput({socketClient, selectedChat}){
    const date = new Date()
    const [inputMessage,setInputMessage] = useState('')
    const [banner, setBanner] = useState([])
    useEffect(()=>{
        socketClient.on("Response",(request)=>{
            copyMessage(request)
        })
        return ()=>{socketClient.off("Response",(request)=>copyMessage(request))}
    },)

    const copyMessage = (inputElement) => {
        console.log("———————————> Recibiste",inputElement)
        setBanner([...banner,inputElement])
    }    
    const handleSubmit = (event) => {
        event.preventDefault()
        const message = {
            content:inputMessage,
            from: selectedChat.socketID,
            time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
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