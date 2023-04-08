import {EllipsisVerticalIcon, PaperAirplaneIcon} from "@heroicons/react/20/solid";
import React, {Fragment, useEffect, useState} from "react";
import {classNames} from "../helpers";
import Spinner from "../spinner";
import {ChatBubbleLeftRightIcon} from "@heroicons/react/24/outline";
import Message from "./message";
import ScrollToBottom from 'react-scroll-to-bottom';
import {Menu, Transition} from '@headlessui/react'

export default function Chat({
                                 bot,
                                 className,
                                 showHeader = true,
                                 readOnly = false,
                                 essentials,
                                 t = {}
                             }) {
    const [normalHeight, setNormalHeight] = useState(0)

    const resizeTextArea = () => {
        if (bot?.input.current) {
            let oneRowHeight = normalHeight
            if (!oneRowHeight && bot.input.current.scrollHeight > 0) {
                oneRowHeight = bot.input.current.scrollHeight
                setNormalHeight(oneRowHeight)
            }
            bot.input.current.style.height = "auto";

            if (bot.input.current.scrollHeight > oneRowHeight * 3) {
                bot.input.current.style.height = (oneRowHeight * 3) + "px";
            } else {
                bot.input.current.style.height = bot.input.current.scrollHeight + "px";
            }
        }
    };

    useEffect(resizeTextArea, [bot?.input.current?.value, bot?.input.current]);

    function onClearChatHistory() {
        bot.resetConversation()
    }

    return (
        <div
            className={classNames("relative w-full h-full bg-white dark:bg-gray-700 text-left items-stretch flex flex-col", className)}>
            {bot?.isLoading ? (
                <Spinner className="text-gray-900" big/>
            ) : !bot?.data?.id ? (
                <div className="flex h-full w-full items-center justify-center">
                    <div className="text-center">
                        <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400"/>
                        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-50">Not found</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Bot is unavailable or it does not
                            exist.</p>
                    </div>
                </div>
            ) : (
                <>
                    {showHeader && (<div
                        className="sticky top-0 flex flex-shrink-0 items-center justify-between bg-white dark:bg-gray-700 z-10 border-b border-gray-100 dark:border-gray-600 px-4 py-3">
                        <div className="flex flex-1 items-center">
                            {bot?.data.imageUrl && (
                                <div className="relative inline-block">
                                    <img
                                        className="h-9 w-9 rounded-full"
                                        src={bot?.data.imageUrl}
                                        alt=""
                                    />
                                    <span
                                        className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white"/>
                                </div>
                            )}
                            <div className="ml-3">
                                <p className="text-md font-medium text-gray-700 dark:text-gray-200"> {bot?.data?.name || "Chatbot"}</p>
                                {/*<p className="text-xs font-medium text-gray-400">Active</p>*/}
                            </div>
                        </div>
                        {Menu && Menu.Button && (
                            <Menu as="div" className="flex-shrink-0 pr-2">
                                <Menu.Button
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-700 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                                    <span className="sr-only">Open options</span>
                                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true"/>
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        className="absolute right-10 top-3 z-10 mx-3 mt-1 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white dark:bg-gray-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({active}) => (
                                                    <a
                                                        href="#"
                                                        onClick={onClearChatHistory}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 dark:bg-gray-500 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-white',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        {t.clearChatHistory || "Clear chat history"}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        )}
                    </div>)}

                    <ScrollToBottom
                        className="mb-1 h-full items-stretch flex flex-col grow overflow-y-auto overflow-x-hidden max-w-full">
                        <div className="flow-root px-4">
                            <ul role="list" className="pt-4 pb-4 space-y-4">
                                {bot?.messages.map((item, itemIdx, arr) => (
                                    <Message key={itemIdx} item={item}
                                             itemIdx={itemIdx}
                                             arr={arr}
                                             essentials={essentials}/>
                                ))}
                            </ul>
                        </div>
                        <div className="grow"/>
                    </ScrollToBottom>

                    {!readOnly && (<div className="px-4 pt-1.5 pb-2 sm:pb-3 lg:pb-4 bg-white dark:bg-gray-700">
                        <form className="min-w-0 flex flex-1 items-center" onSubmit={bot?.onSubmit}>
                            <div className="grow">
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    ref={bot?.input}
                                    id="message"
                                    onKeyDown={bot?.onKeyDown}
                                    rows={1}
                                    className="resize-none overflow-y-auto block w-full bg-gray-100 dark:bg-gray-600 rounded-2xl border-0 shadow-sm outline-none focus:ring-0 sm:text-sm text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400"
                                    placeholder={t.typeMessage || "Type a message..."}
                                    autoComplete={"off"}
                                />
                            </div>
                            <div className="ml-4">
                                <button
                                    type="submit"
                                    disabled={bot?.isTyping}
                                    className="inline-flex justify-center items-center rounded-full border-0 p-1.5 text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:text-gray-500"
                                >
                                    <PaperAirplaneIcon className="h-5 w-5"
                                                       aria-hidden="true"/>
                                </button>
                            </div>
                        </form>
                    </div>)}
                </>
            )}
        </div>
    )
}

