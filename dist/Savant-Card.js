/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis, wt = ot.ShadowRoot && (ot.ShadyCSS === void 0 || ot.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _t = Symbol(), At = /* @__PURE__ */ new WeakMap();
let Ft = class {
  constructor(t, r, s) {
    if (this._$cssResult$ = !0, s !== _t) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (wt && t === void 0) {
      const s = r !== void 0 && r.length === 1;
      s && (t = At.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && At.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ae = (e) => new Ft(typeof e == "string" ? e : e + "", void 0, _t), k = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((s, i, a) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[a + 1], e[0]);
  return new Ft(r, e, _t);
}, oe = (e, t) => {
  if (wt) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const s = document.createElement("style"), i = ot.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = r.cssText, e.appendChild(s);
  }
}, Et = wt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const s of t.cssRules) r += s.cssText;
  return ae(r);
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
} }, xt = (e, t) => !ne(e, t), Mt = { attribute: !0, type: String, converter: nt, reflect: !1, useDefault: !1, hasChanged: xt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), T.litPropertyMetadata ?? (T.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let F = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Mt) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, r);
      i !== void 0 && le(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, s) {
    const { get: i, set: a } = ce(this.prototype, t) ?? { get() {
      return this[r];
    }, set(o) {
      this[r] = o;
    } };
    return { get: i, set(o) {
      const n = i == null ? void 0 : i.call(this);
      a == null || a.call(this, o), this.requestUpdate(t, n, s);
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
      const r = this.properties, s = [...he(r), ...de(r)];
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
      for (const i of s) r.unshift(Et(i));
    } else t !== void 0 && r.push(Et(t));
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
    return oe(t, this.constructor.elementStyles), t;
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
    var a;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((a = s.converter) == null ? void 0 : a.toAttribute) !== void 0 ? s.converter : nt).toAttribute(r, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var a, o;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), l = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((a = n.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? n.converter : nt;
      this._$Em = i;
      const c = l.fromAttribute(r, n.type);
      this[i] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, r, s, i = !1, a) {
    var o;
    if (t !== void 0) {
      const n = this.constructor;
      if (i === !1 && (a = this[t]), s ?? (s = n.getPropertyOptions(t)), !((s.hasChanged ?? xt)(a, r) || s.useDefault && s.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, r, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: s, reflect: i, wrapped: a }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? r ?? this[t]), a !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (r = void 0), this._$AL.set(t, r)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), (s = this._$EO) == null || s.forEach((i) => {
        var a;
        return (a = i.hostUpdate) == null ? void 0 : a.call(i);
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
F.elementStyles = [], F.shadowRootOptions = { mode: "open" }, F[K("elementProperties")] = /* @__PURE__ */ new Map(), F[K("finalized")] = /* @__PURE__ */ new Map(), mt == null || mt({ ReactiveElement: F }), (T.reactiveElementVersions ?? (T.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, Pt = (e) => e, lt = Y.trustedTypes, Ct = lt ? lt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Vt = "$lit$", L = `lit$${Math.random().toFixed(9).slice(2)}$`, Wt = "?" + L, ge = `<${Wt}>`, R = document, tt = () => R.createComment(""), et = (e) => e === null || typeof e != "object" && typeof e != "function", $t = Array.isArray, me = (e) => $t(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", ft = `[ 	
\f\r]`, G = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Lt = /-->/g, Tt = />/g, D = RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Nt = /'/g, Bt = /"/g, qt = /^(?:script|style|textarea|title)$/i, Gt = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), h = Gt(1), Q = Gt(2), V = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), zt = /* @__PURE__ */ new WeakMap(), j = R.createTreeWalker(R, 129);
function Zt(e, t) {
  if (!$t(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ct !== void 0 ? Ct.createHTML(t) : t;
}
const fe = (e, t) => {
  const r = e.length - 1, s = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = G;
  for (let n = 0; n < r; n++) {
    const l = e[n];
    let c, d, p = -1, f = 0;
    for (; f < l.length && (o.lastIndex = f, d = o.exec(l), d !== null); ) f = o.lastIndex, o === G ? d[1] === "!--" ? o = Lt : d[1] !== void 0 ? o = Tt : d[2] !== void 0 ? (qt.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = D) : d[3] !== void 0 && (o = D) : o === D ? d[0] === ">" ? (o = i ?? G, p = -1) : d[1] === void 0 ? p = -2 : (p = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? D : d[3] === '"' ? Bt : Nt) : o === Bt || o === Nt ? o = D : o === Lt || o === Tt ? o = G : (o = D, i = void 0);
    const b = o === D && e[n + 1].startsWith("/>") ? " " : "";
    a += o === G ? l + ge : p >= 0 ? (s.push(c), l.slice(0, p) + Vt + l.slice(p) + L + b) : l + L + (p === -2 ? n : b);
  }
  return [Zt(e, a + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class rt {
  constructor({ strings: t, _$litType$: r }, s) {
    let i;
    this.parts = [];
    let a = 0, o = 0;
    const n = t.length - 1, l = this.parts, [c, d] = fe(t, r);
    if (this.el = rt.createElement(c, s), j.currentNode = this.el.content, r === 2 || r === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = j.nextNode()) !== null && l.length < n; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(Vt)) {
          const f = d[o++], b = i.getAttribute(p).split(L), x = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: a, name: x[2], strings: b, ctor: x[1] === "." ? be : x[1] === "?" ? ye : x[1] === "@" ? we : ut }), i.removeAttribute(p);
        } else p.startsWith(L) && (l.push({ type: 6, index: a }), i.removeAttribute(p));
        if (qt.test(i.tagName)) {
          const p = i.textContent.split(L), f = p.length - 1;
          if (f > 0) {
            i.textContent = lt ? lt.emptyScript : "";
            for (let b = 0; b < f; b++) i.append(p[b], tt()), j.nextNode(), l.push({ type: 2, index: ++a });
            i.append(p[f], tt());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Wt) l.push({ type: 2, index: a });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(L, p + 1)) !== -1; ) l.push({ type: 7, index: a }), p += L.length - 1;
      }
      a++;
    }
  }
  static createElement(t, r) {
    const s = R.createElement("template");
    return s.innerHTML = t, s;
  }
}
function W(e, t, r = e, s) {
  var o, n;
  if (t === V) return t;
  let i = s !== void 0 ? (o = r._$Co) == null ? void 0 : o[s] : r._$Cl;
  const a = et(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== a && ((n = i == null ? void 0 : i._$AO) == null || n.call(i, !1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, r, s)), s !== void 0 ? (r._$Co ?? (r._$Co = []))[s] = i : r._$Cl = i), i !== void 0 && (t = W(e, i._$AS(e, t.values), i, s)), t;
}
class ve {
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
    const { el: { content: r }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? R).importNode(r, !0);
    j.currentNode = i;
    let a = j.nextNode(), o = 0, n = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new at(a, a.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (c = new _e(a, this, t)), this._$AV.push(c), l = s[++n];
      }
      o !== (l == null ? void 0 : l.index) && (a = j.nextNode(), o++);
    }
    return j.currentNode = R, i;
  }
  p(t) {
    let r = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, r), r += s.strings.length - 2) : s._$AI(t[r])), r++;
  }
}
class at {
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
    t = W(this, t, r), et(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== V && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : me(t) ? this.k(t) : this._(t);
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
    var a;
    const { values: r, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = rt.createElement(Zt(s.h, s.h[0]), this.options)), s);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === i) this._$AH.p(r);
    else {
      const o = new ve(i, this), n = o.u(this.options);
      o.p(r), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let r = zt.get(t.strings);
    return r === void 0 && zt.set(t.strings, r = new rt(t)), r;
  }
  k(t) {
    $t(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let s, i = 0;
    for (const a of t) i === r.length ? r.push(s = new at(this.O(tt()), this.O(tt()), this, this.options)) : s = r[i], s._$AI(a), i++;
    i < r.length && (this._$AR(s && s._$AB.nextSibling, i), r.length = i);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, r); t !== this._$AB; ) {
      const i = Pt(t).nextSibling;
      Pt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var r;
    this._$AM === void 0 && (this._$Cv = t, (r = this._$AP) == null || r.call(this, t));
  }
}
class ut {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, s, i, a) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = r, this._$AM = i, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = g;
  }
  _$AI(t, r = this, s, i) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) t = W(this, t, r, 0), o = !et(t) || t !== this._$AH && t !== V, o && (this._$AH = t);
    else {
      const n = t;
      let l, c;
      for (t = a[0], l = 0; l < a.length - 1; l++) c = W(this, n[s + l], r, l), c === V && (c = this._$AH[l]), o || (o = !et(c) || c !== this._$AH[l]), c === g ? t = g : t !== g && (t += (c ?? "") + a[l + 1]), this._$AH[l] = c;
    }
    o && !i && this.j(t);
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
class we extends ut {
  constructor(t, r, s, i, a) {
    super(t, r, s, i, a), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = W(this, t, r, 0) ?? g) === V) return;
    const s = this._$AH, i = t === g && s !== g || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, a = t !== g && (s === g || i);
    i && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class _e {
  constructor(t, r, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    W(this, t);
  }
}
const vt = Y.litHtmlPolyfillSupport;
vt == null || vt(rt, at), (Y.litHtmlVersions ?? (Y.litHtmlVersions = [])).push("3.3.3");
const xe = (e, t, r) => {
  const s = (r == null ? void 0 : r.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const a = (r == null ? void 0 : r.renderBefore) ?? null;
    s._$litPart$ = i = new at(t.insertBefore(tt(), a), a, void 0, r ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis;
class w extends F {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = xe(r, this.renderRoot, this.renderOptions);
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
w._$litElement$ = !0, w.finalized = !0, (It = H.litElementHydrateSupport) == null || It.call(H, { LitElement: w });
const bt = H.litElementPolyfillSupport;
bt == null || bt({ LitElement: w });
(H.litElementVersions ?? (H.litElementVersions = [])).push("4.2.2");
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
const $e = { attribute: !0, type: String, converter: nt, reflect: !1, hasChanged: xt }, ke = (e = $e, t, r) => {
  const { kind: s, metadata: i } = r;
  let a = globalThis.litPropertyMetadata.get(i);
  if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(r.name, e), s === "accessor") {
    const { name: o } = r;
    return { set(n) {
      const l = t.get.call(this);
      t.set.call(this, n), this.requestUpdate(o, l, e, !0, n);
    }, init(n) {
      return n !== void 0 && this.C(o, void 0, e, n), n;
    } };
  }
  if (s === "setter") {
    const { name: o } = r;
    return function(n) {
      const l = this[o];
      t.call(this, n), this.requestUpdate(o, l, e, !0, n);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function u(e) {
  return (t, r) => typeof r == "object" ? ke(e, t, r) : ((s, i, a) => {
    const o = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, s), o ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function m(e) {
  return u({ ...e, state: !0, attribute: !1 });
}
var Se = Object.defineProperty, Ae = Object.getOwnPropertyDescriptor, kt = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? Ae(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (s ? o(t, r, i) : o(i)) || i);
  return s && i && Se(t, r, i), i;
};
let st = class extends w {
  constructor() {
    super(...arguments), this.points = [], this.state = "normal";
  }
  render() {
    const e = Ee(this.points), t = e ?? Oe(), r = !e;
    return Q`
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
        ${r ? "" : Q`
              ${t.fillPath ? Q`<path class="fill-base" d=${t.fillPath}></path>` : ""}
            `}
        <path class="line" d=${t.path}></path>
      </svg>
    `;
  }
};
st.styles = k`
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
], st.prototype, "points", 2);
kt([
  u({ type: String, reflect: !0 })
], st.prototype, "state", 2);
st = kt([
  E("savant-sparkline")
], st);
function Ee(e) {
  const t = e.map((a) => a.value).filter(Number.isFinite);
  if (!t.length) return;
  if (t.every((a) => Math.max(0, a) === 0)) return Me(t.length);
  if (t.length === 1) {
    const a = Dt(t[0], jt(t)), o = Math.max(0, t[0]);
    return {
      path: `M 0 ${a} L 100 ${a}`,
      fillPath: o > 0 ? `M 0 ${a} L 100 ${a} L 100 36 L 0 36 Z` : ""
    };
  }
  const r = jt(t), s = t.map((a, o) => {
    const n = o / (t.length - 1) * 100, l = Math.max(0, a);
    return [n, l === 0 ? N : Dt(a, r), l];
  });
  return {
    path: Ce(s),
    fillPath: Le(s)
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
  } : { path: Array.from({ length: e }, (r, s) => {
    const i = s / (e - 1) * 100;
    return `${s === 0 ? "M" : "L"} ${i.toFixed(2)} ${N.toFixed(2)}`;
  }).join(" "), fillPath: "" };
}
const Pe = 5, N = 33;
function Ce(e) {
  if (e.every(([, , r]) => r === 0))
    return e.map(([r, s], i) => `${i === 0 ? "M" : "L"} ${r.toFixed(2)} ${s.toFixed(2)}`).join(" ");
  const t = [];
  for (let r = 1; r < e.length; r += 1) {
    const s = e[r - 1], i = e[r];
    t.push(`M ${s[0].toFixed(2)} ${s[1].toFixed(2)} L ${i[0].toFixed(2)} ${i[1].toFixed(2)}`);
  }
  return t.join(" ");
}
function Le(e) {
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
var Te = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, gt = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? Ne(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (s ? o(t, r, i) : o(i)) || i);
  return s && i && Te(t, r, i), i;
};
let q = class extends w {
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
function ct(e, t, r) {
  e.dispatchEvent(
    new CustomEvent(t, {
      detail: r,
      bubbles: !0,
      composed: !0
    })
  );
}
var Be = Object.defineProperty, ze = Object.getOwnPropertyDescriptor, Kt = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? ze(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (s ? o(t, r, i) : o(i)) || i);
  return s && i && Be(t, r, i), i;
};
const Ht = {
  flash: "M7,2V13H10V22L17,10H13L17,2H7Z",
  power: "M13,3H11V13H13V3M17.83,5.17L16.41,6.59C17.99,7.86 19,9.81 19,12A7,7 0 0,1 12,19A7,7 0 0,1 5,12C5,9.81 6.01,7.86 7.59,6.59L6.17,5.17C4.23,6.82 3,9.26 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12C21,9.26 19.77,6.82 17.83,5.17Z",
  search: "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20 15.5 14Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z",
  sort_amount_down: "M3 7h10v2H3V7m0 4h7v2H3v-2m0 4h4v2H3v-2m14-7 4 4h-3v6h-2v-6h-3l4-4Z",
  minimize_2: ""
};
let ht = class extends w {
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
var De = Object.defineProperty, je = Object.getOwnPropertyDescriptor, C = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? je(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (s ? o(t, r, i) : o(i)) || i);
  return s && i && De(t, r, i), i;
};
let A = class extends w {
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
        color-mix(in srgb, var(--savant-tile-bg-strong) 82%, var(--savant-surface-tint));
      color: var(--control-color, var(--savant-success));
      display: grid;
      place-items: center;
      cursor: pointer;
      touch-action: none;
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, white 72%, transparent),
        var(--savant-shadow-sm);
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
      background: color-mix(in srgb, var(--savant-card-bg) 92%, white);
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
var Ue = Object.defineProperty, Ie = Object.getOwnPropertyDescriptor, S = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? Ie(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (s ? o(t, r, i) : o(i)) || i);
  return s && i && Ue(t, r, i), i;
};
let _ = class extends w {
  constructor() {
    super(...arguments), this.highLoadThresholdWatts = 2e3, this.warningLoadThresholdWatts = 1e3, this.graphLoading = !1, this.pending = !1, this.stacked = !1, this.mobileLayout = "standard", this.error = "";
  }
  render() {
    var c, d, p, f, b, x, $;
    const e = this.runtimeState(), t = this.visualState(e.powerWatts, e.switchState, e.available), r = this.loadState(e.powerWatts), s = this.stacked && this.mobileLayout === "ultra_compact", i = this.display.show_area ? this.breaker.areaName : void 0, a = t === "off" ? Ve((c = this.statistics) == null ? void 0 : c.points.length) : ((d = this.statistics) == null ? void 0 : d.points) ?? [], o = !!((p = this.statistics) != null && p.points.length), n = !s && o && (((f = this.statistics) == null ? void 0 : f.averageWatts) !== void 0 || ((b = this.statistics) == null ? void 0 : b.maximumWatts) !== void 0), l = this.display.show_controls && this.display.control_mode !== "hidden" && this.breaker.controllable && !!this.breaker.entities.switch;
    return h`
      <button class=${`tile ${t} ${this.pending ? "pending" : ""} ${s ? "ultra-compact" : ""}`} @click=${this.openMoreInfo}>
        <span class="mobile-bar" aria-hidden="true"></span>
        <span class="topline">
          <span class="state-dot" aria-hidden="true"></span>
          ${this.display.show_state ? h`<span class="state-text">${Fe(t, e.switchState)}</span>` : ""}
          ${this.display.show_icon ? this.renderEntityIcon() : ""}
        </span>
        <span class="name">${this.display.label}</span>
        ${i && !s ? h`<span class="subtitle">${i}</span>` : ""}
        <span class="power">${this.display.show_current_power ? X(e.powerWatts) : ""}</span>
        <span class="graph">
          ${this.graphLoading && t !== "off" ? this.renderGraphSkeleton() : this.display.show_sparkline ? h`<savant-sparkline
                  .points=${a}
                  .state=${!o || t === "unavailable" || t === "off" ? "muted" : r === "high" ? "warning" : r === "warning" ? "caution" : "normal"}
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
    var n, l, c, d, p, f, b, x, $, M;
    const e = this.breaker.entities.power, t = this.breaker.entities.energy, r = this.breaker.entities.switch, s = e ? B((l = (n = this.hass) == null ? void 0 : n.states[e]) == null ? void 0 : l.state) : void 0, i = t ? B((d = (c = this.hass) == null ? void 0 : c.states[t]) == null ? void 0 : d.state) : void 0, a = this.optimisticSwitchState ?? (r ? (f = (p = this.hass) == null ? void 0 : p.states[r]) == null ? void 0 : f.state : void 0), o = this.breaker.available && (!e || ((x = (b = this.hass) == null ? void 0 : b.states[e]) == null ? void 0 : x.state) !== "unavailable") && (!r || ((M = ($ = this.hass) == null ? void 0 : $.states[r]) == null ? void 0 : M.state) !== "unavailable");
    return { powerWatts: s, energyValue: i, switchState: a, available: o };
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
    r && ct(this, "hass-action", {
      config: {
        entity: r,
        tap_action: { action: "more-info" }
      },
      action: "tap"
    });
  }
};
_.styles = k`
    :host {
      display: block;
      min-width: 0;
      aspect-ratio: 1 / 1;
      --status-color: var(--savant-success);
      --control-color: var(--status-color);
      --savant-text-halo:
        0 1px 0 color-mix(in srgb, var(--savant-card-bg) 82%, transparent),
        0 0 12px color-mix(in srgb, var(--savant-card-bg) 72%, transparent);
      --savant-text-outline-color: color-mix(in srgb, var(--savant-card-bg) 82%, transparent);
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
          color-mix(in srgb, var(--savant-tile-bg-strong) 70%, var(--savant-surface-tint)),
          var(--savant-tile-bg)
        );
      color: var(--savant-tile-fg);
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, white 70%, transparent),
        var(--savant-shadow-sm);
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
      -webkit-text-stroke: 2px var(--savant-text-outline-color);
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
      -webkit-text-stroke: 1px var(--savant-text-outline-color);
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
      -webkit-text-stroke: 2px var(--savant-text-outline-color);
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
  u({ type: Number })
], _.prototype, "warningLoadThresholdWatts", 2);
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
  u({ type: String, attribute: "mobile-layout", reflect: !0 })
], _.prototype, "mobileLayout", 2);
S([
  u({ type: String })
], _.prototype, "optimisticSwitchState", 2);
S([
  u({ type: String })
], _.prototype, "error", 2);
_ = S([
  E("savant-breaker-tile")
], _);
function Fe(e, t) {
  return e === "unavailable" ? "Unavailable" : t === "off" || e === "off" ? "Off" : "On";
}
function Ve(e = 2) {
  return Array.from({ length: Math.max(2, e) }, (t, r) => ({
    start: r,
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
var qe = Object.defineProperty, Ge = Object.getOwnPropertyDescriptor, Yt = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? Ge(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (s ? o(t, r, i) : o(i)) || i);
  return s && i && qe(t, r, i), i;
};
let dt = class extends w {
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
      background:
        linear-gradient(
          180deg,
          color-mix(in srgb, var(--savant-tile-bg-strong) 70%, var(--savant-surface-tint)),
          var(--savant-tile-bg)
        );
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, white 72%, transparent),
        var(--savant-shadow-sm);
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
var Ze = Object.getOwnPropertyDescriptor, Ke = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? Ze(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = o(i) || i);
  return i;
};
let yt = class extends w {
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
var Ye = Object.defineProperty, Qe = Object.getOwnPropertyDescriptor, Qt = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? Qe(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (s ? o(t, r, i) : o(i)) || i);
  return s && i && Ye(t, r, i), i;
};
let pt = class extends w {
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
var Xe = Object.defineProperty, Je = Object.getOwnPropertyDescriptor, St = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? Je(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (s ? o(t, r, i) : o(i)) || i);
  return s && i && Xe(t, r, i), i;
};
let it = class extends w {
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
  metric(e, t, r) {
    var i, a;
    const s = r ? B((a = (i = this.hass) == null ? void 0 : i.states[r]) == null ? void 0 : a.state) : void 0;
    return h`<div class="metric"><savant-icon .icon=${t}></savant-icon><span>${e}</span><strong>${X(s)}</strong></div>`;
  }
  percentMetric(e, t, r) {
    var i, a;
    const s = B((a = (i = this.hass) == null ? void 0 : i.states[r]) == null ? void 0 : a.state);
    return h`<div class="metric"><savant-icon .icon=${t}></savant-icon><span>${e}</span><strong>${s === void 0 ? "--" : `${Math.round(s)}%`}</strong></div>`;
  }
};
it.styles = k`
    .sem-chip {
      position: relative;
      min-height: 170px;
      padding: 12px;
      border: 1px solid var(--savant-border);
      border-radius: var(--savant-radius);
      background:
        linear-gradient(
          180deg,
          color-mix(in srgb, var(--savant-tile-bg-strong) 72%, var(--savant-surface-tint)),
          var(--savant-tile-bg)
        );
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, white 72%, transparent),
        var(--savant-shadow-sm);
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
      background: color-mix(in srgb, var(--savant-card-bg) 78%, var(--savant-app-bg));
      box-shadow: inset 0 1px 0 color-mix(in srgb, white 72%, transparent);
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
class tr {
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
            var a;
            return i && ((a = t.states[i]) == null ? void 0 : a.state) !== "unavailable";
          }
        ),
        discoveryConfidence: "manual"
      };
    });
  }
}
function Xt(e, t) {
  const r = e.split(".")[0], s = t == null ? void 0 : t.attributes.device_class;
  if (r === "switch") return "switch";
  if (r === "sensor") {
    if (s === "power") return "power";
    if (s === "energy") return "energy";
    if (s === "voltage") return "voltage";
    if (s === "current") return "current";
  }
}
function er(e) {
  var o;
  const t = new Map(e.devices.map((n) => [n.id, n])), r = new Map(e.areas.map((n) => [n.area_id, n.name])), s = /* @__PURE__ */ new Map(), i = [];
  for (const n of e.entities)
    if (!(n.disabled_by || n.hidden_by) && rr(n, t.get(n.device_id ?? ""), e.integration))
      if (n.device_id) {
        const l = s.get(n.device_id) ?? [];
        l.push(n), s.set(n.device_id, l);
      } else
        i.push(n);
  const a = [];
  for (const [n, l] of s) {
    const c = sr(n, l, t.get(n), r, e.states);
    c && a.push(c);
  }
  for (const n of i) {
    const l = Xt(n.entity_id, e.states[n.entity_id]);
    l && a.push({
      id: lr(n),
      name: Jt(n, e.states[n.entity_id]),
      areaId: n.area_id,
      areaName: n.area_id ? r.get(n.area_id) : void 0,
      controllable: l === "switch",
      entities: { [l]: n.entity_id },
      available: ((o = e.states[n.entity_id]) == null ? void 0 : o.state) !== "unavailable",
      discoveryConfidence: "medium",
      discoveryNotes: ["Associated from entity registry without a device_id."]
    });
  }
  return a;
}
function rr(e, t, r) {
  var a;
  if (e.platform === r) return !0;
  const s = ((t == null ? void 0 : t.manufacturer) ?? "").toLowerCase(), i = ((a = t == null ? void 0 : t.identifiers) == null ? void 0 : a.flat().join(" ").toLowerCase()) ?? "";
  return s.includes("savant") || i.includes(r.toLowerCase());
}
function sr(e, t, r, s, i) {
  var x;
  const a = {}, o = [];
  for (const $ of t) {
    const M = Xt($.entity_id, i[$.entity_id]);
    !M || a[M] || (a[M] = $.entity_id);
  }
  if (!Object.keys(a).length) return;
  const n = t.find(($) => $.entity_id === a.power) ?? t[0], l = (n == null ? void 0 : n.area_id) ?? (r == null ? void 0 : r.area_id) ?? void 0, c = n ? (x = i[n.entity_id]) == null ? void 0 : x.attributes : {}, d = nr((c == null ? void 0 : c.circuit_number) ?? (c == null ? void 0 : c.circuit)), p = or(c == null ? void 0 : c.panel_name, c == null ? void 0 : c.panel, r == null ? void 0 : r.model), f = ir(r, t), b = f ? ar(t, i) : void 0;
  return a.power || o.push("No power sensor with device_class: power was found."), a.switch || o.push("No switch entity was found for breaker control."), {
    id: `device:${e}`,
    deviceId: e,
    name: (r == null ? void 0 : r.name_by_user) || (r == null ? void 0 : r.name) || Jt(n, n ? i[n.entity_id] : void 0),
    areaId: l,
    areaName: l ? s.get(l) : void 0,
    panelName: p,
    circuitNumber: d,
    controllable: !!a.switch,
    entities: a,
    available: Object.values(a).some(($) => {
      var M;
      return ((M = i[$]) == null ? void 0 : M.state) !== "unavailable";
    }),
    discoveryConfidence: a.power && a.switch ? "high" : "medium",
    discoveryNotes: o.length ? o : void 0,
    isSem: f,
    semMetrics: b
  };
}
function ir(e, t) {
  const r = `${(e == null ? void 0 : e.name) ?? ""} ${(e == null ? void 0 : e.name_by_user) ?? ""} ${(e == null ? void 0 : e.model) ?? ""} ${(e == null ? void 0 : e.manufacturer) ?? ""}`.toLowerCase();
  return r.includes("sem") || r.includes("energy monitor") || r.includes("energy hub") ? !0 : t.some((s) => `${s.name ?? ""} ${s.original_name ?? ""} ${s.entity_id}`.toLowerCase().includes("sem"));
}
function ar(e, t) {
  var s, i;
  const r = {};
  for (const a of e) {
    const o = t[a.entity_id], n = `${a.name ?? ""} ${a.original_name ?? ""} ${((s = o == null ? void 0 : o.attributes) == null ? void 0 : s.friendly_name) ?? ""} ${a.entity_id}`.toLowerCase(), l = String(((i = o == null ? void 0 : o.attributes) == null ? void 0 : i.device_class) ?? "").toLowerCase();
    !r.homeLoad && /(home|total).*(load|consumption)|consumption|house load/.test(n) && (r.homeLoad = a.entity_id), !r.solar && /solar|pv/.test(n) && (r.solar = a.entity_id), !r.grid && /grid|utility|mains/.test(n) && (r.grid = a.entity_id), !r.batterySoc && (l === "battery" || /soc|state.?of.?charge|battery.*%/.test(n)) && (r.batterySoc = a.entity_id), !r.batteryPower && /battery/.test(n) && !/soc|state.?of.?charge|%/.test(n) && (r.batteryPower = a.entity_id);
  }
  return Object.values(r).some(Boolean) ? r : void 0;
}
function or(...e) {
  return e.find((t) => typeof t == "string" && t.length > 0);
}
function nr(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function lr(e) {
  return e.unique_id ? `entity:${e.unique_id}` : `entity:${e.entity_id}`;
}
function Jt(e, t) {
  return (e == null ? void 0 : e.name) || (e == null ? void 0 : e.original_name) || (t == null ? void 0 : t.attributes.friendly_name) || (e == null ? void 0 : e.entity_id) || "Savant breaker";
}
class cr {
  constructor(t) {
    this.integration = t;
  }
  async discover(t) {
    const r = await hr(t);
    return er({
      ...r,
      states: t.states,
      integration: this.integration
    });
  }
}
async function hr(e) {
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
class te {
  constructor(t) {
    this.providers = t;
  }
  async discover(t, r) {
    const s = this.providers ?? [
      ...r.discovery.enabled ? [new cr(r.discovery.integration)] : [],
      new tr(r.manual_breakers)
    ], i = await Promise.all(s.map((a) => a.discover(t)));
    return dr(i.flat());
  }
}
function dr(e) {
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
class pr {
  async fetchHistory(t, r, s) {
    var l;
    if (!((l = t.connection) != null && l.sendMessagePromise)) return [];
    const i = /* @__PURE__ */ new Date(), a = new Date(i.getTime() - ur(s)), o = await t.connection.sendMessagePromise({
      type: "history/history_during_period",
      start_time: a.toISOString(),
      end_time: i.toISOString(),
      entity_ids: [r],
      minimal_response: !0,
      no_attributes: !0
    });
    return ((o == null ? void 0 : o[0]) ?? []).map((c) => ({
      start: new Date(c.last_changed ?? c.lu ?? c.s).getTime(),
      value: Number(c.state)
    })).filter((c) => Number.isFinite(c.start) && Number.isFinite(c.value));
  }
}
function ur(e) {
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
class gr {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.history = new pr();
  }
  async getStatistics(t, r, s, i) {
    const a = `${r}:${s}`, o = Date.now(), n = this.cache.get(a);
    if (n && o - n.fetchedAt < i * 1e3)
      return n.data;
    try {
      const l = await this.fetchStatisticsOrHistory(t, r, s), c = l.map((p) => p.value).filter(Number.isFinite), d = {
        entityId: r,
        period: s,
        points: l,
        averageWatts: c.length ? c.reduce((p, f) => p + f, 0) / c.length : void 0,
        maximumWatts: c.length ? Math.max(...c) : void 0,
        loading: !1,
        fetchedAt: o
      };
      return this.cache.set(a, { data: d, fetchedAt: o }), d;
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
        const a = /* @__PURE__ */ new Date(), o = new Date(a.getTime() - mr(s)), n = await t.connection.sendMessagePromise({
          type: "recorder/statistics_during_period",
          start_time: o.toISOString(),
          end_time: a.toISOString(),
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
function mr(e) {
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
}, fr = {
  integration: "Defaults to savant_energy and is used to match registry metadata.",
  panel_filter: "Optional exact panel name to include.",
  area_filter: "Optional exact area name to include.",
  refresh_interval_seconds: "Minimum 30 seconds.",
  warning_load_threshold_watts: "Chart turns yellow above this wattage.",
  high_load_threshold_watts: "Chart turns orange above this wattage.",
  manual_breakers: "Optional fallback mappings for breakers that cannot be discovered from entity metadata.",
  id: "Use a stable ID, for example panel_1_circuit_12."
};
function vr() {
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
    computeHelper: (e) => fr[e.name],
    assertConfig: yr
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
        options: t.map((r) => ({ value: r, label: ee[r] ?? br(r) }))
      }
    }
  };
}
function br(e) {
  return e.split("_").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
}
function yr(e) {
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
function re(e, t) {
  const r = { ...e };
  if (!t) return r;
  for (const [s, i] of Object.entries(t))
    Array.isArray(i) ? r[s] = [...i] : i && typeof i == "object" && !Array.isArray(i) ? r[s] = re(r[s] ?? {}, i) : i !== void 0 && (r[s] = i);
  return r;
}
const wr = /* @__PURE__ */ new Set(["1h", "6h", "12h", "24h", "7d"]), _r = /* @__PURE__ */ new Set(["standard", "ultra_compact"]);
function J(e) {
  const t = re(P, e ?? {});
  t.discovery.enabled = t.discovery.enabled !== !1, t.discovery.integration = t.discovery.integration || P.discovery.integration, t.discovery.include_new_breakers = t.discovery.include_new_breakers !== !1, _r.has(t.layout.mobile_view) || (t.layout.mobile_view = P.layout.mobile_view), t.display.show_title = t.display.show_title !== !1, wr.has(t.graph.period) || (t.graph.period = P.graph.period), t.graph.refresh_interval_seconds = Math.max(30, Number(t.graph.refresh_interval_seconds) || 300);
  const r = Number(t.controls.warning_load_threshold_watts);
  t.controls.warning_load_threshold_watts = Math.max(
    0,
    Number.isFinite(r) ? r : P.controls.warning_load_threshold_watts || 1e3
  );
  const s = Number(t.controls.high_load_threshold_watts);
  return t.controls.high_load_threshold_watts = Math.max(
    0,
    Number.isFinite(s) ? s : P.controls.high_load_threshold_watts || 2e3
  ), t.excluded_breakers = Array.isArray(t.excluded_breakers) ? [...new Set(t.excluded_breakers)] : [], t.breaker_overrides = t.breaker_overrides ?? {}, t.manual_breakers = Array.isArray(t.manual_breakers) ? t.manual_breakers : [], t;
}
function xr(e, t) {
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
const $r = k`
  :host {
    display: block;
    color: var(--primary-text-color);
    --savant-card-bg: var(--ha-card-background, var(--card-background-color, #ffffff));
    --savant-app-bg: var(--primary-background-color, #f4f6f8);
    --savant-tile-bg: color-mix(in srgb, var(--savant-card-bg) 88%, white);
    --savant-tile-bg-strong: color-mix(in srgb, var(--savant-card-bg) 78%, white);
    --savant-surface-tint: color-mix(in srgb, var(--primary-color, #4caf50) 6%, transparent);
    --savant-tile-fg: var(--primary-text-color, #1d2327);
    --savant-muted: var(--secondary-text-color, #a9b0b4);
    --savant-success: var(--success-color, #7acb54);
    --savant-caution: var(--savant-caution-color, #f5cc4d);
    --savant-warning: var(--warning-color, #ff8f22);
    --savant-error: var(--error-color, #f05246);
    --savant-disabled: var(--disabled-text-color, #8d9499);
    --savant-border: color-mix(in srgb, var(--divider-color, #6f767b) 24%, transparent);
    --savant-border-strong: color-mix(in srgb, var(--divider-color, #6f767b) 42%, transparent);
    --savant-shadow-sm: 0 10px 24px rgb(15 23 42 / 0.08);
    --savant-shadow-md: 0 14px 34px rgb(15 23 42 / 0.1);
    --savant-radius: var(--savant-breaker-radius, 12px);
    font-family: var(--paper-font-body1_-_font-family, inherit);
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --savant-card-bg: var(--ha-card-background, var(--card-background-color, #1f2528));
      --savant-app-bg: var(--primary-background-color, #161b1e);
      --savant-tile-bg: color-mix(in srgb, var(--savant-card-bg) 88%, black);
      --savant-tile-bg-strong: color-mix(in srgb, var(--savant-card-bg) 76%, black);
      --savant-tile-fg: var(--primary-text-color, #f5f7f8);
      --savant-border: color-mix(in srgb, var(--divider-color, #6f767b) 35%, transparent);
      --savant-border-strong: color-mix(in srgb, var(--divider-color, #6f767b) 52%, transparent);
      --savant-shadow-sm: 0 10px 24px rgb(0 0 0 / 0.2);
      --savant-shadow-md: 0 16px 36px rgb(0 0 0 / 0.24);
    }
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
var kr = Object.defineProperty, Sr = Object.getOwnPropertyDescriptor, y = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? Sr(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (s ? o(t, r, i) : o(i)) || i);
  return s && i && kr(t, r, i), i;
};
let v = class extends w {
  constructor() {
    super(...arguments), this.config = P, this.breakers = [], this.loading = !0, this.error = "", this.stats = /* @__PURE__ */ new Map(), this.pendingSwitches = /* @__PURE__ */ new Set(), this.toggleErrors = /* @__PURE__ */ new Map(), this.stacked = !1, this.sortMenuOpen = !1, this.searchOpen = !1, this.searchQuery = "", this.optimisticSwitchStates = /* @__PURE__ */ new Map(), this.discovery = new te(), this.statistics = new gr(), this.discoveryKey = "", this.statsRefreshToken = 0, this.optimisticResetTimers = /* @__PURE__ */ new Map(), this.handleToggle = async (e) => {
      var o;
      if (e.stopPropagation(), !this.hass) return;
      const t = this.breakers.find((n) => n.id === e.detail.breakerId), r = t == null ? void 0 : t.entities.switch;
      if (!t || !r || this.pendingSwitches.has(t.id)) return;
      const i = (this.optimisticSwitchStates.get(t.id) ?? ((o = this.hass.states[r]) == null ? void 0 : o.state)) === "on" ? "off" : "on";
      this.setOptimisticSwitchState(t.id, i), this.pendingSwitches = /* @__PURE__ */ new Set([...this.pendingSwitches, t.id]), this.toggleErrors.delete(t.id);
      let a = !1;
      try {
        await this.hass.callService("switch", i === "off" ? "turn_off" : "turn_on", { entity_id: r }), a = !0;
      } catch {
        this.clearOptimisticSwitchState(t.id);
        const n = new Map(this.toggleErrors);
        n.set(t.id, "Failed to toggle"), this.toggleErrors = n;
      } finally {
        const n = new Set(this.pendingSwitches);
        if (n.delete(t.id), this.pendingSwitches = n, !a) return;
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
    return vr();
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
    const e = this.visibleSemBreakers(), t = Er(this.visibleStandardBreakers(), this.config);
    return h`
      <div
        class=${`board-grid ${this.stacked ? "stacked" : ""}`}
        @savant-breaker-toggle=${this.handleToggle}
      >
        ${e.map(
      (r) => h`<savant-sem-chip .hass=${this.hass} .breaker=${r}></savant-sem-chip>`
    )}
        ${t.map(
      ([r, s]) => h`
            ${r ? h`<h3 class="group-title">${r}</h3>` : g}
            ${s.map((i) => {
        const a = xr(this.config, i), o = i.entities.power, n = o ? this.stats.get(o) : void 0;
        return h`<savant-breaker-tile
                .hass=${this.hass}
                .breaker=${i}
                .display=${a}
                .statistics=${n}
                ?stacked=${this.stacked}
                .mobileLayout=${this.effectiveMobileView()}
                .optimisticSwitchState=${this.optimisticSwitchStates.get(i.id)}
                .graphLoading=${!!(o && !n)}
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
        this.visibleStandardBreakers().map((s) => s.entities.power).filter((s) => !!s)
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
    return Ar(
      r,
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
    return Rt.some((r) => r.value === e) ? e ?? void 0 : void 0;
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
v.styles = [
  $r,
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
        background:
          linear-gradient(
            180deg,
            color-mix(in srgb, var(--savant-tile-bg-strong) 74%, var(--savant-surface-tint)),
            var(--savant-tile-bg)
          );
        box-shadow:
          inset 0 1px 0 color-mix(in srgb, white 72%, transparent),
          inset 0 0 0 1px color-mix(in srgb, var(--primary-text-color) 18%, transparent),
          var(--savant-shadow-sm);
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
          inset 0 1px 0 color-mix(in srgb, white 72%, transparent),
          inset 0 0 0 1px color-mix(in srgb, var(--primary-text-color) 30%, transparent),
          0 0 0 1px color-mix(in srgb, var(--primary-text-color) 18%, transparent),
          var(--savant-shadow-md);
      }

      .chip-tool.active {
        border-color: color-mix(in srgb, var(--primary-color) 84%, var(--primary-text-color));
        box-shadow:
          inset 0 1px 0 color-mix(in srgb, white 72%, transparent),
          inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 32%, transparent),
          0 0 0 1px color-mix(in srgb, var(--primary-color) 36%, transparent),
          var(--savant-shadow-md);
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
            180deg,
            color-mix(in srgb, var(--savant-tile-bg-strong) 74%, var(--savant-surface-tint)),
            var(--savant-tile-bg)
          );
        box-shadow: inset 0 1px 0 color-mix(in srgb, white 72%, transparent);
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
        background: color-mix(in srgb, var(--savant-card-bg) 94%, var(--savant-app-bg));
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
        background: color-mix(in srgb, var(--savant-tile-bg) 80%, var(--savant-surface-tint));
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
function Ar(e, t, r, s = /* @__PURE__ */ new Map(), i = t.layout.sort_by) {
  return [...e].sort((a, o) => {
    var n, l;
    if (i === "name") return a.name.localeCompare(o.name);
    if (i === "current_power_descending") {
      const c = B(a.entities.power ? (n = r == null ? void 0 : r.states[a.entities.power]) == null ? void 0 : n.state : void 0) ?? -1 / 0;
      return (B(o.entities.power ? (l = r == null ? void 0 : r.states[o.entities.power]) == null ? void 0 : l.state : void 0) ?? -1 / 0) - c;
    }
    if (i === "highest_usage") {
      const c = Ut(a, s, r);
      return Ut(o, s, r) - c || a.name.localeCompare(o.name);
    }
    return i === "manual" ? 0 : (a.circuitNumber ?? 9999) - (o.circuitNumber ?? 9999) || a.name.localeCompare(o.name);
  });
}
function Ut(e, t, r) {
  var i, a;
  const s = e.entities.power;
  return s ? ((i = t.get(s)) == null ? void 0 : i.averageWatts) ?? B((a = r == null ? void 0 : r.states[s]) == null ? void 0 : a.state) ?? -1 / 0 : -1 / 0;
}
function Er(e, t) {
  if (t.layout.group_by === "none") return [["", e]];
  const r = /* @__PURE__ */ new Map();
  for (const s of e) {
    const i = t.layout.group_by === "panel_then_area" ? [s.panelName, s.areaName].filter(Boolean).join(" / ") || "Other" : t.layout.group_by === "area" ? s.areaName || "Other" : s.panelName || "Other";
    r.set(i, [...r.get(i) ?? [], s]);
  }
  return [...r.entries()];
}
function se(e, t) {
  if (Array.isArray(e))
    return e.length ? e : void 0;
  if (e && typeof e == "object") {
    const r = {};
    for (const [s, i] of Object.entries(e)) {
      const a = se(i, t == null ? void 0 : t[s]);
      a !== void 0 && (r[s] = a);
    }
    return Object.keys(r).length ? r : void 0;
  }
  return e === t ? void 0 : e;
}
function ie(e) {
  const t = J(e);
  return {
    type: "custom:savant-energy-breaker-board-card",
    ...se(t, P) ?? {}
  };
}
function Or(e, t) {
  const r = structuredClone(e);
  return delete r.breaker_overrides[t], ie(r);
}
var Mr = Object.defineProperty, Pr = Object.getOwnPropertyDescriptor, z = (e, t, r, s) => {
  for (var i = s > 1 ? void 0 : s ? Pr(t, r) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (i = (s ? o(t, r, i) : o(i)) || i);
  return s && i && Mr(t, r, i), i;
};
let O = class extends w {
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
    var o, n;
    const t = this.config.excluded_breakers.includes(e.id), r = this.config.breaker_overrides[e.id] ?? {}, s = this.expandedBreakers.has(e.id), i = e.entities.power ? B((n = (o = this.hass) == null ? void 0 : o.states[e.entities.power]) == null ? void 0 : n.state) : void 0, a = Object.entries(e.entities).filter(([, l]) => l).map(([l, c]) => `${l}: ${c}`).join(", ");
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
                <span>${X(i)} - ${e.available ? "available" : "unavailable"}</span>
                <small>${a || "No associated entities"}</small>
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
    this.config = J({ ...this.config, ...e }), ct(this, "config-changed", { config: ie(this.config) });
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
    const t = Or(this.config, e);
    this.config = J(t), ct(this, "config-changed", { config: t });
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
