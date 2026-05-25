/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = globalThis, mt = tt.ShadowRoot && (tt.ShadyCSS === void 0 || tt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, vt = Symbol(), $t = /* @__PURE__ */ new WeakMap();
let zt = class {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== vt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (mt && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = $t.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && $t.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ee = (s) => new zt(typeof s == "string" ? s : s + "", void 0, vt), x = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((r, i, a) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[a + 1], s[0]);
  return new zt(e, s, vt);
}, se = (s, t) => {
  if (mt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const r = document.createElement("style"), i = tt.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = e.cssText, s.appendChild(r);
  }
}, kt = mt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules) e += r.cssText;
  return ee(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: re, defineProperty: ie, getOwnPropertyDescriptor: ae, getOwnPropertyNames: oe, getOwnPropertySymbols: ne, getPrototypeOf: le } = Object, P = globalThis, St = P.trustedTypes, ce = St ? St.emptyScript : "", ht = P.reactiveElementPolyfillSupport, q = (s, t) => s, st = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? ce : null;
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
} }, bt = (s, t) => !re(s, t), At = { attribute: !0, type: String, converter: st, reflect: !1, useDefault: !1, hasChanged: bt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), P.litPropertyMetadata ?? (P.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let H = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = At) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(t, r, e);
      i !== void 0 && ie(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    const { get: i, set: a } = ae(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? At;
  }
  static _$Ei() {
    if (this.hasOwnProperty(q("elementProperties"))) return;
    const t = le(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(q("properties"))) {
      const e = this.properties, r = [...oe(e), ...ne(e)];
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
      for (const i of r) e.unshift(kt(i));
    } else t !== void 0 && e.push(kt(t));
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
    return se(t, this.constructor.elementStyles), t;
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
      const o = (((a = r.converter) == null ? void 0 : a.toAttribute) !== void 0 ? r.converter : st).toAttribute(e, r.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var a, o;
    const r = this.constructor, i = r._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = r.getPropertyOptions(i), l = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((a = n.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? n.converter : st;
      this._$Em = i;
      const c = l.fromAttribute(e, n.type);
      this[i] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, r, i = !1, a) {
    var o;
    if (t !== void 0) {
      const n = this.constructor;
      if (i === !1 && (a = this[t]), r ?? (r = n.getPropertyOptions(t)), !((r.hasChanged ?? bt)(a, e) || r.useDefault && r.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(n._$Eu(t, r)))) return;
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
H.elementStyles = [], H.shadowRootOptions = { mode: "open" }, H[q("elementProperties")] = /* @__PURE__ */ new Map(), H[q("finalized")] = /* @__PURE__ */ new Map(), ht == null || ht({ ReactiveElement: H }), (P.reactiveElementVersions ?? (P.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis, Et = (s) => s, rt = G.trustedTypes, Ct = rt ? rt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Ut = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, Rt = "?" + C, he = `<${Rt}>`, B = document, K = () => B.createComment(""), J = (s) => s === null || typeof s != "object" && typeof s != "function", yt = Array.isArray, de = (s) => yt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", dt = `[ 	
\f\r]`, F = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pt = /-->/g, Ot = />/g, M = RegExp(`>|${dt}(?:([^\\s"'>=/]+)(${dt}*=${dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Mt = /'/g, Lt = /"/g, It = /^(?:script|style|textarea|title)$/i, Ft = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), d = Ft(1), gt = Ft(2), T = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Nt = /* @__PURE__ */ new WeakMap(), L = B.createTreeWalker(B, 129);
function Wt(s, t) {
  if (!yt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ct !== void 0 ? Ct.createHTML(t) : t;
}
const pe = (s, t) => {
  const e = s.length - 1, r = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = F;
  for (let n = 0; n < e; n++) {
    const l = s[n];
    let c, p, h = -1, m = 0;
    for (; m < l.length && (o.lastIndex = m, p = o.exec(l), p !== null); ) m = o.lastIndex, o === F ? p[1] === "!--" ? o = Pt : p[1] !== void 0 ? o = Ot : p[2] !== void 0 ? (It.test(p[2]) && (i = RegExp("</" + p[2], "g")), o = M) : p[3] !== void 0 && (o = M) : o === M ? p[0] === ">" ? (o = i ?? F, h = -1) : p[1] === void 0 ? h = -2 : (h = o.lastIndex - p[2].length, c = p[1], o = p[3] === void 0 ? M : p[3] === '"' ? Lt : Mt) : o === Lt || o === Mt ? o = M : o === Pt || o === Ot ? o = F : (o = M, i = void 0);
    const f = o === M && s[n + 1].startsWith("/>") ? " " : "";
    a += o === F ? l + he : h >= 0 ? (r.push(c), l.slice(0, h) + Ut + l.slice(h) + C + f) : l + C + (h === -2 ? n : f);
  }
  return [Wt(s, a + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class X {
  constructor({ strings: t, _$litType$: e }, r) {
    let i;
    this.parts = [];
    let a = 0, o = 0;
    const n = t.length - 1, l = this.parts, [c, p] = pe(t, e);
    if (this.el = X.createElement(c, r), L.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = L.nextNode()) !== null && l.length < n; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(Ut)) {
          const m = p[o++], f = i.getAttribute(h).split(C), v = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: a, name: v[2], strings: f, ctor: v[1] === "." ? ge : v[1] === "?" ? fe : v[1] === "@" ? me : lt }), i.removeAttribute(h);
        } else h.startsWith(C) && (l.push({ type: 6, index: a }), i.removeAttribute(h));
        if (It.test(i.tagName)) {
          const h = i.textContent.split(C), m = h.length - 1;
          if (m > 0) {
            i.textContent = rt ? rt.emptyScript : "";
            for (let f = 0; f < m; f++) i.append(h[f], K()), L.nextNode(), l.push({ type: 2, index: ++a });
            i.append(h[m], K());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Rt) l.push({ type: 2, index: a });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(C, h + 1)) !== -1; ) l.push({ type: 7, index: a }), h += C.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const r = B.createElement("template");
    return r.innerHTML = t, r;
  }
}
function z(s, t, e = s, r) {
  var o, n;
  if (t === T) return t;
  let i = r !== void 0 ? (o = e._$Co) == null ? void 0 : o[r] : e._$Cl;
  const a = J(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== a && ((n = i == null ? void 0 : i._$AO) == null || n.call(i, !1), a === void 0 ? i = void 0 : (i = new a(s), i._$AT(s, e, r)), r !== void 0 ? (e._$Co ?? (e._$Co = []))[r] = i : e._$Cl = i), i !== void 0 && (t = z(s, i._$AS(s, t.values), i, r)), t;
}
class ue {
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
    const { el: { content: e }, parts: r } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? B).importNode(e, !0);
    L.currentNode = i;
    let a = L.nextNode(), o = 0, n = 0, l = r[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new Q(a, a.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (c = new ve(a, this, t)), this._$AV.push(c), l = r[++n];
      }
      o !== (l == null ? void 0 : l.index) && (a = L.nextNode(), o++);
    }
    return L.currentNode = B, i;
  }
  p(t) {
    let e = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
}
class Q {
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
    t = z(this, t, e), J(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== T && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : de(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && J(this._$AH) ? this._$AA.nextSibling.data = t : this.T(B.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var a;
    const { values: e, _$litType$: r } = t, i = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = X.createElement(Wt(r.h, r.h[0]), this.options)), r);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === i) this._$AH.p(e);
    else {
      const o = new ue(i, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Nt.get(t.strings);
    return e === void 0 && Nt.set(t.strings, e = new X(t)), e;
  }
  k(t) {
    yt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, i = 0;
    for (const a of t) i === e.length ? e.push(r = new Q(this.O(K()), this.O(K()), this, this.options)) : r = e[i], r._$AI(a), i++;
    i < e.length && (this._$AR(r && r._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = Et(t).nextSibling;
      Et(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class lt {
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
    if (a === void 0) t = z(this, t, e, 0), o = !J(t) || t !== this._$AH && t !== T, o && (this._$AH = t);
    else {
      const n = t;
      let l, c;
      for (t = a[0], l = 0; l < a.length - 1; l++) c = z(this, n[r + l], e, l), c === T && (c = this._$AH[l]), o || (o = !J(c) || c !== this._$AH[l]), c === g ? t = g : t !== g && (t += (c ?? "") + a[l + 1]), this._$AH[l] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ge extends lt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class fe extends lt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class me extends lt {
  constructor(t, e, r, i, a) {
    super(t, e, r, i, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = z(this, t, e, 0) ?? g) === T) return;
    const r = this._$AH, i = t === g && r !== g || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, a = t !== g && (r === g || i);
    i && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ve {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    z(this, t);
  }
}
const pt = G.litHtmlPolyfillSupport;
pt == null || pt(X, Q), (G.litHtmlVersions ?? (G.litHtmlVersions = [])).push("3.3.3");
const be = (s, t, e) => {
  const r = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = r._$litPart$;
  if (i === void 0) {
    const a = (e == null ? void 0 : e.renderBefore) ?? null;
    r._$litPart$ = i = new Q(t.insertBefore(K(), a), a, void 0, e ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis;
class b extends H {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = be(e, this.renderRoot, this.renderOptions);
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
    return T;
  }
}
var Tt;
b._$litElement$ = !0, b.finalized = !0, (Tt = D.litElementHydrateSupport) == null || Tt.call(D, { LitElement: b });
const ut = D.litElementPolyfillSupport;
ut == null || ut({ LitElement: b });
(D.litElementVersions ?? (D.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ye = { attribute: !0, type: String, converter: st, reflect: !1, hasChanged: bt }, _e = (s = ye, t, e) => {
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
  return (t, e) => typeof e == "object" ? _e(s, t, e) : ((r, i, a) => {
    const o = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, r), o ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function y(s) {
  return u({ ...s, state: !0, attribute: !1 });
}
var we = Object.defineProperty, xe = Object.getOwnPropertyDescriptor, _t = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? xe(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && we(t, e, i), i;
};
let Y = class extends b {
  constructor() {
    super(...arguments), this.points = [], this.state = "normal";
  }
  render() {
    const s = $e(this.points), t = s ?? ke(), e = !s;
    return gt`
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
        ${e ? "" : gt`
              <path class="fill-floor" d=${t.fillPath}></path>
              <path class="fill-base" d=${t.fillPath}></path>
            `}
        <path class="baseline" d="M 0 34 L 100 34"></path>
        <path class="line" d=${t.path}></path>
      </svg>
    `;
  }
};
Y.styles = x`
    :host {
      display: block;
      min-height: 32px;
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
      width: 100%;
      height: 100%;
      min-height: 32px;
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

    .baseline {
      fill: none;
      stroke: currentColor;
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
      opacity: 0.36;
    }

    .fill-floor {
      fill: currentColor;
      opacity: 0.04;
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
_t([
  u({ attribute: !1 })
], Y.prototype, "points", 2);
_t([
  u({ type: String, reflect: !0 })
], Y.prototype, "state", 2);
Y = _t([
  k("savant-sparkline")
], Y);
function $e(s) {
  const t = s.map((n) => n.value).filter(Number.isFinite);
  if (!t.length) return;
  if (t.length === 1) {
    const n = Dt(t[0], Bt(t));
    return {
      path: `M 0 ${n} L 100 ${n}`,
      fillPath: `M 0 ${n} L 100 ${n} L 100 36 L 0 36 Z`
    };
  }
  const e = Bt(t), r = t.map((n, l) => [l / (t.length - 1) * 100, Dt(n, e)]), i = r.map(([n, l], c) => `${c === 0 ? "M" : "L"} ${n.toFixed(2)} ${l.toFixed(2)}`).join(" "), a = r[0], o = r[r.length - 1];
  return {
    path: i,
    fillPath: `${i} L ${o[0].toFixed(2)} 36 L ${a[0].toFixed(2)} 36 Z`
  };
}
function Dt(s, t) {
  return 34 - Math.max(0, s) / t * 28;
}
function Bt(s) {
  return Math.max(1, ...s) * 1.25;
}
function ke() {
  return {
    path: "M 0 34 L 100 34",
    fillPath: "M 0 34 L 100 34 L 100 36 L 0 36 Z"
  };
}
var Se = Object.defineProperty, Ae = Object.getOwnPropertyDescriptor, ct = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? Ae(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && Se(t, e, i), i;
};
let U = class extends b {
  constructor() {
    super(...arguments), this.avg = "--", this.max = "--", this.stacked = !1;
  }
  render() {
    return d`
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
U.styles = x`
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
ct([
  u({ type: String })
], U.prototype, "avg", 2);
ct([
  u({ type: String })
], U.prototype, "max", 2);
ct([
  u({ type: Boolean, reflect: !0 })
], U.prototype, "stacked", 2);
U = ct([
  k("savant-metric-row")
], U);
function it(s, t, e) {
  s.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}
var Ee = Object.defineProperty, Ce = Object.getOwnPropertyDescriptor, Vt = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? Ce(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && Ee(t, e, i), i;
};
const jt = {
  flash: "M7,2V13H10V22L17,10H13L17,2H7Z",
  power: "M13,3H11V13H13V3M17.83,5.17L16.41,6.59C17.99,7.86 19,9.81 19,12A7,7 0 0,1 12,19A7,7 0 0,1 5,12C5,9.81 6.01,7.86 7.59,6.59L6.17,5.17C4.23,6.82 3,9.26 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12C21,9.26 19.77,6.82 17.83,5.17Z"
};
let at = class extends b {
  constructor() {
    super(...arguments), this.icon = "flash";
  }
  render() {
    return d`
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        ${gt`<path d=${jt[this.icon] ?? jt.flash}></path>`}
      </svg>
    `;
  }
};
at.styles = x`
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
Vt([
  u({ type: String })
], at.prototype, "icon", 2);
at = Vt([
  k("savant-icon")
], at);
var Pe = Object.defineProperty, Oe = Object.getOwnPropertyDescriptor, E = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? Oe(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && Pe(t, e, i), i;
};
let $ = class extends b {
  constructor() {
    super(...arguments), this.breakerId = "", this.label = "breaker", this.switchState = "off", this.mode = "hold_confirm_off", this.disabled = !1, this.pending = !1, this.holding = !1, this.progress = 0, this.startedAt = 0, this.holdMs = 900, this.cancelHold = () => {
      window.clearTimeout(this.timer), this.holding = !1, this.progress = 0;
    };
  }
  render() {
    const s = this.disabled ? `${this.label} breaker unavailable` : `Hold to ${this.switchState === "on" ? "turn off" : "turn on"} ${this.label} breaker`;
    return d`
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
    it(this, "savant-breaker-toggle", { breakerId: this.breakerId });
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
E([
  u({ type: String })
], $.prototype, "breakerId", 2);
E([
  u({ type: String })
], $.prototype, "label", 2);
E([
  u({ type: String })
], $.prototype, "switchState", 2);
E([
  u({ type: String })
], $.prototype, "mode", 2);
E([
  u({ type: Boolean })
], $.prototype, "disabled", 2);
E([
  u({ type: Boolean })
], $.prototype, "pending", 2);
E([
  y()
], $.prototype, "holding", 2);
E([
  y()
], $.prototype, "progress", 2);
$ = E([
  k("savant-hold-control-button")
], $);
function R(s) {
  const t = typeof s == "number" ? s : Number(s);
  return Number.isFinite(t) ? t : void 0;
}
function et(s) {
  if (s === void 0 || !Number.isFinite(s)) return "--";
  const t = Math.abs(s);
  return t >= 1e3 ? `${Me(s / 1e3, t >= 1e4 ? 1 : 2)} kW` : `${Math.round(s)} W`;
}
function Me(s, t) {
  return s.toLocaleString(void 0, {
    maximumFractionDigits: t,
    minimumFractionDigits: 0
  });
}
function Le(s, t = "kWh") {
  return s === void 0 || !Number.isFinite(s) ? "--" : `${s.toLocaleString(void 0, { maximumFractionDigits: 2 })} ${t}`;
}
var Ne = Object.defineProperty, De = Object.getOwnPropertyDescriptor, S = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? De(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && Ne(t, e, i), i;
};
let _ = class extends b {
  constructor() {
    super(...arguments), this.highLoadThresholdWatts = 3500, this.graphLoading = !1, this.pending = !1, this.stacked = !1, this.error = "";
  }
  render() {
    var o, n, l, c, p, h;
    const s = this.runtimeState(), t = this.visualState(s.powerWatts, s.switchState, s.available), e = this.display.show_area ? this.breaker.areaName : void 0, r = !!((o = this.statistics) != null && o.points.length), i = r && (((n = this.statistics) == null ? void 0 : n.averageWatts) !== void 0 || ((l = this.statistics) == null ? void 0 : l.maximumWatts) !== void 0), a = this.display.show_controls && this.display.control_mode !== "hidden" && this.breaker.controllable && !!this.breaker.entities.switch;
    return d`
      <button class=${`tile ${t} ${this.pending ? "pending" : ""}`} @click=${this.openMoreInfo}>
        <span class="mobile-bar" aria-hidden="true"></span>
        <span class="topline">
          <span class="state-dot" aria-hidden="true"></span>
          ${this.display.show_state ? d`<span class="state-text">${Be(t, s.switchState)}</span>` : ""}
          ${this.renderEntityIcon()}
        </span>
        <span class="name">${this.display.label}</span>
        ${e ? d`<span class="subtitle">${e}</span>` : ""}
        <span class="power">${this.display.show_current_power ? et(s.powerWatts) : ""}</span>
        <span class="graph">
          ${this.graphLoading ? this.renderGraphSkeleton() : this.display.show_sparkline ? d`<savant-sparkline
                  .points=${((c = this.statistics) == null ? void 0 : c.points) ?? []}
                  .state=${!r || t === "off" || t === "unavailable" ? "muted" : t === "high_load" ? "warning" : "normal"}
                ></savant-sparkline>` : ""}
        </span>
        <span class="metrics">
          ${i && (this.display.show_average_power || this.display.show_maximum_power) ? d`<savant-metric-row
                .avg=${this.display.show_average_power ? et((p = this.statistics) == null ? void 0 : p.averageWatts) : "--"}
                .max=${this.display.show_maximum_power ? et((h = this.statistics) == null ? void 0 : h.maximumWatts) : "--"}
                ?stacked=${this.stacked}
              ></savant-metric-row>` : ""}
          ${this.display.show_energy ? d`<span class="energy">${Le(s.energyValue)}</span>` : ""}
        </span>
        ${this.error ? d`<span class="feedback">${this.error}</span>` : ""}
        ${a ? d`<savant-hold-control-button
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
    return typeof t == "string" && t && customElements.get("ha-icon") ? d`<ha-icon class="entity-icon" .icon=${t}></ha-icon>` : d`<savant-icon class="entity-icon" icon="flash"></savant-icon>`;
  }
  renderGraphSkeleton() {
    return d`
      <span class="graph-skeleton" aria-hidden="true">
        <svg viewBox="0 0 100 36" preserveAspectRatio="none">
          <path class="graph-skeleton-fill" d="M 0 28 L 12 22 L 26 20 L 42 25 L 56 27 L 68 17 L 82 14 L 100 18 L 100 36 L 0 36 Z"></path>
          <path class="graph-skeleton-baseline" d="M 0 34 L 100 34"></path>
          <path class="graph-skeleton-line" d="M 0 28 L 12 22 L 26 20 L 42 25 L 56 27 L 68 17 L 82 14 L 100 18"></path>
        </svg>
      </span>
    `;
  }
  runtimeState() {
    var n, l, c, p, h, m, f, v, wt, xt;
    const s = this.breaker.entities.power, t = this.breaker.entities.energy, e = this.breaker.entities.switch, r = s ? R((l = (n = this.hass) == null ? void 0 : n.states[s]) == null ? void 0 : l.state) : void 0, i = t ? R((p = (c = this.hass) == null ? void 0 : c.states[t]) == null ? void 0 : p.state) : void 0, a = e ? (m = (h = this.hass) == null ? void 0 : h.states[e]) == null ? void 0 : m.state : void 0, o = this.breaker.available && (!s || ((v = (f = this.hass) == null ? void 0 : f.states[s]) == null ? void 0 : v.state) !== "unavailable") && (!e || ((xt = (wt = this.hass) == null ? void 0 : wt.states[e]) == null ? void 0 : xt.state) !== "unavailable");
    return { powerWatts: r, energyValue: i, switchState: a, available: o };
  }
  visualState(s, t, e = !0) {
    return this.error ? "error" : this.pending ? "pending" : e ? t === "off" || s === 0 ? "off" : s !== void 0 && s >= this.highLoadThresholdWatts ? "high_load" : "on" : "unavailable";
  }
  openMoreInfo(s) {
    if (s.target.closest("savant-hold-control-button")) return;
    const e = this.breaker.entities.power ?? this.breaker.entities.switch ?? this.breaker.entities.energy;
    e && it(this, "hass-action", {
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
    }

    .tile.on .power,
    .tile.off .power {
      color: var(--savant-tile-fg);
    }

    .graph {
      align-self: end;
      min-height: 58px;
      margin: 2px -16px 52px;
      pointer-events: none;
      position: relative;
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
      z-index: 1;
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
      z-index: 1;
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

    .graph-skeleton-baseline,
    .graph-skeleton-line {
      fill: none;
      stroke: currentColor;
      vector-effect: non-scaling-stroke;
    }

    .graph-skeleton-baseline {
      stroke-width: 1;
      opacity: 0.34;
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
      min-height: 32px;
      margin-bottom: 50px;
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
    }

    :host([stacked]) .graph {
      position: absolute;
      left: 32px;
      right: 136px;
      bottom: 12px;
      height: 68px;
      min-height: 68px;
      margin: 0;
    }

    :host([stacked]) .metrics {
      left: auto;
      right: 21px;
      top: 22px;
      bottom: 22px;
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
  `;
S([
  u({ attribute: !1 })
], _.prototype, "hass", 2);
S([
  u({ attribute: !1 })
], _.prototype, "breaker", 2);
S([
  u({ attribute: !1 })
], _.prototype, "display", 2);
S([
  u({ attribute: !1 })
], _.prototype, "statistics", 2);
S([
  u({ type: Number })
], _.prototype, "highLoadThresholdWatts", 2);
S([
  u({ type: Boolean })
], _.prototype, "graphLoading", 2);
S([
  u({ type: Boolean })
], _.prototype, "pending", 2);
S([
  u({ type: Boolean, reflect: !0 })
], _.prototype, "stacked", 2);
S([
  u({ type: String })
], _.prototype, "error", 2);
_ = S([
  k("savant-breaker-tile")
], _);
function Be(s, t) {
  return s === "unavailable" ? "Unavailable" : t === "off" || s === "off" ? "Off" : "On";
}
const je = x`
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
var He = Object.defineProperty, Te = Object.getOwnPropertyDescriptor, qt = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? Te(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && He(t, e, i), i;
};
let ot = class extends b {
  constructor() {
    super(...arguments), this.stacked = !1;
  }
  render() {
    return d`
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
ot.styles = [
  je,
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
qt([
  u({ type: Boolean, reflect: !0 })
], ot.prototype, "stacked", 2);
ot = qt([
  k("savant-breaker-tile-skeleton")
], ot);
var ze = Object.getOwnPropertyDescriptor, Ue = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? ze(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = o(i) || i);
  return i;
};
let ft = class extends b {
  render() {
    return d`
      <div class="empty">
        <strong>No Savant breaker entities discovered.</strong>
        <span>Open the card editor to add manual mappings or check Savant Energy entity metadata.</span>
      </div>
    `;
  }
};
ft.styles = x`
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
ft = Ue([
  k("savant-board-empty-state")
], ft);
var Re = Object.defineProperty, Ie = Object.getOwnPropertyDescriptor, Gt = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? Ie(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && Re(t, e, i), i;
};
let nt = class extends b {
  constructor() {
    super(...arguments), this.message = "Unable to load breaker board.";
  }
  render() {
    return d`<div class="error">${this.message}</div>`;
  }
};
nt.styles = x`
    .error {
      padding: 16px;
      border-radius: var(--savant-radius);
      color: var(--error-color);
      background: color-mix(in srgb, var(--error-color) 12%, transparent);
    }
  `;
Gt([
  u({ type: String })
], nt.prototype, "message", 2);
nt = Gt([
  k("savant-board-error-state")
], nt);
class Fe {
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
function Zt(s, t) {
  const e = s.split(".")[0], r = t == null ? void 0 : t.attributes.device_class;
  if (e === "switch") return "switch";
  if (e === "sensor") {
    if (r === "power") return "power";
    if (r === "energy") return "energy";
    if (r === "voltage") return "voltage";
    if (r === "current") return "current";
  }
}
function We(s) {
  var o;
  const t = new Map(s.devices.map((n) => [n.id, n])), e = new Map(s.areas.map((n) => [n.area_id, n.name])), r = /* @__PURE__ */ new Map(), i = [];
  for (const n of s.entities)
    if (!(n.disabled_by || n.hidden_by) && Ve(n, t.get(n.device_id ?? ""), s.integration))
      if (n.device_id) {
        const l = r.get(n.device_id) ?? [];
        l.push(n), r.set(n.device_id, l);
      } else
        i.push(n);
  const a = [];
  for (const [n, l] of r) {
    const c = qe(n, l, t.get(n), e, s.states);
    c && a.push(c);
  }
  for (const n of i) {
    const l = Zt(n.entity_id, s.states[n.entity_id]);
    l && a.push({
      id: Ke(n),
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
function Ve(s, t, e) {
  var a;
  if (s.platform === e) return !0;
  const r = ((t == null ? void 0 : t.manufacturer) ?? "").toLowerCase(), i = ((a = t == null ? void 0 : t.identifiers) == null ? void 0 : a.flat().join(" ").toLowerCase()) ?? "";
  return r.includes("savant") || i.includes(e.toLowerCase());
}
function qe(s, t, e, r, i) {
  var m;
  const a = {}, o = [];
  for (const f of t) {
    const v = Zt(f.entity_id, i[f.entity_id]);
    !v || a[v] || (a[v] = f.entity_id);
  }
  if (!Object.keys(a).length) return;
  const n = t.find((f) => f.entity_id === a.power) ?? t[0], l = (n == null ? void 0 : n.area_id) ?? (e == null ? void 0 : e.area_id) ?? void 0, c = n ? (m = i[n.entity_id]) == null ? void 0 : m.attributes : {}, p = Ze((c == null ? void 0 : c.circuit_number) ?? (c == null ? void 0 : c.circuit)), h = Ge(c == null ? void 0 : c.panel_name, c == null ? void 0 : c.panel, e == null ? void 0 : e.model);
  return a.power || o.push("No power sensor with device_class: power was found."), a.switch || o.push("No switch entity was found for breaker control."), {
    id: `device:${s}`,
    deviceId: s,
    name: (e == null ? void 0 : e.name_by_user) || (e == null ? void 0 : e.name) || Kt(n, n ? i[n.entity_id] : void 0),
    areaId: l,
    areaName: l ? r.get(l) : void 0,
    panelName: h,
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
function Ge(...s) {
  return s.find((t) => typeof t == "string" && t.length > 0);
}
function Ze(s) {
  const t = Number(s);
  return Number.isFinite(t) ? t : void 0;
}
function Ke(s) {
  return s.unique_id ? `entity:${s.unique_id}` : `entity:${s.entity_id}`;
}
function Kt(s, t) {
  return (s == null ? void 0 : s.name) || (s == null ? void 0 : s.original_name) || (t == null ? void 0 : t.attributes.friendly_name) || (s == null ? void 0 : s.entity_id) || "Savant breaker";
}
class Je {
  constructor(t) {
    this.integration = t;
  }
  async discover(t) {
    const e = await Xe(t);
    return We({
      ...e,
      states: t.states,
      integration: this.integration
    });
  }
}
async function Xe(s) {
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
class Jt {
  constructor(t) {
    this.providers = t;
  }
  async discover(t, e) {
    const r = this.providers ?? [
      ...e.discovery.enabled ? [new Je(e.discovery.integration)] : [],
      new Fe(e.manual_breakers)
    ], i = await Promise.all(r.map((a) => a.discover(t)));
    return Ye(i.flat());
  }
}
function Ye(s) {
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
class Qe {
  async fetchHistory(t, e, r) {
    var l;
    if (!((l = t.connection) != null && l.sendMessagePromise)) return [];
    const i = /* @__PURE__ */ new Date(), a = new Date(i.getTime() - ts(r)), o = await t.connection.sendMessagePromise({
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
function ts(s) {
  switch (s) {
    case "1h":
      return 3600 * 1e3;
    case "6h":
      return 360 * 60 * 1e3;
    case "7d":
      return 10080 * 60 * 1e3;
    case "24h":
    default:
      return 1440 * 60 * 1e3;
  }
}
class es {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.history = new Qe();
  }
  async getStatistics(t, e, r, i) {
    const a = `${e}:${r}`, o = Date.now(), n = this.cache.get(a);
    if (n && o - n.fetchedAt < i * 1e3)
      return n.data;
    try {
      const l = await this.fetchStatisticsOrHistory(t, e, r), c = l.map((h) => h.value).filter(Number.isFinite), p = {
        entityId: e,
        period: r,
        points: l,
        averageWatts: c.length ? c.reduce((h, m) => h + m, 0) / c.length : void 0,
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
    if (r === "7d" || r === "24h")
      try {
        const a = /* @__PURE__ */ new Date(), o = new Date(a.getTime() - ss(r)), n = await t.connection.sendMessagePromise({
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
function ss(s) {
  switch (s) {
    case "7d":
      return 10080 * 60 * 1e3;
    case "6h":
      return 360 * 60 * 1e3;
    case "1h":
      return 3600 * 1e3;
    default:
      return 1440 * 60 * 1e3;
  }
}
const N = {
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
    density: "comfortable"
  },
  display: {
    show_current_power: !0,
    show_average_power: !0,
    show_maximum_power: !0,
    show_energy: !1,
    show_sparkline: !0,
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
}, Xt = {
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
  display: "Default tile details",
  show_current_power: "Current power",
  show_average_power: "Average power",
  show_maximum_power: "Maximum power",
  show_energy: "Energy",
  show_sparkline: "Sparkline",
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
}, rs = {
  integration: "Defaults to savant_energy and is used to match registry metadata.",
  panel_filter: "Optional exact panel name to include.",
  area_filter: "Optional exact area name to include.",
  refresh_interval_seconds: "Minimum 30 seconds.",
  high_load_threshold_watts: "Watts shown as a high-load warning on breaker tiles.",
  manual_breakers: "Optional fallback mappings for breakers that cannot be discovered from entity metadata.",
  id: "Use a stable ID, for example panel_1_circuit_12."
};
function is() {
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
          V("group_by", ["none", "panel", "area", "panel_then_area"]),
          V("sort_by", ["circuit_number", "name", "current_power_descending", "highest_usage", "manual"]),
          V("density", ["comfortable", "compact"])
        ]
      },
      {
        type: "expandable",
        name: "display",
        title: "Default Tile Details",
        schema: [
          { name: "show_current_power", selector: { boolean: {} } },
          { name: "show_average_power", selector: { boolean: {} } },
          { name: "show_maximum_power", selector: { boolean: {} } },
          { name: "show_energy", selector: { boolean: {} } },
          { name: "show_sparkline", selector: { boolean: {} } },
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
          V("period", ["1h", "6h", "24h", "7d"]),
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
          V("default_mode", ["hidden", "hold", "hold_confirm_off"]),
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
                  switch_entity: W("switch"),
                  power_entity: W("sensor"),
                  energy_entity: W("sensor"),
                  voltage_entity: W("sensor"),
                  current_entity: W("sensor"),
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
    computeLabel: (s) => Xt[s.name],
    computeHelper: (s) => rs[s.name],
    assertConfig: os
  };
}
function W(s) {
  return {
    selector: {
      entity: {
        filter: { domain: s }
      }
    }
  };
}
function V(s, t) {
  return {
    name: s,
    selector: {
      select: {
        mode: "dropdown",
        options: t.map((e) => ({ value: e, label: Xt[e] ?? as(e) }))
      }
    }
  };
}
function as(s) {
  return s.split("_").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
}
function os(s) {
  if (j("discovery", s.discovery), j("layout", s.layout), j("display", s.display), j("graph", s.graph), j("controls", s.controls), s.excluded_breakers !== void 0 && !Array.isArray(s.excluded_breakers))
    throw new Error("excluded_breakers must be a list.");
  if (s.manual_breakers !== void 0 && !Array.isArray(s.manual_breakers))
    throw new Error("manual_breakers must be a list.");
  j("breaker_overrides", s.breaker_overrides);
}
function j(s, t) {
  if (t !== void 0 && (t === null || Array.isArray(t) || typeof t != "object"))
    throw new Error(`${s} must be an object.`);
}
function Yt(s, t) {
  const e = { ...s };
  if (!t) return e;
  for (const [r, i] of Object.entries(t))
    Array.isArray(i) ? e[r] = [...i] : i && typeof i == "object" && !Array.isArray(i) ? e[r] = Yt(e[r] ?? {}, i) : i !== void 0 && (e[r] = i);
  return e;
}
const ns = /* @__PURE__ */ new Set(["1h", "6h", "24h", "7d"]);
function Z(s) {
  const t = Yt(N, s ?? {});
  t.discovery.enabled = t.discovery.enabled !== !1, t.discovery.integration = t.discovery.integration || N.discovery.integration, t.discovery.include_new_breakers = t.discovery.include_new_breakers !== !1, ns.has(t.graph.period) || (t.graph.period = N.graph.period), t.graph.refresh_interval_seconds = Math.max(30, Number(t.graph.refresh_interval_seconds) || 300);
  const e = Number(t.controls.high_load_threshold_watts);
  return t.controls.high_load_threshold_watts = Math.max(
    0,
    Number.isFinite(e) ? e : N.controls.high_load_threshold_watts || 3500
  ), t.excluded_breakers = Array.isArray(t.excluded_breakers) ? [...new Set(t.excluded_breakers)] : [], t.breaker_overrides = t.breaker_overrides ?? {}, t.manual_breakers = Array.isArray(t.manual_breakers) ? t.manual_breakers : [], t;
}
function ls(s, t) {
  const e = s.breaker_overrides[t.id] ?? {};
  return {
    label: e.label || t.name,
    show_current_power: e.show_current_power ?? s.display.show_current_power,
    show_average_power: e.show_average_power ?? s.display.show_average_power,
    show_maximum_power: e.show_maximum_power ?? s.display.show_maximum_power,
    show_energy: e.show_energy ?? s.display.show_energy,
    show_sparkline: e.show_sparkline ?? s.display.show_sparkline,
    show_state: s.display.show_state,
    show_controls: e.show_controls ?? s.display.show_controls,
    show_area: s.display.show_area,
    show_circuit_number: s.display.show_circuit_number,
    control_mode: e.control_mode ?? s.controls.default_mode
  };
}
const cs = x`
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
    --savant-radius: var(--ha-card-border-radius, 14px);
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
    align-items: stretch;
    gap: var(--tile-gap, 12px);
  }

  :host([density="compact"]) .board-grid {
    --tile-min-width: 178px;
    --tile-gap: 10px;
  }

  .board-grid.stacked {
    grid-template-columns: 1fr;
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
var hs = Object.defineProperty, ds = Object.getOwnPropertyDescriptor, A = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? ds(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && hs(t, e, i), i;
};
let w = class extends b {
  constructor() {
    super(...arguments), this.config = N, this.breakers = [], this.loading = !0, this.error = "", this.stats = /* @__PURE__ */ new Map(), this.pendingSwitches = /* @__PURE__ */ new Set(), this.toggleErrors = /* @__PURE__ */ new Map(), this.stacked = !1, this.discovery = new Jt(), this.statistics = new es(), this.discoveryKey = "", this.statsRefreshToken = 0, this.handleToggle = async (s) => {
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
    this.config = Z(s), this.setAttribute("density", this.config.layout.density), this.discoveryKey = "";
  }
  static getConfigElement() {
    return document.createElement("savant-energy-breaker-board-card-editor");
  }
  static getConfigForm() {
    return is();
  }
  static getStubConfig() {
    return {
      title: "Electrical Panel",
      discovery: { enabled: !0 },
      layout: { group_by: "panel", density: "comfortable" }
    };
  }
  getCardSize() {
    const s = Math.max(this.breakers.length, 6);
    return Math.ceil(s / 2) + (this.config.title ? 1 : 0);
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
      const t = s.contentRect.width;
      this.stacked && t >= 560 && (this.stacked = !1), !this.stacked && t <= 520 && (this.stacked = !0);
    }), this.resizeObserver.observe(this);
  }
  disconnectedCallback() {
    var s;
    super.disconnectedCallback(), (s = this.resizeObserver) == null || s.disconnect();
  }
  updated(s) {
    (s.has("hass") || s.has("config")) && this.ensureDiscovered();
  }
  render() {
    return d`
      <ha-card>
        ${this.config.title ? d`<div class="board-header"><h2 class="board-title">${this.config.title}</h2></div>` : g}
        ${this.error ? d`<savant-board-error-state .message=${this.error}></savant-board-error-state>` : this.loading ? this.renderSkeletons() : this.visibleBreakers().length ? this.renderBreakers() : d`<savant-board-empty-state></savant-board-empty-state>`}
      </ha-card>
    `;
  }
  renderSkeletons() {
    return d`<div class=${`board-grid ${this.stacked ? "stacked" : ""}`}>${Array.from(
      { length: 8 },
      () => d`<savant-breaker-tile-skeleton ?stacked=${this.stacked}></savant-breaker-tile-skeleton>`
    )}</div>`;
  }
  renderBreakers() {
    const s = us(this.visibleBreakers(), this.config);
    return d`
      <div
        class=${`board-grid ${this.stacked ? "stacked" : ""}`}
        @savant-breaker-toggle=${this.handleToggle}
      >
        ${s.map(
      ([t, e]) => d`
            ${t ? d`<h3 class="group-title">${t}</h3>` : g}
            ${e.map((r) => {
        const i = ls(this.config, r), a = r.entities.power, o = a ? this.stats.get(a) : void 0;
        return d`<savant-breaker-tile
                .hass=${this.hass}
                .breaker=${r}
                .display=${i}
                .statistics=${o}
                ?stacked=${this.stacked}
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
    return ps(
      this.breakers.filter((t) => !s.has(t.id)),
      this.config,
      this.hass,
      this.stats
    );
  }
};
w.styles = [
  cs,
  x`
      :host([density="compact"]) {
        --tile-height: 158px;
      }
    `
];
A([
  u({ attribute: !1 })
], w.prototype, "hass", 2);
A([
  y()
], w.prototype, "config", 2);
A([
  y()
], w.prototype, "breakers", 2);
A([
  y()
], w.prototype, "loading", 2);
A([
  y()
], w.prototype, "error", 2);
A([
  y()
], w.prototype, "stats", 2);
A([
  y()
], w.prototype, "pendingSwitches", 2);
A([
  y()
], w.prototype, "toggleErrors", 2);
A([
  y()
], w.prototype, "stacked", 2);
w = A([
  k("savant-energy-breaker-board-card")
], w);
function ps(s, t, e, r = /* @__PURE__ */ new Map()) {
  return [...s].sort((i, a) => {
    var o, n;
    if (t.layout.sort_by === "name") return i.name.localeCompare(a.name);
    if (t.layout.sort_by === "current_power_descending") {
      const l = R(i.entities.power ? (o = e == null ? void 0 : e.states[i.entities.power]) == null ? void 0 : o.state : void 0) ?? -1 / 0;
      return (R(a.entities.power ? (n = e == null ? void 0 : e.states[a.entities.power]) == null ? void 0 : n.state : void 0) ?? -1 / 0) - l;
    }
    if (t.layout.sort_by === "highest_usage") {
      const l = Ht(i, r, e);
      return Ht(a, r, e) - l || i.name.localeCompare(a.name);
    }
    return t.layout.sort_by === "manual" ? 0 : (i.circuitNumber ?? 9999) - (a.circuitNumber ?? 9999) || i.name.localeCompare(a.name);
  });
}
function Ht(s, t, e) {
  var i, a;
  const r = s.entities.power;
  return r ? ((i = t.get(r)) == null ? void 0 : i.averageWatts) ?? R((a = e == null ? void 0 : e.states[r]) == null ? void 0 : a.state) ?? -1 / 0 : -1 / 0;
}
function us(s, t) {
  if (t.layout.group_by === "none") return [["", s]];
  const e = /* @__PURE__ */ new Map();
  for (const r of s) {
    const i = t.layout.group_by === "panel_then_area" ? [r.panelName, r.areaName].filter(Boolean).join(" / ") || "Other" : t.layout.group_by === "area" ? r.areaName || "Other" : r.panelName || "Other";
    e.set(i, [...e.get(i) ?? [], r]);
  }
  return [...e.entries()];
}
function Qt(s, t) {
  if (Array.isArray(s))
    return s.length ? s : void 0;
  if (s && typeof s == "object") {
    const e = {};
    for (const [r, i] of Object.entries(s)) {
      const a = Qt(i, t == null ? void 0 : t[r]);
      a !== void 0 && (e[r] = a);
    }
    return Object.keys(e).length ? e : void 0;
  }
  return s === t ? void 0 : s;
}
function te(s) {
  const t = Z(s);
  return {
    type: "custom:savant-energy-breaker-board-card",
    ...Qt(t, N) ?? {}
  };
}
function gs(s, t) {
  const e = structuredClone(s);
  return delete e.breaker_overrides[t], te(e);
}
var fs = Object.defineProperty, ms = Object.getOwnPropertyDescriptor, I = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? ms(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && fs(t, e, i), i;
};
let O = class extends b {
  constructor() {
    super(...arguments), this.config = N, this.breakers = [], this.filter = "", this.loading = !0, this.discovery = new Jt();
  }
  setConfig(s) {
    this.config = Z(s), this.loadBreakers();
  }
  updated(s) {
    s.has("hass") && this.loadBreakers();
  }
  render() {
    const s = this.breakers.filter(
      (t) => t.name.toLowerCase().includes(this.filter.toLowerCase())
    );
    return d`
      <div class="editor">
        <section>
          <h3>Board</h3>
          ${this.textInput("Title", this.config.title ?? "", (t) => this.patch({ title: t || void 0 }))}
          ${this.checkbox(
      "Auto-discovery",
      this.config.discovery.enabled,
      (t) => this.patch({ discovery: { ...this.config.discovery, enabled: t } })
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
      ["1h", "6h", "24h", "7d"],
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
      show_state: "Breaker state",
      show_controls: "Breaker controls",
      show_area: "Area label",
      show_circuit_number: "Circuit number"
    }).map(
      ([t, e]) => this.checkbox(
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
          <h3>Discovered breakers</h3>
          ${this.textInput("Search breakers", this.filter, (t) => this.filter = t, !1)}
          ${this.loading ? d`<div class="loading">Loading discovered breakers...</div>` : g}
          ${s.map((t) => this.renderBreakerEditor(t))}
        </section>
      </div>
    `;
  }
  renderBreakerEditor(s) {
    var a, o;
    const t = this.config.excluded_breakers.includes(s.id), e = this.config.breaker_overrides[s.id] ?? {}, r = s.entities.power ? R((o = (a = this.hass) == null ? void 0 : a.states[s.entities.power]) == null ? void 0 : o.state) : void 0, i = Object.entries(s.entities).filter(([, n]) => n).map(([n, l]) => `${n}: ${l}`).join(", ");
    return d`
      <article class=${t ? "breaker excluded" : "breaker"}>
        <div class="breaker-head">
          <div>
            <strong>${e.label || s.name}</strong>
            <span>${et(r)} • ${s.available ? "available" : "unavailable"}</span>
            <small>${i || "No associated entities"}</small>
          </div>
          ${this.checkbox("Shown", !t, (n) => this.setExcluded(s.id, !n))}
        </div>
        ${this.textInput(
      "Custom label",
      e.label ?? "",
      (n) => this.setOverride(s.id, { ...e, label: n || void 0 })
    )}
        <div class="override-grid">
          ${["show_current_power", "show_average_power", "show_maximum_power", "show_energy", "show_sparkline", "show_controls"].map(
      (n) => this.tristate(
        n.replaceAll("_", " "),
        e[n],
        (l) => this.setOverride(s.id, { ...e, [n]: l })
      )
    )}
        </div>
        ${this.select(
      "Control mode",
      e.control_mode ?? "default",
      ["default", "hidden", "hold", "hold_confirm_off"],
      (n) => this.setOverride(s.id, {
        ...e,
        control_mode: n === "default" ? void 0 : n
      })
    )}
        <button class="reset" @click=${() => this.resetOverride(s.id)}>Reset to defaults</button>
      </article>
    `;
  }
  async loadBreakers() {
    this.hass && (this.loading = !0, this.breakers = await this.discovery.discover(this.hass, this.config), this.loading = !1);
  }
  patch(s) {
    this.config = Z({ ...this.config, ...s }), it(this, "config-changed", { config: te(this.config) });
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
    const t = gs(this.config, s);
    this.config = Z(t), it(this, "config-changed", { config: t });
  }
  textInput(s, t, e, r = !0) {
    return d`<label><span>${s}</span><input .value=${t} @input=${(i) => e(i.target.value)} @change=${r ? (i) => e(i.target.value) : void 0} /></label>`;
  }
  checkbox(s, t, e) {
    return d`<label class="check"><input type="checkbox" .checked=${t} @change=${(r) => e(r.target.checked)} /> <span>${s}</span></label>`;
  }
  select(s, t, e, r) {
    return d`<label><span>${s}</span><select .value=${t} @change=${(i) => r(i.target.value)}>${e.map((i) => d`<option value=${i}>${i}</option>`)}</select></label>`;
  }
  numberInput(s, t, e) {
    return d`<label><span>${s}</span><input type="number" min="0" step="100" .value=${String(t)} @change=${(r) => e(Number(r.target.value) || 0)} /></label>`;
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
O.styles = x`
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

    .helper,
    small,
    .breaker span {
      color: var(--secondary-text-color);
    }

    .breaker-head {
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }

    .breaker-head div {
      display: grid;
      gap: 3px;
      min-width: 0;
    }

    .excluded {
      opacity: 0.62;
    }

    .override-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 8px;
    }

    .reset {
      justify-self: start;
      padding: 8px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color);
      cursor: pointer;
    }
  `;
I([
  u({ attribute: !1 })
], O.prototype, "hass", 2);
I([
  y()
], O.prototype, "config", 2);
I([
  y()
], O.prototype, "breakers", 2);
I([
  y()
], O.prototype, "filter", 2);
I([
  y()
], O.prototype, "loading", 2);
O = I([
  k("savant-energy-breaker-board-card-editor")
], O);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "savant-energy-breaker-board-card",
  name: "Savant Energy Breaker Board",
  description: "Discover and control Savant Energy breaker/circuit power data.",
  preview: !0,
  documentationURL: "https://github.com/brett/savant-energy-breaker-board-card"
});
//# sourceMappingURL=Savant-Card.js.map
