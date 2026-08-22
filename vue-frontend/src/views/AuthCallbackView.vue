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

onMounted(async () => {
  // Fallback: redirect to login if auth state doesn't resolve within 5 seconds
  const fallbackTimer = setTimeout(() => {
    window.location.replace('/login')
  }, 5000)

  // Helper function to process session and redirect
  async function processSession(session) {
    clearTimeout(fallbackTimer)
    
    // Get local user ID (fallback to Supabase UUID)
    let localUserId = session.user.id
    let displayName = session.user.email || session.user.user_metadata?.full_name || 'User'
    
    try {
      const { data: user } = await supabase
        .from('users')
        .select('id, username')
        .eq('email', session.user.email)
        .single()
      if (user) {
        localUserId = user.id
        displayName = user.username
      }
    } catch (err) {
      console.warn('Local user fetch failed, using auth ID:', err)
    }

    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userId', localUserId)
    localStorage.setItem('username', displayName)

    // Use full page reload to avoid SPA race condition on Vercel
    setTimeout(() => {
      window.location.replace('/dashboard')
    }, 200)
  }

  // 1. FIRST: Check for existing session immediately (catches INITIAL_SESSION from URL hash)
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (session) {
      await processSession(session)
      return
    }
    
    if (error) {
      console.warn('getSession error, falling back to listener:', error)
    }
  } catch (err) {
    console.warn('getSession failed, falling back to listener:', err)
  }

  // 2. SECOND: Listen for future auth state changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (session && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
        subscription.unsubscribe()
        await processSession(session)
      } else if (event === 'SIGNED_OUT') {
        clearTimeout(fallbackTimer)
        setTimeout(() => {
          window.location.replace('/login')
        }, 100)
      }
    }
  )
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