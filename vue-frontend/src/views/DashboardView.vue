<template>
  <div class="dashboard-container">
    
    <h1>แผงควบคุม (Dashboard)</h1>
    <button @click="logout">ออกจากระบบ</button>
    <hr>

    <h2>👤 ข้อมูลของคุณ: <span>{{ userName }}</span></h2>
    <p>
        น้ำหนัก: <span>{{ userWeight }}</span> กก. | 
        ส่วนสูง: <span>{{ userHeight }}</span> ซม. |
        อายุ: <span>{{ userAge }}</span> ปี |
        เพศ: <span>{{ userGender }}</span>
    </p>

    <div style="background-color: #f0f8ff; padding: 15px; border-radius: 8px; border: 1px solid #b0d4f1; margin-bottom: 20px;">
        <h3 style="margin-top: 0;">ข้อมูลสุขภาพพื้นฐานของคุณ</h3>
        <p><b>BMI (ดัชนีมวลกาย):</b> <span>{{ userBMI }}</span> <span style="font-weight: bold; color: #555;">{{ bmiMeaning }}</span></p>
        <p><b>BMR (พลังงานพื้นฐานเผาผลาญตอนพัก):</b> <span>{{ userBMR }}</span> kcal/วัน</p>
        <p><b>TDEE (เป้าหมายแคลอรี่ที่ควรได้รับต่อวัน):</b> <span>{{ userTDEE }}</span> kcal/วัน</p>
        <p><b>เป้าหมายของคุณ:</b> <span style="color: blue; font-weight: bold;">{{ userGoal }}</span></p>
    </div>
    <hr>

    <h2>สรุปแคลอรี่วันนี้ ({{ todayDate }})</h2>
    <p>แคลอรี่รวม: <b><span>{{ totalCalories }}</span> kcal</b></p>
    <p>โปรตีน: <span>{{ totalProtein }}</span> g | คาร์บ: <span>{{ totalCarbs }}</span> g | ไขมัน: <span>{{ totalFat }}</span> g</p>

    <h3>รายการอาหารที่กินวันนี้:</h3>
    <ul>
        <li v-if="foodLogs.length === 0">ยังไม่มีข้อมูลอาหาร...</li>
        <li v-for="food in foodLogs" :key="food.id">
            {{ food.name }} - {{ food.calories }} kcal
        </li>
    </ul>

    <hr>
    <button @click="goToAddFood">+ บันทึกมื้ออาหารใหม่</button>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 1. สร้างตัวแปร (ref) มารับค่าต่างๆ เตรียมไว้โชว์บนหน้าเว็บ
const userName = ref('กำลังโหลด...')
const userWeight = ref('-')
const userHeight = ref('-')
const userAge = ref('-')
const userGender = ref('-')

const userBMI = ref('-')
const bmiMeaning = ref('')
const userBMR = ref('-')
const userTDEE = ref('-')
const userGoal = ref('-')

const todayDate = ref(new Date().toLocaleDateString('th-TH'))
const totalCalories = ref(0)
const totalProtein = ref(0)
const totalCarbs = ref(0)
const totalFat = ref(0)

const foodLogs = ref([]) // เก็บรายการอาหารเป็น Array แบบว่างๆ ไว้ก่อน

// 2. ฟังก์ชันจำลองการดึงข้อมูล (เดี๋ยวเราค่อยเอา fetch API ของจริงมาใส่)
const fetchDashboardData = () => {
    // สมมติว่าดึงข้อมูลจาก Backend ของคุณมาสำเร็จแล้ว เราแค่กำหนดค่าให้ตัวแปรแบบนี้:
    // ต้องเติม .value ต่อท้ายชื่อตัวแปรเสมอ เมื่อเขียนใน <script>
    userName.value = 'สมชาย ใจดี' 
    userWeight.value = 75
    userHeight.value = 175
    userAge.value = 28
    userGender.value = 'ชาย'
    
    userBMI.value = 24.49
    bmiMeaning.value = '(สมส่วน)'
    userBMR.value = 1750
    userTDEE.value = 2400
    userGoal.value = 'ลดน้ำหนัก'
}

// 3. ฟังก์ชันปุ่มกดต่างๆ
const logout = () => {
    alert('ระบบกำลังออกจากระบบ...')
}

const goToAddFood = () => {
    alert('เดี๋ยวจะพาไปหน้าบันทึกอาหารแบบ Vue นะ!')
}

// 4. onMounted คือคำสั่งที่บอกว่า "พอเปิดหน้าเว็บนี้ขึ้นมาปุ๊บ ให้ทำฟังก์ชันนี้ทันที"
onMounted(() => {
    fetchDashboardData() // สั่งให้ดึงข้อมูลทันทีที่เปิดหน้า
})
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}
</style>