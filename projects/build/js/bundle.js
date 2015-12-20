(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a)return a(o, !0);
                if (i)return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {exports: {}};
            t[o][0].call(f.exports, function (e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }

    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)s(r[o]);
    return s
})({
    1: [function (require, module, exports) {
// shim for using process in browser

        var process = module.exports = {};

        process.nextTick = (function () {
            var canSetImmediate = typeof window !== 'undefined'
                && window.setImmediate;
            var canPost = typeof window !== 'undefined'
                    && window.postMessage && window.addEventListener
                ;

            if (canSetImmediate) {
                return function (f) {
                    return window.setImmediate(f)
                };
            }

            if (canPost) {
                var queue = [];
                window.addEventListener('message', function (ev) {
                    var source = ev.source;
                    if ((source === window || source === null) && ev.data === 'process-tick') {
                        ev.stopPropagation();
                        if (queue.length > 0) {
                            var fn = queue.shift();
                            fn();
                        }
                    }
                }, true);

                return function nextTick(fn) {
                    queue.push(fn);
                    window.postMessage('process-tick', '*');
                };
            }

            return function nextTick(fn) {
                setTimeout(fn, 0);
            };
        })();

        process.title = 'browser';
        process.browser = true;
        process.env = {};
        process.argv = [];

        function noop() {
        }

        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;

        process.binding = function (name) {
            throw new Error('process.binding is not supported');
        }

// TODO(shtylman)
        process.cwd = function () {
            return '/'
        };
        process.chdir = function (dir) {
            throw new Error('process.chdir is not supported');
        };


    }, {}], 2: [function (require, module, exports) {
        var CardsBlock = require('./cardsBlock');

        ReactDOM.render(
            React.createElement(CardsBlock, {url: "/data.json"}),
            document.getElementById('app')
        );


    }, {"./cardsBlock": 4}], 3: [function (require, module, exports) {
        module.exports = React.createClass({
            displayName: "exports",

            handleCardEdit: function () {
                var self = this;
                console.log("Card edit " + self.props.title);
            },

            handleCardPrint: function () {
                var self = this;
                console.log("Card print " + self.props.title);
            },

            handleCardShare: function () {
                var self = this;
                console.log("Card share " + self.props.title);
            },

            getDefaultProps: function () {
                return {
                    "link": "#",
                    "icon": "hidden",
                    "title": "New card",
                    "description": "",
                    "backgroundImage": ""
                };
            },

            render: function () {
                return (
                    React.createElement("article", {
                            className: "card",
                            style: {backgroundImage: 'url(' + this.props.backgroundImage + ')'}
                        },
                        React.createElement("a", {className: "card__wrap", href: this.props.link},
                            React.createElement("h2", {className: "card__title"},
                                React.createElement("i", {className: 'card__icon fa ' + this.props.icon}),
                                this.props.title
                            ),
                            React.createElement("div", {className: "card__content"},
                                React.createElement("p", null, this.props.description)
                            )
                        ),
                        React.createElement("div", {className: "card__controls"},
                            React.createElement("div", {className: "card__controls-item"},
                                React.createElement("button", {className: "card__button", onClick: this.handleCardEdit},
                                    React.createElement("i", {className: "fa fa-pencil"})
                                )
                            ),
                            React.createElement("div", {className: "card__controls-item"},
                                React.createElement("button", {
                                        className: "card__button",
                                        onClick: this.handleCardPrint
                                    },
                                    React.createElement("i", {className: "fa fa-print"})
                                )
                            ),
                            React.createElement("div", {className: "card__controls-item"},
                                React.createElement("button", {
                                        className: "card__button",
                                        onClick: this.handleCardShare
                                    },
                                    React.createElement("i", {className: "fa fa-share"})
                                )
                            )
                        )
                    )
                );
            }
        });


    }, {}], 4: [function (require, module, exports) {
        var qwest = require('./lib/qwest');
        var CardsList = require('./cardsList');

        module.exports = React.createClass({
            displayName: "exports",
            loadCardsFromServer: function () {
                //todo: move request logic to reusable resource
                var self = this;

                qwest.get(this.props.url)
                    .then(function (xhr, data) {
                        self.setState({data: data});
                    })
                    .catch(function (xhr, data, error) {
                        console.error(error);
                    });
            },

            getInitialState: function () {
                return {data: []};
            },

            componentDidMount: function () {
                this.loadCardsFromServer();
            },

            render: function () {
                return (
                    React.createElement("section", {className: "cards-block"},
                        React.createElement("div", {className: "cards-block__wrap"},
                            React.createElement("h1", {className: "cards-block__title"}, "Some cards"),
                            React.createElement(CardsList, {data: this.state.data})
                        )
                    )
                );
            }
        });


    }, {"./cardsList": 5, "./lib/qwest": 6}], 5: [function (require, module, exports) {
        var Card = require('./card');

        module.exports = React.createClass({
            displayName: "exports",
            render: function () {
                var cardsItems = this.props.data.map(function (card) {
                    return (
                        React.createElement("div", {
                                className: "cards-list__item grid__item one-quarter lap--one-half palm--one-whole",
                                key: card.id
                            },
                            React.createElement(Card, {
                                    link: card.link,
                                    icon: card.icon,
                                    title: card.title,
                                    description: card.description,
                                    backgroundImage: card.backgroundImage
                                }
                            )
                        )
                    );
                });

                return (
                    React.createElement("div", {className: "cards-list grid"},
                        cardsItems
                    )
                );
            }
        });


    }, {"./card": 3}], 6: [function (require, module, exports) {
        (function (process, global) {
//qwest: https://github.com/pyrsmk/qwest
            !function (e) {
                if ("object" == typeof exports && "undefined" != typeof module)module.exports = e(); else if ("function" == typeof define && define.amd)define([], e); else {
                    var t;
                    t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.qwest = e()
                }
            }(function () {
                var define, module, exports;
                return function e(t, n, o) {
                    function r(i, a) {
                        if (!n[i]) {
                            if (!t[i]) {
                                var p = "function" == typeof require && require;
                                if (!a && p)return p(i, !0);
                                if (s)return s(i, !0);
                                var u = new Error("Cannot find module '" + i + "'");
                                throw u.code = "MODULE_NOT_FOUND", u
                            }
                            var d = n[i] = {exports: {}};
                            t[i][0].call(d.exports, function (e) {
                                var n = t[i][1][e];
                                return r(n ? n : e)
                            }, d, d.exports, e, t, n, o)
                        }
                        return n[i].exports
                    }

                    for (var s = "function" == typeof require && require, i = 0; i < o.length; i++)r(o[i]);
                    return r
                }({
                    1: [function (e, t, n) {
                        !function (e) {
                            "use strict";
                            var n = function (e) {
                                var t = function (e, t, n) {
                                    n = "function" == typeof n ? n() : null === n ? "" : void 0 === n ? "" : n, e[e.length] = encodeURIComponent(t) + "=" + encodeURIComponent(n)
                                }, n = function (e, o, r) {
                                    var s, i, a;
                                    if ("[object Array]" === Object.prototype.toString.call(o))for (s = 0, i = o.length; i > s; s++)n(e + "[" + ("object" == typeof o[s] ? s : "") + "]", o[s], r); else if (o && "[object Object]" === o.toString())for (a in o)o.hasOwnProperty(a) && (e ? n(e + "[" + a + "]", o[a], r, t) : n(a, o[a], r, t)); else if (e)t(r, e, o); else for (a in o)t(r, a, o[a]);
                                    return r
                                };
                                return n("", e, []).join("&").replace(/%20/g, "+")
                            };
                            "object" == typeof t && "object" == typeof t.exports ? t.exports = n : "function" == typeof define && define.amd ? define([], function () {
                                return n
                            }) : e.param = n
                        }(this)
                    }, {}], 2: [function (e, t, n) {
                        !function (e) {
                            function t(e) {
                                return "function" == typeof e
                            }

                            function n(e) {
                                return "object" == typeof e
                            }

                            function o(e) {
                                "undefined" != typeof setImmediate ? setImmediate(e) : "undefined" != typeof process && process.nextTick ? process.nextTick(e) : setTimeout(e, 0)
                            }

                            var r;
                            e[0][e[1]] = function s(e) {
                                var i, a = [], p = [], u = function (e, t) {
                                    return null == i && null != e && (i = e, a = t, p.length && o(function () {
                                        for (var e = 0; e < p.length; e++)p[e]()
                                    })), i
                                };
                                return u.then = function (u, d) {
                                    var c = s(e), f = function () {
                                        function e(o) {
                                            var s, i = 0;
                                            try {
                                                if (o && (n(o) || t(o)) && t(s = o.then)) {
                                                    if (o === c)throw new TypeError;
                                                    s.call(o, function () {
                                                        i++ || e.apply(r, arguments)
                                                    }, function (e) {
                                                        i++ || c(!1, [e])
                                                    })
                                                } else c(!0, arguments)
                                            } catch (a) {
                                                i++ || c(!1, [a])
                                            }
                                        }

                                        try {
                                            var o = i ? u : d;
                                            t(o) ? e(o.apply(r, a || [])) : c(i, a)
                                        } catch (s) {
                                            c(!1, [s])
                                        }
                                    };
                                    return null != i ? o(f) : p.push(f), c
                                }, e && (u = e(u)), u
                            }
                        }("undefined" == typeof t ? [window, "pinkySwear"] : [t, "exports"])
                    }, {}], qwest: [function (_dereq_, module, exports) {
                        module.exports = function () {
                            var global = window || this, pinkyswear = _dereq_("pinkyswear"), jparam = _dereq_("jquery-param"), defaultXdrResponseType = "json", defaultDataType = "post", limit = null, requests = 0, request_stack = [], getXHR = function () {
                                return global.XMLHttpRequest ? new global.XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP")
                            }, xhr2 = "" === getXHR().responseType, qwest = function (method, url, data, options, before) {
                                method = method.toUpperCase(), data = data || null, options = options || {};
                                var nativeResponseParsing = !1, crossOrigin, xhr, xdr = !1, timeoutInterval, aborted = !1, attempts = 0, headers = {}, mimeTypes = {
                                    text: "*/*",
                                    xml: "text/xml",
                                    json: "application/json",
                                    post: "application/x-www-form-urlencoded"
                                }, accept = {
                                    text: "*/*",
                                    xml: "application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1",
                                    json: "application/json; q=1.0, text/*; q=0.8, */*; q=0.1"
                                }, vars = "", i, j, serialized, response, sending = !1, delayed = !1, timeout_start, promise = pinkyswear(function (e) {
                                    if (e["catch"] = function (t) {
                                            return e.then(null, t)
                                        }, e.complete = function (t) {
                                            return e.then(t, t)
                                        }, "pinkyswear" in options)for (i in options.pinkyswear)e[i] = options.pinkyswear[i];
                                    return e.send = function () {
                                        if (!sending) {
                                            if (requests == limit)return void request_stack.push(e);
                                            if (++requests, sending = !0, timeout_start = (new Date).getTime(), xhr = getXHR(), crossOrigin && ("withCredentials" in xhr || !global.XDomainRequest || (xhr = new XDomainRequest, xdr = !0, "GET" != method && "POST" != method && (method = "POST"))), xdr ? xhr.open(method, url) : (xhr.open(method, url, options.async, options.user, options.password), xhr2 && options.async && (xhr.withCredentials = options.withCredentials)), !xdr)for (var t in headers)headers[t] && xhr.setRequestHeader(t, headers[t]);
                                            if (xhr2 && "document" != options.responseType && "auto" != options.responseType)try {
                                                xhr.responseType = options.responseType, nativeResponseParsing = xhr.responseType == options.responseType
                                            } catch (n) {
                                            }
                                            xhr2 || xdr ? (xhr.onload = handleResponse, xhr.onerror = handleError) : xhr.onreadystatechange = function () {
                                                4 == xhr.readyState && handleResponse()
                                            }, "auto" != options.responseType && "overrideMimeType" in xhr && xhr.overrideMimeType(mimeTypes[options.responseType]), before && before(xhr), xdr ? (xhr.onprogress = function () {
                                            }, xhr.ontimeout = function () {
                                            }, xhr.onerror = function () {
                                            }, setTimeout(function () {
                                                xhr.send("GET" != method ? data : null)
                                            }, 0)) : xhr.send("GET" != method ? data : null)
                                        }
                                    }, e
                                }), handleResponse = function () {
                                    var i, responseType;
                                    if (--requests, sending = !1, (new Date).getTime() - timeout_start >= options.timeout)return void(options.attempts && ++attempts == options.attempts ? promise(!1, [xhr, response, new Error("Timeout (" + url + ")")]) : promise.send());
                                    request_stack.length && request_stack.shift().send();
                                    try {
                                        if (nativeResponseParsing && "response" in xhr && null !== xhr.response)response = xhr.response; else if ("document" == options.responseType) {
                                            var frame = document.createElement("iframe");
                                            frame.style.display = "none", document.body.appendChild(frame), frame.contentDocument.open(), frame.contentDocument.write(xhr.response), frame.contentDocument.close(), response = frame.contentDocument, document.body.removeChild(frame)
                                        } else {
                                            if (responseType = options.responseType, "auto" == responseType)if (xdr)responseType = defaultXdrResponseType; else {
                                                var ct = xhr.getResponseHeader("Content-Type") || "";
                                                responseType = ct.indexOf(mimeTypes.json) > -1 ? "json" : ct.indexOf(mimeTypes.xml) > -1 ? "xml" : "text"
                                            }
                                            switch (responseType) {
                                                case"json":
                                                    try {
                                                        response = "JSON" in global ? JSON.parse(xhr.responseText) : eval("(" + xhr.responseText + ")")
                                                    } catch (e) {
                                                        throw"Error while parsing JSON body : " + e
                                                    }
                                                    break;
                                                case"xml":
                                                    try {
                                                        global.DOMParser ? response = (new DOMParser).parseFromString(xhr.responseText, "text/xml") : (response = new ActiveXObject("Microsoft.XMLDOM"), response.async = "false", response.loadXML(xhr.responseText))
                                                    } catch (e) {
                                                        response = void 0
                                                    }
                                                    if (!response || !response.documentElement || response.getElementsByTagName("parsererror").length)throw"Invalid XML";
                                                    break;
                                                default:
                                                    response = xhr.responseText
                                            }
                                        }
                                        if ("status" in xhr && !/^2|1223/.test(xhr.status))throw xhr.status + " (" + xhr.statusText + ")";
                                        promise(!0, [xhr, response])
                                    } catch (e) {
                                        promise(!1, [xhr, response, e])
                                    }
                                }, handleError = function (e) {
                                    --requests, promise(!1, [xhr, null, new Error("Connection aborted")])
                                };
                                switch (options.async = "async" in options ? !!options.async : !0, options.cache = "cache" in options ? !!options.cache : !1, options.dataType = "dataType" in options ? options.dataType.toLowerCase() : defaultDataType, options.responseType = "responseType" in options ? options.responseType.toLowerCase() : "auto", options.user = options.user || "", options.password = options.password || "", options.withCredentials = !!options.withCredentials, options.timeout = "timeout" in options ? parseInt(options.timeout, 10) : 3e4, options.attempts = "attempts" in options ? parseInt(options.attempts, 10) : 1, i = url.match(/\/\/(.+?)\//), crossOrigin = i && (i[1] ? i[1] != location.host : !1), "ArrayBuffer" in global && data instanceof ArrayBuffer ? options.dataType = "arraybuffer" : "Blob" in global && data instanceof Blob ? options.dataType = "blob" : "Document" in global && data instanceof Document ? options.dataType = "document" : "FormData" in global && data instanceof FormData && (options.dataType = "formdata"), options.dataType) {
                                    case"json":
                                        data = JSON.stringify(data);
                                        break;
                                    case"post":
                                        data = jparam(data)
                                }
                                if (options.headers) {
                                    var format = function (e, t, n) {
                                        return t + n.toUpperCase()
                                    };
                                    for (i in options.headers)headers[i.replace(/(^|-)([^-])/g, format)] = options.headers[i]
                                }
                                return "Content-Type" in headers || "GET" == method || options.dataType in mimeTypes && mimeTypes[options.dataType] && (headers["Content-Type"] = mimeTypes[options.dataType]), headers.Accept || (headers.Accept = options.responseType in accept ? accept[options.responseType] : "*/*"), crossOrigin || "X-Requested-With" in headers || (headers["X-Requested-With"] = "XMLHttpRequest"), options.cache || "Cache-Control" in headers || (headers["Cache-Control"] = "no-cache"), "GET" == method && data && (vars += data), vars && (url += (/\?/.test(url) ? "&" : "?") + vars), options.async && promise.send(), promise
                            };
                            return {
                                base: "", get: function (e, t, n, o) {
                                    return qwest("GET", this.base + e, t, n, o)
                                }, post: function (e, t, n, o) {
                                    return qwest("POST", this.base + e, t, n, o)
                                }, put: function (e, t, n, o) {
                                    return qwest("PUT", this.base + e, t, n, o)
                                }, "delete": function (e, t, n, o) {
                                    return qwest("DELETE", this.base + e, t, n, o)
                                }, map: function (e, t, n, o, r) {
                                    return qwest(e.toUpperCase(), this.base + t, n, o, r)
                                }, xhr2: xhr2, limit: function (e) {
                                    limit = e
                                }, setDefaultXdrResponseType: function (e) {
                                    defaultXdrResponseType = e.toLowerCase()
                                }, setDefaultDataType: function (e) {
                                    defaultDataType = e.toLowerCase()
                                }
                            }
                        }()
                    }, {"jquery-param": 1, pinkyswear: 2}]
                }, {}, [1, 2])("qwest")
            });

        }).call(this, require("J9ahP5"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"J9ahP5": 1}]
}, {}, [2])