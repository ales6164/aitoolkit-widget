import React, {useState} from "react";
import {Chat, ChatBubble, useBot} from "./lib";

function App() {
    const [open, setOpen] = useState(true)
    const bot = useBot({
        id: "<bot-id>",
        enableLocalStorage: true,
    })

    return (
        <div className="h-full dark bg-gray-900">
            <ChatBubble light open={open} setOpen={setOpen}>
                <Chat bot={bot} showHeader/>
            </ChatBubble>
        </div>
    );
}

export default App;
