! function e(t, o, n) {
    function i(a, s) {
        if (!o[a]) {
            if (!t[a]) {
                var l = "function" == typeof require && require;
                if (!s && l) return l(a, !0);
                if (r) return r(a, !0);
                throw new Error("Cannot find module '" + a + "'")
            }
            var c = o[a] = {
                exports: {}
            };
            t[a][0].call(c.exports, function(e) {
                var o = t[a][1][e];
                return i(o ? o : e)
            }, c, c.exports, e, t, o, n)
        }
        return o[a].exports
    }
    for (var r = "function" == typeof require && require, a = 0; a < n.length; a++) i(n[a]);
    return i
}({
    1: [function(e, t) {
        var o, n, i, r, a, s, l, c, u, m = {}.hasOwnProperty,
            d = function(e, t) {
                function o() {
                    this.constructor = e
                }
                for (var n in t) m.call(t, n) && (e[n] = t[n]);
                return o.prototype = t.prototype, e.prototype = new o, e.__super__ = t.prototype, e
            };
        r = e("./promise").Promise, n = e("./events").Evented, s = 1e6 * Math.random() | 0, c = e("debug")("bus:client(" + s + ")"), i = function(e) {
            function t() {
                this.ready = new r, document.body ? this.createIframe() : document.addEventListener("DOMContentLoaded", this.createIframe.bind(this))
            }
            return d(t, e), t.prototype.createIframe = function() {
                return this.frame = document.createElement("iframe"), this.frame.style.display = "none", this.addListener(this.frame), this.frame.src = "https://bus.eager.io#" + s, document.body.appendChild(this.frame)
            }, t.prototype.addListener = function(e) {
                return window.addEventListener("message", function(t) {
                    return function(o) {
                        var n, i;
                        if (n = o.data, i = o.source, i === e.contentWindow) switch (n.type) {
                            case "bus:ready":
                                return c("Ready"), t.ready.resolve();
                            case "bus:set":
                                return c("Received", n.key), t.trigger("set", n), t.trigger("set:" + n.key, n)
                        }
                    }
                }(this))
            }, t.prototype.send = function(e) {
                return this.ready.then(function(t) {
                    return function() {
                        return c("Sending", e), t.frame.contentWindow.postMessage(e, "*")
                    }
                }(this))
            }, t.prototype.client = function(e) {
                return new o(this, e)
            }, t
        }(n), o = function(e) {
            function t(e, t) {
                this.frame = e, this.siteId = t, this.frame.on("set", function(e) {
                    return function(o) {
                        var n, i;
                        return i = o.key.indexOf(":"), t = o.key.substring(0, i), n = o.key.substring(i + 1), t === e.siteId ? (o.key = n, e.trigger("set", o), e.trigger("set:" + n, o)) : void 0
                    }
                }(this))
            }
            return d(t, e), t.prototype.set = function(e, t) {
                return e = "" + this.siteId + ":" + e, c("Setting", e, "to", t), this.frame.send({
                    type: "bus:set",
                    key: e,
                    value: t
                })
            }, t.prototype.clear = function(e) {
                return e = "" + this.siteId + ":" + e, c("Clearing", e), this.frame.send({
                    type: "bus:clear",
                    key: e
                })
            }, t.prototype.flash = function(e, t) {
                return e = "" + this.siteId + ":" + e, c("Flashing", e, "to", t), this.frame.send({
                    type: "bus:flash",
                    key: e,
                    value: t
                })
            }, t
        }(n), a = {}, u = null, l = function(e) {
            return a[e] || (u || (u = new i), a[e] = new o(u, e)), a[e]
        }, t.exports = {
            Client: o,
            Frame: i,
            createClient: l
        }
    }, {
        "./events": 2,
        "./promise": 3,
        debug: 11
    }],
    2: [function(e, t) {
        var o, n = [].slice;
        o = function() {
            function e() {}
            return e.prototype.on = function(e, t, o, n) {
                var i;
                return null == n && (n = !1), null == this.bindings && (this.bindings = {}), null == (i = this.bindings)[e] && (i[e] = []), this.bindings[e].push({
                    handler: t,
                    ctx: o,
                    once: n
                })
            }, e.prototype.once = function(e, t, o) {
                return this.on(e, t, o, !0)
            }, e.prototype.off = function(e, t) {
                var o, n, i;
                if (null != (null != (n = this.bindings) ? n[e] : void 0)) {
                    if (null == t) return delete this.bindings[e];
                    for (o = 0, i = []; o < this.bindings[e].length;) i.push(this.bindings[e][o].handler === t ? this.bindings[e].splice(o, 1) : o++);
                    return i
                }
            }, e.prototype.trigger = function() {
                var e, t, o, i, r, a, s, l, c;
                if (o = arguments[0], e = 2 <= arguments.length ? n.call(arguments, 1) : [], null != (s = this.bindings) ? s[o] : void 0) {
                    for (r = 0, c = []; r < this.bindings[o].length;) l = this.bindings[o][r], i = l.handler, t = l.ctx, a = l.once, i.apply(null != t ? t : this, e), c.push(a ? this.bindings[o].splice(r, 1) : r++);
                    return c
                }
            }, e
        }(), t.exports = {
            Evented: o
        }
    }, {}],
    3: [function(e, t) {
        var o;
        o = function() {
            function e() {
                this.ready = !1, this.waiting = []
            }
            return e.prototype.then = function(e) {
                return this.ready ? e() : this.waiting.push(e)
            }, e.prototype.resolve = function() {
                var e, t, o, n;
                if (this.ready = !0, null != this.waiting) {
                    for (n = this.waiting, t = 0, o = n.length; o > t; t++)(e = n[t])();
                    return this.waiting = null
                }
            }, e
        }(), t.exports = {
            Promise: o
        }
    }, {}],
    4: [function(e, t) {
        var o, n, i;
        n = e("./views/welcomeDialog").WelcomeDialogView, o = e("../bower_components/bus/coffee/client"), i = function(e) {
            var t, i, r;
            return i = void 0, t = new n(e), t.on("click:ok", function() {
                var e, t;
                return e = "https://eager.io/home", (null != i && null != (t = i.app) ? t.id : void 0) && (e = "https://eager.io/app/" + i.app.id + "/install?step=done&version=" + encodeURIComponent(i.version) + "&options=" + encodeURIComponent(JSON.stringify(i.options))), window.open(e)
            }), r = o.createClient("preview"), r.frame.ready.then(function() {
                return t.render()
            }), r.on("set:pendingInstall", function(e) {
                var o, n;
                return o = e.value, i = o, t.setAppName(null != (n = o.app) ? n.title : void 0)
            })
        }, t.exports = {
            show: i
        }
    }, {
        "../bower_components/bus/coffee/client": 1,
        "./views/welcomeDialog": 10
    }],
    5: [function(e) {
        var t;
        t = e("./initialInstall"),
            function() {
                var e, o, n, i, r, a, s, l;
                try {
                    if (!window.JSON || !document.querySelectorAll || !window.addEventListener) return;
                    if (r = /(?:https?:)?\/\/fast(?:\-qa|\-direct|\-staging)?\.eager\.io\/([a-zA-Z0-9\-_]+)\.js/i, l = document.querySelectorAll("script[src]"), !l) return;
                    for (s = void 0, o = 0; o < l.length;) {
                        if (i = r.exec(l[o].src)) {
                            s = i[1];
                            break
                        }
                        o++
                    }
                    if (!s || "preview" === s) return;
                    return a = new XMLHttpRequest, a.open("POST", "//notifier.eager.io/set/" + s, !0), e = JSON.stringify({
                        source: "client",
                        site: document.location.toString()
                    }), a.send(e), n = function() {
                        var e;
                        return window.addEventListener("message", function(e) {
                            var o;
                            return "isInitialInstall" === (null != (o = e.data) ? o.type : void 0) ? t.show() : void 0
                        }), e = document.createElement("iframe"), e.src = "//embedded.eager.io/pages/initial.html#" + s, e.style.display = "none", document.body.appendChild(e)
                    }, "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", n) : n()
                } catch (c) {}
            }()
    }, {
        "./initialInstall": 4
    }],
    6: [function(e, t) {
        var o, n = [].slice;
        o = function() {
            function e() {}
            return e.prototype.on = function(e, t, o, n) {
                var i;
                return null == n && (n = !1), null == this.bindings && (this.bindings = {}), null == (i = this.bindings)[e] && (i[e] = []), this.bindings[e].push({
                    handler: t,
                    ctx: o,
                    once: n
                })
            }, e.prototype.once = function(e, t, o) {
                return this.on(e, t, o, !0)
            }, e.prototype.off = function(e, t) {
                var o, n, i;
                if (null != (null != (n = this.bindings) ? n[e] : void 0)) {
                    if (null == t) return delete this.bindings[e];
                    for (o = 0, i = []; o < this.bindings[e].length;) i.push(this.bindings[e][o].handler === t ? this.bindings[e].splice(o, 1) : o++);
                    return i
                }
            }, e.prototype.trigger = function() {
                var e, t, o, i, r, a, s, l, c;
                if (o = arguments[0], e = 2 <= arguments.length ? n.call(arguments, 1) : [], null != (s = this.bindings) ? s[o] : void 0) {
                    for (r = 0, c = []; r < this.bindings[o].length;) l = this.bindings[o][r], i = l.handler, t = l.ctx, a = l.once, i.apply(null != t ? t : this, e), c.push(a ? this.bindings[o].splice(r, 1) : r++);
                    return c
                }
            }, e
        }(), t.exports = {
            Evented: o
        }
    }, {}],
    7: [function(e, t) {
        var o, n, i = [].slice;
        n = function() {
            var e, t, o, n, r, a, s;
            for (n = arguments[0], o = 2 <= arguments.length ? i.call(arguments, 1) : [], null == n && (n = {}), a = 0, s = o.length; s > a; a++)
                if (t = o[a])
                    for (e in t) r = t[e], t.hasOwnProperty(e) && (n[e] = r);
            return n
        }, o = function(e, t) {
            return Array.prototype.forEach.call(e, t)
        }, t.exports = {
            extend: n,
            each: o
        }
    }, {}],
    8: [function(e, t) {
        var o, n, i;
        i = e("./general").extend, o = {
            "align-content": "stretch",
            "align-items": "stretch",
            "align-self": "stretch",
            "alignment-baseline": "auto",
            background: "none",
            "background-attachment": "scroll",
            "background-color": "transparent",
            "background-image": "none",
            "background-origin": "padding-box",
            "background-position": "0% 0%",
            "background-position-x": "0%",
            "background-position-y": "0%",
            "background-repeat": "repeat",
            "background-repeat-x": "initial",
            "background-repeat-y": "initial",
            "background-size": "auto",
            "baseline-shift": "baseline",
            border: 0,
            "border-bottom": 0,
            "border-bottom-color": "transparent",
            "border-bottom-left-radius": 0,
            "border-bottom-right-radius": 0,
            "border-bottom-style": "none",
            "border-bottom-width": 0,
            "border-collapse": "separate",
            "border-color": "transparent",
            "border-image": "none",
            "border-image-outset": 0,
            "border-image-repeat": "stretch",
            "border-image-slice": "100%",
            "border-image-source": "none",
            "border-image-width": 1,
            "border-left": 0,
            "border-left-color": "transparent",
            "border-left-style": "none",
            "border-left-width": 0,
            "border-right": 0,
            "border-right-color": "transparent",
            "border-right-style": "none",
            "border-right-width": 0,
            "border-spacing": "0 0",
            "border-style": "none",
            "border-top": 0,
            "border-top-color": "transparent",
            "border-top-left-radius": 0,
            "border-top-right-radius": 0,
            "border-top-style": "none",
            "border-top-width": 0,
            "border-width": 0,
            bottom: "auto",
            "box-shadow": "none",
            "buffered-rendering": "auto",
            "caption-side": "top",
            clear: "none",
            clip: "auto",
            "clip-path": "none",
            "clip-rule": "nonzero",
            color: "#000",
            "color-interpolation": "srgb",
            "color-interpolation-filters": "linearrgb",
            "color-profile": "initial",
            "color-rendering": "auto",
            content: "initial",
            "counter-increment": "initial",
            "counter-reset": "initial",
            cursor: "pointer",
            direction: "ltr",
            display: "block",
            "dominant-baseline": "auto",
            "empty-cells": "show",
            "enable-background": "initial",
            fill: "transparent",
            "fill-opacity": 1,
            "fill-rule": "nonzero",
            filter: "none",
            flex: "0 1 auto",
            "flex-basis": "auto",
            "flex-direction": "row",
            "flex-flow": "row nowrap",
            "flex-grow": 0,
            "flex-shrink": 1,
            "flex-wrap": "nowrap",
            "float": "none",
            font: "normal normal normal 16px/normal 'Helvetica Neue', Helvetica, Arial, sans-serif",
            "font-family": "'Helvetica Neue', Helvetica, Arial, sans-serif",
            "font-kerning": "auto",
            "font-size": "16px",
            "font-stretch": "initial",
            "font-style": "normal",
            "font-variant": "normal",
            "font-variant-ligatures": "normal",
            "font-weight": "normal",
            "glyph-orientation-horizontal": "0deg",
            "glyph-orientation-vertical": "auto",
            height: "auto",
            "image-rendering": "auto",
            "justify-content": "flex-start",
            kerning: 0,
            left: "auto",
            "letter-spacing": "normal",
            "lighting-color": "#fff",
            "line-height": "normal",
            "list-style": "disc outside none",
            "list-style-image": "none",
            "list-style-position": "outside",
            "list-style-type": "disc",
            margin: 0,
            "margin-bottom": 0,
            "margin-left": 0,
            "margin-right": 0,
            "margin-top": 0,
            marker: "initial",
            "marker-end": "none",
            "marker-mid": "none",
            "marker-start": "none",
            mask: "none",
            "mask-type": "luminance",
            "max-height": "none",
            "max-width": "none",
            "max-zoom": "initial",
            "min-height": 0,
            "min-width": 0,
            "min-zoom": "initial",
            "object-fit": "fill",
            "object-position": "50% 50%",
            opacity: 1,
            order: 0,
            orientation: "initial",
            orphans: "auto",
            outline: "transparent none 0",
            "outline-color": "transparent",
            "outline-offset": 0,
            "outline-style": "none",
            "outline-width": 0,
            overflow: "visible",
            "overflow-wrap": "normal",
            "overflow-x": "visible",
            "overflow-y": "visible",
            padding: 0,
            "padding-bottom": 0,
            "padding-left": 0,
            "padding-right": 0,
            "padding-top": 0,
            page: "initial",
            "page-break-after": "auto",
            "page-break-before": "auto",
            "page-break-inside": "auto",
            "pointer-events": "auto",
            position: "static",
            quotes: "initial",
            resize: "none",
            right: "auto",
            "shape-rendering": "auto",
            size: "initial",
            speak: "normal",
            src: "initial",
            "tab-size": "8",
            "table-layout": "auto",
            "text-align": "start",
            "text-anchor": "start",
            "text-decoration": "none solid transparent",
            "text-indent": 0,
            "text-line-through-color": "initial",
            "text-line-through-mode": "initial",
            "text-line-through-style": "initial",
            "text-line-through-width": "initial",
            "text-overflow": "clip",
            "text-overline-color": "initial",
            "text-overline-mode": "initial",
            "text-overline-style": "initial",
            "text-overline-width": "initial",
            "text-rendering": "optimizeLegibility",
            "text-shadow": "none",
            "text-transform": "none",
            "text-underline-color": "initial",
            "text-underline-mode": "initial",
            "text-underline-style": "initial",
            "text-underline-width": "initial",
            top: "auto",
            transition: "all 0s ease 0s",
            "transition-delay": "0s",
            "transition-duration": "0s",
            "transition-property": "all",
            "transition-timing-function": "ease",
            "unicode-bidi": "normal",
            "unicode-range": "initial",
            "user-zoom": "initial",
            "vector-effect": "none",
            "vertical-align": "baseline",
            visibility: "visible",
            "-webkit-animation": "none 0s ease 0s 1 normal none running",
            "-moz-animation": "none 0s ease 0s 1 normal none running",
            animation: "none 0s ease 0s 1 normal none running",
            "-webkit-animation-delay": "0s",
            "-moz-animation-delay": "0s",
            "animation-delay": "0s",
            "-webkit-animation-direction": "normal",
            "-moz-animation-direction": "normal",
            "animation-direction": "normal",
            "-webkit-animation-duration": "0s",
            "-moz-animation-duration": "0s",
            "animation-duration": "0s",
            "-webkit-animation-fill-mode": "none",
            "-moz-animation-fill-mode": "none",
            "animation-fill-mode": "none",
            "-webkit-animation-iteration-count": 1,
            "-moz-animation-iteration-count": 1,
            "animation-iteration-count": 1,
            "-webkit-animation-name": "none",
            "-moz-animation-name": "none",
            "animation-name": "none",
            "-webkit-animation-play-state": "running",
            "-moz-animation-play-state": "running",
            "animation-play-state": "running",
            "-webkit-animation-timing-function": "ease",
            "-moz-animation-timing-function": "ease",
            "animation-timing-function": "ease",
            "-webkit-app-region": "no-drag",
            "-moz-app-region": "no-drag",
            "app-region": "no-drag",
            "-webkit-appearance": "none",
            "-moz-appearance": "none",
            appearance: "none",
            "-webkit-aspect-ratio": "none",
            "-moz-aspect-ratio": "none",
            "aspect-ratio": "none",
            "-webkit-backface-visibility": "visible",
            "-moz-backface-visibility": "visible",
            "backface-visibility": "visible",
            "-webkit-background-clip": "border-box",
            "-moz-background-clip": "border-box",
            "background-clip": "border-box",
            "-webkit-background-composite": "source-over",
            "-moz-background-composite": "source-over",
            "background-composite": "source-over",
            "-webkit-background-origin": "padding-box",
            "-moz-background-origin": "padding-box",
            "background-origin": "padding-box",
            "-webkit-background-size": "auto",
            "-moz-background-size": "auto",
            "background-size": "auto",
            "-webkit-border-after": 0,
            "-moz-border-after": 0,
            "border-after": 0,
            "-webkit-border-after-color": "transparent",
            "-moz-border-after-color": "transparent",
            "border-after-color": "transparent",
            "-webkit-border-after-style": "none",
            "-moz-border-after-style": "none",
            "border-after-style": "none",
            "-webkit-border-after-width": 0,
            "-moz-border-after-width": 0,
            "border-after-width": 0,
            "-webkit-border-before": 0,
            "-moz-border-before": 0,
            "border-before": 0,
            "-webkit-border-before-color": "transparent",
            "-moz-border-before-color": "transparent",
            "border-before-color": "transparent",
            "-webkit-border-before-style": "none",
            "-moz-border-before-style": "none",
            "border-before-style": "none",
            "-webkit-border-before-width": 0,
            "-moz-border-before-width": 0,
            "border-before-width": 0,
            "-webkit-border-end": 0,
            "-moz-border-end": 0,
            "border-end": 0,
            "-webkit-border-end-color": "transparent",
            "-moz-border-end-color": "transparent",
            "border-end-color": "transparent",
            "-webkit-border-end-style": "none",
            "-moz-border-end-style": "none",
            "border-end-style": "none",
            "-webkit-border-end-width": 0,
            "-moz-border-end-width": 0,
            "border-end-width": 0,
            "-webkit-border-fit": "border",
            "-moz-border-fit": "border",
            "border-fit": "border",
            "-webkit-border-horizontal-spacing": 0,
            "-moz-border-horizontal-spacing": 0,
            "border-horizontal-spacing": 0,
            "-webkit-border-image": "none",
            "-moz-border-image": "none",
            "border-image": "none",
            "-webkit-border-radius": "initial",
            "-moz-border-radius": "initial",
            "border-radius": "initial",
            "-webkit-border-start": 0,
            "-moz-border-start": 0,
            "border-start": 0,
            "-webkit-border-start-color": "transparent",
            "-moz-border-start-color": "transparent",
            "border-start-color": "transparent",
            "-webkit-border-start-style": "none",
            "-moz-border-start-style": "none",
            "border-start-style": "none",
            "-webkit-border-start-width": 0,
            "-moz-border-start-width": 0,
            "border-start-width": 0,
            "-webkit-border-vertical-spacing": 0,
            "-moz-border-vertical-spacing": 0,
            "border-vertical-spacing": 0,
            "-webkit-box-align": "stretch",
            "-moz-box-align": "stretch",
            "box-align": "stretch",
            "-webkit-box-decoration-break": "slice",
            "-moz-box-decoration-break": "slice",
            "box-decoration-break": "slice",
            "-webkit-box-direction": "normal",
            "-moz-box-direction": "normal",
            "box-direction": "normal",
            "-webkit-box-flex": 0,
            "-moz-box-flex": 0,
            "box-flex": 0,
            "-webkit-box-flex-group": 1,
            "-moz-box-flex-group": 1,
            "box-flex-group": 1,
            "-webkit-box-lines": "single",
            "-moz-box-lines": "single",
            "box-lines": "single",
            "-webkit-box-ordinal-group": 1,
            "-moz-box-ordinal-group": 1,
            "box-ordinal-group": 1,
            "-webkit-box-orient": "horizontal",
            "-moz-box-orient": "horizontal",
            "box-orient": "horizontal",
            "-webkit-box-pack": "start",
            "-moz-box-pack": "start",
            "box-pack": "start",
            "-webkit-box-reflect": "none",
            "-moz-box-reflect": "none",
            "box-reflect": "none",
            "-webkit-box-shadow": "none",
            "-moz-box-shadow": "none",
            "box-shadow": "none",
            "-webkit-box-sizing": "border-box",
            "-moz-box-sizing": "border-box",
            "box-sizing": "border-box",
            "-webkit-clip-path": "none",
            "-moz-clip-path": "none",
            "clip-path": "none",
            "-webkit-column-axis": "auto",
            "-moz-column-axis": "auto",
            "column-axis": "auto",
            "-webkit-column-break-after": "auto",
            "-moz-column-break-after": "auto",
            "column-break-after": "auto",
            "-webkit-column-break-before": "auto",
            "-moz-column-break-before": "auto",
            "column-break-before": "auto",
            "-webkit-column-break-inside": "auto",
            "-moz-column-break-inside": "auto",
            "column-break-inside": "auto",
            "-webkit-column-count": "auto",
            "-moz-column-count": "auto",
            "column-count": "auto",
            "-webkit-column-gap": "normal",
            "-moz-column-gap": "normal",
            "column-gap": "normal",
            "-webkit-column-progression": "normal",
            "-moz-column-progression": "normal",
            "column-progression": "normal",
            "-webkit-column-rule": 0,
            "-moz-column-rule": 0,
            "column-rule": 0,
            "-webkit-column-rule-color": "transparent",
            "-moz-column-rule-color": "transparent",
            "column-rule-color": "transparent",
            "-webkit-column-rule-style": "none",
            "-moz-column-rule-style": "none",
            "column-rule-style": "none",
            "-webkit-column-rule-width": 0,
            "-moz-column-rule-width": 0,
            "column-rule-width": 0,
            "-webkit-column-span": "none",
            "-moz-column-span": "none",
            "column-span": "none",
            "-webkit-column-width": "auto",
            "-moz-column-width": "auto",
            "column-width": "auto",
            "-webkit-columns": "auto auto",
            "-moz-columns": "auto auto",
            columns: "auto auto",
            "-webkit-filter": "none",
            "-moz-filter": "none",
            filter: "none",
            "-webkit-font-feature-settings": "normal",
            "-moz-font-feature-settings": "normal",
            "font-feature-settings": "normal",
            "-webkit-font-size-delta": "initial",
            "-moz-font-size-delta": "initial",
            "font-size-delta": "initial",
            "-webkit-font-smoothing": "auto",
            "-moz-font-smoothing": "auto",
            "font-smoothing": "auto",
            "-webkit-highlight": "none",
            "-moz-highlight": "none",
            highlight: "none",
            "-webkit-hyphenate-character": "auto",
            "-moz-hyphenate-character": "auto",
            "hyphenate-character": "auto",
            "-webkit-line-box-contain": "block inline replaced",
            "-moz-line-box-contain": "block inline replaced",
            "line-box-contain": "block inline replaced",
            "-webkit-line-break": "auto",
            "-moz-line-break": "auto",
            "line-break": "auto",
            "-webkit-line-clamp": "none",
            "-moz-line-clamp": "none",
            "line-clamp": "none",
            "-webkit-locale": "auto",
            "-moz-locale": "auto",
            locale: "auto",
            "-webkit-mask": "initial",
            "-moz-mask": "initial",
            mask: "initial",
            "-webkit-mask-box-image": "none",
            "-moz-mask-box-image": "none",
            "mask-box-image": "none",
            "-webkit-mask-box-image-outset": 0,
            "-moz-mask-box-image-outset": 0,
            "mask-box-image-outset": 0,
            "-webkit-mask-box-image-repeat": "stretch",
            "-moz-mask-box-image-repeat": "stretch",
            "mask-box-image-repeat": "stretch",
            "-webkit-mask-box-image-slice": "0 fill",
            "-moz-mask-box-image-slice": "0 fill",
            "mask-box-image-slice": "0 fill",
            "-webkit-mask-box-image-source": "none",
            "-moz-mask-box-image-source": "none",
            "mask-box-image-source": "none",
            "-webkit-mask-box-image-width": "auto",
            "-moz-mask-box-image-width": "auto",
            "mask-box-image-width": "auto",
            "-webkit-mask-clip": "border-box",
            "-moz-mask-clip": "border-box",
            "mask-clip": "border-box",
            "-webkit-mask-composite": "source-over",
            "-moz-mask-composite": "source-over",
            "mask-composite": "source-over",
            "-webkit-mask-image": "none",
            "-moz-mask-image": "none",
            "mask-image": "none",
            "-webkit-mask-origin": "border-box",
            "-moz-mask-origin": "border-box",
            "mask-origin": "border-box",
            "-webkit-mask-position": "0% 0%",
            "-moz-mask-position": "0% 0%",
            "mask-position": "0% 0%",
            "-webkit-mask-position-x": "0%",
            "-moz-mask-position-x": "0%",
            "mask-position-x": "0%",
            "-webkit-mask-position-y": "0%",
            "-moz-mask-position-y": "0%",
            "mask-position-y": "0%",
            "-webkit-mask-repeat": "repeat",
            "-moz-mask-repeat": "repeat",
            "mask-repeat": "repeat",
            "-webkit-mask-repeat-x": "initial",
            "-moz-mask-repeat-x": "initial",
            "mask-repeat-x": "initial",
            "-webkit-mask-repeat-y": "initial",
            "-moz-mask-repeat-y": "initial",
            "mask-repeat-y": "initial",
            "-webkit-mask-size": "auto",
            "-moz-mask-size": "auto",
            "mask-size": "auto",
            "-webkit-max-logical-height": "none",
            "-moz-max-logical-height": "none",
            "max-logical-height": "none",
            "-webkit-max-logical-width": "none",
            "-moz-max-logical-width": "none",
            "max-logical-width": "none",
            "-webkit-min-logical-height": 0,
            "-moz-min-logical-height": 0,
            "min-logical-height": 0,
            "-webkit-min-logical-width": 0,
            "-moz-min-logical-width": 0,
            "min-logical-width": 0,
            "-webkit-perspective": "none",
            "-moz-perspective": "none",
            perspective: "none",
            "-webkit-perspective-origin": "0 0",
            "-moz-perspective-origin": "0 0",
            "perspective-origin": "0 0",
            "-webkit-perspective-origin-x": "initial",
            "-moz-perspective-origin-x": "initial",
            "perspective-origin-x": "initial",
            "-webkit-perspective-origin-y": "initial",
            "-moz-perspective-origin-y": "initial",
            "perspective-origin-y": "initial",
            "-webkit-rtl-ordering": "logical",
            "-moz-rtl-ordering": "logical",
            "rtl-ordering": "logical",
            "-webkit-ruby-position": "before",
            "-moz-ruby-position": "before",
            "ruby-position": "before",
            "-webkit-tap-highlight-color": "transparent",
            "-moz-tap-highlight-color": "transparent",
            "tap-highlight-color": "transparent",
            "-webkit-text-combine": "none",
            "-moz-text-combine": "none",
            "text-combine": "none",
            "-webkit-text-decorations-in-effect": "none",
            "-moz-text-decorations-in-effect": "none",
            "text-decorations-in-effect": "none",
            "-webkit-text-emphasis": "initial",
            "-moz-text-emphasis": "initial",
            "text-emphasis": "initial",
            "-webkit-text-emphasis-color": "initial",
            "-moz-text-emphasis-color": "initial",
            "text-emphasis-color": "initial",
            "-webkit-text-emphasis-position": "over",
            "-moz-text-emphasis-position": "over",
            "text-emphasis-position": "over",
            "-webkit-text-emphasis-style": "none",
            "-moz-text-emphasis-style": "none",
            "text-emphasis-style": "none",
            "-webkit-text-fill-color": "initial",
            "-moz-text-fill-color": "initial",
            "text-fill-color": "initial",
            "-webkit-text-orientation": "vertical-right",
            "-moz-text-orientation": "vertical-right",
            "text-orientation": "vertical-right",
            "-webkit-text-security": "none",
            "-moz-text-security": "none",
            "text-security": "none",
            "-webkit-text-stroke": "initial",
            "-moz-text-stroke": "initial",
            "text-stroke": "initial",
            "-webkit-text-stroke-color": "transparent",
            "-moz-text-stroke-color": "transparent",
            "text-stroke-color": "transparent",
            "-webkit-text-stroke-width": 0,
            "-moz-text-stroke-width": 0,
            "text-stroke-width": 0,
            "-webkit-transform": "none",
            "-moz-transform": "none",
            transform: "none",
            "-webkit-transform-origin": "0 0",
            "-moz-transform-origin": "0 0",
            "transform-origin": "0 0",
            "-webkit-transform-origin-x": "initial",
            "-moz-transform-origin-x": "initial",
            "transform-origin-x": "initial",
            "-webkit-transform-origin-y": "initial",
            "-moz-transform-origin-y": "initial",
            "transform-origin-y": "initial",
            "-webkit-transform-origin-z": "initial",
            "-moz-transform-origin-z": "initial",
            "transform-origin-z": "initial",
            "-webkit-transform-style": "flat",
            "-moz-transform-style": "flat",
            "transform-style": "flat",
            "-webkit-transition": "all 0s ease 0s",
            "-moz-transition": "all 0s ease 0s",
            transition: "all 0s ease 0s",
            "-webkit-transition-delay": "0s",
            "-moz-transition-delay": "0s",
            "transition-delay": "0s",
            "-webkit-transition-duration": "0s",
            "-moz-transition-duration": "0s",
            "transition-duration": "0s",
            "-webkit-transition-property": "all",
            "-moz-transition-property": "all",
            "transition-property": "all",
            "-webkit-transition-timing-function": "ease",
            "-moz-transition-timing-function": "ease",
            "transition-timing-function": "ease",
            "-webkit-user-drag": "auto",
            "-moz-user-drag": "auto",
            "user-drag": "auto",
            "-webkit-user-modify": "read-only",
            "-moz-user-modify": "read-only",
            "user-modify": "read-only",
            "-webkit-user-select": "text",
            "-moz-user-select": "text",
            "user-select": "text",
            "-webkit-writing-mode": "horizontal-tb",
            "-moz-writing-mode": "horizontal-tb",
            "writing-mode": "horizontal-tb",
            "white-space": "normal",
            widows: "auto",
            width: "auto",
            "word-break": "normal",
            "word-spacing": 0,
            "word-wrap": "normal",
            "writing-mode": "lr-tb",
            "z-index": "auto",
            zoom: 1
        }, n = i({}, o, {
            position: "fixed",
            "z-index": 1e9,
            top: 0,
            left: 0,
            width: 0,
            height: 0
        }), t.exports = {
            IFRAME: n,
            ELEMENT: o
        }
    }, {
        "./general": 7
    }],
    9: [function(e, t) {
        var o, n, i, r, a;
        a = e("./reset"), i = function(e) {
            var t, o, n;
            o = "";
            for (t in e) n = e[t], o += "" + t + ":" + n + "!important;";
            return o
        }, r = function(e) {
            var t;
            return null != (t = e.parentNode) ? t.removeChild(e) : void 0
        }, n = function() {
            var e;
            return e = document.createElement("iframe"), e.setAttribute("data-eager-element", !0), e.setAttribute("style", i(a.IFRAME)), e.setAttribute("allowTransparency", !0), e
        }, o = function() {
            var e;
            return e = document.createElement("eager"), e.setAttribute("data-eager-element", !0), e
        }, t.exports = {
            inlineStyles: i,
            removeElement: r,
            createIframe: n,
            createElement: o
        }
    }, {
        "./reset": 8
    }],
    10: [function(e, t) {
        var o, n, i, r, a, s = {}.hasOwnProperty,
            l = function(e, t) {
                function o() {
                    this.constructor = e
                }
                for (var n in t) s.call(t, n) && (e[n] = t[n]);
                return o.prototype = t.prototype, e.prototype = new o, e.__super__ = t.prototype, e
            };
        a = e("../utils/ui"), r = e("../utils/reset"), i = e("../utils/general").extend, o = e("../utils/events").Evented, n = function(e) {
            function t(e) {
                this.options = null != e ? e : {}
            }
            return l(t, e), t.prototype.render = function() {
                return this.el = a.createIframe(), document.body.appendChild(this.el), this.el.addEventListener("load", function(e) {
                    return function() {
                        return e.el.setAttribute("style", a.inlineStyles(i({}, r.IFRAME, {
                            width: "100%",
                            height: "100%"
                        })))
                    }
                }(this)), this.setIframeURL(), window.addEventListener("message", function(e) {
                    return function(t) {
                        return "eager-welcome-dialog:ok:click" === t.data ? (e.trigger("click:ok"), a.removeElement(e.el)) : void 0
                    }
                }(this)), window.addEventListener("message", function(e) {
                    return function(t) {
                        return "eager-welcome-dialog:cancel:click" === t.data ? a.removeElement(e.el) : void 0
                    }
                }(this))
            }, t.prototype.setIframeURL = function() {
                var e;
                return e = this.appName || "", this.options.wordpress && (e = "wp!" + e), this.el.setAttribute("src", "//embedded.eager.io/pages/welcome-dialog#" + e)
            }, t.prototype.setAppName = function(e) {
                return this.appName = e, this.setIframeURL()
            }, t
        }(o), t.exports = {
            WelcomeDialogView: n
        }
    }, {
        "../utils/events": 6,
        "../utils/general": 7,
        "../utils/reset": 8,
        "../utils/ui": 9
    }],
    11: [function(e, t, o) {
        function n() {
            return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
        }

        function i() {
            var e = arguments,
                t = this.useColors;
            if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + o.humanize(this.diff), !t) return e;
            var n = "color: " + this.color;
            e = [e[0], n, "color: inherit"].concat(Array.prototype.slice.call(e, 1));
            var i = 0,
                r = 0;
            return e[0].replace(/%[a-z%]/g, function(e) {
                "%%" !== e && (i++, "%c" === e && (r = i))
            }), e.splice(r, 0, n), e
        }

        function r() {
            return "object" == typeof console && "function" == typeof console.log && Function.prototype.apply.call(console.log, console, arguments)
        }

        function a(e) {
            try {
                null == e ? localStorage.removeItem("debug") : localStorage.debug = e
            } catch (t) {}
        }

        function s() {
            var e;
            try {
                e = localStorage.debug
            } catch (t) {}
            return e
        }
        o = t.exports = e("./debug"), o.log = r, o.formatArgs = i, o.save = a, o.load = s, o.useColors = n, o.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], o.formatters.j = function(e) {
            return JSON.stringify(e)
        }, o.enable(s())
    }, {
        "./debug": 12
    }],
    12: [function(e, t, o) {
        function n() {
            return o.colors[u++ % o.colors.length]
        }

        function i(e) {
            function t() {}

            function i() {
                var e = i,
                    t = +new Date,
                    r = t - (c || t);
                e.diff = r, e.prev = c, e.curr = t, c = t, null == e.useColors && (e.useColors = o.useColors()), null == e.color && e.useColors && (e.color = n());
                var a = Array.prototype.slice.call(arguments);
                a[0] = o.coerce(a[0]), "string" != typeof a[0] && (a = ["%o"].concat(a));
                var s = 0;
                a[0] = a[0].replace(/%([a-z%])/g, function(t, n) {
                    if ("%%" === t) return t;
                    s++;
                    var i = o.formatters[n];
                    if ("function" == typeof i) {
                        var r = a[s];
                        t = i.call(e, r), a.splice(s, 1), s--
                    }
                    return t
                }), "function" == typeof o.formatArgs && (a = o.formatArgs.apply(e, a));
                var l = i.log || o.log || console.log.bind(console);
                l.apply(e, a)
            }
            t.enabled = !1, i.enabled = !0;
            var r = o.enabled(e) ? i : t;
            return r.namespace = e, r
        }

        function r(e) {
            o.save(e);
            for (var t = (e || "").split(/[\s,]+/), n = t.length, i = 0; n > i; i++) t[i] && (e = t[i].replace(/\*/g, ".*?"), "-" === e[0] ? o.skips.push(new RegExp("^" + e.substr(1) + "$")) : o.names.push(new RegExp("^" + e + "$")))
        }

        function a() {
            o.enable("")
        }

        function s(e) {
            var t, n;
            for (t = 0, n = o.skips.length; n > t; t++)
                if (o.skips[t].test(e)) return !1;
            for (t = 0, n = o.names.length; n > t; t++)
                if (o.names[t].test(e)) return !0;
            return !1
        }

        function l(e) {
            return e instanceof Error ? e.stack || e.message : e
        }
        o = t.exports = i, o.coerce = l, o.disable = a, o.enable = r, o.enabled = s, o.humanize = e("ms"), o.names = [], o.skips = [], o.formatters = {};
        var c, u = 0
    }, {
        ms: 13
    }],
    13: [function(e, t) {
        function o(e) {
            var t = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(e);
            if (t) {
                var o = parseFloat(t[1]),
                    n = (t[2] || "ms").toLowerCase();
                switch (n) {
                    case "years":
                    case "year":
                    case "y":
                        return o * u;
                    case "days":
                    case "day":
                    case "d":
                        return o * c;
                    case "hours":
                    case "hour":
                    case "h":
                        return o * l;
                    case "minutes":
                    case "minute":
                    case "m":
                        return o * s;
                    case "seconds":
                    case "second":
                    case "s":
                        return o * a;
                    case "ms":
                        return o
                }
            }
        }

        function n(e) {
            return e >= c ? Math.round(e / c) + "d" : e >= l ? Math.round(e / l) + "h" : e >= s ? Math.round(e / s) + "m" : e >= a ? Math.round(e / a) + "s" : e + "ms"
        }

        function i(e) {
            return r(e, c, "day") || r(e, l, "hour") || r(e, s, "minute") || r(e, a, "second") || e + " ms"
        }

        function r(e, t, o) {
            return t > e ? void 0 : 1.5 * t > e ? Math.floor(e / t) + " " + o : Math.ceil(e / t) + " " + o + "s"
        }
        var a = 1e3,
            s = 60 * a,
            l = 60 * s,
            c = 24 * l,
            u = 365.25 * c;
        t.exports = function(e, t) {
            return t = t || {}, "string" == typeof e ? o(e) : t.long ? i(e) : n(e)
        }
    }, {}]
}, {}, [5]);