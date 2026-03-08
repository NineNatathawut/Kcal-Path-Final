<template>
  <div class="login-container">
    <h1>ระบบบันทึกแคลอรี่ 🍽️</h1>
    <h2>เข้าสู่ระบบ</h2>
    
    <div class="form-group">
      <label>ชื่อผู้ใช้:</label>
      <input type="text" v-model="username" placeholder="กรอกชื่อผู้ใช้" @keyup.enter="login">
    </div>
    
    <div class="form-group">
      <label>รหัสผ่าน:</label>
      <input type="password" v-model="password" placeholder="กรอกรหัสผ่าน" @keyup.enter="login">
    </div>

    <button @click="login">เข้าสู่ระบบ</button>
    <hr>
    
    <p>ยังไม่มีบัญชีใช่ไหม? <button @click="goToRegister" class="btn-register">สมัครสมาชิกเลย</button></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  if (!username.value || !password.value) {
    alert('กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน');
    return;
  }

  // ล้างข้อมูลเก่าทิ้งก่อน ป้องกันการจำค่าจากครั้งที่แล้ว
  localStorage.clear();

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ ล็อกอินผ่าน (Server ส่งสถานะ 200)
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', data.user.id); 
      localStorage.setItem('username', data.user.username);
      
      alert('ยินดีต้อนรับครับ!');
      router.push('/dashboard');
    } else {
      // ❌ ล็อกอินไม่ผ่าน (Server ส่งสถานะ 401)
      password.value = ''; // ล้างช่องรหัสผ่าน
      alert(data.error || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ โปรดเช็คว่ารัน server.js หรือยัง');
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
}
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
}
button:hover {
  background-color: #45a049;
}
.btn-register {
  background-color: transparent;
  color: #4CAF50;
  width: auto;
  padding: 0;
  font-size: 14px;
  text-decoration: underline;
}
.btn-register:hover {
  background-color: transparent;
  color: #388E3C;
}
</style>