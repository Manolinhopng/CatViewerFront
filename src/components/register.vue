<script setup lang="ts">
import { useAuth } from '@/services/authService'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { signUp } = useAuth()
const email = ref('')
const password = ref('')
const name = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const router = useRouter()

const handleRegister = async () => {
  const { success, error } = await signUp(name.value, email.value, password.value)
  if (!success) {
    if (error && error.toLowerCase().includes('already registered')) {
      errorMessage.value = 'Este correo ya está registrado.'
    } else {
      errorMessage.value = error || 'Error desconocido'
    }
    successMessage.value = ''
  } else {
    errorMessage.value = ''
    successMessage.value = 'Registro exitoso. Revisa tu correo.'
    name.value = ''
    email.value = ''
    password.value = ''
    setTimeout(() => {
      router.push('/')
    }, 1200)
  }
}
</script>

<template>
  <div class="max-w-sm mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 items-center border-2 border-yellow-200 relative">
    <div class="absolute -top-10 left-1/2 -translate-x-1/2">
      <span class="text-6xl">🐱</span>
    </div>
    <h2 class="text-2xl font-bold text-yellow-700 mb-2 mt-6">Registrarse</h2>
    <input v-model="name" type="text" placeholder="Nombre" class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
    <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
    <input v-model="password" type="password" placeholder="Contraseña" class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
    <button @click="handleRegister" class="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition">Registrarse</button>
    <p class="text-sm mt-2">
      ¿Ya tienes una cuenta? <router-link to="/login" class="text-yellow-600 hover:underline">Inicia sesión</router-link>
    </p>
    <p v-if="errorMessage" class="error text-red-500 mt-2">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success text-green-600 mt-2">{{ successMessage }}</p>
  </div>
</template>

<style scoped>
body {
  background: linear-gradient(135deg, #fef6e4 0%, #f9dcc4 100%);
}
</style> 