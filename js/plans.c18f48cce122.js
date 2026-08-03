import{a as ue,b as me,c as be,d as H,e as te,g as fe,h as ve}from"./chunk.CJMIVDXA.js";import"./chunk.7HYUNLOO.js";import{a as ie}from"./chunk.EPE4QEOO.js";import{a as M,b as I,e as L,f as j,h as ce,i as de,j as ee,o as ne,p as pe}from"./chunk.Q3K5G6WF.js";import{a as o}from"./chunk.Y3GWXKZH.js";import{c as E,e as i}from"./chunk.CK2CXFOA.js";var he=2,Me=new Set(["claude-opus-4-8","claude-sonnet-4-6","claude-opus-4-7","claude-opus-4-6","claude-sonnet-4-5","claude-opus-4-5","claude-opus-4-1"]);function _(e){if(e==null||e==="")return null;let n=Number(e);return Number.isFinite(n)?n:null}function Q(e,n){let a=_(e);return a==null?i("pricing.pending"):`${n==="USD"?"$":"\xA5"}${a.toLocaleString(E(),{maximumFractionDigits:4})}`}function $e(e){let n=_(e);return n==null?"\u2014":n>=1e6?`${(n/1e6).toLocaleString(E(),{maximumFractionDigits:1})}M`:n>=1e3?`${(n/1e3).toLocaleString(E(),{maximumFractionDigits:0})}K`:n.toLocaleString(E())}function Le(e){return M[e]||e||i("pricing.unknownVendor")}function T(e){let n=Le(e);return n==="Anthropic"?"Claude":n}var ye={},ae=[];function we(){return ae}function xe(e){let n=j(e,ye,M),a=String(n.seo_slug||"").trim(),s=String(n.seo_intro||"").trim(),l=String(n.icon_url||"").trim();return a&&s&&l?`/brands/${encodeURIComponent(a)}/`:""}function re(e,n){let a=I(e),s=T(e),l=n||a?.iconUrl||"";return H(l,s,"brand-icon brand-icon--tab")}function G(e){let n=String(e.raw?.lifecycle_status||"").trim().toLowerCase();if(n)return n==="legacy";if(String(e.vendor||"").trim().toLowerCase()!=="anthropic")return!1;let a=String(e.raw?.model_id||e.raw?.id||e.id||"").trim().toLowerCase().replace(/[._]/g,"-");return Me.has(a)}function oe(e){let n=String(e.raw?.release_date||"").trim();if(!n)return null;let a=Date.parse(n);return Number.isFinite(a)?a:null}var X={release:{numeric:!0,raw:oe},name:{labelKey:"pricing.th.name",numeric:!1},provider:{labelKey:"pricing.th.provider",numeric:!1},context:{labelKey:"pricing.th.context",numeric:!0,raw:e=>_(e.raw?.context_length)},input:{labelKey:"pricing.th.input",numeric:!0,raw:e=>_(e.raw?.input_price)},output:{labelKey:"pricing.th.output",numeric:!0,raw:e=>_(e.raw?.output_price)}};function Te(e,n,a){let s=X[n];if(!s)return e;let l=[...e];return l.sort((p,u)=>{if(n==="release"){let m=Number(G(p))-Number(G(u));if(m!==0)return m}let v=0;if(s.numeric){let m=s.raw(p),b=s.raw(u);if(m==null||b==null)return m==null&&b==null?0:m==null?1:-1;v=m-b}else n==="name"?v=(p.modelName||"").localeCompare(u.modelName||"",E()):n==="provider"&&(v=T(p.vendor).localeCompare(T(u.vendor),E()));return a==="desc"?-v:v}),l}function _e(e){let n=new Map;for(let a of e){let s=T(a.vendor),l=n.get(s);l||(l={name:s,vendor:a.vendor,icon:a.logoUrl||a.providerIconUrl,models:[]},n.set(s,l)),l.models.push(a)}return[...n.values()]}function Ce(e,n){let a=Number(G(n))-Number(G(e));if(a!==0)return a>0;let s=oe(e),l=oe(n);return s!=null&&l!=null?s>l:s!=null&&l==null}function Oe(e){let n=new Map;for(let a of e){let s=T(a.vendor),l=n.get(s);(!l||Ce(a,l))&&n.set(s,a)}return[...n.values()]}function De(e){let n=null;for(let a of e){let s=_(a.raw?.input_price);s==null||s<0||(!n||s<n.value)&&(n={value:s,currency:a.raw?.currency})}return n}function Fe(e){let n=De(e.models),a=[];if(n){let s=n.currency==="USD"?"$":"\xA5";a.push(i("pricing.group.inputFrom",{symbol:s,price:n.value.toLocaleString(E(),{maximumFractionDigits:4})}))}return a.push(`${e.models.length} ${i("pricing.meta.models")}`),`<span class="plan-table-group-summary">${o(a.join(" \xB7 "))}</span>`}var Pe={name:e=>String(e.modelName||"").trim()||"\u2014",provider:e=>T(e.vendor),context:e=>$e(e.raw?.context_length),input:e=>Q(e.raw?.input_price,e.raw?.currency),output:e=>Q(e.raw?.output_price,e.raw?.currency)};function ge(e){return e==="\u2014"||e===i("pricing.pending")}function ke(e,n){let a=Pe[n];return a?String(a(e)||"").trim()||"\u2014":""}function Ue(e,n){let a=new Map;for(let l of e){let p=ke(l,n);a.set(p,(a.get(p)||0)+1)}let s=new Intl.Collator(E(),{numeric:!0,sensitivity:"base"});return Array.from(a.entries()).map(([l,p])=>({value:l,count:p})).sort((l,p)=>{let u=ge(l.value),v=ge(p.value);return u!==v?u?1:-1:s.compare(l.value,p.value)})}function Ae(e,n,a){return e!==n?'<svg class="model-price-sort-icon model-price-sort-icon--idle" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2l2.5 3h-5zM6 10l-2.5-3h5z" fill="currentColor"/></svg>':`<svg class="model-price-sort-icon" viewBox="0 0 12 12" aria-hidden="true"><path d="${a==="asc"?"M6 2l3 4H3z":"M6 10L3 6h6z"}" fill="currentColor"/></svg>`}function Be(e,n,a){let s=X[e],l=n.column===e&&!!n.value,p=Ue(a,e);return`<button type="button" class="plan-column-filter-trigger model-price-filter-trigger${l?" is-active":""}" data-model-filter-column="${e}" aria-haspopup="menu" aria-expanded="false" title="${o(i("table.filter.tooltip"))} ${o(i(s.labelKey))}">
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
    </div>`}function qe(e,n,a,s){let l=(p,u="")=>{let v=X[p];return`<th class="model-price-th plan-column-filter ${u}" data-sort-key="${p}" role="columnheader" aria-sort="${p===e?n==="asc"?"ascending":"descending":"none"}" tabindex="0">
      <span class="model-price-th-inner">${o(i(v.labelKey))}${Ae(p,e,n)}</span>
      ${Be(p,a,s)}
    </th>`};return`<thead class="model-price-thead">
    <tr>
      ${l("name")}
      ${l("provider","model-price-col-provider")}
      ${l("context")}
      ${l("input")}
      ${l("output")}
    </tr>
  </thead>`}function Ne(e){let n=_(e.raw?.input_price),a=_(e.raw?.output_price),s=_(e.raw?.context_length),l=e.raw?.currency,p=Q(n,l),u=Q(a,l),v=$e(s),m=T(e.vendor),b=e.sourceUrl||e.raw?.docs_url||"",g=G(e)?`<span class="model-price-legacy-badge">${o(i("pricing.legacy"))}</span>`:"",C=b?`<a class="model-price-name-link" href="${o(b)}" target="_blank" rel="noopener noreferrer nofollow">${o(e.modelName)}</a>`:`<span>${o(e.modelName)}</span>`,P=xe(e.vendor),y=`${re(e.vendor,e.logoUrl||e.providerIconUrl)}<span>${o(m)}</span>`,k=P?`<a href="${o(P)}" class="model-price-provider plan-provider-cell--link">${y}</a>`:`<span class="model-price-provider">${y}</span>`;return`<tr class="model-price-row">
    <td class="model-price-td model-price-td--name">
      <span class="model-price-model-name">${C}${g}</span>
    </td>
    <td class="model-price-td model-price-td--provider model-price-col-provider">
      ${k}
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
  </tr>`}function Se(e,n,a={}){ye=a||{};let s=n.filter(r=>_(r.raw?.input_price)!=null||_(r.raw?.output_price)!=null),l=new Map;for(let r of s){let c=T(r.vendor);l.has(c)||l.set(c,{name:c,icon:r.logoUrl||r.providerIconUrl,vendor:r.vendor})}let p=[...l.values()].sort((r,c)=>r.name.localeCompare(c.name,E())),u="all",v="release",m="desc",b="brand",g="all",C="",P="",y="",k=new Set;function D(){return!!(P&&y&&Pe[P])}function U(){return b==="model"?g==="all"?s:s.filter(r=>(r.modelName||"")===g):u==="all"?s:s.filter(r=>T(r.vendor)===u)}function V(){let r=U(),c=C.toLowerCase();return c&&(r=r.filter(d=>String(d.modelName||"").toLowerCase().includes(c)||T(d.vendor).toLowerCase().includes(c))),r}function z(r){let c=r;return D()&&(c=c.filter(d=>ke(d,P)===y)),Te(c,v,m)}function O(){return b==="model"?R():A()}function R(){let r=Oe(s).sort((f,t)=>(f.modelName||"").localeCompare(t.modelName||"",E())),c=`<button type="button" class="brand-tab${g==="all"?" is-active":""}" data-model-tab="all">
      <span>${o(i("home.tab.all"))}</span><span class="brand-count">${s.length}</span>
    </button>`,d=r.map(f=>{let t=f.modelName||"";return`<button type="button" class="brand-tab${g===t?" is-active":""}" data-model-tab="${o(t)}">
        ${re(f.vendor,f.logoUrl||f.providerIconUrl)}
        <span>${o(t)}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${c}<span class="brand-divider"></span>${d}</div>`}function A(){let r=`<button type="button" class="brand-tab${u==="all"?" is-active":""}" data-provider="all">
      <span>${o(i("home.tab.all"))}</span><span class="brand-count">${s.length}</span>
    </button>`,c=p.map(d=>{let f=s.filter(t=>T(t.vendor)===d.name).length;return`<button type="button" class="brand-tab${u===d.name?" is-active":""}" data-provider="${o(d.name)}">
        ${re(d.vendor,d.icon)}
        <span>${o(d.name)}</span>
        <span class="brand-count">${f}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${r}<span class="brand-divider"></span>${c}</div>`}function q(r,c){let d=!c&&r.models.length>he,f=c||!d||k.has(r.name),t=f?r.models:r.models.slice(0,he),h=xe(r.vendor),w=`${H(r.icon||I(r.vendor)?.iconUrl||"",r.name,"brand-icon brand-icon--section")}
            <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${o(r.name)}</span>`,x=`
            ${h?`<a href="${o(h)}" class="plan-table-group-brand">${w}</a>`:w}
            <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${r.models.length}</span>
            <span class="plan-table-group-right">
              ${Fe(r)}
              ${d?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
            </span>`;return`
      <tr class="border-y border-slate-200 dark:border-slate-700">
        <td colspan="5" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
          ${d?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-model-group-toggle="${o(r.name)}" aria-expanded="${f?"true":"false"}" aria-label="${f?i("group.collapse"):i("group.expand")} ${o(r.name)}">${x}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${x}</div>`}
        </td>
      </tr>
      ${t.map(Ne).join("")}`}function F(r,c){return D()?`<div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${o(i(X[P].labelKey))}</span>
        <strong>${o(y)}</strong>
      </span>
      <span class="plan-table-filter-count">${r} / ${c} ${o(i("table.filter.count"))}</span>
      <button type="button" class="plan-table-filter-clear" data-model-filter-clear>${o(i("table.filter.clear"))}</button>
    </div>`:""}function B(){let r=V();if(!r.length)return ae=[],`<p class="model-price-empty">${o(i("pricing.empty"))}</p>`;let c=z(r);ae=c;let d=u!=="all"||g!=="all"||D()||!!C,f=c.length?_e(c).map(t=>q(t,d)).join(""):`<tr>
          <td colspan="5" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">${o(i("pricing.empty"))}</td>
        </tr>`;return`${F(c.length,r.length)}
    <div class="model-price-table-wrap">
      <table class="model-price-table" role="grid" aria-label="${o(i("pricing.table.aria"))}">
        ${qe(v,m,{column:P,value:y},r)}
        <tbody class="model-price-tbody">
          ${f}
        </tbody>
      </table>
    </div>
    <p class="model-price-footnote">${o(i("pricing.footnote"))}</p>`}function W(){return`<div class="brand-filter-row model-price-toolbar">
      <div class="brand-tab-list">
        <button type="button" data-model-dimension="brand" class="brand-tab${b==="brand"?" is-active":""}"><span>${o(i("home.dimension.brand"))}</span></button>
        <button type="button" data-model-dimension="model" class="brand-tab${b==="model"?" is-active":""}"><span>${o(i("home.dimension.model"))}</span></button>
      </div>
      <div class="brand-search-box">
        <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
        <input type="search" class="brand-search-input" data-model-search placeholder="${o(i("home.search.model"))}" autocomplete="off" aria-label="${o(i("home.search.aria"))}" value="${o(C)}">
      </div>
    </div>`}function le(){e.innerHTML=`
      <div class="model-price-view">
        ${W()}
        <div class="model-price-content" data-model-price-content></div>
      </div>`,Y(),S()}function S(){let r=e.querySelector("[data-model-price-content]");r&&(r.innerHTML=`${O()}${B()}`,J())}function Y(){e.querySelectorAll("[data-model-dimension]").forEach(c=>{c.addEventListener("click",()=>{let d=c.dataset.modelDimension;if(d===b)return;b=d,u="all",g="all",C="";let f=e.querySelector("[data-model-search]");f&&(f.value=""),e.querySelectorAll("[data-model-dimension]").forEach(t=>{t.classList.toggle("is-active",t.dataset.modelDimension===d)}),S()})});let r=e.querySelector("[data-model-search]");r?.addEventListener("input",()=>{C=r.value.trim(),S()})}function K(){e.querySelectorAll(".plan-column-filter-menu").forEach(r=>{r.hidden=!0}),e.querySelectorAll("[data-model-filter-column]").forEach(r=>r.setAttribute("aria-expanded","false"))}function J(){e.querySelectorAll(".model-price-tabs .brand-tab").forEach(r=>{r.addEventListener("click",()=>{r.dataset.modelTab!=null?g=r.dataset.modelTab:u=r.dataset.provider,S()})}),e.querySelectorAll("[data-model-group-toggle]").forEach(r=>{let c=d=>{if(d?.target?.closest?.("a"))return;let f=r.dataset.modelGroupToggle;k.has(f)?k.delete(f):k.add(f),S()};r.addEventListener("click",c),r.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),c(d))})}),e.querySelectorAll("[data-model-filter-column]").forEach(r=>{r.addEventListener("click",c=>{c.stopPropagation();let d=r.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!d)return;let f=!d.hidden;K(),f||(d.hidden=!1,r.setAttribute("aria-expanded","true"))}),r.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),c.stopPropagation(),r.click())})}),e.querySelectorAll("[data-model-filter-menu]").forEach(r=>{r.addEventListener("click",c=>{c.stopPropagation();let d=c.target.closest("[data-model-filter-value]");if(!d)return;let f=d.dataset.modelFilterValue||"";P=f?r.dataset.modelFilterMenu:"",y=f,S()})}),e.querySelectorAll("[data-model-filter-clear]").forEach(r=>{r.addEventListener("click",()=>{P="",y="",S()})}),e.querySelectorAll(".model-price-th[data-sort-key]").forEach(r=>{let c=d=>{if(d?.target?.closest?.(".plan-column-filter-trigger, .plan-column-filter-menu"))return;let f=r.dataset.sortKey;v===f?m=m==="asc"?"desc":"asc":(v=f,m="asc"),S()};r.addEventListener("click",c),r.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),c(d))})})}e._modelFilterDocClose&&(document.removeEventListener("click",e._modelFilterDocClose),document.removeEventListener("keydown",e._modelFilterDocKey)),e._modelFilterDocClose=r=>{e.contains(r.target)||K()},e._modelFilterDocKey=r=>{r.key==="Escape"&&K()},document.addEventListener("click",e._modelFilterDocClose),document.addEventListener("keydown",e._modelFilterDocKey),le()}var Ie=[{id:"all",labelKey:"home.tab.all"},{id:"free",labelKey:"home.tab.free"}];function He(e){let n=e.raw?.input_price,a=e.raw?.output_price;return n!=null&&n!==""||a!=null&&a!==""}function Ve(e){let n=e.filter(a=>(a.monthlyCurrency||"USD")==="USD").map(a=>a.monthlyPriceValue).filter(a=>Number.isFinite(a)&&a>0);return n.length?n.reduce((a,s)=>a+s,0)/n.length:null}var $={codingPlanOverview:document.getElementById("codingPlanOverview")};function Ee(){$.codingPlanOverview&&($.codingPlanOverview.classList.remove("plans-loading-shell"),$.codingPlanOverview.setAttribute("aria-busy","false"))}function Re(e,n){let a=new Map;for(let s of e){let l=I(s.provider),p=String(s.provider||"").trim(),u=M[p]||p;if(!u)continue;let v=j(p,n,M),m=l?.id||u,b=a.get(m);b?b.iconUrl||(b.iconUrl=L(v.icon_url)||L(s.providerIconUrl)||L(l?.iconUrl)):(b={id:m,provider:p,label:ce(p,n,M),iconUrl:L(v.icon_url)||L(s.providerIconUrl)||L(l?.iconUrl),sortOrder:de(p,n,M),plans:[]},a.set(m,b)),b.plans.push(s)}for(let s of a.values())s.plans=ee(s.plans);return a}function Ke(e,n,a={}){let s=new Map;for(let l of n){let p=e.filter(m=>Array.isArray(m.modelIds)&&m.modelIds.includes(l.id));if(!p.length)continue;let u=j(l.provider,a,M),v=L(l.logoUrl)||L(u.icon_url)||L(l.providerIconUrl)||L(I(l.provider)?.iconUrl);s.set(`model:${l.id}`,{id:`model:${l.id}`,label:l.name||l.id,iconUrl:v,sortOrder:Number.isFinite(l.sortOrder)?l.sortOrder:99,plans:ee(p)})}return s}function je(){return`
    <div class="cn-hero-banner" role="complementary" aria-label="${o(i("home.hero.aria"))}">
      <div class="cn-hero-banner__points">
        <span class="cn-hero-point"><span aria-hidden="true">$</span>${o(i("home.hero.usd"))}</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25A1</span>${o(i("home.hero.card"))}</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25C8</span>${o(i("home.hero.global"))}</span>
      </div>
      <a class="cn-hero-banner__intl" href="https://www.creditsplan.cn/" target="_blank" rel="noopener noreferrer">${o(i("home.hero.cnLink"))}</a>
    </div>
  `}function Ge(e){let n=$.codingPlanOverview.querySelector("#plansBackTop");if(!n||!e)return;let a=()=>{let s=e.getBoundingClientRect();n.classList.toggle("is-visible",s.top<-160&&s.bottom>160)};n.addEventListener("click",()=>{let s=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({behavior:s?"auto":"smooth",block:"start"})}),window.addEventListener("scroll",a,{passive:!0}),window.addEventListener("resize",a),a()}function ze(){return`
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
  `}function We(e,n,a){let s=e.querySelector("#plansExportTrigger"),l=e.querySelector("#plansExportMenu");if(!s||!l)return;let p=()=>{l.hidden=!0,s.setAttribute("aria-expanded","false")};s.addEventListener("click",()=>{let u=l.hidden;l.hidden=!u,s.setAttribute("aria-expanded",String(u))}),document.addEventListener("click",u=>{e.querySelector("#plansExport")?.contains(u.target)||p()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&p()}),l.addEventListener("click",async u=>{let v=u.target.closest("[data-export-format]");if(!v)return;p();let m=v.dataset.exportFormat,b=n(),g=await import("./chunk.5UFJ6UU4.js");if(b.kind==="models"){m==="excel"?g.exportModelsExcel(b.models):m==="word"?g.exportModelsWord(b.models):m==="pdf"&&g.exportModelsPdf(b.models);return}m==="excel"?g.exportPlansExcel(b.plans,a):m==="word"?g.exportPlansWord(b.plans,a):m==="pdf"&&g.exportPlansPdf(b.plans,a)})}function Ye(e,n={},a=[],s=[]){if(!$.codingPlanOverview)return;let l=pe(e,n,M),p=Re(l,n),u=[...p.values()].sort((t,h)=>t.sortOrder-h.sortOrder),v=Ke(l,a,n),m=[...v.values()].sort((t,h)=>t.sortOrder-h.sortOrder||t.label.localeCompare(h.label,"zh-CN")),b={all:l.length,free:ne(l).length},g=Ve(l),C=`
            <span>${l.length} ${o(i("home.meta.records"))}</span>
            <span>${u.length} ${o(i("home.meta.brands"))}</span>
            <span>${m.length} ${o(i("home.meta.models"))}</span>
            ${g!=null?`<span>${o(i("home.meta.avgMonthly"))} $${Math.round(g)}</span>`:""}`;$.codingPlanOverview.innerHTML=`
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
          ${ze()}
        </div>
      </div>
      ${je()}
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
            ${Ie.map(t=>`
              <button type="button" data-brand="${t.id}" data-brand-label="${o(i(t.labelKey))}" class="brand-tab${t.id==="all"?" is-active":""}">
                <span>${o(i(t.labelKey))}</span>
                ${b[t.id]>0?`<span class="brand-count">${b[t.id]}</span>`:""}
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
              ${b.all>0?`<span class="brand-count">${b.all}</span>`:""}
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
  `,Ee();let P=$.codingPlanOverview.querySelector(".plans-workbench"),y=$.codingPlanOverview.querySelector("#brandFilterBar"),k=$.codingPlanOverview.querySelector("#brandTabs"),D=$.codingPlanOverview.querySelector("#modelTabs"),U=$.codingPlanOverview.querySelector("#brandDetail");Ge(P);let V=$.codingPlanOverview.querySelector("#planAdvisorFab"),z=fe({plans:l,providerInfo:n,modelCatalog:a,fab:V});z&&location.hash==="#advisor"&&z.open();let O=l;We($.codingPlanOverview,()=>({kind:A==="pricing"?"models":"plans",plans:me(O),models:we()}),n);let R="all",A="brand",q="",F=new Set,B=()=>{if(A==="pricing"){Se(U,s,n);return}U.innerHTML=te(O,q,n,F,R!=="all")},W=()=>{ue(),q="",F.clear()};be(U,()=>O,()=>{F.clear(),B()},t=>{q=q===t?"":t,B()});let S=t=>{F.has(t)?F.delete(t):F.add(t),B()};U.addEventListener("click",t=>{if(t.target.closest("a"))return;let h=t.target.closest("[data-plan-group-toggle]");h&&S(h.dataset.planGroupToggle)}),U.addEventListener("keydown",t=>{if(t.key!=="Enter"&&t.key!==" ")return;let h=t.target.closest("[data-plan-group-toggle]");!h||h.tagName==="BUTTON"||t.target.closest("a")||(t.preventDefault(),S(h.dataset.planGroupToggle))});let Y=()=>{[k,D].forEach(t=>{t.querySelectorAll(".brand-tab").forEach(h=>h.classList.remove("is-active"))})},K=t=>{t==="all"?O=l:t==="free"?O=ne(l):p.has(t)?O=p.get(t).plans:v.has(t)&&(O=v.get(t).plans)},J=t=>{let h=$.codingPlanOverview.querySelector("#codingPlanTitle"),w=$.codingPlanOverview.querySelector("#workbenchSummary"),x=$.codingPlanOverview.querySelector("#workbenchStats");if(h&&(h.textContent=i(t==="pricing"?"pricing.title":"home.title")),w&&(w.textContent=i(t==="pricing"?"pricing.summary":"home.summary")),!!x)if(t==="pricing"){let N=s.filter(He),Z=new Set(N.map(se=>M[se.vendor]||se.vendor)).size;x.innerHTML=`<span>${N.length} ${o(i("pricing.meta.models"))}</span><span>${Z} ${o(i("pricing.meta.vendors"))}</span>`}else x.innerHTML=C},r=t=>{t!==A&&(A=t,y.querySelectorAll("[data-dimension]").forEach(h=>{h.classList.toggle("is-active",h.dataset.dimension===t)}),k.hidden=t!=="brand",D.hidden=t!=="model",c&&(c.placeholder=i(t==="brand"?"home.search.brand":"home.search.model")),W(),R="all",O=l,Y(),t==="pricing"?y.hidden=!0:(y.hidden=!1,(t==="brand"?k:D).querySelector('[data-brand="all"]')?.classList.add("is-active")),V&&(V.hidden=t==="pricing"),c&&(c.value=""),d(),J(t),Qe(t),B())},c=$.codingPlanOverview.querySelector("#brandSearchInput"),d=()=>{let t=(c?.value||"").trim().toLowerCase(),h=A==="brand"?k:D;h.querySelectorAll(".brand-tab[data-brand]").forEach(x=>{let N=x.dataset.brand;if(N==="all"||N==="free"){x.hidden=!1;return}let Z=(x.dataset.brandLabel||"").toLowerCase();x.hidden=t?!Z.includes(t):!1});let w=h.querySelector(".brand-divider");w&&(w.hidden=!1)};c?.addEventListener("input",d),y.addEventListener("click",t=>{let h=t.target.closest("[data-dimension]");if(h){r(h.dataset.dimension);return}let w=t.target.closest(".brand-tab");if(!w||!k.contains(w)&&!D.contains(w))return;let x=w.dataset.brand;W(),R=x,Y(),w.classList.add("is-active"),K(x),B()}),((globalThis.location?.pathname||"").replace(/\/+$/,"")||"/")==="/model"&&r("pricing")}function Qe(e){if(typeof globalThis.history?.replaceState=="function")try{let n=new URL(globalThis.location.href),a=e==="pricing"?"/model":"/";globalThis.history.replaceState(null,"",`${a}${n.search}${n.hash}`)}catch{}}function Xe(e){if(!$.codingPlanOverview)return;let n=e==="backend"?i("home.dataUnavailable.backend"):i("home.dataUnavailable.static");$.codingPlanOverview.innerHTML=`
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
  `,Ee()}async function Je(){ie();let e=await ve();if(e.dataUnavailable){Xe(e.source);return}Ye(e.plans,e.providerInfo||{},e.modelCatalog||[],e.models||[])}Je();
