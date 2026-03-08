<template>
  <div class="home-container">
    <h1>🍏 ยินดีต้อนรับสู่ Kcal-Path</h1>
    <p>แอปพลิเคชันที่จะช่วยให้คุณติดตามการกิน และไปถึงเป้าหมายสุขภาพได้ง่ายๆ</p>
    
    <div class="features">
      <h3>✨ สิ่งที่คุณทำได้ในแอปนี้:</h3>
      <ul>
        <li>บันทึกอาหารที่กินในแต่ละวัน</li>
        <li>คำนวณ BMI, BMR และ TDEE ของคุณ</li>
        <li>ดูกราฟและสรุปสารอาหาร (โปรตีน, คาร์บ, ไขมัน)</li>
      </ul>
    </div>

    <div class="actions">
      <button class="btn-primary" @click="goToLogin">เริ่มต้นใช้งาน (ล็อกอิน)</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  // สั่งให้เปลี่ยนหน้าไปที่ /login
  router.push('/login')
}
</script>

<style scoped>
.home-container {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.features {
  text-align: left;
  background-color: #f8fcf8;
  padding: 15px 30px;
  border-radius: 8px;
  margin: 20px 0;
}
.btn-primary {
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
}
.btn-primary:hover {
  background-color: #45a049;
}
</style>