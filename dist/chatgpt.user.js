// ==UserScript==
// @name               ChatGPT Exporter
// @name:zh-CN         ChatGPT Exporter
// @name:zh-TW         ChatGPT Exporter
// @namespace          asimihsan
// @version            2.29.10
// @author             asimihsan
// @description        Easily export the whole ChatGPT conversation history for further analysis or sharing.
// @description:zh-CN  轻松导出 ChatGPT 聊天记录，以便进一步分析或分享。
// @description:zh-TW  輕鬆匯出 ChatGPT 聊天紀錄，以便進一步分析或分享。
// @license            MPL-2.0 AND MIT
// @icon               https://chat.openai.com/favicon.ico
// @homepage           https://github.com/asimihsan/chatgpt-exporter
// @homepageURL        https://github.com/asimihsan/chatgpt-exporter
// @source             https://github.com/asimihsan/chatgpt-exporter.git
// @supportURL         https://github.com/asimihsan/chatgpt-exporter/issues
// @downloadURL        https://raw.githubusercontent.com/asimihsan/chatgpt-exporter/master/dist/chatgpt.user.js
// @updateURL          https://raw.githubusercontent.com/asimihsan/chatgpt-exporter/master/dist/chatgpt.meta.js
// @match              https://chat.openai.com/
// @match              https://chat.openai.com/?model=*
// @match              https://chat.openai.com/c/*
// @match              https://chat.openai.com/g/*
// @match              https://chat.openai.com/gpts
// @match              https://chat.openai.com/gpts/*
// @match              https://chat.openai.com/share/*
// @match              https://chat.openai.com/share/*/continue
// @match              https://chat.openai.com/codex/security/*
// @match              https://chatgpt.com/
// @match              https://chatgpt.com/?model=*
// @match              https://chatgpt.com/c/*
// @match              https://chatgpt.com/g/*
// @match              https://chatgpt.com/gpts
// @match              https://chatgpt.com/gpts/*
// @match              https://chatgpt.com/share/*
// @match              https://chatgpt.com/share/*/continue
// @match              https://chatgpt.com/codex/security/*
// @match              https://new.oaifree.com/
// @match              https://new.oaifree.com/?model=*
// @match              https://new.oaifree.com/c/*
// @match              https://new.oaifree.com/g/*
// @match              https://new.oaifree.com/gpts
// @match              https://new.oaifree.com/gpts/*
// @match              https://new.oaifree.com/share/*
// @match              https://new.oaifree.com/share/*/continue
// @match              https://new.oaifree.com/codex/security/*
// @require            https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js
// @require            https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js
// @grant              GM.registerMenuCommand
// @grant              GM_deleteValue
// @grant              GM_getValue
// @grant              GM_registerMenuCommand
// @grant              GM_setValue
// @grant              unsafeWindow
// @run-at             document-end
// ==/UserScript==

(function (JSZip, html2canvas) {
  'use strict';

  const n$1=new Set;const importCSS = async t=>{n$1.has(t)||(n$1.add(t),(d=>{const e=document.createElement("style");e.textContent=d,document.head.append(e),setInterval(()=>{e.isConnected||document.head.append(e);},300);})(t));};

  var n, l$1, u$2, i$1, r$1, o$1, e$1, f$2, c$1, s$1, a$1, h$1, p$2 = {}, v$1 = [], y$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, d$1 = Array.isArray;
  function w$2(n2, l2) {
    for (var u2 in l2) n2[u2] = l2[u2];
    return n2;
  }
  function g$2(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function _$1(l2, u2, t2) {
    var i2, r2, o2, e2 = {};
    for (o2 in u2) "key" == o2 ? i2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : e2[o2] = u2[o2];
    if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (o2 in l2.defaultProps) void 0 === e2[o2] && (e2[o2] = l2.defaultProps[o2]);
    return m$1(l2, e2, i2, r2, null);
  }
  function m$1(n2, t2, i2, r2, o2) {
    var e2 = { type: n2, props: t2, key: i2, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o2 ? ++u$2 : o2, __i: -1, __u: 0 };
    return null == o2 && null != l$1.vnode && l$1.vnode(e2), e2;
  }
  function b$1() {
    return { current: null };
  }
  function k$2(n2) {
    return n2.children;
  }
  function x$2(n2, l2) {
    this.props = n2, this.context = l2;
  }
  function S(n2, l2) {
    if (null == l2) return n2.__ ? S(n2.__, n2.__i + 1) : null;
    for (var u2; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) return u2.__e;
    return "function" == typeof n2.type ? S(n2) : null;
  }
  function C$2(n2) {
    if (n2.__P && n2.__d) {
      var u2 = n2.__v, t2 = u2.__e, i2 = [], r2 = [], o2 = w$2({}, u2);
      o2.__v = u2.__v + 1, l$1.vnode && l$1.vnode(o2), z$2(n2.__P, o2, u2, n2.__n, n2.__P.namespaceURI, 32 & u2.__u ? [t2] : null, i2, null == t2 ? S(u2) : t2, !!(32 & u2.__u), r2), o2.__v = u2.__v, o2.__.__k[o2.__i] = o2, V$1(i2, o2, r2), u2.__e = u2.__ = null, o2.__e != t2 && M$1(o2);
    }
  }
  function M$1(n2) {
    if (null != (n2 = n2.__) && null != n2.__c) return n2.__e = n2.__c.base = null, n2.__k.some(function(l2) {
      if (null != l2 && null != l2.__e) return n2.__e = n2.__c.base = l2.__e;
    }), M$1(n2);
  }
  function $$1(n2) {
    (!n2.__d && (n2.__d = true) && i$1.push(n2) && !I$1.__r++ || r$1 != l$1.debounceRendering) && ((r$1 = l$1.debounceRendering) || o$1)(I$1);
  }
  function I$1() {
    for (var n2, l2 = 1; i$1.length; ) i$1.length > l2 && i$1.sort(e$1), n2 = i$1.shift(), l2 = i$1.length, C$2(n2);
    I$1.__r = 0;
  }
  function P$2(n2, l2, u2, t2, i2, r2, o2, e2, f2, c2, s2) {
    var a2, h2, y2, d2, w2, g2, _2, m2 = t2 && t2.__k || v$1, b2 = l2.length;
    for (f2 = A$2(u2, l2, m2, f2, b2), a2 = 0; a2 < b2; a2++) null != (y2 = u2.__k[a2]) && (h2 = -1 != y2.__i && m2[y2.__i] || p$2, y2.__i = a2, g2 = z$2(n2, y2, h2, i2, r2, o2, e2, f2, c2, s2), d2 = y2.__e, y2.ref && h2.ref != y2.ref && (h2.ref && D$2(h2.ref, null, y2), s2.push(y2.ref, y2.__c || d2, y2)), null == w2 && null != d2 && (w2 = d2), (_2 = !!(4 & y2.__u)) || h2.__k === y2.__k ? f2 = H$1(y2, f2, n2, _2) : "function" == typeof y2.type && void 0 !== g2 ? f2 = g2 : d2 && (f2 = d2.nextSibling), y2.__u &= -7);
    return u2.__e = w2, f2;
  }
  function A$2(n2, l2, u2, t2, i2) {
    var r2, o2, e2, f2, c2, s2 = u2.length, a2 = s2, h2 = 0;
    for (n2.__k = new Array(i2), r2 = 0; r2 < i2; r2++) null != (o2 = l2[r2]) && "boolean" != typeof o2 && "function" != typeof o2 ? ("string" == typeof o2 || "number" == typeof o2 || "bigint" == typeof o2 || o2.constructor == String ? o2 = n2.__k[r2] = m$1(null, o2, null, null, null) : d$1(o2) ? o2 = n2.__k[r2] = m$1(k$2, { children: o2 }, null, null, null) : void 0 === o2.constructor && o2.__b > 0 ? o2 = n2.__k[r2] = m$1(o2.type, o2.props, o2.key, o2.ref ? o2.ref : null, o2.__v) : n2.__k[r2] = o2, f2 = r2 + h2, o2.__ = n2, o2.__b = n2.__b + 1, e2 = null, -1 != (c2 = o2.__i = T$2(o2, u2, f2, a2)) && (a2--, (e2 = u2[c2]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c2 && (i2 > s2 ? h2-- : i2 < s2 && h2++), "function" != typeof o2.type && (o2.__u |= 4)) : c2 != f2 && (c2 == f2 - 1 ? h2-- : c2 == f2 + 1 ? h2++ : (c2 > f2 ? h2-- : h2++, o2.__u |= 4))) : n2.__k[r2] = null;
    if (a2) for (r2 = 0; r2 < s2; r2++) null != (e2 = u2[r2]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = S(e2)), E$1(e2, e2));
    return t2;
  }
  function H$1(n2, l2, u2, t2) {
    var i2, r2;
    if ("function" == typeof n2.type) {
      for (i2 = n2.__k, r2 = 0; i2 && r2 < i2.length; r2++) i2[r2] && (i2[r2].__ = n2, l2 = H$1(i2[r2], l2, u2, t2));
      return l2;
    }
    n2.__e != l2 && (t2 && (l2 && n2.type && !l2.parentNode && (l2 = S(n2)), u2.insertBefore(n2.__e, l2 || null)), l2 = n2.__e);
    do {
      l2 = l2 && l2.nextSibling;
    } while (null != l2 && 8 == l2.nodeType);
    return l2;
  }
  function L$1(n2, l2) {
    return l2 = l2 || [], null == n2 || "boolean" == typeof n2 || (d$1(n2) ? n2.some(function(n3) {
      L$1(n3, l2);
    }) : l2.push(n2)), l2;
  }
  function T$2(n2, l2, u2, t2) {
    var i2, r2, o2, e2 = n2.key, f2 = n2.type, c2 = l2[u2], s2 = null != c2 && 0 == (2 & c2.__u);
    if (null === c2 && null == e2 || s2 && e2 == c2.key && f2 == c2.type) return u2;
    if (t2 > (s2 ? 1 : 0)) {
      for (i2 = u2 - 1, r2 = u2 + 1; i2 >= 0 || r2 < l2.length; ) if (null != (c2 = l2[o2 = i2 >= 0 ? i2-- : r2++]) && 0 == (2 & c2.__u) && e2 == c2.key && f2 == c2.type) return o2;
    }
    return -1;
  }
  function j$2(n2, l2, u2) {
    "-" == l2[0] ? n2.setProperty(l2, null == u2 ? "" : u2) : n2[l2] = null == u2 ? "" : "number" != typeof u2 || y$1.test(l2) ? u2 : u2 + "px";
  }
  function F$2(n2, l2, u2, t2, i2) {
    var r2, o2;
    n: if ("style" == l2) if ("string" == typeof u2) n2.style.cssText = u2;
    else {
      if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u2 && l2 in u2 || j$2(n2.style, l2, "");
      if (u2) for (l2 in u2) t2 && u2[l2] == t2[l2] || j$2(n2.style, l2, u2[l2]);
    }
    else if ("o" == l2[0] && "n" == l2[1]) r2 = l2 != (l2 = l2.replace(f$2, "$1")), o2 = l2.toLowerCase(), l2 = o2 in n2 || "onFocusOut" == l2 || "onFocusIn" == l2 ? o2.slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u2, u2 ? t2 ? u2.u = t2.u : (u2.u = c$1, n2.addEventListener(l2, r2 ? a$1 : s$1, r2)) : n2.removeEventListener(l2, r2 ? a$1 : s$1, r2);
    else {
      if ("http://www.w3.org/2000/svg" == i2) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l2 && "height" != l2 && "href" != l2 && "list" != l2 && "form" != l2 && "tabIndex" != l2 && "download" != l2 && "rowSpan" != l2 && "colSpan" != l2 && "role" != l2 && "popover" != l2 && l2 in n2) try {
        n2[l2] = null == u2 ? "" : u2;
        break n;
      } catch (n3) {
      }
      "function" == typeof u2 || (null == u2 || false === u2 && "-" != l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, "popover" == l2 && 1 == u2 ? "" : u2));
    }
  }
  function O$1(n2) {
    return function(u2) {
      if (this.l) {
        var t2 = this.l[u2.type + n2];
        if (null == u2.t) u2.t = c$1++;
        else if (u2.t < t2.u) return;
        return t2(l$1.event ? l$1.event(u2) : u2);
      }
    };
  }
  function z$2(n2, u2, t2, i2, r2, o2, e2, f2, c2, s2) {
    var a2, h2, p2, y2, _2, m2, b2, S2, C2, M2, $2, I2, A2, H2, L2, T2 = u2.type;
    if (void 0 !== u2.constructor) return null;
    128 & t2.__u && (c2 = !!(32 & t2.__u), o2 = [f2 = u2.__e = t2.__e]), (a2 = l$1.__b) && a2(u2);
    n: if ("function" == typeof T2) try {
      if (S2 = u2.props, C2 = "prototype" in T2 && T2.prototype.render, M2 = (a2 = T2.contextType) && i2[a2.__c], $2 = a2 ? M2 ? M2.props.value : a2.__ : i2, t2.__c ? b2 = (h2 = u2.__c = t2.__c).__ = h2.__E : (C2 ? u2.__c = h2 = new T2(S2, $2) : (u2.__c = h2 = new x$2(S2, $2), h2.constructor = T2, h2.render = G$1), M2 && M2.sub(h2), h2.state || (h2.state = {}), h2.__n = i2, p2 = h2.__d = true, h2.__h = [], h2._sb = []), C2 && null == h2.__s && (h2.__s = h2.state), C2 && null != T2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = w$2({}, h2.__s)), w$2(h2.__s, T2.getDerivedStateFromProps(S2, h2.__s))), y2 = h2.props, _2 = h2.state, h2.__v = u2, p2) C2 && null == T2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), C2 && null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
      else {
        if (C2 && null == T2.getDerivedStateFromProps && S2 !== y2 && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(S2, $2), u2.__v == t2.__v || !h2.__e && null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(S2, h2.__s, $2)) {
          u2.__v != t2.__v && (h2.props = S2, h2.state = h2.__s, h2.__d = false), u2.__e = t2.__e, u2.__k = t2.__k, u2.__k.some(function(n3) {
            n3 && (n3.__ = u2);
          }), v$1.push.apply(h2.__h, h2._sb), h2._sb = [], h2.__h.length && e2.push(h2);
          break n;
        }
        null != h2.componentWillUpdate && h2.componentWillUpdate(S2, h2.__s, $2), C2 && null != h2.componentDidUpdate && h2.__h.push(function() {
          h2.componentDidUpdate(y2, _2, m2);
        });
      }
      if (h2.context = $2, h2.props = S2, h2.__P = n2, h2.__e = false, I2 = l$1.__r, A2 = 0, C2) h2.state = h2.__s, h2.__d = false, I2 && I2(u2), a2 = h2.render(h2.props, h2.state, h2.context), v$1.push.apply(h2.__h, h2._sb), h2._sb = [];
      else do {
        h2.__d = false, I2 && I2(u2), a2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
      } while (h2.__d && ++A2 < 25);
      h2.state = h2.__s, null != h2.getChildContext && (i2 = w$2(w$2({}, i2), h2.getChildContext())), C2 && !p2 && null != h2.getSnapshotBeforeUpdate && (m2 = h2.getSnapshotBeforeUpdate(y2, _2)), H2 = null != a2 && a2.type === k$2 && null == a2.key ? q$2(a2.props.children) : a2, f2 = P$2(n2, d$1(H2) ? H2 : [H2], u2, t2, i2, r2, o2, e2, f2, c2, s2), h2.base = u2.__e, u2.__u &= -161, h2.__h.length && e2.push(h2), b2 && (h2.__E = h2.__ = null);
    } catch (n3) {
      if (u2.__v = null, c2 || null != o2) if (n3.then) {
        for (u2.__u |= c2 ? 160 : 128; f2 && 8 == f2.nodeType && f2.nextSibling; ) f2 = f2.nextSibling;
        o2[o2.indexOf(f2)] = null, u2.__e = f2;
      } else {
        for (L2 = o2.length; L2--; ) g$2(o2[L2]);
        N$1(u2);
      }
      else u2.__e = t2.__e, u2.__k = t2.__k, n3.then || N$1(u2);
      l$1.__e(n3, u2, t2);
    }
    else null == o2 && u2.__v == t2.__v ? (u2.__k = t2.__k, u2.__e = t2.__e) : f2 = u2.__e = B$2(t2.__e, u2, t2, i2, r2, o2, e2, c2, s2);
    return (a2 = l$1.diffed) && a2(u2), 128 & u2.__u ? void 0 : f2;
  }
  function N$1(n2) {
    n2 && (n2.__c && (n2.__c.__e = true), n2.__k && n2.__k.some(N$1));
  }
  function V$1(n2, u2, t2) {
    for (var i2 = 0; i2 < t2.length; i2++) D$2(t2[i2], t2[++i2], t2[++i2]);
    l$1.__c && l$1.__c(u2, n2), n2.some(function(u3) {
      try {
        n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
          n3.call(u3);
        });
      } catch (n3) {
        l$1.__e(n3, u3.__v);
      }
    });
  }
  function q$2(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b > 0 ? n2 : d$1(n2) ? n2.map(q$2) : w$2({}, n2);
  }
  function B$2(u2, t2, i2, r2, o2, e2, f2, c2, s2) {
    var a2, h2, v2, y2, w2, _2, m2, b2 = i2.props || p$2, k2 = t2.props, x2 = t2.type;
    if ("svg" == x2 ? o2 = "http://www.w3.org/2000/svg" : "math" == x2 ? o2 = "http://www.w3.org/1998/Math/MathML" : o2 || (o2 = "http://www.w3.org/1999/xhtml"), null != e2) {
      for (a2 = 0; a2 < e2.length; a2++) if ((w2 = e2[a2]) && "setAttribute" in w2 == !!x2 && (x2 ? w2.localName == x2 : 3 == w2.nodeType)) {
        u2 = w2, e2[a2] = null;
        break;
      }
    }
    if (null == u2) {
      if (null == x2) return document.createTextNode(k2);
      u2 = document.createElementNS(o2, x2, k2.is && k2), c2 && (l$1.__m && l$1.__m(t2, e2), c2 = false), e2 = null;
    }
    if (null == x2) b2 === k2 || c2 && u2.data == k2 || (u2.data = k2);
    else {
      if (e2 = e2 && n.call(u2.childNodes), !c2 && null != e2) for (b2 = {}, a2 = 0; a2 < u2.attributes.length; a2++) b2[(w2 = u2.attributes[a2]).name] = w2.value;
      for (a2 in b2) w2 = b2[a2], "dangerouslySetInnerHTML" == a2 ? v2 = w2 : "children" == a2 || a2 in k2 || "value" == a2 && "defaultValue" in k2 || "checked" == a2 && "defaultChecked" in k2 || F$2(u2, a2, null, w2, o2);
      for (a2 in k2) w2 = k2[a2], "children" == a2 ? y2 = w2 : "dangerouslySetInnerHTML" == a2 ? h2 = w2 : "value" == a2 ? _2 = w2 : "checked" == a2 ? m2 = w2 : c2 && "function" != typeof w2 || b2[a2] === w2 || F$2(u2, a2, w2, b2[a2], o2);
      if (h2) c2 || v2 && (h2.__html == v2.__html || h2.__html == u2.innerHTML) || (u2.innerHTML = h2.__html), t2.__k = [];
      else if (v2 && (u2.innerHTML = ""), P$2("template" == t2.type ? u2.content : u2, d$1(y2) ? y2 : [y2], t2, i2, r2, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o2, e2, f2, e2 ? e2[0] : i2.__k && S(i2, 0), c2, s2), null != e2) for (a2 = e2.length; a2--; ) g$2(e2[a2]);
      c2 || (a2 = "value", "progress" == x2 && null == _2 ? u2.removeAttribute("value") : null != _2 && (_2 !== u2[a2] || "progress" == x2 && !_2 || "option" == x2 && _2 != b2[a2]) && F$2(u2, a2, _2, b2[a2], o2), a2 = "checked", null != m2 && m2 != u2[a2] && F$2(u2, a2, m2, b2[a2], o2));
    }
    return u2;
  }
  function D$2(n2, u2, t2) {
    try {
      if ("function" == typeof n2) {
        var i2 = "function" == typeof n2.__u;
        i2 && n2.__u(), i2 && null == u2 || (n2.__u = n2(u2));
      } else n2.current = u2;
    } catch (n3) {
      l$1.__e(n3, t2);
    }
  }
  function E$1(n2, u2, t2) {
    var i2, r2;
    if (l$1.unmount && l$1.unmount(n2), (i2 = n2.ref) && (i2.current && i2.current != n2.__e || D$2(i2, null, u2)), null != (i2 = n2.__c)) {
      if (i2.componentWillUnmount) try {
        i2.componentWillUnmount();
      } catch (n3) {
        l$1.__e(n3, u2);
      }
      i2.base = i2.__P = null;
    }
    if (i2 = n2.__k) for (r2 = 0; r2 < i2.length; r2++) i2[r2] && E$1(i2[r2], u2, t2 || "function" != typeof n2.type);
    t2 || g$2(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function G$1(n2, l2, u2) {
    return this.constructor(n2, u2);
  }
  function J$1(u2, t2, i2) {
    var r2, o2, e2, f2;
    t2 == document && (t2 = document.documentElement), l$1.__ && l$1.__(u2, t2), o2 = (r2 = "function" == typeof i2) ? null : i2 && i2.__k || t2.__k, e2 = [], f2 = [], z$2(t2, u2 = (!r2 && i2 || t2).__k = _$1(k$2, null, [u2]), o2 || p$2, p$2, t2.namespaceURI, !r2 && i2 ? [i2] : o2 ? null : t2.firstChild ? n.call(t2.childNodes) : null, e2, !r2 && i2 ? i2 : o2 ? o2.__e : t2.firstChild, r2, f2), V$1(e2, u2, f2);
  }
  function K$1(n2, l2) {
    J$1(n2, l2, K$1);
  }
  function Q$1(l2, u2, t2) {
    var i2, r2, o2, e2, f2 = w$2({}, l2.props);
    for (o2 in l2.type && l2.type.defaultProps && (e2 = l2.type.defaultProps), u2) "key" == o2 ? i2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : f2[o2] = void 0 === u2[o2] && null != e2 ? e2[o2] : u2[o2];
    return arguments.length > 2 && (f2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), m$1(l2.type, f2, i2 || l2.key, r2 || l2.ref, null);
  }
  function R$1(n2) {
    function l2(n3) {
      var u2, t2;
      return this.getChildContext || (u2 = new Set(), (t2 = {})[l2.__c] = this, this.getChildContext = function() {
        return t2;
      }, this.componentWillUnmount = function() {
        u2 = null;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value != n4.value && u2.forEach(function(n5) {
          n5.__e = true, $$1(n5);
        });
      }, this.sub = function(n4) {
        u2.add(n4);
        var l3 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u2 && u2.delete(n4), l3 && l3.call(n4);
        };
      }), n3.children;
    }
    return l2.__c = "__cC" + h$1++, l2.__ = n2, l2.Provider = l2.__l = (l2.Consumer = function(n3, l3) {
      return n3.children(l3);
    }).contextType = l2, l2;
  }
  n = v$1.slice, l$1 = { __e: function(n2, l2, u2, t2) {
    for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
      if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
    } catch (l3) {
      n2 = l3;
    }
    throw n2;
  } }, u$2 = 0, x$2.prototype.setState = function(n2, l2) {
    var u2;
    u2 = null != this.__s && this.__s != this.state ? this.__s : this.__s = w$2({}, this.state), "function" == typeof n2 && (n2 = n2(w$2({}, u2), this.props)), n2 && w$2(u2, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), $$1(this));
  }, x$2.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), $$1(this));
  }, x$2.prototype.render = k$2, i$1 = [], o$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$1 = function(n2, l2) {
    return n2.__v.__b - l2.__v.__b;
  }, I$1.__r = 0, f$2 = /(PointerCapture)$|Capture$/i, c$1 = 0, s$1 = O$1(false), a$1 = O$1(true), h$1 = 0;
  var f$1 = 0;
  function u$1(e2, t2, n2, o2, i2, u2) {
    t2 || (t2 = {});
    var a2, c2, p2 = t2;
    if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
    var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f$1, __i: -1, __u: 0, __source: i2, __self: u2 };
    if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
    return l$1.vnode && l$1.vnode(l2), l2;
  }
  function getDefaultExportFromCjs(x2) {
    return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
  }
  function getAugmentedNamespace(n2) {
    if (Object.prototype.hasOwnProperty.call(n2, "__esModule")) return n2;
    var f2 = n2.default;
    if (typeof f2 == "function") {
      var a2 = function a3() {
        var isInstance = false;
        try {
          isInstance = this instanceof a3;
        } catch {
        }
        if (isInstance) {
          return Reflect.construct(f2, arguments, this.constructor);
        }
        return f2.apply(this, arguments);
      };
      a2.prototype = f2.prototype;
    } else a2 = {};
    Object.defineProperty(a2, "__esModule", { value: true });
    Object.keys(n2).forEach(function(k2) {
      var d2 = Object.getOwnPropertyDescriptor(n2, k2);
      Object.defineProperty(a2, k2, d2.get ? d2 : {
        enumerable: true,
        get: function() {
          return n2[k2];
        }
      });
    });
    return a2;
  }
  var sentinel_umd$1 = { exports: {} };
  var sentinel_umd = sentinel_umd$1.exports;
  var hasRequiredSentinel_umd;
  function requireSentinel_umd() {
    if (hasRequiredSentinel_umd) return sentinel_umd$1.exports;
    hasRequiredSentinel_umd = 1;
    (function(module, exports$1) {
      (function(root2, factory) {
        {
          module.exports = factory();
        }
      })(sentinel_umd, function() {
        var isArray = Array.isArray, selectorToAnimationMap = {}, animationCallbacks = {}, styleEl, styleSheet, cssRules;
        return {
on: function(cssSelectors, callback) {
            if (!callback) return;
            if (!styleEl) {
              var doc = document, head2 = doc.head;
              doc.addEventListener("animationstart", function(ev, callbacks, l2, i2) {
                callbacks = animationCallbacks[ev.animationName];
                if (!callbacks) return;
                ev.stopImmediatePropagation();
                l2 = callbacks.length;
                for (i2 = 0; i2 < l2; i2++) callbacks[i2](ev.target);
              }, true);
              styleEl = doc.getElementById("sentinel-css");
              if (!styleEl) {
                styleEl = doc.createElement("style");
                head2.insertBefore(styleEl, head2.firstChild);
              }
              styleSheet = styleEl.sheet;
              cssRules = styleSheet.cssRules;
            }
            (isArray(cssSelectors) ? cssSelectors : [cssSelectors]).map(function(selector, animId, isCustomName) {
              animId = selectorToAnimationMap[selector];
              if (!animId) {
                isCustomName = selector[0] == "!";
                selectorToAnimationMap[selector] = animId = isCustomName ? selector.slice(1) : "sentinel-" + Math.random().toString(16).slice(2);
                cssRules[styleSheet.insertRule(
                  "@keyframes " + animId + "{from{transform:none;}to{transform:none;}}",
                  cssRules.length
                )]._id = selector;
                if (!isCustomName) {
                  cssRules[styleSheet.insertRule(
                    selector + "{animation-duration:0.0001s;animation-name:" + animId + ";}",
                    cssRules.length
                  )]._id = selector;
                }
                selectorToAnimationMap[selector] = animId;
              }
              (animationCallbacks[animId] = animationCallbacks[animId] || []).push(callback);
            });
          },
off: function(cssSelectors, callback) {
            (isArray(cssSelectors) ? cssSelectors : [cssSelectors]).map(function(selector, animId, callbackList, i2) {
              if (!(animId = selectorToAnimationMap[selector])) return;
              callbackList = animationCallbacks[animId];
              if (callback) {
                i2 = callbackList.length;
                while (i2--) {
                  if (callbackList[i2] === callback) callbackList.splice(i2, 1);
                }
              } else {
                callbackList = [];
              }
              if (callbackList.length) return;
              i2 = cssRules.length;
              while (i2--) {
                if (cssRules[i2]._id == selector) styleSheet.deleteRule(i2);
              }
              delete selectorToAnimationMap[selector];
              delete animationCallbacks[animId];
            });
          },
reset: function() {
            selectorToAnimationMap = {};
            animationCallbacks = {};
            if (styleEl) styleEl.parentNode.removeChild(styleEl);
            styleEl = 0;
          }
        };
      });
    })(sentinel_umd$1);
    return sentinel_umd$1.exports;
  }
  var sentinel_umdExports = requireSentinel_umd();
  const sentinel = getDefaultExportFromCjs(sentinel_umdExports);
  var _GM = (() => typeof GM != "undefined" ? GM : void 0)();
  var _GM_registerMenuCommand = (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _unsafeWindow = (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const API_MAPPING = {
    "https://chat.openai.com": "https://chat.openai.com/backend-api",
    "https://chatgpt.com": "https://chatgpt.com/backend-api",
    "https://new.oaifree.com": "https://new.oaifree.com/backend-api"
  };
  const FALLBACK_BASE_URL = "https://chat.openai.com";
  function getBaseUrl() {
    if (typeof location === "object" && typeof location.href === "string") {
      return new URL(location.href).origin;
    }
    return FALLBACK_BASE_URL;
  }
  const baseUrl = getBaseUrl();
  const apiUrl = API_MAPPING[baseUrl];
  const KEY_LANGUAGE = "exporter:language";
  const KEY_FILENAME_FORMAT = "exporter:filename_format";
  const KEY_TIMESTAMP_ENABLED = "exporter:enable_timestamp";
  const KEY_TIMESTAMP_24H = "exporter:timestamp_24h";
  const KEY_TIMESTAMP_MARKDOWN = "exporter:timestamp_markdown";
  const KEY_TIMESTAMP_HTML = "exporter:timestamp_html";
  const KEY_META_ENABLED = "exporter:enable_meta";
  const KEY_META_LIST = "exporter:meta_list";
  const KEY_EXPORT_ALL_LIMIT = "exporter:export_all_limit";
  const KEY_COPY_TEXT_SHORTCUT_ENABLED = "exporter:enable_copy_text_shortcut";
  const KEY_COPY_TEXT_SHORTCUT = "exporter:copy_text_shortcut";
  const KEY_OAI_LOCALE = "oai/apps/locale";
  const KEY_OAI_HISTORY_DISABLED = "oai/apps/historyDisabled";
  function getBase64FromImg(el) {
    const canvas = document.createElement("canvas");
    canvas.width = el.naturalWidth;
    canvas.height = el.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    ctx.drawImage(el, 0, 0);
    return canvas.toDataURL("image/png");
  }
  async function getBase64FromImageUrl(url) {
    const img = await loadImage(url);
    return getBase64FromImg(img);
  }
  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }
  function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
  function getHistoryDisabled() {
    return localStorage.getItem(KEY_OAI_HISTORY_DISABLED) === '"true"';
  }
  function getPageAccessToken() {
    return _unsafeWindow?.__remixContext?.state?.loaderData?.root?.clientBootstrap?.session?.accessToken ?? null;
  }
  function getUserProfile() {
    const user = _unsafeWindow?.__NEXT_DATA__?.props?.pageProps?.user ?? _unsafeWindow?.__remixContext?.state?.loaderData?.root?.clientBootstrap?.session?.user;
    if (!user) throw new Error("No user found.");
    return user;
  }
  function getChatIdFromUrl() {
    const match = location.pathname.match(/^\/(?:share|c|g\/[a-z0-9-]+\/c)\/([a-z0-9-]+)/i);
    if (match) return match[1];
    return null;
  }
  function isSharePage() {
    return location.pathname.startsWith("/share") && !location.pathname.endsWith("/continue");
  }
  function getConversationFromSharePage() {
    if (window.__NEXT_DATA__?.props?.pageProps?.serverResponse?.data) {
      return JSON.parse(JSON.stringify(window.__NEXT_DATA__.props.pageProps.serverResponse.data));
    }
    if (window.__remixContext?.state?.loaderData?.["routes/share.$shareId.($action)"]?.serverResponse?.data) {
      return JSON.parse(JSON.stringify(window.__remixContext.state.loaderData["routes/share.$shareId.($action)"].serverResponse.data));
    }
    return null;
  }
  const defaultAvatar = "data:image/svg+xml,%3Csvg%20stroke%3D%22currentColor%22%20fill%3D%22none%22%20stroke-width%3D%221.5%22%20viewBox%3D%22-6%20-6%2036%2036%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20style%3D%22color%3A%20white%3B%20background%3A%20%23ab68ff%3B%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M20%2021v-2a4%204%200%200%200-4-4H8a4%204%200%200%200-4%204v2%22%3E%3C%2Fpath%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%227%22%20r%3D%224%22%3E%3C%2Fcircle%3E%3C%2Fsvg%3E";
  async function getUserAvatar() {
    try {
      const { picture } = getUserProfile();
      if (picture) return await getBase64FromImageUrl(picture);
    } catch (e2) {
      console.error(e2);
    }
    try {
      const avatars = Array.from(document.querySelectorAll("img[alt]:not([aria-hidden])"));
      const avatar = avatars.find((avatar2) => !avatar2.src.startsWith("data:"));
      if (avatar) return getBase64FromImg(avatar);
    } catch (e2) {
      console.error(e2);
    }
    return defaultAvatar;
  }
  function checkIfConversationStarted() {
    return !!document.querySelector('[data-testid^="conversation-turn-"]');
  }
  const generateKey = (args) => JSON.stringify(args);
  function memorize(fn2) {
    const cache = new Map();
    const memorized = (...args) => {
      const key2 = generateKey(args);
      if (cache.has(key2)) {
        return cache.get(key2);
      }
      const result = fn2(...args);
      cache.set(key2, result);
      return result;
    };
    return memorized;
  }
  function buildUrl(base, path2, params = {}) {
    const remainingParams = { ...params };
    const resolvedPath = path2.replace(/:([a-z0-9_]+)/gi, (_2, key2) => {
      const value = remainingParams[key2];
      if (value === void 0 || value === null) {
        throw new Error(`Missing path parameter: ${key2}`);
      }
      delete remainingParams[key2];
      return encodeURIComponent(String(value));
    });
    const baseUrl2 = new URL(base);
    const url = new URL(baseUrl2.origin);
    url.pathname = `${baseUrl2.pathname.replace(/\/$/, "")}${resolvedPath}`;
    Object.entries(remainingParams).forEach(([key2, value]) => {
      if (value === void 0 || value === null) {
        return;
      }
      url.searchParams.set(key2, String(value));
    });
    return url.toString();
  }
  const sessionApiUrl = buildUrl(baseUrl, "/api/auth/session");
  const accountsCheckApiUrl = buildUrl(apiUrl, "/accounts/check/v4-2023-04-27");
  const getConversationApiUrl = (id) => buildUrl(apiUrl, "/conversation/:id", { id });
  const getConversationsApiUrl = (offset2, limit) => buildUrl(apiUrl, "/conversations", { offset: offset2, limit });
  const getFileDownloadApiUrl = (id) => buildUrl(apiUrl, "/files/:id/download", { id });
  const getProjectsApiUrl = () => buildUrl(apiUrl, "/gizmos/snorlax/sidebar", { conversations_per_gizmo: 0 });
  const getProjectConversationsApiUrl = (gizmo, offset2, limit) => {
    return buildUrl(apiUrl, "/gizmos/:gizmo/conversations", { gizmo, cursor: offset2, limit });
  };
  const getSecurityFindingApiUrl = (id) => buildUrl(apiUrl, "/aardvark/scan-findings/:id", { id });
  const getSecurityScanConfigurationsApiUrl = (params = {}) => buildUrl(apiUrl, "/aardvark/scan_configurations", {
    repo_id: params.repoId,
    limit: params.limit,
    cursor: params.cursor
  });
  const getSecurityScanConfigurationApiUrl = (id) => buildUrl(apiUrl, "/aardvark/scan_configurations/:id", { id });
  const getSecurityScanConfigurationStatsApiUrl = (id) => buildUrl(apiUrl, "/aardvark/scan_configurations/:id/stats", { id });
  const getSecurityRepoApiUrl = (repoId) => buildUrl(apiUrl, "/wham/github/repositories/:repoId", { repoId });
  async function fetchApi(url, options) {
    const accessToken = await getAccessToken();
    const accountId = await getTeamAccountId();
    const response = await fetch(url, {
      ...options,
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "X-Authorization": `Bearer ${accessToken}`,
        ...accountId ? { "Chatgpt-Account-Id": accountId } : {},
        ...options?.headers
      }
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
  async function _fetchSession() {
    const response = await fetch(sessionApiUrl);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
  const fetchSession = memorize(_fetchSession);
  async function getAccessToken() {
    const pageAccessToken = getPageAccessToken();
    if (pageAccessToken) return pageAccessToken;
    const session = await fetchSession();
    return session.accessToken;
  }
  async function _fetchAccountsCheck() {
    const accessToken = await getAccessToken();
    const response = await fetch(accountsCheckApiUrl, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "X-Authorization": `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
  const fetchAccountsCheck = memorize(_fetchAccountsCheck);
  const getCookie = (key2) => document.cookie.match(`(^|;)\\s*${key2}\\s*=\\s*([^;]+)`)?.pop() || "";
  async function getTeamAccountId() {
    const accountsCheck = await fetchAccountsCheck();
    const workspaceId = getCookie(
      "_account"
);
    if (workspaceId) {
      const account = accountsCheck.accounts[workspaceId];
      if (account) {
        return account.account.account_id;
      }
    }
    return null;
  }
  function isImageAssetPointer(part) {
    if (typeof part !== "object" || part === null) return false;
    const candidate = part;
    return candidate.content_type === "image_asset_pointer" && typeof candidate.asset_pointer === "string" && typeof candidate.fovea === "number" && typeof candidate.height === "number" && typeof candidate.size_bytes === "number" && typeof candidate.width === "number" && candidate.asset_pointer.startsWith("file-service://");
  }
  async function fetchImageFromPointer(uri) {
    const pointer = uri.replace("file-service://", "");
    const imageDetails = await fetchApi(getFileDownloadApiUrl(pointer));
    if (imageDetails.status === "error") {
      console.error("Failed to fetch image asset", imageDetails.error_code, imageDetails.error_message);
      return null;
    }
    const image2 = await fetch(imageDetails.download_url);
    const blob = await image2.blob();
    const base64 = await blobToDataURL(blob);
    return base64.replace(/^data:.*?;/, `data:${image2.headers.get("content-type")};`);
  }
  async function replaceImageAssets(conversation) {
    const imageAssets = Object.values(conversation.mapping).flatMap((node2) => {
      if (!node2.message) return [];
      if (node2.message.content.content_type !== "multimodal_text") return [];
      const parts = Array.isArray(node2.message.content.parts) ? node2.message.content.parts : [];
      return parts.filter((part) => isImageAssetPointer(part));
    });
    const executionOutputs = Object.values(conversation.mapping).flatMap((node2) => {
      if (!node2.message) return [];
      if (node2.message.content.content_type !== "execution_output") return [];
      if (!node2.message.metadata?.aggregate_result?.messages) return [];
      return node2.message.metadata.aggregate_result.messages.filter((msg) => msg.message_type === "image");
    });
    await Promise.all([
      ...imageAssets.map(async (asset) => {
        try {
          const newAssetPointer = await fetchImageFromPointer(asset.asset_pointer);
          if (newAssetPointer) asset.asset_pointer = newAssetPointer;
        } catch (error) {
          console.error("Failed to fetch image asset", error);
        }
      }),
      ...executionOutputs.map(async (msg) => {
        try {
          const newImageUrl = await fetchImageFromPointer(msg.image_url);
          if (newImageUrl) msg.image_url = newImageUrl;
        } catch (error) {
          console.error("Failed to fetch image asset", error);
        }
      })
    ]);
  }
  function getCurrentShareConversationId() {
    const currentShareId = getChatIdFromUrl();
    if (!currentShareId) {
      return null;
    }
    return getConversationFromSharePage() ? currentShareId : null;
  }
  function getShareConversationId(chatId) {
    if (chatId.startsWith("__share__")) {
      return chatId.replace("__share__", "");
    }
    const currentShareId = getCurrentShareConversationId();
    return currentShareId === chatId ? currentShareId : null;
  }
  async function getCurrentChatId() {
    const currentShareConversationId = getCurrentShareConversationId();
    if (currentShareConversationId) {
      return `__share__${currentShareConversationId}`;
    }
    const chatId = getChatIdFromUrl();
    if (chatId) return chatId;
    const conversations = await fetchConversations();
    if (conversations && conversations.items.length > 0) {
      return conversations.items[0].id;
    }
    throw new Error("No chat id found.");
  }
  async function fetchConversation(chatId, shouldReplaceAssets) {
    const shareConversationId = getShareConversationId(chatId);
    if (shareConversationId) {
      const shareConversation = getConversationFromSharePage();
      if (!shareConversation) {
        throw new Error(`Shared conversation data was not found for id: ${shareConversationId}`);
      }
      if (shouldReplaceAssets) {
        await replaceImageAssets(shareConversation);
      }
      return {
        id: shareConversationId,
        ...shareConversation
      };
    }
    const url = getConversationApiUrl(chatId);
    const conversation = await fetchApi(url);
    if (shouldReplaceAssets) {
      await replaceImageAssets(conversation);
    }
    return {
      id: chatId,
      ...conversation
    };
  }
  async function fetchProjects() {
    const url = getProjectsApiUrl();
    const { items } = await fetchApi(url);
    return items.map((gizmo) => gizmo.gizmo.gizmo);
  }
  async function fetchConversations(offset2 = 0, limit = 20, project = null) {
    if (project) {
      return fetchProjectConversations(project, offset2, limit);
    }
    const url = getConversationsApiUrl(offset2, limit);
    return fetchApi(url);
  }
  async function fetchProjectConversations(project, offset2 = 0, limit = 20) {
    const url = getProjectConversationsApiUrl(project, offset2, limit);
    const { items } = await fetchApi(url);
    return {
      has_missing_conversations: false,
      items,
      limit,
      offset: offset2,
      total: null
    };
  }
  async function fetchAllConversations(project = null, maxConversations = 1e3) {
    const conversations = [];
    const limit = project === null ? 100 : 50;
    let offset2 = 0;
    while (true) {
      try {
        const result = project === null ? await fetchConversations(offset2, limit) : await fetchProjectConversations(project, offset2, limit);
        if (!result.items) {
          console.warn("fetchAllConversations received no items at offset:", offset2);
          break;
        }
        conversations.push(...result.items);
        if (result.items.length === 0) break;
        if (result.total !== null && offset2 + limit >= result.total) break;
        if (conversations.length >= maxConversations) break;
        offset2 += limit;
      } catch (error) {
        console.error("Error fetching conversations batch:", error);
        break;
      }
    }
    return conversations.slice(0, maxConversations);
  }
  async function archiveConversation(chatId) {
    const url = getConversationApiUrl(chatId);
    const { success } = await fetchApi(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_archived: true })
    });
    return success;
  }
  async function deleteConversation(chatId) {
    const url = getConversationApiUrl(chatId);
    const { success } = await fetchApi(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_visible: false })
    });
    return success;
  }
  const MODEL_MAPPING = {
    "text-davinci-002-render-sha": "GPT-3.5",
    "text-davinci-002-render-paid": "GPT-3.5",
    "text-davinci-002-browse": "GPT-3.5",
    "gpt-4": "GPT-4",
    "gpt-4-browsing": "GPT-4 (Browser)",
    "gpt-4o": "GPT-4o",
"text-davinci-002": "GPT-3.5"
  };
  function processConversation(conversation) {
    const title2 = conversation.title || "ChatGPT Conversation";
    const createTime = conversation.create_time;
    const updateTime = conversation.update_time;
    const { model, modelSlug } = extractModel(conversation.mapping);
    const startNodeId = conversation.current_node || Object.values(conversation.mapping).find((node2) => !node2.children || node2.children.length === 0)?.id;
    if (!startNodeId) throw new Error("Failed to find start node.");
    const conversationNodes = extractConversationResult(conversation.mapping, startNodeId);
    const mergedConversationNodes = mergeContinuationNodes(conversationNodes);
    return {
      id: conversation.id,
      title: title2,
      model,
      modelSlug,
      createTime,
      updateTime,
      conversationNodes: mergedConversationNodes
    };
  }
  function extractModel(conversationMapping) {
    let model = "";
    const modelSlug = Object.values(conversationMapping).find((node2) => node2.message?.metadata?.model_slug)?.message?.metadata?.model_slug || "";
    if (modelSlug) {
      if (MODEL_MAPPING[modelSlug]) {
        model = MODEL_MAPPING[modelSlug];
      } else {
        Object.keys(MODEL_MAPPING).forEach((key2) => {
          if (modelSlug.startsWith(key2)) {
            model = key2;
          }
        });
      }
    }
    return {
      model,
      modelSlug
    };
  }
  function extractConversationResult(conversationMapping, startNodeId) {
    const result = [];
    let currentNodeId = startNodeId;
    while (currentNodeId) {
      const node2 = conversationMapping[currentNodeId];
      if (!node2) {
        break;
      }
      if (node2.parent === void 0) {
        break;
      }
      if (
node2.message?.author.role !== "system" && node2.message?.content.content_type !== "model_editable_context" && node2.message?.content.content_type !== "user_editable_context"
      ) {
        result.unshift(node2);
      }
      currentNodeId = node2.parent;
    }
    return result;
  }
  function mergeContinuationNodes(nodes) {
    const result = [];
    for (const node2 of nodes) {
      const prevNode = result[result.length - 1];
      if (prevNode?.message?.author.role === "assistant" && node2.message?.author.role === "assistant" && prevNode.message.recipient === "all" && node2.message.recipient === "all" && prevNode.message.content.content_type === "text" && node2.message.content.content_type === "text") {
        prevNode.message.content.parts[prevNode.message.content.parts.length - 1] += node2.message.content.parts[0];
        prevNode.message.content.parts.push(...node2.message.content.parts.slice(1));
      } else {
        result.push(node2);
      }
    }
    return result;
  }
  async function fetchSecurityFinding(findingId) {
    return fetchApi(getSecurityFindingApiUrl(findingId));
  }
  async function fetchSecurityScanConfigurations(params = {}) {
    return fetchApi(getSecurityScanConfigurationsApiUrl(params));
  }
  async function fetchSecurityScan(configuredScanId) {
    return fetchApi(getSecurityScanConfigurationApiUrl(configuredScanId));
  }
  async function fetchSecurityScanStats(configuredScanId) {
    return fetchApi(getSecurityScanConfigurationStatsApiUrl(configuredScanId));
  }
  async function fetchSecurityRepo(repoId) {
    return fetchApi(getSecurityRepoApiUrl(repoId));
  }
  function parseSecurityProjectOverview(projectOverview) {
    if (typeof projectOverview !== "string" || projectOverview.trim() === "") {
      return null;
    }
    try {
      const parsed = JSON.parse(projectOverview);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return null;
      }
      const value = parsed;
      const {
        threat_model: _rawThreatModel,
        focus_files_and_dirs: _rawFocusFilesAndDirs,
        ...rest
      } = value;
      const threatModel = typeof value.threat_model === "string" && value.threat_model.trim() !== "" ? value.threat_model.trim() : void 0;
      const focusFilesAndDirs = Array.isArray(value.focus_files_and_dirs) ? value.focus_files_and_dirs.filter((item) => {
        if (typeof item === "string") return item.trim() !== "";
        if (!item || typeof item !== "object" || Array.isArray(item)) return false;
        const record = item;
        return typeof record.path === "string" && record.path.trim() !== "" && (record.focus_reason === void 0 || typeof record.focus_reason === "string");
      }).map((item) => {
        if (typeof item === "string") {
          return item.trim();
        }
        return {
          ...item,
          path: item.path.trim(),
          ...typeof item.focus_reason === "string" && item.focus_reason.trim() !== "" ? { focus_reason: item.focus_reason.trim() } : {}
        };
      }) : void 0;
      const sanitizedFocusFilesAndDirs = focusFilesAndDirs && focusFilesAndDirs.length > 0 ? focusFilesAndDirs : void 0;
      return {
        ...rest,
        ...threatModel ? { threat_model: threatModel } : {},
        ...sanitizedFocusFilesAndDirs ? { focus_files_and_dirs: sanitizedFocusFilesAndDirs } : {}
      };
    } catch {
      return null;
    }
  }
  async function resolveSecurityScanSelection(repoId, options = {}) {
    const { preferredConfiguredScanId = null, limit = 100 } = options;
    if (preferredConfiguredScanId) {
      const preferredScan = await fetchSecurityScan(preferredConfiguredScanId);
      if (preferredScan.scan_input.repo_id !== repoId) {
        throw new Error(`Preferred scan ${preferredConfiguredScanId} does not belong to repo ${repoId}.`);
      }
      return {
        configuredScanId: preferredScan.id,
        source: "preferred"
      };
    }
    const response = await fetchSecurityScanConfigurations({ repoId, limit });
    const matchingScans = response.items.filter((scan) => scan.scan_input.repo_id === repoId);
    if (response.next_cursor !== null) {
      throw new Error(`Multiple scan configurations exist for repo ${repoId}; pagination was required.`);
    }
    if (matchingScans.length === 0) {
      throw new Error(`No scan configuration found for repo ${repoId}.`);
    }
    if (matchingScans.length > 1) {
      throw new Error(`Multiple scan configurations found for repo ${repoId}.`);
    }
    return {
      configuredScanId: matchingScans[0].id,
      source: "list"
    };
  }
  async function fetchResolvedSecurityScanByRepoId(repoId, options = {}) {
    const selection = await resolveSecurityScanSelection(repoId, options);
    const [scanConfiguration, scanStats, repository] = await Promise.all([
      fetchSecurityScan(selection.configuredScanId),
      fetchSecurityScanStats(selection.configuredScanId),
      fetchSecurityRepo(repoId)
    ]);
    return {
      repoId,
      configuredScanId: selection.configuredScanId,
      scanConfiguration,
      scanStats,
      repository,
      parsedProjectOverview: parseSecurityProjectOverview(scanConfiguration.scan_input.project_overview)
    };
  }
  function shouldKeepInjectedContainer(target, record, pageContext) {
    if (!target.isConnected || !record.container.isConnected || !target.contains(record.container)) {
      return false;
    }
    switch (record.kind) {
      case "conversation-nav":
        return pageContext.kind === "conversation" && !pageContext.isSharePage && !pageContext.isShareContinuePage;
      case "share-wrapper":
        return pageContext.isSharePage;
      case "security-sidebar":
        return pageContext.kind === "security-finding" || pageContext.kind === "security-scan";
    }
  }
  function hasSecuritySidebarMarker(element2) {
    return element2.style.getPropertyValue("--codex-security-left-pane-width") !== "" || element2.getAttribute("style")?.includes("--codex-security-left-pane-width") === true;
  }
  function isLikelySecuritySidebar(element2) {
    return element2 instanceof HTMLElement && element2.tagName === "ASIDE" && hasSecuritySidebarMarker(element2);
  }
  function findSecuritySidebarMountTarget(root2 = document) {
    const separator = root2.querySelector('[role="separator"][aria-label="Resize repository pane"]');
    const siblingSidebar = separator?.previousElementSibling ?? null;
    if (isLikelySecuritySidebar(siblingSidebar)) {
      return siblingSidebar;
    }
    const allSidebars = Array.from(root2.querySelectorAll("aside"));
    const markedSidebar = allSidebars.find(isLikelySecuritySidebar);
    if (markedSidebar) {
      return markedSidebar;
    }
    return null;
  }
  function createPageContext(overrides) {
    return {
      kind: "unsupported",
      chatId: null,
      findingId: null,
      repoId: null,
      isSharePage: false,
      isShareContinuePage: false,
      ...overrides
    };
  }
  function getPageContext(pathname = window.location.pathname) {
    const shareContinueMatch = pathname.match(/^\/share\/([a-z0-9-]+)\/continue$/i);
    if (shareContinueMatch) {
      return createPageContext({
        kind: "conversation",
        chatId: shareContinueMatch[1],
        isShareContinuePage: true
      });
    }
    const shareMatch = pathname.match(/^\/share\/([a-z0-9-]+)$/i);
    if (shareMatch) {
      return createPageContext({
        kind: "conversation",
        chatId: shareMatch[1],
        isSharePage: true
      });
    }
    const conversationMatch = pathname.match(/^\/(?:c|g\/[a-z0-9-]+\/c)\/([a-z0-9-]+)/i);
    if (conversationMatch) {
      return createPageContext({
        kind: "conversation",
        chatId: conversationMatch[1]
      });
    }
    const securityFindingMatch = pathname.match(/^\/codex\/security\/findings\/([a-z0-9]+)\/?$/i);
    if (securityFindingMatch) {
      return createPageContext({
        kind: "security-finding",
        findingId: securityFindingMatch[1]
      });
    }
    const securityScanMatch = pathname.match(/^\/codex\/security\/scans\/([a-z0-9-]+)\/?$/i);
    if (securityScanMatch) {
      return createPageContext({
        kind: "security-scan",
        repoId: securityScanMatch[1]
      });
    }
    if (/^\/codex\/security\/findings\/?$/i.test(pathname)) {
      return createPageContext({
        kind: "security-findings-list"
      });
    }
    return createPageContext({});
  }
  function isConversationPageContext(context) {
    return context.kind === "conversation";
  }
  function isSecurityExportPageContext(context) {
    return context.kind === "security-finding" || context.kind === "security-scan";
  }
  const isString$1 = (obj) => typeof obj === "string";
  const defer = () => {
    let res;
    let rej;
    const promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    promise.resolve = res;
    promise.reject = rej;
    return promise;
  };
  const makeString = (object) => {
    if (object == null) return "";
    return "" + object;
  };
  const copy = (a2, s2, t2) => {
    a2.forEach((m2) => {
      if (s2[m2]) t2[m2] = s2[m2];
    });
  };
  const lastOfPathSeparatorRegExp = /###/g;
  const cleanKey = (key2) => key2 && key2.indexOf("###") > -1 ? key2.replace(lastOfPathSeparatorRegExp, ".") : key2;
  const canNotTraverseDeeper = (object) => !object || isString$1(object);
  const getLastOfPath = (object, path2, Empty) => {
    const stack = !isString$1(path2) ? path2 : path2.split(".");
    let stackIndex = 0;
    while (stackIndex < stack.length - 1) {
      if (canNotTraverseDeeper(object)) return {};
      const key2 = cleanKey(stack[stackIndex]);
      if (!object[key2] && Empty) object[key2] = new Empty();
      if (Object.prototype.hasOwnProperty.call(object, key2)) {
        object = object[key2];
      } else {
        object = {};
      }
      ++stackIndex;
    }
    if (canNotTraverseDeeper(object)) return {};
    return {
      obj: object,
      k: cleanKey(stack[stackIndex])
    };
  };
  const setPath = (object, path2, newValue) => {
    const {
      obj,
      k: k2
    } = getLastOfPath(object, path2, Object);
    if (obj !== void 0 || path2.length === 1) {
      obj[k2] = newValue;
      return;
    }
    let e2 = path2[path2.length - 1];
    let p2 = path2.slice(0, path2.length - 1);
    let last = getLastOfPath(object, p2, Object);
    while (last.obj === void 0 && p2.length) {
      e2 = `${p2[p2.length - 1]}.${e2}`;
      p2 = p2.slice(0, p2.length - 1);
      last = getLastOfPath(object, p2, Object);
      if (last?.obj && typeof last.obj[`${last.k}.${e2}`] !== "undefined") {
        last.obj = void 0;
      }
    }
    last.obj[`${last.k}.${e2}`] = newValue;
  };
  const pushPath = (object, path2, newValue, concat) => {
    const {
      obj,
      k: k2
    } = getLastOfPath(object, path2, Object);
    obj[k2] = obj[k2] || [];
    obj[k2].push(newValue);
  };
  const getPath = (object, path2) => {
    const {
      obj,
      k: k2
    } = getLastOfPath(object, path2);
    if (!obj) return void 0;
    if (!Object.prototype.hasOwnProperty.call(obj, k2)) return void 0;
    return obj[k2];
  };
  const getPathWithDefaults = (data, defaultData, key2) => {
    const value = getPath(data, key2);
    if (value !== void 0) {
      return value;
    }
    return getPath(defaultData, key2);
  };
  const deepExtend = (target, source, overwrite) => {
    for (const prop in source) {
      if (prop !== "__proto__" && prop !== "constructor") {
        if (prop in target) {
          if (isString$1(target[prop]) || target[prop] instanceof String || isString$1(source[prop]) || source[prop] instanceof String) {
            if (overwrite) target[prop] = source[prop];
          } else {
            deepExtend(target[prop], source[prop], overwrite);
          }
        } else {
          target[prop] = source[prop];
        }
      }
    }
    return target;
  };
  const regexEscape = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  var _entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
  };
  const escape = (data) => {
    if (isString$1(data)) {
      return data.replace(/[&<>"'\/]/g, (s2) => _entityMap[s2]);
    }
    return data;
  };
  class RegExpCache {
    constructor(capacity) {
      this.capacity = capacity;
      this.regExpMap = new Map();
      this.regExpQueue = [];
    }
    getRegExp(pattern) {
      const regExpFromCache = this.regExpMap.get(pattern);
      if (regExpFromCache !== void 0) {
        return regExpFromCache;
      }
      const regExpNew = new RegExp(pattern);
      if (this.regExpQueue.length === this.capacity) {
        this.regExpMap.delete(this.regExpQueue.shift());
      }
      this.regExpMap.set(pattern, regExpNew);
      this.regExpQueue.push(pattern);
      return regExpNew;
    }
  }
  const chars = [" ", ",", "?", "!", ";"];
  const looksLikeObjectPathRegExpCache = new RegExpCache(20);
  const looksLikeObjectPath = (key2, nsSeparator, keySeparator) => {
    nsSeparator = nsSeparator || "";
    keySeparator = keySeparator || "";
    const possibleChars = chars.filter((c2) => nsSeparator.indexOf(c2) < 0 && keySeparator.indexOf(c2) < 0);
    if (possibleChars.length === 0) return true;
    const r2 = looksLikeObjectPathRegExpCache.getRegExp(`(${possibleChars.map((c2) => c2 === "?" ? "\\?" : c2).join("|")})`);
    let matched = !r2.test(key2);
    if (!matched) {
      const ki = key2.indexOf(keySeparator);
      if (ki > 0 && !r2.test(key2.substring(0, ki))) {
        matched = true;
      }
    }
    return matched;
  };
  const deepFind = (obj, path2, keySeparator = ".") => {
    if (!obj) return void 0;
    if (obj[path2]) {
      if (!Object.prototype.hasOwnProperty.call(obj, path2)) return void 0;
      return obj[path2];
    }
    const tokens = path2.split(keySeparator);
    let current = obj;
    for (let i2 = 0; i2 < tokens.length; ) {
      if (!current || typeof current !== "object") {
        return void 0;
      }
      let next;
      let nextPath = "";
      for (let j2 = i2; j2 < tokens.length; ++j2) {
        if (j2 !== i2) {
          nextPath += keySeparator;
        }
        nextPath += tokens[j2];
        next = current[nextPath];
        if (next !== void 0) {
          if (["string", "number", "boolean"].indexOf(typeof next) > -1 && j2 < tokens.length - 1) {
            continue;
          }
          i2 += j2 - i2 + 1;
          break;
        }
      }
      current = next;
    }
    return current;
  };
  const getCleanedCode = (code2) => code2?.replace(/_/g, "-");
  const consoleLogger = {
    type: "logger",
    log(args) {
      this.output("log", args);
    },
    warn(args) {
      this.output("warn", args);
    },
    error(args) {
      this.output("error", args);
    },
    output(type, args) {
      console?.[type]?.apply?.(console, args);
    }
  };
  class Logger {
    constructor(concreteLogger, options = {}) {
      this.init(concreteLogger, options);
    }
    init(concreteLogger, options = {}) {
      this.prefix = options.prefix || "i18next:";
      this.logger = concreteLogger || consoleLogger;
      this.options = options;
      this.debug = options.debug;
    }
    log(...args) {
      return this.forward(args, "log", "", true);
    }
    warn(...args) {
      return this.forward(args, "warn", "", true);
    }
    error(...args) {
      return this.forward(args, "error", "");
    }
    deprecate(...args) {
      return this.forward(args, "warn", "WARNING DEPRECATED: ", true);
    }
    forward(args, lvl, prefix, debugOnly) {
      if (debugOnly && !this.debug) return null;
      if (isString$1(args[0])) args[0] = `${prefix}${this.prefix} ${args[0]}`;
      return this.logger[lvl](args);
    }
    create(moduleName) {
      return new Logger(this.logger, {
        ...{
          prefix: `${this.prefix}:${moduleName}:`
        },
        ...this.options
      });
    }
    clone(options) {
      options = options || this.options;
      options.prefix = options.prefix || this.prefix;
      return new Logger(this.logger, options);
    }
  }
  var baseLogger = new Logger();
  let EventEmitter$1 = class EventEmitter {
    constructor() {
      this.observers = {};
    }
    on(events, listener) {
      events.split(" ").forEach((event) => {
        if (!this.observers[event]) this.observers[event] = new Map();
        const numListeners = this.observers[event].get(listener) || 0;
        this.observers[event].set(listener, numListeners + 1);
      });
      return this;
    }
    off(event, listener) {
      if (!this.observers[event]) return;
      if (!listener) {
        delete this.observers[event];
        return;
      }
      this.observers[event].delete(listener);
    }
    emit(event, ...args) {
      if (this.observers[event]) {
        const cloned = Array.from(this.observers[event].entries());
        cloned.forEach(([observer, numTimesAdded]) => {
          for (let i2 = 0; i2 < numTimesAdded; i2++) {
            observer(...args);
          }
        });
      }
      if (this.observers["*"]) {
        const cloned = Array.from(this.observers["*"].entries());
        cloned.forEach(([observer, numTimesAdded]) => {
          for (let i2 = 0; i2 < numTimesAdded; i2++) {
            observer.apply(observer, [event, ...args]);
          }
        });
      }
    }
  };
  class ResourceStore extends EventEmitter$1 {
    constructor(data, options = {
      ns: ["translation"],
      defaultNS: "translation"
    }) {
      super();
      this.data = data || {};
      this.options = options;
      if (this.options.keySeparator === void 0) {
        this.options.keySeparator = ".";
      }
      if (this.options.ignoreJSONStructure === void 0) {
        this.options.ignoreJSONStructure = true;
      }
    }
    addNamespaces(ns) {
      if (this.options.ns.indexOf(ns) < 0) {
        this.options.ns.push(ns);
      }
    }
    removeNamespaces(ns) {
      const index2 = this.options.ns.indexOf(ns);
      if (index2 > -1) {
        this.options.ns.splice(index2, 1);
      }
    }
    getResource(lng, ns, key2, options = {}) {
      const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
      const ignoreJSONStructure = options.ignoreJSONStructure !== void 0 ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
      let path2;
      if (lng.indexOf(".") > -1) {
        path2 = lng.split(".");
      } else {
        path2 = [lng, ns];
        if (key2) {
          if (Array.isArray(key2)) {
            path2.push(...key2);
          } else if (isString$1(key2) && keySeparator) {
            path2.push(...key2.split(keySeparator));
          } else {
            path2.push(key2);
          }
        }
      }
      const result = getPath(this.data, path2);
      if (!result && !ns && !key2 && lng.indexOf(".") > -1) {
        lng = path2[0];
        ns = path2[1];
        key2 = path2.slice(2).join(".");
      }
      if (result || !ignoreJSONStructure || !isString$1(key2)) return result;
      return deepFind(this.data?.[lng]?.[ns], key2, keySeparator);
    }
    addResource(lng, ns, key2, value, options = {
      silent: false
    }) {
      const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
      let path2 = [lng, ns];
      if (key2) path2 = path2.concat(keySeparator ? key2.split(keySeparator) : key2);
      if (lng.indexOf(".") > -1) {
        path2 = lng.split(".");
        value = ns;
        ns = path2[1];
      }
      this.addNamespaces(ns);
      setPath(this.data, path2, value);
      if (!options.silent) this.emit("added", lng, ns, key2, value);
    }
    addResources(lng, ns, resources2, options = {
      silent: false
    }) {
      for (const m2 in resources2) {
        if (isString$1(resources2[m2]) || Array.isArray(resources2[m2])) this.addResource(lng, ns, m2, resources2[m2], {
          silent: true
        });
      }
      if (!options.silent) this.emit("added", lng, ns, resources2);
    }
    addResourceBundle(lng, ns, resources2, deep, overwrite, options = {
      silent: false,
      skipCopy: false
    }) {
      let path2 = [lng, ns];
      if (lng.indexOf(".") > -1) {
        path2 = lng.split(".");
        deep = resources2;
        resources2 = ns;
        ns = path2[1];
      }
      this.addNamespaces(ns);
      let pack = getPath(this.data, path2) || {};
      if (!options.skipCopy) resources2 = JSON.parse(JSON.stringify(resources2));
      if (deep) {
        deepExtend(pack, resources2, overwrite);
      } else {
        pack = {
          ...pack,
          ...resources2
        };
      }
      setPath(this.data, path2, pack);
      if (!options.silent) this.emit("added", lng, ns, resources2);
    }
    removeResourceBundle(lng, ns) {
      if (this.hasResourceBundle(lng, ns)) {
        delete this.data[lng][ns];
      }
      this.removeNamespaces(ns);
      this.emit("removed", lng, ns);
    }
    hasResourceBundle(lng, ns) {
      return this.getResource(lng, ns) !== void 0;
    }
    getResourceBundle(lng, ns) {
      if (!ns) ns = this.options.defaultNS;
      return this.getResource(lng, ns);
    }
    getDataByLanguage(lng) {
      return this.data[lng];
    }
    hasLanguageSomeTranslations(lng) {
      const data = this.getDataByLanguage(lng);
      const n2 = data && Object.keys(data) || [];
      return !!n2.find((v2) => data[v2] && Object.keys(data[v2]).length > 0);
    }
    toJSON() {
      return this.data;
    }
  }
  var postProcessor = {
    processors: {},
    addPostProcessor(module) {
      this.processors[module.name] = module;
    },
    handle(processors, value, key2, options, translator) {
      processors.forEach((processor) => {
        value = this.processors[processor]?.process(value, key2, options, translator) ?? value;
      });
      return value;
    }
  };
  const PATH_KEY = Symbol("i18next/PATH_KEY");
  function createProxy() {
    const state = [];
    const handler = Object.create(null);
    let proxy;
    handler.get = (target, key2) => {
      proxy?.revoke?.();
      if (key2 === PATH_KEY) return state;
      state.push(key2);
      proxy = Proxy.revocable(target, handler);
      return proxy.proxy;
    };
    return Proxy.revocable( Object.create(null), handler).proxy;
  }
  function keysFromSelector(selector, opts) {
    const {
      [PATH_KEY]: path2
    } = selector(createProxy());
    return path2.join(opts?.keySeparator ?? ".");
  }
  const checkedLoadedFor = {};
  const shouldHandleAsObject = (res) => !isString$1(res) && typeof res !== "boolean" && typeof res !== "number";
  class Translator extends EventEmitter$1 {
    constructor(services, options = {}) {
      super();
      copy(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], services, this);
      this.options = options;
      if (this.options.keySeparator === void 0) {
        this.options.keySeparator = ".";
      }
      this.logger = baseLogger.create("translator");
    }
    changeLanguage(lng) {
      if (lng) this.language = lng;
    }
    exists(key2, o2 = {
      interpolation: {}
    }) {
      const opt = {
        ...o2
      };
      if (key2 == null) return false;
      const resolved = this.resolve(key2, opt);
      if (resolved?.res === void 0) return false;
      const isObject2 = shouldHandleAsObject(resolved.res);
      if (opt.returnObjects === false && isObject2) {
        return false;
      }
      return true;
    }
    extractFromKey(key2, opt) {
      let nsSeparator = opt.nsSeparator !== void 0 ? opt.nsSeparator : this.options.nsSeparator;
      if (nsSeparator === void 0) nsSeparator = ":";
      const keySeparator = opt.keySeparator !== void 0 ? opt.keySeparator : this.options.keySeparator;
      let namespaces = opt.ns || this.options.defaultNS || [];
      const wouldCheckForNsInKey = nsSeparator && key2.indexOf(nsSeparator) > -1;
      const seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !opt.keySeparator && !this.options.userDefinedNsSeparator && !opt.nsSeparator && !looksLikeObjectPath(key2, nsSeparator, keySeparator);
      if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
        const m2 = key2.match(this.interpolator.nestingRegexp);
        if (m2 && m2.length > 0) {
          return {
            key: key2,
            namespaces: isString$1(namespaces) ? [namespaces] : namespaces
          };
        }
        const parts = key2.split(nsSeparator);
        if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
        key2 = parts.join(keySeparator);
      }
      return {
        key: key2,
        namespaces: isString$1(namespaces) ? [namespaces] : namespaces
      };
    }
    translate(keys2, o2, lastKey) {
      let opt = typeof o2 === "object" ? {
        ...o2
      } : o2;
      if (typeof opt !== "object" && this.options.overloadTranslationOptionHandler) {
        opt = this.options.overloadTranslationOptionHandler(arguments);
      }
      if (typeof opt === "object") opt = {
        ...opt
      };
      if (!opt) opt = {};
      if (keys2 == null) return "";
      if (typeof keys2 === "function") keys2 = keysFromSelector(keys2, {
        ...this.options,
        ...opt
      });
      if (!Array.isArray(keys2)) keys2 = [String(keys2)];
      const returnDetails = opt.returnDetails !== void 0 ? opt.returnDetails : this.options.returnDetails;
      const keySeparator = opt.keySeparator !== void 0 ? opt.keySeparator : this.options.keySeparator;
      const {
        key: key2,
        namespaces
      } = this.extractFromKey(keys2[keys2.length - 1], opt);
      const namespace = namespaces[namespaces.length - 1];
      let nsSeparator = opt.nsSeparator !== void 0 ? opt.nsSeparator : this.options.nsSeparator;
      if (nsSeparator === void 0) nsSeparator = ":";
      const lng = opt.lng || this.language;
      const appendNamespaceToCIMode = opt.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
      if (lng?.toLowerCase() === "cimode") {
        if (appendNamespaceToCIMode) {
          if (returnDetails) {
            return {
              res: `${namespace}${nsSeparator}${key2}`,
              usedKey: key2,
              exactUsedKey: key2,
              usedLng: lng,
              usedNS: namespace,
              usedParams: this.getUsedParamsDetails(opt)
            };
          }
          return `${namespace}${nsSeparator}${key2}`;
        }
        if (returnDetails) {
          return {
            res: key2,
            usedKey: key2,
            exactUsedKey: key2,
            usedLng: lng,
            usedNS: namespace,
            usedParams: this.getUsedParamsDetails(opt)
          };
        }
        return key2;
      }
      const resolved = this.resolve(keys2, opt);
      let res = resolved?.res;
      const resUsedKey = resolved?.usedKey || key2;
      const resExactUsedKey = resolved?.exactUsedKey || key2;
      const noObject = ["[object Number]", "[object Function]", "[object RegExp]"];
      const joinArrays = opt.joinArrays !== void 0 ? opt.joinArrays : this.options.joinArrays;
      const handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
      const needsPluralHandling = opt.count !== void 0 && !isString$1(opt.count);
      const hasDefaultValue = Translator.hasDefaultValue(opt);
      const defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, opt) : "";
      const defaultValueSuffixOrdinalFallback = opt.ordinal && needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, {
        ordinal: false
      }) : "";
      const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
      const defaultValue = needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] || opt[`defaultValue${defaultValueSuffix}`] || opt[`defaultValue${defaultValueSuffixOrdinalFallback}`] || opt.defaultValue;
      let resForObjHndl = res;
      if (handleAsObjectInI18nFormat && !res && hasDefaultValue) {
        resForObjHndl = defaultValue;
      }
      const handleAsObject = shouldHandleAsObject(resForObjHndl);
      const resType = Object.prototype.toString.apply(resForObjHndl);
      if (handleAsObjectInI18nFormat && resForObjHndl && handleAsObject && noObject.indexOf(resType) < 0 && !(isString$1(joinArrays) && Array.isArray(resForObjHndl))) {
        if (!opt.returnObjects && !this.options.returnObjects) {
          if (!this.options.returnedObjectHandler) {
            this.logger.warn("accessing an object - but returnObjects options is not enabled!");
          }
          const r2 = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, resForObjHndl, {
            ...opt,
            ns: namespaces
          }) : `key '${key2} (${this.language})' returned an object instead of string.`;
          if (returnDetails) {
            resolved.res = r2;
            resolved.usedParams = this.getUsedParamsDetails(opt);
            return resolved;
          }
          return r2;
        }
        if (keySeparator) {
          const resTypeIsArray = Array.isArray(resForObjHndl);
          const copy2 = resTypeIsArray ? [] : {};
          const newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
          for (const m2 in resForObjHndl) {
            if (Object.prototype.hasOwnProperty.call(resForObjHndl, m2)) {
              const deepKey = `${newKeyToUse}${keySeparator}${m2}`;
              if (hasDefaultValue && !res) {
                copy2[m2] = this.translate(deepKey, {
                  ...opt,
                  defaultValue: shouldHandleAsObject(defaultValue) ? defaultValue[m2] : void 0,
                  ...{
                    joinArrays: false,
                    ns: namespaces
                  }
                });
              } else {
                copy2[m2] = this.translate(deepKey, {
                  ...opt,
                  ...{
                    joinArrays: false,
                    ns: namespaces
                  }
                });
              }
              if (copy2[m2] === deepKey) copy2[m2] = resForObjHndl[m2];
            }
          }
          res = copy2;
        }
      } else if (handleAsObjectInI18nFormat && isString$1(joinArrays) && Array.isArray(res)) {
        res = res.join(joinArrays);
        if (res) res = this.extendTranslation(res, keys2, opt, lastKey);
      } else {
        let usedDefault = false;
        let usedKey = false;
        if (!this.isValidLookup(res) && hasDefaultValue) {
          usedDefault = true;
          res = defaultValue;
        }
        if (!this.isValidLookup(res)) {
          usedKey = true;
          res = key2;
        }
        const missingKeyNoValueFallbackToKey = opt.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
        const resForMissing = missingKeyNoValueFallbackToKey && usedKey ? void 0 : res;
        const updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
        if (usedKey || usedDefault || updateMissing) {
          this.logger.log(updateMissing ? "updateKey" : "missingKey", lng, namespace, key2, updateMissing ? defaultValue : res);
          if (keySeparator) {
            const fk = this.resolve(key2, {
              ...opt,
              keySeparator: false
            });
            if (fk && fk.res) this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
          }
          let lngs = [];
          const fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, opt.lng || this.language);
          if (this.options.saveMissingTo === "fallback" && fallbackLngs && fallbackLngs[0]) {
            for (let i2 = 0; i2 < fallbackLngs.length; i2++) {
              lngs.push(fallbackLngs[i2]);
            }
          } else if (this.options.saveMissingTo === "all") {
            lngs = this.languageUtils.toResolveHierarchy(opt.lng || this.language);
          } else {
            lngs.push(opt.lng || this.language);
          }
          const send = (l2, k2, specificDefaultValue) => {
            const defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
            if (this.options.missingKeyHandler) {
              this.options.missingKeyHandler(l2, namespace, k2, defaultForMissing, updateMissing, opt);
            } else if (this.backendConnector?.saveMissing) {
              this.backendConnector.saveMissing(l2, namespace, k2, defaultForMissing, updateMissing, opt);
            }
            this.emit("missingKey", l2, namespace, k2, res);
          };
          if (this.options.saveMissing) {
            if (this.options.saveMissingPlurals && needsPluralHandling) {
              lngs.forEach((language) => {
                const suffixes = this.pluralResolver.getSuffixes(language, opt);
                if (needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] && suffixes.indexOf(`${this.options.pluralSeparator}zero`) < 0) {
                  suffixes.push(`${this.options.pluralSeparator}zero`);
                }
                suffixes.forEach((suffix) => {
                  send([language], key2 + suffix, opt[`defaultValue${suffix}`] || defaultValue);
                });
              });
            } else {
              send(lngs, key2, defaultValue);
            }
          }
        }
        res = this.extendTranslation(res, keys2, opt, resolved, lastKey);
        if (usedKey && res === key2 && this.options.appendNamespaceToMissingKey) {
          res = `${namespace}${nsSeparator}${key2}`;
        }
        if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) {
          res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${namespace}${nsSeparator}${key2}` : key2, usedDefault ? res : void 0, opt);
        }
      }
      if (returnDetails) {
        resolved.res = res;
        resolved.usedParams = this.getUsedParamsDetails(opt);
        return resolved;
      }
      return res;
    }
    extendTranslation(res, key2, opt, resolved, lastKey) {
      if (this.i18nFormat?.parse) {
        res = this.i18nFormat.parse(res, {
          ...this.options.interpolation.defaultVariables,
          ...opt
        }, opt.lng || this.language || resolved.usedLng, resolved.usedNS, resolved.usedKey, {
          resolved
        });
      } else if (!opt.skipInterpolation) {
        if (opt.interpolation) this.interpolator.init({
          ...opt,
          ...{
            interpolation: {
              ...this.options.interpolation,
              ...opt.interpolation
            }
          }
        });
        const skipOnVariables = isString$1(res) && (opt?.interpolation?.skipOnVariables !== void 0 ? opt.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
        let nestBef;
        if (skipOnVariables) {
          const nb = res.match(this.interpolator.nestingRegexp);
          nestBef = nb && nb.length;
        }
        let data = opt.replace && !isString$1(opt.replace) ? opt.replace : opt;
        if (this.options.interpolation.defaultVariables) data = {
          ...this.options.interpolation.defaultVariables,
          ...data
        };
        res = this.interpolator.interpolate(res, data, opt.lng || this.language || resolved.usedLng, opt);
        if (skipOnVariables) {
          const na = res.match(this.interpolator.nestingRegexp);
          const nestAft = na && na.length;
          if (nestBef < nestAft) opt.nest = false;
        }
        if (!opt.lng && resolved && resolved.res) opt.lng = this.language || resolved.usedLng;
        if (opt.nest !== false) res = this.interpolator.nest(res, (...args) => {
          if (lastKey?.[0] === args[0] && !opt.context) {
            this.logger.warn(`It seems you are nesting recursively key: ${args[0]} in key: ${key2[0]}`);
            return null;
          }
          return this.translate(...args, key2);
        }, opt);
        if (opt.interpolation) this.interpolator.reset();
      }
      const postProcess = opt.postProcess || this.options.postProcess;
      const postProcessorNames = isString$1(postProcess) ? [postProcess] : postProcess;
      if (res != null && postProcessorNames?.length && opt.applyPostProcessor !== false) {
        res = postProcessor.handle(postProcessorNames, res, key2, this.options && this.options.postProcessPassResolved ? {
          i18nResolved: {
            ...resolved,
            usedParams: this.getUsedParamsDetails(opt)
          },
          ...opt
        } : opt, this);
      }
      return res;
    }
    resolve(keys2, opt = {}) {
      let found;
      let usedKey;
      let exactUsedKey;
      let usedLng;
      let usedNS;
      if (isString$1(keys2)) keys2 = [keys2];
      keys2.forEach((k2) => {
        if (this.isValidLookup(found)) return;
        const extracted = this.extractFromKey(k2, opt);
        const key2 = extracted.key;
        usedKey = key2;
        let namespaces = extracted.namespaces;
        if (this.options.fallbackNS) namespaces = namespaces.concat(this.options.fallbackNS);
        const needsPluralHandling = opt.count !== void 0 && !isString$1(opt.count);
        const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
        const needsContextHandling = opt.context !== void 0 && (isString$1(opt.context) || typeof opt.context === "number") && opt.context !== "";
        const codes = opt.lngs ? opt.lngs : this.languageUtils.toResolveHierarchy(opt.lng || this.language, opt.fallbackLng);
        namespaces.forEach((ns) => {
          if (this.isValidLookup(found)) return;
          usedNS = ns;
          if (!checkedLoadedFor[`${codes[0]}-${ns}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(usedNS)) {
            checkedLoadedFor[`${codes[0]}-${ns}`] = true;
            this.logger.warn(`key "${usedKey}" for languages "${codes.join(", ")}" won't get resolved as namespace "${usedNS}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
          }
          codes.forEach((code2) => {
            if (this.isValidLookup(found)) return;
            usedLng = code2;
            const finalKeys = [key2];
            if (this.i18nFormat?.addLookupKeys) {
              this.i18nFormat.addLookupKeys(finalKeys, key2, code2, ns, opt);
            } else {
              let pluralSuffix;
              if (needsPluralHandling) pluralSuffix = this.pluralResolver.getSuffix(code2, opt.count, opt);
              const zeroSuffix = `${this.options.pluralSeparator}zero`;
              const ordinalPrefix = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
              if (needsPluralHandling) {
                if (opt.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                  finalKeys.push(key2 + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
                }
                finalKeys.push(key2 + pluralSuffix);
                if (needsZeroSuffixLookup) {
                  finalKeys.push(key2 + zeroSuffix);
                }
              }
              if (needsContextHandling) {
                const contextKey = `${key2}${this.options.contextSeparator || "_"}${opt.context}`;
                finalKeys.push(contextKey);
                if (needsPluralHandling) {
                  if (opt.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                    finalKeys.push(contextKey + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
                  }
                  finalKeys.push(contextKey + pluralSuffix);
                  if (needsZeroSuffixLookup) {
                    finalKeys.push(contextKey + zeroSuffix);
                  }
                }
              }
            }
            let possibleKey;
            while (possibleKey = finalKeys.pop()) {
              if (!this.isValidLookup(found)) {
                exactUsedKey = possibleKey;
                found = this.getResource(code2, ns, possibleKey, opt);
              }
            }
          });
        });
      });
      return {
        res: found,
        usedKey,
        exactUsedKey,
        usedLng,
        usedNS
      };
    }
    isValidLookup(res) {
      return res !== void 0 && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === "");
    }
    getResource(code2, ns, key2, options = {}) {
      if (this.i18nFormat?.getResource) return this.i18nFormat.getResource(code2, ns, key2, options);
      return this.resourceStore.getResource(code2, ns, key2, options);
    }
    getUsedParamsDetails(options = {}) {
      const optionsKeys = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"];
      const useOptionsReplaceForData = options.replace && !isString$1(options.replace);
      let data = useOptionsReplaceForData ? options.replace : options;
      if (useOptionsReplaceForData && typeof options.count !== "undefined") {
        data.count = options.count;
      }
      if (this.options.interpolation.defaultVariables) {
        data = {
          ...this.options.interpolation.defaultVariables,
          ...data
        };
      }
      if (!useOptionsReplaceForData) {
        data = {
          ...data
        };
        for (const key2 of optionsKeys) {
          delete data[key2];
        }
      }
      return data;
    }
    static hasDefaultValue(options) {
      const prefix = "defaultValue";
      for (const option2 in options) {
        if (Object.prototype.hasOwnProperty.call(options, option2) && prefix === option2.substring(0, prefix.length) && void 0 !== options[option2]) {
          return true;
        }
      }
      return false;
    }
  }
  class LanguageUtil {
    constructor(options) {
      this.options = options;
      this.supportedLngs = this.options.supportedLngs || false;
      this.logger = baseLogger.create("languageUtils");
    }
    getScriptPartFromCode(code2) {
      code2 = getCleanedCode(code2);
      if (!code2 || code2.indexOf("-") < 0) return null;
      const p2 = code2.split("-");
      if (p2.length === 2) return null;
      p2.pop();
      if (p2[p2.length - 1].toLowerCase() === "x") return null;
      return this.formatLanguageCode(p2.join("-"));
    }
    getLanguagePartFromCode(code2) {
      code2 = getCleanedCode(code2);
      if (!code2 || code2.indexOf("-") < 0) return code2;
      const p2 = code2.split("-");
      return this.formatLanguageCode(p2[0]);
    }
    formatLanguageCode(code2) {
      if (isString$1(code2) && code2.indexOf("-") > -1) {
        let formattedCode;
        try {
          formattedCode = Intl.getCanonicalLocales(code2)[0];
        } catch (e2) {
        }
        if (formattedCode && this.options.lowerCaseLng) {
          formattedCode = formattedCode.toLowerCase();
        }
        if (formattedCode) return formattedCode;
        if (this.options.lowerCaseLng) {
          return code2.toLowerCase();
        }
        return code2;
      }
      return this.options.cleanCode || this.options.lowerCaseLng ? code2.toLowerCase() : code2;
    }
    isSupportedCode(code2) {
      if (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) {
        code2 = this.getLanguagePartFromCode(code2);
      }
      return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code2) > -1;
    }
    getBestMatchFromCodes(codes) {
      if (!codes) return null;
      let found;
      codes.forEach((code2) => {
        if (found) return;
        const cleanedLng = this.formatLanguageCode(code2);
        if (!this.options.supportedLngs || this.isSupportedCode(cleanedLng)) found = cleanedLng;
      });
      if (!found && this.options.supportedLngs) {
        codes.forEach((code2) => {
          if (found) return;
          const lngScOnly = this.getScriptPartFromCode(code2);
          if (this.isSupportedCode(lngScOnly)) return found = lngScOnly;
          const lngOnly = this.getLanguagePartFromCode(code2);
          if (this.isSupportedCode(lngOnly)) return found = lngOnly;
          found = this.options.supportedLngs.find((supportedLng) => {
            if (supportedLng === lngOnly) return supportedLng;
            if (supportedLng.indexOf("-") < 0 && lngOnly.indexOf("-") < 0) return;
            if (supportedLng.indexOf("-") > 0 && lngOnly.indexOf("-") < 0 && supportedLng.substring(0, supportedLng.indexOf("-")) === lngOnly) return supportedLng;
            if (supportedLng.indexOf(lngOnly) === 0 && lngOnly.length > 1) return supportedLng;
          });
        });
      }
      if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
      return found;
    }
    getFallbackCodes(fallbacks, code2) {
      if (!fallbacks) return [];
      if (typeof fallbacks === "function") fallbacks = fallbacks(code2);
      if (isString$1(fallbacks)) fallbacks = [fallbacks];
      if (Array.isArray(fallbacks)) return fallbacks;
      if (!code2) return fallbacks.default || [];
      let found = fallbacks[code2];
      if (!found) found = fallbacks[this.getScriptPartFromCode(code2)];
      if (!found) found = fallbacks[this.formatLanguageCode(code2)];
      if (!found) found = fallbacks[this.getLanguagePartFromCode(code2)];
      if (!found) found = fallbacks.default;
      return found || [];
    }
    toResolveHierarchy(code2, fallbackCode) {
      const fallbackCodes = this.getFallbackCodes((fallbackCode === false ? [] : fallbackCode) || this.options.fallbackLng || [], code2);
      const codes = [];
      const addCode = (c2) => {
        if (!c2) return;
        if (this.isSupportedCode(c2)) {
          codes.push(c2);
        } else {
          this.logger.warn(`rejecting language code not found in supportedLngs: ${c2}`);
        }
      };
      if (isString$1(code2) && (code2.indexOf("-") > -1 || code2.indexOf("_") > -1)) {
        if (this.options.load !== "languageOnly") addCode(this.formatLanguageCode(code2));
        if (this.options.load !== "languageOnly" && this.options.load !== "currentOnly") addCode(this.getScriptPartFromCode(code2));
        if (this.options.load !== "currentOnly") addCode(this.getLanguagePartFromCode(code2));
      } else if (isString$1(code2)) {
        addCode(this.formatLanguageCode(code2));
      }
      fallbackCodes.forEach((fc) => {
        if (codes.indexOf(fc) < 0) addCode(this.formatLanguageCode(fc));
      });
      return codes;
    }
  }
  const suffixesOrder = {
    zero: 0,
    one: 1,
    two: 2,
    few: 3,
    many: 4,
    other: 5
  };
  const dummyRule = {
    select: (count2) => count2 === 1 ? "one" : "other",
    resolvedOptions: () => ({
      pluralCategories: ["one", "other"]
    })
  };
  class PluralResolver {
    constructor(languageUtils, options = {}) {
      this.languageUtils = languageUtils;
      this.options = options;
      this.logger = baseLogger.create("pluralResolver");
      this.pluralRulesCache = {};
    }
    clearCache() {
      this.pluralRulesCache = {};
    }
    getRule(code2, options = {}) {
      const cleanedCode = getCleanedCode(code2 === "dev" ? "en" : code2);
      const type = options.ordinal ? "ordinal" : "cardinal";
      const cacheKey = JSON.stringify({
        cleanedCode,
        type
      });
      if (cacheKey in this.pluralRulesCache) {
        return this.pluralRulesCache[cacheKey];
      }
      let rule;
      try {
        rule = new Intl.PluralRules(cleanedCode, {
          type
        });
      } catch (err) {
        if (typeof Intl === "undefined") {
          this.logger.error("No Intl support, please use an Intl polyfill!");
          return dummyRule;
        }
        if (!code2.match(/-|_/)) return dummyRule;
        const lngPart = this.languageUtils.getLanguagePartFromCode(code2);
        rule = this.getRule(lngPart, options);
      }
      this.pluralRulesCache[cacheKey] = rule;
      return rule;
    }
    needsPlural(code2, options = {}) {
      let rule = this.getRule(code2, options);
      if (!rule) rule = this.getRule("dev", options);
      return rule?.resolvedOptions().pluralCategories.length > 1;
    }
    getPluralFormsOfKey(code2, key2, options = {}) {
      return this.getSuffixes(code2, options).map((suffix) => `${key2}${suffix}`);
    }
    getSuffixes(code2, options = {}) {
      let rule = this.getRule(code2, options);
      if (!rule) rule = this.getRule("dev", options);
      if (!rule) return [];
      return rule.resolvedOptions().pluralCategories.sort((pluralCategory1, pluralCategory2) => suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2]).map((pluralCategory) => `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ""}${pluralCategory}`);
    }
    getSuffix(code2, count2, options = {}) {
      const rule = this.getRule(code2, options);
      if (rule) {
        return `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ""}${rule.select(count2)}`;
      }
      this.logger.warn(`no plural rule found for: ${code2}`);
      return this.getSuffix("dev", count2, options);
    }
  }
  const deepFindWithDefaults = (data, defaultData, key2, keySeparator = ".", ignoreJSONStructure = true) => {
    let path2 = getPathWithDefaults(data, defaultData, key2);
    if (!path2 && ignoreJSONStructure && isString$1(key2)) {
      path2 = deepFind(data, key2, keySeparator);
      if (path2 === void 0) path2 = deepFind(defaultData, key2, keySeparator);
    }
    return path2;
  };
  const regexSafe = (val) => val.replace(/\$/g, "$$$$");
  class Interpolator {
    constructor(options = {}) {
      this.logger = baseLogger.create("interpolator");
      this.options = options;
      this.format = options?.interpolation?.format || ((value) => value);
      this.init(options);
    }
    init(options = {}) {
      if (!options.interpolation) options.interpolation = {
        escapeValue: true
      };
      const {
        escape: escape$1,
        escapeValue,
        useRawValueToEscape,
        prefix,
        prefixEscaped,
        suffix,
        suffixEscaped,
        formatSeparator,
        unescapeSuffix,
        unescapePrefix,
        nestingPrefix,
        nestingPrefixEscaped,
        nestingSuffix,
        nestingSuffixEscaped,
        nestingOptionsSeparator,
        maxReplaces,
        alwaysFormat
      } = options.interpolation;
      this.escape = escape$1 !== void 0 ? escape$1 : escape;
      this.escapeValue = escapeValue !== void 0 ? escapeValue : true;
      this.useRawValueToEscape = useRawValueToEscape !== void 0 ? useRawValueToEscape : false;
      this.prefix = prefix ? regexEscape(prefix) : prefixEscaped || "{{";
      this.suffix = suffix ? regexEscape(suffix) : suffixEscaped || "}}";
      this.formatSeparator = formatSeparator || ",";
      this.unescapePrefix = unescapeSuffix ? "" : unescapePrefix || "-";
      this.unescapeSuffix = this.unescapePrefix ? "" : unescapeSuffix || "";
      this.nestingPrefix = nestingPrefix ? regexEscape(nestingPrefix) : nestingPrefixEscaped || regexEscape("$t(");
      this.nestingSuffix = nestingSuffix ? regexEscape(nestingSuffix) : nestingSuffixEscaped || regexEscape(")");
      this.nestingOptionsSeparator = nestingOptionsSeparator || ",";
      this.maxReplaces = maxReplaces || 1e3;
      this.alwaysFormat = alwaysFormat !== void 0 ? alwaysFormat : false;
      this.resetRegExp();
    }
    reset() {
      if (this.options) this.init(this.options);
    }
    resetRegExp() {
      const getOrResetRegExp = (existingRegExp, pattern) => {
        if (existingRegExp?.source === pattern) {
          existingRegExp.lastIndex = 0;
          return existingRegExp;
        }
        return new RegExp(pattern, "g");
      };
      this.regexp = getOrResetRegExp(this.regexp, `${this.prefix}(.+?)${this.suffix}`);
      this.regexpUnescape = getOrResetRegExp(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`);
      this.nestingRegexp = getOrResetRegExp(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`);
    }
    interpolate(str, data, lng, options) {
      let match;
      let value;
      let replaces;
      const defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
      const handleFormat = (key2) => {
        if (key2.indexOf(this.formatSeparator) < 0) {
          const path2 = deepFindWithDefaults(data, defaultData, key2, this.options.keySeparator, this.options.ignoreJSONStructure);
          return this.alwaysFormat ? this.format(path2, void 0, lng, {
            ...options,
            ...data,
            interpolationkey: key2
          }) : path2;
        }
        const p2 = key2.split(this.formatSeparator);
        const k2 = p2.shift().trim();
        const f2 = p2.join(this.formatSeparator).trim();
        return this.format(deepFindWithDefaults(data, defaultData, k2, this.options.keySeparator, this.options.ignoreJSONStructure), f2, lng, {
          ...options,
          ...data,
          interpolationkey: k2
        });
      };
      this.resetRegExp();
      const missingInterpolationHandler = options?.missingInterpolationHandler || this.options.missingInterpolationHandler;
      const skipOnVariables = options?.interpolation?.skipOnVariables !== void 0 ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
      const todos = [{
        regex: this.regexpUnescape,
        safeValue: (val) => regexSafe(val)
      }, {
        regex: this.regexp,
        safeValue: (val) => this.escapeValue ? regexSafe(this.escape(val)) : regexSafe(val)
      }];
      todos.forEach((todo) => {
        replaces = 0;
        while (match = todo.regex.exec(str)) {
          const matchedVar = match[1].trim();
          value = handleFormat(matchedVar);
          if (value === void 0) {
            if (typeof missingInterpolationHandler === "function") {
              const temp = missingInterpolationHandler(str, match, options);
              value = isString$1(temp) ? temp : "";
            } else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) {
              value = "";
            } else if (skipOnVariables) {
              value = match[0];
              continue;
            } else {
              this.logger.warn(`missed to pass in variable ${matchedVar} for interpolating ${str}`);
              value = "";
            }
          } else if (!isString$1(value) && !this.useRawValueToEscape) {
            value = makeString(value);
          }
          const safeValue = todo.safeValue(value);
          str = str.replace(match[0], safeValue);
          if (skipOnVariables) {
            todo.regex.lastIndex += value.length;
            todo.regex.lastIndex -= match[0].length;
          } else {
            todo.regex.lastIndex = 0;
          }
          replaces++;
          if (replaces >= this.maxReplaces) {
            break;
          }
        }
      });
      return str;
    }
    nest(str, fc, options = {}) {
      let match;
      let value;
      let clonedOptions;
      const handleHasOptions = (key2, inheritedOptions) => {
        const sep = this.nestingOptionsSeparator;
        if (key2.indexOf(sep) < 0) return key2;
        const c2 = key2.split(new RegExp(`${regexEscape(sep)}[ ]*{`));
        let optionsString = `{${c2[1]}`;
        key2 = c2[0];
        optionsString = this.interpolate(optionsString, clonedOptions);
        const matchedSingleQuotes = optionsString.match(/'/g);
        const matchedDoubleQuotes = optionsString.match(/"/g);
        if ((matchedSingleQuotes?.length ?? 0) % 2 === 0 && !matchedDoubleQuotes || (matchedDoubleQuotes?.length ?? 0) % 2 !== 0) {
          optionsString = optionsString.replace(/'/g, '"');
        }
        try {
          clonedOptions = JSON.parse(optionsString);
          if (inheritedOptions) clonedOptions = {
            ...inheritedOptions,
            ...clonedOptions
          };
        } catch (e2) {
          this.logger.warn(`failed parsing options string in nesting for key ${key2}`, e2);
          return `${key2}${sep}${optionsString}`;
        }
        if (clonedOptions.defaultValue && clonedOptions.defaultValue.indexOf(this.prefix) > -1) delete clonedOptions.defaultValue;
        return key2;
      };
      while (match = this.nestingRegexp.exec(str)) {
        let formatters = [];
        clonedOptions = {
          ...options
        };
        clonedOptions = clonedOptions.replace && !isString$1(clonedOptions.replace) ? clonedOptions.replace : clonedOptions;
        clonedOptions.applyPostProcessor = false;
        delete clonedOptions.defaultValue;
        const keyEndIndex = /{.*}/.test(match[1]) ? match[1].lastIndexOf("}") + 1 : match[1].indexOf(this.formatSeparator);
        if (keyEndIndex !== -1) {
          formatters = match[1].slice(keyEndIndex).split(this.formatSeparator).map((elem) => elem.trim()).filter(Boolean);
          match[1] = match[1].slice(0, keyEndIndex);
        }
        value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
        if (value && match[0] === str && !isString$1(value)) return value;
        if (!isString$1(value)) value = makeString(value);
        if (!value) {
          this.logger.warn(`missed to resolve ${match[1]} for nesting ${str}`);
          value = "";
        }
        if (formatters.length) {
          value = formatters.reduce((v2, f2) => this.format(v2, f2, options.lng, {
            ...options,
            interpolationkey: match[1].trim()
          }), value.trim());
        }
        str = str.replace(match[0], value);
        this.regexp.lastIndex = 0;
      }
      return str;
    }
  }
  const parseFormatStr = (formatStr) => {
    let formatName = formatStr.toLowerCase().trim();
    const formatOptions = {};
    if (formatStr.indexOf("(") > -1) {
      const p2 = formatStr.split("(");
      formatName = p2[0].toLowerCase().trim();
      const optStr = p2[1].substring(0, p2[1].length - 1);
      if (formatName === "currency" && optStr.indexOf(":") < 0) {
        if (!formatOptions.currency) formatOptions.currency = optStr.trim();
      } else if (formatName === "relativetime" && optStr.indexOf(":") < 0) {
        if (!formatOptions.range) formatOptions.range = optStr.trim();
      } else {
        const opts = optStr.split(";");
        opts.forEach((opt) => {
          if (opt) {
            const [key2, ...rest] = opt.split(":");
            const val = rest.join(":").trim().replace(/^'+|'+$/g, "");
            const trimmedKey = key2.trim();
            if (!formatOptions[trimmedKey]) formatOptions[trimmedKey] = val;
            if (val === "false") formatOptions[trimmedKey] = false;
            if (val === "true") formatOptions[trimmedKey] = true;
            if (!isNaN(val)) formatOptions[trimmedKey] = parseInt(val, 10);
          }
        });
      }
    }
    return {
      formatName,
      formatOptions
    };
  };
  const createCachedFormatter = (fn2) => {
    const cache = {};
    return (v2, l2, o2) => {
      let optForCache = o2;
      if (o2 && o2.interpolationkey && o2.formatParams && o2.formatParams[o2.interpolationkey] && o2[o2.interpolationkey]) {
        optForCache = {
          ...optForCache,
          [o2.interpolationkey]: void 0
        };
      }
      const key2 = l2 + JSON.stringify(optForCache);
      let frm = cache[key2];
      if (!frm) {
        frm = fn2(getCleanedCode(l2), o2);
        cache[key2] = frm;
      }
      return frm(v2);
    };
  };
  const createNonCachedFormatter = (fn2) => (v2, l2, o2) => fn2(getCleanedCode(l2), o2)(v2);
  class Formatter {
    constructor(options = {}) {
      this.logger = baseLogger.create("formatter");
      this.options = options;
      this.init(options);
    }
    init(services, options = {
      interpolation: {}
    }) {
      this.formatSeparator = options.interpolation.formatSeparator || ",";
      const cf = options.cacheInBuiltFormats ? createCachedFormatter : createNonCachedFormatter;
      this.formats = {
        number: cf((lng, opt) => {
          const formatter = new Intl.NumberFormat(lng, {
            ...opt
          });
          return (val) => formatter.format(val);
        }),
        currency: cf((lng, opt) => {
          const formatter = new Intl.NumberFormat(lng, {
            ...opt,
            style: "currency"
          });
          return (val) => formatter.format(val);
        }),
        datetime: cf((lng, opt) => {
          const formatter = new Intl.DateTimeFormat(lng, {
            ...opt
          });
          return (val) => formatter.format(val);
        }),
        relativetime: cf((lng, opt) => {
          const formatter = new Intl.RelativeTimeFormat(lng, {
            ...opt
          });
          return (val) => formatter.format(val, opt.range || "day");
        }),
        list: cf((lng, opt) => {
          const formatter = new Intl.ListFormat(lng, {
            ...opt
          });
          return (val) => formatter.format(val);
        })
      };
    }
    add(name, fc) {
      this.formats[name.toLowerCase().trim()] = fc;
    }
    addCached(name, fc) {
      this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
    }
    format(value, format, lng, options = {}) {
      const formats = format.split(this.formatSeparator);
      if (formats.length > 1 && formats[0].indexOf("(") > 1 && formats[0].indexOf(")") < 0 && formats.find((f2) => f2.indexOf(")") > -1)) {
        const lastIndex = formats.findIndex((f2) => f2.indexOf(")") > -1);
        formats[0] = [formats[0], ...formats.splice(1, lastIndex)].join(this.formatSeparator);
      }
      const result = formats.reduce((mem, f2) => {
        const {
          formatName,
          formatOptions
        } = parseFormatStr(f2);
        if (this.formats[formatName]) {
          let formatted = mem;
          try {
            const valOptions = options?.formatParams?.[options.interpolationkey] || {};
            const l2 = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
            formatted = this.formats[formatName](mem, l2, {
              ...formatOptions,
              ...options,
              ...valOptions
            });
          } catch (error) {
            this.logger.warn(error);
          }
          return formatted;
        } else {
          this.logger.warn(`there was no format function for ${formatName}`);
        }
        return mem;
      }, value);
      return result;
    }
  }
  const removePending = (q2, name) => {
    if (q2.pending[name] !== void 0) {
      delete q2.pending[name];
      q2.pendingCount--;
    }
  };
  class Connector extends EventEmitter$1 {
    constructor(backend, store, services, options = {}) {
      super();
      this.backend = backend;
      this.store = store;
      this.services = services;
      this.languageUtils = services.languageUtils;
      this.options = options;
      this.logger = baseLogger.create("backendConnector");
      this.waitingReads = [];
      this.maxParallelReads = options.maxParallelReads || 10;
      this.readingCalls = 0;
      this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
      this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
      this.state = {};
      this.queue = [];
      this.backend?.init?.(services, options.backend, options);
    }
    queueLoad(languages, namespaces, options, callback) {
      const toLoad = {};
      const pending = {};
      const toLoadLanguages = {};
      const toLoadNamespaces = {};
      languages.forEach((lng) => {
        let hasAllNamespaces = true;
        namespaces.forEach((ns) => {
          const name = `${lng}|${ns}`;
          if (!options.reload && this.store.hasResourceBundle(lng, ns)) {
            this.state[name] = 2;
          } else if (this.state[name] < 0) ;
          else if (this.state[name] === 1) {
            if (pending[name] === void 0) pending[name] = true;
          } else {
            this.state[name] = 1;
            hasAllNamespaces = false;
            if (pending[name] === void 0) pending[name] = true;
            if (toLoad[name] === void 0) toLoad[name] = true;
            if (toLoadNamespaces[ns] === void 0) toLoadNamespaces[ns] = true;
          }
        });
        if (!hasAllNamespaces) toLoadLanguages[lng] = true;
      });
      if (Object.keys(toLoad).length || Object.keys(pending).length) {
        this.queue.push({
          pending,
          pendingCount: Object.keys(pending).length,
          loaded: {},
          errors: [],
          callback
        });
      }
      return {
        toLoad: Object.keys(toLoad),
        pending: Object.keys(pending),
        toLoadLanguages: Object.keys(toLoadLanguages),
        toLoadNamespaces: Object.keys(toLoadNamespaces)
      };
    }
    loaded(name, err, data) {
      const s2 = name.split("|");
      const lng = s2[0];
      const ns = s2[1];
      if (err) this.emit("failedLoading", lng, ns, err);
      if (!err && data) {
        this.store.addResourceBundle(lng, ns, data, void 0, void 0, {
          skipCopy: true
        });
      }
      this.state[name] = err ? -1 : 2;
      if (err && data) this.state[name] = 0;
      const loaded = {};
      this.queue.forEach((q2) => {
        pushPath(q2.loaded, [lng], ns);
        removePending(q2, name);
        if (err) q2.errors.push(err);
        if (q2.pendingCount === 0 && !q2.done) {
          Object.keys(q2.loaded).forEach((l2) => {
            if (!loaded[l2]) loaded[l2] = {};
            const loadedKeys = q2.loaded[l2];
            if (loadedKeys.length) {
              loadedKeys.forEach((n2) => {
                if (loaded[l2][n2] === void 0) loaded[l2][n2] = true;
              });
            }
          });
          q2.done = true;
          if (q2.errors.length) {
            q2.callback(q2.errors);
          } else {
            q2.callback();
          }
        }
      });
      this.emit("loaded", loaded);
      this.queue = this.queue.filter((q2) => !q2.done);
    }
    read(lng, ns, fcName, tried = 0, wait = this.retryTimeout, callback) {
      if (!lng.length) return callback(null, {});
      if (this.readingCalls >= this.maxParallelReads) {
        this.waitingReads.push({
          lng,
          ns,
          fcName,
          tried,
          wait,
          callback
        });
        return;
      }
      this.readingCalls++;
      const resolver2 = (err, data) => {
        this.readingCalls--;
        if (this.waitingReads.length > 0) {
          const next = this.waitingReads.shift();
          this.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
        }
        if (err && data && tried < this.maxRetries) {
          setTimeout(() => {
            this.read.call(this, lng, ns, fcName, tried + 1, wait * 2, callback);
          }, wait);
          return;
        }
        callback(err, data);
      };
      const fc = this.backend[fcName].bind(this.backend);
      if (fc.length === 2) {
        try {
          const r2 = fc(lng, ns);
          if (r2 && typeof r2.then === "function") {
            r2.then((data) => resolver2(null, data)).catch(resolver2);
          } else {
            resolver2(null, r2);
          }
        } catch (err) {
          resolver2(err);
        }
        return;
      }
      return fc(lng, ns, resolver2);
    }
    prepareLoading(languages, namespaces, options = {}, callback) {
      if (!this.backend) {
        this.logger.warn("No backend was added via i18next.use. Will not load resources.");
        return callback && callback();
      }
      if (isString$1(languages)) languages = this.languageUtils.toResolveHierarchy(languages);
      if (isString$1(namespaces)) namespaces = [namespaces];
      const toLoad = this.queueLoad(languages, namespaces, options, callback);
      if (!toLoad.toLoad.length) {
        if (!toLoad.pending.length) callback();
        return null;
      }
      toLoad.toLoad.forEach((name) => {
        this.loadOne(name);
      });
    }
    load(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {}, callback);
    }
    reload(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {
        reload: true
      }, callback);
    }
    loadOne(name, prefix = "") {
      const s2 = name.split("|");
      const lng = s2[0];
      const ns = s2[1];
      this.read(lng, ns, "read", void 0, void 0, (err, data) => {
        if (err) this.logger.warn(`${prefix}loading namespace ${ns} for language ${lng} failed`, err);
        if (!err && data) this.logger.log(`${prefix}loaded namespace ${ns} for language ${lng}`, data);
        this.loaded(name, err, data);
      });
    }
    saveMissing(languages, namespace, key2, fallbackValue, isUpdate, options = {}, clb = () => {
    }) {
      if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(namespace)) {
        this.logger.warn(`did not save key "${key2}" as the namespace "${namespace}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
        return;
      }
      if (key2 === void 0 || key2 === null || key2 === "") return;
      if (this.backend?.create) {
        const opts = {
          ...options,
          isUpdate
        };
        const fc = this.backend.create.bind(this.backend);
        if (fc.length < 6) {
          try {
            let r2;
            if (fc.length === 5) {
              r2 = fc(languages, namespace, key2, fallbackValue, opts);
            } else {
              r2 = fc(languages, namespace, key2, fallbackValue);
            }
            if (r2 && typeof r2.then === "function") {
              r2.then((data) => clb(null, data)).catch(clb);
            } else {
              clb(null, r2);
            }
          } catch (err) {
            clb(err);
          }
        } else {
          fc(languages, namespace, key2, fallbackValue, clb, opts);
        }
      }
      if (!languages || !languages[0]) return;
      this.store.addResource(languages[0], namespace, key2, fallbackValue);
    }
  }
  const get = () => ({
    debug: false,
    initAsync: true,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: false,
    supportedLngs: false,
    nonExplicitSupportedLngs: false,
    load: "all",
    preload: false,
    simplifyPluralSuffix: true,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: false,
    saveMissing: false,
    updateMissing: false,
    saveMissingTo: "fallback",
    saveMissingPlurals: true,
    missingKeyHandler: false,
    missingInterpolationHandler: false,
    postProcess: false,
    postProcessPassResolved: false,
    returnNull: false,
    returnEmptyString: true,
    returnObjects: false,
    joinArrays: false,
    returnedObjectHandler: false,
    parseMissingKeyHandler: false,
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: (args) => {
      let ret = {};
      if (typeof args[1] === "object") ret = args[1];
      if (isString$1(args[1])) ret.defaultValue = args[1];
      if (isString$1(args[2])) ret.tDescription = args[2];
      if (typeof args[2] === "object" || typeof args[3] === "object") {
        const options = args[3] || args[2];
        Object.keys(options).forEach((key2) => {
          ret[key2] = options[key2];
        });
      }
      return ret;
    },
    interpolation: {
      escapeValue: true,
      format: (value) => value,
      prefix: "{{",
      suffix: "}}",
      formatSeparator: ",",
      unescapePrefix: "-",
      nestingPrefix: "$t(",
      nestingSuffix: ")",
      nestingOptionsSeparator: ",",
      maxReplaces: 1e3,
      skipOnVariables: true
    },
    cacheInBuiltFormats: true
  });
  const transformOptions = (options) => {
    if (isString$1(options.ns)) options.ns = [options.ns];
    if (isString$1(options.fallbackLng)) options.fallbackLng = [options.fallbackLng];
    if (isString$1(options.fallbackNS)) options.fallbackNS = [options.fallbackNS];
    if (options.supportedLngs?.indexOf?.("cimode") < 0) {
      options.supportedLngs = options.supportedLngs.concat(["cimode"]);
    }
    if (typeof options.initImmediate === "boolean") options.initAsync = options.initImmediate;
    return options;
  };
  const noop$1 = () => {
  };
  const bindMemberFunctions = (inst) => {
    const mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
    mems.forEach((mem) => {
      if (typeof inst[mem] === "function") {
        inst[mem] = inst[mem].bind(inst);
      }
    });
  };
  const SUPPORT_NOTICE_KEY = "__i18next_supportNoticeShown";
  const getSupportNoticeShown = () => typeof globalThis !== "undefined" && !!globalThis[SUPPORT_NOTICE_KEY];
  const setSupportNoticeShown = () => {
    if (typeof globalThis !== "undefined") globalThis[SUPPORT_NOTICE_KEY] = true;
  };
  const usesLocize = (inst) => {
    if (inst?.modules?.backend?.name?.indexOf("Locize") > 0) return true;
    if (inst?.modules?.backend?.constructor?.name?.indexOf("Locize") > 0) return true;
    if (inst?.options?.backend?.backends) {
      if (inst.options.backend.backends.some((b2) => b2?.name?.indexOf("Locize") > 0 || b2?.constructor?.name?.indexOf("Locize") > 0)) return true;
    }
    if (inst?.options?.backend?.projectId) return true;
    if (inst?.options?.backend?.backendOptions) {
      if (inst.options.backend.backendOptions.some((b2) => b2?.projectId)) return true;
    }
    return false;
  };
  class I18n extends EventEmitter$1 {
    constructor(options = {}, callback) {
      super();
      this.options = transformOptions(options);
      this.services = {};
      this.logger = baseLogger;
      this.modules = {
        external: []
      };
      bindMemberFunctions(this);
      if (callback && !this.isInitialized && !options.isClone) {
        if (!this.options.initAsync) {
          this.init(options, callback);
          return this;
        }
        setTimeout(() => {
          this.init(options, callback);
        }, 0);
      }
    }
    init(options = {}, callback) {
      this.isInitializing = true;
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      if (options.defaultNS == null && options.ns) {
        if (isString$1(options.ns)) {
          options.defaultNS = options.ns;
        } else if (options.ns.indexOf("translation") < 0) {
          options.defaultNS = options.ns[0];
        }
      }
      const defOpts = get();
      this.options = {
        ...defOpts,
        ...this.options,
        ...transformOptions(options)
      };
      this.options.interpolation = {
        ...defOpts.interpolation,
        ...this.options.interpolation
      };
      if (options.keySeparator !== void 0) {
        this.options.userDefinedKeySeparator = options.keySeparator;
      }
      if (options.nsSeparator !== void 0) {
        this.options.userDefinedNsSeparator = options.nsSeparator;
      }
      if (typeof this.options.overloadTranslationOptionHandler !== "function") {
        this.options.overloadTranslationOptionHandler = defOpts.overloadTranslationOptionHandler;
      }
      if (this.options.showSupportNotice !== false && !usesLocize(this) && !getSupportNoticeShown()) {
        if (typeof console !== "undefined" && typeof console.info !== "undefined") console.info("🌐 i18next is maintained with support from Locize — consider powering your project with managed localization (AI, CDN, integrations): https://locize.com 💙");
        setSupportNoticeShown();
      }
      const createClassOnDemand = (ClassOrObject) => {
        if (!ClassOrObject) return null;
        if (typeof ClassOrObject === "function") return new ClassOrObject();
        return ClassOrObject;
      };
      if (!this.options.isClone) {
        if (this.modules.logger) {
          baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
        } else {
          baseLogger.init(null, this.options);
        }
        let formatter;
        if (this.modules.formatter) {
          formatter = this.modules.formatter;
        } else {
          formatter = Formatter;
        }
        const lu = new LanguageUtil(this.options);
        this.store = new ResourceStore(this.options.resources, this.options);
        const s2 = this.services;
        s2.logger = baseLogger;
        s2.resourceStore = this.store;
        s2.languageUtils = lu;
        s2.pluralResolver = new PluralResolver(lu, {
          prepend: this.options.pluralSeparator,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix
        });
        const usingLegacyFormatFunction = this.options.interpolation.format && this.options.interpolation.format !== defOpts.interpolation.format;
        if (usingLegacyFormatFunction) {
          this.logger.deprecate(`init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting`);
        }
        if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
          s2.formatter = createClassOnDemand(formatter);
          if (s2.formatter.init) s2.formatter.init(s2, this.options);
          this.options.interpolation.format = s2.formatter.format.bind(s2.formatter);
        }
        s2.interpolator = new Interpolator(this.options);
        s2.utils = {
          hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
        };
        s2.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s2.resourceStore, s2, this.options);
        s2.backendConnector.on("*", (event, ...args) => {
          this.emit(event, ...args);
        });
        if (this.modules.languageDetector) {
          s2.languageDetector = createClassOnDemand(this.modules.languageDetector);
          if (s2.languageDetector.init) s2.languageDetector.init(s2, this.options.detection, this.options);
        }
        if (this.modules.i18nFormat) {
          s2.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
          if (s2.i18nFormat.init) s2.i18nFormat.init(this);
        }
        this.translator = new Translator(this.services, this.options);
        this.translator.on("*", (event, ...args) => {
          this.emit(event, ...args);
        });
        this.modules.external.forEach((m2) => {
          if (m2.init) m2.init(this);
        });
      }
      this.format = this.options.interpolation.format;
      if (!callback) callback = noop$1;
      if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
        const codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        if (codes.length > 0 && codes[0] !== "dev") this.options.lng = codes[0];
      }
      if (!this.services.languageDetector && !this.options.lng) {
        this.logger.warn("init: no languageDetector is used and no lng is defined");
      }
      const storeApi = ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"];
      storeApi.forEach((fcName) => {
        this[fcName] = (...args) => this.store[fcName](...args);
      });
      const storeApiChained = ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"];
      storeApiChained.forEach((fcName) => {
        this[fcName] = (...args) => {
          this.store[fcName](...args);
          return this;
        };
      });
      const deferred = defer();
      const load = () => {
        const finish = (err, t2) => {
          this.isInitializing = false;
          if (this.isInitialized && !this.initializedStoreOnce) this.logger.warn("init: i18next is already initialized. You should call init just once!");
          this.isInitialized = true;
          if (!this.options.isClone) this.logger.log("initialized", this.options);
          this.emit("initialized", this.options);
          deferred.resolve(t2);
          callback(err, t2);
        };
        if (this.languages && !this.isInitialized) return finish(null, this.t.bind(this));
        this.changeLanguage(this.options.lng, finish);
      };
      if (this.options.resources || !this.options.initAsync) {
        load();
      } else {
        setTimeout(load, 0);
      }
      return deferred;
    }
    loadResources(language, callback = noop$1) {
      let usedCallback = callback;
      const usedLng = isString$1(language) ? language : this.language;
      if (typeof language === "function") usedCallback = language;
      if (!this.options.resources || this.options.partialBundledLanguages) {
        if (usedLng?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return usedCallback();
        const toLoad = [];
        const append = (lng) => {
          if (!lng) return;
          if (lng === "cimode") return;
          const lngs = this.services.languageUtils.toResolveHierarchy(lng);
          lngs.forEach((l2) => {
            if (l2 === "cimode") return;
            if (toLoad.indexOf(l2) < 0) toLoad.push(l2);
          });
        };
        if (!usedLng) {
          const fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
          fallbacks.forEach((l2) => append(l2));
        } else {
          append(usedLng);
        }
        this.options.preload?.forEach?.((l2) => append(l2));
        this.services.backendConnector.load(toLoad, this.options.ns, (e2) => {
          if (!e2 && !this.resolvedLanguage && this.language) this.setResolvedLanguage(this.language);
          usedCallback(e2);
        });
      } else {
        usedCallback(null);
      }
    }
    reloadResources(lngs, ns, callback) {
      const deferred = defer();
      if (typeof lngs === "function") {
        callback = lngs;
        lngs = void 0;
      }
      if (typeof ns === "function") {
        callback = ns;
        ns = void 0;
      }
      if (!lngs) lngs = this.languages;
      if (!ns) ns = this.options.ns;
      if (!callback) callback = noop$1;
      this.services.backendConnector.reload(lngs, ns, (err) => {
        deferred.resolve();
        callback(err);
      });
      return deferred;
    }
    use(module) {
      if (!module) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
      if (!module.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
      if (module.type === "backend") {
        this.modules.backend = module;
      }
      if (module.type === "logger" || module.log && module.warn && module.error) {
        this.modules.logger = module;
      }
      if (module.type === "languageDetector") {
        this.modules.languageDetector = module;
      }
      if (module.type === "i18nFormat") {
        this.modules.i18nFormat = module;
      }
      if (module.type === "postProcessor") {
        postProcessor.addPostProcessor(module);
      }
      if (module.type === "formatter") {
        this.modules.formatter = module;
      }
      if (module.type === "3rdParty") {
        this.modules.external.push(module);
      }
      return this;
    }
    setResolvedLanguage(l2) {
      if (!l2 || !this.languages) return;
      if (["cimode", "dev"].indexOf(l2) > -1) return;
      for (let li2 = 0; li2 < this.languages.length; li2++) {
        const lngInLngs = this.languages[li2];
        if (["cimode", "dev"].indexOf(lngInLngs) > -1) continue;
        if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
          this.resolvedLanguage = lngInLngs;
          break;
        }
      }
      if (!this.resolvedLanguage && this.languages.indexOf(l2) < 0 && this.store.hasLanguageSomeTranslations(l2)) {
        this.resolvedLanguage = l2;
        this.languages.unshift(l2);
      }
    }
    changeLanguage(lng, callback) {
      this.isLanguageChangingTo = lng;
      const deferred = defer();
      this.emit("languageChanging", lng);
      const setLngProps = (l2) => {
        this.language = l2;
        this.languages = this.services.languageUtils.toResolveHierarchy(l2);
        this.resolvedLanguage = void 0;
        this.setResolvedLanguage(l2);
      };
      const done = (err, l2) => {
        if (l2) {
          if (this.isLanguageChangingTo === lng) {
            setLngProps(l2);
            this.translator.changeLanguage(l2);
            this.isLanguageChangingTo = void 0;
            this.emit("languageChanged", l2);
            this.logger.log("languageChanged", l2);
          }
        } else {
          this.isLanguageChangingTo = void 0;
        }
        deferred.resolve((...args) => this.t(...args));
        if (callback) callback(err, (...args) => this.t(...args));
      };
      const setLng = (lngs) => {
        if (!lng && !lngs && this.services.languageDetector) lngs = [];
        const fl = isString$1(lngs) ? lngs : lngs && lngs[0];
        const l2 = this.store.hasLanguageSomeTranslations(fl) ? fl : this.services.languageUtils.getBestMatchFromCodes(isString$1(lngs) ? [lngs] : lngs);
        if (l2) {
          if (!this.language) {
            setLngProps(l2);
          }
          if (!this.translator.language) this.translator.changeLanguage(l2);
          this.services.languageDetector?.cacheUserLanguage?.(l2);
        }
        this.loadResources(l2, (err) => {
          done(err, l2);
        });
      };
      if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
        setLng(this.services.languageDetector.detect());
      } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
        if (this.services.languageDetector.detect.length === 0) {
          this.services.languageDetector.detect().then(setLng);
        } else {
          this.services.languageDetector.detect(setLng);
        }
      } else {
        setLng(lng);
      }
      return deferred;
    }
    getFixedT(lng, ns, keyPrefix) {
      const fixedT = (key2, opts, ...rest) => {
        let o2;
        if (typeof opts !== "object") {
          o2 = this.options.overloadTranslationOptionHandler([key2, opts].concat(rest));
        } else {
          o2 = {
            ...opts
          };
        }
        o2.lng = o2.lng || fixedT.lng;
        o2.lngs = o2.lngs || fixedT.lngs;
        o2.ns = o2.ns || fixedT.ns;
        if (o2.keyPrefix !== "") o2.keyPrefix = o2.keyPrefix || keyPrefix || fixedT.keyPrefix;
        const keySeparator = this.options.keySeparator || ".";
        let resultKey;
        if (o2.keyPrefix && Array.isArray(key2)) {
          resultKey = key2.map((k2) => {
            if (typeof k2 === "function") k2 = keysFromSelector(k2, {
              ...this.options,
              ...opts
            });
            return `${o2.keyPrefix}${keySeparator}${k2}`;
          });
        } else {
          if (typeof key2 === "function") key2 = keysFromSelector(key2, {
            ...this.options,
            ...opts
          });
          resultKey = o2.keyPrefix ? `${o2.keyPrefix}${keySeparator}${key2}` : key2;
        }
        return this.t(resultKey, o2);
      };
      if (isString$1(lng)) {
        fixedT.lng = lng;
      } else {
        fixedT.lngs = lng;
      }
      fixedT.ns = ns;
      fixedT.keyPrefix = keyPrefix;
      return fixedT;
    }
    t(...args) {
      return this.translator?.translate(...args);
    }
    exists(...args) {
      return this.translator?.exists(...args);
    }
    setDefaultNamespace(ns) {
      this.options.defaultNS = ns;
    }
    hasLoadedNamespace(ns, options = {}) {
      if (!this.isInitialized) {
        this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages);
        return false;
      }
      if (!this.languages || !this.languages.length) {
        this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages);
        return false;
      }
      const lng = options.lng || this.resolvedLanguage || this.languages[0];
      const fallbackLng = this.options ? this.options.fallbackLng : false;
      const lastLng = this.languages[this.languages.length - 1];
      if (lng.toLowerCase() === "cimode") return true;
      const loadNotPending = (l2, n2) => {
        const loadState = this.services.backendConnector.state[`${l2}|${n2}`];
        return loadState === -1 || loadState === 0 || loadState === 2;
      };
      if (options.precheck) {
        const preResult = options.precheck(this, loadNotPending);
        if (preResult !== void 0) return preResult;
      }
      if (this.hasResourceBundle(lng, ns)) return true;
      if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
      if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
      return false;
    }
    loadNamespaces(ns, callback) {
      const deferred = defer();
      if (!this.options.ns) {
        if (callback) callback();
        return Promise.resolve();
      }
      if (isString$1(ns)) ns = [ns];
      ns.forEach((n2) => {
        if (this.options.ns.indexOf(n2) < 0) this.options.ns.push(n2);
      });
      this.loadResources((err) => {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
    loadLanguages(lngs, callback) {
      const deferred = defer();
      if (isString$1(lngs)) lngs = [lngs];
      const preloaded = this.options.preload || [];
      const newLngs = lngs.filter((lng) => preloaded.indexOf(lng) < 0 && this.services.languageUtils.isSupportedCode(lng));
      if (!newLngs.length) {
        if (callback) callback();
        return Promise.resolve();
      }
      this.options.preload = preloaded.concat(newLngs);
      this.loadResources((err) => {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
    dir(lng) {
      if (!lng) lng = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language);
      if (!lng) return "rtl";
      try {
        const l2 = new Intl.Locale(lng);
        if (l2 && l2.getTextInfo) {
          const ti = l2.getTextInfo();
          if (ti && ti.direction) return ti.direction;
        }
      } catch (e2) {
      }
      const rtlLngs = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"];
      const languageUtils = this.services?.languageUtils || new LanguageUtil(get());
      if (lng.toLowerCase().indexOf("-latn") > 1) return "ltr";
      return rtlLngs.indexOf(languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
    }
    static createInstance(options = {}, callback) {
      const instance2 = new I18n(options, callback);
      instance2.createInstance = I18n.createInstance;
      return instance2;
    }
    cloneInstance(options = {}, callback = noop$1) {
      const forkResourceStore = options.forkResourceStore;
      if (forkResourceStore) delete options.forkResourceStore;
      const mergedOptions = {
        ...this.options,
        ...options,
        ...{
          isClone: true
        }
      };
      const clone = new I18n(mergedOptions);
      if (options.debug !== void 0 || options.prefix !== void 0) {
        clone.logger = clone.logger.clone(options);
      }
      const membersToCopy = ["store", "services", "language"];
      membersToCopy.forEach((m2) => {
        clone[m2] = this[m2];
      });
      clone.services = {
        ...this.services
      };
      clone.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      if (forkResourceStore) {
        const clonedData = Object.keys(this.store.data).reduce((prev, l2) => {
          prev[l2] = {
            ...this.store.data[l2]
          };
          prev[l2] = Object.keys(prev[l2]).reduce((acc, n2) => {
            acc[n2] = {
              ...prev[l2][n2]
            };
            return acc;
          }, prev[l2]);
          return prev;
        }, {});
        clone.store = new ResourceStore(clonedData, mergedOptions);
        clone.services.resourceStore = clone.store;
      }
      if (options.interpolation) {
        const defOpts = get();
        const mergedInterpolation = {
          ...defOpts.interpolation,
          ...this.options.interpolation,
          ...options.interpolation
        };
        const mergedForInterpolator = {
          ...mergedOptions,
          interpolation: mergedInterpolation
        };
        clone.services.interpolator = new Interpolator(mergedForInterpolator);
      }
      clone.translator = new Translator(clone.services, mergedOptions);
      clone.translator.on("*", (event, ...args) => {
        clone.emit(event, ...args);
      });
      clone.init(mergedOptions, callback);
      clone.translator.options = mergedOptions;
      clone.translator.backendConnector.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      return clone;
    }
    toJSON() {
      return {
        options: this.options,
        store: this.store,
        language: this.language,
        languages: this.languages,
        resolvedLanguage: this.resolvedLanguage
      };
    }
  }
  const instance = I18n.createInstance();
  instance.createInstance;
  instance.dir;
  instance.init;
  instance.loadResources;
  instance.reloadResources;
  instance.use;
  instance.changeLanguage;
  instance.getFixedT;
  instance.t;
  instance.exists;
  instance.setDefaultNamespace;
  instance.hasLoadedNamespace;
  instance.loadNamespaces;
  instance.loadLanguages;
  var t$2, r, u, i, o = 0, f = [], c = l$1, e = c.__b, a = c.__r, v = c.diffed, l = c.__c, m = c.unmount, s = c.__;
  function p$1(n2, t2) {
    c.__h && c.__h(r, n2, o || t2), o = 0;
    var u2 = r.__H || (r.__H = { __: [], __h: [] });
    return n2 >= u2.__.length && u2.__.push({}), u2.__[n2];
  }
  function d(n2) {
    return o = 1, h(D$1, n2);
  }
  function h(n2, u2, i2) {
    var o2 = p$1(t$2++, 2);
    if (o2.t = n2, !o2.__c && (o2.__ = [i2 ? i2(u2) : D$1(void 0, u2), function(n3) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n3);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r, !r.__f)) {
      var f2 = function(n3, t2, r2) {
        if (!o2.__c.__H) return true;
        var u3 = o2.__c.__H.__.filter(function(n4) {
          return n4.__c;
        });
        if (u3.every(function(n4) {
          return !n4.__N;
        })) return !c2 || c2.call(this, n3, t2, r2);
        var i3 = o2.__c.props !== n3;
        return u3.some(function(n4) {
          if (n4.__N) {
            var t3 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t3 !== n4.__[0] && (i3 = true);
          }
        }), c2 && c2.call(this, n3, t2, r2) || i3;
      };
      r.__f = true;
      var c2 = r.shouldComponentUpdate, e2 = r.componentWillUpdate;
      r.componentWillUpdate = function(n3, t2, r2) {
        if (this.__e) {
          var u3 = c2;
          c2 = void 0, f2(n3, t2, r2), c2 = u3;
        }
        e2 && e2.call(this, n3, t2, r2);
      }, r.shouldComponentUpdate = f2;
    }
    return o2.__N || o2.__;
  }
  function y(n2, u2) {
    var i2 = p$1(t$2++, 3);
    !c.__s && C$1(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r.__H.__h.push(i2));
  }
  function _(n2, u2) {
    var i2 = p$1(t$2++, 4);
    !c.__s && C$1(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r.__h.push(i2));
  }
  function A$1(n2) {
    return o = 5, T$1(function() {
      return { current: n2 };
    }, []);
  }
  function F$1(n2, t2, r2) {
    o = 6, _(function() {
      if ("function" == typeof n2) {
        var r3 = n2(t2());
        return function() {
          n2(null), r3 && "function" == typeof r3 && r3();
        };
      }
      if (n2) return n2.current = t2(), function() {
        return n2.current = null;
      };
    }, null == r2 ? r2 : r2.concat(n2));
  }
  function T$1(n2, r2) {
    var u2 = p$1(t$2++, 7);
    return C$1(u2.__H, r2) && (u2.__ = n2(), u2.__H = r2, u2.__h = n2), u2.__;
  }
  function q$1(n2, t2) {
    return o = 8, T$1(function() {
      return n2;
    }, t2);
  }
  function x$1(n2) {
    var u2 = r.context[n2.__c], i2 = p$1(t$2++, 9);
    return i2.c = n2, u2 ? (null == i2.__ && (i2.__ = true, u2.sub(r)), u2.props.value) : n2.__;
  }
  function P$1(n2, t2) {
    c.useDebugValue && c.useDebugValue(t2 ? t2(n2) : n2);
  }
  function b(n2) {
    var u2 = p$1(t$2++, 10), i2 = d();
    return u2.__ = n2, r.componentDidCatch || (r.componentDidCatch = function(n3, t2) {
      u2.__ && u2.__(n3, t2), i2[1](n3);
    }), [i2[0], function() {
      i2[1](void 0);
    }];
  }
  function g$1() {
    var n2 = p$1(t$2++, 11);
    if (!n2.__) {
      for (var u2 = r.__v; null !== u2 && !u2.__m && null !== u2.__; ) u2 = u2.__;
      var i2 = u2.__m || (u2.__m = [0, 0]);
      n2.__ = "P" + i2[0] + "-" + i2[1]++;
    }
    return n2.__;
  }
  function j$1() {
    for (var n2; n2 = f.shift(); ) {
      var t2 = n2.__H;
      if (n2.__P && t2) try {
        t2.__h.some(z$1), t2.__h.some(B$1), t2.__h = [];
      } catch (r2) {
        t2.__h = [], c.__e(r2, n2.__v);
      }
    }
  }
  c.__b = function(n2) {
    r = null, e && e(n2);
  }, c.__ = function(n2, t2) {
    n2 && t2.__k && t2.__k.__m && (n2.__m = t2.__k.__m), s && s(n2, t2);
  }, c.__r = function(n2) {
    a && a(n2), t$2 = 0;
    var i2 = (r = n2.__c).__H;
    i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.some(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
    })) : (i2.__h.some(z$1), i2.__h.some(B$1), i2.__h = [], t$2 = 0)), u = r;
  }, c.diffed = function(n2) {
    v && v(n2);
    var t2 = n2.__c;
    t2 && t2.__H && (t2.__H.__h.length && (1 !== f.push(t2) && i === c.requestAnimationFrame || ((i = c.requestAnimationFrame) || w$1)(j$1)), t2.__H.__.some(function(n3) {
      n3.u && (n3.__H = n3.u), n3.u = void 0;
    })), u = r = null;
  }, c.__c = function(n2, t2) {
    t2.some(function(n3) {
      try {
        n3.__h.some(z$1), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B$1(n4);
        });
      } catch (r2) {
        t2.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t2 = [], c.__e(r2, n3.__v);
      }
    }), l && l(n2, t2);
  }, c.unmount = function(n2) {
    m && m(n2);
    var t2, r2 = n2.__c;
    r2 && r2.__H && (r2.__H.__.some(function(n3) {
      try {
        z$1(n3);
      } catch (n4) {
        t2 = n4;
      }
    }), r2.__H = void 0, t2 && c.__e(t2, r2.__v));
  };
  var k$1 = "function" == typeof requestAnimationFrame;
  function w$1(n2) {
    var t2, r2 = function() {
      clearTimeout(u2), k$1 && cancelAnimationFrame(t2), setTimeout(n2);
    }, u2 = setTimeout(r2, 35);
    k$1 && (t2 = requestAnimationFrame(r2));
  }
  function z$1(n2) {
    var t2 = r, u2 = n2.__c;
    "function" == typeof u2 && (n2.__c = void 0, u2()), r = t2;
  }
  function B$1(n2) {
    var t2 = r;
    n2.__c = n2.__(), r = t2;
  }
  function C$1(n2, t2) {
    return !n2 || n2.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n2[r2];
    });
  }
  function D$1(n2, t2) {
    return "function" == typeof t2 ? t2(n2) : t2;
  }
  function g(n2, t2) {
    for (var e2 in t2) n2[e2] = t2[e2];
    return n2;
  }
  function E(n2, t2) {
    for (var e2 in n2) if ("__source" !== e2 && !(e2 in t2)) return true;
    for (var r2 in t2) if ("__source" !== r2 && n2[r2] !== t2[r2]) return true;
    return false;
  }
  function C(n2, t2) {
    var e2 = t2(), r2 = d({ t: { __: e2, u: t2 } }), u2 = r2[0].t, o2 = r2[1];
    return _(function() {
      u2.__ = e2, u2.u = t2, R(u2) && o2({ t: u2 });
    }, [n2, e2, t2]), y(function() {
      return R(u2) && o2({ t: u2 }), n2(function() {
        R(u2) && o2({ t: u2 });
      });
    }, [n2]), e2;
  }
  function R(n2) {
    try {
      return !((t2 = n2.__) === (e2 = n2.u()) && (0 !== t2 || 1 / t2 == 1 / e2) || t2 != t2 && e2 != e2);
    } catch (n3) {
      return true;
    }
    var t2, e2;
  }
  function x(n2) {
    n2();
  }
  function w(n2) {
    return n2;
  }
  function k() {
    return [false, x];
  }
  var I = _;
  function N(n2, t2) {
    this.props = n2, this.context = t2;
  }
  function M(n2, e2) {
    function r2(n3) {
      var t2 = this.props.ref, r3 = t2 == n3.ref;
      return !r3 && t2 && (t2.call ? t2(null) : t2.current = null), e2 ? !e2(this.props, n3) || !r3 : E(this.props, n3);
    }
    function u2(e3) {
      return this.shouldComponentUpdate = r2, _$1(n2, e3);
    }
    return u2.displayName = "Memo(" + (n2.displayName || n2.name) + ")", u2.prototype.isReactComponent = true, u2.__f = true, u2.type = n2, u2;
  }
  (N.prototype = new x$2()).isPureReactComponent = true, N.prototype.shouldComponentUpdate = function(n2, t2) {
    return E(this.props, n2) || E(this.state, t2);
  };
  var T = l$1.__b;
  l$1.__b = function(n2) {
    n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), T && T(n2);
  };
  var A = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
  function D(n2) {
    function t2(t3) {
      var e2 = g({}, t3);
      return delete e2.ref, n2(e2, t3.ref || null);
    }
    return t2.$$typeof = A, t2.render = n2, t2.prototype.isReactComponent = t2.__f = true, t2.displayName = "ForwardRef(" + (n2.displayName || n2.name) + ")", t2;
  }
  var L = function(n2, t2) {
    return null == n2 ? null : L$1(L$1(n2).map(t2));
  }, O = { map: L, forEach: L, count: function(n2) {
    return n2 ? L$1(n2).length : 0;
  }, only: function(n2) {
    var t2 = L$1(n2);
    if (1 !== t2.length) throw "Children.only";
    return t2[0];
  }, toArray: L$1 }, U = l$1.__e;
  l$1.__e = function(n2, t2, e2, r2) {
    if (n2.then) {
      for (var u2, o2 = t2; o2 = o2.__; ) if ((u2 = o2.__c) && u2.__c) return null == t2.__e && (t2.__e = e2.__e, t2.__k = e2.__k), u2.__c(n2, t2);
    }
    U(n2, t2, e2, r2);
  };
  var F = l$1.unmount;
  function V(n2, t2, e2) {
    return n2 && (n2.__c && n2.__c.__H && (n2.__c.__H.__.forEach(function(n3) {
      "function" == typeof n3.__c && n3.__c();
    }), n2.__c.__H = null), null != (n2 = g({}, n2)).__c && (n2.__c.__P === e2 && (n2.__c.__P = t2), n2.__c.__e = true, n2.__c = null), n2.__k = n2.__k && n2.__k.map(function(n3) {
      return V(n3, t2, e2);
    })), n2;
  }
  function W(n2, t2, e2) {
    return n2 && e2 && (n2.__v = null, n2.__k = n2.__k && n2.__k.map(function(n3) {
      return W(n3, t2, e2);
    }), n2.__c && n2.__c.__P === t2 && (n2.__e && e2.appendChild(n2.__e), n2.__c.__e = true, n2.__c.__P = e2)), n2;
  }
  function P() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function j(n2) {
    if (!n2.__) return null;
    var t2 = n2.__.__c;
    return t2 && t2.__a && t2.__a(n2);
  }
  function z(n2) {
    var e2, r2, u2, o2 = null;
    function i2(i3) {
      if (e2 || (e2 = n2()).then(function(n3) {
        n3 && (o2 = n3.default || n3), u2 = true;
      }, function(n3) {
        r2 = n3, u2 = true;
      }), r2) throw r2;
      if (!u2) throw e2;
      return o2 ? _$1(o2, i3) : null;
    }
    return i2.displayName = "Lazy", i2.__f = true, i2;
  }
  function B() {
    this.i = null, this.l = null;
  }
  l$1.unmount = function(n2) {
    var t2 = n2.__c;
    t2 && (t2.__z = true), t2 && t2.__R && t2.__R(), t2 && 32 & n2.__u && (n2.type = null), F && F(n2);
  }, (P.prototype = new x$2()).__c = function(n2, t2) {
    var e2 = t2.__c, r2 = this;
    null == r2.o && (r2.o = []), r2.o.push(e2);
    var u2 = j(r2.__v), o2 = false, i2 = function() {
      o2 || r2.__z || (o2 = true, e2.__R = null, u2 ? u2(c2) : c2());
    };
    e2.__R = i2;
    var l2 = e2.__P;
    e2.__P = null;
    var c2 = function() {
      if (!--r2.__u) {
        if (r2.state.__a) {
          var n3 = r2.state.__a;
          r2.__v.__k[0] = W(n3, n3.__c.__P, n3.__c.__O);
        }
        var t3;
        for (r2.setState({ __a: r2.__b = null }); t3 = r2.o.pop(); ) t3.__P = l2, t3.forceUpdate();
      }
    };
    r2.__u++ || 32 & t2.__u || r2.setState({ __a: r2.__b = r2.__v.__k[0] }), n2.then(i2, i2);
  }, P.prototype.componentWillUnmount = function() {
    this.o = [];
  }, P.prototype.render = function(n2, e2) {
    if (this.__b) {
      if (this.__v.__k) {
        var r2 = document.createElement("div"), o2 = this.__v.__k[0].__c;
        this.__v.__k[0] = V(this.__b, r2, o2.__O = o2.__P);
      }
      this.__b = null;
    }
    var i2 = e2.__a && _$1(k$2, null, n2.fallback);
    return i2 && (i2.__u &= -33), [_$1(k$2, null, e2.__a ? null : n2.children), i2];
  };
  var H = function(n2, t2, e2) {
    if (++e2[1] === e2[0] && n2.l.delete(t2), n2.props.revealOrder && ("t" !== n2.props.revealOrder[0] || !n2.l.size)) for (e2 = n2.i; e2; ) {
      for (; e2.length > 3; ) e2.pop()();
      if (e2[1] < e2[0]) break;
      n2.i = e2 = e2[2];
    }
  };
  function Z(n2) {
    return this.getChildContext = function() {
      return n2.context;
    }, n2.children;
  }
  function Y(n2) {
    var e2 = this, r2 = n2.h;
    if (e2.componentWillUnmount = function() {
      J$1(null, e2.v), e2.v = null, e2.h = null;
    }, e2.h && e2.h !== r2 && e2.componentWillUnmount(), !e2.v) {
      for (var u2 = e2.__v; null !== u2 && !u2.__m && null !== u2.__; ) u2 = u2.__;
      e2.h = r2, e2.v = { nodeType: 1, parentNode: r2, childNodes: [], __k: { __m: u2.__m }, contains: function() {
        return true;
      }, namespaceURI: r2.namespaceURI, insertBefore: function(n3, t2) {
        this.childNodes.push(n3), e2.h.insertBefore(n3, t2);
      }, removeChild: function(n3) {
        this.childNodes.splice(this.childNodes.indexOf(n3) >>> 1, 1), e2.h.removeChild(n3);
      } };
    }
    J$1(_$1(Z, { context: e2.context }, n2.__v), e2.v);
  }
  function $(n2, e2) {
    var r2 = _$1(Y, { __v: n2, h: e2 });
    return r2.containerInfo = e2, r2;
  }
  (B.prototype = new x$2()).__a = function(n2) {
    var t2 = this, e2 = j(t2.__v), r2 = t2.l.get(n2);
    return r2[0]++, function(u2) {
      var o2 = function() {
        t2.props.revealOrder ? (r2.push(u2), H(t2, n2, r2)) : u2();
      };
      e2 ? e2(o2) : o2();
    };
  }, B.prototype.render = function(n2) {
    this.i = null, this.l = new Map();
    var t2 = L$1(n2.children);
    n2.revealOrder && "b" === n2.revealOrder[0] && t2.reverse();
    for (var e2 = t2.length; e2--; ) this.l.set(t2[e2], this.i = [1, 0, this.i]);
    return n2.children;
  }, B.prototype.componentDidUpdate = B.prototype.componentDidMount = function() {
    var n2 = this;
    this.l.forEach(function(t2, e2) {
      H(n2, e2, t2);
    });
  };
  var q = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, G = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, J = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, K = /[A-Z0-9]/g, Q = "undefined" != typeof document, X = function(n2) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n2);
  };
  function nn(n2, t2, e2) {
    return null == t2.__k && (t2.textContent = ""), J$1(n2, t2), "function" == typeof e2 && e2(), n2 ? n2.__c : null;
  }
  function tn(n2, t2, e2) {
    return K$1(n2, t2), "function" == typeof e2 && e2(), n2 ? n2.__c : null;
  }
  x$2.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t2) {
    Object.defineProperty(x$2.prototype, t2, { configurable: true, get: function() {
      return this["UNSAFE_" + t2];
    }, set: function(n2) {
      Object.defineProperty(this, t2, { configurable: true, writable: true, value: n2 });
    } });
  });
  var en = l$1.event;
  function rn() {
  }
  function un() {
    return this.cancelBubble;
  }
  function on() {
    return this.defaultPrevented;
  }
  l$1.event = function(n2) {
    return en && (n2 = en(n2)), n2.persist = rn, n2.isPropagationStopped = un, n2.isDefaultPrevented = on, n2.nativeEvent = n2;
  };
  var ln, cn = { enumerable: false, configurable: true, get: function() {
    return this.class;
  } }, fn = l$1.vnode;
  l$1.vnode = function(n2) {
    "string" == typeof n2.type && (function(n3) {
      var t2 = n3.props, e2 = n3.type, u2 = {}, o2 = -1 === e2.indexOf("-");
      for (var i2 in t2) {
        var l2 = t2[i2];
        if (!("value" === i2 && "defaultValue" in t2 && null == l2 || Q && "children" === i2 && "noscript" === e2 || "class" === i2 || "className" === i2)) {
          var c2 = i2.toLowerCase();
          "defaultValue" === i2 && "value" in t2 && null == t2.value ? i2 = "value" : "download" === i2 && true === l2 ? l2 = "" : "translate" === c2 && "no" === l2 ? l2 = false : "o" === c2[0] && "n" === c2[1] ? "ondoubleclick" === c2 ? i2 = "ondblclick" : "onchange" !== c2 || "input" !== e2 && "textarea" !== e2 || X(t2.type) ? "onfocus" === c2 ? i2 = "onfocusin" : "onblur" === c2 ? i2 = "onfocusout" : J.test(i2) && (i2 = c2) : c2 = i2 = "oninput" : o2 && G.test(i2) ? i2 = i2.replace(K, "-$&").toLowerCase() : null === l2 && (l2 = void 0), "oninput" === c2 && u2[i2 = c2] && (i2 = "oninputCapture"), u2[i2] = l2;
        }
      }
      "select" == e2 && u2.multiple && Array.isArray(u2.value) && (u2.value = L$1(t2.children).forEach(function(n4) {
        n4.props.selected = -1 != u2.value.indexOf(n4.props.value);
      })), "select" == e2 && null != u2.defaultValue && (u2.value = L$1(t2.children).forEach(function(n4) {
        n4.props.selected = u2.multiple ? -1 != u2.defaultValue.indexOf(n4.props.value) : u2.defaultValue == n4.props.value;
      })), t2.class && !t2.className ? (u2.class = t2.class, Object.defineProperty(u2, "className", cn)) : t2.className && (u2.class = u2.className = t2.className), n3.props = u2;
    })(n2), n2.$$typeof = q, fn && fn(n2);
  };
  var an = l$1.__r;
  l$1.__r = function(n2) {
    an && an(n2), ln = n2.__c;
  };
  var sn = l$1.diffed;
  l$1.diffed = function(n2) {
    sn && sn(n2);
    var t2 = n2.props, e2 = n2.__e;
    null != e2 && "textarea" === n2.type && "value" in t2 && t2.value !== e2.value && (e2.value = null == t2.value ? "" : t2.value), ln = null;
  };
  var hn = { ReactCurrentDispatcher: { current: { readContext: function(n2) {
    return ln.__n[n2.__c].props.value;
  }, useCallback: q$1, useContext: x$1, useDebugValue: P$1, useDeferredValue: w, useEffect: y, useId: g$1, useImperativeHandle: F$1, useInsertionEffect: I, useLayoutEffect: _, useMemo: T$1, useReducer: h, useRef: A$1, useState: d, useSyncExternalStore: C, useTransition: k } } }, vn = "18.3.1";
  function dn(n2) {
    return _$1.bind(null, n2);
  }
  function mn(n2) {
    return !!n2 && n2.$$typeof === q;
  }
  function pn(n2) {
    return mn(n2) && n2.type === k$2;
  }
  function yn(n2) {
    return !!n2 && "string" == typeof n2.displayName && n2.displayName.startsWith("Memo(");
  }
  function _n(n2) {
    return mn(n2) ? Q$1.apply(null, arguments) : n2;
  }
  function bn(n2) {
    return !!n2.__k && (J$1(null, n2), true);
  }
  function Sn(n2) {
    return n2 && (n2.base || 1 === n2.nodeType && n2) || null;
  }
  var gn = function(n2, t2) {
    return n2(t2);
  }, En = function(n2, t2) {
    return n2(t2);
  }, Cn = k$2, Rn = mn, xn = { useState: d, useId: g$1, useReducer: h, useEffect: y, useLayoutEffect: _, useInsertionEffect: I, useTransition: k, useDeferredValue: w, useSyncExternalStore: C, startTransition: x, useRef: A$1, useImperativeHandle: F$1, useMemo: T$1, useCallback: q$1, useContext: x$1, useDebugValue: P$1, version: "18.3.1", Children: O, render: nn, hydrate: tn, unmountComponentAtNode: bn, createPortal: $, createElement: _$1, createContext: R$1, createFactory: dn, cloneElement: _n, createRef: b$1, Fragment: k$2, isValidElement: mn, isElement: Rn, isFragment: pn, isMemo: yn, findDOMNode: Sn, Component: x$2, PureComponent: N, memo: M, forwardRef: D, flushSync: En, unstable_batchedUpdates: gn, StrictMode: Cn, Suspense: P, SuspenseList: B, lazy: z, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: hn };
  const React = Object.freeze( Object.defineProperty({
    __proto__: null,
    Children: O,
    Component: x$2,
    Fragment: k$2,
    PureComponent: N,
    StrictMode: Cn,
    Suspense: P,
    SuspenseList: B,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: hn,
    cloneElement: _n,
    createContext: R$1,
    createElement: _$1,
    createFactory: dn,
    createPortal: $,
    createRef: b$1,
    default: xn,
    findDOMNode: Sn,
    flushSync: En,
    forwardRef: D,
    hydrate: tn,
    isElement: Rn,
    isFragment: pn,
    isMemo: yn,
    isValidElement: mn,
    lazy: z,
    memo: M,
    render: nn,
    startTransition: x,
    unmountComponentAtNode: bn,
    unstable_batchedUpdates: gn,
    useCallback: q$1,
    useContext: x$1,
    useDebugValue: P$1,
    useDeferredValue: w,
    useEffect: y,
    useErrorBoundary: b,
    useId: g$1,
    useImperativeHandle: F$1,
    useInsertionEffect: I,
    useLayoutEffect: _,
    useMemo: T$1,
    useReducer: h,
    useRef: A$1,
    useState: d,
    useSyncExternalStore: C,
    useTransition: k,
    version: vn
  }, Symbol.toStringTag, { value: "Module" }));
  const warn = (i18n, code2, msg, rest) => {
    const args = [msg, {
      code: code2,
      ...rest || {}
    }];
    if (i18n?.services?.logger?.forward) {
      return i18n.services.logger.forward(args, "warn", "react-i18next::", true);
    }
    if (isString(args[0])) args[0] = `react-i18next:: ${args[0]}`;
    if (i18n?.services?.logger?.warn) {
      i18n.services.logger.warn(...args);
    } else if (console?.warn) {
      console.warn(...args);
    }
  };
  const alreadyWarned = {};
  const warnOnce = (i18n, code2, msg, rest) => {
    if (isString(msg) && alreadyWarned[msg]) return;
    if (isString(msg)) alreadyWarned[msg] = new Date();
    warn(i18n, code2, msg, rest);
  };
  const loadedClb = (i18n, cb) => () => {
    if (i18n.isInitialized) {
      cb();
    } else {
      const initialized = () => {
        setTimeout(() => {
          i18n.off("initialized", initialized);
        }, 0);
        cb();
      };
      i18n.on("initialized", initialized);
    }
  };
  const loadNamespaces = (i18n, ns, cb) => {
    i18n.loadNamespaces(ns, loadedClb(i18n, cb));
  };
  const loadLanguages = (i18n, lng, ns, cb) => {
    if (isString(ns)) ns = [ns];
    if (i18n.options.preload && i18n.options.preload.indexOf(lng) > -1) return loadNamespaces(i18n, ns, cb);
    ns.forEach((n2) => {
      if (i18n.options.ns.indexOf(n2) < 0) i18n.options.ns.push(n2);
    });
    i18n.loadLanguages(lng, loadedClb(i18n, cb));
  };
  const hasLoadedNamespace = (ns, i18n, options = {}) => {
    if (!i18n.languages || !i18n.languages.length) {
      warnOnce(i18n, "NO_LANGUAGES", "i18n.languages were undefined or empty", {
        languages: i18n.languages
      });
      return true;
    }
    return i18n.hasLoadedNamespace(ns, {
      lng: options.lng,
      precheck: (i18nInstance2, loadNotPending) => {
        if (options.bindI18n && options.bindI18n.indexOf("languageChanging") > -1 && i18nInstance2.services.backendConnector.backend && i18nInstance2.isLanguageChangingTo && !loadNotPending(i18nInstance2.isLanguageChangingTo, ns)) return false;
      }
    });
  };
  const isString = (obj) => typeof obj === "string";
  const isObject$1 = (obj) => typeof obj === "object" && obj !== null;
  const matchHtmlEntity = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;
  const htmlEntities = {
    "&amp;": "&",
    "&#38;": "&",
    "&lt;": "<",
    "&#60;": "<",
    "&gt;": ">",
    "&#62;": ">",
    "&apos;": "'",
    "&#39;": "'",
    "&quot;": '"',
    "&#34;": '"',
    "&nbsp;": " ",
    "&#160;": " ",
    "&copy;": "©",
    "&#169;": "©",
    "&reg;": "®",
    "&#174;": "®",
    "&hellip;": "…",
    "&#8230;": "…",
    "&#x2F;": "/",
    "&#47;": "/"
  };
  const unescapeHtmlEntity = (m2) => htmlEntities[m2];
  const unescape = (text2) => text2.replace(matchHtmlEntity, unescapeHtmlEntity);
  let defaultOptions = {
    bindI18n: "languageChanged",
    bindI18nStore: "",
    transEmptyNodeValue: "",
    transSupportBasicHtmlNodes: true,
    transWrapTextNodes: "",
    transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
    useSuspense: true,
    unescape,
    transDefaultProps: void 0
  };
  const setDefaults = (options = {}) => {
    defaultOptions = {
      ...defaultOptions,
      ...options
    };
  };
  const getDefaults = () => defaultOptions;
  let i18nInstance;
  const setI18n = (instance2) => {
    i18nInstance = instance2;
  };
  const getI18n = () => i18nInstance;
  const initReactI18next = {
    type: "3rdParty",
    init(instance2) {
      setDefaults(instance2.options.react);
      setI18n(instance2);
    }
  };
  const I18nContext = R$1();
  class ReportNamespaces {
    constructor() {
      this.usedNamespaces = {};
    }
    addUsedNamespaces(namespaces) {
      namespaces.forEach((ns) => {
        if (!this.usedNamespaces[ns]) this.usedNamespaces[ns] = true;
      });
    }
    getUsedNamespaces() {
      return Object.keys(this.usedNamespaces);
    }
  }
  var shim = { exports: {} };
  var useSyncExternalStoreShim_production = {};
  const require$$0 = getAugmentedNamespace(React);
  var hasRequiredUseSyncExternalStoreShim_production;
  function requireUseSyncExternalStoreShim_production() {
    if (hasRequiredUseSyncExternalStoreShim_production) return useSyncExternalStoreShim_production;
    hasRequiredUseSyncExternalStoreShim_production = 1;
    var React2 = require$$0;
    function is(x2, y2) {
      return x2 === y2 && (0 !== x2 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
    }
    var objectIs = "function" === typeof Object.is ? Object.is : is, useState = React2.useState, useEffect = React2.useEffect, useLayoutEffect = React2.useLayoutEffect, useDebugValue = React2.useDebugValue;
    function useSyncExternalStore$2(subscribe2, getSnapshot) {
      var value = getSnapshot(), _useState = useState({ inst: { value, getSnapshot } }), inst = _useState[0].inst, forceUpdate = _useState[1];
      useLayoutEffect(
        function() {
          inst.value = value;
          inst.getSnapshot = getSnapshot;
          checkIfSnapshotChanged(inst) && forceUpdate({ inst });
        },
        [subscribe2, value, getSnapshot]
      );
      useEffect(
        function() {
          checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          return subscribe2(function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          });
        },
        [subscribe2]
      );
      useDebugValue(value);
      return value;
    }
    function checkIfSnapshotChanged(inst) {
      var latestGetSnapshot = inst.getSnapshot;
      inst = inst.value;
      try {
        var nextValue = latestGetSnapshot();
        return !objectIs(inst, nextValue);
      } catch (error) {
        return true;
      }
    }
    function useSyncExternalStore$1(subscribe2, getSnapshot) {
      return getSnapshot();
    }
    var shim2 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
    useSyncExternalStoreShim_production.useSyncExternalStore = void 0 !== React2.useSyncExternalStore ? React2.useSyncExternalStore : shim2;
    return useSyncExternalStoreShim_production;
  }
  var hasRequiredShim;
  function requireShim() {
    if (hasRequiredShim) return shim.exports;
    hasRequiredShim = 1;
    {
      shim.exports = requireUseSyncExternalStoreShim_production();
    }
    return shim.exports;
  }
  var shimExports = requireShim();
  const notReadyT = (k2, optsOrDefaultValue) => {
    if (isString(optsOrDefaultValue)) return optsOrDefaultValue;
    if (isObject$1(optsOrDefaultValue) && isString(optsOrDefaultValue.defaultValue)) return optsOrDefaultValue.defaultValue;
    return Array.isArray(k2) ? k2[k2.length - 1] : k2;
  };
  const notReadySnapshot = {
    t: notReadyT,
    ready: false
  };
  const dummySubscribe = () => () => {
  };
  const useTranslation = (ns, props = {}) => {
    const {
      i18n: i18nFromProps
    } = props;
    const {
      i18n: i18nFromContext,
      defaultNS: defaultNSFromContext
    } = x$1(I18nContext) || {};
    const i18n = i18nFromProps || i18nFromContext || getI18n();
    if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new ReportNamespaces();
    if (!i18n) {
      warnOnce(i18n, "NO_I18NEXT_INSTANCE", "useTranslation: You will need to pass in an i18next instance by using initReactI18next");
    }
    const i18nOptions = T$1(() => ({
      ...getDefaults(),
      ...i18n?.options?.react,
      ...props
    }), [i18n, props]);
    const {
      useSuspense,
      keyPrefix
    } = i18nOptions;
    const nsOrContext = defaultNSFromContext || i18n?.options?.defaultNS;
    const unstableNamespaces = isString(nsOrContext) ? [nsOrContext] : nsOrContext || ["translation"];
    const namespaces = T$1(() => unstableNamespaces, unstableNamespaces);
    i18n?.reportNamespaces?.addUsedNamespaces?.(namespaces);
    const revisionRef = A$1(0);
    const subscribe2 = q$1((callback) => {
      if (!i18n) return dummySubscribe;
      const {
        bindI18n,
        bindI18nStore
      } = i18nOptions;
      const wrappedCallback = () => {
        revisionRef.current += 1;
        callback();
      };
      if (bindI18n) i18n.on(bindI18n, wrappedCallback);
      if (bindI18nStore) i18n.store.on(bindI18nStore, wrappedCallback);
      return () => {
        if (bindI18n) bindI18n.split(" ").forEach((e2) => i18n.off(e2, wrappedCallback));
        if (bindI18nStore) bindI18nStore.split(" ").forEach((e2) => i18n.store.off(e2, wrappedCallback));
      };
    }, [i18n, i18nOptions]);
    const snapshotRef = A$1();
    const getSnapshot = q$1(() => {
      if (!i18n) {
        return notReadySnapshot;
      }
      const calculatedReady = !!(i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every((n2) => hasLoadedNamespace(n2, i18n, i18nOptions));
      const currentLng = props.lng || i18n.language;
      const currentRevision = revisionRef.current;
      const lastSnapshot = snapshotRef.current;
      if (lastSnapshot && lastSnapshot.ready === calculatedReady && lastSnapshot.lng === currentLng && lastSnapshot.keyPrefix === keyPrefix && lastSnapshot.revision === currentRevision) {
        return lastSnapshot;
      }
      const calculatedT = i18n.getFixedT(currentLng, i18nOptions.nsMode === "fallback" ? namespaces : namespaces[0], keyPrefix);
      const newSnapshot = {
        t: calculatedT,
        ready: calculatedReady,
        lng: currentLng,
        keyPrefix,
        revision: currentRevision
      };
      snapshotRef.current = newSnapshot;
      return newSnapshot;
    }, [i18n, namespaces, keyPrefix, i18nOptions, props.lng]);
    const [loadCount, setLoadCount] = d(0);
    const {
      t: t2,
      ready
    } = shimExports.useSyncExternalStore(subscribe2, getSnapshot, getSnapshot);
    y(() => {
      if (i18n && !ready && !useSuspense) {
        const onLoaded = () => setLoadCount((c2) => c2 + 1);
        if (props.lng) {
          loadLanguages(i18n, props.lng, namespaces, onLoaded);
        } else {
          loadNamespaces(i18n, namespaces, onLoaded);
        }
      }
    }, [i18n, props.lng, namespaces, ready, useSuspense, loadCount]);
    const finalI18n = i18n || {};
    const wrapperRef = A$1(null);
    const wrapperLangRef = A$1();
    const createI18nWrapper = (original) => {
      const descriptors = Object.getOwnPropertyDescriptors(original);
      if (descriptors.__original) delete descriptors.__original;
      const wrapper = Object.create(Object.getPrototypeOf(original), descriptors);
      if (!Object.prototype.hasOwnProperty.call(wrapper, "__original")) {
        try {
          Object.defineProperty(wrapper, "__original", {
            value: original,
            writable: false,
            enumerable: false,
            configurable: false
          });
        } catch (_2) {
        }
      }
      return wrapper;
    };
    const ret = T$1(() => {
      const original = finalI18n;
      const lang = original?.language;
      let i18nWrapper = original;
      if (original) {
        if (wrapperRef.current && wrapperRef.current.__original === original) {
          if (wrapperLangRef.current !== lang) {
            i18nWrapper = createI18nWrapper(original);
            wrapperRef.current = i18nWrapper;
            wrapperLangRef.current = lang;
          } else {
            i18nWrapper = wrapperRef.current;
          }
        } else {
          i18nWrapper = createI18nWrapper(original);
          wrapperRef.current = i18nWrapper;
          wrapperLangRef.current = lang;
        }
      }
      const arr = [t2, i18nWrapper, ready];
      arr.t = t2;
      arr.i18n = i18nWrapper;
      arr.ready = ready;
      return arr;
    }, [t2, finalI18n, ready, finalI18n.resolvedLanguage, finalI18n.language, finalI18n.languages]);
    if (i18n && useSuspense && !ready) {
      throw new Promise((resolve) => {
        const onLoaded = () => resolve();
        if (props.lng) {
          loadLanguages(i18n, props.lng, namespaces, onLoaded);
        } else {
          loadNamespaces(i18n, namespaces, onLoaded);
        }
      });
    }
    return ret;
  };
  const title$8 = "ChatGPT Exporter";
  const ExportHelper$8 = "Export";
  const Setting$8 = "Setting";
  const Language$8 = "Language";
  const Screenshot$8 = "Screenshot";
  const Markdown$8 = "Markdown";
  const HTML$8 = "HTML";
  const Archive$8 = "Archive";
  const Save$8 = "Save";
  const Delete$8 = "Delete";
  const Export$8 = "Export";
  const Loading$8 = "Loading";
  const Preview$8 = "Preview";
  const en_US = {
    title: title$8,
    ExportHelper: ExportHelper$8,
    Setting: Setting$8,
    Language: Language$8,
    "Copy Text": "Copy Text",
    "Copied!": "Copied!",
    Screenshot: Screenshot$8,
    Markdown: Markdown$8,
    HTML: HTML$8,
    "JSON": "JSON",
    Archive: Archive$8,
    Save: Save$8,
    Delete: Delete$8,
    "Select All": "Select All",
    Export: Export$8,
    "Error": "Error",
    Loading: Loading$8,
    Preview: Preview$8,
    "File Name": "File Name",
    "Export All": "Export All",
    "Exporter Settings": "Exporter Settings",
    "Export Dialog Title": "Export Conversations",
    "Invalid File Format": "Invalid File Format",
    "Export from official export file": "Export from official export file",
    "Export from API": "Export from API",
    "Available variables": "Available variables",
    "Conversation Timestamp": "Conversation Timestamp",
    "Conversation Timestamp Description": "Will show on the page.",
    "Enable on HTML": "Enable on HTML files",
    "Enable on Markdown": "Enable on Markdown files",
    "Use 24-hour format": "Use 24-hour format (eg. 23:59)",
    "Export Format": "Export Format",
    "Export Metadata": "Export Metadata",
    "Export Metadata Description": "Add metadata to exported Markdown and HTML files.",
    "OpenAI Official Format": "OpenAI Official Format",
    "Conversation Archive Alert": "Are you sure you want to archive all selected conversations?",
    "Conversation Archived Message": "All selected conversations have been archived. Please refresh the page to see the changes.",
    "Conversation Delete Alert": "Are you sure you want to delete all selected conversations?",
    "Conversation Deleted Message": "All selected conversations have been deleted. Please refresh the page to see the changes.",
    "Please start a conversation first": "Please start a conversation first.",
    "Select Project": "Select Project",
    "(no project)": "(no project)",
    "Export All Limit": "Export All Limit",
    "Export All Limit Description": "Set the maximum number of conversations to load in the 'Export All' dialog."
  };
  const title$7 = "ChatGPT Exporter";
  const ExportHelper$7 = "Exportar";
  const Setting$7 = "Ajustes";
  const Language$7 = "Idioma";
  const Screenshot$7 = "Captura De Pantalla";
  const Markdown$7 = "Markdown";
  const HTML$7 = "HTML";
  const Archive$7 = "Archivo";
  const Save$7 = "Guardar";
  const Delete$7 = "Borrar";
  const Export$7 = "Exportar";
  const Loading$7 = "Cargando";
  const Preview$7 = "Previsualizar";
  const es = {
    title: title$7,
    ExportHelper: ExportHelper$7,
    Setting: Setting$7,
    Language: Language$7,
    "Copy Text": "Copiar Texto",
    "Copied!": "¡Copiado!",
    Screenshot: Screenshot$7,
    Markdown: Markdown$7,
    HTML: HTML$7,
    "JSON": "JSON",
    Archive: Archive$7,
    Save: Save$7,
    Delete: Delete$7,
    "Select All": "Seleccionar Todos",
    Export: Export$7,
    "Error": "Error",
    Loading: Loading$7,
    Preview: Preview$7,
    "File Name": "Nombre del Archivo",
    "Export All": "Exportar Todos",
    "Exporter Settings": "Ajustes De Exportación",
    "Export Dialog Title": "Exportar Conversaciones",
    "Invalid File Format": "Formato de archivo inválido",
    "Export from official export file": "Exportar desde archivo de exportación oficial",
    "Export from API": "Exportar desde API",
    "Available variables": "Variables Disponibles",
    "Conversation Timestamp": "Marca de Tiempo",
    "Conversation Timestamp Description": "Aparecerá en la página.",
    "Enable on HTML": "Habilitar en archivos HTML",
    "Enable on Markdown": "Habilitar en archivos Markdown",
    "Use 24-hour format": "Usar formato de 24 horas (ej. 23:59)",
    "Export Format": "Formato de Exportación",
    "Export Metadata": "Exportar Metadatos",
    "Export Metadata Description": "Añadir Metadatos a los archivos Markdown y HTML exportados.",
    "OpenAI Official Format": "Formato Oficial de OpenAI",
    "Conversation Archive Alert": "¿Estás seguro que quieres archivar todas las conversaciones seleccionadas?",
    "Conversation Archived Message": "Todos las conversaciones seleccionadas se han archivado. Por favor refresca la página para ver los cambios.",
    "Conversation Delete Alert": "¿Estás seguro que quieres borrar todas las conversaciones seleccionadas?",
    "Conversation Deleted Message": "Todos las conversaciones seleccionadas se han borrado. Por favor refresca la página para ver los cambios.",
    "Please start a conversation first": "Por favor empieza una conversación antes.",
    "Select Project": "Seleccionar proyecto",
    "(no project)": "(sin proyecto)",
    "Export All Limit": "Límite de Exportar Todos",
    "Export All Limit Description": "Establece el número máximo de conversaciones a cargar en el diálogo 'Exportar Todos'."
  };
  const title$6 = "Exportateur ChatGPT";
  const ExportHelper$6 = "Exporter";
  const Setting$6 = "Paramètre";
  const Language$6 = "Langue";
  const Screenshot$6 = "Capture d'écran";
  const Markdown$6 = "Markdown";
  const HTML$6 = "HTML";
  const Archive$6 = "Archiver";
  const Save$6 = "Enregistrer";
  const Delete$6 = "Supprimer";
  const Export$6 = "Exporter";
  const Loading$6 = "Chargement";
  const Preview$6 = "Aperçu";
  const fr = {
    title: title$6,
    ExportHelper: ExportHelper$6,
    Setting: Setting$6,
    Language: Language$6,
    "Copy Text": "Copier le texte",
    "Copied!": "Copié !",
    Screenshot: Screenshot$6,
    Markdown: Markdown$6,
    HTML: HTML$6,
    "JSON": "JSON",
    Archive: Archive$6,
    Save: Save$6,
    Delete: Delete$6,
    "Select All": "Tout sélectionner",
    Export: Export$6,
    "Error": "Erreur",
    Loading: Loading$6,
    Preview: Preview$6,
    "File Name": "Nom du fichier",
    "Export All": "Tout exporter",
    "Exporter Settings": "Paramètres de l'exportateur",
    "Export Dialog Title": "Exporter les conversations",
    "Invalid File Format": "Format de fichier invalide",
    "Export from official export file": "Exporter depuis un fichier officiel",
    "Export from API": "Exporter depuis l'API",
    "Available variables": "Variables disponibles",
    "Conversation Timestamp": "Horodatage de la conversation",
    "Conversation Timestamp Description": "S'affichera sur la page.",
    "Enable on HTML": "Activer sur les fichiers HTML",
    "Enable on Markdown": "Activer sur les fichiers Markdown",
    "Use 24-hour format": "Utiliser le format 24 heures (ex. 23:59)",
    "Export Format": "Format d'exportation",
    "Export Metadata": "Exporter les métadonnées",
    "Export Metadata Description": "Ajouter des métadonnées aux fichiers Markdown et HTML exportés.",
    "OpenAI Official Format": "Format officiel OpenAI",
    "Conversation Archive Alert": "Êtes-vous sûr de vouloir archiver toutes les conversations sélectionnées ?",
    "Conversation Archived Message": "Toutes les conversations sélectionnées ont été archivées. Veuillez actualiser la page pour voir les changements.",
    "Conversation Delete Alert": "Êtes-vous sûr de vouloir supprimer toutes les conversations sélectionnées ?",
    "Conversation Deleted Message": "Toutes les conversations sélectionnées ont été supprimées. Veuillez actualiser la page pour voir les changements.",
    "Please start a conversation first": "Veuillez commencer une conversation d'abord.",
    "Select Project": "Sélectionner un projet",
    "(no project)": "(aucun projet)",
    "Export All Limit": "Limite d'Exportation Multiple",
    "Export All Limit Description": "Définit le nombre maximal de conversations à charger dans la boîte de dialogue 'Tout exporter'."
  };
  const title$5 = "ChatGPT Exporter";
  const ExportHelper$5 = "Ekspor";
  const Setting$5 = "Pengaturan";
  const Language$5 = "Bahasa";
  const Screenshot$5 = "Tangkapan Layar";
  const Markdown$5 = "Markdown";
  const HTML$5 = "HTML";
  const Archive$5 = "Arsip";
  const Save$5 = "Simpan";
  const Delete$5 = "Hapus";
  const Export$5 = "Ekspor";
  const Loading$5 = "Memuat";
  const Preview$5 = "Pratinjau";
  const id_ID = {
    title: title$5,
    ExportHelper: ExportHelper$5,
    Setting: Setting$5,
    Language: Language$5,
    "Copy Text": "Salin Teks",
    "Copied!": "Disalin!",
    Screenshot: Screenshot$5,
    Markdown: Markdown$5,
    HTML: HTML$5,
    "JSON": "JSON",
    Archive: Archive$5,
    Save: Save$5,
    Delete: Delete$5,
    "Select All": "Pilih Semua",
    Export: Export$5,
    "Error": "Kesalahan",
    Loading: Loading$5,
    Preview: Preview$5,
    "File Name": "Nama File",
    "Export All": "Ekspor Semua",
    "Exporter Settings": "Pengaturan Pengekspor",
    "Export Dialog Title": "Ekspor Percakapan",
    "Invalid File Format": "Format File Tidak Valid",
    "Export from official export file": "Ekspor dari file ekspor resmi",
    "Export from API": "Ekspor dari API",
    "Available variables": "Variabel yang Tersedia",
    "Conversation Timestamp": "Timestamp Percakapan",
    "Conversation Timestamp Description": "Akan ditampilkan pada halaman.",
    "Enable on HTML": "Aktifkan pada file HTML",
    "Enable on Markdown": "Aktifkan pada file Markdown",
    "Use 24-hour format": "Gunakan format 24 jam (contohnya: 23:59)",
    "Export Format": "Format Ekspor",
    "Export Metadata": "Ekspor Metada",
    "Export Metadata Description": "Tambahkan metadata ke file Markdown dan HTML yang diekspor.",
    "OpenAI Official Format": "Format Resmi OpenAI",
    "Conversation Archive Alert": "Apakah Anda yakin ingin mengarsipkan semua percakapan yang dipilih?",
    "Conversation Archived Message": "Semua percakapan yang dipilih telah diarsipkan. Harap segarkan halaman untuk melihat perubahan.",
    "Conversation Delete Alert": "Apakah Anda yakin ingin menghapus semua percakapan yang dipilih?",
    "Conversation Deleted Message": "Semua percakapan yang dipilih telah dihapus. Harap segarkan halaman untuk melihat perubahan.",
    "Please start a conversation first": "Harap mulai percakapan terlebih dahulu.",
    "Select Project": "Pilih Proyek",
    "(no project)": "(tidak ada proyek)",
    "Export All Limit": "Batas Ekspor Semua",
    "Export All Limit Description": "Atur jumlah maksimum percakapan yang akan dimuat dalam dialog 'Ekspor Semua'."
  };
  const title$4 = "ChatGPTエクスポーター";
  const ExportHelper$4 = "エクスポート";
  const Setting$4 = "設定";
  const Language$4 = "言語";
  const Screenshot$4 = "スクリーンショット";
  const Markdown$4 = "Markdown";
  const HTML$4 = "HTML";
  const Archive$4 = "アーカイブ";
  const Save$4 = "保存";
  const Delete$4 = "削除";
  const Export$4 = "エクスポート";
  const Loading$4 = "読み込み中";
  const Preview$4 = "プレビュー";
  const ja_JP = {
    title: title$4,
    ExportHelper: ExportHelper$4,
    Setting: Setting$4,
    Language: Language$4,
    "Copy Text": "テキストをコピー",
    "Copied!": "コピーしました！",
    Screenshot: Screenshot$4,
    Markdown: Markdown$4,
    HTML: HTML$4,
    "JSON": "JSON",
    Archive: Archive$4,
    Save: Save$4,
    Delete: Delete$4,
    "Select All": "すべて選択",
    Export: Export$4,
    "Error": "エラー",
    Loading: Loading$4,
    Preview: Preview$4,
    "File Name": "ファイル名",
    "Export All": "すべてエクスポート",
    "Exporter Settings": "エクスポーター設定",
    "Export Dialog Title": "会話をエクスポート",
    "Invalid File Format": "無効なファイル形式",
    "Export from official export file": "公式エクスポートファイルからエクスポートする",
    "Export from API": "APIからエクスポートする",
    "Available variables": "使用可能な変数",
    "Conversation Timestamp": "会話のタイムスタンプ",
    "Conversation Timestamp Description": "ページに表示されます。",
    "Enable on HTML": "HTML ファイルで有効にする",
    "Enable on Markdown": "Markdown ファイルで有効にする",
    "Use 24-hour format": "24時間形式を使用する (例: 23:59)",
    "Export Format": "エクスポートフォーマット",
    "Export Metadata": "メタデータをエクスポート",
    "Export Metadata Description": "エクスポートされたMarkdownおよびHTMLファイルにメタデータを追加します。",
    "OpenAI Official Format": "OpenAI公式フォーマット",
    "Conversation Archive Alert": "選択したすべての会話をアーカイブしてもよろしいですか？",
    "Conversation Archived Message": "選択したすべての会話がアーカイブされました。変更を表示するには、ページを更新してください。",
    "Conversation Delete Alert": "選択したすべての会話を削除してもよろしいですか？",
    "Conversation Deleted Message": "選択したすべての会話が削除されました。変更を表示するには、ページを更新してください。",
    "Please start a conversation first": "まず会話を開始してください。",
    "Select Project": "プロジェクトを選択",
    "(no project)": "（プロジェクトなし）",
    "Export All Limit": "すべてエクスポートの上限",
    "Export All Limit Description": "「すべてエクスポート」ダイアログで読み込む会話の最大数を設定します。"
  };
  const title$3 = "ChatGPT Exporter";
  const ExportHelper$3 = "Export";
  const Setting$3 = "Параметры";
  const Language$3 = "Язык";
  const Screenshot$3 = "Скриншот";
  const Markdown$3 = "Markdown";
  const HTML$3 = "HTML";
  const Archive$3 = "Архивировать";
  const Save$3 = "Сохранить";
  const Delete$3 = "Удалить";
  const Export$3 = "Экспорт";
  const Loading$3 = "Загрузка";
  const Preview$3 = "Предпросмотр";
  const ru = {
    title: title$3,
    ExportHelper: ExportHelper$3,
    Setting: Setting$3,
    Language: Language$3,
    "Copy Text": "Копировать текст",
    "Copied!": "Скопировано!",
    Screenshot: Screenshot$3,
    Markdown: Markdown$3,
    HTML: HTML$3,
    "JSON": "JSON",
    Archive: Archive$3,
    Save: Save$3,
    Delete: Delete$3,
    "Select All": "Выбрать все",
    Export: Export$3,
    "Error": "Ошибка",
    Loading: Loading$3,
    Preview: Preview$3,
    "File Name": "Имя файла",
    "Export All": "Экспортировать все",
    "Exporter Settings": "Параметры экспорта",
    "Export Dialog Title": "Экспортировать беседы",
    "Invalid File Format": "Неверный формат файла",
    "Export from official export file": "Экспорт из официального файла",
    "Export from API": "Экспорт из API",
    "Available variables": "Доступные переменные",
    "Conversation Timestamp": "Временная метка разговора",
    "Conversation Timestamp Description": "Будет отображаться на странице.",
    "Enable on HTML": "Включить для HTML-файлов",
    "Enable on Markdown": "Включить для файлов Markdown",
    "Use 24-hour format": "Использовать 24-часовой формат (например, 23:59)",
    "Export Format": "Формат экспорта",
    "Export Metadata": "Экспорт метаданных",
    "Export Metadata Description": "Добавляйте метаданные в экспортированные файлы Markdown и HTML.",
    "OpenAI Official Format": "Официальный формат OpenAI",
    "Conversation Archive Alert": "Вы уверены, что хотите архивировать все выбранные разговоры?",
    "Conversation Archived Message": "Все выбранные разговоры были заархивированы. Пожалуйста, обновите страницу, чтобы увидеть изменения.",
    "Conversation Delete Alert": "Вы уверены, что хотите удалить все выбранные разговоры?",
    "Conversation Deleted Message": "Все выбранные разговоры были удалены. Пожалуйста, обновите страницу, чтобы увидеть изменения.",
    "Please start a conversation first": "Пожалуйста, начните разговор первым.",
    "Select Project": "Выберите проект",
    "(no project)": "(нет проекта)",
    "Export All Limit": "Лимит экспорта всех",
    "Export All Limit Description": "Установите максимальное количество бесед для загрузки в диалоге 'Экспортировать все'."
  };
  const title$2 = "ChatGPT Exporter";
  const ExportHelper$2 = "Dışa Aktar";
  const Setting$2 = "Ayarlar";
  const Language$2 = "Dil";
  const Screenshot$2 = "Ekran Alıntısı";
  const Markdown$2 = "Markdown";
  const HTML$2 = "HTML";
  const Archive$2 = "Arşiv";
  const Save$2 = "Kaydet";
  const Delete$2 = "Sil";
  const Export$2 = "Dışa Aktar";
  const Loading$2 = "Yükleniyor";
  const Preview$2 = "Önizleme";
  const tr_TR = {
    title: title$2,
    ExportHelper: ExportHelper$2,
    Setting: Setting$2,
    Language: Language$2,
    "Copy Text": "Metni Kopyala",
    "Copied!": "Kopyalandı!",
    Screenshot: Screenshot$2,
    Markdown: Markdown$2,
    HTML: HTML$2,
    "JSON": "JSON",
    Archive: Archive$2,
    Save: Save$2,
    Delete: Delete$2,
    "Select All": "Tümünü Seç",
    Export: Export$2,
    "Error": "Hata",
    Loading: Loading$2,
    Preview: Preview$2,
    "File Name": "Dosya Adı",
    "Export All": "Tümünü Dışa Aktar",
    "Exporter Settings": "Dışa Aktarma Ayarları",
    "Export Dialog Title": "Konuşmaları Dışa Aktar",
    "Invalid File Format": "Dosya Biçimi Geçersiz",
    "Export from official export file": "Resmi dışa aktarma dosyasından dışa aktar",
    "Export from API": "API'den dışa aktar",
    "Available variables": "Kullanılabilir değişkenler",
    "Conversation Timestamp": "Konuşma zaman bilgisi",
    "Conversation Timestamp Description": "Sayfada gösterilir.",
    "Enable on HTML": "HTML dosyalarında etkinleştir",
    "Enable on Markdown": "Markdown dosyalarında etkinleştir",
    "Use 24-hour format": "24 saat biçimini kullan (örn. 23:59)",
    "Export Format": "Dışa Aktarma Formatı",
    "Export Metadata": "Üst veriyi dışa aktar",
    "Export Metadata Description": "Dışa aktarılan Markdown ve HTML dosyalarına üst veri ekle",
    "OpenAI Official Format": "OpenAI Resmi Format",
    "Conversation Archive Alert": "Seçilen tüm konuşmaları arşivlemek istediğinizden emin misiniz?",
    "Conversation Archived Message": "Seçilen tüm konuşmalar arşivlendi. Değişiklikleri görmek için sayfayı yenileyin.",
    "Conversation Delete Alert": "Seçilen tüm konuşmaları silmek istediğinizden emin misiniz?",
    "Conversation Deleted Message": "Seçilen tüm konuşmalar silindi. Değişiklikleri görmek için sayfayı yenileyin.",
    "Please start a conversation first": "Lütfen önce bir konuşma başlatın.",
    "Select Project": "Proje Seç",
    "(no project)": "(proje yok)",
    "Export All Limit": "Tümünü Dışa Aktarma Limiti",
    "Export All Limit Description": "'Tümünü Dışa Aktar' iletişim kutusunda yüklenecek maksimum konuşma sayısını ayarlayın."
  };
  const title$1 = "ChatGPT Exporter";
  const ExportHelper$1 = "导出助手";
  const Setting$1 = "设置";
  const Language$1 = "语言";
  const Screenshot$1 = "截屏";
  const Markdown$1 = "Markdown";
  const HTML$1 = "HTML";
  const Archive$1 = "归档";
  const Save$1 = "保存";
  const Delete$1 = "删除";
  const Export$1 = "导出";
  const Loading$1 = "加载中";
  const Preview$1 = "预览";
  const zh_Hans = {
    title: title$1,
    ExportHelper: ExportHelper$1,
    Setting: Setting$1,
    Language: Language$1,
    "Copy Text": "复制文字",
    "Copied!": "已复制!",
    Screenshot: Screenshot$1,
    Markdown: Markdown$1,
    HTML: HTML$1,
    "JSON": "JSON",
    Archive: Archive$1,
    Save: Save$1,
    Delete: Delete$1,
    "Select All": "全选",
    Export: Export$1,
    "Error": "错误",
    Loading: Loading$1,
    Preview: Preview$1,
    "File Name": "文件名",
    "Export All": "批量导出",
    "Exporter Settings": "导出设置",
    "Export Dialog Title": "导出对话",
    "Invalid File Format": "无效的文件格式",
    "Export from official export file": "从官方导出文件导出",
    "Export from API": "从 API 导出",
    "Available variables": "可用变量",
    "Conversation Timestamp": "对话时间戳",
    "Conversation Timestamp Description": "会显示在页面上。",
    "Enable on HTML": "在 HTML 文件上启用",
    "Enable on Markdown": "在 Markdown 文件上启用",
    "Use 24-hour format": "使用24小时制 (例如 23:59)",
    "Export Format": "导出格式",
    "Export Metadata": "导出元数据",
    "Export Metadata Description": "会添加至 Markdown 以及 HTML 导出。",
    "OpenAI Official Format": "OpenAI 官方格式",
    "Conversation Archive Alert": "确定要归档所有选取的对话？",
    "Conversation Archived Message": "所有所选的对话已归档。请刷新页面。",
    "Conversation Delete Alert": "确定要删除所有选取的对话？",
    "Conversation Deleted Message": "所有所选的对话已删除。请刷新页面。",
    "Please start a conversation first": "请先开始对话。",
    "Select Project": "选择项目",
    "(no project)": "（无项目）",
    "Export All Limit": "批量导出上限",
    "Export All Limit Description": "设置“批量导出”对话框中加载的最大对话数量。"
  };
  const title = "ChatGPT Exporter";
  const ExportHelper = "Export";
  const Setting = "設定";
  const Language = "語言";
  const Screenshot = "截圖";
  const Markdown = "Markdown";
  const HTML = "HTML";
  const Archive = "封存";
  const Save = "保存";
  const Delete = "刪除";
  const Export = "匯出";
  const Loading = "載入中";
  const Preview = "預覽";
  const zh_Hant = {
    title,
    ExportHelper,
    Setting,
    Language,
    "Copy Text": "複製文字",
    "Copied!": "已複製!",
    Screenshot,
    Markdown,
    HTML,
    "JSON": "JSON",
    Archive,
    Save,
    Delete,
    "Select All": "全選",
    Export,
    "Error": "錯誤",
    Loading,
    Preview,
    "File Name": "檔案名稱",
    "Export All": "批量匯出",
    "Exporter Settings": "設定",
    "Export Dialog Title": "匯出對話",
    "Invalid File Format": "無效的檔案格式",
    "Export from official export file": "從官方匯出檔案匯出",
    "Export from API": "從 API 匯出",
    "Available variables": "可用變數",
    "Conversation Timestamp": "對話時間戳",
    "Conversation Timestamp Description": "會顯示在頁面上。",
    "Enable on HTML": "在 HTML 檔案上啟用",
    "Enable on Markdown": "在 Markdown 檔案上啟用",
    "Use 24-hour format": "使用24小時制 (例如 23:59)",
    "Export Format": "匯出格式",
    "Export Metadata": "匯出元資料",
    "Export Metadata Description": "會添加至 Markdown 以及 HTML 匯出。",
    "OpenAI Official Format": "OpenAI 官方格式",
    "Conversation Archive Alert": "確定要封存所有選取的對話？",
    "Conversation Archived Message": "所有選取的對話已封存。請重新整理頁面。",
    "Conversation Delete Alert": "確定要刪除所有選取的對話？",
    "Conversation Deleted Message": "所有選取的對話已刪除。請重新整理頁面。",
    "Please start a conversation first": "請先開始對話。",
    "Select Project": "選擇專案",
    "(no project)": "（無專案）",
    "Export All Limit": "批量匯出上限",
    "Export All Limit Description": "設定「批量匯出」對話方塊中載入的最大對話數量。"
  };
  const runtime = globalThis;
  class GMStorage {
    static get supported() {
      return typeof runtime.GM_getValue === "function" && typeof runtime.GM_setValue === "function" && typeof runtime.GM_deleteValue === "function";
    }
    static get(key2) {
      if (!this.supported) return null;
      const item = runtime.GM_getValue?.(key2, "");
      if (item) {
        try {
          return JSON.parse(item);
        } catch {
          return null;
        }
      }
      return null;
    }
    static set(key2, value) {
      if (!this.supported) return;
      const item = JSON.stringify(value);
      runtime.GM_setValue?.(key2, item);
    }
    static delete(key2) {
      if (!this.supported) return;
      runtime.GM_deleteValue?.(key2);
    }
  }
  class LocalStorage {
    static get supported() {
      return typeof localStorage === "object";
    }
    static get(key2) {
      const item = localStorage.getItem(key2);
      if (item) {
        try {
          return JSON.parse(item);
        } catch {
          return null;
        }
      }
      return null;
    }
    static set(key2, value) {
      const item = JSON.stringify(value);
      localStorage.setItem(key2, item);
    }
    static delete(key2) {
      localStorage.removeItem(key2);
    }
  }
  class MemoryStorage {
    static map = new Map();
    static supported = true;
    static get(key2) {
      if (!this.map.has(key2)) return null;
      return this.map.get(key2);
    }
    static set(key2, value) {
      this.map.set(key2, value);
    }
    static delete(key2) {
      this.map.delete(key2);
    }
  }
  class ScriptStorage {
    static get(key2) {
      if (GMStorage.supported) {
        try {
          return GMStorage.get(key2);
        } catch {
        }
      }
      if (LocalStorage.supported) {
        try {
          return LocalStorage.get(key2);
        } catch {
        }
      }
      return MemoryStorage.get(key2);
    }
    static set(key2, value) {
      if (GMStorage.supported) {
        try {
          return GMStorage.set(key2, value);
        } catch {
        }
      }
      if (LocalStorage.supported) {
        try {
          return LocalStorage.set(key2, value);
        } catch {
        }
      }
      return MemoryStorage.set(key2, value);
    }
    static delete(key2) {
      if (GMStorage.supported) {
        try {
          return GMStorage.delete(key2);
        } catch {
        }
      }
      if (LocalStorage.supported) {
        try {
          return LocalStorage.delete(key2);
        } catch {
        }
      }
      return MemoryStorage.delete(key2);
    }
  }
  const EN_US = {
    name: "English",
    code: "en-US",
    resource: en_US
  };
  const ES = {
    name: "Español",
    code: "es",
    resource: es
  };
  const FR = {
    name: "Français",
    code: "fr",
    resource: fr
  };
  const ID_ID = {
    name: "Indonesia",
    code: "id-ID",
    resource: id_ID
  };
  const JA_JP = {
    name: "日本語",
    code: "ja-JP",
    resource: ja_JP
  };
  const RU = {
    name: "Русский",
    code: "ru",
    resource: ru
  };
  const TR_TR = {
    name: "Türkçe",
    code: "tr-TR",
    resource: tr_TR
  };
  const ZH_Hans = {
    name: "简体中文",
    code: "zh-Hans",
    resource: zh_Hans
  };
  const ZH_Hant = {
    name: "繁體中文",
    code: "zh-Hant",
    resource: zh_Hant
  };
  const LOCALES = [
    EN_US,
    ES,
    FR,
    ID_ID,
    JA_JP,
    RU,
    TR_TR,
    ZH_Hans,
    ZH_Hant
  ];
  const LanguageMapping = {
    "en": EN_US.code,
    "en-US": EN_US.code,
    "es": ES.code,
    "es-ES": ES.code,
    "es-AR": ES.code,
    "es-CL": ES.code,
    "es-CO": ES.code,
    "es-MX": ES.code,
    "es-US": ES.code,
    "fr": FR.code,
    "fr-FR": FR.code,
    "id": ID_ID.code,
    "id-ID": ID_ID.code,
    "ja": JA_JP.code,
    "ja-JP": JA_JP.code,
    "ru": RU.code,
    "ru-RU": RU.code,
    "tr": TR_TR.code,
    "tr-TR": TR_TR.code,
    "zh": ZH_Hans.code,
    "zh-CN": ZH_Hans.code,
    "zh-MO": ZH_Hans.code,
    "zh-SG": ZH_Hans.code,
    "zh-Hans": ZH_Hans.code,
    "zh-HK": ZH_Hant.code,
    "zh-TW": ZH_Hant.code,
    "zh-Hant": ZH_Hant.code
  };
  const resources = LOCALES.reduce((acc, cur) => {
    acc[cur.code] = { translation: cur.resource };
    return acc;
  }, {});
  function standardizeLanguage(language) {
    if (!language) return null;
    if (language in LanguageMapping) return LanguageMapping[language];
    const shortLang = language.split("-")[0];
    if (shortLang in LanguageMapping) return LanguageMapping[shortLang];
    return null;
  }
  function getNavigatorLanguage() {
    const { language, languages } = navigator;
    if (language) return language;
    if (languages && languages.length) {
      return languages[0];
    }
    return null;
  }
  function getOaiLanguage() {
    const storedLanguage = window?.localStorage?.getItem(KEY_OAI_LOCALE);
    return storedLanguage?.replace(/^"(.*)"$/, "$1") ?? null;
  }
  function getDefaultLanguage() {
    const storedLanguage = ScriptStorage.get(KEY_LANGUAGE);
    const oaiLanguage = getOaiLanguage();
    const browserLanguage = getNavigatorLanguage();
    return standardizeLanguage(storedLanguage) ?? standardizeLanguage(oaiLanguage) ?? standardizeLanguage(browserLanguage) ?? EN_US.code;
  }
  void instance.use(initReactI18next).init({
    fallbackLng: EN_US.code,
    lng: getDefaultLanguage(),
    debug: false,
    resources,
    interpolation: {
      escapeValue: false
}
  }).catch((error) => {
    console.error("Failed to initialize translations:", error);
  });
  instance.on("languageChanged", (lng) => {
    ScriptStorage.set(KEY_LANGUAGE, lng);
  });
  async function copyToClipboard(text2) {
    try {
      await navigator.clipboard.writeText(text2);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text2;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  }
  const htmlVoidElements = [
    "area",
    "base",
    "basefont",
    "bgsound",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "image",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ];
  class Schema {
constructor(property, normal, space2) {
      this.normal = normal;
      this.property = property;
      if (space2) {
        this.space = space2;
      }
    }
  }
  Schema.prototype.normal = {};
  Schema.prototype.property = {};
  Schema.prototype.space = void 0;
  function merge(definitions, space2) {
    const property = {};
    const normal = {};
    for (const definition2 of definitions) {
      Object.assign(property, definition2.property);
      Object.assign(normal, definition2.normal);
    }
    return new Schema(property, normal, space2);
  }
  function normalize(value) {
    return value.toLowerCase();
  }
  class Info {
constructor(property, attribute) {
      this.attribute = attribute;
      this.property = property;
    }
  }
  Info.prototype.attribute = "";
  Info.prototype.booleanish = false;
  Info.prototype.boolean = false;
  Info.prototype.commaOrSpaceSeparated = false;
  Info.prototype.commaSeparated = false;
  Info.prototype.defined = false;
  Info.prototype.mustUseProperty = false;
  Info.prototype.number = false;
  Info.prototype.overloadedBoolean = false;
  Info.prototype.property = "";
  Info.prototype.spaceSeparated = false;
  Info.prototype.space = void 0;
  let powers = 0;
  const boolean = increment();
  const booleanish = increment();
  const overloadedBoolean = increment();
  const number = increment();
  const spaceSeparated = increment();
  const commaSeparated = increment();
  const commaOrSpaceSeparated = increment();
  function increment() {
    return 2 ** ++powers;
  }
  const types = Object.freeze( Object.defineProperty({
    __proto__: null,
    boolean,
    booleanish,
    commaOrSpaceSeparated,
    commaSeparated,
    number,
    overloadedBoolean,
    spaceSeparated
  }, Symbol.toStringTag, { value: "Module" }));
  const checks = (
Object.keys(types)
  );
  class DefinedInfo extends Info {
constructor(property, attribute, mask, space2) {
      let index2 = -1;
      super(property, attribute);
      mark(this, "space", space2);
      if (typeof mask === "number") {
        while (++index2 < checks.length) {
          const check = checks[index2];
          mark(this, checks[index2], (mask & types[check]) === types[check]);
        }
      }
    }
  }
  DefinedInfo.prototype.defined = true;
  function mark(values, key2, value) {
    if (value) {
      values[key2] = value;
    }
  }
  function create(definition2) {
    const properties = {};
    const normals = {};
    for (const [property, value] of Object.entries(definition2.properties)) {
      const info = new DefinedInfo(
        property,
        definition2.transform(definition2.attributes || {}, property),
        value,
        definition2.space
      );
      if (definition2.mustUseProperty && definition2.mustUseProperty.includes(property)) {
        info.mustUseProperty = true;
      }
      properties[property] = info;
      normals[normalize(property)] = property;
      normals[normalize(info.attribute)] = property;
    }
    return new Schema(properties, normals, definition2.space);
  }
  const aria = create({
    properties: {
      ariaActiveDescendant: null,
      ariaAtomic: booleanish,
      ariaAutoComplete: null,
      ariaBusy: booleanish,
      ariaChecked: booleanish,
      ariaColCount: number,
      ariaColIndex: number,
      ariaColSpan: number,
      ariaControls: spaceSeparated,
      ariaCurrent: null,
      ariaDescribedBy: spaceSeparated,
      ariaDetails: null,
      ariaDisabled: booleanish,
      ariaDropEffect: spaceSeparated,
      ariaErrorMessage: null,
      ariaExpanded: booleanish,
      ariaFlowTo: spaceSeparated,
      ariaGrabbed: booleanish,
      ariaHasPopup: null,
      ariaHidden: booleanish,
      ariaInvalid: null,
      ariaKeyShortcuts: null,
      ariaLabel: null,
      ariaLabelledBy: spaceSeparated,
      ariaLevel: number,
      ariaLive: null,
      ariaModal: booleanish,
      ariaMultiLine: booleanish,
      ariaMultiSelectable: booleanish,
      ariaOrientation: null,
      ariaOwns: spaceSeparated,
      ariaPlaceholder: null,
      ariaPosInSet: number,
      ariaPressed: booleanish,
      ariaReadOnly: booleanish,
      ariaRelevant: null,
      ariaRequired: booleanish,
      ariaRoleDescription: spaceSeparated,
      ariaRowCount: number,
      ariaRowIndex: number,
      ariaRowSpan: number,
      ariaSelected: booleanish,
      ariaSetSize: number,
      ariaSort: null,
      ariaValueMax: number,
      ariaValueMin: number,
      ariaValueNow: number,
      ariaValueText: null,
      role: null
    },
    transform(_2, property) {
      return property === "role" ? property : "aria-" + property.slice(4).toLowerCase();
    }
  });
  function caseSensitiveTransform(attributes, attribute) {
    return attribute in attributes ? attributes[attribute] : attribute;
  }
  function caseInsensitiveTransform(attributes, property) {
    return caseSensitiveTransform(attributes, property.toLowerCase());
  }
  const html$5 = create({
    attributes: {
      acceptcharset: "accept-charset",
      classname: "class",
      htmlfor: "for",
      httpequiv: "http-equiv"
    },
    mustUseProperty: ["checked", "multiple", "muted", "selected"],
    properties: {
abbr: null,
      accept: commaSeparated,
      acceptCharset: spaceSeparated,
      accessKey: spaceSeparated,
      action: null,
      allow: null,
      allowFullScreen: boolean,
      allowPaymentRequest: boolean,
      allowUserMedia: boolean,
      alt: null,
      as: null,
      async: boolean,
      autoCapitalize: null,
      autoComplete: spaceSeparated,
      autoFocus: boolean,
      autoPlay: boolean,
      blocking: spaceSeparated,
      capture: null,
      charSet: null,
      checked: boolean,
      cite: null,
      className: spaceSeparated,
      cols: number,
      colSpan: null,
      content: null,
      contentEditable: booleanish,
      controls: boolean,
      controlsList: spaceSeparated,
      coords: number | commaSeparated,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: boolean,
      defer: boolean,
      dir: null,
      dirName: null,
      disabled: boolean,
      download: overloadedBoolean,
      draggable: booleanish,
      encType: null,
      enterKeyHint: null,
      fetchPriority: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: boolean,
      formTarget: null,
      headers: spaceSeparated,
      height: number,
      hidden: overloadedBoolean,
      high: number,
      href: null,
      hrefLang: null,
      htmlFor: spaceSeparated,
      httpEquiv: spaceSeparated,
      id: null,
      imageSizes: null,
      imageSrcSet: null,
      inert: boolean,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: boolean,
      itemId: null,
      itemProp: spaceSeparated,
      itemRef: spaceSeparated,
      itemScope: boolean,
      itemType: spaceSeparated,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: boolean,
      low: number,
      manifest: null,
      max: null,
      maxLength: number,
      media: null,
      method: null,
      min: null,
      minLength: number,
      multiple: boolean,
      muted: boolean,
      name: null,
      nonce: null,
      noModule: boolean,
      noValidate: boolean,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforeMatch: null,
      onBeforePrint: null,
      onBeforeToggle: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextLost: null,
      onContextMenu: null,
      onContextRestored: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onScrollEnd: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onSlotChange: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: boolean,
      optimum: number,
      pattern: null,
      ping: spaceSeparated,
      placeholder: null,
      playsInline: boolean,
      popover: null,
      popoverTarget: null,
      popoverTargetAction: null,
      poster: null,
      preload: null,
      readOnly: boolean,
      referrerPolicy: null,
      rel: spaceSeparated,
      required: boolean,
      reversed: boolean,
      rows: number,
      rowSpan: number,
      sandbox: spaceSeparated,
      scope: null,
      scoped: boolean,
      seamless: boolean,
      selected: boolean,
      shadowRootClonable: boolean,
      shadowRootDelegatesFocus: boolean,
      shadowRootMode: null,
      shape: null,
      size: number,
      sizes: null,
      slot: null,
      span: number,
      spellCheck: booleanish,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: null,
      start: number,
      step: null,
      style: null,
      tabIndex: number,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: boolean,
      useMap: null,
      value: booleanish,
      width: number,
      wrap: null,
      writingSuggestions: null,

align: null,
aLink: null,
archive: spaceSeparated,
axis: null,
background: null,
bgColor: null,
border: number,
borderColor: null,
bottomMargin: number,
cellPadding: null,
cellSpacing: null,
char: null,
charOff: null,
classId: null,
clear: null,
code: null,
codeBase: null,
codeType: null,
color: null,
compact: boolean,
declare: boolean,
event: null,
face: null,
frame: null,
frameBorder: null,
hSpace: number,
leftMargin: number,
link: null,
longDesc: null,
lowSrc: null,
marginHeight: number,
marginWidth: number,
noResize: boolean,
noHref: boolean,
noShade: boolean,
noWrap: boolean,
object: null,
profile: null,
prompt: null,
rev: null,
rightMargin: number,
rules: null,
scheme: null,
scrolling: booleanish,
standby: null,
summary: null,
text: null,
topMargin: number,
valueType: null,
version: null,
vAlign: null,
vLink: null,
vSpace: number,

allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      disablePictureInPicture: boolean,
      disableRemotePlayback: boolean,
      prefix: null,
      property: null,
      results: number,
      security: null,
      unselectable: null
    },
    space: "html",
    transform: caseInsensitiveTransform
  });
  const svg$1 = create({
    attributes: {
      accentHeight: "accent-height",
      alignmentBaseline: "alignment-baseline",
      arabicForm: "arabic-form",
      baselineShift: "baseline-shift",
      capHeight: "cap-height",
      className: "class",
      clipPath: "clip-path",
      clipRule: "clip-rule",
      colorInterpolation: "color-interpolation",
      colorInterpolationFilters: "color-interpolation-filters",
      colorProfile: "color-profile",
      colorRendering: "color-rendering",
      crossOrigin: "crossorigin",
      dataType: "datatype",
      dominantBaseline: "dominant-baseline",
      enableBackground: "enable-background",
      fillOpacity: "fill-opacity",
      fillRule: "fill-rule",
      floodColor: "flood-color",
      floodOpacity: "flood-opacity",
      fontFamily: "font-family",
      fontSize: "font-size",
      fontSizeAdjust: "font-size-adjust",
      fontStretch: "font-stretch",
      fontStyle: "font-style",
      fontVariant: "font-variant",
      fontWeight: "font-weight",
      glyphName: "glyph-name",
      glyphOrientationHorizontal: "glyph-orientation-horizontal",
      glyphOrientationVertical: "glyph-orientation-vertical",
      hrefLang: "hreflang",
      horizAdvX: "horiz-adv-x",
      horizOriginX: "horiz-origin-x",
      horizOriginY: "horiz-origin-y",
      imageRendering: "image-rendering",
      letterSpacing: "letter-spacing",
      lightingColor: "lighting-color",
      markerEnd: "marker-end",
      markerMid: "marker-mid",
      markerStart: "marker-start",
      navDown: "nav-down",
      navDownLeft: "nav-down-left",
      navDownRight: "nav-down-right",
      navLeft: "nav-left",
      navNext: "nav-next",
      navPrev: "nav-prev",
      navRight: "nav-right",
      navUp: "nav-up",
      navUpLeft: "nav-up-left",
      navUpRight: "nav-up-right",
      onAbort: "onabort",
      onActivate: "onactivate",
      onAfterPrint: "onafterprint",
      onBeforePrint: "onbeforeprint",
      onBegin: "onbegin",
      onCancel: "oncancel",
      onCanPlay: "oncanplay",
      onCanPlayThrough: "oncanplaythrough",
      onChange: "onchange",
      onClick: "onclick",
      onClose: "onclose",
      onCopy: "oncopy",
      onCueChange: "oncuechange",
      onCut: "oncut",
      onDblClick: "ondblclick",
      onDrag: "ondrag",
      onDragEnd: "ondragend",
      onDragEnter: "ondragenter",
      onDragExit: "ondragexit",
      onDragLeave: "ondragleave",
      onDragOver: "ondragover",
      onDragStart: "ondragstart",
      onDrop: "ondrop",
      onDurationChange: "ondurationchange",
      onEmptied: "onemptied",
      onEnd: "onend",
      onEnded: "onended",
      onError: "onerror",
      onFocus: "onfocus",
      onFocusIn: "onfocusin",
      onFocusOut: "onfocusout",
      onHashChange: "onhashchange",
      onInput: "oninput",
      onInvalid: "oninvalid",
      onKeyDown: "onkeydown",
      onKeyPress: "onkeypress",
      onKeyUp: "onkeyup",
      onLoad: "onload",
      onLoadedData: "onloadeddata",
      onLoadedMetadata: "onloadedmetadata",
      onLoadStart: "onloadstart",
      onMessage: "onmessage",
      onMouseDown: "onmousedown",
      onMouseEnter: "onmouseenter",
      onMouseLeave: "onmouseleave",
      onMouseMove: "onmousemove",
      onMouseOut: "onmouseout",
      onMouseOver: "onmouseover",
      onMouseUp: "onmouseup",
      onMouseWheel: "onmousewheel",
      onOffline: "onoffline",
      onOnline: "ononline",
      onPageHide: "onpagehide",
      onPageShow: "onpageshow",
      onPaste: "onpaste",
      onPause: "onpause",
      onPlay: "onplay",
      onPlaying: "onplaying",
      onPopState: "onpopstate",
      onProgress: "onprogress",
      onRateChange: "onratechange",
      onRepeat: "onrepeat",
      onReset: "onreset",
      onResize: "onresize",
      onScroll: "onscroll",
      onSeeked: "onseeked",
      onSeeking: "onseeking",
      onSelect: "onselect",
      onShow: "onshow",
      onStalled: "onstalled",
      onStorage: "onstorage",
      onSubmit: "onsubmit",
      onSuspend: "onsuspend",
      onTimeUpdate: "ontimeupdate",
      onToggle: "ontoggle",
      onUnload: "onunload",
      onVolumeChange: "onvolumechange",
      onWaiting: "onwaiting",
      onZoom: "onzoom",
      overlinePosition: "overline-position",
      overlineThickness: "overline-thickness",
      paintOrder: "paint-order",
      panose1: "panose-1",
      pointerEvents: "pointer-events",
      referrerPolicy: "referrerpolicy",
      renderingIntent: "rendering-intent",
      shapeRendering: "shape-rendering",
      stopColor: "stop-color",
      stopOpacity: "stop-opacity",
      strikethroughPosition: "strikethrough-position",
      strikethroughThickness: "strikethrough-thickness",
      strokeDashArray: "stroke-dasharray",
      strokeDashOffset: "stroke-dashoffset",
      strokeLineCap: "stroke-linecap",
      strokeLineJoin: "stroke-linejoin",
      strokeMiterLimit: "stroke-miterlimit",
      strokeOpacity: "stroke-opacity",
      strokeWidth: "stroke-width",
      tabIndex: "tabindex",
      textAnchor: "text-anchor",
      textDecoration: "text-decoration",
      textRendering: "text-rendering",
      transformOrigin: "transform-origin",
      typeOf: "typeof",
      underlinePosition: "underline-position",
      underlineThickness: "underline-thickness",
      unicodeBidi: "unicode-bidi",
      unicodeRange: "unicode-range",
      unitsPerEm: "units-per-em",
      vAlphabetic: "v-alphabetic",
      vHanging: "v-hanging",
      vIdeographic: "v-ideographic",
      vMathematical: "v-mathematical",
      vectorEffect: "vector-effect",
      vertAdvY: "vert-adv-y",
      vertOriginX: "vert-origin-x",
      vertOriginY: "vert-origin-y",
      wordSpacing: "word-spacing",
      writingMode: "writing-mode",
      xHeight: "x-height",
playbackOrder: "playbackorder",
      timelineBegin: "timelinebegin"
    },
    properties: {
      about: commaOrSpaceSeparated,
      accentHeight: number,
      accumulate: null,
      additive: null,
      alignmentBaseline: null,
      alphabetic: number,
      amplitude: number,
      arabicForm: null,
      ascent: number,
      attributeName: null,
      attributeType: null,
      azimuth: number,
      bandwidth: null,
      baselineShift: null,
      baseFrequency: null,
      baseProfile: null,
      bbox: null,
      begin: null,
      bias: number,
      by: null,
      calcMode: null,
      capHeight: number,
      className: spaceSeparated,
      clip: null,
      clipPath: null,
      clipPathUnits: null,
      clipRule: null,
      color: null,
      colorInterpolation: null,
      colorInterpolationFilters: null,
      colorProfile: null,
      colorRendering: null,
      content: null,
      contentScriptType: null,
      contentStyleType: null,
      crossOrigin: null,
      cursor: null,
      cx: null,
      cy: null,
      d: null,
      dataType: null,
      defaultAction: null,
      descent: number,
      diffuseConstant: number,
      direction: null,
      display: null,
      dur: null,
      divisor: number,
      dominantBaseline: null,
      download: boolean,
      dx: null,
      dy: null,
      edgeMode: null,
      editable: null,
      elevation: number,
      enableBackground: null,
      end: null,
      event: null,
      exponent: number,
      externalResourcesRequired: null,
      fill: null,
      fillOpacity: number,
      fillRule: null,
      filter: null,
      filterRes: null,
      filterUnits: null,
      floodColor: null,
      floodOpacity: null,
      focusable: null,
      focusHighlight: null,
      fontFamily: null,
      fontSize: null,
      fontSizeAdjust: null,
      fontStretch: null,
      fontStyle: null,
      fontVariant: null,
      fontWeight: null,
      format: null,
      fr: null,
      from: null,
      fx: null,
      fy: null,
      g1: commaSeparated,
      g2: commaSeparated,
      glyphName: commaSeparated,
      glyphOrientationHorizontal: null,
      glyphOrientationVertical: null,
      glyphRef: null,
      gradientTransform: null,
      gradientUnits: null,
      handler: null,
      hanging: number,
      hatchContentUnits: null,
      hatchUnits: null,
      height: null,
      href: null,
      hrefLang: null,
      horizAdvX: number,
      horizOriginX: number,
      horizOriginY: number,
      id: null,
      ideographic: number,
      imageRendering: null,
      initialVisibility: null,
      in: null,
      in2: null,
      intercept: number,
      k: number,
      k1: number,
      k2: number,
      k3: number,
      k4: number,
      kernelMatrix: commaOrSpaceSeparated,
      kernelUnitLength: null,
      keyPoints: null,
keySplines: null,
keyTimes: null,
kerning: null,
      lang: null,
      lengthAdjust: null,
      letterSpacing: null,
      lightingColor: null,
      limitingConeAngle: number,
      local: null,
      markerEnd: null,
      markerMid: null,
      markerStart: null,
      markerHeight: null,
      markerUnits: null,
      markerWidth: null,
      mask: null,
      maskContentUnits: null,
      maskUnits: null,
      mathematical: null,
      max: null,
      media: null,
      mediaCharacterEncoding: null,
      mediaContentEncodings: null,
      mediaSize: number,
      mediaTime: null,
      method: null,
      min: null,
      mode: null,
      name: null,
      navDown: null,
      navDownLeft: null,
      navDownRight: null,
      navLeft: null,
      navNext: null,
      navPrev: null,
      navRight: null,
      navUp: null,
      navUpLeft: null,
      navUpRight: null,
      numOctaves: null,
      observer: null,
      offset: null,
      onAbort: null,
      onActivate: null,
      onAfterPrint: null,
      onBeforePrint: null,
      onBegin: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnd: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFocusIn: null,
      onFocusOut: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadStart: null,
      onMessage: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onMouseWheel: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRepeat: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onShow: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onZoom: null,
      opacity: null,
      operator: null,
      order: null,
      orient: null,
      orientation: null,
      origin: null,
      overflow: null,
      overlay: null,
      overlinePosition: number,
      overlineThickness: number,
      paintOrder: null,
      panose1: null,
      path: null,
      pathLength: number,
      patternContentUnits: null,
      patternTransform: null,
      patternUnits: null,
      phase: null,
      ping: spaceSeparated,
      pitch: null,
      playbackOrder: null,
      pointerEvents: null,
      points: null,
      pointsAtX: number,
      pointsAtY: number,
      pointsAtZ: number,
      preserveAlpha: null,
      preserveAspectRatio: null,
      primitiveUnits: null,
      propagate: null,
      property: commaOrSpaceSeparated,
      r: null,
      radius: null,
      referrerPolicy: null,
      refX: null,
      refY: null,
      rel: commaOrSpaceSeparated,
      rev: commaOrSpaceSeparated,
      renderingIntent: null,
      repeatCount: null,
      repeatDur: null,
      requiredExtensions: commaOrSpaceSeparated,
      requiredFeatures: commaOrSpaceSeparated,
      requiredFonts: commaOrSpaceSeparated,
      requiredFormats: commaOrSpaceSeparated,
      resource: null,
      restart: null,
      result: null,
      rotate: null,
      rx: null,
      ry: null,
      scale: null,
      seed: null,
      shapeRendering: null,
      side: null,
      slope: null,
      snapshotTime: null,
      specularConstant: number,
      specularExponent: number,
      spreadMethod: null,
      spacing: null,
      startOffset: null,
      stdDeviation: null,
      stemh: null,
      stemv: null,
      stitchTiles: null,
      stopColor: null,
      stopOpacity: null,
      strikethroughPosition: number,
      strikethroughThickness: number,
      string: null,
      stroke: null,
      strokeDashArray: commaOrSpaceSeparated,
      strokeDashOffset: null,
      strokeLineCap: null,
      strokeLineJoin: null,
      strokeMiterLimit: number,
      strokeOpacity: number,
      strokeWidth: null,
      style: null,
      surfaceScale: number,
      syncBehavior: null,
      syncBehaviorDefault: null,
      syncMaster: null,
      syncTolerance: null,
      syncToleranceDefault: null,
      systemLanguage: commaOrSpaceSeparated,
      tabIndex: number,
      tableValues: null,
      target: null,
      targetX: number,
      targetY: number,
      textAnchor: null,
      textDecoration: null,
      textRendering: null,
      textLength: null,
      timelineBegin: null,
      title: null,
      transformBehavior: null,
      type: null,
      typeOf: commaOrSpaceSeparated,
      to: null,
      transform: null,
      transformOrigin: null,
      u1: null,
      u2: null,
      underlinePosition: number,
      underlineThickness: number,
      unicode: null,
      unicodeBidi: null,
      unicodeRange: null,
      unitsPerEm: number,
      values: null,
      vAlphabetic: number,
      vMathematical: number,
      vectorEffect: null,
      vHanging: number,
      vIdeographic: number,
      version: null,
      vertAdvY: number,
      vertOriginX: number,
      vertOriginY: number,
      viewBox: null,
      viewTarget: null,
      visibility: null,
      width: null,
      widths: null,
      wordSpacing: null,
      writingMode: null,
      x: null,
      x1: null,
      x2: null,
      xChannelSelector: null,
      xHeight: number,
      y: null,
      y1: null,
      y2: null,
      yChannelSelector: null,
      z: null,
      zoomAndPan: null
    },
    space: "svg",
    transform: caseSensitiveTransform
  });
  const xlink = create({
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null
    },
    space: "xlink",
    transform(_2, property) {
      return "xlink:" + property.slice(5).toLowerCase();
    }
  });
  const xmlns = create({
    attributes: { xmlnsxlink: "xmlns:xlink" },
    properties: { xmlnsXLink: null, xmlns: null },
    space: "xmlns",
    transform: caseInsensitiveTransform
  });
  const xml = create({
    properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
    space: "xml",
    transform(_2, property) {
      return "xml:" + property.slice(3).toLowerCase();
    }
  });
  const cap = /[A-Z]/g;
  const dash = /-[a-z]/g;
  const valid = /^data[-\w.:]+$/i;
  function find(schema, value) {
    const normal = normalize(value);
    let property = value;
    let Type = Info;
    if (normal in schema.normal) {
      return schema.property[schema.normal[normal]];
    }
    if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
      if (value.charAt(4) === "-") {
        const rest = value.slice(5).replace(dash, camelcase);
        property = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
      } else {
        const rest = value.slice(4);
        if (!dash.test(rest)) {
          let dashes = rest.replace(cap, kebab);
          if (dashes.charAt(0) !== "-") {
            dashes = "-" + dashes;
          }
          value = "data" + dashes;
        }
      }
      Type = DefinedInfo;
    }
    return new Type(property, value);
  }
  function kebab($0) {
    return "-" + $0.toLowerCase();
  }
  function camelcase($0) {
    return $0.charAt(1).toUpperCase();
  }
  const html$4 = merge([aria, html$5, xlink, xmlns, xml], "html");
  const svg = merge([aria, svg$1, xlink, xmlns, xml], "svg");
  const own$5 = {}.hasOwnProperty;
  function zwitch(key2, options) {
    const settings = options || {};
    function one2(value, ...parameters) {
      let fn2 = one2.invalid;
      const handlers2 = one2.handlers;
      if (value && own$5.call(value, key2)) {
        const id = String(value[key2]);
        fn2 = own$5.call(handlers2, id) ? handlers2[id] : one2.unknown;
      }
      if (fn2) {
        return fn2.call(this, value, ...parameters);
      }
    }
    one2.handlers = settings.handlers || {};
    one2.invalid = settings.invalid;
    one2.unknown = settings.unknown;
    return one2;
  }
  const defaultSubsetRegex = /["&'<>`]/g;
  const surrogatePairsRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  const controlCharactersRegex = (
/[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g
  );
  const regexEscapeRegex = /[|\\{}()[\]^$+*?.]/g;
  const subsetToRegexCache = new WeakMap();
  function core(value, options) {
    value = value.replace(
      options.subset ? charactersToExpressionCached(options.subset) : defaultSubsetRegex,
      basic
    );
    if (options.subset || options.escapeOnly) {
      return value;
    }
    return value.replace(surrogatePairsRegex, surrogate).replace(controlCharactersRegex, basic);
    function surrogate(pair, index2, all2) {
      return options.format(
        (pair.charCodeAt(0) - 55296) * 1024 + pair.charCodeAt(1) - 56320 + 65536,
        all2.charCodeAt(index2 + 2),
        options
      );
    }
    function basic(character, index2, all2) {
      return options.format(
        character.charCodeAt(0),
        all2.charCodeAt(index2 + 1),
        options
      );
    }
  }
  function charactersToExpressionCached(subset) {
    let cached = subsetToRegexCache.get(subset);
    if (!cached) {
      cached = charactersToExpression(subset);
      subsetToRegexCache.set(subset, cached);
    }
    return cached;
  }
  function charactersToExpression(subset) {
    const groups = [];
    let index2 = -1;
    while (++index2 < subset.length) {
      groups.push(subset[index2].replace(regexEscapeRegex, "\\$&"));
    }
    return new RegExp("(?:" + groups.join("|") + ")", "g");
  }
  const hexadecimalRegex = /[\dA-Fa-f]/;
  function toHexadecimal(code2, next, omit) {
    const value = "&#x" + code2.toString(16).toUpperCase();
    return omit && next && !hexadecimalRegex.test(String.fromCharCode(next)) ? value : value + ";";
  }
  const decimalRegex = /\d/;
  function toDecimal(code2, next, omit) {
    const value = "&#" + String(code2);
    return omit && next && !decimalRegex.test(String.fromCharCode(next)) ? value : value + ";";
  }
  const characterEntitiesLegacy = [
    "AElig",
    "AMP",
    "Aacute",
    "Acirc",
    "Agrave",
    "Aring",
    "Atilde",
    "Auml",
    "COPY",
    "Ccedil",
    "ETH",
    "Eacute",
    "Ecirc",
    "Egrave",
    "Euml",
    "GT",
    "Iacute",
    "Icirc",
    "Igrave",
    "Iuml",
    "LT",
    "Ntilde",
    "Oacute",
    "Ocirc",
    "Ograve",
    "Oslash",
    "Otilde",
    "Ouml",
    "QUOT",
    "REG",
    "THORN",
    "Uacute",
    "Ucirc",
    "Ugrave",
    "Uuml",
    "Yacute",
    "aacute",
    "acirc",
    "acute",
    "aelig",
    "agrave",
    "amp",
    "aring",
    "atilde",
    "auml",
    "brvbar",
    "ccedil",
    "cedil",
    "cent",
    "copy",
    "curren",
    "deg",
    "divide",
    "eacute",
    "ecirc",
    "egrave",
    "eth",
    "euml",
    "frac12",
    "frac14",
    "frac34",
    "gt",
    "iacute",
    "icirc",
    "iexcl",
    "igrave",
    "iquest",
    "iuml",
    "laquo",
    "lt",
    "macr",
    "micro",
    "middot",
    "nbsp",
    "not",
    "ntilde",
    "oacute",
    "ocirc",
    "ograve",
    "ordf",
    "ordm",
    "oslash",
    "otilde",
    "ouml",
    "para",
    "plusmn",
    "pound",
    "quot",
    "raquo",
    "reg",
    "sect",
    "shy",
    "sup1",
    "sup2",
    "sup3",
    "szlig",
    "thorn",
    "times",
    "uacute",
    "ucirc",
    "ugrave",
    "uml",
    "uuml",
    "yacute",
    "yen",
    "yuml"
  ];
  const characterEntitiesHtml4 = {
    nbsp: " ",
    iexcl: "¡",
    cent: "¢",
    pound: "£",
    curren: "¤",
    yen: "¥",
    brvbar: "¦",
    sect: "§",
    uml: "¨",
    copy: "©",
    ordf: "ª",
    laquo: "«",
    not: "¬",
    shy: "­",
    reg: "®",
    macr: "¯",
    deg: "°",
    plusmn: "±",
    sup2: "²",
    sup3: "³",
    acute: "´",
    micro: "µ",
    para: "¶",
    middot: "·",
    cedil: "¸",
    sup1: "¹",
    ordm: "º",
    raquo: "»",
    frac14: "¼",
    frac12: "½",
    frac34: "¾",
    iquest: "¿",
    Agrave: "À",
    Aacute: "Á",
    Acirc: "Â",
    Atilde: "Ã",
    Auml: "Ä",
    Aring: "Å",
    AElig: "Æ",
    Ccedil: "Ç",
    Egrave: "È",
    Eacute: "É",
    Ecirc: "Ê",
    Euml: "Ë",
    Igrave: "Ì",
    Iacute: "Í",
    Icirc: "Î",
    Iuml: "Ï",
    ETH: "Ð",
    Ntilde: "Ñ",
    Ograve: "Ò",
    Oacute: "Ó",
    Ocirc: "Ô",
    Otilde: "Õ",
    Ouml: "Ö",
    times: "×",
    Oslash: "Ø",
    Ugrave: "Ù",
    Uacute: "Ú",
    Ucirc: "Û",
    Uuml: "Ü",
    Yacute: "Ý",
    THORN: "Þ",
    szlig: "ß",
    agrave: "à",
    aacute: "á",
    acirc: "â",
    atilde: "ã",
    auml: "ä",
    aring: "å",
    aelig: "æ",
    ccedil: "ç",
    egrave: "è",
    eacute: "é",
    ecirc: "ê",
    euml: "ë",
    igrave: "ì",
    iacute: "í",
    icirc: "î",
    iuml: "ï",
    eth: "ð",
    ntilde: "ñ",
    ograve: "ò",
    oacute: "ó",
    ocirc: "ô",
    otilde: "õ",
    ouml: "ö",
    divide: "÷",
    oslash: "ø",
    ugrave: "ù",
    uacute: "ú",
    ucirc: "û",
    uuml: "ü",
    yacute: "ý",
    thorn: "þ",
    yuml: "ÿ",
    fnof: "ƒ",
    Alpha: "Α",
    Beta: "Β",
    Gamma: "Γ",
    Delta: "Δ",
    Epsilon: "Ε",
    Zeta: "Ζ",
    Eta: "Η",
    Theta: "Θ",
    Iota: "Ι",
    Kappa: "Κ",
    Lambda: "Λ",
    Mu: "Μ",
    Nu: "Ν",
    Xi: "Ξ",
    Omicron: "Ο",
    Pi: "Π",
    Rho: "Ρ",
    Sigma: "Σ",
    Tau: "Τ",
    Upsilon: "Υ",
    Phi: "Φ",
    Chi: "Χ",
    Psi: "Ψ",
    Omega: "Ω",
    alpha: "α",
    beta: "β",
    gamma: "γ",
    delta: "δ",
    epsilon: "ε",
    zeta: "ζ",
    eta: "η",
    theta: "θ",
    iota: "ι",
    kappa: "κ",
    lambda: "λ",
    mu: "μ",
    nu: "ν",
    xi: "ξ",
    omicron: "ο",
    pi: "π",
    rho: "ρ",
    sigmaf: "ς",
    sigma: "σ",
    tau: "τ",
    upsilon: "υ",
    phi: "φ",
    chi: "χ",
    psi: "ψ",
    omega: "ω",
    thetasym: "ϑ",
    upsih: "ϒ",
    piv: "ϖ",
    bull: "•",
    hellip: "…",
    prime: "′",
    Prime: "″",
    oline: "‾",
    frasl: "⁄",
    weierp: "℘",
    image: "ℑ",
    real: "ℜ",
    trade: "™",
    alefsym: "ℵ",
    larr: "←",
    uarr: "↑",
    rarr: "→",
    darr: "↓",
    harr: "↔",
    crarr: "↵",
    lArr: "⇐",
    uArr: "⇑",
    rArr: "⇒",
    dArr: "⇓",
    hArr: "⇔",
    forall: "∀",
    part: "∂",
    exist: "∃",
    empty: "∅",
    nabla: "∇",
    isin: "∈",
    notin: "∉",
    ni: "∋",
    prod: "∏",
    sum: "∑",
    minus: "−",
    lowast: "∗",
    radic: "√",
    prop: "∝",
    infin: "∞",
    ang: "∠",
    and: "∧",
    or: "∨",
    cap: "∩",
    cup: "∪",
    int: "∫",
    there4: "∴",
    sim: "∼",
    cong: "≅",
    asymp: "≈",
    ne: "≠",
    equiv: "≡",
    le: "≤",
    ge: "≥",
    sub: "⊂",
    sup: "⊃",
    nsub: "⊄",
    sube: "⊆",
    supe: "⊇",
    oplus: "⊕",
    otimes: "⊗",
    perp: "⊥",
    sdot: "⋅",
    lceil: "⌈",
    rceil: "⌉",
    lfloor: "⌊",
    rfloor: "⌋",
    lang: "〈",
    rang: "〉",
    loz: "◊",
    spades: "♠",
    clubs: "♣",
    hearts: "♥",
    diams: "♦",
    quot: '"',
    amp: "&",
    lt: "<",
    gt: ">",
    OElig: "Œ",
    oelig: "œ",
    Scaron: "Š",
    scaron: "š",
    Yuml: "Ÿ",
    circ: "ˆ",
    tilde: "˜",
    ensp: " ",
    emsp: " ",
    thinsp: " ",
    zwnj: "‌",
    zwj: "‍",
    lrm: "‎",
    rlm: "‏",
    ndash: "–",
    mdash: "—",
    lsquo: "‘",
    rsquo: "’",
    sbquo: "‚",
    ldquo: "“",
    rdquo: "”",
    bdquo: "„",
    dagger: "†",
    Dagger: "‡",
    permil: "‰",
    lsaquo: "‹",
    rsaquo: "›",
    euro: "€"
  };
  const dangerous = [
    "cent",
    "copy",
    "divide",
    "gt",
    "lt",
    "not",
    "para",
    "times"
  ];
  const own$4 = {}.hasOwnProperty;
  const characters = {};
  let key;
  for (key in characterEntitiesHtml4) {
    if (own$4.call(characterEntitiesHtml4, key)) {
      characters[characterEntitiesHtml4[key]] = key;
    }
  }
  const notAlphanumericRegex = /[^\dA-Za-z]/;
  function toNamed(code2, next, omit, attribute) {
    const character = String.fromCharCode(code2);
    if (own$4.call(characters, character)) {
      const name = characters[character];
      const value = "&" + name;
      if (omit && characterEntitiesLegacy.includes(name) && !dangerous.includes(name) && (!attribute || next && next !== 61 && notAlphanumericRegex.test(String.fromCharCode(next)))) {
        return value;
      }
      return value + ";";
    }
    return "";
  }
  function formatSmart(code2, next, options) {
    let numeric = toHexadecimal(code2, next, options.omitOptionalSemicolons);
    let named;
    if (options.useNamedReferences || options.useShortestReferences) {
      named = toNamed(
        code2,
        next,
        options.omitOptionalSemicolons,
        options.attribute
      );
    }
    if ((options.useShortestReferences || !named) && options.useShortestReferences) {
      const decimal = toDecimal(code2, next, options.omitOptionalSemicolons);
      if (decimal.length < numeric.length) {
        numeric = decimal;
      }
    }
    return named && (!options.useShortestReferences || named.length < numeric.length) ? named : numeric;
  }
  function stringifyEntities(value, options) {
    return core(value, Object.assign({ format: formatSmart }, options));
  }
  const htmlCommentRegex = /^>|^->|<!--|-->|--!>|<!-$/g;
  const bogusCommentEntitySubset = [">"];
  const commentEntitySubset = ["<", ">"];
  function comment(node2, _1, _2, state) {
    return state.settings.bogusComments ? "<?" + stringifyEntities(
      node2.value,
      Object.assign({}, state.settings.characterReferences, {
        subset: bogusCommentEntitySubset
      })
    ) + ">" : "<!--" + node2.value.replace(htmlCommentRegex, encode) + "-->";
    function encode($0) {
      return stringifyEntities(
        $0,
        Object.assign({}, state.settings.characterReferences, {
          subset: commentEntitySubset
        })
      );
    }
  }
  function doctype(_1, _2, _3, state) {
    return "<!" + (state.settings.upperDoctype ? "DOCTYPE" : "doctype") + (state.settings.tightDoctype ? "" : " ") + "html>";
  }
  function ccount(value, character) {
    const source = String(value);
    if (typeof character !== "string") {
      throw new TypeError("Expected character");
    }
    let count2 = 0;
    let index2 = source.indexOf(character);
    while (index2 !== -1) {
      count2++;
      index2 = source.indexOf(character, index2 + character.length);
    }
    return count2;
  }
  function stringify$1(values, options) {
    const settings = options || {};
    const input = values[values.length - 1] === "" ? [...values, ""] : values;
    return input.join(
      (settings.padRight ? " " : "") + "," + (settings.padLeft === false ? "" : " ")
    ).trim();
  }
  function stringify(values) {
    return values.join(" ").trim();
  }
  const re = /[ \t\n\f\r]/g;
  function whitespace(thing) {
    return typeof thing === "object" ? thing.type === "text" ? empty$1(thing.value) : false : empty$1(thing);
  }
  function empty$1(value) {
    return value.replace(re, "") === "";
  }
  const siblingAfter = siblings(1);
  const siblingBefore = siblings(-1);
  const emptyChildren$1 = [];
  function siblings(increment2) {
    return sibling;
    function sibling(parent, index2, includeWhitespace) {
      const siblings2 = parent ? parent.children : emptyChildren$1;
      let offset2 = (index2 || 0) + increment2;
      let next = siblings2[offset2];
      if (!includeWhitespace) {
        while (next && whitespace(next)) {
          offset2 += increment2;
          next = siblings2[offset2];
        }
      }
      return next;
    }
  }
  const own$3 = {}.hasOwnProperty;
  function omission(handlers2) {
    return omit;
    function omit(node2, index2, parent) {
      return own$3.call(handlers2, node2.tagName) && handlers2[node2.tagName](node2, index2, parent);
    }
  }
  const closing = omission({
    body: body$1,
    caption: headOrColgroupOrCaption,
    colgroup: headOrColgroupOrCaption,
    dd,
    dt,
    head: headOrColgroupOrCaption,
    html: html$3,
    li,
    optgroup,
    option,
    p,
    rp: rubyElement,
    rt: rubyElement,
    tbody: tbody$1,
    td: cells,
    tfoot,
    th: cells,
    thead,
    tr
  });
  function headOrColgroupOrCaption(_2, index2, parent) {
    const next = siblingAfter(parent, index2, true);
    return !next || next.type !== "comment" && !(next.type === "text" && whitespace(next.value.charAt(0)));
  }
  function html$3(_2, index2, parent) {
    const next = siblingAfter(parent, index2);
    return !next || next.type !== "comment";
  }
  function body$1(_2, index2, parent) {
    const next = siblingAfter(parent, index2);
    return !next || next.type !== "comment";
  }
  function p(_2, index2, parent) {
    const next = siblingAfter(parent, index2);
    return next ? next.type === "element" && (next.tagName === "address" || next.tagName === "article" || next.tagName === "aside" || next.tagName === "blockquote" || next.tagName === "details" || next.tagName === "div" || next.tagName === "dl" || next.tagName === "fieldset" || next.tagName === "figcaption" || next.tagName === "figure" || next.tagName === "footer" || next.tagName === "form" || next.tagName === "h1" || next.tagName === "h2" || next.tagName === "h3" || next.tagName === "h4" || next.tagName === "h5" || next.tagName === "h6" || next.tagName === "header" || next.tagName === "hgroup" || next.tagName === "hr" || next.tagName === "main" || next.tagName === "menu" || next.tagName === "nav" || next.tagName === "ol" || next.tagName === "p" || next.tagName === "pre" || next.tagName === "section" || next.tagName === "table" || next.tagName === "ul") : !parent ||
!(parent.type === "element" && (parent.tagName === "a" || parent.tagName === "audio" || parent.tagName === "del" || parent.tagName === "ins" || parent.tagName === "map" || parent.tagName === "noscript" || parent.tagName === "video"));
  }
  function li(_2, index2, parent) {
    const next = siblingAfter(parent, index2);
    return !next || next.type === "element" && next.tagName === "li";
  }
  function dt(_2, index2, parent) {
    const next = siblingAfter(parent, index2);
    return Boolean(
      next && next.type === "element" && (next.tagName === "dt" || next.tagName === "dd")
    );
  }
  function dd(_2, index2, parent) {
    const next = siblingAfter(parent, index2);
    return !next || next.type === "element" && (next.tagName === "dt" || next.tagName === "dd");
  }
  function rubyElement(_2, index2, parent) {
    const next = siblingAfter(parent, index2);
    return !next || next.type === "element" && (next.tagName === "rp" || next.tagName === "rt");
  }
  function optgroup(_2, index2, parent) {
    const next = siblingAfter(parent, index2);
    return !next || next.type === "element" && next.tagName === "optgroup";
  }
  function option(_2, index2, parent) {
    const next = siblingAfter(parent, index2);
    return !next || next.type === "element" && (next.tagName === "option" || next.tagName === "optgroup");
  }
  function thead(_2, index2, parent) {
    const next = siblingAfter(parent, index2);
    return Boolean(
      next && next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot")
    );
  }
  function tbody$1(_2, index2, parent) {
    const next = siblingAfter(parent, index2);
    return !next || next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot");
  }
  function tfoot(_2, index2, parent) {
    return !siblingAfter(parent, index2);
  }
  function tr(_2, index2, parent) {
    const next = siblingAfter(parent, index2);
    return !next || next.type === "element" && next.tagName === "tr";
  }
  function cells(_2, index2, parent) {
    const next = siblingAfter(parent, index2);
    return !next || next.type === "element" && (next.tagName === "td" || next.tagName === "th");
  }
  const opening = omission({
    body,
    colgroup,
    head,
    html: html$2,
    tbody
  });
  function html$2(node2) {
    const head2 = siblingAfter(node2, -1);
    return !head2 || head2.type !== "comment";
  }
  function head(node2) {
    const seen = new Set();
    for (const child2 of node2.children) {
      if (child2.type === "element" && (child2.tagName === "base" || child2.tagName === "title")) {
        if (seen.has(child2.tagName)) return false;
        seen.add(child2.tagName);
      }
    }
    const child = node2.children[0];
    return !child || child.type === "element";
  }
  function body(node2) {
    const head2 = siblingAfter(node2, -1, true);
    return !head2 || head2.type !== "comment" && !(head2.type === "text" && whitespace(head2.value.charAt(0))) && !(head2.type === "element" && (head2.tagName === "meta" || head2.tagName === "link" || head2.tagName === "script" || head2.tagName === "style" || head2.tagName === "template"));
  }
  function colgroup(node2, index2, parent) {
    const previous2 = siblingBefore(parent, index2);
    const head2 = siblingAfter(node2, -1, true);
    if (parent && previous2 && previous2.type === "element" && previous2.tagName === "colgroup" && closing(previous2, parent.children.indexOf(previous2), parent)) {
      return false;
    }
    return Boolean(head2 && head2.type === "element" && head2.tagName === "col");
  }
  function tbody(node2, index2, parent) {
    const previous2 = siblingBefore(parent, index2);
    const head2 = siblingAfter(node2, -1);
    if (parent && previous2 && previous2.type === "element" && (previous2.tagName === "thead" || previous2.tagName === "tbody") && closing(previous2, parent.children.indexOf(previous2), parent)) {
      return false;
    }
    return Boolean(head2 && head2.type === "element" && head2.tagName === "tr");
  }
  const constants = {
name: [
      ["	\n\f\r &/=>".split(""), "	\n\f\r \"&'/=>`".split("")],
      [`\0	
\f\r "&'/<=>`.split(""), "\0	\n\f\r \"&'/<=>`".split("")]
    ],
unquoted: [
      ["	\n\f\r &>".split(""), "\0	\n\f\r \"&'<=>`".split("")],
      ["\0	\n\f\r \"&'<=>`".split(""), "\0	\n\f\r \"&'<=>`".split("")]
    ],
single: [
      ["&'".split(""), "\"&'`".split("")],
      ["\0&'".split(""), "\0\"&'`".split("")]
    ],
double: [
      ['"&'.split(""), "\"&'`".split("")],
      ['\0"&'.split(""), "\0\"&'`".split("")]
    ]
  };
  function element$1(node2, index2, parent, state) {
    const schema = state.schema;
    const omit = schema.space === "svg" ? false : state.settings.omitOptionalTags;
    let selfClosing = schema.space === "svg" ? state.settings.closeEmptyElements : state.settings.voids.includes(node2.tagName.toLowerCase());
    const parts = [];
    let last;
    if (schema.space === "html" && node2.tagName === "svg") {
      state.schema = svg;
    }
    const attributes = serializeAttributes(state, node2.properties);
    const content2 = state.all(
      schema.space === "html" && node2.tagName === "template" ? node2.content : node2
    );
    state.schema = schema;
    if (content2) selfClosing = false;
    if (attributes || !omit || !opening(node2, index2, parent)) {
      parts.push("<", node2.tagName, attributes ? " " + attributes : "");
      if (selfClosing && (schema.space === "svg" || state.settings.closeSelfClosing)) {
        last = attributes.charAt(attributes.length - 1);
        if (!state.settings.tightSelfClosing || last === "/" || last && last !== '"' && last !== "'") {
          parts.push(" ");
        }
        parts.push("/");
      }
      parts.push(">");
    }
    parts.push(content2);
    if (!selfClosing && (!omit || !closing(node2, index2, parent))) {
      parts.push("</" + node2.tagName + ">");
    }
    return parts.join("");
  }
  function serializeAttributes(state, properties) {
    const values = [];
    let index2 = -1;
    let key2;
    if (properties) {
      for (key2 in properties) {
        if (properties[key2] !== null && properties[key2] !== void 0) {
          const value = serializeAttribute(state, key2, properties[key2]);
          if (value) values.push(value);
        }
      }
    }
    while (++index2 < values.length) {
      const last = state.settings.tightAttributes ? values[index2].charAt(values[index2].length - 1) : void 0;
      if (index2 !== values.length - 1 && last !== '"' && last !== "'") {
        values[index2] += " ";
      }
    }
    return values.join("");
  }
  function serializeAttribute(state, key2, value) {
    const info = find(state.schema, key2);
    const x2 = state.settings.allowParseErrors && state.schema.space === "html" ? 0 : 1;
    const y2 = state.settings.allowDangerousCharacters ? 0 : 1;
    let quote = state.quote;
    let result;
    if (info.overloadedBoolean && (value === info.attribute || value === "")) {
      value = true;
    } else if ((info.boolean || info.overloadedBoolean) && (typeof value !== "string" || value === info.attribute || value === "")) {
      value = Boolean(value);
    }
    if (value === null || value === void 0 || value === false || typeof value === "number" && Number.isNaN(value)) {
      return "";
    }
    const name = stringifyEntities(
      info.attribute,
      Object.assign({}, state.settings.characterReferences, {
subset: constants.name[x2][y2]
      })
    );
    if (value === true) return name;
    value = Array.isArray(value) ? (info.commaSeparated ? stringify$1 : stringify)(value, {
      padLeft: !state.settings.tightCommaSeparatedLists
    }) : String(value);
    if (state.settings.collapseEmptyAttributes && !value) return name;
    if (state.settings.preferUnquoted) {
      result = stringifyEntities(
        value,
        Object.assign({}, state.settings.characterReferences, {
          attribute: true,
          subset: constants.unquoted[x2][y2]
        })
      );
    }
    if (result !== value) {
      if (state.settings.quoteSmart && ccount(value, quote) > ccount(value, state.alternative)) {
        quote = state.alternative;
      }
      result = quote + stringifyEntities(
        value,
        Object.assign({}, state.settings.characterReferences, {
subset: (quote === "'" ? constants.single : constants.double)[x2][y2],
          attribute: true
        })
      ) + quote;
    }
    return name + (result ? "=" + result : result);
  }
  const textEntitySubset = ["<", "&"];
  function text$5(node2, _2, parent, state) {
    return parent && parent.type === "element" && (parent.tagName === "script" || parent.tagName === "style") ? node2.value : stringifyEntities(
      node2.value,
      Object.assign({}, state.settings.characterReferences, {
        subset: textEntitySubset
      })
    );
  }
  function raw(node2, index2, parent, state) {
    return state.settings.allowDangerousHtml ? node2.value : text$5(node2, index2, parent, state);
  }
  function root$2(node2, _1, _2, state) {
    return state.all(node2);
  }
  const handle$1 = zwitch("type", {
    invalid: invalid$1,
    unknown: unknown$1,
    handlers: { comment, doctype, element: element$1, raw, root: root$2, text: text$5 }
  });
  function invalid$1(node2) {
    throw new Error("Expected node, not `" + node2 + "`");
  }
  function unknown$1(node_) {
    const node2 = (
node_
    );
    throw new Error("Cannot compile unknown node `" + node2.type + "`");
  }
  const emptyOptions$2 = {};
  const emptyCharacterReferences = {};
  const emptyChildren = [];
  function toHtml$1(tree, options) {
    const options_ = emptyOptions$2;
    const quote = options_.quote || '"';
    const alternative = quote === '"' ? "'" : '"';
    if (quote !== '"' && quote !== "'") {
      throw new Error("Invalid quote `" + quote + "`, expected `'` or `\"`");
    }
    const state = {
      one: one$1,
      all: all$1,
      settings: {
        omitOptionalTags: options_.omitOptionalTags || false,
        allowParseErrors: options_.allowParseErrors || false,
        allowDangerousCharacters: options_.allowDangerousCharacters || false,
        quoteSmart: options_.quoteSmart || false,
        preferUnquoted: options_.preferUnquoted || false,
        tightAttributes: options_.tightAttributes || false,
        upperDoctype: options_.upperDoctype || false,
        tightDoctype: options_.tightDoctype || false,
        bogusComments: options_.bogusComments || false,
        tightCommaSeparatedLists: options_.tightCommaSeparatedLists || false,
        tightSelfClosing: options_.tightSelfClosing || false,
        collapseEmptyAttributes: options_.collapseEmptyAttributes || false,
        allowDangerousHtml: options_.allowDangerousHtml || false,
        voids: options_.voids || htmlVoidElements,
        characterReferences: options_.characterReferences || emptyCharacterReferences,
        closeSelfClosing: options_.closeSelfClosing || false,
        closeEmptyElements: options_.closeEmptyElements || false
      },
      schema: options_.space === "svg" ? svg : html$4,
      quote,
      alternative
    };
    return state.one(
      Array.isArray(tree) ? { type: "root", children: tree } : tree,
      void 0,
      void 0
    );
  }
  function one$1(node2, index2, parent) {
    return handle$1(node2, index2, parent, this);
  }
  function all$1(parent) {
    const results = [];
    const children = parent && parent.children || emptyChildren;
    let index2 = -1;
    while (++index2 < children.length) {
      results[index2] = this.one(children[index2], index2, parent);
    }
    return results.join("");
  }
  const emptyOptions$1 = {};
  function toString$1(value, options) {
    const settings = emptyOptions$1;
    const includeImageAlt = typeof settings.includeImageAlt === "boolean" ? settings.includeImageAlt : true;
    const includeHtml = typeof settings.includeHtml === "boolean" ? settings.includeHtml : true;
    return one(value, includeImageAlt, includeHtml);
  }
  function one(value, includeImageAlt, includeHtml) {
    if (node(value)) {
      if ("value" in value) {
        return value.type === "html" && !includeHtml ? "" : value.value;
      }
      if (includeImageAlt && "alt" in value && value.alt) {
        return value.alt;
      }
      if ("children" in value) {
        return all(value.children, includeImageAlt, includeHtml);
      }
    }
    if (Array.isArray(value)) {
      return all(value, includeImageAlt, includeHtml);
    }
    return "";
  }
  function all(values, includeImageAlt, includeHtml) {
    const result = [];
    let index2 = -1;
    while (++index2 < values.length) {
      result[index2] = one(values[index2], includeImageAlt, includeHtml);
    }
    return result.join("");
  }
  function node(value) {
    return Boolean(value && typeof value === "object");
  }
  const element = document.createElement("i");
  function decodeNamedCharacterReference(value) {
    const characterReference2 = "&" + value + ";";
    element.innerHTML = characterReference2;
    const character = element.textContent;
    if (character.charCodeAt(character.length - 1) === 59 && value !== "semi") {
      return false;
    }
    return character === characterReference2 ? false : character;
  }
  function splice(list2, start, remove, items) {
    const end = list2.length;
    let chunkStart = 0;
    let parameters;
    if (start < 0) {
      start = -start > end ? 0 : end + start;
    } else {
      start = start > end ? end : start;
    }
    remove = remove > 0 ? remove : 0;
    if (items.length < 1e4) {
      parameters = Array.from(items);
      parameters.unshift(start, remove);
      list2.splice(...parameters);
    } else {
      if (remove) list2.splice(start, remove);
      while (chunkStart < items.length) {
        parameters = items.slice(chunkStart, chunkStart + 1e4);
        parameters.unshift(start, 0);
        list2.splice(...parameters);
        chunkStart += 1e4;
        start += 1e4;
      }
    }
  }
  function push(list2, items) {
    if (list2.length > 0) {
      splice(list2, list2.length, 0, items);
      return list2;
    }
    return items;
  }
  const hasOwnProperty = {}.hasOwnProperty;
  function combineExtensions(extensions) {
    const all2 = {};
    let index2 = -1;
    while (++index2 < extensions.length) {
      syntaxExtension(all2, extensions[index2]);
    }
    return all2;
  }
  function syntaxExtension(all2, extension2) {
    let hook;
    for (hook in extension2) {
      const maybe = hasOwnProperty.call(all2, hook) ? all2[hook] : void 0;
      const left = maybe || (all2[hook] = {});
      const right = extension2[hook];
      let code2;
      if (right) {
        for (code2 in right) {
          if (!hasOwnProperty.call(left, code2)) left[code2] = [];
          const value = right[code2];
          constructs(
left[code2],
            Array.isArray(value) ? value : value ? [value] : []
          );
        }
      }
    }
  }
  function constructs(existing, list2) {
    let index2 = -1;
    const before = [];
    while (++index2 < list2.length) {
      (list2[index2].add === "after" ? existing : before).push(list2[index2]);
    }
    splice(existing, 0, 0, before);
  }
  function decodeNumericCharacterReference(value, base) {
    const code2 = Number.parseInt(value, base);
    if (
code2 < 9 || code2 === 11 || code2 > 13 && code2 < 32 ||
code2 > 126 && code2 < 160 ||
code2 > 55295 && code2 < 57344 ||
code2 > 64975 && code2 < 65008 ||
(code2 & 65535) === 65535 || (code2 & 65535) === 65534 ||

code2 > 1114111
    ) {
      return "�";
    }
    return String.fromCodePoint(code2);
  }
  function normalizeIdentifier(value) {
    return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
  }
  const asciiAlpha = regexCheck(/[A-Za-z]/);
  const asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
  const asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
  function asciiControl(code2) {
    return (

code2 !== null && (code2 < 32 || code2 === 127)
    );
  }
  const asciiDigit = regexCheck(/\d/);
  const asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
  const asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
  function markdownLineEnding(code2) {
    return code2 !== null && code2 < -2;
  }
  function markdownLineEndingOrSpace(code2) {
    return code2 !== null && (code2 < 0 || code2 === 32);
  }
  function markdownSpace(code2) {
    return code2 === -2 || code2 === -1 || code2 === 32;
  }
  const unicodePunctuation = regexCheck(new RegExp("\\p{P}|\\p{S}", "u"));
  const unicodeWhitespace = regexCheck(/\s/);
  function regexCheck(regex) {
    return check;
    function check(code2) {
      return code2 !== null && code2 > -1 && regex.test(String.fromCharCode(code2));
    }
  }
  function normalizeUri(value) {
    const result = [];
    let index2 = -1;
    let start = 0;
    let skip = 0;
    while (++index2 < value.length) {
      const code2 = value.charCodeAt(index2);
      let replace2 = "";
      if (code2 === 37 && asciiAlphanumeric(value.charCodeAt(index2 + 1)) && asciiAlphanumeric(value.charCodeAt(index2 + 2))) {
        skip = 2;
      } else if (code2 < 128) {
        if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code2))) {
          replace2 = String.fromCharCode(code2);
        }
      } else if (code2 > 55295 && code2 < 57344) {
        const next = value.charCodeAt(index2 + 1);
        if (code2 < 56320 && next > 56319 && next < 57344) {
          replace2 = String.fromCharCode(code2, next);
          skip = 1;
        } else {
          replace2 = "�";
        }
      } else {
        replace2 = String.fromCharCode(code2);
      }
      if (replace2) {
        result.push(value.slice(start, index2), encodeURIComponent(replace2));
        start = index2 + skip + 1;
        replace2 = "";
      }
      if (skip) {
        index2 += skip;
        skip = 0;
      }
    }
    return result.join("") + value.slice(start);
  }
  function factorySpace(effects, ok2, type, max2) {
    const limit = max2 ? max2 - 1 : Number.POSITIVE_INFINITY;
    let size2 = 0;
    return start;
    function start(code2) {
      if (markdownSpace(code2)) {
        effects.enter(type);
        return prefix(code2);
      }
      return ok2(code2);
    }
    function prefix(code2) {
      if (markdownSpace(code2) && size2++ < limit) {
        effects.consume(code2);
        return prefix;
      }
      effects.exit(type);
      return ok2(code2);
    }
  }
  const content$1 = {
    tokenize: initializeContent
  };
  function initializeContent(effects) {
    const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
    let previous2;
    return contentStart;
    function afterContentStartConstruct(code2) {
      if (code2 === null) {
        effects.consume(code2);
        return;
      }
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return factorySpace(effects, contentStart, "linePrefix");
    }
    function paragraphInitial(code2) {
      effects.enter("paragraph");
      return lineStart(code2);
    }
    function lineStart(code2) {
      const token = effects.enter("chunkText", {
        contentType: "text",
        previous: previous2
      });
      if (previous2) {
        previous2.next = token;
      }
      previous2 = token;
      return data(code2);
    }
    function data(code2) {
      if (code2 === null) {
        effects.exit("chunkText");
        effects.exit("paragraph");
        effects.consume(code2);
        return;
      }
      if (markdownLineEnding(code2)) {
        effects.consume(code2);
        effects.exit("chunkText");
        return lineStart;
      }
      effects.consume(code2);
      return data;
    }
  }
  const document$2 = {
    tokenize: initializeDocument
  };
  const containerConstruct = {
    tokenize: tokenizeContainer
  };
  function initializeDocument(effects) {
    const self2 = this;
    const stack = [];
    let continued = 0;
    let childFlow;
    let childToken;
    let lineStartOffset;
    return start;
    function start(code2) {
      if (continued < stack.length) {
        const item = stack[continued];
        self2.containerState = item[1];
        return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code2);
      }
      return checkNewContainers(code2);
    }
    function documentContinue(code2) {
      continued++;
      if (self2.containerState._closeFlow) {
        self2.containerState._closeFlow = void 0;
        if (childFlow) {
          closeFlow();
        }
        const indexBeforeExits = self2.events.length;
        let indexBeforeFlow = indexBeforeExits;
        let point2;
        while (indexBeforeFlow--) {
          if (self2.events[indexBeforeFlow][0] === "exit" && self2.events[indexBeforeFlow][1].type === "chunkFlow") {
            point2 = self2.events[indexBeforeFlow][1].end;
            break;
          }
        }
        exitContainers(continued);
        let index2 = indexBeforeExits;
        while (index2 < self2.events.length) {
          self2.events[index2][1].end = {
            ...point2
          };
          index2++;
        }
        splice(self2.events, indexBeforeFlow + 1, 0, self2.events.slice(indexBeforeExits));
        self2.events.length = index2;
        return checkNewContainers(code2);
      }
      return start(code2);
    }
    function checkNewContainers(code2) {
      if (continued === stack.length) {
        if (!childFlow) {
          return documentContinued(code2);
        }
        if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
          return flowStart(code2);
        }
        self2.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
      }
      self2.containerState = {};
      return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code2);
    }
    function thereIsANewContainer(code2) {
      if (childFlow) closeFlow();
      exitContainers(continued);
      return documentContinued(code2);
    }
    function thereIsNoNewContainer(code2) {
      self2.parser.lazy[self2.now().line] = continued !== stack.length;
      lineStartOffset = self2.now().offset;
      return flowStart(code2);
    }
    function documentContinued(code2) {
      self2.containerState = {};
      return effects.attempt(containerConstruct, containerContinue, flowStart)(code2);
    }
    function containerContinue(code2) {
      continued++;
      stack.push([self2.currentConstruct, self2.containerState]);
      return documentContinued(code2);
    }
    function flowStart(code2) {
      if (code2 === null) {
        if (childFlow) closeFlow();
        exitContainers(0);
        effects.consume(code2);
        return;
      }
      childFlow = childFlow || self2.parser.flow(self2.now());
      effects.enter("chunkFlow", {
        _tokenizer: childFlow,
        contentType: "flow",
        previous: childToken
      });
      return flowContinue(code2);
    }
    function flowContinue(code2) {
      if (code2 === null) {
        writeToChild(effects.exit("chunkFlow"), true);
        exitContainers(0);
        effects.consume(code2);
        return;
      }
      if (markdownLineEnding(code2)) {
        effects.consume(code2);
        writeToChild(effects.exit("chunkFlow"));
        continued = 0;
        self2.interrupt = void 0;
        return start;
      }
      effects.consume(code2);
      return flowContinue;
    }
    function writeToChild(token, endOfFile) {
      const stream = self2.sliceStream(token);
      if (endOfFile) stream.push(null);
      token.previous = childToken;
      if (childToken) childToken.next = token;
      childToken = token;
      childFlow.defineSkip(token.start);
      childFlow.write(stream);
      if (self2.parser.lazy[token.start.line]) {
        let index2 = childFlow.events.length;
        while (index2--) {
          if (
childFlow.events[index2][1].start.offset < lineStartOffset &&
(!childFlow.events[index2][1].end ||
childFlow.events[index2][1].end.offset > lineStartOffset)
          ) {
            return;
          }
        }
        const indexBeforeExits = self2.events.length;
        let indexBeforeFlow = indexBeforeExits;
        let seen;
        let point2;
        while (indexBeforeFlow--) {
          if (self2.events[indexBeforeFlow][0] === "exit" && self2.events[indexBeforeFlow][1].type === "chunkFlow") {
            if (seen) {
              point2 = self2.events[indexBeforeFlow][1].end;
              break;
            }
            seen = true;
          }
        }
        exitContainers(continued);
        index2 = indexBeforeExits;
        while (index2 < self2.events.length) {
          self2.events[index2][1].end = {
            ...point2
          };
          index2++;
        }
        splice(self2.events, indexBeforeFlow + 1, 0, self2.events.slice(indexBeforeExits));
        self2.events.length = index2;
      }
    }
    function exitContainers(size2) {
      let index2 = stack.length;
      while (index2-- > size2) {
        const entry = stack[index2];
        self2.containerState = entry[1];
        entry[0].exit.call(self2, effects);
      }
      stack.length = size2;
    }
    function closeFlow() {
      childFlow.write([null]);
      childToken = void 0;
      childFlow = void 0;
      self2.containerState._closeFlow = void 0;
    }
  }
  function tokenizeContainer(effects, ok2, nok) {
    return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok2, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
  }
  function classifyCharacter(code2) {
    if (code2 === null || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2)) {
      return 1;
    }
    if (unicodePunctuation(code2)) {
      return 2;
    }
  }
  function resolveAll(constructs2, events, context) {
    const called = [];
    let index2 = -1;
    while (++index2 < constructs2.length) {
      const resolve = constructs2[index2].resolveAll;
      if (resolve && !called.includes(resolve)) {
        events = resolve(events, context);
        called.push(resolve);
      }
    }
    return events;
  }
  const attention = {
    name: "attention",
    resolveAll: resolveAllAttention,
    tokenize: tokenizeAttention
  };
  function resolveAllAttention(events, context) {
    let index2 = -1;
    let open;
    let group;
    let text2;
    let openingSequence;
    let closingSequence;
    let use;
    let nextEvents;
    let offset2;
    while (++index2 < events.length) {
      if (events[index2][0] === "enter" && events[index2][1].type === "attentionSequence" && events[index2][1]._close) {
        open = index2;
        while (open--) {
          if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open &&
context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index2][1]).charCodeAt(0)) {
            if ((events[open][1]._close || events[index2][1]._open) && (events[index2][1].end.offset - events[index2][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index2][1].end.offset - events[index2][1].start.offset) % 3)) {
              continue;
            }
            use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index2][1].end.offset - events[index2][1].start.offset > 1 ? 2 : 1;
            const start = {
              ...events[open][1].end
            };
            const end = {
              ...events[index2][1].start
            };
            movePoint(start, -use);
            movePoint(end, use);
            openingSequence = {
              type: use > 1 ? "strongSequence" : "emphasisSequence",
              start,
              end: {
                ...events[open][1].end
              }
            };
            closingSequence = {
              type: use > 1 ? "strongSequence" : "emphasisSequence",
              start: {
                ...events[index2][1].start
              },
              end
            };
            text2 = {
              type: use > 1 ? "strongText" : "emphasisText",
              start: {
                ...events[open][1].end
              },
              end: {
                ...events[index2][1].start
              }
            };
            group = {
              type: use > 1 ? "strong" : "emphasis",
              start: {
                ...openingSequence.start
              },
              end: {
                ...closingSequence.end
              }
            };
            events[open][1].end = {
              ...openingSequence.start
            };
            events[index2][1].start = {
              ...closingSequence.end
            };
            nextEvents = [];
            if (events[open][1].end.offset - events[open][1].start.offset) {
              nextEvents = push(nextEvents, [["enter", events[open][1], context], ["exit", events[open][1], context]]);
            }
            nextEvents = push(nextEvents, [["enter", group, context], ["enter", openingSequence, context], ["exit", openingSequence, context], ["enter", text2, context]]);
            nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index2), context));
            nextEvents = push(nextEvents, [["exit", text2, context], ["enter", closingSequence, context], ["exit", closingSequence, context], ["exit", group, context]]);
            if (events[index2][1].end.offset - events[index2][1].start.offset) {
              offset2 = 2;
              nextEvents = push(nextEvents, [["enter", events[index2][1], context], ["exit", events[index2][1], context]]);
            } else {
              offset2 = 0;
            }
            splice(events, open - 1, index2 - open + 3, nextEvents);
            index2 = open + nextEvents.length - offset2 - 2;
            break;
          }
        }
      }
    }
    index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][1].type === "attentionSequence") {
        events[index2][1].type = "data";
      }
    }
    return events;
  }
  function tokenizeAttention(effects, ok2) {
    const attentionMarkers2 = this.parser.constructs.attentionMarkers.null;
    const previous2 = this.previous;
    const before = classifyCharacter(previous2);
    let marker;
    return start;
    function start(code2) {
      marker = code2;
      effects.enter("attentionSequence");
      return inside(code2);
    }
    function inside(code2) {
      if (code2 === marker) {
        effects.consume(code2);
        return inside;
      }
      const token = effects.exit("attentionSequence");
      const after = classifyCharacter(code2);
      const open = !after || after === 2 && before || attentionMarkers2.includes(code2);
      const close = !before || before === 2 && after || attentionMarkers2.includes(previous2);
      token._open = Boolean(marker === 42 ? open : open && (before || !close));
      token._close = Boolean(marker === 42 ? close : close && (after || !open));
      return ok2(code2);
    }
  }
  function movePoint(point2, offset2) {
    point2.column += offset2;
    point2.offset += offset2;
    point2._bufferIndex += offset2;
  }
  const autolink = {
    name: "autolink",
    tokenize: tokenizeAutolink
  };
  function tokenizeAutolink(effects, ok2, nok) {
    let size2 = 0;
    return start;
    function start(code2) {
      effects.enter("autolink");
      effects.enter("autolinkMarker");
      effects.consume(code2);
      effects.exit("autolinkMarker");
      effects.enter("autolinkProtocol");
      return open;
    }
    function open(code2) {
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        return schemeOrEmailAtext;
      }
      if (code2 === 64) {
        return nok(code2);
      }
      return emailAtext(code2);
    }
    function schemeOrEmailAtext(code2) {
      if (code2 === 43 || code2 === 45 || code2 === 46 || asciiAlphanumeric(code2)) {
        size2 = 1;
        return schemeInsideOrEmailAtext(code2);
      }
      return emailAtext(code2);
    }
    function schemeInsideOrEmailAtext(code2) {
      if (code2 === 58) {
        effects.consume(code2);
        size2 = 0;
        return urlInside;
      }
      if ((code2 === 43 || code2 === 45 || code2 === 46 || asciiAlphanumeric(code2)) && size2++ < 32) {
        effects.consume(code2);
        return schemeInsideOrEmailAtext;
      }
      size2 = 0;
      return emailAtext(code2);
    }
    function urlInside(code2) {
      if (code2 === 62) {
        effects.exit("autolinkProtocol");
        effects.enter("autolinkMarker");
        effects.consume(code2);
        effects.exit("autolinkMarker");
        effects.exit("autolink");
        return ok2;
      }
      if (code2 === null || code2 === 32 || code2 === 60 || asciiControl(code2)) {
        return nok(code2);
      }
      effects.consume(code2);
      return urlInside;
    }
    function emailAtext(code2) {
      if (code2 === 64) {
        effects.consume(code2);
        return emailAtSignOrDot;
      }
      if (asciiAtext(code2)) {
        effects.consume(code2);
        return emailAtext;
      }
      return nok(code2);
    }
    function emailAtSignOrDot(code2) {
      return asciiAlphanumeric(code2) ? emailLabel(code2) : nok(code2);
    }
    function emailLabel(code2) {
      if (code2 === 46) {
        effects.consume(code2);
        size2 = 0;
        return emailAtSignOrDot;
      }
      if (code2 === 62) {
        effects.exit("autolinkProtocol").type = "autolinkEmail";
        effects.enter("autolinkMarker");
        effects.consume(code2);
        effects.exit("autolinkMarker");
        effects.exit("autolink");
        return ok2;
      }
      return emailValue(code2);
    }
    function emailValue(code2) {
      if ((code2 === 45 || asciiAlphanumeric(code2)) && size2++ < 63) {
        const next = code2 === 45 ? emailValue : emailLabel;
        effects.consume(code2);
        return next;
      }
      return nok(code2);
    }
  }
  const blankLine = {
    partial: true,
    tokenize: tokenizeBlankLine
  };
  function tokenizeBlankLine(effects, ok2, nok) {
    return start;
    function start(code2) {
      return markdownSpace(code2) ? factorySpace(effects, after, "linePrefix")(code2) : after(code2);
    }
    function after(code2) {
      return code2 === null || markdownLineEnding(code2) ? ok2(code2) : nok(code2);
    }
  }
  const blockQuote = {
    continuation: {
      tokenize: tokenizeBlockQuoteContinuation
    },
    exit: exit$1,
    name: "blockQuote",
    tokenize: tokenizeBlockQuoteStart
  };
  function tokenizeBlockQuoteStart(effects, ok2, nok) {
    const self2 = this;
    return start;
    function start(code2) {
      if (code2 === 62) {
        const state = self2.containerState;
        if (!state.open) {
          effects.enter("blockQuote", {
            _container: true
          });
          state.open = true;
        }
        effects.enter("blockQuotePrefix");
        effects.enter("blockQuoteMarker");
        effects.consume(code2);
        effects.exit("blockQuoteMarker");
        return after;
      }
      return nok(code2);
    }
    function after(code2) {
      if (markdownSpace(code2)) {
        effects.enter("blockQuotePrefixWhitespace");
        effects.consume(code2);
        effects.exit("blockQuotePrefixWhitespace");
        effects.exit("blockQuotePrefix");
        return ok2;
      }
      effects.exit("blockQuotePrefix");
      return ok2(code2);
    }
  }
  function tokenizeBlockQuoteContinuation(effects, ok2, nok) {
    const self2 = this;
    return contStart;
    function contStart(code2) {
      if (markdownSpace(code2)) {
        return factorySpace(effects, contBefore, "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code2);
      }
      return contBefore(code2);
    }
    function contBefore(code2) {
      return effects.attempt(blockQuote, ok2, nok)(code2);
    }
  }
  function exit$1(effects) {
    effects.exit("blockQuote");
  }
  const characterEscape = {
    name: "characterEscape",
    tokenize: tokenizeCharacterEscape
  };
  function tokenizeCharacterEscape(effects, ok2, nok) {
    return start;
    function start(code2) {
      effects.enter("characterEscape");
      effects.enter("escapeMarker");
      effects.consume(code2);
      effects.exit("escapeMarker");
      return inside;
    }
    function inside(code2) {
      if (asciiPunctuation(code2)) {
        effects.enter("characterEscapeValue");
        effects.consume(code2);
        effects.exit("characterEscapeValue");
        effects.exit("characterEscape");
        return ok2;
      }
      return nok(code2);
    }
  }
  const characterReference = {
    name: "characterReference",
    tokenize: tokenizeCharacterReference
  };
  function tokenizeCharacterReference(effects, ok2, nok) {
    const self2 = this;
    let size2 = 0;
    let max2;
    let test;
    return start;
    function start(code2) {
      effects.enter("characterReference");
      effects.enter("characterReferenceMarker");
      effects.consume(code2);
      effects.exit("characterReferenceMarker");
      return open;
    }
    function open(code2) {
      if (code2 === 35) {
        effects.enter("characterReferenceMarkerNumeric");
        effects.consume(code2);
        effects.exit("characterReferenceMarkerNumeric");
        return numeric;
      }
      effects.enter("characterReferenceValue");
      max2 = 31;
      test = asciiAlphanumeric;
      return value(code2);
    }
    function numeric(code2) {
      if (code2 === 88 || code2 === 120) {
        effects.enter("characterReferenceMarkerHexadecimal");
        effects.consume(code2);
        effects.exit("characterReferenceMarkerHexadecimal");
        effects.enter("characterReferenceValue");
        max2 = 6;
        test = asciiHexDigit;
        return value;
      }
      effects.enter("characterReferenceValue");
      max2 = 7;
      test = asciiDigit;
      return value(code2);
    }
    function value(code2) {
      if (code2 === 59 && size2) {
        const token = effects.exit("characterReferenceValue");
        if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self2.sliceSerialize(token))) {
          return nok(code2);
        }
        effects.enter("characterReferenceMarker");
        effects.consume(code2);
        effects.exit("characterReferenceMarker");
        effects.exit("characterReference");
        return ok2;
      }
      if (test(code2) && size2++ < max2) {
        effects.consume(code2);
        return value;
      }
      return nok(code2);
    }
  }
  const nonLazyContinuation = {
    partial: true,
    tokenize: tokenizeNonLazyContinuation
  };
  const codeFenced = {
    concrete: true,
    name: "codeFenced",
    tokenize: tokenizeCodeFenced
  };
  function tokenizeCodeFenced(effects, ok2, nok) {
    const self2 = this;
    const closeStart = {
      partial: true,
      tokenize: tokenizeCloseStart
    };
    let initialPrefix = 0;
    let sizeOpen = 0;
    let marker;
    return start;
    function start(code2) {
      return beforeSequenceOpen(code2);
    }
    function beforeSequenceOpen(code2) {
      const tail = self2.events[self2.events.length - 1];
      initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
      marker = code2;
      effects.enter("codeFenced");
      effects.enter("codeFencedFence");
      effects.enter("codeFencedFenceSequence");
      return sequenceOpen(code2);
    }
    function sequenceOpen(code2) {
      if (code2 === marker) {
        sizeOpen++;
        effects.consume(code2);
        return sequenceOpen;
      }
      if (sizeOpen < 3) {
        return nok(code2);
      }
      effects.exit("codeFencedFenceSequence");
      return markdownSpace(code2) ? factorySpace(effects, infoBefore, "whitespace")(code2) : infoBefore(code2);
    }
    function infoBefore(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("codeFencedFence");
        return self2.interrupt ? ok2(code2) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code2);
      }
      effects.enter("codeFencedFenceInfo");
      effects.enter("chunkString", {
        contentType: "string"
      });
      return info(code2);
    }
    function info(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("chunkString");
        effects.exit("codeFencedFenceInfo");
        return infoBefore(code2);
      }
      if (markdownSpace(code2)) {
        effects.exit("chunkString");
        effects.exit("codeFencedFenceInfo");
        return factorySpace(effects, metaBefore, "whitespace")(code2);
      }
      if (code2 === 96 && code2 === marker) {
        return nok(code2);
      }
      effects.consume(code2);
      return info;
    }
    function metaBefore(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        return infoBefore(code2);
      }
      effects.enter("codeFencedFenceMeta");
      effects.enter("chunkString", {
        contentType: "string"
      });
      return meta(code2);
    }
    function meta(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("chunkString");
        effects.exit("codeFencedFenceMeta");
        return infoBefore(code2);
      }
      if (code2 === 96 && code2 === marker) {
        return nok(code2);
      }
      effects.consume(code2);
      return meta;
    }
    function atNonLazyBreak(code2) {
      return effects.attempt(closeStart, after, contentBefore)(code2);
    }
    function contentBefore(code2) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return contentStart;
    }
    function contentStart(code2) {
      return initialPrefix > 0 && markdownSpace(code2) ? factorySpace(effects, beforeContentChunk, "linePrefix", initialPrefix + 1)(code2) : beforeContentChunk(code2);
    }
    function beforeContentChunk(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        return effects.check(nonLazyContinuation, atNonLazyBreak, after)(code2);
      }
      effects.enter("codeFlowValue");
      return contentChunk(code2);
    }
    function contentChunk(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("codeFlowValue");
        return beforeContentChunk(code2);
      }
      effects.consume(code2);
      return contentChunk;
    }
    function after(code2) {
      effects.exit("codeFenced");
      return ok2(code2);
    }
    function tokenizeCloseStart(effects2, ok3, nok2) {
      let size2 = 0;
      return startBefore;
      function startBefore(code2) {
        effects2.enter("lineEnding");
        effects2.consume(code2);
        effects2.exit("lineEnding");
        return start2;
      }
      function start2(code2) {
        effects2.enter("codeFencedFence");
        return markdownSpace(code2) ? factorySpace(effects2, beforeSequenceClose, "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code2) : beforeSequenceClose(code2);
      }
      function beforeSequenceClose(code2) {
        if (code2 === marker) {
          effects2.enter("codeFencedFenceSequence");
          return sequenceClose(code2);
        }
        return nok2(code2);
      }
      function sequenceClose(code2) {
        if (code2 === marker) {
          size2++;
          effects2.consume(code2);
          return sequenceClose;
        }
        if (size2 >= sizeOpen) {
          effects2.exit("codeFencedFenceSequence");
          return markdownSpace(code2) ? factorySpace(effects2, sequenceCloseAfter, "whitespace")(code2) : sequenceCloseAfter(code2);
        }
        return nok2(code2);
      }
      function sequenceCloseAfter(code2) {
        if (code2 === null || markdownLineEnding(code2)) {
          effects2.exit("codeFencedFence");
          return ok3(code2);
        }
        return nok2(code2);
      }
    }
  }
  function tokenizeNonLazyContinuation(effects, ok2, nok) {
    const self2 = this;
    return start;
    function start(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return lineStart;
    }
    function lineStart(code2) {
      return self2.parser.lazy[self2.now().line] ? nok(code2) : ok2(code2);
    }
  }
  const codeIndented = {
    name: "codeIndented",
    tokenize: tokenizeCodeIndented
  };
  const furtherStart = {
    partial: true,
    tokenize: tokenizeFurtherStart
  };
  function tokenizeCodeIndented(effects, ok2, nok) {
    const self2 = this;
    return start;
    function start(code2) {
      effects.enter("codeIndented");
      return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code2);
    }
    function afterPrefix(code2) {
      const tail = self2.events[self2.events.length - 1];
      return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? atBreak(code2) : nok(code2);
    }
    function atBreak(code2) {
      if (code2 === null) {
        return after(code2);
      }
      if (markdownLineEnding(code2)) {
        return effects.attempt(furtherStart, atBreak, after)(code2);
      }
      effects.enter("codeFlowValue");
      return inside(code2);
    }
    function inside(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("codeFlowValue");
        return atBreak(code2);
      }
      effects.consume(code2);
      return inside;
    }
    function after(code2) {
      effects.exit("codeIndented");
      return ok2(code2);
    }
  }
  function tokenizeFurtherStart(effects, ok2, nok) {
    const self2 = this;
    return furtherStart2;
    function furtherStart2(code2) {
      if (self2.parser.lazy[self2.now().line]) {
        return nok(code2);
      }
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        return furtherStart2;
      }
      return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code2);
    }
    function afterPrefix(code2) {
      const tail = self2.events[self2.events.length - 1];
      return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok2(code2) : markdownLineEnding(code2) ? furtherStart2(code2) : nok(code2);
    }
  }
  const codeText = {
    name: "codeText",
    previous: previous$1,
    resolve: resolveCodeText,
    tokenize: tokenizeCodeText
  };
  function resolveCodeText(events) {
    let tailExitIndex = events.length - 4;
    let headEnterIndex = 3;
    let index2;
    let enter;
    if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
      index2 = headEnterIndex;
      while (++index2 < tailExitIndex) {
        if (events[index2][1].type === "codeTextData") {
          events[headEnterIndex][1].type = "codeTextPadding";
          events[tailExitIndex][1].type = "codeTextPadding";
          headEnterIndex += 2;
          tailExitIndex -= 2;
          break;
        }
      }
    }
    index2 = headEnterIndex - 1;
    tailExitIndex++;
    while (++index2 <= tailExitIndex) {
      if (enter === void 0) {
        if (index2 !== tailExitIndex && events[index2][1].type !== "lineEnding") {
          enter = index2;
        }
      } else if (index2 === tailExitIndex || events[index2][1].type === "lineEnding") {
        events[enter][1].type = "codeTextData";
        if (index2 !== enter + 2) {
          events[enter][1].end = events[index2 - 1][1].end;
          events.splice(enter + 2, index2 - enter - 2);
          tailExitIndex -= index2 - enter - 2;
          index2 = enter + 2;
        }
        enter = void 0;
      }
    }
    return events;
  }
  function previous$1(code2) {
    return code2 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
  }
  function tokenizeCodeText(effects, ok2, nok) {
    let sizeOpen = 0;
    let size2;
    let token;
    return start;
    function start(code2) {
      effects.enter("codeText");
      effects.enter("codeTextSequence");
      return sequenceOpen(code2);
    }
    function sequenceOpen(code2) {
      if (code2 === 96) {
        effects.consume(code2);
        sizeOpen++;
        return sequenceOpen;
      }
      effects.exit("codeTextSequence");
      return between2(code2);
    }
    function between2(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      if (code2 === 32) {
        effects.enter("space");
        effects.consume(code2);
        effects.exit("space");
        return between2;
      }
      if (code2 === 96) {
        token = effects.enter("codeTextSequence");
        size2 = 0;
        return sequenceClose(code2);
      }
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        return between2;
      }
      effects.enter("codeTextData");
      return data(code2);
    }
    function data(code2) {
      if (code2 === null || code2 === 32 || code2 === 96 || markdownLineEnding(code2)) {
        effects.exit("codeTextData");
        return between2(code2);
      }
      effects.consume(code2);
      return data;
    }
    function sequenceClose(code2) {
      if (code2 === 96) {
        effects.consume(code2);
        size2++;
        return sequenceClose;
      }
      if (size2 === sizeOpen) {
        effects.exit("codeTextSequence");
        effects.exit("codeText");
        return ok2(code2);
      }
      token.type = "codeTextData";
      return data(code2);
    }
  }
  class SpliceBuffer {
constructor(initial) {
      this.left = initial ? [...initial] : [];
      this.right = [];
    }
get(index2) {
      if (index2 < 0 || index2 >= this.left.length + this.right.length) {
        throw new RangeError("Cannot access index `" + index2 + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
      }
      if (index2 < this.left.length) return this.left[index2];
      return this.right[this.right.length - index2 + this.left.length - 1];
    }
get length() {
      return this.left.length + this.right.length;
    }
shift() {
      this.setCursor(0);
      return this.right.pop();
    }
slice(start, end) {
      const stop = end === null || end === void 0 ? Number.POSITIVE_INFINITY : end;
      if (stop < this.left.length) {
        return this.left.slice(start, stop);
      }
      if (start > this.left.length) {
        return this.right.slice(this.right.length - stop + this.left.length, this.right.length - start + this.left.length).reverse();
      }
      return this.left.slice(start).concat(this.right.slice(this.right.length - stop + this.left.length).reverse());
    }
splice(start, deleteCount, items) {
      const count2 = deleteCount || 0;
      this.setCursor(Math.trunc(start));
      const removed = this.right.splice(this.right.length - count2, Number.POSITIVE_INFINITY);
      if (items) chunkedPush(this.left, items);
      return removed.reverse();
    }
pop() {
      this.setCursor(Number.POSITIVE_INFINITY);
      return this.left.pop();
    }
push(item) {
      this.setCursor(Number.POSITIVE_INFINITY);
      this.left.push(item);
    }
pushMany(items) {
      this.setCursor(Number.POSITIVE_INFINITY);
      chunkedPush(this.left, items);
    }
unshift(item) {
      this.setCursor(0);
      this.right.push(item);
    }
unshiftMany(items) {
      this.setCursor(0);
      chunkedPush(this.right, items.reverse());
    }
setCursor(n2) {
      if (n2 === this.left.length || n2 > this.left.length && this.right.length === 0 || n2 < 0 && this.left.length === 0) return;
      if (n2 < this.left.length) {
        const removed = this.left.splice(n2, Number.POSITIVE_INFINITY);
        chunkedPush(this.right, removed.reverse());
      } else {
        const removed = this.right.splice(this.left.length + this.right.length - n2, Number.POSITIVE_INFINITY);
        chunkedPush(this.left, removed.reverse());
      }
    }
  }
  function chunkedPush(list2, right) {
    let chunkStart = 0;
    if (right.length < 1e4) {
      list2.push(...right);
    } else {
      while (chunkStart < right.length) {
        list2.push(...right.slice(chunkStart, chunkStart + 1e4));
        chunkStart += 1e4;
      }
    }
  }
  function subtokenize(eventsArray) {
    const jumps = {};
    let index2 = -1;
    let event;
    let lineIndex;
    let otherIndex;
    let otherEvent;
    let parameters;
    let subevents;
    let more;
    const events = new SpliceBuffer(eventsArray);
    while (++index2 < events.length) {
      while (index2 in jumps) {
        index2 = jumps[index2];
      }
      event = events.get(index2);
      if (index2 && event[1].type === "chunkFlow" && events.get(index2 - 1)[1].type === "listItemPrefix") {
        subevents = event[1]._tokenizer.events;
        otherIndex = 0;
        if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
          otherIndex += 2;
        }
        if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
          while (++otherIndex < subevents.length) {
            if (subevents[otherIndex][1].type === "content") {
              break;
            }
            if (subevents[otherIndex][1].type === "chunkText") {
              subevents[otherIndex][1]._isInFirstContentOfListItem = true;
              otherIndex++;
            }
          }
        }
      }
      if (event[0] === "enter") {
        if (event[1].contentType) {
          Object.assign(jumps, subcontent(events, index2));
          index2 = jumps[index2];
          more = true;
        }
      } else if (event[1]._container) {
        otherIndex = index2;
        lineIndex = void 0;
        while (otherIndex--) {
          otherEvent = events.get(otherIndex);
          if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
            if (otherEvent[0] === "enter") {
              if (lineIndex) {
                events.get(lineIndex)[1].type = "lineEndingBlank";
              }
              otherEvent[1].type = "lineEnding";
              lineIndex = otherIndex;
            }
          } else if (otherEvent[1].type === "linePrefix" || otherEvent[1].type === "listItemIndent") ;
          else {
            break;
          }
        }
        if (lineIndex) {
          event[1].end = {
            ...events.get(lineIndex)[1].start
          };
          parameters = events.slice(lineIndex, index2);
          parameters.unshift(event);
          events.splice(lineIndex, index2 - lineIndex + 1, parameters);
        }
      }
    }
    splice(eventsArray, 0, Number.POSITIVE_INFINITY, events.slice(0));
    return !more;
  }
  function subcontent(events, eventIndex) {
    const token = events.get(eventIndex)[1];
    const context = events.get(eventIndex)[2];
    let startPosition = eventIndex - 1;
    const startPositions = [];
    let tokenizer = token._tokenizer;
    if (!tokenizer) {
      tokenizer = context.parser[token.contentType](token.start);
      if (token._contentTypeTextTrailing) {
        tokenizer._contentTypeTextTrailing = true;
      }
    }
    const childEvents = tokenizer.events;
    const jumps = [];
    const gaps = {};
    let stream;
    let previous2;
    let index2 = -1;
    let current = token;
    let adjust = 0;
    let start = 0;
    const breaks = [start];
    while (current) {
      while (events.get(++startPosition)[1] !== current) {
      }
      startPositions.push(startPosition);
      if (!current._tokenizer) {
        stream = context.sliceStream(current);
        if (!current.next) {
          stream.push(null);
        }
        if (previous2) {
          tokenizer.defineSkip(current.start);
        }
        if (current._isInFirstContentOfListItem) {
          tokenizer._gfmTasklistFirstContentOfListItem = true;
        }
        tokenizer.write(stream);
        if (current._isInFirstContentOfListItem) {
          tokenizer._gfmTasklistFirstContentOfListItem = void 0;
        }
      }
      previous2 = current;
      current = current.next;
    }
    current = token;
    while (++index2 < childEvents.length) {
      if (
childEvents[index2][0] === "exit" && childEvents[index2 - 1][0] === "enter" && childEvents[index2][1].type === childEvents[index2 - 1][1].type && childEvents[index2][1].start.line !== childEvents[index2][1].end.line
      ) {
        start = index2 + 1;
        breaks.push(start);
        current._tokenizer = void 0;
        current.previous = void 0;
        current = current.next;
      }
    }
    tokenizer.events = [];
    if (current) {
      current._tokenizer = void 0;
      current.previous = void 0;
    } else {
      breaks.pop();
    }
    index2 = breaks.length;
    while (index2--) {
      const slice = childEvents.slice(breaks[index2], breaks[index2 + 1]);
      const start2 = startPositions.pop();
      jumps.push([start2, start2 + slice.length - 1]);
      events.splice(start2, 2, slice);
    }
    jumps.reverse();
    index2 = -1;
    while (++index2 < jumps.length) {
      gaps[adjust + jumps[index2][0]] = adjust + jumps[index2][1];
      adjust += jumps[index2][1] - jumps[index2][0] - 1;
    }
    return gaps;
  }
  const content = {
    resolve: resolveContent,
    tokenize: tokenizeContent
  };
  const continuationConstruct = {
    partial: true,
    tokenize: tokenizeContinuation
  };
  function resolveContent(events) {
    subtokenize(events);
    return events;
  }
  function tokenizeContent(effects, ok2) {
    let previous2;
    return chunkStart;
    function chunkStart(code2) {
      effects.enter("content");
      previous2 = effects.enter("chunkContent", {
        contentType: "content"
      });
      return chunkInside(code2);
    }
    function chunkInside(code2) {
      if (code2 === null) {
        return contentEnd(code2);
      }
      if (markdownLineEnding(code2)) {
        return effects.check(continuationConstruct, contentContinue, contentEnd)(code2);
      }
      effects.consume(code2);
      return chunkInside;
    }
    function contentEnd(code2) {
      effects.exit("chunkContent");
      effects.exit("content");
      return ok2(code2);
    }
    function contentContinue(code2) {
      effects.consume(code2);
      effects.exit("chunkContent");
      previous2.next = effects.enter("chunkContent", {
        contentType: "content",
        previous: previous2
      });
      previous2 = previous2.next;
      return chunkInside;
    }
  }
  function tokenizeContinuation(effects, ok2, nok) {
    const self2 = this;
    return startLookahead;
    function startLookahead(code2) {
      effects.exit("chunkContent");
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return factorySpace(effects, prefixed, "linePrefix");
    }
    function prefixed(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        return nok(code2);
      }
      const tail = self2.events[self2.events.length - 1];
      if (!self2.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
        return ok2(code2);
      }
      return effects.interrupt(self2.parser.constructs.flow, nok, ok2)(code2);
    }
  }
  function factoryDestination(effects, ok2, nok, type, literalType, literalMarkerType, rawType, stringType, max2) {
    const limit = max2 || Number.POSITIVE_INFINITY;
    let balance = 0;
    return start;
    function start(code2) {
      if (code2 === 60) {
        effects.enter(type);
        effects.enter(literalType);
        effects.enter(literalMarkerType);
        effects.consume(code2);
        effects.exit(literalMarkerType);
        return enclosedBefore;
      }
      if (code2 === null || code2 === 32 || code2 === 41 || asciiControl(code2)) {
        return nok(code2);
      }
      effects.enter(type);
      effects.enter(rawType);
      effects.enter(stringType);
      effects.enter("chunkString", {
        contentType: "string"
      });
      return raw2(code2);
    }
    function enclosedBefore(code2) {
      if (code2 === 62) {
        effects.enter(literalMarkerType);
        effects.consume(code2);
        effects.exit(literalMarkerType);
        effects.exit(literalType);
        effects.exit(type);
        return ok2;
      }
      effects.enter(stringType);
      effects.enter("chunkString", {
        contentType: "string"
      });
      return enclosed(code2);
    }
    function enclosed(code2) {
      if (code2 === 62) {
        effects.exit("chunkString");
        effects.exit(stringType);
        return enclosedBefore(code2);
      }
      if (code2 === null || code2 === 60 || markdownLineEnding(code2)) {
        return nok(code2);
      }
      effects.consume(code2);
      return code2 === 92 ? enclosedEscape : enclosed;
    }
    function enclosedEscape(code2) {
      if (code2 === 60 || code2 === 62 || code2 === 92) {
        effects.consume(code2);
        return enclosed;
      }
      return enclosed(code2);
    }
    function raw2(code2) {
      if (!balance && (code2 === null || code2 === 41 || markdownLineEndingOrSpace(code2))) {
        effects.exit("chunkString");
        effects.exit(stringType);
        effects.exit(rawType);
        effects.exit(type);
        return ok2(code2);
      }
      if (balance < limit && code2 === 40) {
        effects.consume(code2);
        balance++;
        return raw2;
      }
      if (code2 === 41) {
        effects.consume(code2);
        balance--;
        return raw2;
      }
      if (code2 === null || code2 === 32 || code2 === 40 || asciiControl(code2)) {
        return nok(code2);
      }
      effects.consume(code2);
      return code2 === 92 ? rawEscape : raw2;
    }
    function rawEscape(code2) {
      if (code2 === 40 || code2 === 41 || code2 === 92) {
        effects.consume(code2);
        return raw2;
      }
      return raw2(code2);
    }
  }
  function factoryLabel(effects, ok2, nok, type, markerType, stringType) {
    const self2 = this;
    let size2 = 0;
    let seen;
    return start;
    function start(code2) {
      effects.enter(type);
      effects.enter(markerType);
      effects.consume(code2);
      effects.exit(markerType);
      effects.enter(stringType);
      return atBreak;
    }
    function atBreak(code2) {
      if (size2 > 999 || code2 === null || code2 === 91 || code2 === 93 && !seen ||




code2 === 94 && !size2 && "_hiddenFootnoteSupport" in self2.parser.constructs) {
        return nok(code2);
      }
      if (code2 === 93) {
        effects.exit(stringType);
        effects.enter(markerType);
        effects.consume(code2);
        effects.exit(markerType);
        effects.exit(type);
        return ok2;
      }
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        return atBreak;
      }
      effects.enter("chunkString", {
        contentType: "string"
      });
      return labelInside(code2);
    }
    function labelInside(code2) {
      if (code2 === null || code2 === 91 || code2 === 93 || markdownLineEnding(code2) || size2++ > 999) {
        effects.exit("chunkString");
        return atBreak(code2);
      }
      effects.consume(code2);
      if (!seen) seen = !markdownSpace(code2);
      return code2 === 92 ? labelEscape : labelInside;
    }
    function labelEscape(code2) {
      if (code2 === 91 || code2 === 92 || code2 === 93) {
        effects.consume(code2);
        size2++;
        return labelInside;
      }
      return labelInside(code2);
    }
  }
  function factoryTitle(effects, ok2, nok, type, markerType, stringType) {
    let marker;
    return start;
    function start(code2) {
      if (code2 === 34 || code2 === 39 || code2 === 40) {
        effects.enter(type);
        effects.enter(markerType);
        effects.consume(code2);
        effects.exit(markerType);
        marker = code2 === 40 ? 41 : code2;
        return begin;
      }
      return nok(code2);
    }
    function begin(code2) {
      if (code2 === marker) {
        effects.enter(markerType);
        effects.consume(code2);
        effects.exit(markerType);
        effects.exit(type);
        return ok2;
      }
      effects.enter(stringType);
      return atBreak(code2);
    }
    function atBreak(code2) {
      if (code2 === marker) {
        effects.exit(stringType);
        return begin(marker);
      }
      if (code2 === null) {
        return nok(code2);
      }
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        return factorySpace(effects, atBreak, "linePrefix");
      }
      effects.enter("chunkString", {
        contentType: "string"
      });
      return inside(code2);
    }
    function inside(code2) {
      if (code2 === marker || code2 === null || markdownLineEnding(code2)) {
        effects.exit("chunkString");
        return atBreak(code2);
      }
      effects.consume(code2);
      return code2 === 92 ? escape2 : inside;
    }
    function escape2(code2) {
      if (code2 === marker || code2 === 92) {
        effects.consume(code2);
        return inside;
      }
      return inside(code2);
    }
  }
  function factoryWhitespace(effects, ok2) {
    let seen;
    return start;
    function start(code2) {
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        seen = true;
        return start;
      }
      if (markdownSpace(code2)) {
        return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code2);
      }
      return ok2(code2);
    }
  }
  const definition$1 = {
    name: "definition",
    tokenize: tokenizeDefinition
  };
  const titleBefore = {
    partial: true,
    tokenize: tokenizeTitleBefore
  };
  function tokenizeDefinition(effects, ok2, nok) {
    const self2 = this;
    let identifier;
    return start;
    function start(code2) {
      effects.enter("definition");
      return before(code2);
    }
    function before(code2) {
      return factoryLabel.call(
        self2,
        effects,
        labelAfter,
nok,
        "definitionLabel",
        "definitionLabelMarker",
        "definitionLabelString"
      )(code2);
    }
    function labelAfter(code2) {
      identifier = normalizeIdentifier(self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1));
      if (code2 === 58) {
        effects.enter("definitionMarker");
        effects.consume(code2);
        effects.exit("definitionMarker");
        return markerAfter;
      }
      return nok(code2);
    }
    function markerAfter(code2) {
      return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, destinationBefore)(code2) : destinationBefore(code2);
    }
    function destinationBefore(code2) {
      return factoryDestination(
        effects,
        destinationAfter,
nok,
        "definitionDestination",
        "definitionDestinationLiteral",
        "definitionDestinationLiteralMarker",
        "definitionDestinationRaw",
        "definitionDestinationString"
      )(code2);
    }
    function destinationAfter(code2) {
      return effects.attempt(titleBefore, after, after)(code2);
    }
    function after(code2) {
      return markdownSpace(code2) ? factorySpace(effects, afterWhitespace, "whitespace")(code2) : afterWhitespace(code2);
    }
    function afterWhitespace(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("definition");
        self2.parser.defined.push(identifier);
        return ok2(code2);
      }
      return nok(code2);
    }
  }
  function tokenizeTitleBefore(effects, ok2, nok) {
    return titleBefore2;
    function titleBefore2(code2) {
      return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, beforeMarker)(code2) : nok(code2);
    }
    function beforeMarker(code2) {
      return factoryTitle(effects, titleAfter, nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code2);
    }
    function titleAfter(code2) {
      return markdownSpace(code2) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code2) : titleAfterOptionalWhitespace(code2);
    }
    function titleAfterOptionalWhitespace(code2) {
      return code2 === null || markdownLineEnding(code2) ? ok2(code2) : nok(code2);
    }
  }
  const hardBreakEscape = {
    name: "hardBreakEscape",
    tokenize: tokenizeHardBreakEscape
  };
  function tokenizeHardBreakEscape(effects, ok2, nok) {
    return start;
    function start(code2) {
      effects.enter("hardBreakEscape");
      effects.consume(code2);
      return after;
    }
    function after(code2) {
      if (markdownLineEnding(code2)) {
        effects.exit("hardBreakEscape");
        return ok2(code2);
      }
      return nok(code2);
    }
  }
  const headingAtx = {
    name: "headingAtx",
    resolve: resolveHeadingAtx,
    tokenize: tokenizeHeadingAtx
  };
  function resolveHeadingAtx(events, context) {
    let contentEnd = events.length - 2;
    let contentStart = 3;
    let content2;
    let text2;
    if (events[contentStart][1].type === "whitespace") {
      contentStart += 2;
    }
    if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") {
      contentEnd -= 2;
    }
    if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) {
      contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
    }
    if (contentEnd > contentStart) {
      content2 = {
        type: "atxHeadingText",
        start: events[contentStart][1].start,
        end: events[contentEnd][1].end
      };
      text2 = {
        type: "chunkText",
        start: events[contentStart][1].start,
        end: events[contentEnd][1].end,
        contentType: "text"
      };
      splice(events, contentStart, contentEnd - contentStart + 1, [["enter", content2, context], ["enter", text2, context], ["exit", text2, context], ["exit", content2, context]]);
    }
    return events;
  }
  function tokenizeHeadingAtx(effects, ok2, nok) {
    let size2 = 0;
    return start;
    function start(code2) {
      effects.enter("atxHeading");
      return before(code2);
    }
    function before(code2) {
      effects.enter("atxHeadingSequence");
      return sequenceOpen(code2);
    }
    function sequenceOpen(code2) {
      if (code2 === 35 && size2++ < 6) {
        effects.consume(code2);
        return sequenceOpen;
      }
      if (code2 === null || markdownLineEndingOrSpace(code2)) {
        effects.exit("atxHeadingSequence");
        return atBreak(code2);
      }
      return nok(code2);
    }
    function atBreak(code2) {
      if (code2 === 35) {
        effects.enter("atxHeadingSequence");
        return sequenceFurther(code2);
      }
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("atxHeading");
        return ok2(code2);
      }
      if (markdownSpace(code2)) {
        return factorySpace(effects, atBreak, "whitespace")(code2);
      }
      effects.enter("atxHeadingText");
      return data(code2);
    }
    function sequenceFurther(code2) {
      if (code2 === 35) {
        effects.consume(code2);
        return sequenceFurther;
      }
      effects.exit("atxHeadingSequence");
      return atBreak(code2);
    }
    function data(code2) {
      if (code2 === null || code2 === 35 || markdownLineEndingOrSpace(code2)) {
        effects.exit("atxHeadingText");
        return atBreak(code2);
      }
      effects.consume(code2);
      return data;
    }
  }
  const htmlBlockNames = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "search",
    "section",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul"
  ];
  const htmlRawNames = ["pre", "script", "style", "textarea"];
  const htmlFlow = {
    concrete: true,
    name: "htmlFlow",
    resolveTo: resolveToHtmlFlow,
    tokenize: tokenizeHtmlFlow
  };
  const blankLineBefore = {
    partial: true,
    tokenize: tokenizeBlankLineBefore
  };
  const nonLazyContinuationStart = {
    partial: true,
    tokenize: tokenizeNonLazyContinuationStart
  };
  function resolveToHtmlFlow(events) {
    let index2 = events.length;
    while (index2--) {
      if (events[index2][0] === "enter" && events[index2][1].type === "htmlFlow") {
        break;
      }
    }
    if (index2 > 1 && events[index2 - 2][1].type === "linePrefix") {
      events[index2][1].start = events[index2 - 2][1].start;
      events[index2 + 1][1].start = events[index2 - 2][1].start;
      events.splice(index2 - 2, 2);
    }
    return events;
  }
  function tokenizeHtmlFlow(effects, ok2, nok) {
    const self2 = this;
    let marker;
    let closingTag;
    let buffer;
    let index2;
    let markerB;
    return start;
    function start(code2) {
      return before(code2);
    }
    function before(code2) {
      effects.enter("htmlFlow");
      effects.enter("htmlFlowData");
      effects.consume(code2);
      return open;
    }
    function open(code2) {
      if (code2 === 33) {
        effects.consume(code2);
        return declarationOpen;
      }
      if (code2 === 47) {
        effects.consume(code2);
        closingTag = true;
        return tagCloseStart;
      }
      if (code2 === 63) {
        effects.consume(code2);
        marker = 3;
        return self2.interrupt ? ok2 : continuationDeclarationInside;
      }
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        buffer = String.fromCharCode(code2);
        return tagName;
      }
      return nok(code2);
    }
    function declarationOpen(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        marker = 2;
        return commentOpenInside;
      }
      if (code2 === 91) {
        effects.consume(code2);
        marker = 5;
        index2 = 0;
        return cdataOpenInside;
      }
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        marker = 4;
        return self2.interrupt ? ok2 : continuationDeclarationInside;
      }
      return nok(code2);
    }
    function commentOpenInside(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return self2.interrupt ? ok2 : continuationDeclarationInside;
      }
      return nok(code2);
    }
    function cdataOpenInside(code2) {
      const value = "CDATA[";
      if (code2 === value.charCodeAt(index2++)) {
        effects.consume(code2);
        if (index2 === value.length) {
          return self2.interrupt ? ok2 : continuation;
        }
        return cdataOpenInside;
      }
      return nok(code2);
    }
    function tagCloseStart(code2) {
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        buffer = String.fromCharCode(code2);
        return tagName;
      }
      return nok(code2);
    }
    function tagName(code2) {
      if (code2 === null || code2 === 47 || code2 === 62 || markdownLineEndingOrSpace(code2)) {
        const slash = code2 === 47;
        const name = buffer.toLowerCase();
        if (!slash && !closingTag && htmlRawNames.includes(name)) {
          marker = 1;
          return self2.interrupt ? ok2(code2) : continuation(code2);
        }
        if (htmlBlockNames.includes(buffer.toLowerCase())) {
          marker = 6;
          if (slash) {
            effects.consume(code2);
            return basicSelfClosing;
          }
          return self2.interrupt ? ok2(code2) : continuation(code2);
        }
        marker = 7;
        return self2.interrupt && !self2.parser.lazy[self2.now().line] ? nok(code2) : closingTag ? completeClosingTagAfter(code2) : completeAttributeNameBefore(code2);
      }
      if (code2 === 45 || asciiAlphanumeric(code2)) {
        effects.consume(code2);
        buffer += String.fromCharCode(code2);
        return tagName;
      }
      return nok(code2);
    }
    function basicSelfClosing(code2) {
      if (code2 === 62) {
        effects.consume(code2);
        return self2.interrupt ? ok2 : continuation;
      }
      return nok(code2);
    }
    function completeClosingTagAfter(code2) {
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return completeClosingTagAfter;
      }
      return completeEnd(code2);
    }
    function completeAttributeNameBefore(code2) {
      if (code2 === 47) {
        effects.consume(code2);
        return completeEnd;
      }
      if (code2 === 58 || code2 === 95 || asciiAlpha(code2)) {
        effects.consume(code2);
        return completeAttributeName;
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return completeAttributeNameBefore;
      }
      return completeEnd(code2);
    }
    function completeAttributeName(code2) {
      if (code2 === 45 || code2 === 46 || code2 === 58 || code2 === 95 || asciiAlphanumeric(code2)) {
        effects.consume(code2);
        return completeAttributeName;
      }
      return completeAttributeNameAfter(code2);
    }
    function completeAttributeNameAfter(code2) {
      if (code2 === 61) {
        effects.consume(code2);
        return completeAttributeValueBefore;
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return completeAttributeNameAfter;
      }
      return completeAttributeNameBefore(code2);
    }
    function completeAttributeValueBefore(code2) {
      if (code2 === null || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96) {
        return nok(code2);
      }
      if (code2 === 34 || code2 === 39) {
        effects.consume(code2);
        markerB = code2;
        return completeAttributeValueQuoted;
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return completeAttributeValueBefore;
      }
      return completeAttributeValueUnquoted(code2);
    }
    function completeAttributeValueQuoted(code2) {
      if (code2 === markerB) {
        effects.consume(code2);
        markerB = null;
        return completeAttributeValueQuotedAfter;
      }
      if (code2 === null || markdownLineEnding(code2)) {
        return nok(code2);
      }
      effects.consume(code2);
      return completeAttributeValueQuoted;
    }
    function completeAttributeValueUnquoted(code2) {
      if (code2 === null || code2 === 34 || code2 === 39 || code2 === 47 || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96 || markdownLineEndingOrSpace(code2)) {
        return completeAttributeNameAfter(code2);
      }
      effects.consume(code2);
      return completeAttributeValueUnquoted;
    }
    function completeAttributeValueQuotedAfter(code2) {
      if (code2 === 47 || code2 === 62 || markdownSpace(code2)) {
        return completeAttributeNameBefore(code2);
      }
      return nok(code2);
    }
    function completeEnd(code2) {
      if (code2 === 62) {
        effects.consume(code2);
        return completeAfter;
      }
      return nok(code2);
    }
    function completeAfter(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        return continuation(code2);
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return completeAfter;
      }
      return nok(code2);
    }
    function continuation(code2) {
      if (code2 === 45 && marker === 2) {
        effects.consume(code2);
        return continuationCommentInside;
      }
      if (code2 === 60 && marker === 1) {
        effects.consume(code2);
        return continuationRawTagOpen;
      }
      if (code2 === 62 && marker === 4) {
        effects.consume(code2);
        return continuationClose;
      }
      if (code2 === 63 && marker === 3) {
        effects.consume(code2);
        return continuationDeclarationInside;
      }
      if (code2 === 93 && marker === 5) {
        effects.consume(code2);
        return continuationCdataInside;
      }
      if (markdownLineEnding(code2) && (marker === 6 || marker === 7)) {
        effects.exit("htmlFlowData");
        return effects.check(blankLineBefore, continuationAfter, continuationStart)(code2);
      }
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("htmlFlowData");
        return continuationStart(code2);
      }
      effects.consume(code2);
      return continuation;
    }
    function continuationStart(code2) {
      return effects.check(nonLazyContinuationStart, continuationStartNonLazy, continuationAfter)(code2);
    }
    function continuationStartNonLazy(code2) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return continuationBefore;
    }
    function continuationBefore(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        return continuationStart(code2);
      }
      effects.enter("htmlFlowData");
      return continuation(code2);
    }
    function continuationCommentInside(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return continuationDeclarationInside;
      }
      return continuation(code2);
    }
    function continuationRawTagOpen(code2) {
      if (code2 === 47) {
        effects.consume(code2);
        buffer = "";
        return continuationRawEndTag;
      }
      return continuation(code2);
    }
    function continuationRawEndTag(code2) {
      if (code2 === 62) {
        const name = buffer.toLowerCase();
        if (htmlRawNames.includes(name)) {
          effects.consume(code2);
          return continuationClose;
        }
        return continuation(code2);
      }
      if (asciiAlpha(code2) && buffer.length < 8) {
        effects.consume(code2);
        buffer += String.fromCharCode(code2);
        return continuationRawEndTag;
      }
      return continuation(code2);
    }
    function continuationCdataInside(code2) {
      if (code2 === 93) {
        effects.consume(code2);
        return continuationDeclarationInside;
      }
      return continuation(code2);
    }
    function continuationDeclarationInside(code2) {
      if (code2 === 62) {
        effects.consume(code2);
        return continuationClose;
      }
      if (code2 === 45 && marker === 2) {
        effects.consume(code2);
        return continuationDeclarationInside;
      }
      return continuation(code2);
    }
    function continuationClose(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("htmlFlowData");
        return continuationAfter(code2);
      }
      effects.consume(code2);
      return continuationClose;
    }
    function continuationAfter(code2) {
      effects.exit("htmlFlow");
      return ok2(code2);
    }
  }
  function tokenizeNonLazyContinuationStart(effects, ok2, nok) {
    const self2 = this;
    return start;
    function start(code2) {
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        return after;
      }
      return nok(code2);
    }
    function after(code2) {
      return self2.parser.lazy[self2.now().line] ? nok(code2) : ok2(code2);
    }
  }
  function tokenizeBlankLineBefore(effects, ok2, nok) {
    return start;
    function start(code2) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return effects.attempt(blankLine, ok2, nok);
    }
  }
  const htmlText = {
    name: "htmlText",
    tokenize: tokenizeHtmlText
  };
  function tokenizeHtmlText(effects, ok2, nok) {
    const self2 = this;
    let marker;
    let index2;
    let returnState;
    return start;
    function start(code2) {
      effects.enter("htmlText");
      effects.enter("htmlTextData");
      effects.consume(code2);
      return open;
    }
    function open(code2) {
      if (code2 === 33) {
        effects.consume(code2);
        return declarationOpen;
      }
      if (code2 === 47) {
        effects.consume(code2);
        return tagCloseStart;
      }
      if (code2 === 63) {
        effects.consume(code2);
        return instruction;
      }
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        return tagOpen;
      }
      return nok(code2);
    }
    function declarationOpen(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return commentOpenInside;
      }
      if (code2 === 91) {
        effects.consume(code2);
        index2 = 0;
        return cdataOpenInside;
      }
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        return declaration;
      }
      return nok(code2);
    }
    function commentOpenInside(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return commentEnd;
      }
      return nok(code2);
    }
    function comment2(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      if (code2 === 45) {
        effects.consume(code2);
        return commentClose;
      }
      if (markdownLineEnding(code2)) {
        returnState = comment2;
        return lineEndingBefore(code2);
      }
      effects.consume(code2);
      return comment2;
    }
    function commentClose(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return commentEnd;
      }
      return comment2(code2);
    }
    function commentEnd(code2) {
      return code2 === 62 ? end(code2) : code2 === 45 ? commentClose(code2) : comment2(code2);
    }
    function cdataOpenInside(code2) {
      const value = "CDATA[";
      if (code2 === value.charCodeAt(index2++)) {
        effects.consume(code2);
        return index2 === value.length ? cdata : cdataOpenInside;
      }
      return nok(code2);
    }
    function cdata(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      if (code2 === 93) {
        effects.consume(code2);
        return cdataClose;
      }
      if (markdownLineEnding(code2)) {
        returnState = cdata;
        return lineEndingBefore(code2);
      }
      effects.consume(code2);
      return cdata;
    }
    function cdataClose(code2) {
      if (code2 === 93) {
        effects.consume(code2);
        return cdataEnd;
      }
      return cdata(code2);
    }
    function cdataEnd(code2) {
      if (code2 === 62) {
        return end(code2);
      }
      if (code2 === 93) {
        effects.consume(code2);
        return cdataEnd;
      }
      return cdata(code2);
    }
    function declaration(code2) {
      if (code2 === null || code2 === 62) {
        return end(code2);
      }
      if (markdownLineEnding(code2)) {
        returnState = declaration;
        return lineEndingBefore(code2);
      }
      effects.consume(code2);
      return declaration;
    }
    function instruction(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      if (code2 === 63) {
        effects.consume(code2);
        return instructionClose;
      }
      if (markdownLineEnding(code2)) {
        returnState = instruction;
        return lineEndingBefore(code2);
      }
      effects.consume(code2);
      return instruction;
    }
    function instructionClose(code2) {
      return code2 === 62 ? end(code2) : instruction(code2);
    }
    function tagCloseStart(code2) {
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        return tagClose;
      }
      return nok(code2);
    }
    function tagClose(code2) {
      if (code2 === 45 || asciiAlphanumeric(code2)) {
        effects.consume(code2);
        return tagClose;
      }
      return tagCloseBetween(code2);
    }
    function tagCloseBetween(code2) {
      if (markdownLineEnding(code2)) {
        returnState = tagCloseBetween;
        return lineEndingBefore(code2);
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return tagCloseBetween;
      }
      return end(code2);
    }
    function tagOpen(code2) {
      if (code2 === 45 || asciiAlphanumeric(code2)) {
        effects.consume(code2);
        return tagOpen;
      }
      if (code2 === 47 || code2 === 62 || markdownLineEndingOrSpace(code2)) {
        return tagOpenBetween(code2);
      }
      return nok(code2);
    }
    function tagOpenBetween(code2) {
      if (code2 === 47) {
        effects.consume(code2);
        return end;
      }
      if (code2 === 58 || code2 === 95 || asciiAlpha(code2)) {
        effects.consume(code2);
        return tagOpenAttributeName;
      }
      if (markdownLineEnding(code2)) {
        returnState = tagOpenBetween;
        return lineEndingBefore(code2);
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return tagOpenBetween;
      }
      return end(code2);
    }
    function tagOpenAttributeName(code2) {
      if (code2 === 45 || code2 === 46 || code2 === 58 || code2 === 95 || asciiAlphanumeric(code2)) {
        effects.consume(code2);
        return tagOpenAttributeName;
      }
      return tagOpenAttributeNameAfter(code2);
    }
    function tagOpenAttributeNameAfter(code2) {
      if (code2 === 61) {
        effects.consume(code2);
        return tagOpenAttributeValueBefore;
      }
      if (markdownLineEnding(code2)) {
        returnState = tagOpenAttributeNameAfter;
        return lineEndingBefore(code2);
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return tagOpenAttributeNameAfter;
      }
      return tagOpenBetween(code2);
    }
    function tagOpenAttributeValueBefore(code2) {
      if (code2 === null || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96) {
        return nok(code2);
      }
      if (code2 === 34 || code2 === 39) {
        effects.consume(code2);
        marker = code2;
        return tagOpenAttributeValueQuoted;
      }
      if (markdownLineEnding(code2)) {
        returnState = tagOpenAttributeValueBefore;
        return lineEndingBefore(code2);
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return tagOpenAttributeValueBefore;
      }
      effects.consume(code2);
      return tagOpenAttributeValueUnquoted;
    }
    function tagOpenAttributeValueQuoted(code2) {
      if (code2 === marker) {
        effects.consume(code2);
        marker = void 0;
        return tagOpenAttributeValueQuotedAfter;
      }
      if (code2 === null) {
        return nok(code2);
      }
      if (markdownLineEnding(code2)) {
        returnState = tagOpenAttributeValueQuoted;
        return lineEndingBefore(code2);
      }
      effects.consume(code2);
      return tagOpenAttributeValueQuoted;
    }
    function tagOpenAttributeValueUnquoted(code2) {
      if (code2 === null || code2 === 34 || code2 === 39 || code2 === 60 || code2 === 61 || code2 === 96) {
        return nok(code2);
      }
      if (code2 === 47 || code2 === 62 || markdownLineEndingOrSpace(code2)) {
        return tagOpenBetween(code2);
      }
      effects.consume(code2);
      return tagOpenAttributeValueUnquoted;
    }
    function tagOpenAttributeValueQuotedAfter(code2) {
      if (code2 === 47 || code2 === 62 || markdownLineEndingOrSpace(code2)) {
        return tagOpenBetween(code2);
      }
      return nok(code2);
    }
    function end(code2) {
      if (code2 === 62) {
        effects.consume(code2);
        effects.exit("htmlTextData");
        effects.exit("htmlText");
        return ok2;
      }
      return nok(code2);
    }
    function lineEndingBefore(code2) {
      effects.exit("htmlTextData");
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return lineEndingAfter;
    }
    function lineEndingAfter(code2) {
      return markdownSpace(code2) ? factorySpace(effects, lineEndingAfterPrefix, "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code2) : lineEndingAfterPrefix(code2);
    }
    function lineEndingAfterPrefix(code2) {
      effects.enter("htmlTextData");
      return returnState(code2);
    }
  }
  const labelEnd = {
    name: "labelEnd",
    resolveAll: resolveAllLabelEnd,
    resolveTo: resolveToLabelEnd,
    tokenize: tokenizeLabelEnd
  };
  const resourceConstruct = {
    tokenize: tokenizeResource
  };
  const referenceFullConstruct = {
    tokenize: tokenizeReferenceFull
  };
  const referenceCollapsedConstruct = {
    tokenize: tokenizeReferenceCollapsed
  };
  function resolveAllLabelEnd(events) {
    let index2 = -1;
    const newEvents = [];
    while (++index2 < events.length) {
      const token = events[index2][1];
      newEvents.push(events[index2]);
      if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
        const offset2 = token.type === "labelImage" ? 4 : 2;
        token.type = "data";
        index2 += offset2;
      }
    }
    if (events.length !== newEvents.length) {
      splice(events, 0, events.length, newEvents);
    }
    return events;
  }
  function resolveToLabelEnd(events, context) {
    let index2 = events.length;
    let offset2 = 0;
    let token;
    let open;
    let close;
    let media;
    while (index2--) {
      token = events[index2][1];
      if (open) {
        if (token.type === "link" || token.type === "labelLink" && token._inactive) {
          break;
        }
        if (events[index2][0] === "enter" && token.type === "labelLink") {
          token._inactive = true;
        }
      } else if (close) {
        if (events[index2][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
          open = index2;
          if (token.type !== "labelLink") {
            offset2 = 2;
            break;
          }
        }
      } else if (token.type === "labelEnd") {
        close = index2;
      }
    }
    const group = {
      type: events[open][1].type === "labelLink" ? "link" : "image",
      start: {
        ...events[open][1].start
      },
      end: {
        ...events[events.length - 1][1].end
      }
    };
    const label = {
      type: "label",
      start: {
        ...events[open][1].start
      },
      end: {
        ...events[close][1].end
      }
    };
    const text2 = {
      type: "labelText",
      start: {
        ...events[open + offset2 + 2][1].end
      },
      end: {
        ...events[close - 2][1].start
      }
    };
    media = [["enter", group, context], ["enter", label, context]];
    media = push(media, events.slice(open + 1, open + offset2 + 3));
    media = push(media, [["enter", text2, context]]);
    media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset2 + 4, close - 3), context));
    media = push(media, [["exit", text2, context], events[close - 2], events[close - 1], ["exit", label, context]]);
    media = push(media, events.slice(close + 1));
    media = push(media, [["exit", group, context]]);
    splice(events, open, events.length, media);
    return events;
  }
  function tokenizeLabelEnd(effects, ok2, nok) {
    const self2 = this;
    let index2 = self2.events.length;
    let labelStart;
    let defined;
    while (index2--) {
      if ((self2.events[index2][1].type === "labelImage" || self2.events[index2][1].type === "labelLink") && !self2.events[index2][1]._balanced) {
        labelStart = self2.events[index2][1];
        break;
      }
    }
    return start;
    function start(code2) {
      if (!labelStart) {
        return nok(code2);
      }
      if (labelStart._inactive) {
        return labelEndNok(code2);
      }
      defined = self2.parser.defined.includes(normalizeIdentifier(self2.sliceSerialize({
        start: labelStart.end,
        end: self2.now()
      })));
      effects.enter("labelEnd");
      effects.enter("labelMarker");
      effects.consume(code2);
      effects.exit("labelMarker");
      effects.exit("labelEnd");
      return after;
    }
    function after(code2) {
      if (code2 === 40) {
        return effects.attempt(resourceConstruct, labelEndOk, defined ? labelEndOk : labelEndNok)(code2);
      }
      if (code2 === 91) {
        return effects.attempt(referenceFullConstruct, labelEndOk, defined ? referenceNotFull : labelEndNok)(code2);
      }
      return defined ? labelEndOk(code2) : labelEndNok(code2);
    }
    function referenceNotFull(code2) {
      return effects.attempt(referenceCollapsedConstruct, labelEndOk, labelEndNok)(code2);
    }
    function labelEndOk(code2) {
      return ok2(code2);
    }
    function labelEndNok(code2) {
      labelStart._balanced = true;
      return nok(code2);
    }
  }
  function tokenizeResource(effects, ok2, nok) {
    return resourceStart;
    function resourceStart(code2) {
      effects.enter("resource");
      effects.enter("resourceMarker");
      effects.consume(code2);
      effects.exit("resourceMarker");
      return resourceBefore;
    }
    function resourceBefore(code2) {
      return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, resourceOpen)(code2) : resourceOpen(code2);
    }
    function resourceOpen(code2) {
      if (code2 === 41) {
        return resourceEnd(code2);
      }
      return factoryDestination(effects, resourceDestinationAfter, resourceDestinationMissing, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code2);
    }
    function resourceDestinationAfter(code2) {
      return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, resourceBetween)(code2) : resourceEnd(code2);
    }
    function resourceDestinationMissing(code2) {
      return nok(code2);
    }
    function resourceBetween(code2) {
      if (code2 === 34 || code2 === 39 || code2 === 40) {
        return factoryTitle(effects, resourceTitleAfter, nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code2);
      }
      return resourceEnd(code2);
    }
    function resourceTitleAfter(code2) {
      return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, resourceEnd)(code2) : resourceEnd(code2);
    }
    function resourceEnd(code2) {
      if (code2 === 41) {
        effects.enter("resourceMarker");
        effects.consume(code2);
        effects.exit("resourceMarker");
        effects.exit("resource");
        return ok2;
      }
      return nok(code2);
    }
  }
  function tokenizeReferenceFull(effects, ok2, nok) {
    const self2 = this;
    return referenceFull;
    function referenceFull(code2) {
      return factoryLabel.call(self2, effects, referenceFullAfter, referenceFullMissing, "reference", "referenceMarker", "referenceString")(code2);
    }
    function referenceFullAfter(code2) {
      return self2.parser.defined.includes(normalizeIdentifier(self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1))) ? ok2(code2) : nok(code2);
    }
    function referenceFullMissing(code2) {
      return nok(code2);
    }
  }
  function tokenizeReferenceCollapsed(effects, ok2, nok) {
    return referenceCollapsedStart;
    function referenceCollapsedStart(code2) {
      effects.enter("reference");
      effects.enter("referenceMarker");
      effects.consume(code2);
      effects.exit("referenceMarker");
      return referenceCollapsedOpen;
    }
    function referenceCollapsedOpen(code2) {
      if (code2 === 93) {
        effects.enter("referenceMarker");
        effects.consume(code2);
        effects.exit("referenceMarker");
        effects.exit("reference");
        return ok2;
      }
      return nok(code2);
    }
  }
  const labelStartImage = {
    name: "labelStartImage",
    resolveAll: labelEnd.resolveAll,
    tokenize: tokenizeLabelStartImage
  };
  function tokenizeLabelStartImage(effects, ok2, nok) {
    const self2 = this;
    return start;
    function start(code2) {
      effects.enter("labelImage");
      effects.enter("labelImageMarker");
      effects.consume(code2);
      effects.exit("labelImageMarker");
      return open;
    }
    function open(code2) {
      if (code2 === 91) {
        effects.enter("labelMarker");
        effects.consume(code2);
        effects.exit("labelMarker");
        effects.exit("labelImage");
        return after;
      }
      return nok(code2);
    }
    function after(code2) {
      return code2 === 94 && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code2) : ok2(code2);
    }
  }
  const labelStartLink = {
    name: "labelStartLink",
    resolveAll: labelEnd.resolveAll,
    tokenize: tokenizeLabelStartLink
  };
  function tokenizeLabelStartLink(effects, ok2, nok) {
    const self2 = this;
    return start;
    function start(code2) {
      effects.enter("labelLink");
      effects.enter("labelMarker");
      effects.consume(code2);
      effects.exit("labelMarker");
      effects.exit("labelLink");
      return after;
    }
    function after(code2) {
      return code2 === 94 && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code2) : ok2(code2);
    }
  }
  const lineEnding = {
    name: "lineEnding",
    tokenize: tokenizeLineEnding
  };
  function tokenizeLineEnding(effects, ok2) {
    return start;
    function start(code2) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return factorySpace(effects, ok2, "linePrefix");
    }
  }
  const thematicBreak$2 = {
    name: "thematicBreak",
    tokenize: tokenizeThematicBreak
  };
  function tokenizeThematicBreak(effects, ok2, nok) {
    let size2 = 0;
    let marker;
    return start;
    function start(code2) {
      effects.enter("thematicBreak");
      return before(code2);
    }
    function before(code2) {
      marker = code2;
      return atBreak(code2);
    }
    function atBreak(code2) {
      if (code2 === marker) {
        effects.enter("thematicBreakSequence");
        return sequence(code2);
      }
      if (size2 >= 3 && (code2 === null || markdownLineEnding(code2))) {
        effects.exit("thematicBreak");
        return ok2(code2);
      }
      return nok(code2);
    }
    function sequence(code2) {
      if (code2 === marker) {
        effects.consume(code2);
        size2++;
        return sequence;
      }
      effects.exit("thematicBreakSequence");
      return markdownSpace(code2) ? factorySpace(effects, atBreak, "whitespace")(code2) : atBreak(code2);
    }
  }
  const list$3 = {
    continuation: {
      tokenize: tokenizeListContinuation
    },
    exit: tokenizeListEnd,
    name: "list",
    tokenize: tokenizeListStart
  };
  const listItemPrefixWhitespaceConstruct = {
    partial: true,
    tokenize: tokenizeListItemPrefixWhitespace
  };
  const indentConstruct = {
    partial: true,
    tokenize: tokenizeIndent$1
  };
  function tokenizeListStart(effects, ok2, nok) {
    const self2 = this;
    const tail = self2.events[self2.events.length - 1];
    let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
    let size2 = 0;
    return start;
    function start(code2) {
      const kind = self2.containerState.type || (code2 === 42 || code2 === 43 || code2 === 45 ? "listUnordered" : "listOrdered");
      if (kind === "listUnordered" ? !self2.containerState.marker || code2 === self2.containerState.marker : asciiDigit(code2)) {
        if (!self2.containerState.type) {
          self2.containerState.type = kind;
          effects.enter(kind, {
            _container: true
          });
        }
        if (kind === "listUnordered") {
          effects.enter("listItemPrefix");
          return code2 === 42 || code2 === 45 ? effects.check(thematicBreak$2, nok, atMarker)(code2) : atMarker(code2);
        }
        if (!self2.interrupt || code2 === 49) {
          effects.enter("listItemPrefix");
          effects.enter("listItemValue");
          return inside(code2);
        }
      }
      return nok(code2);
    }
    function inside(code2) {
      if (asciiDigit(code2) && ++size2 < 10) {
        effects.consume(code2);
        return inside;
      }
      if ((!self2.interrupt || size2 < 2) && (self2.containerState.marker ? code2 === self2.containerState.marker : code2 === 41 || code2 === 46)) {
        effects.exit("listItemValue");
        return atMarker(code2);
      }
      return nok(code2);
    }
    function atMarker(code2) {
      effects.enter("listItemMarker");
      effects.consume(code2);
      effects.exit("listItemMarker");
      self2.containerState.marker = self2.containerState.marker || code2;
      return effects.check(
        blankLine,
self2.interrupt ? nok : onBlank,
        effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix)
      );
    }
    function onBlank(code2) {
      self2.containerState.initialBlankLine = true;
      initialSize++;
      return endOfPrefix(code2);
    }
    function otherPrefix(code2) {
      if (markdownSpace(code2)) {
        effects.enter("listItemPrefixWhitespace");
        effects.consume(code2);
        effects.exit("listItemPrefixWhitespace");
        return endOfPrefix;
      }
      return nok(code2);
    }
    function endOfPrefix(code2) {
      self2.containerState.size = initialSize + self2.sliceSerialize(effects.exit("listItemPrefix"), true).length;
      return ok2(code2);
    }
  }
  function tokenizeListContinuation(effects, ok2, nok) {
    const self2 = this;
    self2.containerState._closeFlow = void 0;
    return effects.check(blankLine, onBlank, notBlank);
    function onBlank(code2) {
      self2.containerState.furtherBlankLines = self2.containerState.furtherBlankLines || self2.containerState.initialBlankLine;
      return factorySpace(effects, ok2, "listItemIndent", self2.containerState.size + 1)(code2);
    }
    function notBlank(code2) {
      if (self2.containerState.furtherBlankLines || !markdownSpace(code2)) {
        self2.containerState.furtherBlankLines = void 0;
        self2.containerState.initialBlankLine = void 0;
        return notInCurrentItem(code2);
      }
      self2.containerState.furtherBlankLines = void 0;
      self2.containerState.initialBlankLine = void 0;
      return effects.attempt(indentConstruct, ok2, notInCurrentItem)(code2);
    }
    function notInCurrentItem(code2) {
      self2.containerState._closeFlow = true;
      self2.interrupt = void 0;
      return factorySpace(effects, effects.attempt(list$3, ok2, nok), "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code2);
    }
  }
  function tokenizeIndent$1(effects, ok2, nok) {
    const self2 = this;
    return factorySpace(effects, afterPrefix, "listItemIndent", self2.containerState.size + 1);
    function afterPrefix(code2) {
      const tail = self2.events[self2.events.length - 1];
      return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self2.containerState.size ? ok2(code2) : nok(code2);
    }
  }
  function tokenizeListEnd(effects) {
    effects.exit(this.containerState.type);
  }
  function tokenizeListItemPrefixWhitespace(effects, ok2, nok) {
    const self2 = this;
    return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1);
    function afterPrefix(code2) {
      const tail = self2.events[self2.events.length - 1];
      return !markdownSpace(code2) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok2(code2) : nok(code2);
    }
  }
  const setextUnderline = {
    name: "setextUnderline",
    resolveTo: resolveToSetextUnderline,
    tokenize: tokenizeSetextUnderline
  };
  function resolveToSetextUnderline(events, context) {
    let index2 = events.length;
    let content2;
    let text2;
    let definition2;
    while (index2--) {
      if (events[index2][0] === "enter") {
        if (events[index2][1].type === "content") {
          content2 = index2;
          break;
        }
        if (events[index2][1].type === "paragraph") {
          text2 = index2;
        }
      } else {
        if (events[index2][1].type === "content") {
          events.splice(index2, 1);
        }
        if (!definition2 && events[index2][1].type === "definition") {
          definition2 = index2;
        }
      }
    }
    const heading2 = {
      type: "setextHeading",
      start: {
        ...events[content2][1].start
      },
      end: {
        ...events[events.length - 1][1].end
      }
    };
    events[text2][1].type = "setextHeadingText";
    if (definition2) {
      events.splice(text2, 0, ["enter", heading2, context]);
      events.splice(definition2 + 1, 0, ["exit", events[content2][1], context]);
      events[content2][1].end = {
        ...events[definition2][1].end
      };
    } else {
      events[content2][1] = heading2;
    }
    events.push(["exit", heading2, context]);
    return events;
  }
  function tokenizeSetextUnderline(effects, ok2, nok) {
    const self2 = this;
    let marker;
    return start;
    function start(code2) {
      let index2 = self2.events.length;
      let paragraph2;
      while (index2--) {
        if (self2.events[index2][1].type !== "lineEnding" && self2.events[index2][1].type !== "linePrefix" && self2.events[index2][1].type !== "content") {
          paragraph2 = self2.events[index2][1].type === "paragraph";
          break;
        }
      }
      if (!self2.parser.lazy[self2.now().line] && (self2.interrupt || paragraph2)) {
        effects.enter("setextHeadingLine");
        marker = code2;
        return before(code2);
      }
      return nok(code2);
    }
    function before(code2) {
      effects.enter("setextHeadingLineSequence");
      return inside(code2);
    }
    function inside(code2) {
      if (code2 === marker) {
        effects.consume(code2);
        return inside;
      }
      effects.exit("setextHeadingLineSequence");
      return markdownSpace(code2) ? factorySpace(effects, after, "lineSuffix")(code2) : after(code2);
    }
    function after(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("setextHeadingLine");
        return ok2(code2);
      }
      return nok(code2);
    }
  }
  const flow$1 = {
    tokenize: initializeFlow
  };
  function initializeFlow(effects) {
    const self2 = this;
    const initial = effects.attempt(
blankLine,
      atBlankEnding,
effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content, afterConstruct)), "linePrefix"))
    );
    return initial;
    function atBlankEnding(code2) {
      if (code2 === null) {
        effects.consume(code2);
        return;
      }
      effects.enter("lineEndingBlank");
      effects.consume(code2);
      effects.exit("lineEndingBlank");
      self2.currentConstruct = void 0;
      return initial;
    }
    function afterConstruct(code2) {
      if (code2 === null) {
        effects.consume(code2);
        return;
      }
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      self2.currentConstruct = void 0;
      return initial;
    }
  }
  const resolver = {
    resolveAll: createResolver()
  };
  const string$1 = initializeFactory("string");
  const text$4 = initializeFactory("text");
  function initializeFactory(field) {
    return {
      resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0),
      tokenize: initializeText
    };
    function initializeText(effects) {
      const self2 = this;
      const constructs2 = this.parser.constructs[field];
      const text2 = effects.attempt(constructs2, start, notText);
      return start;
      function start(code2) {
        return atBreak(code2) ? text2(code2) : notText(code2);
      }
      function notText(code2) {
        if (code2 === null) {
          effects.consume(code2);
          return;
        }
        effects.enter("data");
        effects.consume(code2);
        return data;
      }
      function data(code2) {
        if (atBreak(code2)) {
          effects.exit("data");
          return text2(code2);
        }
        effects.consume(code2);
        return data;
      }
      function atBreak(code2) {
        if (code2 === null) {
          return true;
        }
        const list2 = constructs2[code2];
        let index2 = -1;
        if (list2) {
          while (++index2 < list2.length) {
            const item = list2[index2];
            if (!item.previous || item.previous.call(self2, self2.previous)) {
              return true;
            }
          }
        }
        return false;
      }
    }
  }
  function createResolver(extraResolver) {
    return resolveAllText;
    function resolveAllText(events, context) {
      let index2 = -1;
      let enter;
      while (++index2 <= events.length) {
        if (enter === void 0) {
          if (events[index2] && events[index2][1].type === "data") {
            enter = index2;
            index2++;
          }
        } else if (!events[index2] || events[index2][1].type !== "data") {
          if (index2 !== enter + 2) {
            events[enter][1].end = events[index2 - 1][1].end;
            events.splice(enter + 2, index2 - enter - 2);
            index2 = enter + 2;
          }
          enter = void 0;
        }
      }
      return extraResolver ? extraResolver(events, context) : events;
    }
  }
  function resolveAllLineSuffixes(events, context) {
    let eventIndex = 0;
    while (++eventIndex <= events.length) {
      if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
        const data = events[eventIndex - 1][1];
        const chunks = context.sliceStream(data);
        let index2 = chunks.length;
        let bufferIndex = -1;
        let size2 = 0;
        let tabs;
        while (index2--) {
          const chunk = chunks[index2];
          if (typeof chunk === "string") {
            bufferIndex = chunk.length;
            while (chunk.charCodeAt(bufferIndex - 1) === 32) {
              size2++;
              bufferIndex--;
            }
            if (bufferIndex) break;
            bufferIndex = -1;
          } else if (chunk === -2) {
            tabs = true;
            size2++;
          } else if (chunk === -1) ;
          else {
            index2++;
            break;
          }
        }
        if (context._contentTypeTextTrailing && eventIndex === events.length) {
          size2 = 0;
        }
        if (size2) {
          const token = {
            type: eventIndex === events.length || tabs || size2 < 2 ? "lineSuffix" : "hardBreakTrailing",
            start: {
              _bufferIndex: index2 ? bufferIndex : data.start._bufferIndex + bufferIndex,
              _index: data.start._index + index2,
              line: data.end.line,
              column: data.end.column - size2,
              offset: data.end.offset - size2
            },
            end: {
              ...data.end
            }
          };
          data.end = {
            ...token.start
          };
          if (data.start.offset === data.end.offset) {
            Object.assign(data, token);
          } else {
            events.splice(eventIndex, 0, ["enter", token, context], ["exit", token, context]);
            eventIndex += 2;
          }
        }
        eventIndex++;
      }
    }
    return events;
  }
  const document$1 = {
    [42]: list$3,
    [43]: list$3,
    [45]: list$3,
    [48]: list$3,
    [49]: list$3,
    [50]: list$3,
    [51]: list$3,
    [52]: list$3,
    [53]: list$3,
    [54]: list$3,
    [55]: list$3,
    [56]: list$3,
    [57]: list$3,
    [62]: blockQuote
  };
  const contentInitial = {
    [91]: definition$1
  };
  const flowInitial = {
    [-2]: codeIndented,
    [-1]: codeIndented,
    [32]: codeIndented
  };
  const flow = {
    [35]: headingAtx,
    [42]: thematicBreak$2,
    [45]: [setextUnderline, thematicBreak$2],
    [60]: htmlFlow,
    [61]: setextUnderline,
    [95]: thematicBreak$2,
    [96]: codeFenced,
    [126]: codeFenced
  };
  const string = {
    [38]: characterReference,
    [92]: characterEscape
  };
  const text$3 = {
    [-5]: lineEnding,
    [-4]: lineEnding,
    [-3]: lineEnding,
    [33]: labelStartImage,
    [38]: characterReference,
    [42]: attention,
    [60]: [autolink, htmlText],
    [91]: labelStartLink,
    [92]: [hardBreakEscape, characterEscape],
    [93]: labelEnd,
    [95]: attention,
    [96]: codeText
  };
  const insideSpan = {
    null: [attention, resolver]
  };
  const attentionMarkers = {
    null: [42, 95]
  };
  const disable = {
    null: []
  };
  const defaultConstructs = Object.freeze( Object.defineProperty({
    __proto__: null,
    attentionMarkers,
    contentInitial,
    disable,
    document: document$1,
    flow,
    flowInitial,
    insideSpan,
    string,
    text: text$3
  }, Symbol.toStringTag, { value: "Module" }));
  function createTokenizer(parser, initialize, from) {
    let point2 = {
      _bufferIndex: -1,
      _index: 0,
      line: from && from.line || 1,
      column: from && from.column || 1,
      offset: from && from.offset || 0
    };
    const columnStart = {};
    const resolveAllConstructs = [];
    let chunks = [];
    let stack = [];
    const effects = {
      attempt: constructFactory(onsuccessfulconstruct),
      check: constructFactory(onsuccessfulcheck),
      consume,
      enter,
      exit: exit2,
      interrupt: constructFactory(onsuccessfulcheck, {
        interrupt: true
      })
    };
    const context = {
      code: null,
      containerState: {},
      defineSkip,
      events: [],
      now,
      parser,
      previous: null,
      sliceSerialize,
      sliceStream,
      write
    };
    let state = initialize.tokenize.call(context, effects);
    if (initialize.resolveAll) {
      resolveAllConstructs.push(initialize);
    }
    return context;
    function write(slice) {
      chunks = push(chunks, slice);
      main2();
      if (chunks[chunks.length - 1] !== null) {
        return [];
      }
      addResult(initialize, 0);
      context.events = resolveAll(resolveAllConstructs, context.events, context);
      return context.events;
    }
    function sliceSerialize(token, expandTabs) {
      return serializeChunks(sliceStream(token), expandTabs);
    }
    function sliceStream(token) {
      return sliceChunks(chunks, token);
    }
    function now() {
      const {
        _bufferIndex,
        _index,
        line,
        column,
        offset: offset2
      } = point2;
      return {
        _bufferIndex,
        _index,
        line,
        column,
        offset: offset2
      };
    }
    function defineSkip(value) {
      columnStart[value.line] = value.column;
      accountForPotentialSkip();
    }
    function main2() {
      let chunkIndex;
      while (point2._index < chunks.length) {
        const chunk = chunks[point2._index];
        if (typeof chunk === "string") {
          chunkIndex = point2._index;
          if (point2._bufferIndex < 0) {
            point2._bufferIndex = 0;
          }
          while (point2._index === chunkIndex && point2._bufferIndex < chunk.length) {
            go(chunk.charCodeAt(point2._bufferIndex));
          }
        } else {
          go(chunk);
        }
      }
    }
    function go(code2) {
      state = state(code2);
    }
    function consume(code2) {
      if (markdownLineEnding(code2)) {
        point2.line++;
        point2.column = 1;
        point2.offset += code2 === -3 ? 2 : 1;
        accountForPotentialSkip();
      } else if (code2 !== -1) {
        point2.column++;
        point2.offset++;
      }
      if (point2._bufferIndex < 0) {
        point2._index++;
      } else {
        point2._bufferIndex++;
        if (point2._bufferIndex ===


chunks[point2._index].length) {
          point2._bufferIndex = -1;
          point2._index++;
        }
      }
      context.previous = code2;
    }
    function enter(type, fields) {
      const token = fields || {};
      token.type = type;
      token.start = now();
      context.events.push(["enter", token, context]);
      stack.push(token);
      return token;
    }
    function exit2(type) {
      const token = stack.pop();
      token.end = now();
      context.events.push(["exit", token, context]);
      return token;
    }
    function onsuccessfulconstruct(construct, info) {
      addResult(construct, info.from);
    }
    function onsuccessfulcheck(_2, info) {
      info.restore();
    }
    function constructFactory(onreturn, fields) {
      return hook;
      function hook(constructs2, returnState, bogusState) {
        let listOfConstructs;
        let constructIndex;
        let currentConstruct;
        let info;
        return Array.isArray(constructs2) ? (
handleListOfConstructs(constructs2)
        ) : "tokenize" in constructs2 ? (
handleListOfConstructs([
constructs2
          ])
        ) : handleMapOfConstructs(constructs2);
        function handleMapOfConstructs(map2) {
          return start;
          function start(code2) {
            const left = code2 !== null && map2[code2];
            const all2 = code2 !== null && map2.null;
            const list2 = [

...Array.isArray(left) ? left : left ? [left] : [],
              ...Array.isArray(all2) ? all2 : all2 ? [all2] : []
            ];
            return handleListOfConstructs(list2)(code2);
          }
        }
        function handleListOfConstructs(list2) {
          listOfConstructs = list2;
          constructIndex = 0;
          if (list2.length === 0) {
            return bogusState;
          }
          return handleConstruct(list2[constructIndex]);
        }
        function handleConstruct(construct) {
          return start;
          function start(code2) {
            info = store();
            currentConstruct = construct;
            if (!construct.partial) {
              context.currentConstruct = construct;
            }
            if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
              return nok();
            }
            return construct.tokenize.call(


fields ? Object.assign(Object.create(context), fields) : context,
              effects,
              ok2,
              nok
            )(code2);
          }
        }
        function ok2(code2) {
          onreturn(currentConstruct, info);
          return returnState;
        }
        function nok(code2) {
          info.restore();
          if (++constructIndex < listOfConstructs.length) {
            return handleConstruct(listOfConstructs[constructIndex]);
          }
          return bogusState;
        }
      }
    }
    function addResult(construct, from2) {
      if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
        resolveAllConstructs.push(construct);
      }
      if (construct.resolve) {
        splice(context.events, from2, context.events.length - from2, construct.resolve(context.events.slice(from2), context));
      }
      if (construct.resolveTo) {
        context.events = construct.resolveTo(context.events, context);
      }
    }
    function store() {
      const startPoint = now();
      const startPrevious = context.previous;
      const startCurrentConstruct = context.currentConstruct;
      const startEventsIndex = context.events.length;
      const startStack = Array.from(stack);
      return {
        from: startEventsIndex,
        restore
      };
      function restore() {
        point2 = startPoint;
        context.previous = startPrevious;
        context.currentConstruct = startCurrentConstruct;
        context.events.length = startEventsIndex;
        stack = startStack;
        accountForPotentialSkip();
      }
    }
    function accountForPotentialSkip() {
      if (point2.line in columnStart && point2.column < 2) {
        point2.column = columnStart[point2.line];
        point2.offset += columnStart[point2.line] - 1;
      }
    }
  }
  function sliceChunks(chunks, token) {
    const startIndex = token.start._index;
    const startBufferIndex = token.start._bufferIndex;
    const endIndex = token.end._index;
    const endBufferIndex = token.end._bufferIndex;
    let view;
    if (startIndex === endIndex) {
      view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
    } else {
      view = chunks.slice(startIndex, endIndex);
      if (startBufferIndex > -1) {
        const head2 = view[0];
        if (typeof head2 === "string") {
          view[0] = head2.slice(startBufferIndex);
        } else {
          view.shift();
        }
      }
      if (endBufferIndex > 0) {
        view.push(chunks[endIndex].slice(0, endBufferIndex));
      }
    }
    return view;
  }
  function serializeChunks(chunks, expandTabs) {
    let index2 = -1;
    const result = [];
    let atTab;
    while (++index2 < chunks.length) {
      const chunk = chunks[index2];
      let value;
      if (typeof chunk === "string") {
        value = chunk;
      } else switch (chunk) {
        case -5: {
          value = "\r";
          break;
        }
        case -4: {
          value = "\n";
          break;
        }
        case -3: {
          value = "\r\n";
          break;
        }
        case -2: {
          value = expandTabs ? " " : "	";
          break;
        }
        case -1: {
          if (!expandTabs && atTab) continue;
          value = " ";
          break;
        }
        default: {
          value = String.fromCharCode(chunk);
        }
      }
      atTab = chunk === -2;
      result.push(value);
    }
    return result.join("");
  }
  function parse$1(options) {
    const settings = options || {};
    const constructs2 = (
combineExtensions([defaultConstructs, ...settings.extensions || []])
    );
    const parser = {
      constructs: constructs2,
      content: create2(content$1),
      defined: [],
      document: create2(document$2),
      flow: create2(flow$1),
      lazy: {},
      string: create2(string$1),
      text: create2(text$4)
    };
    return parser;
    function create2(initial) {
      return creator;
      function creator(from) {
        return createTokenizer(parser, initial, from);
      }
    }
  }
  function postprocess(events) {
    while (!subtokenize(events)) {
    }
    return events;
  }
  const search = /[\0\t\n\r]/g;
  function preprocess() {
    let column = 1;
    let buffer = "";
    let start = true;
    let atCarriageReturn;
    return preprocessor;
    function preprocessor(value, encoding, end) {
      const chunks = [];
      let match;
      let next;
      let startPosition;
      let endPosition;
      let code2;
      value = buffer + (typeof value === "string" ? value.toString() : new TextDecoder(encoding || void 0).decode(value));
      startPosition = 0;
      buffer = "";
      if (start) {
        if (value.charCodeAt(0) === 65279) {
          startPosition++;
        }
        start = void 0;
      }
      while (startPosition < value.length) {
        search.lastIndex = startPosition;
        match = search.exec(value);
        endPosition = match && match.index !== void 0 ? match.index : value.length;
        code2 = value.charCodeAt(endPosition);
        if (!match) {
          buffer = value.slice(startPosition);
          break;
        }
        if (code2 === 10 && startPosition === endPosition && atCarriageReturn) {
          chunks.push(-3);
          atCarriageReturn = void 0;
        } else {
          if (atCarriageReturn) {
            chunks.push(-5);
            atCarriageReturn = void 0;
          }
          if (startPosition < endPosition) {
            chunks.push(value.slice(startPosition, endPosition));
            column += endPosition - startPosition;
          }
          switch (code2) {
            case 0: {
              chunks.push(65533);
              column++;
              break;
            }
            case 9: {
              next = Math.ceil(column / 4) * 4;
              chunks.push(-2);
              while (column++ < next) chunks.push(-1);
              break;
            }
            case 10: {
              chunks.push(-4);
              column = 1;
              break;
            }
            default: {
              atCarriageReturn = true;
              column = 1;
            }
          }
        }
        startPosition = endPosition + 1;
      }
      if (end) {
        if (atCarriageReturn) chunks.push(-5);
        if (buffer) chunks.push(buffer);
        chunks.push(null);
      }
      return chunks;
    }
  }
  const characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
  function decodeString(value) {
    return value.replace(characterEscapeOrReference, decode);
  }
  function decode($0, $1, $2) {
    if ($1) {
      return $1;
    }
    const head2 = $2.charCodeAt(0);
    if (head2 === 35) {
      const head3 = $2.charCodeAt(1);
      const hex = head3 === 120 || head3 === 88;
      return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
    }
    return decodeNamedCharacterReference($2) || $0;
  }
  function stringifyPosition(value) {
    if (!value || typeof value !== "object") {
      return "";
    }
    if ("position" in value || "type" in value) {
      return position$1(value.position);
    }
    if ("start" in value || "end" in value) {
      return position$1(value);
    }
    if ("line" in value || "column" in value) {
      return point$2(value);
    }
    return "";
  }
  function point$2(point2) {
    return index$1(point2 && point2.line) + ":" + index$1(point2 && point2.column);
  }
  function position$1(pos) {
    return point$2(pos && pos.start) + "-" + point$2(pos && pos.end);
  }
  function index$1(value) {
    return value && typeof value === "number" ? value : 1;
  }
  const own$2 = {}.hasOwnProperty;
  function fromMarkdown$1(value, encoding, options) {
    if (encoding && typeof encoding === "object") {
      options = encoding;
      encoding = void 0;
    }
    return compiler(options)(postprocess(parse$1(options).document().write(preprocess()(value, encoding, true))));
  }
  function compiler(options) {
    const config = {
      transforms: [],
      canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
      enter: {
        autolink: opener(link2),
        autolinkProtocol: onenterdata,
        autolinkEmail: onenterdata,
        atxHeading: opener(heading2),
        blockQuote: opener(blockQuote2),
        characterEscape: onenterdata,
        characterReference: onenterdata,
        codeFenced: opener(codeFlow),
        codeFencedFenceInfo: buffer,
        codeFencedFenceMeta: buffer,
        codeIndented: opener(codeFlow, buffer),
        codeText: opener(codeText2, buffer),
        codeTextData: onenterdata,
        data: onenterdata,
        codeFlowValue: onenterdata,
        definition: opener(definition2),
        definitionDestinationString: buffer,
        definitionLabelString: buffer,
        definitionTitleString: buffer,
        emphasis: opener(emphasis2),
        hardBreakEscape: opener(hardBreak2),
        hardBreakTrailing: opener(hardBreak2),
        htmlFlow: opener(html2, buffer),
        htmlFlowData: onenterdata,
        htmlText: opener(html2, buffer),
        htmlTextData: onenterdata,
        image: opener(image2),
        label: buffer,
        link: opener(link2),
        listItem: opener(listItem2),
        listItemValue: onenterlistitemvalue,
        listOrdered: opener(list2, onenterlistordered),
        listUnordered: opener(list2),
        paragraph: opener(paragraph2),
        reference: onenterreference,
        referenceString: buffer,
        resourceDestinationString: buffer,
        resourceTitleString: buffer,
        setextHeading: opener(heading2),
        strong: opener(strong2),
        thematicBreak: opener(thematicBreak2)
      },
      exit: {
        atxHeading: closer(),
        atxHeadingSequence: onexitatxheadingsequence,
        autolink: closer(),
        autolinkEmail: onexitautolinkemail,
        autolinkProtocol: onexitautolinkprotocol,
        blockQuote: closer(),
        characterEscapeValue: onexitdata,
        characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
        characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
        characterReferenceValue: onexitcharacterreferencevalue,
        characterReference: onexitcharacterreference,
        codeFenced: closer(onexitcodefenced),
        codeFencedFence: onexitcodefencedfence,
        codeFencedFenceInfo: onexitcodefencedfenceinfo,
        codeFencedFenceMeta: onexitcodefencedfencemeta,
        codeFlowValue: onexitdata,
        codeIndented: closer(onexitcodeindented),
        codeText: closer(onexitcodetext),
        codeTextData: onexitdata,
        data: onexitdata,
        definition: closer(),
        definitionDestinationString: onexitdefinitiondestinationstring,
        definitionLabelString: onexitdefinitionlabelstring,
        definitionTitleString: onexitdefinitiontitlestring,
        emphasis: closer(),
        hardBreakEscape: closer(onexithardbreak),
        hardBreakTrailing: closer(onexithardbreak),
        htmlFlow: closer(onexithtmlflow),
        htmlFlowData: onexitdata,
        htmlText: closer(onexithtmltext),
        htmlTextData: onexitdata,
        image: closer(onexitimage),
        label: onexitlabel,
        labelText: onexitlabeltext,
        lineEnding: onexitlineending,
        link: closer(onexitlink),
        listItem: closer(),
        listOrdered: closer(),
        listUnordered: closer(),
        paragraph: closer(),
        referenceString: onexitreferencestring,
        resourceDestinationString: onexitresourcedestinationstring,
        resourceTitleString: onexitresourcetitlestring,
        resource: onexitresource,
        setextHeading: closer(onexitsetextheading),
        setextHeadingLineSequence: onexitsetextheadinglinesequence,
        setextHeadingText: onexitsetextheadingtext,
        strong: closer(),
        thematicBreak: closer()
      }
    };
    configure$1(config, (options || {}).mdastExtensions || []);
    const data = {};
    return compile;
    function compile(events) {
      let tree = {
        type: "root",
        children: []
      };
      const context = {
        stack: [tree],
        tokenStack: [],
        config,
        enter,
        exit: exit2,
        buffer,
        resume,
        data
      };
      const listStack = [];
      let index2 = -1;
      while (++index2 < events.length) {
        if (events[index2][1].type === "listOrdered" || events[index2][1].type === "listUnordered") {
          if (events[index2][0] === "enter") {
            listStack.push(index2);
          } else {
            const tail = listStack.pop();
            index2 = prepareList(events, tail, index2);
          }
        }
      }
      index2 = -1;
      while (++index2 < events.length) {
        const handler = config[events[index2][0]];
        if (own$2.call(handler, events[index2][1].type)) {
          handler[events[index2][1].type].call(Object.assign({
            sliceSerialize: events[index2][2].sliceSerialize
          }, context), events[index2][1]);
        }
      }
      if (context.tokenStack.length > 0) {
        const tail = context.tokenStack[context.tokenStack.length - 1];
        const handler = tail[1] || defaultOnError;
        handler.call(context, void 0, tail[0]);
      }
      tree.position = {
        start: point$1(events.length > 0 ? events[0][1].start : {
          line: 1,
          column: 1,
          offset: 0
        }),
        end: point$1(events.length > 0 ? events[events.length - 2][1].end : {
          line: 1,
          column: 1,
          offset: 0
        })
      };
      index2 = -1;
      while (++index2 < config.transforms.length) {
        tree = config.transforms[index2](tree) || tree;
      }
      return tree;
    }
    function prepareList(events, start, length) {
      let index2 = start - 1;
      let containerBalance = -1;
      let listSpread = false;
      let listItem3;
      let lineIndex;
      let firstBlankLineIndex;
      let atMarker;
      while (++index2 <= length) {
        const event = events[index2];
        switch (event[1].type) {
          case "listUnordered":
          case "listOrdered":
          case "blockQuote": {
            if (event[0] === "enter") {
              containerBalance++;
            } else {
              containerBalance--;
            }
            atMarker = void 0;
            break;
          }
          case "lineEndingBlank": {
            if (event[0] === "enter") {
              if (listItem3 && !atMarker && !containerBalance && !firstBlankLineIndex) {
                firstBlankLineIndex = index2;
              }
              atMarker = void 0;
            }
            break;
          }
          case "linePrefix":
          case "listItemValue":
          case "listItemMarker":
          case "listItemPrefix":
          case "listItemPrefixWhitespace": {
            break;
          }
          default: {
            atMarker = void 0;
          }
        }
        if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
          if (listItem3) {
            let tailIndex = index2;
            lineIndex = void 0;
            while (tailIndex--) {
              const tailEvent = events[tailIndex];
              if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
                if (tailEvent[0] === "exit") continue;
                if (lineIndex) {
                  events[lineIndex][1].type = "lineEndingBlank";
                  listSpread = true;
                }
                tailEvent[1].type = "lineEnding";
                lineIndex = tailIndex;
              } else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") ;
              else {
                break;
              }
            }
            if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
              listItem3._spread = true;
            }
            listItem3.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
            events.splice(lineIndex || index2, 0, ["exit", listItem3, event[2]]);
            index2++;
            length++;
          }
          if (event[1].type === "listItemPrefix") {
            const item = {
              type: "listItem",
              _spread: false,
              start: Object.assign({}, event[1].start),
end: void 0
            };
            listItem3 = item;
            events.splice(index2, 0, ["enter", item, event[2]]);
            index2++;
            length++;
            firstBlankLineIndex = void 0;
            atMarker = true;
          }
        }
      }
      events[start][1]._spread = listSpread;
      return length;
    }
    function opener(create2, and) {
      return open;
      function open(token) {
        enter.call(this, create2(token), token);
        if (and) and.call(this, token);
      }
    }
    function buffer() {
      this.stack.push({
        type: "fragment",
        children: []
      });
    }
    function enter(node2, token, errorHandler) {
      const parent = this.stack[this.stack.length - 1];
      const siblings2 = parent.children;
      siblings2.push(node2);
      this.stack.push(node2);
      this.tokenStack.push([token, errorHandler || void 0]);
      node2.position = {
        start: point$1(token.start),
end: void 0
      };
    }
    function closer(and) {
      return close;
      function close(token) {
        if (and) and.call(this, token);
        exit2.call(this, token);
      }
    }
    function exit2(token, onExitError) {
      const node2 = this.stack.pop();
      const open = this.tokenStack.pop();
      if (!open) {
        throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
          start: token.start,
          end: token.end
        }) + "): it’s not open");
      } else if (open[0].type !== token.type) {
        if (onExitError) {
          onExitError.call(this, token, open[0]);
        } else {
          const handler = open[1] || defaultOnError;
          handler.call(this, token, open[0]);
        }
      }
      node2.position.end = point$1(token.end);
    }
    function resume() {
      return toString$1(this.stack.pop());
    }
    function onenterlistordered() {
      this.data.expectingFirstListItemValue = true;
    }
    function onenterlistitemvalue(token) {
      if (this.data.expectingFirstListItemValue) {
        const ancestor = this.stack[this.stack.length - 2];
        ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
        this.data.expectingFirstListItemValue = void 0;
      }
    }
    function onexitcodefencedfenceinfo() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.lang = data2;
    }
    function onexitcodefencedfencemeta() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.meta = data2;
    }
    function onexitcodefencedfence() {
      if (this.data.flowCodeInside) return;
      this.buffer();
      this.data.flowCodeInside = true;
    }
    function onexitcodefenced() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.value = data2.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
      this.data.flowCodeInside = void 0;
    }
    function onexitcodeindented() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.value = data2.replace(/(\r?\n|\r)$/g, "");
    }
    function onexitdefinitionlabelstring(token) {
      const label = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.label = label;
      node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
    }
    function onexitdefinitiontitlestring() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.title = data2;
    }
    function onexitdefinitiondestinationstring() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.url = data2;
    }
    function onexitatxheadingsequence(token) {
      const node2 = this.stack[this.stack.length - 1];
      if (!node2.depth) {
        const depth = this.sliceSerialize(token).length;
        node2.depth = depth;
      }
    }
    function onexitsetextheadingtext() {
      this.data.setextHeadingSlurpLineEnding = true;
    }
    function onexitsetextheadinglinesequence(token) {
      const node2 = this.stack[this.stack.length - 1];
      node2.depth = this.sliceSerialize(token).codePointAt(0) === 61 ? 1 : 2;
    }
    function onexitsetextheading() {
      this.data.setextHeadingSlurpLineEnding = void 0;
    }
    function onenterdata(token) {
      const node2 = this.stack[this.stack.length - 1];
      const siblings2 = node2.children;
      let tail = siblings2[siblings2.length - 1];
      if (!tail || tail.type !== "text") {
        tail = text2();
        tail.position = {
          start: point$1(token.start),
end: void 0
        };
        siblings2.push(tail);
      }
      this.stack.push(tail);
    }
    function onexitdata(token) {
      const tail = this.stack.pop();
      tail.value += this.sliceSerialize(token);
      tail.position.end = point$1(token.end);
    }
    function onexitlineending(token) {
      const context = this.stack[this.stack.length - 1];
      if (this.data.atHardBreak) {
        const tail = context.children[context.children.length - 1];
        tail.position.end = point$1(token.end);
        this.data.atHardBreak = void 0;
        return;
      }
      if (!this.data.setextHeadingSlurpLineEnding && config.canContainEols.includes(context.type)) {
        onenterdata.call(this, token);
        onexitdata.call(this, token);
      }
    }
    function onexithardbreak() {
      this.data.atHardBreak = true;
    }
    function onexithtmlflow() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.value = data2;
    }
    function onexithtmltext() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.value = data2;
    }
    function onexitcodetext() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.value = data2;
    }
    function onexitlink() {
      const node2 = this.stack[this.stack.length - 1];
      if (this.data.inReference) {
        const referenceType = this.data.referenceType || "shortcut";
        node2.type += "Reference";
        node2.referenceType = referenceType;
        delete node2.url;
        delete node2.title;
      } else {
        delete node2.identifier;
        delete node2.label;
      }
      this.data.referenceType = void 0;
    }
    function onexitimage() {
      const node2 = this.stack[this.stack.length - 1];
      if (this.data.inReference) {
        const referenceType = this.data.referenceType || "shortcut";
        node2.type += "Reference";
        node2.referenceType = referenceType;
        delete node2.url;
        delete node2.title;
      } else {
        delete node2.identifier;
        delete node2.label;
      }
      this.data.referenceType = void 0;
    }
    function onexitlabeltext(token) {
      const string2 = this.sliceSerialize(token);
      const ancestor = this.stack[this.stack.length - 2];
      ancestor.label = decodeString(string2);
      ancestor.identifier = normalizeIdentifier(string2).toLowerCase();
    }
    function onexitlabel() {
      const fragment = this.stack[this.stack.length - 1];
      const value = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      this.data.inReference = true;
      if (node2.type === "link") {
        const children = fragment.children;
        node2.children = children;
      } else {
        node2.alt = value;
      }
    }
    function onexitresourcedestinationstring() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.url = data2;
    }
    function onexitresourcetitlestring() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.title = data2;
    }
    function onexitresource() {
      this.data.inReference = void 0;
    }
    function onenterreference() {
      this.data.referenceType = "collapsed";
    }
    function onexitreferencestring(token) {
      const label = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.label = label;
      node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
      this.data.referenceType = "full";
    }
    function onexitcharacterreferencemarker(token) {
      this.data.characterReferenceType = token.type;
    }
    function onexitcharacterreferencevalue(token) {
      const data2 = this.sliceSerialize(token);
      const type = this.data.characterReferenceType;
      let value;
      if (type) {
        value = decodeNumericCharacterReference(data2, type === "characterReferenceMarkerNumeric" ? 10 : 16);
        this.data.characterReferenceType = void 0;
      } else {
        const result = decodeNamedCharacterReference(data2);
        value = result;
      }
      const tail = this.stack[this.stack.length - 1];
      tail.value += value;
    }
    function onexitcharacterreference(token) {
      const tail = this.stack.pop();
      tail.position.end = point$1(token.end);
    }
    function onexitautolinkprotocol(token) {
      onexitdata.call(this, token);
      const node2 = this.stack[this.stack.length - 1];
      node2.url = this.sliceSerialize(token);
    }
    function onexitautolinkemail(token) {
      onexitdata.call(this, token);
      const node2 = this.stack[this.stack.length - 1];
      node2.url = "mailto:" + this.sliceSerialize(token);
    }
    function blockQuote2() {
      return {
        type: "blockquote",
        children: []
      };
    }
    function codeFlow() {
      return {
        type: "code",
        lang: null,
        meta: null,
        value: ""
      };
    }
    function codeText2() {
      return {
        type: "inlineCode",
        value: ""
      };
    }
    function definition2() {
      return {
        type: "definition",
        identifier: "",
        label: null,
        title: null,
        url: ""
      };
    }
    function emphasis2() {
      return {
        type: "emphasis",
        children: []
      };
    }
    function heading2() {
      return {
        type: "heading",
depth: 0,
        children: []
      };
    }
    function hardBreak2() {
      return {
        type: "break"
      };
    }
    function html2() {
      return {
        type: "html",
        value: ""
      };
    }
    function image2() {
      return {
        type: "image",
        title: null,
        url: "",
        alt: null
      };
    }
    function link2() {
      return {
        type: "link",
        title: null,
        url: "",
        children: []
      };
    }
    function list2(token) {
      return {
        type: "list",
        ordered: token.type === "listOrdered",
        start: null,
        spread: token._spread,
        children: []
      };
    }
    function listItem2(token) {
      return {
        type: "listItem",
        spread: token._spread,
        checked: null,
        children: []
      };
    }
    function paragraph2() {
      return {
        type: "paragraph",
        children: []
      };
    }
    function strong2() {
      return {
        type: "strong",
        children: []
      };
    }
    function text2() {
      return {
        type: "text",
        value: ""
      };
    }
    function thematicBreak2() {
      return {
        type: "thematicBreak"
      };
    }
  }
  function point$1(d2) {
    return {
      line: d2.line,
      column: d2.column,
      offset: d2.offset
    };
  }
  function configure$1(combined, extensions) {
    let index2 = -1;
    while (++index2 < extensions.length) {
      const value = extensions[index2];
      if (Array.isArray(value)) {
        configure$1(combined, value);
      } else {
        extension(combined, value);
      }
    }
  }
  function extension(combined, extension2) {
    let key2;
    for (key2 in extension2) {
      if (own$2.call(extension2, key2)) {
        switch (key2) {
          case "canContainEols": {
            const right = extension2[key2];
            if (right) {
              combined[key2].push(...right);
            }
            break;
          }
          case "transforms": {
            const right = extension2[key2];
            if (right) {
              combined[key2].push(...right);
            }
            break;
          }
          case "enter":
          case "exit": {
            const right = extension2[key2];
            if (right) {
              Object.assign(combined[key2], right);
            }
            break;
          }
        }
      }
    }
  }
  function defaultOnError(left, right) {
    if (left) {
      throw new Error("Cannot close `" + left.type + "` (" + stringifyPosition({
        start: left.start,
        end: left.end
      }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is open");
    } else {
      throw new Error("Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is still open");
    }
  }
  function ok$1() {
  }
  function escapeStringRegexp(string2) {
    if (typeof string2 !== "string") {
      throw new TypeError("Expected a string");
    }
    return string2.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }
  const convert = (


(function(test) {
      if (test === null || test === void 0) {
        return ok;
      }
      if (typeof test === "function") {
        return castFactory(test);
      }
      if (typeof test === "object") {
        return Array.isArray(test) ? anyFactory(test) : (

propertiesFactory(
test
          )
        );
      }
      if (typeof test === "string") {
        return typeFactory(test);
      }
      throw new Error("Expected function, string, or object as test");
    })
  );
  function anyFactory(tests) {
    const checks2 = [];
    let index2 = -1;
    while (++index2 < tests.length) {
      checks2[index2] = convert(tests[index2]);
    }
    return castFactory(any);
    function any(...parameters) {
      let index3 = -1;
      while (++index3 < checks2.length) {
        if (checks2[index3].apply(this, parameters)) return true;
      }
      return false;
    }
  }
  function propertiesFactory(check) {
    const checkAsRecord = (
check
    );
    return castFactory(all2);
    function all2(node2) {
      const nodeAsRecord = (

node2
      );
      let key2;
      for (key2 in check) {
        if (nodeAsRecord[key2] !== checkAsRecord[key2]) return false;
      }
      return true;
    }
  }
  function typeFactory(check) {
    return castFactory(type);
    function type(node2) {
      return node2 && node2.type === check;
    }
  }
  function castFactory(testFunction) {
    return check;
    function check(value, index2, parent) {
      return Boolean(
        looksLikeANode(value) && testFunction.call(
          this,
          value,
          typeof index2 === "number" ? index2 : void 0,
          parent || void 0
        )
      );
    }
  }
  function ok() {
    return true;
  }
  function looksLikeANode(value) {
    return value !== null && typeof value === "object" && "type" in value;
  }
  function color(d2) {
    return d2;
  }
  const empty = [];
  const CONTINUE = true;
  const EXIT = false;
  const SKIP = "skip";
  function visitParents(tree, test, visitor, reverse) {
    let check;
    if (typeof test === "function" && typeof visitor !== "function") {
      reverse = visitor;
      visitor = test;
    } else {
      check = test;
    }
    const is = convert(check);
    const step = reverse ? -1 : 1;
    factory(tree, void 0, [])();
    function factory(node2, index2, parents) {
      const value = (
node2 && typeof node2 === "object" ? node2 : {}
      );
      if (typeof value.type === "string") {
        const name = (
typeof value.tagName === "string" ? value.tagName : (
typeof value.name === "string" ? value.name : void 0
          )
        );
        Object.defineProperty(visit2, "name", {
          value: "node (" + color(node2.type + (name ? "<" + name + ">" : "")) + ")"
        });
      }
      return visit2;
      function visit2() {
        let result = empty;
        let subresult;
        let offset2;
        let grandparents;
        if (!test || is(node2, index2, parents[parents.length - 1] || void 0)) {
          result = toResult(visitor(node2, parents));
          if (result[0] === EXIT) {
            return result;
          }
        }
        if ("children" in node2 && node2.children) {
          const nodeAsParent = (
node2
          );
          if (nodeAsParent.children && result[0] !== SKIP) {
            offset2 = (reverse ? nodeAsParent.children.length : -1) + step;
            grandparents = parents.concat(nodeAsParent);
            while (offset2 > -1 && offset2 < nodeAsParent.children.length) {
              const child = nodeAsParent.children[offset2];
              subresult = factory(child, offset2, grandparents)();
              if (subresult[0] === EXIT) {
                return subresult;
              }
              offset2 = typeof subresult[1] === "number" ? subresult[1] : offset2 + step;
            }
          }
        }
        return result;
      }
    }
  }
  function toResult(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "number") {
      return [CONTINUE, value];
    }
    return value === null || value === void 0 ? empty : [value];
  }
  function findAndReplace(tree, list2, options) {
    const settings = options || {};
    const ignored = convert(settings.ignore || []);
    const pairs = toPairs(list2);
    let pairIndex = -1;
    while (++pairIndex < pairs.length) {
      visitParents(tree, "text", visitor);
    }
    function visitor(node2, parents) {
      let index2 = -1;
      let grandparent;
      while (++index2 < parents.length) {
        const parent = parents[index2];
        const siblings2 = grandparent ? grandparent.children : void 0;
        if (ignored(
          parent,
          siblings2 ? siblings2.indexOf(parent) : void 0,
          grandparent
        )) {
          return;
        }
        grandparent = parent;
      }
      if (grandparent) {
        return handler(node2, parents);
      }
    }
    function handler(node2, parents) {
      const parent = parents[parents.length - 1];
      const find2 = pairs[pairIndex][0];
      const replace2 = pairs[pairIndex][1];
      let start = 0;
      const siblings2 = parent.children;
      const index2 = siblings2.indexOf(node2);
      let change = false;
      let nodes = [];
      find2.lastIndex = 0;
      let match = find2.exec(node2.value);
      while (match) {
        const position2 = match.index;
        const matchObject = {
          index: match.index,
          input: match.input,
          stack: [...parents, node2]
        };
        let value = replace2(...match, matchObject);
        if (typeof value === "string") {
          value = value.length > 0 ? { type: "text", value } : void 0;
        }
        if (value === false) {
          find2.lastIndex = position2 + 1;
        } else {
          if (start !== position2) {
            nodes.push({
              type: "text",
              value: node2.value.slice(start, position2)
            });
          }
          if (Array.isArray(value)) {
            nodes.push(...value);
          } else if (value) {
            nodes.push(value);
          }
          start = position2 + match[0].length;
          change = true;
        }
        if (!find2.global) {
          break;
        }
        match = find2.exec(node2.value);
      }
      if (change) {
        if (start < node2.value.length) {
          nodes.push({ type: "text", value: node2.value.slice(start) });
        }
        parent.children.splice(index2, 1, ...nodes);
      } else {
        nodes = [node2];
      }
      return index2 + nodes.length;
    }
  }
  function toPairs(tupleOrList) {
    const result = [];
    if (!Array.isArray(tupleOrList)) {
      throw new TypeError("Expected find and replace tuple or list of tuples");
    }
    const list2 = !tupleOrList[0] || Array.isArray(tupleOrList[0]) ? tupleOrList : [tupleOrList];
    let index2 = -1;
    while (++index2 < list2.length) {
      const tuple = list2[index2];
      result.push([toExpression(tuple[0]), toFunction(tuple[1])]);
    }
    return result;
  }
  function toExpression(find2) {
    return typeof find2 === "string" ? new RegExp(escapeStringRegexp(find2), "g") : find2;
  }
  function toFunction(replace2) {
    return typeof replace2 === "function" ? replace2 : function() {
      return replace2;
    };
  }
  const inConstruct = "phrasing";
  const notInConstruct = ["autolink", "link", "image", "label"];
  function gfmAutolinkLiteralFromMarkdown() {
    return {
      transforms: [transformGfmAutolinkLiterals],
      enter: {
        literalAutolink: enterLiteralAutolink,
        literalAutolinkEmail: enterLiteralAutolinkValue,
        literalAutolinkHttp: enterLiteralAutolinkValue,
        literalAutolinkWww: enterLiteralAutolinkValue
      },
      exit: {
        literalAutolink: exitLiteralAutolink,
        literalAutolinkEmail: exitLiteralAutolinkEmail,
        literalAutolinkHttp: exitLiteralAutolinkHttp,
        literalAutolinkWww: exitLiteralAutolinkWww
      }
    };
  }
  function gfmAutolinkLiteralToMarkdown() {
    return {
      unsafe: [
        {
          character: "@",
          before: "[+\\-.\\w]",
          after: "[\\-.\\w]",
          inConstruct,
          notInConstruct
        },
        {
          character: ".",
          before: "[Ww]",
          after: "[\\-.\\w]",
          inConstruct,
          notInConstruct
        },
        {
          character: ":",
          before: "[ps]",
          after: "\\/",
          inConstruct,
          notInConstruct
        }
      ]
    };
  }
  function enterLiteralAutolink(token) {
    this.enter({ type: "link", title: null, url: "", children: [] }, token);
  }
  function enterLiteralAutolinkValue(token) {
    this.config.enter.autolinkProtocol.call(this, token);
  }
  function exitLiteralAutolinkHttp(token) {
    this.config.exit.autolinkProtocol.call(this, token);
  }
  function exitLiteralAutolinkWww(token) {
    this.config.exit.data.call(this, token);
    const node2 = this.stack[this.stack.length - 1];
    ok$1(node2.type === "link");
    node2.url = "http://" + this.sliceSerialize(token);
  }
  function exitLiteralAutolinkEmail(token) {
    this.config.exit.autolinkEmail.call(this, token);
  }
  function exitLiteralAutolink(token) {
    this.exit(token);
  }
  function transformGfmAutolinkLiterals(tree) {
    findAndReplace(
      tree,
      [
        [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, findUrl],
        [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), findEmail]
      ],
      { ignore: ["link", "linkReference"] }
    );
  }
  function findUrl(_2, protocol, domain2, path2, match) {
    let prefix = "";
    if (!previous(match)) {
      return false;
    }
    if (/^w/i.test(protocol)) {
      domain2 = protocol + domain2;
      protocol = "";
      prefix = "http://";
    }
    if (!isCorrectDomain(domain2)) {
      return false;
    }
    const parts = splitUrl(domain2 + path2);
    if (!parts[0]) return false;
    const result = {
      type: "link",
      title: null,
      url: prefix + protocol + parts[0],
      children: [{ type: "text", value: protocol + parts[0] }]
    };
    if (parts[1]) {
      return [result, { type: "text", value: parts[1] }];
    }
    return result;
  }
  function findEmail(_2, atext, label, match) {
    if (
!previous(match, true) ||
/[-\d_]$/.test(label)
    ) {
      return false;
    }
    return {
      type: "link",
      title: null,
      url: "mailto:" + atext + "@" + label,
      children: [{ type: "text", value: atext + "@" + label }]
    };
  }
  function isCorrectDomain(domain2) {
    const parts = domain2.split(".");
    if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) {
      return false;
    }
    return true;
  }
  function splitUrl(url) {
    const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url);
    if (!trailExec) {
      return [url, void 0];
    }
    url = url.slice(0, trailExec.index);
    let trail2 = trailExec[0];
    let closingParenIndex = trail2.indexOf(")");
    const openingParens = ccount(url, "(");
    let closingParens = ccount(url, ")");
    while (closingParenIndex !== -1 && openingParens > closingParens) {
      url += trail2.slice(0, closingParenIndex + 1);
      trail2 = trail2.slice(closingParenIndex + 1);
      closingParenIndex = trail2.indexOf(")");
      closingParens++;
    }
    return [url, trail2];
  }
  function previous(match, email) {
    const code2 = match.input.charCodeAt(match.index - 1);
    return (match.index === 0 || unicodeWhitespace(code2) || unicodePunctuation(code2)) &&
(!email || code2 !== 47);
  }
  footnoteReference$1.peek = footnoteReferencePeek;
  function enterFootnoteCallString() {
    this.buffer();
  }
  function enterFootnoteCall(token) {
    this.enter({ type: "footnoteReference", identifier: "", label: "" }, token);
  }
  function enterFootnoteDefinitionLabelString() {
    this.buffer();
  }
  function enterFootnoteDefinition(token) {
    this.enter(
      { type: "footnoteDefinition", identifier: "", label: "", children: [] },
      token
    );
  }
  function exitFootnoteCallString(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    ok$1(node2.type === "footnoteReference");
    node2.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
    node2.label = label;
  }
  function exitFootnoteCall(token) {
    this.exit(token);
  }
  function exitFootnoteDefinitionLabelString(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    ok$1(node2.type === "footnoteDefinition");
    node2.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
    node2.label = label;
  }
  function exitFootnoteDefinition(token) {
    this.exit(token);
  }
  function footnoteReferencePeek() {
    return "[";
  }
  function footnoteReference$1(node2, _2, state, info) {
    const tracker = state.createTracker(info);
    let value = tracker.move("[^");
    const exit2 = state.enter("footnoteReference");
    const subexit = state.enter("reference");
    value += tracker.move(
      state.safe(state.associationId(node2), { after: "]", before: value })
    );
    subexit();
    exit2();
    value += tracker.move("]");
    return value;
  }
  function gfmFootnoteFromMarkdown() {
    return {
      enter: {
        gfmFootnoteCallString: enterFootnoteCallString,
        gfmFootnoteCall: enterFootnoteCall,
        gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
        gfmFootnoteDefinition: enterFootnoteDefinition
      },
      exit: {
        gfmFootnoteCallString: exitFootnoteCallString,
        gfmFootnoteCall: exitFootnoteCall,
        gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
        gfmFootnoteDefinition: exitFootnoteDefinition
      }
    };
  }
  function gfmFootnoteToMarkdown(options) {
    return {
      handlers: { footnoteDefinition, footnoteReference: footnoteReference$1 },
unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
    };
    function footnoteDefinition(node2, _2, state, info) {
      const tracker = state.createTracker(info);
      let value = tracker.move("[^");
      const exit2 = state.enter("footnoteDefinition");
      const subexit = state.enter("label");
      value += tracker.move(
        state.safe(state.associationId(node2), { before: value, after: "]" })
      );
      subexit();
      value += tracker.move("]:");
      if (node2.children && node2.children.length > 0) {
        tracker.shift(4);
        value += tracker.move(
          " " + state.indentLines(
            state.containerFlow(node2, tracker.current()),
            mapExceptFirst
          )
        );
      }
      exit2();
      return value;
    }
  }
  function mapExceptFirst(line, index2, blank) {
    return index2 === 0 ? line : mapAll(line, index2, blank);
  }
  function mapAll(line, index2, blank) {
    return (blank ? "" : "    ") + line;
  }
  const constructsWithoutStrikethrough = [
    "autolink",
    "destinationLiteral",
    "destinationRaw",
    "reference",
    "titleQuote",
    "titleApostrophe"
  ];
  handleDelete.peek = peekDelete;
  function gfmStrikethroughFromMarkdown() {
    return {
      canContainEols: ["delete"],
      enter: { strikethrough: enterStrikethrough },
      exit: { strikethrough: exitStrikethrough }
    };
  }
  function gfmStrikethroughToMarkdown() {
    return {
      unsafe: [
        {
          character: "~",
          inConstruct: "phrasing",
          notInConstruct: constructsWithoutStrikethrough
        }
      ],
      handlers: { delete: handleDelete }
    };
  }
  function enterStrikethrough(token) {
    this.enter({ type: "delete", children: [] }, token);
  }
  function exitStrikethrough(token) {
    this.exit(token);
  }
  function handleDelete(node2, _2, state, info) {
    const tracker = state.createTracker(info);
    const exit2 = state.enter("strikethrough");
    let value = tracker.move("~~");
    value += state.containerPhrasing(node2, {
      ...tracker.current(),
      before: value,
      after: "~"
    });
    value += tracker.move("~~");
    exit2();
    return value;
  }
  function peekDelete() {
    return "~";
  }
  function defaultStringLength(value) {
    return value.length;
  }
  function markdownTable(table2, options) {
    const settings = options || {};
    const align = (settings.align || []).concat();
    const stringLength = settings.stringLength || defaultStringLength;
    const alignments = [];
    const cellMatrix = [];
    const sizeMatrix = [];
    const longestCellByColumn = [];
    let mostCellsPerRow = 0;
    let rowIndex = -1;
    while (++rowIndex < table2.length) {
      const row2 = [];
      const sizes2 = [];
      let columnIndex2 = -1;
      if (table2[rowIndex].length > mostCellsPerRow) {
        mostCellsPerRow = table2[rowIndex].length;
      }
      while (++columnIndex2 < table2[rowIndex].length) {
        const cell = serialize$1(table2[rowIndex][columnIndex2]);
        if (settings.alignDelimiters !== false) {
          const size2 = stringLength(cell);
          sizes2[columnIndex2] = size2;
          if (longestCellByColumn[columnIndex2] === void 0 || size2 > longestCellByColumn[columnIndex2]) {
            longestCellByColumn[columnIndex2] = size2;
          }
        }
        row2.push(cell);
      }
      cellMatrix[rowIndex] = row2;
      sizeMatrix[rowIndex] = sizes2;
    }
    let columnIndex = -1;
    if (typeof align === "object" && "length" in align) {
      while (++columnIndex < mostCellsPerRow) {
        alignments[columnIndex] = toAlignment(align[columnIndex]);
      }
    } else {
      const code2 = toAlignment(align);
      while (++columnIndex < mostCellsPerRow) {
        alignments[columnIndex] = code2;
      }
    }
    columnIndex = -1;
    const row = [];
    const sizes = [];
    while (++columnIndex < mostCellsPerRow) {
      const code2 = alignments[columnIndex];
      let before = "";
      let after = "";
      if (code2 === 99) {
        before = ":";
        after = ":";
      } else if (code2 === 108) {
        before = ":";
      } else if (code2 === 114) {
        after = ":";
      }
      let size2 = settings.alignDelimiters === false ? 1 : Math.max(
        1,
        longestCellByColumn[columnIndex] - before.length - after.length
      );
      const cell = before + "-".repeat(size2) + after;
      if (settings.alignDelimiters !== false) {
        size2 = before.length + size2 + after.length;
        if (size2 > longestCellByColumn[columnIndex]) {
          longestCellByColumn[columnIndex] = size2;
        }
        sizes[columnIndex] = size2;
      }
      row[columnIndex] = cell;
    }
    cellMatrix.splice(1, 0, row);
    sizeMatrix.splice(1, 0, sizes);
    rowIndex = -1;
    const lines = [];
    while (++rowIndex < cellMatrix.length) {
      const row2 = cellMatrix[rowIndex];
      const sizes2 = sizeMatrix[rowIndex];
      columnIndex = -1;
      const line = [];
      while (++columnIndex < mostCellsPerRow) {
        const cell = row2[columnIndex] || "";
        let before = "";
        let after = "";
        if (settings.alignDelimiters !== false) {
          const size2 = longestCellByColumn[columnIndex] - (sizes2[columnIndex] || 0);
          const code2 = alignments[columnIndex];
          if (code2 === 114) {
            before = " ".repeat(size2);
          } else if (code2 === 99) {
            if (size2 % 2) {
              before = " ".repeat(size2 / 2 + 0.5);
              after = " ".repeat(size2 / 2 - 0.5);
            } else {
              before = " ".repeat(size2 / 2);
              after = before;
            }
          } else {
            after = " ".repeat(size2);
          }
        }
        if (settings.delimiterStart !== false && !columnIndex) {
          line.push("|");
        }
        if (settings.padding !== false &&

!(settings.alignDelimiters === false && cell === "") && (settings.delimiterStart !== false || columnIndex)) {
          line.push(" ");
        }
        if (settings.alignDelimiters !== false) {
          line.push(before);
        }
        line.push(cell);
        if (settings.alignDelimiters !== false) {
          line.push(after);
        }
        if (settings.padding !== false) {
          line.push(" ");
        }
        if (settings.delimiterEnd !== false || columnIndex !== mostCellsPerRow - 1) {
          line.push("|");
        }
      }
      lines.push(
        settings.delimiterEnd === false ? line.join("").replace(/ +$/, "") : line.join("")
      );
    }
    return lines.join("\n");
  }
  function serialize$1(value) {
    return value === null || value === void 0 ? "" : String(value);
  }
  function toAlignment(value) {
    const code2 = typeof value === "string" ? value.codePointAt(0) : 0;
    return code2 === 67 || code2 === 99 ? 99 : code2 === 76 || code2 === 108 ? 108 : code2 === 82 || code2 === 114 ? 114 : 0;
  }
  const own$1 = {}.hasOwnProperty;
  function configure(base, extension2) {
    let index2 = -1;
    let key2;
    if (extension2.extensions) {
      while (++index2 < extension2.extensions.length) {
        configure(base, extension2.extensions[index2]);
      }
    }
    for (key2 in extension2) {
      if (own$1.call(extension2, key2)) {
        switch (key2) {
          case "extensions": {
            break;
          }
case "unsafe": {
            list$2(base[key2], extension2[key2]);
            break;
          }
          case "join": {
            list$2(base[key2], extension2[key2]);
            break;
          }
          case "handlers": {
            map$2(base[key2], extension2[key2]);
            break;
          }
          default: {
            base.options[key2] = extension2[key2];
          }
        }
      }
    }
    return base;
  }
  function list$2(left, right) {
    if (right) {
      left.push(...right);
    }
  }
  function map$2(left, right) {
    if (right) {
      Object.assign(left, right);
    }
  }
  function blockquote$1(node2, _2, state, info) {
    const exit2 = state.enter("blockquote");
    const tracker = state.createTracker(info);
    tracker.move("> ");
    tracker.shift(2);
    const value = state.indentLines(
      state.containerFlow(node2, tracker.current()),
      map$1
    );
    exit2();
    return value;
  }
  function map$1(line, _2, blank) {
    return ">" + (blank ? "" : " ") + line;
  }
  function patternInScope(stack, pattern) {
    return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct, false);
  }
  function listInScope(stack, list2, none) {
    if (typeof list2 === "string") {
      list2 = [list2];
    }
    if (!list2 || list2.length === 0) {
      return none;
    }
    let index2 = -1;
    while (++index2 < list2.length) {
      if (stack.includes(list2[index2])) {
        return true;
      }
    }
    return false;
  }
  function hardBreak$1(_2, _1, state, info) {
    let index2 = -1;
    while (++index2 < state.unsafe.length) {
      if (state.unsafe[index2].character === "\n" && patternInScope(state.stack, state.unsafe[index2])) {
        return /[ \t]/.test(info.before) ? "" : " ";
      }
    }
    return "\\\n";
  }
  function longestStreak(value, substring) {
    const source = String(value);
    let index2 = source.indexOf(substring);
    let expected = index2;
    let count2 = 0;
    let max2 = 0;
    if (typeof substring !== "string") {
      throw new TypeError("Expected substring");
    }
    while (index2 !== -1) {
      if (index2 === expected) {
        if (++count2 > max2) {
          max2 = count2;
        }
      } else {
        count2 = 1;
      }
      expected = index2 + substring.length;
      index2 = source.indexOf(substring, expected);
    }
    return max2;
  }
  function formatCodeAsIndented(node2, state) {
    return Boolean(
      state.options.fences === false && node2.value &&
!node2.lang &&
/[^ \r\n]/.test(node2.value) &&
!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node2.value)
    );
  }
  function checkFence(state) {
    const marker = state.options.fence || "`";
    if (marker !== "`" && marker !== "~") {
      throw new Error(
        "Cannot serialize code with `" + marker + "` for `options.fence`, expected `` ` `` or `~`"
      );
    }
    return marker;
  }
  function code$2(node2, _2, state, info) {
    const marker = checkFence(state);
    const raw2 = node2.value || "";
    const suffix = marker === "`" ? "GraveAccent" : "Tilde";
    if (formatCodeAsIndented(node2, state)) {
      const exit3 = state.enter("codeIndented");
      const value2 = state.indentLines(raw2, map);
      exit3();
      return value2;
    }
    const tracker = state.createTracker(info);
    const sequence = marker.repeat(Math.max(longestStreak(raw2, marker) + 1, 3));
    const exit2 = state.enter("codeFenced");
    let value = tracker.move(sequence);
    if (node2.lang) {
      const subexit = state.enter(`codeFencedLang${suffix}`);
      value += tracker.move(
        state.safe(node2.lang, {
          before: value,
          after: " ",
          encode: ["`"],
          ...tracker.current()
        })
      );
      subexit();
    }
    if (node2.lang && node2.meta) {
      const subexit = state.enter(`codeFencedMeta${suffix}`);
      value += tracker.move(" ");
      value += tracker.move(
        state.safe(node2.meta, {
          before: value,
          after: "\n",
          encode: ["`"],
          ...tracker.current()
        })
      );
      subexit();
    }
    value += tracker.move("\n");
    if (raw2) {
      value += tracker.move(raw2 + "\n");
    }
    value += tracker.move(sequence);
    exit2();
    return value;
  }
  function map(line, _2, blank) {
    return (blank ? "" : "    ") + line;
  }
  function checkQuote(state) {
    const marker = state.options.quote || '"';
    if (marker !== '"' && marker !== "'") {
      throw new Error(
        "Cannot serialize title with `" + marker + "` for `options.quote`, expected `\"`, or `'`"
      );
    }
    return marker;
  }
  function definition(node2, _2, state, info) {
    const quote = checkQuote(state);
    const suffix = quote === '"' ? "Quote" : "Apostrophe";
    const exit2 = state.enter("definition");
    let subexit = state.enter("label");
    const tracker = state.createTracker(info);
    let value = tracker.move("[");
    value += tracker.move(
      state.safe(state.associationId(node2), {
        before: value,
        after: "]",
        ...tracker.current()
      })
    );
    value += tracker.move("]: ");
    subexit();
    if (
!node2.url ||
/[\0- \u007F]/.test(node2.url)
    ) {
      subexit = state.enter("destinationLiteral");
      value += tracker.move("<");
      value += tracker.move(
        state.safe(node2.url, { before: value, after: ">", ...tracker.current() })
      );
      value += tracker.move(">");
    } else {
      subexit = state.enter("destinationRaw");
      value += tracker.move(
        state.safe(node2.url, {
          before: value,
          after: node2.title ? " " : "\n",
          ...tracker.current()
        })
      );
    }
    subexit();
    if (node2.title) {
      subexit = state.enter(`title${suffix}`);
      value += tracker.move(" " + quote);
      value += tracker.move(
        state.safe(node2.title, {
          before: value,
          after: quote,
          ...tracker.current()
        })
      );
      value += tracker.move(quote);
      subexit();
    }
    exit2();
    return value;
  }
  function checkEmphasis(state) {
    const marker = state.options.emphasis || "*";
    if (marker !== "*" && marker !== "_") {
      throw new Error(
        "Cannot serialize emphasis with `" + marker + "` for `options.emphasis`, expected `*`, or `_`"
      );
    }
    return marker;
  }
  function encodeCharacterReference(code2) {
    return "&#x" + code2.toString(16).toUpperCase() + ";";
  }
  function encodeInfo(outside, inside, marker) {
    const outsideKind = classifyCharacter(outside);
    const insideKind = classifyCharacter(inside);
    if (outsideKind === void 0) {
      return insideKind === void 0 ? (


marker === "_" ? { inside: true, outside: true } : { inside: false, outside: false }
      ) : insideKind === 1 ? (
{ inside: true, outside: true }
      ) : (
{ inside: false, outside: true }
      );
    }
    if (outsideKind === 1) {
      return insideKind === void 0 ? (
{ inside: false, outside: false }
      ) : insideKind === 1 ? (
{ inside: true, outside: true }
      ) : (
{ inside: false, outside: false }
      );
    }
    return insideKind === void 0 ? (
{ inside: false, outside: false }
    ) : insideKind === 1 ? (
{ inside: true, outside: false }
    ) : (
{ inside: false, outside: false }
    );
  }
  emphasis$1.peek = emphasisPeek;
  function emphasis$1(node2, _2, state, info) {
    const marker = checkEmphasis(state);
    const exit2 = state.enter("emphasis");
    const tracker = state.createTracker(info);
    const before = tracker.move(marker);
    let between2 = tracker.move(
      state.containerPhrasing(node2, {
        after: marker,
        before,
        ...tracker.current()
      })
    );
    const betweenHead = between2.charCodeAt(0);
    const open = encodeInfo(
      info.before.charCodeAt(info.before.length - 1),
      betweenHead,
      marker
    );
    if (open.inside) {
      between2 = encodeCharacterReference(betweenHead) + between2.slice(1);
    }
    const betweenTail = between2.charCodeAt(between2.length - 1);
    const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
    if (close.inside) {
      between2 = between2.slice(0, -1) + encodeCharacterReference(betweenTail);
    }
    const after = tracker.move(marker);
    exit2();
    state.attentionEncodeSurroundingInfo = {
      after: close.outside,
      before: open.outside
    };
    return before + between2 + after;
  }
  function emphasisPeek(_2, _1, state) {
    return state.options.emphasis || "*";
  }
  function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
    let reverse;
    let test;
    let visitor;
    if (typeof testOrVisitor === "function" && typeof visitorOrReverse !== "function") {
      test = void 0;
      visitor = testOrVisitor;
      reverse = visitorOrReverse;
    } else {
      test = testOrVisitor;
      visitor = visitorOrReverse;
      reverse = maybeReverse;
    }
    visitParents(tree, test, overload, reverse);
    function overload(node2, parents) {
      const parent = parents[parents.length - 1];
      const index2 = parent ? parent.children.indexOf(node2) : void 0;
      return visitor(node2, index2, parent);
    }
  }
  function formatHeadingAsSetext(node2, state) {
    let literalWithBreak = false;
    visit(node2, function(node3) {
      if ("value" in node3 && /\r?\n|\r/.test(node3.value) || node3.type === "break") {
        literalWithBreak = true;
        return EXIT;
      }
    });
    return Boolean(
      (!node2.depth || node2.depth < 3) && toString$1(node2) && (state.options.setext || literalWithBreak)
    );
  }
  function heading$1(node2, _2, state, info) {
    const rank = Math.max(Math.min(6, node2.depth || 1), 1);
    const tracker = state.createTracker(info);
    if (formatHeadingAsSetext(node2, state)) {
      const exit3 = state.enter("headingSetext");
      const subexit2 = state.enter("phrasing");
      const value2 = state.containerPhrasing(node2, {
        ...tracker.current(),
        before: "\n",
        after: "\n"
      });
      subexit2();
      exit3();
      return value2 + "\n" + (rank === 1 ? "=" : "-").repeat(
value2.length -

(Math.max(value2.lastIndexOf("\r"), value2.lastIndexOf("\n")) + 1)
      );
    }
    const sequence = "#".repeat(rank);
    const exit2 = state.enter("headingAtx");
    const subexit = state.enter("phrasing");
    tracker.move(sequence + " ");
    let value = state.containerPhrasing(node2, {
      before: "# ",
      after: "\n",
      ...tracker.current()
    });
    if (/^[\t ]/.test(value)) {
      value = encodeCharacterReference(value.charCodeAt(0)) + value.slice(1);
    }
    value = value ? sequence + " " + value : sequence;
    if (state.options.closeAtx) {
      value += " " + sequence;
    }
    subexit();
    exit2();
    return value;
  }
  html$1.peek = htmlPeek;
  function html$1(node2) {
    return node2.value || "";
  }
  function htmlPeek() {
    return "<";
  }
  image$1.peek = imagePeek;
  function image$1(node2, _2, state, info) {
    const quote = checkQuote(state);
    const suffix = quote === '"' ? "Quote" : "Apostrophe";
    const exit2 = state.enter("image");
    let subexit = state.enter("label");
    const tracker = state.createTracker(info);
    let value = tracker.move("![");
    value += tracker.move(
      state.safe(node2.alt, { before: value, after: "]", ...tracker.current() })
    );
    value += tracker.move("](");
    subexit();
    if (
!node2.url && node2.title ||
/[\0- \u007F]/.test(node2.url)
    ) {
      subexit = state.enter("destinationLiteral");
      value += tracker.move("<");
      value += tracker.move(
        state.safe(node2.url, { before: value, after: ">", ...tracker.current() })
      );
      value += tracker.move(">");
    } else {
      subexit = state.enter("destinationRaw");
      value += tracker.move(
        state.safe(node2.url, {
          before: value,
          after: node2.title ? " " : ")",
          ...tracker.current()
        })
      );
    }
    subexit();
    if (node2.title) {
      subexit = state.enter(`title${suffix}`);
      value += tracker.move(" " + quote);
      value += tracker.move(
        state.safe(node2.title, {
          before: value,
          after: quote,
          ...tracker.current()
        })
      );
      value += tracker.move(quote);
      subexit();
    }
    value += tracker.move(")");
    exit2();
    return value;
  }
  function imagePeek() {
    return "!";
  }
  imageReference$1.peek = imageReferencePeek;
  function imageReference$1(node2, _2, state, info) {
    const type = node2.referenceType;
    const exit2 = state.enter("imageReference");
    let subexit = state.enter("label");
    const tracker = state.createTracker(info);
    let value = tracker.move("![");
    const alt = state.safe(node2.alt, {
      before: value,
      after: "]",
      ...tracker.current()
    });
    value += tracker.move(alt + "][");
    subexit();
    const stack = state.stack;
    state.stack = [];
    subexit = state.enter("reference");
    const reference = state.safe(state.associationId(node2), {
      before: value,
      after: "]",
      ...tracker.current()
    });
    subexit();
    state.stack = stack;
    exit2();
    if (type === "full" || !alt || alt !== reference) {
      value += tracker.move(reference + "]");
    } else if (type === "shortcut") {
      value = value.slice(0, -1);
    } else {
      value += tracker.move("]");
    }
    return value;
  }
  function imageReferencePeek() {
    return "!";
  }
  inlineCode$1.peek = inlineCodePeek;
  function inlineCode$1(node2, _2, state) {
    let value = node2.value || "";
    let sequence = "`";
    let index2 = -1;
    while (new RegExp("(^|[^`])" + sequence + "([^`]|$)").test(value)) {
      sequence += "`";
    }
    if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^`|`$/.test(value))) {
      value = " " + value + " ";
    }
    while (++index2 < state.unsafe.length) {
      const pattern = state.unsafe[index2];
      const expression = state.compilePattern(pattern);
      let match;
      if (!pattern.atBreak) continue;
      while (match = expression.exec(value)) {
        let position2 = match.index;
        if (value.charCodeAt(position2) === 10 && value.charCodeAt(position2 - 1) === 13) {
          position2--;
        }
        value = value.slice(0, position2) + " " + value.slice(match.index + 1);
      }
    }
    return sequence + value + sequence;
  }
  function inlineCodePeek() {
    return "`";
  }
  function formatLinkAsAutolink(node2, state) {
    const raw2 = toString$1(node2);
    return Boolean(
      !state.options.resourceLink &&
node2.url &&
!node2.title &&
node2.children && node2.children.length === 1 && node2.children[0].type === "text" &&
(raw2 === node2.url || "mailto:" + raw2 === node2.url) &&
/^[a-z][a-z+.-]+:/i.test(node2.url) &&

!/[\0- <>\u007F]/.test(node2.url)
    );
  }
  link$1.peek = linkPeek;
  function link$1(node2, _2, state, info) {
    const quote = checkQuote(state);
    const suffix = quote === '"' ? "Quote" : "Apostrophe";
    const tracker = state.createTracker(info);
    let exit2;
    let subexit;
    if (formatLinkAsAutolink(node2, state)) {
      const stack = state.stack;
      state.stack = [];
      exit2 = state.enter("autolink");
      let value2 = tracker.move("<");
      value2 += tracker.move(
        state.containerPhrasing(node2, {
          before: value2,
          after: ">",
          ...tracker.current()
        })
      );
      value2 += tracker.move(">");
      exit2();
      state.stack = stack;
      return value2;
    }
    exit2 = state.enter("link");
    subexit = state.enter("label");
    let value = tracker.move("[");
    value += tracker.move(
      state.containerPhrasing(node2, {
        before: value,
        after: "](",
        ...tracker.current()
      })
    );
    value += tracker.move("](");
    subexit();
    if (
!node2.url && node2.title ||
/[\0- \u007F]/.test(node2.url)
    ) {
      subexit = state.enter("destinationLiteral");
      value += tracker.move("<");
      value += tracker.move(
        state.safe(node2.url, { before: value, after: ">", ...tracker.current() })
      );
      value += tracker.move(">");
    } else {
      subexit = state.enter("destinationRaw");
      value += tracker.move(
        state.safe(node2.url, {
          before: value,
          after: node2.title ? " " : ")",
          ...tracker.current()
        })
      );
    }
    subexit();
    if (node2.title) {
      subexit = state.enter(`title${suffix}`);
      value += tracker.move(" " + quote);
      value += tracker.move(
        state.safe(node2.title, {
          before: value,
          after: quote,
          ...tracker.current()
        })
      );
      value += tracker.move(quote);
      subexit();
    }
    value += tracker.move(")");
    exit2();
    return value;
  }
  function linkPeek(node2, _2, state) {
    return formatLinkAsAutolink(node2, state) ? "<" : "[";
  }
  linkReference$1.peek = linkReferencePeek;
  function linkReference$1(node2, _2, state, info) {
    const type = node2.referenceType;
    const exit2 = state.enter("linkReference");
    let subexit = state.enter("label");
    const tracker = state.createTracker(info);
    let value = tracker.move("[");
    const text2 = state.containerPhrasing(node2, {
      before: value,
      after: "]",
      ...tracker.current()
    });
    value += tracker.move(text2 + "][");
    subexit();
    const stack = state.stack;
    state.stack = [];
    subexit = state.enter("reference");
    const reference = state.safe(state.associationId(node2), {
      before: value,
      after: "]",
      ...tracker.current()
    });
    subexit();
    state.stack = stack;
    exit2();
    if (type === "full" || !text2 || text2 !== reference) {
      value += tracker.move(reference + "]");
    } else if (type === "shortcut") {
      value = value.slice(0, -1);
    } else {
      value += tracker.move("]");
    }
    return value;
  }
  function linkReferencePeek() {
    return "[";
  }
  function checkBullet(state) {
    const marker = state.options.bullet || "*";
    if (marker !== "*" && marker !== "+" && marker !== "-") {
      throw new Error(
        "Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`"
      );
    }
    return marker;
  }
  function checkBulletOther(state) {
    const bullet = checkBullet(state);
    const bulletOther = state.options.bulletOther;
    if (!bulletOther) {
      return bullet === "*" ? "-" : "*";
    }
    if (bulletOther !== "*" && bulletOther !== "+" && bulletOther !== "-") {
      throw new Error(
        "Cannot serialize items with `" + bulletOther + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
      );
    }
    if (bulletOther === bullet) {
      throw new Error(
        "Expected `bullet` (`" + bullet + "`) and `bulletOther` (`" + bulletOther + "`) to be different"
      );
    }
    return bulletOther;
  }
  function checkBulletOrdered(state) {
    const marker = state.options.bulletOrdered || ".";
    if (marker !== "." && marker !== ")") {
      throw new Error(
        "Cannot serialize items with `" + marker + "` for `options.bulletOrdered`, expected `.` or `)`"
      );
    }
    return marker;
  }
  function checkRule(state) {
    const marker = state.options.rule || "*";
    if (marker !== "*" && marker !== "-" && marker !== "_") {
      throw new Error(
        "Cannot serialize rules with `" + marker + "` for `options.rule`, expected `*`, `-`, or `_`"
      );
    }
    return marker;
  }
  function list$1(node2, parent, state, info) {
    const exit2 = state.enter("list");
    const bulletCurrent = state.bulletCurrent;
    let bullet = node2.ordered ? checkBulletOrdered(state) : checkBullet(state);
    const bulletOther = node2.ordered ? bullet === "." ? ")" : "." : checkBulletOther(state);
    let useDifferentMarker = parent && state.bulletLastUsed ? bullet === state.bulletLastUsed : false;
    if (!node2.ordered) {
      const firstListItem = node2.children ? node2.children[0] : void 0;
      if (
(bullet === "*" || bullet === "-") &&
firstListItem && (!firstListItem.children || !firstListItem.children[0]) &&
state.stack[state.stack.length - 1] === "list" && state.stack[state.stack.length - 2] === "listItem" && state.stack[state.stack.length - 3] === "list" && state.stack[state.stack.length - 4] === "listItem" &&
state.indexStack[state.indexStack.length - 1] === 0 && state.indexStack[state.indexStack.length - 2] === 0 && state.indexStack[state.indexStack.length - 3] === 0
      ) {
        useDifferentMarker = true;
      }
      if (checkRule(state) === bullet && firstListItem) {
        let index2 = -1;
        while (++index2 < node2.children.length) {
          const item = node2.children[index2];
          if (item && item.type === "listItem" && item.children && item.children[0] && item.children[0].type === "thematicBreak") {
            useDifferentMarker = true;
            break;
          }
        }
      }
    }
    if (useDifferentMarker) {
      bullet = bulletOther;
    }
    state.bulletCurrent = bullet;
    const value = state.containerFlow(node2, info);
    state.bulletLastUsed = bullet;
    state.bulletCurrent = bulletCurrent;
    exit2();
    return value;
  }
  function checkListItemIndent(state) {
    const style = state.options.listItemIndent || "one";
    if (style !== "tab" && style !== "one" && style !== "mixed") {
      throw new Error(
        "Cannot serialize items with `" + style + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
      );
    }
    return style;
  }
  function listItem$1(node2, parent, state, info) {
    const listItemIndent = checkListItemIndent(state);
    let bullet = state.bulletCurrent || checkBullet(state);
    if (parent && parent.type === "list" && parent.ordered) {
      bullet = (typeof parent.start === "number" && parent.start > -1 ? parent.start : 1) + (state.options.incrementListMarker === false ? 0 : parent.children.indexOf(node2)) + bullet;
    }
    let size2 = bullet.length + 1;
    if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.type === "list" && parent.spread || node2.spread)) {
      size2 = Math.ceil(size2 / 4) * 4;
    }
    const tracker = state.createTracker(info);
    tracker.move(bullet + " ".repeat(size2 - bullet.length));
    tracker.shift(size2);
    const exit2 = state.enter("listItem");
    const value = state.indentLines(
      state.containerFlow(node2, tracker.current()),
      map2
    );
    exit2();
    return value;
    function map2(line, index2, blank) {
      if (index2) {
        return (blank ? "" : " ".repeat(size2)) + line;
      }
      return (blank ? bullet : bullet + " ".repeat(size2 - bullet.length)) + line;
    }
  }
  function paragraph$1(node2, _2, state, info) {
    const exit2 = state.enter("paragraph");
    const subexit = state.enter("phrasing");
    const value = state.containerPhrasing(node2, info);
    subexit();
    exit2();
    return value;
  }
  const phrasing = (
convert([
      "break",
      "delete",
      "emphasis",
"footnote",
      "footnoteReference",
      "image",
      "imageReference",
      "inlineCode",
"inlineMath",
      "link",
      "linkReference",
"mdxJsxTextElement",
"mdxTextExpression",
      "strong",
      "text",
"textDirective"
    ])
  );
  function root$1(node2, _2, state, info) {
    const hasPhrasing = node2.children.some(function(d2) {
      return phrasing(d2);
    });
    const container = hasPhrasing ? state.containerPhrasing : state.containerFlow;
    return container.call(state, node2, info);
  }
  function checkStrong(state) {
    const marker = state.options.strong || "*";
    if (marker !== "*" && marker !== "_") {
      throw new Error(
        "Cannot serialize strong with `" + marker + "` for `options.strong`, expected `*`, or `_`"
      );
    }
    return marker;
  }
  strong$1.peek = strongPeek;
  function strong$1(node2, _2, state, info) {
    const marker = checkStrong(state);
    const exit2 = state.enter("strong");
    const tracker = state.createTracker(info);
    const before = tracker.move(marker + marker);
    let between2 = tracker.move(
      state.containerPhrasing(node2, {
        after: marker,
        before,
        ...tracker.current()
      })
    );
    const betweenHead = between2.charCodeAt(0);
    const open = encodeInfo(
      info.before.charCodeAt(info.before.length - 1),
      betweenHead,
      marker
    );
    if (open.inside) {
      between2 = encodeCharacterReference(betweenHead) + between2.slice(1);
    }
    const betweenTail = between2.charCodeAt(between2.length - 1);
    const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
    if (close.inside) {
      between2 = between2.slice(0, -1) + encodeCharacterReference(betweenTail);
    }
    const after = tracker.move(marker + marker);
    exit2();
    state.attentionEncodeSurroundingInfo = {
      after: close.outside,
      before: open.outside
    };
    return before + between2 + after;
  }
  function strongPeek(_2, _1, state) {
    return state.options.strong || "*";
  }
  function text$2(node2, _2, state, info) {
    return state.safe(node2.value, info);
  }
  function checkRuleRepetition(state) {
    const repetition = state.options.ruleRepetition || 3;
    if (repetition < 3) {
      throw new Error(
        "Cannot serialize rules with repetition `" + repetition + "` for `options.ruleRepetition`, expected `3` or more"
      );
    }
    return repetition;
  }
  function thematicBreak$1(_2, _1, state) {
    const value = (checkRule(state) + (state.options.ruleSpaces ? " " : "")).repeat(checkRuleRepetition(state));
    return state.options.ruleSpaces ? value.slice(0, -1) : value;
  }
  const handle = {
    blockquote: blockquote$1,
    break: hardBreak$1,
    code: code$2,
    definition,
    emphasis: emphasis$1,
    hardBreak: hardBreak$1,
    heading: heading$1,
    html: html$1,
    image: image$1,
    imageReference: imageReference$1,
    inlineCode: inlineCode$1,
    link: link$1,
    linkReference: linkReference$1,
    list: list$1,
    listItem: listItem$1,
    paragraph: paragraph$1,
    root: root$1,
    strong: strong$1,
    text: text$2,
    thematicBreak: thematicBreak$1
  };
  const join = [joinDefaults];
  function joinDefaults(left, right, parent, state) {
    if (right.type === "code" && formatCodeAsIndented(right, state) && (left.type === "list" || left.type === right.type && formatCodeAsIndented(left, state))) {
      return false;
    }
    if ("spread" in parent && typeof parent.spread === "boolean") {
      if (left.type === "paragraph" &&
(left.type === right.type || right.type === "definition" ||
right.type === "heading" && formatHeadingAsSetext(right, state))) {
        return;
      }
      return parent.spread ? 1 : 0;
    }
  }
  const fullPhrasingSpans = [
    "autolink",
    "destinationLiteral",
    "destinationRaw",
    "reference",
    "titleQuote",
    "titleApostrophe"
  ];
  const unsafe = [
    { character: "	", after: "[\\r\\n]", inConstruct: "phrasing" },
    { character: "	", before: "[\\r\\n]", inConstruct: "phrasing" },
    {
      character: "	",
      inConstruct: ["codeFencedLangGraveAccent", "codeFencedLangTilde"]
    },
    {
      character: "\r",
      inConstruct: [
        "codeFencedLangGraveAccent",
        "codeFencedLangTilde",
        "codeFencedMetaGraveAccent",
        "codeFencedMetaTilde",
        "destinationLiteral",
        "headingAtx"
      ]
    },
    {
      character: "\n",
      inConstruct: [
        "codeFencedLangGraveAccent",
        "codeFencedLangTilde",
        "codeFencedMetaGraveAccent",
        "codeFencedMetaTilde",
        "destinationLiteral",
        "headingAtx"
      ]
    },
    { character: " ", after: "[\\r\\n]", inConstruct: "phrasing" },
    { character: " ", before: "[\\r\\n]", inConstruct: "phrasing" },
    {
      character: " ",
      inConstruct: ["codeFencedLangGraveAccent", "codeFencedLangTilde"]
    },

{
      character: "!",
      after: "\\[",
      inConstruct: "phrasing",
      notInConstruct: fullPhrasingSpans
    },
{ character: '"', inConstruct: "titleQuote" },
{ atBreak: true, character: "#" },
    { character: "#", inConstruct: "headingAtx", after: "(?:[\r\n]|$)" },

{ character: "&", after: "[#A-Za-z]", inConstruct: "phrasing" },
{ character: "'", inConstruct: "titleApostrophe" },
{ character: "(", inConstruct: "destinationRaw" },
{
      before: "\\]",
      character: "(",
      inConstruct: "phrasing",
      notInConstruct: fullPhrasingSpans
    },

{ atBreak: true, before: "\\d+", character: ")" },
    { character: ")", inConstruct: "destinationRaw" },
{ atBreak: true, character: "*", after: "(?:[ 	\r\n*])" },
    { character: "*", inConstruct: "phrasing", notInConstruct: fullPhrasingSpans },
{ atBreak: true, character: "+", after: "(?:[ 	\r\n])" },

{ atBreak: true, character: "-", after: "(?:[ 	\r\n-])" },
{ atBreak: true, before: "\\d+", character: ".", after: "(?:[ 	\r\n]|$)" },





{ atBreak: true, character: "<", after: "[!/?A-Za-z]" },
    {
      character: "<",
      after: "[!/?A-Za-z]",
      inConstruct: "phrasing",
      notInConstruct: fullPhrasingSpans
    },
    { character: "<", inConstruct: "destinationLiteral" },
{ atBreak: true, character: "=" },

{ atBreak: true, character: ">" },
    { character: ">", inConstruct: "destinationLiteral" },

{ atBreak: true, character: "[" },
    { character: "[", inConstruct: "phrasing", notInConstruct: fullPhrasingSpans },
    { character: "[", inConstruct: ["label", "reference"] },


{ character: "\\", after: "[\\r\\n]", inConstruct: "phrasing" },
{ character: "]", inConstruct: ["label", "reference"] },

{ atBreak: true, character: "_" },
    { character: "_", inConstruct: "phrasing", notInConstruct: fullPhrasingSpans },

{ atBreak: true, character: "`" },
    {
      character: "`",
      inConstruct: ["codeFencedLangGraveAccent", "codeFencedMetaGraveAccent"]
    },
    { character: "`", inConstruct: "phrasing", notInConstruct: fullPhrasingSpans },


{ atBreak: true, character: "~" }
  ];
  function association(node2) {
    if (node2.label || !node2.identifier) {
      return node2.label || "";
    }
    return decodeString(node2.identifier);
  }
  function compilePattern(pattern) {
    if (!pattern._compiled) {
      const before = (pattern.atBreak ? "[\\r\\n][\\t ]*" : "") + (pattern.before ? "(?:" + pattern.before + ")" : "");
      pattern._compiled = new RegExp(
        (before ? "(" + before + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? "\\" : "") + pattern.character + (pattern.after ? "(?:" + pattern.after + ")" : ""),
        "g"
      );
    }
    return pattern._compiled;
  }
  function containerPhrasing(parent, state, info) {
    const indexStack = state.indexStack;
    const children = parent.children || [];
    const results = [];
    let index2 = -1;
    let before = info.before;
    let encodeAfter;
    indexStack.push(-1);
    let tracker = state.createTracker(info);
    while (++index2 < children.length) {
      const child = children[index2];
      let after;
      indexStack[indexStack.length - 1] = index2;
      if (index2 + 1 < children.length) {
        let handle2 = state.handle.handlers[children[index2 + 1].type];
        if (handle2 && handle2.peek) handle2 = handle2.peek;
        after = handle2 ? handle2(children[index2 + 1], parent, state, {
          before: "",
          after: "",
          ...tracker.current()
        }).charAt(0) : "";
      } else {
        after = info.after;
      }
      if (results.length > 0 && (before === "\r" || before === "\n") && child.type === "html") {
        results[results.length - 1] = results[results.length - 1].replace(
          /(\r?\n|\r)$/,
          " "
        );
        before = " ";
        tracker = state.createTracker(info);
        tracker.move(results.join(""));
      }
      let value = state.handle(child, parent, state, {
        ...tracker.current(),
        after,
        before
      });
      if (encodeAfter && encodeAfter === value.slice(0, 1)) {
        value = encodeCharacterReference(encodeAfter.charCodeAt(0)) + value.slice(1);
      }
      const encodingInfo = state.attentionEncodeSurroundingInfo;
      state.attentionEncodeSurroundingInfo = void 0;
      encodeAfter = void 0;
      if (encodingInfo) {
        if (results.length > 0 && encodingInfo.before && before === results[results.length - 1].slice(-1)) {
          results[results.length - 1] = results[results.length - 1].slice(0, -1) + encodeCharacterReference(before.charCodeAt(0));
        }
        if (encodingInfo.after) encodeAfter = after;
      }
      tracker.move(value);
      results.push(value);
      before = value.slice(-1);
    }
    indexStack.pop();
    return results.join("");
  }
  function containerFlow(parent, state, info) {
    const indexStack = state.indexStack;
    const children = parent.children || [];
    const tracker = state.createTracker(info);
    const results = [];
    let index2 = -1;
    indexStack.push(-1);
    while (++index2 < children.length) {
      const child = children[index2];
      indexStack[indexStack.length - 1] = index2;
      results.push(
        tracker.move(
          state.handle(child, parent, state, {
            before: "\n",
            after: "\n",
            ...tracker.current()
          })
        )
      );
      if (child.type !== "list") {
        state.bulletLastUsed = void 0;
      }
      if (index2 < children.length - 1) {
        results.push(
          tracker.move(between(child, children[index2 + 1], parent, state))
        );
      }
    }
    indexStack.pop();
    return results.join("");
  }
  function between(left, right, parent, state) {
    let index2 = state.join.length;
    while (index2--) {
      const result = state.join[index2](left, right, parent, state);
      if (result === true || result === 1) {
        break;
      }
      if (typeof result === "number") {
        return "\n".repeat(1 + result);
      }
      if (result === false) {
        return "\n\n<!---->\n\n";
      }
    }
    return "\n\n";
  }
  const eol = /\r?\n|\r/g;
  function indentLines(value, map2) {
    const result = [];
    let start = 0;
    let line = 0;
    let match;
    while (match = eol.exec(value)) {
      one2(value.slice(start, match.index));
      result.push(match[0]);
      start = match.index + match[0].length;
      line++;
    }
    one2(value.slice(start));
    return result.join("");
    function one2(value2) {
      result.push(map2(value2, line, !value2));
    }
  }
  function safe(state, input, config) {
    const value = (config.before || "") + (input || "") + (config.after || "");
    const positions = [];
    const result = [];
    const infos = {};
    let index2 = -1;
    while (++index2 < state.unsafe.length) {
      const pattern = state.unsafe[index2];
      if (!patternInScope(state.stack, pattern)) {
        continue;
      }
      const expression = state.compilePattern(pattern);
      let match;
      while (match = expression.exec(value)) {
        const before = "before" in pattern || Boolean(pattern.atBreak);
        const after = "after" in pattern;
        const position2 = match.index + (before ? match[1].length : 0);
        if (positions.includes(position2)) {
          if (infos[position2].before && !before) {
            infos[position2].before = false;
          }
          if (infos[position2].after && !after) {
            infos[position2].after = false;
          }
        } else {
          positions.push(position2);
          infos[position2] = { before, after };
        }
      }
    }
    positions.sort(numerical);
    let start = config.before ? config.before.length : 0;
    const end = value.length - (config.after ? config.after.length : 0);
    index2 = -1;
    while (++index2 < positions.length) {
      const position2 = positions[index2];
      if (position2 < start || position2 >= end) {
        continue;
      }
      if (position2 + 1 < end && positions[index2 + 1] === position2 + 1 && infos[position2].after && !infos[position2 + 1].before && !infos[position2 + 1].after || positions[index2 - 1] === position2 - 1 && infos[position2].before && !infos[position2 - 1].before && !infos[position2 - 1].after) {
        continue;
      }
      if (start !== position2) {
        result.push(escapeBackslashes(value.slice(start, position2), "\\"));
      }
      start = position2;
      if (/[!-/:-@[-`{-~]/.test(value.charAt(position2)) && (!config.encode || !config.encode.includes(value.charAt(position2)))) {
        result.push("\\");
      } else {
        result.push(encodeCharacterReference(value.charCodeAt(position2)));
        start++;
      }
    }
    result.push(escapeBackslashes(value.slice(start, end), config.after));
    return result.join("");
  }
  function numerical(a2, b2) {
    return a2 - b2;
  }
  function escapeBackslashes(value, after) {
    const expression = /\\(?=[!-/:-@[-`{-~])/g;
    const positions = [];
    const results = [];
    const whole = value + after;
    let index2 = -1;
    let start = 0;
    let match;
    while (match = expression.exec(whole)) {
      positions.push(match.index);
    }
    while (++index2 < positions.length) {
      if (start !== positions[index2]) {
        results.push(value.slice(start, positions[index2]));
      }
      results.push("\\");
      start = positions[index2];
    }
    results.push(value.slice(start));
    return results.join("");
  }
  function track(config) {
    const options = config || {};
    const now = options.now || {};
    let lineShift = options.lineShift || 0;
    let line = now.line || 1;
    let column = now.column || 1;
    return { move, current, shift: shift2 };
    function current() {
      return { now: { line, column }, lineShift };
    }
    function shift2(value) {
      lineShift += value;
    }
    function move(input) {
      const value = input || "";
      const chunks = value.split(/\r?\n|\r/g);
      const tail = chunks[chunks.length - 1];
      line += chunks.length - 1;
      column = chunks.length === 1 ? column + tail.length : 1 + tail.length + lineShift;
      return value;
    }
  }
  function toMarkdown$1(tree, options) {
    const settings = options || {};
    const state = {
      associationId: association,
      containerPhrasing: containerPhrasingBound,
      containerFlow: containerFlowBound,
      createTracker: track,
      compilePattern,
      enter,

handlers: { ...handle },
handle: void 0,
      indentLines,
      indexStack: [],
      join: [...join],
      options: {},
      safe: safeBound,
      stack: [],
      unsafe: [...unsafe]
    };
    configure(state, settings);
    if (state.options.tightDefinitions) {
      state.join.push(joinDefinition);
    }
    state.handle = zwitch("type", {
      invalid,
      unknown,
      handlers: state.handlers
    });
    let result = state.handle(tree, void 0, state, {
      before: "\n",
      after: "\n",
      now: { line: 1, column: 1 },
      lineShift: 0
    });
    if (result && result.charCodeAt(result.length - 1) !== 10 && result.charCodeAt(result.length - 1) !== 13) {
      result += "\n";
    }
    return result;
    function enter(name) {
      state.stack.push(name);
      return exit2;
      function exit2() {
        state.stack.pop();
      }
    }
  }
  function invalid(value) {
    throw new Error("Cannot handle value `" + value + "`, expected node");
  }
  function unknown(value) {
    const node2 = (
value
    );
    throw new Error("Cannot handle unknown node `" + node2.type + "`");
  }
  function joinDefinition(left, right) {
    if (left.type === "definition" && left.type === right.type) {
      return 0;
    }
  }
  function containerPhrasingBound(parent, info) {
    return containerPhrasing(parent, this, info);
  }
  function containerFlowBound(parent, info) {
    return containerFlow(parent, this, info);
  }
  function safeBound(value, config) {
    return safe(this, value, config);
  }
  function gfmTableFromMarkdown() {
    return {
      enter: {
        table: enterTable,
        tableData: enterCell,
        tableHeader: enterCell,
        tableRow: enterRow
      },
      exit: {
        codeText: exitCodeText,
        table: exitTable,
        tableData: exit,
        tableHeader: exit,
        tableRow: exit
      }
    };
  }
  function enterTable(token) {
    const align = token._align;
    this.enter(
      {
        type: "table",
        align: align.map(function(d2) {
          return d2 === "none" ? null : d2;
        }),
        children: []
      },
      token
    );
    this.data.inTable = true;
  }
  function exitTable(token) {
    this.exit(token);
    this.data.inTable = void 0;
  }
  function enterRow(token) {
    this.enter({ type: "tableRow", children: [] }, token);
  }
  function exit(token) {
    this.exit(token);
  }
  function enterCell(token) {
    this.enter({ type: "tableCell", children: [] }, token);
  }
  function exitCodeText(token) {
    let value = this.resume();
    if (this.data.inTable) {
      value = value.replace(/\\([\\|])/g, replace);
    }
    const node2 = this.stack[this.stack.length - 1];
    ok$1(node2.type === "inlineCode");
    node2.value = value;
    this.exit(token);
  }
  function replace($0, $1) {
    return $1 === "|" ? $1 : $0;
  }
  function gfmTableToMarkdown(options) {
    const settings = {};
    const padding = settings.tableCellPadding;
    const alignDelimiters = settings.tablePipeAlign;
    const stringLength = settings.stringLength;
    const around = padding ? " " : "|";
    return {
      unsafe: [
        { character: "\r", inConstruct: "tableCell" },
        { character: "\n", inConstruct: "tableCell" },

{ atBreak: true, character: "|", after: "[	 :-]" },
{ character: "|", inConstruct: "tableCell" },

{ atBreak: true, character: ":", after: "-" },




{ atBreak: true, character: "-", after: "[:|-]" }
      ],
      handlers: {
        inlineCode: inlineCodeWithTable,
        table: handleTable,
        tableCell: handleTableCell,
        tableRow: handleTableRow
      }
    };
    function handleTable(node2, _2, state, info) {
      return serializeData(handleTableAsData(node2, state, info), node2.align);
    }
    function handleTableRow(node2, _2, state, info) {
      const row = handleTableRowAsData(node2, state, info);
      const value = serializeData([row]);
      return value.slice(0, value.indexOf("\n"));
    }
    function handleTableCell(node2, _2, state, info) {
      const exit2 = state.enter("tableCell");
      const subexit = state.enter("phrasing");
      const value = state.containerPhrasing(node2, {
        ...info,
        before: around,
        after: around
      });
      subexit();
      exit2();
      return value;
    }
    function serializeData(matrix, align) {
      return markdownTable(matrix, {
        align,
alignDelimiters,
padding,
stringLength
      });
    }
    function handleTableAsData(node2, state, info) {
      const children = node2.children;
      let index2 = -1;
      const result = [];
      const subexit = state.enter("table");
      while (++index2 < children.length) {
        result[index2] = handleTableRowAsData(children[index2], state, info);
      }
      subexit();
      return result;
    }
    function handleTableRowAsData(node2, state, info) {
      const children = node2.children;
      let index2 = -1;
      const result = [];
      const subexit = state.enter("tableRow");
      while (++index2 < children.length) {
        result[index2] = handleTableCell(children[index2], node2, state, info);
      }
      subexit();
      return result;
    }
    function inlineCodeWithTable(node2, parent, state) {
      let value = handle.inlineCode(node2, parent, state);
      if (state.stack.includes("tableCell")) {
        value = value.replace(/\|/g, "\\$&");
      }
      return value;
    }
  }
  function gfmTaskListItemFromMarkdown() {
    return {
      exit: {
        taskListCheckValueChecked: exitCheck,
        taskListCheckValueUnchecked: exitCheck,
        paragraph: exitParagraphWithTaskListItem
      }
    };
  }
  function gfmTaskListItemToMarkdown() {
    return {
      unsafe: [{ atBreak: true, character: "-", after: "[:|-]" }],
      handlers: { listItem: listItemWithTaskListItem }
    };
  }
  function exitCheck(token) {
    const node2 = this.stack[this.stack.length - 2];
    ok$1(node2.type === "listItem");
    node2.checked = token.type === "taskListCheckValueChecked";
  }
  function exitParagraphWithTaskListItem(token) {
    const parent = this.stack[this.stack.length - 2];
    if (parent && parent.type === "listItem" && typeof parent.checked === "boolean") {
      const node2 = this.stack[this.stack.length - 1];
      ok$1(node2.type === "paragraph");
      const head2 = node2.children[0];
      if (head2 && head2.type === "text") {
        const siblings2 = parent.children;
        let index2 = -1;
        let firstParaghraph;
        while (++index2 < siblings2.length) {
          const sibling = siblings2[index2];
          if (sibling.type === "paragraph") {
            firstParaghraph = sibling;
            break;
          }
        }
        if (firstParaghraph === node2) {
          head2.value = head2.value.slice(1);
          if (head2.value.length === 0) {
            node2.children.shift();
          } else if (node2.position && head2.position && typeof head2.position.start.offset === "number") {
            head2.position.start.column++;
            head2.position.start.offset++;
            node2.position.start = Object.assign({}, head2.position.start);
          }
        }
      }
    }
    this.exit(token);
  }
  function listItemWithTaskListItem(node2, parent, state, info) {
    const head2 = node2.children[0];
    const checkable = typeof node2.checked === "boolean" && head2 && head2.type === "paragraph";
    const checkbox = "[" + (node2.checked ? "x" : " ") + "] ";
    const tracker = state.createTracker(info);
    if (checkable) {
      tracker.move(checkbox);
    }
    let value = handle.listItem(node2, parent, state, {
      ...info,
      ...tracker.current()
    });
    if (checkable) {
      value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
    }
    return value;
    function check($0) {
      return $0 + checkbox;
    }
  }
  function gfmFromMarkdown() {
    return [
      gfmAutolinkLiteralFromMarkdown(),
      gfmFootnoteFromMarkdown(),
      gfmStrikethroughFromMarkdown(),
      gfmTableFromMarkdown(),
      gfmTaskListItemFromMarkdown()
    ];
  }
  function gfmToMarkdown(options) {
    return {
      extensions: [
        gfmAutolinkLiteralToMarkdown(),
        gfmFootnoteToMarkdown(),
        gfmStrikethroughToMarkdown(),
        gfmTableToMarkdown(),
        gfmTaskListItemToMarkdown()
      ]
    };
  }
  function blockquote(state, node2) {
    const result = {
      type: "element",
      tagName: "blockquote",
      properties: {},
      children: state.wrap(state.all(node2), true)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function hardBreak(state, node2) {
    const result = { type: "element", tagName: "br", properties: {}, children: [] };
    state.patch(node2, result);
    return [state.applyData(node2, result), { type: "text", value: "\n" }];
  }
  function code$1(state, node2) {
    const value = node2.value ? node2.value + "\n" : "";
    const properties = {};
    const language = node2.lang ? node2.lang.split(/\s+/) : [];
    if (language.length > 0) {
      properties.className = ["language-" + language[0]];
    }
    let result = {
      type: "element",
      tagName: "code",
      properties,
      children: [{ type: "text", value }]
    };
    if (node2.meta) {
      result.data = { meta: node2.meta };
    }
    state.patch(node2, result);
    result = state.applyData(node2, result);
    result = { type: "element", tagName: "pre", properties: {}, children: [result] };
    state.patch(node2, result);
    return result;
  }
  function strikethrough(state, node2) {
    const result = {
      type: "element",
      tagName: "del",
      properties: {},
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function emphasis(state, node2) {
    const result = {
      type: "element",
      tagName: "em",
      properties: {},
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function footnoteReference(state, node2) {
    const clobberPrefix = typeof state.options.clobberPrefix === "string" ? state.options.clobberPrefix : "user-content-";
    const id = String(node2.identifier).toUpperCase();
    const safeId = normalizeUri(id.toLowerCase());
    const index2 = state.footnoteOrder.indexOf(id);
    let counter;
    let reuseCounter = state.footnoteCounts.get(id);
    if (reuseCounter === void 0) {
      reuseCounter = 0;
      state.footnoteOrder.push(id);
      counter = state.footnoteOrder.length;
    } else {
      counter = index2 + 1;
    }
    reuseCounter += 1;
    state.footnoteCounts.set(id, reuseCounter);
    const link2 = {
      type: "element",
      tagName: "a",
      properties: {
        href: "#" + clobberPrefix + "fn-" + safeId,
        id: clobberPrefix + "fnref-" + safeId + (reuseCounter > 1 ? "-" + reuseCounter : ""),
        dataFootnoteRef: true,
        ariaDescribedBy: ["footnote-label"]
      },
      children: [{ type: "text", value: String(counter) }]
    };
    state.patch(node2, link2);
    const sup = {
      type: "element",
      tagName: "sup",
      properties: {},
      children: [link2]
    };
    state.patch(node2, sup);
    return state.applyData(node2, sup);
  }
  function heading(state, node2) {
    const result = {
      type: "element",
      tagName: "h" + node2.depth,
      properties: {},
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function html(state, node2) {
    if (state.options.allowDangerousHtml) {
      const result = { type: "raw", value: node2.value };
      state.patch(node2, result);
      return state.applyData(node2, result);
    }
    return void 0;
  }
  function revert(state, node2) {
    const subtype = node2.referenceType;
    let suffix = "]";
    if (subtype === "collapsed") {
      suffix += "[]";
    } else if (subtype === "full") {
      suffix += "[" + (node2.label || node2.identifier) + "]";
    }
    if (node2.type === "imageReference") {
      return [{ type: "text", value: "![" + node2.alt + suffix }];
    }
    const contents = state.all(node2);
    const head2 = contents[0];
    if (head2 && head2.type === "text") {
      head2.value = "[" + head2.value;
    } else {
      contents.unshift({ type: "text", value: "[" });
    }
    const tail = contents[contents.length - 1];
    if (tail && tail.type === "text") {
      tail.value += suffix;
    } else {
      contents.push({ type: "text", value: suffix });
    }
    return contents;
  }
  function imageReference(state, node2) {
    const id = String(node2.identifier).toUpperCase();
    const definition2 = state.definitionById.get(id);
    if (!definition2) {
      return revert(state, node2);
    }
    const properties = { src: normalizeUri(definition2.url || ""), alt: node2.alt };
    if (definition2.title !== null && definition2.title !== void 0) {
      properties.title = definition2.title;
    }
    const result = { type: "element", tagName: "img", properties, children: [] };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function image(state, node2) {
    const properties = { src: normalizeUri(node2.url) };
    if (node2.alt !== null && node2.alt !== void 0) {
      properties.alt = node2.alt;
    }
    if (node2.title !== null && node2.title !== void 0) {
      properties.title = node2.title;
    }
    const result = { type: "element", tagName: "img", properties, children: [] };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function inlineCode(state, node2) {
    const text2 = { type: "text", value: node2.value.replace(/\r?\n|\r/g, " ") };
    state.patch(node2, text2);
    const result = {
      type: "element",
      tagName: "code",
      properties: {},
      children: [text2]
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function linkReference(state, node2) {
    const id = String(node2.identifier).toUpperCase();
    const definition2 = state.definitionById.get(id);
    if (!definition2) {
      return revert(state, node2);
    }
    const properties = { href: normalizeUri(definition2.url || "") };
    if (definition2.title !== null && definition2.title !== void 0) {
      properties.title = definition2.title;
    }
    const result = {
      type: "element",
      tagName: "a",
      properties,
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function link(state, node2) {
    const properties = { href: normalizeUri(node2.url) };
    if (node2.title !== null && node2.title !== void 0) {
      properties.title = node2.title;
    }
    const result = {
      type: "element",
      tagName: "a",
      properties,
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function listItem(state, node2, parent) {
    const results = state.all(node2);
    const loose = parent ? listLoose(parent) : listItemLoose(node2);
    const properties = {};
    const children = [];
    if (typeof node2.checked === "boolean") {
      const head2 = results[0];
      let paragraph2;
      if (head2 && head2.type === "element" && head2.tagName === "p") {
        paragraph2 = head2;
      } else {
        paragraph2 = { type: "element", tagName: "p", properties: {}, children: [] };
        results.unshift(paragraph2);
      }
      if (paragraph2.children.length > 0) {
        paragraph2.children.unshift({ type: "text", value: " " });
      }
      paragraph2.children.unshift({
        type: "element",
        tagName: "input",
        properties: { type: "checkbox", checked: node2.checked, disabled: true },
        children: []
      });
      properties.className = ["task-list-item"];
    }
    let index2 = -1;
    while (++index2 < results.length) {
      const child = results[index2];
      if (loose || index2 !== 0 || child.type !== "element" || child.tagName !== "p") {
        children.push({ type: "text", value: "\n" });
      }
      if (child.type === "element" && child.tagName === "p" && !loose) {
        children.push(...child.children);
      } else {
        children.push(child);
      }
    }
    const tail = results[results.length - 1];
    if (tail && (loose || tail.type !== "element" || tail.tagName !== "p")) {
      children.push({ type: "text", value: "\n" });
    }
    const result = { type: "element", tagName: "li", properties, children };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function listLoose(node2) {
    let loose = false;
    if (node2.type === "list") {
      loose = node2.spread || false;
      const children = node2.children;
      let index2 = -1;
      while (!loose && ++index2 < children.length) {
        loose = listItemLoose(children[index2]);
      }
    }
    return loose;
  }
  function listItemLoose(node2) {
    const spread = node2.spread;
    return spread === null || spread === void 0 ? node2.children.length > 1 : spread;
  }
  function list(state, node2) {
    const properties = {};
    const results = state.all(node2);
    let index2 = -1;
    if (typeof node2.start === "number" && node2.start !== 1) {
      properties.start = node2.start;
    }
    while (++index2 < results.length) {
      const child = results[index2];
      if (child.type === "element" && child.tagName === "li" && child.properties && Array.isArray(child.properties.className) && child.properties.className.includes("task-list-item")) {
        properties.className = ["contains-task-list"];
        break;
      }
    }
    const result = {
      type: "element",
      tagName: node2.ordered ? "ol" : "ul",
      properties,
      children: state.wrap(results, true)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function paragraph(state, node2) {
    const result = {
      type: "element",
      tagName: "p",
      properties: {},
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function root(state, node2) {
    const result = { type: "root", children: state.wrap(state.all(node2)) };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function strong(state, node2) {
    const result = {
      type: "element",
      tagName: "strong",
      properties: {},
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  const pointEnd = point("end");
  const pointStart = point("start");
  function point(type) {
    return point2;
    function point2(node2) {
      const point3 = node2 && node2.position && node2.position[type] || {};
      if (typeof point3.line === "number" && point3.line > 0 && typeof point3.column === "number" && point3.column > 0) {
        return {
          line: point3.line,
          column: point3.column,
          offset: typeof point3.offset === "number" && point3.offset > -1 ? point3.offset : void 0
        };
      }
    }
  }
  function position(node2) {
    const start = pointStart(node2);
    const end = pointEnd(node2);
    if (start && end) {
      return { start, end };
    }
  }
  function table(state, node2) {
    const rows = state.all(node2);
    const firstRow = rows.shift();
    const tableContent = [];
    if (firstRow) {
      const head2 = {
        type: "element",
        tagName: "thead",
        properties: {},
        children: state.wrap([firstRow], true)
      };
      state.patch(node2.children[0], head2);
      tableContent.push(head2);
    }
    if (rows.length > 0) {
      const body2 = {
        type: "element",
        tagName: "tbody",
        properties: {},
        children: state.wrap(rows, true)
      };
      const start = pointStart(node2.children[1]);
      const end = pointEnd(node2.children[node2.children.length - 1]);
      if (start && end) body2.position = { start, end };
      tableContent.push(body2);
    }
    const result = {
      type: "element",
      tagName: "table",
      properties: {},
      children: state.wrap(tableContent, true)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function tableRow(state, node2, parent) {
    const siblings2 = parent ? parent.children : void 0;
    const rowIndex = siblings2 ? siblings2.indexOf(node2) : 1;
    const tagName = rowIndex === 0 ? "th" : "td";
    const align = parent && parent.type === "table" ? parent.align : void 0;
    const length = align ? align.length : node2.children.length;
    let cellIndex = -1;
    const cells2 = [];
    while (++cellIndex < length) {
      const cell = node2.children[cellIndex];
      const properties = {};
      const alignValue = align ? align[cellIndex] : void 0;
      if (alignValue) {
        properties.align = alignValue;
      }
      let result2 = { type: "element", tagName, properties, children: [] };
      if (cell) {
        result2.children = state.all(cell);
        state.patch(cell, result2);
        result2 = state.applyData(cell, result2);
      }
      cells2.push(result2);
    }
    const result = {
      type: "element",
      tagName: "tr",
      properties: {},
      children: state.wrap(cells2, true)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function tableCell(state, node2) {
    const result = {
      type: "element",
      tagName: "td",
properties: {},
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  const tab = 9;
  const space = 32;
  function trimLines(value) {
    const source = String(value);
    const search2 = /\r?\n|\r/g;
    let match = search2.exec(source);
    let last = 0;
    const lines = [];
    while (match) {
      lines.push(
        trimLine(source.slice(last, match.index), last > 0, true),
        match[0]
      );
      last = match.index + match[0].length;
      match = search2.exec(source);
    }
    lines.push(trimLine(source.slice(last), last > 0, false));
    return lines.join("");
  }
  function trimLine(value, start, end) {
    let startIndex = 0;
    let endIndex = value.length;
    if (start) {
      let code2 = value.codePointAt(startIndex);
      while (code2 === tab || code2 === space) {
        startIndex++;
        code2 = value.codePointAt(startIndex);
      }
    }
    if (end) {
      let code2 = value.codePointAt(endIndex - 1);
      while (code2 === tab || code2 === space) {
        endIndex--;
        code2 = value.codePointAt(endIndex - 1);
      }
    }
    return endIndex > startIndex ? value.slice(startIndex, endIndex) : "";
  }
  function text$1(state, node2) {
    const result = { type: "text", value: trimLines(String(node2.value)) };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function thematicBreak(state, node2) {
    const result = {
      type: "element",
      tagName: "hr",
      properties: {},
      children: []
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  const handlers = {
    blockquote,
    break: hardBreak,
    code: code$1,
    delete: strikethrough,
    emphasis,
    footnoteReference,
    heading,
    html,
    imageReference,
    image,
    inlineCode,
    linkReference,
    link,
    listItem,
    list,
    paragraph,
root,
    strong,
    table,
    tableCell,
    tableRow,
    text: text$1,
    thematicBreak,
    toml: ignore,
    yaml: ignore,
    definition: ignore,
    footnoteDefinition: ignore
  };
  function ignore() {
    return void 0;
  }
  const VOID = -1;
  const PRIMITIVE = 0;
  const ARRAY = 1;
  const OBJECT = 2;
  const DATE = 3;
  const REGEXP = 4;
  const MAP = 5;
  const SET = 6;
  const ERROR = 7;
  const BIGINT = 8;
  const env = typeof self === "object" ? self : globalThis;
  const deserializer = ($2, _2) => {
    const as = (out, index2) => {
      $2.set(index2, out);
      return out;
    };
    const unpair = (index2) => {
      if ($2.has(index2))
        return $2.get(index2);
      const [type, value] = _2[index2];
      switch (type) {
        case PRIMITIVE:
        case VOID:
          return as(value, index2);
        case ARRAY: {
          const arr = as([], index2);
          for (const index3 of value)
            arr.push(unpair(index3));
          return arr;
        }
        case OBJECT: {
          const object = as({}, index2);
          for (const [key2, index3] of value)
            object[unpair(key2)] = unpair(index3);
          return object;
        }
        case DATE:
          return as(new Date(value), index2);
        case REGEXP: {
          const { source, flags } = value;
          return as(new RegExp(source, flags), index2);
        }
        case MAP: {
          const map2 = as( new Map(), index2);
          for (const [key2, index3] of value)
            map2.set(unpair(key2), unpair(index3));
          return map2;
        }
        case SET: {
          const set = as( new Set(), index2);
          for (const index3 of value)
            set.add(unpair(index3));
          return set;
        }
        case ERROR: {
          const { name, message } = value;
          return as(new env[name](message), index2);
        }
        case BIGINT:
          return as(BigInt(value), index2);
        case "BigInt":
          return as(Object(BigInt(value)), index2);
        case "ArrayBuffer":
          return as(new Uint8Array(value).buffer, value);
        case "DataView": {
          const { buffer } = new Uint8Array(value);
          return as(new DataView(buffer), value);
        }
      }
      return as(new env[type](value), index2);
    };
    return unpair;
  };
  const deserialize = (serialized) => deserializer( new Map(), serialized)(0);
  const EMPTY = "";
  const { toString } = {};
  const { keys } = Object;
  const typeOf = (value) => {
    const type = typeof value;
    if (type !== "object" || !value)
      return [PRIMITIVE, type];
    const asString = toString.call(value).slice(8, -1);
    switch (asString) {
      case "Array":
        return [ARRAY, EMPTY];
      case "Object":
        return [OBJECT, EMPTY];
      case "Date":
        return [DATE, EMPTY];
      case "RegExp":
        return [REGEXP, EMPTY];
      case "Map":
        return [MAP, EMPTY];
      case "Set":
        return [SET, EMPTY];
      case "DataView":
        return [ARRAY, asString];
    }
    if (asString.includes("Array"))
      return [ARRAY, asString];
    if (asString.includes("Error"))
      return [ERROR, asString];
    return [OBJECT, asString];
  };
  const shouldSkip = ([TYPE, type]) => TYPE === PRIMITIVE && (type === "function" || type === "symbol");
  const serializer = (strict, json, $2, _2) => {
    const as = (out, value) => {
      const index2 = _2.push(out) - 1;
      $2.set(value, index2);
      return index2;
    };
    const pair = (value) => {
      if ($2.has(value))
        return $2.get(value);
      let [TYPE, type] = typeOf(value);
      switch (TYPE) {
        case PRIMITIVE: {
          let entry = value;
          switch (type) {
            case "bigint":
              TYPE = BIGINT;
              entry = value.toString();
              break;
            case "function":
            case "symbol":
              if (strict)
                throw new TypeError("unable to serialize " + type);
              entry = null;
              break;
            case "undefined":
              return as([VOID], value);
          }
          return as([TYPE, entry], value);
        }
        case ARRAY: {
          if (type) {
            let spread = value;
            if (type === "DataView") {
              spread = new Uint8Array(value.buffer);
            } else if (type === "ArrayBuffer") {
              spread = new Uint8Array(value);
            }
            return as([type, [...spread]], value);
          }
          const arr = [];
          const index2 = as([TYPE, arr], value);
          for (const entry of value)
            arr.push(pair(entry));
          return index2;
        }
        case OBJECT: {
          if (type) {
            switch (type) {
              case "BigInt":
                return as([type, value.toString()], value);
              case "Boolean":
              case "Number":
              case "String":
                return as([type, value.valueOf()], value);
            }
          }
          if (json && "toJSON" in value)
            return pair(value.toJSON());
          const entries = [];
          const index2 = as([TYPE, entries], value);
          for (const key2 of keys(value)) {
            if (strict || !shouldSkip(typeOf(value[key2])))
              entries.push([pair(key2), pair(value[key2])]);
          }
          return index2;
        }
        case DATE:
          return as([TYPE, value.toISOString()], value);
        case REGEXP: {
          const { source, flags } = value;
          return as([TYPE, { source, flags }], value);
        }
        case MAP: {
          const entries = [];
          const index2 = as([TYPE, entries], value);
          for (const [key2, entry] of value) {
            if (strict || !(shouldSkip(typeOf(key2)) || shouldSkip(typeOf(entry))))
              entries.push([pair(key2), pair(entry)]);
          }
          return index2;
        }
        case SET: {
          const entries = [];
          const index2 = as([TYPE, entries], value);
          for (const entry of value) {
            if (strict || !shouldSkip(typeOf(entry)))
              entries.push(pair(entry));
          }
          return index2;
        }
      }
      const { message } = value;
      return as([TYPE, { name: type, message }], value);
    };
    return pair;
  };
  const serialize = (value, { json, lossy } = {}) => {
    const _2 = [];
    return serializer(!(json || lossy), !!json, new Map(), _2)(value), _2;
  };
  const structuredClone$1 = typeof structuredClone === "function" ? (
(any, options) => options && ("json" in options || "lossy" in options) ? deserialize(serialize(any, options)) : structuredClone(any)
  ) : (any, options) => deserialize(serialize(any, options));
  function defaultFootnoteBackContent(_2, rereferenceIndex) {
    const result = [{ type: "text", value: "↩" }];
    if (rereferenceIndex > 1) {
      result.push({
        type: "element",
        tagName: "sup",
        properties: {},
        children: [{ type: "text", value: String(rereferenceIndex) }]
      });
    }
    return result;
  }
  function defaultFootnoteBackLabel(referenceIndex, rereferenceIndex) {
    return "Back to reference " + (referenceIndex + 1) + (rereferenceIndex > 1 ? "-" + rereferenceIndex : "");
  }
  function footer(state) {
    const clobberPrefix = typeof state.options.clobberPrefix === "string" ? state.options.clobberPrefix : "user-content-";
    const footnoteBackContent = state.options.footnoteBackContent || defaultFootnoteBackContent;
    const footnoteBackLabel = state.options.footnoteBackLabel || defaultFootnoteBackLabel;
    const footnoteLabel = state.options.footnoteLabel || "Footnotes";
    const footnoteLabelTagName = state.options.footnoteLabelTagName || "h2";
    const footnoteLabelProperties = state.options.footnoteLabelProperties || {
      className: ["sr-only"]
    };
    const listItems = [];
    let referenceIndex = -1;
    while (++referenceIndex < state.footnoteOrder.length) {
      const definition2 = state.footnoteById.get(
        state.footnoteOrder[referenceIndex]
      );
      if (!definition2) {
        continue;
      }
      const content2 = state.all(definition2);
      const id = String(definition2.identifier).toUpperCase();
      const safeId = normalizeUri(id.toLowerCase());
      let rereferenceIndex = 0;
      const backReferences = [];
      const counts = state.footnoteCounts.get(id);
      while (counts !== void 0 && ++rereferenceIndex <= counts) {
        if (backReferences.length > 0) {
          backReferences.push({ type: "text", value: " " });
        }
        let children = typeof footnoteBackContent === "string" ? footnoteBackContent : footnoteBackContent(referenceIndex, rereferenceIndex);
        if (typeof children === "string") {
          children = { type: "text", value: children };
        }
        backReferences.push({
          type: "element",
          tagName: "a",
          properties: {
            href: "#" + clobberPrefix + "fnref-" + safeId + (rereferenceIndex > 1 ? "-" + rereferenceIndex : ""),
            dataFootnoteBackref: "",
            ariaLabel: typeof footnoteBackLabel === "string" ? footnoteBackLabel : footnoteBackLabel(referenceIndex, rereferenceIndex),
            className: ["data-footnote-backref"]
          },
          children: Array.isArray(children) ? children : [children]
        });
      }
      const tail = content2[content2.length - 1];
      if (tail && tail.type === "element" && tail.tagName === "p") {
        const tailTail = tail.children[tail.children.length - 1];
        if (tailTail && tailTail.type === "text") {
          tailTail.value += " ";
        } else {
          tail.children.push({ type: "text", value: " " });
        }
        tail.children.push(...backReferences);
      } else {
        content2.push(...backReferences);
      }
      const listItem2 = {
        type: "element",
        tagName: "li",
        properties: { id: clobberPrefix + "fn-" + safeId },
        children: state.wrap(content2, true)
      };
      state.patch(definition2, listItem2);
      listItems.push(listItem2);
    }
    if (listItems.length === 0) {
      return;
    }
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: true, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: footnoteLabelTagName,
          properties: {
            ...structuredClone$1(footnoteLabelProperties),
            id: "footnote-label"
          },
          children: [{ type: "text", value: footnoteLabel }]
        },
        { type: "text", value: "\n" },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: state.wrap(listItems, true)
        },
        { type: "text", value: "\n" }
      ]
    };
  }
  const own = {}.hasOwnProperty;
  const emptyOptions = {};
  function createState(tree, options) {
    const settings = emptyOptions;
    const definitionById = new Map();
    const footnoteById = new Map();
    const footnoteCounts = new Map();
    const handlers$1 = { ...handlers, ...settings.handlers };
    const state = {
      all: all2,
      applyData,
      definitionById,
      footnoteById,
      footnoteCounts,
      footnoteOrder: [],
      handlers: handlers$1,
      one: one2,
      options: settings,
      patch,
      wrap
    };
    visit(tree, function(node2) {
      if (node2.type === "definition" || node2.type === "footnoteDefinition") {
        const map2 = node2.type === "definition" ? definitionById : footnoteById;
        const id = String(node2.identifier).toUpperCase();
        if (!map2.has(id)) {
          map2.set(id, node2);
        }
      }
    });
    return state;
    function one2(node2, parent) {
      const type = node2.type;
      const handle2 = state.handlers[type];
      if (own.call(state.handlers, type) && handle2) {
        return handle2(state, node2, parent);
      }
      if (state.options.passThrough && state.options.passThrough.includes(type)) {
        if ("children" in node2) {
          const { children, ...shallow } = node2;
          const result = structuredClone$1(shallow);
          result.children = state.all(node2);
          return result;
        }
        return structuredClone$1(node2);
      }
      const unknown2 = state.options.unknownHandler || defaultUnknownHandler;
      return unknown2(state, node2, parent);
    }
    function all2(parent) {
      const values = [];
      if ("children" in parent) {
        const nodes = parent.children;
        let index2 = -1;
        while (++index2 < nodes.length) {
          const result = state.one(nodes[index2], parent);
          if (result) {
            if (index2 && nodes[index2 - 1].type === "break") {
              if (!Array.isArray(result) && result.type === "text") {
                result.value = trimMarkdownSpaceStart(result.value);
              }
              if (!Array.isArray(result) && result.type === "element") {
                const head2 = result.children[0];
                if (head2 && head2.type === "text") {
                  head2.value = trimMarkdownSpaceStart(head2.value);
                }
              }
            }
            if (Array.isArray(result)) {
              values.push(...result);
            } else {
              values.push(result);
            }
          }
        }
      }
      return values;
    }
  }
  function patch(from, to) {
    if (from.position) to.position = position(from);
  }
  function applyData(from, to) {
    let result = to;
    if (from && from.data) {
      const hName = from.data.hName;
      const hChildren = from.data.hChildren;
      const hProperties = from.data.hProperties;
      if (typeof hName === "string") {
        if (result.type === "element") {
          result.tagName = hName;
        } else {
          const children = "children" in result ? result.children : [result];
          result = { type: "element", tagName: hName, properties: {}, children };
        }
      }
      if (result.type === "element" && hProperties) {
        Object.assign(result.properties, structuredClone$1(hProperties));
      }
      if ("children" in result && result.children && hChildren !== null && hChildren !== void 0) {
        result.children = hChildren;
      }
    }
    return result;
  }
  function defaultUnknownHandler(state, node2) {
    const data = node2.data || {};
    const result = "value" in node2 && !(own.call(data, "hProperties") || own.call(data, "hChildren")) ? { type: "text", value: node2.value } : {
      type: "element",
      tagName: "div",
      properties: {},
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function wrap(nodes, loose) {
    const result = [];
    let index2 = -1;
    if (loose) {
      result.push({ type: "text", value: "\n" });
    }
    while (++index2 < nodes.length) {
      if (index2) result.push({ type: "text", value: "\n" });
      result.push(nodes[index2]);
    }
    if (loose && nodes.length > 0) {
      result.push({ type: "text", value: "\n" });
    }
    return result;
  }
  function trimMarkdownSpaceStart(value) {
    let index2 = 0;
    let code2 = value.charCodeAt(index2);
    while (code2 === 9 || code2 === 32) {
      index2++;
      code2 = value.charCodeAt(index2);
    }
    return value.slice(index2);
  }
  function toHast(tree, options) {
    const state = createState(tree);
    const node2 = state.one(tree, void 0);
    const foot = footer(state);
    const result = Array.isArray(node2) ? { type: "root", children: node2 } : node2 || { type: "root", children: [] };
    if (foot) {
      result.children.push({ type: "text", value: "\n" }, foot);
    }
    return result;
  }
  const wwwPrefix = {
    tokenize: tokenizeWwwPrefix,
    partial: true
  };
  const domain = {
    tokenize: tokenizeDomain,
    partial: true
  };
  const path = {
    tokenize: tokenizePath,
    partial: true
  };
  const trail = {
    tokenize: tokenizeTrail,
    partial: true
  };
  const emailDomainDotTrail = {
    tokenize: tokenizeEmailDomainDotTrail,
    partial: true
  };
  const wwwAutolink = {
    name: "wwwAutolink",
    tokenize: tokenizeWwwAutolink,
    previous: previousWww
  };
  const protocolAutolink = {
    name: "protocolAutolink",
    tokenize: tokenizeProtocolAutolink,
    previous: previousProtocol
  };
  const emailAutolink = {
    name: "emailAutolink",
    tokenize: tokenizeEmailAutolink,
    previous: previousEmail
  };
  const text = {};
  function gfmAutolinkLiteral() {
    return {
      text
    };
  }
  let code = 48;
  while (code < 123) {
    text[code] = emailAutolink;
    code++;
    if (code === 58) code = 65;
    else if (code === 91) code = 97;
  }
  text[43] = emailAutolink;
  text[45] = emailAutolink;
  text[46] = emailAutolink;
  text[95] = emailAutolink;
  text[72] = [emailAutolink, protocolAutolink];
  text[104] = [emailAutolink, protocolAutolink];
  text[87] = [emailAutolink, wwwAutolink];
  text[119] = [emailAutolink, wwwAutolink];
  function tokenizeEmailAutolink(effects, ok2, nok) {
    const self2 = this;
    let dot;
    let data;
    return start;
    function start(code2) {
      if (!gfmAtext(code2) || !previousEmail.call(self2, self2.previous) || previousUnbalanced(self2.events)) {
        return nok(code2);
      }
      effects.enter("literalAutolink");
      effects.enter("literalAutolinkEmail");
      return atext(code2);
    }
    function atext(code2) {
      if (gfmAtext(code2)) {
        effects.consume(code2);
        return atext;
      }
      if (code2 === 64) {
        effects.consume(code2);
        return emailDomain;
      }
      return nok(code2);
    }
    function emailDomain(code2) {
      if (code2 === 46) {
        return effects.check(emailDomainDotTrail, emailDomainAfter, emailDomainDot)(code2);
      }
      if (code2 === 45 || code2 === 95 || asciiAlphanumeric(code2)) {
        data = true;
        effects.consume(code2);
        return emailDomain;
      }
      return emailDomainAfter(code2);
    }
    function emailDomainDot(code2) {
      effects.consume(code2);
      dot = true;
      return emailDomain;
    }
    function emailDomainAfter(code2) {
      if (data && dot && asciiAlpha(self2.previous)) {
        effects.exit("literalAutolinkEmail");
        effects.exit("literalAutolink");
        return ok2(code2);
      }
      return nok(code2);
    }
  }
  function tokenizeWwwAutolink(effects, ok2, nok) {
    const self2 = this;
    return wwwStart;
    function wwwStart(code2) {
      if (code2 !== 87 && code2 !== 119 || !previousWww.call(self2, self2.previous) || previousUnbalanced(self2.events)) {
        return nok(code2);
      }
      effects.enter("literalAutolink");
      effects.enter("literalAutolinkWww");
      return effects.check(wwwPrefix, effects.attempt(domain, effects.attempt(path, wwwAfter), nok), nok)(code2);
    }
    function wwwAfter(code2) {
      effects.exit("literalAutolinkWww");
      effects.exit("literalAutolink");
      return ok2(code2);
    }
  }
  function tokenizeProtocolAutolink(effects, ok2, nok) {
    const self2 = this;
    let buffer = "";
    let seen = false;
    return protocolStart;
    function protocolStart(code2) {
      if ((code2 === 72 || code2 === 104) && previousProtocol.call(self2, self2.previous) && !previousUnbalanced(self2.events)) {
        effects.enter("literalAutolink");
        effects.enter("literalAutolinkHttp");
        buffer += String.fromCodePoint(code2);
        effects.consume(code2);
        return protocolPrefixInside;
      }
      return nok(code2);
    }
    function protocolPrefixInside(code2) {
      if (asciiAlpha(code2) && buffer.length < 5) {
        buffer += String.fromCodePoint(code2);
        effects.consume(code2);
        return protocolPrefixInside;
      }
      if (code2 === 58) {
        const protocol = buffer.toLowerCase();
        if (protocol === "http" || protocol === "https") {
          effects.consume(code2);
          return protocolSlashesInside;
        }
      }
      return nok(code2);
    }
    function protocolSlashesInside(code2) {
      if (code2 === 47) {
        effects.consume(code2);
        if (seen) {
          return afterProtocol;
        }
        seen = true;
        return protocolSlashesInside;
      }
      return nok(code2);
    }
    function afterProtocol(code2) {
      return code2 === null || asciiControl(code2) || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2) || unicodePunctuation(code2) ? nok(code2) : effects.attempt(domain, effects.attempt(path, protocolAfter), nok)(code2);
    }
    function protocolAfter(code2) {
      effects.exit("literalAutolinkHttp");
      effects.exit("literalAutolink");
      return ok2(code2);
    }
  }
  function tokenizeWwwPrefix(effects, ok2, nok) {
    let size2 = 0;
    return wwwPrefixInside;
    function wwwPrefixInside(code2) {
      if ((code2 === 87 || code2 === 119) && size2 < 3) {
        size2++;
        effects.consume(code2);
        return wwwPrefixInside;
      }
      if (code2 === 46 && size2 === 3) {
        effects.consume(code2);
        return wwwPrefixAfter;
      }
      return nok(code2);
    }
    function wwwPrefixAfter(code2) {
      return code2 === null ? nok(code2) : ok2(code2);
    }
  }
  function tokenizeDomain(effects, ok2, nok) {
    let underscoreInLastSegment;
    let underscoreInLastLastSegment;
    let seen;
    return domainInside;
    function domainInside(code2) {
      if (code2 === 46 || code2 === 95) {
        return effects.check(trail, domainAfter, domainAtPunctuation)(code2);
      }
      if (code2 === null || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2) || code2 !== 45 && unicodePunctuation(code2)) {
        return domainAfter(code2);
      }
      seen = true;
      effects.consume(code2);
      return domainInside;
    }
    function domainAtPunctuation(code2) {
      if (code2 === 95) {
        underscoreInLastSegment = true;
      } else {
        underscoreInLastLastSegment = underscoreInLastSegment;
        underscoreInLastSegment = void 0;
      }
      effects.consume(code2);
      return domainInside;
    }
    function domainAfter(code2) {
      if (underscoreInLastLastSegment || underscoreInLastSegment || !seen) {
        return nok(code2);
      }
      return ok2(code2);
    }
  }
  function tokenizePath(effects, ok2) {
    let sizeOpen = 0;
    let sizeClose = 0;
    return pathInside;
    function pathInside(code2) {
      if (code2 === 40) {
        sizeOpen++;
        effects.consume(code2);
        return pathInside;
      }
      if (code2 === 41 && sizeClose < sizeOpen) {
        return pathAtPunctuation(code2);
      }
      if (code2 === 33 || code2 === 34 || code2 === 38 || code2 === 39 || code2 === 41 || code2 === 42 || code2 === 44 || code2 === 46 || code2 === 58 || code2 === 59 || code2 === 60 || code2 === 63 || code2 === 93 || code2 === 95 || code2 === 126) {
        return effects.check(trail, ok2, pathAtPunctuation)(code2);
      }
      if (code2 === null || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2)) {
        return ok2(code2);
      }
      effects.consume(code2);
      return pathInside;
    }
    function pathAtPunctuation(code2) {
      if (code2 === 41) {
        sizeClose++;
      }
      effects.consume(code2);
      return pathInside;
    }
  }
  function tokenizeTrail(effects, ok2, nok) {
    return trail2;
    function trail2(code2) {
      if (code2 === 33 || code2 === 34 || code2 === 39 || code2 === 41 || code2 === 42 || code2 === 44 || code2 === 46 || code2 === 58 || code2 === 59 || code2 === 63 || code2 === 95 || code2 === 126) {
        effects.consume(code2);
        return trail2;
      }
      if (code2 === 38) {
        effects.consume(code2);
        return trailCharacterReferenceStart;
      }
      if (code2 === 93) {
        effects.consume(code2);
        return trailBracketAfter;
      }
      if (
code2 === 60 ||
code2 === null || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2)
      ) {
        return ok2(code2);
      }
      return nok(code2);
    }
    function trailBracketAfter(code2) {
      if (code2 === null || code2 === 40 || code2 === 91 || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2)) {
        return ok2(code2);
      }
      return trail2(code2);
    }
    function trailCharacterReferenceStart(code2) {
      return asciiAlpha(code2) ? trailCharacterReferenceInside(code2) : nok(code2);
    }
    function trailCharacterReferenceInside(code2) {
      if (code2 === 59) {
        effects.consume(code2);
        return trail2;
      }
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        return trailCharacterReferenceInside;
      }
      return nok(code2);
    }
  }
  function tokenizeEmailDomainDotTrail(effects, ok2, nok) {
    return start;
    function start(code2) {
      effects.consume(code2);
      return after;
    }
    function after(code2) {
      return asciiAlphanumeric(code2) ? nok(code2) : ok2(code2);
    }
  }
  function previousWww(code2) {
    return code2 === null || code2 === 40 || code2 === 42 || code2 === 95 || code2 === 91 || code2 === 93 || code2 === 126 || markdownLineEndingOrSpace(code2);
  }
  function previousProtocol(code2) {
    return !asciiAlpha(code2);
  }
  function previousEmail(code2) {
    return !(code2 === 47 || gfmAtext(code2));
  }
  function gfmAtext(code2) {
    return code2 === 43 || code2 === 45 || code2 === 46 || code2 === 95 || asciiAlphanumeric(code2);
  }
  function previousUnbalanced(events) {
    let index2 = events.length;
    let result = false;
    while (index2--) {
      const token = events[index2][1];
      if ((token.type === "labelLink" || token.type === "labelImage") && !token._balanced) {
        result = true;
        break;
      }
      if (token._gfmAutolinkLiteralWalkedInto) {
        result = false;
        break;
      }
    }
    if (events.length > 0 && !result) {
      events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
    }
    return result;
  }
  const indent = {
    tokenize: tokenizeIndent,
    partial: true
  };
  function gfmFootnote() {
    return {
      document: {
        [91]: {
          name: "gfmFootnoteDefinition",
          tokenize: tokenizeDefinitionStart,
          continuation: {
            tokenize: tokenizeDefinitionContinuation
          },
          exit: gfmFootnoteDefinitionEnd
        }
      },
      text: {
        [91]: {
          name: "gfmFootnoteCall",
          tokenize: tokenizeGfmFootnoteCall
        },
        [93]: {
          name: "gfmPotentialFootnoteCall",
          add: "after",
          tokenize: tokenizePotentialGfmFootnoteCall,
          resolveTo: resolveToPotentialGfmFootnoteCall
        }
      }
    };
  }
  function tokenizePotentialGfmFootnoteCall(effects, ok2, nok) {
    const self2 = this;
    let index2 = self2.events.length;
    const defined = self2.parser.gfmFootnotes || (self2.parser.gfmFootnotes = []);
    let labelStart;
    while (index2--) {
      const token = self2.events[index2][1];
      if (token.type === "labelImage") {
        labelStart = token;
        break;
      }
      if (token.type === "gfmFootnoteCall" || token.type === "labelLink" || token.type === "label" || token.type === "image" || token.type === "link") {
        break;
      }
    }
    return start;
    function start(code2) {
      if (!labelStart || !labelStart._balanced) {
        return nok(code2);
      }
      const id = normalizeIdentifier(self2.sliceSerialize({
        start: labelStart.end,
        end: self2.now()
      }));
      if (id.codePointAt(0) !== 94 || !defined.includes(id.slice(1))) {
        return nok(code2);
      }
      effects.enter("gfmFootnoteCallLabelMarker");
      effects.consume(code2);
      effects.exit("gfmFootnoteCallLabelMarker");
      return ok2(code2);
    }
  }
  function resolveToPotentialGfmFootnoteCall(events, context) {
    let index2 = events.length;
    while (index2--) {
      if (events[index2][1].type === "labelImage" && events[index2][0] === "enter") {
        events[index2][1];
        break;
      }
    }
    events[index2 + 1][1].type = "data";
    events[index2 + 3][1].type = "gfmFootnoteCallLabelMarker";
    const call = {
      type: "gfmFootnoteCall",
      start: Object.assign({}, events[index2 + 3][1].start),
      end: Object.assign({}, events[events.length - 1][1].end)
    };
    const marker = {
      type: "gfmFootnoteCallMarker",
      start: Object.assign({}, events[index2 + 3][1].end),
      end: Object.assign({}, events[index2 + 3][1].end)
    };
    marker.end.column++;
    marker.end.offset++;
    marker.end._bufferIndex++;
    const string2 = {
      type: "gfmFootnoteCallString",
      start: Object.assign({}, marker.end),
      end: Object.assign({}, events[events.length - 1][1].start)
    };
    const chunk = {
      type: "chunkString",
      contentType: "string",
      start: Object.assign({}, string2.start),
      end: Object.assign({}, string2.end)
    };
    const replacement = [
events[index2 + 1],
      events[index2 + 2],
      ["enter", call, context],
events[index2 + 3],
      events[index2 + 4],
["enter", marker, context],
      ["exit", marker, context],
["enter", string2, context],
      ["enter", chunk, context],
      ["exit", chunk, context],
      ["exit", string2, context],
events[events.length - 2],
      events[events.length - 1],
      ["exit", call, context]
    ];
    events.splice(index2, events.length - index2 + 1, ...replacement);
    return events;
  }
  function tokenizeGfmFootnoteCall(effects, ok2, nok) {
    const self2 = this;
    const defined = self2.parser.gfmFootnotes || (self2.parser.gfmFootnotes = []);
    let size2 = 0;
    let data;
    return start;
    function start(code2) {
      effects.enter("gfmFootnoteCall");
      effects.enter("gfmFootnoteCallLabelMarker");
      effects.consume(code2);
      effects.exit("gfmFootnoteCallLabelMarker");
      return callStart;
    }
    function callStart(code2) {
      if (code2 !== 94) return nok(code2);
      effects.enter("gfmFootnoteCallMarker");
      effects.consume(code2);
      effects.exit("gfmFootnoteCallMarker");
      effects.enter("gfmFootnoteCallString");
      effects.enter("chunkString").contentType = "string";
      return callData;
    }
    function callData(code2) {
      if (
size2 > 999 ||
code2 === 93 && !data ||

code2 === null || code2 === 91 || markdownLineEndingOrSpace(code2)
      ) {
        return nok(code2);
      }
      if (code2 === 93) {
        effects.exit("chunkString");
        const token = effects.exit("gfmFootnoteCallString");
        if (!defined.includes(normalizeIdentifier(self2.sliceSerialize(token)))) {
          return nok(code2);
        }
        effects.enter("gfmFootnoteCallLabelMarker");
        effects.consume(code2);
        effects.exit("gfmFootnoteCallLabelMarker");
        effects.exit("gfmFootnoteCall");
        return ok2;
      }
      if (!markdownLineEndingOrSpace(code2)) {
        data = true;
      }
      size2++;
      effects.consume(code2);
      return code2 === 92 ? callEscape : callData;
    }
    function callEscape(code2) {
      if (code2 === 91 || code2 === 92 || code2 === 93) {
        effects.consume(code2);
        size2++;
        return callData;
      }
      return callData(code2);
    }
  }
  function tokenizeDefinitionStart(effects, ok2, nok) {
    const self2 = this;
    const defined = self2.parser.gfmFootnotes || (self2.parser.gfmFootnotes = []);
    let identifier;
    let size2 = 0;
    let data;
    return start;
    function start(code2) {
      effects.enter("gfmFootnoteDefinition")._container = true;
      effects.enter("gfmFootnoteDefinitionLabel");
      effects.enter("gfmFootnoteDefinitionLabelMarker");
      effects.consume(code2);
      effects.exit("gfmFootnoteDefinitionLabelMarker");
      return labelAtMarker;
    }
    function labelAtMarker(code2) {
      if (code2 === 94) {
        effects.enter("gfmFootnoteDefinitionMarker");
        effects.consume(code2);
        effects.exit("gfmFootnoteDefinitionMarker");
        effects.enter("gfmFootnoteDefinitionLabelString");
        effects.enter("chunkString").contentType = "string";
        return labelInside;
      }
      return nok(code2);
    }
    function labelInside(code2) {
      if (
size2 > 999 ||
code2 === 93 && !data ||

code2 === null || code2 === 91 || markdownLineEndingOrSpace(code2)
      ) {
        return nok(code2);
      }
      if (code2 === 93) {
        effects.exit("chunkString");
        const token = effects.exit("gfmFootnoteDefinitionLabelString");
        identifier = normalizeIdentifier(self2.sliceSerialize(token));
        effects.enter("gfmFootnoteDefinitionLabelMarker");
        effects.consume(code2);
        effects.exit("gfmFootnoteDefinitionLabelMarker");
        effects.exit("gfmFootnoteDefinitionLabel");
        return labelAfter;
      }
      if (!markdownLineEndingOrSpace(code2)) {
        data = true;
      }
      size2++;
      effects.consume(code2);
      return code2 === 92 ? labelEscape : labelInside;
    }
    function labelEscape(code2) {
      if (code2 === 91 || code2 === 92 || code2 === 93) {
        effects.consume(code2);
        size2++;
        return labelInside;
      }
      return labelInside(code2);
    }
    function labelAfter(code2) {
      if (code2 === 58) {
        effects.enter("definitionMarker");
        effects.consume(code2);
        effects.exit("definitionMarker");
        if (!defined.includes(identifier)) {
          defined.push(identifier);
        }
        return factorySpace(effects, whitespaceAfter, "gfmFootnoteDefinitionWhitespace");
      }
      return nok(code2);
    }
    function whitespaceAfter(code2) {
      return ok2(code2);
    }
  }
  function tokenizeDefinitionContinuation(effects, ok2, nok) {
    return effects.check(blankLine, ok2, effects.attempt(indent, ok2, nok));
  }
  function gfmFootnoteDefinitionEnd(effects) {
    effects.exit("gfmFootnoteDefinition");
  }
  function tokenizeIndent(effects, ok2, nok) {
    const self2 = this;
    return factorySpace(effects, afterPrefix, "gfmFootnoteDefinitionIndent", 4 + 1);
    function afterPrefix(code2) {
      const tail = self2.events[self2.events.length - 1];
      return tail && tail[1].type === "gfmFootnoteDefinitionIndent" && tail[2].sliceSerialize(tail[1], true).length === 4 ? ok2(code2) : nok(code2);
    }
  }
  function gfmStrikethrough(options) {
    const options_ = {};
    let single = options_.singleTilde;
    const tokenizer = {
      name: "strikethrough",
      tokenize: tokenizeStrikethrough,
      resolveAll: resolveAllStrikethrough
    };
    if (single === null || single === void 0) {
      single = true;
    }
    return {
      text: {
        [126]: tokenizer
      },
      insideSpan: {
        null: [tokenizer]
      },
      attentionMarkers: {
        null: [126]
      }
    };
    function resolveAllStrikethrough(events, context) {
      let index2 = -1;
      while (++index2 < events.length) {
        if (events[index2][0] === "enter" && events[index2][1].type === "strikethroughSequenceTemporary" && events[index2][1]._close) {
          let open = index2;
          while (open--) {
            if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open &&
events[index2][1].end.offset - events[index2][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
              events[index2][1].type = "strikethroughSequence";
              events[open][1].type = "strikethroughSequence";
              const strikethrough2 = {
                type: "strikethrough",
                start: Object.assign({}, events[open][1].start),
                end: Object.assign({}, events[index2][1].end)
              };
              const text2 = {
                type: "strikethroughText",
                start: Object.assign({}, events[open][1].end),
                end: Object.assign({}, events[index2][1].start)
              };
              const nextEvents = [["enter", strikethrough2, context], ["enter", events[open][1], context], ["exit", events[open][1], context], ["enter", text2, context]];
              const insideSpan2 = context.parser.constructs.insideSpan.null;
              if (insideSpan2) {
                splice(nextEvents, nextEvents.length, 0, resolveAll(insideSpan2, events.slice(open + 1, index2), context));
              }
              splice(nextEvents, nextEvents.length, 0, [["exit", text2, context], ["enter", events[index2][1], context], ["exit", events[index2][1], context], ["exit", strikethrough2, context]]);
              splice(events, open - 1, index2 - open + 3, nextEvents);
              index2 = open + nextEvents.length - 2;
              break;
            }
          }
        }
      }
      index2 = -1;
      while (++index2 < events.length) {
        if (events[index2][1].type === "strikethroughSequenceTemporary") {
          events[index2][1].type = "data";
        }
      }
      return events;
    }
    function tokenizeStrikethrough(effects, ok2, nok) {
      const previous2 = this.previous;
      const events = this.events;
      let size2 = 0;
      return start;
      function start(code2) {
        if (previous2 === 126 && events[events.length - 1][1].type !== "characterEscape") {
          return nok(code2);
        }
        effects.enter("strikethroughSequenceTemporary");
        return more(code2);
      }
      function more(code2) {
        const before = classifyCharacter(previous2);
        if (code2 === 126) {
          if (size2 > 1) return nok(code2);
          effects.consume(code2);
          size2++;
          return more;
        }
        if (size2 < 2 && !single) return nok(code2);
        const token = effects.exit("strikethroughSequenceTemporary");
        const after = classifyCharacter(code2);
        token._open = !after || after === 2 && Boolean(before);
        token._close = !before || before === 2 && Boolean(after);
        return ok2(code2);
      }
    }
  }
  class EditMap {
constructor() {
      this.map = [];
    }
add(index2, remove, add) {
      addImplementation(this, index2, remove, add);
    }












consume(events) {
      this.map.sort(function(a2, b2) {
        return a2[0] - b2[0];
      });
      if (this.map.length === 0) {
        return;
      }
      let index2 = this.map.length;
      const vecs = [];
      while (index2 > 0) {
        index2 -= 1;
        vecs.push(events.slice(this.map[index2][0] + this.map[index2][1]), this.map[index2][2]);
        events.length = this.map[index2][0];
      }
      vecs.push(events.slice());
      events.length = 0;
      let slice = vecs.pop();
      while (slice) {
        for (const element2 of slice) {
          events.push(element2);
        }
        slice = vecs.pop();
      }
      this.map.length = 0;
    }
  }
  function addImplementation(editMap, at, remove, add) {
    let index2 = 0;
    if (remove === 0 && add.length === 0) {
      return;
    }
    while (index2 < editMap.map.length) {
      if (editMap.map[index2][0] === at) {
        editMap.map[index2][1] += remove;
        editMap.map[index2][2].push(...add);
        return;
      }
      index2 += 1;
    }
    editMap.map.push([at, remove, add]);
  }
  function gfmTableAlign(events, index2) {
    let inDelimiterRow = false;
    const align = [];
    while (index2 < events.length) {
      const event = events[index2];
      if (inDelimiterRow) {
        if (event[0] === "enter") {
          if (event[1].type === "tableContent") {
            align.push(events[index2 + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
          }
        } else if (event[1].type === "tableContent") {
          if (events[index2 - 1][1].type === "tableDelimiterMarker") {
            const alignIndex = align.length - 1;
            align[alignIndex] = align[alignIndex] === "left" ? "center" : "right";
          }
        } else if (event[1].type === "tableDelimiterRow") {
          break;
        }
      } else if (event[0] === "enter" && event[1].type === "tableDelimiterRow") {
        inDelimiterRow = true;
      }
      index2 += 1;
    }
    return align;
  }
  function gfmTable() {
    return {
      flow: {
        null: {
          name: "table",
          tokenize: tokenizeTable,
          resolveAll: resolveTable
        }
      }
    };
  }
  function tokenizeTable(effects, ok2, nok) {
    const self2 = this;
    let size2 = 0;
    let sizeB = 0;
    let seen;
    return start;
    function start(code2) {
      let index2 = self2.events.length - 1;
      while (index2 > -1) {
        const type = self2.events[index2][1].type;
        if (type === "lineEnding" ||
type === "linePrefix") index2--;
        else break;
      }
      const tail = index2 > -1 ? self2.events[index2][1].type : null;
      const next = tail === "tableHead" || tail === "tableRow" ? bodyRowStart : headRowBefore;
      if (next === bodyRowStart && self2.parser.lazy[self2.now().line]) {
        return nok(code2);
      }
      return next(code2);
    }
    function headRowBefore(code2) {
      effects.enter("tableHead");
      effects.enter("tableRow");
      return headRowStart(code2);
    }
    function headRowStart(code2) {
      if (code2 === 124) {
        return headRowBreak(code2);
      }
      seen = true;
      sizeB += 1;
      return headRowBreak(code2);
    }
    function headRowBreak(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      if (markdownLineEnding(code2)) {
        if (sizeB > 1) {
          sizeB = 0;
          self2.interrupt = true;
          effects.exit("tableRow");
          effects.enter("lineEnding");
          effects.consume(code2);
          effects.exit("lineEnding");
          return headDelimiterStart;
        }
        return nok(code2);
      }
      if (markdownSpace(code2)) {
        return factorySpace(effects, headRowBreak, "whitespace")(code2);
      }
      sizeB += 1;
      if (seen) {
        seen = false;
        size2 += 1;
      }
      if (code2 === 124) {
        effects.enter("tableCellDivider");
        effects.consume(code2);
        effects.exit("tableCellDivider");
        seen = true;
        return headRowBreak;
      }
      effects.enter("data");
      return headRowData(code2);
    }
    function headRowData(code2) {
      if (code2 === null || code2 === 124 || markdownLineEndingOrSpace(code2)) {
        effects.exit("data");
        return headRowBreak(code2);
      }
      effects.consume(code2);
      return code2 === 92 ? headRowEscape : headRowData;
    }
    function headRowEscape(code2) {
      if (code2 === 92 || code2 === 124) {
        effects.consume(code2);
        return headRowData;
      }
      return headRowData(code2);
    }
    function headDelimiterStart(code2) {
      self2.interrupt = false;
      if (self2.parser.lazy[self2.now().line]) {
        return nok(code2);
      }
      effects.enter("tableDelimiterRow");
      seen = false;
      if (markdownSpace(code2)) {
        return factorySpace(effects, headDelimiterBefore, "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code2);
      }
      return headDelimiterBefore(code2);
    }
    function headDelimiterBefore(code2) {
      if (code2 === 45 || code2 === 58) {
        return headDelimiterValueBefore(code2);
      }
      if (code2 === 124) {
        seen = true;
        effects.enter("tableCellDivider");
        effects.consume(code2);
        effects.exit("tableCellDivider");
        return headDelimiterCellBefore;
      }
      return headDelimiterNok(code2);
    }
    function headDelimiterCellBefore(code2) {
      if (markdownSpace(code2)) {
        return factorySpace(effects, headDelimiterValueBefore, "whitespace")(code2);
      }
      return headDelimiterValueBefore(code2);
    }
    function headDelimiterValueBefore(code2) {
      if (code2 === 58) {
        sizeB += 1;
        seen = true;
        effects.enter("tableDelimiterMarker");
        effects.consume(code2);
        effects.exit("tableDelimiterMarker");
        return headDelimiterLeftAlignmentAfter;
      }
      if (code2 === 45) {
        sizeB += 1;
        return headDelimiterLeftAlignmentAfter(code2);
      }
      if (code2 === null || markdownLineEnding(code2)) {
        return headDelimiterCellAfter(code2);
      }
      return headDelimiterNok(code2);
    }
    function headDelimiterLeftAlignmentAfter(code2) {
      if (code2 === 45) {
        effects.enter("tableDelimiterFiller");
        return headDelimiterFiller(code2);
      }
      return headDelimiterNok(code2);
    }
    function headDelimiterFiller(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return headDelimiterFiller;
      }
      if (code2 === 58) {
        seen = true;
        effects.exit("tableDelimiterFiller");
        effects.enter("tableDelimiterMarker");
        effects.consume(code2);
        effects.exit("tableDelimiterMarker");
        return headDelimiterRightAlignmentAfter;
      }
      effects.exit("tableDelimiterFiller");
      return headDelimiterRightAlignmentAfter(code2);
    }
    function headDelimiterRightAlignmentAfter(code2) {
      if (markdownSpace(code2)) {
        return factorySpace(effects, headDelimiterCellAfter, "whitespace")(code2);
      }
      return headDelimiterCellAfter(code2);
    }
    function headDelimiterCellAfter(code2) {
      if (code2 === 124) {
        return headDelimiterBefore(code2);
      }
      if (code2 === null || markdownLineEnding(code2)) {
        if (!seen || size2 !== sizeB) {
          return headDelimiterNok(code2);
        }
        effects.exit("tableDelimiterRow");
        effects.exit("tableHead");
        return ok2(code2);
      }
      return headDelimiterNok(code2);
    }
    function headDelimiterNok(code2) {
      return nok(code2);
    }
    function bodyRowStart(code2) {
      effects.enter("tableRow");
      return bodyRowBreak(code2);
    }
    function bodyRowBreak(code2) {
      if (code2 === 124) {
        effects.enter("tableCellDivider");
        effects.consume(code2);
        effects.exit("tableCellDivider");
        return bodyRowBreak;
      }
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("tableRow");
        return ok2(code2);
      }
      if (markdownSpace(code2)) {
        return factorySpace(effects, bodyRowBreak, "whitespace")(code2);
      }
      effects.enter("data");
      return bodyRowData(code2);
    }
    function bodyRowData(code2) {
      if (code2 === null || code2 === 124 || markdownLineEndingOrSpace(code2)) {
        effects.exit("data");
        return bodyRowBreak(code2);
      }
      effects.consume(code2);
      return code2 === 92 ? bodyRowEscape : bodyRowData;
    }
    function bodyRowEscape(code2) {
      if (code2 === 92 || code2 === 124) {
        effects.consume(code2);
        return bodyRowData;
      }
      return bodyRowData(code2);
    }
  }
  function resolveTable(events, context) {
    let index2 = -1;
    let inFirstCellAwaitingPipe = true;
    let rowKind = 0;
    let lastCell = [0, 0, 0, 0];
    let cell = [0, 0, 0, 0];
    let afterHeadAwaitingFirstBodyRow = false;
    let lastTableEnd = 0;
    let currentTable;
    let currentBody;
    let currentCell;
    const map2 = new EditMap();
    while (++index2 < events.length) {
      const event = events[index2];
      const token = event[1];
      if (event[0] === "enter") {
        if (token.type === "tableHead") {
          afterHeadAwaitingFirstBodyRow = false;
          if (lastTableEnd !== 0) {
            flushTableEnd(map2, context, lastTableEnd, currentTable, currentBody);
            currentBody = void 0;
            lastTableEnd = 0;
          }
          currentTable = {
            type: "table",
            start: Object.assign({}, token.start),
end: Object.assign({}, token.end)
          };
          map2.add(index2, 0, [["enter", currentTable, context]]);
        } else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
          inFirstCellAwaitingPipe = true;
          currentCell = void 0;
          lastCell = [0, 0, 0, 0];
          cell = [0, index2 + 1, 0, 0];
          if (afterHeadAwaitingFirstBodyRow) {
            afterHeadAwaitingFirstBodyRow = false;
            currentBody = {
              type: "tableBody",
              start: Object.assign({}, token.start),
end: Object.assign({}, token.end)
            };
            map2.add(index2, 0, [["enter", currentBody, context]]);
          }
          rowKind = token.type === "tableDelimiterRow" ? 2 : currentBody ? 3 : 1;
        } else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
          inFirstCellAwaitingPipe = false;
          if (cell[2] === 0) {
            if (lastCell[1] !== 0) {
              cell[0] = cell[1];
              currentCell = flushCell(map2, context, lastCell, rowKind, void 0, currentCell);
              lastCell = [0, 0, 0, 0];
            }
            cell[2] = index2;
          }
        } else if (token.type === "tableCellDivider") {
          if (inFirstCellAwaitingPipe) {
            inFirstCellAwaitingPipe = false;
          } else {
            if (lastCell[1] !== 0) {
              cell[0] = cell[1];
              currentCell = flushCell(map2, context, lastCell, rowKind, void 0, currentCell);
            }
            lastCell = cell;
            cell = [lastCell[1], index2, 0, 0];
          }
        }
      } else if (token.type === "tableHead") {
        afterHeadAwaitingFirstBodyRow = true;
        lastTableEnd = index2;
      } else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
        lastTableEnd = index2;
        if (lastCell[1] !== 0) {
          cell[0] = cell[1];
          currentCell = flushCell(map2, context, lastCell, rowKind, index2, currentCell);
        } else if (cell[1] !== 0) {
          currentCell = flushCell(map2, context, cell, rowKind, index2, currentCell);
        }
        rowKind = 0;
      } else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
        cell[3] = index2;
      }
    }
    if (lastTableEnd !== 0) {
      flushTableEnd(map2, context, lastTableEnd, currentTable, currentBody);
    }
    map2.consume(context.events);
    index2 = -1;
    while (++index2 < context.events.length) {
      const event = context.events[index2];
      if (event[0] === "enter" && event[1].type === "table") {
        event[1]._align = gfmTableAlign(context.events, index2);
      }
    }
    return events;
  }
  function flushCell(map2, context, range, rowKind, rowEnd, previousCell) {
    const groupName = rowKind === 1 ? "tableHeader" : rowKind === 2 ? "tableDelimiter" : "tableData";
    const valueName = "tableContent";
    if (range[0] !== 0) {
      previousCell.end = Object.assign({}, getPoint(context.events, range[0]));
      map2.add(range[0], 0, [["exit", previousCell, context]]);
    }
    const now = getPoint(context.events, range[1]);
    previousCell = {
      type: groupName,
      start: Object.assign({}, now),
end: Object.assign({}, now)
    };
    map2.add(range[1], 0, [["enter", previousCell, context]]);
    if (range[2] !== 0) {
      const relatedStart = getPoint(context.events, range[2]);
      const relatedEnd = getPoint(context.events, range[3]);
      const valueToken = {
        type: valueName,
        start: Object.assign({}, relatedStart),
        end: Object.assign({}, relatedEnd)
      };
      map2.add(range[2], 0, [["enter", valueToken, context]]);
      if (rowKind !== 2) {
        const start = context.events[range[2]];
        const end = context.events[range[3]];
        start[1].end = Object.assign({}, end[1].end);
        start[1].type = "chunkText";
        start[1].contentType = "text";
        if (range[3] > range[2] + 1) {
          const a2 = range[2] + 1;
          const b2 = range[3] - range[2] - 1;
          map2.add(a2, b2, []);
        }
      }
      map2.add(range[3] + 1, 0, [["exit", valueToken, context]]);
    }
    if (rowEnd !== void 0) {
      previousCell.end = Object.assign({}, getPoint(context.events, rowEnd));
      map2.add(rowEnd, 0, [["exit", previousCell, context]]);
      previousCell = void 0;
    }
    return previousCell;
  }
  function flushTableEnd(map2, context, index2, table2, tableBody) {
    const exits = [];
    const related = getPoint(context.events, index2);
    if (tableBody) {
      tableBody.end = Object.assign({}, related);
      exits.push(["exit", tableBody, context]);
    }
    table2.end = Object.assign({}, related);
    exits.push(["exit", table2, context]);
    map2.add(index2 + 1, 0, exits);
  }
  function getPoint(events, index2) {
    const event = events[index2];
    const side = event[0] === "enter" ? "start" : "end";
    return event[1][side];
  }
  const tasklistCheck = {
    name: "tasklistCheck",
    tokenize: tokenizeTasklistCheck
  };
  function gfmTaskListItem() {
    return {
      text: {
        [91]: tasklistCheck
      }
    };
  }
  function tokenizeTasklistCheck(effects, ok2, nok) {
    const self2 = this;
    return open;
    function open(code2) {
      if (
self2.previous !== null ||

!self2._gfmTasklistFirstContentOfListItem
      ) {
        return nok(code2);
      }
      effects.enter("taskListCheck");
      effects.enter("taskListCheckMarker");
      effects.consume(code2);
      effects.exit("taskListCheckMarker");
      return inside;
    }
    function inside(code2) {
      if (markdownLineEndingOrSpace(code2)) {
        effects.enter("taskListCheckValueUnchecked");
        effects.consume(code2);
        effects.exit("taskListCheckValueUnchecked");
        return close;
      }
      if (code2 === 88 || code2 === 120) {
        effects.enter("taskListCheckValueChecked");
        effects.consume(code2);
        effects.exit("taskListCheckValueChecked");
        return close;
      }
      return nok(code2);
    }
    function close(code2) {
      if (code2 === 93) {
        effects.enter("taskListCheckMarker");
        effects.consume(code2);
        effects.exit("taskListCheckMarker");
        effects.exit("taskListCheck");
        return after;
      }
      return nok(code2);
    }
    function after(code2) {
      if (markdownLineEnding(code2)) {
        return ok2(code2);
      }
      if (markdownSpace(code2)) {
        return effects.check({
          tokenize: spaceThenNonSpace
        }, ok2, nok)(code2);
      }
      return nok(code2);
    }
  }
  function spaceThenNonSpace(effects, ok2, nok) {
    return factorySpace(effects, after, "whitespace");
    function after(code2) {
      return code2 === null ? nok(code2) : ok2(code2);
    }
  }
  function gfm(options) {
    return combineExtensions([
      gfmAutolinkLiteral(),
      gfmFootnote(),
      gfmStrikethrough(),
      gfmTable(),
      gfmTaskListItem()
    ]);
  }
  function fromMarkdown(content2) {
    return fromMarkdown$1(content2, {
      extensions: [gfm()],
      mdastExtensions: [gfmFromMarkdown()]
    });
  }
  function toMarkdown(ast) {
    return toMarkdown$1(ast, {
      bullet: "-",
      bulletOther: "*",
      bulletOrdered: ".",
      emphasis: "*",
      fence: "`",
      fences: true,
      listItemIndent: "one",
      resourceLink: false,
      rule: "-",
      ruleRepetition: 3,
      ruleSpaces: false,
      strong: "*",
      extensions: [gfmToMarkdown()]
    });
  }
  function toHtml(node2) {
    return toHtml$1(toHast(node2));
  }
  function flatMap(tree, fn2) {
    function transform(node2, i2, parent) {
      if ("children" in node2) {
        const p2 = node2;
        p2.children = p2.children.flatMap((item, i22) => transform(item, i22, p2));
      }
      return fn2(node2, i2, parent);
    }
    return transform(tree, 0, void 0)[0];
  }
  function standardizeLineBreaks(text2) {
    return text2.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  }
  const templateHtml = `<!DOCTYPE html>
<!--
 Copyright 2022-Present Pionxzh
 Copyright 2026 Asim Ihsan
 SPDX-License-Identifier: MPL-2.0 AND MIT
-->

<html lang="{{lang}}" data-theme="{{theme}}">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" href="https://chat.openai.com/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"><\/script>
    <script>
        hljs.highlightAll()
    <\/script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.3/katex.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.3/katex.min.js"><\/script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.3/contrib/auto-render.min.js"><\/script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            renderMathInElement(document.body, {
                delimiters: [
                    { left: "$$", right: "$$", display: true },
                    { left: "$", right: "$", display: false },
                    { left: "\\\\[", right: "\\\\]", display: true },
                    { left: "\\\\(", right: "\\\\)", display: false }
                ],
                throwOnError: false,
                ignoredClasses: ["no-katex"],
                preProcess: function(math) {
                    return \`\\\\displaystyle \\\\Large \${math}\`;
                }
            });
            document.querySelectorAll('.katex').forEach(function(el) {
                const parent = el.parentNode;
                const grandparent = parent.parentNode;
                if (grandparent.tagName === 'P' && isOnlyContent(grandparent, parent)) {
                    el.style.width = '100%';
                    el.style.display = 'block';
                    el.style.textAlign = 'center';
                    parent.style.textAlign = 'center';
                } else {
                    el.style.display = 'inline-block';
                    el.style.width = 'fit-content';
                }
            });
            function isOnlyContent(parent, element) {
                let onlyKaTeX = true;
                parent.childNodes.forEach(function(child) {
                    console.log(child.textContent);
                    if (child !== element) {
                        if (child.nodeType === Node.TEXT_NODE) {
                            if (child.textContent.trim().length > 0) {
                                onlyKaTeX = false;
                            }
                        } else if (child.nodeType === Node.ELEMENT_NODE) {
                            onlyKaTeX = false;
                        }
                    }
                });
                return onlyKaTeX;
            }
        });
    <\/script>

    <style>
        :root {
            --page-text: #0d0d0d;
            --page-bg: #fff;
            --td-borders: #374151;
            --th-borders: #4b5563;
            --tw-prose-code: var(--page-text);
            --tw-prose-counters: #9b9b9b;
            --tw-prose-headings: var(--page-text);
            --tw-prose-hr: rgba(0,0,0,.25);
            --tw-prose-links: var(--page-text);
            --tw-prose-quotes: var(--page-text);
            --meta-title: #616c77;
        }

        [data-theme="dark"] {
            --page-text: #ececec;
            --page-bg: #212121;
            --tw-prose-code: var(--page-text);
            --tw-prose-counters: #9b9b9b;
            --tw-prose-headings: var(--page-text);
            --tw-prose-hr: hsla(0,0%,100%,.25);
            --tw-prose-links: var(--page-text);
            --tw-prose-quotes: var(--page-text);
            --meta-title: #959faa;
        }

        * {
            box-sizing: border-box;
            font-size: 16px;
        }

        ::-webkit-scrollbar {
            height: 1rem;
            width: .5rem
        }

        ::-webkit-scrollbar:horizontal {
            height: .5rem;
            width: 1rem
        }

        ::-webkit-scrollbar-track {
            background-color: transparent;
            border-radius: 9999px
        }

        ::-webkit-scrollbar-thumb {
            --tw-border-opacity: 1;
            background-color: rgba(217,217,227,.8);
            border-color: rgba(255,255,255,var(--tw-border-opacity));
            border-radius: 9999px;
            border-width: 1px
        }

        ::-webkit-scrollbar-thumb:hover {
            --tw-bg-opacity: 1;
            background-color: rgba(236,236,241,var(--tw-bg-opacity))
        }

        .dark ::-webkit-scrollbar-thumb {
            --tw-bg-opacity: 1;
            background-color: rgba(86,88,105,var(--tw-bg-opacity))
        }

        .dark ::-webkit-scrollbar-thumb:hover {
            --tw-bg-opacity: 1;
            background-color: rgba(172,172,190,var(--tw-bg-opacity))
        }

        @media (min-width: 768px) {
            .scrollbar-trigger ::-webkit-scrollbar-thumb {
                visibility:hidden
            }

            .scrollbar-trigger:hover ::-webkit-scrollbar-thumb {
                visibility: visible
            }
        }

        body {
            font-family: Söhne,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,Arial,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
            font-size: 14px;
            line-height: 1.5;
            color: var(--page-text);
            background-color: var(--page-bg);
            margin: 0;
            padding: 0;
        }

        [data-theme="light"] .sun {
            display: none;
        }

        [data-theme="dark"] .moon {
            display: none;
        }

        .toggle {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 32px;
            height: 32px;
            border-radius: 4px;
            background-color: #fff;
            border: 1px solid #e2e8f0;
        }

        [data-width="narrow"] .width-toggle .expand {
            display: block;
        }

        [data-width="wide"] .width-toggle .narrow {
            display: block;
        }

        .width-toggle {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 32px;
            height: 32px;
            border-radius: 4px;
            background-color: #fff;
            border: 1px solid #e2e8f0;
            margin-left: 8px;
            cursor: pointer;
        }

        .width-toggle svg {
            display: none;
        }

        .metadata_container {
            display: flex;
            flex-direction: column;
            margin-top: 8px;
            padding-left: 1rem;
        }

        .metadata_item {
            display: flex;
            flex-direction: row;
            align-items: center;
            border-radius: 16px;
            padding: 4px 0.5rem;
        }

        .metadata_item:hover {
            background-color: rgba(0,0,0,.1);
        }

        .metadata_item > div:first-child {
            flex: 0 1 100px;
            color: var(--meta-title);
        }

        .metadata_item > div:last-child {
            flex: 1;
        }

        a {
            color: var(--tw-prose-links);
            font-size: 0.8rem;
            text-decoration-line: underline;
            text-underline-offset: 2px;
        }

        .conversation-content > p:first-child,
        ol:first-child {
            margin-top: 0;
        }

        p>code, li>code {
            color: var(--tw-prose-code);
            font-weight: 600;
            font-size: .875em;
        }

        p>code::before,
        p>code::after,
        li>code::before,
        li>code::after {
            content: "\`";
        }

        hr {
            width: 100%;
            height: 0;
            border: 1px solid var(--tw-prose-hr);
            margin-bottom: 1em;
            margin-top: 1em;
        }

        pre {
            color: #ffffff;
            background-color: #000000;
            overflow-x: auto;
            margin: 0 0 1rem 0;
            border-radius: 0.375rem;
        }

        pre>code {
            font-family: Söhne Mono, Monaco, Andale Mono, Ubuntu Mono, monospace !important;
            font-weight: 400;
            font-size: .875em;
            line-height: 1.7142857;
        }

        h1, h2, h3, h4, h5, h6 {
            color: var(--tw-prose-headings);
            margin: 0;
        }

        h1 {
            font-size: 2.25em;
            font-weight: 600;
            line-height: 1.1111111;
            margin-bottom: 0.8888889em;
            margin-top: 0;
        }

        h2 {
            font-size: 1.5em;
            font-weight: 700;
            line-height: 1.3333333;
            margin-bottom: 1em;
            margin-top: 2em;
        }

        h3 {
            font-size: 1.25em;
            font-weight: 600;
            line-height: 1.6;
            margin-bottom: .6em;
            margin-top: 1.6em;
        }

        h4 {
            font-weight: 400;
            line-height: 1.5;
            margin-bottom: .5em;
            margin-top: 1.5em
        }

        h3,h4 {
            margin-bottom: .5rem;
            margin-top: 1rem;
        }

        h5 {
            font-weight: 600;
        }

        blockquote {
            border-left: 2px solid rgba(142,142,160,1);
            color: var(--tw-prose-quotes);
            font-style: italic;
            font-style: normal;
            font-weight: 500;
            line-height: 1rem;
            margin: 1.6em 0;
            padding-left: 1em;
            quotes: "\\201C""\\201D""\\2018""\\2019";
        }

        blockquote p:first-of-type:before {
            content: open-quote;
        }

        blockquote p:last-of-type:after {
            content: close-quote;
        }

        ol, ul {
            padding-left: 1.1rem;
        }

        ::marker {
            color: var(--tw-prose-counters);
            font-weight: 400;
        }

        table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0 0;
            table-layout: auto;
            text-align: left;
            font-size: .875em;
            line-height: 1.7142857;
        }

        table * {
            box-sizing: border-box;
            border-width: 0;
            border-style: solid;
            border-color: #d9d9e3;
        }

        table thead {
            border-bottom-color: var(--th-borders);
            border-bottom-width: 1px;
        }

        table th {
            background-color: rgba(236,236,241,.2);
            border-bottom-width: 1px;
            border-left-width: 1px;
            border-top-width: 1px;
            padding: 0.25rem 0.75rem;
        }

        table th:first-child {
            border-top-left-radius: 0.375rem;
        }

        table th:last-child {
            border-right-width: 1px;
            border-top-right-radius: 0.375rem;
        }

        table tbody tr {
            border-bottom-color: var(--td-borders);
            border-bottom-width: 1px;
        }

        table tbody tr:last-child {
            border-bottom-width: 0;
        }

        table tbody tr:last-child td:first-child {
            border-bottom-left-radius: 0.375rem;
        }

        table tbody tr:last-child td:last-child {
            border-bottom-right-radius: 0.375rem;
        }

        table td {
            border-bottom-width: 1px;
            border-left-width: 1px;
            padding: 0.25rem 0.75rem;
        }

        table td:last-child {
            border-right-width: 1px;
        }

        [type=checkbox], [type=radio] {
            accent-color: #2563eb;
        }

        .conversation {
            margin: 0 auto;
            padding: 1rem;
            max-width: 64rem;
        }

        [data-width="narrow"] .conversation {
            max-width: 64rem;
        }

        [data-width="wide"] .conversation {
            max-width: 90%;
        }

        @media (min-width: 1280px) {
            .conversation {
                max-width: 48rem;
            }
        }

        @media (min-width: 1024px) {
            .conversation {
                max-width: 40rem;
            }
        }

        @media (min-width: 768px) {
            .conversation {
                max-width: 48rem;
            }
        }

        .conversation-header {
            margin-bottom: 1rem;
        }

        .conversation-header h1 {
            margin: 0;
        }

        .conversation-header h1 a {
            font-size: 1.5rem;
        }

        .conversation-header .conversation-export {
            margin-top: 0.5rem;
            font-size: 0.8rem;
        }

        .conversation-header p {
            margin-top: 0.5rem;
            font-size: 0.8rem;
        }

        .conversation-item {
            display: flex;
            position: relative;
            padding: 1rem;
            border-left: 1px solid rgba(0,0,0,.1);
            border-right: 1px solid rgba(0,0,0,.1);
            border-bottom: 1px solid rgba(0,0,0,.1);
        }

        .conversation-item:first-of-type {
            border-top: 1px solid rgba(0,0,0,.1);
        }

        .author {
            display: flex;
            flex: 0 0 30px;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border-radius: 0.125rem;
            margin-right: 1rem;
            overflow: hidden;
        }

        .author svg {
            color: #fff;
            width: 22px;
            height: 22px;
        }

        .author img {
            content: url({{avatar}});
            width: 100%;
            height: 100%;
        }

        .author.GPT-3 {
            background-color: rgb(16, 163, 127);
        }

        .author.GPT-4 {
            background-color: black;
        }

        .conversation-content-wrapper {
            display: flex;
            position: relative;
            overflow: hidden;
            flex: 1 1 auto;
            flex-direction: column;
        }

        .conversation-content {
            font-size: 1rem;
            line-height: 1.5;
        }

        .conversation-content p {
            white-space: pre-wrap;
            line-height: 28px;
        }

        .conversation-content img, .conversation-content video {
            display: block;
            max-width: 100%;
            height: auto;
            margin-bottom: 2em;
            margin-top: 2em;
        }

        .time {
            position: absolute;
            right: 8px;
            bottom: 0;
            font-size: 0.8rem;
            color: #acacbe
        }

    </style>
</head>

<body>
    <svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <symbol id="chatgpt" viewBox="0 0 41 41">
            <path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z" fill="currentColor"></path>
        </symbol>
    </svg>
    <div class="conversation">
        <div class="conversation-header">
            <h1>
                <a href="{{source}}" target="_blank" rel="noopener noreferrer">{{title}}</a>
                <button class="toggle">
                    <svg class="sun" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    <svg class="moon" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </button>
                <button class="toggle width-toggle">
                    <svg class="expand" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="display: block;">
                        <path d="M3 12h18M6 8l-4 4 4 4M18 8l4 4-4 4"></path>
                    </svg>
                    <svg class="narrow" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="display: none;">
                        <path d="M3 12h7M14 12h7M6 16l4-4-4-4M18 16l-4-4 4-4"></path>
                    </svg>
                </button>
            </h1>
            <div class="conversation-export">
                <p>Exported by
                <a href="https://github.com/asimihsan/chatgpt-exporter.git">ChatGPT Exporter</a>
                at {{time}}</p>
            </div>
            {{details}}
        </div>

        {{content}}
    </div>


    <script>
        function toggleDarkMode(mode) {
            const html = document.querySelector('html');
            const isDarkMode = html.getAttribute('data-theme') === 'dark';
            const newMode = mode || (isDarkMode ? 'light' : 'dark');
            if (newMode !== 'dark' && newMode !== 'light') return;
            html.setAttribute('data-theme', newMode);

            const url = new URL(window.location);
            url.searchParams.set('theme', newMode);
            window.history.replaceState({}, '', url);
        }
        function toggleWidthMode(mode) {
            const body = document.querySelector('body');
            const widthToggleButton = document.querySelector('.width-toggle');
            const isWide = body.getAttribute('data-width') === 'wide';
            const newWidthMode = mode || (isWide ? 'narrow' : 'wide');
            if (newWidthMode !== 'narrow' && newWidthMode !== 'wide') return;
            body.setAttribute('data-width', newWidthMode);

            const url = new URL(window.location);
            url.searchParams.set('width', newWidthMode);
            window.history.replaceState({}, '', url);

            // Update the icon based on the current mode
            const narrowIcon = widthToggleButton.querySelector('.narrow');
            const expandIcon = widthToggleButton.querySelector('.expand');

            if (newWidthMode === 'wide') {
                expandIcon.style.display = "none";
                narrowIcon.style.display = "block";
            } else {
                expandIcon.style.display = "block";
                narrowIcon.style.display = "none";
            }
        }

        const urlParams = new URLSearchParams(window.location.search);
        const theme = urlParams.get('theme');
        const width = urlParams.get('width');

        if (theme) toggleDarkMode(theme);
        if (width) toggleWidthMode(width);

        document.querySelector('.toggle').addEventListener('click', () => toggleDarkMode());
        document.querySelector('.width-toggle').addEventListener('click', () => toggleWidthMode());
    <\/script>
</body>

</html>
`;
  function toUnixSeconds$1(value) {
    if (!value) return Math.floor(Date.now() / 1e3);
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) {
      return Math.floor(Date.now() / 1e3);
    }
    return Math.floor(parsed / 1e3);
  }
  function asRecord(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    return value;
  }
  function getString(value) {
    return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
  }
  function getTitle(finding) {
    const commitAnalysis = asRecord(finding.commit_analysis);
    return getString(commitAnalysis?.reason) ?? getString(commitAnalysis?.description)?.split(". ")[0] ?? `Finding ${finding.hid}`;
  }
  function buildSourceUrl(finding) {
    return `${baseUrl}/codex/security/findings/${encodeURIComponent(finding.hid)}`;
  }
  function buildSummarySection(finding) {
    const commitAnalysis = asRecord(finding.commit_analysis);
    const lines = [
      getString(commitAnalysis?.description),
      getString(commitAnalysis?.reason) ? `Reason: ${getString(commitAnalysis?.reason)}` : null,
      getString(commitAnalysis?.bugs_found_or_fixed) ? `Change impact: ${getString(commitAnalysis?.bugs_found_or_fixed)}` : null,
      getString(finding.criticality) ? `Severity: ${getString(finding.criticality)}` : null,
      getString(finding.status) ? `Status: ${getString(finding.status)}` : null
    ].filter((value) => Boolean(value));
    if (lines.length === 0) return null;
    return {
      id: "summary",
      title: "Summary",
      format: "markdown",
      content: lines.join("\n\n")
    };
  }
  function buildValidationSection(finding) {
    const commitAnalysis = asRecord(finding.commit_analysis);
    const validation = getString(commitAnalysis?.validation_str);
    if (!validation) return null;
    return {
      id: "validation",
      title: "Validation",
      format: "markdown",
      content: validation
    };
  }
  function buildEvidenceSection(finding) {
    const commitAnalysis = asRecord(finding.commit_analysis);
    const relevantLines = Array.isArray(commitAnalysis?.relevant_lines) ? commitAnalysis.relevant_lines : [];
    const evidenceBlocks = relevantLines.map((line, index2) => {
      const record = asRecord(line);
      if (!record) return null;
      const path2 = getString(record.path) ?? getString(record.file_path) ?? `evidence-${index2 + 1}`;
      const lineRange = typeof record.start_line_number === "number" && typeof record.end_line_number === "number" ? `:${record.start_line_number}-${record.end_line_number}` : "";
      const comment2 = getString(record.comment);
      const content2 = getString(record.content);
      return [
        `- \`${path2}${lineRange}\``,
        comment2 ? `  ${comment2}` : null,
        content2 ? `
\`\`\`
${content2}
\`\`\`` : null
      ].filter((value) => Boolean(value)).join("\n");
    }).filter((value) => Boolean(value));
    if (evidenceBlocks.length === 0) return null;
    return {
      id: "evidence",
      title: "Evidence",
      format: "markdown",
      content: evidenceBlocks.join("\n\n")
    };
  }
  function buildAttackPathSection(finding) {
    const attackPath = getString(finding.attack_path);
    if (!attackPath) return null;
    return {
      id: "attack-path",
      title: "Attack Path",
      format: "markdown",
      content: attackPath
    };
  }
  function buildProposedPatchSection(finding) {
    const proposedPatch = asRecord(finding.proposed_patch);
    if (!proposedPatch) return null;
    const latestTask = asRecord(proposedPatch.latest_task);
    const lines = [
      getString(proposedPatch.status) ? `Patch status: ${getString(proposedPatch.status)}` : null,
      typeof proposedPatch.success === "boolean" ? `Patch success: ${String(proposedPatch.success)}` : null,
      getString(latestTask?.status) ? `Latest task status: ${getString(latestTask?.status)}` : null,
      getString(latestTask?.patch_generation_failure_reason) ? `Failure reason: ${getString(latestTask?.patch_generation_failure_reason)}` : null,
      getString(latestTask?.patch_generation_failure_message) ? `Failure message: ${getString(latestTask?.patch_generation_failure_message)}` : null
    ].filter((value) => Boolean(value));
    if (lines.length === 0) return null;
    return {
      id: "proposed-patch",
      title: "Proposed Patch",
      format: "markdown",
      content: lines.join("\n")
    };
  }
  function normalizeSecurityFindingDocument(finding) {
    const title2 = getTitle(finding);
    const sourceUrl = buildSourceUrl(finding);
    const sections = [
      buildSummarySection(finding),
      buildValidationSection(finding),
      buildEvidenceSection(finding),
      buildAttackPathSection(finding),
      buildProposedPatchSection(finding)
    ].filter((value) => Boolean(value));
    return {
      kind: "security-finding",
      title: title2,
      sourceUrl,
      metadata: {
        title: title2,
        sourceUrl,
        createTime: toUnixSeconds$1(finding.created_at),
        updateTime: toUnixSeconds$1(finding.updated_at),
        findingId: finding.hid,
        repoId: finding.repo_id,
        repoUrl: finding.repo_url,
        configuredScanId: finding.configured_scan_id ?? void 0,
        status: getString(finding.status) ?? void 0,
        criticality: getString(finding.criticality) ?? void 0
      },
      sections,
      rawPayload: {
        finding
      }
    };
  }
  function toUnixSeconds(value) {
    if (!value) return Math.floor(Date.now() / 1e3);
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) {
      return Math.floor(Date.now() / 1e3);
    }
    return Math.floor(parsed / 1e3);
  }
  function nonEmptyLines(lines) {
    return lines.filter((value) => typeof value === "string" && value.trim() !== "").join("\n");
  }
  function getOptionalString(value) {
    return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
  }
  function buildStatusSection(bundle) {
    const { scanStats } = bundle;
    return {
      id: "status",
      title: "Status And Findings",
      format: "markdown",
      content: nonEmptyLines([
        `Status: ${scanStats.current_step}`,
        `Critical findings: ${scanStats.critical_findings}`,
        `High findings: ${scanStats.high_findings}`,
        `Medium findings: ${scanStats.medium_findings}`,
        `Low findings: ${scanStats.low_findings}`
      ])
    };
  }
  function buildRepositorySection(bundle) {
    const { scanConfiguration, repository } = bundle;
    return {
      id: "repository",
      title: "Repository",
      format: "markdown",
      content: nonEmptyLines([
        `Owner: ${scanConfiguration.owner.name} <${scanConfiguration.owner.email}>`,
        `Repository: ${repository.repository_full_name}`,
        getOptionalString(repository.clone_url) ? `Clone URL: ${getOptionalString(repository.clone_url)}` : null,
        getOptionalString(repository.default_branch) ? `Default branch: ${getOptionalString(repository.default_branch)}` : null,
        getOptionalString(scanConfiguration.scan_input.environment_id) ? `Environment: ${getOptionalString(scanConfiguration.scan_input.environment_id)}` : null,
        getOptionalString(scanConfiguration.scan_input.state) ? `State: ${getOptionalString(scanConfiguration.scan_input.state)}` : null
      ])
    };
  }
  function buildScannedCommitsSection(bundle) {
    const { scanConfiguration, scanStats } = bundle;
    return {
      id: "scanned-commits",
      title: "Scanned Commits",
      format: "markdown",
      content: nonEmptyLines([
        `Finished commits: ${scanStats.finished_commits}`,
        `Pending commits: ${scanStats.pending_commits}`,
        `Failed commits: ${scanStats.failed_commits}`,
        typeof scanConfiguration.scan_input.lookback_days === "number" ? `Lookback days: ${scanConfiguration.scan_input.lookback_days}` : null
      ])
    };
  }
  function buildThreatModelSection(bundle) {
    const threatModel = bundle.parsedProjectOverview?.threat_model;
    if (!threatModel || threatModel.trim() === "") return null;
    return {
      id: "threat-model",
      title: "Threat Model",
      format: "markdown",
      content: threatModel.trim()
    };
  }
  function buildFocusFilesSection(bundle) {
    const focusFiles = bundle.parsedProjectOverview?.focus_files_and_dirs;
    if (!focusFiles || focusFiles.length === 0) return null;
    const lines = focusFiles.map((item) => {
      if (typeof item === "string") {
        const path2 = item.trim();
        return path2 === "" ? null : `- ${path2}`;
      }
      if (item && typeof item === "object" && "path" in item && typeof item.path === "string") {
        const path2 = item.path.trim();
        if (path2 === "") return null;
        const reason = "focus_reason" in item && typeof item.focus_reason === "string" && item.focus_reason.trim() !== "" ? `: ${item.focus_reason.trim()}` : "";
        return `- ${path2}${reason}`;
      }
      return null;
    }).filter((value) => Boolean(value));
    if (lines.length === 0) return null;
    return {
      id: "focus-files",
      title: "Focus Files And Directories",
      format: "markdown",
      content: lines.join("\n")
    };
  }
  function normalizeSecurityScanDocument(bundle) {
    const title2 = bundle.repository.repository_full_name || bundle.repoId;
    const sourceUrl = `${baseUrl}/codex/security/scans/${encodeURIComponent(bundle.repoId)}`;
    const sections = [
      buildStatusSection(bundle),
      buildRepositorySection(bundle),
      buildScannedCommitsSection(bundle),
      buildThreatModelSection(bundle),
      buildFocusFilesSection(bundle)
    ].filter((value) => Boolean(value));
    return {
      kind: "security-scan",
      title: title2,
      sourceUrl,
      metadata: {
        title: title2,
        sourceUrl,
        createTime: toUnixSeconds(bundle.scanConfiguration.created_at),
        updateTime: toUnixSeconds(bundle.scanStats.updated_at || bundle.scanConfiguration.updated_at),
        repoId: bundle.repoId,
        repoUrl: getOptionalString(bundle.scanConfiguration.scan_input.repo_url) ?? void 0,
        configuredScanId: bundle.configuredScanId,
        status: bundle.scanStats.current_step
      },
      sections,
      rawPayload: {
        repoId: bundle.repoId,
        configuredScanId: bundle.configuredScanId,
        scanConfiguration: bundle.scanConfiguration,
        scanStats: bundle.scanStats,
        repository: bundle.repository
      },
      parsedProjectOverview: bundle.parsedProjectOverview
    };
  }
  function nonNullable(x2) {
    return x2 != null;
  }
  function onloadSafe(fn2) {
    if (document.readyState === "complete") {
      fn2();
    } else {
      window.addEventListener("load", fn2);
    }
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function dateStr(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  function timestamp() {
    return ( new Date()).toISOString().replace(/:/g, "-").replace(/\..+/, "");
  }
  function getColorScheme() {
    return document.documentElement.style.getPropertyValue("color-scheme");
  }
  function unixTimestampToISOString(timestamp2) {
    if (!timestamp2) return "";
    return new Date(timestamp2 * 1e3).toISOString();
  }
  function jsonlStringify(list2) {
    return list2.map((msg) => JSON.stringify(msg)).join("\n");
  }
  function escapeHtml$1(input) {
    return input.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  }
  function escapeSecurityMarkdownSource(input) {
    return input.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }
  function stripAsciiControlAndWhitespace(input) {
    return Array.from(input).filter((char) => {
      const codePoint = char.charCodeAt(0);
      if (codePoint <= 31 || codePoint === 127) {
        return false;
      }
      return char.trim().length > 0;
    }).join("");
  }
  function isUnsafeUrl(url) {
    const normalized = stripAsciiControlAndWhitespace(
      url.replaceAll(/&#(?:x3a|58|X3A|X58);/g, ":")
    ).toLowerCase();
    return normalized.startsWith("javascript:") || normalized.startsWith("vbscript:") || normalized.startsWith("data:text/html");
  }
  function sanitizeRenderedSecurityHtml(input) {
    const withoutRemoteImages = input.replace(/<img\b[^>]*>/gi, "");
    return withoutRemoteImages.replace(/\s(href|src)=("([^"]*)"|'([^']*)')/gi, (match, attribute, _quotedValue, doubleQuotedValue, singleQuotedValue) => {
      const value = typeof doubleQuotedValue === "string" ? doubleQuotedValue : singleQuotedValue;
      if (!value || !isUnsafeUrl(value)) return match;
      return ` ${attribute}="#"`;
    });
  }
  function getPreferredConfiguredScanIdFromCurrentPage(repoId) {
    if (typeof globalThis.performance?.getEntriesByType !== "function") {
      return null;
    }
    const now = typeof globalThis.performance.now === "function" ? globalThis.performance.now() : null;
    const entries = globalThis.performance.getEntriesByType("resource");
    for (let index2 = entries.length - 1; index2 >= 0; index2 -= 1) {
      const entry = entries[index2];
      if (!("name" in entry) || typeof entry.name !== "string") continue;
      if (now !== null && typeof entry.startTime === "number" && now - entry.startTime > 3e4) continue;
      const match = entry.name.match(/\/backend-api\/aardvark\/scan_configurations\/([^/?#]+)(?:\/stats)?(?:[?#].*)?$/i);
      if (!match) continue;
      const configuredScanId = decodeURIComponent(match[1]);
      if (configuredScanId.endsWith(`:${repoId}`) || configuredScanId === repoId) {
        return configuredScanId;
      }
    }
    return null;
  }
  function resolveSecurityMetaValue(value, document2) {
    return value.replace("{title}", document2.metadata.title).replace("{date}", dateStr()).replace("{timestamp}", timestamp()).replace("{source}", document2.metadata.sourceUrl).replace("{create_time}", unixTimestampToISOString(document2.metadata.createTime)).replace("{update_time}", unixTimestampToISOString(document2.metadata.updateTime)).replace("{chat_id}", "").replace("{model}", "").replace("{model_name}", "").replace("{mode_name}", "");
  }
  function escapeYamlDoubleQuotedScalar(input) {
    return input.replaceAll("\\", "\\\\").replaceAll('"', '\\"').replaceAll("\r", "\\r").replaceAll("\n", "\\n");
  }
  function normalizeSingleLineText(input) {
    return input.replaceAll(/[\r\n]+/g, " ").trim();
  }
  function escapeMarkdownInlineText(input) {
    return input.replaceAll(/([\\`*_{}[\]()#+\-!.>])/g, "\\$1");
  }
  function buildSecurityFrontMatter(document2, metaList) {
    const entries = metaList?.filter((item) => !!item.name).map((item) => `"${escapeYamlDoubleQuotedScalar(item.name)}": "${escapeYamlDoubleQuotedScalar(resolveSecurityMetaValue(item.value, document2))}"`) ?? [];
    return entries.length > 0 ? `---
${entries.join("\n")}
---

` : "";
  }
  function buildSecurityDetailsHtml(document2, metaList) {
    const entries = metaList?.filter((item) => !!item.name).map((item) => [item.name, resolveSecurityMetaValue(item.value, document2)]) ?? [];
    return entries.length > 0 ? `<details>
    <summary>Metadata</summary>
    <div class="metadata_container">
        ${entries.map(([key2, value]) => `<div class="metadata_item"><div>${escapeHtml$1(key2)}</div><div>${escapeHtml$1(value)}</div></div>`).join("\n")}
    </div>
</details>` : "";
  }
  function buildSecuritySectionsMarkdown(document2) {
    return document2.sections.map((section) => `## ${section.title}

${section.content}`).join("\n\n");
  }
  async function loadCurrentSecurityDocument() {
    const context = getPageContext();
    switch (context.kind) {
      case "security-finding": {
        const finding = await fetchSecurityFinding(context.findingId);
        return normalizeSecurityFindingDocument(finding);
      }
      case "security-scan": {
        const preferredConfiguredScanId = getPreferredConfiguredScanIdFromCurrentPage(context.repoId);
        const bundle = await fetchResolvedSecurityScanByRepoId(context.repoId, { preferredConfiguredScanId });
        return normalizeSecurityScanDocument(bundle);
      }
      default:
        return null;
    }
  }
  function securityDocumentToText(document2) {
    const sections = document2.sections.map((section) => `${section.title}:
${section.content}`).join("\n\n");
    return `Title: ${normalizeSingleLineText(document2.title)}
Source: ${document2.sourceUrl}

${sections}`.trim();
  }
  function securityDocumentToMarkdown(document2, metaList) {
    const frontMatter = buildSecurityFrontMatter(document2, metaList);
    const content2 = buildSecuritySectionsMarkdown(document2);
    return `${frontMatter}# ${escapeMarkdownInlineText(normalizeSingleLineText(document2.title))}

${content2}`.trim();
  }
  function securityDocumentToHtml(document2, metaList) {
    const detailsHtml = buildSecurityDetailsHtml(document2, metaList);
    const sectionsHtml = document2.sections.map((section) => {
      const contentHtml = sanitizeRenderedSecurityHtml(toHtml(fromMarkdown(escapeSecurityMarkdownSource(section.content))));
      return `<section id="${escapeHtml$1(section.id)}"><h2>${escapeHtml$1(section.title)}</h2>${contentHtml}</section>`;
    }).join("\n");
    const lang = globalThis.document?.documentElement.lang || "en";
    const theme = getColorScheme() || "light";
    const escapedTitle = escapeHtml$1(normalizeSingleLineText(document2.title));
    const escapedSourceUrl = escapeHtml$1(document2.sourceUrl);
    return templateHtml.replaceAll("{{title}}", escapedTitle).replaceAll("{{date}}", dateStr()).replaceAll("{{time}}", ( new Date()).toISOString()).replaceAll("{{source}}", escapedSourceUrl).replaceAll("{{lang}}", escapeHtml$1(lang)).replaceAll("{{theme}}", escapeHtml$1(theme)).replaceAll("{{avatar}}", "data:,").replaceAll("{{details}}", detailsHtml).replaceAll("{{content}}", `<article class="conversation-item"><div class="conversation-content-wrapper"><div class="conversation-content"><h1>${escapedTitle}</h1>${sectionsHtml}</div></div></article>`);
  }
  function getSecurityFileNameOptions(document2) {
    return {
      title: document2.metadata.title,
      createTime: document2.metadata.createTime,
      updateTime: document2.metadata.updateTime
    };
  }
  function securityDocumentToJson(document2) {
    return JSON.stringify(document2.rawPayload);
  }
  function getSecurityUnsupportedMessage() {
    const context = getPageContext();
    if (context.kind === "security-findings-list") {
      return "Security findings list export is not supported yet.";
    }
    return `Export is not supported on ${baseUrl}${location.pathname}.`;
  }
  const INTERNAL_CONTENT_TYPES = new Set([
    "thoughts",
    "reasoning_recap",
    "model_editable_context"
  ]);
  const THINKING_CONTENT_TYPES = new Set([
    "thoughts",
    "reasoning_recap"
  ]);
  function isProThinkingMeta(message) {
    const initialText = message.metadata?.initial_text?.toLowerCase() || "";
    const finishedText = message.metadata?.finished_text?.toLowerCase() || "";
    return message.metadata?.async_task_type === "pro_mode" || initialText.includes("reason") || finishedText.startsWith("reasoned for");
  }
  function isInternalContentType(contentType) {
    return INTERNAL_CONTENT_TYPES.has(contentType);
  }
  function shouldSkipAsInternal(message) {
    if (!message?.content) return true;
    if (message.metadata?.is_visually_hidden_from_conversation) return true;
    return isInternalContentType(message.content.content_type);
  }
  function isAnalysisCodeMessage(message) {
    if (!message?.content) return false;
    if (message.author.role !== "assistant") return false;
    if (message.content.content_type !== "code") return false;
    return message.recipient === "python" || message.channel === "commentary";
  }
  function isAnalysisExecutionOutput(message) {
    if (!message?.content) return false;
    if (message.author.role !== "tool") return false;
    if (message.content.content_type !== "execution_output") return false;
    return message.author.name === "python" || message.channel === "commentary";
  }
  function isThinkingMessage(message) {
    if (!message?.content) return false;
    if (THINKING_CONTENT_TYPES.has(message.content.content_type)) return true;
    if (message.author.role !== "tool") return false;
    if (message.content.content_type !== "text") return false;
    return isProThinkingMeta(message);
  }
  function hasExecutionOutputImage(message) {
    if (message.content.content_type !== "execution_output") return false;
    return getExecutionOutputImages(message.metadata).length > 0;
  }
  function isThinkingToolTextMessage(message) {
    return isThinkingMessage(message) && message.author.role === "tool" && message.content.content_type === "text";
  }
  function shouldIncludeMessageForExport(message) {
    if (!message?.content) return false;
    if (shouldSkipAsInternal(message)) return false;
    if (isAnalysisCodeMessage(message)) return true;
    if (isAnalysisExecutionOutput(message)) return true;
    if (isThinkingToolTextMessage(message)) return true;
    if (message.recipient !== "all") return false;
    if (message.author.role !== "tool") return true;
    return message.content.content_type === "multimodal_text" || hasExecutionOutputImage(message);
  }
  const UI_TOKEN_REGEX = /\uE200([a-z0-9_]+)\uE202([\s\S]*?)\uE201/giu;
  const UNICODE_SPACE_REGEX = /[\u00A0\u202F\u2007\u2060]/gu;
  const UNICODE_HYPHEN_REGEX = /[\u2010-\u2015\u2212]/gu;
  function stripUiTokens(input) {
    return input.replace(UI_TOKEN_REGEX, (_match, tokenType, payload) => {
      return tokenType.toLowerCase() === "cite" ? payload : "";
    });
  }
  function normalizeReferenceText(input) {
    return input.replaceAll(UNICODE_SPACE_REGEX, " ").replaceAll(UNICODE_HYPHEN_REGEX, "-");
  }
  function getReferenceTokens(matchedText) {
    if (!matchedText) return [];
    return Array.from( new Set([
      normalizeReferenceText(matchedText),
      normalizeReferenceText(stripUiTokens(matchedText))
    ])).filter(Boolean);
  }
  function replaceReferenceTokens(input, matchedText, replacement) {
    const matchedTokens = getReferenceTokens(matchedText);
    let output = input;
    for (const token of matchedTokens) {
      output = output.replaceAll(token, replacement);
    }
    return output;
  }
  function parseWidgetState(widgetState) {
    if (!widgetState) return null;
    if (typeof widgetState === "string") {
      try {
        const parsed = JSON.parse(widgetState);
        if (parsed && typeof parsed === "object") {
          return parsed;
        }
      } catch {
        return null;
      }
    }
    if (typeof widgetState === "object") {
      return widgetState;
    }
    return null;
  }
  function isDeepResearchWidgetMessage(message) {
    const chatgptSdk = message?.metadata?.chatgpt_sdk;
    return chatgptSdk?.html_asset_pointer === "internal://deep-research" || chatgptSdk?.resolved_pineapple_uri === "connectors://connector_openai_deep_research";
  }
  function isConversationNodeMessageLike(value) {
    if (!value || typeof value !== "object") return false;
    const candidate = value;
    return typeof candidate.id === "string" && typeof candidate.status === "string" && typeof candidate.weight === "number" && !!candidate.author && typeof candidate.author.role === "string" && !!candidate.content && typeof candidate.content.content_type === "string" && typeof candidate.recipient === "string";
  }
  function extractDeepResearchReportMessage(message) {
    if (!isDeepResearchWidgetMessage(message)) return null;
    const widgetState = parseWidgetState(message?.metadata?.chatgpt_sdk?.widget_state);
    const reportMessage = widgetState?.report_message;
    if (!isConversationNodeMessageLike(reportMessage)) return null;
    if (reportMessage.author.role !== "assistant") return null;
    if (reportMessage.recipient !== "all") return null;
    return reportMessage;
  }
  function resolveExportMessage(message) {
    if (!message?.content) return null;
    return extractDeepResearchReportMessage(message) ?? message;
  }
  function isExecutionOutputImage(value) {
    if (typeof value !== "object" || value === null) return false;
    const maybeImage = value;
    return maybeImage.message_type === "image" && typeof maybeImage.image_url === "string" && typeof maybeImage.height === "number" && typeof maybeImage.width === "number";
  }
  function getExecutionOutputImages(metadata) {
    const messages = metadata?.aggregate_result?.messages;
    if (!Array.isArray(messages)) return [];
    return messages.filter(isExecutionOutputImage);
  }
  function getExecutionOutputText(content2) {
    return stripUiTokens(content2.text || "");
  }
  function getExportAuthorLabel(message) {
    if (isThinkingMessage(message)) {
      return "ChatGPT (Thinking)";
    }
    if (isAnalysisCodeMessage(message)) {
      return "ChatGPT (Analysis)";
    }
    if (isAnalysisExecutionOutput(message)) {
      if (message.author.name === "python") {
        return "Python (Analysis)";
      }
      return `Plugin${message.author.name ? ` (${message.author.name})` : ""} (Analysis)`;
    }
    switch (message.author.role) {
      case "assistant":
        return "ChatGPT";
      case "user":
        return "You";
      case "tool":
        return `Plugin${message.author.name ? ` (${message.author.name})` : ""}`;
      default:
        return message.author.role;
    }
  }
  const DEFAULT_SANITIZE_TEXT_OPTIONS = {
    normalization: "NFKC",
    replaceQuotes: true,
    replaceDashes: true,
    replaceEllipsis: true,
    normalizeLineBreaks: true,
    normalizeSpaces: true,
    collapseSpaces: false,
    removeSoftHyphen: true,
    removeZeroWidth: true,
    preserveEmojiZWJ: true,
    removeBidiControls: true,
    removeC0Controls: false,
    stripChatGptUtmSourceFromMarkdownLinks: true
  };
  const ODD_LINE_BREAKS_REGEX = /[\u0085\u2028\u2029]/gu;
  const ELLIPSIS_REGEX = /\u2026/gu;
  const DASHES_REGEX = /[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/gu;
  const SINGLE_QUOTES_REGEX = /[\u2018\u2019\u201A\u201B\u2032\u02BC\uFF07]/gu;
  const DOUBLE_QUOTES_REGEX = /[\u201C\u201D\u201E\u201F\u2033\u00AB\u00BB\u301D-\u301F\uFF02]/gu;
  const ODD_SPACES_REGEX = /[\u00A0\u202F\u2000-\u200A\u205F\u3000]/gu;
  const SPACE_RUNS_REGEX = / {2,}/gu;
  const SOFT_HYPHEN_REGEX = /\u00AD/gu;
  const ZERO_WIDTH_REGEX = /(?:\u200B|\u200C|\u200D|\u2060|\uFEFF)/gu;
  const ZERO_WIDTH_NO_ZWJ_REGEX = /(?:\u200B|\u200C|\u2060|\uFEFF)/gu;
  const BIDI_CONTROLS_REGEX = /[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/gu;
  const MARKDOWN_LINK_URL_REGEX = /(\[[^\]]+\]\(\s*<?)([^>\s)]+)(>?(?:\s+(?:"[^"]*"|'[^']*'|\([^)]+\)))?\s*\))/gu;
  const CHATGPT_UTM_SOURCE_AT_END_REGEX = /(?:\?|&)utm_source=chatgpt\.com$/;
  function resolveSanitizeTextOptions(options = {}) {
    return {
      ...DEFAULT_SANITIZE_TEXT_OPTIONS,
      ...options
    };
  }
  function isRemovableC0Control(codeUnit) {
    if (codeUnit === 9 || codeUnit === 10 || codeUnit === 13) return false;
    return codeUnit >= 0 && codeUnit <= 31 || codeUnit === 127;
  }
  function removeC0ControlCharacters(input) {
    let segments;
    let segmentStart = 0;
    for (let index2 = 0; index2 < input.length; index2++) {
      const codeUnit = input.charCodeAt(index2);
      if (!isRemovableC0Control(codeUnit)) continue;
      if (segments === void 0) {
        segments = [];
      }
      if (segmentStart < index2) {
        segments.push(input.slice(segmentStart, index2));
      }
      segmentStart = index2 + 1;
    }
    if (segments === void 0) return input;
    if (segmentStart < input.length) {
      segments.push(input.slice(segmentStart));
    }
    return segments.join("");
  }
  function stripChatGptUtmSourceFromMarkdownLinks(input) {
    return input.replaceAll(MARKDOWN_LINK_URL_REGEX, (match, prefix, urlText, suffix) => {
      if (!CHATGPT_UTM_SOURCE_AT_END_REGEX.test(urlText)) return match;
      try {
        const parsed = new URL(urlText);
        if (parsed.searchParams.get("utm_source") !== "chatgpt.com") return match;
        parsed.searchParams.delete("utm_source");
        const serialized = parsed.toString();
        if (!serialized) return match;
        return `${prefix}${serialized}${suffix}`;
      } catch {
        return match;
      }
    });
  }
  function sanitizeLLMText(input, options = {}) {
    const resolved = resolveSanitizeTextOptions(options);
    let output = input;
    if (resolved.normalization !== "none") {
      output = output.normalize(resolved.normalization);
    }
    if (resolved.normalizeLineBreaks) {
      output = standardizeLineBreaks(output);
      output = output.replaceAll(ODD_LINE_BREAKS_REGEX, "\n");
    }
    if (resolved.replaceEllipsis) {
      output = output.replaceAll(ELLIPSIS_REGEX, "...");
    }
    if (resolved.replaceDashes) {
      output = output.replaceAll(DASHES_REGEX, "-");
    }
    if (resolved.replaceQuotes) {
      output = output.replaceAll(SINGLE_QUOTES_REGEX, "'").replaceAll(DOUBLE_QUOTES_REGEX, '"');
    }
    if (resolved.normalizeSpaces) {
      output = output.replaceAll(ODD_SPACES_REGEX, " ");
    }
    if (resolved.collapseSpaces) {
      output = output.replaceAll(SPACE_RUNS_REGEX, " ");
    }
    if (resolved.removeSoftHyphen) {
      output = output.replaceAll(SOFT_HYPHEN_REGEX, "");
    }
    if (resolved.removeZeroWidth) {
      output = output.replaceAll(resolved.preserveEmojiZWJ ? ZERO_WIDTH_NO_ZWJ_REGEX : ZERO_WIDTH_REGEX, "");
    }
    if (resolved.removeBidiControls) {
      output = output.replaceAll(BIDI_CONTROLS_REGEX, "");
    }
    if (resolved.removeC0Controls) {
      output = removeC0ControlCharacters(output);
    }
    if (resolved.stripChatGptUtmSourceFromMarkdownLinks) {
      output = stripChatGptUtmSourceFromMarkdownLinks(output);
    }
    return output;
  }
  async function exportToText() {
    const pageContext = getPageContext();
    if (pageContext.kind === "security-finding" || pageContext.kind === "security-scan") {
      const document2 = await loadCurrentSecurityDocument();
      if (!document2) {
        alert(getSecurityUnsupportedMessage());
        return false;
      }
      await copyToClipboard(standardizeLineBreaks(securityDocumentToText(document2)));
      return true;
    }
    if (pageContext.kind !== "conversation") {
      alert(getSecurityUnsupportedMessage());
      return false;
    }
    if (!checkIfConversationStarted()) {
      alert(instance.t("Please start a conversation first"));
      return false;
    }
    const chatId = await getCurrentChatId();
    const rawConversation = await fetchConversation(chatId, false);
    const { conversationNodes } = processConversation(rawConversation);
    const text2 = conversationNodes.map(({ message }) => transformMessageForTextExport(message)).filter(Boolean).join("\n\n");
    await copyToClipboard(standardizeLineBreaks(text2));
    return true;
  }
  const LatexRegex$1 = /(\s\$\$.+\$\$\s|\s\$.+\$\s|\\\[.+\\\]|\\\(.+\\\))|(^\$$[\S\s]+^\$$)|(^\$\$[\S\s]+^\$\$$)/gm;
  function transformMessageForTextExport(message) {
    const exportMessage = resolveExportMessage(message);
    if (!exportMessage?.content) return null;
    if (!shouldIncludeMessageForExport(exportMessage)) return null;
    const author = getExportAuthorLabel(exportMessage);
    let content2 = transformContent$2(exportMessage.content, exportMessage.metadata);
    const matches = content2.match(LatexRegex$1);
    if (matches) {
      let index2 = 0;
      content2 = content2.replace(LatexRegex$1, () => {
        return `╬${index2++}╬`;
      });
    }
    if (exportMessage.author.role === "assistant") {
      content2 = transformContentReferences$2(content2, exportMessage.metadata);
      content2 = transformFootNotes$2(content2, exportMessage.metadata);
    }
    if (exportMessage.author.role === "assistant" && content2) {
      content2 = reformatContent(content2);
    }
    if (matches) {
      content2 = content2.replace(/╬(\d+)╬/g, (_2, index2) => {
        return matches[+index2];
      });
    }
    content2 = sanitizeLLMText(content2);
    return `${author}:
${content2}`;
  }
  function transformContent$2(content2, metadata) {
    switch (content2.content_type) {
      case "text":
        return stripUiTokens(content2.parts?.join("\n") || "");
      case "code":
        return stripUiTokens(content2.text || "");
      case "execution_output": {
        const images = getExecutionOutputImages(metadata);
        if (images.length > 0) {
          return images.map(() => "[image]").join("\n");
        }
        return getExecutionOutputText(content2);
      }
      case "tether_quote":
        return `> ${stripUiTokens(content2.title || content2.text || "")}`;
      case "tether_browsing_code":
        return "";
case "tether_browsing_display": {
        const metadataList = metadata?._cite_metadata?.metadata_list;
        if (Array.isArray(metadataList) && metadataList.length > 0) {
          return metadataList.map(({ title: title2, url }) => `> [${title2}](${url})`).join("\n");
        }
        return "";
      }
      case "multimodal_text": {
        return content2.parts?.map((part) => {
          if (typeof part === "string") return stripUiTokens(part);
          if (part.content_type === "image_asset_pointer") return "[image]";
          if (part.content_type === "audio_transcription") return `[audio] ${stripUiTokens(part.text)}`;
          if (part.content_type === "audio_asset_pointer") return null;
          if (part.content_type === "real_time_user_audio_video_asset_pointer") return null;
          return "[Unsupported multimodal content]";
        }).join("\n") || "";
      }
      default:
        return "[Unsupported Content]";
    }
  }
  function reformatContent(input) {
    const root2 = fromMarkdown(input);
    flatMap(root2, (item) => {
      if (item.type === "strong") return item.children;
      if (item.type === "emphasis") return item.children;
      return [item];
    });
    const result = toMarkdown(root2);
    if (result.startsWith("\\[") && input.startsWith("[")) {
      return result.slice(1);
    }
    return result;
  }
  function transformContentReferences$2(input, metadata) {
    const contentRefs = metadata?.content_references;
    if (!contentRefs || contentRefs.length === 0) return input;
    const sortedRefs = [...contentRefs].sort((a2, b2) => (b2.matched_text?.length || 0) - (a2.matched_text?.length || 0));
    let output = normalizeReferenceText(input);
    for (const ref of sortedRefs) {
      if (!ref.matched_text) continue;
      switch (ref.type) {
        case "sources_footnote":
          break;
        default:
          output = replaceReferenceTokens(output, ref.matched_text, ref.alt || "");
      }
    }
    return output;
  }
  function transformFootNotes$2(input, metadata) {
    const footNoteMarkRegex = /【(\d+)†\((.+?)\)】/g;
    return input.replace(footNoteMarkRegex, (match, citeIndex, _evidenceText) => {
      const citation = metadata?.citations?.find((cite) => cite.metadata?.extra?.cited_message_idx === +citeIndex);
      if (citation) return "";
      return match;
    });
  }
  function getExportCapabilities() {
    const context = getPageContext();
    switch (context.kind) {
      case "conversation":
        return {
          canExportText: true,
          canExportPng: true,
          canExportMarkdown: true,
          canExportHtml: true,
          canExportJson: true,
          canExportTavern: true,
          canExportOoba: true,
          canExportAll: true,
          historyDisabledApplies: true,
          copyShortcutEnabled: true
        };
      case "security-finding":
      case "security-scan":
        return {
          canExportText: true,
          canExportPng: true,
          canExportMarkdown: true,
          canExportHtml: true,
          canExportJson: true,
          canExportTavern: false,
          canExportOoba: false,
          canExportAll: false,
          historyDisabledApplies: false,
          copyShortcutEnabled: false
        };
      case "security-findings-list":
      case "unsupported":
        return {
          canExportText: false,
          canExportPng: false,
          canExportMarkdown: false,
          canExportHtml: false,
          canExportJson: false,
          canExportTavern: false,
          canExportOoba: false,
          canExportAll: false,
          historyDisabledApplies: false,
          copyShortcutEnabled: false
        };
    }
  }
  const EDITABLE_SELECTOR = 'input, textarea, select, [contenteditable], [role="textbox"]';
  const MODIFIER_ORDER = ["Mod", "Shift", "Alt"];
  const MODIFIER_ALIASES = {
    mod: "Mod",
    meta: "Mod",
    cmd: "Mod",
    command: "Mod",
    ctrl: "Mod",
    control: "Mod",
    shift: "Shift",
    alt: "Alt",
    option: "Alt"
  };
  const DEFAULT_COPY_TEXT_SHORTCUT$1 = "Mod+Shift+E";
  function isMacPlatform(platform2) {
    if (!platform2) return false;
    return /mac|iphone|ipad|ipod/i.test(platform2);
  }
  function isEditableTarget(target) {
    if (!target || typeof target !== "object") return false;
    if (typeof Element !== "undefined" && target instanceof Element) {
      return Boolean(target.closest(EDITABLE_SELECTOR));
    }
    if ("closest" in target && typeof target.closest === "function") {
      return Boolean(target.closest(EDITABLE_SELECTOR));
    }
    return false;
  }
  function parseShortcut(shortcut) {
    if (typeof shortcut !== "string") return null;
    const rawParts = shortcut.split("+").map((part) => part.trim()).filter(Boolean);
    if (rawParts.length < 2) return null;
    const key2 = rawParts[rawParts.length - 1].toUpperCase();
    if (!/^[A-Z]$/.test(key2)) return null;
    const modifiers = new Set();
    for (const part of rawParts.slice(0, -1)) {
      const mapped = MODIFIER_ALIASES[part.toLowerCase()];
      if (!mapped) return null;
      modifiers.add(mapped);
    }
    if (!modifiers.has("Mod") || !modifiers.has("Shift")) return null;
    return { key: key2, modifiers };
  }
  function formatShortcut(parsed) {
    const orderedModifiers = MODIFIER_ORDER.filter((modifier) => parsed.modifiers.has(modifier));
    return [...orderedModifiers, parsed.key].join("+");
  }
  function normalizeCopyTextShortcut(value, fallback = DEFAULT_COPY_TEXT_SHORTCUT$1) {
    const parsed = parseShortcut(value);
    if (!parsed) return fallback;
    return formatShortcut(parsed);
  }
  function matchesExportCopyShortcut(event, isMac, configuredShortcut = DEFAULT_COPY_TEXT_SHORTCUT$1) {
    const parsed = parseShortcut(configuredShortcut);
    if (!parsed) return false;
    const requiresAlt = parsed.modifiers.has("Alt");
    const requiresShift = parsed.modifiers.has("Shift");
    const requiresMod = parsed.modifiers.has("Mod");
    if (event.altKey !== requiresAlt) return false;
    if (event.shiftKey !== requiresShift) return false;
    if (event.key.toUpperCase() !== parsed.key) return false;
    if (!requiresMod) {
      return !(event.metaKey || event.ctrlKey);
    }
    if (isMac) {
      return event.metaKey && !event.ctrlKey;
    }
    return event.ctrlKey && !event.metaKey;
  }
  function isEditableContext(target, activeElement) {
    return isEditableTarget(target) || isEditableTarget(activeElement);
  }
  const DEFAULT_FILENAME_FORMAT = "ChatGPT-{title}";
  const DEFAULT_EXPORT_ALL_LIMIT = 1e3;
  const DEFAULT_COPY_TEXT_SHORTCUT = "Mod+Shift+E";
  const DEFAULT_EXPORT_META_LIST = [
    { name: "title", value: "{title}" },
    { name: "source", value: "{source}" }
  ];
  const DEFAULT_EXPORTER_SETTINGS = {
    format: DEFAULT_FILENAME_FORMAT,
    enableTimestamp: false,
    timeStamp24H: false,
    enableTimestampHTML: false,
    enableTimestampMarkdown: false,
    enableMeta: false,
    exportMetaList: DEFAULT_EXPORT_META_LIST,
    exportAllLimit: DEFAULT_EXPORT_ALL_LIMIT,
    enableCopyTextShortcut: true,
    copyTextShortcut: DEFAULT_COPY_TEXT_SHORTCUT
  };
  const listeners = new Set();
  function cloneExportMetaList(exportMetaList) {
    return exportMetaList.map((meta) => ({ ...meta }));
  }
  function cloneSettings(settings) {
    return {
      ...settings,
      exportMetaList: cloneExportMetaList(settings.exportMetaList)
    };
  }
  function sanitizeBoolean(value, fallback) {
    return typeof value === "boolean" ? value : fallback;
  }
  function sanitizeString(value, fallback) {
    return typeof value === "string" ? value : fallback;
  }
  function sanitizeExportAllLimit(value) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return DEFAULT_EXPORT_ALL_LIMIT;
    }
    const clamped = Math.min(2e4, Math.max(100, value));
    return Math.round(clamped / 100) * 100;
  }
  function sanitizeCopyTextShortcut(value) {
    return normalizeCopyTextShortcut(value, DEFAULT_EXPORTER_SETTINGS.copyTextShortcut);
  }
  function sanitizeExportMetaList(value) {
    if (!Array.isArray(value)) {
      return cloneExportMetaList(DEFAULT_EXPORT_META_LIST);
    }
    const sanitized = value.filter((item) => {
      if (!item || typeof item !== "object") return false;
      const maybeItem = item;
      return typeof maybeItem.name === "string" && typeof maybeItem.value === "string";
    }).map((item) => ({
      name: item.name.trim(),
      value: item.value.trim()
    }));
    return sanitized.length > 0 ? sanitized : cloneExportMetaList(DEFAULT_EXPORT_META_LIST);
  }
  function sanitizeSettings(input) {
    return {
      format: sanitizeString(input.format, DEFAULT_EXPORTER_SETTINGS.format),
      enableTimestamp: sanitizeBoolean(input.enableTimestamp, DEFAULT_EXPORTER_SETTINGS.enableTimestamp),
      timeStamp24H: sanitizeBoolean(input.timeStamp24H, DEFAULT_EXPORTER_SETTINGS.timeStamp24H),
      enableTimestampHTML: sanitizeBoolean(input.enableTimestampHTML, DEFAULT_EXPORTER_SETTINGS.enableTimestampHTML),
      enableTimestampMarkdown: sanitizeBoolean(input.enableTimestampMarkdown, DEFAULT_EXPORTER_SETTINGS.enableTimestampMarkdown),
      enableMeta: sanitizeBoolean(input.enableMeta, DEFAULT_EXPORTER_SETTINGS.enableMeta),
      exportMetaList: sanitizeExportMetaList(input.exportMetaList),
      exportAllLimit: sanitizeExportAllLimit(input.exportAllLimit),
      enableCopyTextShortcut: sanitizeBoolean(input.enableCopyTextShortcut, DEFAULT_EXPORTER_SETTINGS.enableCopyTextShortcut),
      copyTextShortcut: sanitizeCopyTextShortcut(input.copyTextShortcut)
    };
  }
  function readStoredSettings() {
    return sanitizeSettings({
      format: ScriptStorage.get(KEY_FILENAME_FORMAT),
      enableTimestamp: ScriptStorage.get(KEY_TIMESTAMP_ENABLED),
      timeStamp24H: ScriptStorage.get(KEY_TIMESTAMP_24H),
      enableTimestampHTML: ScriptStorage.get(KEY_TIMESTAMP_HTML),
      enableTimestampMarkdown: ScriptStorage.get(KEY_TIMESTAMP_MARKDOWN),
      enableMeta: ScriptStorage.get(KEY_META_ENABLED),
      exportMetaList: ScriptStorage.get(KEY_META_LIST),
      exportAllLimit: ScriptStorage.get(KEY_EXPORT_ALL_LIMIT),
      enableCopyTextShortcut: ScriptStorage.get(KEY_COPY_TEXT_SHORTCUT_ENABLED),
      copyTextShortcut: ScriptStorage.get(KEY_COPY_TEXT_SHORTCUT)
    });
  }
  function writeStoredSettings(settings) {
    ScriptStorage.set(KEY_FILENAME_FORMAT, settings.format);
    ScriptStorage.set(KEY_TIMESTAMP_ENABLED, settings.enableTimestamp);
    ScriptStorage.set(KEY_TIMESTAMP_24H, settings.timeStamp24H);
    ScriptStorage.set(KEY_TIMESTAMP_HTML, settings.enableTimestampHTML);
    ScriptStorage.set(KEY_TIMESTAMP_MARKDOWN, settings.enableTimestampMarkdown);
    ScriptStorage.set(KEY_META_ENABLED, settings.enableMeta);
    ScriptStorage.set(KEY_META_LIST, settings.exportMetaList);
    ScriptStorage.set(KEY_EXPORT_ALL_LIMIT, settings.exportAllLimit);
    ScriptStorage.set(KEY_COPY_TEXT_SHORTCUT_ENABLED, settings.enableCopyTextShortcut);
    ScriptStorage.set(KEY_COPY_TEXT_SHORTCUT, settings.copyTextShortcut);
  }
  function notifyListeners(settings) {
    const snapshot = cloneSettings(settings);
    listeners.forEach((listener) => {
      listener(snapshot);
    });
  }
  let cachedSettings = null;
  function getSettings() {
    if (!cachedSettings) {
      cachedSettings = readStoredSettings();
    }
    return cloneSettings(cachedSettings);
  }
  function saveSettings(nextSettings) {
    const merged = sanitizeSettings({
      ...getSettings(),
      ...nextSettings
    });
    writeStoredSettings(merged);
    cachedSettings = merged;
    applyTimestampFormatPreference(merged);
    notifyListeners(merged);
    return cloneSettings(merged);
  }
  function resetSettings() {
    const defaults = cloneSettings(DEFAULT_EXPORTER_SETTINGS);
    writeStoredSettings(defaults);
    cachedSettings = defaults;
    applyTimestampFormatPreference(defaults);
    notifyListeners(defaults);
    return cloneSettings(defaults);
  }
  function subscribeSettings(listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }
  function getStoredLanguage() {
    const language = ScriptStorage.get(KEY_LANGUAGE);
    return typeof language === "string" && language ? language : null;
  }
  function setStoredLanguage(language) {
    ScriptStorage.set(KEY_LANGUAGE, language);
  }
  function applyTimestampFormatPreference(settings = getSettings()) {
    if (typeof document !== "object" || !document.body) return;
    if (settings.enableTimestamp) {
      document.body.setAttribute("data-time-format", settings.timeStamp24H ? "24" : "12");
    } else {
      document.body.removeAttribute("data-time-format");
    }
  }
  const COPY_TEXT_SHORTCUT_SUCCESS_EVENT = "ce:copy-text-success";
  let shortcutRegistered = false;
  let settingsSubscribed = false;
  let activeShortcutSettings = {
    enabled: true,
    shortcut: DEFAULT_COPY_TEXT_SHORTCUT$1
  };
  function refreshShortcutSettings() {
    const settings = getSettings();
    activeShortcutSettings = {
      enabled: settings.enableCopyTextShortcut,
      shortcut: settings.copyTextShortcut
    };
  }
  async function handleShortcutKeydown(event, isMac) {
    if (event.repeat) {
      return;
    }
    if (event.isComposing) {
      return;
    }
    if (!activeShortcutSettings.enabled) {
      return;
    }
    if (!matchesExportCopyShortcut(event, isMac, activeShortcutSettings.shortcut)) {
      return;
    }
    if (isEditableContext(event.target, document.activeElement)) {
      return;
    }
    if (!getExportCapabilities().copyShortcutEnabled) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const success = await exportToText();
    if (success) {
      window.dispatchEvent(new CustomEvent(COPY_TEXT_SHORTCUT_SUCCESS_EVENT));
    }
  }
  function registerExportCopyShortcut() {
    if (shortcutRegistered) return;
    refreshShortcutSettings();
    if (!settingsSubscribed) {
      subscribeSettings((nextSettings) => {
        activeShortcutSettings = {
          enabled: nextSettings.enableCopyTextShortcut,
          shortcut: nextSettings.copyTextShortcut
        };
      });
      settingsSubscribed = true;
    }
    const isMac = isMacPlatform(window.navigator.platform);
    document.addEventListener("keydown", (event) => {
      void handleShortcutKeydown(event, isMac).catch((error) => {
        console.error("Copy shortcut failed:", error);
      });
    });
    shortcutRegistered = true;
  }
  function t$1(key2, fallback) {
    const value = instance.t(key2);
    return value === key2 ? fallback : value;
  }
  function createPanelTemplate() {
    const languageOptions = LOCALES.map((locale) => `<option value="${locale.code}">${locale.name}</option>`).join("");
    return `
<div class="ce-overlay" data-ce-role="overlay">
  <div class="ce-panel" role="dialog" aria-modal="true" aria-labelledby="ce-settings-title">
    <header class="ce-header">
      <h2 id="ce-settings-title">${t$1("Exporter Settings", "Exporter Settings")}</h2>
      <button type="button" class="ce-icon-btn" data-ce-role="close" aria-label="${t$1("Close", "Close")}">×</button>
    </header>

    <div class="ce-body">
      <section class="ce-group">
        <label class="ce-row">
          <span>${t$1("Language", "Language")}</span>
          <select data-ce-role="language">${languageOptions}</select>
        </label>

        <label class="ce-row">
          <span>${t$1("File Name", "File Name")}</span>
          <input type="text" data-ce-role="format" placeholder="ChatGPT-{title}" />
        </label>

        <label class="ce-row">
          <span>${t$1("Export All Limit", "Export All Limit")}</span>
          <input type="number" min="100" max="20000" step="100" data-ce-role="export-all-limit" />
        </label>
      </section>

      <section class="ce-group">
        <label class="ce-row ce-toggle-row">
          <span>${t$1("Conversation Timestamp", "Conversation Timestamp")}</span>
          <input type="checkbox" data-ce-role="enable-timestamp" />
        </label>

        <div class="ce-subgroup" data-ce-role="timestamp-options">
          <label class="ce-row ce-toggle-row">
            <span>${t$1("Use 24-hour format", "Use 24-hour format")}</span>
            <input type="checkbox" data-ce-role="timestamp-24h" />
          </label>
          <label class="ce-row ce-toggle-row">
            <span>${t$1("Enable on HTML", "Enable on HTML")}</span>
            <input type="checkbox" data-ce-role="timestamp-html" />
          </label>
          <label class="ce-row ce-toggle-row">
            <span>${t$1("Enable on Markdown", "Enable on Markdown")}</span>
            <input type="checkbox" data-ce-role="timestamp-markdown" />
          </label>
        </div>
      </section>

      <section class="ce-group">
        <label class="ce-row ce-toggle-row">
          <span>${t$1("Export Metadata", "Export Metadata")}</span>
          <input type="checkbox" data-ce-role="enable-meta" />
        </label>

        <div class="ce-subgroup" data-ce-role="meta-options">
          <div class="ce-meta-list" data-ce-role="meta-list"></div>
          <button type="button" class="ce-secondary-btn" data-ce-role="meta-add">+ ${t$1("Add", "Add")}</button>
        </div>
      </section>

      <section class="ce-group">
        <label class="ce-row ce-toggle-row">
          <span>${t$1("Enable Copy Text Shortcut", "Enable Copy Text Shortcut")}</span>
          <input type="checkbox" data-ce-role="enable-copy-text-shortcut" />
        </label>

        <div class="ce-subgroup" data-ce-role="shortcut-options">
          <label class="ce-row">
            <span>${t$1("Copy Text Shortcut", "Copy Text Shortcut")}</span>
            <input type="text" data-ce-role="copy-text-shortcut" placeholder="Mod+Shift+E" />
          </label>
          <p class="ce-help">
            ${t$1("Shortcut Conflict Help", "Some browser and extension shortcuts override page shortcuts. If this combo does not trigger, choose a different one.")}
          </p>
        </div>
      </section>
    </div>

    <footer class="ce-footer">
      <button type="button" class="ce-secondary-btn" data-ce-role="reset">${t$1("Reset", "Reset")}</button>
      <span class="ce-spacer"></span>
      <button type="button" class="ce-secondary-btn" data-ce-role="cancel">${t$1("Cancel", "Cancel")}</button>
      <button type="button" class="ce-primary-btn" data-ce-role="save">${t$1("Save", "Save")}</button>
    </footer>
  </div>
</div>
`;
  }
  function createPanelStyle() {
    return `
:host {
  all: initial;
}

.ce-overlay,
.ce-overlay * {
  box-sizing: border-box;
  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.ce-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.56);
  z-index: 2147483647;
  padding: 24px;
}

.ce-panel {
  width: min(720px, 100%);
  max-height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #111111;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.3);
}

.ce-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid #e5e5e5;
}

.ce-header h2 {
  margin: 0;
  font-size: 16px;
  line-height: 1.2;
  font-weight: 700;
}

.ce-icon-btn {
  border: none;
  background: transparent;
  color: #333333;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  padding: 4px;
}

.ce-body {
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ce-group {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ce-row {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.ce-row span {
  font-size: 13px;
  color: #222222;
}

.ce-row input[type="text"],
.ce-row input[type="number"],
.ce-row select {
  width: 320px;
  max-width: 60%;
  border: 1px solid #c7c7c7;
  border-radius: 6px;
  font-size: 13px;
  padding: 8px 10px;
  background: #fff;
  color: #111;
}

.ce-toggle-row input[type="checkbox"] {
  width: 18px;
  height: 18px;
}

.ce-subgroup {
  margin-top: 2px;
  border-top: 1px solid #f0f0f0;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ce-help {
  margin: 0;
  color: #555;
  font-size: 12px;
  line-height: 1.4;
}

.ce-meta-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ce-meta-item {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 8px;
}

.ce-meta-item input {
  width: 100%;
  border: 1px solid #c7c7c7;
  border-radius: 6px;
  font-size: 13px;
  padding: 8px 10px;
}

.ce-remove-btn,
.ce-secondary-btn,
.ce-primary-btn {
  border-radius: 6px;
  font-size: 13px;
  padding: 8px 12px;
  cursor: pointer;
}

.ce-remove-btn,
.ce-secondary-btn {
  border: 1px solid #c7c7c7;
  background: #fff;
  color: #222;
}

.ce-primary-btn {
  border: 1px solid #0b57d0;
  background: #0b57d0;
  color: #fff;
}

.ce-footer {
  border-top: 1px solid #e5e5e5;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ce-spacer {
  flex: 1;
}

@media (max-width: 760px) {
  .ce-overlay {
    align-items: flex-start;
    padding: 12px;
  }

  .ce-panel {
    max-height: calc(100vh - 24px);
  }

  .ce-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .ce-row input[type="text"],
  .ce-row input[type="number"],
  .ce-row select {
    max-width: 100%;
    width: 100%;
  }

  .ce-meta-item {
    grid-template-columns: 1fr;
  }
}
`;
  }
  function getPanelElements(shadow) {
    const query = (selector) => {
      const element2 = shadow.querySelector(selector);
      if (!element2) throw new Error(`Missing settings panel element: ${selector}`);
      return element2;
    };
    return {
      backdrop: query('[data-ce-role="overlay"]'),
      closeButton: query('[data-ce-role="close"]'),
      cancelButton: query('[data-ce-role="cancel"]'),
      saveButton: query('[data-ce-role="save"]'),
      resetButton: query('[data-ce-role="reset"]'),
      languageSelect: query('[data-ce-role="language"]'),
      formatInput: query('[data-ce-role="format"]'),
      exportAllLimitInput: query('[data-ce-role="export-all-limit"]'),
      enableTimestampInput: query('[data-ce-role="enable-timestamp"]'),
      timeStamp24HInput: query('[data-ce-role="timestamp-24h"]'),
      enableTimestampHTMLInput: query('[data-ce-role="timestamp-html"]'),
      enableTimestampMarkdownInput: query('[data-ce-role="timestamp-markdown"]'),
      enableMetaInput: query('[data-ce-role="enable-meta"]'),
      enableCopyTextShortcutInput: query('[data-ce-role="enable-copy-text-shortcut"]'),
      copyTextShortcutInput: query('[data-ce-role="copy-text-shortcut"]'),
      timestampOptions: query('[data-ce-role="timestamp-options"]'),
      metaOptions: query('[data-ce-role="meta-options"]'),
      shortcutOptions: query('[data-ce-role="shortcut-options"]'),
      metaList: query('[data-ce-role="meta-list"]'),
      addMetaButton: query('[data-ce-role="meta-add"]')
    };
  }
  function buildSettingsPanelView(shadow) {
    const styleElement = document.createElement("style");
    styleElement.textContent = createPanelStyle();
    const template = document.createElement("template");
    template.innerHTML = createPanelTemplate();
    shadow.append(styleElement, template.content.cloneNode(true));
    return getPanelElements(shadow);
  }
  let activePanel = null;
  function t(key2, fallback) {
    const value = instance.t(key2);
    return value === key2 ? fallback : value;
  }
  function cloneMetaList(metaList) {
    return metaList.map((meta) => ({ ...meta }));
  }
  function createPanelState() {
    const settings = getSettings();
    return {
      settings: {
        ...settings,
        exportMetaList: cloneMetaList(settings.exportMetaList)
      },
      language: getStoredLanguage() ?? instance.language
    };
  }
  function renderMetaList(elements, state) {
    elements.metaList.innerHTML = "";
    state.settings.exportMetaList.forEach((meta, index2) => {
      const row = document.createElement("div");
      row.className = "ce-meta-item";
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.value = meta.name;
      nameInput.placeholder = "name";
      nameInput.addEventListener("input", () => {
        state.settings.exportMetaList[index2] = {
          ...state.settings.exportMetaList[index2],
          name: nameInput.value
        };
      });
      const valueInput = document.createElement("input");
      valueInput.type = "text";
      valueInput.value = meta.value;
      valueInput.placeholder = "value";
      valueInput.addEventListener("input", () => {
        state.settings.exportMetaList[index2] = {
          ...state.settings.exportMetaList[index2],
          value: valueInput.value
        };
      });
      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "ce-remove-btn";
      removeButton.textContent = t("Remove", "Remove");
      removeButton.addEventListener("click", () => {
        state.settings.exportMetaList = state.settings.exportMetaList.filter((_2, currentIndex) => currentIndex !== index2);
        renderMetaList(elements, state);
      });
      row.append(nameInput, valueInput, removeButton);
      elements.metaList.append(row);
    });
  }
  function syncDependentSections(elements, state) {
    elements.timestampOptions.hidden = !state.settings.enableTimestamp;
    elements.metaOptions.hidden = !state.settings.enableMeta;
    elements.shortcutOptions.hidden = !state.settings.enableCopyTextShortcut;
  }
  function applyStateToForm(elements, state) {
    elements.languageSelect.value = state.language;
    elements.formatInput.value = state.settings.format;
    elements.exportAllLimitInput.value = String(state.settings.exportAllLimit);
    elements.enableTimestampInput.checked = state.settings.enableTimestamp;
    elements.timeStamp24HInput.checked = state.settings.timeStamp24H;
    elements.enableTimestampHTMLInput.checked = state.settings.enableTimestampHTML;
    elements.enableTimestampMarkdownInput.checked = state.settings.enableTimestampMarkdown;
    elements.enableMetaInput.checked = state.settings.enableMeta;
    elements.enableCopyTextShortcutInput.checked = state.settings.enableCopyTextShortcut;
    elements.copyTextShortcutInput.value = state.settings.copyTextShortcut;
    renderMetaList(elements, state);
    syncDependentSections(elements, state);
  }
  function normalizeExportAllLimit(rawValue) {
    const parsed = Number.parseInt(rawValue, 10);
    if (!Number.isFinite(parsed)) return DEFAULT_EXPORTER_SETTINGS.exportAllLimit;
    const clamped = Math.min(2e4, Math.max(100, parsed));
    return Math.round(clamped / 100) * 100;
  }
  function normalizeShortcut(rawValue) {
    return normalizeCopyTextShortcut(rawValue, DEFAULT_EXPORTER_SETTINGS.copyTextShortcut);
  }
  function wirePanelEvents(elements, state) {
    elements.languageSelect.addEventListener("change", () => {
      state.language = elements.languageSelect.value;
    });
    elements.formatInput.addEventListener("input", () => {
      state.settings.format = elements.formatInput.value;
    });
    elements.exportAllLimitInput.addEventListener("change", () => {
      const normalized = normalizeExportAllLimit(elements.exportAllLimitInput.value);
      state.settings.exportAllLimit = normalized;
      elements.exportAllLimitInput.value = String(normalized);
    });
    elements.enableTimestampInput.addEventListener("change", () => {
      state.settings.enableTimestamp = elements.enableTimestampInput.checked;
      syncDependentSections(elements, state);
    });
    elements.timeStamp24HInput.addEventListener("change", () => {
      state.settings.timeStamp24H = elements.timeStamp24HInput.checked;
    });
    elements.enableTimestampHTMLInput.addEventListener("change", () => {
      state.settings.enableTimestampHTML = elements.enableTimestampHTMLInput.checked;
    });
    elements.enableTimestampMarkdownInput.addEventListener("change", () => {
      state.settings.enableTimestampMarkdown = elements.enableTimestampMarkdownInput.checked;
    });
    elements.enableMetaInput.addEventListener("change", () => {
      state.settings.enableMeta = elements.enableMetaInput.checked;
      syncDependentSections(elements, state);
    });
    elements.enableCopyTextShortcutInput.addEventListener("change", () => {
      state.settings.enableCopyTextShortcut = elements.enableCopyTextShortcutInput.checked;
      syncDependentSections(elements, state);
    });
    elements.copyTextShortcutInput.addEventListener("change", () => {
      const normalized = normalizeShortcut(elements.copyTextShortcutInput.value);
      state.settings.copyTextShortcut = normalized;
      elements.copyTextShortcutInput.value = normalized;
    });
    elements.addMetaButton.addEventListener("click", () => {
      state.settings.exportMetaList = [...state.settings.exportMetaList, { name: "", value: "" }];
      renderMetaList(elements, state);
    });
    elements.resetButton.addEventListener("click", () => {
      state.settings = {
        ...DEFAULT_EXPORTER_SETTINGS,
        exportMetaList: cloneMetaList(DEFAULT_EXPORT_META_LIST)
      };
      applyStateToForm(elements, state);
    });
    elements.saveButton.addEventListener("click", () => {
      state.settings.copyTextShortcut = normalizeShortcut(elements.copyTextShortcutInput.value);
      elements.copyTextShortcutInput.value = state.settings.copyTextShortcut;
      saveSettings(state.settings);
      setStoredLanguage(state.language);
      void instance.changeLanguage(state.language);
      closeSettingsPanel();
    });
    elements.cancelButton.addEventListener("click", () => {
      closeSettingsPanel();
    });
    elements.closeButton.addEventListener("click", () => {
      closeSettingsPanel();
    });
    elements.backdrop.addEventListener("click", (event) => {
      if (event.target === elements.backdrop) {
        closeSettingsPanel();
      }
    });
  }
  function openSettingsPanel() {
    if (activePanel && activePanel.host.isConnected) {
      return;
    }
    activePanel = null;
    const host = document.createElement("div");
    const shadow = host.attachShadow({ mode: "open" });
    const state = createPanelState();
    const elements = buildSettingsPanelView(shadow);
    applyStateToForm(elements, state);
    wirePanelEvents(elements, state);
    const keydownHandler = (event) => {
      if (event.key === "Escape") {
        closeSettingsPanel();
      }
    };
    document.addEventListener("keydown", keydownHandler);
    document.body.append(host);
    elements.formatInput.focus();
    activePanel = {
      host,
      keydownHandler
    };
  }
  function closeSettingsPanel() {
    if (!activePanel) return;
    document.removeEventListener("keydown", activePanel.keydownHandler);
    activePanel.host.remove();
    activePanel = null;
  }
  let registered = false;
  function registerSettingsMenuCommand() {
    if (registered) return;
    const label = instance.t("Exporter Settings");
    if (typeof _GM_registerMenuCommand === "function") {
      _GM_registerMenuCommand(label, () => {
        openSettingsPanel();
      });
      registered = true;
      return;
    }
    if (_GM && typeof _GM.registerMenuCommand === "function") {
      void _GM.registerMenuCommand(label, () => {
        openSettingsPanel();
      });
      registered = true;
    }
  }
  function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
    return function handleEvent(event) {
      originalEventHandler?.(event);
      if (checkForDefaultPrevented === false || !event.defaultPrevented) {
        return ourEventHandler?.(event);
      }
    };
  }
  function setRef(ref, value) {
    if (typeof ref === "function") {
      return ref(value);
    } else if (ref !== null && ref !== void 0) {
      ref.current = value;
    }
  }
  function composeRefs(...refs) {
    return (node2) => {
      let hasCleanup = false;
      const cleanups = refs.map((ref) => {
        const cleanup = setRef(ref, node2);
        if (!hasCleanup && typeof cleanup == "function") {
          hasCleanup = true;
        }
        return cleanup;
      });
      if (hasCleanup) {
        return () => {
          for (let i2 = 0; i2 < cleanups.length; i2++) {
            const cleanup = cleanups[i2];
            if (typeof cleanup == "function") {
              cleanup();
            } else {
              setRef(refs[i2], null);
            }
          }
        };
      }
    };
  }
  function useComposedRefs(...refs) {
    return q$1(composeRefs(...refs), refs);
  }
  function createContext2(rootComponentName, defaultContext) {
    const Context = R$1(defaultContext);
    const Provider = (props) => {
      const { children, ...context } = props;
      const value = T$1(() => context, Object.values(context));
      return u$1(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName) {
      const context = x$1(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  function createContextScope(scopeName, createContextScopeDeps = []) {
    let defaultContexts = [];
    function createContext3(rootComponentName, defaultContext) {
      const BaseContext = R$1(defaultContext);
      const index2 = defaultContexts.length;
      defaultContexts = [...defaultContexts, defaultContext];
      const Provider = (props) => {
        const { scope, children, ...context } = props;
        const Context = scope?.[scopeName]?.[index2] || BaseContext;
        const value = T$1(() => context, Object.values(context));
        return u$1(Context.Provider, { value, children });
      };
      Provider.displayName = rootComponentName + "Provider";
      function useContext2(consumerName, scope) {
        const Context = scope?.[scopeName]?.[index2] || BaseContext;
        const context = x$1(Context);
        if (context) return context;
        if (defaultContext !== void 0) return defaultContext;
        throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
      }
      return [Provider, useContext2];
    }
    const createScope = () => {
      const scopeContexts = defaultContexts.map((defaultContext) => {
        return R$1(defaultContext);
      });
      return function useScope(scope) {
        const contexts = scope?.[scopeName] || scopeContexts;
        return T$1(
          () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
          [scope, contexts]
        );
      };
    };
    createScope.scopeName = scopeName;
    return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
  }
  function composeContextScopes(...scopes) {
    const baseScope = scopes[0];
    if (scopes.length === 1) return baseScope;
    const createScope = () => {
      const scopeHooks = scopes.map((createScope2) => ({
        useScope: createScope2(),
        scopeName: createScope2.scopeName
      }));
      return function useComposedScopes(overrideScopes) {
        const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
          const scopeProps = useScope(overrideScopes);
          const currentScope = scopeProps[`__scope${scopeName}`];
          return { ...nextScopes2, ...currentScope };
        }, {});
        return T$1(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
      };
    };
    createScope.scopeName = baseScope.scopeName;
    return createScope;
  }
  var useLayoutEffect2 = globalThis?.document ? _ : () => {
  };
  var useReactId = React[" useId ".trim().toString()] || (() => void 0);
  var count$1 = 0;
  function useId(deterministicId) {
    const [id, setId] = d(useReactId());
    useLayoutEffect2(() => {
      setId((reactId) => reactId ?? String(count$1++));
    }, [deterministicId]);
    return deterministicId || (id ? `radix-${id}` : "");
  }
  var useInsertionEffect = React[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
  function useControllableState({
    prop,
    defaultProp,
    onChange = () => {
    },
    caller
  }) {
    const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
      defaultProp,
      onChange
    });
    const isControlled = prop !== void 0;
    const value = isControlled ? prop : uncontrolledProp;
    {
      const isControlledRef = A$1(prop !== void 0);
      y(() => {
        const wasControlled = isControlledRef.current;
        if (wasControlled !== isControlled) {
          const from = wasControlled ? "controlled" : "uncontrolled";
          const to = isControlled ? "controlled" : "uncontrolled";
          console.warn(
            `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
          );
        }
        isControlledRef.current = isControlled;
      }, [isControlled, caller]);
    }
    const setValue = q$1(
      (nextValue) => {
        if (isControlled) {
          const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
          if (value2 !== prop) {
            onChangeRef.current?.(value2);
          }
        } else {
          setUncontrolledProp(nextValue);
        }
      },
      [isControlled, prop, setUncontrolledProp, onChangeRef]
    );
    return [value, setValue];
  }
  function useUncontrolledState({
    defaultProp,
    onChange
  }) {
    const [value, setValue] = d(defaultProp);
    const prevValueRef = A$1(value);
    const onChangeRef = A$1(onChange);
    useInsertionEffect(() => {
      onChangeRef.current = onChange;
    }, [onChange]);
    y(() => {
      if (prevValueRef.current !== value) {
        onChangeRef.current?.(value);
        prevValueRef.current = value;
      }
    }, [value, prevValueRef]);
    return [value, setValue, onChangeRef];
  }
  function isFunction(value) {
    return typeof value === "function";
  }
function createSlot(ownerName) {
    const SlotClone = createSlotClone(ownerName);
    const Slot2 = D((props, forwardedRef) => {
      const { children, ...slotProps } = props;
      const childrenArray = O.toArray(children);
      const slottable = childrenArray.find(isSlottable);
      if (slottable) {
        const newElement = slottable.props.children;
        const newChildren = childrenArray.map((child) => {
          if (child === slottable) {
            if (O.count(newElement) > 1) return O.only(null);
            return mn(newElement) ? newElement.props.children : null;
          } else {
            return child;
          }
        });
        return u$1(SlotClone, { ...slotProps, ref: forwardedRef, children: mn(newElement) ? _n(newElement, void 0, newChildren) : null });
      }
      return u$1(SlotClone, { ...slotProps, ref: forwardedRef, children });
    });
    Slot2.displayName = `${ownerName}.Slot`;
    return Slot2;
  }
function createSlotClone(ownerName) {
    const SlotClone = D((props, forwardedRef) => {
      const { children, ...slotProps } = props;
      if (mn(children)) {
        const childrenRef = getElementRef$1(children);
        const props2 = mergeProps(slotProps, children.props);
        if (children.type !== k$2) {
          props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
        }
        return _n(children, props2);
      }
      return O.count(children) > 1 ? O.only(null) : null;
    });
    SlotClone.displayName = `${ownerName}.SlotClone`;
    return SlotClone;
  }
  var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
  function isSlottable(child) {
    return mn(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
  }
  function mergeProps(slotProps, childProps) {
    const overrideProps = { ...childProps };
    for (const propName in childProps) {
      const slotPropValue = slotProps[propName];
      const childPropValue = childProps[propName];
      const isHandler = /^on[A-Z]/.test(propName);
      if (isHandler) {
        if (slotPropValue && childPropValue) {
          overrideProps[propName] = (...args) => {
            const result = childPropValue(...args);
            slotPropValue(...args);
            return result;
          };
        } else if (slotPropValue) {
          overrideProps[propName] = slotPropValue;
        }
      } else if (propName === "style") {
        overrideProps[propName] = { ...slotPropValue, ...childPropValue };
      } else if (propName === "className") {
        overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
      }
    }
    return { ...slotProps, ...overrideProps };
  }
  function getElementRef$1(element2) {
    let getter = Object.getOwnPropertyDescriptor(element2.props, "ref")?.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element2.ref;
    }
    getter = Object.getOwnPropertyDescriptor(element2, "ref")?.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element2.props.ref;
    }
    return element2.props.ref || element2.ref;
  }
  var NODES = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul"
  ];
  var Primitive = NODES.reduce((primitive, node2) => {
    const Slot2 = createSlot(`Primitive.${node2}`);
    const Node2 = D((props, forwardedRef) => {
      const { asChild, ...primitiveProps } = props;
      const Comp = asChild ? Slot2 : node2;
      if (typeof window !== "undefined") {
        window[ Symbol.for("radix-ui")] = true;
      }
      return u$1(Comp, { ...primitiveProps, ref: forwardedRef });
    });
    Node2.displayName = `Primitive.${node2}`;
    return { ...primitive, [node2]: Node2 };
  }, {});
  function dispatchDiscreteCustomEvent(target, event) {
    if (target) En(() => target.dispatchEvent(event));
  }
  function useCallbackRef$1(callback) {
    const callbackRef = A$1(callback);
    y(() => {
      callbackRef.current = callback;
    });
    return T$1(() => (...args) => callbackRef.current?.(...args), []);
  }
  function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
    const onEscapeKeyDown = useCallbackRef$1(onEscapeKeyDownProp);
    y(() => {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          onEscapeKeyDown(event);
        }
      };
      ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
      return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
    }, [onEscapeKeyDown, ownerDocument]);
  }
  var DISMISSABLE_LAYER_NAME = "DismissableLayer";
  var CONTEXT_UPDATE = "dismissableLayer.update";
  var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
  var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
  var originalBodyPointerEvents;
  var DismissableLayerContext = R$1({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set()
  });
  var DismissableLayer = D(
    (props, forwardedRef) => {
      const {
        disableOutsidePointerEvents = false,
        onEscapeKeyDown,
        onPointerDownOutside,
        onFocusOutside,
        onInteractOutside,
        onDismiss,
        ...layerProps
      } = props;
      const context = x$1(DismissableLayerContext);
      const [node2, setNode] = d(null);
      const ownerDocument = node2?.ownerDocument ?? globalThis?.document;
      const [, force] = d({});
      const composedRefs = useComposedRefs(forwardedRef, (node22) => setNode(node22));
      const layers = Array.from(context.layers);
      const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
      const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
      const index2 = node2 ? layers.indexOf(node2) : -1;
      const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
      const isPointerEventsEnabled = index2 >= highestLayerWithOutsidePointerEventsDisabledIndex;
      const pointerDownOutside = usePointerDownOutside((event) => {
        const target = event.target;
        const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
        if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
        onPointerDownOutside?.(event);
        onInteractOutside?.(event);
        if (!event.defaultPrevented) onDismiss?.();
      }, ownerDocument);
      const focusOutside = useFocusOutside((event) => {
        const target = event.target;
        const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
        if (isFocusInBranch) return;
        onFocusOutside?.(event);
        onInteractOutside?.(event);
        if (!event.defaultPrevented) onDismiss?.();
      }, ownerDocument);
      useEscapeKeydown((event) => {
        const isHighestLayer = index2 === context.layers.size - 1;
        if (!isHighestLayer) return;
        onEscapeKeyDown?.(event);
        if (!event.defaultPrevented && onDismiss) {
          event.preventDefault();
          onDismiss();
        }
      }, ownerDocument);
      y(() => {
        if (!node2) return;
        if (disableOutsidePointerEvents) {
          if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
            originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
            ownerDocument.body.style.pointerEvents = "none";
          }
          context.layersWithOutsidePointerEventsDisabled.add(node2);
        }
        context.layers.add(node2);
        dispatchUpdate();
        return () => {
          if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
            ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
          }
        };
      }, [node2, ownerDocument, disableOutsidePointerEvents, context]);
      y(() => {
        return () => {
          if (!node2) return;
          context.layers.delete(node2);
          context.layersWithOutsidePointerEventsDisabled.delete(node2);
          dispatchUpdate();
        };
      }, [node2, context]);
      y(() => {
        const handleUpdate = () => force({});
        document.addEventListener(CONTEXT_UPDATE, handleUpdate);
        return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
      }, []);
      return u$1(
        Primitive.div,
        {
          ...layerProps,
          ref: composedRefs,
          style: {
            pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
            ...props.style
          },
          onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
          onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
          onPointerDownCapture: composeEventHandlers(
            props.onPointerDownCapture,
            pointerDownOutside.onPointerDownCapture
          )
        }
      );
    }
  );
  DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
  var BRANCH_NAME = "DismissableLayerBranch";
  var DismissableLayerBranch = D((props, forwardedRef) => {
    const context = x$1(DismissableLayerContext);
    const ref = A$1(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    y(() => {
      const node2 = ref.current;
      if (node2) {
        context.branches.add(node2);
        return () => {
          context.branches.delete(node2);
        };
      }
    }, [context.branches]);
    return u$1(Primitive.div, { ...props, ref: composedRefs });
  });
  DismissableLayerBranch.displayName = BRANCH_NAME;
  function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis?.document) {
    const handlePointerDownOutside = useCallbackRef$1(onPointerDownOutside);
    const isPointerInsideReactTreeRef = A$1(false);
    const handleClickRef = A$1(() => {
    });
    y(() => {
      const handlePointerDown = (event) => {
        if (event.target && !isPointerInsideReactTreeRef.current) {
          let handleAndDispatchPointerDownOutsideEvent2 = function() {
            handleAndDispatchCustomEvent(
              POINTER_DOWN_OUTSIDE,
              handlePointerDownOutside,
              eventDetail,
              { discrete: true }
            );
          };
          const eventDetail = { originalEvent: event };
          if (event.pointerType === "touch") {
            ownerDocument.removeEventListener("click", handleClickRef.current);
            handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
            ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
          } else {
            handleAndDispatchPointerDownOutsideEvent2();
          }
        } else {
          ownerDocument.removeEventListener("click", handleClickRef.current);
        }
        isPointerInsideReactTreeRef.current = false;
      };
      const timerId = window.setTimeout(() => {
        ownerDocument.addEventListener("pointerdown", handlePointerDown);
      }, 0);
      return () => {
        window.clearTimeout(timerId);
        ownerDocument.removeEventListener("pointerdown", handlePointerDown);
        ownerDocument.removeEventListener("click", handleClickRef.current);
      };
    }, [ownerDocument, handlePointerDownOutside]);
    return {
onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true
    };
  }
  function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
    const handleFocusOutside = useCallbackRef$1(onFocusOutside);
    const isFocusInsideReactTreeRef = A$1(false);
    y(() => {
      const handleFocus = (event) => {
        if (event.target && !isFocusInsideReactTreeRef.current) {
          const eventDetail = { originalEvent: event };
          handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
            discrete: false
          });
        }
      };
      ownerDocument.addEventListener("focusin", handleFocus);
      return () => ownerDocument.removeEventListener("focusin", handleFocus);
    }, [ownerDocument, handleFocusOutside]);
    return {
      onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
      onBlurCapture: () => isFocusInsideReactTreeRef.current = false
    };
  }
  function dispatchUpdate() {
    const event = new CustomEvent(CONTEXT_UPDATE);
    document.dispatchEvent(event);
  }
  function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
    const target = detail.originalEvent.target;
    const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
    if (handler) target.addEventListener(name, handler, { once: true });
    if (discrete) {
      dispatchDiscreteCustomEvent(target, event);
    } else {
      target.dispatchEvent(event);
    }
  }
  var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
  var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
  var EVENT_OPTIONS = { bubbles: false, cancelable: true };
  var FOCUS_SCOPE_NAME = "FocusScope";
  var FocusScope = D((props, forwardedRef) => {
    const {
      loop = false,
      trapped = false,
      onMountAutoFocus: onMountAutoFocusProp,
      onUnmountAutoFocus: onUnmountAutoFocusProp,
      ...scopeProps
    } = props;
    const [container, setContainer] = d(null);
    const onMountAutoFocus = useCallbackRef$1(onMountAutoFocusProp);
    const onUnmountAutoFocus = useCallbackRef$1(onUnmountAutoFocusProp);
    const lastFocusedElementRef = A$1(null);
    const composedRefs = useComposedRefs(forwardedRef, (node2) => setContainer(node2));
    const focusScope = A$1({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      }
    }).current;
    y(() => {
      if (trapped) {
        let handleFocusIn2 = function(event) {
          if (focusScope.paused || !container) return;
          const target = event.target;
          if (container.contains(target)) {
            lastFocusedElementRef.current = target;
          } else {
            focus(lastFocusedElementRef.current, { select: true });
          }
        }, handleFocusOut2 = function(event) {
          if (focusScope.paused || !container) return;
          const relatedTarget = event.relatedTarget;
          if (relatedTarget === null) return;
          if (!container.contains(relatedTarget)) {
            focus(lastFocusedElementRef.current, { select: true });
          }
        }, handleMutations2 = function(mutations) {
          const focusedElement = document.activeElement;
          if (focusedElement !== document.body) return;
          for (const mutation of mutations) {
            if (mutation.removedNodes.length > 0) focus(container);
          }
        };
        document.addEventListener("focusin", handleFocusIn2);
        document.addEventListener("focusout", handleFocusOut2);
        const mutationObserver = new MutationObserver(handleMutations2);
        if (container) mutationObserver.observe(container, { childList: true, subtree: true });
        return () => {
          document.removeEventListener("focusin", handleFocusIn2);
          document.removeEventListener("focusout", handleFocusOut2);
          mutationObserver.disconnect();
        };
      }
    }, [trapped, container, focusScope.paused]);
    y(() => {
      if (container) {
        focusScopesStack.add(focusScope);
        const previouslyFocusedElement = document.activeElement;
        const hasFocusedCandidate = container.contains(previouslyFocusedElement);
        if (!hasFocusedCandidate) {
          const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
          container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
          container.dispatchEvent(mountEvent);
          if (!mountEvent.defaultPrevented) {
            focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
            if (document.activeElement === previouslyFocusedElement) {
              focus(container);
            }
          }
        }
        return () => {
          container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
          setTimeout(() => {
            const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
            container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
            container.dispatchEvent(unmountEvent);
            if (!unmountEvent.defaultPrevented) {
              focus(previouslyFocusedElement ?? document.body, { select: true });
            }
            container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
            focusScopesStack.remove(focusScope);
          }, 0);
        };
      }
    }, [container, onMountAutoFocus, onUnmountAutoFocus, focusScope]);
    const handleKeyDown = q$1(
      (event) => {
        if (!loop && !trapped) return;
        if (focusScope.paused) return;
        const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
        const focusedElement = document.activeElement;
        if (isTabKey && focusedElement) {
          const container2 = event.currentTarget;
          const [first, last] = getTabbableEdges(container2);
          const hasTabbableElementsInside = first && last;
          if (!hasTabbableElementsInside) {
            if (focusedElement === container2) event.preventDefault();
          } else {
            if (!event.shiftKey && focusedElement === last) {
              event.preventDefault();
              if (loop) focus(first, { select: true });
            } else if (event.shiftKey && focusedElement === first) {
              event.preventDefault();
              if (loop) focus(last, { select: true });
            }
          }
        }
      },
      [loop, trapped, focusScope.paused]
    );
    return u$1(Primitive.div, { tabIndex: -1, ...scopeProps, ref: composedRefs, onKeyDown: handleKeyDown });
  });
  FocusScope.displayName = FOCUS_SCOPE_NAME;
  function focusFirst(candidates, { select = false } = {}) {
    const previouslyFocusedElement = document.activeElement;
    for (const candidate of candidates) {
      focus(candidate, { select });
      if (document.activeElement !== previouslyFocusedElement) return;
    }
  }
  function getTabbableEdges(container) {
    const candidates = getTabbableCandidates(container);
    const first = findVisible(candidates, container);
    const last = findVisible(candidates.reverse(), container);
    return [first, last];
  }
  function getTabbableCandidates(container) {
    const nodes = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (node2) => {
        const isHiddenInput = node2.tagName === "INPUT" && node2.type === "hidden";
        if (node2.disabled || node2.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
        return node2.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }
  function findVisible(elements, container) {
    for (const element2 of elements) {
      if (!isHidden(element2, { upTo: container })) return element2;
    }
  }
  function isHidden(node2, { upTo }) {
    if (getComputedStyle(node2).visibility === "hidden") return true;
    while (node2) {
      if (upTo !== void 0 && node2 === upTo) return false;
      if (getComputedStyle(node2).display === "none") return true;
      node2 = node2.parentElement;
    }
    return false;
  }
  function isSelectableInput(element2) {
    return element2 instanceof HTMLInputElement && "select" in element2;
  }
  function focus(element2, { select = false } = {}) {
    if (element2 && element2.focus) {
      const previouslyFocusedElement = document.activeElement;
      element2.focus({ preventScroll: true });
      if (element2 !== previouslyFocusedElement && isSelectableInput(element2) && select)
        element2.select();
    }
  }
  var focusScopesStack = createFocusScopesStack();
  function createFocusScopesStack() {
    let stack = [];
    return {
      add(focusScope) {
        const activeFocusScope = stack[0];
        if (focusScope !== activeFocusScope) {
          activeFocusScope?.pause();
        }
        stack = arrayRemove(stack, focusScope);
        stack.unshift(focusScope);
      },
      remove(focusScope) {
        stack = arrayRemove(stack, focusScope);
        stack[0]?.resume();
      }
    };
  }
  function arrayRemove(array, item) {
    const updatedArray = [...array];
    const index2 = updatedArray.indexOf(item);
    if (index2 !== -1) {
      updatedArray.splice(index2, 1);
    }
    return updatedArray;
  }
  function removeLinks(items) {
    return items.filter((item) => item.tagName !== "A");
  }
  var PORTAL_NAME$2 = "Portal";
  var Portal$2 = D((props, forwardedRef) => {
    const { container: containerProp, ...portalProps } = props;
    const [mounted, setMounted] = d(false);
    useLayoutEffect2(() => setMounted(true), []);
    const container = containerProp || mounted && globalThis?.document?.body;
    return container ? xn.createPortal( u$1(Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
  });
  Portal$2.displayName = PORTAL_NAME$2;
  function useStateMachine(initialState, machine) {
    return h((state, event) => {
      const nextState = machine[state][event];
      return nextState ?? state;
    }, initialState);
  }
  var Presence = (props) => {
    const { present, children } = props;
    const presence = usePresence(present);
    const child = typeof children === "function" ? children({ present: presence.isPresent }) : O.only(children);
    const ref = useComposedRefs(presence.ref, getElementRef(child));
    const forceMount = typeof children === "function";
    return forceMount || presence.isPresent ? _n(child, { ref }) : null;
  };
  Presence.displayName = "Presence";
  function usePresence(present) {
    const [node2, setNode] = d();
    const stylesRef = A$1(null);
    const prevPresentRef = A$1(present);
    const prevAnimationNameRef = A$1("none");
    const initialState = present ? "mounted" : "unmounted";
    const [state, send] = useStateMachine(initialState, {
      mounted: {
        UNMOUNT: "unmounted",
        ANIMATION_OUT: "unmountSuspended"
      },
      unmountSuspended: {
        MOUNT: "mounted",
        ANIMATION_END: "unmounted"
      },
      unmounted: {
        MOUNT: "mounted"
      }
    });
    y(() => {
      const currentAnimationName = getAnimationName(stylesRef.current);
      prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
    }, [state]);
    useLayoutEffect2(() => {
      const styles = stylesRef.current;
      const wasPresent = prevPresentRef.current;
      const hasPresentChanged = wasPresent !== present;
      if (hasPresentChanged) {
        const prevAnimationName = prevAnimationNameRef.current;
        const currentAnimationName = getAnimationName(styles);
        if (present) {
          send("MOUNT");
        } else if (currentAnimationName === "none" || styles?.display === "none") {
          send("UNMOUNT");
        } else {
          const isAnimating = prevAnimationName !== currentAnimationName;
          if (wasPresent && isAnimating) {
            send("ANIMATION_OUT");
          } else {
            send("UNMOUNT");
          }
        }
        prevPresentRef.current = present;
      }
    }, [present, send]);
    useLayoutEffect2(() => {
      if (node2) {
        let timeoutId;
        const ownerWindow = node2.ownerDocument.defaultView ?? window;
        const handleAnimationEnd = (event) => {
          const currentAnimationName = getAnimationName(stylesRef.current);
          const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
          if (event.target === node2 && isCurrentAnimation) {
            send("ANIMATION_END");
            if (!prevPresentRef.current) {
              const currentFillMode = node2.style.animationFillMode;
              node2.style.animationFillMode = "forwards";
              timeoutId = ownerWindow.setTimeout(() => {
                if (node2.style.animationFillMode === "forwards") {
                  node2.style.animationFillMode = currentFillMode;
                }
              });
            }
          }
        };
        const handleAnimationStart = (event) => {
          if (event.target === node2) {
            prevAnimationNameRef.current = getAnimationName(stylesRef.current);
          }
        };
        node2.addEventListener("animationstart", handleAnimationStart);
        node2.addEventListener("animationcancel", handleAnimationEnd);
        node2.addEventListener("animationend", handleAnimationEnd);
        return () => {
          ownerWindow.clearTimeout(timeoutId);
          node2.removeEventListener("animationstart", handleAnimationStart);
          node2.removeEventListener("animationcancel", handleAnimationEnd);
          node2.removeEventListener("animationend", handleAnimationEnd);
        };
      } else {
        send("ANIMATION_END");
      }
    }, [node2, send]);
    return {
      isPresent: ["mounted", "unmountSuspended"].includes(state),
      ref: q$1((node22) => {
        stylesRef.current = node22 ? getComputedStyle(node22) : null;
        setNode(node22);
      }, [])
    };
  }
  function getAnimationName(styles) {
    return styles?.animationName || "none";
  }
  function getElementRef(element2) {
    let getter = Object.getOwnPropertyDescriptor(element2.props, "ref")?.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element2.ref;
    }
    getter = Object.getOwnPropertyDescriptor(element2, "ref")?.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element2.props.ref;
    }
    return element2.props.ref || element2.ref;
  }
  var count = 0;
  function useFocusGuards() {
    y(() => {
      const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
      document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
      document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
      count++;
      return () => {
        if (count === 1) {
          document.querySelectorAll("[data-radix-focus-guard]").forEach((node2) => node2.remove());
        }
        count--;
      };
    }, []);
  }
  function createFocusGuard() {
    const element2 = document.createElement("span");
    element2.setAttribute("data-radix-focus-guard", "");
    element2.tabIndex = 0;
    element2.style.outline = "none";
    element2.style.opacity = "0";
    element2.style.position = "fixed";
    element2.style.pointerEvents = "none";
    return element2;
  }
  var __assign = function() {
    __assign = Object.assign || function __assign2(t2) {
      for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
        s2 = arguments[i2];
        for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2)) t2[p2] = s2[p2];
      }
      return t2;
    };
    return __assign.apply(this, arguments);
  };
  function __rest(s2, e2) {
    var t2 = {};
    for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0)
      t2[p2] = s2[p2];
    if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
        if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
          t2[p2[i2]] = s2[p2[i2]];
      }
    return t2;
  }
  function __spreadArray(to, from, pack) {
    for (var i2 = 0, l2 = from.length, ar; i2 < l2; i2++) {
      if (ar || !(i2 in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i2);
        ar[i2] = from[i2];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  }
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e2 = new Error(message);
    return e2.name = "SuppressedError", e2.error = error, e2.suppressed = suppressed, e2;
  };
  var zeroRightClassName = "right-scroll-bar-position";
  var fullWidthClassName = "width-before-scroll-bar";
  var noScrollbarsClassName = "with-scroll-bars-hidden";
  var removedBarSizeVariable = "--removed-body-scroll-bar-size";
  function assignRef(ref, value) {
    if (typeof ref === "function") {
      ref(value);
    } else if (ref) {
      ref.current = value;
    }
    return ref;
  }
  function useCallbackRef(initialValue, callback) {
    var ref = d(function() {
      return {
value: initialValue,
callback,
facade: {
          get current() {
            return ref.value;
          },
          set current(value) {
            var last = ref.value;
            if (last !== value) {
              ref.value = value;
              ref.callback(value, last);
            }
          }
        }
      };
    })[0];
    ref.callback = callback;
    return ref.facade;
  }
  var useIsomorphicLayoutEffect = typeof window !== "undefined" ? _ : y;
  var currentValues = new WeakMap();
  function useMergeRefs(refs, defaultValue) {
    var callbackRef = useCallbackRef(null, function(newValue) {
      return refs.forEach(function(ref) {
        return assignRef(ref, newValue);
      });
    });
    useIsomorphicLayoutEffect(function() {
      var oldValue = currentValues.get(callbackRef);
      if (oldValue) {
        var prevRefs_1 = new Set(oldValue);
        var nextRefs_1 = new Set(refs);
        var current_1 = callbackRef.current;
        prevRefs_1.forEach(function(ref) {
          if (!nextRefs_1.has(ref)) {
            assignRef(ref, null);
          }
        });
        nextRefs_1.forEach(function(ref) {
          if (!prevRefs_1.has(ref)) {
            assignRef(ref, current_1);
          }
        });
      }
      currentValues.set(callbackRef, refs);
    }, [refs]);
    return callbackRef;
  }
  function ItoI(a2) {
    return a2;
  }
  function innerCreateMedium(defaults, middleware) {
    if (middleware === void 0) {
      middleware = ItoI;
    }
    var buffer = [];
    var assigned = false;
    var medium = {
      read: function() {
        if (assigned) {
          throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
        }
        if (buffer.length) {
          return buffer[buffer.length - 1];
        }
        return defaults;
      },
      useMedium: function(data) {
        var item = middleware(data, assigned);
        buffer.push(item);
        return function() {
          buffer = buffer.filter(function(x2) {
            return x2 !== item;
          });
        };
      },
      assignSyncMedium: function(cb) {
        assigned = true;
        while (buffer.length) {
          var cbs = buffer;
          buffer = [];
          cbs.forEach(cb);
        }
        buffer = {
          push: function(x2) {
            return cb(x2);
          },
          filter: function() {
            return buffer;
          }
        };
      },
      assignMedium: function(cb) {
        assigned = true;
        var pendingQueue = [];
        if (buffer.length) {
          var cbs = buffer;
          buffer = [];
          cbs.forEach(cb);
          pendingQueue = buffer;
        }
        var executeQueue = function() {
          var cbs2 = pendingQueue;
          pendingQueue = [];
          cbs2.forEach(cb);
        };
        var cycle = function() {
          return Promise.resolve().then(executeQueue);
        };
        cycle();
        buffer = {
          push: function(x2) {
            pendingQueue.push(x2);
            cycle();
          },
          filter: function(filter) {
            pendingQueue = pendingQueue.filter(filter);
            return buffer;
          }
        };
      }
    };
    return medium;
  }
  function createSidecarMedium(options) {
    if (options === void 0) {
      options = {};
    }
    var medium = innerCreateMedium(null);
    medium.options = __assign({ async: true, ssr: false }, options);
    return medium;
  }
  var SideCar$1 = function(_a) {
    var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
    if (!sideCar) {
      throw new Error("Sidecar: please provide `sideCar` property to import the right car");
    }
    var Target = sideCar.read();
    if (!Target) {
      throw new Error("Sidecar medium not found");
    }
    return _$1(Target, __assign({}, rest));
  };
  SideCar$1.isSideCarExport = true;
  function exportSidecar(medium, exported) {
    medium.useMedium(exported);
    return SideCar$1;
  }
  var effectCar = createSidecarMedium();
  var nothing = function() {
    return;
  };
  var RemoveScroll = D(function(props, parentRef) {
    var ref = A$1(null);
    var _a = d({
      onScrollCapture: nothing,
      onWheelCapture: nothing,
      onTouchMoveCapture: nothing
    }), callbacks = _a[0], setCallbacks = _a[1];
    var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
    var SideCar2 = sideCar;
    var containerRef = useMergeRefs([ref, parentRef]);
    var containerProps = __assign(__assign({}, rest), callbacks);
    return _$1(
      k$2,
      null,
      enabled && _$1(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noRelative, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode }),
      forwardProps ? _n(O.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : _$1(Container, __assign({}, containerProps, { className, ref: containerRef }), children)
    );
  });
  RemoveScroll.defaultProps = {
    enabled: true,
    removeScrollBar: true,
    inert: false
  };
  RemoveScroll.classNames = {
    fullWidth: fullWidthClassName,
    zeroRight: zeroRightClassName
  };
  var getNonce = function() {
    if (typeof __webpack_nonce__ !== "undefined") {
      return __webpack_nonce__;
    }
    return void 0;
  };
  function makeStyleTag() {
    if (!document)
      return null;
    var tag = document.createElement("style");
    tag.type = "text/css";
    var nonce = getNonce();
    if (nonce) {
      tag.setAttribute("nonce", nonce);
    }
    return tag;
  }
  function injectStyles(tag, css) {
    if (tag.styleSheet) {
      tag.styleSheet.cssText = css;
    } else {
      tag.appendChild(document.createTextNode(css));
    }
  }
  function insertStyleTag(tag) {
    var head2 = document.head || document.getElementsByTagName("head")[0];
    head2.appendChild(tag);
  }
  var stylesheetSingleton = function() {
    var counter = 0;
    var stylesheet = null;
    return {
      add: function(style) {
        if (counter == 0) {
          if (stylesheet = makeStyleTag()) {
            injectStyles(stylesheet, style);
            insertStyleTag(stylesheet);
          }
        }
        counter++;
      },
      remove: function() {
        counter--;
        if (!counter && stylesheet) {
          stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
          stylesheet = null;
        }
      }
    };
  };
  var styleHookSingleton = function() {
    var sheet = stylesheetSingleton();
    return function(styles, isDynamic) {
      y(function() {
        sheet.add(styles);
        return function() {
          sheet.remove();
        };
      }, [styles && isDynamic]);
    };
  };
  var styleSingleton = function() {
    var useStyle = styleHookSingleton();
    var Sheet = function(_a) {
      var styles = _a.styles, dynamic = _a.dynamic;
      useStyle(styles, dynamic);
      return null;
    };
    return Sheet;
  };
  var zeroGap = {
    left: 0,
    top: 0,
    right: 0,
    gap: 0
  };
  var parse = function(x2) {
    return parseInt(x2 || "", 10) || 0;
  };
  var getOffset = function(gapMode) {
    var cs = window.getComputedStyle(document.body);
    var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
    var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
    var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
    return [parse(left), parse(top), parse(right)];
  };
  var getGapWidth = function(gapMode) {
    if (gapMode === void 0) {
      gapMode = "margin";
    }
    if (typeof window === "undefined") {
      return zeroGap;
    }
    var offsets = getOffset(gapMode);
    var documentWidth = document.documentElement.clientWidth;
    var windowWidth = window.innerWidth;
    return {
      left: offsets[0],
      top: offsets[1],
      right: offsets[2],
      gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
    };
  };
  var Style = styleSingleton();
  var lockAttribute = "data-scroll-locked";
  var getStyles = function(_a, allowRelative, gapMode, important) {
    var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
    if (gapMode === void 0) {
      gapMode = "margin";
    }
    return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
      allowRelative && "position: relative ".concat(important, ";"),
      gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
      gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
    ].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
  };
  var getCurrentUseCounter = function() {
    var counter = parseInt(document.body.getAttribute(lockAttribute) || "0", 10);
    return isFinite(counter) ? counter : 0;
  };
  var useLockAttribute = function() {
    y(function() {
      document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
      return function() {
        var newCounter = getCurrentUseCounter() - 1;
        if (newCounter <= 0) {
          document.body.removeAttribute(lockAttribute);
        } else {
          document.body.setAttribute(lockAttribute, newCounter.toString());
        }
      };
    }, []);
  };
  var RemoveScrollBar = function(_a) {
    var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? "margin" : _b;
    useLockAttribute();
    var gap = T$1(function() {
      return getGapWidth(gapMode);
    }, [gapMode]);
    return _$1(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
  };
  var passiveSupported = false;
  if (typeof window !== "undefined") {
    try {
      var options = Object.defineProperty({}, "passive", {
        get: function() {
          passiveSupported = true;
          return true;
        }
      });
      window.addEventListener("test", options, options);
      window.removeEventListener("test", options, options);
    } catch (err) {
      passiveSupported = false;
    }
  }
  var nonPassive = passiveSupported ? { passive: false } : false;
  var alwaysContainsScroll = function(node2) {
    return node2.tagName === "TEXTAREA";
  };
  var elementCanBeScrolled = function(node2, overflow) {
    if (!(node2 instanceof Element)) {
      return false;
    }
    var styles = window.getComputedStyle(node2);
    return (
styles[overflow] !== "hidden" &&
!(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node2) && styles[overflow] === "visible")
    );
  };
  var elementCouldBeVScrolled = function(node2) {
    return elementCanBeScrolled(node2, "overflowY");
  };
  var elementCouldBeHScrolled = function(node2) {
    return elementCanBeScrolled(node2, "overflowX");
  };
  var locationCouldBeScrolled = function(axis, node2) {
    var ownerDocument = node2.ownerDocument;
    var current = node2;
    do {
      if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
        current = current.host;
      }
      var isScrollable = elementCouldBeScrolled(axis, current);
      if (isScrollable) {
        var _a = getScrollVariables(axis, current), scrollHeight = _a[1], clientHeight = _a[2];
        if (scrollHeight > clientHeight) {
          return true;
        }
      }
      current = current.parentNode;
    } while (current && current !== ownerDocument.body);
    return false;
  };
  var getVScrollVariables = function(_a) {
    var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
    return [
      scrollTop,
      scrollHeight,
      clientHeight
    ];
  };
  var getHScrollVariables = function(_a) {
    var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
    return [
      scrollLeft,
      scrollWidth,
      clientWidth
    ];
  };
  var elementCouldBeScrolled = function(axis, node2) {
    return axis === "v" ? elementCouldBeVScrolled(node2) : elementCouldBeHScrolled(node2);
  };
  var getScrollVariables = function(axis, node2) {
    return axis === "v" ? getVScrollVariables(node2) : getHScrollVariables(node2);
  };
  var getDirectionFactor = function(axis, direction) {
    return axis === "h" && direction === "rtl" ? -1 : 1;
  };
  var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
    var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
    var delta = directionFactor * sourceDelta;
    var target = event.target;
    var targetInLock = endTarget.contains(target);
    var shouldCancelScroll = false;
    var isDeltaPositive = delta > 0;
    var availableScroll = 0;
    var availableScrollTop = 0;
    do {
      if (!target) {
        break;
      }
      var _a = getScrollVariables(axis, target), position2 = _a[0], scroll_1 = _a[1], capacity = _a[2];
      var elementScroll = scroll_1 - capacity - directionFactor * position2;
      if (position2 || elementScroll) {
        if (elementCouldBeScrolled(axis, target)) {
          availableScroll += elementScroll;
          availableScrollTop += position2;
        }
      }
      var parent_1 = target.parentNode;
      target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
    } while (
!targetInLock && target !== document.body ||
targetInLock && (endTarget.contains(target) || endTarget === target)
    );
    if (isDeltaPositive && (Math.abs(availableScroll) < 1 || false)) {
      shouldCancelScroll = true;
    } else if (!isDeltaPositive && (Math.abs(availableScrollTop) < 1 || false)) {
      shouldCancelScroll = true;
    }
    return shouldCancelScroll;
  };
  var getTouchXY = function(event) {
    return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
  };
  var getDeltaXY = function(event) {
    return [event.deltaX, event.deltaY];
  };
  var extractRef = function(ref) {
    return ref && "current" in ref ? ref.current : ref;
  };
  var deltaCompare = function(x2, y2) {
    return x2[0] === y2[0] && x2[1] === y2[1];
  };
  var generateStyle = function(id) {
    return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
  };
  var idCounter = 0;
  var lockStack = [];
  function RemoveScrollSideCar(props) {
    var shouldPreventQueue = A$1([]);
    var touchStartRef = A$1([0, 0]);
    var activeAxis = A$1();
    var id = d(idCounter++)[0];
    var Style2 = d(styleSingleton)[0];
    var lastProps = A$1(props);
    y(function() {
      lastProps.current = props;
    }, [props]);
    y(function() {
      if (props.inert) {
        document.body.classList.add("block-interactivity-".concat(id));
        var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef)).filter(Boolean);
        allow_1.forEach(function(el) {
          return el.classList.add("allow-interactivity-".concat(id));
        });
        return function() {
          document.body.classList.remove("block-interactivity-".concat(id));
          allow_1.forEach(function(el) {
            return el.classList.remove("allow-interactivity-".concat(id));
          });
        };
      }
      return;
    }, [props.inert, props.lockRef.current, props.shards]);
    var shouldCancelEvent = q$1(function(event, parent) {
      if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) {
        return !lastProps.current.allowPinchZoom;
      }
      var touch = getTouchXY(event);
      var touchStart = touchStartRef.current;
      var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
      var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
      var currentAxis;
      var target = event.target;
      var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
      if ("touches" in event && moveDirection === "h" && target.type === "range") {
        return false;
      }
      var selection = window.getSelection();
      var anchorNode = selection && selection.anchorNode;
      var isTouchingSelection = anchorNode ? anchorNode === target || anchorNode.contains(target) : false;
      if (isTouchingSelection) {
        return false;
      }
      var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
      if (!canBeScrolledInMainDirection) {
        return true;
      }
      if (canBeScrolledInMainDirection) {
        currentAxis = moveDirection;
      } else {
        currentAxis = moveDirection === "v" ? "h" : "v";
        canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
      }
      if (!canBeScrolledInMainDirection) {
        return false;
      }
      if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
        activeAxis.current = currentAxis;
      }
      if (!currentAxis) {
        return true;
      }
      var cancelingAxis = activeAxis.current || currentAxis;
      return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY);
    }, []);
    var shouldPrevent = q$1(function(_event) {
      var event = _event;
      if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
        return;
      }
      var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
      var sourceEvent = shouldPreventQueue.current.filter(function(e2) {
        return e2.name === event.type && (e2.target === event.target || event.target === e2.shadowParent) && deltaCompare(e2.delta, delta);
      })[0];
      if (sourceEvent && sourceEvent.should) {
        if (event.cancelable) {
          event.preventDefault();
        }
        return;
      }
      if (!sourceEvent) {
        var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node2) {
          return node2.contains(event.target);
        });
        var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
        if (shouldStop) {
          if (event.cancelable) {
            event.preventDefault();
          }
        }
      }
    }, []);
    var shouldCancel = q$1(function(name, delta, target, should) {
      var event = { name, delta, target, should, shadowParent: getOutermostShadowParent(target) };
      shouldPreventQueue.current.push(event);
      setTimeout(function() {
        shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e2) {
          return e2 !== event;
        });
      }, 1);
    }, []);
    var scrollTouchStart = q$1(function(event) {
      touchStartRef.current = getTouchXY(event);
      activeAxis.current = void 0;
    }, []);
    var scrollWheel = q$1(function(event) {
      shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    var scrollTouchMove = q$1(function(event) {
      shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    y(function() {
      lockStack.push(Style2);
      props.setCallbacks({
        onScrollCapture: scrollWheel,
        onWheelCapture: scrollWheel,
        onTouchMoveCapture: scrollTouchMove
      });
      document.addEventListener("wheel", shouldPrevent, nonPassive);
      document.addEventListener("touchmove", shouldPrevent, nonPassive);
      document.addEventListener("touchstart", scrollTouchStart, nonPassive);
      return function() {
        lockStack = lockStack.filter(function(inst) {
          return inst !== Style2;
        });
        document.removeEventListener("wheel", shouldPrevent, nonPassive);
        document.removeEventListener("touchmove", shouldPrevent, nonPassive);
        document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
      };
    }, []);
    var removeScrollBar = props.removeScrollBar, inert = props.inert;
    return _$1(
      k$2,
      null,
      inert ? _$1(Style2, { styles: generateStyle(id) }) : null,
      removeScrollBar ? _$1(RemoveScrollBar, { noRelative: props.noRelative, gapMode: props.gapMode }) : null
    );
  }
  function getOutermostShadowParent(node2) {
    var shadowParent = null;
    while (node2 !== null) {
      if (node2 instanceof ShadowRoot) {
        shadowParent = node2.host;
        node2 = node2.host;
      }
      node2 = node2.parentNode;
    }
    return shadowParent;
  }
  const SideCar = exportSidecar(effectCar, RemoveScrollSideCar);
  var ReactRemoveScroll = D(function(props, ref) {
    return _$1(RemoveScroll, __assign({}, props, { ref, sideCar: SideCar }));
  });
  ReactRemoveScroll.classNames = RemoveScroll.classNames;
  var getDefaultParent = function(originalTarget) {
    if (typeof document === "undefined") {
      return null;
    }
    var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
    return sampleTarget.ownerDocument.body;
  };
  var counterMap = new WeakMap();
  var uncontrolledNodes = new WeakMap();
  var markerMap = {};
  var lockCount = 0;
  var unwrapHost = function(node2) {
    return node2 && (node2.host || unwrapHost(node2.parentNode));
  };
  var correctTargets = function(parent, targets) {
    return targets.map(function(target) {
      if (parent.contains(target)) {
        return target;
      }
      var correctedTarget = unwrapHost(target);
      if (correctedTarget && parent.contains(correctedTarget)) {
        return correctedTarget;
      }
      console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
      return null;
    }).filter(function(x2) {
      return Boolean(x2);
    });
  };
  var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
    var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
    if (!markerMap[markerName]) {
      markerMap[markerName] = new WeakMap();
    }
    var markerCounter = markerMap[markerName];
    var hiddenNodes = [];
    var elementsToKeep = new Set();
    var elementsToStop = new Set(targets);
    var keep = function(el) {
      if (!el || elementsToKeep.has(el)) {
        return;
      }
      elementsToKeep.add(el);
      keep(el.parentNode);
    };
    targets.forEach(keep);
    var deep = function(parent) {
      if (!parent || elementsToStop.has(parent)) {
        return;
      }
      Array.prototype.forEach.call(parent.children, function(node2) {
        if (elementsToKeep.has(node2)) {
          deep(node2);
        } else {
          try {
            var attr = node2.getAttribute(controlAttribute);
            var alreadyHidden = attr !== null && attr !== "false";
            var counterValue = (counterMap.get(node2) || 0) + 1;
            var markerValue = (markerCounter.get(node2) || 0) + 1;
            counterMap.set(node2, counterValue);
            markerCounter.set(node2, markerValue);
            hiddenNodes.push(node2);
            if (counterValue === 1 && alreadyHidden) {
              uncontrolledNodes.set(node2, true);
            }
            if (markerValue === 1) {
              node2.setAttribute(markerName, "true");
            }
            if (!alreadyHidden) {
              node2.setAttribute(controlAttribute, "true");
            }
          } catch (e2) {
            console.error("aria-hidden: cannot operate on ", node2, e2);
          }
        }
      });
    };
    deep(parentNode);
    elementsToKeep.clear();
    lockCount++;
    return function() {
      hiddenNodes.forEach(function(node2) {
        var counterValue = counterMap.get(node2) - 1;
        var markerValue = markerCounter.get(node2) - 1;
        counterMap.set(node2, counterValue);
        markerCounter.set(node2, markerValue);
        if (!counterValue) {
          if (!uncontrolledNodes.has(node2)) {
            node2.removeAttribute(controlAttribute);
          }
          uncontrolledNodes.delete(node2);
        }
        if (!markerValue) {
          node2.removeAttribute(markerName);
        }
      });
      lockCount--;
      if (!lockCount) {
        counterMap = new WeakMap();
        counterMap = new WeakMap();
        uncontrolledNodes = new WeakMap();
        markerMap = {};
      }
    };
  };
  var hideOthers = function(originalTarget, parentNode, markerName) {
    if (markerName === void 0) {
      markerName = "data-aria-hidden";
    }
    var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
    var activeParentNode = getDefaultParent(originalTarget);
    if (!activeParentNode) {
      return function() {
        return null;
      };
    }
    targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
    return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
  };
  var DIALOG_NAME = "Dialog";
  var [createDialogContext] = createContextScope(DIALOG_NAME);
  var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
  var Dialog = (props) => {
    const {
      __scopeDialog,
      children,
      open: openProp,
      defaultOpen,
      onOpenChange,
      modal = true
    } = props;
    const triggerRef = A$1(null);
    const contentRef = A$1(null);
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: DIALOG_NAME
    });
    return u$1(
      DialogProvider,
      {
        scope: __scopeDialog,
        triggerRef,
        contentRef,
        contentId: useId(),
        titleId: useId(),
        descriptionId: useId(),
        open,
        onOpenChange: setOpen,
        onOpenToggle: q$1(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
        modal,
        children
      }
    );
  };
  Dialog.displayName = DIALOG_NAME;
  var TRIGGER_NAME$1 = "DialogTrigger";
  var DialogTrigger = D(
    (props, forwardedRef) => {
      const { __scopeDialog, ...triggerProps } = props;
      const context = useDialogContext(TRIGGER_NAME$1, __scopeDialog);
      const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
      return u$1(
        Primitive.button,
        {
          type: "button",
          "aria-haspopup": "dialog",
          "aria-expanded": context.open,
          "aria-controls": context.contentId,
          "data-state": getState(context.open),
          ...triggerProps,
          ref: composedTriggerRef,
          onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
        }
      );
    }
  );
  DialogTrigger.displayName = TRIGGER_NAME$1;
  var PORTAL_NAME$1 = "DialogPortal";
  var [PortalProvider$1, usePortalContext$1] = createDialogContext(PORTAL_NAME$1, {
    forceMount: void 0
  });
  var DialogPortal = (props) => {
    const { __scopeDialog, forceMount, children, container } = props;
    const context = useDialogContext(PORTAL_NAME$1, __scopeDialog);
    return u$1(PortalProvider$1, { scope: __scopeDialog, forceMount, children: O.map(children, (child) => u$1(Presence, { present: forceMount || context.open, children: u$1(Portal$2, { asChild: true, container, children: child }) })) });
  };
  DialogPortal.displayName = PORTAL_NAME$1;
  var OVERLAY_NAME = "DialogOverlay";
  var DialogOverlay = D(
    (props, forwardedRef) => {
      const portalContext = usePortalContext$1(OVERLAY_NAME, props.__scopeDialog);
      const { forceMount = portalContext.forceMount, ...overlayProps } = props;
      const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
      return context.modal ? u$1(Presence, { present: forceMount || context.open, children: u$1(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
    }
  );
  DialogOverlay.displayName = OVERLAY_NAME;
  var Slot = createSlot("DialogOverlay.RemoveScroll");
  var DialogOverlayImpl = D(
    (props, forwardedRef) => {
      const { __scopeDialog, ...overlayProps } = props;
      const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
      return (


u$1(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: u$1(
          Primitive.div,
          {
            "data-state": getState(context.open),
            ...overlayProps,
            ref: forwardedRef,
            style: { pointerEvents: "auto", ...overlayProps.style }
          }
        ) })
      );
    }
  );
  var CONTENT_NAME$2 = "DialogContent";
  var DialogContent$1 = D(
    (props, forwardedRef) => {
      const portalContext = usePortalContext$1(CONTENT_NAME$2, props.__scopeDialog);
      const { forceMount = portalContext.forceMount, ...contentProps } = props;
      const context = useDialogContext(CONTENT_NAME$2, props.__scopeDialog);
      return u$1(Presence, { present: forceMount || context.open, children: context.modal ? u$1(DialogContentModal, { ...contentProps, ref: forwardedRef }) : u$1(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
    }
  );
  DialogContent$1.displayName = CONTENT_NAME$2;
  var DialogContentModal = D(
    (props, forwardedRef) => {
      const context = useDialogContext(CONTENT_NAME$2, props.__scopeDialog);
      const contentRef = A$1(null);
      const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
      y(() => {
        const content2 = contentRef.current;
        if (content2) return hideOthers(content2);
      }, []);
      return u$1(
        DialogContentImpl,
        {
          ...props,
          ref: composedRefs,
          trapFocus: context.open,
          disableOutsidePointerEvents: true,
          onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
            event.preventDefault();
            context.triggerRef.current?.focus();
          }),
          onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            if (isRightClick) event.preventDefault();
          }),
          onFocusOutside: composeEventHandlers(
            props.onFocusOutside,
            (event) => event.preventDefault()
          )
        }
      );
    }
  );
  var DialogContentNonModal = D(
    (props, forwardedRef) => {
      const context = useDialogContext(CONTENT_NAME$2, props.__scopeDialog);
      const hasInteractedOutsideRef = A$1(false);
      const hasPointerDownOutsideRef = A$1(false);
      return u$1(
        DialogContentImpl,
        {
          ...props,
          ref: forwardedRef,
          trapFocus: false,
          disableOutsidePointerEvents: false,
          onCloseAutoFocus: (event) => {
            props.onCloseAutoFocus?.(event);
            if (!event.defaultPrevented) {
              if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
              event.preventDefault();
            }
            hasInteractedOutsideRef.current = false;
            hasPointerDownOutsideRef.current = false;
          },
          onInteractOutside: (event) => {
            props.onInteractOutside?.(event);
            if (!event.defaultPrevented) {
              hasInteractedOutsideRef.current = true;
              if (event.detail.originalEvent.type === "pointerdown") {
                hasPointerDownOutsideRef.current = true;
              }
            }
            const target = event.target;
            const targetIsTrigger = context.triggerRef.current?.contains(target);
            if (targetIsTrigger) event.preventDefault();
            if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
              event.preventDefault();
            }
          }
        }
      );
    }
  );
  var DialogContentImpl = D(
    (props, forwardedRef) => {
      const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
      const context = useDialogContext(CONTENT_NAME$2, __scopeDialog);
      const contentRef = A$1(null);
      const composedRefs = useComposedRefs(forwardedRef, contentRef);
      useFocusGuards();
      return u$1(k$2, { children: [
u$1(
          FocusScope,
          {
            asChild: true,
            loop: true,
            trapped: trapFocus,
            onMountAutoFocus: onOpenAutoFocus,
            onUnmountAutoFocus: onCloseAutoFocus,
            children: u$1(
              DismissableLayer,
              {
                role: "dialog",
                id: context.contentId,
                "aria-describedby": context.descriptionId,
                "aria-labelledby": context.titleId,
                "data-state": getState(context.open),
                ...contentProps,
                ref: composedRefs,
                onDismiss: () => context.onOpenChange(false)
              }
            )
          }
        ),
u$1(k$2, { children: [
u$1(TitleWarning, { titleId: context.titleId }),
u$1(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
        ] })
      ] });
    }
  );
  var TITLE_NAME = "DialogTitle";
  var DialogTitle = D(
    (props, forwardedRef) => {
      const { __scopeDialog, ...titleProps } = props;
      const context = useDialogContext(TITLE_NAME, __scopeDialog);
      return u$1(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
    }
  );
  DialogTitle.displayName = TITLE_NAME;
  var DESCRIPTION_NAME = "DialogDescription";
  var DialogDescription = D(
    (props, forwardedRef) => {
      const { __scopeDialog, ...descriptionProps } = props;
      const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
      return u$1(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
    }
  );
  DialogDescription.displayName = DESCRIPTION_NAME;
  var CLOSE_NAME = "DialogClose";
  var DialogClose = D(
    (props, forwardedRef) => {
      const { __scopeDialog, ...closeProps } = props;
      const context = useDialogContext(CLOSE_NAME, __scopeDialog);
      return u$1(
        Primitive.button,
        {
          type: "button",
          ...closeProps,
          ref: forwardedRef,
          onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
        }
      );
    }
  );
  DialogClose.displayName = CLOSE_NAME;
  function getState(open) {
    return open ? "open" : "closed";
  }
  var TITLE_WARNING_NAME = "DialogTitleWarning";
  var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
    contentName: CONTENT_NAME$2,
    titleName: TITLE_NAME,
    docsSlug: "dialog"
  });
  var TitleWarning = ({ titleId }) => {
    const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
    const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
    y(() => {
      if (titleId) {
        const hasTitle = document.getElementById(titleId);
        if (!hasTitle) console.error(MESSAGE);
      }
    }, [MESSAGE, titleId]);
    return null;
  };
  var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
  var DescriptionWarning = ({ contentRef, descriptionId }) => {
    const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
    const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
    y(() => {
      const describedById = contentRef.current?.getAttribute("aria-describedby");
      if (descriptionId && describedById) {
        const hasDescription = document.getElementById(descriptionId);
        if (!hasDescription) console.warn(MESSAGE);
      }
    }, [MESSAGE, contentRef, descriptionId]);
    return null;
  };
  var Root$1 = Dialog;
  var Trigger$1 = DialogTrigger;
  var Portal$1 = DialogPortal;
  var Overlay = DialogOverlay;
  var Content$1 = DialogContent$1;
  var Title = DialogTitle;
  var Close = DialogClose;
  const sides = ["top", "right", "bottom", "left"];
  const min = Math.min;
  const max = Math.max;
  const round = Math.round;
  const floor = Math.floor;
  const createCoords = (v2) => ({
    x: v2,
    y: v2
  });
  const oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  const oppositeAlignmentMap = {
    start: "end",
    end: "start"
  };
  function clamp(start, value, end) {
    return max(start, min(value, end));
  }
  function evaluate(value, param) {
    return typeof value === "function" ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split("-")[0];
  }
  function getAlignment(placement) {
    return placement.split("-")[1];
  }
  function getOppositeAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  function getAxisLength(axis) {
    return axis === "y" ? "height" : "width";
  }
  const yAxisSides = new Set(["top", "bottom"]);
  function getSideAxis(placement) {
    return yAxisSides.has(getSide(placement)) ? "y" : "x";
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const length = getAxisLength(alignmentAxis);
    let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
  }
  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
  }
  const lrPlacement = ["left", "right"];
  const rlPlacement = ["right", "left"];
  const tbPlacement = ["top", "bottom"];
  const btPlacement = ["bottom", "top"];
  function getSideList(side, isStart, rtl) {
    switch (side) {
      case "top":
      case "bottom":
        if (rtl) return isStart ? rlPlacement : lrPlacement;
        return isStart ? lrPlacement : rlPlacement;
      case "left":
      case "right":
        return isStart ? tbPlacement : btPlacement;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list2 = getSideList(getSide(placement), direction === "start", rtl);
    if (alignment) {
      list2 = list2.map((side) => side + "-" + alignment);
      if (flipAlignment) {
        list2 = list2.concat(list2.map(getOppositeAlignmentPlacement));
      }
    }
    return list2;
  }
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
  }
  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }
  function getPaddingObject(padding) {
    return typeof padding !== "number" ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    const {
      x: x2,
      y: y2,
      width,
      height
    } = rect;
    return {
      width,
      height,
      top: y2,
      left: x2,
      right: x2 + width,
      bottom: y2 + height,
      x: x2,
      y: y2
    };
  }
  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const sideAxis = getSideAxis(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const alignLength = getAxisLength(alignmentAxis);
    const side = getSide(placement);
    const isVertical = sideAxis === "y";
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch (side) {
      case "top":
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case "bottom":
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case "right":
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case "left":
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case "start":
        coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case "end":
        coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }
  async function detectOverflow(state, options) {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x: x2,
      y: y2,
      platform: platform2,
      rects,
      elements,
      strategy
    } = state;
    const {
      boundary = "clippingAncestors",
      rootBoundary = "viewport",
      elementContext = "floating",
      altBoundary = false,
      padding = 0
    } = evaluate(options, state);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === "floating" ? "reference" : "floating";
    const element2 = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
      element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element2))) != null ? _await$platform$isEle : true) ? element2 : element2.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === "floating" ? {
      x: x2,
      y: y2,
      width: rects.floating.width,
      height: rects.floating.height
    } : rects.reference;
    const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
    const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements,
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }
  const computePosition$1 = async (reference, floating, config) => {
    const {
      placement = "bottom",
      strategy = "absolute",
      middleware = [],
      platform: platform2
    } = config;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
    let rects = await platform2.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x: x2,
      y: y2
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i2 = 0; i2 < validMiddleware.length; i2++) {
      var _platform$detectOverf;
      const {
        name,
        fn: fn2
      } = validMiddleware[i2];
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn2({
        x: x2,
        y: y2,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform: {
          ...platform2,
          detectOverflow: (_platform$detectOverf = platform2.detectOverflow) != null ? _platform$detectOverf : detectOverflow
        },
        elements: {
          reference,
          floating
        }
      });
      x2 = nextX != null ? nextX : x2;
      y2 = nextY != null ? nextY : y2;
      middlewareData = {
        ...middlewareData,
        [name]: {
          ...middlewareData[name],
          ...data
        }
      };
      if (reset && resetCount <= 50) {
        resetCount++;
        if (typeof reset === "object") {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform2.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x: x2,
            y: y2
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i2 = -1;
      }
    }
    return {
      x: x2,
      y: y2,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };
  const arrow$3 = (options) => ({
    name: "arrow",
    options,
    async fn(state) {
      const {
        x: x2,
        y: y2,
        placement,
        rects,
        platform: platform2,
        elements,
        middlewareData
      } = state;
      const {
        element: element2,
        padding = 0
      } = evaluate(options, state) || {};
      if (element2 == null) {
        return {};
      }
      const paddingObject = getPaddingObject(padding);
      const coords = {
        x: x2,
        y: y2
      };
      const axis = getAlignmentAxis(placement);
      const length = getAxisLength(axis);
      const arrowDimensions = await platform2.getDimensions(element2);
      const isYAxis = axis === "y";
      const minProp = isYAxis ? "top" : "left";
      const maxProp = isYAxis ? "bottom" : "right";
      const clientProp = isYAxis ? "clientHeight" : "clientWidth";
      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];
      const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element2));
      let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
      if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
        clientSize = elements.floating[clientProp] || rects.floating[length];
      }
      const centerToReference = endDiff / 2 - startDiff / 2;
      const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
      const minPadding = min(paddingObject[minProp], largestPossiblePadding);
      const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
      const min$1 = minPadding;
      const max2 = clientSize - arrowDimensions[length] - maxPadding;
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const offset2 = clamp(min$1, center, max2);
      const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
      const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
      return {
        [axis]: coords[axis] + alignmentOffset,
        data: {
          [axis]: offset2,
          centerOffset: center - offset2 - alignmentOffset,
          ...shouldAddOffset && {
            alignmentOffset
          }
        },
        reset: shouldAddOffset
      };
    }
  });
  const flip$2 = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "flip",
      options,
      async fn(state) {
        var _middlewareData$arrow, _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform: platform2,
          elements
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = "bestFit",
          fallbackAxisSideDirection = "none",
          flipAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state);
        if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        const side = getSide(placement);
        const initialSideAxis = getSideAxis(initialPlacement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
        if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements = [initialPlacement, ...fallbackPlacements];
        const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const sides2 = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];
        if (!overflows.every((side2) => side2 <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements[nextIndex];
          if (nextPlacement) {
            const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
            if (!ignoreCrossAxisOverflow ||

overflowsData.every((d2) => getSideAxis(d2.placement) === initialSideAxis ? d2.overflows[0] > 0 : true)) {
              return {
                data: {
                  index: nextIndex,
                  overflows: overflowsData
                },
                reset: {
                  placement: nextPlacement
                }
              };
            }
          }
          let resetPlacement = (_overflowsData$filter = overflowsData.filter((d2) => d2.overflows[0] <= 0).sort((a2, b2) => a2.overflows[1] - b2.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case "bestFit": {
                var _overflowsData$filter2;
                const placement2 = (_overflowsData$filter2 = overflowsData.filter((d2) => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d2.placement);
                    return currentSideAxis === initialSideAxis ||

currentSideAxis === "y";
                  }
                  return true;
                }).map((d2) => [d2.placement, d2.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a2, b2) => a2[1] - b2[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement2) {
                  resetPlacement = placement2;
                }
                break;
              }
              case "initialPlacement":
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };
  function getSideOffsets(overflow, rect) {
    return {
      top: overflow.top - rect.height,
      right: overflow.right - rect.width,
      bottom: overflow.bottom - rect.height,
      left: overflow.left - rect.width
    };
  }
  function isAnySideFullyClipped(overflow) {
    return sides.some((side) => overflow[side] >= 0);
  }
  const hide$2 = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "hide",
      options,
      async fn(state) {
        const {
          rects,
          platform: platform2
        } = state;
        const {
          strategy = "referenceHidden",
          ...detectOverflowOptions
        } = evaluate(options, state);
        switch (strategy) {
          case "referenceHidden": {
            const overflow = await platform2.detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: "reference"
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
          case "escaped": {
            const overflow = await platform2.detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
          default: {
            return {};
          }
        }
      }
    };
  };
  const originSides = new Set(["left", "top"]);
  async function convertValueToCoords(state, options) {
    const {
      placement,
      platform: platform2,
      elements
    } = state;
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === "y";
    const mainAxisMulti = originSides.has(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === "number" ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: rawValue.mainAxis || 0,
      crossAxis: rawValue.crossAxis || 0,
      alignmentAxis: rawValue.alignmentAxis
    };
    if (alignment && typeof alignmentAxis === "number") {
      crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }
  const offset$2 = function(options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: "offset",
      options,
      async fn(state) {
        var _middlewareData$offse, _middlewareData$arrow;
        const {
          x: x2,
          y: y2,
          placement,
          middlewareData
        } = state;
        const diffCoords = await convertValueToCoords(state, options);
        if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        return {
          x: x2 + diffCoords.x,
          y: y2 + diffCoords.y,
          data: {
            ...diffCoords,
            placement
          }
        };
      }
    };
  };
  const shift$2 = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "shift",
      options,
      async fn(state) {
        const {
          x: x2,
          y: y2,
          placement,
          platform: platform2
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: (_ref) => {
              let {
                x: x3,
                y: y3
              } = _ref;
              return {
                x: x3,
                y: y3
              };
            }
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const coords = {
          x: x2,
          y: y2
        };
        const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
        const crossAxis = getSideAxis(getSide(placement));
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        if (checkMainAxis) {
          const minSide = mainAxis === "y" ? "top" : "left";
          const maxSide = mainAxis === "y" ? "bottom" : "right";
          const min2 = mainAxisCoord + overflow[minSide];
          const max2 = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = clamp(min2, mainAxisCoord, max2);
        }
        if (checkCrossAxis) {
          const minSide = crossAxis === "y" ? "top" : "left";
          const maxSide = crossAxis === "y" ? "bottom" : "right";
          const min2 = crossAxisCoord + overflow[minSide];
          const max2 = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = clamp(min2, crossAxisCoord, max2);
        }
        const limitedCoords = limiter.fn({
          ...state,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x2,
            y: limitedCoords.y - y2,
            enabled: {
              [mainAxis]: checkMainAxis,
              [crossAxis]: checkCrossAxis
            }
          }
        };
      }
    };
  };
  const limitShift$2 = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      options,
      fn(state) {
        const {
          x: x2,
          y: y2,
          placement,
          rects,
          middlewareData
        } = state;
        const {
          offset: offset2 = 0,
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true
        } = evaluate(options, state);
        const coords = {
          x: x2,
          y: y2
        };
        const crossAxis = getSideAxis(placement);
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        const rawOffset = evaluate(offset2, state);
        const computedOffset = typeof rawOffset === "number" ? {
          mainAxis: rawOffset,
          crossAxis: 0
        } : {
          mainAxis: 0,
          crossAxis: 0,
          ...rawOffset
        };
        if (checkMainAxis) {
          const len = mainAxis === "y" ? "height" : "width";
          const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
          const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
          if (mainAxisCoord < limitMin) {
            mainAxisCoord = limitMin;
          } else if (mainAxisCoord > limitMax) {
            mainAxisCoord = limitMax;
          }
        }
        if (checkCrossAxis) {
          var _middlewareData$offse, _middlewareData$offse2;
          const len = mainAxis === "y" ? "width" : "height";
          const isOriginSide = originSides.has(getSide(placement));
          const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
          const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
          if (crossAxisCoord < limitMin) {
            crossAxisCoord = limitMin;
          } else if (crossAxisCoord > limitMax) {
            crossAxisCoord = limitMax;
          }
        }
        return {
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        };
      }
    };
  };
  const size$2 = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "size",
      options,
      async fn(state) {
        var _state$middlewareData, _state$middlewareData2;
        const {
          placement,
          rects,
          platform: platform2,
          elements
        } = state;
        const {
          apply = () => {
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
        const side = getSide(placement);
        const alignment = getAlignment(placement);
        const isYAxis = getSideAxis(placement) === "y";
        const {
          width,
          height
        } = rects.floating;
        let heightSide;
        let widthSide;
        if (side === "top" || side === "bottom") {
          heightSide = side;
          widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
        } else {
          widthSide = side;
          heightSide = alignment === "end" ? "top" : "bottom";
        }
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        const maximumClippingWidth = width - overflow.left - overflow.right;
        const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
        const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
        const noShift = !state.middlewareData.shift;
        let availableHeight = overflowAvailableHeight;
        let availableWidth = overflowAvailableWidth;
        if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
          availableWidth = maximumClippingWidth;
        }
        if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
          availableHeight = maximumClippingHeight;
        }
        if (noShift && !alignment) {
          const xMin = max(overflow.left, 0);
          const xMax = max(overflow.right, 0);
          const yMin = max(overflow.top, 0);
          const yMax = max(overflow.bottom, 0);
          if (isYAxis) {
            availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
          } else {
            availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
          }
        }
        await apply({
          ...state,
          availableWidth,
          availableHeight
        });
        const nextDimensions = await platform2.getDimensions(elements.floating);
        if (width !== nextDimensions.width || height !== nextDimensions.height) {
          return {
            reset: {
              rects: true
            }
          };
        }
        return {};
      }
    };
  };
  function hasWindow() {
    return typeof window !== "undefined";
  }
  function getNodeName(node2) {
    if (isNode(node2)) {
      return (node2.nodeName || "").toLowerCase();
    }
    return "#document";
  }
  function getWindow(node2) {
    var _node$ownerDocument;
    return (node2 == null || (_node$ownerDocument = node2.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node2) {
    var _ref;
    return (_ref = (isNode(node2) ? node2.ownerDocument : node2.document) || window.document) == null ? void 0 : _ref.documentElement;
  }
  function isNode(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Node || value instanceof getWindow(value).Node;
  }
  function isElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Element || value instanceof getWindow(value).Element;
  }
  function isHTMLElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
  }
  function isShadowRoot(value) {
    if (!hasWindow() || typeof ShadowRoot === "undefined") {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
  }
  const invalidOverflowDisplayValues = new Set(["inline", "contents"]);
  function isOverflowElement(element2) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle$1(element2);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !invalidOverflowDisplayValues.has(display);
  }
  const tableElements = new Set(["table", "td", "th"]);
  function isTableElement(element2) {
    return tableElements.has(getNodeName(element2));
  }
  const topLayerSelectors = [":popover-open", ":modal"];
  function isTopLayer(element2) {
    return topLayerSelectors.some((selector) => {
      try {
        return element2.matches(selector);
      } catch (_e) {
        return false;
      }
    });
  }
  const transformProperties = ["transform", "translate", "scale", "rotate", "perspective"];
  const willChangeValues = ["transform", "translate", "scale", "rotate", "perspective", "filter"];
  const containValues = ["paint", "layout", "strict", "content"];
  function isContainingBlock(elementOrCss) {
    const webkit = isWebKit();
    const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
    return transformProperties.some((value) => css[value] ? css[value] !== "none" : false) || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || willChangeValues.some((value) => (css.willChange || "").includes(value)) || containValues.some((value) => (css.contain || "").includes(value));
  }
  function getContainingBlock(element2) {
    let currentNode = getParentNode(element2);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else if (isTopLayer(currentNode)) {
        return null;
      }
      currentNode = getParentNode(currentNode);
    }
    return null;
  }
  function isWebKit() {
    if (typeof CSS === "undefined" || !CSS.supports) return false;
    return CSS.supports("-webkit-backdrop-filter", "none");
  }
  const lastTraversableNodeNames = new Set(["html", "body", "#document"]);
  function isLastTraversableNode(node2) {
    return lastTraversableNodeNames.has(getNodeName(node2));
  }
  function getComputedStyle$1(element2) {
    return getWindow(element2).getComputedStyle(element2);
  }
  function getNodeScroll(element2) {
    if (isElement(element2)) {
      return {
        scrollLeft: element2.scrollLeft,
        scrollTop: element2.scrollTop
      };
    }
    return {
      scrollLeft: element2.scrollX,
      scrollTop: element2.scrollY
    };
  }
  function getParentNode(node2) {
    if (getNodeName(node2) === "html") {
      return node2;
    }
    const result = (
node2.assignedSlot ||
node2.parentNode ||
isShadowRoot(node2) && node2.host ||
getDocumentElement(node2)
    );
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node2) {
    const parentNode = getParentNode(node2);
    if (isLastTraversableNode(parentNode)) {
      return node2.ownerDocument ? node2.ownerDocument.body : node2.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node2, list2, traverseIframes) {
    var _node$ownerDocument2;
    if (list2 === void 0) {
      list2 = [];
    }
    if (traverseIframes === void 0) {
      traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node2);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node2.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      const frameElement = getFrameElement(win);
      return list2.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
    }
    return list2.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
  function getFrameElement(win) {
    return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
  }
  function getCssDimensions(element2) {
    const css = getComputedStyle$1(element2);
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element2);
    const offsetWidth = hasOffset ? element2.offsetWidth : width;
    const offsetHeight = hasOffset ? element2.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }
  function unwrapElement(element2) {
    return !isElement(element2) ? element2.contextElement : element2;
  }
  function getScale(element2) {
    const domElement = unwrapElement(element2);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $: $2
    } = getCssDimensions(domElement);
    let x2 = ($2 ? round(rect.width) : rect.width) / width;
    let y2 = ($2 ? round(rect.height) : rect.height) / height;
    if (!x2 || !Number.isFinite(x2)) {
      x2 = 1;
    }
    if (!y2 || !Number.isFinite(y2)) {
      y2 = 1;
    }
    return {
      x: x2,
      y: y2
    };
  }
  const noOffsets = createCoords(0);
  function getVisualOffsets(element2) {
    const win = getWindow(element2);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element2, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element2)) {
      return false;
    }
    return isFixed;
  }
  function getBoundingClientRect(element2, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element2.getBoundingClientRect();
    const domElement = unwrapElement(element2);
    let scale = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element2);
      }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    let x2 = (clientRect.left + visualOffsets.x) / scale.x;
    let y2 = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
      const win = getWindow(domElement);
      const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentWin = win;
      let currentIFrame = getFrameElement(currentWin);
      while (currentIFrame && offsetParent && offsetWin !== currentWin) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle$1(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x2 *= iframeScale.x;
        y2 *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x2 += left;
        y2 += top;
        currentWin = getWindow(currentIFrame);
        currentIFrame = getFrameElement(currentWin);
      }
    }
    return rectToClientRect({
      width,
      height,
      x: x2,
      y: y2
    });
  }
  function getWindowScrollBarX(element2, rect) {
    const leftScroll = getNodeScroll(element2).scrollLeft;
    if (!rect) {
      return getBoundingClientRect(getDocumentElement(element2)).left + leftScroll;
    }
    return rect.left + leftScroll;
  }
  function getHTMLOffset(documentElement, scroll) {
    const htmlRect = documentElement.getBoundingClientRect();
    const x2 = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
    const y2 = htmlRect.top + scroll.scrollTop;
    return {
      x: x2,
      y: y2
    };
  }
  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      elements,
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isFixed = strategy === "fixed";
    const documentElement = getDocumentElement(offsetParent);
    const topLayer = elements ? isTopLayer(elements.floating) : false;
    if (offsetParent === documentElement || topLayer && isFixed) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createCoords(1);
    const offsets = createCoords(0);
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
    };
  }
  function getClientRects(element2) {
    return Array.from(element2.getClientRects());
  }
  function getDocumentRect(element2) {
    const html2 = getDocumentElement(element2);
    const scroll = getNodeScroll(element2);
    const body2 = element2.ownerDocument.body;
    const width = max(html2.scrollWidth, html2.clientWidth, body2.scrollWidth, body2.clientWidth);
    const height = max(html2.scrollHeight, html2.clientHeight, body2.scrollHeight, body2.clientHeight);
    let x2 = -scroll.scrollLeft + getWindowScrollBarX(element2);
    const y2 = -scroll.scrollTop;
    if (getComputedStyle$1(body2).direction === "rtl") {
      x2 += max(html2.clientWidth, body2.clientWidth) - width;
    }
    return {
      width,
      height,
      x: x2,
      y: y2
    };
  }
  const SCROLLBAR_MAX = 25;
  function getViewportRect(element2, strategy) {
    const win = getWindow(element2);
    const html2 = getDocumentElement(element2);
    const visualViewport = win.visualViewport;
    let width = html2.clientWidth;
    let height = html2.clientHeight;
    let x2 = 0;
    let y2 = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const visualViewportBased = isWebKit();
      if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
        x2 = visualViewport.offsetLeft;
        y2 = visualViewport.offsetTop;
      }
    }
    const windowScrollbarX = getWindowScrollBarX(html2);
    if (windowScrollbarX <= 0) {
      const doc = html2.ownerDocument;
      const body2 = doc.body;
      const bodyStyles = getComputedStyle(body2);
      const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
      const clippingStableScrollbarWidth = Math.abs(html2.clientWidth - body2.clientWidth - bodyMarginInline);
      if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
        width -= clippingStableScrollbarWidth;
      }
    } else if (windowScrollbarX <= SCROLLBAR_MAX) {
      width += windowScrollbarX;
    }
    return {
      width,
      height,
      x: x2,
      y: y2
    };
  }
  const absoluteOrFixed = new Set(["absolute", "fixed"]);
  function getInnerBoundingClientRect(element2, strategy) {
    const clientRect = getBoundingClientRect(element2, true, strategy === "fixed");
    const top = clientRect.top + element2.clientTop;
    const left = clientRect.left + element2.clientLeft;
    const scale = isHTMLElement(element2) ? getScale(element2) : createCoords(1);
    const width = element2.clientWidth * scale.x;
    const height = element2.clientHeight * scale.y;
    const x2 = left * scale.x;
    const y2 = top * scale.y;
    return {
      width,
      height,
      x: x2,
      y: y2
    };
  }
  function getClientRectFromClippingAncestor(element2, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === "viewport") {
      rect = getViewportRect(element2, strategy);
    } else if (clippingAncestor === "document") {
      rect = getDocumentRect(getDocumentElement(element2));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element2);
      rect = {
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y,
        width: clippingAncestor.width,
        height: clippingAncestor.height
      };
    }
    return rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element2, stopNode) {
    const parentNode = getParentNode(element2);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
  }
  function getClippingElementAncestors(element2, cache) {
    const cachedResult = cache.get(element2);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element2, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = getComputedStyle$1(element2).position === "fixed";
    let currentNode = elementIsFixed ? getParentNode(element2) : element2;
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle$1(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === "fixed") {
        currentContainingBlockComputedStyle = null;
      }
      const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && absoluteOrFixed.has(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element2, currentNode);
      if (shouldDropCurrentNode) {
        result = result.filter((ancestor) => ancestor !== currentNode);
      } else {
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element2, result);
    return result;
  }
  function getClippingRect(_ref) {
    let {
      element: element2,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element2) ? [] : getClippingElementAncestors(element2, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element2, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element2, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }
  function getDimensions(element2) {
    const {
      width,
      height
    } = getCssDimensions(element2);
    return {
      width,
      height
    };
  }
  function getRectRelativeToOffsetParent(element2, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === "fixed";
    const rect = getBoundingClientRect(element2, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createCoords(0);
    function setLeftRTLScrollbarOffset() {
      offsets.x = getWindowScrollBarX(documentElement);
    }
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        setLeftRTLScrollbarOffset();
      }
    }
    if (isFixed && !isOffsetParentAnElement && documentElement) {
      setLeftRTLScrollbarOffset();
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    const x2 = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
    const y2 = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
    return {
      x: x2,
      y: y2,
      width: rect.width,
      height: rect.height
    };
  }
  function isStaticPositioned(element2) {
    return getComputedStyle$1(element2).position === "static";
  }
  function getTrueOffsetParent(element2, polyfill) {
    if (!isHTMLElement(element2) || getComputedStyle$1(element2).position === "fixed") {
      return null;
    }
    if (polyfill) {
      return polyfill(element2);
    }
    let rawOffsetParent = element2.offsetParent;
    if (getDocumentElement(element2) === rawOffsetParent) {
      rawOffsetParent = rawOffsetParent.ownerDocument.body;
    }
    return rawOffsetParent;
  }
  function getOffsetParent(element2, polyfill) {
    const win = getWindow(element2);
    if (isTopLayer(element2)) {
      return win;
    }
    if (!isHTMLElement(element2)) {
      let svgOffsetParent = getParentNode(element2);
      while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
        if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
          return svgOffsetParent;
        }
        svgOffsetParent = getParentNode(svgOffsetParent);
      }
      return win;
    }
    let offsetParent = getTrueOffsetParent(element2, polyfill);
    while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
      return win;
    }
    return offsetParent || getContainingBlock(element2) || win;
  }
  const getElementRects = async function(data) {
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    const floatingDimensions = await getDimensionsFn(data.floating);
    return {
      reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
      floating: {
        x: 0,
        y: 0,
        width: floatingDimensions.width,
        height: floatingDimensions.height
      }
    };
  };
  function isRTL(element2) {
    return getComputedStyle$1(element2).direction === "rtl";
  }
  const platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL
  };
  function rectsAreEqual(a2, b2) {
    return a2.x === b2.x && a2.y === b2.y && a2.width === b2.width && a2.height === b2.height;
  }
  function observeMove(element2, onMove) {
    let io = null;
    let timeoutId;
    const root2 = getDocumentElement(element2);
    function cleanup() {
      var _io;
      clearTimeout(timeoutId);
      (_io = io) == null || _io.disconnect();
      io = null;
    }
    function refresh(skip, threshold) {
      if (skip === void 0) {
        skip = false;
      }
      if (threshold === void 0) {
        threshold = 1;
      }
      cleanup();
      const elementRectForRootMargin = element2.getBoundingClientRect();
      const {
        left,
        top,
        width,
        height
      } = elementRectForRootMargin;
      if (!skip) {
        onMove();
      }
      if (!width || !height) {
        return;
      }
      const insetTop = floor(top);
      const insetRight = floor(root2.clientWidth - (left + width));
      const insetBottom = floor(root2.clientHeight - (top + height));
      const insetLeft = floor(left);
      const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
      const options = {
        rootMargin,
        threshold: max(0, min(1, threshold)) || 1
      };
      let isFirstUpdate = true;
      function handleObserve(entries) {
        const ratio = entries[0].intersectionRatio;
        if (ratio !== threshold) {
          if (!isFirstUpdate) {
            return refresh();
          }
          if (!ratio) {
            timeoutId = setTimeout(() => {
              refresh(false, 1e-7);
            }, 1e3);
          } else {
            refresh(false, ratio);
          }
        }
        if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element2.getBoundingClientRect())) {
          refresh();
        }
        isFirstUpdate = false;
      }
      try {
        io = new IntersectionObserver(handleObserve, {
          ...options,
root: root2.ownerDocument
        });
      } catch (_e) {
        io = new IntersectionObserver(handleObserve, options);
      }
      io.observe(element2);
    }
    refresh(true);
    return cleanup;
  }
  function autoUpdate(reference, floating, update, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      ancestorScroll = true,
      ancestorResize = true,
      elementResize = typeof ResizeObserver === "function",
      layoutShift = typeof IntersectionObserver === "function",
      animationFrame = false
    } = options;
    const referenceEl = unwrapElement(reference);
    const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.addEventListener("scroll", update, {
        passive: true
      });
      ancestorResize && ancestor.addEventListener("resize", update);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
    let reobserveFrame = -1;
    let resizeObserver = null;
    if (elementResize) {
      resizeObserver = new ResizeObserver((_ref) => {
        let [firstEntry] = _ref;
        if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
          resizeObserver.unobserve(floating);
          cancelAnimationFrame(reobserveFrame);
          reobserveFrame = requestAnimationFrame(() => {
            var _resizeObserver;
            (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
          });
        }
        update();
      });
      if (referenceEl && !animationFrame) {
        resizeObserver.observe(referenceEl);
      }
      resizeObserver.observe(floating);
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
      frameLoop();
    }
    function frameLoop() {
      const nextRefRect = getBoundingClientRect(reference);
      if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
        update();
      }
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop);
    }
    update();
    return () => {
      var _resizeObserver2;
      ancestors.forEach((ancestor) => {
        ancestorScroll && ancestor.removeEventListener("scroll", update);
        ancestorResize && ancestor.removeEventListener("resize", update);
      });
      cleanupIo == null || cleanupIo();
      (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
      resizeObserver = null;
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  }
  const offset$1 = offset$2;
  const shift$1 = shift$2;
  const flip$1 = flip$2;
  const size$1 = size$2;
  const hide$1 = hide$2;
  const arrow$2 = arrow$3;
  const limitShift$1 = limitShift$2;
  const computePosition = (reference, floating, options) => {
    const cache = new Map();
    const mergedOptions = {
      platform,
      ...options
    };
    const platformWithCache = {
      ...mergedOptions.platform,
      _c: cache
    };
    return computePosition$1(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };
  var isClient = typeof document !== "undefined";
  var noop = function noop2() {
  };
  var index = isClient ? _ : noop;
  function deepEqual(a2, b2) {
    if (a2 === b2) {
      return true;
    }
    if (typeof a2 !== typeof b2) {
      return false;
    }
    if (typeof a2 === "function" && a2.toString() === b2.toString()) {
      return true;
    }
    let length;
    let i2;
    let keys2;
    if (a2 && b2 && typeof a2 === "object") {
      if (Array.isArray(a2)) {
        length = a2.length;
        if (length !== b2.length) return false;
        for (i2 = length; i2-- !== 0; ) {
          if (!deepEqual(a2[i2], b2[i2])) {
            return false;
          }
        }
        return true;
      }
      keys2 = Object.keys(a2);
      length = keys2.length;
      if (length !== Object.keys(b2).length) {
        return false;
      }
      for (i2 = length; i2-- !== 0; ) {
        if (!{}.hasOwnProperty.call(b2, keys2[i2])) {
          return false;
        }
      }
      for (i2 = length; i2-- !== 0; ) {
        const key2 = keys2[i2];
        if (key2 === "_owner" && a2.$$typeof) {
          continue;
        }
        if (!deepEqual(a2[key2], b2[key2])) {
          return false;
        }
      }
      return true;
    }
    return a2 !== a2 && b2 !== b2;
  }
  function getDPR(element2) {
    if (typeof window === "undefined") {
      return 1;
    }
    const win = element2.ownerDocument.defaultView || window;
    return win.devicePixelRatio || 1;
  }
  function roundByDPR(element2, value) {
    const dpr = getDPR(element2);
    return Math.round(value * dpr) / dpr;
  }
  function useLatestRef(value) {
    const ref = A$1(value);
    index(() => {
      ref.current = value;
    });
    return ref;
  }
  function useFloating(options) {
    if (options === void 0) {
      options = {};
    }
    const {
      placement = "bottom",
      strategy = "absolute",
      middleware = [],
      platform: platform2,
      elements: {
        reference: externalReference,
        floating: externalFloating
      } = {},
      transform = true,
      whileElementsMounted,
      open
    } = options;
    const [data, setData] = d({
      x: 0,
      y: 0,
      strategy,
      placement,
      middlewareData: {},
      isPositioned: false
    });
    const [latestMiddleware, setLatestMiddleware] = d(middleware);
    if (!deepEqual(latestMiddleware, middleware)) {
      setLatestMiddleware(middleware);
    }
    const [_reference, _setReference] = d(null);
    const [_floating, _setFloating] = d(null);
    const setReference = q$1((node2) => {
      if (node2 !== referenceRef.current) {
        referenceRef.current = node2;
        _setReference(node2);
      }
    }, []);
    const setFloating = q$1((node2) => {
      if (node2 !== floatingRef.current) {
        floatingRef.current = node2;
        _setFloating(node2);
      }
    }, []);
    const referenceEl = externalReference || _reference;
    const floatingEl = externalFloating || _floating;
    const referenceRef = A$1(null);
    const floatingRef = A$1(null);
    const dataRef = A$1(data);
    const hasWhileElementsMounted = whileElementsMounted != null;
    const whileElementsMountedRef = useLatestRef(whileElementsMounted);
    const platformRef = useLatestRef(platform2);
    const openRef = useLatestRef(open);
    const update = q$1(() => {
      if (!referenceRef.current || !floatingRef.current) {
        return;
      }
      const config = {
        placement,
        strategy,
        middleware: latestMiddleware
      };
      if (platformRef.current) {
        config.platform = platformRef.current;
      }
      computePosition(referenceRef.current, floatingRef.current, config).then((data2) => {
        const fullData = {
          ...data2,



isPositioned: openRef.current !== false
        };
        if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
          dataRef.current = fullData;
          En(() => {
            setData(fullData);
          });
        }
      });
    }, [latestMiddleware, placement, strategy, platformRef, openRef]);
    index(() => {
      if (open === false && dataRef.current.isPositioned) {
        dataRef.current.isPositioned = false;
        setData((data2) => ({
          ...data2,
          isPositioned: false
        }));
      }
    }, [open]);
    const isMountedRef = A$1(false);
    index(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
      };
    }, []);
    index(() => {
      if (referenceEl) referenceRef.current = referenceEl;
      if (floatingEl) floatingRef.current = floatingEl;
      if (referenceEl && floatingEl) {
        if (whileElementsMountedRef.current) {
          return whileElementsMountedRef.current(referenceEl, floatingEl, update);
        }
        update();
      }
    }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
    const refs = T$1(() => ({
      reference: referenceRef,
      floating: floatingRef,
      setReference,
      setFloating
    }), [setReference, setFloating]);
    const elements = T$1(() => ({
      reference: referenceEl,
      floating: floatingEl
    }), [referenceEl, floatingEl]);
    const floatingStyles = T$1(() => {
      const initialStyles = {
        position: strategy,
        left: 0,
        top: 0
      };
      if (!elements.floating) {
        return initialStyles;
      }
      const x2 = roundByDPR(elements.floating, data.x);
      const y2 = roundByDPR(elements.floating, data.y);
      if (transform) {
        return {
          ...initialStyles,
          transform: "translate(" + x2 + "px, " + y2 + "px)",
          ...getDPR(elements.floating) >= 1.5 && {
            willChange: "transform"
          }
        };
      }
      return {
        position: strategy,
        left: x2,
        top: y2
      };
    }, [strategy, transform, elements.floating, data.x, data.y]);
    return T$1(() => ({
      ...data,
      update,
      refs,
      elements,
      floatingStyles
    }), [data, update, refs, elements, floatingStyles]);
  }
  const arrow$1 = (options) => {
    function isRef(value) {
      return {}.hasOwnProperty.call(value, "current");
    }
    return {
      name: "arrow",
      options,
      fn(state) {
        const {
          element: element2,
          padding
        } = typeof options === "function" ? options(state) : options;
        if (element2 && isRef(element2)) {
          if (element2.current != null) {
            return arrow$2({
              element: element2.current,
              padding
            }).fn(state);
          }
          return {};
        }
        if (element2) {
          return arrow$2({
            element: element2,
            padding
          }).fn(state);
        }
        return {};
      }
    };
  };
  const offset = (options, deps) => ({
    ...offset$1(options),
    options: [options, deps]
  });
  const shift = (options, deps) => ({
    ...shift$1(options),
    options: [options, deps]
  });
  const limitShift = (options, deps) => ({
    ...limitShift$1(options),
    options: [options, deps]
  });
  const flip = (options, deps) => ({
    ...flip$1(options),
    options: [options, deps]
  });
  const size = (options, deps) => ({
    ...size$1(options),
    options: [options, deps]
  });
  const hide = (options, deps) => ({
    ...hide$1(options),
    options: [options, deps]
  });
  const arrow = (options, deps) => ({
    ...arrow$1(options),
    options: [options, deps]
  });
  var NAME = "Arrow";
  var Arrow$1 = D((props, forwardedRef) => {
    const { children, width = 10, height = 5, ...arrowProps } = props;
    return u$1(
      Primitive.svg,
      {
        ...arrowProps,
        ref: forwardedRef,
        width,
        height,
        viewBox: "0 0 30 10",
        preserveAspectRatio: "none",
        children: props.asChild ? children : u$1("polygon", { points: "0,0 30,0 15,10" })
      }
    );
  });
  Arrow$1.displayName = NAME;
  var Root = Arrow$1;
  function useSize(element2) {
    const [size2, setSize] = d(void 0);
    useLayoutEffect2(() => {
      if (element2) {
        setSize({ width: element2.offsetWidth, height: element2.offsetHeight });
        const resizeObserver = new ResizeObserver((entries) => {
          if (!Array.isArray(entries)) {
            return;
          }
          if (!entries.length) {
            return;
          }
          const entry = entries[0];
          let width;
          let height;
          if ("borderBoxSize" in entry) {
            const borderSizeEntry = entry["borderBoxSize"];
            const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
            width = borderSize["inlineSize"];
            height = borderSize["blockSize"];
          } else {
            width = element2.offsetWidth;
            height = element2.offsetHeight;
          }
          setSize({ width, height });
        });
        resizeObserver.observe(element2, { box: "border-box" });
        return () => resizeObserver.unobserve(element2);
      } else {
        setSize(void 0);
      }
    }, [element2]);
    return size2;
  }
  var POPPER_NAME = "Popper";
  var [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME);
  var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
  var Popper = (props) => {
    const { __scopePopper, children } = props;
    const [anchor, setAnchor] = d(null);
    return u$1(PopperProvider, { scope: __scopePopper, anchor, onAnchorChange: setAnchor, children });
  };
  Popper.displayName = POPPER_NAME;
  var ANCHOR_NAME = "PopperAnchor";
  var PopperAnchor = D(
    (props, forwardedRef) => {
      const { __scopePopper, virtualRef, ...anchorProps } = props;
      const context = usePopperContext(ANCHOR_NAME, __scopePopper);
      const ref = A$1(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const anchorRef = A$1(null);
      y(() => {
        const previousAnchor = anchorRef.current;
        anchorRef.current = virtualRef?.current || ref.current;
        if (previousAnchor !== anchorRef.current) {
          context.onAnchorChange(anchorRef.current);
        }
      });
      return virtualRef ? null : u$1(Primitive.div, { ...anchorProps, ref: composedRefs });
    }
  );
  PopperAnchor.displayName = ANCHOR_NAME;
  var CONTENT_NAME$1 = "PopperContent";
  var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME$1);
  var PopperContent = D(
    (props, forwardedRef) => {
      const {
        __scopePopper,
        side = "bottom",
        sideOffset = 0,
        align = "center",
        alignOffset = 0,
        arrowPadding = 0,
        avoidCollisions = true,
        collisionBoundary = [],
        collisionPadding: collisionPaddingProp = 0,
        sticky = "partial",
        hideWhenDetached = false,
        updatePositionStrategy = "optimized",
        onPlaced,
        ...contentProps
      } = props;
      const context = usePopperContext(CONTENT_NAME$1, __scopePopper);
      const [content2, setContent] = d(null);
      const composedRefs = useComposedRefs(forwardedRef, (node2) => setContent(node2));
      const [arrow$12, setArrow] = d(null);
      const arrowSize = useSize(arrow$12);
      const arrowWidth = arrowSize?.width ?? 0;
      const arrowHeight = arrowSize?.height ?? 0;
      const desiredPlacement = side + (align !== "center" ? "-" + align : "");
      const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp };
      const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
      const hasExplicitBoundaries = boundary.length > 0;
      const detectOverflowOptions = {
        padding: collisionPadding,
        boundary: boundary.filter(isNotNull),
altBoundary: hasExplicitBoundaries
      };
      const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
strategy: "fixed",
        placement: desiredPlacement,
        whileElementsMounted: (...args) => {
          const cleanup = autoUpdate(...args, {
            animationFrame: updatePositionStrategy === "always"
          });
          return cleanup;
        },
        elements: {
          reference: context.anchor
        },
        middleware: [
          offset({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
          avoidCollisions && shift({
            mainAxis: true,
            crossAxis: false,
            limiter: sticky === "partial" ? limitShift() : void 0,
            ...detectOverflowOptions
          }),
          avoidCollisions && flip({ ...detectOverflowOptions }),
          size({
            ...detectOverflowOptions,
            apply: ({ elements, rects, availableWidth, availableHeight }) => {
              const { width: anchorWidth, height: anchorHeight } = rects.reference;
              const contentStyle = elements.floating.style;
              contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
              contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
              contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
              contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
            }
          }),
          arrow$12 && arrow({ element: arrow$12, padding: arrowPadding }),
          transformOrigin({ arrowWidth, arrowHeight }),
          hideWhenDetached && hide({ strategy: "referenceHidden", ...detectOverflowOptions })
        ]
      });
      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
      const handlePlaced = useCallbackRef$1(onPlaced);
      useLayoutEffect2(() => {
        if (isPositioned) {
          handlePlaced?.();
        }
      }, [isPositioned, handlePlaced]);
      const arrowX = middlewareData.arrow?.x;
      const arrowY = middlewareData.arrow?.y;
      const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
      const [contentZIndex, setContentZIndex] = d();
      useLayoutEffect2(() => {
        if (content2) setContentZIndex(window.getComputedStyle(content2).zIndex);
      }, [content2]);
      return u$1(
        "div",
        {
          ref: refs.setFloating,
          "data-radix-popper-content-wrapper": "",
          style: {
            ...floatingStyles,
            transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
minWidth: "max-content",
            zIndex: contentZIndex,
            ["--radix-popper-transform-origin"]: [
              middlewareData.transformOrigin?.x,
              middlewareData.transformOrigin?.y
            ].join(" "),


...middlewareData.hide?.referenceHidden && {
              visibility: "hidden",
              pointerEvents: "none"
            }
          },
          dir: props.dir,
          children: u$1(
            PopperContentProvider,
            {
              scope: __scopePopper,
              placedSide,
              onArrowChange: setArrow,
              arrowX,
              arrowY,
              shouldHideArrow: cannotCenterArrow,
              children: u$1(
                Primitive.div,
                {
                  "data-side": placedSide,
                  "data-align": placedAlign,
                  ...contentProps,
                  ref: composedRefs,
                  style: {
                    ...contentProps.style,

animation: !isPositioned ? "none" : void 0
                  }
                }
              )
            }
          )
        }
      );
    }
  );
  PopperContent.displayName = CONTENT_NAME$1;
  var ARROW_NAME$1 = "PopperArrow";
  var OPPOSITE_SIDE = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  };
  var PopperArrow = D(function PopperArrow2(props, forwardedRef) {
    const { __scopePopper, ...arrowProps } = props;
    const contentContext = useContentContext(ARROW_NAME$1, __scopePopper);
    const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
    return (



u$1(
        "span",
        {
          ref: contentContext.onArrowChange,
          style: {
            position: "absolute",
            left: contentContext.arrowX,
            top: contentContext.arrowY,
            [baseSide]: 0,
            transformOrigin: {
              top: "",
              right: "0 0",
              bottom: "center 0",
              left: "100% 0"
            }[contentContext.placedSide],
            transform: {
              top: "translateY(100%)",
              right: "translateY(50%) rotate(90deg) translateX(-50%)",
              bottom: `rotate(180deg)`,
              left: "translateY(50%) rotate(-90deg) translateX(50%)"
            }[contentContext.placedSide],
            visibility: contentContext.shouldHideArrow ? "hidden" : void 0
          },
          children: u$1(
            Root,
            {
              ...arrowProps,
              ref: forwardedRef,
              style: {
                ...arrowProps.style,
display: "block"
              }
            }
          )
        }
      )
    );
  });
  PopperArrow.displayName = ARROW_NAME$1;
  function isNotNull(value) {
    return value !== null;
  }
  var transformOrigin = (options) => ({
    name: "transformOrigin",
    options,
    fn(data) {
      const { placement, rects, middlewareData } = data;
      const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
      const isArrowHidden = cannotCenterArrow;
      const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
      const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
      const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
      const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
      const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
      let x2 = "";
      let y2 = "";
      if (placedSide === "bottom") {
        x2 = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y2 = `${-arrowHeight}px`;
      } else if (placedSide === "top") {
        x2 = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y2 = `${rects.floating.height + arrowHeight}px`;
      } else if (placedSide === "right") {
        x2 = `${-arrowHeight}px`;
        y2 = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      } else if (placedSide === "left") {
        x2 = `${rects.floating.width + arrowHeight}px`;
        y2 = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      }
      return { data: { x: x2, y: y2 } };
    }
  });
  function getSideAndAlignFromPlacement(placement) {
    const [side, align = "center"] = placement.split("-");
    return [side, align];
  }
  var Root2$1 = Popper;
  var Anchor = PopperAnchor;
  var Content = PopperContent;
  var Arrow = PopperArrow;
  var originalBodyUserSelect;
  var HOVERCARD_NAME = "HoverCard";
  var [createHoverCardContext] = createContextScope(HOVERCARD_NAME, [
    createPopperScope
  ]);
  var usePopperScope = createPopperScope();
  var [HoverCardProvider, useHoverCardContext] = createHoverCardContext(HOVERCARD_NAME);
  var HoverCard = (props) => {
    const {
      __scopeHoverCard,
      children,
      open: openProp,
      defaultOpen,
      onOpenChange,
      openDelay = 700,
      closeDelay = 300
    } = props;
    const popperScope = usePopperScope(__scopeHoverCard);
    const openTimerRef = A$1(0);
    const closeTimerRef = A$1(0);
    const hasSelectionRef = A$1(false);
    const isPointerDownOnContentRef = A$1(false);
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: HOVERCARD_NAME
    });
    const handleOpen = q$1(() => {
      clearTimeout(closeTimerRef.current);
      openTimerRef.current = window.setTimeout(() => setOpen(true), openDelay);
    }, [openDelay, setOpen]);
    const handleClose = q$1(() => {
      clearTimeout(openTimerRef.current);
      if (!hasSelectionRef.current && !isPointerDownOnContentRef.current) {
        closeTimerRef.current = window.setTimeout(() => setOpen(false), closeDelay);
      }
    }, [closeDelay, setOpen]);
    const handleDismiss = q$1(() => setOpen(false), [setOpen]);
    y(() => {
      return () => {
        clearTimeout(openTimerRef.current);
        clearTimeout(closeTimerRef.current);
      };
    }, []);
    return u$1(
      HoverCardProvider,
      {
        scope: __scopeHoverCard,
        open,
        onOpenChange: setOpen,
        onOpen: handleOpen,
        onClose: handleClose,
        onDismiss: handleDismiss,
        hasSelectionRef,
        isPointerDownOnContentRef,
        children: u$1(Root2$1, { ...popperScope, children })
      }
    );
  };
  HoverCard.displayName = HOVERCARD_NAME;
  var TRIGGER_NAME = "HoverCardTrigger";
  var HoverCardTrigger = D(
    (props, forwardedRef) => {
      const { __scopeHoverCard, ...triggerProps } = props;
      const context = useHoverCardContext(TRIGGER_NAME, __scopeHoverCard);
      const popperScope = usePopperScope(__scopeHoverCard);
      return u$1(Anchor, { asChild: true, ...popperScope, children: u$1(
        Primitive.a,
        {
          "data-state": context.open ? "open" : "closed",
          ...triggerProps,
          ref: forwardedRef,
          onPointerEnter: composeEventHandlers(props.onPointerEnter, excludeTouch(context.onOpen)),
          onPointerLeave: composeEventHandlers(props.onPointerLeave, excludeTouch(context.onClose)),
          onFocus: composeEventHandlers(props.onFocus, context.onOpen),
          onBlur: composeEventHandlers(props.onBlur, context.onClose),
          onTouchStart: composeEventHandlers(props.onTouchStart, (event) => event.preventDefault())
        }
      ) });
    }
  );
  HoverCardTrigger.displayName = TRIGGER_NAME;
  var PORTAL_NAME = "HoverCardPortal";
  var [PortalProvider, usePortalContext] = createHoverCardContext(PORTAL_NAME, {
    forceMount: void 0
  });
  var HoverCardPortal = (props) => {
    const { __scopeHoverCard, forceMount, children, container } = props;
    const context = useHoverCardContext(PORTAL_NAME, __scopeHoverCard);
    return u$1(PortalProvider, { scope: __scopeHoverCard, forceMount, children: u$1(Presence, { present: forceMount || context.open, children: u$1(Portal$2, { asChild: true, container, children }) }) });
  };
  HoverCardPortal.displayName = PORTAL_NAME;
  var CONTENT_NAME = "HoverCardContent";
  var HoverCardContent = D(
    (props, forwardedRef) => {
      const portalContext = usePortalContext(CONTENT_NAME, props.__scopeHoverCard);
      const { forceMount = portalContext.forceMount, ...contentProps } = props;
      const context = useHoverCardContext(CONTENT_NAME, props.__scopeHoverCard);
      return u$1(Presence, { present: forceMount || context.open, children: u$1(
        HoverCardContentImpl,
        {
          "data-state": context.open ? "open" : "closed",
          ...contentProps,
          onPointerEnter: composeEventHandlers(props.onPointerEnter, excludeTouch(context.onOpen)),
          onPointerLeave: composeEventHandlers(props.onPointerLeave, excludeTouch(context.onClose)),
          ref: forwardedRef
        }
      ) });
    }
  );
  HoverCardContent.displayName = CONTENT_NAME;
  var HoverCardContentImpl = D((props, forwardedRef) => {
    const {
      __scopeHoverCard,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      ...contentProps
    } = props;
    const context = useHoverCardContext(CONTENT_NAME, __scopeHoverCard);
    const popperScope = usePopperScope(__scopeHoverCard);
    const ref = A$1(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const [containSelection, setContainSelection] = d(false);
    y(() => {
      if (containSelection) {
        const body2 = document.body;
        originalBodyUserSelect = body2.style.userSelect || body2.style.webkitUserSelect;
        body2.style.userSelect = "none";
        body2.style.webkitUserSelect = "none";
        return () => {
          body2.style.userSelect = originalBodyUserSelect;
          body2.style.webkitUserSelect = originalBodyUserSelect;
        };
      }
    }, [containSelection]);
    y(() => {
      if (ref.current) {
        const handlePointerUp = () => {
          setContainSelection(false);
          context.isPointerDownOnContentRef.current = false;
          setTimeout(() => {
            const hasSelection = document.getSelection()?.toString() !== "";
            if (hasSelection) context.hasSelectionRef.current = true;
          });
        };
        document.addEventListener("pointerup", handlePointerUp);
        return () => {
          document.removeEventListener("pointerup", handlePointerUp);
          context.hasSelectionRef.current = false;
          context.isPointerDownOnContentRef.current = false;
        };
      }
    }, [context.isPointerDownOnContentRef, context.hasSelectionRef]);
    y(() => {
      if (ref.current) {
        const tabbables = getTabbableNodes(ref.current);
        tabbables.forEach((tabbable) => tabbable.setAttribute("tabindex", "-1"));
      }
    });
    return u$1(
      DismissableLayer,
      {
        asChild: true,
        disableOutsidePointerEvents: false,
        onInteractOutside,
        onEscapeKeyDown,
        onPointerDownOutside,
        onFocusOutside: composeEventHandlers(onFocusOutside, (event) => {
          event.preventDefault();
        }),
        onDismiss: context.onDismiss,
        children: u$1(
          Content,
          {
            ...popperScope,
            ...contentProps,
            onPointerDown: composeEventHandlers(contentProps.onPointerDown, (event) => {
              if (event.currentTarget.contains(event.target)) {
                setContainSelection(true);
              }
              context.hasSelectionRef.current = false;
              context.isPointerDownOnContentRef.current = true;
            }),
            ref: composedRefs,
            style: {
              ...contentProps.style,
              userSelect: containSelection ? "text" : void 0,
WebkitUserSelect: containSelection ? "text" : void 0,
...{
                "--radix-hover-card-content-transform-origin": "var(--radix-popper-transform-origin)",
                "--radix-hover-card-content-available-width": "var(--radix-popper-available-width)",
                "--radix-hover-card-content-available-height": "var(--radix-popper-available-height)",
                "--radix-hover-card-trigger-width": "var(--radix-popper-anchor-width)",
                "--radix-hover-card-trigger-height": "var(--radix-popper-anchor-height)"
              }
            }
          }
        )
      }
    );
  });
  var ARROW_NAME = "HoverCardArrow";
  var HoverCardArrow = D(
    (props, forwardedRef) => {
      const { __scopeHoverCard, ...arrowProps } = props;
      const popperScope = usePopperScope(__scopeHoverCard);
      return u$1(Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef });
    }
  );
  HoverCardArrow.displayName = ARROW_NAME;
  function excludeTouch(eventHandler) {
    return (event) => event.pointerType === "touch" ? void 0 : eventHandler();
  }
  function getTabbableNodes(container) {
    const nodes = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (node2) => {
        return node2.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }
  var Root2 = HoverCard;
  var Trigger = HoverCardTrigger;
  var Portal = HoverCardPortal;
  var Content2 = HoverCardContent;
  var Arrow2 = HoverCardArrow;
  var truncate;
  var hasRequiredTruncate;
  function requireTruncate() {
    if (hasRequiredTruncate) return truncate;
    hasRequiredTruncate = 1;
    function isHighSurrogate(codePoint) {
      return codePoint >= 55296 && codePoint <= 56319;
    }
    function isLowSurrogate(codePoint) {
      return codePoint >= 56320 && codePoint <= 57343;
    }
    truncate = function truncate2(getLength, string2, byteLength) {
      if (typeof string2 !== "string") {
        throw new Error("Input must be string");
      }
      var charLength = string2.length;
      var curByteLength = 0;
      var codePoint;
      var segment;
      for (var i2 = 0; i2 < charLength; i2 += 1) {
        codePoint = string2.charCodeAt(i2);
        segment = string2[i2];
        if (isHighSurrogate(codePoint) && isLowSurrogate(string2.charCodeAt(i2 + 1))) {
          i2 += 1;
          segment += string2[i2];
        }
        curByteLength += getLength(segment);
        if (curByteLength === byteLength) {
          return string2.slice(0, i2 + 1);
        } else if (curByteLength > byteLength) {
          return string2.slice(0, i2 - segment.length + 1);
        }
      }
      return string2;
    };
    return truncate;
  }
  var browser$1;
  var hasRequiredBrowser$1;
  function requireBrowser$1() {
    if (hasRequiredBrowser$1) return browser$1;
    hasRequiredBrowser$1 = 1;
    function isHighSurrogate(codePoint) {
      return codePoint >= 55296 && codePoint <= 56319;
    }
    function isLowSurrogate(codePoint) {
      return codePoint >= 56320 && codePoint <= 57343;
    }
    browser$1 = function getByteLength(string2) {
      if (typeof string2 !== "string") {
        throw new Error("Input must be string");
      }
      var charLength = string2.length;
      var byteLength = 0;
      var codePoint = null;
      var prevCodePoint = null;
      for (var i2 = 0; i2 < charLength; i2++) {
        codePoint = string2.charCodeAt(i2);
        if (isLowSurrogate(codePoint)) {
          if (prevCodePoint != null && isHighSurrogate(prevCodePoint)) {
            byteLength += 1;
          } else {
            byteLength += 3;
          }
        } else if (codePoint <= 127) {
          byteLength += 1;
        } else if (codePoint >= 128 && codePoint <= 2047) {
          byteLength += 2;
        } else if (codePoint >= 2048 && codePoint <= 65535) {
          byteLength += 3;
        }
        prevCodePoint = codePoint;
      }
      return byteLength;
    };
    return browser$1;
  }
  var browser;
  var hasRequiredBrowser;
  function requireBrowser() {
    if (hasRequiredBrowser) return browser;
    hasRequiredBrowser = 1;
    var truncate2 = requireTruncate();
    var getLength = requireBrowser$1();
    browser = truncate2.bind(null, getLength);
    return browser;
  }
  var sanitizeFilename;
  var hasRequiredSanitizeFilename;
  function requireSanitizeFilename() {
    if (hasRequiredSanitizeFilename) return sanitizeFilename;
    hasRequiredSanitizeFilename = 1;
    var truncate2 = requireBrowser();
    var illegalRe = /[\/\?<>\\:\*\|"]/g;
    var controlRe = /[\x00-\x1f\x80-\x9f]/g;
    var reservedRe = /^\.+$/;
    var windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
    var windowsTrailingRe = /[\. ]+$/;
    function sanitize2(input, replacement) {
      if (typeof input !== "string") {
        throw new Error("Input must be string");
      }
      var sanitized = input.replace(illegalRe, replacement).replace(controlRe, replacement).replace(reservedRe, replacement).replace(windowsReservedRe, replacement).replace(windowsTrailingRe, replacement);
      return truncate2(sanitized, 255);
    }
    sanitizeFilename = function(input, options) {
      var replacement = options && options.replacement || "";
      var output = sanitize2(input, replacement);
      if (replacement === "") {
        return output;
      }
      return sanitize2(output, "");
    };
    return sanitizeFilename;
  }
  var sanitizeFilenameExports = requireSanitizeFilename();
  const sanitize = getDefaultExportFromCjs(sanitizeFilenameExports);
  function downloadFile(filename, type, content2) {
    const blob = content2 instanceof Blob ? content2 : new Blob([content2], { type });
    const url = URL.createObjectURL(blob);
    const a2 = document.createElement("a");
    a2.href = url;
    a2.download = filename;
    document.body.appendChild(a2);
    a2.click();
    document.body.removeChild(a2);
  }
  function downloadUrl(filename, url) {
    const a2 = document.createElement("a");
    a2.href = url;
    a2.download = filename;
    document.body.appendChild(a2);
    a2.click();
    document.body.removeChild(a2);
  }
  function getFileNameWithFormat(format, ext, {
    title: title2 = document.title,
chatId = "",


createTime = Math.floor(Date.now() / 1e3),
    updateTime = Math.floor(Date.now() / 1e3)
  } = {}) {
    const _title = sanitize(title2).replace(/\s+/g, "_");
    const _createTime = unixTimestampToISOString(createTime);
    const _updateTime = unixTimestampToISOString(updateTime);
    return format.replace("{title}", _title).replace("{date}", dateStr()).replace("{timestamp}", timestamp()).replace("{chat_id}", chatId).replace("{create_time}", _createTime).replace("{update_time}", _updateTime).concat(`.${ext}`);
  }
  async function exportToHtml(fileNameFormat, metaList) {
    const pageContext = getPageContext();
    if (pageContext.kind === "security-finding" || pageContext.kind === "security-scan") {
      const document2 = await loadCurrentSecurityDocument();
      if (!document2) {
        alert(getSecurityUnsupportedMessage());
        return false;
      }
      const html22 = securityDocumentToHtml(document2, metaList);
      const fileName2 = getFileNameWithFormat(fileNameFormat, "html", getSecurityFileNameOptions(document2));
      downloadFile(fileName2, "text/html", standardizeLineBreaks(html22));
      return true;
    }
    if (pageContext.kind !== "conversation") {
      alert(getSecurityUnsupportedMessage());
      return false;
    }
    if (!checkIfConversationStarted()) {
      alert(instance.t("Please start a conversation first"));
      return false;
    }
    const userAvatar = await getUserAvatar();
    const chatId = await getCurrentChatId();
    const rawConversation = await fetchConversation(chatId, true);
    const conversation = processConversation(rawConversation);
    const html2 = conversationToHtml(conversation, userAvatar, metaList);
    const fileName = getFileNameWithFormat(fileNameFormat, "html", { title: conversation.title, chatId, createTime: conversation.createTime, updateTime: conversation.updateTime });
    downloadFile(fileName, "text/html", standardizeLineBreaks(html2));
    return true;
  }
  async function exportAllToHtml(fileNameFormat, apiConversations, metaList) {
    const userAvatar = await getUserAvatar();
    const zip = new JSZip();
    const filenameMap = new Map();
    const conversations = apiConversations.map((x2) => processConversation(x2));
    conversations.forEach((conversation) => {
      let fileName = getFileNameWithFormat(fileNameFormat, "html", {
        title: conversation.title,
        chatId: conversation.id,
        createTime: conversation.createTime,
        updateTime: conversation.updateTime
      });
      if (filenameMap.has(fileName)) {
        const count2 = filenameMap.get(fileName) ?? 1;
        filenameMap.set(fileName, count2 + 1);
        fileName = `${fileName.slice(0, -5)} (${count2}).html`;
      } else {
        filenameMap.set(fileName, 1);
      }
      const content2 = conversationToHtml(conversation, userAvatar, metaList);
      zip.file(fileName, content2);
    });
    const blob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: {
        level: 9
      }
    });
    downloadFile("chatgpt-export-html.zip", "application/zip", blob);
    return true;
  }
  function resolveDocumentLanguage() {
    if (typeof document !== "object") return "en";
    return document.documentElement.lang || "en";
  }
  function resolveColorScheme() {
    if (typeof document !== "object") return "light";
    return getColorScheme() || "light";
  }
  function conversationToHtml(conversation, avatar, metaList, options) {
    const { id, title: title2, model, modelSlug, createTime, updateTime, conversationNodes } = conversation;
    const enableTimestamp = ScriptStorage.get(KEY_TIMESTAMP_ENABLED) ?? false;
    const timeStampHtml = ScriptStorage.get(KEY_TIMESTAMP_HTML) ?? false;
    const timeStamp24H = ScriptStorage.get(KEY_TIMESTAMP_24H) ?? false;
    const LatexRegex2 = /(\s\$\$.+?\$\$\s|\s\$.+?\$\s|\\\[.+?\\\]|\\\(.+?\\\))|(^\$$[\S\s]+?^\$$)|(^\$\$[\S\s]+?^\$\$\$)/gm;
    const conversationHtml = conversationNodes.map(({ message }) => {
      const exportMessage = resolveExportMessage(message);
      if (!exportMessage?.content) return null;
      if (!shouldIncludeMessageForExport(exportMessage)) return null;
      const author = getExportAuthorLabel(exportMessage);
      const model2 = exportMessage.metadata?.model_slug === "gpt-4" ? "GPT-4" : "GPT-3";
      const authorType = exportMessage.author.role === "user" ? "user" : model2;
      const avatarEl = exportMessage.author.role === "user" ? `<img alt="${author}" />` : '<svg width="41" height="41"><use xlink:href="#chatgpt" /></svg>';
      let postSteps = [];
      if (exportMessage.author.role === "assistant") {
        postSteps.push((input) => transformFootNotes$1(input, exportMessage.metadata));
        postSteps.push((input) => transformContentReferences$1(input, exportMessage.metadata));
        postSteps.push((input) => {
          const matches = input.match(LatexRegex2);
          const isCodeBlock = /```/.test(input);
          if (!isCodeBlock && matches) {
            let index2 = 0;
            input = input.replace(LatexRegex2, () => {
              return `╬${index2++}╬`;
            });
            input = input.replace(/^\\\[(.+)\\\]$/gm, "$$$$$1$$$$").replace(/\\\[/g, "$$").replace(/\\\]/g, "$$").replace(/\\\(/g, "$").replace(/\\\)/g, "$");
          }
          let transformed = toHtml(fromMarkdown(input));
          if (!isCodeBlock && matches) {
            transformed = transformed.replace(/╬(\d+)╬/g, (_2, index2) => {
              return matches[+index2];
            });
          }
          return transformed;
        });
      }
      if (exportMessage.author.role === "user") {
        postSteps = [...postSteps, (input) => `<p class="no-katex">${escapeHtml(input)}</p>`];
      }
      const postProcess = (input) => postSteps.reduce((acc, fn2) => fn2(acc), input);
      const content2 = sanitizeLLMText(transformContent$1(exportMessage.content, exportMessage.metadata, postProcess));
      const timestamp2 = exportMessage.create_time ?? "";
      const showTimestamp = enableTimestamp && timeStampHtml && timestamp2;
      let timestampHtml = "";
      if (showTimestamp) {
        const date2 = new Date(timestamp2 * 1e3);
        const conversationTime = date2.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: !timeStamp24H });
        timestampHtml = `<time class="time" datetime="${date2.toISOString()}" title="${date2.toLocaleString()}">${conversationTime}</time>`;
      }
      return `
<div class="conversation-item">
    <div class="author ${authorType}">
        ${avatarEl}
    </div>
    <div class="conversation-content-wrapper">
        <div class="conversation-content">
            ${content2}
        </div>
    </div>
    ${timestampHtml}
</div>`;
    }).filter(Boolean).join("\n\n");
    const date = dateStr();
    const time = ( new Date()).toISOString();
    const source = `${baseUrl}/c/${id}`;
    const lang = resolveDocumentLanguage();
    const theme = resolveColorScheme();
    const _metaList = metaList?.filter((x2) => !!x2.name).map(({ name, value }) => {
      const val = value.replace("{title}", title2).replace("{date}", date).replace("{timestamp}", timestamp()).replace("{source}", source).replace("{model}", model).replace("{mode_name}", modelSlug).replace("{create_time}", unixTimestampToISOString(createTime)).replace("{update_time}", unixTimestampToISOString(updateTime));
      return [name, val];
    }) ?? [];
    const detailsHtml = _metaList.length > 0 ? `<details>
    <summary>Metadata</summary>
    <div class="metadata_container">
        ${_metaList.map(([key2, value]) => `<div class="metadata_item"><div>${key2}</div><div>${value}</div></div>`).join("\n")}
    </div>
</details>` : "";
    const html2 = templateHtml.replaceAll("{{title}}", title2).replaceAll("{{date}}", date).replaceAll("{{time}}", time).replaceAll("{{source}}", source).replaceAll("{{lang}}", lang).replaceAll("{{theme}}", theme).replaceAll("{{avatar}}", avatar).replaceAll("{{details}}", detailsHtml).replaceAll("{{content}}", conversationHtml);
    return html2;
  }
  function transformFootNotes$1(input, metadata) {
    const footNoteMarkRegex = /【(\d+)†\((.+?)\)】/g;
    return input.replace(footNoteMarkRegex, (match, citeIndex, _evidenceText) => {
      const citation = metadata?.citations?.find((cite) => cite.metadata?.extra?.cited_message_idx === +citeIndex);
      if (citation) return "";
      return match;
    });
  }
  function transformContentReferences$1(input, metadata) {
    const contentRefs = metadata?.content_references;
    if (!contentRefs || contentRefs.length === 0) return input;
    const sortedRefs = [...contentRefs].sort((a2, b2) => (b2.matched_text?.length || 0) - (a2.matched_text?.length || 0));
    let output = normalizeReferenceText(input);
    for (const ref of sortedRefs) {
      if (!ref.matched_text) continue;
      switch (ref.type) {
        case "sources_footnote":
          break;
        case "grouped_webpages": {
          const item = ref.items?.[0];
          if (item) {
            const links = [];
            links.push(`[${item.attribution || item.title}](${item.url})`);
            for (const sw of item.supporting_websites || []) {
              links.push(`[${sw.attribution || sw.title}](${sw.url})`);
            }
            output = replaceReferenceTokens(output, ref.matched_text, `(${links.join(", ")})`);
          } else {
            output = replaceReferenceTokens(output, ref.matched_text, ref.alt || "");
          }
          break;
        }
        default:
          output = replaceReferenceTokens(output, ref.matched_text, ref.alt || "");
      }
    }
    return output;
  }
  function transformContent$1(content2, metadata, postProcess) {
    switch (content2.content_type) {
      case "text":
        return postProcess(stripUiTokens(content2.parts?.join("\n") || ""));
      case "code":
        return `Code:
\`\`\`
${stripUiTokens(content2.text)}
\`\`\``;
      case "execution_output": {
        const images = getExecutionOutputImages(metadata);
        if (images.length > 0) {
          return images.map((image2) => `<img src="${image2.image_url}" height="${image2.height}" width="${image2.width}" />`).join("\n");
        }
        return postProcess(`Result:
\`\`\`
${getExecutionOutputText(content2)}
\`\`\``);
      }
      case "tether_quote":
        return postProcess(`> ${stripUiTokens(content2.title || content2.text || "")}`);
      case "tether_browsing_code":
        return postProcess("");
case "tether_browsing_display": {
        const metadataList = metadata?._cite_metadata?.metadata_list;
        if (Array.isArray(metadataList) && metadataList.length > 0) {
          return postProcess(metadataList.map(({ title: title2, url }) => {
            return `> [${title2}](${url})`;
          }).join("\n"));
        }
        return postProcess("");
      }
      case "multimodal_text": {
        return content2.parts?.map((part) => {
          if (typeof part === "string") return postProcess(stripUiTokens(part));
          if (part.content_type === "image_asset_pointer") return `<img src="${part.asset_pointer}" height="${part.height}" width="${part.width}" />`;
          if (part.content_type === "audio_transcription") return `<div style="font-style: italic; opacity: 0.65;">“${stripUiTokens(part.text)}”</div>`;
          if (part.content_type === "audio_asset_pointer") return null;
          if (part.content_type === "real_time_user_audio_video_asset_pointer") return null;
          return postProcess("[Unsupported multimodal content]");
        }).join("\n") || "";
      }
      default:
        return postProcess(`[Unsupported Content: ${content2.content_type} ]`);
    }
  }
  function escapeHtml(html2) {
    return html2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
  class Effect {
    _sideEffects = [];
    _cleanupFns = [];
    _isDisposed = false;
add(sideEffect) {
      if (this._isDisposed) return;
      this._sideEffects.push(sideEffect);
    }
run() {
      if (this._isDisposed) return;
      this._sideEffects.forEach((fn2) => {
        const cleanupFn = fn2();
        if (cleanupFn) this._cleanupFns.push(cleanupFn);
      });
      this._sideEffects = [];
    }
dispose() {
      if (this._isDisposed) return;
      this._cleanupFns.forEach((fn2) => fn2());
      this._cleanupFns = [];
      this._isDisposed = true;
    }
  }
  const SECURITY_PNG_TARGET_ATTRIBUTE = "data-ce-security-png-target";
  function fnIgnoreElements(el) {
    return typeof el.shadowRoot === "object" && el.shadowRoot !== null;
  }
  function getConversationCaptureTarget() {
    return document.querySelector('#thread div:has(> [data-testid="conversation-turn-1"])');
  }
  function getSecurityDetailPane() {
    const separator = document.querySelector('[role="separator"][aria-label="Resize repository pane"]');
    if (!(separator instanceof HTMLElement)) return null;
    const aside = separator.previousElementSibling;
    const detailPane = separator.nextElementSibling;
    if (!(aside instanceof HTMLElement) || !(detailPane instanceof HTMLElement)) return null;
    if (!aside.style.getPropertyValue("--codex-security-left-pane-width")) {
      return null;
    }
    return detailPane;
  }
  function resolveSecurityTitle(root2) {
    const heading2 = root2.querySelector("h1");
    if (!(heading2 instanceof HTMLElement)) return void 0;
    const title2 = heading2.textContent?.trim();
    return title2 ? title2 : void 0;
  }
  function resolvePngCaptureSpec() {
    const pageContext = getPageContext();
    if (pageContext.kind === "conversation") {
      const thread = getConversationCaptureTarget();
      if (!thread || thread.children.length === 0 || thread.scrollHeight < 50) {
        return null;
      }
      return {
        mode: "conversation",
        element: thread,
        fileNameOptions: {
          chatId: getChatIdFromUrl() || void 0
        }
      };
    }
    if (isSecurityExportPageContext(pageContext)) {
      const detailPane = getSecurityDetailPane();
      if (!detailPane || detailPane.scrollHeight < 50) {
        return null;
      }
      return {
        mode: "security",
        element: detailPane,
        fileNameOptions: {
          title: resolveSecurityTitle(detailPane)
        }
      };
    }
    return null;
  }
  function applyConversationPngEffect(effect, target) {
    const isDarkMode = document.documentElement.classList.contains("dark");
    effect.add(() => {
      const style = document.createElement("style");
      style.textContent = `
            #thread div:has(> [data-testid="conversation-turn-1"]),
            #thread [data-testid^="conversation-turn-"] {
                color: ${isDarkMode ? "#ececec" : "#0d0d0d"};
                background-color: ${isDarkMode ? "#212121" : "#fff"};
            }

            img {
                display: initial !important;
            }

            pre {
                margin-top: 8px !important;
            }

            pre > div > div > span {
                margin-top: -12px;
                padding-bottom: 2px;
            }

            #page-header,
            #thread-bottom-container,
            #thread div:has(> [data-testid="conversation-turn-1"]) > :not([data-testid^="conversation-turn-"]),
            button.absolute,
            .group.absolute > button {
                display: none;
            }

            .group\\/conversation-turn > div > div.absolute,
            #thread pre button {
                visibility: hidden;
            }
        `;
      target.appendChild(style);
      return () => style.remove();
    });
  }
  function applySecurityPngEffect(effect, target) {
    const isDarkMode = document.documentElement.classList.contains("dark");
    effect.add(() => {
      const style = document.createElement("style");
      style.textContent = `
            [${SECURITY_PNG_TARGET_ATTRIBUTE}] {
                color: ${isDarkMode ? "#ececec" : "#0d0d0d"} !important;
                background-color: ${isDarkMode ? "#212121" : "#fff"} !important;
            }

            [${SECURITY_PNG_TARGET_ATTRIBUTE}] button,
            [${SECURITY_PNG_TARGET_ATTRIBUTE}] [role="button"] {
                visibility: hidden !important;
            }

            [${SECURITY_PNG_TARGET_ATTRIBUTE}] img {
                display: initial !important;
            }
        `;
      document.head.appendChild(style);
      return () => style.remove();
    });
    effect.add(() => {
      const previousAttribute = target.getAttribute(SECURITY_PNG_TARGET_ATTRIBUTE);
      const previousOverflow = target.style.overflow;
      const previousOverflowY = target.style.overflowY;
      const previousHeight = target.style.height;
      const previousMaxHeight = target.style.maxHeight;
      target.setAttribute(SECURITY_PNG_TARGET_ATTRIBUTE, "");
      target.style.overflow = "visible";
      target.style.overflowY = "visible";
      target.style.height = "auto";
      target.style.maxHeight = "none";
      return () => {
        if (previousAttribute === null) {
          target.removeAttribute(SECURITY_PNG_TARGET_ATTRIBUTE);
        } else {
          target.setAttribute(SECURITY_PNG_TARGET_ATTRIBUTE, previousAttribute);
        }
        target.style.overflow = previousOverflow;
        target.style.overflowY = previousOverflowY;
        target.style.height = previousHeight;
        target.style.maxHeight = previousMaxHeight;
      };
    });
  }
  async function takeScreenshot(target, width, height, additionalScale = 1, currentPass = 1) {
    const passLimit = 10;
    const ratio = window.devicePixelRatio || 1;
    const scale = ratio * 2 * additionalScale;
    let canvas = null;
    try {
      canvas = await html2canvas(target, {
        scale,
        useCORS: true,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: width,
        windowHeight: height,
        ignoreElements: fnIgnoreElements
      });
    } catch (error) {
      console.log(`ChatGPT Exporter:takeScreenshot with height=${height} width=${width} scale=${scale}`);
      console.error("Failed to take screenshot", error);
    }
    const context = canvas?.getContext("2d");
    if (context) context.imageSmoothingEnabled = false;
    const dataUrl = canvas?.toDataURL("image/png", 1).replace(/^data:image\/[^;]/, "data:application/octet-stream");
    if (!canvas || !dataUrl || dataUrl === "data:,") {
      if (currentPass > passLimit) return null;
      return takeScreenshot(target, width, height, additionalScale / 1.4, currentPass + 1);
    }
    return dataUrl;
  }
  async function exportToPng(fileNameFormat) {
    const pageContext = getPageContext();
    if (pageContext.kind === "conversation" && !checkIfConversationStarted()) {
      alert(instance.t("Please start a conversation first"));
      return false;
    }
    const captureSpec = resolvePngCaptureSpec();
    if (!captureSpec) {
      alert(pageContext.kind === "conversation" ? instance.t("Failed to export to PNG. Failed to find the element node.") : isSecurityExportPageContext(pageContext) ? instance.t("Failed to export to PNG. Failed to find the element node.") : getSecurityUnsupportedMessage());
      return false;
    }
    const effect = new Effect();
    if (captureSpec.mode === "conversation") {
      applyConversationPngEffect(effect, captureSpec.element);
    } else {
      applySecurityPngEffect(effect, captureSpec.element);
    }
    effect.run();
    await sleep(100);
    const dataUrl = await takeScreenshot(
      captureSpec.element,
      captureSpec.element.scrollWidth,
      captureSpec.element.scrollHeight
    );
    effect.dispose();
    if (!dataUrl) {
      alert("Failed to export to PNG. This might be caused by the size of the conversation. Please try to export a smaller conversation.");
      return false;
    }
    let fileNameOptions = captureSpec.fileNameOptions;
    if (captureSpec.mode === "security") {
      try {
        const securityDocument = await loadCurrentSecurityDocument();
        if (securityDocument) {
          fileNameOptions = {
            ...fileNameOptions,
            ...getSecurityFileNameOptions(securityDocument)
          };
        }
      } catch (error) {
        console.warn("Failed to load security document metadata for PNG filename.", error);
      }
    }
    const fileName = getFileNameWithFormat(fileNameFormat, "png", fileNameOptions);
    downloadUrl(fileName, dataUrl);
    window.URL.revokeObjectURL(dataUrl);
    return true;
  }
  function convertMessageToTavern(node2) {
    if (!node2.message || node2.message.content.content_type !== "text") {
      return null;
    }
    const authorRole = node2.message.author.role;
    const createTime = node2.message.create_time || ( new Date()).getTime() / 1e3;
    const text2 = node2.message.content.parts.join("\n");
    return {
      name: authorRole === "assistant" ? "Assistant" : "You",
      is_user: authorRole === "user",
is_name: authorRole === "assistant",
      send_date: createTime,
      mes: text2,
      swipes: [text2],
      swipe_id: 0
    };
  }
  function convertToTavern(conversation) {
    const messages = [
      {
        user_name: "You",
        character_name: "Assistant"
      },
      ...conversation.conversationNodes.map(convertMessageToTavern).filter(nonNullable)
    ];
    return jsonlStringify(messages);
  }
  function convertToOoba(conversation) {
    const pairs = [];
    const messages = conversation.conversationNodes.filter((node2) => node2.message?.author.role !== "tool" && node2.message?.content.content_type === "text");
    let idx = 0;
    while (idx < messages.length - 1) {
      const message = messages[idx];
      const nextMessage = messages[idx + 1];
      if (!message.message || !nextMessage.message || message.message.content.content_type !== "text" || nextMessage.message.content.content_type !== "text") {
        idx += 1;
        continue;
      }
      const role = message.message.author.role;
      const text2 = message.message.content.parts[0];
      const nextRole = nextMessage.message.author.role;
      const nextText = nextMessage.message.content.parts[0];
      if (role === "system") {
        if (text2 !== "") {
          pairs.push(["<|BEGIN-VISIBLE-CHAT|>", text2]);
        }
        idx += 1;
        continue;
      }
      if (role === "user") {
        if (nextRole === "assistant") {
          pairs.push([text2, nextText]);
          idx += 2;
          continue;
        } else if (nextRole === "user") {
          pairs.push([text2, ""]);
          idx += 1;
          continue;
        }
      }
      if (role === "assistant") {
        pairs.push(["", text2]);
        idx += 1;
      }
    }
    const oobaData = {
      internal: pairs,
      visible: JSON.parse(JSON.stringify(pairs))
    };
    if (oobaData.visible[0] && oobaData.visible[0][0] === "<|BEGIN-VISIBLE-CHAT|>") {
      oobaData.visible[0][0] = "";
    }
    return JSON.stringify(oobaData, null, 2);
  }
  async function exportToJson(fileNameFormat) {
    const pageContext = getPageContext();
    if (pageContext.kind === "security-finding" || pageContext.kind === "security-scan") {
      const document2 = await loadCurrentSecurityDocument();
      if (!document2) {
        alert(getSecurityUnsupportedMessage());
        return false;
      }
      const fileName2 = getFileNameWithFormat(fileNameFormat, "json", getSecurityFileNameOptions(document2));
      downloadFile(fileName2, "application/json", securityDocumentToJson(document2));
      return true;
    }
    if (pageContext.kind !== "conversation") {
      alert(getSecurityUnsupportedMessage());
      return false;
    }
    if (!checkIfConversationStarted()) {
      alert(instance.t("Please start a conversation first"));
      return false;
    }
    const chatId = await getCurrentChatId();
    const rawConversation = await fetchConversation(chatId, false);
    const conversation = processConversation(rawConversation);
    const fileName = getFileNameWithFormat(fileNameFormat, "json", { title: conversation.title, chatId });
    const content2 = conversationToJson([rawConversation]);
    downloadFile(fileName, "application/json", content2);
    return true;
  }
  async function exportToTavern(fileNameFormat) {
    const pageContext = getPageContext();
    if (pageContext.kind !== "conversation") {
      alert(getSecurityUnsupportedMessage());
      return false;
    }
    if (!checkIfConversationStarted()) {
      alert(instance.t("Please start a conversation first"));
      return false;
    }
    const chatId = await getCurrentChatId();
    const rawConversation = await fetchConversation(chatId, false);
    const conversation = processConversation(rawConversation);
    const fileName = getFileNameWithFormat(`${fileNameFormat}.tavern`, "jsonl", { title: conversation.title, chatId });
    const content2 = convertToTavern(conversation);
    downloadFile(fileName, "application/json-lines", content2);
    return true;
  }
  async function exportToOoba(fileNameFormat) {
    const pageContext = getPageContext();
    if (pageContext.kind !== "conversation") {
      alert(getSecurityUnsupportedMessage());
      return false;
    }
    if (!checkIfConversationStarted()) {
      alert(instance.t("Please start a conversation first"));
      return false;
    }
    const chatId = await getCurrentChatId();
    const rawConversation = await fetchConversation(chatId, false);
    const conversation = processConversation(rawConversation);
    const fileName = getFileNameWithFormat(`${fileNameFormat}.ooba`, "json", { title: conversation.title, chatId });
    const content2 = convertToOoba(conversation);
    downloadFile(fileName, "application/json", content2);
    return true;
  }
  async function exportAllToOfficialJson(_fileNameFormat, apiConversations) {
    const content2 = conversationToJson(apiConversations);
    downloadFile("chatgpt-export.json", "application/json", content2);
    return true;
  }
  async function exportAllToJson(fileNameFormat, apiConversations) {
    const zip = new JSZip();
    const filenameMap = new Map();
    const conversations = apiConversations.map((x2) => ({
      conversation: processConversation(x2),
      rawConversation: x2
    }));
    conversations.forEach(({ conversation, rawConversation }) => {
      let fileName = getFileNameWithFormat(fileNameFormat, "json", {
        title: conversation.title,
        chatId: conversation.id,
        createTime: conversation.createTime,
        updateTime: conversation.updateTime
      });
      if (filenameMap.has(fileName)) {
        const count2 = filenameMap.get(fileName) ?? 1;
        filenameMap.set(fileName, count2 + 1);
        fileName = `${fileName.slice(0, -5)} (${count2}).json`;
      } else {
        filenameMap.set(fileName, 1);
      }
      const content2 = conversationToJson(rawConversation);
      zip.file(fileName, content2);
    });
    const blob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: {
        level: 9
      }
    });
    downloadFile("chatgpt-export-json.zip", "application/zip", blob);
    return true;
  }
  function conversationToJson(conversation) {
    return JSON.stringify(conversation);
  }
  async function exportToMarkdown(fileNameFormat, metaList) {
    const pageContext = getPageContext();
    if (pageContext.kind === "security-finding" || pageContext.kind === "security-scan") {
      const document2 = await loadCurrentSecurityDocument();
      if (!document2) {
        alert(getSecurityUnsupportedMessage());
        return false;
      }
      const markdown2 = securityDocumentToMarkdown(document2, metaList);
      const fileName2 = getFileNameWithFormat(fileNameFormat, "md", getSecurityFileNameOptions(document2));
      downloadFile(fileName2, "text/markdown", standardizeLineBreaks(markdown2));
      return true;
    }
    if (pageContext.kind !== "conversation") {
      alert(getSecurityUnsupportedMessage());
      return false;
    }
    if (!checkIfConversationStarted()) {
      alert(instance.t("Please start a conversation first"));
      return false;
    }
    const chatId = await getCurrentChatId();
    const rawConversation = await fetchConversation(chatId, true);
    const conversation = processConversation(rawConversation);
    const markdown = conversationToMarkdown(conversation, metaList);
    const fileName = getFileNameWithFormat(fileNameFormat, "md", { title: conversation.title, chatId, createTime: conversation.createTime, updateTime: conversation.updateTime });
    downloadFile(fileName, "text/markdown", standardizeLineBreaks(markdown));
    return true;
  }
  async function exportAllToMarkdown(fileNameFormat, apiConversations, metaList) {
    const zip = new JSZip();
    const filenameMap = new Map();
    const conversations = apiConversations.map((x2) => processConversation(x2));
    conversations.forEach((conversation) => {
      let fileName = getFileNameWithFormat(fileNameFormat, "md", {
        title: conversation.title,
        chatId: conversation.id,
        createTime: conversation.createTime,
        updateTime: conversation.updateTime
      });
      if (filenameMap.has(fileName)) {
        const count2 = filenameMap.get(fileName) ?? 1;
        filenameMap.set(fileName, count2 + 1);
        fileName = `${fileName.slice(0, -3)} (${count2}).md`;
      } else {
        filenameMap.set(fileName, 1);
      }
      const content2 = conversationToMarkdown(conversation, metaList);
      zip.file(fileName, content2);
    });
    const blob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: {
        level: 9
      }
    });
    downloadFile("chatgpt-export-markdown.zip", "application/zip", blob);
    return true;
  }
  const LatexRegex = /(\s\$\$.+\$\$\s|\s\$.+\$\s|\\\[.+\\\]|\\\(.+\\\))|(^\$$[\S\s]+^\$$)|(^\$\$[\S\s]+^\$\$$)/gm;
  function conversationToMarkdown(conversation, metaList) {
    const { id, title: title2, model, modelSlug, createTime, updateTime, conversationNodes } = conversation;
    const source = `${baseUrl}/c/${id}`;
    const _metaList = metaList?.filter((x2) => !!x2.name).map(({ name, value }) => {
      const val = value.replace("{title}", title2).replace("{date}", dateStr()).replace("{timestamp}", timestamp()).replace("{source}", source).replace("{model}", model).replace("{model_name}", modelSlug).replace("{create_time}", unixTimestampToISOString(createTime)).replace("{update_time}", unixTimestampToISOString(updateTime));
      return `${name}: ${val}`;
    }) ?? [];
    const frontMatter = _metaList.length > 0 ? `---
${_metaList.join("\n")}
---

` : "";
    const enableTimestamp = ScriptStorage.get(KEY_TIMESTAMP_ENABLED) ?? false;
    const timeStampMarkdown = ScriptStorage.get(KEY_TIMESTAMP_MARKDOWN) ?? false;
    const timeStamp24H = ScriptStorage.get(KEY_TIMESTAMP_24H) ?? false;
    const content2 = conversationNodes.map(({ message }) => {
      const exportMessage = resolveExportMessage(message);
      if (!exportMessage?.content) return null;
      if (!shouldIncludeMessageForExport(exportMessage)) return null;
      const timestamp2 = exportMessage.create_time ?? "";
      const showTimestamp = enableTimestamp && timeStampMarkdown && timestamp2;
      let timestampHtml = "";
      if (showTimestamp) {
        const date = new Date(timestamp2 * 1e3);
        const conversationTime = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: !timeStamp24H });
        timestampHtml = `<time datetime="${date.toISOString()}" title="${date.toLocaleString()}">${conversationTime}</time>

`;
      }
      const author = getExportAuthorLabel(exportMessage);
      const postSteps = [];
      if (exportMessage.author.role === "assistant") {
        postSteps.push((input) => transformContentReferences(input, exportMessage.metadata));
        postSteps.push((input) => transformFootNotes(input, exportMessage.metadata));
      }
      if (exportMessage.author.role === "assistant") {
        postSteps.push((input) => {
          input = input.replace(/^\\\[(.+)\\\]$/gm, "$$$$$1$$$$").replace(/\\\[/g, "$").replace(/\\\]/g, "$").replace(/\\\(/g, "$").replace(/\\\)/g, "$");
          const matches = input.match(LatexRegex);
          const isCodeBlock = /```/.test(input);
          if (!isCodeBlock && matches) {
            let index2 = 0;
            input = input.replace(LatexRegex, () => {
              return `╬${index2++}╬`;
            });
          }
          let transformed = toMarkdown(fromMarkdown(input));
          if (!isCodeBlock && matches) {
            transformed = transformed.replace(/╬(\d+)╬/g, (_2, index2) => {
              return matches[+index2];
            });
          }
          return transformed;
        });
      }
      const postProcess = (input) => postSteps.reduce((acc, fn2) => fn2(acc), input);
      const content22 = sanitizeLLMText(transformContent(exportMessage.content, exportMessage.metadata, postProcess));
      return `#### ${author}:
${timestampHtml}${content22}`;
    }).filter(Boolean).join("\n\n");
    const markdown = `${frontMatter}# ${title2}

${content2}`;
    return markdown;
  }
  function transformFootNotes(input, metadata) {
    const footNoteMarkRegex = /【(\d+)†\((.+?)\)】/g;
    const citationList = [];
    const output = input.replace(footNoteMarkRegex, (match, citeIndex, _evidenceText) => {
      const citation = metadata?.citations?.find((cite) => cite.metadata?.extra?.cited_message_idx === +citeIndex);
      if (citation) {
        citationList.push(citation);
        return `[^${citeIndex}]`;
      }
      return match;
    });
    const citationText = citationList.map((citation) => {
      const citeIndex = citation.metadata?.extra?.cited_message_idx ?? 1;
      const citeTitle = citation.metadata?.title ?? "No title";
      return `[^${citeIndex}]: ${citeTitle}`;
    }).join("\n");
    return `${output}

${citationText}`;
  }
  function transformContentReferences(input, metadata) {
    const contentRefs = metadata?.content_references;
    if (!contentRefs || contentRefs.length === 0) return input;
    const sortedRefs = [...contentRefs].sort((a2, b2) => (b2.matched_text?.length || 0) - (a2.matched_text?.length || 0));
    let output = normalizeReferenceText(input);
    for (const ref of sortedRefs) {
      if (!ref.matched_text) continue;
      switch (ref.type) {
        case "sources_footnote":
          break;
        case "grouped_webpages": {
          const item = ref.items?.[0];
          if (item) {
            const links = [];
            links.push(`[${item.attribution || item.title}](${item.url})`);
            for (const sw of item.supporting_websites || []) {
              links.push(`[${sw.attribution || sw.title}](${sw.url})`);
            }
            output = replaceReferenceTokens(output, ref.matched_text, `(${links.join(", ")})`);
          } else {
            output = replaceReferenceTokens(output, ref.matched_text, ref.alt || "");
          }
          break;
        }
        default:
          output = replaceReferenceTokens(output, ref.matched_text, ref.alt || "");
      }
    }
    return output;
  }
  function transformContent(content2, metadata, postProcess) {
    switch (content2.content_type) {
      case "text":
        return postProcess(stripUiTokens(content2.parts?.join("\n") || ""));
      case "code":
        return `Code:
\`\`\`
${stripUiTokens(content2.text)}
\`\`\``;
      case "execution_output": {
        const images = getExecutionOutputImages(metadata);
        if (images.length > 0) {
          return images.map((image2) => `![image](${image2.image_url})`).join("\n");
        }
        return postProcess(`Result:
\`\`\`
${getExecutionOutputText(content2)}
\`\`\``);
      }
      case "tether_quote":
        return postProcess(`> ${stripUiTokens(content2.title || content2.text || "")}`);
      case "tether_browsing_code":
        return postProcess("");
case "tether_browsing_display": {
        const metadataList = metadata?._cite_metadata?.metadata_list;
        if (Array.isArray(metadataList) && metadataList.length > 0) {
          return postProcess(metadataList.map(({ title: title2, url }) => `> [${title2}](${url})`).join("\n"));
        }
        return postProcess("");
      }
      case "multimodal_text": {
        return content2.parts?.map((part) => {
          if (typeof part === "string") return postProcess(stripUiTokens(part));
          if (part.content_type === "image_asset_pointer") return `![image](${part.asset_pointer})`;
          if (part.content_type === "audio_transcription") return `[audio] ${stripUiTokens(part.text)}`;
          if (part.content_type === "audio_asset_pointer") return null;
          if (part.content_type === "real_time_user_audio_video_asset_pointer") return null;
          return postProcess("[Unsupported multimodal content]");
        }).join("\n") || "";
      }
      default:
        return postProcess(`[Unsupported Content: ${content2.content_type}]`);
    }
  }
  function useWindowResize(selector) {
    return C(subscribe, selector);
  }
  function subscribe(callback) {
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
  }
  const EXPORT_DIALOG_CLASS_NAMES = {
    overlay: "ce-dialog-overlay",
    content: "ce-dialog-content",
    title: "ce-dialog-title"
  };
  const Divider = () => u$1("div", { className: "h-px bg-token-border-light" });
  function EventEmitter2(n2) {
    return { all: n2 = n2 || new Map(), on: function(t2, e2) {
      var i2 = n2.get(t2);
      i2 ? i2.push(e2) : n2.set(t2, [e2]);
    }, off: function(t2, e2) {
      var i2 = n2.get(t2);
      i2 && (e2 ? i2.splice(i2.indexOf(e2) >>> 0, 1) : n2.set(t2, []));
    }, emit: function(t2, e2) {
      var i2 = n2.get(t2);
      i2 && i2.slice().map(function(n3) {
        n3(e2);
      }), (i2 = n2.get("*")) && i2.slice().map(function(n3) {
        n3(t2, e2);
      });
    } };
  }
  class RequestQueue {
    constructor(minBackoff, maxBackoff) {
      this.minBackoff = minBackoff;
      this.maxBackoff = maxBackoff;
      this.backoff = minBackoff;
    }
    eventEmitter = EventEmitter2();
    queue = [];
    results = [];
    status = "IDLE";
    backoffMultiplier = 2;
    backoff;
    total = 0;
    completed = 0;
    add(requestObject) {
      this.queue.push(requestObject);
    }
    start() {
      if (this.status === "IDLE") {
        this.total = this.queue.length;
        void this.process();
      }
    }
    stop() {
      this.status = "STOPPED";
      this.eventEmitter.emit("done", this.results);
    }
    clear() {
      this.queue = [];
      this.results = [];
      this.status = "IDLE";
      this.backoff = this.minBackoff;
      this.total = 0;
      this.completed = 0;
    }
    on(event, fn2) {
      this.eventEmitter.on(event, fn2);
      return () => this.eventEmitter.off(event, fn2);
    }
    async process() {
      if (this.status === "STOPPED" || this.status === "COMPLETED") {
        return;
      }
      if (this.queue.length === 0) {
        this.done();
        return;
      }
      this.status = "IN_PROGRESS";
      const requestObject = this.queue.shift();
      const { name, request } = requestObject;
      try {
        this.progress(name, "processing");
        const result = await request();
        this.results.push(result);
        this.completed++;
        this.progress(name, "processing");
        this.backoff = this.minBackoff;
      } catch (error) {
        console.error(`Request ${name} failed:`, error);
        this.progress(name, "retrying");
        this.backoff = Math.min(this.backoff * this.backoffMultiplier, this.maxBackoff);
        this.queue.unshift(requestObject);
      }
      await sleep(this.backoff);
      void this.process();
    }
    progress(name, status) {
      this.eventEmitter.emit("progress", {
        total: this.total,
        completed: this.completed,
        currentName: name,
        currentStatus: status
      });
    }
    done() {
      this.status = "COMPLETED";
      this.eventEmitter.emit("done", this.results);
    }
  }
  const CheckBoxCss = "/**\n * Copyright 2022-Present Pionxzh\n * SPDX-License-Identifier: MIT\n */\n\n.CheckBoxLabel {\n    position: relative;\n    display: flex;\n    font-size: 16px;\n    vertical-align: middle;\n}\n\n.CheckBoxLabel * {\n    cursor: pointer;\n}\n\n.CheckBoxLabel[disabled] {\n    opacity: 0.7;\n}\n\n.CheckBoxLabel[disabled] * {\n    cursor: not-allowed;\n}\n\n.CheckBoxLabel input {\n    position: absolute;\n    opacity: 0;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    margin: 0;\n    padding: 0;\n}\n\n.CheckBoxLabel .IconWrapper {\n    display: inline-flex;\n    align-items: center;\n    position: relative;\n    vertical-align: middle;\n    font-size: 1.5rem;\n}\n\n.CheckBoxLabel input:checked ~ svg {\n    color: rgb(28 100 242);\n}\n\n.dark .CheckBoxLabel input:checked ~ svg {\n    color: rgb(144, 202, 249);\n}\n\n.CheckBoxLabel .LabelText {\n    margin-left: 0.5rem;\n    font-size: 1rem;\n    line-height: 1.5;\n}\n";
  importCSS(CheckBoxCss);
  function FileCode() {
    return u$1("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", className: "w-4 h-4", fill: "currentColor", children: u$1("path", { d: "M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM153 289l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L71 337c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM265 255l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" }) });
  }
  function IconCamera() {
    return u$1("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", className: "w-4 h-4", fill: "currentColor", children: u$1("path", { d: "M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 384c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z" }) });
  }
  function IconMarkdown() {
    return u$1("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512", className: "w-4 h-4", fill: "currentColor", children: u$1("path", { d: "M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5 360.6H277v-120l-61.5 76.9-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9 61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z" }) });
  }
  function IconCopy() {
    return u$1("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", className: "w-4 h-4", fill: "currentColor", children: u$1("path", { d: "M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z" }) });
  }
  function IconArrowRightFromBracket() {
    return u$1("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 576 512", className: "w-4 h-4", fill: "currentColor", children: u$1("path", { d: "M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" }) });
  }
  function IconSetting() {
    return u$1("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 15 15", className: "w-4 h-4", stroke: "currentColor", "stroke-width": "0.5", children: u$1("path", { d: "M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.977 11.7595 12.928 12.0403 12.6473L12.6464 12.0412C12.9271 11.7604 12.9761 11.3227 12.7644 10.9869L12.1902 10.076C12.3768 9.73688 12.5278 9.37515 12.638 8.99596L13.6879 8.75794C14.0751 8.67015 14.35 8.32601 14.35 7.92897V7.07183C14.35 6.6748 14.0751 6.33065 13.6879 6.24287L12.6381 6.00488C12.528 5.62578 12.3771 5.26414 12.1906 4.92507L12.7648 4.01407C12.9766 3.6782 12.9276 3.2405 12.6468 2.95975L12.0407 2.35366C11.76 2.07292 11.3223 2.02392 10.9864 2.23565L10.0755 2.80989C9.73622 2.62328 9.37437 2.47229 8.99505 2.36209L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 3.81251C5.44724 3.44339 6.05665 3.18424 6.71543 3.06839L7.07095 1.50024H7.92809L8.28355 3.06816C8.94267 3.18387 9.5524 3.44302 10.0794 3.81224L11.4397 2.9547L12.0458 3.56079L11.1882 4.92117C11.5573 5.44798 11.8164 6.0575 11.9321 6.71638L13.5 7.07183V7.92897L11.932 8.28444C11.8162 8.94342 11.557 9.55301 11.1878 10.0798L12.0453 11.4402L11.4392 12.0462L10.0787 11.1886C9.55192 11.5576 8.94241 11.8166 8.28355 11.9323L7.92809 13.5002H7.07095L6.71543 11.932C6.0569 11.8162 5.44772 11.5572 4.92116 11.1883L3.56055 12.046L2.95445 11.4399L3.81213 10.0794C3.4431 9.55266 3.18403 8.94326 3.06825 8.2845L1.50002 7.92897V7.07183L3.06818 6.71632C3.18388 6.05765 3.44283 5.44833 3.81171 4.92165L2.95398 3.561L3.56008 2.95491L4.92053 3.81251ZM9.02496 7.50008C9.02496 8.34226 8.34223 9.02499 7.50005 9.02499C6.65786 9.02499 5.97513 8.34226 5.97513 7.50008C5.97513 6.65789 6.65786 5.97516 7.50005 5.97516C8.34223 5.97516 9.02496 6.65789 9.02496 7.50008ZM9.92496 7.50008C9.92496 8.83932 8.83929 9.92499 7.50005 9.92499C6.1608 9.92499 5.07513 8.83932 5.07513 7.50008C5.07513 6.16084 6.1608 5.07516 7.50005 5.07516C8.83929 5.07516 9.92496 6.16084 9.92496 7.50008Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }) });
  }
  function IconCross() {
    return u$1("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 15 15", width: "15", height: "15", children: u$1("path", { d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }) });
  }
  function IconJSON() {
    return u$1("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", className: "w-5 h-5", style: { marginInline: "-2px", marginTop: "2px" }, "stroke-width": "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
u$1("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
u$1("path", { d: "M20 16v-8l3 8v-8" }),
u$1("path", { d: "M15 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2z" }),
u$1("path", { d: "M1 8h3v6.5a1.5 1.5 0 0 1 -3 0v-.5" }),
u$1("path", { d: "M7 15a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1" })
    ] });
  }
  function IconZip() {
    return u$1("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", className: "w-4 h-4", "stroke-width": "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
u$1("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
u$1("path", { d: "M6 20.735a2 2 0 0 1 -1 -1.735v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-1" }),
u$1("path", { d: "M11 17a2 2 0 0 1 2 2v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2a2 2 0 0 1 2 -2z" }),
u$1("path", { d: "M11 5l-1 0" }),
u$1("path", { d: "M13 7l-1 0" }),
u$1("path", { d: "M11 9l-1 0" }),
u$1("path", { d: "M13 11l-1 0" }),
u$1("path", { d: "M11 13l-1 0" }),
u$1("path", { d: "M13 15l-1 0" })
    ] });
  }
  function IconLoading({ className, style }) {
    return u$1("span", { style: { animation: "1.4s linear 0s infinite normal none running rotate" }, children: u$1(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "22 22 44 44",
        className,
        style: { animation: "1.4s ease-in-out 0s infinite normal none running circularDash", ...style },
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        children: u$1(
          "circle",
          {
            cx: "44",
            cy: "44",
            r: "20.2",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "3.6"
          }
        )
      }
    ) });
  }
  function IconCheckBox() {
    return u$1("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", style: { width: "1em", height: "1em", display: "inline-block" }, fill: "currentColor", children: u$1("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" }) });
  }
  function IconCheckBoxChecked({ className }) {
    return u$1("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", className, style: { width: "1em", height: "1em", display: "inline-block" }, fill: "currentColor", children: u$1("path", { d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) });
  }
  function IconUpload({ className, style }) {
    return u$1("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", className, style, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
u$1("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
u$1("path", { stroke: "currentColor", d: "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" }),
u$1("path", { stroke: "currentColor", d: "M7 9l5 -5l5 5" }),
u$1("path", { stroke: "currentColor", d: "M12 4l0 12" })
    ] });
  }
  const CheckBox = ({
    className,
    checked = false,
    disabled,
    label,
    onCheckedChange
  }) => {
    const [isChecked, setChecked] = d(checked);
    const onChange = (e2) => {
      const newValue = e2.currentTarget.checked;
      setChecked(newValue);
      onCheckedChange?.(newValue);
    };
    y(() => {
      setChecked(checked);
    }, [checked]);
    return u$1("label", { className: `CheckBoxLabel ${className ?? ""}`, "aria-disabled": disabled, children: [
u$1("span", { className: "IconWrapper", children: [
u$1(
          "input",
          {
            type: "checkbox",
            checked: isChecked,
            onChange,
            disabled
          }
        ),
        isChecked ? u$1(IconCheckBoxChecked, {}) : u$1(IconCheckBox, {})
      ] }),
u$1("span", { className: "LabelText", children: label })
    ] });
  };
  function isObject(value) {
    return typeof value === "object" && value !== null;
  }
  function isApiConversationWithId(value) {
    if (!isObject(value)) return false;
    return typeof value.id === "string" && typeof value.title === "string" && typeof value.current_node === "string" && typeof value.create_time === "number" && typeof value.update_time === "number" && typeof value.is_archived === "boolean" && isObject(value.mapping);
  }
  function parseLocalConversationsFromUpload(rawContent) {
    let parsed;
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      return null;
    }
    if (!Array.isArray(parsed)) return null;
    if (!parsed.every(isApiConversationWithId)) return null;
    return parsed;
  }
  const defaultContextValue = {
    ...DEFAULT_EXPORTER_SETTINGS,
    exportMetaList: [...DEFAULT_EXPORT_META_LIST],
    setFormat: () => {
    },
    setEnableTimestamp: () => {
    },
    setTimeStamp24H: () => {
    },
    setEnableTimestampHTML: () => {
    },
    setEnableTimestampMarkdown: () => {
    },
    setEnableMeta: () => {
    },
    setExportMetaList: () => {
    },
    setExportAllLimit: () => {
    },
    resetDefault: () => {
    }
  };
  const SettingContext = R$1(defaultContextValue);
  const SettingProvider = ({ children }) => {
    const [settings, setSettings] = d(() => getSettings());
    y(() => {
      const unsubscribe = subscribeSettings((nextSettings) => {
        setSettings(nextSettings);
      });
      return () => {
        unsubscribe();
      };
    }, []);
    y(() => {
      applyTimestampFormatPreference(settings);
    }, [settings]);
    const setFormat = q$1((value) => {
      saveSettings({ format: value });
    }, []);
    const setEnableTimestamp = q$1((value) => {
      saveSettings({ enableTimestamp: value });
    }, []);
    const setTimeStamp24H = q$1((value) => {
      saveSettings({ timeStamp24H: value });
    }, []);
    const setEnableTimestampHTML = q$1((value) => {
      saveSettings({ enableTimestampHTML: value });
    }, []);
    const setEnableTimestampMarkdown = q$1((value) => {
      saveSettings({ enableTimestampMarkdown: value });
    }, []);
    const setEnableMeta = q$1((value) => {
      saveSettings({ enableMeta: value });
    }, []);
    const setExportMetaList = q$1((value) => {
      saveSettings({ exportMetaList: value });
    }, []);
    const setExportAllLimit = q$1((value) => {
      saveSettings({ exportAllLimit: value });
    }, []);
    const resetDefault = q$1(() => {
      resetSettings();
    }, []);
    const contextValue = T$1(() => ({
      ...settings,
      setFormat,
      setEnableTimestamp,
      setTimeStamp24H,
      setEnableTimestampHTML,
      setEnableTimestampMarkdown,
      setEnableMeta,
      setExportMetaList,
      setExportAllLimit,
      resetDefault
    }), [
      settings,
      setFormat,
      setEnableTimestamp,
      setTimeStamp24H,
      setEnableTimestampHTML,
      setEnableTimestampMarkdown,
      setEnableMeta,
      setExportMetaList,
      setExportAllLimit,
      resetDefault
    ]);
    return u$1(SettingContext.Provider, { value: contextValue, children });
  };
  const useSettingContext = () => x$1(SettingContext);
  const ProjectSelect = ({ projects, selected, setSelected, disabled }) => {
    const { t: t2 } = useTranslation();
    return u$1("div", { className: "flex items-center text-gray-600 dark:text-gray-300 flex justify-between mb-3", children: [
      t2("Select Project"),
u$1(
        "select",
        {
          disabled,
          className: "Select",
          value: selected?.id || "",
          onChange: (e2) => {
            const projectId = e2.currentTarget.value;
            const project = projects.find((p2) => p2.id === projectId);
            setSelected(project || null);
          },
          children: [
u$1("option", { value: "", children: t2("(no project)") }),
            projects.map((project) => u$1("option", { value: project.id, children: project.display.name }, project.id))
          ]
        }
      )
    ] });
  };
  const ConversationSelect = ({
    conversations,
    selected,
    setSelected,
    disabled,
    loading,
    error
  }) => {
    const { t: t2 } = useTranslation();
    return u$1(k$2, { children: [
u$1("div", { className: "SelectToolbar", children: u$1(
        CheckBox,
        {
          label: t2("Select All"),
          disabled,
          checked: selected.length === conversations.length,
          onCheckedChange: (checked) => {
            setSelected(checked ? conversations : []);
          }
        }
      ) }),
u$1("ul", { className: "SelectList", children: [
        loading && u$1("li", { className: "SelectItem", children: [
          t2("Loading"),
          "..."
        ] }),
        error && u$1("li", { className: "SelectItem", children: [
          t2("Error"),
          ": ",
          error
        ] }),
        !loading && !error && conversations.map((c2) => u$1("li", { className: "SelectItem", children: u$1(
          CheckBox,
          {
            label: c2.title,
            disabled,
            checked: selected.some((x2) => x2.id === c2.id),
            onCheckedChange: (checked) => {
              setSelected(
                checked ? [...selected, c2] : selected.filter((x2) => x2.id !== c2.id)
              );
            }
          }
        ) }, c2.id))
      ] })
    ] });
  };
  const DialogContent = ({ format }) => {
    const { t: t2 } = useTranslation();
    const { enableMeta, exportMetaList, exportAllLimit } = useSettingContext();
    const metaList = T$1(() => enableMeta ? exportMetaList : [], [enableMeta, exportMetaList]);
    const exportAllOptions = T$1(() => [
      { label: "Markdown", callback: exportAllToMarkdown },
      { label: "HTML", callback: exportAllToHtml },
      { label: "JSON", callback: exportAllToOfficialJson },
      { label: "JSON (ZIP)", callback: exportAllToJson }
    ], []);
    const fileInputRef = A$1(null);
    const [exportSource, setExportSource] = d("API");
    const [apiConversations, setApiConversations] = d([]);
    const [localConversations, setLocalConversations] = d([]);
    const conversations = exportSource === "API" ? apiConversations : localConversations;
    const [projects, setProjects] = d([]);
    const [loading, setLoading] = d(false);
    const [error, setError] = d("");
    const [processing, setProcessing] = d(false);
    const [selectedProject, setSelectedProject] = d(null);
    const [selected, setSelected] = d([]);
    const [exportType, setExportType] = d(exportAllOptions[0].label);
    const disabled = loading || processing || !!error || selected.length === 0;
    const requestQueue = T$1(() => new RequestQueue(200, 1600), []);
    const archiveQueue = T$1(() => new RequestQueue(200, 1600), []);
    const deleteQueue = T$1(() => new RequestQueue(200, 1600), []);
    const [progress, setProgress] = d({
      total: 0,
      completed: 0,
      currentName: "",
      currentStatus: ""
    });
    const onUpload = q$1((e2) => {
      const target = e2.target;
      const file = target?.files?.[0];
      if (!file) return;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const fileContent = typeof fileReader.result === "string" ? fileReader.result : "";
        const data = parseLocalConversationsFromUpload(fileContent);
        if (!data) {
          alert(t2("Invalid File Format"));
          if (target) target.value = "";
          return;
        }
        setSelected([]);
        setExportSource("Local");
        setLocalConversations(data);
        if (target) target.value = "";
      };
      fileReader.onerror = () => {
        alert(t2("Invalid File Format"));
        if (target) target.value = "";
      };
      fileReader.readAsText(file);
    }, [t2, setExportSource, setLocalConversations]);
    y(() => {
      const off = requestQueue.on("progress", (progress2) => {
        setProcessing(true);
        setProgress(progress2);
      });
      return () => off();
    }, [requestQueue]);
    y(() => {
      const off = archiveQueue.on("progress", (progress2) => {
        setProcessing(true);
        setProgress(progress2);
      });
      return () => off();
    }, [archiveQueue]);
    y(() => {
      const off = deleteQueue.on("progress", (progress2) => {
        setProcessing(true);
        setProgress(progress2);
      });
      return () => off();
    }, [deleteQueue]);
    y(() => {
      const off = requestQueue.on("done", (results) => {
        setProcessing(false);
        const callback = exportAllOptions.find((o2) => o2.label === exportType)?.callback;
        if (callback) void callback(format, results, metaList);
      });
      return () => off();
    }, [requestQueue, exportAllOptions, exportType, format, metaList]);
    y(() => {
      const off = archiveQueue.on("done", () => {
        setProcessing(false);
        setApiConversations(apiConversations.filter((c2) => !selected.some((s2) => s2.id === c2.id)));
        setSelected([]);
        alert(t2("Conversation Archived Message"));
      });
      return () => off();
    }, [archiveQueue, apiConversations, selected, t2]);
    y(() => {
      const off = deleteQueue.on("done", () => {
        setProcessing(false);
        setApiConversations(apiConversations.filter((c2) => !selected.some((s2) => s2.id === c2.id)));
        setSelected([]);
        alert(t2("Conversation Deleted Message"));
      });
      return () => off();
    }, [deleteQueue, apiConversations, selected, t2]);
    const exportAllFromApi = q$1(() => {
      if (disabled) return;
      requestQueue.clear();
      selected.forEach(({ id, title: title2 }) => {
        requestQueue.add({
          name: title2,
          request: () => fetchConversation(id, exportType !== "JSON")
        });
      });
      requestQueue.start();
    }, [disabled, selected, requestQueue, exportType]);
    const exportAllFromLocal = q$1(() => {
      if (disabled) return;
      const results = localConversations.filter((c2) => selected.some((s2) => s2.id === c2.id));
      const callback = exportAllOptions.find((o2) => o2.label === exportType)?.callback;
      if (callback) void callback(format, results, metaList);
    }, [
      disabled,
      selected,
      localConversations,
      exportAllOptions,
      exportType,
      format,
      metaList
    ]);
    const exportAll = T$1(() => {
      return exportSource === "API" ? exportAllFromApi : exportAllFromLocal;
    }, [exportSource, exportAllFromApi, exportAllFromLocal]);
    const deleteAll = q$1(() => {
      if (disabled) return;
      const result = confirm(t2("Conversation Delete Alert"));
      if (!result) return;
      deleteQueue.clear();
      selected.forEach(({ id, title: title2 }) => {
        deleteQueue.add({
          name: title2,
          request: () => deleteConversation(id)
        });
      });
      deleteQueue.start();
    }, [disabled, selected, deleteQueue, t2]);
    const archiveAll = q$1(() => {
      if (disabled) return;
      const result = confirm(t2("Conversation Archive Alert"));
      if (!result) return;
      archiveQueue.clear();
      selected.forEach(({ id, title: title2 }) => {
        archiveQueue.add({
          name: title2,
          request: () => archiveConversation(id)
        });
      });
      archiveQueue.start();
    }, [disabled, selected, archiveQueue, t2]);
    y(() => {
      fetchProjects().then(setProjects).catch((err) => setError(err.toString()));
    }, []);
    y(() => {
      setLoading(true);
      fetchAllConversations(selectedProject?.id, exportAllLimit).then(setApiConversations).catch((err) => {
        console.error("Error fetching conversations:", err);
        setError(err.message || "Failed to load conversations");
      }).finally(() => setLoading(false));
    }, [selectedProject, exportAllLimit]);
    return u$1(k$2, { children: [
u$1(Title, { className: EXPORT_DIALOG_CLASS_NAMES.title, children: t2("Export Dialog Title") }),
u$1("div", { className: "flex items-center text-gray-600 dark:text-gray-300 flex justify-between border-b-[1px] pb-3 mb-3 dark:border-gray-700", children: [
        t2("Export from official export file"),
        " (conversations.json) ",
        exportSource === "API" && u$1("button", { className: "btn relative btn-neutral", onClick: () => fileInputRef.current?.click(), children: u$1(IconUpload, { className: "w-4 h-4" }) })
      ] }),
u$1(
        "input",
        {
          type: "file",
          accept: "application/json",
          className: "hidden",
          ref: fileInputRef,
          onChange: onUpload
        }
      ),
      exportSource === "API" && u$1("div", { className: "flex items-center text-gray-600 dark:text-gray-300 flex justify-between mb-3", children: t2("Export from API") }),
u$1(ProjectSelect, { projects, selected: selectedProject, setSelected: setSelectedProject, disabled: processing || loading }),
u$1(
        ConversationSelect,
        {
          conversations,
          selected,
          setSelected,
          disabled: processing,
          loading,
          error
        }
      ),
u$1("div", { className: "flex mt-6", style: { justifyContent: "space-between" }, children: [
u$1("select", { className: "Select", disabled: processing, value: exportType, onChange: (e2) => setExportType(e2.currentTarget.value), children: exportAllOptions.map(({ label }) => u$1("option", { value: label, children: label }, t2(label))) }),
u$1("div", { className: "flex flex-grow" }),
u$1("button", { className: "Button red", disabled: disabled || exportSource === "Local", onClick: archiveAll, children: t2("Archive") }),
u$1("button", { className: "Button red ml-4", disabled: disabled || exportSource === "Local", onClick: deleteAll, children: t2("Delete") }),
u$1("button", { className: "Button green ml-4", disabled, onClick: exportAll, children: t2("Export") })
      ] }),
      processing && u$1(k$2, { children: [
u$1("div", { className: "mt-2 mb-1 justify-between flex", children: [
u$1("span", { className: "truncate mr-8", children: progress.currentName }),
u$1("span", { children: `${progress.completed}/${progress.total}` })
        ] }),
u$1("div", { className: "w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700", children: u$1("div", { className: "bg-blue-600 h-2.5 rounded-full", style: { width: `${progress.completed / progress.total * 100}%` } }) })
      ] }),
u$1(Close, { asChild: true, children: u$1("button", { className: "IconButton CloseButton", "aria-label": "Close", children: u$1(IconCross, {}) }) })
    ] });
  };
  const ExportDialog = ({ format, open, onOpenChange, children }) => {
    return u$1(
      Root$1,
      {
        open,
        onOpenChange,
        children: [
u$1(Trigger$1, { asChild: true, children }),
u$1(Portal$1, { children: [
u$1(Overlay, { className: EXPORT_DIALOG_CLASS_NAMES.overlay }),
u$1(Content$1, { className: EXPORT_DIALOG_CLASS_NAMES.content, children: open && u$1(DialogContent, { format }) })
          ] })
        ]
      }
    );
  };
  const TOUCH_CLICK_DEDUP_WINDOW_MS = 700;
  function shouldSuppressClickAfterTouch(lastTouchTimestampMs, nowMs) {
    if (!lastTouchTimestampMs || lastTouchTimestampMs <= 0) return false;
    const elapsedMs = nowMs - lastTouchTimestampMs;
    if (elapsedMs < 0) return false;
    return elapsedMs <= TOUCH_CLICK_DEDUP_WINDOW_MS;
  }
  const TIMEOUT = 2500;
  const MenuItem = ({ text: text2, successText, disabled = false, title: title2, icon: Icon, onClick, className }) => {
    const [loading, setLoading] = d(false);
    const [succeed, setSucceed] = d(false);
    const lastTouchTimestampMsRef = A$1(null);
    const handleClickAsync = async (e2) => {
      e2.preventDefault();
      if (loading || disabled) return;
      if (!onClick) return;
      try {
        setLoading(true);
        const result = await onClick();
        if (result) {
          setSucceed(true);
          setTimeout(() => setSucceed(false), TIMEOUT);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    const handleClick = typeof onClick === "function" ? (e2) => {
      if (shouldSuppressClickAfterTouch(lastTouchTimestampMsRef.current, Date.now())) {
        return;
      }
      void handleClickAsync(e2);
    } : void 0;
    const handleTouchStart = typeof onClick === "function" ? (e2) => {
      lastTouchTimestampMsRef.current = Date.now();
      void handleClickAsync(e2);
    } : void 0;
    return u$1(
      "div",
      {
        className: `
            ce-menu-item
            flex flex-shrink-0 py-3 px-3 items-center gap-3 rounded-lg mb-2
            ce-bg-menu
            transition-colors duration-200
            ce-text-menu text-sm
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            border ce-border-menu ${className}`,
        onClick: handleClick,
        onTouchStart: handleTouchStart,
        "aria-disabled": disabled,
        title: title2,
        children: loading ? u$1("div", { className: "flex justify-center items-center w-full h-full", children: u$1(IconLoading, { className: "w-4 h-4" }) }) : u$1(k$2, { children: [
          Icon && u$1(Icon, {}),
          succeed && successText ? successText : text2
        ] })
      }
    );
  };
  const styleCss = '/**\n * Copyright 2022-Present Pionxzh\n * Copyright 2026 Asim Ihsan\n * SPDX-License-Identifier: MPL-2.0 AND MIT\n */\n\nspan[data-time-format] {\n    display: none;\n}\n\nbody[data-time-format="12"] span[data-time-format="12"] {\n    display: inline;\n}\n\nbody[data-time-format="24"] span[data-time-format="24"] {\n    display: inline;\n}\n\n.Select {\n    padding: 0 0 0 0.5rem;\n    width: 7.5rem;\n    border-radius: 4px;\n    box-shadow: 0 0 0 1px #6f6e77;\n}\n\n.dark .Select {\n    background-color: #2f2f2f;\n    color: #fff;\n    box-shadow: 0 0 0 1px #6f6e77;\n}\n\nhtml {\n    --ce-text-primary: var(--text-primary, #0d0d0d);\n    --ce-menu-primary: #f7f7f8;\n    --ce-menu-secondary: #ececf1;\n    --ce-border-light: rgba(0, 0, 0, .14);\n}\n\n.dark {\n    --ce-text-primary: var(--text-primary, #ececec);\n    --ce-menu-primary: #202123;\n    --ce-menu-secondary: #2d2f34;\n    --ce-border-light: rgba(255, 255, 255, .16);\n}\n\n.ce-text-menu {\n    color: var(--ce-text-primary);\n}\n\n.ce-bg-menu {\n    background-color: var(--ce-menu-primary);\n}\n\n.ce-border-menu {\n    border-color: var(--ce-border-light);\n}\n\n.ce-menu-content,\n.ce-menu-content[data-state="open"],\n.ce-menu-content[data-state="closed"] {\n    display: flex !important;\n    flex-direction: column !important;\n    padding: 0.5rem 0.5rem 0.25rem !important;\n    opacity: 1 !important;\n    background-color: var(--ce-menu-primary) !important;\n    border-width: 1px !important;\n    border-style: solid !important;\n    border-radius: 0.375rem !important;\n    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18) !important;\n    backdrop-filter: none !important;\n    filter: none !important;\n    mix-blend-mode: normal !important;\n    isolation: isolate !important;\n}\n\n.ce-menu-item {\n    height: 46px;\n    width: 100%;\n    background-color: var(--ce-menu-primary) !important;\n    color: var(--ce-text-primary) !important;\n    border-width: 1px !important;\n    border-style: solid !important;\n}\n\n.ce-menu-item[aria-disabled="false"]:hover {\n    background-color: var(--ce-menu-secondary) !important;\n}\n\n.ce-menu-trigger-success {\n    background-color: color-mix(in srgb, var(--ce-menu-secondary) 82%, #1f9f54 18%) !important;\n    border-color: color-mix(in srgb, var(--ce-border-light) 50%, #1f9f54 50%) !important;\n}\n\n.ce-menu-item[aria-disabled="true"] {\n    filter: brightness(0.5);\n}\n\n.inputFieldSet {\n    display: block;\n    border-width: 2px;\n    border-style: groove;\n}\n\n.inputFieldSet legend {\n    margin-left: 4px;\n}\n\n.inputFieldSet input {\n    background-color: transparent;\n    box-shadow: none!important;\n}\n\n.dropdown-backdrop {\n    display: block;\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background-color: rgba(0,0,0,.5);\n    animation-name: cePointerFadeIn;\n    animation-duration: .3s;\n}\n\n@keyframes ceFadeIn {\n    from {\n        opacity: 0;\n    }\n    to {\n        opacity: 1;\n    }\n}\n\n@keyframes ceSlideUp {\n    from {\n        transform: translateY(100%);\n    }\n    to {\n        transform: translateY(0);\n    }\n}\n\n@keyframes cePointerFadeIn {\n    from {\n        opacity: 0;\n        pointer-events: none;\n    }\n    to {\n        opacity: 1;\n        pointer-events: auto;\n    }\n}\n\n@keyframes rotate {\n    from {\n        transform: rotate(0deg);\n    }\n    to {\n        transform: rotate(360deg);\n    }\n}\n\n@keyframes circularDash {\n    0% {\n        stroke-dasharray: 1px, 200px;\n        stroke-dashoffset: 0;\n    }\n    50% {\n        stroke-dasharray: 100px, 200px;\n        stroke-dashoffset: -15px;\n    }\n    100% {\n        stroke-dasharray: 100px, 200px;\n        stroke-dashoffset: -125px;\n    }\n}\n';
  importCSS(styleCss);
  const DialogCss = '/**\n * Copyright 2022-Present Pionxzh\n * Copyright 2026 Asim Ihsan\n * SPDX-License-Identifier: MPL-2.0 AND MIT\n */\n\n.ce-dialog-overlay {\n    background-color: rgba(0, 0, 0, 0.44);\n    position: fixed;\n    inset: 0;\n    z-index: 1000;\n    animation: fadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1);\n}\n\n.ce-dialog-content {\n    background-color: #f3f3f3;\n    border-radius: 6px;\n    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 90vw;\n    max-width: 560px;\n    max-height: 85vh;\n    overflow-x: hidden;\n    overflow-y: auto;\n    padding: 16px 24px;\n    z-index: 1001;\n    outline: none;\n    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);\n}\n\n.dark .ce-dialog-content {\n    background-color: #2a2a2a;\n    border-color: #40414f;\n    border-width: 1px;\n}\n\n.ce-dialog-content input[type="checkbox"] {\n    border: none;\n    outline: none;\n    box-shadow: none;\n}\n\n.ce-dialog-title {\n    margin: 0 0 16px 0;\n    font-weight: 500;\n    color: #1a1523;\n    font-size: 20px;\n}\n\n.dark .ce-dialog-title {\n    color: #fff;\n}\n\n.Button {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 4px;\n    padding: 0 15px;\n    font-size: 15px;\n    line-height: 1;\n    height: 35px;\n}\n.Button.green {\n    background-color: #ddf3e4;\n    color: #18794e;\n}\n.Button.red {\n    background-color: #f9d9d9;\n    color: #a71d2a;\n}\n.Button.green:hover {\n    background-color: #ccebd7;\n}\n.Button:disabled {\n    opacity: 0.5;\n    color: #6f6e77;\n    background-color: #e0e0e0;\n    cursor: not-allowed;\n}\n.Button:disabled:hover {\n    background-color: #e0e0e0;\n}\n\n.IconButton {\n    font-family: inherit;\n    border-radius: 100%;\n    height: 25px;\n    width: 25px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    color: #6f6e77;\n}\n.IconButton:hover {\n    background-color: rgba(0, 0, 0, 0.06);\n}\n\n.CloseButton {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n}\n\n.Fieldset {\n    display: flex;\n    gap: 20px;\n    align-items: center;\n    margin-bottom: 15px;\n}\n\n.Label {\n    font-size: 15px;\n    color: #1a1523;\n    min-width: 90px;\n    text-align: right;\n}\n\n.dark .Label {\n    color: #fff;\n}\n\n.Input {\n    width: 100%;\n    flex: 1;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 4px;\n    padding: 0 10px;\n    font-size: 15px;\n    line-height: 1;\n    color: #000;\n    background-color: #fafafa;\n    box-shadow: 0 0 0 1px #6f6e77;\n    height: 35px;\n    outline: none;\n}\n\n.dark .Input {\n    background-color: #2f2f2f;\n    color: #fff;\n    box-shadow: 0 0 0 1px #6f6e77;\n}\n\n.Description {\n    font-size: 13px;\n    color: #5a5865;\n    text-align: right;\n    margin-bottom: 4px;\n}\n\n.dark .Description {\n    color: #bcbcbc;\n}\n\n.SelectToolbar {\n    display: flex;\n    align-items: center;\n    padding: 12px 16px;\n    border-radius: 4px 4px 0 0;\n    border: 1px solid #6f6e77;\n    border-bottom: none;\n}\n\n.SelectList {\n    position: relative;\n    width: 100%;\n    height: 270px;\n    padding: 12px 16px;\n    overflow-x: hidden;\n    overflow-y: auto;\n    border: 1px solid #6f6e77;\n    border-radius: 0 0 4px 4px;\n    white-space: nowrap;\n}\n\n.SelectItem {\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.SelectItem label, .SelectItem input {\n    cursor: pointer;\n}\n\n.SelectItem span {\n    vertical-align: middle;\n}\n\n@keyframes contentShow {\n    from {\n        opacity: 0;\n        transform: translate(-50%, -48%) scale(0.96);\n    }\n    to {\n        opacity: 1;\n        transform: translate(-50%, -50%) scale(1);\n    }\n}\n';
  importCSS(DialogCss);
  function MenuInner({ container }) {
    const { t: t2 } = useTranslation();
    const capabilities = getExportCapabilities();
    const disabled = capabilities.historyDisabledApplies && getHistoryDisabled();
    const [open, setOpen] = d(false);
    const [jsonOpen, setJsonOpen] = d(false);
    const [exportOpen, setExportOpen] = d(false);
    const [shortcutCopied, setShortcutCopied] = d(false);
    const triggerRef = A$1(null);
    const menuRef = A$1(null);
    const copiedTimerRef = A$1(void 0);
    const {
      format,
      enableMeta,
      exportMetaList
    } = useSettingContext();
    const metaList = T$1(() => enableMeta ? exportMetaList : [], [enableMeta, exportMetaList]);
    const onClickText = q$1(() => exportToText(), []);
    const onClickPng = q$1(() => exportToPng(format), [format]);
    const onClickMarkdown = q$1(() => exportToMarkdown(format, metaList), [format, metaList]);
    const onClickHtml = q$1(() => exportToHtml(format, metaList), [format, metaList]);
    const onClickJSON = q$1(() => {
      setJsonOpen(true);
      return true;
    }, []);
    const onClickOfficialJSON = q$1(() => exportToJson(format), [format]);
    const onClickTavern = q$1(() => exportToTavern(format), [format]);
    const onClickOoba = q$1(() => exportToOoba(format), [format]);
    const onClickSetting = q$1(() => {
      openSettingsPanel();
      return true;
    }, []);
    const width = useWindowResize(() => window.innerWidth);
    const isMobile = width < 768;
    const hasOverlayOpen = jsonOpen || exportOpen;
    const isMenuOpen = open || hasOverlayOpen;
    const desktopMenuWidth = 228;
    y(() => {
      if (!open) return;
      const onPointerDown = (event) => {
        const target = event.target;
        if (!target) return;
        if (triggerRef.current?.contains(target)) return;
        if (menuRef.current?.contains(target)) return;
        setOpen(false);
      };
      const onKeyDown = (event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };
      document.addEventListener("pointerdown", onPointerDown, true);
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("pointerdown", onPointerDown, true);
        document.removeEventListener("keydown", onKeyDown);
      };
    }, [open]);
    y(() => {
      const onShortcutCopied = () => {
        if (copiedTimerRef.current !== void 0) {
          window.clearTimeout(copiedTimerRef.current);
        }
        setShortcutCopied(true);
        copiedTimerRef.current = window.setTimeout(() => {
          setShortcutCopied(false);
          copiedTimerRef.current = void 0;
        }, 1600);
      };
      window.addEventListener(COPY_TEXT_SHORTCUT_SUCCESS_EVENT, onShortcutCopied);
      return () => {
        window.removeEventListener(COPY_TEXT_SHORTCUT_SUCCESS_EVENT, onShortcutCopied);
        if (copiedTimerRef.current !== void 0) {
          window.clearTimeout(copiedTimerRef.current);
        }
      };
    }, []);
    y(() => {
      if (!isMenuOpen || !menuRef.current) return;
      const rafId = window.requestAnimationFrame(() => {
        const wrapper = menuRef.current?.closest("[data-radix-popper-content-wrapper]");
        if (!wrapper) return;
        wrapper.style.zIndex = "2147483000";
        wrapper.style.opacity = "1";
        wrapper.style.filter = "none";
        wrapper.style.backdropFilter = "none";
        wrapper.style.mixBlendMode = "normal";
        wrapper.style.minWidth = "0";
      });
      return () => {
        window.cancelAnimationFrame(rafId);
      };
    }, [isMenuOpen]);
    const contentClassName = `
        ce-menu-content
        ce-bg-menu
        border ce-border-menu
        transition-opacity duration-200 shadow-md
        ${isMobile ? "ce-animate-slide-up" : "ce-animate-fade-in"}
    `;
    const onToggleMenu = q$1(() => {
      setOpen((current) => !current);
      return true;
    }, []);
    if (disabled) {
      return u$1(
        MenuItem,
        {
          className: "mt-1",
          text: "Chat History disabled",
          icon: IconArrowRightFromBracket,
          disabled: true
        }
      );
    }
    const menuContent = u$1(
      Content2,
      {
        className: contentClassName,
        style: {
          width: isMobile ? 312 : desktopMenuWidth,
          minWidth: isMobile ? 312 : desktopMenuWidth,
          maxWidth: isMobile ? 312 : desktopMenuWidth,
          left: -6,
          bottom: 0,
          backgroundColor: "var(--ce-menu-primary)",
          opacity: 1,
          position: "relative",
          zIndex: 2147483e3
        },
        sideOffset: isMobile ? 0 : 8,
        side: isMobile ? "bottom" : "right",
        align: "start",
        alignOffset: isMobile ? 0 : -64,
        collisionPadding: isMobile ? 0 : 8,
        children: [
u$1("div", { ref: menuRef, children: [
u$1(
              MenuItem,
              {
                text: t2("Setting"),
                icon: IconSetting,
                onClick: onClickSetting
              }
            ),
u$1(
              MenuItem,
              {
                text: t2("Copy Text"),
                successText: t2("Copied!"),
                icon: IconCopy,
                disabled: !capabilities.canExportText,
                onClick: onClickText
              }
            ),
u$1(
              MenuItem,
              {
                text: t2("Screenshot"),
                icon: IconCamera,
                disabled: !capabilities.canExportPng,
                onClick: onClickPng
              }
            ),
u$1(
              MenuItem,
              {
                text: t2("Markdown"),
                icon: IconMarkdown,
                disabled: !capabilities.canExportMarkdown,
                onClick: onClickMarkdown
              }
            ),
u$1(
              MenuItem,
              {
                text: t2("HTML"),
                icon: FileCode,
                disabled: !capabilities.canExportHtml,
                onClick: onClickHtml
              }
            ),
            capabilities.canExportJson && u$1(
              Root$1,
              {
                open: jsonOpen,
                onOpenChange: setJsonOpen,
                children: [
u$1(Trigger$1, { asChild: true, children: u$1(
                    MenuItem,
                    {
                      text: t2("JSON"),
                      icon: IconJSON,
                      onClick: onClickJSON
                    }
                  ) }),
u$1(Portal$1, { children: [
u$1(Overlay, { className: EXPORT_DIALOG_CLASS_NAMES.overlay }),
u$1(Content$1, { className: EXPORT_DIALOG_CLASS_NAMES.content, style: { width: "320px" }, children: [
u$1(Title, { className: EXPORT_DIALOG_CLASS_NAMES.title, children: t2("JSON") }),
u$1(
                        MenuItem,
                        {
                          text: t2("OpenAI Official Format"),
                          icon: IconCopy,
                          onClick: onClickOfficialJSON
                        }
                      ),
                      capabilities.canExportTavern && u$1(
                        MenuItem,
                        {
                          text: "JSONL (TavernAI, SillyTavern)",
                          icon: IconCopy,
                          onClick: onClickTavern
                        }
                      ),
                      capabilities.canExportOoba && u$1(
                        MenuItem,
                        {
                          text: "Ooba (text-generation-webui)",
                          icon: IconCopy,
                          onClick: onClickOoba
                        }
                      )
                    ] })
                  ] })
                ]
              }
            ),
            capabilities.canExportAll && u$1(
              ExportDialog,
              {
                format,
                open: exportOpen,
                onOpenChange: setExportOpen,
                children: u$1("div", { children: u$1(
                  MenuItem,
                  {
                    text: t2("Export All"),
                    icon: IconZip
                  }
                ) })
              }
            )
          ] }),
          !isMobile && u$1(
            Arrow2,
            {
              width: "16",
              height: "8",
              style: {
                fill: "var(--ce-menu-primary)",
                stroke: "var(--ce-border-light)",
                strokeWidth: "2px"
              }
            }
          )
        ]
      }
    );
    return u$1(k$2, { children: [
      isMobile && open && u$1(
        "div",
        {
          className: "dropdown-backdrop ce-animate-fade-in",
          onClick: () => setOpen(false)
        }
      ),
u$1(
        Root2,
        {
          open: isMenuOpen,
          children: [
u$1(Trigger, { children: u$1("div", { ref: triggerRef, children: u$1(
              MenuItem,
              {
                className: `mt-1 ${shortcutCopied ? "ce-menu-trigger-success" : ""}`,
                text: shortcutCopied ? t2("Copied!") : t2("ExportHelper"),
                icon: IconArrowRightFromBracket,
                onClick: onToggleMenu
              }
            ) }) }),
u$1(
              Portal,
              {
                container: isMobile ? container : document.body,
                forceMount: isMenuOpen ? true : void 0,
                children: menuContent
              }
            )
          ]
        }
      ),
u$1(Divider, {})
    ] });
  }
  function Menu({ container }) {
    return u$1(SettingProvider, { children: u$1(MenuInner, { container }) });
  }
  const missingTailwindCss = '/**\n * Copyright 2022-Present Pionxzh\n * Copyright 2026 Asim Ihsan\n * SPDX-License-Identifier: MPL-2.0 AND MIT\n */\n\n/* Utility fallback layer for Tailwind-like classes until a dedicated Tailwind build step is introduced. */\n.ce-animate-fade-in  {\n    animation: ceFadeIn .3s;\n}\n\n.ce-animate-slide-up  {\n    animation: ceSlideUp .3s;\n}\n\n.bg-blue-600 {\n    background-color: rgb(28 100 242);\n}\n\n.hover\\:bg-gray-500\\/10:hover {\n    background-color: hsla(0, 0%, 61%, .1)\n}\n\n.border-\\[\\#6f6e77\\] {\n    border-color: #6f6e77;\n}\n\n.cursor-help {\n    cursor: help;\n}\n\n.dark .dark\\:bg-white\\/5 {\n    background-color: rgb(255 255 255 / 5%);\n}\n\n.dark .dark\\:text-gray-200 {\n    color: rgb(229 231 235 / 1);\n}\n\n.dark .dark\\:text-gray-300 {\n    color: rgb(209 213 219 / 1);\n}\n\n.dark .dark\\:border-gray-\\[\\#86858d\\] {\n    border-color: #86858d;\n}\n\n.gap-x-1 {\n    column-gap: 0.25rem;\n}\n\n.h-2\\.5 {\n    height: 0.625rem;\n}\n\n.h-4 {\n    height: 1rem;\n}\n\n.inline-flex {\n    display: inline-flex;\n}\n\n.items-center {\n    align-items: center;\n}\n\n.ml-3 {\n    margin-left: 0.75rem;\n}\n\n.ml-4 {\n    margin-left: 1rem;\n}\n\n.mr-8 {\n    margin-right: 2rem;\n}\n\n.pb-0 {\n    padding-bottom: 0;\n}\n\n.pr-8 {\n    padding-right: 2rem;\n}\n\n.right-4 {\n    right: 1rem;\n}\n\n.rounded-full {\n    border-radius: 9999px;\n}\n\n.select-all {\n    user-select: all!important;\n}\n\n.space-y-6>:not([hidden])~:not([hidden]) {\n    --tw-space-y-reverse: 0;\n    margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));\n    margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));\n}\n\n.truncate {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.whitespace-nowrap {\n    white-space: nowrap;\n}\n\n@media (min-width:768px) {\n    /* md */\n}\n\n@media (min-width:1024px) {\n    .lg\\:mt-0 {\n        margin-top: 0;\n    }\n\n    .lg\\:top-8 {\n        top: 2rem;\n    }\n}\n\n\n.toggle-switch {\n    position: relative;\n    outline: none;\n    background-color: rgb(229 231 235);\n    border: 1px solid rgb(107 114 128);\n    border-radius: 9999px;\n    cursor: pointer;\n    height: 20px;\n    width: 32px;\n}\n\n.dark .toggle-switch {\n    background-color: rgb(255 255 255 / 5%);\n    border-color: rgb(255 255 255 / 1);\n}\n\n.toggle-switch[data-state="checked"] {\n    background-color: rgb(0 0 0);\n    border-color: rgb(0 0 0);\n}\n\n.dark .toggle-switch[data-state="checked"] {\n    background-color: rgb(22 163 74);\n    border-color: rgb(22 163 74);\n}\n\n.toggle-switch-handle {\n    display: block;\n    background-color: rgb(255 255 255);\n    border-radius: 9999px;\n    height: 16px;\n    width: 16px;\n    transition: transform 0.1s;\n    will-change: transform;\n    transform: translateX(1px);\n}\n\n.toggle-switch-handle[data-state="checked"] {\n    transform: translateX(14px);\n}\n\n.toggle-switch-handle:hover {\n    background-color: rgb(243 244 246);\n}\n\n.toggle-switch-label {\n    color: rgb(107 114 128);\n    margin-left: 0.75rem;\n    font-size: 0.875rem;\n    font-weight: 500;\n}\n\n.toggle-switch-label:hover {\n    color: rgb(71 85 105);\n}\n';
  importCSS(missingTailwindCss);
  main();
  function main() {
    onloadSafe(() => {
      registerSettingsMenuCommand();
      registerExportCopyShortcut();
      const styleEl = document.createElement("style");
      styleEl.id = "sentinel-css";
      document.head.append(styleEl);
      const injectionMap = new Map();
      const injectNavMenu = (nav) => {
        const pageContext = getPageContext();
        if (!isConversationPageContext(pageContext) || pageContext.isSharePage || pageContext.isShareContinuePage) return;
        if (injectionMap.has(nav)) return;
        const container = getMenuContainer();
        injectionMap.set(nav, { container, kind: "conversation-nav" });
        const chatList = nav.querySelector(":scope > div.sticky.bottom-0");
        if (chatList) {
          chatList.prepend(container);
        } else {
          container.style.backgroundColor = "#171717";
          container.style.position = "sticky";
          container.style.bottom = "72px";
          nav.append(container);
        }
      };
      const injectShareMenu = (target) => {
        const pageContext = getPageContext();
        if (!pageContext.isSharePage || injectionMap.has(target)) return;
        const container = getMenuContainer();
        injectionMap.set(target, { container, kind: "share-wrapper" });
        target.prepend(container);
      };
      const injectSecurityMenu = (target) => {
        const pageContext = getPageContext();
        if (!isSecurityExportPageContext(pageContext) || injectionMap.has(target)) return;
        const container = getMenuContainer();
        injectionMap.set(target, { container, kind: "security-sidebar" });
        target.prepend(container);
      };
      const shouldKeepInjection = (target, kind) => {
        const pageContext = getPageContext();
        const record = injectionMap.get(target);
        if (!record || record.kind !== kind) return false;
        return shouldKeepInjectedContainer(target, record, pageContext);
      };
      setTimeout(() => {
        sentinel.on("nav", injectNavMenu);
        sentinel.on(`div[role="presentation"] > .w-full > div >.flex.w-full`, injectShareMenu);
        sentinel.on('[role="separator"][aria-label="Resize repository pane"]', () => {
          const mountTarget = findSecuritySidebarMountTarget();
          if (mountTarget) {
            injectSecurityMenu(mountTarget);
          }
        });
        setInterval(() => {
          injectionMap.forEach((record, target) => {
            if (!shouldKeepInjection(target, record.kind)) {
              record.container.remove();
              injectionMap.delete(target);
            }
          });
          const navList = Array.from(document.querySelectorAll("nav")).filter((nav) => !injectionMap.has(nav));
          navList.forEach(injectNavMenu);
          if (isSharePage()) {
            const shareWrappers = Array.from(document.querySelectorAll('div[role="presentation"] > .w-full > div >.flex.w-full')).filter((target) => !injectionMap.has(target));
            shareWrappers.forEach(injectShareMenu);
          }
          const securityMountTarget = findSecuritySidebarMountTarget();
          if (securityMountTarget && !injectionMap.has(securityMountTarget)) {
            injectSecurityMenu(securityMountTarget);
          }
        }, 300);
        let chatId = "";
        const addMessageTimestamps = async () => {
          const currentChatId = getChatIdFromUrl();
          if (!currentChatId || currentChatId === chatId) return;
          chatId = currentChatId;
          const rawConversation = await fetchConversation(chatId, false);
          const { conversationNodes } = processConversation(rawConversation);
          const threadContents = Array.from(document.querySelectorAll('main [data-testid^="conversation-turn-"] [data-message-id]'));
          if (threadContents.length === 0) return;
          threadContents.forEach((thread, index2) => {
            const createTime = conversationNodes[index2]?.message?.create_time;
            if (!createTime) return;
            const date = new Date(createTime * 1e3);
            const timestamp2 = document.createElement("time");
            timestamp2.className = "w-full text-gray-500 dark:text-gray-400 text-sm text-right";
            timestamp2.dateTime = date.toISOString();
            timestamp2.title = date.toLocaleString();
            const hour12 = document.createElement("span");
            hour12.setAttribute("data-time-format", "12");
            hour12.textContent = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
            const hour24 = document.createElement("span");
            hour24.setAttribute("data-time-format", "24");
            hour24.textContent = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
            timestamp2.append(hour12, hour24);
            thread.append(timestamp2);
          });
        };
        sentinel.on('[role="presentation"]', () => {
          void addMessageTimestamps().catch((error) => {
            console.error("Failed to add message timestamps:", error);
          });
        });
      }, 1200);
    });
  }
  function getMenuContainer() {
    const container = document.createElement("div");
    container.style.zIndex = "99";
    J$1( u$1(Menu, { container }), container);
    return container;
  }

})(JSZip, html2canvas);