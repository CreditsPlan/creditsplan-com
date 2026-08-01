import{a as pe,b as ue,c as H,d as te,f as me,g as be}from"./chunk.GWAKRGUC.js";import"./chunk.7HYUNLOO.js";import{a as se}from"./chunk.EPE4QEOO.js";import{a as L,b as I,e as M,f as j,h as ie,i as ce,j as ee,o as ne,p as de}from"./chunk.UC6B7E7P.js";import{a as o}from"./chunk.Y3GWXKZH.js";import{c as E,e as i}from"./chunk.CK2CXFOA.js";var fe=2,Se=new Set(["claude-opus-4-8","claude-sonnet-4-6","claude-opus-4-7","claude-opus-4-6","claude-sonnet-4-5","claude-opus-4-5","claude-opus-4-1"]);function _(e){if(e==null||e==="")return null;let n=Number(e);return Number.isFinite(n)?n:null}function Q(e,n){let a=_(e);return a==null?i("pricing.pending"):`${n==="USD"?"$":"\xA5"}${a.toLocaleString(E(),{maximumFractionDigits:4})}`}function he(e){let n=_(e);return n==null?"\u2014":n>=1e6?`${(n/1e6).toLocaleString(E(),{maximumFractionDigits:1})}M`:n>=1e3?`${(n/1e3).toLocaleString(E(),{maximumFractionDigits:0})}K`:n.toLocaleString(E())}function ke(e){return L[e]||e||i("pricing.unknownVendor")}function T(e){let n=ke(e);return n==="Anthropic"?"Claude":n}var ge={};function $e(e){let n=j(e,ge,L),a=String(n.seo_slug||"").trim(),s=String(n.seo_intro||"").trim(),l=String(n.icon_url||"").trim();return a&&s&&l?`/brands/${encodeURIComponent(a)}/`:""}function ae(e,n){let a=I(e),s=T(e),l=n||a?.iconUrl||"";return H(l,s,"brand-icon brand-icon--tab")}function G(e){let n=String(e.raw?.lifecycle_status||"").trim().toLowerCase();if(n)return n==="legacy";if(String(e.vendor||"").trim().toLowerCase()!=="anthropic")return!1;let a=String(e.raw?.model_id||e.raw?.id||e.id||"").trim().toLowerCase().replace(/[._]/g,"-");return Se.has(a)}function re(e){let n=String(e.raw?.release_date||"").trim();if(!n)return null;let a=Date.parse(n);return Number.isFinite(a)?a:null}var X={release:{numeric:!0,raw:re},name:{labelKey:"pricing.th.name",numeric:!1},provider:{labelKey:"pricing.th.provider",numeric:!1},context:{labelKey:"pricing.th.context",numeric:!0,raw:e=>_(e.raw?.context_length)},input:{labelKey:"pricing.th.input",numeric:!0,raw:e=>_(e.raw?.input_price)},output:{labelKey:"pricing.th.output",numeric:!0,raw:e=>_(e.raw?.output_price)}};function Ee(e,n,a){let s=X[n];if(!s)return e;let l=[...e];return l.sort((p,u)=>{if(n==="release"){let m=Number(G(p))-Number(G(u));if(m!==0)return m}let v=0;if(s.numeric){let m=s.raw(p),f=s.raw(u);if(m==null||f==null)return m==null&&f==null?0:m==null?1:-1;v=m-f}else n==="name"?v=(p.modelName||"").localeCompare(u.modelName||"",E()):n==="provider"&&(v=T(p.vendor).localeCompare(T(u.vendor),E()));return a==="desc"?-v:v}),l}function Le(e){let n=new Map;for(let a of e){let s=T(a.vendor),l=n.get(s);l||(l={name:s,vendor:a.vendor,icon:a.logoUrl||a.providerIconUrl,models:[]},n.set(s,l)),l.models.push(a)}return[...n.values()]}function Me(e,n){let a=Number(G(n))-Number(G(e));if(a!==0)return a>0;let s=re(e),l=re(n);return s!=null&&l!=null?s>l:s!=null&&l==null}function Te(e){let n=new Map;for(let a of e){let s=T(a.vendor),l=n.get(s);(!l||Me(a,l))&&n.set(s,a)}return[...n.values()]}function _e(e){let n=null;for(let a of e){let s=_(a.raw?.input_price);s==null||s<0||(!n||s<n.value)&&(n={value:s,currency:a.raw?.currency})}return n}function Ce(e){let n=_e(e.models),a=[];if(n){let s=n.currency==="USD"?"$":"\xA5";a.push(i("pricing.group.inputFrom",{symbol:s,price:n.value.toLocaleString(E(),{maximumFractionDigits:4})}))}return a.push(`${e.models.length} ${i("pricing.meta.models")}`),`<span class="plan-table-group-summary">${o(a.join(" \xB7 "))}</span>`}var ye={name:e=>String(e.modelName||"").trim()||"\u2014",provider:e=>T(e.vendor),context:e=>he(e.raw?.context_length),input:e=>Q(e.raw?.input_price,e.raw?.currency),output:e=>Q(e.raw?.output_price,e.raw?.currency)};function ve(e){return e==="\u2014"||e===i("pricing.pending")}function we(e,n){let a=ye[n];return a?String(a(e)||"").trim()||"\u2014":""}function Oe(e,n){let a=new Map;for(let l of e){let p=we(l,n);a.set(p,(a.get(p)||0)+1)}let s=new Intl.Collator(E(),{numeric:!0,sensitivity:"base"});return Array.from(a.entries()).map(([l,p])=>({value:l,count:p})).sort((l,p)=>{let u=ve(l.value),v=ve(p.value);return u!==v?u?1:-1:s.compare(l.value,p.value)})}function De(e,n,a){return e!==n?'<svg class="model-price-sort-icon model-price-sort-icon--idle" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2l2.5 3h-5zM6 10l-2.5-3h5z" fill="currentColor"/></svg>':`<svg class="model-price-sort-icon" viewBox="0 0 12 12" aria-hidden="true"><path d="${a==="asc"?"M6 2l3 4H3z":"M6 10L3 6h6z"}" fill="currentColor"/></svg>`}function Ue(e,n,a){let s=X[e],l=n.column===e&&!!n.value,p=Oe(a,e);return`<button type="button" class="plan-column-filter-trigger model-price-filter-trigger${l?" is-active":""}" data-model-filter-column="${e}" aria-haspopup="menu" aria-expanded="false" title="${o(i("table.filter.tooltip"))} ${o(i(s.labelKey))}">
      <span class="plan-column-filter-caret" aria-hidden="true"></span>
    </button>
    <div class="plan-column-filter-menu" data-model-filter-menu="${e}" role="menu" hidden>
      <button type="button" class="plan-column-filter-option${l?"":" is-active"}" data-model-filter-value="">
        <span class="plan-column-filter-option-label">${o(i("table.filter.all"))}</span>
        <span class="plan-column-filter-option-count">${a.length}</span>
      </button>
      ${p.map(u=>`
        <button type="button" class="plan-column-filter-option${l&&u.value===n.value?" is-active":""}" data-model-filter-value="${o(u.value)}">
          <span class="plan-column-filter-option-label">${o(u.value)}</span>
          <span class="plan-column-filter-option-count">${u.count}</span>
        </button>
      `).join("")}
    </div>`}function Fe(e,n,a,s){let l=(p,u="")=>{let v=X[p];return`<th class="model-price-th plan-column-filter ${u}" data-sort-key="${p}" role="columnheader" aria-sort="${p===e?n==="asc"?"ascending":"descending":"none"}" tabindex="0">
      <span class="model-price-th-inner">${o(i(v.labelKey))}${De(p,e,n)}</span>
      ${Ue(p,a,s)}
    </th>`};return`<thead class="model-price-thead">
    <tr>
      ${l("name")}
      ${l("provider","model-price-col-provider")}
      ${l("context")}
      ${l("input")}
      ${l("output")}
    </tr>
  </thead>`}function Ae(e){let n=_(e.raw?.input_price),a=_(e.raw?.output_price),s=_(e.raw?.context_length),l=e.raw?.currency,p=Q(n,l),u=Q(a,l),v=he(s),m=T(e.vendor),f=e.sourceUrl||e.raw?.docs_url||"",y=G(e)?`<span class="model-price-legacy-badge">${o(i("pricing.legacy"))}</span>`:"",C=f?`<a class="model-price-name-link" href="${o(f)}" target="_blank" rel="noopener noreferrer nofollow">${o(e.modelName)}</a>`:`<span>${o(e.modelName)}</span>`,P=$e(e.vendor),w=`${ae(e.vendor,e.logoUrl||e.providerIconUrl)}<span>${o(m)}</span>`,S=P?`<a href="${o(P)}" class="model-price-provider plan-provider-cell--link">${w}</a>`:`<span class="model-price-provider">${w}</span>`;return`<tr class="model-price-row">
    <td class="model-price-td model-price-td--name">
      <span class="model-price-model-name">${C}${y}</span>
    </td>
    <td class="model-price-td model-price-td--provider model-price-col-provider">
      ${S}
    </td>
    <td class="model-price-td model-price-td--context">${o(v)}</td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${n==null?" model-price-value--empty":""}">${o(p)}</span>
      ${n!=null?`<span class="model-price-unit">${o(i("pricing.unit"))}</span>`:""}
    </td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${a==null?" model-price-value--empty":""}">${o(u)}</span>
      ${a!=null?`<span class="model-price-unit">${o(i("pricing.unit"))}</span>`:""}
    </td>
  </tr>`}function xe(e,n,a={}){ge=a||{};let s=n.filter(r=>_(r.raw?.input_price)!=null||_(r.raw?.output_price)!=null),l=new Map;for(let r of s){let c=T(r.vendor);l.has(c)||l.set(c,{name:c,icon:r.logoUrl||r.providerIconUrl,vendor:r.vendor})}let p=[...l.values()].sort((r,c)=>r.name.localeCompare(c.name,E())),u="all",v="release",m="desc",f="brand",y="all",C="",P="",w="",S=new Set;function D(){return!!(P&&w&&ye[P])}function F(){return f==="model"?y==="all"?s:s.filter(r=>(r.modelName||"")===y):u==="all"?s:s.filter(r=>T(r.vendor)===u)}function R(){let r=F(),c=C.toLowerCase();return c&&(r=r.filter(d=>String(d.modelName||"").toLowerCase().includes(c)||T(d.vendor).toLowerCase().includes(c))),r}function z(r){let c=r;return D()&&(c=c.filter(d=>we(d,P)===w)),Ee(c,v,m)}function O(){return f==="model"?V():q()}function V(){let r=Te(s).sort((b,t)=>(b.modelName||"").localeCompare(t.modelName||"",E())),c=`<button type="button" class="brand-tab${y==="all"?" is-active":""}" data-model-tab="all">
      <span>${o(i("home.tab.all"))}</span><span class="brand-count">${s.length}</span>
    </button>`,d=r.map(b=>{let t=b.modelName||"";return`<button type="button" class="brand-tab${y===t?" is-active":""}" data-model-tab="${o(t)}">
        ${ae(b.vendor,b.logoUrl||b.providerIconUrl)}
        <span>${o(t)}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${c}<span class="brand-divider"></span>${d}</div>`}function q(){let r=`<button type="button" class="brand-tab${u==="all"?" is-active":""}" data-provider="all">
      <span>${o(i("home.tab.all"))}</span><span class="brand-count">${s.length}</span>
    </button>`,c=p.map(d=>{let b=s.filter(t=>T(t.vendor)===d.name).length;return`<button type="button" class="brand-tab${u===d.name?" is-active":""}" data-provider="${o(d.name)}">
        ${ae(d.vendor,d.icon)}
        <span>${o(d.name)}</span>
        <span class="brand-count">${b}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${r}<span class="brand-divider"></span>${c}</div>`}function B(r,c){let d=!c&&r.models.length>fe,b=c||!d||S.has(r.name),t=b?r.models:r.models.slice(0,fe),h=$e(r.vendor),$=`${H(r.icon||I(r.vendor)?.iconUrl||"",r.name,"brand-icon brand-icon--section")}
            <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${o(r.name)}</span>`,x=`
            ${h?`<a href="${o(h)}" class="plan-table-group-brand">${$}</a>`:$}
            <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${r.models.length}</span>
            <span class="plan-table-group-right">
              ${Ce(r)}
              ${d?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
            </span>`;return`
      <tr class="border-y border-slate-200 dark:border-slate-700">
        <td colspan="5" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
          ${d?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-model-group-toggle="${o(r.name)}" aria-expanded="${b?"true":"false"}" aria-label="${b?i("group.collapse"):i("group.expand")} ${o(r.name)}">${x}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${x}</div>`}
        </td>
      </tr>
      ${t.map(Ae).join("")}`}function U(r,c){return D()?`<div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${o(i(X[P].labelKey))}</span>
        <strong>${o(w)}</strong>
      </span>
      <span class="plan-table-filter-count">${r} / ${c} ${o(i("table.filter.count"))}</span>
      <button type="button" class="plan-table-filter-clear" data-model-filter-clear>${o(i("table.filter.clear"))}</button>
    </div>`:""}function A(){let r=R();if(!r.length)return`<p class="model-price-empty">${o(i("pricing.empty"))}</p>`;let c=z(r),d=u!=="all"||y!=="all"||D()||!!C,b=c.length?Le(c).map(t=>B(t,d)).join(""):`<tr>
          <td colspan="5" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">${o(i("pricing.empty"))}</td>
        </tr>`;return`${U(c.length,r.length)}
    <div class="model-price-table-wrap">
      <table class="model-price-table" role="grid" aria-label="${o(i("pricing.table.aria"))}">
        ${Fe(v,m,{column:P,value:w},r)}
        <tbody class="model-price-tbody">
          ${b}
        </tbody>
      </table>
    </div>
    <p class="model-price-footnote">${o(i("pricing.footnote"))}</p>`}function W(){return`<div class="brand-filter-row model-price-toolbar">
      <div class="brand-tab-list">
        <button type="button" data-model-dimension="brand" class="brand-tab${f==="brand"?" is-active":""}"><span>${o(i("home.dimension.brand"))}</span></button>
        <button type="button" data-model-dimension="model" class="brand-tab${f==="model"?" is-active":""}"><span>${o(i("home.dimension.model"))}</span></button>
      </div>
      <div class="brand-search-box">
        <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
        <input type="search" class="brand-search-input" data-model-search placeholder="${o(i("home.search.model"))}" autocomplete="off" aria-label="${o(i("home.search.aria"))}" value="${o(C)}">
      </div>
    </div>`}function oe(){e.innerHTML=`
      <div class="model-price-view">
        ${W()}
        <div class="model-price-content" data-model-price-content></div>
      </div>`,Y(),k()}function k(){let r=e.querySelector("[data-model-price-content]");r&&(r.innerHTML=`${O()}${A()}`,J())}function Y(){e.querySelectorAll("[data-model-dimension]").forEach(c=>{c.addEventListener("click",()=>{let d=c.dataset.modelDimension;if(d===f)return;f=d,u="all",y="all",C="";let b=e.querySelector("[data-model-search]");b&&(b.value=""),e.querySelectorAll("[data-model-dimension]").forEach(t=>{t.classList.toggle("is-active",t.dataset.modelDimension===d)}),k()})});let r=e.querySelector("[data-model-search]");r?.addEventListener("input",()=>{C=r.value.trim(),k()})}function K(){e.querySelectorAll(".plan-column-filter-menu").forEach(r=>{r.hidden=!0}),e.querySelectorAll("[data-model-filter-column]").forEach(r=>r.setAttribute("aria-expanded","false"))}function J(){e.querySelectorAll(".model-price-tabs .brand-tab").forEach(r=>{r.addEventListener("click",()=>{r.dataset.modelTab!=null?y=r.dataset.modelTab:u=r.dataset.provider,k()})}),e.querySelectorAll("[data-model-group-toggle]").forEach(r=>{let c=d=>{if(d?.target?.closest?.("a"))return;let b=r.dataset.modelGroupToggle;S.has(b)?S.delete(b):S.add(b),k()};r.addEventListener("click",c),r.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),c(d))})}),e.querySelectorAll("[data-model-filter-column]").forEach(r=>{r.addEventListener("click",c=>{c.stopPropagation();let d=r.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!d)return;let b=!d.hidden;K(),b||(d.hidden=!1,r.setAttribute("aria-expanded","true"))}),r.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),c.stopPropagation(),r.click())})}),e.querySelectorAll("[data-model-filter-menu]").forEach(r=>{r.addEventListener("click",c=>{c.stopPropagation();let d=c.target.closest("[data-model-filter-value]");if(!d)return;let b=d.dataset.modelFilterValue||"";P=b?r.dataset.modelFilterMenu:"",w=b,k()})}),e.querySelectorAll("[data-model-filter-clear]").forEach(r=>{r.addEventListener("click",()=>{P="",w="",k()})}),e.querySelectorAll(".model-price-th[data-sort-key]").forEach(r=>{let c=d=>{if(d?.target?.closest?.(".plan-column-filter-trigger, .plan-column-filter-menu"))return;let b=r.dataset.sortKey;v===b?m=m==="asc"?"desc":"asc":(v=b,m="asc"),k()};r.addEventListener("click",c),r.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),c(d))})})}e._modelFilterDocClose&&(document.removeEventListener("click",e._modelFilterDocClose),document.removeEventListener("keydown",e._modelFilterDocKey)),e._modelFilterDocClose=r=>{e.contains(r.target)||K()},e._modelFilterDocKey=r=>{r.key==="Escape"&&K()},document.addEventListener("click",e._modelFilterDocClose),document.addEventListener("keydown",e._modelFilterDocKey),oe()}var qe=[{id:"all",labelKey:"home.tab.all"},{id:"free",labelKey:"home.tab.free"}];function Be(e){let n=e.raw?.input_price,a=e.raw?.output_price;return n!=null&&n!==""||a!=null&&a!==""}function Ne(e){let n=e.filter(a=>(a.monthlyCurrency||"USD")==="USD").map(a=>a.monthlyPriceValue).filter(a=>Number.isFinite(a)&&a>0);return n.length?n.reduce((a,s)=>a+s,0)/n.length:null}var g={codingPlanOverview:document.getElementById("codingPlanOverview")};function Pe(){g.codingPlanOverview&&(g.codingPlanOverview.classList.remove("plans-loading-shell"),g.codingPlanOverview.setAttribute("aria-busy","false"))}function Ie(e,n){let a=new Map;for(let s of e){let l=I(s.provider),p=String(s.provider||"").trim(),u=L[p]||p;if(!u)continue;let v=j(p,n,L),m=l?.id||u,f=a.get(m);f?f.iconUrl||(f.iconUrl=M(v.icon_url)||M(s.providerIconUrl)||M(l?.iconUrl)):(f={id:m,provider:p,label:ie(p,n,L),iconUrl:M(v.icon_url)||M(s.providerIconUrl)||M(l?.iconUrl),sortOrder:ce(p,n,L),plans:[]},a.set(m,f)),f.plans.push(s)}for(let s of a.values())s.plans=ee(s.plans);return a}function He(e,n,a={}){let s=new Map;for(let l of n){let p=e.filter(m=>Array.isArray(m.modelIds)&&m.modelIds.includes(l.id));if(!p.length)continue;let u=j(l.provider,a,L),v=M(l.logoUrl)||M(u.icon_url)||M(l.providerIconUrl)||M(I(l.provider)?.iconUrl);s.set(`model:${l.id}`,{id:`model:${l.id}`,label:l.name||l.id,iconUrl:v,sortOrder:Number.isFinite(l.sortOrder)?l.sortOrder:99,plans:ee(p)})}return s}function Re(){return`
    <div class="cn-hero-banner" role="complementary" aria-label="${o(i("home.hero.aria"))}">
      <div class="cn-hero-banner__points">
        <span class="cn-hero-point"><span aria-hidden="true">$</span>${o(i("home.hero.usd"))}</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25A1</span>${o(i("home.hero.card"))}</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25C8</span>${o(i("home.hero.global"))}</span>
      </div>
      <a class="cn-hero-banner__intl" href="https://www.creditsplan.cn/" target="_blank" rel="noopener noreferrer">${o(i("home.hero.cnLink"))}</a>
    </div>
  `}function Ve(e){let n=g.codingPlanOverview.querySelector("#plansBackTop");if(!n||!e)return;let a=()=>{let s=e.getBoundingClientRect();n.classList.toggle("is-visible",s.top<-160&&s.bottom>160)};n.addEventListener("click",()=>{let s=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({behavior:s?"auto":"smooth",block:"start"})}),window.addEventListener("scroll",a,{passive:!0}),window.addEventListener("resize",a),a()}function Ke(){return`
    <div class="plans-export" id="plansExport">
      <button type="button" class="plans-export-trigger" id="plansExportTrigger" aria-haspopup="menu" aria-expanded="false" title="${o(i("export.trigger.title"))}">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
          <path d="M10 3v10m0 0 3.5-3.5M10 13 6.5 9.5M4 15.5h12" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>${o(i("export.trigger"))}</span>
      </button>
      <div class="plans-export-menu" id="plansExportMenu" role="menu" hidden>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="excel">
          <span class="plans-export-option-icon plans-export-option-icon--excel" aria-hidden="true">X</span>
          <span class="plans-export-option-text"><strong>Excel</strong><small>${o(i("export.excel.desc"))}</small></span>
        </button>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="word">
          <span class="plans-export-option-icon plans-export-option-icon--word" aria-hidden="true">W</span>
          <span class="plans-export-option-text"><strong>Word</strong><small>${o(i("export.word.desc"))}</small></span>
        </button>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="pdf">
          <span class="plans-export-option-icon plans-export-option-icon--pdf" aria-hidden="true">P</span>
          <span class="plans-export-option-text"><strong>PDF</strong><small>${o(i("export.pdf.desc"))}</small></span>
        </button>
      </div>
    </div>
  `}function je(e,n,a){let s=e.querySelector("#plansExportTrigger"),l=e.querySelector("#plansExportMenu");if(!s||!l)return;let p=()=>{l.hidden=!0,s.setAttribute("aria-expanded","false")};s.addEventListener("click",()=>{let u=l.hidden;l.hidden=!u,s.setAttribute("aria-expanded",String(u))}),document.addEventListener("click",u=>{e.querySelector("#plansExport")?.contains(u.target)||p()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&p()}),l.addEventListener("click",async u=>{let v=u.target.closest("[data-export-format]");if(!v)return;p();let m=n(),f=v.dataset.exportFormat,y=await import("./chunk.6ZE54XYR.js");f==="excel"?y.exportPlansExcel(m,a):f==="word"?y.exportPlansWord(m,a):f==="pdf"&&y.exportPlansPdf(m,a)})}function Ge(e,n={},a=[],s=[]){if(!g.codingPlanOverview)return;let l=de(e,n,L),p=Ie(l,n),u=[...p.values()].sort((t,h)=>t.sortOrder-h.sortOrder),v=He(l,a,n),m=[...v.values()].sort((t,h)=>t.sortOrder-h.sortOrder||t.label.localeCompare(h.label,"zh-CN")),f={all:l.length,free:ne(l).length},y=Ne(l),C=`
            <span>${l.length} ${o(i("home.meta.records"))}</span>
            <span>${u.length} ${o(i("home.meta.brands"))}</span>
            <span>${m.length} ${o(i("home.meta.models"))}</span>
            ${y!=null?`<span>${o(i("home.meta.avgMonthly"))} $${Math.round(y)}</span>`:""}`;g.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div class="workbench-intro">
          <p class="workbench-kicker">${o(i("home.kicker"))}</p>
          <h1 id="codingPlanTitle" class="workbench-title">${o(i("home.title"))}</h1>
          <p id="workbenchSummary" class="workbench-summary">${o(i("home.summary"))}</p>
        </div>
        <div class="workbench-meta">
          <span id="workbenchStats">${C}
          </span>
          ${Ke()}
        </div>
      </div>
      ${Re()}
      <div class="workbench-body">
        <div id="brandFilterBar" class="brand-filter-bar">
          <div class="brand-filter-row">
            <div id="dimensionSwitch" class="brand-tab-list">
              <button type="button" data-dimension="brand" class="brand-tab is-active"><span>${o(i("home.dimension.brand"))}</span></button>
              <button type="button" data-dimension="model" class="brand-tab"><span>${o(i("home.dimension.model"))}</span></button>
            </div>
            <div class="brand-search-box">
              <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
              <input id="brandSearchInput" type="search" class="brand-search-input" placeholder="${o(i("home.search.brand"))}" autocomplete="off" aria-label="${o(i("home.search.aria"))}">
            </div>
          </div>
          <div id="brandTabs" class="brand-tab-list">
            ${qe.map(t=>`
              <button type="button" data-brand="${t.id}" data-brand-label="${o(i(t.labelKey))}" class="brand-tab${t.id==="all"?" is-active":""}">
                <span>${o(i(t.labelKey))}</span>
                ${f[t.id]>0?`<span class="brand-count">${f[t.id]}</span>`:""}
              </button>
            `).join("")}
            <span class="brand-divider"></span>
            ${u.map(t=>`<button type="button" data-brand="${o(t.id)}" data-brand-label="${o(t.label)}" class="brand-tab">
                ${H(t.iconUrl,t.label,"brand-icon brand-icon--tab")}
                <span>${o(t.label)}</span>
                <span class="brand-count">${t.plans.length}</span>
              </button>`).join("")}
          </div>
          <div id="modelTabs" class="brand-tab-list" hidden>
            <button type="button" data-brand="all" data-brand-label="${o(i("home.tab.all"))}" class="brand-tab is-active">
              <span>${o(i("home.tab.all"))}</span>
              ${f.all>0?`<span class="brand-count">${f.all}</span>`:""}
            </button>
            <span class="brand-divider"></span>
            ${m.map(t=>`<button type="button" data-brand="${o(t.id)}" data-brand-label="${o(t.label)}" class="brand-tab">
                ${H(t.iconUrl,t.label,"brand-icon brand-icon--tab")}
                <span>${o(t.label)}</span>
                <span class="brand-count">${t.plans.length}</span>
              </button>`).join("")}
          </div>
        </div>
        <div id="brandDetail" class="brand-detail">
          ${te(l,"",n)}
        </div>
      </div>
    </section>
    <button id="plansBackTop" class="plans-back-top" type="button" aria-label="${o(i("home.backTop.aria"))}" title="${o(i("home.backTop.title"))}">
      <span aria-hidden="true">\u2191</span>
    </button>
    <button id="planAdvisorFab" class="plan-advisor-fab" type="button" aria-label="${o(i("advisor.fab.aria"))}" title="${o(i("advisor.fab.title"))}">
      <span aria-hidden="true">$</span>
      <span>${o(i("advisor.fab.label"))}</span>
    </button>
  `,Pe();let P=g.codingPlanOverview.querySelector(".plans-workbench"),w=g.codingPlanOverview.querySelector("#brandFilterBar"),S=g.codingPlanOverview.querySelector("#brandTabs"),D=g.codingPlanOverview.querySelector("#modelTabs"),F=g.codingPlanOverview.querySelector("#brandDetail");Ve(P);let R=g.codingPlanOverview.querySelector("#planAdvisorFab"),z=me({plans:l,providerInfo:n,modelCatalog:a,fab:R});z&&location.hash==="#advisor"&&z.open();let O=l;je(g.codingPlanOverview,()=>O,n);let V="all",q="brand",B="",U=new Set,A=()=>{if(q==="pricing"){xe(F,s,n);return}F.innerHTML=te(O,B,n,U,V!=="all")},W=()=>{pe(),B="",U.clear()};ue(F,()=>O,()=>{U.clear(),A()},t=>{B=B===t?"":t,A()});let k=t=>{U.has(t)?U.delete(t):U.add(t),A()};F.addEventListener("click",t=>{if(t.target.closest("a"))return;let h=t.target.closest("[data-plan-group-toggle]");h&&k(h.dataset.planGroupToggle)}),F.addEventListener("keydown",t=>{if(t.key!=="Enter"&&t.key!==" ")return;let h=t.target.closest("[data-plan-group-toggle]");!h||h.tagName==="BUTTON"||t.target.closest("a")||(t.preventDefault(),k(h.dataset.planGroupToggle))});let Y=()=>{[S,D].forEach(t=>{t.querySelectorAll(".brand-tab").forEach(h=>h.classList.remove("is-active"))})},K=t=>{t==="all"?O=l:t==="free"?O=ne(l):p.has(t)?O=p.get(t).plans:v.has(t)&&(O=v.get(t).plans)},J=t=>{let h=g.codingPlanOverview.querySelector("#codingPlanTitle"),$=g.codingPlanOverview.querySelector("#workbenchSummary"),x=g.codingPlanOverview.querySelector("#workbenchStats");if(h&&(h.textContent=i(t==="pricing"?"pricing.title":"home.title")),$&&($.textContent=i(t==="pricing"?"pricing.summary":"home.summary")),!!x)if(t==="pricing"){let N=s.filter(Be),Z=new Set(N.map(le=>L[le.vendor]||le.vendor)).size;x.innerHTML=`<span>${N.length} ${o(i("pricing.meta.models"))}</span><span>${Z} ${o(i("pricing.meta.vendors"))}</span>`}else x.innerHTML=C},r=t=>{if(t===q)return;q=t,w.querySelectorAll("[data-dimension]").forEach($=>{$.classList.toggle("is-active",$.dataset.dimension===t)}),S.hidden=t!=="brand",D.hidden=t!=="model",c&&(c.placeholder=i(t==="brand"?"home.search.brand":"home.search.model")),W(),V="all",O=l,Y(),t==="pricing"?w.hidden=!0:(w.hidden=!1,(t==="brand"?S:D).querySelector('[data-brand="all"]')?.classList.add("is-active"));let h=g.codingPlanOverview.querySelector("#plansExport");h&&(h.hidden=t==="pricing"),R&&(R.hidden=t==="pricing"),c&&(c.value=""),d(),J(t),ze(t),A()},c=g.codingPlanOverview.querySelector("#brandSearchInput"),d=()=>{let t=(c?.value||"").trim().toLowerCase(),h=q==="brand"?S:D;h.querySelectorAll(".brand-tab[data-brand]").forEach(x=>{let N=x.dataset.brand;if(N==="all"||N==="free"){x.hidden=!1;return}let Z=(x.dataset.brandLabel||"").toLowerCase();x.hidden=t?!Z.includes(t):!1});let $=h.querySelector(".brand-divider");$&&($.hidden=!1)};c?.addEventListener("input",d),w.addEventListener("click",t=>{let h=t.target.closest("[data-dimension]");if(h){r(h.dataset.dimension);return}let $=t.target.closest(".brand-tab");if(!$||!S.contains($)&&!D.contains($))return;let x=$.dataset.brand;W(),V=x,Y(),$.classList.add("is-active"),K(x),A()}),((globalThis.location?.pathname||"").replace(/\/+$/,"")||"/")==="/model"&&r("pricing")}function ze(e){if(typeof globalThis.history?.replaceState=="function")try{let n=new URL(globalThis.location.href),a=e==="pricing"?"/model":"/";globalThis.history.replaceState(null,"",`${a}${n.search}${n.hash}`)}catch{}}function We(e){if(!g.codingPlanOverview)return;let n=e==="backend"?i("home.dataUnavailable.backend"):i("home.dataUnavailable.static");g.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div>
          <span id="codingPlanTitle" style="font-weight:bold">${o(i("home.dataUnavailable.title"))}</span>
        </div>
      </div>
      <div class="workbench-body">
        <p class="text-sm text-slate-600 dark:text-slate-300">${o(n)}</p>
      </div>
    </section>
  `,Pe()}async function Ye(){se();let e=await be();if(e.dataUnavailable){We(e.source);return}Ge(e.plans,e.providerInfo||{},e.modelCatalog||[],e.models||[])}Ye();
