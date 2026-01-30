// ================== IMPORT ==================
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

// ================== CONFIG ==================
const PORT = 3000;
const TOTAL_STATIONS = 6;

// ================== APP ==================
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ================== MIDDLEWARE ==================
app.use(express.json());
app.use(express.static("public"));

// ===== ADMIN AUTH MIDDLEWARE (AN TOÀN) =====
function requireAdmin(req, res, next) {
  const username = req.headers['x-user'];
  if (!username) {
    return res.status(403).json({ error: 'FORBIDDEN' });
  }

  db.get(
    "SELECT role FROM users WHERE username = ?",
    [username],
    (err, row) => {
      if (!row || row.role !== 'admin') {
        return res.status(403).json({ error: 'FORBIDDEN' });
      }
      next();
    }
  );
}

// ================== DATABASE ==================
const db = new sqlite3.Database("database.sqlite");

// ================== INIT DB ==================
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT,
      team TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      score INTEGER,
      ammo INTEGER,
      stations INTEGER
    )
  `);

  db.get("SELECT COUNT(*) AS count FROM users", async (err, row) => {
    if (row.count === 0) {
      const adminPass = await bcrypt.hash("admin123", 10);

      const teams = [
        ["ALPHA","alpha123"],["BRAVO","bravo123"],["CHARLIE","charlie123"],
        ["DELTA","delta123"],["ECHO","echopass123"],["FOXTROT","foxtrot123"],
        ["GOLF","golf123"],["HOTEL","hotel123"],["INDIA","india123"],
        ["JULIETT","juliett123"]
      ];

      db.run("INSERT INTO users VALUES (NULL, ?, ?, ?, ?)", [
        "admin", adminPass, "admin", null
      ]);

      for (const [name, pass] of teams) {
        const hash = await bcrypt.hash(pass, 10);
        db.run("INSERT INTO users VALUES (NULL, ?, ?, ?, ?)", [
          name, hash, "team", name
        ]);
        db.run("INSERT INTO teams VALUES (NULL, ?, ?, ?, ?)", [
          name, 0, 2, 0
        ]);
      }

      console.log("✔ Database initialized");
    }
  });
});

// ================== API ==================

// LOGIN
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, user) => {
      if (!user) return res.status(401).json({ error: "INVALID_LOGIN" });

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(401).json({ error: "INVALID_LOGIN" });

      res.json({
        username: user.username,
        role: user.role,
        team: user.team
      });
    }
  );
});

// ADMIN UPDATE TEAM (ĐÃ KHÓA)
app.post("/api/admin/update", requireAdmin, (req, res) => {
  const { team, score, ammo, stations } = req.body;

  db.run(
    `UPDATE teams
     SET score = score + ?, ammo = ammo + ?, stations = MIN(?, stations + ?)
     WHERE name = ?`,
    [score, ammo, TOTAL_STATIONS, stations, team],
    () => {
      broadcastTeams();
      res.json({ ok: true });
    }
  );
});

// GET ALL TEAMS (For admin dropdown)
app.get("/api/teams", requireAdmin, (req, res) => {
  db.all("SELECT * FROM teams ORDER BY name", (err, rows) => {
    if (err) return res.status(500).json({ error: "DB_ERROR" });
    res.json(rows || []);
  });
});

// ================== SOCKET ==================
function broadcastTeams() {
  db.all("SELECT * FROM teams ORDER BY score DESC", (err, rows) => {
    io.emit("leaderboard", rows);
  });
}

io.on("connection", () => {
  broadcastTeams();
});

// ================== START ==================
server.listen(PORT, () => {
  console.log("🧟 GENESIS SERVER RUNNING");
  console.log(`🌐 http://localhost:${PORT}`);
});
