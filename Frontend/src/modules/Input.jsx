import { useEffect, useRef, useState } from "react"
import { useInput } from "../Hooks/useInput"
import * as routing from '../utils/routing.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";


export function Input({socketClient, selectedChat, setMessages, messages,handleIconChange,icon,secret,solicit}){
		// managment Input of form
    const {banner,inputMessage, handleSubmit, onChange, setBanner} = useInput({socketClient,selectedChat,secret,icon})


    // instantiate conversation inside message array 
    useEffect(()=>{
			if (Object.keys(selectedChat).length !== 0 ){
				const connection = routing.checkUserConnection(messages,selectedChat)
				if(!connection){
					setMessages((usersBanner)=>[
						... usersBanner,{
							socketID: selectedChat.socketID,
							banner:[]
						}]
					)
				}
			}
    },[selectedChat])

		// update conversation
		useEffect(()=>{
			if(banner.length !== 0 && Object.keys(selectedChat).length !== 0){
				const historyBanner = routing.updateConnection(messages,selectedChat) // return banner
				if(historyBanner){
					setMessages((usersBanner)=>[
						... usersBanner,{
							socketID: selectedChat.socketID,
							banner:[...historyBanner,...banner]
						}]
					)
					setBanner([])
				}
			}
		},[banner])

	
    return(
		<>
			{solicit &&
			<form className='module-input' onSubmit={handleSubmit}>
				<input className='module-input-input' type="text" onChange={onChange} value={inputMessage}/>
				<button className='module-input-button' label='write your message'>
								<FontAwesomeIcon icon={faPaperPlane}/>
				</button>
				<button className='module-encrypt-decrypt-button' type='button' label='e-d your message' onClick={() => handleIconChange()}>
						<FontAwesomeIcon icon={icon}/> 
				</button>
        	</form>

			}
		</>
    )
}

