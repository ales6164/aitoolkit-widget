import React, {useEffect, useRef, useState} from "react";
import {ROLE, useBot} from "./core";

export default function Bot({id, apiKey}) {
    const {botData, isTyping, messages, sendMessage} = useBot(id, apiKey)
    const [open, setOpen] = useState(false)
    const botWindow = useRef()
    const inputRef = useRef();
    const scrollTargetRef = useRef();

    const [input, setInput] = useState("")

    useEffect(() => {
        document.addEventListener("click", e => {
            if (open && e.target !== botWindow.current && !botWindow.current?.contains(e.target)) setOpen(false)
        })
    }, [])

    useEffect(() => {
        open && setTimeout(focus, 100)
    }, [open])

    useEffect(() => {
        scrollTo()
    }, [messages, isTyping])

    useEffect(() => {
        !isTyping && focus()
    }, [isTyping])

    function onSubmit(e) {
        e.preventDefault()

        focus()

        if (sendMessage(input)) setInput("")
    }

    function focus() {
        inputRef.current && inputRef.current.focus()
    }

    function scrollTo() {
        scrollTargetRef.current && scrollTargetRef.current.scrollTo(0, scrollTargetRef.current.scrollHeight);
    }

    function renderMsg(msg, i, arr) {
        switch (msg.role) {
            case ROLE.SYSTEM:
                return (<div className="flex justify-start">
                    <p className="bg-red-100 rounded-md py-2 px-4 text-sm text-gray-900 border border-red-200">{msg.content}</p>
                </div>)
            case ROLE.ASSISTANT:
                return (<div className="flex justify-start mr-8">
                    <div className="relative flex-shrink-0">
                        <img
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400"
                            src={msg.imageUrl || "https://picsum.photos/id/436/150/150.jpg"} alt=""/>
                    </div>
                    <p className="ml-2 bg-gray-100 rounded-md py-2 px-4 text-sm text-gray-900 border border-gray-200">{msg.content || ((arr.length - 1 === i) ? (
                        <span className="">
                                        <span className="animate-[pulse_1s_0ms_infinite]">.</span>
                                        <span className="animate-[pulse_1s_200ms_infinite]">.</span>
                                        <span className="animate-[pulse_1s_400ms_infinite]">.</span>
                                    </span>) : <span className="text-gray-400">Something went wrong</span>)}</p>
                </div>)
            case ROLE.USER:
                return (<div className="flex justify-end ml-8">
                    <p className="bg-primary-600 rounded-md py-2 px-4 text-sm text-gray-50">{msg.content}</p>
                </div>)
        }
    }

    return (<div className="" ref={botWindow}>
        <button onClick={() => setOpen(!open)} type="button"
                className="fixed right-4 bottom-4 lg:right-10 lg:bottom-12 z-10 inline-flex items-center rounded-full border border-transparent p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary-500 text-white hover:bg-primary-600 focus:bg-primary-500 shadow-primary-500">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd"
                      d="M2 10c0-3.967 3.69-7 8-7 4.31 0 8 3.033 8 7s-3.69 7-8 7a9.165 9.165 0 01-1.504-.123 5.976 5.976 0 01-3.935 1.107.75.75 0 01-.584-1.143 3.478 3.478 0 00.522-1.756C2.979 13.825 2 12.025 2 10z"
                      clipRule="evenodd"/>
            </svg>
        </button>
        <div
            className={"bg-gray-50 shadow-xl flex-col overflow-hidden rounded-2xl fixed top-0 left-0 right-0 bottom-20 lg:border lg:top-auto lg:left-auto lg:right-8 lg:bottom-28 lg:w-full lg:max-w-md lg:h-[600px] lg:max-h-[70vh] " + (open ? "flex" : "hidden")}>
            <div ref={scrollTargetRef}
                 className="grow items-stretch flow-root overflow-y-auto overflow-x-hidden space-y-4 pb-4">
                <div
                    className="sticky top-0 w-full z-10 flex-shrink-0 flex items-center shadow-sm backdrop-blur-sm bg-white/[0.6] text-gray-900 px-4 py-3 text-lg font-medium leading-6">
                    <span>{botData?.name}</span>
                </div>
                {messages.map((t1, t2, t3) => (<div key={t1?.id || t2} className="mx-4">{renderMsg(t1, t2, t3)}</div>))}
            </div>
            <form onSubmit={onSubmit}
                  className="bg-gray-100 flex-shrink-0 p-4 min-w-0 flex items-center border-t border-gray-200">
                <input
                    ref={inputRef}
                    className="grow block w-full rounded-md text-gray-900 border-gray-300 shadow-sm focus:border-primary-700 focus:ring-primary-700 sm:text-sm"
                    type="text" placeholder="Write a message" value={input}
                    onChange={e => setInput(e.target.value)}/>
                <button type="submit"
                        className="ml-4 inline-flex items-center rounded-full border border-transparent bg-primary-500 p-1.5 text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                         aria-hidden="true" className="h-5 w-5">
                        <path
                            d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z"/>
                    </svg>
                </button>
            </form>
        </div>
    </div>)
}
