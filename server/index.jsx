require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing in .env");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5175"
  ]
}));

app.use(express.json({ limit: "10kb" }));


app.get("/", (req, res) => {
  res.send("Welcome to ImpanoLink API!");
});


app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      status: "success",
      message: "ImpanoLink backend and database are working!",
    });
  } catch (error) {
    console.error("Database connection error:", error.message);
    res.status(500).json({
      status: "error",
      message: "Database connection failed.",
    });
  }
})
app.post("/api/auth/register", async (req, res) => {
  const { full_name, email, password, role } = req.body;

  if (
    typeof full_name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof role !== "string"
  ) {
    return res.status(400).json({
      error: "Please provide all required fields.",
    });
  }

  const name = full_name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (!name || name.length > 100) {
    return res.status(400).json({
      error: "Name must contain between 1 and 100 characters.",
    });
  }

  if (
    normalizedEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
  ) {
    return res.status(400).json({
      error: "Please enter a valid email address.",
    });
  }

  if (password.length < 8 || password.length > 72) {
    return res.status(400).json({
      error: "Password must contain between 8 and 72 characters.",
    });
  }

  if (!["talent", "employer"].includes(role)) {
    return res.status(400).json({
      error: "Role must be talent or employer.",
    });
  }

  try {
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        error: "An account with this email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, full_name, email, role, created_at`,
      [name, normalizedEmail, passwordHash, role]
    );

    const user = result.rows[0];

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "Account created successfully!",
      user,
      token,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        error: "An account with this email already exists.",
      });
    }

    console.error("Registration error:", error.message);

    return res.status(500).json({
      error: "Could not create your account. Please try again.",
    });
  }
});

// LOGIN
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({
      error: "Please enter your email and password.",
    });
  }

  try {
    const result = await pool.query(
      `SELECT id, full_name, email, password_hash, role, created_at
       FROM users
       WHERE email = $1`,
      [email.trim().toLowerCase()]
    );

    const userRecord = result.rows[0];

    if (
      !userRecord ||
      !(await bcrypt.compare(password, userRecord.password_hash))
    ) {
      return res.status(401).json({
        error: "Incorrect email or password.",
      });
    }

    const token = jwt.sign(
      { id: userRecord.id, role: userRecord.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const user = {
      id: userRecord.id,
      full_name: userRecord.full_name,
      email: userRecord.email,
      role: userRecord.role,
      created_at: userRecord.created_at,
    };

    return res.json({
      message: "Login successful!",
      user,
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      error: "Could not log in. Please try again.",
    });
  }
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      error: "Please log in first.",
    });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({
      error: "Your session is invalid or expired. Please log in again.",
    });
  }
}


app.get("/api/auth/me", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, full_name, email, role, created_at
       FROM users
       WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    return res.json({ user: result.rows[0] });
  } catch (error) {
    console.error("Profile error:", error.message);

    return res.status(500).json({
      error: "Could not load your profile.",
    });
  }
});


app.post("/api/messages", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !subject.trim() ||
    !message.trim()
  ) {
    return res.status(400).json({
      error: "Please fill in all fields.",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, created_at`,
      [
        name.trim(),
        email.trim(),
        subject.trim(),
        message.trim(),
      ]
    );

    return res.status(201).json({
      message: "Your message was received successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Could not save message:", error.message);

    return res.status(500).json({
      error: "Could not save your message. Please try again.",
    });
  }
});

/* =========================
   IMPANOLINK GROUP CHAT API
========================= */

// 1. Get groups for the logged-in user
app.get("/api/chat/groups", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT g.id, g.name, g.created_by, g.created_at,
              COUNT(gm.user_id)::int AS member_count
       FROM chat_groups g
       JOIN chat_group_members mine
         ON mine.group_id = g.id
        AND mine.user_id = $1
       LEFT JOIN chat_group_members gm
         ON gm.group_id = g.id
       GROUP BY g.id
       ORDER BY g.created_at DESC`,
      [req.user.id]
    );

    res.json({ groups: result.rows });
  } catch (error) {
    console.error("Get groups error:", error.message);
    res.status(500).json({ error: "Could not load groups." });
  }
});

// 2. Create a group
app.post("/api/chat/groups", authenticateToken, async (req, res) => {
  const name = typeof req.body.name === "string"
    ? req.body.name.trim()
    : "";

  if (!name || name.length > 100) {
    return res.status(400).json({
      error: "Group name must contain 1 to 100 characters.",
    });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const groupResult = await client.query(
      `INSERT INTO chat_groups (name, created_by)
       VALUES ($1, $2)
       RETURNING id, name, created_by, created_at`,
      [name, req.user.id]
    );

    const group = groupResult.rows[0];

    await client.query(
      `INSERT INTO chat_group_members (group_id, user_id)
       VALUES ($1, $2)`,
      [group.id, req.user.id]
    );

    await client.query("COMMIT");
    res.status(201).json({ group });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Create group error:", error.message);
    res.status(500).json({ error: "Could not create group." });
  } finally {
    client.release();
  }
});

// 3. Get messages from a group
app.get(
  "/api/chat/groups/:groupId/messages",
  authenticateToken,
  async (req, res) => {
    try {
      const groupId = Number(req.params.groupId);

      if (!Number.isSafeInteger(groupId) || groupId <= 0) {
        return res.status(400).json({ error: "Invalid group ID." });
      }

      const membership = await pool.query(
        `SELECT 1
         FROM chat_group_members
         WHERE group_id = $1 AND user_id = $2`,
        [groupId, req.user.id]
      );

      if (membership.rows.length === 0) {
        return res.status(403).json({
          error: "You are not a member of this group.",
        });
      }

      const result = await pool.query(
        `SELECT m.id, m.group_id, m.sender_id, m.message,
                m.created_at, u.full_name AS sender_name
         FROM group_messages m
         LEFT JOIN users u ON u.id = m.sender_id
         WHERE m.group_id = $1
         ORDER BY m.created_at ASC, m.id ASC
         LIMIT 200`,
        [groupId]
      );

      res.json({ messages: result.rows });
    } catch (error) {
      console.error("Get group messages error:", error.message);
      res.status(500).json({ error: "Could not load messages." });
    }
  }
);

// 4. Send a message to a group
app.post(
  "/api/chat/groups/:groupId/messages",
  authenticateToken,
  async (req, res) => {
    try {
      const groupId = Number(req.params.groupId);
      const message = typeof req.body.message === "string"
        ? req.body.message.trim()
        : "";

      if (!Number.isSafeInteger(groupId) || groupId <= 0) {
        return res.status(400).json({ error: "Invalid group ID." });
      }

      if (!message || message.length > 5000) {
        return res.status(400).json({
          error: "Message must contain 1 to 5000 characters.",
        });
      }

      const membership = await pool.query(
        `SELECT 1
         FROM chat_group_members
         WHERE group_id = $1 AND user_id = $2`,
        [groupId, req.user.id]
      );

      if (membership.rows.length === 0) {
        return res.status(403).json({
          error: "Join this group before sending messages.",
        });
      }

      const result = await pool.query(
        `INSERT INTO group_messages (group_id, sender_id, message)
         VALUES ($1, $2, $3)
         RETURNING id, group_id, sender_id, message, created_at`,
        [groupId, req.user.id, message]
      );

      const userResult = await pool.query(
        `SELECT full_name FROM users WHERE id = $1`,
        [req.user.id]
      );

      res.status(201).json({
        message: "Message sent successfully.",
        data: {
          ...result.rows[0],
          sender_name: userResult.rows[0]?.full_name ?? "User",
        },
      });
    } catch (error) {
      console.error("Send group message error:", error.message);
      res.status(500).json({ error: "Could not send message." });
    }
  }
);

app.listen(PORT, () => {
  console.log(`ImpanoLink server running at http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  await pool.end();
  process.exit(0);
});