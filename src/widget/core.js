import React, {useEffect, useState} from "react";

export const API_URL = process.env.REACT_APP_API_URI;
export const STREAMING_API_URI = process.env.REACT_APP_STREAMING_API_URI;

export const ROLE = {
    SYSTEM: "system",
    USER: "user",
    ASSISTANT: "assistant",
}

export function convertMessage(data) {
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

function partMessage(message) {
    return [
        {
            type: "text",
            content: message
        }
    ]
}

const initMessage = botData => (
    <p className="text-center">
        Hi there! You can start a conversation by typing a message below. Customize {botData?.name || "your bot"} in
        the <a
        href={"#settings"} className="font-bold">Settings</a> tab.
    </p>
)

export function useBot(id, _chatId, startMessage, botData = null) {
    const [chatId, setChatId] = useState(_chatId)
    const [data, setData] = useState(false)
    const [messages, setMessages] = useState(startMessage ? [createMessage("System", partMessage(startMessage === true ? initMessage(botData) : startMessage), false, true)] : [])
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        if (id) {
            if (startMessage) setMessages([createMessage("System", partMessage(startMessage === true ? initMessage(botData) : startMessage), false, true)])
            else setMessages([])
            setChatId(_chatId || null)
            setIsTyping(false)
            setData(false)
            /*return onSnapshot(doc(db, "bots", id), (doc) => {
                setData(doc.exists() ? {...doc.data(), id: doc.id, ref: doc.ref} : null);
            });*/
        }
    }, [id])

    function createMessage(author, messageParts, isAI, isSystemMessage = false, context, media) {
        return {
            createdAt: new Date(),
            author,
            message: messageParts,
            media: media || null,
            isAI,
            isSystemMessage,
            context: context || null,
        }
    }

    function handleError(e, messages) {
        const data = e?.response?.data || e?.data
        if (data?.error || data?.message) {
            setMessages([...messages, createMessage("System", partMessage(data?.message || data?.error), false, true)])
        } else {
            setMessages([...messages, createMessage("System", partMessage("Something went wrong. Please try again."), false, true)])
        }
    }

    async function sendMessage(chatMessage) {
        if (isTyping) return;

        const newMessage = createMessage("User", partMessage(chatMessage)),
            newAIMessage = createMessage("Assistant", null, true),
            newMessages = [...messages, newMessage]

        setMessages(newMessages)

        setIsTyping(true)
        setTimeout(() => {
            setMessages([...newMessages, newAIMessage])
        }, 300)

        if (data?.stream) {
            const eventSource = new EventSource(STREAMING_API_URI + (chatId ? `/bots/${id}/stream/${chatId}` : `/bots/${id}/stream`) + `?message=${encodeURIComponent(chatMessage)}`);
            //console.log("eventSource", eventSource)

            let msg = "", context = null, media = null, command = null
            eventSource.addEventListener("context", (e) => {
                context = JSON.parse(e.data)
                setMessages([...newMessages, createMessage("Assistant", partMessage(msg), true, false, context, media)])
            }, false);
            /*eventSource.addEventListener("media", (e) => {
                media = JSON.parse(e.data)
                setMessages([...newMessages, createMessage("Assistant", partMessage(msg, true, false, context, media)])
            }, false);*/
            eventSource.addEventListener("command", (e) => {
                command = JSON.parse(e.data)
                //console.log("command", command)
            }, false);
            eventSource.onmessage = (e) => {
                if (!chatId && e.lastEventId) setChatId(e.lastEventId)
                const text = e.data;
                if (typeof text === "string") {
                    msg += JSON.parse(text)/*.slice(1, -1)*/
                    setMessages([...newMessages, createMessage("Assistant", partMessage(msg), true, false, context, media)])
                }
            };
            eventSource.onerror = (error) => {
                setMessages([...newMessages, createMessage("Assistant", partMessage(msg), true, false, context, media)])
                eventSource.close();
                setIsTyping(false)
                //console.error('Error in EventSource:', error);
            };

        } else fetch(API_URL + chatId ? `bots/${id}/chat/${chatId}` : `bots/${id}/chat`, {
            method: "POST",
            body: JSON.stringify({message: chatMessage}),
        })
            .then(async (res) => ({...res, data: await res.json()}))
            .then(res => {
                if (res.data) {
                    //console.log(res.data)
                    if (res.data.chatId) setChatId(res.data.chatId)
                    if (res.data.message) {
                        setMessages([...newMessages, createMessage("Assistant", res.data.message.parts, true, false, res.data.message.context, res.data.message.media)])

                        return
                    }
                }

                handleError(res, newMessages)

            })
            .catch(err => {
                console.log(err)
                handleError(err, newMessages)
            })
            .finally(() => {
                setIsTyping(false)
            })
    }

    function resetConversation() {
        setMessages([])
        setChatId("")
    }

    return {data, isTyping, messages, sendMessage, resetConversation, createMessage}
}
