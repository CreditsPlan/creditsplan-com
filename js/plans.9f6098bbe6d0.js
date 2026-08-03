import{a as be,b as fe,c as ve,d as ge,e as he,f as V,g as oe,i as ye,j as $e}from"./chunk.OTKGBN7G.js";import"./chunk.7HYUNLOO.js";import{a as de}from"./chunk.Y4O76HUE.js";import{a as M,b as R,e as L,f as z,h as pe,i as ue,j as ae,o as re,p as me}from"./chunk.56ODY2JA.js";import{c as E,e as i,h as r}from"./chunk.S2U5UH7Q.js";var we=2,Oe=new Set(["claude-opus-4-8","claude-sonnet-4-6","claude-opus-4-7","claude-opus-4-6","claude-sonnet-4-5","claude-opus-4-5","claude-opus-4-1"]);function _(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function J(e,t){let n=_(e);return n==null?i("pricing.pending"):`${t==="USD"?"$":"\xA5"}${n.toLocaleString(E(),{maximumFractionDigits:4})}`}function Pe(e){let t=_(e);return t==null?"\u2014":t>=1e6?`${(t/1e6).toLocaleString(E(),{maximumFractionDigits:1})}M`:t>=1e3?`${(t/1e3).toLocaleString(E(),{maximumFractionDigits:0})}K`:t.toLocaleString(E())}function Ce(e){return M[e]||e||i("pricing.unknownVendor")}function T(e){let t=Ce(e);return t==="Anthropic"?"Claude":t}var ke={},le=[];function Se(){return le}function Ee(e){let t=z(e,ke,M),n=String(t.seo_slug||"").trim(),s=String(t.seo_intro||"").trim(),l=String(t.icon_url||"").trim();return n&&s&&l?`/brands/${encodeURIComponent(n)}/`:""}function se(e,t){let n=R(e),s=T(e),l=t||n?.iconUrl||"";return V(l,s,"brand-icon brand-icon--tab")}function W(e){let t=String(e.raw?.lifecycle_status||"").trim().toLowerCase();if(t)return t==="legacy";if(String(e.vendor||"").trim().toLowerCase()!=="anthropic")return!1;let n=String(e.raw?.model_id||e.raw?.id||e.id||"").trim().toLowerCase().replace(/[._]/g,"-");return Oe.has(n)}function ie(e){let t=String(e.raw?.release_date||"").trim();if(!t)return null;let n=Date.parse(t);return Number.isFinite(n)?n:null}var Z={release:{numeric:!0,raw:ie},name:{labelKey:"pricing.th.name",numeric:!1},provider:{labelKey:"pricing.th.provider",numeric:!1},context:{labelKey:"pricing.th.context",numeric:!0,raw:e=>_(e.raw?.context_length)},input:{labelKey:"pricing.th.input",numeric:!0,raw:e=>_(e.raw?.input_price)},output:{labelKey:"pricing.th.output",numeric:!0,raw:e=>_(e.raw?.output_price)}};function Ae(e,t,n){let s=Z[t];if(!s)return e;let l=[...e];return l.sort((p,u)=>{if(t==="release"){let b=Number(W(p))-Number(W(u));if(b!==0)return b}let v=0;if(s.numeric){let b=s.raw(p),f=s.raw(u);if(b==null||f==null)return b==null&&f==null?0:b==null?1:-1;v=b-f}else t==="name"?v=(p.modelName||"").localeCompare(u.modelName||"",E()):t==="provider"&&(v=T(p.vendor).localeCompare(T(u.vendor),E()));return n==="desc"?-v:v}),l}function De(e){let t=new Map;for(let n of e){let s=T(n.vendor),l=t.get(s);l||(l={name:s,vendor:n.vendor,icon:n.logoUrl||n.providerIconUrl,models:[]},t.set(s,l)),l.models.push(n)}return[...t.values()]}function Ue(e,t){let n=Number(W(t))-Number(W(e));if(n!==0)return n>0;let s=ie(e),l=ie(t);return s!=null&&l!=null?s>l:s!=null&&l==null}function Fe(e){let t=new Map;for(let n of e){let s=T(n.vendor),l=t.get(s);(!l||Ue(n,l))&&t.set(s,n)}return[...t.values()]}function qe(e){let t=null;for(let n of e){let s=_(n.raw?.input_price);s==null||s<0||(!t||s<t.value)&&(t={value:s,currency:n.raw?.currency})}return t}function Be(e){let t=qe(e.models),n=[];if(t){let s=t.currency==="USD"?"$":"\xA5";n.push(i("pricing.group.inputFrom",{symbol:s,price:t.value.toLocaleString(E(),{maximumFractionDigits:4})}))}return n.push(`${e.models.length} ${i("pricing.meta.models")}`),`<span class="plan-table-group-summary">${r(n.join(" \xB7 "))}</span>`}var Me={name:e=>String(e.modelName||"").trim()||"\u2014",provider:e=>T(e.vendor),context:e=>Pe(e.raw?.context_length),input:e=>J(e.raw?.input_price,e.raw?.currency),output:e=>J(e.raw?.output_price,e.raw?.currency)};function xe(e){return e==="\u2014"||e===i("pricing.pending")}function Le(e,t){let n=Me[t];return n?String(n(e)||"").trim()||"\u2014":""}function Ne(e,t){let n=new Map;for(let l of e){let p=Le(l,t);n.set(p,(n.get(p)||0)+1)}let s=new Intl.Collator(E(),{numeric:!0,sensitivity:"base"});return Array.from(n.entries()).map(([l,p])=>({value:l,count:p})).sort((l,p)=>{let u=xe(l.value),v=xe(p.value);return u!==v?u?1:-1:s.compare(l.value,p.value)})}function Ie(e,t,n){return e!==t?'<svg class="model-price-sort-icon model-price-sort-icon--idle" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2l2.5 3h-5zM6 10l-2.5-3h5z" fill="currentColor"/></svg>':`<svg class="model-price-sort-icon" viewBox="0 0 12 12" aria-hidden="true"><path d="${n==="asc"?"M6 2l3 4H3z":"M6 10L3 6h6z"}" fill="currentColor"/></svg>`}function He(e,t,n){let s=Z[e],l=t.column===e&&!!t.value,p=Ne(n,e);return`<button type="button" class="plan-column-filter-trigger model-price-filter-trigger${l?" is-active":""}" data-model-filter-column="${e}" aria-haspopup="menu" aria-expanded="false" title="${r(i("table.filter.tooltip"))} ${r(i(s.labelKey))}">
      <span class="plan-column-filter-caret" aria-hidden="true"></span>
    </button>
    <div class="plan-column-filter-menu" data-model-filter-menu="${e}" role="menu" hidden>
      <button type="button" class="plan-column-filter-option${l?"":" is-active"}" data-model-filter-value="">
        <span class="plan-column-filter-option-label">${r(i("table.filter.all"))}</span>
        <span class="plan-column-filter-option-count">${n.length}</span>
      </button>
      ${p.map(u=>`
        <button type="button" class="plan-column-filter-option${l&&u.value===t.value?" is-active":""}" data-model-filter-value="${r(u.value)}">
          <span class="plan-column-filter-option-label">${r(u.value)}</span>
          <span class="plan-column-filter-option-count">${u.count}</span>
        </button>
      `).join("")}
    </div>`}function Re(e,t,n,s){let l=(p,u="")=>{let v=Z[p];return`<th class="model-price-th plan-column-filter ${u}" data-sort-key="${p}" role="columnheader" aria-sort="${p===e?t==="asc"?"ascending":"descending":"none"}" tabindex="0">
      <span class="model-price-th-inner">${r(i(v.labelKey))}${Ie(p,e,t)}</span>
      ${He(p,n,s)}
    </th>`};return`<thead class="model-price-thead">
    <tr>
      ${l("name")}
      ${l("provider","model-price-col-provider")}
      ${l("context")}
      ${l("input")}
      ${l("output")}
    </tr>
  </thead>`}function Ve(e){let t=_(e.raw?.input_price),n=_(e.raw?.output_price),s=_(e.raw?.context_length),l=e.raw?.currency,p=J(t,l),u=J(n,l),v=Pe(s),b=T(e.vendor),f=e.sourceUrl||e.raw?.docs_url||"",h=W(e)?`<span class="model-price-legacy-badge">${r(i("pricing.legacy"))}</span>`:"",O=f?`<a class="model-price-name-link" href="${r(f)}" target="_blank" rel="noopener noreferrer nofollow">${r(e.modelName)}</a>`:`<span>${r(e.modelName)}</span>`,P=Ee(e.vendor),w=`${se(e.vendor,e.logoUrl||e.providerIconUrl)}<span>${r(b)}</span>`,k=P?`<a href="${r(P)}" class="model-price-provider plan-provider-cell--link">${w}</a>`:`<span class="model-price-provider">${w}</span>`;return`<tr class="model-price-row">
    <td class="model-price-td model-price-td--name">
      <span class="model-price-model-name">${O}${h}</span>
    </td>
    <td class="model-price-td model-price-td--provider model-price-col-provider">
      ${k}
    </td>
    <td class="model-price-td model-price-td--context">${r(v)}</td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${t==null?" model-price-value--empty":""}">${r(p)}</span>
      ${t!=null?`<span class="model-price-unit">${r(i("pricing.unit"))}</span>`:""}
    </td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${n==null?" model-price-value--empty":""}">${r(u)}</span>
      ${n!=null?`<span class="model-price-unit">${r(i("pricing.unit"))}</span>`:""}
    </td>
  </tr>`}function Te(e,t,n={}){ke=n||{};let s=t.filter(a=>_(a.raw?.input_price)!=null||_(a.raw?.output_price)!=null),l=new Map;for(let a of s){let c=T(a.vendor);l.has(c)||l.set(c,{name:c,icon:a.logoUrl||a.providerIconUrl,vendor:a.vendor})}let p=[...l.values()].sort((a,c)=>a.name.localeCompare(c.name,E())),u="all",v="release",b="desc",f="brand",h="all",O="",P="",w="",k=new Set;function A(){return!!(P&&w&&Me[P])}function q(){return f==="model"?h==="all"?s:s.filter(a=>(a.modelName||"")===h):u==="all"?s:s.filter(a=>T(a.vendor)===u)}function K(){let a=q(),c=O.toLowerCase();return c&&(a=a.filter(d=>String(d.modelName||"").toLowerCase().includes(c)||T(d.vendor).toLowerCase().includes(c))),a}function Y(a){let c=a;return A()&&(c=c.filter(d=>Le(d,P)===w)),Ae(c,v,b)}function C(){return f==="model"?j():B()}function j(){let a=Fe(s).sort((m,$)=>(m.modelName||"").localeCompare($.modelName||"",E())),c=`<button type="button" class="brand-tab${h==="all"?" is-active":""}" data-model-tab="all">
      <span>${r(i("home.tab.all"))}</span><span class="brand-count">${s.length}</span>
    </button>`,d=a.map(m=>{let $=m.modelName||"";return`<button type="button" class="brand-tab${h===$?" is-active":""}" data-model-tab="${r($)}">
        ${se(m.vendor,m.logoUrl||m.providerIconUrl)}
        <span>${r($)}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${c}<span class="brand-divider"></span>${d}</div>`}function B(){let a=`<button type="button" class="brand-tab${u==="all"?" is-active":""}" data-provider="all">
      <span>${r(i("home.tab.all"))}</span><span class="brand-count">${s.length}</span>
    </button>`,c=p.map(d=>{let m=s.filter($=>T($.vendor)===d.name).length;return`<button type="button" class="brand-tab${u===d.name?" is-active":""}" data-provider="${r(d.name)}">
        ${se(d.vendor,d.icon)}
        <span>${r(d.name)}</span>
        <span class="brand-count">${m}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${a}<span class="brand-divider"></span>${c}</div>`}function I(a,c){let d=!c&&a.models.length>we,m=c||!d||k.has(a.name),$=m?a.models:a.models.slice(0,we),te=Ee(a.vendor),o=`${V(a.icon||R(a.vendor)?.iconUrl||"",a.name,"brand-icon brand-icon--section")}
            <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${r(a.name)}</span>`,g=`
            ${te?`<a href="${r(te)}" class="plan-table-group-brand">${o}</a>`:o}
            <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${a.models.length}</span>
            <span class="plan-table-group-right">
              ${Be(a)}
              ${d?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
            </span>`;return`
      <tr class="border-y border-slate-200 dark:border-slate-700">
        <td colspan="5" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
          ${d?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-model-group-toggle="${r(a.name)}" aria-expanded="${m?"true":"false"}" aria-label="${m?i("group.collapse"):i("group.expand")} ${r(a.name)}">${g}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${g}</div>`}
        </td>
      </tr>
      ${$.map(Ve).join("")}`}function U(a,c){return A()?`<div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${r(i(Z[P].labelKey))}</span>
        <strong>${r(w)}</strong>
      </span>
      <span class="plan-table-filter-count">${a} / ${c} ${r(i("table.filter.count"))}</span>
      <button type="button" class="plan-table-filter-clear" data-model-filter-clear>${r(i("table.filter.clear"))}</button>
    </div>`:""}function G(){let a=K();if(!a.length)return le=[],`<p class="model-price-empty">${r(i("pricing.empty"))}</p>`;let c=Y(a);le=c;let d=u!=="all"||h!=="all"||A()||!!O,m=c.length?De(c).map($=>I($,d)).join(""):`<tr>
          <td colspan="5" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">${r(i("pricing.empty"))}</td>
        </tr>`;return`${U(c.length,a.length)}
    <div class="model-price-table-wrap">
      <table class="model-price-table" role="grid" aria-label="${r(i("pricing.table.aria"))}">
        ${Re(v,b,{column:P,value:w},a)}
        <tbody class="model-price-tbody">
          ${m}
        </tbody>
      </table>
    </div>
    <p class="model-price-footnote">${r(i("pricing.footnote"))}</p>`}function ee(){return`<div class="brand-filter-row model-price-toolbar">
      <div class="brand-tab-list">
        <button type="button" data-model-dimension="brand" class="brand-tab${f==="brand"?" is-active":""}"><span>${r(i("home.dimension.brand"))}</span></button>
        <button type="button" data-model-dimension="model" class="brand-tab${f==="model"?" is-active":""}"><span>${r(i("home.dimension.model"))}</span></button>
      </div>
      <div class="brand-search-box">
        <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
        <input type="search" class="brand-search-input" data-model-search placeholder="${r(i("home.search.model"))}" autocomplete="off" aria-label="${r(i("home.search.aria"))}" value="${r(O)}">
      </div>
    </div>`}function N(){e.innerHTML=`
      <div class="model-price-view">
        ${ee()}
        <div class="model-price-content" data-model-price-content></div>
      </div>`,Q(),S()}function S(){let a=e.querySelector("[data-model-price-content]");a&&(a.innerHTML=`${C()}${G()}`,X())}function Q(){e.querySelectorAll("[data-model-dimension]").forEach(c=>{c.addEventListener("click",()=>{let d=c.dataset.modelDimension;if(d===f)return;f=d,u="all",h="all",O="";let m=e.querySelector("[data-model-search]");m&&(m.value=""),e.querySelectorAll("[data-model-dimension]").forEach($=>{$.classList.toggle("is-active",$.dataset.modelDimension===d)}),S()})});let a=e.querySelector("[data-model-search]");a?.addEventListener("input",()=>{O=a.value.trim(),S()})}function H(){e.querySelectorAll(".plan-column-filter-menu").forEach(a=>{a.hidden=!0}),e.querySelectorAll("[data-model-filter-column]").forEach(a=>a.setAttribute("aria-expanded","false"))}function X(){e.querySelectorAll(".model-price-tabs .brand-tab").forEach(a=>{a.addEventListener("click",()=>{a.dataset.modelTab!=null?h=a.dataset.modelTab:u=a.dataset.provider,S()})}),e.querySelectorAll("[data-model-group-toggle]").forEach(a=>{let c=d=>{if(d?.target?.closest?.("a"))return;let m=a.dataset.modelGroupToggle;k.has(m)?k.delete(m):k.add(m),S()};a.addEventListener("click",c),a.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),c(d))})}),e.querySelectorAll("[data-model-filter-column]").forEach(a=>{a.addEventListener("click",c=>{c.stopPropagation();let d=a.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!d)return;let m=!d.hidden;H(),m||(d.hidden=!1,a.setAttribute("aria-expanded","true"))}),a.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),c.stopPropagation(),a.click())})}),e.querySelectorAll("[data-model-filter-menu]").forEach(a=>{a.addEventListener("click",c=>{c.stopPropagation();let d=c.target.closest("[data-model-filter-value]");if(!d)return;let m=d.dataset.modelFilterValue||"";P=m?a.dataset.modelFilterMenu:"",w=m,S()})}),e.querySelectorAll("[data-model-filter-clear]").forEach(a=>{a.addEventListener("click",()=>{P="",w="",S()})}),e.querySelectorAll(".model-price-th[data-sort-key]").forEach(a=>{let c=d=>{if(d?.target?.closest?.(".plan-column-filter-trigger, .plan-column-filter-menu"))return;let m=a.dataset.sortKey;v===m?b=b==="asc"?"desc":"asc":(v=m,b="asc"),S()};a.addEventListener("click",c),a.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),c(d))})})}e._modelFilterDocClose&&(document.removeEventListener("click",e._modelFilterDocClose),document.removeEventListener("keydown",e._modelFilterDocKey)),e._modelFilterDocClose=a=>{e.contains(a.target)||H()},e._modelFilterDocKey=a=>{a.key==="Escape"&&H()},document.addEventListener("click",e._modelFilterDocClose),document.addEventListener("keydown",e._modelFilterDocKey),N()}var Ke=[{id:"all",labelKey:"home.tab.all"},{id:"free",labelKey:"home.tab.free"}];function je(e){let t=e.raw?.input_price,n=e.raw?.output_price;return t!=null&&t!==""||n!=null&&n!==""}function Ge(e){let t=e.filter(n=>(n.monthlyCurrency||"USD")==="USD").map(n=>n.monthlyPriceValue).filter(n=>Number.isFinite(n)&&n>0);return t.length?t.reduce((n,s)=>n+s,0)/t.length:null}var y={codingPlanOverview:document.getElementById("codingPlanOverview")};function _e(){y.codingPlanOverview&&(y.codingPlanOverview.classList.remove("plans-loading-shell"),y.codingPlanOverview.setAttribute("aria-busy","false"))}function ze(e,t){let n=new Map;for(let s of e){let l=R(s.provider),p=String(s.provider||"").trim(),u=M[p]||p;if(!u)continue;let v=z(p,t,M),b=l?.id||u,f=n.get(b);f?f.iconUrl||(f.iconUrl=L(v.icon_url)||L(s.providerIconUrl)||L(l?.iconUrl)):(f={id:b,provider:p,label:pe(p,t,M),iconUrl:L(v.icon_url)||L(s.providerIconUrl)||L(l?.iconUrl),sortOrder:ue(p,t,M),plans:[]},n.set(b,f)),f.plans.push(s)}for(let s of n.values())s.plans=ae(s.plans);return n}function We(e,t,n={}){let s=new Map;for(let l of t){let p=e.filter(b=>Array.isArray(b.modelIds)&&b.modelIds.includes(l.id));if(!p.length)continue;let u=z(l.provider,n,M),v=L(l.logoUrl)||L(u.icon_url)||L(l.providerIconUrl)||L(R(l.provider)?.iconUrl);s.set(`model:${l.id}`,{id:`model:${l.id}`,label:l.name||l.id,iconUrl:v,sortOrder:Number.isFinite(l.sortOrder)?l.sortOrder:99,plans:ae(p)})}return s}function Ye(){return`
    <div class="cn-hero-banner" role="complementary" aria-label="${r(i("home.hero.aria"))}">
      <div class="cn-hero-banner__points">
        <span class="cn-hero-point"><span aria-hidden="true">$</span>${r(i("home.hero.usd"))}</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25A1</span>${r(i("home.hero.card"))}</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25C8</span>${r(i("home.hero.global"))}</span>
      </div>
      <a class="cn-hero-banner__intl" href="https://www.creditsplan.cn/" target="_blank" rel="noopener noreferrer">${r(i("home.hero.cnLink"))}</a>
    </div>
  `}function Qe(e){let t=y.codingPlanOverview.querySelector("#plansBackTop");if(!t||!e)return;let n=()=>{let s=e.getBoundingClientRect();t.classList.toggle("is-visible",s.top<-160&&s.bottom>160)};t.addEventListener("click",()=>{let s=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({behavior:s?"auto":"smooth",block:"start"})}),window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n),n()}function Xe(){return`
    <div class="plans-export" id="plansExport">
      <button type="button" class="plans-export-trigger" id="plansExportTrigger" aria-haspopup="menu" aria-expanded="false" title="${r(i("export.trigger.title"))}">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
          <path d="M10 3v10m0 0 3.5-3.5M10 13 6.5 9.5M4 15.5h12" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>${r(i("export.trigger"))}</span>
      </button>
      <div class="plans-export-menu" id="plansExportMenu" role="menu" hidden>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="excel">
          <span class="plans-export-option-icon plans-export-option-icon--excel" aria-hidden="true">X</span>
          <span class="plans-export-option-text"><strong>Excel</strong><small>${r(i("export.excel.desc"))}</small></span>
        </button>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="word">
          <span class="plans-export-option-icon plans-export-option-icon--word" aria-hidden="true">W</span>
          <span class="plans-export-option-text"><strong>Word</strong><small>${r(i("export.word.desc"))}</small></span>
        </button>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="pdf">
          <span class="plans-export-option-icon plans-export-option-icon--pdf" aria-hidden="true">P</span>
          <span class="plans-export-option-text"><strong>PDF</strong><small>${r(i("export.pdf.desc"))}</small></span>
        </button>
      </div>
    </div>
  `}function Je(e,t,n){let s=e.querySelector("#plansExportTrigger"),l=e.querySelector("#plansExportMenu");if(!s||!l)return;let p=()=>{l.hidden=!0,s.setAttribute("aria-expanded","false")};s.addEventListener("click",()=>{let u=l.hidden;l.hidden=!u,s.setAttribute("aria-expanded",String(u))}),document.addEventListener("click",u=>{e.querySelector("#plansExport")?.contains(u.target)||p()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&p()}),l.addEventListener("click",async u=>{let v=u.target.closest("[data-export-format]");if(!v)return;p();let b=v.dataset.exportFormat,f=t(),h=await import("./chunk.E5GK6TRJ.js");if(f.kind==="models"){b==="excel"?h.exportModelPricesExcel(f.models):b==="word"?h.exportModelPricesWord(f.models):b==="pdf"&&h.exportModelPricesPdf(f.models);return}b==="excel"?h.exportPlansExcel(f.plans,n):b==="word"?h.exportPlansWord(f.plans,n):b==="pdf"&&h.exportPlansPdf(f.plans,n)})}function Ze(e,t={},n=[],s=[]){if(!y.codingPlanOverview)return;let l=me(e,t,M),p=ze(l,t),u=[...p.values()].sort((o,g)=>o.sortOrder-g.sortOrder),v=We(l,n,t),b=[...v.values()].sort((o,g)=>o.sortOrder-g.sortOrder||o.label.localeCompare(g.label,"zh-CN")),f={all:l.length,free:re(l).length},h=Ge(l),O=`
            <span>${l.length} ${r(i("home.meta.records"))}</span>
            <span>${u.length} ${r(i("home.meta.brands"))}</span>
            <span>${b.length} ${r(i("home.meta.models"))}</span>
            ${h!=null?`<span>${r(i("home.meta.avgMonthly"))} $${Math.round(h)}</span>`:""}`;y.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div class="workbench-intro">
          <p class="workbench-kicker">${r(i("home.kicker"))}</p>
          <h1 id="codingPlanTitle" class="workbench-title">${r(i("home.title"))}</h1>
          <p id="workbenchSummary" class="workbench-summary">${r(i("home.summary"))}</p>
        </div>
        <div class="workbench-meta">
          <span id="workbenchStats">${O}
          </span>
          ${Xe()}
        </div>
      </div>
      ${Ye()}
      <div class="workbench-body">
        <div id="brandFilterBar" class="brand-filter-bar">
          <div class="brand-filter-row">
            <div id="dimensionSwitch" class="brand-tab-list">
              <button type="button" data-dimension="brand" class="brand-tab is-active"><span>${r(i("home.dimension.brand"))}</span></button>
              <button type="button" data-dimension="model" class="brand-tab"><span>${r(i("home.dimension.model"))}</span></button>
            </div>
            <button type="button" class="plan-quick-filter" data-plan-available-toggle aria-pressed="false">
              <span class="plan-quick-filter-mark" aria-hidden="true">\u2713</span>${r(i("table.quick.availableOnly"))}
            </button>
            <div class="brand-search-box">
              <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
              <input id="brandSearchInput" type="search" class="brand-search-input" placeholder="${r(i("home.search.brand"))}" autocomplete="off" aria-label="${r(i("home.search.aria"))}">
            </div>
          </div>
          <div id="brandTabs" class="brand-tab-list">
            ${Ke.map(o=>`
              <button type="button" data-brand="${o.id}" data-brand-label="${r(i(o.labelKey))}" class="brand-tab${o.id==="all"?" is-active":""}">
                <span>${r(i(o.labelKey))}</span>
                ${f[o.id]>0?`<span class="brand-count">${f[o.id]}</span>`:""}
              </button>
            `).join("")}
            <span class="brand-divider"></span>
            ${u.map(o=>`<button type="button" data-brand="${r(o.id)}" data-brand-label="${r(o.label)}" class="brand-tab">
                ${V(o.iconUrl,o.label,"brand-icon brand-icon--tab")}
                <span>${r(o.label)}</span>
                <span class="brand-count">${o.plans.length}</span>
              </button>`).join("")}
          </div>
          <div id="modelTabs" class="brand-tab-list" hidden>
            <button type="button" data-brand="all" data-brand-label="${r(i("home.tab.all"))}" class="brand-tab is-active">
              <span>${r(i("home.tab.all"))}</span>
              ${f.all>0?`<span class="brand-count">${f.all}</span>`:""}
            </button>
            <span class="brand-divider"></span>
            ${b.map(o=>`<button type="button" data-brand="${r(o.id)}" data-brand-label="${r(o.label)}" class="brand-tab">
                ${V(o.iconUrl,o.label,"brand-icon brand-icon--tab")}
                <span>${r(o.label)}</span>
                <span class="brand-count">${o.plans.length}</span>
              </button>`).join("")}
          </div>
        </div>
        <div id="brandDetail" class="brand-detail">
          ${oe(l,"",t)}
        </div>
      </div>
    </section>
    <button id="plansBackTop" class="plans-back-top" type="button" aria-label="${r(i("home.backTop.aria"))}" title="${r(i("home.backTop.title"))}">
      <span aria-hidden="true">\u2191</span>
    </button>
    <button id="planAdvisorFab" class="plan-advisor-fab" type="button" aria-label="${r(i("advisor.fab.aria"))}" title="${r(i("advisor.fab.title"))}">
      <span aria-hidden="true">$</span>
      <span>${r(i("advisor.fab.label"))}</span>
    </button>
  `,_e();let P=y.codingPlanOverview.querySelector(".plans-workbench"),w=y.codingPlanOverview.querySelector("#brandFilterBar"),k=y.codingPlanOverview.querySelector("#brandTabs"),A=y.codingPlanOverview.querySelector("#modelTabs"),q=y.codingPlanOverview.querySelector("#brandDetail");Qe(P);let K=y.codingPlanOverview.querySelector("#planAdvisorFab"),Y=ye({plans:l,providerInfo:t,modelCatalog:n,fab:K});Y&&location.hash==="#advisor"&&Y.open();let C=l;Je(y.codingPlanOverview,()=>({kind:B==="pricing"?"models":"plans",plans:ge(C),models:Se()}),t);let j="all",B="brand",I="",U=new Set,G=w.querySelector("[data-plan-available-toggle]"),ee=()=>{if(!G)return;let o=be();G.classList.toggle("is-active",o),G.setAttribute("aria-pressed",String(o))},N=()=>{if(ee(),B==="pricing"){Te(q,s,t);return}q.innerHTML=oe(C,I,t,U,j!=="all")},S=()=>{ve(),I="",U.clear()},Q=()=>{U.clear(),N()};he(q,()=>C,Q,o=>{I=I===o?"":o,N()});let H=o=>{U.has(o)?U.delete(o):U.add(o),N()};q.addEventListener("click",o=>{if(o.target.closest("a"))return;let g=o.target.closest("[data-plan-group-toggle]");g&&H(g.dataset.planGroupToggle)}),q.addEventListener("keydown",o=>{if(o.key!=="Enter"&&o.key!==" ")return;let g=o.target.closest("[data-plan-group-toggle]");!g||g.tagName==="BUTTON"||o.target.closest("a")||(o.preventDefault(),H(g.dataset.planGroupToggle))});let X=()=>{[k,A].forEach(o=>{o.querySelectorAll(".brand-tab").forEach(g=>g.classList.remove("is-active"))})},a=o=>{o==="all"?C=l:o==="free"?C=re(l):p.has(o)?C=p.get(o).plans:v.has(o)&&(C=v.get(o).plans)},c=o=>{let g=y.codingPlanOverview.querySelector("#codingPlanTitle"),D=y.codingPlanOverview.querySelector("#workbenchSummary"),x=y.codingPlanOverview.querySelector("#workbenchStats");if(g&&(g.textContent=i(o==="pricing"?"pricing.title":"home.title")),D&&(D.textContent=i(o==="pricing"?"pricing.summary":"home.summary")),!!x)if(o==="pricing"){let F=s.filter(je),ne=new Set(F.map(ce=>M[ce.vendor]||ce.vendor)).size;x.innerHTML=`<span>${F.length} ${r(i("pricing.meta.models"))}</span><span>${ne} ${r(i("pricing.meta.vendors"))}</span>`}else x.innerHTML=O},d=o=>{o!==B&&(B=o,w.querySelectorAll("[data-dimension]").forEach(g=>{g.classList.toggle("is-active",g.dataset.dimension===o)}),k.hidden=o!=="brand",A.hidden=o!=="model",m&&(m.placeholder=i(o==="brand"?"home.search.brand":"home.search.model")),S(),j="all",C=l,X(),o==="pricing"?w.hidden=!0:(w.hidden=!1,(o==="brand"?k:A).querySelector('[data-brand="all"]')?.classList.add("is-active")),K&&(K.hidden=o==="pricing"),m&&(m.value=""),$(),c(o),et(o),N())},m=y.codingPlanOverview.querySelector("#brandSearchInput"),$=()=>{let o=(m?.value||"").trim().toLowerCase(),g=B==="brand"?k:A;g.querySelectorAll(".brand-tab[data-brand]").forEach(x=>{let F=x.dataset.brand;if(F==="all"||F==="free"){x.hidden=!1;return}let ne=(x.dataset.brandLabel||"").toLowerCase();x.hidden=o?!ne.includes(o):!1});let D=g.querySelector(".brand-divider");D&&(D.hidden=!1)};m?.addEventListener("input",$),w.addEventListener("click",o=>{if(o.target.closest("[data-plan-available-toggle]")){fe(),Q();return}let D=o.target.closest("[data-dimension]");if(D){d(D.dataset.dimension);return}let x=o.target.closest(".brand-tab");if(!x||!k.contains(x)&&!A.contains(x))return;let F=x.dataset.brand;S(),j=F,X(),x.classList.add("is-active"),a(F),N()}),((globalThis.location?.pathname||"").replace(/\/+$/,"")||"/")==="/model"&&d("pricing")}function et(e){if(typeof globalThis.history?.replaceState=="function")try{let t=new URL(globalThis.location.href),n=e==="pricing"?"/model":"/";globalThis.history.replaceState(null,"",`${n}${t.search}${t.hash}`)}catch{}}function tt(e){if(!y.codingPlanOverview)return;let t=e==="backend"?i("home.dataUnavailable.backend"):i("home.dataUnavailable.static");y.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div>
          <span id="codingPlanTitle" style="font-weight:bold">${r(i("home.dataUnavailable.title"))}</span>
        </div>
      </div>
      <div class="workbench-body">
        <p class="text-sm text-slate-600 dark:text-slate-300">${r(t)}</p>
      </div>
    </section>
  `,_e()}async function nt(){de();let e=await $e();if(e.dataUnavailable){tt(e.source);return}Ze(e.plans,e.providerInfo||{},e.modelCatalog||[],e.models||[])}nt();
