import {useEffect, useState} from "react";

const API_URL = process.env.REACT_APP_API_URI

export const ROLE = {
    SYSTEM: "system", ASSISTANT: "assistant", USER: "user",
}

const createMessage = (role, content, context = null) => ({role, content, context})

export function useBot(botId, apiKey) {
    const [chatId, setChatId] = useState("")
    const [botData, setBotData] = useState(false)
    const [messages, setMessages] = useState([])
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        if (botId) {
            fetch(API_URL + "bots/" + botId, {
                method: "GET", headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Api-Key " + apiKey,
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.id) setBotData(data);
                    else handleError({data})
                })
                .catch(handleError)
                .finally(() => {
                    setIsTyping(false)
                })
        } else {
            setBotData(null)
        }
    }, [botId])


    function handleError(e) {
        const _messages = messages || [],
            data = e?.response?.data || e?.data
        if (data?.error || data?.message) setMessages([..._messages, createMessage(ROLE.SYSTEM, data?.message || data?.error)]); else setMessages([..._messages, createMessage(ROLE.SYSTEM, "Something went wrong. Please try again.")])
    }

    async function sendMessage(chatMessage) {
        if (isTyping) return false
        const userMsg = createMessage(ROLE.USER, chatMessage), aiMsg = createMessage(ROLE.ASSISTANT, null),
            msgs = [...messages, userMsg]

        setIsTyping(true)
        setMessages(msgs)

        setTimeout(() => {
            setMessages([...msgs, aiMsg])
        }, 300)

        fetch(API_URL + "bots/" + botId + "/public-chat" + (chatId ? "/" + chatId : ""), {
            method: "POST", headers: {
                "Content-Type": "application/json",
                "Authorization": "Api-Key " + apiKey,
            }, body: JSON.stringify({message: chatMessage})
        })
            .then(res => res.json())
            .then(data => {
                if (data?.chatId) setChatId(data.chatId)
                if (data?.message) setMessages([...msgs, createMessage(data.message.role, data.message.content, data.message.context)]);
                else handleError({data})
            })
            .catch(handleError)
            .finally(() => {
                setIsTyping(false)
            })
        return true
    }

    function resetConversation() {
        setMessages([])
        setChatId("")
    }

    return {botData, isTyping, messages, sendMessage, resetConversation, createMessage}
}
