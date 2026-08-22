import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import AddFoodView from '../views/AddFoodView.vue'
import RegisterView from '../views/RegisterView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',          // หน้าแรกสุด (ต้อนรับ)
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',     // หน้าเข้าสู่ระบบ
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard', // หน้าแผงควบคุม
      name: 'dashboard',
      component: DashboardView,
      // 🏷️ ติดป้ายบอกยามว่าหน้านี้เป็นเขตหวงห้าม ต้อง Login ก่อน!
      meta: { requiresAuth: true }
    },
    {
      path: '/add-food',
      name: 'add-food',
      component: AddFoodView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/edit-profile',
      name: 'edit-profile',
      component: () => import('../views/EditProfileView.vue')
    },
    // เพิ่มโค้ดก้อนนี้เข้าไปใน array ของ routes
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/HistoryView.vue')
    },
    {
      path: '/auth/callback',
      name: 'auth-callback',
      component: () => import('../views/AuthCallbackView.vue')
    }
  ]
})

// 💂‍♂️ จ้างยามเฝ้าประตู (Navigation Guard)
router.beforeEach((to, from) => {
  // 1. เช็คว่าหน้าที่จะไป (to) มีป้ายหวงห้าม (requiresAuth) ไหม?
  if (to.meta.requiresAuth) {
    // 2. ถ้ามี ให้เช็คว่าในกระเป๋า (localStorage) มีตั๋วล็อกอินหรือยัง?
    const isLoggedIn = localStorage.getItem('isLoggedIn')

    if (isLoggedIn === 'true') {
      return true // มีตั๋ว ปล่อยผ่านได้เลย!
    } else {
      alert('หยุดก่อน! 🛑 คุณต้องเข้าสู่ระบบก่อนถึงจะเข้าใช้งานได้ครับ')
      return '/login' // ไม่มีตั๋ว เตะกลับไปหน้า Login!
    }
  }
  // 3. ถ้าเป็นหน้าทั่วไป (Home, Login) ปล่อยผ่านได้เลย
  return true
})

export default router