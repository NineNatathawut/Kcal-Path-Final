<template>
  <div class="login-container">
    <h1>ระบบบันทึกแคลอรี่ 🍽️</h1>
    <h2>เข้าสู่ระบบ</h2>
    
    <div class="form-group">
      <label>ชื่อผู้ใช้:</label>
      <input type="text" v-model="username" placeholder="กรอกชื่อผู้ใช้">
    </div>
    
    <div class="form-group">
      <label>รหัสผ่าน:</label>
      <input type="password" v-model="password" placeholder="กรอกรหัสผ่าน">
    </div>

    <button @click="login">เข้าสู่ระบบ</button>
    <hr>
    
    <p>ยังไม่มีบัญชีใช่ไหม? <button @click="goToRegister">สมัครสมาชิกเลย</button></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// ตัวแปรเก็บค่าที่ผู้ใช้พิมพ์
const username = ref('')
const password = ref('')

// เรียกใช้เครื่องมือเปลี่ยนหน้าของ Vue
const router = useRouter()

const login = async () => {
    if (username.value !== '' && password.value !== '') {
        alert('ยินดีต้อนรับคุณ ' + username.value + ' !')
        
        // 👉 แจกตั๋วลงในระบบ (จำลองว่าล็อกอินสำเร็จแล้ว)
        localStorage.setItem('isLoggedIn', 'true')
        
        // สั่งให้เปลี่ยนหน้าไปที่ Dashboard
        router.push('/dashboard') 
    } else {
        alert('กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบครับ!')
    }
}

const goToRegister = () => {
    // เดี๋ยวเราจะสร้างหน้า Register ต่อไป
    alert('เดี๋ยวพาไปหน้าสมัครสมาชิกครับ!')
}
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
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
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
}
button:hover {
  background-color: #45a049;
}
</style>