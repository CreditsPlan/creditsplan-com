import{a as ie,b as ce,c as ee,d as $e,e as we,f as xe,g as ke,h as Se,i as Pe,j as Ee,k as j,l as de,n as Le,o as Te}from"./chunk.MYHWCUTH.js";import"./chunk.7HYUNLOO.js";import{a as ve}from"./chunk.2HVEMQX6.js";import{a as A,b as W,e as B,f as X,h as Z,i as he,j as oe,o as se,p as ge,v as ye}from"./chunk.YRZJFSS5.js";import{c as q,g as i,j as a}from"./chunk.F32UY7ZS.js";var Me=2,Ie=new Set(["claude-opus-4-8","claude-sonnet-4-6","claude-opus-4-7","claude-opus-4-6","claude-sonnet-4-5","claude-opus-4-5","claude-opus-4-1"]);function N(e){if(e==null||e==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}function te(e,t){let n=N(e);return n==null?i("pricing.pending"):`${t==="USD"?"$":"\xA5"}${n.toLocaleString(q(),{maximumFractionDigits:4})}`}function _e(e){let t=N(e);return t==null?"\u2014":t>=1e6?`${(t/1e6).toLocaleString(q(),{maximumFractionDigits:1})}M`:t>=1e3?`${(t/1e3).toLocaleString(q(),{maximumFractionDigits:0})}K`:t.toLocaleString(q())}function Re(e){return Z(e,be,A)||A[e]||e||i("pricing.unknownVendor")}function D(e){let t=Re(e);return t==="Anthropic"?"Claude":t}var be={},pe=[];function Oe(){return pe}function Ae(e){let t=X(e,be,A),n=String(t.seo_slug||"").trim(),l=String(t.seo_intro||"").trim(),o=String(t.icon_url||"").trim();return n&&l&&o?`/brands/${encodeURIComponent(n)}/`:""}function ue(e,t){let n=W(e),l=D(e),o=t||n?.iconUrl||"";return j(o,l,"brand-icon brand-icon--tab")}function Y(e){let t=String(e.raw?.lifecycle_status||"").trim().toLowerCase();if(t)return t==="legacy";if(String(e.vendor||"").trim().toLowerCase()!=="anthropic")return!1;let n=String(e.raw?.model_id||e.raw?.id||e.id||"").trim().toLowerCase().replace(/[._]/g,"-");return Ie.has(n)}function me(e){let t=String(e.raw?.release_date||"").trim();if(!t)return null;let n=Date.parse(t);return Number.isFinite(n)?n:null}var ne={release:{numeric:!0,raw:me},name:{labelKey:"pricing.th.name",numeric:!1},provider:{labelKey:"pricing.th.provider",numeric:!1},context:{labelKey:"pricing.th.context",numeric:!0,raw:e=>N(e.raw?.context_length)},input:{labelKey:"pricing.th.input",numeric:!0,raw:e=>N(e.raw?.input_price)},output:{labelKey:"pricing.th.output",numeric:!0,raw:e=>N(e.raw?.output_price)}};function He(e,t,n){let l=ne[t];if(!l)return e;let o=[...e];return o.sort((d,u)=>{if(t==="release"){let m=Number(Y(d))-Number(Y(u));if(m!==0)return m}let h=0;if(l.numeric){let m=l.raw(d),b=l.raw(u);if(m==null||b==null)return m==null&&b==null?0:m==null?1:-1;h=m-b}else t==="name"?h=(d.modelName||"").localeCompare(u.modelName||"",q()):t==="provider"&&(h=D(d.vendor).localeCompare(D(u.vendor),q()));return n==="desc"?-h:h}),o}function Ve(e){let t=new Map;for(let n of e){let l=D(n.vendor),o=t.get(l);o||(o={name:l,vendor:n.vendor,icon:n.logoUrl||n.providerIconUrl,models:[]},t.set(l,o)),o.models.push(n)}return[...t.values()]}function Ke(e,t){let n=Number(Y(t))-Number(Y(e));if(n!==0)return n>0;let l=me(e),o=me(t);return l!=null&&o!=null?l>o:l!=null&&o==null}function We(e){let t=new Map;for(let n of e){let l=D(n.vendor),o=t.get(l);(!o||Ke(n,o))&&t.set(l,n)}return[...t.values()]}function je(e){let t=null;for(let n of e){let l=N(n.raw?.input_price);l==null||l<0||(!t||l<t.value)&&(t={value:l,currency:n.raw?.currency})}return t}function ze(e){let t=je(e.models),n=[];if(t){let l=t.currency==="USD"?"$":"\xA5";n.push(i("pricing.group.inputFrom",{symbol:l,price:t.value.toLocaleString(q(),{maximumFractionDigits:4})}))}return n.push(`${e.models.length} ${i("pricing.meta.models")}`),`<span class="plan-table-group-summary">${a(n.join(" \xB7 "))}</span>`}var Fe={name:e=>String(e.modelName||"").trim()||"\u2014",provider:e=>D(e.vendor),context:e=>_e(e.raw?.context_length),input:e=>te(e.raw?.input_price,e.raw?.currency),output:e=>te(e.raw?.output_price,e.raw?.currency)};function Ce(e){return e==="\u2014"||e===i("pricing.pending")}function qe(e,t){let n=Fe[t];return n?String(n(e)||"").trim()||"\u2014":""}function Ge(e,t){let n=new Map;for(let o of e){let d=qe(o,t);n.set(d,(n.get(d)||0)+1)}let l=new Intl.Collator(q(),{numeric:!0,sensitivity:"base"});return Array.from(n.entries()).map(([o,d])=>({value:o,count:d})).sort((o,d)=>{let u=Ce(o.value),h=Ce(d.value);return u!==h?u?1:-1:l.compare(o.value,d.value)})}function Xe(e,t,n){return e!==t?'<svg class="model-price-sort-icon model-price-sort-icon--idle" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2l2.5 3h-5zM6 10l-2.5-3h5z" fill="currentColor"/></svg>':`<svg class="model-price-sort-icon" viewBox="0 0 12 12" aria-hidden="true"><path d="${n==="asc"?"M6 2l3 4H3z":"M6 10L3 6h6z"}" fill="currentColor"/></svg>`}function Ye(e,t,n){let l=ne[e],o=t.column===e&&!!t.value,d=Ge(n,e);return`<button type="button" class="plan-column-filter-trigger model-price-filter-trigger${o?" is-active":""}" data-model-filter-column="${e}" aria-haspopup="menu" aria-expanded="false" title="${a(i("table.filter.tooltip"))} ${a(i(l.labelKey))}">
      <span class="plan-column-filter-caret" aria-hidden="true"></span>
    </button>
    <div class="plan-column-filter-menu" data-model-filter-menu="${e}" role="menu" hidden>
      <button type="button" class="plan-column-filter-option${o?"":" is-active"}" data-model-filter-value="">
        <span class="plan-column-filter-option-label">${a(i("table.filter.all"))}</span>
        <span class="plan-column-filter-option-count">${n.length}</span>
      </button>
      ${d.map(u=>`
        <button type="button" class="plan-column-filter-option${o&&u.value===t.value?" is-active":""}" data-model-filter-value="${a(u.value)}">
          <span class="plan-column-filter-option-label">${a(u.value)}</span>
          <span class="plan-column-filter-option-count">${u.count}</span>
        </button>
      `).join("")}
    </div>`}function Qe(e,t,n,l){let o=(d,u="")=>{let h=ne[d];return`<th class="model-price-th plan-column-filter ${u}" data-sort-key="${d}" role="columnheader" aria-sort="${d===e?t==="asc"?"ascending":"descending":"none"}" tabindex="0">
      <span class="model-price-th-inner">${a(i(h.labelKey))}${Xe(d,e,t)}</span>
      ${Ye(d,n,l)}
    </th>`};return`<thead class="model-price-thead">
    <tr>
      ${o("name")}
      ${o("provider","model-price-col-provider")}
      ${o("context")}
      ${o("input")}
      ${o("output")}
    </tr>
  </thead>`}function Je(e){let t=N(e.raw?.input_price),n=N(e.raw?.output_price),l=N(e.raw?.context_length),o=e.raw?.currency,d=te(t,o),u=te(n,o),h=_e(l),m=D(e.vendor),b=e.sourceUrl||e.raw?.docs_url||"",y=Y(e)?`<span class="model-price-legacy-badge">${a(i("pricing.legacy"))}</span>`:"",M=b?`<a class="model-price-name-link" href="${a(b)}" target="_blank" rel="noopener noreferrer nofollow">${a(e.modelName)}</a>`:`<span>${a(e.modelName)}</span>`,S=Ae(e.vendor),P=`${ue(e.vendor,e.logoUrl||e.providerIconUrl)}<span>${a(m)}</span>`,$=S?`<a href="${a(S)}" class="model-price-provider plan-provider-cell--link">${P}</a>`:`<span class="model-price-provider">${P}</span>`;return`<tr class="model-price-row">
    <td class="model-price-td model-price-td--name">
      <span class="model-price-model-name">${M}${y}</span>
    </td>
    <td class="model-price-td model-price-td--provider model-price-col-provider">
      ${$}
    </td>
    <td class="model-price-td model-price-td--context">${a(h)}</td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${t==null?" model-price-value--empty":""}">${a(d)}</span>
      ${t!=null?`<span class="model-price-unit">${a(i("pricing.unit"))}</span>`:""}
    </td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${n==null?" model-price-value--empty":""}">${a(u)}</span>
      ${n!=null?`<span class="model-price-unit">${a(i("pricing.unit"))}</span>`:""}
    </td>
  </tr>`}function Be(e,t,n={}){be=n||{};let l=t.filter(r=>N(r.raw?.input_price)!=null||N(r.raw?.output_price)!=null),o=new Map;for(let r of l){let c=D(r.vendor);o.has(c)||o.set(c,{name:c,icon:r.logoUrl||r.providerIconUrl,vendor:r.vendor})}let d=[...o.values()].sort((r,c)=>r.name.localeCompare(c.name,q())),u="all",h="release",m="desc",b="brand",y="all",M="",S="",P="",$=new Set;function f(){return!!(S&&P&&Fe[S])}function w(){return b==="model"?y==="all"?l:l.filter(r=>(r.modelName||"")===y):u==="all"?l:l.filter(r=>D(r.vendor)===u)}function E(){let r=w(),c=M.toLowerCase();return c&&(r=r.filter(p=>String(p.modelName||"").toLowerCase().includes(c)||D(p.vendor).toLowerCase().includes(c))),r}function F(r){let c=r;return f()&&(c=c.filter(p=>qe(p,S)===P)),He(c,h,m)}function L(){return b==="model"?C():_()}function C(){let r=We(l).sort((v,x)=>(v.modelName||"").localeCompare(x.modelName||"",q())),c=`<button type="button" class="brand-tab${y==="all"?" is-active":""}" data-model-tab="all">
      <span>${a(i("home.tab.all"))}</span><span class="brand-count">${l.length}</span>
    </button>`,p=r.map(v=>{let x=v.modelName||"";return`<button type="button" class="brand-tab${y===x?" is-active":""}" data-model-tab="${a(x)}">
        ${ue(v.vendor,v.logoUrl||v.providerIconUrl)}
        <span>${a(x)}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${c}<span class="brand-divider"></span>${p}</div>`}function _(){let r=`<button type="button" class="brand-tab${u==="all"?" is-active":""}" data-provider="all">
      <span>${a(i("home.tab.all"))}</span><span class="brand-count">${l.length}</span>
    </button>`,c=d.map(p=>{let v=l.filter(x=>D(x.vendor)===p.name).length;return`<button type="button" class="brand-tab${u===p.name?" is-active":""}" data-provider="${a(p.name)}">
        ${ue(p.vendor,p.icon)}
        <span>${a(p.name)}</span>
        <span class="brand-count">${v}</span>
      </button>`}).join("");return`<div class="brand-tab-list model-price-tabs">${r}<span class="brand-divider"></span>${c}</div>`}function I(r,c){let p=!c&&r.models.length>Me,v=c||!p||$.has(r.name),x=v?r.models:r.models.slice(0,Me),G=Ae(r.vendor),re=`${j(r.icon||W(r.vendor)?.iconUrl||"",r.name,"brand-icon brand-icon--section")}
            <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${a(r.name)}</span>`,s=`
            ${G?`<a href="${a(G)}" class="plan-table-group-brand">${re}</a>`:re}
            <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${r.models.length}</span>
            <span class="plan-table-group-right">
              ${ze(r)}
              ${p?'<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>':""}
            </span>`;return`
      <tr class="border-y border-slate-200 dark:border-slate-700">
        <td colspan="5" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
          ${p?`<div class="plan-table-group-toggle" role="button" tabindex="0" data-model-group-toggle="${a(r.name)}" aria-expanded="${v?"true":"false"}" aria-label="${v?i("group.collapse"):i("group.expand")} ${a(r.name)}">${s}</div>`:`<div class="plan-table-group-toggle plan-table-group-toggle--static">${s}</div>`}
        </td>
      </tr>
      ${x.map(Je).join("")}`}function R(r,c){return f()?`<div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${a(i(ne[S].labelKey))}</span>
        <strong>${a(P)}</strong>
      </span>
      <span class="plan-table-filter-count">${r} / ${c} ${a(i("table.filter.count"))}</span>
      <button type="button" class="plan-table-filter-clear" data-model-filter-clear>${a(i("table.filter.clear"))}</button>
    </div>`:""}function z(){let r=E();if(!r.length)return pe=[],`<p class="model-price-empty">${a(i("pricing.empty"))}</p>`;let c=F(r);pe=c;let p=u!=="all"||y!=="all"||f()||!!M,v=c.length?Ve(c).map(x=>I(x,p)).join(""):`<tr>
          <td colspan="5" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">${a(i("pricing.empty"))}</td>
        </tr>`;return`${R(c.length,r.length)}
    <div class="model-price-table-wrap">
      <table class="model-price-table" role="grid" aria-label="${a(i("pricing.table.aria"))}">
        ${Qe(h,m,{column:S,value:P},r)}
        <tbody class="model-price-tbody">
          ${v}
        </tbody>
      </table>
    </div>
    <p class="model-price-footnote">${a(i("pricing.footnote"))}</p>`}function ae(){return`<div class="brand-filter-row model-price-toolbar">
      <div class="brand-tab-list">
        <button type="button" data-model-dimension="brand" class="brand-tab${b==="brand"?" is-active":""}"><span>${a(i("home.dimension.brand"))}</span></button>
        <button type="button" data-model-dimension="model" class="brand-tab${b==="model"?" is-active":""}"><span>${a(i("home.dimension.model"))}</span></button>
      </div>
      <div class="brand-search-box">
        <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
        <input type="search" class="brand-search-input" data-model-search placeholder="${a(i("home.search.model"))}" autocomplete="off" aria-label="${a(i("home.search.aria"))}" value="${a(M)}">
      </div>
    </div>`}function U(){e.innerHTML=`
      <div class="model-price-view">
        ${ae()}
        <div class="model-price-content" data-model-price-content></div>
      </div>`,Q(),O()}function O(){let r=e.querySelector("[data-model-price-content]");r&&(r.innerHTML=`${L()}${z()}`,J())}function Q(){e.querySelectorAll("[data-model-dimension]").forEach(c=>{c.addEventListener("click",()=>{let p=c.dataset.modelDimension;if(p===b)return;b=p,u="all",y="all",M="";let v=e.querySelector("[data-model-search]");v&&(v.value=""),e.querySelectorAll("[data-model-dimension]").forEach(x=>{x.classList.toggle("is-active",x.dataset.modelDimension===p)}),O()})});let r=e.querySelector("[data-model-search]");r?.addEventListener("input",()=>{M=r.value.trim(),O()})}function K(){e.querySelectorAll(".plan-column-filter-menu").forEach(r=>{r.hidden=!0}),e.querySelectorAll("[data-model-filter-column]").forEach(r=>r.setAttribute("aria-expanded","false"))}function J(){e.querySelectorAll(".model-price-tabs .brand-tab").forEach(r=>{r.addEventListener("click",()=>{r.dataset.modelTab!=null?y=r.dataset.modelTab:u=r.dataset.provider,O()})}),e.querySelectorAll("[data-model-group-toggle]").forEach(r=>{let c=p=>{if(p?.target?.closest?.("a"))return;let v=r.dataset.modelGroupToggle;$.has(v)?$.delete(v):$.add(v),O()};r.addEventListener("click",c),r.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),c(p))})}),e.querySelectorAll("[data-model-filter-column]").forEach(r=>{r.addEventListener("click",c=>{c.stopPropagation();let p=r.closest(".plan-column-filter")?.querySelector(".plan-column-filter-menu");if(!p)return;let v=!p.hidden;K(),v||(p.hidden=!1,r.setAttribute("aria-expanded","true"))}),r.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),c.stopPropagation(),r.click())})}),e.querySelectorAll("[data-model-filter-menu]").forEach(r=>{r.addEventListener("click",c=>{c.stopPropagation();let p=c.target.closest("[data-model-filter-value]");if(!p)return;let v=p.dataset.modelFilterValue||"";S=v?r.dataset.modelFilterMenu:"",P=v,O()})}),e.querySelectorAll("[data-model-filter-clear]").forEach(r=>{r.addEventListener("click",()=>{S="",P="",O()})}),e.querySelectorAll(".model-price-th[data-sort-key]").forEach(r=>{let c=p=>{if(p?.target?.closest?.(".plan-column-filter-trigger, .plan-column-filter-menu"))return;let v=r.dataset.sortKey;h===v?m=m==="asc"?"desc":"asc":(h=v,m="asc"),O()};r.addEventListener("click",c),r.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),c(p))})})}e._modelFilterDocClose&&(document.removeEventListener("click",e._modelFilterDocClose),document.removeEventListener("keydown",e._modelFilterDocKey)),e._modelFilterDocClose=r=>{e.contains(r.target)||K()},e._modelFilterDocKey=r=>{r.key==="Escape"&&K()},document.addEventListener("click",e._modelFilterDocClose),document.addEventListener("keydown",e._modelFilterDocKey),U()}var De="plan-table-sticky-bar",Ze=[".plan-table-wrap",".model-price-table-wrap"];function Ne(e){if(!e)return;let t=null,n=null,l=null,o=null,d=null,u=0,h=()=>{let $=document.getElementById("header-root");if($){let E=$.getBoundingClientRect().bottom;if(Number.isFinite(E)&&E>0)return E}let f=window.getComputedStyle(document.documentElement).getPropertyValue("--header-height"),w=parseFloat(f);return Number.isFinite(w)&&w>0?w:64},m=()=>{t||(t=document.createElement("div"),t.className=De,t.setAttribute("aria-hidden","true"),n=document.createElement("div"),n.className=`${De}__inner`,l=document.createElement("table"),n.appendChild(l),t.appendChild(n),document.body.appendChild(t))},b=$=>{let f=$.querySelector("thead");if(!f)return!1;let w=$.querySelector("colgroup");if(l.className=$.className,l.innerHTML="",w)l.appendChild(w.cloneNode(!0));else{let E=[...f.querySelectorAll("th")];if(E.length){let F=document.createElement("colgroup");E.forEach(L=>{let C=document.createElement("col"),_=L.getBoundingClientRect().width;_>0&&(C.style.width=`${_}px`),F.appendChild(C)}),l.appendChild(F)}}return l.appendChild(f.cloneNode(!0)),d=f,!0},y=()=>{t&&t.classList.remove("is-docked")},M=()=>{u=0;let $=e.querySelector(".plan-view-table"),f=Ze.map(I=>e.querySelector(I)).find(Boolean),w=f?.querySelector("table");if(f&&(f.classList.toggle("can-scroll",f.scrollWidth>f.clientWidth+1),f.classList.toggle("is-scrolled-end",f.scrollLeft>=f.scrollWidth-f.clientWidth-1)),!f||!w||$&&window.getComputedStyle($).display==="none"){y();return}o!==f&&(o=f,f.addEventListener("scroll",S,{passive:!0}));let E=h(),F=f.getBoundingClientRect(),L=w.getBoundingClientRect(),C=w.querySelector("thead"),_=C?C.getBoundingClientRect().height:0;if(F.top>E||L.bottom<=E+_){y();return}if(m(),d!==C&&!b(w)){y();return}t.style.top=`${E}px`,t.style.left=`${F.left}px`,t.style.width=`${F.width}px`,n.style.width=`${w.offsetWidth}px`,n.style.transform=`translateX(${-f.scrollLeft}px)`,t.classList.add("is-docked")},S=()=>{u||(u=requestAnimationFrame(M))};new MutationObserver(()=>{d=null,S()}).observe(e,{childList:!0,subtree:!0}),window.addEventListener("scroll",S,{passive:!0}),window.addEventListener("resize",S),S()}var et=[{id:"all",labelKey:"home.tab.all"},{id:"free",labelKey:"home.tab.free"}];function tt(e){let t=e.raw?.input_price,n=e.raw?.output_price;return t!=null&&t!==""||n!=null&&n!==""}function nt(e){let t=e.filter(n=>(n.monthlyCurrency||"USD")==="USD").map(n=>n.monthlyPriceValue).filter(n=>Number.isFinite(n)&&n>0);return t.length?t.reduce((n,l)=>n+l,0)/t.length:null}var k={codingPlanOverview:document.getElementById("codingPlanOverview")};function Ue(){k.codingPlanOverview&&(k.codingPlanOverview.classList.remove("plans-loading-shell"),k.codingPlanOverview.setAttribute("aria-busy","false"))}function at(e,t){let n=new Map;for(let l of e){let o=W(l.provider),d=String(l.provider||"").trim(),u=A[d]||d;if(!u)continue;let h=X(d,t,A),m=o?.id||u,b=n.get(m);b?b.iconUrl||(b.iconUrl=B(h.icon_url)||B(l.providerIconUrl)||B(o?.iconUrl)):(b={id:m,provider:d,label:Z(d,t,A),iconUrl:B(h.icon_url)||B(l.providerIconUrl)||B(o?.iconUrl),sortOrder:he(d,t,A),plans:[]},n.set(m,b)),b.plans.push(l)}for(let l of n.values())l.plans=oe(l.plans);return n}function rt(e,t,n={}){let l=new Map;for(let o of t){let d=e.filter(m=>Array.isArray(m.modelIds)&&m.modelIds.includes(o.id));if(!d.length)continue;let u=X(o.provider,n,A),h=B(o.logoUrl)||B(u.icon_url)||B(o.providerIconUrl)||B(W(o.provider)?.iconUrl);l.set(`model:${o.id}`,{id:`model:${o.id}`,label:o.name||o.id,iconUrl:h,sortOrder:Number.isFinite(o.sortOrder)?o.sortOrder:99,plans:oe(d)})}return l}function lt(e){let t=ye(e);if(t.state!=="ok")return"";let n=t.hours<24?i("home.freshness.hours",{n:t.hours}):t.days<60?i("home.freshness.days",{n:t.days}):i("home.freshness.date",{date:t.date}),l=i("home.freshness.title",{date:t.date,verified:t.verifiedCount,total:t.total});return`<span id="dataFreshness" class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300" title="${a(l)}">
    <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
    ${a(n)}
  </span>`}function ot(){return`
    <div class="cn-hero-banner" role="complementary" aria-label="${a(i("home.hero.aria"))}">
      <div class="cn-hero-banner__points">
        <span class="cn-hero-point"><span aria-hidden="true">$</span>${a(i("home.hero.usd"))}</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25A1</span>${a(i("home.hero.card"))}</span>
        <span class="cn-hero-point"><span aria-hidden="true">\u25C8</span>${a(i("home.hero.global"))}</span>
      </div>
      <a class="cn-hero-banner__intl" href="https://www.creditsplan.cn/" target="_blank" rel="noopener noreferrer">${a(i("home.hero.cnLink"))}</a>
    </div>
  `}function st(e){let t=k.codingPlanOverview.querySelector("#plansBackTop");if(!t||!e)return;let n=()=>{let l=e.getBoundingClientRect();t.classList.toggle("is-visible",l.top<-160&&l.bottom>160)};t.addEventListener("click",()=>{let l=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollIntoView({behavior:l?"auto":"smooth",block:"start"})}),window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n),n()}function it(){return`
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
  `}function ct(e,t,n){let l=e.querySelector("#plansExportTrigger"),o=e.querySelector("#plansExportMenu");if(!l||!o)return;let d=()=>{o.hidden=!0,l.setAttribute("aria-expanded","false")};l.addEventListener("click",()=>{let u=o.hidden;o.hidden=!u,l.setAttribute("aria-expanded",String(u))}),document.addEventListener("click",u=>{e.querySelector("#plansExport")?.contains(u.target)||d()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&d()}),o.addEventListener("click",async u=>{let h=u.target.closest("[data-export-format]");if(!h)return;d();let m=h.dataset.exportFormat,b=t(),y=await import("./chunk.BCLSOOJ6.js");if(b.kind==="models"){m==="excel"?y.exportModelPricesExcel(b.models):m==="word"?y.exportModelPricesWord(b.models):m==="pdf"&&y.exportModelPricesPdf(b.models);return}m==="excel"?y.exportPlansExcel(b.plans,n):m==="word"?y.exportPlansWord(b.plans,n):m==="pdf"&&y.exportPlansPdf(b.plans,n)})}function dt(e,t={},n=[],l=[]){if(!k.codingPlanOverview)return;ce(ie());let o=ge(e,t,A),d=at(o,t),u=[...d.values()].sort((s,g)=>s.sortOrder-g.sortOrder),h=rt(o,n,t),m=[...h.values()].sort((s,g)=>s.sortOrder-g.sortOrder||s.label.localeCompare(g.label,"zh-CN")),b={all:o.length,free:se(o).length},y=nt(o),M=`
            ${y!=null?`<span class="workbench-stat workbench-stat--primary">
              <span class="workbench-stat-value">$${Math.round(y)}</span>
              <span class="workbench-stat-label">${a(i("home.meta.avgMonthly"))}</span>
            </span>`:""}
            <span class="workbench-stat"><strong>${o.length}</strong> ${a(i("home.meta.records"))}</span>
            <span class="workbench-stat"><strong>${u.length}</strong> ${a(i("home.meta.brands"))}</span>
            <span class="workbench-stat"><strong>${m.length}</strong> ${a(i("home.meta.models"))}</span>`;k.codingPlanOverview.innerHTML=`
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div class="workbench-intro">
          <p class="workbench-kicker">${a(i("home.kicker"))}</p>
          <h1 id="codingPlanTitle" class="workbench-title">${a(i("home.title"))}</h1>
          <p id="workbenchSummary" class="workbench-summary">${a(i("home.summary"))}</p>
        </div>
        <div class="workbench-meta">
          <span id="workbenchStats">${M}
          </span>
          ${lt(o)}
          ${it()}
        </div>
      </div>
      ${ot()}
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
            ${Se()}
          </div>
          <div id="brandTabs" class="brand-tab-list">
            ${et.map(s=>`
              <button type="button" data-brand="${s.id}" data-brand-label="${a(i(s.labelKey))}" class="brand-tab${s.id==="all"?" is-active":""}">
                <span>${a(i(s.labelKey))}</span>
                ${b[s.id]>0?`<span class="brand-count">${b[s.id]}</span>`:""}
              </button>
            `).join("")}
            <span class="brand-divider"></span>
            ${u.map(s=>`<button type="button" data-brand="${a(s.id)}" data-brand-label="${a(s.label)}" class="brand-tab">
                ${j(s.iconUrl,s.label,"brand-icon brand-icon--tab")}
                <span>${a(s.label)}</span>
                <span class="brand-count">${s.plans.length}</span>
              </button>`).join("")}
          </div>
          <div id="modelTabs" class="brand-tab-list" hidden>
            <button type="button" data-brand="all" data-brand-label="${a(i("home.tab.all"))}" class="brand-tab is-active">
              <span>${a(i("home.tab.all"))}</span>
              ${b.all>0?`<span class="brand-count">${b.all}</span>`:""}
            </button>
            <span class="brand-divider"></span>
            ${m.map(s=>`<button type="button" data-brand="${a(s.id)}" data-brand-label="${a(s.label)}" class="brand-tab">
                ${j(s.iconUrl,s.label,"brand-icon brand-icon--tab")}
                <span>${a(s.label)}</span>
                <span class="brand-count">${s.plans.length}</span>
              </button>`).join("")}
          </div>
        </div>
        <div id="brandDetail" class="brand-detail">
          ${de(o,"",t)}
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
  `,Ue(),ee();let S=k.codingPlanOverview.querySelector(".plans-workbench"),P=k.codingPlanOverview.querySelector("#brandFilterBar"),$=k.codingPlanOverview.querySelector("#brandTabs"),f=k.codingPlanOverview.querySelector("#modelTabs"),w=k.codingPlanOverview.querySelector("#brandDetail");st(S),Ne(w);let E=k.codingPlanOverview.querySelector("#planAdvisorFab"),F=Le({plans:o,providerInfo:t,modelCatalog:n,fab:E});F&&location.hash==="#advisor"&&F.open();let L=o;ct(k.codingPlanOverview,()=>({kind:_==="pricing"?"models":"plans",plans:ke(L),models:Oe()}),t);let C="all",_="brand",I="",R=new Set,z=P.querySelector("[data-plan-available-toggle]"),ae=()=>{if(!z)return;let s=$e();z.classList.toggle("is-active",s),z.setAttribute("aria-pressed",String(s))},U=()=>{if(ae(),_==="pricing"){Be(w,l,t);return}w.innerHTML=de(L,I,t,R,C!=="all"),ee()},O=null;window.addEventListener("resize",()=>{O||(O=setTimeout(()=>{O=null,ce(ie())?U():ee()},200))});let Q=()=>{xe(),I="",R.clear()},K=()=>{R.clear(),U()};Pe(w,()=>L,K,s=>{I=I===s?"":s,U()}),Ee(P,U);let J=s=>{R.has(s)?R.delete(s):R.add(s),U()};w.addEventListener("click",s=>{if(s.target.closest("a"))return;let g=s.target.closest("[data-plan-group-toggle]");g&&J(g.dataset.planGroupToggle)}),w.addEventListener("keydown",s=>{if(s.key!=="Enter"&&s.key!==" ")return;let g=s.target.closest("[data-plan-group-toggle]");!g||g.tagName==="BUTTON"||s.target.closest("a")||(s.preventDefault(),J(g.dataset.planGroupToggle))});let r=()=>{[$,f].forEach(s=>{s.querySelectorAll(".brand-tab").forEach(g=>g.classList.remove("is-active"))})},c=s=>{s==="all"?L=o:s==="free"?L=se(o):d.has(s)?L=d.get(s).plans:h.has(s)&&(L=h.get(s).plans)},p=s=>{let g=k.codingPlanOverview.querySelector("#codingPlanTitle"),H=k.codingPlanOverview.querySelector("#workbenchSummary"),T=k.codingPlanOverview.querySelector("#workbenchStats");if(g&&(g.textContent=i(s==="pricing"?"pricing.title":"home.title")),H&&(H.textContent=i(s==="pricing"?"pricing.summary":"home.summary")),!!T)if(s==="pricing"){let V=l.filter(tt),le=new Set(V.map(fe=>A[fe.vendor]||fe.vendor)).size;T.innerHTML=`<span><strong>${V.length}</strong> ${a(i("pricing.meta.models"))}</span><span><strong>${le}</strong> ${a(i("pricing.meta.vendors"))}</span>`}else T.innerHTML=M},v=s=>{s!==_&&(_=s,P.querySelectorAll("[data-dimension]").forEach(g=>{g.classList.toggle("is-active",g.dataset.dimension===s)}),$.hidden=s!=="brand",f.hidden=s!=="model",x&&(x.placeholder=i(s==="brand"?"home.search.brand":"home.search.model")),Q(),C="all",L=o,r(),s==="pricing"?P.hidden=!0:(P.hidden=!1,(s==="brand"?$:f).querySelector('[data-brand="all"]')?.classList.add("is-active")),E&&(E.hidden=s==="pricing"),x&&(x.value=""),G(),p(s),pt(s),U())},x=k.codingPlanOverview.querySelector("#brandSearchInput"),G=()=>{let s=(x?.value||"").trim().toLowerCase(),g=_==="brand"?$:f;g.querySelectorAll(".brand-tab[data-brand]").forEach(T=>{let V=T.dataset.brand;if(V==="all"||V==="free"){T.hidden=!1;return}let le=(T.dataset.brandLabel||"").toLowerCase();T.hidden=s?!le.includes(s):!1});let H=g.querySelector(".brand-divider");H&&(H.hidden=!1)};x?.addEventListener("input",G),P.addEventListener("click",s=>{if(s.target.closest("[data-plan-available-toggle]")){we(),K();return}let H=s.target.closest("[data-dimension]");if(H){v(H.dataset.dimension);return}let T=s.target.closest(".brand-tab");if(!T||!$.contains(T)&&!f.contains(T))return;let V=T.dataset.brand;Q(),C=V,r(),T.classList.add("is-active"),c(V),U()}),((globalThis.location?.pathname||"").replace(/\/+$/,"")||"/")==="/model"&&v("pricing")}function pt(e){if(typeof globalThis.history?.replaceState=="function")try{let t=new URL(globalThis.location.href),n=e==="pricing"?"/model":"/";globalThis.history.replaceState(null,"",`${n}${t.search}${t.hash}`)}catch{}}function ut(e){if(!k.codingPlanOverview)return;let t=e==="backend"?i("home.dataUnavailable.backend"):i("home.dataUnavailable.static");k.codingPlanOverview.innerHTML=`
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
  `,Ue()}async function mt(){ve();let e=await Te();if(e.dataUnavailable){ut(e.source);return}dt(e.plans,e.providerInfo||{},e.modelCatalog||[],e.models||[])}mt();
