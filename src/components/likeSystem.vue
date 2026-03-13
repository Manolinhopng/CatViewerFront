<template>
    <div class="like-system">
      <button @click="toggleLike" :class="{ 'liked': isLiked }" class="like-button">
        🐾 {{ likeCount }} Likes
      </button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { getBreedLikes, toggleBreedLike } from '@/services/likeService';
  
  export default defineComponent({
    name: 'LikeSystem',
    props: {
      breedId: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const isLiked = ref(false);
      const likeCount = ref(0);
  
      const toggleLike = async () => {
        try {
          const result = await toggleBreedLike(props.breedId);
          if (result && result.newCount !== undefined) {
            isLiked.value = !isLiked.value;
            likeCount.value = result.newCount;
          }
        } catch (error) {
          console.error("Error al dar like:", error);
        }
      };
  
      onMounted(async () => {
        try {
          const result = await getBreedLikes(props.breedId);
          if (result && result.count !== undefined) {
            likeCount.value = result.count;
          }
        } catch (error) {
          console.error("Error al obtener likes:", error);
        }
      });
  
      return { isLiked, likeCount, toggleLike };
    }
  });
  </script>

  <style scoped>
  .like-button {
    background: white;
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 5px 15px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .like-button.liked {
    background: #fef2f2;
    border-color: #ef4444;
    color: #ef4444;
  }
  </style>