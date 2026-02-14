<template>
    <div v-for="image in activeImages" :key="image.id" class="image-card">
      <img :src="getImageUrl(image.path)" />
      <button @click="handleSoftDelete(image.id)">Eliminar</button>
    </div>

</template>
    <script lang="ts">
import { defineComponent, ref } from 'vue'
import { getActiveImages } from '@/services/imageService'
import { softDeleteImage } from '@/services/api/deleteImage'
import { supabase } from '@/lib/supabase'

export default defineComponent({
  setup() {
    const images = ref([])
    const loading = ref(false)

    const loadImages = async () => {
      loading.value = true
      try {
        const user = supabase.auth.user()
        if (user) {
          images.value = await getActiveImages(user.id)
        }
      } finally {
        loading.value = false
      }
    }

    const handleDelete = async (imageId: number) => {
      try {
        await softDeleteImage(imageId)
        await loadImages() // Recargar lista después de eliminar
      } catch (error) {
        console.error("Error eliminando imagen:", error)
      }
    }

    // Cargar imágenes al montar el componente
    loadImages()

    return { images, loading, handleDelete }
  }
})
</script>