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
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const router = useRouter()

onMounted(() => {
  // Listen for auth state changes - waits for Supabase to parse URL hash
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        subscription.unsubscribe()
        
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

        router.push('/dashboard')
      } else if (event === 'SIGNED_OUT') {
        router.push('/login')
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