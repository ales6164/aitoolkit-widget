import React, {useState} from "react";
import {Chat, ChatBubble, useBot} from "./lib";

const products = [
    {
        id: 1,
        name: 'Vaza',
        options: 'Kristal',
        href: '#',
        imageSrc: 'https://storage.googleapis.com/chat-gpt-374521.appspot.com/stable-diffusion%2F6689816d-f19d-4ee1-88d0-494080dc7457.png',
        description: 'Najboljša izbira za ...',
        imageAlt: 'Z ritmičnim',
        price: '120,90 €',
    },
    {
        id: 1,
        name: 'Vaza',
        options: 'Kristal',
        href: '#',
        imageSrc: 'https://storage.googleapis.com/chat-gpt-374521.appspot.com/stable-diffusion%2F0f611916-43e4-4380-bbd3-261e513368c0.png',
        description: 'Z ritmičnim in ...',
        imageAlt: 'Z ritmičnim',
        price: '198,90 €',
    },
    {
        id: 1,
        name: 'Vaza',
        options: 'Kristal',
        href: '#',
        imageSrc: 'https://storage.googleapis.com/chat-gpt-374521.appspot.com/stable-diffusion%2F0f611916-43e4-4380-bbd3-261e513368c0.png',
        description: 'Z ritmičnim',
        imageAlt: 'Z ritmičnim',
        price: '198,90 €',
    },
    {
        id: 1,
        name: 'Vaza',
        options: 'Kristal',
        href: '#',
        imageSrc: 'https://storage.googleapis.com/chat-gpt-374521.appspot.com/stable-diffusion%2F0f611916-43e4-4380-bbd3-261e513368c0.png',
        description: 'Z ritmičnim',
        imageAlt: 'Z ritmičnim',
        price: '198,90 €',
    },
    // More products...
]

function ExampleProduct(item) {
    console.log("EXAMPLE PRODUCT", item)

    return (
        <div className="overflow-x-auto max-w-[100%]">
            <div className="my-2 flex gap-x-4 gap-x-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="min-w-[200px] group relative flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-700"
                    >
                        <div
                            className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-48">
                            <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                            />
                        </div>
                        <div className="flex flex-1 flex-col space-y-2 p-4">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                <a href={product.href}>
                                    <span aria-hidden="true" className="absolute inset-0"/>
                                    {product.name}
                                </a>
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-300">{product.description}</p>
                            <div className="flex flex-1 flex-col justify-end">
                                <p className="text-sm italic text-gray-500 dark:text-gray-400">{product.options}</p>
                                <p className="text-base font-medium text-gray-900 dark:text-gray-300">{product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const essentials = {
    "findProducts": (props) => <ExampleProduct item={props}/>
}

function App() {
    const [open, setOpen] = useState(true)
    const bot = useBot({
        id: "1xrBdjIOf9RVGEcqq6LR",
        customCommands: [
            {
                command: "findProducts",
                input: "Imaš kakšno idejo kaj naj kupim za rojstnodnevno darilo svoji tašči?",
                output: "Seveda, lahko razmislimo o nekaj darilih, ki bi jih vaša tašča morda cenila. Kaj pa če bi ji kupili ročno izdelano kristalno vazo ter šopek njenih najlubših rož. Našel sem eno vazo iz naše ponudbe:\n[`10022`]\nČe želite več možnosti, mi lahko poveste več o njenih interesih in hobijih, da bom lahko bolje prilagodil predloge.",
            }
        ]
    })

    return (
        <div className="h-full dark bg-gray-900">
            <ChatBubble light open={open} setOpen={setOpen}>
                <Chat bot={bot} showHeader essentials={essentials}/>
            </ChatBubble>
        </div>
    );
}

export default App;
