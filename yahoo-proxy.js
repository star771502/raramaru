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
const HISTORY_FILE = path.join(__dirname, "scan-history.json");
const MAX_HISTORY = 24; // 1時間おきなら24件で丸1日分

let latestScan = {
  updatedAt: null,
  scanning: false,
  items: [],
};

// scanHistory[0]が最新、古いものは配列の後ろへ。MAX_HISTORY件を超えたら古い順に捨てる
let scanHistory = [];

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

try {
  if (fs.existsSync(HISTORY_FILE)) {
    const savedHistory = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf8"));
    if (Array.isArray(savedHistory)) {
      scanHistory = savedHistory;
    }
  }
} catch (e) {
  console.warn("履歴の読み込みに失敗:", e.message);
}

// アプリのタブ定義と完全に同じ条件で株のcombo系タブに該当するものだけ抜き出す
// (タブ側のfilter条件を変えたらここも合わせて直すこと)
function pickTurtleHonmeiBuy23(results) {
  const stockPicks = results
    .filter((x) => x.kind === "stock" && x.direction !== "fail")
    .filter((x) => typeof x.price === "number" && x.price <= 500)
    .filter(
      (x) =>
        x.rocketTurtleCombo === true ||
        x.superCombo === true ||
        x.rocketTurtleComboSell === true ||
        x.superComboSell === true ||
        x.megaBuyBreakout === true ||
        x.megaSellBreakout === true
    )
    .map((x) => {
      // 一覧の「シグナル」欄に出す用: どのcomboに該当したかをまとめたラベル
      const labels = [];
      if (x.megaBuyBreakout) labels.push("💥爆上げ本命");
      if (x.megaSellBreakout) labels.push("💥暴落本命");
      if (x.superCombo) labels.push("👑超本命");
      if (x.rocketTurtleCombo) labels.push("🚀タートル速攻");
      if (x.superComboSell) labels.push("👑超本命売り");
      if (x.rocketTurtleComboSell) labels.push("🚀タートル速攻売り");

      return {
        kind: "stock",
        code: x.code,
        name: x.name,
        price: x.price,
        score: x.score,
        direction: x.direction,
        signal: labels.join("｜") || "-",
        rocketTurtleCombo: Boolean(x.rocketTurtleCombo), // 🚀タートル速攻
        superCombo: Boolean(x.superCombo), // 👑超本命
        rocketTurtleComboSell: Boolean(x.rocketTurtleComboSell), // 🚀タートル速攻売り
        superComboSell: Boolean(x.superComboSell), // 👑超本命売り
        megaBuyBreakout: Boolean(x.megaBuyBreakout), // 💥爆上げ本命
        megaSellBreakout: Boolean(x.megaSellBreakout), // 💥暴落本命
      };
    });

  // FX(為替・暗号資産)・指数向けcombo(🚀タートル速攻FX/👑超本命FXとその売り版)
  const fxPicks = results
    .filter(
      (x) =>
        (x.kind === "forex" || x.kind === "crypto" || x.kind === "index") &&
        x.direction !== "fail"
    )
    .filter(
      (x) =>
        x.rocketTurtleComboFx === true ||
        x.superComboFx === true ||
        x.rocketTurtleComboSellFx === true ||
        x.superComboSellFx === true
    )
    .map((x) => ({
      kind: x.kind,
      code: x.code,
      name: x.name,
      price: x.price,
      score: x.score,
      direction: x.direction,
      rocketTurtleComboFx: Boolean(x.rocketTurtleComboFx), // 🚀タートル速攻FX
      superComboFx: Boolean(x.superComboFx), // 👑超本命FX
      rocketTurtleComboSellFx: Boolean(x.rocketTurtleComboSellFx), // 🚀タートル速攻FX売り
      superComboSellFx: Boolean(x.superComboSellFx), // 👑超本命FX売り
    }));

  return [...stockPicks, ...fxPicks];
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
    const updatedAt = new Date().toISOString();
    latestScan = {
      updatedAt,
      scanning: false,
      items,
    };

    scanHistory.unshift({ updatedAt, items });
    if (scanHistory.length > MAX_HISTORY) {
      scanHistory = scanHistory.slice(0, MAX_HISTORY);
    }

    try {
      fs.writeFileSync(RESULTS_FILE, JSON.stringify(latestScan));
      fs.writeFileSync(HISTORY_FILE, JSON.stringify(scanHistory));
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

  // 過去の自動スキャン結果一覧(新しい順、最大MAX_HISTORY件)
  if (url.pathname === "/scan-history") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ history: scanHistory }));
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
