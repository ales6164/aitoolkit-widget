export function partMessage(content, type = "text") {
    return {
        type,
        content
    }
}

export function convertMessage(data) {
    if (!data) return null
    return {
        createdAt: data.createdAt || new Date(),
        author: data.role,
        message: data.parts || partMessage(data.content),
        media: data.media,
        isAI: data.role === "assistant",
        isSystemMessage: data.role === "system",
        context: data.context || null
    }
}

export const firestampToDate = fs => {
    return fs?._seconds ? (new Date(fs._seconds * 1000)) : null
}

export function useErrorHandler() {
    function handleError(e) {
        catchErrors(e, window.alert);
    }

    return handleError;
}

export function catchErrors(error, cb) {
    error = error || {}
    console.log(error);
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.body);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.data?.message) cb && cb("Error: " + error.response.data.message)
        else if (error.response.data?.error) cb && cb("Error: " + error.response.data.error)
        else cb && cb("An error occurred.")
    } else if (error.data) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.data);
        console.log(error.status);
        console.log(error.headers);
        if (error.data?.message) cb && cb("Error: " + error.data.message)
        else if (error.data?.error) cb && cb("Error: " + error.data.error)
        else cb && cb("An error occurred.")
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        cb && cb("An error occurred.")
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        if (error.message) cb && cb("Error: " + error.message)
        else cb && cb("An error occurred.")
    }
    console.log(error.config);
    return false
}

export const daysBetween = (startDate, endDate) => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return Math.floor((endDate - startDate) / millisecondsPerDay).toFixed(0);
}

export function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

/**
 * Date string in format DD.MM.YYYY
 * @param date
 */
export const getDateString = date => {
    if (!date) return null
    date = typeof date === 'string' ? new Date(date) : date
    let m = "" + (date.getMonth() + 1).toString(), d = "" + date.getDate()
    if (m.length === 1) m = "0" + m
    if (d.length === 1) d = "0" + d
    return `${d}.${m}.${date.getFullYear()}`
}


export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const decimal = ",", thousands = "."
export const formatMoney = (amount, forgetDecimals = false) => {
    try {
        let decimalCount = 2
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        const decs = Math.abs(amount - i)

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (!forgetDecimals || (forgetDecimals && decs !== 0) ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
}


export const dateParser = v => {
    // v is a string of "YYYY-MM-DD" format
    const match = /(\d{4})-(\d{2})-(\d{2})/.exec(v);
    if (match === null) return;
    const d = new Date(Date.UTC(match[1], parseInt(match[2], 10) - 1, match[3]));
    if (isNaN(d)) return;
    return d;
};

export function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function messageTime(timestamp) {
    if (!timestamp?.getTime) return "";
    const timePassedInSeconds = (Date.now() - timestamp.getTime()) / 1000;

    if (timePassedInSeconds < 5) {
        return 'Now';
    }

    if (timePassedInSeconds < 60) {
        return `${(Math.floor(timePassedInSeconds / 5) * 5).toFixed(0)}s`;
    }

    const timePassedInMinutes = Math.floor(timePassedInSeconds / 60);

    if (timePassedInMinutes < 60) {
        return `${timePassedInMinutes.toFixed(0)}m`;
    }

    const date = new Date(timestamp.getTime());
    const hours = String(date.getHours());
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
}


export function serializeQuery(params, prefix) {
    if (!params) return ""
    const query = Object.keys(params).map((key) => {
        const value = params[key];
        if (params.constructor === Array) key = `${prefix}[${key}]`;
        else if (params.constructor === Object) key = (prefix ? `${prefix}[${key}]` : key);
        if (typeof value === 'object') return serializeQuery(value, key);
        else return `${key}=${encodeURIComponent(value)}`;
    })
    return [].concat.apply([], query).join('&');
}
