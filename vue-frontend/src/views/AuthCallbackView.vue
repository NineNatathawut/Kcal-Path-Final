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

onMounted(async () => {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()
  
  if (sessionError || !session) {
    console.error('Auth callback error:', sessionError)
    router.push('/login')
    return
  }

  try {
    // Direct query to public.users table via Supabase Client
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, username')
      .eq('email', session.user.email)
      .single()

    if (userError || !user) {
      console.error('User not found in public.users:', userError)
      router.push('/login')
      return
    }

    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userId', user.id)
    localStorage.setItem('username', user.username)

    router.push('/dashboard')
  } catch (err) {
    console.error('Failed to sync local user:', err)
    router.push('/login')
  }
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