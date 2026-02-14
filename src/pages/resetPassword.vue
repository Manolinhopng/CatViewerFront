<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = useRouter()

const newPassword = ref('')
const confirmPassword = ref('')
const message = ref('')
const loading = ref(false)

const handleReset = async () => {
  message.value = ''
  if (!newPassword.value || !confirmPassword.value) {
    message.value = 'Por favor ingresa y confirma tu nueva contraseña.'
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    message.value = 'Las contraseñas no coinciden.'
    return
  }
  loading.value = true
  // Usar el SDK de Supabase para cambiar la contraseña
  const { error } = await supabase.auth.updateUser({ password: newPassword.value })
  loading.value = false
  if (!error) {
    message.value = '¡Contraseña restablecida! Ahora puedes iniciar sesión.'
    setTimeout(() => router.push('/login'), 2000)
  } else {
    message.value = error.message || 'No se pudo restablecer la contraseña.'
  }
}
</script>

<template>
  <div class="max-w-sm mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 items-center border-2 border-yellow-200 mt-10">
    <h2 class="text-2xl font-bold text-yellow-700 mb-2">Restablecer contraseña</h2>
    <input v-model="newPassword" type="password" placeholder="Nueva contraseña" class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
    <input v-model="confirmPassword" type="password" placeholder="Confirmar contraseña" class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
    <button @click="handleReset" :disabled="loading" class="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition">
      {{ loading ? 'Procesando...' : 'Restablecer contraseña' }}
    </button>
    <p v-if="message" class="mt-2 text-yellow-700">{{ message }}</p>
  </div>
</template>

<style scoped>
body {
  background: linear-gradient(135deg, #fef6e4 0%, #f9dcc4 100%);
}
</style> 