import { useState, useEffect } from "react"
import * as symmetric from '../utils/encrypt.js'
import { faLock } from "@fortawesome/free-solid-svg-icons";

export function useInput({socketClient, selectedChat, secret,icon}){
    const date = new Date()
    const [inputMessage,setInputMessage] = useState('')
    const [banner, setBanner] = useState([])
    const [response, setResponse] = useState()
    useEffect(()=>{  
        socketClient.on("Response",(request)=>{
            setResponse(request)
        })
        return ()=>{socketClient.off("Response","")}
    },[socketClient,selectedChat])
 
    useEffect(()=>{
        if(response !== undefined){
            if(icon !== faLock){
                // save decrypt
                console.log(`${JSON.stringify(response.content)}\n+RECIBO: decifro por ${icon.iconName}`)
                const decryptMessage = symmetric.decryptMessage(response.content.mensaje,secret)
                response.content.mensaje = decryptMessage
                copyMessage(response)
            }else{
                // else save encrypt
                console.log("+RECIBO: NO decifro por ", icon.iconName)
                copyMessage(response)
            }
        }
    },[response])

    const handleSubmit = (event) => {
        event.preventDefault()
        const message = {
			content:{mensaje:symmetric.encryptMessage(secret,inputMessage),signature:''},
            from: selectedChat.socketID,
            time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
			integrity: false
        }
        console.log("Envio  ",message.content)
        // send encrypt
        socketClient.emit("Request", message)
        // save decrypt
        if(icon !== faLock)
            message.content.mensaje = symmetric.decryptMessage(message.content.mensaje,secret)
        // else save encrypt
        message.from ='Me'
        copyMessage(message)
        setInputMessage('')
    }

    const copyMessage = (inputElement) => {
        setBanner([...banner,inputElement])
    }   

    const onChange = (event) => {
        setInputMessage(event.target.value)
    }
    return ({onChange:onChange,handleSubmit:handleSubmit,setBanner:setBanner, banner:banner, inputMessage:inputMessage})
}
