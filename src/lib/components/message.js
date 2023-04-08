import {classNames, messageTime} from "../helpers";
import React from "react";

function messagePartsToString(parts, essentials) {
    if (!parts || !parts.map) return ""
    return (
        <>
            {parts.map(p => {
                switch (p.type) {
                    case "text":
                        return p.content
                    default:
                        if (essentials && essentials.hasOwnProperty(p.content?.command)) {
                            const componentFun = essentials[p.content?.command]
                            return componentFun(p.content)
                        }
                        return p.content?.command ? p.content?.command + "[`" + p.content.params?.join(", ") + "`]" : JSON.stringify(p.content)
                }

            })}
        </>
    )
}

export default function Message({item, itemIdx, arr, essentials}) {
    function emptyState() {
        return ((arr.length - 1 === itemIdx) ? (<span><span className="animate-[pulse_1s_0ms_infinite]">.</span><span
                className="animate-[pulse_1s_200ms_infinite]">.</span><span
                className="animate-[pulse_1s_400ms_infinite]">.</span></span>) :
            <span className="text-gray-400">Something went wrong</span>)
    }

    function renderMsg(className) {
        return (
            <div className="flex flex-col gap-y-2 max-width-[100%] overflow-hidden">
                <div className={classNames(className, "flex gap-x-2 items-end overflow-hidden",)}>
                    <div
                        className="whitespace-pre-wrap max-width-[100%] overflow-hidden">{(messagePartsToString(item.message, essentials)) || emptyState()}</div>
                    {item.message && (
                        <span className="text-xs opacity-75 flex-shrink-0">{messageTime(item.createdAt)}</span>)}
                </div>
            </div>
        )
    }

    return (
        <li>
            {item.isAI ? (
                <div className="flex justify-start mr-8 gap-x-2">
                    {renderMsg("bg-gray-100 dark:bg-gray-600 rounded-3xl py-2 px-4 text-sm text-gray-900 dark:text-gray-50", true)}
                </div>
            ) : item.isSystemMessage ? (
                <div className="flex justify-center mx-8">
                    <p className="whitespace-pre-wrap py-2 px-4 text-sm text-gray-700 dark:text-gray-400 text-center">{messagePartsToString(item.message) || emptyState()}</p>
                </div>
            ) : (
                <div className="flex justify-end ml-8">
                    {renderMsg("bg-primary-500 rounded-3xl py-2 px-4 text-sm text-gray-50")}
                </div>
            )}
        </li>
    )
}
