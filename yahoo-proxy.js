// yahoo-proxy.js (Renderで動いているサーバー本体)
// 1) Yahoo Financeへのアクセスを代行するCORSプロキシ(/chart)
// 2) 1時間おきに全銘柄をスキャンして、🚀タートル速攻・👑超本命・✫Buy💚2/3だけを保存しておく自動スキャン
// 3) アプリはこの結果を/latest-scanから取得するだけで済むので、開いた瞬間に表示できる
// 4) /ping は外部の監視サービス(UptimeRobot等)から定期的に叩いてもらい、
//    Renderの無料プランがスリープするのを防ぐための軽量エンドポイント
//
// ローカルで試す場合: node yahoo-proxy.js
// Render側のStart Commandは "node yahoo-proxy.js" のまま変更不要

const http = require("http");
const fs = require("fs");
const path = require("path");
const scanLogic = require("./scanLogic");

scanLogic.setRuntimeOS("server");

const PORT = process.env.PORT || 3001;
const SCAN_INTERVAL_MS = 60 * 60 * 1000; // 1時間おき
const RESULTS_FILE = path.join(__dirname, "latest-scan.json");

let latestScan = {
  updatedAt: null,
  scanning: false,
  items: [],
};

// 再起動してもRender上のディスクが消えてなければ前回結果を復元する(ベストエフォート)
try {
  if (fs.existsSync(RESULTS_FILE)) {
    const saved = JSON.parse(fs.readFileSync(RESULTS_FILE, "utf8"));
    if (saved && Array.isArray(saved.items)) {
      latestScan = saved;
    }
  }
} catch (e) {
  console.warn("前回結果の読み込みに失敗:", e.message);
}

// アプリのタブ定義と完全に同じ条件で「🚀タートル速攻」「👑超本命」「✫Buy💚2」「✫Buy💚3」に
// 該当するものだけ抜き出す(タブ側のfilter条件を変えたらここも合わせて直すこと)
function pickTurtleHonmeiBuy23(results) {
  return results
    .filter((x) => x.kind === "stock" && x.direction !== "fail")
    .filter((x) => typeof x.price === "number" && x.price <= 500)
    .filter(
      (x) =>
        x.rocketTurtleCombo === true ||
        x.superCombo === true ||
        (x.direction === "buy" && x.inBullOB === true && x.heartBuy === true)
    )
    .map((x) => ({
      kind: "stock",
      code: x.code,
      name: x.name,
      price: x.price,
      score: x.score,
      direction: x.direction,
      rocketTurtleCombo: Boolean(x.rocketTurtleCombo), // 🚀タートル速攻
      superCombo: Boolean(x.superCombo), // 👑超本命
      buy2: Boolean(x.direction === "buy" && x.inBullOB && x.heartBuy), // ✫Buy💚2
      buy3: Boolean(x.direction === "buy" && x.inBullOB && x.heartBuy && x.turtleBuy), // ✫Buy💚3
    }));
}

async function runScheduledScan() {
  if (latestScan.scanning) {
    console.warn("[自動スキャン] 前回がまだ実行中のためスキップ");
    return;
  }
  latestScan.scanning = true;
  console.warn(`[自動スキャン] 開始 ${new Date().toISOString()}`);
  try {
    const { results } = await scanLogic.scanTargets({
      onProgress: (done, total) => {
        if (done % 200 === 0 || done === total) {
          console.warn(`[自動スキャン] ${done}/${total}`);
        }
      },
    });
    const items = pickTurtleHonmeiBuy23(results);
    latestScan = {
      updatedAt: new Date().toISOString(),
      scanning: false,
      items,
    };
    try {
      fs.writeFileSync(RESULTS_FILE, JSON.stringify(latestScan));
    } catch (e) {
      console.warn("結果の保存に失敗:", e.message);
    }
    console.warn(`[自動スキャン] 完了。該当${items.length}件`);
  } catch (e) {
    console.error("[自動スキャン] エラー:", e);
    latestScan.scanning = false;
  }
}

// 起動直後に1回実行し、以降は1時間おき
runScheduledScan();
setInterval(runScheduledScan, SCAN_INTERVAL_MS);

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === "/ping") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true, time: new Date().toISOString() }));
    return;
  }

  if (url.pathname === "/latest-scan") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(latestScan));
    return;
  }

  if (url.pathname === "/chart") {
    const symbol = url.searchParams.get("symbol");
    const range = url.searchParams.get("range") || "max";
    const interval = url.searchParams.get("interval") || "1d";

    if (!symbol) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "symbol is required" }));
      return;
    }

    const yahooUrl =
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}` +
      `?range=${encodeURIComponent(range)}&interval=${encodeURIComponent(interval)}`;

    try {
      const upstream = await fetch(yahooUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept: "application/json",
        },
      });
      const text = await upstream.text();
      res.writeHead(upstream.status, { "Content-Type": "application/json" });
      res.end(text);
    } catch (e) {
      res.writeHead(502, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "upstream fetch failed", detail: String(e) }));
    }
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "not found" }));
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
