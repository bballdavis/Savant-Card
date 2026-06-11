/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce = globalThis, ke = ce.ShadowRoot && (ce.ShadyCSS === void 0 || ce.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Se = Symbol(), Me = /* @__PURE__ */ new WeakMap();
let qe = class {
  constructor(e, s, r) {
    if (this._$cssResult$ = !0, r !== Se) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = s;
  }
  get styleSheet() {
    let e = this.o;
    const s = this.t;
    if (ke && e === void 0) {
      const r = s !== void 0 && s.length === 1;
      r && (e = Me.get(s)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Me.set(s, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ut = (t) => new qe(typeof t == "string" ? t : t + "", void 0, Se), S = (t, ...e) => {
  const s = t.length === 1 ? t[0] : e.reduce((r, i, a) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[a + 1], t[0]);
  return new qe(s, t, Se);
}, gt = (t, e) => {
  if (ke) t.adoptedStyleSheets = e.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of e) {
    const r = document.createElement("style"), i = ce.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = s.cssText, t.appendChild(r);
  }
}, Ce = ke ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let s = "";
  for (const r of e.cssRules) s += r.cssText;
  return ut(s);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: vt, defineProperty: ft, getOwnPropertyDescriptor: mt, getOwnPropertyNames: bt, getOwnPropertySymbols: yt, getPrototypeOf: wt } = Object, B = globalThis, Ne = B.trustedTypes, xt = Ne ? Ne.emptyScript : "", ye = B.reactiveElementPolyfillSupport, J = (t, e) => t, de = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? xt : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let s = t;
  switch (e) {
    case Boolean:
      s = t !== null;
      break;
    case Number:
      s = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(t);
      } catch {
        s = null;
      }
  }
  return s;
} }, Ae = (t, e) => !vt(t, e), Le = { attribute: !0, type: String, converter: de, reflect: !1, useDefault: !1, hasChanged: Ae };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), B.litPropertyMetadata ?? (B.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let V = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, s = Le) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(e, s), !s.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, s);
      i !== void 0 && ft(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, s, r) {
    const { get: i, set: a } = mt(this.prototype, e) ?? { get() {
      return this[s];
    }, set(o) {
      this[s] = o;
    } };
    return { get: i, set(o) {
      const n = i == null ? void 0 : i.call(this);
      a == null || a.call(this, o), this.requestUpdate(e, n, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Le;
  }
  static _$Ei() {
    if (this.hasOwnProperty(J("elementProperties"))) return;
    const e = wt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(J("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(J("properties"))) {
      const s = this.properties, r = [...bt(s), ...yt(s)];
      for (const i of r) this.createProperty(i, s[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const s = litPropertyMetadata.get(e);
      if (s !== void 0) for (const [r, i] of s) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, r] of this.elementProperties) {
      const i = this._$Eu(s, r);
      i !== void 0 && this._$Eh.set(i, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const s = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) s.unshift(Ce(i));
    } else e !== void 0 && s.push(Ce(e));
    return s;
  }
  static _$Eu(e, s) {
    const r = s.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((s) => s(this));
  }
  addController(e) {
    var s;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((s = e.hostConnected) == null || s.call(e));
  }
  removeController(e) {
    var s;
    (s = this._$EO) == null || s.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const r of s.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return gt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((s) => {
      var r;
      return (r = s.hostConnected) == null ? void 0 : r.call(s);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var r;
      return (r = s.hostDisconnected) == null ? void 0 : r.call(s);
    });
  }
  attributeChangedCallback(e, s, r) {
    this._$AK(e, r);
  }
  _$ET(e, s) {
    var a;
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const o = (((a = r.converter) == null ? void 0 : a.toAttribute) !== void 0 ? r.converter : de).toAttribute(s, r.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, s) {
    var a, o;
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const n = r.getPropertyOptions(i), l = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((a = n.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? n.converter : de;
      this._$Em = i;
      const c = l.fromAttribute(s, n.type);
      this[i] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, s, r, i = !1, a) {
    var o;
    if (e !== void 0) {
      const n = this.constructor;
      if (i === !1 && (a = this[e]), r ?? (r = n.getPropertyOptions(e)), !((r.hasChanged ?? Ae)(a, s) || r.useDefault && r.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(n._$Eu(e, r)))) return;
      this.C(e, s, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, s, { useDefault: r, reflect: i, wrapped: a }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? s ?? this[e]), a !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (s = void 0), this._$AL.set(e, s)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
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
    let e = !1;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), (r = this._$EO) == null || r.forEach((i) => {
        var a;
        return (a = i.hostUpdate) == null ? void 0 : a.call(i);
      }), this.update(s)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(s);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var s;
    (s = this._$EO) == null || s.forEach((r) => {
      var i;
      return (i = r.hostUpdated) == null ? void 0 : i.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((s) => this._$ET(s, this[s]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
V.elementStyles = [], V.shadowRootOptions = { mode: "open" }, V[J("elementProperties")] = /* @__PURE__ */ new Map(), V[J("finalized")] = /* @__PURE__ */ new Map(), ye == null || ye({ ReactiveElement: V }), (B.reactiveElementVersions ?? (B.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ee = globalThis, Be = (t) => t, pe = ee.trustedTypes, Te = pe ? pe.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ze = "$lit$", L = `lit$${Math.random().toFixed(9).slice(2)}$`, Ge = "?" + L, _t = `<${Ge}>`, I = document, re = () => I.createComment(""), ie = (t) => t === null || typeof t != "object" && typeof t != "function", Oe = Array.isArray, $t = (t) => Oe(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", we = `[ 	
\f\r]`, Q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, De = /-->/g, He = />/g, z = RegExp(`>|${we}(?:([^\\s"'>=/]+)(${we}*=${we}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ze = /'/g, je = /"/g, Ye = /^(?:script|style|textarea|title)$/i, Qe = (t) => (e, ...s) => ({ _$litType$: t, strings: e, values: s }), h = Qe(1), te = Qe(2), K = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), Re = /* @__PURE__ */ new WeakMap(), j = I.createTreeWalker(I, 129);
function Xe(t, e) {
  if (!Oe(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Te !== void 0 ? Te.createHTML(e) : e;
}
const kt = (t, e) => {
  const s = t.length - 1, r = [];
  let i, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = Q;
  for (let n = 0; n < s; n++) {
    const l = t[n];
    let c, u, d = -1, m = 0;
    for (; m < l.length && (o.lastIndex = m, u = o.exec(l), u !== null); ) m = o.lastIndex, o === Q ? u[1] === "!--" ? o = De : u[1] !== void 0 ? o = He : u[2] !== void 0 ? (Ye.test(u[2]) && (i = RegExp("</" + u[2], "g")), o = z) : u[3] !== void 0 && (o = z) : o === z ? u[0] === ">" ? (o = i ?? Q, d = -1) : u[1] === void 0 ? d = -2 : (d = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? z : u[3] === '"' ? je : ze) : o === je || o === ze ? o = z : o === De || o === He ? o = Q : (o = z, i = void 0);
    const f = o === z && t[n + 1].startsWith("/>") ? " " : "";
    a += o === Q ? l + _t : d >= 0 ? (r.push(c), l.slice(0, d) + Ze + l.slice(d) + L + f) : l + L + (d === -2 ? n : f);
  }
  return [Xe(t, a + (t[s] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class ae {
  constructor({ strings: e, _$litType$: s }, r) {
    let i;
    this.parts = [];
    let a = 0, o = 0;
    const n = e.length - 1, l = this.parts, [c, u] = kt(e, s);
    if (this.el = ae.createElement(c, r), j.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = j.nextNode()) !== null && l.length < n; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(Ze)) {
          const m = u[o++], f = i.getAttribute(d).split(L), w = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: a, name: w[2], strings: f, ctor: w[1] === "." ? At : w[1] === "?" ? Ot : w[1] === "@" ? Et : me }), i.removeAttribute(d);
        } else d.startsWith(L) && (l.push({ type: 6, index: a }), i.removeAttribute(d));
        if (Ye.test(i.tagName)) {
          const d = i.textContent.split(L), m = d.length - 1;
          if (m > 0) {
            i.textContent = pe ? pe.emptyScript : "";
            for (let f = 0; f < m; f++) i.append(d[f], re()), j.nextNode(), l.push({ type: 2, index: ++a });
            i.append(d[m], re());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ge) l.push({ type: 2, index: a });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(L, d + 1)) !== -1; ) l.push({ type: 7, index: a }), d += L.length - 1;
      }
      a++;
    }
  }
  static createElement(e, s) {
    const r = I.createElement("template");
    return r.innerHTML = e, r;
  }
}
function q(t, e, s = t, r) {
  var o, n;
  if (e === K) return e;
  let i = r !== void 0 ? (o = s._$Co) == null ? void 0 : o[r] : s._$Cl;
  const a = ie(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== a && ((n = i == null ? void 0 : i._$AO) == null || n.call(i, !1), a === void 0 ? i = void 0 : (i = new a(t), i._$AT(t, s, r)), r !== void 0 ? (s._$Co ?? (s._$Co = []))[r] = i : s._$Cl = i), i !== void 0 && (e = q(t, i._$AS(t, e.values), i, r)), e;
}
class St {
  constructor(e, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: s }, parts: r } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? I).importNode(s, !0);
    j.currentNode = i;
    let a = j.nextNode(), o = 0, n = 0, l = r[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new le(a, a.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(a, l.name, l.strings, this, e) : l.type === 6 && (c = new Pt(a, this, e)), this._$AV.push(c), l = r[++n];
      }
      o !== (l == null ? void 0 : l.index) && (a = j.nextNode(), o++);
    }
    return j.currentNode = I, i;
  }
  p(e) {
    let s = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, s), s += r.strings.length - 2) : r._$AI(e[s])), s++;
  }
}
class le {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, s, r, i) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = e, this._$AB = s, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = s.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, s = this) {
    e = q(this, e, s), ie(e) ? e === v || e == null || e === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : e !== this._$AH && e !== K && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : $t(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== v && ie(this._$AH) ? this._$AA.nextSibling.data = e : this.T(I.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: s, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = ae.createElement(Xe(r.h, r.h[0]), this.options)), r);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === i) this._$AH.p(s);
    else {
      const o = new St(i, this), n = o.u(this.options);
      o.p(s), this.T(n), this._$AH = o;
    }
  }
  _$AC(e) {
    let s = Re.get(e.strings);
    return s === void 0 && Re.set(e.strings, s = new ae(e)), s;
  }
  k(e) {
    Oe(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let r, i = 0;
    for (const a of e) i === s.length ? s.push(r = new le(this.O(re()), this.O(re()), this, this.options)) : r = s[i], r._$AI(a), i++;
    i < s.length && (this._$AR(r && r._$AB.nextSibling, i), s.length = i);
  }
  _$AR(e = this._$AA.nextSibling, s) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, s); e !== this._$AB; ) {
      const i = Be(e).nextSibling;
      Be(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var s;
    this._$AM === void 0 && (this._$Cv = e, (s = this._$AP) == null || s.call(this, e));
  }
}
class me {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, s, r, i, a) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = e, this.name = s, this._$AM = i, this.options = a, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = v;
  }
  _$AI(e, s = this, r, i) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) e = q(this, e, s, 0), o = !ie(e) || e !== this._$AH && e !== K, o && (this._$AH = e);
    else {
      const n = e;
      let l, c;
      for (e = a[0], l = 0; l < a.length - 1; l++) c = q(this, n[r + l], s, l), c === K && (c = this._$AH[l]), o || (o = !ie(c) || c !== this._$AH[l]), c === v ? e = v : e !== v && (e += (c ?? "") + a[l + 1]), this._$AH[l] = c;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class At extends me {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === v ? void 0 : e;
  }
}
class Ot extends me {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== v);
  }
}
class Et extends me {
  constructor(e, s, r, i, a) {
    super(e, s, r, i, a), this.type = 5;
  }
  _$AI(e, s = this) {
    if ((e = q(this, e, s, 0) ?? v) === K) return;
    const r = this._$AH, i = e === v && r !== v || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, a = e !== v && (r === v || i);
    i && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Pt {
  constructor(e, s, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    q(this, e);
  }
}
const xe = ee.litHtmlPolyfillSupport;
xe == null || xe(ae, le), (ee.litHtmlVersions ?? (ee.litHtmlVersions = [])).push("3.3.3");
const Mt = (t, e, s) => {
  const r = (s == null ? void 0 : s.renderBefore) ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const a = (s == null ? void 0 : s.renderBefore) ?? null;
    r._$litPart$ = i = new le(e.insertBefore(re(), a), a, void 0, s ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis;
class _ extends V {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var s;
    const e = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = e.firstChild), e;
  }
  update(e) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Mt(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return K;
  }
}
var Ke;
_._$litElement$ = !0, _.finalized = !0, (Ke = R.litElementHydrateSupport) == null || Ke.call(R, { LitElement: _ });
const _e = R.litElementPolyfillSupport;
_e == null || _e({ LitElement: _ });
(R.litElementVersions ?? (R.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = (t) => (e, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = { attribute: !0, type: String, converter: de, reflect: !1, hasChanged: Ae }, Nt = (t = Ct, e, s) => {
  const { kind: r, metadata: i } = s;
  let a = globalThis.litPropertyMetadata.get(i);
  if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(s.name, t), r === "accessor") {
    const { name: o } = s;
    return { set(n) {
      const l = e.get.call(this);
      e.set.call(this, n), this.requestUpdate(o, l, t, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(o, void 0, t, n), n;
    } };
  }
  if (r === "setter") {
    const { name: o } = s;
    return function(n) {
      const l = this[o];
      e.call(this, n), this.requestUpdate(o, l, t, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function p(t) {
  return (e, s) => typeof s == "object" ? Nt(t, e, s) : ((r, i, a) => {
    const o = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, r), o ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(t, e, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function g(t) {
  return p({ ...t, state: !0, attribute: !1 });
}
var Lt = Object.defineProperty, Bt = Object.getOwnPropertyDescriptor, Ee = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Bt(e, s) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && Lt(e, s, i), i;
};
let oe = class extends _ {
  constructor() {
    super(...arguments), this.points = [], this.state = "normal";
  }
  render() {
    const t = Tt(this.points), e = t ?? Dt(), s = !t;
    return te`
      <svg
        data-no-history=${s ? "true" : "false"}
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
        ${s ? "" : te`
              ${e.fillPath ? te`<path class="fill-base" d=${e.fillPath}></path>` : ""}
            `}
        <path class="line" d=${e.path}></path>
      </svg>
    `;
  }
};
oe.styles = S`
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
Ee([
  p({ attribute: !1 })
], oe.prototype, "points", 2);
Ee([
  p({ type: String, reflect: !0 })
], oe.prototype, "state", 2);
oe = Ee([
  O("savant-sparkline")
], oe);
function Tt(t) {
  const e = t.map((a) => a.value).filter(Number.isFinite);
  if (!e.length) return;
  if (e.every((a) => Math.max(0, a) === 0)) return Ht(e.length);
  if (e.length === 1) {
    const a = Ie(e[0], We(e)), o = Math.max(0, e[0]);
    return {
      path: `M 0 ${a} L 100 ${a}`,
      fillPath: o > 0 ? `M 0 ${a} L 100 ${a} L 100 36 L 0 36 Z` : ""
    };
  }
  const s = We(e), r = e.map((a, o) => {
    const n = o / (e.length - 1) * 100, l = Math.max(0, a);
    return [n, l === 0 ? T : Ie(a, s), l];
  });
  return {
    path: jt(r),
    fillPath: Rt(r)
  };
}
function Ie(t, e) {
  return T - Math.max(0, t) / e * (T - zt);
}
function We(t) {
  return Math.max(1, ...t) * 1.25;
}
function Dt() {
  return {
    path: `M 0 ${T} L 100 ${T}`,
    fillPath: ""
  };
}
function Ht(t) {
  return t <= 1 ? {
    path: `M 0 ${T} L 100 ${T}`,
    fillPath: ""
  } : { path: Array.from({ length: t }, (s, r) => {
    const i = r / (t - 1) * 100;
    return `${r === 0 ? "M" : "L"} ${i.toFixed(2)} ${T.toFixed(2)}`;
  }).join(" "), fillPath: "" };
}
const zt = 5, T = 33;
function jt(t) {
  if (t.every(([, , s]) => s === 0))
    return t.map(([s, r], i) => `${i === 0 ? "M" : "L"} ${s.toFixed(2)} ${r.toFixed(2)}`).join(" ");
  const e = [];
  for (let s = 1; s < t.length; s += 1) {
    const r = t[s - 1], i = t[s];
    e.push(`M ${r[0].toFixed(2)} ${r[1].toFixed(2)} L ${i[0].toFixed(2)} ${i[1].toFixed(2)}`);
  }
  return e.join(" ");
}
function Rt(t) {
  const e = [];
  for (let s = 1; s < t.length; s += 1) {
    const r = t[s - 1], i = t[s];
    r[2] === 0 && i[2] === 0 || e.push(
      [
        `M ${r[0].toFixed(2)} ${r[1].toFixed(2)}`,
        `L ${i[0].toFixed(2)} ${i[1].toFixed(2)}`,
        `L ${i[0].toFixed(2)} 36`,
        `L ${r[0].toFixed(2)} 36`,
        "Z"
      ].join(" ")
    );
  }
  return e.join(" ");
}
var It = Object.defineProperty, Wt = Object.getOwnPropertyDescriptor, be = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Wt(e, s) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && It(e, s, i), i;
};
let Z = class extends _ {
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
Z.styles = S`
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
be([
  p({ type: String })
], Z.prototype, "avg", 2);
be([
  p({ type: String })
], Z.prototype, "max", 2);
be([
  p({ type: Boolean, reflect: !0 })
], Z.prototype, "stacked", 2);
Z = be([
  O("savant-metric-row")
], Z);
function ne(t, e, s) {
  t.dispatchEvent(
    new CustomEvent(e, {
      detail: s,
      bubbles: !0,
      composed: !0
    })
  );
}
var Ft = Object.defineProperty, Ut = Object.getOwnPropertyDescriptor, Je = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ut(e, s) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && Ft(e, s, i), i;
};
const Fe = {
  flash: "M7,2V13H10V22L17,10H13L17,2H7Z",
  power: "M13,3H11V13H13V3M17.83,5.17L16.41,6.59C17.99,7.86 19,9.81 19,12A7,7 0 0,1 12,19A7,7 0 0,1 5,12C5,9.81 6.01,7.86 7.59,6.59L6.17,5.17C4.23,6.82 3,9.26 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12C21,9.26 19.77,6.82 17.83,5.17Z",
  search: "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20 15.5 14Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z",
  sort_amount_down: "M3 7h10v2H3V7m0 4h7v2H3v-2m0 4h4v2H3v-2m14-7 4 4h-3v6h-2v-6h-3l4-4Z",
  minimize_2: "",
  layout_dashboard: "M4 3h7v7H4V3m0 11h7v7H4v-7m9-11h7v7h-7V3m0 11h7v7h-7v-7Z"
};
let ue = class extends _ {
  constructor() {
    super(...arguments), this.icon = "flash";
  }
  render() {
    return this.icon === "minimize_2" ? te`
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 10h-4v-4" />
          <path d="M20 4l-6 6" />
          <path d="M6 14h4v4" />
          <path d="M10 14l-6 6" />
        </svg>
      ` : h`
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        ${te`<path d=${Fe[this.icon] ?? Fe.flash}></path>`}
      </svg>
    `;
  }
};
ue.styles = S`
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
Je([
  p({ type: String })
], ue.prototype, "icon", 2);
ue = Je([
  O("savant-icon")
], ue);
var Vt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, N = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Kt(e, s) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && Vt(e, s, i), i;
};
let E = class extends _ {
  constructor() {
    super(...arguments), this.breakerId = "", this.label = "breaker", this.switchState = "off", this.mode = "hold_confirm_off", this.disabled = !1, this.pending = !1, this.holding = !1, this.progress = 0, this.startedAt = 0, this.holdMs = 900, this.cancelHold = () => {
      window.clearTimeout(this.timer), this.holding = !1, this.progress = 0;
    };
  }
  render() {
    const t = this.disabled ? `${this.label} breaker unavailable` : `Hold to ${this.switchState === "on" ? "turn off" : "turn on"} ${this.label} breaker`;
    return h`
      <button
        aria-label=${t}
        title=${t}
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
  preventClick(t) {
    t.stopPropagation(), t.preventDefault();
  }
  onPointerDown(t) {
    t.stopPropagation(), !(this.disabled || this.pending) && (this.holding = !0, this.startedAt = performance.now(), this.tick());
  }
  onPointerUp(t) {
    t.stopPropagation(), this.holding && (performance.now() - this.startedAt >= this.holdMs && this.requestToggle(), this.cancelHold());
  }
  tick() {
    const t = performance.now() - this.startedAt;
    this.progress = Math.min(1, t / this.holdMs), !(this.progress >= 1) && (this.timer = window.setTimeout(() => this.tick(), 16));
  }
  requestToggle() {
    ne(this, "savant-breaker-toggle", { breakerId: this.breakerId });
  }
};
E.styles = S`
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
N([
  p({ type: String })
], E.prototype, "breakerId", 2);
N([
  p({ type: String })
], E.prototype, "label", 2);
N([
  p({ type: String })
], E.prototype, "switchState", 2);
N([
  p({ type: String })
], E.prototype, "mode", 2);
N([
  p({ type: Boolean })
], E.prototype, "disabled", 2);
N([
  p({ type: Boolean })
], E.prototype, "pending", 2);
N([
  g()
], E.prototype, "holding", 2);
N([
  g()
], E.prototype, "progress", 2);
E = N([
  O("savant-hold-control-button")
], E);
function G(t) {
  const e = typeof t == "number" ? t : Number(t);
  return Number.isFinite(e) ? e : void 0;
}
function he(t) {
  if (t === void 0 || !Number.isFinite(t)) return "--";
  const e = Math.abs(t);
  return e >= 1e3 ? `${qt(t / 1e3, e >= 1e4 ? 1 : 2)} kW` : `${Math.round(t)} W`;
}
function qt(t, e) {
  return t.toLocaleString(void 0, {
    maximumFractionDigits: e,
    minimumFractionDigits: 0
  });
}
function Zt(t, e = "kWh") {
  return t === void 0 || !Number.isFinite(t) ? "--" : `${t.toLocaleString(void 0, { maximumFractionDigits: 2 })} ${e}`;
}
var Gt = Object.defineProperty, Yt = Object.getOwnPropertyDescriptor, A = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Yt(e, s) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && Gt(e, s, i), i;
};
let k = class extends _ {
  constructor() {
    super(...arguments), this.highLoadThresholdWatts = 2e3, this.warningLoadThresholdWatts = 1e3, this.graphLoading = !1, this.pending = !1, this.stacked = !1, this.mobileLayout = "standard", this.error = "";
  }
  render() {
    var c, u, d, m, f, w, Y;
    const t = this.runtimeState(), e = this.visualState(t.powerWatts, t.switchState, t.available), s = this.loadState(t.powerWatts), r = this.stacked && this.mobileLayout === "ultra_compact", i = this.display.show_area ? this.breaker.areaName : void 0, a = e === "off" ? Xt((c = this.statistics) == null ? void 0 : c.points.length) : ((u = this.statistics) == null ? void 0 : u.points) ?? [], o = !!((d = this.statistics) != null && d.points.length), n = !r && o && (((m = this.statistics) == null ? void 0 : m.averageWatts) !== void 0 || ((f = this.statistics) == null ? void 0 : f.maximumWatts) !== void 0), l = this.display.show_controls && this.display.control_mode !== "hidden" && this.breaker.controllable && !!this.breaker.entities.switch;
    return h`
      <button class=${`tile ${e} ${this.pending ? "pending" : ""} ${r ? "ultra-compact" : ""}`} @click=${this.openMoreInfo}>
        <span class="mobile-bar" aria-hidden="true"></span>
        <span class="topline">
          <span class="state-dot" aria-hidden="true"></span>
          ${this.display.show_state ? h`<span class="state-text">${Qt(e, t.switchState)}</span>` : ""}
          ${this.display.show_icon ? this.renderEntityIcon() : ""}
        </span>
        <span class="name">${this.display.label}</span>
        ${i && !r ? h`<span class="subtitle">${i}</span>` : ""}
        <span class="power">${this.display.show_current_power ? he(t.powerWatts) : ""}</span>
        <span class="graph">
          ${this.graphLoading && e !== "off" ? this.renderGraphSkeleton() : this.display.show_sparkline ? h`<savant-sparkline
                  .points=${a}
                  .state=${!o || e === "unavailable" || e === "off" ? "muted" : s === "high" ? "warning" : s === "warning" ? "caution" : "normal"}
                ></savant-sparkline>` : ""}
        </span>
        <span class="metrics">
          ${n && (this.display.show_average_power || this.display.show_maximum_power) ? h`<savant-metric-row
                .avg=${this.display.show_average_power ? he((w = this.statistics) == null ? void 0 : w.averageWatts) : "--"}
                .max=${this.display.show_maximum_power ? he((Y = this.statistics) == null ? void 0 : Y.maximumWatts) : "--"}
                ?stacked=${this.stacked}
              ></savant-metric-row>` : ""}
          ${this.display.show_energy ? h`<span class="energy">${Zt(t.energyValue)}</span>` : ""}
        </span>
        ${this.error ? h`<span class="feedback">${this.error}</span>` : ""}
        ${l ? h`<savant-hold-control-button
              class="control"
              .breakerId=${this.breaker.id}
              .label=${this.display.label}
              .mode=${this.display.control_mode === "hold" ? "hold" : "hold_confirm_off"}
              .switchState=${t.switchState ?? "off"}
              .pending=${this.pending}
              ?disabled=${!t.available}
            ></savant-hold-control-button>` : ""}
      </button>
    `;
  }
  renderEntityIcon() {
    var s, r;
    const t = this.breaker.entities.power, e = t ? (r = (s = this.hass) == null ? void 0 : s.states[t]) == null ? void 0 : r.attributes.icon : void 0;
    return typeof e == "string" && e && customElements.get("ha-icon") ? h`<ha-icon class="entity-icon" .icon=${e}></ha-icon>` : h`<savant-icon class="entity-icon" icon="flash"></savant-icon>`;
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
    var n, l, c, u, d, m, f, w, Y, Pe;
    const t = this.breaker.entities.power, e = this.breaker.entities.energy, s = this.breaker.entities.switch, r = t ? G((l = (n = this.hass) == null ? void 0 : n.states[t]) == null ? void 0 : l.state) : void 0, i = e ? G((u = (c = this.hass) == null ? void 0 : c.states[e]) == null ? void 0 : u.state) : void 0, a = this.optimisticSwitchState ?? (s ? (m = (d = this.hass) == null ? void 0 : d.states[s]) == null ? void 0 : m.state : void 0), o = this.breaker.available && (!t || ((w = (f = this.hass) == null ? void 0 : f.states[t]) == null ? void 0 : w.state) !== "unavailable") && (!s || ((Pe = (Y = this.hass) == null ? void 0 : Y.states[s]) == null ? void 0 : Pe.state) !== "unavailable");
    return { powerWatts: r, energyValue: i, switchState: a, available: o };
  }
  visualState(t, e, s = !0) {
    return this.error ? "error" : this.pending ? "pending" : s ? e === "off" ? "off" : e === "on" ? "on" : t === 0 ? "off" : "on" : "unavailable";
  }
  loadState(t) {
    return t !== void 0 && t > this.highLoadThresholdWatts ? "high" : t !== void 0 && t > this.warningLoadThresholdWatts ? "warning" : "normal";
  }
  openMoreInfo(t) {
    if (t.target.closest("savant-hold-control-button")) return;
    const s = this.breaker.entities.power ?? this.breaker.entities.switch ?? this.breaker.entities.energy;
    s && ne(this, "hass-action", {
      config: {
        entity: s,
        tap_action: { action: "more-info" }
      },
      action: "tap"
    });
  }
};
k.styles = S`
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
A([
  p({ attribute: !1 })
], k.prototype, "hass", 2);
A([
  p({ attribute: !1 })
], k.prototype, "breaker", 2);
A([
  p({ attribute: !1 })
], k.prototype, "display", 2);
A([
  p({ attribute: !1 })
], k.prototype, "statistics", 2);
A([
  p({ type: Number })
], k.prototype, "highLoadThresholdWatts", 2);
A([
  p({ type: Number })
], k.prototype, "warningLoadThresholdWatts", 2);
A([
  p({ type: Boolean })
], k.prototype, "graphLoading", 2);
A([
  p({ type: Boolean })
], k.prototype, "pending", 2);
A([
  p({ type: Boolean, reflect: !0 })
], k.prototype, "stacked", 2);
A([
  p({ type: String, attribute: "mobile-layout", reflect: !0 })
], k.prototype, "mobileLayout", 2);
A([
  p({ type: String })
], k.prototype, "optimisticSwitchState", 2);
A([
  p({ type: String })
], k.prototype, "error", 2);
k = A([
  O("savant-breaker-tile")
], k);
function Qt(t, e) {
  return t === "unavailable" ? "Unavailable" : e === "off" || t === "off" ? "Off" : "On";
}
function Xt(t = 2) {
  return Array.from({ length: Math.max(2, t) }, (e, s) => ({
    start: s,
    value: 0
  }));
}
const Jt = S`
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
var es = Object.defineProperty, ts = Object.getOwnPropertyDescriptor, et = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? ts(e, s) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && es(e, s, i), i;
};
let ge = class extends _ {
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
ge.styles = [
  Jt,
  S`
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
et([
  p({ type: Boolean, reflect: !0 })
], ge.prototype, "stacked", 2);
ge = et([
  O("savant-breaker-tile-skeleton")
], ge);
var ss = Object.getOwnPropertyDescriptor, rs = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? ss(e, s) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = o(i) || i);
  return i;
};
let $e = class extends _ {
  render() {
    return h`
      <div class="empty">
        <strong>No Savant breaker entities discovered.</strong>
        <span>Open the card editor to add manual mappings or check Savant Energy entity metadata.</span>
      </div>
    `;
  }
};
$e.styles = S`
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
$e = rs([
  O("savant-board-empty-state")
], $e);
var is = Object.defineProperty, as = Object.getOwnPropertyDescriptor, tt = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? as(e, s) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && is(e, s, i), i;
};
let ve = class extends _ {
  constructor() {
    super(...arguments), this.message = "Unable to load breaker board.";
  }
  render() {
    return h`<div class="error">${this.message}</div>`;
  }
};
ve.styles = S`
    .error {
      padding: 16px;
      border-radius: var(--savant-radius);
      color: var(--error-color);
      background: color-mix(in srgb, var(--error-color) 12%, transparent);
    }
  `;
tt([
  p({ type: String })
], ve.prototype, "message", 2);
ve = tt([
  O("savant-board-error-state")
], ve);
class W {
  constructor(e) {
    this.hass = e;
  }
  async fetchScenes() {
    const e = await this.hass.callApi("GET", "savant_energy/scenes");
    return e != null && e.scenes ? e.scenes.map((s) => ({ id: s.scene_id, name: s.name })) : [];
  }
  async fetchSceneBreakers(e) {
    const s = await this.hass.callApi("GET", `savant_energy/scene_breakers/${e}`);
    return s != null && s.breakers && typeof s.breakers == "object" ? { ...s.breakers } : {};
  }
  async createScene(e, s) {
    await this.hass.callApi("POST", "savant_energy/scenes", { name: e, relay_states: s });
  }
  async updateScene(e, s, r) {
    await this.hass.callApi("POST", `savant_energy/scenes/${e}`, { name: s, relay_states: r });
  }
  async deleteScene(e) {
    await this.hass.callApi("DELETE", `savant_energy/scenes/${e}`);
  }
}
const st = 168;
function os(t, e) {
  const s = t == null ? void 0 : t.averageWatts;
  if (s === void 0 || !Number.isFinite(s))
    return {};
  const r = s / 1e3, i = r * st, a = {
    averageWatts: s,
    averageKwPerHour: r,
    estimatedWeeklyKwh: i
  };
  return e && e > 0 && (a.batteryDrainPercentPerHour = r / e * 100), a;
}
function ns(t, e, s) {
  const r = Object.keys(t), i = r.length;
  let a = 0, o = 0;
  for (const u of r) {
    if (!t[u]) continue;
    a++;
    const d = e.get(u);
    d != null && d.averageWatts && Number.isFinite(d.averageWatts) && (o += d.averageWatts);
  }
  const n = o / 1e3, l = n * st, c = {
    totalOnBreakers: a,
    totalBreakers: i,
    totalAverageWatts: o,
    totalKwhPerHour: n,
    totalWeeklyKwh: l
  };
  return s && s > 0 && (c.batteryDrainPercentPerHour = n / s * 100), c;
}
function rt(t) {
  return t === void 0 || !Number.isFinite(t) ? "--" : t >= 1e3 ? `${(t / 1e3).toFixed(1)} kW` : `${Math.round(t)} W`;
}
function fe(t) {
  return t === void 0 || !Number.isFinite(t) ? "--" : t >= 10 ? `${t.toFixed(1)} kWh` : t >= 1 ? `${t.toFixed(2)} kWh` : `${(t * 1e3).toFixed(0)} Wh`;
}
function it(t) {
  return t === void 0 || !Number.isFinite(t) ? "" : `${t.toFixed(1)}%/h`;
}
const at = S`
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
var ls = Object.defineProperty, cs = Object.getOwnPropertyDescriptor, D = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? cs(e, s) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && ls(e, s, i), i;
};
let P = class extends _ {
  constructor() {
    super(...arguments), this.name = "", this.entityId = "", this.isOn = !1, this.loading = !1, this.controllable = !0;
  }
  handleClick() {
    this.controllable && ne(this, "savant-scene-toggle", {
      entityId: this.entityId,
      newState: !this.isOn
    });
  }
  render() {
    const t = this.isOn && this.averageWatts !== void 0 ? os(
      { averageWatts: this.averageWatts },
      this.batteryCapacityKwh
    ) : void 0;
    return h`
      <button
        class="row ${this.isOn ? "on" : "off"}${this.controllable ? "" : " locked"}"
        ?disabled=${!this.controllable}
        @click=${this.handleClick}
      >
        <span class="status-bar" aria-hidden="true"></span>
        <span class="body">
          <span class="header">
            <span class="name">${this.name}</span>
            <span class="badge ${this.isOn ? "on" : "off"}">${this.isOn ? "ON" : "OFF"}</span>
          </span>
          ${this.renderStats(t)}
        </span>
        ${this.controllable ? "" : this.renderLockIcon()}
      </button>
    `;
  }
  renderStats(t) {
    if (!this.isOn) return "";
    if (this.loading)
      return h`<span class="stats"><span class="stats-line muted">Loading…</span></span>`;
    if (this.averageWatts === void 0)
      return h`<span class="stats"><span class="stats-line muted">No data</span></span>`;
    const e = `${rt(this.averageWatts)} avg`, s = t == null ? void 0 : t.averageKwPerHour, r = t == null ? void 0 : t.estimatedWeeklyKwh, i = t == null ? void 0 : t.batteryDrainPercentPerHour, a = s !== void 0 ? `${e} · ${fe(s)}/h` : e, o = [];
    r !== void 0 && o.push(`${fe(r)}/wk`), i !== void 0 && o.push(it(i));
    const n = o.join(" · ");
    return h`
      <span class="stats">
        <span class="stats-line">${a}</span>
        ${n ? h`<span class="stats-line">${n}</span>` : ""}
      </span>
    `;
  }
  renderLockIcon() {
    return h`
      <span class="lock-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M18,8H17V6A5,5 0 0,0 12,1A5,5 0 0,0 7,6V8H6A2,2 0 0,0 4,10V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V10A2,2 0 0,0 18,8M12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M15.1,8H8.9V6A3.1,3.1 0 0,1 12,2.9A3.1,3.1 0 0,1 15.1,6V8Z"
          />
        </svg>
      </span>
    `;
  }
};
P.styles = S`
    :host {
      display: block;
      --savant-text-halo:
        0 0 2px var(--savant-tile-bg),
        0 1px 1px var(--savant-tile-bg),
        1px 0 1px var(--savant-tile-bg),
        0 -1px 1px var(--savant-tile-bg),
        -1px 0 1px var(--savant-tile-bg);
      --savant-text-outline-color: var(--savant-tile-bg);
    }

    .row {
      display: flex;
      align-items: stretch;
      width: 100%;
      min-width: 0;
      padding: 10px 14px;
      text-align: left;
      border: 1px solid var(--savant-border);
      border-radius: var(--savant-radius);
      background: transparent;
      color: var(--savant-tile-fg);
      font-family: var(--savant-font-family, Inter, "SF Pro Display", "SF Pro Text", Roboto, "Helvetica Neue", Arial, sans-serif);
      font-weight: 400;
      cursor: pointer;
      transition: background 200ms ease;
      gap: 12px;
    }

    .row.on {
      background: color-mix(in srgb, var(--savant-success) 8%, transparent);
    }

    .row.off {
      background: transparent;
    }

    .row.locked {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .status-bar {
      display: block;
      flex: none;
      width: 8px;
      align-self: stretch;
      border-radius: 999px;
      background: var(--savant-success);
    }

    .row.off .status-bar {
      background: var(--savant-disabled);
    }

    .body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 0;
      gap: 3px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .name {
      font-size: 15px;
      font-weight: 500;
      line-height: 1.22;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-shadow: var(--savant-text-halo);
      -webkit-text-stroke: 4px var(--savant-text-outline-color);
      paint-order: stroke fill;
    }

    .badge {
      flex: none;
      width: 28px;
      height: 18px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      line-height: 1;
    }

    .badge.on {
      background: var(--savant-success);
      color: white;
    }

    .badge.off {
      background: var(--savant-disabled);
      color: var(--savant-muted);
    }

    .stats {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .stats-line {
      font-size: 12px;
      color: var(--savant-muted);
      line-height: 1.3;
    }

    .stats-line.muted {
      font-style: italic;
    }

    .lock-icon {
      flex: none;
      width: 16px;
      height: 16px;
      align-self: center;
      color: var(--savant-muted);
      opacity: 0.6;
    }

    .lock-icon svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;
D([
  p({ type: String })
], P.prototype, "name", 2);
D([
  p({ type: String })
], P.prototype, "entityId", 2);
D([
  p({ type: Boolean })
], P.prototype, "isOn", 2);
D([
  p({ type: Number })
], P.prototype, "averageWatts", 2);
D([
  p({ type: Number })
], P.prototype, "batteryCapacityKwh", 2);
D([
  p({ type: Boolean })
], P.prototype, "loading", 2);
D([
  p({ type: Boolean })
], P.prototype, "controllable", 2);
P = D([
  O("savant-scene-breaker-row")
], P);
var hs = Object.defineProperty, ds = Object.getOwnPropertyDescriptor, $ = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? ds(e, s) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && hs(e, s, i), i;
};
let y = class extends _ {
  constructor() {
    super(...arguments), this.breakers = [], this.stats = /* @__PURE__ */ new Map(), this.open = !1, this.stacked = !1, this.view = "list", this.scenes = [], this.selectedSceneId = "", this.selectedSceneName = "", this.relayStates = {}, this.newSceneName = "", this.loading = !1, this.saving = !1, this.errorMessage = "";
  }
  updated(t) {
    t.has("open") && this.open && this.openDialog();
  }
  async openDialog() {
    this.loading = !0, this.errorMessage = "", this.view = "list", this.selectedSceneId = "", this.selectedSceneName = "", this.relayStates = {}, this.newSceneName = "";
    try {
      const t = new W(this.hass);
      this.scenes = await t.fetchScenes();
    } catch {
      this.errorMessage = "Failed to load scenes.";
    } finally {
      this.loading = !1;
    }
  }
  async openEditor(t) {
    this.selectedSceneId = t, this.loading = !0, this.errorMessage = "";
    const e = this.scenes.find((s) => s.id === t);
    this.selectedSceneName = (e == null ? void 0 : e.name) ?? "";
    try {
      const s = new W(this.hass);
      this.relayStates = await s.fetchSceneBreakers(t), this.view = "editor";
    } catch {
      this.errorMessage = "Failed to load scene breakers.";
    } finally {
      this.loading = !1;
    }
  }
  async createScene() {
    const t = this.newSceneName.trim();
    if (t) {
      this.errorMessage = "";
      try {
        const e = new W(this.hass);
        await e.createScene(t, {}), this.scenes = await e.fetchScenes();
        const s = this.scenes.find((r) => r.name === t);
        s && (this.selectedSceneId = s.id, this.selectedSceneName = s.name, this.relayStates = await e.fetchSceneBreakers(s.id), this.view = "editor"), this.newSceneName = "";
      } catch {
        this.errorMessage = "Failed to create scene.";
      }
    }
  }
  async deleteScene(t) {
    if (window.confirm("Delete this scene?")) {
      this.errorMessage = "";
      try {
        const e = new W(this.hass);
        await e.deleteScene(t), this.selectedSceneId === t && (this.selectedSceneId = "", this.selectedSceneName = "", this.relayStates = {}, this.view = "list"), this.scenes = await e.fetchScenes();
      } catch {
        this.errorMessage = "Failed to delete scene.";
      }
    }
  }
  handleToggle(t) {
    t.stopPropagation(), this.relayStates = { ...this.relayStates, [t.detail.entityId]: t.detail.newState };
  }
  async saveScene() {
    if (!(!this.selectedSceneId || !this.selectedSceneName.trim())) {
      this.saving = !0, this.errorMessage = "";
      try {
        const t = new W(this.hass);
        await t.updateScene(this.selectedSceneId, this.selectedSceneName.trim(), this.relayStates), this.scenes = await t.fetchScenes(), this.view = "list";
      } catch {
        this.errorMessage = "Failed to save scene.";
      } finally {
        this.saving = !1;
      }
    }
  }
  async goBack() {
    this.errorMessage = "";
    try {
      const t = new W(this.hass);
      this.scenes = await t.fetchScenes();
    } catch {
    }
    this.view = "list";
  }
  close() {
    this.dispatchEvent(new CustomEvent("savant-scene-close", {}));
  }
  onNewSceneNameInput(t) {
    this.newSceneName = t.target.value;
  }
  onEditorNameInput(t) {
    this.selectedSceneName = t.target.value;
  }
  get breakerRows() {
    return Object.keys(this.relayStates).map((e) => {
      const s = this.breakers.find(
        (a) => a.entities.switch === e || a.entities.power === e
      ), r = s == null ? void 0 : s.entities.power, i = r ? this.stats.get(r) : void 0;
      return {
        entityId: e,
        name: (s == null ? void 0 : s.name) ?? e,
        isOn: this.relayStates[e] ?? !1,
        averageWatts: i == null ? void 0 : i.averageWatts,
        loading: (i == null ? void 0 : i.loading) ?? !1,
        controllable: (s == null ? void 0 : s.controllable) ?? !1
      };
    }).sort((e, s) => e.name.localeCompare(s.name));
  }
  get footer() {
    const t = /* @__PURE__ */ new Map();
    for (const e of Object.keys(this.relayStates)) {
      const s = this.breakers.find(
        (i) => i.entities.switch === e || i.entities.power === e
      ), r = s == null ? void 0 : s.entities.power;
      r && t.set(e, this.stats.get(r));
    }
    return ns(this.relayStates, t, this.batteryCapacityKwh);
  }
  renderFooter() {
    const t = this.footer;
    return t.totalOnBreakers === 0 ? h`<div class="footer-summary">No breakers ON — scene will turn everything off.</div>` : h`
      <div class="footer-summary">
        <div class="footer-row">ON: ${t.totalOnBreakers} / ${t.totalBreakers} breakers</div>
        <div class="footer-row">Scene load: ${rt(t.totalAverageWatts)} avg</div>
        <div class="footer-row">→ ${fe(t.totalKwhPerHour)}/h · ${fe(t.totalWeeklyKwh)}/wk</div>
        ${t.batteryDrainPercentPerHour !== void 0 ? h`<div class="footer-row battery">→ ${it(t.batteryDrainPercentPerHour)} battery drain</div>` : ""}
      </div>
    `;
  }
  render() {
    return h`
      <div class="dialog-overlay">
        <div class="dialog-backdrop" @click=${this.close}></div>
        <div class="dialog-panel">
          ${this.renderList()}
          ${this.renderEditor()}
        </div>
      </div>
    `;
  }
  renderList() {
    return this.view !== "list" ? v : h`
      <div class="dialog-header">
        <span class="dialog-title">Scenes</span>
        <button class="dialog-close" @click=${this.close} aria-label="Close">✕</button>
      </div>
      ${this.loading ? h`<div class="dialog-loading">Loading scenes...</div>` : h`
            ${this.scenes.length === 0 ? h`<div class="dialog-empty"><p>No scenes yet. Create one below.</p></div>` : h`
                  <div class="scene-list">
                    ${this.scenes.map(
      (t) => h`
                        <div class="scene-list-row" @click=${() => this.openEditor(t.id)}>
                          <span class="scene-name">${t.name}</span>
                          <button
                            class="scene-delete-btn"
                            @click=${(e) => {
        e.stopPropagation(), this.deleteScene(t.id);
      }}
                            aria-label="Delete ${t.name}"
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                              <path
                                d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                              />
                            </svg>
                          </button>
                        </div>
                      `
    )}
                  </div>
                `}
            <div class="dialog-footer">
              <input
                class="scene-input"
                type="text"
                placeholder="Create new scene..."
                .value=${this.newSceneName}
                @input=${this.onNewSceneNameInput}
                @keydown=${(t) => t.key === "Enter" && this.createScene()}
              />
              <button
                class="scene-create-btn"
                ?disabled=${!this.newSceneName.trim()}
                @click=${this.createScene}
              >
                + Add
              </button>
            </div>
          `}
      ${this.errorMessage ? h`<div class="dialog-error">${this.errorMessage}</div>` : ""}
    `;
  }
  renderEditor() {
    return this.view !== "editor" ? v : h`
      <div class="dialog-header">
        <button class="dialog-back" @click=${this.goBack} aria-label="Back">← Back</button>
        <span class="dialog-title">Edit Scene</span>
        <button class="dialog-close" @click=${this.close} aria-label="Close">✕</button>
      </div>
      <div class="editor-name-row">
        <input
          class="scene-input editor-name-input"
          type="text"
          .value=${this.selectedSceneName}
          @input=${this.onEditorNameInput}
        />
        <button
          class="scene-save-btn"
          ?disabled=${this.saving || !this.selectedSceneName.trim()}
          @click=${this.saveScene}
        >
          ${this.saving ? "Saving..." : "Save"}
        </button>
      </div>
      <div class="breaker-list">
        ${this.loading ? h`<div class="dialog-loading">Loading breakers...</div>` : this.breakerRows.length === 0 ? h`<div class="dialog-empty"><p>No breakers found.</p></div>` : this.breakerRows.map(
      (t) => h`
                  <savant-scene-breaker-row
                    .name=${t.name}
                    .entityId=${t.entityId}
                    .isOn=${t.isOn}
                    .averageWatts=${t.averageWatts}
                    .batteryCapacityKwh=${this.batteryCapacityKwh}
                    .loading=${t.loading}
                    .controllable=${t.controllable}
                    @savant-scene-toggle=${this.handleToggle}
                  ></savant-scene-breaker-row>
                `
    )}
      </div>
      ${this.errorMessage ? h`<div class="dialog-error">${this.errorMessage}</div>` : ""}
      <div class="dialog-footer-summary">
        ${this.renderFooter()}
      </div>
    `;
  }
};
y.styles = [
  at,
  S`
      :host {
        display: block;
      }

      .dialog-overlay {
        position: absolute;
        inset: 0;
        z-index: 10;
        display: flex;
      }

      .dialog-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
      }

      .dialog-panel {
        position: relative;
        max-width: 520px;
        margin: auto;
        max-height: 90%;
        background: var(--ha-card-background);
        border-radius: var(--savant-radius);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      :host([stacked]) .dialog-panel {
        position: absolute;
        inset: 0;
        border-radius: 0;
        max-width: none;
        max-height: none;
        margin: 0;
      }

      .dialog-header {
        display: flex;
        align-items: center;
        padding: 14px 16px;
        border-bottom: 1px solid var(--savant-border);
        gap: 8px;
      }

      .dialog-title {
        font-size: 16px;
        font-weight: 600;
        flex: 1;
      }

      .dialog-close,
      .dialog-back {
        flex: none;
        height: 28px;
        width: 28px;
        padding: 0;
        display: grid;
        place-items: center;
        border: 1px solid color-mix(in srgb, var(--primary-text-color) 70%, var(--divider-color));
        border-radius: var(--savant-radius);
        color: var(--primary-text-color);
        background: linear-gradient(
          145deg,
          color-mix(in srgb, var(--savant-tile-bg) 84%, white),
          var(--savant-tile-bg)
        );
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 0.14),
          inset 0 0 0 1px color-mix(in srgb, var(--primary-text-color) 18%, transparent),
          0 0 0 1px color-mix(in srgb, var(--ha-card-background, var(--card-background-color)) 56%, white),
          0 2px 5px rgb(0 0 0 / 0.26);
        font-size: 14px;
        line-height: 1;
        cursor: pointer;
        background-color: var(--savant-tile-bg);
      }

      .dialog-close:hover,
      .dialog-back:hover,
      .dialog-close:focus-visible,
      .dialog-back:focus-visible {
        border-color: color-mix(in srgb, var(--primary-text-color) 82%, white);
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 0.2),
          inset 0 0 0 1px color-mix(in srgb, var(--primary-text-color) 30%, transparent),
          0 0 0 1px color-mix(in srgb, var(--primary-text-color) 36%, transparent),
          0 3px 6px rgb(0 0 0 / 0.3);
      }

      .scene-list {
        overflow-y: auto;
        flex: 1;
      }

      .scene-list-row {
        display: flex;
        padding: 12px 16px;
        cursor: pointer;
        border-bottom: 1px solid var(--savant-border);
        align-items: center;
        gap: 8px;
      }

      .scene-list-row:hover {
        background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      }

      .scene-name {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .scene-delete-btn {
        color: var(--savant-error);
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        display: grid;
        place-items: center;
        flex: none;
      }

      .scene-delete-btn:hover {
        opacity: 0.8;
      }

      .editor-name-row {
        display: flex;
        gap: 8px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--savant-border);
        align-items: center;
      }

      .scene-input {
        flex: 1;
        background: var(--savant-tile-bg);
        border: 1px solid var(--savant-border);
        border-radius: 8px;
        padding: 8px 12px;
        color: var(--primary-text-color);
        font-size: 14px;
        outline: none;
        font-family: inherit;
      }

      .scene-input:focus {
        border-color: var(--primary-color);
      }

      .scene-create-btn,
      .scene-save-btn {
        background: var(--savant-success);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 8px 16px;
        cursor: pointer;
        font-weight: 600;
        font-size: 13px;
        font-family: inherit;
        flex: none;
        transition: opacity 200ms ease;
      }

      .scene-create-btn[disabled],
      .scene-save-btn[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .scene-create-btn:not([disabled]):hover,
      .scene-save-btn:not([disabled]):hover {
        opacity: 0.9;
      }

      .breaker-list {
        overflow-y: auto;
        flex: 1;
        padding: 8px 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .dialog-footer {
        padding: 12px 16px;
        display: flex;
        gap: 8px;
        border-top: 1px solid var(--savant-border);
      }

      .dialog-footer-summary {
        padding: 12px 16px;
        border-top: 1px solid var(--savant-border);
      }

      .footer-summary {
        font-size: 12px;
        color: var(--savant-muted);
      }

      .footer-row {
        margin: 2px 0;
      }

      .footer-row.battery {
        color: var(--savant-caution);
      }

      .dialog-loading,
      .dialog-empty {
        padding: 32px 16px;
        text-align: center;
        color: var(--savant-muted);
      }

      .dialog-error {
        padding: 8px 16px;
        color: var(--savant-error);
        font-size: 12px;
      }
    `
];
$([
  p({ attribute: !1 })
], y.prototype, "hass", 2);
$([
  p({ attribute: !1 })
], y.prototype, "breakers", 2);
$([
  p({ attribute: !1 })
], y.prototype, "stats", 2);
$([
  p({ type: Number })
], y.prototype, "batteryCapacityKwh", 2);
$([
  p({ type: Boolean, reflect: !0 })
], y.prototype, "open", 2);
$([
  p({ type: Boolean, reflect: !0 })
], y.prototype, "stacked", 2);
$([
  g()
], y.prototype, "view", 2);
$([
  g()
], y.prototype, "scenes", 2);
$([
  g()
], y.prototype, "selectedSceneId", 2);
$([
  g()
], y.prototype, "selectedSceneName", 2);
$([
  g()
], y.prototype, "relayStates", 2);
$([
  g()
], y.prototype, "newSceneName", 2);
$([
  g()
], y.prototype, "loading", 2);
$([
  g()
], y.prototype, "saving", 2);
$([
  g()
], y.prototype, "errorMessage", 2);
y = $([
  O("savant-scene-dialog")
], y);
class ps {
  constructor(e) {
    this.manualBreakers = e;
  }
  async discover(e) {
    return this.manualBreakers.map((s) => {
      const r = {
        switch: s.switch_entity,
        power: s.power_entity,
        energy: s.energy_entity,
        voltage: s.voltage_entity,
        current: s.current_entity
      };
      return {
        id: `manual:${s.id}`,
        name: s.name,
        areaName: s.area_name,
        panelName: s.panel_name,
        circuitNumber: s.circuit_number,
        controllable: !!s.switch_entity,
        entities: r,
        available: Object.values(r).some(
          (i) => {
            var a;
            return i && ((a = e.states[i]) == null ? void 0 : a.state) !== "unavailable";
          }
        ),
        discoveryConfidence: "manual"
      };
    });
  }
}
function ot(t, e) {
  const s = t.split(".")[0], r = e == null ? void 0 : e.attributes.device_class;
  if (s === "switch") return "switch";
  if (s === "sensor") {
    if (r === "power") return "power";
    if (r === "energy") return "energy";
    if (r === "voltage") return "voltage";
    if (r === "current") return "current";
  }
}
function us(t) {
  var o;
  const e = new Map(t.devices.map((n) => [n.id, n])), s = new Map(t.areas.map((n) => [n.area_id, n.name])), r = /* @__PURE__ */ new Map(), i = [];
  for (const n of t.entities)
    if (!(n.disabled_by || n.hidden_by) && gs(n, e.get(n.device_id ?? ""), t.integration))
      if (n.device_id) {
        const l = r.get(n.device_id) ?? [];
        l.push(n), r.set(n.device_id, l);
      } else
        i.push(n);
  const a = [];
  for (const [n, l] of r) {
    const c = vs(n, l, e.get(n), s, t.states);
    c && a.push(c);
  }
  for (const n of i) {
    const l = ot(n.entity_id, t.states[n.entity_id]);
    l && a.push({
      id: bs(n),
      name: nt(n, t.states[n.entity_id]),
      areaId: n.area_id,
      areaName: n.area_id ? s.get(n.area_id) : void 0,
      controllable: l === "switch",
      entities: { [l]: n.entity_id },
      available: ((o = t.states[n.entity_id]) == null ? void 0 : o.state) !== "unavailable",
      discoveryConfidence: "medium",
      discoveryNotes: ["Associated from entity registry without a device_id."]
    });
  }
  return a;
}
function gs(t, e, s) {
  var a;
  if (t.platform === s) return !0;
  const r = ((e == null ? void 0 : e.manufacturer) ?? "").toLowerCase(), i = ((a = e == null ? void 0 : e.identifiers) == null ? void 0 : a.flat().join(" ").toLowerCase()) ?? "";
  return r.includes("savant") || i.includes(s.toLowerCase());
}
function vs(t, e, s, r, i) {
  var m;
  const a = {}, o = [];
  for (const f of e) {
    const w = ot(f.entity_id, i[f.entity_id]);
    !w || a[w] || (a[w] = f.entity_id);
  }
  if (!Object.keys(a).length) return;
  const n = e.find((f) => f.entity_id === a.power) ?? e[0], l = (n == null ? void 0 : n.area_id) ?? (s == null ? void 0 : s.area_id) ?? void 0, c = n ? (m = i[n.entity_id]) == null ? void 0 : m.attributes : {}, u = ms((c == null ? void 0 : c.circuit_number) ?? (c == null ? void 0 : c.circuit)), d = fs(c == null ? void 0 : c.panel_name, c == null ? void 0 : c.panel, s == null ? void 0 : s.model);
  return a.power || o.push("No power sensor with device_class: power was found."), a.switch || o.push("No switch entity was found for breaker control."), {
    id: `device:${t}`,
    deviceId: t,
    name: (s == null ? void 0 : s.name_by_user) || (s == null ? void 0 : s.name) || nt(n, n ? i[n.entity_id] : void 0),
    areaId: l,
    areaName: l ? r.get(l) : void 0,
    panelName: d,
    circuitNumber: u,
    controllable: !!a.switch,
    entities: a,
    available: Object.values(a).some((f) => {
      var w;
      return ((w = i[f]) == null ? void 0 : w.state) !== "unavailable";
    }),
    discoveryConfidence: a.power && a.switch ? "high" : "medium",
    discoveryNotes: o.length ? o : void 0
  };
}
function fs(...t) {
  return t.find((e) => typeof e == "string" && e.length > 0);
}
function ms(t) {
  const e = Number(t);
  return Number.isFinite(e) ? e : void 0;
}
function bs(t) {
  return t.unique_id ? `entity:${t.unique_id}` : `entity:${t.entity_id}`;
}
function nt(t, e) {
  return (t == null ? void 0 : t.name) || (t == null ? void 0 : t.original_name) || (e == null ? void 0 : e.attributes.friendly_name) || (t == null ? void 0 : t.entity_id) || "Savant breaker";
}
class ys {
  constructor(e) {
    this.integration = e;
  }
  async discover(e) {
    const s = await ws(e);
    return us({
      ...s,
      states: e.states,
      integration: this.integration
    });
  }
}
async function ws(t) {
  const e = t.connection;
  if (!(e != null && e.sendMessagePromise))
    return { entities: [], devices: [], areas: [] };
  const [s, r, i] = await Promise.all([
    e.sendMessagePromise({ type: "config/entity_registry/list" }),
    e.sendMessagePromise({ type: "config/device_registry/list" }),
    e.sendMessagePromise({ type: "config/area_registry/list" })
  ]);
  return {
    entities: s,
    devices: r,
    areas: i
  };
}
class lt {
  constructor(e) {
    this.providers = e;
  }
  async discover(e, s) {
    const r = this.providers ?? [
      ...s.discovery.enabled ? [new ys(s.discovery.integration)] : [],
      new ps(s.manual_breakers)
    ], i = await Promise.all(r.map((a) => a.discover(e)));
    return xs(i.flat());
  }
}
function xs(t) {
  const e = /* @__PURE__ */ new Map();
  for (const s of t) {
    const r = e.get(s.id);
    e.set(
      s.id,
      r ? {
        ...r,
        ...s,
        entities: { ...r.entities, ...s.entities },
        discoveryNotes: [...r.discoveryNotes ?? [], ...s.discoveryNotes ?? []]
      } : s
    );
  }
  return [...e.values()];
}
class _s {
  async fetchHistory(e, s, r) {
    var l;
    if (!((l = e.connection) != null && l.sendMessagePromise)) return [];
    const i = /* @__PURE__ */ new Date(), a = new Date(i.getTime() - $s(r)), o = await e.connection.sendMessagePromise({
      type: "history/history_during_period",
      start_time: a.toISOString(),
      end_time: i.toISOString(),
      entity_ids: [s],
      minimal_response: !0,
      no_attributes: !0
    });
    return ((o == null ? void 0 : o[0]) ?? []).map((c) => ({
      start: new Date(c.last_changed ?? c.lu ?? c.s).getTime(),
      value: Number(c.state)
    })).filter((c) => Number.isFinite(c.start) && Number.isFinite(c.value));
  }
}
function $s(t) {
  switch (t) {
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
class ks {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.history = new _s();
  }
  async getStatistics(e, s, r, i) {
    const a = `${s}:${r}`, o = Date.now(), n = this.cache.get(a);
    if (n && o - n.fetchedAt < i * 1e3)
      return n.data;
    try {
      const l = await this.fetchStatisticsOrHistory(e, s, r), c = l.map((d) => d.value).filter(Number.isFinite), u = {
        entityId: s,
        period: r,
        points: l,
        averageWatts: c.length ? c.reduce((d, m) => d + m, 0) / c.length : void 0,
        maximumWatts: c.length ? Math.max(...c) : void 0,
        loading: !1,
        fetchedAt: o
      };
      return this.cache.set(a, { data: u, fetchedAt: o }), u;
    } catch (l) {
      return {
        entityId: s,
        period: r,
        points: [],
        loading: !1,
        error: l instanceof Error ? l.message : "History unavailable"
      };
    }
  }
  invalidate(e) {
    if (!e) {
      this.cache.clear();
      return;
    }
    for (const s of this.cache.keys())
      s.startsWith(`${e}:`) && this.cache.delete(s);
  }
  async fetchStatisticsOrHistory(e, s, r) {
    var i;
    if (!((i = e.connection) != null && i.sendMessagePromise)) return [];
    if (r === "7d" || r === "24h" || r === "12h" || r === "6h")
      try {
        const a = /* @__PURE__ */ new Date(), o = new Date(a.getTime() - Ss(r)), n = await e.connection.sendMessagePromise({
          type: "recorder/statistics_during_period",
          start_time: o.toISOString(),
          end_time: a.toISOString(),
          statistic_ids: [s],
          period: r === "7d" ? "hour" : "5minute",
          types: ["mean", "max"]
        }), c = ((n == null ? void 0 : n[s]) ?? []).map((u) => ({
          start: new Date(u.start).getTime(),
          value: Number(u.mean ?? u.max)
        })).filter((u) => Number.isFinite(u.start) && Number.isFinite(u.value));
        if (c.length) return c;
      } catch {
      }
    return this.history.fetchHistory(e, s, r);
  }
}
function Ss(t) {
  switch (t) {
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
const C = {
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
  manual_breakers: [],
  scenes: { enabled: !0, battery_capacity_kwh: void 0 }
}, ct = {
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
}, As = {
  integration: "Defaults to savant_energy and is used to match registry metadata.",
  panel_filter: "Optional exact panel name to include.",
  area_filter: "Optional exact area name to include.",
  refresh_interval_seconds: "Minimum 30 seconds.",
  warning_load_threshold_watts: "Chart turns yellow above this wattage.",
  high_load_threshold_watts: "Chart turns orange above this wattage.",
  manual_breakers: "Optional fallback mappings for breakers that cannot be discovered from entity metadata.",
  id: "Use a stable ID, for example panel_1_circuit_12."
};
function Os() {
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
          F("group_by", ["none", "panel", "area", "panel_then_area"]),
          F("sort_by", ["circuit_number", "name", "current_power_descending", "highest_usage", "manual"]),
          F("density", ["comfortable", "compact"]),
          F("mobile_view", ["standard", "ultra_compact"])
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
          F("period", ["1h", "6h", "12h", "24h", "7d"]),
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
          F("default_mode", ["hidden", "hold", "hold_confirm_off"]),
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
                  switch_entity: X("switch"),
                  power_entity: X("sensor"),
                  energy_entity: X("sensor"),
                  voltage_entity: X("sensor"),
                  current_entity: X("sensor"),
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
    computeLabel: (t) => ct[t.name],
    computeHelper: (t) => As[t.name],
    assertConfig: Ps
  };
}
function X(t) {
  return {
    selector: {
      entity: {
        filter: { domain: t }
      }
    }
  };
}
function F(t, e) {
  return {
    name: t,
    selector: {
      select: {
        mode: "dropdown",
        options: e.map((s) => ({ value: s, label: ct[s] ?? Es(s) }))
      }
    }
  };
}
function Es(t) {
  return t.split("_").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
}
function Ps(t) {
  if (U("discovery", t.discovery), U("layout", t.layout), U("display", t.display), U("graph", t.graph), U("controls", t.controls), t.excluded_breakers !== void 0 && !Array.isArray(t.excluded_breakers))
    throw new Error("excluded_breakers must be a list.");
  if (t.manual_breakers !== void 0 && !Array.isArray(t.manual_breakers))
    throw new Error("manual_breakers must be a list.");
  U("breaker_overrides", t.breaker_overrides);
}
function U(t, e) {
  if (e !== void 0 && (e === null || Array.isArray(e) || typeof e != "object"))
    throw new Error(`${t} must be an object.`);
}
function ht(t, e) {
  const s = { ...t };
  if (!e) return s;
  for (const [r, i] of Object.entries(e))
    Array.isArray(i) ? s[r] = [...i] : i && typeof i == "object" && !Array.isArray(i) ? s[r] = ht(s[r] ?? {}, i) : i !== void 0 && (s[r] = i);
  return s;
}
const Ms = /* @__PURE__ */ new Set(["1h", "6h", "12h", "24h", "7d"]), Cs = /* @__PURE__ */ new Set(["standard", "ultra_compact"]);
function se(t) {
  const e = ht(C, t ?? {});
  e.discovery.enabled = e.discovery.enabled !== !1, e.discovery.integration = e.discovery.integration || C.discovery.integration, e.discovery.include_new_breakers = e.discovery.include_new_breakers !== !1, Cs.has(e.layout.mobile_view) || (e.layout.mobile_view = C.layout.mobile_view), e.display.show_title = e.display.show_title !== !1, Ms.has(e.graph.period) || (e.graph.period = C.graph.period), e.graph.refresh_interval_seconds = Math.max(30, Number(e.graph.refresh_interval_seconds) || 300);
  const s = Number(e.controls.warning_load_threshold_watts);
  e.controls.warning_load_threshold_watts = Math.max(
    0,
    Number.isFinite(s) ? s : C.controls.warning_load_threshold_watts || 1e3
  );
  const r = Number(e.controls.high_load_threshold_watts);
  return e.controls.high_load_threshold_watts = Math.max(
    0,
    Number.isFinite(r) ? r : C.controls.high_load_threshold_watts || 2e3
  ), e.excluded_breakers = Array.isArray(e.excluded_breakers) ? [...new Set(e.excluded_breakers)] : [], e.breaker_overrides = e.breaker_overrides ?? {}, e.scenes = e.scenes ?? { enabled: !0 }, e.scenes.enabled = e.scenes.enabled !== !1, (typeof e.scenes.battery_capacity_kwh != "number" || e.scenes.battery_capacity_kwh <= 0) && (e.scenes.battery_capacity_kwh = void 0), e.manual_breakers = Array.isArray(e.manual_breakers) ? e.manual_breakers : [], e;
}
function Ns(t, e) {
  const s = t.breaker_overrides[e.id] ?? {};
  return {
    label: s.label || e.name,
    show_current_power: s.show_current_power ?? t.display.show_current_power,
    show_average_power: s.show_average_power ?? t.display.show_average_power,
    show_maximum_power: s.show_maximum_power ?? t.display.show_maximum_power,
    show_energy: s.show_energy ?? t.display.show_energy,
    show_sparkline: s.show_sparkline ?? t.display.show_sparkline,
    show_icon: s.show_icon ?? t.display.show_icon,
    show_state: t.display.show_state,
    show_controls: s.show_controls ?? t.display.show_controls,
    show_area: t.display.show_area,
    show_circuit_number: t.display.show_circuit_number,
    control_mode: s.control_mode ?? t.controls.default_mode
  };
}
var Ls = Object.defineProperty, Bs = Object.getOwnPropertyDescriptor, x = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Bs(e, s) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && Ls(e, s, i), i;
};
let b = class extends _ {
  constructor() {
    super(...arguments), this.config = C, this.breakers = [], this.loading = !0, this.error = "", this.stats = /* @__PURE__ */ new Map(), this.pendingSwitches = /* @__PURE__ */ new Set(), this.toggleErrors = /* @__PURE__ */ new Map(), this.stacked = !1, this.sortMenuOpen = !1, this.sceneOpen = !1, this.searchOpen = !1, this.searchQuery = "", this.optimisticSwitchStates = /* @__PURE__ */ new Map(), this.discovery = new lt(), this.statistics = new ks(), this.discoveryKey = "", this.statsRefreshToken = 0, this.optimisticResetTimers = /* @__PURE__ */ new Map(), this.handleToggle = async (t) => {
      var o;
      if (t.stopPropagation(), !this.hass) return;
      const e = this.breakers.find((n) => n.id === t.detail.breakerId), s = e == null ? void 0 : e.entities.switch;
      if (!e || !s || this.pendingSwitches.has(e.id)) return;
      const i = (this.optimisticSwitchStates.get(e.id) ?? ((o = this.hass.states[s]) == null ? void 0 : o.state)) === "on" ? "off" : "on";
      this.setOptimisticSwitchState(e.id, i), this.pendingSwitches = /* @__PURE__ */ new Set([...this.pendingSwitches, e.id]), this.toggleErrors.delete(e.id);
      let a = !1;
      try {
        await this.hass.callService("switch", i === "off" ? "turn_off" : "turn_on", { entity_id: s }), a = !0;
      } catch {
        this.clearOptimisticSwitchState(e.id);
        const n = new Map(this.toggleErrors);
        n.set(e.id, "Failed to toggle"), this.toggleErrors = n;
      } finally {
        const n = new Set(this.pendingSwitches);
        if (n.delete(e.id), this.pendingSwitches = n, !a) return;
        const l = this.optimisticResetTimers.get(e.id);
        l !== void 0 && window.clearTimeout(l);
        const c = window.setTimeout(() => {
          this.clearOptimisticSwitchState(e.id);
        }, 15e3);
        this.optimisticResetTimers.set(e.id, c);
      }
    }, this.handleKeyDown = (t) => {
      t.key === "Escape" && this.sceneOpen && (this.sceneOpen = !1);
    };
  }
  setConfig(t) {
    this.config = se(t), this.runtimeSortBy = this.loadPersistedSort() ?? this.config.layout.sort_by, this.runtimeMobileView = this.loadPersistedMobileView() ?? this.config.layout.mobile_view, this.setAttribute("density", this.config.layout.density), this.setAttribute("mobile-view", this.effectiveMobileView()), this.discoveryKey = "";
  }
  static getConfigElement() {
    return document.createElement("savant-energy-breaker-board-card-editor");
  }
  static getConfigForm() {
    return Os();
  }
  static getStubConfig() {
    return {
      title: "Electrical Panel",
      discovery: { enabled: !0 },
      layout: { group_by: "none", density: "comfortable", mobile_view: "standard" }
    };
  }
  getCardSize() {
    const t = Math.max(this.breakers.length, 6);
    return Math.ceil(t / 2) + (this.config.display.show_title && this.config.title ? 1 : 0);
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
    this.resizeObserver = new ResizeObserver(([t]) => {
      if (!t) {
        this.stacked = !1;
        return;
      }
      this.updateStackedLayout(t.contentRect.width);
    }), this.observeLayoutTarget();
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("keydown", this.handleKeyDown);
  }
  disconnectedCallback() {
    var t;
    document.removeEventListener("keydown", this.handleKeyDown), super.disconnectedCallback(), (t = this.resizeObserver) == null || t.disconnect();
    for (const e of this.optimisticResetTimers.values())
      window.clearTimeout(e);
    this.optimisticResetTimers.clear();
  }
  updated(t) {
    this.observeLayoutTarget(), (t.has("hass") || t.has("config")) && this.ensureDiscovered();
  }
  observeLayoutTarget() {
    if (!this.resizeObserver) return;
    const t = this.renderRoot.querySelector(".board-grid") ?? this.renderRoot.querySelector("ha-card") ?? this;
    t !== this.resizeTarget && (this.resizeTarget && this.resizeObserver.unobserve(this.resizeTarget), this.resizeTarget = t, this.resizeObserver.observe(t), this.updateStackedLayout(t.getBoundingClientRect().width));
  }
  updateStackedLayout(t) {
    !Number.isFinite(t) || t <= 0 || (this.stacked && t >= 560 && (this.stacked = !1), !this.stacked && t <= 520 && (this.stacked = !0));
  }
  render() {
    return h`
      <ha-card>
        ${this.config.display.show_title ? this.renderHeader() : v}
        ${this.error ? h`<savant-board-error-state .message=${this.error}></savant-board-error-state>` : this.loading ? this.renderSkeletons() : this.visibleBreakers().length ? this.renderBreakers() : h`<savant-board-empty-state></savant-board-empty-state>`}
        ${this.renderSceneDialog()}
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
                    ${Ue.map(
      ({ value: t, label: e }) => h`
                        <button
                          class=${this.effectiveSortBy() === t ? "menu-option selected" : "menu-option"}
                          type="button"
                          @click=${() => this.setRuntimeSort(t)}
                        >
                          ${e}
                        </button>
                      `
    )}
                  </div>` : v}
            </div>
            ${this.stacked ? h`<button
                  class=${this.effectiveMobileView() === "ultra_compact" ? "chip-tool active" : "chip-tool"}
                  type="button"
                  @click=${() => this.toggleMobileView()}
                >
                  <savant-icon icon="minimize_2" aria-hidden="true"></savant-icon>
                  <span class="sr-only">Toggle ultra-compact mobile view</span>
                </button>` : v}
            ${this.scenesConfig.enabled !== !1 ? h`<div class="tool-wrap">
                  <button
                    class="chip-tool"
                    type="button"
                    @click=${this.openSceneDialog}
                    aria-label="Scenes"
                  >
                    <savant-icon icon="layout_dashboard" aria-hidden="true"></savant-icon>
                    <span class="sr-only">Scenes</span>
                  </button>
                </div>` : v}
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
                  @input=${(t) => this.searchQuery = t.target.value}
                />
              </div>
            </div>` : v}
      </div>
    `;
  }
  renderBreakers() {
    const t = Ds(this.visibleBreakers(), this.config);
    return h`
      <div
        class=${`board-grid ${this.stacked ? "stacked" : ""}`}
        @savant-breaker-toggle=${this.handleToggle}
      >
        ${t.map(
      ([e, s]) => h`
            ${e ? h`<h3 class="group-title">${e}</h3>` : v}
            ${s.map((r) => {
        const i = Ns(this.config, r), a = r.entities.power, o = a ? this.stats.get(a) : void 0;
        return h`<savant-breaker-tile
                .hass=${this.hass}
                .breaker=${r}
                .display=${i}
                .statistics=${o}
                ?stacked=${this.stacked}
                .mobileLayout=${this.effectiveMobileView()}
                .optimisticSwitchState=${this.optimisticSwitchStates.get(r.id)}
                .graphLoading=${!!(a && !o)}
                .pending=${this.pendingSwitches.has(r.id)}
                .error=${this.toggleErrors.get(r.id) ?? ""}
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
    const t = JSON.stringify({
      discovery: this.config.discovery,
      manual: this.config.manual_breakers
    });
    if (t === this.discoveryKey && this.breakers.length) {
      this.loadStatistics();
      return;
    }
    this.loading = !0, this.error = "";
    try {
      this.breakers = await this.discovery.discover(this.hass, this.config), this.discoveryKey = t, this.loading = !1, this.stats = /* @__PURE__ */ new Map(), this.loadStatistics();
    } catch (e) {
      this.error = e instanceof Error ? e.message : "Discovery failed", this.loading = !1;
    }
  }
  async loadStatistics() {
    if (!this.hass) return;
    const t = ++this.statsRefreshToken, e = [
      ...new Set(
        this.visibleBreakers().map((r) => r.entities.power).filter((r) => !!r)
      )
    ], s = await Promise.all(
      e.map(async (r) => [
        r,
        await this.statistics.getStatistics(
          this.hass,
          r,
          this.config.graph.period,
          this.config.graph.refresh_interval_seconds
        )
      ])
    );
    t === this.statsRefreshToken && (this.stats = new Map(s));
  }
  visibleBreakers() {
    const t = new Set(this.config.excluded_breakers), e = this.searchQuery.trim().toLowerCase(), s = this.breakers.filter((r) => t.has(r.id) ? !1 : e ? [r.name, r.areaName, r.panelName].filter(Boolean).some((i) => i.toLowerCase().includes(e)) : !0);
    return Ts(
      s,
      this.config,
      this.hass,
      this.stats,
      this.effectiveSortBy()
    );
  }
  get scenesConfig() {
    return this.config.scenes ?? { enabled: !0 };
  }
  effectiveSortBy() {
    return this.runtimeSortBy ?? this.config.layout.sort_by;
  }
  effectiveMobileView() {
    return this.runtimeMobileView ?? this.config.layout.mobile_view;
  }
  setRuntimeSort(t) {
    var e;
    this.runtimeSortBy = t, this.sortMenuOpen = !1, (e = window.localStorage) == null || e.setItem(this.persistedSortKey(), t);
  }
  toggleMobileView() {
    var e;
    const t = this.effectiveMobileView() === "ultra_compact" ? "standard" : "ultra_compact";
    this.runtimeMobileView = t, this.setAttribute("mobile-view", t), (e = window.localStorage) == null || e.setItem(this.persistedMobileViewKey(), t);
  }
  loadPersistedSort() {
    var e;
    const t = (e = window.localStorage) == null ? void 0 : e.getItem(this.persistedSortKey());
    return Ue.some((s) => s.value === t) ? t ?? void 0 : void 0;
  }
  loadPersistedMobileView() {
    var e;
    const t = (e = window.localStorage) == null ? void 0 : e.getItem(this.persistedMobileViewKey());
    return t === "standard" || t === "ultra_compact" ? t : void 0;
  }
  persistedSortKey() {
    return `savant-breaker-board-sort:${this.config.title ?? "default"}`;
  }
  persistedMobileViewKey() {
    return `savant-breaker-board-mobile-view:${this.config.title ?? "default"}`;
  }
  setOptimisticSwitchState(t, e) {
    const s = this.optimisticResetTimers.get(t);
    s !== void 0 && (window.clearTimeout(s), this.optimisticResetTimers.delete(t)), this.optimisticSwitchStates = new Map(this.optimisticSwitchStates), this.optimisticSwitchStates.set(t, e);
  }
  clearOptimisticSwitchState(t) {
    const e = this.optimisticResetTimers.get(t);
    if (e !== void 0 && (window.clearTimeout(e), this.optimisticResetTimers.delete(t)), !this.optimisticSwitchStates.has(t)) return;
    const s = new Map(this.optimisticSwitchStates);
    s.delete(t), this.optimisticSwitchStates = s;
  }
  openSceneDialog(t) {
    t.stopPropagation(), this.sceneOpen = !0;
  }
  closeSceneDialog() {
    this.sceneOpen = !1;
  }
  renderSceneDialog() {
    return this.sceneOpen ? h`
      <savant-scene-dialog
        .hass=${this.hass}
        .breakers=${this.breakers}
        .stats=${this.stats}
        .batteryCapacityKwh=${this.scenesConfig.battery_capacity_kwh}
        .open=${this.sceneOpen}
        .stacked=${this.stacked}
        @savant-scene-close=${this.closeSceneDialog}
      ></savant-scene-dialog>
    ` : v;
  }
};
b.styles = [
  at,
  S`
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
        border: 1px solid color-mix(in srgb, var(--primary-text-color) 70%, var(--divider-color));
        border-radius: var(--savant-radius);
        color: var(--primary-text-color);
        background:
          linear-gradient(
            145deg,
            color-mix(in srgb, var(--savant-tile-bg) 84%, white),
            var(--savant-tile-bg)
          );
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 0.14),
          inset 0 0 0 1px color-mix(in srgb, var(--primary-text-color) 18%, transparent),
          0 0 0 1px color-mix(in srgb, var(--ha-card-background, var(--card-background-color)) 56%, white),
          0 2px 5px rgb(0 0 0 / 0.26);
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
        border-color: color-mix(in srgb, var(--primary-text-color) 82%, white);
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 0.2),
          inset 0 0 0 1px color-mix(in srgb, var(--primary-text-color) 30%, transparent),
          0 0 0 1px color-mix(in srgb, var(--primary-text-color) 36%, transparent),
          0 3px 6px rgb(0 0 0 / 0.3);
      }

      .chip-tool.active {
        border-color: color-mix(in srgb, var(--primary-color) 84%, var(--primary-text-color));
        box-shadow:
          inset 0 1px 0 rgb(255 255 255 / 0.2),
          inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 32%, transparent),
          0 0 0 1px color-mix(in srgb, var(--primary-color) 54%, transparent),
          0 3px 6px rgb(0 0 0 / 0.3);
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
  p({ attribute: !1 })
], b.prototype, "hass", 2);
x([
  g()
], b.prototype, "config", 2);
x([
  g()
], b.prototype, "breakers", 2);
x([
  g()
], b.prototype, "loading", 2);
x([
  g()
], b.prototype, "error", 2);
x([
  g()
], b.prototype, "stats", 2);
x([
  g()
], b.prototype, "pendingSwitches", 2);
x([
  g()
], b.prototype, "toggleErrors", 2);
x([
  g()
], b.prototype, "stacked", 2);
x([
  g()
], b.prototype, "sortMenuOpen", 2);
x([
  g()
], b.prototype, "sceneOpen", 2);
x([
  g()
], b.prototype, "searchOpen", 2);
x([
  g()
], b.prototype, "searchQuery", 2);
x([
  g()
], b.prototype, "runtimeSortBy", 2);
x([
  g()
], b.prototype, "runtimeMobileView", 2);
x([
  g()
], b.prototype, "optimisticSwitchStates", 2);
b = x([
  O("savant-energy-breaker-board-card")
], b);
const Ue = [
  { value: "circuit_number", label: "Circuit number" },
  { value: "name", label: "Name" },
  { value: "current_power_descending", label: "Current power" },
  { value: "highest_usage", label: "Highest usage" },
  { value: "manual", label: "Manual" }
];
function Ts(t, e, s, r = /* @__PURE__ */ new Map(), i = e.layout.sort_by) {
  return [...t].sort((a, o) => {
    var n, l;
    if (i === "name") return a.name.localeCompare(o.name);
    if (i === "current_power_descending") {
      const c = G(a.entities.power ? (n = s == null ? void 0 : s.states[a.entities.power]) == null ? void 0 : n.state : void 0) ?? -1 / 0;
      return (G(o.entities.power ? (l = s == null ? void 0 : s.states[o.entities.power]) == null ? void 0 : l.state : void 0) ?? -1 / 0) - c;
    }
    if (i === "highest_usage") {
      const c = Ve(a, r, s);
      return Ve(o, r, s) - c || a.name.localeCompare(o.name);
    }
    return i === "manual" ? 0 : (a.circuitNumber ?? 9999) - (o.circuitNumber ?? 9999) || a.name.localeCompare(o.name);
  });
}
function Ve(t, e, s) {
  var i, a;
  const r = t.entities.power;
  return r ? ((i = e.get(r)) == null ? void 0 : i.averageWatts) ?? G((a = s == null ? void 0 : s.states[r]) == null ? void 0 : a.state) ?? -1 / 0 : -1 / 0;
}
function Ds(t, e) {
  if (e.layout.group_by === "none") return [["", t]];
  const s = /* @__PURE__ */ new Map();
  for (const r of t) {
    const i = e.layout.group_by === "panel_then_area" ? [r.panelName, r.areaName].filter(Boolean).join(" / ") || "Other" : e.layout.group_by === "area" ? r.areaName || "Other" : r.panelName || "Other";
    s.set(i, [...s.get(i) ?? [], r]);
  }
  return [...s.entries()];
}
function dt(t, e) {
  if (Array.isArray(t))
    return t.length ? t : void 0;
  if (t && typeof t == "object") {
    const s = {};
    for (const [r, i] of Object.entries(t)) {
      const a = dt(i, e == null ? void 0 : e[r]);
      a !== void 0 && (s[r] = a);
    }
    return Object.keys(s).length ? s : void 0;
  }
  return t === e ? void 0 : t;
}
function pt(t) {
  const e = se(t);
  return {
    type: "custom:savant-energy-breaker-board-card",
    ...dt(e, C) ?? {}
  };
}
function Hs(t, e) {
  const s = structuredClone(t);
  return delete s.breaker_overrides[e], pt(s);
}
var zs = Object.defineProperty, js = Object.getOwnPropertyDescriptor, H = (t, e, s, r) => {
  for (var i = r > 1 ? void 0 : r ? js(e, s) : e, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (i = (r ? o(e, s, i) : o(i)) || i);
  return r && i && zs(e, s, i), i;
};
let M = class extends _ {
  constructor() {
    super(...arguments), this.config = C, this.breakers = [], this.filter = "", this.loading = !1, this.discoveryError = "", this.expandedBreakers = /* @__PURE__ */ new Set(), this.discoveryLoaded = !1, this.discovery = new lt();
  }
  setConfig(t) {
    this.config = se(t), this.loadBreakers();
  }
  updated(t) {
    t.has("hass") && this.loadBreakers();
  }
  render() {
    const t = this.breakers.filter(
      (e) => e.name.toLowerCase().includes(this.filter.toLowerCase())
    );
    return h`
      <div class="editor">
        <section>
          <h3>Board</h3>
          ${this.textInput("Title", this.config.title ?? "", (e) => this.patch({ title: e || void 0 }))}
          ${this.switch(
      "Show title section",
      this.config.display.show_title,
      (e) => this.patch({ display: { ...this.config.display, show_title: e } })
    )}
          ${this.switch(
      "Auto-discovery",
      this.config.discovery.enabled,
      (e) => this.patch({ discovery: { ...this.config.discovery, enabled: e } })
    )}
          ${this.switch(
      "Ultra-compact mobile view",
      this.config.layout.mobile_view === "ultra_compact",
      (e) => this.patch({ layout: { ...this.config.layout, mobile_view: e ? "ultra_compact" : "standard" } })
    )}
          ${this.switch(
      "Group by breaker type",
      this.config.layout.group_by !== "none",
      (e) => this.patch({ layout: { ...this.config.layout, group_by: e ? "panel" : "none" } })
    )}
          ${this.select(
      "Sort",
      this.config.layout.sort_by,
      ["circuit_number", "name", "current_power_descending", "highest_usage", "manual"],
      (e) => this.patch({ layout: { ...this.config.layout, sort_by: e } })
    )}
          ${this.select(
      "Density",
      this.config.layout.density,
      ["comfortable", "compact"],
      (e) => this.patch({ layout: { ...this.config.layout, density: e } })
    )}
          ${this.select(
      "Graph period",
      this.config.graph.period,
      ["1h", "6h", "12h", "24h", "7d"],
      (e) => this.patch({ graph: { ...this.config.graph, period: e } })
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
      ([e, s]) => this.switch(
        s,
        this.config.display[e],
        (r) => this.patch({ display: { ...this.config.display, [e]: r } })
      )
    )}
          ${this.select(
      "Control safety",
      this.config.controls.default_mode,
      ["hidden", "hold", "hold_confirm_off"],
      (e) => this.patch({ controls: { ...this.config.controls, default_mode: e } })
    )}
          ${this.numberInput(
      "Yellow chart threshold (W)",
      this.config.controls.warning_load_threshold_watts ?? 1e3,
      (e) => this.patch({ controls: { ...this.config.controls, warning_load_threshold_watts: e } })
    )}
          ${this.numberInput(
      "Orange chart threshold (W)",
      this.config.controls.high_load_threshold_watts ?? 2e3,
      (e) => this.patch({ controls: { ...this.config.controls, high_load_threshold_watts: e } })
    )}
        </section>

        <section>
          <div class="section-head">
            <h3>Discovered breakers</h3>
            <button class="refresh" ?disabled=${this.loading || !this.hass} @click=${() => this.loadBreakers(!0)}>
              ${this.loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          ${this.textInput("Search breakers", this.filter, (e) => this.filter = e, !1)}
          ${this.discoveryError ? h`<div class="error">${this.discoveryError}</div>` : v}
          ${this.loading ? h`<div class="loading">Loading discovered breakers...</div>` : v}
          ${!this.loading && !t.length ? h`<div class="loading">${this.discoveryLoaded ? "No discovered breakers found." : "Discovery will run once when Home Assistant is ready."}</div>` : v}
          ${t.map((e) => this.renderBreakerEditor(e))}
        </section>
      </div>
    `;
  }
  renderBreakerEditor(t) {
    var o, n;
    const e = this.config.excluded_breakers.includes(t.id), s = this.config.breaker_overrides[t.id] ?? {}, r = this.expandedBreakers.has(t.id), i = t.entities.power ? G((n = (o = this.hass) == null ? void 0 : o.states[t.entities.power]) == null ? void 0 : n.state) : void 0, a = Object.entries(t.entities).filter(([, l]) => l).map(([l, c]) => `${l}: ${c}`).join(", ");
    return h`
      <article class=${e ? "breaker excluded" : "breaker"}>
        <div class="breaker-head" @click=${() => this.toggleExpanded(t.id)}>
          <div>
            <strong>${s.label || t.name}</strong>
          </div>
          <span class="breaker-actions">
            ${this.switch("Shown", !e, (l) => this.setExcluded(t.id, !l))}
            <span class="chevron">${r ? "Collapse" : "Expand"}</span>
          </span>
        </div>
        ${r ? h`
              <div class="breaker-details">
                <span>${he(i)} - ${t.available ? "available" : "unavailable"}</span>
                <small>${a || "No associated entities"}</small>
              </div>
              ${this.textInput(
      "Custom label",
      s.label ?? "",
      (l) => this.setOverride(t.id, { ...s, label: l || void 0 })
    )}
              <div class="override-grid">
                ${["show_current_power", "show_average_power", "show_maximum_power", "show_energy", "show_sparkline", "show_icon", "show_controls"].map(
      (l) => this.tristate(
        l.replaceAll("_", " "),
        s[l],
        (c) => this.setOverride(t.id, { ...s, [l]: c })
      )
    )}
              </div>
              ${this.select(
      "Control mode",
      s.control_mode ?? "default",
      ["default", "hidden", "hold", "hold_confirm_off"],
      (l) => this.setOverride(t.id, {
        ...s,
        control_mode: l === "default" ? void 0 : l
      })
    )}
              <button class="reset" @click=${() => this.resetOverride(t.id)}>Reset to defaults</button>
            ` : v}
      </article>
    `;
  }
  async loadBreakers(t = !1) {
    if (!(!this.hass || !t && (this.discoveryLoaded || this.loading))) {
      this.loading = !0, this.discoveryError = "";
      try {
        this.breakers = await this.discovery.discover(this.hass, this.config), this.discoveryLoaded = !0;
      } catch (e) {
        this.discoveryError = e instanceof Error ? e.message : "Discovery failed";
      } finally {
        this.loading = !1;
      }
    }
  }
  patch(t) {
    this.config = se({ ...this.config, ...t }), ne(this, "config-changed", { config: pt(this.config) });
  }
  setExcluded(t, e) {
    const s = new Set(this.config.excluded_breakers);
    e ? s.add(t) : s.delete(t), this.patch({ excluded_breakers: [...s] });
  }
  setOverride(t, e) {
    const s = Object.fromEntries(Object.entries(e).filter(([, r]) => r !== void 0 && r !== ""));
    this.patch({ breaker_overrides: { ...this.config.breaker_overrides, [t]: s } });
  }
  resetOverride(t) {
    const e = Hs(this.config, t);
    this.config = se(e), ne(this, "config-changed", { config: e });
  }
  toggleExpanded(t) {
    const e = new Set(this.expandedBreakers);
    e.has(t) ? e.delete(t) : e.add(t), this.expandedBreakers = e;
  }
  textInput(t, e, s, r = !0) {
    return h`<label><span>${t}</span><input .value=${e} @input=${(i) => s(i.target.value)} @change=${r ? (i) => s(i.target.value) : void 0} /></label>`;
  }
  checkbox(t, e, s) {
    return h`<label class="check"><input type="checkbox" .checked=${e} @change=${(r) => s(r.target.checked)} /> <span>${t}</span></label>`;
  }
  switch(t, e, s) {
    return h`
      <label class="switch" @click=${(r) => r.stopPropagation()}>
        <input type="checkbox" .checked=${e} @change=${(r) => s(r.target.checked)} />
        <span class="switch-track" aria-hidden="true"></span>
        <span>${t}</span>
      </label>
    `;
  }
  select(t, e, s, r) {
    return h`<label><span>${t}</span><select .value=${e} @change=${(i) => r(i.target.value)}>${s.map((i) => h`<option value=${i}>${i}</option>`)}</select></label>`;
  }
  numberInput(t, e, s) {
    return h`<label><span>${t}</span><input type="number" min="0" step="100" .value=${String(e)} @change=${(r) => s(Number(r.target.value) || 0)} /></label>`;
  }
  tristate(t, e, s) {
    const r = e === void 0 ? "default" : String(e);
    return this.select(
      t,
      r,
      ["default", "true", "false"],
      (i) => s(i === "default" ? void 0 : i === "true")
    );
  }
};
M.styles = S`
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
H([
  p({ attribute: !1 })
], M.prototype, "hass", 2);
H([
  g()
], M.prototype, "config", 2);
H([
  g()
], M.prototype, "breakers", 2);
H([
  g()
], M.prototype, "filter", 2);
H([
  g()
], M.prototype, "loading", 2);
H([
  g()
], M.prototype, "discoveryError", 2);
H([
  g()
], M.prototype, "expandedBreakers", 2);
M = H([
  O("savant-energy-breaker-board-card-editor")
], M);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "savant-energy-breaker-board-card",
  name: "Savant Energy Breaker Board",
  description: "Discover and control Savant Energy breaker/circuit power data.",
  preview: !0,
  documentationURL: "https://github.com/brett/savant-energy-breaker-board-card"
});
//# sourceMappingURL=Savant-Card.js.map
