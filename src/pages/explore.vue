<template>
    <div class="explore">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-blue-600">Explorar Gato</h2>
        <router-link to="/" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          🏠 Volver al Inicio
        </router-link>
      </div>
      
      <cat-display 
        :primary-color="$route.params.primaryColor as string"
        :secondary-color="$route.params.secondaryColor as string"
        :breed-id="$route.params.breedId as string"
      />
      
      <like-system 
        :breed-id="$route.params.breedId as string"
        :user-id="'temp-user-id'"
        class="like-section"
      />
      
      <comments
        :breed-id="$route.params.breedId as string"
        :primary-color="$route.params.primaryColor as string"
        :secondary-color="$route.params.secondaryColor as string"
      />
      
      <router-link to="/community" class="community-link">
        Ver en Comunidad
      </router-link>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import CatDisplay from '@/components/catDisplay.vue';
  import LikeSystem from '@/components/likeSystem.vue';
  import Comments from '@/components/comments.vue';
  
  export default defineComponent({
    components: { CatDisplay, LikeSystem, Comments }
  });
  </script>