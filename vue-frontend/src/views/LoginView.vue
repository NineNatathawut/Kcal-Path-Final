<template>
  <div class="page">
    <!-- grid bg -->
    <div class="grid-bg"></div>
    <div class="glow-top"></div>

    <!-- NAV -->
    <nav class="nav">
      <a class="logo" @click="goTo('/')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="#30d158" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        KcalPath
      </a>
    </nav>

    <!-- MAIN -->
    <main class="main">
      <!-- LEFT — branding -->
      <div class="left">
        <div class="left-inner">
          <div class="eyebrow">
            <span class="ew-dot"></span>
            ยินดีต้อนรับกลับ
          </div>
          <h1 class="big-title">
            ดูแล<br><em>ตัวเอง</em><br>ทุกวัน
          </h1>
          <p class="left-sub">
            บันทึกมื้ออาหาร ติดตามสารอาหาร<br>
            และวางแผนสุขภาพด้วยข้อมูลอาหารไทย
          </p>

          <!-- stat pills -->
          <div class="stat-pills">
            <div class="sp" v-for="s in stats" :key="s.label">
              <div class="sp-n" :style="`color:${s.color}`">{{ s.val }}</div>
              <div class="sp-l">{{ s.label }}</div>
            </div>
          </div>

          <!-- ambient number -->
          <div class="ambient">12K</div>
        </div>
      </div>

      <!-- RIGHT — form card -->
      <div class="right">
        <div class="card" :class="{ shake: shaking }">
          <!-- header -->
          <div class="card-head">
            <div class="card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="#30d158" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h2 class="card-title">เข้าสู่ระบบ</h2>
            <p class="card-sub">KcalPath — แพลตฟอร์มโภชนาการสำหรับคนไทย</p>
          </div>

          <!-- error alert -->
          <transition name="fade">
            <div class="alert-err" v-if="errorMsg">
              <span class="alert-icon">!</span>
              {{ errorMsg }}
            </div>
          </transition>

          <!-- form -->
          <div class="form">
            <div class="field">
              <label>ชื่อผู้ใช้</label>
              <div class="input-wrap" :class="{ focused: focusedField === 'user', error: errorMsg }">
                <svg class="input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                </svg>
                <input
                  type="text"
                  v-model="username"
                  placeholder="กรอกชื่อผู้ใช้"
                  @keyup.enter="login"
                  @focus="focusedField = 'user'"
                  @blur="focusedField = ''"
                  autocomplete="username"
                  :disabled="loading"
                />
              </div>
            </div>

            <div class="field">
              <label>รหัสผ่าน</label>
              <div class="input-wrap" :class="{ focused: focusedField === 'pass', error: errorMsg }">
                <svg class="input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <input
                  :type="showPass ? 'text' : 'password'"
                  v-model="password"
                  placeholder="กรอกรหัสผ่าน"
                  @keyup.enter="login"
                  @focus="focusedField = 'pass'"
                  @blur="focusedField = ''"
                  autocomplete="current-password"
                  :disabled="loading"
                />
                <button class="eye-btn" @click="showPass = !showPass" tabindex="-1">
                  <!-- eye open -->
                  <svg v-if="!showPass" width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  <!-- eye off -->
                  <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- submit -->
            <button class="btn-submit" @click="login" :disabled="loading">
              <span v-if="!loading">เข้าสู่ระบบ</span>
              <span v-else class="loading-dots">
                <span></span><span></span><span></span>
              </span>
            </button>

            <!-- Divider -->
            <div class="divider-line">
              <span></span>
              <p>หรือ</p>
              <span></span>
            </div>

            <!-- ปุ่ม Google Login -->
            <button class="btn-google" @click="loginWithGoogle" :disabled="loading" type="button">
              <svg class="google-icon" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              เข้าสู่ระบบด้วย Google
            </button>

            <p class="register-row">
              ยังไม่มีบัญชี?
              <button class="link-btn" @click="goTo('/register')">
                สมัครสมาชิกฟรี →
              </button>
            </p>

          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Footer from '@/components/Footer.vue'

// 1. นำเข้า Supabase Client (อย่าลืมแก้ path ให้ตรงกับที่เก็บไฟล์ supabase ของคุณ)
// ตัวอย่าง: ถ้าไฟล์ชื่อ supabase.js อยู่ใน src/ ให้ใช้ import { supabase } from '@/supabase'
import { supabase } from '../supabase' // <--- แก้ตรงนี้ให้ตรงกับโปรเจกต์ของคุณ

const router = useRouter()
const goTo = (path) => router.push(path)

const username     = ref('')
const password     = ref('')
const showPass     = ref(false)
const loading      = ref(false)
const errorMsg     = ref('')
const shaking      = ref(false)
const focusedField = ref('')

const stats = [
  { val: '200+', label: 'เมนูอาหารไทย', color: '#30d158' },
  { val: 'BMR/TDEE', label: 'คำนวณเฉพาะบุคคล', color: '#0a84ff' },
  { val: '3', label: 'โหมดเป้าหมาย', color: '#ff9f0a' },
  { val: '100%', label: 'ใช้งานฟรี', color: '#ff453a' },
]

const triggerShake = () => {
  shaking.value = true
  setTimeout(() => shaking.value = false, 500)
}

const login = async () => {
  errorMsg.value = ''

  if (!username.value || !password.value) {
    errorMsg.value = 'กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน'
    triggerShake()
    return
  }

  loading.value = true
  localStorage.clear()

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value })
    })

    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userId',   data.user.id)
      localStorage.setItem('username', data.user.username)
      router.push('/dashboard')
    } else {
      password.value = ''
      errorMsg.value = data.error || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
      triggerShake()
    }
  } catch {
    errorMsg.value = 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาลองใหม่อีกครั้ง'
    triggerShake()
  } finally {
    loading.value = false
  }
}

// 2. ฟังก์ชัน Login ด้วย Google ผ่าน Supabase
const loginWithGoogle = async () => {
  errorMsg.value = ''
  loading.value = true // แสดงแอนิเมชันโหลด
  
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // ใช้ Environment Variable สำหรับ Redirect URL (ตั้งค่าใน Vercel Dashboard สำหรับ Production)
        redirectTo: import.meta.env.VITE_OAUTH_REDIRECT_URL || `${window.location.origin}/auth/callback`,
        
        // บังคับให้ Supabase ส่งค่ากลับมาแบบ Query String (?access_token=...) แทน Hash (#)
        queryParams: {
          prompt: 'consent' // แถมการบังคับให้ Google ถามหน้าต่างยืนยันทุกครั้ง เพื่อล้าง Cache Session เก่าด้วย
        }
      }
    })

    if (error) throw error

    // ปกติเมื่อรันถึงบรรทัดนี้ ระบบจะ redirect ไปที่หน้าต่างของ Google อัตโนมัติ

  } catch (error) {
    errorMsg.value = 'เกิดข้อผิดพลาดในการเชื่อมต่อกับ Google'
    triggerShake()
    loading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@200;300;400;700;900&family=Noto+Sans+Thai:wght@200;300;400;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: #000;
  color: #f5f5f7;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ── backgrounds ── */
.grid-bg {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
}
.glow-top {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background: radial-gradient(ellipse 60% 35% at 50% 0%, rgba(48,209,88,.09) 0%, transparent 70%);
}

/* ── NAV ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 99;
  height: 52px; display: flex; align-items: center; padding: 0 32px;
  background: rgba(0,0,0,.7); backdrop-filter: blur(28px);
  border-bottom: 1px solid rgba(255,255,255,.05);
}
.logo {
  font-family: 'Prompt', sans-serif; font-weight: 700; font-size: .95rem;
  color: #f5f5f7; display: flex; align-items: center; gap: 7px;
  letter-spacing: .02em; cursor: pointer; text-decoration: none;
}

/* ── MAIN LAYOUT ── */
.main {
  position: relative; z-index: 1;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 52px;
}

/* ── LEFT ── */
.left {
  display: flex; align-items: center; justify-content: center;
  padding: 60px 48px 60px 64px;
  position: relative; overflow: hidden;
}
.left-inner { position: relative; z-index: 2; max-width: 440px; }

.eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: .75rem; font-weight: 600; color: #30d158;
  letter-spacing: .1em; text-transform: uppercase;
  margin-bottom: 24px;
}
.ew-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #30d158; box-shadow: 0 0 8px #30d158; flex-shrink: 0;
}

.big-title {
  font-family: 'Prompt', sans-serif; font-weight: 700;
  font-size: clamp(3.5rem, 7vw, 7rem);
  line-height: .96; letter-spacing: -.05em;
  color: #f5f5f7; margin-bottom: 24px;
}
.big-title em {
  font-style: normal;
  background: linear-gradient(135deg, #30d158 0%, #34aadc 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

.left-sub {
  font-size: clamp(.88rem, 1.3vw, 1.05rem); font-weight: 300;
  color: #6e6e73; line-height: 1.8; margin-bottom: 40px;
}

/* stat pills */
.stat-pills { display: flex; gap: 10px; flex-wrap: wrap; }
.sp {
  display: flex; flex-direction: column; align-items: center;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07);
  border-radius: 14px; padding: 12px 20px; gap: 3px;
  backdrop-filter: blur(12px);
}
.sp-n {
  font-family: 'Prompt', sans-serif; font-size: 1.3rem;
  font-weight: 700; line-height: 1; letter-spacing: -.02em;
}
.sp-l { font-size: .6rem; color: #6e6e73; font-weight: 300; }

/* ambient number */
.ambient {
  position: absolute; right: -8%; bottom: -8%; pointer-events: none;
  font-family: 'Prompt', sans-serif; font-weight: 900;
  font-size: clamp(8rem, 20vw, 20rem); line-height: 1;
  letter-spacing: -.05em; color: rgba(255,255,255,.025); user-select: none; z-index: 1;
}

/* ── RIGHT ── */
.right {
  display: flex; align-items: center; justify-content: center;
  padding: 60px 64px 60px 48px;
  border-left: 1px solid rgba(255,255,255,.06);
  background: rgba(255,255,255,.012);
}

/* ── CARD ── */
.card {
  width: 100%; max-width: 420px;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 24px; padding: 40px 36px;
  backdrop-filter: blur(32px);
  box-shadow: 0 40px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.04);
}
.card.shake { animation: shake .45s cubic-bezier(.36,.07,.19,.97); }
@keyframes shake {
  0%,100%{transform:translateX(0)}
  20%{transform:translateX(-8px)}
  40%{transform:translateX(8px)}
  60%{transform:translateX(-6px)}
  80%{transform:translateX(6px)}
}

/* card header */
.card-head { text-align: center; margin-bottom: 28px; }
.card-icon {
  width: 48px; height: 48px; border-radius: 14px; margin: 0 auto 14px;
  background: rgba(48,209,88,.08); border: 1px solid rgba(48,209,88,.18);
  display: flex; align-items: center; justify-content: center;
}
.card-title {
  font-family: 'Prompt', sans-serif; font-weight: 700;
  font-size: 1.55rem; letter-spacing: -.025em; color: #f5f5f7; margin-bottom: 6px;
}
.card-sub { font-size: .78rem; font-weight: 300; color: #6e6e73; }

/* error alert */
.alert-err {
  display: flex; align-items: flex-start; gap: 9px;
  background: rgba(255,69,58,.08); border: 1px solid rgba(255,69,58,.2);
  border-radius: 10px; padding: 11px 14px; margin-bottom: 18px;
  font-size: .8rem; color: #ff453a; line-height: 1.5;
}
.alert-icon {
  width: 18px; height: 18px; border-radius: 50%; background: rgba(255,69,58,.2);
  color: #ff453a; font-size: .7rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px;
}
.fade-enter-active, .fade-leave-active { transition: all .25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }

/* form */
.form { display: flex; flex-direction: column; gap: 0; }
.field { display: flex; flex-direction: column; gap: 7px; margin-bottom: 16px; }
label { font-size: .78rem; font-weight: 400; color: #a1a1a6; letter-spacing: .01em; }

/* input */
.input-wrap {
  display: flex; align-items: center; gap: 10px;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
  border-radius: 12px; padding: 0 14px; height: 48px;
  transition: all .22s;
}
.input-wrap.focused {
  border-color: rgba(48,209,88,.45);
  background: rgba(48,209,88,.04);
  box-shadow: 0 0 0 3px rgba(48,209,88,.08);
}
.input-wrap.error { border-color: rgba(255,69,58,.3); }
.input-wrap.error.focused {
  border-color: rgba(255,69,58,.5);
  box-shadow: 0 0 0 3px rgba(255,69,58,.08);
}
.input-icon { color: #6e6e73; flex-shrink: 0; transition: color .22s; }
.input-wrap.focused .input-icon { color: #30d158; }

input {
  flex: 1; background: none; border: none; outline: none;
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  font-size: .92rem; font-weight: 300; color: #f5f5f7;
  min-width: 0;
}
input::placeholder { color: #4a4a4f; }
input:disabled { opacity: .5; cursor: not-allowed; }

.eye-btn {
  background: none; border: none; cursor: pointer; padding: 0;
  color: #6e6e73; transition: color .2s; display: flex; align-items: center; flex-shrink: 0;
}
.eye-btn:hover { color: #a1a1a6; }

/* submit button */
.btn-submit {
  width: 100%; height: 50px; margin-top: 6px; margin-bottom: 20px;
  background: #30d158; color: #000;
  border: none; border-radius: 12px;
  font-family: 'Prompt', sans-serif; font-size: .98rem; font-weight: 700;
  cursor: pointer; letter-spacing: .01em; transition: all .22s;
  display: flex; align-items: center; justify-content: center;
}
.btn-submit:hover:not(:disabled) { background: #28b84c; transform: scale(.99); }
.btn-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }

/* google login button */
.btn-google {
  width: 100%; height: 50px; margin-bottom: 24px;
  background: rgba(255,255,255,.05); color: #f5f5f7;
  border: 1px solid rgba(255,255,255,.1); border-radius: 12px;
  font-family: 'Prompt', sans-serif; font-size: .95rem; font-weight: 400;
  cursor: pointer; transition: all .22s;
  display: flex; align-items: center; justify-content: center; gap: 10px;
}
.btn-google:hover:not(:disabled) {
  background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.2);
}
.btn-google:disabled { opacity: .6; cursor: not-allowed; }
.google-icon { width: 20px; height: 20px; flex-shrink: 0; }

/* loading dots */
.loading-dots {
  display: flex; gap: 5px; align-items: center;
}
.loading-dots span {
  width: 6px; height: 6px; border-radius: 50%; background: #000;
  animation: dot 1.2s ease-in-out infinite;
}
.loading-dots span:nth-child(2) { animation-delay: .2s; }
.loading-dots span:nth-child(3) { animation-delay: .4s; }
@keyframes dot { 0%,80%,100%{transform:scale(.6);opacity:.4} 40%{transform:scale(1);opacity:1} }

/* divider */
.divider-line {
  display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
}
.divider-line span {
  flex: 1; height: 1px; background: rgba(255,255,255,.08);
}
.divider-line p { font-size: .72rem; color: #4a4a4f; white-space: nowrap; }

/* register row */
.register-row {
  text-align: center; font-size: .82rem; font-weight: 300; color: #6e6e73;
}
.link-btn {
  background: none; border: none; cursor: pointer;
  font-family: inherit; font-size: inherit; font-weight: 500;
  color: #30d158; transition: opacity .2s; padding: 0; margin-left: 4px;
}
.link-btn:hover { opacity: .7; }

/* ── RESPONSIVE ── */
@media (max-width: 860px) {
  .main { grid-template-columns: 1fr; }
  .left { display: none; }
  .right {
    padding: 32px 24px; border-left: none;
    min-height: calc(100vh - 52px);
    background: none;
  }
  .card { padding: 32px 24px; }
}
</style>