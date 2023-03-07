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
    var apiKey = "<api-key>"
    var botId = "<bot-id>"
    !function (e, t, i) {
        var a = document.querySelector(i).attachShadow({mode: "open"}), d = document.createElement("link");
        d.rel = "stylesheet", d.href = "https://cdn.jsdelivr.net/npm/aitoolkit-widget@0.1.0/build/static/css/main.f3c2ae30.css";
        let n = document.createElement("section");
        n.appendChild(d.cloneNode(!0)), a.appendChild(n);
        var l = document.createElement("script");
        l.src = "https://cdn.jsdelivr.net/npm/aitoolkit-widget@0.1.0/build/static/js/main.2b42d6ab.js", n.appendChild(l);
        var o = document.createElement("div");
        o.id = "aitoolkit-widget-root", n.appendChild(o), window.initChatbotConfig = {api_key: e, botId: t, root: o}
    }(apiKey, botId, "#aitoolkit-widget");
</script>
```

Replace <api-key> and <bot-id> with your actual API key and Bot ID obtained from the AI Toolkit website. You can also
change the value of the root parameter to target a different HTML element if needed.

This code will automatically add the necessary link and script tags to the header of your website when the function is
called. It will also set the window.aiConfig variable with the provided configuration object, which will initialize the
aitoolkit-widget and display it on your website.

And that's it! The aitoolkit-widget should now be displayed on your website and ready to assist your visitors.

## Support

If you have any questions or issues with the aitoolkit-widget, please email us
at [aitoolkit@aleskovacic.com](mailto:aitoolkit@aleskovacic.com) and we'll be happy to help you out. Thanks for using AI
Toolkit!
