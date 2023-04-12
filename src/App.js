import React, {useState} from "react";
import {Chat, ChatBubble, useBot} from "./lib";

function App() {
    const [open, setOpen] = useState(true)
    const bot = useBot({
        id: process.env.REACT_APP_BOT_ID,
        enableLocalStorage: true,
        startMessage: "Hi there! Try me out by typing a message bellow. I can answer questions, translate text, and much more."
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
