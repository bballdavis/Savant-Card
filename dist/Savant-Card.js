/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = globalThis, _t = at.ShadowRoot && (at.ShadyCSS === void 0 || at.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, wt = Symbol(), At = /* @__PURE__ */ new WeakMap();
let Ft = class {
  constructor(t, s, r) {
    if (this._$cssResult$ = !0, r !== wt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (_t && t === void 0) {
      const r = s !== void 0 && s.length === 1;
      r && (t = At.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && At.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const oe = (e) => new Ft(typeof e == "string" ? e : e + "", void 0, wt), k = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((r, i, o) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[o + 1], e[0]);
  return new Ft(s, e, wt);
}, ae = (e, t) => {
  if (_t) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const r = document.createElement("style"), i = at.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = s.cssText, e.appendChild(r);
  }
}, Et = _t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const r of t.cssRules) s += r.cssText;
  return oe(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ne, defineProperty: le, getOwnPropertyDescriptor: ce, getOwnPropertyNames: he, getOwnPropertySymbols: de, getPrototypeOf: pe } = Object, T = globalThis, Ot = T.trustedTypes, ue = Ot ? Ot.emptyScript : "", mt = T.reactiveElementPolyfillSupport, K = (e, t) => e, nt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ue : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let s = e;
  switch (t) {
    case Boolean:
      s = e !== null;
      break;
    case Number:
      s = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(e);
      } catch {
        s = null;
      }
  }
  return s;
} }, xt = (e, t) => !ne(e, t), Mt = { attribute: !0, type: String, converter: nt, reflect: !1, useDefault: !1, hasChanged: xt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), T.litPropertyMetadata ?? (T.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let F = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Mt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(t, r, s);
      i !== void 0 && le(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, s, r) {
    const { get: i, set: o } = ce(this.prototype, t) ?? { get() {
      return this[s];
    }, set(a) {
      this[s] = a;
    } };
    return { get: i, set(a) {
      const n = i == null ? void 0 : i.call(this);
      o == null || o.call(this, a), this.requestUpdate(t, n, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Mt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(K("elementProperties"))) return;
    const t = pe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(K("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(K("properties"))) {
      const s = this.properties, r = [...he(s), ...de(s)];
      for (const i of r) this.createProperty(i, s[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [r, i] of s) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, r] of this.elementProperties) {
      const i = this._$Eu(s, r);
      i !== void 0 && this._$Eh.set(i, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const i of r) s.unshift(Et(i));
    } else t !== void 0 && s.push(Et(t));
    return s;
  }
  static _$Eu(t, s) {
    const r = s.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((s) => s(this));
  }
  addController(t) {
    var s;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((s = t.hostConnected) == null || s.call(t));
  }
  removeController(t) {
    var s;
    (s = this._$EO) == null || s.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const r of s.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ae(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((s) => {
      var r;
      return (r = s.hostConnected) == null ? void 0 : r.call(s);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var r;
      return (r = s.hostDisconnected) == null ? void 0 : r.call(s);
    });
  }
  attributeChangedCallback(t, s, r) {
    this._$AK(t, r);
  }
  _$ET(t, s) {
    var o;
    const r = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, r);
    if (i !== void 0 && r.reflect === !0) {
      const a = (((o = r.converter) == null ? void 0 : o.toAttribute) !== void 0 ? r.converter : nt).toAttribute(s, r.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, s) {
    var o, a;
    const r = this.constructor, i = r._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = r.getPropertyOptions(i), l = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((o = n.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? n.converter : nt;
      this._$Em = i;
      const c = l.fromAttribute(s, n.type);
      this[i] = c ?? ((a = this._$Ej) == null ? void 0 : a.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, s, r, i = !1, o) {
    var a;
    if (t !== void 0) {
      const n = this.constructor;
      if (i === !1 && (o = this[t]), r ?? (r = n.getPropertyOptions(t)), !((r.hasChanged ?? xt)(o, s) || r.useDefault && r.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(n._$Eu(t, r)))) return;
      this.C(t, s, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: r, reflect: i, wrapped: o }, a) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? s ?? this[t]), o !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (s = void 0), this._$AL.set(t, s)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
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
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), (r = this._$EO) == null || r.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(s)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var s;
    (s = this._$EO) == null || s.forEach((r) => {
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((s) => this._$ET(s, this[s]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
F.elementStyles = [], F.shadowRootOptions = { mode: "open" }, F[K("elementProperties")] = /* @__PURE__ */ new Map(), F[K("finalized")] = /* @__PURE__ */ new Map(), mt == null || mt({ ReactiveElement: F }), (T.reactiveElementVersions ?? (T.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, Pt = (e) => e, lt = Y.trustedTypes, Ct = lt ? lt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Vt = "$lit$", L = `lit$${Math.random().toFixed(9).slice(2)}$`, Wt = "?" + L, ge = `<${Wt}>`, R = document, tt = () => R.createComment(""), et = (e) => e === null || typeof e != "object" && typeof e != "function", $t = Array.isArray, me = (e) => $t(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", ft = `[ 	
\f\r]`, G = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Lt = /-->/g, Tt = />/g, D = RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Nt = /'/g, Bt = /"/g, qt = /^(?:script|style|textarea|title)$/i, Gt = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), h = Gt(1), Q = Gt(2), V = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), zt = /* @__PURE__ */ new WeakMap(), j = R.createTreeWalker(R, 129);
function Zt(e, t) {
  if (!$t(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ct !== void 0 ? Ct.createHTML(t) : t;
}
const fe = (e, t) => {
  const s = e.length - 1, r = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = G;
  for (let n = 0; n < s; n++) {
    const l = e[n];
    let c, d, p = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, d = a.exec(l), d !== null); ) f = a.lastIndex, a === G ? d[1] === "!--" ? a = Lt : d[1] !== void 0 ? a = Tt : d[2] !== void 0 ? (qt.test(d[2]) && (i = RegExp("</" + d[2], "g")), a = D) : d[3] !== void 0 && (a = D) : a === D ? d[0] === ">" ? (a = i ?? G, p = -1) : d[1] === void 0 ? p = -2 : (p = a.lastIndex - d[2].length, c = d[1], a = d[3] === void 0 ? D : d[3] === '"' ? Bt : Nt) : a === Bt || a === Nt ? a = D : a === Lt || a === Tt ? a = G : (a = D, i = void 0);
    const b = a === D && e[n + 1].startsWith("/>") ? " " : "";
    o += a === G ? l + ge : p >= 0 ? (r.push(c), l.slice(0, p) + Vt + l.slice(p) + L + b) : l + L + (p === -2 ? n : b);
  }
  return [Zt(e, o + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class st {
  constructor({ strings: t, _$litType$: s }, r) {
    let i;
    this.parts = [];
    let o = 0, a = 0;
    const n = t.length - 1, l = this.parts, [c, d] = fe(t, s);
    if (this.el = st.createElement(c, r), j.currentNode = this.el.content, s === 2 || s === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = j.nextNode()) !== null && l.length < n; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(Vt)) {
          const f = d[a++], b = i.getAttribute(p).split(L), x = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: o, name: x[2], strings: b, ctor: x[1] === "." ? be : x[1] === "?" ? ye : x[1] === "@" ? _e : ut }), i.removeAttribute(p);
        } else p.startsWith(L) && (l.push({ type: 6, index: o }), i.removeAttribute(p));
        if (qt.test(i.tagName)) {
          const p = i.textContent.split(L), f = p.length - 1;
          if (f > 0) {
            i.textContent = lt ? lt.emptyScript : "";
            for (let b = 0; b < f; b++) i.append(p[b], tt()), j.nextNode(), l.push({ type: 2, index: ++o });
            i.append(p[f], tt());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Wt) l.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(L, p + 1)) !== -1; ) l.push({ type: 7, index: o }), p += L.length - 1;
      }
      o++;
    }
  }
  static createElement(t, s) {
    const r = R.createElement("template");
    return r.innerHTML = t, r;
  }
}
function W(e, t, s = e, r) {
  var a, n;
  if (t === V) return t;
  let i = r !== void 0 ? (a = s._$Co) == null ? void 0 : a[r] : s._$Cl;
  const o = et(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((n = i == null ? void 0 : i._$AO) == null || n.call(i, !1), o === void 0 ? i = void 0 : (i = new o(e), i._$AT(e, s, r)), r !== void 0 ? (s._$Co ?? (s._$Co = []))[r] = i : s._$Cl = i), i !== void 0 && (t = W(e, i._$AS(e, t.values), i, r)), t;
}
class ve {
  constructor(t, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: s }, parts: r } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? R).importNode(s, !0);
    j.currentNode = i;
    let o = j.nextNode(), a = 0, n = 0, l = r[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new ot(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new we(o, this, t)), this._$AV.push(c), l = r[++n];
      }
      a !== (l == null ? void 0 : l.index) && (o = j.nextNode(), a++);
    }
    return j.currentNode = R, i;
  }
  p(t) {
    let s = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, s), s += r.strings.length - 2) : r._$AI(t[s])), s++;
  }
}
class ot {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, s, r, i) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = r, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    t = W(this, t, s), et(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== V && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : me(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && et(this._$AH) ? this._$AA.nextSibling.data = t : this.T(R.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: s, _$litType$: r } = t, i = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = st.createElement(Zt(r.h, r.h[0]), this.options)), r);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(s);
    else {
      const a = new ve(i, this), n = a.u(this.options);
      a.p(s), this.T(n), this._$AH = a;
    }
  }
  _$AC(t) {
    let s = zt.get(t.strings);
    return s === void 0 && zt.set(t.strings, s = new st(t)), s;
  }
  k(t) {
    $t(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let r, i = 0;
    for (const o of t) i === s.length ? s.push(r = new ot(this.O(tt()), this.O(tt()), this, this.options)) : r = s[i], r._$AI(o), i++;
    i < s.length && (this._$AR(r && r._$AB.nextSibling, i), s.length = i);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, s); t !== this._$AB; ) {
      const i = Pt(t).nextSibling;
      Pt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var s;
    this._$AM === void 0 && (this._$Cv = t, (s = this._$AP) == null || s.call(this, t));
  }
}
class ut {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, r, i, o) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = s, this._$AM = i, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = g;
  }
  _$AI(t, s = this, r, i) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = W(this, t, s, 0), a = !et(t) || t !== this._$AH && t !== V, a && (this._$AH = t);
    else {
      const n = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = W(this, n[r + l], s, l), c === V && (c = this._$AH[l]), a || (a = !et(c) || c !== this._$AH[l]), c === g ? t = g : t !== g && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class be extends ut {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class ye extends ut {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class _e extends ut {
  constructor(t, s, r, i, o) {
    super(t, s, r, i, o), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = W(this, t, s, 0) ?? g) === V) return;
    const r = this._$AH, i = t === g && r !== g || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, o = t !== g && (r === g || i);
    i && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var s;
    typeof this._$AH == "function" ? this._$AH.call(((s = this.options) == null ? void 0 : s.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class we {
  constructor(t, s, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    W(this, t);
  }
}
const vt = Y.litHtmlPolyfillSupport;
vt == null || vt(st, ot), (Y.litHtmlVersions ?? (Y.litHtmlVersions = [])).push("3.3.3");
const xe = (e, t, s) => {
  const r = (s == null ? void 0 : s.renderBefore) ?? t;
  let i = r._$litPart$;
  if (i === void 0) {
    const o = (s == null ? void 0 : s.renderBefore) ?? null;
    r._$litPart$ = i = new ot(t.insertBefore(tt(), o), o, void 0, s ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis;
class _ extends F {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var s;
    const t = super.createRenderRoot();
    return (s = this.renderOptions).renderBefore ?? (s.renderBefore = t.firstChild), t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = xe(s, this.renderRoot, this.renderOptions);
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
    return V;
  }
}
var It;
_._$litElement$ = !0, _.finalized = !0, (It = H.litElementHydrateSupport) == null || It.call(H, { LitElement: _ });
const bt = H.litElementPolyfillSupport;
bt == null || bt({ LitElement: _ });
(H.litElementVersions ?? (H.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = { attribute: !0, type: String, converter: nt, reflect: !1, hasChanged: xt }, ke = (e = $e, t, s) => {
  const { kind: r, metadata: i } = s;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(s.name, e), r === "accessor") {
    const { name: a } = s;
    return { set(n) {
      const l = t.get.call(this);
      t.set.call(this, n), this.requestUpdate(a, l, e, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(a, void 0, e, n), n;
    } };
  }
  if (r === "setter") {
    const { name: a } = s;
    return function(n) {
      const l = this[a];
      t.call(this, n), this.requestUpdate(a, l, e, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function u(e) {
  return (t, s) => typeof s == "object" ? ke(e, t, s) : ((r, i, o) => {
    const a = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, r), a ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function m(e) {
  return u({ ...e, state: !0, attribute: !1 });
}
var Se = Object.defineProperty, Ae = Object.getOwnPropertyDescriptor, kt = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ae(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (r ? a(t, s, i) : a(i)) || i);
  return r && i && Se(t, s, i), i;
};
let rt = class extends _ {
  constructor() {
    super(...arguments), this.points = [], this.state = "normal";
  }
  render() {
    const e = Ee(this.points), t = e ?? Oe(), s = !e;
    return Q`
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
        ${s ? "" : Q`
              ${t.fillPath ? Q`<path class="fill-base" d=${t.fillPath}></path>` : ""}
            `}
        <path class="line" d=${t.path}></path>
      </svg>
    `;
  }
};
rt.styles = k`
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
kt([
  u({ attribute: !1 })
], rt.prototype, "points", 2);
kt([
  u({ type: String, reflect: !0 })
], rt.prototype, "state", 2);
rt = kt([
  E("savant-sparkline")
], rt);
function Ee(e) {
  const t = e.map((o) => o.value).filter(Number.isFinite);
  if (!t.length) return;
  if (t.every((o) => Math.max(0, o) === 0)) return Me(t.length);
  if (t.length === 1) {
    const o = Dt(t[0], jt(t)), a = Math.max(0, t[0]);
    return {
      path: `M 0 ${o} L 100 ${o}`,
      fillPath: a > 0 ? `M 0 ${o} L 100 ${o} L 100 36 L 0 36 Z` : ""
    };
  }
  const s = jt(t), r = t.map((o, a) => {
    const n = a / (t.length - 1) * 100, l = Math.max(0, o);
    return [n, l === 0 ? N : Dt(o, s), l];
  });
  return {
    path: Ce(r),
    fillPath: Le(r)
  };
}
function Dt(e, t) {
  return N - Math.max(0, e) / t * (N - Pe);
}
function jt(e) {
  return Math.max(1, ...e) * 1.25;
}
function Oe() {
  return {
    path: `M 0 ${N} L 100 ${N}`,
    fillPath: ""
  };
}
function Me(e) {
  return e <= 1 ? {
    path: `M 0 ${N} L 100 ${N}`,
    fillPath: ""
  } : { path: Array.from({ length: e }, (s, r) => {
    const i = r / (e - 1) * 100;
    return `${r === 0 ? "M" : "L"} ${i.toFixed(2)} ${N.toFixed(2)}`;
  }).join(" "), fillPath: "" };
}
const Pe = 5, N = 33;
function Ce(e) {
  if (e.every(([, , s]) => s === 0))
    return e.map(([s, r], i) => `${i === 0 ? "M" : "L"} ${s.toFixed(2)} ${r.toFixed(2)}`).join(" ");
  const t = [];
  for (let s = 1; s < e.length; s += 1) {
    const r = e[s - 1], i = e[s];
    t.push(`M ${r[0].toFixed(2)} ${r[1].toFixed(2)} L ${i[0].toFixed(2)} ${i[1].toFixed(2)}`);
  }
  return t.join(" ");
}
function Le(e) {
  const t = [];
  for (let s = 1; s < e.length; s += 1) {
    const r = e[s - 1], i = e[s];
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
var Te = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, gt = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ne(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (r ? a(t, s, i) : a(i)) || i);
  return r && i && Te(t, s, i), i;
};
let q = class extends _ {
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
q.styles = k`
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
gt([
  u({ type: String })
], q.prototype, "avg", 2);
gt([
  u({ type: String })
], q.prototype, "max", 2);
gt([
  u({ type: Boolean, reflect: !0 })
], q.prototype, "stacked", 2);
q = gt([
  E("savant-metric-row")
], q);
function ct(e, t, s) {
  e.dispatchEvent(
    new CustomEvent(t, {
      detail: s,
      bubbles: !0,
      composed: !0
    })
  );
}
var Be = Object.defineProperty, ze = Object.getOwnPropertyDescriptor, Kt = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? ze(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (r ? a(t, s, i) : a(i)) || i);
  return r && i && Be(t, s, i), i;
};
const Ht = {
  flash: "M7,2V13H10V22L17,10H13L17,2H7Z",
  power: "M13,3H11V13H13V3M17.83,5.17L16.41,6.59C17.99,7.86 19,9.81 19,12A7,7 0 0,1 12,19A7,7 0 0,1 5,12C5,9.81 6.01,7.86 7.59,6.59L6.17,5.17C4.23,6.82 3,9.26 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12C21,9.26 19.77,6.82 17.83,5.17Z",
  search: "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20 15.5 14Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z",
  sort_amount_down: "M3 7h10v2H3V7m0 4h7v2H3v-2m0 4h4v2H3v-2m14-7 4 4h-3v6h-2v-6h-3l4-4Z",
  minimize_2: ""
};
let ht = class extends _ {
  constructor() {
    super(...arguments), this.icon = "flash";
  }
  render() {
    return this.icon === "minimize_2" ? Q`
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 10h-4v-4" />
          <path d="M20 4l-6 6" />
          <path d="M6 14h4v4" />
          <path d="M10 14l-6 6" />
        </svg>
      ` : h`
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        ${Q`<path d=${Ht[this.icon] ?? Ht.flash}></path>`}
      </svg>
    `;
  }
};
ht.styles = k`
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
Kt([
  u({ type: String })
], ht.prototype, "icon", 2);
ht = Kt([
  E("savant-icon")
], ht);
var De = Object.defineProperty, je = Object.getOwnPropertyDescriptor, C = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? je(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (r ? a(t, s, i) : a(i)) || i);
  return r && i && De(t, s, i), i;
};
let A = class extends _ {
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
    ct(this, "savant-breaker-toggle", { breakerId: this.breakerId });
  }
};
A.styles = k`
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
        var(--savant-tile-bg);
      color: var(--control-color, var(--savant-success));
      display: grid;
      place-items: center;
      cursor: pointer;
      touch-action: none;
      box-shadow: var(--savant-shadow-sm);
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
      background: var(--savant-card-bg);
      line-height: 1;
    }

    savant-icon {
      display: block;
      width: 20px;
      height: 20px;
    }
  `;
C([
  u({ type: String })
], A.prototype, "breakerId", 2);
C([
  u({ type: String })
], A.prototype, "label", 2);
C([
  u({ type: String })
], A.prototype, "switchState", 2);
C([
  u({ type: String })
], A.prototype, "mode", 2);
C([
  u({ type: Boolean })
], A.prototype, "disabled", 2);
C([
  u({ type: Boolean })
], A.prototype, "pending", 2);
C([
  m()
], A.prototype, "holding", 2);
C([
  m()
], A.prototype, "progress", 2);
A = C([
  E("savant-hold-control-button")
], A);
function B(e) {
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function X(e) {
  if (e === void 0 || !Number.isFinite(e)) return "--";
  const t = Math.abs(e);
  return t >= 1e3 ? `${He(e / 1e3, t >= 1e4 ? 1 : 2)} kW` : `${Math.round(e)} W`;
}
function He(e, t) {
  return e.toLocaleString(void 0, {
    maximumFractionDigits: t,
    minimumFractionDigits: 0
  });
}
function Re(e, t = "kWh") {
  return e === void 0 || !Number.isFinite(e) ? "--" : `${e.toLocaleString(void 0, { maximumFractionDigits: 2 })} ${t}`;
}
var Ue = Object.defineProperty, Ie = Object.getOwnPropertyDescriptor, S = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ie(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (r ? a(t, s, i) : a(i)) || i);
  return r && i && Ue(t, s, i), i;
};
let w = class extends _ {
  constructor() {
    super(...arguments), this.highLoadThresholdWatts = 2e3, this.warningLoadThresholdWatts = 1e3, this.graphLoading = !1, this.pending = !1, this.stacked = !1, this.mobileLayout = "standard", this.error = "";
  }
  render() {
    var c, d, p, f, b, x, $;
    const e = this.runtimeState(), t = this.visualState(e.powerWatts, e.switchState, e.available), s = this.loadState(e.powerWatts), r = this.stacked && this.mobileLayout === "ultra_compact", i = this.display.show_area ? this.breaker.areaName : void 0, o = t === "off" ? Ve((c = this.statistics) == null ? void 0 : c.points.length) : ((d = this.statistics) == null ? void 0 : d.points) ?? [], a = !!((p = this.statistics) != null && p.points.length), n = !r && a && (((f = this.statistics) == null ? void 0 : f.averageWatts) !== void 0 || ((b = this.statistics) == null ? void 0 : b.maximumWatts) !== void 0), l = this.display.show_controls && this.display.control_mode !== "hidden" && this.breaker.controllable && !!this.breaker.entities.switch;
    return h`
      <button class=${`tile ${t} ${this.pending ? "pending" : ""} ${r ? "ultra-compact" : ""}`} @click=${this.openMoreInfo}>
        <span class="mobile-bar" aria-hidden="true"></span>
        <span class="topline">
          <span class="state-dot" aria-hidden="true"></span>
          ${this.display.show_state ? h`<span class="state-text">${Fe(t, e.switchState)}</span>` : ""}
          ${this.display.show_icon ? this.renderEntityIcon() : ""}
        </span>
        <span class="name">${this.display.label}</span>
        ${i && !r ? h`<span class="subtitle">${i}</span>` : ""}
        <span class="power">${this.display.show_current_power ? X(e.powerWatts) : ""}</span>
        <span class="graph">
          ${this.graphLoading && t !== "off" ? this.renderGraphSkeleton() : this.display.show_sparkline ? h`<savant-sparkline
                  .points=${o}
                  .state=${!a || t === "unavailable" || t === "off" ? "muted" : s === "high" ? "warning" : s === "warning" ? "caution" : "normal"}
                ></savant-sparkline>` : ""}
        </span>
        <span class="metrics">
          ${n && (this.display.show_average_power || this.display.show_maximum_power) ? h`<savant-metric-row
                .avg=${this.display.show_average_power ? X((x = this.statistics) == null ? void 0 : x.averageWatts) : "--"}
                .max=${this.display.show_maximum_power ? X(($ = this.statistics) == null ? void 0 : $.maximumWatts) : "--"}
                ?stacked=${this.stacked}
              ></savant-metric-row>` : ""}
          ${this.display.show_energy ? h`<span class="energy">${Re(e.energyValue)}</span>` : ""}
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
    var s, r;
    const e = this.breaker.entities.power, t = e ? (r = (s = this.hass) == null ? void 0 : s.states[e]) == null ? void 0 : r.attributes.icon : void 0;
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
    var n, l, c, d, p, f, b, x, $, M;
    const e = this.breaker.entities.power, t = this.breaker.entities.energy, s = this.breaker.entities.switch, r = e ? B((l = (n = this.hass) == null ? void 0 : n.states[e]) == null ? void 0 : l.state) : void 0, i = t ? B((d = (c = this.hass) == null ? void 0 : c.states[t]) == null ? void 0 : d.state) : void 0, o = this.optimisticSwitchState ?? (s ? (f = (p = this.hass) == null ? void 0 : p.states[s]) == null ? void 0 : f.state : void 0), a = this.breaker.available && (!e || ((x = (b = this.hass) == null ? void 0 : b.states[e]) == null ? void 0 : x.state) !== "unavailable") && (!s || ((M = ($ = this.hass) == null ? void 0 : $.states[s]) == null ? void 0 : M.state) !== "unavailable");
    return { powerWatts: r, energyValue: i, switchState: o, available: a };
  }
  visualState(e, t, s = !0) {
    return this.error ? "error" : this.pending ? "pending" : s ? t === "off" ? "off" : t === "on" ? "on" : e === 0 ? "off" : "on" : "unavailable";
  }
  loadState(e) {
    return e !== void 0 && e > this.highLoadThresholdWatts ? "high" : e !== void 0 && e > this.warningLoadThresholdWatts ? "warning" : "normal";
  }
  openMoreInfo(e) {
    if (e.target.closest("savant-hold-control-button")) return;
    const s = this.breaker.entities.power ?? this.breaker.entities.switch ?? this.breaker.entities.energy;
    s && ct(this, "hass-action", {
      config: {
        entity: s,
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
          180deg,
          color-mix(in srgb, var(--savant-tile-bg-strong) 60%, var(--savant-surface-tint)),
          var(--savant-tile-bg)
        );
      color: var(--savant-tile-fg);
      box-shadow: var(--savant-shadow-sm);
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
      color: color-mix(in srgb, var(--primary-text-color) 86%, var(--secondary-text-color));
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
S([
  u({ attribute: !1 })
], w.prototype, "hass", 2);
S([
  u({ attribute: !1 })
], w.prototype, "breaker", 2);
S([
  u({ attribute: !1 })
], w.prototype, "display", 2);
S([
  u({ attribute: !1 })
], w.prototype, "statistics", 2);
S([
  u({ type: Number })
], w.prototype, "highLoadThresholdWatts", 2);
S([
  u({ type: Number })
], w.prototype, "warningLoadThresholdWatts", 2);
S([
  u({ type: Boolean })
], w.prototype, "graphLoading", 2);
S([
  u({ type: Boolean })
], w.prototype, "pending", 2);
S([
  u({ type: Boolean, reflect: !0 })
], w.prototype, "stacked", 2);
S([
  u({ type: String, attribute: "mobile-layout", reflect: !0 })
], w.prototype, "mobileLayout", 2);
S([
  u({ type: String })
], w.prototype, "optimisticSwitchState", 2);
S([
  u({ type: String })
], w.prototype, "error", 2);
w = S([
  E("savant-breaker-tile")
], w);
function Fe(e, t) {
  return e === "unavailable" ? "Unavailable" : t === "off" || e === "off" ? "Off" : "On";
}
function Ve(e = 2) {
  return Array.from({ length: Math.max(2, e) }, (t, s) => ({
    start: s,
    value: 0
  }));
}
const We = k`
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
var qe = Object.defineProperty, Ge = Object.getOwnPropertyDescriptor, Yt = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ge(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (r ? a(t, s, i) : a(i)) || i);
  return r && i && qe(t, s, i), i;
};
let dt = class extends _ {
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
dt.styles = [
  We,
  k`
      :host {
        position: relative;
        display: grid;
        aspect-ratio: 1 / 1;
        min-height: 0;
        padding: 16px;
        border-radius: var(--savant-radius);
        background: var(--savant-tile-bg);
        box-shadow: var(--savant-shadow-sm);
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
Yt([
  u({ type: Boolean, reflect: !0 })
], dt.prototype, "stacked", 2);
dt = Yt([
  E("savant-breaker-tile-skeleton")
], dt);
var Ze = Object.getOwnPropertyDescriptor, Ke = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ze(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = a(i) || i);
  return i;
};
let yt = class extends _ {
  render() {
    return h`
      <div class="empty">
        <strong>No Savant breaker entities discovered.</strong>
        <span>Open the card editor to add manual mappings or check Savant Energy entity metadata.</span>
      </div>
    `;
  }
};
yt.styles = k`
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
yt = Ke([
  E("savant-board-empty-state")
], yt);
var Ye = Object.defineProperty, Qe = Object.getOwnPropertyDescriptor, Qt = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Qe(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (r ? a(t, s, i) : a(i)) || i);
  return r && i && Ye(t, s, i), i;
};
let pt = class extends _ {
  constructor() {
    super(...arguments), this.message = "Unable to load breaker board.";
  }
  render() {
    return h`<div class="error">${this.message}</div>`;
  }
};
pt.styles = k`
    .error {
      padding: 16px;
      border-radius: var(--savant-radius);
      color: var(--error-color);
      background: color-mix(in srgb, var(--error-color) 12%, transparent);
    }
  `;
Qt([
  u({ type: String })
], pt.prototype, "message", 2);
pt = Qt([
  E("savant-board-error-state")
], pt);
var Xe = Object.defineProperty, Je = Object.getOwnPropertyDescriptor, St = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Je(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (r ? a(t, s, i) : a(i)) || i);
  return r && i && Xe(t, s, i), i;
};
let it = class extends _ {
  render() {
    var t;
    const e = (t = this.breaker) == null ? void 0 : t.semMetrics;
    return !this.breaker || !e ? g : h`
      <article class="sem-chip">
        <div class="node top">${this.metric("Solar", "flash", e.solar)}</div>
        <div class="node left">${this.metric("Battery", "power", e.batteryPower)}</div>
        <div class="node center">${this.metric("Home Load", "power", e.homeLoad)}</div>
        <div class="node right">${this.metric("Grid", "flash", e.grid)}</div>
        <div class="node bottom">
          ${e.batterySoc ? this.percentMetric("Battery SoC", "power", e.batterySoc) : g}
        </div>
      </article>
    `;
  }
  metric(e, t, s) {
    var i, o;
    const r = s ? B((o = (i = this.hass) == null ? void 0 : i.states[s]) == null ? void 0 : o.state) : void 0;
    return h`<div class="metric"><savant-icon .icon=${t}></savant-icon><span>${e}</span><strong>${X(r)}</strong></div>`;
  }
  percentMetric(e, t, s) {
    var i, o;
    const r = B((o = (i = this.hass) == null ? void 0 : i.states[s]) == null ? void 0 : o.state);
    return h`<div class="metric"><savant-icon .icon=${t}></savant-icon><span>${e}</span><strong>${r === void 0 ? "--" : `${Math.round(r)}%`}</strong></div>`;
  }
};
it.styles = k`
    .sem-chip {
      position: relative;
      min-height: 170px;
      padding: 12px;
      border: 1px solid var(--savant-border);
      border-radius: var(--savant-radius);
      background: var(--savant-tile-bg);
      box-shadow: var(--savant-shadow-sm);
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: auto auto auto;
      gap: 8px;
      grid-column: 1 / -1;
    }
    .sem-chip::before,
    .sem-chip::after {
      content: "";
      position: absolute;
      pointer-events: none;
      background: color-mix(in srgb, var(--primary-text-color) 18%, transparent);
    }
    .sem-chip::before { left: 50%; top: 42px; width: 1px; height: 84px; transform: translateX(-0.5px); }
    .sem-chip::after { left: 22%; right: 22%; top: 84px; height: 1px; }
    .node.top { grid-column: 2; grid-row: 1; }
    .node.left { grid-column: 1; grid-row: 2; }
    .node.center { grid-column: 2; grid-row: 2; }
    .node.right { grid-column: 3; grid-row: 2; }
    .node.bottom { grid-column: 2; grid-row: 3; }
    .metric {
      position: relative;
      z-index: 1;
      display: grid;
      justify-items: center;
      gap: 2px;
      text-align: center;
      padding: 6px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--savant-card-bg) 88%, var(--savant-app-bg));
    }
    .metric savant-icon { width: 14px; height: 14px; }
    .metric span { font-size: 11px; color: var(--secondary-text-color); }
    .metric strong { font-size: 13px; font-weight: 700; color: var(--primary-text-color); }
  `;
St([
  u({ attribute: !1 })
], it.prototype, "hass", 2);
St([
  u({ attribute: !1 })
], it.prototype, "breaker", 2);
it = St([
  E("savant-sem-chip")
], it);
class ts {
  constructor(t) {
    this.manualBreakers = t;
  }
  async discover(t) {
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
            var o;
            return i && ((o = t.states[i]) == null ? void 0 : o.state) !== "unavailable";
          }
        ),
        discoveryConfidence: "manual"
      };
    });
  }
}
function Xt(e, t) {
  const s = e.split(".")[0], r = t == null ? void 0 : t.attributes.device_class;
  if (s === "switch") return "switch";
  if (s === "sensor") {
    if (r === "power") return "power";
    if (r === "energy") return "energy";
    if (r === "voltage") return "voltage";
    if (r === "current") return "current";
  }
}
function es(e) {
  var a;
  const t = new Map(e.devices.map((n) => [n.id, n])), s = new Map(e.areas.map((n) => [n.area_id, n.name])), r = /* @__PURE__ */ new Map(), i = [];
  for (const n of e.entities)
    if (!(n.disabled_by || n.hidden_by) && ss(n, t.get(n.device_id ?? ""), e.integration))
      if (n.device_id) {
        const l = r.get(n.device_id) ?? [];
        l.push(n), r.set(n.device_id, l);
      } else
        i.push(n);
  const o = [];
  for (const [n, l] of r) {
    const c = rs(n, l, t.get(n), s, e.states);
    c && o.push(c);
  }
  for (const n of i) {
    const l = Xt(n.entity_id, e.states[n.entity_id]);
    l && o.push({
      id: ls(n),
      name: Jt(n, e.states[n.entity_id]),
      areaId: n.area_id,
      areaName: n.area_id ? s.get(n.area_id) : void 0,
      controllable: l === "switch",
      entities: { [l]: n.entity_id },
      available: ((a = e.states[n.entity_id]) == null ? void 0 : a.state) !== "unavailable",
      discoveryConfidence: "medium",
      discoveryNotes: ["Associated from entity registry without a device_id."]
    });
  }
  return o;
}
function ss(e, t, s) {
  var o;
  if (e.platform === s) return !0;
  const r = ((t == null ? void 0 : t.manufacturer) ?? "").toLowerCase(), i = ((o = t == null ? void 0 : t.identifiers) == null ? void 0 : o.flat().join(" ").toLowerCase()) ?? "";
  return r.includes("savant") || i.includes(s.toLowerCase());
}
function rs(e, t, s, r, i) {
  var x;
  const o = {}, a = [];
  for (const $ of t) {
    const M = Xt($.entity_id, i[$.entity_id]);
    !M || o[M] || (o[M] = $.entity_id);
  }
  if (!Object.keys(o).length) return;
  const n = t.find(($) => $.entity_id === o.power) ?? t[0], l = (n == null ? void 0 : n.area_id) ?? (s == null ? void 0 : s.area_id) ?? void 0, c = n ? (x = i[n.entity_id]) == null ? void 0 : x.attributes : {}, d = ns((c == null ? void 0 : c.circuit_number) ?? (c == null ? void 0 : c.circuit)), p = as(c == null ? void 0 : c.panel_name, c == null ? void 0 : c.panel, s == null ? void 0 : s.model), f = is(s, t), b = f ? os(t, i) : void 0;
  return o.power || a.push("No power sensor with device_class: power was found."), o.switch || a.push("No switch entity was found for breaker control."), {
    id: `device:${e}`,
    deviceId: e,
    name: (s == null ? void 0 : s.name_by_user) || (s == null ? void 0 : s.name) || Jt(n, n ? i[n.entity_id] : void 0),
    areaId: l,
    areaName: l ? r.get(l) : void 0,
    panelName: p,
    circuitNumber: d,
    controllable: !!o.switch,
    entities: o,
    available: Object.values(o).some(($) => {
      var M;
      return ((M = i[$]) == null ? void 0 : M.state) !== "unavailable";
    }),
    discoveryConfidence: o.power && o.switch ? "high" : "medium",
    discoveryNotes: a.length ? a : void 0,
    isSem: f,
    semMetrics: b
  };
}
function is(e, t) {
  const s = `${(e == null ? void 0 : e.name) ?? ""} ${(e == null ? void 0 : e.name_by_user) ?? ""} ${(e == null ? void 0 : e.model) ?? ""} ${(e == null ? void 0 : e.manufacturer) ?? ""}`.toLowerCase();
  return s.includes("sem") || s.includes("energy monitor") || s.includes("energy hub") ? !0 : t.some((r) => `${r.name ?? ""} ${r.original_name ?? ""} ${r.entity_id}`.toLowerCase().includes("sem"));
}
function os(e, t) {
  var r, i;
  const s = {};
  for (const o of e) {
    const a = t[o.entity_id], n = `${o.name ?? ""} ${o.original_name ?? ""} ${((r = a == null ? void 0 : a.attributes) == null ? void 0 : r.friendly_name) ?? ""} ${o.entity_id}`.toLowerCase(), l = String(((i = a == null ? void 0 : a.attributes) == null ? void 0 : i.device_class) ?? "").toLowerCase();
    !s.homeLoad && /(home|total).*(load|consumption)|consumption|house load/.test(n) && (s.homeLoad = o.entity_id), !s.solar && /solar|pv/.test(n) && (s.solar = o.entity_id), !s.grid && /grid|utility|mains/.test(n) && (s.grid = o.entity_id), !s.batterySoc && (l === "battery" || /soc|state.?of.?charge|battery.*%/.test(n)) && (s.batterySoc = o.entity_id), !s.batteryPower && /battery/.test(n) && !/soc|state.?of.?charge|%/.test(n) && (s.batteryPower = o.entity_id);
  }
  return Object.values(s).some(Boolean) ? s : void 0;
}
function as(...e) {
  return e.find((t) => typeof t == "string" && t.length > 0);
}
function ns(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function ls(e) {
  return e.unique_id ? `entity:${e.unique_id}` : `entity:${e.entity_id}`;
}
function Jt(e, t) {
  return (e == null ? void 0 : e.name) || (e == null ? void 0 : e.original_name) || (t == null ? void 0 : t.attributes.friendly_name) || (e == null ? void 0 : e.entity_id) || "Savant breaker";
}
class cs {
  constructor(t) {
    this.integration = t;
  }
  async discover(t) {
    const s = await hs(t);
    return es({
      ...s,
      states: t.states,
      integration: this.integration
    });
  }
}
async function hs(e) {
  const t = e.connection;
  if (!(t != null && t.sendMessagePromise))
    return { entities: [], devices: [], areas: [] };
  const [s, r, i] = await Promise.all([
    t.sendMessagePromise({ type: "config/entity_registry/list" }),
    t.sendMessagePromise({ type: "config/device_registry/list" }),
    t.sendMessagePromise({ type: "config/area_registry/list" })
  ]);
  return {
    entities: s,
    devices: r,
    areas: i
  };
}
class te {
  constructor(t) {
    this.providers = t;
  }
  async discover(t, s) {
    const r = this.providers ?? [
      ...s.discovery.enabled ? [new cs(s.discovery.integration)] : [],
      new ts(s.manual_breakers)
    ], i = await Promise.all(r.map((o) => o.discover(t)));
    return ds(i.flat());
  }
}
function ds(e) {
  const t = /* @__PURE__ */ new Map();
  for (const s of e) {
    const r = t.get(s.id);
    t.set(
      s.id,
      r ? {
        ...r,
        ...s,
        entities: { ...r.entities, ...s.entities },
        discoveryNotes: [...r.discoveryNotes ?? [], ...s.discoveryNotes ?? []]
      } : s
    );
  }
  return [...t.values()];
}
class ps {
  async fetchHistory(t, s, r) {
    var l;
    if (!((l = t.connection) != null && l.sendMessagePromise)) return [];
    const i = /* @__PURE__ */ new Date(), o = new Date(i.getTime() - us(r)), a = await t.connection.sendMessagePromise({
      type: "history/history_during_period",
      start_time: o.toISOString(),
      end_time: i.toISOString(),
      entity_ids: [s],
      minimal_response: !0,
      no_attributes: !0
    });
    return ((a == null ? void 0 : a[0]) ?? []).map((c) => ({
      start: new Date(c.last_changed ?? c.lu ?? c.s).getTime(),
      value: Number(c.state)
    })).filter((c) => Number.isFinite(c.start) && Number.isFinite(c.value));
  }
}
function us(e) {
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
class gs {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.history = new ps();
  }
  async getStatistics(t, s, r, i) {
    const o = `${s}:${r}`, a = Date.now(), n = this.cache.get(o);
    if (n && a - n.fetchedAt < i * 1e3)
      return n.data;
    try {
      const l = await this.fetchStatisticsOrHistory(t, s, r), c = l.map((p) => p.value).filter(Number.isFinite), d = {
        entityId: s,
        period: r,
        points: l,
        averageWatts: c.length ? c.reduce((p, f) => p + f, 0) / c.length : void 0,
        maximumWatts: c.length ? Math.max(...c) : void 0,
        loading: !1,
        fetchedAt: a
      };
      return this.cache.set(o, { data: d, fetchedAt: a }), d;
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
  invalidate(t) {
    if (!t) {
      this.cache.clear();
      return;
    }
    for (const s of this.cache.keys())
      s.startsWith(`${t}:`) && this.cache.delete(s);
  }
  async fetchStatisticsOrHistory(t, s, r) {
    var i;
    if (!((i = t.connection) != null && i.sendMessagePromise)) return [];
    if (r === "7d" || r === "24h" || r === "12h" || r === "6h")
      try {
        const o = /* @__PURE__ */ new Date(), a = new Date(o.getTime() - ms(r)), n = await t.connection.sendMessagePromise({
          type: "recorder/statistics_during_period",
          start_time: a.toISOString(),
          end_time: o.toISOString(),
          statistic_ids: [s],
          period: r === "7d" ? "hour" : "5minute",
          types: ["mean", "max"]
        }), c = ((n == null ? void 0 : n[s]) ?? []).map((d) => ({
          start: new Date(d.start).getTime(),
          value: Number(d.mean ?? d.max)
        })).filter((d) => Number.isFinite(d.start) && Number.isFinite(d.value));
        if (c.length) return c;
      } catch {
      }
    return this.history.fetchHistory(t, s, r);
  }
}
function ms(e) {
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
const P = {
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
    hide_sem_chip: !0,
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
}, ee = {
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
  hide_sem_chip: "Hide SEM chip",
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
}, fs = {
  integration: "Defaults to savant_energy and is used to match registry metadata.",
  panel_filter: "Optional exact panel name to include.",
  area_filter: "Optional exact area name to include.",
  refresh_interval_seconds: "Minimum 30 seconds.",
  warning_load_threshold_watts: "Chart turns yellow above this wattage.",
  high_load_threshold_watts: "Chart turns orange above this wattage.",
  manual_breakers: "Optional fallback mappings for breakers that cannot be discovered from entity metadata.",
  id: "Use a stable ID, for example panel_1_circuit_12."
};
function vs() {
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
          U("group_by", ["none", "panel", "area", "panel_then_area"]),
          U("sort_by", ["circuit_number", "name", "current_power_descending", "highest_usage", "manual"]),
          U("density", ["comfortable", "compact"]),
          U("mobile_view", ["standard", "ultra_compact"])
        ]
      },
      {
        type: "expandable",
        name: "display",
        title: "Default Tile Details",
        schema: [
          { name: "show_title", selector: { boolean: {} } },
          { name: "hide_sem_chip", selector: { boolean: {} } },
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
          U("period", ["1h", "6h", "12h", "24h", "7d"]),
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
          U("default_mode", ["hidden", "hold", "hold_confirm_off"]),
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
                  switch_entity: Z("switch"),
                  power_entity: Z("sensor"),
                  energy_entity: Z("sensor"),
                  voltage_entity: Z("sensor"),
                  current_entity: Z("sensor"),
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
    computeLabel: (e) => ee[e.name],
    computeHelper: (e) => fs[e.name],
    assertConfig: ys
  };
}
function Z(e) {
  return {
    selector: {
      entity: {
        filter: { domain: e }
      }
    }
  };
}
function U(e, t) {
  return {
    name: e,
    selector: {
      select: {
        mode: "dropdown",
        options: t.map((s) => ({ value: s, label: ee[s] ?? bs(s) }))
      }
    }
  };
}
function bs(e) {
  return e.split("_").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
}
function ys(e) {
  if (I("discovery", e.discovery), I("layout", e.layout), I("display", e.display), I("graph", e.graph), I("controls", e.controls), e.excluded_breakers !== void 0 && !Array.isArray(e.excluded_breakers))
    throw new Error("excluded_breakers must be a list.");
  if (e.manual_breakers !== void 0 && !Array.isArray(e.manual_breakers))
    throw new Error("manual_breakers must be a list.");
  I("breaker_overrides", e.breaker_overrides);
}
function I(e, t) {
  if (t !== void 0 && (t === null || Array.isArray(t) || typeof t != "object"))
    throw new Error(`${e} must be an object.`);
}
function se(e, t) {
  const s = { ...e };
  if (!t) return s;
  for (const [r, i] of Object.entries(t))
    Array.isArray(i) ? s[r] = [...i] : i && typeof i == "object" && !Array.isArray(i) ? s[r] = se(s[r] ?? {}, i) : i !== void 0 && (s[r] = i);
  return s;
}
const _s = /* @__PURE__ */ new Set(["1h", "6h", "12h", "24h", "7d"]), ws = /* @__PURE__ */ new Set(["standard", "ultra_compact"]);
function J(e) {
  const t = se(P, e ?? {});
  t.discovery.enabled = t.discovery.enabled !== !1, t.discovery.integration = t.discovery.integration || P.discovery.integration, t.discovery.include_new_breakers = t.discovery.include_new_breakers !== !1, ws.has(t.layout.mobile_view) || (t.layout.mobile_view = P.layout.mobile_view), t.display.show_title = t.display.show_title !== !1, _s.has(t.graph.period) || (t.graph.period = P.graph.period), t.graph.refresh_interval_seconds = Math.max(30, Number(t.graph.refresh_interval_seconds) || 300);
  const s = Number(t.controls.warning_load_threshold_watts);
  t.controls.warning_load_threshold_watts = Math.max(
    0,
    Number.isFinite(s) ? s : P.controls.warning_load_threshold_watts || 1e3
  );
  const r = Number(t.controls.high_load_threshold_watts);
  return t.controls.high_load_threshold_watts = Math.max(
    0,
    Number.isFinite(r) ? r : P.controls.high_load_threshold_watts || 2e3
  ), t.excluded_breakers = Array.isArray(t.excluded_breakers) ? [...new Set(t.excluded_breakers)] : [], t.breaker_overrides = t.breaker_overrides ?? {}, t.manual_breakers = Array.isArray(t.manual_breakers) ? t.manual_breakers : [], t;
}
function xs(e, t) {
  const s = e.breaker_overrides[t.id] ?? {};
  return {
    label: s.label || t.name,
    show_current_power: s.show_current_power ?? e.display.show_current_power,
    show_average_power: s.show_average_power ?? e.display.show_average_power,
    show_maximum_power: s.show_maximum_power ?? e.display.show_maximum_power,
    show_energy: s.show_energy ?? e.display.show_energy,
    show_sparkline: s.show_sparkline ?? e.display.show_sparkline,
    show_icon: s.show_icon ?? e.display.show_icon,
    show_state: e.display.show_state,
    show_controls: s.show_controls ?? e.display.show_controls,
    show_area: e.display.show_area,
    show_circuit_number: e.display.show_circuit_number,
    control_mode: s.control_mode ?? e.controls.default_mode
  };
}
const $s = k`
  :host {
    display: block;
    color: var(--primary-text-color);
    --savant-card-bg: var(--ha-card-background, var(--card-background-color, #ffffff));
    --savant-app-bg: var(--primary-background-color, #f4f6f8);
    --savant-tile-bg: color-mix(in srgb, var(--savant-card-bg) 96%, white);
    --savant-tile-bg-strong: color-mix(in srgb, var(--savant-card-bg) 91%, white);
    --savant-surface-tint: color-mix(in srgb, var(--primary-color, #4caf50) 4%, transparent);
    --savant-tile-fg: var(--primary-text-color, #1d2327);
    --savant-muted: var(--secondary-text-color, #a9b0b4);
    --savant-success: var(--success-color, #7acb54);
    --savant-caution: var(--savant-caution-color, #f5cc4d);
    --savant-warning: var(--warning-color, #ff8f22);
    --savant-error: var(--error-color, #f05246);
    --savant-disabled: var(--disabled-text-color, #8d9499);
    --savant-border: color-mix(in srgb, var(--divider-color, #6f767b) 30%, transparent);
    --savant-border-strong: color-mix(in srgb, var(--divider-color, #6f767b) 44%, transparent);
    --savant-shadow-sm: 0 8px 18px rgb(15 23 42 / 0.08);
    --savant-shadow-md: 0 12px 28px rgb(15 23 42 / 0.1);
    --savant-radius: var(--savant-breaker-radius, 12px);
    font-family: var(--paper-font-body1_-_font-family, inherit);
  }

  ha-card {
    overflow: hidden;
    padding: 16px;
    background: var(--savant-card-bg);
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
var ks = Object.defineProperty, Ss = Object.getOwnPropertyDescriptor, y = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ss(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (r ? a(t, s, i) : a(i)) || i);
  return r && i && ks(t, s, i), i;
};
let v = class extends _ {
  constructor() {
    super(...arguments), this.config = P, this.breakers = [], this.loading = !0, this.error = "", this.stats = /* @__PURE__ */ new Map(), this.pendingSwitches = /* @__PURE__ */ new Set(), this.toggleErrors = /* @__PURE__ */ new Map(), this.stacked = !1, this.sortMenuOpen = !1, this.searchOpen = !1, this.searchQuery = "", this.optimisticSwitchStates = /* @__PURE__ */ new Map(), this.discovery = new te(), this.statistics = new gs(), this.discoveryKey = "", this.statsRefreshToken = 0, this.optimisticResetTimers = /* @__PURE__ */ new Map(), this.handleToggle = async (e) => {
      var a;
      if (e.stopPropagation(), !this.hass) return;
      const t = this.breakers.find((n) => n.id === e.detail.breakerId), s = t == null ? void 0 : t.entities.switch;
      if (!t || !s || this.pendingSwitches.has(t.id)) return;
      const i = (this.optimisticSwitchStates.get(t.id) ?? ((a = this.hass.states[s]) == null ? void 0 : a.state)) === "on" ? "off" : "on";
      this.setOptimisticSwitchState(t.id, i), this.pendingSwitches = /* @__PURE__ */ new Set([...this.pendingSwitches, t.id]), this.toggleErrors.delete(t.id);
      let o = !1;
      try {
        await this.hass.callService("switch", i === "off" ? "turn_off" : "turn_on", { entity_id: s }), o = !0;
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
    this.config = J(e), this.runtimeSortBy = this.loadPersistedSort() ?? this.config.layout.sort_by, this.runtimeMobileView = this.loadPersistedMobileView() ?? this.config.layout.mobile_view, this.setAttribute("density", this.config.layout.density), this.setAttribute("mobile-view", this.effectiveMobileView()), this.discoveryKey = "";
  }
  static getConfigElement() {
    return document.createElement("savant-energy-breaker-board-card-editor");
  }
  static getConfigForm() {
    return vs();
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
                    ${Rt.map(
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
    const e = this.visibleSemBreakers(), t = Es(this.visibleStandardBreakers(), this.config);
    return h`
      <div
        class=${`board-grid ${this.stacked ? "stacked" : ""}`}
        @savant-breaker-toggle=${this.handleToggle}
      >
        ${e.map(
      (s) => h`<savant-sem-chip .hass=${this.hass} .breaker=${s}></savant-sem-chip>`
    )}
        ${t.map(
      ([s, r]) => h`
            ${s ? h`<h3 class="group-title">${s}</h3>` : g}
            ${r.map((i) => {
        const o = xs(this.config, i), a = i.entities.power, n = a ? this.stats.get(a) : void 0;
        return h`<savant-breaker-tile
                .hass=${this.hass}
                .breaker=${i}
                .display=${o}
                .statistics=${n}
                ?stacked=${this.stacked}
                .mobileLayout=${this.effectiveMobileView()}
                .optimisticSwitchState=${this.optimisticSwitchStates.get(i.id)}
                .graphLoading=${!!(a && !n)}
                .pending=${this.pendingSwitches.has(i.id)}
                .error=${this.toggleErrors.get(i.id) ?? ""}
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
        this.visibleStandardBreakers().map((r) => r.entities.power).filter((r) => !!r)
      )
    ], s = await Promise.all(
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
    e === this.statsRefreshToken && (this.stats = new Map(s));
  }
  visibleBreakers() {
    const e = new Set(this.config.excluded_breakers), t = this.searchQuery.trim().toLowerCase(), s = this.breakers.filter((r) => e.has(r.id) ? !1 : t ? [r.name, r.areaName, r.panelName].filter(Boolean).some((i) => i.toLowerCase().includes(t)) : !0);
    return As(
      s,
      this.config,
      this.hass,
      this.stats,
      this.effectiveSortBy()
    );
  }
  visibleStandardBreakers() {
    return this.visibleBreakers().filter((e) => !e.isSem);
  }
  visibleSemBreakers() {
    return this.config.display.hide_sem_chip ? [] : this.visibleBreakers().filter((e) => e.isSem);
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
    return Rt.some((s) => s.value === e) ? e ?? void 0 : void 0;
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
    const s = this.optimisticResetTimers.get(e);
    s !== void 0 && (window.clearTimeout(s), this.optimisticResetTimers.delete(e)), this.optimisticSwitchStates = new Map(this.optimisticSwitchStates), this.optimisticSwitchStates.set(e, t);
  }
  clearOptimisticSwitchState(e) {
    const t = this.optimisticResetTimers.get(e);
    if (t !== void 0 && (window.clearTimeout(t), this.optimisticResetTimers.delete(e)), !this.optimisticSwitchStates.has(e)) return;
    const s = new Map(this.optimisticSwitchStates);
    s.delete(e), this.optimisticSwitchStates = s;
  }
};
v.styles = [
  $s,
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
        border: 1px solid color-mix(in srgb, var(--primary-text-color) 70%, var(--divider-color));
        border-radius: var(--savant-radius);
        color: var(--primary-text-color);
        background: var(--savant-tile-bg);
        box-shadow: var(--savant-shadow-sm);
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
        box-shadow: var(--savant-shadow-md);
      }

      .chip-tool.active {
        border-color: color-mix(in srgb, var(--primary-color) 84%, var(--primary-text-color));
        box-shadow: var(--savant-shadow-md);
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
        background: var(--savant-tile-bg);
        box-shadow: var(--savant-shadow-sm);
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
        border: 1px solid var(--savant-border-strong);
        border-radius: var(--savant-radius);
        background: var(--savant-card-bg);
        box-shadow: var(--savant-shadow-md);
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
        background: color-mix(in srgb, var(--savant-tile-bg) 92%, var(--primary-text-color));
      }

      .search-input {
        box-sizing: border-box;
      }
    `
];
y([
  u({ attribute: !1 })
], v.prototype, "hass", 2);
y([
  m()
], v.prototype, "config", 2);
y([
  m()
], v.prototype, "breakers", 2);
y([
  m()
], v.prototype, "loading", 2);
y([
  m()
], v.prototype, "error", 2);
y([
  m()
], v.prototype, "stats", 2);
y([
  m()
], v.prototype, "pendingSwitches", 2);
y([
  m()
], v.prototype, "toggleErrors", 2);
y([
  m()
], v.prototype, "stacked", 2);
y([
  m()
], v.prototype, "sortMenuOpen", 2);
y([
  m()
], v.prototype, "searchOpen", 2);
y([
  m()
], v.prototype, "searchQuery", 2);
y([
  m()
], v.prototype, "runtimeSortBy", 2);
y([
  m()
], v.prototype, "runtimeMobileView", 2);
y([
  m()
], v.prototype, "optimisticSwitchStates", 2);
v = y([
  E("savant-energy-breaker-board-card")
], v);
const Rt = [
  { value: "circuit_number", label: "Circuit number" },
  { value: "name", label: "Name" },
  { value: "current_power_descending", label: "Current power" },
  { value: "highest_usage", label: "Highest usage" },
  { value: "manual", label: "Manual" }
];
function As(e, t, s, r = /* @__PURE__ */ new Map(), i = t.layout.sort_by) {
  return [...e].sort((o, a) => {
    var n, l;
    if (i === "name") return o.name.localeCompare(a.name);
    if (i === "current_power_descending") {
      const c = B(o.entities.power ? (n = s == null ? void 0 : s.states[o.entities.power]) == null ? void 0 : n.state : void 0) ?? -1 / 0;
      return (B(a.entities.power ? (l = s == null ? void 0 : s.states[a.entities.power]) == null ? void 0 : l.state : void 0) ?? -1 / 0) - c;
    }
    if (i === "highest_usage") {
      const c = Ut(o, r, s);
      return Ut(a, r, s) - c || o.name.localeCompare(a.name);
    }
    return i === "manual" ? 0 : (o.circuitNumber ?? 9999) - (a.circuitNumber ?? 9999) || o.name.localeCompare(a.name);
  });
}
function Ut(e, t, s) {
  var i, o;
  const r = e.entities.power;
  return r ? ((i = t.get(r)) == null ? void 0 : i.averageWatts) ?? B((o = s == null ? void 0 : s.states[r]) == null ? void 0 : o.state) ?? -1 / 0 : -1 / 0;
}
function Es(e, t) {
  if (t.layout.group_by === "none") return [["", e]];
  const s = /* @__PURE__ */ new Map();
  for (const r of e) {
    const i = t.layout.group_by === "panel_then_area" ? [r.panelName, r.areaName].filter(Boolean).join(" / ") || "Other" : t.layout.group_by === "area" ? r.areaName || "Other" : r.panelName || "Other";
    s.set(i, [...s.get(i) ?? [], r]);
  }
  return [...s.entries()];
}
function re(e, t) {
  if (Array.isArray(e))
    return e.length ? e : void 0;
  if (e && typeof e == "object") {
    const s = {};
    for (const [r, i] of Object.entries(e)) {
      const o = re(i, t == null ? void 0 : t[r]);
      o !== void 0 && (s[r] = o);
    }
    return Object.keys(s).length ? s : void 0;
  }
  return e === t ? void 0 : e;
}
function ie(e) {
  const t = J(e);
  return {
    type: "custom:savant-energy-breaker-board-card",
    ...re(t, P) ?? {}
  };
}
function Os(e, t) {
  const s = structuredClone(e);
  return delete s.breaker_overrides[t], ie(s);
}
var Ms = Object.defineProperty, Ps = Object.getOwnPropertyDescriptor, z = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? Ps(t, s) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (r ? a(t, s, i) : a(i)) || i);
  return r && i && Ms(t, s, i), i;
};
let O = class extends _ {
  constructor() {
    super(...arguments), this.config = P, this.breakers = [], this.filter = "", this.loading = !1, this.discoveryError = "", this.expandedBreakers = /* @__PURE__ */ new Set(), this.discoveryLoaded = !1, this.discovery = new te();
  }
  setConfig(e) {
    this.config = J(e), this.loadBreakers();
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
      "Hide SEM chip",
      this.config.display.hide_sem_chip,
      (t) => this.patch({ display: { ...this.config.display, hide_sem_chip: t } })
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
      ([t, s]) => this.switch(
        s,
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
    const t = this.config.excluded_breakers.includes(e.id), s = this.config.breaker_overrides[e.id] ?? {}, r = this.expandedBreakers.has(e.id), i = e.entities.power ? B((n = (a = this.hass) == null ? void 0 : a.states[e.entities.power]) == null ? void 0 : n.state) : void 0, o = Object.entries(e.entities).filter(([, l]) => l).map(([l, c]) => `${l}: ${c}`).join(", ");
    return h`
      <article class=${t ? "breaker excluded" : "breaker"}>
        <div class="breaker-head" @click=${() => this.toggleExpanded(e.id)}>
          <div>
            <strong>${s.label || e.name}</strong>
          </div>
          <span class="breaker-actions">
            ${this.switch("Shown", !t, (l) => this.setExcluded(e.id, !l))}
            <span class="chevron">${r ? "Collapse" : "Expand"}</span>
          </span>
        </div>
        ${r ? h`
              <div class="breaker-details">
                <span>${X(i)} - ${e.available ? "available" : "unavailable"}</span>
                <small>${o || "No associated entities"}</small>
              </div>
              ${this.textInput(
      "Custom label",
      s.label ?? "",
      (l) => this.setOverride(e.id, { ...s, label: l || void 0 })
    )}
              <div class="override-grid">
                ${["show_current_power", "show_average_power", "show_maximum_power", "show_energy", "show_sparkline", "show_icon", "show_controls"].map(
      (l) => this.tristate(
        l.replaceAll("_", " "),
        s[l],
        (c) => this.setOverride(e.id, { ...s, [l]: c })
      )
    )}
              </div>
              ${this.select(
      "Control mode",
      s.control_mode ?? "default",
      ["default", "hidden", "hold", "hold_confirm_off"],
      (l) => this.setOverride(e.id, {
        ...s,
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
    this.config = J({ ...this.config, ...e }), ct(this, "config-changed", { config: ie(this.config) });
  }
  setExcluded(e, t) {
    const s = new Set(this.config.excluded_breakers);
    t ? s.add(e) : s.delete(e), this.patch({ excluded_breakers: [...s] });
  }
  setOverride(e, t) {
    const s = Object.fromEntries(Object.entries(t).filter(([, r]) => r !== void 0 && r !== ""));
    this.patch({ breaker_overrides: { ...this.config.breaker_overrides, [e]: s } });
  }
  resetOverride(e) {
    const t = Os(this.config, e);
    this.config = J(t), ct(this, "config-changed", { config: t });
  }
  toggleExpanded(e) {
    const t = new Set(this.expandedBreakers);
    t.has(e) ? t.delete(e) : t.add(e), this.expandedBreakers = t;
  }
  textInput(e, t, s, r = !0) {
    return h`<label><span>${e}</span><input .value=${t} @input=${(i) => s(i.target.value)} @change=${r ? (i) => s(i.target.value) : void 0} /></label>`;
  }
  checkbox(e, t, s) {
    return h`<label class="check"><input type="checkbox" .checked=${t} @change=${(r) => s(r.target.checked)} /> <span>${e}</span></label>`;
  }
  switch(e, t, s) {
    return h`
      <label class="switch" @click=${(r) => r.stopPropagation()}>
        <input type="checkbox" .checked=${t} @change=${(r) => s(r.target.checked)} />
        <span class="switch-track" aria-hidden="true"></span>
        <span>${e}</span>
      </label>
    `;
  }
  select(e, t, s, r) {
    return h`<label><span>${e}</span><select .value=${t} @change=${(i) => r(i.target.value)}>${s.map((i) => h`<option value=${i}>${i}</option>`)}</select></label>`;
  }
  numberInput(e, t, s) {
    return h`<label><span>${e}</span><input type="number" min="0" step="100" .value=${String(t)} @change=${(r) => s(Number(r.target.value) || 0)} /></label>`;
  }
  tristate(e, t, s) {
    const r = t === void 0 ? "default" : String(t);
    return this.select(
      e,
      r,
      ["default", "true", "false"],
      (i) => s(i === "default" ? void 0 : i === "true")
    );
  }
};
O.styles = k`
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
z([
  u({ attribute: !1 })
], O.prototype, "hass", 2);
z([
  m()
], O.prototype, "config", 2);
z([
  m()
], O.prototype, "breakers", 2);
z([
  m()
], O.prototype, "filter", 2);
z([
  m()
], O.prototype, "loading", 2);
z([
  m()
], O.prototype, "discoveryError", 2);
z([
  m()
], O.prototype, "expandedBreakers", 2);
O = z([
  E("savant-energy-breaker-board-card-editor")
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
