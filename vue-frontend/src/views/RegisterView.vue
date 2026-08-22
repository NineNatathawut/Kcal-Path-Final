<template>
  <div class="page">
    <div class="grid-bg"></div>
    <div class="glow-top"></div>

    <div class="layout">

      <!-- LEFT -->
      <div class="left">
        <div class="left-inner">
          <a class="logo" @click="router.push('/')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="#30d158" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            KcalPath
          </a>

          <div class="eyebrow"><span class="ew-dot"></span>สมัครสมาชิก</div>
          <h1 class="big-title">เริ่ม<br><em>ดูแล</em><br>ตัวเอง</h1>
          <p class="left-sub">บันทึกอาหาร คำนวณ TDEE<br>และติดตามโภชนาการ<br>ได้แบบเรียลไทม์</p>

          <div class="stat-row">
            <div class="stat"><div class="sv">ฟรี</div><div class="sl">ตลอดไป</div></div>
            <div class="stat-div"></div>
            <div class="stat"><div class="sv">200+</div><div class="sl">เมนูอาหารไทย</div></div>
            <div class="stat-div"></div>
            <div class="stat"><div class="sv">BMR/TDEE</div><div class="sl">คำนวณเฉพาะบุคคล</div></div>
          </div>

          <div class="ambient">สมัคร</div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="right">
        <div class="card" :class="{ shaking }">

          <div class="card-header">
            <div class="card-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#30d158" stroke-width="2" stroke-linecap="round"/>
                <circle cx="12" cy="7" r="4" stroke="#30d158" stroke-width="2"/>
              </svg>
            </div>
            <div>
              <div class="card-title">สร้างบัญชีใหม่</div>
              <div class="card-sub">กรอกข้อมูลเพื่อเริ่มต้นใช้งาน</div>
            </div>
          </div>

          <!-- error alert -->
          <transition name="alert">
            <div class="alert-err" v-if="errorMsg">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              {{ errorMsg }}
            </div>
          </transition>

          <!-- ── SECTION 1: บัญชี ── -->
          <div class="sec-label">
            <span class="sec-num">01</span> ข้อมูลบัญชี
          </div>

          <div class="field">
            <label>ชื่อผู้ใช้</label>
            <div class="iw" :class="{ focused: focused==='username' }">
              <svg class="ii" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
              </svg>
              <input type="text" v-model="form.username" placeholder="ตั้งชื่อผู้ใช้" class="inp"
                @focus="focused='username'" @blur="focused=''"/>
            </div>
          </div>

          <div class="field">
            <label>อีเมล</label>
            <div class="iw" :class="{ focused: focused==='email' }">
              <svg class="ii" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/>
              </svg>
              <input type="email" v-model="form.email" placeholder="example@email.com" class="inp"
                @focus="focused='email'" @blur="focused=''"/>
            </div>
          </div>

          <div class="field">
            <label>รหัสผ่าน</label>
            <div class="iw" :class="{ focused: focused==='password' }">
              <svg class="ii" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <input :type="showPass ? 'text' : 'password'" v-model="form.password"
                placeholder="ตั้งรหัสผ่าน (อย่างน้อย 6 ตัว)" class="inp"
                @focus="focused='password'" @blur="focused=''"/>
              <button class="eye-btn" @click="showPass = !showPass" tabindex="-1">
                <svg v-if="!showPass" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                </svg>
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="sec-divider"></div>

          <!-- ── SECTION 2: สุขภาพ ── -->
          <div class="sec-label">
            <span class="sec-num">02</span> ข้อมูลสุขภาพ
          </div>

          <div class="field-row3">
            <div class="field">
              <label>น้ำหนัก <span class="unit">กก.</span></label>
              <div class="iw" :class="{ focused: focused==='weight' }">
                <svg class="ii" width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" stroke-width="2"/>
                  <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"/>
                </svg>
                <input type="number" v-model="form.weight" placeholder="65" class="inp"
                  @focus="focused='weight'" @blur="focused=''"/>
              </div>
            </div>
            <div class="field">
              <label>ส่วนสูง <span class="unit">ซม.</span></label>
              <div class="iw" :class="{ focused: focused==='height' }">
                <svg class="ii" width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v20M8 5l4-3 4 3M8 19l4 3 4-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <input type="number" v-model="form.height" placeholder="170" class="inp"
                  @focus="focused='height'" @blur="focused=''"/>
              </div>
            </div>
            <div class="field">
              <label>อายุ <span class="unit">ปี</span></label>
              <div class="iw" :class="{ focused: focused==='age' }">
                <svg class="ii" width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 6v6l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <input type="number" v-model="form.age" placeholder="25" class="inp"
                  @focus="focused='age'" @blur="focused=''"/>
              </div>
            </div>
          </div>

          <!-- เพศ -->
          <div class="gender-row">
            <button class="gender-btn" :class="{ active: form.gender==='male' }"
              @click="form.gender='male'">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="10" cy="14" r="5" stroke="currentColor" stroke-width="1.8"/>
                <path d="M15 9l5-5M20 4h-4M20 4v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
              ชาย
            </button>
            <button class="gender-btn" :class="{ active: form.gender==='female' }"
              @click="form.gender='female'">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="9" r="5" stroke="currentColor" stroke-width="1.8"/>
                <path d="M12 14v6M9 18h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
              หญิง
            </button>
          </div>

          <div class="sec-divider"></div>

          <!-- ── SECTION 3: เป้าหมาย ── -->
          <div class="sec-label">
            <span class="sec-num">03</span> เป้าหมายและกิจกรรม
          </div>

          <!-- activity -->
          <div class="act-row">
            <button class="act-btn" :class="{ active: form.activity_level===a.val }"
              v-for="a in activityOptions" :key="a.val"
              @click="form.activity_level=a.val">
              <svg class="act-svg" v-if="a.val==='low'" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" stroke-width="1.7"/>
                <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
              </svg>
              <svg class="act-svg" v-if="a.val==='medium'" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="4" r="2" stroke="currentColor" stroke-width="1.7"/>
                <path d="M12 6v5M8 10l4 1 4-1M10 11l-2 5M14 11l2 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
              </svg>
              <svg class="act-svg" v-if="a.val==='high'" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="4" r="2" stroke="currentColor" stroke-width="1.7"/>
                <path d="M5 10h4l1-2h4l1 2h4M9 10l-1 8M15 10l1 8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div class="act-text">
                <div class="act-title">{{ a.label }}</div>
                <div class="act-desc">{{ a.desc }}</div>
              </div>
            </button>
          </div>

          <!-- goal -->
          <div class="goal-row">
            <button class="goal-btn" :class="{ active: form.goal===g.val }"
              v-for="g in goalOptions" :key="g.val"
              @click="form.goal=g.val">
              <svg v-if="g.val==='lose'" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="16 17 22 17 22 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-if="g.val==='maintain'" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-if="g.val==='gain'" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="16 7 22 7 22 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="goal-label">{{ g.label }}</span>
            </button>
          </div>

          <!-- submit -->
          <button class="btn-submit" @click="register" :disabled="loading">
            <span v-if="!loading">สมัครสมาชิก</span>
            <span v-else class="ldots"><span></span><span></span><span></span></span>
          </button>

          <div class="card-divider"></div>

          <p class="login-link">
            มีบัญชีอยู่แล้วใช่ไหม?
            <button class="link-btn" @click="router.push('/login')">เข้าสู่ระบบ</button>
          </p>

        </div>
      </div>

    </div>
  </div>
    <Footer />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Footer from '@/components/Footer.vue'

const router  = useRouter()
const loading = ref(false)
const showPass= ref(false)
const focused = ref('')
const shaking = ref(false)
const errorMsg= ref('')

const form = ref({
  username:'', email:'', password:'',
  weight:60, height:165, age:25,
  gender:'male', activity_level:'medium', goal:'lose'
})

const activityOptions = [
  { val:'low',    label:'น้อย',    desc:'นั่งทำงาน' },
  { val:'medium', label:'ปานกลาง', desc:'3–5 วัน/สัปดาห์' },
  { val:'high',   label:'มาก',     desc:'6–7 วัน/สัปดาห์' },
]
const goalOptions = [
  { val:'lose',     label:'ลดน้ำหนัก' },
  { val:'maintain', label:'รักษาน้ำหนัก' },
  { val:'gain',     label:'เพิ่มกล้ามเนื้อ' },
]

function triggerShake(msg) {
  errorMsg.value = msg
  shaking.value  = true
  setTimeout(() => shaking.value = false, 500)
}

async function register() {
  errorMsg.value = ''
  if (!form.value.username || !form.value.email || !form.value.password) {
    triggerShake('กรุณากรอก ชื่อผู้ใช้, อีเมล และรหัสผ่าน ให้ครบถ้วน')
    return
  }
  if (form.value.password.length < 6) {
    triggerShake('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')
    return
  }
  loading.value = true
  try {
    const res  = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userId',   data.userId)
      localStorage.setItem('username', form.value.username)
      router.push('/dashboard')
    } else {
      triggerShake(data.error || 'สมัครสมาชิกไม่สำเร็จ')
    }
  } catch {
    triggerShake('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาลองใหม่')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;700;900&family=Noto+Sans+Thai:wght@300;400;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

.page {
  font-family:'Noto Sans Thai','Prompt',sans-serif;
  background:#000; color:#f5f5f7; min-height:100vh;
  overflow-x:hidden; -webkit-font-smoothing:antialiased;
}
.grid-bg {
  position:fixed; inset:0; pointer-events:none; z-index:0;
  background-image:
    linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
  background-size:72px 72px;
  mask-image:radial-gradient(ellipse 100% 70% at 50% 50%,black 20%,transparent 100%);
}
.glow-top {
  position:fixed; inset:0; pointer-events:none; z-index:0;
  background:radial-gradient(ellipse 55% 28% at 50% 0%,rgba(48,209,88,.07) 0%,transparent 70%);
}

/* LAYOUT */
.layout {
  position:relative; z-index:1;
  display:grid; grid-template-columns:1fr 1fr;
  min-height:100vh;
}

/* LEFT */
.left {
  display:flex; align-items:center; justify-content:center;
  padding:60px 48px 60px 64px; position:relative; overflow:hidden;
}
.left-inner{position:relative;z-index:2;max-width:400px}

.logo {
  display:inline-flex; align-items:center; gap:8px;
  font-family:'Prompt',sans-serif; font-weight:700; font-size:.95rem; color:#f5f5f7;
  cursor:pointer; margin-bottom:40px;
}
.eyebrow {
  display:inline-flex; align-items:center; gap:7px;
  font-size:.7rem; font-weight:600; color:#30d158;
  letter-spacing:.12em; text-transform:uppercase; margin-bottom:14px;
}
.ew-dot{width:6px;height:6px;border-radius:50%;background:#30d158;box-shadow:0 0 8px #30d158}
.big-title {
  font-family:'Prompt',sans-serif; font-weight:700;
  font-size:clamp(3rem,6.5vw,6.5rem); line-height:.96;
  letter-spacing:-.05em; margin-bottom:20px;
}
.big-title em {
  font-style:normal;
  background:linear-gradient(135deg,#30d158,#34aadc);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.left-sub{font-size:.9rem;font-weight:300;color:#6e6e73;line-height:1.85;margin-bottom:28px}

.stat-row{display:flex;align-items:center;gap:16px}
.stat{display:flex;flex-direction:column;gap:2px}
.sv{font-family:'Prompt',sans-serif;font-size:1.2rem;font-weight:700;color:#f5f5f7}
.sl{font-size:.62rem;color:#6e6e73;letter-spacing:.04em}
.stat-div{width:1px;height:28px;background:rgba(255,255,255,.1)}

.ambient {
  position:absolute;right:-10%;bottom:-5%;pointer-events:none;
  font-family:'Prompt',sans-serif;font-weight:900;
  font-size:clamp(6rem,15vw,14rem);line-height:1;
  letter-spacing:-.05em;color:#fff;opacity:.025;user-select:none;z-index:1;
}

/* RIGHT */
.right {
  display:flex;align-items:center;justify-content:center;
  padding:40px 64px 40px 48px;
  border-left:1px solid rgba(255,255,255,.06);
  background:rgba(255,255,255,.012);
  overflow-y:auto; min-height:100vh;
}

/* CARD */
.card {
  width:100%;max-width:440px;
  background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);
  border-radius:24px;padding:28px 30px;
  backdrop-filter:blur(32px);
  box-shadow:0 40px 80px rgba(0,0,0,.5);
}
.card.shaking{animation:shake .4s cubic-bezier(.36,.07,.19,.97)}
@keyframes shake{10%,90%{transform:translateX(-2px)}20%,80%{transform:translateX(3px)}30%,50%,70%{transform:translateX(-4px)}40%,60%{transform:translateX(4px)}}

.card-header{display:flex;align-items:center;gap:14px;margin-bottom:20px}
.card-icon{
  width:40px;height:40px;border-radius:12px;flex-shrink:0;
  background:rgba(48,209,88,.1);border:1px solid rgba(48,209,88,.2);
  display:flex;align-items:center;justify-content:center;
}
.card-title{font-family:'Prompt',sans-serif;font-size:.95rem;font-weight:700;color:#f5f5f7;margin-bottom:2px}
.card-sub{font-size:.72rem;color:#6e6e73}

/* error alert */
.alert-err {
  display:flex;align-items:center;gap:8px;
  background:rgba(255,69,58,.1);border:1px solid rgba(255,69,58,.25);
  color:#ff453a;border-radius:10px;padding:10px 14px;
  font-size:.78rem;margin-bottom:16px;
}
.alert-enter-active,.alert-leave-active{transition:all .3s ease}
.alert-enter-from,.alert-leave-to{opacity:0;transform:translateY(-6px)}

/* section label */
.sec-label {
  display:flex;align-items:center;gap:8px;
  font-family:'Prompt',sans-serif;font-size:.78rem;font-weight:600;color:#a1a1a6;
  margin-bottom:12px;
}
.sec-num{font-size:.62rem;color:#30d158;font-weight:700;letter-spacing:.1em}
.sec-divider{height:1px;background:rgba(255,255,255,.07);margin:16px 0}

/* FIELD */
.field{display:flex;flex-direction:column;gap:5px;margin-bottom:10px}
label{font-size:.72rem;color:#a1a1a6}
.unit{color:#6e6e73;font-size:.65rem}
.iw {
  display:flex;align-items:center;gap:8px;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);
  border-radius:11px;padding:0 12px;height:44px;transition:all .22s;
  min-width:0;overflow:hidden;
}
.iw.focused{border-color:rgba(48,209,88,.45);background:rgba(48,209,88,.04);box-shadow:0 0 0 3px rgba(48,209,88,.07)}
.ii{color:#6e6e73;flex-shrink:0;transition:color .22s}
.iw.focused .ii{color:#30d158}
.inp{flex:1;min-width:0;background:none;border:none;outline:none;
  font-family:'Noto Sans Thai','Prompt',sans-serif;
  font-size:.88rem;color:#f5f5f7;color-scheme:dark}
.inp::placeholder{color:#3a3a3f}
.eye-btn{background:none;border:none;color:#6e6e73;cursor:pointer;padding:0;display:flex;align-items:center;flex-shrink:0;transition:color .2s}
.eye-btn:hover{color:#a1a1a6}

/* 3-col metrics */
.field-row3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:10px}

/* gender */
.gender-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px}
.gender-btn{
  display:flex;align-items:center;justify-content:center;gap:8px;
  font-family:inherit;font-size:.84rem;color:#6e6e73;
  background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);
  border-radius:10px;padding:11px;cursor:pointer;transition:all .22s;
}
.gender-btn.active{background:rgba(48,209,88,.09);border-color:rgba(48,209,88,.32);color:#30d158}
.gender-btn:hover:not(.active){background:rgba(255,255,255,.07);color:#a1a1a6}

/* activity row */
.act-row{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}
.act-btn{
  display:flex;align-items:center;gap:12px;
  font-family:inherit;text-align:left;
  background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);
  border-radius:11px;padding:11px 14px;cursor:pointer;transition:all .22s;
}
.act-btn.active{background:rgba(48,209,88,.07);border-color:rgba(48,209,88,.26)}
.act-btn:hover:not(.active){background:rgba(255,255,255,.06)}
.act-svg{color:#6e6e73;flex-shrink:0;transition:color .22s}
.act-btn.active .act-svg{color:#30d158}
.act-text{display:flex;flex-direction:column;gap:1px}
.act-title{font-size:.82rem;font-weight:600;color:#f5f5f7}
.act-desc{font-size:.65rem;color:#6e6e73}

/* goal row */
.goal-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:18px}
.goal-btn{
  display:flex;flex-direction:column;align-items:center;gap:6px;
  font-family:inherit;text-align:center;
  background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);
  border-radius:11px;padding:14px 8px;cursor:pointer;transition:all .22s;color:#6e6e73;
}
.goal-btn.active{background:rgba(48,209,88,.07);border-color:rgba(48,209,88,.26);color:#30d158}
.goal-btn:hover:not(.active){background:rgba(255,255,255,.07);color:#a1a1a6}
.goal-label{font-size:.72rem;font-weight:600;color:#f5f5f7}

/* submit */
.btn-submit{
  width:100%;font-family:'Prompt',inherit;font-size:.9rem;font-weight:600;
  background:#30d158;color:#000;border:none;border-radius:12px;padding:14px;
  cursor:pointer;transition:all .22s;
  display:flex;align-items:center;justify-content:center;
}
.btn-submit:hover:not(:disabled){background:#28b84c}
.btn-submit:disabled{opacity:.6;cursor:not-allowed}

.ldots{display:flex;gap:4px;align-items:center}
.ldots span{width:5px;height:5px;border-radius:50%;background:#000;animation:dot 1.2s ease-in-out infinite}
.ldots span:nth-child(2){animation-delay:.2s}
.ldots span:nth-child(3){animation-delay:.4s}
@keyframes dot{0%,80%,100%{transform:scale(.5);opacity:.3}40%{transform:scale(1);opacity:1}}

.card-divider{height:1px;background:rgba(255,255,255,.07);margin:16px 0}
.login-link{font-size:.78rem;color:#6e6e73;text-align:center}
.link-btn{background:none;border:none;color:#30d158;font-family:inherit;font-size:.78rem;cursor:pointer;padding:0;margin-left:4px;transition:color .2s}
.link-btn:hover{color:#28b84c}

/* responsive */
@media(max-width:900px){
  .layout{grid-template-columns:1fr}
  .left{display:none}
  .right{padding:32px 20px;border-left:none;background:none;justify-content:center;min-height:100vh}
}
@media(max-width:400px){
  .field-row3{grid-template-columns:1fr 1fr}
  .goal-row{grid-template-columns:1fr 1fr}
}
</style>