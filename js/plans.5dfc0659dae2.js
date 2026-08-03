import{a as ve,b as he,c as ge,d as ye,e as $e,f as G,g as oe,i as we,j as xe}from"./chunk.QXSJ2LC7.js";import"./chunk.7HYUNLOO.js";import{a as ue}from"./chunk.FAPXI6Z7.js";import{a as T,b as j,e as O,f as W,h as J,i as me,j as re,o as le,p as be,v as fe}from"./chunk.UHXCSBGC.js";import{c as _,g as i,j as a}from"./chunk.7R2OF4PV.js";var ke=2,Fe=new Set(["claude-opus-4-8","claude-sonnet-4-6","claude-opus-4-7","claude-opus-4-6","claude-sonnet-4-5","claude-opus-4-5","claude-opus-4-1"]);function F(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function Z(e,t){let n=F(e);return n==null?i("pricing.pending"):`${t==="USD"?"$":"\xA5"}${n.toLocaleString(_(),{maximumFractionDigits:4})}`}function Pe(e){let t=F(e);return t==null?"\u2014":t>=1e6?`${(t/1e6).toLocaleString(_(),{maximumFractionDigits:1})}M`:t>=1e3?`${(t/1e3).toLocaleString(_(),{maximumFractionDigits:0})}K`:t.toLocaleString(_())}function qe(e){return J(e,de,T)||T[e]||e||i("pricing.unknownVendor")}function A(e){let t=qe(e);return t==="Anthropic"?"Claude":t}var de={},se=[];function Ee(){return se}function Le(e){let t=W(e,de,T),n=String(t.seo_slug||"").trim(),l=String(t.seo_intro||"").trim(),o=String(t.icon_url||"").trim();return n&&l&&o?`/brands/${encodeURIComponent(n)}/`:""}function ie(e,t){let n=j(e),l=A(e),o=t||n?.iconUrl||"";return G(o,l,"brand-icon brand-icon--tab")}function X(e){let t=String(e.raw?.lifecycle_status||"").trim().toLowerCase();if(t)return t==="legacy";if(String(e.vendor||"").trim().toLowerCase()!=="anthropic")return!1;let n=String(e.raw?.model_id||e.raw?.id||e.id||"").trim().toLowerCase().replace(/[._]/g,"-");return Fe.has(n)}function ce(e){let t=String(e.raw?.release_date||"").trim();if(!t)return null;let n=Date.parse(t);return Number.isFinite(n)?n:null}var ee={release:{numeric:!0,raw:ce},name:{labelKey:"pricing.th.name",numeric:!1},provider:{labelKey:"pricing.th.provider",numeric:!1},context:{labelKey:"pricing.th.context",numeric:!0,raw:e=>F(e.raw?.context_length)},input:{labelKey:"pricing.th.input",numeric:!0,raw:e=>F(e.raw?.input_price)},output:{labelKey:"pricing.th.output",numeric:!0,raw:e=>F(e.raw?.output_price)}};function De(e,t,n){let l=ee[t];if(!l)return e;let o=[...e];return o.sort((p,u)=>{if(t==="release"){let b=Number(X(p))-Number(X(u));if(b!==0)return b}let v=0;if(l.numeric){let b=l.raw(p),f=l.raw(u);if(b==null||f==null)return b==null&&f==null?0:b==null?1:-1;v=b-f}else t==="name"?v=(p.modelName||"").localeCompare(u.modelName||"",_()):t==="provider"&&(v=A(p.vendor).localeCompare(A(u.vendor),_()));return n==="desc"?-v:v}),o}function Be(e){let t=new Map;for(let n of e){let l=A(n.vendor),o=t.get(l);o||(o={name:l,vendor:n.vendor,icon:n.logoUrl||n.providerIconUrl,models:[]},t.set(l,o)),o.models.push(n)}return[...t.values()]}function Ne(e,t){let n=Number(X(t))-Number(X(e));if(n!==0)return n>0;let l=ce(e),o=ce(t);return l!=null&&o!=null?l>o:l!=null&&o==null}function Ue(e){let t=new Map;for(let n of e){let l=A(n.vendor),o=t.get(l);(!o||Ne(n,o))&&t.set(l,n)}return[...t.values()]}function Ie(e){let t=null;for(let n of e){let l=F(n.raw?.input_price);l==null||l<0||(!t||l<t.value)&&(t={value:l,currency:n.raw?.currency})}return t}function Re(e){let t=Ie(e.models),n=[];if(t){let l=t.currency==="USD"?"$":"\xA5";n.push(i("pricing.group.inputFrom",{symbol:l,price:t.value.toLocaleString(_(),{maximumFractionDigits:4})}))}return n.push(`${e.models.length} ${i("pricing.meta.models")}`),`<span class="plan-table-group-summary">${a(n.join(" \xB7 "))}</span>`}var Me={name:e=>String(e.modelName||"").trim()||"\u2014",provider:e=>A(e.vendor),context:e=>Pe(e.raw?.context_length),input:e=>Z(e.raw?.input_price,e.raw?.currency),output:e=>Z(e.raw?.output_price,e.raw?.currency)};function Se(e){return e==="\u2014"||e===i("pricing.pending")}function Te(e,t){let n=Me[t];return n?String(n(e)||"").trim()||"\u2014":""}function He(e,t){let n=new Map;for(let o of e){let p=Te(o,t);n.set(p,(n.get(p)||0)+1)}let l=new Intl.Collator(_(),{numeric:!0,sensitivity:"base"});return Array.from(n.entries()).map(([o,p])=>({value:o,count:p})).sort((o,p)=>{let u=Se(o.value),v=Se(p.value);return u!==v?u?1:-1:l.compare(o.value,p.value)})}function Ve(e,t,n){return e!==t?'<svg class="model-price-sort-icon model-price-sort-icon--idle" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2l2.5 3h-5zM6 10l-2.5-3h5z" fill="currentColor"/></svg>':`<svg class="model-price-sort-icon" viewBox="0 0 12 12" aria-hidden="true"><path d="${n==="asc"?"M6 2l3 4H3z":"M6 10L3 6h6z"}" fill="currentColor"/></svg>`}function Ke(e,t,n){let l=ee[e],o=t.column===e&&!!t.value,p=He(n,e);return`<button type="button" class="plan-column-filter-trigger model-price-filter-trigger${o?" is-active":""}" data-model-filter-column="${e}" aria-haspopup="menu" aria-expanded="false" title="${a(i("table.filter.tooltip"))} ${a(i(l.labelKey))}">
      <span class="plan-column-filter-caret" aria-hidden="true"></span>
    </button>
    <div class="plan-column-filter-menu" data-model-filter-menu="${e}" role="menu" hidden>
      <button type="button" class="plan-column-filter-option${o?"":" is-active"}" data-model-filter-value="">
        <span class="plan-column-filter-option-label">${a(i("table.filter.all"))}</span>
        <span class="plan-column-filter-option-count">${n.length}</span>
      </button>
      ${p.map(u=>`
        <button type="button" class="plan-column-filter-option${o&&u.value===t.value?" is-active":""}" data-model-filter-value="${a(u.value)}">
          <span class="plan-column-filter-option-label">${a(u.value)}</span>
          <span class="plan-column-filter-option-count">${u.count}</span>
        </button>
      `).join("")}
    </div>`}function je(e,t,n,l){let o=(p,u="")=>{let v=ee[p];return`<th class="model-price-th plan-column-filter ${u}" data-sort-key="${p}" role="columnheader" aria-sort="${p===e?t==="asc"?"ascending":"descending":"none"}" tabindex="0">
      <span class="model-price-th-inner">${a(i(v.labelKey))}${Ve(p,e,t)}</span>
      ${Ke(p,n,l)}
    </th>`};return`<thead class="model-price-thead">
    <tr>
      ${o("name")}
      ${o("provider","model-price-col-provider")}
      ${o("context")}
      ${o("input")}
      ${o("output")}
    </tr>
  </thead>`}function Ge(e){let t=F(e.raw?.input_price),n=F(e.raw?.output_price),l=F(e.raw?.context_length),o=e.raw?.currency,p=Z(t,o),u=Z(n,o),v=Pe(l),b=A(e.vendor),f=e.sourceUrl||e.raw?.docs_url||"",y=X(e)?`<span class="model-price-legacy-badge">${a(i("pricing.legacy"))}</span>`:"",L=f?`<a class="model-price-name-link" href="${a(f)}" target="_blank" rel="noopener noreferrer nofollow">${a(e.modelName)}</a>`:`<span>${a(e.modelName)}</span>`,x=Le(e.vendor),P=`${ie(e.vendor,e.logoUrl||e.providerIconUrl)}<span>${a(b)}</span>`,$=x?`<a href="${a(x)}" class="model-price-provider plan-provider-cell--link">${P}</a>`:`<span class="model-price-provider">${P}</span>`;return`<tr class="model-price-row">
    <td class="model-price-td model-price-td--name">
      <span class="model-price-model-name">${L}${y}</span>
    </td>
    <td class="model-price-td model-price-td--provider model-price-col-provider">
      ${$}
    </td>
    <td class="model-price-td model-price-td--context">${a(v)}</td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${t==null?" model-price-value--empty":""}">${a(p)}</span>
      ${t!=null?`<span class="model-price-unit">${a(i("pricing.unit"))}</span>`:""}
    </td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${n==null?" model-price-value--empty":""}">${a(u)}</span>
      ${n!=null?`<span class="model-price-unit">${a(i("pricing.unit"))}</span>`:""}
    </td>
  </tr>`}function Ce(e,t,n={}){de=n||{};let l=t.filter(r=>F(r.raw?.input_price)!=null||F(r.raw?.output_price)!=null),o=new Map;for(let r of l){let c=A(r.vendor);o.has(c)||o.set(c,{name:c,icon:r.logoUrl||r.providerIconUrl,vendor:r.vendor})}let p=[...o.values()].sort((r,c)=>r.name.localeCompare(c.name,_())),u="all",v="release",b="desc",f="brand",y="all",L="",x="",P="",$=new Set;function g(){return!!(x&&P&&Me[x])}function k(){return f==="model"?y==="all"?l:l.filter(r=>(r.modelName||"")===y):u==="all"?l:l.filter(r=>A(r.vendor)===u)}function q(){let r=k(),c=L.toLowerCase();return c&&(r=r.filter(d=>String(d.modelName||"").toLowerCase().includes(c)||A(d.vendor).toLowerCase().includes(c))),r}function U(r){let c=r;return g()&&(c=c.filter(d=>Te(d,x)===P)),De(c,v,b)}function M(){return f==="model"?D():B()}function D(){let r=Ue(l).sort((m,S)=>(m.modelName||"").localeCompare(S.modelName||"",_())),c=`<button type="button" class="brand-tab${y==="all"?" is-active":""}" data-model-tab="all">
      <span>${a(i("home.tab.all"))}</span><span class="brand-count">${l.length}</span>
    </button>`,d=r.map(m=>{let S=m.modelName||"";return`<button type="button" class="brand-tab${y===S?" is-active":""}" data-model-tab="${a(S)}">
        ${ie(m.vendor,m.logoUrl||m.providerIconUrl)}
        <span>${a(S)}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${c}<span class="brand-divider"></span>${d}</div>`}function B(){let r=`<button type="button" class="brand-tab${u==="all"?" is-active":""}" data-provider="all">
      <span>${a(i("home.tab.all"))}</span><span class="brand-count">${l.length}</span>
    </button>`,c=p.map(d=>{let m=l.filter(S=>A(S.vendor)===d.name).length;return`<button type="button" class="brand-tab${u===d.name?" is-active":""}" data-provider="${a(d.name)}">
        ${ie(d.vendor,d.icon)}
        <span>${a(d.name)}</span>
        <span class="brand-count">${m}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${r}<span class="brand-divider"></span>${c}</div>`}function V(r,c){let d=!c&&r.models.length>ke,m=c||!d||$.has(r.name),S=m?r.models:r.models.slice(0,ke),ne=Le(r.vendor),s=`${G(r.icon||j(r.vendor)?.iconUrl||"",r.name,"brand-icon brand-icon--section")}
            <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${a(r.name)}</span>`,h=`
            ${ne?`<a href="${a(ne)}" class="plan-table-group-brand">${s}</a>`:s}
            <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${r.models.length}</span>
            <span class="plan-table-group-right">
              ${Re(r)}
              ${d?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
            </span>`;return`
      <tr class="border-y border-slate-200 dark:border-slate-700">
        <td colspan="5" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
          ${d?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-model-group-toggle="${a(r.name)}" aria-expanded="${m?"true":"false"}" aria-label="${m?i("group.collapse"):i("group.expand")} ${a(r.name)}">${h}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${h}</div>`}
        </td>
      </tr>
      ${S.map(Ge).join("")}`}function I(r,c){return g()?`<div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${a(i(ee[x].labelKey))}</span>
        <strong>${a(P)}</strong>
      </span>
      <span class="plan-table-filter-count">${r} / ${c} ${a(i("table.filter.count"))}</span>
      <button type="button" class="plan-table-filter-clear" data-model-filter-clear>${a(i("table.filter.clear"))}</button>
    </div>`:""}function z(){let r=q();if(!r.length)return se=[],`<p class="model-price-empty">${a(i("pricing.empty"))}</p>`;let c=U(r);se=c;let d=u!=="all"||y!=="all"||g()||!!L,m=c.length?Be(c).map(S=>V(S,d)).join(""):`<tr>
          <td colspan="5" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">${a(i("pricing.empty"))}</td>
        </tr>`;return`${I(c.length,r.length)}
    <div class="model-price-table-wrap">
      <table class="model-price-table" role="grid" aria-label="${a(i("pricing.table.aria"))}">
        ${je(v,b,{column:x,value:P},r)}
        <tbody class="model-price-tbody">
          ${m}
        </tbody>
      </table>
    </div>
    <p class="model-price-footnote">${a(i("pricing.footnote"))}</p>`}function te(){return`<div class="brand-filter-row model-price-toolbar">
      <div class="brand-tab-list">
        <button type="button" data-model-dimension="brand" class="brand-tab${f==="brand"?" is-active":""}"><span>${a(i("home.dimension.brand"))}</span></button>
        <button type="button" data-model-dimension="model" class="brand-tab${f==="model"?" is-active":""}"><span>${a(i("home.dimension.model"))}</span></button>
      </div>
      <div class="brand-search-box">
        <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
        <input type="search" class="brand-search-input" data-model-search placeholder="${a(i("home.search.model"))}" autocomplete="off" aria-label="${a(i("home.search.aria"))}" value="${a(L)}">
      </div>
    </div>`}function H(){e.innerHTML=`
      <div class="model-price-view">
        ${te()}
        <div class="model-price-content" data-model-price-content></div>
      </div>`,Y(),C()}function C(){let r=e.querySelector("[data-model-price-content]");r&&(r.innerHTML=`${M()}${z()}`,Q())}function Y(){e.querySelectorAll("[data-model-dimension]").forEach(c=>{c.addEventListener("click",()=>{let d=c.dataset.modelDimension;if(d===f)return;f=d,u="all",y="all",L="";let m=e.querySelector("[data-model-search]");m&&(m.value=""),e.querySelectorAll("[data-model-dimension]").forEach(S=>{S.classList.toggle("is-active",S.dataset.modelDimension===d)}),C()})});let r=e.querySelector("[data-model-search]");r?.addEventListener("input",()=>{L=r.value.trim(),C()})}function K(){e.querySelectorAll(".plan-column-filter-menu").forEach(r=>{r.hidden=!0}),e.querySelectorAll("[data-model-filter-column]").forEach(r=>r.setAttribute("aria-expanded","false"))}function Q(){e.querySelectorAll(".model-price-tabs .brand-tab").forEach(r=>{r.addEventListener("click",()=>{r.dataset.modelTab!=null?y=r.dataset.modelTab:u=r.dataset.provider,C()})}),e.querySelectorAll("[data-model-group-toggle]").forEach(r=>{let c=d=>{if(d?.target?.closest?.("a"))return;let m=r.dataset.modelGroupToggle;$.has(m)?$.delete(m):$.add(m),C()};r.addEventListener("click",c),r.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),c(d))})}),e.querySelectorAll("[data-model-filter-column]").forEach(r=>{r.addEventListener("click",c=>{c.stopPropagation();let d=r.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!d)return;let m=!d.hidden;K(),m||(d.hidden=!1,r.setAttribute("aria-expanded","true"))}),r.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),c.stopPropagation(),r.click())})}),e.querySelectorAll("[data-model-filter-menu]").forEach(r=>{r.addEventListener("click",c=>{c.stopPropagation();let d=c.target.closest("[data-model-filter-value]");if(!d)return;let m=d.dataset.modelFilterValue||"";x=m?r.dataset.modelFilterMenu:"",P=m,C()})}),e.querySelectorAll("[data-model-filter-clear]").forEach(r=>{r.addEventListener("click",()=>{x="",P="",C()})}),e.querySelectorAll(".model-price-th[data-sort-key]").forEach(r=>{let c=d=>{if(d?.target?.closest?.(".plan-column-filter-trigger, .plan-column-filter-menu"))return;let m=r.dataset.sortKey;v===m?b=b==="asc"?"desc":"asc":(v=m,b="asc"),C()};r.addEventListener("click",c),r.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),c(d))})})}e._modelFilterDocClose&&(document.removeEventListener("click",e._modelFilterDocClose),document.removeEventListener("keydown",e._modelFilterDocKey)),e._modelFilterDocClose=r=>{e.contains(r.target)||K()},e._modelFilterDocKey=r=>{r.key==="Escape"&&K()},document.addEventListener("click",e._modelFilterDocClose),document.addEventListener("keydown",e._modelFilterDocKey),H()}var _e="plan-table-sticky-bar";function Oe(e){if(!e)return;let t=null,n=null,l=null,o=null,p=null,u=0,v=()=>{let $=window.getComputedStyle(document.documentElement).getPropertyValue("--header-height"),g=parseFloat($);return Number.isFinite(g)&&g>0?g:64},b=()=>{t||(t=document.createElement("div"),t.className=_e,t.setAttribute("aria-hidden","true"),n=document.createElement("div"),n.className=`${_e}__inner`,l=document.createElement("table"),n.appendChild(l),t.appendChild(n),document.body.appendChild(t))},f=$=>{let g=$.querySelector("thead");if(!g)return!1;let k=$.querySelector("colgroup");return l.className=$.className,l.innerHTML="",k&&l.appendChild(k.cloneNode(!0)),l.appendChild(g.cloneNode(!0)),p=g,!0},y=()=>{t&&t.classList.remove("is-docked")},L=()=>{u=0;let $=e.querySelector(".plan-view-table"),g=e.querySelector(".plan-table-wrap"),k=g?.querySelector("table");if(!$||!g||!k||window.getComputedStyle($).display==="none"){y();return}o!==g&&(o=g,g.addEventListener("scroll",x,{passive:!0}));let q=v(),U=g.getBoundingClientRect(),M=k.getBoundingClientRect(),D=k.querySelector("thead"),B=D?D.getBoundingClientRect().height:0;if(U.top>q||M.bottom<=q+B){y();return}if(b(),p!==D&&!f(k)){y();return}t.style.top=`${q}px`,t.style.left=`${U.left}px`,t.style.width=`${U.width}px`,n.style.width=`${k.offsetWidth}px`,n.style.transform=`translateX(${-g.scrollLeft}px)`,t.classList.add("is-docked")},x=()=>{u||(u=requestAnimationFrame(L))};new MutationObserver(()=>{p=null,x()}).observe(e,{childList:!0,subtree:!0}),window.addEventListener("scroll",x,{passive:!0}),window.addEventListener("resize",x),x()}var ze=[{id:"all",labelKey:"home.tab.all"},{id:"free",labelKey:"home.tab.free"}];function We(e){let t=e.raw?.input_price,n=e.raw?.output_price;return t!=null&&t!==""||n!=null&&n!==""}function Xe(e){let t=e.filter(n=>(n.monthlyCurrency||"USD")==="USD").map(n=>n.monthlyPriceValue).filter(n=>Number.isFinite(n)&&n>0);return t.length?t.reduce((n,l)=>n+l,0)/t.length:null}var w={codingPlanOverview:document.getElementById("codingPlanOverview")};function Ae(){w.codingPlanOverview&&(w.codingPlanOverview.classList.remove("plans-loading-shell"),w.codingPlanOverview.setAttribute("aria-busy","false"))}function Ye(e,t){let n=new Map;for(let l of e){let o=j(l.provider),p=String(l.provider||"").trim(),u=T[p]||p;if(!u)continue;let v=W(p,t,T),b=o?.id||u,f=n.get(b);f?f.iconUrl||(f.iconUrl=O(v.icon_url)||O(l.providerIconUrl)||O(o?.iconUrl)):(f={id:b,provider:p,label:J(p,t,T),iconUrl:O(v.icon_url)||O(l.providerIconUrl)||O(o?.iconUrl),sortOrder:me(p,t,T),plans:[]},n.set(b,f)),f.plans.push(l)}for(let l of n.values())l.plans=re(l.plans);return n}function Qe(e,t,n={}){let l=new Map;for(let o of t){let p=e.filter(b=>Array.isArray(b.modelIds)&&b.modelIds.includes(o.id));if(!p.length)continue;let u=W(o.provider,n,T),v=O(o.logoUrl)||O(u.icon_url)||O(o.providerIconUrl)||O(j(o.provider)?.iconUrl);l.set(`model:${o.id}`,{id:`model:${o.id}`,label:o.name||o.id,iconUrl:v,sortOrder:Number.isFinite(o.sortOrder)?o.sortOrder:99,plans:re(p)})}return l}function Je(e){let t=fe(e);if(t.state!=="ok")return"";let n=t.hours<24?i("home.freshness.hours",{n:t.hours}):t.days<60?i("home.freshness.days",{n:t.days}):i("home.freshness.date",{date:t.date}),l=i("home.freshness.title",{date:t.date,verified:t.verifiedCount,total:t.total});return`<span id="dataFreshness" class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300" title="${a(l)}">
    <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
    ${a(n)}
  </span>`}function Ze(){return`
    <div class="cn-hero-banner" role="complementary" aria-label="${a(i("home.hero.aria"))}">
      <div class="cn-hero-banner__points">
        <span class="cn-hero-point"><span aria-hidden="true">$</span>${a(i("home.hero.usd"))}</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25A1</span>${a(i("home.hero.card"))}</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25C8</span>${a(i("home.hero.global"))}</span>
      </div>
      <a class="cn-hero-banner__intl" href="https://www.creditsplan.cn/" target="_blank" rel="noopener noreferrer">${a(i("home.hero.cnLink"))}</a>
    </div>
  `}function et(e){let t=w.codingPlanOverview.querySelector("#plansBackTop");if(!t||!e)return;let n=()=>{let l=e.getBoundingClientRect();t.classList.toggle("is-visible",l.top<-160&&l.bottom>160)};t.addEventListener("click",()=>{let l=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({behavior:l?"auto":"smooth",block:"start"})}),window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n),n()}function tt(){return`
    <div class="plans-export" id="plansExport">
      <button type="button" class="plans-export-trigger" id="plansExportTrigger" aria-haspopup="menu" aria-expanded="false" title="${a(i("export.trigger.title"))}">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
          <path d="M10 3v10m0 0 3.5-3.5M10 13 6.5 9.5M4 15.5h12" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>${a(i("export.trigger"))}</span>
      </button>
      <div class="plans-export-menu" id="plansExportMenu" role="menu" hidden>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="excel">
          <span class="plans-export-option-icon plans-export-option-icon--excel" aria-hidden="true">X</span>
          <span class="plans-export-option-text"><strong>Excel</strong><small>${a(i("export.excel.desc"))}</small></span>
        </button>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="word">
          <span class="plans-export-option-icon plans-export-option-icon--word" aria-hidden="true">W</span>
          <span class="plans-export-option-text"><strong>Word</strong><small>${a(i("export.word.desc"))}</small></span>
        </button>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="pdf">
          <span class="plans-export-option-icon plans-export-option-icon--pdf" aria-hidden="true">P</span>
          <span class="plans-export-option-text"><strong>PDF</strong><small>${a(i("export.pdf.desc"))}</small></span>
        </button>
      </div>
    </div>
  `}function nt(e,t,n){let l=e.querySelector("#plansExportTrigger"),o=e.querySelector("#plansExportMenu");if(!l||!o)return;let p=()=>{o.hidden=!0,l.setAttribute("aria-expanded","false")};l.addEventListener("click",()=>{let u=o.hidden;o.hidden=!u,l.setAttribute("aria-expanded",String(u))}),document.addEventListener("click",u=>{e.querySelector("#plansExport")?.contains(u.target)||p()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&p()}),o.addEventListener("click",async u=>{let v=u.target.closest("[data-export-format]");if(!v)return;p();let b=v.dataset.exportFormat,f=t(),y=await import("./chunk.2XPGR2KF.js");if(f.kind==="models"){b==="excel"?y.exportModelPricesExcel(f.models):b==="word"?y.exportModelPricesWord(f.models):b==="pdf"&&y.exportModelPricesPdf(f.models);return}b==="excel"?y.exportPlansExcel(f.plans,n):b==="word"?y.exportPlansWord(f.plans,n):b==="pdf"&&y.exportPlansPdf(f.plans,n)})}function at(e,t={},n=[],l=[]){if(!w.codingPlanOverview)return;let o=be(e,t,T),p=Ye(o,t),u=[...p.values()].sort((s,h)=>s.sortOrder-h.sortOrder),v=Qe(o,n,t),b=[...v.values()].sort((s,h)=>s.sortOrder-h.sortOrder||s.label.localeCompare(h.label,"zh-CN")),f={all:o.length,free:le(o).length},y=Xe(o),L=`
            <span>${o.length} ${a(i("home.meta.records"))}</span>
            <span>${u.length} ${a(i("home.meta.brands"))}</span>
            <span>${b.length} ${a(i("home.meta.models"))}</span>
            ${y!=null?`<span>${a(i("home.meta.avgMonthly"))} $${Math.round(y)}</span>`:""}`;w.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div class="workbench-intro">
          <p class="workbench-kicker">${a(i("home.kicker"))}</p>
          <h1 id="codingPlanTitle" class="workbench-title">${a(i("home.title"))}</h1>
          <p id="workbenchSummary" class="workbench-summary">${a(i("home.summary"))}</p>
        </div>
        <div class="workbench-meta">
          <span id="workbenchStats">${L}
          </span>
          ${Je(o)}
          ${tt()}
        </div>
      </div>
      ${Ze()}
      <div class="workbench-body">
        <div id="brandFilterBar" class="brand-filter-bar">
          <div class="brand-filter-row">
            <div id="dimensionSwitch" class="brand-tab-list">
              <button type="button" data-dimension="brand" class="brand-tab is-active"><span>${a(i("home.dimension.brand"))}</span></button>
              <button type="button" data-dimension="model" class="brand-tab"><span>${a(i("home.dimension.model"))}</span></button>
            </div>
            <button type="button" class="plan-quick-filter" data-plan-available-toggle aria-pressed="false">
              <span class="plan-quick-filter-mark" aria-hidden="true">\u2713</span>${a(i("table.quick.availableOnly"))}
            </button>
            <div class="brand-search-box">
              <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
              <input id="brandSearchInput" type="search" class="brand-search-input" placeholder="${a(i("home.search.brand"))}" autocomplete="off" aria-label="${a(i("home.search.aria"))}">
            </div>
          </div>
          <div id="brandTabs" class="brand-tab-list">
            ${ze.map(s=>`
              <button type="button" data-brand="${s.id}" data-brand-label="${a(i(s.labelKey))}" class="brand-tab${s.id==="all"?" is-active":""}">
                <span>${a(i(s.labelKey))}</span>
                ${f[s.id]>0?`<span class="brand-count">${f[s.id]}</span>`:""}
              </button>
            `).join("")}
            <span class="brand-divider"></span>
            ${u.map(s=>`<button type="button" data-brand="${a(s.id)}" data-brand-label="${a(s.label)}" class="brand-tab">
                ${G(s.iconUrl,s.label,"brand-icon brand-icon--tab")}
                <span>${a(s.label)}</span>
                <span class="brand-count">${s.plans.length}</span>
              </button>`).join("")}
          </div>
          <div id="modelTabs" class="brand-tab-list" hidden>
            <button type="button" data-brand="all" data-brand-label="${a(i("home.tab.all"))}" class="brand-tab is-active">
              <span>${a(i("home.tab.all"))}</span>
              ${f.all>0?`<span class="brand-count">${f.all}</span>`:""}
            </button>
            <span class="brand-divider"></span>
            ${b.map(s=>`<button type="button" data-brand="${a(s.id)}" data-brand-label="${a(s.label)}" class="brand-tab">
                ${G(s.iconUrl,s.label,"brand-icon brand-icon--tab")}
                <span>${a(s.label)}</span>
                <span class="brand-count">${s.plans.length}</span>
              </button>`).join("")}
          </div>
        </div>
        <div id="brandDetail" class="brand-detail">
          ${oe(o,"",t)}
        </div>
      </div>
    </section>
    <button id="plansBackTop" class="plans-back-top" type="button" aria-label="${a(i("home.backTop.aria"))}" title="${a(i("home.backTop.title"))}">
      <span aria-hidden="true">\u2191</span>
    </button>
    <button id="planAdvisorFab" class="plan-advisor-fab" type="button" aria-label="${a(i("advisor.fab.aria"))}" title="${a(i("advisor.fab.title"))}">
      <span aria-hidden="true">$</span>
      <span>${a(i("advisor.fab.label"))}</span>
    </button>
  `,Ae();let x=w.codingPlanOverview.querySelector(".plans-workbench"),P=w.codingPlanOverview.querySelector("#brandFilterBar"),$=w.codingPlanOverview.querySelector("#brandTabs"),g=w.codingPlanOverview.querySelector("#modelTabs"),k=w.codingPlanOverview.querySelector("#brandDetail");et(x),Oe(k);let q=w.codingPlanOverview.querySelector("#planAdvisorFab"),U=we({plans:o,providerInfo:t,modelCatalog:n,fab:q});U&&location.hash==="#advisor"&&U.open();let M=o;nt(w.codingPlanOverview,()=>({kind:B==="pricing"?"models":"plans",plans:ye(M),models:Ee()}),t);let D="all",B="brand",V="",I=new Set,z=P.querySelector("[data-plan-available-toggle]"),te=()=>{if(!z)return;let s=ve();z.classList.toggle("is-active",s),z.setAttribute("aria-pressed",String(s))},H=()=>{if(te(),B==="pricing"){Ce(k,l,t);return}k.innerHTML=oe(M,V,t,I,D!=="all")},C=()=>{ge(),V="",I.clear()},Y=()=>{I.clear(),H()};$e(k,()=>M,Y,s=>{V=V===s?"":s,H()});let K=s=>{I.has(s)?I.delete(s):I.add(s),H()};k.addEventListener("click",s=>{if(s.target.closest("a"))return;let h=s.target.closest("[data-plan-group-toggle]");h&&K(h.dataset.planGroupToggle)}),k.addEventListener("keydown",s=>{if(s.key!=="Enter"&&s.key!==" ")return;let h=s.target.closest("[data-plan-group-toggle]");!h||h.tagName==="BUTTON"||s.target.closest("a")||(s.preventDefault(),K(h.dataset.planGroupToggle))});let Q=()=>{[$,g].forEach(s=>{s.querySelectorAll(".brand-tab").forEach(h=>h.classList.remove("is-active"))})},r=s=>{s==="all"?M=o:s==="free"?M=le(o):p.has(s)?M=p.get(s).plans:v.has(s)&&(M=v.get(s).plans)},c=s=>{let h=w.codingPlanOverview.querySelector("#codingPlanTitle"),N=w.codingPlanOverview.querySelector("#workbenchSummary"),E=w.codingPlanOverview.querySelector("#workbenchStats");if(h&&(h.textContent=i(s==="pricing"?"pricing.title":"home.title")),N&&(N.textContent=i(s==="pricing"?"pricing.summary":"home.summary")),!!E)if(s==="pricing"){let R=l.filter(We),ae=new Set(R.map(pe=>T[pe.vendor]||pe.vendor)).size;E.innerHTML=`<span>${R.length} ${a(i("pricing.meta.models"))}</span><span>${ae} ${a(i("pricing.meta.vendors"))}</span>`}else E.innerHTML=L},d=s=>{s!==B&&(B=s,P.querySelectorAll("[data-dimension]").forEach(h=>{h.classList.toggle("is-active",h.dataset.dimension===s)}),$.hidden=s!=="brand",g.hidden=s!=="model",m&&(m.placeholder=i(s==="brand"?"home.search.brand":"home.search.model")),C(),D="all",M=o,Q(),s==="pricing"?P.hidden=!0:(P.hidden=!1,(s==="brand"?$:g).querySelector('[data-brand="all"]')?.classList.add("is-active")),q&&(q.hidden=s==="pricing"),m&&(m.value=""),S(),c(s),rt(s),H())},m=w.codingPlanOverview.querySelector("#brandSearchInput"),S=()=>{let s=(m?.value||"").trim().toLowerCase(),h=B==="brand"?$:g;h.querySelectorAll(".brand-tab[data-brand]").forEach(E=>{let R=E.dataset.brand;if(R==="all"||R==="free"){E.hidden=!1;return}let ae=(E.dataset.brandLabel||"").toLowerCase();E.hidden=s?!ae.includes(s):!1});let N=h.querySelector(".brand-divider");N&&(N.hidden=!1)};m?.addEventListener("input",S),P.addEventListener("click",s=>{if(s.target.closest("[data-plan-available-toggle]")){he(),Y();return}let N=s.target.closest("[data-dimension]");if(N){d(N.dataset.dimension);return}let E=s.target.closest(".brand-tab");if(!E||!$.contains(E)&&!g.contains(E))return;let R=E.dataset.brand;C(),D=R,Q(),E.classList.add("is-active"),r(R),H()}),((globalThis.location?.pathname||"").replace(/\/+$/,"")||"/")==="/model"&&d("pricing")}function rt(e){if(typeof globalThis.history?.replaceState=="function")try{let t=new URL(globalThis.location.href),n=e==="pricing"?"/model":"/";globalThis.history.replaceState(null,"",`${n}${t.search}${t.hash}`)}catch{}}function lt(e){if(!w.codingPlanOverview)return;let t=e==="backend"?i("home.dataUnavailable.backend"):i("home.dataUnavailable.static");w.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div>
          <span id="codingPlanTitle" style="font-weight:bold">${a(i("home.dataUnavailable.title"))}</span>
        </div>
      </div>
      <div class="workbench-body">
        <p class="text-sm text-slate-600 dark:text-slate-300">${a(t)}</p>
      </div>
    </section>
  `,Ae()}async function ot(){ue();let e=await xe();if(e.dataUnavailable){lt(e.source);return}at(e.plans,e.providerInfo||{},e.modelCatalog||[],e.models||[])}ot();
