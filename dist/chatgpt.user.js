// ==UserScript==
// @name               ChatGPT Exporter
// @name:zh-CN         ChatGPT Exporter
// @name:zh-TW         ChatGPT Exporter
// @namespace          asimihsan
// @version            2.29.17
// @author             asimihsan
// @description        Easily export the whole ChatGPT conversation history for further analysis or sharing.
// @description:zh-CN  轻松导出 ChatGPT 聊天记录，以便进一步分析或分享。
// @description:zh-TW  輕鬆匯出 ChatGPT 聊天紀錄，以便進一步分析或分享。
// @license            MPL-2.0
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
// @match              https://chat.openai.com/codex/cloud/security/*
// @match              https://chatgpt.com/
// @match              https://chatgpt.com/?model=*
// @match              https://chatgpt.com/c/*
// @match              https://chatgpt.com/g/*
// @match              https://chatgpt.com/gpts
// @match              https://chatgpt.com/gpts/*
// @match              https://chatgpt.com/share/*
// @match              https://chatgpt.com/share/*/continue
// @match              https://chatgpt.com/codex/security/*
// @match              https://chatgpt.com/codex/cloud/security/*
// @match              https://new.oaifree.com/
// @match              https://new.oaifree.com/?model=*
// @match              https://new.oaifree.com/c/*
// @match              https://new.oaifree.com/g/*
// @match              https://new.oaifree.com/gpts
// @match              https://new.oaifree.com/gpts/*
// @match              https://new.oaifree.com/share/*
// @match              https://new.oaifree.com/share/*/continue
// @match              https://new.oaifree.com/codex/security/*
// @match              https://new.oaifree.com/codex/cloud/security/*
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

(function(jszip, html2canvas) {
  'use strict';
	var __create$1 = Object.create;
	var __defProp$1 = Object.defineProperty;
	var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames$1 = Object.getOwnPropertyNames;
	var __getProtoOf$1 = Object.getPrototypeOf;
	var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
	var __copyProps$1 = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames$1(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$1(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM$1 = (mod, isNodeMode, target) => (target = mod != null ? __create$1(__getProtoOf$1(mod)) : {}, __copyProps$1(isNodeMode || !mod || !mod.__esModule ? __defProp$1(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	jszip = __toESM$1(jszip);
	html2canvas = __toESM$1(html2canvas);
	var s$3 = new Set();
	var _css = async (t) => {
		if (s$3.has(t)) return;
		s$3.add(t);
		((css) => {
			const styleElement = document.createElement("style");
			styleElement.textContent = css;
			document.head.append(styleElement);
			setInterval(() => {
				if (styleElement.isConnected) return;
				document.head.append(styleElement);
			}, 300);
		})(t);
	};
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __esmMin = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
	var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
	var __exportAll = (all, no_symbols) => {
		let target = {};
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
		if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
		return target;
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	var __toCommonJS = (mod) => __hasOwnProp.call(mod, "module.exports") ? mod["module.exports"] : __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	function m$1(n, l) {
		for (var u in l) n[u] = l[u];
		return n;
	}
	function b$2(n) {
		n && n.parentNode && n.parentNode.removeChild(n);
	}
	function k$2(l, u, t) {
		var i, r, o, e = {};
		for (o in u) "key" == o ? i = u[o] : "ref" == o ? r = u[o] : e[o] = u[o];
		if (arguments.length > 2 && (e.children = arguments.length > 3 ? n$1.call(arguments, 2) : t), "function" == typeof l && null != l.defaultProps) for (o in l.defaultProps) void 0 === e[o] && (e[o] = l.defaultProps[o]);
		return x$2(l, e, i, r, null);
	}
	function x$2(n, t, i, r, o) {
		var e = {
			type: n,
			props: t,
			key: i,
			ref: r,
			__k: null,
			__: null,
			__b: 0,
			__e: null,
			__c: null,
			constructor: void 0,
			__v: null == o ? ++u$3 : o,
			__i: -1,
			__u: 0
		};
		return null == o && null != l$2.vnode && l$2.vnode(e), e;
	}
	function M$1() {
		return { current: null };
	}
	function S$1(n) {
		return n.children;
	}
	function C$2(n, l) {
		this.props = n, this.context = l;
	}
	function $$1(n, l) {
		if (null == l) return n.__ ? $$1(n.__, n.__i + 1) : null;
		for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
		return "function" == typeof n.type ? $$1(n) : null;
	}
	function I$2(n) {
		if (n.__P && n.__d) {
			var u = n.__v, t = u.__e, i = [], r = [], o = m$1({}, u);
			o.__v = u.__v + 1, l$2.vnode && l$2.vnode(o), q$2(n.__P, o, u, n.__n, n.__P.namespaceURI, 32 & u.__u ? [t] : null, i, null == t ? $$1(u) : t, !!(32 & u.__u), r), o.__v = u.__v, o.__.__k[o.__i] = o, D$3(i, o, r), u.__e = u.__ = null, o.__e != t && P$2(o);
		}
	}
	function P$2(n) {
		if (null != (n = n.__) && null != n.__c) return n.__e = n.__c.base = null, n.__k.some(function(l) {
			if (null != l && null != l.__e) return n.__e = n.__c.base = l.__e;
		}), P$2(n);
	}
	function A$3(n) {
		(!n.__d && (n.__d = !0) && i$3.push(n) && !H$1.__r++ || r$2 != l$2.debounceRendering) && ((r$2 = l$2.debounceRendering) || o$3)(H$1);
	}
	function H$1() {
		try {
			for (var n, l = 1; i$3.length;) i$3.length > l && i$3.sort(e$2), n = i$3.shift(), l = i$3.length, I$2(n);
		} finally {
			i$3.length = H$1.__r = 0;
		}
	}
	function L$1(n, l, u, t, i, r, o, e, f, c, s) {
		var a, h, p, v, y, _, g, m = t && t.__k || w$3, b = l.length;
		for (f = T$2(u, l, m, f, b), a = 0; a < b; a++) null != (p = u.__k[a]) && (h = -1 != p.__i && m[p.__i] || d$2, p.__i = a, _ = q$2(n, p, h, i, r, o, e, f, c, s), v = p.__e, p.ref && h.ref != p.ref && (h.ref && J$1(h.ref, null, p), s.push(p.ref, p.__c || v, p)), null == y && null != v && (y = v), (g = !!(4 & p.__u)) || h.__k === p.__k ? (f = j$2(p, f, n, g), g && h.__e && (h.__e = null)) : "function" == typeof p.type && void 0 !== _ ? f = _ : v && (f = v.nextSibling), p.__u &= -7);
		return u.__e = y, f;
	}
	function T$2(n, l, u, t, i) {
		var r, o, e, f, c, s = u.length, a = s, h = 0;
		for (n.__k = new Array(i), r = 0; r < i; r++) null != (o = l[r]) && "boolean" != typeof o && "function" != typeof o ? ("string" == typeof o || "number" == typeof o || "bigint" == typeof o || o.constructor == String ? o = n.__k[r] = x$2(null, o, null, null, null) : g$3(o) ? o = n.__k[r] = x$2(S$1, { children: o }, null, null, null) : void 0 === o.constructor && o.__b > 0 ? o = n.__k[r] = x$2(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : n.__k[r] = o, f = r + h, o.__ = n, o.__b = n.__b + 1, e = null, -1 != (c = o.__i = O$1(o, u, f, a)) && (a--, (e = u[c]) && (e.__u |= 2)), null == e || null == e.__v ? (-1 == c && (i > s ? h-- : i < s && h++), "function" != typeof o.type && (o.__u |= 4)) : c != f && (c == f - 1 ? h-- : c == f + 1 ? h++ : (c > f ? h-- : h++, o.__u |= 4))) : n.__k[r] = null;
		if (a) for (r = 0; r < s; r++) null != (e = u[r]) && 0 == (2 & e.__u) && (e.__e == t && (t = $$1(e)), K$1(e, e));
		return t;
	}
	function j$2(n, l, u, t) {
		var i, r;
		if ("function" == typeof n.type) {
			for (i = n.__k, r = 0; i && r < i.length; r++) i[r] && (i[r].__ = n, l = j$2(i[r], l, u, t));
			return l;
		}
		n.__e != l && (t && (l && n.type && !l.parentNode && (l = $$1(n)), u.insertBefore(n.__e, l || null)), l = n.__e);
		do
			l = l && l.nextSibling;
		while (null != l && 8 == l.nodeType);
		return l;
	}
	function F$2(n, l) {
		return l = l || [], null == n || "boolean" == typeof n || (g$3(n) ? n.some(function(n) {
			F$2(n, l);
		}) : l.push(n)), l;
	}
	function O$1(n, l, u, t) {
		var i, r, o, e = n.key, f = n.type, c = l[u], s = null != c && 0 == (2 & c.__u);
		if (null === c && null == e || s && e == c.key && f == c.type) return u;
		if (t > (s ? 1 : 0)) {
			for (i = u - 1, r = u + 1; i >= 0 || r < l.length;) if (null != (c = l[o = i >= 0 ? i-- : r++]) && 0 == (2 & c.__u) && e == c.key && f == c.type) return o;
		}
		return -1;
	}
	function z$2(n, l, u) {
		"-" == l[0] ? n.setProperty(l, null == u ? "" : u) : n[l] = null == u ? "" : "number" != typeof u || _$1.test(l) ? u : u + "px";
	}
	function N$2(n, l, u, t, i) {
		var r, o;
		n: if ("style" == l) if ("string" == typeof u) n.style.cssText = u;
		else {
			if ("string" == typeof t && (n.style.cssText = t = ""), t) for (l in t) u && l in u || z$2(n.style, l, "");
			if (u) for (l in u) t && u[l] == t[l] || z$2(n.style, l, u[l]);
		}
		else if ("o" == l[0] && "n" == l[1]) r = l != (l = l.replace(a$2, "$1")), o = l.toLowerCase(), l = o in n || "onFocusOut" == l || "onFocusIn" == l ? o.slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + r] = u, u ? t ? u[s$2] = t[s$2] : (u[s$2] = h$2, n.addEventListener(l, r ? v$2 : p$3, r)) : n.removeEventListener(l, r ? v$2 : p$3, r);
		else {
			if ("http://www.w3.org/2000/svg" == i) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
			else if ("width" != l && "height" != l && "href" != l && "list" != l && "form" != l && "tabIndex" != l && "download" != l && "rowSpan" != l && "colSpan" != l && "role" != l && "popover" != l && l in n) try {
				n[l] = null == u ? "" : u;
				break n;
			} catch (n) {}
			"function" == typeof u || (null == u || !1 === u && "-" != l[4] ? n.removeAttribute(l) : n.setAttribute(l, "popover" == l && 1 == u ? "" : u));
		}
	}
	function V$1(n) {
		return function(u) {
			if (this.l) {
				var t = this.l[u.type + n];
				if (null == u[c$1]) u[c$1] = h$2++;
				else if (u[c$1] < t[s$2]) return;
				return t(l$2.event ? l$2.event(u) : u);
			}
		};
	}
	function q$2(n, u, t, i, r, o, e, f, c, s) {
		var a, h, p, v, y, d, _, k, x, M, $, I, P, A, H, T = u.type;
		if (void 0 !== u.constructor) return null;
		128 & t.__u && (c = !!(32 & t.__u), o = [f = u.__e = t.__e]), (a = l$2.__b) && a(u);
		n: if ("function" == typeof T) try {
			if (k = u.props, x = T.prototype && T.prototype.render, M = (a = T.contextType) && i[a.__c], $ = a ? M ? M.props.value : a.__ : i, t.__c ? _ = (h = u.__c = t.__c).__ = h.__E : (x ? u.__c = h = new T(k, $) : (u.__c = h = new C$2(k, $), h.constructor = T, h.render = Q$1), M && M.sub(h), h.state || (h.state = {}), h.__n = i, p = h.__d = !0, h.__h = [], h._sb = []), x && null == h.__s && (h.__s = h.state), x && null != T.getDerivedStateFromProps && (h.__s == h.state && (h.__s = m$1({}, h.__s)), m$1(h.__s, T.getDerivedStateFromProps(k, h.__s))), v = h.props, y = h.state, h.__v = u, p) x && null == T.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), x && null != h.componentDidMount && h.__h.push(h.componentDidMount);
			else {
				if (x && null == T.getDerivedStateFromProps && k !== v && null != h.componentWillReceiveProps && h.componentWillReceiveProps(k, $), u.__v == t.__v || !h.__e && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(k, h.__s, $)) {
					u.__v != t.__v && (h.props = k, h.state = h.__s, h.__d = !1), u.__e = t.__e, u.__k = t.__k, u.__k.some(function(n) {
						n && (n.__ = u);
					}), w$3.push.apply(h.__h, h._sb), h._sb = [], h.__h.length && e.push(h);
					break n;
				}
				null != h.componentWillUpdate && h.componentWillUpdate(k, h.__s, $), x && null != h.componentDidUpdate && h.__h.push(function() {
					h.componentDidUpdate(v, y, d);
				});
			}
			if (h.context = $, h.props = k, h.__P = n, h.__e = !1, I = l$2.__r, P = 0, x) h.state = h.__s, h.__d = !1, I && I(u), a = h.render(h.props, h.state, h.context), w$3.push.apply(h.__h, h._sb), h._sb = [];
			else do
				h.__d = !1, I && I(u), a = h.render(h.props, h.state, h.context), h.state = h.__s;
			while (h.__d && ++P < 25);
			h.state = h.__s, null != h.getChildContext && (i = m$1(m$1({}, i), h.getChildContext())), x && !p && null != h.getSnapshotBeforeUpdate && (d = h.getSnapshotBeforeUpdate(v, y)), A = null != a && a.type === S$1 && null == a.key ? E$1(a.props.children) : a, f = L$1(n, g$3(A) ? A : [A], u, t, i, r, o, e, f, c, s), h.base = u.__e, u.__u &= -161, h.__h.length && e.push(h), _ && (h.__E = h.__ = null);
		} catch (n) {
			if (u.__v = null, c || null != o) if (n.then) {
				for (u.__u |= c ? 160 : 128; f && 8 == f.nodeType && f.nextSibling;) f = f.nextSibling;
				o[o.indexOf(f)] = null, u.__e = f;
			} else {
				for (H = o.length; H--;) b$2(o[H]);
				B$3(u);
			}
			else u.__e = t.__e, u.__k = t.__k, n.then || B$3(u);
			l$2.__e(n, u, t);
		}
		else null == o && u.__v == t.__v ? (u.__k = t.__k, u.__e = t.__e) : f = u.__e = G$1(t.__e, u, t, i, r, o, e, c, s);
		return (a = l$2.diffed) && a(u), 128 & u.__u ? void 0 : f;
	}
	function B$3(n) {
		n && (n.__c && (n.__c.__e = !0), n.__k && n.__k.some(B$3));
	}
	function D$3(n, u, t) {
		for (var i = 0; i < t.length; i++) J$1(t[i], t[++i], t[++i]);
		l$2.__c && l$2.__c(u, n), n.some(function(u) {
			try {
				n = u.__h, u.__h = [], n.some(function(n) {
					n.call(u);
				});
			} catch (n) {
				l$2.__e(n, u.__v);
			}
		});
	}
	function E$1(n) {
		return "object" != typeof n || null == n || n.__b > 0 ? n : g$3(n) ? n.map(E$1) : m$1({}, n);
	}
	function G$1(u, t, i, r, o, e, f, c, s) {
		var a, h, p, v, y, w, _, m = i.props || d$2, k = t.props, x = t.type;
		if ("svg" == x ? o = "http://www.w3.org/2000/svg" : "math" == x ? o = "http://www.w3.org/1998/Math/MathML" : o || (o = "http://www.w3.org/1999/xhtml"), null != e) {
			for (a = 0; a < e.length; a++) if ((y = e[a]) && "setAttribute" in y == !!x && (x ? y.localName == x : 3 == y.nodeType)) {
				u = y, e[a] = null;
				break;
			}
		}
		if (null == u) {
			if (null == x) return document.createTextNode(k);
			u = document.createElementNS(o, x, k.is && k), c && (l$2.__m && l$2.__m(t, e), c = !1), e = null;
		}
		if (null == x) m === k || c && u.data == k || (u.data = k);
		else {
			if (e = e && n$1.call(u.childNodes), !c && null != e) for (m = {}, a = 0; a < u.attributes.length; a++) m[(y = u.attributes[a]).name] = y.value;
			for (a in m) y = m[a], "dangerouslySetInnerHTML" == a ? p = y : "children" == a || a in k || "value" == a && "defaultValue" in k || "checked" == a && "defaultChecked" in k || N$2(u, a, null, y, o);
			for (a in k) y = k[a], "children" == a ? v = y : "dangerouslySetInnerHTML" == a ? h = y : "value" == a ? w = y : "checked" == a ? _ = y : c && "function" != typeof y || m[a] === y || N$2(u, a, y, m[a], o);
			if (h) c || p && (h.__html == p.__html || h.__html == u.innerHTML) || (u.innerHTML = h.__html), t.__k = [];
			else if (p && (u.innerHTML = ""), L$1("template" == t.type ? u.content : u, g$3(v) ? v : [v], t, i, r, "foreignObject" == x ? "http://www.w3.org/1999/xhtml" : o, e, f, e ? e[0] : i.__k && $$1(i, 0), c, s), null != e) for (a = e.length; a--;) b$2(e[a]);
			c || (a = "value", "progress" == x && null == w ? u.removeAttribute("value") : null != w && (w !== u[a] || "progress" == x && !w || "option" == x && w != m[a]) && N$2(u, a, w, m[a], o), a = "checked", null != _ && _ != u[a] && N$2(u, a, _, m[a], o));
		}
		return u;
	}
	function J$1(n, u, t) {
		try {
			if ("function" == typeof n) {
				var i = "function" == typeof n.__u;
				i && n.__u(), i && null == u || (n.__u = n(u));
			} else n.current = u;
		} catch (n) {
			l$2.__e(n, t);
		}
	}
	function K$1(n, u, t) {
		var i, r;
		if (l$2.unmount && l$2.unmount(n), (i = n.ref) && (i.current && i.current != n.__e || J$1(i, null, u)), null != (i = n.__c)) {
			if (i.componentWillUnmount) try {
				i.componentWillUnmount();
			} catch (n) {
				l$2.__e(n, u);
			}
			i.base = i.__P = null;
		}
		if (i = n.__k) for (r = 0; r < i.length; r++) i[r] && K$1(i[r], u, t || "function" != typeof n.type);
		t || b$2(n.__e), n.__c = n.__ = n.__e = void 0;
	}
	function Q$1(n, l, u) {
		return this.constructor(n, u);
	}
	function R$1(u, t, i) {
		var r, o, e, f;
		t == document && (t = document.documentElement), l$2.__ && l$2.__(u, t), o = (r = "function" == typeof i) ? null : i && i.__k || t.__k, e = [], f = [], q$2(t, u = (!r && i || t).__k = k$2(S$1, null, [u]), o || d$2, d$2, t.namespaceURI, !r && i ? [i] : o ? null : t.firstChild ? n$1.call(t.childNodes) : null, e, !r && i ? i : o ? o.__e : t.firstChild, r, f), D$3(e, u, f);
	}
	function U$1(n, l) {
		R$1(n, l, U$1);
	}
	function W$1(l, u, t) {
		var i, r, o, e, f = m$1({}, l.props);
		for (o in l.type && l.type.defaultProps && (e = l.type.defaultProps), u) "key" == o ? i = u[o] : "ref" == o ? r = u[o] : f[o] = void 0 === u[o] && null != e ? e[o] : u[o];
		return arguments.length > 2 && (f.children = arguments.length > 3 ? n$1.call(arguments, 2) : t), x$2(l.type, f, i || l.key, r || l.ref, null);
	}
	function X$1(n) {
		function l(n) {
			var u, t;
			return this.getChildContext || (u = new Set(), (t = {})[l.__c] = this, this.getChildContext = function() {
				return t;
			}, this.componentWillUnmount = function() {
				u = null;
			}, this.shouldComponentUpdate = function(n) {
				this.props.value != n.value && u.forEach(function(n) {
					n.__e = !0, A$3(n);
				});
			}, this.sub = function(n) {
				u.add(n);
				var l = n.componentWillUnmount;
				n.componentWillUnmount = function() {
					u && u.delete(n), l && l.call(n);
				};
			}), n.children;
		}
		return l.__c = "__cC" + y$2++, l.__ = n, l.Provider = l.__l = (l.Consumer = function(n, l) {
			return n.children(l);
		}).contextType = l, l;
	}
	var n$1, l$2, u$3, i$3, r$2, o$3, e$2, f$3, c$1, s$2, a$2, h$2, p$3, v$2, y$2, d$2, w$3, _$1, g$3;
	var init_preact_module = __esmMin((() => {
		d$2 = {}, w$3 = [], _$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, g$3 = Array.isArray;
		n$1 = w$3.slice, l$2 = { __e: function(n, l, u, t) {
			for (var i, r, o; l = l.__;) if ((i = l.__c) && !i.__) try {
				if ((r = i.constructor) && null != r.getDerivedStateFromError && (i.setState(r.getDerivedStateFromError(n)), o = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n, t || {}), o = i.__d), o) return i.__E = i;
			} catch (l) {
				n = l;
			}
			throw n;
		} }, u$3 = 0, C$2.prototype.setState = function(n, l) {
			var u = null != this.__s && this.__s != this.state ? this.__s : this.__s = m$1({}, this.state);
			"function" == typeof n && (n = n(m$1({}, u), this.props)), n && m$1(u, n), null != n && this.__v && (l && this._sb.push(l), A$3(this));
		}, C$2.prototype.forceUpdate = function(n) {
			this.__v && (this.__e = !0, n && this.__h.push(n), A$3(this));
		}, C$2.prototype.render = S$1, i$3 = [], o$3 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$2 = function(n, l) {
			return n.__v.__b - l.__v.__b;
		}, H$1.__r = 0, f$3 = Math.random().toString(8), c$1 = "__d" + f$3, s$2 = "__a" + f$3, a$2 = /(PointerCapture)$|Capture$/i, h$2 = 0, p$3 = V$1(!1), v$2 = V$1(!0), y$2 = 0;
	}));
	var require_sentinel_umd = __commonJSMin(((exports, module) => {
		(function(root, factory) {
			if (typeof define === "function" && define.amd) define([], factory);
			else if (typeof exports === "object") module.exports = factory();
			else root.sentinel = factory();
		})(exports, function() {
			var isArray = Array.isArray, selectorToAnimationMap = {}, animationCallbacks = {}, styleEl, styleSheet, cssRules;
			return {
				on: function(cssSelectors, callback) {
					if (!callback) return;
					if (!styleEl) {
						var doc = document, head = doc.head;
						doc.addEventListener("animationstart", function(ev, callbacks, l, i) {
							callbacks = animationCallbacks[ev.animationName];
							if (!callbacks) return;
							ev.stopImmediatePropagation();
							l = callbacks.length;
							for (i = 0; i < l; i++) callbacks[i](ev.target);
						}, true);
						styleEl = doc.getElementById("sentinel-css");
						if (!styleEl) {
							styleEl = doc.createElement("style");
							head.insertBefore(styleEl, head.firstChild);
						}
						styleSheet = styleEl.sheet;
						cssRules = styleSheet.cssRules;
					}
					(isArray(cssSelectors) ? cssSelectors : [cssSelectors]).map(function(selector, animId, isCustomName) {
						animId = selectorToAnimationMap[selector];
						if (!animId) {
							isCustomName = selector[0] == "!";
							selectorToAnimationMap[selector] = animId = isCustomName ? selector.slice(1) : "sentinel-" + Math.random().toString(16).slice(2);
							cssRules[styleSheet.insertRule("@keyframes " + animId + "{from{transform:none;}to{transform:none;}}", cssRules.length)]._id = selector;
							if (!isCustomName) cssRules[styleSheet.insertRule(selector + "{animation-duration:0.0001s;animation-name:" + animId + ";}", cssRules.length)]._id = selector;
							selectorToAnimationMap[selector] = animId;
						}
						(animationCallbacks[animId] = animationCallbacks[animId] || []).push(callback);
					});
				},
				off: function(cssSelectors, callback) {
					(isArray(cssSelectors) ? cssSelectors : [cssSelectors]).map(function(selector, animId, callbackList, i) {
						if (!(animId = selectorToAnimationMap[selector])) return;
						callbackList = animationCallbacks[animId];
						if (callback) {
							i = callbackList.length;
							while (i--) if (callbackList[i] === callback) callbackList.splice(i, 1);
						} else callbackList = [];
						if (callbackList.length) return;
						i = cssRules.length;
						while (i--) if (cssRules[i]._id == selector) styleSheet.deleteRule(i);
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
	}));
	init_preact_module();
	var import_sentinel_umd = __toESM(require_sentinel_umd(), 1);
	var _GM = typeof GM != "undefined" ? GM : void 0;
	var _GM_registerMenuCommand = typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0;
	var _unsafeWindow = typeof unsafeWindow != "undefined" ? unsafeWindow : void 0;
	var API_MAPPING = {
		"https://chat.openai.com": "https://chat.openai.com/backend-api",
		"https://chatgpt.com": "https://chatgpt.com/backend-api",
		"https://new.oaifree.com": "https://new.oaifree.com/backend-api"
	};
	var FALLBACK_BASE_URL = "https://chat.openai.com";
	function getBaseUrl() {
		if (typeof location === "object" && typeof location.href === "string") return new URL(location.href).origin;
		return FALLBACK_BASE_URL;
	}
	var baseUrl = getBaseUrl();
	var apiUrl = API_MAPPING[baseUrl];
	var KEY_LANGUAGE = "exporter:language";
	var KEY_FILENAME_FORMAT = "exporter:filename_format";
	var KEY_TIMESTAMP_ENABLED = "exporter:enable_timestamp";
	var KEY_TIMESTAMP_24H = "exporter:timestamp_24h";
	var KEY_TIMESTAMP_MARKDOWN = "exporter:timestamp_markdown";
	var KEY_TIMESTAMP_HTML = "exporter:timestamp_html";
	var KEY_META_ENABLED = "exporter:enable_meta";
	var KEY_META_LIST = "exporter:meta_list";
	var KEY_EXPORT_ALL_LIMIT = "exporter:export_all_limit";
	var KEY_COPY_TEXT_SHORTCUT_ENABLED = "exporter:enable_copy_text_shortcut";
	var KEY_COPY_TEXT_SHORTCUT = "exporter:copy_text_shortcut";
	var KEY_OAI_HISTORY_DISABLED = "oai/apps/historyDisabled";
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
		return getBase64FromImg(await loadImage(url));
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
		return localStorage.getItem(KEY_OAI_HISTORY_DISABLED) === "\"true\"";
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
		if (window.__NEXT_DATA__?.props?.pageProps?.serverResponse?.data) return JSON.parse(JSON.stringify(window.__NEXT_DATA__.props.pageProps.serverResponse.data));
		if (window.__remixContext?.state?.loaderData?.["routes/share.$shareId.($action)"]?.serverResponse?.data) return JSON.parse(JSON.stringify(window.__remixContext.state.loaderData["routes/share.$shareId.($action)"].serverResponse.data));
		return null;
	}
	var defaultAvatar = "data:image/svg+xml,%3Csvg%20stroke%3D%22currentColor%22%20fill%3D%22none%22%20stroke-width%3D%221.5%22%20viewBox%3D%22-6%20-6%2036%2036%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20style%3D%22color%3A%20white%3B%20background%3A%20%23ab68ff%3B%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M20%2021v-2a4%204%200%200%200-4-4H8a4%204%200%200%200-4%204v2%22%3E%3C%2Fpath%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%227%22%20r%3D%224%22%3E%3C%2Fcircle%3E%3C%2Fsvg%3E";
	async function getUserAvatar() {
		try {
			const { picture } = getUserProfile();
			if (picture) return await getBase64FromImageUrl(picture);
		} catch (e) {
			console.error(e);
		}
		try {
			const avatar = Array.from(document.querySelectorAll("img[alt]:not([aria-hidden])")).find((avatar) => !avatar.src.startsWith("data:"));
			if (avatar) return getBase64FromImg(avatar);
		} catch (e) {
			console.error(e);
		}
		return defaultAvatar;
	}
	function checkIfConversationStarted() {
		return !!document.querySelector("[data-testid^=\"conversation-turn-\"]");
	}
	var generateKey = (args) => JSON.stringify(args);
	function memorize(fn) {
		const cache = new Map();
		const memorized = (...args) => {
			const key = generateKey(args);
			if (cache.has(key)) return cache.get(key);
			const result = fn(...args);
			cache.set(key, result);
			return result;
		};
		return memorized;
	}
	var ApiHttpError = class extends Error {
		status;
		statusText;
		url;
		constructor(url, response) {
			super(`${response.status} ${response.statusText}`.trim());
			this.name = "ApiHttpError";
			this.status = response.status;
			this.statusText = response.statusText;
			this.url = url;
		}
	};
	var ChatGPTCookie = function(ChatGPTCookie) {
		ChatGPTCookie["AgeVerification"] = "oai-av-seen";
		ChatGPTCookie["AllowNonessential"] = "oai-allow-ne";
		ChatGPTCookie["DeviceId"] = "oai-did";
		ChatGPTCookie["DomainMigrationSourceCompleted"] = "oai-dm-src-c-240329";
		ChatGPTCookie["DomainMigrationTargetCompleted"] = "oai-dm-tgt-c-240329";
		ChatGPTCookie["HasClickedOnTryItFirstLink"] = "oai-tif-20240402";
		ChatGPTCookie["HasLoggedInBefore"] = "oai-hlib";
		ChatGPTCookie["HideLoggedOutBanner"] = "hide-logged-out-banner";
		ChatGPTCookie["IntercomDeviceIdDev"] = "intercom-device-id-izw1u7l7";
		ChatGPTCookie["IntercomDeviceIdProd"] = "intercom-device-id-dgkjq2bp";
		ChatGPTCookie["IpOverride"] = "oai-ip-country";
		ChatGPTCookie["IsEmployee"] = "_oaiauth";
		ChatGPTCookie["IsPaidUser"] = "_puid";
		ChatGPTCookie["LastLocation"] = "oai-ll";
		ChatGPTCookie["SegmentUserId"] = "ajs_user_id";
		ChatGPTCookie["SegmentUserTraits"] = "ajs_user_traits";
		ChatGPTCookie["ShowPaymentModal"] = "ui-show-payment-modal";
		ChatGPTCookie["TempEnableUnauthedCompliance"] = "temp-oai-compliance";
		ChatGPTCookie["Workspace"] = "_account";
		return ChatGPTCookie;
	}(ChatGPTCookie || {});
	function encodePathSegmentPreservingColons(value) {
		return encodeURIComponent(value).replaceAll(/%3A/gi, ":");
	}
	function buildUrl(base, path, params = {}) {
		const remainingParams = { ...params };
		const resolvedPath = path.replace(/:([a-z0-9_]+)/gi, (_, key) => {
			const value = remainingParams[key];
			if (value === void 0 || value === null) throw new Error(`Missing path parameter: ${key}`);
			delete remainingParams[key];
			return encodeURIComponent(String(value));
		});
		const baseUrl = new URL(base);
		const url = new URL(baseUrl.origin);
		url.pathname = `${baseUrl.pathname.replace(/\/$/, "")}${resolvedPath}`;
		Object.entries(remainingParams).forEach(([key, value]) => {
			if (value === void 0 || value === null) return;
			url.searchParams.set(key, String(value));
		});
		return url.toString();
	}
	var sessionApiUrl = buildUrl(baseUrl, "/api/auth/session");
	var accountsCheckApiUrl = buildUrl(apiUrl, "/accounts/check/v4-2023-04-27");
	var getConversationApiUrl = (id) => buildUrl(apiUrl, "/conversation/:id", { id });
	var getConversationsApiUrl = (offset, limit) => buildUrl(apiUrl, "/conversations", {
		offset,
		limit
	});
	var getFileDownloadApiUrl = (id, options = {}) => buildUrl(apiUrl, "/files/download/:id", {
		id,
		post_id: options.postId ?? "",
		conversation_id: options.conversationId,
		inline: options.inline ?? false
	});
	var getLegacyFileDownloadApiUrl = (id) => buildUrl(apiUrl, "/files/:id/download", { id });
	var getProjectsApiUrl = () => buildUrl(apiUrl, "/gizmos/snorlax/sidebar", { conversations_per_gizmo: 0 });
	var getProjectConversationsApiUrl = (gizmo, offset, limit) => {
		return buildUrl(apiUrl, "/gizmos/:gizmo/conversations", {
			gizmo,
			cursor: offset,
			limit
		});
	};
	var getSecurityFindingApiUrl = (id) => buildUrl(apiUrl, "/aardvark/scan-findings/:id", { id });
	var getSecurityFindingsApiUrl = (params = {}) => buildUrl(apiUrl, "/aardvark/scan-findings", params);
	var getSecurityScanConfigurationsApiUrl = (params = {}) => buildUrl(apiUrl, "/aardvark/scan_configurations", {
		repo_id: params.repoId,
		limit: params.limit,
		cursor: params.cursor
	});
	var getSecurityScanConfigurationApiUrl = (id) => {
		return `${buildUrl(apiUrl, "/aardvark/scan_configurations", {})}/${encodePathSegmentPreservingColons(id)}`;
	};
	var getSecurityScanConfigurationStatsApiUrl = (id) => {
		return `${getSecurityScanConfigurationApiUrl(id)}/stats`;
	};
	var getSecurityRepoApiUrl = (repoId) => buildUrl(apiUrl, "/wham/github/repositories/:repoId", { repoId });
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
		if (!response.ok) throw new ApiHttpError(url, response);
		return response.json();
	}
	async function _fetchSession() {
		const response = await fetch(sessionApiUrl);
		if (!response.ok) throw new Error(response.statusText);
		return response.json();
	}
	var fetchSession = memorize(_fetchSession);
	async function getAccessToken() {
		const pageAccessToken = getPageAccessToken();
		if (pageAccessToken) return pageAccessToken;
		return (await fetchSession()).accessToken;
	}
	async function _fetchAccountsCheck() {
		const accessToken = await getAccessToken();
		const response = await fetch(accountsCheckApiUrl, { headers: {
			"Authorization": `Bearer ${accessToken}`,
			"X-Authorization": `Bearer ${accessToken}`
		} });
		if (!response.ok) throw new Error(response.statusText);
		return response.json();
	}
	var fetchAccountsCheck = memorize(_fetchAccountsCheck);
	var getCookie = (key) => document.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`)?.pop() || "";
	async function getTeamAccountId() {
		const accountsCheck = await fetchAccountsCheck();
		const workspaceId = getCookie(ChatGPTCookie.Workspace);
		if (workspaceId) {
			const account = accountsCheck.accounts[workspaceId];
			if (account) return account.account.account_id;
		}
		return null;
	}
	function isImageAssetPointer(part) {
		if (typeof part !== "object" || part === null) return false;
		const candidate = part;
		return candidate.content_type === "image_asset_pointer" && typeof candidate.asset_pointer === "string" && typeof candidate.fovea === "number" && typeof candidate.height === "number" && typeof candidate.size_bytes === "number" && typeof candidate.width === "number" && candidate.asset_pointer.startsWith("file-service://");
	}
	function getReferencedFileId(ref) {
		return ref.file_id || ref.cite_key || null;
	}
	function getFileSourceReferences(metadata, fileId) {
		return metadata?.content_references_by_file?.[fileId] ?? metadata?.n7jupd_crefs_by_file?.[fileId] ?? [];
	}
	async function fetchFileDownloadDetails(fileId, options = {}) {
		try {
			const primaryDetails = await fetchApi(getFileDownloadApiUrl(fileId, { conversationId: options.conversationId }));
			if (primaryDetails.status === "success") return primaryDetails;
		} catch {}
		return fetchApi(getLegacyFileDownloadApiUrl(fileId));
	}
	async function fetchImageFromPointer(uri) {
		const imageDetails = await fetchFileDownloadDetails(uri.replace("file-service://", ""));
		if (imageDetails.status === "error") {
			console.error("Failed to fetch image asset", imageDetails.error_code, imageDetails.error_message);
			return null;
		}
		const image = await fetch(imageDetails.download_url);
		return (await blobToDataURL(await image.blob())).replace(/^data:.*?;/, `data:${image.headers.get("content-type")};`);
	}
	function isInlineableTextFile(fileName, contentType) {
		const lowerFileName = fileName.toLowerCase();
		const lowerContentType = contentType?.toLowerCase() ?? "";
		return lowerContentType.startsWith("text/") || lowerContentType.includes("markdown") || lowerFileName.endsWith(".md") || lowerFileName.endsWith(".markdown");
	}
	function escapeMarkdownLinkText(input) {
		return input.replaceAll("\\", "\\\\").replaceAll("[", "\\[").replaceAll("]", "\\]");
	}
	function escapeMarkdownUrl(input) {
		return input.replaceAll(">", "%3E").replaceAll("\n", "");
	}
	function getSourceKey(ref) {
		return ref.url || ref.title || ref.matched_text || "";
	}
	function getSourceTitle(ref) {
		return (ref.title || ref.source_name || ref.attribution || ref.url || "Source").trim();
	}
	function getUniqueSources(refs) {
		const sources = [];
		const seen = new Set();
		for (const ref of refs) {
			const key = getSourceKey(ref);
			if (!key || seen.has(key)) continue;
			seen.add(key);
			sources.push(ref);
		}
		return sources;
	}
	function renderSourceLink(ref) {
		const title = escapeMarkdownLinkText(getSourceTitle(ref));
		if (!ref.url) return title;
		return `[${title}](<${escapeMarkdownUrl(ref.url)}>)`;
	}
	function isValidSourceSpan(fileText, ref) {
		return Number.isInteger(ref.start_idx) && Number.isInteger(ref.end_idx) && ref.start_idx >= 0 && ref.end_idx > ref.start_idx && ref.end_idx <= fileText.length && fileText.slice(ref.start_idx, ref.end_idx) === ref.matched_text;
	}
	function renderInlineSourceMarker(ref, sourceNumber) {
		if (ref.url) return `[[${sourceNumber}]](<${escapeMarkdownUrl(ref.url)}>)`;
		return `[${sourceNumber}]`;
	}
	function replaceSourceRefsBySpan(fileText, sourceRefs, sourceNumberByKey) {
		const spanRefs = sourceRefs.filter((ref) => {
			return ref.matched_text && sourceNumberByKey.has(getSourceKey(ref)) && isValidSourceSpan(fileText, ref);
		}).sort((a, b) => b.start_idx - a.start_idx);
		if (spanRefs.length === 0) return null;
		let content = fileText;
		for (const ref of spanRefs) {
			const sourceNumber = sourceNumberByKey.get(getSourceKey(ref));
			if (!sourceNumber) continue;
			content = [
				content.slice(0, ref.start_idx),
				renderInlineSourceMarker(ref, sourceNumber),
				content.slice(ref.end_idx)
			].join("");
		}
		return content;
	}
	function replaceSourceRefsByMarker(fileText, sourceRefs, sourceNumberByKey) {
		const sortedRefs = [...sourceRefs].sort((a, b) => (b.matched_text?.length || 0) - (a.matched_text?.length || 0));
		let content = fileText;
		for (const ref of sortedRefs) {
			if (!ref.matched_text) continue;
			const sourceNumber = sourceNumberByKey.get(getSourceKey(ref));
			if (!sourceNumber) continue;
			content = content.replaceAll(ref.matched_text, renderInlineSourceMarker(ref, sourceNumber));
		}
		return content;
	}
	function renderFileContentWithSources(fileText, fileName, sourceRefs) {
		const sources = getUniqueSources(sourceRefs.filter((ref) => ref.type === "webpage_extended" && getSourceKey(ref)));
		if (sources.length === 0) return fileText;
		const sourceNumberByKey = new Map(sources.map((source, index) => [getSourceKey(source), index + 1]));
		return `${replaceSourceRefsBySpan(fileText, sourceRefs, sourceNumberByKey) ?? replaceSourceRefsByMarker(fileText, sourceRefs, sourceNumberByKey)}\n\n### Sources for ${fileName}\n\n${sources.map((source, index) => `${index + 1}. ${renderSourceLink(source)}`).join("\n")}`;
	}
	async function fetchGeneratedTextFile(fileRef, sourceRefs, options = {}) {
		const fileId = getReferencedFileId(fileRef);
		if (!fileId) return null;
		const fileDetails = await fetchFileDownloadDetails(fileId, options);
		if (fileDetails.status === "error") {
			console.error("Failed to fetch generated file", fileDetails.error_code, fileDetails.error_message);
			return null;
		}
		const fileResponse = await fetch(fileDetails.download_url);
		if (!fileResponse.ok) {
			console.error("Failed to download generated file", fileResponse.status, fileResponse.statusText);
			return null;
		}
		const contentType = fileResponse.headers.get("content-type") || fileDetails.mime_type || null;
		if (!isInlineableTextFile(fileDetails.file_name, contentType)) return null;
		return renderFileContentWithSources(await fileResponse.text(), fileDetails.file_name, sourceRefs);
	}
	async function replaceGeneratedFileReferences(message, options = {}) {
		if (message.content.content_type !== "text") return;
		const fileRefs = message.metadata?.n7jupd_crefs?.filter((ref) => {
			return ref.type === "file" && !!ref.matched_text && !!getReferencedFileId(ref);
		}) ?? [];
		if (fileRefs.length === 0) return;
		for (const fileRef of fileRefs) try {
			const fileId = getReferencedFileId(fileRef);
			const matchedText = fileRef.matched_text;
			if (!fileId || !matchedText) continue;
			const fileText = await fetchGeneratedTextFile(fileRef, getFileSourceReferences(message.metadata, fileId), options);
			if (!fileText) continue;
			message.content.parts = message.content.parts.map((part) => part.replaceAll(matchedText, fileText));
		} catch (error) {
			console.error("Failed to inline generated file", error);
		}
	}
	async function inlineGeneratedTextFiles(conversation, options = {}) {
		const messages = Object.values(conversation.mapping).map((node) => node.message).filter((message) => !!message);
		await Promise.all(messages.map((message) => replaceGeneratedFileReferences(message, options)));
	}
	async function replaceImageAssets(conversation, options = {}) {
		const imageAssets = Object.values(conversation.mapping).flatMap((node) => {
			if (!node.message) return [];
			if (node.message.content.content_type !== "multimodal_text") return [];
			return (Array.isArray(node.message.content.parts) ? node.message.content.parts : []).filter((part) => isImageAssetPointer(part));
		});
		const executionOutputs = Object.values(conversation.mapping).flatMap((node) => {
			if (!node.message) return [];
			if (node.message.content.content_type !== "execution_output") return [];
			if (!node.message.metadata?.aggregate_result?.messages) return [];
			return node.message.metadata.aggregate_result.messages.filter((msg) => msg.message_type === "image");
		});
		await Promise.all([
			inlineGeneratedTextFiles(conversation, options),
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
		if (!currentShareId) return null;
		return getConversationFromSharePage() ? currentShareId : null;
	}
	function getShareConversationId(chatId) {
		if (chatId.startsWith("__share__")) return chatId.replace("__share__", "");
		const currentShareId = getCurrentShareConversationId();
		return currentShareId === chatId ? currentShareId : null;
	}
	async function getCurrentChatId() {
		const currentShareConversationId = getCurrentShareConversationId();
		if (currentShareConversationId) return `__share__${currentShareConversationId}`;
		const chatId = getChatIdFromUrl();
		if (chatId) return chatId;
		const conversations = await fetchConversations();
		if (conversations && conversations.items.length > 0) return conversations.items[0].id;
		throw new Error("No chat id found.");
	}
	async function fetchConversation(chatId, shouldReplaceAssets) {
		const shareConversationId = getShareConversationId(chatId);
		if (shareConversationId) {
			const shareConversation = getConversationFromSharePage();
			if (!shareConversation) throw new Error(`Shared conversation data was not found for id: ${shareConversationId}`);
			if (shouldReplaceAssets) await replaceImageAssets(shareConversation, { conversationId: shareConversation.conversation_id ?? shareConversationId });
			return {
				id: shareConversationId,
				...shareConversation
			};
		}
		const conversation = await fetchApi(getConversationApiUrl(chatId));
		if (shouldReplaceAssets) await replaceImageAssets(conversation, { conversationId: conversation.conversation_id ?? chatId });
		return {
			id: chatId,
			...conversation
		};
	}
	async function fetchProjects() {
		const { items } = await fetchApi(getProjectsApiUrl());
		return items.map((gizmo) => gizmo.gizmo.gizmo);
	}
	async function fetchConversations(offset = 0, limit = 20, project = null) {
		if (project) return fetchProjectConversations(project, offset, limit);
		return fetchApi(getConversationsApiUrl(offset, limit));
	}
	async function fetchProjectConversations(project, offset = 0, limit = 20) {
		const { items } = await fetchApi(getProjectConversationsApiUrl(project, offset, limit));
		return {
			has_missing_conversations: false,
			items,
			limit,
			offset,
			total: null
		};
	}
	async function fetchAllConversations(project = null, maxConversations = 1e3) {
		const conversations = [];
		const limit = project === null ? 100 : 50;
		let offset = 0;
		while (true) try {
			const result = project === null ? await fetchConversations(offset, limit) : await fetchProjectConversations(project, offset, limit);
			if (!result.items) {
				console.warn("fetchAllConversations received no items at offset:", offset);
				break;
			}
			conversations.push(...result.items);
			if (result.items.length === 0) break;
			if (result.total !== null && offset + limit >= result.total) break;
			if (conversations.length >= maxConversations) break;
			offset += limit;
		} catch (error) {
			console.error("Error fetching conversations batch:", error);
			break;
		}
		return conversations.slice(0, maxConversations);
	}
	async function archiveConversation(chatId) {
		const { success } = await fetchApi(getConversationApiUrl(chatId), {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ is_archived: true })
		});
		return success;
	}
	async function deleteConversation(chatId) {
		const { success } = await fetchApi(getConversationApiUrl(chatId), {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ is_visible: false })
		});
		return success;
	}
	var MODEL_MAPPING = {
		"text-davinci-002-render-sha": "GPT-3.5",
		"text-davinci-002-render-paid": "GPT-3.5",
		"text-davinci-002-browse": "GPT-3.5",
		"gpt-4": "GPT-4",
		"gpt-4-browsing": "GPT-4 (Browser)",
		"gpt-4o": "GPT-4o",
		"text-davinci-002": "GPT-3.5"
	};
	function processConversation(conversation) {
		const title = conversation.title || "ChatGPT Conversation";
		const createTime = conversation.create_time;
		const updateTime = conversation.update_time;
		const { model, modelSlug } = extractModel(conversation.mapping);
		const startNodeId = conversation.current_node || Object.values(conversation.mapping).find((node) => !node.children || node.children.length === 0)?.id;
		if (!startNodeId) throw new Error("Failed to find start node.");
		const mergedConversationNodes = mergeContinuationNodes(extractConversationResult(conversation.mapping, startNodeId));
		return {
			id: conversation.id,
			title,
			model,
			modelSlug,
			createTime,
			updateTime,
			conversationNodes: mergedConversationNodes
		};
	}
	function extractModel(conversationMapping) {
		let model = "";
		const modelSlug = Object.values(conversationMapping).find((node) => node.message?.metadata?.model_slug)?.message?.metadata?.model_slug || "";
		if (modelSlug) if (MODEL_MAPPING[modelSlug]) model = MODEL_MAPPING[modelSlug];
		else Object.keys(MODEL_MAPPING).forEach((key) => {
			if (modelSlug.startsWith(key)) model = key;
		});
		return {
			model,
			modelSlug
		};
	}
	function extractConversationResult(conversationMapping, startNodeId) {
		const result = [];
		let currentNodeId = startNodeId;
		while (currentNodeId) {
			const node = conversationMapping[currentNodeId];
			if (!node) break;
			if (node.parent === void 0) break;
			if (node.message?.author.role !== "system" && node.message?.content.content_type !== "model_editable_context" && node.message?.content.content_type !== "user_editable_context") result.unshift(node);
			currentNodeId = node.parent;
		}
		return result;
	}
	function mergeContinuationNodes(nodes) {
		const result = [];
		for (const node of nodes) {
			const prevNode = result[result.length - 1];
			if (prevNode?.message?.author.role === "assistant" && node.message?.author.role === "assistant" && prevNode.message.recipient === "all" && node.message.recipient === "all" && prevNode.message.content.content_type === "text" && node.message.content.content_type === "text") {
				prevNode.message.content.parts[prevNode.message.content.parts.length - 1] += node.message.content.parts[0];
				prevNode.message.content.parts.push(...node.message.content.parts.slice(1));
			} else result.push(node);
		}
		return result;
	}
	var DEFAULT_SECURITY_FINDINGS_PAGE_SIZE = 100;
	async function fetchSecurityFindings(params = {}) {
		return fetchApi(getSecurityFindingsApiUrl(params));
	}
	async function fetchAllSecurityFindings(params = {}, options = {}) {
		const pageSize = params.limit ?? DEFAULT_SECURITY_FINDINGS_PAGE_SIZE;
		const maxItems = options.maxItems;
		const items = [];
		const seenCursors = new Set();
		const seenFindingIds = new Set();
		let cursor = 0;
		while (cursor !== null && (maxItems === void 0 || items.length < maxItems)) {
			const cursorKey = String(cursor);
			if (seenCursors.has(cursorKey)) throw new Error(`Security findings pagination repeated cursor ${cursorKey}.`);
			seenCursors.add(cursorKey);
			const remaining = maxItems === void 0 ? pageSize : Math.min(pageSize, Math.max(maxItems - items.length, 0));
			const response = await fetchSecurityFindings({
				...params,
				limit: remaining,
				cursor
			});
			response.items.forEach((item) => {
				const findingKey = item.hid || item.id;
				if (!findingKey || seenFindingIds.has(findingKey)) return;
				seenFindingIds.add(findingKey);
				items.push(item);
			});
			cursor = response.next_cursor;
		}
		return maxItems === void 0 ? items : items.slice(0, maxItems);
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
		if (typeof projectOverview !== "string" || projectOverview.trim() === "") return null;
		try {
			const parsed = JSON.parse(projectOverview);
			if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
			const value = parsed;
			const { threat_model: _rawThreatModel, focus_files_and_dirs: _rawFocusFilesAndDirs, ...rest } = value;
			const threatModel = typeof value.threat_model === "string" && value.threat_model.trim() !== "" ? value.threat_model.trim() : void 0;
			const focusFilesAndDirs = Array.isArray(value.focus_files_and_dirs) ? value.focus_files_and_dirs.filter((item) => {
				if (typeof item === "string") return item.trim() !== "";
				if (!item || typeof item !== "object" || Array.isArray(item)) return false;
				const record = item;
				return typeof record.path === "string" && record.path.trim() !== "" && (record.focus_reason === void 0 || typeof record.focus_reason === "string");
			}).map((item) => {
				if (typeof item === "string") return item.trim();
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
		if (preferredConfiguredScanId) try {
			const preferredScan = await fetchSecurityScan(preferredConfiguredScanId);
			if (preferredScan.scan_input.repo_id !== repoId) throw new Error(`Preferred scan ${preferredConfiguredScanId} does not belong to repo ${repoId}.`);
			return {
				configuredScanId: preferredScan.id,
				source: "preferred"
			};
		} catch (error) {
			if (!isRecoverablePreferredScanLookupError(error)) throw error;
		}
		const response = await fetchSecurityScanConfigurations({
			repoId,
			limit
		});
		const matchingScans = response.items.filter((scan) => scan.scan_input.repo_id === repoId);
		if (response.next_cursor !== null) throw new Error(`Multiple scan configurations exist for repo ${repoId}; pagination was required.`);
		if (matchingScans.length === 0) throw new Error(`No scan configuration found for repo ${repoId}.`);
		if (matchingScans.length > 1) throw new Error(`Multiple scan configurations found for repo ${repoId}.`);
		return {
			configuredScanId: matchingScans[0].id,
			source: "list"
		};
	}
	function isRecoverablePreferredScanLookupError(error) {
		return error instanceof ApiHttpError && (error.status === 403 || error.status === 404);
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
		if (!target.isConnected || !record.container.isConnected || !target.contains(record.container)) return false;
		switch (record.kind) {
			case "conversation-nav": return pageContext.kind === "conversation" && !pageContext.isSharePage && !pageContext.isShareContinuePage;
			case "share-wrapper": return pageContext.isSharePage;
			case "security-sidebar": return pageContext.kind === "security-finding" || pageContext.kind === "security-scan" || pageContext.kind === "security-findings-list";
		}
	}
	function hasSecuritySidebarMarker(element) {
		return element.style.getPropertyValue("--codex-security-left-pane-width") !== "" || element.getAttribute("style")?.includes("--codex-security-left-pane-width") === true;
	}
	function isLikelySecuritySidebar(element) {
		return element instanceof HTMLElement && element.tagName === "ASIDE" && hasSecuritySidebarMarker(element);
	}
	function findSecuritySidebarMountTarget(root = document) {
		const siblingSidebar = root.querySelector("[role=\"separator\"][aria-label=\"Resize repository pane\"]")?.previousElementSibling ?? null;
		if (isLikelySecuritySidebar(siblingSidebar)) return siblingSidebar;
		const markedSidebar = Array.from(root.querySelectorAll("aside")).find(isLikelySecuritySidebar);
		if (markedSidebar) return markedSidebar;
		return null;
	}
	var SECURITY_ROUTE_PREFIX = "/codex(?:/cloud)?/security";
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
		if (shareContinueMatch) return createPageContext({
			kind: "conversation",
			chatId: shareContinueMatch[1],
			isShareContinuePage: true
		});
		const shareMatch = pathname.match(/^\/share\/([a-z0-9-]+)$/i);
		if (shareMatch) return createPageContext({
			kind: "conversation",
			chatId: shareMatch[1],
			isSharePage: true
		});
		const conversationMatch = pathname.match(/^\/(?:c|g\/[a-z0-9-]+\/c)\/([a-z0-9-]+)/i);
		if (conversationMatch) return createPageContext({
			kind: "conversation",
			chatId: conversationMatch[1]
		});
		const securityFindingMatch = pathname.match(new RegExp(`^${SECURITY_ROUTE_PREFIX}/findings/([a-z0-9]+)/?$`, "i"));
		if (securityFindingMatch) return createPageContext({
			kind: "security-finding",
			findingId: securityFindingMatch[1]
		});
		const securityScanMatch = pathname.match(new RegExp(`^${SECURITY_ROUTE_PREFIX}/scans/([a-z0-9-]+)/?$`, "i"));
		if (securityScanMatch) return createPageContext({
			kind: "security-scan",
			repoId: securityScanMatch[1]
		});
		if (new RegExp(`^${SECURITY_ROUTE_PREFIX}/findings/?$`, "i").test(pathname)) return createPageContext({ kind: "security-findings-list" });
		return createPageContext({});
	}
	function isConversationPageContext(context) {
		return context.kind === "conversation";
	}
	function isSecurityExportPageContext(context) {
		return context.kind === "security-finding" || context.kind === "security-scan";
	}
	function isSecurityMenuPageContext(context) {
		return isSecurityExportPageContext(context) || context.kind === "security-findings-list";
	}
	var isString$1 = (obj) => typeof obj === "string";
	var defer = () => {
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
	var makeString = (object) => {
		if (object == null) return "";
		return String(object);
	};
	var copy = (a, s, t) => {
		a.forEach((m) => {
			if (s[m]) t[m] = s[m];
		});
	};
	var lastOfPathSeparatorRegExp = /###/g;
	var cleanKey = (key) => key && key.includes("###") ? key.replace(lastOfPathSeparatorRegExp, ".") : key;
	var canNotTraverseDeeper = (object) => !object || isString$1(object);
	var getLastOfPath = (object, path, Empty) => {
		const stack = !isString$1(path) ? path : path.split(".");
		let stackIndex = 0;
		while (stackIndex < stack.length - 1) {
			if (canNotTraverseDeeper(object)) return {};
			const key = cleanKey(stack[stackIndex]);
			if (!object[key] && Empty) object[key] = new Empty();
			if (Object.prototype.hasOwnProperty.call(object, key)) object = object[key];
			else object = {};
			++stackIndex;
		}
		if (canNotTraverseDeeper(object)) return {};
		return {
			obj: object,
			k: cleanKey(stack[stackIndex])
		};
	};
	var setPath = (object, path, newValue) => {
		const { obj, k } = getLastOfPath(object, path, Object);
		if (obj !== void 0 || path.length === 1) {
			obj[k] = newValue;
			return;
		}
		let e = path[path.length - 1];
		let p = path.slice(0, path.length - 1);
		let last = getLastOfPath(object, p, Object);
		while (last.obj === void 0 && p.length) {
			e = `${p[p.length - 1]}.${e}`;
			p = p.slice(0, p.length - 1);
			last = getLastOfPath(object, p, Object);
			if (last?.obj && typeof last.obj[`${last.k}.${e}`] !== "undefined") last.obj = void 0;
		}
		last.obj[`${last.k}.${e}`] = newValue;
	};
	var pushPath = (object, path, newValue, concat) => {
		const { obj, k } = getLastOfPath(object, path, Object);
		obj[k] = obj[k] || [];
		obj[k].push(newValue);
	};
	var getPath = (object, path) => {
		const { obj, k } = getLastOfPath(object, path);
		if (!obj) return void 0;
		if (!Object.prototype.hasOwnProperty.call(obj, k)) return void 0;
		return obj[k];
	};
	var getPathWithDefaults = (data, defaultData, key) => {
		const value = getPath(data, key);
		if (value !== void 0) return value;
		return getPath(defaultData, key);
	};
	var deepExtend = (target, source, overwrite) => {
		for (const prop in source) if (prop !== "__proto__" && prop !== "constructor") if (prop in target) if (isString$1(target[prop]) || target[prop] instanceof String || isString$1(source[prop]) || source[prop] instanceof String) {
			if (overwrite) target[prop] = source[prop];
		} else deepExtend(target[prop], source[prop], overwrite);
		else target[prop] = source[prop];
		return target;
	};
	var regexEscape = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	var _entityMap = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;",
		"/": "&#x2F;"
	};
	var escape = (data) => {
		if (isString$1(data)) return data.replace(/[&<>"'\/]/g, (s) => _entityMap[s]);
		return data;
	};
	var RegExpCache = class {
		constructor(capacity) {
			this.capacity = capacity;
			this.regExpMap = new Map();
			this.regExpQueue = [];
		}
		getRegExp(pattern) {
			const regExpFromCache = this.regExpMap.get(pattern);
			if (regExpFromCache !== void 0) return regExpFromCache;
			const regExpNew = new RegExp(pattern);
			if (this.regExpQueue.length === this.capacity) this.regExpMap.delete(this.regExpQueue.shift());
			this.regExpMap.set(pattern, regExpNew);
			this.regExpQueue.push(pattern);
			return regExpNew;
		}
	};
	var chars = [
		" ",
		",",
		"?",
		"!",
		";"
	];
	var looksLikeObjectPathRegExpCache = new RegExpCache(20);
	var looksLikeObjectPath = (key, nsSeparator, keySeparator) => {
		nsSeparator = nsSeparator || "";
		keySeparator = keySeparator || "";
		const possibleChars = chars.filter((c) => !nsSeparator.includes(c) && !keySeparator.includes(c));
		if (possibleChars.length === 0) return true;
		const r = looksLikeObjectPathRegExpCache.getRegExp(`(${possibleChars.map((c) => c === "?" ? "\\?" : c).join("|")})`);
		let matched = !r.test(key);
		if (!matched) {
			const ki = key.indexOf(keySeparator);
			if (ki > 0 && !r.test(key.substring(0, ki))) matched = true;
		}
		return matched;
	};
	var deepFind = (obj, path, keySeparator = ".") => {
		if (!obj) return void 0;
		if (obj[path]) {
			if (!Object.prototype.hasOwnProperty.call(obj, path)) return void 0;
			return obj[path];
		}
		const tokens = path.split(keySeparator);
		let current = obj;
		for (let i = 0; i < tokens.length;) {
			if (!current || typeof current !== "object") return;
			let next;
			let nextPath = "";
			for (let j = i; j < tokens.length; ++j) {
				if (j !== i) nextPath += keySeparator;
				nextPath += tokens[j];
				next = current[nextPath];
				if (next !== void 0) {
					if ([
						"string",
						"number",
						"boolean"
					].includes(typeof next) && j < tokens.length - 1) continue;
					i += j - i + 1;
					break;
				}
			}
			current = next;
		}
		return current;
	};
	var getCleanedCode = (code) => code?.replace(/_/g, "-");
	var consoleLogger = {
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
	var baseLogger = new class Logger {
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
			args = args.map((a) => isString$1(a) ? a.replace(/[\r\n\x00-\x1F\x7F]/g, " ") : a);
			if (isString$1(args[0])) args[0] = `${prefix}${this.prefix} ${args[0]}`;
			return this.logger[lvl](args);
		}
		create(moduleName) {
			return new Logger(this.logger, {
				prefix: `${this.prefix}:${moduleName}:`,
				...this.options
			});
		}
		clone(options) {
			options = options || this.options;
			options.prefix = options.prefix || this.prefix;
			return new Logger(this.logger, options);
		}
	}();
	var EventEmitter = class {
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
		once(event, listener) {
			const wrapper = (...args) => {
				listener(...args);
				this.off(event, wrapper);
			};
			this.on(event, wrapper);
			return this;
		}
		emit(event, ...args) {
			if (this.observers[event]) Array.from(this.observers[event].entries()).forEach(([observer, numTimesAdded]) => {
				for (let i = 0; i < numTimesAdded; i++) observer(...args);
			});
			if (this.observers["*"]) Array.from(this.observers["*"].entries()).forEach(([observer, numTimesAdded]) => {
				for (let i = 0; i < numTimesAdded; i++) observer(event, ...args);
			});
		}
	};
	var ResourceStore = class extends EventEmitter {
		constructor(data, options = {
			ns: ["translation"],
			defaultNS: "translation"
		}) {
			super();
			this.data = data || {};
			this.options = options;
			if (this.options.keySeparator === void 0) this.options.keySeparator = ".";
			if (this.options.ignoreJSONStructure === void 0) this.options.ignoreJSONStructure = true;
		}
		addNamespaces(ns) {
			if (!this.options.ns.includes(ns)) this.options.ns.push(ns);
		}
		removeNamespaces(ns) {
			const index = this.options.ns.indexOf(ns);
			if (index > -1) this.options.ns.splice(index, 1);
		}
		getResource(lng, ns, key, options = {}) {
			const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
			const ignoreJSONStructure = options.ignoreJSONStructure !== void 0 ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
			let path;
			if (lng.includes(".")) path = lng.split(".");
			else {
				path = [lng, ns];
				if (key) if (Array.isArray(key)) path.push(...key);
				else if (isString$1(key) && keySeparator) path.push(...key.split(keySeparator));
				else path.push(key);
			}
			const result = getPath(this.data, path);
			if (!result && !ns && !key && lng.includes(".")) {
				lng = path[0];
				ns = path[1];
				key = path.slice(2).join(".");
			}
			if (result || !ignoreJSONStructure || !isString$1(key)) return result;
			return deepFind(this.data?.[lng]?.[ns], key, keySeparator);
		}
		addResource(lng, ns, key, value, options = { silent: false }) {
			const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
			let path = [lng, ns];
			if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
			if (lng.includes(".")) {
				path = lng.split(".");
				value = ns;
				ns = path[1];
			}
			this.addNamespaces(ns);
			setPath(this.data, path, value);
			if (!options.silent) this.emit("added", lng, ns, key, value);
		}
		addResources(lng, ns, resources, options = { silent: false }) {
			for (const m in resources) if (isString$1(resources[m]) || Array.isArray(resources[m])) this.addResource(lng, ns, m, resources[m], { silent: true });
			if (!options.silent) this.emit("added", lng, ns, resources);
		}
		addResourceBundle(lng, ns, resources, deep, overwrite, options = {
			silent: false,
			skipCopy: false
		}) {
			let path = [lng, ns];
			if (lng.includes(".")) {
				path = lng.split(".");
				deep = resources;
				resources = ns;
				ns = path[1];
			}
			this.addNamespaces(ns);
			let pack = getPath(this.data, path) || {};
			if (!options.skipCopy) resources = JSON.parse(JSON.stringify(resources));
			if (deep) deepExtend(pack, resources, overwrite);
			else pack = {
				...pack,
				...resources
			};
			setPath(this.data, path, pack);
			if (!options.silent) this.emit("added", lng, ns, resources);
		}
		removeResourceBundle(lng, ns) {
			if (this.hasResourceBundle(lng, ns)) delete this.data[lng][ns];
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
			return !!(data && Object.keys(data) || []).find((v) => data[v] && Object.keys(data[v]).length > 0);
		}
		toJSON() {
			return this.data;
		}
	};
	var postProcessor = {
		processors: {},
		addPostProcessor(module) {
			this.processors[module.name] = module;
		},
		handle(processors, value, key, options, translator) {
			processors.forEach((processor) => {
				value = this.processors[processor]?.process(value, key, options, translator) ?? value;
			});
			return value;
		}
	};
	var PATH_KEY = Symbol("i18next/PATH_KEY");
	function createProxy() {
		const state = [];
		const handler = Object.create(null);
		let proxy;
		handler.get = (target, key) => {
			proxy?.revoke?.();
			if (key === PATH_KEY) return state;
			state.push(key);
			proxy = Proxy.revocable(target, handler);
			return proxy.proxy;
		};
		return Proxy.revocable(Object.create(null), handler).proxy;
	}
	function keysFromSelector(selector, opts) {
		const { [PATH_KEY]: path } = selector(createProxy());
		const keySeparator = opts?.keySeparator ?? ".";
		const nsSeparator = opts?.nsSeparator ?? ":";
		if (path.length > 1 && nsSeparator) {
			const ns = opts?.ns;
			const nsArray = Array.isArray(ns) ? ns : null;
			if (nsArray && nsArray.length > 1 && nsArray.slice(1).includes(path[0])) return `${path[0]}${nsSeparator}${path.slice(1).join(keySeparator)}`;
		}
		return path.join(keySeparator);
	}
	var shouldHandleAsObject = (res) => !isString$1(res) && typeof res !== "boolean" && typeof res !== "number";
	var Translator = class Translator extends EventEmitter {
		constructor(services, options = {}) {
			super();
			copy([
				"resourceStore",
				"languageUtils",
				"pluralResolver",
				"interpolator",
				"backendConnector",
				"i18nFormat",
				"utils"
			], services, this);
			this.options = options;
			if (this.options.keySeparator === void 0) this.options.keySeparator = ".";
			this.logger = baseLogger.create("translator");
			this.checkedLoadedFor = {};
		}
		changeLanguage(lng) {
			if (lng) this.language = lng;
		}
		exists(key, o = { interpolation: {} }) {
			const opt = { ...o };
			if (key == null) return false;
			const resolved = this.resolve(key, opt);
			if (resolved?.res === void 0) return false;
			const isObject = shouldHandleAsObject(resolved.res);
			if (opt.returnObjects === false && isObject) return false;
			return true;
		}
		extractFromKey(key, opt) {
			let nsSeparator = opt.nsSeparator !== void 0 ? opt.nsSeparator : this.options.nsSeparator;
			if (nsSeparator === void 0) nsSeparator = ":";
			const keySeparator = opt.keySeparator !== void 0 ? opt.keySeparator : this.options.keySeparator;
			let namespaces = opt.ns || this.options.defaultNS || [];
			const wouldCheckForNsInKey = nsSeparator && key.includes(nsSeparator);
			const seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !opt.keySeparator && !this.options.userDefinedNsSeparator && !opt.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
			if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
				const m = key.match(this.interpolator.nestingRegexp);
				if (m && m.length > 0) return {
					key,
					namespaces: isString$1(namespaces) ? [namespaces] : namespaces
				};
				const parts = key.split(nsSeparator);
				if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.includes(parts[0])) namespaces = parts.shift();
				key = parts.join(keySeparator);
			}
			return {
				key,
				namespaces: isString$1(namespaces) ? [namespaces] : namespaces
			};
		}
		translate(keys, o, lastKey) {
			let opt = typeof o === "object" ? { ...o } : o;
			if (typeof opt !== "object" && this.options.overloadTranslationOptionHandler) opt = this.options.overloadTranslationOptionHandler(arguments);
			if (typeof opt === "object") opt = { ...opt };
			if (!opt) opt = {};
			if (keys == null) return "";
			if (typeof keys === "function") keys = keysFromSelector(keys, {
				...this.options,
				...opt
			});
			if (!Array.isArray(keys)) keys = [String(keys)];
			keys = keys.map((k) => typeof k === "function" ? keysFromSelector(k, {
				...this.options,
				...opt
			}) : String(k));
			const returnDetails = opt.returnDetails !== void 0 ? opt.returnDetails : this.options.returnDetails;
			const keySeparator = opt.keySeparator !== void 0 ? opt.keySeparator : this.options.keySeparator;
			const { key, namespaces } = this.extractFromKey(keys[keys.length - 1], opt);
			const namespace = namespaces[namespaces.length - 1];
			let nsSeparator = opt.nsSeparator !== void 0 ? opt.nsSeparator : this.options.nsSeparator;
			if (nsSeparator === void 0) nsSeparator = ":";
			const lng = opt.lng || this.language;
			const appendNamespaceToCIMode = opt.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
			if (lng?.toLowerCase() === "cimode") {
				if (appendNamespaceToCIMode) {
					if (returnDetails) return {
						res: `${namespace}${nsSeparator}${key}`,
						usedKey: key,
						exactUsedKey: key,
						usedLng: lng,
						usedNS: namespace,
						usedParams: this.getUsedParamsDetails(opt)
					};
					return `${namespace}${nsSeparator}${key}`;
				}
				if (returnDetails) return {
					res: key,
					usedKey: key,
					exactUsedKey: key,
					usedLng: lng,
					usedNS: namespace,
					usedParams: this.getUsedParamsDetails(opt)
				};
				return key;
			}
			const resolved = this.resolve(keys, opt);
			let res = resolved?.res;
			const resUsedKey = resolved?.usedKey || key;
			const resExactUsedKey = resolved?.exactUsedKey || key;
			const noObject = [
				"[object Number]",
				"[object Function]",
				"[object RegExp]"
			];
			const joinArrays = opt.joinArrays !== void 0 ? opt.joinArrays : this.options.joinArrays;
			const handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
			const needsPluralHandling = opt.count !== void 0 && !isString$1(opt.count);
			const hasDefaultValue = Translator.hasDefaultValue(opt);
			const defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, opt) : "";
			const defaultValueSuffixOrdinalFallback = opt.ordinal && needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, { ordinal: false }) : "";
			const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
			const defaultValue = needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] || opt[`defaultValue${defaultValueSuffix}`] || opt[`defaultValue${defaultValueSuffixOrdinalFallback}`] || opt.defaultValue;
			let resForObjHndl = res;
			if (handleAsObjectInI18nFormat && !res && hasDefaultValue) resForObjHndl = defaultValue;
			const handleAsObject = shouldHandleAsObject(resForObjHndl);
			const resType = Object.prototype.toString.apply(resForObjHndl);
			if (handleAsObjectInI18nFormat && resForObjHndl && handleAsObject && !noObject.includes(resType) && !(isString$1(joinArrays) && Array.isArray(resForObjHndl))) {
				if (!opt.returnObjects && !this.options.returnObjects) {
					if (!this.options.returnedObjectHandler) this.logger.warn("accessing an object - but returnObjects options is not enabled!");
					const r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, resForObjHndl, {
						...opt,
						ns: namespaces
					}) : `key '${key} (${this.language})' returned an object instead of string.`;
					if (returnDetails) {
						resolved.res = r;
						resolved.usedParams = this.getUsedParamsDetails(opt);
						return resolved;
					}
					return r;
				}
				if (keySeparator) {
					const resTypeIsArray = Array.isArray(resForObjHndl);
					const copy = resTypeIsArray ? [] : {};
					const newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
					for (const m in resForObjHndl) if (Object.prototype.hasOwnProperty.call(resForObjHndl, m)) {
						const deepKey = `${newKeyToUse}${keySeparator}${m}`;
						if (hasDefaultValue && !res) copy[m] = this.translate(deepKey, {
							...opt,
							defaultValue: shouldHandleAsObject(defaultValue) ? defaultValue[m] : void 0,
							joinArrays: false,
							ns: namespaces
						});
						else copy[m] = this.translate(deepKey, {
							...opt,
							joinArrays: false,
							ns: namespaces
						});
						if (copy[m] === deepKey) copy[m] = resForObjHndl[m];
					}
					res = copy;
				}
			} else if (handleAsObjectInI18nFormat && isString$1(joinArrays) && Array.isArray(res)) {
				res = res.join(joinArrays);
				if (res) res = this.extendTranslation(res, keys, opt, lastKey);
			} else {
				let usedDefault = false;
				let usedKey = false;
				if (!this.isValidLookup(res) && hasDefaultValue) {
					usedDefault = true;
					res = defaultValue;
				}
				if (!this.isValidLookup(res)) {
					usedKey = true;
					res = key;
				}
				const resForMissing = (opt.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && usedKey ? void 0 : res;
				const updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
				if (usedKey || usedDefault || updateMissing) {
					this.logger.log(updateMissing ? "updateKey" : "missingKey", lng, namespace, needsPluralHandling && !updateMissing ? `${key}${this.pluralResolver.getSuffix(lng, opt.count, opt)}` : key, updateMissing ? defaultValue : res);
					if (keySeparator) {
						const fk = this.resolve(key, {
							...opt,
							keySeparator: false
						});
						if (fk && fk.res) this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
					}
					let lngs = [];
					const fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, opt.lng || this.language);
					if (this.options.saveMissingTo === "fallback" && fallbackLngs && fallbackLngs[0]) for (let i = 0; i < fallbackLngs.length; i++) lngs.push(fallbackLngs[i]);
					else if (this.options.saveMissingTo === "all") lngs = this.languageUtils.toResolveHierarchy(opt.lng || this.language);
					else lngs.push(opt.lng || this.language);
					const send = (l, k, specificDefaultValue) => {
						const defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
						if (this.options.missingKeyHandler) this.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, opt);
						else if (this.backendConnector?.saveMissing) this.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, opt);
						this.emit("missingKey", l, namespace, k, res);
					};
					if (this.options.saveMissing) if (this.options.saveMissingPlurals && needsPluralHandling) lngs.forEach((language) => {
						const suffixes = this.pluralResolver.getSuffixes(language, opt);
						if (needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] && !suffixes.includes(`${this.options.pluralSeparator}zero`)) suffixes.push(`${this.options.pluralSeparator}zero`);
						suffixes.forEach((suffix) => {
							send([language], key + suffix, opt[`defaultValue${suffix}`] || defaultValue);
						});
					});
					else send(lngs, key, defaultValue);
				}
				res = this.extendTranslation(res, keys, opt, resolved, lastKey);
				if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = `${namespace}${nsSeparator}${key}`;
				if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${namespace}${nsSeparator}${key}` : key, usedDefault ? res : void 0, opt);
			}
			if (returnDetails) {
				resolved.res = res;
				resolved.usedParams = this.getUsedParamsDetails(opt);
				return resolved;
			}
			return res;
		}
		extendTranslation(res, key, opt, resolved, lastKey) {
			if (this.i18nFormat?.parse) res = this.i18nFormat.parse(res, {
				...this.options.interpolation.defaultVariables,
				...opt
			}, opt.lng || this.language || resolved.usedLng, resolved.usedNS, resolved.usedKey, { resolved });
			else if (!opt.skipInterpolation) {
				if (opt.interpolation) this.interpolator.init({
					...opt,
					interpolation: {
						...this.options.interpolation,
						...opt.interpolation
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
						this.logger.warn(`It seems you are nesting recursively key: ${args[0]} in key: ${key[0]}`);
						return null;
					}
					return this.translate(...args, key);
				}, opt);
				if (opt.interpolation) this.interpolator.reset();
			}
			const postProcess = opt.postProcess || this.options.postProcess;
			const postProcessorNames = isString$1(postProcess) ? [postProcess] : postProcess;
			if (res != null && postProcessorNames?.length && opt.applyPostProcessor !== false) res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? {
				i18nResolved: {
					...resolved,
					usedParams: this.getUsedParamsDetails(opt)
				},
				...opt
			} : opt, this);
			return res;
		}
		resolve(keys, opt = {}) {
			let found;
			let usedKey;
			let exactUsedKey;
			let usedLng;
			let usedNS;
			if (isString$1(keys)) keys = [keys];
			if (Array.isArray(keys)) keys = keys.map((k) => typeof k === "function" ? keysFromSelector(k, {
				...this.options,
				...opt
			}) : k);
			keys.forEach((k) => {
				if (this.isValidLookup(found)) return;
				const extracted = this.extractFromKey(k, opt);
				const key = extracted.key;
				usedKey = key;
				let namespaces = extracted.namespaces;
				if (this.options.fallbackNS) namespaces = namespaces.concat(this.options.fallbackNS);
				const needsPluralHandling = opt.count !== void 0 && !isString$1(opt.count);
				const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
				const needsContextHandling = opt.context !== void 0 && (isString$1(opt.context) || typeof opt.context === "number") && opt.context !== "";
				const codes = opt.lngs ? opt.lngs : this.languageUtils.toResolveHierarchy(opt.lng || this.language, opt.fallbackLng);
				namespaces.forEach((ns) => {
					if (this.isValidLookup(found)) return;
					usedNS = ns;
					if (!this.checkedLoadedFor[`${codes[0]}-${ns}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(usedNS)) {
						this.checkedLoadedFor[`${codes[0]}-${ns}`] = true;
						this.logger.warn(`key "${usedKey}" for languages "${codes.join(", ")}" won't get resolved as namespace "${usedNS}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
					}
					codes.forEach((code) => {
						if (this.isValidLookup(found)) return;
						usedLng = code;
						const finalKeys = [key];
						if (this.i18nFormat?.addLookupKeys) this.i18nFormat.addLookupKeys(finalKeys, key, code, ns, opt);
						else {
							let pluralSuffix;
							if (needsPluralHandling) pluralSuffix = this.pluralResolver.getSuffix(code, opt.count, opt);
							const zeroSuffix = `${this.options.pluralSeparator}zero`;
							const ordinalPrefix = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
							if (needsPluralHandling) {
								if (opt.ordinal && pluralSuffix.startsWith(ordinalPrefix)) finalKeys.push(key + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
								finalKeys.push(key + pluralSuffix);
								if (needsZeroSuffixLookup) finalKeys.push(key + zeroSuffix);
							}
							if (needsContextHandling) {
								const contextKey = `${key}${this.options.contextSeparator || "_"}${opt.context}`;
								finalKeys.push(contextKey);
								if (needsPluralHandling) {
									if (opt.ordinal && pluralSuffix.startsWith(ordinalPrefix)) finalKeys.push(contextKey + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
									finalKeys.push(contextKey + pluralSuffix);
									if (needsZeroSuffixLookup) finalKeys.push(contextKey + zeroSuffix);
								}
							}
						}
						let possibleKey;
						while (possibleKey = finalKeys.pop()) if (!this.isValidLookup(found)) {
							exactUsedKey = possibleKey;
							found = this.getResource(code, ns, possibleKey, opt);
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
		getResource(code, ns, key, options = {}) {
			if (this.i18nFormat?.getResource) return this.i18nFormat.getResource(code, ns, key, options);
			return this.resourceStore.getResource(code, ns, key, options);
		}
		getUsedParamsDetails(options = {}) {
			const optionsKeys = [
				"defaultValue",
				"ordinal",
				"context",
				"replace",
				"lng",
				"lngs",
				"fallbackLng",
				"ns",
				"keySeparator",
				"nsSeparator",
				"returnObjects",
				"returnDetails",
				"joinArrays",
				"postProcess",
				"interpolation"
			];
			const useOptionsReplaceForData = options.replace && !isString$1(options.replace);
			let data = useOptionsReplaceForData ? options.replace : options;
			if (useOptionsReplaceForData && typeof options.count !== "undefined") data.count = options.count;
			if (this.options.interpolation.defaultVariables) data = {
				...this.options.interpolation.defaultVariables,
				...data
			};
			if (!useOptionsReplaceForData) {
				data = { ...data };
				for (const key of optionsKeys) delete data[key];
			}
			return data;
		}
		static hasDefaultValue(options) {
			const prefix = "defaultValue";
			for (const option in options) if (Object.prototype.hasOwnProperty.call(options, option) && option.startsWith(prefix) && void 0 !== options[option]) return true;
			return false;
		}
	};
	var LanguageUtil = class {
		constructor(options) {
			this.options = options;
			this.supportedLngs = this.options.supportedLngs || false;
			this.logger = baseLogger.create("languageUtils");
		}
		getScriptPartFromCode(code) {
			code = getCleanedCode(code);
			if (!code || !code.includes("-")) return null;
			const p = code.split("-");
			if (p.length === 2) return null;
			p.pop();
			if (p[p.length - 1].toLowerCase() === "x") return null;
			return this.formatLanguageCode(p.join("-"));
		}
		getLanguagePartFromCode(code) {
			code = getCleanedCode(code);
			if (!code || !code.includes("-")) return code;
			const p = code.split("-");
			return this.formatLanguageCode(p[0]);
		}
		formatLanguageCode(code) {
			if (isString$1(code) && code.includes("-")) {
				let formattedCode;
				try {
					formattedCode = Intl.getCanonicalLocales(code)[0];
				} catch (e) {}
				if (formattedCode && this.options.lowerCaseLng) formattedCode = formattedCode.toLowerCase();
				if (formattedCode) return formattedCode;
				if (this.options.lowerCaseLng) return code.toLowerCase();
				return code;
			}
			return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
		}
		isSupportedCode(code) {
			if (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) code = this.getLanguagePartFromCode(code);
			return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.includes(code);
		}
		getBestMatchFromCodes(codes) {
			if (!codes) return null;
			let found;
			codes.forEach((code) => {
				if (found) return;
				const cleanedLng = this.formatLanguageCode(code);
				if (!this.options.supportedLngs || this.isSupportedCode(cleanedLng)) found = cleanedLng;
			});
			if (!found && this.options.supportedLngs) codes.forEach((code) => {
				if (found) return;
				const lngScOnly = this.getScriptPartFromCode(code);
				if (this.isSupportedCode(lngScOnly)) return found = lngScOnly;
				const lngOnly = this.getLanguagePartFromCode(code);
				if (this.isSupportedCode(lngOnly)) return found = lngOnly;
				found = this.options.supportedLngs.find((supportedLng) => {
					if (supportedLng === lngOnly) return true;
					if (!supportedLng.includes("-") && !lngOnly.includes("-")) return false;
					if (supportedLng.includes("-") && !lngOnly.includes("-") && supportedLng.slice(0, supportedLng.indexOf("-")) === lngOnly) return true;
					if (supportedLng.startsWith(lngOnly) && lngOnly.length > 1) return true;
					return false;
				});
			});
			if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
			return found;
		}
		getFallbackCodes(fallbacks, code) {
			if (!fallbacks) return [];
			if (typeof fallbacks === "function") fallbacks = fallbacks(code);
			if (isString$1(fallbacks)) fallbacks = [fallbacks];
			if (Array.isArray(fallbacks)) return fallbacks;
			if (!code) return fallbacks.default || [];
			let found = fallbacks[code];
			if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
			if (!found) found = fallbacks[this.formatLanguageCode(code)];
			if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
			if (!found) found = fallbacks.default;
			return found || [];
		}
		toResolveHierarchy(code, fallbackCode) {
			const fallbackCodes = this.getFallbackCodes((fallbackCode === false ? [] : fallbackCode) || this.options.fallbackLng || [], code);
			const codes = [];
			const addCode = (c) => {
				if (!c) return;
				if (this.isSupportedCode(c)) codes.push(c);
				else this.logger.warn(`rejecting language code not found in supportedLngs: ${c}`);
			};
			if (isString$1(code) && (code.includes("-") || code.includes("_"))) {
				if (this.options.load !== "languageOnly") addCode(this.formatLanguageCode(code));
				if (this.options.load !== "languageOnly" && this.options.load !== "currentOnly") addCode(this.getScriptPartFromCode(code));
				if (this.options.load !== "currentOnly") addCode(this.getLanguagePartFromCode(code));
			} else if (isString$1(code)) addCode(this.formatLanguageCode(code));
			fallbackCodes.forEach((fc) => {
				if (!codes.includes(fc)) addCode(this.formatLanguageCode(fc));
			});
			return codes;
		}
	};
	var suffixesOrder = {
		zero: 0,
		one: 1,
		two: 2,
		few: 3,
		many: 4,
		other: 5
	};
	var dummyRule = {
		select: (count) => count === 1 ? "one" : "other",
		resolvedOptions: () => ({ pluralCategories: ["one", "other"] })
	};
	var PluralResolver = class {
		constructor(languageUtils, options = {}) {
			this.languageUtils = languageUtils;
			this.options = options;
			this.logger = baseLogger.create("pluralResolver");
			this.pluralRulesCache = {};
		}
		clearCache() {
			this.pluralRulesCache = {};
		}
		getRule(code, options = {}) {
			const cleanedCode = getCleanedCode(code === "dev" ? "en" : code);
			const type = options.ordinal ? "ordinal" : "cardinal";
			const cacheKey = JSON.stringify({
				cleanedCode,
				type
			});
			if (cacheKey in this.pluralRulesCache) return this.pluralRulesCache[cacheKey];
			let rule;
			try {
				rule = new Intl.PluralRules(cleanedCode, { type });
			} catch (err) {
				if (typeof Intl === "undefined") {
					this.logger.error("No Intl support, please use an Intl polyfill!");
					return dummyRule;
				}
				if (!code.match(/-|_/)) return dummyRule;
				const lngPart = this.languageUtils.getLanguagePartFromCode(code);
				rule = this.getRule(lngPart, options);
			}
			this.pluralRulesCache[cacheKey] = rule;
			return rule;
		}
		needsPlural(code, options = {}) {
			let rule = this.getRule(code, options);
			if (!rule) rule = this.getRule("dev", options);
			return rule?.resolvedOptions().pluralCategories.length > 1;
		}
		getPluralFormsOfKey(code, key, options = {}) {
			return this.getSuffixes(code, options).map((suffix) => `${key}${suffix}`);
		}
		getSuffixes(code, options = {}) {
			let rule = this.getRule(code, options);
			if (!rule) rule = this.getRule("dev", options);
			if (!rule) return [];
			return rule.resolvedOptions().pluralCategories.sort((pluralCategory1, pluralCategory2) => suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2]).map((pluralCategory) => `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ""}${pluralCategory}`);
		}
		getSuffix(code, count, options = {}) {
			const rule = this.getRule(code, options);
			if (rule) return `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ""}${rule.select(count)}`;
			this.logger.warn(`no plural rule found for: ${code}`);
			return this.getSuffix("dev", count, options);
		}
	};
	var deepFindWithDefaults = (data, defaultData, key, keySeparator = ".", ignoreJSONStructure = true) => {
		let path = getPathWithDefaults(data, defaultData, key);
		if (!path && ignoreJSONStructure && isString$1(key)) {
			path = deepFind(data, key, keySeparator);
			if (path === void 0) path = deepFind(defaultData, key, keySeparator);
		}
		return path;
	};
	var regexSafe = (val) => val.replace(/\$/g, "$$$$");
	var Interpolator = class {
		constructor(options = {}) {
			this.logger = baseLogger.create("interpolator");
			this.options = options;
			this.format = options?.interpolation?.format || ((value) => value);
			this.init(options);
		}
		init(options = {}) {
			if (!options.interpolation) options.interpolation = { escapeValue: true };
			const { escape: escape$1, escapeValue, useRawValueToEscape, prefix, prefixEscaped, suffix, suffixEscaped, formatSeparator, unescapeSuffix, unescapePrefix, nestingPrefix, nestingPrefixEscaped, nestingSuffix, nestingSuffixEscaped, nestingOptionsSeparator, maxReplaces, alwaysFormat } = options.interpolation;
			this.escape = escape$1 !== void 0 ? escape$1 : escape;
			this.escapeValue = escapeValue !== void 0 ? escapeValue : true;
			this.useRawValueToEscape = useRawValueToEscape !== void 0 ? useRawValueToEscape : false;
			this.prefix = prefix ? regexEscape(prefix) : prefixEscaped || "{{";
			this.suffix = suffix ? regexEscape(suffix) : suffixEscaped || "}}";
			this.formatSeparator = formatSeparator || ",";
			this.unescapePrefix = unescapeSuffix ? "" : unescapePrefix ? regexEscape(unescapePrefix) : "-";
			this.unescapeSuffix = this.unescapePrefix ? "" : unescapeSuffix ? regexEscape(unescapeSuffix) : "";
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
			const handleFormat = (key) => {
				if (!key.includes(this.formatSeparator)) {
					const path = deepFindWithDefaults(data, defaultData, key, this.options.keySeparator, this.options.ignoreJSONStructure);
					return this.alwaysFormat ? this.format(path, void 0, lng, {
						...options,
						...data,
						interpolationkey: key
					}) : path;
				}
				const p = key.split(this.formatSeparator);
				const k = p.shift().trim();
				const f = p.join(this.formatSeparator).trim();
				return this.format(deepFindWithDefaults(data, defaultData, k, this.options.keySeparator, this.options.ignoreJSONStructure), f, lng, {
					...options,
					...data,
					interpolationkey: k
				});
			};
			this.resetRegExp();
			if (!this.escapeValue && typeof str === "string" && /\$t\([^)]*\{[^}]*\{\{/.test(str)) this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");
			const missingInterpolationHandler = options?.missingInterpolationHandler || this.options.missingInterpolationHandler;
			const skipOnVariables = options?.interpolation?.skipOnVariables !== void 0 ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
			[{
				regex: this.regexpUnescape,
				safeValue: (val) => regexSafe(val)
			}, {
				regex: this.regexp,
				safeValue: (val) => this.escapeValue ? regexSafe(this.escape(val)) : regexSafe(val)
			}].forEach((todo) => {
				replaces = 0;
				while (match = todo.regex.exec(str)) {
					const matchedVar = match[1].trim();
					value = handleFormat(matchedVar);
					if (value === void 0) if (typeof missingInterpolationHandler === "function") {
						const temp = missingInterpolationHandler(str, match, options);
						value = isString$1(temp) ? temp : "";
					} else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) value = "";
					else if (skipOnVariables) {
						value = match[0];
						continue;
					} else {
						this.logger.warn(`missed to pass in variable ${matchedVar} for interpolating ${str}`);
						value = "";
					}
					else if (!isString$1(value) && !this.useRawValueToEscape) value = makeString(value);
					const safeValue = todo.safeValue(value);
					str = str.replace(match[0], safeValue);
					if (skipOnVariables) {
						todo.regex.lastIndex += value.length;
						todo.regex.lastIndex -= match[0].length;
					} else todo.regex.lastIndex = 0;
					replaces++;
					if (replaces >= this.maxReplaces) break;
				}
			});
			return str;
		}
		nest(str, fc, options = {}) {
			let match;
			let value;
			let clonedOptions;
			const handleHasOptions = (key, inheritedOptions) => {
				const sep = this.nestingOptionsSeparator;
				if (!key.includes(sep)) return key;
				const c = key.split(new RegExp(`${regexEscape(sep)}[ ]*{`));
				let optionsString = `{${c[1]}`;
				key = c[0];
				optionsString = this.interpolate(optionsString, clonedOptions);
				const matchedSingleQuotes = optionsString.match(/'/g);
				const matchedDoubleQuotes = optionsString.match(/"/g);
				if ((matchedSingleQuotes?.length ?? 0) % 2 === 0 && !matchedDoubleQuotes || (matchedDoubleQuotes?.length ?? 0) % 2 !== 0) optionsString = optionsString.replace(/'/g, "\"");
				try {
					clonedOptions = JSON.parse(optionsString);
					if (inheritedOptions) clonedOptions = {
						...inheritedOptions,
						...clonedOptions
					};
				} catch (e) {
					this.logger.warn(`failed parsing options string in nesting for key ${key}`, e);
					return `${key}${sep}${optionsString}`;
				}
				if (clonedOptions.defaultValue && clonedOptions.defaultValue.includes(this.prefix)) delete clonedOptions.defaultValue;
				return key;
			};
			while (match = this.nestingRegexp.exec(str)) {
				let formatters = [];
				clonedOptions = { ...options };
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
				if (formatters.length) value = formatters.reduce((v, f) => this.format(v, f, options.lng, {
					...options,
					interpolationkey: match[1].trim()
				}), value.trim());
				str = str.replace(match[0], value);
				this.regexp.lastIndex = 0;
			}
			return str;
		}
	};
	var parseFormatStr = (formatStr) => {
		let formatName = formatStr.toLowerCase().trim();
		const formatOptions = {};
		if (formatStr.includes("(")) {
			const p = formatStr.split("(");
			formatName = p[0].toLowerCase().trim();
			const optStr = p[1].slice(0, -1);
			if (formatName === "currency" && !optStr.includes(":")) {
				if (!formatOptions.currency) formatOptions.currency = optStr.trim();
			} else if (formatName === "relativetime" && !optStr.includes(":")) {
				if (!formatOptions.range) formatOptions.range = optStr.trim();
			} else optStr.split(";").forEach((opt) => {
				if (opt) {
					const [key, ...rest] = opt.split(":");
					const val = rest.join(":").trim().replace(/^'+|'+$/g, "");
					const trimmedKey = key.trim();
					if (!formatOptions[trimmedKey]) formatOptions[trimmedKey] = val;
					if (val === "false") formatOptions[trimmedKey] = false;
					if (val === "true") formatOptions[trimmedKey] = true;
					if (!isNaN(val)) formatOptions[trimmedKey] = parseInt(val, 10);
				}
			});
		}
		return {
			formatName,
			formatOptions
		};
	};
	var createCachedFormatter = (fn) => {
		const cache = {};
		return (v, l, o) => {
			let optForCache = o;
			if (o && o.interpolationkey && o.formatParams && o.formatParams[o.interpolationkey] && o[o.interpolationkey]) optForCache = {
				...optForCache,
				[o.interpolationkey]: void 0
			};
			const key = l + JSON.stringify(optForCache);
			let frm = cache[key];
			if (!frm) {
				frm = fn(getCleanedCode(l), o);
				cache[key] = frm;
			}
			return frm(v);
		};
	};
	var createNonCachedFormatter = (fn) => (v, l, o) => fn(getCleanedCode(l), o)(v);
	var Formatter = class {
		constructor(options = {}) {
			this.logger = baseLogger.create("formatter");
			this.options = options;
			this.init(options);
		}
		init(services, options = { interpolation: {} }) {
			this.formatSeparator = options.interpolation.formatSeparator || ",";
			const cf = options.cacheInBuiltFormats ? createCachedFormatter : createNonCachedFormatter;
			this.formats = {
				number: cf((lng, opt) => {
					const formatter = new Intl.NumberFormat(lng, { ...opt });
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
					const formatter = new Intl.DateTimeFormat(lng, { ...opt });
					return (val) => formatter.format(val);
				}),
				relativetime: cf((lng, opt) => {
					const formatter = new Intl.RelativeTimeFormat(lng, { ...opt });
					return (val) => formatter.format(val, opt.range || "day");
				}),
				list: cf((lng, opt) => {
					const formatter = new Intl.ListFormat(lng, { ...opt });
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
			if (!format) return value;
			if (value == null) return value;
			const formats = format.split(this.formatSeparator);
			if (formats.length > 1 && formats[0].indexOf("(") > 1 && !formats[0].includes(")") && formats.find((f) => f.includes(")"))) {
				const lastIndex = formats.findIndex((f) => f.includes(")"));
				formats[0] = [formats[0], ...formats.splice(1, lastIndex)].join(this.formatSeparator);
			}
			return formats.reduce((mem, f) => {
				const { formatName, formatOptions } = parseFormatStr(f);
				if (this.formats[formatName]) {
					let formatted = mem;
					try {
						const valOptions = options?.formatParams?.[options.interpolationkey] || {};
						const l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
						formatted = this.formats[formatName](mem, l, {
							...formatOptions,
							...options,
							...valOptions
						});
					} catch (error) {
						this.logger.warn(error);
					}
					return formatted;
				} else this.logger.warn(`there was no format function for ${formatName}`);
				return mem;
			}, value);
		}
	};
	var removePending = (q, name) => {
		if (q.pending[name] !== void 0) {
			delete q.pending[name];
			q.pendingCount--;
		}
	};
	var Connector = class extends EventEmitter {
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
					if (!options.reload && this.store.hasResourceBundle(lng, ns)) this.state[name] = 2;
					else if (this.state[name] < 0);
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
			if (Object.keys(toLoad).length || Object.keys(pending).length) this.queue.push({
				pending,
				pendingCount: Object.keys(pending).length,
				loaded: {},
				errors: [],
				callback
			});
			return {
				toLoad: Object.keys(toLoad),
				pending: Object.keys(pending),
				toLoadLanguages: Object.keys(toLoadLanguages),
				toLoadNamespaces: Object.keys(toLoadNamespaces)
			};
		}
		loaded(name, err, data) {
			const s = name.split("|");
			const lng = s[0];
			const ns = s[1];
			if (err) this.emit("failedLoading", lng, ns, err);
			if (!err && data) this.store.addResourceBundle(lng, ns, data, void 0, void 0, { skipCopy: true });
			this.state[name] = err ? -1 : 2;
			if (err && data) this.state[name] = 0;
			const loaded = {};
			this.queue.forEach((q) => {
				pushPath(q.loaded, [lng], ns);
				removePending(q, name);
				if (err) q.errors.push(err);
				if (q.pendingCount === 0 && !q.done) {
					Object.keys(q.loaded).forEach((l) => {
						if (!loaded[l]) loaded[l] = {};
						const loadedKeys = q.loaded[l];
						if (loadedKeys.length) loadedKeys.forEach((n) => {
							if (loaded[l][n] === void 0) loaded[l][n] = true;
						});
					});
					q.done = true;
					if (q.errors.length) q.callback(q.errors);
					else q.callback();
				}
			});
			this.emit("loaded", loaded);
			this.queue = this.queue.filter((q) => !q.done);
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
			const resolver = (err, data) => {
				this.readingCalls--;
				if (this.waitingReads.length > 0) {
					const next = this.waitingReads.shift();
					this.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
				}
				if (err && data && tried < this.maxRetries) {
					setTimeout(() => {
						this.read(lng, ns, fcName, tried + 1, wait * 2, callback);
					}, wait);
					return;
				}
				callback(err, data);
			};
			const fc = this.backend[fcName].bind(this.backend);
			if (fc.length === 2) {
				try {
					const r = fc(lng, ns);
					if (r && typeof r.then === "function") r.then((data) => resolver(null, data)).catch(resolver);
					else resolver(null, r);
				} catch (err) {
					resolver(err);
				}
				return;
			}
			return fc(lng, ns, resolver);
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
			this.prepareLoading(languages, namespaces, { reload: true }, callback);
		}
		loadOne(name, prefix = "") {
			const s = name.split("|");
			const lng = s[0];
			const ns = s[1];
			this.read(lng, ns, "read", void 0, void 0, (err, data) => {
				if (err) this.logger.warn(`${prefix}loading namespace ${ns} for language ${lng} failed`, err);
				if (!err && data) this.logger.log(`${prefix}loaded namespace ${ns} for language ${lng}`, data);
				this.loaded(name, err, data);
			});
		}
		saveMissing(languages, namespace, key, fallbackValue, isUpdate, options = {}, clb = () => {}) {
			if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(namespace)) {
				this.logger.warn(`did not save key "${key}" as the namespace "${namespace}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
				return;
			}
			if (key === void 0 || key === null || key === "") return;
			if (this.backend?.create) {
				const opts = {
					...options,
					isUpdate
				};
				const fc = this.backend.create.bind(this.backend);
				if (fc.length < 6) try {
					let r;
					if (fc.length === 5) r = fc(languages, namespace, key, fallbackValue, opts);
					else r = fc(languages, namespace, key, fallbackValue);
					if (r && typeof r.then === "function") r.then((data) => clb(null, data)).catch(clb);
					else clb(null, r);
				} catch (err) {
					clb(err);
				}
				else fc(languages, namespace, key, fallbackValue, clb, opts);
			}
			if (!languages || !languages[0]) return;
			this.store.addResource(languages[0], namespace, key, fallbackValue);
		}
	};
	var get = () => ({
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
				Object.keys(options).forEach((key) => {
					ret[key] = options[key];
				});
			}
			return ret;
		},
		interpolation: {
			escapeValue: true,
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
	var transformOptions = (options) => {
		if (isString$1(options.ns)) options.ns = [options.ns];
		if (isString$1(options.fallbackLng)) options.fallbackLng = [options.fallbackLng];
		if (isString$1(options.fallbackNS)) options.fallbackNS = [options.fallbackNS];
		if (options.supportedLngs && !options.supportedLngs.includes("cimode")) options.supportedLngs = options.supportedLngs.concat(["cimode"]);
		return options;
	};
	var noop = () => {};
	var bindMemberFunctions = (inst) => {
		Object.getOwnPropertyNames(Object.getPrototypeOf(inst)).forEach((mem) => {
			if (typeof inst[mem] === "function") inst[mem] = inst[mem].bind(inst);
		});
	};
	var instance = class I18n extends EventEmitter {
		constructor(options = {}, callback) {
			super();
			this.options = transformOptions(options);
			this.services = {};
			this.logger = baseLogger;
			this.modules = { external: [] };
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
				if (isString$1(options.ns)) options.defaultNS = options.ns;
				else if (!options.ns.includes("translation")) options.defaultNS = options.ns[0];
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
			if (options.keySeparator !== void 0) this.options.userDefinedKeySeparator = options.keySeparator;
			if (options.nsSeparator !== void 0) this.options.userDefinedNsSeparator = options.nsSeparator;
			if (typeof this.options.overloadTranslationOptionHandler !== "function") this.options.overloadTranslationOptionHandler = defOpts.overloadTranslationOptionHandler;
			const createClassOnDemand = (ClassOrObject) => {
				if (!ClassOrObject) return null;
				if (typeof ClassOrObject === "function") return new ClassOrObject();
				return ClassOrObject;
			};
			if (!this.options.isClone) {
				if (this.modules.logger) baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
				else baseLogger.init(null, this.options);
				let formatter;
				if (this.modules.formatter) formatter = this.modules.formatter;
				else formatter = Formatter;
				const lu = new LanguageUtil(this.options);
				this.store = new ResourceStore(this.options.resources, this.options);
				const s = this.services;
				s.logger = baseLogger;
				s.resourceStore = this.store;
				s.languageUtils = lu;
				s.pluralResolver = new PluralResolver(lu, { prepend: this.options.pluralSeparator });
				if (formatter) {
					s.formatter = createClassOnDemand(formatter);
					if (s.formatter.init) s.formatter.init(s, this.options);
					this.options.interpolation.format = s.formatter.format.bind(s.formatter);
				}
				s.interpolator = new Interpolator(this.options);
				s.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) };
				s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
				s.backendConnector.on("*", (event, ...args) => {
					this.emit(event, ...args);
				});
				if (this.modules.languageDetector) {
					s.languageDetector = createClassOnDemand(this.modules.languageDetector);
					if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
				}
				if (this.modules.i18nFormat) {
					s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
					if (s.i18nFormat.init) s.i18nFormat.init(this);
				}
				this.translator = new Translator(this.services, this.options);
				this.translator.on("*", (event, ...args) => {
					this.emit(event, ...args);
				});
				this.modules.external.forEach((m) => {
					if (m.init) m.init(this);
				});
			}
			this.format = this.options.interpolation.format;
			if (!callback) callback = noop;
			if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
				const codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
				if (codes.length > 0 && codes[0] !== "dev") this.options.lng = codes[0];
			}
			if (!this.services.languageDetector && !this.options.lng) this.logger.warn("init: no languageDetector is used and no lng is defined");
			[
				"getResource",
				"hasResourceBundle",
				"getResourceBundle",
				"getDataByLanguage"
			].forEach((fcName) => {
				this[fcName] = (...args) => this.store[fcName](...args);
			});
			[
				"addResource",
				"addResources",
				"addResourceBundle",
				"removeResourceBundle"
			].forEach((fcName) => {
				this[fcName] = (...args) => {
					this.store[fcName](...args);
					return this;
				};
			});
			const deferred = defer();
			const load = () => {
				const finish = (err, t) => {
					this.isInitializing = false;
					if (this.isInitialized && !this.initializedStoreOnce) this.logger.warn("init: i18next is already initialized. You should call init just once!");
					this.isInitialized = true;
					if (!this.options.isClone) this.logger.log("initialized", this.options);
					this.emit("initialized", this.options);
					deferred.resolve(t);
					callback(err, t);
				};
				if ((this.languages || this.isLanguageChangingTo) && !this.isInitialized) return finish(null, this.t.bind(this));
				this.changeLanguage(this.options.lng, finish);
			};
			if (this.options.resources || !this.options.initAsync) load();
			else setTimeout(load, 0);
			return deferred;
		}
		loadResources(language, callback = noop) {
			let usedCallback = callback;
			const usedLng = isString$1(language) ? language : this.language;
			if (typeof language === "function") usedCallback = language;
			if (!this.options.resources || this.options.partialBundledLanguages) {
				if (usedLng?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return usedCallback();
				const toLoad = [];
				const append = (lng) => {
					if (!lng) return;
					if (lng === "cimode") return;
					this.services.languageUtils.toResolveHierarchy(lng).forEach((l) => {
						if (l === "cimode") return;
						if (!toLoad.includes(l)) toLoad.push(l);
					});
				};
				if (!usedLng) this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((l) => append(l));
				else append(usedLng);
				this.options.preload?.forEach?.((l) => append(l));
				this.services.backendConnector.load(toLoad, this.options.ns, (e) => {
					if (!e && !this.resolvedLanguage && this.language) this.setResolvedLanguage(this.language);
					usedCallback(e);
				});
			} else usedCallback(null);
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
			if (!callback) callback = noop;
			this.services.backendConnector.reload(lngs, ns, (err) => {
				deferred.resolve();
				callback(err);
			});
			return deferred;
		}
		use(module) {
			if (!module) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
			if (!module.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
			if (module.type === "backend") this.modules.backend = module;
			if (module.type === "logger" || module.log && module.warn && module.error) this.modules.logger = module;
			if (module.type === "languageDetector") this.modules.languageDetector = module;
			if (module.type === "i18nFormat") this.modules.i18nFormat = module;
			if (module.type === "postProcessor") postProcessor.addPostProcessor(module);
			if (module.type === "formatter") this.modules.formatter = module;
			if (module.type === "3rdParty") this.modules.external.push(module);
			return this;
		}
		setResolvedLanguage(l) {
			if (!l || !this.languages) return;
			if (["cimode", "dev"].includes(l)) return;
			for (let li = 0; li < this.languages.length; li++) {
				const lngInLngs = this.languages[li];
				if (["cimode", "dev"].includes(lngInLngs)) continue;
				if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
					this.resolvedLanguage = lngInLngs;
					break;
				}
			}
			if (!this.resolvedLanguage && !this.languages.includes(l) && this.store.hasLanguageSomeTranslations(l)) {
				this.resolvedLanguage = l;
				this.languages.unshift(l);
			}
		}
		changeLanguage(lng, callback) {
			this.isLanguageChangingTo = lng;
			const deferred = defer();
			this.emit("languageChanging", lng);
			const setLngProps = (l) => {
				this.language = l;
				this.languages = this.services.languageUtils.toResolveHierarchy(l);
				this.resolvedLanguage = void 0;
				this.setResolvedLanguage(l);
			};
			const done = (err, l) => {
				if (l) {
					if (this.isLanguageChangingTo === lng) {
						setLngProps(l);
						this.translator.changeLanguage(l);
						this.isLanguageChangingTo = void 0;
						this.emit("languageChanged", l);
						this.logger.log("languageChanged", l);
					}
				} else this.isLanguageChangingTo = void 0;
				deferred.resolve((...args) => this.t(...args));
				if (callback) callback(err, (...args) => this.t(...args));
			};
			const setLng = (lngs) => {
				if (!lng && !lngs && this.services.languageDetector) lngs = [];
				const fl = isString$1(lngs) ? lngs : lngs && lngs[0];
				const l = this.store.hasLanguageSomeTranslations(fl) ? fl : this.services.languageUtils.getBestMatchFromCodes(isString$1(lngs) ? [lngs] : lngs);
				if (l) {
					if (!this.language) setLngProps(l);
					if (!this.translator.language) this.translator.changeLanguage(l);
					this.services.languageDetector?.cacheUserLanguage?.(l);
				}
				this.loadResources(l, (err) => {
					done(err, l);
				});
			};
			if (!lng && this.services.languageDetector && !this.services.languageDetector.async) setLng(this.services.languageDetector.detect());
			else if (!lng && this.services.languageDetector && this.services.languageDetector.async) if (this.services.languageDetector.detect.length === 0) this.services.languageDetector.detect().then(setLng);
			else this.services.languageDetector.detect(setLng);
			else setLng(lng);
			return deferred;
		}
		getFixedT(lng, ns, keyPrefix, fixedOpts) {
			const scopeNs = fixedOpts?.scopeNs;
			const fixedT = (key, opts, ...rest) => {
				let o;
				if (typeof opts !== "object") o = this.options.overloadTranslationOptionHandler([key, opts].concat(rest));
				else o = { ...opts };
				o.lng = o.lng || fixedT.lng;
				o.lngs = o.lngs || fixedT.lngs;
				const explicitCallNs = o.ns !== void 0 && o.ns !== null;
				o.ns = o.ns || fixedT.ns;
				if (o.keyPrefix !== "") o.keyPrefix = o.keyPrefix || keyPrefix || fixedT.keyPrefix;
				const selectorOpts = {
					...this.options,
					...o
				};
				if (Array.isArray(scopeNs) && !explicitCallNs) selectorOpts.ns = scopeNs;
				if (typeof o.keyPrefix === "function") o.keyPrefix = keysFromSelector(o.keyPrefix, selectorOpts);
				const keySeparator = this.options.keySeparator || ".";
				let resultKey;
				if (o.keyPrefix && Array.isArray(key)) resultKey = key.map((k) => {
					if (typeof k === "function") k = keysFromSelector(k, selectorOpts);
					return `${o.keyPrefix}${keySeparator}${k}`;
				});
				else {
					if (typeof key === "function") key = keysFromSelector(key, selectorOpts);
					resultKey = o.keyPrefix ? `${o.keyPrefix}${keySeparator}${key}` : key;
				}
				return this.t(resultKey, o);
			};
			if (isString$1(lng)) fixedT.lng = lng;
			else fixedT.lngs = lng;
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
			const loadNotPending = (l, n) => {
				const loadState = this.services.backendConnector.state[`${l}|${n}`];
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
			ns.forEach((n) => {
				if (!this.options.ns.includes(n)) this.options.ns.push(n);
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
			const newLngs = lngs.filter((lng) => !preloaded.includes(lng) && this.services.languageUtils.isSupportedCode(lng));
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
				const l = new Intl.Locale(lng);
				if (l && l.getTextInfo) {
					const ti = l.getTextInfo();
					if (ti && ti.direction) return ti.direction;
				}
			} catch (e) {}
			const rtlLngs = [
				"ar",
				"shu",
				"sqr",
				"ssh",
				"xaa",
				"yhd",
				"yud",
				"aao",
				"abh",
				"abv",
				"acm",
				"acq",
				"acw",
				"acx",
				"acy",
				"adf",
				"ads",
				"aeb",
				"aec",
				"afb",
				"ajp",
				"apc",
				"apd",
				"arb",
				"arq",
				"ars",
				"ary",
				"arz",
				"auz",
				"avl",
				"ayh",
				"ayl",
				"ayn",
				"ayp",
				"bbz",
				"pga",
				"he",
				"iw",
				"ps",
				"pbt",
				"pbu",
				"pst",
				"prp",
				"prd",
				"ug",
				"ur",
				"ydd",
				"yds",
				"yih",
				"ji",
				"yi",
				"hbo",
				"men",
				"xmn",
				"fa",
				"jpr",
				"peo",
				"pes",
				"prs",
				"dv",
				"sam",
				"ckb"
			];
			const languageUtils = this.services?.languageUtils || new LanguageUtil(get());
			if (lng.toLowerCase().indexOf("-latn") > 1) return "ltr";
			return rtlLngs.includes(languageUtils.getLanguagePartFromCode(lng)) || lng.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
		}
		static createInstance(options = {}, callback) {
			const instance = new I18n(options, callback);
			instance.createInstance = I18n.createInstance;
			return instance;
		}
		cloneInstance(options = {}, callback = noop) {
			const forkResourceStore = options.forkResourceStore;
			if (forkResourceStore) delete options.forkResourceStore;
			const mergedOptions = {
				...this.options,
				...options,
				isClone: true
			};
			const clone = new I18n(mergedOptions);
			if (options.debug !== void 0 || options.prefix !== void 0) clone.logger = clone.logger.clone(options);
			[
				"store",
				"services",
				"language"
			].forEach((m) => {
				clone[m] = this[m];
			});
			clone.services = { ...this.services };
			clone.services.utils = { hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone) };
			if (forkResourceStore) {
				clone.store = new ResourceStore(Object.keys(this.store.data).reduce((prev, l) => {
					prev[l] = { ...this.store.data[l] };
					prev[l] = Object.keys(prev[l]).reduce((acc, n) => {
						acc[n] = { ...prev[l][n] };
						return acc;
					}, prev[l]);
					return prev;
				}, {}), mergedOptions);
				clone.services.resourceStore = clone.store;
			}
			if (options.interpolation) {
				const mergedInterpolation = {
					...get().interpolation,
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
			clone.translator.backendConnector.services.utils = { hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone) };
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
	}.createInstance();
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
	function p$2(n, t) {
		c.__h && c.__h(r$1, n, o$2 || t), o$2 = 0;
		var u = r$1.__H || (r$1.__H = {
			__: [],
			__h: []
		});
		return n >= u.__.length && u.__.push({}), u.__[n];
	}
	function d$1(n) {
		return o$2 = 1, h$1(D$2, n);
	}
	function h$1(n, u, i) {
		var o = p$2(t$3++, 2);
		if (o.t = n, !o.__c && (o.__ = [i ? i(u) : D$2(void 0, u), function(n) {
			var t = o.__N ? o.__N[0] : o.__[0], r = o.t(t, n);
			t !== r && (o.__N = [r, o.__[1]], o.__c.setState({}));
		}], o.__c = r$1, !r$1.__f)) {
			var f = function(n, t, r) {
				if (!o.__c.__H) return !0;
				var u = o.__c.__H.__.filter(function(n) {
					return n.__c;
				});
				if (u.every(function(n) {
					return !n.__N;
				})) return !c || c.call(this, n, t, r);
				var i = o.__c.props !== n;
				return u.some(function(n) {
					if (n.__N) {
						var t = n.__[0];
						n.__ = n.__N, n.__N = void 0, t !== n.__[0] && (i = !0);
					}
				}), c && c.call(this, n, t, r) || i;
			};
			r$1.__f = !0;
			var c = r$1.shouldComponentUpdate, e = r$1.componentWillUpdate;
			r$1.componentWillUpdate = function(n, t, r) {
				if (this.__e) {
					var u = c;
					c = void 0, f(n, t, r), c = u;
				}
				e && e.call(this, n, t, r);
			}, r$1.shouldComponentUpdate = f;
		}
		return o.__N || o.__;
	}
	function y$1(n, u) {
		var i = p$2(t$3++, 3);
		!c.__s && C$1(i.__H, u) && (i.__ = n, i.u = u, r$1.__H.__h.push(i));
	}
	function _(n, u) {
		var i = p$2(t$3++, 4);
		!c.__s && C$1(i.__H, u) && (i.__ = n, i.u = u, r$1.__h.push(i));
	}
	function A$2(n) {
		return o$2 = 5, T$1(function() {
			return { current: n };
		}, []);
	}
	function F$1(n, t, r) {
		o$2 = 6, _(function() {
			if ("function" == typeof n) {
				var r = n(t());
				return function() {
					n(null), r && "function" == typeof r && r();
				};
			}
			if (n) return n.current = t(), function() {
				return n.current = null;
			};
		}, null == r ? r : r.concat(n));
	}
	function T$1(n, r) {
		var u = p$2(t$3++, 7);
		return C$1(u.__H, r) && (u.__ = n(), u.__H = r, u.__h = n), u.__;
	}
	function q$1(n, t) {
		return o$2 = 8, T$1(function() {
			return n;
		}, t);
	}
	function x$1(n) {
		var u = r$1.context[n.__c], i = p$2(t$3++, 9);
		return i.c = n, u ? (i.__ ?? (i.__ = !0, u.sub(r$1)), u.props.value) : n.__;
	}
	function P$1(n, t) {
		c.useDebugValue && c.useDebugValue(t ? t(n) : n);
	}
	function b$1(n) {
		var u = p$2(t$3++, 10), i = d$1();
		return u.__ = n, r$1.componentDidCatch || (r$1.componentDidCatch = function(n, t) {
			u.__ && u.__(n, t), i[1](n);
		}), [i[0], function() {
			i[1](void 0);
		}];
	}
	function g$2() {
		var n = p$2(t$3++, 11);
		if (!n.__) {
			for (var u = r$1.__v; null !== u && !u.__m && null !== u.__;) u = u.__;
			var i = u.__m || (u.__m = [0, 0]);
			n.__ = "P" + i[0] + "-" + i[1]++;
		}
		return n.__;
	}
	function j$1() {
		for (var n; n = f$2.shift();) {
			var t = n.__H;
			if (n.__P && t) try {
				t.__h.some(z$1), t.__h.some(B$2), t.__h = [];
			} catch (r) {
				t.__h = [], c.__e(r, n.__v);
			}
		}
	}
	function w$2(n) {
		var t, r = function() {
			clearTimeout(u), k$1 && cancelAnimationFrame(t), setTimeout(n);
		}, u = setTimeout(r, 35);
		k$1 && (t = requestAnimationFrame(r));
	}
	function z$1(n) {
		var t = r$1, u = n.__c;
		"function" == typeof u && (n.__c = void 0, u()), r$1 = t;
	}
	function B$2(n) {
		var t = r$1;
		n.__c = n.__(), r$1 = t;
	}
	function C$1(n, t) {
		return !n || n.length !== t.length || t.some(function(t, r) {
			return t !== n[r];
		});
	}
	function D$2(n, t) {
		return "function" == typeof t ? t(n) : t;
	}
	var t$3, r$1, u$2, i$2, o$2, f$2, c, e$1, a$1, v$1, l$1, m, s$1, k$1;
	var init_hooks_module = __esmMin((() => {
		o$2 = 0, f$2 = [], c = l$2, e$1 = c.__b, a$1 = c.__r, v$1 = c.diffed, l$1 = c.__c, m = c.unmount, s$1 = c.__;
		c.__b = function(n) {
			r$1 = null, e$1 && e$1(n);
		}, c.__ = function(n, t) {
			n && t.__k && t.__k.__m && (n.__m = t.__k.__m), s$1 && s$1(n, t);
		}, c.__r = function(n) {
			a$1 && a$1(n), t$3 = 0;
			var i = (r$1 = n.__c).__H;
			i && (u$2 === r$1 ? (i.__h = [], r$1.__h = [], i.__.some(function(n) {
				n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
			})) : (i.__h.some(z$1), i.__h.some(B$2), i.__h = [], t$3 = 0)), u$2 = r$1;
		}, c.diffed = function(n) {
			v$1 && v$1(n);
			var t = n.__c;
			t && t.__H && (t.__H.__h.length && (1 !== f$2.push(t) && i$2 === c.requestAnimationFrame || ((i$2 = c.requestAnimationFrame) || w$2)(j$1)), t.__H.__.some(function(n) {
				n.u && (n.__H = n.u), n.u = void 0;
			})), u$2 = r$1 = null;
		}, c.__c = function(n, t) {
			t.some(function(n) {
				try {
					n.__h.some(z$1), n.__h = n.__h.filter(function(n) {
						return !n.__ || B$2(n);
					});
				} catch (r) {
					t.some(function(n) {
						n.__h && (n.__h = []);
					}), t = [], c.__e(r, n.__v);
				}
			}), l$1 && l$1(n, t);
		}, c.unmount = function(n) {
			m && m(n);
			var t, r = n.__c;
			r && r.__H && (r.__H.__.some(function(n) {
				try {
					z$1(n);
				} catch (n) {
					t = n;
				}
			}), r.__H = void 0, t && c.__e(t, r.__v));
		};
		k$1 = "function" == typeof requestAnimationFrame;
	}));
	var compat_module_exports = __exportAll({
		Children: () => L,
		Component: () => C$2,
		Fragment: () => S$1,
		PureComponent: () => M,
		StrictMode: () => S$1,
		Suspense: () => P,
		SuspenseList: () => B$1,
		__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => fn,
		cloneElement: () => mn,
		createContext: () => X$1,
		createElement: () => k$2,
		createFactory: () => sn,
		createPortal: () => $,
		createRef: () => M$1,
		default: () => gn,
		findDOMNode: () => yn,
		flushSync: () => bn,
		forwardRef: () => D$1,
		hydrate: () => tn,
		isElement: () => Sn,
		isFragment: () => vn,
		isMemo: () => dn,
		isValidElement: () => hn,
		lazy: () => z,
		memo: () => N$1,
		render: () => nn,
		startTransition: () => x,
		unmountComponentAtNode: () => pn,
		unstable_batchedUpdates: () => _n,
		useCallback: () => q$1,
		useContext: () => x$1,
		useDebugValue: () => P$1,
		useDeferredValue: () => w$1,
		useEffect: () => y$1,
		useErrorBoundary: () => b$1,
		useId: () => g$2,
		useImperativeHandle: () => F$1,
		useInsertionEffect: () => I$1,
		useLayoutEffect: () => _,
		useMemo: () => T$1,
		useReducer: () => h$1,
		useRef: () => A$2,
		useState: () => d$1,
		useSyncExternalStore: () => C,
		useTransition: () => k,
		version: () => an
	});
	function g$1(n, t) {
		for (var e in t) n[e] = t[e];
		return n;
	}
	function E(n, t) {
		for (var e in n) if ("__source" !== e && !(e in t)) return !0;
		for (var r in t) if ("__source" !== r && n[r] !== t[r]) return !0;
		return !1;
	}
	function C(n, t) {
		var e = t(), r = d$1({ t: {
			__: e,
			u: t
		} }), u = r[0].t, o = r[1];
		return _(function() {
			u.__ = e, u.u = t, R(u) && o({ t: u });
		}, [
			n,
			e,
			t
		]), y$1(function() {
			return R(u) && o({ t: u }), n(function() {
				R(u) && o({ t: u });
			});
		}, [n]), e;
	}
	function R(n) {
		try {
			return !((t = n.__) === (e = n.u()) && (0 !== t || 1 / t == 1 / e) || t != t && e != e);
		} catch (n) {
			return !0;
		}
		var t, e;
	}
	function x(n) {
		n();
	}
	function w$1(n) {
		return n;
	}
	function k() {
		return [!1, x];
	}
	function M(n, t) {
		this.props = n, this.context = t;
	}
	function N$1(n, e) {
		function r(n) {
			var t = this.props.ref;
			return t != n.ref && t && ("function" == typeof t ? t(null) : t.current = null), e ? !e(this.props, n) || t != n.ref : E(this.props, n);
		}
		function u(e) {
			return this.shouldComponentUpdate = r, k$2(n, e);
		}
		return u.displayName = "Memo(" + (n.displayName || n.name) + ")", u.__f = u.prototype.isReactComponent = !0, u.type = n, u;
	}
	function D$1(n) {
		function t(t) {
			var e = g$1({}, t);
			return delete e.ref, n(e, t.ref || null);
		}
		return t.$$typeof = A$1, t.render = n, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
	}
	function V(n, t, e) {
		return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function(n) {
			"function" == typeof n.__c && n.__c();
		}), n.__c.__H = null), null != (n = g$1({}, n)).__c && (n.__c.__P === e && (n.__c.__P = t), n.__c.__e = !0, n.__c = null), n.__k = n.__k && n.__k.map(function(n) {
			return V(n, t, e);
		})), n;
	}
	function W(n, t, e) {
		return n && e && (n.__v = null, n.__k = n.__k && n.__k.map(function(n) {
			return W(n, t, e);
		}), n.__c && n.__c.__P === t && (n.__e && e.appendChild(n.__e), n.__c.__e = !0, n.__c.__P = e)), n;
	}
	function P() {
		this.__u = 0, this.o = null, this.__b = null;
	}
	function j(n) {
		var t = n.__ && n.__.__c;
		return t && t.__a && t.__a(n);
	}
	function z(n) {
		var e, r, u, o = null;
		function i(i) {
			if (e || (e = n()).then(function(n) {
				n && (o = n.default || n), u = !0;
			}, function(n) {
				r = n, u = !0;
			}), r) throw r;
			if (!u) throw e;
			return o ? k$2(o, i) : null;
		}
		return i.displayName = "Lazy", i.__f = !0, i;
	}
	function B$1() {
		this.i = null, this.l = null;
	}
	function Z(n) {
		return this.getChildContext = function() {
			return n.context;
		}, n.children;
	}
	function Y(n) {
		var e = this, r = n.h;
		if (e.componentWillUnmount = function() {
			R$1(null, e.v), e.v = null, e.h = null;
		}, e.h && e.h !== r && e.componentWillUnmount(), !e.v) {
			for (var u = e.__v; null !== u && !u.__m && null !== u.__;) u = u.__;
			e.h = r, e.v = {
				nodeType: 1,
				parentNode: r,
				childNodes: [],
				__k: { __m: u.__m },
				contains: function() {
					return !0;
				},
				namespaceURI: r.namespaceURI,
				insertBefore: function(n, t) {
					this.childNodes.push(n), e.h.insertBefore(n, t);
				},
				removeChild: function(n) {
					this.childNodes.splice(this.childNodes.indexOf(n) >>> 1, 1), e.h.removeChild(n);
				}
			};
		}
		R$1(k$2(Z, { context: e.context }, n.__v), e.v);
	}
	function $(n, e) {
		var r = k$2(Y, {
			__v: n,
			h: e
		});
		return r.containerInfo = e, r;
	}
	function nn(n, t, e) {
		return t.__k ?? (t.textContent = ""), R$1(n, t), "function" == typeof e && e(), n ? n.__c : null;
	}
	function tn(n, t, e) {
		return U$1(n, t), "function" == typeof e && e(), n ? n.__c : null;
	}
	function sn(n) {
		return k$2.bind(null, n);
	}
	function hn(n) {
		return !!n && n.$$typeof === q;
	}
	function vn(n) {
		return hn(n) && n.type === S$1;
	}
	function dn(n) {
		return !!n && "string" == typeof n.displayName && 0 == n.displayName.indexOf("Memo(");
	}
	function mn(n) {
		return hn(n) ? W$1.apply(null, arguments) : n;
	}
	function pn(n) {
		return !!n.__k && (R$1(null, n), !0);
	}
	function yn(n) {
		return n && (n.base || 1 === n.nodeType && n) || null;
	}
	var I$1, T, A$1, F, L, O, U, H, q, G, J, K, Q, X, en, rn, un, on, ln, cn, fn, an, _n, bn, Sn, gn;
	var init_compat_module = __esmMin((() => {
		init_preact_module();
		init_hooks_module();
		init_hooks_module();
		I$1 = _;
		(M.prototype = new C$2()).isPureReactComponent = !0, M.prototype.shouldComponentUpdate = function(n, t) {
			return E(this.props, n) || E(this.state, t);
		};
		T = l$2.__b;
		l$2.__b = function(n) {
			n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), T && T(n);
		};
		A$1 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
		F = function(n, t) {
			return null == n ? null : F$2(F$2(n).map(t));
		}, L = {
			map: F,
			forEach: F,
			count: function(n) {
				return n ? F$2(n).length : 0;
			},
			only: function(n) {
				var t = F$2(n);
				if (1 !== t.length) throw "Children.only";
				return t[0];
			},
			toArray: F$2
		}, O = l$2.__e;
		l$2.__e = function(n, t, e, r) {
			if (n.then) {
				for (var u, o = t; o = o.__;) if ((u = o.__c) && u.__c) return t.__e ?? (t.__e = e.__e, t.__k = e.__k), u.__c(n, t);
			}
			O(n, t, e, r);
		};
		U = l$2.unmount;
		l$2.unmount = function(n) {
			var t = n.__c;
			t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & n.__u && (n.type = null), U && U(n);
		}, (P.prototype = new C$2()).__c = function(n, t) {
			var e = t.__c, r = this;
			r.o ??= [], r.o.push(e);
			var u = j(r.__v), o = !1, i = function() {
				o || r.__z || (o = !0, e.__R = null, u ? u(c) : c());
			};
			e.__R = i;
			var l = e.__P;
			e.__P = null;
			var c = function() {
				if (!--r.__u) {
					if (r.state.__a) {
						var n = r.state.__a;
						r.__v.__k[0] = W(n, n.__c.__P, n.__c.__O);
					}
					var t;
					for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = l, t.forceUpdate();
				}
			};
			r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), n.then(i, i);
		}, P.prototype.componentWillUnmount = function() {
			this.o = [];
		}, P.prototype.render = function(n, e) {
			if (this.__b) {
				if (this.__v.__k) {
					var r = document.createElement("div"), o = this.__v.__k[0].__c;
					this.__v.__k[0] = V(this.__b, r, o.__O = o.__P);
				}
				this.__b = null;
			}
			var i = e.__a && k$2(S$1, null, n.fallback);
			return i && (i.__u &= -33), [k$2(S$1, null, e.__a ? null : n.children), i];
		};
		H = function(n, t, e) {
			if (++e[1] === e[0] && n.l.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.l.size)) for (e = n.i; e;) {
				for (; e.length > 3;) e.pop()();
				if (e[1] < e[0]) break;
				n.i = e = e[2];
			}
		};
		(B$1.prototype = new C$2()).__a = function(n) {
			var t = this, e = j(t.__v), r = t.l.get(n);
			return r[0]++, function(u) {
				var o = function() {
					t.props.revealOrder ? (r.push(u), H(t, n, r)) : u();
				};
				e ? e(o) : o();
			};
		}, B$1.prototype.render = function(n) {
			this.i = null, this.l = new Map();
			var t = F$2(n.children);
			n.revealOrder && "b" === n.revealOrder[0] && t.reverse();
			for (var e = t.length; e--;) this.l.set(t[e], this.i = [
				1,
				0,
				this.i
			]);
			return n.children;
		}, B$1.prototype.componentDidUpdate = B$1.prototype.componentDidMount = function() {
			var n = this;
			this.l.forEach(function(t, e) {
				H(n, e, t);
			});
		};
		q = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, G = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, J = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, K = /[A-Z0-9]/g, Q = "undefined" != typeof document, X = function(n) {
			return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n);
		};
		C$2.prototype.isReactComponent = !0, [
			"componentWillMount",
			"componentWillReceiveProps",
			"componentWillUpdate"
		].forEach(function(t) {
			Object.defineProperty(C$2.prototype, t, {
				configurable: !0,
				get: function() {
					return this["UNSAFE_" + t];
				},
				set: function(n) {
					Object.defineProperty(this, t, {
						configurable: !0,
						writable: !0,
						value: n
					});
				}
			});
		});
		en = l$2.event;
		l$2.event = function(n) {
			return en && (n = en(n)), n.persist = function() {}, n.isPropagationStopped = function() {
				return this.cancelBubble;
			}, n.isDefaultPrevented = function() {
				return this.defaultPrevented;
			}, n.nativeEvent = n;
		};
		un = {
			configurable: !0,
			get: function() {
				return this.class;
			}
		}, on = l$2.vnode;
		l$2.vnode = function(n) {
			"string" == typeof n.type && function(n) {
				var t = n.props, e = n.type, u = {}, o = -1 == e.indexOf("-");
				for (var i in t) {
					var l = t[i];
					if (!("value" === i && "defaultValue" in t && null == l || Q && "children" === i && "noscript" === e || "class" === i || "className" === i)) {
						var c = i.toLowerCase();
						"defaultValue" === i && "value" in t && null == t.value ? i = "value" : "download" === i && !0 === l ? l = "" : "translate" === c && "no" === l ? l = !1 : "o" === c[0] && "n" === c[1] ? "ondoubleclick" === c ? i = "ondblclick" : "onchange" !== c || "input" !== e && "textarea" !== e || X(t.type) ? "onfocus" === c ? i = "onfocusin" : "onblur" === c ? i = "onfocusout" : J.test(i) && (i = c) : c = i = "oninput" : o && G.test(i) ? i = i.replace(K, "-$&").toLowerCase() : null === l && (l = void 0), "oninput" === c && u[i = c] && (i = "oninputCapture"), u[i] = l;
					}
				}
				"select" == e && (u.multiple && Array.isArray(u.value) && (u.value = F$2(t.children).forEach(function(n) {
					n.props.selected = -1 != u.value.indexOf(n.props.value);
				})), null != u.defaultValue && (u.value = F$2(t.children).forEach(function(n) {
					n.props.selected = u.multiple ? -1 != u.defaultValue.indexOf(n.props.value) : u.defaultValue == n.props.value;
				}))), t.class && !t.className ? (u.class = t.class, Object.defineProperty(u, "className", un)) : t.className && (u.class = u.className = t.className), n.props = u;
			}(n), n.$$typeof = q, on && on(n);
		};
		ln = l$2.__r;
		l$2.__r = function(n) {
			ln && ln(n), rn = n.__c;
		};
		cn = l$2.diffed;
		l$2.diffed = function(n) {
			cn && cn(n);
			var t = n.props, e = n.__e;
			null != e && "textarea" === n.type && "value" in t && t.value !== e.value && (e.value = null == t.value ? "" : t.value), rn = null;
		};
		fn = { ReactCurrentDispatcher: { current: {
			readContext: function(n) {
				return rn.__n[n.__c].props.value;
			},
			useCallback: q$1,
			useContext: x$1,
			useDebugValue: P$1,
			useDeferredValue: w$1,
			useEffect: y$1,
			useId: g$2,
			useImperativeHandle: F$1,
			useInsertionEffect: I$1,
			useLayoutEffect: _,
			useMemo: T$1,
			useReducer: h$1,
			useRef: A$2,
			useState: d$1,
			useSyncExternalStore: C,
			useTransition: k
		} } }, an = "18.3.1";
		_n = function(n, t) {
			return n(t);
		}, bn = function(n, t) {
			var r = l$2.debounceRendering;
			l$2.debounceRendering = function(n) {
				return n();
			};
			var u = n(t);
			return l$2.debounceRendering = r, u;
		}, Sn = hn, gn = {
			useState: d$1,
			useId: g$2,
			useReducer: h$1,
			useEffect: y$1,
			useLayoutEffect: _,
			useInsertionEffect: I$1,
			useTransition: k,
			useDeferredValue: w$1,
			useSyncExternalStore: C,
			startTransition: x,
			useRef: A$2,
			useImperativeHandle: F$1,
			useMemo: T$1,
			useCallback: q$1,
			useContext: x$1,
			useDebugValue: P$1,
			version: "18.3.1",
			Children: L,
			render: nn,
			hydrate: tn,
			unmountComponentAtNode: pn,
			createPortal: $,
			createElement: k$2,
			createContext: X$1,
			createFactory: sn,
			cloneElement: mn,
			createRef: M$1,
			Fragment: S$1,
			isValidElement: hn,
			isElement: Sn,
			isFragment: vn,
			isMemo: dn,
			findDOMNode: yn,
			Component: C$2,
			PureComponent: M,
			memo: N$1,
			forwardRef: D$1,
			flushSync: bn,
			unstable_batchedUpdates: _n,
			StrictMode: S$1,
			Suspense: P,
			SuspenseList: B$1,
			lazy: z,
			__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: fn
		};
	}));
	var warn = (i18n, code, msg, rest) => {
		const args = [msg, {
			code,
			...rest || {}
		}];
		if (i18n?.services?.logger?.forward) return i18n.services.logger.forward(args, "warn", "react-i18next::", true);
		if (isString(args[0])) args[0] = `react-i18next:: ${args[0]}`;
		if (i18n?.services?.logger?.warn) i18n.services.logger.warn(...args);
		else if (console?.warn) console.warn(...args);
	};
	var alreadyWarned = {};
	var warnOnce = (i18n, code, msg, rest) => {
		if (isString(msg) && alreadyWarned[msg]) return;
		if (isString(msg)) alreadyWarned[msg] = new Date();
		warn(i18n, code, msg, rest);
	};
	var loadedClb = (i18n, cb) => () => {
		if (i18n.isInitialized) cb();
		else {
			const initialized = () => {
				setTimeout(() => {
					i18n.off("initialized", initialized);
				}, 0);
				cb();
			};
			i18n.on("initialized", initialized);
		}
	};
	var loadNamespaces = (i18n, ns, cb) => {
		i18n.loadNamespaces(ns, loadedClb(i18n, cb));
	};
	var loadLanguages = (i18n, lng, ns, cb) => {
		if (isString(ns)) ns = [ns];
		if (i18n.options.preload && i18n.options.preload.indexOf(lng) > -1) return loadNamespaces(i18n, ns, cb);
		ns.forEach((n) => {
			if (i18n.options.ns.indexOf(n) < 0) i18n.options.ns.push(n);
		});
		i18n.loadLanguages(lng, loadedClb(i18n, cb));
	};
	var hasLoadedNamespace = (ns, i18n, options = {}) => {
		if (!i18n.languages || !i18n.languages.length) {
			warnOnce(i18n, "NO_LANGUAGES", "i18n.languages were undefined or empty", { languages: i18n.languages });
			return true;
		}
		return i18n.hasLoadedNamespace(ns, {
			lng: options.lng,
			precheck: (i18nInstance, loadNotPending) => {
				if (options.bindI18n && options.bindI18n.indexOf("languageChanging") > -1 && i18nInstance.services.backendConnector.backend && i18nInstance.isLanguageChangingTo && !loadNotPending(i18nInstance.isLanguageChangingTo, ns)) return false;
			}
		});
	};
	var isString = (obj) => typeof obj === "string";
	var isObject$1 = (obj) => typeof obj === "object" && obj !== null;
	var matchHtmlEntity = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;
	var htmlEntities = {
		"&amp;": "&",
		"&#38;": "&",
		"&lt;": "<",
		"&#60;": "<",
		"&gt;": ">",
		"&#62;": ">",
		"&apos;": "'",
		"&#39;": "'",
		"&quot;": "\"",
		"&#34;": "\"",
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
	var unescapeHtmlEntity = (m) => htmlEntities[m];
	var unescape = (text) => text.replace(matchHtmlEntity, unescapeHtmlEntity);
	var defaultOptions = {
		bindI18n: "languageChanged",
		bindI18nStore: "",
		transEmptyNodeValue: "",
		transSupportBasicHtmlNodes: true,
		transWrapTextNodes: "",
		transKeepBasicHtmlNodesFor: [
			"br",
			"strong",
			"i",
			"p"
		],
		useSuspense: true,
		unescape,
		transDefaultProps: void 0
	};
	var setDefaults = (options = {}) => {
		defaultOptions = {
			...defaultOptions,
			...options
		};
	};
	var getDefaults = () => defaultOptions;
	var i18nInstance;
	var setI18n = (instance) => {
		i18nInstance = instance;
	};
	var getI18n = () => i18nInstance;
	var initReactI18next = {
		type: "3rdParty",
		init(instance) {
			setDefaults(instance.options.react);
			setI18n(instance);
		}
	};
	init_compat_module();
	var I18nContext = X$1();
	var ReportNamespaces = class {
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
	};
	var require_use_sync_external_store_shim_production = __commonJSMin(((exports) => {
		var React = (init_compat_module(), __toCommonJS(compat_module_exports));
		function is(x, y) {
			return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
		}
		var objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue;
		function useSyncExternalStore$2(subscribe, getSnapshot) {
			var value = getSnapshot(), _useState = useState({ inst: {
				value,
				getSnapshot
			} }), inst = _useState[0].inst, forceUpdate = _useState[1];
			useLayoutEffect(function() {
				inst.value = value;
				inst.getSnapshot = getSnapshot;
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			}, [
				subscribe,
				value,
				getSnapshot
			]);
			useEffect(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
				return subscribe(function() {
					checkIfSnapshotChanged(inst) && forceUpdate({ inst });
				});
			}, [subscribe]);
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
				return !0;
			}
		}
		function useSyncExternalStore$1(subscribe, getSnapshot) {
			return getSnapshot();
		}
		var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
		exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
	}));
	var require_shim = __commonJSMin(((exports, module) => {
		module.exports = require_use_sync_external_store_shim_production();
	}));
	init_compat_module();
	var import_shim = require_shim();
	var notReadyT = (k, optsOrDefaultValue) => {
		if (isString(optsOrDefaultValue)) return optsOrDefaultValue;
		if (isObject$1(optsOrDefaultValue) && isString(optsOrDefaultValue.defaultValue)) return optsOrDefaultValue.defaultValue;
		if (typeof k === "function") return "";
		if (Array.isArray(k)) {
			const last = k[k.length - 1];
			return typeof last === "function" ? "" : last;
		}
		return k;
	};
	var notReadySnapshot = {
		t: notReadyT,
		ready: false
	};
	var dummySubscribe = () => () => {};
	var useTranslation = (ns, props = {}) => {
		const { i18n: i18nFromProps } = props;
		const { i18n: i18nFromContext, defaultNS: defaultNSFromContext } = x$1(I18nContext) || {};
		const i18n = i18nFromProps || i18nFromContext || getI18n();
		if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new ReportNamespaces();
		if (!i18n) warnOnce(i18n, "NO_I18NEXT_INSTANCE", "useTranslation: You will need to pass in an i18next instance by using initReactI18next");
		const i18nOptions = T$1(() => ({
			...getDefaults(),
			...i18n?.options?.react,
			...props
		}), [i18n, props]);
		const { useSuspense, keyPrefix } = i18nOptions;
		const nsOrContext = ns || defaultNSFromContext || i18n?.options?.defaultNS;
		const unstableNamespaces = isString(nsOrContext) ? [nsOrContext] : nsOrContext || ["translation"];
		const namespaces = T$1(() => unstableNamespaces, unstableNamespaces);
		i18n?.reportNamespaces?.addUsedNamespaces?.(namespaces);
		const revisionRef = A$2(0);
		const subscribe = q$1((callback) => {
			if (!i18n) return dummySubscribe;
			const { bindI18n, bindI18nStore } = i18nOptions;
			const wrappedCallback = () => {
				revisionRef.current += 1;
				callback();
			};
			if (bindI18n) i18n.on(bindI18n, wrappedCallback);
			if (bindI18nStore) i18n.store.on(bindI18nStore, wrappedCallback);
			return () => {
				if (bindI18n) bindI18n.split(" ").forEach((e) => i18n.off(e, wrappedCallback));
				if (bindI18nStore) bindI18nStore.split(" ").forEach((e) => i18n.store.off(e, wrappedCallback));
			};
		}, [i18n, i18nOptions]);
		const snapshotRef = A$2();
		const getSnapshot = q$1(() => {
			if (!i18n) return notReadySnapshot;
			const calculatedReady = !!(i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every((n) => hasLoadedNamespace(n, i18n, i18nOptions));
			const currentLng = props.lng || i18n.language;
			const currentRevision = revisionRef.current;
			const lastSnapshot = snapshotRef.current;
			if (lastSnapshot && lastSnapshot.ready === calculatedReady && lastSnapshot.lng === currentLng && lastSnapshot.keyPrefix === keyPrefix && lastSnapshot.revision === currentRevision) return lastSnapshot;
			const newSnapshot = {
				t: i18n.getFixedT(currentLng, i18nOptions.nsMode === "fallback" ? namespaces : namespaces[0], keyPrefix, { scopeNs: namespaces }),
				ready: calculatedReady,
				lng: currentLng,
				keyPrefix,
				revision: currentRevision
			};
			snapshotRef.current = newSnapshot;
			return newSnapshot;
		}, [
			i18n,
			namespaces,
			keyPrefix,
			i18nOptions,
			props.lng
		]);
		const [loadCount, setLoadCount] = d$1(0);
		const { t, ready } = (0, import_shim.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
		y$1(() => {
			if (i18n && !ready && !useSuspense) {
				const onLoaded = () => setLoadCount((c) => c + 1);
				if (props.lng) loadLanguages(i18n, props.lng, namespaces, onLoaded);
				else loadNamespaces(i18n, namespaces, onLoaded);
			}
		}, [
			i18n,
			props.lng,
			namespaces,
			ready,
			useSuspense,
			loadCount
		]);
		const finalI18n = i18n || {};
		const wrapperRef = A$2(null);
		const wrapperLangRef = A$2();
		const createI18nWrapper = (original) => {
			const descriptors = Object.getOwnPropertyDescriptors(original);
			if (descriptors.__original) delete descriptors.__original;
			const wrapper = Object.create(Object.getPrototypeOf(original), descriptors);
			if (!Object.prototype.hasOwnProperty.call(wrapper, "__original")) try {
				Object.defineProperty(wrapper, "__original", {
					value: original,
					writable: false,
					enumerable: false,
					configurable: false
				});
			} catch (_) {}
			return wrapper;
		};
		const ret = T$1(() => {
			const original = finalI18n;
			const lang = original?.language;
			let i18nWrapper = original;
			if (original) if (wrapperRef.current && wrapperRef.current.__original === original) if (wrapperLangRef.current !== lang) {
				i18nWrapper = createI18nWrapper(original);
				wrapperRef.current = i18nWrapper;
				wrapperLangRef.current = lang;
			} else i18nWrapper = wrapperRef.current;
			else {
				i18nWrapper = createI18nWrapper(original);
				wrapperRef.current = i18nWrapper;
				wrapperLangRef.current = lang;
			}
			const effectiveT = !ready && !useSuspense ? (...args) => {
				warnOnce(i18n, "USE_T_BEFORE_READY", "useTranslation: t was called before ready. When using useSuspense: false, make sure to check the ready flag before using t.");
				return t(...args);
			} : t;
			const arr = [
				effectiveT,
				i18nWrapper,
				ready
			];
			arr.t = effectiveT;
			arr.i18n = i18nWrapper;
			arr.ready = ready;
			return arr;
		}, [
			t,
			finalI18n,
			ready,
			finalI18n.resolvedLanguage,
			finalI18n.language,
			finalI18n.languages
		]);
		if (i18n && useSuspense && !ready) throw new Promise((resolve) => {
			const onLoaded = () => resolve();
			if (props.lng) loadLanguages(i18n, props.lng, namespaces, onLoaded);
			else loadNamespaces(i18n, namespaces, onLoaded);
		});
		return ret;
	};
	var en_default = {
		title: "ChatGPT Exporter",
		ExportHelper: "Export",
		Setting: "Setting",
		Language: "Language",
		"Copy Text": "Copy Text",
		"Copied!": "Copied!",
		Screenshot: "Screenshot",
		Markdown: "Markdown",
		HTML: "HTML",
		JSON: "JSON",
		Archive: "Archive",
		Save: "Save",
		Delete: "Delete",
		"Select All": "Select All",
		Export: "Export",
		Error: "Error",
		Loading: "Loading",
		Preview: "Preview",
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
	var es_default = {
		title: "ChatGPT Exporter",
		ExportHelper: "Exportar",
		Setting: "Ajustes",
		Language: "Idioma",
		"Copy Text": "Copiar Texto",
		"Copied!": "¡Copiado!",
		Screenshot: "Captura De Pantalla",
		Markdown: "Markdown",
		HTML: "HTML",
		JSON: "JSON",
		Archive: "Archivo",
		Save: "Guardar",
		Delete: "Borrar",
		"Select All": "Seleccionar Todos",
		Export: "Exportar",
		Error: "Error",
		Loading: "Cargando",
		Preview: "Previsualizar",
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
	var fr_default = {
		title: "Exportateur ChatGPT",
		ExportHelper: "Exporter",
		Setting: "Paramètre",
		Language: "Langue",
		"Copy Text": "Copier le texte",
		"Copied!": "Copié !",
		Screenshot: "Capture d'écran",
		Markdown: "Markdown",
		HTML: "HTML",
		JSON: "JSON",
		Archive: "Archiver",
		Save: "Enregistrer",
		Delete: "Supprimer",
		"Select All": "Tout sélectionner",
		Export: "Exporter",
		Error: "Erreur",
		Loading: "Chargement",
		Preview: "Aperçu",
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
	var id_default = {
		title: "ChatGPT Exporter",
		ExportHelper: "Ekspor",
		Setting: "Pengaturan",
		Language: "Bahasa",
		"Copy Text": "Salin Teks",
		"Copied!": "Disalin!",
		Screenshot: "Tangkapan Layar",
		Markdown: "Markdown",
		HTML: "HTML",
		JSON: "JSON",
		Archive: "Arsip",
		Save: "Simpan",
		Delete: "Hapus",
		"Select All": "Pilih Semua",
		Export: "Ekspor",
		Error: "Kesalahan",
		Loading: "Memuat",
		Preview: "Pratinjau",
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
	var jp_default = {
		title: "ChatGPTエクスポーター",
		ExportHelper: "エクスポート",
		Setting: "設定",
		Language: "言語",
		"Copy Text": "テキストをコピー",
		"Copied!": "コピーしました！",
		Screenshot: "スクリーンショット",
		Markdown: "Markdown",
		HTML: "HTML",
		JSON: "JSON",
		Archive: "アーカイブ",
		Save: "保存",
		Delete: "削除",
		"Select All": "すべて選択",
		Export: "エクスポート",
		Error: "エラー",
		Loading: "読み込み中",
		Preview: "プレビュー",
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
	var ru_default = {
		title: "ChatGPT Exporter",
		ExportHelper: "Export",
		Setting: "Параметры",
		Language: "Язык",
		"Copy Text": "Копировать текст",
		"Copied!": "Скопировано!",
		Screenshot: "Скриншот",
		Markdown: "Markdown",
		HTML: "HTML",
		JSON: "JSON",
		Archive: "Архивировать",
		Save: "Сохранить",
		Delete: "Удалить",
		"Select All": "Выбрать все",
		Export: "Экспорт",
		Error: "Ошибка",
		Loading: "Загрузка",
		Preview: "Предпросмотр",
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
	var tr_default = {
		title: "ChatGPT Exporter",
		ExportHelper: "Dışa Aktar",
		Setting: "Ayarlar",
		Language: "Dil",
		"Copy Text": "Metni Kopyala",
		"Copied!": "Kopyalandı!",
		Screenshot: "Ekran Alıntısı",
		Markdown: "Markdown",
		HTML: "HTML",
		JSON: "JSON",
		Archive: "Arşiv",
		Save: "Kaydet",
		Delete: "Sil",
		"Select All": "Tümünü Seç",
		Export: "Dışa Aktar",
		Error: "Hata",
		Loading: "Yükleniyor",
		Preview: "Önizleme",
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
	var zh_Hans_default = {
		title: "ChatGPT Exporter",
		ExportHelper: "导出助手",
		Setting: "设置",
		Language: "语言",
		"Copy Text": "复制文字",
		"Copied!": "已复制!",
		Screenshot: "截屏",
		Markdown: "Markdown",
		HTML: "HTML",
		JSON: "JSON",
		Archive: "归档",
		Save: "保存",
		Delete: "删除",
		"Select All": "全选",
		Export: "导出",
		Error: "错误",
		Loading: "加载中",
		Preview: "预览",
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
	var zh_Hant_default = {
		title: "ChatGPT Exporter",
		ExportHelper: "Export",
		Setting: "設定",
		Language: "語言",
		"Copy Text": "複製文字",
		"Copied!": "已複製!",
		Screenshot: "截圖",
		Markdown: "Markdown",
		HTML: "HTML",
		JSON: "JSON",
		Archive: "封存",
		Save: "保存",
		Delete: "刪除",
		"Select All": "全選",
		Export: "匯出",
		Error: "錯誤",
		Loading: "載入中",
		Preview: "預覽",
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
	var runtime = globalThis;
	var GMStorage = class {
		static get supported() {
			return typeof runtime.GM_getValue === "function" && typeof runtime.GM_setValue === "function" && typeof runtime.GM_deleteValue === "function";
		}
		static get(key) {
			if (!this.supported) return null;
			const item = runtime.GM_getValue?.(key, "");
			if (item) try {
				return JSON.parse(item);
			} catch {
				return null;
			}
			return null;
		}
		static set(key, value) {
			if (!this.supported) return;
			const item = JSON.stringify(value);
			runtime.GM_setValue?.(key, item);
		}
		static delete(key) {
			if (!this.supported) return;
			runtime.GM_deleteValue?.(key);
		}
	};
	var LocalStorage = class {
		static get supported() {
			return typeof localStorage === "object";
		}
		static get(key) {
			const item = localStorage.getItem(key);
			if (item) try {
				return JSON.parse(item);
			} catch {
				return null;
			}
			return null;
		}
		static set(key, value) {
			const item = JSON.stringify(value);
			localStorage.setItem(key, item);
		}
		static delete(key) {
			localStorage.removeItem(key);
		}
	};
	var MemoryStorage = class {
		static map = new Map();
		static supported = true;
		static get(key) {
			if (!this.map.has(key)) return null;
			return this.map.get(key);
		}
		static set(key, value) {
			this.map.set(key, value);
		}
		static delete(key) {
			this.map.delete(key);
		}
	};
	var ScriptStorage = class {
		static get(key) {
			if (GMStorage.supported) try {
				return GMStorage.get(key);
			} catch {}
			if (LocalStorage.supported) try {
				return LocalStorage.get(key);
			} catch {}
			return MemoryStorage.get(key);
		}
		static set(key, value) {
			if (GMStorage.supported) try {
				return GMStorage.set(key, value);
			} catch {}
			if (LocalStorage.supported) try {
				return LocalStorage.set(key, value);
			} catch {}
			return MemoryStorage.set(key, value);
		}
		static delete(key) {
			if (GMStorage.supported) try {
				return GMStorage.delete(key);
			} catch {}
			if (LocalStorage.supported) try {
				return LocalStorage.delete(key);
			} catch {}
			return MemoryStorage.delete(key);
		}
	};
	var EN_US = {
		name: "English",
		code: "en-US",
		resource: en_default
	};
	var ES = {
		name: "Español",
		code: "es",
		resource: es_default
	};
	var FR = {
		name: "Français",
		code: "fr",
		resource: fr_default
	};
	var ID_ID = {
		name: "Indonesia",
		code: "id-ID",
		resource: id_default
	};
	var JA_JP = {
		name: "日本語",
		code: "ja-JP",
		resource: jp_default
	};
	var RU = {
		name: "Русский",
		code: "ru",
		resource: ru_default
	};
	var TR_TR = {
		name: "Türkçe",
		code: "tr-TR",
		resource: tr_default
	};
	var ZH_Hans = {
		name: "简体中文",
		code: "zh-Hans",
		resource: zh_Hans_default
	};
	var ZH_Hant = {
		name: "繁體中文",
		code: "zh-Hant",
		resource: zh_Hant_default
	};
	var LOCALES = [
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
	var LanguageMapping = {
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
	var resources = LOCALES.reduce((acc, cur) => {
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
		if (languages && languages.length) return languages[0];
		return null;
	}
	function getOaiLanguage() {
		return (window?.localStorage?.getItem("oai/apps/locale"))?.replace(/^"(.*)"$/, "$1") ?? null;
	}
	function getDefaultLanguage() {
		const storedLanguage = ScriptStorage.get(KEY_LANGUAGE);
		const oaiLanguage = getOaiLanguage();
		const browserLanguage = getNavigatorLanguage();
		return standardizeLanguage(storedLanguage) ?? standardizeLanguage(oaiLanguage) ?? standardizeLanguage(browserLanguage) ?? EN_US.code;
	}
	instance.use(initReactI18next).init({
		fallbackLng: EN_US.code,
		lng: getDefaultLanguage(),
		debug: false,
		resources,
		interpolation: { escapeValue: false }
	}).catch((error) => {
		console.error("Failed to initialize translations:", error);
	});
	instance.on("languageChanged", (lng) => {
		ScriptStorage.set(KEY_LANGUAGE, lng);
	});
	var i18n_default = instance;
	async function copyToClipboard(text) {
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			const textarea = document.createElement("textarea");
			textarea.value = text;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand("copy");
			document.body.removeChild(textarea);
		}
	}
	var htmlVoidElements = [
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
	var Schema = class {
		constructor(property, normal, space) {
			this.normal = normal;
			this.property = property;
			if (space) this.space = space;
		}
	};
	Schema.prototype.normal = {};
	Schema.prototype.property = {};
	Schema.prototype.space = void 0;
	function merge(definitions, space) {
		const property = {};
		const normal = {};
		for (const definition of definitions) {
			Object.assign(property, definition.property);
			Object.assign(normal, definition.normal);
		}
		return new Schema(property, normal, space);
	}
	function normalize(value) {
		return value.toLowerCase();
	}
	var Info = class {
		constructor(property, attribute) {
			this.attribute = attribute;
			this.property = property;
		}
	};
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
	var types_exports = __exportAll({
		boolean: () => boolean,
		booleanish: () => booleanish,
		commaOrSpaceSeparated: () => commaOrSpaceSeparated,
		commaSeparated: () => commaSeparated,
		number: () => number,
		overloadedBoolean: () => overloadedBoolean,
		spaceSeparated: () => spaceSeparated
	});
	var powers = 0;
	var boolean = increment();
	var booleanish = increment();
	var overloadedBoolean = increment();
	var number = increment();
	var spaceSeparated = increment();
	var commaSeparated = increment();
	var commaOrSpaceSeparated = increment();
	function increment() {
		return 2 ** ++powers;
	}
	var checks = Object.keys(types_exports);
	var DefinedInfo = class extends Info {
		constructor(property, attribute, mask, space) {
			let index = -1;
			super(property, attribute);
			mark(this, "space", space);
			if (typeof mask === "number") while (++index < checks.length) {
				const check = checks[index];
				mark(this, checks[index], (mask & types_exports[check]) === types_exports[check]);
			}
		}
	};
	DefinedInfo.prototype.defined = true;
	function mark(values, key, value) {
		if (value) values[key] = value;
	}
	function create(definition) {
		const properties = {};
		const normals = {};
		for (const [property, value] of Object.entries(definition.properties)) {
			const info = new DefinedInfo(property, definition.transform(definition.attributes || {}, property), value, definition.space);
			if (definition.mustUseProperty && definition.mustUseProperty.includes(property)) info.mustUseProperty = true;
			properties[property] = info;
			normals[normalize(property)] = property;
			normals[normalize(info.attribute)] = property;
		}
		return new Schema(properties, normals, definition.space);
	}
	var aria = create({
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
		transform(_, property) {
			return property === "role" ? property : "aria-" + property.slice(4).toLowerCase();
		}
	});
	function caseSensitiveTransform(attributes, attribute) {
		return attribute in attributes ? attributes[attribute] : attribute;
	}
	function caseInsensitiveTransform(attributes, property) {
		return caseSensitiveTransform(attributes, property.toLowerCase());
	}
	var html$5 = create({
		attributes: {
			acceptcharset: "accept-charset",
			classname: "class",
			htmlfor: "for",
			httpequiv: "http-equiv"
		},
		mustUseProperty: [
			"checked",
			"multiple",
			"muted",
			"selected"
		],
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
	var svg$1 = create({
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
	var xlink = create({
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
		transform(_, property) {
			return "xlink:" + property.slice(5).toLowerCase();
		}
	});
	var xmlns = create({
		attributes: { xmlnsxlink: "xmlns:xlink" },
		properties: {
			xmlnsXLink: null,
			xmlns: null
		},
		space: "xmlns",
		transform: caseInsensitiveTransform
	});
	var xml = create({
		properties: {
			xmlBase: null,
			xmlLang: null,
			xmlSpace: null
		},
		space: "xml",
		transform(_, property) {
			return "xml:" + property.slice(3).toLowerCase();
		}
	});
	var cap = /[A-Z]/g;
	var dash = /-[a-z]/g;
	var valid = /^data[-\w.:]+$/i;
	function find(schema, value) {
		const normal = normalize(value);
		let property = value;
		let Type = Info;
		if (normal in schema.normal) return schema.property[schema.normal[normal]];
		if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
			if (value.charAt(4) === "-") {
				const rest = value.slice(5).replace(dash, camelcase);
				property = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
			} else {
				const rest = value.slice(4);
				if (!dash.test(rest)) {
					let dashes = rest.replace(cap, kebab);
					if (dashes.charAt(0) !== "-") dashes = "-" + dashes;
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
	var html$4 = merge([
		aria,
		html$5,
		xlink,
		xmlns,
		xml
	], "html");
	var svg = merge([
		aria,
		svg$1,
		xlink,
		xmlns,
		xml
	], "svg");
	var own$5 = {}.hasOwnProperty;
	function zwitch(key, options) {
		const settings = options || {};
		function one(value, ...parameters) {
			let fn = one.invalid;
			const handlers = one.handlers;
			if (value && own$5.call(value, key)) {
				const id = String(value[key]);
				fn = own$5.call(handlers, id) ? handlers[id] : one.unknown;
			}
			if (fn) return fn.call(this, value, ...parameters);
		}
		one.handlers = settings.handlers || {};
		one.invalid = settings.invalid;
		one.unknown = settings.unknown;
		return one;
	}
	var defaultSubsetRegex = /["&'<>`]/g;
	var surrogatePairsRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	var controlCharactersRegex = /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
	var regexEscapeRegex = /[|\\{}()[\]^$+*?.]/g;
	var subsetToRegexCache = new WeakMap();
	function core(value, options) {
		value = value.replace(options.subset ? charactersToExpressionCached(options.subset) : defaultSubsetRegex, basic);
		if (options.subset || options.escapeOnly) return value;
		return value.replace(surrogatePairsRegex, surrogate).replace(controlCharactersRegex, basic);
		function surrogate(pair, index, all) {
			return options.format((pair.charCodeAt(0) - 55296) * 1024 + pair.charCodeAt(1) - 56320 + 65536, all.charCodeAt(index + 2), options);
		}
		function basic(character, index, all) {
			return options.format(character.charCodeAt(0), all.charCodeAt(index + 1), options);
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
		let index = -1;
		while (++index < subset.length) groups.push(subset[index].replace(regexEscapeRegex, "\\$&"));
		return new RegExp("(?:" + groups.join("|") + ")", "g");
	}
	var hexadecimalRegex = /[\dA-Fa-f]/;
	function toHexadecimal(code, next, omit) {
		const value = "&#x" + code.toString(16).toUpperCase();
		return omit && next && !hexadecimalRegex.test(String.fromCharCode(next)) ? value : value + ";";
	}
	var decimalRegex = /\d/;
	function toDecimal(code, next, omit) {
		const value = "&#" + String(code);
		return omit && next && !decimalRegex.test(String.fromCharCode(next)) ? value : value + ";";
	}
	var characterEntitiesLegacy = [
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
	var characterEntitiesHtml4 = {
		nbsp: "\xA0",
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
		quot: "\"",
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
	var dangerous = [
		"cent",
		"copy",
		"divide",
		"gt",
		"lt",
		"not",
		"para",
		"times"
	];
	var own$4 = {}.hasOwnProperty;
	var characters = {};
	var key;
	for (key in characterEntitiesHtml4) if (own$4.call(characterEntitiesHtml4, key)) characters[characterEntitiesHtml4[key]] = key;
	var notAlphanumericRegex = /[^\dA-Za-z]/;
	function toNamed(code, next, omit, attribute) {
		const character = String.fromCharCode(code);
		if (own$4.call(characters, character)) {
			const name = characters[character];
			const value = "&" + name;
			if (omit && characterEntitiesLegacy.includes(name) && !dangerous.includes(name) && (!attribute || next && next !== 61 && notAlphanumericRegex.test(String.fromCharCode(next)))) return value;
			return value + ";";
		}
		return "";
	}
	function formatSmart(code, next, options) {
		let numeric = toHexadecimal(code, next, options.omitOptionalSemicolons);
		let named;
		if (options.useNamedReferences || options.useShortestReferences) named = toNamed(code, next, options.omitOptionalSemicolons, options.attribute);
		if ((options.useShortestReferences || !named) && options.useShortestReferences) {
			const decimal = toDecimal(code, next, options.omitOptionalSemicolons);
			if (decimal.length < numeric.length) numeric = decimal;
		}
		return named && (!options.useShortestReferences || named.length < numeric.length) ? named : numeric;
	}
	function stringifyEntities(value, options) {
		return core(value, Object.assign({ format: formatSmart }, options));
	}
	var htmlCommentRegex = /^>|^->|<!--|-->|--!>|<!-$/g;
	var bogusCommentEntitySubset = [">"];
	var commentEntitySubset = ["<", ">"];
	function comment(node, _1, _2, state) {
		return state.settings.bogusComments ? "<?" + stringifyEntities(node.value, Object.assign({}, state.settings.characterReferences, { subset: bogusCommentEntitySubset })) + ">" : "<!--" + node.value.replace(htmlCommentRegex, encode) + "-->";
		function encode($0) {
			return stringifyEntities($0, Object.assign({}, state.settings.characterReferences, { subset: commentEntitySubset }));
		}
	}
	function doctype(_1, _2, _3, state) {
		return "<!" + (state.settings.upperDoctype ? "DOCTYPE" : "doctype") + (state.settings.tightDoctype ? "" : " ") + "html>";
	}
	function ccount(value, character) {
		const source = String(value);
		if (typeof character !== "string") throw new TypeError("Expected character");
		let count = 0;
		let index = source.indexOf(character);
		while (index !== -1) {
			count++;
			index = source.indexOf(character, index + character.length);
		}
		return count;
	}
	function stringify$1(values, options) {
		const settings = options || {};
		return (values[values.length - 1] === "" ? [...values, ""] : values).join((settings.padRight ? " " : "") + "," + (settings.padLeft === false ? "" : " ")).trim();
	}
	function stringify(values) {
		return values.join(" ").trim();
	}
	var re = /[ \t\n\f\r]/g;
	function whitespace(thing) {
		return typeof thing === "object" ? thing.type === "text" ? empty$1(thing.value) : false : empty$1(thing);
	}
	function empty$1(value) {
		return value.replace(re, "") === "";
	}
	var siblingAfter = siblings(1);
	var siblingBefore = siblings(-1);
	var emptyChildren$1 = [];
	function siblings(increment) {
		return sibling;
		function sibling(parent, index, includeWhitespace) {
			const siblings = parent ? parent.children : emptyChildren$1;
			let offset = (index || 0) + increment;
			let next = siblings[offset];
			if (!includeWhitespace) while (next && whitespace(next)) {
				offset += increment;
				next = siblings[offset];
			}
			return next;
		}
	}
	var own$3 = {}.hasOwnProperty;
	function omission(handlers) {
		return omit;
		function omit(node, index, parent) {
			return own$3.call(handlers, node.tagName) && handlers[node.tagName](node, index, parent);
		}
	}
	var closing = omission({
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
		p: p$1,
		rp: rubyElement,
		rt: rubyElement,
		tbody: tbody$1,
		td: cells,
		tfoot,
		th: cells,
		thead,
		tr
	});
	function headOrColgroupOrCaption(_, index, parent) {
		const next = siblingAfter(parent, index, true);
		return !next || next.type !== "comment" && !(next.type === "text" && whitespace(next.value.charAt(0)));
	}
	function html$3(_, index, parent) {
		const next = siblingAfter(parent, index);
		return !next || next.type !== "comment";
	}
	function body$1(_, index, parent) {
		const next = siblingAfter(parent, index);
		return !next || next.type !== "comment";
	}
	function p$1(_, index, parent) {
		const next = siblingAfter(parent, index);
		return next ? next.type === "element" && (next.tagName === "address" || next.tagName === "article" || next.tagName === "aside" || next.tagName === "blockquote" || next.tagName === "details" || next.tagName === "div" || next.tagName === "dl" || next.tagName === "fieldset" || next.tagName === "figcaption" || next.tagName === "figure" || next.tagName === "footer" || next.tagName === "form" || next.tagName === "h1" || next.tagName === "h2" || next.tagName === "h3" || next.tagName === "h4" || next.tagName === "h5" || next.tagName === "h6" || next.tagName === "header" || next.tagName === "hgroup" || next.tagName === "hr" || next.tagName === "main" || next.tagName === "menu" || next.tagName === "nav" || next.tagName === "ol" || next.tagName === "p" || next.tagName === "pre" || next.tagName === "section" || next.tagName === "table" || next.tagName === "ul") : !parent || !(parent.type === "element" && (parent.tagName === "a" || parent.tagName === "audio" || parent.tagName === "del" || parent.tagName === "ins" || parent.tagName === "map" || parent.tagName === "noscript" || parent.tagName === "video"));
	}
	function li(_, index, parent) {
		const next = siblingAfter(parent, index);
		return !next || next.type === "element" && next.tagName === "li";
	}
	function dt(_, index, parent) {
		const next = siblingAfter(parent, index);
		return Boolean(next && next.type === "element" && (next.tagName === "dt" || next.tagName === "dd"));
	}
	function dd(_, index, parent) {
		const next = siblingAfter(parent, index);
		return !next || next.type === "element" && (next.tagName === "dt" || next.tagName === "dd");
	}
	function rubyElement(_, index, parent) {
		const next = siblingAfter(parent, index);
		return !next || next.type === "element" && (next.tagName === "rp" || next.tagName === "rt");
	}
	function optgroup(_, index, parent) {
		const next = siblingAfter(parent, index);
		return !next || next.type === "element" && next.tagName === "optgroup";
	}
	function option(_, index, parent) {
		const next = siblingAfter(parent, index);
		return !next || next.type === "element" && (next.tagName === "option" || next.tagName === "optgroup");
	}
	function thead(_, index, parent) {
		const next = siblingAfter(parent, index);
		return Boolean(next && next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot"));
	}
	function tbody$1(_, index, parent) {
		const next = siblingAfter(parent, index);
		return !next || next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot");
	}
	function tfoot(_, index, parent) {
		return !siblingAfter(parent, index);
	}
	function tr(_, index, parent) {
		const next = siblingAfter(parent, index);
		return !next || next.type === "element" && next.tagName === "tr";
	}
	function cells(_, index, parent) {
		const next = siblingAfter(parent, index);
		return !next || next.type === "element" && (next.tagName === "td" || next.tagName === "th");
	}
	var opening = omission({
		body,
		colgroup,
		head,
		html: html$2,
		tbody
	});
	function html$2(node) {
		const head = siblingAfter(node, -1);
		return !head || head.type !== "comment";
	}
	function head(node) {
		const seen = new Set();
		for (const child of node.children) if (child.type === "element" && (child.tagName === "base" || child.tagName === "title")) {
			if (seen.has(child.tagName)) return false;
			seen.add(child.tagName);
		}
		const child = node.children[0];
		return !child || child.type === "element";
	}
	function body(node) {
		const head = siblingAfter(node, -1, true);
		return !head || head.type !== "comment" && !(head.type === "text" && whitespace(head.value.charAt(0))) && !(head.type === "element" && (head.tagName === "meta" || head.tagName === "link" || head.tagName === "script" || head.tagName === "style" || head.tagName === "template"));
	}
	function colgroup(node, index, parent) {
		const previous = siblingBefore(parent, index);
		const head = siblingAfter(node, -1, true);
		if (parent && previous && previous.type === "element" && previous.tagName === "colgroup" && closing(previous, parent.children.indexOf(previous), parent)) return false;
		return Boolean(head && head.type === "element" && head.tagName === "col");
	}
	function tbody(node, index, parent) {
		const previous = siblingBefore(parent, index);
		const head = siblingAfter(node, -1);
		if (parent && previous && previous.type === "element" && (previous.tagName === "thead" || previous.tagName === "tbody") && closing(previous, parent.children.indexOf(previous), parent)) return false;
		return Boolean(head && head.type === "element" && head.tagName === "tr");
	}
	var constants = {
		name: [["	\n\f\r &/=>".split(""), "	\n\f\r \"&'/=>`".split("")], ["\0	\n\f\r \"&'/<=>".split(""), "\0	\n\f\r \"&'/<=>`".split("")]],
		unquoted: [["	\n\f\r &>".split(""), "\0	\n\f\r \"&'<=>`".split("")], ["\0	\n\f\r \"&'<=>`".split(""), "\0	\n\f\r \"&'<=>`".split("")]],
		single: [["&'".split(""), "\"&'`".split("")], ["\0&'".split(""), "\0\"&'`".split("")]],
		double: [["\"&".split(""), "\"&'`".split("")], ["\0\"&".split(""), "\0\"&'`".split("")]]
	};
	function element$1(node, index, parent, state) {
		const schema = state.schema;
		const omit = schema.space === "svg" ? false : state.settings.omitOptionalTags;
		let selfClosing = schema.space === "svg" ? state.settings.closeEmptyElements : state.settings.voids.includes(node.tagName.toLowerCase());
		const parts = [];
		let last;
		if (schema.space === "html" && node.tagName === "svg") state.schema = svg;
		const attributes = serializeAttributes(state, node.properties);
		const content = state.all(schema.space === "html" && node.tagName === "template" ? node.content : node);
		state.schema = schema;
		if (content) selfClosing = false;
		if (attributes || !omit || !opening(node, index, parent)) {
			parts.push("<", node.tagName, attributes ? " " + attributes : "");
			if (selfClosing && (schema.space === "svg" || state.settings.closeSelfClosing)) {
				last = attributes.charAt(attributes.length - 1);
				if (!state.settings.tightSelfClosing || last === "/" || last && last !== "\"" && last !== "'") parts.push(" ");
				parts.push("/");
			}
			parts.push(">");
		}
		parts.push(content);
		if (!selfClosing && (!omit || !closing(node, index, parent))) parts.push("</" + node.tagName + ">");
		return parts.join("");
	}
	function serializeAttributes(state, properties) {
		const values = [];
		let index = -1;
		let key;
		if (properties) {
			for (key in properties) if (properties[key] !== null && properties[key] !== void 0) {
				const value = serializeAttribute(state, key, properties[key]);
				if (value) values.push(value);
			}
		}
		while (++index < values.length) {
			const last = state.settings.tightAttributes ? values[index].charAt(values[index].length - 1) : void 0;
			if (index !== values.length - 1 && last !== "\"" && last !== "'") values[index] += " ";
		}
		return values.join("");
	}
	function serializeAttribute(state, key, value) {
		const info = find(state.schema, key);
		const x = state.settings.allowParseErrors && state.schema.space === "html" ? 0 : 1;
		const y = state.settings.allowDangerousCharacters ? 0 : 1;
		let quote = state.quote;
		let result;
		if (info.overloadedBoolean && (value === info.attribute || value === "")) value = true;
		else if ((info.boolean || info.overloadedBoolean) && (typeof value !== "string" || value === info.attribute || value === "")) value = Boolean(value);
		if (value === null || value === void 0 || value === false || typeof value === "number" && Number.isNaN(value)) return "";
		const name = stringifyEntities(info.attribute, Object.assign({}, state.settings.characterReferences, { subset: constants.name[x][y] }));
		if (value === true) return name;
		value = Array.isArray(value) ? (info.commaSeparated ? stringify$1 : stringify)(value, { padLeft: !state.settings.tightCommaSeparatedLists }) : String(value);
		if (state.settings.collapseEmptyAttributes && !value) return name;
		if (state.settings.preferUnquoted) result = stringifyEntities(value, Object.assign({}, state.settings.characterReferences, {
			attribute: true,
			subset: constants.unquoted[x][y]
		}));
		if (result !== value) {
			if (state.settings.quoteSmart && ccount(value, quote) > ccount(value, state.alternative)) quote = state.alternative;
			result = quote + stringifyEntities(value, Object.assign({}, state.settings.characterReferences, {
				subset: (quote === "'" ? constants.single : constants.double)[x][y],
				attribute: true
			})) + quote;
		}
		return name + (result ? "=" + result : result);
	}
	var textEntitySubset = ["<", "&"];
	function text$5(node, _, parent, state) {
		return parent && parent.type === "element" && (parent.tagName === "script" || parent.tagName === "style") ? node.value : stringifyEntities(node.value, Object.assign({}, state.settings.characterReferences, { subset: textEntitySubset }));
	}
	function raw(node, index, parent, state) {
		return state.settings.allowDangerousHtml ? node.value : text$5(node, index, parent, state);
	}
	function root$2(node, _1, _2, state) {
		return state.all(node);
	}
	var handle$1 = zwitch("type", {
		invalid: invalid$1,
		unknown: unknown$1,
		handlers: {
			comment,
			doctype,
			element: element$1,
			raw,
			root: root$2,
			text: text$5
		}
	});
	function invalid$1(node) {
		throw new Error("Expected node, not `" + node + "`");
	}
	function unknown$1(node_) {
		throw new Error("Cannot compile unknown node `" + node_.type + "`");
	}
	var emptyOptions$2 = {};
	var emptyCharacterReferences = {};
	var emptyChildren = [];
	function toHtml$1(tree, options) {
		const options_ = options || emptyOptions$2;
		const quote = options_.quote || "\"";
		const alternative = quote === "\"" ? "'" : "\"";
		if (quote !== "\"" && quote !== "'") throw new Error("Invalid quote `" + quote + "`, expected `'` or `\"`");
		return {
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
		}.one(Array.isArray(tree) ? {
			type: "root",
			children: tree
		} : tree, void 0, void 0);
	}
	function one$1(node, index, parent) {
		return handle$1(node, index, parent, this);
	}
	function all$1(parent) {
		const results = [];
		const children = parent && parent.children || emptyChildren;
		let index = -1;
		while (++index < children.length) results[index] = this.one(children[index], index, parent);
		return results.join("");
	}
	var emptyOptions$1 = {};
	function toString$1(value, options) {
		const settings = options || emptyOptions$1;
		return one(value, typeof settings.includeImageAlt === "boolean" ? settings.includeImageAlt : true, typeof settings.includeHtml === "boolean" ? settings.includeHtml : true);
	}
	function one(value, includeImageAlt, includeHtml) {
		if (node(value)) {
			if ("value" in value) return value.type === "html" && !includeHtml ? "" : value.value;
			if (includeImageAlt && "alt" in value && value.alt) return value.alt;
			if ("children" in value) return all(value.children, includeImageAlt, includeHtml);
		}
		if (Array.isArray(value)) return all(value, includeImageAlt, includeHtml);
		return "";
	}
	function all(values, includeImageAlt, includeHtml) {
		const result = [];
		let index = -1;
		while (++index < values.length) result[index] = one(values[index], includeImageAlt, includeHtml);
		return result.join("");
	}
	function node(value) {
		return Boolean(value && typeof value === "object");
	}
	var element = document.createElement("i");
	function decodeNamedCharacterReference(value) {
		const characterReference = "&" + value + ";";
		element.innerHTML = characterReference;
		const character = element.textContent;
		if (character.charCodeAt(character.length - 1) === 59 && value !== "semi") return false;
		return character === characterReference ? false : character;
	}
	function splice(list, start, remove, items) {
		const end = list.length;
		let chunkStart = 0;
		let parameters;
		if (start < 0) start = -start > end ? 0 : end + start;
		else start = start > end ? end : start;
		remove = remove > 0 ? remove : 0;
		if (items.length < 1e4) {
			parameters = Array.from(items);
			parameters.unshift(start, remove);
			list.splice(...parameters);
		} else {
			if (remove) list.splice(start, remove);
			while (chunkStart < items.length) {
				parameters = items.slice(chunkStart, chunkStart + 1e4);
				parameters.unshift(start, 0);
				list.splice(...parameters);
				chunkStart += 1e4;
				start += 1e4;
			}
		}
	}
	function push(list, items) {
		if (list.length > 0) {
			splice(list, list.length, 0, items);
			return list;
		}
		return items;
	}
	var hasOwnProperty = {}.hasOwnProperty;
	function combineExtensions(extensions) {
		const all = {};
		let index = -1;
		while (++index < extensions.length) syntaxExtension(all, extensions[index]);
		return all;
	}
	function syntaxExtension(all, extension) {
		let hook;
		for (hook in extension) {
			const left = (hasOwnProperty.call(all, hook) ? all[hook] : void 0) || (all[hook] = {});
			const right = extension[hook];
			let code;
			if (right) for (code in right) {
				if (!hasOwnProperty.call(left, code)) left[code] = [];
				const value = right[code];
				constructs(left[code], Array.isArray(value) ? value : value ? [value] : []);
			}
		}
	}
	function constructs(existing, list) {
		let index = -1;
		const before = [];
		while (++index < list.length) (list[index].add === "after" ? existing : before).push(list[index]);
		splice(existing, 0, 0, before);
	}
	function decodeNumericCharacterReference(value, base) {
		const code = Number.parseInt(value, base);
		if (code < 9 || code === 11 || code > 13 && code < 32 || code > 126 && code < 160 || code > 55295 && code < 57344 || code > 64975 && code < 65008 || (code & 65535) === 65535 || (code & 65535) === 65534 || code > 1114111) return "�";
		return String.fromCodePoint(code);
	}
	function normalizeIdentifier(value) {
		return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
	}
	var asciiAlpha = regexCheck(/[A-Za-z]/);
	var asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
	var asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
	function asciiControl(code) {
		return code !== null && (code < 32 || code === 127);
	}
	var asciiDigit = regexCheck(/\d/);
	var asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
	var asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
	function markdownLineEnding(code) {
		return code !== null && code < -2;
	}
	function markdownLineEndingOrSpace(code) {
		return code !== null && (code < 0 || code === 32);
	}
	function markdownSpace(code) {
		return code === -2 || code === -1 || code === 32;
	}
	var unicodePunctuation = regexCheck(/\p{P}|\p{S}/u);
	var unicodeWhitespace = regexCheck(/\s/);
	function regexCheck(regex) {
		return check;
		function check(code) {
			return code !== null && code > -1 && regex.test(String.fromCharCode(code));
		}
	}
	function normalizeUri(value) {
		const result = [];
		let index = -1;
		let start = 0;
		let skip = 0;
		while (++index < value.length) {
			const code = value.charCodeAt(index);
			let replace = "";
			if (code === 37 && asciiAlphanumeric(value.charCodeAt(index + 1)) && asciiAlphanumeric(value.charCodeAt(index + 2))) skip = 2;
			else if (code < 128) {
				if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code))) replace = String.fromCharCode(code);
			} else if (code > 55295 && code < 57344) {
				const next = value.charCodeAt(index + 1);
				if (code < 56320 && next > 56319 && next < 57344) {
					replace = String.fromCharCode(code, next);
					skip = 1;
				} else replace = "�";
			} else replace = String.fromCharCode(code);
			if (replace) {
				result.push(value.slice(start, index), encodeURIComponent(replace));
				start = index + skip + 1;
				replace = "";
			}
			if (skip) {
				index += skip;
				skip = 0;
			}
		}
		return result.join("") + value.slice(start);
	}
	function factorySpace(effects, ok, type, max) {
		const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
		let size = 0;
		return start;
		function start(code) {
			if (markdownSpace(code)) {
				effects.enter(type);
				return prefix(code);
			}
			return ok(code);
		}
		function prefix(code) {
			if (markdownSpace(code) && size++ < limit) {
				effects.consume(code);
				return prefix;
			}
			effects.exit(type);
			return ok(code);
		}
	}
	var content$1 = { tokenize: initializeContent };
	function initializeContent(effects) {
		const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
		let previous;
		return contentStart;
		function afterContentStartConstruct(code) {
			if (code === null) {
				effects.consume(code);
				return;
			}
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return factorySpace(effects, contentStart, "linePrefix");
		}
		function paragraphInitial(code) {
			effects.enter("paragraph");
			return lineStart(code);
		}
		function lineStart(code) {
			const token = effects.enter("chunkText", {
				contentType: "text",
				previous
			});
			if (previous) previous.next = token;
			previous = token;
			return data(code);
		}
		function data(code) {
			if (code === null) {
				effects.exit("chunkText");
				effects.exit("paragraph");
				effects.consume(code);
				return;
			}
			if (markdownLineEnding(code)) {
				effects.consume(code);
				effects.exit("chunkText");
				return lineStart;
			}
			effects.consume(code);
			return data;
		}
	}
	var document$2 = { tokenize: initializeDocument };
	var containerConstruct = { tokenize: tokenizeContainer };
	function initializeDocument(effects) {
		const self = this;
		const stack = [];
		let continued = 0;
		let childFlow;
		let childToken;
		let lineStartOffset;
		return start;
		function start(code) {
			if (continued < stack.length) {
				const item = stack[continued];
				self.containerState = item[1];
				return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code);
			}
			return checkNewContainers(code);
		}
		function documentContinue(code) {
			continued++;
			if (self.containerState._closeFlow) {
				self.containerState._closeFlow = void 0;
				if (childFlow) closeFlow();
				const indexBeforeExits = self.events.length;
				let indexBeforeFlow = indexBeforeExits;
				let point;
				while (indexBeforeFlow--) if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
					point = self.events[indexBeforeFlow][1].end;
					break;
				}
				exitContainers(continued);
				let index = indexBeforeExits;
				while (index < self.events.length) {
					self.events[index][1].end = { ...point };
					index++;
				}
				splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
				self.events.length = index;
				return checkNewContainers(code);
			}
			return start(code);
		}
		function checkNewContainers(code) {
			if (continued === stack.length) {
				if (!childFlow) return documentContinued(code);
				if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) return flowStart(code);
				self.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
			}
			self.containerState = {};
			return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code);
		}
		function thereIsANewContainer(code) {
			if (childFlow) closeFlow();
			exitContainers(continued);
			return documentContinued(code);
		}
		function thereIsNoNewContainer(code) {
			self.parser.lazy[self.now().line] = continued !== stack.length;
			lineStartOffset = self.now().offset;
			return flowStart(code);
		}
		function documentContinued(code) {
			self.containerState = {};
			return effects.attempt(containerConstruct, containerContinue, flowStart)(code);
		}
		function containerContinue(code) {
			continued++;
			stack.push([self.currentConstruct, self.containerState]);
			return documentContinued(code);
		}
		function flowStart(code) {
			if (code === null) {
				if (childFlow) closeFlow();
				exitContainers(0);
				effects.consume(code);
				return;
			}
			childFlow = childFlow || self.parser.flow(self.now());
			effects.enter("chunkFlow", {
				_tokenizer: childFlow,
				contentType: "flow",
				previous: childToken
			});
			return flowContinue(code);
		}
		function flowContinue(code) {
			if (code === null) {
				writeToChild(effects.exit("chunkFlow"), true);
				exitContainers(0);
				effects.consume(code);
				return;
			}
			if (markdownLineEnding(code)) {
				effects.consume(code);
				writeToChild(effects.exit("chunkFlow"));
				continued = 0;
				self.interrupt = void 0;
				return start;
			}
			effects.consume(code);
			return flowContinue;
		}
		function writeToChild(token, endOfFile) {
			const stream = self.sliceStream(token);
			if (endOfFile) stream.push(null);
			token.previous = childToken;
			if (childToken) childToken.next = token;
			childToken = token;
			childFlow.defineSkip(token.start);
			childFlow.write(stream);
			if (self.parser.lazy[token.start.line]) {
				let index = childFlow.events.length;
				while (index--) if (childFlow.events[index][1].start.offset < lineStartOffset && (!childFlow.events[index][1].end || childFlow.events[index][1].end.offset > lineStartOffset)) return;
				const indexBeforeExits = self.events.length;
				let indexBeforeFlow = indexBeforeExits;
				let seen;
				let point;
				while (indexBeforeFlow--) if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
					if (seen) {
						point = self.events[indexBeforeFlow][1].end;
						break;
					}
					seen = true;
				}
				exitContainers(continued);
				index = indexBeforeExits;
				while (index < self.events.length) {
					self.events[index][1].end = { ...point };
					index++;
				}
				splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
				self.events.length = index;
			}
		}
		function exitContainers(size) {
			let index = stack.length;
			while (index-- > size) {
				const entry = stack[index];
				self.containerState = entry[1];
				entry[0].exit.call(self, effects);
			}
			stack.length = size;
		}
		function closeFlow() {
			childFlow.write([null]);
			childToken = void 0;
			childFlow = void 0;
			self.containerState._closeFlow = void 0;
		}
	}
	function tokenizeContainer(effects, ok, nok) {
		return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
	}
	function classifyCharacter(code) {
		if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) return 1;
		if (unicodePunctuation(code)) return 2;
	}
	function resolveAll(constructs, events, context) {
		const called = [];
		let index = -1;
		while (++index < constructs.length) {
			const resolve = constructs[index].resolveAll;
			if (resolve && !called.includes(resolve)) {
				events = resolve(events, context);
				called.push(resolve);
			}
		}
		return events;
	}
	var attention = {
		name: "attention",
		resolveAll: resolveAllAttention,
		tokenize: tokenizeAttention
	};
	function resolveAllAttention(events, context) {
		let index = -1;
		let open;
		let group;
		let text;
		let openingSequence;
		let closingSequence;
		let use;
		let nextEvents;
		let offset;
		while (++index < events.length) if (events[index][0] === "enter" && events[index][1].type === "attentionSequence" && events[index][1]._close) {
			open = index;
			while (open--) if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index][1]).charCodeAt(0)) {
				if ((events[open][1]._close || events[index][1]._open) && (events[index][1].end.offset - events[index][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index][1].end.offset - events[index][1].start.offset) % 3)) continue;
				use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index][1].end.offset - events[index][1].start.offset > 1 ? 2 : 1;
				const start = { ...events[open][1].end };
				const end = { ...events[index][1].start };
				movePoint(start, -use);
				movePoint(end, use);
				openingSequence = {
					type: use > 1 ? "strongSequence" : "emphasisSequence",
					start,
					end: { ...events[open][1].end }
				};
				closingSequence = {
					type: use > 1 ? "strongSequence" : "emphasisSequence",
					start: { ...events[index][1].start },
					end
				};
				text = {
					type: use > 1 ? "strongText" : "emphasisText",
					start: { ...events[open][1].end },
					end: { ...events[index][1].start }
				};
				group = {
					type: use > 1 ? "strong" : "emphasis",
					start: { ...openingSequence.start },
					end: { ...closingSequence.end }
				};
				events[open][1].end = { ...openingSequence.start };
				events[index][1].start = { ...closingSequence.end };
				nextEvents = [];
				if (events[open][1].end.offset - events[open][1].start.offset) nextEvents = push(nextEvents, [[
					"enter",
					events[open][1],
					context
				], [
					"exit",
					events[open][1],
					context
				]]);
				nextEvents = push(nextEvents, [
					[
						"enter",
						group,
						context
					],
					[
						"enter",
						openingSequence,
						context
					],
					[
						"exit",
						openingSequence,
						context
					],
					[
						"enter",
						text,
						context
					]
				]);
				nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index), context));
				nextEvents = push(nextEvents, [
					[
						"exit",
						text,
						context
					],
					[
						"enter",
						closingSequence,
						context
					],
					[
						"exit",
						closingSequence,
						context
					],
					[
						"exit",
						group,
						context
					]
				]);
				if (events[index][1].end.offset - events[index][1].start.offset) {
					offset = 2;
					nextEvents = push(nextEvents, [[
						"enter",
						events[index][1],
						context
					], [
						"exit",
						events[index][1],
						context
					]]);
				} else offset = 0;
				splice(events, open - 1, index - open + 3, nextEvents);
				index = open + nextEvents.length - offset - 2;
				break;
			}
		}
		index = -1;
		while (++index < events.length) if (events[index][1].type === "attentionSequence") events[index][1].type = "data";
		return events;
	}
	function tokenizeAttention(effects, ok) {
		const attentionMarkers = this.parser.constructs.attentionMarkers.null;
		const previous = this.previous;
		const before = classifyCharacter(previous);
		let marker;
		return start;
		function start(code) {
			marker = code;
			effects.enter("attentionSequence");
			return inside(code);
		}
		function inside(code) {
			if (code === marker) {
				effects.consume(code);
				return inside;
			}
			const token = effects.exit("attentionSequence");
			const after = classifyCharacter(code);
			const open = !after || after === 2 && before || attentionMarkers.includes(code);
			const close = !before || before === 2 && after || attentionMarkers.includes(previous);
			token._open = Boolean(marker === 42 ? open : open && (before || !close));
			token._close = Boolean(marker === 42 ? close : close && (after || !open));
			return ok(code);
		}
	}
	function movePoint(point, offset) {
		point.column += offset;
		point.offset += offset;
		point._bufferIndex += offset;
	}
	var autolink = {
		name: "autolink",
		tokenize: tokenizeAutolink
	};
	function tokenizeAutolink(effects, ok, nok) {
		let size = 0;
		return start;
		function start(code) {
			effects.enter("autolink");
			effects.enter("autolinkMarker");
			effects.consume(code);
			effects.exit("autolinkMarker");
			effects.enter("autolinkProtocol");
			return open;
		}
		function open(code) {
			if (asciiAlpha(code)) {
				effects.consume(code);
				return schemeOrEmailAtext;
			}
			if (code === 64) return nok(code);
			return emailAtext(code);
		}
		function schemeOrEmailAtext(code) {
			if (code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) {
				size = 1;
				return schemeInsideOrEmailAtext(code);
			}
			return emailAtext(code);
		}
		function schemeInsideOrEmailAtext(code) {
			if (code === 58) {
				effects.consume(code);
				size = 0;
				return urlInside;
			}
			if ((code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) && size++ < 32) {
				effects.consume(code);
				return schemeInsideOrEmailAtext;
			}
			size = 0;
			return emailAtext(code);
		}
		function urlInside(code) {
			if (code === 62) {
				effects.exit("autolinkProtocol");
				effects.enter("autolinkMarker");
				effects.consume(code);
				effects.exit("autolinkMarker");
				effects.exit("autolink");
				return ok;
			}
			if (code === null || code === 32 || code === 60 || asciiControl(code)) return nok(code);
			effects.consume(code);
			return urlInside;
		}
		function emailAtext(code) {
			if (code === 64) {
				effects.consume(code);
				return emailAtSignOrDot;
			}
			if (asciiAtext(code)) {
				effects.consume(code);
				return emailAtext;
			}
			return nok(code);
		}
		function emailAtSignOrDot(code) {
			return asciiAlphanumeric(code) ? emailLabel(code) : nok(code);
		}
		function emailLabel(code) {
			if (code === 46) {
				effects.consume(code);
				size = 0;
				return emailAtSignOrDot;
			}
			if (code === 62) {
				effects.exit("autolinkProtocol").type = "autolinkEmail";
				effects.enter("autolinkMarker");
				effects.consume(code);
				effects.exit("autolinkMarker");
				effects.exit("autolink");
				return ok;
			}
			return emailValue(code);
		}
		function emailValue(code) {
			if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
				const next = code === 45 ? emailValue : emailLabel;
				effects.consume(code);
				return next;
			}
			return nok(code);
		}
	}
	var blankLine = {
		partial: true,
		tokenize: tokenizeBlankLine
	};
	function tokenizeBlankLine(effects, ok, nok) {
		return start;
		function start(code) {
			return markdownSpace(code) ? factorySpace(effects, after, "linePrefix")(code) : after(code);
		}
		function after(code) {
			return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
		}
	}
	var blockQuote = {
		continuation: { tokenize: tokenizeBlockQuoteContinuation },
		exit: exit$1,
		name: "blockQuote",
		tokenize: tokenizeBlockQuoteStart
	};
	function tokenizeBlockQuoteStart(effects, ok, nok) {
		const self = this;
		return start;
		function start(code) {
			if (code === 62) {
				const state = self.containerState;
				if (!state.open) {
					effects.enter("blockQuote", { _container: true });
					state.open = true;
				}
				effects.enter("blockQuotePrefix");
				effects.enter("blockQuoteMarker");
				effects.consume(code);
				effects.exit("blockQuoteMarker");
				return after;
			}
			return nok(code);
		}
		function after(code) {
			if (markdownSpace(code)) {
				effects.enter("blockQuotePrefixWhitespace");
				effects.consume(code);
				effects.exit("blockQuotePrefixWhitespace");
				effects.exit("blockQuotePrefix");
				return ok;
			}
			effects.exit("blockQuotePrefix");
			return ok(code);
		}
	}
	function tokenizeBlockQuoteContinuation(effects, ok, nok) {
		const self = this;
		return contStart;
		function contStart(code) {
			if (markdownSpace(code)) return factorySpace(effects, contBefore, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code);
			return contBefore(code);
		}
		function contBefore(code) {
			return effects.attempt(blockQuote, ok, nok)(code);
		}
	}
	function exit$1(effects) {
		effects.exit("blockQuote");
	}
	var characterEscape = {
		name: "characterEscape",
		tokenize: tokenizeCharacterEscape
	};
	function tokenizeCharacterEscape(effects, ok, nok) {
		return start;
		function start(code) {
			effects.enter("characterEscape");
			effects.enter("escapeMarker");
			effects.consume(code);
			effects.exit("escapeMarker");
			return inside;
		}
		function inside(code) {
			if (asciiPunctuation(code)) {
				effects.enter("characterEscapeValue");
				effects.consume(code);
				effects.exit("characterEscapeValue");
				effects.exit("characterEscape");
				return ok;
			}
			return nok(code);
		}
	}
	var characterReference = {
		name: "characterReference",
		tokenize: tokenizeCharacterReference
	};
	function tokenizeCharacterReference(effects, ok, nok) {
		const self = this;
		let size = 0;
		let max;
		let test;
		return start;
		function start(code) {
			effects.enter("characterReference");
			effects.enter("characterReferenceMarker");
			effects.consume(code);
			effects.exit("characterReferenceMarker");
			return open;
		}
		function open(code) {
			if (code === 35) {
				effects.enter("characterReferenceMarkerNumeric");
				effects.consume(code);
				effects.exit("characterReferenceMarkerNumeric");
				return numeric;
			}
			effects.enter("characterReferenceValue");
			max = 31;
			test = asciiAlphanumeric;
			return value(code);
		}
		function numeric(code) {
			if (code === 88 || code === 120) {
				effects.enter("characterReferenceMarkerHexadecimal");
				effects.consume(code);
				effects.exit("characterReferenceMarkerHexadecimal");
				effects.enter("characterReferenceValue");
				max = 6;
				test = asciiHexDigit;
				return value;
			}
			effects.enter("characterReferenceValue");
			max = 7;
			test = asciiDigit;
			return value(code);
		}
		function value(code) {
			if (code === 59 && size) {
				const token = effects.exit("characterReferenceValue");
				if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self.sliceSerialize(token))) return nok(code);
				effects.enter("characterReferenceMarker");
				effects.consume(code);
				effects.exit("characterReferenceMarker");
				effects.exit("characterReference");
				return ok;
			}
			if (test(code) && size++ < max) {
				effects.consume(code);
				return value;
			}
			return nok(code);
		}
	}
	var nonLazyContinuation = {
		partial: true,
		tokenize: tokenizeNonLazyContinuation
	};
	var codeFenced = {
		concrete: true,
		name: "codeFenced",
		tokenize: tokenizeCodeFenced
	};
	function tokenizeCodeFenced(effects, ok, nok) {
		const self = this;
		const closeStart = {
			partial: true,
			tokenize: tokenizeCloseStart
		};
		let initialPrefix = 0;
		let sizeOpen = 0;
		let marker;
		return start;
		function start(code) {
			return beforeSequenceOpen(code);
		}
		function beforeSequenceOpen(code) {
			const tail = self.events[self.events.length - 1];
			initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
			marker = code;
			effects.enter("codeFenced");
			effects.enter("codeFencedFence");
			effects.enter("codeFencedFenceSequence");
			return sequenceOpen(code);
		}
		function sequenceOpen(code) {
			if (code === marker) {
				sizeOpen++;
				effects.consume(code);
				return sequenceOpen;
			}
			if (sizeOpen < 3) return nok(code);
			effects.exit("codeFencedFenceSequence");
			return markdownSpace(code) ? factorySpace(effects, infoBefore, "whitespace")(code) : infoBefore(code);
		}
		function infoBefore(code) {
			if (code === null || markdownLineEnding(code)) {
				effects.exit("codeFencedFence");
				return self.interrupt ? ok(code) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code);
			}
			effects.enter("codeFencedFenceInfo");
			effects.enter("chunkString", { contentType: "string" });
			return info(code);
		}
		function info(code) {
			if (code === null || markdownLineEnding(code)) {
				effects.exit("chunkString");
				effects.exit("codeFencedFenceInfo");
				return infoBefore(code);
			}
			if (markdownSpace(code)) {
				effects.exit("chunkString");
				effects.exit("codeFencedFenceInfo");
				return factorySpace(effects, metaBefore, "whitespace")(code);
			}
			if (code === 96 && code === marker) return nok(code);
			effects.consume(code);
			return info;
		}
		function metaBefore(code) {
			if (code === null || markdownLineEnding(code)) return infoBefore(code);
			effects.enter("codeFencedFenceMeta");
			effects.enter("chunkString", { contentType: "string" });
			return meta(code);
		}
		function meta(code) {
			if (code === null || markdownLineEnding(code)) {
				effects.exit("chunkString");
				effects.exit("codeFencedFenceMeta");
				return infoBefore(code);
			}
			if (code === 96 && code === marker) return nok(code);
			effects.consume(code);
			return meta;
		}
		function atNonLazyBreak(code) {
			return effects.attempt(closeStart, after, contentBefore)(code);
		}
		function contentBefore(code) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return contentStart;
		}
		function contentStart(code) {
			return initialPrefix > 0 && markdownSpace(code) ? factorySpace(effects, beforeContentChunk, "linePrefix", initialPrefix + 1)(code) : beforeContentChunk(code);
		}
		function beforeContentChunk(code) {
			if (code === null || markdownLineEnding(code)) return effects.check(nonLazyContinuation, atNonLazyBreak, after)(code);
			effects.enter("codeFlowValue");
			return contentChunk(code);
		}
		function contentChunk(code) {
			if (code === null || markdownLineEnding(code)) {
				effects.exit("codeFlowValue");
				return beforeContentChunk(code);
			}
			effects.consume(code);
			return contentChunk;
		}
		function after(code) {
			effects.exit("codeFenced");
			return ok(code);
		}
		function tokenizeCloseStart(effects, ok, nok) {
			let size = 0;
			return startBefore;
			function startBefore(code) {
				effects.enter("lineEnding");
				effects.consume(code);
				effects.exit("lineEnding");
				return start;
			}
			function start(code) {
				effects.enter("codeFencedFence");
				return markdownSpace(code) ? factorySpace(effects, beforeSequenceClose, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code) : beforeSequenceClose(code);
			}
			function beforeSequenceClose(code) {
				if (code === marker) {
					effects.enter("codeFencedFenceSequence");
					return sequenceClose(code);
				}
				return nok(code);
			}
			function sequenceClose(code) {
				if (code === marker) {
					size++;
					effects.consume(code);
					return sequenceClose;
				}
				if (size >= sizeOpen) {
					effects.exit("codeFencedFenceSequence");
					return markdownSpace(code) ? factorySpace(effects, sequenceCloseAfter, "whitespace")(code) : sequenceCloseAfter(code);
				}
				return nok(code);
			}
			function sequenceCloseAfter(code) {
				if (code === null || markdownLineEnding(code)) {
					effects.exit("codeFencedFence");
					return ok(code);
				}
				return nok(code);
			}
		}
	}
	function tokenizeNonLazyContinuation(effects, ok, nok) {
		const self = this;
		return start;
		function start(code) {
			if (code === null) return nok(code);
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return lineStart;
		}
		function lineStart(code) {
			return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
		}
	}
	var codeIndented = {
		name: "codeIndented",
		tokenize: tokenizeCodeIndented
	};
	var furtherStart = {
		partial: true,
		tokenize: tokenizeFurtherStart
	};
	function tokenizeCodeIndented(effects, ok, nok) {
		const self = this;
		return start;
		function start(code) {
			effects.enter("codeIndented");
			return factorySpace(effects, afterPrefix, "linePrefix", 5)(code);
		}
		function afterPrefix(code) {
			const tail = self.events[self.events.length - 1];
			return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? atBreak(code) : nok(code);
		}
		function atBreak(code) {
			if (code === null) return after(code);
			if (markdownLineEnding(code)) return effects.attempt(furtherStart, atBreak, after)(code);
			effects.enter("codeFlowValue");
			return inside(code);
		}
		function inside(code) {
			if (code === null || markdownLineEnding(code)) {
				effects.exit("codeFlowValue");
				return atBreak(code);
			}
			effects.consume(code);
			return inside;
		}
		function after(code) {
			effects.exit("codeIndented");
			return ok(code);
		}
	}
	function tokenizeFurtherStart(effects, ok, nok) {
		const self = this;
		return furtherStart;
		function furtherStart(code) {
			if (self.parser.lazy[self.now().line]) return nok(code);
			if (markdownLineEnding(code)) {
				effects.enter("lineEnding");
				effects.consume(code);
				effects.exit("lineEnding");
				return furtherStart;
			}
			return factorySpace(effects, afterPrefix, "linePrefix", 5)(code);
		}
		function afterPrefix(code) {
			const tail = self.events[self.events.length - 1];
			return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok(code) : markdownLineEnding(code) ? furtherStart(code) : nok(code);
		}
	}
	var codeText = {
		name: "codeText",
		previous: previous$1,
		resolve: resolveCodeText,
		tokenize: tokenizeCodeText
	};
	function resolveCodeText(events) {
		let tailExitIndex = events.length - 4;
		let headEnterIndex = 3;
		let index;
		let enter;
		if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
			index = headEnterIndex;
			while (++index < tailExitIndex) if (events[index][1].type === "codeTextData") {
				events[headEnterIndex][1].type = "codeTextPadding";
				events[tailExitIndex][1].type = "codeTextPadding";
				headEnterIndex += 2;
				tailExitIndex -= 2;
				break;
			}
		}
		index = headEnterIndex - 1;
		tailExitIndex++;
		while (++index <= tailExitIndex) if (enter === void 0) {
			if (index !== tailExitIndex && events[index][1].type !== "lineEnding") enter = index;
		} else if (index === tailExitIndex || events[index][1].type === "lineEnding") {
			events[enter][1].type = "codeTextData";
			if (index !== enter + 2) {
				events[enter][1].end = events[index - 1][1].end;
				events.splice(enter + 2, index - enter - 2);
				tailExitIndex -= index - enter - 2;
				index = enter + 2;
			}
			enter = void 0;
		}
		return events;
	}
	function previous$1(code) {
		return code !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
	}
	function tokenizeCodeText(effects, ok, nok) {
		let sizeOpen = 0;
		let size;
		let token;
		return start;
		function start(code) {
			effects.enter("codeText");
			effects.enter("codeTextSequence");
			return sequenceOpen(code);
		}
		function sequenceOpen(code) {
			if (code === 96) {
				effects.consume(code);
				sizeOpen++;
				return sequenceOpen;
			}
			effects.exit("codeTextSequence");
			return between(code);
		}
		function between(code) {
			if (code === null) return nok(code);
			if (code === 32) {
				effects.enter("space");
				effects.consume(code);
				effects.exit("space");
				return between;
			}
			if (code === 96) {
				token = effects.enter("codeTextSequence");
				size = 0;
				return sequenceClose(code);
			}
			if (markdownLineEnding(code)) {
				effects.enter("lineEnding");
				effects.consume(code);
				effects.exit("lineEnding");
				return between;
			}
			effects.enter("codeTextData");
			return data(code);
		}
		function data(code) {
			if (code === null || code === 32 || code === 96 || markdownLineEnding(code)) {
				effects.exit("codeTextData");
				return between(code);
			}
			effects.consume(code);
			return data;
		}
		function sequenceClose(code) {
			if (code === 96) {
				effects.consume(code);
				size++;
				return sequenceClose;
			}
			if (size === sizeOpen) {
				effects.exit("codeTextSequence");
				effects.exit("codeText");
				return ok(code);
			}
			token.type = "codeTextData";
			return data(code);
		}
	}
	var SpliceBuffer = class {
		constructor(initial) {
			this.left = initial ? [...initial] : [];
			this.right = [];
		}
		get(index) {
			if (index < 0 || index >= this.left.length + this.right.length) throw new RangeError("Cannot access index `" + index + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
			if (index < this.left.length) return this.left[index];
			return this.right[this.right.length - index + this.left.length - 1];
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
			if (stop < this.left.length) return this.left.slice(start, stop);
			if (start > this.left.length) return this.right.slice(this.right.length - stop + this.left.length, this.right.length - start + this.left.length).reverse();
			return this.left.slice(start).concat(this.right.slice(this.right.length - stop + this.left.length).reverse());
		}
		splice(start, deleteCount, items) {
			const count = deleteCount || 0;
			this.setCursor(Math.trunc(start));
			const removed = this.right.splice(this.right.length - count, Number.POSITIVE_INFINITY);
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
		setCursor(n) {
			if (n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0) return;
			if (n < this.left.length) {
				const removed = this.left.splice(n, Number.POSITIVE_INFINITY);
				chunkedPush(this.right, removed.reverse());
			} else {
				const removed = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
				chunkedPush(this.left, removed.reverse());
			}
		}
	};
	function chunkedPush(list, right) {
		let chunkStart = 0;
		if (right.length < 1e4) list.push(...right);
		else while (chunkStart < right.length) {
			list.push(...right.slice(chunkStart, chunkStart + 1e4));
			chunkStart += 1e4;
		}
	}
	function subtokenize(eventsArray) {
		const jumps = {};
		let index = -1;
		let event;
		let lineIndex;
		let otherIndex;
		let otherEvent;
		let parameters;
		let subevents;
		let more;
		const events = new SpliceBuffer(eventsArray);
		while (++index < events.length) {
			while (index in jumps) index = jumps[index];
			event = events.get(index);
			if (index && event[1].type === "chunkFlow" && events.get(index - 1)[1].type === "listItemPrefix") {
				subevents = event[1]._tokenizer.events;
				otherIndex = 0;
				if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") otherIndex += 2;
				if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") while (++otherIndex < subevents.length) {
					if (subevents[otherIndex][1].type === "content") break;
					if (subevents[otherIndex][1].type === "chunkText") {
						subevents[otherIndex][1]._isInFirstContentOfListItem = true;
						otherIndex++;
					}
				}
			}
			if (event[0] === "enter") {
				if (event[1].contentType) {
					Object.assign(jumps, subcontent(events, index));
					index = jumps[index];
					more = true;
				}
			} else if (event[1]._container) {
				otherIndex = index;
				lineIndex = void 0;
				while (otherIndex--) {
					otherEvent = events.get(otherIndex);
					if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
						if (otherEvent[0] === "enter") {
							if (lineIndex) events.get(lineIndex)[1].type = "lineEndingBlank";
							otherEvent[1].type = "lineEnding";
							lineIndex = otherIndex;
						}
					} else if (otherEvent[1].type === "linePrefix" || otherEvent[1].type === "listItemIndent") {} else break;
				}
				if (lineIndex) {
					event[1].end = { ...events.get(lineIndex)[1].start };
					parameters = events.slice(lineIndex, index);
					parameters.unshift(event);
					events.splice(lineIndex, index - lineIndex + 1, parameters);
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
			if (token._contentTypeTextTrailing) tokenizer._contentTypeTextTrailing = true;
		}
		const childEvents = tokenizer.events;
		const jumps = [];
		const gaps = {};
		let stream;
		let previous;
		let index = -1;
		let current = token;
		let adjust = 0;
		let start = 0;
		const breaks = [start];
		while (current) {
			while (events.get(++startPosition)[1] !== current);
			startPositions.push(startPosition);
			if (!current._tokenizer) {
				stream = context.sliceStream(current);
				if (!current.next) stream.push(null);
				if (previous) tokenizer.defineSkip(current.start);
				if (current._isInFirstContentOfListItem) tokenizer._gfmTasklistFirstContentOfListItem = true;
				tokenizer.write(stream);
				if (current._isInFirstContentOfListItem) tokenizer._gfmTasklistFirstContentOfListItem = void 0;
			}
			previous = current;
			current = current.next;
		}
		current = token;
		while (++index < childEvents.length) if (childEvents[index][0] === "exit" && childEvents[index - 1][0] === "enter" && childEvents[index][1].type === childEvents[index - 1][1].type && childEvents[index][1].start.line !== childEvents[index][1].end.line) {
			start = index + 1;
			breaks.push(start);
			current._tokenizer = void 0;
			current.previous = void 0;
			current = current.next;
		}
		tokenizer.events = [];
		if (current) {
			current._tokenizer = void 0;
			current.previous = void 0;
		} else breaks.pop();
		index = breaks.length;
		while (index--) {
			const slice = childEvents.slice(breaks[index], breaks[index + 1]);
			const start = startPositions.pop();
			jumps.push([start, start + slice.length - 1]);
			events.splice(start, 2, slice);
		}
		jumps.reverse();
		index = -1;
		while (++index < jumps.length) {
			gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
			adjust += jumps[index][1] - jumps[index][0] - 1;
		}
		return gaps;
	}
	var content = {
		resolve: resolveContent,
		tokenize: tokenizeContent
	};
	var continuationConstruct = {
		partial: true,
		tokenize: tokenizeContinuation
	};
	function resolveContent(events) {
		subtokenize(events);
		return events;
	}
	function tokenizeContent(effects, ok) {
		let previous;
		return chunkStart;
		function chunkStart(code) {
			effects.enter("content");
			previous = effects.enter("chunkContent", { contentType: "content" });
			return chunkInside(code);
		}
		function chunkInside(code) {
			if (code === null) return contentEnd(code);
			if (markdownLineEnding(code)) return effects.check(continuationConstruct, contentContinue, contentEnd)(code);
			effects.consume(code);
			return chunkInside;
		}
		function contentEnd(code) {
			effects.exit("chunkContent");
			effects.exit("content");
			return ok(code);
		}
		function contentContinue(code) {
			effects.consume(code);
			effects.exit("chunkContent");
			previous.next = effects.enter("chunkContent", {
				contentType: "content",
				previous
			});
			previous = previous.next;
			return chunkInside;
		}
	}
	function tokenizeContinuation(effects, ok, nok) {
		const self = this;
		return startLookahead;
		function startLookahead(code) {
			effects.exit("chunkContent");
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return factorySpace(effects, prefixed, "linePrefix");
		}
		function prefixed(code) {
			if (code === null || markdownLineEnding(code)) return nok(code);
			const tail = self.events[self.events.length - 1];
			if (!self.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) return ok(code);
			return effects.interrupt(self.parser.constructs.flow, nok, ok)(code);
		}
	}
	function factoryDestination(effects, ok, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
		const limit = max || Number.POSITIVE_INFINITY;
		let balance = 0;
		return start;
		function start(code) {
			if (code === 60) {
				effects.enter(type);
				effects.enter(literalType);
				effects.enter(literalMarkerType);
				effects.consume(code);
				effects.exit(literalMarkerType);
				return enclosedBefore;
			}
			if (code === null || code === 32 || code === 41 || asciiControl(code)) return nok(code);
			effects.enter(type);
			effects.enter(rawType);
			effects.enter(stringType);
			effects.enter("chunkString", { contentType: "string" });
			return raw(code);
		}
		function enclosedBefore(code) {
			if (code === 62) {
				effects.enter(literalMarkerType);
				effects.consume(code);
				effects.exit(literalMarkerType);
				effects.exit(literalType);
				effects.exit(type);
				return ok;
			}
			effects.enter(stringType);
			effects.enter("chunkString", { contentType: "string" });
			return enclosed(code);
		}
		function enclosed(code) {
			if (code === 62) {
				effects.exit("chunkString");
				effects.exit(stringType);
				return enclosedBefore(code);
			}
			if (code === null || code === 60 || markdownLineEnding(code)) return nok(code);
			effects.consume(code);
			return code === 92 ? enclosedEscape : enclosed;
		}
		function enclosedEscape(code) {
			if (code === 60 || code === 62 || code === 92) {
				effects.consume(code);
				return enclosed;
			}
			return enclosed(code);
		}
		function raw(code) {
			if (!balance && (code === null || code === 41 || markdownLineEndingOrSpace(code))) {
				effects.exit("chunkString");
				effects.exit(stringType);
				effects.exit(rawType);
				effects.exit(type);
				return ok(code);
			}
			if (balance < limit && code === 40) {
				effects.consume(code);
				balance++;
				return raw;
			}
			if (code === 41) {
				effects.consume(code);
				balance--;
				return raw;
			}
			if (code === null || code === 32 || code === 40 || asciiControl(code)) return nok(code);
			effects.consume(code);
			return code === 92 ? rawEscape : raw;
		}
		function rawEscape(code) {
			if (code === 40 || code === 41 || code === 92) {
				effects.consume(code);
				return raw;
			}
			return raw(code);
		}
	}
	function factoryLabel(effects, ok, nok, type, markerType, stringType) {
		const self = this;
		let size = 0;
		let seen;
		return start;
		function start(code) {
			effects.enter(type);
			effects.enter(markerType);
			effects.consume(code);
			effects.exit(markerType);
			effects.enter(stringType);
			return atBreak;
		}
		function atBreak(code) {
			if (size > 999 || code === null || code === 91 || code === 93 && !seen || code === 94 && !size && "_hiddenFootnoteSupport" in self.parser.constructs) return nok(code);
			if (code === 93) {
				effects.exit(stringType);
				effects.enter(markerType);
				effects.consume(code);
				effects.exit(markerType);
				effects.exit(type);
				return ok;
			}
			if (markdownLineEnding(code)) {
				effects.enter("lineEnding");
				effects.consume(code);
				effects.exit("lineEnding");
				return atBreak;
			}
			effects.enter("chunkString", { contentType: "string" });
			return labelInside(code);
		}
		function labelInside(code) {
			if (code === null || code === 91 || code === 93 || markdownLineEnding(code) || size++ > 999) {
				effects.exit("chunkString");
				return atBreak(code);
			}
			effects.consume(code);
			if (!seen) seen = !markdownSpace(code);
			return code === 92 ? labelEscape : labelInside;
		}
		function labelEscape(code) {
			if (code === 91 || code === 92 || code === 93) {
				effects.consume(code);
				size++;
				return labelInside;
			}
			return labelInside(code);
		}
	}
	function factoryTitle(effects, ok, nok, type, markerType, stringType) {
		let marker;
		return start;
		function start(code) {
			if (code === 34 || code === 39 || code === 40) {
				effects.enter(type);
				effects.enter(markerType);
				effects.consume(code);
				effects.exit(markerType);
				marker = code === 40 ? 41 : code;
				return begin;
			}
			return nok(code);
		}
		function begin(code) {
			if (code === marker) {
				effects.enter(markerType);
				effects.consume(code);
				effects.exit(markerType);
				effects.exit(type);
				return ok;
			}
			effects.enter(stringType);
			return atBreak(code);
		}
		function atBreak(code) {
			if (code === marker) {
				effects.exit(stringType);
				return begin(marker);
			}
			if (code === null) return nok(code);
			if (markdownLineEnding(code)) {
				effects.enter("lineEnding");
				effects.consume(code);
				effects.exit("lineEnding");
				return factorySpace(effects, atBreak, "linePrefix");
			}
			effects.enter("chunkString", { contentType: "string" });
			return inside(code);
		}
		function inside(code) {
			if (code === marker || code === null || markdownLineEnding(code)) {
				effects.exit("chunkString");
				return atBreak(code);
			}
			effects.consume(code);
			return code === 92 ? escape : inside;
		}
		function escape(code) {
			if (code === marker || code === 92) {
				effects.consume(code);
				return inside;
			}
			return inside(code);
		}
	}
	function factoryWhitespace(effects, ok) {
		let seen;
		return start;
		function start(code) {
			if (markdownLineEnding(code)) {
				effects.enter("lineEnding");
				effects.consume(code);
				effects.exit("lineEnding");
				seen = true;
				return start;
			}
			if (markdownSpace(code)) return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code);
			return ok(code);
		}
	}
	var definition$1 = {
		name: "definition",
		tokenize: tokenizeDefinition
	};
	var titleBefore = {
		partial: true,
		tokenize: tokenizeTitleBefore
	};
	function tokenizeDefinition(effects, ok, nok) {
		const self = this;
		let identifier;
		return start;
		function start(code) {
			effects.enter("definition");
			return before(code);
		}
		function before(code) {
			return factoryLabel.call(self, effects, labelAfter, nok, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(code);
		}
		function labelAfter(code) {
			identifier = normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1));
			if (code === 58) {
				effects.enter("definitionMarker");
				effects.consume(code);
				effects.exit("definitionMarker");
				return markerAfter;
			}
			return nok(code);
		}
		function markerAfter(code) {
			return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, destinationBefore)(code) : destinationBefore(code);
		}
		function destinationBefore(code) {
			return factoryDestination(effects, destinationAfter, nok, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(code);
		}
		function destinationAfter(code) {
			return effects.attempt(titleBefore, after, after)(code);
		}
		function after(code) {
			return markdownSpace(code) ? factorySpace(effects, afterWhitespace, "whitespace")(code) : afterWhitespace(code);
		}
		function afterWhitespace(code) {
			if (code === null || markdownLineEnding(code)) {
				effects.exit("definition");
				self.parser.defined.push(identifier);
				return ok(code);
			}
			return nok(code);
		}
	}
	function tokenizeTitleBefore(effects, ok, nok) {
		return titleBefore;
		function titleBefore(code) {
			return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, beforeMarker)(code) : nok(code);
		}
		function beforeMarker(code) {
			return factoryTitle(effects, titleAfter, nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code);
		}
		function titleAfter(code) {
			return markdownSpace(code) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code) : titleAfterOptionalWhitespace(code);
		}
		function titleAfterOptionalWhitespace(code) {
			return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
		}
	}
	var hardBreakEscape = {
		name: "hardBreakEscape",
		tokenize: tokenizeHardBreakEscape
	};
	function tokenizeHardBreakEscape(effects, ok, nok) {
		return start;
		function start(code) {
			effects.enter("hardBreakEscape");
			effects.consume(code);
			return after;
		}
		function after(code) {
			if (markdownLineEnding(code)) {
				effects.exit("hardBreakEscape");
				return ok(code);
			}
			return nok(code);
		}
	}
	var headingAtx = {
		name: "headingAtx",
		resolve: resolveHeadingAtx,
		tokenize: tokenizeHeadingAtx
	};
	function resolveHeadingAtx(events, context) {
		let contentEnd = events.length - 2;
		let contentStart = 3;
		let content;
		let text;
		if (events[contentStart][1].type === "whitespace") contentStart += 2;
		if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") contentEnd -= 2;
		if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
		if (contentEnd > contentStart) {
			content = {
				type: "atxHeadingText",
				start: events[contentStart][1].start,
				end: events[contentEnd][1].end
			};
			text = {
				type: "chunkText",
				start: events[contentStart][1].start,
				end: events[contentEnd][1].end,
				contentType: "text"
			};
			splice(events, contentStart, contentEnd - contentStart + 1, [
				[
					"enter",
					content,
					context
				],
				[
					"enter",
					text,
					context
				],
				[
					"exit",
					text,
					context
				],
				[
					"exit",
					content,
					context
				]
			]);
		}
		return events;
	}
	function tokenizeHeadingAtx(effects, ok, nok) {
		let size = 0;
		return start;
		function start(code) {
			effects.enter("atxHeading");
			return before(code);
		}
		function before(code) {
			effects.enter("atxHeadingSequence");
			return sequenceOpen(code);
		}
		function sequenceOpen(code) {
			if (code === 35 && size++ < 6) {
				effects.consume(code);
				return sequenceOpen;
			}
			if (code === null || markdownLineEndingOrSpace(code)) {
				effects.exit("atxHeadingSequence");
				return atBreak(code);
			}
			return nok(code);
		}
		function atBreak(code) {
			if (code === 35) {
				effects.enter("atxHeadingSequence");
				return sequenceFurther(code);
			}
			if (code === null || markdownLineEnding(code)) {
				effects.exit("atxHeading");
				return ok(code);
			}
			if (markdownSpace(code)) return factorySpace(effects, atBreak, "whitespace")(code);
			effects.enter("atxHeadingText");
			return data(code);
		}
		function sequenceFurther(code) {
			if (code === 35) {
				effects.consume(code);
				return sequenceFurther;
			}
			effects.exit("atxHeadingSequence");
			return atBreak(code);
		}
		function data(code) {
			if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
				effects.exit("atxHeadingText");
				return atBreak(code);
			}
			effects.consume(code);
			return data;
		}
	}
	var htmlBlockNames = [
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
	var htmlRawNames = [
		"pre",
		"script",
		"style",
		"textarea"
	];
	var htmlFlow = {
		concrete: true,
		name: "htmlFlow",
		resolveTo: resolveToHtmlFlow,
		tokenize: tokenizeHtmlFlow
	};
	var blankLineBefore = {
		partial: true,
		tokenize: tokenizeBlankLineBefore
	};
	var nonLazyContinuationStart = {
		partial: true,
		tokenize: tokenizeNonLazyContinuationStart
	};
	function resolveToHtmlFlow(events) {
		let index = events.length;
		while (index--) if (events[index][0] === "enter" && events[index][1].type === "htmlFlow") break;
		if (index > 1 && events[index - 2][1].type === "linePrefix") {
			events[index][1].start = events[index - 2][1].start;
			events[index + 1][1].start = events[index - 2][1].start;
			events.splice(index - 2, 2);
		}
		return events;
	}
	function tokenizeHtmlFlow(effects, ok, nok) {
		const self = this;
		let marker;
		let closingTag;
		let buffer;
		let index;
		let markerB;
		return start;
		function start(code) {
			return before(code);
		}
		function before(code) {
			effects.enter("htmlFlow");
			effects.enter("htmlFlowData");
			effects.consume(code);
			return open;
		}
		function open(code) {
			if (code === 33) {
				effects.consume(code);
				return declarationOpen;
			}
			if (code === 47) {
				effects.consume(code);
				closingTag = true;
				return tagCloseStart;
			}
			if (code === 63) {
				effects.consume(code);
				marker = 3;
				return self.interrupt ? ok : continuationDeclarationInside;
			}
			if (asciiAlpha(code)) {
				effects.consume(code);
				buffer = String.fromCharCode(code);
				return tagName;
			}
			return nok(code);
		}
		function declarationOpen(code) {
			if (code === 45) {
				effects.consume(code);
				marker = 2;
				return commentOpenInside;
			}
			if (code === 91) {
				effects.consume(code);
				marker = 5;
				index = 0;
				return cdataOpenInside;
			}
			if (asciiAlpha(code)) {
				effects.consume(code);
				marker = 4;
				return self.interrupt ? ok : continuationDeclarationInside;
			}
			return nok(code);
		}
		function commentOpenInside(code) {
			if (code === 45) {
				effects.consume(code);
				return self.interrupt ? ok : continuationDeclarationInside;
			}
			return nok(code);
		}
		function cdataOpenInside(code) {
			if (code === "CDATA[".charCodeAt(index++)) {
				effects.consume(code);
				if (index === 6) return self.interrupt ? ok : continuation;
				return cdataOpenInside;
			}
			return nok(code);
		}
		function tagCloseStart(code) {
			if (asciiAlpha(code)) {
				effects.consume(code);
				buffer = String.fromCharCode(code);
				return tagName;
			}
			return nok(code);
		}
		function tagName(code) {
			if (code === null || code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
				const slash = code === 47;
				const name = buffer.toLowerCase();
				if (!slash && !closingTag && htmlRawNames.includes(name)) {
					marker = 1;
					return self.interrupt ? ok(code) : continuation(code);
				}
				if (htmlBlockNames.includes(buffer.toLowerCase())) {
					marker = 6;
					if (slash) {
						effects.consume(code);
						return basicSelfClosing;
					}
					return self.interrupt ? ok(code) : continuation(code);
				}
				marker = 7;
				return self.interrupt && !self.parser.lazy[self.now().line] ? nok(code) : closingTag ? completeClosingTagAfter(code) : completeAttributeNameBefore(code);
			}
			if (code === 45 || asciiAlphanumeric(code)) {
				effects.consume(code);
				buffer += String.fromCharCode(code);
				return tagName;
			}
			return nok(code);
		}
		function basicSelfClosing(code) {
			if (code === 62) {
				effects.consume(code);
				return self.interrupt ? ok : continuation;
			}
			return nok(code);
		}
		function completeClosingTagAfter(code) {
			if (markdownSpace(code)) {
				effects.consume(code);
				return completeClosingTagAfter;
			}
			return completeEnd(code);
		}
		function completeAttributeNameBefore(code) {
			if (code === 47) {
				effects.consume(code);
				return completeEnd;
			}
			if (code === 58 || code === 95 || asciiAlpha(code)) {
				effects.consume(code);
				return completeAttributeName;
			}
			if (markdownSpace(code)) {
				effects.consume(code);
				return completeAttributeNameBefore;
			}
			return completeEnd(code);
		}
		function completeAttributeName(code) {
			if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
				effects.consume(code);
				return completeAttributeName;
			}
			return completeAttributeNameAfter(code);
		}
		function completeAttributeNameAfter(code) {
			if (code === 61) {
				effects.consume(code);
				return completeAttributeValueBefore;
			}
			if (markdownSpace(code)) {
				effects.consume(code);
				return completeAttributeNameAfter;
			}
			return completeAttributeNameBefore(code);
		}
		function completeAttributeValueBefore(code) {
			if (code === null || code === 60 || code === 61 || code === 62 || code === 96) return nok(code);
			if (code === 34 || code === 39) {
				effects.consume(code);
				markerB = code;
				return completeAttributeValueQuoted;
			}
			if (markdownSpace(code)) {
				effects.consume(code);
				return completeAttributeValueBefore;
			}
			return completeAttributeValueUnquoted(code);
		}
		function completeAttributeValueQuoted(code) {
			if (code === markerB) {
				effects.consume(code);
				markerB = null;
				return completeAttributeValueQuotedAfter;
			}
			if (code === null || markdownLineEnding(code)) return nok(code);
			effects.consume(code);
			return completeAttributeValueQuoted;
		}
		function completeAttributeValueUnquoted(code) {
			if (code === null || code === 34 || code === 39 || code === 47 || code === 60 || code === 61 || code === 62 || code === 96 || markdownLineEndingOrSpace(code)) return completeAttributeNameAfter(code);
			effects.consume(code);
			return completeAttributeValueUnquoted;
		}
		function completeAttributeValueQuotedAfter(code) {
			if (code === 47 || code === 62 || markdownSpace(code)) return completeAttributeNameBefore(code);
			return nok(code);
		}
		function completeEnd(code) {
			if (code === 62) {
				effects.consume(code);
				return completeAfter;
			}
			return nok(code);
		}
		function completeAfter(code) {
			if (code === null || markdownLineEnding(code)) return continuation(code);
			if (markdownSpace(code)) {
				effects.consume(code);
				return completeAfter;
			}
			return nok(code);
		}
		function continuation(code) {
			if (code === 45 && marker === 2) {
				effects.consume(code);
				return continuationCommentInside;
			}
			if (code === 60 && marker === 1) {
				effects.consume(code);
				return continuationRawTagOpen;
			}
			if (code === 62 && marker === 4) {
				effects.consume(code);
				return continuationClose;
			}
			if (code === 63 && marker === 3) {
				effects.consume(code);
				return continuationDeclarationInside;
			}
			if (code === 93 && marker === 5) {
				effects.consume(code);
				return continuationCdataInside;
			}
			if (markdownLineEnding(code) && (marker === 6 || marker === 7)) {
				effects.exit("htmlFlowData");
				return effects.check(blankLineBefore, continuationAfter, continuationStart)(code);
			}
			if (code === null || markdownLineEnding(code)) {
				effects.exit("htmlFlowData");
				return continuationStart(code);
			}
			effects.consume(code);
			return continuation;
		}
		function continuationStart(code) {
			return effects.check(nonLazyContinuationStart, continuationStartNonLazy, continuationAfter)(code);
		}
		function continuationStartNonLazy(code) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return continuationBefore;
		}
		function continuationBefore(code) {
			if (code === null || markdownLineEnding(code)) return continuationStart(code);
			effects.enter("htmlFlowData");
			return continuation(code);
		}
		function continuationCommentInside(code) {
			if (code === 45) {
				effects.consume(code);
				return continuationDeclarationInside;
			}
			return continuation(code);
		}
		function continuationRawTagOpen(code) {
			if (code === 47) {
				effects.consume(code);
				buffer = "";
				return continuationRawEndTag;
			}
			return continuation(code);
		}
		function continuationRawEndTag(code) {
			if (code === 62) {
				const name = buffer.toLowerCase();
				if (htmlRawNames.includes(name)) {
					effects.consume(code);
					return continuationClose;
				}
				return continuation(code);
			}
			if (asciiAlpha(code) && buffer.length < 8) {
				effects.consume(code);
				buffer += String.fromCharCode(code);
				return continuationRawEndTag;
			}
			return continuation(code);
		}
		function continuationCdataInside(code) {
			if (code === 93) {
				effects.consume(code);
				return continuationDeclarationInside;
			}
			return continuation(code);
		}
		function continuationDeclarationInside(code) {
			if (code === 62) {
				effects.consume(code);
				return continuationClose;
			}
			if (code === 45 && marker === 2) {
				effects.consume(code);
				return continuationDeclarationInside;
			}
			return continuation(code);
		}
		function continuationClose(code) {
			if (code === null || markdownLineEnding(code)) {
				effects.exit("htmlFlowData");
				return continuationAfter(code);
			}
			effects.consume(code);
			return continuationClose;
		}
		function continuationAfter(code) {
			effects.exit("htmlFlow");
			return ok(code);
		}
	}
	function tokenizeNonLazyContinuationStart(effects, ok, nok) {
		const self = this;
		return start;
		function start(code) {
			if (markdownLineEnding(code)) {
				effects.enter("lineEnding");
				effects.consume(code);
				effects.exit("lineEnding");
				return after;
			}
			return nok(code);
		}
		function after(code) {
			return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
		}
	}
	function tokenizeBlankLineBefore(effects, ok, nok) {
		return start;
		function start(code) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return effects.attempt(blankLine, ok, nok);
		}
	}
	var htmlText = {
		name: "htmlText",
		tokenize: tokenizeHtmlText
	};
	function tokenizeHtmlText(effects, ok, nok) {
		const self = this;
		let marker;
		let index;
		let returnState;
		return start;
		function start(code) {
			effects.enter("htmlText");
			effects.enter("htmlTextData");
			effects.consume(code);
			return open;
		}
		function open(code) {
			if (code === 33) {
				effects.consume(code);
				return declarationOpen;
			}
			if (code === 47) {
				effects.consume(code);
				return tagCloseStart;
			}
			if (code === 63) {
				effects.consume(code);
				return instruction;
			}
			if (asciiAlpha(code)) {
				effects.consume(code);
				return tagOpen;
			}
			return nok(code);
		}
		function declarationOpen(code) {
			if (code === 45) {
				effects.consume(code);
				return commentOpenInside;
			}
			if (code === 91) {
				effects.consume(code);
				index = 0;
				return cdataOpenInside;
			}
			if (asciiAlpha(code)) {
				effects.consume(code);
				return declaration;
			}
			return nok(code);
		}
		function commentOpenInside(code) {
			if (code === 45) {
				effects.consume(code);
				return commentEnd;
			}
			return nok(code);
		}
		function comment(code) {
			if (code === null) return nok(code);
			if (code === 45) {
				effects.consume(code);
				return commentClose;
			}
			if (markdownLineEnding(code)) {
				returnState = comment;
				return lineEndingBefore(code);
			}
			effects.consume(code);
			return comment;
		}
		function commentClose(code) {
			if (code === 45) {
				effects.consume(code);
				return commentEnd;
			}
			return comment(code);
		}
		function commentEnd(code) {
			return code === 62 ? end(code) : code === 45 ? commentClose(code) : comment(code);
		}
		function cdataOpenInside(code) {
			if (code === "CDATA[".charCodeAt(index++)) {
				effects.consume(code);
				return index === 6 ? cdata : cdataOpenInside;
			}
			return nok(code);
		}
		function cdata(code) {
			if (code === null) return nok(code);
			if (code === 93) {
				effects.consume(code);
				return cdataClose;
			}
			if (markdownLineEnding(code)) {
				returnState = cdata;
				return lineEndingBefore(code);
			}
			effects.consume(code);
			return cdata;
		}
		function cdataClose(code) {
			if (code === 93) {
				effects.consume(code);
				return cdataEnd;
			}
			return cdata(code);
		}
		function cdataEnd(code) {
			if (code === 62) return end(code);
			if (code === 93) {
				effects.consume(code);
				return cdataEnd;
			}
			return cdata(code);
		}
		function declaration(code) {
			if (code === null || code === 62) return end(code);
			if (markdownLineEnding(code)) {
				returnState = declaration;
				return lineEndingBefore(code);
			}
			effects.consume(code);
			return declaration;
		}
		function instruction(code) {
			if (code === null) return nok(code);
			if (code === 63) {
				effects.consume(code);
				return instructionClose;
			}
			if (markdownLineEnding(code)) {
				returnState = instruction;
				return lineEndingBefore(code);
			}
			effects.consume(code);
			return instruction;
		}
		function instructionClose(code) {
			return code === 62 ? end(code) : instruction(code);
		}
		function tagCloseStart(code) {
			if (asciiAlpha(code)) {
				effects.consume(code);
				return tagClose;
			}
			return nok(code);
		}
		function tagClose(code) {
			if (code === 45 || asciiAlphanumeric(code)) {
				effects.consume(code);
				return tagClose;
			}
			return tagCloseBetween(code);
		}
		function tagCloseBetween(code) {
			if (markdownLineEnding(code)) {
				returnState = tagCloseBetween;
				return lineEndingBefore(code);
			}
			if (markdownSpace(code)) {
				effects.consume(code);
				return tagCloseBetween;
			}
			return end(code);
		}
		function tagOpen(code) {
			if (code === 45 || asciiAlphanumeric(code)) {
				effects.consume(code);
				return tagOpen;
			}
			if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) return tagOpenBetween(code);
			return nok(code);
		}
		function tagOpenBetween(code) {
			if (code === 47) {
				effects.consume(code);
				return end;
			}
			if (code === 58 || code === 95 || asciiAlpha(code)) {
				effects.consume(code);
				return tagOpenAttributeName;
			}
			if (markdownLineEnding(code)) {
				returnState = tagOpenBetween;
				return lineEndingBefore(code);
			}
			if (markdownSpace(code)) {
				effects.consume(code);
				return tagOpenBetween;
			}
			return end(code);
		}
		function tagOpenAttributeName(code) {
			if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
				effects.consume(code);
				return tagOpenAttributeName;
			}
			return tagOpenAttributeNameAfter(code);
		}
		function tagOpenAttributeNameAfter(code) {
			if (code === 61) {
				effects.consume(code);
				return tagOpenAttributeValueBefore;
			}
			if (markdownLineEnding(code)) {
				returnState = tagOpenAttributeNameAfter;
				return lineEndingBefore(code);
			}
			if (markdownSpace(code)) {
				effects.consume(code);
				return tagOpenAttributeNameAfter;
			}
			return tagOpenBetween(code);
		}
		function tagOpenAttributeValueBefore(code) {
			if (code === null || code === 60 || code === 61 || code === 62 || code === 96) return nok(code);
			if (code === 34 || code === 39) {
				effects.consume(code);
				marker = code;
				return tagOpenAttributeValueQuoted;
			}
			if (markdownLineEnding(code)) {
				returnState = tagOpenAttributeValueBefore;
				return lineEndingBefore(code);
			}
			if (markdownSpace(code)) {
				effects.consume(code);
				return tagOpenAttributeValueBefore;
			}
			effects.consume(code);
			return tagOpenAttributeValueUnquoted;
		}
		function tagOpenAttributeValueQuoted(code) {
			if (code === marker) {
				effects.consume(code);
				marker = void 0;
				return tagOpenAttributeValueQuotedAfter;
			}
			if (code === null) return nok(code);
			if (markdownLineEnding(code)) {
				returnState = tagOpenAttributeValueQuoted;
				return lineEndingBefore(code);
			}
			effects.consume(code);
			return tagOpenAttributeValueQuoted;
		}
		function tagOpenAttributeValueUnquoted(code) {
			if (code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 96) return nok(code);
			if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) return tagOpenBetween(code);
			effects.consume(code);
			return tagOpenAttributeValueUnquoted;
		}
		function tagOpenAttributeValueQuotedAfter(code) {
			if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) return tagOpenBetween(code);
			return nok(code);
		}
		function end(code) {
			if (code === 62) {
				effects.consume(code);
				effects.exit("htmlTextData");
				effects.exit("htmlText");
				return ok;
			}
			return nok(code);
		}
		function lineEndingBefore(code) {
			effects.exit("htmlTextData");
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return lineEndingAfter;
		}
		function lineEndingAfter(code) {
			return markdownSpace(code) ? factorySpace(effects, lineEndingAfterPrefix, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code) : lineEndingAfterPrefix(code);
		}
		function lineEndingAfterPrefix(code) {
			effects.enter("htmlTextData");
			return returnState(code);
		}
	}
	var labelEnd = {
		name: "labelEnd",
		resolveAll: resolveAllLabelEnd,
		resolveTo: resolveToLabelEnd,
		tokenize: tokenizeLabelEnd
	};
	var resourceConstruct = { tokenize: tokenizeResource };
	var referenceFullConstruct = { tokenize: tokenizeReferenceFull };
	var referenceCollapsedConstruct = { tokenize: tokenizeReferenceCollapsed };
	function resolveAllLabelEnd(events) {
		let index = -1;
		const newEvents = [];
		while (++index < events.length) {
			const token = events[index][1];
			newEvents.push(events[index]);
			if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
				const offset = token.type === "labelImage" ? 4 : 2;
				token.type = "data";
				index += offset;
			}
		}
		if (events.length !== newEvents.length) splice(events, 0, events.length, newEvents);
		return events;
	}
	function resolveToLabelEnd(events, context) {
		let index = events.length;
		let offset = 0;
		let token;
		let open;
		let close;
		let media;
		while (index--) {
			token = events[index][1];
			if (open) {
				if (token.type === "link" || token.type === "labelLink" && token._inactive) break;
				if (events[index][0] === "enter" && token.type === "labelLink") token._inactive = true;
			} else if (close) {
				if (events[index][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
					open = index;
					if (token.type !== "labelLink") {
						offset = 2;
						break;
					}
				}
			} else if (token.type === "labelEnd") close = index;
		}
		const group = {
			type: events[open][1].type === "labelLink" ? "link" : "image",
			start: { ...events[open][1].start },
			end: { ...events[events.length - 1][1].end }
		};
		const label = {
			type: "label",
			start: { ...events[open][1].start },
			end: { ...events[close][1].end }
		};
		const text = {
			type: "labelText",
			start: { ...events[open + offset + 2][1].end },
			end: { ...events[close - 2][1].start }
		};
		media = [[
			"enter",
			group,
			context
		], [
			"enter",
			label,
			context
		]];
		media = push(media, events.slice(open + 1, open + offset + 3));
		media = push(media, [[
			"enter",
			text,
			context
		]]);
		media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));
		media = push(media, [
			[
				"exit",
				text,
				context
			],
			events[close - 2],
			events[close - 1],
			[
				"exit",
				label,
				context
			]
		]);
		media = push(media, events.slice(close + 1));
		media = push(media, [[
			"exit",
			group,
			context
		]]);
		splice(events, open, events.length, media);
		return events;
	}
	function tokenizeLabelEnd(effects, ok, nok) {
		const self = this;
		let index = self.events.length;
		let labelStart;
		let defined;
		while (index--) if ((self.events[index][1].type === "labelImage" || self.events[index][1].type === "labelLink") && !self.events[index][1]._balanced) {
			labelStart = self.events[index][1];
			break;
		}
		return start;
		function start(code) {
			if (!labelStart) return nok(code);
			if (labelStart._inactive) return labelEndNok(code);
			defined = self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize({
				start: labelStart.end,
				end: self.now()
			})));
			effects.enter("labelEnd");
			effects.enter("labelMarker");
			effects.consume(code);
			effects.exit("labelMarker");
			effects.exit("labelEnd");
			return after;
		}
		function after(code) {
			if (code === 40) return effects.attempt(resourceConstruct, labelEndOk, defined ? labelEndOk : labelEndNok)(code);
			if (code === 91) return effects.attempt(referenceFullConstruct, labelEndOk, defined ? referenceNotFull : labelEndNok)(code);
			return defined ? labelEndOk(code) : labelEndNok(code);
		}
		function referenceNotFull(code) {
			return effects.attempt(referenceCollapsedConstruct, labelEndOk, labelEndNok)(code);
		}
		function labelEndOk(code) {
			return ok(code);
		}
		function labelEndNok(code) {
			labelStart._balanced = true;
			return nok(code);
		}
	}
	function tokenizeResource(effects, ok, nok) {
		return resourceStart;
		function resourceStart(code) {
			effects.enter("resource");
			effects.enter("resourceMarker");
			effects.consume(code);
			effects.exit("resourceMarker");
			return resourceBefore;
		}
		function resourceBefore(code) {
			return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceOpen)(code) : resourceOpen(code);
		}
		function resourceOpen(code) {
			if (code === 41) return resourceEnd(code);
			return factoryDestination(effects, resourceDestinationAfter, resourceDestinationMissing, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code);
		}
		function resourceDestinationAfter(code) {
			return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceBetween)(code) : resourceEnd(code);
		}
		function resourceDestinationMissing(code) {
			return nok(code);
		}
		function resourceBetween(code) {
			if (code === 34 || code === 39 || code === 40) return factoryTitle(effects, resourceTitleAfter, nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code);
			return resourceEnd(code);
		}
		function resourceTitleAfter(code) {
			return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceEnd)(code) : resourceEnd(code);
		}
		function resourceEnd(code) {
			if (code === 41) {
				effects.enter("resourceMarker");
				effects.consume(code);
				effects.exit("resourceMarker");
				effects.exit("resource");
				return ok;
			}
			return nok(code);
		}
	}
	function tokenizeReferenceFull(effects, ok, nok) {
		const self = this;
		return referenceFull;
		function referenceFull(code) {
			return factoryLabel.call(self, effects, referenceFullAfter, referenceFullMissing, "reference", "referenceMarker", "referenceString")(code);
		}
		function referenceFullAfter(code) {
			return self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1))) ? ok(code) : nok(code);
		}
		function referenceFullMissing(code) {
			return nok(code);
		}
	}
	function tokenizeReferenceCollapsed(effects, ok, nok) {
		return referenceCollapsedStart;
		function referenceCollapsedStart(code) {
			effects.enter("reference");
			effects.enter("referenceMarker");
			effects.consume(code);
			effects.exit("referenceMarker");
			return referenceCollapsedOpen;
		}
		function referenceCollapsedOpen(code) {
			if (code === 93) {
				effects.enter("referenceMarker");
				effects.consume(code);
				effects.exit("referenceMarker");
				effects.exit("reference");
				return ok;
			}
			return nok(code);
		}
	}
	var labelStartImage = {
		name: "labelStartImage",
		resolveAll: labelEnd.resolveAll,
		tokenize: tokenizeLabelStartImage
	};
	function tokenizeLabelStartImage(effects, ok, nok) {
		const self = this;
		return start;
		function start(code) {
			effects.enter("labelImage");
			effects.enter("labelImageMarker");
			effects.consume(code);
			effects.exit("labelImageMarker");
			return open;
		}
		function open(code) {
			if (code === 91) {
				effects.enter("labelMarker");
				effects.consume(code);
				effects.exit("labelMarker");
				effects.exit("labelImage");
				return after;
			}
			return nok(code);
		}
		function after(code) {
			return code === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code) : ok(code);
		}
	}
	var labelStartLink = {
		name: "labelStartLink",
		resolveAll: labelEnd.resolveAll,
		tokenize: tokenizeLabelStartLink
	};
	function tokenizeLabelStartLink(effects, ok, nok) {
		const self = this;
		return start;
		function start(code) {
			effects.enter("labelLink");
			effects.enter("labelMarker");
			effects.consume(code);
			effects.exit("labelMarker");
			effects.exit("labelLink");
			return after;
		}
		function after(code) {
			return code === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code) : ok(code);
		}
	}
	var lineEnding = {
		name: "lineEnding",
		tokenize: tokenizeLineEnding
	};
	function tokenizeLineEnding(effects, ok) {
		return start;
		function start(code) {
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			return factorySpace(effects, ok, "linePrefix");
		}
	}
	var thematicBreak$2 = {
		name: "thematicBreak",
		tokenize: tokenizeThematicBreak
	};
	function tokenizeThematicBreak(effects, ok, nok) {
		let size = 0;
		let marker;
		return start;
		function start(code) {
			effects.enter("thematicBreak");
			return before(code);
		}
		function before(code) {
			marker = code;
			return atBreak(code);
		}
		function atBreak(code) {
			if (code === marker) {
				effects.enter("thematicBreakSequence");
				return sequence(code);
			}
			if (size >= 3 && (code === null || markdownLineEnding(code))) {
				effects.exit("thematicBreak");
				return ok(code);
			}
			return nok(code);
		}
		function sequence(code) {
			if (code === marker) {
				effects.consume(code);
				size++;
				return sequence;
			}
			effects.exit("thematicBreakSequence");
			return markdownSpace(code) ? factorySpace(effects, atBreak, "whitespace")(code) : atBreak(code);
		}
	}
	var list$3 = {
		continuation: { tokenize: tokenizeListContinuation },
		exit: tokenizeListEnd,
		name: "list",
		tokenize: tokenizeListStart
	};
	var listItemPrefixWhitespaceConstruct = {
		partial: true,
		tokenize: tokenizeListItemPrefixWhitespace
	};
	var indentConstruct = {
		partial: true,
		tokenize: tokenizeIndent$1
	};
	function tokenizeListStart(effects, ok, nok) {
		const self = this;
		const tail = self.events[self.events.length - 1];
		let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
		let size = 0;
		return start;
		function start(code) {
			const kind = self.containerState.type || (code === 42 || code === 43 || code === 45 ? "listUnordered" : "listOrdered");
			if (kind === "listUnordered" ? !self.containerState.marker || code === self.containerState.marker : asciiDigit(code)) {
				if (!self.containerState.type) {
					self.containerState.type = kind;
					effects.enter(kind, { _container: true });
				}
				if (kind === "listUnordered") {
					effects.enter("listItemPrefix");
					return code === 42 || code === 45 ? effects.check(thematicBreak$2, nok, atMarker)(code) : atMarker(code);
				}
				if (!self.interrupt || code === 49) {
					effects.enter("listItemPrefix");
					effects.enter("listItemValue");
					return inside(code);
				}
			}
			return nok(code);
		}
		function inside(code) {
			if (asciiDigit(code) && ++size < 10) {
				effects.consume(code);
				return inside;
			}
			if ((!self.interrupt || size < 2) && (self.containerState.marker ? code === self.containerState.marker : code === 41 || code === 46)) {
				effects.exit("listItemValue");
				return atMarker(code);
			}
			return nok(code);
		}
		function atMarker(code) {
			effects.enter("listItemMarker");
			effects.consume(code);
			effects.exit("listItemMarker");
			self.containerState.marker = self.containerState.marker || code;
			return effects.check(blankLine, self.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
		}
		function onBlank(code) {
			self.containerState.initialBlankLine = true;
			initialSize++;
			return endOfPrefix(code);
		}
		function otherPrefix(code) {
			if (markdownSpace(code)) {
				effects.enter("listItemPrefixWhitespace");
				effects.consume(code);
				effects.exit("listItemPrefixWhitespace");
				return endOfPrefix;
			}
			return nok(code);
		}
		function endOfPrefix(code) {
			self.containerState.size = initialSize + self.sliceSerialize(effects.exit("listItemPrefix"), true).length;
			return ok(code);
		}
	}
	function tokenizeListContinuation(effects, ok, nok) {
		const self = this;
		self.containerState._closeFlow = void 0;
		return effects.check(blankLine, onBlank, notBlank);
		function onBlank(code) {
			self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;
			return factorySpace(effects, ok, "listItemIndent", self.containerState.size + 1)(code);
		}
		function notBlank(code) {
			if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
				self.containerState.furtherBlankLines = void 0;
				self.containerState.initialBlankLine = void 0;
				return notInCurrentItem(code);
			}
			self.containerState.furtherBlankLines = void 0;
			self.containerState.initialBlankLine = void 0;
			return effects.attempt(indentConstruct, ok, notInCurrentItem)(code);
		}
		function notInCurrentItem(code) {
			self.containerState._closeFlow = true;
			self.interrupt = void 0;
			return factorySpace(effects, effects.attempt(list$3, ok, nok), "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code);
		}
	}
	function tokenizeIndent$1(effects, ok, nok) {
		const self = this;
		return factorySpace(effects, afterPrefix, "listItemIndent", self.containerState.size + 1);
		function afterPrefix(code) {
			const tail = self.events[self.events.length - 1];
			return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self.containerState.size ? ok(code) : nok(code);
		}
	}
	function tokenizeListEnd(effects) {
		effects.exit(this.containerState.type);
	}
	function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
		const self = this;
		return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
		function afterPrefix(code) {
			const tail = self.events[self.events.length - 1];
			return !markdownSpace(code) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok(code) : nok(code);
		}
	}
	var setextUnderline = {
		name: "setextUnderline",
		resolveTo: resolveToSetextUnderline,
		tokenize: tokenizeSetextUnderline
	};
	function resolveToSetextUnderline(events, context) {
		let index = events.length;
		let content;
		let text;
		let definition;
		while (index--) if (events[index][0] === "enter") {
			if (events[index][1].type === "content") {
				content = index;
				break;
			}
			if (events[index][1].type === "paragraph") text = index;
		} else {
			if (events[index][1].type === "content") events.splice(index, 1);
			if (!definition && events[index][1].type === "definition") definition = index;
		}
		const heading = {
			type: "setextHeading",
			start: { ...events[content][1].start },
			end: { ...events[events.length - 1][1].end }
		};
		events[text][1].type = "setextHeadingText";
		if (definition) {
			events.splice(text, 0, [
				"enter",
				heading,
				context
			]);
			events.splice(definition + 1, 0, [
				"exit",
				events[content][1],
				context
			]);
			events[content][1].end = { ...events[definition][1].end };
		} else events[content][1] = heading;
		events.push([
			"exit",
			heading,
			context
		]);
		return events;
	}
	function tokenizeSetextUnderline(effects, ok, nok) {
		const self = this;
		let marker;
		return start;
		function start(code) {
			let index = self.events.length;
			let paragraph;
			while (index--) if (self.events[index][1].type !== "lineEnding" && self.events[index][1].type !== "linePrefix" && self.events[index][1].type !== "content") {
				paragraph = self.events[index][1].type === "paragraph";
				break;
			}
			if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph)) {
				effects.enter("setextHeadingLine");
				marker = code;
				return before(code);
			}
			return nok(code);
		}
		function before(code) {
			effects.enter("setextHeadingLineSequence");
			return inside(code);
		}
		function inside(code) {
			if (code === marker) {
				effects.consume(code);
				return inside;
			}
			effects.exit("setextHeadingLineSequence");
			return markdownSpace(code) ? factorySpace(effects, after, "lineSuffix")(code) : after(code);
		}
		function after(code) {
			if (code === null || markdownLineEnding(code)) {
				effects.exit("setextHeadingLine");
				return ok(code);
			}
			return nok(code);
		}
	}
	var flow$1 = { tokenize: initializeFlow };
	function initializeFlow(effects) {
		const self = this;
		const initial = effects.attempt(blankLine, atBlankEnding, effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content, afterConstruct)), "linePrefix")));
		return initial;
		function atBlankEnding(code) {
			if (code === null) {
				effects.consume(code);
				return;
			}
			effects.enter("lineEndingBlank");
			effects.consume(code);
			effects.exit("lineEndingBlank");
			self.currentConstruct = void 0;
			return initial;
		}
		function afterConstruct(code) {
			if (code === null) {
				effects.consume(code);
				return;
			}
			effects.enter("lineEnding");
			effects.consume(code);
			effects.exit("lineEnding");
			self.currentConstruct = void 0;
			return initial;
		}
	}
	var resolver = { resolveAll: createResolver() };
	var string$1 = initializeFactory("string");
	var text$4 = initializeFactory("text");
	function initializeFactory(field) {
		return {
			resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0),
			tokenize: initializeText
		};
		function initializeText(effects) {
			const self = this;
			const constructs = this.parser.constructs[field];
			const text = effects.attempt(constructs, start, notText);
			return start;
			function start(code) {
				return atBreak(code) ? text(code) : notText(code);
			}
			function notText(code) {
				if (code === null) {
					effects.consume(code);
					return;
				}
				effects.enter("data");
				effects.consume(code);
				return data;
			}
			function data(code) {
				if (atBreak(code)) {
					effects.exit("data");
					return text(code);
				}
				effects.consume(code);
				return data;
			}
			function atBreak(code) {
				if (code === null) return true;
				const list = constructs[code];
				let index = -1;
				if (list) while (++index < list.length) {
					const item = list[index];
					if (!item.previous || item.previous.call(self, self.previous)) return true;
				}
				return false;
			}
		}
	}
	function createResolver(extraResolver) {
		return resolveAllText;
		function resolveAllText(events, context) {
			let index = -1;
			let enter;
			while (++index <= events.length) if (enter === void 0) {
				if (events[index] && events[index][1].type === "data") {
					enter = index;
					index++;
				}
			} else if (!events[index] || events[index][1].type !== "data") {
				if (index !== enter + 2) {
					events[enter][1].end = events[index - 1][1].end;
					events.splice(enter + 2, index - enter - 2);
					index = enter + 2;
				}
				enter = void 0;
			}
			return extraResolver ? extraResolver(events, context) : events;
		}
	}
	function resolveAllLineSuffixes(events, context) {
		let eventIndex = 0;
		while (++eventIndex <= events.length) if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
			const data = events[eventIndex - 1][1];
			const chunks = context.sliceStream(data);
			let index = chunks.length;
			let bufferIndex = -1;
			let size = 0;
			let tabs;
			while (index--) {
				const chunk = chunks[index];
				if (typeof chunk === "string") {
					bufferIndex = chunk.length;
					while (chunk.charCodeAt(bufferIndex - 1) === 32) {
						size++;
						bufferIndex--;
					}
					if (bufferIndex) break;
					bufferIndex = -1;
				} else if (chunk === -2) {
					tabs = true;
					size++;
				} else if (chunk === -1) {} else {
					index++;
					break;
				}
			}
			if (context._contentTypeTextTrailing && eventIndex === events.length) size = 0;
			if (size) {
				const token = {
					type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
					start: {
						_bufferIndex: index ? bufferIndex : data.start._bufferIndex + bufferIndex,
						_index: data.start._index + index,
						line: data.end.line,
						column: data.end.column - size,
						offset: data.end.offset - size
					},
					end: { ...data.end }
				};
				data.end = { ...token.start };
				if (data.start.offset === data.end.offset) Object.assign(data, token);
				else {
					events.splice(eventIndex, 0, [
						"enter",
						token,
						context
					], [
						"exit",
						token,
						context
					]);
					eventIndex += 2;
				}
			}
			eventIndex++;
		}
		return events;
	}
	var constructs_exports = __exportAll({
		attentionMarkers: () => attentionMarkers,
		contentInitial: () => contentInitial,
		disable: () => disable,
		document: () => document$1,
		flow: () => flow,
		flowInitial: () => flowInitial,
		insideSpan: () => insideSpan,
		string: () => string,
		text: () => text$3
	});
	var document$1 = {
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
	var contentInitial = { [91]: definition$1 };
	var flowInitial = {
		[-2]: codeIndented,
		[-1]: codeIndented,
		[32]: codeIndented
	};
	var flow = {
		[35]: headingAtx,
		[42]: thematicBreak$2,
		[45]: [setextUnderline, thematicBreak$2],
		[60]: htmlFlow,
		[61]: setextUnderline,
		[95]: thematicBreak$2,
		[96]: codeFenced,
		[126]: codeFenced
	};
	var string = {
		[38]: characterReference,
		[92]: characterEscape
	};
	var text$3 = {
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
	var insideSpan = { null: [attention, resolver] };
	var attentionMarkers = { null: [42, 95] };
	var disable = { null: [] };
	function createTokenizer(parser, initialize, from) {
		let point = {
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
			exit,
			interrupt: constructFactory(onsuccessfulcheck, { interrupt: true })
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
		if (initialize.resolveAll) resolveAllConstructs.push(initialize);
		return context;
		function write(slice) {
			chunks = push(chunks, slice);
			main();
			if (chunks[chunks.length - 1] !== null) return [];
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
			const { _bufferIndex, _index, line, column, offset } = point;
			return {
				_bufferIndex,
				_index,
				line,
				column,
				offset
			};
		}
		function defineSkip(value) {
			columnStart[value.line] = value.column;
			accountForPotentialSkip();
		}
		function main() {
			let chunkIndex;
			while (point._index < chunks.length) {
				const chunk = chunks[point._index];
				if (typeof chunk === "string") {
					chunkIndex = point._index;
					if (point._bufferIndex < 0) point._bufferIndex = 0;
					while (point._index === chunkIndex && point._bufferIndex < chunk.length) go(chunk.charCodeAt(point._bufferIndex));
				} else go(chunk);
			}
		}
		function go(code) {
			state = state(code);
		}
		function consume(code) {
			if (markdownLineEnding(code)) {
				point.line++;
				point.column = 1;
				point.offset += code === -3 ? 2 : 1;
				accountForPotentialSkip();
			} else if (code !== -1) {
				point.column++;
				point.offset++;
			}
			if (point._bufferIndex < 0) point._index++;
			else {
				point._bufferIndex++;
				if (point._bufferIndex === chunks[point._index].length) {
					point._bufferIndex = -1;
					point._index++;
				}
			}
			context.previous = code;
		}
		function enter(type, fields) {
			const token = fields || {};
			token.type = type;
			token.start = now();
			context.events.push([
				"enter",
				token,
				context
			]);
			stack.push(token);
			return token;
		}
		function exit(type) {
			const token = stack.pop();
			token.end = now();
			context.events.push([
				"exit",
				token,
				context
			]);
			return token;
		}
		function onsuccessfulconstruct(construct, info) {
			addResult(construct, info.from);
		}
		function onsuccessfulcheck(_, info) {
			info.restore();
		}
		function constructFactory(onreturn, fields) {
			return hook;
			function hook(constructs, returnState, bogusState) {
				let listOfConstructs;
				let constructIndex;
				let currentConstruct;
				let info;
				return Array.isArray(constructs) ? handleListOfConstructs(constructs) : "tokenize" in constructs ? handleListOfConstructs([constructs]) : handleMapOfConstructs(constructs);
				function handleMapOfConstructs(map) {
					return start;
					function start(code) {
						const left = code !== null && map[code];
						const all = code !== null && map.null;
						return handleListOfConstructs([...Array.isArray(left) ? left : left ? [left] : [], ...Array.isArray(all) ? all : all ? [all] : []])(code);
					}
				}
				function handleListOfConstructs(list) {
					listOfConstructs = list;
					constructIndex = 0;
					if (list.length === 0) return bogusState;
					return handleConstruct(list[constructIndex]);
				}
				function handleConstruct(construct) {
					return start;
					function start(code) {
						info = store();
						currentConstruct = construct;
						if (!construct.partial) context.currentConstruct = construct;
						if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) return nok(code);
						return construct.tokenize.call(fields ? Object.assign(Object.create(context), fields) : context, effects, ok, nok)(code);
					}
				}
				function ok(code) {
					onreturn(currentConstruct, info);
					return returnState;
				}
				function nok(code) {
					info.restore();
					if (++constructIndex < listOfConstructs.length) return handleConstruct(listOfConstructs[constructIndex]);
					return bogusState;
				}
			}
		}
		function addResult(construct, from) {
			if (construct.resolveAll && !resolveAllConstructs.includes(construct)) resolveAllConstructs.push(construct);
			if (construct.resolve) splice(context.events, from, context.events.length - from, construct.resolve(context.events.slice(from), context));
			if (construct.resolveTo) context.events = construct.resolveTo(context.events, context);
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
				point = startPoint;
				context.previous = startPrevious;
				context.currentConstruct = startCurrentConstruct;
				context.events.length = startEventsIndex;
				stack = startStack;
				accountForPotentialSkip();
			}
		}
		function accountForPotentialSkip() {
			if (point.line in columnStart && point.column < 2) {
				point.column = columnStart[point.line];
				point.offset += columnStart[point.line] - 1;
			}
		}
	}
	function sliceChunks(chunks, token) {
		const startIndex = token.start._index;
		const startBufferIndex = token.start._bufferIndex;
		const endIndex = token.end._index;
		const endBufferIndex = token.end._bufferIndex;
		let view;
		if (startIndex === endIndex) view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
		else {
			view = chunks.slice(startIndex, endIndex);
			if (startBufferIndex > -1) {
				const head = view[0];
				if (typeof head === "string") view[0] = head.slice(startBufferIndex);
				else view.shift();
			}
			if (endBufferIndex > 0) view.push(chunks[endIndex].slice(0, endBufferIndex));
		}
		return view;
	}
	function serializeChunks(chunks, expandTabs) {
		let index = -1;
		const result = [];
		let atTab;
		while (++index < chunks.length) {
			const chunk = chunks[index];
			let value;
			if (typeof chunk === "string") value = chunk;
			else switch (chunk) {
				case -5:
					value = "\r";
					break;
				case -4:
					value = "\n";
					break;
				case -3:
					value = "\r\n";
					break;
				case -2:
					value = expandTabs ? " " : "	";
					break;
				case -1:
					if (!expandTabs && atTab) continue;
					value = " ";
					break;
				default: value = String.fromCharCode(chunk);
			}
			atTab = chunk === -2;
			result.push(value);
		}
		return result.join("");
	}
	function parse$1(options) {
		const parser = {
			constructs: combineExtensions([constructs_exports, ...(options || {}).extensions || []]),
			content: create(content$1),
			defined: [],
			document: create(document$2),
			flow: create(flow$1),
			lazy: {},
			string: create(string$1),
			text: create(text$4)
		};
		return parser;
		function create(initial) {
			return creator;
			function creator(from) {
				return createTokenizer(parser, initial, from);
			}
		}
	}
	function postprocess(events) {
		while (!subtokenize(events));
		return events;
	}
	var search = /[\0\t\n\r]/g;
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
			let code;
			value = buffer + (typeof value === "string" ? value.toString() : new TextDecoder(encoding || void 0).decode(value));
			startPosition = 0;
			buffer = "";
			if (start) {
				if (value.charCodeAt(0) === 65279) startPosition++;
				start = void 0;
			}
			while (startPosition < value.length) {
				search.lastIndex = startPosition;
				match = search.exec(value);
				endPosition = match && match.index !== void 0 ? match.index : value.length;
				code = value.charCodeAt(endPosition);
				if (!match) {
					buffer = value.slice(startPosition);
					break;
				}
				if (code === 10 && startPosition === endPosition && atCarriageReturn) {
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
					switch (code) {
						case 0:
							chunks.push(65533);
							column++;
							break;
						case 9:
							next = Math.ceil(column / 4) * 4;
							chunks.push(-2);
							while (column++ < next) chunks.push(-1);
							break;
						case 10:
							chunks.push(-4);
							column = 1;
							break;
						default:
							atCarriageReturn = true;
							column = 1;
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
	var characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
	function decodeString(value) {
		return value.replace(characterEscapeOrReference, decode);
	}
	function decode($0, $1, $2) {
		if ($1) return $1;
		if ($2.charCodeAt(0) === 35) {
			const head = $2.charCodeAt(1);
			const hex = head === 120 || head === 88;
			return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
		}
		return decodeNamedCharacterReference($2) || $0;
	}
	function stringifyPosition(value) {
		if (!value || typeof value !== "object") return "";
		if ("position" in value || "type" in value) return position$1(value.position);
		if ("start" in value || "end" in value) return position$1(value);
		if ("line" in value || "column" in value) return point$2(value);
		return "";
	}
	function point$2(point) {
		return index$1(point && point.line) + ":" + index$1(point && point.column);
	}
	function position$1(pos) {
		return point$2(pos && pos.start) + "-" + point$2(pos && pos.end);
	}
	function index$1(value) {
		return value && typeof value === "number" ? value : 1;
	}
	var own$2 = {}.hasOwnProperty;
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
			canContainEols: [
				"emphasis",
				"fragment",
				"heading",
				"paragraph",
				"strong"
			],
			enter: {
				autolink: opener(link),
				autolinkProtocol: onenterdata,
				autolinkEmail: onenterdata,
				atxHeading: opener(heading),
				blockQuote: opener(blockQuote),
				characterEscape: onenterdata,
				characterReference: onenterdata,
				codeFenced: opener(codeFlow),
				codeFencedFenceInfo: buffer,
				codeFencedFenceMeta: buffer,
				codeIndented: opener(codeFlow, buffer),
				codeText: opener(codeText, buffer),
				codeTextData: onenterdata,
				data: onenterdata,
				codeFlowValue: onenterdata,
				definition: opener(definition),
				definitionDestinationString: buffer,
				definitionLabelString: buffer,
				definitionTitleString: buffer,
				emphasis: opener(emphasis),
				hardBreakEscape: opener(hardBreak),
				hardBreakTrailing: opener(hardBreak),
				htmlFlow: opener(html, buffer),
				htmlFlowData: onenterdata,
				htmlText: opener(html, buffer),
				htmlTextData: onenterdata,
				image: opener(image),
				label: buffer,
				link: opener(link),
				listItem: opener(listItem),
				listItemValue: onenterlistitemvalue,
				listOrdered: opener(list, onenterlistordered),
				listUnordered: opener(list),
				paragraph: opener(paragraph),
				reference: onenterreference,
				referenceString: buffer,
				resourceDestinationString: buffer,
				resourceTitleString: buffer,
				setextHeading: opener(heading),
				strong: opener(strong),
				thematicBreak: opener(thematicBreak)
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
				exit,
				buffer,
				resume,
				data
			};
			const listStack = [];
			let index = -1;
			while (++index < events.length) if (events[index][1].type === "listOrdered" || events[index][1].type === "listUnordered") if (events[index][0] === "enter") listStack.push(index);
			else index = prepareList(events, listStack.pop(), index);
			index = -1;
			while (++index < events.length) {
				const handler = config[events[index][0]];
				if (own$2.call(handler, events[index][1].type)) handler[events[index][1].type].call(Object.assign({ sliceSerialize: events[index][2].sliceSerialize }, context), events[index][1]);
			}
			if (context.tokenStack.length > 0) {
				const tail = context.tokenStack[context.tokenStack.length - 1];
				(tail[1] || defaultOnError).call(context, void 0, tail[0]);
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
			index = -1;
			while (++index < config.transforms.length) tree = config.transforms[index](tree) || tree;
			return tree;
		}
		function prepareList(events, start, length) {
			let index = start - 1;
			let containerBalance = -1;
			let listSpread = false;
			let listItem;
			let lineIndex;
			let firstBlankLineIndex;
			let atMarker;
			while (++index <= length) {
				const event = events[index];
				switch (event[1].type) {
					case "listUnordered":
					case "listOrdered":
					case "blockQuote":
						if (event[0] === "enter") containerBalance++;
						else containerBalance--;
						atMarker = void 0;
						break;
					case "lineEndingBlank":
						if (event[0] === "enter") {
							if (listItem && !atMarker && !containerBalance && !firstBlankLineIndex) firstBlankLineIndex = index;
							atMarker = void 0;
						}
						break;
					case "linePrefix":
					case "listItemValue":
					case "listItemMarker":
					case "listItemPrefix":
					case "listItemPrefixWhitespace": break;
					default: atMarker = void 0;
				}
				if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
					if (listItem) {
						let tailIndex = index;
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
							} else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {} else break;
						}
						if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) listItem._spread = true;
						listItem.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
						events.splice(lineIndex || index, 0, [
							"exit",
							listItem,
							event[2]
						]);
						index++;
						length++;
					}
					if (event[1].type === "listItemPrefix") {
						const item = {
							type: "listItem",
							_spread: false,
							start: Object.assign({}, event[1].start),
							end: void 0
						};
						listItem = item;
						events.splice(index, 0, [
							"enter",
							item,
							event[2]
						]);
						index++;
						length++;
						firstBlankLineIndex = void 0;
						atMarker = true;
					}
				}
			}
			events[start][1]._spread = listSpread;
			return length;
		}
		function opener(create, and) {
			return open;
			function open(token) {
				enter.call(this, create(token), token);
				if (and) and.call(this, token);
			}
		}
		function buffer() {
			this.stack.push({
				type: "fragment",
				children: []
			});
		}
		function enter(node, token, errorHandler) {
			this.stack[this.stack.length - 1].children.push(node);
			this.stack.push(node);
			this.tokenStack.push([token, errorHandler || void 0]);
			node.position = {
				start: point$1(token.start),
				end: void 0
			};
		}
		function closer(and) {
			return close;
			function close(token) {
				if (and) and.call(this, token);
				exit.call(this, token);
			}
		}
		function exit(token, onExitError) {
			const node = this.stack.pop();
			const open = this.tokenStack.pop();
			if (!open) throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
				start: token.start,
				end: token.end
			}) + "): it’s not open");
			else if (open[0].type !== token.type) if (onExitError) onExitError.call(this, token, open[0]);
			else (open[1] || defaultOnError).call(this, token, open[0]);
			node.position.end = point$1(token.end);
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
			const data = this.resume();
			const node = this.stack[this.stack.length - 1];
			node.lang = data;
		}
		function onexitcodefencedfencemeta() {
			const data = this.resume();
			const node = this.stack[this.stack.length - 1];
			node.meta = data;
		}
		function onexitcodefencedfence() {
			if (this.data.flowCodeInside) return;
			this.buffer();
			this.data.flowCodeInside = true;
		}
		function onexitcodefenced() {
			const data = this.resume();
			const node = this.stack[this.stack.length - 1];
			node.value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
			this.data.flowCodeInside = void 0;
		}
		function onexitcodeindented() {
			const data = this.resume();
			const node = this.stack[this.stack.length - 1];
			node.value = data.replace(/(\r?\n|\r)$/g, "");
		}
		function onexitdefinitionlabelstring(token) {
			const label = this.resume();
			const node = this.stack[this.stack.length - 1];
			node.label = label;
			node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
		}
		function onexitdefinitiontitlestring() {
			const data = this.resume();
			const node = this.stack[this.stack.length - 1];
			node.title = data;
		}
		function onexitdefinitiondestinationstring() {
			const data = this.resume();
			const node = this.stack[this.stack.length - 1];
			node.url = data;
		}
		function onexitatxheadingsequence(token) {
			const node = this.stack[this.stack.length - 1];
			if (!node.depth) node.depth = this.sliceSerialize(token).length;
		}
		function onexitsetextheadingtext() {
			this.data.setextHeadingSlurpLineEnding = true;
		}
		function onexitsetextheadinglinesequence(token) {
			const node = this.stack[this.stack.length - 1];
			node.depth = this.sliceSerialize(token).codePointAt(0) === 61 ? 1 : 2;
		}
		function onexitsetextheading() {
			this.data.setextHeadingSlurpLineEnding = void 0;
		}
		function onenterdata(token) {
			const siblings = this.stack[this.stack.length - 1].children;
			let tail = siblings[siblings.length - 1];
			if (!tail || tail.type !== "text") {
				tail = text();
				tail.position = {
					start: point$1(token.start),
					end: void 0
				};
				siblings.push(tail);
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
			const data = this.resume();
			const node = this.stack[this.stack.length - 1];
			node.value = data;
		}
		function onexithtmltext() {
			const data = this.resume();
			const node = this.stack[this.stack.length - 1];
			node.value = data;
		}
		function onexitcodetext() {
			const data = this.resume();
			const node = this.stack[this.stack.length - 1];
			node.value = data;
		}
		function onexitlink() {
			const node = this.stack[this.stack.length - 1];
			if (this.data.inReference) {
				const referenceType = this.data.referenceType || "shortcut";
				node.type += "Reference";
				node.referenceType = referenceType;
				delete node.url;
				delete node.title;
			} else {
				delete node.identifier;
				delete node.label;
			}
			this.data.referenceType = void 0;
		}
		function onexitimage() {
			const node = this.stack[this.stack.length - 1];
			if (this.data.inReference) {
				const referenceType = this.data.referenceType || "shortcut";
				node.type += "Reference";
				node.referenceType = referenceType;
				delete node.url;
				delete node.title;
			} else {
				delete node.identifier;
				delete node.label;
			}
			this.data.referenceType = void 0;
		}
		function onexitlabeltext(token) {
			const string = this.sliceSerialize(token);
			const ancestor = this.stack[this.stack.length - 2];
			ancestor.label = decodeString(string);
			ancestor.identifier = normalizeIdentifier(string).toLowerCase();
		}
		function onexitlabel() {
			const fragment = this.stack[this.stack.length - 1];
			const value = this.resume();
			const node = this.stack[this.stack.length - 1];
			this.data.inReference = true;
			if (node.type === "link") node.children = fragment.children;
			else node.alt = value;
		}
		function onexitresourcedestinationstring() {
			const data = this.resume();
			const node = this.stack[this.stack.length - 1];
			node.url = data;
		}
		function onexitresourcetitlestring() {
			const data = this.resume();
			const node = this.stack[this.stack.length - 1];
			node.title = data;
		}
		function onexitresource() {
			this.data.inReference = void 0;
		}
		function onenterreference() {
			this.data.referenceType = "collapsed";
		}
		function onexitreferencestring(token) {
			const label = this.resume();
			const node = this.stack[this.stack.length - 1];
			node.label = label;
			node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
			this.data.referenceType = "full";
		}
		function onexitcharacterreferencemarker(token) {
			this.data.characterReferenceType = token.type;
		}
		function onexitcharacterreferencevalue(token) {
			const data = this.sliceSerialize(token);
			const type = this.data.characterReferenceType;
			let value;
			if (type) {
				value = decodeNumericCharacterReference(data, type === "characterReferenceMarkerNumeric" ? 10 : 16);
				this.data.characterReferenceType = void 0;
			} else value = decodeNamedCharacterReference(data);
			const tail = this.stack[this.stack.length - 1];
			tail.value += value;
		}
		function onexitcharacterreference(token) {
			const tail = this.stack.pop();
			tail.position.end = point$1(token.end);
		}
		function onexitautolinkprotocol(token) {
			onexitdata.call(this, token);
			const node = this.stack[this.stack.length - 1];
			node.url = this.sliceSerialize(token);
		}
		function onexitautolinkemail(token) {
			onexitdata.call(this, token);
			const node = this.stack[this.stack.length - 1];
			node.url = "mailto:" + this.sliceSerialize(token);
		}
		function blockQuote() {
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
		function codeText() {
			return {
				type: "inlineCode",
				value: ""
			};
		}
		function definition() {
			return {
				type: "definition",
				identifier: "",
				label: null,
				title: null,
				url: ""
			};
		}
		function emphasis() {
			return {
				type: "emphasis",
				children: []
			};
		}
		function heading() {
			return {
				type: "heading",
				depth: 0,
				children: []
			};
		}
		function hardBreak() {
			return { type: "break" };
		}
		function html() {
			return {
				type: "html",
				value: ""
			};
		}
		function image() {
			return {
				type: "image",
				title: null,
				url: "",
				alt: null
			};
		}
		function link() {
			return {
				type: "link",
				title: null,
				url: "",
				children: []
			};
		}
		function list(token) {
			return {
				type: "list",
				ordered: token.type === "listOrdered",
				start: null,
				spread: token._spread,
				children: []
			};
		}
		function listItem(token) {
			return {
				type: "listItem",
				spread: token._spread,
				checked: null,
				children: []
			};
		}
		function paragraph() {
			return {
				type: "paragraph",
				children: []
			};
		}
		function strong() {
			return {
				type: "strong",
				children: []
			};
		}
		function text() {
			return {
				type: "text",
				value: ""
			};
		}
		function thematicBreak() {
			return { type: "thematicBreak" };
		}
	}
	function point$1(d) {
		return {
			line: d.line,
			column: d.column,
			offset: d.offset
		};
	}
	function configure$1(combined, extensions) {
		let index = -1;
		while (++index < extensions.length) {
			const value = extensions[index];
			if (Array.isArray(value)) configure$1(combined, value);
			else extension(combined, value);
		}
	}
	function extension(combined, extension) {
		let key;
		for (key in extension) if (own$2.call(extension, key)) switch (key) {
			case "canContainEols": {
				const right = extension[key];
				if (right) combined[key].push(...right);
				break;
			}
			case "transforms": {
				const right = extension[key];
				if (right) combined[key].push(...right);
				break;
			}
			case "enter":
			case "exit": {
				const right = extension[key];
				if (right) Object.assign(combined[key], right);
				break;
			}
		}
	}
	function defaultOnError(left, right) {
		if (left) throw new Error("Cannot close `" + left.type + "` (" + stringifyPosition({
			start: left.start,
			end: left.end
		}) + "): a different token (`" + right.type + "`, " + stringifyPosition({
			start: right.start,
			end: right.end
		}) + ") is open");
		else throw new Error("Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
			start: right.start,
			end: right.end
		}) + ") is still open");
	}
	function escapeStringRegexp(string) {
		if (typeof string !== "string") throw new TypeError("Expected a string");
		return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
	}
	var convert = (function(test) {
		if (test === null || test === void 0) return ok;
		if (typeof test === "function") return castFactory(test);
		if (typeof test === "object") return Array.isArray(test) ? anyFactory(test) : propertiesFactory(test);
		if (typeof test === "string") return typeFactory(test);
		throw new Error("Expected function, string, or object as test");
	});
	function anyFactory(tests) {
		const checks = [];
		let index = -1;
		while (++index < tests.length) checks[index] = convert(tests[index]);
		return castFactory(any);
		function any(...parameters) {
			let index = -1;
			while (++index < checks.length) if (checks[index].apply(this, parameters)) return true;
			return false;
		}
	}
	function propertiesFactory(check) {
		const checkAsRecord = check;
		return castFactory(all);
		function all(node) {
			const nodeAsRecord = node;
			let key;
			for (key in check) if (nodeAsRecord[key] !== checkAsRecord[key]) return false;
			return true;
		}
	}
	function typeFactory(check) {
		return castFactory(type);
		function type(node) {
			return node && node.type === check;
		}
	}
	function castFactory(testFunction) {
		return check;
		function check(value, index, parent) {
			return Boolean(looksLikeANode(value) && testFunction.call(this, value, typeof index === "number" ? index : void 0, parent || void 0));
		}
	}
	function ok() {
		return true;
	}
	function looksLikeANode(value) {
		return value !== null && typeof value === "object" && "type" in value;
	}
	function color(d) {
		return d;
	}
	var empty = [];
	function visitParents(tree, test, visitor, reverse) {
		let check;
		if (typeof test === "function" && typeof visitor !== "function") {
			reverse = visitor;
			visitor = test;
		} else check = test;
		const is = convert(check);
		const step = reverse ? -1 : 1;
		factory(tree, void 0, [])();
		function factory(node, index, parents) {
			const value = node && typeof node === "object" ? node : {};
			if (typeof value.type === "string") {
				const name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
				Object.defineProperty(visit, "name", { value: "node (" + color(node.type + (name ? "<" + name + ">" : "")) + ")" });
			}
			return visit;
			function visit() {
				let result = empty;
				let subresult;
				let offset;
				let grandparents;
				if (!test || is(node, index, parents[parents.length - 1] || void 0)) {
					result = toResult(visitor(node, parents));
					if (result[0] === false) return result;
				}
				if ("children" in node && node.children) {
					const nodeAsParent = node;
					if (nodeAsParent.children && result[0] !== "skip") {
						offset = (reverse ? nodeAsParent.children.length : -1) + step;
						grandparents = parents.concat(nodeAsParent);
						while (offset > -1 && offset < nodeAsParent.children.length) {
							const child = nodeAsParent.children[offset];
							subresult = factory(child, offset, grandparents)();
							if (subresult[0] === false) return subresult;
							offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
						}
					}
				}
				return result;
			}
		}
	}
	function toResult(value) {
		if (Array.isArray(value)) return value;
		if (typeof value === "number") return [true, value];
		return value === null || value === void 0 ? empty : [value];
	}
	function findAndReplace(tree, list, options) {
		const ignored = convert((options || {}).ignore || []);
		const pairs = toPairs(list);
		let pairIndex = -1;
		while (++pairIndex < pairs.length) visitParents(tree, "text", visitor);
		function visitor(node, parents) {
			let index = -1;
			let grandparent;
			while (++index < parents.length) {
				const parent = parents[index];
				const siblings = grandparent ? grandparent.children : void 0;
				if (ignored(parent, siblings ? siblings.indexOf(parent) : void 0, grandparent)) return;
				grandparent = parent;
			}
			if (grandparent) return handler(node, parents);
		}
		function handler(node, parents) {
			const parent = parents[parents.length - 1];
			const find = pairs[pairIndex][0];
			const replace = pairs[pairIndex][1];
			let start = 0;
			const index = parent.children.indexOf(node);
			let change = false;
			let nodes = [];
			find.lastIndex = 0;
			let match = find.exec(node.value);
			while (match) {
				const position = match.index;
				const matchObject = {
					index: match.index,
					input: match.input,
					stack: [...parents, node]
				};
				let value = replace(...match, matchObject);
				if (typeof value === "string") value = value.length > 0 ? {
					type: "text",
					value
				} : void 0;
				if (value === false) find.lastIndex = position + 1;
				else {
					if (start !== position) nodes.push({
						type: "text",
						value: node.value.slice(start, position)
					});
					if (Array.isArray(value)) nodes.push(...value);
					else if (value) nodes.push(value);
					start = position + match[0].length;
					change = true;
				}
				if (!find.global) break;
				match = find.exec(node.value);
			}
			if (change) {
				if (start < node.value.length) nodes.push({
					type: "text",
					value: node.value.slice(start)
				});
				parent.children.splice(index, 1, ...nodes);
			} else nodes = [node];
			return index + nodes.length;
		}
	}
	function toPairs(tupleOrList) {
		const result = [];
		if (!Array.isArray(tupleOrList)) throw new TypeError("Expected find and replace tuple or list of tuples");
		const list = !tupleOrList[0] || Array.isArray(tupleOrList[0]) ? tupleOrList : [tupleOrList];
		let index = -1;
		while (++index < list.length) {
			const tuple = list[index];
			result.push([toExpression(tuple[0]), toFunction(tuple[1])]);
		}
		return result;
	}
	function toExpression(find) {
		return typeof find === "string" ? new RegExp(escapeStringRegexp(find), "g") : find;
	}
	function toFunction(replace) {
		return typeof replace === "function" ? replace : function() {
			return replace;
		};
	}
	var inConstruct = "phrasing";
	var notInConstruct = [
		"autolink",
		"link",
		"image",
		"label"
	];
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
		return { unsafe: [
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
		] };
	}
	function enterLiteralAutolink(token) {
		this.enter({
			type: "link",
			title: null,
			url: "",
			children: []
		}, token);
	}
	function enterLiteralAutolinkValue(token) {
		this.config.enter.autolinkProtocol.call(this, token);
	}
	function exitLiteralAutolinkHttp(token) {
		this.config.exit.autolinkProtocol.call(this, token);
	}
	function exitLiteralAutolinkWww(token) {
		this.config.exit.data.call(this, token);
		const node = this.stack[this.stack.length - 1];
		node.type;
		node.url = "http://" + this.sliceSerialize(token);
	}
	function exitLiteralAutolinkEmail(token) {
		this.config.exit.autolinkEmail.call(this, token);
	}
	function exitLiteralAutolink(token) {
		this.exit(token);
	}
	function transformGfmAutolinkLiterals(tree) {
		findAndReplace(tree, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, findUrl], [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, findEmail]], { ignore: ["link", "linkReference"] });
	}
	function findUrl(_, protocol, domain, path, match) {
		let prefix = "";
		if (!previous(match)) return false;
		if (/^w/i.test(protocol)) {
			domain = protocol + domain;
			protocol = "";
			prefix = "http://";
		}
		if (!isCorrectDomain(domain)) return false;
		const parts = splitUrl(domain + path);
		if (!parts[0]) return false;
		const result = {
			type: "link",
			title: null,
			url: prefix + protocol + parts[0],
			children: [{
				type: "text",
				value: protocol + parts[0]
			}]
		};
		if (parts[1]) return [result, {
			type: "text",
			value: parts[1]
		}];
		return result;
	}
	function findEmail(_, atext, label, match) {
		if (!previous(match, true) || /[-\d_]$/.test(label)) return false;
		return {
			type: "link",
			title: null,
			url: "mailto:" + atext + "@" + label,
			children: [{
				type: "text",
				value: atext + "@" + label
			}]
		};
	}
	function isCorrectDomain(domain) {
		const parts = domain.split(".");
		if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) return false;
		return true;
	}
	function splitUrl(url) {
		const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url);
		if (!trailExec) return [url, void 0];
		url = url.slice(0, trailExec.index);
		let trail = trailExec[0];
		let closingParenIndex = trail.indexOf(")");
		const openingParens = ccount(url, "(");
		let closingParens = ccount(url, ")");
		while (closingParenIndex !== -1 && openingParens > closingParens) {
			url += trail.slice(0, closingParenIndex + 1);
			trail = trail.slice(closingParenIndex + 1);
			closingParenIndex = trail.indexOf(")");
			closingParens++;
		}
		return [url, trail];
	}
	function previous(match, email) {
		const code = match.input.charCodeAt(match.index - 1);
		return (match.index === 0 || unicodeWhitespace(code) || unicodePunctuation(code)) && (!email || code !== 47);
	}
	footnoteReference$1.peek = footnoteReferencePeek;
	function enterFootnoteCallString() {
		this.buffer();
	}
	function enterFootnoteCall(token) {
		this.enter({
			type: "footnoteReference",
			identifier: "",
			label: ""
		}, token);
	}
	function enterFootnoteDefinitionLabelString() {
		this.buffer();
	}
	function enterFootnoteDefinition(token) {
		this.enter({
			type: "footnoteDefinition",
			identifier: "",
			label: "",
			children: []
		}, token);
	}
	function exitFootnoteCallString(token) {
		const label = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.type;
		node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
		node.label = label;
	}
	function exitFootnoteCall(token) {
		this.exit(token);
	}
	function exitFootnoteDefinitionLabelString(token) {
		const label = this.resume();
		const node = this.stack[this.stack.length - 1];
		node.type;
		node.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
		node.label = label;
	}
	function exitFootnoteDefinition(token) {
		this.exit(token);
	}
	function footnoteReferencePeek() {
		return "[";
	}
	function footnoteReference$1(node, _, state, info) {
		const tracker = state.createTracker(info);
		let value = tracker.move("[^");
		const exit = state.enter("footnoteReference");
		const subexit = state.enter("reference");
		value += tracker.move(state.safe(state.associationId(node), {
			after: "]",
			before: value
		}));
		subexit();
		exit();
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
		let firstLineBlank = false;
		if (options && options.firstLineBlank) firstLineBlank = true;
		return {
			handlers: {
				footnoteDefinition,
				footnoteReference: footnoteReference$1
			},
			unsafe: [{
				character: "[",
				inConstruct: [
					"label",
					"phrasing",
					"reference"
				]
			}]
		};
		function footnoteDefinition(node, _, state, info) {
			const tracker = state.createTracker(info);
			let value = tracker.move("[^");
			const exit = state.enter("footnoteDefinition");
			const subexit = state.enter("label");
			value += tracker.move(state.safe(state.associationId(node), {
				before: value,
				after: "]"
			}));
			subexit();
			value += tracker.move("]:");
			if (node.children && node.children.length > 0) {
				tracker.shift(4);
				value += tracker.move((firstLineBlank ? "\n" : " ") + state.indentLines(state.containerFlow(node, tracker.current()), firstLineBlank ? mapAll : mapExceptFirst));
			}
			exit();
			return value;
		}
	}
	function mapExceptFirst(line, index, blank) {
		return index === 0 ? line : mapAll(line, index, blank);
	}
	function mapAll(line, index, blank) {
		return (blank ? "" : "    ") + line;
	}
	var constructsWithoutStrikethrough = [
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
			unsafe: [{
				character: "~",
				inConstruct: "phrasing",
				notInConstruct: constructsWithoutStrikethrough
			}],
			handlers: { delete: handleDelete }
		};
	}
	function enterStrikethrough(token) {
		this.enter({
			type: "delete",
			children: []
		}, token);
	}
	function exitStrikethrough(token) {
		this.exit(token);
	}
	function handleDelete(node, _, state, info) {
		const tracker = state.createTracker(info);
		const exit = state.enter("strikethrough");
		let value = tracker.move("~~");
		value += state.containerPhrasing(node, {
			...tracker.current(),
			before: value,
			after: "~"
		});
		value += tracker.move("~~");
		exit();
		return value;
	}
	function peekDelete() {
		return "~";
	}
	function defaultStringLength(value) {
		return value.length;
	}
	function markdownTable(table, options) {
		const settings = options || {};
		const align = (settings.align || []).concat();
		const stringLength = settings.stringLength || defaultStringLength;
		const alignments = [];
		const cellMatrix = [];
		const sizeMatrix = [];
		const longestCellByColumn = [];
		let mostCellsPerRow = 0;
		let rowIndex = -1;
		while (++rowIndex < table.length) {
			const row = [];
			const sizes = [];
			let columnIndex = -1;
			if (table[rowIndex].length > mostCellsPerRow) mostCellsPerRow = table[rowIndex].length;
			while (++columnIndex < table[rowIndex].length) {
				const cell = serialize$1(table[rowIndex][columnIndex]);
				if (settings.alignDelimiters !== false) {
					const size = stringLength(cell);
					sizes[columnIndex] = size;
					if (longestCellByColumn[columnIndex] === void 0 || size > longestCellByColumn[columnIndex]) longestCellByColumn[columnIndex] = size;
				}
				row.push(cell);
			}
			cellMatrix[rowIndex] = row;
			sizeMatrix[rowIndex] = sizes;
		}
		let columnIndex = -1;
		if (typeof align === "object" && "length" in align) while (++columnIndex < mostCellsPerRow) alignments[columnIndex] = toAlignment(align[columnIndex]);
		else {
			const code = toAlignment(align);
			while (++columnIndex < mostCellsPerRow) alignments[columnIndex] = code;
		}
		columnIndex = -1;
		const row = [];
		const sizes = [];
		while (++columnIndex < mostCellsPerRow) {
			const code = alignments[columnIndex];
			let before = "";
			let after = "";
			if (code === 99) {
				before = ":";
				after = ":";
			} else if (code === 108) before = ":";
			else if (code === 114) after = ":";
			let size = settings.alignDelimiters === false ? 1 : Math.max(1, longestCellByColumn[columnIndex] - before.length - after.length);
			const cell = before + "-".repeat(size) + after;
			if (settings.alignDelimiters !== false) {
				size = before.length + size + after.length;
				if (size > longestCellByColumn[columnIndex]) longestCellByColumn[columnIndex] = size;
				sizes[columnIndex] = size;
			}
			row[columnIndex] = cell;
		}
		cellMatrix.splice(1, 0, row);
		sizeMatrix.splice(1, 0, sizes);
		rowIndex = -1;
		const lines = [];
		while (++rowIndex < cellMatrix.length) {
			const row = cellMatrix[rowIndex];
			const sizes = sizeMatrix[rowIndex];
			columnIndex = -1;
			const line = [];
			while (++columnIndex < mostCellsPerRow) {
				const cell = row[columnIndex] || "";
				let before = "";
				let after = "";
				if (settings.alignDelimiters !== false) {
					const size = longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0);
					const code = alignments[columnIndex];
					if (code === 114) before = " ".repeat(size);
					else if (code === 99) if (size % 2) {
						before = " ".repeat(size / 2 + .5);
						after = " ".repeat(size / 2 - .5);
					} else {
						before = " ".repeat(size / 2);
						after = before;
					}
					else after = " ".repeat(size);
				}
				if (settings.delimiterStart !== false && !columnIndex) line.push("|");
				if (settings.padding !== false && !(settings.alignDelimiters === false && cell === "") && (settings.delimiterStart !== false || columnIndex)) line.push(" ");
				if (settings.alignDelimiters !== false) line.push(before);
				line.push(cell);
				if (settings.alignDelimiters !== false) line.push(after);
				if (settings.padding !== false) line.push(" ");
				if (settings.delimiterEnd !== false || columnIndex !== mostCellsPerRow - 1) line.push("|");
			}
			lines.push(settings.delimiterEnd === false ? line.join("").replace(/ +$/, "") : line.join(""));
		}
		return lines.join("\n");
	}
	function serialize$1(value) {
		return value === null || value === void 0 ? "" : String(value);
	}
	function toAlignment(value) {
		const code = typeof value === "string" ? value.codePointAt(0) : 0;
		return code === 67 || code === 99 ? 99 : code === 76 || code === 108 ? 108 : code === 82 || code === 114 ? 114 : 0;
	}
	var own$1 = {}.hasOwnProperty;
	function configure(base, extension) {
		let index = -1;
		let key;
		if (extension.extensions) while (++index < extension.extensions.length) configure(base, extension.extensions[index]);
		for (key in extension) if (own$1.call(extension, key)) switch (key) {
			case "extensions": break;
			case "unsafe":
				list$2(base[key], extension[key]);
				break;
			case "join":
				list$2(base[key], extension[key]);
				break;
			case "handlers":
				map$2(base[key], extension[key]);
				break;
			default: base.options[key] = extension[key];
		}
		return base;
	}
	function list$2(left, right) {
		if (right) left.push(...right);
	}
	function map$2(left, right) {
		if (right) Object.assign(left, right);
	}
	function blockquote$1(node, _, state, info) {
		const exit = state.enter("blockquote");
		const tracker = state.createTracker(info);
		tracker.move("> ");
		tracker.shift(2);
		const value = state.indentLines(state.containerFlow(node, tracker.current()), map$1);
		exit();
		return value;
	}
	function map$1(line, _, blank) {
		return ">" + (blank ? "" : " ") + line;
	}
	function patternInScope(stack, pattern) {
		return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct, false);
	}
	function listInScope(stack, list, none) {
		if (typeof list === "string") list = [list];
		if (!list || list.length === 0) return none;
		let index = -1;
		while (++index < list.length) if (stack.includes(list[index])) return true;
		return false;
	}
	function hardBreak$1(_, _1, state, info) {
		let index = -1;
		while (++index < state.unsafe.length) if (state.unsafe[index].character === "\n" && patternInScope(state.stack, state.unsafe[index])) return /[ \t]/.test(info.before) ? "" : " ";
		return "\\\n";
	}
	function longestStreak(value, substring) {
		const source = String(value);
		let index = source.indexOf(substring);
		let expected = index;
		let count = 0;
		let max = 0;
		if (typeof substring !== "string") throw new TypeError("Expected substring");
		while (index !== -1) {
			if (index === expected) {
				if (++count > max) max = count;
			} else count = 1;
			expected = index + substring.length;
			index = source.indexOf(substring, expected);
		}
		return max;
	}
	function formatCodeAsIndented(node, state) {
		return Boolean(state.options.fences === false && node.value && !node.lang && /[^ \r\n]/.test(node.value) && !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node.value));
	}
	function checkFence(state) {
		const marker = state.options.fence || "`";
		if (marker !== "`" && marker !== "~") throw new Error("Cannot serialize code with `" + marker + "` for `options.fence`, expected `` ` `` or `~`");
		return marker;
	}
	function code$2(node, _, state, info) {
		const marker = checkFence(state);
		const raw = node.value || "";
		const suffix = marker === "`" ? "GraveAccent" : "Tilde";
		if (formatCodeAsIndented(node, state)) {
			const exit = state.enter("codeIndented");
			const value = state.indentLines(raw, map);
			exit();
			return value;
		}
		const tracker = state.createTracker(info);
		const sequence = marker.repeat(Math.max(longestStreak(raw, marker) + 1, 3));
		const exit = state.enter("codeFenced");
		let value = tracker.move(sequence);
		if (node.lang) {
			const subexit = state.enter(`codeFencedLang${suffix}`);
			value += tracker.move(state.safe(node.lang, {
				before: value,
				after: " ",
				encode: ["`"],
				...tracker.current()
			}));
			subexit();
		}
		if (node.lang && node.meta) {
			const subexit = state.enter(`codeFencedMeta${suffix}`);
			value += tracker.move(" ");
			value += tracker.move(state.safe(node.meta, {
				before: value,
				after: "\n",
				encode: ["`"],
				...tracker.current()
			}));
			subexit();
		}
		value += tracker.move("\n");
		if (raw) value += tracker.move(raw + "\n");
		value += tracker.move(sequence);
		exit();
		return value;
	}
	function map(line, _, blank) {
		return (blank ? "" : "    ") + line;
	}
	function checkQuote(state) {
		const marker = state.options.quote || "\"";
		if (marker !== "\"" && marker !== "'") throw new Error("Cannot serialize title with `" + marker + "` for `options.quote`, expected `\"`, or `'`");
		return marker;
	}
	function definition(node, _, state, info) {
		const quote = checkQuote(state);
		const suffix = quote === "\"" ? "Quote" : "Apostrophe";
		const exit = state.enter("definition");
		let subexit = state.enter("label");
		const tracker = state.createTracker(info);
		let value = tracker.move("[");
		value += tracker.move(state.safe(state.associationId(node), {
			before: value,
			after: "]",
			...tracker.current()
		}));
		value += tracker.move("]: ");
		subexit();
		if (!node.url || /[\0- \u007F]/.test(node.url)) {
			subexit = state.enter("destinationLiteral");
			value += tracker.move("<");
			value += tracker.move(state.safe(node.url, {
				before: value,
				after: ">",
				...tracker.current()
			}));
			value += tracker.move(">");
		} else {
			subexit = state.enter("destinationRaw");
			value += tracker.move(state.safe(node.url, {
				before: value,
				after: node.title ? " " : "\n",
				...tracker.current()
			}));
		}
		subexit();
		if (node.title) {
			subexit = state.enter(`title${suffix}`);
			value += tracker.move(" " + quote);
			value += tracker.move(state.safe(node.title, {
				before: value,
				after: quote,
				...tracker.current()
			}));
			value += tracker.move(quote);
			subexit();
		}
		exit();
		return value;
	}
	function checkEmphasis(state) {
		const marker = state.options.emphasis || "*";
		if (marker !== "*" && marker !== "_") throw new Error("Cannot serialize emphasis with `" + marker + "` for `options.emphasis`, expected `*`, or `_`");
		return marker;
	}
	function encodeCharacterReference(code) {
		return "&#x" + code.toString(16).toUpperCase() + ";";
	}
	function encodeInfo(outside, inside, marker) {
		const outsideKind = classifyCharacter(outside);
		const insideKind = classifyCharacter(inside);
		if (outsideKind === void 0) return insideKind === void 0 ? marker === "_" ? {
			inside: true,
			outside: true
		} : {
			inside: false,
			outside: false
		} : insideKind === 1 ? {
			inside: true,
			outside: true
		} : {
			inside: false,
			outside: true
		};
		if (outsideKind === 1) return insideKind === void 0 ? {
			inside: false,
			outside: false
		} : insideKind === 1 ? {
			inside: true,
			outside: true
		} : {
			inside: false,
			outside: false
		};
		return insideKind === void 0 ? {
			inside: false,
			outside: false
		} : insideKind === 1 ? {
			inside: true,
			outside: false
		} : {
			inside: false,
			outside: false
		};
	}
	emphasis$1.peek = emphasisPeek;
	function emphasis$1(node, _, state, info) {
		const marker = checkEmphasis(state);
		const exit = state.enter("emphasis");
		const tracker = state.createTracker(info);
		const before = tracker.move(marker);
		let between = tracker.move(state.containerPhrasing(node, {
			after: marker,
			before,
			...tracker.current()
		}));
		const betweenHead = between.charCodeAt(0);
		const open = encodeInfo(info.before.charCodeAt(info.before.length - 1), betweenHead, marker);
		if (open.inside) between = encodeCharacterReference(betweenHead) + between.slice(1);
		const betweenTail = between.charCodeAt(between.length - 1);
		const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
		if (close.inside) between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
		const after = tracker.move(marker);
		exit();
		state.attentionEncodeSurroundingInfo = {
			after: close.outside,
			before: open.outside
		};
		return before + between + after;
	}
	function emphasisPeek(_, _1, state) {
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
		function overload(node, parents) {
			const parent = parents[parents.length - 1];
			const index = parent ? parent.children.indexOf(node) : void 0;
			return visitor(node, index, parent);
		}
	}
	function formatHeadingAsSetext(node, state) {
		let literalWithBreak = false;
		visit(node, function(node) {
			if ("value" in node && /\r?\n|\r/.test(node.value) || node.type === "break") {
				literalWithBreak = true;
				return false;
			}
		});
		return Boolean((!node.depth || node.depth < 3) && toString$1(node) && (state.options.setext || literalWithBreak));
	}
	function heading$1(node, _, state, info) {
		const rank = Math.max(Math.min(6, node.depth || 1), 1);
		const tracker = state.createTracker(info);
		if (formatHeadingAsSetext(node, state)) {
			const exit = state.enter("headingSetext");
			const subexit = state.enter("phrasing");
			const value = state.containerPhrasing(node, {
				...tracker.current(),
				before: "\n",
				after: "\n"
			});
			subexit();
			exit();
			return value + "\n" + (rank === 1 ? "=" : "-").repeat(value.length - (Math.max(value.lastIndexOf("\r"), value.lastIndexOf("\n")) + 1));
		}
		const sequence = "#".repeat(rank);
		const exit = state.enter("headingAtx");
		const subexit = state.enter("phrasing");
		tracker.move(sequence + " ");
		let value = state.containerPhrasing(node, {
			before: "# ",
			after: "\n",
			...tracker.current()
		});
		if (/^[\t ]/.test(value)) value = encodeCharacterReference(value.charCodeAt(0)) + value.slice(1);
		value = value ? sequence + " " + value : sequence;
		if (state.options.closeAtx) value += " " + sequence;
		subexit();
		exit();
		return value;
	}
	html$1.peek = htmlPeek;
	function html$1(node) {
		return node.value || "";
	}
	function htmlPeek() {
		return "<";
	}
	image$1.peek = imagePeek;
	function image$1(node, _, state, info) {
		const quote = checkQuote(state);
		const suffix = quote === "\"" ? "Quote" : "Apostrophe";
		const exit = state.enter("image");
		let subexit = state.enter("label");
		const tracker = state.createTracker(info);
		let value = tracker.move("![");
		value += tracker.move(state.safe(node.alt, {
			before: value,
			after: "]",
			...tracker.current()
		}));
		value += tracker.move("](");
		subexit();
		if (!node.url && node.title || /[\0- \u007F]/.test(node.url)) {
			subexit = state.enter("destinationLiteral");
			value += tracker.move("<");
			value += tracker.move(state.safe(node.url, {
				before: value,
				after: ">",
				...tracker.current()
			}));
			value += tracker.move(">");
		} else {
			subexit = state.enter("destinationRaw");
			value += tracker.move(state.safe(node.url, {
				before: value,
				after: node.title ? " " : ")",
				...tracker.current()
			}));
		}
		subexit();
		if (node.title) {
			subexit = state.enter(`title${suffix}`);
			value += tracker.move(" " + quote);
			value += tracker.move(state.safe(node.title, {
				before: value,
				after: quote,
				...tracker.current()
			}));
			value += tracker.move(quote);
			subexit();
		}
		value += tracker.move(")");
		exit();
		return value;
	}
	function imagePeek() {
		return "!";
	}
	imageReference$1.peek = imageReferencePeek;
	function imageReference$1(node, _, state, info) {
		const type = node.referenceType;
		const exit = state.enter("imageReference");
		let subexit = state.enter("label");
		const tracker = state.createTracker(info);
		let value = tracker.move("![");
		const alt = state.safe(node.alt, {
			before: value,
			after: "]",
			...tracker.current()
		});
		value += tracker.move(alt + "][");
		subexit();
		const stack = state.stack;
		state.stack = [];
		subexit = state.enter("reference");
		const reference = state.safe(state.associationId(node), {
			before: value,
			after: "]",
			...tracker.current()
		});
		subexit();
		state.stack = stack;
		exit();
		if (type === "full" || !alt || alt !== reference) value += tracker.move(reference + "]");
		else if (type === "shortcut") value = value.slice(0, -1);
		else value += tracker.move("]");
		return value;
	}
	function imageReferencePeek() {
		return "!";
	}
	inlineCode$1.peek = inlineCodePeek;
	function inlineCode$1(node, _, state) {
		let value = node.value || "";
		let sequence = "`";
		let index = -1;
		while (new RegExp("(^|[^`])" + sequence + "([^`]|$)").test(value)) sequence += "`";
		if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^`|`$/.test(value))) value = " " + value + " ";
		while (++index < state.unsafe.length) {
			const pattern = state.unsafe[index];
			const expression = state.compilePattern(pattern);
			let match;
			if (!pattern.atBreak) continue;
			while (match = expression.exec(value)) {
				let position = match.index;
				if (value.charCodeAt(position) === 10 && value.charCodeAt(position - 1) === 13) position--;
				value = value.slice(0, position) + " " + value.slice(match.index + 1);
			}
		}
		return sequence + value + sequence;
	}
	function inlineCodePeek() {
		return "`";
	}
	function formatLinkAsAutolink(node, state) {
		const raw = toString$1(node);
		return Boolean(!state.options.resourceLink && node.url && !node.title && node.children && node.children.length === 1 && node.children[0].type === "text" && (raw === node.url || "mailto:" + raw === node.url) && /^[a-z][a-z+.-]+:/i.test(node.url) && !/[\0- <>\u007F]/.test(node.url));
	}
	link$1.peek = linkPeek;
	function link$1(node, _, state, info) {
		const quote = checkQuote(state);
		const suffix = quote === "\"" ? "Quote" : "Apostrophe";
		const tracker = state.createTracker(info);
		let exit;
		let subexit;
		if (formatLinkAsAutolink(node, state)) {
			const stack = state.stack;
			state.stack = [];
			exit = state.enter("autolink");
			let value = tracker.move("<");
			value += tracker.move(state.containerPhrasing(node, {
				before: value,
				after: ">",
				...tracker.current()
			}));
			value += tracker.move(">");
			exit();
			state.stack = stack;
			return value;
		}
		exit = state.enter("link");
		subexit = state.enter("label");
		let value = tracker.move("[");
		value += tracker.move(state.containerPhrasing(node, {
			before: value,
			after: "](",
			...tracker.current()
		}));
		value += tracker.move("](");
		subexit();
		if (!node.url && node.title || /[\0- \u007F]/.test(node.url)) {
			subexit = state.enter("destinationLiteral");
			value += tracker.move("<");
			value += tracker.move(state.safe(node.url, {
				before: value,
				after: ">",
				...tracker.current()
			}));
			value += tracker.move(">");
		} else {
			subexit = state.enter("destinationRaw");
			value += tracker.move(state.safe(node.url, {
				before: value,
				after: node.title ? " " : ")",
				...tracker.current()
			}));
		}
		subexit();
		if (node.title) {
			subexit = state.enter(`title${suffix}`);
			value += tracker.move(" " + quote);
			value += tracker.move(state.safe(node.title, {
				before: value,
				after: quote,
				...tracker.current()
			}));
			value += tracker.move(quote);
			subexit();
		}
		value += tracker.move(")");
		exit();
		return value;
	}
	function linkPeek(node, _, state) {
		return formatLinkAsAutolink(node, state) ? "<" : "[";
	}
	linkReference$1.peek = linkReferencePeek;
	function linkReference$1(node, _, state, info) {
		const type = node.referenceType;
		const exit = state.enter("linkReference");
		let subexit = state.enter("label");
		const tracker = state.createTracker(info);
		let value = tracker.move("[");
		const text = state.containerPhrasing(node, {
			before: value,
			after: "]",
			...tracker.current()
		});
		value += tracker.move(text + "][");
		subexit();
		const stack = state.stack;
		state.stack = [];
		subexit = state.enter("reference");
		const reference = state.safe(state.associationId(node), {
			before: value,
			after: "]",
			...tracker.current()
		});
		subexit();
		state.stack = stack;
		exit();
		if (type === "full" || !text || text !== reference) value += tracker.move(reference + "]");
		else if (type === "shortcut") value = value.slice(0, -1);
		else value += tracker.move("]");
		return value;
	}
	function linkReferencePeek() {
		return "[";
	}
	function checkBullet(state) {
		const marker = state.options.bullet || "*";
		if (marker !== "*" && marker !== "+" && marker !== "-") throw new Error("Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`");
		return marker;
	}
	function checkBulletOther(state) {
		const bullet = checkBullet(state);
		const bulletOther = state.options.bulletOther;
		if (!bulletOther) return bullet === "*" ? "-" : "*";
		if (bulletOther !== "*" && bulletOther !== "+" && bulletOther !== "-") throw new Error("Cannot serialize items with `" + bulletOther + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
		if (bulletOther === bullet) throw new Error("Expected `bullet` (`" + bullet + "`) and `bulletOther` (`" + bulletOther + "`) to be different");
		return bulletOther;
	}
	function checkBulletOrdered(state) {
		const marker = state.options.bulletOrdered || ".";
		if (marker !== "." && marker !== ")") throw new Error("Cannot serialize items with `" + marker + "` for `options.bulletOrdered`, expected `.` or `)`");
		return marker;
	}
	function checkRule(state) {
		const marker = state.options.rule || "*";
		if (marker !== "*" && marker !== "-" && marker !== "_") throw new Error("Cannot serialize rules with `" + marker + "` for `options.rule`, expected `*`, `-`, or `_`");
		return marker;
	}
	function list$1(node, parent, state, info) {
		const exit = state.enter("list");
		const bulletCurrent = state.bulletCurrent;
		let bullet = node.ordered ? checkBulletOrdered(state) : checkBullet(state);
		const bulletOther = node.ordered ? bullet === "." ? ")" : "." : checkBulletOther(state);
		let useDifferentMarker = parent && state.bulletLastUsed ? bullet === state.bulletLastUsed : false;
		if (!node.ordered) {
			const firstListItem = node.children ? node.children[0] : void 0;
			if ((bullet === "*" || bullet === "-") && firstListItem && (!firstListItem.children || !firstListItem.children[0]) && state.stack[state.stack.length - 1] === "list" && state.stack[state.stack.length - 2] === "listItem" && state.stack[state.stack.length - 3] === "list" && state.stack[state.stack.length - 4] === "listItem" && state.indexStack[state.indexStack.length - 1] === 0 && state.indexStack[state.indexStack.length - 2] === 0 && state.indexStack[state.indexStack.length - 3] === 0) useDifferentMarker = true;
			if (checkRule(state) === bullet && firstListItem) {
				let index = -1;
				while (++index < node.children.length) {
					const item = node.children[index];
					if (item && item.type === "listItem" && item.children && item.children[0] && item.children[0].type === "thematicBreak") {
						useDifferentMarker = true;
						break;
					}
				}
			}
		}
		if (useDifferentMarker) bullet = bulletOther;
		state.bulletCurrent = bullet;
		const value = state.containerFlow(node, info);
		state.bulletLastUsed = bullet;
		state.bulletCurrent = bulletCurrent;
		exit();
		return value;
	}
	function checkListItemIndent(state) {
		const style = state.options.listItemIndent || "one";
		if (style !== "tab" && style !== "one" && style !== "mixed") throw new Error("Cannot serialize items with `" + style + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
		return style;
	}
	function listItem$1(node, parent, state, info) {
		const listItemIndent = checkListItemIndent(state);
		let bullet = state.bulletCurrent || checkBullet(state);
		if (parent && parent.type === "list" && parent.ordered) bullet = (typeof parent.start === "number" && parent.start > -1 ? parent.start : 1) + (state.options.incrementListMarker === false ? 0 : parent.children.indexOf(node)) + bullet;
		let size = bullet.length + 1;
		if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.type === "list" && parent.spread || node.spread)) size = Math.ceil(size / 4) * 4;
		const tracker = state.createTracker(info);
		tracker.move(bullet + " ".repeat(size - bullet.length));
		tracker.shift(size);
		const exit = state.enter("listItem");
		const value = state.indentLines(state.containerFlow(node, tracker.current()), map);
		exit();
		return value;
		function map(line, index, blank) {
			if (index) return (blank ? "" : " ".repeat(size)) + line;
			return (blank ? bullet : bullet + " ".repeat(size - bullet.length)) + line;
		}
	}
	function paragraph$1(node, _, state, info) {
		const exit = state.enter("paragraph");
		const subexit = state.enter("phrasing");
		const value = state.containerPhrasing(node, info);
		subexit();
		exit();
		return value;
	}
	var phrasing = convert([
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
	]);
	function root$1(node, _, state, info) {
		return (node.children.some(function(d) {
			return phrasing(d);
		}) ? state.containerPhrasing : state.containerFlow).call(state, node, info);
	}
	function checkStrong(state) {
		const marker = state.options.strong || "*";
		if (marker !== "*" && marker !== "_") throw new Error("Cannot serialize strong with `" + marker + "` for `options.strong`, expected `*`, or `_`");
		return marker;
	}
	strong$1.peek = strongPeek;
	function strong$1(node, _, state, info) {
		const marker = checkStrong(state);
		const exit = state.enter("strong");
		const tracker = state.createTracker(info);
		const before = tracker.move(marker + marker);
		let between = tracker.move(state.containerPhrasing(node, {
			after: marker,
			before,
			...tracker.current()
		}));
		const betweenHead = between.charCodeAt(0);
		const open = encodeInfo(info.before.charCodeAt(info.before.length - 1), betweenHead, marker);
		if (open.inside) between = encodeCharacterReference(betweenHead) + between.slice(1);
		const betweenTail = between.charCodeAt(between.length - 1);
		const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
		if (close.inside) between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
		const after = tracker.move(marker + marker);
		exit();
		state.attentionEncodeSurroundingInfo = {
			after: close.outside,
			before: open.outside
		};
		return before + between + after;
	}
	function strongPeek(_, _1, state) {
		return state.options.strong || "*";
	}
	function text$2(node, _, state, info) {
		return state.safe(node.value, info);
	}
	function checkRuleRepetition(state) {
		const repetition = state.options.ruleRepetition || 3;
		if (repetition < 3) throw new Error("Cannot serialize rules with repetition `" + repetition + "` for `options.ruleRepetition`, expected `3` or more");
		return repetition;
	}
	function thematicBreak$1(_, _1, state) {
		const value = (checkRule(state) + (state.options.ruleSpaces ? " " : "")).repeat(checkRuleRepetition(state));
		return state.options.ruleSpaces ? value.slice(0, -1) : value;
	}
	var handle = {
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
	var join = [joinDefaults];
	function joinDefaults(left, right, parent, state) {
		if (right.type === "code" && formatCodeAsIndented(right, state) && (left.type === "list" || left.type === right.type && formatCodeAsIndented(left, state))) return false;
		if ("spread" in parent && typeof parent.spread === "boolean") {
			if (left.type === "paragraph" && (left.type === right.type || right.type === "definition" || right.type === "heading" && formatHeadingAsSetext(right, state))) return;
			return parent.spread ? 1 : 0;
		}
	}
	var fullPhrasingSpans = [
		"autolink",
		"destinationLiteral",
		"destinationRaw",
		"reference",
		"titleQuote",
		"titleApostrophe"
	];
	var unsafe = [
		{
			character: "	",
			after: "[\\r\\n]",
			inConstruct: "phrasing"
		},
		{
			character: "	",
			before: "[\\r\\n]",
			inConstruct: "phrasing"
		},
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
		{
			character: " ",
			after: "[\\r\\n]",
			inConstruct: "phrasing"
		},
		{
			character: " ",
			before: "[\\r\\n]",
			inConstruct: "phrasing"
		},
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
		{
			character: "\"",
			inConstruct: "titleQuote"
		},
		{
			atBreak: true,
			character: "#"
		},
		{
			character: "#",
			inConstruct: "headingAtx",
			after: "(?:[\r\n]|$)"
		},
		{
			character: "&",
			after: "[#A-Za-z]",
			inConstruct: "phrasing"
		},
		{
			character: "'",
			inConstruct: "titleApostrophe"
		},
		{
			character: "(",
			inConstruct: "destinationRaw"
		},
		{
			before: "\\]",
			character: "(",
			inConstruct: "phrasing",
			notInConstruct: fullPhrasingSpans
		},
		{
			atBreak: true,
			before: "\\d+",
			character: ")"
		},
		{
			character: ")",
			inConstruct: "destinationRaw"
		},
		{
			atBreak: true,
			character: "*",
			after: "(?:[ 	\r\n*])"
		},
		{
			character: "*",
			inConstruct: "phrasing",
			notInConstruct: fullPhrasingSpans
		},
		{
			atBreak: true,
			character: "+",
			after: "(?:[ 	\r\n])"
		},
		{
			atBreak: true,
			character: "-",
			after: "(?:[ 	\r\n-])"
		},
		{
			atBreak: true,
			before: "\\d+",
			character: ".",
			after: "(?:[ 	\r\n]|$)"
		},
		{
			atBreak: true,
			character: "<",
			after: "[!/?A-Za-z]"
		},
		{
			character: "<",
			after: "[!/?A-Za-z]",
			inConstruct: "phrasing",
			notInConstruct: fullPhrasingSpans
		},
		{
			character: "<",
			inConstruct: "destinationLiteral"
		},
		{
			atBreak: true,
			character: "="
		},
		{
			atBreak: true,
			character: ">"
		},
		{
			character: ">",
			inConstruct: "destinationLiteral"
		},
		{
			atBreak: true,
			character: "["
		},
		{
			character: "[",
			inConstruct: "phrasing",
			notInConstruct: fullPhrasingSpans
		},
		{
			character: "[",
			inConstruct: ["label", "reference"]
		},
		{
			character: "\\",
			after: "[\\r\\n]",
			inConstruct: "phrasing"
		},
		{
			character: "]",
			inConstruct: ["label", "reference"]
		},
		{
			atBreak: true,
			character: "_"
		},
		{
			character: "_",
			inConstruct: "phrasing",
			notInConstruct: fullPhrasingSpans
		},
		{
			atBreak: true,
			character: "`"
		},
		{
			character: "`",
			inConstruct: ["codeFencedLangGraveAccent", "codeFencedMetaGraveAccent"]
		},
		{
			character: "`",
			inConstruct: "phrasing",
			notInConstruct: fullPhrasingSpans
		},
		{
			atBreak: true,
			character: "~"
		}
	];
	function association(node) {
		if (node.label || !node.identifier) return node.label || "";
		return decodeString(node.identifier);
	}
	function compilePattern(pattern) {
		if (!pattern._compiled) {
			const before = (pattern.atBreak ? "[\\r\\n][\\t ]*" : "") + (pattern.before ? "(?:" + pattern.before + ")" : "");
			pattern._compiled = new RegExp((before ? "(" + before + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? "\\" : "") + pattern.character + (pattern.after ? "(?:" + pattern.after + ")" : ""), "g");
		}
		return pattern._compiled;
	}
	function containerPhrasing(parent, state, info) {
		const indexStack = state.indexStack;
		const children = parent.children || [];
		const results = [];
		let index = -1;
		let before = info.before;
		let encodeAfter;
		indexStack.push(-1);
		let tracker = state.createTracker(info);
		while (++index < children.length) {
			const child = children[index];
			let after;
			indexStack[indexStack.length - 1] = index;
			if (index + 1 < children.length) {
				let handle = state.handle.handlers[children[index + 1].type];
				if (handle && handle.peek) handle = handle.peek;
				after = handle ? handle(children[index + 1], parent, state, {
					before: "",
					after: "",
					...tracker.current()
				}).charAt(0) : "";
			} else after = info.after;
			if (results.length > 0 && (before === "\r" || before === "\n") && child.type === "html") {
				results[results.length - 1] = results[results.length - 1].replace(/(\r?\n|\r)$/, " ");
				before = " ";
				tracker = state.createTracker(info);
				tracker.move(results.join(""));
			}
			let value = state.handle(child, parent, state, {
				...tracker.current(),
				after,
				before
			});
			if (encodeAfter && encodeAfter === value.slice(0, 1)) value = encodeCharacterReference(encodeAfter.charCodeAt(0)) + value.slice(1);
			const encodingInfo = state.attentionEncodeSurroundingInfo;
			state.attentionEncodeSurroundingInfo = void 0;
			encodeAfter = void 0;
			if (encodingInfo) {
				if (results.length > 0 && encodingInfo.before && before === results[results.length - 1].slice(-1)) results[results.length - 1] = results[results.length - 1].slice(0, -1) + encodeCharacterReference(before.charCodeAt(0));
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
		let index = -1;
		indexStack.push(-1);
		while (++index < children.length) {
			const child = children[index];
			indexStack[indexStack.length - 1] = index;
			results.push(tracker.move(state.handle(child, parent, state, {
				before: "\n",
				after: "\n",
				...tracker.current()
			})));
			if (child.type !== "list") state.bulletLastUsed = void 0;
			if (index < children.length - 1) results.push(tracker.move(between(child, children[index + 1], parent, state)));
		}
		indexStack.pop();
		return results.join("");
	}
	function between(left, right, parent, state) {
		let index = state.join.length;
		while (index--) {
			const result = state.join[index](left, right, parent, state);
			if (result === true || result === 1) break;
			if (typeof result === "number") return "\n".repeat(1 + result);
			if (result === false) return "\n\n<!---->\n\n";
		}
		return "\n\n";
	}
	var eol = /\r?\n|\r/g;
	function indentLines(value, map) {
		const result = [];
		let start = 0;
		let line = 0;
		let match;
		while (match = eol.exec(value)) {
			one(value.slice(start, match.index));
			result.push(match[0]);
			start = match.index + match[0].length;
			line++;
		}
		one(value.slice(start));
		return result.join("");
		function one(value) {
			result.push(map(value, line, !value));
		}
	}
	function safe(state, input, config) {
		const value = (config.before || "") + (input || "") + (config.after || "");
		const positions = [];
		const result = [];
		const infos = {};
		let index = -1;
		while (++index < state.unsafe.length) {
			const pattern = state.unsafe[index];
			if (!patternInScope(state.stack, pattern)) continue;
			const expression = state.compilePattern(pattern);
			let match;
			while (match = expression.exec(value)) {
				const before = "before" in pattern || Boolean(pattern.atBreak);
				const after = "after" in pattern;
				const position = match.index + (before ? match[1].length : 0);
				if (positions.includes(position)) {
					if (infos[position].before && !before) infos[position].before = false;
					if (infos[position].after && !after) infos[position].after = false;
				} else {
					positions.push(position);
					infos[position] = {
						before,
						after
					};
				}
			}
		}
		positions.sort(numerical);
		let start = config.before ? config.before.length : 0;
		const end = value.length - (config.after ? config.after.length : 0);
		index = -1;
		while (++index < positions.length) {
			const position = positions[index];
			if (position < start || position >= end) continue;
			if (position + 1 < end && positions[index + 1] === position + 1 && infos[position].after && !infos[position + 1].before && !infos[position + 1].after || positions[index - 1] === position - 1 && infos[position].before && !infos[position - 1].before && !infos[position - 1].after) continue;
			if (start !== position) result.push(escapeBackslashes(value.slice(start, position), "\\"));
			start = position;
			if (/[!-/:-@[-`{-~]/.test(value.charAt(position)) && (!config.encode || !config.encode.includes(value.charAt(position)))) result.push("\\");
			else {
				result.push(encodeCharacterReference(value.charCodeAt(position)));
				start++;
			}
		}
		result.push(escapeBackslashes(value.slice(start, end), config.after));
		return result.join("");
	}
	function numerical(a, b) {
		return a - b;
	}
	function escapeBackslashes(value, after) {
		const expression = /\\(?=[!-/:-@[-`{-~])/g;
		const positions = [];
		const results = [];
		const whole = value + after;
		let index = -1;
		let start = 0;
		let match;
		while (match = expression.exec(whole)) positions.push(match.index);
		while (++index < positions.length) {
			if (start !== positions[index]) results.push(value.slice(start, positions[index]));
			results.push("\\");
			start = positions[index];
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
		return {
			move,
			current,
			shift
		};
		function current() {
			return {
				now: {
					line,
					column
				},
				lineShift
			};
		}
		function shift(value) {
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
		if (state.options.tightDefinitions) state.join.push(joinDefinition);
		state.handle = zwitch("type", {
			invalid,
			unknown,
			handlers: state.handlers
		});
		let result = state.handle(tree, void 0, state, {
			before: "\n",
			after: "\n",
			now: {
				line: 1,
				column: 1
			},
			lineShift: 0
		});
		if (result && result.charCodeAt(result.length - 1) !== 10 && result.charCodeAt(result.length - 1) !== 13) result += "\n";
		return result;
		function enter(name) {
			state.stack.push(name);
			return exit;
			function exit() {
				state.stack.pop();
			}
		}
	}
	function invalid(value) {
		throw new Error("Cannot handle value `" + value + "`, expected node");
	}
	function unknown(value) {
		throw new Error("Cannot handle unknown node `" + value.type + "`");
	}
	function joinDefinition(left, right) {
		if (left.type === "definition" && left.type === right.type) return 0;
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
		this.enter({
			type: "table",
			align: align.map(function(d) {
				return d === "none" ? null : d;
			}),
			children: []
		}, token);
		this.data.inTable = true;
	}
	function exitTable(token) {
		this.exit(token);
		this.data.inTable = void 0;
	}
	function enterRow(token) {
		this.enter({
			type: "tableRow",
			children: []
		}, token);
	}
	function exit(token) {
		this.exit(token);
	}
	function enterCell(token) {
		this.enter({
			type: "tableCell",
			children: []
		}, token);
	}
	function exitCodeText(token) {
		let value = this.resume();
		if (this.data.inTable) value = value.replace(/\\([\\|])/g, replace);
		const node = this.stack[this.stack.length - 1];
		node.type;
		node.value = value;
		this.exit(token);
	}
	function replace($0, $1) {
		return $1 === "|" ? $1 : $0;
	}
	function gfmTableToMarkdown(options) {
		const settings = options || {};
		const padding = settings.tableCellPadding;
		const alignDelimiters = settings.tablePipeAlign;
		const stringLength = settings.stringLength;
		const around = padding ? " " : "|";
		return {
			unsafe: [
				{
					character: "\r",
					inConstruct: "tableCell"
				},
				{
					character: "\n",
					inConstruct: "tableCell"
				},
				{
					atBreak: true,
					character: "|",
					after: "[	 :-]"
				},
				{
					character: "|",
					inConstruct: "tableCell"
				},
				{
					atBreak: true,
					character: ":",
					after: "-"
				},
				{
					atBreak: true,
					character: "-",
					after: "[:|-]"
				}
			],
			handlers: {
				inlineCode: inlineCodeWithTable,
				table: handleTable,
				tableCell: handleTableCell,
				tableRow: handleTableRow
			}
		};
		function handleTable(node, _, state, info) {
			return serializeData(handleTableAsData(node, state, info), node.align);
		}
		function handleTableRow(node, _, state, info) {
			const value = serializeData([handleTableRowAsData(node, state, info)]);
			return value.slice(0, value.indexOf("\n"));
		}
		function handleTableCell(node, _, state, info) {
			const exit = state.enter("tableCell");
			const subexit = state.enter("phrasing");
			const value = state.containerPhrasing(node, {
				...info,
				before: around,
				after: around
			});
			subexit();
			exit();
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
		function handleTableAsData(node, state, info) {
			const children = node.children;
			let index = -1;
			const result = [];
			const subexit = state.enter("table");
			while (++index < children.length) result[index] = handleTableRowAsData(children[index], state, info);
			subexit();
			return result;
		}
		function handleTableRowAsData(node, state, info) {
			const children = node.children;
			let index = -1;
			const result = [];
			const subexit = state.enter("tableRow");
			while (++index < children.length) result[index] = handleTableCell(children[index], node, state, info);
			subexit();
			return result;
		}
		function inlineCodeWithTable(node, parent, state) {
			let value = handle.inlineCode(node, parent, state);
			if (state.stack.includes("tableCell")) value = value.replace(/\|/g, "\\$&");
			return value;
		}
	}
	function gfmTaskListItemFromMarkdown() {
		return { exit: {
			taskListCheckValueChecked: exitCheck,
			taskListCheckValueUnchecked: exitCheck,
			paragraph: exitParagraphWithTaskListItem
		} };
	}
	function gfmTaskListItemToMarkdown() {
		return {
			unsafe: [{
				atBreak: true,
				character: "-",
				after: "[:|-]"
			}],
			handlers: { listItem: listItemWithTaskListItem }
		};
	}
	function exitCheck(token) {
		const node = this.stack[this.stack.length - 2];
		node.type;
		node.checked = token.type === "taskListCheckValueChecked";
	}
	function exitParagraphWithTaskListItem(token) {
		const parent = this.stack[this.stack.length - 2];
		if (parent && parent.type === "listItem" && typeof parent.checked === "boolean") {
			const node = this.stack[this.stack.length - 1];
			node.type;
			const head = node.children[0];
			if (head && head.type === "text") {
				const siblings = parent.children;
				let index = -1;
				let firstParaghraph;
				while (++index < siblings.length) {
					const sibling = siblings[index];
					if (sibling.type === "paragraph") {
						firstParaghraph = sibling;
						break;
					}
				}
				if (firstParaghraph === node) {
					head.value = head.value.slice(1);
					if (head.value.length === 0) node.children.shift();
					else if (node.position && head.position && typeof head.position.start.offset === "number") {
						head.position.start.column++;
						head.position.start.offset++;
						node.position.start = Object.assign({}, head.position.start);
					}
				}
			}
		}
		this.exit(token);
	}
	function listItemWithTaskListItem(node, parent, state, info) {
		const head = node.children[0];
		const checkable = typeof node.checked === "boolean" && head && head.type === "paragraph";
		const checkbox = "[" + (node.checked ? "x" : " ") + "] ";
		const tracker = state.createTracker(info);
		if (checkable) tracker.move(checkbox);
		let value = handle.listItem(node, parent, state, {
			...info,
			...tracker.current()
		});
		if (checkable) value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
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
		return { extensions: [
			gfmAutolinkLiteralToMarkdown(),
			gfmFootnoteToMarkdown(options),
			gfmStrikethroughToMarkdown(),
			gfmTableToMarkdown(options),
			gfmTaskListItemToMarkdown()
		] };
	}
	function blockquote(state, node) {
		const result = {
			type: "element",
			tagName: "blockquote",
			properties: {},
			children: state.wrap(state.all(node), true)
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function hardBreak(state, node) {
		const result = {
			type: "element",
			tagName: "br",
			properties: {},
			children: []
		};
		state.patch(node, result);
		return [state.applyData(node, result), {
			type: "text",
			value: "\n"
		}];
	}
	function code$1(state, node) {
		const value = node.value ? node.value + "\n" : "";
		const properties = {};
		const language = node.lang ? node.lang.split(/\s+/) : [];
		if (language.length > 0) properties.className = ["language-" + language[0]];
		let result = {
			type: "element",
			tagName: "code",
			properties,
			children: [{
				type: "text",
				value
			}]
		};
		if (node.meta) result.data = { meta: node.meta };
		state.patch(node, result);
		result = state.applyData(node, result);
		result = {
			type: "element",
			tagName: "pre",
			properties: {},
			children: [result]
		};
		state.patch(node, result);
		return result;
	}
	function strikethrough(state, node) {
		const result = {
			type: "element",
			tagName: "del",
			properties: {},
			children: state.all(node)
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function emphasis(state, node) {
		const result = {
			type: "element",
			tagName: "em",
			properties: {},
			children: state.all(node)
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function footnoteReference(state, node) {
		const clobberPrefix = typeof state.options.clobberPrefix === "string" ? state.options.clobberPrefix : "user-content-";
		const id = String(node.identifier).toUpperCase();
		const safeId = normalizeUri(id.toLowerCase());
		const index = state.footnoteOrder.indexOf(id);
		let counter;
		let reuseCounter = state.footnoteCounts.get(id);
		if (reuseCounter === void 0) {
			reuseCounter = 0;
			state.footnoteOrder.push(id);
			counter = state.footnoteOrder.length;
		} else counter = index + 1;
		reuseCounter += 1;
		state.footnoteCounts.set(id, reuseCounter);
		const link = {
			type: "element",
			tagName: "a",
			properties: {
				href: "#" + clobberPrefix + "fn-" + safeId,
				id: clobberPrefix + "fnref-" + safeId + (reuseCounter > 1 ? "-" + reuseCounter : ""),
				dataFootnoteRef: true,
				ariaDescribedBy: ["footnote-label"]
			},
			children: [{
				type: "text",
				value: String(counter)
			}]
		};
		state.patch(node, link);
		const sup = {
			type: "element",
			tagName: "sup",
			properties: {},
			children: [link]
		};
		state.patch(node, sup);
		return state.applyData(node, sup);
	}
	function heading(state, node) {
		const result = {
			type: "element",
			tagName: "h" + node.depth,
			properties: {},
			children: state.all(node)
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function html(state, node) {
		if (state.options.allowDangerousHtml) {
			const result = {
				type: "raw",
				value: node.value
			};
			state.patch(node, result);
			return state.applyData(node, result);
		}
	}
	function revert(state, node) {
		const subtype = node.referenceType;
		let suffix = "]";
		if (subtype === "collapsed") suffix += "[]";
		else if (subtype === "full") suffix += "[" + (node.label || node.identifier) + "]";
		if (node.type === "imageReference") return [{
			type: "text",
			value: "![" + node.alt + suffix
		}];
		const contents = state.all(node);
		const head = contents[0];
		if (head && head.type === "text") head.value = "[" + head.value;
		else contents.unshift({
			type: "text",
			value: "["
		});
		const tail = contents[contents.length - 1];
		if (tail && tail.type === "text") tail.value += suffix;
		else contents.push({
			type: "text",
			value: suffix
		});
		return contents;
	}
	function imageReference(state, node) {
		const id = String(node.identifier).toUpperCase();
		const definition = state.definitionById.get(id);
		if (!definition) return revert(state, node);
		const properties = {
			src: normalizeUri(definition.url || ""),
			alt: node.alt
		};
		if (definition.title !== null && definition.title !== void 0) properties.title = definition.title;
		const result = {
			type: "element",
			tagName: "img",
			properties,
			children: []
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function image(state, node) {
		const properties = { src: normalizeUri(node.url) };
		if (node.alt !== null && node.alt !== void 0) properties.alt = node.alt;
		if (node.title !== null && node.title !== void 0) properties.title = node.title;
		const result = {
			type: "element",
			tagName: "img",
			properties,
			children: []
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function inlineCode(state, node) {
		const text = {
			type: "text",
			value: node.value.replace(/\r?\n|\r/g, " ")
		};
		state.patch(node, text);
		const result = {
			type: "element",
			tagName: "code",
			properties: {},
			children: [text]
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function linkReference(state, node) {
		const id = String(node.identifier).toUpperCase();
		const definition = state.definitionById.get(id);
		if (!definition) return revert(state, node);
		const properties = { href: normalizeUri(definition.url || "") };
		if (definition.title !== null && definition.title !== void 0) properties.title = definition.title;
		const result = {
			type: "element",
			tagName: "a",
			properties,
			children: state.all(node)
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function link(state, node) {
		const properties = { href: normalizeUri(node.url) };
		if (node.title !== null && node.title !== void 0) properties.title = node.title;
		const result = {
			type: "element",
			tagName: "a",
			properties,
			children: state.all(node)
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function listItem(state, node, parent) {
		const results = state.all(node);
		const loose = parent ? listLoose(parent) : listItemLoose(node);
		const properties = {};
		const children = [];
		if (typeof node.checked === "boolean") {
			const head = results[0];
			let paragraph;
			if (head && head.type === "element" && head.tagName === "p") paragraph = head;
			else {
				paragraph = {
					type: "element",
					tagName: "p",
					properties: {},
					children: []
				};
				results.unshift(paragraph);
			}
			if (paragraph.children.length > 0) paragraph.children.unshift({
				type: "text",
				value: " "
			});
			paragraph.children.unshift({
				type: "element",
				tagName: "input",
				properties: {
					type: "checkbox",
					checked: node.checked,
					disabled: true
				},
				children: []
			});
			properties.className = ["task-list-item"];
		}
		let index = -1;
		while (++index < results.length) {
			const child = results[index];
			if (loose || index !== 0 || child.type !== "element" || child.tagName !== "p") children.push({
				type: "text",
				value: "\n"
			});
			if (child.type === "element" && child.tagName === "p" && !loose) children.push(...child.children);
			else children.push(child);
		}
		const tail = results[results.length - 1];
		if (tail && (loose || tail.type !== "element" || tail.tagName !== "p")) children.push({
			type: "text",
			value: "\n"
		});
		const result = {
			type: "element",
			tagName: "li",
			properties,
			children
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function listLoose(node) {
		let loose = false;
		if (node.type === "list") {
			loose = node.spread || false;
			const children = node.children;
			let index = -1;
			while (!loose && ++index < children.length) loose = listItemLoose(children[index]);
		}
		return loose;
	}
	function listItemLoose(node) {
		const spread = node.spread;
		return spread === null || spread === void 0 ? node.children.length > 1 : spread;
	}
	function list(state, node) {
		const properties = {};
		const results = state.all(node);
		let index = -1;
		if (typeof node.start === "number" && node.start !== 1) properties.start = node.start;
		while (++index < results.length) {
			const child = results[index];
			if (child.type === "element" && child.tagName === "li" && child.properties && Array.isArray(child.properties.className) && child.properties.className.includes("task-list-item")) {
				properties.className = ["contains-task-list"];
				break;
			}
		}
		const result = {
			type: "element",
			tagName: node.ordered ? "ol" : "ul",
			properties,
			children: state.wrap(results, true)
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function paragraph(state, node) {
		const result = {
			type: "element",
			tagName: "p",
			properties: {},
			children: state.all(node)
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function root(state, node) {
		const result = {
			type: "root",
			children: state.wrap(state.all(node))
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function strong(state, node) {
		const result = {
			type: "element",
			tagName: "strong",
			properties: {},
			children: state.all(node)
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	var pointEnd = point("end");
	var pointStart = point("start");
	function point(type) {
		return point;
		function point(node) {
			const point = node && node.position && node.position[type] || {};
			if (typeof point.line === "number" && point.line > 0 && typeof point.column === "number" && point.column > 0) return {
				line: point.line,
				column: point.column,
				offset: typeof point.offset === "number" && point.offset > -1 ? point.offset : void 0
			};
		}
	}
	function position(node) {
		const start = pointStart(node);
		const end = pointEnd(node);
		if (start && end) return {
			start,
			end
		};
	}
	function table(state, node) {
		const rows = state.all(node);
		const firstRow = rows.shift();
		const tableContent = [];
		if (firstRow) {
			const head = {
				type: "element",
				tagName: "thead",
				properties: {},
				children: state.wrap([firstRow], true)
			};
			state.patch(node.children[0], head);
			tableContent.push(head);
		}
		if (rows.length > 0) {
			const body = {
				type: "element",
				tagName: "tbody",
				properties: {},
				children: state.wrap(rows, true)
			};
			const start = pointStart(node.children[1]);
			const end = pointEnd(node.children[node.children.length - 1]);
			if (start && end) body.position = {
				start,
				end
			};
			tableContent.push(body);
		}
		const result = {
			type: "element",
			tagName: "table",
			properties: {},
			children: state.wrap(tableContent, true)
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function tableRow(state, node, parent) {
		const siblings = parent ? parent.children : void 0;
		const tagName = (siblings ? siblings.indexOf(node) : 1) === 0 ? "th" : "td";
		const align = parent && parent.type === "table" ? parent.align : void 0;
		const length = align ? align.length : node.children.length;
		let cellIndex = -1;
		const cells = [];
		while (++cellIndex < length) {
			const cell = node.children[cellIndex];
			const properties = {};
			const alignValue = align ? align[cellIndex] : void 0;
			if (alignValue) properties.align = alignValue;
			let result = {
				type: "element",
				tagName,
				properties,
				children: []
			};
			if (cell) {
				result.children = state.all(cell);
				state.patch(cell, result);
				result = state.applyData(cell, result);
			}
			cells.push(result);
		}
		const result = {
			type: "element",
			tagName: "tr",
			properties: {},
			children: state.wrap(cells, true)
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function tableCell(state, node) {
		const result = {
			type: "element",
			tagName: "td",
			properties: {},
			children: state.all(node)
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	var tab = 9;
	var space = 32;
	function trimLines(value) {
		const source = String(value);
		const search = /\r?\n|\r/g;
		let match = search.exec(source);
		let last = 0;
		const lines = [];
		while (match) {
			lines.push(trimLine(source.slice(last, match.index), last > 0, true), match[0]);
			last = match.index + match[0].length;
			match = search.exec(source);
		}
		lines.push(trimLine(source.slice(last), last > 0, false));
		return lines.join("");
	}
	function trimLine(value, start, end) {
		let startIndex = 0;
		let endIndex = value.length;
		if (start) {
			let code = value.codePointAt(startIndex);
			while (code === tab || code === space) {
				startIndex++;
				code = value.codePointAt(startIndex);
			}
		}
		if (end) {
			let code = value.codePointAt(endIndex - 1);
			while (code === tab || code === space) {
				endIndex--;
				code = value.codePointAt(endIndex - 1);
			}
		}
		return endIndex > startIndex ? value.slice(startIndex, endIndex) : "";
	}
	function text$1(state, node) {
		const result = {
			type: "text",
			value: trimLines(String(node.value))
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function thematicBreak(state, node) {
		const result = {
			type: "element",
			tagName: "hr",
			properties: {},
			children: []
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	var handlers = {
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
	function ignore() {}
	var env = typeof self === "object" ? self : globalThis;
	var deserializer = ($, _) => {
		const as = (out, index) => {
			$.set(index, out);
			return out;
		};
		const unpair = (index) => {
			if ($.has(index)) return $.get(index);
			const [type, value] = _[index];
			switch (type) {
				case 0:
				case -1: return as(value, index);
				case 1: {
					const arr = as([], index);
					for (const index of value) arr.push(unpair(index));
					return arr;
				}
				case 2: {
					const object = as({}, index);
					for (const [key, index] of value) object[unpair(key)] = unpair(index);
					return object;
				}
				case 3: return as(new Date(value), index);
				case 4: {
					const { source, flags } = value;
					return as(new RegExp(source, flags), index);
				}
				case 5: {
					const map = as(new Map(), index);
					for (const [key, index] of value) map.set(unpair(key), unpair(index));
					return map;
				}
				case 6: {
					const set = as(new Set(), index);
					for (const index of value) set.add(unpair(index));
					return set;
				}
				case 7: {
					const { name, message } = value;
					return as(new env[name](message), index);
				}
				case 8: return as(BigInt(value), index);
				case "BigInt": return as(Object(BigInt(value)), index);
				case "ArrayBuffer": return as(new Uint8Array(value).buffer, value);
				case "DataView": {
					const { buffer } = new Uint8Array(value);
					return as(new DataView(buffer), value);
				}
			}
			return as(new env[type](value), index);
		};
		return unpair;
	};
	var deserialize = (serialized) => deserializer(new Map(), serialized)(0);
	var EMPTY = "";
	var { toString } = {};
	var { keys } = Object;
	var typeOf = (value) => {
		const type = typeof value;
		if (type !== "object" || !value) return [0, type];
		const asString = toString.call(value).slice(8, -1);
		switch (asString) {
			case "Array": return [1, EMPTY];
			case "Object": return [2, EMPTY];
			case "Date": return [3, EMPTY];
			case "RegExp": return [4, EMPTY];
			case "Map": return [5, EMPTY];
			case "Set": return [6, EMPTY];
			case "DataView": return [1, asString];
		}
		if (asString.includes("Array")) return [1, asString];
		if (asString.includes("Error")) return [7, asString];
		return [2, asString];
	};
	var shouldSkip = ([TYPE, type]) => TYPE === 0 && (type === "function" || type === "symbol");
	var serializer = (strict, json, $, _) => {
		const as = (out, value) => {
			const index = _.push(out) - 1;
			$.set(value, index);
			return index;
		};
		const pair = (value) => {
			if ($.has(value)) return $.get(value);
			let [TYPE, type] = typeOf(value);
			switch (TYPE) {
				case 0: {
					let entry = value;
					switch (type) {
						case "bigint":
							TYPE = 8;
							entry = value.toString();
							break;
						case "function":
						case "symbol":
							if (strict) throw new TypeError("unable to serialize " + type);
							entry = null;
							break;
						case "undefined": return as([-1], value);
					}
					return as([TYPE, entry], value);
				}
				case 1: {
					if (type) {
						let spread = value;
						if (type === "DataView") spread = new Uint8Array(value.buffer);
						else if (type === "ArrayBuffer") spread = new Uint8Array(value);
						return as([type, [...spread]], value);
					}
					const arr = [];
					const index = as([TYPE, arr], value);
					for (const entry of value) arr.push(pair(entry));
					return index;
				}
				case 2: {
					if (type) switch (type) {
						case "BigInt": return as([type, value.toString()], value);
						case "Boolean":
						case "Number":
						case "String": return as([type, value.valueOf()], value);
					}
					if (json && "toJSON" in value) return pair(value.toJSON());
					const entries = [];
					const index = as([TYPE, entries], value);
					for (const key of keys(value)) if (strict || !shouldSkip(typeOf(value[key]))) entries.push([pair(key), pair(value[key])]);
					return index;
				}
				case 3: return as([TYPE, value.toISOString()], value);
				case 4: {
					const { source, flags } = value;
					return as([TYPE, {
						source,
						flags
					}], value);
				}
				case 5: {
					const entries = [];
					const index = as([TYPE, entries], value);
					for (const [key, entry] of value) if (strict || !(shouldSkip(typeOf(key)) || shouldSkip(typeOf(entry)))) entries.push([pair(key), pair(entry)]);
					return index;
				}
				case 6: {
					const entries = [];
					const index = as([TYPE, entries], value);
					for (const entry of value) if (strict || !shouldSkip(typeOf(entry))) entries.push(pair(entry));
					return index;
				}
			}
			const { message } = value;
			return as([TYPE, {
				name: type,
				message
			}], value);
		};
		return pair;
	};
	var serialize = (value, { json, lossy } = {}) => {
		const _ = [];
		return serializer(!(json || lossy), !!json, new Map(), _)(value), _;
	};
	var esm_default = typeof structuredClone === "function" ? (any, options) => options && ("json" in options || "lossy" in options) ? deserialize(serialize(any, options)) : structuredClone(any) : (any, options) => deserialize(serialize(any, options));
	function defaultFootnoteBackContent(_, rereferenceIndex) {
		const result = [{
			type: "text",
			value: "↩"
		}];
		if (rereferenceIndex > 1) result.push({
			type: "element",
			tagName: "sup",
			properties: {},
			children: [{
				type: "text",
				value: String(rereferenceIndex)
			}]
		});
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
		const footnoteLabelProperties = state.options.footnoteLabelProperties || { className: ["sr-only"] };
		const listItems = [];
		let referenceIndex = -1;
		while (++referenceIndex < state.footnoteOrder.length) {
			const definition = state.footnoteById.get(state.footnoteOrder[referenceIndex]);
			if (!definition) continue;
			const content = state.all(definition);
			const id = String(definition.identifier).toUpperCase();
			const safeId = normalizeUri(id.toLowerCase());
			let rereferenceIndex = 0;
			const backReferences = [];
			const counts = state.footnoteCounts.get(id);
			while (counts !== void 0 && ++rereferenceIndex <= counts) {
				if (backReferences.length > 0) backReferences.push({
					type: "text",
					value: " "
				});
				let children = typeof footnoteBackContent === "string" ? footnoteBackContent : footnoteBackContent(referenceIndex, rereferenceIndex);
				if (typeof children === "string") children = {
					type: "text",
					value: children
				};
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
			const tail = content[content.length - 1];
			if (tail && tail.type === "element" && tail.tagName === "p") {
				const tailTail = tail.children[tail.children.length - 1];
				if (tailTail && tailTail.type === "text") tailTail.value += " ";
				else tail.children.push({
					type: "text",
					value: " "
				});
				tail.children.push(...backReferences);
			} else content.push(...backReferences);
			const listItem = {
				type: "element",
				tagName: "li",
				properties: { id: clobberPrefix + "fn-" + safeId },
				children: state.wrap(content, true)
			};
			state.patch(definition, listItem);
			listItems.push(listItem);
		}
		if (listItems.length === 0) return;
		return {
			type: "element",
			tagName: "section",
			properties: {
				dataFootnotes: true,
				className: ["footnotes"]
			},
			children: [
				{
					type: "element",
					tagName: footnoteLabelTagName,
					properties: {
						...esm_default(footnoteLabelProperties),
						id: "footnote-label"
					},
					children: [{
						type: "text",
						value: footnoteLabel
					}]
				},
				{
					type: "text",
					value: "\n"
				},
				{
					type: "element",
					tagName: "ol",
					properties: {},
					children: state.wrap(listItems, true)
				},
				{
					type: "text",
					value: "\n"
				}
			]
		};
	}
	var own = {}.hasOwnProperty;
	var emptyOptions = {};
	function createState(tree, options) {
		const settings = options || emptyOptions;
		const definitionById = new Map();
		const footnoteById = new Map();
		const state = {
			all,
			applyData,
			definitionById,
			footnoteById,
			footnoteCounts: new Map(),
			footnoteOrder: [],
			handlers: {
				...handlers,
				...settings.handlers
			},
			one,
			options: settings,
			patch,
			wrap
		};
		visit(tree, function(node) {
			if (node.type === "definition" || node.type === "footnoteDefinition") {
				const map = node.type === "definition" ? definitionById : footnoteById;
				const id = String(node.identifier).toUpperCase();
				if (!map.has(id)) map.set(id, node);
			}
		});
		return state;
		function one(node, parent) {
			const type = node.type;
			const handle = state.handlers[type];
			if (own.call(state.handlers, type) && handle) return handle(state, node, parent);
			if (state.options.passThrough && state.options.passThrough.includes(type)) {
				if ("children" in node) {
					const { children, ...shallow } = node;
					const result = esm_default(shallow);
					result.children = state.all(node);
					return result;
				}
				return esm_default(node);
			}
			return (state.options.unknownHandler || defaultUnknownHandler)(state, node, parent);
		}
		function all(parent) {
			const values = [];
			if ("children" in parent) {
				const nodes = parent.children;
				let index = -1;
				while (++index < nodes.length) {
					const result = state.one(nodes[index], parent);
					if (result) {
						if (index && nodes[index - 1].type === "break") {
							if (!Array.isArray(result) && result.type === "text") result.value = trimMarkdownSpaceStart(result.value);
							if (!Array.isArray(result) && result.type === "element") {
								const head = result.children[0];
								if (head && head.type === "text") head.value = trimMarkdownSpaceStart(head.value);
							}
						}
						if (Array.isArray(result)) values.push(...result);
						else values.push(result);
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
			if (typeof hName === "string") if (result.type === "element") result.tagName = hName;
			else result = {
				type: "element",
				tagName: hName,
				properties: {},
				children: "children" in result ? result.children : [result]
			};
			if (result.type === "element" && hProperties) Object.assign(result.properties, esm_default(hProperties));
			if ("children" in result && result.children && hChildren !== null && hChildren !== void 0) result.children = hChildren;
		}
		return result;
	}
	function defaultUnknownHandler(state, node) {
		const data = node.data || {};
		const result = "value" in node && !(own.call(data, "hProperties") || own.call(data, "hChildren")) ? {
			type: "text",
			value: node.value
		} : {
			type: "element",
			tagName: "div",
			properties: {},
			children: state.all(node)
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
	function wrap(nodes, loose) {
		const result = [];
		let index = -1;
		if (loose) result.push({
			type: "text",
			value: "\n"
		});
		while (++index < nodes.length) {
			if (index) result.push({
				type: "text",
				value: "\n"
			});
			result.push(nodes[index]);
		}
		if (loose && nodes.length > 0) result.push({
			type: "text",
			value: "\n"
		});
		return result;
	}
	function trimMarkdownSpaceStart(value) {
		let index = 0;
		let code = value.charCodeAt(index);
		while (code === 9 || code === 32) {
			index++;
			code = value.charCodeAt(index);
		}
		return value.slice(index);
	}
	function toHast(tree, options) {
		const state = createState(tree, options);
		const node = state.one(tree, void 0);
		const foot = footer(state);
		const result = Array.isArray(node) ? {
			type: "root",
			children: node
		} : node || {
			type: "root",
			children: []
		};
		if (foot) {
			"children" in result;
			result.children.push({
				type: "text",
				value: "\n"
			}, foot);
		}
		return result;
	}
	var wwwPrefix = {
		tokenize: tokenizeWwwPrefix,
		partial: true
	};
	var domain = {
		tokenize: tokenizeDomain,
		partial: true
	};
	var path = {
		tokenize: tokenizePath,
		partial: true
	};
	var trail = {
		tokenize: tokenizeTrail,
		partial: true
	};
	var emailDomainDotTrail = {
		tokenize: tokenizeEmailDomainDotTrail,
		partial: true
	};
	var wwwAutolink = {
		name: "wwwAutolink",
		tokenize: tokenizeWwwAutolink,
		previous: previousWww
	};
	var protocolAutolink = {
		name: "protocolAutolink",
		tokenize: tokenizeProtocolAutolink,
		previous: previousProtocol
	};
	var emailAutolink = {
		name: "emailAutolink",
		tokenize: tokenizeEmailAutolink,
		previous: previousEmail
	};
	var text = {};
	function gfmAutolinkLiteral() {
		return { text };
	}
	var code = 48;
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
	function tokenizeEmailAutolink(effects, ok, nok) {
		const self = this;
		let dot;
		let data;
		return start;
		function start(code) {
			if (!gfmAtext(code) || !previousEmail.call(self, self.previous) || previousUnbalanced(self.events)) return nok(code);
			effects.enter("literalAutolink");
			effects.enter("literalAutolinkEmail");
			return atext(code);
		}
		function atext(code) {
			if (gfmAtext(code)) {
				effects.consume(code);
				return atext;
			}
			if (code === 64) {
				effects.consume(code);
				return emailDomain;
			}
			return nok(code);
		}
		function emailDomain(code) {
			if (code === 46) return effects.check(emailDomainDotTrail, emailDomainAfter, emailDomainDot)(code);
			if (code === 45 || code === 95 || asciiAlphanumeric(code)) {
				data = true;
				effects.consume(code);
				return emailDomain;
			}
			return emailDomainAfter(code);
		}
		function emailDomainDot(code) {
			effects.consume(code);
			dot = true;
			return emailDomain;
		}
		function emailDomainAfter(code) {
			if (data && dot && asciiAlpha(self.previous)) {
				effects.exit("literalAutolinkEmail");
				effects.exit("literalAutolink");
				return ok(code);
			}
			return nok(code);
		}
	}
	function tokenizeWwwAutolink(effects, ok, nok) {
		const self = this;
		return wwwStart;
		function wwwStart(code) {
			if (code !== 87 && code !== 119 || !previousWww.call(self, self.previous) || previousUnbalanced(self.events)) return nok(code);
			effects.enter("literalAutolink");
			effects.enter("literalAutolinkWww");
			return effects.check(wwwPrefix, effects.attempt(domain, effects.attempt(path, wwwAfter), nok), nok)(code);
		}
		function wwwAfter(code) {
			effects.exit("literalAutolinkWww");
			effects.exit("literalAutolink");
			return ok(code);
		}
	}
	function tokenizeProtocolAutolink(effects, ok, nok) {
		const self = this;
		let buffer = "";
		let seen = false;
		return protocolStart;
		function protocolStart(code) {
			if ((code === 72 || code === 104) && previousProtocol.call(self, self.previous) && !previousUnbalanced(self.events)) {
				effects.enter("literalAutolink");
				effects.enter("literalAutolinkHttp");
				buffer += String.fromCodePoint(code);
				effects.consume(code);
				return protocolPrefixInside;
			}
			return nok(code);
		}
		function protocolPrefixInside(code) {
			if (asciiAlpha(code) && buffer.length < 5) {
				buffer += String.fromCodePoint(code);
				effects.consume(code);
				return protocolPrefixInside;
			}
			if (code === 58) {
				const protocol = buffer.toLowerCase();
				if (protocol === "http" || protocol === "https") {
					effects.consume(code);
					return protocolSlashesInside;
				}
			}
			return nok(code);
		}
		function protocolSlashesInside(code) {
			if (code === 47) {
				effects.consume(code);
				if (seen) return afterProtocol;
				seen = true;
				return protocolSlashesInside;
			}
			return nok(code);
		}
		function afterProtocol(code) {
			return code === null || asciiControl(code) || markdownLineEndingOrSpace(code) || unicodeWhitespace(code) || unicodePunctuation(code) ? nok(code) : effects.attempt(domain, effects.attempt(path, protocolAfter), nok)(code);
		}
		function protocolAfter(code) {
			effects.exit("literalAutolinkHttp");
			effects.exit("literalAutolink");
			return ok(code);
		}
	}
	function tokenizeWwwPrefix(effects, ok, nok) {
		let size = 0;
		return wwwPrefixInside;
		function wwwPrefixInside(code) {
			if ((code === 87 || code === 119) && size < 3) {
				size++;
				effects.consume(code);
				return wwwPrefixInside;
			}
			if (code === 46 && size === 3) {
				effects.consume(code);
				return wwwPrefixAfter;
			}
			return nok(code);
		}
		function wwwPrefixAfter(code) {
			return code === null ? nok(code) : ok(code);
		}
	}
	function tokenizeDomain(effects, ok, nok) {
		let underscoreInLastSegment;
		let underscoreInLastLastSegment;
		let seen;
		return domainInside;
		function domainInside(code) {
			if (code === 46 || code === 95) return effects.check(trail, domainAfter, domainAtPunctuation)(code);
			if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code) || code !== 45 && unicodePunctuation(code)) return domainAfter(code);
			seen = true;
			effects.consume(code);
			return domainInside;
		}
		function domainAtPunctuation(code) {
			if (code === 95) underscoreInLastSegment = true;
			else {
				underscoreInLastLastSegment = underscoreInLastSegment;
				underscoreInLastSegment = void 0;
			}
			effects.consume(code);
			return domainInside;
		}
		function domainAfter(code) {
			if (underscoreInLastLastSegment || underscoreInLastSegment || !seen) return nok(code);
			return ok(code);
		}
	}
	function tokenizePath(effects, ok) {
		let sizeOpen = 0;
		let sizeClose = 0;
		return pathInside;
		function pathInside(code) {
			if (code === 40) {
				sizeOpen++;
				effects.consume(code);
				return pathInside;
			}
			if (code === 41 && sizeClose < sizeOpen) return pathAtPunctuation(code);
			if (code === 33 || code === 34 || code === 38 || code === 39 || code === 41 || code === 42 || code === 44 || code === 46 || code === 58 || code === 59 || code === 60 || code === 63 || code === 93 || code === 95 || code === 126) return effects.check(trail, ok, pathAtPunctuation)(code);
			if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) return ok(code);
			effects.consume(code);
			return pathInside;
		}
		function pathAtPunctuation(code) {
			if (code === 41) sizeClose++;
			effects.consume(code);
			return pathInside;
		}
	}
	function tokenizeTrail(effects, ok, nok) {
		return trail;
		function trail(code) {
			if (code === 33 || code === 34 || code === 39 || code === 41 || code === 42 || code === 44 || code === 46 || code === 58 || code === 59 || code === 63 || code === 95 || code === 126) {
				effects.consume(code);
				return trail;
			}
			if (code === 38) {
				effects.consume(code);
				return trailCharacterReferenceStart;
			}
			if (code === 93) {
				effects.consume(code);
				return trailBracketAfter;
			}
			if (code === 60 || code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) return ok(code);
			return nok(code);
		}
		function trailBracketAfter(code) {
			if (code === null || code === 40 || code === 91 || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) return ok(code);
			return trail(code);
		}
		function trailCharacterReferenceStart(code) {
			return asciiAlpha(code) ? trailCharacterReferenceInside(code) : nok(code);
		}
		function trailCharacterReferenceInside(code) {
			if (code === 59) {
				effects.consume(code);
				return trail;
			}
			if (asciiAlpha(code)) {
				effects.consume(code);
				return trailCharacterReferenceInside;
			}
			return nok(code);
		}
	}
	function tokenizeEmailDomainDotTrail(effects, ok, nok) {
		return start;
		function start(code) {
			effects.consume(code);
			return after;
		}
		function after(code) {
			return asciiAlphanumeric(code) ? nok(code) : ok(code);
		}
	}
	function previousWww(code) {
		return code === null || code === 40 || code === 42 || code === 95 || code === 91 || code === 93 || code === 126 || markdownLineEndingOrSpace(code);
	}
	function previousProtocol(code) {
		return !asciiAlpha(code);
	}
	function previousEmail(code) {
		return !(code === 47 || gfmAtext(code));
	}
	function gfmAtext(code) {
		return code === 43 || code === 45 || code === 46 || code === 95 || asciiAlphanumeric(code);
	}
	function previousUnbalanced(events) {
		let index = events.length;
		let result = false;
		while (index--) {
			const token = events[index][1];
			if ((token.type === "labelLink" || token.type === "labelImage") && !token._balanced) {
				result = true;
				break;
			}
			if (token._gfmAutolinkLiteralWalkedInto) {
				result = false;
				break;
			}
		}
		if (events.length > 0 && !result) events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
		return result;
	}
	var indent = {
		tokenize: tokenizeIndent,
		partial: true
	};
	function gfmFootnote() {
		return {
			document: { [91]: {
				name: "gfmFootnoteDefinition",
				tokenize: tokenizeDefinitionStart,
				continuation: { tokenize: tokenizeDefinitionContinuation },
				exit: gfmFootnoteDefinitionEnd
			} },
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
	function tokenizePotentialGfmFootnoteCall(effects, ok, nok) {
		const self = this;
		let index = self.events.length;
		const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
		let labelStart;
		while (index--) {
			const token = self.events[index][1];
			if (token.type === "labelImage") {
				labelStart = token;
				break;
			}
			if (token.type === "gfmFootnoteCall" || token.type === "labelLink" || token.type === "label" || token.type === "image" || token.type === "link") break;
		}
		return start;
		function start(code) {
			if (!labelStart || !labelStart._balanced) return nok(code);
			const id = normalizeIdentifier(self.sliceSerialize({
				start: labelStart.end,
				end: self.now()
			}));
			if (id.codePointAt(0) !== 94 || !defined.includes(id.slice(1))) return nok(code);
			effects.enter("gfmFootnoteCallLabelMarker");
			effects.consume(code);
			effects.exit("gfmFootnoteCallLabelMarker");
			return ok(code);
		}
	}
	function resolveToPotentialGfmFootnoteCall(events, context) {
		let index = events.length;
		while (index--) if (events[index][1].type === "labelImage" && events[index][0] === "enter") {
			events[index][1];
			break;
		}
		events[index + 1][1].type = "data";
		events[index + 3][1].type = "gfmFootnoteCallLabelMarker";
		const call = {
			type: "gfmFootnoteCall",
			start: Object.assign({}, events[index + 3][1].start),
			end: Object.assign({}, events[events.length - 1][1].end)
		};
		const marker = {
			type: "gfmFootnoteCallMarker",
			start: Object.assign({}, events[index + 3][1].end),
			end: Object.assign({}, events[index + 3][1].end)
		};
		marker.end.column++;
		marker.end.offset++;
		marker.end._bufferIndex++;
		const string = {
			type: "gfmFootnoteCallString",
			start: Object.assign({}, marker.end),
			end: Object.assign({}, events[events.length - 1][1].start)
		};
		const chunk = {
			type: "chunkString",
			contentType: "string",
			start: Object.assign({}, string.start),
			end: Object.assign({}, string.end)
		};
		const replacement = [
			events[index + 1],
			events[index + 2],
			[
				"enter",
				call,
				context
			],
			events[index + 3],
			events[index + 4],
			[
				"enter",
				marker,
				context
			],
			[
				"exit",
				marker,
				context
			],
			[
				"enter",
				string,
				context
			],
			[
				"enter",
				chunk,
				context
			],
			[
				"exit",
				chunk,
				context
			],
			[
				"exit",
				string,
				context
			],
			events[events.length - 2],
			events[events.length - 1],
			[
				"exit",
				call,
				context
			]
		];
		events.splice(index, events.length - index + 1, ...replacement);
		return events;
	}
	function tokenizeGfmFootnoteCall(effects, ok, nok) {
		const self = this;
		const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
		let size = 0;
		let data;
		return start;
		function start(code) {
			effects.enter("gfmFootnoteCall");
			effects.enter("gfmFootnoteCallLabelMarker");
			effects.consume(code);
			effects.exit("gfmFootnoteCallLabelMarker");
			return callStart;
		}
		function callStart(code) {
			if (code !== 94) return nok(code);
			effects.enter("gfmFootnoteCallMarker");
			effects.consume(code);
			effects.exit("gfmFootnoteCallMarker");
			effects.enter("gfmFootnoteCallString");
			effects.enter("chunkString").contentType = "string";
			return callData;
		}
		function callData(code) {
			if (size > 999 || code === 93 && !data || code === null || code === 91 || markdownLineEndingOrSpace(code)) return nok(code);
			if (code === 93) {
				effects.exit("chunkString");
				const token = effects.exit("gfmFootnoteCallString");
				if (!defined.includes(normalizeIdentifier(self.sliceSerialize(token)))) return nok(code);
				effects.enter("gfmFootnoteCallLabelMarker");
				effects.consume(code);
				effects.exit("gfmFootnoteCallLabelMarker");
				effects.exit("gfmFootnoteCall");
				return ok;
			}
			if (!markdownLineEndingOrSpace(code)) data = true;
			size++;
			effects.consume(code);
			return code === 92 ? callEscape : callData;
		}
		function callEscape(code) {
			if (code === 91 || code === 92 || code === 93) {
				effects.consume(code);
				size++;
				return callData;
			}
			return callData(code);
		}
	}
	function tokenizeDefinitionStart(effects, ok, nok) {
		const self = this;
		const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
		let identifier;
		let size = 0;
		let data;
		return start;
		function start(code) {
			effects.enter("gfmFootnoteDefinition")._container = true;
			effects.enter("gfmFootnoteDefinitionLabel");
			effects.enter("gfmFootnoteDefinitionLabelMarker");
			effects.consume(code);
			effects.exit("gfmFootnoteDefinitionLabelMarker");
			return labelAtMarker;
		}
		function labelAtMarker(code) {
			if (code === 94) {
				effects.enter("gfmFootnoteDefinitionMarker");
				effects.consume(code);
				effects.exit("gfmFootnoteDefinitionMarker");
				effects.enter("gfmFootnoteDefinitionLabelString");
				effects.enter("chunkString").contentType = "string";
				return labelInside;
			}
			return nok(code);
		}
		function labelInside(code) {
			if (size > 999 || code === 93 && !data || code === null || code === 91 || markdownLineEndingOrSpace(code)) return nok(code);
			if (code === 93) {
				effects.exit("chunkString");
				const token = effects.exit("gfmFootnoteDefinitionLabelString");
				identifier = normalizeIdentifier(self.sliceSerialize(token));
				effects.enter("gfmFootnoteDefinitionLabelMarker");
				effects.consume(code);
				effects.exit("gfmFootnoteDefinitionLabelMarker");
				effects.exit("gfmFootnoteDefinitionLabel");
				return labelAfter;
			}
			if (!markdownLineEndingOrSpace(code)) data = true;
			size++;
			effects.consume(code);
			return code === 92 ? labelEscape : labelInside;
		}
		function labelEscape(code) {
			if (code === 91 || code === 92 || code === 93) {
				effects.consume(code);
				size++;
				return labelInside;
			}
			return labelInside(code);
		}
		function labelAfter(code) {
			if (code === 58) {
				effects.enter("definitionMarker");
				effects.consume(code);
				effects.exit("definitionMarker");
				if (!defined.includes(identifier)) defined.push(identifier);
				return factorySpace(effects, whitespaceAfter, "gfmFootnoteDefinitionWhitespace");
			}
			return nok(code);
		}
		function whitespaceAfter(code) {
			return ok(code);
		}
	}
	function tokenizeDefinitionContinuation(effects, ok, nok) {
		return effects.check(blankLine, ok, effects.attempt(indent, ok, nok));
	}
	function gfmFootnoteDefinitionEnd(effects) {
		effects.exit("gfmFootnoteDefinition");
	}
	function tokenizeIndent(effects, ok, nok) {
		const self = this;
		return factorySpace(effects, afterPrefix, "gfmFootnoteDefinitionIndent", 5);
		function afterPrefix(code) {
			const tail = self.events[self.events.length - 1];
			return tail && tail[1].type === "gfmFootnoteDefinitionIndent" && tail[2].sliceSerialize(tail[1], true).length === 4 ? ok(code) : nok(code);
		}
	}
	function gfmStrikethrough(options) {
		let single = (options || {}).singleTilde;
		const tokenizer = {
			name: "strikethrough",
			tokenize: tokenizeStrikethrough,
			resolveAll: resolveAllStrikethrough
		};
		if (single === null || single === void 0) single = true;
		return {
			text: { [126]: tokenizer },
			insideSpan: { null: [tokenizer] },
			attentionMarkers: { null: [126] }
		};
		function resolveAllStrikethrough(events, context) {
			let index = -1;
			while (++index < events.length) if (events[index][0] === "enter" && events[index][1].type === "strikethroughSequenceTemporary" && events[index][1]._close) {
				let open = index;
				while (open--) if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open && events[index][1].end.offset - events[index][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
					events[index][1].type = "strikethroughSequence";
					events[open][1].type = "strikethroughSequence";
					const strikethrough = {
						type: "strikethrough",
						start: Object.assign({}, events[open][1].start),
						end: Object.assign({}, events[index][1].end)
					};
					const text = {
						type: "strikethroughText",
						start: Object.assign({}, events[open][1].end),
						end: Object.assign({}, events[index][1].start)
					};
					const nextEvents = [
						[
							"enter",
							strikethrough,
							context
						],
						[
							"enter",
							events[open][1],
							context
						],
						[
							"exit",
							events[open][1],
							context
						],
						[
							"enter",
							text,
							context
						]
					];
					const insideSpan = context.parser.constructs.insideSpan.null;
					if (insideSpan) splice(nextEvents, nextEvents.length, 0, resolveAll(insideSpan, events.slice(open + 1, index), context));
					splice(nextEvents, nextEvents.length, 0, [
						[
							"exit",
							text,
							context
						],
						[
							"enter",
							events[index][1],
							context
						],
						[
							"exit",
							events[index][1],
							context
						],
						[
							"exit",
							strikethrough,
							context
						]
					]);
					splice(events, open - 1, index - open + 3, nextEvents);
					index = open + nextEvents.length - 2;
					break;
				}
			}
			index = -1;
			while (++index < events.length) if (events[index][1].type === "strikethroughSequenceTemporary") events[index][1].type = "data";
			return events;
		}
		function tokenizeStrikethrough(effects, ok, nok) {
			const previous = this.previous;
			const events = this.events;
			let size = 0;
			return start;
			function start(code) {
				if (previous === 126 && events[events.length - 1][1].type !== "characterEscape") return nok(code);
				effects.enter("strikethroughSequenceTemporary");
				return more(code);
			}
			function more(code) {
				const before = classifyCharacter(previous);
				if (code === 126) {
					if (size > 1) return nok(code);
					effects.consume(code);
					size++;
					return more;
				}
				if (size < 2 && !single) return nok(code);
				const token = effects.exit("strikethroughSequenceTemporary");
				const after = classifyCharacter(code);
				token._open = !after || after === 2 && Boolean(before);
				token._close = !before || before === 2 && Boolean(after);
				return ok(code);
			}
		}
	}
	var EditMap = class {
		constructor() {
			this.map = [];
		}
		add(index, remove, add) {
			addImplementation(this, index, remove, add);
		}
		consume(events) {
			this.map.sort(function(a, b) {
				return a[0] - b[0];
			});
			if (this.map.length === 0) return;
			let index = this.map.length;
			const vecs = [];
			while (index > 0) {
				index -= 1;
				vecs.push(events.slice(this.map[index][0] + this.map[index][1]), this.map[index][2]);
				events.length = this.map[index][0];
			}
			vecs.push(events.slice());
			events.length = 0;
			let slice = vecs.pop();
			while (slice) {
				for (const element of slice) events.push(element);
				slice = vecs.pop();
			}
			this.map.length = 0;
		}
	};
	function addImplementation(editMap, at, remove, add) {
		let index = 0;
		if (remove === 0 && add.length === 0) return;
		while (index < editMap.map.length) {
			if (editMap.map[index][0] === at) {
				editMap.map[index][1] += remove;
				editMap.map[index][2].push(...add);
				return;
			}
			index += 1;
		}
		editMap.map.push([
			at,
			remove,
			add
		]);
	}
	function gfmTableAlign(events, index) {
		let inDelimiterRow = false;
		const align = [];
		while (index < events.length) {
			const event = events[index];
			if (inDelimiterRow) {
				if (event[0] === "enter") {
					if (event[1].type === "tableContent") align.push(events[index + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
				} else if (event[1].type === "tableContent") {
					if (events[index - 1][1].type === "tableDelimiterMarker") {
						const alignIndex = align.length - 1;
						align[alignIndex] = align[alignIndex] === "left" ? "center" : "right";
					}
				} else if (event[1].type === "tableDelimiterRow") break;
			} else if (event[0] === "enter" && event[1].type === "tableDelimiterRow") inDelimiterRow = true;
			index += 1;
		}
		return align;
	}
	function gfmTable() {
		return { flow: { null: {
			name: "table",
			tokenize: tokenizeTable,
			resolveAll: resolveTable
		} } };
	}
	function tokenizeTable(effects, ok, nok) {
		const self = this;
		let size = 0;
		let sizeB = 0;
		let seen;
		return start;
		function start(code) {
			let index = self.events.length - 1;
			while (index > -1) {
				const type = self.events[index][1].type;
				if (type === "lineEnding" || type === "linePrefix") index--;
				else break;
			}
			const tail = index > -1 ? self.events[index][1].type : null;
			const next = tail === "tableHead" || tail === "tableRow" ? bodyRowStart : headRowBefore;
			if (next === bodyRowStart && self.parser.lazy[self.now().line]) return nok(code);
			return next(code);
		}
		function headRowBefore(code) {
			effects.enter("tableHead");
			effects.enter("tableRow");
			return headRowStart(code);
		}
		function headRowStart(code) {
			if (code === 124) return headRowBreak(code);
			seen = true;
			sizeB += 1;
			return headRowBreak(code);
		}
		function headRowBreak(code) {
			if (code === null) return nok(code);
			if (markdownLineEnding(code)) {
				if (sizeB > 1) {
					sizeB = 0;
					self.interrupt = true;
					effects.exit("tableRow");
					effects.enter("lineEnding");
					effects.consume(code);
					effects.exit("lineEnding");
					return headDelimiterStart;
				}
				return nok(code);
			}
			if (markdownSpace(code)) return factorySpace(effects, headRowBreak, "whitespace")(code);
			sizeB += 1;
			if (seen) {
				seen = false;
				size += 1;
			}
			if (code === 124) {
				effects.enter("tableCellDivider");
				effects.consume(code);
				effects.exit("tableCellDivider");
				seen = true;
				return headRowBreak;
			}
			effects.enter("data");
			return headRowData(code);
		}
		function headRowData(code) {
			if (code === null || code === 124 || markdownLineEndingOrSpace(code)) {
				effects.exit("data");
				return headRowBreak(code);
			}
			effects.consume(code);
			return code === 92 ? headRowEscape : headRowData;
		}
		function headRowEscape(code) {
			if (code === 92 || code === 124) {
				effects.consume(code);
				return headRowData;
			}
			return headRowData(code);
		}
		function headDelimiterStart(code) {
			self.interrupt = false;
			if (self.parser.lazy[self.now().line]) return nok(code);
			effects.enter("tableDelimiterRow");
			seen = false;
			if (markdownSpace(code)) return factorySpace(effects, headDelimiterBefore, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code);
			return headDelimiterBefore(code);
		}
		function headDelimiterBefore(code) {
			if (code === 45 || code === 58) return headDelimiterValueBefore(code);
			if (code === 124) {
				seen = true;
				effects.enter("tableCellDivider");
				effects.consume(code);
				effects.exit("tableCellDivider");
				return headDelimiterCellBefore;
			}
			return headDelimiterNok(code);
		}
		function headDelimiterCellBefore(code) {
			if (markdownSpace(code)) return factorySpace(effects, headDelimiterValueBefore, "whitespace")(code);
			return headDelimiterValueBefore(code);
		}
		function headDelimiterValueBefore(code) {
			if (code === 58) {
				sizeB += 1;
				seen = true;
				effects.enter("tableDelimiterMarker");
				effects.consume(code);
				effects.exit("tableDelimiterMarker");
				return headDelimiterLeftAlignmentAfter;
			}
			if (code === 45) {
				sizeB += 1;
				return headDelimiterLeftAlignmentAfter(code);
			}
			if (code === null || markdownLineEnding(code)) return headDelimiterCellAfter(code);
			return headDelimiterNok(code);
		}
		function headDelimiterLeftAlignmentAfter(code) {
			if (code === 45) {
				effects.enter("tableDelimiterFiller");
				return headDelimiterFiller(code);
			}
			return headDelimiterNok(code);
		}
		function headDelimiterFiller(code) {
			if (code === 45) {
				effects.consume(code);
				return headDelimiterFiller;
			}
			if (code === 58) {
				seen = true;
				effects.exit("tableDelimiterFiller");
				effects.enter("tableDelimiterMarker");
				effects.consume(code);
				effects.exit("tableDelimiterMarker");
				return headDelimiterRightAlignmentAfter;
			}
			effects.exit("tableDelimiterFiller");
			return headDelimiterRightAlignmentAfter(code);
		}
		function headDelimiterRightAlignmentAfter(code) {
			if (markdownSpace(code)) return factorySpace(effects, headDelimiterCellAfter, "whitespace")(code);
			return headDelimiterCellAfter(code);
		}
		function headDelimiterCellAfter(code) {
			if (code === 124) return headDelimiterBefore(code);
			if (code === null || markdownLineEnding(code)) {
				if (!seen || size !== sizeB) return headDelimiterNok(code);
				effects.exit("tableDelimiterRow");
				effects.exit("tableHead");
				return ok(code);
			}
			return headDelimiterNok(code);
		}
		function headDelimiterNok(code) {
			return nok(code);
		}
		function bodyRowStart(code) {
			effects.enter("tableRow");
			return bodyRowBreak(code);
		}
		function bodyRowBreak(code) {
			if (code === 124) {
				effects.enter("tableCellDivider");
				effects.consume(code);
				effects.exit("tableCellDivider");
				return bodyRowBreak;
			}
			if (code === null || markdownLineEnding(code)) {
				effects.exit("tableRow");
				return ok(code);
			}
			if (markdownSpace(code)) return factorySpace(effects, bodyRowBreak, "whitespace")(code);
			effects.enter("data");
			return bodyRowData(code);
		}
		function bodyRowData(code) {
			if (code === null || code === 124 || markdownLineEndingOrSpace(code)) {
				effects.exit("data");
				return bodyRowBreak(code);
			}
			effects.consume(code);
			return code === 92 ? bodyRowEscape : bodyRowData;
		}
		function bodyRowEscape(code) {
			if (code === 92 || code === 124) {
				effects.consume(code);
				return bodyRowData;
			}
			return bodyRowData(code);
		}
	}
	function resolveTable(events, context) {
		let index = -1;
		let inFirstCellAwaitingPipe = true;
		let rowKind = 0;
		let lastCell = [
			0,
			0,
			0,
			0
		];
		let cell = [
			0,
			0,
			0,
			0
		];
		let afterHeadAwaitingFirstBodyRow = false;
		let lastTableEnd = 0;
		let currentTable;
		let currentBody;
		let currentCell;
		const map = new EditMap();
		while (++index < events.length) {
			const event = events[index];
			const token = event[1];
			if (event[0] === "enter") {
				if (token.type === "tableHead") {
					afterHeadAwaitingFirstBodyRow = false;
					if (lastTableEnd !== 0) {
						flushTableEnd(map, context, lastTableEnd, currentTable, currentBody);
						currentBody = void 0;
						lastTableEnd = 0;
					}
					currentTable = {
						type: "table",
						start: Object.assign({}, token.start),
						end: Object.assign({}, token.end)
					};
					map.add(index, 0, [[
						"enter",
						currentTable,
						context
					]]);
				} else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
					inFirstCellAwaitingPipe = true;
					currentCell = void 0;
					lastCell = [
						0,
						0,
						0,
						0
					];
					cell = [
						0,
						index + 1,
						0,
						0
					];
					if (afterHeadAwaitingFirstBodyRow) {
						afterHeadAwaitingFirstBodyRow = false;
						currentBody = {
							type: "tableBody",
							start: Object.assign({}, token.start),
							end: Object.assign({}, token.end)
						};
						map.add(index, 0, [[
							"enter",
							currentBody,
							context
						]]);
					}
					rowKind = token.type === "tableDelimiterRow" ? 2 : currentBody ? 3 : 1;
				} else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
					inFirstCellAwaitingPipe = false;
					if (cell[2] === 0) {
						if (lastCell[1] !== 0) {
							cell[0] = cell[1];
							currentCell = flushCell(map, context, lastCell, rowKind, void 0, currentCell);
							lastCell = [
								0,
								0,
								0,
								0
							];
						}
						cell[2] = index;
					}
				} else if (token.type === "tableCellDivider") if (inFirstCellAwaitingPipe) inFirstCellAwaitingPipe = false;
				else {
					if (lastCell[1] !== 0) {
						cell[0] = cell[1];
						currentCell = flushCell(map, context, lastCell, rowKind, void 0, currentCell);
					}
					lastCell = cell;
					cell = [
						lastCell[1],
						index,
						0,
						0
					];
				}
			} else if (token.type === "tableHead") {
				afterHeadAwaitingFirstBodyRow = true;
				lastTableEnd = index;
			} else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
				lastTableEnd = index;
				if (lastCell[1] !== 0) {
					cell[0] = cell[1];
					currentCell = flushCell(map, context, lastCell, rowKind, index, currentCell);
				} else if (cell[1] !== 0) currentCell = flushCell(map, context, cell, rowKind, index, currentCell);
				rowKind = 0;
			} else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) cell[3] = index;
		}
		if (lastTableEnd !== 0) flushTableEnd(map, context, lastTableEnd, currentTable, currentBody);
		map.consume(context.events);
		index = -1;
		while (++index < context.events.length) {
			const event = context.events[index];
			if (event[0] === "enter" && event[1].type === "table") event[1]._align = gfmTableAlign(context.events, index);
		}
		return events;
	}
	function flushCell(map, context, range, rowKind, rowEnd, previousCell) {
		const groupName = rowKind === 1 ? "tableHeader" : rowKind === 2 ? "tableDelimiter" : "tableData";
		const valueName = "tableContent";
		if (range[0] !== 0) {
			previousCell.end = Object.assign({}, getPoint(context.events, range[0]));
			map.add(range[0], 0, [[
				"exit",
				previousCell,
				context
			]]);
		}
		const now = getPoint(context.events, range[1]);
		previousCell = {
			type: groupName,
			start: Object.assign({}, now),
			end: Object.assign({}, now)
		};
		map.add(range[1], 0, [[
			"enter",
			previousCell,
			context
		]]);
		if (range[2] !== 0) {
			const relatedStart = getPoint(context.events, range[2]);
			const relatedEnd = getPoint(context.events, range[3]);
			const valueToken = {
				type: valueName,
				start: Object.assign({}, relatedStart),
				end: Object.assign({}, relatedEnd)
			};
			map.add(range[2], 0, [[
				"enter",
				valueToken,
				context
			]]);
			if (rowKind !== 2) {
				const start = context.events[range[2]];
				const end = context.events[range[3]];
				start[1].end = Object.assign({}, end[1].end);
				start[1].type = "chunkText";
				start[1].contentType = "text";
				if (range[3] > range[2] + 1) {
					const a = range[2] + 1;
					const b = range[3] - range[2] - 1;
					map.add(a, b, []);
				}
			}
			map.add(range[3] + 1, 0, [[
				"exit",
				valueToken,
				context
			]]);
		}
		if (rowEnd !== void 0) {
			previousCell.end = Object.assign({}, getPoint(context.events, rowEnd));
			map.add(rowEnd, 0, [[
				"exit",
				previousCell,
				context
			]]);
			previousCell = void 0;
		}
		return previousCell;
	}
	function flushTableEnd(map, context, index, table, tableBody) {
		const exits = [];
		const related = getPoint(context.events, index);
		if (tableBody) {
			tableBody.end = Object.assign({}, related);
			exits.push([
				"exit",
				tableBody,
				context
			]);
		}
		table.end = Object.assign({}, related);
		exits.push([
			"exit",
			table,
			context
		]);
		map.add(index + 1, 0, exits);
	}
	function getPoint(events, index) {
		const event = events[index];
		const side = event[0] === "enter" ? "start" : "end";
		return event[1][side];
	}
	var tasklistCheck = {
		name: "tasklistCheck",
		tokenize: tokenizeTasklistCheck
	};
	function gfmTaskListItem() {
		return { text: { [91]: tasklistCheck } };
	}
	function tokenizeTasklistCheck(effects, ok, nok) {
		const self = this;
		return open;
		function open(code) {
			if (self.previous !== null || !self._gfmTasklistFirstContentOfListItem) return nok(code);
			effects.enter("taskListCheck");
			effects.enter("taskListCheckMarker");
			effects.consume(code);
			effects.exit("taskListCheckMarker");
			return inside;
		}
		function inside(code) {
			if (markdownLineEndingOrSpace(code)) {
				effects.enter("taskListCheckValueUnchecked");
				effects.consume(code);
				effects.exit("taskListCheckValueUnchecked");
				return close;
			}
			if (code === 88 || code === 120) {
				effects.enter("taskListCheckValueChecked");
				effects.consume(code);
				effects.exit("taskListCheckValueChecked");
				return close;
			}
			return nok(code);
		}
		function close(code) {
			if (code === 93) {
				effects.enter("taskListCheckMarker");
				effects.consume(code);
				effects.exit("taskListCheckMarker");
				effects.exit("taskListCheck");
				return after;
			}
			return nok(code);
		}
		function after(code) {
			if (markdownLineEnding(code)) return ok(code);
			if (markdownSpace(code)) return effects.check({ tokenize: spaceThenNonSpace }, ok, nok)(code);
			return nok(code);
		}
	}
	function spaceThenNonSpace(effects, ok, nok) {
		return factorySpace(effects, after, "whitespace");
		function after(code) {
			return code === null ? nok(code) : ok(code);
		}
	}
	function gfm(options) {
		return combineExtensions([
			gfmAutolinkLiteral(),
			gfmFootnote(),
			gfmStrikethrough(options),
			gfmTable(),
			gfmTaskListItem()
		]);
	}
	function fromMarkdown(content) {
		return fromMarkdown$1(content, {
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
	function toHtml(node) {
		return toHtml$1(toHast(node));
	}
	function flatMap(tree, fn) {
		function transform(node, i, parent) {
			if ("children" in node) {
				const p = node;
				p.children = p.children.flatMap((item, i) => transform(item, i, p));
			}
			return fn(node, i, parent);
		}
		return transform(tree, 0, void 0)[0];
	}
	function standardizeLineBreaks(text) {
		return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	}
	var template_default = "<!DOCTYPE html>\n<!--\n Copyright 2022-Present Pionxzh\n Copyright 2026 Asim Ihsan\n SPDX-License-Identifier: MPL-2.0\n-->\n\n<html lang=\"{{lang}}\" data-theme=\"{{theme}}\">\n<head>\n    <meta charset=\"UTF-8\" />\n    <link rel=\"icon\" href=\"https://chat.openai.com/favicon.ico\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>{{title}}</title>\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css\">\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js\"><\/script>\n    <script>\n        hljs.highlightAll()\n    <\/script>\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.3/katex.min.css\">\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.3/katex.min.js\"><\/script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.3/contrib/auto-render.min.js\"><\/script>\n    <script>\n        document.addEventListener(\"DOMContentLoaded\", function() {\n            renderMathInElement(document.body, {\n                delimiters: [\n                    { left: \"$$\", right: \"$$\", display: true },\n                    { left: \"$\", right: \"$\", display: false },\n                    { left: \"\\\\[\", right: \"\\\\]\", display: true },\n                    { left: \"\\\\(\", right: \"\\\\)\", display: false }\n                ],\n                throwOnError: false,\n                ignoredClasses: [\"no-katex\"],\n                preProcess: function(math) {\n                    return `\\\\displaystyle \\\\Large ${math}`;\n                }\n            });\n            document.querySelectorAll('.katex').forEach(function(el) {\n                const parent = el.parentNode;\n                const grandparent = parent.parentNode;\n                if (grandparent.tagName === 'P' && isOnlyContent(grandparent, parent)) {\n                    el.style.width = '100%';\n                    el.style.display = 'block';\n                    el.style.textAlign = 'center';\n                    parent.style.textAlign = 'center';\n                } else {\n                    el.style.display = 'inline-block';\n                    el.style.width = 'fit-content';\n                }\n            });\n            function isOnlyContent(parent, element) {\n                let onlyKaTeX = true;\n                parent.childNodes.forEach(function(child) {\n                    console.log(child.textContent);\n                    if (child !== element) {\n                        if (child.nodeType === Node.TEXT_NODE) {\n                            if (child.textContent.trim().length > 0) {\n                                onlyKaTeX = false;\n                            }\n                        } else if (child.nodeType === Node.ELEMENT_NODE) {\n                            onlyKaTeX = false;\n                        }\n                    }\n                });\n                return onlyKaTeX;\n            }\n        });\n    <\/script>\n\n    <style>\n        :root {\n            --page-text: #0d0d0d;\n            --page-bg: #fff;\n            --td-borders: #374151;\n            --th-borders: #4b5563;\n            --tw-prose-code: var(--page-text);\n            --tw-prose-counters: #9b9b9b;\n            --tw-prose-headings: var(--page-text);\n            --tw-prose-hr: rgba(0,0,0,.25);\n            --tw-prose-links: var(--page-text);\n            --tw-prose-quotes: var(--page-text);\n            --meta-title: #616c77;\n        }\n\n        [data-theme=\"dark\"] {\n            --page-text: #ececec;\n            --page-bg: #212121;\n            --tw-prose-code: var(--page-text);\n            --tw-prose-counters: #9b9b9b;\n            --tw-prose-headings: var(--page-text);\n            --tw-prose-hr: hsla(0,0%,100%,.25);\n            --tw-prose-links: var(--page-text);\n            --tw-prose-quotes: var(--page-text);\n            --meta-title: #959faa;\n        }\n\n        * {\n            box-sizing: border-box;\n            font-size: 16px;\n        }\n\n        ::-webkit-scrollbar {\n            height: 1rem;\n            width: .5rem\n        }\n\n        ::-webkit-scrollbar:horizontal {\n            height: .5rem;\n            width: 1rem\n        }\n\n        ::-webkit-scrollbar-track {\n            background-color: transparent;\n            border-radius: 9999px\n        }\n\n        ::-webkit-scrollbar-thumb {\n            --tw-border-opacity: 1;\n            background-color: rgba(217,217,227,.8);\n            border-color: rgba(255,255,255,var(--tw-border-opacity));\n            border-radius: 9999px;\n            border-width: 1px\n        }\n\n        ::-webkit-scrollbar-thumb:hover {\n            --tw-bg-opacity: 1;\n            background-color: rgba(236,236,241,var(--tw-bg-opacity))\n        }\n\n        .dark ::-webkit-scrollbar-thumb {\n            --tw-bg-opacity: 1;\n            background-color: rgba(86,88,105,var(--tw-bg-opacity))\n        }\n\n        .dark ::-webkit-scrollbar-thumb:hover {\n            --tw-bg-opacity: 1;\n            background-color: rgba(172,172,190,var(--tw-bg-opacity))\n        }\n\n        @media (min-width: 768px) {\n            .scrollbar-trigger ::-webkit-scrollbar-thumb {\n                visibility:hidden\n            }\n\n            .scrollbar-trigger:hover ::-webkit-scrollbar-thumb {\n                visibility: visible\n            }\n        }\n\n        body {\n            font-family: Söhne,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,Arial,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;\n            font-size: 14px;\n            line-height: 1.5;\n            color: var(--page-text);\n            background-color: var(--page-bg);\n            margin: 0;\n            padding: 0;\n        }\n\n        [data-theme=\"light\"] .sun {\n            display: none;\n        }\n\n        [data-theme=\"dark\"] .moon {\n            display: none;\n        }\n\n        .toggle {\n            display: inline-flex;\n            justify-content: center;\n            align-items: center;\n            width: 32px;\n            height: 32px;\n            border-radius: 4px;\n            background-color: #fff;\n            border: 1px solid #e2e8f0;\n        }\n\n        [data-width=\"narrow\"] .width-toggle .expand {\n            display: block;\n        }\n\n        [data-width=\"wide\"] .width-toggle .narrow {\n            display: block;\n        }\n\n        .width-toggle {\n            display: inline-flex;\n            justify-content: center;\n            align-items: center;\n            width: 32px;\n            height: 32px;\n            border-radius: 4px;\n            background-color: #fff;\n            border: 1px solid #e2e8f0;\n            margin-left: 8px;\n            cursor: pointer;\n        }\n\n        .width-toggle svg {\n            display: none;\n        }\n\n        .metadata_container {\n            display: flex;\n            flex-direction: column;\n            margin-top: 8px;\n            padding-left: 1rem;\n        }\n\n        .metadata_item {\n            display: flex;\n            flex-direction: row;\n            align-items: center;\n            border-radius: 16px;\n            padding: 4px 0.5rem;\n        }\n\n        .metadata_item:hover {\n            background-color: rgba(0,0,0,.1);\n        }\n\n        .metadata_item > div:first-child {\n            flex: 0 1 100px;\n            color: var(--meta-title);\n        }\n\n        .metadata_item > div:last-child {\n            flex: 1;\n        }\n\n        a {\n            color: var(--tw-prose-links);\n            font-size: 0.8rem;\n            text-decoration-line: underline;\n            text-underline-offset: 2px;\n        }\n\n        .conversation-content > p:first-child,\n        ol:first-child {\n            margin-top: 0;\n        }\n\n        p>code, li>code {\n            color: var(--tw-prose-code);\n            font-weight: 600;\n            font-size: .875em;\n        }\n\n        p>code::before,\n        p>code::after,\n        li>code::before,\n        li>code::after {\n            content: \"`\";\n        }\n\n        hr {\n            width: 100%;\n            height: 0;\n            border: 1px solid var(--tw-prose-hr);\n            margin-bottom: 1em;\n            margin-top: 1em;\n        }\n\n        pre {\n            color: #ffffff;\n            background-color: #000000;\n            overflow-x: auto;\n            margin: 0 0 1rem 0;\n            border-radius: 0.375rem;\n        }\n\n        pre>code {\n            font-family: Söhne Mono, Monaco, Andale Mono, Ubuntu Mono, monospace !important;\n            font-weight: 400;\n            font-size: .875em;\n            line-height: 1.7142857;\n        }\n\n        h1, h2, h3, h4, h5, h6 {\n            color: var(--tw-prose-headings);\n            margin: 0;\n        }\n\n        h1 {\n            font-size: 2.25em;\n            font-weight: 600;\n            line-height: 1.1111111;\n            margin-bottom: 0.8888889em;\n            margin-top: 0;\n        }\n\n        h2 {\n            font-size: 1.5em;\n            font-weight: 700;\n            line-height: 1.3333333;\n            margin-bottom: 1em;\n            margin-top: 2em;\n        }\n\n        h3 {\n            font-size: 1.25em;\n            font-weight: 600;\n            line-height: 1.6;\n            margin-bottom: .6em;\n            margin-top: 1.6em;\n        }\n\n        h4 {\n            font-weight: 400;\n            line-height: 1.5;\n            margin-bottom: .5em;\n            margin-top: 1.5em\n        }\n\n        h3,h4 {\n            margin-bottom: .5rem;\n            margin-top: 1rem;\n        }\n\n        h5 {\n            font-weight: 600;\n        }\n\n        blockquote {\n            border-left: 2px solid rgba(142,142,160,1);\n            color: var(--tw-prose-quotes);\n            font-style: italic;\n            font-style: normal;\n            font-weight: 500;\n            line-height: 1rem;\n            margin: 1.6em 0;\n            padding-left: 1em;\n            quotes: \"\\201C\"\"\\201D\"\"\\2018\"\"\\2019\";\n        }\n\n        blockquote p:first-of-type:before {\n            content: open-quote;\n        }\n\n        blockquote p:last-of-type:after {\n            content: close-quote;\n        }\n\n        ol, ul {\n            padding-left: 1.1rem;\n        }\n\n        ::marker {\n            color: var(--tw-prose-counters);\n            font-weight: 400;\n        }\n\n        table {\n            width: 100%;\n            border-collapse: separate;\n            border-spacing: 0 0;\n            table-layout: auto;\n            text-align: left;\n            font-size: .875em;\n            line-height: 1.7142857;\n        }\n\n        table * {\n            box-sizing: border-box;\n            border-width: 0;\n            border-style: solid;\n            border-color: #d9d9e3;\n        }\n\n        table thead {\n            border-bottom-color: var(--th-borders);\n            border-bottom-width: 1px;\n        }\n\n        table th {\n            background-color: rgba(236,236,241,.2);\n            border-bottom-width: 1px;\n            border-left-width: 1px;\n            border-top-width: 1px;\n            padding: 0.25rem 0.75rem;\n        }\n\n        table th:first-child {\n            border-top-left-radius: 0.375rem;\n        }\n\n        table th:last-child {\n            border-right-width: 1px;\n            border-top-right-radius: 0.375rem;\n        }\n\n        table tbody tr {\n            border-bottom-color: var(--td-borders);\n            border-bottom-width: 1px;\n        }\n\n        table tbody tr:last-child {\n            border-bottom-width: 0;\n        }\n\n        table tbody tr:last-child td:first-child {\n            border-bottom-left-radius: 0.375rem;\n        }\n\n        table tbody tr:last-child td:last-child {\n            border-bottom-right-radius: 0.375rem;\n        }\n\n        table td {\n            border-bottom-width: 1px;\n            border-left-width: 1px;\n            padding: 0.25rem 0.75rem;\n        }\n\n        table td:last-child {\n            border-right-width: 1px;\n        }\n\n        [type=checkbox], [type=radio] {\n            accent-color: #2563eb;\n        }\n\n        .conversation {\n            margin: 0 auto;\n            padding: 1rem;\n            max-width: 64rem;\n        }\n\n        [data-width=\"narrow\"] .conversation {\n            max-width: 64rem;\n        }\n\n        [data-width=\"wide\"] .conversation {\n            max-width: 90%;\n        }\n\n        @media (min-width: 1280px) {\n            .conversation {\n                max-width: 48rem;\n            }\n        }\n\n        @media (min-width: 1024px) {\n            .conversation {\n                max-width: 40rem;\n            }\n        }\n\n        @media (min-width: 768px) {\n            .conversation {\n                max-width: 48rem;\n            }\n        }\n\n        .conversation-header {\n            margin-bottom: 1rem;\n        }\n\n        .conversation-header h1 {\n            margin: 0;\n        }\n\n        .conversation-header h1 a {\n            font-size: 1.5rem;\n        }\n\n        .conversation-header .conversation-export {\n            margin-top: 0.5rem;\n            font-size: 0.8rem;\n        }\n\n        .conversation-header p {\n            margin-top: 0.5rem;\n            font-size: 0.8rem;\n        }\n\n        .conversation-item {\n            display: flex;\n            position: relative;\n            padding: 1rem;\n            border-left: 1px solid rgba(0,0,0,.1);\n            border-right: 1px solid rgba(0,0,0,.1);\n            border-bottom: 1px solid rgba(0,0,0,.1);\n        }\n\n        .conversation-item:first-of-type {\n            border-top: 1px solid rgba(0,0,0,.1);\n        }\n\n        .author {\n            display: flex;\n            flex: 0 0 30px;\n            justify-content: center;\n            align-items: center;\n            width: 30px;\n            height: 30px;\n            border-radius: 0.125rem;\n            margin-right: 1rem;\n            overflow: hidden;\n        }\n\n        .author svg {\n            color: #fff;\n            width: 22px;\n            height: 22px;\n        }\n\n        .author img {\n            content: url({{avatar}});\n            width: 100%;\n            height: 100%;\n        }\n\n        .author.GPT-3 {\n            background-color: rgb(16, 163, 127);\n        }\n\n        .author.GPT-4 {\n            background-color: black;\n        }\n\n        .conversation-content-wrapper {\n            display: flex;\n            position: relative;\n            overflow: hidden;\n            flex: 1 1 auto;\n            flex-direction: column;\n        }\n\n        .conversation-content {\n            font-size: 1rem;\n            line-height: 1.5;\n        }\n\n        .conversation-content p {\n            white-space: pre-wrap;\n            line-height: 28px;\n        }\n\n        .conversation-content img, .conversation-content video {\n            display: block;\n            max-width: 100%;\n            height: auto;\n            margin-bottom: 2em;\n            margin-top: 2em;\n        }\n\n        .time {\n            position: absolute;\n            right: 8px;\n            bottom: 0;\n            font-size: 0.8rem;\n            color: #acacbe\n        }\n\n    </style>\n</head>\n\n<body>\n    <svg aria-hidden=\"true\" style=\"position: absolute; width: 0; height: 0; overflow: hidden;\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n        <symbol id=\"chatgpt\" viewBox=\"0 0 41 41\">\n            <path d=\"M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z\" fill=\"currentColor\"></path>\n        </symbol>\n    </svg>\n    <div class=\"conversation\">\n        <div class=\"conversation-header\">\n            <h1>\n                <a href=\"{{source}}\" target=\"_blank\" rel=\"noopener noreferrer\">{{title}}</a>\n                <button class=\"toggle\">\n                    <svg class=\"sun\" stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"w-4 h-4\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"12\" cy=\"12\" r=\"5\"></circle><line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"3\"></line><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\"></line><line x1=\"4.22\" y1=\"4.22\" x2=\"5.64\" y2=\"5.64\"></line><line x1=\"18.36\" y1=\"18.36\" x2=\"19.78\" y2=\"19.78\"></line><line x1=\"1\" y1=\"12\" x2=\"3\" y2=\"12\"></line><line x1=\"21\" y1=\"12\" x2=\"23\" y2=\"12\"></line><line x1=\"4.22\" y1=\"19.78\" x2=\"5.64\" y2=\"18.36\"></line><line x1=\"18.36\" y1=\"5.64\" x2=\"19.78\" y2=\"4.22\"></line></svg>\n                    <svg class=\"moon\" stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"w-4 h-4\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z\"></path></svg>\n                </button>\n                <button class=\"toggle width-toggle\">\n                    <svg class=\"expand\" stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"w-4 h-4\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\" style=\"display: block;\">\n                        <path d=\"M3 12h18M6 8l-4 4 4 4M18 8l4 4-4 4\"></path>\n                    </svg>\n                    <svg class=\"narrow\" stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"w-4 h-4\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\" style=\"display: none;\">\n                        <path d=\"M3 12h7M14 12h7M6 16l4-4-4-4M18 16l-4-4 4-4\"></path>\n                    </svg>\n                </button>\n            </h1>\n            <div class=\"conversation-export\">\n                <p>Exported by\n                <a href=\"https://github.com/asimihsan/chatgpt-exporter.git\">ChatGPT Exporter</a>\n                at {{time}}</p>\n            </div>\n            {{details}}\n        </div>\n\n        {{content}}\n    </div>\n\n\n    <script>\n        function toggleDarkMode(mode) {\n            const html = document.querySelector('html');\n            const isDarkMode = html.getAttribute('data-theme') === 'dark';\n            const newMode = mode || (isDarkMode ? 'light' : 'dark');\n            if (newMode !== 'dark' && newMode !== 'light') return;\n            html.setAttribute('data-theme', newMode);\n\n            const url = new URL(window.location);\n            url.searchParams.set('theme', newMode);\n            window.history.replaceState({}, '', url);\n        }\n        function toggleWidthMode(mode) {\n            const body = document.querySelector('body');\n            const widthToggleButton = document.querySelector('.width-toggle');\n            const isWide = body.getAttribute('data-width') === 'wide';\n            const newWidthMode = mode || (isWide ? 'narrow' : 'wide');\n            if (newWidthMode !== 'narrow' && newWidthMode !== 'wide') return;\n            body.setAttribute('data-width', newWidthMode);\n\n            const url = new URL(window.location);\n            url.searchParams.set('width', newWidthMode);\n            window.history.replaceState({}, '', url);\n\n            // Update the icon based on the current mode\n            const narrowIcon = widthToggleButton.querySelector('.narrow');\n            const expandIcon = widthToggleButton.querySelector('.expand');\n\n            if (newWidthMode === 'wide') {\n                expandIcon.style.display = \"none\";\n                narrowIcon.style.display = \"block\";\n            } else {\n                expandIcon.style.display = \"block\";\n                narrowIcon.style.display = \"none\";\n            }\n        }\n\n        const urlParams = new URLSearchParams(window.location.search);\n        const theme = urlParams.get('theme');\n        const width = urlParams.get('width');\n\n        if (theme) toggleDarkMode(theme);\n        if (width) toggleWidthMode(width);\n\n        document.querySelector('.toggle').addEventListener('click', () => toggleDarkMode());\n        document.querySelector('.width-toggle').addEventListener('click', () => toggleWidthMode());\n    <\/script>\n</body>\n\n</html>\n";
	function toUnixSeconds$1(value) {
		if (!value) return Math.floor(Date.now() / 1e3);
		const parsed = Date.parse(value);
		if (Number.isNaN(parsed)) return Math.floor(Date.now() / 1e3);
		return Math.floor(parsed / 1e3);
	}
	function asRecord(value) {
		if (!value || typeof value !== "object" || Array.isArray(value)) return null;
		return value;
	}
	function getString(value) {
		return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
	}
	function stripWrappingQuotes(value) {
		if (value.length >= 2 && value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1).trim();
		return value;
	}
	function getQuotedString(value) {
		const normalized = getString(value);
		return normalized ? stripWrappingQuotes(normalized) : null;
	}
	function getRepoDisplayName(repoUrl) {
		if (!repoUrl) return null;
		try {
			return new URL(repoUrl).pathname.replace(/^\/+|\/+$/g, "").replace(/\.git$/i, "") || repoUrl;
		} catch {
			return repoUrl;
		}
	}
	function buildCommitSummary(finding) {
		const commitAnalysis = asRecord(finding.commit_analysis);
		const commitHash = getString(commitAnalysis?.commit_hash);
		const repoUrl = getString(commitAnalysis?.repo_url) ?? getString(finding.repo_url);
		const author = getQuotedString(commitAnalysis?.author);
		const authorDate = getString(commitAnalysis?.author_date);
		if (!commitHash && !author && !authorDate) return null;
		const shortHash = commitHash ? commitHash.slice(0, 7) : null;
		const commitUrl = commitHash && repoUrl ? `${repoUrl.replace(/\/+$/g, "")}/commit/${encodeURIComponent(commitHash)}` : null;
		return [[shortHash ? commitUrl ? `[\`${shortHash}\`](${commitUrl})` : `\`${shortHash}\`` : null, authorDate].filter((value) => Boolean(value)).join(" "), author ? `by ${author}` : null].filter((value) => Boolean(value)).join("\n\n");
	}
	function buildRepositorySummary(finding) {
		const repoUrl = getString(asRecord(finding.commit_analysis)?.repo_url) ?? getString(finding.repo_url);
		const repoDisplayName = getRepoDisplayName(repoUrl);
		if (!repoDisplayName) return null;
		if (!repoUrl) return repoDisplayName;
		return `[${repoDisplayName}](${repoUrl})`;
	}
	function getTitle(finding) {
		const commitAnalysis = asRecord(finding.commit_analysis);
		return getString(commitAnalysis?.title) ?? getString(commitAnalysis?.reason) ?? getString(commitAnalysis?.description)?.split(". ")[0] ?? `Finding ${finding.hid}`;
	}
	function buildSourceUrl(finding) {
		return `${baseUrl}/codex/cloud/security/findings/${encodeURIComponent(finding.hid)}`;
	}
	function buildSummarySection(finding) {
		const commitAnalysis = asRecord(finding.commit_analysis);
		const description = getString(commitAnalysis?.description);
		const reason = getString(commitAnalysis?.reason);
		const bugsFoundOrFixed = getString(commitAnalysis?.bugs_found_or_fixed);
		const commit = buildCommitSummary(finding);
		const repository = buildRepositorySummary(finding);
		const criticality = getString(finding.criticality);
		const status = getString(finding.status);
		const lines = [
			description,
			reason && (reason !== getTitle(finding) || !description) ? `### Reason\n\n${reason}` : null,
			bugsFoundOrFixed ? `### Change impact\n\n${bugsFoundOrFixed}` : null,
			commit ? `### Commit\n\n${commit}` : null,
			repository ? `### Repository\n\n${repository}` : null,
			criticality ? `### Severity\n\n${criticality}` : null,
			status ? `### Status\n\n${status}` : null
		].filter((value) => Boolean(value));
		if (lines.length === 0) return null;
		return {
			id: "summary",
			title: "Summary",
			format: "markdown",
			content: lines.join("\n\n")
		};
	}
	function asStringList(value) {
		if (!Array.isArray(value)) return [];
		return value.map((item) => getString(item)).filter((item) => Boolean(item));
	}
	function buildMarkdownList(items) {
		if (items.length === 0) return null;
		return items.map((item) => `- ${item}`).join("\n");
	}
	function getStructuredLevelSummary(value) {
		if (typeof value === "string" && value.trim() !== "") return value.trim();
		const record = asRecord(value);
		if (!record) return null;
		const level = getString(record.level);
		const why = getString(record.why);
		if (level && why) return `${level[0].toUpperCase()}${level.slice(1)} - ${why}`;
		if (level) return `${level[0].toUpperCase()}${level.slice(1)}`;
		if (why) return why;
		return null;
	}
	function getValidationArtifactSummary(value) {
		const record = asRecord(value);
		if (!record) return getString(value);
		const fileName = getString(record.file_name);
		const description = getString(record.description);
		const downloadUrl = getString(record.download_url);
		const sizeBytes = typeof record.size_bytes === "number" ? record.size_bytes : null;
		const lines = [
			fileName ? `Artifact: ${fileName}` : null,
			description ? `Description: ${description}` : null,
			sizeBytes !== null ? `Size: ${sizeBytes} bytes` : null,
			downloadUrl ? `Download URL: ${downloadUrl}` : null
		].filter((line) => Boolean(line));
		return lines.length > 0 ? lines.join("\n") : null;
	}
	function buildValidationSection(finding) {
		const commitAnalysis = asRecord(finding.commit_analysis);
		const validation = getString(commitAnalysis?.validation_report) ?? getString(commitAnalysis?.validation_str);
		const validationRubric = getString(commitAnalysis?.validation_rubric);
		const validationArtifact = getValidationArtifactSummary(commitAnalysis?.validation_artifact);
		const parts = [
			validation,
			validationRubric ? `### Checklist\n\n${validationRubric}` : null,
			validationArtifact ? `Validation artifact: ${validationArtifact}` : null
		].filter((value) => Boolean(value));
		if (parts.length === 0) return null;
		return {
			id: "validation",
			title: "Validation",
			format: "markdown",
			content: parts.join("\n\n")
		};
	}
	function buildEvidenceSection(finding) {
		const commitAnalysis = asRecord(finding.commit_analysis);
		const evidenceBlocks = (Array.isArray(commitAnalysis?.relevant_lines) ? commitAnalysis.relevant_lines : []).map((line, index) => {
			const record = asRecord(line);
			if (!record) return null;
			const path = getString(record.path) ?? getString(record.file_path) ?? `evidence-${index + 1}`;
			const lineRange = typeof record.start_line_number === "number" && typeof record.end_line_number === "number" ? `:${record.start_line_number}-${record.end_line_number}` : "";
			const comment = getString(record.comment);
			const content = getString(record.content);
			return [
				`- \`${path}${lineRange}\``,
				comment ? `  ${comment}` : null,
				content ? `\n\`\`\`\n${content}\n\`\`\`` : null
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
		const commitAnalysis = asRecord(finding.commit_analysis);
		const attackPathAnalysis = asRecord(commitAnalysis?.attack_path_analysis);
		const attackPath = asRecord(attackPathAnalysis?.attack_path);
		const legacyAttackPath = getString(finding.attack_path);
		const narrative = getString(attackPathAnalysis?.narrative);
		const summary = getString(commitAnalysis?.attack_path_adjustment_reason) ?? getString(attackPathAnalysis?.adjustment_reason) ?? narrative;
		const assumptions = asStringList(attackPathAnalysis?.assumptions);
		const controls = asStringList(attackPathAnalysis?.controls);
		const blindspots = asStringList(attackPathAnalysis?.blindspots);
		const parts = [
			legacyAttackPath ?? summary,
			getString(attackPath?.ascii) ? `### Path\n\n\`\`\`text\n${getString(attackPath?.ascii)}\n\`\`\`` : null,
			narrative && narrative !== summary ? `### Narrative\n\n${narrative}` : null,
			getStructuredLevelSummary(attackPathAnalysis?.likelihood) ? `### Likelihood\n\n${getStructuredLevelSummary(attackPathAnalysis?.likelihood)}` : null,
			getStructuredLevelSummary(attackPathAnalysis?.impact) ? `### Impact\n\n${getStructuredLevelSummary(attackPathAnalysis?.impact)}` : null,
			buildMarkdownList(assumptions) ? `### Assumptions\n\n${buildMarkdownList(assumptions)}` : null,
			buildMarkdownList(controls) ? `### Controls\n\n${buildMarkdownList(controls)}` : null,
			buildMarkdownList(blindspots) ? `### Blindspots\n\n${buildMarkdownList(blindspots)}` : null,
			buildMarkdownList(asStringList(attackPathAnalysis?.recommendations)) ? `### Recommendations\n\n${buildMarkdownList(asStringList(attackPathAnalysis?.recommendations))}` : null
		].filter((value) => Boolean(value));
		if (parts.length === 0) return null;
		return {
			id: "attack-path",
			title: "Attack-path analysis",
			format: "markdown",
			content: parts.join("\n\n")
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
		const title = getTitle(finding);
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
			title,
			sourceUrl,
			metadata: {
				title,
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
			rawPayload: { finding }
		};
	}
	function toUnixSeconds(value) {
		if (!value) return Math.floor(Date.now() / 1e3);
		const parsed = Date.parse(value);
		if (Number.isNaN(parsed)) return Math.floor(Date.now() / 1e3);
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
				const path = item.trim();
				return path === "" ? null : `- ${path}`;
			}
			if (item && typeof item === "object" && "path" in item && typeof item.path === "string") {
				const path = item.path.trim();
				if (path === "") return null;
				return `- ${path}${"focus_reason" in item && typeof item.focus_reason === "string" && item.focus_reason.trim() !== "" ? `: ${item.focus_reason.trim()}` : ""}`;
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
		const title = bundle.repository.repository_full_name || bundle.repoId;
		const sourceUrl = `${baseUrl}/codex/cloud/security/scans/${encodeURIComponent(bundle.repoId)}`;
		const sections = [
			buildStatusSection(bundle),
			buildRepositorySection(bundle),
			buildScannedCommitsSection(bundle),
			buildThreatModelSection(bundle),
			buildFocusFilesSection(bundle)
		].filter((value) => Boolean(value));
		return {
			kind: "security-scan",
			title,
			sourceUrl,
			metadata: {
				title,
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
	function nonNullable(x) {
		return x != null;
	}
	function onloadSafe(fn) {
		if (document.readyState === "complete") fn();
		else window.addEventListener("load", fn);
	}
	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	function dateStr(date = new Date()) {
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
	}
	function timestamp() {
		return new Date().toISOString().replace(/:/g, "-").replace(/\..+/, "");
	}
	function getColorScheme() {
		return document.documentElement.style.getPropertyValue("color-scheme");
	}
	function unixTimestampToISOString(timestamp) {
		if (!timestamp) return "";
		return new Date(timestamp * 1e3).toISOString();
	}
	function jsonlStringify(list) {
		return list.map((msg) => JSON.stringify(msg)).join("\n");
	}
	function escapeHtml$1(input) {
		return input.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;");
	}
	function escapeSecurityMarkdownSource(input) {
		return input.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
	}
	function stripAsciiControlAndWhitespace(input) {
		return Array.from(input).filter((char) => {
			const codePoint = char.charCodeAt(0);
			if (codePoint <= 31 || codePoint === 127) return false;
			return char.trim().length > 0;
		}).join("");
	}
	function isUnsafeUrl(url) {
		const normalized = stripAsciiControlAndWhitespace(url.replaceAll(/&#(?:x3a|58|X3A|X58);/g, ":")).toLowerCase();
		return normalized.startsWith("javascript:") || normalized.startsWith("vbscript:") || normalized.startsWith("data:text/html");
	}
	function sanitizeRenderedSecurityHtml(input) {
		return input.replace(/<img\b[^>]*>/gi, "").replace(/\s(href|src)=("([^"]*)"|'([^']*)')/gi, (match, attribute, _quotedValue, doubleQuotedValue, singleQuotedValue) => {
			const value = typeof doubleQuotedValue === "string" ? doubleQuotedValue : singleQuotedValue;
			if (!value || !isUnsafeUrl(value)) return match;
			return ` ${attribute}="#"`;
		});
	}
	function getPreferredConfiguredScanIdFromCurrentPage(repoId) {
		if (typeof globalThis.performance?.getEntriesByType !== "function") return null;
		const now = typeof globalThis.performance.now === "function" ? globalThis.performance.now() : null;
		const entries = globalThis.performance.getEntriesByType("resource");
		for (let index = entries.length - 1; index >= 0; index -= 1) {
			const entry = entries[index];
			if (!("name" in entry) || typeof entry.name !== "string") continue;
			if (now !== null && typeof entry.startTime === "number" && now - entry.startTime > 3e4) continue;
			const match = entry.name.match(/\/backend-api\/aardvark\/scan_configurations\/([^/?#]+)(?:\/stats)?(?:[?#].*)?$/i);
			if (!match) continue;
			const configuredScanId = decodeURIComponent(match[1]);
			if (configuredScanId.endsWith(`:${repoId}`) || configuredScanId === repoId) return configuredScanId;
		}
		return null;
	}
	function resolveSecurityMetaValue(value, document) {
		return value.replace("{title}", document.metadata.title).replace("{date}", dateStr()).replace("{timestamp}", timestamp()).replace("{source}", document.metadata.sourceUrl).replace("{create_time}", unixTimestampToISOString(document.metadata.createTime)).replace("{update_time}", unixTimestampToISOString(document.metadata.updateTime)).replace("{chat_id}", "").replace("{model}", "").replace("{model_name}", "").replace("{mode_name}", "");
	}
	function escapeYamlDoubleQuotedScalar(input) {
		return input.replaceAll("\\", "\\\\").replaceAll("\"", "\\\"").replaceAll("\r", "\\r").replaceAll("\n", "\\n");
	}
	function normalizeSingleLineText(input) {
		return input.replaceAll(/[\r\n]+/g, " ").trim();
	}
	function escapeMarkdownInlineText(input) {
		return input.replaceAll(/([\\`*_{}[\]()#+\-!.>])/g, "\\$1");
	}
	function buildSecurityFrontMatter(document, metaList) {
		const entries = metaList?.filter((item) => !!item.name).map((item) => `"${escapeYamlDoubleQuotedScalar(item.name)}": "${escapeYamlDoubleQuotedScalar(resolveSecurityMetaValue(item.value, document))}"`) ?? [];
		return entries.length > 0 ? `---\n${entries.join("\n")}\n---\n\n` : "";
	}
	function buildSecurityDetailsHtml(document, metaList) {
		const entries = metaList?.filter((item) => !!item.name).map((item) => [item.name, resolveSecurityMetaValue(item.value, document)]) ?? [];
		return entries.length > 0 ? `<details>
    <summary>Metadata</summary>
    <div class="metadata_container">
        ${entries.map(([key, value]) => `<div class="metadata_item"><div>${escapeHtml$1(key)}</div><div>${escapeHtml$1(value)}</div></div>`).join("\n")}
    </div>
</details>` : "";
	}
	function buildSecuritySectionsMarkdown(document) {
		return document.sections.map((section) => `## ${section.title}\n\n${section.content}`).join("\n\n");
	}
	async function loadCurrentSecurityDocument() {
		const context = getPageContext();
		switch (context.kind) {
			case "security-finding": return normalizeSecurityFindingDocument(await fetchSecurityFinding(context.findingId));
			case "security-scan": {
				const preferredConfiguredScanId = getPreferredConfiguredScanIdFromCurrentPage(context.repoId);
				return normalizeSecurityScanDocument(await fetchResolvedSecurityScanByRepoId(context.repoId, { preferredConfiguredScanId }));
			}
			default: return null;
		}
	}
	function securityDocumentToText(document) {
		const sections = document.sections.map((section) => `## ${section.title}\n\n${section.content}`).join("\n\n");
		return `Title: ${normalizeSingleLineText(document.title)}\nSource: ${document.sourceUrl}\n\n${sections}`.trim();
	}
	function securityDocumentToMarkdown(document, metaList) {
		const frontMatter = buildSecurityFrontMatter(document, metaList);
		const content = buildSecuritySectionsMarkdown(document);
		return `${frontMatter}# ${escapeMarkdownInlineText(normalizeSingleLineText(document.title))}\n\n${content}`.trim();
	}
	function securityDocumentToHtml(document, metaList) {
		const detailsHtml = buildSecurityDetailsHtml(document, metaList);
		const sectionsHtml = document.sections.map((section) => {
			const contentHtml = sanitizeRenderedSecurityHtml(toHtml(fromMarkdown(escapeSecurityMarkdownSource(section.content))));
			return `<section id="${escapeHtml$1(section.id)}"><h2>${escapeHtml$1(section.title)}</h2>${contentHtml}</section>`;
		}).join("\n");
		const lang = globalThis.document?.documentElement.lang || "en";
		const theme = getColorScheme() || "light";
		const escapedTitle = escapeHtml$1(normalizeSingleLineText(document.title));
		const escapedSourceUrl = escapeHtml$1(document.sourceUrl);
		return template_default.replaceAll("{{title}}", escapedTitle).replaceAll("{{date}}", dateStr()).replaceAll("{{time}}", new Date().toISOString()).replaceAll("{{source}}", escapedSourceUrl).replaceAll("{{lang}}", escapeHtml$1(lang)).replaceAll("{{theme}}", escapeHtml$1(theme)).replaceAll("{{avatar}}", "data:,").replaceAll("{{details}}", detailsHtml).replaceAll("{{content}}", `<article class="conversation-item"><div class="conversation-content-wrapper"><div class="conversation-content"><h1>${escapedTitle}</h1>${sectionsHtml}</div></div></article>`);
	}
	function getSecurityFileNameOptions(document) {
		return {
			title: document.metadata.title,
			createTime: document.metadata.createTime,
			updateTime: document.metadata.updateTime
		};
	}
	function securityDocumentToJson(document) {
		return JSON.stringify(document.rawPayload);
	}
	function getSecurityUnsupportedMessage() {
		if (getPageContext().kind === "security-findings-list") return "Security findings list export is not supported yet.";
		return `Export is not supported on ${baseUrl}${location.pathname}.`;
	}
	var INTERNAL_CONTENT_TYPES = new Set([
		"thoughts",
		"reasoning_recap",
		"model_editable_context"
	]);
	var THINKING_CONTENT_TYPES = new Set(["thoughts", "reasoning_recap"]);
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
	var UI_TOKEN_REGEX = /\uE200([a-z0-9_]+)\uE202([\s\S]*?)\uE201/giu;
	var UNICODE_SPACE_REGEX = /[\u00A0\u202F\u2007\u2060]/gu;
	var UNICODE_HYPHEN_REGEX = /[\u2010-\u2015\u2212]/gu;
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
		return Array.from(new Set([normalizeReferenceText(matchedText), normalizeReferenceText(stripUiTokens(matchedText))])).filter(Boolean);
	}
	function replaceReferenceTokens(input, matchedText, replacement) {
		const matchedTokens = getReferenceTokens(matchedText);
		let output = input;
		for (const token of matchedTokens) output = output.replaceAll(token, replacement);
		return output;
	}
	function parseWidgetState(widgetState) {
		if (!widgetState) return null;
		if (typeof widgetState === "string") try {
			const parsed = JSON.parse(widgetState);
			if (parsed && typeof parsed === "object") return parsed;
		} catch {
			return null;
		}
		if (typeof widgetState === "object") return widgetState;
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
		const reportMessage = parseWidgetState(message?.metadata?.chatgpt_sdk?.widget_state)?.report_message;
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
	function getExecutionOutputText(content) {
		return stripUiTokens(content.text || "");
	}
	function getExportAuthorLabel(message) {
		if (isThinkingMessage(message)) return "ChatGPT (Thinking)";
		if (isAnalysisCodeMessage(message)) return "ChatGPT (Analysis)";
		if (isAnalysisExecutionOutput(message)) {
			if (message.author.name === "python") return "Python (Analysis)";
			return `Plugin${message.author.name ? ` (${message.author.name})` : ""} (Analysis)`;
		}
		switch (message.author.role) {
			case "assistant": return "ChatGPT";
			case "user": return "You";
			case "tool": return `Plugin${message.author.name ? ` (${message.author.name})` : ""}`;
			default: return message.author.role;
		}
	}
	var DEFAULT_SANITIZE_TEXT_OPTIONS = {
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
	var ODD_LINE_BREAKS_REGEX = /[\u0085\u2028\u2029]/gu;
	var ELLIPSIS_REGEX = /\u2026/gu;
	var DASHES_REGEX = /[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/gu;
	var SINGLE_QUOTES_REGEX = /[\u2018\u2019\u201A\u201B\u2032\u02BC\uFF07]/gu;
	var DOUBLE_QUOTES_REGEX = /[\u201C\u201D\u201E\u201F\u2033\u00AB\u00BB\u301D-\u301F\uFF02]/gu;
	var ODD_SPACES_REGEX = /[\u00A0\u202F\u2000-\u200A\u205F\u3000]/gu;
	var SPACE_RUNS_REGEX = / {2,}/gu;
	var SOFT_HYPHEN_REGEX = /\u00AD/gu;
	var ZERO_WIDTH_REGEX = /(?:\u200B|\u200C|\u200D|\u2060|\uFEFF)/gu;
	var ZERO_WIDTH_NO_ZWJ_REGEX = /(?:\u200B|\u200C|\u2060|\uFEFF)/gu;
	var BIDI_CONTROLS_REGEX = /[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/gu;
	var MARKDOWN_LINK_URL_REGEX = /(\[[^\]]+\]\(\s*<?)([^>\s)]+)(>?(?:\s+(?:"[^"]*"|'[^']*'|\([^)]+\)))?\s*\))/gu;
	var CHATGPT_UTM_SOURCE_AT_END_REGEX = /(?:\?|&)utm_source=chatgpt\.com$/;
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
		for (let index = 0; index < input.length; index++) {
			if (!isRemovableC0Control(input.charCodeAt(index))) continue;
			if (segments === void 0) segments = [];
			if (segmentStart < index) segments.push(input.slice(segmentStart, index));
			segmentStart = index + 1;
		}
		if (segments === void 0) return input;
		if (segmentStart < input.length) segments.push(input.slice(segmentStart));
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
		if (resolved.normalization !== "none") output = output.normalize(resolved.normalization);
		if (resolved.normalizeLineBreaks) {
			output = standardizeLineBreaks(output);
			output = output.replaceAll(ODD_LINE_BREAKS_REGEX, "\n");
		}
		if (resolved.replaceEllipsis) output = output.replaceAll(ELLIPSIS_REGEX, "...");
		if (resolved.replaceDashes) output = output.replaceAll(DASHES_REGEX, "-");
		if (resolved.replaceQuotes) output = output.replaceAll(SINGLE_QUOTES_REGEX, "'").replaceAll(DOUBLE_QUOTES_REGEX, "\"");
		if (resolved.normalizeSpaces) output = output.replaceAll(ODD_SPACES_REGEX, " ");
		if (resolved.collapseSpaces) output = output.replaceAll(SPACE_RUNS_REGEX, " ");
		if (resolved.removeSoftHyphen) output = output.replaceAll(SOFT_HYPHEN_REGEX, "");
		if (resolved.removeZeroWidth) output = output.replaceAll(resolved.preserveEmojiZWJ ? ZERO_WIDTH_NO_ZWJ_REGEX : ZERO_WIDTH_REGEX, "");
		if (resolved.removeBidiControls) output = output.replaceAll(BIDI_CONTROLS_REGEX, "");
		if (resolved.removeC0Controls) output = removeC0ControlCharacters(output);
		if (resolved.stripChatGptUtmSourceFromMarkdownLinks) output = stripChatGptUtmSourceFromMarkdownLinks(output);
		return output;
	}
	async function exportToText() {
		const pageContext = getPageContext();
		if (pageContext.kind === "security-finding" || pageContext.kind === "security-scan") {
			const document = await loadCurrentSecurityDocument();
			if (!document) {
				alert(getSecurityUnsupportedMessage());
				return false;
			}
			await copyToClipboard(standardizeLineBreaks(securityDocumentToText(document)));
			return true;
		}
		if (pageContext.kind !== "conversation") {
			alert(getSecurityUnsupportedMessage());
			return false;
		}
		if (!checkIfConversationStarted()) {
			alert(i18n_default.t("Please start a conversation first"));
			return false;
		}
		const chatId = await getCurrentChatId();
		const rawConversation = await fetchConversation(chatId, false);
		await inlineGeneratedTextFiles(rawConversation, { conversationId: rawConversation.conversation_id ?? rawConversation.id ?? chatId });
		const { conversationNodes } = processConversation(rawConversation);
		await copyToClipboard(standardizeLineBreaks(conversationNodes.map(({ message }) => transformMessageForTextExport(message)).filter(Boolean).join("\n\n")));
		return true;
	}
	var LatexRegex$1 = /(\s\$\$.+\$\$\s|\s\$.+\$\s|\\\[.+\\\]|\\\(.+\\\))|(^\$$[\S\s]+^\$$)|(^\$\$[\S\s]+^\$\$$)/gm;
	function transformMessageForTextExport(message) {
		const exportMessage = resolveExportMessage(message);
		if (!exportMessage?.content) return null;
		if (!shouldIncludeMessageForExport(exportMessage)) return null;
		const author = getExportAuthorLabel(exportMessage);
		let content = transformContent$2(exportMessage.content, exportMessage.metadata);
		const matches = content.match(LatexRegex$1);
		if (matches) {
			let index = 0;
			content = content.replace(LatexRegex$1, () => {
				return `╬${index++}╬`;
			});
		}
		if (exportMessage.author.role === "assistant") {
			content = transformContentReferences$2(content, exportMessage.metadata);
			content = transformFootNotes$2(content, exportMessage.metadata);
		}
		if (exportMessage.author.role === "assistant" && content) content = reformatContent(content);
		if (matches) content = content.replace(/╬(\d+)╬/g, (_, index) => {
			return matches[+index];
		});
		content = sanitizeLLMText(content);
		return `${author}:\n${content}`;
	}
	function transformContent$2(content, metadata) {
		switch (content.content_type) {
			case "text": return stripUiTokens(content.parts?.join("\n") || "");
			case "code": return stripUiTokens(content.text || "");
			case "execution_output": {
				const images = getExecutionOutputImages(metadata);
				if (images.length > 0) return images.map(() => "[image]").join("\n");
				return getExecutionOutputText(content);
			}
			case "tether_quote": return `> ${stripUiTokens(content.title || content.text || "")}`;
			case "tether_browsing_code": return "";
			case "tether_browsing_display": {
				const metadataList = metadata?._cite_metadata?.metadata_list;
				if (Array.isArray(metadataList) && metadataList.length > 0) return metadataList.map(({ title, url }) => `> [${title}](${url})`).join("\n");
				return "";
			}
			case "multimodal_text": return content.parts?.map((part) => {
				if (typeof part === "string") return stripUiTokens(part);
				if (part.content_type === "image_asset_pointer") return "[image]";
				if (part.content_type === "audio_transcription") return `[audio] ${stripUiTokens(part.text)}`;
				if (part.content_type === "audio_asset_pointer") return null;
				if (part.content_type === "real_time_user_audio_video_asset_pointer") return null;
				return "[Unsupported multimodal content]";
			}).join("\n") || "";
			default: return "[Unsupported Content]";
		}
	}
	function reformatContent(input) {
		const root = fromMarkdown(input);
		flatMap(root, (item) => {
			if (item.type === "strong") return item.children;
			if (item.type === "emphasis") return item.children;
			return [item];
		});
		const result = toMarkdown(root);
		if (result.startsWith("\\[") && input.startsWith("[")) return result.slice(1);
		return result;
	}
	function transformContentReferences$2(input, metadata) {
		const contentRefs = metadata?.content_references;
		if (!contentRefs || contentRefs.length === 0) return input;
		const sortedRefs = [...contentRefs].sort((a, b) => (b.matched_text?.length || 0) - (a.matched_text?.length || 0));
		let output = normalizeReferenceText(input);
		for (const ref of sortedRefs) {
			if (!ref.matched_text) continue;
			switch (ref.type) {
				case "sources_footnote": break;
				default: output = replaceReferenceTokens(output, ref.matched_text, ref.alt || "");
			}
		}
		return output;
	}
	function transformFootNotes$2(input, metadata) {
		return input.replace(/【(\d+)†\((.+?)\)】/g, (match, citeIndex, _evidenceText) => {
			if (metadata?.citations?.find((cite) => cite.metadata?.extra?.cited_message_idx === +citeIndex)) return "";
			return match;
		});
	}
	function getExportCapabilities(context = getPageContext()) {
		switch (context.kind) {
			case "conversation": return {
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
			case "security-finding": return {
				canExportText: true,
				canExportPng: true,
				canExportMarkdown: true,
				canExportHtml: true,
				canExportJson: true,
				canExportTavern: false,
				canExportOoba: false,
				canExportAll: true,
				historyDisabledApplies: false,
				copyShortcutEnabled: false
			};
			case "security-scan": return {
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
			case "security-findings-list": return {
				canExportText: false,
				canExportPng: false,
				canExportMarkdown: false,
				canExportHtml: false,
				canExportJson: false,
				canExportTavern: false,
				canExportOoba: false,
				canExportAll: true,
				historyDisabledApplies: false,
				copyShortcutEnabled: false
			};
			case "unsupported": return {
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
	var EDITABLE_SELECTOR = "input, textarea, select, [contenteditable], [role=\"textbox\"]";
	var MODIFIER_ORDER = [
		"Mod",
		"Shift",
		"Alt"
	];
	var MODIFIER_ALIASES = {
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
	var DEFAULT_COPY_TEXT_SHORTCUT$1 = "Mod+Shift+E";
	function isMacPlatform(platform) {
		if (!platform) return false;
		return /mac|iphone|ipad|ipod/i.test(platform);
	}
	function isEditableTarget(target) {
		if (!target || typeof target !== "object") return false;
		if (typeof Element !== "undefined" && target instanceof Element) return Boolean(target.closest(EDITABLE_SELECTOR));
		if ("closest" in target && typeof target.closest === "function") return Boolean(target.closest(EDITABLE_SELECTOR));
		return false;
	}
	function parseShortcut(shortcut) {
		if (typeof shortcut !== "string") return null;
		const rawParts = shortcut.split("+").map((part) => part.trim()).filter(Boolean);
		if (rawParts.length < 2) return null;
		const key = rawParts[rawParts.length - 1].toUpperCase();
		if (!/^[A-Z]$/.test(key)) return null;
		const modifiers = new Set();
		for (const part of rawParts.slice(0, -1)) {
			const mapped = MODIFIER_ALIASES[part.toLowerCase()];
			if (!mapped) return null;
			modifiers.add(mapped);
		}
		if (!modifiers.has("Mod") || !modifiers.has("Shift")) return null;
		return {
			key,
			modifiers
		};
	}
	function formatShortcut(parsed) {
		return [...MODIFIER_ORDER.filter((modifier) => parsed.modifiers.has(modifier)), parsed.key].join("+");
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
		if (!requiresMod) return !(event.metaKey || event.ctrlKey);
		if (isMac) return event.metaKey && !event.ctrlKey;
		return event.ctrlKey && !event.metaKey;
	}
	function isEditableContext(target, activeElement) {
		return isEditableTarget(target) || isEditableTarget(activeElement);
	}
	var DEFAULT_FILENAME_FORMAT = "ChatGPT-{title}";
	var DEFAULT_EXPORT_ALL_LIMIT = 1e3;
	var DEFAULT_COPY_TEXT_SHORTCUT = "Mod+Shift+E";
	var DEFAULT_EXPORT_META_LIST = [{
		name: "title",
		value: "{title}"
	}, {
		name: "source",
		value: "{source}"
	}];
	var DEFAULT_EXPORTER_SETTINGS = {
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
	var listeners = new Set();
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
		if (typeof value !== "number" || !Number.isFinite(value)) return DEFAULT_EXPORT_ALL_LIMIT;
		return Math.round(Math.min(2e4, Math.max(100, value)) / 100) * 100;
	}
	function sanitizeCopyTextShortcut(value) {
		return normalizeCopyTextShortcut(value, DEFAULT_EXPORTER_SETTINGS.copyTextShortcut);
	}
	function sanitizeExportMetaList(value) {
		if (!Array.isArray(value)) return cloneExportMetaList(DEFAULT_EXPORT_META_LIST);
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
	var cachedSettings = null;
	function getSettings() {
		if (!cachedSettings) cachedSettings = readStoredSettings();
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
		if (settings.enableTimestamp) document.body.setAttribute("data-time-format", settings.timeStamp24H ? "24" : "12");
		else document.body.removeAttribute("data-time-format");
	}
	var COPY_TEXT_SHORTCUT_SUCCESS_EVENT = "ce:copy-text-success";
	var shortcutRegistered = false;
	var settingsSubscribed = false;
	var activeShortcutSettings = {
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
	function isShortcutDebugEnabled() {
		return false;
	}
	function logShortcut(reason, event) {
		if (!isShortcutDebugEnabled()) return;
		const target = event.target instanceof Element ? event.target.tagName : null;
		const active = document.activeElement?.tagName ?? null;
		console.debug("[chatgpt-exporter] copy shortcut", {
			reason,
			shortcut: activeShortcutSettings.shortcut,
			key: event.key,
			meta: event.metaKey,
			ctrl: event.ctrlKey,
			shift: event.shiftKey,
			alt: event.altKey,
			target,
			active
		});
	}
	async function handleShortcutKeydown(event, isMac) {
		if (event.repeat) {
			logShortcut("skip:repeat", event);
			return;
		}
		if (event.isComposing) {
			logShortcut("skip:composing", event);
			return;
		}
		if (!activeShortcutSettings.enabled) {
			logShortcut("skip:disabled", event);
			return;
		}
		if (!matchesExportCopyShortcut(event, isMac, activeShortcutSettings.shortcut)) {
			logShortcut("skip:mismatch", event);
			return;
		}
		if (isEditableContext(event.target, document.activeElement)) {
			logShortcut("skip:editable-context", event);
			return;
		}
		if (!getExportCapabilities().copyShortcutEnabled) {
			logShortcut("skip:unsupported-page", event);
			return;
		}
		event.preventDefault();
		event.stopPropagation();
		logShortcut("run:start", event);
		if (await exportToText()) {
			window.dispatchEvent(new CustomEvent(COPY_TEXT_SHORTCUT_SUCCESS_EVENT));
			logShortcut("run:success", event);
		} else logShortcut("run:no-op", event);
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
			handleShortcutKeydown(event, isMac).catch((error) => {
				console.error("Copy shortcut failed:", error);
			});
		});
		shortcutRegistered = true;
	}
	function t$2(key, fallback) {
		const value = i18n_default.t(key);
		return value === key ? fallback : value;
	}
	function createPanelTemplate() {
		const languageOptions = LOCALES.map((locale) => `<option value="${locale.code}">${locale.name}</option>`).join("");
		return `
<div class="ce-overlay" data-ce-role="overlay">
  <div class="ce-panel" role="dialog" aria-modal="true" aria-labelledby="ce-settings-title">
    <header class="ce-header">
      <h2 id="ce-settings-title">${t$2("Exporter Settings", "Exporter Settings")}</h2>
      <button type="button" class="ce-icon-btn" data-ce-role="close" aria-label="${t$2("Close", "Close")}">×</button>
    </header>

    <div class="ce-body">
      <section class="ce-group">
        <label class="ce-row">
          <span>${t$2("Language", "Language")}</span>
          <select data-ce-role="language">${languageOptions}</select>
        </label>

        <label class="ce-row">
          <span>${t$2("File Name", "File Name")}</span>
          <input type="text" data-ce-role="format" placeholder="ChatGPT-{title}" />
        </label>

        <label class="ce-row">
          <span>${t$2("Export All Limit", "Export All Limit")}</span>
          <input type="number" min="100" max="20000" step="100" data-ce-role="export-all-limit" />
        </label>
      </section>

      <section class="ce-group">
        <label class="ce-row ce-toggle-row">
          <span>${t$2("Conversation Timestamp", "Conversation Timestamp")}</span>
          <input type="checkbox" data-ce-role="enable-timestamp" />
        </label>

        <div class="ce-subgroup" data-ce-role="timestamp-options">
          <label class="ce-row ce-toggle-row">
            <span>${t$2("Use 24-hour format", "Use 24-hour format")}</span>
            <input type="checkbox" data-ce-role="timestamp-24h" />
          </label>
          <label class="ce-row ce-toggle-row">
            <span>${t$2("Enable on HTML", "Enable on HTML")}</span>
            <input type="checkbox" data-ce-role="timestamp-html" />
          </label>
          <label class="ce-row ce-toggle-row">
            <span>${t$2("Enable on Markdown", "Enable on Markdown")}</span>
            <input type="checkbox" data-ce-role="timestamp-markdown" />
          </label>
        </div>
      </section>

      <section class="ce-group">
        <label class="ce-row ce-toggle-row">
          <span>${t$2("Export Metadata", "Export Metadata")}</span>
          <input type="checkbox" data-ce-role="enable-meta" />
        </label>

        <div class="ce-subgroup" data-ce-role="meta-options">
          <div class="ce-meta-list" data-ce-role="meta-list"></div>
          <button type="button" class="ce-secondary-btn" data-ce-role="meta-add">+ ${t$2("Add", "Add")}</button>
        </div>
      </section>

      <section class="ce-group">
        <label class="ce-row ce-toggle-row">
          <span>${t$2("Enable Copy Text Shortcut", "Enable Copy Text Shortcut")}</span>
          <input type="checkbox" data-ce-role="enable-copy-text-shortcut" />
        </label>

        <div class="ce-subgroup" data-ce-role="shortcut-options">
          <label class="ce-row">
            <span>${t$2("Copy Text Shortcut", "Copy Text Shortcut")}</span>
            <input type="text" data-ce-role="copy-text-shortcut" placeholder="Mod+Shift+E" />
          </label>
          <p class="ce-help">
            ${t$2("Shortcut Conflict Help", "Some browser and extension shortcuts override page shortcuts. If this combo does not trigger, choose a different one.")}
          </p>
        </div>
      </section>
    </div>

    <footer class="ce-footer">
      <button type="button" class="ce-secondary-btn" data-ce-role="reset">${t$2("Reset", "Reset")}</button>
      <span class="ce-spacer"></span>
      <button type="button" class="ce-secondary-btn" data-ce-role="cancel">${t$2("Cancel", "Cancel")}</button>
      <button type="button" class="ce-primary-btn" data-ce-role="save">${t$2("Save", "Save")}</button>
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
			const element = shadow.querySelector(selector);
			if (!element) throw new Error(`Missing settings panel element: ${selector}`);
			return element;
		};
		return {
			backdrop: query("[data-ce-role=\"overlay\"]"),
			closeButton: query("[data-ce-role=\"close\"]"),
			cancelButton: query("[data-ce-role=\"cancel\"]"),
			saveButton: query("[data-ce-role=\"save\"]"),
			resetButton: query("[data-ce-role=\"reset\"]"),
			languageSelect: query("[data-ce-role=\"language\"]"),
			formatInput: query("[data-ce-role=\"format\"]"),
			exportAllLimitInput: query("[data-ce-role=\"export-all-limit\"]"),
			enableTimestampInput: query("[data-ce-role=\"enable-timestamp\"]"),
			timeStamp24HInput: query("[data-ce-role=\"timestamp-24h\"]"),
			enableTimestampHTMLInput: query("[data-ce-role=\"timestamp-html\"]"),
			enableTimestampMarkdownInput: query("[data-ce-role=\"timestamp-markdown\"]"),
			enableMetaInput: query("[data-ce-role=\"enable-meta\"]"),
			enableCopyTextShortcutInput: query("[data-ce-role=\"enable-copy-text-shortcut\"]"),
			copyTextShortcutInput: query("[data-ce-role=\"copy-text-shortcut\"]"),
			timestampOptions: query("[data-ce-role=\"timestamp-options\"]"),
			metaOptions: query("[data-ce-role=\"meta-options\"]"),
			shortcutOptions: query("[data-ce-role=\"shortcut-options\"]"),
			metaList: query("[data-ce-role=\"meta-list\"]"),
			addMetaButton: query("[data-ce-role=\"meta-add\"]")
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
	var activePanel = null;
	function t$1(key, fallback) {
		const value = i18n_default.t(key);
		return value === key ? fallback : value;
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
			language: getStoredLanguage() ?? i18n_default.language
		};
	}
	function renderMetaList(elements, state) {
		elements.metaList.innerHTML = "";
		state.settings.exportMetaList.forEach((meta, index) => {
			const row = document.createElement("div");
			row.className = "ce-meta-item";
			const nameInput = document.createElement("input");
			nameInput.type = "text";
			nameInput.value = meta.name;
			nameInput.placeholder = "name";
			nameInput.addEventListener("input", () => {
				state.settings.exportMetaList[index] = {
					...state.settings.exportMetaList[index],
					name: nameInput.value
				};
			});
			const valueInput = document.createElement("input");
			valueInput.type = "text";
			valueInput.value = meta.value;
			valueInput.placeholder = "value";
			valueInput.addEventListener("input", () => {
				state.settings.exportMetaList[index] = {
					...state.settings.exportMetaList[index],
					value: valueInput.value
				};
			});
			const removeButton = document.createElement("button");
			removeButton.type = "button";
			removeButton.className = "ce-remove-btn";
			removeButton.textContent = t$1("Remove", "Remove");
			removeButton.addEventListener("click", () => {
				state.settings.exportMetaList = state.settings.exportMetaList.filter((_, currentIndex) => currentIndex !== index);
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
		return Math.round(Math.min(2e4, Math.max(100, parsed)) / 100) * 100;
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
			state.settings.exportMetaList = [...state.settings.exportMetaList, {
				name: "",
				value: ""
			}];
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
			i18n_default.changeLanguage(state.language);
			closeSettingsPanel();
		});
		elements.cancelButton.addEventListener("click", () => {
			closeSettingsPanel();
		});
		elements.closeButton.addEventListener("click", () => {
			closeSettingsPanel();
		});
		elements.backdrop.addEventListener("click", (event) => {
			if (event.target === elements.backdrop) closeSettingsPanel();
		});
	}
	function openSettingsPanel() {
		if (activePanel && activePanel.host.isConnected) return;
		activePanel = null;
		const host = document.createElement("div");
		const shadow = host.attachShadow({ mode: "open" });
		const state = createPanelState();
		const elements = buildSettingsPanelView(shadow);
		applyStateToForm(elements, state);
		wirePanelEvents(elements, state);
		const keydownHandler = (event) => {
			if (event.key === "Escape") closeSettingsPanel();
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
	var registered = false;
	function registerSettingsMenuCommand() {
		if (registered) return;
		const label = i18n_default.t("Exporter Settings");
		if (typeof _GM_registerMenuCommand === "function") {
			_GM_registerMenuCommand(label, () => {
				openSettingsPanel();
			});
			registered = true;
			return;
		}
		if (_GM && typeof _GM.registerMenuCommand === "function") {
			_GM.registerMenuCommand(label, () => {
				openSettingsPanel();
			});
			registered = true;
		}
	}
	typeof window !== "undefined" && window.document && window.document.createElement;
	function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
		return function handleEvent(event) {
			originalEventHandler?.(event);
			if (checkForDefaultPrevented === false || !event.defaultPrevented) return ourEventHandler?.(event);
		};
	}
	init_compat_module();
	function setRef(ref, value) {
		if (typeof ref === "function") return ref(value);
		else if (ref !== null && ref !== void 0) ref.current = value;
	}
	function composeRefs(...refs) {
		return (node) => {
			let hasCleanup = false;
			const cleanups = refs.map((ref) => {
				const cleanup = setRef(ref, node);
				if (!hasCleanup && typeof cleanup == "function") hasCleanup = true;
				return cleanup;
			});
			if (hasCleanup) return () => {
				for (let i = 0; i < cleanups.length; i++) {
					const cleanup = cleanups[i];
					if (typeof cleanup == "function") cleanup();
					else setRef(refs[i], null);
				}
			};
		};
	}
	function useComposedRefs(...refs) {
		return q$1(composeRefs(...refs), refs);
	}
	init_preact_module();
	var f$1 = 0;
	Array.isArray;
	function u$1(e, t, n, o, i, u) {
		t || (t = {});
		var a, c, p = t;
		if ("ref" in p) for (c in p = {}, t) "ref" == c ? a = t[c] : p[c] = t[c];
		var l = {
			type: e,
			props: p,
			key: n,
			ref: a,
			__k: null,
			__: null,
			__b: 0,
			__e: null,
			__c: null,
			constructor: void 0,
			__v: --f$1,
			__i: -1,
			__u: 0,
			__source: i,
			__self: u
		};
		if ("function" == typeof e && (a = e.defaultProps)) for (c in a) void 0 === p[c] && (p[c] = a[c]);
		return l$2.vnode && l$2.vnode(l), l;
	}
	init_compat_module();
	function createContext2(rootComponentName, defaultContext) {
		const Context = X$1(defaultContext);
		const Provider = (props) => {
			const { children, ...context } = props;
			const value = T$1(() => context, Object.values(context));
			return u$1(Context.Provider, {
				value,
				children
			});
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
			const BaseContext = X$1(defaultContext);
			const index = defaultContexts.length;
			defaultContexts = [...defaultContexts, defaultContext];
			const Provider = (props) => {
				const { scope, children, ...context } = props;
				const Context = scope?.[scopeName]?.[index] || BaseContext;
				const value = T$1(() => context, Object.values(context));
				return u$1(Context.Provider, {
					value,
					children
				});
			};
			Provider.displayName = rootComponentName + "Provider";
			function useContext2(consumerName, scope) {
				const context = x$1(scope?.[scopeName]?.[index] || BaseContext);
				if (context) return context;
				if (defaultContext !== void 0) return defaultContext;
				throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
			}
			return [Provider, useContext2];
		}
		const createScope = () => {
			const scopeContexts = defaultContexts.map((defaultContext) => {
				return X$1(defaultContext);
			});
			return function useScope(scope) {
				const contexts = scope?.[scopeName] || scopeContexts;
				return T$1(() => ({ [`__scope${scopeName}`]: {
					...scope,
					[scopeName]: contexts
				} }), [scope, contexts]);
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
					const currentScope = useScope(overrideScopes)[`__scope${scopeName}`];
					return {
						...nextScopes2,
						...currentScope
					};
				}, {});
				return T$1(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
			};
		};
		createScope.scopeName = baseScope.scopeName;
		return createScope;
	}
	init_compat_module();
	var useLayoutEffect2 = globalThis?.document ? _ : () => {};
	init_compat_module();
	var useReactId = compat_module_exports[" useId ".trim().toString()] || (() => void 0);
	var count$1 = 0;
	function useId(deterministicId) {
		const [id, setId] = d$1(useReactId());
		useLayoutEffect2(() => {
			if (!deterministicId) setId((reactId) => reactId ?? String(count$1++));
		}, [deterministicId]);
		return deterministicId || (id ? `radix-${id}` : "");
	}
	init_compat_module();
	var useInsertionEffect = compat_module_exports[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
	function useControllableState({ prop, defaultProp, onChange = () => {}, caller }) {
		const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
			defaultProp,
			onChange
		});
		const isControlled = prop !== void 0;
		const value = isControlled ? prop : uncontrolledProp;
		{
			const isControlledRef = A$2(prop !== void 0);
			y$1(() => {
				const wasControlled = isControlledRef.current;
				if (wasControlled !== isControlled) console.warn(`${caller} is changing from ${wasControlled ? "controlled" : "uncontrolled"} to ${isControlled ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`);
				isControlledRef.current = isControlled;
			}, [isControlled, caller]);
		}
		return [value, q$1((nextValue) => {
			if (isControlled) {
				const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
				if (value2 !== prop) onChangeRef.current?.(value2);
			} else setUncontrolledProp(nextValue);
		}, [
			isControlled,
			prop,
			setUncontrolledProp,
			onChangeRef
		])];
	}
	function useUncontrolledState({ defaultProp, onChange }) {
		const [value, setValue] = d$1(defaultProp);
		const prevValueRef = A$2(value);
		const onChangeRef = A$2(onChange);
		useInsertionEffect(() => {
			onChangeRef.current = onChange;
		}, [onChange]);
		y$1(() => {
			if (prevValueRef.current !== value) {
				onChangeRef.current?.(value);
				prevValueRef.current = value;
			}
		}, [value, prevValueRef]);
		return [
			value,
			setValue,
			onChangeRef
		];
	}
	function isFunction(value) {
		return typeof value === "function";
	}
	init_compat_module();
	function createSlot(ownerName) {
		const SlotClone = createSlotClone(ownerName);
		const Slot2 = D$1((props, forwardedRef) => {
			const { children, ...slotProps } = props;
			const childrenArray = L.toArray(children);
			const slottable = childrenArray.find(isSlottable);
			if (slottable) {
				const newElement = slottable.props.children;
				const newChildren = childrenArray.map((child) => {
					if (child === slottable) {
						if (L.count(newElement) > 1) return L.only(null);
						return hn(newElement) ? newElement.props.children : null;
					} else return child;
				});
				return u$1(SlotClone, {
					...slotProps,
					ref: forwardedRef,
					children: hn(newElement) ? mn(newElement, void 0, newChildren) : null
				});
			}
			return u$1(SlotClone, {
				...slotProps,
				ref: forwardedRef,
				children
			});
		});
		Slot2.displayName = `${ownerName}.Slot`;
		return Slot2;
	}
	function createSlotClone(ownerName) {
		const SlotClone = D$1((props, forwardedRef) => {
			const { children, ...slotProps } = props;
			if (hn(children)) {
				const childrenRef = getElementRef$1(children);
				const props2 = mergeProps(slotProps, children.props);
				if (children.type !== S$1) props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
				return mn(children, props2);
			}
			return L.count(children) > 1 ? L.only(null) : null;
		});
		SlotClone.displayName = `${ownerName}.SlotClone`;
		return SlotClone;
	}
	var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
	function isSlottable(child) {
		return hn(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
	}
	function mergeProps(slotProps, childProps) {
		const overrideProps = { ...childProps };
		for (const propName in childProps) {
			const slotPropValue = slotProps[propName];
			const childPropValue = childProps[propName];
			if (/^on[A-Z]/.test(propName)) {
				if (slotPropValue && childPropValue) overrideProps[propName] = (...args) => {
					const result = childPropValue(...args);
					slotPropValue(...args);
					return result;
				};
				else if (slotPropValue) overrideProps[propName] = slotPropValue;
			} else if (propName === "style") overrideProps[propName] = {
				...slotPropValue,
				...childPropValue
			};
			else if (propName === "className") overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
		}
		return {
			...slotProps,
			...overrideProps
		};
	}
	function getElementRef$1(element) {
		let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
		let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
		if (mayWarn) return element.ref;
		getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
		mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
		if (mayWarn) return element.props.ref;
		return element.props.ref || element.ref;
	}
	init_compat_module();
	var Primitive = [
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
	].reduce((primitive, node) => {
		const Slot = createSlot(`Primitive.${node}`);
		const Node = D$1((props, forwardedRef) => {
			const { asChild, ...primitiveProps } = props;
			const Comp = asChild ? Slot : node;
			if (typeof window !== "undefined") window[Symbol.for("radix-ui")] = true;
			return u$1(Comp, {
				...primitiveProps,
				ref: forwardedRef
			});
		});
		Node.displayName = `Primitive.${node}`;
		return {
			...primitive,
			[node]: Node
		};
	}, {});
	function dispatchDiscreteCustomEvent(target, event) {
		if (target) bn(() => target.dispatchEvent(event));
	}
	init_compat_module();
	function useCallbackRef$1(callback) {
		const callbackRef = A$2(callback);
		y$1(() => {
			callbackRef.current = callback;
		});
		return T$1(() => (...args) => callbackRef.current?.(...args), []);
	}
	init_compat_module();
	function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
		const onEscapeKeyDown = useCallbackRef$1(onEscapeKeyDownProp);
		y$1(() => {
			const handleKeyDown = (event) => {
				if (event.key === "Escape") onEscapeKeyDown(event);
			};
			ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
			return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
		}, [onEscapeKeyDown, ownerDocument]);
	}
	init_compat_module();
	var DISMISSABLE_LAYER_NAME = "DismissableLayer";
	var CONTEXT_UPDATE = "dismissableLayer.update";
	var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
	var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
	var originalBodyPointerEvents;
	var DismissableLayerContext = X$1({
		layers: new Set(),
		layersWithOutsidePointerEventsDisabled: new Set(),
		branches: new Set()
	});
	var DismissableLayer = D$1((props, forwardedRef) => {
		const { disableOutsidePointerEvents = false, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, ...layerProps } = props;
		const context = x$1(DismissableLayerContext);
		const [node, setNode] = d$1(null);
		const ownerDocument = node?.ownerDocument ?? globalThis?.document;
		const [, force] = d$1({});
		const composedRefs = useComposedRefs(forwardedRef, (node2) => setNode(node2));
		const layers = Array.from(context.layers);
		const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
		const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
		const index = node ? layers.indexOf(node) : -1;
		const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
		const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
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
			if ([...context.branches].some((branch) => branch.contains(target))) return;
			onFocusOutside?.(event);
			onInteractOutside?.(event);
			if (!event.defaultPrevented) onDismiss?.();
		}, ownerDocument);
		useEscapeKeydown((event) => {
			if (!(index === context.layers.size - 1)) return;
			onEscapeKeyDown?.(event);
			if (!event.defaultPrevented && onDismiss) {
				event.preventDefault();
				onDismiss();
			}
		}, ownerDocument);
		y$1(() => {
			if (!node) return;
			if (disableOutsidePointerEvents) {
				if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
					originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
					ownerDocument.body.style.pointerEvents = "none";
				}
				context.layersWithOutsidePointerEventsDisabled.add(node);
			}
			context.layers.add(node);
			dispatchUpdate();
			return () => {
				if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
			};
		}, [
			node,
			ownerDocument,
			disableOutsidePointerEvents,
			context
		]);
		y$1(() => {
			return () => {
				if (!node) return;
				context.layers.delete(node);
				context.layersWithOutsidePointerEventsDisabled.delete(node);
				dispatchUpdate();
			};
		}, [node, context]);
		y$1(() => {
			const handleUpdate = () => force({});
			document.addEventListener(CONTEXT_UPDATE, handleUpdate);
			return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
		}, []);
		return u$1(Primitive.div, {
			...layerProps,
			ref: composedRefs,
			style: {
				pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
				...props.style
			},
			onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
			onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
			onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, pointerDownOutside.onPointerDownCapture)
		});
	});
	DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
	var BRANCH_NAME = "DismissableLayerBranch";
	var DismissableLayerBranch = D$1((props, forwardedRef) => {
		const context = x$1(DismissableLayerContext);
		const ref = A$2(null);
		const composedRefs = useComposedRefs(forwardedRef, ref);
		y$1(() => {
			const node = ref.current;
			if (node) {
				context.branches.add(node);
				return () => {
					context.branches.delete(node);
				};
			}
		}, [context.branches]);
		return u$1(Primitive.div, {
			...props,
			ref: composedRefs
		});
	});
	DismissableLayerBranch.displayName = BRANCH_NAME;
	function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis?.document) {
		const handlePointerDownOutside = useCallbackRef$1(onPointerDownOutside);
		const isPointerInsideReactTreeRef = A$2(false);
		const handleClickRef = A$2(() => {});
		y$1(() => {
			const handlePointerDown = (event) => {
				if (event.target && !isPointerInsideReactTreeRef.current) {
					let handleAndDispatchPointerDownOutsideEvent2 = function() {
						handleAndDispatchCustomEvent(POINTER_DOWN_OUTSIDE, handlePointerDownOutside, eventDetail, { discrete: true });
					};
					const eventDetail = { originalEvent: event };
					if (event.pointerType === "touch") {
						ownerDocument.removeEventListener("click", handleClickRef.current);
						handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
						ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
					} else handleAndDispatchPointerDownOutsideEvent2();
				} else ownerDocument.removeEventListener("click", handleClickRef.current);
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
		return { onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true };
	}
	function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
		const handleFocusOutside = useCallbackRef$1(onFocusOutside);
		const isFocusInsideReactTreeRef = A$2(false);
		y$1(() => {
			const handleFocus = (event) => {
				if (event.target && !isFocusInsideReactTreeRef.current) handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, { originalEvent: event }, { discrete: false });
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
		const event = new CustomEvent(name, {
			bubbles: false,
			cancelable: true,
			detail
		});
		if (handler) target.addEventListener(name, handler, { once: true });
		if (discrete) dispatchDiscreteCustomEvent(target, event);
		else target.dispatchEvent(event);
	}
	init_compat_module();
	var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
	var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
	var EVENT_OPTIONS = {
		bubbles: false,
		cancelable: true
	};
	var FOCUS_SCOPE_NAME = "FocusScope";
	var FocusScope = D$1((props, forwardedRef) => {
		const { loop = false, trapped = false, onMountAutoFocus: onMountAutoFocusProp, onUnmountAutoFocus: onUnmountAutoFocusProp, ...scopeProps } = props;
		const [container, setContainer] = d$1(null);
		const onMountAutoFocus = useCallbackRef$1(onMountAutoFocusProp);
		const onUnmountAutoFocus = useCallbackRef$1(onUnmountAutoFocusProp);
		const lastFocusedElementRef = A$2(null);
		const composedRefs = useComposedRefs(forwardedRef, (node) => setContainer(node));
		const focusScope = A$2({
			paused: false,
			pause() {
				this.paused = true;
			},
			resume() {
				this.paused = false;
			}
		}).current;
		y$1(() => {
			if (trapped) {
				let handleFocusIn2 = function(event) {
					if (focusScope.paused || !container) return;
					const target = event.target;
					if (container.contains(target)) lastFocusedElementRef.current = target;
					else focus(lastFocusedElementRef.current, { select: true });
				}, handleFocusOut2 = function(event) {
					if (focusScope.paused || !container) return;
					const relatedTarget = event.relatedTarget;
					if (relatedTarget === null) return;
					if (!container.contains(relatedTarget)) focus(lastFocusedElementRef.current, { select: true });
				}, handleMutations2 = function(mutations) {
					if (document.activeElement !== document.body) return;
					for (const mutation of mutations) if (mutation.removedNodes.length > 0) focus(container);
				};
				document.addEventListener("focusin", handleFocusIn2);
				document.addEventListener("focusout", handleFocusOut2);
				const mutationObserver = new MutationObserver(handleMutations2);
				if (container) mutationObserver.observe(container, {
					childList: true,
					subtree: true
				});
				return () => {
					document.removeEventListener("focusin", handleFocusIn2);
					document.removeEventListener("focusout", handleFocusOut2);
					mutationObserver.disconnect();
				};
			}
		}, [
			trapped,
			container,
			focusScope.paused
		]);
		y$1(() => {
			if (container) {
				focusScopesStack.add(focusScope);
				const previouslyFocusedElement = document.activeElement;
				if (!container.contains(previouslyFocusedElement)) {
					const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
					container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
					container.dispatchEvent(mountEvent);
					if (!mountEvent.defaultPrevented) {
						focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
						if (document.activeElement === previouslyFocusedElement) focus(container);
					}
				}
				return () => {
					container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
					setTimeout(() => {
						const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
						container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
						container.dispatchEvent(unmountEvent);
						if (!unmountEvent.defaultPrevented) focus(previouslyFocusedElement ?? document.body, { select: true });
						container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
						focusScopesStack.remove(focusScope);
					}, 0);
				};
			}
		}, [
			container,
			onMountAutoFocus,
			onUnmountAutoFocus,
			focusScope
		]);
		const handleKeyDown = q$1((event) => {
			if (!loop && !trapped) return;
			if (focusScope.paused) return;
			const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
			const focusedElement = document.activeElement;
			if (isTabKey && focusedElement) {
				const container2 = event.currentTarget;
				const [first, last] = getTabbableEdges(container2);
				if (!(first && last)) {
					if (focusedElement === container2) event.preventDefault();
				} else if (!event.shiftKey && focusedElement === last) {
					event.preventDefault();
					if (loop) focus(first, { select: true });
				} else if (event.shiftKey && focusedElement === first) {
					event.preventDefault();
					if (loop) focus(last, { select: true });
				}
			}
		}, [
			loop,
			trapped,
			focusScope.paused
		]);
		return u$1(Primitive.div, {
			tabIndex: -1,
			...scopeProps,
			ref: composedRefs,
			onKeyDown: handleKeyDown
		});
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
		return [findVisible(candidates, container), findVisible(candidates.reverse(), container)];
	}
	function getTabbableCandidates(container) {
		const nodes = [];
		const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, { acceptNode: (node) => {
			const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
			if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
			return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
		} });
		while (walker.nextNode()) nodes.push(walker.currentNode);
		return nodes;
	}
	function findVisible(elements, container) {
		for (const element of elements) if (!isHidden(element, { upTo: container })) return element;
	}
	function isHidden(node, { upTo }) {
		if (getComputedStyle(node).visibility === "hidden") return true;
		while (node) {
			if (upTo !== void 0 && node === upTo) return false;
			if (getComputedStyle(node).display === "none") return true;
			node = node.parentElement;
		}
		return false;
	}
	function isSelectableInput(element) {
		return element instanceof HTMLInputElement && "select" in element;
	}
	function focus(element, { select = false } = {}) {
		if (element && element.focus) {
			const previouslyFocusedElement = document.activeElement;
			element.focus({ preventScroll: true });
			if (element !== previouslyFocusedElement && isSelectableInput(element) && select) element.select();
		}
	}
	var focusScopesStack = createFocusScopesStack();
	function createFocusScopesStack() {
		let stack = [];
		return {
			add(focusScope) {
				const activeFocusScope = stack[0];
				if (focusScope !== activeFocusScope) activeFocusScope?.pause();
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
		const index = updatedArray.indexOf(item);
		if (index !== -1) updatedArray.splice(index, 1);
		return updatedArray;
	}
	function removeLinks(items) {
		return items.filter((item) => item.tagName !== "A");
	}
	init_compat_module();
	var PORTAL_NAME$2 = "Portal";
	var Portal$2 = D$1((props, forwardedRef) => {
		const { container: containerProp, ...portalProps } = props;
		const [mounted, setMounted] = d$1(false);
		useLayoutEffect2(() => setMounted(true), []);
		const container = containerProp || mounted && globalThis?.document?.body;
		return container ? gn.createPortal(u$1(Primitive.div, {
			...portalProps,
			ref: forwardedRef
		}), container) : null;
	});
	Portal$2.displayName = PORTAL_NAME$2;
	init_compat_module();
	function useStateMachine(initialState, machine) {
		return h$1((state, event) => {
			return machine[state][event] ?? state;
		}, initialState);
	}
	var Presence = (props) => {
		const { present, children } = props;
		const presence = usePresence(present);
		const child = typeof children === "function" ? children({ present: presence.isPresent }) : L.only(children);
		const ref = useComposedRefs(presence.ref, getElementRef(child));
		return typeof children === "function" || presence.isPresent ? mn(child, { ref }) : null;
	};
	Presence.displayName = "Presence";
	function usePresence(present) {
		const [node, setNode] = d$1();
		const stylesRef = A$2(null);
		const prevPresentRef = A$2(present);
		const prevAnimationNameRef = A$2("none");
		const [state, send] = useStateMachine(present ? "mounted" : "unmounted", {
			mounted: {
				UNMOUNT: "unmounted",
				ANIMATION_OUT: "unmountSuspended"
			},
			unmountSuspended: {
				MOUNT: "mounted",
				ANIMATION_END: "unmounted"
			},
			unmounted: { MOUNT: "mounted" }
		});
		y$1(() => {
			const currentAnimationName = getAnimationName(stylesRef.current);
			prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
		}, [state]);
		useLayoutEffect2(() => {
			const styles = stylesRef.current;
			const wasPresent = prevPresentRef.current;
			if (wasPresent !== present) {
				const prevAnimationName = prevAnimationNameRef.current;
				const currentAnimationName = getAnimationName(styles);
				if (present) send("MOUNT");
				else if (currentAnimationName === "none" || styles?.display === "none") send("UNMOUNT");
				else if (wasPresent && prevAnimationName !== currentAnimationName) send("ANIMATION_OUT");
				else send("UNMOUNT");
				prevPresentRef.current = present;
			}
		}, [present, send]);
		useLayoutEffect2(() => {
			if (node) {
				let timeoutId;
				const ownerWindow = node.ownerDocument.defaultView ?? window;
				const handleAnimationEnd = (event) => {
					const isCurrentAnimation = getAnimationName(stylesRef.current).includes(CSS.escape(event.animationName));
					if (event.target === node && isCurrentAnimation) {
						send("ANIMATION_END");
						if (!prevPresentRef.current) {
							const currentFillMode = node.style.animationFillMode;
							node.style.animationFillMode = "forwards";
							timeoutId = ownerWindow.setTimeout(() => {
								if (node.style.animationFillMode === "forwards") node.style.animationFillMode = currentFillMode;
							});
						}
					}
				};
				const handleAnimationStart = (event) => {
					if (event.target === node) prevAnimationNameRef.current = getAnimationName(stylesRef.current);
				};
				node.addEventListener("animationstart", handleAnimationStart);
				node.addEventListener("animationcancel", handleAnimationEnd);
				node.addEventListener("animationend", handleAnimationEnd);
				return () => {
					ownerWindow.clearTimeout(timeoutId);
					node.removeEventListener("animationstart", handleAnimationStart);
					node.removeEventListener("animationcancel", handleAnimationEnd);
					node.removeEventListener("animationend", handleAnimationEnd);
				};
			} else send("ANIMATION_END");
		}, [node, send]);
		return {
			isPresent: ["mounted", "unmountSuspended"].includes(state),
			ref: q$1((node2) => {
				stylesRef.current = node2 ? getComputedStyle(node2) : null;
				setNode(node2);
			}, [])
		};
	}
	function getAnimationName(styles) {
		return styles?.animationName || "none";
	}
	function getElementRef(element) {
		let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
		let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
		if (mayWarn) return element.ref;
		getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
		mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
		if (mayWarn) return element.props.ref;
		return element.props.ref || element.ref;
	}
	init_compat_module();
	var count = 0;
	function useFocusGuards() {
		y$1(() => {
			const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
			document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
			document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
			count++;
			return () => {
				if (count === 1) document.querySelectorAll("[data-radix-focus-guard]").forEach((node) => node.remove());
				count--;
			};
		}, []);
	}
	function createFocusGuard() {
		const element = document.createElement("span");
		element.setAttribute("data-radix-focus-guard", "");
		element.tabIndex = 0;
		element.style.outline = "none";
		element.style.opacity = "0";
		element.style.position = "fixed";
		element.style.pointerEvents = "none";
		return element;
	}
	var __assign = function() {
		__assign = Object.assign || function __assign(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return __assign.apply(this, arguments);
	};
	function __rest(s, e) {
		var t = {};
		for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
		if (s != null && typeof Object.getOwnPropertySymbols === "function") {
			for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
		}
		return t;
	}
	function __spreadArray(to, from, pack) {
		if (pack || arguments.length === 2) {
			for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
				if (!ar) ar = Array.prototype.slice.call(from, 0, i);
				ar[i] = from[i];
			}
		}
		return to.concat(ar || Array.prototype.slice.call(from));
	}
	var zeroRightClassName = "right-scroll-bar-position";
	var fullWidthClassName = "width-before-scroll-bar";
	var noScrollbarsClassName = "with-scroll-bars-hidden";
	var removedBarSizeVariable = "--removed-body-scroll-bar-size";
	function assignRef(ref, value) {
		if (typeof ref === "function") ref(value);
		else if (ref) ref.current = value;
		return ref;
	}
	init_compat_module();
	function useCallbackRef(initialValue, callback) {
		var ref = d$1(function() {
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
	init_compat_module();
	var useIsomorphicLayoutEffect = typeof window !== "undefined" ? _ : y$1;
	var currentValues = new WeakMap();
	function useMergeRefs(refs, defaultValue) {
		var callbackRef = useCallbackRef(defaultValue || null, function(newValue) {
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
					if (!nextRefs_1.has(ref)) assignRef(ref, null);
				});
				nextRefs_1.forEach(function(ref) {
					if (!prevRefs_1.has(ref)) assignRef(ref, current_1);
				});
			}
			currentValues.set(callbackRef, refs);
		}, [refs]);
		return callbackRef;
	}
	function ItoI(a) {
		return a;
	}
	function innerCreateMedium(defaults, middleware) {
		if (middleware === void 0) middleware = ItoI;
		var buffer = [];
		var assigned = false;
		return {
			read: function() {
				if (assigned) throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
				if (buffer.length) return buffer[buffer.length - 1];
				return defaults;
			},
			useMedium: function(data) {
				var item = middleware(data, assigned);
				buffer.push(item);
				return function() {
					buffer = buffer.filter(function(x) {
						return x !== item;
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
					push: function(x) {
						return cb(x);
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
					var cbs = pendingQueue;
					pendingQueue = [];
					cbs.forEach(cb);
				};
				var cycle = function() {
					return Promise.resolve().then(executeQueue);
				};
				cycle();
				buffer = {
					push: function(x) {
						pendingQueue.push(x);
						cycle();
					},
					filter: function(filter) {
						pendingQueue = pendingQueue.filter(filter);
						return buffer;
					}
				};
			}
		};
	}
	function createSidecarMedium(options) {
		if (options === void 0) options = {};
		var medium = innerCreateMedium(null);
		medium.options = __assign({
			async: true,
			ssr: false
		}, options);
		return medium;
	}
	init_compat_module();
	var SideCar = function(_a) {
		var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
		if (!sideCar) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
		var Target = sideCar.read();
		if (!Target) throw new Error("Sidecar medium not found");
		return k$2(Target, __assign({}, rest));
	};
	SideCar.isSideCarExport = true;
	function exportSidecar(medium, exported) {
		medium.useMedium(exported);
		return SideCar;
	}
	var effectCar = createSidecarMedium();
	init_compat_module();
	var nothing = function() {};
	var RemoveScroll = D$1(function(props, parentRef) {
		var ref = A$2(null);
		var _a = d$1({
			onScrollCapture: nothing,
			onWheelCapture: nothing,
			onTouchMoveCapture: nothing
		}), callbacks = _a[0], setCallbacks = _a[1];
		var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, [
			"forwardProps",
			"children",
			"className",
			"removeScrollBar",
			"enabled",
			"shards",
			"sideCar",
			"noRelative",
			"noIsolation",
			"inert",
			"allowPinchZoom",
			"as",
			"gapMode"
		]);
		var SideCar = sideCar;
		var containerRef = useMergeRefs([ref, parentRef]);
		var containerProps = __assign(__assign({}, rest), callbacks);
		return k$2(S$1, null, enabled && k$2(SideCar, {
			sideCar: effectCar,
			removeScrollBar,
			shards,
			noRelative,
			noIsolation,
			inert,
			setCallbacks,
			allowPinchZoom: !!allowPinchZoom,
			lockRef: ref,
			gapMode
		}), forwardProps ? mn(L.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : k$2(Container, __assign({}, containerProps, {
			className,
			ref: containerRef
		}), children));
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
	var currentNonce;
	var getNonce = function() {
		if (currentNonce) return currentNonce;
		if (typeof __webpack_nonce__ !== "undefined") return __webpack_nonce__;
	};
	function makeStyleTag() {
		if (!document) return null;
		var tag = document.createElement("style");
		tag.type = "text/css";
		var nonce = getNonce();
		if (nonce) tag.setAttribute("nonce", nonce);
		return tag;
	}
	function injectStyles(tag, css) {
		if (tag.styleSheet) tag.styleSheet.cssText = css;
		else tag.appendChild(document.createTextNode(css));
	}
	function insertStyleTag(tag) {
		(document.head || document.getElementsByTagName("head")[0]).appendChild(tag);
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
	init_compat_module();
	var styleHookSingleton = function() {
		var sheet = stylesheetSingleton();
		return function(styles, isDynamic) {
			y$1(function() {
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
	var parse = function(x) {
		return parseInt(x || "", 10) || 0;
	};
	var getOffset = function(gapMode) {
		var cs = window.getComputedStyle(document.body);
		var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
		var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
		var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
		return [
			parse(left),
			parse(top),
			parse(right)
		];
	};
	var getGapWidth = function(gapMode) {
		if (gapMode === void 0) gapMode = "margin";
		if (typeof window === "undefined") return zeroGap;
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
	init_compat_module();
	var Style = styleSingleton();
	var lockAttribute = "data-scroll-locked";
	var getStyles = function(_a, allowRelative, gapMode, important) {
		var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
		if (gapMode === void 0) gapMode = "margin";
		return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
			allowRelative && "position: relative ".concat(important, ";"),
			gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
			gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
		].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
	};
	var getCurrentUseCounter = function() {
		var counter = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
		return isFinite(counter) ? counter : 0;
	};
	var useLockAttribute = function() {
		y$1(function() {
			document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
			return function() {
				var newCounter = getCurrentUseCounter() - 1;
				if (newCounter <= 0) document.body.removeAttribute(lockAttribute);
				else document.body.setAttribute(lockAttribute, newCounter.toString());
			};
		}, []);
	};
	var RemoveScrollBar = function(_a) {
		var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? "margin" : _b;
		useLockAttribute();
		return k$2(Style, { styles: getStyles(T$1(function() {
			return getGapWidth(gapMode);
		}, [gapMode]), !noRelative, gapMode, !noImportant ? "!important" : "") });
	};
	var passiveSupported = false;
	if (typeof window !== "undefined") try {
		var options = Object.defineProperty({}, "passive", { get: function() {
			passiveSupported = true;
			return true;
		} });
		window.addEventListener("test", options, options);
		window.removeEventListener("test", options, options);
	} catch (err) {
		passiveSupported = false;
	}
	var nonPassive = passiveSupported ? { passive: false } : false;
	var alwaysContainsScroll = function(node) {
		return node.tagName === "TEXTAREA";
	};
	var elementCanBeScrolled = function(node, overflow) {
		if (!(node instanceof Element)) return false;
		var styles = window.getComputedStyle(node);
		return styles[overflow] !== "hidden" && !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible");
	};
	var elementCouldBeVScrolled = function(node) {
		return elementCanBeScrolled(node, "overflowY");
	};
	var elementCouldBeHScrolled = function(node) {
		return elementCanBeScrolled(node, "overflowX");
	};
	var locationCouldBeScrolled = function(axis, node) {
		var ownerDocument = node.ownerDocument;
		var current = node;
		do {
			if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) current = current.host;
			if (elementCouldBeScrolled(axis, current)) {
				var _a = getScrollVariables(axis, current);
				if (_a[1] > _a[2]) return true;
			}
			current = current.parentNode;
		} while (current && current !== ownerDocument.body);
		return false;
	};
	var getVScrollVariables = function(_a) {
		return [
			_a.scrollTop,
			_a.scrollHeight,
			_a.clientHeight
		];
	};
	var getHScrollVariables = function(_a) {
		return [
			_a.scrollLeft,
			_a.scrollWidth,
			_a.clientWidth
		];
	};
	var elementCouldBeScrolled = function(axis, node) {
		return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
	};
	var getScrollVariables = function(axis, node) {
		return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
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
			if (!target) break;
			var _a = getScrollVariables(axis, target), position = _a[0];
			var elementScroll = _a[1] - _a[2] - directionFactor * position;
			if (position || elementScroll) {
				if (elementCouldBeScrolled(axis, target)) {
					availableScroll += elementScroll;
					availableScrollTop += position;
				}
			}
			var parent_1 = target.parentNode;
			target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
		} while (!targetInLock && target !== document.body || targetInLock && (endTarget.contains(target) || endTarget === target));
		if (isDeltaPositive && (noOverscroll && Math.abs(availableScroll) < 1 || !noOverscroll && delta > availableScroll)) shouldCancelScroll = true;
		else if (!isDeltaPositive && (noOverscroll && Math.abs(availableScrollTop) < 1 || !noOverscroll && -delta > availableScrollTop)) shouldCancelScroll = true;
		return shouldCancelScroll;
	};
	init_compat_module();
	var getTouchXY = function(event) {
		return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
	};
	var getDeltaXY = function(event) {
		return [event.deltaX, event.deltaY];
	};
	var extractRef = function(ref) {
		return ref && "current" in ref ? ref.current : ref;
	};
	var deltaCompare = function(x, y) {
		return x[0] === y[0] && x[1] === y[1];
	};
	var generateStyle = function(id) {
		return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
	};
	var idCounter = 0;
	var lockStack = [];
	function RemoveScrollSideCar(props) {
		var shouldPreventQueue = A$2([]);
		var touchStartRef = A$2([0, 0]);
		var activeAxis = A$2();
		var id = d$1(idCounter++)[0];
		var Style = d$1(styleSingleton)[0];
		var lastProps = A$2(props);
		y$1(function() {
			lastProps.current = props;
		}, [props]);
		y$1(function() {
			if (props.inert) {
				document.body.classList.add("block-interactivity-".concat(id));
				var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
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
		}, [
			props.inert,
			props.lockRef.current,
			props.shards
		]);
		var shouldCancelEvent = q$1(function(event, parent) {
			if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) return !lastProps.current.allowPinchZoom;
			var touch = getTouchXY(event);
			var touchStart = touchStartRef.current;
			var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
			var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
			var currentAxis;
			var target = event.target;
			var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
			if ("touches" in event && moveDirection === "h" && target.type === "range") return false;
			var selection = window.getSelection();
			var anchorNode = selection && selection.anchorNode;
			if (anchorNode ? anchorNode === target || anchorNode.contains(target) : false) return false;
			var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
			if (!canBeScrolledInMainDirection) return true;
			if (canBeScrolledInMainDirection) currentAxis = moveDirection;
			else {
				currentAxis = moveDirection === "v" ? "h" : "v";
				canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
			}
			if (!canBeScrolledInMainDirection) return false;
			if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) activeAxis.current = currentAxis;
			if (!currentAxis) return true;
			var cancelingAxis = activeAxis.current || currentAxis;
			return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
		}, []);
		var shouldPrevent = q$1(function(_event) {
			var event = _event;
			if (!lockStack.length || lockStack[lockStack.length - 1] !== Style) return;
			var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
			var sourceEvent = shouldPreventQueue.current.filter(function(e) {
				return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
			})[0];
			if (sourceEvent && sourceEvent.should) {
				if (event.cancelable) event.preventDefault();
				return;
			}
			if (!sourceEvent) {
				var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
					return node.contains(event.target);
				});
				if (shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation) {
					if (event.cancelable) event.preventDefault();
				}
			}
		}, []);
		var shouldCancel = q$1(function(name, delta, target, should) {
			var event = {
				name,
				delta,
				target,
				should,
				shadowParent: getOutermostShadowParent(target)
			};
			shouldPreventQueue.current.push(event);
			setTimeout(function() {
				shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
					return e !== event;
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
		y$1(function() {
			lockStack.push(Style);
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
					return inst !== Style;
				});
				document.removeEventListener("wheel", shouldPrevent, nonPassive);
				document.removeEventListener("touchmove", shouldPrevent, nonPassive);
				document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
			};
		}, []);
		var removeScrollBar = props.removeScrollBar, inert = props.inert;
		return k$2(S$1, null, inert ? k$2(Style, { styles: generateStyle(id) }) : null, removeScrollBar ? k$2(RemoveScrollBar, {
			noRelative: props.noRelative,
			gapMode: props.gapMode
		}) : null);
	}
	function getOutermostShadowParent(node) {
		var shadowParent = null;
		while (node !== null) {
			if (node instanceof ShadowRoot) {
				shadowParent = node.host;
				node = node.host;
			}
			node = node.parentNode;
		}
		return shadowParent;
	}
	var sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar);
	init_compat_module();
	var ReactRemoveScroll = D$1(function(props, ref) {
		return k$2(RemoveScroll, __assign({}, props, {
			ref,
			sideCar: sidecar_default
		}));
	});
	ReactRemoveScroll.classNames = RemoveScroll.classNames;
	var getDefaultParent = function(originalTarget) {
		if (typeof document === "undefined") return null;
		return (Array.isArray(originalTarget) ? originalTarget[0] : originalTarget).ownerDocument.body;
	};
	var counterMap = new WeakMap();
	var uncontrolledNodes = new WeakMap();
	var markerMap = {};
	var lockCount = 0;
	var unwrapHost = function(node) {
		return node && (node.host || unwrapHost(node.parentNode));
	};
	var correctTargets = function(parent, targets) {
		return targets.map(function(target) {
			if (parent.contains(target)) return target;
			var correctedTarget = unwrapHost(target);
			if (correctedTarget && parent.contains(correctedTarget)) return correctedTarget;
			console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
			return null;
		}).filter(function(x) {
			return Boolean(x);
		});
	};
	var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
		var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
		if (!markerMap[markerName]) markerMap[markerName] = new WeakMap();
		var markerCounter = markerMap[markerName];
		var hiddenNodes = [];
		var elementsToKeep = new Set();
		var elementsToStop = new Set(targets);
		var keep = function(el) {
			if (!el || elementsToKeep.has(el)) return;
			elementsToKeep.add(el);
			keep(el.parentNode);
		};
		targets.forEach(keep);
		var deep = function(parent) {
			if (!parent || elementsToStop.has(parent)) return;
			Array.prototype.forEach.call(parent.children, function(node) {
				if (elementsToKeep.has(node)) deep(node);
				else try {
					var attr = node.getAttribute(controlAttribute);
					var alreadyHidden = attr !== null && attr !== "false";
					var counterValue = (counterMap.get(node) || 0) + 1;
					var markerValue = (markerCounter.get(node) || 0) + 1;
					counterMap.set(node, counterValue);
					markerCounter.set(node, markerValue);
					hiddenNodes.push(node);
					if (counterValue === 1 && alreadyHidden) uncontrolledNodes.set(node, true);
					if (markerValue === 1) node.setAttribute(markerName, "true");
					if (!alreadyHidden) node.setAttribute(controlAttribute, "true");
				} catch (e) {
					console.error("aria-hidden: cannot operate on ", node, e);
				}
			});
		};
		deep(parentNode);
		elementsToKeep.clear();
		lockCount++;
		return function() {
			hiddenNodes.forEach(function(node) {
				var counterValue = counterMap.get(node) - 1;
				var markerValue = markerCounter.get(node) - 1;
				counterMap.set(node, counterValue);
				markerCounter.set(node, markerValue);
				if (!counterValue) {
					if (!uncontrolledNodes.has(node)) node.removeAttribute(controlAttribute);
					uncontrolledNodes.delete(node);
				}
				if (!markerValue) node.removeAttribute(markerName);
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
		if (markerName === void 0) markerName = "data-aria-hidden";
		var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
		var activeParentNode = parentNode || getDefaultParent(originalTarget);
		if (!activeParentNode) return function() {
			return null;
		};
		targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
		return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
	};
	init_compat_module();
	var DIALOG_NAME = "Dialog";
	var [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);
	var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
	var Dialog = (props) => {
		const { __scopeDialog, children, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
		const triggerRef = A$2(null);
		const contentRef = A$2(null);
		const [open, setOpen] = useControllableState({
			prop: openProp,
			defaultProp: defaultOpen ?? false,
			onChange: onOpenChange,
			caller: DIALOG_NAME
		});
		return u$1(DialogProvider, {
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
		});
	};
	Dialog.displayName = DIALOG_NAME;
	var TRIGGER_NAME$1 = "DialogTrigger";
	var DialogTrigger = D$1((props, forwardedRef) => {
		const { __scopeDialog, ...triggerProps } = props;
		const context = useDialogContext(TRIGGER_NAME$1, __scopeDialog);
		const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
		return u$1(Primitive.button, {
			type: "button",
			"aria-haspopup": "dialog",
			"aria-expanded": context.open,
			"aria-controls": context.contentId,
			"data-state": getState(context.open),
			...triggerProps,
			ref: composedTriggerRef,
			onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
		});
	});
	DialogTrigger.displayName = TRIGGER_NAME$1;
	var PORTAL_NAME$1 = "DialogPortal";
	var [PortalProvider$1, usePortalContext$1] = createDialogContext(PORTAL_NAME$1, { forceMount: void 0 });
	var DialogPortal = (props) => {
		const { __scopeDialog, forceMount, children, container } = props;
		const context = useDialogContext(PORTAL_NAME$1, __scopeDialog);
		return u$1(PortalProvider$1, {
			scope: __scopeDialog,
			forceMount,
			children: L.map(children, (child) => u$1(Presence, {
				present: forceMount || context.open,
				children: u$1(Portal$2, {
					asChild: true,
					container,
					children: child
				})
			}))
		});
	};
	DialogPortal.displayName = PORTAL_NAME$1;
	var OVERLAY_NAME = "DialogOverlay";
	var DialogOverlay = D$1((props, forwardedRef) => {
		const portalContext = usePortalContext$1(OVERLAY_NAME, props.__scopeDialog);
		const { forceMount = portalContext.forceMount, ...overlayProps } = props;
		const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
		return context.modal ? u$1(Presence, {
			present: forceMount || context.open,
			children: u$1(DialogOverlayImpl, {
				...overlayProps,
				ref: forwardedRef
			})
		}) : null;
	});
	DialogOverlay.displayName = OVERLAY_NAME;
	var Slot = createSlot("DialogOverlay.RemoveScroll");
	var DialogOverlayImpl = D$1((props, forwardedRef) => {
		const { __scopeDialog, ...overlayProps } = props;
		const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
		return u$1(ReactRemoveScroll, {
			as: Slot,
			allowPinchZoom: true,
			shards: [context.contentRef],
			children: u$1(Primitive.div, {
				"data-state": getState(context.open),
				...overlayProps,
				ref: forwardedRef,
				style: {
					pointerEvents: "auto",
					...overlayProps.style
				}
			})
		});
	});
	var CONTENT_NAME$2 = "DialogContent";
	var DialogContent$2 = D$1((props, forwardedRef) => {
		const portalContext = usePortalContext$1(CONTENT_NAME$2, props.__scopeDialog);
		const { forceMount = portalContext.forceMount, ...contentProps } = props;
		const context = useDialogContext(CONTENT_NAME$2, props.__scopeDialog);
		return u$1(Presence, {
			present: forceMount || context.open,
			children: context.modal ? u$1(DialogContentModal, {
				...contentProps,
				ref: forwardedRef
			}) : u$1(DialogContentNonModal, {
				...contentProps,
				ref: forwardedRef
			})
		});
	});
	DialogContent$2.displayName = CONTENT_NAME$2;
	var DialogContentModal = D$1((props, forwardedRef) => {
		const context = useDialogContext(CONTENT_NAME$2, props.__scopeDialog);
		const contentRef = A$2(null);
		const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
		y$1(() => {
			const content = contentRef.current;
			if (content) return hideOthers(content);
		}, []);
		return u$1(DialogContentImpl, {
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
				if (originalEvent.button === 2 || ctrlLeftClick) event.preventDefault();
			}),
			onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => event.preventDefault())
		});
	});
	var DialogContentNonModal = D$1((props, forwardedRef) => {
		const context = useDialogContext(CONTENT_NAME$2, props.__scopeDialog);
		const hasInteractedOutsideRef = A$2(false);
		const hasPointerDownOutsideRef = A$2(false);
		return u$1(DialogContentImpl, {
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
					if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.current = true;
				}
				const target = event.target;
				if (context.triggerRef.current?.contains(target)) event.preventDefault();
				if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) event.preventDefault();
			}
		});
	});
	var DialogContentImpl = D$1((props, forwardedRef) => {
		const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
		const context = useDialogContext(CONTENT_NAME$2, __scopeDialog);
		const contentRef = A$2(null);
		const composedRefs = useComposedRefs(forwardedRef, contentRef);
		useFocusGuards();
		return u$1(S$1, { children: [u$1(FocusScope, {
			asChild: true,
			loop: true,
			trapped: trapFocus,
			onMountAutoFocus: onOpenAutoFocus,
			onUnmountAutoFocus: onCloseAutoFocus,
			children: u$1(DismissableLayer, {
				role: "dialog",
				id: context.contentId,
				"aria-describedby": context.descriptionId,
				"aria-labelledby": context.titleId,
				"data-state": getState(context.open),
				...contentProps,
				ref: composedRefs,
				onDismiss: () => context.onOpenChange(false)
			})
		}), u$1(S$1, { children: [u$1(TitleWarning, { titleId: context.titleId }), u$1(DescriptionWarning, {
			contentRef,
			descriptionId: context.descriptionId
		})] })] });
	});
	var TITLE_NAME = "DialogTitle";
	var DialogTitle = D$1((props, forwardedRef) => {
		const { __scopeDialog, ...titleProps } = props;
		const context = useDialogContext(TITLE_NAME, __scopeDialog);
		return u$1(Primitive.h2, {
			id: context.titleId,
			...titleProps,
			ref: forwardedRef
		});
	});
	DialogTitle.displayName = TITLE_NAME;
	var DESCRIPTION_NAME = "DialogDescription";
	var DialogDescription = D$1((props, forwardedRef) => {
		const { __scopeDialog, ...descriptionProps } = props;
		const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
		return u$1(Primitive.p, {
			id: context.descriptionId,
			...descriptionProps,
			ref: forwardedRef
		});
	});
	DialogDescription.displayName = DESCRIPTION_NAME;
	var CLOSE_NAME = "DialogClose";
	var DialogClose = D$1((props, forwardedRef) => {
		const { __scopeDialog, ...closeProps } = props;
		const context = useDialogContext(CLOSE_NAME, __scopeDialog);
		return u$1(Primitive.button, {
			type: "button",
			...closeProps,
			ref: forwardedRef,
			onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
		});
	});
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
		y$1(() => {
			if (titleId) {
				if (!document.getElementById(titleId)) console.error(MESSAGE);
			}
		}, [MESSAGE, titleId]);
		return null;
	};
	var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
	var DescriptionWarning = ({ contentRef, descriptionId }) => {
		const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${useWarningContext(DESCRIPTION_WARNING_NAME).contentName}}.`;
		y$1(() => {
			const describedById = contentRef.current?.getAttribute("aria-describedby");
			if (descriptionId && describedById) {
				if (!document.getElementById(descriptionId)) console.warn(MESSAGE);
			}
		}, [
			MESSAGE,
			contentRef,
			descriptionId
		]);
		return null;
	};
	var Root$1 = Dialog;
	var Trigger$1 = DialogTrigger;
	var Portal$1 = DialogPortal;
	var Overlay = DialogOverlay;
	var Content$1 = DialogContent$2;
	var Title = DialogTitle;
	var Close = DialogClose;
	var sides = [
		"top",
		"right",
		"bottom",
		"left"
	];
	var min = Math.min;
	var max = Math.max;
	var round = Math.round;
	var floor = Math.floor;
	var createCoords = (v) => ({
		x: v,
		y: v
	});
	var oppositeSideMap = {
		left: "right",
		right: "left",
		bottom: "top",
		top: "bottom"
	};
	var oppositeAlignmentMap = {
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
	var yAxisSides = new Set(["top", "bottom"]);
	function getSideAxis(placement) {
		return yAxisSides.has(getSide(placement)) ? "y" : "x";
	}
	function getAlignmentAxis(placement) {
		return getOppositeAxis(getSideAxis(placement));
	}
	function getAlignmentSides(placement, rects, rtl) {
		if (rtl === void 0) rtl = false;
		const alignment = getAlignment(placement);
		const alignmentAxis = getAlignmentAxis(placement);
		const length = getAxisLength(alignmentAxis);
		let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
		if (rects.reference[length] > rects.floating[length]) mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
		return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
	}
	function getExpandedPlacements(placement) {
		const oppositePlacement = getOppositePlacement(placement);
		return [
			getOppositeAlignmentPlacement(placement),
			oppositePlacement,
			getOppositeAlignmentPlacement(oppositePlacement)
		];
	}
	function getOppositeAlignmentPlacement(placement) {
		return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
	}
	var lrPlacement = ["left", "right"];
	var rlPlacement = ["right", "left"];
	var tbPlacement = ["top", "bottom"];
	var btPlacement = ["bottom", "top"];
	function getSideList(side, isStart, rtl) {
		switch (side) {
			case "top":
			case "bottom":
				if (rtl) return isStart ? rlPlacement : lrPlacement;
				return isStart ? lrPlacement : rlPlacement;
			case "left":
			case "right": return isStart ? tbPlacement : btPlacement;
			default: return [];
		}
	}
	function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
		const alignment = getAlignment(placement);
		let list = getSideList(getSide(placement), direction === "start", rtl);
		if (alignment) {
			list = list.map((side) => side + "-" + alignment);
			if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement));
		}
		return list;
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
		const { x, y, width, height } = rect;
		return {
			width,
			height,
			top: y,
			left: x,
			right: x + width,
			bottom: y + height,
			x,
			y
		};
	}
	function computeCoordsFromPlacement(_ref, placement, rtl) {
		let { reference, floating } = _ref;
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
			default: coords = {
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
		if (options === void 0) options = {};
		const { x, y, platform, rects, elements, strategy } = state;
		const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate(options, state);
		const paddingObject = getPaddingObject(padding);
		const element = elements[altBoundary ? elementContext === "floating" ? "reference" : "floating" : elementContext];
		const clippingClientRect = rectToClientRect(await platform.getClippingRect({
			element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
			boundary,
			rootBoundary,
			strategy
		}));
		const rect = elementContext === "floating" ? {
			x,
			y,
			width: rects.floating.width,
			height: rects.floating.height
		} : rects.reference;
		const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
		const offsetScale = await (platform.isElement == null ? void 0 : platform.isElement(offsetParent)) ? await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
			x: 1,
			y: 1
		} : {
			x: 1,
			y: 1
		};
		const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
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
	var computePosition$1 = async (reference, floating, config) => {
		const { placement = "bottom", strategy = "absolute", middleware = [], platform } = config;
		const validMiddleware = middleware.filter(Boolean);
		const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
		let rects = await platform.getElementRects({
			reference,
			floating,
			strategy
		});
		let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
		let statefulPlacement = placement;
		let middlewareData = {};
		let resetCount = 0;
		for (let i = 0; i < validMiddleware.length; i++) {
			var _platform$detectOverf;
			const { name, fn } = validMiddleware[i];
			const { x: nextX, y: nextY, data, reset } = await fn({
				x,
				y,
				initialPlacement: placement,
				placement: statefulPlacement,
				strategy,
				middlewareData,
				rects,
				platform: {
					...platform,
					detectOverflow: (_platform$detectOverf = platform.detectOverflow) != null ? _platform$detectOverf : detectOverflow
				},
				elements: {
					reference,
					floating
				}
			});
			x = nextX != null ? nextX : x;
			y = nextY != null ? nextY : y;
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
					if (reset.placement) statefulPlacement = reset.placement;
					if (reset.rects) rects = reset.rects === true ? await platform.getElementRects({
						reference,
						floating,
						strategy
					}) : reset.rects;
					({x, y} = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
				}
				i = -1;
			}
		}
		return {
			x,
			y,
			placement: statefulPlacement,
			strategy,
			middlewareData
		};
	};
	var arrow$3 = (options) => ({
		name: "arrow",
		options,
		async fn(state) {
			const { x, y, placement, rects, platform, elements, middlewareData } = state;
			const { element, padding = 0 } = evaluate(options, state) || {};
			if (element == null) return {};
			const paddingObject = getPaddingObject(padding);
			const coords = {
				x,
				y
			};
			const axis = getAlignmentAxis(placement);
			const length = getAxisLength(axis);
			const arrowDimensions = await platform.getDimensions(element);
			const isYAxis = axis === "y";
			const minProp = isYAxis ? "top" : "left";
			const maxProp = isYAxis ? "bottom" : "right";
			const clientProp = isYAxis ? "clientHeight" : "clientWidth";
			const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
			const startDiff = coords[axis] - rects.reference[axis];
			const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
			let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
			if (!clientSize || !await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent))) clientSize = elements.floating[clientProp] || rects.floating[length];
			const centerToReference = endDiff / 2 - startDiff / 2;
			const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
			const minPadding = min(paddingObject[minProp], largestPossiblePadding);
			const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
			const min$1 = minPadding;
			const max = clientSize - arrowDimensions[length] - maxPadding;
			const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
			const offset = clamp(min$1, center, max);
			const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
			const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
			return {
				[axis]: coords[axis] + alignmentOffset,
				data: {
					[axis]: offset,
					centerOffset: center - offset - alignmentOffset,
					...shouldAddOffset && { alignmentOffset }
				},
				reset: shouldAddOffset
			};
		}
	});
	var flip$2 = function(options) {
		if (options === void 0) options = {};
		return {
			name: "flip",
			options,
			async fn(state) {
				var _middlewareData$arrow, _middlewareData$flip;
				const { placement, middlewareData, rects, initialPlacement, platform, elements } = state;
				const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
				if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
				const side = getSide(placement);
				const initialSideAxis = getSideAxis(initialPlacement);
				const isBasePlacement = getSide(initialPlacement) === initialPlacement;
				const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
				const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
				const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
				if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
				const placements = [initialPlacement, ...fallbackPlacements];
				const overflow = await platform.detectOverflow(state, detectOverflowOptions);
				const overflows = [];
				let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
				if (checkMainAxis) overflows.push(overflow[side]);
				if (checkCrossAxis) {
					const sides = getAlignmentSides(placement, rects, rtl);
					overflows.push(overflow[sides[0]], overflow[sides[1]]);
				}
				overflowsData = [...overflowsData, {
					placement,
					overflows
				}];
				if (!overflows.every((side) => side <= 0)) {
					var _middlewareData$flip2, _overflowsData$filter;
					const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
					const nextPlacement = placements[nextIndex];
					if (nextPlacement) {
						if (!(checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false) || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) return {
							data: {
								index: nextIndex,
								overflows: overflowsData
							},
							reset: { placement: nextPlacement }
						};
					}
					let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
					if (!resetPlacement) switch (fallbackStrategy) {
						case "bestFit": {
							var _overflowsData$filter2;
							const placement = (_overflowsData$filter2 = overflowsData.filter((d) => {
								if (hasFallbackAxisSideDirection) {
									const currentSideAxis = getSideAxis(d.placement);
									return currentSideAxis === initialSideAxis || currentSideAxis === "y";
								}
								return true;
							}).map((d) => [d.placement, d.overflows.filter((overflow) => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
							if (placement) resetPlacement = placement;
							break;
						}
						case "initialPlacement":
							resetPlacement = initialPlacement;
							break;
					}
					if (placement !== resetPlacement) return { reset: { placement: resetPlacement } };
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
	var hide$2 = function(options) {
		if (options === void 0) options = {};
		return {
			name: "hide",
			options,
			async fn(state) {
				const { rects, platform } = state;
				const { strategy = "referenceHidden", ...detectOverflowOptions } = evaluate(options, state);
				switch (strategy) {
					case "referenceHidden": {
						const offsets = getSideOffsets(await platform.detectOverflow(state, {
							...detectOverflowOptions,
							elementContext: "reference"
						}), rects.reference);
						return { data: {
							referenceHiddenOffsets: offsets,
							referenceHidden: isAnySideFullyClipped(offsets)
						} };
					}
					case "escaped": {
						const offsets = getSideOffsets(await platform.detectOverflow(state, {
							...detectOverflowOptions,
							altBoundary: true
						}), rects.floating);
						return { data: {
							escapedOffsets: offsets,
							escaped: isAnySideFullyClipped(offsets)
						} };
					}
					default: return {};
				}
			}
		};
	};
	var originSides = new Set(["left", "top"]);
	async function convertValueToCoords(state, options) {
		const { placement, platform, elements } = state;
		const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
		const side = getSide(placement);
		const alignment = getAlignment(placement);
		const isVertical = getSideAxis(placement) === "y";
		const mainAxisMulti = originSides.has(side) ? -1 : 1;
		const crossAxisMulti = rtl && isVertical ? -1 : 1;
		const rawValue = evaluate(options, state);
		let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
			mainAxis: rawValue,
			crossAxis: 0,
			alignmentAxis: null
		} : {
			mainAxis: rawValue.mainAxis || 0,
			crossAxis: rawValue.crossAxis || 0,
			alignmentAxis: rawValue.alignmentAxis
		};
		if (alignment && typeof alignmentAxis === "number") crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
		return isVertical ? {
			x: crossAxis * crossAxisMulti,
			y: mainAxis * mainAxisMulti
		} : {
			x: mainAxis * mainAxisMulti,
			y: crossAxis * crossAxisMulti
		};
	}
	var offset$2 = function(options) {
		if (options === void 0) options = 0;
		return {
			name: "offset",
			options,
			async fn(state) {
				var _middlewareData$offse, _middlewareData$arrow;
				const { x, y, placement, middlewareData } = state;
				const diffCoords = await convertValueToCoords(state, options);
				if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
				return {
					x: x + diffCoords.x,
					y: y + diffCoords.y,
					data: {
						...diffCoords,
						placement
					}
				};
			}
		};
	};
	var shift$2 = function(options) {
		if (options === void 0) options = {};
		return {
			name: "shift",
			options,
			async fn(state) {
				const { x, y, placement, platform } = state;
				const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = { fn: (_ref) => {
					let { x, y } = _ref;
					return {
						x,
						y
					};
				} }, ...detectOverflowOptions } = evaluate(options, state);
				const coords = {
					x,
					y
				};
				const overflow = await platform.detectOverflow(state, detectOverflowOptions);
				const crossAxis = getSideAxis(getSide(placement));
				const mainAxis = getOppositeAxis(crossAxis);
				let mainAxisCoord = coords[mainAxis];
				let crossAxisCoord = coords[crossAxis];
				if (checkMainAxis) {
					const minSide = mainAxis === "y" ? "top" : "left";
					const maxSide = mainAxis === "y" ? "bottom" : "right";
					const min = mainAxisCoord + overflow[minSide];
					const max = mainAxisCoord - overflow[maxSide];
					mainAxisCoord = clamp(min, mainAxisCoord, max);
				}
				if (checkCrossAxis) {
					const minSide = crossAxis === "y" ? "top" : "left";
					const maxSide = crossAxis === "y" ? "bottom" : "right";
					const min = crossAxisCoord + overflow[minSide];
					const max = crossAxisCoord - overflow[maxSide];
					crossAxisCoord = clamp(min, crossAxisCoord, max);
				}
				const limitedCoords = limiter.fn({
					...state,
					[mainAxis]: mainAxisCoord,
					[crossAxis]: crossAxisCoord
				});
				return {
					...limitedCoords,
					data: {
						x: limitedCoords.x - x,
						y: limitedCoords.y - y,
						enabled: {
							[mainAxis]: checkMainAxis,
							[crossAxis]: checkCrossAxis
						}
					}
				};
			}
		};
	};
	var limitShift$2 = function(options) {
		if (options === void 0) options = {};
		return {
			options,
			fn(state) {
				const { x, y, placement, rects, middlewareData } = state;
				const { offset = 0, mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true } = evaluate(options, state);
				const coords = {
					x,
					y
				};
				const crossAxis = getSideAxis(placement);
				const mainAxis = getOppositeAxis(crossAxis);
				let mainAxisCoord = coords[mainAxis];
				let crossAxisCoord = coords[crossAxis];
				const rawOffset = evaluate(offset, state);
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
					if (mainAxisCoord < limitMin) mainAxisCoord = limitMin;
					else if (mainAxisCoord > limitMax) mainAxisCoord = limitMax;
				}
				if (checkCrossAxis) {
					var _middlewareData$offse, _middlewareData$offse2;
					const len = mainAxis === "y" ? "width" : "height";
					const isOriginSide = originSides.has(getSide(placement));
					const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
					const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
					if (crossAxisCoord < limitMin) crossAxisCoord = limitMin;
					else if (crossAxisCoord > limitMax) crossAxisCoord = limitMax;
				}
				return {
					[mainAxis]: mainAxisCoord,
					[crossAxis]: crossAxisCoord
				};
			}
		};
	};
	var size$2 = function(options) {
		if (options === void 0) options = {};
		return {
			name: "size",
			options,
			async fn(state) {
				var _state$middlewareData, _state$middlewareData2;
				const { placement, rects, platform, elements } = state;
				const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state);
				const overflow = await platform.detectOverflow(state, detectOverflowOptions);
				const side = getSide(placement);
				const alignment = getAlignment(placement);
				const isYAxis = getSideAxis(placement) === "y";
				const { width, height } = rects.floating;
				let heightSide;
				let widthSide;
				if (side === "top" || side === "bottom") {
					heightSide = side;
					widthSide = alignment === (await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
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
				if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) availableWidth = maximumClippingWidth;
				if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) availableHeight = maximumClippingHeight;
				if (noShift && !alignment) {
					const xMin = max(overflow.left, 0);
					const xMax = max(overflow.right, 0);
					const yMin = max(overflow.top, 0);
					const yMax = max(overflow.bottom, 0);
					if (isYAxis) availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
					else availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
				}
				await apply({
					...state,
					availableWidth,
					availableHeight
				});
				const nextDimensions = await platform.getDimensions(elements.floating);
				if (width !== nextDimensions.width || height !== nextDimensions.height) return { reset: { rects: true } };
				return {};
			}
		};
	};
	function hasWindow() {
		return typeof window !== "undefined";
	}
	function getNodeName(node) {
		if (isNode(node)) return (node.nodeName || "").toLowerCase();
		return "#document";
	}
	function getWindow(node) {
		var _node$ownerDocument;
		return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
	}
	function getDocumentElement(node) {
		var _ref;
		return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
	}
	function isNode(value) {
		if (!hasWindow()) return false;
		return value instanceof Node || value instanceof getWindow(value).Node;
	}
	function isElement(value) {
		if (!hasWindow()) return false;
		return value instanceof Element || value instanceof getWindow(value).Element;
	}
	function isHTMLElement(value) {
		if (!hasWindow()) return false;
		return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
	}
	function isShadowRoot(value) {
		if (!hasWindow() || typeof ShadowRoot === "undefined") return false;
		return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
	}
	var invalidOverflowDisplayValues = new Set(["inline", "contents"]);
	function isOverflowElement(element) {
		const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
		return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !invalidOverflowDisplayValues.has(display);
	}
	var tableElements = new Set([
		"table",
		"td",
		"th"
	]);
	function isTableElement(element) {
		return tableElements.has(getNodeName(element));
	}
	var topLayerSelectors = [":popover-open", ":modal"];
	function isTopLayer(element) {
		return topLayerSelectors.some((selector) => {
			try {
				return element.matches(selector);
			} catch (_e) {
				return false;
			}
		});
	}
	var transformProperties = [
		"transform",
		"translate",
		"scale",
		"rotate",
		"perspective"
	];
	var willChangeValues = [
		"transform",
		"translate",
		"scale",
		"rotate",
		"perspective",
		"filter"
	];
	var containValues = [
		"paint",
		"layout",
		"strict",
		"content"
	];
	function isContainingBlock(elementOrCss) {
		const webkit = isWebKit();
		const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
		return transformProperties.some((value) => css[value] ? css[value] !== "none" : false) || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || willChangeValues.some((value) => (css.willChange || "").includes(value)) || containValues.some((value) => (css.contain || "").includes(value));
	}
	function getContainingBlock(element) {
		let currentNode = getParentNode(element);
		while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
			if (isContainingBlock(currentNode)) return currentNode;
			else if (isTopLayer(currentNode)) return null;
			currentNode = getParentNode(currentNode);
		}
		return null;
	}
	function isWebKit() {
		if (typeof CSS === "undefined" || !CSS.supports) return false;
		return CSS.supports("-webkit-backdrop-filter", "none");
	}
	var lastTraversableNodeNames = new Set([
		"html",
		"body",
		"#document"
	]);
	function isLastTraversableNode(node) {
		return lastTraversableNodeNames.has(getNodeName(node));
	}
	function getComputedStyle$1(element) {
		return getWindow(element).getComputedStyle(element);
	}
	function getNodeScroll(element) {
		if (isElement(element)) return {
			scrollLeft: element.scrollLeft,
			scrollTop: element.scrollTop
		};
		return {
			scrollLeft: element.scrollX,
			scrollTop: element.scrollY
		};
	}
	function getParentNode(node) {
		if (getNodeName(node) === "html") return node;
		const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
		return isShadowRoot(result) ? result.host : result;
	}
	function getNearestOverflowAncestor(node) {
		const parentNode = getParentNode(node);
		if (isLastTraversableNode(parentNode)) return node.ownerDocument ? node.ownerDocument.body : node.body;
		if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) return parentNode;
		return getNearestOverflowAncestor(parentNode);
	}
	function getOverflowAncestors(node, list, traverseIframes) {
		var _node$ownerDocument2;
		if (list === void 0) list = [];
		if (traverseIframes === void 0) traverseIframes = true;
		const scrollableAncestor = getNearestOverflowAncestor(node);
		const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
		const win = getWindow(scrollableAncestor);
		if (isBody) {
			const frameElement = getFrameElement(win);
			return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
		}
		return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
	}
	function getFrameElement(win) {
		return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
	}
	function getCssDimensions(element) {
		const css = getComputedStyle$1(element);
		let width = parseFloat(css.width) || 0;
		let height = parseFloat(css.height) || 0;
		const hasOffset = isHTMLElement(element);
		const offsetWidth = hasOffset ? element.offsetWidth : width;
		const offsetHeight = hasOffset ? element.offsetHeight : height;
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
	function unwrapElement(element) {
		return !isElement(element) ? element.contextElement : element;
	}
	function getScale(element) {
		const domElement = unwrapElement(element);
		if (!isHTMLElement(domElement)) return createCoords(1);
		const rect = domElement.getBoundingClientRect();
		const { width, height, $ } = getCssDimensions(domElement);
		let x = ($ ? round(rect.width) : rect.width) / width;
		let y = ($ ? round(rect.height) : rect.height) / height;
		if (!x || !Number.isFinite(x)) x = 1;
		if (!y || !Number.isFinite(y)) y = 1;
		return {
			x,
			y
		};
	}
	var noOffsets = createCoords(0);
	function getVisualOffsets(element) {
		const win = getWindow(element);
		if (!isWebKit() || !win.visualViewport) return noOffsets;
		return {
			x: win.visualViewport.offsetLeft,
			y: win.visualViewport.offsetTop
		};
	}
	function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
		if (isFixed === void 0) isFixed = false;
		if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) return false;
		return isFixed;
	}
	function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
		if (includeScale === void 0) includeScale = false;
		if (isFixedStrategy === void 0) isFixedStrategy = false;
		const clientRect = element.getBoundingClientRect();
		const domElement = unwrapElement(element);
		let scale = createCoords(1);
		if (includeScale) if (offsetParent) {
			if (isElement(offsetParent)) scale = getScale(offsetParent);
		} else scale = getScale(element);
		const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
		let x = (clientRect.left + visualOffsets.x) / scale.x;
		let y = (clientRect.top + visualOffsets.y) / scale.y;
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
				x *= iframeScale.x;
				y *= iframeScale.y;
				width *= iframeScale.x;
				height *= iframeScale.y;
				x += left;
				y += top;
				currentWin = getWindow(currentIFrame);
				currentIFrame = getFrameElement(currentWin);
			}
		}
		return rectToClientRect({
			width,
			height,
			x,
			y
		});
	}
	function getWindowScrollBarX(element, rect) {
		const leftScroll = getNodeScroll(element).scrollLeft;
		if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
		return rect.left + leftScroll;
	}
	function getHTMLOffset(documentElement, scroll) {
		const htmlRect = documentElement.getBoundingClientRect();
		return {
			x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
			y: htmlRect.top + scroll.scrollTop
		};
	}
	function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
		let { elements, rect, offsetParent, strategy } = _ref;
		const isFixed = strategy === "fixed";
		const documentElement = getDocumentElement(offsetParent);
		const topLayer = elements ? isTopLayer(elements.floating) : false;
		if (offsetParent === documentElement || topLayer && isFixed) return rect;
		let scroll = {
			scrollLeft: 0,
			scrollTop: 0
		};
		let scale = createCoords(1);
		const offsets = createCoords(0);
		const isOffsetParentAnElement = isHTMLElement(offsetParent);
		if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
			if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
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
	function getClientRects(element) {
		return Array.from(element.getClientRects());
	}
	function getDocumentRect(element) {
		const html = getDocumentElement(element);
		const scroll = getNodeScroll(element);
		const body = element.ownerDocument.body;
		const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
		const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
		let x = -scroll.scrollLeft + getWindowScrollBarX(element);
		const y = -scroll.scrollTop;
		if (getComputedStyle$1(body).direction === "rtl") x += max(html.clientWidth, body.clientWidth) - width;
		return {
			width,
			height,
			x,
			y
		};
	}
	var SCROLLBAR_MAX = 25;
	function getViewportRect(element, strategy) {
		const win = getWindow(element);
		const html = getDocumentElement(element);
		const visualViewport = win.visualViewport;
		let width = html.clientWidth;
		let height = html.clientHeight;
		let x = 0;
		let y = 0;
		if (visualViewport) {
			width = visualViewport.width;
			height = visualViewport.height;
			const visualViewportBased = isWebKit();
			if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
				x = visualViewport.offsetLeft;
				y = visualViewport.offsetTop;
			}
		}
		const windowScrollbarX = getWindowScrollBarX(html);
		if (windowScrollbarX <= 0) {
			const doc = html.ownerDocument;
			const body = doc.body;
			const bodyStyles = getComputedStyle(body);
			const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
			const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
			if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) width -= clippingStableScrollbarWidth;
		} else if (windowScrollbarX <= SCROLLBAR_MAX) width += windowScrollbarX;
		return {
			width,
			height,
			x,
			y
		};
	}
	var absoluteOrFixed = new Set(["absolute", "fixed"]);
	function getInnerBoundingClientRect(element, strategy) {
		const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
		const top = clientRect.top + element.clientTop;
		const left = clientRect.left + element.clientLeft;
		const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
		return {
			width: element.clientWidth * scale.x,
			height: element.clientHeight * scale.y,
			x: left * scale.x,
			y: top * scale.y
		};
	}
	function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
		let rect;
		if (clippingAncestor === "viewport") rect = getViewportRect(element, strategy);
		else if (clippingAncestor === "document") rect = getDocumentRect(getDocumentElement(element));
		else if (isElement(clippingAncestor)) rect = getInnerBoundingClientRect(clippingAncestor, strategy);
		else {
			const visualOffsets = getVisualOffsets(element);
			rect = {
				x: clippingAncestor.x - visualOffsets.x,
				y: clippingAncestor.y - visualOffsets.y,
				width: clippingAncestor.width,
				height: clippingAncestor.height
			};
		}
		return rectToClientRect(rect);
	}
	function hasFixedPositionAncestor(element, stopNode) {
		const parentNode = getParentNode(element);
		if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) return false;
		return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
	}
	function getClippingElementAncestors(element, cache) {
		const cachedResult = cache.get(element);
		if (cachedResult) return cachedResult;
		let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
		let currentContainingBlockComputedStyle = null;
		const elementIsFixed = getComputedStyle$1(element).position === "fixed";
		let currentNode = elementIsFixed ? getParentNode(element) : element;
		while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
			const computedStyle = getComputedStyle$1(currentNode);
			const currentNodeIsContaining = isContainingBlock(currentNode);
			if (!currentNodeIsContaining && computedStyle.position === "fixed") currentContainingBlockComputedStyle = null;
			if (elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && absoluteOrFixed.has(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode)) result = result.filter((ancestor) => ancestor !== currentNode);
			else currentContainingBlockComputedStyle = computedStyle;
			currentNode = getParentNode(currentNode);
		}
		cache.set(element, result);
		return result;
	}
	function getClippingRect(_ref) {
		let { element, boundary, rootBoundary, strategy } = _ref;
		const clippingAncestors = [...boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary), rootBoundary];
		const firstClippingAncestor = clippingAncestors[0];
		const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
			const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
			accRect.top = max(rect.top, accRect.top);
			accRect.right = min(rect.right, accRect.right);
			accRect.bottom = min(rect.bottom, accRect.bottom);
			accRect.left = max(rect.left, accRect.left);
			return accRect;
		}, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
		return {
			width: clippingRect.right - clippingRect.left,
			height: clippingRect.bottom - clippingRect.top,
			x: clippingRect.left,
			y: clippingRect.top
		};
	}
	function getDimensions(element) {
		const { width, height } = getCssDimensions(element);
		return {
			width,
			height
		};
	}
	function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
		const isOffsetParentAnElement = isHTMLElement(offsetParent);
		const documentElement = getDocumentElement(offsetParent);
		const isFixed = strategy === "fixed";
		const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
		let scroll = {
			scrollLeft: 0,
			scrollTop: 0
		};
		const offsets = createCoords(0);
		function setLeftRTLScrollbarOffset() {
			offsets.x = getWindowScrollBarX(documentElement);
		}
		if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
			if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
			if (isOffsetParentAnElement) {
				const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
				offsets.x = offsetRect.x + offsetParent.clientLeft;
				offsets.y = offsetRect.y + offsetParent.clientTop;
			} else if (documentElement) setLeftRTLScrollbarOffset();
		}
		if (isFixed && !isOffsetParentAnElement && documentElement) setLeftRTLScrollbarOffset();
		const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
		return {
			x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
			y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
			width: rect.width,
			height: rect.height
		};
	}
	function isStaticPositioned(element) {
		return getComputedStyle$1(element).position === "static";
	}
	function getTrueOffsetParent(element, polyfill) {
		if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") return null;
		if (polyfill) return polyfill(element);
		let rawOffsetParent = element.offsetParent;
		if (getDocumentElement(element) === rawOffsetParent) rawOffsetParent = rawOffsetParent.ownerDocument.body;
		return rawOffsetParent;
	}
	function getOffsetParent(element, polyfill) {
		const win = getWindow(element);
		if (isTopLayer(element)) return win;
		if (!isHTMLElement(element)) {
			let svgOffsetParent = getParentNode(element);
			while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
				if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent;
				svgOffsetParent = getParentNode(svgOffsetParent);
			}
			return win;
		}
		let offsetParent = getTrueOffsetParent(element, polyfill);
		while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) offsetParent = getTrueOffsetParent(offsetParent, polyfill);
		if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) return win;
		return offsetParent || getContainingBlock(element) || win;
	}
	var getElementRects = async function(data) {
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
	function isRTL(element) {
		return getComputedStyle$1(element).direction === "rtl";
	}
	var platform = {
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
	function rectsAreEqual(a, b) {
		return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
	}
	function observeMove(element, onMove) {
		let io = null;
		let timeoutId;
		const root = getDocumentElement(element);
		function cleanup() {
			var _io;
			clearTimeout(timeoutId);
			(_io = io) == null || _io.disconnect();
			io = null;
		}
		function refresh(skip, threshold) {
			if (skip === void 0) skip = false;
			if (threshold === void 0) threshold = 1;
			cleanup();
			const elementRectForRootMargin = element.getBoundingClientRect();
			const { left, top, width, height } = elementRectForRootMargin;
			if (!skip) onMove();
			if (!width || !height) return;
			const insetTop = floor(top);
			const insetRight = floor(root.clientWidth - (left + width));
			const insetBottom = floor(root.clientHeight - (top + height));
			const insetLeft = floor(left);
			const options = {
				rootMargin: -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px",
				threshold: max(0, min(1, threshold)) || 1
			};
			let isFirstUpdate = true;
			function handleObserve(entries) {
				const ratio = entries[0].intersectionRatio;
				if (ratio !== threshold) {
					if (!isFirstUpdate) return refresh();
					if (!ratio) timeoutId = setTimeout(() => {
						refresh(false, 1e-7);
					}, 1e3);
					else refresh(false, ratio);
				}
				if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) refresh();
				isFirstUpdate = false;
			}
			try {
				io = new IntersectionObserver(handleObserve, {
					...options,
					root: root.ownerDocument
				});
			} catch (_e) {
				io = new IntersectionObserver(handleObserve, options);
			}
			io.observe(element);
		}
		refresh(true);
		return cleanup;
	}
	function autoUpdate(reference, floating, update, options) {
		if (options === void 0) options = {};
		const { ancestorScroll = true, ancestorResize = true, elementResize = typeof ResizeObserver === "function", layoutShift = typeof IntersectionObserver === "function", animationFrame = false } = options;
		const referenceEl = unwrapElement(reference);
		const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
		ancestors.forEach((ancestor) => {
			ancestorScroll && ancestor.addEventListener("scroll", update, { passive: true });
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
			if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl);
			resizeObserver.observe(floating);
		}
		let frameId;
		let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
		if (animationFrame) frameLoop();
		function frameLoop() {
			const nextRefRect = getBoundingClientRect(reference);
			if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update();
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
			cleanupIo?.();
			(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
			resizeObserver = null;
			if (animationFrame) cancelAnimationFrame(frameId);
		};
	}
	var offset$1 = offset$2;
	var shift$1 = shift$2;
	var flip$1 = flip$2;
	var size$1 = size$2;
	var hide$1 = hide$2;
	var arrow$2 = arrow$3;
	var limitShift$1 = limitShift$2;
	var computePosition = (reference, floating, options) => {
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
	init_compat_module();
	var index = typeof document !== "undefined" ? _ : function noop() {};
	function deepEqual(a, b) {
		if (a === b) return true;
		if (typeof a !== typeof b) return false;
		if (typeof a === "function" && a.toString() === b.toString()) return true;
		let length;
		let i;
		let keys;
		if (a && b && typeof a === "object") {
			if (Array.isArray(a)) {
				length = a.length;
				if (length !== b.length) return false;
				for (i = length; i-- !== 0;) if (!deepEqual(a[i], b[i])) return false;
				return true;
			}
			keys = Object.keys(a);
			length = keys.length;
			if (length !== Object.keys(b).length) return false;
			for (i = length; i-- !== 0;) if (!{}.hasOwnProperty.call(b, keys[i])) return false;
			for (i = length; i-- !== 0;) {
				const key = keys[i];
				if (key === "_owner" && a.$$typeof) continue;
				if (!deepEqual(a[key], b[key])) return false;
			}
			return true;
		}
		return a !== a && b !== b;
	}
	function getDPR(element) {
		if (typeof window === "undefined") return 1;
		return (element.ownerDocument.defaultView || window).devicePixelRatio || 1;
	}
	function roundByDPR(element, value) {
		const dpr = getDPR(element);
		return Math.round(value * dpr) / dpr;
	}
	function useLatestRef(value) {
		const ref = A$2(value);
		index(() => {
			ref.current = value;
		});
		return ref;
	}
	function useFloating(options) {
		if (options === void 0) options = {};
		const { placement = "bottom", strategy = "absolute", middleware = [], platform, elements: { reference: externalReference, floating: externalFloating } = {}, transform = true, whileElementsMounted, open } = options;
		const [data, setData] = d$1({
			x: 0,
			y: 0,
			strategy,
			placement,
			middlewareData: {},
			isPositioned: false
		});
		const [latestMiddleware, setLatestMiddleware] = d$1(middleware);
		if (!deepEqual(latestMiddleware, middleware)) setLatestMiddleware(middleware);
		const [_reference, _setReference] = d$1(null);
		const [_floating, _setFloating] = d$1(null);
		const setReference = q$1((node) => {
			if (node !== referenceRef.current) {
				referenceRef.current = node;
				_setReference(node);
			}
		}, []);
		const setFloating = q$1((node) => {
			if (node !== floatingRef.current) {
				floatingRef.current = node;
				_setFloating(node);
			}
		}, []);
		const referenceEl = externalReference || _reference;
		const floatingEl = externalFloating || _floating;
		const referenceRef = A$2(null);
		const floatingRef = A$2(null);
		const dataRef = A$2(data);
		const hasWhileElementsMounted = whileElementsMounted != null;
		const whileElementsMountedRef = useLatestRef(whileElementsMounted);
		const platformRef = useLatestRef(platform);
		const openRef = useLatestRef(open);
		const update = q$1(() => {
			if (!referenceRef.current || !floatingRef.current) return;
			const config = {
				placement,
				strategy,
				middleware: latestMiddleware
			};
			if (platformRef.current) config.platform = platformRef.current;
			computePosition(referenceRef.current, floatingRef.current, config).then((data) => {
				const fullData = {
					...data,
					isPositioned: openRef.current !== false
				};
				if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
					dataRef.current = fullData;
					bn(() => {
						setData(fullData);
					});
				}
			});
		}, [
			latestMiddleware,
			placement,
			strategy,
			platformRef,
			openRef
		]);
		index(() => {
			if (open === false && dataRef.current.isPositioned) {
				dataRef.current.isPositioned = false;
				setData((data) => ({
					...data,
					isPositioned: false
				}));
			}
		}, [open]);
		const isMountedRef = A$2(false);
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
				if (whileElementsMountedRef.current) return whileElementsMountedRef.current(referenceEl, floatingEl, update);
				update();
			}
		}, [
			referenceEl,
			floatingEl,
			update,
			whileElementsMountedRef,
			hasWhileElementsMounted
		]);
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
			if (!elements.floating) return initialStyles;
			const x = roundByDPR(elements.floating, data.x);
			const y = roundByDPR(elements.floating, data.y);
			if (transform) return {
				...initialStyles,
				transform: "translate(" + x + "px, " + y + "px)",
				...getDPR(elements.floating) >= 1.5 && { willChange: "transform" }
			};
			return {
				position: strategy,
				left: x,
				top: y
			};
		}, [
			strategy,
			transform,
			elements.floating,
			data.x,
			data.y
		]);
		return T$1(() => ({
			...data,
			update,
			refs,
			elements,
			floatingStyles
		}), [
			data,
			update,
			refs,
			elements,
			floatingStyles
		]);
	}
	var arrow$1 = (options) => {
		function isRef(value) {
			return {}.hasOwnProperty.call(value, "current");
		}
		return {
			name: "arrow",
			options,
			fn(state) {
				const { element, padding } = typeof options === "function" ? options(state) : options;
				if (element && isRef(element)) {
					if (element.current != null) return arrow$2({
						element: element.current,
						padding
					}).fn(state);
					return {};
				}
				if (element) return arrow$2({
					element,
					padding
				}).fn(state);
				return {};
			}
		};
	};
	var offset = (options, deps) => ({
		...offset$1(options),
		options: [options, deps]
	});
	var shift = (options, deps) => ({
		...shift$1(options),
		options: [options, deps]
	});
	var limitShift = (options, deps) => ({
		...limitShift$1(options),
		options: [options, deps]
	});
	var flip = (options, deps) => ({
		...flip$1(options),
		options: [options, deps]
	});
	var size = (options, deps) => ({
		...size$1(options),
		options: [options, deps]
	});
	var hide = (options, deps) => ({
		...hide$1(options),
		options: [options, deps]
	});
	var arrow = (options, deps) => ({
		...arrow$1(options),
		options: [options, deps]
	});
	init_compat_module();
	var NAME = "Arrow";
	var Arrow$1 = D$1((props, forwardedRef) => {
		const { children, width = 10, height = 5, ...arrowProps } = props;
		return u$1(Primitive.svg, {
			...arrowProps,
			ref: forwardedRef,
			width,
			height,
			viewBox: "0 0 30 10",
			preserveAspectRatio: "none",
			children: props.asChild ? children : u$1("polygon", { points: "0,0 30,0 15,10" })
		});
	});
	Arrow$1.displayName = NAME;
	var Root = Arrow$1;
	init_compat_module();
	function useSize(element) {
		const [size, setSize] = d$1(void 0);
		useLayoutEffect2(() => {
			if (element) {
				setSize({
					width: element.offsetWidth,
					height: element.offsetHeight
				});
				const resizeObserver = new ResizeObserver((entries) => {
					if (!Array.isArray(entries)) return;
					if (!entries.length) return;
					const entry = entries[0];
					let width;
					let height;
					if ("borderBoxSize" in entry) {
						const borderSizeEntry = entry["borderBoxSize"];
						const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
						width = borderSize["inlineSize"];
						height = borderSize["blockSize"];
					} else {
						width = element.offsetWidth;
						height = element.offsetHeight;
					}
					setSize({
						width,
						height
					});
				});
				resizeObserver.observe(element, { box: "border-box" });
				return () => resizeObserver.unobserve(element);
			} else setSize(void 0);
		}, [element]);
		return size;
	}
	init_compat_module();
	var POPPER_NAME = "Popper";
	var [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME);
	var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
	var Popper = (props) => {
		const { __scopePopper, children } = props;
		const [anchor, setAnchor] = d$1(null);
		return u$1(PopperProvider, {
			scope: __scopePopper,
			anchor,
			onAnchorChange: setAnchor,
			children
		});
	};
	Popper.displayName = POPPER_NAME;
	var ANCHOR_NAME = "PopperAnchor";
	var PopperAnchor = D$1((props, forwardedRef) => {
		const { __scopePopper, virtualRef, ...anchorProps } = props;
		const context = usePopperContext(ANCHOR_NAME, __scopePopper);
		const ref = A$2(null);
		const composedRefs = useComposedRefs(forwardedRef, ref);
		const anchorRef = A$2(null);
		y$1(() => {
			const previousAnchor = anchorRef.current;
			anchorRef.current = virtualRef?.current || ref.current;
			if (previousAnchor !== anchorRef.current) context.onAnchorChange(anchorRef.current);
		});
		return virtualRef ? null : u$1(Primitive.div, {
			...anchorProps,
			ref: composedRefs
		});
	});
	PopperAnchor.displayName = ANCHOR_NAME;
	var CONTENT_NAME$1 = "PopperContent";
	var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME$1);
	var PopperContent = D$1((props, forwardedRef) => {
		const { __scopePopper, side = "bottom", sideOffset = 0, align = "center", alignOffset = 0, arrowPadding = 0, avoidCollisions = true, collisionBoundary = [], collisionPadding: collisionPaddingProp = 0, sticky = "partial", hideWhenDetached = false, updatePositionStrategy = "optimized", onPlaced, ...contentProps } = props;
		const context = usePopperContext(CONTENT_NAME$1, __scopePopper);
		const [content, setContent] = d$1(null);
		const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
		const [arrow$4, setArrow] = d$1(null);
		const arrowSize = useSize(arrow$4);
		const arrowWidth = arrowSize?.width ?? 0;
		const arrowHeight = arrowSize?.height ?? 0;
		const desiredPlacement = side + (align !== "center" ? "-" + align : "");
		const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			...collisionPaddingProp
		};
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
				return autoUpdate(...args, { animationFrame: updatePositionStrategy === "always" });
			},
			elements: { reference: context.anchor },
			middleware: [
				offset({
					mainAxis: sideOffset + arrowHeight,
					alignmentAxis: alignOffset
				}),
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
				arrow$4 && arrow({
					element: arrow$4,
					padding: arrowPadding
				}),
				transformOrigin({
					arrowWidth,
					arrowHeight
				}),
				hideWhenDetached && hide({
					strategy: "referenceHidden",
					...detectOverflowOptions
				})
			]
		});
		const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
		const handlePlaced = useCallbackRef$1(onPlaced);
		useLayoutEffect2(() => {
			if (isPositioned) handlePlaced?.();
		}, [isPositioned, handlePlaced]);
		const arrowX = middlewareData.arrow?.x;
		const arrowY = middlewareData.arrow?.y;
		const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
		const [contentZIndex, setContentZIndex] = d$1();
		useLayoutEffect2(() => {
			if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
		}, [content]);
		return u$1("div", {
			ref: refs.setFloating,
			"data-radix-popper-content-wrapper": "",
			style: {
				...floatingStyles,
				transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
				minWidth: "max-content",
				zIndex: contentZIndex,
				["--radix-popper-transform-origin"]: [middlewareData.transformOrigin?.x, middlewareData.transformOrigin?.y].join(" "),
				...middlewareData.hide?.referenceHidden && {
					visibility: "hidden",
					pointerEvents: "none"
				}
			},
			dir: props.dir,
			children: u$1(PopperContentProvider, {
				scope: __scopePopper,
				placedSide,
				onArrowChange: setArrow,
				arrowX,
				arrowY,
				shouldHideArrow: cannotCenterArrow,
				children: u$1(Primitive.div, {
					"data-side": placedSide,
					"data-align": placedAlign,
					...contentProps,
					ref: composedRefs,
					style: {
						...contentProps.style,
						animation: !isPositioned ? "none" : void 0
					}
				})
			})
		});
	});
	PopperContent.displayName = CONTENT_NAME$1;
	var ARROW_NAME$1 = "PopperArrow";
	var OPPOSITE_SIDE = {
		top: "bottom",
		right: "left",
		bottom: "top",
		left: "right"
	};
	var PopperArrow = D$1(function PopperArrow2(props, forwardedRef) {
		const { __scopePopper, ...arrowProps } = props;
		const contentContext = useContentContext(ARROW_NAME$1, __scopePopper);
		const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
		return u$1("span", {
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
			children: u$1(Root, {
				...arrowProps,
				ref: forwardedRef,
				style: {
					...arrowProps.style,
					display: "block"
				}
			})
		});
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
			const isArrowHidden = middlewareData.arrow?.centerOffset !== 0;
			const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
			const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
			const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
			const noArrowAlign = {
				start: "0%",
				center: "50%",
				end: "100%"
			}[placedAlign];
			const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
			const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
			let x = "";
			let y = "";
			if (placedSide === "bottom") {
				x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
				y = `${-arrowHeight}px`;
			} else if (placedSide === "top") {
				x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
				y = `${rects.floating.height + arrowHeight}px`;
			} else if (placedSide === "right") {
				x = `${-arrowHeight}px`;
				y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
			} else if (placedSide === "left") {
				x = `${rects.floating.width + arrowHeight}px`;
				y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
			}
			return { data: {
				x,
				y
			} };
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
	init_compat_module();
	var originalBodyUserSelect;
	var HOVERCARD_NAME = "HoverCard";
	var [createHoverCardContext, createHoverCardScope] = createContextScope(HOVERCARD_NAME, [createPopperScope]);
	var usePopperScope = createPopperScope();
	var [HoverCardProvider, useHoverCardContext] = createHoverCardContext(HOVERCARD_NAME);
	var HoverCard = (props) => {
		const { __scopeHoverCard, children, open: openProp, defaultOpen, onOpenChange, openDelay = 700, closeDelay = 300 } = props;
		const popperScope = usePopperScope(__scopeHoverCard);
		const openTimerRef = A$2(0);
		const closeTimerRef = A$2(0);
		const hasSelectionRef = A$2(false);
		const isPointerDownOnContentRef = A$2(false);
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
			if (!hasSelectionRef.current && !isPointerDownOnContentRef.current) closeTimerRef.current = window.setTimeout(() => setOpen(false), closeDelay);
		}, [closeDelay, setOpen]);
		const handleDismiss = q$1(() => setOpen(false), [setOpen]);
		y$1(() => {
			return () => {
				clearTimeout(openTimerRef.current);
				clearTimeout(closeTimerRef.current);
			};
		}, []);
		return u$1(HoverCardProvider, {
			scope: __scopeHoverCard,
			open,
			onOpenChange: setOpen,
			onOpen: handleOpen,
			onClose: handleClose,
			onDismiss: handleDismiss,
			hasSelectionRef,
			isPointerDownOnContentRef,
			children: u$1(Root2$1, {
				...popperScope,
				children
			})
		});
	};
	HoverCard.displayName = HOVERCARD_NAME;
	var TRIGGER_NAME = "HoverCardTrigger";
	var HoverCardTrigger = D$1((props, forwardedRef) => {
		const { __scopeHoverCard, ...triggerProps } = props;
		const context = useHoverCardContext(TRIGGER_NAME, __scopeHoverCard);
		return u$1(Anchor, {
			asChild: true,
			...usePopperScope(__scopeHoverCard),
			children: u$1(Primitive.a, {
				"data-state": context.open ? "open" : "closed",
				...triggerProps,
				ref: forwardedRef,
				onPointerEnter: composeEventHandlers(props.onPointerEnter, excludeTouch(context.onOpen)),
				onPointerLeave: composeEventHandlers(props.onPointerLeave, excludeTouch(context.onClose)),
				onFocus: composeEventHandlers(props.onFocus, context.onOpen),
				onBlur: composeEventHandlers(props.onBlur, context.onClose),
				onTouchStart: composeEventHandlers(props.onTouchStart, (event) => event.preventDefault())
			})
		});
	});
	HoverCardTrigger.displayName = TRIGGER_NAME;
	var PORTAL_NAME = "HoverCardPortal";
	var [PortalProvider, usePortalContext] = createHoverCardContext(PORTAL_NAME, { forceMount: void 0 });
	var HoverCardPortal = (props) => {
		const { __scopeHoverCard, forceMount, children, container } = props;
		const context = useHoverCardContext(PORTAL_NAME, __scopeHoverCard);
		return u$1(PortalProvider, {
			scope: __scopeHoverCard,
			forceMount,
			children: u$1(Presence, {
				present: forceMount || context.open,
				children: u$1(Portal$2, {
					asChild: true,
					container,
					children
				})
			})
		});
	};
	HoverCardPortal.displayName = PORTAL_NAME;
	var CONTENT_NAME = "HoverCardContent";
	var HoverCardContent = D$1((props, forwardedRef) => {
		const portalContext = usePortalContext(CONTENT_NAME, props.__scopeHoverCard);
		const { forceMount = portalContext.forceMount, ...contentProps } = props;
		const context = useHoverCardContext(CONTENT_NAME, props.__scopeHoverCard);
		return u$1(Presence, {
			present: forceMount || context.open,
			children: u$1(HoverCardContentImpl, {
				"data-state": context.open ? "open" : "closed",
				...contentProps,
				onPointerEnter: composeEventHandlers(props.onPointerEnter, excludeTouch(context.onOpen)),
				onPointerLeave: composeEventHandlers(props.onPointerLeave, excludeTouch(context.onClose)),
				ref: forwardedRef
			})
		});
	});
	HoverCardContent.displayName = CONTENT_NAME;
	var HoverCardContentImpl = D$1((props, forwardedRef) => {
		const { __scopeHoverCard, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, ...contentProps } = props;
		const context = useHoverCardContext(CONTENT_NAME, __scopeHoverCard);
		const popperScope = usePopperScope(__scopeHoverCard);
		const ref = A$2(null);
		const composedRefs = useComposedRefs(forwardedRef, ref);
		const [containSelection, setContainSelection] = d$1(false);
		y$1(() => {
			if (containSelection) {
				const body = document.body;
				originalBodyUserSelect = body.style.userSelect || body.style.webkitUserSelect;
				body.style.userSelect = "none";
				body.style.webkitUserSelect = "none";
				return () => {
					body.style.userSelect = originalBodyUserSelect;
					body.style.webkitUserSelect = originalBodyUserSelect;
				};
			}
		}, [containSelection]);
		y$1(() => {
			if (ref.current) {
				const handlePointerUp = () => {
					setContainSelection(false);
					context.isPointerDownOnContentRef.current = false;
					setTimeout(() => {
						if (document.getSelection()?.toString() !== "") context.hasSelectionRef.current = true;
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
		y$1(() => {
			if (ref.current) getTabbableNodes(ref.current).forEach((tabbable) => tabbable.setAttribute("tabindex", "-1"));
		});
		return u$1(DismissableLayer, {
			asChild: true,
			disableOutsidePointerEvents: false,
			onInteractOutside,
			onEscapeKeyDown,
			onPointerDownOutside,
			onFocusOutside: composeEventHandlers(onFocusOutside, (event) => {
				event.preventDefault();
			}),
			onDismiss: context.onDismiss,
			children: u$1(Content, {
				...popperScope,
				...contentProps,
				onPointerDown: composeEventHandlers(contentProps.onPointerDown, (event) => {
					if (event.currentTarget.contains(event.target)) setContainSelection(true);
					context.hasSelectionRef.current = false;
					context.isPointerDownOnContentRef.current = true;
				}),
				ref: composedRefs,
				style: {
					...contentProps.style,
					userSelect: containSelection ? "text" : void 0,
					WebkitUserSelect: containSelection ? "text" : void 0,
					"--radix-hover-card-content-transform-origin": "var(--radix-popper-transform-origin)",
					"--radix-hover-card-content-available-width": "var(--radix-popper-available-width)",
					"--radix-hover-card-content-available-height": "var(--radix-popper-available-height)",
					"--radix-hover-card-trigger-width": "var(--radix-popper-anchor-width)",
					"--radix-hover-card-trigger-height": "var(--radix-popper-anchor-height)"
				}
			})
		});
	});
	var ARROW_NAME = "HoverCardArrow";
	var HoverCardArrow = D$1((props, forwardedRef) => {
		const { __scopeHoverCard, ...arrowProps } = props;
		return u$1(Arrow, {
			...usePopperScope(__scopeHoverCard),
			...arrowProps,
			ref: forwardedRef
		});
	});
	HoverCardArrow.displayName = ARROW_NAME;
	function excludeTouch(eventHandler) {
		return (event) => event.pointerType === "touch" ? void 0 : eventHandler();
	}
	function getTabbableNodes(container) {
		const nodes = [];
		const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, { acceptNode: (node) => {
			return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
		} });
		while (walker.nextNode()) nodes.push(walker.currentNode);
		return nodes;
	}
	var Root2 = HoverCard;
	var Trigger = HoverCardTrigger;
	var Portal = HoverCardPortal;
	var Content2 = HoverCardContent;
	var Arrow2 = HoverCardArrow;
	var require_truncate = __commonJSMin(((exports, module) => {
		function isHighSurrogate(codePoint) {
			return codePoint >= 55296 && codePoint <= 56319;
		}
		function isLowSurrogate(codePoint) {
			return codePoint >= 56320 && codePoint <= 57343;
		}
		module.exports = function truncate(getLength, string, byteLength) {
			if (typeof string !== "string") throw new Error("Input must be string");
			var charLength = string.length;
			var curByteLength = 0;
			var codePoint;
			var segment;
			for (var i = 0; i < charLength; i += 1) {
				codePoint = string.charCodeAt(i);
				segment = string[i];
				if (isHighSurrogate(codePoint) && isLowSurrogate(string.charCodeAt(i + 1))) {
					i += 1;
					segment += string[i];
				}
				curByteLength += getLength(segment);
				if (curByteLength === byteLength) return string.slice(0, i + 1);
				else if (curByteLength > byteLength) return string.slice(0, i - segment.length + 1);
			}
			return string;
		};
	}));
	var require_browser$1 = __commonJSMin(((exports, module) => {
		function isHighSurrogate(codePoint) {
			return codePoint >= 55296 && codePoint <= 56319;
		}
		function isLowSurrogate(codePoint) {
			return codePoint >= 56320 && codePoint <= 57343;
		}
		module.exports = function getByteLength(string) {
			if (typeof string !== "string") throw new Error("Input must be string");
			var charLength = string.length;
			var byteLength = 0;
			var codePoint = null;
			var prevCodePoint = null;
			for (var i = 0; i < charLength; i++) {
				codePoint = string.charCodeAt(i);
				if (isLowSurrogate(codePoint)) if (prevCodePoint != null && isHighSurrogate(prevCodePoint)) byteLength += 1;
				else byteLength += 3;
				else if (codePoint <= 127) byteLength += 1;
				else if (codePoint >= 128 && codePoint <= 2047) byteLength += 2;
				else if (codePoint >= 2048 && codePoint <= 65535) byteLength += 3;
				prevCodePoint = codePoint;
			}
			return byteLength;
		};
	}));
	var require_browser = __commonJSMin(((exports, module) => {
		var truncate = require_truncate();
		var getLength = require_browser$1();
		module.exports = truncate.bind(null, getLength);
	}));
	var import_sanitize_filename = __toESM(__commonJSMin(((exports, module) => {
		var truncate = require_browser();
		var illegalRe = /[\/\?<>\\:\*\|"]/g;
		var controlRe = /[\x00-\x1f\x80-\x9f]/g;
		var reservedRe = /^\.+$/;
		var windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
		function replaceTrailingDotsAndSpaces(str, replacement) {
			var end = str.length;
			while (end > 0 && (str[end - 1] === "." || str[end - 1] === " ")) end--;
			return end < str.length ? str.slice(0, end) + replacement : str;
		}
		function sanitize(input, replacement) {
			if (typeof input !== "string") throw new Error("Input must be string");
			var sanitized = input.replace(illegalRe, replacement).replace(controlRe, replacement).replace(reservedRe, replacement).replace(windowsReservedRe, replacement);
			sanitized = replaceTrailingDotsAndSpaces(sanitized, replacement);
			return truncate(sanitized, 255);
		}
		module.exports = function(input, options) {
			var replacement = options && options.replacement || "";
			var output = sanitize(input, replacement);
			if (replacement === "") return output;
			return sanitize(output, "");
		};
	}))(), 1);
	function downloadFile(filename, type, content) {
		const blob = content instanceof Blob ? content : new Blob([content], { type });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
	function downloadUrl(filename, url) {
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
	function getFileNameWithFormat(format, ext, { title = document.title, chatId = "", createTime = Math.floor(Date.now() / 1e3), updateTime = Math.floor(Date.now() / 1e3) } = {}) {
		const _title = (0, import_sanitize_filename.default)(title).replace(/\s+/g, "_");
		const _createTime = unixTimestampToISOString(createTime);
		const _updateTime = unixTimestampToISOString(updateTime);
		return format.replace("{title}", _title).replace("{date}", dateStr()).replace("{timestamp}", timestamp()).replace("{chat_id}", chatId).replace("{create_time}", _createTime).replace("{update_time}", _updateTime).concat(`.${ext}`);
	}
	async function exportToHtml(fileNameFormat, metaList) {
		const pageContext = getPageContext();
		if (pageContext.kind === "security-finding" || pageContext.kind === "security-scan") {
			const document = await loadCurrentSecurityDocument();
			if (!document) {
				alert(getSecurityUnsupportedMessage());
				return false;
			}
			const html = securityDocumentToHtml(document, metaList);
			downloadFile(getFileNameWithFormat(fileNameFormat, "html", getSecurityFileNameOptions(document)), "text/html", standardizeLineBreaks(html));
			return true;
		}
		if (pageContext.kind !== "conversation") {
			alert(getSecurityUnsupportedMessage());
			return false;
		}
		if (!checkIfConversationStarted()) {
			alert(i18n_default.t("Please start a conversation first"));
			return false;
		}
		const userAvatar = await getUserAvatar();
		const chatId = await getCurrentChatId();
		const conversation = processConversation(await fetchConversation(chatId, true));
		const html = conversationToHtml(conversation, userAvatar, metaList);
		downloadFile(getFileNameWithFormat(fileNameFormat, "html", {
			title: conversation.title,
			chatId,
			createTime: conversation.createTime,
			updateTime: conversation.updateTime
		}), "text/html", standardizeLineBreaks(html));
		return true;
	}
	async function exportAllToHtml(fileNameFormat, apiConversations, metaList) {
		const userAvatar = await getUserAvatar();
		const zip = new jszip.default();
		const filenameMap = new Map();
		apiConversations.map((x) => processConversation(x)).forEach((conversation) => {
			let fileName = getFileNameWithFormat(fileNameFormat, "html", {
				title: conversation.title,
				chatId: conversation.id,
				createTime: conversation.createTime,
				updateTime: conversation.updateTime
			});
			if (filenameMap.has(fileName)) {
				const count = filenameMap.get(fileName) ?? 1;
				filenameMap.set(fileName, count + 1);
				fileName = `${fileName.slice(0, -5)} (${count}).html`;
			} else filenameMap.set(fileName, 1);
			const content = conversationToHtml(conversation, userAvatar, metaList);
			zip.file(fileName, content);
		});
		downloadFile("chatgpt-export-html.zip", "application/zip", await zip.generateAsync({
			type: "blob",
			compression: "DEFLATE",
			compressionOptions: { level: 9 }
		}));
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
		const { id, title, model, modelSlug, createTime, updateTime, conversationNodes } = conversation;
		const enableTimestamp = ScriptStorage.get("exporter:enable_timestamp") ?? false;
		const timeStampHtml = ScriptStorage.get("exporter:timestamp_html") ?? false;
		const timeStamp24H = ScriptStorage.get("exporter:timestamp_24h") ?? false;
		const LatexRegex = /(\s\$\$.+?\$\$\s|\s\$.+?\$\s|\\\[.+?\\\]|\\\(.+?\\\))|(^\$$[\S\s]+?^\$$)|(^\$\$[\S\s]+?^\$\$\$)/gm;
		const conversationHtml = conversationNodes.map(({ message }) => {
			const exportMessage = resolveExportMessage(message);
			if (!exportMessage?.content) return null;
			if (!shouldIncludeMessageForExport(exportMessage)) return null;
			const author = getExportAuthorLabel(exportMessage);
			const model = exportMessage.metadata?.model_slug === "gpt-4" ? "GPT-4" : "GPT-3";
			const authorType = exportMessage.author.role === "user" ? "user" : model;
			const avatarEl = exportMessage.author.role === "user" ? `<img alt="${author}" />` : "<svg width=\"41\" height=\"41\"><use xlink:href=\"#chatgpt\" /></svg>";
			let postSteps = [];
			if (exportMessage.author.role === "assistant") {
				postSteps.push((input) => transformFootNotes$1(input, exportMessage.metadata));
				postSteps.push((input) => transformContentReferences$1(input, exportMessage.metadata));
				postSteps.push((input) => {
					const matches = input.match(LatexRegex);
					const isCodeBlock = /```/.test(input);
					if (!isCodeBlock && matches) {
						let index = 0;
						input = input.replace(LatexRegex, () => {
							return `╬${index++}╬`;
						});
						input = input.replace(/^\\\[(.+)\\\]$/gm, "$$$$$1$$$$").replace(/\\\[/g, "$$").replace(/\\\]/g, "$$").replace(/\\\(/g, "$").replace(/\\\)/g, "$");
					}
					let transformed = toHtml(fromMarkdown(input));
					if (!isCodeBlock && matches) transformed = transformed.replace(/╬(\d+)╬/g, (_, index) => {
						return matches[+index];
					});
					return transformed;
				});
			}
			if (exportMessage.author.role === "user") postSteps = [...postSteps, (input) => `<p class="no-katex">${escapeHtml(input)}</p>`];
			const postProcess = (input) => postSteps.reduce((acc, fn) => fn(acc), input);
			const content = sanitizeLLMText(transformContent$1(exportMessage.content, exportMessage.metadata, postProcess));
			const timestamp = exportMessage.create_time ?? "";
			const showTimestamp = enableTimestamp && timeStampHtml && timestamp;
			let timestampHtml = "";
			if (showTimestamp) {
				const date = new Date(timestamp * 1e3);
				const conversationTime = date.toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: !timeStamp24H
				});
				timestampHtml = `<time class="time" datetime="${date.toISOString()}" title="${date.toLocaleString()}">${conversationTime}</time>`;
			}
			return `
<div class="conversation-item">
    <div class="author ${authorType}">
        ${avatarEl}
    </div>
    <div class="conversation-content-wrapper">
        <div class="conversation-content">
            ${content}
        </div>
    </div>
    ${timestampHtml}
</div>`;
		}).filter(Boolean).join("\n\n");
		const date = dateStr();
		const time = new Date().toISOString();
		const source = `${baseUrl}/c/${id}`;
		const lang = options?.lang || resolveDocumentLanguage();
		const theme = options?.theme || resolveColorScheme();
		const _metaList = metaList?.filter((x) => !!x.name).map(({ name, value }) => {
			return [name, value.replace("{title}", title).replace("{date}", date).replace("{timestamp}", timestamp()).replace("{source}", source).replace("{model}", model).replace("{mode_name}", modelSlug).replace("{create_time}", unixTimestampToISOString(createTime)).replace("{update_time}", unixTimestampToISOString(updateTime))];
		}) ?? [];
		const detailsHtml = _metaList.length > 0 ? `<details>
    <summary>Metadata</summary>
    <div class="metadata_container">
        ${_metaList.map(([key, value]) => `<div class="metadata_item"><div>${key}</div><div>${value}</div></div>`).join("\n")}
    </div>
</details>` : "";
		return template_default.replaceAll("{{title}}", title).replaceAll("{{date}}", date).replaceAll("{{time}}", time).replaceAll("{{source}}", source).replaceAll("{{lang}}", lang).replaceAll("{{theme}}", theme).replaceAll("{{avatar}}", avatar).replaceAll("{{details}}", detailsHtml).replaceAll("{{content}}", conversationHtml);
	}
	function transformFootNotes$1(input, metadata) {
		return input.replace(/【(\d+)†\((.+?)\)】/g, (match, citeIndex, _evidenceText) => {
			if (metadata?.citations?.find((cite) => cite.metadata?.extra?.cited_message_idx === +citeIndex)) return "";
			return match;
		});
	}
	function transformContentReferences$1(input, metadata) {
		const contentRefs = metadata?.content_references;
		if (!contentRefs || contentRefs.length === 0) return input;
		const sortedRefs = [...contentRefs].sort((a, b) => (b.matched_text?.length || 0) - (a.matched_text?.length || 0));
		let output = normalizeReferenceText(input);
		for (const ref of sortedRefs) {
			if (!ref.matched_text) continue;
			switch (ref.type) {
				case "sources_footnote": break;
				case "grouped_webpages": {
					const item = ref.items?.[0];
					if (item) {
						const links = [];
						links.push(`[${item.attribution || item.title}](${item.url})`);
						for (const sw of item.supporting_websites || []) links.push(`[${sw.attribution || sw.title}](${sw.url})`);
						output = replaceReferenceTokens(output, ref.matched_text, `(${links.join(", ")})`);
					} else output = replaceReferenceTokens(output, ref.matched_text, ref.alt || "");
					break;
				}
				default: output = replaceReferenceTokens(output, ref.matched_text, ref.alt || "");
			}
		}
		return output;
	}
	function transformContent$1(content, metadata, postProcess) {
		switch (content.content_type) {
			case "text": return postProcess(stripUiTokens(content.parts?.join("\n") || ""));
			case "code": return `Code:\n\`\`\`\n${stripUiTokens(content.text)}\n\`\`\``;
			case "execution_output": {
				const images = getExecutionOutputImages(metadata);
				if (images.length > 0) return images.map((image) => `<img src="${image.image_url}" height="${image.height}" width="${image.width}" />`).join("\n");
				return postProcess(`Result:\n\`\`\`\n${getExecutionOutputText(content)}\n\`\`\``);
			}
			case "tether_quote": return postProcess(`> ${stripUiTokens(content.title || content.text || "")}`);
			case "tether_browsing_code": return postProcess("");
			case "tether_browsing_display": {
				const metadataList = metadata?._cite_metadata?.metadata_list;
				if (Array.isArray(metadataList) && metadataList.length > 0) return postProcess(metadataList.map(({ title, url }) => {
					return `> [${title}](${url})`;
				}).join("\n"));
				return postProcess("");
			}
			case "multimodal_text": return content.parts?.map((part) => {
				if (typeof part === "string") return postProcess(stripUiTokens(part));
				if (part.content_type === "image_asset_pointer") return `<img src="${part.asset_pointer}" height="${part.height}" width="${part.width}" />`;
				if (part.content_type === "audio_transcription") return `<div style="font-style: italic; opacity: 0.65;">“${stripUiTokens(part.text)}”</div>`;
				if (part.content_type === "audio_asset_pointer") return null;
				if (part.content_type === "real_time_user_audio_video_asset_pointer") return null;
				return postProcess("[Unsupported multimodal content]");
			}).join("\n") || "";
			default: return postProcess(`[Unsupported Content: ${content.content_type} ]`);
		}
	}
	function escapeHtml(html) {
		return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
	}
	var Effect = class {
		_sideEffects = [];
		_cleanupFns = [];
		_isDisposed = false;
		add(sideEffect) {
			if (this._isDisposed) return;
			this._sideEffects.push(sideEffect);
		}
		run() {
			if (this._isDisposed) return;
			this._sideEffects.forEach((fn) => {
				const cleanupFn = fn();
				if (cleanupFn) this._cleanupFns.push(cleanupFn);
			});
			this._sideEffects = [];
		}
		dispose() {
			if (this._isDisposed) return;
			this._cleanupFns.forEach((fn) => fn());
			this._cleanupFns = [];
			this._isDisposed = true;
		}
	};
	var SECURITY_PNG_TARGET_ATTRIBUTE = "data-ce-security-png-target";
	function fnIgnoreElements(el) {
		return typeof el.shadowRoot === "object" && el.shadowRoot !== null;
	}
	function getConversationCaptureTarget() {
		return document.querySelector("#thread div:has(> [data-testid=\"conversation-turn-1\"])");
	}
	function getSecurityDetailPane() {
		const separator = document.querySelector("[role=\"separator\"][aria-label=\"Resize repository pane\"]");
		if (!(separator instanceof HTMLElement)) return null;
		const aside = separator.previousElementSibling;
		const detailPane = separator.nextElementSibling;
		if (!(aside instanceof HTMLElement) || !(detailPane instanceof HTMLElement)) return null;
		if (!aside.style.getPropertyValue("--codex-security-left-pane-width")) return null;
		return detailPane;
	}
	function resolveSecurityTitle(root) {
		const heading = root.querySelector("h1");
		if (!(heading instanceof HTMLElement)) return void 0;
		const title = heading.textContent?.trim();
		return title ? title : void 0;
	}
	function resolvePngCaptureSpec() {
		const pageContext = getPageContext();
		if (pageContext.kind === "conversation") {
			const thread = getConversationCaptureTarget();
			if (!thread || thread.children.length === 0 || thread.scrollHeight < 50) return null;
			return {
				mode: "conversation",
				element: thread,
				fileNameOptions: { chatId: getChatIdFromUrl() || void 0 }
			};
		}
		if (isSecurityExportPageContext(pageContext)) {
			const detailPane = getSecurityDetailPane();
			if (!detailPane || detailPane.scrollHeight < 50) return null;
			return {
				mode: "security",
				element: detailPane,
				fileNameOptions: { title: resolveSecurityTitle(detailPane) }
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
				if (previousAttribute === null) target.removeAttribute(SECURITY_PNG_TARGET_ATTRIBUTE);
				else target.setAttribute(SECURITY_PNG_TARGET_ATTRIBUTE, previousAttribute);
				target.style.overflow = previousOverflow;
				target.style.overflowY = previousOverflowY;
				target.style.height = previousHeight;
				target.style.maxHeight = previousMaxHeight;
			};
		});
	}
	async function takeScreenshot(target, width, height, additionalScale = 1, currentPass = 1) {
		const passLimit = 10;
		const scale = (window.devicePixelRatio || 1) * 2 * additionalScale;
		let canvas = null;
		try {
			canvas = await (0, html2canvas.default)(target, {
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
			alert(i18n_default.t("Please start a conversation first"));
			return false;
		}
		const captureSpec = resolvePngCaptureSpec();
		if (!captureSpec) {
			alert(pageContext.kind === "conversation" ? i18n_default.t("Failed to export to PNG. Failed to find the element node.") : isSecurityExportPageContext(pageContext) ? i18n_default.t("Failed to export to PNG. Failed to find the element node.") : getSecurityUnsupportedMessage());
			return false;
		}
		const effect = new Effect();
		if (captureSpec.mode === "conversation") applyConversationPngEffect(effect, captureSpec.element);
		else applySecurityPngEffect(effect, captureSpec.element);
		effect.run();
		await sleep(100);
		const dataUrl = await takeScreenshot(captureSpec.element, captureSpec.element.scrollWidth, captureSpec.element.scrollHeight);
		effect.dispose();
		if (!dataUrl) {
			alert("Failed to export to PNG. This might be caused by the size of the conversation. Please try to export a smaller conversation.");
			return false;
		}
		let fileNameOptions = captureSpec.fileNameOptions;
		if (captureSpec.mode === "security") try {
			const securityDocument = await loadCurrentSecurityDocument();
			if (securityDocument) fileNameOptions = {
				...fileNameOptions,
				...getSecurityFileNameOptions(securityDocument)
			};
		} catch (error) {
			console.warn("Failed to load security document metadata for PNG filename.", error);
		}
		downloadUrl(getFileNameWithFormat(fileNameFormat, "png", fileNameOptions), dataUrl);
		window.URL.revokeObjectURL(dataUrl);
		return true;
	}
	function convertMessageToTavern(node) {
		if (!node.message || node.message.content.content_type !== "text") return null;
		const authorRole = node.message.author.role;
		const createTime = node.message.create_time || new Date().getTime() / 1e3;
		const text = node.message.content.parts.join("\n");
		return {
			name: authorRole === "assistant" ? "Assistant" : "You",
			is_user: authorRole === "user",
			is_name: authorRole === "assistant",
			send_date: createTime,
			mes: text,
			swipes: [text],
			swipe_id: 0
		};
	}
	function convertToTavern(conversation) {
		return jsonlStringify([{
			user_name: "You",
			character_name: "Assistant"
		}, ...conversation.conversationNodes.map(convertMessageToTavern).filter(nonNullable)]);
	}
	function convertToOoba(conversation) {
		const pairs = [];
		const messages = conversation.conversationNodes.filter((node) => node.message?.author.role !== "tool" && node.message?.content.content_type === "text");
		let idx = 0;
		while (idx < messages.length - 1) {
			const message = messages[idx];
			const nextMessage = messages[idx + 1];
			if (!message.message || !nextMessage.message || message.message.content.content_type !== "text" || nextMessage.message.content.content_type !== "text") {
				idx += 1;
				continue;
			}
			const role = message.message.author.role;
			const text = message.message.content.parts[0];
			const nextRole = nextMessage.message.author.role;
			const nextText = nextMessage.message.content.parts[0];
			if (role === "system") {
				if (text !== "") pairs.push(["<|BEGIN-VISIBLE-CHAT|>", text]);
				idx += 1;
				continue;
			}
			if (role === "user") {
				if (nextRole === "assistant") {
					pairs.push([text, nextText]);
					idx += 2;
					continue;
				} else if (nextRole === "user") {
					pairs.push([text, ""]);
					idx += 1;
					continue;
				}
			}
			if (role === "assistant") {
				pairs.push(["", text]);
				idx += 1;
			}
		}
		const oobaData = {
			internal: pairs,
			visible: JSON.parse(JSON.stringify(pairs))
		};
		if (oobaData.visible[0] && oobaData.visible[0][0] === "<|BEGIN-VISIBLE-CHAT|>") oobaData.visible[0][0] = "";
		return JSON.stringify(oobaData, null, 2);
	}
	async function exportToJson(fileNameFormat) {
		const pageContext = getPageContext();
		if (pageContext.kind === "security-finding" || pageContext.kind === "security-scan") {
			const document = await loadCurrentSecurityDocument();
			if (!document) {
				alert(getSecurityUnsupportedMessage());
				return false;
			}
			downloadFile(getFileNameWithFormat(fileNameFormat, "json", getSecurityFileNameOptions(document)), "application/json", securityDocumentToJson(document));
			return true;
		}
		if (pageContext.kind !== "conversation") {
			alert(getSecurityUnsupportedMessage());
			return false;
		}
		if (!checkIfConversationStarted()) {
			alert(i18n_default.t("Please start a conversation first"));
			return false;
		}
		const chatId = await getCurrentChatId();
		const rawConversation = await fetchConversation(chatId, false);
		downloadFile(getFileNameWithFormat(fileNameFormat, "json", {
			title: processConversation(rawConversation).title,
			chatId
		}), "application/json", conversationToJson([rawConversation]));
		return true;
	}
	async function exportToTavern(fileNameFormat) {
		if (getPageContext().kind !== "conversation") {
			alert(getSecurityUnsupportedMessage());
			return false;
		}
		if (!checkIfConversationStarted()) {
			alert(i18n_default.t("Please start a conversation first"));
			return false;
		}
		const chatId = await getCurrentChatId();
		const conversation = processConversation(await fetchConversation(chatId, false));
		downloadFile(getFileNameWithFormat(`${fileNameFormat}.tavern`, "jsonl", {
			title: conversation.title,
			chatId
		}), "application/json-lines", convertToTavern(conversation));
		return true;
	}
	async function exportToOoba(fileNameFormat) {
		if (getPageContext().kind !== "conversation") {
			alert(getSecurityUnsupportedMessage());
			return false;
		}
		if (!checkIfConversationStarted()) {
			alert(i18n_default.t("Please start a conversation first"));
			return false;
		}
		const chatId = await getCurrentChatId();
		const conversation = processConversation(await fetchConversation(chatId, false));
		downloadFile(getFileNameWithFormat(`${fileNameFormat}.ooba`, "json", {
			title: conversation.title,
			chatId
		}), "application/json", convertToOoba(conversation));
		return true;
	}
	async function exportAllToOfficialJson(_fileNameFormat, apiConversations) {
		downloadFile("chatgpt-export.json", "application/json", conversationToJson(apiConversations));
		return true;
	}
	async function exportAllToJson(fileNameFormat, apiConversations) {
		const zip = new jszip.default();
		const filenameMap = new Map();
		apiConversations.map((x) => ({
			conversation: processConversation(x),
			rawConversation: x
		})).forEach(({ conversation, rawConversation }) => {
			let fileName = getFileNameWithFormat(fileNameFormat, "json", {
				title: conversation.title,
				chatId: conversation.id,
				createTime: conversation.createTime,
				updateTime: conversation.updateTime
			});
			if (filenameMap.has(fileName)) {
				const count = filenameMap.get(fileName) ?? 1;
				filenameMap.set(fileName, count + 1);
				fileName = `${fileName.slice(0, -5)} (${count}).json`;
			} else filenameMap.set(fileName, 1);
			const content = conversationToJson(rawConversation);
			zip.file(fileName, content);
		});
		downloadFile("chatgpt-export-json.zip", "application/zip", await zip.generateAsync({
			type: "blob",
			compression: "DEFLATE",
			compressionOptions: { level: 9 }
		}));
		return true;
	}
	function conversationToJson(conversation) {
		return JSON.stringify(conversation);
	}
	async function exportToMarkdown(fileNameFormat, metaList) {
		const pageContext = getPageContext();
		if (pageContext.kind === "security-finding" || pageContext.kind === "security-scan") {
			const document = await loadCurrentSecurityDocument();
			if (!document) {
				alert(getSecurityUnsupportedMessage());
				return false;
			}
			const markdown = securityDocumentToMarkdown(document, metaList);
			downloadFile(getFileNameWithFormat(fileNameFormat, "md", getSecurityFileNameOptions(document)), "text/markdown", standardizeLineBreaks(markdown));
			return true;
		}
		if (pageContext.kind !== "conversation") {
			alert(getSecurityUnsupportedMessage());
			return false;
		}
		if (!checkIfConversationStarted()) {
			alert(i18n_default.t("Please start a conversation first"));
			return false;
		}
		const chatId = await getCurrentChatId();
		const conversation = processConversation(await fetchConversation(chatId, true));
		const markdown = conversationToMarkdown(conversation, metaList);
		downloadFile(getFileNameWithFormat(fileNameFormat, "md", {
			title: conversation.title,
			chatId,
			createTime: conversation.createTime,
			updateTime: conversation.updateTime
		}), "text/markdown", standardizeLineBreaks(markdown));
		return true;
	}
	async function exportAllToMarkdown(fileNameFormat, apiConversations, metaList) {
		const zip = new jszip.default();
		const filenameMap = new Map();
		apiConversations.map((x) => processConversation(x)).forEach((conversation) => {
			let fileName = getFileNameWithFormat(fileNameFormat, "md", {
				title: conversation.title,
				chatId: conversation.id,
				createTime: conversation.createTime,
				updateTime: conversation.updateTime
			});
			if (filenameMap.has(fileName)) {
				const count = filenameMap.get(fileName) ?? 1;
				filenameMap.set(fileName, count + 1);
				fileName = `${fileName.slice(0, -3)} (${count}).md`;
			} else filenameMap.set(fileName, 1);
			const content = conversationToMarkdown(conversation, metaList);
			zip.file(fileName, content);
		});
		downloadFile("chatgpt-export-markdown.zip", "application/zip", await zip.generateAsync({
			type: "blob",
			compression: "DEFLATE",
			compressionOptions: { level: 9 }
		}));
		return true;
	}
	var LatexRegex = /(\s\$\$.+\$\$\s|\s\$.+\$\s|\\\[.+\\\]|\\\(.+\\\))|(^\$$[\S\s]+^\$$)|(^\$\$[\S\s]+^\$\$$)/gm;
	function conversationToMarkdown(conversation, metaList) {
		const { id, title, model, modelSlug, createTime, updateTime, conversationNodes } = conversation;
		const source = `${baseUrl}/c/${id}`;
		const _metaList = metaList?.filter((x) => !!x.name).map(({ name, value }) => {
			return `${name}: ${value.replace("{title}", title).replace("{date}", dateStr()).replace("{timestamp}", timestamp()).replace("{source}", source).replace("{model}", model).replace("{model_name}", modelSlug).replace("{create_time}", unixTimestampToISOString(createTime)).replace("{update_time}", unixTimestampToISOString(updateTime))}`;
		}) ?? [];
		const frontMatter = _metaList.length > 0 ? `---\n${_metaList.join("\n")}\n---\n\n` : "";
		const enableTimestamp = ScriptStorage.get("exporter:enable_timestamp") ?? false;
		const timeStampMarkdown = ScriptStorage.get("exporter:timestamp_markdown") ?? false;
		const timeStamp24H = ScriptStorage.get("exporter:timestamp_24h") ?? false;
		return `${frontMatter}# ${title}\n\n${conversationNodes.map(({ message }) => {
			const exportMessage = resolveExportMessage(message);
			if (!exportMessage?.content) return null;
			if (!shouldIncludeMessageForExport(exportMessage)) return null;
			const timestamp = exportMessage.create_time ?? "";
			const showTimestamp = enableTimestamp && timeStampMarkdown && timestamp;
			let timestampHtml = "";
			if (showTimestamp) {
				const date = new Date(timestamp * 1e3);
				const conversationTime = date.toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: !timeStamp24H
				});
				timestampHtml = `<time datetime="${date.toISOString()}" title="${date.toLocaleString()}">${conversationTime}</time>\n\n`;
			}
			const author = getExportAuthorLabel(exportMessage);
			const postSteps = [];
			if (exportMessage.author.role === "assistant") {
				postSteps.push((input) => transformContentReferences(input, exportMessage.metadata));
				postSteps.push((input) => transformFootNotes(input, exportMessage.metadata));
			}
			if (exportMessage.author.role === "assistant") postSteps.push((input) => {
				input = input.replace(/^\\\[(.+)\\\]$/gm, "$$$$$1$$$$").replace(/\\\[/g, "$").replace(/\\\]/g, "$").replace(/\\\(/g, "$").replace(/\\\)/g, "$");
				const matches = input.match(LatexRegex);
				const isCodeBlock = /```/.test(input);
				if (!isCodeBlock && matches) {
					let index = 0;
					input = input.replace(LatexRegex, () => {
						return `╬${index++}╬`;
					});
				}
				let transformed = toMarkdown(fromMarkdown(input));
				if (!isCodeBlock && matches) transformed = transformed.replace(/╬(\d+)╬/g, (_, index) => {
					return matches[+index];
				});
				return transformed;
			});
			const postProcess = (input) => postSteps.reduce((acc, fn) => fn(acc), input);
			const content = sanitizeLLMText(transformContent(exportMessage.content, exportMessage.metadata, postProcess));
			return `#### ${author}:\n${timestampHtml}${content}`;
		}).filter(Boolean).join("\n\n")}`;
	}
	function transformFootNotes(input, metadata) {
		const footNoteMarkRegex = /【(\d+)†\((.+?)\)】/g;
		const citationList = [];
		return `${input.replace(footNoteMarkRegex, (match, citeIndex, _evidenceText) => {
			const citation = metadata?.citations?.find((cite) => cite.metadata?.extra?.cited_message_idx === +citeIndex);
			if (citation) {
				citationList.push(citation);
				return `[^${citeIndex}]`;
			}
			return match;
		})}\n\n${citationList.map((citation) => {
			return `[^${citation.metadata?.extra?.cited_message_idx ?? 1}]: ${citation.metadata?.title ?? "No title"}`;
		}).join("\n")}`;
	}
	function transformContentReferences(input, metadata) {
		const contentRefs = metadata?.content_references;
		if (!contentRefs || contentRefs.length === 0) return input;
		const sortedRefs = [...contentRefs].sort((a, b) => (b.matched_text?.length || 0) - (a.matched_text?.length || 0));
		let output = normalizeReferenceText(input);
		for (const ref of sortedRefs) {
			if (!ref.matched_text) continue;
			switch (ref.type) {
				case "sources_footnote": break;
				case "grouped_webpages": {
					const item = ref.items?.[0];
					if (item) {
						const links = [];
						links.push(`[${item.attribution || item.title}](${item.url})`);
						for (const sw of item.supporting_websites || []) links.push(`[${sw.attribution || sw.title}](${sw.url})`);
						output = replaceReferenceTokens(output, ref.matched_text, `(${links.join(", ")})`);
					} else output = replaceReferenceTokens(output, ref.matched_text, ref.alt || "");
					break;
				}
				default: output = replaceReferenceTokens(output, ref.matched_text, ref.alt || "");
			}
		}
		return output;
	}
	function transformContent(content, metadata, postProcess) {
		switch (content.content_type) {
			case "text": return postProcess(stripUiTokens(content.parts?.join("\n") || ""));
			case "code": return `Code:\n\`\`\`\n${stripUiTokens(content.text)}\n\`\`\``;
			case "execution_output": {
				const images = getExecutionOutputImages(metadata);
				if (images.length > 0) return images.map((image) => `![image](${image.image_url})`).join("\n");
				return postProcess(`Result:\n\`\`\`\n${getExecutionOutputText(content)}\n\`\`\``);
			}
			case "tether_quote": return postProcess(`> ${stripUiTokens(content.title || content.text || "")}`);
			case "tether_browsing_code": return postProcess("");
			case "tether_browsing_display": {
				const metadataList = metadata?._cite_metadata?.metadata_list;
				if (Array.isArray(metadataList) && metadataList.length > 0) return postProcess(metadataList.map(({ title, url }) => `> [${title}](${url})`).join("\n"));
				return postProcess("");
			}
			case "multimodal_text": return content.parts?.map((part) => {
				if (typeof part === "string") return postProcess(stripUiTokens(part));
				if (part.content_type === "image_asset_pointer") return `![image](${part.asset_pointer})`;
				if (part.content_type === "audio_transcription") return `[audio] ${stripUiTokens(part.text)}`;
				if (part.content_type === "audio_asset_pointer") return null;
				if (part.content_type === "real_time_user_audio_video_asset_pointer") return null;
				return postProcess("[Unsupported multimodal content]");
			}).join("\n") || "";
			default: return postProcess(`[Unsupported Content: ${content.content_type}]`);
		}
	}
	init_compat_module();
	var historyPatched = false;
	function useLocation() {
		return C(subscribe$1, getSnapshot);
	}
	function getSnapshot() {
		return `${window.location.pathname}${window.location.search}`;
	}
	function subscribe$1(callback) {
		patchHistory();
		window.addEventListener("popstate", callback);
		window.addEventListener("locationchange", callback);
		return () => {
			window.removeEventListener("popstate", callback);
			window.removeEventListener("locationchange", callback);
		};
	}
	function patchHistory() {
		if (historyPatched) return;
		historyPatched = true;
		const dispatch = () => window.dispatchEvent(new Event("locationchange"));
		const originalPushState = window.history.pushState.bind(window.history);
		const originalReplaceState = window.history.replaceState.bind(window.history);
		window.history.pushState = function pushState(...args) {
			const result = originalPushState(...args);
			dispatch();
			return result;
		};
		window.history.replaceState = function replaceState(...args) {
			const result = originalReplaceState(...args);
			dispatch();
			return result;
		};
	}
	init_compat_module();
	function useWindowResize(selector) {
		return C(subscribe, selector);
	}
	function subscribe(callback) {
		window.addEventListener("resize", callback);
		return () => window.removeEventListener("resize", callback);
	}
	var EXPORT_DIALOG_CLASS_NAMES = {
		overlay: "ce-dialog-overlay",
		content: "ce-dialog-content",
		title: "ce-dialog-title"
	};
	var Divider = () => u$1("div", { className: "h-px bg-token-border-light" });
	function mitt_default(n) {
		return {
			all: n = n || new Map(),
			on: function(t, e) {
				var i = n.get(t);
				i ? i.push(e) : n.set(t, [e]);
			},
			off: function(t, e) {
				var i = n.get(t);
				i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
			},
			emit: function(t, e) {
				var i = n.get(t);
				i && i.slice().map(function(n) {
					n(e);
				}), (i = n.get("*")) && i.slice().map(function(n) {
					n(t, e);
				});
			}
		};
	}
	var RequestQueue = class {
		eventEmitter = mitt_default();
		queue = [];
		results = [];
		status = "IDLE";
		backoffMultiplier = 2;
		backoff;
		total = 0;
		completed = 0;
		constructor(minBackoff, maxBackoff) {
			this.minBackoff = minBackoff;
			this.maxBackoff = maxBackoff;
			this.backoff = minBackoff;
		}
		add(requestObject) {
			this.queue.push(requestObject);
		}
		start() {
			if (this.status === "IDLE") {
				this.total = this.queue.length;
				this.process();
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
		on(event, fn) {
			this.eventEmitter.on(event, fn);
			return () => this.eventEmitter.off(event, fn);
		}
		async process() {
			if (this.status === "STOPPED" || this.status === "COMPLETED") return;
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
			this.process();
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
	};
	_css("/**\n * Copyright 2022-Present Pionxzh\n * SPDX-License-Identifier: MPL-2.0\n */\n\n.CheckBoxLabel {\n    position: relative;\n    display: flex;\n    font-size: 16px;\n    vertical-align: middle;\n}\n\n.CheckBoxLabel * {\n    cursor: pointer;\n}\n\n.CheckBoxLabel[disabled] {\n    opacity: 0.7;\n}\n\n.CheckBoxLabel[disabled] * {\n    cursor: not-allowed;\n}\n\n.CheckBoxLabel input {\n    position: absolute;\n    opacity: 0;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    margin: 0;\n    padding: 0;\n}\n\n.CheckBoxLabel .IconWrapper {\n    display: inline-flex;\n    align-items: center;\n    position: relative;\n    vertical-align: middle;\n    font-size: 1.5rem;\n}\n\n.CheckBoxLabel input:checked ~ svg {\n    color: rgb(28 100 242);\n}\n\n.dark .CheckBoxLabel input:checked ~ svg {\n    color: rgb(144, 202, 249);\n}\n\n.CheckBoxLabel .LabelText {\n    margin-left: 0.5rem;\n    font-size: 1rem;\n    line-height: 1.5;\n}\n");
	function FileCode() {
		return u$1("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 384 512",
			className: "w-4 h-4",
			fill: "currentColor",
			children: u$1("path", { d: "M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM153 289l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L71 337c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM265 255l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" })
		});
	}
	function IconCamera() {
		return u$1("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 512 512",
			className: "w-4 h-4",
			fill: "currentColor",
			children: u$1("path", { d: "M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 384c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z" })
		});
	}
	function IconMarkdown() {
		return u$1("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 640 512",
			className: "w-4 h-4",
			fill: "currentColor",
			children: u$1("path", { d: "M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5 360.6H277v-120l-61.5 76.9-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9 61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z" })
		});
	}
	function IconCopy() {
		return u$1("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 512 512",
			className: "w-4 h-4",
			fill: "currentColor",
			children: u$1("path", { d: "M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z" })
		});
	}
	function IconArrowRightFromBracket() {
		return u$1("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 576 512",
			className: "w-4 h-4",
			fill: "currentColor",
			children: u$1("path", { d: "M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" })
		});
	}
	function IconSetting() {
		return u$1("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 15 15",
			className: "w-4 h-4",
			stroke: "currentColor",
			"stroke-width": "0.5",
			children: u$1("path", {
				d: "M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.977 11.7595 12.928 12.0403 12.6473L12.6464 12.0412C12.9271 11.7604 12.9761 11.3227 12.7644 10.9869L12.1902 10.076C12.3768 9.73688 12.5278 9.37515 12.638 8.99596L13.6879 8.75794C14.0751 8.67015 14.35 8.32601 14.35 7.92897V7.07183C14.35 6.6748 14.0751 6.33065 13.6879 6.24287L12.6381 6.00488C12.528 5.62578 12.3771 5.26414 12.1906 4.92507L12.7648 4.01407C12.9766 3.6782 12.9276 3.2405 12.6468 2.95975L12.0407 2.35366C11.76 2.07292 11.3223 2.02392 10.9864 2.23565L10.0755 2.80989C9.73622 2.62328 9.37437 2.47229 8.99505 2.36209L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 3.81251C5.44724 3.44339 6.05665 3.18424 6.71543 3.06839L7.07095 1.50024H7.92809L8.28355 3.06816C8.94267 3.18387 9.5524 3.44302 10.0794 3.81224L11.4397 2.9547L12.0458 3.56079L11.1882 4.92117C11.5573 5.44798 11.8164 6.0575 11.9321 6.71638L13.5 7.07183V7.92897L11.932 8.28444C11.8162 8.94342 11.557 9.55301 11.1878 10.0798L12.0453 11.4402L11.4392 12.0462L10.0787 11.1886C9.55192 11.5576 8.94241 11.8166 8.28355 11.9323L7.92809 13.5002H7.07095L6.71543 11.932C6.0569 11.8162 5.44772 11.5572 4.92116 11.1883L3.56055 12.046L2.95445 11.4399L3.81213 10.0794C3.4431 9.55266 3.18403 8.94326 3.06825 8.2845L1.50002 7.92897V7.07183L3.06818 6.71632C3.18388 6.05765 3.44283 5.44833 3.81171 4.92165L2.95398 3.561L3.56008 2.95491L4.92053 3.81251ZM9.02496 7.50008C9.02496 8.34226 8.34223 9.02499 7.50005 9.02499C6.65786 9.02499 5.97513 8.34226 5.97513 7.50008C5.97513 6.65789 6.65786 5.97516 7.50005 5.97516C8.34223 5.97516 9.02496 6.65789 9.02496 7.50008ZM9.92496 7.50008C9.92496 8.83932 8.83929 9.92499 7.50005 9.92499C6.1608 9.92499 5.07513 8.83932 5.07513 7.50008C5.07513 6.16084 6.1608 5.07516 7.50005 5.07516C8.83929 5.07516 9.92496 6.16084 9.92496 7.50008Z",
				fill: "currentColor",
				fillRule: "evenodd",
				clipRule: "evenodd"
			})
		});
	}
	function IconCross() {
		return u$1("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 15 15",
			width: "15",
			height: "15",
			children: u$1("path", {
				d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
				fill: "currentColor",
				fillRule: "evenodd",
				clipRule: "evenodd"
			})
		});
	}
	function IconJSON() {
		return u$1("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 24 24",
			className: "w-5 h-5",
			style: {
				marginInline: "-2px",
				marginTop: "2px"
			},
			"stroke-width": "2",
			stroke: "currentColor",
			fill: "none",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			children: [
				u$1("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none"
				}),
				u$1("path", { d: "M20 16v-8l3 8v-8" }),
				u$1("path", { d: "M15 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2z" }),
				u$1("path", { d: "M1 8h3v6.5a1.5 1.5 0 0 1 -3 0v-.5" }),
				u$1("path", { d: "M7 15a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1" })
			]
		});
	}
	function IconZip() {
		return u$1("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 24 24",
			className: "w-4 h-4",
			"stroke-width": "2",
			stroke: "currentColor",
			fill: "none",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			children: [
				u$1("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none"
				}),
				u$1("path", { d: "M6 20.735a2 2 0 0 1 -1 -1.735v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-1" }),
				u$1("path", { d: "M11 17a2 2 0 0 1 2 2v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2a2 2 0 0 1 2 -2z" }),
				u$1("path", { d: "M11 5l-1 0" }),
				u$1("path", { d: "M13 7l-1 0" }),
				u$1("path", { d: "M11 9l-1 0" }),
				u$1("path", { d: "M13 11l-1 0" }),
				u$1("path", { d: "M11 13l-1 0" }),
				u$1("path", { d: "M13 15l-1 0" })
			]
		});
	}
	function IconLoading({ className, style }) {
		return u$1("span", {
			style: { animation: "1.4s linear 0s infinite normal none running rotate" },
			children: u$1("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "22 22 44 44",
				className,
				style: {
					animation: "1.4s ease-in-out 0s infinite normal none running circularDash",
					...style
				},
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2",
				children: u$1("circle", {
					cx: "44",
					cy: "44",
					r: "20.2",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "3.6"
				})
			})
		});
	}
	function IconCheckBox() {
		return u$1("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 24 24",
			style: {
				width: "1em",
				height: "1em",
				display: "inline-block"
			},
			fill: "currentColor",
			children: u$1("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" })
		});
	}
	function IconCheckBoxChecked({ className }) {
		return u$1("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 24 24",
			className,
			style: {
				width: "1em",
				height: "1em",
				display: "inline-block"
			},
			fill: "currentColor",
			children: u$1("path", { d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })
		});
	}
	function IconUpload({ className, style }) {
		return u$1("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 24 24",
			className,
			style,
			fill: "none",
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			children: [
				u$1("path", {
					stroke: "none",
					d: "M0 0h24v24H0z",
					fill: "none"
				}),
				u$1("path", {
					stroke: "currentColor",
					d: "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"
				}),
				u$1("path", {
					stroke: "currentColor",
					d: "M7 9l5 -5l5 5"
				}),
				u$1("path", {
					stroke: "currentColor",
					d: "M12 4l0 12"
				})
			]
		});
	}
	init_hooks_module();
	var CheckBox = ({ className, checked = false, disabled, label, onCheckedChange }) => {
		const [isChecked, setChecked] = d$1(checked);
		const onChange = (e) => {
			const newValue = e.currentTarget.checked;
			setChecked(newValue);
			onCheckedChange?.(newValue);
		};
		y$1(() => {
			setChecked(checked);
		}, [checked]);
		return u$1("label", {
			className: `CheckBoxLabel ${className ?? ""}`,
			"aria-disabled": disabled,
			children: [u$1("span", {
				className: "IconWrapper",
				children: [u$1("input", {
					type: "checkbox",
					checked: isChecked,
					onChange,
					disabled
				}), isChecked ? u$1(IconCheckBoxChecked, {}) : u$1(IconCheckBox, {})]
			}), u$1("span", {
				className: "LabelText",
				children: label
			})]
		});
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
	init_compat_module();
	init_hooks_module();
	var SettingContext = X$1({
		...DEFAULT_EXPORTER_SETTINGS,
		exportMetaList: [...DEFAULT_EXPORT_META_LIST],
		setFormat: () => {},
		setEnableTimestamp: () => {},
		setTimeStamp24H: () => {},
		setEnableTimestampHTML: () => {},
		setEnableTimestampMarkdown: () => {},
		setEnableMeta: () => {},
		setExportMetaList: () => {},
		setExportAllLimit: () => {},
		resetDefault: () => {}
	});
	var SettingProvider = ({ children }) => {
		const [settings, setSettings] = d$1(() => getSettings());
		y$1(() => {
			const unsubscribe = subscribeSettings((nextSettings) => {
				setSettings(nextSettings);
			});
			return () => {
				unsubscribe();
			};
		}, []);
		y$1(() => {
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
		return u$1(SettingContext.Provider, {
			value: contextValue,
			children
		});
	};
	var useSettingContext = () => x$1(SettingContext);
	init_hooks_module();
	var ProjectSelect = ({ projects, selected, setSelected, disabled }) => {
		const { t } = useTranslation();
		return u$1("div", {
			className: "flex items-center text-gray-600 dark:text-gray-300 flex justify-between mb-3",
			children: [t("Select Project"), u$1("select", {
				disabled,
				className: "Select",
				value: selected?.id || "",
				onChange: (e) => {
					const projectId = e.currentTarget.value;
					setSelected(projects.find((p) => p.id === projectId) || null);
				},
				children: [u$1("option", {
					value: "",
					children: t("(no project)")
				}), projects.map((project) => u$1("option", {
					value: project.id,
					children: project.display.name
				}, project.id))]
			})]
		});
	};
	var ConversationSelect = ({ conversations, selected, setSelected, disabled, loading, error }) => {
		const { t } = useTranslation();
		return u$1(S$1, { children: [u$1("div", {
			className: "SelectToolbar",
			children: u$1(CheckBox, {
				label: t("Select All"),
				disabled,
				checked: selected.length === conversations.length,
				onCheckedChange: (checked) => {
					setSelected(checked ? conversations : []);
				}
			})
		}), u$1("ul", {
			className: "SelectList",
			children: [
				loading && u$1("li", {
					className: "SelectItem",
					children: [t("Loading"), "..."]
				}),
				error && u$1("li", {
					className: "SelectItem",
					children: [
						t("Error"),
						": ",
						error
					]
				}),
				!loading && !error && conversations.map((c) => u$1("li", {
					className: "SelectItem",
					children: u$1(CheckBox, {
						label: c.title,
						disabled,
						checked: selected.some((x) => x.id === c.id),
						onCheckedChange: (checked) => {
							setSelected(checked ? [...selected, c] : selected.filter((x) => x.id !== c.id));
						}
					})
				}, c.id))
			]
		})] });
	};
	var DialogContent$1 = ({ format }) => {
		const { t } = useTranslation();
		const { enableMeta, exportMetaList, exportAllLimit } = useSettingContext();
		const metaList = T$1(() => enableMeta ? exportMetaList : [], [enableMeta, exportMetaList]);
		const exportAllOptions = T$1(() => [
			{
				label: "Markdown",
				callback: exportAllToMarkdown
			},
			{
				label: "HTML",
				callback: exportAllToHtml
			},
			{
				label: "JSON",
				callback: exportAllToOfficialJson
			},
			{
				label: "JSON (ZIP)",
				callback: exportAllToJson
			}
		], []);
		const fileInputRef = A$2(null);
		const [exportSource, setExportSource] = d$1("API");
		const [apiConversations, setApiConversations] = d$1([]);
		const [localConversations, setLocalConversations] = d$1([]);
		const conversations = exportSource === "API" ? apiConversations : localConversations;
		const [projects, setProjects] = d$1([]);
		const [loading, setLoading] = d$1(false);
		const [error, setError] = d$1("");
		const [processing, setProcessing] = d$1(false);
		const [selectedProject, setSelectedProject] = d$1(null);
		const [selected, setSelected] = d$1([]);
		const [exportType, setExportType] = d$1(exportAllOptions[0].label);
		const disabled = loading || processing || !!error || selected.length === 0;
		const requestQueue = T$1(() => new RequestQueue(200, 1600), []);
		const archiveQueue = T$1(() => new RequestQueue(200, 1600), []);
		const deleteQueue = T$1(() => new RequestQueue(200, 1600), []);
		const [progress, setProgress] = d$1({
			total: 0,
			completed: 0,
			currentName: "",
			currentStatus: ""
		});
		const onUpload = q$1((e) => {
			const target = e.target;
			const file = target?.files?.[0];
			if (!file) return;
			const fileReader = new FileReader();
			fileReader.onload = () => {
				const data = parseLocalConversationsFromUpload(typeof fileReader.result === "string" ? fileReader.result : "");
				if (!data) {
					alert(t("Invalid File Format"));
					if (target) target.value = "";
					return;
				}
				setSelected([]);
				setExportSource("Local");
				setLocalConversations(data);
				if (target) target.value = "";
			};
			fileReader.onerror = () => {
				alert(t("Invalid File Format"));
				if (target) target.value = "";
			};
			fileReader.readAsText(file);
		}, [
			t,
			setExportSource,
			setLocalConversations
		]);
		y$1(() => {
			const off = requestQueue.on("progress", (progress) => {
				setProcessing(true);
				setProgress(progress);
			});
			return () => off();
		}, [requestQueue]);
		y$1(() => {
			const off = archiveQueue.on("progress", (progress) => {
				setProcessing(true);
				setProgress(progress);
			});
			return () => off();
		}, [archiveQueue]);
		y$1(() => {
			const off = deleteQueue.on("progress", (progress) => {
				setProcessing(true);
				setProgress(progress);
			});
			return () => off();
		}, [deleteQueue]);
		y$1(() => {
			const off = requestQueue.on("done", (results) => {
				setProcessing(false);
				const callback = exportAllOptions.find((o) => o.label === exportType)?.callback;
				if (callback) callback(format, results, metaList);
			});
			return () => off();
		}, [
			requestQueue,
			exportAllOptions,
			exportType,
			format,
			metaList
		]);
		y$1(() => {
			const off = archiveQueue.on("done", () => {
				setProcessing(false);
				setApiConversations(apiConversations.filter((c) => !selected.some((s) => s.id === c.id)));
				setSelected([]);
				alert(t("Conversation Archived Message"));
			});
			return () => off();
		}, [
			archiveQueue,
			apiConversations,
			selected,
			t
		]);
		y$1(() => {
			const off = deleteQueue.on("done", () => {
				setProcessing(false);
				setApiConversations(apiConversations.filter((c) => !selected.some((s) => s.id === c.id)));
				setSelected([]);
				alert(t("Conversation Deleted Message"));
			});
			return () => off();
		}, [
			deleteQueue,
			apiConversations,
			selected,
			t
		]);
		const exportAllFromApi = q$1(() => {
			if (disabled) return;
			requestQueue.clear();
			selected.forEach(({ id, title }) => {
				requestQueue.add({
					name: title,
					request: () => fetchConversation(id, exportType !== "JSON")
				});
			});
			requestQueue.start();
		}, [
			disabled,
			selected,
			requestQueue,
			exportType
		]);
		const exportAllFromLocal = q$1(() => {
			if (disabled) return;
			const results = localConversations.filter((c) => selected.some((s) => s.id === c.id));
			const callback = exportAllOptions.find((o) => o.label === exportType)?.callback;
			if (callback) callback(format, results, metaList);
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
		}, [
			exportSource,
			exportAllFromApi,
			exportAllFromLocal
		]);
		const deleteAll = q$1(() => {
			if (disabled) return;
			if (!confirm(t("Conversation Delete Alert"))) return;
			deleteQueue.clear();
			selected.forEach(({ id, title }) => {
				deleteQueue.add({
					name: title,
					request: () => deleteConversation(id)
				});
			});
			deleteQueue.start();
		}, [
			disabled,
			selected,
			deleteQueue,
			t
		]);
		const archiveAll = q$1(() => {
			if (disabled) return;
			if (!confirm(t("Conversation Archive Alert"))) return;
			archiveQueue.clear();
			selected.forEach(({ id, title }) => {
				archiveQueue.add({
					name: title,
					request: () => archiveConversation(id)
				});
			});
			archiveQueue.start();
		}, [
			disabled,
			selected,
			archiveQueue,
			t
		]);
		y$1(() => {
			fetchProjects().then(setProjects).catch((err) => setError(err.toString()));
		}, []);
		y$1(() => {
			setLoading(true);
			fetchAllConversations(selectedProject?.id, exportAllLimit).then(setApiConversations).catch((err) => {
				console.error("Error fetching conversations:", err);
				setError(err.message || "Failed to load conversations");
			}).finally(() => setLoading(false));
		}, [selectedProject, exportAllLimit]);
		return u$1(S$1, { children: [
			u$1(Title, {
				className: EXPORT_DIALOG_CLASS_NAMES.title,
				children: t("Export Dialog Title")
			}),
			u$1("div", {
				className: "flex items-center text-gray-600 dark:text-gray-300 flex justify-between border-b-[1px] pb-3 mb-3 dark:border-gray-700",
				children: [
					t("Export from official export file"),
					" (conversations.json)\xA0",
					exportSource === "API" && u$1("button", {
						className: "btn relative btn-neutral",
						onClick: () => fileInputRef.current?.click(),
						children: u$1(IconUpload, { className: "w-4 h-4" })
					})
				]
			}),
			u$1("input", {
				type: "file",
				accept: "application/json",
				className: "hidden",
				ref: fileInputRef,
				onChange: onUpload
			}),
			exportSource === "API" && u$1("div", {
				className: "flex items-center text-gray-600 dark:text-gray-300 flex justify-between mb-3",
				children: t("Export from API")
			}),
			u$1(ProjectSelect, {
				projects,
				selected: selectedProject,
				setSelected: setSelectedProject,
				disabled: processing || loading
			}),
			u$1(ConversationSelect, {
				conversations,
				selected,
				setSelected,
				disabled: processing,
				loading,
				error
			}),
			u$1("div", {
				className: "flex mt-6",
				style: { justifyContent: "space-between" },
				children: [
					u$1("select", {
						className: "Select",
						disabled: processing,
						value: exportType,
						onChange: (e) => setExportType(e.currentTarget.value),
						children: exportAllOptions.map(({ label }) => u$1("option", {
							value: label,
							children: label
						}, t(label)))
					}),
					u$1("div", { className: "flex flex-grow" }),
					u$1("button", {
						className: "Button red",
						disabled: disabled || exportSource === "Local",
						onClick: archiveAll,
						children: t("Archive")
					}),
					u$1("button", {
						className: "Button red ml-4",
						disabled: disabled || exportSource === "Local",
						onClick: deleteAll,
						children: t("Delete")
					}),
					u$1("button", {
						className: "Button green ml-4",
						disabled,
						onClick: exportAll,
						children: t("Export")
					})
				]
			}),
			processing && u$1(S$1, { children: [u$1("div", {
				className: "mt-2 mb-1 justify-between flex",
				children: [u$1("span", {
					className: "truncate mr-8",
					children: progress.currentName
				}), u$1("span", { children: `${progress.completed}/${progress.total}` })]
			}), u$1("div", {
				className: "w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700",
				children: u$1("div", {
					className: "bg-blue-600 h-2.5 rounded-full",
					style: { width: `${progress.completed / progress.total * 100}%` }
				})
			})] }),
			u$1(Close, {
				asChild: true,
				children: u$1("button", {
					className: "IconButton CloseButton",
					"aria-label": "Close",
					children: u$1(IconCross, {})
				})
			})
		] });
	};
	var ExportDialog = ({ format, open, onOpenChange, children }) => {
		return u$1(Root$1, {
			open,
			onOpenChange,
			children: [u$1(Trigger$1, {
				asChild: true,
				children
			}), u$1(Portal$1, { children: [u$1(Overlay, { className: EXPORT_DIALOG_CLASS_NAMES.overlay }), u$1(Content$1, {
				className: EXPORT_DIALOG_CLASS_NAMES.content,
				children: open && u$1(DialogContent$1, { format })
			})] })]
		});
	};
	function shouldSuppressClickAfterTouch(lastTouchTimestampMs, nowMs) {
		if (!lastTouchTimestampMs || lastTouchTimestampMs <= 0) return false;
		const elapsedMs = nowMs - lastTouchTimestampMs;
		if (elapsedMs < 0) return false;
		return elapsedMs <= 700;
	}
	init_hooks_module();
	var TIMEOUT = 2500;
	var MenuItem = ({ text, successText, disabled = false, title, icon: Icon, onClick, className }) => {
		const [loading, setLoading] = d$1(false);
		const [succeed, setSucceed] = d$1(false);
		const lastTouchTimestampMsRef = A$2(null);
		const handleClickAsync = async (e) => {
			e.preventDefault();
			if (loading || disabled) return;
			if (!onClick) return;
			try {
				setLoading(true);
				if (await onClick()) {
					setSucceed(true);
					setTimeout(() => setSucceed(false), TIMEOUT);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		const handleClick = typeof onClick === "function" ? (e) => {
			if (shouldSuppressClickAfterTouch(lastTouchTimestampMsRef.current, Date.now())) return;
			handleClickAsync(e);
		} : void 0;
		const handleTouchStart = typeof onClick === "function" ? (e) => {
			lastTouchTimestampMsRef.current = Date.now();
			handleClickAsync(e);
		} : void 0;
		return u$1("div", {
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
			title,
			children: loading ? u$1("div", {
				className: "flex justify-center items-center w-full h-full",
				children: u$1(IconLoading, { className: "w-4 h-4" })
			}) : u$1(S$1, { children: [Icon && u$1(Icon, {}), succeed && successText ? successText : text] })
		});
	};
	"stream" in Blob.prototype || Object.defineProperty(Blob.prototype, "stream", { value() {
		return new Response(this).body;
	} }), "setBigUint64" in DataView.prototype || Object.defineProperty(DataView.prototype, "setBigUint64", { value(e, n, t) {
		const i = Number(4294967295n & n), r = Number(n >> 32n);
		this.setUint32(e + (t ? 0 : 4), i, t), this.setUint32(e + (t ? 4 : 0), r, t);
	} });
	var e = (e) => new DataView(new ArrayBuffer(e)), n = (e) => new Uint8Array(e.buffer || e), t = (e) => new TextEncoder().encode(String(e)), i = (e) => Math.min(4294967295, Number(e)), r = (e) => Math.min(65535, Number(e));
	function o(e, i, r) {
		void 0 === i || i instanceof Date || (i = new Date(i));
		const o = void 0 !== e;
		if (r || (r = o ? 436 : 509), e instanceof File) return {
			isFile: o,
			t: i || new Date(e.lastModified),
			bytes: e.stream(),
			mode: r
		};
		if (e instanceof Response) return {
			isFile: o,
			t: i || new Date(e.headers.get("Last-Modified") || Date.now()),
			bytes: e.body,
			mode: r
		};
		if (void 0 === i) i = new Date();
		else if (isNaN(i)) throw new Error("Invalid modification date.");
		if (!o) return {
			isFile: o,
			t: i,
			mode: r
		};
		if ("string" == typeof e) return {
			isFile: o,
			t: i,
			bytes: t(e),
			mode: r
		};
		if (e instanceof Blob) return {
			isFile: o,
			t: i,
			bytes: e.stream(),
			mode: r
		};
		if (e instanceof Uint8Array || e instanceof ReadableStream) return {
			isFile: o,
			t: i,
			bytes: e,
			mode: r
		};
		if (e instanceof ArrayBuffer || ArrayBuffer.isView(e)) return {
			isFile: o,
			t: i,
			bytes: n(e),
			mode: r
		};
		if (Symbol.asyncIterator in e) return {
			isFile: o,
			t: i,
			bytes: f(e[Symbol.asyncIterator]()),
			mode: r
		};
		throw new TypeError("Unsupported input format.");
	}
	function f(e, n = e) {
		return new ReadableStream({
			async pull(n) {
				let t = 0;
				for (; n.desiredSize > t;) {
					const i = await e.next();
					if (!i.value) {
						n.close();
						break;
					}
					{
						const e = a(i.value);
						n.enqueue(e), t += e.byteLength;
					}
				}
			},
			cancel(e) {
				n.throw?.(e);
			}
		});
	}
	function a(e) {
		return "string" == typeof e ? t(e) : e instanceof Uint8Array ? e : n(e);
	}
	function s(e, i, r) {
		let [o, f] = function(e) {
			return e ? e instanceof Uint8Array ? [e, 1] : ArrayBuffer.isView(e) || e instanceof ArrayBuffer ? [n(e), 1] : [t(e), 0] : [void 0, 0];
		}(i);
		if (e instanceof File) return {
			i: d(o || t(e.name)),
			o: BigInt(e.size),
			u: f
		};
		if (e instanceof Response) {
			const n = e.headers.get("content-disposition"), i = n && n.match(/;\s*filename\*?\s*=\s*(?:UTF-\d+''|)["']?([^;"'\r\n]*)["']?(?:;|$)/i), a = i && i[1] || e.url && new URL(e.url).pathname.split("/").findLast(Boolean), s = a && decodeURIComponent(a), u = r || +e.headers.get("content-length");
			return {
				i: d(o || t(s)),
				o: BigInt(u),
				u: f
			};
		}
		return o = d(o, void 0 !== e || void 0 !== r), "string" == typeof e ? {
			i: o,
			o: BigInt(t(e).length),
			u: f
		} : e instanceof Blob ? {
			i: o,
			o: BigInt(e.size),
			u: f
		} : e instanceof ArrayBuffer || ArrayBuffer.isView(e) ? {
			i: o,
			o: BigInt(e.byteLength),
			u: f
		} : {
			i: o,
			o: u(e, r),
			u: f
		};
	}
	function u(e, n) {
		return n > -1 ? BigInt(n) : e ? void 0 : 0n;
	}
	function d(e, n = 1) {
		if (!e || e.every(((c) => 47 === c))) throw new Error("The file must have a name.");
		if (n) for (; 47 === e[e.length - 1];) e = e.subarray(0, -1);
		else 47 !== e[e.length - 1] && (e = new Uint8Array([...e, 47]));
		return e;
	}
	var l = new Uint32Array(256);
	for (let e = 0; e < 256; ++e) {
		let n = e;
		for (let e = 0; e < 8; ++e) n = n >>> 1 ^ (1 & n && 3988292384);
		l[e] = n;
	}
	function y(e, n = 0) {
		n = ~n;
		for (var t = 0, i = e.length; t < i; t++) n = n >>> 8 ^ l[255 & n ^ e[t]];
		return ~n >>> 0;
	}
	function w(e, n, t = 0) {
		const i = e.getSeconds() >> 1 | e.getMinutes() << 5 | e.getHours() << 11, r = e.getDate() | e.getMonth() + 1 << 5 | e.getFullYear() - 1980 << 9;
		n.setUint16(t, i, 1), n.setUint16(t + 2, r, 1);
	}
	function B({ i: e, u: n }, t) {
		return 8 * (!n || (t ?? function(e) {
			try {
				b.decode(e);
			} catch {
				return 0;
			}
			return 1;
		}(e)));
	}
	var b = new TextDecoder("utf8", { fatal: 1 });
	function p(t, i = 0) {
		const r = e(30);
		return r.setUint32(0, 1347093252), r.setUint32(4, 754976768 | i), w(t.t, r, 10), r.setUint16(26, t.i.length, 1), n(r);
	}
	async function* g(e) {
		let { bytes: n } = e;
		if ("then" in n && (n = await n), n instanceof Uint8Array) yield n, e.l = y(n, 0), e.o = BigInt(n.length);
		else {
			e.o = 0n;
			const t = n.getReader();
			for (;;) {
				const { value: n, done: i } = await t.read();
				if (i) break;
				e.l = y(n, e.l), e.o += BigInt(n.length), yield n;
			}
		}
	}
	function I(t, r) {
		const o = e(16 + (r ? 8 : 0));
		return o.setUint32(0, 1347094280), o.setUint32(4, t.isFile ? t.l : 0, 1), r ? (o.setBigUint64(8, t.o, 1), o.setBigUint64(16, t.o, 1)) : (o.setUint32(8, i(t.o), 1), o.setUint32(12, i(t.o), 1)), n(o);
	}
	function v(t, r, o = 0, f = 0) {
		const a = e(46);
		return a.setUint32(0, 1347092738), a.setUint32(4, 755182848), a.setUint16(8, 2048 | o), w(t.t, a, 12), a.setUint32(16, t.isFile ? t.l : 0, 1), a.setUint32(20, i(t.o), 1), a.setUint32(24, i(t.o), 1), a.setUint16(28, t.i.length, 1), a.setUint16(30, f, 1), a.setUint16(40, t.mode | (t.isFile ? 32768 : 16384), 1), a.setUint32(42, i(r), 1), n(a);
	}
	function h(t, i, r) {
		const o = e(r);
		return o.setUint16(0, 1, 1), o.setUint16(2, r - 4, 1), 16 & r && (o.setBigUint64(4, t.o, 1), o.setBigUint64(12, t.o, 1)), o.setBigUint64(r - 8, i, 1), n(o);
	}
	function D(e) {
		return e instanceof File || e instanceof Response ? [[e], [e]] : [[
			e.input,
			e.name,
			e.size
		], [
			e.input,
			e.lastModified,
			e.mode
		]];
	}
	var S = (e) => function(e) {
		let n = BigInt(22), t = 0n, i = 0;
		for (const r of e) {
			if (!r.i) throw new Error("Every file must have a non-empty name.");
			if (void 0 === r.o) throw new Error(`Missing size for file "${new TextDecoder().decode(r.i)}".`);
			const e = r.o >= 4294967295n, o = t >= 4294967295n;
			t += BigInt(46 + r.i.length + (e && 8)) + r.o, n += BigInt(r.i.length + 46 + (12 * o | 28 * e)), i || (i = e);
		}
		return (i || t >= 4294967295n) && (n += BigInt(76)), n + t;
	}(function* (e) {
		for (const n of e) yield s(...D(n)[0]);
	}(e));
	function A(e, n = {}) {
		const t = {
			"Content-Type": "application/zip",
			"Content-Disposition": "attachment"
		};
		return ("bigint" == typeof n.length || Number.isInteger(n.length)) && n.length > 0 && (t["Content-Length"] = String(n.length)), n.metadata && (t["Content-Length"] = String(S(n.metadata))), new Response(N(e, n), { headers: t });
	}
	function N(t, a = {}) {
		const u = function(e) {
			const n = e[Symbol.iterator in e ? Symbol.iterator : Symbol.asyncIterator]();
			return {
				async next() {
					const e = await n.next();
					if (e.done) return e;
					const [t, i] = D(e.value);
					return {
						done: 0,
						value: Object.assign(o(...i), s(...t))
					};
				},
				throw: n.throw?.bind(n),
				[Symbol.asyncIterator]() {
					return this;
				}
			};
		}(t);
		return f(async function* (t, o) {
			const f = [];
			let a = 0n, s = 0n, u = 0;
			for await (const e of t) {
				const n = B(e, o.buffersAreUTF8);
				yield p(e, n), yield new Uint8Array(e.i), e.isFile && (yield* g(e));
				const t = e.o >= 4294967295n, i = 12 * (a >= 4294967295n) | 28 * t;
				yield I(e, t), f.push(v(e, a, n, i)), f.push(e.i), i && f.push(h(e, a, i)), t && (a += 8n), s++, a += BigInt(46 + e.i.length) + e.o, u || (u = t);
			}
			let d = 0n;
			for (const e of f) yield e, d += BigInt(e.length);
			if (u || a >= 4294967295n) {
				const t = e(76);
				t.setUint32(0, 1347094022), t.setBigUint64(4, BigInt(44), 1), t.setUint32(12, 755182848), t.setBigUint64(24, s, 1), t.setBigUint64(32, s, 1), t.setBigUint64(40, d, 1), t.setBigUint64(48, a, 1), t.setUint32(56, 1347094023), t.setBigUint64(64, a + d, 1), t.setUint32(72, 1, 1), yield n(t);
			}
			const l = e(22);
			l.setUint32(0, 1347093766), l.setUint16(8, r(s), 1), l.setUint16(10, r(s), 1), l.setUint32(12, i(d), 1), l.setUint32(16, i(a), 1), yield n(l);
		}(u, a), u);
	}
	function getSecurityFindingDocuments(findings) {
		return findings.map((finding, index) => {
			const start = performance.now();
			const document = normalizeSecurityFindingDocument(finding);
			console.debug("[chatgpt-exporter] security archive normalized finding", {
				index,
				hid: finding.hid,
				title: document.title,
				durationMs: Math.round(performance.now() - start)
			});
			return document;
		});
	}
	function addSecurityArchiveFile(files, fileNameFormat, ext, document, filenameMap, content) {
		let fileName = getFileNameWithFormat(fileNameFormat, ext, getSecurityFileNameOptions(document));
		if (filenameMap.has(fileName)) {
			const count = filenameMap.get(fileName) ?? 1;
			filenameMap.set(fileName, count + 1);
			fileName = `${fileName.slice(0, -(ext.length + 1))} (${count}).${ext}`;
		} else filenameMap.set(fileName, 1);
		console.debug("[chatgpt-exporter] security archive add file", {
			fileName,
			ext,
			contentLength: content.length
		});
		files.push({
			name: fileName,
			input: new Blob([content], { type: "text/plain;charset=utf-8" }),
			size: new TextEncoder().encode(content).byteLength
		});
	}
	async function downloadSecurityArchive(archiveName, files) {
		const start = performance.now();
		console.debug("[chatgpt-exporter] security archive generate start", {
			archiveName,
			fileCount: files.length
		});
		const response = A(files, { metadata: files.map(({ name, input }) => ({
			name,
			size: input.size
		})) });
		const progressResponse = response.clone();
		const contentLength = progressResponse.headers.get("content-length");
		console.debug("[chatgpt-exporter] security archive response ready", {
			archiveName,
			contentLength
		});
		const reader = progressResponse.body?.getReader();
		if (reader) {
			const expectedBytes = contentLength ? Number(contentLength) : null;
			let bytesRead = 0;
			let lastLoggedPercent = -1;
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				bytesRead += value.byteLength;
				const percent = expectedBytes && expectedBytes > 0 ? Math.floor(bytesRead / expectedBytes * 100) : null;
				if (percent !== lastLoggedPercent) {
					lastLoggedPercent = percent ?? lastLoggedPercent;
					console.debug("[chatgpt-exporter] security archive generate progress", {
						archiveName,
						bytesRead,
						expectedBytes,
						percent
					});
				}
			}
		}
		const blob = await response.blob();
		console.debug("[chatgpt-exporter] security archive generate done", {
			archiveName,
			fileCount: files.length,
			blobSize: blob.size,
			durationMs: Math.round(performance.now() - start)
		});
		downloadFile(archiveName, "application/zip", blob);
		console.debug("[chatgpt-exporter] security archive download dispatched", {
			archiveName,
			blobSize: blob.size
		});
		return true;
	}
	async function exportAllSecurityFindingsToMarkdown(fileNameFormat, findings, metaList) {
		const files = [];
		const filenameMap = new Map();
		getSecurityFindingDocuments(findings).forEach((document) => {
			const start = performance.now();
			const content = standardizeLineBreaks(securityDocumentToMarkdown(document, metaList));
			console.debug("[chatgpt-exporter] security archive rendered markdown", {
				title: document.title,
				bytes: content.length,
				durationMs: Math.round(performance.now() - start)
			});
			addSecurityArchiveFile(files, fileNameFormat, "md", document, filenameMap, content);
		});
		return downloadSecurityArchive("chatgpt-security-findings-markdown.zip", files);
	}
	async function exportAllSecurityFindingsToHtml(fileNameFormat, findings, metaList) {
		const files = [];
		const filenameMap = new Map();
		getSecurityFindingDocuments(findings).forEach((document) => {
			const start = performance.now();
			const content = standardizeLineBreaks(securityDocumentToHtml(document, metaList));
			console.debug("[chatgpt-exporter] security archive rendered html", {
				title: document.title,
				bytes: content.length,
				durationMs: Math.round(performance.now() - start)
			});
			addSecurityArchiveFile(files, fileNameFormat, "html", document, filenameMap, content);
		});
		return downloadSecurityArchive("chatgpt-security-findings-html.zip", files);
	}
	async function exportAllSecurityFindingsToJson(fileNameFormat, findings) {
		const files = [];
		const filenameMap = new Map();
		getSecurityFindingDocuments(findings).forEach((document) => {
			const start = performance.now();
			const content = standardizeLineBreaks(securityDocumentToJson(document));
			console.debug("[chatgpt-exporter] security archive rendered json", {
				title: document.title,
				bytes: content.length,
				durationMs: Math.round(performance.now() - start)
			});
			addSecurityArchiveFile(files, fileNameFormat, "json", document, filenameMap, content);
		});
		return downloadSecurityArchive("chatgpt-security-findings-json.zip", files);
	}
	function getFirstValue(params, key) {
		const value = params.get(key)?.trim();
		return value ? value : void 0;
	}
	function toTitleCase(value) {
		return value.split(/[_-]/).filter(Boolean).map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");
	}
	function summarizeCsv(value) {
		return value.split(",").map((part) => part.trim()).filter(Boolean).map(toTitleCase).join(", ");
	}
	function getSecurityFindingsListFilters(search = window.location.search) {
		const params = new URLSearchParams(search);
		const repo = getFirstValue(params, "repo");
		const author = getFirstValue(params, "author");
		const status = getFirstValue(params, "status") ?? "new,triaged,in_progress";
		const criticality = getFirstValue(params, "criticality") ?? getFirstValue(params, "sev");
		return {
			...repo ? { repo } : {},
			...author ? { author } : {},
			...status ? { status } : {},
			...criticality ? { criticality } : {}
		};
	}
	async function resolveSecurityFindingsListFilters(pageContext, search = window.location.search) {
		const filters = getSecurityFindingsListFilters(search);
		if (filters.repo || pageContext.kind !== "security-finding" || !pageContext.findingId) return filters;
		const finding = await fetchSecurityFinding(pageContext.findingId);
		return {
			...filters,
			...finding.repo_url ? { repo: finding.repo_url } : {}
		};
	}
	function getSecurityFindingsFilterSummary(filters) {
		const summary = [];
		if (filters.repo) summary.push({
			label: "Repository",
			value: filters.repo.split(",").map((value) => value.trim()).filter(Boolean).join(", ")
		});
		if (filters.criticality) summary.push({
			label: "Severity",
			value: summarizeCsv(filters.criticality)
		});
		if (filters.status) summary.push({
			label: "Status",
			value: summarizeCsv(filters.status)
		});
		if (filters.author) summary.push({
			label: "Author",
			value: filters.author
		});
		return summary;
	}
	init_hooks_module();
	function getFindingProgressName(finding) {
		return (typeof finding.commit_analysis === "object" && finding.commit_analysis && "title" in finding.commit_analysis && typeof finding.commit_analysis.title === "string" ? finding.commit_analysis.title.trim() : "") || finding.hid || finding.id;
	}
	var DialogContent = ({ format }) => {
		const { t } = useTranslation();
		const { enableMeta, exportMetaList, exportAllLimit } = useSettingContext();
		const metaList = T$1(() => enableMeta ? exportMetaList : [], [enableMeta, exportMetaList]);
		const pageContext = T$1(() => getPageContext(), []);
		const initialFilters = T$1(() => getSecurityFindingsListFilters(), []);
		const exportOptions = T$1(() => [
			{
				label: "Markdown",
				callback: exportAllSecurityFindingsToMarkdown
			},
			{
				label: "HTML",
				callback: exportAllSecurityFindingsToHtml
			},
			{
				label: "JSON",
				callback: exportAllSecurityFindingsToJson
			}
		], []);
		const [filters, setFilters] = d$1(initialFilters);
		const [matchingTotal, setMatchingTotal] = d$1(null);
		const [loading, setLoading] = d$1(false);
		const [processing, setProcessing] = d$1(false);
		const [error, setError] = d$1("");
		const [warning, setWarning] = d$1("");
		const [exportType, setExportType] = d$1(exportOptions[0].label);
		const [progress, setProgress] = d$1({
			total: 0,
			completed: 0,
			currentName: ""
		});
		const filterSummary = T$1(() => getSecurityFindingsFilterSummary(filters), [filters]);
		y$1(() => {
			let cancelled = false;
			setLoading(true);
			setError("");
			setWarning("");
			setMatchingTotal(null);
			resolveSecurityFindingsListFilters(pageContext).then((resolvedFilters) => {
				if (cancelled) return null;
				setFilters(resolvedFilters);
				return fetchSecurityFindings({
					...resolvedFilters,
					limit: 1,
					cursor: 0
				});
			}).then((response) => {
				if (!response || cancelled) return;
				if (cancelled) return;
				setMatchingTotal(response.total);
			}).catch((loadError) => {
				if (cancelled) return;
				console.error("Error fetching security findings:", loadError);
				setError(loadError instanceof Error ? loadError.message : "Failed to load findings");
			}).finally(() => {
				if (!cancelled) setLoading(false);
			});
			return () => {
				cancelled = true;
			};
		}, [pageContext]);
		const disabled = loading || processing || !!error || (matchingTotal ?? 0) === 0;
		const exportAll = q$1(async () => {
			if (disabled) return;
			try {
				setProcessing(true);
				setError("");
				setWarning("");
				const findings = await fetchAllSecurityFindings(filters, { maxItems: exportAllLimit });
				setProgress({
					total: findings.length,
					completed: 0,
					currentName: findings.length > 0 ? getFindingProgressName(findings[0]) : ""
				});
				const fullFindings = [];
				let skippedCount = 0;
				for (const [index, finding] of findings.entries()) {
					setProgress({
						total: findings.length,
						completed: index,
						currentName: getFindingProgressName(finding)
					});
					try {
						fullFindings.push(await fetchSecurityFinding(finding.hid || finding.id));
					} catch (findingError) {
						skippedCount += 1;
						console.error("Error fetching security finding for export:", findingError);
					}
				}
				if (fullFindings.length === 0) throw new Error("Failed to load any findings for export");
				setProgress({
					total: findings.length,
					completed: findings.length,
					currentName: "Packaging export"
				});
				const callback = exportOptions.find((option) => option.label === exportType)?.callback;
				if (callback) await callback(format, fullFindings, metaList);
				const warnings = [];
				if ((matchingTotal ?? 0) > exportAllLimit) warnings.push(`Exported the first ${fullFindings.length} findings because the export limit is ${exportAllLimit}.`);
				if (skippedCount > 0) warnings.push(`Skipped ${skippedCount} findings that could not be loaded.`);
				setWarning(warnings.join(" "));
			} catch (exportError) {
				console.error("Error exporting security findings:", exportError);
				setError(exportError instanceof Error ? exportError.message : "Failed to export findings");
			} finally {
				setProcessing(false);
			}
		}, [
			disabled,
			exportAllLimit,
			exportOptions,
			exportType,
			filters,
			format,
			matchingTotal,
			metaList
		]);
		return u$1(S$1, { children: [
			u$1(Title, {
				className: EXPORT_DIALOG_CLASS_NAMES.title,
				children: "Export Matching Findings"
			}),
			u$1("div", {
				className: "text-gray-600 dark:text-gray-300 mb-3",
				children: "Export the current filtered findings set from this security view."
			}),
			u$1("div", {
				className: "border-b-[1px] pb-3 mb-3 dark:border-gray-700",
				children: [
					u$1("div", {
						className: "flex items-center text-gray-600 dark:text-gray-300 justify-between mb-2",
						children: [u$1("span", { children: "Matching findings" }), u$1("span", { children: loading ? `${t("Loading")}...` : matchingTotal ?? 0 })]
					}),
					filterSummary.length > 0 && u$1("ul", {
						className: "text-sm text-gray-600 dark:text-gray-300",
						children: filterSummary.map((item) => u$1("li", {
							className: "mb-1",
							children: [
								u$1("strong", { children: [item.label, ":"] }),
								" ",
								item.value
							]
						}, item.label))
					}),
					u$1("div", {
						className: "mt-3 text-sm text-gray-600 dark:text-gray-300",
						children: ["Export limit: ", exportAllLimit]
					}),
					!loading && (matchingTotal ?? 0) > exportAllLimit && u$1("div", {
						className: "mt-2 text-sm text-amber-600 dark:text-amber-400",
						children: [
							"This export will include the first ",
							exportAllLimit,
							" findings from the current filtered set."
						]
					}),
					error && u$1("div", {
						className: "mt-3 text-sm text-red-600 dark:text-red-400",
						children: [
							t("Error"),
							": ",
							error
						]
					}),
					!error && warning && u$1("div", {
						className: "mt-3 text-sm text-amber-600 dark:text-amber-400",
						children: warning
					})
				]
			}),
			u$1("div", {
				className: "flex mt-6",
				style: { justifyContent: "space-between" },
				children: [
					u$1("select", {
						className: "Select",
						disabled: processing || loading,
						value: exportType,
						onChange: (e) => setExportType(e.currentTarget.value),
						children: exportOptions.map(({ label }) => u$1("option", {
							value: label,
							children: label
						}, label))
					}),
					u$1("div", { className: "flex flex-grow" }),
					u$1("button", {
						className: "Button green ml-4",
						disabled,
						onClick: () => void exportAll(),
						children: t("Export")
					})
				]
			}),
			processing && u$1(S$1, { children: [u$1("div", {
				className: "mt-2 mb-1 justify-between flex",
				children: [u$1("span", {
					className: "truncate mr-8",
					children: progress.currentName
				}), u$1("span", { children: `${progress.completed}/${progress.total}` })]
			}), u$1("div", {
				className: "w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700",
				children: u$1("div", {
					className: "bg-blue-600 h-2.5 rounded-full",
					style: { width: progress.total > 0 ? `${progress.completed / progress.total * 100}%` : "0%" }
				})
			})] }),
			u$1(Close, {
				asChild: true,
				children: u$1("button", {
					className: "IconButton CloseButton",
					"aria-label": "Close",
					children: u$1(IconCross, {})
				})
			})
		] });
	};
	var SecurityFindingsExportDialog = ({ format, open, onOpenChange, children }) => {
		return u$1(Root$1, {
			open,
			onOpenChange,
			children: [u$1(Trigger$1, {
				asChild: true,
				children
			}), u$1(Portal$1, { children: [u$1(Overlay, { className: EXPORT_DIALOG_CLASS_NAMES.overlay }), u$1(Content$1, {
				className: EXPORT_DIALOG_CLASS_NAMES.content,
				children: open && u$1(DialogContent, { format })
			})] })]
		});
	};
	_css("/**\n * Copyright 2022-Present Pionxzh\n * Copyright 2026 Asim Ihsan\n * SPDX-License-Identifier: MPL-2.0\n */\n\nspan[data-time-format] {\n    display: none;\n}\n\nbody[data-time-format=\"12\"] span[data-time-format=\"12\"] {\n    display: inline;\n}\n\nbody[data-time-format=\"24\"] span[data-time-format=\"24\"] {\n    display: inline;\n}\n\n.Select {\n    padding: 0 0 0 0.5rem;\n    width: 7.5rem;\n    border-radius: 4px;\n    box-shadow: 0 0 0 1px #6f6e77;\n}\n\n.dark .Select {\n    background-color: #2f2f2f;\n    color: #fff;\n    box-shadow: 0 0 0 1px #6f6e77;\n}\n\nhtml {\n    --ce-text-primary: var(--text-primary, #0d0d0d);\n    --ce-menu-primary: #f7f7f8;\n    --ce-menu-secondary: #ececf1;\n    --ce-border-light: rgba(0, 0, 0, .14);\n}\n\n.dark {\n    --ce-text-primary: var(--text-primary, #ececec);\n    --ce-menu-primary: #202123;\n    --ce-menu-secondary: #2d2f34;\n    --ce-border-light: rgba(255, 255, 255, .16);\n}\n\n.ce-text-menu {\n    color: var(--ce-text-primary);\n}\n\n.ce-bg-menu {\n    background-color: var(--ce-menu-primary);\n}\n\n.ce-border-menu {\n    border-color: var(--ce-border-light);\n}\n\n.ce-menu-content,\n.ce-menu-content[data-state=\"open\"],\n.ce-menu-content[data-state=\"closed\"] {\n    display: flex !important;\n    flex-direction: column !important;\n    padding: 0.5rem 0.5rem 0.25rem !important;\n    opacity: 1 !important;\n    background-color: var(--ce-menu-primary) !important;\n    border-width: 1px !important;\n    border-style: solid !important;\n    border-radius: 0.375rem !important;\n    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18) !important;\n    backdrop-filter: none !important;\n    filter: none !important;\n    mix-blend-mode: normal !important;\n    isolation: isolate !important;\n}\n\n.ce-menu-item {\n    height: 46px;\n    width: 100%;\n    background-color: var(--ce-menu-primary) !important;\n    color: var(--ce-text-primary) !important;\n    border-width: 1px !important;\n    border-style: solid !important;\n}\n\n.ce-menu-item[aria-disabled=\"false\"]:hover {\n    background-color: var(--ce-menu-secondary) !important;\n}\n\n.ce-menu-trigger-success {\n    background-color: color-mix(in srgb, var(--ce-menu-secondary) 82%, #1f9f54 18%) !important;\n    border-color: color-mix(in srgb, var(--ce-border-light) 50%, #1f9f54 50%) !important;\n}\n\n.ce-menu-item[aria-disabled=\"true\"] {\n    filter: brightness(0.5);\n}\n\n.inputFieldSet {\n    display: block;\n    border-width: 2px;\n    border-style: groove;\n}\n\n.inputFieldSet legend {\n    margin-left: 4px;\n}\n\n.inputFieldSet input {\n    background-color: transparent;\n    box-shadow: none!important;\n}\n\n.dropdown-backdrop {\n    display: block;\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background-color: rgba(0,0,0,.5);\n    animation-name: cePointerFadeIn;\n    animation-duration: .3s;\n}\n\n@keyframes ceFadeIn {\n    from {\n        opacity: 0;\n    }\n    to {\n        opacity: 1;\n    }\n}\n\n@keyframes ceSlideUp {\n    from {\n        transform: translateY(100%);\n    }\n    to {\n        transform: translateY(0);\n    }\n}\n\n@keyframes cePointerFadeIn {\n    from {\n        opacity: 0;\n        pointer-events: none;\n    }\n    to {\n        opacity: 1;\n        pointer-events: auto;\n    }\n}\n\n@keyframes rotate {\n    from {\n        transform: rotate(0deg);\n    }\n    to {\n        transform: rotate(360deg);\n    }\n}\n\n@keyframes circularDash {\n    0% {\n        stroke-dasharray: 1px, 200px;\n        stroke-dashoffset: 0;\n    }\n    50% {\n        stroke-dasharray: 100px, 200px;\n        stroke-dashoffset: -15px;\n    }\n    100% {\n        stroke-dasharray: 100px, 200px;\n        stroke-dashoffset: -125px;\n    }\n}\n");
	_css("/**\n * Copyright 2022-Present Pionxzh\n * Copyright 2026 Asim Ihsan\n * SPDX-License-Identifier: MPL-2.0\n */\n\n.ce-dialog-overlay {\n    background-color: rgba(0, 0, 0, 0.44);\n    position: fixed;\n    inset: 0;\n    z-index: 1000;\n    animation: fadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1);\n}\n\n.ce-dialog-content {\n    background-color: #f3f3f3;\n    border-radius: 6px;\n    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 90vw;\n    max-width: 560px;\n    max-height: 85vh;\n    overflow-x: hidden;\n    overflow-y: auto;\n    padding: 16px 24px;\n    z-index: 1001;\n    outline: none;\n    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);\n}\n\n.dark .ce-dialog-content {\n    background-color: #2a2a2a;\n    border-color: #40414f;\n    border-width: 1px;\n}\n\n.ce-dialog-content input[type=\"checkbox\"] {\n    border: none;\n    outline: none;\n    box-shadow: none;\n}\n\n.ce-dialog-title {\n    margin: 0 0 16px 0;\n    font-weight: 500;\n    color: #1a1523;\n    font-size: 20px;\n}\n\n.dark .ce-dialog-title {\n    color: #fff;\n}\n\n.Button {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 4px;\n    padding: 0 15px;\n    font-size: 15px;\n    line-height: 1;\n    height: 35px;\n}\n.Button.green {\n    background-color: #ddf3e4;\n    color: #18794e;\n}\n.Button.red {\n    background-color: #f9d9d9;\n    color: #a71d2a;\n}\n.Button.green:hover {\n    background-color: #ccebd7;\n}\n.Button:disabled {\n    opacity: 0.5;\n    color: #6f6e77;\n    background-color: #e0e0e0;\n    cursor: not-allowed;\n}\n.Button:disabled:hover {\n    background-color: #e0e0e0;\n}\n\n.IconButton {\n    font-family: inherit;\n    border-radius: 100%;\n    height: 25px;\n    width: 25px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    color: #6f6e77;\n}\n.IconButton:hover {\n    background-color: rgba(0, 0, 0, 0.06);\n}\n\n.CloseButton {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n}\n\n.Fieldset {\n    display: flex;\n    gap: 20px;\n    align-items: center;\n    margin-bottom: 15px;\n}\n\n.Label {\n    font-size: 15px;\n    color: #1a1523;\n    min-width: 90px;\n    text-align: right;\n}\n\n.dark .Label {\n    color: #fff;\n}\n\n.Input {\n    width: 100%;\n    flex: 1;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 4px;\n    padding: 0 10px;\n    font-size: 15px;\n    line-height: 1;\n    color: #000;\n    background-color: #fafafa;\n    box-shadow: 0 0 0 1px #6f6e77;\n    height: 35px;\n    outline: none;\n}\n\n.dark .Input {\n    background-color: #2f2f2f;\n    color: #fff;\n    box-shadow: 0 0 0 1px #6f6e77;\n}\n\n.Description {\n    font-size: 13px;\n    color: #5a5865;\n    text-align: right;\n    margin-bottom: 4px;\n}\n\n.dark .Description {\n    color: #bcbcbc;\n}\n\n.SelectToolbar {\n    display: flex;\n    align-items: center;\n    padding: 12px 16px;\n    border-radius: 4px 4px 0 0;\n    border: 1px solid #6f6e77;\n    border-bottom: none;\n}\n\n.SelectList {\n    position: relative;\n    width: 100%;\n    height: 270px;\n    padding: 12px 16px;\n    overflow-x: hidden;\n    overflow-y: auto;\n    border: 1px solid #6f6e77;\n    border-radius: 0 0 4px 4px;\n    white-space: nowrap;\n}\n\n.SelectItem {\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.SelectItem label, .SelectItem input {\n    cursor: pointer;\n}\n\n.SelectItem span {\n    vertical-align: middle;\n}\n\n@keyframes contentShow {\n    from {\n        opacity: 0;\n        transform: translate(-50%, -48%) scale(0.96);\n    }\n    to {\n        opacity: 1;\n        transform: translate(-50%, -50%) scale(1);\n    }\n}\n");
	init_hooks_module();
	function MenuInner({ container }) {
		const { t } = useTranslation();
		useLocation();
		const pageContext = getPageContext();
		const capabilities = T$1(() => getExportCapabilities(pageContext), [pageContext]);
		const disabled = capabilities.historyDisabledApplies && getHistoryDisabled();
		const [open, setOpen] = d$1(false);
		const [jsonOpen, setJsonOpen] = d$1(false);
		const [exportOpen, setExportOpen] = d$1(false);
		const [shortcutCopied, setShortcutCopied] = d$1(false);
		const triggerRef = A$2(null);
		const menuRef = A$2(null);
		const copiedTimerRef = A$2(void 0);
		const { format, enableMeta, exportMetaList } = useSettingContext();
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
		const isMobile = useWindowResize(() => window.innerWidth) < 768;
		const isMenuOpen = open || jsonOpen || exportOpen;
		const desktopMenuWidth = 228;
		const hasSingleItemExports = capabilities.canExportText || capabilities.canExportPng || capabilities.canExportMarkdown || capabilities.canExportHtml || capabilities.canExportJson;
		y$1(() => {
			if (!open) return;
			const onPointerDown = (event) => {
				const target = event.target;
				if (!target) return;
				if (triggerRef.current?.contains(target)) return;
				if (menuRef.current?.contains(target)) return;
				setOpen(false);
			};
			const onKeyDown = (event) => {
				if (event.key === "Escape") setOpen(false);
			};
			document.addEventListener("pointerdown", onPointerDown, true);
			document.addEventListener("keydown", onKeyDown);
			return () => {
				document.removeEventListener("pointerdown", onPointerDown, true);
				document.removeEventListener("keydown", onKeyDown);
			};
		}, [open]);
		y$1(() => {
			const onShortcutCopied = () => {
				if (copiedTimerRef.current !== void 0) window.clearTimeout(copiedTimerRef.current);
				setShortcutCopied(true);
				copiedTimerRef.current = window.setTimeout(() => {
					setShortcutCopied(false);
					copiedTimerRef.current = void 0;
				}, 1600);
			};
			window.addEventListener(COPY_TEXT_SHORTCUT_SUCCESS_EVENT, onShortcutCopied);
			return () => {
				window.removeEventListener(COPY_TEXT_SHORTCUT_SUCCESS_EVENT, onShortcutCopied);
				if (copiedTimerRef.current !== void 0) window.clearTimeout(copiedTimerRef.current);
			};
		}, []);
		y$1(() => {
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
		if (disabled) return u$1(MenuItem, {
			className: "mt-1",
			text: "Chat History disabled",
			icon: IconArrowRightFromBracket,
			disabled: true
		});
		const menuContent = u$1(Content2, {
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
			children: [u$1("div", {
				ref: menuRef,
				children: [
					u$1(MenuItem, {
						text: t("Setting"),
						icon: IconSetting,
						onClick: onClickSetting
					}),
					hasSingleItemExports && u$1(S$1, { children: [
						u$1(MenuItem, {
							text: t("Copy Text"),
							successText: t("Copied!"),
							icon: IconCopy,
							disabled: !capabilities.canExportText,
							onClick: onClickText
						}),
						u$1(MenuItem, {
							text: t("Screenshot"),
							icon: IconCamera,
							disabled: !capabilities.canExportPng,
							onClick: onClickPng
						}),
						u$1(MenuItem, {
							text: t("Markdown"),
							icon: IconMarkdown,
							disabled: !capabilities.canExportMarkdown,
							onClick: onClickMarkdown
						}),
						u$1(MenuItem, {
							text: t("HTML"),
							icon: FileCode,
							disabled: !capabilities.canExportHtml,
							onClick: onClickHtml
						}),
						capabilities.canExportJson && u$1(Root$1, {
							open: jsonOpen,
							onOpenChange: setJsonOpen,
							children: [u$1(Trigger$1, {
								asChild: true,
								children: u$1(MenuItem, {
									text: t("JSON"),
									icon: IconJSON,
									onClick: onClickJSON
								})
							}), u$1(Portal$1, { children: [u$1(Overlay, { className: EXPORT_DIALOG_CLASS_NAMES.overlay }), u$1(Content$1, {
								className: EXPORT_DIALOG_CLASS_NAMES.content,
								style: { width: "320px" },
								children: [
									u$1(Title, {
										className: EXPORT_DIALOG_CLASS_NAMES.title,
										children: t("JSON")
									}),
									u$1(MenuItem, {
										text: t("OpenAI Official Format"),
										icon: IconCopy,
										onClick: onClickOfficialJSON
									}),
									capabilities.canExportTavern && u$1(MenuItem, {
										text: "JSONL (TavernAI, SillyTavern)",
										icon: IconCopy,
										onClick: onClickTavern
									}),
									capabilities.canExportOoba && u$1(MenuItem, {
										text: "Ooba (text-generation-webui)",
										icon: IconCopy,
										onClick: onClickOoba
									})
								]
							})] })]
						})
					] }),
					capabilities.canExportAll && (pageContext.kind === "security-findings-list" || pageContext.kind === "security-finding" ? u$1(SecurityFindingsExportDialog, {
						format,
						open: exportOpen,
						onOpenChange: setExportOpen,
						children: u$1("div", { children: u$1(MenuItem, {
							text: t("Export All"),
							icon: IconZip
						}) })
					}) : u$1(ExportDialog, {
						format,
						open: exportOpen,
						onOpenChange: setExportOpen,
						children: u$1("div", { children: u$1(MenuItem, {
							text: t("Export All"),
							icon: IconZip
						}) })
					}))
				]
			}), !isMobile && u$1(Arrow2, {
				width: "16",
				height: "8",
				style: {
					fill: "var(--ce-menu-primary)",
					stroke: "var(--ce-border-light)",
					strokeWidth: "2px"
				}
			})]
		});
		return u$1(S$1, { children: [
			isMobile && open && u$1("div", {
				className: "dropdown-backdrop ce-animate-fade-in",
				onClick: () => setOpen(false)
			}),
			u$1(Root2, {
				open: isMenuOpen,
				children: [u$1(Trigger, { children: u$1("div", {
					ref: triggerRef,
					children: u$1(MenuItem, {
						className: `mt-1 ${shortcutCopied ? "ce-menu-trigger-success" : ""}`,
						text: shortcutCopied ? t("Copied!") : t("ExportHelper"),
						icon: IconArrowRightFromBracket,
						onClick: onToggleMenu
					})
				}) }), u$1(Portal, {
					container: isMobile ? container : document.body,
					forceMount: isMenuOpen ? true : void 0,
					children: menuContent
				})]
			}),
			u$1(Divider, {})
		] });
	}
	function Menu({ container }) {
		return u$1(SettingProvider, { children: u$1(MenuInner, { container }) });
	}
	_css("/**\n * Copyright 2022-Present Pionxzh\n * Copyright 2026 Asim Ihsan\n * SPDX-License-Identifier: MPL-2.0\n */\n\n/* Utility fallback layer for Tailwind-like classes until a dedicated Tailwind build step is introduced. */\n.ce-animate-fade-in  {\n    animation: ceFadeIn .3s;\n}\n\n.ce-animate-slide-up  {\n    animation: ceSlideUp .3s;\n}\n\n.bg-blue-600 {\n    background-color: rgb(28 100 242);\n}\n\n.hover\\:bg-gray-500\\/10:hover {\n    background-color: hsla(0, 0%, 61%, .1)\n}\n\n.border-\\[\\#6f6e77\\] {\n    border-color: #6f6e77;\n}\n\n.cursor-help {\n    cursor: help;\n}\n\n.dark .dark\\:bg-white\\/5 {\n    background-color: rgb(255 255 255 / 5%);\n}\n\n.dark .dark\\:text-gray-200 {\n    color: rgb(229 231 235 / 1);\n}\n\n.dark .dark\\:text-gray-300 {\n    color: rgb(209 213 219 / 1);\n}\n\n.dark .dark\\:border-gray-\\[\\#86858d\\] {\n    border-color: #86858d;\n}\n\n.gap-x-1 {\n    column-gap: 0.25rem;\n}\n\n.h-2\\.5 {\n    height: 0.625rem;\n}\n\n.h-4 {\n    height: 1rem;\n}\n\n.inline-flex {\n    display: inline-flex;\n}\n\n.items-center {\n    align-items: center;\n}\n\n.ml-3 {\n    margin-left: 0.75rem;\n}\n\n.ml-4 {\n    margin-left: 1rem;\n}\n\n.mr-8 {\n    margin-right: 2rem;\n}\n\n.pb-0 {\n    padding-bottom: 0;\n}\n\n.pr-8 {\n    padding-right: 2rem;\n}\n\n.right-4 {\n    right: 1rem;\n}\n\n.rounded-full {\n    border-radius: 9999px;\n}\n\n.select-all {\n    user-select: all!important;\n}\n\n.space-y-6>:not([hidden])~:not([hidden]) {\n    --tw-space-y-reverse: 0;\n    margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));\n    margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));\n}\n\n.truncate {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.whitespace-nowrap {\n    white-space: nowrap;\n}\n\n@media (min-width:768px) {\n    /* md */\n}\n\n@media (min-width:1024px) {\n    .lg\\:mt-0 {\n        margin-top: 0;\n    }\n\n    .lg\\:top-8 {\n        top: 2rem;\n    }\n}\n\n\n.toggle-switch {\n    position: relative;\n    outline: none;\n    background-color: rgb(229 231 235);\n    border: 1px solid rgb(107 114 128);\n    border-radius: 9999px;\n    cursor: pointer;\n    height: 20px;\n    width: 32px;\n}\n\n.dark .toggle-switch {\n    background-color: rgb(255 255 255 / 5%);\n    border-color: rgb(255 255 255 / 1);\n}\n\n.toggle-switch[data-state=\"checked\"] {\n    background-color: rgb(0 0 0);\n    border-color: rgb(0 0 0);\n}\n\n.dark .toggle-switch[data-state=\"checked\"] {\n    background-color: rgb(22 163 74);\n    border-color: rgb(22 163 74);\n}\n\n.toggle-switch-handle {\n    display: block;\n    background-color: rgb(255 255 255);\n    border-radius: 9999px;\n    height: 16px;\n    width: 16px;\n    transition: transform 0.1s;\n    will-change: transform;\n    transform: translateX(1px);\n}\n\n.toggle-switch-handle[data-state=\"checked\"] {\n    transform: translateX(14px);\n}\n\n.toggle-switch-handle:hover {\n    background-color: rgb(243 244 246);\n}\n\n.toggle-switch-label {\n    color: rgb(107 114 128);\n    margin-left: 0.75rem;\n    font-size: 0.875rem;\n    font-weight: 500;\n}\n\n.toggle-switch-label:hover {\n    color: rgb(71 85 105);\n}\n");
	init_preact_module();
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
				injectionMap.set(nav, {
					container,
					kind: "conversation-nav"
				});
				const chatList = nav.querySelector(":scope > div.sticky.bottom-0");
				if (chatList) chatList.prepend(container);
				else {
					container.style.backgroundColor = "#171717";
					container.style.position = "sticky";
					container.style.bottom = "72px";
					nav.append(container);
				}
			};
			const injectShareMenu = (target) => {
				if (!getPageContext().isSharePage || injectionMap.has(target)) return;
				const container = getMenuContainer();
				injectionMap.set(target, {
					container,
					kind: "share-wrapper"
				});
				target.prepend(container);
			};
			const injectSecurityMenu = (target) => {
				if (!isSecurityMenuPageContext(getPageContext()) || injectionMap.has(target)) return;
				const container = getMenuContainer();
				injectionMap.set(target, {
					container,
					kind: "security-sidebar"
				});
				target.prepend(container);
			};
			const shouldKeepInjection = (target, kind) => {
				const pageContext = getPageContext();
				const record = injectionMap.get(target);
				if (!record || record.kind !== kind) return false;
				return shouldKeepInjectedContainer(target, record, pageContext);
			};
			setTimeout(() => {
				import_sentinel_umd.default.on("nav", injectNavMenu);
				import_sentinel_umd.default.on(`div[role="presentation"] > .w-full > div >.flex.w-full`, injectShareMenu);
				import_sentinel_umd.default.on("[role=\"separator\"][aria-label=\"Resize repository pane\"]", () => {
					const mountTarget = findSecuritySidebarMountTarget();
					if (mountTarget) injectSecurityMenu(mountTarget);
				});
				setInterval(() => {
					injectionMap.forEach((record, target) => {
						if (!shouldKeepInjection(target, record.kind)) {
							record.container.remove();
							injectionMap.delete(target);
						}
					});
					Array.from(document.querySelectorAll("nav")).filter((nav) => !injectionMap.has(nav)).forEach(injectNavMenu);
					if (isSharePage()) Array.from(document.querySelectorAll("div[role=\"presentation\"] > .w-full > div >.flex.w-full")).filter((target) => !injectionMap.has(target)).forEach(injectShareMenu);
					const securityMountTarget = findSecuritySidebarMountTarget();
					if (securityMountTarget && !injectionMap.has(securityMountTarget)) injectSecurityMenu(securityMountTarget);
				}, 300);
				let chatId = "";
				const addMessageTimestamps = async () => {
					const currentChatId = getChatIdFromUrl();
					if (!currentChatId || currentChatId === chatId) return;
					chatId = currentChatId;
					const { conversationNodes } = processConversation(await fetchConversation(chatId, false));
					const threadContents = Array.from(document.querySelectorAll("main [data-testid^=\"conversation-turn-\"] [data-message-id]"));
					if (threadContents.length === 0) return;
					threadContents.forEach((thread, index) => {
						const createTime = conversationNodes[index]?.message?.create_time;
						if (!createTime) return;
						const date = new Date(createTime * 1e3);
						const timestamp = document.createElement("time");
						timestamp.className = "w-full text-gray-500 dark:text-gray-400 text-sm text-right";
						timestamp.dateTime = date.toISOString();
						timestamp.title = date.toLocaleString();
						const hour12 = document.createElement("span");
						hour12.setAttribute("data-time-format", "12");
						hour12.textContent = date.toLocaleTimeString("en-US", {
							hour: "2-digit",
							minute: "2-digit"
						});
						const hour24 = document.createElement("span");
						hour24.setAttribute("data-time-format", "24");
						hour24.textContent = date.toLocaleTimeString("en-US", {
							hour: "2-digit",
							minute: "2-digit",
							hour12: false
						});
						timestamp.append(hour12, hour24);
						thread.append(timestamp);
					});
				};
				import_sentinel_umd.default.on("[role=\"presentation\"]", () => {
					addMessageTimestamps().catch((error) => {
						console.error("Failed to add message timestamps:", error);
					});
				});
			}, 1200);
		});
	}
	function getMenuContainer() {
		const container = document.createElement("div");
		container.style.zIndex = "99";
		R$1(u$1(Menu, { container }), container);
		return container;
	}
})(JSZip, html2canvas);
