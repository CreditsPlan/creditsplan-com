import{a as fe,b as ve,c as he,d as ge,e as ye,f as G,g as le,i as $e,j as we}from"./chunk.IKTQNFGK.js";import"./chunk.7HYUNLOO.js";import{a as ue}from"./chunk.RMBPYTRS.js";import{a as T,b as j,e as O,f as W,h as J,i as me,j as re,o as oe,p as be}from"./chunk.BSJXUUFA.js";import{c as _,g as i,j as r}from"./chunk.WG6SYHMS.js";var xe=2,Ae=new Set(["claude-opus-4-8","claude-sonnet-4-6","claude-opus-4-7","claude-opus-4-6","claude-sonnet-4-5","claude-opus-4-5","claude-opus-4-1"]);function q(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function Z(e,t){let n=q(e);return n==null?i("pricing.pending"):`${t==="USD"?"$":"\xA5"}${n.toLocaleString(_(),{maximumFractionDigits:4})}`}function Pe(e){let t=q(e);return t==null?"\u2014":t>=1e6?`${(t/1e6).toLocaleString(_(),{maximumFractionDigits:1})}M`:t>=1e3?`${(t/1e3).toLocaleString(_(),{maximumFractionDigits:0})}K`:t.toLocaleString(_())}function qe(e){return J(e,de,T)||T[e]||e||i("pricing.unknownVendor")}function A(e){let t=qe(e);return t==="Anthropic"?"Claude":t}var de={},se=[];function ke(){return se}function Ee(e){let t=W(e,de,T),n=String(t.seo_slug||"").trim(),o=String(t.seo_intro||"").trim(),l=String(t.icon_url||"").trim();return n&&o&&l?`/brands/${encodeURIComponent(n)}/`:""}function ie(e,t){let n=j(e),o=A(e),l=t||n?.iconUrl||"";return G(l,o,"brand-icon brand-icon--tab")}function X(e){let t=String(e.raw?.lifecycle_status||"").trim().toLowerCase();if(t)return t==="legacy";if(String(e.vendor||"").trim().toLowerCase()!=="anthropic")return!1;let n=String(e.raw?.model_id||e.raw?.id||e.id||"").trim().toLowerCase().replace(/[._]/g,"-");return Ae.has(n)}function ce(e){let t=String(e.raw?.release_date||"").trim();if(!t)return null;let n=Date.parse(t);return Number.isFinite(n)?n:null}var ee={release:{numeric:!0,raw:ce},name:{labelKey:"pricing.th.name",numeric:!1},provider:{labelKey:"pricing.th.provider",numeric:!1},context:{labelKey:"pricing.th.context",numeric:!0,raw:e=>q(e.raw?.context_length)},input:{labelKey:"pricing.th.input",numeric:!0,raw:e=>q(e.raw?.input_price)},output:{labelKey:"pricing.th.output",numeric:!0,raw:e=>q(e.raw?.output_price)}};function Fe(e,t,n){let o=ee[t];if(!o)return e;let l=[...e];return l.sort((p,u)=>{if(t==="release"){let b=Number(X(p))-Number(X(u));if(b!==0)return b}let v=0;if(o.numeric){let b=o.raw(p),f=o.raw(u);if(b==null||f==null)return b==null&&f==null?0:b==null?1:-1;v=b-f}else t==="name"?v=(p.modelName||"").localeCompare(u.modelName||"",_()):t==="provider"&&(v=A(p.vendor).localeCompare(A(u.vendor),_()));return n==="desc"?-v:v}),l}function Be(e){let t=new Map;for(let n of e){let o=A(n.vendor),l=t.get(o);l||(l={name:o,vendor:n.vendor,icon:n.logoUrl||n.providerIconUrl,models:[]},t.set(o,l)),l.models.push(n)}return[...t.values()]}function De(e,t){let n=Number(X(t))-Number(X(e));if(n!==0)return n>0;let o=ce(e),l=ce(t);return o!=null&&l!=null?o>l:o!=null&&l==null}function Ne(e){let t=new Map;for(let n of e){let o=A(n.vendor),l=t.get(o);(!l||De(n,l))&&t.set(o,n)}return[...t.values()]}function Ue(e){let t=null;for(let n of e){let o=q(n.raw?.input_price);o==null||o<0||(!t||o<t.value)&&(t={value:o,currency:n.raw?.currency})}return t}function Ie(e){let t=Ue(e.models),n=[];if(t){let o=t.currency==="USD"?"$":"\xA5";n.push(i("pricing.group.inputFrom",{symbol:o,price:t.value.toLocaleString(_(),{maximumFractionDigits:4})}))}return n.push(`${e.models.length} ${i("pricing.meta.models")}`),`<span class="plan-table-group-summary">${r(n.join(" \xB7 "))}</span>`}var Le={name:e=>String(e.modelName||"").trim()||"\u2014",provider:e=>A(e.vendor),context:e=>Pe(e.raw?.context_length),input:e=>Z(e.raw?.input_price,e.raw?.currency),output:e=>Z(e.raw?.output_price,e.raw?.currency)};function Se(e){return e==="\u2014"||e===i("pricing.pending")}function Me(e,t){let n=Le[t];return n?String(n(e)||"").trim()||"\u2014":""}function Re(e,t){let n=new Map;for(let l of e){let p=Me(l,t);n.set(p,(n.get(p)||0)+1)}let o=new Intl.Collator(_(),{numeric:!0,sensitivity:"base"});return Array.from(n.entries()).map(([l,p])=>({value:l,count:p})).sort((l,p)=>{let u=Se(l.value),v=Se(p.value);return u!==v?u?1:-1:o.compare(l.value,p.value)})}function He(e,t,n){return e!==t?'<svg class="model-price-sort-icon model-price-sort-icon--idle" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2l2.5 3h-5zM6 10l-2.5-3h5z" fill="currentColor"/></svg>':`<svg class="model-price-sort-icon" viewBox="0 0 12 12" aria-hidden="true"><path d="${n==="asc"?"M6 2l3 4H3z":"M6 10L3 6h6z"}" fill="currentColor"/></svg>`}function Ve(e,t,n){let o=ee[e],l=t.column===e&&!!t.value,p=Re(n,e);return`<button type="button" class="plan-column-filter-trigger model-price-filter-trigger${l?" is-active":""}" data-model-filter-column="${e}" aria-haspopup="menu" aria-expanded="false" title="${r(i("table.filter.tooltip"))} ${r(i(o.labelKey))}">
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
    </div>`}function Ke(e,t,n,o){let l=(p,u="")=>{let v=ee[p];return`<th class="model-price-th plan-column-filter ${u}" data-sort-key="${p}" role="columnheader" aria-sort="${p===e?t==="asc"?"ascending":"descending":"none"}" tabindex="0">
      <span class="model-price-th-inner">${r(i(v.labelKey))}${He(p,e,t)}</span>
      ${Ve(p,n,o)}
    </th>`};return`<thead class="model-price-thead">
    <tr>
      ${l("name")}
      ${l("provider","model-price-col-provider")}
      ${l("context")}
      ${l("input")}
      ${l("output")}
    </tr>
  </thead>`}function je(e){let t=q(e.raw?.input_price),n=q(e.raw?.output_price),o=q(e.raw?.context_length),l=e.raw?.currency,p=Z(t,l),u=Z(n,l),v=Pe(o),b=A(e.vendor),f=e.sourceUrl||e.raw?.docs_url||"",y=X(e)?`<span class="model-price-legacy-badge">${r(i("pricing.legacy"))}</span>`:"",L=f?`<a class="model-price-name-link" href="${r(f)}" target="_blank" rel="noopener noreferrer nofollow">${r(e.modelName)}</a>`:`<span>${r(e.modelName)}</span>`,x=Ee(e.vendor),k=`${ie(e.vendor,e.logoUrl||e.providerIconUrl)}<span>${r(b)}</span>`,$=x?`<a href="${r(x)}" class="model-price-provider plan-provider-cell--link">${k}</a>`:`<span class="model-price-provider">${k}</span>`;return`<tr class="model-price-row">
    <td class="model-price-td model-price-td--name">
      <span class="model-price-model-name">${L}${y}</span>
    </td>
    <td class="model-price-td model-price-td--provider model-price-col-provider">
      ${$}
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
  </tr>`}function Te(e,t,n={}){de=n||{};let o=t.filter(a=>q(a.raw?.input_price)!=null||q(a.raw?.output_price)!=null),l=new Map;for(let a of o){let c=A(a.vendor);l.has(c)||l.set(c,{name:c,icon:a.logoUrl||a.providerIconUrl,vendor:a.vendor})}let p=[...l.values()].sort((a,c)=>a.name.localeCompare(c.name,_())),u="all",v="release",b="desc",f="brand",y="all",L="",x="",k="",$=new Set;function g(){return!!(x&&k&&Le[x])}function S(){return f==="model"?y==="all"?o:o.filter(a=>(a.modelName||"")===y):u==="all"?o:o.filter(a=>A(a.vendor)===u)}function F(){let a=S(),c=L.toLowerCase();return c&&(a=a.filter(d=>String(d.modelName||"").toLowerCase().includes(c)||A(d.vendor).toLowerCase().includes(c))),a}function U(a){let c=a;return g()&&(c=c.filter(d=>Me(d,x)===k)),Fe(c,v,b)}function M(){return f==="model"?B():D()}function B(){let a=Ne(o).sort((m,P)=>(m.modelName||"").localeCompare(P.modelName||"",_())),c=`<button type="button" class="brand-tab${y==="all"?" is-active":""}" data-model-tab="all">
      <span>${r(i("home.tab.all"))}</span><span class="brand-count">${o.length}</span>
    </button>`,d=a.map(m=>{let P=m.modelName||"";return`<button type="button" class="brand-tab${y===P?" is-active":""}" data-model-tab="${r(P)}">
        ${ie(m.vendor,m.logoUrl||m.providerIconUrl)}
        <span>${r(P)}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${c}<span class="brand-divider"></span>${d}</div>`}function D(){let a=`<button type="button" class="brand-tab${u==="all"?" is-active":""}" data-provider="all">
      <span>${r(i("home.tab.all"))}</span><span class="brand-count">${o.length}</span>
    </button>`,c=p.map(d=>{let m=o.filter(P=>A(P.vendor)===d.name).length;return`<button type="button" class="brand-tab${u===d.name?" is-active":""}" data-provider="${r(d.name)}">
        ${ie(d.vendor,d.icon)}
        <span>${r(d.name)}</span>
        <span class="brand-count">${m}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${a}<span class="brand-divider"></span>${c}</div>`}function V(a,c){let d=!c&&a.models.length>xe,m=c||!d||$.has(a.name),P=m?a.models:a.models.slice(0,xe),ne=Ee(a.vendor),s=`${G(a.icon||j(a.vendor)?.iconUrl||"",a.name,"brand-icon brand-icon--section")}
            <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${r(a.name)}</span>`,h=`
            ${ne?`<a href="${r(ne)}" class="plan-table-group-brand">${s}</a>`:s}
            <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${a.models.length}</span>
            <span class="plan-table-group-right">
              ${Ie(a)}
              ${d?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
            </span>`;return`
      <tr class="border-y border-slate-200 dark:border-slate-700">
        <td colspan="5" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
          ${d?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-model-group-toggle="${r(a.name)}" aria-expanded="${m?"true":"false"}" aria-label="${m?i("group.collapse"):i("group.expand")} ${r(a.name)}">${h}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${h}</div>`}
        </td>
      </tr>
      ${P.map(je).join("")}`}function I(a,c){return g()?`<div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${r(i(ee[x].labelKey))}</span>
        <strong>${r(k)}</strong>
      </span>
      <span class="plan-table-filter-count">${a} / ${c} ${r(i("table.filter.count"))}</span>
      <button type="button" class="plan-table-filter-clear" data-model-filter-clear>${r(i("table.filter.clear"))}</button>
    </div>`:""}function z(){let a=F();if(!a.length)return se=[],`<p class="model-price-empty">${r(i("pricing.empty"))}</p>`;let c=U(a);se=c;let d=u!=="all"||y!=="all"||g()||!!L,m=c.length?Be(c).map(P=>V(P,d)).join(""):`<tr>
          <td colspan="5" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">${r(i("pricing.empty"))}</td>
        </tr>`;return`${I(c.length,a.length)}
    <div class="model-price-table-wrap">
      <table class="model-price-table" role="grid" aria-label="${r(i("pricing.table.aria"))}">
        ${Ke(v,b,{column:x,value:k},a)}
        <tbody class="model-price-tbody">
          ${m}
        </tbody>
      </table>
    </div>
    <p class="model-price-footnote">${r(i("pricing.footnote"))}</p>`}function te(){return`<div class="brand-filter-row model-price-toolbar">
      <div class="brand-tab-list">
        <button type="button" data-model-dimension="brand" class="brand-tab${f==="brand"?" is-active":""}"><span>${r(i("home.dimension.brand"))}</span></button>
        <button type="button" data-model-dimension="model" class="brand-tab${f==="model"?" is-active":""}"><span>${r(i("home.dimension.model"))}</span></button>
      </div>
      <div class="brand-search-box">
        <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
        <input type="search" class="brand-search-input" data-model-search placeholder="${r(i("home.search.model"))}" autocomplete="off" aria-label="${r(i("home.search.aria"))}" value="${r(L)}">
      </div>
    </div>`}function H(){e.innerHTML=`
      <div class="model-price-view">
        ${te()}
        <div class="model-price-content" data-model-price-content></div>
      </div>`,Y(),C()}function C(){let a=e.querySelector("[data-model-price-content]");a&&(a.innerHTML=`${M()}${z()}`,Q())}function Y(){e.querySelectorAll("[data-model-dimension]").forEach(c=>{c.addEventListener("click",()=>{let d=c.dataset.modelDimension;if(d===f)return;f=d,u="all",y="all",L="";let m=e.querySelector("[data-model-search]");m&&(m.value=""),e.querySelectorAll("[data-model-dimension]").forEach(P=>{P.classList.toggle("is-active",P.dataset.modelDimension===d)}),C()})});let a=e.querySelector("[data-model-search]");a?.addEventListener("input",()=>{L=a.value.trim(),C()})}function K(){e.querySelectorAll(".plan-column-filter-menu").forEach(a=>{a.hidden=!0}),e.querySelectorAll("[data-model-filter-column]").forEach(a=>a.setAttribute("aria-expanded","false"))}function Q(){e.querySelectorAll(".model-price-tabs .brand-tab").forEach(a=>{a.addEventListener("click",()=>{a.dataset.modelTab!=null?y=a.dataset.modelTab:u=a.dataset.provider,C()})}),e.querySelectorAll("[data-model-group-toggle]").forEach(a=>{let c=d=>{if(d?.target?.closest?.("a"))return;let m=a.dataset.modelGroupToggle;$.has(m)?$.delete(m):$.add(m),C()};a.addEventListener("click",c),a.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),c(d))})}),e.querySelectorAll("[data-model-filter-column]").forEach(a=>{a.addEventListener("click",c=>{c.stopPropagation();let d=a.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!d)return;let m=!d.hidden;K(),m||(d.hidden=!1,a.setAttribute("aria-expanded","true"))}),a.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),c.stopPropagation(),a.click())})}),e.querySelectorAll("[data-model-filter-menu]").forEach(a=>{a.addEventListener("click",c=>{c.stopPropagation();let d=c.target.closest("[data-model-filter-value]");if(!d)return;let m=d.dataset.modelFilterValue||"";x=m?a.dataset.modelFilterMenu:"",k=m,C()})}),e.querySelectorAll("[data-model-filter-clear]").forEach(a=>{a.addEventListener("click",()=>{x="",k="",C()})}),e.querySelectorAll(".model-price-th[data-sort-key]").forEach(a=>{let c=d=>{if(d?.target?.closest?.(".plan-column-filter-trigger, .plan-column-filter-menu"))return;let m=a.dataset.sortKey;v===m?b=b==="asc"?"desc":"asc":(v=m,b="asc"),C()};a.addEventListener("click",c),a.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),c(d))})})}e._modelFilterDocClose&&(document.removeEventListener("click",e._modelFilterDocClose),document.removeEventListener("keydown",e._modelFilterDocKey)),e._modelFilterDocClose=a=>{e.contains(a.target)||K()},e._modelFilterDocKey=a=>{a.key==="Escape"&&K()},document.addEventListener("click",e._modelFilterDocClose),document.addEventListener("keydown",e._modelFilterDocKey),H()}var Ce="plan-table-sticky-bar";function _e(e){if(!e)return;let t=null,n=null,o=null,l=null,p=null,u=0,v=()=>{let $=window.getComputedStyle(document.documentElement).getPropertyValue("--header-height"),g=parseFloat($);return Number.isFinite(g)&&g>0?g:64},b=()=>{t||(t=document.createElement("div"),t.className=Ce,t.setAttribute("aria-hidden","true"),n=document.createElement("div"),n.className=`${Ce}__inner`,o=document.createElement("table"),n.appendChild(o),t.appendChild(n),document.body.appendChild(t))},f=$=>{let g=$.querySelector("thead");if(!g)return!1;let S=$.querySelector("colgroup");return o.className=$.className,o.innerHTML="",S&&o.appendChild(S.cloneNode(!0)),o.appendChild(g.cloneNode(!0)),p=g,!0},y=()=>{t&&t.classList.remove("is-docked")},L=()=>{u=0;let $=e.querySelector(".plan-view-table"),g=e.querySelector(".plan-table-wrap"),S=g?.querySelector("table");if(!$||!g||!S||window.getComputedStyle($).display==="none"){y();return}l!==g&&(l=g,g.addEventListener("scroll",x,{passive:!0}));let F=v(),U=g.getBoundingClientRect(),M=S.getBoundingClientRect(),B=S.querySelector("thead"),D=B?B.getBoundingClientRect().height:0;if(U.top>F||M.bottom<=F+D){y();return}if(b(),p!==B&&!f(S)){y();return}t.style.top=`${F}px`,t.style.left=`${U.left}px`,t.style.width=`${U.width}px`,n.style.width=`${S.offsetWidth}px`,n.style.transform=`translateX(${-g.scrollLeft}px)`,t.classList.add("is-docked")},x=()=>{u||(u=requestAnimationFrame(L))};new MutationObserver(()=>{p=null,x()}).observe(e,{childList:!0,subtree:!0}),window.addEventListener("scroll",x,{passive:!0}),window.addEventListener("resize",x),x()}var Ge=[{id:"all",labelKey:"home.tab.all"},{id:"free",labelKey:"home.tab.free"}];function ze(e){let t=e.raw?.input_price,n=e.raw?.output_price;return t!=null&&t!==""||n!=null&&n!==""}function We(e){let t=e.filter(n=>(n.monthlyCurrency||"USD")==="USD").map(n=>n.monthlyPriceValue).filter(n=>Number.isFinite(n)&&n>0);return t.length?t.reduce((n,o)=>n+o,0)/t.length:null}var w={codingPlanOverview:document.getElementById("codingPlanOverview")};function Oe(){w.codingPlanOverview&&(w.codingPlanOverview.classList.remove("plans-loading-shell"),w.codingPlanOverview.setAttribute("aria-busy","false"))}function Xe(e,t){let n=new Map;for(let o of e){let l=j(o.provider),p=String(o.provider||"").trim(),u=T[p]||p;if(!u)continue;let v=W(p,t,T),b=l?.id||u,f=n.get(b);f?f.iconUrl||(f.iconUrl=O(v.icon_url)||O(o.providerIconUrl)||O(l?.iconUrl)):(f={id:b,provider:p,label:J(p,t,T),iconUrl:O(v.icon_url)||O(o.providerIconUrl)||O(l?.iconUrl),sortOrder:me(p,t,T),plans:[]},n.set(b,f)),f.plans.push(o)}for(let o of n.values())o.plans=re(o.plans);return n}function Ye(e,t,n={}){let o=new Map;for(let l of t){let p=e.filter(b=>Array.isArray(b.modelIds)&&b.modelIds.includes(l.id));if(!p.length)continue;let u=W(l.provider,n,T),v=O(l.logoUrl)||O(u.icon_url)||O(l.providerIconUrl)||O(j(l.provider)?.iconUrl);o.set(`model:${l.id}`,{id:`model:${l.id}`,label:l.name||l.id,iconUrl:v,sortOrder:Number.isFinite(l.sortOrder)?l.sortOrder:99,plans:re(p)})}return o}function Qe(){return`
    <div class="cn-hero-banner" role="complementary" aria-label="${r(i("home.hero.aria"))}">
      <div class="cn-hero-banner__points">
        <span class="cn-hero-point"><span aria-hidden="true">$</span>${r(i("home.hero.usd"))}</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25A1</span>${r(i("home.hero.card"))}</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25C8</span>${r(i("home.hero.global"))}</span>
      </div>
      <a class="cn-hero-banner__intl" href="https://www.creditsplan.cn/" target="_blank" rel="noopener noreferrer">${r(i("home.hero.cnLink"))}</a>
    </div>
  `}function Je(e){let t=w.codingPlanOverview.querySelector("#plansBackTop");if(!t||!e)return;let n=()=>{let o=e.getBoundingClientRect();t.classList.toggle("is-visible",o.top<-160&&o.bottom>160)};t.addEventListener("click",()=>{let o=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({behavior:o?"auto":"smooth",block:"start"})}),window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n),n()}function Ze(){return`
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
  `}function et(e,t,n){let o=e.querySelector("#plansExportTrigger"),l=e.querySelector("#plansExportMenu");if(!o||!l)return;let p=()=>{l.hidden=!0,o.setAttribute("aria-expanded","false")};o.addEventListener("click",()=>{let u=l.hidden;l.hidden=!u,o.setAttribute("aria-expanded",String(u))}),document.addEventListener("click",u=>{e.querySelector("#plansExport")?.contains(u.target)||p()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&p()}),l.addEventListener("click",async u=>{let v=u.target.closest("[data-export-format]");if(!v)return;p();let b=v.dataset.exportFormat,f=t(),y=await import("./chunk.LKHF4ITK.js");if(f.kind==="models"){b==="excel"?y.exportModelPricesExcel(f.models):b==="word"?y.exportModelPricesWord(f.models):b==="pdf"&&y.exportModelPricesPdf(f.models);return}b==="excel"?y.exportPlansExcel(f.plans,n):b==="word"?y.exportPlansWord(f.plans,n):b==="pdf"&&y.exportPlansPdf(f.plans,n)})}function tt(e,t={},n=[],o=[]){if(!w.codingPlanOverview)return;let l=be(e,t,T),p=Xe(l,t),u=[...p.values()].sort((s,h)=>s.sortOrder-h.sortOrder),v=Ye(l,n,t),b=[...v.values()].sort((s,h)=>s.sortOrder-h.sortOrder||s.label.localeCompare(h.label,"zh-CN")),f={all:l.length,free:oe(l).length},y=We(l),L=`
            <span>${l.length} ${r(i("home.meta.records"))}</span>
            <span>${u.length} ${r(i("home.meta.brands"))}</span>
            <span>${b.length} ${r(i("home.meta.models"))}</span>
            ${y!=null?`<span>${r(i("home.meta.avgMonthly"))} $${Math.round(y)}</span>`:""}`;w.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div class="workbench-intro">
          <p class="workbench-kicker">${r(i("home.kicker"))}</p>
          <h1 id="codingPlanTitle" class="workbench-title">${r(i("home.title"))}</h1>
          <p id="workbenchSummary" class="workbench-summary">${r(i("home.summary"))}</p>
        </div>
        <div class="workbench-meta">
          <span id="workbenchStats">${L}
          </span>
          ${Ze()}
        </div>
      </div>
      ${Qe()}
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
            ${Ge.map(s=>`
              <button type="button" data-brand="${s.id}" data-brand-label="${r(i(s.labelKey))}" class="brand-tab${s.id==="all"?" is-active":""}">
                <span>${r(i(s.labelKey))}</span>
                ${f[s.id]>0?`<span class="brand-count">${f[s.id]}</span>`:""}
              </button>
            `).join("")}
            <span class="brand-divider"></span>
            ${u.map(s=>`<button type="button" data-brand="${r(s.id)}" data-brand-label="${r(s.label)}" class="brand-tab">
                ${G(s.iconUrl,s.label,"brand-icon brand-icon--tab")}
                <span>${r(s.label)}</span>
                <span class="brand-count">${s.plans.length}</span>
              </button>`).join("")}
          </div>
          <div id="modelTabs" class="brand-tab-list" hidden>
            <button type="button" data-brand="all" data-brand-label="${r(i("home.tab.all"))}" class="brand-tab is-active">
              <span>${r(i("home.tab.all"))}</span>
              ${f.all>0?`<span class="brand-count">${f.all}</span>`:""}
            </button>
            <span class="brand-divider"></span>
            ${b.map(s=>`<button type="button" data-brand="${r(s.id)}" data-brand-label="${r(s.label)}" class="brand-tab">
                ${G(s.iconUrl,s.label,"brand-icon brand-icon--tab")}
                <span>${r(s.label)}</span>
                <span class="brand-count">${s.plans.length}</span>
              </button>`).join("")}
          </div>
        </div>
        <div id="brandDetail" class="brand-detail">
          ${le(l,"",t)}
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
  `,Oe();let x=w.codingPlanOverview.querySelector(".plans-workbench"),k=w.codingPlanOverview.querySelector("#brandFilterBar"),$=w.codingPlanOverview.querySelector("#brandTabs"),g=w.codingPlanOverview.querySelector("#modelTabs"),S=w.codingPlanOverview.querySelector("#brandDetail");Je(x),_e(S);let F=w.codingPlanOverview.querySelector("#planAdvisorFab"),U=$e({plans:l,providerInfo:t,modelCatalog:n,fab:F});U&&location.hash==="#advisor"&&U.open();let M=l;et(w.codingPlanOverview,()=>({kind:D==="pricing"?"models":"plans",plans:ge(M),models:ke()}),t);let B="all",D="brand",V="",I=new Set,z=k.querySelector("[data-plan-available-toggle]"),te=()=>{if(!z)return;let s=fe();z.classList.toggle("is-active",s),z.setAttribute("aria-pressed",String(s))},H=()=>{if(te(),D==="pricing"){Te(S,o,t);return}S.innerHTML=le(M,V,t,I,B!=="all")},C=()=>{he(),V="",I.clear()},Y=()=>{I.clear(),H()};ye(S,()=>M,Y,s=>{V=V===s?"":s,H()});let K=s=>{I.has(s)?I.delete(s):I.add(s),H()};S.addEventListener("click",s=>{if(s.target.closest("a"))return;let h=s.target.closest("[data-plan-group-toggle]");h&&K(h.dataset.planGroupToggle)}),S.addEventListener("keydown",s=>{if(s.key!=="Enter"&&s.key!==" ")return;let h=s.target.closest("[data-plan-group-toggle]");!h||h.tagName==="BUTTON"||s.target.closest("a")||(s.preventDefault(),K(h.dataset.planGroupToggle))});let Q=()=>{[$,g].forEach(s=>{s.querySelectorAll(".brand-tab").forEach(h=>h.classList.remove("is-active"))})},a=s=>{s==="all"?M=l:s==="free"?M=oe(l):p.has(s)?M=p.get(s).plans:v.has(s)&&(M=v.get(s).plans)},c=s=>{let h=w.codingPlanOverview.querySelector("#codingPlanTitle"),N=w.codingPlanOverview.querySelector("#workbenchSummary"),E=w.codingPlanOverview.querySelector("#workbenchStats");if(h&&(h.textContent=i(s==="pricing"?"pricing.title":"home.title")),N&&(N.textContent=i(s==="pricing"?"pricing.summary":"home.summary")),!!E)if(s==="pricing"){let R=o.filter(ze),ae=new Set(R.map(pe=>T[pe.vendor]||pe.vendor)).size;E.innerHTML=`<span>${R.length} ${r(i("pricing.meta.models"))}</span><span>${ae} ${r(i("pricing.meta.vendors"))}</span>`}else E.innerHTML=L},d=s=>{s!==D&&(D=s,k.querySelectorAll("[data-dimension]").forEach(h=>{h.classList.toggle("is-active",h.dataset.dimension===s)}),$.hidden=s!=="brand",g.hidden=s!=="model",m&&(m.placeholder=i(s==="brand"?"home.search.brand":"home.search.model")),C(),B="all",M=l,Q(),s==="pricing"?k.hidden=!0:(k.hidden=!1,(s==="brand"?$:g).querySelector('[data-brand="all"]')?.classList.add("is-active")),F&&(F.hidden=s==="pricing"),m&&(m.value=""),P(),c(s),nt(s),H())},m=w.codingPlanOverview.querySelector("#brandSearchInput"),P=()=>{let s=(m?.value||"").trim().toLowerCase(),h=D==="brand"?$:g;h.querySelectorAll(".brand-tab[data-brand]").forEach(E=>{let R=E.dataset.brand;if(R==="all"||R==="free"){E.hidden=!1;return}let ae=(E.dataset.brandLabel||"").toLowerCase();E.hidden=s?!ae.includes(s):!1});let N=h.querySelector(".brand-divider");N&&(N.hidden=!1)};m?.addEventListener("input",P),k.addEventListener("click",s=>{if(s.target.closest("[data-plan-available-toggle]")){ve(),Y();return}let N=s.target.closest("[data-dimension]");if(N){d(N.dataset.dimension);return}let E=s.target.closest(".brand-tab");if(!E||!$.contains(E)&&!g.contains(E))return;let R=E.dataset.brand;C(),B=R,Q(),E.classList.add("is-active"),a(R),H()}),((globalThis.location?.pathname||"").replace(/\/+$/,"")||"/")==="/model"&&d("pricing")}function nt(e){if(typeof globalThis.history?.replaceState=="function")try{let t=new URL(globalThis.location.href),n=e==="pricing"?"/model":"/";globalThis.history.replaceState(null,"",`${n}${t.search}${t.hash}`)}catch{}}function at(e){if(!w.codingPlanOverview)return;let t=e==="backend"?i("home.dataUnavailable.backend"):i("home.dataUnavailable.static");w.codingPlanOverview.innerHTML=`
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
  `,Oe()}async function rt(){ue();let e=await we();if(e.dataUnavailable){at(e.source);return}tt(e.plans,e.providerInfo||{},e.modelCatalog||[],e.models||[])}rt();
