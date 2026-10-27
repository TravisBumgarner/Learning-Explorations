// Local lab: serves the game page, rebuilds main.bend to JS and re-checks
// PROOF.bend whenever a .bend file in the repo changes.
// Run: node web/server.mjs   then open http://localhost:4321
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFile, spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const WEB = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(WEB);
const BEND = process.env.BEND ?? path.join(os.homedir(), ".bend/bin/bend");
const PORT = Number(process.env.PORT ?? 4321);

const CLAUDE = process.env.CLAUDE ?? "claude";

const state = { version: 0, busy: false, build: null, proof: null, laws: [], at: null,
  chat: [], thinking: false };

const bend = args => new Promise(done =>
  execFile(BEND, args, { cwd: ROOT, timeout: 120000, maxBuffer: 1 << 24 }, (err, stdout, stderr) =>
    done({ ok: !err, text: (stdout + stderr).trim() })));

// Each law with the comment lines just above it.
function readLaws() {
  const lines = fs.readFileSync(path.join(ROOT, "LAWS.bend"), "utf8").split("\n");
  const laws = [];
  lines.forEach((line, i) => {
    const m = line.match(/^law\s+(\w+)\s*:/);
    if (!m) return;
    const notes = [];
    for (let j = i - 1; j >= 0 && lines[j].startsWith("#"); j--) notes.unshift(lines[j].replace(/^#\s?/, ""));
    laws.push({ name: m[1], note: notes.join(" ") });
  });
  return laws;
}

let again = false;
async function refresh() {
  if (state.busy) { again = true; return; }
  state.busy = true;
  try {
    const out = path.join(WEB, "game.mjs");
    state.build = await bend(["main.bend", "-o", out]);
    state.proof = await bend(["PROOF.bend"]);
    state.proof.ok = state.proof.ok && /ALL PROOFS CHECK/.test(state.proof.text);
    try { state.laws = readLaws(); } catch (e) { state.laws = []; }
    state.at = new Date().toISOString();
    state.version++;
    console.log(`[${state.at}] build ${state.build.ok ? "ok" : "FAILED"}, proofs ${state.proof.ok ? "check" : "FAIL"}`);
  } finally {
    state.busy = false;
    if (again) { again = false; refresh(); }
  }
}

let timer;
fs.watch(ROOT, (_, file) => {
  if (!file?.endsWith(".bend")) return;
  clearTimeout(timer);
  timer = setTimeout(refresh, 200);
});

// Chat: each message runs headless Claude Code in the repo, one session
// for the whole server run. It may read and edit files and run bend, and
// nothing else; the watcher above picks up whatever it saves.
const SESSION = randomUUID();
let turns = 0;
const SYSTEM = `You are behind a local web page where the user plays the game in main.bend.
The page rebuilds main.bend and re-runs PROOF.bend on every save, so just edit the files.
Follow AGENTS.md. \`bend\` is on PATH. Run each bend command on its own, exactly like
\`bend PROOF.bend\` or \`bend main.bend\`: no pipes, no &&, no ; or echo, or it is blocked.
The user may change LAWS.bend; keep every law proved.
Reply in a few plain sentences: what you changed and whether \`bend PROOF.bend\` checks.`;

const label = ({ name, input = {} }) => {
  const file = input.file_path ? path.relative(ROOT, input.file_path) : "";
  if (name === "Bash") return "ran " + (input.command ?? "").replaceAll(BEND, "bend");
  return (name === "Read" ? "read " : name === "Edit" || name === "Write" ? "edited " : name + " ") + file;
};

function ask(text) {
  state.chat.push({ role: "you", text });
  const reply = { role: "claude", text: "", steps: [] };
  state.chat.push(reply);
  state.thinking = true;
  const args = ["-p", text, "--output-format", "stream-json", "--verbose",
    "--permission-mode", "acceptEdits", "--permission-prompts", "none",
    "--allowedTools", `Read Edit Write Glob Grep Bash(bend *) Bash(${BEND} *)`,
    "--append-system-prompt", SYSTEM,
    ...(turns++ === 0 ? ["--session-id", SESSION] : ["--resume", SESSION])];
  const env = { ...process.env, PATH: path.dirname(BEND) + path.delimiter + process.env.PATH };
  const child = spawn(CLAUDE, args, { cwd: ROOT, env, stdio: ["ignore", "pipe", "pipe"] });
  let buf = "", err = "";
  child.stdout.on("data", d => {
    buf += d;
    let i;
    while ((i = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, i); buf = buf.slice(i + 1);
      let ev; try { ev = JSON.parse(line); } catch { continue; }
      if (ev.type === "assistant") for (const b of ev.message?.content ?? []) {
        if (b.type === "tool_use") reply.steps.push(label(b));
      }
      if (ev.type === "result") reply.text = ev.result ?? "";
    }
  });
  child.stderr.on("data", d => { err += d; });
  child.on("close", code => {
    if (!reply.text) reply.text = code === 0 ? "(done)" : "Claude failed: " + (err.trim() || "exit " + code);
    state.thinking = false;
    state.version++;
  });
  child.on("error", e => { reply.text = "Couldn't start claude: " + e.message; state.thinking = false; state.version++; });
}

const TYPES ={ ".html": "text/html", ".mjs": "text/javascript", ".js": "text/javascript", ".css": "text/css" };

http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  if (url.pathname === "/status") {
    res.writeHead(200, { "content-type": "application/json", "cache-control": "no-store" });
    return res.end(JSON.stringify(state));
  }
  if (url.pathname === "/ask" && req.method === "POST") {
    let body = "";
    req.on("data", d => { body += d; });
    req.on("end", () => {
      const text = (() => { try { return String(JSON.parse(body).text ?? "").trim(); } catch { return ""; } })();
      if (!text || state.thinking) { res.writeHead(409); return res.end(state.thinking ? "busy" : "empty"); }
      ask(text);
      res.writeHead(202); res.end("ok");
    });
    return;
  }
  const name = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
  if (!["index.html", "game.mjs"].includes(name)) { res.writeHead(404); return res.end("not found"); }
  fs.readFile(path.join(WEB, name), (err, body) => {
    if (err) { res.writeHead(404); return res.end("not found"); }
    res.writeHead(200, { "content-type": TYPES[path.extname(name)], "cache-control": "no-store" });
    res.end(body);
  });
}).listen(PORT, "127.0.0.1", () => console.log(`Bend lab on http://localhost:${PORT}`));

refresh();
