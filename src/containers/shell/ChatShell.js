import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {conversationChanged, conversationsRequested, newMessageAdded} from '../../store/actions';
import ConversationList from '../../components/conversation/conversation-list/ConversationList';
import ChatTitle from '../../components/chat-title/ChatTitle';
import MessageList from '../../components/message/MessageList';
import ChatForm from '../../components/chat-form/Chat-Form';

import './ChatShell.css';
import NoConversations from "../../components/conversation/no-conversations/NoConversations";

const ChatShell = (
    {
        conversations,
        selectedConversation,
        conversationChanged,
        onMessageSubmitted,
        loadConversations
    }) => {

    useEffect(() => {
        loadConversations();
    }, [loadConversations]);

    let conversationContent = (
        <>
            <NoConversations></NoConversations>
        </>
    );

    if (conversations.length > 0) {
        conversationContent = (
            <>
                <MessageList messages={selectedConversation.messages}/>
            </>
        );
    }

    return (
        <div id="messenger">
            <ConversationList
                onConversationItemSelected={conversationChanged}
                conversations={conversations}
                selectedConversation={selectedConversation} />
            <div id="chat-container">
                {/*<ConversationSearch/>*/}
                <ChatTitle selectedConversation={selectedConversation}/>
                {conversationContent}
                {/*<MessageList messages={selectedConversation.messages}/>*/}
                <ChatForm onMessageSubmitted={onMessageSubmitted}/>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        conversations: state.conversationState.conversations,
        selectedConversation: state.conversationState.selectedConversation
    };
};

const mapDispatchToProps = dispatch => ({
    conversationChanged: conversationId => dispatch(conversationChanged(conversationId)),
    onMessageSubmitted: message => dispatch(newMessageAdded(message)),
    loadConversations: () => { dispatch(conversationsRequested())}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatShell);