export function TitleChatCard({selectedChat,users}){
    const getAvatar = () => {
        return users.find(user => user.userName === selectedChat)?.avatar
    }
    return(
        <div className='module-contact'>
            <img src={getAvatar()} alt="Avatar" className="contact-avatar" style={{ width: '50px', height: '50px' }} />
            <h2 className='module-contect'>
                {selectedChat || "Contact"}
            </h2>
        </div>
    )
}