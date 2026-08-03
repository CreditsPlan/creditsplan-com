import{a as Ne,b as Ee}from"./chunk.7HYUNLOO.js";import{A as K,B as V,C as Ue,D as De,E as ie,a as x,b as _e,c as we,d as Pe,e as D,f as ee,g as B,h as T,i as te,j as Se,k as re,l as ne,m as H,n as j,p as Ae,q as Le,r as Te,s as M,t as ae,u as se,w as Ce,x as N,y as E,z as Me}from"./chunk.UHXCSBGC.js";import{a as w,c as _,e as R,f as ke,g as i,j as s,k as I}from"./chunk.7R2OF4PV.js";var ft=new Set(["\u5F85\u66F4\u65B0","\u5F85\u786E\u8BA4","\u8BF7\u4EE5\u5B98\u7F51\u4E3A\u51C6"]);function O(e){let t=String(e??"").trim();return t&&!ft.has(t)?t:"\u2014"}function F(e="",t=""){let n=String(t??"").trim();return{column:n?String(e??"").trim():"",value:n}}function le(e){return!!(e?.column&&e?.value)}function Fe(e,t,n){return le(t)?e.filter(r=>n(r,t.column)===t.value):e}var oe={};function qe(e){oe=e||{}}function mt(e){let t=B(e,oe,x);return t.training?i(`privacy.training.${t.training}`)||t.training:i("privacy.filter.notResearched")}var Re={token:"billing.token",credits:"billing.credits",five_hours:"billing.requests",weekly:"billing.requests",monthly:"billing.requests"};function ce(e){let t=Re[e.limitType];return t?i(t):i("billing.undisclosed")}function Ie(e){return!!Re[e.limitType]}var ue=[{key:"provider",labelKey:"table.col.provider",value:e=>T(e.provider,oe,x)||"\u2014"},{key:"name",labelKey:"table.col.name",value:e=>H(e.name)||"\u2014"},{key:"monthlyPrice",labelKey:"table.col.monthly",value:e=>O(e.monthlyPrice)},{key:"quarterlyPrice",labelKey:"table.col.quarterly",value:e=>O(e.quarterlyPrice)},{key:"annualPrice",labelKey:"table.col.annual",value:e=>O(e.annualPrice)},{key:"billingUnit",labelKey:"table.col.billingUnit",value:e=>ce(e)},{key:"quota",labelKey:"table.col.quota",value:e=>N(e)?.text||"\u2014"},{key:"unitPrice",labelKey:"table.col.unitPrice",value:e=>E(e)?.text||"\u2014"},{key:"model",labelKey:"table.col.model",value:e=>j(e)||"\u2014"},{key:"status",labelKey:"table.col.status",value:e=>H(e.statusLabel)||"\u2014"},{key:"domesticPayment",labelKey:"table.col.domesticPayment",value:e=>e.domesticPayment?i("common.supported"):"\u2014"},{key:"intlNetwork",labelKey:"table.col.intlNetwork",value:e=>e.intlNetwork?i("common.required"):"\u2014"},{key:"dataTraining",labelKey:"table.col.dataTraining",value:e=>mt(e)},{key:"verifiedAt",labelKey:"table.col.verified",value:e=>H(e.lastVerifiedAt)||i("table.verified.pending")},{key:"source",labelKey:"table.col.source",value:e=>e.url?i("table.source.name"):"\u2014"}],P=F(),U=!1,yt=new Intl.Collator(_(),{numeric:!0,sensitivity:"base"});function bt(e){return e.status==="available"||e.status==="rush_sale"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"}function Be(){return U}function yr(){U=!U}function de(e){return ue.find(t=>t.key===e)}function He(e,t){let n=de(t);return n?String(n.value(e)||"").trim()||"\u2014":""}function vt(){P=F(),U=!1}function z(){return le(P)&&!!de(P.column)}function je(e){let t=e;return U&&(t=t.filter(bt)),z()&&(t=Fe(t,P,He)),t}function Ke(e,t){return U?`
    <div class="plan-table-quick-filters">
      <span class="plan-table-filter-count">${s(i("table.quick.availableOnly"))}${w()==="en"?": ":"\uFF1A"}${e.length} / ${t.length}</span>
    </div>
  `:""}function gt(e,t){let n=new Map;for(let r of e){let a=He(r,t.key);n.set(a,(n.get(a)||0)+1)}return Array.from(n.entries()).map(([r,a])=>({value:r,count:a})).sort((r,a)=>r.value==="\u2014"&&a.value!=="\u2014"?1:a.value==="\u2014"&&r.value!=="\u2014"?-1:yt.compare(r.value,a.value))}function Ve(e,t){let n=P.column===e.key&&!!P.value,r=gt(t,e);return`
    <th scope="col" class="plan-column-filter break-words px-3 py-3 text-left font-semibold text-slate-900 dark:text-white">
      <button type="button" class="plan-column-filter-trigger${n?" is-active":""}" data-plan-filter-column="${s(e.key)}" aria-haspopup="menu" aria-expanded="false" title="${s(i("table.filter.tooltip"))} ${s(i(e.labelKey))}">
        <span class="plan-column-filter-label">${s(i(e.labelKey))}</span>
        <span class="plan-column-filter-caret" aria-hidden="true"></span>
      </button>
      <div class="plan-column-filter-menu" data-plan-filter-menu="${s(e.key)}" role="menu" hidden>
        <button type="button" class="plan-column-filter-option${n?"":" is-active"}" data-plan-filter-value="">
          <span class="plan-column-filter-option-label">${s(i("table.filter.all"))}</span>
          <span class="plan-column-filter-option-count">${t.length}</span>
        </button>
        ${r.map(a=>`
          <button type="button" class="plan-column-filter-option${n&&a.value===P.value?" is-active":""}" data-plan-filter-value="${s(a.value)}">
            <span class="plan-column-filter-option-label">${s(a.value)}</span>
            <span class="plan-column-filter-option-count">${a.count}</span>
          </button>
        `).join("")}
      </div>
    </th>
  `}function Oe(e,t){if(!z())return"";let n=de(P.column);return`
    <div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${s(i(n.labelKey))}</span>
        <strong>${s(P.value)}</strong>
      </span>
      <span class="plan-table-filter-count">${e.length} / ${t.length} ${s(i("table.filter.count"))}</span>
      <button type="button" class="plan-table-filter-clear" data-plan-filter-clear>${s(i("table.filter.clear"))}</button>
    </div>
  `}function G(e){e&&(e.querySelectorAll(".plan-column-filter-menu").forEach(t=>{t.hidden=!0}),e.querySelectorAll("[data-plan-filter-column]").forEach(t=>{t.setAttribute("aria-expanded","false")}))}function br(e,t,n,r){e.addEventListener("click",a=>{let o=a.target.closest("[data-plan-filter-column]");if(o&&e.contains(o)){let u=o.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!u)return;let m=!u.hidden;G(e),m||(u.hidden=!1,o.setAttribute("aria-expanded","true"));return}let l=a.target.closest("[data-plan-filter-value]");if(l&&e.contains(l)){let u=l.closest("[data-plan-filter-menu]"),m=l.dataset.planFilterValue||"";P=u&&m?F(u.dataset.planFilterMenu,m):F(),n();return}let d=a.target.closest("[data-plan-filter-clear]");if(d&&e.contains(d)){vt(),n();return}let p=a.target.closest("[data-plan-key]");if(p&&e.contains(p)&&!a.target.closest("a")){let u=p.dataset.planKey||"";ne(t(),u)&&r(u);return}a.target.closest(".plan-column-filter")||G(e)}),e.addEventListener("keydown",a=>{let o=a.target.closest("[data-plan-key]");if(!o||!e.contains(o)||a.target.closest("a")||a.key!=="Enter"&&a.key!==" ")return;a.preventDefault();let l=o.dataset.planKey||"";ne(t(),l)&&r(l)}),document.addEventListener("click",a=>{e.contains(a.target)||G(e)}),document.addEventListener("keydown",a=>{a.key==="Escape"&&G(e)})}var Y=2;function ht(e){let t=se(e.lastVerifiedAt);if(t.state==="fresh"){let n=t.days===0?i("verified.freshToday"):i("verified.freshDaysAgo",{n:t.days});return`<span class="whitespace-nowrap rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300" title="${s(i("verified.freshTitle",{date:t.date}))}">${s(n)}</span>`}return t.state==="stale"?`<span class="whitespace-nowrap rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:bg-amber-950/40 dark:text-amber-300" title="${s(i("verified.staleTitle",{date:t.date}))}">${s(i("verified.stale"))}</span>`:""}var xt={official:"bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300",api:"bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300",structured:"bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300",page:"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"};function pe(e){let t=Ce(e.sourceType);return t?`<span class="whitespace-nowrap rounded-md px-1.5 py-0.5 text-[10px] font-medium ${xt[t]}" title="${s(i(`source.${t}.title`))}">${s(i(`source.${t}`))}</span>`:""}function $t(e,t){let n=we(e.provider,t,x),r=Pe(e,n);return r?`/plans/${encodeURIComponent(r)}/`:""}function kt(e,t){let n=ee(e,t,x),r=String(n.seo_slug||"").trim(),a=String(n.seo_intro||"").trim(),o=String(n.icon_url||"").trim();return r&&a&&o?`/brands/${encodeURIComponent(r)}/`:""}function _t(e,t={}){let n=ee(e.provider,t,x);return D(n.icon_url)||D(e.providerIconUrl)||D(_e(e.provider)?.iconUrl)}function q(e,t,n="brand-icon"){let r=D(e),a=String(t||"?").trim().slice(0,1).toUpperCase()||"?",o=r?"brand-icon-fallback hidden":"brand-icon-fallback";return`<span class="${n}" aria-hidden="true">
    ${r?`<img class="brand-icon-img" src="${s(r)}" alt="" loading="lazy" referrerpolicy="no-referrer">`:""}
    <span class="${o}">${s(a)}</span>
  </span>`}function ze(e,t){let n=new Map;for(let a of e){let o=x[a.provider]||a.provider;n.has(o)||n.set(o,{provider:a.provider,label:T(a.provider,t,x),iconUrl:_t(a,t),brandHref:kt(a.provider,t),plans:[]}),n.get(o).plans.push(a)}let r=[...n.values()];for(let a of r)a.plans=Se(a.plans);return r.sort((a,o)=>te(a.provider,t,x)-te(o.provider,t,x)),r}function wt(e){return e.status==="available"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"}function Ye(e){if(!e.status)return s(e.statusLabel||"");let t=`status.${e.status}`,n=i(t);return s(n.startsWith("status.")?e.statusLabel||"":n)}function Pt(e){let t=null;if(Number.isFinite(e.monthlyPriceValue))t=e.monthlyPriceValue;else{let n=String(e.monthlyPrice||"").match(/[\d.]+/),r=n?parseFloat(n[0]):NaN;Number.isFinite(r)&&(t=r)}return t==null||t<0?null:{value:t,currency:e.monthlyCurrency||"USD"}}function St(e){let t=null;for(let n of e){let r=Pt(n);r&&(t==null||r.value<t.value)&&(t=r)}return t}function At(e){let t=St(e.plans),n=e.plans.filter(wt).length,r=[];t!=null&&r.push(t.value===0?i("group.summary.free"):i("group.summary.from",{symbol:Le(t.currency),price:Te(t.value)})),n>0&&r.push(i("group.summary.available",{n}));let a=r.join(" \xB7 ");return`<span class="plan-table-group-summary">${s(a)}</span>`}function Lt(e,t){let n=B(e,t,x);return n.training==="no"?`<span class="text-xs font-medium text-emerald-600 dark:text-emerald-400" title="${s(i("privacy.training.no"))}">${s(i("privacy.cell.no"))}</span>`:n.training==="yes"?`<span class="text-xs font-medium text-amber-600 dark:text-amber-400" title="${s(i("privacy.training.yes"))}">${s(i("privacy.cell.yes"))}</span>`:n.training==="unclear"?`<span class="text-xs text-slate-500 dark:text-slate-400">${s(i("privacy.training.unclear"))}</span>`:'<span class="text-slate-400">\u2014</span>'}function Qe(e){return e.status==="available"||e.statusLabel==="\u53EF\u7528"||e.statusLabel==="\u53EF\u8D2D\u4E70"?"bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300":e.status==="rush_sale"?"bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400":"bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}function Tt(e,t="",n="",r=!1){let a=Qe(e),o=e.includedCalls&&e.includedCalls.length>10&&(e.includedCalls.includes("\xA5")||e.includedCalls.includes("\u5143")||e.includedCalls.includes("\u767E\u4E07")),l=Me[e.planType]||e.planType||"",d,p=De(e);p?d=p:o?d=`<span class="text-sm font-semibold text-slate-700 dark:text-slate-300">${s(e.includedCalls)}</span>`:e.includedCalls||e.planType!=="api-usage"?d=`<span class="text-lg font-bold text-slate-500 dark:text-slate-400">${s(i("table.price.official"))}</span>`:d=`<span class="text-lg font-bold text-slate-400 dark:text-slate-500">${s(i("table.price.usage"))}</span>`;let u=N(e),m=E(e),b=u||m?`<div class="plan-card-quota-row mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        ${u?`<span title="${s(u.full)}">${s(i("table.col.quota"))}: ${s(u.text)}</span>`:""}
        ${m?`<span class="font-medium text-brand-700 dark:text-brand-300"${m.estimated?` title="${s(i("table.unitPrice.estimated"))}"`:""}>${s(m.text)}</span>`:""}
      </div>`:"";return`
    <div class="plan-card">
      <div class="plan-card-head">
        <div class="plan-card-title-row flex items-start justify-between gap-2">
          <div class="flex min-w-0 flex-1 items-start gap-2">
            ${t}
            <div class="min-w-0 flex-1">
              <p class="plan-card-title">${s(e.name)}</p>
            </div>
          </div>
          <div class="plan-card-meta flex shrink-0 flex-col items-end gap-1.5">
            <span class="whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium ${a}">${Ye(e)}</span>
            ${n}
            ${l?`<span class="whitespace-nowrap rounded-md bg-brand-50 px-1.5 py-0.5 text-[10px] font-medium text-brand-600 dark:bg-brand-950/40 dark:text-brand-300">${s(l)}</span>`:""}
            ${ht(e)}
            ${pe(e)}
          </div>
          <span class="plan-card-disclosure" aria-hidden="true">
            <span>${r?i("card.detail.collapse"):i("card.detail.expand")}</span>
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
  `}function Ct(e,t,n,r,a){return e.length?ze(e,n).map(o=>{let l=a||r.has(o.provider),p=(l?o.plans:o.plans.slice(0,Y)).map(y=>{let f=re(y),v=f===t,h=y.confidenceScore,$="trust-dot--yellow";h&&h>=.8?$="trust-dot--high":h&&h<.5&&($="trust-dot--red");let A=[y.domesticPayment?`<span class="plan-card-badge">${s(i("badge.domesticPayment"))}</span>`:"",ae(y)?`<span class="plan-card-badge plan-card-badge--intl" title="${s(i("badge.intl.title"))}">${s(String(y.monthlyCurrency||"USD").toUpperCase())}</span>`:""].filter(Boolean).join(""),X=`<span class="trust-dot ${$}" title="${s(i("trust.label"))}: ${h!=null?Math.round(h*100)+"%":i("common.unknown")}"></span>`;return`
        <article class="plan-card-mobile${v?" is-selected":""}">
          <div class="plan-card-toggle" role="button" tabindex="0" data-plan-key="${s(f)}" aria-expanded="${v?"true":"false"}">
            ${Tt(y,X,A,v)}
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
      </section>`}).join(""):""}function Ge(e,t,n,r,a=Y){let o=n?e.plans:e.plans.slice(0,a);return o.length?o.map(l=>{let d=re(l),p=d===t,u=Qe(l),m=Ue(l),b=M(l.monthlyPrice)?`<div>${s(l.monthlyPrice)}</div>${m?`<div class="plan-table-price-first">${s(i("table.price.firstMonth"))} ${s(m)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',y=M(l.quarterlyPrice)?`<div>${s(l.quarterlyPrice)}</div>${M(l.quarterlyMonthlyPrice)?`<div class="plan-table-price-sub">${s(i("table.price.approx"))} ${s(l.quarterlyMonthlyPrice)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',f=M(l.annualPrice)?`<div>${s(l.annualPrice)}</div>${M(l.annualMonthlyPrice)?`<div class="plan-table-price-sub">${s(i("table.price.approx"))} ${s(l.annualMonthlyPrice)}</div>`:""}`:'<span class="text-slate-400">\u2014</span>',v=N(l),h=v?`<span class="text-slate-700 dark:text-slate-300" title="${s(v.full)}">${s(v.text)}</span>`:'<span class="text-slate-400">\u2014</span>',$=Ie(l)?`<span class="billing-unit-badge billing-unit-badge--${s(l.limitType||"undisclosed")}">${s(ce(l))}</span>`:'<span class="text-slate-400">\u2014</span>',A=E(l),X=A?`<span class="whitespace-nowrap font-medium text-brand-700 dark:text-brand-300"${A.estimated?` title="${s(i("table.unitPrice.estimated"))}"`:""}>${s(A.text)}</span>`:'<span class="text-slate-400">\u2014</span>',C=se(l.lastVerifiedAt),at=C.state==="fresh"?`<span class="text-xs font-medium text-emerald-600 dark:text-emerald-400" title="${s(i("verified.freshTitle",{date:C.date}))}">${s(C.days===0?i("verified.tableToday"):i("verified.tableDaysAgo",{n:C.days}))}</span>`:C.state==="stale"?`<span class="text-xs font-medium text-amber-600 dark:text-amber-400" title="${s(i("verified.staleTitle",{date:C.date}))}">${s(i("verified.stale"))}</span>`:`<span class="text-xs text-slate-400">${s(i("table.verified.pending"))}</span>`,ve=I(l.url),ge=V(l,ve),st=ve?`<a href="${s(ge.href)}" target="_blank" rel="${ge.rel}" ${K(l)} class="text-sm font-medium text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">${s(i("table.source.site"))}</a>`:'<span class="text-slate-400">\u2014</span>',it=l.domesticPayment?`<span class="rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">${s(i("common.supported"))}</span>`:`<span class="text-slate-400">${s(i("common.notSupported"))}</span>`,lt=l.intlNetwork?`<span class="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">${s(i("common.required"))}</span>`:`<span class="text-slate-400">${s(i("common.notSupported"))}</span>`,ot=Lt(l,r),ct=p?`<tr class="plan-detail-row">
          <td colspan="15" class="plan-inline-detail-cell">
            ${ie(l,r)}
          </td>
        </tr>`:"",he=$t(l,r),xe=s(l.name),ut=ae(l)?` <span class="plan-intl-tag" title="${s(i("badge.intl.title"))}">${s(String(l.monthlyCurrency||"USD").toUpperCase())}</span>`:"",dt=(he?`<a href="${s(he)}" class="font-medium text-brand-700 hover:text-brand-900 hover:underline dark:text-brand-300 dark:hover:text-brand-200">${xe}</a>`:xe)+ut,$e=`${q(e.iconUrl,e.label,"brand-icon brand-icon--table")}<span>${s(e.label)}</span>`,pt=e.brandHref?`<a href="${s(e.brandHref)}" class="plan-provider-cell plan-provider-cell--link">${$e}</a>`:`<div class="plan-provider-cell">${$e}</div>`;return`
      <tr class="plan-select-row${p?" is-selected":""}" data-plan-key="${s(d)}" tabindex="0" aria-selected="${p?"true":"false"}">
        <td class="px-3 py-3 font-medium text-slate-900 dark:text-white">${pt}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${dt}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${b}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${y}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${f}</td>
        <td class="plan-table-nowrap px-3 py-3">${$}</td>
        <td class="break-words px-3 py-3">${h}</td>
        <td class="plan-table-nowrap px-3 py-3">${X}</td>
        <td class="break-words px-3 py-3 text-slate-600 dark:text-slate-300">${s(j(l)||"\u2014")}</td>
        <td class="plan-table-nowrap px-3 py-3"><span class="rounded-md px-2 py-0.5 text-xs font-medium ${u}">${Ye(l)}</span></td>
        <td class="plan-table-nowrap px-3 py-3">${it}</td>
        <td class="plan-table-nowrap px-3 py-3">${lt}</td>
        <td class="plan-table-nowrap px-3 py-3">${ot}</td>
        <td class="plan-table-nowrap px-3 py-3">${at}${pe(l)?`<div class="mt-1">${pe(l)}</div>`:""}</td>
        <td class="plan-table-nowrap px-3 py-3">${st}</td>
      </tr>
      ${ct}`}).join(""):""}function Mt(e,t,n,r,a,o){let l=t.length?ze(t,r).map(d=>{if(d.plans.length===1)return Ge(d,n,!0,r);let p=!o&&d.plans.length>Y,u=o||!p||a.has(d.provider),m=At(d),b=`${q(d.iconUrl,d.label,"brand-icon brand-icon--section")}
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
        ${Ge(d,n,u,r)}`}).join(""):`<tr>
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
            ${ue.map(d=>Ve(d,e)).join("")}
          </tr>
        </thead>
        <tbody>
          ${l}
        </tbody>
      </table>
    </div>`}function Pr(e,t="",n={},r=new Set,a=!1){if(!e.length)return`<p class="text-sm text-slate-500 dark:text-slate-400">${s(i("table.empty.none"))}</p>`;let o=Ae(e,n,x);if(!o.length)return`<p class="text-sm text-slate-500 dark:text-slate-400">${s(i("table.empty.none"))}</p>`;qe(n);let l=je(o),d=a||z()||Be();return`
    <div>
      ${Ke(l,o)}
      ${Oe(l,o)}
      <div class="plan-view-cards">
        ${Ct(l,t,n,r,d)}
      </div>
      <div class="plan-view-table">
        ${Mt(o,l,t,n,r,d)}
      </div>
    </div>`}var Xe=7.2,me=[{id:"light",labelKey:"advisor.usage.light",value:500},{id:"medium",labelKey:"advisor.usage.medium",value:3e3},{id:"heavy",labelKey:"advisor.usage.heavy",value:1e4},{id:"extreme",labelKey:"advisor.usage.extreme",value:3e4}],Ut={Anthropic:"Claude",Claude:"Claude",ChatGPT:"GPT",ChartGPT:"GPT",Google:"Gemini","Google Antigravity":"Gemini",Grok:"Grok","Z.ai":"GLM",BytePlus:"Doubao",\u963F\u91CC\u4E91:"Qwen","Alibaba Cloud":"Qwen",StepFun:"Step",\u9636\u8DC3\u661F\u8FB0:"Step",\u5FEB\u624BStreamLake:"KAT-Coder","Kwai StreamLake":"KAT-Coder",StreamLake:"KAT-Coder",Cursor:"Cursor",Qoder:"Qoder",Trae:"Trae",OpenCode:"OpenCode"},We=8;function fe(e){let t=String(e||"").trim();if(!t||/未指定|无明确|未公开|不适用|待更新|待确认|pending|unspecified|not specified|n\/a|tbd|unknown|see official/i.test(t))return null;let n=t.replace(/,/g,"").match(/(\d+(?:\.\d+)?)\s*(万)?/);if(!n)return null;let r=parseFloat(n[1])*(n[2]==="\u4E07"?1e4:1);return Number.isFinite(r)&&r>0?r:null}function Dt(e){let t=fe(e.monthlyRequests);if(t!=null)return{value:t,estimated:/约|估算|approx|estimat/i.test(e.monthlyRequests),basis:"monthly"};let n=fe(e.weeklyRequests);if(n!=null)return{value:Math.round(n*4.3),estimated:!0,basis:"weekly"};let r=fe(e.fiveHoursRequests);return r!=null?{value:r*30,estimated:!0,basis:"fiveHours"}:null}function Nt(e){let t=[{value:e.monthlyPriceValue,cycle:"monthly"},{value:e.quarterlyMonthlyPriceValue,cycle:"quarterly"},{value:e.annualMonthlyPriceValue,cycle:"annual"}].filter(a=>Number.isFinite(a.value)&&a.value>=0);if(!t.length)return null;let n=t.reduce((a,o)=>o.value<a.value?o:a),r=e.monthlyCurrency==="CNY";return{value:n.value,cycle:n.cycle,currency:e.monthlyCurrency||"USD",usd:r?n.value/Xe:n.value}}function Et(e,t={}){let n=Ut[e.provider];return n||T(e.provider,t,x)||e.provider||"Other"}function Ft(e,t,n={}){let r=new Map;for(let l of e)l.id&&r.set(l.id,Et(l,n));let a=new Map;for(let l of t){let d=new Set((l.modelIds||[]).map(p=>r.get(p)).filter(Boolean));for(let p of d)a.set(p,(a.get(p)||0)+1)}return{options:[...a.entries()].map(([l,d])=>({family:l,count:d})).sort((l,d)=>d.count-l.count||l.family.localeCompare(d.family,"en")),familyByModelId:r}}function qt(e,t){return new Set((e.modelIds||[]).map(n=>t.get(n)).filter(Boolean))}function Rt(e,t,n){let{families:r,usage:a,budget:o}=t,l=[],d=0;for(let p of e){if(p.planType==="api_package"){d+=1;continue}let u=Nt(p);if(o!=null&&u&&u.usd>o)continue;let m=!1;if(r.size){let v=qt(p,n);if(!v.size)m=!0;else if(![...v].some(h=>r.has(h)))continue}let b=Dt(p),y=b&&u&&b.value>0?u.usd/b.value*1e3:null,f;m?f=4:b?b.value>=a?f=1:f=2:f=3,l.push({plan:p,price:u,quota:b,costPer1k:y,tier:f})}return l.sort((p,u)=>{if(p.tier!==u.tier)return p.tier-u.tier;if((p.tier===1||p.tier===2)&&p.costPer1k!==u.costPer1k)return(p.costPer1k??1/0)-(u.costPer1k??1/0);let m=p.price?p.price.usd:1/0,b=u.price?u.price.usd:1/0;return m-b}),{results:l,paygoCount:d}}function Je(e){return Math.round(e).toLocaleString(_())}function Ze(e,t="USD"){return`${t==="CNY"?"\xA5":"$"}${e.toLocaleString(_(),{maximumFractionDigits:e<10?2:0})}`}function It(e,t){let{plan:n,price:r,quota:a,costPer1k:o,tier:l}=e,d=T(n.provider,t,x),p=[];if(l===1?p.push(`<span class="plan-advisor-chip plan-advisor-chip--good">${s(i("advisor.chip.enough"))}</span>`):l===2?p.push(`<span class="plan-advisor-chip plan-advisor-chip--warn">${s(i("advisor.chip.short"))}</span>`):l===3?p.push(`<span class="plan-advisor-chip plan-advisor-chip--muted">${s(i("advisor.chip.unknown"))}</span>`):p.push(`<span class="plan-advisor-chip plan-advisor-chip--muted">${s(i("advisor.chip.unlabeled"))}</span>`),a){let f=w()==="en"?" (":"\uFF08",v=w()==="en"?")":"\uFF09",h=a.estimated?`${f}${s(i("advisor.chip.estimated",{basis:i(`advisor.basis.${a.basis}`)}))}${v}`:"";p.push(`<span class="plan-advisor-chip">${s(i("advisor.chip.monthlyQuota",{n:Je(a.value)}))}${h}</span>`)}if(o!=null&&p.push(`<span class="plan-advisor-chip">${s(i("advisor.chip.per1k",{price:Ze(o)}))}</span>`),n.supportedModelNames?.length){let f=n.supportedModelNames.slice(0,3).join(" / "),v=n.supportedModelNames.length>3?" \u2026":"";p.push(`<span class="plan-advisor-chip">${s(i("advisor.chip.supports",{models:f+v}))}</span>`)}let u=`<span class="plan-advisor-price-muted">${s(i("advisor.price.official"))}</span>`;if(r){let f=r.cycle!=="monthly"?`<span class="plan-advisor-cycle">${s(i(`advisor.cycle.${r.cycle}`))}</span>`:"",v=r.currency==="CNY"?`<span class="plan-advisor-price-note">${s(i("advisor.price.cnyNote",{n:Je(r.usd),rate:Xe}))}</span>`:"";u=`<span class="plan-advisor-price">${Ze(r.value,r.currency)}/${s(i("common.perMonth"))}</span>${f}${v}`}let m=I(n.url),b=m?V(n,m):null,y=b?`<a href="${s(b.href)}" target="_blank" rel="${b.rel}" ${K(n)} class="plan-advisor-link">${s(i("advisor.link"))}</a>`:"";return`
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
  `}function Bt(e,t){let n=me.some(r=>r.value===t.usage)?"":t.usage;return`
    <div class="plan-advisor-form">
      <div class="plan-advisor-field">
        <span class="plan-advisor-label">${s(i("advisor.family.label"))}<small>${s(i("advisor.family.hint"))}</small></span>
        <div class="plan-advisor-options" data-advisor-families>
          ${e.map(r=>{let a=t.families.has(r.family);return`
              <button type="button" class="plan-advisor-option${a?" is-active":""}" data-family="${s(r.family)}" aria-pressed="${a}">
                ${s(r.family)}<span class="plan-advisor-option-count">${r.count}</span>
              </button>
            `}).join("")}
        </div>
      </div>
      <div class="plan-advisor-field">
        <span class="plan-advisor-label">${s(i("advisor.usage.label"))}</span>
        <div class="plan-advisor-options" data-advisor-usage>
          ${me.map(r=>{let a=r.value===t.usage;return`
              <button type="button" class="plan-advisor-option${a?" is-active":""}" data-usage="${r.value}" aria-pressed="${a}">
                ${s(i(r.labelKey))}
              </button>
            `}).join("")}
          <input type="number" min="1" class="plan-advisor-input" data-advisor-usage-custom placeholder="${s(i("advisor.usage.custom"))}" aria-label="${s(i("advisor.usage.custom"))}" value="${n}">
        </div>
      </div>
      <div class="plan-advisor-field plan-advisor-field--row">
        <label class="plan-advisor-budget">
          <span>${s(i("advisor.budget"))}</span>
          <input type="number" min="0" class="plan-advisor-input" data-advisor-budget placeholder="${s(i("advisor.budget.placeholder"))}" aria-label="${s(i("advisor.budget"))}" value="${t.budget??""}">
        </label>
      </div>
    </div>
    <div class="plan-advisor-results" data-advisor-results aria-live="polite"></div>
  `}function Ht(){return`
    <div class="plan-advisor-dialog" role="dialog" aria-modal="true" aria-labelledby="planAdvisorTitle" tabindex="-1">
      <div class="plan-advisor-head">
        <h2 id="planAdvisorTitle">${s(i("advisor.title"))}</h2>
        <button type="button" class="plan-advisor-close" data-advisor-close aria-label="${s(i("advisor.close.aria"))}">\u2715</button>
      </div>
      <div class="plan-advisor-body"></div>
      <p class="plan-advisor-disclaimer">${s(i("advisor.disclaimer"))}</p>
    </div>
  `}function jt({root:e,plans:t,providerInfo:n={},modelCatalog:r=[],initialState:a={},onStateChange:o=null}){let{options:l,familyByModelId:d}=Ft(r,t,n),p=new Set(l.map(y=>y.family)),u={families:new Set([...a.families||[]].filter(y=>p.has(y))),usage:Number.isFinite(a.usage)&&a.usage>0?a.usage:me[1].value,budget:Number.isFinite(a.budget)&&a.budget>0?a.budget:null,showAll:!1};e.innerHTML=Bt(l,u);let m=()=>{let y=e.querySelector("[data-advisor-results]"),{results:f,paygoCount:v}=Rt(t,u,d);if(!f.length){y.innerHTML=`
        <p class="plan-advisor-empty">${s(i("advisor.empty"))}</p>
        ${v?`<p class="plan-advisor-paygo">${s(i("advisor.paygo",{n:v}))}</p>`:""}
      `;return}let h=u.showAll?f:f.slice(0,We);y.innerHTML=`
      <p class="plan-advisor-summary">${s(i("advisor.summary",{n:f.length}))}</p>
      <ol class="plan-advisor-list">
        ${h.map($=>It($,n)).join("")}
      </ol>
      ${f.length>We&&!u.showAll?`<button type="button" class="plan-advisor-more" data-advisor-more>${s(i("advisor.expand",{n:f.length}))}</button>`:""}
      ${v?`<p class="plan-advisor-paygo">${s(i("advisor.paygo",{n:v}))}</p>`:""}
    `},b=()=>{o?.(u)};return e.addEventListener("click",y=>{let f=y.target.closest("[data-family]");if(f){let h=f.dataset.family;u.families.has(h)?u.families.delete(h):u.families.add(h);let $=u.families.has(h);f.classList.toggle("is-active",$),f.setAttribute("aria-pressed",String($)),u.showAll=!1,m(),b();return}let v=y.target.closest("[data-usage]");if(v){u.usage=Number(v.dataset.usage),e.querySelectorAll("[data-usage]").forEach($=>{let A=$===v;$.classList.toggle("is-active",A),$.setAttribute("aria-pressed",String(A))});let h=e.querySelector("[data-advisor-usage-custom]");h&&(h.value=""),u.showAll=!1,m(),b();return}y.target.closest("[data-advisor-more]")&&(u.showAll=!0,m())}),e.querySelector("[data-advisor-usage-custom]")?.addEventListener("input",y=>{let f=Number(y.target.value);Number.isFinite(f)&&f>0&&(u.usage=f,e.querySelectorAll("[data-usage]").forEach(v=>{v.classList.remove("is-active"),v.setAttribute("aria-pressed","false")})),u.showAll=!1,m(),b()}),e.querySelector("[data-advisor-budget]")?.addEventListener("input",y=>{let f=Number(y.target.value);u.budget=Number.isFinite(f)&&f>0?f:null,u.showAll=!1,m(),b()}),m(),{state:u,refresh:m}}function Dr({plans:e,providerInfo:t={},modelCatalog:n=[],fab:r}){if(!r)return null;let a=null,o=null,l=null,d=()=>{a&&(a.hidden=!0,document.body.style.overflow="",l?.focus?.())},p=()=>{a||(a=document.createElement("div"),a.className="plan-advisor-overlay",a.hidden=!0,a.innerHTML=Ht(),document.body.appendChild(a),o=jt({root:a.querySelector(".plan-advisor-body"),plans:e,providerInfo:t,modelCatalog:n}),a.addEventListener("click",m=>{m.target.closest("[data-advisor-close]")&&d()}),document.addEventListener("keydown",m=>{m.key==="Escape"&&a&&!a.hidden&&d()}))},u=()=>{p(),l=document.activeElement,a.hidden=!1,document.body.style.overflow="hidden",o.refresh(),a.querySelector(".plan-advisor-dialog")?.focus()};return r.addEventListener("click",u),{open:u,close:d}}var Ir=[{id:"low-cost",label:i("scenario.lowCost")},{id:"long-context",label:i("scenario.longContext")},{id:"multimodal",label:i("scenario.multimodal")},{id:"enterprise-api",label:i("scenario.enterpriseApi")},{id:"personal-use",label:i("scenario.personalUse")}];async function Kt(){let e=Ne(),t=e?"backend":"static",n=await et(Ee()),r=e&&w()==="en"?await et("/data.json"):null;return{...Vt(Gt(n,r),t),dataUnavailable:!n}}async function Br(){let e=await Kt(),t=e.models.flatMap(a=>Jt(a,e.providerInfo)),n=e.modelCatalog||[],r=new Map(n.map(a=>[a.id,a.name]));for(let a of t)a.supportedModelNames=(a.modelIds||[]).map(o=>r.get(o)).filter(Boolean);return{...e,plans:t,providerInfo:e.providerInfo||{},modelCatalog:n}}function Vt(e,t){if(e&&Array.isArray(e.models)){let n=e.models.map(r=>Wt(r,t));if(n.length)return{source:t,lastUpdated:e.last_updated||lr(n.map(r=>r.updatedAt)),models:n,rawModels:e.models,providerInfo:e.provider_info||{},modelCatalog:Ot(e.model_catalog)}}return{source:t,lastUpdated:e?.last_updated||"unknown",models:[],rawModels:[],providerInfo:e?.provider_info||{},modelCatalog:[]}}function Ot(e){return Array.isArray(e)?e.map(t=>({id:c(t.id),name:c(g(t.name,t.name_en),t.id||""),provider:c(t.provider,""),providerIconUrl:c(t.provider_icon_url,""),logoUrl:c(t.logo_url,""),sortOrder:S(t.sort_order),marketRegion:c(t.market_region,"")})).filter(t=>t.id):[]}async function et(e){try{let t=await fetch(e,{headers:{Accept:"application/json"}});return t.ok?await t.json():null}catch{return null}}function Gt(e,t){if(!e||!Array.isArray(e.models)||!t||!Array.isArray(t.models))return e;let n=new Map(t.models.map(a=>[Q(a),a]).filter(([a])=>a)),r=e.models.map(a=>{let o=n.get(Q(a));return o?J(a,o):a});return{...e,models:r,provider_info:zt(e.provider_info,t.provider_info)}}function zt(e={},t={}){let n=new Set([...Object.keys(t||{}),...Object.keys(e||{})]),r={};for(let a of n)r[a]=J(e?.[a]||{},t?.[a]||{});return r}function J(e,t){if(!e||typeof e!="object"||Array.isArray(e)||!t||typeof t!="object"||Array.isArray(t))return e;let n={...e};for(let[r,a]of Object.entries(t)){let o=e[r];r==="package_plans"&&Array.isArray(o)&&Array.isArray(a)?n[r]=Yt(o,a):o&&typeof o=="object"&&!Array.isArray(o)&&a&&typeof a=="object"&&!Array.isArray(a)?n[r]=J(o,a):typeof o=="string"||typeof a=="string"?n[r]=Qt(o,a):o==null&&(n[r]=a)}return n}function Yt(e,t){let n=new Map(t.map(r=>[Q(r),r]).filter(([r])=>r));return e.map(r=>{let a=n.get(Q(r));return a?J(r,a):r})}function Qt(e,t){let n=String(t??"").trim();if(!n)return e;let r=String(e??"").trim();return r?tt(r)&&!tt(n)?t:e:t}function tt(e){return/[\u3400-\u9fff]/.test(String(e||""))}function Q(e){return String(e?.id||e?.model_id||e?.plan_id||e?.planId||"").trim()}function Wt(e,t){let n=Array.isArray(e.capabilities)?e.capabilities:[],r=S(e.input_price),a=S(e.context_length),o=Z(g(e.plan_summary,e.plan_summary_en),g(e.access_notes,e.access_notes_en),g(e.notes,e.notes_en)),l=er(e,r,a,n);return{id:c(e.id),vendor:c(e.provider,"Pending"),providerIconUrl:c(e.provider_icon_url,e.icon_url||""),logoUrl:c(e.logo_url,""),modelName:c(g(e.name,e.name_en),R(e.name)&&!R(e.provider)?c(e.provider,""):"","Pending"),inputPrice:nt(e.input_price,e.currency),outputPrice:nt(e.output_price,e.currency),contextLength:ir(e.context_length),multimodal:n.includes("vision")?"Supported":"TBD",apiSupport:"Supported",rmbRecharge:c(g(e.rmb_recharge_support,e.rmb_recharge_support_en),"See official site"),invoice:c(g(e.invoice_support,e.invoice_support_en),"See official site"),rmbRechargeRaw:e.rmb_recharge_support??null,invoiceRaw:e.invoice_support??null,accessLevel:c(e.access_level,""),marketRegion:c(e.market_region,""),marketRegionLabel:c(e.market_region_label,""),scenarios:l,suitableFor:c(g(e.suitable_for,e.suitable_for_en),o||"See official site"),updatedAt:c(e.last_updated,e.release_date||"Pending"),sourceUrl:c(e.docs_url,e.plan_url||""),packagePlans:Array.isArray(e.package_plans)?e.package_plans:[],source:t,raw:e}}function Jt(e,t={}){return(e.packagePlans||[]).filter(r=>r.status!=="discontinued").map(r=>{let a=S(r.monthly_price),o=S(r.quarterly_price),l=S(r.annual_price),d=nr(r,e),p=c(r.provider,e.vendor),u=t[p]||{},m=Zt(p,t),b=Xt(p,t);return{id:c(r.id,`${e.id}-plan`),planId:c(r.planId,r.plan_id||""),brand:c(r.brand,r.brand_slug||""),name:c(g(r.name,r.name_en),"Pending plan"),provider:p,providerIconUrl:c(r.provider_icon_url,r.icon_url,e.providerIconUrl),modelName:e.modelName,modelId:c(r.model_id,e.id),modelIds:Array.isArray(r.model_ids)?r.model_ids.map(y=>String(y||"").trim()).filter(Boolean):[],status:c(r.status,"unknown"),statusLabel:(()=>{if(r.status){let f=i(`status.${r.status}`);if(!f.startsWith("status."))return f}let y=c(r.status_label,"");return y&&!R(y)?y:i("status.pending")})(),url:sr(r.url_cn,r.url_en),monthlyPrice:ye(r.monthly_price,d),monthlyPriceValue:a,monthlyCurrency:d,monthlyCurrencyLabel:d==="USD"?i("currency.usd"):i("currency.cny"),quarterlyPrice:o!=null?be(r.quarterly_price,d,i("common.perQuarter")):"",quarterlyPriceValue:o,quarterlyMonthlyPrice:o!=null?ye(o/3,d):"",quarterlyMonthlyPriceValue:o!=null?o/3:null,annualPrice:l!=null?be(r.annual_price,d,i("common.perYear")):"",annualPriceValue:l,annualMonthlyPrice:l!=null?ye(l/12,d):"",annualMonthlyPriceValue:l!=null?l/12:null,includedCalls:c(g(r.included_calls,r.included_calls_en),""),notes:c(g(r.notes,r.notes_en),""),planType:c(r.plan_type,rt(r,e)),category:rt(r,e),rmbRecharge:e.rmbRecharge,invoice:e.invoice,rmbRechargeRaw:e.rmbRechargeRaw,invoiceRaw:e.invoiceRaw,accessLevel:e.accessLevel,marketRegion:e.marketRegion,marketRegionLabel:e.marketRegionLabel,firstMonthPrice:r.first_month_price!=null?r.first_month_price:null,fiveHoursRequests:c(g(r.five_hours_requests,r.five_hours_requests_en),""),weeklyRequests:c(g(r.weekly_requests,r.weekly_requests_en),""),monthlyRequests:c(g(r.monthly_requests,r.monthly_requests_en),""),measuredFiveHoursTokens:c(r.measured_five_hours_tokens,""),measuredWeeklyTokens:c(r.measured_weekly_tokens,""),measuredMonthlyTokens:c(r.measured_monthly_tokens,""),tokenLimit:c(r.token_limit,""),supportedModels:c(g(r.supported_models,r.supported_models_en),g(u.supported_models,u.supported_models_en)||""),benefits:c(g(r.benefits,r.benefits_en),""),rating:c(r.rating,""),tags:c(g(r.tags,r.tags_en),""),sourceUrl:c(r.source_url,""),lastVerifiedAt:c(r.last_verified_at,""),refundPolicy:c(g(r.refund_policy,r.refund_policy_en),""),billingCycle:c(r.billing_cycle,""),creditsLimit:c(g(r.credits_limit,r.credits_limit_en),""),concurrencyLimit:c(r.concurrency_limit,""),resetRule:c(g(r.reset_rule,r.reset_rule_en),""),limitType:c(r.limit_type,tr(r)),dataStatus:c(r.data_status,rr(r)),confidenceScore:r.confidence_score!=null?r.confidence_score:null,sourceType:c(r.source_type,""),toolCompatibility:L(r.tool_compatibility_json,{}),modelMultiplier:L(r.model_multiplier_json,{}),derivedMetrics:L(r.derived_metrics_json,{}),measuredMetrics:L(r.measured_metrics_json,{}),risk:L(r.risk_json,{}),recommendation:L(r.recommendation_json,{}),changeSummary:L(r.change_summary_json,{}),linkType:c(r.link_type,"official"),hasAffiliate:r.has_affiliate===!0,domesticPayment:m??W(r.domestic_payment),intlNetwork:b??W(r.intl_network),hasFirstMonthDiscount:r.has_first_month_discount===!0||r.has_first_month_discount===1,recommendationText:c(g(r.recommendation_text,r.recommendation_text_en),""),riskText:c(g(r.risk_text,r.risk_text_en),""),sortOrder:S(r.sort_order),privacyOverride:L(r.privacy_override_json,{}),raw:r}})}function Zt(e,t={}){let n=c(e);if(!n)return null;let r=t[n];return!r||r.domestic_payment==null?null:W(r.domestic_payment)}function Xt(e,t={}){let n=c(e);if(!n)return null;let r=t[n];return!r||r.intl_network==null?null:W(r.intl_network)}function er(e,t,n,r){let a=Z(e.name,e.provider,e.notes,e.plan_summary,e.access_notes).toLowerCase(),o=new Set(["enterprise-api"]);return t!=null&&t<=2&&o.add("low-cost"),n!=null&&n>=2e5&&o.add("long-context"),r.includes("vision")&&o.add("multimodal"),/个人|会员|订阅|聊天|kimi|豆包/.test(a)&&o.add("personal-use"),Array.from(o)}function L(e,t){if(!e||typeof e!="string")return e||t;try{return JSON.parse(e)}catch{return t}}function tr(e){return e.five_hours_requests?"five_hours":e.weekly_requests?"weekly":e.monthly_requests?"monthly":e.token_limit?"token":e.credits_limit?"credits":"undisclosed"}function rr(e){return e.last_verified_at?"verified":e.measured_monthly_tokens||e.measured_weekly_tokens?"measured":"pending"}function rt(e,t){let n=Z(e.name,e.provider,e.notes,t.vendor,t.modelName).toLowerCase();return/聚合|路由|硅基|siliconflow/.test(n)?"aggregated_router":/会员|订阅|chat|清言|kimi|豆包/.test(n)?"personal_subscription":/maas|百炼|千帆|腾讯云|火山方舟|企业/.test(n)?"enterprise_maas":/开源|部署|私有化/.test(n)?"open_source_deploy":(/coding|qoder|claude code|cursor|trae/.test(n),"coding_plan")}function nr(e,t){let n=c(e.monthly_currency).toUpperCase();if(n==="USD")return"USD";let r=c(t.market_region).toLowerCase(),a=r==="international"||r==="domestic_international";if(n==="CNY"&&a)return"USD";let o=c(e.provider,t.vendor),l=o.toLowerCase();if(l==="qoder"||l==="qoder cn"||l==="byteplus"||l==="z.ai"||l==="grok"||l==="claude"||l==="chartgpt"||l==="google antigravity"||l==="opencode"||l==="anthropic"||l==="openai"||a)return"USD";let d=Z(e.name,o,e.url_cn,e.url_en,e.included_calls,e.notes).toLowerCase();return/\$|usd|美元|trae\.ai/.test(d)?"USD":"CNY"}function c(...e){let t=e.find(n=>n!=null&&String(n).trim());return t==null?"":String(t).trim()}function W(e){if(e===!0||e===1)return!0;let t=String(e??"").trim().toLowerCase();return t==="true"||t==="1"||t==="yes"}function ar(e){if(!e)return!1;let t=String(e).trim();return!t||/[\u4e00-\u9fff]/.test(t)?!1:(t.match(/[a-zA-Z]/g)||[]).length/t.length>.6}function g(e,t){return w()==="en"?t!=null&&String(t).trim()?t:ke(e):w()==="zh"&&ar(e)&&t!=null&&String(t).trim()&&String(t).trim()!==String(e).trim()?t:e}function sr(e,t){return w()==="zh"?c(e,t):c(t,e)}function S(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function nt(e,t){let n=S(e);return n==null?c(e,i("common.pending")):`${t==="USD"?"$":"\xA5"}${n.toLocaleString(_(),{maximumFractionDigits:4})}/${i("common.perMillionTokens")}`}function ye(e,t="CNY"){return be(e,t,i("common.perMonth"))}function be(e,t="CNY",n=i("common.perMonth")){let r=S(e);return r==null?i("common.official"):`${t==="USD"?"$":"\xA5"}${r.toLocaleString(_(),{maximumFractionDigits:2})}/${n}`}function ir(e){let t=S(e);return t==null?c(e,i("common.official")):t>=1e6?`${(t/1e6).toLocaleString(_(),{maximumFractionDigits:1})}M tokens`:t>=1e3?`${(t/1e3).toLocaleString(_(),{maximumFractionDigits:0})}K tokens`:`${t.toLocaleString(_())} tokens`}function Z(...e){return e.filter(t=>t!=null&&String(t).trim()).join(" ")}function lr(e){return e.find(t=>t&&t!=="Pending")||"Pending"}export{Be as a,yr as b,vt as c,je as d,br as e,q as f,Pr as g,jt as h,Dr as i,Br as j};
