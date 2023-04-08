import {useEffect, useRef, useState} from "react";
import {catchErrors, firestampToDate, partMessage, serializeQuery} from "../helpers";

const API_URL = process.env.REACT_APP_API_URI || "https://chat-gpt-374521.oa.r.appspot.com/v1";
const STREAMING_API_URI = process.env.REACT_APP_STREAMING_API_URI || "https://api2.aitoolkit.dev/v1";

const ROLE = {
    SYSTEM: "system", USER: "user", ASSISTANT: "assistant",
}

export default function useBot(config = {
    chatId: null,
    id: null,
    startMessage: null,
    enableLocalStorage: false,
    fetchHistory: false,
    headers: {},
    customCommands: null
}) {
    const [chatId, setChatId] = useState(config.chatId)
    const [data, setData] = useState(false)
    const [messages, setMessages] = useState(config.startMessage ? [createMessage(new Date(), ROLE.SYSTEM, [partMessage(config.startMessage)], false, true)] : [])
    const [isTyping, setIsTyping] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const input = useRef();

    useEffect(() => {
        let messages = [], botId = config.id, chatId = config.chatId
        if (botId) {
            if (config.startMessage) messages = [createMessage(new Date(), ROLE.SYSTEM, [partMessage(config.startMessage)], false, true)]
            if (config.enableLocalStorage && window?.localStorage?.getItem) {
                const stored = JSON.parse(window.localStorage.getItem(`bot-${config.id}`))

                //console.log(config.enableLocalStorage, stored)

                if (stored?.timestamp > (Date.now() - 1000 * 60 * 60 * 24)) {
                    if (stored?.chatId === chatId || !chatId) {
                        if (stored?.chatId) chatId = stored.chatId
                        if (stored?.messages) messages = stored?.messages.map(m => createMessage(new Date(m.createdAt), m.author, m.message, m.author === ROLE.ASSISTANT, m.author === ROLE.SYSTEM, m.context))
                    }
                }
            }

            setChatId(chatId || null)
            setIsTyping(false)
            setData(false)
            setMessages(messages)
            setIsLoading(true)

            fetch(`${API_URL}/bots/${botId}`, {headers: config.headers})
                .then(async (res) => ({...res, data: await res.json()}))
                .then(({data}) => {
                    if (botId === config.id) {
                        setData(data)
                        if (config.chatId === chatId && chatId) {
                            return fetch(`${API_URL}/bots/${botId}/chat/${chatId}`, {headers: config.headers})
                                .then(async (res) => ({...res, data: await res.json()}))
                                .then(({data}) => {
                                    if (botId === config.id && config.chatId === chatId && data?.results) {
                                        console.log(data.results)
                                        setMessages([...messages, ...data.results.map(m => createMessage(firestampToDate(m.createdAt), m.role, m.parts || [partMessage(m.content)], m.role === ROLE.ASSISTANT, m.role === ROLE.SYSTEM, m.context))])
                                    }
                                })
                        }
                    }
                })
                .catch(e => {
                    setData(null)
                    catchErrors(e, window.alert)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [config.id, config.chatId])

    useEffect(() => {
        if (config.enableLocalStorage && window?.localStorage?.setItem && data?.id === config.id && messages?.length) {
            window.localStorage.setItem(`bot-${config.id}`, JSON.stringify({
                id: config.id, chatId: chatId, messages, timestamp: Date.now()
            }))
        }
    }, [config.id, chatId, messages, config.enableLocalStorage])

    useEffect(() => {
        //if (data !== false) setIsLoading(false)
        data && setTimeout(() => input.current && input.current.focus(), 250)
    }, [data])

    useEffect(() => {
        !isTyping && input.current && input.current.focus()
    }, [isTyping])

    const [normalHeight, setNormalHeight] = useState(0)


    useEffect(resizeTextArea, [input.current?.value, input.current]);

    function resizeTextArea() {
        if (input.current) {
            let oneRowHeight = normalHeight
            if (!oneRowHeight && input.current.scrollHeight > 0) {
                oneRowHeight = input.current.scrollHeight
                setNormalHeight(oneRowHeight)
            }
            input.current.style.height = "auto";
            if (input.current.scrollHeight > oneRowHeight * 4) {
                input.current.style.height = (oneRowHeight * 4) + "px";
                input.current.style.overflowY = "auto";
            } else {
                input.current.style.height = input.current.scrollHeight + "px";
                input.current.style.overflowY = "hidden";
            }
        }
    }

    function onKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            if (!e.repeat) onSubmit()
            e.preventDefault(); // Prevents the addition of a new line in the text field
        }
    }

    function onChange(e) {
        resizeTextArea()
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

    function createMessage(timestamp, author, messageParts, isAI, isSystemMessage = false, context) {
        return {
            createdAt: timestamp,
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
            setMessages([...messages, createMessage(new Date(), ROLE.SYSTEM, [partMessage(data?.message || data?.error)], false, true)])
        } else {
            setMessages([...messages, createMessage(new Date(), ROLE.SYSTEM, [partMessage("Something went wrong. Please try again.")], false, true)])
        }
    }

    async function sendMessage(chatMessage) {
        if (isTyping) return;

        const newMessage = createMessage(new Date(), ROLE.USER, [partMessage(chatMessage)]),
            newAIMessage = createMessage(new Date(), ROLE.ASSISTANT, null, true),
            newMessages = [...messages, newMessage]

        setMessages(newMessages)

        setIsTyping(true)
        setTimeout(() => {
            setMessages([...newMessages, newAIMessage])
        }, 300)

        if (data?.stream) {
            const queryParams = {
                message: chatMessage, customCommands: config.customCommands || null,
            }
            if (config.headers?.Authorization) {
                const spl = config.headers.Authorization.split(" ")
                if (spl.length === 2) {
                    queryParams["token"] = spl[1]
                }
            }

            const query = serializeQuery(queryParams),
                eventSource = new EventSource(STREAMING_API_URI + (chatId ? `/bots/${config.id}/stream/${chatId}` : `/bots/${config.id}/stream`) + `?${query}`, {withCredentials: true});

            let msgParts = [], context = null
            eventSource.addEventListener("context", (e) => {
                context = JSON.parse(e.data)
                setMessages([...newMessages, createMessage(new Date(), ROLE.ASSISTANT, msgParts, true, false, context)])
            }, false);
            /*eventSource.addEventListener("media", (e) => {
                media = JSON.parse(e.data)
                setMessages([...newMessages, createMessage(new Date(), ROLE.ASSISTANT, partMessage(msg, true, false, context, media)])
            }, false);*/
            eventSource.addEventListener("command", (e) => {
                const content = JSON.parse(e.data)
                if (content) {
                    msgParts.push(partMessage(content, "command"))
                    setMessages([...newMessages, createMessage(new Date(), ROLE.ASSISTANT, msgParts, true, false, context)])
                }
            }, false);
            eventSource.onmessage = (e) => {
                if (!chatId && e.lastEventId) setChatId(e.lastEventId)
                const text = e.data;
                if (typeof text === "string") {
                    msgParts.push(partMessage(JSON.parse(text)))
                    setMessages([...newMessages, createMessage(new Date(), ROLE.ASSISTANT, msgParts, true, false, context)])
                }
            };
            eventSource.onerror = (error) => {
                setMessages([...newMessages, createMessage(new Date(), ROLE.ASSISTANT, msgParts, true, false, context)])
                eventSource.close();
                setIsTyping(false)
            };

        } else fetch(API_URL + (chatId ? `/bots/${config.id}/chat/${chatId}` : `/bots/${config.id}/chat`), {
            method: "POST", headers: {
                "Content-Type": "application/json", ...config.headers,
            }, body: JSON.stringify({
                message: chatMessage, customCommands: config.customCommands || null
            }),
        })
            .then(async (res) => ({...res, data: await res.json()}))
            .then(res => {
                if (res.data) {
                    if (res.data.chatId) setChatId(res.data.chatId)
                    if (res.data.message) {
                        setMessages([...newMessages, createMessage(new Date(), ROLE.ASSISTANT, res.data.message.parts, true, false, res.data.message.context, res.data.message.media)])
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
        if (config.enableLocalStorage && window?.localStorage?.setItem && data?.id === config.id) {
            window.localStorage.setItem(`bot-${config.id}`, JSON.stringify({
                id: config.id, chatId: chatId, messages: [], timestamp: Date.now()
            }))
        }
        setMessages([])
        setChatId("")
    }

    return {
        data, isTyping, messages, resetConversation, isLoading, onSubmit, onKeyDown, onChange, input,
    }
}
