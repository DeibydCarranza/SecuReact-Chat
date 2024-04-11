import { useState, useEffect } from "react"

export function useInput({socketClient, to}){
    const date = new Date()
    const [inputMessage,setInputMessage] = useState('')
    const [banner, setBanner] = useState([])
    useEffect(()=>{
        socketClient.on("Response",(request)=>copyMessage(request))
        return ()=>{socketClient.off("Response",(request)=>copyMessage(request))}
    },)

    const copyMessage = (inputElement) => {setBanner([...banner,inputElement])}    
    const handleSubmit = (event) => {
        event.preventDefault()
        const message = {
            content:inputMessage,
            from: to,
            time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
        socketClient.emit("Request", message)
        message.from ='Me'
        copyMessage(message)
        setInputMessage('')
    }
    const onChange = (event) => {
        setInputMessage(event.target.value)
    }

    return ({onChange:onChange,handleSubmit:handleSubmit, banner:banner, inputMessage:inputMessage})
}