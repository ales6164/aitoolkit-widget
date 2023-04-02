import {InformationCircleIcon, PaperAirplaneIcon} from "@heroicons/react/20/solid";
import React, {useEffect, useRef, useState} from "react";
import {Popover} from "@headlessui/react";
import {useBot} from "./core";
import {defaultPhotos} from "../../consts";
import Spinner from "../spinner";
import {ChatBubbleLeftRightIcon} from "@heroicons/react/24/outline";
import {usePopper} from 'react-popper'
import {classNames, messageTime} from "../../utils";
import {marked} from 'marked';
import hljs from "highlight.js/lib/common";


const CodeRenderer = ({text}) => {
    const renderer = new marked.Renderer();
    renderer.list = (body, ordered, start) => {
        const type = ordered ? 'ol' : 'ul',
            classNames = ordered ? 'list-decimal' : 'list-disc',
            startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
        return '<' + type + startatt + ' class="' + classNames + ' ml-4">\n' + body + '</' + type + '>\n';
    }
    //renderer.listitem = t => `<li>${text}</li>\n`
    renderer.heading = t => t
    renderer.text = t => t

    marked.setOptions({
        highlight: function (code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, {language}).value
        },
        langPrefix: 'hljs language-',
        pedantic: false,
        gfm: false,
        breaks: true,
        sanitize: false,
        smartypants: true,
        xhtml: false
    });

    return <div dangerouslySetInnerHTML={{__html: marked(text, {renderer})}}/>;
};

function messagePartsToString(parts) {
    if (!parts || !parts.map) return ""
    return parts.map(p => p.type === "text" ? p.content : "[]").join("")
}

function MessageView({item, itemIdx, arr, setReferenceElement, setPopperElement, styles, attributes}) {
    function emptyState() {
        return ((arr.length - 1 === itemIdx) ? (<span><span className="animate-[pulse_1s_0ms_infinite]">.</span><span
                className="animate-[pulse_1s_200ms_infinite]">.</span><span
                className="animate-[pulse_1s_400ms_infinite]">.</span></span>) :
            <span className="text-gray-400">Something went wrong</span>)
    }

    function renderMsg(className, isAI = false) {
        let media, thinkingClass = ""
        if (item.media?.length > 0) {
            switch (item.media[0]?.type) {
                case "placeholder": {
                    thinkingClass = "animate-pulse rainbow dark:rainbow-dark border-2"
                    break;
                }
                case "youtubeEmbed": {
                    media = <iframe
                        src={item.media[0].url}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-[512px] h-auto max-h-[512px] max-w-[70vw] shadow-lg shadow-primary-800 rounded-md mb-1"
                    />
                    break;
                }
                case "imageUrl":
                case "generatedImage":
                case "generatedImageMidjourney":
                case "generatedImageStability": {
                    media = <img
                        src={item.media[0].url}
                        className="w-[512px] h-auto max-h-[512px] max-w-[70vw] object-fit shadow-lg shadow-primary-800 rounded-md mb-1"
                        alt=""
                    />
                    break;
                }
            }
        }

        return (
            <div className="flex flex-col gap-y-2">
                <div className={classNames(
                    thinkingClass,
                    className,
                    "flex gap-x-2 items-end overflow-hidden",
                )}>
                    <div className="whitespace-pre-wrap">{isAI ? (item.message ?
                        <CodeRenderer
                            text={messagePartsToString(item.message)}/> : emptyState()) : messagePartsToString(item.message) || emptyState()}</div>
                    {item.message && (
                        <span className="text-xs opacity-75">{messageTime(item.createdAt)}</span>
                    )}
                </div>
                {media}
            </div>
        )
    }

    return (<li>
        {item.isAI ? (<div className="flex justify-start mr-8 gap-x-2">
            {/*<div className="relative flex-shrink-0">
                <img
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 ring-0 z-0"
                    src={item.isAI ? botData.imageUrl : defaultPhotos[2]}
                    alt=""
                />
            </div>*/}
            {renderMsg("bg-gray-100 dark:bg-gray-600 rounded-3xl py-2 px-4 text-sm text-gray-900 dark:text-gray-50", true)}
            {item.context && item.context.length > 0 && (<Popover>
                <Popover.Button as="div" className="-pt-px" ref={setReferenceElement}>
                    <button
                        type="button"
                        className="ml-1 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-700 text-gray-200 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-200 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <InformationCircleIcon className="h-6 w-6" aria-hidden="true"/>
                        <span className="sr-only">Add</span>
                    </button>
                </Popover.Button>
                <Popover.Panel
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}>
                    <div
                        className="bg-gray-700 text-gray-100 px-4 py-3 border border-gray-200 rounded-lg shadow-lg mx-8">
                        <p className="font-semibold text-sm uppercase text-gray-400">Context for this
                            answer</p>
                        <ul className="mt-0.5 -space-y-1">
                            {item.context.map((c, idx) => (<li key={idx}
                                                               className="-mx-2 px-2 py-1 text-sm rounded-lg hover:bg-gray-900 cursor-default">
                                {c}
                            </li>))}
                        </ul>
                    </div>
                </Popover.Panel>
            </Popover>)}
        </div>) : item.isSystemMessage ? (
            <div className="flex justify-center mx-8">
                <p className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-700 rounded-3xl py-2 px-4 text-sm text-gray-700 dark:text-gray-400 text-center">{messagePartsToString(item.message) || emptyState()}</p>
            </div>
        ) : (<div className="flex justify-end ml-8">
            {renderMsg("bg-primary-500 rounded-3xl py-2 px-4 text-sm text-gray-50")}
        </div>)}

    </li>)
}

export function ConversationViewLayout({
                                           showHeader = true,
                                           botData,
                                           isLoading,
                                           scrollTargetRef,
                                           messages,
                                           onSubmit,
                                           inputRef,
                                           onKeyDown,
                                           setChatMessage,
                                           chatMessage
                                       }) {
    const [referenceElement, setReferenceElement] = useState()
    const [popperElement, setPopperElement] = useState()
    const [normalHeight, setNormalHeight] = useState(0)
    const {styles, attributes} = usePopper(referenceElement, popperElement)

    const resizeTextArea = () => {
        if (inputRef.current) {
            let oneRowHeight = normalHeight
            if (!oneRowHeight && inputRef.current.scrollHeight > 0) {
                oneRowHeight = inputRef.current.scrollHeight
                setNormalHeight(oneRowHeight)
            }
            inputRef.current.style.height = "auto";

            if (inputRef.current.scrollHeight > oneRowHeight * 3) {
                inputRef.current.style.height = (oneRowHeight * 3) + "px";
            } else {
                inputRef.current.style.height = inputRef.current.scrollHeight + "px";
            }
        }
    };

    useEffect(resizeTextArea, [chatMessage, inputRef.current]);

    return (<div
        className="relative w-full h-full bg-white dark:bg-gray-700 text-left items-stretch flex flex-col">
        {isLoading ? (<Spinner className="text-gray-900" big/>) : !botData?.id ? (
            <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                    <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400"/>
                    <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-50">Not found</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Bot is unavailable or it does not
                        exist.</p>
                </div>
            </div>) : (<>
            {showHeader && (
                <div
                    className="sticky top-0 bg-white dark:bg-gray-700 z-10 border-b border-gray-100 dark:border-gray-600 px-4 py-3">
                    <div className="flex items-center">
                        <div>
                            <img
                                className="inline-block h-9 w-9 rounded-full"
                                src={botData.imageUrl || defaultPhotos[2]}
                                alt=""
                            />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200"> {botData?.name || "Chatbot"}</p>
                            <p className="text-xs font-medium text-gray-400">Active</p>
                        </div>
                    </div>
                </div>
            )}
            <section ref={scrollTargetRef}
                     className="pt-4 pb-4 mb-1 h-full items-stretch flex flex-col grow overflow-y-auto overflow-x-hidden max-w-full">
                <div className="flow-root px-4">
                    <ul role="list" className="space-y-4">
                        {messages.map((item, itemIdx, arr) => <MessageView key={itemIdx} item={item}
                                                                           showHeader={showHeader}
                                                                           itemIdx={itemIdx}
                                                                           arr={arr} styles={styles}
                                                                           attributes={attributes}
                                                                           botData={botData}
                                                                           setReferenceElement={setReferenceElement}
                                                                           setPopperElement={setPopperElement}/>)}
                    </ul>
                </div>
                <div className="grow"/>
            </section>

            {onSubmit && (/* <div className="absolute left-0 bottom-0 right-0">*/
                <div className="px-4 pt-1.5 pb-2 sm:pb-3 lg:pb-4 bg-white dark:bg-gray-700">
                    <form className="min-w-0 flex flex-1 items-center" onSubmit={onSubmit}>
                        <div className="grow">
                            <label htmlFor="message" className="sr-only">
                                Message
                            </label>
                            <textarea
                                ref={inputRef}
                                id="message"
                                onKeyDown={onKeyDown}
                                rows={1}
                                onChange={e => setChatMessage(e.target.value)}
                                className="resize-none overflow-y-auto block w-full bg-gray-100 dark:bg-gray-600 rounded-2xl border-0 shadow-sm outline-none focus:ring-0 sm:text-sm text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400"
                                placeholder="Type a message..."
                                value={chatMessage}
                                autoComplete={"off"}
                            />
                        </div>
                        <div className="ml-4">
                            <button
                                type="submit"
                                className="inline-flex justify-center items-center rounded-full border-0 p-1.5 text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            >
                                <PaperAirplaneIcon className="h-5 w-5"
                                                   aria-hidden="true"/>
                            </button>
                        </div>
                    </form>
                </div>
                /*</div>*/)}
        </>)}
    </div>)
}

export default function ConversationView({visible, chatId, id, page}) {
    const [isLoading, setIsLoading] = useState(true)
    const {data, isTyping, messages, sendMessage} = useBot(id, chatId)
    const [chatMessage, setChatMessage] = useState("")
    const inputRef = useRef();
    const scrollTargetRef = useRef();

    useEffect(() => {
        visible && setTimeout(() => inputRef.current && inputRef.current.focus(), 250)
    }, [visible])

    useEffect(() => {
        if (data !== false) setIsLoading(false)
    }, [data])

    useEffect(() => {
        scrollTo()
    }, [messages, isTyping])

    useEffect(() => {
        !isTyping && inputRef.current && inputRef.current.focus()
    }, [isTyping])

    function scrollTo() {
        scrollTargetRef.current && scrollTargetRef.current.scrollTo(0, scrollTargetRef.current.scrollHeight);
    }

    function onKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            if (!e.repeat) {
                onSubmit()
            }
            e.preventDefault(); // Prevents the addition of a new line in the text field
        }
    }

    function onSubmit(e) {
        e && e.preventDefault()

        inputRef.current && inputRef.current.focus()

        if (isTyping || !chatMessage) return

        sendMessage(chatMessage)
        setChatMessage("")
    }


    return <ConversationViewLayout
        botData={data}
        isLoading={isLoading}
        page={page}
        scrollTargetRef={scrollTargetRef}
        messages={messages}
        onSubmit={onSubmit}
        inputRef={inputRef}
        onKeyDown={onKeyDown}
        setChatMessage={setChatMessage}
        chatMessage={chatMessage}
    />
}
