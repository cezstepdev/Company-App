import React from 'react';
import classNames from 'classnames';

import './ConversationItem.css';

const ConversationItem = (
    { 
        conversation, 
        isActive,
        onConversationItemSelected
    }
) => {
    const className = classNames('conversation', {
        'active': isActive
    });

    return (
        <div className={className} onClick={() => onConversationItemSelected(conversation.id)}>
            <img src="https://cenea.org.pl/wp-content/uploads/2019/05/blank-profile-picture-973460_960_720-500x500.png" alt={conversation.imageAlt} />
            <div className="title-text">{conversation.recipient}</div>
            <div className="created-date">{conversation.createdAt}</div>
            <div className="conversation-message">
                {conversation.latestMessage}
            </div>
        </div>
    );
}

export default ConversationItem;