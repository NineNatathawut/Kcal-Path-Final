<template>
  <div class="register-container">
    <h1>📝 สมัครสมาชิกใหม่</h1>
    <p>เริ่มต้นเส้นทางสุขภาพที่ดีของคุณไปกับ Kcal-Path!</p>

    <div class="form-section">
      <h3>1. ข้อมูลบัญชี (จำเป็น)</h3>
      <div class="form-group">
        <label>ชื่อผู้ใช้ (Username):</label>
        <input type="text" v-model="form.username" placeholder="ตั้งชื่อผู้ใช้ของคุณ">
      </div>
      <div class="form-group">
        <label>อีเมล (Email):</label>
        <input type="email" v-model="form.email" placeholder="example@email.com">
      </div>
      <div class="form-group">
        <label>รหัสผ่าน (Password):</label>
        <input type="password" v-model="form.password" placeholder="ตั้งรหัสผ่าน">
      </div>
    </div>

    <div class="form-section">
      <h3>2. ข้อมูลสุขภาพพื้นฐาน</h3>
      
      <div class="row">
        <div class="form-group half">
          <label>น้ำหนัก (กก.):</label>
          <input type="number" v-model="form.weight" min="30" max="300">
        </div>
        <div class="form-group half">
          <label>ส่วนสูง (ซม.):</label>
          <input type="number" v-model="form.height" min="100" max="250">
        </div>
      </div>

      <div class="row">
        <div class="form-group half">
          <label>อายุ (ปี):</label>
          <input type="number" v-model="form.age" min="10" max="100">
        </div>
        <div class="form-group half">
          <label>เพศ:</label>
          <select v-model="form.gender">
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>ระดับการออกกำลังกาย:</label>
        <select v-model="form.activity_level">
          <option value="low">น้อย (นั่งทำงานเป็นส่วนใหญ่, ไม่ออกกำลังกาย)</option>
          <option value="medium">ปานกลาง (ออกกำลังกาย 3-5 วัน/สัปดาห์)</option>
          <option value="high">มาก (ออกกำลังกาย 6-7 วัน/สัปดาห์ หรือใช้แรงงาน)</option>
        </select>
      </div>

      <div class="form-group highlight-box">
        <label>🎯 เป้าหมายของคุณคืออะไร?</label>
        <select v-model="form.goal">
          <option value="lose">📉 ลดน้ำหนัก (เน้นลดไขมัน)</option>
          <option value="maintain">⚖️ รักษาน้ำหนัก (สุขภาพดี หุ่นคงที่)</option>
          <option value="gain">💪 เพิ่มกล้ามเนื้อ (เพิ่มน้ำหนัก)</option>
        </select>
      </div>
    </div>

    <button @click="register" class="btn-primary">ยืนยันการสมัครสมาชิก</button>
    
    <hr>
    <p class="login-link">
      มีบัญชีอยู่แล้วใช่ไหม? 
      <button @click="goToLogin" class="btn-link">เข้าสู่ระบบที่นี่</button>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ✅ แก้ไข 4: เปลี่ยนค่าเริ่มต้นให้ตรงกับภาษาอังกฤษ
const form = ref({
  username: '',
  email: '',
  password: '',
  weight: 60,
  height: 165,
  age: 25,
  gender: 'male',
  activity_level: 'medium',
  goal: 'lose' 
})

// ฟังก์ชันสมัครสมาชิก
const register = async () => {
  if (!form.value.username || !form.value.email || !form.value.password) {
    alert('กรุณากรอก ชื่อผู้ใช้, อีเมล และรหัสผ่าน ให้ครบถ้วนครับ!')
    return
  }

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    const data = await response.json()

    if (response.ok) {
      alert('🎉 สมัครสมาชิกสำเร็จ! ระบบจะพาคุณเข้าสู่ระบบทันที')
      
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userId', data.userId)
      localStorage.setItem('username', form.value.username)
      
      router.push('/dashboard')
    } else {
      alert(`❌ สมัครไม่สำเร็จ: ${data.error}`)
    }
  } catch (error) {
    console.error('Register Error:', error)
    alert('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ โปรดตรวจสอบว่ารัน backend หรือยัง')
  }
}

// ไปหน้าล็อกอิน
const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.register-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}
h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 5px;
}
p {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 25px;
}
.form-section {
  background-color: #f9f9f9;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #eee;
}
.form-section h3 {
  margin-top: 0;
  color: #4CAF50;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 5px;
}
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
.row {
  display: flex;
  gap: 15px;
}
.half {
  flex: 1;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}
input, select {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
}
input:focus, select:focus {
  border-color: #4CAF50;
  outline: none;
}
.highlight-box {
  background-color: #e8f5e9;
  padding: 15px;
  border-radius: 8px;
  border: 1px dashed #4CAF50;
}
.btn-primary {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}
.btn-primary:hover {
  background-color: #45a049;
}
.login-link {
  margin-top: 15px;
}
.btn-link {
  background: none;
  border: none;
  color: #2196F3;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
}
.btn-link:hover {
  color: #0b7dda;
}
</style>