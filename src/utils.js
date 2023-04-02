import React from "react";
import {Timestamp} from "firebase/firestore";


export function useErrorHandler() {
    //const [error, setError] = React.useState(null);

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
/*export const daysBetween = (startDate, endDate) => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}*/

export const daysFromNow = endDate => daysBetween(Date.now(), endDate)

export function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export function validReferenceNumber(str) {
    if (typeof str != "string") return false // we only process strings!
    const spl = str.split("-")
    for (let i = 0; i < spl.length; i++) {
        if (!isNumeric(spl[i])) return false
    }
    return true
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

export const getFirestampDateString = fs => {
    return fs?.seconds ? (new Date(fs.seconds * 1000)).toLocaleString() : null
}


/**
 * Datetime string in format DD.MM.YYYY HH:MM
 * @param date
 */
export const getDatetimeString = date => {
    if (!date) return null
    date = typeof date === 'string' ? new Date(date) : date
    let h = "" + date.getHours(), m = "" + date.getMinutes()
    if (h.length === 1) h = "0" + h
    if (m.length === 1) m = "0" + m
    return `${h}:${m}, ${getDateString(date)}`
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

export const formatDate = ts => {
    const d = new Date(ts)
    const ye = new Intl.DateTimeFormat('sl', {year: 'numeric'}).format(d);
    const mo = new Intl.DateTimeFormat('sl', {month: '2-digit'}).format(d);
    const da = new Intl.DateTimeFormat('sl', {day: '2-digit'}).format(d);
    return `${da}${mo}.${ye}`
}

const pad = (num, size) => {
    let s = String(num)
    while (s.length < size) s = "0" + s
    return s
}

export const formatTimestamp = ts => {
    const d = new Date(ts)
    const ye = new Intl.DateTimeFormat('sl', {year: 'numeric'}).format(d);
    const mo = new Intl.DateTimeFormat('sl', {month: '2-digit'}).format(d);
    const da = new Intl.DateTimeFormat('sl', {day: '2-digit'}).format(d);
    return `${pad(d.getHours(), 2)}:${pad(d.getMinutes(), 2)}:${pad(d.getSeconds(), 2)} ${da}${mo}.${ye}`
}

export const isMobile = () => {
    return window.outerWidth <= 479
}

export const treatAsUTC = (date) => {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}


export const dateFormatter = millis => {
    if (isNaN(millis) || millis === null) return '';
    const v = new Date(millis);
    if (!(v instanceof Date)) return '';
    const pad = '00';
    const yy = v.getUTCFullYear().toString();
    const mm = (v.getUTCMonth() + 1).toString();
    const dd = v.getUTCDate().toString();
    return `${yy}-${(pad + mm).slice(-2)}-${(pad + dd).slice(-2)}`;
};

export const dateParser = v => {
    // v is a string of "YYYY-MM-DD" format
    const match = /(\d{4})-(\d{2})-(\d{2})/.exec(v);
    if (match === null) return;
    const d = new Date(Date.UTC(match[1], parseInt(match[2], 10) - 1, match[3]));
    if (isNaN(d)) return;
    return d;
};

export const sloDateParser = v => {
    // v is a string of "DD MM YY" format
    const match = /^(\d{1,2})[-.\/](\d{1,2})[-.\/](\d{2,4})$/gm.exec(v);
    if (match === null) return;
    const d = new Date(Date.UTC(match[3], parseInt(match[2], 10) - 1, match[1]));
    if (isNaN(d)) return;
    return d;
};

function comma(address) {
    return address.length > 0 ? ", " : ""
}

export function formatAddress(addressObject) {
    if (!addressObject) return null
    let address = ""
    if (addressObject.address1) address += addressObject.address1
    else if (addressObject.street) {
        address += addressObject.street + " "
        if (addressObject.houseNumber) address += addressObject.houseNumber
    } else if (addressObject.streetAndNumber) address += addressObject.streetAndNumber
    if (addressObject.postCode) address += comma(address) + addressObject.postCode + " "
    if (address && addressObject.city) address += addressObject.city
    if (address && addressObject.country?.name) address += ", " + addressObject.country?.name
    return address
}

// function that gets the next working day
export function getNextWorkingDay(date) {
    const day = date.getDay();
    if (day === 5) {
        date.setDate(date.getDate() + 3);
    } else if (day === 6) {
        date.setDate(date.getDate() + 2);
    } else {
        date.setDate(date.getDate() + 1);
    }
    return date;
}

export function useInterval(callback, delay) {
    const intervalId = React.useRef(null);
    const savedCallback = React.useRef(callback);
    React.useEffect(() => {
        savedCallback.current = callback;
    });
    React.useEffect(() => {
        const tick = () => savedCallback.current();
        if (typeof delay === 'number') {
            intervalId.current = window.setInterval(tick, delay);
            return () => window.clearInterval(intervalId.current);
        }
    }, [delay]);
    return intervalId.current;
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

// gets the right word for the given number - singular, plural, etc.
export function getWord(n, ...words) {
    const one = words[0] || "",
        two = words[1] || one,
        threeOrFour = words[2] || two,
        zeroOrMany = words[3] || threeOrFour

    switch (n) {
        case 1:
            return one
        case 2:
            return two
        case 3:
        case 4:
            return threeOrFour
        default:
            return zeroOrMany
    }
}

export function getWordTranslated(t, n, ...words) {
    return t(getWord(n, ...words))
}

export function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getRandom(...strings) {
    if (strings.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * strings.length);
    return strings[randomIndex];
}

export function messageTime(timestamp) {
    if (!timestamp) return "";
    const now = Timestamp.now();
    const timePassedInSeconds = now.seconds - timestamp.seconds;

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

    const date = timestamp.toDate();
    const hours = String(date.getHours());
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
}
