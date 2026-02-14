import { createRouter, createWebHistory } from 'vue-router'
import Explore from '@/pages/explore.vue';
import Community from '@/pages/community.vue';
import Home from '@/pages/index.vue' // o usa '@pages/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
  },
  {
    path: '/community',
    name: 'Community',
    component: Community
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/register.vue')
  },
  {
    path: '/explore/:breedId/:primaryColor/:secondaryColor',
    name: 'ExploreBreedColor',
    component: Explore
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/pages/resetPassword.vue')
  },
  {
    path: '/resend-verification',
    name: 'ResendVerification',
    component: () => import('@/components/resendVerification.vue')
  },
  {
    path: '/ranking',
    name: 'RankingPage',
    component: () => import('@/pages/rankingPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router