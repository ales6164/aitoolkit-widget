import Chat from "./components/chat";
import ChatBubble from "./components/chatBubble";
import useBot from "./hooks/useBot";
import React, {useEffect, useState} from "react";

export default function Widget({apiKey, config, translations, essentials}) {
    const [open, setOpen] = useState(false)
    const bot = useBot({headers: {"Authorization": `Api-Key ${apiKey}`}, ...config})

    useEffect(() => {
        if (window) {
            window.WidgetEvents = {
                open: () => setOpen(true),
                close: () => setOpen(false),
                toggle: () => setOpen(!open),
            }
        }
    }, [])

    return (
        <ChatBubble light open={open} setOpen={setOpen}>
            <Chat bot={bot} showHeader t={translations || {}} essentials={essentials}/>
        </ChatBubble>
    );
}
