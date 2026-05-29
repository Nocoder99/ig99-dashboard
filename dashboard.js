var PORTFOLIO = [
  {ticker:"GRMN",name:"Garmin",shares:20,avgCostEUR:123.0,ccy:"USD",sector:"Technology",region:"US",assetType:"Equity",
    desc:"Garmin designs and manufactures GPS navigation and wearable technology, fitness trackers, and smartwatches. The company also serves aviation, marine, and outdoor markets with specialized navigation and communication devices. Founded in 1989, it is headquartered in Olathe, Kansas."},
  {ticker:"DEME.BR",name:"DEME Group",shares:21,avgCostEUR:103.3,ccy:"EUR",sector:"Industrials",region:"Europe",assetType:"Equity",
    desc:"DEME is a Belgian marine engineering group specializing in dredging, offshore energy, and complex infrastructure projects. They are a key player in offshore wind farm installation across Europe and beyond. The company also focuses on environmental remediation and deep-sea mineral harvesting."},
  {ticker:"VGP.BR",name:"VGP",shares:40,avgCostEUR:90.9,ccy:"EUR",sector:"Real Estate",region:"Europe",assetType:"Equity",
    desc:"VGP is a Belgian real estate developer and manager focused on logistics and semi-industrial properties across Europe. The company develops, builds, and manages high-quality warehouses and distribution centers in key logistics hubs. VGP operates in over 15 European countries."},
  {ticker:"SGLN.L",name:"iShares Physical Gold ETC",shares:45,avgCostEUR:75.0,ccy:"USD",sector:"Commodities",region:"Global",assetType:"Commodity",
    desc:"iShares Physical Gold ETC is an exchange-traded commodity that tracks the price of gold bullion. Each share is backed by physical gold bars held in secure vaults by JPMorgan Chase in London. It provides investors a simple way to gain exposure to the gold spot price."},
  {ticker:"ASML.AS",name:"ASML",shares:3,avgCostEUR:582.0,ccy:"EUR",sector:"Technology",region:"Europe",assetType:"Equity",
    desc:"ASML is a Dutch semiconductor equipment manufacturer and the sole supplier of extreme ultraviolet (EUV) lithography machines used to produce the world's most advanced chips. Their technology is essential for chipmakers like TSMC, Samsung, and Intel. ASML is one of Europe's most valuable technology companies."},
  {ticker:"",name:"Rabobank Certificate",shares:2900,avgCostEUR:1.1,ccy:"EUR",manualPrice:1.126,sector:"Financials",region:"Europe",assetType:"Bond",
    desc:"Rabobank Certificates are perpetual subordinated instruments issued by Rabobank, a Dutch cooperative bank focused on food and agriculture financing. They pay a variable coupon and trade on Euronext Amsterdam. Rabobank is one of the Netherlands' largest financial institutions."},
  {ticker:"VHYL.AS",name:"Vanguard FTSE All-World High Div Yield",shares:34,avgCostEUR:76.2,ccy:"EUR",sector:"Diversified ETF",region:"Global",assetType:"ETF",
    desc:"This Vanguard ETF tracks the FTSE All-World High Dividend Yield Index, providing broad exposure to global stocks with above-average dividend yields. It holds over 1,800 stocks across developed and emerging markets. The fund offers diversified income with a low expense ratio."},
  {ticker:"SOF.BR",name:"Sofina",shares:12,avgCostEUR:257.0,ccy:"EUR",sector:"Financials",region:"Europe",assetType:"Equity",
    desc:"Sofina is a Belgian investment holding company backed by the Boel family, investing in growth companies across technology, healthcare, education, and consumer sectors. It takes long-term minority stakes in both private and listed companies worldwide. Notable investments have included ByteDance and Flixbus."},
  {ticker:"IB1T.DE",name:"iShares Bitcoin ETP",shares:463,avgCostEUR:7.3,ccy:"EUR",sector:"Crypto",region:"Global",assetType:"Crypto",
    desc:"iShares Bitcoin ETP is a physically-backed exchange-traded product that tracks the price of Bitcoin. Managed by BlackRock, it allows investors to gain Bitcoin exposure through a regulated, exchange-traded instrument on Xetra. Each unit represents a fractional amount of Bitcoin held in secure custody."},
  {ticker:"005930.KS",name:"Samsung Electronics",shares:1,avgCostEUR:2866.5,ccy:"KRW",sector:"Technology",region:"South Korea",assetType:"Equity",
    desc:"Samsung Electronics is a South Korean conglomerate and one of the world's largest technology companies. It leads global markets in memory chips (DRAM and NAND), smartphones, displays, and consumer electronics. Samsung is also a major player in semiconductor foundry services competing with TSMC."},
  {ticker:"ESIF.DE",name:"iShares EU Financials ETF",shares:192,avgCostEUR:9.0,ccy:"EUR",sector:"Financials",region:"Europe",assetType:"ETF",
    desc:"This iShares ETF tracks European financial sector companies, providing diversified exposure to banks, insurance firms, and financial services across the EU. Major holdings include HSBC, Allianz, BNP Paribas, and UBS. It offers a cost-efficient way to invest in Europe's financial sector."},
  {ticker:"BRK-B",name:"Berkshire Hathaway B",shares:6,avgCostEUR:410.4,ccy:"USD",sector:"Financials",region:"US",assetType:"Equity",
    desc:"Berkshire Hathaway is Warren Buffett's conglomerate, owning businesses across insurance (GEICO), railroads (BNSF), energy, and manufacturing. It also holds a massive equity portfolio with positions in Apple, Coca-Cola, and American Express. The company is known for its long-term value investing philosophy."},
  {ticker:"TSM",name:"TSMC",shares:8,avgCostEUR:136.9,ccy:"USD",sector:"Technology",region:"Taiwan",assetType:"Equity",
    desc:"Taiwan Semiconductor Manufacturing Company is the world's largest contract chipmaker, producing processors for Apple, Nvidia, AMD, and Qualcomm. TSMC leads the industry in advanced chip manufacturing with cutting-edge 3nm and 5nm process technology. The company is critical to the global semiconductor supply chain."},
  {ticker:"AMAT",name:"Applied Materials",shares:8,avgCostEUR:53.5,ccy:"USD",sector:"Technology",region:"US",assetType:"Equity",
    desc:"Applied Materials is the world's largest supplier of semiconductor manufacturing equipment, providing tools for chip fabrication, display production, and solar manufacturing. Their machines are used by every major chipmaker for depositing, etching, and inspecting chip layers."},
  {ticker:"UBER",name:"Uber",shares:38,avgCostEUR:70.8,ccy:"USD",sector:"Consumer Disc.",region:"US",assetType:"Equity",
    desc:"Uber operates the world's largest ride-hailing platform and a rapidly growing food delivery service (Uber Eats). The company connects millions of riders with drivers and restaurants with consumers across 70+ countries. Uber has expanded into freight logistics and autonomous vehicle partnerships."},
  {ticker:"SHEL.L",name:"Shell",shares:57,avgCostEUR:23.4,ccy:"GBX",sector:"Energy",region:"Europe",assetType:"Equity",
    desc:"Shell is one of the world's largest integrated energy companies, operating across oil and gas exploration, refining, chemicals, and renewable energy. Headquartered in London, it is a major supplier of LNG globally. Shell is gradually transitioning its portfolio toward lower-carbon energy solutions."},
  {ticker:"VUSA.AS",name:"Vanguard S&P 500 ETF",shares:19,avgCostEUR:57.5,ccy:"EUR",sector:"Diversified ETF",region:"US",assetType:"ETF",
    desc:"This Vanguard ETF tracks the S&P 500 index, providing exposure to 500 of the largest US companies including Apple, Microsoft, Amazon, and Nvidia. Listed on Euronext Amsterdam, it offers European investors easy access to US equity markets with a low expense ratio."},
  {ticker:"RMD",name:"ResMed",shares:7,avgCostEUR:224.7,ccy:"USD",sector:"Healthcare",region:"US",assetType:"Equity",
    desc:"ResMed is a medical device company specializing in cloud-connected devices for treating sleep apnea, COPD, and other respiratory conditions. Their CPAP machines and digital health solutions serve millions of patients worldwide. The company benefits from growing awareness of sleep disorders."},
  {ticker:"UMI.BR",name:"Umicore",shares:84,avgCostEUR:36.3,ccy:"EUR",sector:"Materials",region:"Europe",assetType:"Equity",
    desc:"Umicore is a Belgian materials technology company focused on catalysis, battery materials for electric vehicles, and precious metals recycling. It supplies cathode materials for EV batteries and automotive emission catalysts. The company is positioned at the intersection of clean mobility and circular economy trends."},
  {ticker:"NOVO-B.CO",name:"Novo Nordisk",shares:42,avgCostEUR:61.5,ccy:"DKK",sector:"Healthcare",region:"Europe",assetType:"Equity",
    desc:"Novo Nordisk is a Danish pharmaceutical company and the global leader in diabetes care and GLP-1 obesity treatments. Their blockbuster drugs Ozempic and Wegovy have driven massive growth in the weight-loss medication market. Novo Nordisk is Europe's most valuable listed company by market capitalization."},
  {ticker:"AAPL",name:"Apple",shares:6,avgCostEUR:106.6,ccy:"USD",sector:"Technology",region:"US",assetType:"Equity",
    desc:"Apple designs and sells consumer electronics, software, and services, including the iPhone, Mac, iPad, and Apple Watch. Its services segment (App Store, iCloud, Apple Music, Apple TV+) is a rapidly growing revenue stream. Apple is the world's most valuable public company with an unmatched ecosystem."},
  {ticker:"9984.T",name:"Softbank Group",shares:92,avgCostEUR:6.8,ccy:"JPY",sector:"Technology",region:"Japan",assetType:"Equity",
    desc:"SoftBank Group is a Japanese investment conglomerate known for its massive Vision Fund, which invests in technology companies worldwide. Key holdings include a major stake in Arm Holdings, the chip design firm powering most smartphones. SoftBank also has significant telecom operations in Japan and investments across AI."}
];

var FALLBACK_FX={EUR:1,USD:0.88,GBP:1.17,GBX:0.0117,DKK:0.134,JPY:0.0061,KRW:0.00065};

var PROXIES=[
  function(u){return "https://corsproxy.io/?"+encodeURIComponent(u)},
  function(u){return "https://api.allorigins.win/raw?url="+encodeURIComponent(u)},
  function(u){return "https://api.codetabs.com/v1/proxy?quest="+encodeURIComponent(u)},
  function(u){return "https://thingproxy.freeboard.io/fetch/"+u},
  function(u){return "https://corsproxy.org/?"+encodeURIComponent(u)},
  function(u){return "https://proxy.cors.sh/"+u}
];
var wp=0,YFH=["https://query2.finance.yahoo.com","https://query1.finance.yahoo.com"],yh=0;
var CF_PROXY="https://yahoo-finance-proxy.alex-dc.workers.dev";
var quotes={},fx={EUR:1},fxLive={},selTk=PORTFOLIO[0].ticker,curRange="1mo",chartInst=null;

// =====================================================
// FINNHUB API — direct CORS, no proxy needed
// =====================================================
var FH_KEY="d864b9hr01qmuqqcgg20d864b9hr01qmuqqcgg2g";
var FH_BASE="https://finnhub.io/api/v1";

function fhFetch(endpoint){
  var sep=endpoint.indexOf("?")>=0?"&":"?";
  var url=FH_BASE+endpoint+sep+"token="+FH_KEY;
  var ac=new AbortController();
  var t=setTimeout(function(){ac.abort()},5000);
  return fetch(url,{signal:ac.signal}).then(function(r){
    clearTimeout(t);
    if(!r.ok)throw new Error("FH "+r.status);
    return r.json();
  }).catch(function(e){clearTimeout(t);throw e});
}

// Finnhub quote → normalise to Yahoo-like shape so rest of code works
function fhQuoteToYahoo(sym,q){
  if(!q||q.c===0)return null; // c=0 means no data
  return{
    symbol:sym,
    regularMarketPrice:q.c,
    regularMarketChange:q.d,
    regularMarketChangePercent:q.dp,
    previousClose:q.pc,
    fiftyTwoWeekLow:null,
    fiftyTwoWeekHigh:null,
    fullExchangeName:"Finnhub",
    currency:null, // Finnhub quote doesn't return currency; we infer from PORTFOLIO
    marketCap:null,
    _source:"finnhub"
  };
}

// Fetch individual quote from Finnhub with rate-limit-friendly batching
function fhFetchQuotes(symbols){
  // Finnhub /quote is 1 symbol at a time, fire all in parallel (up to 30/sec limit)
  var results={};
  var promises=symbols.map(function(sym,i){
    // Stagger slightly: 6 batches of ~5, 100ms apart
    return new Promise(function(resolve){
      setTimeout(function(){
        fhFetch("/quote?symbol="+encodeURIComponent(sym)).then(function(q){
          var norm=fhQuoteToYahoo(sym,q);
          if(norm)results[sym]=norm;
        }).catch(function(){}).then(resolve);
      },Math.floor(i/6)*100);
    });
  });
  return Promise.all(promises).then(function(){return results});
}

// Finnhub market news — single call, fast, direct
function fhFetchMarketNews(){
  return fhFetch("/news?category=general").then(function(articles){
    if(!Array.isArray(articles))return[];
    return articles.slice(0,20).map(function(a){
      return{
        title:a.headline,
        link:a.url,
        publisher:a.source,
        providerPublishTime:a.datetime,
        thumbnail:a.image?{resolutions:[{url:a.image}]}:null,
        _source:"finnhub"
      };
    });
  }).catch(function(){return[]});
}

// Finnhub company news — single call per symbol
function fhFetchCompanyNews(sym){
  var to=new Date();
  var from=new Date();from.setDate(from.getDate()-14);
  var fromStr=from.toISOString().split("T")[0];
  var toStr=to.toISOString().split("T")[0];
  return fhFetch("/company-news?symbol="+encodeURIComponent(sym)+"&from="+fromStr+"&to="+toStr).then(function(articles){
    if(!Array.isArray(articles))return[];
    return articles.slice(0,10).map(function(a){
      return{
        title:a.headline,
        link:a.url,
        publisher:a.source,
        providerPublishTime:a.datetime,
        thumbnail:a.image?{resolutions:[{url:a.image}]}:null,
        _source:"finnhub"
      };
    });
  }).catch(function(){return[]});
}

// Finnhub /stock/metric — enriches with 52w, marketCap, P/E
function fhFetchMetric(sym){
  return fhFetch("/stock/metric?symbol="+encodeURIComponent(sym)+"&metric=all").then(function(j){
    if(!j||!j.metric)return null;
    var m=j.metric;
    // Compute 5Y avg P/E from Finnhub annual series if available
    var peAvg5Y=null;
    if(j.series&&j.series.annual){
      // Look for peBasicExclExtraTTM or peNormalizedAnnual in series
      var peSeries=j.series.annual.pe||j.series.annual.peBasicExclExtraTTM||j.series.annual.peNormalizedAnnual||[];
      if(peSeries.length>=3){
        var recent=peSeries.slice(0,5); // most recent 5 years
        var sum=0,cnt=0;
        recent.forEach(function(p){if(p.v&&p.v>0&&p.v<200){sum+=p.v;cnt++}});
        if(cnt>=2)peAvg5Y=sum/cnt;
      }
    }
    // Try to get forward P/E from Finnhub metrics
    var fwdPE=m["peForwardAnnual"]||m["forwardPE"]||null;
    // Try to derive forward EPS: if we have current price and forward PE
    var fwdEps=null;
    if(fwdPE&&fwdPE>0&&m["52WeekHigh"]){
      // We'll compute forwardEps later from price/fwdPE when we have the live price
    }
    // Also check epsForward or epsEstimateNextYear
    var epsEst=m["epsForwardAnnual"]||m["epsEstimateNextYear"]||m["epsNormalizedAnnual"]||null;

    return{
      fiftyTwoWeekHigh:m["52WeekHigh"]||null,
      fiftyTwoWeekLow:m["52WeekLow"]||null,
      marketCap:m["marketCapitalization"]?m["marketCapitalization"]*1e6:null, // Finnhub returns in millions
      trailingPE:m["peBasicExclExtraTTM"]||m["peTTM"]||null,
      peAvg5Y:peAvg5Y,
      forwardPE:fwdPE,
      forwardEps:epsEst
    };
  }).catch(function(){return null});
}

// Enrich quotes missing 52w/mcap/PE — staggered to respect rate limits
function enrichQuotes(tickers){
  var need=tickers.filter(function(tk){
    var q=quotes[tk];
    if(!q)return false;
    return !q.fiftyTwoWeekHigh||!q.marketCap||!q.trailingPE;
  });
  if(!need.length)return Promise.resolve();

  // Phase 1: Finnhub /stock/metric (works for US, some EU tickers)
  var idx=0;
  function nextMetricBatch(){
    if(idx>=need.length)return Promise.resolve();
    var batch=need.slice(idx,idx+3);
    idx+=3;
    var batchP=batch.map(function(tk){
      return fhFetchMetric(tk).then(function(data){
        if(!data||!quotes[tk])return;
        var q=quotes[tk];
        var p=q.regularMarketPrice||0;
        // Sanity check: reject 52W data if wildly off from current price (e.g. BRK-A data for BRK-B)
        var h52ok=data.fiftyTwoWeekHigh&&(!p||data.fiftyTwoWeekHigh<p*3);
        var l52ok=data.fiftyTwoWeekLow&&(!p||data.fiftyTwoWeekLow>p*0.01);
        if(h52ok&&!q.fiftyTwoWeekHigh)q.fiftyTwoWeekHigh=data.fiftyTwoWeekHigh;
        if(l52ok&&!q.fiftyTwoWeekLow)q.fiftyTwoWeekLow=data.fiftyTwoWeekLow;
        if(data.marketCap&&!q.marketCap)q.marketCap=data.marketCap;
        if(data.trailingPE&&!q.trailingPE)q.trailingPE=data.trailingPE;
        if(data.peAvg5Y&&!q.peAvg5Y)q.peAvg5Y=data.peAvg5Y;
        if(data.forwardPE&&!q.forwardPE)q.forwardPE=data.forwardPE;
        // Sanity check forwardEps: implied PE should be reasonable (0.5x-500x)
        var epsOk=data.forwardEps&&data.forwardEps>0&&(!p||((p/data.forwardEps)>0.5&&(p/data.forwardEps)<500));
        if(epsOk&&!q.forwardEps)q.forwardEps=data.forwardEps;
        // Derive forwardEps from price/forwardPE if we have forwardPE but no forwardEps
        if(q.forwardPE&&q.forwardPE>0&&!q.forwardEps&&p){
          q.forwardEps=p/q.forwardPE;
        }
      });
    });
    return Promise.all(batchP).then(function(){
      if(idx<need.length)return new Promise(function(r){setTimeout(r,300)}).then(nextMetricBatch);
    });
  }

  return nextMetricBatch().then(function(){
    // Phase 2: Yahoo quoteSummary for anything still missing mcap/PE/forwardPE
    var still=need.filter(function(tk){
      var q=quotes[tk];
      if(!q)return false;
      // Also include tickers with missing or suspicious 52W data
      var p=q.regularMarketPrice||0;
      var bad52w=p&&q.fiftyTwoWeekHigh&&q.fiftyTwoWeekHigh>p*3;
      return !q.marketCap||!q.trailingPE||!q.forwardPE||!q.fiftyTwoWeekHigh||bad52w;
    });
    if(!still.length)return;
    return fetchSeq(still,function(tk){
      var url=CF_PROXY+"/v10/finance/quoteSummary/"+encodeURIComponent(tk)+"?modules=price,defaultKeyStatistics,summaryDetail,earningsTrend";
      return fetch(url).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()}).then(function(j){
        var res=j&&j.quoteSummary&&j.quoteSummary.result&&j.quoteSummary.result[0];
        if(!res||!quotes[tk])return;
        var q=quotes[tk];
        var price=res.price||{};
        var stats=res.defaultKeyStatistics||{};
        var detail=res.summaryDetail||{};
        if(!q.marketCap&&price.marketCap&&price.marketCap.raw)q.marketCap=price.marketCap.raw;
        if(!q.trailingPE&&detail.trailingPE&&detail.trailingPE.raw)q.trailingPE=detail.trailingPE.raw;
        // Yahoo 52W is more reliable — always overwrite (fixes BRK-A/B confusion from Finnhub)
        if(detail.fiftyTwoWeekHigh&&detail.fiftyTwoWeekHigh.raw)q.fiftyTwoWeekHigh=detail.fiftyTwoWeekHigh.raw;
        if(detail.fiftyTwoWeekLow&&detail.fiftyTwoWeekLow.raw)q.fiftyTwoWeekLow=detail.fiftyTwoWeekLow.raw;
        // Forward P/E and Forward EPS — Yahoo is authoritative, always overwrite
        if(stats.forwardPE&&stats.forwardPE.raw)q.forwardPE=stats.forwardPE.raw;
        else if(detail.forwardPE&&detail.forwardPE.raw)q.forwardPE=detail.forwardPE.raw;
        if(stats.forwardEps&&stats.forwardEps.raw)q.forwardEps=stats.forwardEps.raw;
        if(stats.trailingEps&&stats.trailingEps.raw)q.trailingEps=stats.trailingEps.raw;
        // Derive forwardEps from price/forwardPE if missing
        if(q.forwardPE&&q.forwardPE>0&&!q.forwardEps&&q.regularMarketPrice){
          q.forwardEps=q.regularMarketPrice/q.forwardPE;
        }
      }).catch(function(){});
    },150);
  });
}

// Fetch Forward P/E for all equities that don't have it yet
function fetchForwardPE(tickers){
  var need=tickers.filter(function(tk){
    var q=quotes[tk];
    if(!q)return false;
    // Only fetch for equities (skip ETFs, commodities, crypto, bonds)
    var pos=null;
    for(var i=0;i<PORTFOLIO.length;i++){if(PORTFOLIO[i].ticker===tk){pos=PORTFOLIO[i];break}}
    if(!pos||pos.assetType!=="Equity")return false;
    return !q.forwardPE;
  });
  if(!need.length)return Promise.resolve();
  return fetchSeq(need,function(tk){
    var url=CF_PROXY+"/v10/finance/quoteSummary/"+encodeURIComponent(tk)+"?modules=defaultKeyStatistics,summaryDetail";
    return fetch(url).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()}).then(function(j){
      var res=j&&j.quoteSummary&&j.quoteSummary.result&&j.quoteSummary.result[0];
      if(!res||!quotes[tk])return;
      var q=quotes[tk];
      var stats=res.defaultKeyStatistics||{};
      var detail=res.summaryDetail||{};
      if(stats.forwardPE&&stats.forwardPE.raw)q.forwardPE=stats.forwardPE.raw;
      else if(detail.forwardPE&&detail.forwardPE.raw)q.forwardPE=detail.forwardPE.raw;
      if(stats.forwardEps&&stats.forwardEps.raw)q.forwardEps=stats.forwardEps.raw;
      if(stats.trailingEps&&stats.trailingEps.raw&&!q.trailingEps)q.trailingEps=stats.trailingEps.raw;
      // Derive forwardEps from price/forwardPE if missing
      if(q.forwardPE&&q.forwardPE>0&&!q.forwardEps&&q.regularMarketPrice){
        q.forwardEps=q.regularMarketPrice/q.forwardPE;
      }
    }).catch(function(){});
  },150);
}

function cs(c){return{USD:"$",EUR:"€",GBP:"£",GBX:"p",DKK:"kr",JPY:"¥",KRW:"₩"}[c]||""}
function fn(n,d){if(n==null||isNaN(n))return"—";return n.toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d})}
function fp(n){if(n==null||isNaN(n))return"—";return(n>=0?"+":"")+n.toFixed(1)+"%"}
function fb(n){if(n==null)return"—";if(n>=1e12)return(n/1e12).toFixed(2)+"T";if(n>=1e9)return(n/1e9).toFixed(2)+"B";if(n>=1e6)return(n/1e6).toFixed(2)+"M";if(n>=1e3)return(n/1e3).toFixed(1)+"K";return""+n}

function getFx(ccy){
  if(ccy==="EUR")return 1;
  if(fxLive[ccy])return fxLive[ccy];
  return FALLBACK_FX[ccy]||1;
}

// --- Detect actual currency for a quote ---
function getQuoteCcy(p,q){
  if(!q)return p.ccy;
  if(q.currency==="GBp"||q.currency==="GBX")return "GBX";
  if(p.ccy==="GBX")return "GBX";
  if(p.ticker.indexOf(".L")>0 && p.ccy==="GBP" && q.regularMarketPrice>200)return "GBX";
  return p.ccy;
}

// --- localStorage cache + embedded snapshot fallback ---
var usingSnapshot=false;
function saveCache(){
  try{localStorage.setItem("ig99_quotes",JSON.stringify(quotes));localStorage.setItem("ig99_fx",JSON.stringify(fxLive));localStorage.setItem("ig99_ts",Date.now())}catch(e){}
}
function loadCache(){
  try{
    var ts=parseInt(localStorage.getItem("ig99_ts")||"0");
    if(Date.now()-ts<86400000){
      var cq=JSON.parse(localStorage.getItem("ig99_quotes")||"{}");
      var cf=JSON.parse(localStorage.getItem("ig99_fx")||"{}");
      var loaded=false;
      for(var k in cq){
        if(!quotes[k]){
          // Sanity check cached 52W: strip values wildly off from price (e.g. BRK-A data for BRK-B)
          var cQuote=cq[k],cp=cQuote.regularMarketPrice||0;
          if(cp&&cQuote.fiftyTwoWeekHigh&&cQuote.fiftyTwoWeekHigh>cp*3){cQuote.fiftyTwoWeekHigh=null;cQuote.fiftyTwoWeekLow=null}
          quotes[k]=cQuote;loaded=true;
        }
      }
      for(var k in cf){if(!fxLive[k]){fxLive[k]=cf[k];fx[k]=cf[k]}}
      if(loaded)return;
    }
  }catch(e){}
  if(typeof EMBEDDED_QUOTES!=="undefined"&&EMBEDDED_QUOTES&&Object.keys(EMBEDDED_QUOTES).length>0){
    for(var k in EMBEDDED_QUOTES){if(!quotes[k])quotes[k]=EMBEDDED_QUOTES[k]}
    if(typeof EMBEDDED_FX!=="undefined"&&EMBEDDED_FX){for(var k in EMBEDDED_FX){if(!fxLive[k]){fxLive[k]=EMBEDDED_FX[k];fx[k]=EMBEDDED_FX[k]}}}
    usingSnapshot=true;
  }
}
function showSnapshotBanner(){
  if(!usingSnapshot)return;
  var ban=document.getElementById("snapshotBanner");
  if(!ban)return;
  var ts=typeof EMBEDDED_TS!=="undefined"&&EMBEDDED_TS?EMBEDDED_TS:"unknown";
  ban.textContent="Viewing saved snapshot from "+ts+". Live refresh may update if proxies are available.";
  ban.style.display="block";
}
function saveSnapshot(){
  var n=Object.keys(quotes).length;
  if(n===0){alert("No data loaded yet. Refresh first, then save.");return}
  var cleanQ={};
  for(var sym in quotes){
    var q=quotes[sym];
    cleanQ[sym]={symbol:q.symbol,regularMarketPrice:q.regularMarketPrice,regularMarketChange:q.regularMarketChange,regularMarketChangePercent:q.regularMarketChangePercent,previousClose:q.previousClose,fiftyTwoWeekLow:q.fiftyTwoWeekLow,fiftyTwoWeekHigh:q.fiftyTwoWeekHigh,fullExchangeName:q.fullExchangeName,currency:q.currency,marketCap:q.marketCap||null,trailingPE:q.trailingPE||null,isGBX:q.isGBX||false,forwardPE:q.forwardPE||null,forwardEps:q.forwardEps||null,peAvg5Y:q.peAvg5Y||null,trailingEps:q.trailingEps||null};
  }
  var ts=new Date().toLocaleString("en-GB",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});
  var content="// IG99 Portfolio Snapshot — auto-generated on "+ts+"\n"+
    "// Replace this file in the dashboard folder to update shared data\n"+
    "var EMBEDDED_QUOTES = "+JSON.stringify(cleanQ)+";\n"+
    "var EMBEDDED_FX = "+JSON.stringify(fxLive)+";\n"+
    "var EMBEDDED_TS = "+JSON.stringify(ts)+";\n";
  var blob=new Blob([content],{type:"application/javascript"});
  var a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="snapshot.js";
  document.body.appendChild(a);a.click();document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
  alert("Snapshot saved! Move the downloaded snapshot.js into the same folder as the dashboard to update the shared view.");
}

function parseProxyResponse(x){
  var j=JSON.parse(x);
  if(j.contents&&typeof j.contents==="string"){j=JSON.parse(j.contents)}
  if(j.html&&typeof j.html==="string"){j=JSON.parse(j.html)}
  return j;
}

function pf(url,fast){
  // fast mode: race all proxies + allorigins JSON + direct in parallel
  // normal mode: try sequentially starting with last-known-good
  if(fast){
    return new Promise(function(resolve,reject){
      var done=false,tried=0;
      var totalAttempts=PROXIES.length+2;
      function check(){tried++;if(tried>=totalAttempts&&!done){done=true;reject(new Error("all failed"))}}
      PROXIES.forEach(function(proxy,pi){
        var ac=new AbortController(),t=setTimeout(function(){ac.abort()},6000);
        fetch(proxy(url),{signal:ac.signal}).then(function(r){
          clearTimeout(t);if(!r.ok)throw new Error("bad");
          return r.text();
        }).then(function(x){
          if(done)return;
          try{var j=parseProxyResponse(x);done=true;wp=pi;resolve(j)}catch(e){throw e}
        }).catch(function(){clearTimeout(t);check()});
      });
      // allorigins JSON wrapper
      var ac2=new AbortController(),t2=setTimeout(function(){ac2.abort()},6000);
      fetch("https://api.allorigins.win/get?url="+encodeURIComponent(url),{signal:ac2.signal}).then(function(r){
        clearTimeout(t2);if(!r.ok)throw new Error("bad");return r.json();
      }).then(function(w){
        if(done)return;
        if(w&&w.contents){var j=JSON.parse(w.contents);done=true;resolve(j)} else throw new Error("no contents");
      }).catch(function(){clearTimeout(t2);check()});
      // direct
      var ac3=new AbortController(),t3=setTimeout(function(){ac3.abort()},4000);
      fetch(url,{signal:ac3.signal}).then(function(r){
        clearTimeout(t3);if(!r.ok)throw new Error("bad");return r.json();
      }).then(function(j){if(!done){done=true;resolve(j)}}).catch(function(){clearTimeout(t3);check()});
    });
  }
  var order=[wp];for(var i=0;i<PROXIES.length;i++){if(i!==wp)order.push(i)}
  var idx=0;
  function go(){
    if(idx>=order.length){
      // Final fallback: allorigins JSON wrapper
      var ac=new AbortController(),t=setTimeout(function(){ac.abort()},8000);
      return fetch("https://api.allorigins.win/get?url="+encodeURIComponent(url),{signal:ac.signal}).then(function(r){
        clearTimeout(t);if(!r.ok)throw new Error("bad");return r.json();
      }).then(function(w){
        if(w&&w.contents)return JSON.parse(w.contents);
        throw new Error("no contents");
      }).catch(function(){clearTimeout(t);return Promise.reject(new Error("fail"))});
    }
    var pi=order[idx];idx++;var ac=new AbortController(),t=setTimeout(function(){ac.abort()},6000);
    return fetch(PROXIES[pi](url),{signal:ac.signal}).then(function(r){
      clearTimeout(t);if(!r.ok)return go();
      return r.text().then(function(x){
        try{var j=parseProxyResponse(x);wp=pi;return j}catch(e){return go()}
      });
    }).catch(function(){clearTimeout(t);return go()});
  }
  return go();
}

function fetchSeq(items,fn,delay){
  var i=0;
  function next(){
    if(i>=items.length)return Promise.resolve();
    var item=items[i];i++;
    return fn(item).then(function(){
      if(delay)return new Promise(function(r){setTimeout(r,delay)});
    }).then(next);
  }
  return next();
}

function fetchFx(){
  // PRIMARY: open.er-api.com — free, CORS-friendly, no proxy needed
  // Returns rates relative to EUR base (exactly what we need)
  var fxDirect=fetch("https://open.er-api.com/v6/latest/EUR",{signal:(function(){var a=new AbortController();setTimeout(function(){a.abort()},5000);return a.signal})()}).then(function(r){
    if(!r.ok)throw new Error("FX API "+r.status);
    return r.json();
  }).then(function(j){
    if(j&&j.rates){
      // We need EUR→X rate, then invert to get "1 X = ? EUR"
      var map={USD:"USD",GBP:"GBP",DKK:"DKK",JPY:"JPY",KRW:"KRW"};
      for(var k in map){
        var rate=j.rates[map[k]];
        if(rate){fxLive[k]=1/rate;fx[k]=1/rate}
      }
      return true;
    }
    throw new Error("no rates");
  }).catch(function(){return false});

  // SECONDARY: Finnhub forex rates (may work on free tier for major pairs)
  var fxFinnhub=fhFetch("/forex/rates?base=EUR").then(function(j){
    if(j&&j.quote){
      var map={USD:"USD",GBP:"GBP",DKK:"DKK",JPY:"JPY",KRW:"KRW"};
      for(var k in map){
        var rate=j.quote[map[k]];
        if(rate&&!fxLive[k]){fxLive[k]=1/rate;fx[k]=1/rate}
      }
    }
  }).catch(function(){});

  // FALLBACK: Yahoo via CORS proxy (old method)
  var pairs=[{s:"USDEUR=X",k:"USD"},{s:"GBPEUR=X",k:"GBP"},{s:"DKKEUR=X",k:"DKK"},{s:"JPYEUR=X",k:"JPY"},{s:"KRWEUR=X",k:"KRW"}];
  var fxYahoo=pf(YFH[yh]+"/v7/finance/quote?symbols="+encodeURIComponent(pairs.map(function(p){return p.s}).join(",")),true).then(function(j){
    var r=(j&&j.quoteResponse&&j.quoteResponse.result)||[];
    if(r.length>0){r.forEach(function(q){var c=q.symbol.replace("EUR=X","");if(q.regularMarketPrice&&!fxLive[c]){fxLive[c]=q.regularMarketPrice;fx[c]=q.regularMarketPrice}})}
  }).catch(function(){});

  return Promise.all([fxDirect,fxFinnhub,fxYahoo]).then(function(){
    // Derive GBX from GBP
    var gbp=fxLive["GBP"]||FALLBACK_FX.GBP;
    fxLive["GBX"]=gbp/100;fx["GBX"]=gbp/100;
  });
}

function fetchOneQ(tk){
  return pf(YFH[yh]+"/v8/finance/chart/"+tk+"?range=1d&interval=1d").then(function(j){
    var r=j&&j.chart&&j.chart.result&&j.chart.result[0];
    if(r&&r.meta){
      var m=r.meta;
      var detectedCcy=m.currency;
      var isGBX=(detectedCcy==="GBp"||detectedCcy==="GBX");
      quotes[tk]={symbol:tk,regularMarketPrice:m.regularMarketPrice,regularMarketChange:m.regularMarketPrice-m.chartPreviousClose,regularMarketChangePercent:((m.regularMarketPrice-m.chartPreviousClose)/m.chartPreviousClose)*100,previousClose:m.chartPreviousClose,fiftyTwoWeekLow:m.fiftyTwoWeekLow,fiftyTwoWeekHigh:m.fiftyTwoWeekHigh,fullExchangeName:m.exchangeName,currency:detectedCcy,marketCap:null,isGBX:isGBX}
    }
  }).catch(function(){});
}

function fetchQuotes(){
  var tickers=PORTFOLIO.filter(function(p){return!!p.ticker}).map(function(p){return p.ticker});
  var all=tickers.join(",");

  // STRATEGY: Race Finnhub (direct) + Yahoo (batch via proxy) in parallel
  // Finnhub fills in fast for US stocks; Yahoo covers everything as batch
  var fhPromise=fhFetchQuotes(tickers).catch(function(){return{}});

  var yhPromise=pf(YFH[yh]+"/v7/finance/quote?symbols="+encodeURIComponent(all),true).then(function(j){
    var r=(j&&j.quoteResponse&&j.quoteResponse.result)||[];
    var map={};
    r.forEach(function(q){var isGBX=(q.currency==="GBp"||q.currency==="GBX");q.isGBX=isGBX;map[q.symbol]=q});
    return map;
  }).catch(function(){
    // CORS proxies failed — try CF proxy for Yahoo v7
    return fetch(CF_PROXY+"/v7/finance/quote?symbols="+encodeURIComponent(all)).then(function(r){
      if(!r.ok)throw new Error(r.status);return r.json()
    }).then(function(j){
      var r=(j&&j.quoteResponse&&j.quoteResponse.result)||[];
      var map={};
      r.forEach(function(q){var isGBX=(q.currency==="GBp"||q.currency==="GBX");q.isGBX=isGBX;map[q.symbol]=q});
      return map;
    }).catch(function(){return{}});
  });

  return Promise.all([fhPromise,yhPromise]).then(function(results){
    var fhData=results[0],yhData=results[1];

    // Merge: Yahoo data preferred (has currency, marketCap, 52wk, etc.)
    // Finnhub fills gaps where Yahoo missed
    tickers.forEach(function(tk){
      if(yhData[tk]){
        quotes[tk]=yhData[tk];
      } else if(fhData[tk]){
        // Enrich Finnhub data with currency from PORTFOLIO config
        var pos=null;
        for(var i=0;i<PORTFOLIO.length;i++){if(PORTFOLIO[i].ticker===tk){pos=PORTFOLIO[i];break}}
        var fq=fhData[tk];
        if(pos)fq.currency=pos.ccy==="GBX"?"GBp":pos.ccy;
        fq.isGBX=(pos&&pos.ccy==="GBX");
        quotes[tk]=fq;
      }
    });

    // One-by-one fallback for any still missing
    var miss=tickers.filter(function(tk){return!quotes[tk]});
    if(!miss.length)return;
    si("Loading remaining "+miss.length+"...");
    return fetchSeq(miss,function(tk){
      return fetchOneQ(tk).then(function(){
        si("Loading... "+Object.keys(quotes).length+"/"+PORTFOLIO.length);
        renderAll();
      });
    },200);
  });
}

var chartAbort=null;
var chartCache={}; // In-memory cache: key = "sym|range" → {data, ts}
var CHART_CACHE_TTL=300000; // 5 min cache

// Check if ticker is US-listed (Finnhub candles work for US stocks on free tier)
function isUSListed(sym){
  // US stocks: no dot suffix, or common US patterns
  if(sym.indexOf(".")>=0)return false; // .BR .AS .L .DE .CO .KS .T = non-US
  if(sym.indexOf("^")===0)return false; // indices
  if(sym.indexOf("=")>=0)return false; // FX pairs
  return true;
}

// Finnhub candle resolution mapping
function fhResolution(range){
  return{"1d":"5","5d":"30","1mo":"D","6mo":"D","1y":"D","5y":"W"}[range]||"D";
}

// Calculate Unix timestamps for Finnhub candle range
function fhTimeRange(range){
  var now=Math.floor(Date.now()/1000);
  var from;
  if(range==="1d")from=now-86400;
  else if(range==="5d")from=now-5*86400;
  else if(range==="1mo")from=now-31*86400;
  else if(range==="6mo")from=now-183*86400;
  else if(range==="1y")from=now-366*86400;
  else if(range==="5y")from=now-5*366*86400;
  else from=now-31*86400;
  return{from:from,to:now};
}

// Format candle data into chart points
function formatChartData(timestamps,closes,range){
  var data=[];
  for(var i=0;i<timestamps.length;i++){
    if(closes[i]!=null){
      var d=new Date(timestamps[i]*1000);
      data.push({t:timestamps[i]*1000,price:closes[i],label:range==="1d"?d.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):d.toLocaleDateString("en-US",{month:"short",day:"numeric"})});
    }
  }
  return data;
}

function showChartLoading(){
  var chartBox=document.querySelector("#view-portfolio .chart-box");
  if(chartBox){
    if(chartInst){chartInst.destroy();chartInst=null}
    var canvas=document.getElementById("priceChart");
    canvas.style.display="none";
    var existing=chartBox.querySelector(".chart-loading");
    if(!existing){
      var ld=document.createElement("div");ld.className="chart-loading";
      ld.innerHTML='<span style="font-size:12px">Loading chart<span class="loading-dots"></span></span><div class="loading-bar"><div class="loading-bar-fill"></div></div>';
      chartBox.appendChild(ld);
    }
  }
}

// Dedicated chart proxy fetch — longer timeouts, multiple strategies
function chartPf(url){
  return new Promise(function(resolve,reject){
    var done=false,tried=0;
    // Total attempts = PROXIES + 1 (allorigins JSON endpoint) + 1 (direct)
    var totalAttempts=PROXIES.length+2;
    function check(){tried++;if(tried>=totalAttempts&&!done){done=true;reject(new Error("all failed"))}}

    // Strategy A: Race all CORS proxies (raw)
    PROXIES.forEach(function(proxy,pi){
      var ac=new AbortController(),t=setTimeout(function(){ac.abort()},10000);
      fetch(proxy(url),{signal:ac.signal}).then(function(r){
        clearTimeout(t);if(!r.ok)throw new Error("bad");
        return r.text();
      }).then(function(x){
        if(done)return;
        try{
          var j=JSON.parse(x);
          // Handle allorigins JSON wrapper
          if(j.contents&&typeof j.contents==="string"){j=JSON.parse(j.contents)}
          if(j.html&&typeof j.html==="string"){j=JSON.parse(j.html)}
          done=true;wp=pi;resolve(j);
        }catch(e){throw e}
      }).catch(function(){clearTimeout(t);check()});
    });

    // Strategy B: allorigins JSON endpoint (wraps response in {contents: "..."})
    var aoUrl="https://api.allorigins.win/get?url="+encodeURIComponent(url);
    var ac2=new AbortController(),t2=setTimeout(function(){ac2.abort()},10000);
    fetch(aoUrl,{signal:ac2.signal}).then(function(r){
      clearTimeout(t2);if(!r.ok)throw new Error("bad");
      return r.json();
    }).then(function(wrapper){
      if(done)return;
      if(wrapper&&wrapper.contents){
        var j=JSON.parse(wrapper.contents);
        done=true;resolve(j);
      } else throw new Error("no contents");
    }).catch(function(){clearTimeout(t2);check()});

    // Strategy C: Direct Yahoo fetch (sometimes works without proxy)
    var ac3=new AbortController(),t3=setTimeout(function(){ac3.abort()},6000);
    fetch(url,{signal:ac3.signal}).then(function(r){
      clearTimeout(t3);if(!r.ok)throw new Error("bad");
      return r.json();
    }).then(function(j){
      if(done)return;
      done=true;resolve(j);
    }).catch(function(){clearTimeout(t3);check()});
  });
}

function parseYahooChart(j,range){
  var r=j&&j.chart&&j.chart.result&&j.chart.result[0];
  var ts=(r&&r.timestamp)||[];
  var cl=(r&&r.indicators&&r.indicators.quote&&r.indicators.quote[0]&&r.indicators.quote[0].close)||[];
  return formatChartData(ts,cl,range);
}

function fetchChart(sym,range){
  if(chartAbort){try{chartAbort.abort()}catch(e){}}
  chartAbort=new AbortController();

  // Check cache first — instant render
  var cacheKey=sym+"|"+range;
  var cached=chartCache[cacheKey];
  if(cached&&(Date.now()-cached.ts)<CHART_CACHE_TTL){
    rChart(cached.data,sym);
    return Promise.resolve();
  }

  showChartLoading();

  // STRATEGY: Race ALL sources in parallel — first valid data wins
  var im={"1d":"5m","5d":"30m","1mo":"1d","6mo":"1d","1y":"1d","5y":"1wk"};
  var done=false;

  function cacheAndRender(data){
    if(done)return;done=true;
    chartCache[cacheKey]={data:data,ts:Date.now()};
    rChart(data,sym);
  }

  var promises=[];

  // 1) Finnhub candle (US stocks — direct CORS, fastest)
  if(isUSListed(sym)){
    var tr=fhTimeRange(range);
    var res=fhResolution(range);
    var fhP=fhFetch("/stock/candle?symbol="+encodeURIComponent(sym)+"&resolution="+res+"&from="+tr.from+"&to="+tr.to).then(function(j){
      if(j&&j.s==="ok"&&j.t&&j.c){
        var data=formatChartData(j.t,j.c,range);
        if(data.length>0){cacheAndRender(data);return}
      }
    }).catch(function(){});
    promises.push(fhP);
  }

  // 2) Yahoo host 1 via CORS proxies (8s timeout)
  var url1=YFH[0]+"/v8/finance/chart/"+sym+"?range="+range+"&interval="+im[range];
  var yh1=chartPf(url1).then(function(j){
    var data=parseYahooChart(j,range);
    if(data.length>0)cacheAndRender(data);
  }).catch(function(){});
  promises.push(yh1);

  // 3) Yahoo host 2 via CORS proxies in parallel (8s timeout)
  var url2=YFH[1]+"/v8/finance/chart/"+sym+"?range="+range+"&interval="+im[range];
  var yh2=chartPf(url2).then(function(j){
    var data=parseYahooChart(j,range);
    if(data.length>0)cacheAndRender(data);
  }).catch(function(){});
  promises.push(yh2);

  return Promise.all(promises).then(function(){
    if(!done)rChart([],sym); // Nothing worked
  });
}

function fetchPN(sym){
  // Find company name from PORTFOLIO for keyword-based fallback
  var companyName="";
  for(var i=0;i<PORTFOLIO.length;i++){if(PORTFOLIO[i].ticker===sym){companyName=PORTFOLIO[i].name;break}}

  // Build keywords for relevance check (company name words + ticker)
  var keywords=[];
  if(companyName){
    companyName.split(" ").forEach(function(w){
      w=w.toLowerCase();
      if(w.length>=3)keywords.push(w);
    });
  }
  var plainTk=sym.replace(/[-.].*$/,"").toLowerCase(); // "BRK-B" -> "brk", "ASML.AS" -> "asml"
  if(plainTk.length>=2)keywords.push(plainTk);

  function isRelevant(articles){
    if(!articles||!articles.length)return false;
    var hits=0;
    articles.forEach(function(a){
      var t=(a.title||"").toLowerCase();
      for(var i=0;i<keywords.length;i++){if(t.indexOf(keywords[i])>=0){hits++;break}}
    });
    return hits>=Math.min(2,articles.length); // at least 2 articles (or all if <2) must match
  }

  // Yahoo news search via CF proxy (reliable) with CORS proxy fallback
  function yahooNewsSearch(query){
    return fetch(CF_PROXY+"/v1/finance/search?q="+encodeURIComponent(query)+"&newsCount=8&quotesCount=0")
      .then(function(r){if(!r.ok)throw new Error(r.status);return r.json()})
      .then(function(j){return(j&&j.news)||[]})
      .catch(function(){
        // Fallback to CORS proxy
        return pf(YFH[yh]+"/v1/finance/search?q="+encodeURIComponent(query)+"&newsCount=8&quotesCount=0",true)
          .then(function(j){return(j&&j.news)||[]})
          .catch(function(){return[]});
      });
  }

  // Step 1: Try Finnhub company news (works well for US tickers)
  fhFetchCompanyNews(sym).then(function(articles){
    if(articles&&articles.length>0&&isRelevant(articles)){
      rNews(articles);return;
    }
    // Step 2: Yahoo search by company name (most reliable via CF proxy)
    var q=companyName||sym;
    return yahooNewsSearch(q).then(function(news){
      if(news&&news.length>0){rNews(news);return}
      // Step 3: Finnhub general news filtered by keyword
      if(companyName){
        return fhFetchMarketNews().then(function(allNews){
          var kw=companyName.toLowerCase().split(" ")[0];
          var filtered=allNews.filter(function(n){return(n.title||"").toLowerCase().indexOf(kw)>=0});
          rNews(filtered.length>0?filtered:[]);
        }).catch(function(){rNews([])});
      }
      rNews([]);
    });
  }).catch(function(){
    // Finnhub failed entirely — try Yahoo via CF proxy
    var q=companyName||sym;
    yahooNewsSearch(q).then(function(news){rNews(news)});
  });
}

// =====================================================
// MARKET ANALYST DATA FETCHING
// =====================================================
var marketQuotes={};

var MARKET_INDICES=["^GSPC","^STOXX","^IXIC","^FTSE","^N225","^HSI","000001.SS","^GDAXI"];
var MARKET_CURRENCIES=["EURUSD=X","GBPUSD=X","USDCNY=X","USDJPY=X"];
var MARKET_COMMODITIES=["GC=F","CL=F","BZ=F","^TNX"];
var MARKET_EXTRA=["EEM"];

var ALL_MARKET_SYMS=MARKET_INDICES.concat(MARKET_CURRENCIES).concat(MARKET_COMMODITIES).concat(MARKET_EXTRA);

// Finnhub ETF proxies for market indices/commodities
// These ETFs closely track the underlying index and are quotable on Finnhub free tier
var FH_MARKET_MAP={
  "^GSPC":{etf:"SPY",scale:10,name:"S&P 500"},
  "^IXIC":{etf:"QQQ",scale:1,name:"Nasdaq"},
  "^STOXX":{etf:"FEZ",scale:1,name:"STOXX 600"},
  "^FTSE":{etf:"EWU",scale:1,name:"FTSE 100"},
  "^N225":{etf:"EWJ",scale:1,name:"Nikkei 225"},
  "^HSI":{etf:"EWH",scale:1,name:"Hang Seng"},
  "000001.SS":{etf:"MCHI",scale:1,name:"Shanghai Comp"},
  "^GDAXI":{etf:"EWG",scale:1,name:"DAX 40"},
  "GC=F":{etf:"GLD",scale:1,name:"Gold"},
  "CL=F":{etf:"USO",scale:1,name:"WTI Crude"},
  "BZ=F":{etf:"BNO",scale:1,name:"Brent Crude"},
  "^TNX":{etf:"TLT",scale:1,name:"10Y Treasury"},
  "EEM":{etf:"EEM",scale:1,name:"EM"}
};

function fetchMarketData(){
  // STRATEGY: 3 parallel sources + YTD chart data for 5d/YTD %
  // 1) Finnhub ETF quotes (direct, fast — gives day change)
  // 2) open.er-api.com for FX pairs
  // 3) Yahoo batch quote (fallback)
  // 4) Finnhub ETF YTD candles (gives 5d% and YTD%)

  // 1) Finnhub ETF proxies for indices & commodities
  var etfSyms=[];
  var etfToIndex={};
  for(var idx in FH_MARKET_MAP){
    var m=FH_MARKET_MAP[idx];
    if(etfSyms.indexOf(m.etf)<0)etfSyms.push(m.etf);
    etfToIndex[m.etf]=idx;
  }
  var fhETF=fhFetchQuotes(etfSyms).then(function(results){
    for(var etf in results){
      var indexSym=etfToIndex[etf];
      if(!indexSym)continue;
      var q=results[etf];
      marketQuotes[indexSym]={
        symbol:indexSym,
        shortName:FH_MARKET_MAP[indexSym].name,
        regularMarketPrice:q.regularMarketPrice,
        regularMarketChange:q.regularMarketChange,
        regularMarketChangePercent:q.regularMarketChangePercent,
        previousClose:q.previousClose,
        currency:"USD",
        _source:"finnhub_etf",
        _etfProxy:etf
      };
    }
  }).catch(function(){});

  // 2) FX from open.er-api.com (direct CORS, reliable)
  var fxAPI=fetch("https://open.er-api.com/v6/latest/USD",{signal:(function(){var a=new AbortController();setTimeout(function(){a.abort()},5000);return a.signal})()}).then(function(r){
    return r.json();
  }).then(function(j){
    if(!j||!j.rates)return;
    if(j.rates["EUR"]) marketQuotes["EURUSD=X"]={symbol:"EURUSD=X",shortName:"EUR/USD",regularMarketPrice:+(1/j.rates["EUR"]).toFixed(4),regularMarketChange:0,regularMarketChangePercent:0,previousClose:+(1/j.rates["EUR"]).toFixed(4),_source:"er_api"};
    if(j.rates["GBP"]) marketQuotes["GBPUSD=X"]={symbol:"GBPUSD=X",shortName:"GBP/USD",regularMarketPrice:+(1/j.rates["GBP"]).toFixed(4),regularMarketChange:0,regularMarketChangePercent:0,previousClose:+(1/j.rates["GBP"]).toFixed(4),_source:"er_api"};
    if(j.rates["JPY"]) marketQuotes["USDJPY=X"]={symbol:"USDJPY=X",shortName:"USD/JPY",regularMarketPrice:+j.rates["JPY"].toFixed(2),regularMarketChange:0,regularMarketChangePercent:0,previousClose:+j.rates["JPY"].toFixed(2),_source:"er_api"};
    if(j.rates["CNY"]) marketQuotes["USDCNY=X"]={symbol:"USDCNY=X",shortName:"USD/CNY",regularMarketPrice:+j.rates["CNY"].toFixed(4),regularMarketChange:0,regularMarketChangePercent:0,previousClose:+j.rates["CNY"].toFixed(4),_source:"er_api"};
  }).catch(function(){});

  // 3) Yahoo batch via CORS proxy
  var syms=ALL_MARKET_SYMS.join(",");
  var yhMarket=pf(YFH[yh]+"/v7/finance/quote?symbols="+encodeURIComponent(syms),true).then(function(j){
    var r=(j&&j.quoteResponse&&j.quoteResponse.result)||[];
    if(r.length>0){r.forEach(function(q){
      marketQuotes[q.symbol]=q;
    })}
  }).catch(function(){});

  return Promise.all([fhETF,fxAPI,yhMarket]).then(function(){
    // One-by-one fallback for any still completely missing
    var miss=ALL_MARKET_SYMS.filter(function(s){return!marketQuotes[s]});
    if(miss.length===0)return;
    return fetchSeq(miss,function(sym){
      return pf(YFH[yh]+"/v8/finance/chart/"+sym+"?range=5d&interval=1d").then(function(j){
        var r=j&&j.chart&&j.chart.result&&j.chart.result[0];
        if(r&&r.meta){
          var m=r.meta;
          var closes=(r.indicators&&r.indicators.quote&&r.indicators.quote[0]&&r.indicators.quote[0].close)||[];
          var fiveDayAgo=closes.length>=2?closes[0]:null;
          marketQuotes[sym]={
            symbol:sym,shortName:m.symbol,
            regularMarketPrice:m.regularMarketPrice,
            regularMarketChange:m.regularMarketPrice-m.chartPreviousClose,
            regularMarketChangePercent:((m.regularMarketPrice-m.chartPreviousClose)/m.chartPreviousClose)*100,
            previousClose:m.chartPreviousClose,currency:m.currency,
            _5dChg:fiveDayAgo?((m.regularMarketPrice-fiveDayAgo)/fiveDayAgo)*100:null
          };
        }
      }).catch(function(){});
    },200);
  });
}

// Fetch 5d% and YTD% for market indices via Yahoo charts (no Finnhub rate limit)
// Uses ETF proxies (SPY, QQQ, etc.) which are regular Yahoo tickers
function fetchMarketYTD(){
  var histSyms=MARKET_INDICES.concat(MARKET_COMMODITIES).concat(MARKET_EXTRA);
  // Fire all in parallel using chartPf — each races 8 proxy strategies
  var promises=histSyms.map(function(sym){
    var etfInfo=FH_MARKET_MAP[sym];
    if(!etfInfo)return Promise.resolve();
    var fetchSym=etfInfo.etf;
    // Use Yahoo v8 chart with YTD range
    var url=YFH[yh]+"/v8/finance/chart/"+fetchSym+"?range=ytd&interval=1d";
    return chartPf(url).then(function(j){
      var r=j&&j.chart&&j.chart.result&&j.chart.result[0];
      if(!r||!r.timestamp)return;
      var closes=(r.indicators&&r.indicators.quote&&r.indicators.quote[0]&&r.indicators.quote[0].close)||[];
      // Filter nulls
      var valid=[];
      for(var i=0;i<closes.length;i++){if(closes[i]!=null)valid.push(closes[i])}
      if(valid.length<2)return;
      var current=valid[valid.length-1];
      var ytdStart=valid[0];
      var fiveDIdx=Math.max(0,valid.length-6);
      var fiveDStart=valid[fiveDIdx];
      if(!marketQuotes[sym]){
        var meta=r.meta||{};
        marketQuotes[sym]={
          symbol:sym,shortName:etfInfo.name,
          regularMarketPrice:meta.regularMarketPrice||current,
          regularMarketChange:0,regularMarketChangePercent:0,
          previousClose:meta.chartPreviousClose||valid[valid.length-2],
          currency:"USD",_source:"yahoo_ytd"
        };
      }
      marketQuotes[sym]._5dChg=fiveDStart?((current-fiveDStart)/fiveDStart)*100:null;
      marketQuotes[sym]._ytdChg=ytdStart?((current-ytdStart)/ytdStart)*100:null;
    }).catch(function(e){
      // Yahoo failed for this ETF — try direct Yahoo fetch as last resort
      var directUrl="https://query1.finance.yahoo.com/v8/finance/chart/"+fetchSym+"?range=ytd&interval=1d";
      return fetch(directUrl,{signal:(function(){var a=new AbortController();setTimeout(function(){a.abort()},8000);return a.signal})()}).then(function(r){
        if(!r.ok)throw new Error("bad");return r.json();
      }).then(function(j){
        var r=j&&j.chart&&j.chart.result&&j.chart.result[0];
        if(!r||!r.timestamp)return;
        var closes=(r.indicators&&r.indicators.quote&&r.indicators.quote[0]&&r.indicators.quote[0].close)||[];
        var valid=[];
        for(var i=0;i<closes.length;i++){if(closes[i]!=null)valid.push(closes[i])}
        if(valid.length<2)return;
        var current=valid[valid.length-1];
        var ytdStart=valid[0];
        var fiveDIdx=Math.max(0,valid.length-6);
        var fiveDStart=valid[fiveDIdx];
        if(!marketQuotes[sym]){
          marketQuotes[sym]={symbol:sym,shortName:etfInfo.name,regularMarketPrice:current,
            regularMarketChange:0,regularMarketChangePercent:0,previousClose:valid[valid.length-2],
            currency:"USD",_source:"yahoo_direct"};
        }
        marketQuotes[sym]._5dChg=fiveDStart?((current-fiveDStart)/fiveDStart)*100:null;
        marketQuotes[sym]._ytdChg=ytdStart?((current-ytdStart)/ytdStart)*100:null;
      }).catch(function(){});
    });
  });
  return Promise.all(promises);
}

// =====================================================
// PORTFOLIO VALUE HISTORY
// =====================================================
function savePortfolioHistory(totalValue){
  if(!totalValue||totalValue<=0)return;
  try{
    var hist=JSON.parse(localStorage.getItem("ig99_portfolio_hist")||"[]");
    var today=new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    // Only save one entry per day (overwrite if same day)
    if(hist.length>0&&hist[hist.length-1].d===today){
      hist[hist.length-1].v=Math.round(totalValue);
    } else {
      hist.push({d:today,v:Math.round(totalValue)});
    }
    // Keep max 365 days
    if(hist.length>365)hist=hist.slice(hist.length-365);
    localStorage.setItem("ig99_portfolio_hist",JSON.stringify(hist));
  }catch(e){}
}

function getPortfolioHistory(){
  try{return JSON.parse(localStorage.getItem("ig99_portfolio_hist")||"[]")}catch(e){return[]}
}

function fetchMarketHeadlines(){
  // Finnhub market news: 1 direct call (fast) instead of 4 sequential Yahoo searches
  return fhFetchMarketNews().then(function(articles){
    if(articles&&articles.length>=3){
      renderMarketHeadlines(articles);
      return;
    }
    // Fallback: Yahoo search-based headlines
    var queries=["markets","economy","fed","ecb"];
    var allNews=[];
    var idx=0;
    function nextQ(){
      if(idx>=queries.length){
        var seen={},unique=[];
        allNews.forEach(function(n){
          var k=(n.title||"").substring(0,60);
          if(!seen[k]){seen[k]=true;unique.push(n)}
        });
        unique.sort(function(a,b){return(b.providerPublishTime||0)-(a.providerPublishTime||0)});
        renderMarketHeadlines(unique.slice(0,15));
        return Promise.resolve();
      }
      var q=queries[idx];idx++;
      return pf(YFH[yh]+"/v1/finance/search?q="+q+"&newsCount=6&quotesCount=0",true).then(function(j){
        var news=(j&&j.news)||[];
        allNews=allNews.concat(news);
      }).catch(function(){}).then(nextQ);
    }
    return nextQ();
  });
}
