import{a as Ue,b as De}from"./chunk.7HYUNLOO.js";import{A as Te,B as Me,C as ie,a as x,b as ke,c as _e,d as we,e as D,f as ee,g as B,h as C,i as te,j as Pe,k as re,l as ne,m as H,n as j,p as Ae,q as Se,r as Le,s as M,t as ae,u as se,v as N,w as E,x as Ce,y as K,z as V}from"./chunk.BSJXUUFA.js";import{a as w,c as _,e as R,f as $e,g as i,j as s,k as I}from"./chunk.WG6SYHMS.js";var dt=new Set(["\u5F85\u66F4\u65B0","\u5F85\u786E\u8BA4","\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"]);function O(e){let r=String(e??"").trim();return r&&!dt.has(r)?r:"\u2014"}function F(e="",r=""){let n=String(r??"").trim();return{column:n?String(e??"").trim():"",value:n}}function le(e){return!!(e?.column&&e?.value)}function Ne(e,r,n){return le(r)?e.filter(t=>n(t,r.column)===r.value):e}var oe={};function Ee(e){oe=e||{}}function pt(e){let r=B(e,oe,x);return r.training?i(`privacy.training.${r.training}`)||r.training:i("privacy.filter.notResearched")}var Fe={token:"billing.token",credits:"billing.credits",five_hours:"billing.requests",weekly:"billing.requests",monthly:"billing.requests"};function ce(e){let r=Fe[e.limitType];return r?i(r):i("billing.undisclosed")}function qe(e){return!!Fe[e.limitType]}var ue=[{key:"provider",labelKey:"table.col.provider",value:e=>C(e.provider,oe,x)||"\u2014"},{key:"name",labelKey:"table.col.name",value:e=>H(e.name)||"\u2014"},{key:"monthlyPrice",labelKey:"table.col.monthly",value:e=>O(e.monthlyPrice)},{key:"quarterlyPrice",labelKey:"table.col.quarterly",value:e=>O(e.quarterlyPrice)},{key:"annualPrice",labelKey:"table.col.annual",value:e=>O(e.annualPrice)},{key:"billingUnit",labelKey:"table.col.billingUnit",value:e=>ce(e)},{key:"quota",labelKey:"table.col.quota",value:e=>N(e)?.text||"\u2014"},{key:"unitPrice",labelKey:"table.col.unitPrice",value:e=>E(e)?.text||"\u2014"},{key:"model",labelKey:"table.col.model",value:e=>j(e)||"\u2014"},{key:"status",labelKey:"table.col.status",value:e=>H(e.statusLabel)||"\u2014"},{key:"domesticPayment",labelKey:"table.col.domesticPayment",value:e=>e.domesticPayment?i("common.supported"):"\u2014"},{key:"intlNetwork",labelKey:"table.col.intlNetwork",value:e=>e.intlNetwork?i("common.required"):"\u2014"},{key:"dataTraining",labelKey:"table.col.dataTraining",value:e=>pt(e)},{key:"verifiedAt",labelKey:"table.col.verified",value:e=>H(e.lastVerifiedAt)||i("table.verified.pending")},{key:"source",labelKey:"table.col.source",value:e=>e.url?i("table.source.name"):"\u2014"}],P=F(),U=!1,ft=new Intl.Collator(_(),{numeric:!0,sensitivity:"base"});function mt(e){return e.status==="available"||e.status==="rush_sale"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"}function Re(){return U}function pr(){U=!U}function de(e){return ue.find(r=>r.key===e)}function Ie(e,r){let n=de(r);return n?String(n.value(e)||"").trim()||"\u2014":""}function yt(){P=F(),U=!1}function z(){return le(P)&&!!de(P.column)}function Be(e){let r=e;return U&&(r=r.filter(mt)),z()&&(r=Ne(r,P,Ie)),r}function He(e,r){return U?`
    <div class="plan-table-quick-filters">
      <span class="plan-table-filter-count">${s(i("table.quick.availableOnly"))}${w()==="en"?": ":"\uFF1A"}${e.length} / ${r.length}</span>
    </div>
  `:""}function bt(e,r){let n=new Map;for(let t of e){let a=Ie(t,r.key);n.set(a,(n.get(a)||0)+1)}return Array.from(n.entries()).map(([t,a])=>({value:t,count:a})).sort((t,a)=>t.value==="\u2014"&&a.value!=="\u2014"?1:a.value==="\u2014"&&t.value!=="\u2014"?-1:ft.compare(t.value,a.value))}function je(e,r){let n=P.column===e.key&&!!P.value,t=bt(r,e);return`
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
          <button type="button" class="plan-column-filter-option${n&&a.value===P.value?" is-active":""}" data-plan-filter-value="${s(a.value)}">
            <span class="plan-column-filter-option-label">${s(a.value)}</span>
            <span class="plan-column-filter-option-count">${a.count}</span>
          </button>
        `).join("")}
      </div>
    </th>
  `}function Ke(e,r){if(!z())return"";let n=de(P.column);return`
    <div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${s(i(n.labelKey))}</span>
        <strong>${s(P.value)}</strong>
      </span>
      <span class="plan-table-filter-count">${e.length} / ${r.length} ${s(i("table.filter.count"))}</span>
      <button type="button" class="plan-table-filter-clear" data-plan-filter-clear>${s(i("table.filter.clear"))}</button>
    </div>
  `}function G(e){e&&(e.querySelectorAll(".plan-column-filter-menu").forEach(r=>{r.hidden=!0}),e.querySelectorAll("[data-plan-filter-column]").forEach(r=>{r.setAttribute("aria-expanded","false")}))}function fr(e,r,n,t){e.addEventListener("click",a=>{let o=a.target.closest("[data-plan-filter-column]");if(o&&e.contains(o)){let u=o.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!u)return;let m=!u.hidden;G(e),m||(u.hidden=!1,o.setAttribute("aria-expanded","true"));return}let l=a.target.closest("[data-plan-filter-value]");if(l&&e.contains(l)){let u=l.closest("[data-plan-filter-menu]"),m=l.dataset.planFilterValue||"";P=u&&m?F(u.dataset.planFilterMenu,m):F(),n();return}let d=a.target.closest("[data-plan-filter-clear]");if(d&&e.contains(d)){yt(),n();return}let p=a.target.closest("[data-plan-key]");if(p&&e.contains(p)&&!a.target.closest("a")){let u=p.dataset.planKey||"";ne(r(),u)&&t(u);return}a.target.closest(".plan-column-filter")||G(e)}),e.addEventListener("keydown",a=>{let o=a.target.closest("[data-plan-key]");if(!o||!e.contains(o)||a.target.closest("a")||a.key!=="Enter"&&a.key!==" ")return;a.preventDefault();let l=o.dataset.planKey||"";ne(r(),l)&&t(l)}),document.addEventListener("click",a=>{e.contains(a.target)||G(e)}),document.addEventListener("keydown",a=>{a.key==="Escape"&&G(e)})}var Y=2;function vt(e){let r=se(e.lastVerifiedAt);if(r.state==="fresh"){let n=r.days===0?i("verified.freshToday"):i("verified.freshDaysAgo",{n:r.days});return`<span class="whitespace-nowrap rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300" title="${s(i("verified.freshTitle",{date:r.date}))}">${s(n)}</span>`}return r.state==="stale"?`<span class="whitespace-nowrap rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:bg-amber-950/40 dark:text-amber-300" title="${s(i("verified.staleTitle",{date:r.date}))}">${s(i("verified.stale"))}</span>`:""}function gt(e,r){let n=_e(e.provider,r,x),t=we(e,n);return t?`/plans/${encodeURIComponent(t)}/`:""}function ht(e,r){let n=ee(e,r,x),t=String(n.seo_slug||"").trim(),a=String(n.seo_intro||"").trim(),o=String(n.icon_url||"").trim();return t&&a&&o?`/brands/${encodeURIComponent(t)}/`:""}function xt(e,r={}){let n=ee(e.provider,r,x);return D(n.icon_url)||D(e.providerIconUrl)||D(ke(e.provider)?.iconUrl)}function q(e,r,n="brand-icon"){let t=D(e),a=String(r||"?").trim().slice(0,1).toUpperCase()||"?",o=t?"brand-icon-fallback hidden":"brand-icon-fallback";return`<span class="${n}" aria-hidden="true">
    ${t?`<img class="brand-icon-img" src="${s(t)}" alt="" loading="lazy" referrerpolicy="no-referrer">`:""}
    <span class="${o}">${s(a)}</span>
  </span>`}function Oe(e,r){let n=new Map;for(let a of e){let o=x[a.provider]||a.provider;n.has(o)||n.set(o,{provider:a.provider,label:C(a.provider,r,x),iconUrl:xt(a,r),brandHref:ht(a.provider,r),plans:[]}),n.get(o).plans.push(a)}let t=[...n.values()];for(let a of t)a.plans=Pe(a.plans);return t.sort((a,o)=>te(a.provider,r,x)-te(o.provider,r,x)),t}function $t(e){return e.status==="available"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"}function Ge(e){if(!e.status)return s(e.statusLabel||"");let r=`status.${e.status}`,n=i(r);return s(n.startsWith("status.")?e.statusLabel||"":n)}function kt(e){let r=null;if(Number.isFinite(e.monthlyPriceValue))r=e.monthlyPriceValue;else{let n=String(e.monthlyPrice||"").match(/[\d.]+/),t=n?parseFloat(n[0]):NaN;Number.isFinite(t)&&(r=t)}return r==null||r<0?null:{value:r,currency:e.monthlyCurrency||"USD"}}function _t(e){let r=null;for(let n of e){let t=kt(n);t&&(r==null||t.value<r.value)&&(r=t)}return r}function wt(e){let r=_t(e.plans),n=e.plans.filter($t).length,t=[];r!=null&&t.push(r.value===0?i("group.summary.free"):i("group.summary.from",{symbol:Se(r.currency),price:Le(r.value)})),n>0&&t.push(i("group.summary.available",{n}));let a=t.join(" \xB7 ");return`<span class="plan-table-group-summary">${s(a)}</span>`}function Pt(e,r){let n=B(e,r,x);return n.training==="no"?`<span class="text-xs font-medium text-emerald-600 dark:text-emerald-400" title="${s(i("privacy.training.no"))}">${s(i("privacy.cell.no"))}</span>`:n.training==="yes"?`<span class="text-xs font-medium text-amber-600 dark:text-amber-400" title="${s(i("privacy.training.yes"))}">${s(i("privacy.cell.yes"))}</span>`:n.training==="unclear"?`<span class="text-xs text-slate-500 dark:text-slate-400">${s(i("privacy.training.unclear"))}</span>`:'<span class="text-slate-400">\u2014</span>'}function ze(e){return e.status==="available"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"?"bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300":e.status==="rush_sale"?"bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400":"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}function At(e,r="",n="",t=!1){let a=ze(e),o=e.includedCalls&&e.includedCalls.length>10&&(e.includedCalls.includes("\xA5")||e.includedCalls.includes("\u5143")||e.includedCalls.includes("\u767E\u4E07")),l=Ce[e.planType]||e.planType||"",d,p=Me(e);p?d=p:o?d=`<span class="text-sm font-semibold text-slate-700 dark:text-slate-300">${s(e.includedCalls)}</span>`:e.includedCalls||e.planType!=="api-usage"?d=`<span class="text-lg font-bold text-slate-500 dark:text-slate-400">${s(i("table.price.official"))}</span>`:d=`<span class="text-lg font-bold text-slate-400 dark:text-slate-500">${s(i("table.price.usage"))}</span>`;let u=N(e),m=E(e),b=u||m?`<div class="plan-card-quota-row mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        ${u?`<span title="${s(u.full)}">${s(i("table.col.quota"))}: ${s(u.text)}</span>`:""}
        ${m?`<span class="font-medium text-brand-700 dark:text-brand-300"${m.estimated?` title="${s(i("table.unitPrice.estimated"))}"`:""}>${s(m.text)}</span>`:""}
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
            <span class="whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium ${a}">${Ge(e)}</span>
            ${n}
            ${l?`<span class="whitespace-nowrap rounded-md bg-brand-50 px-1.5 py-0.5 text-[10px] font-medium text-brand-600 dark:bg-brand-950/40 dark:text-brand-300">${s(l)}</span>`:""}
            ${vt(e)}
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
  `}function St(e,r,n,t,a){return e.length?Oe(e,n).map(o=>{let l=a||t.has(o.provider),p=(l?o.plans:o.plans.slice(0,Y)).map(y=>{let f=re(y),v=f===r,h=y.confidenceScore,$="trust-dot--yellow";h&&h>=.8?$="trust-dot--high":h&&h<.5&&($="trust-dot--red");let S=[y.domesticPayment?`<span class="plan-card-badge">${s(i("badge.domesticPayment"))}</span>`:"",ae(y)?`<span class="plan-card-badge plan-card-badge--intl" title="${s(i("badge.intl.title"))}">${s(String(y.monthlyCurrency||"USD").toUpperCase())}</span>`:""].filter(Boolean).join(""),X=`<span class="trust-dot ${$}" title="${s(i("trust.label"))}: ${h!=null?Math.round(h*100)+"%":i("common.unknown")}"></span>`;return`
        <article class="plan-card-mobile${v?" is-selected":""}">
          <div class="plan-card-toggle" role="button" tabindex="0" data-plan-key="${s(f)}" aria-expanded="${v?"true":"false"}">
            ${At(y,X,S,v)}
          </div>
          ${v?ie(y,n):""}
        </article>`}).join(""),u=Math.max(0,o.plans.length-Y),m=!a&&u>0?`<button type="button" class="plan-group-toggle" data-plan-group-toggle="${s(o.provider)}" aria-expanded="${l?"true":"false"}">${l?i("group.collapseExtra"):i("group.viewRemaining",{n:u})}</button>`:"",b=`${q(o.iconUrl,o.label,"brand-icon brand-icon--section")}
          <h3 class="text-sm font-bold text-brand-800 dark:text-brand-200">${s(o.label)}</h3>`;return`
      <section class="plan-card-group">
        <div class="mb-2 flex items-center gap-2">
          ${o.brandHref?`<a href="${s(o.brandHref)}" class="plan-group-brand-link">${b}</a>`:b}
          <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${o.plans.length}</span>
        </div>
        <div class="plan-card-grid">
          ${p}
        </div>
        ${m}
      </section>`}).join(""):""}function Ve(e,r,n,t,a=Y){let o=n?e.plans:e.plans.slice(0,a);return o.length?o.map(l=>{let d=re(l),p=d===r,u=ze(l),m=Te(l),b=M(l.monthlyPrice)?`<div>${s(l.monthlyPrice)}</div>${m?`<div class="plan-table-price-first">${s(i("table.price.firstMonth"))} ${s(m)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',y=M(l.quarterlyPrice)?`<div>${s(l.quarterlyPrice)}</div>${M(l.quarterlyMonthlyPrice)?`<div class="plan-table-price-sub">${s(i("table.price.approx"))} ${s(l.quarterlyMonthlyPrice)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',f=M(l.annualPrice)?`<div>${s(l.annualPrice)}</div>${M(l.annualMonthlyPrice)?`<div class="plan-table-price-sub">${s(i("table.price.approx"))} ${s(l.annualMonthlyPrice)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',v=N(l),h=v?`<span class="text-slate-700 dark:text-slate-300" title="${s(v.full)}">${s(v.text)}</span>`:'<span class="text-slate-400">\u2014</span>',$=qe(l)?`<span class="billing-unit-badge billing-unit-badge--${s(l.limitType||"undisclosed")}">${s(ce(l))}</span>`:'<span class="text-slate-400">\u2014</span>',S=E(l),X=S?`<span class="whitespace-nowrap font-medium text-brand-700 dark:text-brand-300"${S.estimated?` title="${s(i("table.unitPrice.estimated"))}"`:""}>${s(S.text)}</span>`:'<span class="text-slate-400">\u2014</span>',T=se(l.lastVerifiedAt),rt=T.state==="fresh"?`<span class="text-xs font-medium text-emerald-600 dark:text-emerald-400" title="${s(i("verified.freshTitle",{date:T.date}))}">${s(T.days===0?i("verified.tableToday"):i("verified.tableDaysAgo",{n:T.days}))}</span>`:T.state==="stale"?`<span class="text-xs font-medium text-amber-600 dark:text-amber-400" title="${s(i("verified.staleTitle",{date:T.date}))}">${s(i("verified.stale"))}</span>`:`<span class="text-xs text-slate-400">${s(i("table.verified.pending"))}</span>`,be=I(l.url),ve=V(l,be),nt=be?`<a href="${s(ve.href)}" target="_blank" rel="${ve.rel}" ${K(l)} class="text-sm font-medium text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">${s(i("table.source.site"))}</a>`:'<span class="text-slate-400">\u2014</span>',at=l.domesticPayment?`<span class="rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">${s(i("common.supported"))}</span>`:`<span class="text-slate-400">${s(i("common.notSupported"))}</span>`,st=l.intlNetwork?`<span class="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">${s(i("common.required"))}</span>`:`<span class="text-slate-400">${s(i("common.notSupported"))}</span>`,it=Pt(l,t),lt=p?`<tr class="plan-detail-row">
          <td colspan="15" class="plan-inline-detail-cell">
            ${ie(l,t)}
          </td>
        </tr>`:"",ge=gt(l,t),he=s(l.name),ot=ae(l)?` <span class="plan-intl-tag" title="${s(i("badge.intl.title"))}">${s(String(l.monthlyCurrency||"USD").toUpperCase())}</span>`:"",ct=(ge?`<a href="${s(ge)}" class="font-medium text-brand-700 hover:text-brand-900 hover:underline dark:text-brand-300 dark:hover:text-brand-200">${he}</a>`:he)+ot,xe=`${q(e.iconUrl,e.label,"brand-icon brand-icon--table")}<span>${s(e.label)}</span>`,ut=e.brandHref?`<a href="${s(e.brandHref)}" class="plan-provider-cell plan-provider-cell--link">${xe}</a>`:`<div class="plan-provider-cell">${xe}</div>`;return`
      <tr class="plan-select-row${p?" is-selected":""}" data-plan-key="${s(d)}" tabindex="0" aria-selected="${p?"true":"false"}">
        <td class="px-3 py-3 font-medium text-slate-900 dark:text-white">${ut}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${ct}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${b}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${y}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${f}</td>
        <td class="plan-table-nowrap px-3 py-3">${$}</td>
        <td class="break-words px-3 py-3">${h}</td>
        <td class="plan-table-nowrap px-3 py-3">${X}</td>
        <td class="break-words px-3 py-3 text-slate-600 dark:text-slate-300">${s(j(l)||"\u2014")}</td>
        <td class="plan-table-nowrap px-3 py-3"><span class="rounded-md px-2 py-0.5 text-xs font-medium ${u}">${Ge(l)}</span></td>
        <td class="plan-table-nowrap px-3 py-3">${at}</td>
        <td class="plan-table-nowrap px-3 py-3">${st}</td>
        <td class="plan-table-nowrap px-3 py-3">${it}</td>
        <td class="plan-table-nowrap px-3 py-3">${rt}</td>
        <td class="plan-table-nowrap px-3 py-3">${nt}</td>
      </tr>
      ${lt}`}).join(""):""}function Lt(e,r,n,t,a,o){let l=r.length?Oe(r,t).map(d=>{if(d.plans.length===1)return Ve(d,n,!0,t);let p=!o&&d.plans.length>Y,u=o||!p||a.has(d.provider),m=wt(d),b=`${q(d.iconUrl,d.label,"brand-icon brand-icon--section")}
              <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${s(d.label)}</span>`,y=`
              ${d.brandHref?`<a href="${s(d.brandHref)}" class="plan-table-group-brand">${b}</a>`:b}
              <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${d.plans.length}</span>
              <span class="plan-table-group-right">
                ${m}
                ${p?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
              </span>`;return`
        <tr class="border-y border-slate-200 dark:border-slate-700">
          <td colspan="15" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
            ${p?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-plan-group-toggle="${s(d.provider)}" aria-expanded="${u?"true":"false"}" aria-label="${u?i("group.collapse"):i("group.expand")} ${s(d.label)}">${y}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${y}</div>`}
          </td>
        </tr>
        ${Ve(d,n,u,t)}`}).join(""):`<tr>
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
            ${ue.map(d=>je(d,e)).join("")}
          </tr>
        </thead>
        <tbody>
          ${l}
        </tbody>
      </table>
    </div>`}function kr(e,r="",n={},t=new Set,a=!1){if(!e.length)return`<p class="text-sm text-slate-500 dark:text-slate-400">${s(i("table.empty.none"))}</p>`;let o=Ae(e,n,x);if(!o.length)return`<p class="text-sm text-slate-500 dark:text-slate-400">${s(i("table.empty.none"))}</p>`;Ee(n);let l=Be(o),d=a||z()||Re();return`
    <div>
      ${He(l,o)}
      ${Ke(l,o)}
      <div class="plan-view-cards">
        ${St(l,r,n,t,d)}
      </div>
      <div class="plan-view-table">
        ${Lt(o,l,r,n,t,d)}
      </div>
    </div>`}var Je=7.2,fe=[{id:"light",labelKey:"advisor.usage.light",value:500},{id:"medium",labelKey:"advisor.usage.medium",value:3e3},{id:"heavy",labelKey:"advisor.usage.heavy",value:1e4},{id:"extreme",labelKey:"advisor.usage.extreme",value:3e4}],Ct={Anthropic:"Claude",Claude:"Claude",ChatGPT:"GPT",ChartGPT:"GPT",Google:"Gemini","Google Antigravity":"Gemini",Grok:"Grok","Z.ai":"GLM",BytePlus:"Doubao",\u963F\u91CC\u4E91:"Qwen","Alibaba Cloud":"Qwen",StepFun:"Step",\u9636\u8DC3\u661F\u8FB0:"Step",\u5FEB\u624BStreamLake:"KAT-Coder","Kwai StreamLake":"KAT-Coder",StreamLake:"KAT-Coder",Cursor:"Cursor",Qoder:"Qoder",Trae:"Trae",OpenCode:"OpenCode"},Ye=8;function pe(e){let r=String(e||"").trim();if(!r||/未指定|无明确|未公开|不适用|待更新|待确认|pending|unspecified|not specified|n\/a|tbd|unknown|see official/i.test(r))return null;let n=r.replace(/,/g,"").match(/(\d+(?:\.\d+)?)\s*(万)?/);if(!n)return null;let t=parseFloat(n[1])*(n[2]==="\u4E07"?1e4:1);return Number.isFinite(t)&&t>0?t:null}function Tt(e){let r=pe(e.monthlyRequests);if(r!=null)return{value:r,estimated:/约|估算|approx|estimat/i.test(e.monthlyRequests),basis:"monthly"};let n=pe(e.weeklyRequests);if(n!=null)return{value:Math.round(n*4.3),estimated:!0,basis:"weekly"};let t=pe(e.fiveHoursRequests);return t!=null?{value:t*30,estimated:!0,basis:"fiveHours"}:null}function Mt(e){let r=[{value:e.monthlyPriceValue,cycle:"monthly"},{value:e.quarterlyMonthlyPriceValue,cycle:"quarterly"},{value:e.annualMonthlyPriceValue,cycle:"annual"}].filter(a=>Number.isFinite(a.value)&&a.value>=0);if(!r.length)return null;let n=r.reduce((a,o)=>o.value<a.value?o:a),t=e.monthlyCurrency==="CNY";return{value:n.value,cycle:n.cycle,currency:e.monthlyCurrency||"USD",usd:t?n.value/Je:n.value}}function Ut(e,r={}){let n=Ct[e.provider];return n||C(e.provider,r,x)||e.provider||"Other"}function Dt(e,r,n={}){let t=new Map;for(let l of e)l.id&&t.set(l.id,Ut(l,n));let a=new Map;for(let l of r){let d=new Set((l.modelIds||[]).map(p=>t.get(p)).filter(Boolean));for(let p of d)a.set(p,(a.get(p)||0)+1)}return{options:[...a.entries()].map(([l,d])=>({family:l,count:d})).sort((l,d)=>d.count-l.count||l.family.localeCompare(d.family,"en")),familyByModelId:t}}function Nt(e,r){return new Set((e.modelIds||[]).map(n=>r.get(n)).filter(Boolean))}function Et(e,r,n){let{families:t,usage:a,budget:o}=r,l=[],d=0;for(let p of e){if(p.planType==="api_package"){d+=1;continue}let u=Mt(p);if(o!=null&&u&&u.usd>o)continue;let m=!1;if(t.size){let v=Nt(p,n);if(!v.size)m=!0;else if(![...v].some(h=>t.has(h)))continue}let b=Tt(p),y=b&&u&&b.value>0?u.usd/b.value*1e3:null,f;m?f=4:b?b.value>=a?f=1:f=2:f=3,l.push({plan:p,price:u,quota:b,costPer1k:y,tier:f})}return l.sort((p,u)=>{if(p.tier!==u.tier)return p.tier-u.tier;if((p.tier===1||p.tier===2)&&p.costPer1k!==u.costPer1k)return(p.costPer1k??1/0)-(u.costPer1k??1/0);let m=p.price?p.price.usd:1/0,b=u.price?u.price.usd:1/0;return m-b}),{results:l,paygoCount:d}}function Qe(e){return Math.round(e).toLocaleString(_())}function We(e,r="USD"){return`${r==="CNY"?"\xA5":"$"}${e.toLocaleString(_(),{maximumFractionDigits:e<10?2:0})}`}function Ft(e,r){let{plan:n,price:t,quota:a,costPer1k:o,tier:l}=e,d=C(n.provider,r,x),p=[];if(l===1?p.push(`<span class="plan-advisor-chip plan-advisor-chip--good">${s(i("advisor.chip.enough"))}</span>`):l===2?p.push(`<span class="plan-advisor-chip plan-advisor-chip--warn">${s(i("advisor.chip.short"))}</span>`):l===3?p.push(`<span class="plan-advisor-chip plan-advisor-chip--muted">${s(i("advisor.chip.unknown"))}</span>`):p.push(`<span class="plan-advisor-chip plan-advisor-chip--muted">${s(i("advisor.chip.unlabeled"))}</span>`),a){let f=w()==="en"?" (":"\uFF08",v=w()==="en"?")":"\uFF09",h=a.estimated?`${f}${s(i("advisor.chip.estimated",{basis:i(`advisor.basis.${a.basis}`)}))}${v}`:"";p.push(`<span class="plan-advisor-chip">${s(i("advisor.chip.monthlyQuota",{n:Qe(a.value)}))}${h}</span>`)}if(o!=null&&p.push(`<span class="plan-advisor-chip">${s(i("advisor.chip.per1k",{price:We(o)}))}</span>`),n.supportedModelNames?.length){let f=n.supportedModelNames.slice(0,3).join(" / "),v=n.supportedModelNames.length>3?" \u2026":"";p.push(`<span class="plan-advisor-chip">${s(i("advisor.chip.supports",{models:f+v}))}</span>`)}let u=`<span class="plan-advisor-price-muted">${s(i("advisor.price.official"))}</span>`;if(t){let f=t.cycle!=="monthly"?`<span class="plan-advisor-cycle">${s(i(`advisor.cycle.${t.cycle}`))}</span>`:"",v=t.currency==="CNY"?`<span class="plan-advisor-price-note">${s(i("advisor.price.cnyNote",{n:Qe(t.usd),rate:Je}))}</span>`:"";u=`<span class="plan-advisor-price">${We(t.value,t.currency)}/${s(i("common.perMonth"))}</span>${f}${v}`}let m=I(n.url),b=m?V(n,m):null,y=b?`<a href="${s(b.href)}" target="_blank" rel="${b.rel}" ${K(n)} class="plan-advisor-link">${s(i("advisor.link"))}</a>`:"";return`
    <li class="plan-advisor-result">
      <div class="plan-advisor-result-head">
        ${q(n.providerIconUrl,d,"brand-icon plan-advisor-result-icon")}
        <div class="plan-advisor-result-name">
          <strong>${s(n.name)}</strong>
          <span>${s(d)}</span>
        </div>
        <div class="plan-advisor-result-price">${u}</div>
      </div>
      <div class="plan-advisor-result-chips">${p.join("")}</div>
      ${y}
    </li>
  `}function qt(e,r){let n=fe.some(t=>t.value===r.usage)?"":r.usage;return`
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
          ${fe.map(t=>{let a=t.value===r.usage;return`
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
  `}function Rt(){return`
    <div class="plan-advisor-dialog" role="dialog" aria-modal="true" aria-labelledby="planAdvisorTitle" tabindex="-1">
      <div class="plan-advisor-head">
        <h2 id="planAdvisorTitle">${s(i("advisor.title"))}</h2>
        <button type="button" class="plan-advisor-close" data-advisor-close aria-label="${s(i("advisor.close.aria"))}">\u2715</button>
      </div>
      <div class="plan-advisor-body"></div>
      <p class="plan-advisor-disclaimer">${s(i("advisor.disclaimer"))}</p>
    </div>
  `}function It({root:e,plans:r,providerInfo:n={},modelCatalog:t=[],initialState:a={},onStateChange:o=null}){let{options:l,familyByModelId:d}=Dt(t,r,n),p=new Set(l.map(y=>y.family)),u={families:new Set([...a.families||[]].filter(y=>p.has(y))),usage:Number.isFinite(a.usage)&&a.usage>0?a.usage:fe[1].value,budget:Number.isFinite(a.budget)&&a.budget>0?a.budget:null,showAll:!1};e.innerHTML=qt(l,u);let m=()=>{let y=e.querySelector("[data-advisor-results]"),{results:f,paygoCount:v}=Et(r,u,d);if(!f.length){y.innerHTML=`
        <p class="plan-advisor-empty">${s(i("advisor.empty"))}</p>
        ${v?`<p class="plan-advisor-paygo">${s(i("advisor.paygo",{n:v}))}</p>`:""}
      `;return}let h=u.showAll?f:f.slice(0,Ye);y.innerHTML=`
      <p class="plan-advisor-summary">${s(i("advisor.summary",{n:f.length}))}</p>
      <ol class="plan-advisor-list">
        ${h.map($=>Ft($,n)).join("")}
      </ol>
      ${f.length>Ye&&!u.showAll?`<button type="button" class="plan-advisor-more" data-advisor-more>${s(i("advisor.expand",{n:f.length}))}</button>`:""}
      ${v?`<p class="plan-advisor-paygo">${s(i("advisor.paygo",{n:v}))}</p>`:""}
    `},b=()=>{o?.(u)};return e.addEventListener("click",y=>{let f=y.target.closest("[data-family]");if(f){let h=f.dataset.family;u.families.has(h)?u.families.delete(h):u.families.add(h);let $=u.families.has(h);f.classList.toggle("is-active",$),f.setAttribute("aria-pressed",String($)),u.showAll=!1,m(),b();return}let v=y.target.closest("[data-usage]");if(v){u.usage=Number(v.dataset.usage),e.querySelectorAll("[data-usage]").forEach($=>{let S=$===v;$.classList.toggle("is-active",S),$.setAttribute("aria-pressed",String(S))});let h=e.querySelector("[data-advisor-usage-custom]");h&&(h.value=""),u.showAll=!1,m(),b();return}y.target.closest("[data-advisor-more]")&&(u.showAll=!0,m())}),e.querySelector("[data-advisor-usage-custom]")?.addEventListener("input",y=>{let f=Number(y.target.value);Number.isFinite(f)&&f>0&&(u.usage=f,e.querySelectorAll("[data-usage]").forEach(v=>{v.classList.remove("is-active"),v.setAttribute("aria-pressed","false")})),u.showAll=!1,m(),b()}),e.querySelector("[data-advisor-budget]")?.addEventListener("input",y=>{let f=Number(y.target.value);u.budget=Number.isFinite(f)&&f>0?f:null,u.showAll=!1,m(),b()}),m(),{state:u,refresh:m}}function Tr({plans:e,providerInfo:r={},modelCatalog:n=[],fab:t}){if(!t)return null;let a=null,o=null,l=null,d=()=>{a&&(a.hidden=!0,document.body.style.overflow="",l?.focus?.())},p=()=>{a||(a=document.createElement("div"),a.className="plan-advisor-overlay",a.hidden=!0,a.innerHTML=Rt(),document.body.appendChild(a),o=It({root:a.querySelector(".plan-advisor-body"),plans:e,providerInfo:r,modelCatalog:n}),a.addEventListener("click",m=>{m.target.closest("[data-advisor-close]")&&d()}),document.addEventListener("keydown",m=>{m.key==="Escape"&&a&&!a.hidden&&d()}))},u=()=>{p(),l=document.activeElement,a.hidden=!1,document.body.style.overflow="hidden",o.refresh(),a.querySelector(".plan-advisor-dialog")?.focus()};return t.addEventListener("click",u),{open:u,close:d}}var Fr=[{id:"low-cost",label:i("scenario.lowCost")},{id:"long-context",label:i("scenario.longContext")},{id:"multimodal",label:i("scenario.multimodal")},{id:"enterprise-api",label:i("scenario.enterpriseApi")},{id:"personal-use",label:i("scenario.personalUse")}];async function Bt(){let e=Ue(),r=e?"backend":"static",n=await Ze(De()),t=e&&w()==="en"?await Ze("/data.json"):null;return{...Ht(Kt(n,t),r),dataUnavailable:!n}}async function qr(){let e=await Bt(),r=e.models.flatMap(a=>Yt(a,e.providerInfo)),n=e.modelCatalog||[],t=new Map(n.map(a=>[a.id,a.name]));for(let a of r)a.supportedModelNames=(a.modelIds||[]).map(o=>t.get(o)).filter(Boolean);return{...e,plans:r,providerInfo:e.providerInfo||{},modelCatalog:n}}function Ht(e,r){if(e&&Array.isArray(e.models)){let n=e.models.map(t=>zt(t,r));if(n.length)return{source:r,lastUpdated:e.last_updated||ar(n.map(t=>t.updatedAt)),models:n,rawModels:e.models,providerInfo:e.provider_info||{},modelCatalog:jt(e.model_catalog)}}return{source:r,lastUpdated:e?.last_updated||"unknown",models:[],rawModels:[],providerInfo:e?.provider_info||{},modelCatalog:[]}}function jt(e){return Array.isArray(e)?e.map(r=>({id:c(r.id),name:c(g(r.name,r.name_en),r.id||""),provider:c(r.provider,""),providerIconUrl:c(r.provider_icon_url,""),logoUrl:c(r.logo_url,""),sortOrder:A(r.sort_order),marketRegion:c(r.market_region,"")})).filter(r=>r.id):[]}async function Ze(e){try{let r=await fetch(e,{headers:{Accept:"application/json"}});return r.ok?await r.json():null}catch{return null}}function Kt(e,r){if(!e||!Array.isArray(e.models)||!r||!Array.isArray(r.models))return e;let n=new Map(r.models.map(a=>[Q(a),a]).filter(([a])=>a)),t=e.models.map(a=>{let o=n.get(Q(a));return o?J(a,o):a});return{...e,models:t,provider_info:Vt(e.provider_info,r.provider_info)}}function Vt(e={},r={}){let n=new Set([...Object.keys(r||{}),...Object.keys(e||{})]),t={};for(let a of n)t[a]=J(e?.[a]||{},r?.[a]||{});return t}function J(e,r){if(!e||typeof e!="object"||Array.isArray(e)||!r||typeof r!="object"||Array.isArray(r))return e;let n={...e};for(let[t,a]of Object.entries(r)){let o=e[t];t==="package_plans"&&Array.isArray(o)&&Array.isArray(a)?n[t]=Ot(o,a):o&&typeof o=="object"&&!Array.isArray(o)&&a&&typeof a=="object"&&!Array.isArray(a)?n[t]=J(o,a):typeof o=="string"||typeof a=="string"?n[t]=Gt(o,a):o==null&&(n[t]=a)}return n}function Ot(e,r){let n=new Map(r.map(t=>[Q(t),t]).filter(([t])=>t));return e.map(t=>{let a=n.get(Q(t));return a?J(t,a):t})}function Gt(e,r){let n=String(r??"").trim();if(!n)return e;let t=String(e??"").trim();return t?Xe(t)&&!Xe(n)?r:e:r}function Xe(e){return/[\u3400-\u9fff]/.test(String(e||""))}function Q(e){return String(e?.id||e?.model_id||e?.plan_id||e?.planId||"").trim()}function zt(e,r){let n=Array.isArray(e.capabilities)?e.capabilities:[],t=A(e.input_price),a=A(e.context_length),o=Z(g(e.plan_summary,e.plan_summary_en),g(e.access_notes,e.access_notes_en),g(e.notes,e.notes_en)),l=Jt(e,t,a,n);return{id:c(e.id),vendor:c(e.provider,"Pending"),providerIconUrl:c(e.provider_icon_url,e.icon_url||""),logoUrl:c(e.logo_url,""),modelName:c(g(e.name,e.name_en),R(e.name)&&!R(e.provider)?c(e.provider,""):"","Pending"),inputPrice:tt(e.input_price,e.currency),outputPrice:tt(e.output_price,e.currency),contextLength:nr(e.context_length),multimodal:n.includes("vision")?"Supported":"TBD",apiSupport:"Supported",rmbRecharge:c(g(e.rmb_recharge_support,e.rmb_recharge_support_en),"See official site"),invoice:c(g(e.invoice_support,e.invoice_support_en),"See official site"),rmbRechargeRaw:e.rmb_recharge_support??null,invoiceRaw:e.invoice_support??null,accessLevel:c(e.access_level,""),marketRegion:c(e.market_region,""),marketRegionLabel:c(e.market_region_label,""),scenarios:l,suitableFor:c(g(e.suitable_for,e.suitable_for_en),o||"See official site"),updatedAt:c(e.last_updated,e.release_date||"Pending"),sourceUrl:c(e.docs_url,e.plan_url||""),packagePlans:Array.isArray(e.package_plans)?e.package_plans:[],source:r,raw:e}}function Yt(e,r={}){return(e.packagePlans||[]).filter(t=>t.status!=="discontinued").map(t=>{let a=A(t.monthly_price),o=A(t.quarterly_price),l=A(t.annual_price),d=er(t,e),p=c(t.provider,e.vendor),u=r[p]||{},m=Qt(p,r),b=Wt(p,r);return{id:c(t.id,`${e.id}-plan`),planId:c(t.planId,t.plan_id||""),brand:c(t.brand,t.brand_slug||""),name:c(g(t.name,t.name_en),"Pending plan"),provider:p,providerIconUrl:c(t.provider_icon_url,t.icon_url,e.providerIconUrl),modelName:e.modelName,modelId:c(t.model_id,e.id),modelIds:Array.isArray(t.model_ids)?t.model_ids.map(y=>String(y||"").trim()).filter(Boolean):[],status:c(t.status,"unknown"),statusLabel:(()=>{if(t.status){let f=i(`status.${t.status}`);if(!f.startsWith("status."))return f}let y=c(t.status_label,"");return y&&!R(y)?y:i("status.pending")})(),url:rr(t.url_cn,t.url_en),monthlyPrice:me(t.monthly_price,d),monthlyPriceValue:a,monthlyCurrency:d,monthlyCurrencyLabel:d==="USD"?i("currency.usd"):i("currency.cny"),quarterlyPrice:o!=null?ye(t.quarterly_price,d,i("common.perQuarter")):"",quarterlyPriceValue:o,quarterlyMonthlyPrice:o!=null?me(o/3,d):"",quarterlyMonthlyPriceValue:o!=null?o/3:null,annualPrice:l!=null?ye(t.annual_price,d,i("common.perYear")):"",annualPriceValue:l,annualMonthlyPrice:l!=null?me(l/12,d):"",annualMonthlyPriceValue:l!=null?l/12:null,includedCalls:c(g(t.included_calls,t.included_calls_en),""),notes:c(g(t.notes,t.notes_en),""),planType:c(t.plan_type,et(t,e)),category:et(t,e),rmbRecharge:e.rmbRecharge,invoice:e.invoice,rmbRechargeRaw:e.rmbRechargeRaw,invoiceRaw:e.invoiceRaw,accessLevel:e.accessLevel,marketRegion:e.marketRegion,marketRegionLabel:e.marketRegionLabel,firstMonthPrice:t.first_month_price!=null?t.first_month_price:null,fiveHoursRequests:c(g(t.five_hours_requests,t.five_hours_requests_en),""),weeklyRequests:c(g(t.weekly_requests,t.weekly_requests_en),""),monthlyRequests:c(g(t.monthly_requests,t.monthly_requests_en),""),measuredFiveHoursTokens:c(t.measured_five_hours_tokens,""),measuredWeeklyTokens:c(t.measured_weekly_tokens,""),measuredMonthlyTokens:c(t.measured_monthly_tokens,""),tokenLimit:c(t.token_limit,""),supportedModels:c(g(t.supported_models,t.supported_models_en),g(u.supported_models,u.supported_models_en)||""),benefits:c(g(t.benefits,t.benefits_en),""),rating:c(t.rating,""),tags:c(g(t.tags,t.tags_en),""),sourceUrl:c(t.source_url,""),lastVerifiedAt:c(t.last_verified_at,""),refundPolicy:c(g(t.refund_policy,t.refund_policy_en),""),billingCycle:c(t.billing_cycle,""),creditsLimit:c(g(t.credits_limit,t.credits_limit_en),""),concurrencyLimit:c(t.concurrency_limit,""),resetRule:c(g(t.reset_rule,t.reset_rule_en),""),limitType:c(t.limit_type,Zt(t)),dataStatus:c(t.data_status,Xt(t)),confidenceScore:t.confidence_score!=null?t.confidence_score:null,sourceType:c(t.source_type,""),toolCompatibility:L(t.tool_compatibility_json,{}),modelMultiplier:L(t.model_multiplier_json,{}),derivedMetrics:L(t.derived_metrics_json,{}),measuredMetrics:L(t.measured_metrics_json,{}),risk:L(t.risk_json,{}),recommendation:L(t.recommendation_json,{}),changeSummary:L(t.change_summary_json,{}),linkType:c(t.link_type,"official"),hasAffiliate:t.has_affiliate===!0,domesticPayment:m??W(t.domestic_payment),intlNetwork:b??W(t.intl_network),hasFirstMonthDiscount:t.has_first_month_discount===!0||t.has_first_month_discount===1,recommendationText:c(g(t.recommendation_text,t.recommendation_text_en),""),riskText:c(g(t.risk_text,t.risk_text_en),""),sortOrder:A(t.sort_order),privacyOverride:L(t.privacy_override_json,{}),raw:t}})}function Qt(e,r={}){let n=c(e);if(!n)return null;let t=r[n];return!t||t.domestic_payment==null?null:W(t.domestic_payment)}function Wt(e,r={}){let n=c(e);if(!n)return null;let t=r[n];return!t||t.intl_network==null?null:W(t.intl_network)}function Jt(e,r,n,t){let a=Z(e.name,e.provider,e.notes,e.plan_summary,e.access_notes).toLowerCase(),o=new Set(["enterprise-api"]);return r!=null&&r<=2&&o.add("low-cost"),n!=null&&n>=2e5&&o.add("long-context"),t.includes("vision")&&o.add("multimodal"),/个人|会员|订阅|聊天|kimi|豆包/.test(a)&&o.add("personal-use"),Array.from(o)}function L(e,r){if(!e||typeof e!="string")return e||r;try{return JSON.parse(e)}catch{return r}}function Zt(e){return e.five_hours_requests?"five_hours":e.weekly_requests?"weekly":e.monthly_requests?"monthly":e.token_limit?"token":e.credits_limit?"credits":"undisclosed"}function Xt(e){return e.last_verified_at?"verified":e.measured_monthly_tokens||e.measured_weekly_tokens?"measured":"pending"}function et(e,r){let n=Z(e.name,e.provider,e.notes,r.vendor,r.modelName).toLowerCase();return/聚合|路由|硅基|siliconflow/.test(n)?"aggregated_router":/会员|订阅|chat|清言|kimi|豆包/.test(n)?"personal_subscription":/maas|百炼|千帆|腾讯云|火山方舟|企业/.test(n)?"enterprise_maas":/开源|部署|私有化/.test(n)?"open_source_deploy":(/coding|qoder|claude code|cursor|trae/.test(n),"coding_plan")}function er(e,r){let n=c(e.monthly_currency).toUpperCase();if(n==="USD")return"USD";let t=c(r.market_region).toLowerCase(),a=t==="international"||t==="domestic_international";if(n==="CNY"&&a)return"USD";let o=c(e.provider,r.vendor),l=o.toLowerCase();if(l==="qoder"||l==="qoder cn"||l==="byteplus"||l==="z.ai"||l==="grok"||l==="claude"||l==="chartgpt"||l==="google antigravity"||l==="opencode"||l==="anthropic"||l==="openai"||a)return"USD";let d=Z(e.name,o,e.url_cn,e.url_en,e.included_calls,e.notes).toLowerCase();return/\$|usd|美元|trae\.ai/.test(d)?"USD":"CNY"}function c(...e){let r=e.find(n=>n!=null&&String(n).trim());return r==null?"":String(r).trim()}function W(e){if(e===!0||e===1)return!0;let r=String(e??"").trim().toLowerCase();return r==="true"||r==="1"||r==="yes"}function tr(e){if(!e)return!1;let r=String(e).trim();return!r||/[\u4e00-\u9fff]/.test(r)?!1:(r.match(/[a-zA-Z]/g)||[]).length/r.length>.6}function g(e,r){return w()==="en"?r!=null&&String(r).trim()?r:$e(e):w()==="zh"&&tr(e)&&r!=null&&String(r).trim()&&String(r).trim()!==String(e).trim()?r:e}function rr(e,r){return w()==="zh"?c(e,r):c(r,e)}function A(e){if(e==null||e==="")return null;let r=Number(e);return Number.isFinite(r)?r:null}function tt(e,r){let n=A(e);return n==null?c(e,i("common.pending")):`${r==="USD"?"$":"\xA5"}${n.toLocaleString(_(),{maximumFractionDigits:4})}/${i("common.perMillionTokens")}`}function me(e,r="CNY"){return ye(e,r,i("common.perMonth"))}function ye(e,r="CNY",n=i("common.perMonth")){let t=A(e);return t==null?i("common.official"):`${r==="USD"?"$":"\xA5"}${t.toLocaleString(_(),{maximumFractionDigits:2})}/${n}`}function nr(e){let r=A(e);return r==null?c(e,i("common.official")):r>=1e6?`${(r/1e6).toLocaleString(_(),{maximumFractionDigits:1})}M tokens`:r>=1e3?`${(r/1e3).toLocaleString(_(),{maximumFractionDigits:0})}K tokens`:`${r.toLocaleString(_())} tokens`}function Z(...e){return e.filter(r=>r!=null&&String(r).trim()).join(" ")}function ar(e){return e.find(r=>r&&r!=="Pending")||"Pending"}export{Re as a,pr as b,yt as c,Be as d,fr as e,q as f,kr as g,It as h,Tr as i,qr as j};
