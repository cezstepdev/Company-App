import React from 'react';
import classNames from 'classnames';

import './Message.css';

const Message = ({ isMyMessage, message }) => {
    if(message.sender === localStorage.getItem('username'))
        isMyMessage = true;

    const messageClass = classNames('message-row', {
        'you-message': isMyMessage,
        'other-message': !isMyMessage
    });
    
    const imageThumbnail = 
        isMyMessage ? null : <img src="https://cenea.org.pl/wp-content/uploads/2019/05/blank-profile-picture-973460_960_720-500x500.png" alt={message.imageAlt} />;

    return (
        <div className={messageClass}>
            <div className="message-content">
                {imageThumbnail}
                <div className="message-text">
                    {message.message}
                </div>
                <div className="message-time">{message.createdAt}</div>
            </div>
        </div>
    );
}

export default Message;