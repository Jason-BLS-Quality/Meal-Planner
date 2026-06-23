// Shared meal-plan storage, keyed by a share code.
// Backed by Vercel KV / Upstash Redis via its REST API. No npm dependencies.
// Until a KV store is connected (env vars below), this responds 503 and the app
// simply treats sync as unavailable.

const BASE = process.env.KV_REST_API_URL;
const TOKEN = process.env.KV_REST_API_TOKEN;

async function redis(cmd) {
  const r = await fetch(BASE, {
    method: "POST",
    headers: { Authorization: "Bearer " + TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify(cmd)
  });
  if (!r.ok) throw new Error("kv " + r.status);
  return r.json();
}

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (!BASE || !TOKEN) {
    res.statusCode = 503;
    return res.end(JSON.stringify({ error: "sync-not-configured" }));
  }

  let code = "";
  try { code = new URL(req.url, "http://x").searchParams.get("code") || ""; } catch (e) {}
  code = code.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 32);
  if (!code) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: "no-code" }));
  }
  const key = "mealplan:" + code;

  try {
    if (req.method === "GET") {
      const out = await redis(["GET", key]);
      const data = out && out.result ? JSON.parse(out.result) : null;
      res.statusCode = 200;
      return res.end(JSON.stringify({ code, data }));
    }

    if (req.method === "POST") {
      let value;
      if (req.body !== undefined && req.body !== null) {
        value = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
      } else {
        let raw = "";
        for await (const chunk of req) raw += chunk;
        value = raw;
      }
      if (!value) { res.statusCode = 400; return res.end(JSON.stringify({ error: "no-body" })); }
      if (value.length > 300000) { res.statusCode = 413; return res.end(JSON.stringify({ error: "too-large" })); }
      await redis(["SET", key, value]);
      res.statusCode = 200;
      return res.end(JSON.stringify({ ok: true }));
    }

    res.statusCode = 405;
    return res.end(JSON.stringify({ error: "method" }));
  } catch (e) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: "server" }));
  }
};
