import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { useInput } from "../Hooks/useInput"


export function Input({socketClient, userName, setMessages}){
    const {banner,inputMessage, handleSubmit, onChange} = useInput({socketClient,userName})

    // update the message status value that will be consumed by the Message component
    useEffect(()=>{
        setMessages(banner)
    },[banner])

    return(
        <form className='module-input' onSubmit={handleSubmit}>
            <input className='module-input-input' type="text" onChange={onChange} value={inputMessage}/>
            <button className='module-input-button' label='write your message'><FontAwesomeIcon icon={faPaperPlane}/></button>
        </form>
    )
}