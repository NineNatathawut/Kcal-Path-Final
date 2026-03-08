<template>
  <div class="history-container">
    <h1>📅 ประวัติการกินย้อนหลัง</h1>
    
    <div class="header-actions">
      <button @click="router.push('/dashboard')" class="btn-back">⬅️ กลับหน้าหลัก</button>
    </div>
    <hr>

    <div class="date-picker-section">
      <label for="historyDate" style="font-size: 1.2em; font-weight: bold; margin-right: 10px;">เลือกวันที่:</label>
      <input 
        type="date" 
        id="historyDate" 
        v-model="selectedDate" 
        @change="fetchHistoryData"
        class="date-input"
      >
    </div>

    <div class="summary-card">
      <h2>สรุปแคลอรี่ประจำวันที่ {{ formatDate(selectedDate) }}</h2>
      <p>แคลอรี่รวม: <b :style="{ color: totalCalories > userTDEE ? 'red' : 'green' }">
        {{ totalCalories }} / {{ userTDEE }} kcal
      </b></p>
      
      <div class="progress-container">
        <div 
          class="progress-bar" 
          :class="{ 'over-limit': totalCalories > userTDEE }"
          :style="{ width: Math.min((totalCalories / (userTDEE || 1)) * 100, 100) + '%' }"
        ></div>
      </div>

      <p class="macros">
        🥩 โปรตีน: {{ totalProtein }}g | 🍚 คาร์บ: {{ totalCarbs }}g | 🥑 ไขมัน: {{ totalFat }}g
      </p>
    </div>

    <h3>🍽️ รายการอาหาร:</h3>
    <ul>
        <li v-if="foodLogs.length === 0" class="empty-state">
            ไม่พบข้อมูลการกินของวันนี้ (สงสัยจะลืมบันทึก หรืออดอาหารนะเนี่ย! 😅)
        </li>
        <li v-for="food in foodLogs" :key="food.log_id" class="food-item">
            <div>
                <b>[{{ formatMeal(food.meal_type) }}]</b> {{ food.food_name }}
                <br>
                <small>จำนวน: {{ food.quantity }} | พลังงาน: {{ food.total_calories }} kcal</small>
            </div>
        </li>
    </ul>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ตัวแปรเก็บวันที่ (ค่าเริ่มต้นคือวันนี้แบบ YYYY-MM-DD)
const today = new Date().toISOString().split('T')[0]
const selectedDate = ref(today)

// ตัวแปรเก็บข้อมูล
const userTDEE = ref(0)
const totalCalories = ref(0)
const totalProtein = ref(0)
const totalCarbs = ref(0)
const totalFat = ref(0)
const foodLogs = ref([])

// วุ้นแปลภาษามื้ออาหาร
const formatMeal = (mealStr) => {
  const meals = { 'breakfast': 'มื้อเช้า', 'lunch': 'มื้อเที่ยง', 'dinner': 'มื้อเย็น', 'snack': 'ของว่าง' }
  return meals[mealStr] || mealStr
}

// แปลงวันที่ให้ดูสวยขึ้น (เช่น 2023-10-25 -> 25/10/2023)
const formatDate = (dateString) => {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

// ฟังก์ชันดึงข้อมูลเมื่อเปลี่ยนวัน
const fetchHistoryData = async () => {
  const userId = localStorage.getItem('userId')
  if (!userId) {
    router.push('/login')
    return
  }

  try {
    // 1. ดึง TDEE ของ User มาก่อน (จะได้รู้เป้าหมาย)
    const userRes = await fetch(`http://localhost:3000/users/${userId}`)
    if (userRes.ok) {
      const userData = await userRes.json()
      // คำนวณ TDEE คร่าวๆ (เหมือนใน Dashboard)
      let bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age)
      if (userData.gender === 'ชาย' || userData.gender === 'male') bmr += 5; else bmr -= 161;
      const multipliers = { 'low': 1.2, 'medium': 1.375, 'high': 1.55, 'น้อย': 1.2, 'ปานกลาง': 1.375, 'มาก': 1.55 }
      userTDEE.value = Math.round(bmr * (multipliers[userData.activity_level] || 1.2))
    }

    // 2. ดึงข้อมูลอาหารตาม "วันที่เลือก (selectedDate)"
    const summaryRes = await fetch(`http://localhost:3000/daily-summary/${userId}/${selectedDate.value}`)
    if (summaryRes.ok) {
      const summaryData = await summaryRes.json()
      totalCalories.value = summaryData.summary.total_calories || 0
      totalProtein.value = summaryData.summary.total_protein || 0
      totalCarbs.value = summaryData.summary.total_carbs || 0
      totalFat.value = summaryData.summary.total_fat || 0
      foodLogs.value = summaryData.logs || []
    }
  } catch (error) {
    console.error('Error fetching history:', error)
  }
}

// โหลดข้อมูลครั้งแรกเมื่อเปิดหน้า
onMounted(() => {
  fetchHistoryData()
})
</script>

<style scoped>
.history-container { max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif; }
.header-actions { margin-bottom: 20px; }
.btn-back { background-color: #607d8b; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; }
.date-picker-section { margin: 20px 0; text-align: center; background: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #ddd; }
.date-input { padding: 8px 12px; font-size: 16px; border: 1px solid #ccc; border-radius: 5px; cursor: pointer; }
.summary-card { background-color: #f0f8ff; padding: 15px; border-radius: 8px; border: 1px solid #b0d4f1; margin-bottom: 20px; text-align: center; }
.macros { font-size: 0.9em; color: #555; margin-top: 10px; }
.progress-container { background-color: #e0e0e0; border-radius: 10px; height: 15px; width: 100%; margin: 10px 0; overflow: hidden; }
.progress-bar { background-color: #4CAF50; height: 100%; transition: width 0.3s; }
.over-limit { background-color: #ff4d4d !important; }
.food-item { margin-bottom: 10px; padding: 10px; border-bottom: 1px solid #eee; background: #fff; border-radius: 4px; }
.empty-state { color: #888; text-align: center; font-style: italic; padding: 20px; }
</style>