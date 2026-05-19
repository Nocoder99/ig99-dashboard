// =====================================================
// UI.JS — 3-Tab Dashboard Layout
// =====================================================

// --- Current tab ---
var currentTab="summary";

// --- Status ---
function setStatus(ok){document.getElementById("statusDot").className="sd "+(ok?"live":"off");document.getElementById("statusLabel").textContent=ok?"live":"offline"}
function showError(m){var e=document.getElementById("errorBanner");e.textContent=m;e.style.display="block"}
function hideError(){document.getElementById("errorBanner").style.display="none"}
function si(m){var e=document.getElementById("infoBanner");e.textContent=m;e.style.display="block"}
function hideInfo(){document.getElementById("infoBanner").style.display="none"}

// --- Tab Switching ---
function switchTab(tabName){
  currentTab=tabName;
  var tabs=document.querySelectorAll(".tab-btn");
  tabs.forEach(function(t){t.classList.remove("active")});
  var map={"summary":0,"portfolio":1,"market":2,"financials":3};
  if(tabs[map[tabName]])tabs[map[tabName]].classList.add("active");

  document.querySelectorAll(".view-section").forEach(function(s){s.classList.remove("active")});
  var sec=document.getElementById("view-"+tabName);
  if(sec)sec.classList.add("active");

  // Re-render charts for the visible tab (Chart.js needs visible canvas)
  if(tabName==="summary"){
    renderSummaryView();
    renderPortfolioValueChart();
  } else if(tabName==="portfolio"){
    renderPortfolioView();
    fetchChart(selTk,curRange);
    rAbout(selTk);showNewsLoading();fetchPN(selTk);
  } else if(tabName==="market"){
    renderMarketView();
    fetchMarketHeadlines();
  } else if(tabName==="financials"){
    renderFinancialsView();
  }
}

// --- Compute rows (avgCostEUR = cost per share in EUR) ---
function computeRows(){
  return PORTFOLIO.map(function(p){
    var q=p.ticker?quotes[p.ticker]:null,price=q?q.regularMarketPrice:null,dayChg=q?q.regularMarketChangePercent:null;
    if(!price&&p.manualPrice){price=p.manualPrice;dayChg=0}
    var actualCcy=getQuoteCcy(p,q);
    var rate=getFx(actualCcy);
    var valueEUR=price!=null?price*p.shares*rate:null;
    var costEUR=p.avgCostEUR*p.shares;
    var plEUR=valueEUR!=null?valueEUR-costEUR:null;
    var plPct=plEUR!=null?(plEUR/costEUR)*100:null;
    var suspect=valueEUR!=null&&costEUR>0&&valueEUR>costEUR*50;
    if(suspect){valueEUR=null;plEUR=null;plPct=null}
    var avgCostNative=actualCcy==="EUR"?p.avgCostEUR:(rate>0?p.avgCostEUR/rate:p.avgCostEUR);
    return{ticker:p.ticker,name:p.name,shares:p.shares,avgCostEUR:p.avgCostEUR,avgCostNative:avgCostNative,ccy:actualCcy,q:q,price:price,dayChg:dayChg,valueEUR:valueEUR,costEUR:costEUR,plEUR:plEUR,plPct:plPct,suspect:suspect};
  }).sort(function(a,b){return(b.valueEUR||0)-(a.valueEUR||0)});
}

// --- Render all (called on refresh) ---
function renderAll(){
  var rows=computeRows();
  var loaded=rows.filter(function(r){return r.price!=null}).length;
  var suspects=rows.filter(function(r){return r.suspect}).length;
  document.getElementById("headerMeta").textContent=loaded+"/"+PORTFOLIO.length+" positions"+(suspects?" ("+suspects+" excluded - FX error)":"");

  // Stats cards (visible on all tabs)
  var tv=0,tc=0,dp=0;
  rows.forEach(function(r){
    if(r.valueEUR==null)return;tv+=r.valueEUR;tc+=r.costEUR;
    var rate=getFx(r.ccy);
    if(r.q&&r.q.regularMarketChange!=null)dp+=r.q.regularMarketChange*r.shares*rate;
  });
  var tpl=tv-tc,tpp=tc?(tpl/tc)*100:0,dpc=tv?(dp/(tv-dp))*100:0;
  var up=tpl>=0,du=dp>=0;
  document.getElementById("sumValue").textContent="€"+fn(tv,0);
  document.getElementById("sumCost").textContent="Cost basis €"+fn(tc,0);
  var pe=document.getElementById("sumPL");pe.textContent=(up?"+":"")+"€"+fn(tpl,0);pe.className="sv "+(up?"g":"r");
  var pp=document.getElementById("sumPLpct");pp.textContent=fp(tpp);pp.className="ss "+(up?"g":"r");
  var de=document.getElementById("sumDayPL");de.textContent=(du?"+":"")+"€"+fn(dp,0);de.className="sv "+(du?"g":"r");
  var dd=document.getElementById("sumDayPct");dd.textContent=fp(dpc);dd.className="ss "+(du?"g":"r");
  document.getElementById("sumPositions").textContent=PORTFOLIO.length;
  if(rows[0]&&rows[0].valueEUR&&tv)document.getElementById("sumTopHolding").textContent="Top: "+rows[0].name+" ("+((rows[0].valueEUR/tv)*100).toFixed(1)+"%)";

  // Render current tab
  if(currentTab==="summary")renderSummaryView(rows,tv);
  else if(currentTab==="portfolio")renderPortfolioView(rows,tv);
  // Market view renders separately from market data
}

// =====================================================
// VIEW 1: SUMMARY
// =====================================================
// (Portfolio value chart instance managed by renderPortfolioValueChart)

function renderSummaryView(rows,tv){
  // Summary view is now just the portfolio value chart — header stats cover the key numbers
  // Chart is rendered separately by renderPortfolioValueChart()
}

// Portfolio value over time chart
var pvChartInst=null;
function renderPortfolioValueChart(){
  var canvas=document.getElementById("portfolioValueChart");if(!canvas)return;
  var ctx=canvas.getContext("2d");
  if(pvChartInst)pvChartInst.destroy();

  // Merge Bolero quarterly history with daily snapshots
  var labels=[],values=[],invested=[];
  var hasBolero=typeof BOLERO!=="undefined"&&BOLERO.quarterlyValues&&BOLERO.quarterlyValues.length>0;

  if(hasBolero){
    BOLERO.quarterlyValues.forEach(function(q){
      var d=new Date(q.date);
      labels.push(d.toLocaleDateString("en-US",{month:"short",year:"2-digit"}));
      values.push(q.value);
      invested.push(q.invested);
    });
  }

  // Append daily snapshots that are newer than the last quarterly date
  var hist=getPortfolioHistory();
  var lastQ=hasBolero?BOLERO.quarterlyValues[BOLERO.quarterlyValues.length-1].date:"";
  var lastInvested=hasBolero?invested[invested.length-1]:0;
  hist.forEach(function(h){
    if(h.d>lastQ){
      labels.push(new Date(h.d).toLocaleDateString("en-US",{month:"short",day:"numeric"}));
      values.push(h.v);
      invested.push(lastInvested);
    }
  });

  var note=document.getElementById("pvChartNote");
  var placeholder=document.getElementById("pvPlaceholder");
  if(values.length<2){
    pvChartInst=null;
    canvas.style.display="none";
    if(placeholder)placeholder.style.display="flex";
    if(note)note.textContent="Come back tomorrow to start seeing your portfolio trend.";
    return;
  }
  canvas.style.display="";
  if(placeholder)placeholder.style.display="none";

  var startVal=values[0],endVal=values[values.length-1];
  var isUp=endVal>=startVal;
  var lc=isUp?"#047857":"#b91c1c";
  var fc=isUp?"rgba(4,120,87,.08)":"rgba(185,28,28,.08)";

  var ds=[{
    label:"Portfolio Value",
    data:values,
    borderColor:lc,backgroundColor:fc,fill:true,
    tension:.3,pointRadius:values.length>30?0:4,pointHitRadius:8,borderWidth:2.5
  }];
  if(invested.length>0&&invested[0]>0){
    ds.push({
      label:"Total Invested",
      data:invested,
      borderColor:"#78716c",borderDash:[5,5],borderWidth:1.5,
      pointRadius:0,pointHitRadius:0,fill:false,tension:.3
    });
  }

  pvChartInst=new Chart(ctx,{
    type:"line",
    data:{labels:labels,datasets:ds},
    options:{
      responsive:true,maintainAspectRatio:false,
      interaction:{intersect:false,mode:"index"},
      plugins:{
        legend:{display:true,position:"bottom",labels:{font:{family:"Inter",size:10},boxWidth:16,padding:12}},
        tooltip:{
          backgroundColor:"#fafaf9",titleColor:"#1c1917",bodyColor:"#1c1917",
          borderColor:"#1c1917",borderWidth:1,
          titleFont:{family:"JetBrains Mono",size:11},
          bodyFont:{family:"JetBrains Mono",size:11},
          callbacks:{
            label:function(c){
              var prefix=c.datasetIndex===0?"Value: ":"Invested: ";
              return prefix+"\u20ac"+c.parsed.y.toLocaleString();
            },
            afterBody:function(items){
              if(items.length>=2){
                var val=items[0].parsed.y,inv=items[1].parsed.y;
                var gain=val-inv;
                var pct=inv>0?((gain/inv)*100).toFixed(1):"0";
                return (gain>=0?"+":"")+"\u20ac"+Math.abs(gain).toLocaleString()+" ("+pct+"%) "+(gain>=0?"gain":"loss");
              }
              return "";
            }
          }
        }
      },
      scales:{
        x:{ticks:{font:{family:"JetBrains Mono",size:9},color:"#78716c",maxTicksLimit:12},grid:{display:false},border:{color:"#d6d3d1"}},
        y:{ticks:{font:{family:"JetBrains Mono",size:9},color:"#78716c",callback:function(v){return"\u20ac"+(v/1000).toFixed(0)+"k"}},grid:{color:"#f5f5f4"},border:{display:false}}
      }
    }
  });

  if(note){
    var chg=endVal-startVal;
    var chgPct=startVal>0?((endVal-startVal)/startVal)*100:0;
    var startDate=hasBolero?"Q4 2020":hist.length>0?hist[0].d:"";
    note.textContent="Since "+startDate+" \u00b7 "+(chg>=0?"+":"")+"\u20ac"+fn(Math.abs(chg),0)+" ("+fp(chgPct)+") \u00b7 Portfolio value vs total capital invested";
  }
}


function initSumRangeButtons(){
  // No longer needed — summary has no per-stock chart
}

// =====================================================
// VIEW 2: PORTFOLIO ANALYST
// =====================================================
function renderPortfolioView(rows,tv){
  if(!rows){rows=computeRows();tv=0;rows.forEach(function(r){if(r.valueEUR!=null)tv+=r.valueEUR})}
  renderPortfolioHoldings(rows,tv);
  renderDetail(rows,tv);
  renderExposure();
}

function renderPortfolioHoldings(rows,tv){
  var tb=document.getElementById("holdingsBody");
  if(!tb)return;
  tb.innerHTML="";
  rows.forEach(function(r){
    var tr=document.createElement("tr");
    if(r.ticker===selTk)tr.classList.add("sel");
    if(r.suspect)tr.style.opacity="0.4";
    tr.onclick=function(){selectPosition(r.ticker)};
    var s=cs(r.ccy),d2=(r.dayChg||0)>=0,p2=(r.plPct||0)>=0,is=r.ticker===selTk;
    var valText=r.suspect?"€— (FX err)":"€"+fn(r.valueEUR,0);
    var retText=r.suspect?"—":fp(r.plPct);
    var plText=r.suspect?"":((r.plEUR!=null?(p2?"+":"")+"€"+fn(r.plEUR,0):""));
    tr.innerHTML='<td style="padding-left:12px"><div class="pn">'+r.name+'</div><div class="pm">'+r.ticker+' · '+r.shares.toLocaleString()+' sh</div></td>'
      +'<td class="mc">'+(r.price!=null?s+fn(r.price,r.price<10?3:2):"—")+'</td>'
      +'<td class="mc '+(d2?"g":"r")+'" style="font-size:11px">'+fp(r.dayChg)+'</td>'
      +'<td class="mc hide-mob" style="color:'+(is?'#a8a29e':'#78716c')+'">€'+fn(r.avgCostEUR,r.avgCostEUR<10?2:1)+'</td>'
      +'<td class="mc" style="font-weight:500">'+valText+'</td>'
      +'<td style="padding-right:12px"><div class="mc '+(p2?"g":"r")+'" style="font-weight:500">'+retText+'</div><div class="rs">'+plText+'</div></td>';
    tb.appendChild(tr);
  });
}

function renderDetail(rows,tv){
  var r=null;
  for(var i=0;i<rows.length;i++){if(rows[i].ticker===selTk){r=rows[i];break}}
  if(!r)return;
  var s=cs(r.ccy),su=(r.dayChg||0)>=0,pu=(r.plPct||0)>=0;
  document.getElementById("detName").textContent=r.name;
  document.getElementById("detTicker").textContent=r.ticker+(r.q&&r.q.fullExchangeName?" · "+r.q.fullExchangeName:"");
  document.getElementById("detPrice").textContent=r.price!=null?s+fn(r.price,r.price<10?3:2):"—";
  var ce=document.getElementById("detChange");
  if(r.q&&r.q.regularMarketChange!=null){
    ce.textContent=(su?"+":"")+fn(r.q.regularMarketChange,2)+" ("+fp(r.dayChg)+")";
  } else {ce.textContent=""}
  ce.className="dc "+(su?"g":"r");
  var pl=document.getElementById("detPL");
  pl.textContent=r.suspect?"FX error":fp(r.plPct);
  pl.className="iv "+(pu?"g":"r");
  var ple=document.getElementById("detPLeur");
  ple.textContent=r.plEUR!=null?(pu?"+":"")+"€"+fn(r.plEUR,0):"";
  ple.className="is "+(pu?"g":"r");
  document.getElementById("detAvgCost").textContent="€"+fn(r.avgCostEUR,2);
  document.getElementById("detShares").textContent=r.shares.toLocaleString()+" shares";
  document.getElementById("detValue").textContent=r.suspect?"FX error":"€"+fn(r.valueEUR,0);
  document.getElementById("detWeight").textContent=tv&&r.valueEUR?((r.valueEUR/tv)*100).toFixed(1)+"% of port.":"";
  document.getElementById("chartNote").textContent="Dashed line = your avg cost ("+s+fn(r.avgCostNative,2)+")";
  if(r.q){
    document.getElementById("statsGrid").style.display="grid";
    document.getElementById("st52low").textContent=r.q.fiftyTwoWeekLow?s+fn(r.q.fiftyTwoWeekLow,2):"—";
    document.getElementById("st52high").textContent=r.q.fiftyTwoWeekHigh?s+fn(r.q.fiftyTwoWeekHigh,2):"—";
    document.getElementById("stMktCap").textContent=r.q.marketCap?s+fb(r.q.marketCap):"—";
    document.getElementById("stPE").textContent=r.q.trailingPE?r.q.trailingPE.toFixed(1):"—";
  }
}

// --- Chart ---
function rChart(data,sym){
  var canvas=document.getElementById("priceChart"),ctx=canvas.getContext("2d");
  canvas.style.display="";
  var chartBox=document.querySelector("#view-portfolio .chart-box");
  if(chartBox){var ld=chartBox.querySelector(".chart-loading");if(ld)ld.remove()}
  if(chartInst)chartInst.destroy();
  if(!data.length){
    chartInst=null;ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font="12px Inter";ctx.fillStyle="#a8a29e";ctx.textAlign="center";
    ctx.fillText("No chart data available",canvas.width/2,110);return;
  }
  var pos=null;
  for(var i=0;i<PORTFOLIO.length;i++){if(PORTFOLIO[i].ticker===sym){pos=PORTFOLIO[i];break}}
  var q=quotes[sym];
  var displayCcy=pos?getQuoteCcy(pos,q):(pos?pos.ccy:"USD");
  var rate=getFx(displayCcy);
  var acEUR=pos?pos.avgCostEUR:null;
  var ac=acEUR!=null?(displayCcy==="EUR"?acEUR:(rate>0?acEUR/rate:acEUR)):null;
  var iu=data[data.length-1].price>=data[0].price;
  var lc=iu?"#047857":"#b91c1c",fc=iu?"rgba(4,120,87,.12)":"rgba(185,28,28,.12)";
  var ds=[{data:data.map(function(d){return d.price}),borderColor:lc,backgroundColor:fc,fill:true,tension:.3,pointRadius:0,pointHitRadius:8,borderWidth:1.5}];
  if(ac)ds.push({data:data.map(function(){return ac}),borderColor:"#78716c",borderDash:[4,4],borderWidth:1,pointRadius:0,pointHitRadius:0,fill:false});
  chartInst=new Chart(ctx,{
    type:"line",data:{labels:data.map(function(d){return d.label}),datasets:ds},
    options:{responsive:true,maintainAspectRatio:false,interaction:{intersect:false,mode:"index"},plugins:{legend:{display:false},tooltip:{backgroundColor:"#fafaf9",titleColor:"#1c1917",bodyColor:"#1c1917",borderColor:"#1c1917",borderWidth:1,titleFont:{family:"JetBrains Mono",size:11},bodyFont:{family:"JetBrains Mono",size:11},callbacks:{label:function(c){return c.datasetIndex===0?cs(displayCcy)+c.parsed.y.toFixed(2):"Avg cost: "+cs(displayCcy)+c.parsed.y.toFixed(2)}}}},scales:{x:{ticks:{font:{family:"JetBrains Mono",size:9},color:"#78716c",maxTicksLimit:8},grid:{display:false},border:{color:"#d6d3d1"}},y:{ticks:{font:{family:"JetBrains Mono",size:9},color:"#78716c"},grid:{color:"#f5f5f4"},border:{display:false}}}}
  });
}

function initRangeButtons(){
  var rg=[{k:"1d",l:"1D"},{k:"5d",l:"5D"},{k:"1mo",l:"1M"},{k:"6mo",l:"6M"},{k:"1y",l:"1Y"},{k:"5y",l:"5Y"}];
  var c=document.getElementById("rangeBtns");
  rg.forEach(function(r){
    var b=document.createElement("button");
    b.className="rn"+(r.k===curRange?" act":"");b.textContent=r.l;
    b.onclick=function(){
      curRange=r.k;
      c.querySelectorAll(".rn").forEach(function(x){x.classList.remove("act")});
      b.classList.add("act");
      // Sync summary range buttons
      var sb=document.getElementById("sumRangeBtns");
      if(sb)sb.querySelectorAll(".rn").forEach(function(x){x.classList.toggle("act",x.textContent===r.l)});
      fetchChart(selTk,curRange);
    };
    c.appendChild(b);
  });
}

function rAbout(tk){
  var c=document.getElementById("aboutCard");
  var pos=null;
  for(var i=0;i<PORTFOLIO.length;i++){if(PORTFOLIO[i].ticker===tk){pos=PORTFOLIO[i];break}}
  if(!pos||!pos.desc){c.style.display="none";return}
  c.style.display="block";
  document.getElementById("aboutText").textContent=pos.desc;
  document.getElementById("aboutMeta").innerHTML="";
}

function showNewsLoading(){
  var c=document.getElementById("newsCard"),l=document.getElementById("newsList");
  c.style.display="block";
  l.innerHTML='<div class="news-loading">Loading news<span class="loading-dots"></span></div>';
}
function rNews(articles){
  var c=document.getElementById("newsCard"),l=document.getElementById("newsList");
  if(!articles.length){c.style.display="none";return}
  c.style.display="block";l.innerHTML="";
  articles.slice(0,5).forEach(function(n){
    var d=document.createElement("div");d.className="ni";
    var ds=n.providerPublishTime?new Date(n.providerPublishTime*1000).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"";
    d.innerHTML='<a href="'+(n.link||"#")+'" target="_blank"><div class="nt">'+(n.title||"")+'</div><div class="nm">'+(n.publisher||"")+(ds?" · "+ds:"")+'</div></a>';
    l.appendChild(d);
  });
}

// --- Exposure charts ---
var geoChartInst=null;
var REGION_COLORS={
  "US":"#6366f1","Europe":"#10b981","Global":"#a8a29e",
  "Japan":"#f59e0b","Taiwan":"#8b5cf6","South Korea":"#ef4444"
};
var SECTOR_COLORS={
  "Technology":"#6366f1","Financials":"#10b981","Healthcare":"#ec4899",
  "Consumer Disc.":"#f97316","Industrials":"#ef4444","Energy":"#eab308",
  "Materials":"#22c55e","Real Estate":"#f43f5e","Commodities":"#78716c",
  "Crypto":"#f59e0b","Diversified ETF":"#06b6d4"
};

function computeExposure(key){
  var rows=computeRows(),map={},total=0;
  rows.forEach(function(r){
    if(r.valueEUR==null||r.suspect)return;
    var k=null;
    for(var i=0;i<PORTFOLIO.length;i++){
      if(PORTFOLIO[i].ticker===r.ticker&&PORTFOLIO[i].name===r.name){k=PORTFOLIO[i][key];break}
    }
    if(!k)k="Other";
    if(!map[k])map[k]=0;
    map[k]+=r.valueEUR;total+=r.valueEUR;
  });
  var arr=[];
  for(var k in map)arr.push({label:k,value:map[k],pct:total?(map[k]/total)*100:0});
  arr.sort(function(a,b){return b.value-a.value});
  return{items:arr,total:total};
}

function renderGeoExposure(){
  var data=computeExposure("region");
  var canvas=document.getElementById("geoChart"),ctx=canvas.getContext("2d");
  if(geoChartInst)geoChartInst.destroy();
  var colors=data.items.map(function(d){return REGION_COLORS[d.label]||"#d6d3d1"});
  geoChartInst=new Chart(ctx,{
    type:"doughnut",
    data:{labels:data.items.map(function(d){return d.label}),datasets:[{data:data.items.map(function(d){return d.value}),backgroundColor:colors,borderColor:"#fff",borderWidth:2,hoverBorderWidth:0}]},
    options:{responsive:true,maintainAspectRatio:true,cutout:"65%",plugins:{legend:{display:false},tooltip:{backgroundColor:"#fafaf9",titleColor:"#1c1917",bodyColor:"#1c1917",borderColor:"#1c1917",borderWidth:1,titleFont:{family:"Inter",size:11},bodyFont:{family:"JetBrains Mono",size:11},callbacks:{label:function(c){var p=data.total?((c.parsed/data.total)*100).toFixed(1):"0";return " €"+fn(c.parsed,0)+" ("+p+"%)"}}}}}
  });
  var leg=document.getElementById("geoLegend");leg.innerHTML="";
  data.items.forEach(function(d){
    var row=document.createElement("div");row.className="expo-legend-item";
    row.innerHTML='<span class="expo-label"><span class="expo-dot" style="background:'+(REGION_COLORS[d.label]||"#d6d3d1")+'"></span>'+d.label+'</span><span class="expo-pct">'+d.pct.toFixed(1)+'%</span><span class="expo-val">€'+fn(d.value,0)+'</span>';
    leg.appendChild(row);
  });
}

function renderSectorExposure(){
  var data=computeExposure("sector");
  var maxPct=data.items.length?data.items[0].pct:100;
  var wrap=document.getElementById("sectorBars");wrap.innerHTML="";
  data.items.forEach(function(d){
    var row=document.createElement("div");row.className="sector-bar-row";
    var barW=maxPct>0?(d.pct/maxPct)*100:0;
    var color=SECTOR_COLORS[d.label]||"#a8a29e";
    row.innerHTML='<span class="sector-bar-label">'+d.label+'</span><div class="sector-bar-track"><div class="sector-bar-fill" style="width:'+barW+'%;background:'+color+'"></div></div><span class="sector-bar-pct">'+d.pct.toFixed(1)+'%</span>';
    wrap.appendChild(row);
  });
}

// --- Asset Allocation ---
var allocChartInst=null;
var ASSET_COLORS={"Equity":"#6366f1","ETF":"#06b6d4","Crypto":"#f59e0b","Bond":"#10b981","Commodity":"#78716c"};

function renderAssetAllocation(){
  var data=computeExposure("assetType");
  var canvas=document.getElementById("assetAllocChart"),ctx=canvas.getContext("2d");
  if(allocChartInst)allocChartInst.destroy();
  var colors=data.items.map(function(d){return ASSET_COLORS[d.label]||"#d6d3d1"});
  document.getElementById("allocTotalVal").textContent="€"+fn(data.total,0);
  allocChartInst=new Chart(ctx,{
    type:"doughnut",
    data:{labels:data.items.map(function(d){return d.label}),datasets:[{data:data.items.map(function(d){return d.value}),backgroundColor:colors,borderColor:"#fff",borderWidth:2,hoverBorderWidth:0}]},
    options:{responsive:true,maintainAspectRatio:true,cutout:"68%",plugins:{legend:{display:false},tooltip:{backgroundColor:"#fafaf9",titleColor:"#1c1917",bodyColor:"#1c1917",borderColor:"#1c1917",borderWidth:1,titleFont:{family:"Inter",size:11},bodyFont:{family:"JetBrains Mono",size:11},callbacks:{label:function(c){var p=data.total?((c.parsed/data.total)*100).toFixed(1):"0";return " €"+fn(c.parsed,0)+" ("+p+"%)"}}}}}
  });
  var leg=document.getElementById("assetAllocLegend");leg.innerHTML="";
  data.items.forEach(function(d){
    var item=document.createElement("div");item.className="asset-alloc-item";
    item.innerHTML='<div class="asset-alloc-swatch" style="background:'+(ASSET_COLORS[d.label]||"#d6d3d1")+'"></div><div class="asset-alloc-info"><div class="asset-alloc-name">'+d.label+'</div><div class="asset-alloc-row2"><span>€'+fn(d.value,0)+'</span></div></div><div class="asset-alloc-pct">'+d.pct.toFixed(1)+'%</div>';
    leg.appendChild(item);
  });
}

// --- Holdings by Weight ---
var WEIGHT_PALETTE=["#6366f1","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4","#f97316","#22c55e","#eab308","#f43f5e","#78716c","#14b8a6","#a855f7","#fb923c","#84cc16","#0ea5e9","#e11d48","#64748b","#d946ef","#facc15","#2dd4bf"];

function renderWeightBars(){
  var rows=computeRows(),total=0;
  rows.forEach(function(r){if(r.valueEUR!=null&&!r.suspect)total+=r.valueEUR});
  var wrap=document.getElementById("weightBars");wrap.innerHTML="";
  var maxPct=rows.length&&rows[0].valueEUR?((rows[0].valueEUR)/total)*100:100;
  rows.forEach(function(r,idx){
    if(r.valueEUR==null||r.suspect)return;
    var pct=total?(r.valueEUR/total)*100:0;
    var barW=maxPct>0?(pct/maxPct)*100:0;
    var color=WEIGHT_PALETTE[idx%WEIGHT_PALETTE.length];
    var row=document.createElement("div");row.className="weight-bar-row";
    row.innerHTML='<span class="weight-bar-name">'+r.name+'</span><span class="weight-bar-ticker">'+r.ticker+'</span><div class="weight-bar-track"><div class="weight-bar-fill" style="width:'+barW+'%;background:'+color+'"></div></div><span class="weight-bar-pct">'+pct.toFixed(1)+'%</span><span class="weight-bar-val">€'+fn(r.valueEUR,0)+'</span>';
    row.style.cursor="pointer";
    row.onclick=function(){selectPosition(r.ticker)};
    wrap.appendChild(row);
  });
}

function renderExposure(){
  renderGeoExposure();
  renderSectorExposure();
  renderAssetAllocation();
  renderWeightBars();
  renderJPMContext();
  renderAIAnalysis();
}

// =====================================================
// JPM GUIDE TO THE MARKETS
// =====================================================
var JPM_PE={
  "US":          {current:21.0,avg:16.6,p25:14.8,p75:19.0,min:10,max:26},
  "Europe":      {current:14.3,avg:14.3,p25:12.0,p75:16.0,min:8,max:22},
  "UK":          {current:12.5,avg:13.0,p25:11.0,p75:14.5,min:8,max:20},
  "Japan":       {current:14.8,avg:14.5,p25:12.5,p75:16.5,min:10,max:22},
  "Asia ex-JP":  {current:13.0,avg:12.8,p25:11.0,p75:14.5,min:8,max:20},
  "EM":          {current:12.0,avg:11.5,p25:10.0,p75:13.0,min:8,max:18},
  "China":       {current:11.4,avg:11.6,p25:9.5,p75:13.5,min:7,max:20}
};

var JPM_US_DETAIL={
  fwdPE:{current:21.0,avg:16.6,label:"Fwd P/E"},
  cape: {current:39.6,avg:27.2,label:"Shiller CAPE"},
  pb:   {current:5.4,avg:3.2,label:"P/B Ratio"}
};

var JPM_LTCMA=[
  {region:"Japan",         ret:8.2,color:"#f59e0b"},
  {region:"Emerging Mkts", ret:7.5,color:"#ef4444"},
  {region:"Eurozone",      ret:7.0,color:"#10b981"},
  {region:"China",         ret:6.8,color:"#dc2626"},
  {region:"US Large Cap",  ret:5.8,color:"#6366f1"},
  {region:"Glb 60/40",     ret:4.5,color:"#78716c"},
  {region:"Euro IG Corp",  ret:3.8,color:"#06b6d4"},
  {region:"Euro Govt",     ret:3.2,color:"#a8a29e"},
  {region:"Euro Cash",     ret:2.5,color:"#d6d3d1"}
];

var REGION_TO_JPM={"US":"US","Europe":"Europe","Japan":"Japan","Taiwan":"Asia ex-JP","South Korea":"Asia ex-JP","Global":"US"};

// JPM Central Banks data
var JPM_CENTRAL_BANKS=[
  {name:"Fed",rate:"5.25-5.50%",expect:"3 cuts expected by end-2026",sub:"US Federal Reserve"},
  {name:"ECB",rate:"3.75%",expect:"1-2 more cuts expected",sub:"European Central Bank"},
  {name:"BoE",rate:"5.25%",expect:"2 cuts expected by end-2026",sub:"Bank of England"},
  {name:"BoJ",rate:"0.25%",expect:"Gradual normalisation",sub:"Bank of Japan"},
  {name:"SNB",rate:"1.50%",expect:"On hold",sub:"Swiss National Bank"}
];

function renderJPMContext(){
  renderJPMValuations();
  renderJPMReturns();
  renderJPMPortOverlay();
  renderJPMUSDetail();
}

function renderJPMValuationsTo(elId){
  var el=document.getElementById(elId);
  if(!el)return;
  var scaleMin=7,scaleMax=26;
  var html='<table class="jpm-val-table"><thead><tr><th style="text-align:left">Region</th><th>Now</th><th>Avg</th><th style="text-align:center">Range</th><th>vs Avg</th></tr></thead><tbody>';
  for(var region in JPM_PE){
    var d=JPM_PE[region];
    var barPct=Math.max(3,Math.min(97,((d.current-scaleMin)/(scaleMax-scaleMin))*100));
    var avgPct=Math.max(3,Math.min(97,((d.avg-scaleMin)/(scaleMax-scaleMin))*100));
    var barColor=d.current>d.avg*1.12?"#fca5a5":d.current<d.avg*0.92?"#bbf7d0":"#bfdbfe";
    var diffPct=((d.current/d.avg-1)*100).toFixed(0);
    var diffText=diffPct>0?"+"+diffPct+"%":diffPct+"%";
    var diffCls=diffPct>10?"over":diffPct<-5?"under":"neutral";
    html+='<tr><td class="jpm-val-region">'+region+'</td><td class="jpm-val-num">'+d.current.toFixed(1)+'x</td><td class="jpm-val-avg">'+d.avg.toFixed(1)+'x</td><td class="jpm-val-bar-cell"><div class="jpm-val-bar-track"><div class="jpm-val-bar-fill" style="width:'+barPct+'%;background:'+barColor+'"></div><div class="jpm-val-bar-avg-line" style="left:'+avgPct+'%"></div></div></td><td class="jpm-val-diff '+diffCls+'">'+diffText+'</td></tr>';
  }
  html+='</tbody></table>';
  html+='<div style="margin-top:8px;font-family:JetBrains Mono;font-size:9px;color:#a8a29e;display:flex;align-items:center;gap:12px"><span><span style="display:inline-block;width:8px;height:2px;background:#1c1917;vertical-align:middle;margin-right:4px"></span>Historical avg</span><span><span style="display:inline-block;width:12px;height:8px;background:#fca5a5;border-radius:1px;vertical-align:middle;margin-right:4px"></span>Expensive</span><span><span style="display:inline-block;width:12px;height:8px;background:#bfdbfe;border-radius:1px;vertical-align:middle;margin-right:4px"></span>Fair</span><span><span style="display:inline-block;width:12px;height:8px;background:#bbf7d0;border-radius:1px;vertical-align:middle;margin-right:4px"></span>Cheap</span></div>';
  el.innerHTML=html;
}

function renderJPMValuations(){renderJPMValuationsTo("jpmValuations")}

function renderJPMReturnsTo(elId){
  var el=document.getElementById(elId);
  if(!el)return;
  el.innerHTML="";
  var maxRet=JPM_LTCMA[0].ret;
  JPM_LTCMA.forEach(function(d){
    var row=document.createElement("div");row.className="jpm-ret-row";
    var barW=(d.ret/maxRet)*100;
    row.innerHTML='<span class="jpm-ret-label">'+d.region+'</span><div class="jpm-ret-bar-wrap"><div class="jpm-ret-bar" style="width:'+barW+'%;background:'+d.color+';opacity:.6"></div></div><span class="jpm-ret-val">'+d.ret.toFixed(1)+'%</span>';
    el.appendChild(row);
  });
}

function renderJPMReturns(){renderJPMReturnsTo("jpmReturns")}

function renderJPMPortOverlay(){
  var el=document.getElementById("jpmPortOverlay");
  if(!el)return;
  el.innerHTML="";
  var rows=computeRows(),total=0,regionW={};
  rows.forEach(function(r){
    if(r.valueEUR==null||r.suspect)return;
    total+=r.valueEUR;
    var pos=null;
    for(var i=0;i<PORTFOLIO.length;i++){if(PORTFOLIO[i].ticker===r.ticker&&PORTFOLIO[i].name===r.name){pos=PORTFOLIO[i];break}}
    if(!pos)return;
    var reg=pos.region||"Other";
    regionW[reg]=(regionW[reg]||0)+r.valueEUR;
  });
  var asiaPort=((regionW["Taiwan"]||0)+(regionW["South Korea"]||0));
  var regionGroups=[
    {label:"US",portW:regionW["US"]||0,jpmKey:"US"},
    {label:"Europe",portW:regionW["Europe"]||0,jpmKey:"Europe"},
    {label:"Japan",portW:regionW["Japan"]||0,jpmKey:"Japan"},
    {label:"Asia ex-JP",portW:asiaPort,jpmKey:"Asia ex-JP"},
    {label:"EM/China",portW:0,jpmKey:"China"},
    {label:"Global",portW:regionW["Global"]||0,jpmKey:null}
  ];
  regionGroups.forEach(function(g){
    var pct=total?(g.portW/total)*100:0;
    var pe=g.jpmKey?JPM_PE[g.jpmKey]:null;
    var row=document.createElement("div");row.className="jpm-insight";
    var valTag="",valText="";
    if(pe){
      var ratio=pe.current/pe.avg;
      if(ratio>1.15){valTag='<span class="jpm-port-tag low">expensive</span>';valText=pe.current.toFixed(1)+"x vs "+pe.avg.toFixed(1)+"x avg";}
      else if(ratio<0.9){valTag='<span class="jpm-port-tag high">cheap</span>';valText=pe.current.toFixed(1)+"x vs "+pe.avg.toFixed(1)+"x avg";}
      else{valTag='<span class="jpm-port-tag med">fair value</span>';valText=pe.current.toFixed(1)+"x vs "+pe.avg.toFixed(1)+"x avg";}
    } else {valTag='<span class="jpm-port-tag none">mixed</span>';valText="diversified exposure"}
    var weightTag=pct>0.5?'<b>'+pct.toFixed(1)+'%</b> of portfolio':'<span style="color:#a8a29e">0% — no exposure</span>';
    row.innerHTML='<b>'+g.label+'</b> '+valTag+'<br><span style="font-size:11px;color:#57534e">'+weightTag+' · Fwd P/E: '+valText+'</span>';
    el.appendChild(row);
  });
  var sumDiv=document.createElement("div");sumDiv.className="jpm-insight";
  sumDiv.style.background="#f5f5f4";sumDiv.style.padding="8px";sumDiv.style.marginTop="8px";
  var usW=total?(regionW["US"]||0)/total*100:0;
  var euW=total?(regionW["Europe"]||0)/total*100:0;
  var summaryText="";
  if(usW>50&&euW<20)summaryText="Portfolio is US-heavy. JPM data shows US at 21x P/E (27% above avg) while Europe sits at fair value (14.3x). JPM's long-term return expectations favour non-US markets.";
  else if(euW>usW)summaryText="Portfolio tilts European — aligned with JPM data showing Europe at fair value (14.3x) while the US trades at a premium (21x, 27% above avg). JPM LTCMA expects higher returns from non-US regions over 10-15 years.";
  else summaryText="Portfolio has a mixed regional tilt. JPM data suggests non-US markets (Europe at 14.3x, EM at 12x) offer better value than the US (21x) which trades 27% above its historical average.";
  sumDiv.innerHTML='<span style="font-size:11px;line-height:1.5">'+summaryText+'</span>';
  el.appendChild(sumDiv);
}

function renderJPMUSDetail(){
  var el=document.getElementById("jpmUSDetail");
  if(!el)return;
  el.innerHTML="";
  var grid=document.createElement("div");grid.className="jpm-us-detail";
  for(var key in JPM_US_DETAIL){
    var d=JPM_US_DETAIL[key];
    var ratio=d.current/d.avg;
    var cls=ratio>1.2?"expensive":ratio<0.9?"cheap":"fair";
    var prem=((ratio-1)*100).toFixed(0);
    var premText=prem>0?"+"+prem+"% vs avg":prem+"% vs avg";
    var cell=document.createElement("div");cell.className="jpm-us-cell";
    cell.innerHTML='<div class="jpm-us-cell-label">'+d.label+'</div><div class="jpm-us-cell-val '+cls+'">'+d.current.toFixed(1)+'x</div><div class="jpm-us-cell-avg">Avg: '+d.avg.toFixed(1)+'x ('+premText+')</div>';
    grid.appendChild(cell);
  }
  el.appendChild(grid);
  var obs=document.createElement("div");obs.style.marginTop="16px";
  var insights=[
    {icon:"⚠",text:"S&P 500 top 10 stocks account for ~35-40% of index weight and risk — record concentration levels."},
    {icon:"📈",text:"At current 21x fwd P/E, JPM's scatter plot shows historically compressed 10yr forward returns (3-7% annualised range)."},
    {icon:"🌐",text:"Magnificent Seven still driving earnings growth, but remaining 493 S&P stocks show much more modest growth."},
    {icon:"💰",text:"JPM LTCMA expects US large cap to return ~5.8% annualised over 10-15yrs vs 7-8% for Japan and EM."}
  ];
  insights.forEach(function(ins){
    var d=document.createElement("div");d.className="jpm-insight";
    d.innerHTML='<span style="margin-right:6px">'+ins.icon+'</span><span style="font-size:11px">'+ins.text+'</span>';
    obs.appendChild(d);
  });
  el.appendChild(obs);
}

// =====================================================
// AI PORTFOLIO ANALYSIS ENGINE
// =====================================================
var BENCH_SECTOR={
  "Technology":24,"Financials":16,"Healthcare":11,"Consumer Disc.":11,
  "Industrials":10,"Comm. Services":8,"Consumer Staples":6,"Energy":5,
  "Materials":4,"Real Estate":3,"Utilities":3
};
var BENCH_REGION={"US":63,"Europe":15,"Japan":6,"Emerging Markets":10,"Other":6};

function renderAIAnalysis(){
  var rows=computeRows(),total=0,loaded=0;
  rows.forEach(function(r){if(r.valueEUR!=null&&!r.suspect){total+=r.valueEUR;loaded++}});
  if(loaded<3)return;
  var sectorW={},regionW={},assetW={},posW=[];
  rows.forEach(function(r){
    if(r.valueEUR==null||r.suspect)return;
    var pct=(r.valueEUR/total)*100;
    var pos=null;
    for(var i=0;i<PORTFOLIO.length;i++){if(PORTFOLIO[i].ticker===r.ticker&&PORTFOLIO[i].name===r.name){pos=PORTFOLIO[i];break}}
    if(!pos)return;
    var sec=pos.sector||"Other",reg=pos.region||"Other",at=pos.assetType||"Other";
    sectorW[sec]=(sectorW[sec]||0)+pct;
    regionW[reg]=(regionW[reg]||0)+pct;
    assetW[at]=(assetW[at]||0)+pct;
    posW.push({name:r.name,ticker:r.ticker,pct:pct,plPct:r.plPct,dayChg:r.dayChg,valueEUR:r.valueEUR,sector:sec,region:reg,assetType:at});
  });
  posW.sort(function(a,b){return b.pct-a.pct});

  // Score cards
  var hhi=0;posW.forEach(function(p){hhi+=Math.pow(p.pct/100,2)});
  var divScore=Math.max(0,Math.min(100,Math.round((1-hhi)*110)));
  var top3=posW.slice(0,3).reduce(function(s,p){return s+p.pct},0);
  var concScore=Math.max(0,Math.min(100,Math.round(100-top3*1.2)));
  var covSec=Object.keys(sectorW).length;
  var benchSec=Object.keys(BENCH_SECTOR).length;
  var secCovScore=Math.round((covSec/benchSec)*100);
  var usW=regionW["US"]||0,euW=regionW["Europe"]||0;
  var geoScore=100-Math.round(Math.abs(usW-63)*0.8+Math.abs(euW-15)*0.6);
  geoScore=Math.max(0,Math.min(100,geoScore));
  var overall=Math.round(divScore*0.3+concScore*0.25+secCovScore*0.2+geoScore*0.25);

  var el=document.getElementById("aiScores");
  if(!el)return;
  el.innerHTML="";
  var sc=[{l:"Overall Health",v:overall},{l:"Diversification",v:divScore},{l:"Concentration Risk",v:concScore},{l:"Sector Coverage",v:secCovScore},{l:"Geo Balance",v:geoScore}];
  sc.forEach(function(s){
    var col=s.v>70?"#047857":s.v>45?"#d97706":"#b91c1c";
    var d=document.createElement("div");d.className="ai-score-card";
    d.innerHTML='<div class="ai-score-val" style="color:'+col+'">'+s.v+'</div><div class="ai-score-label">'+s.l+'</div><div class="ai-score-bar"><div class="ai-score-fill" style="width:'+s.v+'%;background:'+col+'"></div></div>';
    el.appendChild(d);
  });

  // Exposure insights
  var exEl=document.getElementById("aiExposure");
  var exI=[];
  for(var sec in BENCH_SECTOR){
    var pw=sectorW[sec]||0,bw=BENCH_SECTOR[sec],diff=pw-bw;
    if(diff>5)exI.push({t:"over",m:"<b>"+sec+"</b> at "+pw.toFixed(1)+"% vs "+bw+"% benchmark — overweight by "+diff.toFixed(1)+"pp"});
    else if(diff<-5)exI.push({t:"under",m:"<b>"+sec+"</b> at "+pw.toFixed(1)+"% vs "+bw+"% benchmark — underweight by "+Math.abs(diff).toFixed(1)+"pp"});
  }
  if(sectorW["Crypto"]&&sectorW["Crypto"]>5)exI.push({t:"info",m:"<b>Crypto</b> at "+sectorW["Crypto"].toFixed(1)+"% — non-correlated but high volatility"});
  if(sectorW["Commodities"]&&sectorW["Commodities"]>3)exI.push({t:"ok",m:"<b>Commodities</b> (Gold) at "+sectorW["Commodities"].toFixed(1)+"% — inflation hedge"});
  if(usW<53)exI.push({t:"under",m:"<b>US exposure</b> at "+usW.toFixed(1)+"% vs ~63% global market cap — significant underweight"});
  if(euW>25)exI.push({t:"over",m:"<b>Europe exposure</b> at "+euW.toFixed(1)+"% vs ~15% global market cap — strong home bias"});
  var asiaT=(regionW["South Korea"]||0)+(regionW["Taiwan"]||0);
  if(asiaT>0)exI.push({t:"info",m:"<b>Asia tech</b> (Taiwan+Korea) at "+asiaT.toFixed(1)+"% — targeted semiconductor exposure"});
  if(exEl){exEl.innerHTML="";if(exI.length){exI.forEach(function(x){var d=document.createElement("div");d.className="ai-insight";d.innerHTML='<span class="ai-tag '+x.t+'">'+x.t+'</span>'+x.m;exEl.appendChild(d)})}else{exEl.innerHTML='<div class="ai-insight">Allocation broadly in line with benchmarks.</div>'}}

  // Risk insights
  var rkEl=document.getElementById("aiRisk");
  var rkI=[];
  if(top3>40)rkI.push({t:"warn",m:"Top 3 holdings = <b>"+top3.toFixed(1)+"%</b> — high concentration"});
  posW.forEach(function(p){if(p.pct>15)rkI.push({t:"warn",m:"<b>"+p.name+"</b> at "+p.pct.toFixed(1)+"% — single position above 15%"})});
  var ssPct=assetW["Equity"]||0;
  if(ssPct>60)rkI.push({t:"info",m:"Individual stocks = <b>"+ssPct.toFixed(1)+"%</b> — higher volatility than pure ETF"});
  var losers=posW.filter(function(p){return p.plPct!=null&&p.plPct<-20});
  if(losers.length)rkI.push({t:"warn",m:losers.length+" position(s) down >20%: "+losers.map(function(p){return"<b>"+p.name+"</b> ("+p.plPct.toFixed(1)+"%)"}).join(", ")});
  if((assetW["Bond"]||0)<5)rkI.push({t:"info",m:"Fixed income at <b>"+(assetW["Bond"]||0).toFixed(1)+"%</b> — low defensive buffer"});
  if(rkEl){rkEl.innerHTML="";if(rkI.length){rkI.forEach(function(x){var d=document.createElement("div");d.className="ai-insight";d.innerHTML='<span class="ai-tag '+x.t+'">'+x.t+'</span>'+x.m;rkEl.appendChild(d)})}else{rkEl.innerHTML='<div class="ai-insight">No major risk flags.</div>'}}

  // Strategic observations
  var stEl=document.getElementById("aiStrategy");
  var stI=[];
  var etfPct=assetW["ETF"]||0;
  if(etfPct>0&&etfPct<30)stI.push({t:"info",m:"ETF allocation <b>"+etfPct.toFixed(1)+"%</b> — portfolio leans stock-picking."});
  var techT=sectorW["Technology"]||0;
  if(techT>25)stI.push({t:"info",m:"<b>Tech-heavy</b> at "+techT.toFixed(1)+"% — positioned for AI/semi growth but exposed to rotation."});
  var semiNames=["ASML","TSMC","Applied Materials","Samsung Electronics"];
  var semiPct=posW.filter(function(p){return semiNames.indexOf(p.name)>=0}).reduce(function(s,p){return s+p.pct},0);
  if(semiPct>8)stI.push({t:"info",m:"<b>Semiconductor chain</b> ~"+semiPct.toFixed(1)+"% (ASML, TSMC, AMAT, Samsung) — AI capex play but correlated."});
  if(stEl){stEl.innerHTML="";stI.forEach(function(x){var d=document.createElement("div");d.className="ai-insight";d.innerHTML='<span class="ai-tag '+x.t+'">'+x.t+'</span>'+x.m;stEl.appendChild(d)})}

  // Gaps and Opportunities
  var gpEl=document.getElementById("aiGaps");
  var gpI=[];
  var miss=[];
  for(var s in BENCH_SECTOR){if(!sectorW[s]||sectorW[s]<1)miss.push(s)}
  if(miss.length)gpI.push({t:"under",m:"<b>Missing/minimal sectors:</b> "+miss.join(", ")});
  if(!regionW["Japan"]||regionW["Japan"]<3)gpI.push({t:"info",m:"<b>Japan</b> underweight — 3rd largest equity market."});
  if(!sectorW["Consumer Staples"]||sectorW["Consumer Staples"]<2)gpI.push({t:"info",m:"<b>Consumer Staples</b> absent — defensive recession sector."});
  if(!sectorW["Utilities"]||sectorW["Utilities"]<1)gpI.push({t:"info",m:"<b>Utilities</b> absent — low-beta income sector."});
  if((assetW["Bond"]||0)<10)gpI.push({t:"info",m:"<b>Fixed income</b> minimal — consider bond ETFs."});
  if(gpEl){gpEl.innerHTML="";if(gpI.length){gpI.forEach(function(x){var d=document.createElement("div");d.className="ai-insight";d.innerHTML='<span class="ai-tag '+x.t+'">'+x.t+'</span>'+x.m;gpEl.appendChild(d)})}else{gpEl.innerHTML='<div class="ai-insight">No significant gaps detected.</div>'}}

  // Position-level signals
  var ptEl=document.getElementById("aiPositions");
  if(!ptEl)return;
  ptEl.innerHTML="";
  posW.forEach(function(p){
    var sig="HOLD",cls="hold",rat=[];
    if(p.pct>15){sig="TRIM";cls="trim";rat.push("Very large position — consider trimming")}
    else if(p.pct>10)rat.push("Significant weight — monitor closely");
    if(p.plPct!=null){
      if(p.plPct<-30){sig="REVIEW";cls="review";rat.push("Down "+Math.abs(p.plPct).toFixed(0)+"% — reassess thesis")}
      else if(p.plPct<-15)rat.push("Down "+Math.abs(p.plPct).toFixed(0)+"% — check thesis");
      else if(p.plPct>80)rat.push("Up "+p.plPct.toFixed(0)+"% — consider locking gains");
      else if(p.plPct>50&&p.pct>8){sig="TRIM";cls="trim";rat.push("Strong gains at large weight — partial profits")}
    }
    if(p.sector==="Crypto")rat.push("Highly volatile — size to risk tolerance");
    if(p.assetType==="ETF")rat.push("Broad market ETF — core diversification");
    if(p.assetType==="Commodity")rat.push("Gold hedge — weight based on macro outlook");
    if(p.assetType==="Bond")rat.push("Fixed income — income and stability");
    if(sig==="HOLD"&&p.plPct!=null&&p.plPct<-10&&p.pct<5){sig="CONSIDER";cls="buy";rat.push("Small position at loss — opportunity to average down")}
    if(!rat.length)rat.push("Within normal parameters");
    var tr=document.createElement("tr");
    tr.innerHTML='<td><div style="font-weight:500">'+p.name+'</div><div style="font-family:JetBrains Mono;font-size:10px;color:#78716c">'+p.ticker+'</div></td>'
      +'<td><span class="ai-signal '+cls+'">'+sig+'</span></td>'
      +'<td>'+p.pct.toFixed(1)+'%</td>'
      +'<td class="'+(p.plPct>=0?"g":"r")+'">'+fp(p.plPct)+'</td>'
      +'<td style="text-align:left;padding-left:12px"><div class="ai-rationale">'+rat.join(". ")+'.</div></td>';
    ptEl.appendChild(tr);
  });
}

// =====================================================
// VIEW 3: MARKET ANALYST
// =====================================================
var INDEX_NAMES={
  "^GSPC":"S&P 500","^STOXX":"STOXX 600","^IXIC":"Nasdaq Composite",
  "^FTSE":"FTSE 100","^N225":"Nikkei 225","^HSI":"Hang Seng",
  "000001.SS":"Shanghai Comp.","^GDAXI":"DAX 40"
};
var CURRENCY_NAMES={
  "EURUSD=X":"EUR/USD","GBPUSD=X":"GBP/USD","USDCNY=X":"USD/CNY","USDJPY=X":"USD/JPY"
};
var COMMODITY_NAMES={
  "GC=F":"Gold","CL=F":"WTI Crude Oil","BZ=F":"Brent Crude","^TNX":"10Y US Treasury"
};

function renderMarketView(){
  renderMarketCards();
  renderMarketIndices();
  renderMarketCurrencies();
  renderMarketCommodities();
  renderCentralBanks();
  renderJPMValuationsTo("mktJpmValuations");
  renderJPMReturnsTo("mktJpmReturns");
  renderPortfolioInsights();
}

function renderMarketCards(){
  var cards=[
    {sym:"^GSPC",valId:"mktSP500",chgId:"mktSP500chg"},
    {sym:"^STOXX",valId:"mktSTOXX",chgId:"mktSTOXXchg"},
    {sym:"^IXIC",valId:"mktNASDAQ",chgId:"mktNASDAQchg"},
    {sym:"EEM",valId:"mktEM",chgId:"mktEMchg"}
  ];
  cards.forEach(function(c){
    var q=marketQuotes[c.sym];
    var ve=document.getElementById(c.valId);
    var ce=document.getElementById(c.chgId);
    if(!q){ve.textContent="--";ce.textContent="";return}
    ve.textContent=fn(q.regularMarketPrice,q.regularMarketPrice>1000?0:2);
    var chgPct=q.regularMarketChangePercent;
    var chgVal=q.regularMarketChange;
    var up=(chgPct||0)>=0;
    ce.innerHTML='<span class="'+(up?"g":"r")+'">'+(up?"+":"")+fn(chgVal,2)+' ('+fp(chgPct)+')</span>';
  });
}

function renderMarketIndices(){
  var tb=document.getElementById("mktIndicesBody");if(!tb)return;
  tb.innerHTML="";
  MARKET_INDICES.forEach(function(sym){
    var q=marketQuotes[sym];
    var tr=document.createElement("tr");
    if(!q){
      tr.innerHTML='<td style="padding-left:12px">'+(INDEX_NAMES[sym]||sym)+'</td><td class="mc">—</td><td class="mc">—</td><td class="mc">—</td><td class="mc" style="padding-right:12px">—</td>';
      tb.appendChild(tr);return;
    }
    var dayPct=q.regularMarketChangePercent;
    var fiveDPct=q._5dChg!=null?q._5dChg:null;
    var ytdPct=q._ytdChg!=null?q._ytdChg:null;
    var du=(dayPct||0)>=0;
    var fu=(fiveDPct||0)>=0;
    var yu=(ytdPct||0)>=0;
    tr.innerHTML='<td style="padding-left:12px"><div class="pn">'+(INDEX_NAMES[sym]||sym)+'</div><div class="pm">'+sym+'</div></td>'
      +'<td class="mc">'+fn(q.regularMarketPrice,q.regularMarketPrice>1000?0:2)+'</td>'
      +'<td class="mc '+(du?"g":"r")+'" style="font-size:11px">'+fp(dayPct)+'</td>'
      +'<td class="mc '+(fu?"g":"r")+'" style="font-size:11px">'+(fiveDPct!=null?fp(fiveDPct):"—")+'</td>'
      +'<td class="mc '+(yu?"g":"r")+'" style="font-size:11px;padding-right:12px">'+(ytdPct!=null?fp(ytdPct):"—")+'</td>';
    tb.appendChild(tr);
  });
}

function renderMarketCurrencies(){
  var tb=document.getElementById("mktCurrBody");if(!tb)return;
  tb.innerHTML="";
  MARKET_CURRENCIES.forEach(function(sym){
    var q=marketQuotes[sym];
    var tr=document.createElement("tr");
    if(!q){tr.innerHTML='<td style="padding-left:12px">'+(CURRENCY_NAMES[sym]||sym)+'</td><td class="mc">—</td><td class="mc" style="padding-right:12px">—</td>';tb.appendChild(tr);return}
    var du=(q.regularMarketChangePercent||0)>=0;
    tr.innerHTML='<td style="padding-left:12px"><div class="pn">'+(CURRENCY_NAMES[sym]||sym)+'</div><div class="pm">'+sym+'</div></td>'
      +'<td class="mc">'+fn(q.regularMarketPrice,4)+'</td>'
      +'<td class="mc '+(du?"g":"r")+'" style="font-size:11px;padding-right:12px">'+fp(q.regularMarketChangePercent)+'</td>';
    tb.appendChild(tr);
  });
}

function renderMarketCommodities(){
  var tb=document.getElementById("mktCommodBody");if(!tb)return;
  tb.innerHTML="";
  MARKET_COMMODITIES.forEach(function(sym){
    var q=marketQuotes[sym];
    var tr=document.createElement("tr");
    if(!q){tr.innerHTML='<td style="padding-left:12px">'+(COMMODITY_NAMES[sym]||sym)+'</td><td class="mc">—</td><td class="mc" style="padding-right:12px">—</td>';tb.appendChild(tr);return}
    var du=(q.regularMarketChangePercent||0)>=0;
    var priceDecimals=sym==="^TNX"?3:2;
    tr.innerHTML='<td style="padding-left:12px"><div class="pn">'+(COMMODITY_NAMES[sym]||sym)+'</div><div class="pm">'+sym+'</div></td>'
      +'<td class="mc">'+(sym==="^TNX"?fn(q.regularMarketPrice,3)+"%":"$"+fn(q.regularMarketPrice,2))+'</td>'
      +'<td class="mc '+(du?"g":"r")+'" style="font-size:11px;padding-right:12px">'+fp(q.regularMarketChangePercent)+'</td>';
    tb.appendChild(tr);
  });
}

function renderMarketHeadlines(articles){
  var el=document.getElementById("mktHeadlines");if(!el)return;
  if(!articles||!articles.length){el.innerHTML='<div class="lt" style="text-align:center;padding:16px">No headlines available</div>';return}
  el.innerHTML="";
  articles.forEach(function(n){
    var d=document.createElement("div");d.className="mkt-headline-item";
    var ds=n.providerPublishTime?new Date(n.providerPublishTime*1000).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"";
    d.innerHTML='<a href="'+(n.link||"#")+'" target="_blank"><div class="mkt-headline-title">'+(n.title||"")+'</div><div class="mkt-headline-meta">'+(n.publisher||"")+(ds?" · "+ds:"")+'</div></a>';
    el.appendChild(d);
  });
}

function renderCentralBanks(){
  var el=document.getElementById("mktCentralBanks");if(!el)return;
  el.innerHTML="";
  JPM_CENTRAL_BANKS.forEach(function(cb){
    var cell=document.createElement("div");cell.className="mkt-rate-cell";
    cell.innerHTML='<div class="mkt-rate-bank">'+cb.name+'</div><div class="mkt-rate-val">'+cb.rate+'</div><div class="mkt-rate-sub">'+cb.expect+'</div>';
    el.appendChild(cell);
  });
}

function renderPortfolioInsights(){
  var el=document.getElementById("mktPortfolioInsights");if(!el)return;
  var mq=marketQuotes;
  if(!mq["^GSPC"]&&!mq["^STOXX"]){el.innerHTML='<div class="lt" style="text-align:center;padding:16px">Waiting for market data...</div>';return}
  el.innerHTML="";

  var rows=computeRows(),total=0,regionW={},sectorW={};
  rows.forEach(function(r){
    if(r.valueEUR==null||r.suspect)return;
    total+=r.valueEUR;
    var pos=null;
    for(var i=0;i<PORTFOLIO.length;i++){if(PORTFOLIO[i].ticker===r.ticker&&PORTFOLIO[i].name===r.name){pos=PORTFOLIO[i];break}}
    if(!pos)return;
    regionW[pos.region]=(regionW[pos.region]||0)+r.valueEUR;
    sectorW[pos.sector]=(sectorW[pos.sector]||0)+r.valueEUR;
  });

  var insights=[];

  // 1. USD strength/weakness impact
  var eurusd=mq["EURUSD=X"];
  if(eurusd&&eurusd.regularMarketChangePercent!=null){
    var eurChg=eurusd.regularMarketChangePercent;
    var usHoldings=PORTFOLIO.filter(function(p){return p.region==="US"}).map(function(p){return p.name});
    if(eurChg>0.3){
      insights.push({icon:"💱",text:"<b>EUR strengthening</b> (+"+eurChg.toFixed(2)+"% today) — this creates headwinds for your USD-denominated holdings ("+usHoldings.join(", ")+"). A stronger EUR reduces the EUR value of US positions."});
    } else if(eurChg<-0.3){
      insights.push({icon:"💱",text:"<b>EUR weakening</b> ("+eurChg.toFixed(2)+"% today) — tailwind for your USD-denominated positions ("+usHoldings.join(", ")+"). A weaker EUR boosts the EUR value of US holdings."});
    }
  }

  // 2. Gold movement and SGLN.L
  var gold=mq["GC=F"];
  if(gold&&gold.regularMarketChangePercent!=null){
    var goldChg=gold.regularMarketChangePercent;
    if(Math.abs(goldChg)>0.5){
      var goldDir=goldChg>0?"rising":"falling";
      insights.push({icon:"🥇",text:"<b>Gold "+goldDir+"</b> ("+fp(goldChg)+" today at $"+fn(gold.regularMarketPrice,0)+") — directly impacts your SGLN.L (iShares Physical Gold ETC) position"+(goldChg>0?". Gold strength often signals risk-off sentiment or inflation concerns.":". Gold weakness may indicate improving risk appetite.")});
    }
  }

  // 3. Europe vs US performance
  var sp500=mq["^GSPC"],stoxx=mq["^STOXX"];
  if(sp500&&stoxx&&sp500.regularMarketChangePercent!=null&&stoxx.regularMarketChangePercent!=null){
    var spChg=sp500.regularMarketChangePercent,stChg=stoxx.regularMarketChangePercent;
    var euPct=total?(regionW["Europe"]||0)/total*100:0;
    var usPct=total?(regionW["US"]||0)/total*100:0;
    if(stChg>spChg+0.5){
      insights.push({icon:"🇪🇺",text:"<b>Europe outperforming US</b> today (STOXX "+fp(stChg)+" vs S&P "+fp(spChg)+") — favourable for your portfolio which has "+euPct.toFixed(0)+"% European exposure (ASML, DEME, Shell, VGP, Sofina, Novo Nordisk, Umicore, EU Financials ETF)."});
    } else if(spChg>stChg+0.5){
      insights.push({icon:"🇺🇸",text:"<b>US outperforming Europe</b> today (S&P "+fp(spChg)+" vs STOXX "+fp(stChg)+") — your "+usPct.toFixed(0)+"% US allocation (Garmin, BRK, Apple, AMAT, Uber, ResMed, TSMC, VUSA) benefits."});
    }
  }

  // 4. Tech sector pressure
  var nasdaq=mq["^IXIC"];
  if(nasdaq&&nasdaq.regularMarketChangePercent!=null){
    var nqChg=nasdaq.regularMarketChangePercent;
    var techNames=["ASML","TSMC","Applied Materials","Apple","Samsung Electronics","Softbank Group"];
    var techPct=total?(sectorW["Technology"]||0)/total*100:0;
    if(nqChg<-1){
      insights.push({icon:"⚠️",text:"<b>Tech under pressure</b> (Nasdaq "+fp(nqChg)+") — your portfolio has ~"+techPct.toFixed(0)+"% tech exposure across "+techNames.join(", ")+". Semiconductor names (ASML, TSMC, AMAT) may face elevated selling pressure."});
    } else if(nqChg>1){
      insights.push({icon:"🚀",text:"<b>Tech rallying</b> (Nasdaq "+fp(nqChg)+") — positive for your ~"+techPct.toFixed(0)+"% tech allocation. Your semiconductor chain (ASML, TSMC, AMAT, Samsung) is well-positioned for tech momentum."});
    }
  }

  // 5. Oil prices and Shell
  var oil=mq["CL=F"];
  if(oil&&oil.regularMarketChangePercent!=null){
    var oilChg=oil.regularMarketChangePercent;
    if(Math.abs(oilChg)>1){
      insights.push({icon:"🛢️",text:"<b>Oil "+(oilChg>0?"surging":"dropping")+"</b> ("+fp(oilChg)+" at $"+fn(oil.regularMarketPrice,2)+"/bbl) — "+(oilChg>0?"positive":"negative")+" for your Shell (SHEL.L) position. Energy sector "+(oilChg>0?"benefits from higher commodity prices.":"faces margin pressure from lower prices.")});
    }
  }

  // 6. Japan/Asia market
  var nikkei=mq["^N225"];
  if(nikkei&&nikkei.regularMarketChangePercent!=null){
    var nkChg=nikkei.regularMarketChangePercent;
    if(Math.abs(nkChg)>1){
      insights.push({icon:"🇯🇵",text:"<b>Japanese market "+(nkChg>0?"up":"down")+"</b> (Nikkei "+fp(nkChg)+") — your SoftBank Group (9984.T) position is directly exposed. "+(nkChg<-1?"Consider if this creates a buying opportunity.":"Momentum is positive for your Japan exposure.")});
    }
  }

  // 7. Bond yields
  var tnx=mq["^TNX"];
  if(tnx&&tnx.regularMarketPrice!=null){
    var yield10=tnx.regularMarketPrice;
    if(yield10>4.5){
      insights.push({icon:"📉",text:"<b>10Y Treasury yield elevated</b> at "+yield10.toFixed(2)+"% — high rates pressure growth stocks (your tech names) and increase the attractiveness of bonds vs equities. Your low fixed income allocation ("+(total?(regionW["Bond"]||0)/total*100:0).toFixed(1)+"%) means limited exposure to rising bond prices."});
    } else if(yield10<3.5){
      insights.push({icon:"📈",text:"<b>10Y Treasury yield low</b> at "+yield10.toFixed(2)+"% — supportive for growth and tech valuations. Positive backdrop for your semiconductor and technology positions."});
    }
  }

  // 8. Emerging Markets
  var eem=mq["EEM"];
  if(eem&&eem.regularMarketChangePercent!=null){
    var emChg=eem.regularMarketChangePercent;
    if(Math.abs(emChg)>1){
      insights.push({icon:"🌍",text:"<b>Emerging markets "+(emChg>0?"rallying":"selling off")+"</b> (EEM "+fp(emChg)+") — your Samsung (Korea) and TSMC (Taiwan) positions have EM exposure. "+(emChg>0?"Broad EM strength supports these names.":"EM weakness may weigh on Asian tech.")});
    }
  }

  // Always add a portfolio context summary
  var eurusdRate=eurusd?eurusd.regularMarketPrice:null;
  insights.push({icon:"📊",text:"<b>Portfolio context:</b> Your IG99 portfolio has significant European tilt, heavy semiconductor/tech exposure, and gold as an inflation hedge. Key risks are EUR/USD moves (your US positions are ~"+(total?(regionW["US"]||0)/total*100:0).toFixed(0)+"%), tech sector rotation, and single-name concentration. JPM data suggests non-US markets offer better long-term value."});

  insights.slice(0,8).forEach(function(ins){
    var d=document.createElement("div");d.className="mkt-insight-item";
    d.innerHTML='<span class="mkt-insight-icon">'+ins.icon+'</span>'+ins.text;
    el.appendChild(d);
  });
}

// --- Select position ---
function selectPosition(tk){
  selTk=tk;curRange="1mo";
  var rb1=document.getElementById("rangeBtns");
  if(rb1)rb1.querySelectorAll(".rn").forEach(function(b){b.classList.toggle("act",b.textContent==="1M")});
  showNewsLoading();
  renderAll();
  fetchChart(tk,curRange);
  rAbout(tk);fetchPN(tk);
  if(window.innerWidth<=640){var det=document.getElementById("detName");if(det)setTimeout(function(){det.scrollIntoView({behavior:"smooth",block:"start"})},100);}
}

// --- Main refresh ---
function doRefresh(){
  si("Loading data...");
  Promise.all([fetchFx(),fetchQuotes(),fetchMarketData()]).then(function(){
    var n=Object.keys(quotes).length;
    var nfx=Object.keys(fxLive).length;
    var tickered=PORTFOLIO.filter(function(p){return!!p.ticker});
    var miss=tickered.filter(function(p){return!quotes[p.ticker]});
    hideInfo();saveCache();
    if(miss.length===0)hideError();
    else if(n>0){
      var missNames=miss.map(function(p){return p.name}).join(", ");
      var msg="Loaded "+n+"/"+tickered.length+" positions.";
      if(missNames)msg+=" Missing: "+missNames+".";
      if(nfx===0)msg+=" FX using fallback rates.";
      showError(msg);
    } else {
      showError("Could not load data. Check internet and try again.");
    }
    setStatus(n>0);
    if(n>0)document.getElementById("lastUpdate").textContent=new Date().toLocaleTimeString();
    showNewsLoading();
    renderAll();
    // Save portfolio value history for the summary chart
    if(n>0){
      var tv=0;
      computeRows().forEach(function(r){if(r.valueEUR!=null)tv+=r.valueEUR});
      if(tv>0)savePortfolioHistory(tv);
      if(currentTab==="summary")renderPortfolioValueChart();
    }
    if(currentTab==="portfolio"){
      fetchChart(selTk,curRange);
    }
    if(currentTab==="market"){
      renderMarketView();
      fetchMarketHeadlines();
    }
    rAbout(selTk);fetchPN(selTk);
    if(n>0){usingSnapshot=false;var sb=document.getElementById("snapshotBanner");if(sb)sb.style.display="none";}
    showSnapshotBanner();
    // Enrich quotes with 52w/mcap/PE (async — re-renders when done)
    if(n>0){
      var allTickers=PORTFOLIO.filter(function(p){return!!p.ticker}).map(function(p){return p.ticker});
      enrichQuotes(allTickers).then(function(){
        saveCache();
        renderAll();
      });
    }
    // Fetch 5d%/YTD% for market indices via Yahoo (no Finnhub rate limit concern)
    fetchMarketYTD().then(function(){
      if(currentTab==="market")renderMarketIndices();
    });
  });
}

// --- Init ---
loadCache();
if(Object.keys(quotes).length>0){renderAll();si("Showing cached data, refreshing...");showSnapshotBanner()}
initRangeButtons();
initSumRangeButtons();
doRefresh();
setInterval(doRefresh,60000);


// =====================================================
// CLUB FINANCIALS VIEW
// =====================================================

var finDivYearChart=null, finContribYearChart=null, finTaxYearChart=null;

function renderFinancialsView(){
  if(typeof BOLERO==="undefined") return;
  var B=BOLERO;

  // --- Capital Overview Cards ---
  var el;
  el=document.getElementById("finNetCapital"); if(el) el.textContent="\u20ac"+fn(B.summary.netCashIn,0);
  el=document.getElementById("finTotalDiv"); if(el) el.textContent="\u20ac"+fn(B.summary.totalDividends,2);
  el=document.getElementById("finDivGrowth"); if(el){
    var years=Object.keys(B.dividendsByYear);
    if(years.length>=2){
      var last=B.dividendsByYear[years[years.length-2]];
      var prev=B.dividendsByYear[years[years.length-3]]||0;
      if(prev>0){
        var growth=((last-prev)/prev*100);
        el.textContent=(growth>=0?"+":"")+growth.toFixed(0)+"% vs prior year";
      } else { el.textContent="Growing year over year"; }
    }
  }
  el=document.getElementById("finTotalTax"); if(el) el.textContent="\u20ac"+fn(B.summary.totalWithholdingTax,2);
  el=document.getElementById("finTotalFees"); if(el) el.textContent="\u20ac"+fn(B.summary.totalFees,0);
  el=document.getElementById("finLastUpdated"); if(el) el.textContent=B.lastUpdated;

  // --- Dividends by Year Chart ---
  renderFinDivYearChart();
  renderFinContribYearChart();
  renderFinTaxYearChart();
  renderDivStockTable();
  renderCostBasisTable();
  renderRealizedPLTable();
  renderCashFlowSummary();
}

function renderFinDivYearChart(){
  if(typeof BOLERO==="undefined") return;
  var cvs=document.getElementById("divYearChart"); if(!cvs) return;
  if(finDivYearChart){finDivYearChart.destroy();finDivYearChart=null}
  var years=Object.keys(BOLERO.dividendsByYear);
  var vals=years.map(function(y){return BOLERO.dividendsByYear[y]});
  var ctx=cvs.getContext("2d");
  finDivYearChart=new Chart(ctx,{
    type:"bar",
    data:{
      labels:years,
      datasets:[{
        label:"Dividends (\u20ac)",
        data:vals,
        backgroundColor:"#047857",
        borderColor:"#065f46",
        borderWidth:1,
        borderRadius:2
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:function(c){return "\u20ac"+c.raw.toFixed(2)}}}},
      scales:{
        y:{beginAtZero:true,ticks:{callback:function(v){return "\u20ac"+v}},grid:{color:"#f5f5f4"}},
        x:{grid:{display:false}}
      }
    }
  });
}

function renderFinContribYearChart(){
  if(typeof BOLERO==="undefined") return;
  var cvs=document.getElementById("contribYearChart"); if(!cvs) return;
  if(finContribYearChart){finContribYearChart.destroy();finContribYearChart=null}
  var years=Object.keys(BOLERO.contributionsByYear);
  var vals=years.map(function(y){return BOLERO.contributionsByYear[y]});
  var ctx=cvs.getContext("2d");
  // Cumulative line on secondary axis
  var cumulative=[];var cum=0;
  vals.forEach(function(v){cum+=v;cumulative.push(Math.round(cum))});
  finContribYearChart=new Chart(ctx,{
    type:"bar",
    data:{
      labels:years,
      datasets:[
        {
          label:"Annual Contribution (\u20ac)",
          data:vals,
          backgroundColor:"#1c1917",
          borderColor:"#1c1917",
          borderWidth:1,
          borderRadius:2,
          yAxisID:"y"
        },
        {
          label:"Cumulative (\u20ac)",
          data:cumulative,
          type:"line",
          borderColor:"#6366f1",
          backgroundColor:"transparent",
          borderWidth:2,
          pointRadius:3,
          pointBackgroundColor:"#6366f1",
          yAxisID:"y1",
          tension:0.3
        }
      ]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:true,position:"bottom",labels:{font:{size:10},boxWidth:12}},tooltip:{callbacks:{label:function(c){return c.dataset.label+": \u20ac"+c.raw.toLocaleString()}}}},
      scales:{
        y:{beginAtZero:true,ticks:{callback:function(v){return "\u20ac"+v.toLocaleString()},font:{size:10}},grid:{color:"#f5f5f4"}},
        y1:{position:"right",beginAtZero:true,ticks:{callback:function(v){return "\u20ac"+(v/1000).toFixed(0)+"k"},font:{size:10}},grid:{display:false}},
        x:{grid:{display:false}}
      }
    }
  });
}

function renderFinTaxYearChart(){
  if(typeof BOLERO==="undefined") return;
  var cvs=document.getElementById("taxYearChart"); if(!cvs) return;
  if(finTaxYearChart){finTaxYearChart.destroy();finTaxYearChart=null}
  var years=Object.keys(BOLERO.taxByYear);
  var vals=years.map(function(y){return BOLERO.taxByYear[y]});
  var ctx=cvs.getContext("2d");
  finTaxYearChart=new Chart(ctx,{
    type:"bar",
    data:{
      labels:years,
      datasets:[{
        label:"Withholding Tax (\u20ac)",
        data:vals,
        backgroundColor:"#b91c1c",
        borderColor:"#991b1b",
        borderWidth:1,
        borderRadius:2
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:function(c){return "\u20ac"+c.raw.toFixed(2)}}}},
      scales:{
        y:{beginAtZero:true,ticks:{callback:function(v){return "\u20ac"+v},font:{size:10}},grid:{color:"#f5f5f4"}},
        x:{grid:{display:false}}
      }
    }
  });
}

function renderDivStockTable(){
  if(typeof BOLERO==="undefined") return;
  var tb=document.getElementById("divStockBody"); if(!tb) return;
  var stocks=Object.keys(BOLERO.dividendsByStock);
  var total=BOLERO.summary.totalDividends;
  var maxVal=BOLERO.dividendsByStock[stocks[0]]||1;
  var html="";
  stocks.forEach(function(s){
    var amt=BOLERO.dividendsByStock[s];
    var pct=(amt/total*100);
    var barW=(amt/maxVal*100);
    html+='<tr><td style="text-align:left;padding-left:12px;font-weight:500">'+s+'</td>'
      +'<td class="mc">\u20ac'+amt.toFixed(2)+'</td>'
      +'<td class="mc">'+pct.toFixed(1)+'%</td>'
      +'<td class="hide-mob" style="min-width:80px"><div class="cf-bar"><div class="cf-bar-fill" style="width:'+barW.toFixed(1)+'%;background:#047857"></div></div></td>'
      +'</tr>';
  });
  tb.innerHTML=html;
}

function renderCostBasisTable(){
  if(typeof BOLERO==="undefined") return;
  var tb=document.getElementById("costBasisBody"); if(!tb) return;
  var buys=BOLERO.buysByStock;
  var sells=BOLERO.sellsByStock;
  var allStocks=Object.keys(buys);
  var html="";
  allStocks.forEach(function(s){
    var b=buys[s]||0;
    var sl=sells[s]||0;
    var net=b-sl;
    html+='<tr><td style="text-align:left;padding-left:12px;font-weight:500">'+s+'</td>'
      +'<td class="mc">\u20ac'+fn(b,0)+'</td>'
      +'<td class="mc">'+(sl>0?'\u20ac'+fn(sl,0):'—')+'</td>'
      +'<td class="mc" style="font-weight:600;color:'+(net>0?'#1c1917':'#047857')+'">\u20ac'+fn(Math.abs(net),0)+(net<=0?' (closed)':'')+'</td>'
      +'</tr>';
  });
  tb.innerHTML=html;
}

function renderRealizedPLTable(){
  if(typeof BOLERO==="undefined") return;
  var tb=document.getElementById("realizedPLBody"); if(!tb) return;
  var rpl=BOLERO.realizedPL;
  var stocks=Object.keys(rpl);
  var totalPL=0;
  var wins=0,losses=0;
  var html="";
  stocks.forEach(function(s){
    var d=rpl[s];
    totalPL+=d.pl;
    if(d.pl>=0) wins++; else losses++;
    var plColor=d.pl>=0?"#047857":"#b91c1c";
    var plSign=d.pl>=0?"+":"";
    html+='<tr><td style="text-align:left;padding-left:12px;font-weight:500">'+s+'</td>'
      +'<td class="mc">\u20ac'+fn(d.bought,0)+'</td>'
      +'<td class="mc">\u20ac'+fn(d.sold,0)+'</td>'
      +'<td class="mc" style="font-weight:600;color:'+plColor+'">'+plSign+'\u20ac'+fn(Math.abs(d.pl),0)+'</td>'
      +'</tr>';
  });
  tb.innerHTML=html;
  var sumEl=document.getElementById("realizedPLSummary");
  if(sumEl){
    var plColor=totalPL>=0?"#047857":"#b91c1c";
    sumEl.innerHTML='<span style="font-weight:600;color:'+plColor+'">'+(totalPL>=0?"+":"")+'\u20ac'+fn(Math.abs(totalPL),0)+' total realized P/L</span>'
      +' &middot; '+wins+' winners, '+losses+' losers out of '+(wins+losses)+' closed positions';
  }
}

function renderCashFlowSummary(){
  if(typeof BOLERO==="undefined") return;
  var el=document.getElementById("cashFlowSummary"); if(!el) return;
  var B=BOLERO.summary;
  var items=[
    {label:"Total Deposited", val:B.totalDeposited, color:"#047857", sign:"+"},
    {label:"Total Withdrawn", val:Math.abs(B.totalWithdrawn), color:"#b91c1c", sign:"-"},
    {label:"Total Bought (stocks)", val:B.totalBought, color:"#1c1917", sign:""},
    {label:"Total Sold (stocks)", val:B.totalSold, color:"#047857", sign:"+"},
    {label:"Total Dividends", val:B.totalDividends, color:"#047857", sign:"+"},
    {label:"Withholding Tax", val:B.totalWithholdingTax, color:"#b91c1c", sign:"-"},
    {label:"Broker Fees", val:B.totalFees, color:"#b91c1c", sign:"-"},
    {label:"Corp Actions (net)", val:B.totalCorpActions, color:"#78716c", sign:"+"}
  ];
  var html="";
  items.forEach(function(it){
    html+='<div class="cf-flow-row"><span class="cf-flow-label">'+it.label+'</span>'
      +'<span class="cf-flow-val" style="color:'+it.color+'">'+it.sign+'\u20ac'+fn(it.val,0)+'</span></div>';
  });
  // Add estimated cash balance
  var estCash=B.totalDeposited+B.totalWithdrawn-B.totalBought+B.totalSold+B.totalDividends-B.totalWithholdingTax-B.totalFees+B.totalCorpActions;
  html+='<div class="cf-flow-row" style="border-top:2px solid #1c1917;margin-top:8px;padding-top:12px;font-weight:600">'
    +'<span class="cf-flow-label">Estimated Cash Balance</span>'
    +'<span class="cf-flow-val" style="color:#1c1917">\u20ac'+fn(estCash,0)+'</span></div>';
  el.innerHTML=html;
}
