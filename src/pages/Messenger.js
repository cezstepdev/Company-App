import React from "react";
import './Messenger.css';
import ChatShell from "../containers/shell/ChatShell";

const Messenger = () => {
    return (
        <div id="chat-shell">
            <ChatShell/>
        </div>
    )
}

export default Messenger;