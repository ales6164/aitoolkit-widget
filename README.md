# aitoolkit-widget

The aitoolkit-widget is an HTML component that can be easily integrated into any website. It provides a chatbot
interface powered by the AI Toolkit platform ([https://aitoolkit.dev](https://aitoolkit.dev)).

## Getting Started

Before integrating the aitoolkit-widget into your website, you must obtain an API key and Bot ID from the AI Toolkit
website ([https://aitoolkit.dev](https://aitoolkit.dev)).

Once you have your API key and Bot ID, copy the following code into the body of your website:

```html

<div id="aitoolkit-widget"></div>
<script>
    (function (api_key, botId) {
        window.initChatbotConfig = {api_key, botId};
        var head = document.head || document.getElementsByTagName('head')[0];
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://cdn.jsdelivr.net/npm/aitoolkit-widget@0.1.0/build/static/css/main.f3c2ae30.css';
        head.appendChild(cssLink);
        var jsScript = document.createElement('script');
        jsScript.src = 'https://cdn.jsdelivr.net/npm/aitoolkit-widget@0.1.0/build/static/js/main.2b42d6ab.js';
        head.appendChild(jsScript);
    })('<api-key>', '<bot-id>')
</script>
```

Replace <api-key> and <bot-id> with your actual API key and Bot ID obtained from the AI Toolkit website. You can also
change the value of the root parameter to target a different HTML element if needed.

This code will automatically add the necessary link and script tags to the header of your website when the function is
called. It will also set the window.initChatbotConfig variable with the provided configuration object, which will
initialize the aitoolkit-widget and display it on your website.

And that's it! The aitoolkit-widget should now be displayed on your website and ready to assist your visitors.

## Support

If you have any questions or issues with the aitoolkit-widget, please email us at [aitoolkit@aleskovacic.com](mailto:aitoolkit@aleskovacic.com) and we'll be happy to help you out. Thanks for using AI Toolkit!
