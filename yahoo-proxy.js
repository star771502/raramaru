const http = require("http");
const https = require("https");

const PORT = 3001;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (requestUrl.pathname !== "/chart") {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  const symbol = requestUrl.searchParams.get("symbol");
  const range = requestUrl.searchParams.get("range");
  const period1 = requestUrl.searchParams.get("period1");
  const period2 = requestUrl.searchParams.get("period2");
  const interval = requestUrl.searchParams.get("interval") || "1d";

  if (!symbol) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "symbol is required" }));
    return;
  }

  let yahooUrl =
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}` +
    `?interval=${encodeURIComponent(interval)}` +
    `&events=history&includeAdjustedClose=true`;

  if (period1 && period2) {
    yahooUrl +=
      `&period1=${encodeURIComponent(period1)}` +
      `&period2=${encodeURIComponent(period2)}`;
  } else {
    yahooUrl += `&range=${encodeURIComponent(range || "10y")}`;
  }

  https
    .get(
      yahooUrl,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
        },
      },
      (yahooRes) => {
        res.writeHead(yahooRes.statusCode || 500, {
          "Content-Type": yahooRes.headers["content-type"] || "application/json",
          "Access-Control-Allow-Origin": "*",
        });

        yahooRes.pipe(res);
      }
    )
    .on("error", (error) => {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error.message }));
    });
});

server.listen(PORT, () => {
  console.log(`Yahoo proxy started: http://localhost:${PORT}`);

});