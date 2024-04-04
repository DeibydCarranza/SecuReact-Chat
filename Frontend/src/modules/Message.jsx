import '../assets/Message.css'

function Message ({texto, from, hora}){
    const msgClassName = (from == 'Me') ? 
        'module-message-me' :
        'module-message'
    return (
        
        <div className={msgClassName}>
            <p className='message'>{texto}</p>
            <p className='hora'>{hora}</p>
        </div>
    )
}

export default Message;