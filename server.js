const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '00000',
    database: 'calorie_tracker',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('❌ ไม่สามารถเชื่อมต่อฐานข้อมูลได้:', err);
        return;
    }
    console.log('✅ เชื่อมต่อฐานข้อมูล MySQL สำเร็จแล้ว!');
});

const PORT = 3000;

// ดึงข้อมูลอาหารทั้งหมด
app.get('/foods', (req, res) => {
    db.query('SELECT * FROM foods', (err, results) => {
        if (err) return res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลอาหารได้' });
        res.json(results);
    });
});

// สมัครสมาชิก
app.post('/register', async (req, res) => {
    try {
        const { username, password, email, weight, height, age, gender, activity_level, goal } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'กรุณากรอกข้อมูลสำคัญให้ครบ' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO users (username, password, email, weight, height, age, gender, activity_level, goal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [username, hashedPassword, email, weight, height, age, gender, activity_level, goal];
        
        db.query(sql, values, (err, result) => {
            if (err) {
                // 1. ปริ้นท์ Error ตัวจริงออกทางหน้าจอ Terminal ของหลังบ้าน
                console.error('🔥 MySQL Error (Register):', err);
                
                // 2. ส่ง Error จริงๆ กลับไปโชว์ที่หน้าเว็บ
                return res.status(500).json({ error: `Database ปฏิเสธ: ${err.message}` });
            }
            res.status(201).json({ message: '✅ สมัครสมาชิกสำเร็จ!', userId: result.insertId });
        });

    } catch (error) {
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
});

// เข้าสู่ระบบ (ล็อกอิน)
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'กรุณากรอก Username และ Password' });
        }

        const sql = 'SELECT * FROM users WHERE username = ?';
        db.query(sql, [username], async (err, results) => {
            if (err) return res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
            
            // ถ้าไม่พบ User ให้ตอบกลับ 401 ทันที
            if (results.length === 0) {
                return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
            }

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);
            
            // ถ้ารหัสผ่านผิด ให้ตอบกลับ 401 ทันที
            if (!isMatch) {
                return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
            }

            // ผ่านทุกด่าน ค่อยตอบ 200 OK
            res.status(200).json({
                message: 'เข้าสู่ระบบสำเร็จ!',
                user: { id: user.id, username: user.username, email: user.email }
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
});

// บันทึกอาหาร (เวอร์ชันจับผิด MySQL)
app.post('/food-logs', (req, res) => {
    const { user_id, food_id, quantity, meal_type, log_date } = req.body;
    
    // 1. แอบดูว่าข้อมูลส่งมาจากหน้าบ้านครบไหม
    console.log("📥 ข้อมูลที่ได้รับจากหน้าบ้าน:", req.body); 

    if (!user_id || !food_id || !meal_type || !log_date) {
        return res.status(400).json({ error: 'กรุณาส่งข้อมูลให้ครบถ้วน' });
    }
    
    const sql = `INSERT INTO food_logs (user_id, food_id, quantity, meal_type, log_date) VALUES (?, ?, ?, ?, ?)`;
    
    db.query(sql, [user_id, food_id, quantity || 1.00, meal_type, log_date], (err, result) => {
        if (err) {
            // 2. ถ้า Database พัง ให้ปริ้นท์ Error สีแดงๆ ออกมาดูหน้าตาหน่อย!
            console.error('🔥 MySQL Error แบบเต็มๆ:', err); 
            
            // ส่งสาเหตุที่แท้จริงกลับไปฟ้องหน้าบ้านด้วย
            return res.status(500).json({ error: `Database ปฏิเสธ: ${err.message}` }); 
        }
        res.status(201).json({ message: '✅ บันทึกมื้ออาหารสำเร็จ!', logId: result.insertId });
    });
});

// สรุปแคลอรี่
app.get('/daily-summary/:userId/:date', (req, res) => {
    const { userId, date } = req.params;
    const sql = `
        SELECT fl.id AS log_id, f.name AS food_name, fl.meal_type, fl.quantity,
               (f.calories * fl.quantity) AS total_calories, (f.protein * fl.quantity) AS total_protein,
               (f.carbs * fl.quantity) AS total_carbs, (f.fat * fl.quantity) AS total_fat
        FROM food_logs fl JOIN foods f ON fl.food_id = f.id
        WHERE fl.user_id = ? AND fl.log_date = ?
    `;
    db.query(sql, [userId, date], (err, results) => {
        if (err) return res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลสรุปรายวันได้' });
        
        let summary = { total_calories: 0, total_protein: 0, total_carbs: 0, total_fat: 0 };
        results.forEach(item => {
            summary.total_calories += parseFloat(item.total_calories);
            summary.total_protein += parseFloat(item.total_protein);
            summary.total_carbs += parseFloat(item.total_carbs);
            summary.total_fat += parseFloat(item.total_fat);
        });
        res.status(200).json({ date: date, summary: summary, logs: results });
    });
});

// ข้อมูลส่วนตัว
app.get('/users/:id', (req, res) => {
    const sql = `SELECT id, username, email, weight, height, age, gender, activity_level, goal FROM users WHERE id = ?`;
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้' });
        if (results.length === 0) return res.status(404).json({ error: 'ไม่พบข้อมูลผู้ใช้' });
        res.status(200).json(results[0]);
    });
});


// ดึงรายการอาหารของ "วันนี้" ตาม ID ผู้ใช้
app.get('/food-logs/:userId/today', (req, res) => {
    const userId = req.params.userId;
    
    // สร้างวันที่ของวันนี้ในรูปแบบ YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0]; 

    // ใช้คำสั่ง JOIN เพื่อเอาข้อมูลจาก 2 ตารางมารวมกัน
    const sql = `
        SELECT fl.id, fl.meal_type, fl.quantity, f.name, f.calories 
        FROM food_logs fl
        JOIN foods f ON fl.food_id = f.id
        WHERE fl.user_id = ? AND fl.log_date = ?
        ORDER BY fl.meal_type ASC
    `;
    
    db.query(sql, [userId, today], (err, results) => {
        if (err) {
            console.error('🔥 MySQL Error (ดึงข้อมูลวันนี้):', err);
            return res.status(500).json({ error: 'ไม่สามารถดึงรายการอาหารได้' });
        }
        res.json(results);
    });
});

// ลบรายการบันทึกอาหาร
app.delete('/food-logs/:id', (req, res) => {
    const logId = req.params.id;
    const sql = 'DELETE FROM food_logs WHERE id = ?';

    db.query(sql, [logId], (err, result) => {
        if (err) {
            console.error('🔥 MySQL Error (Delete Log):', err);
            return res.status(500).json({ error: 'ไม่สามารถลบรายการได้' });
        }
        res.json({ message: '🗑️ ลบรายการเรียบร้อยแล้ว' });
    });
});

// อัปเดตข้อมูลส่วนตัวผู้ใช้
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { weight, height, age, gender, activity_level, goal } = req.body;

    const sql = `
        UPDATE users 
        SET weight = ?, height = ?, age = ?, gender = ?, activity_level = ?, goal = ? 
        WHERE id = ?
    `;
    const values = [weight, height, age, gender, activity_level, goal, userId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('🔥 MySQL Error (Update User):', err);
            return res.status(500).json({ error: 'ไม่สามารถอัปเดตข้อมูลได้' });
        }
        res.json({ message: '✅ อัปเดตข้อมูลสำเร็จ!' });
    });
});

app.listen(PORT, () => {
    console.log(`Server เปิดทำงานแล้วที่ http://localhost:${PORT}`);
});