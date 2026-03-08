<template>
  <div class="dashboard-container">
    <h1>แผงควบคุม (Dashboard)</h1>
    <button @click="logout" style="background-color: #ff4d4d; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">ออกจากระบบ</button>
    <hr>

    <h2>👤 ข้อมูลของคุณ: <span>{{ userName }}</span></h2>
    <p>
        น้ำหนัก: <span>{{ userWeight }}</span> กก. | 
        ส่วนสูง: <span>{{ userHeight }}</span> ซม. |
        อายุ: <span>{{ userAge }}</span> ปี |
        เพศ: <span>{{ formatGender(userGender) }}</span>
    </p>

    <div style="background-color: #f0f8ff; padding: 15px; border-radius: 8px; border: 1px solid #b0d4f1; margin-bottom: 20px;">
        <h3 style="margin-top: 0;">ข้อมูลสุขภาพพื้นฐานของคุณ</h3>
        <p><b>BMI (ดัชนีมวลกาย):</b> <span>{{ userBMI }}</span> <span style="font-weight: bold; color: #555;">{{ bmiMeaning }}</span></p>
        <p><b>BMR (พลังงานพื้นฐานตอนพัก):</b> <span>{{ userBMR }}</span> kcal/วัน</p>
        <p><b>TDEE (แคลอรี่เป้าหมายต่อวัน):</b> <span>{{ userTDEE }}</span> kcal/วัน</p>
        <p><b>เป้าหมายของคุณ:</b> <span style="color: blue; font-weight: bold;">{{ formatGoal(userGoal) }}</span></p>
    </div>
    <hr>

    <h2>สรุปแคลอรี่วันนี้ ({{ todayDateDisplay }})</h2>
    <p>แคลอรี่รวม: <b style="color: green;"><span>{{ totalCalories }}</span> / {{ userTDEE }} kcal</b></p>

    <div class="progress-container">
  <div 
    class="progress-bar" 
    :class="{ 'over-limit': totalCalories > userTDEE }"
    :style="{ width: Math.min((totalCalories / userTDEE) * 100, 100) + '%' }"
  >
    {{ Math.round((totalCalories / userTDEE) * 100) }}%
  </div>
</div>

<p v-if="totalCalories > userTDEE" style="color: red; font-weight: bold;">
  ⚠️ วันนี้คุณกินเกินเป้าหมายแล้วนะ! พรุ่งนี้เอาใหม่!
</p>
<p v-else style="color: #666;">
  คุณยังกินได้อีก {{ userTDEE - totalCalories }} kcal
</p>

    <p>โปรตีน: <span>{{ totalProtein }}</span> g | คาร์บ: <span>{{ totalCarbs }}</span> g | ไขมัน: <span>{{ totalFat }}</span> g</p>

    <h3>รายการอาหารที่กินวันนี้:</h3>
    <ul>
        <li v-if="foodLogs.length === 0" style="color: #888;">ยังไม่มีข้อมูลอาหารของวันนี้... (ลองไปเพิ่มในฐานข้อมูลดูสิ!)</li>
        <li v-for="food in foodLogs" :key="food.log_id">
            [{{ formatMeal(food.meal_type) }}] {{ food.food_name }} - {{ food.total_calories }} kcal 
            <span style="font-size: 0.9em; color: gray;">(P: {{ food.total_protein }}g | C: {{ food.total_carbs }}g | F: {{ food.total_fat }}g)</span>
        </li>
        <li v-for="food in foodLogs" :key="food.log_id" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding: 5px 0;">
    <div>
        <b>[{{ formatMeal(food.meal_type) }}]</b> {{ food.food_name }} - {{ food.total_calories }} kcal 
        <br>
        <span style="font-size: 0.8em; color: gray;">(P: {{ food.total_protein }}g | C: {{ food.total_carbs }}g | F: {{ food.total_fat }}g)</span>
    </div>
    
    <button @click="deleteLog(food.log_id)" style="background: #ff4d4d; color: white; border: none; border-radius: 4px; padding: 2px 8px; cursor: pointer; font-size: 12px;">ลบ</button>
</li>
    </ul>

    <hr>
    <button @click="goToAddFood" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">+ บันทึกมื้ออาหารใหม่</button>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userName = ref('กำลังโหลด...')
const userWeight = ref(0)
const userHeight = ref(0)
const userAge = ref(0)
const userGender = ref('-')
const userGoal = ref('-')
const userBMI = ref(0)
const bmiMeaning = ref('')
const userBMR = ref(0)
const userTDEE = ref(0)

const todayDateDisplay = ref(new Date().toLocaleDateString('th-TH'))
const totalCalories = ref(0)
const totalProtein = ref(0)
const totalCarbs = ref(0)
const totalFat = ref(0)
const foodLogs = ref([])

// วุ้นแปลภาษา 3 สหาย
const formatGender = (genderStr) => {
  if (genderStr === 'male') return 'ชาย'
  if (genderStr === 'female') return 'หญิง'
  return genderStr
}

const formatGoal = (goalStr) => {
  const goals = {
    'lose': '📉 ลดน้ำหนัก (เน้นลดไขมัน)',
    'maintain': '⚖️ รักษาน้ำหนัก (สุขภาพดี หุ่นคงที่)',
    'gain': '💪 เพิ่มกล้ามเนื้อ (เพิ่มน้ำหนัก)'
  }
  return goals[goalStr] || goalStr
}

const formatMeal = (mealStr) => {
  const meals = {
    'breakfast': 'มื้อเช้า',
    'lunch': 'มื้อเที่ยง',
    'dinner': 'มื้อเย็น',
    'snack': 'ของว่าง'
  }
  return meals[mealStr] || mealStr
}

const calculateHealth = (weight, height, age, gender, activityLevel) => {
    const heightM = height / 100
    const bmi = weight / (heightM * heightM)
    userBMI.value = bmi.toFixed(2)

    if (bmi < 18.5) bmiMeaning.value = '(น้ำหนักน้อย)'
    else if (bmi < 23) bmiMeaning.value = '(สมส่วน)'
    else if (bmi < 25) bmiMeaning.value = '(น้ำหนักเกิน)'
    else bmiMeaning.value = '(โรคอ้วน)'

    let bmr = (10 * weight) + (6.25 * height) - (5 * age)
    // เช็คทั้งไทยและอังกฤษ เพื่อความชัวร์
    if (gender === 'ชาย' || gender === 'male') bmr += 5; else bmr -= 161;
    userBMR.value = Math.round(bmr)

    // ปรับปรุงการคำนวณ TDEE ให้รองรับค่าภาษาอังกฤษ (low, medium, high)
    const multipliers = { 
      'น้อย': 1.2, 'ปานกลาง': 1.375, 'มาก': 1.55,
      'low': 1.2, 'medium': 1.375, 'high': 1.55 
    }
    const factor = multipliers[activityLevel] || 1.2
    userTDEE.value = Math.round(bmr * factor)
}

const fetchDashboardData = async () => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
        router.push('/login')
        return
    }

    try {
        // 1. ดึงข้อมูล User
        const userRes = await fetch(`http://localhost:3000/users/${userId}`)
        if (userRes.ok) {
            const userData = await userRes.json()
            userName.value = userData.username
            userWeight.value = userData.weight
            userHeight.value = userData.height
            userAge.value = userData.age
            userGender.value = userData.gender
            userGoal.value = userData.goal
            calculateHealth(userData.weight, userData.height, userData.age, userData.gender, userData.activity_level)
        }

        // 2. ดึงข้อมูลอาหารวันนี้
        const d = new Date()
        const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
        
        const summaryRes = await fetch(`http://localhost:3000/daily-summary/${userId}/${today}`)
        if (summaryRes.ok) {
            const summaryData = await summaryRes.json()
            totalCalories.value = summaryData.summary.total_calories || 0
            totalProtein.value = summaryData.summary.total_protein || 0
            totalCarbs.value = summaryData.summary.total_carbs || 0
            totalFat.value = summaryData.summary.total_fat || 0
            foodLogs.value = summaryData.logs || []
        } else {
             console.warn('API daily-summary อาจยังไม่ได้สร้างใน server.js')
        }
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

const logout = () => {
    localStorage.clear()
    router.push('/login')
}

const goToAddFood = () => {
    router.push('/add-food')
}

onMounted(() => {
    fetchDashboardData()
})

const deleteLog = async (logId) => {
    console.log("🆔 กำลังจะลบ Log ID:", logId);
  if (!confirm('คุณแน่ใจนะว่าจะลบรายการนี้?')) return;

  try {
    const response = await fetch(`http://localhost:3000/food-logs/${logId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      // พอลบสำเร็จ ให้เรียกโหลดข้อมูลใหม่ทันทีเพื่ออัปเดตตัวเลขแคลอรี่
      fetchDashboardData(); 
    } else {
      alert('ลบไม่สำเร็จ กรุณาลองใหม่');
    }
  } catch (error) {
    console.error('Delete Error:', error);
  }
}
</script>



<style scoped>
.dashboard-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: sans-serif;
}
span { font-weight: bold; color: #2c3e50; }
li { margin-bottom: 8px; }

/* สไตล์ของแถบพลังงาน */
.progress-container {
  background-color: #e0e0e0;
  border-radius: 10px;
  height: 25px;
  width: 100%;
  margin: 10px 0;
  overflow: hidden;
}

.progress-bar {
  background-color: #4CAF50; /* สีเขียว */
  height: 100%;
  transition: width 0.5s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
}

/* ถ้ากินเกิน ให้เปลี่ยนเป็นสีแดง */
.over-limit {
  background-color: #ff4d4d !important;
}

</style>