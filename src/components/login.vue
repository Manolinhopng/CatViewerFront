<script setup lang="ts">
import { useAuth } from '@/services/authService'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'vue-router'

const { login, signUp, user, isAuthenticated } = useAuth()
const email = ref('')
const password = ref('')
const name = ref('')
const errorMessage = ref('')
const isRegister = ref(false)
const showReset = ref(false)
const resetEmail = ref('')
const resetMessage = ref('')
const router = useRouter()
const infoMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  const { success, error } = await login(email.value, password.value)
  if (!success) {
    if (error?.toLowerCase().includes('invalid login credentials')) {
      errorMessage.value = 'Correo o contraseña incorrectos.'
    } else if (error?.toLowerCase().includes('user not found')) {
      errorMessage.value = 'El correo no está registrado.'
    } else {
      errorMessage.value = error || 'Error desconocido'
    }
  } else {
    router.push('/')
  }
}

const handleRegister = async () => {
  const { success, error } = await signUp(name.value, email.value, password.value)
  if (!success) {
    errorMessage.value = error || 'Error desconocido'
  } else {
    errorMessage.value = 'Registro exitoso. Revisa tu correo.'
    isRegister.value = false
    name.value = ''
    email.value = ''
    password.value = ''
  }
}

const handleResetPassword = async () => {
  resetMessage.value = ''
  if (!resetEmail.value) {
    resetMessage.value = 'Por favor ingresa tu correo.'
    return
  }
  const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.value, {
    redirectTo: 'http://localhost:5173/reset-password'
  })
  if (!error) {
    resetMessage.value = 'Si el correo está registrado, recibirás instrucciones para restablecer tu contraseña.'
  } else {
    resetMessage.value = error.message || 'No se pudo enviar el correo de recuperación.'
  }
}

// Helper para mostrar el nombre del usuario
function getUserName() {
  return user.value?.user_metadata?.name || user.value?.email || ''
}
</script>

<template>
  <div v-if="!isAuthenticated()">
    <div class="max-w-sm mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 items-center border-2 border-yellow-200 relative">
      <div class="absolute -top-10 left-1/2 -translate-x-1/2">
        <span class="text-6xl">🐾</span>
      </div>
      <h2 class="text-2xl font-bold text-yellow-700 mb-2 mt-6">Iniciar sesión</h2>
      <template v-if="!showReset">
        <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
        <input v-model="password" type="password" placeholder="Contraseña" class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
        <button @click="handleLogin" class="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition">Iniciar sesión</button>
        <button @click="showReset = true" class="text-xs text-yellow-600 hover:underline mt-1">¿Olvidaste tu contraseña?</button>
        <router-link to="/resend-verification" class="text-xs text-yellow-600 hover:underline mt-1">
          ¿No recibiste el correo de verificación? Reenviar
        </router-link>
        <p class="text-sm mt-2">
          ¿No tienes cuenta? <router-link to="/register" class="text-yellow-600 hover:underline">Regístrate</router-link>
        </p>
        <p v-if="errorMessage" class="error text-red-500 mt-2">{{ errorMessage }}</p>
        <p v-if="infoMessage" class="text-green-600 mt-2">{{ infoMessage }}</p>
      </template>
      <template v-else>
        <input v-model="resetEmail" type="email" placeholder="Tu correo electrónico" class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
        <button @click="handleResetPassword" class="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition">Enviar recuperación</button>
        <button @click="showReset = false" class="text-xs text-yellow-600 hover:underlinse mt-1">Volver a iniciar sesión</button>
        <p v-if="resetMessage" class="text-yellow-700 mt-2">{{ resetMessage }}</p>
      </template>
    </div>
  </div>

</template>

<style scoped>
body {
  background: linear-gradient(135deg, #fef6e4 0%, #f9dcc4 100%);
}

</style>