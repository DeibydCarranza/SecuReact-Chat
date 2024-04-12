import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export function TitleChatCard({selectedChat}){
    // const getAvatar = () => {
    //     return users.find(user => user.userName === selectedChat)?.avatar
    // }

    return(
        <div className='module-contact'>
            <FontAwesomeIcon  icon={faUser} />
            {/* <img src={getAvatar()} alt="Avatar" className="contact-avatar" style={{ width: '50px', height: '50px' }} /> */}
            <h2 className='module-contect'>
                {selectedChat.from}
            </h2>
        </div>
    )
}