<template>
  <div class="bg-gray-50 min-h-screen p-4 font-sans">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-bold text-blue-600">Cat Viewer</h1>
      <div>
        <router-link v-if="!isAuthenticated()" to="/" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          🏠 Inicio
        </router-link>
        <button v-else @click="handleLogout" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
          Cerrar sesión
        </button>
      </div>
    </div>
    <div class="mb-4 flex gap-2" v-if="!isAuthenticated()">
      <router-link to="/login">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Iniciar sesión</button>
      </router-link>
      <router-link to="/register">
        <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">Registrarse</button>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/services/authService'
import { useRouter } from 'vue-router'
const { isAuthenticated, logout } = useAuth()
const router = useRouter()

const handleLogout = async () => {
  await logout()
  router.push('/login')
}
</script>

<style>

</style>
