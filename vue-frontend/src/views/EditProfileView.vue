<template>
  <div class="edit-profile-container">
    <h1>✏️ แก้ไขข้อมูลส่วนตัว</h1>
    <hr>
    <div class="form-group">
      <label>น้ำหนัก (กก.):</label>
      <input type="number" v-model="form.weight">
    </div>
    <div class="form-group">
      <label>ส่วนสูง (ซม.):</label>
      <input type="number" v-model="form.height">
    </div>
    <div class="form-group">
      <label>อายุ (ปี):</label>
      <input type="number" v-model="form.age">
    </div>
    <div class="form-group">
      <label>เพศ:</label>
      <select v-model="form.gender">
        <option value="male">ชาย</option>
        <option value="female">หญิง</option>
      </select>
    </div>
    <div class="form-group">
      <label>ระดับการออกกำลังกาย:</label>
      <select v-model="form.activity_level">
        <option value="low">น้อย (ไม่ออกกำลังกาย)</option>
        <option value="medium">ปานกลาง (3-5 วัน/สัปดาห์)</option>
        <option value="high">มาก (6-7 วัน/สัปดาห์)</option>
      </select>
    </div>
    <div class="form-group">
      <label>เป้าหมาย:</label>
      <select v-model="form.goal">
        <option value="lose">ลดน้ำหนัก</option>
        <option value="maintain">รักษาน้ำหนัก</option>
        <option value="gain">เพิ่มกล้ามเนื้อ</option>
      </select>
    </div>

    <div style="margin-top: 20px;">
      <button @click="updateProfile" class="btn-save">บันทึกการเปลี่ยนแปลง</button>
      <button @click="router.push('/dashboard')" class="btn-cancel">ยกเลิก</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  weight: 0, height: 0, age: 0, 
  gender: '', activity_level: '', goal: ''
})

// ดึงข้อมูลเดิมมาโชว์ก่อนแก้
onMounted(async () => {
  const userId = localStorage.getItem('userId')
  const res = await fetch(`http://localhost:3000/users/${userId}`)
  if (res.ok) {
    const data = await res.json()
    form.value = data
  }
})

const updateProfile = async () => {
  const userId = localStorage.getItem('userId')
  try {
    const res = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    if (res.ok) {
      alert('บันทึกเรียบร้อย!')
      router.push('/dashboard')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.edit-profile-container { max-width: 400px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
.form-group { margin-bottom: 15px; text-align: left; }
label { display: block; font-weight: bold; }
input, select { width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; }
.btn-save { background-color: #4CAF50; color: white; border: none; padding: 10px 15px; cursor: pointer; border-radius: 5px; margin-right: 10px; }
.btn-cancel { background-color: #ccc; border: none; padding: 10px 15px; cursor: pointer; border-radius: 5px; }
</style>