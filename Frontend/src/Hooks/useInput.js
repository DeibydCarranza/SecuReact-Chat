import { useState, useEffect } from "react"

export function useInput({socketClient, userName}){
    const [inputMessage,setInputMessage] = useState('')
    const [banner, setBanner] = useState([])
    const date = new Date()
    
    const copyMessage = (inputElement) => {setBanner([...banner,inputElement])}    
    const handleSubmit = (event) => {
        event.preventDefault()
        const message = {
            content:inputMessage,
            from: userName,
            time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
        socketClient.emit("Message", message)
        copyMessage(message)
        setInputMessage('')
    }
    const onChange = (event) => {
        setInputMessage(event.target.value)
    }

    useEffect(()=>{
        socketClient.on("Request",(request)=>copyMessage(request))
        return ()=>{socketClient.off("Request",(request)=>copyMessage(request))}
    },)

    return ({onChange:onChange,handleSubmit:handleSubmit, banner:banner, inputMessage:inputMessage})
}