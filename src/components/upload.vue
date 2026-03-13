<template>
  <div class="upload-container">
    <label class="upload-button">
      <span>📤 Subir mi gato</span>
      <input type="file" @change="handleUpload" accept="image/*" class="hidden">
    </label>
    <div v-if="uploading" class="upload-status">Subiendo...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/services/authService'
import { authFetch, API_URL } from '@/lib/api'

export default defineComponent({
  emits: ['upload-success'],
  setup(props, { emit }) {
    const { user } = useAuth()
    const uploading = ref(false)

    const handleUpload = async (event: Event) => {
      const fileInput = event.target as HTMLInputElement
      if (!fileInput.files?.length) return
      
      if (!user.value) {
        alert('Debes iniciar sesión para subir imágenes')
        return
      }

      uploading.value = true
      const file = fileInput.files[0]
      const filePath = `public/${Date.now()}_${file.name}`
      
      try {
        const { data, error } = await supabase.storage
          .from('cat-images')
          .upload(filePath, file)
        
        if (error) throw error
        
        const { data: { publicUrl } } = supabase.storage
          .from('cat-images')
          .getPublicUrl(data.path)
        
        // Registrar en el backend (el JWT del header autentica y provee user_id)
        const response = await authFetch(`${API_URL}/api/images/upload`, {
          method: 'POST',
          body: JSON.stringify({
            path: data.path,
            public_url: publicUrl
          })
        })

        if (!response.ok) {
          const errData = await response.json()
          throw new Error(errData.error || 'Error al registrar la imagen')
        }

        emit('upload-success', {
          publicUrl,
          path: data.path
        })
        
        alert('¡Gato subido con éxito!')
      } catch (error: any) {
        console.error('Error uploading:', error)
        alert('Error al subir la imagen: ' + error.message)
      } finally {
        uploading.value = false
      }
    }

    return { handleUpload, uploading }
  }
})
</script>

<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.upload-button {
  background: #4f46e5;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.upload-button:hover {
  background: #4338ca;
}

.hidden {
  display: none;
}

.upload-status {
  font-size: 0.9rem;
  color: #666;
}
</style>