import{a as z}from"./chunk.7HYUNLOO.js";import{a as $}from"./chunk.2HVEMQX6.js";import{a as g,c as f,e as y,f as _,g as l,j as a}from"./chunk.F32UY7ZS.js";function h(e,n){return g()==="en"?n!=null&&String(n).trim()?n:_(e):e}var v={catalog:"changelog.kind.catalog",data:"changelog.kind.data",feature:"changelog.kind.feature"},k={in_progress:{key:"changelog.roadmap.status.progress",cls:"progress"},planned:{key:"changelog.roadmap.status.planned",cls:"planned"},evaluating:{key:"changelog.roadmap.status.evaluating",cls:"evaluating"}},A=["in_progress","planned","evaluating"],L={monthly_price:{zh:"\u6708\u8D39",en:"Monthly price"},first_month_price:{zh:"\u9996\u6708\u4EF7",en:"First-month price"},quarterly_price:{zh:"\u5B63\u8D39",en:"Quarterly price"},yearly_price:{zh:"\u5E74\u8D39",en:"Yearly price"},annual_price:{zh:"\u6309\u5E74\u4EF7",en:"Annual price"},monthly_currency:{zh:"\u5E01\u79CD",en:"Currency"},included_calls:{zh:"\u5305\u542B\u989D\u5EA6",en:"Included quota"},token_limit:{zh:"Token \u4E0A\u9650",en:"Token limit"},five_hours_requests:{zh:"5 \u5C0F\u65F6\u9650\u989D",en:"5-hour limit"},weekly_requests:{zh:"\u6BCF\u5468\u9650\u989D",en:"Weekly limit"},monthly_requests:{zh:"\u6BCF\u6708\u9650\u989D",en:"Monthly limit"},benefits:{zh:"\u6743\u76CA",en:"Benefits"},refund_policy:{zh:"\u9000\u6B3E\u653F\u7B56",en:"Refund policy"},billing_cycle:{zh:"\u8BA1\u8D39\u5468\u671F",en:"Billing cycle"},credits_limit:{zh:"Credits \u4E0A\u9650",en:"Credits limit"},reset_rule:{zh:"\u91CD\u7F6E\u89C4\u5219",en:"Reset rule"},notes:{zh:"\u5907\u6CE8",en:"Notes"},url:{zh:"\u8D2D\u4E70\u94FE\u63A5",en:"Purchase URL"},url_en:{zh:"\u8D2D\u4E70\u94FE\u63A5",en:"Purchase URL"},sort_order:{zh:"\u6392\u5E8F",en:"Sort order"},input_price:{zh:"\u8F93\u5165\u4EF7",en:"Input price"},output_price:{zh:"\u8F93\u51FA\u4EF7",en:"Output price"},cache_read_price:{zh:"\u7F13\u5B58\u8BFB\u4EF7",en:"Cache read price"},cache_write_price:{zh:"\u7F13\u5B58\u5199\u4EF7",en:"Cache write price"},currency:{zh:"\u5E01\u79CD",en:"Currency"},context_length:{zh:"\u4E0A\u4E0B\u6587\u957F\u5EA6",en:"Context length"},max_output:{zh:"\u6700\u5927\u8F93\u51FA",en:"Max output"},lifecycle_status:{zh:"\u751F\u547D\u5468\u671F\u72B6\u6001",en:"Lifecycle status"},release_date:{zh:"\u53D1\u5E03\u65E5\u671F",en:"Release date"}};function j(e){let n=L[e];return n?g()==="en"?n.en:n.zh:e}var o={count:document.getElementById("changelogEntryCount"),error:document.getElementById("changelogError"),list:document.getElementById("changelogList"),loading:document.getElementById("changelogLoading"),roadmapList:document.getElementById("roadmapList"),roadmapSection:document.getElementById("roadmapSection"),updatedAt:document.getElementById("changelogUpdatedAt")};function m(e){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||""));return n?`${n[1]}.${n[2]}.${n[3]}`:"\u2014"}function b(e){return e==null||String(e).trim()===""?"\u2014":String(e)}function w(e){let n=e?.scope==="model",r=e?.action==="create",s=n?e?.model_name||e?.canonical_id||"":e?.plan_name||e?.plan_id||"",t=`changelog.diff.${r?"create":"update"}${n?"Model":"Plan"}`,c=e?.changes&&typeof e.changes=="object"?Object.entries(e.changes):[];return`
    <li class="changelog-diff-item">
      <div class="changelog-diff-head">
        <span class="changelog-diff-action changelog-diff-action--${r?"create":"update"}">${a(l(t))}</span>
        ${e?.provider?`<span class="changelog-diff-provider">${a(e.provider)}</span>`:""}
        <span class="changelog-diff-subject">${a(s)}</span>
      </div>
      ${c.length?`
      <dl class="changelog-diff-fields">
        ${c.map(([d,i])=>`
        <div class="changelog-diff-field">
          <dt>${a(j(d))}</dt>
          <dd><del>${a(b(i?.from))}</del><span class="changelog-diff-arrow" aria-hidden="true">\u2192</span><ins>${a(b(i?.to))}</ins></dd>
        </div>`).join("")}
      </dl>`:""}
    </li>`}function I(e){let n=Object.hasOwn(v,e?.kind)?e.kind:"data",r=String(e?.date||""),s=Array.isArray(e?.items)?e.items:[],t=Array.isArray(e?.items_en)?e.items_en:[],c=g()==="en"&&t.length?t:s,d=Array.isArray(e?.change_items)?e.change_items:[];return`
    <article class="changelog-release" data-changelog-kind="${a(n)}">
      <div class="changelog-date">
        <time datetime="${a(r)}">${a(m(r))}</time>
        <span>${a(r.slice(0,4))}</span>
      </div>
      <div class="changelog-release-body">
        <div class="changelog-release-meta">
          <span>${a(e?.edition||m(r))}</span>
          <span class="changelog-kind changelog-kind--${a(n)}">${a(l(v[n]))}</span>
        </div>
        <h3>${a(h(e?.title,e?.title_en)||l("changelog.entry.default"))}</h3>
        ${(()=>{let i=h(e?.summary,e?.summary_en);return i?`<p class="changelog-release-summary">${a(i)}</p>`:""})()}
        <ul>
          ${c.map(i=>`
            <li><span class="changelog-item-mark" aria-hidden="true"></span><span>${a(i)}</span></li>`).join("")}
        </ul>
        ${d.length?`
        <ul class="changelog-diff-list" aria-label="${a(g()==="en"?"Change details":"\u53D8\u66F4\u660E\u7EC6")}">
          ${d.map(w).join("")}
        </ul>`:""}
      </div>
    </article>`}function p(e,n){e&&(e.hidden=!n)}function S(e){let n=k[e?.status]||k.planned,r=Number(e?.votes)>0?Number(e.votes):0,s=Array.isArray(e?.users)?e.users.filter(Boolean):[],t=g()==="en"?s.filter(u=>!y(u)):s,c=t.length?t.length>2?l("changelog.roadmap.usersMany",{a:t[0],b:t[1],n:t.length}):t.join(g()==="en"?", ":"\u3001"):"",d=h(e?.platform,e?.platform_en),i=[d?a(d):"",c?a(c):"",e?.date?a(l("changelog.roadmap.raised",{date:m(e.date)})):""].filter(Boolean).join(" \xB7 ");return`
    <li class="roadmap-item roadmap-item--${n.cls}">
      <span class="roadmap-status">${a(l(n.key))}</span>
      <div class="roadmap-body">
        <h3>${a(h(e?.title,e?.title_en)||"")}</h3>
        ${(()=>{let u=h(e?.note,e?.note_en);return u?`<p>${a(u)}</p>`:""})()}
        ${i?`<p class="roadmap-meta">${i}</p>`:""}
      </div>
      ${r?`<span class="roadmap-votes" title="${a(l("changelog.roadmap.votesTitle"))}">${a(l("changelog.roadmap.votes",{n:r}))}</span>`:""}
    </li>`}function B(e){let n=Array.isArray(e)?e.filter(s=>s&&(s.title||s.title_en)):[];if(!n.length||!o.roadmapList||!o.roadmapSection)return;let r=[...n].sort((s,t)=>{let c=d=>{let i=A.indexOf(d.status);return i===-1?A.length:i};return c(s)-c(t)||(Number(t.votes)||0)-(Number(s.votes)||0)});o.roadmapList.innerHTML=r.map(S).join(""),p(o.roadmapSection,!0)}function E(e){let n=Array.isArray(e?.entries)?[...e.entries].sort((s,t)=>String(t?.date||"").localeCompare(String(s?.date||""))):[],r=e?.last_updated||n[0]?.date||"";o.updatedAt.textContent=m(r),o.updatedAt.dateTime=r,o.count.textContent=n.length.toLocaleString(f()),o.list.innerHTML=n.length?n.map(I).join(""):`<div class="changelog-empty"><h3>${a(l("changelog.empty.title"))}</h3><p>${a(l("changelog.empty.body"))}</p></div>`,p(o.loading,!1),p(o.error,!1),p(o.list,!0)}function C(e){return Array.isArray(e)?e.filter(Boolean):typeof e!="string"||!e.trim()?[]:e.split(`
`).map(n=>n.trim()).filter(Boolean)}function x(e){let r=(Array.isArray(e?.items)?e.items:[]).filter(t=>t?.region==="international").map(t=>({id:t.id,date:t.publishedAt,edition:t.edition,kind:t.category,title:t.title,title_en:t.title_en,summary:t.summary,summary_en:t.summary_en,items:C(t.details),items_en:C(t.details_en),...Array.isArray(t.change_items)&&t.change_items.length?{change_items:t.change_items}:{}})),s=r[0]?.date||"";return{entries:r,last_updated:s}}async function M(){try{let e;if(z()){let n=await fetch("/api/changelog?take=100",{cache:"no-cache"});if(!n.ok)throw new Error("Changelog API unavailable");e=x(await n.json())}else{let n=await fetch("./changelog.json",{cache:"no-cache"});if(!n.ok)throw new Error("Changelog unavailable");e=await n.json()}E(e)}catch{p(o.loading,!1),p(o.list,!1),p(o.error,!0)}}async function R(){try{let e=await fetch("./roadmap.json",{cache:"no-cache"});if(!e.ok)return;let n=await e.json();B(n?.items)}catch{}}$();M();R();
