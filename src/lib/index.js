import {useBot} from './hooks/useBot'
import {Chat,} from './components/chat'
import {ChatBubble,} from './components/chatBubble'
import {Message,} from './components/message'
import {partMessage} from "./utils";

function convertMessage(data) {
    if (!data) return null
    return {
        createdAt: data.createdAt || new Date(),
        author: data.role,
        message: data.parts || partMessage(data.content),
        media: data.media,
        isAI: data.role === "assistant",
        isSystemMessage: data.role === "system",
        context: data.context || null
    }
}

export {
    useBot,
    ChatBubble,
    Message,
    Chat,
    convertMessage
}
