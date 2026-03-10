<template>
<<<<<<< HEAD
  <div class="home-wrapper">
    <nav class="sticky-nav">
      <div class="logo">🥗 Kcal-Path</div>
      <div class="nav-buttons">
        <template v-if="!isLoggedIn">
          <button @click="goTo('/login')" class="btn-login">เข้าสู่ระบบ</button>
          <button @click="goTo('/register')" class="btn-register">สมัครสมาชิก</button>
        </template>
        <template v-else>
          <button @click="goTo('/dashboard')" class="btn-register">เข้าสู่แดชบอร์ด 📊</button>
        </template>
      </div>
    </nav>

    <div class="scroll-container">
      
      <section class="screen hero-section">
        <div class="content hero-content">
          <h1 class="bounce-in">รู้หรือเปล่า?</h1>
          <p class="subtitle">การกินที่ดี ไม่ใช่การอด <br>แต่คือการ <b>"เลือกกินให้เป็น"</b></p>
          <button @click="isLoggedIn ? goTo('/dashboard') : goTo('/register')" class="cta-button">
            {{ isLoggedIn ? 'ดูบันทึกอาหารของคุณ 🚀' : 'เริ่มเปลี่ยนตัวเองวันนี้ ' }}
          </button>
          <p class="scroll-hint">เลื่อนลงเพื่อค้นพบความลับของอาหาร 👇</p>
        </div>
      </section>
=======
  <div class="page" @mousemove="onMouse">

    <!-- ══ NAV ══ -->
    <nav class="nav" :class="{scrolled: scrolled}">
      <a class="logo">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="#30d158" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        KcalPath
      </a>
      <div class="nav-mid">
        <a v-for="l in navLinks" :key="l" class="nl">{{ l }}</a>
      </div>
      <div class="nav-end">
        <button class="n-text" @click="goTo('/login')">เข้าสู่ระบบ</button>
        <button class="n-pill" @click="goTo('/register')">สมัครฟรี</button>
      </div>
    </nav>

    <!-- ══════════════════════════════════════
         SECTION 1 — HERO (full-screen)
    ══════════════════════════════════════ -->
    <section class="s1">
      <!-- animated grid -->
      <div class="s1-grid"></div>
      <!-- top glow -->
      <div class="s1-glow"></div>
>>>>>>> 80a3151002ebe17b086e50ef9bb5a88f8c4c5201

      <div class="s1-inner">
        <!-- eyebrow -->
        <div class="eyebrow s1-a1">
          <span class="ew-dot"></span> แพลตฟอร์มโภชนาการ · AI-Powered · 2026
        </div>

        <!-- headline — staggered lines -->
        <div class="s1-hl">
          <div class="hl-line s1-a2">กินดี</div>
          <div class="hl-line hl-g s1-a3"><em>มีสุขภาพ.</em></div>
        </div>

        <p class="s1-sub s1-a4">
          ไม่ใช่การอด — แต่คือการเลือกอย่างชาญฉลาด<br>
          ด้วยข้อมูลอาหารไทยกว่า 12,000 รายการ
        </p>

        <div class="s1-btns s1-a5">
          <button class="btn-green" @click="goTo('/register')">
            เริ่มต้นฟรีวันนี้
          </button>
          <button class="btn-line" @click="goTo('/login')">
            ดูทั้งหมด <span>›</span>
          </button>
        </div>

        <!-- floating stat pills -->
        <div class="pill-cluster s1-a6">
          <div class="spill" v-for="p in pills" :key="p.label">
            <span class="spill-n" :style="`color:${p.color}`">{{ p.val }}</span>
            <span class="spill-l">{{ p.label }}</span>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <section class="screen category-section carbs-section">
        <video autoplay loop muted playsinline class="bg-video">
          <source src="@/assets/images/ขนมปัง.mp4" type="video/mp4" />
        </video>
        <div class="overlay"></div>
        <div class="content full-screen-content">
          <h2>🍚 หมู่ที่ 2: คาร์บ (Carbohydrates)</h2>
          <p class="fact">"อย่ากลัวคาร์บ! นี่คือแหล่งพลังงานหลักของสมอง แค่เลือก 'คาร์บเชิงซ้อน' ก็หุ่นดีได้"</p>
          <div class="food-icons">
            <span>🌾 ข้าวกล้อง</span>
            <span>🍠 มันหวาน</span>
            <span>🥣 ข้าวโอ๊ต</span>
            <span>🍞 โฮลวีต</span>
=======
      <!-- big ambient number -->
      <div class="ambient-num">12K</div>

      <!-- scroll cue -->
      <div class="scroll-cue s1-a6">
        <div class="sc-line"></div>
        <span>เลื่อนดู</span>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         SECTION 2 — PROTEIN (video + text)
    ══════════════════════════════════════ -->
    <section class="cat-section cs-left" ref="s2" v-observe>
      <div class="cs-media">
        <div class="cs-media-inner">
          <img src="@/assets/images/giphy.gif" alt="protein" class="cs-gif" />
          <div class="cs-media-overlay"></div>
          <div class="cs-num-bg">01</div>
        </div>
      </div>
      <div class="cs-text">
        <div class="eyebrow">หมู่ที่ 01</div>
        <h2 class="cs-h2">โปรตีน</h2>
        <p class="cs-en">Protein</p>
        <p class="cs-desc">ไม่ใช่แค่เรื่องของกล้ามเนื้อ — โปรตีนช่วยซ่อมแซมทุกเซลล์ในร่างกาย ทำให้อิ่มนานขึ้น และเป็นพื้นฐานของเอนไซม์และฮอร์โมนทุกชนิด</p>
        <div class="cs-tags">
          <span v-for="t in ['อกไก่','ไข่ต้ม','แซลมอน','เต้าหู้','ถั่วเหลือง']" :key="t">{{ t }}</span>
        </div>
        <div class="cs-stat-row">
          <div class="csr"><div class="csr-n" style="color:#30d158">4</div><div class="csr-l">kcal/g</div></div>
          <div class="csr"><div class="csr-n">120<span>g</span></div><div class="csr-l">เป้าหมายต่อวัน</div></div>
          <div class="csr"><div class="csr-n">85<span>g</span></div><div class="csr-l">วันนี้</div></div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         SECTION 3 — CARBS (reversed + video)
    ══════════════════════════════════════ -->
    <section class="cat-section cs-right" v-observe>
      <div class="cs-text">
        <div class="eyebrow">หมู่ที่ 02</div>
        <h2 class="cs-h2">คาร์โบไฮเดรต</h2>
        <p class="cs-en">Carbohydrates</p>
        <p class="cs-desc">อย่ากลัวคาร์บ — คาร์บเชิงซ้อนคือแหล่งพลังงานที่ดีที่สุดสำหรับสมอง ช่วยรักษาระดับน้ำตาลในเลือดให้คงที่ตลอดวัน</p>
        <div class="cs-tags">
          <span v-for="t in ['ข้าวกล้อง','มันหวาน','ข้าวโอ๊ต','โฮลวีต','ควินัว']" :key="t">{{ t }}</span>
        </div>
        <div class="cs-stat-row">
          <div class="csr"><div class="csr-n" style="color:#ff9f0a">4</div><div class="csr-l">kcal/g</div></div>
          <div class="csr"><div class="csr-n">250<span>g</span></div><div class="csr-l">เป้าหมายต่อวัน</div></div>
          <div class="csr"><div class="csr-n">160<span>g</span></div><div class="csr-l">วันนี้</div></div>
        </div>
      </div>
      <div class="cs-media">
        <div class="cs-media-inner">
          <video autoplay loop muted playsinline class="cs-vid">
            <source src="@/assets/images/ขนมปัง.mp4" type="video/mp4"/>
          </video>
          <div class="cs-media-overlay"></div>
          <div class="cs-num-bg">02</div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         SECTION 4 — FAT (left + video)
    ══════════════════════════════════════ -->
    <section class="cat-section cs-left" v-observe>
      <div class="cs-media">
        <div class="cs-media-inner">
          <video autoplay loop muted playsinline class="cs-vid">
            <source src="@/assets/images/ไขมันดี.mp4" type="video/mp4"/>
          </video>
          <div class="cs-media-overlay"></div>
          <div class="cs-num-bg">03</div>
        </div>
      </div>
      <div class="cs-text">
        <div class="eyebrow">หมู่ที่ 03</div>
        <h2 class="cs-h2">ไขมันดี</h2>
        <p class="cs-en">Healthy Fats</p>
        <p class="cs-desc">ไขมันดีช่วยดูดซึมวิตามิน A, D, E, K ปรับสมดุลฮอร์โมน บำรุงสมองและหัวใจ ร่างกายต้องการไขมันเพื่อการทำงานที่สมบูรณ์</p>
        <div class="cs-tags">
          <span v-for="t in ['อะโวคาโด','อัลมอนด์','น้ำมันมะกอก','ปลาทูน่า','วอลนัท']" :key="t">{{ t }}</span>
        </div>
        <div class="cs-stat-row">
          <div class="csr"><div class="csr-n" style="color:#0a84ff">9</div><div class="csr-l">kcal/g</div></div>
          <div class="csr"><div class="csr-n">65<span>g</span></div><div class="csr-l">เป้าหมายต่อวัน</div></div>
          <div class="csr"><div class="csr-n">42<span>g</span></div><div class="csr-l">วันนี้</div></div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         SECTION 5 — VITAMIN (right + video)
    ══════════════════════════════════════ -->
    <section class="cat-section cs-right" v-observe>
      <div class="cs-text">
        <div class="eyebrow">หมู่ที่ 04</div>
        <h2 class="cs-h2">วิตามิน</h2>
        <p class="cs-en">Vitamins & Minerals</p>
        <p class="cs-desc">วิตามินและแร่ธาตุคือฟันเฟืองของระบบเผาผลาญ — เสริมภูมิคุ้มกัน ช่วยการดูดซึมแคลเซียม และทำให้ผิวพรรณเปล่งปลั่ง</p>
        <div class="cs-tags">
          <span v-for="t in ['บรอกโคลี','ส้ม','เบอร์รี่','ผักบุ้ง','ฟักทอง']" :key="t">{{ t }}</span>
        </div>
        <div class="cs-stat-row">
          <div class="csr"><div class="csr-n" style="color:#ff453a">13</div><div class="csr-l">ชนิด</div></div>
          <div class="csr"><div class="csr-n">5<span>+</span></div><div class="csr-l">หน่วยต่อวัน</div></div>
          <div class="csr"><div class="csr-n">4<span>หน่วย</span></div><div class="csr-l">วันนี้</div></div>
        </div>
      </div>
      <div class="cs-media">
        <div class="cs-media-inner">
          <video autoplay loop muted playsinline class="cs-vid">
            <source src="@/assets/images/vitamin.mp4" type="video/mp4"/>
          </video>
          <div class="cs-media-overlay"></div>
          <div class="cs-num-bg">04</div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         SECTION 6 — STATS (horizontal marquee)
    ══════════════════════════════════════ -->
    <section class="s-stats" v-observe>
      <div class="stat-marquee">
        <div class="sm-inner">
          <div class="sm-item" v-for="s in [...stats, ...stats]" :key="s.label+Math.random()">
            <div class="sm-n">{{ s.num }}<span>{{ s.unit }}</span></div>
            <div class="sm-l">{{ s.label }}</div>
>>>>>>> 80a3151002ebe17b086e50ef9bb5a88f8c4c5201
          </div>
        </div>
      </div>
      <div class="stat-row">
        <div class="sr-block" v-for="s in stats" :key="s.label" v-observe>
          <div class="srb-num">{{ s.num }}<span>{{ s.unit }}</span></div>
          <div class="srb-label">{{ s.label }}</div>
          <div class="srb-desc">{{ s.desc }}</div>
        </div>
      </div>
    </section>

<<<<<<< HEAD
      <section class="screen category-section fat-section">
        <video autoplay loop muted playsinline class="bg-video">
          <source src="@/assets/images/ไขมันดี.mp4" type="video/mp4" />
        </video>
        <div class="overlay"></div>
        <div class="content full-screen-content">
          <h2>🥑 หมู่ที่ 3: ไขมันดี (Healthy Fats)</h2>
          <p class="fact">"กินไขมันไม่ได้แปลว่าจะอ้วน! ไขมันดีช่วยดูดซึมวิตามินและปรับสมดุลฮอร์โมนนะ"</p>
          <div class="food-icons">
            <span>🥑 อะโวคาโด</span>
            <span>🥜 อัลมอนด์</span>
            <span>🫒 น้ำมันมะกอก</span>
            <span>🐟 ปลาทะเล</span>
=======
    <!-- ══════════════════════════════════════
         SECTION 7 — HOW IT WORKS
    ══════════════════════════════════════ -->
    <section class="s-how" v-observe>
      <div class="how-head">
        <div class="eyebrow">วิธีการใช้งาน</div>
        <h2 class="h2-big">3 ขั้นตอน<br><em>สู่สุขภาพดี</em></h2>
      </div>
      <div class="how-steps">
        <div class="hs" v-for="(s,i) in steps" :key="i" v-observe :style="`transition-delay:${i*0.12}s`">
          <div class="hs-num">{{ s.num }}</div>
          <div class="hs-line"></div>
          <div class="hs-title">{{ s.title }}</div>
          <div class="hs-desc">{{ s.desc }}</div>
          <div class="hs-arrow">{{ s.arrow }}</div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         SECTION 8 — TESTIMONIALS
    ══════════════════════════════════════ -->
    <section class="s-reviews" v-observe>
      <div class="rev-head">
        <div class="eyebrow">รีวิว</div>
        <h2 class="h2-big">ผลลัพธ์<em>จริง</em></h2>
      </div>
      <div class="rev-grid">
        <div class="rv" v-for="(r,i) in reviews" :key="i" v-observe :style="`transition-delay:${i*0.1}s`">
          <div class="rv-stars">★★★★★</div>
          <div class="rv-q">"{{ r.quote }}"</div>
          <div class="rv-a">
            <div class="rv-av" :style="`background:${r.bg}`">{{ r.init }}</div>
            <div>
              <div class="rv-name">{{ r.name }}</div>
              <div class="rv-role">{{ r.role }}</div>
            </div>
>>>>>>> 80a3151002ebe17b086e50ef9bb5a88f8c4c5201
          </div>
        </div>
      </div>
    </section>

<<<<<<< HEAD
      <section class="screen category-section vitamin-section">
        <video autoplay loop muted playsinline class="bg-video">
          <source src="@/assets/images/vitamin.mp4" type="video/mp4" />
        </video>
        <div class="overlay"></div>
        <div class="content full-screen-content">
          <h2>🥦 หมู่ที่ 4: วิตามินและแร่ธาตุ</h2>
          <p class="fact">"ผู้ช่วยส่วนตัวเรื่องระบบขับถ่าย เสริมภูมิคุ้มกัน และทำให้ผิวพรรณสดใสเปล่งปลั่ง"</p>
          <div class="food-icons" style="margin-bottom: 40px;">
            <span>🥦 บรอกโคลี</span>
            <span>🍓 เบอร์รี่</span>
            <span>🥬 ผักใบเขียว</span>
            <span>🍊 ส้ม</span>
          </div>
          <button @click="isLoggedIn ? goTo('/dashboard') : goTo('/register')" class="cta-button final-cta">
            {{ isLoggedIn ? 'กลับไปที่แดชบอร์ด' : 'พร้อมจะดูแลสุขภาพหรือยัง? ไปลุยกัน!' }}
          </button>
=======
    <!-- ══════════════════════════════════════
         SECTION 9 — FINAL CTA
    ══════════════════════════════════════ -->
    <section class="s-cta" v-observe>
      <div class="cta-grid"></div>
      <div class="cta-glow"></div>
      <div class="cta-inner">
        <div class="eyebrow">เริ่มต้นวันนี้</div>
        <h2 class="cta-h2">พร้อมแล้ว<br><em>หรือยัง?</em></h2>
        <p class="cta-sub">ทดลองใช้ฟรี 14 วัน · ไม่ต้องใส่บัตรเครดิต</p>
        <div class="cta-btns">
          <button class="btn-green lg" @click="goTo('/register')">เริ่มต้นฟรีวันนี้</button>
          <button class="btn-line" @click="goTo('/login')">ดูราคาทั้งหมด <span>›</span></button>
>>>>>>> 80a3151002ebe17b086e50ef9bb5a88f8c4c5201
        </div>
      </div>
    </section>

    <!-- ══ FOOTER ══ -->
    <footer class="footer">
      <div class="footer-top">
        <div class="f-brand">
          <div class="f-logo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="#30d158" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            KcalPath
          </div>
          <p class="f-desc">แพลตฟอร์มโภชนาการสำหรับคนไทย</p>
        </div>
        <div class="f-col" v-for="col in footerCols" :key="col.title">
          <h4>{{ col.title }}</h4>
          <a v-for="l in col.links" :key="l">{{ l }}</a>
        </div>
      </div>
      <div class="footer-bot">
        <span>Copyright © 2026 KcalPath. สงวนลิขสิทธิ์</span>
        <div class="f-legal">
          <a>ความเป็นส่วนตัว</a><a>เงื่อนไข</a><a>คุกกี้</a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
<<<<<<< HEAD
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)

// 🌟 ตรวจสอบว่าผู้ใช้ล็อกอินอยู่หรือไม่เมื่อโหลดหน้าเว็บ
onMounted(() => {
  const user = localStorage.getItem('user')
  if (user) {
    isLoggedIn.value = true
  }
})
=======
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goTo = (p) => router.push(p)
const scrolled = ref(false)
>>>>>>> 80a3151002ebe17b086e50ef9bb5a88f8c4c5201

const navLinks = ['โภชนาการ', 'ติดตาม', 'แผนอาหาร', 'ราคา']

const pills = [
  { val: '12K+', label: 'รายการอาหาร', color: '#30d158' },
  { val: '98%',  label: 'ความพึงพอใจ', color: '#0a84ff' },
  { val: '50K+', label: 'ผู้ใช้งาน',   color: '#ff9f0a' },
  { val: '14',   label: 'วันทดลองฟรี', color: '#ff453a' },
]

const stats = [
  { num: '12', unit: ',000+', label: 'รายการอาหาร', desc: 'ฐานข้อมูลอาหารไทยที่ครบถ้วนที่สุด ครอบคลุมทุกเมนูและแบรนด์' },
  { num: '98',  unit: '%',    label: 'ความพึงพอใจ', desc: 'จากผู้ใช้งานจริงกว่า 50,000 คนที่ไว้วางใจ KcalPath' },
  { num: '14',  unit: ' วัน', label: 'ทดลองใช้ฟรี', desc: 'ไม่ต้องใส่บัตรเครดิต ทดลองได้ทันที ไม่มีข้อผูกมัด' },
]

const steps = [
  { num: '01', title: 'สมัครใน 30 วินาที', desc: 'กรอกข้อมูลพื้นฐาน ระบบคำนวณแคลอรี่ที่เหมาะกับคุณโดยเฉพาะ', arrow: '→' },
  { num: '02', title: 'บันทึกทุกมื้อ', desc: 'ค้นหาจาก 12,000 รายการหรือสแกนบาร์โค้ด เร็วกว่า 30 วินาที', arrow: '→' },
  { num: '03', title: 'ติดตามผลลัพธ์', desc: 'กราฟและสถิติรายวัน รายสัปดาห์ เข้าใจและปรับพฤติกรรมได้ทันที', arrow: '✓' },
]

const reviews = [
  { quote: 'ใช้มา 3 เดือน น้ำหนักลด 7 กิโล ไม่ต้องอด แค่รู้ว่ากินอะไร แอปนี้เปลี่ยนชีวิตจริงๆ', name: 'คุณนิดา', role: 'ลดน้ำหนัก 7kg ใน 3 เดือน', init: 'น', bg: 'linear-gradient(135deg,#30d158,#0a84ff)' },
  { quote: 'ในฐานะนักกีฬา KcalPath มีฐานข้อมูลอาหารไทยครบที่สุดที่เคยใช้ โปรตีนแม่นยำมาก', name: 'คุณกิตติ', role: 'นักวิ่งมาราธอน', init: 'ก', bg: 'linear-gradient(135deg,#ff9f0a,#ff453a)' },
  { quote: 'แนะนำให้คนไข้ทุกคน ข้อมูลแม่นยำ ใช้งานง่าย เหมาะกับคนไทยมากที่สุด', name: 'พญ. ดารา', role: 'แพทย์โภชนาการ', init: 'ด', bg: 'linear-gradient(135deg,#0a84ff,#5e5ce6)' },
]

const footerCols = [
  { title: 'ผลิตภัณฑ์', links: ['ฟีเจอร์', 'ราคา', 'ดาวน์โหลด', 'API'] },
  { title: 'บริษัท',    links: ['เกี่ยวกับ', 'ร่วมงาน', 'ข่าวสาร', 'ติดต่อ'] },
  { title: 'ช่วยเหลือ', links: ['คู่มือ', 'บล็อก', 'ชุมชน', 'สนับสนุน'] },
]

const onScroll = () => scrolled.value = window.scrollY > 10
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const onMouse = (e) => {
  const glow = document.querySelector('.s1-glow')
  if (!glow) return
  glow.style.background = `radial-gradient(ellipse 60% 40% at ${(e.clientX/window.innerWidth)*100}% ${(e.clientY/window.innerHeight)*60}%, rgba(48,209,88,.11) 0%, transparent 70%)`
}

/* scroll reveal directive */
const vObserve = {
  mounted(el) {
    el.style.opacity = '0'
    el.style.transform = 'translateY(36px)'
    el.style.transition = 'opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)'
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity='1'; el.style.transform='none'; io.disconnect() }
    }, { threshold: .08 })
    io.observe(el)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,200;0,300;0,400;0,700;0,900;1,700&family=Noto+Sans+Thai:wght@200;300;400;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.page {
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
  background: #000; color: #f5f5f7;
  overflow-x: hidden; -webkit-font-smoothing: antialiased;
}

/* ── SHARED ── */
.eyebrow {
  font-size: .75rem; font-weight: 600; color: #30d158;
  letter-spacing: .12em; text-transform: uppercase; margin-bottom: 14px;
}
.h2-big {
  font-family: 'Prompt', sans-serif; font-weight: 700;
  font-size: clamp(2.2rem, 5vw, 4.8rem); line-height: 1.05; letter-spacing: -.035em; color: #f5f5f7;
}
.h2-big em {
  font-style: normal;
  background: linear-gradient(135deg, #30d158 0%, #34aadc 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.btn-green {
  font-family: 'Prompt', sans-serif; font-size: .98rem; font-weight: 600;
  background: #30d158; color: #000; border: none; border-radius: 980px;
  padding: 13px 26px; cursor: pointer; transition: all .22s; letter-spacing: .01em;
}
.btn-green:hover { background: #28b84c; transform: scale(.97); }
.btn-green.lg { font-size: 1.05rem; padding: 16px 32px; }
.btn-line {
  font-family: 'Prompt', sans-serif; font-size: .98rem;
  background: none; border: none; color: #30d158; cursor: pointer;
  display: inline-flex; align-items: center; gap: 3px; transition: opacity .2s;
}
.btn-line span { font-size: 1.3rem; line-height: .9; }
.btn-line:hover { opacity: .7; }

/* ── NAV ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 999;
  height: 52px; display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px;
  background: rgba(0,0,0,.65); backdrop-filter: saturate(180%) blur(32px);
  border-bottom: 1px solid rgba(255,255,255,.05); transition: background .35s;
}
.nav.scrolled { background: rgba(0,0,0,.9); }
.logo {
  font-family: 'Prompt', sans-serif; font-weight: 700; font-size: .95rem;
  color: #f5f5f7; display: flex; align-items: center; gap: 7px; letter-spacing: .02em; cursor: pointer;
}
.nav-mid { display: flex; gap: 28px; }
.nl { font-size: .8rem; color: #86868b; cursor: pointer; transition: color .2s; text-decoration: none; letter-spacing: .01em; }
.nl:hover { color: #f5f5f7; }
.nav-end { display: flex; align-items: center; gap: 12px; }
.n-text { font-size: .8rem; color: #30d158; background: none; border: none; cursor: pointer; transition: opacity .2s; }
.n-text:hover { opacity: .7; }
.n-pill {
  font-size: .8rem; font-weight: 600; background: #30d158; color: #000;
  border: none; border-radius: 980px; padding: 6px 17px; cursor: pointer; transition: all .2s;
}
.n-pill:hover { background: #28b84c; transform: scale(.97); }

/* ══ S1 — HERO ══ */
.s1 {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  text-align: center; padding: 110px 24px 80px;
  position: relative; overflow: hidden; background: #000;
}
.s1-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 25%, transparent 100%);
}
.s1-glow {
  position: absolute; inset: 0; pointer-events: none; transition: background .3s ease;
  background: radial-gradient(ellipse 65% 40% at 50% 0%, rgba(48,209,88,.1) 0%, transparent 70%);
}
.s1-inner { position: relative; z-index: 2; max-width: 900px; width: 100%; }

/* staggered headline */
.s1-hl { margin-bottom: 22px; }
.hl-line {
  font-family: 'Prompt', sans-serif; font-weight: 700;
  font-size: clamp(4rem, 11vw, 11rem); line-height: .96; letter-spacing: -.05em; display: block;
}
.hl-g em {
  font-style: normal;
  background: linear-gradient(135deg, #30d158 0%, #34aadc 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.s1-sub {
  font-size: clamp(.9rem, 1.5vw, 1.15rem); font-weight: 300; color: #6e6e73;
  line-height: 1.8; margin-bottom: 36px;
}
.s1-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px; }

/* stat pills */
.pill-cluster {
  display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;
}
.spill {
  display: flex; flex-direction: column; align-items: center;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
  border-radius: 14px; padding: 12px 20px; gap: 3px;
  backdrop-filter: blur(12px);
}
.spill-n { font-family: 'Prompt', sans-serif; font-size: 1.4rem; font-weight: 700; line-height: 1; letter-spacing: -.02em; }
.spill-l { font-size: .62rem; color: #6e6e73; font-weight: 300; }

/* ambient bg number */
.ambient-num {
  position: absolute; right: -2%; bottom: -4%; z-index: 1; pointer-events: none;
  font-family: 'Prompt', sans-serif; font-weight: 900;
  font-size: clamp(10rem, 28vw, 28rem); line-height: 1; letter-spacing: -.05em;
  color: rgba(255,255,255,.025); user-select: none;
}

/* scroll cue */
.scroll-cue {
  position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 3;
}
.sc-line {
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, rgba(48,209,88,.6), transparent);
  animation: scPulse 2s ease-in-out infinite;
}
.scroll-cue span { font-size: .62rem; color: #6e6e73; letter-spacing: .1em; }
@keyframes scPulse { 0%,100%{opacity:.4;transform:scaleY(.7)} 50%{opacity:1;transform:scaleY(1)} }

/* hero animations */
.s1-a1 { animation: up .7s .1s both; }
.s1-a2 { animation: up .7s .18s both; }
.s1-a3 { animation: up .7s .24s both; }
.s1-a4 { animation: up .7s .32s both; }
.s1-a5 { animation: up .7s .4s both; }
.s1-a6 { animation: up .7s .48s both; }
@keyframes up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

/* ══ CAT SECTIONS ══ */
.cat-section {
  display: grid; grid-template-columns: 1fr 1fr;
  min-height: 100vh; overflow: hidden;
  border-top: 1px solid rgba(255,255,255,.07);
}
.cs-media { position: relative; overflow: hidden; }
.cs-media-inner { position: relative; width: 100%; height: 100%; }
.cs-gif, .cs-vid {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 8s ease;
}
.cat-section:hover .cs-gif,
.cat-section:hover .cs-vid { transform: scale(1.03); }
.cs-media-overlay {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(to right, rgba(0,0,0,.2) 0%, transparent 100%);
}
.cs-right .cs-media-overlay {
  background: linear-gradient(to left, rgba(0,0,0,.2) 0%, transparent 100%);
}
.cs-num-bg {
  position: absolute; bottom: -2%; right: -1%; pointer-events: none;
  font-family: 'Prompt', sans-serif; font-weight: 900;
  font-size: clamp(6rem, 14vw, 14rem); line-height: 1; letter-spacing: -.05em;
  color: rgba(255,255,255,.06); user-select: none;
}

.cs-text {
  display: flex; flex-direction: column; justify-content: center;
  padding: 80px 64px; background: #000;
}
.cs-right .cs-text { background: #080808; }
.cs-h2 {
  font-family: 'Prompt', sans-serif; font-weight: 700;
  font-size: clamp(2.8rem, 5vw, 5.5rem); line-height: 1; letter-spacing: -.04em;
  color: #f5f5f7; margin-bottom: 4px;
}
.cs-en { font-size: .82rem; color: #6e6e73; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 22px; }
.cs-desc {
  font-size: clamp(.88rem, 1.3vw, 1.05rem); font-weight: 300; color: #86868b;
  line-height: 1.8; margin-bottom: 28px;
}
.cs-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 32px; }
.cs-tags span {
  font-size: .72rem; background: rgba(255,255,255,.05); color: #a1a1a6;
  border: 1px solid rgba(255,255,255,.08); border-radius: 980px; padding: 5px 14px;
  transition: all .2s; cursor: default;
}
.cs-tags span:hover { background: rgba(48,209,88,.08); border-color: rgba(48,209,88,.2); color: #30d158; }
.cs-stat-row { display: flex; gap: 28px; }
.csr { display: flex; flex-direction: column; gap: 3px; }
.csr-n {
  font-family: 'Prompt', sans-serif; font-size: 1.8rem; font-weight: 700;
  letter-spacing: -.03em; color: #f5f5f7; line-height: 1;
}
.csr-n span { font-size: .85rem; color: #6e6e73; font-weight: 300; }
.csr-l { font-size: .65rem; color: #6e6e73; letter-spacing: .04em; }

/* ══ STATS ══ */
.s-stats {
  background: #080808; border-top: 1px solid rgba(255,255,255,.07);
  padding: 100px 0;
}
/* scrolling marquee */
.stat-marquee { overflow: hidden; margin-bottom: 80px; padding: 16px 0; border-top: 1px solid rgba(255,255,255,.05); border-bottom: 1px solid rgba(255,255,255,.05); }
.sm-inner { display: flex; gap: 0; animation: marquee 28s linear infinite; }
.sm-item {
  flex-shrink: 0; padding: 0 52px; display: flex; align-items: center; gap: 14px;
  border-right: 1px solid rgba(255,255,255,.07);
}
.sm-n {
  font-family: 'Prompt', sans-serif; font-size: 1.6rem; font-weight: 700;
  letter-spacing: -.03em; color: #f5f5f7; white-space: nowrap;
}
.sm-n span { color: #30d158; }
.sm-l { font-size: .72rem; color: #6e6e73; white-space: nowrap; }
@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

.stat-row {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 1px; background: rgba(255,255,255,.07);
  max-width: 1080px; margin: 0 auto; border-radius: 20px; overflow: hidden;
}
.sr-block { background: #080808; padding: 52px 48px; }
.srb-num {
  font-family: 'Prompt', sans-serif; font-size: clamp(2.5rem,5vw,4.5rem);
  font-weight: 700; letter-spacing: -.04em; color: #f5f5f7; line-height: 1; margin-bottom: 8px;
}
.srb-num span { color: #30d158; }
.srb-label { font-size: .95rem; font-weight: 300; color: #a1a1a6; margin-bottom: 10px; }
.srb-desc { font-size: .78rem; font-weight: 300; color: #6e6e73; line-height: 1.75; }

/* ══ HOW IT WORKS ══ */
.s-how {
  padding: 120px 48px; max-width: 1180px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 2fr; gap: 80px; align-items: start;
}
.how-head { position: sticky; top: 88px; }
.how-steps {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 1px; background: rgba(255,255,255,.07); border-radius: 20px; overflow: hidden;
}
.hs { background: #000; padding: 40px 32px; display: flex; flex-direction: column; gap: 12px; }
.hs:first-child { border-radius: 20px 0 0 20px; } .hs:last-child { border-radius: 0 20px 20px 0; }
.hs-num { font-size: .7rem; font-weight: 600; color: #30d158; letter-spacing: .09em; }
.hs-line { height: 1px; background: rgba(255,255,255,.08); }
.hs-title { font-family: 'Prompt', sans-serif; font-size: 1.15rem; font-weight: 700; color: #f5f5f7; line-height: 1.25; }
.hs-desc { font-size: .8rem; color: #86868b; line-height: 1.75; font-weight: 300; flex: 1; }
.hs-arrow { color: #30d158; font-size: 1.3rem; margin-top: 4px; }

/* ══ REVIEWS ══ */
.s-reviews {
  padding: 120px 48px; max-width: 1180px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 2fr; gap: 80px; align-items: start;
  border-top: 1px solid rgba(255,255,255,.07);
}
.rev-head { position: sticky; top: 88px; }
.rev-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.rv {
  background: #0a0a0a; border-radius: 18px; padding: 26px;
  border: 1px solid rgba(255,255,255,.07);
  display: flex; flex-direction: column; gap: 14px;
  transition: border-color .3s;
}
.rv:hover { border-color: rgba(48,209,88,.18); }
.rv:last-child { grid-column: 1 / -1; }
.rv-stars { color: #30d158; font-size: .82rem; letter-spacing: 2px; }
.rv-q { font-size: .87rem; color: #f5f5f7; line-height: 1.8; font-weight: 300; font-style: italic; flex: 1; }
.rv-a { display: flex; align-items: center; gap: 10px; margin-top: auto; }
.rv-av { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .8rem; font-weight: 700; color: #000; flex-shrink: 0; }
.rv-name { font-size: .78rem; font-weight: 600; color: #f5f5f7; }
.rv-role { font-size: .66rem; color: #6e6e73; }

/* ══ FINAL CTA ══ */
.s-cta {
  position: relative; padding: 180px 24px; text-align: center;
  overflow: hidden; background: #000;
  border-top: 1px solid rgba(255,255,255,.07);
}
.cta-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%);
}
.cta-glow {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse 65% 55% at 50% 50%, rgba(48,209,88,.08) 0%, transparent 70%);
}
.cta-inner { position: relative; z-index: 2; }
.cta-h2 {
  font-family: 'Prompt', sans-serif; font-weight: 700;
  font-size: clamp(3rem, 8vw, 8rem); line-height: 1; letter-spacing: -.05em;
  color: #f5f5f7; margin-bottom: 20px;
}
.cta-h2 em {
  font-style: normal;
  background: linear-gradient(135deg, #30d158, #34aadc);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.cta-sub { font-size: clamp(.88rem,1.4vw,1.08rem); font-weight: 300; color: #6e6e73; line-height: 1.8; margin-bottom: 44px; }
.cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

/* ══ FOOTER ══ */
.footer { background: #0a0a0a; border-top: 1px solid rgba(255,255,255,.07); padding: 52px 48px 28px; }
.footer-top { display: grid; grid-template-columns: 220px repeat(3,1fr); gap: 32px; margin-bottom: 40px; }
.f-brand { display: flex; flex-direction: column; gap: 10px; }
.f-logo { font-family: 'Prompt', sans-serif; font-weight: 700; font-size: .92rem; color: #f5f5f7; display: flex; align-items: center; gap: 7px; }
.f-desc { font-size: .68rem; color: #6e6e73; line-height: 1.6; }
.f-col h4 { font-size: .68rem; font-weight: 600; color: #f5f5f7; letter-spacing: .02em; margin-bottom: 14px; }
.f-col a { display: block; font-size: .68rem; color: #6e6e73; text-decoration: none; margin-bottom: 9px; transition: color .2s; cursor: pointer; }
.f-col a:hover { color: #f5f5f7; }
.footer-bot {
  border-top: 1px solid rgba(255,255,255,.07); padding-top: 20px;
  display: flex; justify-content: space-between; align-items: center;
}
.footer-bot > span { font-size: .64rem; color: #6e6e73; }
.f-legal { display: flex; gap: 18px; }
.f-legal a { font-size: .64rem; color: #6e6e73; text-decoration: none; cursor: pointer; transition: color .2s; }
.f-legal a:hover { color: #f5f5f7; }

/* ══ RESPONSIVE ══ */
@media (max-width: 860px) {
  .nav-mid { display: none; }
  .cat-section { grid-template-columns: 1fr; }
  .cs-right { direction: ltr; }
  .cs-right .cs-text { order: -1; }
  .cs-media { min-height: 50vw; }
  .cs-text { padding: 48px 24px; }
  .s-how, .s-reviews { grid-template-columns: 1fr; gap: 40px; }
  .how-head, .rev-head { position: static; }
  .how-steps, .rev-grid { grid-template-columns: 1fr; }
  .hs { border-radius: 0 !important; }
  .rv:last-child { grid-column: auto; }
  .stat-row { grid-template-columns: 1fr; border-radius: 0; }
  .footer-top { grid-template-columns: 1fr 1fr; }
}
</style>