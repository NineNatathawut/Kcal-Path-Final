<template>
  <div class="page">

    <!-- backgrounds -->
    <div class="grid-bg"></div>
    <div class="glow-top"></div>

    <!-- ══ NAV ══ -->
    <nav class="nav">
      <a class="logo" @click="router.push('/')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="#30d158" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        KcalPath
      </a>
      <button class="nb-back" @click="router.push('/dashboard')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        กลับ Dashboard
      </button>
    </nav>

    <!-- ══ MAIN ══ -->
    <main class="main">

      <!-- LEFT — title -->
      <div class="left">
        <div class="left-inner">
          <div class="eyebrow">
            <span class="ew-dot"></span>
            บันทึกมื้ออาหาร
          </div>
          <h1 class="big-title">
            เพิ่ม<br><em>มื้ออาหาร</em><br>วันนี้
          </h1>
          <p class="left-sub">
            ค้นหาจากฐานข้อมูลอาหารไทย<br>
            กว่า 12,000 รายการ หรือเพิ่มเองได้เลย
          </p>

          <!-- summary preview -->
          <div class="preview-card" v-if="selectedFood || (inputMode === 'custom' && customFood.name)">
            <div class="pv-label">
              <span class="pv-dot"></span>ตัวอย่างที่เลือก
            </div>
            <div class="pv-name">{{ inputMode === 'custom' ? customFood.name : selectedFood?.name }}</div>
            <div class="pv-row">
              <div class="pv-stat" v-for="s in previewStats" :key="s.label">
                <div class="pvs-val" :style="`color:${s.color}`">{{ s.val }}</div>
                <div class="pvs-lbl">{{ s.label }}</div>
              </div>
            </div>
          </div>

          <div class="ambient">🍽</div>
        </div>
      </div>

      <!-- RIGHT — form -->
      <div class="right">
        <div class="card">

          <!-- ── STEP 1: DATE & MEAL ── -->
          <div class="step">
            <div class="step-head">
              <span class="step-num">01</span>
              <span class="step-title">วันที่และมื้ออาหาร</span>
            </div>
            <div class="field-row">
              <div class="field">
                <label>วันที่</label>
                <div class="input-wrap">
                  <svg class="input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <input type="date" v-model="logDate" class="inp" />
                </div>
              </div>
              <div class="field">
                <label>มื้ออาหาร</label>
                <div class="input-wrap">
                  <svg class="input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <select v-model="mealType" class="inp">
                    <option value="breakfast">มื้อเช้า</option>
                    <option value="lunch">มื้อเที่ยง</option>
                    <option value="dinner">มื้อเย็น</option>
                    <option value="snack">ของว่าง</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="step-divider"></div>

          <!-- ── STEP 2: MODE TOGGLE ── -->
          <div class="step">
            <div class="step-head">
              <span class="step-num">02</span>
              <span class="step-title">เลือกหรือเพิ่มอาหาร</span>
            </div>

            <!-- mode toggle -->
            <div class="mode-tabs">
              <button
                class="mode-tab" :class="{ active: inputMode === 'search' }"
                @click="inputMode = 'search'">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                  <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                ค้นหาจากฐานข้อมูล
              </button>
              <button
                class="mode-tab" :class="{ active: inputMode === 'custom' }"
                @click="inputMode = 'custom'">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                เพิ่มอาหารใหม่เอง
              </button>
            </div>

            <!-- SEARCH MODE -->
            <transition name="slide">
              <div v-if="inputMode === 'search'" class="mode-body">

                <!-- selected state -->
                <div class="selected-box" v-if="selectedFood">
                  <div class="sb-left">
                    <div class="sb-check">✓</div>
                    <div>
                      <div class="sb-name">{{ selectedFood.name }}</div>
                      <div class="sb-kcal">{{ selectedFood.calories }} kcal / หน่วย</div>
                    </div>
                  </div>
                  <button class="btn-change" @click="clearSelection">เปลี่ยน</button>
                </div>

                <!-- search state -->
                <div class="search-wrap" v-else>
                  <div class="input-wrap" :class="{ focused: searchFocused }">
                    <svg class="input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                      <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <input
                      type="text" v-model="searchQuery"
                      placeholder="พิมพ์ชื่ออาหาร..."
                      class="inp"
                      @focus="searchFocused = true"
                      @blur="searchFocused = false"
                    />
                    <button class="clear-btn" v-if="searchQuery" @click="searchQuery = ''">×</button>
                  </div>

                  <!-- results dropdown -->
                  <transition name="drop">
                    <div class="results-box" v-if="searchQuery.trim()">
                      <div class="no-result" v-if="filteredFoods.length === 0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <circle cx="11" cy="11" r="8" stroke="#6e6e73" stroke-width="2"/>
                          <path d="m21 21-4.35-4.35" stroke="#6e6e73" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        ไม่พบ "{{ searchQuery }}" — ลองเพิ่มเองดูสิ
                      </div>
                      <div
                        class="result-item"
                        v-for="food in filteredFoods" :key="food.id"
                        @click="selectFood(food)">
                        <span class="ri-name">{{ food.name }}</span>
                        <span class="ri-badge">{{ food.calories }} kcal</span>
                      </div>
                    </div>
                  </transition>
                </div>

              </div>
            </transition>

            <!-- CUSTOM MODE -->
            <transition name="slide">
              <div v-if="inputMode === 'custom'" class="mode-body">
                <div class="custom-grid">
                  <div class="field full">
                    <label>ชื่ออาหาร <span class="req">*</span></label>
                    <div class="input-wrap">
                      <input type="text" v-model="customFood.name" placeholder="เช่น ข้าวผัดกระเพราไก่" class="inp"/>
                    </div>
                  </div>
                  <div class="field">
                    <label>แคลอรี่ (kcal) <span class="req">*</span></label>
                    <div class="input-wrap">
                      <input type="number" v-model="customFood.calories" placeholder="0" class="inp"/>
                    </div>
                  </div>
                  <div class="field">
                    <label>โปรตีน (g)</label>
                    <div class="input-wrap">
                      <input type="number" v-model="customFood.protein" placeholder="0" class="inp"/>
                    </div>
                  </div>
                  <div class="field">
                    <label>คาร์บ (g)</label>
                    <div class="input-wrap">
                      <input type="number" v-model="customFood.carbs" placeholder="0" class="inp"/>
                    </div>
                  </div>
                  <div class="field">
                    <label>ไขมัน (g)</label>
                    <div class="input-wrap">
                      <input type="number" v-model="customFood.fat" placeholder="0" class="inp"/>
                    </div>
                  </div>
                </div>
                <p class="helper">* จำเป็นต้องกรอก · สารอาหารอื่นถ้าไม่ทราบเว้นว่างได้</p>
              </div>
            </transition>

          </div>

          <div class="step-divider"></div>

          <!-- ── STEP 3: QUANTITY ── -->
          <div class="step">
            <div class="step-head">
              <span class="step-num">03</span>
              <span class="step-title">จำนวน</span>
            </div>
            <div class="qty-wrap">
              <button class="qty-btn" @click="quantity = Math.max(0.5, quantity - 0.5)">−</button>
              <div class="input-wrap qty-input-wrap">
                <input type="number" v-model="quantity" step="0.5" min="0.5" class="inp qty-inp"/>
                <span class="qty-unit">หน่วย</span>
              </div>
              <button class="qty-btn" @click="quantity = quantity + 0.5">+</button>
            </div>
          </div>

          <div class="step-divider"></div>

          <!-- ── ACTIONS ── -->
          <div class="actions">
            <button class="btn-cancel" @click="router.push('/dashboard')">ยกเลิก</button>
            <button class="btn-submit" @click="submitFoodLog" :disabled="submitting">
              <span v-if="!submitting">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" stroke-width="2"/>
                  <polyline points="17 21 17 13 7 13 7 21" stroke="currentColor" stroke-width="2"/>
                  <polyline points="7 3 7 8 15 8" stroke="currentColor" stroke-width="2"/>
                </svg>
                บันทึกมื้ออาหาร
              </span>
              <span v-else class="loading-dots">
                <span></span><span></span><span></span>
              </span>
            </button>
          </div>

        </div>
      </div>
    </main>

    <!-- toast -->
    <transition name="toast">
      <div class="toast" :class="toast.type" v-if="toast.show">
        {{ toast.msg }}
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const logDate    = ref(new Date().toLocaleDateString('sv-SE'))
const mealType   = ref('breakfast')
const quantity   = ref(1)
const inputMode  = ref('search')
const submitting = ref(false)
const searchFocused = ref(false)

const foods        = ref([])
const searchQuery  = ref('')
const selectedFood = ref(null)
const selectedFoodId = ref('')

const customFood = ref({ name: '', calories: '', protein: '', carbs: '', fat: '' })

// toast
const toast = ref({ show: false, msg: '', type: 'ok' })
function showToast(msg, type = 'ok') {
  toast.value = { show: true, msg, type }
  setTimeout(() => toast.value.show = false, 2800)
}

// preview stats
const previewStats = computed(() => {
  const f = inputMode.value === 'custom' ? customFood.value : selectedFood.value
  if (!f) return []
  return [
    { label: 'kcal', val: Math.round((f.calories || 0) * quantity.value), color: '#30d158' },
    { label: 'P(g)', val: Math.round((f.protein  || 0) * quantity.value), color: '#0a84ff' },
    { label: 'C(g)', val: Math.round((f.carbs    || 0) * quantity.value), color: '#ff9f0a' },
    { label: 'F(g)', val: Math.round((f.fat      || 0) * quantity.value), color: '#ff453a' },
  ]
})

const filteredFoods = computed(() => {
  if (!searchQuery.value.trim()) return []
  return foods.value.filter(f =>
    f.name.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
  ).slice(0, 8)
})

function selectFood(food) {
  selectedFoodId.value = food.id
  selectedFood.value = food
  searchQuery.value = ''
}
function clearSelection() {
  selectedFoodId.value = ''
  selectedFood.value = null
}

async function fetchFoods() {
  try {
    const r = await fetch('/api/foods')
    if (r.ok) foods.value = await r.json()
  } catch (e) { console.error(e) }
}

async function submitFoodLog() {
  const userId = localStorage.getItem('userId')
  if (!userId) { router.push('/login'); return }

  let finalFoodId = selectedFoodId.value

  
  submitting.value = true
  try {
    const r = await fetch('/api/food-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId, food_id: finalFoodId,
        quantity: quantity.value, meal_type: mealType.value, log_date: logDate.value
      })
    })
    const d = await r.json()
    if (r.ok) {
      showToast('บันทึกมื้ออาหารเรียบร้อยแล้ว ✓', 'ok')
      setTimeout(() => router.push('/dashboard'), 1000)
    } else {
      showToast(d.error || 'บันทึกไม่สำเร็จ', 'err')
    }
  } catch { showToast('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้', 'err') }
  finally { submitting.value = false }
}

onMounted(fetchFoods)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@200;300;400;700;900&family=Noto+Sans+Thai:wght@200;300;400;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: #000; color: #f5f5f7;
  min-height: 100vh; position: relative;
  overflow-x: hidden; -webkit-font-smoothing: antialiased;
}

/* ── backgrounds ── */
.grid-bg {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.032) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.032) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
}
.glow-top {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background: radial-gradient(ellipse 60% 35% at 50% 0%, rgba(48,209,88,.08) 0%, transparent 70%);
}

/* ── NAV ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 99;
  height: 52px; display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px;
  background: rgba(0,0,0,.7); backdrop-filter: blur(28px);
  border-bottom: 1px solid rgba(255,255,255,.05);
}
.logo {
  font-family: 'Prompt', sans-serif; font-weight: 700; font-size: .95rem;
  color: #f5f5f7; display: flex; align-items: center; gap: 7px;
  letter-spacing: .02em; cursor: pointer;
}
.nb-back {
  display: flex; align-items: center; gap: 6px;
  font-family: inherit; font-size: .78rem; color: #a1a1a6;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08);
  border-radius: 8px; padding: 5px 14px; cursor: pointer; transition: all .2s;
}
.nb-back:hover { background: rgba(255,255,255,.09); color: #f5f5f7; }

/* ── MAIN LAYOUT ── */
.main {
  position: relative; z-index: 1;
  min-height: 100vh; padding-top: 52px;
  display: grid; grid-template-columns: 1fr 1fr;
}

/* ── LEFT ── */
.left {
  display: flex; align-items: center; justify-content: center;
  padding: 60px 48px 60px 64px;
  position: relative; overflow: hidden;
}
.left-inner { position: relative; z-index: 2; max-width: 420px; }

.eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: .75rem; font-weight: 600; color: #30d158;
  letter-spacing: .1em; text-transform: uppercase; margin-bottom: 24px;
}
.ew-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #30d158; box-shadow: 0 0 8px #30d158;
}
.big-title {
  font-family: 'Prompt', sans-serif; font-weight: 700;
  font-size: clamp(3rem, 6.5vw, 6.5rem);
  line-height: .96; letter-spacing: -.05em; color: #f5f5f7; margin-bottom: 22px;
}
.big-title em {
  font-style: normal;
  background: linear-gradient(135deg, #30d158, #34aadc);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.left-sub {
  font-size: .95rem; font-weight: 300; color: #6e6e73; line-height: 1.8; margin-bottom: 32px;
}

/* preview card */
.preview-card {
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08);
  border-radius: 16px; padding: 16px 18px;
  animation: fadeUp .4s cubic-bezier(.22,1,.36,1) both;
}
@keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
.pv-label {
  display: flex; align-items: center; gap: 6px;
  font-size: .62rem; font-weight: 600; color: #6e6e73;
  letter-spacing: .1em; text-transform: uppercase; margin-bottom: 8px;
}
.pv-dot { width: 5px; height: 5px; border-radius: 50%; background: #30d158; }
.pv-name { font-family: 'Prompt', sans-serif; font-size: .95rem; font-weight: 600; color: #f5f5f7; margin-bottom: 12px; }
.pv-row { display: flex; gap: 14px; }
.pv-stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.pvs-val { font-family: 'Prompt', sans-serif; font-size: 1.1rem; font-weight: 700; line-height: 1; letter-spacing: -.02em; }
.pvs-lbl { font-size: .58rem; color: #6e6e73; }

.ambient {
  position: absolute; right: -5%; bottom: -5%; pointer-events: none;
  font-size: clamp(8rem, 18vw, 18rem); opacity: .04; user-select: none; z-index: 1;
  filter: grayscale(1);
}

/* ── RIGHT ── */
.right {
  display: flex; align-items: flex-start; justify-content: center;
  padding: 60px 64px 60px 48px;
  border-left: 1px solid rgba(255,255,255,.06);
  background: rgba(255,255,255,.012);
  overflow-y: auto; min-height: calc(100vh - 52px);
}

/* ── CARD ── */
.card {
  width: 100%; max-width: 460px;
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08);
  border-radius: 24px; padding: 32px;
  backdrop-filter: blur(32px);
  box-shadow: 0 40px 80px rgba(0,0,0,.5);
}

/* ── STEP ── */
.step { padding: 4px 0 20px; }
.step-head { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
.step-num {
  font-family: 'Prompt', sans-serif; font-size: .68rem; font-weight: 700;
  color: #30d158; letter-spacing: .1em; opacity: .8;
}
.step-title { font-family: 'Prompt', sans-serif; font-size: .88rem; font-weight: 600; color: #f5f5f7; }
.step-divider { height: 1px; background: rgba(255,255,255,.07); margin: 0 0 24px; }

/* ── FIELDS ── */
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.field { display: flex; flex-direction: column; gap: 7px; }
.field.full { grid-column: 1/-1; }
label { font-size: .75rem; font-weight: 400; color: #a1a1a6; letter-spacing: .01em; }
.req { color: #ff453a; }

.input-wrap {
  display: flex; align-items: center; gap: 9px;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.09);
  border-radius: 11px; padding: 0 13px; height: 44px; transition: all .22s;
}
.input-wrap.focused {
  border-color: rgba(48,209,88,.42); background: rgba(48,209,88,.04);
  box-shadow: 0 0 0 3px rgba(48,209,88,.07);
}
.input-icon { color: #6e6e73; flex-shrink: 0; }
.inp {
  flex: 1; background: none; border: none; outline: none; min-width: 0;
  font-family: 'Noto Sans Thai','Prompt',sans-serif;
  font-size: .88rem; font-weight: 300; color: #f5f5f7;
  color-scheme: dark;
}
.inp::placeholder { color: #4a4a4f; }
select.inp option { background: #1c1c1e; color: #f5f5f7; }

.clear-btn {
  background: none; border: none; color: #6e6e73; cursor: pointer;
  font-size: 1.1rem; line-height: 1; padding: 0; flex-shrink: 0; transition: color .2s;
}
.clear-btn:hover { color: #f5f5f7; }

/* ── MODE TABS ── */
.mode-tabs {
  display: flex; gap: 6px;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07);
  border-radius: 12px; padding: 5px; margin-bottom: 18px;
}
.mode-tab {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
  font-family: inherit; font-size: .78rem; color: #6e6e73;
  background: none; border: none; border-radius: 8px;
  padding: 9px 8px; cursor: pointer; transition: all .22s;
}
.mode-tab.active {
  background: rgba(255,255,255,.09); color: #f5f5f7;
  box-shadow: 0 2px 8px rgba(0,0,0,.3);
}
.mode-tab:hover:not(.active) { color: #a1a1a6; }

.mode-body { display: flex; flex-direction: column; gap: 12px; }

/* search results */
.search-wrap { position: relative; }
.results-box {
  position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 50;
  background: #1c1c1e; border: 1px solid rgba(255,255,255,.1);
  border-radius: 13px; overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,.7);
  max-height: 220px; overflow-y: auto;
}
.results-box::-webkit-scrollbar { width: 4px; }
.results-box::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 2px; }
.no-result {
  display: flex; align-items: center; gap: 8px;
  padding: 16px; font-size: .8rem; color: #6e6e73; text-align: center; justify-content: center;
}
.result-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 11px 16px; cursor: pointer; transition: background .15s;
  border-bottom: 1px solid rgba(255,255,255,.04);
}
.result-item:last-child { border-bottom: none; }
.result-item:hover { background: rgba(48,209,88,.08); }
.ri-name { font-size: .85rem; color: #f5f5f7; }
.ri-badge {
  font-size: .7rem; font-weight: 600; color: #30d158;
  background: rgba(48,209,88,.1); border: 1px solid rgba(48,209,88,.18);
  border-radius: 6px; padding: 2px 8px; white-space: nowrap; flex-shrink: 0; margin-left: 8px;
}

/* selected box */
.selected-box {
  display: flex; justify-content: space-between; align-items: center; gap: 12px;
  background: rgba(48,209,88,.06); border: 1px solid rgba(48,209,88,.18);
  border-radius: 12px; padding: 13px 16px;
}
.sb-left { display: flex; align-items: center; gap: 12px; }
.sb-check {
  width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
  background: rgba(48,209,88,.15); border: 1px solid rgba(48,209,88,.3);
  color: #30d158; display: flex; align-items: center; justify-content: center; font-size: .8rem;
}
.sb-name { font-size: .88rem; font-weight: 600; color: #f5f5f7; margin-bottom: 2px; }
.sb-kcal { font-size: .72rem; color: #30d158; }
.btn-change {
  font-family: inherit; font-size: .72rem; color: #a1a1a6;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
  border-radius: 7px; padding: 5px 12px; cursor: pointer; transition: all .2s; white-space: nowrap;
}
.btn-change:hover { background: rgba(255,255,255,.1); color: #f5f5f7; }

/* custom grid */
.custom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.helper { font-size: .68rem; color: #4a4a4f; margin-top: 8px; text-align: right; }

/* quantity */
.qty-wrap { display: flex; align-items: center; gap: 10px; }
.qty-btn {
  width: 40px; height: 40px; border-radius: 10px;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
  color: #f5f5f7; font-size: 1.3rem; cursor: pointer; transition: all .2s;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.qty-btn:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.2); }
.qty-input-wrap { flex: 1; }
.qty-inp { text-align: center; font-size: 1rem; font-weight: 600; }
.qty-unit { font-size: .75rem; color: #6e6e73; margin-right: 4px; flex-shrink: 0; }

/* actions */
.actions { display: flex; gap: 10px; }
.btn-cancel {
  flex: 1; font-family: inherit; font-size: .88rem; color: #6e6e73;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
  border-radius: 12px; padding: 13px; cursor: pointer; transition: all .2s;
}
.btn-cancel:hover { background: rgba(255,255,255,.08); color: #a1a1a6; }
.btn-submit {
  flex: 2; display: flex; align-items: center; justify-content: center; gap: 7px;
  font-family: 'Prompt', inherit; font-size: .92rem; font-weight: 600;
  background: #30d158; color: #000;
  border: none; border-radius: 12px; padding: 13px;
  cursor: pointer; transition: all .22s;
}
.btn-submit:hover:not(:disabled) { background: #28b84c; transform: scale(.99); }
.btn-submit:disabled { opacity: .6; cursor: not-allowed; }

/* loading dots */
.loading-dots { display: flex; gap: 4px; align-items: center; }
.loading-dots span {
  width: 5px; height: 5px; border-radius: 50%; background: #000;
  animation: dot 1.2s ease-in-out infinite;
}
.loading-dots span:nth-child(2){animation-delay:.2s}
.loading-dots span:nth-child(3){animation-delay:.4s}
@keyframes dot{0%,80%,100%{transform:scale(.5);opacity:.3}40%{transform:scale(1);opacity:1}}

/* toast */
.toast {
  position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
  z-index: 999; font-family: 'Prompt', sans-serif; font-size: .85rem; font-weight: 500;
  padding: 12px 24px; border-radius: 980px;
  box-shadow: 0 8px 32px rgba(0,0,0,.5); white-space: nowrap;
}
.toast.ok  { background: #30d158; color: #000; }
.toast.err { background: #ff453a; color: #fff; }
.toast-enter-active,.toast-leave-active{transition:all .35s cubic-bezier(.22,1,.36,1)}
.toast-enter-from,.toast-leave-to{opacity:0;transform:translateX(-50%) translateY(16px)}

/* transitions */
.slide-enter-active,.slide-leave-active{transition:all .28s cubic-bezier(.22,1,.36,1)}
.slide-enter-from,.slide-leave-to{opacity:0;transform:translateY(8px)}
.drop-enter-active,.drop-leave-active{transition:all .22s cubic-bezier(.22,1,.36,1)}
.drop-enter-from,.drop-leave-to{opacity:0;transform:translateY(-6px)}

/* responsive */
@media (max-width: 860px) {
  .main { grid-template-columns: 1fr; }
  .left { display: none; }
  .right { padding: 28px 20px; border-left: none; background: none; min-height: auto; }
  .card { padding: 24px 18px; }
}
@media (max-width: 480px) {
  .field-row { grid-template-columns: 1fr; }
  .custom-grid { grid-template-columns: 1fr; }
}
</style>