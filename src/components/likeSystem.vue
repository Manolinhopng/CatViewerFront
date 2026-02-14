<template>
    <div class="like-system">
      <button @click="toggleLike" :class="{ 'liked': isLiked }">
        🐾 {{ likeCount }} Likes
      </button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { getLikes, toggleLike as toggleLikeService } from '@/services/likeService';
  
  export default defineComponent({
    name: 'LikeSystem',
    props: {
      breedId: {
        type: String,
        required: true
      },
      userId: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const isLiked = ref(false);
      const likeCount = ref(0);
  
      const toggleLike = async () => {
        const result = await toggleLikeService(props.userId, props.breedId);
        if (result) {
          isLiked.value = !isLiked.value;
          likeCount.value = result.newCount;
        }
      };
  
      onMounted(async () => {
        const result = await getLikes(props.breedId);
        likeCount.value = result.count;
        // Aquí podrías consultar si el usuario ya dio like, si tienes ese endpoint
      });
  
      return { isLiked, likeCount, toggleLike };
    }
  });
  </script>