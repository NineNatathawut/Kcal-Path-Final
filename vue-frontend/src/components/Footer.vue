<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-left">
        <span class="footer-brand">KcalPath</span>
        <span class="footer-tagline">— แพลตฟอร์มโภชนาการเพื่อคนไทย</span>
      </div>
      <nav class="footer-links">
        <router-link to="/" class="footer-link">เกี่ยวกับเรา</router-link>
        <a href="mailto:kcalpath@gmail.com" class="footer-link">Gmail: kcalpath@gmail.com</a>
      </nav>
    </div>
    <div class="footer-copyright">
      Copyright © 2026 KcalPath. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
.footer {
  background: #0a0a0a;
  border-top: 1px solid rgba(255,255,255,.07);
  padding: 32px 48px;
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-brand {
  font-family: 'Prompt', sans-serif;
  font-weight: 700;
  font-size: .9rem;
  color: #f5f5f7;
}

.footer-tagline {
  font-size: .75rem;
  color: #6e6e73;
  font-weight: 300;
}

.footer-links {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.footer-link {
  font-size: .75rem;
  color: #86868b;
  text-decoration: none;
  transition: color .2s;
  cursor: pointer;
}

.footer-link:hover {
  color: #f5f5f7;
}

.footer-copyright {
  text-align: center;
  font-size: .64rem;
  color: #6e6e73;
  font-weight: 300;
}

/* Responsive */
@media (max-width: 640px) {
  .footer {
    padding: 24px;
  }
  .footer-inner {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .footer-links {
    gap: 16px;
    justify-content: center;
  }
  .footer-left {
    text-align: center;
  }
}
</style>