import React from 'react';
import ReactDOM from 'react-dom/client';
import Bot from "./widget/bot";
import "./index.css"

function initAI(config) {
    config = config || {api_key: "", botId: "",}
    if (!config.api_key) return
    const root = typeof config.root === "string" ? document.querySelector(config.root) : config.root ? config.root : document.getElementById('aitoolkit-widget')
    if (root) ReactDOM.createRoot(root).render(<React.StrictMode><Bot id={config.botId}
                                                                      apiKey={config.api_key}/></React.StrictMode>)
}

window.initAI = initAI
initChatbot(window.aiConfig)
