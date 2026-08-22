<template>
  <div class="callback-page">
    <div class="callback-card">
      <div class="spinner"></div>
      <p>กำลังเข้าสู่ระบบ...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { supabase } from '@/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  // Parse tokens from URL query params (Supabase returns tokens in query string when using redirectTo)
  const params = new URLSearchParams(window.location.search)
  const accessToken = params.get('access_token')
  const refreshToken = params.get('refresh_token')

  if (accessToken && refreshToken) {
    // Set session directly in Supabase client
    const { error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    })

    if (!error) {
      // Save minimal auth state to localStorage
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userId', 'oauth-user') // placeholder, real ID fetched on dashboard load
      localStorage.setItem('username', 'User')      // placeholder
      
      // Hard redirect to dashboard (full page reload to avoid SPA race conditions)
      window.location.replace('/dashboard')
      return
    }
  }

  // Fallback: try getSession (for hash-based flows or if tokens already in storage)
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userId', session.user.id)
    localStorage.setItem('username', session.user.email || 'User')
    window.location.replace('/dashboard')
    return
  }

  // Fast fail: no tokens, no session → back to login immediately
  window.location.replace('/login')
})
</script>

<style scoped>
.callback-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  color: #f5f5f7;
  font-family: 'Noto Sans Thai', 'Prompt', sans-serif;
}
.callback-card {
  text-align: center;
  padding: 40px;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255,255,255,.1);
  border-top-color: #30d158;
  border-radius: 50%;
  margin: 0 auto 16px;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>