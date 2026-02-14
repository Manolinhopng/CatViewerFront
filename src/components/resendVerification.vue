<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

const email = ref('')
const errorMessage = ref('')
const infoMessage = ref('')

const resendVerification = async () => {
  errorMessage.value = ''
  infoMessage.value = ''
  if (!email.value) {
    errorMessage.value = 'Ingresa tu correo para reenviar la verificación.'
    return
  }
  // Supabase requiere password, pero puedes intentar solo con email para magic link
  // Si tu flujo requiere password, agrega un input para password también
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email.value
  })
  if (error) {
    errorMessage.value = 'No se pudo reenviar el correo: ' + error.message
  } else {
    infoMessage.value = 'Si tu cuenta no está verificada, se ha reenviado el correo de verificación.'
  }
}
</script>

<template>
  <div class="max-w-sm mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 items-center border-2 border-yellow-200 mt-10">
    <h2 class="text-2xl font-bold text-yellow-700 mb-2">Reenviar verificación</h2>
    <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
    <button @click="resendVerification" class="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition">Reenviar correo</button>
    <p v-if="errorMessage" class="error text-red-500 mt-2">{{ errorMessage }}</p>
    <p v-if="infoMessage" class="text-green-600 mt-2">{{ infoMessage }}</p>
  </div>
</template>
