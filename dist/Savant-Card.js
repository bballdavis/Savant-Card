/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt = globalThis, bt = rt.ShadowRoot && (rt.ShadyCSS === void 0 || rt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, yt = Symbol(), kt = /* @__PURE__ */ new WeakMap();
let Ut = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== yt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (bt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = kt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && kt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const se = (r) => new Ut(typeof r == "string" ? r : r + "", void 0, yt), $ = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, a) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[a + 1], r[0]);
  return new Ut(e, r, yt);
}, ie = (r, t) => {
  if (bt) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = rt.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, St = bt ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return se(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ae, defineProperty: oe, getOwnPropertyDescriptor: ne, getOwnPropertyNames: le, getOwnPropertySymbols: ce, getPrototypeOf: he } = Object, M = globalThis, At = M.trustedTypes, de = At ? At.emptyScript : "", ut = M.reactiveElementPolyfillSupport, Z = (r, t) => r, at = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? de : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, _t = (r, t) => !ae(r, t), Et = { attribute: !0, type: String, converter: at, reflect: !1, useDefault: !1, hasChanged: _t };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), M.litPropertyMetadata ?? (M.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let R = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Et) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && oe(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: a } = ne(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const n = i == null ? void 0 : i.call(this);
      a == null || a.call(this, o), this.requestUpdate(t, n, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Et;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Z("elementProperties"))) return;
    const t = he(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Z("properties"))) {
      const e = this.properties, s = [...le(e), ...ce(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(St(i));
    } else t !== void 0 && e.push(St(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ie(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var a;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((a = s.converter) == null ? void 0 : a.toAttribute) !== void 0 ? s.converter : at).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var a, o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), l = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((a = n.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? n.converter : at;
      this._$Em = i;
      const c = l.fromAttribute(e, n.type);
      this[i] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, a) {
    var o;
    if (t !== void 0) {
      const n = this.constructor;
      if (i === !1 && (a = this[t]), s ?? (s = n.getPropertyOptions(t)), !((s.hasChanged ?? _t)(a, e) || s.useDefault && s.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: a }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), a !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, o] of this._$Ep) this[a] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [a, o] of i) {
        const { wrapped: n } = o, l = this[a];
        n !== !0 || this._$AL.has(a) || l === void 0 || this.C(a, void 0, o, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var a;
        return (a = i.hostUpdate) == null ? void 0 : a.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, R[Z("elementProperties")] = /* @__PURE__ */ new Map(), R[Z("finalized")] = /* @__PURE__ */ new Map(), ut == null || ut({ ReactiveElement: R }), (M.reactiveElementVersions ?? (M.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, Ot = (r) => r, ot = K.trustedTypes, Pt = ot ? ot.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, It = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, Ft = "?" + C, pe = `<${Ft}>`, z = document, Q = () => z.createComment(""), X = (r) => r === null || typeof r != "object" && typeof r != "function", wt = Array.isArray, ue = (r) => wt(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", gt = `[ 	
\f\r]`, q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ct = /-->/g, Mt = />/g, B = RegExp(`>|${gt}(?:([^\\s"'>=/]+)(${gt}*=${gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Lt = /'/g, Nt = /"/g, Wt = /^(?:script|style|textarea|title)$/i, Vt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), h = Vt(1), st = Vt(2), U = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Bt = /* @__PURE__ */ new WeakMap(), T = z.createTreeWalker(z, 129);
function qt(r, t) {
  if (!wt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pt !== void 0 ? Pt.createHTML(t) : t;
}
const ge = (r, t) => {
  const e = r.length - 1, s = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = q;
  for (let n = 0; n < e; n++) {
    const l = r[n];
    let c, d, p = -1, m = 0;
    for (; m < l.length && (o.lastIndex = m, d = o.exec(l), d !== null); ) m = o.lastIndex, o === q ? d[1] === "!--" ? o = Ct : d[1] !== void 0 ? o = Mt : d[2] !== void 0 ? (Wt.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = B) : d[3] !== void 0 && (o = B) : o === B ? d[0] === ">" ? (o = i ?? q, p = -1) : d[1] === void 0 ? p = -2 : (p = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? B : d[3] === '"' ? Nt : Lt) : o === Nt || o === Lt ? o = B : o === Ct || o === Mt ? o = q : (o = B, i = void 0);
    const f = o === B && r[n + 1].startsWith("/>") ? " " : "";
    a += o === q ? l + pe : p >= 0 ? (s.push(c), l.slice(0, p) + It + l.slice(p) + C + f) : l + C + (p === -2 ? n : f);
  }
  return [qt(r, a + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class J {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let a = 0, o = 0;
    const n = t.length - 1, l = this.parts, [c, d] = ge(t, e);
    if (this.el = J.createElement(c, s), T.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = T.nextNode()) !== null && l.length < n; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(It)) {
          const m = d[o++], f = i.getAttribute(p).split(C), b = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: a, name: b[2], strings: f, ctor: b[1] === "." ? me : b[1] === "?" ? ve : b[1] === "@" ? be : dt }), i.removeAttribute(p);
        } else p.startsWith(C) && (l.push({ type: 6, index: a }), i.removeAttribute(p));
        if (Wt.test(i.tagName)) {
          const p = i.textContent.split(C), m = p.length - 1;
          if (m > 0) {
            i.textContent = ot ? ot.emptyScript : "";
            for (let f = 0; f < m; f++) i.append(p[f], Q()), T.nextNode(), l.push({ type: 2, index: ++a });
            i.append(p[m], Q());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ft) l.push({ type: 2, index: a });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(C, p + 1)) !== -1; ) l.push({ type: 7, index: a }), p += C.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const s = z.createElement("template");
    return s.innerHTML = t, s;
  }
}
function I(r, t, e = r, s) {
  var o, n;
  if (t === U) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const a = X(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== a && ((n = i == null ? void 0 : i._$AO) == null || n.call(i, !1), a === void 0 ? i = void 0 : (i = new a(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = I(r, i._$AS(r, t.values), i, s)), t;
}
class fe {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? z).importNode(e, !0);
    T.currentNode = i;
    let a = T.nextNode(), o = 0, n = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new et(a, a.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (c = new ye(a, this, t)), this._$AV.push(c), l = s[++n];
      }
      o !== (l == null ? void 0 : l.index) && (a = T.nextNode(), o++);
    }
    return T.currentNode = z, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class et {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = I(this, t, e), X(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== U && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ue(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && X(this._$AH) ? this._$AA.nextSibling.data = t : this.T(z.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = J.createElement(qt(s.h, s.h[0]), this.options)), s);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === i) this._$AH.p(e);
    else {
      const o = new fe(i, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Bt.get(t.strings);
    return e === void 0 && Bt.set(t.strings, e = new J(t)), e;
  }
  k(t) {
    wt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const a of t) i === e.length ? e.push(s = new et(this.O(Q()), this.O(Q()), this, this.options)) : s = e[i], s._$AI(a), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = Ot(t).nextSibling;
      Ot(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class dt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, a) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = g;
  }
  _$AI(t, e = this, s, i) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = I(this, t, e, 0), o = !X(t) || t !== this._$AH && t !== U, o && (this._$AH = t);
    else {
      const n = t;
      let l, c;
      for (t = a[0], l = 0; l < a.length - 1; l++) c = I(this, n[s + l], e, l), c === U && (c = this._$AH[l]), o || (o = !X(c) || c !== this._$AH[l]), c === g ? t = g : t !== g && (t += (c ?? "") + a[l + 1]), this._$AH[l] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class me extends dt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class ve extends dt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class be extends dt {
  constructor(t, e, s, i, a) {
    super(t, e, s, i, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = I(this, t, e, 0) ?? g) === U) return;
    const s = this._$AH, i = t === g && s !== g || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, a = t !== g && (s === g || i);
    i && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ye {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    I(this, t);
  }
}
const ft = K.litHtmlPolyfillSupport;
ft == null || ft(J, et), (K.litHtmlVersions ?? (K.litHtmlVersions = [])).push("3.3.3");
const _e = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const a = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new et(t.insertBefore(Q(), a), a, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis;
class _ extends R {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = _e(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return U;
  }
}
var Rt;
_._$litElement$ = !0, _.finalized = !0, (Rt = D.litElementHydrateSupport) == null || Rt.call(D, { LitElement: _ });
const mt = D.litElementPolyfillSupport;
mt == null || mt({ LitElement: _ });
(D.litElementVersions ?? (D.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const we = { attribute: !0, type: String, converter: at, reflect: !1, hasChanged: _t }, xe = (r = we, t, e) => {
  const { kind: s, metadata: i } = e;
  let a = globalThis.litPropertyMetadata.get(i);
  if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), a.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(n) {
      const l = t.get.call(this);
      t.set.call(this, n), this.requestUpdate(o, l, r, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(o, void 0, r, n), n;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(n) {
      const l = this[o];
      t.call(this, n), this.requestUpdate(o, l, r, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function u(r) {
  return (t, e) => typeof e == "object" ? xe(r, t, e) : ((s, i, a) => {
    const o = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, s), o ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function v(r) {
  return u({ ...r, state: !0, attribute: !1 });
}
var $e = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, xt = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? ke(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && $e(t, e, i), i;
};
let tt = class extends _ {
  constructor() {
    super(...arguments), this.points = [], this.state = "normal";
  }
  render() {
    const r = Se(this.points), t = r ?? Ae(), e = !r;
    return st`
      <svg
        data-no-history=${e ? "true" : "false"}
        viewBox="0 0 100 36"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="savant-sparkline-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="currentColor" stop-opacity="0.44"></stop>
            <stop offset="50%" stop-color="currentColor" stop-opacity="0.16"></stop>
            <stop offset="100%" stop-color="currentColor" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        ${e ? "" : st`
              ${t.fillPath ? st`<path class="fill-base" d=${t.fillPath}></path>` : ""}
            `}
        <path class="line" d=${t.path}></path>
      </svg>
    `;
  }
};
tt.styles = $`
    :host {
      display: block;
      height: 100%;
      min-height: 0;
      color: var(--savant-success);
      --sparkline-fill-color: var(--savant-success);
      opacity: 1;
    }

    :host([state="warning"]) {
      color: var(--savant-warning);
      --sparkline-fill-color: var(--savant-warning);
    }

    :host([state="caution"]) {
      color: var(--savant-caution);
      --sparkline-fill-color: var(--savant-caution);
    }

    :host([state="muted"]) {
      color: var(--savant-disabled);
      --sparkline-fill-color: var(--savant-disabled);
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
      color: currentColor;
      overflow: hidden;
    }

    .line {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.45;
      vector-effect: non-scaling-stroke;
      opacity: 0.9;
    }

    .fill-base {
      fill: url("#savant-sparkline-area");
      opacity: 1;
    }

    svg[data-no-history="true"] .line {
      stroke-width: 1.1;
      opacity: 0.82;
      filter: none;
    }
  `;
xt([
  u({ attribute: !1 })
], tt.prototype, "points", 2);
xt([
  u({ type: String, reflect: !0 })
], tt.prototype, "state", 2);
tt = xt([
  E("savant-sparkline")
], tt);
function Se(r) {
  const t = r.map((a) => a.value).filter(Number.isFinite);
  if (!t.length) return;
  if (t.every((a) => Math.max(0, a) === 0)) return Ee(t.length);
  if (t.length === 1) {
    const a = Tt(t[0], Dt(t)), o = Math.max(0, t[0]);
    return {
      path: `M 0 ${a} L 100 ${a}`,
      fillPath: o > 0 ? `M 0 ${a} L 100 ${a} L 100 36 L 0 36 Z` : ""
    };
  }
  const e = Dt(t), s = t.map((a, o) => {
    const n = o / (t.length - 1) * 100, l = Math.max(0, a);
    return [n, l === 0 ? L : Tt(a, e), l];
  });
  return {
    path: Pe(s),
    fillPath: Ce(s)
  };
}
function Tt(r, t) {
  return L - Math.max(0, r) / t * (L - Oe);
}
function Dt(r) {
  return Math.max(1, ...r) * 1.25;
}
function Ae() {
  return {
    path: `M 0 ${L} L 100 ${L}`,
    fillPath: ""
  };
}
function Ee(r) {
  return r <= 1 ? {
    path: `M 0 ${L} L 100 ${L}`,
    fillPath: ""
  } : { path: Array.from({ length: r }, (e, s) => {
    const i = s / (r - 1) * 100;
    return `${s === 0 ? "M" : "L"} ${i.toFixed(2)} ${L.toFixed(2)}`;
  }).join(" "), fillPath: "" };
}
const Oe = 5, L = 33;
function Pe(r) {
  if (r.every(([, , e]) => e === 0))
    return r.map(([e, s], i) => `${i === 0 ? "M" : "L"} ${e.toFixed(2)} ${s.toFixed(2)}`).join(" ");
  const t = [];
  for (let e = 1; e < r.length; e += 1) {
    const s = r[e - 1], i = r[e];
    t.push(`M ${s[0].toFixed(2)} ${s[1].toFixed(2)} L ${i[0].toFixed(2)} ${i[1].toFixed(2)}`);
  }
  return t.join(" ");
}
function Ce(r) {
  const t = [];
  for (let e = 1; e < r.length; e += 1) {
    const s = r[e - 1], i = r[e];
    s[2] === 0 && i[2] === 0 || t.push(
      [
        `M ${s[0].toFixed(2)} ${s[1].toFixed(2)}`,
        `L ${i[0].toFixed(2)} ${i[1].toFixed(2)}`,
        `L ${i[0].toFixed(2)} 36`,
        `L ${s[0].toFixed(2)} 36`,
        "Z"
      ].join(" ")
    );
  }
  return t.join(" ");
}
var Me = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, pt = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Le(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Me(t, e, i), i;
};
let F = class extends _ {
  constructor() {
    super(...arguments), this.avg = "--", this.max = "--", this.stacked = !1;
  }
  render() {
    return h`
      <div class="metric">
        <span>AVG</span>
        <strong>${this.avg}</strong>
      </div>
      <div class="metric">
        <span>MAX</span>
        <strong>${this.max}</strong>
      </div>
    `;
  }
};
F.styles = $`
    :host {
      display: flex;
      align-items: end;
      gap: 24px;
      min-width: 0;
    }

    :host([stacked]) {
      width: 100%;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;
      gap: 0;
    }

    .metric {
      display: grid;
      gap: 3px;
      min-width: 48px;
    }

    :host([stacked]) .metric {
      display: grid;
      grid-template-columns: 36px 44px;
      align-items: baseline;
      justify-content: start;
      gap: 6px;
      min-width: 0;
      width: 100%;
      text-align: center;
    }

    :host([stacked]) span {
      text-align: right;
    }

    :host([stacked]) strong {
      text-align: center;
    }

    :host([stacked]) .metric:first-child {
      order: 2;
    }

    :host([stacked]) .metric:nth-child(2) {
      order: 1;
    }

    span {
      color: var(--savant-muted);
      font-size: 12px;
      font-weight: 400;
      line-height: 1;
      letter-spacing: 0.02em;
    }

    strong {
      color: var(--savant-tile-fg);
      font-size: 15px;
      font-weight: 500;
      line-height: 1.1;
      white-space: nowrap;
      -webkit-text-stroke: 2px var(--savant-text-outline-color);
      paint-order: stroke fill;
    }

  `;
pt([
  u({ type: String })
], F.prototype, "avg", 2);
pt([
  u({ type: String })
], F.prototype, "max", 2);
pt([
  u({ type: Boolean, reflect: !0 })
], F.prototype, "stacked", 2);
F = pt([
  E("savant-metric-row")
], F);
function nt(r, t, e) {
  r.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}
var Ne = Object.defineProperty, Be = Object.getOwnPropertyDescriptor, Gt = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Be(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Ne(t, e, i), i;
};
const zt = {
  flash: "M7,2V13H10V22L17,10H13L17,2H7Z",
  power: "M13,3H11V13H13V3M17.83,5.17L16.41,6.59C17.99,7.86 19,9.81 19,12A7,7 0 0,1 12,19A7,7 0 0,1 5,12C5,9.81 6.01,7.86 7.59,6.59L6.17,5.17C4.23,6.82 3,9.26 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12C21,9.26 19.77,6.82 17.83,5.17Z",
  search: "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20 15.5 14Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z",
  sort_amount_down: "M3 7h10v2H3V7m0 4h7v2H3v-2m0 4h4v2H3v-2m14-7 4 4h-3v6h-2v-6h-3l4-4Z"
};
let lt = class extends _ {
  constructor() {
    super(...arguments), this.icon = "flash";
  }
  render() {
    return h`
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        ${st`<path d=${zt[this.icon] ?? zt.flash}></path>`}
      </svg>
    `;
  }
};
lt.styles = $`
    :host {
      display: inline-grid;
      place-items: center;
      width: 100%;
      height: 100%;
      line-height: 1;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  `;
Gt([
  u({ type: String })
], lt.prototype, "icon", 2);
lt = Gt([
  E("savant-icon")
], lt);
var Te = Object.defineProperty, De = Object.getOwnPropertyDescriptor, P = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? De(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Te(t, e, i), i;
};
let S = class extends _ {
  constructor() {
    super(...arguments), this.breakerId = "", this.label = "breaker", this.switchState = "off", this.mode = "hold_confirm_off", this.disabled = !1, this.pending = !1, this.holding = !1, this.progress = 0, this.startedAt = 0, this.holdMs = 900, this.cancelHold = () => {
      window.clearTimeout(this.timer), this.holding = !1, this.progress = 0;
    };
  }
  render() {
    const r = this.disabled ? `${this.label} breaker unavailable` : `Hold to ${this.switchState === "on" ? "turn off" : "turn on"} ${this.label} breaker`;
    return h`
      <button
        aria-label=${r}
        title=${r}
        ?disabled=${this.disabled || this.pending}
        class=${this.holding ? "holding" : ""}
        style=${`--progress:${this.progress * 360}deg`}
        @pointerdown=${this.onPointerDown}
        @pointerup=${this.onPointerUp}
        @pointerleave=${this.cancelHold}
        @pointercancel=${this.cancelHold}
        @click=${this.preventClick}
      >
        <span class="icon"><savant-icon icon="power"></savant-icon></span>
      </button>
    `;
  }
  preventClick(r) {
    r.stopPropagation(), r.preventDefault();
  }
  onPointerDown(r) {
    r.stopPropagation(), !(this.disabled || this.pending) && (this.holding = !0, this.startedAt = performance.now(), this.tick());
  }
  onPointerUp(r) {
    r.stopPropagation(), this.holding && (performance.now() - this.startedAt >= this.holdMs && this.requestToggle(), this.cancelHold());
  }
  tick() {
    const r = performance.now() - this.startedAt;
    this.progress = Math.min(1, r / this.holdMs), !(this.progress >= 1) && (this.timer = window.setTimeout(() => this.tick(), 16));
  }
  requestToggle() {
    nt(this, "savant-breaker-toggle", { breakerId: this.breakerId });
  }
};
S.styles = $`
    :host {
      display: inline-grid;
      place-items: center;
    }

    button {
      width: 46px;
      height: 46px;
      padding: 0;
      border-radius: 999px;
      border: 2px solid currentColor;
      background:
        conic-gradient(currentColor var(--progress, 0deg), transparent 0),
        color-mix(in srgb, var(--savant-tile-bg) 78%, transparent);
      color: var(--control-color, var(--savant-success));
      display: grid;
      place-items: center;
      cursor: pointer;
      touch-action: none;
    }

    :host-context(savant-breaker-tile[stacked]) button {
      width: 44px;
      height: 44px;
    }

    button[disabled] {
      cursor: default;
      color: var(--savant-disabled);
      box-shadow: none;
      opacity: 0.7;
    }

    .icon {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      border-radius: 999px;
      background: var(--savant-tile-bg);
      line-height: 1;
    }

    savant-icon {
      display: block;
      width: 20px;
      height: 20px;
    }
  `;
P([
  u({ type: String })
], S.prototype, "breakerId", 2);
P([
  u({ type: String })
], S.prototype, "label", 2);
P([
  u({ type: String })
], S.prototype, "switchState", 2);
P([
  u({ type: String })
], S.prototype, "mode", 2);
P([
  u({ type: Boolean })
], S.prototype, "disabled", 2);
P([
  u({ type: Boolean })
], S.prototype, "pending", 2);
P([
  v()
], S.prototype, "holding", 2);
P([
  v()
], S.prototype, "progress", 2);
S = P([
  E("savant-hold-control-button")
], S);
function W(r) {
  const t = typeof r == "number" ? r : Number(r);
  return Number.isFinite(t) ? t : void 0;
}
function it(r) {
  if (r === void 0 || !Number.isFinite(r)) return "--";
  const t = Math.abs(r);
  return t >= 1e3 ? `${ze(r / 1e3, t >= 1e4 ? 1 : 2)} kW` : `${Math.round(r)} W`;
}
function ze(r, t) {
  return r.toLocaleString(void 0, {
    maximumFractionDigits: t,
    minimumFractionDigits: 0
  });
}
function je(r, t = "kWh") {
  return r === void 0 || !Number.isFinite(r) ? "--" : `${r.toLocaleString(void 0, { maximumFractionDigits: 2 })} ${t}`;
}
var He = Object.defineProperty, Re = Object.getOwnPropertyDescriptor, k = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Re(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && He(t, e, i), i;
};
let w = class extends _ {
  constructor() {
    super(...arguments), this.highLoadThresholdWatts = 2e3, this.warningLoadThresholdWatts = 1e3, this.graphLoading = !1, this.pending = !1, this.stacked = !1, this.mobileLayout = "standard", this.error = "";
  }
  render() {
    var c, d, p, m, f, b, V;
    const r = this.runtimeState(), t = this.visualState(r.powerWatts, r.switchState, r.available), e = this.loadState(r.powerWatts), s = this.stacked && this.mobileLayout === "ultra_compact", i = this.display.show_area ? this.breaker.areaName : void 0, a = t === "off" ? Ie((c = this.statistics) == null ? void 0 : c.points.length) : ((d = this.statistics) == null ? void 0 : d.points) ?? [], o = !!((p = this.statistics) != null && p.points.length), n = !s && o && (((m = this.statistics) == null ? void 0 : m.averageWatts) !== void 0 || ((f = this.statistics) == null ? void 0 : f.maximumWatts) !== void 0), l = this.display.show_controls && this.display.control_mode !== "hidden" && this.breaker.controllable && !!this.breaker.entities.switch;
    return h`
      <button class=${`tile ${t} ${this.pending ? "pending" : ""} ${s ? "ultra-compact" : ""}`} @click=${this.openMoreInfo}>
        <span class="mobile-bar" aria-hidden="true"></span>
        <span class="topline">
          <span class="state-dot" aria-hidden="true"></span>
          ${this.display.show_state ? h`<span class="state-text">${Ue(t, r.switchState)}</span>` : ""}
          ${this.display.show_icon ? this.renderEntityIcon() : ""}
        </span>
        <span class="name">${this.display.label}</span>
        ${i && !s ? h`<span class="subtitle">${i}</span>` : ""}
        <span class="power">${this.display.show_current_power ? it(r.powerWatts) : ""}</span>
        <span class="graph">
          ${this.graphLoading && t !== "off" ? this.renderGraphSkeleton() : this.display.show_sparkline ? h`<savant-sparkline
                  .points=${a}
                  .state=${!o || t === "unavailable" || t === "off" ? "muted" : e === "high" ? "warning" : e === "warning" ? "caution" : "normal"}
                ></savant-sparkline>` : ""}
        </span>
        <span class="metrics">
          ${n && (this.display.show_average_power || this.display.show_maximum_power) ? h`<savant-metric-row
                .avg=${this.display.show_average_power ? it((b = this.statistics) == null ? void 0 : b.averageWatts) : "--"}
                .max=${this.display.show_maximum_power ? it((V = this.statistics) == null ? void 0 : V.maximumWatts) : "--"}
                ?stacked=${this.stacked}
              ></savant-metric-row>` : ""}
          ${this.display.show_energy ? h`<span class="energy">${je(r.energyValue)}</span>` : ""}
        </span>
        ${this.error ? h`<span class="feedback">${this.error}</span>` : ""}
        ${l ? h`<savant-hold-control-button
              class="control"
              .breakerId=${this.breaker.id}
              .label=${this.display.label}
              .mode=${this.display.control_mode === "hold" ? "hold" : "hold_confirm_off"}
              .switchState=${r.switchState ?? "off"}
              .pending=${this.pending}
              ?disabled=${!r.available}
            ></savant-hold-control-button>` : ""}
      </button>
    `;
  }
  renderEntityIcon() {
    var e, s;
    const r = this.breaker.entities.power, t = r ? (s = (e = this.hass) == null ? void 0 : e.states[r]) == null ? void 0 : s.attributes.icon : void 0;
    return typeof t == "string" && t && customElements.get("ha-icon") ? h`<ha-icon class="entity-icon" .icon=${t}></ha-icon>` : h`<savant-icon class="entity-icon" icon="flash"></savant-icon>`;
  }
  renderGraphSkeleton() {
    return h`
      <span class="graph-skeleton" aria-hidden="true">
        <svg viewBox="0 0 100 36" preserveAspectRatio="none">
          <path class="graph-skeleton-fill" d="M 0 28 L 12 22 L 26 20 L 42 25 L 56 27 L 68 17 L 82 14 L 100 18 L 100 36 L 0 36 Z"></path>
          <path class="graph-skeleton-line" d="M 0 28 L 12 22 L 26 20 L 42 25 L 56 27 L 68 17 L 82 14 L 100 18"></path>
        </svg>
      </span>
    `;
  }
  runtimeState() {
    var n, l, c, d, p, m, f, b, V, $t;
    const r = this.breaker.entities.power, t = this.breaker.entities.energy, e = this.breaker.entities.switch, s = r ? W((l = (n = this.hass) == null ? void 0 : n.states[r]) == null ? void 0 : l.state) : void 0, i = t ? W((d = (c = this.hass) == null ? void 0 : c.states[t]) == null ? void 0 : d.state) : void 0, a = e ? (m = (p = this.hass) == null ? void 0 : p.states[e]) == null ? void 0 : m.state : void 0, o = this.breaker.available && (!r || ((b = (f = this.hass) == null ? void 0 : f.states[r]) == null ? void 0 : b.state) !== "unavailable") && (!e || (($t = (V = this.hass) == null ? void 0 : V.states[e]) == null ? void 0 : $t.state) !== "unavailable");
    return { powerWatts: s, energyValue: i, switchState: a, available: o };
  }
  visualState(r, t, e = !0) {
    return this.error ? "error" : this.pending ? "pending" : e ? t === "off" || r === 0 ? "off" : "on" : "unavailable";
  }
  loadState(r) {
    return r !== void 0 && r > this.highLoadThresholdWatts ? "high" : r !== void 0 && r > this.warningLoadThresholdWatts ? "warning" : "normal";
  }
  openMoreInfo(r) {
    if (r.target.closest("savant-hold-control-button")) return;
    const e = this.breaker.entities.power ?? this.breaker.entities.switch ?? this.breaker.entities.energy;
    e && nt(this, "hass-action", {
      config: {
        entity: e,
        tap_action: { action: "more-info" }
      },
      action: "tap"
    });
  }
};
w.styles = $`
    :host {
      display: block;
      min-width: 0;
      aspect-ratio: 1 / 1;
      --status-color: var(--savant-success);
      --control-color: var(--status-color);
      --savant-text-halo:
        0 0 2px var(--savant-tile-bg),
        0 1px 1px var(--savant-tile-bg),
        1px 0 1px var(--savant-tile-bg),
        0 -1px 1px var(--savant-tile-bg),
        -1px 0 1px var(--savant-tile-bg);
      --savant-text-outline-color: var(--savant-tile-bg);
      --savant-font-family:
        Inter, "SF Pro Display", "SF Pro Text", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    .tile {
      position: relative;
      display: grid;
      grid-template-rows: auto auto auto 1fr auto;
      width: 100%;
      height: 100%;
      min-height: 0;
      padding: 16px;
      overflow: hidden;
      text-align: left;
      border: 1px solid var(--savant-border);
      border-radius: var(--savant-radius);
      background:
        linear-gradient(
          145deg,
          color-mix(in srgb, var(--savant-tile-bg) 94%, white),
          var(--savant-tile-bg)
        );
      color: var(--savant-tile-fg);
      box-shadow: var(--ha-card-box-shadow, 0 8px 20px rgb(0 0 0 / 0.24));
      font-family: var(--savant-breaker-font-family, var(--savant-font-family));
      font-weight: 400;
      cursor: pointer;
    }

    .tile.off,
    .tile.unavailable {
      --status-color: var(--savant-disabled);
    }

    .tile.off {
      --status-color: var(--savant-error);
    }

    .tile.error {
      --status-color: var(--savant-error);
    }

    .topline {
      display: flex;
      align-items: center;
      gap: 7px;
      min-width: 0;
      color: var(--status-color);
      font-size: 12px;
      line-height: 1.2;
      font-weight: 500;
      text-transform: uppercase;
      position: relative;
      z-index: 1;
    }

    .state-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--status-color);
      flex: none;
    }

    .entity-icon {
      margin-left: auto;
      width: 24px;
      height: 24px;
      color: var(--primary-text-color);
      font-size: 24px;
      line-height: 1;
    }

    .name {
      display: block;
      margin-top: 10px;
      font-size: 17px;
      font-weight: 500;
      line-height: 1.22;
      min-height: 1.22em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      z-index: 1;
      text-shadow: var(--savant-text-halo);
      -webkit-text-stroke: 4px var(--savant-text-outline-color);
      paint-order: stroke fill;
    }

    .subtitle {
      color: var(--savant-muted);
      font-size: 14px;
      line-height: 1.25;
      font-weight: 400;
      min-height: 1.25em;
      margin-top: 1px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      z-index: 1;
      -webkit-text-stroke: 3px var(--savant-text-outline-color);
      paint-order: stroke fill;
    }

    .power {
      margin-top: 15px;
      font-size: 31px;
      font-weight: 500;
      color: var(--status-color);
      letter-spacing: 0;
      line-height: 1.12;
      white-space: nowrap;
      position: relative;
      z-index: 1;
      text-shadow: var(--savant-text-halo);
      -webkit-text-stroke: 4px var(--savant-text-outline-color);
      paint-order: stroke fill;
    }

    :host(:not([stacked])) .subtitle {
      position: absolute;
      left: 16px;
      right: 16px;
      top: 74px;
      margin: 0;
      min-height: 0;
    }

    :host(:not([stacked])) .power {
      position: absolute;
      left: 16px;
      right: 16px;
      top: 93px;
      margin: 0;
    }

    .tile.on .power {
      color: var(--savant-tile-fg);
    }

    .graph {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 58px;
      top: 126px;
      height: auto;
      min-height: 0;
      margin: 0;
      pointer-events: none;
      z-index: 0;
    }

    .metrics {
      position: absolute;
      left: 16px;
      right: 74px;
      bottom: 15px;
      display: flex;
      align-items: end;
      gap: 12px;
      min-width: 0;
      z-index: 2;
    }

    .energy,
    .feedback {
      color: var(--savant-muted);
      font-size: 12px;
    }

    .feedback {
      position: absolute;
      left: 16px;
      bottom: 58px;
      color: var(--savant-error);
    }

    .control {
      position: absolute;
      right: 14px;
      bottom: 14px;
      z-index: 3;
      --control-color: var(--status-color);
    }

    .mobile-bar {
      display: none;
    }

    .graph-skeleton {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 32px;
      color: var(--status-color);
      opacity: 0.62;
    }

    .graph-skeleton svg {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 32px;
    }

    .graph-skeleton-fill {
      fill: currentColor;
      opacity: 0.18;
    }

    .graph-skeleton-line {
      fill: none;
      stroke: currentColor;
      vector-effect: non-scaling-stroke;
    }

    .graph-skeleton-line {
      stroke-width: 1.45;
      opacity: 0.72;
    }

    :host-context([density="compact"]) .tile {
      padding: 12px;
    }

    :host-context([density="compact"]) .power {
      margin-top: 8px;
      font-size: 25px;
    }

    :host-context([density="compact"]) .graph {
      top: 98px;
      height: auto;
      min-height: 0;
      bottom: 52px;
    }

    :host([stacked]) {
      aspect-ratio: auto;
    }

    :host([stacked]) .tile {
      min-height: 128px;
      height: auto;
      display: block;
      padding: 12px 142px 12px 32px;
    }

    :host([stacked]) .mobile-bar {
      display: block;
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: 8px;
      width: 7px;
      border-radius: 999px;
      background: var(--status-color);
    }

    :host([stacked]) .tile.unavailable .mobile-bar {
      background: repeating-linear-gradient(
        to bottom,
        var(--status-color) 0 12px,
        transparent 12px 19px
      );
    }

    :host([stacked]) .topline {
      display: contents;
      gap: 0;
    }

    :host([stacked]) .state-dot {
      display: none;
    }

    :host([stacked]) .state-text {
      display: none;
    }

    :host([stacked]) .name {
      position: absolute;
      top: 14px;
      left: 58px;
      right: 136px;
      margin: 0;
      font-size: 16px;
      line-height: 1.15;
      min-height: 0;
    }

    :host([stacked]) .subtitle {
      position: absolute;
      top: 32px;
      left: 58px;
      right: 136px;
      margin: 0;
      min-height: 0;
      font-size: 12px;
      line-height: 1.15;
    }

    :host([stacked]) .power {
      position: absolute;
      top: 50px;
      left: 32px;
      right: 136px;
      margin: 0;
      font-size: 27px;
      line-height: 1;
      z-index: 2;
    }

    :host([stacked]) .graph {
      position: absolute;
      left: 32px;
      right: 124px;
      top: auto;
      bottom: 12px;
      height: 68px;
      min-height: 68px;
      margin: 0;
    }

    :host([stacked]) .metrics {
      left: auto;
      right: 21px;
      top: 12px;
      bottom: 12px;
      width: 86px;
      justify-content: center;
      align-items: stretch;
    }

    :host([stacked]) .control {
      right: 21px;
      top: 50%;
      bottom: auto;
      transform: translateY(-50%);
    }

    :host([stacked]) .entity-icon {
      position: absolute;
      left: 32px;
      top: 13px;
      width: 20px;
      height: 20px;
      font-size: 20px;
    }

    :host([stacked][mobile-layout="ultra_compact"]) .tile {
      min-height: 44px;
      padding: 7px 82px 7px 18px;
    }

    :host([stacked][mobile-layout="ultra_compact"]) .mobile-bar {
      top: 8px;
      bottom: 8px;
      left: 6px;
      width: 5px;
    }

    :host([stacked][mobile-layout="ultra_compact"]) .name {
      top: 50%;
      left: 18px;
      right: 150px;
      transform: translateY(-50%);
      font-size: 14px;
      line-height: 1.1;
      z-index: 2;
    }

    :host([stacked][mobile-layout="ultra_compact"]) .power {
      top: 50%;
      left: auto;
      right: 74px;
      width: 70px;
      transform: translateY(-50%);
      font-size: 18px;
      text-align: right;
      color: var(--savant-tile-fg);
      z-index: 2;
    }

    :host([stacked][mobile-layout="ultra_compact"]) .graph,
    :host([stacked][mobile-layout="ultra_compact"]) .metrics,
    :host([stacked][mobile-layout="ultra_compact"]) .entity-icon,
    :host([stacked][mobile-layout="ultra_compact"]) .subtitle {
      display: none;
    }

    :host([stacked][mobile-layout="ultra_compact"]) .graph {
      display: block;
      position: absolute;
      top: 50%;
      left: 64px;
      right: 146px;
      width: auto;
      height: 28px;
      min-height: 28px;
      transform: translateY(-50%);
      z-index: 0;
    }

    :host([stacked][mobile-layout="ultra_compact"]) savant-sparkline,
    :host([stacked][mobile-layout="ultra_compact"]) .graph-skeleton {
      height: 28px;
      min-height: 28px;
      max-height: 28px;
      opacity: 0.95;
    }

    :host([stacked][mobile-layout="ultra_compact"]) .control {
      right: 10px;
      transform: translateY(-50%) scale(0.76);
      transform-origin: right center;
    }

    :host([stacked][mobile-layout="ultra_compact"]) .feedback {
      left: 18px;
      right: 84px;
      bottom: 3px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;
k([
  u({ attribute: !1 })
], w.prototype, "hass", 2);
k([
  u({ attribute: !1 })
], w.prototype, "breaker", 2);
k([
  u({ attribute: !1 })
], w.prototype, "display", 2);
k([
  u({ attribute: !1 })
], w.prototype, "statistics", 2);
k([
  u({ type: Number })
], w.prototype, "highLoadThresholdWatts", 2);
k([
  u({ type: Number })
], w.prototype, "warningLoadThresholdWatts", 2);
k([
  u({ type: Boolean })
], w.prototype, "graphLoading", 2);
k([
  u({ type: Boolean })
], w.prototype, "pending", 2);
k([
  u({ type: Boolean, reflect: !0 })
], w.prototype, "stacked", 2);
k([
  u({ type: String, attribute: "mobile-layout", reflect: !0 })
], w.prototype, "mobileLayout", 2);
k([
  u({ type: String })
], w.prototype, "error", 2);
w = k([
  E("savant-breaker-tile")
], w);
function Ue(r, t) {
  return r === "unavailable" ? "Unavailable" : t === "off" || r === "off" ? "Off" : "On";
}
function Ie(r = 2) {
  return Array.from({ length: Math.max(2, r) }, (t, e) => ({
    start: e,
    value: 0
  }));
}
const Fe = $`
  .skeleton {
    position: relative;
    overflow: hidden;
    background: color-mix(in srgb, var(--savant-muted) 16%, transparent);
    border-radius: 999px;
  }

  .skeleton::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      color-mix(in srgb, var(--primary-text-color) 16%, transparent),
      transparent
    );
    animation: savant-shimmer 1.35s infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .skeleton::after {
      animation: none;
    }
  }

  @keyframes savant-shimmer {
    to {
      transform: translateX(100%);
    }
  }
`;
var We = Object.defineProperty, Ve = Object.getOwnPropertyDescriptor, Zt = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Ve(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && We(t, e, i), i;
};
let ct = class extends _ {
  constructor() {
    super(...arguments), this.stacked = !1;
  }
  render() {
    return h`
      <div class="bar skeleton"></div>
      <div class="status skeleton"></div>
      <div class="title skeleton"></div>
      <div class="subtitle skeleton"></div>
      <div class="power skeleton"></div>
      <div class="graph" aria-hidden="true">
        <svg viewBox="0 0 100 36" preserveAspectRatio="none">
          <path class="graph-fill" d="M 0 28 L 12 22 L 26 20 L 42 25 L 56 27 L 68 17 L 82 14 L 100 18 L 100 36 L 0 36 Z"></path>
          <path class="graph-line" d="M 0 28 L 12 22 L 26 20 L 42 25 L 56 27 L 68 17 L 82 14 L 100 18"></path>
        </svg>
      </div>
      <div class="avg skeleton"></div>
      <div class="max skeleton"></div>
      <div class="control skeleton"></div>
    `;
  }
};
ct.styles = [
  Fe,
  $`
      :host {
        position: relative;
        display: grid;
        aspect-ratio: 1 / 1;
        min-height: 0;
        padding: 16px;
        border-radius: var(--savant-radius);
        background: var(--savant-tile-bg);
        box-shadow: var(--ha-card-box-shadow, 0 8px 20px rgb(0 0 0 / 0.22));
      }

      .status {
        width: 54px;
        height: 12px;
      }

      .title {
        width: 68%;
        height: 18px;
        margin-top: 16px;
      }

      .subtitle {
        width: 45%;
        height: 14px;
        margin-top: 8px;
      }

      .power {
        width: 44%;
        height: 34px;
        margin-top: 22px;
      }

      .graph {
        width: 100%;
        height: 38px;
        margin-top: 10px;
        border-radius: 0;
        opacity: 0.72;
      }

      svg {
        display: block;
        width: 100%;
        height: 100%;
      }

      .graph-fill {
        fill: color-mix(in srgb, var(--savant-success) 20%, transparent);
      }

      .graph-line {
        fill: none;
        stroke: color-mix(in srgb, var(--savant-success) 58%, var(--savant-muted));
        stroke-width: 1.45;
        vector-effect: non-scaling-stroke;
      }

      .avg,
      .max {
        position: absolute;
        bottom: 18px;
        width: 48px;
        height: 28px;
        overflow: visible;
        background: transparent;
        border-radius: 0;
      }

      .avg {
        left: 16px;
      }

      .max {
        left: 92px;
      }

      .avg::before,
      .max::before,
      .avg::after,
      .max::after {
        content: "";
        position: absolute;
        left: 0;
        transform: none;
        animation: none;
        border-radius: 999px;
        background:
          linear-gradient(
            90deg,
            transparent,
            color-mix(in srgb, var(--primary-text-color) 16%, transparent),
            transparent
          ),
          color-mix(in srgb, var(--savant-muted) 16%, transparent);
        background-size: 200% 100%, auto;
      }

      .avg::before,
      .max::before {
        top: 0;
        width: 24px;
        height: 9px;
      }

      .avg::after,
      .max::after {
        bottom: 0;
        width: 44px;
        height: 13px;
      }

      .control {
        position: absolute;
        right: 16px;
        bottom: 16px;
        width: 46px;
        height: 46px;
        border-radius: 50%;
      }

      .bar {
        display: none;
      }

      :host([stacked]) {
        aspect-ratio: auto;
        min-height: 128px;
        padding: 12px 142px 12px 32px;
      }

      :host([stacked]) .bar {
        display: block;
        position: absolute;
        left: 10px;
        top: 14px;
        bottom: 14px;
        width: 8px;
      }

      :host([stacked]) .status {
        position: absolute;
        left: 32px;
        top: 13px;
        width: 20px;
        height: 20px;
      }

      :host([stacked]) .title {
        position: absolute;
        left: 58px;
        right: 136px;
        top: 13px;
        width: auto;
        margin: 0;
      }

      :host([stacked]) .subtitle {
        position: absolute;
        left: 58px;
        right: 136px;
        top: 31px;
        width: auto;
        margin: 0;
      }

      :host([stacked]) .power {
        position: absolute;
        left: 32px;
        right: 136px;
        top: 45px;
        width: auto;
        max-width: 104px;
        margin: 0;
      }

      :host([stacked]) .graph {
        position: absolute;
        left: 32px;
        right: 136px;
        bottom: 12px;
        width: auto;
        height: 30px;
        margin: 0;
      }

      :host([stacked]) .avg,
      :host([stacked]) .max {
        right: 21px;
        left: auto;
        width: 86px;
        height: 12px;
      }

      :host([stacked]) .avg::before,
      :host([stacked]) .max::before {
        top: 2px;
        left: 0;
        width: 34px;
        height: 8px;
      }

      :host([stacked]) .avg::after,
      :host([stacked]) .max::after {
        top: 0;
        right: 0;
        left: auto;
        width: 46px;
        height: 12px;
      }

      :host([stacked]) .avg {
        bottom: 22px;
      }

      :host([stacked]) .max {
        top: 22px;
      }

      :host([stacked]) .control {
        right: 21px;
        top: 42px;
        bottom: auto;
      }
    `
];
Zt([
  u({ type: Boolean, reflect: !0 })
], ct.prototype, "stacked", 2);
ct = Zt([
  E("savant-breaker-tile-skeleton")
], ct);
var qe = Object.getOwnPropertyDescriptor, Ge = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? qe(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (i = o(i) || i);
  return i;
};
let vt = class extends _ {
  render() {
    return h`
      <div class="empty">
        <strong>No Savant breaker entities discovered.</strong>
        <span>Open the card editor to add manual mappings or check Savant Energy entity metadata.</span>
      </div>
    `;
  }
};
vt.styles = $`
    .empty {
      display: grid;
      gap: 6px;
      padding: 22px;
      border-radius: var(--savant-radius);
      background: color-mix(in srgb, var(--secondary-text-color) 10%, transparent);
      color: var(--primary-text-color);
    }

    span {
      color: var(--secondary-text-color);
    }
  `;
vt = Ge([
  E("savant-board-empty-state")
], vt);
var Ze = Object.defineProperty, Ke = Object.getOwnPropertyDescriptor, Kt = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Ke(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Ze(t, e, i), i;
};
let ht = class extends _ {
  constructor() {
    super(...arguments), this.message = "Unable to load breaker board.";
  }
  render() {
    return h`<div class="error">${this.message}</div>`;
  }
};
ht.styles = $`
    .error {
      padding: 16px;
      border-radius: var(--savant-radius);
      color: var(--error-color);
      background: color-mix(in srgb, var(--error-color) 12%, transparent);
    }
  `;
Kt([
  u({ type: String })
], ht.prototype, "message", 2);
ht = Kt([
  E("savant-board-error-state")
], ht);
class Ye {
  constructor(t) {
    this.manualBreakers = t;
  }
  async discover(t) {
    return this.manualBreakers.map((e) => {
      const s = {
        switch: e.switch_entity,
        power: e.power_entity,
        energy: e.energy_entity,
        voltage: e.voltage_entity,
        current: e.current_entity
      };
      return {
        id: `manual:${e.id}`,
        name: e.name,
        areaName: e.area_name,
        panelName: e.panel_name,
        circuitNumber: e.circuit_number,
        controllable: !!e.switch_entity,
        entities: s,
        available: Object.values(s).some(
          (i) => {
            var a;
            return i && ((a = t.states[i]) == null ? void 0 : a.state) !== "unavailable";
          }
        ),
        discoveryConfidence: "manual"
      };
    });
  }
}
function Yt(r, t) {
  const e = r.split(".")[0], s = t == null ? void 0 : t.attributes.device_class;
  if (e === "switch") return "switch";
  if (e === "sensor") {
    if (s === "power") return "power";
    if (s === "energy") return "energy";
    if (s === "voltage") return "voltage";
    if (s === "current") return "current";
  }
}
function Qe(r) {
  var o;
  const t = new Map(r.devices.map((n) => [n.id, n])), e = new Map(r.areas.map((n) => [n.area_id, n.name])), s = /* @__PURE__ */ new Map(), i = [];
  for (const n of r.entities)
    if (!(n.disabled_by || n.hidden_by) && Xe(n, t.get(n.device_id ?? ""), r.integration))
      if (n.device_id) {
        const l = s.get(n.device_id) ?? [];
        l.push(n), s.set(n.device_id, l);
      } else
        i.push(n);
  const a = [];
  for (const [n, l] of s) {
    const c = Je(n, l, t.get(n), e, r.states);
    c && a.push(c);
  }
  for (const n of i) {
    const l = Yt(n.entity_id, r.states[n.entity_id]);
    l && a.push({
      id: rr(n),
      name: Qt(n, r.states[n.entity_id]),
      areaId: n.area_id,
      areaName: n.area_id ? e.get(n.area_id) : void 0,
      controllable: l === "switch",
      entities: { [l]: n.entity_id },
      available: ((o = r.states[n.entity_id]) == null ? void 0 : o.state) !== "unavailable",
      discoveryConfidence: "medium",
      discoveryNotes: ["Associated from entity registry without a device_id."]
    });
  }
  return a;
}
function Xe(r, t, e) {
  var a;
  if (r.platform === e) return !0;
  const s = ((t == null ? void 0 : t.manufacturer) ?? "").toLowerCase(), i = ((a = t == null ? void 0 : t.identifiers) == null ? void 0 : a.flat().join(" ").toLowerCase()) ?? "";
  return s.includes("savant") || i.includes(e.toLowerCase());
}
function Je(r, t, e, s, i) {
  var m;
  const a = {}, o = [];
  for (const f of t) {
    const b = Yt(f.entity_id, i[f.entity_id]);
    !b || a[b] || (a[b] = f.entity_id);
  }
  if (!Object.keys(a).length) return;
  const n = t.find((f) => f.entity_id === a.power) ?? t[0], l = (n == null ? void 0 : n.area_id) ?? (e == null ? void 0 : e.area_id) ?? void 0, c = n ? (m = i[n.entity_id]) == null ? void 0 : m.attributes : {}, d = er((c == null ? void 0 : c.circuit_number) ?? (c == null ? void 0 : c.circuit)), p = tr(c == null ? void 0 : c.panel_name, c == null ? void 0 : c.panel, e == null ? void 0 : e.model);
  return a.power || o.push("No power sensor with device_class: power was found."), a.switch || o.push("No switch entity was found for breaker control."), {
    id: `device:${r}`,
    deviceId: r,
    name: (e == null ? void 0 : e.name_by_user) || (e == null ? void 0 : e.name) || Qt(n, n ? i[n.entity_id] : void 0),
    areaId: l,
    areaName: l ? s.get(l) : void 0,
    panelName: p,
    circuitNumber: d,
    controllable: !!a.switch,
    entities: a,
    available: Object.values(a).some((f) => {
      var b;
      return ((b = i[f]) == null ? void 0 : b.state) !== "unavailable";
    }),
    discoveryConfidence: a.power && a.switch ? "high" : "medium",
    discoveryNotes: o.length ? o : void 0
  };
}
function tr(...r) {
  return r.find((t) => typeof t == "string" && t.length > 0);
}
function er(r) {
  const t = Number(r);
  return Number.isFinite(t) ? t : void 0;
}
function rr(r) {
  return r.unique_id ? `entity:${r.unique_id}` : `entity:${r.entity_id}`;
}
function Qt(r, t) {
  return (r == null ? void 0 : r.name) || (r == null ? void 0 : r.original_name) || (t == null ? void 0 : t.attributes.friendly_name) || (r == null ? void 0 : r.entity_id) || "Savant breaker";
}
class sr {
  constructor(t) {
    this.integration = t;
  }
  async discover(t) {
    const e = await ir(t);
    return Qe({
      ...e,
      states: t.states,
      integration: this.integration
    });
  }
}
async function ir(r) {
  const t = r.connection;
  if (!(t != null && t.sendMessagePromise))
    return { entities: [], devices: [], areas: [] };
  const [e, s, i] = await Promise.all([
    t.sendMessagePromise({ type: "config/entity_registry/list" }),
    t.sendMessagePromise({ type: "config/device_registry/list" }),
    t.sendMessagePromise({ type: "config/area_registry/list" })
  ]);
  return {
    entities: e,
    devices: s,
    areas: i
  };
}
class Xt {
  constructor(t) {
    this.providers = t;
  }
  async discover(t, e) {
    const s = this.providers ?? [
      ...e.discovery.enabled ? [new sr(e.discovery.integration)] : [],
      new Ye(e.manual_breakers)
    ], i = await Promise.all(s.map((a) => a.discover(t)));
    return ar(i.flat());
  }
}
function ar(r) {
  const t = /* @__PURE__ */ new Map();
  for (const e of r) {
    const s = t.get(e.id);
    t.set(
      e.id,
      s ? {
        ...s,
        ...e,
        entities: { ...s.entities, ...e.entities },
        discoveryNotes: [...s.discoveryNotes ?? [], ...e.discoveryNotes ?? []]
      } : e
    );
  }
  return [...t.values()];
}
class or {
  async fetchHistory(t, e, s) {
    var l;
    if (!((l = t.connection) != null && l.sendMessagePromise)) return [];
    const i = /* @__PURE__ */ new Date(), a = new Date(i.getTime() - nr(s)), o = await t.connection.sendMessagePromise({
      type: "history/history_during_period",
      start_time: a.toISOString(),
      end_time: i.toISOString(),
      entity_ids: [e],
      minimal_response: !0,
      no_attributes: !0
    });
    return ((o == null ? void 0 : o[0]) ?? []).map((c) => ({
      start: new Date(c.last_changed ?? c.lu ?? c.s).getTime(),
      value: Number(c.state)
    })).filter((c) => Number.isFinite(c.start) && Number.isFinite(c.value));
  }
}
function nr(r) {
  switch (r) {
    case "1h":
      return 3600 * 1e3;
    case "6h":
      return 360 * 60 * 1e3;
    case "12h":
      return 720 * 60 * 1e3;
    case "7d":
      return 10080 * 60 * 1e3;
    case "24h":
    default:
      return 1440 * 60 * 1e3;
  }
}
class lr {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.history = new or();
  }
  async getStatistics(t, e, s, i) {
    const a = `${e}:${s}`, o = Date.now(), n = this.cache.get(a);
    if (n && o - n.fetchedAt < i * 1e3)
      return n.data;
    try {
      const l = await this.fetchStatisticsOrHistory(t, e, s), c = l.map((p) => p.value).filter(Number.isFinite), d = {
        entityId: e,
        period: s,
        points: l,
        averageWatts: c.length ? c.reduce((p, m) => p + m, 0) / c.length : void 0,
        maximumWatts: c.length ? Math.max(...c) : void 0,
        loading: !1,
        fetchedAt: o
      };
      return this.cache.set(a, { data: d, fetchedAt: o }), d;
    } catch (l) {
      return {
        entityId: e,
        period: s,
        points: [],
        loading: !1,
        error: l instanceof Error ? l.message : "History unavailable"
      };
    }
  }
  invalidate(t) {
    if (!t) {
      this.cache.clear();
      return;
    }
    for (const e of this.cache.keys())
      e.startsWith(`${t}:`) && this.cache.delete(e);
  }
  async fetchStatisticsOrHistory(t, e, s) {
    var i;
    if (!((i = t.connection) != null && i.sendMessagePromise)) return [];
    if (s === "7d" || s === "24h" || s === "12h" || s === "6h")
      try {
        const a = /* @__PURE__ */ new Date(), o = new Date(a.getTime() - cr(s)), n = await t.connection.sendMessagePromise({
          type: "recorder/statistics_during_period",
          start_time: o.toISOString(),
          end_time: a.toISOString(),
          statistic_ids: [e],
          period: s === "7d" ? "hour" : "5minute",
          types: ["mean", "max"]
        }), c = ((n == null ? void 0 : n[e]) ?? []).map((d) => ({
          start: new Date(d.start).getTime(),
          value: Number(d.mean ?? d.max)
        })).filter((d) => Number.isFinite(d.start) && Number.isFinite(d.value));
        if (c.length) return c;
      } catch {
      }
    return this.history.fetchHistory(t, e, s);
  }
}
function cr(r) {
  switch (r) {
    case "7d":
      return 10080 * 60 * 1e3;
    case "6h":
      return 360 * 60 * 1e3;
    case "12h":
      return 720 * 60 * 1e3;
    case "1h":
      return 3600 * 1e3;
    default:
      return 1440 * 60 * 1e3;
  }
}
const O = {
  type: "custom:savant-energy-breaker-board-card",
  title: "Electrical Panel",
  discovery: {
    enabled: !0,
    integration: "savant_energy",
    include_new_breakers: !0,
    panel_filter: null,
    area_filter: null
  },
  layout: {
    group_by: "none",
    sort_by: "circuit_number",
    density: "comfortable",
    mobile_view: "standard"
  },
  display: {
    show_title: !0,
    show_current_power: !0,
    show_average_power: !0,
    show_maximum_power: !0,
    show_energy: !1,
    show_sparkline: !0,
    show_icon: !0,
    show_state: !0,
    show_controls: !0,
    show_area: !0,
    show_circuit_number: !0
  },
  graph: {
    period: "24h",
    refresh_interval_seconds: 300
  },
  controls: {
    default_mode: "hold_confirm_off",
    warning_load_threshold_watts: 1e3,
    high_load_threshold_watts: 2e3
  },
  excluded_breakers: [],
  breaker_overrides: {},
  manual_breakers: []
}, Jt = {
  title: "Title",
  discovery: "Discovery",
  enabled: "Auto-discovery",
  integration: "Integration domain",
  include_new_breakers: "Show new breakers automatically",
  panel_filter: "Panel filter",
  area_filter: "Area filter",
  layout: "Layout",
  group_by: "Group by",
  sort_by: "Sort by",
  current_power_descending: "Highest current power",
  highest_usage: "Highest usage",
  density: "Density",
  mobile_view: "Mobile view",
  display: "Default tile details",
  show_title: "Title section",
  show_current_power: "Current power",
  show_average_power: "Average power",
  show_maximum_power: "Maximum power",
  show_energy: "Energy",
  show_sparkline: "Sparkline",
  show_icon: "Icon",
  show_state: "Breaker state",
  show_controls: "Breaker controls",
  show_area: "Area label",
  show_circuit_number: "Circuit number",
  graph: "Graph",
  period: "History period",
  refresh_interval_seconds: "Refresh interval",
  controls: "Controls",
  default_mode: "Default safety mode",
  warning_load_threshold_watts: "Yellow chart threshold",
  high_load_threshold_watts: "Orange chart threshold",
  manual_breakers: "Manual breaker mappings",
  id: "Breaker ID",
  name: "Name",
  switch_entity: "Switch entity",
  power_entity: "Power entity",
  energy_entity: "Energy entity",
  voltage_entity: "Voltage entity",
  current_entity: "Current entity",
  area_name: "Area name",
  panel_name: "Panel name",
  circuit_number: "Circuit number"
}, hr = {
  integration: "Defaults to savant_energy and is used to match registry metadata.",
  panel_filter: "Optional exact panel name to include.",
  area_filter: "Optional exact area name to include.",
  refresh_interval_seconds: "Minimum 30 seconds.",
  warning_load_threshold_watts: "Chart turns yellow above this wattage.",
  high_load_threshold_watts: "Chart turns orange above this wattage.",
  manual_breakers: "Optional fallback mappings for breakers that cannot be discovered from entity metadata.",
  id: "Use a stable ID, for example panel_1_circuit_12."
};
function dr() {
  return {
    schema: [
      { name: "title", selector: { text: {} } },
      {
        type: "expandable",
        name: "discovery",
        title: "Discovery",
        schema: [
          { name: "enabled", selector: { boolean: {} } },
          { name: "integration", selector: { text: {} } },
          { name: "include_new_breakers", selector: { boolean: {} } },
          { name: "panel_filter", selector: { text: {} } },
          { name: "area_filter", selector: { text: {} } }
        ]
      },
      {
        type: "expandable",
        name: "layout",
        title: "Layout",
        schema: [
          j("group_by", ["none", "panel", "area", "panel_then_area"]),
          j("sort_by", ["circuit_number", "name", "current_power_descending", "highest_usage", "manual"]),
          j("density", ["comfortable", "compact"]),
          j("mobile_view", ["standard", "ultra_compact"])
        ]
      },
      {
        type: "expandable",
        name: "display",
        title: "Default Tile Details",
        schema: [
          { name: "show_title", selector: { boolean: {} } },
          { name: "show_current_power", selector: { boolean: {} } },
          { name: "show_average_power", selector: { boolean: {} } },
          { name: "show_maximum_power", selector: { boolean: {} } },
          { name: "show_energy", selector: { boolean: {} } },
          { name: "show_sparkline", selector: { boolean: {} } },
          { name: "show_icon", selector: { boolean: {} } },
          { name: "show_state", selector: { boolean: {} } },
          { name: "show_controls", selector: { boolean: {} } },
          { name: "show_area", selector: { boolean: {} } },
          { name: "show_circuit_number", selector: { boolean: {} } }
        ]
      },
      {
        type: "expandable",
        name: "graph",
        title: "Graph",
        schema: [
          j("period", ["1h", "6h", "12h", "24h", "7d"]),
          {
            name: "refresh_interval_seconds",
            selector: { number: { min: 30, step: 30, mode: "box", unit_of_measurement: "s" } }
          }
        ]
      },
      {
        type: "expandable",
        name: "controls",
        title: "Controls",
        schema: [
          j("default_mode", ["hidden", "hold", "hold_confirm_off"]),
          {
            name: "warning_load_threshold_watts",
            selector: { number: { min: 0, step: 100, mode: "box", unit_of_measurement: "W" } }
          },
          {
            name: "high_load_threshold_watts",
            selector: { number: { min: 0, step: 100, mode: "box", unit_of_measurement: "W" } }
          }
        ]
      },
      {
        type: "expandable",
        name: "manual",
        title: "Manual Breaker Mappings",
        flatten: !0,
        schema: [
          {
            name: "manual_breakers",
            selector: {
              object: {
                multiple: !0,
                label_field: "name",
                description_field: "id",
                fields: {
                  id: { required: !0, selector: { text: {} } },
                  name: { required: !0, selector: { text: {} } },
                  switch_entity: G("switch"),
                  power_entity: G("sensor"),
                  energy_entity: G("sensor"),
                  voltage_entity: G("sensor"),
                  current_entity: G("sensor"),
                  area_name: { selector: { text: {} } },
                  panel_name: { selector: { text: {} } },
                  circuit_number: {
                    selector: { number: { min: 0, step: 1, mode: "box" } }
                  }
                }
              }
            }
          }
        ]
      }
    ],
    computeLabel: (r) => Jt[r.name],
    computeHelper: (r) => hr[r.name],
    assertConfig: ur
  };
}
function G(r) {
  return {
    selector: {
      entity: {
        filter: { domain: r }
      }
    }
  };
}
function j(r, t) {
  return {
    name: r,
    selector: {
      select: {
        mode: "dropdown",
        options: t.map((e) => ({ value: e, label: Jt[e] ?? pr(e) }))
      }
    }
  };
}
function pr(r) {
  return r.split("_").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
}
function ur(r) {
  if (H("discovery", r.discovery), H("layout", r.layout), H("display", r.display), H("graph", r.graph), H("controls", r.controls), r.excluded_breakers !== void 0 && !Array.isArray(r.excluded_breakers))
    throw new Error("excluded_breakers must be a list.");
  if (r.manual_breakers !== void 0 && !Array.isArray(r.manual_breakers))
    throw new Error("manual_breakers must be a list.");
  H("breaker_overrides", r.breaker_overrides);
}
function H(r, t) {
  if (t !== void 0 && (t === null || Array.isArray(t) || typeof t != "object"))
    throw new Error(`${r} must be an object.`);
}
function te(r, t) {
  const e = { ...r };
  if (!t) return e;
  for (const [s, i] of Object.entries(t))
    Array.isArray(i) ? e[s] = [...i] : i && typeof i == "object" && !Array.isArray(i) ? e[s] = te(e[s] ?? {}, i) : i !== void 0 && (e[s] = i);
  return e;
}
const gr = /* @__PURE__ */ new Set(["1h", "6h", "12h", "24h", "7d"]), fr = /* @__PURE__ */ new Set(["standard", "ultra_compact"]);
function Y(r) {
  const t = te(O, r ?? {});
  t.discovery.enabled = t.discovery.enabled !== !1, t.discovery.integration = t.discovery.integration || O.discovery.integration, t.discovery.include_new_breakers = t.discovery.include_new_breakers !== !1, fr.has(t.layout.mobile_view) || (t.layout.mobile_view = O.layout.mobile_view), t.display.show_title = t.display.show_title !== !1, gr.has(t.graph.period) || (t.graph.period = O.graph.period), t.graph.refresh_interval_seconds = Math.max(30, Number(t.graph.refresh_interval_seconds) || 300);
  const e = Number(t.controls.warning_load_threshold_watts);
  t.controls.warning_load_threshold_watts = Math.max(
    0,
    Number.isFinite(e) ? e : O.controls.warning_load_threshold_watts || 1e3
  );
  const s = Number(t.controls.high_load_threshold_watts);
  return t.controls.high_load_threshold_watts = Math.max(
    0,
    Number.isFinite(s) ? s : O.controls.high_load_threshold_watts || 2e3
  ), t.excluded_breakers = Array.isArray(t.excluded_breakers) ? [...new Set(t.excluded_breakers)] : [], t.breaker_overrides = t.breaker_overrides ?? {}, t.manual_breakers = Array.isArray(t.manual_breakers) ? t.manual_breakers : [], t;
}
function mr(r, t) {
  const e = r.breaker_overrides[t.id] ?? {};
  return {
    label: e.label || t.name,
    show_current_power: e.show_current_power ?? r.display.show_current_power,
    show_average_power: e.show_average_power ?? r.display.show_average_power,
    show_maximum_power: e.show_maximum_power ?? r.display.show_maximum_power,
    show_energy: e.show_energy ?? r.display.show_energy,
    show_sparkline: e.show_sparkline ?? r.display.show_sparkline,
    show_icon: e.show_icon ?? r.display.show_icon,
    show_state: r.display.show_state,
    show_controls: e.show_controls ?? r.display.show_controls,
    show_area: r.display.show_area,
    show_circuit_number: r.display.show_circuit_number,
    control_mode: e.control_mode ?? r.controls.default_mode
  };
}
const vr = $`
  :host {
    display: block;
    color: var(--primary-text-color);
    --savant-tile-bg: color-mix(in srgb, var(--ha-card-background, var(--card-background-color, #1f2528)) 88%, black);
    --savant-tile-fg: var(--primary-text-color, #f5f7f8);
    --savant-muted: var(--secondary-text-color, #a9b0b4);
    --savant-success: var(--success-color, #7acb54);
    --savant-caution: var(--savant-caution-color, #f5cc4d);
    --savant-warning: var(--warning-color, #ff8f22);
    --savant-error: var(--error-color, #f05246);
    --savant-disabled: var(--disabled-text-color, #8d9499);
    --savant-border: color-mix(in srgb, var(--divider-color, #6f767b) 35%, transparent);
    --savant-radius: var(--savant-breaker-radius, 12px);
    font-family: var(--paper-font-body1_-_font-family, inherit);
  }

  ha-card {
    overflow: hidden;
    padding: 16px;
    background: var(--ha-card-background, var(--card-background-color));
  }

  .board-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
  }

  .board-title {
    margin: 0;
    font-size: 20px;
    font-weight: 650;
    letter-spacing: 0;
  }

  .board-grid {
    container-type: inline-size;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--tile-min-width, 210px), 1fr));
    align-items: start;
    gap: var(--tile-gap, 12px);
  }

  :host([density="compact"]) .board-grid {
    --tile-min-width: 178px;
    --tile-gap: 10px;
  }

  .board-grid.stacked {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .group-title {
    grid-column: 1 / -1;
    margin: 8px 0 0;
    color: var(--secondary-text-color);
    font-size: 13px;
    font-weight: 650;
    text-transform: uppercase;
  }
`;
var br = Object.defineProperty, yr = Object.getOwnPropertyDescriptor, x = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? yr(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && br(t, e, i), i;
};
let y = class extends _ {
  constructor() {
    super(...arguments), this.config = O, this.breakers = [], this.loading = !0, this.error = "", this.stats = /* @__PURE__ */ new Map(), this.pendingSwitches = /* @__PURE__ */ new Set(), this.toggleErrors = /* @__PURE__ */ new Map(), this.stacked = !1, this.sortMenuOpen = !1, this.searchOpen = !1, this.searchQuery = "", this.discovery = new Xt(), this.statistics = new lr(), this.discoveryKey = "", this.statsRefreshToken = 0, this.handleToggle = async (r) => {
      var s;
      if (r.stopPropagation(), !this.hass) return;
      const t = this.breakers.find((i) => i.id === r.detail.breakerId), e = t == null ? void 0 : t.entities.switch;
      if (!(!t || !e || this.pendingSwitches.has(t.id))) {
        this.pendingSwitches = /* @__PURE__ */ new Set([...this.pendingSwitches, t.id]), this.toggleErrors.delete(t.id);
        try {
          const i = (s = this.hass.states[e]) == null ? void 0 : s.state;
          await this.hass.callService("switch", i === "on" ? "turn_off" : "turn_on", { entity_id: e });
        } catch {
          const i = new Map(this.toggleErrors);
          i.set(t.id, "Failed to toggle"), this.toggleErrors = i;
        } finally {
          const i = new Set(this.pendingSwitches);
          i.delete(t.id), this.pendingSwitches = i;
        }
      }
    };
  }
  setConfig(r) {
    this.config = Y(r), this.runtimeSortBy = this.loadPersistedSort() ?? this.config.layout.sort_by, this.setAttribute("density", this.config.layout.density), this.setAttribute("mobile-view", this.config.layout.mobile_view), this.discoveryKey = "";
  }
  static getConfigElement() {
    return document.createElement("savant-energy-breaker-board-card-editor");
  }
  static getConfigForm() {
    return dr();
  }
  static getStubConfig() {
    return {
      title: "Electrical Panel",
      discovery: { enabled: !0 },
      layout: { group_by: "none", density: "comfortable", mobile_view: "standard" }
    };
  }
  getCardSize() {
    const r = Math.max(this.breakers.length, 6);
    return Math.ceil(r / 2) + (this.config.display.show_title && this.config.title ? 1 : 0);
  }
  getGridOptions() {
    return {
      columns: "full",
      min_columns: 6,
      rows: Math.max(4, Math.ceil(Math.max(this.breakers.length, 6) / 3) * 4),
      min_rows: 4
    };
  }
  firstUpdated() {
    this.resizeObserver = new ResizeObserver(([r]) => {
      if (!r) {
        this.stacked = !1;
        return;
      }
      this.updateStackedLayout(r.contentRect.width);
    }), this.observeLayoutTarget();
  }
  disconnectedCallback() {
    var r;
    super.disconnectedCallback(), (r = this.resizeObserver) == null || r.disconnect();
  }
  updated(r) {
    this.observeLayoutTarget(), (r.has("hass") || r.has("config")) && this.ensureDiscovered();
  }
  observeLayoutTarget() {
    if (!this.resizeObserver) return;
    const r = this.renderRoot.querySelector(".board-grid") ?? this.renderRoot.querySelector("ha-card") ?? this;
    r !== this.resizeTarget && (this.resizeTarget && this.resizeObserver.unobserve(this.resizeTarget), this.resizeTarget = r, this.resizeObserver.observe(r), this.updateStackedLayout(r.getBoundingClientRect().width));
  }
  updateStackedLayout(r) {
    !Number.isFinite(r) || r <= 0 || (this.stacked && r >= 560 && (this.stacked = !1), !this.stacked && r <= 520 && (this.stacked = !0));
  }
  render() {
    return h`
      <ha-card>
        ${this.config.display.show_title ? this.renderHeader() : g}
        ${this.error ? h`<savant-board-error-state .message=${this.error}></savant-board-error-state>` : this.loading ? this.renderSkeletons() : this.visibleBreakers().length ? this.renderBreakers() : h`<savant-board-empty-state></savant-board-empty-state>`}
      </ha-card>
    `;
  }
  renderSkeletons() {
    return h`<div class=${`board-grid ${this.stacked ? "stacked" : ""}`}>${Array.from(
      { length: 8 },
      () => h`<savant-breaker-tile-skeleton ?stacked=${this.stacked}></savant-breaker-tile-skeleton>`
    )}</div>`;
  }
  renderHeader() {
    return h`
      <div class="board-header">
        <div class="board-header-top">
          <div class="savant-wordmark" aria-label="Savant">SAVANT</div>
          <div class="board-tools">
            <div class="tool-wrap">
              <button class="chip-tool" type="button" @click=${() => this.sortMenuOpen = !this.sortMenuOpen}>
                <savant-icon icon="sort_amount_down" aria-hidden="true"></savant-icon>
                <span class="sr-only">Sort</span>
              </button>
              ${this.sortMenuOpen ? h`<div class="tool-popover">
                    ${jt.map(
      ({ value: r, label: t }) => h`
                        <button
                          class=${this.effectiveSortBy() === r ? "menu-option selected" : "menu-option"}
                          type="button"
                          @click=${() => this.setRuntimeSort(r)}
                        >
                          ${t}
                        </button>
                      `
    )}
                  </div>` : g}
            </div>
            <div class="tool-wrap">
              <button
                class=${this.searchOpen ? "chip-tool active" : "chip-tool"}
                type="button"
                @click=${() => this.searchOpen = !this.searchOpen}
              >
                <savant-icon icon="search" aria-hidden="true"></savant-icon>
                <span class="sr-only">Search</span>
              </button>
            </div>
          </div>
        </div>
        ${this.searchOpen ? h`<div class="board-search-row" role="search" aria-label="Search loads">
              <div class="board-search-shell">
                <savant-icon icon="search" aria-hidden="true"></savant-icon>
                <input
                  class="search-input"
                  type="search"
                  placeholder="Search loads"
                  .value=${this.searchQuery}
                  @input=${(r) => this.searchQuery = r.target.value}
                />
              </div>
            </div>` : g}
      </div>
    `;
  }
  renderBreakers() {
    const r = wr(this.visibleBreakers(), this.config);
    return h`
      <div
        class=${`board-grid ${this.stacked ? "stacked" : ""}`}
        @savant-breaker-toggle=${this.handleToggle}
      >
        ${r.map(
      ([t, e]) => h`
            ${t ? h`<h3 class="group-title">${t}</h3>` : g}
            ${e.map((s) => {
        const i = mr(this.config, s), a = s.entities.power, o = a ? this.stats.get(a) : void 0;
        return h`<savant-breaker-tile
                .hass=${this.hass}
                .breaker=${s}
                .display=${i}
                .statistics=${o}
                ?stacked=${this.stacked}
                .mobileLayout=${this.config.layout.mobile_view}
                .graphLoading=${!!(a && !o)}
                .pending=${this.pendingSwitches.has(s.id)}
                .error=${this.toggleErrors.get(s.id) ?? ""}
                .warningLoadThresholdWatts=${this.config.controls.warning_load_threshold_watts ?? 1e3}
                .highLoadThresholdWatts=${this.config.controls.high_load_threshold_watts ?? 2e3}
              ></savant-breaker-tile>`;
      })}
          `
    )}
      </div>
    `;
  }
  async ensureDiscovered() {
    if (!this.hass) return;
    const r = JSON.stringify({
      discovery: this.config.discovery,
      manual: this.config.manual_breakers
    });
    if (r === this.discoveryKey && this.breakers.length) {
      this.loadStatistics();
      return;
    }
    this.loading = !0, this.error = "";
    try {
      this.breakers = await this.discovery.discover(this.hass, this.config), this.discoveryKey = r, this.loading = !1, this.stats = /* @__PURE__ */ new Map(), this.loadStatistics();
    } catch (t) {
      this.error = t instanceof Error ? t.message : "Discovery failed", this.loading = !1;
    }
  }
  async loadStatistics() {
    if (!this.hass) return;
    const r = ++this.statsRefreshToken, t = [
      ...new Set(
        this.visibleBreakers().map((s) => s.entities.power).filter((s) => !!s)
      )
    ], e = await Promise.all(
      t.map(async (s) => [
        s,
        await this.statistics.getStatistics(
          this.hass,
          s,
          this.config.graph.period,
          this.config.graph.refresh_interval_seconds
        )
      ])
    );
    r === this.statsRefreshToken && (this.stats = new Map(e));
  }
  visibleBreakers() {
    const r = new Set(this.config.excluded_breakers), t = this.searchQuery.trim().toLowerCase(), e = this.breakers.filter((s) => r.has(s.id) ? !1 : t ? [s.name, s.areaName, s.panelName].filter(Boolean).some((i) => i.toLowerCase().includes(t)) : !0);
    return _r(
      e,
      this.config,
      this.hass,
      this.stats,
      this.effectiveSortBy()
    );
  }
  effectiveSortBy() {
    return this.runtimeSortBy ?? this.config.layout.sort_by;
  }
  setRuntimeSort(r) {
    var t;
    this.runtimeSortBy = r, this.sortMenuOpen = !1, (t = window.localStorage) == null || t.setItem(this.persistedSortKey(), r);
  }
  loadPersistedSort() {
    var t;
    const r = (t = window.localStorage) == null ? void 0 : t.getItem(this.persistedSortKey());
    return jt.some((e) => e.value === r) ? r ?? void 0 : void 0;
  }
  persistedSortKey() {
    return `savant-breaker-board-sort:${this.config.title ?? "default"}`;
  }
};
y.styles = [
  vr,
  $`
      :host([density="compact"]) {
        --tile-height: 158px;
      }

      .board-header {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 8px;
        width: 100%;
        padding-bottom: 10px;
      }

      .board-header-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        width: 100%;
        min-width: 0;
      }

      .board-tools {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: auto;
      }

      .savant-wordmark {
        font-size: 26px;
        line-height: 36px;
        height: 36px;
        font-weight: 800;
        letter-spacing: 0;
        color: var(--primary-text-color);
      }

      .tool-wrap {
        position: relative;
      }

      .chip-tool {
        height: 36px;
        width: 36px;
        padding: 0;
        display: grid;
        place-items: center;
        border: 1px solid var(--savant-border);
        border-radius: var(--savant-radius);
        color: var(--primary-text-color);
        background:
          linear-gradient(
            145deg,
            color-mix(in srgb, var(--savant-tile-bg) 94%, white),
            var(--savant-tile-bg)
          );
        font-size: 18px;
        line-height: 1;
        cursor: pointer;
      }

      .chip-tool savant-icon {
        width: 20px;
        height: 20px;
      }

      .chip-tool:hover,
      .chip-tool:focus-visible {
        border-color: color-mix(in srgb, var(--savant-border) 70%, var(--primary-text-color));
      }

      .chip-tool.active {
        border-color: color-mix(in srgb, var(--savant-border) 55%, var(--primary-color));
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      .board-search-row {
        display: block;
        width: 100%;
      }

      .board-search-shell {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        box-sizing: border-box;
        min-height: 36px;
        padding: 0 12px;
        border: 1px solid var(--savant-border);
        border-radius: var(--savant-radius);
        background:
          linear-gradient(
            145deg,
            color-mix(in srgb, var(--savant-tile-bg) 94%, white),
            var(--savant-tile-bg)
          );
      }

      .board-search-shell savant-icon {
        width: 18px;
        height: 18px;
        color: color-mix(in srgb, var(--primary-text-color) 75%, var(--secondary-text-color));
        flex: none;
      }

      .board-search-shell .search-input {
        flex: 1;
        width: 100%;
        min-width: 0;
        padding: 9px 0;
        border: 0;
        outline: none;
        color: var(--primary-text-color);
        background: transparent;
      }

      .tool-popover {
        position: absolute;
        right: 0;
        top: calc(100% + 6px);
        z-index: 10;
        display: grid;
        gap: 4px;
        min-width: 190px;
        padding: 8px;
        border: 1px solid var(--savant-border);
        border-radius: var(--savant-radius);
        background: var(--ha-card-background, var(--card-background-color));
        box-shadow: var(--ha-card-box-shadow, 0 8px 20px rgb(0 0 0 / 0.24));
      }

      .menu-option {
        padding: 8px 10px;
        border: 0;
        border-radius: 8px;
        color: var(--primary-text-color);
        background: transparent;
        text-align: left;
        cursor: pointer;
      }

      .menu-option.selected,
      .menu-option:hover {
        background: var(--savant-tile-bg);
      }

      .search-input {
        box-sizing: border-box;
      }
    `
];
x([
  u({ attribute: !1 })
], y.prototype, "hass", 2);
x([
  v()
], y.prototype, "config", 2);
x([
  v()
], y.prototype, "breakers", 2);
x([
  v()
], y.prototype, "loading", 2);
x([
  v()
], y.prototype, "error", 2);
x([
  v()
], y.prototype, "stats", 2);
x([
  v()
], y.prototype, "pendingSwitches", 2);
x([
  v()
], y.prototype, "toggleErrors", 2);
x([
  v()
], y.prototype, "stacked", 2);
x([
  v()
], y.prototype, "sortMenuOpen", 2);
x([
  v()
], y.prototype, "searchOpen", 2);
x([
  v()
], y.prototype, "searchQuery", 2);
x([
  v()
], y.prototype, "runtimeSortBy", 2);
y = x([
  E("savant-energy-breaker-board-card")
], y);
const jt = [
  { value: "circuit_number", label: "Circuit number" },
  { value: "name", label: "Name" },
  { value: "current_power_descending", label: "Current power" },
  { value: "highest_usage", label: "Highest usage" },
  { value: "manual", label: "Manual" }
];
function _r(r, t, e, s = /* @__PURE__ */ new Map(), i = t.layout.sort_by) {
  return [...r].sort((a, o) => {
    var n, l;
    if (i === "name") return a.name.localeCompare(o.name);
    if (i === "current_power_descending") {
      const c = W(a.entities.power ? (n = e == null ? void 0 : e.states[a.entities.power]) == null ? void 0 : n.state : void 0) ?? -1 / 0;
      return (W(o.entities.power ? (l = e == null ? void 0 : e.states[o.entities.power]) == null ? void 0 : l.state : void 0) ?? -1 / 0) - c;
    }
    if (i === "highest_usage") {
      const c = Ht(a, s, e);
      return Ht(o, s, e) - c || a.name.localeCompare(o.name);
    }
    return i === "manual" ? 0 : (a.circuitNumber ?? 9999) - (o.circuitNumber ?? 9999) || a.name.localeCompare(o.name);
  });
}
function Ht(r, t, e) {
  var i, a;
  const s = r.entities.power;
  return s ? ((i = t.get(s)) == null ? void 0 : i.averageWatts) ?? W((a = e == null ? void 0 : e.states[s]) == null ? void 0 : a.state) ?? -1 / 0 : -1 / 0;
}
function wr(r, t) {
  if (t.layout.group_by === "none") return [["", r]];
  const e = /* @__PURE__ */ new Map();
  for (const s of r) {
    const i = t.layout.group_by === "panel_then_area" ? [s.panelName, s.areaName].filter(Boolean).join(" / ") || "Other" : t.layout.group_by === "area" ? s.areaName || "Other" : s.panelName || "Other";
    e.set(i, [...e.get(i) ?? [], s]);
  }
  return [...e.entries()];
}
function ee(r, t) {
  if (Array.isArray(r))
    return r.length ? r : void 0;
  if (r && typeof r == "object") {
    const e = {};
    for (const [s, i] of Object.entries(r)) {
      const a = ee(i, t == null ? void 0 : t[s]);
      a !== void 0 && (e[s] = a);
    }
    return Object.keys(e).length ? e : void 0;
  }
  return r === t ? void 0 : r;
}
function re(r) {
  const t = Y(r);
  return {
    type: "custom:savant-energy-breaker-board-card",
    ...ee(t, O) ?? {}
  };
}
function xr(r, t) {
  const e = structuredClone(r);
  return delete e.breaker_overrides[t], re(e);
}
var $r = Object.defineProperty, kr = Object.getOwnPropertyDescriptor, N = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? kr(t, e) : t, a = r.length - 1, o; a >= 0; a--)
    (o = r[a]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && $r(t, e, i), i;
};
let A = class extends _ {
  constructor() {
    super(...arguments), this.config = O, this.breakers = [], this.filter = "", this.loading = !1, this.discoveryError = "", this.expandedBreakers = /* @__PURE__ */ new Set(), this.discoveryLoaded = !1, this.discovery = new Xt();
  }
  setConfig(r) {
    this.config = Y(r), this.loadBreakers();
  }
  updated(r) {
    r.has("hass") && this.loadBreakers();
  }
  render() {
    const r = this.breakers.filter(
      (t) => t.name.toLowerCase().includes(this.filter.toLowerCase())
    );
    return h`
      <div class="editor">
        <section>
          <h3>Board</h3>
          ${this.textInput("Title", this.config.title ?? "", (t) => this.patch({ title: t || void 0 }))}
          ${this.switch(
      "Show title section",
      this.config.display.show_title,
      (t) => this.patch({ display: { ...this.config.display, show_title: t } })
    )}
          ${this.switch(
      "Auto-discovery",
      this.config.discovery.enabled,
      (t) => this.patch({ discovery: { ...this.config.discovery, enabled: t } })
    )}
          ${this.switch(
      "Ultra-compact mobile view",
      this.config.layout.mobile_view === "ultra_compact",
      (t) => this.patch({ layout: { ...this.config.layout, mobile_view: t ? "ultra_compact" : "standard" } })
    )}
          ${this.switch(
      "Group by breaker type",
      this.config.layout.group_by !== "none",
      (t) => this.patch({ layout: { ...this.config.layout, group_by: t ? "panel" : "none" } })
    )}
          ${this.select(
      "Sort",
      this.config.layout.sort_by,
      ["circuit_number", "name", "current_power_descending", "highest_usage", "manual"],
      (t) => this.patch({ layout: { ...this.config.layout, sort_by: t } })
    )}
          ${this.select(
      "Density",
      this.config.layout.density,
      ["comfortable", "compact"],
      (t) => this.patch({ layout: { ...this.config.layout, density: t } })
    )}
          ${this.select(
      "Graph period",
      this.config.graph.period,
      ["1h", "6h", "12h", "24h", "7d"],
      (t) => this.patch({ graph: { ...this.config.graph, period: t } })
    )}
          <p class="helper">Tiles automatically switch to a horizontal stacked layout in narrow dashboard columns.</p>
        </section>

        <section>
          <h3>Defaults</h3>
          ${Object.entries({
      show_current_power: "Current power",
      show_average_power: "Average power",
      show_maximum_power: "Maximum power",
      show_energy: "Energy",
      show_sparkline: "Sparkline",
      show_icon: "Icon",
      show_state: "Breaker state",
      show_controls: "Breaker controls",
      show_area: "Area label",
      show_circuit_number: "Circuit number"
    }).map(
      ([t, e]) => this.switch(
        e,
        this.config.display[t],
        (s) => this.patch({ display: { ...this.config.display, [t]: s } })
      )
    )}
          ${this.select(
      "Control safety",
      this.config.controls.default_mode,
      ["hidden", "hold", "hold_confirm_off"],
      (t) => this.patch({ controls: { ...this.config.controls, default_mode: t } })
    )}
          ${this.numberInput(
      "Yellow chart threshold (W)",
      this.config.controls.warning_load_threshold_watts ?? 1e3,
      (t) => this.patch({ controls: { ...this.config.controls, warning_load_threshold_watts: t } })
    )}
          ${this.numberInput(
      "Orange chart threshold (W)",
      this.config.controls.high_load_threshold_watts ?? 2e3,
      (t) => this.patch({ controls: { ...this.config.controls, high_load_threshold_watts: t } })
    )}
        </section>

        <section>
          <div class="section-head">
            <h3>Discovered breakers</h3>
            <button class="refresh" ?disabled=${this.loading || !this.hass} @click=${() => this.loadBreakers(!0)}>
              ${this.loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          ${this.textInput("Search breakers", this.filter, (t) => this.filter = t, !1)}
          ${this.discoveryError ? h`<div class="error">${this.discoveryError}</div>` : g}
          ${this.loading ? h`<div class="loading">Loading discovered breakers...</div>` : g}
          ${!this.loading && !r.length ? h`<div class="loading">${this.discoveryLoaded ? "No discovered breakers found." : "Discovery will run once when Home Assistant is ready."}</div>` : g}
          ${r.map((t) => this.renderBreakerEditor(t))}
        </section>
      </div>
    `;
  }
  renderBreakerEditor(r) {
    var o, n;
    const t = this.config.excluded_breakers.includes(r.id), e = this.config.breaker_overrides[r.id] ?? {}, s = this.expandedBreakers.has(r.id), i = r.entities.power ? W((n = (o = this.hass) == null ? void 0 : o.states[r.entities.power]) == null ? void 0 : n.state) : void 0, a = Object.entries(r.entities).filter(([, l]) => l).map(([l, c]) => `${l}: ${c}`).join(", ");
    return h`
      <article class=${t ? "breaker excluded" : "breaker"}>
        <div class="breaker-head" @click=${() => this.toggleExpanded(r.id)}>
          <div>
            <strong>${e.label || r.name}</strong>
          </div>
          <span class="breaker-actions">
            ${this.switch("Shown", !t, (l) => this.setExcluded(r.id, !l))}
            <span class="chevron">${s ? "Collapse" : "Expand"}</span>
          </span>
        </div>
        ${s ? h`
              <div class="breaker-details">
                <span>${it(i)} - ${r.available ? "available" : "unavailable"}</span>
                <small>${a || "No associated entities"}</small>
              </div>
              ${this.textInput(
      "Custom label",
      e.label ?? "",
      (l) => this.setOverride(r.id, { ...e, label: l || void 0 })
    )}
              <div class="override-grid">
                ${["show_current_power", "show_average_power", "show_maximum_power", "show_energy", "show_sparkline", "show_icon", "show_controls"].map(
      (l) => this.tristate(
        l.replaceAll("_", " "),
        e[l],
        (c) => this.setOverride(r.id, { ...e, [l]: c })
      )
    )}
              </div>
              ${this.select(
      "Control mode",
      e.control_mode ?? "default",
      ["default", "hidden", "hold", "hold_confirm_off"],
      (l) => this.setOverride(r.id, {
        ...e,
        control_mode: l === "default" ? void 0 : l
      })
    )}
              <button class="reset" @click=${() => this.resetOverride(r.id)}>Reset to defaults</button>
            ` : g}
      </article>
    `;
  }
  async loadBreakers(r = !1) {
    if (!(!this.hass || !r && (this.discoveryLoaded || this.loading))) {
      this.loading = !0, this.discoveryError = "";
      try {
        this.breakers = await this.discovery.discover(this.hass, this.config), this.discoveryLoaded = !0;
      } catch (t) {
        this.discoveryError = t instanceof Error ? t.message : "Discovery failed";
      } finally {
        this.loading = !1;
      }
    }
  }
  patch(r) {
    this.config = Y({ ...this.config, ...r }), nt(this, "config-changed", { config: re(this.config) });
  }
  setExcluded(r, t) {
    const e = new Set(this.config.excluded_breakers);
    t ? e.add(r) : e.delete(r), this.patch({ excluded_breakers: [...e] });
  }
  setOverride(r, t) {
    const e = Object.fromEntries(Object.entries(t).filter(([, s]) => s !== void 0 && s !== ""));
    this.patch({ breaker_overrides: { ...this.config.breaker_overrides, [r]: e } });
  }
  resetOverride(r) {
    const t = xr(this.config, r);
    this.config = Y(t), nt(this, "config-changed", { config: t });
  }
  toggleExpanded(r) {
    const t = new Set(this.expandedBreakers);
    t.has(r) ? t.delete(r) : t.add(r), this.expandedBreakers = t;
  }
  textInput(r, t, e, s = !0) {
    return h`<label><span>${r}</span><input .value=${t} @input=${(i) => e(i.target.value)} @change=${s ? (i) => e(i.target.value) : void 0} /></label>`;
  }
  checkbox(r, t, e) {
    return h`<label class="check"><input type="checkbox" .checked=${t} @change=${(s) => e(s.target.checked)} /> <span>${r}</span></label>`;
  }
  switch(r, t, e) {
    return h`
      <label class="switch" @click=${(s) => s.stopPropagation()}>
        <input type="checkbox" .checked=${t} @change=${(s) => e(s.target.checked)} />
        <span class="switch-track" aria-hidden="true"></span>
        <span>${r}</span>
      </label>
    `;
  }
  select(r, t, e, s) {
    return h`<label><span>${r}</span><select .value=${t} @change=${(i) => s(i.target.value)}>${e.map((i) => h`<option value=${i}>${i}</option>`)}</select></label>`;
  }
  numberInput(r, t, e) {
    return h`<label><span>${r}</span><input type="number" min="0" step="100" .value=${String(t)} @change=${(s) => e(Number(s.target.value) || 0)} /></label>`;
  }
  tristate(r, t, e) {
    const s = t === void 0 ? "default" : String(t);
    return this.select(
      r,
      s,
      ["default", "true", "false"],
      (i) => e(i === "default" ? void 0 : i === "true")
    );
  }
};
A.styles = $`
    .editor {
      display: grid;
      gap: 18px;
    }

    section,
    .breaker {
      display: grid;
      gap: 10px;
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
    }

    h3 {
      margin: 0;
      font-size: 16px;
    }

    label {
      display: grid;
      gap: 4px;
      font-size: 13px;
    }

    input,
    select {
      box-sizing: border-box;
      width: 100%;
      padding: 8px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
    }

    .check {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .check input {
      width: auto;
    }

    .switch {
      display: flex;
      align-items: center;
      gap: 9px;
      width: max-content;
      max-width: 100%;
      cursor: pointer;
    }

    .switch input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    .switch-track {
      position: relative;
      flex: none;
      width: 36px;
      height: 20px;
      border-radius: 999px;
      background: var(--disabled-text-color);
      transition: background 150ms ease;
    }

    .switch-track::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--card-background-color, white);
      transition: transform 150ms ease;
      box-shadow: 0 1px 2px rgb(0 0 0 / 0.25);
    }

    .switch input:checked + .switch-track {
      background: var(--primary-color);
    }

    .switch input:checked + .switch-track::after {
      transform: translateX(16px);
    }

    .helper,
    .loading,
    small,
    .breaker span {
      color: var(--secondary-text-color);
    }

    .error {
      color: var(--error-color);
      font-size: 13px;
    }

    .section-head,
    .breaker-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .breaker-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      cursor: pointer;
    }

    .breaker-head div {
      display: grid;
      gap: 3px;
      min-width: 0;
    }

    .breaker-details {
      display: grid;
      gap: 3px;
      min-width: 0;
    }

    .chevron {
      font-size: 12px;
      color: var(--secondary-text-color);
    }

    .excluded {
      opacity: 0.62;
    }

    .override-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 8px;
    }

    .reset,
    .refresh {
      justify-self: start;
      padding: 8px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color);
      cursor: pointer;
    }

    .refresh {
      justify-self: end;
      padding: 6px 10px;
    }

    .refresh:disabled {
      opacity: 0.6;
      cursor: default;
    }
  `;
N([
  u({ attribute: !1 })
], A.prototype, "hass", 2);
N([
  v()
], A.prototype, "config", 2);
N([
  v()
], A.prototype, "breakers", 2);
N([
  v()
], A.prototype, "filter", 2);
N([
  v()
], A.prototype, "loading", 2);
N([
  v()
], A.prototype, "discoveryError", 2);
N([
  v()
], A.prototype, "expandedBreakers", 2);
A = N([
  E("savant-energy-breaker-board-card-editor")
], A);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "savant-energy-breaker-board-card",
  name: "Savant Energy Breaker Board",
  description: "Discover and control Savant Energy breaker/circuit power data.",
  preview: !0,
  documentationURL: "https://github.com/brett/savant-energy-breaker-board-card"
});
//# sourceMappingURL=Savant-Card.js.map
