import {useEffect, useRef, useState} from "react";
import {catchErrors, partMessage, serializeQuery} from "../utils";

const API_URL = process.env.REACT_APP_API_URI;
const STREAMING_API_URI = process.env.REACT_APP_STREAMING_API_URI;

const ROLE = {
    SYSTEM: "system",
    USER: "user",
    ASSISTANT: "assistant",
}

export function useBot(config = {chatId: null, id: null, startMessage: null, enableLocaLStorage: false}) {
    const [isLoading, setIsLoading] = useState(true)
    const [chatId, setChatId] = useState(config.chatId)
    const [data, setData] = useState(false)
    const [messages, setMessages] = useState(config.startMessage ? [createMessage(ROLE.SYSTEM, [partMessage(config.startMessage)], false, true)] : [])
    const [isTyping, setIsTyping] = useState(false)
    const input = useRef();

    useEffect(() => {
        if (config.id) {
            if (config.startMessage) setMessages([createMessage(ROLE.SYSTEM, [partMessage(config.startMessage)], false, true)])
            else setMessages([])
            setChatId(config.chatId || null)

            if (config.enableLocaLStorage && window?.localStorage?.getItem) {
                const stored = JSON.parse(window.localStorage.getItem(`bot-${config.id}`))
                if (stored?.timestamp > (Date.now() - 1000 * 60 * 60 * 24)) {
                    if (stored?.chatId) {
                        setChatId(stored.chatId)
                    }
                    if (stored?.messages) {
                        setMessages(stored?.messages)
                    }
                }
            }

            setIsTyping(false)
            setData(false)
            fetch(`${API_URL}/bots/${config.id}`)
                .then(async (res) => ({...res, data: await res.json()}))
                .then(({data}) => {
                    setData(data)
                })
                .catch(e => {
                    setData(null)
                    catchErrors(e, window.alert)
                })
        }
    }, [config.id])

    useEffect(() => {
        if (config.enableLocaLStorage && window?.localStorage?.setItem && data?.id === config.id) {
            window.localStorage.setItem(`bot-${config.id}`, JSON.stringify({
                id: config.id,
                chatId: config.chatId,
                messages,
                timestamp: Date.now()
            }))
        }
    }, [config.id, chatId, messages, config.enableLocaLStorage])

    useEffect(() => {
        if (data !== false) setIsLoading(false)
        data && setTimeout(() => input.current && input.current.focus(), 250)
    }, [data])

    useEffect(() => {
        !isTyping && input.current && input.current.focus()
    }, [isTyping])

    function onKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            if (!e.repeat) onSubmit()
            e.preventDefault(); // Prevents the addition of a new line in the text field
        }
    }

    function onSubmit(e) {
        e && e.preventDefault()

        if (input.current) {
            const message = input.current.value
            if (isTyping || !message) return
            input.current.focus()
            sendMessage(message)
            input.current.value = ""
        }
    }

    function createMessage(author, messageParts, isAI, isSystemMessage = false, context) {
        return {
            createdAt: new Date(),
            author,
            message: messageParts,
            media: null,
            isAI,
            isSystemMessage,
            context: context || null,
        }
    }

    function handleError(e, messages) {
        const data = e?.response?.data || e?.data
        if (data?.error || data?.message) {
            setMessages([...messages, createMessage(ROLE.SYSTEM, [partMessage(data?.message || data?.error)], false, true)])
        } else {
            setMessages([...messages, createMessage(ROLE.SYSTEM, [partMessage("Something went wrong. Please try again.")], false, true)])
        }
    }

    async function sendMessage(chatMessage) {
        if (isTyping) return;

        const newMessage = createMessage(ROLE.USER, [partMessage(chatMessage)]),
            newAIMessage = createMessage(ROLE.ASSISTANT, null, true),
            newMessages = [...messages, newMessage]

        setMessages(newMessages)

        setIsTyping(true)
        setTimeout(() => {
            setMessages([...newMessages, newAIMessage])
        }, 300)

        if (data?.stream) {
            const query = serializeQuery({
                    message: chatMessage,
                    customCommands: config.customCommands || null,
                }),
                eventSource = new EventSource(STREAMING_API_URI + (chatId ? `/bots/${config.id}/stream/${chatId}` : `/bots/${config.id}/stream`) + `?${query}`);

            let msgParts = [], context = null
            eventSource.addEventListener("context", (e) => {
                context = JSON.parse(e.data)
                setMessages([...newMessages, createMessage(ROLE.ASSISTANT, msgParts, true, false, context)])
            }, false);
            /*eventSource.addEventListener("media", (e) => {
                media = JSON.parse(e.data)
                setMessages([...newMessages, createMessage(ROLE.ASSISTANT, partMessage(msg, true, false, context, media)])
            }, false);*/
            eventSource.addEventListener("command", (e) => {
                const content = JSON.parse(e.data)
                if (content) {
                    msgParts.push(partMessage(content, "command"))
                    setMessages([...newMessages, createMessage(ROLE.ASSISTANT, msgParts, true, false, context)])
                }
            }, false);
            eventSource.onmessage = (e) => {
                if (!chatId && e.lastEventId) setChatId(e.lastEventId)
                const text = e.data;
                if (typeof text === "string") {
                    msgParts.push(partMessage(JSON.parse(text)))
                    setMessages([...newMessages, createMessage(ROLE.ASSISTANT, msgParts, true, false, context)])
                }
            };
            eventSource.onerror = (error) => {
                setMessages([...newMessages, createMessage(ROLE.ASSISTANT, msgParts, true, false, context)])
                eventSource.close();
                setIsTyping(false)
            };

        } else fetch(API_URL + (chatId ? `/bots/${config.id}/chat/${chatId}` : `/bots/${config.id}/chat`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({message: chatMessage}),
        })
            .then(async (res) => ({...res, data: await res.json()}))
            .then(res => {
                if (res.data) {
                    if (res.data.chatId) setChatId(res.data.chatId)
                    if (res.data.message) {
                        setMessages([...newMessages, createMessage(ROLE.ASSISTANT, res.data.message.parts, true, false, res.data.message.context, res.data.message.media)])
                        return
                    }
                }
                handleError(res, newMessages)
            })
            .catch(err => {
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

    return {
        data,
        isTyping,
        messages,
        resetConversation,
        isLoading,
        onSubmit,
        onKeyDown,
        input,
    }
}
