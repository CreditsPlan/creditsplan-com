import{a as Te,b as Ce}from"./chunk.7HYUNLOO.js";import{A as Se,B as Le,C as se,a as $,b as he,c as xe,d as $e,e as D,f as X,g as I,h as T,i as ee,j as _e,k as te,l as re,m as B,n as H,p as ke,q as we,r as Pe,s as C,t as ne,u as ae,v as N,w as E,x as Ae,y as j,z as V}from"./chunk.56ODY2JA.js";import{a as U,c as k,e as i,h as s,i as R}from"./chunk.S2U5UH7Q.js";var ct=new Set(["\u5F85\u66F4\u65B0","\u5F85\u786E\u8BA4","\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"]);function K(e){let r=String(e??"").trim();return r&&!ct.has(r)?r:"\u2014"}function F(e="",r=""){let n=String(r??"").trim();return{column:n?String(e??"").trim():"",value:n}}function ie(e){return!!(e?.column&&e?.value)}function Me(e,r,n){return ie(r)?e.filter(t=>n(t,r.column)===r.value):e}var Ue={};function De(e){Ue=e||{}}function ut(e){let r=I(e,Ue,$);return r.training?i(`privacy.training.${r.training}`)||r.training:i("privacy.filter.notResearched")}var Ne={token:"billing.token",credits:"billing.credits",five_hours:"billing.requests",weekly:"billing.requests",monthly:"billing.requests"};function le(e){let r=Ne[e.limitType];return r?i(r):i("billing.undisclosed")}function Ee(e){return!!Ne[e.limitType]}var oe=[{key:"provider",labelKey:"table.col.provider",value:e=>T(e.provider)||"\u2014"},{key:"name",labelKey:"table.col.name",value:e=>B(e.name)||"\u2014"},{key:"monthlyPrice",labelKey:"table.col.monthly",value:e=>K(e.monthlyPrice)},{key:"quarterlyPrice",labelKey:"table.col.quarterly",value:e=>K(e.quarterlyPrice)},{key:"annualPrice",labelKey:"table.col.annual",value:e=>K(e.annualPrice)},{key:"billingUnit",labelKey:"table.col.billingUnit",value:e=>le(e)},{key:"quota",labelKey:"table.col.quota",value:e=>N(e)?.text||"\u2014"},{key:"unitPrice",labelKey:"table.col.unitPrice",value:e=>E(e)?.text||"\u2014"},{key:"model",labelKey:"table.col.model",value:e=>H(e)||"\u2014"},{key:"status",labelKey:"table.col.status",value:e=>B(e.statusLabel)||"\u2014"},{key:"domesticPayment",labelKey:"table.col.domesticPayment",value:e=>e.domesticPayment?i("common.supported"):"\u2014"},{key:"intlNetwork",labelKey:"table.col.intlNetwork",value:e=>e.intlNetwork?i("common.required"):"\u2014"},{key:"dataTraining",labelKey:"table.col.dataTraining",value:e=>ut(e)},{key:"verifiedAt",labelKey:"table.col.verified",value:e=>B(e.lastVerifiedAt)||i("table.verified.pending")},{key:"source",labelKey:"table.col.source",value:e=>e.url?i("table.source.name"):"\u2014"}],w=F(),M=!1,dt=new Intl.Collator(k(),{numeric:!0,sensitivity:"base"});function pt(e){return e.status==="available"||e.status==="rush_sale"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"}function Fe(){return M}function ur(){M=!M}function ce(e){return oe.find(r=>r.key===e)}function qe(e,r){let n=ce(r);return n?String(n.value(e)||"").trim()||"\u2014":""}function ft(){w=F(),M=!1}function G(){return ie(w)&&!!ce(w.column)}function Re(e){let r=e;return M&&(r=r.filter(pt)),G()&&(r=Me(r,w,qe)),r}function Ie(e,r){return M?`
    <div class="plan-table-quick-filters">
      <span class="plan-table-filter-count">${s(i("table.quick.availableOnly"))}\uFF1A${e.length} / ${r.length}</span>
    </div>
  `:""}function mt(e,r){let n=new Map;for(let t of e){let a=qe(t,r.key);n.set(a,(n.get(a)||0)+1)}return Array.from(n.entries()).map(([t,a])=>({value:t,count:a})).sort((t,a)=>t.value==="\u2014"&&a.value!=="\u2014"?1:a.value==="\u2014"&&t.value!=="\u2014"?-1:dt.compare(t.value,a.value))}function Be(e,r){let n=w.column===e.key&&!!w.value,t=mt(r,e);return`
    <th scope="col" class="plan-column-filter break-words px-3 py-3 text-left font-semibold text-slate-900 dark:text-white">
      <button type="button" class="plan-column-filter-trigger${n?" is-active":""}" data-plan-filter-column="${s(e.key)}" aria-haspopup="menu" aria-expanded="false" title="${s(i("table.filter.tooltip"))} ${s(i(e.labelKey))}">
        <span class="plan-column-filter-label">${s(i(e.labelKey))}</span>
        <span class="plan-column-filter-caret" aria-hidden="true"></span>
      </button>
      <div class="plan-column-filter-menu" data-plan-filter-menu="${s(e.key)}" role="menu" hidden>
        <button type="button" class="plan-column-filter-option${n?"":" is-active"}" data-plan-filter-value="">
          <span class="plan-column-filter-option-label">${s(i("table.filter.all"))}</span>
          <span class="plan-column-filter-option-count">${r.length}</span>
        </button>
        ${t.map(a=>`
          <button type="button" class="plan-column-filter-option${n&&a.value===w.value?" is-active":""}" data-plan-filter-value="${s(a.value)}">
            <span class="plan-column-filter-option-label">${s(a.value)}</span>
            <span class="plan-column-filter-option-count">${a.count}</span>
          </button>
        `).join("")}
      </div>
    </th>
  `}function He(e,r){if(!G())return"";let n=ce(w.column);return`
    <div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${s(i(n.labelKey))}</span>
        <strong>${s(w.value)}</strong>
      </span>
      <span class="plan-table-filter-count">${e.length} / ${r.length} ${s(i("table.filter.count"))}</span>
      <button type="button" class="plan-table-filter-clear" data-plan-filter-clear>${s(i("table.filter.clear"))}</button>
    </div>
  `}function O(e){e&&(e.querySelectorAll(".plan-column-filter-menu").forEach(r=>{r.hidden=!0}),e.querySelectorAll("[data-plan-filter-column]").forEach(r=>{r.setAttribute("aria-expanded","false")}))}function dr(e,r,n,t){e.addEventListener("click",a=>{let l=a.target.closest("[data-plan-filter-column]");if(l&&e.contains(l)){let c=l.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!c)return;let f=!c.hidden;O(e),f||(c.hidden=!1,l.setAttribute("aria-expanded","true"));return}let o=a.target.closest("[data-plan-filter-value]");if(o&&e.contains(o)){let c=o.closest("[data-plan-filter-menu]"),f=o.dataset.planFilterValue||"";w=c&&f?F(c.dataset.planFilterMenu,f):F(),n();return}let d=a.target.closest("[data-plan-filter-clear]");if(d&&e.contains(d)){ft(),n();return}let p=a.target.closest("[data-plan-key]");if(p&&e.contains(p)&&!a.target.closest("a")){let c=p.dataset.planKey||"";re(r(),c)&&t(c);return}a.target.closest(".plan-column-filter")||O(e)}),e.addEventListener("keydown",a=>{let l=a.target.closest("[data-plan-key]");if(!l||!e.contains(l)||a.target.closest("a")||a.key!=="Enter"&&a.key!==" ")return;a.preventDefault();let o=l.dataset.planKey||"";re(r(),o)&&t(o)}),document.addEventListener("click",a=>{e.contains(a.target)||O(e)}),document.addEventListener("keydown",a=>{a.key==="Escape"&&O(e)})}var z=2;function yt(e){let r=ae(e.lastVerifiedAt);if(r.state==="fresh"){let n=r.days===0?i("verified.freshToday"):i("verified.freshDaysAgo",{n:r.days});return`<span class="whitespace-nowrap rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300" title="${s(i("verified.freshTitle",{date:r.date}))}">${s(n)}</span>`}return r.state==="stale"?`<span class="whitespace-nowrap rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:bg-amber-950/40 dark:text-amber-300" title="${s(i("verified.staleTitle",{date:r.date}))}">${s(i("verified.stale"))}</span>`:""}function bt(e,r){let n=xe(e.provider,r,$),t=$e(e,n);return t?`/plans/${encodeURIComponent(t)}/`:""}function vt(e,r){let n=X(e,r,$),t=String(n.seo_slug||"").trim(),a=String(n.seo_intro||"").trim(),l=String(n.icon_url||"").trim();return t&&a&&l?`/brands/${encodeURIComponent(t)}/`:""}function gt(e,r={}){let n=X(e.provider,r,$);return D(n.icon_url)||D(e.providerIconUrl)||D(he(e.provider)?.iconUrl)}function q(e,r,n="brand-icon"){let t=D(e),a=String(r||"?").trim().slice(0,1).toUpperCase()||"?",l=t?"brand-icon-fallback hidden":"brand-icon-fallback";return`<span class="${n}" aria-hidden="true">
    ${t?`<img class="brand-icon-img" src="${s(t)}" alt="" loading="lazy" referrerpolicy="no-referrer">`:""}
    <span class="${l}">${s(a)}</span>
  </span>`}function Ve(e,r){let n=new Map;for(let a of e){let l=$[a.provider]||a.provider;n.has(l)||n.set(l,{provider:a.provider,label:T(a.provider,r,$),iconUrl:gt(a,r),brandHref:vt(a.provider,r),plans:[]}),n.get(l).plans.push(a)}let t=[...n.values()];for(let a of t)a.plans=_e(a.plans);return t.sort((a,l)=>ee(a.provider,r,$)-ee(l.provider,r,$)),t}function ht(e){return e.status==="available"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"}function Ke(e){if(!e.status)return s(e.statusLabel||"");let r=`status.${e.status}`,n=i(r);return s(n.startsWith("status.")?e.statusLabel||"":n)}function xt(e){let r=null;if(Number.isFinite(e.monthlyPriceValue))r=e.monthlyPriceValue;else{let n=String(e.monthlyPrice||"").match(/[\d.]+/),t=n?parseFloat(n[0]):NaN;Number.isFinite(t)&&(r=t)}return r==null||r<0?null:{value:r,currency:e.monthlyCurrency||"USD"}}function $t(e){let r=null;for(let n of e){let t=xt(n);t&&(r==null||t.value<r.value)&&(r=t)}return r}function _t(e){let r=$t(e.plans),n=e.plans.filter(ht).length,t=[];r!=null&&t.push(r.value===0?i("group.summary.free"):i("group.summary.from",{symbol:we(r.currency),price:Pe(r.value)})),n>0&&t.push(i("group.summary.available",{n}));let a=t.join(" \xB7 ");return`<span class="plan-table-group-summary">${s(a)}</span>`}function kt(e,r){let n=I(e,r,$);return n.training==="no"?`<span class="text-xs font-medium text-emerald-600 dark:text-emerald-400" title="${s(i("privacy.training.no"))}">${s(i("privacy.cell.no"))}</span>`:n.training==="yes"?`<span class="text-xs font-medium text-amber-600 dark:text-amber-400" title="${s(i("privacy.training.yes"))}">${s(i("privacy.cell.yes"))}</span>`:n.training==="unclear"?`<span class="text-xs text-slate-500 dark:text-slate-400">${s(i("privacy.training.unclear"))}</span>`:'<span class="text-slate-400">\u2014</span>'}function Oe(e){return e.status==="available"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"?"bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300":e.status==="rush_sale"?"bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400":"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}function wt(e,r="",n="",t=!1){let a=Oe(e),l=e.includedCalls&&e.includedCalls.length>10&&(e.includedCalls.includes("\xA5")||e.includedCalls.includes("\u5143")||e.includedCalls.includes("\u767E\u4E07")),o=Ae[e.planType]||e.planType||"",d,p=Le(e);p?d=p:l?d=`<span class="text-sm font-semibold text-slate-700 dark:text-slate-300">${s(e.includedCalls)}</span>`:e.includedCalls||e.planType!=="api-usage"?d=`<span class="text-lg font-bold text-slate-500 dark:text-slate-400">${s(i("table.price.official"))}</span>`:d=`<span class="text-lg font-bold text-slate-400 dark:text-slate-500">${s(i("table.price.usage"))}</span>`;let c=N(e),f=E(e),b=c||f?`<div class="plan-card-quota-row mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        ${c?`<span title="${s(c.full)}">${s(i("table.col.quota"))}: ${s(c.text)}</span>`:""}
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
            <span class="whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium ${a}">${Ke(e)}</span>
            ${n}
            ${o?`<span class="whitespace-nowrap rounded-md bg-brand-50 px-1.5 py-0.5 text-[10px] font-medium text-brand-600 dark:bg-brand-950/40 dark:text-brand-300">${s(o)}</span>`:""}
            ${yt(e)}
          </div>
          <span class="plan-card-disclosure" aria-hidden="true">
            <span>${t?i("card.detail.collapse"):i("card.detail.expand")}</span>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="m6 8 4 4 4-4" />
            </svg>
          </span>
        </div>
        <div class="plan-card-price-row mt-3 flex items-baseline gap-1.5">
          ${d}
        </div>
        ${b}
      </div>
    </div>
  `}function Pt(e,r,n,t,a){return e.length?Ve(e,n).map(l=>{let o=a||t.has(l.provider),p=(o?l.plans:l.plans.slice(0,z)).map(y=>{let m=te(y),v=m===r,h=y.confidenceScore,x="trust-dot--yellow";h&&h>=.8?x="trust-dot--high":h&&h<.5&&(x="trust-dot--red");let A=[y.domesticPayment?`<span class="plan-card-badge">${s(i("badge.domesticPayment"))}</span>`:"",ne(y)?`<span class="plan-card-badge plan-card-badge--intl" title="${s(i("badge.intl.title"))}">${s(String(y.monthlyCurrency||"USD").toUpperCase())}</span>`:""].filter(Boolean).join(""),Z=`<span class="trust-dot ${x}" title="${s(i("trust.label"))}: ${h!=null?Math.round(h*100)+"%":i("common.unknown")}"></span>`;return`
        <article class="plan-card-mobile${v?" is-selected":""}">
          <div class="plan-card-toggle" role="button" tabindex="0" data-plan-key="${s(m)}" aria-expanded="${v?"true":"false"}">
            ${wt(y,Z,A,v)}
          </div>
          ${v?se(y,n):""}
        </article>`}).join(""),c=Math.max(0,l.plans.length-z),f=!a&&c>0?`<button type="button" class="plan-group-toggle" data-plan-group-toggle="${s(l.provider)}" aria-expanded="${o?"true":"false"}">${o?i("group.collapseExtra"):i("group.viewRemaining",{n:c})}</button>`:"",b=`${q(l.iconUrl,l.label,"brand-icon brand-icon--section")}
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
      </section>`}).join(""):""}function je(e,r,n,t,a=z){let l=n?e.plans:e.plans.slice(0,a);return l.length?l.map(o=>{let d=te(o),p=d===r,c=Oe(o),f=Se(o),b=C(o.monthlyPrice)?`<div>${s(o.monthlyPrice)}</div>${f?`<div class="plan-table-price-first">${s(i("table.price.firstMonth"))} ${s(f)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',y=C(o.quarterlyPrice)?`<div>${s(o.quarterlyPrice)}</div>${C(o.quarterlyMonthlyPrice)?`<div class="plan-table-price-sub">${s(i("table.price.approx"))} ${s(o.quarterlyMonthlyPrice)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',m=C(o.annualPrice)?`<div>${s(o.annualPrice)}</div>${C(o.annualMonthlyPrice)?`<div class="plan-table-price-sub">${s(i("table.price.approx"))} ${s(o.annualMonthlyPrice)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',v=N(o),h=v?`<span class="text-slate-700 dark:text-slate-300" title="${s(v.full)}">${s(v.text)}</span>`:'<span class="text-slate-400">\u2014</span>',x=Ee(o)?`<span class="billing-unit-badge billing-unit-badge--${s(o.limitType||"undisclosed")}">${s(le(o))}</span>`:'<span class="text-slate-400">\u2014</span>',A=E(o),Z=A?`<span class="whitespace-nowrap font-medium text-brand-700 dark:text-brand-300"${A.estimated?` title="${s(i("table.unitPrice.estimated"))}"`:""}>${s(A.text)}</span>`:'<span class="text-slate-400">\u2014</span>',L=ae(o.lastVerifiedAt),et=L.state==="fresh"?`<span class="text-xs font-medium text-emerald-600 dark:text-emerald-400" title="${s(i("verified.freshTitle",{date:L.date}))}">${s(L.days===0?i("verified.tableToday"):i("verified.tableDaysAgo",{n:L.days}))}</span>`:L.state==="stale"?`<span class="text-xs font-medium text-amber-600 dark:text-amber-400" title="${s(i("verified.staleTitle",{date:L.date}))}">${s(i("verified.stale"))}</span>`:`<span class="text-xs text-slate-400">${s(i("table.verified.pending"))}</span>`,me=R(o.url),ye=V(o,me),tt=me?`<a href="${s(ye.href)}" target="_blank" rel="${ye.rel}" ${j(o)} class="text-sm font-medium text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">${s(i("table.source.site"))}</a>`:'<span class="text-slate-400">\u2014</span>',rt=o.domesticPayment?`<span class="rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">${s(i("common.supported"))}</span>`:`<span class="text-slate-400">${s(i("common.notSupported"))}</span>`,nt=o.intlNetwork?`<span class="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">${s(i("common.required"))}</span>`:`<span class="text-slate-400">${s(i("common.notSupported"))}</span>`,at=kt(o,t),st=p?`<tr class="plan-detail-row">
          <td colspan="15" class="plan-inline-detail-cell">
            ${se(o,t)}
          </td>
        </tr>`:"",be=bt(o,t),ve=s(o.name),it=ne(o)?` <span class="plan-intl-tag" title="${s(i("badge.intl.title"))}">${s(String(o.monthlyCurrency||"USD").toUpperCase())}</span>`:"",lt=(be?`<a href="${s(be)}" class="font-medium text-brand-700 hover:text-brand-900 hover:underline dark:text-brand-300 dark:hover:text-brand-200">${ve}</a>`:ve)+it,ge=`${q(e.iconUrl,e.label,"brand-icon brand-icon--table")}<span>${s(e.label)}</span>`,ot=e.brandHref?`<a href="${s(e.brandHref)}" class="plan-provider-cell plan-provider-cell--link">${ge}</a>`:`<div class="plan-provider-cell">${ge}</div>`;return`
      <tr class="plan-select-row${p?" is-selected":""}" data-plan-key="${s(d)}" tabindex="0" aria-selected="${p?"true":"false"}">
        <td class="px-3 py-3 font-medium text-slate-900 dark:text-white">${ot}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${lt}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${b}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${y}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${m}</td>
        <td class="plan-table-nowrap px-3 py-3">${x}</td>
        <td class="break-words px-3 py-3">${h}</td>
        <td class="plan-table-nowrap px-3 py-3">${Z}</td>
        <td class="break-words px-3 py-3 text-slate-600 dark:text-slate-300">${s(H(o)||"\u2014")}</td>
        <td class="plan-table-nowrap px-3 py-3"><span class="rounded-md px-2 py-0.5 text-xs font-medium ${c}">${Ke(o)}</span></td>
        <td class="plan-table-nowrap px-3 py-3">${rt}</td>
        <td class="plan-table-nowrap px-3 py-3">${nt}</td>
        <td class="plan-table-nowrap px-3 py-3">${at}</td>
        <td class="plan-table-nowrap px-3 py-3">${et}</td>
        <td class="plan-table-nowrap px-3 py-3">${tt}</td>
      </tr>
      ${st}`}).join(""):""}function At(e,r,n,t,a,l){let o=r.length?Ve(r,t).map(d=>{if(d.plans.length===1)return je(d,n,!0,t);let p=!l&&d.plans.length>z,c=l||!p||a.has(d.provider),f=_t(d),b=`${q(d.iconUrl,d.label,"brand-icon brand-icon--section")}
              <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${s(d.label)}</span>`,y=`
              ${d.brandHref?`<a href="${s(d.brandHref)}" class="plan-table-group-brand">${b}</a>`:b}
              <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${d.plans.length}</span>
              <span class="plan-table-group-right">
                ${f}
                ${p?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
              </span>`;return`
        <tr class="border-y border-slate-200 dark:border-slate-700">
          <td colspan="15" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
            ${p?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-plan-group-toggle="${s(d.provider)}" aria-expanded="${c?"true":"false"}" aria-label="${c?i("group.collapse"):i("group.expand")} ${s(d.label)}">${y}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${y}</div>`}
          </td>
        </tr>
        ${je(d,n,c,t)}`}).join(""):`<tr>
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
          <col style="width: 7%">
          <col style="width: 7%">
          <col style="width: 7%">
          <col style="width: 7%">
          <col style="width: 4%">
          <col style="width: 7%">
          <col style="width: 7%">
          <col style="width: 7%">
          <col style="width: 7%">
          <col style="width: 4%">
        </colgroup>
        <thead>
          <tr>
            ${oe.map(d=>Be(d,e)).join("")}
          </tr>
        </thead>
        <tbody>
          ${o}
        </tbody>
      </table>
    </div>`}function xr(e,r="",n={},t=new Set,a=!1){if(!e.length)return`<p class="text-sm text-slate-500 dark:text-slate-400">${s(i("table.empty.none"))}</p>`;let l=ke(e,n,$);if(!l.length)return`<p class="text-sm text-slate-500 dark:text-slate-400">${s(i("table.empty.none"))}</p>`;De(n);let o=Re(l),d=a||G()||Fe();return`
    <div>
      ${Ie(o,l)}
      ${He(o,l)}
      <div class="plan-view-cards">
        ${Pt(o,r,n,t,d)}
      </div>
      <div class="plan-view-table">
        ${At(l,o,r,n,t,d)}
      </div>
    </div>`}var Qe=7.2,de=[{id:"light",labelKey:"advisor.usage.light",value:500},{id:"medium",labelKey:"advisor.usage.medium",value:3e3},{id:"heavy",labelKey:"advisor.usage.heavy",value:1e4},{id:"extreme",labelKey:"advisor.usage.extreme",value:3e4}],St={Anthropic:"Claude",Claude:"Claude",ChatGPT:"GPT",ChartGPT:"GPT",Google:"Gemini","Google Antigravity":"Gemini",Grok:"Grok","Z.ai":"GLM",BytePlus:"Doubao",\u963F\u91CC\u4E91:"Qwen",StepFun:"Step",\u9636\u8DC3\u661F\u8FB0:"Step",Cursor:"Cursor",Qoder:"Qoder",Trae:"Trae",OpenCode:"OpenCode"},Ge=8;function ue(e){let r=String(e||"").trim();if(!r||/未指定|无明确|未公开|不适用|待更新|待确认|pending|unspecified|not specified|n\/a|tbd|unknown|see official/i.test(r))return null;let n=r.replace(/,/g,"").match(/(\d+(?:\.\d+)?)\s*(万)?/);if(!n)return null;let t=parseFloat(n[1])*(n[2]==="\u4E07"?1e4:1);return Number.isFinite(t)&&t>0?t:null}function Lt(e){let r=ue(e.monthlyRequests);if(r!=null)return{value:r,estimated:/约|估算|approx|estimat/i.test(e.monthlyRequests),basis:"monthly"};let n=ue(e.weeklyRequests);if(n!=null)return{value:Math.round(n*4.3),estimated:!0,basis:"weekly"};let t=ue(e.fiveHoursRequests);return t!=null?{value:t*30,estimated:!0,basis:"fiveHours"}:null}function Tt(e){let r=[{value:e.monthlyPriceValue,cycle:"monthly"},{value:e.quarterlyMonthlyPriceValue,cycle:"quarterly"},{value:e.annualMonthlyPriceValue,cycle:"annual"}].filter(a=>Number.isFinite(a.value)&&a.value>=0);if(!r.length)return null;let n=r.reduce((a,l)=>l.value<a.value?l:a),t=e.monthlyCurrency==="CNY";return{value:n.value,cycle:n.cycle,currency:e.monthlyCurrency||"USD",usd:t?n.value/Qe:n.value}}function Ct(e){return St[e.provider]||e.provider||"Other"}function Mt(e,r){let n=new Map;for(let l of e)l.id&&n.set(l.id,Ct(l));let t=new Map;for(let l of r){let o=new Set((l.modelIds||[]).map(d=>n.get(d)).filter(Boolean));for(let d of o)t.set(d,(t.get(d)||0)+1)}return{options:[...t.entries()].map(([l,o])=>({family:l,count:o})).sort((l,o)=>o.count-l.count||l.family.localeCompare(o.family,"en")),familyByModelId:n}}function Ut(e,r){return new Set((e.modelIds||[]).map(n=>r.get(n)).filter(Boolean))}function Dt(e,r,n){let{families:t,usage:a,budget:l}=r,o=[],d=0;for(let p of e){if(p.planType==="api_package"){d+=1;continue}let c=Tt(p);if(l!=null&&c&&c.usd>l)continue;let f=!1;if(t.size){let v=Ut(p,n);if(!v.size)f=!0;else if(![...v].some(h=>t.has(h)))continue}let b=Lt(p),y=b&&c&&b.value>0?c.usd/b.value*1e3:null,m;f?m=4:b?b.value>=a?m=1:m=2:m=3,o.push({plan:p,price:c,quota:b,costPer1k:y,tier:m})}return o.sort((p,c)=>{if(p.tier!==c.tier)return p.tier-c.tier;if((p.tier===1||p.tier===2)&&p.costPer1k!==c.costPer1k)return(p.costPer1k??1/0)-(c.costPer1k??1/0);let f=p.price?p.price.usd:1/0,b=c.price?c.price.usd:1/0;return f-b}),{results:o,paygoCount:d}}function ze(e){return Math.round(e).toLocaleString(k())}function Ye(e,r="USD"){return`${r==="CNY"?"\xA5":"$"}${e.toLocaleString(k(),{maximumFractionDigits:e<10?2:0})}`}function Nt(e,r){let{plan:n,price:t,quota:a,costPer1k:l,tier:o}=e,d=T(n.provider,r,$),p=[];if(o===1?p.push(`<span class="plan-advisor-chip plan-advisor-chip--good">${s(i("advisor.chip.enough"))}</span>`):o===2?p.push(`<span class="plan-advisor-chip plan-advisor-chip--warn">${s(i("advisor.chip.short"))}</span>`):o===3?p.push(`<span class="plan-advisor-chip plan-advisor-chip--muted">${s(i("advisor.chip.unknown"))}</span>`):p.push(`<span class="plan-advisor-chip plan-advisor-chip--muted">${s(i("advisor.chip.unlabeled"))}</span>`),a){let m=a.estimated?`\uFF08${s(i("advisor.chip.estimated",{basis:i(`advisor.basis.${a.basis}`)}))}\uFF09`:"";p.push(`<span class="plan-advisor-chip">${s(i("advisor.chip.monthlyQuota",{n:ze(a.value)}))}${m}</span>`)}if(l!=null&&p.push(`<span class="plan-advisor-chip">${s(i("advisor.chip.per1k",{price:Ye(l)}))}</span>`),n.supportedModelNames?.length){let m=n.supportedModelNames.slice(0,3).join(" / "),v=n.supportedModelNames.length>3?" \u2026":"";p.push(`<span class="plan-advisor-chip">${s(i("advisor.chip.supports",{models:m+v}))}</span>`)}let c=`<span class="plan-advisor-price-muted">${s(i("advisor.price.official"))}</span>`;if(t){let m=t.cycle!=="monthly"?`<span class="plan-advisor-cycle">${s(i(`advisor.cycle.${t.cycle}`))}</span>`:"",v=t.currency==="CNY"?`<span class="plan-advisor-price-note">${s(i("advisor.price.cnyNote",{n:ze(t.usd),rate:Qe}))}</span>`:"";c=`<span class="plan-advisor-price">${Ye(t.value,t.currency)}/${s(i("common.perMonth"))}</span>${m}${v}`}let f=R(n.url),b=f?V(n,f):null,y=b?`<a href="${s(b.href)}" target="_blank" rel="${b.rel}" ${j(n)} class="plan-advisor-link">${s(i("advisor.link"))}</a>`:"";return`
    <li class="plan-advisor-result">
      <div class="plan-advisor-result-head">
        ${q(n.providerIconUrl,d,"brand-icon plan-advisor-result-icon")}
        <div class="plan-advisor-result-name">
          <strong>${s(n.name)}</strong>
          <span>${s(d)}</span>
        </div>
        <div class="plan-advisor-result-price">${c}</div>
      </div>
      <div class="plan-advisor-result-chips">${p.join("")}</div>
      ${y}
    </li>
  `}function Et(e,r){let n=de.some(t=>t.value===r.usage)?"":r.usage;return`
    <div class="plan-advisor-form">
      <div class="plan-advisor-field">
        <span class="plan-advisor-label">${s(i("advisor.family.label"))}<small>${s(i("advisor.family.hint"))}</small></span>
        <div class="plan-advisor-options" data-advisor-families>
          ${e.map(t=>{let a=r.families.has(t.family);return`
              <button type="button" class="plan-advisor-option${a?" is-active":""}" data-family="${s(t.family)}" aria-pressed="${a}">
                ${s(t.family)}<span class="plan-advisor-option-count">${t.count}</span>
              </button>
            `}).join("")}
        </div>
      </div>
      <div class="plan-advisor-field">
        <span class="plan-advisor-label">${s(i("advisor.usage.label"))}</span>
        <div class="plan-advisor-options" data-advisor-usage>
          ${de.map(t=>{let a=t.value===r.usage;return`
              <button type="button" class="plan-advisor-option${a?" is-active":""}" data-usage="${t.value}" aria-pressed="${a}">
                ${s(i(t.labelKey))}
              </button>
            `}).join("")}
          <input type="number" min="1" class="plan-advisor-input" data-advisor-usage-custom placeholder="${s(i("advisor.usage.custom"))}" aria-label="${s(i("advisor.usage.custom"))}" value="${n}">
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
  `}function qt({root:e,plans:r,providerInfo:n={},modelCatalog:t=[],initialState:a={},onStateChange:l=null}){let{options:o,familyByModelId:d}=Mt(t,r),p=new Set(o.map(y=>y.family)),c={families:new Set([...a.families||[]].filter(y=>p.has(y))),usage:Number.isFinite(a.usage)&&a.usage>0?a.usage:de[1].value,budget:Number.isFinite(a.budget)&&a.budget>0?a.budget:null,showAll:!1};e.innerHTML=Et(o,c);let f=()=>{let y=e.querySelector("[data-advisor-results]"),{results:m,paygoCount:v}=Dt(r,c,d);if(!m.length){y.innerHTML=`
        <p class="plan-advisor-empty">${s(i("advisor.empty"))}</p>
        ${v?`<p class="plan-advisor-paygo">${s(i("advisor.paygo",{n:v}))}</p>`:""}
      `;return}let h=c.showAll?m:m.slice(0,Ge);y.innerHTML=`
      <p class="plan-advisor-summary">${s(i("advisor.summary",{n:m.length}))}</p>
      <ol class="plan-advisor-list">
        ${h.map(x=>Nt(x,n)).join("")}
      </ol>
      ${m.length>Ge&&!c.showAll?`<button type="button" class="plan-advisor-more" data-advisor-more>${s(i("advisor.expand",{n:m.length}))}</button>`:""}
      ${v?`<p class="plan-advisor-paygo">${s(i("advisor.paygo",{n:v}))}</p>`:""}
    `},b=()=>{l?.(c)};return e.addEventListener("click",y=>{let m=y.target.closest("[data-family]");if(m){let h=m.dataset.family;c.families.has(h)?c.families.delete(h):c.families.add(h);let x=c.families.has(h);m.classList.toggle("is-active",x),m.setAttribute("aria-pressed",String(x)),c.showAll=!1,f(),b();return}let v=y.target.closest("[data-usage]");if(v){c.usage=Number(v.dataset.usage),e.querySelectorAll("[data-usage]").forEach(x=>{let A=x===v;x.classList.toggle("is-active",A),x.setAttribute("aria-pressed",String(A))});let h=e.querySelector("[data-advisor-usage-custom]");h&&(h.value=""),c.showAll=!1,f(),b();return}y.target.closest("[data-advisor-more]")&&(c.showAll=!0,f())}),e.querySelector("[data-advisor-usage-custom]")?.addEventListener("input",y=>{let m=Number(y.target.value);Number.isFinite(m)&&m>0&&(c.usage=m,e.querySelectorAll("[data-usage]").forEach(v=>{v.classList.remove("is-active"),v.setAttribute("aria-pressed","false")})),c.showAll=!1,f(),b()}),e.querySelector("[data-advisor-budget]")?.addEventListener("input",y=>{let m=Number(y.target.value);c.budget=Number.isFinite(m)&&m>0?m:null,c.showAll=!1,f(),b()}),f(),{state:c,refresh:f}}function Lr({plans:e,providerInfo:r={},modelCatalog:n=[],fab:t}){if(!t)return null;let a=null,l=null,o=null,d=()=>{a&&(a.hidden=!0,document.body.style.overflow="",o?.focus?.())},p=()=>{a||(a=document.createElement("div"),a.className="plan-advisor-overlay",a.hidden=!0,a.innerHTML=Ft(),document.body.appendChild(a),l=qt({root:a.querySelector(".plan-advisor-body"),plans:e,providerInfo:r,modelCatalog:n}),a.addEventListener("click",f=>{f.target.closest("[data-advisor-close]")&&d()}),document.addEventListener("keydown",f=>{f.key==="Escape"&&a&&!a.hidden&&d()}))},c=()=>{p(),o=document.activeElement,a.hidden=!1,document.body.style.overflow="hidden",l.refresh(),a.querySelector(".plan-advisor-dialog")?.focus()};return t.addEventListener("click",c),{open:c,close:d}}var Nr=[{id:"low-cost",label:i("scenario.lowCost")},{id:"long-context",label:i("scenario.longContext")},{id:"multimodal",label:i("scenario.multimodal")},{id:"enterprise-api",label:i("scenario.enterpriseApi")},{id:"personal-use",label:i("scenario.personalUse")}];async function Rt(){let e=Te(),r=e?"backend":"static",n=await We(Ce()),t=e&&U()==="en"?await We("/data.json"):null;return{...It(Ht(n,t),r),dataUnavailable:!n}}async function Er(){let e=await Rt(),r=e.models.flatMap(a=>Gt(a,e.providerInfo)),n=e.modelCatalog||[],t=new Map(n.map(a=>[a.id,a.name]));for(let a of r)a.supportedModelNames=(a.modelIds||[]).map(l=>t.get(l)).filter(Boolean);return{...e,plans:r,providerInfo:e.providerInfo||{},modelCatalog:n}}function It(e,r){if(e&&Array.isArray(e.models)){let n=e.models.map(t=>Ot(t,r));if(n.length)return{source:r,lastUpdated:e.last_updated||rr(n.map(t=>t.updatedAt)),models:n,rawModels:e.models,providerInfo:e.provider_info||{},modelCatalog:Bt(e.model_catalog)}}return{source:r,lastUpdated:e?.last_updated||"unknown",models:[],rawModels:[],providerInfo:e?.provider_info||{},modelCatalog:[]}}function Bt(e){return Array.isArray(e)?e.map(r=>({id:u(r.id),name:u(g(r.name,r.name_en),r.id||""),provider:u(r.provider,""),providerIconUrl:u(r.provider_icon_url,""),logoUrl:u(r.logo_url,""),sortOrder:P(r.sort_order),marketRegion:u(r.market_region,"")})).filter(r=>r.id):[]}async function We(e){try{let r=await fetch(e,{headers:{Accept:"application/json"}});return r.ok?await r.json():null}catch{return null}}function Ht(e,r){if(!e||!Array.isArray(e.models)||!r||!Array.isArray(r.models))return e;let n=new Map(r.models.map(a=>[Y(a),a]).filter(([a])=>a)),t=e.models.map(a=>{let l=n.get(Y(a));return l?W(a,l):a});return{...e,models:t,provider_info:jt(e.provider_info,r.provider_info)}}function jt(e={},r={}){let n=new Set([...Object.keys(r||{}),...Object.keys(e||{})]),t={};for(let a of n)t[a]=W(e?.[a]||{},r?.[a]||{});return t}function W(e,r){if(!e||typeof e!="object"||Array.isArray(e)||!r||typeof r!="object"||Array.isArray(r))return e;let n={...e};for(let[t,a]of Object.entries(r)){let l=e[t];t==="package_plans"&&Array.isArray(l)&&Array.isArray(a)?n[t]=Vt(l,a):l&&typeof l=="object"&&!Array.isArray(l)&&a&&typeof a=="object"&&!Array.isArray(a)?n[t]=W(l,a):typeof l=="string"||typeof a=="string"?n[t]=Kt(l,a):l==null&&(n[t]=a)}return n}function Vt(e,r){let n=new Map(r.map(t=>[Y(t),t]).filter(([t])=>t));return e.map(t=>{let a=n.get(Y(t));return a?W(t,a):t})}function Kt(e,r){let n=String(r??"").trim();if(!n)return e;let t=String(e??"").trim();return t?Je(t)&&!Je(n)?r:e:r}function Je(e){return/[\u3400-\u9fff]/.test(String(e||""))}function Y(e){return String(e?.id||e?.model_id||e?.plan_id||e?.planId||"").trim()}function Ot(e,r){let n=Array.isArray(e.capabilities)?e.capabilities:[],t=P(e.input_price),a=P(e.context_length),l=J(g(e.plan_summary,e.plan_summary_en),g(e.access_notes,e.access_notes_en),g(e.notes,e.notes_en)),o=Qt(e,t,a,n);return{id:u(e.id),vendor:u(e.provider,"Pending"),providerIconUrl:u(e.provider_icon_url,e.icon_url||""),logoUrl:u(e.logo_url,""),modelName:u(g(e.name,e.name_en),"Pending"),inputPrice:Xe(e.input_price,e.currency),outputPrice:Xe(e.output_price,e.currency),contextLength:tr(e.context_length),multimodal:n.includes("vision")?"Supported":"TBD",apiSupport:"Supported",rmbRecharge:u(g(e.rmb_recharge_support,e.rmb_recharge_support_en),"See official site"),invoice:u(g(e.invoice_support,e.invoice_support_en),"See official site"),rmbRechargeRaw:e.rmb_recharge_support??null,invoiceRaw:e.invoice_support??null,accessLevel:u(e.access_level,""),marketRegion:u(e.market_region,""),marketRegionLabel:u(e.market_region_label,""),scenarios:o,suitableFor:u(g(e.suitable_for,e.suitable_for_en),l||"See official site"),updatedAt:u(e.last_updated,e.release_date||"Pending"),sourceUrl:u(e.docs_url,e.plan_url||""),packagePlans:Array.isArray(e.package_plans)?e.package_plans:[],source:r,raw:e}}function Gt(e,r={}){return(e.packagePlans||[]).filter(t=>t.status!=="discontinued").map(t=>{let a=P(t.monthly_price),l=P(t.quarterly_price),o=P(t.annual_price),d=Zt(t,e),p=u(t.provider,e.vendor),c=r[p]||{},f=zt(p,r),b=Yt(p,r);return{id:u(t.id,`${e.id}-plan`),planId:u(t.planId,t.plan_id||""),brand:u(t.brand,t.brand_slug||""),name:u(g(t.name,t.name_en),"Pending plan"),provider:p,providerIconUrl:u(t.provider_icon_url,t.icon_url,e.providerIconUrl),modelName:e.modelName,modelId:u(t.model_id,e.id),modelIds:Array.isArray(t.model_ids)?t.model_ids.map(y=>String(y||"").trim()).filter(Boolean):[],status:u(t.status,"unknown"),statusLabel:(()=>{if(t.status){let y=i(`status.${t.status}`);if(!y.startsWith("status."))return y}return u(t.status_label,i("status.pending"))})(),url:er(t.url_cn,t.url_en),monthlyPrice:pe(t.monthly_price,d),monthlyPriceValue:a,monthlyCurrency:d,monthlyCurrencyLabel:d==="USD"?i("currency.usd"):i("currency.cny"),quarterlyPrice:l!=null?fe(t.quarterly_price,d,i("common.perQuarter")):"",quarterlyPriceValue:l,quarterlyMonthlyPrice:l!=null?pe(l/3,d):"",quarterlyMonthlyPriceValue:l!=null?l/3:null,annualPrice:o!=null?fe(t.annual_price,d,i("common.perYear")):"",annualPriceValue:o,annualMonthlyPrice:o!=null?pe(o/12,d):"",annualMonthlyPriceValue:o!=null?o/12:null,includedCalls:u(g(t.included_calls,t.included_calls_en),""),notes:u(g(t.notes,t.notes_en),""),planType:u(t.plan_type,Ze(t,e)),category:Ze(t,e),rmbRecharge:e.rmbRecharge,invoice:e.invoice,rmbRechargeRaw:e.rmbRechargeRaw,invoiceRaw:e.invoiceRaw,accessLevel:e.accessLevel,marketRegion:e.marketRegion,marketRegionLabel:e.marketRegionLabel,firstMonthPrice:t.first_month_price!=null?t.first_month_price:null,fiveHoursRequests:u(g(t.five_hours_requests,t.five_hours_requests_en),""),weeklyRequests:u(g(t.weekly_requests,t.weekly_requests_en),""),monthlyRequests:u(g(t.monthly_requests,t.monthly_requests_en),""),measuredFiveHoursTokens:u(t.measured_five_hours_tokens,""),measuredWeeklyTokens:u(t.measured_weekly_tokens,""),measuredMonthlyTokens:u(t.measured_monthly_tokens,""),tokenLimit:u(t.token_limit,""),supportedModels:u(g(t.supported_models,t.supported_models_en),g(c.supported_models,c.supported_models_en)||""),benefits:u(g(t.benefits,t.benefits_en),""),rating:u(t.rating,""),tags:u(g(t.tags,t.tags_en),""),sourceUrl:u(t.source_url,""),lastVerifiedAt:u(t.last_verified_at,""),refundPolicy:u(g(t.refund_policy,t.refund_policy_en),""),billingCycle:u(t.billing_cycle,""),creditsLimit:u(g(t.credits_limit,t.credits_limit_en),""),concurrencyLimit:u(t.concurrency_limit,""),resetRule:u(g(t.reset_rule,t.reset_rule_en),""),limitType:u(t.limit_type,Wt(t)),dataStatus:u(t.data_status,Jt(t)),confidenceScore:t.confidence_score!=null?t.confidence_score:null,sourceType:u(t.source_type,""),toolCompatibility:S(t.tool_compatibility_json,{}),modelMultiplier:S(t.model_multiplier_json,{}),derivedMetrics:S(t.derived_metrics_json,{}),measuredMetrics:S(t.measured_metrics_json,{}),risk:S(t.risk_json,{}),recommendation:S(t.recommendation_json,{}),changeSummary:S(t.change_summary_json,{}),linkType:u(t.link_type,"official"),hasAffiliate:t.has_affiliate===!0,domesticPayment:f??Q(t.domestic_payment),intlNetwork:b??Q(t.intl_network),hasFirstMonthDiscount:t.has_first_month_discount===!0||t.has_first_month_discount===1,recommendationText:u(g(t.recommendation_text,t.recommendation_text_en),""),riskText:u(g(t.risk_text,t.risk_text_en),""),sortOrder:P(t.sort_order),privacyOverride:S(t.privacy_override_json,{}),raw:t}})}function zt(e,r={}){let n=u(e);if(!n)return null;let t=r[n];return!t||t.domestic_payment==null?null:Q(t.domestic_payment)}function Yt(e,r={}){let n=u(e);if(!n)return null;let t=r[n];return!t||t.intl_network==null?null:Q(t.intl_network)}function Qt(e,r,n,t){let a=J(e.name,e.provider,e.notes,e.plan_summary,e.access_notes).toLowerCase(),l=new Set(["enterprise-api"]);return r!=null&&r<=2&&l.add("low-cost"),n!=null&&n>=2e5&&l.add("long-context"),t.includes("vision")&&l.add("multimodal"),/个人|会员|订阅|聊天|kimi|豆包/.test(a)&&l.add("personal-use"),Array.from(l)}function S(e,r){if(!e||typeof e!="string")return e||r;try{return JSON.parse(e)}catch{return r}}function Wt(e){return e.five_hours_requests?"five_hours":e.weekly_requests?"weekly":e.monthly_requests?"monthly":e.token_limit?"token":e.credits_limit?"credits":"undisclosed"}function Jt(e){return e.last_verified_at?"verified":e.measured_monthly_tokens||e.measured_weekly_tokens?"measured":"pending"}function Ze(e,r){let n=J(e.name,e.provider,e.notes,r.vendor,r.modelName).toLowerCase();return/聚合|路由|硅基|siliconflow/.test(n)?"aggregated_router":/会员|订阅|chat|清言|kimi|豆包/.test(n)?"personal_subscription":/maas|百炼|千帆|腾讯云|火山方舟|企业/.test(n)?"enterprise_maas":/开源|部署|私有化/.test(n)?"open_source_deploy":(/coding|qoder|claude code|cursor|trae/.test(n),"coding_plan")}function Zt(e,r){let n=u(e.monthly_currency).toUpperCase();if(n==="USD")return"USD";let t=u(r.market_region).toLowerCase(),a=t==="international"||t==="domestic_international";if(n==="CNY"&&a)return"USD";let l=u(e.provider,r.vendor),o=l.toLowerCase();if(o==="qoder"||o==="qoder cn"||o==="byteplus"||o==="z.ai"||o==="grok"||o==="claude"||o==="chartgpt"||o==="google antigravity"||o==="opencode"||o==="anthropic"||o==="openai"||a)return"USD";let d=J(e.name,l,e.url_cn,e.url_en,e.included_calls,e.notes).toLowerCase();return/\$|usd|美元|trae\.ai/.test(d)?"USD":"CNY"}function u(...e){let r=e.find(n=>n!=null&&String(n).trim());return r==null?"":String(r).trim()}function Q(e){if(e===!0||e===1)return!0;let r=String(e??"").trim().toLowerCase();return r==="true"||r==="1"||r==="yes"}function Xt(e){if(!e)return!1;let r=String(e).trim();return!r||/[\u4e00-\u9fff]/.test(r)?!1:(r.match(/[a-zA-Z]/g)||[]).length/r.length>.6}function g(e,r){return U()==="en"&&r!=null&&String(r).trim()||U()==="zh"&&Xt(e)&&r!=null&&String(r).trim()&&String(r).trim()!==String(e).trim()?r:e}function er(e,r){return U()==="zh"?u(e,r):u(r,e)}function P(e){if(e==null||e==="")return null;let r=Number(e);return Number.isFinite(r)?r:null}function Xe(e,r){let n=P(e);return n==null?u(e,i("common.pending")):`${r==="USD"?"$":"\xA5"}${n.toLocaleString(k(),{maximumFractionDigits:4})}/${i("common.perMillionTokens")}`}function pe(e,r="CNY"){return fe(e,r,i("common.perMonth"))}function fe(e,r="CNY",n=i("common.perMonth")){let t=P(e);return t==null?i("common.official"):`${r==="USD"?"$":"\xA5"}${t.toLocaleString(k(),{maximumFractionDigits:2})}/${n}`}function tr(e){let r=P(e);return r==null?u(e,i("common.official")):r>=1e6?`${(r/1e6).toLocaleString(k(),{maximumFractionDigits:1})}M tokens`:r>=1e3?`${(r/1e3).toLocaleString(k(),{maximumFractionDigits:0})}K tokens`:`${r.toLocaleString(k())} tokens`}function J(...e){return e.filter(r=>r!=null&&String(r).trim()).join(" ")}function rr(e){return e.find(r=>r&&r!=="Pending")||"Pending"}export{Fe as a,ur as b,ft as c,Re as d,dr as e,q as f,xr as g,qt as h,Lr as i,Er as j};
