'use strict';
const D = window.REVIEW;
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Number(n));
const pct = (n, digits=2) => (Number(n)*100).toFixed(digits)+'%';
const sourceButton = (ids,label='View source captures') => `<button class="evidence-inline" data-evidence="${esc(ids)}">${esc(label)} <span aria-hidden="true">↗</span></button>`;
const competitors = [
 {name:'Fisher & Paykel',role:'Premium anchor',count:'12',days:'97',date:'25 Oct 2026',start:'20 Jul 2026',evidence:'META-FP-002',angle:'Premium kitchens and considered living.',observation:'Image and video samples emphasize kitchen design, ovens and New Zealand brand positioning. No explicit discount appears in the reviewed Meta cards.',test:'I would compare a real cooking task with premium kitchen storytelling, keeping the product and offer the same.'},
 {name:'Wolf',role:'Luxury and showroom benchmark',count:'300',days:'118',date:'25 Oct 2026',start:'29 Jun 2026',evidence:'META-WOLF-009',angle:'An invitation to the showroom.',observation:'The Sub-Zero, Wolf and Cove sample combines cooking performance with location-specific consultation campaigns. Repeated creatives across locations inflate a simple concept count.',test:'I would test an adviser conversation against direct purchase, then judge qualified calls and later matched orders.'},
 {name:'Thermador',role:'Premium technology and design',count:'48',days:'65',date:'25 Oct 2026',start:'21 Aug 2026',evidence:'META-THERMADOR-004',angle:'Distinctive design meets cooking proof.',observation:'Heritage, Blue Knobs, kitchen-suite and creator-associated examples appear across the sampled cards. Several examples promote refrigeration rather than induction.',test:'I would compare a genuine cooking demonstration with design-led storytelling, after checking the claims and usage rights.'},
 {name:'ZLINE',role:'Challenger brand',count:'150',days:'40',date:'25 Oct 2026',start:'15 Sep 2026',evidence:'META-ZLINE-002',angle:'Professional styling, education and savings.',observation:'The visible mix includes product images, video, education and creator association. The oldest reviewed card concerns dishwashers. Product categories and offers need separate treatment.',test:'I would test cooking performance, finish-led kitchen design and an approved offer. I would use our outcomes, rather than ad age, to judge the result.'},
 {name:'ILVE',role:'Design and finish competitor',count:'~6',days:'31',date:'25 Oct 2026',start:'24 Sep 2026',evidence:'META-ILVE-001',angle:'Italian design with a distinct point of view.',observation:'Five visible active cards were reviewed. Majestic III, finishes, kitchen styling and creator-associated cooking appear. An approximate six-result count does not establish a sixth reviewed ad.',test:'I would compare the finish story with practical cooking proof. The full videos and clicked buying path still need review.'},
 {name:'AJ Madison',role:'Multi-brand retailer',count:'3',days:'60',date:'26 Oct 2026',start:'27 Aug 2026',evidence:'META-AJM-001',angle:'Retail savings with a direct shopping CTA.',observation:'Three visible active product cards use Shop Now. Two show up-to savings offers, on products outside induction ranges. No induction-specific creative appears in this sample.',test:'I would compare an approved range offer with premium design. Those unrelated retail discounts do not establish what IH should offer.'}
];
$('#competitor-list').innerHTML = competitors.map((c,i)=>`<button class="competitor-choice" data-competitor="${i}" aria-pressed="${i===0}"><span><strong>${esc(c.name)}</strong><small>${esc(c.role)}</small></span><span aria-hidden="true">↗</span></button>`).join('');
function selectCompetitor(index){
 const c=competitors[index];
 document.querySelectorAll('[data-competitor]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.competitor)===index));
 $('#competitor-detail').innerHTML=`<div class="competitor-heading"><div><h3>${esc(c.name)}</h3><p>${esc(c.role)}</p></div><span class="pill observed">Dated sample</span></div><div class="competitor-content"><div><h4>${esc(c.angle)}</h4><p>${esc(c.observation)}</p><div class="micro-stats"><div><strong>${esc(c.count)}</strong><span>reported page results</span></div><div><strong>${esc(c.days)} days</strong><span>oldest reviewed start</span></div></div></div><button class="screenshot-preview" data-evidence="${esc(c.evidence)}" aria-label="Expand original ${esc(c.name)} Meta screenshot"><img src="${esc(D.assets[c.evidence])}" loading="lazy" alt="Original ${esc(c.name)} Meta Ad Library capture"><span>${esc(c.evidence)} · ${esc(c.date)} <b>Expand ↗</b></span></button></div><div class="test-note"><strong>What I would test:</strong> ${esc(c.test)}</div><p class="source-note">US advertiser view · Captured ${esc(c.date)} · Oldest reviewed start ${esc(c.start)}. Dates do not establish continuous delivery, spend or a winning ad.</p>`;
}
selectCompetitor(0);
const titles=['One consistent offer','Specific product value','Width and fuel routing','Premium design and suite story','Fit and delivery reassurance','Genuine creator demonstration','Assisted sales and showroom paths','Account truth before scale'];
$('#findings').innerHTML=D.findings.map((f,i)=>`<details class="finding"><summary><span>${esc(f.finding_id)}</span>${esc(titles[i])}<b aria-hidden="true">+</b></summary><div class="finding-body"><p><strong>Observed:</strong> ${esc(f.finding)}</p><p><strong>Action:</strong> ${esc(f.action)}</p><p><strong>Check:</strong> ${esc(f.measurement)}</p><p>${esc(f.limitation)}</p>${sourceButton(f.evidence_id.split(' ').join(','))}</div></details>`).join('');
const queries=[['induction range','Product modules and organic context. No selected-competitor sponsored text placement established.','Control nonbrand intent and product-type routing.','E15'],['48 inch induction range','Sponsored Products includes Best Buy selling a Fisher & Paykel range.','Prioritize eligible width-specific paths and clean feeds.','E17,E26'],['induction vs gas','AI, editorial, forum and video context. No sponsored competitor text placement verified.','Cap research intent inside the nonbrand allocation.','E43'],['Induction Hardware','Official site and other results. No competitor sponsored brand placement verified.','Separate brand budget and reporting.','E23']];
$('#query-table').innerHTML=queries.map(r=>`<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td><button data-evidence="${r[3]}">${r[3].replaceAll(',',', ')}</button></td></tr>`).join('');
$('#domain-table').innerHTML='<div class="table-wrap"><table><thead><tr><th>Domain</th><th>Inventory</th><th>Evidence</th></tr></thead><tbody>'+[['fisherpaykel.com','65','E07'],['zlinekitchen.com','About 900','E13'],['cafeappliances.com','About 400','E14'],['fulgor-milano.com','0 returned under these filters','E16'],['bestbuy.com','About 8k, across categories','E19']].map(r=>`<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td><button data-evidence="${r[2]}">${r[2]}</button></td></tr>`).join('')+'</tbody></table></div>';
$('#journey-table').innerHTML=D.landings.map(r=>`<tr><td>${esc(r.brand)}</td><td>${esc(r.offer_financing)}</td><td>${esc(r.shipping_install)}</td><td>${esc(r.decision_or_gap)}<br>${sourceButton(r.evidence_id.replaceAll(' ',','),'Source evidence')}</td></tr>`).join('');
$('#budget-table').innerHTML=D.phases.filter(r=>r.start.startsWith('2026-11')).map((r,i)=>`<tr><td>${['Nov 1–7','Nov 8–14','Nov 15–25','Nov 26–30'][i]}<br><small>${esc(r.phase)}</small></td><td>${money(r.google_usd)}</td><td>${money(r.meta_usd)}</td><td>${money(r.total_usd)}</td></tr>`).join('');
$('#campaigns').innerHTML=D.campaigns.map(c=>`<div class="campaign-row ${c.platform==='Meta'?'meta':''}" title="${esc(c.controls)}"><strong>${esc(c.platform)} ${esc(c.campaign_group)}</strong><span class="bar" aria-hidden="true"><i style="width:${Number(c.november_cap_usd)/42000*100}%"></i></span><span>${money(c.november_cap_usd)}</span></div>`).join('');
function renderForecast(index){
 const f=D.forecast[index];
 document.querySelectorAll('[data-case]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.case)===index));
 $('#case-label').textContent=f.case.toUpperCase()+' CASE';$('#forecast-revenue').textContent=money(f.net_revenue_usd);$('#forecast-roas').textContent=Number(f.revenue_roas).toFixed(2)+'x';$('#forecast-cac').textContent=money(f.media_cac_usd);$('#forecast-contribution').textContent=money(f.contribution_after_media_usd);
 $('#forecast-verdict').textContent=[
  'I would hold or reduce spend here. At the assumed contribution rate, this case loses money. There is no case for releasing the full ceiling.',
  'This is the number I would discuss with finance. It clears illustrative media break-even, but falls short of the 5x needed to retain $300 per order. I would not release the full ceiling on this forecast.',
  'This would be encouraging if it appeared in mature actual results. Here it is an upside scenario. I would still need verified contribution, measurement and stock before releasing more budget.'
 ][index];
 $('#forecast-inputs').innerHTML=`<div class="input-grid"><span>Google blended CPC</span><strong>${new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(f.google_blended_cpc_usd))}</strong><span>Google purchase rate</span><strong>${pct(f.google_purchase_rate)}</strong><span>Meta CPM</span><strong>${money(f.meta_cpm_usd)}</strong><span>Meta outbound CTR</span><strong>${pct(f.meta_outbound_ctr)}</strong><span>Meta purchase rate</span><strong>${pct(f.meta_purchase_rate)}</strong><span>Expected orders after haircut</span><strong>${Number(f.orders_after_haircut).toFixed(2)}</strong></div>`;
}
renderForecast(1);
function items(target,values,formatter){$(target).innerHTML=values.map(formatter).join('');}
items('#opportunities',D.opportunities,r=>`<article class="execution-item"><strong>${esc(r.rank)}. ${esc(r.opportunity)}</strong><p>${esc(r.acceptance)}</p><small>${esc(r.expected_impact)} impact · ${esc(r.effort)} effort<br>${esc(r.proposed_owner)} · ${esc(r.due)}</small></article>`);
items('#builds',D.builds,r=>`<article class="execution-item"><strong>${esc(r.build)}</strong><p>${esc(r.tools)} · ${esc(r.estimated_time)}</p><p>${esc(r.status_acceptance)}</p><small>${esc(r.owner)} · ${esc(r.due)}</small></article>`);
items('#requests',D.requests,r=>`<article class="execution-item"><strong>${esc(r.request)}</strong><p>${esc(r.detail)}</p><small>${esc(r.priority)} · ${esc(r.proposed_owner)} · ${esc(r.due)}</small></article>`);
items('#gates',D.gates,r=>`<article class="execution-item"><strong>${esc(r.gate_id)}. ${esc(r.owner)}</strong><p>${esc(r.verification)}</p><p><strong>Funding gate:</strong> ${esc(r.funding_gate)}. ${esc(r.failure_action)}.</p><small>${esc(r.due)} · ${esc(r.status)}</small></article>`);
function selectTab(name){
 document.querySelectorAll('[data-tab]').forEach(b=>{const active=b.dataset.tab===name;b.setAttribute('aria-selected',active);b.tabIndex=active?0:-1;});
 for(const n of ['meta','google','journey'])$('#panel-'+n).hidden=n!==name;
}
document.querySelectorAll('[data-tab]').forEach((b,i,all)=>{
 b.addEventListener('click',()=>selectTab(b.dataset.tab));
 b.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%all.length;else if(e.key==='ArrowLeft')next=(i+all.length-1)%all.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=all.length-1;else return;e.preventDefault();selectTab(all[next].dataset.tab);all[next].focus();});
});
const dialog=$('#evidence-dialog');let dialogTrigger=null;
function evidenceRecord(id){
 return D.evidence.find(r=>r.evidence_id===id)||D.evidence.find(r=>r.evidence_id.startsWith('LEGACY-'+id+'_'));
}
function openEvidence(ids,trigger){
 const selected=[...new Set(ids.split(',').map(x=>x.trim()).filter(Boolean))];dialogTrigger=trigger;
 $('#evidence-title').textContent=selected.join(' · ');
 $('#evidence-body').innerHTML=selected.map(id=>{
  const r=evidenceRecord(id),img=D.assets[id];
  if(!img)return `<article class="evidence-card"><h3>${esc(id)}</h3><p>No screenshot was captured for this source. Treat the observation as unverified. See the process and source files.</p></article>`;
  return `<article class="evidence-card"><h3>${esc(id)} · ${esc(r?.date||'2026-10-25')}</h3><p>${esc(r?.observation||'Original dated source capture. Source-specific limitations apply.')}</p><p>${esc(r?.settings||'Historical snapshot, not current performance.')}</p>${r?.url?`<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">Open original source URL ↗</a> · `:''}<a href="${esc(img)}" target="_blank" rel="noopener">Open full-resolution image ↗</a><img src="${esc(img)}" alt="Original screenshot ${esc(id)}"></article>`;
 }).join('');
 dialog.showModal();dialog.scrollTop=0;
}
document.addEventListener('click',e=>{
 const source=e.target.closest('[data-evidence]');if(source){openEvidence(source.dataset.evidence,source);return;}
 const c=e.target.closest('[data-competitor]');if(c){selectCompetitor(Number(c.dataset.competitor));return;}
 const f=e.target.closest('[data-case]');if(f){renderForecast(Number(f.dataset.case));return;}
});
$('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>dialogTrigger?.focus());
