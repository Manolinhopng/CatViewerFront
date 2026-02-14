<template>
    <div class="community">
      <div class="upload-section">
        <upload @upload-success="refreshContent" />
      </div>
      
      <div class="ranking-section">
        <h2>Razas más populares</h2>
        <ranking />
      </div>
      
      <div class="comments-section">
        <comments />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Upload from '@/components/upload.vue';
  import Ranking from '@/components/rankingSideBar.vue';
  import Comments from '@/components/comments.vue';
  
  export default defineComponent({
    components: { Upload, Ranking, Comments },
    setup() {
      const refreshContent = () => {
        // Lógica para refrescar comentarios/ranking
      };
      
      return { refreshContent };
    }
  });
  </script>