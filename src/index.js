import React from 'react';
import ReactDOM from 'react-dom/client';
import Bot from "./widget/bot";
import "./index.css"

function initAI(config) {
    config = config || {apiKey: "", botId: "",}
    if (!config.apiKey) return
    const root = typeof config.root === "string" ? document.querySelector(config.root) : config.root ? config.root : document.getElementById('aitoolkit-widget')
    if (root) ReactDOM.createRoot(root).render(<React.StrictMode><Bot id={config.botId}
                                                                      apiKey={config.apiKey}/></React.StrictMode>)
}

window.initAI = initAI
initAI(window.aiConfig)
