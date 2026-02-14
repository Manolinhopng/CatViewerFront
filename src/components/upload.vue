<template>
    <input type="file" @change="handleUpload" accept="image/*">
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import { supabase } from '@/lib/supabase'
  
  export default defineComponent({
    emits: ['upload-success'],
    setup(props, { emit }) {
      const handleUpload = async (event: Event) => {
        const fileInput = event.target as HTMLInputElement
        if (!fileInput.files?.length) return
        
        const file = fileInput.files[0]
        const filePath = `public/${Date.now()}_${file.name}`
        
        const { data, error } = await supabase.storage
          .from('cat-images') // Nombre de tu bucket
          .upload(filePath, file)
        
        if (error) {
          console.error('Error uploading:', error)
          return
        }
        
        // Obtener URL pública
        const { data: { publicUrl } } = supabase.storage
          .from('cat-images')
          .getPublicUrl(data.path)
        
        emit('upload-success', {
          publicUrl,
          path: data.path
        })
      }
  
      return { handleUpload }
    }
  })
  </script>