<template>
    <img :src="imageUrl" class="cat-image" :alt="altText" />
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType, computed } from 'vue'
  import { supabase } from '@/lib/supabase'
  
  export default defineComponent({
    props: {
      imagePath: {
        type: String as PropType<string>,
        required: true
      },
      altText: {
        type: String,
        default: 'Cat image'
      },
      width: {
        type: Number,
        default: 300
      }
    },
    setup(props) {
      const imageUrl = computed(() => {
        return supabase.storage
          .from('cat-images')
          .getPublicUrl(props.imagePath, {
            transform: {
              width: props.width,
              height: props.width,
              resize: 'cover'
            }
          }).data.publicUrl
      })
  
      return { imageUrl }
    }
  })
  </script>