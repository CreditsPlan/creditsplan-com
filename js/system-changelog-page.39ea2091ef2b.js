import{a as y}from"./chunk.7HYUNLOO.js";import{a as f}from"./chunk.EPE4QEOO.js";import{a as t}from"./chunk.Y3GWXKZH.js";import{a as p,c as m,e as i}from"./chunk.CK2CXFOA.js";function h(e,n){return p()==="en"&&n!=null&&String(n).trim()?n:e}var _={catalog:"changelog.kind.catalog",data:"changelog.kind.data",feature:"changelog.kind.feature"},$={in_progress:{key:"changelog.roadmap.status.progress",cls:"progress"},planned:{key:"changelog.roadmap.status.planned",cls:"planned"},evaluating:{key:"changelog.roadmap.status.evaluating",cls:"evaluating"}},z=["in_progress","planned","evaluating"],k={monthly_price:{zh:"\u6708\u8D39",en:"Monthly price"},first_month_price:{zh:"\u9996\u6708\u4EF7",en:"First-month price"},quarterly_price:{zh:"\u5B63\u8D39",en:"Quarterly price"},yearly_price:{zh:"\u5E74\u8D39",en:"Yearly price"},annual_price:{zh:"\u6309\u5E74\u4EF7",en:"Annual price"},monthly_currency:{zh:"\u5E01\u79CD",en:"Currency"},included_calls:{zh:"\u5305\u542B\u989D\u5EA6",en:"Included quota"},token_limit:{zh:"Token \u4E0A\u9650",en:"Token limit"},five_hours_requests:{zh:"5 \u5C0F\u65F6\u9650\u989D",en:"5-hour limit"},weekly_requests:{zh:"\u6BCF\u5468\u9650\u989D",en:"Weekly limit"},monthly_requests:{zh:"\u6BCF\u6708\u9650\u989D",en:"Monthly limit"},benefits:{zh:"\u6743\u76CA",en:"Benefits"},refund_policy:{zh:"\u9000\u6B3E\u653F\u7B56",en:"Refund policy"},billing_cycle:{zh:"\u8BA1\u8D39\u5468\u671F",en:"Billing cycle"},credits_limit:{zh:"Credits \u4E0A\u9650",en:"Credits limit"},reset_rule:{zh:"\u91CD\u7F6E\u89C4\u5219",en:"Reset rule"},notes:{zh:"\u5907\u6CE8",en:"Notes"},url:{zh:"\u8D2D\u4E70\u94FE\u63A5",en:"Purchase URL"},url_en:{zh:"\u8D2D\u4E70\u94FE\u63A5",en:"Purchase URL"},sort_order:{zh:"\u6392\u5E8F",en:"Sort order"},input_price:{zh:"\u8F93\u5165\u4EF7",en:"Input price"},output_price:{zh:"\u8F93\u51FA\u4EF7",en:"Output price"},cache_read_price:{zh:"\u7F13\u5B58\u8BFB\u4EF7",en:"Cache read price"},cache_write_price:{zh:"\u7F13\u5B58\u5199\u4EF7",en:"Cache write price"},currency:{zh:"\u5E01\u79CD",en:"Currency"},context_length:{zh:"\u4E0A\u4E0B\u6587\u957F\u5EA6",en:"Context length"},max_output:{zh:"\u6700\u5927\u8F93\u51FA",en:"Max output"},lifecycle_status:{zh:"\u751F\u547D\u5468\u671F\u72B6\u6001",en:"Lifecycle status"},release_date:{zh:"\u53D1\u5E03\u65E5\u671F",en:"Release date"}};function b(e){let n=k[e];return n?p()==="en"?n.en:n.zh:e}var o={count:document.getElementById("changelogEntryCount"),error:document.getElementById("changelogError"),list:document.getElementById("changelogList"),loading:document.getElementById("changelogLoading"),roadmapList:document.getElementById("roadmapList"),roadmapSection:document.getElementById("roadmapSection"),updatedAt:document.getElementById("changelogUpdatedAt")};function u(e){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||""));return n?`${n[1]}.${n[2]}.${n[3]}`:"\u2014"}function v(e){return e==null||String(e).trim()===""?"\u2014":String(e)}function L(e){let n=e?.scope==="model",s=e?.action==="create",r=n?e?.model_name||e?.canonical_id||"":e?.plan_name||e?.plan_id||"",a=`changelog.diff.${s?"create":"update"}${n?"Model":"Plan"}`,l=e?.changes&&typeof e.changes=="object"?Object.entries(e.changes):[];return`
    <li class="changelog-diff-item">
      <div class="changelog-diff-head">
        <span class="changelog-diff-action changelog-diff-action--${s?"create":"update"}">${t(i(a))}</span>
        ${e?.provider?`<span class="changelog-diff-provider">${t(e.provider)}</span>`:""}
        <span class="changelog-diff-subject">${t(r)}</span>
      </div>
      ${l.length?`
      <dl class="changelog-diff-fields">
        ${l.map(([c,d])=>`
        <div class="changelog-diff-field">
          <dt>${t(b(c))}</dt>
          <dd><del>${t(v(d?.from))}</del><span class="changelog-diff-arrow" aria-hidden="true">\u2192</span><ins>${t(v(d?.to))}</ins></dd>
        </div>`).join("")}
      </dl>`:""}
    </li>`}function C(e){let n=Object.hasOwn(_,e?.kind)?e.kind:"data",s=String(e?.date||""),r=Array.isArray(e?.items)?e.items:[],a=Array.isArray(e?.items_en)?e.items_en:[],l=p()==="en"&&a.length?a:r,c=Array.isArray(e?.change_items)?e.change_items:[];return`
    <article class="changelog-release" data-changelog-kind="${t(n)}">
      <div class="changelog-date">
        <time datetime="${t(s)}">${t(u(s))}</time>
        <span>${t(s.slice(0,4))}</span>
      </div>
      <div class="changelog-release-body">
        <div class="changelog-release-meta">
          <span>${t(e?.edition||u(s))}</span>
          <span class="changelog-kind changelog-kind--${t(n)}">${t(i(_[n]))}</span>
        </div>
        <h3>${t(h(e?.title,e?.title_en)||i("changelog.entry.default"))}</h3>
        ${e?.summary||e?.summary_en?`<p class="changelog-release-summary">${t(h(e.summary,e.summary_en))}</p>`:""}
        <ul>
          ${l.map(d=>`
            <li><span class="changelog-item-mark" aria-hidden="true"></span><span>${t(d)}</span></li>`).join("")}
        </ul>
        ${c.length?`
        <ul class="changelog-diff-list" aria-label="${t(p()==="en"?"Change details":"\u53D8\u66F4\u660E\u7EC6")}">
          ${c.map(L).join("")}
        </ul>`:""}
      </div>
    </article>`}function g(e,n){e&&(e.hidden=!n)}function I(e){let n=$[e?.status]||$.planned,s=Number(e?.votes)>0?Number(e.votes):0,r=Array.isArray(e?.users)?e.users.filter(Boolean):[],a=r.length?r.length>2?i("changelog.roadmap.usersMany",{a:r[0],b:r[1],n:r.length}):r.join(p()==="en"?", ":"\u3001"):"",l=h(e?.platform,e?.platform_en),c=[l?t(l):"",a?t(a):"",e?.date?t(i("changelog.roadmap.raised",{date:u(e.date)})):""].filter(Boolean).join(" \xB7 ");return`
    <li class="roadmap-item roadmap-item--${n.cls}">
      <span class="roadmap-status">${t(i(n.key))}</span>
      <div class="roadmap-body">
        <h3>${t(h(e?.title,e?.title_en)||"")}</h3>
        ${e?.note||e?.note_en?`<p>${t(h(e.note,e.note_en))}</p>`:""}
        ${c?`<p class="roadmap-meta">${c}</p>`:""}
      </div>
      ${s?`<span class="roadmap-votes" title="${t(i("changelog.roadmap.votesTitle"))}">${t(i("changelog.roadmap.votes",{n:s}))}</span>`:""}
    </li>`}function j(e){let n=Array.isArray(e)?e.filter(r=>r&&(r.title||r.title_en)):[];if(!n.length||!o.roadmapList||!o.roadmapSection)return;let s=[...n].sort((r,a)=>{let l=c=>{let d=z.indexOf(c.status);return d===-1?z.length:d};return l(r)-l(a)||(Number(a.votes)||0)-(Number(r.votes)||0)});o.roadmapList.innerHTML=s.map(I).join(""),g(o.roadmapSection,!0)}function w(e){let n=Array.isArray(e?.entries)?[...e.entries].sort((r,a)=>String(a?.date||"").localeCompare(String(r?.date||""))):[],s=e?.last_updated||n[0]?.date||"";o.updatedAt.textContent=u(s),o.updatedAt.dateTime=s,o.count.textContent=n.length.toLocaleString(m()),o.list.innerHTML=n.length?n.map(C).join(""):`<div class="changelog-empty"><h3>${t(i("changelog.empty.title"))}</h3><p>${t(i("changelog.empty.body"))}</p></div>`,g(o.loading,!1),g(o.error,!1),g(o.list,!0)}function A(e){return Array.isArray(e)?e.filter(Boolean):typeof e!="string"||!e.trim()?[]:e.split(`
`).map(n=>n.trim()).filter(Boolean)}function S(e){let s=(Array.isArray(e?.items)?e.items:[]).filter(a=>a?.region==="international").map(a=>({id:a.id,date:a.publishedAt,edition:a.edition,kind:a.category,title:a.title,title_en:a.title_en,summary:a.summary,summary_en:a.summary_en,items:A(a.details),items_en:A(a.details_en),...Array.isArray(a.change_items)&&a.change_items.length?{change_items:a.change_items}:{}})),r=s[0]?.date||"";return{entries:s,last_updated:r}}async function B(){try{let e;if(y()){let n=await fetch("/api/changelog?take=100",{cache:"no-cache"});if(!n.ok)throw new Error("Changelog API unavailable");e=S(await n.json())}else{let n=await fetch("./changelog.json",{cache:"no-cache"});if(!n.ok)throw new Error("Changelog unavailable");e=await n.json()}w(e)}catch{g(o.loading,!1),g(o.list,!1),g(o.error,!0)}}async function E(){try{let e=await fetch("./roadmap.json",{cache:"no-cache"});if(!e.ok)return;let n=await e.json();j(n?.items)}catch{}}f();B();E();
