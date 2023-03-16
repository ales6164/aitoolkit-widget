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
    var apiKey = ""
    var botId = ""
    !function (e, t, i) {
        var d = document.querySelector("#aitoolkit-widget").attachShadow({mode: "open"}),
                n = document.createElement("link");
        n.rel = "stylesheet", n.href = "https://cdn.jsdelivr.net/npm/aitoolkit-widget@0.1.2/build/static/css/main.min.css";
        let o = document.createElement("section");
        o.appendChild(n.cloneNode(!0)), d.appendChild(o);
        var a = document.createElement("script");
        a.src = "https://cdn.jsdelivr.net/npm/aitoolkit-widget@0.1.2/build/static/js/main.min.js", o.appendChild(a);
        var c = document.createElement("div");
        c.id = "aitoolkit-widget-root", o.appendChild(c), window.aiConfig = {apiKey: e, botId: t, root: c}
    }(apiKey, botId)
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
