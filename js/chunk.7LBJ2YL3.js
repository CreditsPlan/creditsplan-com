import{a as Te,b as Ce}from"./chunk.7HYUNLOO.js";import{A as Se,B as Le,C as se,a as $,b as he,c as xe,d as $e,e as D,f as X,g as I,h as C,i as ee,j as ke,k as te,l as re,m as B,n as H,p as _e,q as we,r as Pe,s as M,t as ae,u as ne,v as N,w as q,x as Ae,y as j,z as V}from"./chunk.Q3K5G6WF.js";import{a as s,b as R}from"./chunk.Y3GWXKZH.js";import{a as U,c as _,e as i}from"./chunk.CK2CXFOA.js";var ct=new Set(["\u5F85\u66F4\u65B0","\u5F85\u786E\u8BA4","\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"]);function K(e){let r=String(e??"").trim();return r&&!ct.has(r)?r:"\u2014"}function E(e="",r=""){let a=String(r??"").trim();return{column:a?String(e??"").trim():"",value:a}}function ie(e){return!!(e?.column&&e?.value)}function Me(e,r,a){return ie(r)?e.filter(t=>a(t,r.column)===r.value):e}var Ue={};function De(e){Ue=e||{}}function ut(e){let r=I(e,Ue,$);return r.training?i(`privacy.training.${r.training}`)||r.training:i("privacy.filter.notResearched")}var Ne={token:"billing.token",credits:"billing.credits",five_hours:"billing.requests",weekly:"billing.requests",monthly:"billing.requests"};function le(e){let r=Ne[e.limitType];return r?i(r):i("billing.undisclosed")}function qe(e){return!!Ne[e.limitType]}var oe=[{key:"provider",labelKey:"table.col.provider",value:e=>C(e.provider)||"\u2014"},{key:"name",labelKey:"table.col.name",value:e=>B(e.name)||"\u2014"},{key:"monthlyPrice",labelKey:"table.col.monthly",value:e=>K(e.monthlyPrice)},{key:"quarterlyPrice",labelKey:"table.col.quarterly",value:e=>K(e.quarterlyPrice)},{key:"annualPrice",labelKey:"table.col.annual",value:e=>K(e.annualPrice)},{key:"billingUnit",labelKey:"table.col.billingUnit",value:e=>le(e)},{key:"quota",labelKey:"table.col.quota",value:e=>N(e)?.text||"\u2014"},{key:"unitPrice",labelKey:"table.col.unitPrice",value:e=>q(e)?.text||"\u2014"},{key:"model",labelKey:"table.col.model",value:e=>H(e)||"\u2014"},{key:"status",labelKey:"table.col.status",value:e=>B(e.statusLabel)||"\u2014"},{key:"domesticPayment",labelKey:"table.col.domesticPayment",value:e=>e.domesticPayment?i("common.supported"):"\u2014"},{key:"intlNetwork",labelKey:"table.col.intlNetwork",value:e=>e.intlNetwork?i("common.required"):"\u2014"},{key:"dataTraining",labelKey:"table.col.dataTraining",value:e=>ut(e)},{key:"verifiedAt",labelKey:"table.col.verified",value:e=>B(e.lastVerifiedAt)||i("table.verified.pending")},{key:"source",labelKey:"table.col.source",value:e=>e.url?i("table.source.name"):"\u2014"}],w=E(),S=!1,dt=new Intl.Collator(_(),{numeric:!0,sensitivity:"base"});function pt(e){return e.status==="available"||e.status==="rush_sale"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"}function Ee(){return S}function ft(){S=!S}function ce(e){return oe.find(r=>r.key===e)}function Fe(e,r){let a=ce(r);return a?String(a.value(e)||"").trim()||"\u2014":""}function mt(){w=E(),S=!1}function G(){return ie(w)&&!!ce(w.column)}function Re(e){let r=e;return S&&(r=r.filter(pt)),G()&&(r=Me(r,w,Fe)),r}function Ie(e,r){let a=S?`<span class="plan-table-filter-count">${e.length} / ${r.length}</span>`:"";return`
    <div class="plan-table-quick-filters">
      <button type="button" class="plan-quick-filter${S?" is-active":""}" data-plan-available-toggle aria-pressed="${S?"true":"false"}">
        <span class="plan-quick-filter-mark" aria-hidden="true">\u2713</span>${s(i("table.quick.availableOnly"))}
      </button>
      ${a}
    </div>
  `}function yt(e,r){let a=new Map;for(let t of e){let n=Fe(t,r.key);a.set(n,(a.get(n)||0)+1)}return Array.from(a.entries()).map(([t,n])=>({value:t,count:n})).sort((t,n)=>t.value==="\u2014"&&n.value!=="\u2014"?1:n.value==="\u2014"&&t.value!=="\u2014"?-1:dt.compare(t.value,n.value))}function Be(e,r){let a=w.column===e.key&&!!w.value,t=yt(r,e);return`
    <th scope="col" class="plan-column-filter break-words px-3 py-3 text-left font-semibold text-slate-900 dark:text-white">
      <button type="button" class="plan-column-filter-trigger${a?" is-active":""}" data-plan-filter-column="${s(e.key)}" aria-haspopup="menu" aria-expanded="false" title="${s(i("table.filter.tooltip"))} ${s(i(e.labelKey))}">
        <span class="plan-column-filter-label">${s(i(e.labelKey))}</span>
        <span class="plan-column-filter-caret" aria-hidden="true"></span>
      </button>
      <div class="plan-column-filter-menu" data-plan-filter-menu="${s(e.key)}" role="menu" hidden>
        <button type="button" class="plan-column-filter-option${a?"":" is-active"}" data-plan-filter-value="">
          <span class="plan-column-filter-option-label">${s(i("table.filter.all"))}</span>
          <span class="plan-column-filter-option-count">${r.length}</span>
        </button>
        ${t.map(n=>`
          <button type="button" class="plan-column-filter-option${a&&n.value===w.value?" is-active":""}" data-plan-filter-value="${s(n.value)}">
            <span class="plan-column-filter-option-label">${s(n.value)}</span>
            <span class="plan-column-filter-option-count">${n.count}</span>
          </button>
        `).join("")}
      </div>
    </th>
  `}function He(e,r){if(!G())return"";let a=ce(w.column);return`
    <div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${s(i(a.labelKey))}</span>
        <strong>${s(w.value)}</strong>
      </span>
      <span class="plan-table-filter-count">${e.length} / ${r.length} ${s(i("table.filter.count"))}</span>
      <button type="button" class="plan-table-filter-clear" data-plan-filter-clear>${s(i("table.filter.clear"))}</button>
    </div>
  `}function O(e){e&&(e.querySelectorAll(".plan-column-filter-menu").forEach(r=>{r.hidden=!0}),e.querySelectorAll("[data-plan-filter-column]").forEach(r=>{r.setAttribute("aria-expanded","false")}))}function dr(e,r,a,t){e.addEventListener("click",n=>{let l=n.target.closest("[data-plan-filter-column]");if(l&&e.contains(l)){let f=l.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!f)return;let b=!f.hidden;O(e),b||(f.hidden=!1,l.setAttribute("aria-expanded","true"));return}let o=n.target.closest("[data-plan-filter-value]");if(o&&e.contains(o)){let f=o.closest("[data-plan-filter-menu]"),b=o.dataset.planFilterValue||"";w=f&&b?E(f.dataset.planFilterMenu,b):E(),a();return}let u=n.target.closest("[data-plan-filter-clear]");if(u&&e.contains(u)){mt(),a();return}let p=n.target.closest("[data-plan-available-toggle]");if(p&&e.contains(p)){ft(),a();return}let d=n.target.closest("[data-plan-key]");if(d&&e.contains(d)&&!n.target.closest("a")){let f=d.dataset.planKey||"";re(r(),f)&&t(f);return}n.target.closest(".plan-column-filter")||O(e)}),e.addEventListener("keydown",n=>{let l=n.target.closest("[data-plan-key]");if(!l||!e.contains(l)||n.target.closest("a")||n.key!=="Enter"&&n.key!==" ")return;n.preventDefault();let o=l.dataset.planKey||"";re(r(),o)&&t(o)}),document.addEventListener("click",n=>{e.contains(n.target)||O(e)}),document.addEventListener("keydown",n=>{n.key==="Escape"&&O(e)})}var z=2;function bt(e){let r=ne(e.lastVerifiedAt);if(r.state==="fresh"){let a=r.days===0?i("verified.freshToday"):i("verified.freshDaysAgo",{n:r.days});return`<span class="whitespace-nowrap rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300" title="${s(i("verified.freshTitle",{date:r.date}))}">${s(a)}</span>`}return r.state==="stale"?`<span class="whitespace-nowrap rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:bg-amber-950/40 dark:text-amber-300" title="${s(i("verified.staleTitle",{date:r.date}))}">${s(i("verified.stale"))}</span>`:""}function vt(e,r){let a=xe(e.provider,r,$),t=$e(e,a);return t?`/plans/${encodeURIComponent(t)}/`:""}function gt(e,r){let a=X(e,r,$),t=String(a.seo_slug||"").trim(),n=String(a.seo_intro||"").trim(),l=String(a.icon_url||"").trim();return t&&n&&l?`/brands/${encodeURIComponent(t)}/`:""}function ht(e,r={}){let a=X(e.provider,r,$);return D(a.icon_url)||D(e.providerIconUrl)||D(he(e.provider)?.iconUrl)}function F(e,r,a="brand-icon"){let t=D(e),n=String(r||"?").trim().slice(0,1).toUpperCase()||"?",l=t?"brand-icon-fallback hidden":"brand-icon-fallback";return`<span class="${a}" aria-hidden="true">
    ${t?`<img class="brand-icon-img" src="${s(t)}" alt="" loading="lazy" referrerpolicy="no-referrer">`:""}
    <span class="${l}">${s(n)}</span>
  </span>`}function Ve(e,r){let a=new Map;for(let n of e){let l=$[n.provider]||n.provider;a.has(l)||a.set(l,{provider:n.provider,label:C(n.provider,r,$),iconUrl:ht(n,r),brandHref:gt(n.provider,r),plans:[]}),a.get(l).plans.push(n)}let t=[...a.values()];for(let n of t)n.plans=ke(n.plans);return t.sort((n,l)=>ee(n.provider,r,$)-ee(l.provider,r,$)),t}function xt(e){return e.status==="available"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"}function Ke(e){if(!e.status)return s(e.statusLabel||"");let r=`status.${e.status}`,a=i(r);return s(a.startsWith("status.")?e.statusLabel||"":a)}function $t(e){let r=null;if(Number.isFinite(e.monthlyPriceValue))r=e.monthlyPriceValue;else{let a=String(e.monthlyPrice||"").match(/[\d.]+/),t=a?parseFloat(a[0]):NaN;Number.isFinite(t)&&(r=t)}return r==null||r<0?null:{value:r,currency:e.monthlyCurrency||"USD"}}function kt(e){let r=null;for(let a of e){let t=$t(a);t&&(r==null||t.value<r.value)&&(r=t)}return r}function _t(e){let r=kt(e.plans),a=e.plans.filter(xt).length,t=[];r!=null&&t.push(r.value===0?i("group.summary.free"):i("group.summary.from",{symbol:we(r.currency),price:Pe(r.value)})),a>0&&t.push(i("group.summary.available",{n:a}));let n=t.join(" \xB7 ");return`<span class="plan-table-group-summary">${s(n)}</span>`}function wt(e,r){let a=I(e,r,$);return a.training==="no"?`<span class="text-xs font-medium text-emerald-600 dark:text-emerald-400" title="${s(i("privacy.training.no"))}">${s(i("privacy.cell.no"))}</span>`:a.training==="yes"?`<span class="text-xs font-medium text-amber-600 dark:text-amber-400" title="${s(i("privacy.training.yes"))}">${s(i("privacy.cell.yes"))}</span>`:a.training==="unclear"?`<span class="text-xs text-slate-500 dark:text-slate-400">${s(i("privacy.training.unclear"))}</span>`:'<span class="text-slate-400">\u2014</span>'}function Oe(e){return e.status==="available"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"?"bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300":e.status==="rush_sale"?"bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400":"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}function Pt(e,r="",a="",t=!1){let n=Oe(e),l=e.includedCalls&&e.includedCalls.length>10&&(e.includedCalls.includes("\xA5")||e.includedCalls.includes("\u5143")||e.includedCalls.includes("\u767E\u4E07")),o=Ae[e.planType]||e.planType||"",u,p=Le(e);p?u=p:l?u=`<span class="text-sm font-semibold text-slate-700 dark:text-slate-300">${s(e.includedCalls)}</span>`:e.includedCalls||e.planType!=="api-usage"?u=`<span class="text-lg font-bold text-slate-500 dark:text-slate-400">${s(i("table.price.official"))}</span>`:u=`<span class="text-lg font-bold text-slate-400 dark:text-slate-500">${s(i("table.price.usage"))}</span>`;let d=N(e),f=q(e),b=d||f?`<div class="plan-card-quota-row mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        ${d?`<span title="${s(d.full)}">${s(i("table.col.quota"))}: ${s(d.text)}</span>`:""}
        ${f?`<span class="font-medium text-brand-700 dark:text-brand-300"${f.estimated?` title="${s(i("table.unitPrice.estimated"))}"`:""}>${s(f.text)}</span>`:""}
      </div>`:"";return`
    <div class="plan-card">
      <div class="plan-card-head">
        <div class="plan-card-title-row flex items-start justify-between gap-2">
          <div class="flex min-w-0 flex-1 items-start gap-2">
            ${r}
            <div class="min-w-0 flex-1">
              <p class="plan-card-title">${s(e.name)}</p>
            </div>
          </div>
          <div class="plan-card-meta flex shrink-0 flex-col items-end gap-1.5">
            <span class="whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium ${n}">${Ke(e)}</span>
            ${a}
            ${o?`<span class="whitespace-nowrap rounded-md bg-brand-50 px-1.5 py-0.5 text-[10px] font-medium text-brand-600 dark:bg-brand-950/40 dark:text-brand-300">${s(o)}</span>`:""}
            ${bt(e)}
          </div>
          <span class="plan-card-disclosure" aria-hidden="true">
            <span>${t?i("card.detail.collapse"):i("card.detail.expand")}</span>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="m6 8 4 4 4-4" />
            </svg>
          </span>
        </div>
        <div class="plan-card-price-row mt-3 flex items-baseline gap-1.5">
          ${u}
        </div>
        ${b}
      </div>
    </div>
  `}function At(e,r,a,t,n){return e.length?Ve(e,a).map(l=>{let o=n||t.has(l.provider),p=(o?l.plans:l.plans.slice(0,z)).map(y=>{let m=te(y),v=m===r,h=y.confidenceScore,x="trust-dot--yellow";h&&h>=.8?x="trust-dot--high":h&&h<.5&&(x="trust-dot--red");let A=[y.domesticPayment?`<span class="plan-card-badge">${s(i("badge.domesticPayment"))}</span>`:"",ae(y)?`<span class="plan-card-badge plan-card-badge--intl" title="${s(i("badge.intl.title"))}">${s(String(y.monthlyCurrency||"USD").toUpperCase())}</span>`:""].filter(Boolean).join(""),Z=`<span class="trust-dot ${x}" title="${s(i("trust.label"))}: ${h!=null?Math.round(h*100)+"%":i("common.unknown")}"></span>`;return`
        <article class="plan-card-mobile${v?" is-selected":""}">
          <div class="plan-card-toggle" role="button" tabindex="0" data-plan-key="${s(m)}" aria-expanded="${v?"true":"false"}">
            ${Pt(y,Z,A,v)}
          </div>
          ${v?se(y,a):""}
        </article>`}).join(""),d=Math.max(0,l.plans.length-z),f=!n&&d>0?`<button type="button" class="plan-group-toggle" data-plan-group-toggle="${s(l.provider)}" aria-expanded="${o?"true":"false"}">${o?i("group.collapseExtra"):i("group.viewRemaining",{n:d})}</button>`:"",b=`${F(l.iconUrl,l.label,"brand-icon brand-icon--section")}
          <h3 class="text-sm font-bold text-brand-800 dark:text-brand-200">${s(l.label)}</h3>`;return`
      <section class="plan-card-group">
        <div class="mb-2 flex items-center gap-2">
          ${l.brandHref?`<a href="${s(l.brandHref)}" class="plan-group-brand-link">${b}</a>`:b}
          <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${l.plans.length}</span>
        </div>
        <div class="plan-card-grid">
          ${p}
        </div>
        ${f}
      </section>`}).join(""):""}function je(e,r,a,t,n=z){let l=a?e.plans:e.plans.slice(0,n);return l.length?l.map(o=>{let u=te(o),p=u===r,d=Oe(o),f=Se(o),b=M(o.monthlyPrice)?`<div>${s(o.monthlyPrice)}</div>${f?`<div class="plan-table-price-first">${s(i("table.price.firstMonth"))} ${s(f)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',y=M(o.quarterlyPrice)?`<div>${s(o.quarterlyPrice)}</div>${M(o.quarterlyMonthlyPrice)?`<div class="plan-table-price-sub">${s(i("table.price.approx"))} ${s(o.quarterlyMonthlyPrice)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',m=M(o.annualPrice)?`<div>${s(o.annualPrice)}</div>${M(o.annualMonthlyPrice)?`<div class="plan-table-price-sub">${s(i("table.price.approx"))} ${s(o.annualMonthlyPrice)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',v=N(o),h=v?`<span class="text-slate-700 dark:text-slate-300" title="${s(v.full)}">${s(v.text)}</span>`:'<span class="text-slate-400">\u2014</span>',x=qe(o)?`<span class="billing-unit-badge billing-unit-badge--${s(o.limitType||"undisclosed")}">${s(le(o))}</span>`:'<span class="text-slate-400">\u2014</span>',A=q(o),Z=A?`<span class="whitespace-nowrap font-medium text-brand-700 dark:text-brand-300"${A.estimated?` title="${s(i("table.unitPrice.estimated"))}"`:""}>${s(A.text)}</span>`:'<span class="text-slate-400">\u2014</span>',T=ne(o.lastVerifiedAt),et=T.state==="fresh"?`<span class="text-xs font-medium text-emerald-600 dark:text-emerald-400" title="${s(i("verified.freshTitle",{date:T.date}))}">${s(T.days===0?i("verified.tableToday"):i("verified.tableDaysAgo",{n:T.days}))}</span>`:T.state==="stale"?`<span class="text-xs font-medium text-amber-600 dark:text-amber-400" title="${s(i("verified.staleTitle",{date:T.date}))}">${s(i("verified.stale"))}</span>`:`<span class="text-xs text-slate-400">${s(i("table.verified.pending"))}</span>`,me=R(o.url),ye=V(o,me),tt=me?`<a href="${s(ye.href)}" target="_blank" rel="${ye.rel}" ${j(o)} class="text-sm font-medium text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">${s(i("table.source.site"))}</a>`:'<span class="text-slate-400">\u2014</span>',rt=o.domesticPayment?`<span class="rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">${s(i("common.supported"))}</span>`:`<span class="text-slate-400">${s(i("common.notSupported"))}</span>`,at=o.intlNetwork?`<span class="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">${s(i("common.required"))}</span>`:`<span class="text-slate-400">${s(i("common.notSupported"))}</span>`,nt=wt(o,t),st=p?`<tr class="plan-detail-row">
          <td colspan="15" class="plan-inline-detail-cell">
            ${se(o,t)}
          </td>
        </tr>`:"",be=vt(o,t),ve=s(o.name),it=ae(o)?` <span class="plan-intl-tag" title="${s(i("badge.intl.title"))}">${s(String(o.monthlyCurrency||"USD").toUpperCase())}</span>`:"",lt=(be?`<a href="${s(be)}" class="font-medium text-brand-700 hover:text-brand-900 hover:underline dark:text-brand-300 dark:hover:text-brand-200">${ve}</a>`:ve)+it,ge=`${F(e.iconUrl,e.label,"brand-icon brand-icon--table")}<span>${s(e.label)}</span>`,ot=e.brandHref?`<a href="${s(e.brandHref)}" class="plan-provider-cell plan-provider-cell--link">${ge}</a>`:`<div class="plan-provider-cell">${ge}</div>`;return`
      <tr class="plan-select-row${p?" is-selected":""}" data-plan-key="${s(u)}" tabindex="0" aria-selected="${p?"true":"false"}">
        <td class="px-3 py-3 font-medium text-slate-900 dark:text-white">${ot}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${lt}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${b}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${y}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${m}</td>
        <td class="plan-table-nowrap px-3 py-3">${x}</td>
        <td class="break-words px-3 py-3">${h}</td>
        <td class="plan-table-nowrap px-3 py-3">${Z}</td>
        <td class="break-words px-3 py-3 text-slate-600 dark:text-slate-300">${s(H(o)||"\u2014")}</td>
        <td class="plan-table-nowrap px-3 py-3"><span class="rounded-md px-2 py-0.5 text-xs font-medium ${d}">${Ke(o)}</span></td>
        <td class="plan-table-nowrap px-3 py-3">${rt}</td>
        <td class="plan-table-nowrap px-3 py-3">${at}</td>
        <td class="plan-table-nowrap px-3 py-3">${nt}</td>
        <td class="plan-table-nowrap px-3 py-3">${et}</td>
        <td class="plan-table-nowrap px-3 py-3">${tt}</td>
      </tr>
      ${st}`}).join(""):""}function St(e,r,a,t,n,l){let o=r.length?Ve(r,t).map(u=>{if(u.plans.length===1)return je(u,a,!0,t);let p=!l&&u.plans.length>z,d=l||!p||n.has(u.provider),f=_t(u),b=`${F(u.iconUrl,u.label,"brand-icon brand-icon--section")}
              <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${s(u.label)}</span>`,y=`
              ${u.brandHref?`<a href="${s(u.brandHref)}" class="plan-table-group-brand">${b}</a>`:b}
              <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${u.plans.length}</span>
              <span class="plan-table-group-right">
                ${f}
                ${p?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
              </span>`;return`
        <tr class="border-y border-slate-200 dark:border-slate-700">
          <td colspan="15" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
            ${p?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-plan-group-toggle="${s(u.provider)}" aria-expanded="${d?"true":"false"}" aria-label="${d?i("group.collapse"):i("group.expand")} ${s(u.label)}">${y}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${y}</div>`}
          </td>
        </tr>
        ${je(u,a,d,t)}`}).join(""):`<tr>
        <td colspan="15" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">${s(i("table.empty.match"))}</td>
      </tr>`;return`
    <div class="plan-table-wrap">
      <table class="w-full table-fixed text-sm">
        <caption class="sr-only">${s(i("table.caption"))}</caption>
        <colgroup>
          <col style="width: 8%">
          <col style="width: 10%">
          <col style="width: 7%">
          <col style="width: 7%">
          <col style="width: 7%">
          <col style="width: 6%">
          <col style="width: 9%">
          <col style="width: 7%">
          <col style="width: 8%">
          <col style="width: 6%">
          <col style="width: 6%">
          <col style="width: 6%">
          <col style="width: 5%">
          <col style="width: 4%">
          <col style="width: 4%">
        </colgroup>
        <thead>
          <tr>
            ${oe.map(u=>Be(u,e)).join("")}
          </tr>
        </thead>
        <tbody>
          ${o}
        </tbody>
      </table>
    </div>`}function xr(e,r="",a={},t=new Set,n=!1){if(!e.length)return`<p class="text-sm text-slate-500 dark:text-slate-400">${s(i("table.empty.none"))}</p>`;let l=_e(e,a,$);if(!l.length)return`<p class="text-sm text-slate-500 dark:text-slate-400">${s(i("table.empty.none"))}</p>`;De(a);let o=Re(l),u=n||G()||Ee();return`
    <div>
      ${Ie(o,l)}
      ${He(o,l)}
      <div class="plan-view-cards">
        ${At(o,r,a,t,u)}
      </div>
      <div class="plan-view-table">
        ${St(l,o,r,a,t,u)}
      </div>
    </div>`}var Qe=7.2,de=[{id:"light",labelKey:"advisor.usage.light",value:500},{id:"medium",labelKey:"advisor.usage.medium",value:3e3},{id:"heavy",labelKey:"advisor.usage.heavy",value:1e4},{id:"extreme",labelKey:"advisor.usage.extreme",value:3e4}],Lt={Anthropic:"Claude",Claude:"Claude",ChatGPT:"GPT",ChartGPT:"GPT",Google:"Gemini","Google Antigravity":"Gemini",Grok:"Grok","Z.ai":"GLM",BytePlus:"Doubao",\u963F\u91CC\u4E91:"Qwen",StepFun:"Step",\u9636\u8DC3\u661F\u8FB0:"Step",Cursor:"Cursor",Qoder:"Qoder",Trae:"Trae",OpenCode:"OpenCode"},Ge=8;function ue(e){let r=String(e||"").trim();if(!r||/未指定|无明确|未公开|不适用|待更新|待确认|pending|unspecified|not specified|n\/a|tbd|unknown|see official/i.test(r))return null;let a=r.replace(/,/g,"").match(/(\d+(?:\.\d+)?)\s*(万)?/);if(!a)return null;let t=parseFloat(a[1])*(a[2]==="\u4E07"?1e4:1);return Number.isFinite(t)&&t>0?t:null}function Tt(e){let r=ue(e.monthlyRequests);if(r!=null)return{value:r,estimated:/约|估算|approx|estimat/i.test(e.monthlyRequests),basis:"monthly"};let a=ue(e.weeklyRequests);if(a!=null)return{value:Math.round(a*4.3),estimated:!0,basis:"weekly"};let t=ue(e.fiveHoursRequests);return t!=null?{value:t*30,estimated:!0,basis:"fiveHours"}:null}function Ct(e){let r=[{value:e.monthlyPriceValue,cycle:"monthly"},{value:e.quarterlyMonthlyPriceValue,cycle:"quarterly"},{value:e.annualMonthlyPriceValue,cycle:"annual"}].filter(n=>Number.isFinite(n.value)&&n.value>=0);if(!r.length)return null;let a=r.reduce((n,l)=>l.value<n.value?l:n),t=e.monthlyCurrency==="CNY";return{value:a.value,cycle:a.cycle,currency:e.monthlyCurrency||"USD",usd:t?a.value/Qe:a.value}}function Mt(e){return Lt[e.provider]||e.provider||"Other"}function Ut(e,r){let a=new Map;for(let l of e)l.id&&a.set(l.id,Mt(l));let t=new Map;for(let l of r){let o=new Set((l.modelIds||[]).map(u=>a.get(u)).filter(Boolean));for(let u of o)t.set(u,(t.get(u)||0)+1)}return{options:[...t.entries()].map(([l,o])=>({family:l,count:o})).sort((l,o)=>o.count-l.count||l.family.localeCompare(o.family,"en")),familyByModelId:a}}function Dt(e,r){return new Set((e.modelIds||[]).map(a=>r.get(a)).filter(Boolean))}function Nt(e,r,a){let{families:t,usage:n,budget:l}=r,o=[],u=0;for(let p of e){if(p.planType==="api_package"){u+=1;continue}let d=Ct(p);if(l!=null&&d&&d.usd>l)continue;let f=!1;if(t.size){let v=Dt(p,a);if(!v.size)f=!0;else if(![...v].some(h=>t.has(h)))continue}let b=Tt(p),y=b&&d&&b.value>0?d.usd/b.value*1e3:null,m;f?m=4:b?b.value>=n?m=1:m=2:m=3,o.push({plan:p,price:d,quota:b,costPer1k:y,tier:m})}return o.sort((p,d)=>{if(p.tier!==d.tier)return p.tier-d.tier;if((p.tier===1||p.tier===2)&&p.costPer1k!==d.costPer1k)return(p.costPer1k??1/0)-(d.costPer1k??1/0);let f=p.price?p.price.usd:1/0,b=d.price?d.price.usd:1/0;return f-b}),{results:o,paygoCount:u}}function ze(e){return Math.round(e).toLocaleString(_())}function Ye(e,r="USD"){return`${r==="CNY"?"\xA5":"$"}${e.toLocaleString(_(),{maximumFractionDigits:e<10?2:0})}`}function qt(e,r){let{plan:a,price:t,quota:n,costPer1k:l,tier:o}=e,u=C(a.provider,r,$),p=[];if(o===1?p.push(`<span class="plan-advisor-chip plan-advisor-chip--good">${s(i("advisor.chip.enough"))}</span>`):o===2?p.push(`<span class="plan-advisor-chip plan-advisor-chip--warn">${s(i("advisor.chip.short"))}</span>`):o===3?p.push(`<span class="plan-advisor-chip plan-advisor-chip--muted">${s(i("advisor.chip.unknown"))}</span>`):p.push(`<span class="plan-advisor-chip plan-advisor-chip--muted">${s(i("advisor.chip.unlabeled"))}</span>`),n){let m=n.estimated?`\uFF08${s(i("advisor.chip.estimated",{basis:i(`advisor.basis.${n.basis}`)}))}\uFF09`:"";p.push(`<span class="plan-advisor-chip">${s(i("advisor.chip.monthlyQuota",{n:ze(n.value)}))}${m}</span>`)}if(l!=null&&p.push(`<span class="plan-advisor-chip">${s(i("advisor.chip.per1k",{price:Ye(l)}))}</span>`),a.supportedModelNames?.length){let m=a.supportedModelNames.slice(0,3).join(" / "),v=a.supportedModelNames.length>3?" \u2026":"";p.push(`<span class="plan-advisor-chip">${s(i("advisor.chip.supports",{models:m+v}))}</span>`)}let d=`<span class="plan-advisor-price-muted">${s(i("advisor.price.official"))}</span>`;if(t){let m=t.cycle!=="monthly"?`<span class="plan-advisor-cycle">${s(i(`advisor.cycle.${t.cycle}`))}</span>`:"",v=t.currency==="CNY"?`<span class="plan-advisor-price-note">${s(i("advisor.price.cnyNote",{n:ze(t.usd),rate:Qe}))}</span>`:"";d=`<span class="plan-advisor-price">${Ye(t.value,t.currency)}/${s(i("common.perMonth"))}</span>${m}${v}`}let f=R(a.url),b=f?V(a,f):null,y=b?`<a href="${s(b.href)}" target="_blank" rel="${b.rel}" ${j(a)} class="plan-advisor-link">${s(i("advisor.link"))}</a>`:"";return`
    <li class="plan-advisor-result">
      <div class="plan-advisor-result-head">
        ${F(a.providerIconUrl,u,"brand-icon plan-advisor-result-icon")}
        <div class="plan-advisor-result-name">
          <strong>${s(a.name)}</strong>
          <span>${s(u)}</span>
        </div>
        <div class="plan-advisor-result-price">${d}</div>
      </div>
      <div class="plan-advisor-result-chips">${p.join("")}</div>
      ${y}
    </li>
  `}function Et(e,r){let a=de.some(t=>t.value===r.usage)?"":r.usage;return`
    <div class="plan-advisor-form">
      <div class="plan-advisor-field">
        <span class="plan-advisor-label">${s(i("advisor.family.label"))}<small>${s(i("advisor.family.hint"))}</small></span>
        <div class="plan-advisor-options" data-advisor-families>
          ${e.map(t=>{let n=r.families.has(t.family);return`
              <button type="button" class="plan-advisor-option${n?" is-active":""}" data-family="${s(t.family)}" aria-pressed="${n}">
                ${s(t.family)}<span class="plan-advisor-option-count">${t.count}</span>
              </button>
            `}).join("")}
        </div>
      </div>
      <div class="plan-advisor-field">
        <span class="plan-advisor-label">${s(i("advisor.usage.label"))}</span>
        <div class="plan-advisor-options" data-advisor-usage>
          ${de.map(t=>{let n=t.value===r.usage;return`
              <button type="button" class="plan-advisor-option${n?" is-active":""}" data-usage="${t.value}" aria-pressed="${n}">
                ${s(i(t.labelKey))}
              </button>
            `}).join("")}
          <input type="number" min="1" class="plan-advisor-input" data-advisor-usage-custom placeholder="${s(i("advisor.usage.custom"))}" aria-label="${s(i("advisor.usage.custom"))}" value="${a}">
        </div>
      </div>
      <div class="plan-advisor-field plan-advisor-field--row">
        <label class="plan-advisor-budget">
          <span>${s(i("advisor.budget"))}</span>
          <input type="number" min="0" class="plan-advisor-input" data-advisor-budget placeholder="${s(i("advisor.budget.placeholder"))}" aria-label="${s(i("advisor.budget"))}" value="${r.budget??""}">
        </label>
      </div>
    </div>
    <div class="plan-advisor-results" data-advisor-results aria-live="polite"></div>
  `}function Ft(){return`
    <div class="plan-advisor-dialog" role="dialog" aria-modal="true" aria-labelledby="planAdvisorTitle" tabindex="-1">
      <div class="plan-advisor-head">
        <h2 id="planAdvisorTitle">${s(i("advisor.title"))}</h2>
        <button type="button" class="plan-advisor-close" data-advisor-close aria-label="${s(i("advisor.close.aria"))}">\u2715</button>
      </div>
      <div class="plan-advisor-body"></div>
      <p class="plan-advisor-disclaimer">${s(i("advisor.disclaimer"))}</p>
    </div>
  `}function Rt({root:e,plans:r,providerInfo:a={},modelCatalog:t=[],initialState:n={},onStateChange:l=null}){let{options:o,familyByModelId:u}=Ut(t,r),p=new Set(o.map(y=>y.family)),d={families:new Set([...n.families||[]].filter(y=>p.has(y))),usage:Number.isFinite(n.usage)&&n.usage>0?n.usage:de[1].value,budget:Number.isFinite(n.budget)&&n.budget>0?n.budget:null,showAll:!1};e.innerHTML=Et(o,d);let f=()=>{let y=e.querySelector("[data-advisor-results]"),{results:m,paygoCount:v}=Nt(r,d,u);if(!m.length){y.innerHTML=`
        <p class="plan-advisor-empty">${s(i("advisor.empty"))}</p>
        ${v?`<p class="plan-advisor-paygo">${s(i("advisor.paygo",{n:v}))}</p>`:""}
      `;return}let h=d.showAll?m:m.slice(0,Ge);y.innerHTML=`
      <p class="plan-advisor-summary">${s(i("advisor.summary",{n:m.length}))}</p>
      <ol class="plan-advisor-list">
        ${h.map(x=>qt(x,a)).join("")}
      </ol>
      ${m.length>Ge&&!d.showAll?`<button type="button" class="plan-advisor-more" data-advisor-more>${s(i("advisor.expand",{n:m.length}))}</button>`:""}
      ${v?`<p class="plan-advisor-paygo">${s(i("advisor.paygo",{n:v}))}</p>`:""}
    `},b=()=>{l?.(d)};return e.addEventListener("click",y=>{let m=y.target.closest("[data-family]");if(m){let h=m.dataset.family;d.families.has(h)?d.families.delete(h):d.families.add(h);let x=d.families.has(h);m.classList.toggle("is-active",x),m.setAttribute("aria-pressed",String(x)),d.showAll=!1,f(),b();return}let v=y.target.closest("[data-usage]");if(v){d.usage=Number(v.dataset.usage),e.querySelectorAll("[data-usage]").forEach(x=>{let A=x===v;x.classList.toggle("is-active",A),x.setAttribute("aria-pressed",String(A))});let h=e.querySelector("[data-advisor-usage-custom]");h&&(h.value=""),d.showAll=!1,f(),b();return}y.target.closest("[data-advisor-more]")&&(d.showAll=!0,f())}),e.querySelector("[data-advisor-usage-custom]")?.addEventListener("input",y=>{let m=Number(y.target.value);Number.isFinite(m)&&m>0&&(d.usage=m,e.querySelectorAll("[data-usage]").forEach(v=>{v.classList.remove("is-active"),v.setAttribute("aria-pressed","false")})),d.showAll=!1,f(),b()}),e.querySelector("[data-advisor-budget]")?.addEventListener("input",y=>{let m=Number(y.target.value);d.budget=Number.isFinite(m)&&m>0?m:null,d.showAll=!1,f(),b()}),f(),{state:d,refresh:f}}function Lr({plans:e,providerInfo:r={},modelCatalog:a=[],fab:t}){if(!t)return null;let n=null,l=null,o=null,u=()=>{n&&(n.hidden=!0,document.body.style.overflow="",o?.focus?.())},p=()=>{n||(n=document.createElement("div"),n.className="plan-advisor-overlay",n.hidden=!0,n.innerHTML=Ft(),document.body.appendChild(n),l=Rt({root:n.querySelector(".plan-advisor-body"),plans:e,providerInfo:r,modelCatalog:a}),n.addEventListener("click",f=>{f.target.closest("[data-advisor-close]")&&u()}),document.addEventListener("keydown",f=>{f.key==="Escape"&&n&&!n.hidden&&u()}))},d=()=>{p(),o=document.activeElement,n.hidden=!1,document.body.style.overflow="hidden",l.refresh(),n.querySelector(".plan-advisor-dialog")?.focus()};return t.addEventListener("click",d),{open:d,close:u}}var Nr=[{id:"low-cost",label:i("scenario.lowCost")},{id:"long-context",label:i("scenario.longContext")},{id:"multimodal",label:i("scenario.multimodal")},{id:"enterprise-api",label:i("scenario.enterpriseApi")},{id:"personal-use",label:i("scenario.personalUse")}];async function It(){let e=Te(),r=e?"backend":"static",a=await We(Ce()),t=e&&U()==="en"?await We("/data.json"):null;return{...Bt(jt(a,t),r),dataUnavailable:!a}}async function qr(){let e=await It(),r=e.models.flatMap(n=>zt(n,e.providerInfo)),a=e.modelCatalog||[],t=new Map(a.map(n=>[n.id,n.name]));for(let n of r)n.supportedModelNames=(n.modelIds||[]).map(l=>t.get(l)).filter(Boolean);return{...e,plans:r,providerInfo:e.providerInfo||{},modelCatalog:a}}function Bt(e,r){if(e&&Array.isArray(e.models)){let a=e.models.map(t=>Gt(t,r));if(a.length)return{source:r,lastUpdated:e.last_updated||ar(a.map(t=>t.updatedAt)),models:a,rawModels:e.models,providerInfo:e.provider_info||{},modelCatalog:Ht(e.model_catalog)}}return{source:r,lastUpdated:e?.last_updated||"unknown",models:[],rawModels:[],providerInfo:e?.provider_info||{},modelCatalog:[]}}function Ht(e){return Array.isArray(e)?e.map(r=>({id:c(r.id),name:c(g(r.name,r.name_en),r.id||""),provider:c(r.provider,""),providerIconUrl:c(r.provider_icon_url,""),logoUrl:c(r.logo_url,""),sortOrder:P(r.sort_order),marketRegion:c(r.market_region,"")})).filter(r=>r.id):[]}async function We(e){try{let r=await fetch(e,{headers:{Accept:"application/json"}});return r.ok?await r.json():null}catch{return null}}function jt(e,r){if(!e||!Array.isArray(e.models)||!r||!Array.isArray(r.models))return e;let a=new Map(r.models.map(n=>[Y(n),n]).filter(([n])=>n)),t=e.models.map(n=>{let l=a.get(Y(n));return l?W(n,l):n});return{...e,models:t,provider_info:Vt(e.provider_info,r.provider_info)}}function Vt(e={},r={}){let a=new Set([...Object.keys(r||{}),...Object.keys(e||{})]),t={};for(let n of a)t[n]=W(e?.[n]||{},r?.[n]||{});return t}function W(e,r){if(!e||typeof e!="object"||Array.isArray(e)||!r||typeof r!="object"||Array.isArray(r))return e;let a={...e};for(let[t,n]of Object.entries(r)){let l=e[t];t==="package_plans"&&Array.isArray(l)&&Array.isArray(n)?a[t]=Kt(l,n):l&&typeof l=="object"&&!Array.isArray(l)&&n&&typeof n=="object"&&!Array.isArray(n)?a[t]=W(l,n):typeof l=="string"||typeof n=="string"?a[t]=Ot(l,n):l==null&&(a[t]=n)}return a}function Kt(e,r){let a=new Map(r.map(t=>[Y(t),t]).filter(([t])=>t));return e.map(t=>{let n=a.get(Y(t));return n?W(t,n):t})}function Ot(e,r){let a=String(r??"").trim();if(!a)return e;let t=String(e??"").trim();return t?Je(t)&&!Je(a)?r:e:r}function Je(e){return/[\u3400-\u9fff]/.test(String(e||""))}function Y(e){return String(e?.id||e?.model_id||e?.plan_id||e?.planId||"").trim()}function Gt(e,r){let a=Array.isArray(e.capabilities)?e.capabilities:[],t=P(e.input_price),n=P(e.context_length),l=J(g(e.plan_summary,e.plan_summary_en),g(e.access_notes,e.access_notes_en),g(e.notes,e.notes_en)),o=Wt(e,t,n,a);return{id:c(e.id),vendor:c(e.provider,"Pending"),providerIconUrl:c(e.provider_icon_url,e.icon_url||""),logoUrl:c(e.logo_url,""),modelName:c(g(e.name,e.name_en),"Pending"),inputPrice:Xe(e.input_price,e.currency),outputPrice:Xe(e.output_price,e.currency),contextLength:rr(e.context_length),multimodal:a.includes("vision")?"Supported":"TBD",apiSupport:"Supported",rmbRecharge:c(g(e.rmb_recharge_support,e.rmb_recharge_support_en),"See official site"),invoice:c(g(e.invoice_support,e.invoice_support_en),"See official site"),rmbRechargeRaw:e.rmb_recharge_support??null,invoiceRaw:e.invoice_support??null,accessLevel:c(e.access_level,""),marketRegion:c(e.market_region,""),marketRegionLabel:c(e.market_region_label,""),scenarios:o,suitableFor:c(g(e.suitable_for,e.suitable_for_en),l||"See official site"),updatedAt:c(e.last_updated,e.release_date||"Pending"),sourceUrl:c(e.docs_url,e.plan_url||""),packagePlans:Array.isArray(e.package_plans)?e.package_plans:[],source:r,raw:e}}function zt(e,r={}){return(e.packagePlans||[]).filter(t=>t.status!=="discontinued").map(t=>{let n=P(t.monthly_price),l=P(t.quarterly_price),o=P(t.annual_price),u=Xt(t,e),p=c(t.provider,e.vendor),d=r[p]||{},f=Yt(p,r),b=Qt(p,r);return{id:c(t.id,`${e.id}-plan`),planId:c(t.planId,t.plan_id||""),brand:c(t.brand,t.brand_slug||""),name:c(g(t.name,t.name_en),"Pending plan"),provider:p,providerIconUrl:c(t.provider_icon_url,t.icon_url,e.providerIconUrl),modelName:e.modelName,modelId:c(t.model_id,e.id),modelIds:Array.isArray(t.model_ids)?t.model_ids.map(y=>String(y||"").trim()).filter(Boolean):[],status:c(t.status,"unknown"),statusLabel:(()=>{if(t.status){let y=i(`status.${t.status}`);if(!y.startsWith("status."))return y}return c(t.status_label,i("status.pending"))})(),url:tr(t.url_cn,t.url_en),monthlyPrice:pe(t.monthly_price,u),monthlyPriceValue:n,monthlyCurrency:u,monthlyCurrencyLabel:u==="USD"?i("currency.usd"):i("currency.cny"),quarterlyPrice:l!=null?fe(t.quarterly_price,u,i("common.perQuarter")):"",quarterlyPriceValue:l,quarterlyMonthlyPrice:l!=null?pe(l/3,u):"",quarterlyMonthlyPriceValue:l!=null?l/3:null,annualPrice:o!=null?fe(t.annual_price,u,i("common.perYear")):"",annualPriceValue:o,annualMonthlyPrice:o!=null?pe(o/12,u):"",annualMonthlyPriceValue:o!=null?o/12:null,includedCalls:c(g(t.included_calls,t.included_calls_en),""),notes:c(g(t.notes,t.notes_en),""),planType:c(t.plan_type,Ze(t,e)),category:Ze(t,e),rmbRecharge:e.rmbRecharge,invoice:e.invoice,rmbRechargeRaw:e.rmbRechargeRaw,invoiceRaw:e.invoiceRaw,accessLevel:e.accessLevel,marketRegion:e.marketRegion,marketRegionLabel:e.marketRegionLabel,firstMonthPrice:t.first_month_price!=null?t.first_month_price:null,fiveHoursRequests:c(g(t.five_hours_requests,t.five_hours_requests_en),""),weeklyRequests:c(g(t.weekly_requests,t.weekly_requests_en),""),monthlyRequests:c(g(t.monthly_requests,t.monthly_requests_en),""),measuredFiveHoursTokens:c(t.measured_five_hours_tokens,""),measuredWeeklyTokens:c(t.measured_weekly_tokens,""),measuredMonthlyTokens:c(t.measured_monthly_tokens,""),tokenLimit:c(t.token_limit,""),supportedModels:c(g(t.supported_models,t.supported_models_en),g(d.supported_models,d.supported_models_en)||""),benefits:c(g(t.benefits,t.benefits_en),""),rating:c(t.rating,""),tags:c(g(t.tags,t.tags_en),""),sourceUrl:c(t.source_url,""),lastVerifiedAt:c(t.last_verified_at,""),refundPolicy:c(g(t.refund_policy,t.refund_policy_en),""),billingCycle:c(t.billing_cycle,""),creditsLimit:c(g(t.credits_limit,t.credits_limit_en),""),concurrencyLimit:c(t.concurrency_limit,""),resetRule:c(g(t.reset_rule,t.reset_rule_en),""),limitType:c(t.limit_type,Jt(t)),dataStatus:c(t.data_status,Zt(t)),confidenceScore:t.confidence_score!=null?t.confidence_score:null,sourceType:c(t.source_type,""),toolCompatibility:L(t.tool_compatibility_json,{}),modelMultiplier:L(t.model_multiplier_json,{}),derivedMetrics:L(t.derived_metrics_json,{}),measuredMetrics:L(t.measured_metrics_json,{}),risk:L(t.risk_json,{}),recommendation:L(t.recommendation_json,{}),changeSummary:L(t.change_summary_json,{}),linkType:c(t.link_type,"official"),hasAffiliate:t.has_affiliate===!0,domesticPayment:f??Q(t.domestic_payment),intlNetwork:b??Q(t.intl_network),hasFirstMonthDiscount:t.has_first_month_discount===!0||t.has_first_month_discount===1,recommendationText:c(g(t.recommendation_text,t.recommendation_text_en),""),riskText:c(g(t.risk_text,t.risk_text_en),""),sortOrder:P(t.sort_order),privacyOverride:L(t.privacy_override_json,{}),raw:t}})}function Yt(e,r={}){let a=c(e);if(!a)return null;let t=r[a];return!t||t.domestic_payment==null?null:Q(t.domestic_payment)}function Qt(e,r={}){let a=c(e);if(!a)return null;let t=r[a];return!t||t.intl_network==null?null:Q(t.intl_network)}function Wt(e,r,a,t){let n=J(e.name,e.provider,e.notes,e.plan_summary,e.access_notes).toLowerCase(),l=new Set(["enterprise-api"]);return r!=null&&r<=2&&l.add("low-cost"),a!=null&&a>=2e5&&l.add("long-context"),t.includes("vision")&&l.add("multimodal"),/个人|会员|订阅|聊天|kimi|豆包/.test(n)&&l.add("personal-use"),Array.from(l)}function L(e,r){if(!e||typeof e!="string")return e||r;try{return JSON.parse(e)}catch{return r}}function Jt(e){return e.five_hours_requests?"five_hours":e.weekly_requests?"weekly":e.monthly_requests?"monthly":e.token_limit?"token":e.credits_limit?"credits":"undisclosed"}function Zt(e){return e.last_verified_at?"verified":e.measured_monthly_tokens||e.measured_weekly_tokens?"measured":"pending"}function Ze(e,r){let a=J(e.name,e.provider,e.notes,r.vendor,r.modelName).toLowerCase();return/聚合|路由|硅基|siliconflow/.test(a)?"aggregated_router":/会员|订阅|chat|清言|kimi|豆包/.test(a)?"personal_subscription":/maas|百炼|千帆|腾讯云|火山方舟|企业/.test(a)?"enterprise_maas":/开源|部署|私有化/.test(a)?"open_source_deploy":(/coding|qoder|claude code|cursor|trae/.test(a),"coding_plan")}function Xt(e,r){let a=c(e.monthly_currency).toUpperCase();if(a==="USD")return"USD";let t=c(r.market_region).toLowerCase(),n=t==="international"||t==="domestic_international";if(a==="CNY"&&n)return"USD";let l=c(e.provider,r.vendor),o=l.toLowerCase();if(o==="qoder"||o==="qoder cn"||o==="byteplus"||o==="z.ai"||o==="grok"||o==="claude"||o==="chartgpt"||o==="google antigravity"||o==="opencode"||o==="anthropic"||o==="openai"||n)return"USD";let u=J(e.name,l,e.url_cn,e.url_en,e.included_calls,e.notes).toLowerCase();return/\$|usd|美元|trae\.ai/.test(u)?"USD":"CNY"}function c(...e){let r=e.find(a=>a!=null&&String(a).trim());return r==null?"":String(r).trim()}function Q(e){if(e===!0||e===1)return!0;let r=String(e??"").trim().toLowerCase();return r==="true"||r==="1"||r==="yes"}function er(e){if(!e)return!1;let r=String(e).trim();return!r||/[\u4e00-\u9fff]/.test(r)?!1:(r.match(/[a-zA-Z]/g)||[]).length/r.length>.6}function g(e,r){return U()==="en"&&r!=null&&String(r).trim()||U()==="zh"&&er(e)&&r!=null&&String(r).trim()&&String(r).trim()!==String(e).trim()?r:e}function tr(e,r){return U()==="zh"?c(e,r):c(r,e)}function P(e){if(e==null||e==="")return null;let r=Number(e);return Number.isFinite(r)?r:null}function Xe(e,r){let a=P(e);return a==null?c(e,i("common.pending")):`${r==="USD"?"$":"\xA5"}${a.toLocaleString(_(),{maximumFractionDigits:4})}/${i("common.perMillionTokens")}`}function pe(e,r="CNY"){return fe(e,r,i("common.perMonth"))}function fe(e,r="CNY",a=i("common.perMonth")){let t=P(e);return t==null?i("common.official"):`${r==="USD"?"$":"\xA5"}${t.toLocaleString(_(),{maximumFractionDigits:2})}/${a}`}function rr(e){let r=P(e);return r==null?c(e,i("common.official")):r>=1e6?`${(r/1e6).toLocaleString(_(),{maximumFractionDigits:1})}M tokens`:r>=1e3?`${(r/1e3).toLocaleString(_(),{maximumFractionDigits:0})}K tokens`:`${r.toLocaleString(_())} tokens`}function J(...e){return e.filter(r=>r!=null&&String(r).trim()).join(" ")}function ar(e){return e.find(r=>r&&r!=="Pending")||"Pending"}export{mt as a,dr as b,F as c,xr as d,Rt as e,Lr as f,qr as g};
