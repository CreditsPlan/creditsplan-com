import{a as rt,b as at}from"./chunk.7HYUNLOO.js";import{a as Qe}from"./chunk.KMNXM3CW.js";import{A as tt,B as nt,C as qe,a as P,b as Y,c as We,d as Je,e as U,f as Q,g as fe,h as W,i as se,j as le,k as Ce,l as Ee,m as be,n as ve,o as Ue,p as ye,q as Ze,r as Xe,s as re,t as De,u as Ne,v as ie,w as oe,x as et,y as ge,z as he}from"./chunk.DP4Y7RDO.js";import{a,b as me}from"./chunk.Y3GWXKZH.js";import{a as pe,c as T,e as l}from"./chunk.DQO4UH3H.js";var Ot=new Set(["\u5F85\u66F4\u65B0","\u5F85\u786E\u8BA4","\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"]);function $e(e){let t=String(e??"").trim();return t&&!Ot.has(t)?t:"\u2014"}function ce(e="",t=""){let r=String(t??"").trim();return{column:r?String(e??"").trim():"",value:r}}function Fe(e){return!!(e?.column&&e?.value)}function st(e,t,r){return Fe(t)?e.filter(n=>r(n,t.column)===t.value):e}var lt={};function it(e){lt=e||{}}function Rt(e){let t=fe(e,lt,P);return t.training?l(`privacy.training.${t.training}`)||t.training:l("privacy.filter.notResearched")}var ot={token:"billing.token",credits:"billing.credits",five_hours:"billing.requests",weekly:"billing.requests",monthly:"billing.requests"};function Be(e){let t=ot[e.limitType];return t?l(t):l("billing.undisclosed")}function ct(e){return!!ot[e.limitType]}var Ie=[{key:"provider",labelKey:"table.col.provider",value:e=>W(e.provider)||"\u2014"},{key:"name",labelKey:"table.col.name",value:e=>be(e.name)||"\u2014"},{key:"monthlyPrice",labelKey:"table.col.monthly",value:e=>$e(e.monthlyPrice)},{key:"quarterlyPrice",labelKey:"table.col.quarterly",value:e=>$e(e.quarterlyPrice)},{key:"annualPrice",labelKey:"table.col.annual",value:e=>$e(e.annualPrice)},{key:"billingUnit",labelKey:"table.col.billingUnit",value:e=>Be(e)},{key:"quota",labelKey:"table.col.quota",value:e=>ie(e)?.text||"\u2014"},{key:"unitPrice",labelKey:"table.col.unitPrice",value:e=>oe(e)?.text||"\u2014"},{key:"model",labelKey:"table.col.model",value:e=>ve(e)||"\u2014"},{key:"status",labelKey:"table.col.status",value:e=>be(e.statusLabel)||"\u2014"},{key:"domesticPayment",labelKey:"table.col.domesticPayment",value:e=>e.domesticPayment?l("common.supported"):"\u2014"},{key:"intlNetwork",labelKey:"table.col.intlNetwork",value:e=>e.intlNetwork?l("common.required"):"\u2014"},{key:"dataTraining",labelKey:"table.col.dataTraining",value:e=>Rt(e)},{key:"verifiedAt",labelKey:"table.col.verified",value:e=>be(e.lastVerifiedAt)||l("table.verified.pending")},{key:"source",labelKey:"table.col.source",value:e=>e.url?l("table.source.name"):"\u2014"}],H=ce(),J=!1,Ht=new Intl.Collator(T(),{numeric:!0,sensitivity:"base"});function Vt(e){return e.status==="available"||e.status==="rush_sale"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"}function dt(){return J}function Kt(){J=!J}function Oe(e){return Ie.find(t=>t.key===e)}function ut(e,t){let r=Oe(t);return r?String(r.value(e)||"").trim()||"\u2014":""}function Re(){H=ce(),J=!1}function we(){return Fe(H)&&!!Oe(H.column)}function pt(e){let t=e;return J&&(t=t.filter(Vt)),we()&&(t=st(t,H,ut)),t}function mt(e,t){let r=J?`<span class="plan-table-filter-count">${e.length} / ${t.length}</span>`:"";return`
    <div class="plan-table-quick-filters">
      <button type="button" class="plan-quick-filter${J?" is-active":""}" data-plan-available-toggle aria-pressed="${J?"true":"false"}">
        <span class="plan-quick-filter-mark" aria-hidden="true">\u2713</span>${a(l("table.quick.availableOnly"))}
      </button>
      ${r}
    </div>
  `}function jt(e,t){let r=new Map;for(let n of e){let s=ut(n,t.key);r.set(s,(r.get(s)||0)+1)}return Array.from(r.entries()).map(([n,s])=>({value:n,count:s})).sort((n,s)=>n.value==="\u2014"&&s.value!=="\u2014"?1:s.value==="\u2014"&&n.value!=="\u2014"?-1:Ht.compare(n.value,s.value))}function ft(e,t){let r=H.column===e.key&&!!H.value,n=jt(t,e);return`
    <th scope="col" class="plan-column-filter break-words px-3 py-3 text-left font-semibold text-slate-900 dark:text-white">
      <button type="button" class="plan-column-filter-trigger${r?" is-active":""}" data-plan-filter-column="${a(e.key)}" aria-haspopup="menu" aria-expanded="false" title="${a(l("table.filter.tooltip"))} ${a(l(e.labelKey))}">
        <span class="plan-column-filter-label">${a(l(e.labelKey))}</span>
        <span class="plan-column-filter-caret" aria-hidden="true"></span>
      </button>
      <div class="plan-column-filter-menu" data-plan-filter-menu="${a(e.key)}" role="menu" hidden>
        <button type="button" class="plan-column-filter-option${r?"":" is-active"}" data-plan-filter-value="">
          <span class="plan-column-filter-option-label">${a(l("table.filter.all"))}</span>
          <span class="plan-column-filter-option-count">${t.length}</span>
        </button>
        ${n.map(s=>`
          <button type="button" class="plan-column-filter-option${r&&s.value===H.value?" is-active":""}" data-plan-filter-value="${a(s.value)}">
            <span class="plan-column-filter-option-label">${a(s.value)}</span>
            <span class="plan-column-filter-option-count">${s.count}</span>
          </button>
        `).join("")}
      </div>
    </th>
  `}function bt(e,t){if(!we())return"";let r=Oe(H.column);return`
    <div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${a(l(r.labelKey))}</span>
        <strong>${a(H.value)}</strong>
      </span>
      <span class="plan-table-filter-count">${e.length} / ${t.length} ${a(l("table.filter.count"))}</span>
      <button type="button" class="plan-table-filter-clear" data-plan-filter-clear>${a(l("table.filter.clear"))}</button>
    </div>
  `}function xe(e){e&&(e.querySelectorAll(".plan-column-filter-menu").forEach(t=>{t.hidden=!0}),e.querySelectorAll("[data-plan-filter-column]").forEach(t=>{t.setAttribute("aria-expanded","false")}))}function vt(e,t,r,n){e.addEventListener("click",s=>{let o=s.target.closest("[data-plan-filter-column]");if(o&&e.contains(o)){let v=o.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!v)return;let $=!v.hidden;xe(e),$||(v.hidden=!1,o.setAttribute("aria-expanded","true"));return}let i=s.target.closest("[data-plan-filter-value]");if(i&&e.contains(i)){let v=i.closest("[data-plan-filter-menu]"),$=i.dataset.planFilterValue||"";H=v&&$?ce(v.dataset.planFilterMenu,$):ce(),r();return}let c=s.target.closest("[data-plan-filter-clear]");if(c&&e.contains(c)){Re(),r();return}let p=s.target.closest("[data-plan-available-toggle]");if(p&&e.contains(p)){Kt(),r();return}let m=s.target.closest("[data-plan-key]");if(m&&e.contains(m)&&!s.target.closest("a")){let v=m.dataset.planKey||"";Ee(t(),v)&&n(v);return}s.target.closest(".plan-column-filter")||xe(e)}),e.addEventListener("keydown",s=>{let o=s.target.closest("[data-plan-key]");if(!o||!e.contains(o)||s.target.closest("a")||s.key!=="Enter"&&s.key!==" ")return;s.preventDefault();let i=o.dataset.planKey||"";Ee(t(),i)&&n(i)}),document.addEventListener("click",s=>{e.contains(s.target)||xe(e)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&xe(e)})}var ke=2;function Gt(e){let t=Ne(e.lastVerifiedAt);if(t.state==="fresh"){let r=t.days===0?l("verified.freshToday"):l("verified.freshDaysAgo",{n:t.days});return`<span class="whitespace-nowrap rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300" title="${a(l("verified.freshTitle",{date:t.date}))}">${a(r)}</span>`}return t.state==="stale"?`<span class="whitespace-nowrap rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:bg-amber-950/40 dark:text-amber-300" title="${a(l("verified.staleTitle",{date:t.date}))}">${a(l("verified.stale"))}</span>`:""}function zt(e,t){let r=We(e.provider,t,P),n=Je(e,r);return n?`/plans/${encodeURIComponent(n)}/`:""}function Yt(e,t){let r=Q(e,t,P),n=String(r.seo_slug||"").trim(),s=String(r.seo_intro||"").trim(),o=String(r.icon_url||"").trim();return n&&s&&o?`/brands/${encodeURIComponent(n)}/`:""}function Qt(e,t={}){let r=Q(e.provider,t,P);return U(r.icon_url)||U(e.providerIconUrl)||U(Y(e.provider)?.iconUrl)}function B(e,t,r="brand-icon"){let n=U(e),s=String(t||"?").trim().slice(0,1).toUpperCase()||"?",o=n?"brand-icon-fallback hidden":"brand-icon-fallback";return`<span class="${r}" aria-hidden="true">
    ${n?`<img class="brand-icon-img" src="${a(n)}" alt="" loading="lazy" referrerpolicy="no-referrer">`:""}
    <span class="${o}">${a(s)}</span>
  </span>`}function gt(e,t){let r=new Map;for(let s of e){let o=P[s.provider]||s.provider;r.has(o)||r.set(o,{provider:s.provider,label:W(s.provider,t,P),iconUrl:Qt(s,t),brandHref:Yt(s.provider,t),plans:[]}),r.get(o).plans.push(s)}let n=[...r.values()];for(let s of n)s.plans=le(s.plans);return n.sort((s,o)=>se(s.provider,t,P)-se(o.provider,t,P)),n}function Wt(e){return e.status==="available"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"}function Jt(e){let t=null;if(Number.isFinite(e.monthlyPriceValue))t=e.monthlyPriceValue;else{let r=String(e.monthlyPrice||"").match(/[\d.]+/),n=r?parseFloat(r[0]):NaN;Number.isFinite(n)&&(t=n)}return t==null||t<0?null:{value:t,currency:e.monthlyCurrency||"USD"}}function Zt(e){let t=null;for(let r of e){let n=Jt(r);n&&(t==null||n.value<t.value)&&(t=n)}return t}function Xt(e){let t=Zt(e.plans),r=e.plans.filter(Wt).length,n=[];t!=null&&n.push(t.value===0?l("group.summary.free"):l("group.summary.from",{symbol:Ze(t.currency),price:Xe(t.value)})),r>0&&n.push(l("group.summary.available",{n:r}));let s=n.join(" \xB7 ");return`<span class="plan-table-group-summary">${a(s)}</span>`}function en(e,t){let r=fe(e,t,P);return r.training==="no"?`<span class="text-xs font-medium text-emerald-600 dark:text-emerald-400" title="${a(l("privacy.training.no"))}">${a(l("privacy.cell.no"))}</span>`:r.training==="yes"?`<span class="text-xs font-medium text-amber-600 dark:text-amber-400" title="${a(l("privacy.training.yes"))}">${a(l("privacy.cell.yes"))}</span>`:r.training==="unclear"?`<span class="text-xs text-slate-500 dark:text-slate-400">${a(l("privacy.training.unclear"))}</span>`:'<span class="text-slate-400">\u2014</span>'}function ht(e){return e.status==="available"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"?"bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300":e.status==="rush_sale"?"bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400":"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}function tn(e,t="",r="",n=!1){let s=ht(e),o=e.includedCalls&&e.includedCalls.length>10&&(e.includedCalls.includes("\xA5")||e.includedCalls.includes("\u5143")||e.includedCalls.includes("\u767E\u4E07")),i=et[e.planType]||e.planType||"",c,p=nt(e);p?c=p:o?c=`<span class="text-sm font-semibold text-slate-700 dark:text-slate-300">${a(e.includedCalls)}</span>`:e.includedCalls||e.planType!=="api-usage"?c=`<span class="text-lg font-bold text-slate-500 dark:text-slate-400">${a(l("table.price.official"))}</span>`:c=`<span class="text-lg font-bold text-slate-400 dark:text-slate-500">${a(l("table.price.usage"))}</span>`;let m=ie(e),v=oe(e),$=m||v?`<div class="plan-card-quota-row mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        ${m?`<span title="${a(m.full)}">${a(l("table.col.quota"))}: ${a(m.text)}</span>`:""}
        ${v?`<span class="font-medium text-brand-700 dark:text-brand-300"${v.estimated?` title="${a(l("table.unitPrice.estimated"))}"`:""}>${a(v.text)}</span>`:""}
      </div>`:"";return`
    <div class="plan-card">
      <div class="plan-card-head">
        <div class="plan-card-title-row flex items-start justify-between gap-2">
          <div class="flex min-w-0 flex-1 items-start gap-2">
            ${t}
            <div class="min-w-0 flex-1">
              <p class="plan-card-title">${a(e.name)}</p>
            </div>
          </div>
          <div class="plan-card-meta flex shrink-0 flex-col items-end gap-1.5">
            <span class="whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium ${s}">${a(e.statusLabel)}</span>
            ${r}
            ${i?`<span class="whitespace-nowrap rounded-md bg-brand-50 px-1.5 py-0.5 text-[10px] font-medium text-brand-600 dark:bg-brand-950/40 dark:text-brand-300">${a(i)}</span>`:""}
            ${Gt(e)}
          </div>
          <span class="plan-card-disclosure" aria-hidden="true">
            <span>${n?l("card.detail.collapse"):l("card.detail.expand")}</span>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="m6 8 4 4 4-4" />
            </svg>
          </span>
        </div>
        <div class="plan-card-price-row mt-3 flex items-baseline gap-1.5">
          ${c}
        </div>
        ${$}
      </div>
    </div>
  `}function nn(e,t,r,n,s){return e.length?gt(e,r).map(o=>{let i=s||n.has(o.provider),p=(i?o.plans:o.plans.slice(0,ke)).map(x=>{let h=Ce(x),g=h===t,w=x.confidenceScore,L="trust-dot--yellow";w&&w>=.8?L="trust-dot--high":w&&w<.5&&(L="trust-dot--red");let A=[x.domesticPayment?`<span class="plan-card-badge">${a(l("badge.domesticPayment"))}</span>`:"",De(x)?`<span class="plan-card-badge plan-card-badge--intl" title="${a(l("badge.intl.title"))}">${a(String(x.monthlyCurrency||"USD").toUpperCase())}</span>`:""].filter(Boolean).join(""),F=`<span class="trust-dot ${L}" title="${a(l("trust.label"))}: ${w!=null?Math.round(w*100)+"%":l("common.unknown")}"></span>`;return`
        <article class="plan-card-mobile${g?" is-selected":""}">
          <div class="plan-card-toggle" role="button" tabindex="0" data-plan-key="${a(h)}" aria-expanded="${g?"true":"false"}">
            ${tn(x,F,A,g)}
          </div>
          ${g?qe(x,r):""}
        </article>`}).join(""),m=Math.max(0,o.plans.length-ke),v=!s&&m>0?`<button type="button" class="plan-group-toggle" data-plan-group-toggle="${a(o.provider)}" aria-expanded="${i?"true":"false"}">${i?l("group.collapseExtra"):l("group.viewRemaining",{n:m})}</button>`:"",$=`${B(o.iconUrl,o.label,"brand-icon brand-icon--section")}
          <h3 class="text-sm font-bold text-brand-800 dark:text-brand-200">${a(o.label)}</h3>`;return`
      <section class="plan-card-group">
        <div class="mb-2 flex items-center gap-2">
          ${o.brandHref?`<a href="${a(o.brandHref)}" class="plan-group-brand-link">${$}</a>`:$}
          <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${o.plans.length}</span>
        </div>
        <div class="plan-card-grid">
          ${p}
        </div>
        ${v}
      </section>`}).join(""):""}function yt(e,t,r,n,s=ke){let o=r?e.plans:e.plans.slice(0,s);return o.length?o.map(i=>{let c=Ce(i),p=c===t,m=ht(i),v=tt(i),$=re(i.monthlyPrice)?`<div>${a(i.monthlyPrice)}</div>${v?`<div class="plan-table-price-first">${a(l("table.price.firstMonth"))} ${a(v)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',x=re(i.quarterlyPrice)?`<div>${a(i.quarterlyPrice)}</div>${re(i.quarterlyMonthlyPrice)?`<div class="plan-table-price-sub">${a(l("table.price.approx"))} ${a(i.quarterlyMonthlyPrice)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',h=re(i.annualPrice)?`<div>${a(i.annualPrice)}</div>${re(i.annualMonthlyPrice)?`<div class="plan-table-price-sub">${a(l("table.price.approx"))} ${a(i.annualMonthlyPrice)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',g=ie(i),w=g?`<span class="text-slate-700 dark:text-slate-300" title="${a(g.full)}">${a(g.text)}</span>`:'<span class="text-slate-400">\u2014</span>',L=ct(i)?`<span class="billing-unit-badge billing-unit-badge--${a(i.limitType||"undisclosed")}">${a(Be(i))}</span>`:'<span class="text-slate-400">\u2014</span>',A=oe(i),F=A?`<span class="whitespace-nowrap font-medium text-brand-700 dark:text-brand-300"${A.estimated?` title="${a(l("table.unitPrice.estimated"))}"`:""}>${a(A.text)}</span>`:'<span class="text-slate-400">\u2014</span>',C=Ne(i.lastVerifiedAt),X=C.state==="fresh"?`<span class="text-xs font-medium text-emerald-600 dark:text-emerald-400" title="${a(l("verified.freshTitle",{date:C.date}))}">${a(C.days===0?l("verified.tableToday"):l("verified.tableDaysAgo",{n:C.days}))}</span>`:C.state==="stale"?`<span class="text-xs font-medium text-amber-600 dark:text-amber-400" title="${a(l("verified.staleTitle",{date:C.date}))}">${a(l("verified.stale"))}</span>`:`<span class="text-xs text-slate-400">${a(l("table.verified.pending"))}</span>`,K=me(i.url),j=he(i,K),R=K?`<a href="${a(j.href)}" target="_blank" rel="${j.rel}" ${ge(i)} class="text-sm font-medium text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">${a(l("table.source.site"))}</a>`:'<span class="text-slate-400">\u2014</span>',G=i.domesticPayment?`<span class="rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">${a(l("common.supported"))}</span>`:`<span class="text-slate-400">${a(l("common.notSupported"))}</span>`,te=i.intlNetwork?`<span class="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">${a(l("common.required"))}</span>`:`<span class="text-slate-400">${a(l("common.notSupported"))}</span>`,ue=en(i,n),N=p?`<tr class="plan-detail-row">
          <td colspan="15" class="plan-inline-detail-cell">
            ${qe(i,n)}
          </td>
        </tr>`:"",ee=zt(i,n),z=a(i.name),ae=De(i)?` <span class="plan-intl-tag" title="${a(l("badge.intl.title"))}">${a(String(i.monthlyCurrency||"USD").toUpperCase())}</span>`:"",u=(ee?`<a href="${a(ee)}" class="font-medium text-brand-700 hover:text-brand-900 hover:underline dark:text-brand-300 dark:hover:text-brand-200">${z}</a>`:z)+ae,b=`${B(e.iconUrl,e.label,"brand-icon brand-icon--table")}<span>${a(e.label)}</span>`,y=e.brandHref?`<a href="${a(e.brandHref)}" class="plan-provider-cell plan-provider-cell--link">${b}</a>`:`<div class="plan-provider-cell">${b}</div>`;return`
      <tr class="plan-select-row${p?" is-selected":""}" data-plan-key="${a(c)}" tabindex="0" aria-selected="${p?"true":"false"}">
        <td class="px-3 py-3 font-medium text-slate-900 dark:text-white">${y}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${u}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${$}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${x}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${h}</td>
        <td class="plan-table-nowrap px-3 py-3">${L}</td>
        <td class="break-words px-3 py-3">${w}</td>
        <td class="plan-table-nowrap px-3 py-3">${F}</td>
        <td class="break-words px-3 py-3 text-slate-600 dark:text-slate-300">${a(ve(i)||"\u2014")}</td>
        <td class="plan-table-nowrap px-3 py-3"><span class="rounded-md px-2 py-0.5 text-xs font-medium ${m}">${a(i.statusLabel)}</span></td>
        <td class="plan-table-nowrap px-3 py-3">${G}</td>
        <td class="plan-table-nowrap px-3 py-3">${te}</td>
        <td class="plan-table-nowrap px-3 py-3">${ue}</td>
        <td class="plan-table-nowrap px-3 py-3">${X}</td>
        <td class="plan-table-nowrap px-3 py-3">${R}</td>
      </tr>
      ${N}`}).join(""):""}function rn(e,t,r,n,s,o){let i=t.length?gt(t,n).map(c=>{if(c.plans.length===1)return yt(c,r,!0,n);let p=!o&&c.plans.length>ke,m=o||!p||s.has(c.provider),v=Xt(c),$=`${B(c.iconUrl,c.label,"brand-icon brand-icon--section")}
              <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${a(c.label)}</span>`,x=`
              ${c.brandHref?`<a href="${a(c.brandHref)}" class="plan-table-group-brand">${$}</a>`:$}
              <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${c.plans.length}</span>
              <span class="plan-table-group-right">
                ${v}
                ${p?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
              </span>`;return`
        <tr class="border-y border-slate-200 dark:border-slate-700">
          <td colspan="15" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
            ${p?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-plan-group-toggle="${a(c.provider)}" aria-expanded="${m?"true":"false"}" aria-label="${m?l("group.collapse"):l("group.expand")} ${a(c.label)}">${x}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${x}</div>`}
          </td>
        </tr>
        ${yt(c,r,m,n)}`}).join(""):`<tr>
        <td colspan="15" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">${a(l("table.empty.match"))}</td>
      </tr>`;return`
    <div class="plan-table-wrap">
      <table class="w-full table-fixed text-sm">
        <caption class="sr-only">${a(l("table.caption"))}</caption>
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
            ${Ie.map(c=>ft(c,e)).join("")}
          </tr>
        </thead>
        <tbody>
          ${i}
        </tbody>
      </table>
    </div>`}function He(e,t="",r={},n=new Set,s=!1){if(!e.length)return`<p class="text-sm text-slate-500 dark:text-slate-400">${a(l("table.empty.none"))}</p>`;let o=ye(e,r,P);if(!o.length)return`<p class="text-sm text-slate-500 dark:text-slate-400">${a(l("table.empty.none"))}</p>`;it(r);let i=pt(o),c=s||we()||dt();return`
    <div>
      ${mt(i,o)}
      ${bt(i,o)}
      <div class="plan-view-cards">
        ${nn(i,t,r,n,c)}
      </div>
      <div class="plan-view-table">
        ${rn(o,i,t,r,n,c)}
      </div>
    </div>`}var $t=2,an=new Set(["claude-opus-4-8","claude-sonnet-4-6","claude-opus-4-7","claude-opus-4-6","claude-sonnet-4-5","claude-opus-4-5","claude-opus-4-1"]);function O(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function _e(e,t){let r=O(e);return r==null?l("pricing.pending"):`${t==="USD"?"$":"\xA5"}${r.toLocaleString(T(),{maximumFractionDigits:4})}`}function wt(e){let t=O(e);return t==null?"\u2014":t>=1e6?`${(t/1e6).toLocaleString(T(),{maximumFractionDigits:1})}M`:t>=1e3?`${(t/1e3).toLocaleString(T(),{maximumFractionDigits:0})}K`:t.toLocaleString(T())}function sn(e){return P[e]||e||l("pricing.unknownVendor")}function I(e){let t=sn(e);return t==="Anthropic"?"Claude":t}var kt={};function _t(e){let t=Q(e,kt,P),r=String(t.seo_slug||"").trim(),n=String(t.seo_intro||"").trim(),s=String(t.icon_url||"").trim();return r&&n&&s?`/brands/${encodeURIComponent(r)}/`:""}function Ve(e,t){let r=Y(e),n=I(e),s=t||r?.iconUrl||"";return B(s,n,"brand-icon brand-icon--tab")}function de(e){let t=String(e.raw?.lifecycle_status||"").trim().toLowerCase();if(t)return t==="legacy";if(String(e.vendor||"").trim().toLowerCase()!=="anthropic")return!1;let r=String(e.raw?.model_id||e.raw?.id||e.id||"").trim().toLowerCase().replace(/[._]/g,"-");return an.has(r)}function Ke(e){let t=String(e.raw?.release_date||"").trim();if(!t)return null;let r=Date.parse(t);return Number.isFinite(r)?r:null}var Pe={release:{numeric:!0,raw:Ke},name:{labelKey:"pricing.th.name",numeric:!1},provider:{labelKey:"pricing.th.provider",numeric:!1},context:{labelKey:"pricing.th.context",numeric:!0,raw:e=>O(e.raw?.context_length)},input:{labelKey:"pricing.th.input",numeric:!0,raw:e=>O(e.raw?.input_price)},output:{labelKey:"pricing.th.output",numeric:!0,raw:e=>O(e.raw?.output_price)}};function ln(e,t,r){let n=Pe[t];if(!n)return e;let s=[...e];return s.sort((o,i)=>{if(t==="release"){let p=Number(de(o))-Number(de(i));if(p!==0)return p}let c=0;if(n.numeric){let p=n.raw(o),m=n.raw(i);if(p==null||m==null)return p==null&&m==null?0:p==null?1:-1;c=p-m}else t==="name"?c=(o.modelName||"").localeCompare(i.modelName||"",T()):t==="provider"&&(c=I(o.vendor).localeCompare(I(i.vendor),T()));return r==="desc"?-c:c}),s}function on(e){let t=new Map;for(let r of e){let n=I(r.vendor),s=t.get(n);s||(s={name:n,vendor:r.vendor,icon:r.logoUrl||r.providerIconUrl,models:[]},t.set(n,s)),s.models.push(r)}return[...t.values()]}function cn(e,t){let r=Number(de(t))-Number(de(e));if(r!==0)return r>0;let n=Ke(e),s=Ke(t);return n!=null&&s!=null?n>s:n!=null&&s==null}function dn(e){let t=new Map;for(let r of e){let n=I(r.vendor),s=t.get(n);(!s||cn(r,s))&&t.set(n,r)}return[...t.values()]}function un(e){let t=null;for(let r of e){let n=O(r.raw?.input_price);n==null||n<0||(!t||n<t.value)&&(t={value:n,currency:r.raw?.currency})}return t}function pn(e){let t=un(e.models),r=[];if(t){let n=t.currency==="USD"?"$":"\xA5";r.push(l("pricing.group.inputFrom",{symbol:n,price:t.value.toLocaleString(T(),{maximumFractionDigits:4})}))}return r.push(`${e.models.length} ${l("pricing.meta.models")}`),`<span class="plan-table-group-summary">${a(r.join(" \xB7 "))}</span>`}var Pt={name:e=>String(e.modelName||"").trim()||"\u2014",provider:e=>I(e.vendor),context:e=>wt(e.raw?.context_length),input:e=>_e(e.raw?.input_price,e.raw?.currency),output:e=>_e(e.raw?.output_price,e.raw?.currency)};function xt(e){return e==="\u2014"||e===l("pricing.pending")}function St(e,t){let r=Pt[t];return r?String(r(e)||"").trim()||"\u2014":""}function mn(e,t){let r=new Map;for(let s of e){let o=St(s,t);r.set(o,(r.get(o)||0)+1)}let n=new Intl.Collator(T(),{numeric:!0,sensitivity:"base"});return Array.from(r.entries()).map(([s,o])=>({value:s,count:o})).sort((s,o)=>{let i=xt(s.value),c=xt(o.value);return i!==c?i?1:-1:n.compare(s.value,o.value)})}function fn(e,t,r){return e!==t?'<svg class="model-price-sort-icon model-price-sort-icon--idle" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2l2.5 3h-5zM6 10l-2.5-3h5z" fill="currentColor"/></svg>':`<svg class="model-price-sort-icon" viewBox="0 0 12 12" aria-hidden="true"><path d="${r==="asc"?"M6 2l3 4H3z":"M6 10L3 6h6z"}" fill="currentColor"/></svg>`}function bn(e,t,r){let n=Pe[e],s=t.column===e&&!!t.value,o=mn(r,e);return`<button type="button" class="plan-column-filter-trigger model-price-filter-trigger${s?" is-active":""}" data-model-filter-column="${e}" aria-haspopup="menu" aria-expanded="false" title="${a(l("table.filter.tooltip"))} ${a(l(n.labelKey))}">
      <span class="plan-column-filter-caret" aria-hidden="true"></span>
    </button>
    <div class="plan-column-filter-menu" data-model-filter-menu="${e}" role="menu" hidden>
      <button type="button" class="plan-column-filter-option${s?"":" is-active"}" data-model-filter-value="">
        <span class="plan-column-filter-option-label">${a(l("table.filter.all"))}</span>
        <span class="plan-column-filter-option-count">${r.length}</span>
      </button>
      ${o.map(i=>`
        <button type="button" class="plan-column-filter-option${s&&i.value===t.value?" is-active":""}" data-model-filter-value="${a(i.value)}">
          <span class="plan-column-filter-option-label">${a(i.value)}</span>
          <span class="plan-column-filter-option-count">${i.count}</span>
        </button>
      `).join("")}
    </div>`}function vn(e,t,r,n){let s=(o,i="")=>{let c=Pe[o];return`<th class="model-price-th plan-column-filter ${i}" data-sort-key="${o}" role="columnheader" aria-sort="${o===e?t==="asc"?"ascending":"descending":"none"}" tabindex="0">
      <span class="model-price-th-inner">${a(l(c.labelKey))}${fn(o,e,t)}</span>
      ${bn(o,r,n)}
    </th>`};return`<thead class="model-price-thead">
    <tr>
      ${s("name")}
      ${s("provider","model-price-col-provider")}
      ${s("context")}
      ${s("input")}
      ${s("output")}
    </tr>
  </thead>`}function yn(e){let t=O(e.raw?.input_price),r=O(e.raw?.output_price),n=O(e.raw?.context_length),s=e.raw?.currency,o=_e(t,s),i=_e(r,s),c=wt(n),p=I(e.vendor),m=e.sourceUrl||e.raw?.docs_url||"",v=de(e)?`<span class="model-price-legacy-badge">${a(l("pricing.legacy"))}</span>`:"",$=m?`<a class="model-price-name-link" href="${a(m)}" target="_blank" rel="noopener noreferrer nofollow">${a(e.modelName)}</a>`:`<span>${a(e.modelName)}</span>`,x=_t(e.vendor),h=`${Ve(e.vendor,e.logoUrl||e.providerIconUrl)}<span>${a(p)}</span>`,g=x?`<a href="${a(x)}" class="model-price-provider plan-provider-cell--link">${h}</a>`:`<span class="model-price-provider">${h}</span>`;return`<tr class="model-price-row">
    <td class="model-price-td model-price-td--name">
      <span class="model-price-model-name">${$}${v}</span>
    </td>
    <td class="model-price-td model-price-td--provider model-price-col-provider">
      ${g}
    </td>
    <td class="model-price-td model-price-td--context">${a(c)}</td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${t==null?" model-price-value--empty":""}">${a(o)}</span>
      ${t!=null?`<span class="model-price-unit">${a(l("pricing.unit"))}</span>`:""}
    </td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${r==null?" model-price-value--empty":""}">${a(i)}</span>
      ${r!=null?`<span class="model-price-unit">${a(l("pricing.unit"))}</span>`:""}
    </td>
  </tr>`}function Lt(e,t,r={}){kt=r||{};let n=t.filter(u=>O(u.raw?.input_price)!=null||O(u.raw?.output_price)!=null),s=new Map;for(let u of n){let b=I(u.vendor);s.has(b)||s.set(b,{name:b,icon:u.logoUrl||u.providerIconUrl,vendor:u.vendor})}let o=[...s.values()].sort((u,b)=>u.name.localeCompare(b.name,T())),i="all",c="release",p="desc",m="brand",v="all",$="",x="",h="",g=new Set;function w(){return!!(x&&h&&Pt[x])}function L(){return m==="model"?v==="all"?n:n.filter(u=>(u.modelName||"")===v):i==="all"?n:n.filter(u=>I(u.vendor)===i)}function A(){let u=L(),b=$.toLowerCase();return b&&(u=u.filter(y=>String(y.modelName||"").toLowerCase().includes(b)||I(y.vendor).toLowerCase().includes(b))),u}function F(u){let b=u;return w()&&(b=b.filter(y=>St(y,x)===h)),ln(b,c,p)}function C(){return m==="model"?X():K()}function X(){let u=dn(n).sort((k,d)=>(k.modelName||"").localeCompare(d.modelName||"",T())),b=`<button type="button" class="brand-tab${v==="all"?" is-active":""}" data-model-tab="all">
      <span>${a(l("home.tab.all"))}</span><span class="brand-count">${n.length}</span>
    </button>`,y=u.map(k=>{let d=k.modelName||"";return`<button type="button" class="brand-tab${v===d?" is-active":""}" data-model-tab="${a(d)}">
        ${Ve(k.vendor,k.logoUrl||k.providerIconUrl)}
        <span>${a(d)}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${b}<span class="brand-divider"></span>${y}</div>`}function K(){let u=`<button type="button" class="brand-tab${i==="all"?" is-active":""}" data-provider="all">
      <span>${a(l("home.tab.all"))}</span><span class="brand-count">${n.length}</span>
    </button>`,b=o.map(y=>{let k=n.filter(d=>I(d.vendor)===y.name).length;return`<button type="button" class="brand-tab${i===y.name?" is-active":""}" data-provider="${a(y.name)}">
        ${Ve(y.vendor,y.icon)}
        <span>${a(y.name)}</span>
        <span class="brand-count">${k}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${u}<span class="brand-divider"></span>${b}</div>`}function j(u,b){let y=!b&&u.models.length>$t,k=b||!y||g.has(u.name),d=k?u.models:u.models.slice(0,$t),_=_t(u.vendor),E=`${B(u.icon||Y(u.vendor)?.iconUrl||"",u.name,"brand-icon brand-icon--section")}
            <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${a(u.name)}</span>`,D=`
            ${_?`<a href="${a(_)}" class="plan-table-group-brand">${E}</a>`:E}
            <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${u.models.length}</span>
            <span class="plan-table-group-right">
              ${pn(u)}
              ${y?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
            </span>`;return`
      <tr class="border-y border-slate-200 dark:border-slate-700">
        <td colspan="5" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
          ${y?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-model-group-toggle="${a(u.name)}" aria-expanded="${k?"true":"false"}" aria-label="${k?l("group.collapse"):l("group.expand")} ${a(u.name)}">${D}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${D}</div>`}
        </td>
      </tr>
      ${d.map(yn).join("")}`}function R(u,b){return w()?`<div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${a(l(Pe[x].labelKey))}</span>
        <strong>${a(h)}</strong>
      </span>
      <span class="plan-table-filter-count">${u} / ${b} ${a(l("table.filter.count"))}</span>
      <button type="button" class="plan-table-filter-clear" data-model-filter-clear>${a(l("table.filter.clear"))}</button>
    </div>`:""}function G(){let u=A();if(!u.length)return`<p class="model-price-empty">${a(l("pricing.empty"))}</p>`;let b=F(u),y=i!=="all"||v!=="all"||w()||!!$,k=b.length?on(b).map(d=>j(d,y)).join(""):`<tr>
          <td colspan="5" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">${a(l("pricing.empty"))}</td>
        </tr>`;return`${R(b.length,u.length)}
    <div class="model-price-table-wrap">
      <table class="model-price-table" role="grid" aria-label="${a(l("pricing.table.aria"))}">
        ${vn(c,p,{column:x,value:h},u)}
        <tbody class="model-price-tbody">
          ${k}
        </tbody>
      </table>
    </div>
    <p class="model-price-footnote">${a(l("pricing.footnote"))}</p>`}function te(){return`<div class="brand-filter-row model-price-toolbar">
      <div class="brand-tab-list">
        <button type="button" data-model-dimension="brand" class="brand-tab${m==="brand"?" is-active":""}"><span>${a(l("home.dimension.brand"))}</span></button>
        <button type="button" data-model-dimension="model" class="brand-tab${m==="model"?" is-active":""}"><span>${a(l("home.dimension.model"))}</span></button>
      </div>
      <div class="brand-search-box">
        <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
        <input type="search" class="brand-search-input" data-model-search placeholder="${a(l("home.search.model"))}" autocomplete="off" aria-label="${a(l("home.search.aria"))}" value="${a($)}">
      </div>
    </div>`}function ue(){e.innerHTML=`
      <div class="model-price-view">
        ${te()}
        <div class="model-price-content" data-model-price-content></div>
      </div>`,ee(),N()}function N(){let u=e.querySelector("[data-model-price-content]");u&&(u.innerHTML=`${C()}${G()}`,ae())}function ee(){e.querySelectorAll("[data-model-dimension]").forEach(b=>{b.addEventListener("click",()=>{let y=b.dataset.modelDimension;if(y===m)return;m=y,i="all",v="all",$="";let k=e.querySelector("[data-model-search]");k&&(k.value=""),e.querySelectorAll("[data-model-dimension]").forEach(d=>{d.classList.toggle("is-active",d.dataset.modelDimension===y)}),N()})});let u=e.querySelector("[data-model-search]");u?.addEventListener("input",()=>{$=u.value.trim(),N()})}function z(){e.querySelectorAll(".plan-column-filter-menu").forEach(u=>{u.hidden=!0}),e.querySelectorAll("[data-model-filter-column]").forEach(u=>u.setAttribute("aria-expanded","false"))}function ae(){e.querySelectorAll(".model-price-tabs .brand-tab").forEach(u=>{u.addEventListener("click",()=>{u.dataset.modelTab!=null?v=u.dataset.modelTab:i=u.dataset.provider,N()})}),e.querySelectorAll("[data-model-group-toggle]").forEach(u=>{let b=y=>{if(y?.target?.closest?.("a"))return;let k=u.dataset.modelGroupToggle;g.has(k)?g.delete(k):g.add(k),N()};u.addEventListener("click",b),u.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),b(y))})}),e.querySelectorAll("[data-model-filter-column]").forEach(u=>{u.addEventListener("click",b=>{b.stopPropagation();let y=u.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!y)return;let k=!y.hidden;z(),k||(y.hidden=!1,u.setAttribute("aria-expanded","true"))}),u.addEventListener("keydown",b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),b.stopPropagation(),u.click())})}),e.querySelectorAll("[data-model-filter-menu]").forEach(u=>{u.addEventListener("click",b=>{b.stopPropagation();let y=b.target.closest("[data-model-filter-value]");if(!y)return;let k=y.dataset.modelFilterValue||"";x=k?u.dataset.modelFilterMenu:"",h=k,N()})}),e.querySelectorAll("[data-model-filter-clear]").forEach(u=>{u.addEventListener("click",()=>{x="",h="",N()})}),e.querySelectorAll(".model-price-th[data-sort-key]").forEach(u=>{let b=y=>{if(y?.target?.closest?.(".plan-column-filter-trigger, .plan-column-filter-menu"))return;let k=u.dataset.sortKey;c===k?p=p==="asc"?"desc":"asc":(c=k,p="asc"),N()};u.addEventListener("click",b),u.addEventListener("keydown",y=>{(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),b(y))})})}e._modelFilterDocClose&&(document.removeEventListener("click",e._modelFilterDocClose),document.removeEventListener("keydown",e._modelFilterDocKey)),e._modelFilterDocClose=u=>{e.contains(u.target)||z()},e._modelFilterDocKey=u=>{u.key==="Escape"&&z()},document.addEventListener("click",e._modelFilterDocClose),document.addEventListener("keydown",e._modelFilterDocKey),ue()}var Ct=7.2,Et=[{id:"light",labelKey:"advisor.usage.light",value:500},{id:"medium",labelKey:"advisor.usage.medium",value:3e3},{id:"heavy",labelKey:"advisor.usage.heavy",value:1e4},{id:"extreme",labelKey:"advisor.usage.extreme",value:3e4}],gn={Anthropic:"Claude",Claude:"Claude",ChatGPT:"GPT",ChartGPT:"GPT",Google:"Gemini","Google Antigravity":"Gemini",Grok:"Grok","Z.ai":"GLM",BytePlus:"Doubao",\u963F\u91CC\u4E91:"Qwen",StepFun:"Step",\u9636\u8DC3\u661F\u8FB0:"Step",Cursor:"Cursor",Qoder:"Qoder",Trae:"Trae",OpenCode:"OpenCode"},Tt=8;function je(e){let t=String(e||"").trim();if(!t||/未指定|无明确|未公开|不适用|待更新|待确认|unspecified|not specified|n\/a|tbd|unknown/i.test(t))return null;let r=t.replace(/,/g,"").match(/(\d+(?:\.\d+)?)\s*(万)?/);if(!r)return null;let n=parseFloat(r[1])*(r[2]==="\u4E07"?1e4:1);return Number.isFinite(n)&&n>0?n:null}function hn(e){let t=je(e.monthlyRequests);if(t!=null)return{value:t,estimated:/约|估算|approx|estimat/i.test(e.monthlyRequests),basis:"monthly"};let r=je(e.weeklyRequests);if(r!=null)return{value:Math.round(r*4.3),estimated:!0,basis:"weekly"};let n=je(e.fiveHoursRequests);return n!=null?{value:n*30,estimated:!0,basis:"fiveHours"}:null}function $n(e){let t=[{value:e.monthlyPriceValue,cycle:"monthly"},{value:e.quarterlyMonthlyPriceValue,cycle:"quarterly"},{value:e.annualMonthlyPriceValue,cycle:"annual"}].filter(s=>Number.isFinite(s.value)&&s.value>=0);if(!t.length)return null;let r=t.reduce((s,o)=>o.value<s.value?o:s),n=e.monthlyCurrency==="CNY";return{value:r.value,cycle:r.cycle,currency:e.monthlyCurrency||"USD",usd:n?r.value/Ct:r.value}}function xn(e){return gn[e.provider]||e.provider||"Other"}function wn(e,t){let r=new Map;for(let o of e)o.id&&r.set(o.id,xn(o));let n=new Map;for(let o of t){let i=new Set((o.modelIds||[]).map(c=>r.get(c)).filter(Boolean));for(let c of i)n.set(c,(n.get(c)||0)+1)}return{options:[...n.entries()].map(([o,i])=>({family:o,count:i})).sort((o,i)=>i.count-o.count||o.family.localeCompare(i.family,"en")),familyByModelId:r}}function kn(e,t){return new Set((e.modelIds||[]).map(r=>t.get(r)).filter(Boolean))}function _n(e,t,r){let{families:n,usage:s,budget:o}=t,i=[],c=0;for(let p of e){if(p.planType==="api_package"){c+=1;continue}let m=$n(p);if(o!=null&&m&&m.usd>o)continue;let v=!1;if(n.size){let g=kn(p,r);if(!g.size)v=!0;else if(![...g].some(w=>n.has(w)))continue}let $=hn(p),x=$&&m&&$.value>0?m.usd/$.value*1e3:null,h;v?h=4:$?$.value>=s?h=1:h=2:h=3,i.push({plan:p,price:m,quota:$,costPer1k:x,tier:h})}return i.sort((p,m)=>{if(p.tier!==m.tier)return p.tier-m.tier;if((p.tier===1||p.tier===2)&&p.costPer1k!==m.costPer1k)return(p.costPer1k??1/0)-(m.costPer1k??1/0);let v=p.price?p.price.usd:1/0,$=m.price?m.price.usd:1/0;return v-$}),{results:i,paygoCount:c}}function At(e){return Math.round(e).toLocaleString(T())}function Mt(e,t="USD"){return`${t==="CNY"?"\xA5":"$"}${e.toLocaleString(T(),{maximumFractionDigits:e<10?2:0})}`}function Pn(e,t){let{plan:r,price:n,quota:s,costPer1k:o,tier:i}=e,c=W(r.provider,t,P),p=[];if(i===1?p.push(`<span class="plan-advisor-chip plan-advisor-chip--good">${a(l("advisor.chip.enough"))}</span>`):i===2?p.push(`<span class="plan-advisor-chip plan-advisor-chip--warn">${a(l("advisor.chip.short"))}</span>`):i===3?p.push(`<span class="plan-advisor-chip plan-advisor-chip--muted">${a(l("advisor.chip.unknown"))}</span>`):p.push(`<span class="plan-advisor-chip plan-advisor-chip--muted">${a(l("advisor.chip.unlabeled"))}</span>`),s){let h=s.estimated?`\uFF08${a(l("advisor.chip.estimated",{basis:l(`advisor.basis.${s.basis}`)}))}\uFF09`:"";p.push(`<span class="plan-advisor-chip">${a(l("advisor.chip.monthlyQuota",{n:At(s.value)}))}${h}</span>`)}if(o!=null&&p.push(`<span class="plan-advisor-chip">${a(l("advisor.chip.per1k",{price:Mt(o)}))}</span>`),r.supportedModelNames?.length){let h=r.supportedModelNames.slice(0,3).join(" / "),g=r.supportedModelNames.length>3?" \u2026":"";p.push(`<span class="plan-advisor-chip">${a(l("advisor.chip.supports",{models:h+g}))}</span>`)}let m=`<span class="plan-advisor-price-muted">${a(l("advisor.price.official"))}</span>`;if(n){let h=n.cycle!=="monthly"?`<span class="plan-advisor-cycle">${a(l(`advisor.cycle.${n.cycle}`))}</span>`:"",g=n.currency==="CNY"?`<span class="plan-advisor-price-note">${a(l("advisor.price.cnyNote",{n:At(n.usd),rate:Ct}))}</span>`:"";m=`<span class="plan-advisor-price">${Mt(n.value,n.currency)}/${a(l("common.perMonth"))}</span>${h}${g}`}let v=me(r.url),$=v?he(r,v):null,x=$?`<a href="${a($.href)}" target="_blank" rel="${$.rel}" ${ge(r)} class="plan-advisor-link">${a(l("advisor.link"))}</a>`:"";return`
    <li class="plan-advisor-result">
      <div class="plan-advisor-result-head">
        ${B(r.providerIconUrl,c,"brand-icon plan-advisor-result-icon")}
        <div class="plan-advisor-result-name">
          <strong>${a(r.name)}</strong>
          <span>${a(c)}</span>
        </div>
        <div class="plan-advisor-result-price">${m}</div>
      </div>
      <div class="plan-advisor-result-chips">${p.join("")}</div>
      ${x}
    </li>
  `}function Sn(e){return`
    <div class="plan-advisor-dialog" role="dialog" aria-modal="true" aria-labelledby="planAdvisorTitle" tabindex="-1">
      <div class="plan-advisor-head">
        <h2 id="planAdvisorTitle">${a(l("advisor.title"))}</h2>
        <button type="button" class="plan-advisor-close" data-advisor-close aria-label="${a(l("advisor.close.aria"))}">\u2715</button>
      </div>
      <div class="plan-advisor-body">
        <div class="plan-advisor-form">
          <div class="plan-advisor-field">
            <span class="plan-advisor-label">${a(l("advisor.family.label"))}<small>${a(l("advisor.family.hint"))}</small></span>
            <div class="plan-advisor-options" data-advisor-families>
              ${e.map(t=>`
                <button type="button" class="plan-advisor-option" data-family="${a(t.family)}" aria-pressed="false">
                  ${a(t.family)}<span class="plan-advisor-option-count">${t.count}</span>
                </button>
              `).join("")}
            </div>
          </div>
          <div class="plan-advisor-field">
            <span class="plan-advisor-label">${a(l("advisor.usage.label"))}</span>
            <div class="plan-advisor-options" data-advisor-usage>
              ${Et.map(t=>`
                <button type="button" class="plan-advisor-option${t.id==="medium"?" is-active":""}" data-usage="${t.value}" aria-pressed="${t.id==="medium"}">
                  ${a(l(t.labelKey))}
                </button>
              `).join("")}
              <input type="number" min="1" class="plan-advisor-input" data-advisor-usage-custom placeholder="${a(l("advisor.usage.custom"))}" aria-label="${a(l("advisor.usage.custom"))}">
            </div>
          </div>
          <div class="plan-advisor-field plan-advisor-field--row">
            <label class="plan-advisor-budget">
              <span>${a(l("advisor.budget"))}</span>
              <input type="number" min="0" class="plan-advisor-input" data-advisor-budget placeholder="${a(l("advisor.budget.placeholder"))}" aria-label="${a(l("advisor.budget"))}">
            </label>
          </div>
        </div>
        <div class="plan-advisor-results" data-advisor-results aria-live="polite"></div>
      </div>
      <p class="plan-advisor-disclaimer">${a(l("advisor.disclaimer"))}</p>
    </div>
  `}function Ut({plans:e,providerInfo:t={},modelCatalog:r=[],fab:n}){if(!n)return null;let{options:s,familyByModelId:o}=wn(r,e),i={families:new Set,usage:Et[1].value,budget:null,showAll:!1},c=null,p=null,m=()=>{let h=c.querySelector("[data-advisor-results]"),{results:g,paygoCount:w}=_n(e,i,o);if(!g.length){h.innerHTML=`
        <p class="plan-advisor-empty">${a(l("advisor.empty"))}</p>
        ${w?`<p class="plan-advisor-paygo">${a(l("advisor.paygo",{n:w}))}</p>`:""}
      `;return}let L=i.showAll?g:g.slice(0,Tt);h.innerHTML=`
      <p class="plan-advisor-summary">${a(l("advisor.summary",{n:g.length}))}</p>
      <ol class="plan-advisor-list">
        ${L.map(A=>Pn(A,t)).join("")}
      </ol>
      ${g.length>Tt&&!i.showAll?`<button type="button" class="plan-advisor-more" data-advisor-more>${a(l("advisor.expand",{n:g.length}))}</button>`:""}
      ${w?`<p class="plan-advisor-paygo">${a(l("advisor.paygo",{n:w}))}</p>`:""}
    `},v=()=>{c&&(c.hidden=!0,document.body.style.overflow="",p?.focus?.())},$=()=>{c||(c=document.createElement("div"),c.className="plan-advisor-overlay",c.hidden=!0,c.innerHTML=Sn(s),document.body.appendChild(c),c.addEventListener("click",h=>{if(h.target.closest("[data-advisor-close]")){v();return}let g=h.target.closest("[data-family]");if(g){let L=g.dataset.family;i.families.has(L)?i.families.delete(L):i.families.add(L);let A=i.families.has(L);g.classList.toggle("is-active",A),g.setAttribute("aria-pressed",String(A)),i.showAll=!1,m();return}let w=h.target.closest("[data-usage]");if(w){i.usage=Number(w.dataset.usage),c.querySelectorAll("[data-usage]").forEach(A=>{let F=A===w;A.classList.toggle("is-active",F),A.setAttribute("aria-pressed",String(F))});let L=c.querySelector("[data-advisor-usage-custom]");L&&(L.value=""),i.showAll=!1,m();return}h.target.closest("[data-advisor-more]")&&(i.showAll=!0,m())}),c.querySelector("[data-advisor-usage-custom]")?.addEventListener("input",h=>{let g=Number(h.target.value);Number.isFinite(g)&&g>0&&(i.usage=g,c.querySelectorAll("[data-usage]").forEach(w=>{w.classList.remove("is-active"),w.setAttribute("aria-pressed","false")})),i.showAll=!1,m()}),c.querySelector("[data-advisor-budget]")?.addEventListener("input",h=>{let g=Number(h.target.value);i.budget=Number.isFinite(g)&&g>0?g:null,i.showAll=!1,m()}),document.addEventListener("keydown",h=>{h.key==="Escape"&&c&&!c.hidden&&v()}))},x=()=>{$(),p=document.activeElement,c.hidden=!1,document.body.style.overflow="hidden",m(),c.querySelector(".plan-advisor-dialog")?.focus()};return n.addEventListener("click",x),{open:x,close:v}}var Fr=[{id:"low-cost",label:l("scenario.lowCost")},{id:"long-context",label:l("scenario.longContext")},{id:"multimodal",label:l("scenario.multimodal")},{id:"enterprise-api",label:l("scenario.enterpriseApi")},{id:"personal-use",label:l("scenario.personalUse")}];async function Ln(){let e=rt(),t=e?"backend":"static",r=await Dt(at()),n=e&&pe()==="en"?await Dt("/data.json"):null;return{...Tn(Mn(r,n),t),dataUnavailable:!r}}async function Bt(){let e=await Ln(),t=e.models.flatMap(s=>Nn(s,e.providerInfo)),r=e.modelCatalog||[],n=new Map(r.map(s=>[s.id,s.name]));for(let s of t)s.supportedModelNames=(s.modelIds||[]).map(o=>n.get(o)).filter(Boolean);return{...e,plans:t,providerInfo:e.providerInfo||{},modelCatalog:r}}function Tn(e,t){if(e&&Array.isArray(e.models)){let r=e.models.map(n=>Dn(n,t));if(r.length)return{source:t,lastUpdated:e.last_updated||Kn(r.map(n=>n.updatedAt)),models:r,rawModels:e.models,providerInfo:e.provider_info||{},modelCatalog:An(e.model_catalog)}}return{source:t,lastUpdated:e?.last_updated||"unknown",models:[],rawModels:[],providerInfo:e?.provider_info||{},modelCatalog:[]}}function An(e){return Array.isArray(e)?e.map(t=>({id:f(t.id),name:f(S(t.name,t.name_en),t.id||""),provider:f(t.provider,""),providerIconUrl:f(t.provider_icon_url,""),logoUrl:f(t.logo_url,""),sortOrder:V(t.sort_order),marketRegion:f(t.market_region,"")})).filter(t=>t.id):[]}async function Dt(e){try{let t=await fetch(e,{headers:{Accept:"application/json"}});return t.ok?await t.json():null}catch{return null}}function Mn(e,t){if(!e||!Array.isArray(e.models)||!t||!Array.isArray(t.models))return e;let r=new Map(t.models.map(s=>[Se(s),s]).filter(([s])=>s)),n=e.models.map(s=>{let o=r.get(Se(s));return o?Te(s,o):s});return{...e,models:n,provider_info:Cn(e.provider_info,t.provider_info)}}function Cn(e={},t={}){let r=new Set([...Object.keys(t||{}),...Object.keys(e||{})]),n={};for(let s of r)n[s]=Te(e?.[s]||{},t?.[s]||{});return n}function Te(e,t){if(!e||typeof e!="object"||Array.isArray(e)||!t||typeof t!="object"||Array.isArray(t))return e;let r={...e};for(let[n,s]of Object.entries(t)){let o=e[n];n==="package_plans"&&Array.isArray(o)&&Array.isArray(s)?r[n]=En(o,s):o&&typeof o=="object"&&!Array.isArray(o)&&s&&typeof s=="object"&&!Array.isArray(s)?r[n]=Te(o,s):typeof o=="string"||typeof s=="string"?r[n]=Un(o,s):o==null&&(r[n]=s)}return r}function En(e,t){let r=new Map(t.map(n=>[Se(n),n]).filter(([n])=>n));return e.map(n=>{let s=r.get(Se(n));return s?Te(n,s):n})}function Un(e,t){let r=String(t??"").trim();if(!r)return e;let n=String(e??"").trim();return n?Nt(n)&&!Nt(r)?t:e:t}function Nt(e){return/[\u3400-\u9fff]/.test(String(e||""))}function Se(e){return String(e?.id||e?.model_id||e?.plan_id||e?.planId||"").trim()}function Dn(e,t){let r=Array.isArray(e.capabilities)?e.capabilities:[],n=V(e.input_price),s=V(e.context_length),o=Ae(S(e.plan_summary,e.plan_summary_en),S(e.access_notes,e.access_notes_en),S(e.notes,e.notes_en)),i=Bn(e,n,s,r);return{id:f(e.id),vendor:f(e.provider,"\u5F85\u66F4\u65B0"),providerIconUrl:f(e.provider_icon_url,e.icon_url||""),logoUrl:f(e.logo_url,""),modelName:f(S(e.name,e.name_en),"\u5F85\u66F4\u65B0"),inputPrice:Ft(e.input_price,e.currency),outputPrice:Ft(e.output_price,e.currency),contextLength:Vn(e.context_length),multimodal:r.includes("vision")?"\u652F\u6301":"\u5F85\u786E\u8BA4",apiSupport:"\u652F\u6301",rmbRecharge:f(S(e.rmb_recharge_support,e.rmb_recharge_support_en),"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"),invoice:f(S(e.invoice_support,e.invoice_support_en),"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"),rmbRechargeRaw:e.rmb_recharge_support??null,invoiceRaw:e.invoice_support??null,accessLevel:f(e.access_level,""),marketRegion:f(e.market_region,""),marketRegionLabel:f(e.market_region_label,""),scenarios:i,suitableFor:f(S(e.suitable_for,e.suitable_for_en),o||"\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"),updatedAt:f(e.last_updated,e.release_date||"\u5F85\u66F4\u65B0"),sourceUrl:f(e.docs_url,e.plan_url||""),packagePlans:Array.isArray(e.package_plans)?e.package_plans:[],source:t,raw:e}}function Nn(e,t={}){return(e.packagePlans||[]).filter(n=>n.status!=="discontinued").map(n=>{let s=V(n.monthly_price),o=V(n.quarterly_price),i=V(n.annual_price),c=Rn(n,e),p=f(n.provider,e.vendor),m=t[p]||{},v=qn(p,t),$=Fn(p,t);return{id:f(n.id,`${e.id}-plan`),planId:f(n.planId,n.plan_id||""),brand:f(n.brand,n.brand_slug||""),name:f(S(n.name,n.name_en),"\u5F85\u66F4\u65B0\u5957\u9910"),provider:p,providerIconUrl:f(n.provider_icon_url,n.icon_url,e.providerIconUrl),modelName:e.modelName,modelId:f(n.model_id,e.id),modelIds:Array.isArray(n.model_ids)?n.model_ids.map(x=>String(x||"").trim()).filter(Boolean):[],status:f(n.status,"unknown"),statusLabel:(()=>{if(n.status){let x=l(`status.${n.status}`);if(!x.startsWith("status."))return x}return f(n.status_label,l("status.pending"))})(),url:f(S(n.url_cn,n.url_en),n.url_en,n.url_cn),monthlyPrice:Ge(n.monthly_price,c),monthlyPriceValue:s,monthlyCurrency:c,monthlyCurrencyLabel:c==="USD"?l("currency.usd"):l("currency.cny"),quarterlyPrice:o!=null?ze(n.quarterly_price,c,l("common.perQuarter")):"",quarterlyPriceValue:o,quarterlyMonthlyPrice:o!=null?Ge(o/3,c):"",quarterlyMonthlyPriceValue:o!=null?o/3:null,annualPrice:i!=null?ze(n.annual_price,c,l("common.perYear")):"",annualPriceValue:i,annualMonthlyPrice:i!=null?Ge(i/12,c):"",annualMonthlyPriceValue:i!=null?i/12:null,includedCalls:f(S(n.included_calls,n.included_calls_en),""),notes:f(S(n.notes,n.notes_en),""),planType:f(n.plan_type,qt(n,e)),category:qt(n,e),rmbRecharge:e.rmbRecharge,invoice:e.invoice,rmbRechargeRaw:e.rmbRechargeRaw,invoiceRaw:e.invoiceRaw,accessLevel:e.accessLevel,marketRegion:e.marketRegion,marketRegionLabel:e.marketRegionLabel,firstMonthPrice:n.first_month_price!=null?n.first_month_price:null,fiveHoursRequests:f(S(n.five_hours_requests,n.five_hours_requests_en),""),weeklyRequests:f(S(n.weekly_requests,n.weekly_requests_en),""),monthlyRequests:f(S(n.monthly_requests,n.monthly_requests_en),""),measuredFiveHoursTokens:f(n.measured_five_hours_tokens,""),measuredWeeklyTokens:f(n.measured_weekly_tokens,""),measuredMonthlyTokens:f(n.measured_monthly_tokens,""),tokenLimit:f(n.token_limit,""),supportedModels:f(S(n.supported_models,n.supported_models_en),S(m.supported_models,m.supported_models_en)||""),benefits:f(S(n.benefits,n.benefits_en),""),rating:f(n.rating,""),tags:f(S(n.tags,n.tags_en),""),sourceUrl:f(n.source_url,""),lastVerifiedAt:f(n.last_verified_at,""),refundPolicy:f(S(n.refund_policy,n.refund_policy_en),""),billingCycle:f(n.billing_cycle,""),creditsLimit:f(S(n.credits_limit,n.credits_limit_en),""),concurrencyLimit:f(n.concurrency_limit,""),resetRule:f(S(n.reset_rule,n.reset_rule_en),""),limitType:f(n.limit_type,In(n)),dataStatus:f(n.data_status,On(n)),confidenceScore:n.confidence_score!=null?n.confidence_score:null,sourceType:f(n.source_type,""),toolCompatibility:Z(n.tool_compatibility_json,{}),modelMultiplier:Z(n.model_multiplier_json,{}),derivedMetrics:Z(n.derived_metrics_json,{}),measuredMetrics:Z(n.measured_metrics_json,{}),risk:Z(n.risk_json,{}),recommendation:Z(n.recommendation_json,{}),changeSummary:Z(n.change_summary_json,{}),linkType:f(n.link_type,"official"),hasAffiliate:n.has_affiliate===!0,domesticPayment:v??Le(n.domestic_payment),intlNetwork:$??Le(n.intl_network),hasFirstMonthDiscount:n.has_first_month_discount===!0||n.has_first_month_discount===1,recommendationText:f(S(n.recommendation_text,n.recommendation_text_en),""),riskText:f(S(n.risk_text,n.risk_text_en),""),sortOrder:V(n.sort_order),privacyOverride:Z(n.privacy_override_json,{}),raw:n}})}function qn(e,t={}){let r=f(e);if(!r)return null;let n=t[r];return!n||n.domestic_payment==null?null:Le(n.domestic_payment)}function Fn(e,t={}){let r=f(e);if(!r)return null;let n=t[r];return!n||n.intl_network==null?null:Le(n.intl_network)}function Bn(e,t,r,n){let s=Ae(e.name,e.provider,e.notes,e.plan_summary,e.access_notes).toLowerCase(),o=new Set(["enterprise-api"]);return t!=null&&t<=2&&o.add("low-cost"),r!=null&&r>=2e5&&o.add("long-context"),n.includes("vision")&&o.add("multimodal"),/个人|会员|订阅|聊天|kimi|豆包/.test(s)&&o.add("personal-use"),Array.from(o)}function Z(e,t){if(!e||typeof e!="string")return e||t;try{return JSON.parse(e)}catch{return t}}function In(e){return e.five_hours_requests?"five_hours":e.weekly_requests?"weekly":e.monthly_requests?"monthly":e.token_limit?"token":e.credits_limit?"credits":"undisclosed"}function On(e){return e.last_verified_at?"verified":e.measured_monthly_tokens||e.measured_weekly_tokens?"measured":"pending"}function qt(e,t){let r=Ae(e.name,e.provider,e.notes,t.vendor,t.modelName).toLowerCase();return/聚合|路由|硅基|siliconflow/.test(r)?"aggregated_router":/会员|订阅|chat|清言|kimi|豆包/.test(r)?"personal_subscription":/maas|百炼|千帆|腾讯云|火山方舟|企业/.test(r)?"enterprise_maas":/开源|部署|私有化/.test(r)?"open_source_deploy":(/coding|qoder|claude code|cursor|trae/.test(r),"coding_plan")}function Rn(e,t){let r=f(e.monthly_currency).toUpperCase();if(r==="USD")return"USD";let n=f(t.market_region).toLowerCase(),s=n==="international"||n==="domestic_international";if(r==="CNY"&&s)return"USD";let o=f(e.provider,t.vendor),i=o.toLowerCase();if(i==="qoder"||i==="qoder cn"||i==="byteplus"||i==="z.ai"||i==="grok"||i==="claude"||i==="chartgpt"||i==="google antigravity"||i==="opencode"||i==="anthropic"||i==="openai"||s)return"USD";let c=Ae(e.name,o,e.url_cn,e.url_en,e.included_calls,e.notes).toLowerCase();return/\$|usd|美元|trae\.ai/.test(c)?"USD":"CNY"}function f(...e){let t=e.find(r=>r!=null&&String(r).trim());return t==null?"":String(t).trim()}function Le(e){if(e===!0||e===1)return!0;let t=String(e??"").trim().toLowerCase();return t==="true"||t==="1"||t==="yes"}function Hn(e){if(!e)return!1;let t=String(e).trim();return!t||/[\u4e00-\u9fff]/.test(t)?!1:(t.match(/[a-zA-Z]/g)||[]).length/t.length>.6}function S(e,t){return pe()==="en"&&t!=null&&String(t).trim()||pe()==="zh"&&Hn(e)&&t!=null&&String(t).trim()&&String(t).trim()!==String(e).trim()?t:e}function V(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function Ft(e,t){let r=V(e);return r==null?f(e,l("common.pending")):`${t==="USD"?"$":"\xA5"}${r.toLocaleString(T(),{maximumFractionDigits:4})}/${l("common.perMillionTokens")}`}function Ge(e,t="CNY"){return ze(e,t,l("common.perMonth"))}function ze(e,t="CNY",r=l("common.perMonth")){let n=V(e);return n==null?l("common.official"):`${t==="USD"?"$":"\xA5"}${n.toLocaleString(T(),{maximumFractionDigits:2})}/${r}`}function Vn(e){let t=V(e);return t==null?f(e,l("common.official")):t>=1e6?`${(t/1e6).toLocaleString(T(),{maximumFractionDigits:1})}M tokens`:t>=1e3?`${(t/1e3).toLocaleString(T(),{maximumFractionDigits:0})}K tokens`:`${t.toLocaleString(T())} tokens`}function Ae(...e){return e.filter(t=>t!=null&&String(t).trim()).join(" ")}function Kn(e){return e.find(t=>t&&t!=="\u5F85\u66F4\u65B0")||"\u5F85\u66F4\u65B0"}var jn=[{id:"all",labelKey:"home.tab.all"},{id:"free",labelKey:"home.tab.free"}];function Gn(e){let t=e.raw?.input_price,r=e.raw?.output_price;return t!=null&&t!==""||r!=null&&r!==""}function zn(e){let t=e.filter(r=>(r.monthlyCurrency||"USD")==="USD").map(r=>r.monthlyPriceValue).filter(r=>Number.isFinite(r)&&r>0);return t.length?t.reduce((r,n)=>r+n,0)/t.length:null}var M={codingPlanOverview:document.getElementById("codingPlanOverview")};function It(){M.codingPlanOverview&&(M.codingPlanOverview.classList.remove("plans-loading-shell"),M.codingPlanOverview.setAttribute("aria-busy","false"))}function Yn(e,t){let r=new Map;for(let n of e){let s=Y(n.provider),o=String(n.provider||"").trim(),i=P[o]||o;if(!i)continue;let c=Q(o,t,P),p=s?.id||i,m=r.get(p);m?m.iconUrl||(m.iconUrl=U(c.icon_url)||U(n.providerIconUrl)||U(s?.iconUrl)):(m={id:p,provider:o,label:W(o,t,P),iconUrl:U(c.icon_url)||U(n.providerIconUrl)||U(s?.iconUrl),sortOrder:se(o,t,P),plans:[]},r.set(p,m)),m.plans.push(n)}for(let n of r.values())n.plans=le(n.plans);return r}function Qn(e,t,r={}){let n=new Map;for(let s of t){let o=e.filter(p=>Array.isArray(p.modelIds)&&p.modelIds.includes(s.id));if(!o.length)continue;let i=Q(s.provider,r,P),c=U(s.logoUrl)||U(i.icon_url)||U(s.providerIconUrl)||U(Y(s.provider)?.iconUrl);n.set(`model:${s.id}`,{id:`model:${s.id}`,label:s.name||s.id,iconUrl:c,sortOrder:Number.isFinite(s.sortOrder)?s.sortOrder:99,plans:le(o)})}return n}function Wn(){return`
    <div class="cn-hero-banner" role="complementary" aria-label="${a(l("home.hero.aria"))}">
      <div class="cn-hero-banner__points">
        <span class="cn-hero-point"><span aria-hidden="true">$</span>${a(l("home.hero.usd"))}</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25A1</span>${a(l("home.hero.card"))}</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25C8</span>${a(l("home.hero.global"))}</span>
      </div>
      <a class="cn-hero-banner__intl" href="https://www.creditsplan.cn/" target="_blank" rel="noopener noreferrer">${a(l("home.hero.cnLink"))}</a>
    </div>
  `}function Jn(e){let t=M.codingPlanOverview.querySelector("#plansBackTop");if(!t||!e)return;let r=()=>{let n=e.getBoundingClientRect();t.classList.toggle("is-visible",n.top<-160&&n.bottom>160)};t.addEventListener("click",()=>{let n=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({behavior:n?"auto":"smooth",block:"start"})}),window.addEventListener("scroll",r,{passive:!0}),window.addEventListener("resize",r),r()}function Zn(){return`
    <div class="plans-export" id="plansExport">
      <button type="button" class="plans-export-trigger" id="plansExportTrigger" aria-haspopup="menu" aria-expanded="false" title="${a(l("export.trigger.title"))}">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
          <path d="M10 3v10m0 0 3.5-3.5M10 13 6.5 9.5M4 15.5h12" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>${a(l("export.trigger"))}</span>
      </button>
      <div class="plans-export-menu" id="plansExportMenu" role="menu" hidden>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="excel">
          <span class="plans-export-option-icon plans-export-option-icon--excel" aria-hidden="true">X</span>
          <span class="plans-export-option-text"><strong>Excel</strong><small>${a(l("export.excel.desc"))}</small></span>
        </button>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="word">
          <span class="plans-export-option-icon plans-export-option-icon--word" aria-hidden="true">W</span>
          <span class="plans-export-option-text"><strong>Word</strong><small>${a(l("export.word.desc"))}</small></span>
        </button>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="pdf">
          <span class="plans-export-option-icon plans-export-option-icon--pdf" aria-hidden="true">P</span>
          <span class="plans-export-option-text"><strong>PDF</strong><small>${a(l("export.pdf.desc"))}</small></span>
        </button>
      </div>
    </div>
  `}function Xn(e,t,r){let n=e.querySelector("#plansExportTrigger"),s=e.querySelector("#plansExportMenu");if(!n||!s)return;let o=()=>{s.hidden=!0,n.setAttribute("aria-expanded","false")};n.addEventListener("click",()=>{let i=s.hidden;s.hidden=!i,n.setAttribute("aria-expanded",String(i))}),document.addEventListener("click",i=>{e.querySelector("#plansExport")?.contains(i.target)||o()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&o()}),s.addEventListener("click",async i=>{let c=i.target.closest("[data-export-format]");if(!c)return;o();let p=t(),m=c.dataset.exportFormat,v=await import("./chunk.OPRNS4J4.js");m==="excel"?v.exportPlansExcel(p,r):m==="word"?v.exportPlansWord(p,r):m==="pdf"&&v.exportPlansPdf(p,r)})}function er(e,t={},r=[],n=[]){if(!M.codingPlanOverview)return;let s=ye(e,t,P),o=Yn(s,t),i=[...o.values()].sort((d,_)=>d.sortOrder-_.sortOrder),c=Qn(s,r,t),p=[...c.values()].sort((d,_)=>d.sortOrder-_.sortOrder||d.label.localeCompare(_.label,"zh-CN")),m={all:s.length,free:Ue(s).length},v=zn(s),$=`
            <span>${s.length} ${a(l("home.meta.records"))}</span>
            <span>${i.length} ${a(l("home.meta.brands"))}</span>
            <span>${p.length} ${a(l("home.meta.models"))}</span>
            ${v!=null?`<span>${a(l("home.meta.avgMonthly"))} $${Math.round(v)}</span>`:""}`;M.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div class="workbench-intro">
          <p class="workbench-kicker">${a(l("home.kicker"))}</p>
          <h1 id="codingPlanTitle" class="workbench-title">${a(l("home.title"))}</h1>
          <p id="workbenchSummary" class="workbench-summary">${a(l("home.summary"))}</p>
        </div>
        <div class="workbench-meta">
          <span id="workbenchStats">${$}
          </span>
          ${Zn()}
        </div>
      </div>
      ${Wn()}
      <div class="workbench-body">
        <div id="brandFilterBar" class="brand-filter-bar">
          <div class="brand-filter-row">
            <div id="dimensionSwitch" class="brand-tab-list">
              <button type="button" data-dimension="brand" class="brand-tab is-active"><span>${a(l("home.dimension.brand"))}</span></button>
              <button type="button" data-dimension="model" class="brand-tab"><span>${a(l("home.dimension.model"))}</span></button>
            </div>
            <div class="brand-search-box">
              <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
              <input id="brandSearchInput" type="search" class="brand-search-input" placeholder="${a(l("home.search.brand"))}" autocomplete="off" aria-label="${a(l("home.search.aria"))}">
            </div>
          </div>
          <div id="brandTabs" class="brand-tab-list">
            ${jn.map(d=>`
              <button type="button" data-brand="${d.id}" data-brand-label="${a(l(d.labelKey))}" class="brand-tab${d.id==="all"?" is-active":""}">
                <span>${a(l(d.labelKey))}</span>
                ${m[d.id]>0?`<span class="brand-count">${m[d.id]}</span>`:""}
              </button>
            `).join("")}
            <span class="brand-divider"></span>
            ${i.map(d=>`<button type="button" data-brand="${a(d.id)}" data-brand-label="${a(d.label)}" class="brand-tab">
                ${B(d.iconUrl,d.label,"brand-icon brand-icon--tab")}
                <span>${a(d.label)}</span>
                <span class="brand-count">${d.plans.length}</span>
              </button>`).join("")}
          </div>
          <div id="modelTabs" class="brand-tab-list" hidden>
            <button type="button" data-brand="all" data-brand-label="${a(l("home.tab.all"))}" class="brand-tab is-active">
              <span>${a(l("home.tab.all"))}</span>
              ${m.all>0?`<span class="brand-count">${m.all}</span>`:""}
            </button>
            <span class="brand-divider"></span>
            ${p.map(d=>`<button type="button" data-brand="${a(d.id)}" data-brand-label="${a(d.label)}" class="brand-tab">
                ${B(d.iconUrl,d.label,"brand-icon brand-icon--tab")}
                <span>${a(d.label)}</span>
                <span class="brand-count">${d.plans.length}</span>
              </button>`).join("")}
          </div>
        </div>
        <div id="brandDetail" class="brand-detail">
          ${He(s,"",t)}
        </div>
      </div>
    </section>
    <button id="plansBackTop" class="plans-back-top" type="button" aria-label="${a(l("home.backTop.aria"))}" title="${a(l("home.backTop.title"))}">
      <span aria-hidden="true">\u2191</span>
    </button>
    <button id="planAdvisorFab" class="plan-advisor-fab" type="button" aria-label="${a(l("advisor.fab.aria"))}" title="${a(l("advisor.fab.title"))}">
      <span aria-hidden="true">$</span>
      <span>${a(l("advisor.fab.label"))}</span>
    </button>
  `,It();let x=M.codingPlanOverview.querySelector(".plans-workbench"),h=M.codingPlanOverview.querySelector("#brandFilterBar"),g=M.codingPlanOverview.querySelector("#brandTabs"),w=M.codingPlanOverview.querySelector("#modelTabs"),L=M.codingPlanOverview.querySelector("#brandDetail");Jn(x);let A=M.codingPlanOverview.querySelector("#planAdvisorFab"),F=Ut({plans:s,providerInfo:t,modelCatalog:r,fab:A});F&&location.hash==="#advisor"&&F.open();let C=s;Xn(M.codingPlanOverview,()=>C,t);let X="all",K="brand",j="",R=new Set,G=()=>{if(K==="pricing"){Lt(L,n,t);return}L.innerHTML=He(C,j,t,R,X!=="all")},te=()=>{Re(),j="",R.clear()};vt(L,()=>C,()=>{R.clear(),G()},d=>{j=j===d?"":d,G()});let N=d=>{R.has(d)?R.delete(d):R.add(d),G()};L.addEventListener("click",d=>{if(d.target.closest("a"))return;let _=d.target.closest("[data-plan-group-toggle]");_&&N(_.dataset.planGroupToggle)}),L.addEventListener("keydown",d=>{if(d.key!=="Enter"&&d.key!==" ")return;let _=d.target.closest("[data-plan-group-toggle]");!_||_.tagName==="BUTTON"||d.target.closest("a")||(d.preventDefault(),N(_.dataset.planGroupToggle))});let ee=()=>{[g,w].forEach(d=>{d.querySelectorAll(".brand-tab").forEach(_=>_.classList.remove("is-active"))})},z=d=>{d==="all"?C=s:d==="free"?C=Ue(s):o.has(d)?C=o.get(d).plans:c.has(d)&&(C=c.get(d).plans)},ae=d=>{let _=M.codingPlanOverview.querySelector("#codingPlanTitle"),E=M.codingPlanOverview.querySelector("#workbenchSummary"),D=M.codingPlanOverview.querySelector("#workbenchStats");if(_&&(_.textContent=l(d==="pricing"?"pricing.title":"home.title")),E&&(E.textContent=l(d==="pricing"?"pricing.summary":"home.summary")),!!D)if(d==="pricing"){let ne=n.filter(Gn),Me=new Set(ne.map(Ye=>P[Ye.vendor]||Ye.vendor)).size;D.innerHTML=`<span>${ne.length} ${a(l("pricing.meta.models"))}</span><span>${Me} ${a(l("pricing.meta.vendors"))}</span>`}else D.innerHTML=$},u=d=>{if(d===K)return;K=d,h.querySelectorAll("[data-dimension]").forEach(E=>{E.classList.toggle("is-active",E.dataset.dimension===d)}),g.hidden=d!=="brand",w.hidden=d!=="model",b&&(b.placeholder=l(d==="brand"?"home.search.brand":"home.search.model")),te(),X="all",C=s,ee(),d==="pricing"?h.hidden=!0:(h.hidden=!1,(d==="brand"?g:w).querySelector('[data-brand="all"]')?.classList.add("is-active"));let _=M.codingPlanOverview.querySelector("#plansExport");_&&(_.hidden=d==="pricing"),A&&(A.hidden=d==="pricing"),b&&(b.value=""),y(),ae(d),tr(d),G()},b=M.codingPlanOverview.querySelector("#brandSearchInput"),y=()=>{let d=(b?.value||"").trim().toLowerCase(),_=K==="brand"?g:w;_.querySelectorAll(".brand-tab[data-brand]").forEach(D=>{let ne=D.dataset.brand;if(ne==="all"||ne==="free"){D.hidden=!1;return}let Me=(D.dataset.brandLabel||"").toLowerCase();D.hidden=d?!Me.includes(d):!1});let E=_.querySelector(".brand-divider");E&&(E.hidden=!1)};b?.addEventListener("input",y),h.addEventListener("click",d=>{let _=d.target.closest("[data-dimension]");if(_){u(_.dataset.dimension);return}let E=d.target.closest(".brand-tab");if(!E||!g.contains(E)&&!w.contains(E))return;let D=E.dataset.brand;te(),X=D,ee(),E.classList.add("is-active"),z(D),G()}),((globalThis.location?.pathname||"").replace(/\/+$/,"")||"/")==="/model"&&u("pricing")}function tr(e){if(typeof globalThis.history?.replaceState=="function")try{let t=new URL(globalThis.location.href),r=e==="pricing"?"/model":"/";globalThis.history.replaceState(null,"",`${r}${t.search}${t.hash}`)}catch{}}function nr(e){if(!M.codingPlanOverview)return;let t=e==="backend"?l("home.dataUnavailable.backend"):l("home.dataUnavailable.static");M.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div>
          <span id="codingPlanTitle" style="font-weight:bold">${a(l("home.dataUnavailable.title"))}</span>
        </div>
      </div>
      <div class="workbench-body">
        <p class="text-sm text-slate-600 dark:text-slate-300">${a(t)}</p>
      </div>
    </section>
  `,It()}async function rr(){Qe();let e=await Bt();if(e.dataUnavailable){nr(e.source);return}er(e.plans,e.providerInfo||{},e.modelCatalog||[],e.models||[])}rr();
