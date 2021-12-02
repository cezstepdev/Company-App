export const conversationChanged = conversationId => ({
    type: 'SELECTED_CONVERSATION_CHANGED',
    conversationId
});

export const newMessageAdded = message => ({
    type: 'NEW_MESSAGE_ADDED',
    message
});

export const conversationsRequested = () => ({
    type: 'CONVERSATIONS_REQUESTED'
});