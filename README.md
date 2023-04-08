# aitoolkit-widget

The aitoolkit-widget is an HTML component that can be easily integrated into any website. It provides a chatbot
interface powered by the AI Toolkit platform ([https://aitoolkit.dev](https://aitoolkit.dev)).

## Getting Started

Before integrating the aitoolkit-widget into your website, you must obtain an API key and Bot ID from the AI Toolkit
website ([https://aitoolkit.dev](https://aitoolkit.dev)).

Once you have your API key and Bot ID, copy the following code inside the <head> tag of your website:

```html

<script src="https://unpkg.com/aitoolkit-widget/dist/style.min.css"></script>
```

And the following code inside the <body> tag of your website:

```html

<div id="root"></div>
<script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/aitoolkit-widget/dist/Widget.bundle.js"></script>
<script>
    const rootElement = document.getElementById('root');
    ReactDOM.render(React.createElement(Widget, {
        apiKey: "<api-key>",
        config: {
            id: "<bot-id>",
            startMessage: "Hi! I'm your personal assistant. How can I help you?",
            enableLocalStorage: true,
        },
        translations: {
            clearChatHistory: "Clear chat history",
            typeMessage: "Type a message...",
        },
    }), rootElement);

    // Open the widget when the page is loaded
    document.addEventListener('DOMContentLoaded', () => {
        if (window.WidgetEvents && window.WidgetEvents.open) {
            window.WidgetEvents.open();
        }
    }, false);
</script>
```

Replace <api-key> and <bot-id> with your actual API key and Bot ID obtained from the AI Toolkit website. You can also
modify any of the configuration options or translations to suit your needs.

And that's it! The aitoolkit-widget should now be displayed on your website and ready to assist your visitors.

## Support

If you have any questions or issues with the aitoolkit-widget, please email us
at [aitoolkit@aleskovacic.com](mailto:aitoolkit@aleskovacic.com) and we'll be happy to help you out. Thanks for using AI
Toolkit!
