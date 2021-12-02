import React from 'react';

import './ChatTitle.css';

const ChatTitle = ({ selectedConversation }) => {
    let chatTitleContents = null;

    if (selectedConversation) {
        chatTitleContents = (
            <>
                <img src="https://cenea.org.pl/wp-content/uploads/2019/05/blank-profile-picture-973460_960_720-500x500.png"/>
                <span>{ selectedConversation.recipient }</span>
            </>
        );
    }

    return (
        <div id="chat-title">
            { chatTitleContents }
        </div>
    );
}

export default ChatTitle;