import {ChatBubbleOvalLeftIcon} from "@heroicons/react/20/solid";
import {Transition} from "@headlessui/react";
import React, {Fragment, useState} from "react";
import ConversationView from "./conversationView";
import {classNames} from "../utils";


export default function Bot({id, light}) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="fixed right-4 bottom-4 lg:right-10 lg:bottom-12 flex items-center justify-center">
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={classNames(
                        "z-10 inline-flex items-center rounded-full border border-transparent p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2",
                        light ? "bg-primary-500 text-white hover:bg-primary-600 focus:bg-primary-500 shadow-primary-500" : "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-800"
                    )}
                >
                    <ChatBubbleOvalLeftIcon className="h-6 w-6" aria-hidden="true"/>
                </button>
            </div>

            <Transition appear show={open} as={Fragment}>
                <div className="relative z-10">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed"/>
                    </Transition.Child>

                    <div
                        className="fixed top-0 left-0 right-0 bottom-20 lg:top-auto lg:left-auto lg:right-8 lg:bottom-28 lg:w-full lg:max-w-md lg:h-[600px] lg:max-h-[70vh]">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className="w-screen lg:w-full h-full transform overflow-hidden rounded-b-2xl lg:rounded-2xl bg-white text-left items-stretch shadow-lg transition-all flex flex-col border-2 lg:border border-gray-800">
                                <ConversationView visible={open} id={id}/>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Transition>
        </>
    )
}
