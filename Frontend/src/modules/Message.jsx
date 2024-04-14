import '../assets/Message.css'

function Message ({texto, from, hora}){
    const msgClassName = (from == 'Me') ? 
        'module-message-me' :
        'module-message'

    const divMessage = (from == 'Me') ? 
        'div-request' :
        'div-response'
    return (
       <div className={divMessage}>
            <div className={msgClassName}>
                <p className='message'>{texto}</p>
            </div>
            <p className='hora'>{hora}</p>
       </div> 
    )
}

export default Message;