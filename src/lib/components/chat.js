import {PaperAirplaneIcon} from "@heroicons/react/20/solid";
import React, {useEffect, useState} from "react";
import {classNames} from "../utils";
import Spinner from "../spinner";
import {ChatBubbleLeftRightIcon} from "@heroicons/react/24/outline";
import {Message} from "./message";
import ScrollToBottom from 'react-scroll-to-bottom';


export function Chat({
                         bot,
                         className,
                         showHeader = true,
                         essentials
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
                        className="sticky top-0 bg-white dark:bg-gray-700 z-10 border-b border-gray-100 dark:border-gray-600 px-4 py-3">
                        <div className="flex items-center">
                            {bot?.data.imageUrl && (<div>
                                <img
                                    className="inline-block h-9 w-9 rounded-full"
                                    src={bot?.data.imageUrl}
                                    alt=""
                                />
                            </div>)}
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-200"> {bot?.data?.name || "Chatbot"}</p>
                                <p className="text-xs font-medium text-gray-400">Active</p>
                            </div>
                        </div>
                    </div>)}

                    <ScrollToBottom
                        className="pt-4 pb-4 mb-1 h-full items-stretch flex flex-col grow overflow-y-auto overflow-x-hidden max-w-full">
                        <div className="flow-root px-4">
                            <ul role="list" className="space-y-4">
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

                    {bot?.onSubmit && (<div className="px-4 pt-1.5 pb-2 sm:pb-3 lg:pb-4 bg-white dark:bg-gray-700">
                        <form className="min-w-0 flex flex-1 items-center" onSubmit={bot.onSubmit}>
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
                                    placeholder="Type a message..."
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
                    </div>)}
                </>
            )}
        </div>
    )
}

