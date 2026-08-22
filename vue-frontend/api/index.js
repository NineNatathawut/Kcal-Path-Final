require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());


// 1. ตั้งค่า Database (Supabase) - Serverless-friendly config

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 1,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000,
});

// Helper function to get client with error handling
async function getDbClient() {
  try {
    const client = await pool.connect();
    return client;
  } catch (err) {
    console.error('[DB CONNECTION ERROR]', err);
    throw new Error('Database connection failed');
  }
}


// 2. API: ระบบผู้ใช้ (Users & Auth)


// สมัครสมาชิก
app.post('/api/register', async (req, res) => {
    let client;
    try {
        const { username, password, email, weight, height, age, gender, activity_level, goal } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'กรุณากรอกข้อมูลสำคัญให้ครบ' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const sql = `
            INSERT INTO users (username, password, email, weight, height, age, gender, activity_level, goal) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING id, username
        `;
        const values = [username, hashedPassword, email, weight, height, age, gender, activity_level, goal];
        
        client = await getDbClient();
        const result = await client.query(sql, values);
        res.status(201).json({ message: '✅ สมัครสมาชิกสำเร็จ!', userId: result.rows[0].id });

    } catch (error) {
        console.error('[DB ERROR] Register:', error);
        res.status(500).json({ error: 'ชื่อผู้ใช้หรืออีเมลนี้อาจถูกใช้ไปแล้ว' });
    } finally {
        if (client) client.release();
    }
});

// เข้าสู่ระบบ
app.post('/api/login', async (req, res) => {
    let client;
    try {
        const { username, password } = req.body;
        client = await getDbClient();
        const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'ไม่พบชื่อผู้ใช้นี้' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ error: 'รหัสผ่านไม่ถูกต้อง' });
        }

        res.json({
            message: 'เข้าสู่ระบบสำเร็จ!',
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error('[DB ERROR] Login:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    } finally {
        if (client) client.release();
    }
});

// ดึงข้อมูลส่วนตัว
app.get('/api/users/:id', async (req, res) => {
    let client;
    try {
        client = await getDbClient();
        const result = await client.query('SELECT id, username, email, weight, height, age, gender, activity_level, goal FROM users WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'ไม่พบผู้ใช้' });
        res.json(result.rows[0]);
    } catch (error) {
        console.error('[DB ERROR] Get User:', error);
        res.status(500).json({ error: 'ดึงข้อมูลล้มเหลว' });
    } finally {
        if (client) client.release();
    }
});

// อัปเดตข้อมูลส่วนตัว
app.put('/api/users/:id', async (req, res) => {
    let client;
    try {
        const { weight, height, age, gender, activity_level, goal } = req.body;
        const sql = `
            UPDATE users SET weight=$1, height=$2, age=$3, gender=$4, activity_level=$5, goal=$6 
            WHERE id=$7
        `;
        client = await getDbClient();
        await client.query(sql, [weight, height, age, gender, activity_level, goal, req.params.id]);
        res.json({ message: '✅ อัปเดตข้อมูลสำเร็จ!' });
    } catch (error) {
        console.error('[DB ERROR] Update User:', error);
        res.status(500).json({ error: 'อัปเดตล้มเหลว' });
    } finally {
        if (client) client.release();
    }
});


// 3. API: รายการอาหาร (Foods)


// ดึงรายการอาหารทั้งหมด
app.get('/api/foods', async (req, res) => {
    let client;
    try {
        client = await getDbClient();
        const result = await client.query('SELECT * FROM foods ORDER BY name ASC');
        res.json(result.rows);
    } catch (err) {
        console.error('[DB ERROR] Get Foods:', err);
        res.status(500).json({ error: "ดึงข้อมูลอาหารไม่ได้" });
    } finally {
        if (client) client.release();
    }
});

// เพิ่มเมนูอาหารใหม่
app.post('/api/foods', async (req, res) => {
    let client;
    try {
        const { name, calories, protein, carbs, fat } = req.body;
        const sql = 'INSERT INTO foods (name, calories, protein, carbs, fat) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        client = await getDbClient();
        const result = await client.query(sql, [name, calories, protein || 0, carbs || 0, fat || 0]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('[DB ERROR] Add Food:', err);
        res.status(500).json({ error: "เพิ่มอาหารไม่ได้" });
    } finally {
        if (client) client.release();
    }
});


// 4. API: บันทึกการกิน (Food Logs)

// บันทึกมื้ออาหาร
app.post('/api/food-logs', async (req, res) => {
    let client;
    try {
        const { user_id, food_id, quantity, meal_type, log_date } = req.body;
        const sql = `INSERT INTO food_logs (user_id, food_id, quantity, meal_type, log_date) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
        client = await getDbClient();
        const result = await client.query(sql, [user_id, food_id, quantity || 1, meal_type, log_date]);
        res.status(201).json({ message: '✅ บันทึกสำเร็จ!', logId: result.rows[0].id });
    } catch (err) {
        console.error('[DB ERROR] Add Food Log:', err);
        res.status(500).json({ error: err.message });
    } finally {
        if (client) client.release();
    }
});

// ลบบันทึก
app.delete('/api/food-logs/:id', async (req, res) => {
    let client;
    try {
        client = await getDbClient();
        await client.query('DELETE FROM food_logs WHERE id = $1', [req.params.id]);
        res.json({ message: '🗑️ ลบรายการแล้ว' });
    } catch (err) {
        console.error('[DB ERROR] Delete Food Log:', err);
        res.status(500).json({ error: 'ลบไม่สำเร็จ' });
    } finally {
        if (client) client.release();
    }
});

// สรุปรายวัน (ใช้ SQL SUM เพื่อความแม่นยำและรวดเร็ว)
app.get('/api/daily-summary/:userId/:date', async (req, res) => {
    let client;
    try {
        const { userId, date } = req.params;
        const sql = `
            SELECT fl.id AS log_id, f.name AS food_name, fl.meal_type, fl.quantity,
                   (f.calories * fl.quantity) AS total_calories,
                   (f.protein * fl.quantity) AS total_protein,
                   (f.carbs * fl.quantity) AS total_carbs,
                   (f.fat * fl.quantity) AS total_fat
            FROM food_logs fl 
            JOIN foods f ON fl.food_id = f.id
            WHERE fl.user_id = $1 AND fl.log_date::date = $2::date
        `;
        client = await getDbClient();
        const result = await client.query(sql, [userId, date]);
        const logs = result.rows;

        let summary = { total_calories: 0, total_protein: 0, total_carbs: 0, total_fat: 0 };
        logs.forEach(row => {
            summary.total_calories += Number(row.total_calories);
            summary.total_protein += Number(row.total_protein);
            summary.total_carbs += Number(row.total_carbs);
            summary.total_fat += Number(row.total_fat);
        });

        summary.total_protein = Math.round(summary.total_protein * 10) / 10;
        summary.total_carbs = Math.round(summary.total_carbs * 10) / 10;
        summary.total_fat = Math.round(summary.total_fat * 10) / 10;
        summary.total_calories = Math.round(summary.total_calories);

        res.json({ date, summary, logs });
    } catch (err) {
        console.error('[DB ERROR] Daily Summary:', err);
        res.status(500).json({ error: 'ดึงข้อมูลสรุปไม่ได้' });
    } finally {
        if (client) client.release();
    }
});

// Health check endpoint for Vercel monitoring
app.get('/api/health', async (req, res) => {
    let client;
    try {
        client = await getDbClient();
        await client.query('SELECT 1');
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    } catch (error) {
        console.error('[HEALTH CHECK ERROR]', error);
        res.status(503).json({ status: 'error', error: error.message, timestamp: new Date().toISOString() });
    } finally {
        if (client) client.release();
    }
});


// 5. รัน Server
// Export App ให้ Vercel Serverless นำไปใช้งาน
module.exports = app;

// Graceful shutdown for local development
if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });

  // Graceful shutdown handlers
  const shutdown = async (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    try {
      await pool.end();
      console.log('Database pool closed.');
      server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });
    } catch (err) {
      console.error('Error during shutdown:', err);
      process.exit(1);
    }
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}