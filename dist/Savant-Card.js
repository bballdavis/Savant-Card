/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = globalThis, vt = et.ShadowRoot && (et.ShadyCSS === void 0 || et.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, bt = Symbol(), kt = /* @__PURE__ */ new WeakMap();
let Ut = class {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== bt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (vt && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = kt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && kt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const se = (s) => new Ut(typeof s == "string" ? s : s + "", void 0, bt), x = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((r, i, a) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[a + 1], s[0]);
  return new Ut(e, s, bt);
}, re = (s, t) => {
  if (vt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const r = document.createElement("style"), i = et.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = e.cssText, s.appendChild(r);
  }
}, St = vt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules) e += r.cssText;
  return se(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ie, defineProperty: ae, getOwnPropertyDescriptor: oe, getOwnPropertyNames: ne, getOwnPropertySymbols: le, getPrototypeOf: ce } = Object, M = globalThis, At = M.trustedTypes, he = At ? At.emptyScript : "", pt = M.reactiveElementPolyfillSupport, G = (s, t) => s, it = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? he : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, yt = (s, t) => !ie(s, t), Et = { attribute: !0, type: String, converter: it, reflect: !1, useDefault: !1, hasChanged: yt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), M.litPropertyMetadata ?? (M.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let U = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Et) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(t, r, e);
      i !== void 0 && ae(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    const { get: i, set: a } = oe(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const n = i == null ? void 0 : i.call(this);
      a == null || a.call(this, o), this.requestUpdate(t, n, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Et;
  }
  static _$Ei() {
    if (this.hasOwnProperty(G("elementProperties"))) return;
    const t = ce(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(G("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(G("properties"))) {
      const e = this.properties, r = [...ne(e), ...le(e)];
      for (const i of r) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [r, i] of e) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, r] of this.elementProperties) {
      const i = this._$Eu(e, r);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const i of r) e.unshift(St(i));
    } else t !== void 0 && e.push(St(t));
    return e;
  }
  static _$Eu(t, e) {
    const r = e.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const r of e.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return re(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var r;
      return (r = e.hostConnected) == null ? void 0 : r.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var r;
      return (r = e.hostDisconnected) == null ? void 0 : r.call(e);
    });
  }
  attributeChangedCallback(t, e, r) {
    this._$AK(t, r);
  }
  _$ET(t, e) {
    var a;
    const r = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, r);
    if (i !== void 0 && r.reflect === !0) {
      const o = (((a = r.converter) == null ? void 0 : a.toAttribute) !== void 0 ? r.converter : it).toAttribute(e, r.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var a, o;
    const r = this.constructor, i = r._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = r.getPropertyOptions(i), l = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((a = n.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? n.converter : it;
      this._$Em = i;
      const c = l.fromAttribute(e, n.type);
      this[i] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, r, i = !1, a) {
    var o;
    if (t !== void 0) {
      const n = this.constructor;
      if (i === !1 && (a = this[t]), r ?? (r = n.getPropertyOptions(t)), !((r.hasChanged ?? yt)(a, e) || r.useDefault && r.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(n._$Eu(t, r)))) return;
      this.C(t, e, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: r, reflect: i, wrapped: a }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), a !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (r = this._$EO) == null || r.forEach((i) => {
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
    (e = this._$EO) == null || e.forEach((r) => {
      var i;
      return (i = r.hostUpdated) == null ? void 0 : i.call(r);
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
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[G("elementProperties")] = /* @__PURE__ */ new Map(), U[G("finalized")] = /* @__PURE__ */ new Map(), pt == null || pt({ ReactiveElement: U }), (M.reactiveElementVersions ?? (M.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, Pt = (s) => s, at = Z.trustedTypes, Ct = at ? at.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Rt = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, It = "?" + C, de = `<${It}>`, z = document, K = () => z.createComment(""), X = (s) => s === null || typeof s != "object" && typeof s != "function", _t = Array.isArray, pe = (s) => _t(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", ut = `[ 	
\f\r]`, V = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ot = /-->/g, Mt = />/g, B = RegExp(`>|${ut}(?:([^\\s"'>=/]+)(${ut}*=${ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Lt = /'/g, Nt = /"/g, Ft = /^(?:script|style|textarea|title)$/i, Wt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), h = Wt(1), st = Wt(2), R = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Bt = /* @__PURE__ */ new WeakMap(), D = z.createTreeWalker(z, 129);
function Vt(s, t) {
  if (!_t(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ct !== void 0 ? Ct.createHTML(t) : t;
}
const ue = (s, t) => {
  const e = s.length - 1, r = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = V;
  for (let n = 0; n < e; n++) {
    const l = s[n];
    let c, p, d = -1, m = 0;
    for (; m < l.length && (o.lastIndex = m, p = o.exec(l), p !== null); ) m = o.lastIndex, o === V ? p[1] === "!--" ? o = Ot : p[1] !== void 0 ? o = Mt : p[2] !== void 0 ? (Ft.test(p[2]) && (i = RegExp("</" + p[2], "g")), o = B) : p[3] !== void 0 && (o = B) : o === B ? p[0] === ">" ? (o = i ?? V, d = -1) : p[1] === void 0 ? d = -2 : (d = o.lastIndex - p[2].length, c = p[1], o = p[3] === void 0 ? B : p[3] === '"' ? Nt : Lt) : o === Nt || o === Lt ? o = B : o === Ot || o === Mt ? o = V : (o = B, i = void 0);
    const f = o === B && s[n + 1].startsWith("/>") ? " " : "";
    a += o === V ? l + de : d >= 0 ? (r.push(c), l.slice(0, d) + Rt + l.slice(d) + C + f) : l + C + (d === -2 ? n : f);
  }
  return [Vt(s, a + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class J {
  constructor({ strings: t, _$litType$: e }, r) {
    let i;
    this.parts = [];
    let a = 0, o = 0;
    const n = t.length - 1, l = this.parts, [c, p] = ue(t, e);
    if (this.el = J.createElement(c, r), D.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = D.nextNode()) !== null && l.length < n; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(Rt)) {
          const m = p[o++], f = i.getAttribute(d).split(C), v = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: a, name: v[2], strings: f, ctor: v[1] === "." ? fe : v[1] === "?" ? me : v[1] === "@" ? ve : ht }), i.removeAttribute(d);
        } else d.startsWith(C) && (l.push({ type: 6, index: a }), i.removeAttribute(d));
        if (Ft.test(i.tagName)) {
          const d = i.textContent.split(C), m = d.length - 1;
          if (m > 0) {
            i.textContent = at ? at.emptyScript : "";
            for (let f = 0; f < m; f++) i.append(d[f], K()), D.nextNode(), l.push({ type: 2, index: ++a });
            i.append(d[m], K());
          }
        }
      } else if (i.nodeType === 8) if (i.data === It) l.push({ type: 2, index: a });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(C, d + 1)) !== -1; ) l.push({ type: 7, index: a }), d += C.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const r = z.createElement("template");
    return r.innerHTML = t, r;
  }
}
function I(s, t, e = s, r) {
  var o, n;
  if (t === R) return t;
  let i = r !== void 0 ? (o = e._$Co) == null ? void 0 : o[r] : e._$Cl;
  const a = X(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== a && ((n = i == null ? void 0 : i._$AO) == null || n.call(i, !1), a === void 0 ? i = void 0 : (i = new a(s), i._$AT(s, e, r)), r !== void 0 ? (e._$Co ?? (e._$Co = []))[r] = i : e._$Cl = i), i !== void 0 && (t = I(s, i._$AS(s, t.values), i, r)), t;
}
class ge {
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
    const { el: { content: e }, parts: r } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? z).importNode(e, !0);
    D.currentNode = i;
    let a = D.nextNode(), o = 0, n = 0, l = r[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new tt(a, a.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (c = new be(a, this, t)), this._$AV.push(c), l = r[++n];
      }
      o !== (l == null ? void 0 : l.index) && (a = D.nextNode(), o++);
    }
    return D.currentNode = z, i;
  }
  p(t) {
    let e = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class tt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, r, i) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = I(this, t, e), X(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== R && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : pe(t) ? this.k(t) : this._(t);
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
    const { values: e, _$litType$: r } = t, i = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = J.createElement(Vt(r.h, r.h[0]), this.options)), r);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === i) this._$AH.p(e);
    else {
      const o = new ge(i, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Bt.get(t.strings);
    return e === void 0 && Bt.set(t.strings, e = new J(t)), e;
  }
  k(t) {
    _t(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, i = 0;
    for (const a of t) i === e.length ? e.push(r = new tt(this.O(K()), this.O(K()), this, this.options)) : r = e[i], r._$AI(a), i++;
    i < e.length && (this._$AR(r && r._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = Pt(t).nextSibling;
      Pt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class ht {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, r, i, a) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = a, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = g;
  }
  _$AI(t, e = this, r, i) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = I(this, t, e, 0), o = !X(t) || t !== this._$AH && t !== R, o && (this._$AH = t);
    else {
      const n = t;
      let l, c;
      for (t = a[0], l = 0; l < a.length - 1; l++) c = I(this, n[r + l], e, l), c === R && (c = this._$AH[l]), o || (o = !X(c) || c !== this._$AH[l]), c === g ? t = g : t !== g && (t += (c ?? "") + a[l + 1]), this._$AH[l] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class fe extends ht {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class me extends ht {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class ve extends ht {
  constructor(t, e, r, i, a) {
    super(t, e, r, i, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = I(this, t, e, 0) ?? g) === R) return;
    const r = this._$AH, i = t === g && r !== g || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, a = t !== g && (r === g || i);
    i && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class be {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    I(this, t);
  }
}
const gt = Z.litHtmlPolyfillSupport;
gt == null || gt(J, tt), (Z.litHtmlVersions ?? (Z.litHtmlVersions = [])).push("3.3.3");
const ye = (s, t, e) => {
  const r = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = r._$litPart$;
  if (i === void 0) {
    const a = (e == null ? void 0 : e.renderBefore) ?? null;
    r._$litPart$ = i = new tt(t.insertBefore(K(), a), a, void 0, e ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis;
class y extends U {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ye(e, this.renderRoot, this.renderOptions);
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
    return R;
  }
}
var Ht;
y._$litElement$ = !0, y.finalized = !0, (Ht = T.litElementHydrateSupport) == null || Ht.call(T, { LitElement: y });
const ft = T.litElementPolyfillSupport;
ft == null || ft({ LitElement: y });
(T.litElementVersions ?? (T.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _e = { attribute: !0, type: String, converter: it, reflect: !1, hasChanged: yt }, we = (s = _e, t, e) => {
  const { kind: r, metadata: i } = e;
  let a = globalThis.litPropertyMetadata.get(i);
  if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((s = Object.create(s)).wrapped = !0), a.set(e.name, s), r === "accessor") {
    const { name: o } = e;
    return { set(n) {
      const l = t.get.call(this);
      t.set.call(this, n), this.requestUpdate(o, l, s, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(o, void 0, s, n), n;
    } };
  }
  if (r === "setter") {
    const { name: o } = e;
    return function(n) {
      const l = this[o];
      t.call(this, n), this.requestUpdate(o, l, s, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function u(s) {
  return (t, e) => typeof e == "object" ? we(s, t, e) : ((r, i, a) => {
    const o = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, r), o ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(s) {
  return u({ ...s, state: !0, attribute: !1 });
}
var xe = Object.defineProperty, $e = Object.getOwnPropertyDescriptor, wt = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? $e(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && xe(t, e, i), i;
};
let Q = class extends y {
  constructor() {
    super(...arguments), this.points = [], this.state = "normal";
  }
  render() {
    const s = ke(this.points), t = s ?? Se(), e = !s;
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
Q.styles = x`
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
wt([
  u({ attribute: !1 })
], Q.prototype, "points", 2);
wt([
  u({ type: String, reflect: !0 })
], Q.prototype, "state", 2);
Q = wt([
  A("savant-sparkline")
], Q);
function ke(s) {
  const t = s.map((a) => a.value).filter(Number.isFinite);
  if (!t.length) return;
  if (t.every((a) => Math.max(0, a) === 0)) return Ae(t.length);
  if (t.length === 1) {
    const a = Dt(t[0], Tt(t)), o = Math.max(0, t[0]);
    return {
      path: `M 0 ${a} L 100 ${a}`,
      fillPath: o > 0 ? `M 0 ${a} L 100 ${a} L 100 36 L 0 36 Z` : ""
    };
  }
  const e = Tt(t), r = t.map((a, o) => {
    const n = o / (t.length - 1) * 100, l = Math.max(0, a);
    return [n, l === 0 ? L : Dt(a, e), l];
  });
  return {
    path: Pe(r),
    fillPath: Ce(r)
  };
}
function Dt(s, t) {
  return L - Math.max(0, s) / t * (L - Ee);
}
function Tt(s) {
  return Math.max(1, ...s) * 1.25;
}
function Se() {
  return {
    path: `M 0 ${L} L 100 ${L}`,
    fillPath: ""
  };
}
function Ae(s) {
  return s <= 1 ? {
    path: `M 0 ${L} L 100 ${L}`,
    fillPath: ""
  } : { path: Array.from({ length: s }, (e, r) => {
    const i = r / (s - 1) * 100;
    return `${r === 0 ? "M" : "L"} ${i.toFixed(2)} ${L.toFixed(2)}`;
  }).join(" "), fillPath: "" };
}
const Ee = 5, L = 33;
function Pe(s) {
  if (s.every(([, , e]) => e === 0))
    return s.map(([e, r], i) => `${i === 0 ? "M" : "L"} ${e.toFixed(2)} ${r.toFixed(2)}`).join(" ");
  const t = [];
  for (let e = 1; e < s.length; e += 1) {
    const r = s[e - 1], i = s[e];
    t.push(`M ${r[0].toFixed(2)} ${r[1].toFixed(2)} L ${i[0].toFixed(2)} ${i[1].toFixed(2)}`);
  }
  return t.join(" ");
}
function Ce(s) {
  const t = [];
  for (let e = 1; e < s.length; e += 1) {
    const r = s[e - 1], i = s[e];
    r[2] === 0 && i[2] === 0 || t.push(
      [
        `M ${r[0].toFixed(2)} ${r[1].toFixed(2)}`,
        `L ${i[0].toFixed(2)} ${i[1].toFixed(2)}`,
        `L ${i[0].toFixed(2)} 36`,
        `L ${r[0].toFixed(2)} 36`,
        "Z"
      ].join(" ")
    );
  }
  return t.join(" ");
}
var Oe = Object.defineProperty, Me = Object.getOwnPropertyDescriptor, dt = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? Me(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && Oe(t, e, i), i;
};
let F = class extends y {
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
F.styles = x`
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
dt([
  u({ type: String })
], F.prototype, "avg", 2);
dt([
  u({ type: String })
], F.prototype, "max", 2);
dt([
  u({ type: Boolean, reflect: !0 })
], F.prototype, "stacked", 2);
F = dt([
  A("savant-metric-row")
], F);
function ot(s, t, e) {
  s.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}
var Le = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, qt = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? Ne(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && Le(t, e, i), i;
};
const zt = {
  flash: "M7,2V13H10V22L17,10H13L17,2H7Z",
  power: "M13,3H11V13H13V3M17.83,5.17L16.41,6.59C17.99,7.86 19,9.81 19,12A7,7 0 0,1 12,19A7,7 0 0,1 5,12C5,9.81 6.01,7.86 7.59,6.59L6.17,5.17C4.23,6.82 3,9.26 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12C21,9.26 19.77,6.82 17.83,5.17Z"
};
let nt = class extends y {
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
nt.styles = x`
    :host {
      display: inline-grid;
      place-items: center;
      width: 1em;
      height: 1em;
      line-height: 1;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  `;
qt([
  u({ type: String })
], nt.prototype, "icon", 2);
nt = qt([
  A("savant-icon")
], nt);
var Be = Object.defineProperty, De = Object.getOwnPropertyDescriptor, P = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? De(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && Be(t, e, i), i;
};
let $ = class extends y {
  constructor() {
    super(...arguments), this.breakerId = "", this.label = "breaker", this.switchState = "off", this.mode = "hold_confirm_off", this.disabled = !1, this.pending = !1, this.holding = !1, this.progress = 0, this.startedAt = 0, this.holdMs = 900, this.cancelHold = () => {
      window.clearTimeout(this.timer), this.holding = !1, this.progress = 0;
    };
  }
  render() {
    const s = this.disabled ? `${this.label} breaker unavailable` : `Hold to ${this.switchState === "on" ? "turn off" : "turn on"} ${this.label} breaker`;
    return h`
      <button
        aria-label=${s}
        title=${s}
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
  preventClick(s) {
    s.stopPropagation(), s.preventDefault();
  }
  onPointerDown(s) {
    s.stopPropagation(), !(this.disabled || this.pending) && (this.holding = !0, this.startedAt = performance.now(), this.tick());
  }
  onPointerUp(s) {
    s.stopPropagation(), this.holding && (performance.now() - this.startedAt >= this.holdMs && this.requestToggle(), this.cancelHold());
  }
  tick() {
    const s = performance.now() - this.startedAt;
    this.progress = Math.min(1, s / this.holdMs), !(this.progress >= 1) && (this.timer = window.setTimeout(() => this.tick(), 16));
  }
  requestToggle() {
    ot(this, "savant-breaker-toggle", { breakerId: this.breakerId });
  }
};
$.styles = x`
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
], $.prototype, "breakerId", 2);
P([
  u({ type: String })
], $.prototype, "label", 2);
P([
  u({ type: String })
], $.prototype, "switchState", 2);
P([
  u({ type: String })
], $.prototype, "mode", 2);
P([
  u({ type: Boolean })
], $.prototype, "disabled", 2);
P([
  u({ type: Boolean })
], $.prototype, "pending", 2);
P([
  b()
], $.prototype, "holding", 2);
P([
  b()
], $.prototype, "progress", 2);
$ = P([
  A("savant-hold-control-button")
], $);
function W(s) {
  const t = typeof s == "number" ? s : Number(s);
  return Number.isFinite(t) ? t : void 0;
}
function rt(s) {
  if (s === void 0 || !Number.isFinite(s)) return "--";
  const t = Math.abs(s);
  return t >= 1e3 ? `${Te(s / 1e3, t >= 1e4 ? 1 : 2)} kW` : `${Math.round(s)} W`;
}
function Te(s, t) {
  return s.toLocaleString(void 0, {
    maximumFractionDigits: t,
    minimumFractionDigits: 0
  });
}
function ze(s, t = "kWh") {
  return s === void 0 || !Number.isFinite(s) ? "--" : `${s.toLocaleString(void 0, { maximumFractionDigits: 2 })} ${t}`;
}
var je = Object.defineProperty, He = Object.getOwnPropertyDescriptor, k = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? He(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && je(t, e, i), i;
};
let _ = class extends y {
  constructor() {
    super(...arguments), this.highLoadThresholdWatts = 3500, this.graphLoading = !1, this.pending = !1, this.stacked = !1, this.mobileLayout = "standard", this.error = "";
  }
  render() {
    var l, c, p, d, m, f, v;
    const s = this.runtimeState(), t = this.visualState(s.powerWatts, s.switchState, s.available), e = this.stacked && this.mobileLayout === "ultra_compact", r = this.display.show_area ? this.breaker.areaName : void 0, i = t === "off" ? Re((l = this.statistics) == null ? void 0 : l.points.length) : ((c = this.statistics) == null ? void 0 : c.points) ?? [], a = !!((p = this.statistics) != null && p.points.length), o = !e && a && (((d = this.statistics) == null ? void 0 : d.averageWatts) !== void 0 || ((m = this.statistics) == null ? void 0 : m.maximumWatts) !== void 0), n = this.display.show_controls && this.display.control_mode !== "hidden" && this.breaker.controllable && !!this.breaker.entities.switch;
    return h`
      <button class=${`tile ${t} ${this.pending ? "pending" : ""} ${e ? "ultra-compact" : ""}`} @click=${this.openMoreInfo}>
        <span class="mobile-bar" aria-hidden="true"></span>
        <span class="topline">
          <span class="state-dot" aria-hidden="true"></span>
          ${this.display.show_state ? h`<span class="state-text">${Ue(t, s.switchState)}</span>` : ""}
          ${this.display.show_icon ? this.renderEntityIcon() : ""}
        </span>
        <span class="name">${this.display.label}</span>
        ${r && !e ? h`<span class="subtitle">${r}</span>` : ""}
        <span class="power">${this.display.show_current_power ? rt(s.powerWatts) : ""}</span>
        <span class="graph">
          ${this.graphLoading && t !== "off" ? this.renderGraphSkeleton() : this.display.show_sparkline ? h`<savant-sparkline
                  .points=${i}
                  .state=${!a || t === "unavailable" || t === "off" ? "muted" : t === "high_load" ? "warning" : "normal"}
                ></savant-sparkline>` : ""}
        </span>
        <span class="metrics">
          ${o && (this.display.show_average_power || this.display.show_maximum_power) ? h`<savant-metric-row
                .avg=${this.display.show_average_power ? rt((f = this.statistics) == null ? void 0 : f.averageWatts) : "--"}
                .max=${this.display.show_maximum_power ? rt((v = this.statistics) == null ? void 0 : v.maximumWatts) : "--"}
                ?stacked=${this.stacked}
              ></savant-metric-row>` : ""}
          ${this.display.show_energy ? h`<span class="energy">${ze(s.energyValue)}</span>` : ""}
        </span>
        ${this.error ? h`<span class="feedback">${this.error}</span>` : ""}
        ${n ? h`<savant-hold-control-button
              class="control"
              .breakerId=${this.breaker.id}
              .label=${this.display.label}
              .mode=${this.display.control_mode === "hold" ? "hold" : "hold_confirm_off"}
              .switchState=${s.switchState ?? "off"}
              .pending=${this.pending}
              ?disabled=${!s.available}
            ></savant-hold-control-button>` : ""}
      </button>
    `;
  }
  renderEntityIcon() {
    var e, r;
    const s = this.breaker.entities.power, t = s ? (r = (e = this.hass) == null ? void 0 : e.states[s]) == null ? void 0 : r.attributes.icon : void 0;
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
    var n, l, c, p, d, m, f, v, xt, $t;
    const s = this.breaker.entities.power, t = this.breaker.entities.energy, e = this.breaker.entities.switch, r = s ? W((l = (n = this.hass) == null ? void 0 : n.states[s]) == null ? void 0 : l.state) : void 0, i = t ? W((p = (c = this.hass) == null ? void 0 : c.states[t]) == null ? void 0 : p.state) : void 0, a = e ? (m = (d = this.hass) == null ? void 0 : d.states[e]) == null ? void 0 : m.state : void 0, o = this.breaker.available && (!s || ((v = (f = this.hass) == null ? void 0 : f.states[s]) == null ? void 0 : v.state) !== "unavailable") && (!e || (($t = (xt = this.hass) == null ? void 0 : xt.states[e]) == null ? void 0 : $t.state) !== "unavailable");
    return { powerWatts: r, energyValue: i, switchState: a, available: o };
  }
  visualState(s, t, e = !0) {
    return this.error ? "error" : this.pending ? "pending" : e ? t === "off" || s === 0 ? "off" : s !== void 0 && s >= this.highLoadThresholdWatts ? "high_load" : "on" : "unavailable";
  }
  openMoreInfo(s) {
    if (s.target.closest("savant-hold-control-button")) return;
    const e = this.breaker.entities.power ?? this.breaker.entities.switch ?? this.breaker.entities.energy;
    e && ot(this, "hass-action", {
      config: {
        entity: e,
        tap_action: { action: "more-info" }
      },
      action: "tap"
    });
  }
};
_.styles = x`
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

    .tile.high_load {
      --status-color: var(--savant-warning);
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

    .tile.on .power {
      color: var(--savant-tile-fg);
    }

    .graph {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 58px;
      top: 136px;
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
      right: 148px;
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
], _.prototype, "hass", 2);
k([
  u({ attribute: !1 })
], _.prototype, "breaker", 2);
k([
  u({ attribute: !1 })
], _.prototype, "display", 2);
k([
  u({ attribute: !1 })
], _.prototype, "statistics", 2);
k([
  u({ type: Number })
], _.prototype, "highLoadThresholdWatts", 2);
k([
  u({ type: Boolean })
], _.prototype, "graphLoading", 2);
k([
  u({ type: Boolean })
], _.prototype, "pending", 2);
k([
  u({ type: Boolean, reflect: !0 })
], _.prototype, "stacked", 2);
k([
  u({ type: String, attribute: "mobile-layout", reflect: !0 })
], _.prototype, "mobileLayout", 2);
k([
  u({ type: String })
], _.prototype, "error", 2);
_ = k([
  A("savant-breaker-tile")
], _);
function Ue(s, t) {
  return s === "unavailable" ? "Unavailable" : t === "off" || s === "off" ? "Off" : "On";
}
function Re(s = 2) {
  return Array.from({ length: Math.max(2, s) }, (t, e) => ({
    start: e,
    value: 0
  }));
}
const Ie = x`
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
var Fe = Object.defineProperty, We = Object.getOwnPropertyDescriptor, Gt = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? We(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && Fe(t, e, i), i;
};
let lt = class extends y {
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
lt.styles = [
  Ie,
  x`
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
Gt([
  u({ type: Boolean, reflect: !0 })
], lt.prototype, "stacked", 2);
lt = Gt([
  A("savant-breaker-tile-skeleton")
], lt);
var Ve = Object.getOwnPropertyDescriptor, qe = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? Ve(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = o(i) || i);
  return i;
};
let mt = class extends y {
  render() {
    return h`
      <div class="empty">
        <strong>No Savant breaker entities discovered.</strong>
        <span>Open the card editor to add manual mappings or check Savant Energy entity metadata.</span>
      </div>
    `;
  }
};
mt.styles = x`
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
mt = qe([
  A("savant-board-empty-state")
], mt);
var Ge = Object.defineProperty, Ze = Object.getOwnPropertyDescriptor, Zt = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? Ze(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && Ge(t, e, i), i;
};
let ct = class extends y {
  constructor() {
    super(...arguments), this.message = "Unable to load breaker board.";
  }
  render() {
    return h`<div class="error">${this.message}</div>`;
  }
};
ct.styles = x`
    .error {
      padding: 16px;
      border-radius: var(--savant-radius);
      color: var(--error-color);
      background: color-mix(in srgb, var(--error-color) 12%, transparent);
    }
  `;
Zt([
  u({ type: String })
], ct.prototype, "message", 2);
ct = Zt([
  A("savant-board-error-state")
], ct);
class Ye {
  constructor(t) {
    this.manualBreakers = t;
  }
  async discover(t) {
    return this.manualBreakers.map((e) => {
      const r = {
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
        entities: r,
        available: Object.values(r).some(
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
function Yt(s, t) {
  const e = s.split(".")[0], r = t == null ? void 0 : t.attributes.device_class;
  if (e === "switch") return "switch";
  if (e === "sensor") {
    if (r === "power") return "power";
    if (r === "energy") return "energy";
    if (r === "voltage") return "voltage";
    if (r === "current") return "current";
  }
}
function Ke(s) {
  var o;
  const t = new Map(s.devices.map((n) => [n.id, n])), e = new Map(s.areas.map((n) => [n.area_id, n.name])), r = /* @__PURE__ */ new Map(), i = [];
  for (const n of s.entities)
    if (!(n.disabled_by || n.hidden_by) && Xe(n, t.get(n.device_id ?? ""), s.integration))
      if (n.device_id) {
        const l = r.get(n.device_id) ?? [];
        l.push(n), r.set(n.device_id, l);
      } else
        i.push(n);
  const a = [];
  for (const [n, l] of r) {
    const c = Je(n, l, t.get(n), e, s.states);
    c && a.push(c);
  }
  for (const n of i) {
    const l = Yt(n.entity_id, s.states[n.entity_id]);
    l && a.push({
      id: es(n),
      name: Kt(n, s.states[n.entity_id]),
      areaId: n.area_id,
      areaName: n.area_id ? e.get(n.area_id) : void 0,
      controllable: l === "switch",
      entities: { [l]: n.entity_id },
      available: ((o = s.states[n.entity_id]) == null ? void 0 : o.state) !== "unavailable",
      discoveryConfidence: "medium",
      discoveryNotes: ["Associated from entity registry without a device_id."]
    });
  }
  return a;
}
function Xe(s, t, e) {
  var a;
  if (s.platform === e) return !0;
  const r = ((t == null ? void 0 : t.manufacturer) ?? "").toLowerCase(), i = ((a = t == null ? void 0 : t.identifiers) == null ? void 0 : a.flat().join(" ").toLowerCase()) ?? "";
  return r.includes("savant") || i.includes(e.toLowerCase());
}
function Je(s, t, e, r, i) {
  var m;
  const a = {}, o = [];
  for (const f of t) {
    const v = Yt(f.entity_id, i[f.entity_id]);
    !v || a[v] || (a[v] = f.entity_id);
  }
  if (!Object.keys(a).length) return;
  const n = t.find((f) => f.entity_id === a.power) ?? t[0], l = (n == null ? void 0 : n.area_id) ?? (e == null ? void 0 : e.area_id) ?? void 0, c = n ? (m = i[n.entity_id]) == null ? void 0 : m.attributes : {}, p = ts((c == null ? void 0 : c.circuit_number) ?? (c == null ? void 0 : c.circuit)), d = Qe(c == null ? void 0 : c.panel_name, c == null ? void 0 : c.panel, e == null ? void 0 : e.model);
  return a.power || o.push("No power sensor with device_class: power was found."), a.switch || o.push("No switch entity was found for breaker control."), {
    id: `device:${s}`,
    deviceId: s,
    name: (e == null ? void 0 : e.name_by_user) || (e == null ? void 0 : e.name) || Kt(n, n ? i[n.entity_id] : void 0),
    areaId: l,
    areaName: l ? r.get(l) : void 0,
    panelName: d,
    circuitNumber: p,
    controllable: !!a.switch,
    entities: a,
    available: Object.values(a).some((f) => {
      var v;
      return ((v = i[f]) == null ? void 0 : v.state) !== "unavailable";
    }),
    discoveryConfidence: a.power && a.switch ? "high" : "medium",
    discoveryNotes: o.length ? o : void 0
  };
}
function Qe(...s) {
  return s.find((t) => typeof t == "string" && t.length > 0);
}
function ts(s) {
  const t = Number(s);
  return Number.isFinite(t) ? t : void 0;
}
function es(s) {
  return s.unique_id ? `entity:${s.unique_id}` : `entity:${s.entity_id}`;
}
function Kt(s, t) {
  return (s == null ? void 0 : s.name) || (s == null ? void 0 : s.original_name) || (t == null ? void 0 : t.attributes.friendly_name) || (s == null ? void 0 : s.entity_id) || "Savant breaker";
}
class ss {
  constructor(t) {
    this.integration = t;
  }
  async discover(t) {
    const e = await rs(t);
    return Ke({
      ...e,
      states: t.states,
      integration: this.integration
    });
  }
}
async function rs(s) {
  const t = s.connection;
  if (!(t != null && t.sendMessagePromise))
    return { entities: [], devices: [], areas: [] };
  const [e, r, i] = await Promise.all([
    t.sendMessagePromise({ type: "config/entity_registry/list" }),
    t.sendMessagePromise({ type: "config/device_registry/list" }),
    t.sendMessagePromise({ type: "config/area_registry/list" })
  ]);
  return {
    entities: e,
    devices: r,
    areas: i
  };
}
class Xt {
  constructor(t) {
    this.providers = t;
  }
  async discover(t, e) {
    const r = this.providers ?? [
      ...e.discovery.enabled ? [new ss(e.discovery.integration)] : [],
      new Ye(e.manual_breakers)
    ], i = await Promise.all(r.map((a) => a.discover(t)));
    return is(i.flat());
  }
}
function is(s) {
  const t = /* @__PURE__ */ new Map();
  for (const e of s) {
    const r = t.get(e.id);
    t.set(
      e.id,
      r ? {
        ...r,
        ...e,
        entities: { ...r.entities, ...e.entities },
        discoveryNotes: [...r.discoveryNotes ?? [], ...e.discoveryNotes ?? []]
      } : e
    );
  }
  return [...t.values()];
}
class as {
  async fetchHistory(t, e, r) {
    var l;
    if (!((l = t.connection) != null && l.sendMessagePromise)) return [];
    const i = /* @__PURE__ */ new Date(), a = new Date(i.getTime() - os(r)), o = await t.connection.sendMessagePromise({
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
function os(s) {
  switch (s) {
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
class ns {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.history = new as();
  }
  async getStatistics(t, e, r, i) {
    const a = `${e}:${r}`, o = Date.now(), n = this.cache.get(a);
    if (n && o - n.fetchedAt < i * 1e3)
      return n.data;
    try {
      const l = await this.fetchStatisticsOrHistory(t, e, r), c = l.map((d) => d.value).filter(Number.isFinite), p = {
        entityId: e,
        period: r,
        points: l,
        averageWatts: c.length ? c.reduce((d, m) => d + m, 0) / c.length : void 0,
        maximumWatts: c.length ? Math.max(...c) : void 0,
        loading: !1,
        fetchedAt: o
      };
      return this.cache.set(a, { data: p, fetchedAt: o }), p;
    } catch (l) {
      return {
        entityId: e,
        period: r,
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
  async fetchStatisticsOrHistory(t, e, r) {
    var i;
    if (!((i = t.connection) != null && i.sendMessagePromise)) return [];
    if (r === "7d" || r === "24h" || r === "12h")
      try {
        const a = /* @__PURE__ */ new Date(), o = new Date(a.getTime() - ls(r)), n = await t.connection.sendMessagePromise({
          type: "recorder/statistics_during_period",
          start_time: o.toISOString(),
          end_time: a.toISOString(),
          statistic_ids: [e],
          period: r === "7d" ? "hour" : "5minute",
          types: ["mean", "max"]
        }), c = ((n == null ? void 0 : n[e]) ?? []).map((p) => ({
          start: new Date(p.start).getTime(),
          value: Number(p.mean ?? p.max)
        })).filter((p) => Number.isFinite(p.start) && Number.isFinite(p.value));
        if (c.length) return c;
      } catch {
      }
    return this.history.fetchHistory(t, e, r);
  }
}
function ls(s) {
  switch (s) {
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
    group_by: "panel",
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
    high_load_threshold_watts: 3500
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
  high_load_threshold_watts: "High-load threshold",
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
}, cs = {
  integration: "Defaults to savant_energy and is used to match registry metadata.",
  panel_filter: "Optional exact panel name to include.",
  area_filter: "Optional exact area name to include.",
  refresh_interval_seconds: "Minimum 30 seconds.",
  high_load_threshold_watts: "Watts shown as a high-load warning on breaker tiles.",
  manual_breakers: "Optional fallback mappings for breakers that cannot be discovered from entity metadata.",
  id: "Use a stable ID, for example panel_1_circuit_12."
};
function hs() {
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
                  switch_entity: q("switch"),
                  power_entity: q("sensor"),
                  energy_entity: q("sensor"),
                  voltage_entity: q("sensor"),
                  current_entity: q("sensor"),
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
    computeLabel: (s) => Jt[s.name],
    computeHelper: (s) => cs[s.name],
    assertConfig: ps
  };
}
function q(s) {
  return {
    selector: {
      entity: {
        filter: { domain: s }
      }
    }
  };
}
function j(s, t) {
  return {
    name: s,
    selector: {
      select: {
        mode: "dropdown",
        options: t.map((e) => ({ value: e, label: Jt[e] ?? ds(e) }))
      }
    }
  };
}
function ds(s) {
  return s.split("_").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
}
function ps(s) {
  if (H("discovery", s.discovery), H("layout", s.layout), H("display", s.display), H("graph", s.graph), H("controls", s.controls), s.excluded_breakers !== void 0 && !Array.isArray(s.excluded_breakers))
    throw new Error("excluded_breakers must be a list.");
  if (s.manual_breakers !== void 0 && !Array.isArray(s.manual_breakers))
    throw new Error("manual_breakers must be a list.");
  H("breaker_overrides", s.breaker_overrides);
}
function H(s, t) {
  if (t !== void 0 && (t === null || Array.isArray(t) || typeof t != "object"))
    throw new Error(`${s} must be an object.`);
}
function Qt(s, t) {
  const e = { ...s };
  if (!t) return e;
  for (const [r, i] of Object.entries(t))
    Array.isArray(i) ? e[r] = [...i] : i && typeof i == "object" && !Array.isArray(i) ? e[r] = Qt(e[r] ?? {}, i) : i !== void 0 && (e[r] = i);
  return e;
}
const us = /* @__PURE__ */ new Set(["1h", "6h", "12h", "24h", "7d"]), gs = /* @__PURE__ */ new Set(["standard", "ultra_compact"]);
function Y(s) {
  const t = Qt(O, s ?? {});
  t.discovery.enabled = t.discovery.enabled !== !1, t.discovery.integration = t.discovery.integration || O.discovery.integration, t.discovery.include_new_breakers = t.discovery.include_new_breakers !== !1, gs.has(t.layout.mobile_view) || (t.layout.mobile_view = O.layout.mobile_view), t.display.show_title = t.display.show_title !== !1, us.has(t.graph.period) || (t.graph.period = O.graph.period), t.graph.refresh_interval_seconds = Math.max(30, Number(t.graph.refresh_interval_seconds) || 300);
  const e = Number(t.controls.high_load_threshold_watts);
  return t.controls.high_load_threshold_watts = Math.max(
    0,
    Number.isFinite(e) ? e : O.controls.high_load_threshold_watts || 3500
  ), t.excluded_breakers = Array.isArray(t.excluded_breakers) ? [...new Set(t.excluded_breakers)] : [], t.breaker_overrides = t.breaker_overrides ?? {}, t.manual_breakers = Array.isArray(t.manual_breakers) ? t.manual_breakers : [], t;
}
function fs(s, t) {
  const e = s.breaker_overrides[t.id] ?? {};
  return {
    label: e.label || t.name,
    show_current_power: e.show_current_power ?? s.display.show_current_power,
    show_average_power: e.show_average_power ?? s.display.show_average_power,
    show_maximum_power: e.show_maximum_power ?? s.display.show_maximum_power,
    show_energy: e.show_energy ?? s.display.show_energy,
    show_sparkline: e.show_sparkline ?? s.display.show_sparkline,
    show_icon: e.show_icon ?? s.display.show_icon,
    show_state: s.display.show_state,
    show_controls: e.show_controls ?? s.display.show_controls,
    show_area: s.display.show_area,
    show_circuit_number: s.display.show_circuit_number,
    control_mode: e.control_mode ?? s.controls.default_mode
  };
}
const ms = x`
  :host {
    display: block;
    color: var(--primary-text-color);
    --savant-tile-bg: color-mix(in srgb, var(--ha-card-background, var(--card-background-color, #1f2528)) 88%, black);
    --savant-tile-fg: var(--primary-text-color, #f5f7f8);
    --savant-muted: var(--secondary-text-color, #a9b0b4);
    --savant-success: var(--success-color, #7acb54);
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
var vs = Object.defineProperty, bs = Object.getOwnPropertyDescriptor, E = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? bs(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && vs(t, e, i), i;
};
let w = class extends y {
  constructor() {
    super(...arguments), this.config = O, this.breakers = [], this.loading = !0, this.error = "", this.stats = /* @__PURE__ */ new Map(), this.pendingSwitches = /* @__PURE__ */ new Set(), this.toggleErrors = /* @__PURE__ */ new Map(), this.stacked = !1, this.discovery = new Xt(), this.statistics = new ns(), this.discoveryKey = "", this.statsRefreshToken = 0, this.handleToggle = async (s) => {
      var r;
      if (s.stopPropagation(), !this.hass) return;
      const t = this.breakers.find((i) => i.id === s.detail.breakerId), e = t == null ? void 0 : t.entities.switch;
      if (!(!t || !e || this.pendingSwitches.has(t.id))) {
        this.pendingSwitches = /* @__PURE__ */ new Set([...this.pendingSwitches, t.id]), this.toggleErrors.delete(t.id);
        try {
          const i = (r = this.hass.states[e]) == null ? void 0 : r.state;
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
  setConfig(s) {
    this.config = Y(s), this.setAttribute("density", this.config.layout.density), this.setAttribute("mobile-view", this.config.layout.mobile_view), this.discoveryKey = "";
  }
  static getConfigElement() {
    return document.createElement("savant-energy-breaker-board-card-editor");
  }
  static getConfigForm() {
    return hs();
  }
  static getStubConfig() {
    return {
      title: "Electrical Panel",
      discovery: { enabled: !0 },
      layout: { group_by: "panel", density: "comfortable", mobile_view: "standard" }
    };
  }
  getCardSize() {
    const s = Math.max(this.breakers.length, 6);
    return Math.ceil(s / 2) + (this.config.display.show_title && this.config.title ? 1 : 0);
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
    this.resizeObserver = new ResizeObserver(([s]) => {
      if (!s) {
        this.stacked = !1;
        return;
      }
      this.updateStackedLayout(s.contentRect.width);
    }), this.observeLayoutTarget();
  }
  disconnectedCallback() {
    var s;
    super.disconnectedCallback(), (s = this.resizeObserver) == null || s.disconnect();
  }
  updated(s) {
    this.observeLayoutTarget(), (s.has("hass") || s.has("config")) && this.ensureDiscovered();
  }
  observeLayoutTarget() {
    if (!this.resizeObserver) return;
    const s = this.renderRoot.querySelector(".board-grid") ?? this.renderRoot.querySelector("ha-card") ?? this;
    s !== this.resizeTarget && (this.resizeTarget && this.resizeObserver.unobserve(this.resizeTarget), this.resizeTarget = s, this.resizeObserver.observe(s), this.updateStackedLayout(s.getBoundingClientRect().width));
  }
  updateStackedLayout(s) {
    !Number.isFinite(s) || s <= 0 || (this.stacked && s >= 560 && (this.stacked = !1), !this.stacked && s <= 520 && (this.stacked = !0));
  }
  render() {
    return h`
      <ha-card>
        ${this.config.display.show_title && this.config.title ? h`<div class="board-header"><h2 class="board-title">${this.config.title}</h2></div>` : g}
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
  renderBreakers() {
    const s = _s(this.visibleBreakers(), this.config);
    return h`
      <div
        class=${`board-grid ${this.stacked ? "stacked" : ""}`}
        @savant-breaker-toggle=${this.handleToggle}
      >
        ${s.map(
      ([t, e]) => h`
            ${t ? h`<h3 class="group-title">${t}</h3>` : g}
            ${e.map((r) => {
        const i = fs(this.config, r), a = r.entities.power, o = a ? this.stats.get(a) : void 0;
        return h`<savant-breaker-tile
                .hass=${this.hass}
                .breaker=${r}
                .display=${i}
                .statistics=${o}
                ?stacked=${this.stacked}
                .mobileLayout=${this.config.layout.mobile_view}
                .graphLoading=${!!(a && !o)}
                .pending=${this.pendingSwitches.has(r.id)}
                .error=${this.toggleErrors.get(r.id) ?? ""}
                .highLoadThresholdWatts=${this.config.controls.high_load_threshold_watts ?? 3500}
              ></savant-breaker-tile>`;
      })}
          `
    )}
      </div>
    `;
  }
  async ensureDiscovered() {
    if (!this.hass) return;
    const s = JSON.stringify({
      discovery: this.config.discovery,
      manual: this.config.manual_breakers
    });
    if (s === this.discoveryKey && this.breakers.length) {
      this.loadStatistics();
      return;
    }
    this.loading = !0, this.error = "";
    try {
      this.breakers = await this.discovery.discover(this.hass, this.config), this.discoveryKey = s, this.loading = !1, this.stats = /* @__PURE__ */ new Map(), this.loadStatistics();
    } catch (t) {
      this.error = t instanceof Error ? t.message : "Discovery failed", this.loading = !1;
    }
  }
  async loadStatistics() {
    if (!this.hass) return;
    const s = ++this.statsRefreshToken, t = [
      ...new Set(
        this.visibleBreakers().map((r) => r.entities.power).filter((r) => !!r)
      )
    ], e = await Promise.all(
      t.map(async (r) => [
        r,
        await this.statistics.getStatistics(
          this.hass,
          r,
          this.config.graph.period,
          this.config.graph.refresh_interval_seconds
        )
      ])
    );
    s === this.statsRefreshToken && (this.stats = new Map(e));
  }
  visibleBreakers() {
    const s = new Set(this.config.excluded_breakers);
    return ys(
      this.breakers.filter((t) => !s.has(t.id)),
      this.config,
      this.hass,
      this.stats
    );
  }
};
w.styles = [
  ms,
  x`
      :host([density="compact"]) {
        --tile-height: 158px;
      }
    `
];
E([
  u({ attribute: !1 })
], w.prototype, "hass", 2);
E([
  b()
], w.prototype, "config", 2);
E([
  b()
], w.prototype, "breakers", 2);
E([
  b()
], w.prototype, "loading", 2);
E([
  b()
], w.prototype, "error", 2);
E([
  b()
], w.prototype, "stats", 2);
E([
  b()
], w.prototype, "pendingSwitches", 2);
E([
  b()
], w.prototype, "toggleErrors", 2);
E([
  b()
], w.prototype, "stacked", 2);
w = E([
  A("savant-energy-breaker-board-card")
], w);
function ys(s, t, e, r = /* @__PURE__ */ new Map()) {
  return [...s].sort((i, a) => {
    var o, n;
    if (t.layout.sort_by === "name") return i.name.localeCompare(a.name);
    if (t.layout.sort_by === "current_power_descending") {
      const l = W(i.entities.power ? (o = e == null ? void 0 : e.states[i.entities.power]) == null ? void 0 : o.state : void 0) ?? -1 / 0;
      return (W(a.entities.power ? (n = e == null ? void 0 : e.states[a.entities.power]) == null ? void 0 : n.state : void 0) ?? -1 / 0) - l;
    }
    if (t.layout.sort_by === "highest_usage") {
      const l = jt(i, r, e);
      return jt(a, r, e) - l || i.name.localeCompare(a.name);
    }
    return t.layout.sort_by === "manual" ? 0 : (i.circuitNumber ?? 9999) - (a.circuitNumber ?? 9999) || i.name.localeCompare(a.name);
  });
}
function jt(s, t, e) {
  var i, a;
  const r = s.entities.power;
  return r ? ((i = t.get(r)) == null ? void 0 : i.averageWatts) ?? W((a = e == null ? void 0 : e.states[r]) == null ? void 0 : a.state) ?? -1 / 0 : -1 / 0;
}
function _s(s, t) {
  if (t.layout.group_by === "none") return [["", s]];
  const e = /* @__PURE__ */ new Map();
  for (const r of s) {
    const i = t.layout.group_by === "panel_then_area" ? [r.panelName, r.areaName].filter(Boolean).join(" / ") || "Other" : t.layout.group_by === "area" ? r.areaName || "Other" : r.panelName || "Other";
    e.set(i, [...e.get(i) ?? [], r]);
  }
  return [...e.entries()];
}
function te(s, t) {
  if (Array.isArray(s))
    return s.length ? s : void 0;
  if (s && typeof s == "object") {
    const e = {};
    for (const [r, i] of Object.entries(s)) {
      const a = te(i, t == null ? void 0 : t[r]);
      a !== void 0 && (e[r] = a);
    }
    return Object.keys(e).length ? e : void 0;
  }
  return s === t ? void 0 : s;
}
function ee(s) {
  const t = Y(s);
  return {
    type: "custom:savant-energy-breaker-board-card",
    ...te(t, O) ?? {}
  };
}
function ws(s, t) {
  const e = structuredClone(s);
  return delete e.breaker_overrides[t], ee(e);
}
var xs = Object.defineProperty, $s = Object.getOwnPropertyDescriptor, N = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? $s(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && xs(t, e, i), i;
};
let S = class extends y {
  constructor() {
    super(...arguments), this.config = O, this.breakers = [], this.filter = "", this.loading = !1, this.discoveryError = "", this.expandedBreakers = /* @__PURE__ */ new Set(), this.discoveryLoaded = !1, this.discovery = new Xt();
  }
  setConfig(s) {
    this.config = Y(s), this.loadBreakers();
  }
  updated(s) {
    s.has("hass") && this.loadBreakers();
  }
  render() {
    const s = this.breakers.filter(
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
          ${this.select(
      "Group",
      this.config.layout.group_by,
      ["none", "panel", "area", "panel_then_area"],
      (t) => this.patch({ layout: { ...this.config.layout, group_by: t } })
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
        (r) => this.patch({ display: { ...this.config.display, [t]: r } })
      )
    )}
          ${this.select(
      "Control safety",
      this.config.controls.default_mode,
      ["hidden", "hold", "hold_confirm_off"],
      (t) => this.patch({ controls: { ...this.config.controls, default_mode: t } })
    )}
          ${this.numberInput(
      "High-load threshold (W)",
      this.config.controls.high_load_threshold_watts ?? 3500,
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
          ${!this.loading && !s.length ? h`<div class="loading">${this.discoveryLoaded ? "No discovered breakers found." : "Discovery will run once when Home Assistant is ready."}</div>` : g}
          ${s.map((t) => this.renderBreakerEditor(t))}
        </section>
      </div>
    `;
  }
  renderBreakerEditor(s) {
    var o, n;
    const t = this.config.excluded_breakers.includes(s.id), e = this.config.breaker_overrides[s.id] ?? {}, r = this.expandedBreakers.has(s.id), i = s.entities.power ? W((n = (o = this.hass) == null ? void 0 : o.states[s.entities.power]) == null ? void 0 : n.state) : void 0, a = Object.entries(s.entities).filter(([, l]) => l).map(([l, c]) => `${l}: ${c}`).join(", ");
    return h`
      <article class=${t ? "breaker excluded" : "breaker"}>
        <div class="breaker-head" @click=${() => this.toggleExpanded(s.id)}>
          <div>
            <strong>${e.label || s.name}</strong>
          </div>
          <span class="breaker-actions">
            ${this.switch("Shown", !t, (l) => this.setExcluded(s.id, !l))}
            <span class="chevron">${r ? "Collapse" : "Expand"}</span>
          </span>
        </div>
        ${r ? h`
              <div class="breaker-details">
                <span>${rt(i)} - ${s.available ? "available" : "unavailable"}</span>
                <small>${a || "No associated entities"}</small>
              </div>
              ${this.textInput(
      "Custom label",
      e.label ?? "",
      (l) => this.setOverride(s.id, { ...e, label: l || void 0 })
    )}
              <div class="override-grid">
                ${["show_current_power", "show_average_power", "show_maximum_power", "show_energy", "show_sparkline", "show_icon", "show_controls"].map(
      (l) => this.tristate(
        l.replaceAll("_", " "),
        e[l],
        (c) => this.setOverride(s.id, { ...e, [l]: c })
      )
    )}
              </div>
              ${this.select(
      "Control mode",
      e.control_mode ?? "default",
      ["default", "hidden", "hold", "hold_confirm_off"],
      (l) => this.setOverride(s.id, {
        ...e,
        control_mode: l === "default" ? void 0 : l
      })
    )}
              <button class="reset" @click=${() => this.resetOverride(s.id)}>Reset to defaults</button>
            ` : g}
      </article>
    `;
  }
  async loadBreakers(s = !1) {
    if (!(!this.hass || !s && (this.discoveryLoaded || this.loading))) {
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
  patch(s) {
    this.config = Y({ ...this.config, ...s }), ot(this, "config-changed", { config: ee(this.config) });
  }
  setExcluded(s, t) {
    const e = new Set(this.config.excluded_breakers);
    t ? e.add(s) : e.delete(s), this.patch({ excluded_breakers: [...e] });
  }
  setOverride(s, t) {
    const e = Object.fromEntries(Object.entries(t).filter(([, r]) => r !== void 0 && r !== ""));
    this.patch({ breaker_overrides: { ...this.config.breaker_overrides, [s]: e } });
  }
  resetOverride(s) {
    const t = ws(this.config, s);
    this.config = Y(t), ot(this, "config-changed", { config: t });
  }
  toggleExpanded(s) {
    const t = new Set(this.expandedBreakers);
    t.has(s) ? t.delete(s) : t.add(s), this.expandedBreakers = t;
  }
  textInput(s, t, e, r = !0) {
    return h`<label><span>${s}</span><input .value=${t} @input=${(i) => e(i.target.value)} @change=${r ? (i) => e(i.target.value) : void 0} /></label>`;
  }
  checkbox(s, t, e) {
    return h`<label class="check"><input type="checkbox" .checked=${t} @change=${(r) => e(r.target.checked)} /> <span>${s}</span></label>`;
  }
  switch(s, t, e) {
    return h`
      <label class="switch" @click=${(r) => r.stopPropagation()}>
        <input type="checkbox" .checked=${t} @change=${(r) => e(r.target.checked)} />
        <span class="switch-track" aria-hidden="true"></span>
        <span>${s}</span>
      </label>
    `;
  }
  select(s, t, e, r) {
    return h`<label><span>${s}</span><select .value=${t} @change=${(i) => r(i.target.value)}>${e.map((i) => h`<option value=${i}>${i}</option>`)}</select></label>`;
  }
  numberInput(s, t, e) {
    return h`<label><span>${s}</span><input type="number" min="0" step="100" .value=${String(t)} @change=${(r) => e(Number(r.target.value) || 0)} /></label>`;
  }
  tristate(s, t, e) {
    const r = t === void 0 ? "default" : String(t);
    return this.select(
      s,
      r,
      ["default", "true", "false"],
      (i) => e(i === "default" ? void 0 : i === "true")
    );
  }
};
S.styles = x`
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
], S.prototype, "hass", 2);
N([
  b()
], S.prototype, "config", 2);
N([
  b()
], S.prototype, "breakers", 2);
N([
  b()
], S.prototype, "filter", 2);
N([
  b()
], S.prototype, "loading", 2);
N([
  b()
], S.prototype, "discoveryError", 2);
N([
  b()
], S.prototype, "expandedBreakers", 2);
S = N([
  A("savant-energy-breaker-board-card-editor")
], S);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "savant-energy-breaker-board-card",
  name: "Savant Energy Breaker Board",
  description: "Discover and control Savant Energy breaker/circuit power data.",
  preview: !0,
  documentationURL: "https://github.com/brett/savant-energy-breaker-board-card"
});
//# sourceMappingURL=Savant-Card.js.map
