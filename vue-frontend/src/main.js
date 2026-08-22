import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { supabase } from './supabase'

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    console.log('Supabase session established')
  } else if (event === 'SIGNED_OUT') {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
  }
})

const app = createApp(App)

app.use(router)

app.mount('#app')
