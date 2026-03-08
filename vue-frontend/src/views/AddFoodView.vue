<template>
  <div class="add-food-container">
    <h1> บันทึกมื้ออาหาร</h1>
    <p>เพิ่มรายการอาหารที่คุณกินในวันนี้</p>

    <div class="form-group">
      <label>วันที่:</label>
      <input type="date" v-model="logDate">
    </div>

    <div class="form-group">
      <label>มื้ออาหาร:</label>
      <select v-model="mealType">
        <option value="breakfast">มื้อเช้า</option>
        <option value="lunch">มื้อเที่ยง</option>
        <option value="dinner">มื้อเย็น</option>
        <option value="snack">ของว่าง</option>
      </select>
    </div>

    <div class="form-group">
      <label>ค้นหาและเลือกอาหาร:</label>

      <div v-if="!selectedFood">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder=" พิมพ์ชื่ออาหารเพื่อค้นหา..." 
          class="search-input"
        >
        
        <ul class="search-results" v-if="searchQuery.trim() !== ''">
          <li v-if="filteredFoods.length === 0" class="no-result">
            ❌ ไม่พบอาหารที่ค้นหา
          </li>
          <li 
            v-for="food in filteredFoods" 
            :key="food.id" 
            @click="selectFood(food)"
          >
            <b>{{ food.name }}</b> <span class="cal-badge">{{ food.calories }} kcal</span>
          </li>
        </ul>
      </div>

      <div v-else class="selected-food-box">
        <div>
          <p style="margin: 0; font-weight: bold; color: #2e7d32;">✅ {{ selectedFood.name }}</p>
          <p style="margin: 0; font-size: 0.9em; color: #555;">{{ selectedFood.calories }} kcal</p>
        </div>
        <button @click="clearSelection" class="btn-clear">เปลี่ยนอาหาร</button>
      </div>
    </div>

    <div class="form-group">
      <label>จำนวน (จาน/ชิ้น):</label>
      <input type="number" v-model="quantity" step="0.5" min="0.1">
    </div>

    <div class="button-group">
      <button @click="submitFoodLog" class="btn-submit">💾 บันทึกข้อมูล</button>
      <button @click="goBack" class="btn-cancel">❌ ยกเลิก</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const logDate = ref(new Date().toLocaleDateString('sv-SE')) 
const mealType = ref('มื้อเช้า')
const quantity = ref(1)

const foods = ref([])
const searchQuery = ref('')
const selectedFoodId = ref('')
const selectedFood = ref(null) 

// 1. ดึงข้อมูลอาหารทั้งหมดมารอไว้หลังบ้าน
const fetchFoods = async () => {
  try {
    const response = await fetch('http://localhost:3000/foods')
    if (response.ok) {
      foods.value = await response.json()
    }
  } catch (error) {
    console.error('Error fetching foods:', error)
  }
}

// 2. ฟังก์ชันกรองอาหาร (แก้ไขให้ตอนยังไม่พิมพ์ คืนค่าว่างกลับไปแทน)
const filteredFoods = computed(() => {
  // ถ้าช่องค้นหาว่างเปล่า (หรือมีแค่ช่องว่าง) ให้คืนค่าเป็น Array ว่างๆ ไปเลย
  if (!searchQuery.value.trim()) {
    return [] 
  }
  // ถ้ามีการพิมพ์ค้นหา ให้กรองเอาเฉพาะชื่ออาหารที่มีคำนั้นๆ อยู่
  return foods.value.filter(food => 
    food.name.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
  )
})

// 3. ฟังก์ชันเมื่อผู้ใช้คลิกเลือกอาหารจากลิสต์
const selectFood = (food) => {
  selectedFoodId.value = food.id
  selectedFood.value = food
  searchQuery.value = '' 
}

// 4. ฟังก์ชันกดยกเลิกการเลือกอาหาร (เพื่อค้นหาใหม่)
const clearSelection = () => {
  selectedFoodId.value = ''
  selectedFood.value = null
}

// 5. ส่งข้อมูลไปบันทึก (เวอร์ชันเปิดโปง Error)
const submitFoodLog = async () => {
  const userId = localStorage.getItem('userId')

  // เช็คก่อนว่ามีไอดีคนล็อกอินอยู่ไหม (ป้องกันกรณี Session หลุด)
  if (!userId) {
    alert('ไม่พบข้อมูลผู้ใช้ กรุณาล็อกอินใหม่อีกครั้งครับ');
    router.push('/login');
    return;
  }

  if (!selectedFoodId.value) {
    alert('กรุณาเลือกอาหารก่อนครับ!');
    return;
  }

  // แพ็กของเตรียมส่ง (แอบปริ้นท์ดูใน Console ว่ามีอะไรผิดปกติไหม)
  const payload = {
    user_id: userId,
    food_id: selectedFoodId.value,
    quantity: quantity.value,
    meal_type: mealType.value,
    log_date: logDate.value
  };
  console.log("📦 ข้อมูลที่กำลังจะส่งไปหลังบ้าน:", payload); 

  try {
    const response = await fetch('http://localhost:3000/food-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    // แกะกล่องข้อความที่หลังบ้านตอบกลับมา
    const data = await response.json(); 

    if (response.ok) {
      alert('บันทึกมื้ออาหารเรียบร้อย! 😋');
      router.push('/dashboard');
    } else {
      // โชว์ Error ตัวจริงที่ส่งมาจาก server.js เลย!
      alert(`❌ บันทึกไม่สำเร็จ: ${data.error}`); 
      console.error("Backend Error Details:", data);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้');
  }
}

const goBack = () => {
  router.push('/dashboard')
}

onMounted(() => {
  fetchFoods()
})
</script>

<style scoped>
.add-food-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
input, select {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.search-input {
  border: 2px solid #4CAF50;
  outline: none;
}
.search-results {
  list-style: none;
  padding: 0;
  margin: 5px 0 0 0;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fafafa;
}
.search-results li {
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
}
.search-results li:hover {
  background-color: #e8f5e9;
}
.no-result {
  text-align: center;
  color: #888;
  cursor: default !important;
}
.cal-badge {
  background-color: #ffb74d;
  color: white;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.85em;
}

.selected-food-box {
  background-color: #e8f5e9;
  border: 2px solid #4CAF50;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-clear {
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.btn-submit {
  flex: 1;
  background-color: #4CAF50;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
.btn-submit:hover { background-color: #45a049; }
.btn-cancel {
  flex: 1;
  background-color: #f44336;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
.btn-cancel:hover { background-color: #da190b; }
</style>