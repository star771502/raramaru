// Project SH | v54 | Progress Navigator - 爆上げ銘柄スキャナー
// メインサーバー：画面を返す + スキャンAPIを提供する

const express = require('express');
const { runScan } = require('./scanLogic');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== 設定（ここを変えれば条件を変更できます）=====
const CONFIG = {
  PRICE_LIMIT: 500,        // 価格の上限（円）
  SCAN_INTERVAL_HOURS: 1,  // 自動スキャンの間隔（時間）
  MARKETS: ['JP'],         // 対象市場：JP=日本株
};
// ====================================================

// スキャン結果をメモリに保持
let latestResult = {
  updatedAt: null,
  symbols: [],
  error: null,
};

// スキャンを実行して結果を保存
async function doScan() {
  try {
    console.log('[SCAN] 開始...');
    const symbols = await runScan(CONFIG);
    latestResult = {
      updatedAt: new Date().toISOString(),
      symbols: symbols,
      error: null,
    };
    console.log(`[SCAN] 完了: ${symbols.length}銘柄`);
  } catch (err) {
    console.error('[SCAN] エラー:', err.message);
    latestResult.error = err.message;
  }
}

// ---- 画面（トップページ）----
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Project SH | 爆上げ銘柄スキャナー</title>
<style>
  body { font-family: -apple-system, sans-serif; margin: 0; padding: 16px; background: #0d1117; color: #e6edf3; }
  h1 { font-size: 20px; margin: 0 0 4px; }
  .sub { color: #8b949e; font-size: 12px; margin-bottom: 16px; }
  .card { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 12px; margin-bottom: 10px; }
  .sym { font-size: 18px; font-weight: bold; color: #58a6ff; }
  .name { font-size: 13px; color: #8b949e; margin-top: 2px; }
  .price { font-size: 16px; margin-top: 6px; }
  .up { color: #3fb950; }
  .down { color: #f85149; }
  .empty { color: #8b949e; text-align: center; padding: 40px 0; }
  button { background: #238636; color: white; border: none; padding: 10px 16px; border-radius: 6px; font-size: 14px; margin-bottom: 16px; }
</style>
</head>
<body>
  <h1>📈 爆上げ銘柄スキャナー</h1>
  <div class="sub" id="updated">読み込み中...</div>
  <button onclick="loadData(true)">🔄 今すぐスキャン</button>
  <div id="list"></div>
<script>
async function loadData(force) {
  const list = document.getElementById('list');
  list.innerHTML = '<div class="empty">スキャン中...</div>';
  try {
    const url = force ? '/api/scan?force=1' : '/api/scan';
    const res = await fetch(url);
    const data = await res.json();
    document.getElementById('updated').textContent =
      data.updatedAt ? '更新: ' + new Date(data.updatedAt).toLocaleString('ja-JP') : '未更新';
    if (data.error) { list.innerHTML = '<div class="empty">エラー: ' + data.error + '</div>'; return; }
    if (!data.symbols || data.symbols.length === 0) {
      list.innerHTML = '<div class="empty">該当銘柄なし</div>'; return;
    }
    list.innerHTML = data.symbols.map(s => {
      const cls = (s.change || 0) >= 0 ? 'up' : 'down';
      const sign = (s.change || 0) >= 0 ? '+' : '';
      return '<div class="card">' +
        '<div class="sym">' + s.symbol + '</div>' +
        '<div class="name">' + (s.name || '') + '</div>' +
        '<div class="price">¥' + (s.price || '-') +
        ' <span class="' + cls + '">' + sign + (s.change || 0).toFixed(2) + '%</span></div>' +
        '</div>';
    }).join('');
  } catch (e) {
    list.innerHTML = '<div class="empty">通信エラー: ' + e.message + '</div>';
  }
}
loadData(false);
</script>
</body>
</html>`);
});

// ---- スキャンAPI ----
app.get('/api/scan', async (req, res) => {
  const force = req.query.force === '1';
  // 結果が古い、または強制実行なら再スキャン
  const stale = !latestResult.updatedAt ||
    (Date.now() - new Date(latestResult.updatedAt).getTime()) > CONFIG.SCAN_INTERVAL_HOURS * 3600 * 1000;
  if (force || stale) {
    await doScan();
  }
  res.json(latestResult);
});

// ---- 起動 ----
app.listen(PORT, () => {
  console.log(`[SERVER] 起動しました: port ${PORT}`);
  // 起動時に1回スキャン
  doScan();
  // 以降、指定間隔で自動スキャン
  setInterval(doScan, CONFIG.SCAN_INTERVAL_HOURS * 3600 * 1000);
});