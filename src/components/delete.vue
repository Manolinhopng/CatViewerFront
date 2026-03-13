<template>
  <div v-if="loading" class="loading">Cargando imágenes...</div>
  <div v-else class="images-grid">
    <div v-for="image in images" :key="image.id" class="image-card">
      <img :src="image.public_url" :alt="'Gato ' + image.id" />
      <button @click="handleDelete(image.id)" class="delete-btn">Eliminar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getActiveImages, softDeleteImage } from '@/services/imageService'
import { useAuth } from '@/services/authService'

export default defineComponent({
  name: 'DeleteImages',
  setup() {
    const images = ref<any[]>([])
    const loading = ref(false)
    const { user } = useAuth()

    const loadImages = async () => {
      if (!user.value) return
      loading.value = true
      try {
        images.value = await getActiveImages(user.value.id)
      } catch (error) {
        console.error("Error cargando imágenes:", error)
      } finally {
        loading.value = false
      }
    }

    const handleDelete = async (imageId: string) => {
      if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) return
      
      try {
        await softDeleteImage(imageId)
        await loadImages() // Recargar lista después de eliminar
      } catch (error) {
        console.error("Error eliminando imagen:", error)
      }
    }

    onMounted(() => {
      loadImages()
    })

    return { images, loading, handleDelete }
  }
})
</script>

<style scoped>
.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.image-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.image-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.delete-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
}

.delete-btn:hover {
  background: #dc2626;
}
</style>