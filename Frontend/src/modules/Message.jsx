import '../assets/Message.css'

function Message ({texto, isMe}){
    const msgClassName = isMe ? 
        'module-message-me' :
        'module-message'
    return (
        
        <div className={msgClassName}>
            <p className='message'>{texto}</p>
            <p className='hora'>12:00</p>
        </div>
    )
}

export default Message;