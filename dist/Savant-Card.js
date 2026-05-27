/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = globalThis, bt = st.ShadowRoot && (st.ShadyCSS === void 0 || st.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, yt = Symbol(), kt = /* @__PURE__ */ new WeakMap();
let Ut = class {
  constructor(t, r, s) {
    if (this._$cssResult$ = !0, s !== yt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (bt && t === void 0) {
      const s = r !== void 0 && r.length === 1;
      s && (t = kt.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && kt.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const se = (e) => new Ut(typeof e == "string" ? e : e + "", void 0, yt), k = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((s, i, o) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[o + 1], e[0]);
  return new Ut(r, e, yt);
}, ie = (e, t) => {
  if (bt) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const s = document.createElement("style"), i = st.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = r.cssText, e.appendChild(s);
  }
}, St = bt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const s of t.cssRules) r += s.cssText;
  return se(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: oe, defineProperty: ae, getOwnPropertyDescriptor: ne, getOwnPropertyNames: le, getOwnPropertySymbols: ce, getPrototypeOf: he } = Object, C = globalThis, At = C.trustedTypes, de = At ? At.emptyScript : "", ut = C.reactiveElementPolyfillSupport, Z = (e, t) => e, ot = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? de : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let r = e;
  switch (t) {
    case Boolean:
      r = e !== null;
      break;
    case Number:
      r = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(e);
      } catch {
        r = null;
      }
  }
  return r;
} }, _t = (e, t) => !oe(e, t), Et = { attribute: !0, type: String, converter: ot, reflect: !1, useDefault: !1, hasChanged: _t };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), C.litPropertyMetadata ?? (C.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let R = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Et) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, r);
      i !== void 0 && ae(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, s) {
    const { get: i, set: o } = ne(this.prototype, t) ?? { get() {
      return this[r];
    }, set(a) {
      this[r] = a;
    } };
    return { get: i, set(a) {
      const n = i == null ? void 0 : i.call(this);
      o == null || o.call(this, a), this.requestUpdate(t, n, s);
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
      const r = this.properties, s = [...le(r), ...ce(r)];
      for (const i of s) this.createProperty(i, r[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [s, i] of r) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, s] of this.elementProperties) {
      const i = this._$Eu(r, s);
      i !== void 0 && this._$Eh.set(i, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) r.unshift(St(i));
    } else t !== void 0 && r.push(St(t));
    return r;
  }
  static _$Eu(t, r) {
    const s = r.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((r) => this.enableUpdating = r), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((r) => r(this));
  }
  addController(t) {
    var r;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((r = t.hostConnected) == null || r.call(t));
  }
  removeController(t) {
    var r;
    (r = this._$EO) == null || r.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const s of r.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ie(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((r) => {
      var s;
      return (s = r.hostConnected) == null ? void 0 : s.call(r);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((r) => {
      var s;
      return (s = r.hostDisconnected) == null ? void 0 : s.call(r);
    });
  }
  attributeChangedCallback(t, r, s) {
    this._$AK(t, s);
  }
  _$ET(t, r) {
    var o;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const a = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : ot).toAttribute(r, s.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var o, a;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), l = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((o = n.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? n.converter : ot;
      this._$Em = i;
      const c = l.fromAttribute(r, n.type);
      this[i] = c ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, r, s, i = !1, o) {
    var a;
    if (t !== void 0) {
      const n = this.constructor;
      if (i === !1 && (o = this[t]), s ?? (s = n.getPropertyOptions(t)), !((s.hasChanged ?? _t)(o, r) || s.useDefault && s.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, r, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: s, reflect: i, wrapped: o }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? r ?? this[t]), o !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (r = void 0), this._$AL.set(t, r)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
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
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, a] of i) {
        const { wrapped: n } = a, l = this[o];
        n !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, a, l);
      }
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), (s = this._$EO) == null || s.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(r)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var r;
    (r = this._$EO) == null || r.forEach((s) => {
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((r) => this._$ET(r, this[r]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, R[Z("elementProperties")] = /* @__PURE__ */ new Map(), R[Z("finalized")] = /* @__PURE__ */ new Map(), ut == null || ut({ ReactiveElement: R }), (C.reactiveElementVersions ?? (C.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, Ot = (e) => e, at = K.trustedTypes, Mt = at ? at.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, It = "$lit$", P = `lit$${Math.random().toFixed(9).slice(2)}$`, Ft = "?" + P, pe = `<${Ft}>`, D = document, X = () => D.createComment(""), J = (e) => e === null || typeof e != "object" && typeof e != "function", wt = Array.isArray, ue = (e) => wt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", gt = `[ 	
\f\r]`, q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pt = /-->/g, Ct = />/g, N = RegExp(`>|${gt}(?:([^\\s"'>=/]+)(${gt}*=${gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Lt = /'/g, Tt = /"/g, Vt = /^(?:script|style|textarea|title)$/i, Wt = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), h = Wt(1), Y = Wt(2), U = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Nt = /* @__PURE__ */ new WeakMap(), B = D.createTreeWalker(D, 129);
function qt(e, t) {
  if (!wt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Mt !== void 0 ? Mt.createHTML(t) : t;
}
const ge = (e, t) => {
  const r = e.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = q;
  for (let n = 0; n < r; n++) {
    const l = e[n];
    let c, d, p = -1, v = 0;
    for (; v < l.length && (a.lastIndex = v, d = a.exec(l), d !== null); ) v = a.lastIndex, a === q ? d[1] === "!--" ? a = Pt : d[1] !== void 0 ? a = Ct : d[2] !== void 0 ? (Vt.test(d[2]) && (i = RegExp("</" + d[2], "g")), a = N) : d[3] !== void 0 && (a = N) : a === N ? d[0] === ">" ? (a = i ?? q, p = -1) : d[1] === void 0 ? p = -2 : (p = a.lastIndex - d[2].length, c = d[1], a = d[3] === void 0 ? N : d[3] === '"' ? Tt : Lt) : a === Tt || a === Lt ? a = N : a === Pt || a === Ct ? a = q : (a = N, i = void 0);
    const m = a === N && e[n + 1].startsWith("/>") ? " " : "";
    o += a === q ? l + pe : p >= 0 ? (s.push(c), l.slice(0, p) + It + l.slice(p) + P + m) : l + P + (p === -2 ? n : m);
  }
  return [qt(e, o + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class tt {
  constructor({ strings: t, _$litType$: r }, s) {
    let i;
    this.parts = [];
    let o = 0, a = 0;
    const n = t.length - 1, l = this.parts, [c, d] = ge(t, r);
    if (this.el = tt.createElement(c, s), B.currentNode = this.el.content, r === 2 || r === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = B.nextNode()) !== null && l.length < n; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(It)) {
          const v = d[a++], m = i.getAttribute(p).split(P), y = /([.?@])?(.*)/.exec(v);
          l.push({ type: 1, index: o, name: y[2], strings: m, ctor: y[1] === "." ? fe : y[1] === "?" ? ve : y[1] === "@" ? be : dt }), i.removeAttribute(p);
        } else p.startsWith(P) && (l.push({ type: 6, index: o }), i.removeAttribute(p));
        if (Vt.test(i.tagName)) {
          const p = i.textContent.split(P), v = p.length - 1;
          if (v > 0) {
            i.textContent = at ? at.emptyScript : "";
            for (let m = 0; m < v; m++) i.append(p[m], X()), B.nextNode(), l.push({ type: 2, index: ++o });
            i.append(p[v], X());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ft) l.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(P, p + 1)) !== -1; ) l.push({ type: 7, index: o }), p += P.length - 1;
      }
      o++;
    }
  }
  static createElement(t, r) {
    const s = D.createElement("template");
    return s.innerHTML = t, s;
  }
}
function I(e, t, r = e, s) {
  var a, n;
  if (t === U) return t;
  let i = s !== void 0 ? (a = r._$Co) == null ? void 0 : a[s] : r._$Cl;
  const o = J(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((n = i == null ? void 0 : i._$AO) == null || n.call(i, !1), o === void 0 ? i = void 0 : (i = new o(e), i._$AT(e, r, s)), s !== void 0 ? (r._$Co ?? (r._$Co = []))[s] = i : r._$Cl = i), i !== void 0 && (t = I(e, i._$AS(e, t.values), i, s)), t;
}
class me {
  constructor(t, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: r }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? D).importNode(r, !0);
    B.currentNode = i;
    let o = B.nextNode(), a = 0, n = 0, l = s[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new rt(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new ye(o, this, t)), this._$AV.push(c), l = s[++n];
      }
      a !== (l == null ? void 0 : l.index) && (o = B.nextNode(), a++);
    }
    return B.currentNode = D, i;
  }
  p(t) {
    let r = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, r), r += s.strings.length - 2) : s._$AI(t[r])), r++;
  }
}
class rt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, r, s, i) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = r.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, r = this) {
    t = I(this, t, r), J(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== U && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ue(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && J(this._$AH) ? this._$AA.nextSibling.data = t : this.T(D.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: r, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = tt.createElement(qt(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(r);
    else {
      const a = new me(i, this), n = a.u(this.options);
      a.p(r), this.T(n), this._$AH = a;
    }
  }
  _$AC(t) {
    let r = Nt.get(t.strings);
    return r === void 0 && Nt.set(t.strings, r = new tt(t)), r;
  }
  k(t) {
    wt(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let s, i = 0;
    for (const o of t) i === r.length ? r.push(s = new rt(this.O(X()), this.O(X()), this, this.options)) : s = r[i], s._$AI(o), i++;
    i < r.length && (this._$AR(s && s._$AB.nextSibling, i), r.length = i);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, r); t !== this._$AB; ) {
      const i = Ot(t).nextSibling;
      Ot(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var r;
    this._$AM === void 0 && (this._$Cv = t, (r = this._$AP) == null || r.call(this, t));
  }
}
class dt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, s, i, o) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = r, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = g;
  }
  _$AI(t, r = this, s, i) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = I(this, t, r, 0), a = !J(t) || t !== this._$AH && t !== U, a && (this._$AH = t);
    else {
      const n = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = I(this, n[s + l], r, l), c === U && (c = this._$AH[l]), a || (a = !J(c) || c !== this._$AH[l]), c === g ? t = g : t !== g && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class fe extends dt {
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
  constructor(t, r, s, i, o) {
    super(t, r, s, i, o), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = I(this, t, r, 0) ?? g) === U) return;
    const s = this._$AH, i = t === g && s !== g || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== g && (s === g || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ye {
  constructor(t, r, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    I(this, t);
  }
}
const mt = K.litHtmlPolyfillSupport;
mt == null || mt(tt, rt), (K.litHtmlVersions ?? (K.litHtmlVersions = [])).push("3.3.3");
const _e = (e, t, r) => {
  const s = (r == null ? void 0 : r.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = (r == null ? void 0 : r.renderBefore) ?? null;
    s._$litPart$ = i = new rt(t.insertBefore(X(), o), o, void 0, r ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis;
class x extends R {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var r;
    const t = super.createRenderRoot();
    return (r = this.renderOptions).renderBefore ?? (r.renderBefore = t.firstChild), t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = _e(r, this.renderRoot, this.renderOptions);
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
x._$litElement$ = !0, x.finalized = !0, (Rt = z.litElementHydrateSupport) == null || Rt.call(z, { LitElement: x });
const ft = z.litElementPolyfillSupport;
ft == null || ft({ LitElement: x });
(z.litElementVersions ?? (z.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const we = { attribute: !0, type: String, converter: ot, reflect: !1, hasChanged: _t }, xe = (e = we, t, r) => {
  const { kind: s, metadata: i } = r;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(r.name, e), s === "accessor") {
    const { name: a } = r;
    return { set(n) {
      const l = t.get.call(this);
      t.set.call(this, n), this.requestUpdate(a, l, e, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(a, void 0, e, n), n;
    } };
  }
  if (s === "setter") {
    const { name: a } = r;
    return function(n) {
      const l = this[a];
      t.call(this, n), this.requestUpdate(a, l, e, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function u(e) {
  return (t, r) => typeof r == "object" ? xe(e, t, r) : ((s, i, o) => {
    const a = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, s), a ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function f(e) {
  return u({ ...e, state: !0, attribute: !1 });
}
var $e = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, xt = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? ke(t, r) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, r, i) : a(i)) || i);
  return s && i && $e(t, r, i), i;
};
let et = class extends x {
  constructor() {
    super(...arguments), this.points = [], this.state = "normal";
  }
  render() {
    const e = Se(this.points), t = e ?? Ae(), r = !e;
    return Y`
      <svg
        data-no-history=${r ? "true" : "false"}
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
        ${r ? "" : Y`
              ${t.fillPath ? Y`<path class="fill-base" d=${t.fillPath}></path>` : ""}
            `}
        <path class="line" d=${t.path}></path>
      </svg>
    `;
  }
};
et.styles = k`
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
], et.prototype, "points", 2);
xt([
  u({ type: String, reflect: !0 })
], et.prototype, "state", 2);
et = xt([
  E("savant-sparkline")
], et);
function Se(e) {
  const t = e.map((o) => o.value).filter(Number.isFinite);
  if (!t.length) return;
  if (t.every((o) => Math.max(0, o) === 0)) return Ee(t.length);
  if (t.length === 1) {
    const o = Bt(t[0], zt(t)), a = Math.max(0, t[0]);
    return {
      path: `M 0 ${o} L 100 ${o}`,
      fillPath: a > 0 ? `M 0 ${o} L 100 ${o} L 100 36 L 0 36 Z` : ""
    };
  }
  const r = zt(t), s = t.map((o, a) => {
    const n = a / (t.length - 1) * 100, l = Math.max(0, o);
    return [n, l === 0 ? L : Bt(o, r), l];
  });
  return {
    path: Me(s),
    fillPath: Pe(s)
  };
}
function Bt(e, t) {
  return L - Math.max(0, e) / t * (L - Oe);
}
function zt(e) {
  return Math.max(1, ...e) * 1.25;
}
function Ae() {
  return {
    path: `M 0 ${L} L 100 ${L}`,
    fillPath: ""
  };
}
function Ee(e) {
  return e <= 1 ? {
    path: `M 0 ${L} L 100 ${L}`,
    fillPath: ""
  } : { path: Array.from({ length: e }, (r, s) => {
    const i = s / (e - 1) * 100;
    return `${s === 0 ? "M" : "L"} ${i.toFixed(2)} ${L.toFixed(2)}`;
  }).join(" "), fillPath: "" };
}
const Oe = 5, L = 33;
function Me(e) {
  if (e.every(([, , r]) => r === 0))
    return e.map(([r, s], i) => `${i === 0 ? "M" : "L"} ${r.toFixed(2)} ${s.toFixed(2)}`).join(" ");
  const t = [];
  for (let r = 1; r < e.length; r += 1) {
    const s = e[r - 1], i = e[r];
    t.push(`M ${s[0].toFixed(2)} ${s[1].toFixed(2)} L ${i[0].toFixed(2)} ${i[1].toFixed(2)}`);
  }
  return t.join(" ");
}
function Pe(e) {
  const t = [];
  for (let r = 1; r < e.length; r += 1) {
    const s = e[r - 1], i = e[r];
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
var Ce = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, pt = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? Le(t, r) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, r, i) : a(i)) || i);
  return s && i && Ce(t, r, i), i;
};
let F = class extends x {
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
F.styles = k`
    :host {
      display: flex;
      align-items: end;
      gap: 12px;
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
function nt(e, t, r) {
  e.dispatchEvent(
    new CustomEvent(t, {
      detail: r,
      bubbles: !0,
      composed: !0
    })
  );
}
var Te = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, Gt = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? Ne(t, r) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, r, i) : a(i)) || i);
  return s && i && Te(t, r, i), i;
};
const Dt = {
  flash: "M7,2V13H10V22L17,10H13L17,2H7Z",
  power: "M13,3H11V13H13V3M17.83,5.17L16.41,6.59C17.99,7.86 19,9.81 19,12A7,7 0 0,1 12,19A7,7 0 0,1 5,12C5,9.81 6.01,7.86 7.59,6.59L6.17,5.17C4.23,6.82 3,9.26 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12C21,9.26 19.77,6.82 17.83,5.17Z",
  search: "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20 15.5 14Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z",
  sort_amount_down: "M3 7h10v2H3V7m0 4h7v2H3v-2m0 4h4v2H3v-2m14-7 4 4h-3v6h-2v-6h-3l4-4Z",
  minimize_2: ""
};
let lt = class extends x {
  constructor() {
    super(...arguments), this.icon = "flash";
  }
  render() {
    return this.icon === "minimize_2" ? Y`
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 10h-4v-4" />
          <path d="M20 4l-6 6" />
          <path d="M6 14h4v4" />
          <path d="M10 14l-6 6" />
        </svg>
      ` : h`
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        ${Y`<path d=${Dt[this.icon] ?? Dt.flash}></path>`}
      </svg>
    `;
  }
};
lt.styles = k`
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
var Be = Object.defineProperty, ze = Object.getOwnPropertyDescriptor, M = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? ze(t, r) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, r, i) : a(i)) || i);
  return s && i && Be(t, r, i), i;
};
let S = class extends x {
  constructor() {
    super(...arguments), this.breakerId = "", this.label = "breaker", this.switchState = "off", this.mode = "hold_confirm_off", this.disabled = !1, this.pending = !1, this.holding = !1, this.progress = 0, this.startedAt = 0, this.holdMs = 900, this.cancelHold = () => {
      window.clearTimeout(this.timer), this.holding = !1, this.progress = 0;
    };
  }
  render() {
    const e = this.disabled ? `${this.label} breaker unavailable` : `Hold to ${this.switchState === "on" ? "turn off" : "turn on"} ${this.label} breaker`;
    return h`
      <button
        aria-label=${e}
        title=${e}
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
  preventClick(e) {
    e.stopPropagation(), e.preventDefault();
  }
  onPointerDown(e) {
    e.stopPropagation(), !(this.disabled || this.pending) && (this.holding = !0, this.startedAt = performance.now(), this.tick());
  }
  onPointerUp(e) {
    e.stopPropagation(), this.holding && (performance.now() - this.startedAt >= this.holdMs && this.requestToggle(), this.cancelHold());
  }
  tick() {
    const e = performance.now() - this.startedAt;
    this.progress = Math.min(1, e / this.holdMs), !(this.progress >= 1) && (this.timer = window.setTimeout(() => this.tick(), 16));
  }
  requestToggle() {
    nt(this, "savant-breaker-toggle", { breakerId: this.breakerId });
  }
};
S.styles = k`
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
M([
  u({ type: String })
], S.prototype, "breakerId", 2);
M([
  u({ type: String })
], S.prototype, "label", 2);
M([
  u({ type: String })
], S.prototype, "switchState", 2);
M([
  u({ type: String })
], S.prototype, "mode", 2);
M([
  u({ type: Boolean })
], S.prototype, "disabled", 2);
M([
  u({ type: Boolean })
], S.prototype, "pending", 2);
M([
  f()
], S.prototype, "holding", 2);
M([
  f()
], S.prototype, "progress", 2);
S = M([
  E("savant-hold-control-button")
], S);
function V(e) {
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function it(e) {
  if (e === void 0 || !Number.isFinite(e)) return "--";
  const t = Math.abs(e);
  return t >= 1e3 ? `${De(e / 1e3, t >= 1e4 ? 1 : 2)} kW` : `${Math.round(e)} W`;
}
function De(e, t) {
  return e.toLocaleString(void 0, {
    maximumFractionDigits: t,
    minimumFractionDigits: 0
  });
}
function je(e, t = "kWh") {
  return e === void 0 || !Number.isFinite(e) ? "--" : `${e.toLocaleString(void 0, { maximumFractionDigits: 2 })} ${t}`;
}
var He = Object.defineProperty, Re = Object.getOwnPropertyDescriptor, $ = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? Re(t, r) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, r, i) : a(i)) || i);
  return s && i && He(t, r, i), i;
};
let w = class extends x {
  constructor() {
    super(...arguments), this.highLoadThresholdWatts = 2e3, this.warningLoadThresholdWatts = 1e3, this.graphLoading = !1, this.pending = !1, this.stacked = !1, this.mobileLayout = "standard", this.error = "";
  }
  render() {
    var c, d, p, v, m, y, W;
    const e = this.runtimeState(), t = this.visualState(e.powerWatts, e.switchState, e.available), r = this.loadState(e.powerWatts), s = this.stacked && this.mobileLayout === "ultra_compact", i = this.display.show_area ? this.breaker.areaName : void 0, o = t === "off" ? Ie((c = this.statistics) == null ? void 0 : c.points.length) : ((d = this.statistics) == null ? void 0 : d.points) ?? [], a = !!((p = this.statistics) != null && p.points.length), n = !s && a && (((v = this.statistics) == null ? void 0 : v.averageWatts) !== void 0 || ((m = this.statistics) == null ? void 0 : m.maximumWatts) !== void 0), l = this.display.show_controls && this.display.control_mode !== "hidden" && this.breaker.controllable && !!this.breaker.entities.switch;
    return h`
      <button class=${`tile ${t} ${this.pending ? "pending" : ""} ${s ? "ultra-compact" : ""}`} @click=${this.openMoreInfo}>
        <span class="mobile-bar" aria-hidden="true"></span>
        <span class="topline">
          <span class="state-dot" aria-hidden="true"></span>
          ${this.display.show_state ? h`<span class="state-text">${Ue(t, e.switchState)}</span>` : ""}
          ${this.display.show_icon ? this.renderEntityIcon() : ""}
        </span>
        <span class="name">${this.display.label}</span>
        ${i && !s ? h`<span class="subtitle">${i}</span>` : ""}
        <span class="power">${this.display.show_current_power ? it(e.powerWatts) : ""}</span>
        <span class="graph">
          ${this.graphLoading && t !== "off" ? this.renderGraphSkeleton() : this.display.show_sparkline ? h`<savant-sparkline
                  .points=${o}
                  .state=${!a || t === "unavailable" || t === "off" ? "muted" : r === "high" ? "warning" : r === "warning" ? "caution" : "normal"}
                ></savant-sparkline>` : ""}
        </span>
        <span class="metrics">
          ${n && (this.display.show_average_power || this.display.show_maximum_power) ? h`<savant-metric-row
                .avg=${this.display.show_average_power ? it((y = this.statistics) == null ? void 0 : y.averageWatts) : "--"}
                .max=${this.display.show_maximum_power ? it((W = this.statistics) == null ? void 0 : W.maximumWatts) : "--"}
                ?stacked=${this.stacked}
              ></savant-metric-row>` : ""}
          ${this.display.show_energy ? h`<span class="energy">${je(e.energyValue)}</span>` : ""}
        </span>
        ${this.error ? h`<span class="feedback">${this.error}</span>` : ""}
        ${l ? h`<savant-hold-control-button
              class="control"
              .breakerId=${this.breaker.id}
              .label=${this.display.label}
              .mode=${this.display.control_mode === "hold" ? "hold" : "hold_confirm_off"}
              .switchState=${e.switchState ?? "off"}
              .pending=${this.pending}
              ?disabled=${!e.available}
            ></savant-hold-control-button>` : ""}
      </button>
    `;
  }
  renderEntityIcon() {
    var r, s;
    const e = this.breaker.entities.power, t = e ? (s = (r = this.hass) == null ? void 0 : r.states[e]) == null ? void 0 : s.attributes.icon : void 0;
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
    var n, l, c, d, p, v, m, y, W, $t;
    const e = this.breaker.entities.power, t = this.breaker.entities.energy, r = this.breaker.entities.switch, s = e ? V((l = (n = this.hass) == null ? void 0 : n.states[e]) == null ? void 0 : l.state) : void 0, i = t ? V((d = (c = this.hass) == null ? void 0 : c.states[t]) == null ? void 0 : d.state) : void 0, o = this.optimisticSwitchState ?? (r ? (v = (p = this.hass) == null ? void 0 : p.states[r]) == null ? void 0 : v.state : void 0), a = this.breaker.available && (!e || ((y = (m = this.hass) == null ? void 0 : m.states[e]) == null ? void 0 : y.state) !== "unavailable") && (!r || (($t = (W = this.hass) == null ? void 0 : W.states[r]) == null ? void 0 : $t.state) !== "unavailable");
    return { powerWatts: s, energyValue: i, switchState: o, available: a };
  }
  visualState(e, t, r = !0) {
    return this.error ? "error" : this.pending ? "pending" : r ? t === "off" ? "off" : t === "on" ? "on" : e === 0 ? "off" : "on" : "unavailable";
  }
  loadState(e) {
    return e !== void 0 && e > this.highLoadThresholdWatts ? "high" : e !== void 0 && e > this.warningLoadThresholdWatts ? "warning" : "normal";
  }
  openMoreInfo(e) {
    if (e.target.closest("savant-hold-control-button")) return;
    const r = this.breaker.entities.power ?? this.breaker.entities.switch ?? this.breaker.entities.energy;
    r && nt(this, "hass-action", {
      config: {
        entity: r,
        tap_action: { action: "more-info" }
      },
      action: "tap"
    });
  }
};
w.styles = k`
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
      margin-top: 5px;
      font-size: 15px;
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
      font-size: 12px;
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
      margin-top: 11px;
      font-size: 28px;
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
      top: 68px;
      margin: 0;
      min-height: 0;
    }

    :host(:not([stacked])) .power {
      position: absolute;
      left: 16px;
      right: 16px;
      top: 86px;
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
      top: 110px;
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
      bottom: 14px;
      display: flex;
      align-items: end;
      gap: 10px;
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
$([
  u({ attribute: !1 })
], w.prototype, "hass", 2);
$([
  u({ attribute: !1 })
], w.prototype, "breaker", 2);
$([
  u({ attribute: !1 })
], w.prototype, "display", 2);
$([
  u({ attribute: !1 })
], w.prototype, "statistics", 2);
$([
  u({ type: Number })
], w.prototype, "highLoadThresholdWatts", 2);
$([
  u({ type: Number })
], w.prototype, "warningLoadThresholdWatts", 2);
$([
  u({ type: Boolean })
], w.prototype, "graphLoading", 2);
$([
  u({ type: Boolean })
], w.prototype, "pending", 2);
$([
  u({ type: Boolean, reflect: !0 })
], w.prototype, "stacked", 2);
$([
  u({ type: String, attribute: "mobile-layout", reflect: !0 })
], w.prototype, "mobileLayout", 2);
$([
  u({ type: String })
], w.prototype, "optimisticSwitchState", 2);
$([
  u({ type: String })
], w.prototype, "error", 2);
w = $([
  E("savant-breaker-tile")
], w);
function Ue(e, t) {
  return e === "unavailable" ? "Unavailable" : t === "off" || e === "off" ? "Off" : "On";
}
function Ie(e = 2) {
  return Array.from({ length: Math.max(2, e) }, (t, r) => ({
    start: r,
    value: 0
  }));
}
const Fe = k`
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
var Ve = Object.defineProperty, We = Object.getOwnPropertyDescriptor, Zt = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? We(t, r) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, r, i) : a(i)) || i);
  return s && i && Ve(t, r, i), i;
};
let ct = class extends x {
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
  k`
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
        left: 80px;
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
var qe = Object.getOwnPropertyDescriptor, Ge = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? qe(t, r) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = a(i) || i);
  return i;
};
let vt = class extends x {
  render() {
    return h`
      <div class="empty">
        <strong>No Savant breaker entities discovered.</strong>
        <span>Open the card editor to add manual mappings or check Savant Energy entity metadata.</span>
      </div>
    `;
  }
};
vt.styles = k`
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
var Ze = Object.defineProperty, Ke = Object.getOwnPropertyDescriptor, Kt = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? Ke(t, r) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, r, i) : a(i)) || i);
  return s && i && Ze(t, r, i), i;
};
let ht = class extends x {
  constructor() {
    super(...arguments), this.message = "Unable to load breaker board.";
  }
  render() {
    return h`<div class="error">${this.message}</div>`;
  }
};
ht.styles = k`
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
    return this.manualBreakers.map((r) => {
      const s = {
        switch: r.switch_entity,
        power: r.power_entity,
        energy: r.energy_entity,
        voltage: r.voltage_entity,
        current: r.current_entity
      };
      return {
        id: `manual:${r.id}`,
        name: r.name,
        areaName: r.area_name,
        panelName: r.panel_name,
        circuitNumber: r.circuit_number,
        controllable: !!r.switch_entity,
        entities: s,
        available: Object.values(s).some(
          (i) => {
            var o;
            return i && ((o = t.states[i]) == null ? void 0 : o.state) !== "unavailable";
          }
        ),
        discoveryConfidence: "manual"
      };
    });
  }
}
function Yt(e, t) {
  const r = e.split(".")[0], s = t == null ? void 0 : t.attributes.device_class;
  if (r === "switch") return "switch";
  if (r === "sensor") {
    if (s === "power") return "power";
    if (s === "energy") return "energy";
    if (s === "voltage") return "voltage";
    if (s === "current") return "current";
  }
}
function Qe(e) {
  var a;
  const t = new Map(e.devices.map((n) => [n.id, n])), r = new Map(e.areas.map((n) => [n.area_id, n.name])), s = /* @__PURE__ */ new Map(), i = [];
  for (const n of e.entities)
    if (!(n.disabled_by || n.hidden_by) && Xe(n, t.get(n.device_id ?? ""), e.integration))
      if (n.device_id) {
        const l = s.get(n.device_id) ?? [];
        l.push(n), s.set(n.device_id, l);
      } else
        i.push(n);
  const o = [];
  for (const [n, l] of s) {
    const c = Je(n, l, t.get(n), r, e.states);
    c && o.push(c);
  }
  for (const n of i) {
    const l = Yt(n.entity_id, e.states[n.entity_id]);
    l && o.push({
      id: rr(n),
      name: Qt(n, e.states[n.entity_id]),
      areaId: n.area_id,
      areaName: n.area_id ? r.get(n.area_id) : void 0,
      controllable: l === "switch",
      entities: { [l]: n.entity_id },
      available: ((a = e.states[n.entity_id]) == null ? void 0 : a.state) !== "unavailable",
      discoveryConfidence: "medium",
      discoveryNotes: ["Associated from entity registry without a device_id."]
    });
  }
  return o;
}
function Xe(e, t, r) {
  var o;
  if (e.platform === r) return !0;
  const s = ((t == null ? void 0 : t.manufacturer) ?? "").toLowerCase(), i = ((o = t == null ? void 0 : t.identifiers) == null ? void 0 : o.flat().join(" ").toLowerCase()) ?? "";
  return s.includes("savant") || i.includes(r.toLowerCase());
}
function Je(e, t, r, s, i) {
  var v;
  const o = {}, a = [];
  for (const m of t) {
    const y = Yt(m.entity_id, i[m.entity_id]);
    !y || o[y] || (o[y] = m.entity_id);
  }
  if (!Object.keys(o).length) return;
  const n = t.find((m) => m.entity_id === o.power) ?? t[0], l = (n == null ? void 0 : n.area_id) ?? (r == null ? void 0 : r.area_id) ?? void 0, c = n ? (v = i[n.entity_id]) == null ? void 0 : v.attributes : {}, d = er((c == null ? void 0 : c.circuit_number) ?? (c == null ? void 0 : c.circuit)), p = tr(c == null ? void 0 : c.panel_name, c == null ? void 0 : c.panel, r == null ? void 0 : r.model);
  return o.power || a.push("No power sensor with device_class: power was found."), o.switch || a.push("No switch entity was found for breaker control."), {
    id: `device:${e}`,
    deviceId: e,
    name: (r == null ? void 0 : r.name_by_user) || (r == null ? void 0 : r.name) || Qt(n, n ? i[n.entity_id] : void 0),
    areaId: l,
    areaName: l ? s.get(l) : void 0,
    panelName: p,
    circuitNumber: d,
    controllable: !!o.switch,
    entities: o,
    available: Object.values(o).some((m) => {
      var y;
      return ((y = i[m]) == null ? void 0 : y.state) !== "unavailable";
    }),
    discoveryConfidence: o.power && o.switch ? "high" : "medium",
    discoveryNotes: a.length ? a : void 0
  };
}
function tr(...e) {
  return e.find((t) => typeof t == "string" && t.length > 0);
}
function er(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function rr(e) {
  return e.unique_id ? `entity:${e.unique_id}` : `entity:${e.entity_id}`;
}
function Qt(e, t) {
  return (e == null ? void 0 : e.name) || (e == null ? void 0 : e.original_name) || (t == null ? void 0 : t.attributes.friendly_name) || (e == null ? void 0 : e.entity_id) || "Savant breaker";
}
class sr {
  constructor(t) {
    this.integration = t;
  }
  async discover(t) {
    const r = await ir(t);
    return Qe({
      ...r,
      states: t.states,
      integration: this.integration
    });
  }
}
async function ir(e) {
  const t = e.connection;
  if (!(t != null && t.sendMessagePromise))
    return { entities: [], devices: [], areas: [] };
  const [r, s, i] = await Promise.all([
    t.sendMessagePromise({ type: "config/entity_registry/list" }),
    t.sendMessagePromise({ type: "config/device_registry/list" }),
    t.sendMessagePromise({ type: "config/area_registry/list" })
  ]);
  return {
    entities: r,
    devices: s,
    areas: i
  };
}
class Xt {
  constructor(t) {
    this.providers = t;
  }
  async discover(t, r) {
    const s = this.providers ?? [
      ...r.discovery.enabled ? [new sr(r.discovery.integration)] : [],
      new Ye(r.manual_breakers)
    ], i = await Promise.all(s.map((o) => o.discover(t)));
    return or(i.flat());
  }
}
function or(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e) {
    const s = t.get(r.id);
    t.set(
      r.id,
      s ? {
        ...s,
        ...r,
        entities: { ...s.entities, ...r.entities },
        discoveryNotes: [...s.discoveryNotes ?? [], ...r.discoveryNotes ?? []]
      } : r
    );
  }
  return [...t.values()];
}
class ar {
  async fetchHistory(t, r, s) {
    var l;
    if (!((l = t.connection) != null && l.sendMessagePromise)) return [];
    const i = /* @__PURE__ */ new Date(), o = new Date(i.getTime() - nr(s)), a = await t.connection.sendMessagePromise({
      type: "history/history_during_period",
      start_time: o.toISOString(),
      end_time: i.toISOString(),
      entity_ids: [r],
      minimal_response: !0,
      no_attributes: !0
    });
    return ((a == null ? void 0 : a[0]) ?? []).map((c) => ({
      start: new Date(c.last_changed ?? c.lu ?? c.s).getTime(),
      value: Number(c.state)
    })).filter((c) => Number.isFinite(c.start) && Number.isFinite(c.value));
  }
}
function nr(e) {
  switch (e) {
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
    this.cache = /* @__PURE__ */ new Map(), this.history = new ar();
  }
  async getStatistics(t, r, s, i) {
    const o = `${r}:${s}`, a = Date.now(), n = this.cache.get(o);
    if (n && a - n.fetchedAt < i * 1e3)
      return n.data;
    try {
      const l = await this.fetchStatisticsOrHistory(t, r, s), c = l.map((p) => p.value).filter(Number.isFinite), d = {
        entityId: r,
        period: s,
        points: l,
        averageWatts: c.length ? c.reduce((p, v) => p + v, 0) / c.length : void 0,
        maximumWatts: c.length ? Math.max(...c) : void 0,
        loading: !1,
        fetchedAt: a
      };
      return this.cache.set(o, { data: d, fetchedAt: a }), d;
    } catch (l) {
      return {
        entityId: r,
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
    for (const r of this.cache.keys())
      r.startsWith(`${t}:`) && this.cache.delete(r);
  }
  async fetchStatisticsOrHistory(t, r, s) {
    var i;
    if (!((i = t.connection) != null && i.sendMessagePromise)) return [];
    if (s === "7d" || s === "24h" || s === "12h" || s === "6h")
      try {
        const o = /* @__PURE__ */ new Date(), a = new Date(o.getTime() - cr(s)), n = await t.connection.sendMessagePromise({
          type: "recorder/statistics_during_period",
          start_time: a.toISOString(),
          end_time: o.toISOString(),
          statistic_ids: [r],
          period: s === "7d" ? "hour" : "5minute",
          types: ["mean", "max"]
        }), c = ((n == null ? void 0 : n[r]) ?? []).map((d) => ({
          start: new Date(d.start).getTime(),
          value: Number(d.mean ?? d.max)
        })).filter((d) => Number.isFinite(d.start) && Number.isFinite(d.value));
        if (c.length) return c;
      } catch {
      }
    return this.history.fetchHistory(t, r, s);
  }
}
function cr(e) {
  switch (e) {
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
    computeLabel: (e) => Jt[e.name],
    computeHelper: (e) => hr[e.name],
    assertConfig: ur
  };
}
function G(e) {
  return {
    selector: {
      entity: {
        filter: { domain: e }
      }
    }
  };
}
function j(e, t) {
  return {
    name: e,
    selector: {
      select: {
        mode: "dropdown",
        options: t.map((r) => ({ value: r, label: Jt[r] ?? pr(r) }))
      }
    }
  };
}
function pr(e) {
  return e.split("_").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
}
function ur(e) {
  if (H("discovery", e.discovery), H("layout", e.layout), H("display", e.display), H("graph", e.graph), H("controls", e.controls), e.excluded_breakers !== void 0 && !Array.isArray(e.excluded_breakers))
    throw new Error("excluded_breakers must be a list.");
  if (e.manual_breakers !== void 0 && !Array.isArray(e.manual_breakers))
    throw new Error("manual_breakers must be a list.");
  H("breaker_overrides", e.breaker_overrides);
}
function H(e, t) {
  if (t !== void 0 && (t === null || Array.isArray(t) || typeof t != "object"))
    throw new Error(`${e} must be an object.`);
}
function te(e, t) {
  const r = { ...e };
  if (!t) return r;
  for (const [s, i] of Object.entries(t))
    Array.isArray(i) ? r[s] = [...i] : i && typeof i == "object" && !Array.isArray(i) ? r[s] = te(r[s] ?? {}, i) : i !== void 0 && (r[s] = i);
  return r;
}
const gr = /* @__PURE__ */ new Set(["1h", "6h", "12h", "24h", "7d"]), mr = /* @__PURE__ */ new Set(["standard", "ultra_compact"]);
function Q(e) {
  const t = te(O, e ?? {});
  t.discovery.enabled = t.discovery.enabled !== !1, t.discovery.integration = t.discovery.integration || O.discovery.integration, t.discovery.include_new_breakers = t.discovery.include_new_breakers !== !1, mr.has(t.layout.mobile_view) || (t.layout.mobile_view = O.layout.mobile_view), t.display.show_title = t.display.show_title !== !1, gr.has(t.graph.period) || (t.graph.period = O.graph.period), t.graph.refresh_interval_seconds = Math.max(30, Number(t.graph.refresh_interval_seconds) || 300);
  const r = Number(t.controls.warning_load_threshold_watts);
  t.controls.warning_load_threshold_watts = Math.max(
    0,
    Number.isFinite(r) ? r : O.controls.warning_load_threshold_watts || 1e3
  );
  const s = Number(t.controls.high_load_threshold_watts);
  return t.controls.high_load_threshold_watts = Math.max(
    0,
    Number.isFinite(s) ? s : O.controls.high_load_threshold_watts || 2e3
  ), t.excluded_breakers = Array.isArray(t.excluded_breakers) ? [...new Set(t.excluded_breakers)] : [], t.breaker_overrides = t.breaker_overrides ?? {}, t.manual_breakers = Array.isArray(t.manual_breakers) ? t.manual_breakers : [], t;
}
function fr(e, t) {
  const r = e.breaker_overrides[t.id] ?? {};
  return {
    label: r.label || t.name,
    show_current_power: r.show_current_power ?? e.display.show_current_power,
    show_average_power: r.show_average_power ?? e.display.show_average_power,
    show_maximum_power: r.show_maximum_power ?? e.display.show_maximum_power,
    show_energy: r.show_energy ?? e.display.show_energy,
    show_sparkline: r.show_sparkline ?? e.display.show_sparkline,
    show_icon: r.show_icon ?? e.display.show_icon,
    show_state: e.display.show_state,
    show_controls: r.show_controls ?? e.display.show_controls,
    show_area: e.display.show_area,
    show_circuit_number: e.display.show_circuit_number,
    control_mode: r.control_mode ?? e.controls.default_mode
  };
}
const vr = k`
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
    grid-template-columns: repeat(auto-fit, minmax(var(--tile-min-width, 262px), 1fr));
    align-items: start;
    gap: var(--tile-gap, 12px);
  }

  :host([density="compact"]) .board-grid {
    --tile-min-width: 224px;
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
var br = Object.defineProperty, yr = Object.getOwnPropertyDescriptor, _ = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? yr(t, r) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, r, i) : a(i)) || i);
  return s && i && br(t, r, i), i;
};
let b = class extends x {
  constructor() {
    super(...arguments), this.config = O, this.breakers = [], this.loading = !0, this.error = "", this.stats = /* @__PURE__ */ new Map(), this.pendingSwitches = /* @__PURE__ */ new Set(), this.toggleErrors = /* @__PURE__ */ new Map(), this.stacked = !1, this.sortMenuOpen = !1, this.searchOpen = !1, this.searchQuery = "", this.optimisticSwitchStates = /* @__PURE__ */ new Map(), this.discovery = new Xt(), this.statistics = new lr(), this.discoveryKey = "", this.statsRefreshToken = 0, this.optimisticResetTimers = /* @__PURE__ */ new Map(), this.handleToggle = async (e) => {
      var a;
      if (e.stopPropagation(), !this.hass) return;
      const t = this.breakers.find((n) => n.id === e.detail.breakerId), r = t == null ? void 0 : t.entities.switch;
      if (!t || !r || this.pendingSwitches.has(t.id)) return;
      const i = (this.optimisticSwitchStates.get(t.id) ?? ((a = this.hass.states[r]) == null ? void 0 : a.state)) === "on" ? "off" : "on";
      this.setOptimisticSwitchState(t.id, i), this.pendingSwitches = /* @__PURE__ */ new Set([...this.pendingSwitches, t.id]), this.toggleErrors.delete(t.id);
      let o = !1;
      try {
        await this.hass.callService("switch", i === "off" ? "turn_off" : "turn_on", { entity_id: r }), o = !0;
      } catch {
        this.clearOptimisticSwitchState(t.id);
        const n = new Map(this.toggleErrors);
        n.set(t.id, "Failed to toggle"), this.toggleErrors = n;
      } finally {
        const n = new Set(this.pendingSwitches);
        if (n.delete(t.id), this.pendingSwitches = n, !o) return;
        const l = this.optimisticResetTimers.get(t.id);
        l !== void 0 && window.clearTimeout(l);
        const c = window.setTimeout(() => {
          this.clearOptimisticSwitchState(t.id);
        }, 15e3);
        this.optimisticResetTimers.set(t.id, c);
      }
    };
  }
  setConfig(e) {
    this.config = Q(e), this.runtimeSortBy = this.loadPersistedSort() ?? this.config.layout.sort_by, this.runtimeMobileView = this.loadPersistedMobileView() ?? this.config.layout.mobile_view, this.setAttribute("density", this.config.layout.density), this.setAttribute("mobile-view", this.effectiveMobileView()), this.discoveryKey = "";
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
    const e = Math.max(this.breakers.length, 6);
    return Math.ceil(e / 2) + (this.config.display.show_title && this.config.title ? 1 : 0);
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
    this.resizeObserver = new ResizeObserver(([e]) => {
      if (!e) {
        this.stacked = !1;
        return;
      }
      this.updateStackedLayout(e.contentRect.width);
    }), this.observeLayoutTarget();
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.resizeObserver) == null || e.disconnect();
    for (const t of this.optimisticResetTimers.values())
      window.clearTimeout(t);
    this.optimisticResetTimers.clear();
  }
  updated(e) {
    this.observeLayoutTarget(), (e.has("hass") || e.has("config")) && this.ensureDiscovered();
  }
  observeLayoutTarget() {
    if (!this.resizeObserver) return;
    const e = this.renderRoot.querySelector(".board-grid") ?? this.renderRoot.querySelector("ha-card") ?? this;
    e !== this.resizeTarget && (this.resizeTarget && this.resizeObserver.unobserve(this.resizeTarget), this.resizeTarget = e, this.resizeObserver.observe(e), this.updateStackedLayout(e.getBoundingClientRect().width));
  }
  updateStackedLayout(e) {
    !Number.isFinite(e) || e <= 0 || (this.stacked && e >= 560 && (this.stacked = !1), !this.stacked && e <= 520 && (this.stacked = !0));
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
              <button
                class=${this.searchOpen ? "chip-tool active" : "chip-tool"}
                type="button"
                @click=${() => this.searchOpen = !this.searchOpen}
              >
                <savant-icon icon="search" aria-hidden="true"></savant-icon>
                <span class="sr-only">Search</span>
              </button>
            </div>
            <div class="tool-wrap">
              <button class="chip-tool" type="button" @click=${() => this.sortMenuOpen = !this.sortMenuOpen}>
                <savant-icon icon="sort_amount_down" aria-hidden="true"></savant-icon>
                <span class="sr-only">Sort</span>
              </button>
              ${this.sortMenuOpen ? h`<div class="tool-popover">
                    ${jt.map(
      ({ value: e, label: t }) => h`
                        <button
                          class=${this.effectiveSortBy() === e ? "menu-option selected" : "menu-option"}
                          type="button"
                          @click=${() => this.setRuntimeSort(e)}
                        >
                          ${t}
                        </button>
                      `
    )}
                  </div>` : g}
            </div>
            ${this.stacked ? h`<button
                  class=${this.effectiveMobileView() === "ultra_compact" ? "chip-tool active" : "chip-tool"}
                  type="button"
                  @click=${() => this.toggleMobileView()}
                >
                  <savant-icon icon="minimize_2" aria-hidden="true"></savant-icon>
                  <span class="sr-only">Toggle ultra-compact mobile view</span>
                </button>` : g}
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
                  @input=${(e) => this.searchQuery = e.target.value}
                />
              </div>
            </div>` : g}
      </div>
    `;
  }
  renderBreakers() {
    const e = wr(this.visibleBreakers(), this.config);
    return h`
      <div
        class=${`board-grid ${this.stacked ? "stacked" : ""}`}
        @savant-breaker-toggle=${this.handleToggle}
      >
        ${e.map(
      ([t, r]) => h`
            ${t ? h`<h3 class="group-title">${t}</h3>` : g}
            ${r.map((s) => {
        const i = fr(this.config, s), o = s.entities.power, a = o ? this.stats.get(o) : void 0;
        return h`<savant-breaker-tile
                .hass=${this.hass}
                .breaker=${s}
                .display=${i}
                .statistics=${a}
                ?stacked=${this.stacked}
                .mobileLayout=${this.effectiveMobileView()}
                .optimisticSwitchState=${this.optimisticSwitchStates.get(s.id)}
                .graphLoading=${!!(o && !a)}
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
    const e = JSON.stringify({
      discovery: this.config.discovery,
      manual: this.config.manual_breakers
    });
    if (e === this.discoveryKey && this.breakers.length) {
      this.loadStatistics();
      return;
    }
    this.loading = !0, this.error = "";
    try {
      this.breakers = await this.discovery.discover(this.hass, this.config), this.discoveryKey = e, this.loading = !1, this.stats = /* @__PURE__ */ new Map(), this.loadStatistics();
    } catch (t) {
      this.error = t instanceof Error ? t.message : "Discovery failed", this.loading = !1;
    }
  }
  async loadStatistics() {
    if (!this.hass) return;
    const e = ++this.statsRefreshToken, t = [
      ...new Set(
        this.visibleBreakers().map((s) => s.entities.power).filter((s) => !!s)
      )
    ], r = await Promise.all(
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
    e === this.statsRefreshToken && (this.stats = new Map(r));
  }
  visibleBreakers() {
    const e = new Set(this.config.excluded_breakers), t = this.searchQuery.trim().toLowerCase(), r = this.breakers.filter((s) => e.has(s.id) ? !1 : t ? [s.name, s.areaName, s.panelName].filter(Boolean).some((i) => i.toLowerCase().includes(t)) : !0);
    return _r(
      r,
      this.config,
      this.hass,
      this.stats,
      this.effectiveSortBy()
    );
  }
  effectiveSortBy() {
    return this.runtimeSortBy ?? this.config.layout.sort_by;
  }
  effectiveMobileView() {
    return this.runtimeMobileView ?? this.config.layout.mobile_view;
  }
  setRuntimeSort(e) {
    var t;
    this.runtimeSortBy = e, this.sortMenuOpen = !1, (t = window.localStorage) == null || t.setItem(this.persistedSortKey(), e);
  }
  toggleMobileView() {
    var t;
    const e = this.effectiveMobileView() === "ultra_compact" ? "standard" : "ultra_compact";
    this.runtimeMobileView = e, this.setAttribute("mobile-view", e), (t = window.localStorage) == null || t.setItem(this.persistedMobileViewKey(), e);
  }
  loadPersistedSort() {
    var t;
    const e = (t = window.localStorage) == null ? void 0 : t.getItem(this.persistedSortKey());
    return jt.some((r) => r.value === e) ? e ?? void 0 : void 0;
  }
  loadPersistedMobileView() {
    var t;
    const e = (t = window.localStorage) == null ? void 0 : t.getItem(this.persistedMobileViewKey());
    return e === "standard" || e === "ultra_compact" ? e : void 0;
  }
  persistedSortKey() {
    return `savant-breaker-board-sort:${this.config.title ?? "default"}`;
  }
  persistedMobileViewKey() {
    return `savant-breaker-board-mobile-view:${this.config.title ?? "default"}`;
  }
  setOptimisticSwitchState(e, t) {
    const r = this.optimisticResetTimers.get(e);
    r !== void 0 && (window.clearTimeout(r), this.optimisticResetTimers.delete(e)), this.optimisticSwitchStates = new Map(this.optimisticSwitchStates), this.optimisticSwitchStates.set(e, t);
  }
  clearOptimisticSwitchState(e) {
    const t = this.optimisticResetTimers.get(e);
    if (t !== void 0 && (window.clearTimeout(t), this.optimisticResetTimers.delete(e)), !this.optimisticSwitchStates.has(e)) return;
    const r = new Map(this.optimisticSwitchStates);
    r.delete(e), this.optimisticSwitchStates = r;
  }
};
b.styles = [
  vr,
  k`
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
        border: 1px solid color-mix(in srgb, var(--primary-text-color) 56%, var(--divider-color));
        border-radius: var(--savant-radius);
        color: var(--primary-text-color);
        background:
          linear-gradient(
            145deg,
            color-mix(in srgb, var(--savant-tile-bg) 86%, white),
            var(--savant-tile-bg)
          );
        box-shadow:
          inset 0 0 0 1px rgb(255 255 255 / 0.08),
          0 0 0 1px rgb(0 0 0 / 0.25),
          0 2px 4px rgb(0 0 0 / 0.28);
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
        border-color: color-mix(in srgb, var(--primary-text-color) 72%, white);
        box-shadow:
          inset 0 0 0 1px rgb(255 255 255 / 0.12),
          0 0 0 1px color-mix(in srgb, var(--primary-text-color) 28%, transparent),
          0 3px 6px rgb(0 0 0 / 0.34);
      }

      .chip-tool.active {
        border-color: color-mix(in srgb, var(--primary-color) 82%, var(--primary-text-color));
        box-shadow:
          inset 0 0 0 1px rgb(255 255 255 / 0.1),
          0 0 0 1px color-mix(in srgb, var(--primary-color) 42%, transparent),
          0 3px 6px rgb(0 0 0 / 0.34);
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
_([
  u({ attribute: !1 })
], b.prototype, "hass", 2);
_([
  f()
], b.prototype, "config", 2);
_([
  f()
], b.prototype, "breakers", 2);
_([
  f()
], b.prototype, "loading", 2);
_([
  f()
], b.prototype, "error", 2);
_([
  f()
], b.prototype, "stats", 2);
_([
  f()
], b.prototype, "pendingSwitches", 2);
_([
  f()
], b.prototype, "toggleErrors", 2);
_([
  f()
], b.prototype, "stacked", 2);
_([
  f()
], b.prototype, "sortMenuOpen", 2);
_([
  f()
], b.prototype, "searchOpen", 2);
_([
  f()
], b.prototype, "searchQuery", 2);
_([
  f()
], b.prototype, "runtimeSortBy", 2);
_([
  f()
], b.prototype, "runtimeMobileView", 2);
_([
  f()
], b.prototype, "optimisticSwitchStates", 2);
b = _([
  E("savant-energy-breaker-board-card")
], b);
const jt = [
  { value: "circuit_number", label: "Circuit number" },
  { value: "name", label: "Name" },
  { value: "current_power_descending", label: "Current power" },
  { value: "highest_usage", label: "Highest usage" },
  { value: "manual", label: "Manual" }
];
function _r(e, t, r, s = /* @__PURE__ */ new Map(), i = t.layout.sort_by) {
  return [...e].sort((o, a) => {
    var n, l;
    if (i === "name") return o.name.localeCompare(a.name);
    if (i === "current_power_descending") {
      const c = V(o.entities.power ? (n = r == null ? void 0 : r.states[o.entities.power]) == null ? void 0 : n.state : void 0) ?? -1 / 0;
      return (V(a.entities.power ? (l = r == null ? void 0 : r.states[a.entities.power]) == null ? void 0 : l.state : void 0) ?? -1 / 0) - c;
    }
    if (i === "highest_usage") {
      const c = Ht(o, s, r);
      return Ht(a, s, r) - c || o.name.localeCompare(a.name);
    }
    return i === "manual" ? 0 : (o.circuitNumber ?? 9999) - (a.circuitNumber ?? 9999) || o.name.localeCompare(a.name);
  });
}
function Ht(e, t, r) {
  var i, o;
  const s = e.entities.power;
  return s ? ((i = t.get(s)) == null ? void 0 : i.averageWatts) ?? V((o = r == null ? void 0 : r.states[s]) == null ? void 0 : o.state) ?? -1 / 0 : -1 / 0;
}
function wr(e, t) {
  if (t.layout.group_by === "none") return [["", e]];
  const r = /* @__PURE__ */ new Map();
  for (const s of e) {
    const i = t.layout.group_by === "panel_then_area" ? [s.panelName, s.areaName].filter(Boolean).join(" / ") || "Other" : t.layout.group_by === "area" ? s.areaName || "Other" : s.panelName || "Other";
    r.set(i, [...r.get(i) ?? [], s]);
  }
  return [...r.entries()];
}
function ee(e, t) {
  if (Array.isArray(e))
    return e.length ? e : void 0;
  if (e && typeof e == "object") {
    const r = {};
    for (const [s, i] of Object.entries(e)) {
      const o = ee(i, t == null ? void 0 : t[s]);
      o !== void 0 && (r[s] = o);
    }
    return Object.keys(r).length ? r : void 0;
  }
  return e === t ? void 0 : e;
}
function re(e) {
  const t = Q(e);
  return {
    type: "custom:savant-energy-breaker-board-card",
    ...ee(t, O) ?? {}
  };
}
function xr(e, t) {
  const r = structuredClone(e);
  return delete r.breaker_overrides[t], re(r);
}
var $r = Object.defineProperty, kr = Object.getOwnPropertyDescriptor, T = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? kr(t, r) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (s ? a(t, r, i) : a(i)) || i);
  return s && i && $r(t, r, i), i;
};
let A = class extends x {
  constructor() {
    super(...arguments), this.config = O, this.breakers = [], this.filter = "", this.loading = !1, this.discoveryError = "", this.expandedBreakers = /* @__PURE__ */ new Set(), this.discoveryLoaded = !1, this.discovery = new Xt();
  }
  setConfig(e) {
    this.config = Q(e), this.loadBreakers();
  }
  updated(e) {
    e.has("hass") && this.loadBreakers();
  }
  render() {
    const e = this.breakers.filter(
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
      ([t, r]) => this.switch(
        r,
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
          ${!this.loading && !e.length ? h`<div class="loading">${this.discoveryLoaded ? "No discovered breakers found." : "Discovery will run once when Home Assistant is ready."}</div>` : g}
          ${e.map((t) => this.renderBreakerEditor(t))}
        </section>
      </div>
    `;
  }
  renderBreakerEditor(e) {
    var a, n;
    const t = this.config.excluded_breakers.includes(e.id), r = this.config.breaker_overrides[e.id] ?? {}, s = this.expandedBreakers.has(e.id), i = e.entities.power ? V((n = (a = this.hass) == null ? void 0 : a.states[e.entities.power]) == null ? void 0 : n.state) : void 0, o = Object.entries(e.entities).filter(([, l]) => l).map(([l, c]) => `${l}: ${c}`).join(", ");
    return h`
      <article class=${t ? "breaker excluded" : "breaker"}>
        <div class="breaker-head" @click=${() => this.toggleExpanded(e.id)}>
          <div>
            <strong>${r.label || e.name}</strong>
          </div>
          <span class="breaker-actions">
            ${this.switch("Shown", !t, (l) => this.setExcluded(e.id, !l))}
            <span class="chevron">${s ? "Collapse" : "Expand"}</span>
          </span>
        </div>
        ${s ? h`
              <div class="breaker-details">
                <span>${it(i)} - ${e.available ? "available" : "unavailable"}</span>
                <small>${o || "No associated entities"}</small>
              </div>
              ${this.textInput(
      "Custom label",
      r.label ?? "",
      (l) => this.setOverride(e.id, { ...r, label: l || void 0 })
    )}
              <div class="override-grid">
                ${["show_current_power", "show_average_power", "show_maximum_power", "show_energy", "show_sparkline", "show_icon", "show_controls"].map(
      (l) => this.tristate(
        l.replaceAll("_", " "),
        r[l],
        (c) => this.setOverride(e.id, { ...r, [l]: c })
      )
    )}
              </div>
              ${this.select(
      "Control mode",
      r.control_mode ?? "default",
      ["default", "hidden", "hold", "hold_confirm_off"],
      (l) => this.setOverride(e.id, {
        ...r,
        control_mode: l === "default" ? void 0 : l
      })
    )}
              <button class="reset" @click=${() => this.resetOverride(e.id)}>Reset to defaults</button>
            ` : g}
      </article>
    `;
  }
  async loadBreakers(e = !1) {
    if (!(!this.hass || !e && (this.discoveryLoaded || this.loading))) {
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
  patch(e) {
    this.config = Q({ ...this.config, ...e }), nt(this, "config-changed", { config: re(this.config) });
  }
  setExcluded(e, t) {
    const r = new Set(this.config.excluded_breakers);
    t ? r.add(e) : r.delete(e), this.patch({ excluded_breakers: [...r] });
  }
  setOverride(e, t) {
    const r = Object.fromEntries(Object.entries(t).filter(([, s]) => s !== void 0 && s !== ""));
    this.patch({ breaker_overrides: { ...this.config.breaker_overrides, [e]: r } });
  }
  resetOverride(e) {
    const t = xr(this.config, e);
    this.config = Q(t), nt(this, "config-changed", { config: t });
  }
  toggleExpanded(e) {
    const t = new Set(this.expandedBreakers);
    t.has(e) ? t.delete(e) : t.add(e), this.expandedBreakers = t;
  }
  textInput(e, t, r, s = !0) {
    return h`<label><span>${e}</span><input .value=${t} @input=${(i) => r(i.target.value)} @change=${s ? (i) => r(i.target.value) : void 0} /></label>`;
  }
  checkbox(e, t, r) {
    return h`<label class="check"><input type="checkbox" .checked=${t} @change=${(s) => r(s.target.checked)} /> <span>${e}</span></label>`;
  }
  switch(e, t, r) {
    return h`
      <label class="switch" @click=${(s) => s.stopPropagation()}>
        <input type="checkbox" .checked=${t} @change=${(s) => r(s.target.checked)} />
        <span class="switch-track" aria-hidden="true"></span>
        <span>${e}</span>
      </label>
    `;
  }
  select(e, t, r, s) {
    return h`<label><span>${e}</span><select .value=${t} @change=${(i) => s(i.target.value)}>${r.map((i) => h`<option value=${i}>${i}</option>`)}</select></label>`;
  }
  numberInput(e, t, r) {
    return h`<label><span>${e}</span><input type="number" min="0" step="100" .value=${String(t)} @change=${(s) => r(Number(s.target.value) || 0)} /></label>`;
  }
  tristate(e, t, r) {
    const s = t === void 0 ? "default" : String(t);
    return this.select(
      e,
      s,
      ["default", "true", "false"],
      (i) => r(i === "default" ? void 0 : i === "true")
    );
  }
};
A.styles = k`
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
T([
  u({ attribute: !1 })
], A.prototype, "hass", 2);
T([
  f()
], A.prototype, "config", 2);
T([
  f()
], A.prototype, "breakers", 2);
T([
  f()
], A.prototype, "filter", 2);
T([
  f()
], A.prototype, "loading", 2);
T([
  f()
], A.prototype, "discoveryError", 2);
T([
  f()
], A.prototype, "expandedBreakers", 2);
A = T([
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
