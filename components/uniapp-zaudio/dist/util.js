"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = exports.throttle = exports.formatSeconds = void 0;
function formatSeconds(seconds) {
    var result = typeof seconds === "string" ? parseFloat(seconds) : seconds;
    if (isNaN(result))
        return "";
    let h = Math.floor(result / 3600) < 10
        ? "0" + Math.floor(result / 3600)
        : Math.floor(result / 3600);
    let m = Math.floor((result / 60) % 60) < 10
        ? "0" + Math.floor((result / 60) % 60)
        : Math.floor((result / 60) % 60) + h * 60;
    let s = Math.floor(result % 60) < 10
        ? "0" + Math.floor(result % 60)
        : Math.floor(result % 60);
    return `${m}:${s}`;
}
exports.formatSeconds = formatSeconds;
function throttle(fn, wait) {
    let previous = 0;
    return function (...arg) {
        let context = this;
        let now = Date.now();
        //每隔一段时间执行一次；
        if (now - previous > wait) {
            fn.apply(context, arg);
            previous = now;
        }
    };
}
exports.throttle = throttle;
class EventBus {
    constructor() {
        this._events = new Map();
    }
    on(event, action, fn) {
        let arr = this._events.get(event);
        let hasAction = arr
            ? arr.findIndex((i) => i.action == action)
            : -1;
        if (hasAction > -1) {
            return;
        }
        this._events.set(event, [
            ...(this._events.get(event) || []),
            {
                action,
                fn,
            },
        ]);
    }
    has(event) {
        return this._events.has(event);
    }
    emit(event, data) {
        if (!this.has(event)) {
            return;
        }
        let arr = this._events.get(event);
        arr.forEach((i) => {
            i.fn(data);
        });
    }
    off(event, action) {
        if (!this.has(event)) {
            return;
        }
        let arr = this._events.get(event);
        let newdata = arr.filter((i) => i.action !== action);
        this._events.set(event, [...newdata]);
    }
}
exports.EventBus = EventBus;
