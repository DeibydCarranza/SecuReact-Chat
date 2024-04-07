import { useState, useEffect } from "react"

export function useInput({socketClient, userName}){
    const [inputMessage,setInputMessage] = useState('')
    const [banner, setBanner] = useState([])
    const date = new Date()
    
    const copyMessage = (inputElement) => {setBanner([...banner,inputElement])}    
    const handleSubmit = (event) => {
        event.preventDefault()
        /* 
            A futuro debe ser suplantado por una prop que indique con quien queremos hablar
        */
        const to = (userName === 'Bob' ? 'Alice':'Bob')
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

    useEffect(()=>{
        socketClient.on("Response",(request)=>copyMessage(request))
        return ()=>{socketClient.off("Response",(request)=>copyMessage(request))}
    },)

    return ({onChange:onChange,handleSubmit:handleSubmit, banner:banner, inputMessage:inputMessage})
}