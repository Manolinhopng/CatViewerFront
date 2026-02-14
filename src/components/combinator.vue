<template>
  <div class="combinator">
    <h2 class="text-2xl font-bold text-center mb-6">Selecciona 2 colores para tu gato</h2>
    
    <div class="color-palette mb-6">
      <h3 class="text-lg font-semibold mb-4 text-center">Paleta de colores disponibles:</h3>
      <div class="color-grid flex justify-center gap-4 mb-6">
        <button 
          v-for="color in availableColors" 
          :key="color.id"
          @click="toggleColorSelection(color)"
          :class="[
            'color-button',
            'w-16 h-16 rounded-full border-4 transition-all duration-300 hover:scale-110',
            isColorSelected(color) ? 'border-blue-500 shadow-lg scale-110' : 'border-gray-300',
            selectedColors.length >= 2 && !isColorSelected(color) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          ]"
          :style="{ backgroundColor: color.hex }"
          :disabled="selectedColors.length >= 2 && !isColorSelected(color)"
          :title="color.name"
        >
          <span class="sr-only">{{ color.name }}</span>
        </button>
      </div>
    </div>
    
    <div v-if="selectedColors.length > 0" class="selected-colors mb-6">
      <h3 class="text-lg font-semibold mb-4 text-center">
        Colores seleccionados ({{ selectedColors.length }}/2):
      </h3>
      <div class="flex justify-center gap-4 mb-4">
        <div 
          v-for="color in selectedColors" 
          :key="color.id"
          class="selected-color flex items-center gap-2 bg-white p-3 rounded-lg shadow-md"
        >
          <div 
            class="w-8 h-8 rounded-full border-2 border-gray-300"
            :style="{ backgroundColor: color.hex }"
          ></div>
          <span class="font-medium">{{ color.name }}</span>
          <button 
            @click="removeColor(color)"
            class="text-red-500 hover:text-red-700 text-lg font-bold"
            title="Quitar color"
          >
            ×
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="currentBreed" class="breed-info">
      <h3 class="text-xl font-bold text-center mb-4">¡Parece un gato {{ currentBreed.name }}!</h3>
      <img 
        :src="currentBreed.image" 
        :alt="'Imagen de gato ' + currentBreed.name" 
        class="breed-image mx-auto mb-4"
      >
      <p class="text-gray-700 mb-4">{{ currentBreed.description }}</p>
      <div class="like-section text-center">
        <button 
          @click="handleLike"
          :class="{ 'liked': userLiked }"
          class="like-button"
        >
          <span class="paw-icon">🐾</span>
          {{ breedLikes }} likes
        </button>
        <span v-if="userLiked" class="like-feedback">¡Gracias por tu voto!</span>
      </div>
    </div>
    
    <Comments
      v-if="currentBreed"
      :breed-id="currentBreed.id.toString()"
      :primary-color="selectedColors[0]?.id || ''"
      :secondary-color="selectedColors[1]?.id || ''"
    />
    
    <div v-if="showLoginToast" class="login-toast">
      <span>Por favor inicia sesión para votar</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { findBreedByColors } from '@/services/catService';
import { useAuth } from '@/services/authService';
import Comments from '@/components/comments.vue';
import type { Breed } from '@/models/breed';
import { getBreedLikes } from '@/services/breedService';
import { toggleBreedLike } from '@/services/likeService';

interface Color {
  id: string;
  name: string;
  hex: string;
}

export default defineComponent({
  name: 'Combinator',
  components: { Comments },
  emits: ['combination-change'],
  setup(props, { emit }) {
    const { user, isAuthenticated } = useAuth();
    const selectedColors = ref<Color[]>([]);
    const currentBreed = ref<Breed | null>(null);
    const userLiked = ref(false);
    const showLoginToast = ref(false);
    const breedLikes = ref(0);

    const availableColors: Color[] = [
      { id: 'white', name: 'Blanco', hex: '#ffffff' },
      { id: 'black', name: 'Negro', hex: '#000000' },
      { id: 'orange', name: 'Naranja', hex: '#ff6600' },
      { id: 'brown', name: 'Marrón', hex: '#8b4513' },
      { id: 'gray', name: 'Gris', hex: '#808080' },
      { id: 'cream', name: 'Crema', hex: '#f5deb3' },
    ];

    // Verificar si el usuario ya dio like
    const checkUserLike = async () => {
      if (!user.value || !currentBreed.value) return;
      userLiked.value = false; // Esto vendría de una consulta real
    };

    const isColorSelected = (color: Color) => {
      return selectedColors.value.some(selected => selected.id === color.id);
    };

    const toggleColorSelection = (color: Color) => {
      if (isColorSelected(color)) {
        removeColor(color);
      } else if (selectedColors.value.length < 2) {
        selectedColors.value.push(color);
        updateCombination();
      }
    };

    const removeColor = (color: Color) => {
      const index = selectedColors.value.findIndex(c => c.id === color.id);
      if (index > -1) {
        selectedColors.value.splice(index, 1);
        updateCombination();
      }
    };

    const previewStyle = computed(() => {
      if (selectedColors.value.length !== 2) return {};
      
      const [color1, color2] = selectedColors.value;
      return {
        background: `linear-gradient(135deg, ${color1.hex} 50%, ${color2.hex} 50%)`,
        border: '2px solid #333',
        width: '200px',
        height: '200px',
        margin: '0 auto',
        borderRadius: '10px',
        transition: 'all 0.3s ease'
      };
    });

    const updateCombination = () => {
      if (selectedColors.value.length !== 2) {
        currentBreed.value = null;
        return;
      }

      const [color1, color2] = selectedColors.value;
      const breed = findBreedByColors(color1.id, color2.id);
      currentBreed.value = breed;
      userLiked.value = false;
      
      if (breed) {
        checkUserLike();
        emit('combination-change', {
          primary: color1.id,
          secondary: color2.id,
          breed: breed.id
        });
      }
    };

    const handleLike = async () => {
      if (!isAuthenticated()) {
        showLoginToast.value = true;
        setTimeout(() => { showLoginToast.value = false; }, 2500);
        return;
      }

      if (!currentBreed.value) return;

      try {
        if (!user.value) return;
        const result = await toggleBreedLike(user.value.id, currentBreed.value.id);
        breedLikes.value = result.newCount;
        userLiked.value = result.liked;
        updateCombination();
      } catch (error) {
        console.error('Error al votar:', error);
      }
    };

    onMounted(async () => {
      if (currentBreed.value) {
        const result = await getBreedLikes(currentBreed.value.id);
        breedLikes.value = result.count;
      }
    });

    return { 
      availableColors,
      selectedColors,
      previewStyle, 
      currentBreed, 
      userLiked,
      isColorSelected,
      toggleColorSelection,
      removeColor,
      handleLike,
      isAuthenticated,
      showLoginToast,
      breedLikes
    };
  }
});
</script>

<style scoped>
.combinator {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.color-palette {
  text-align: center;
}

.color-grid {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  max-width: 100%;
  margin: 0 auto;
}

.color-button {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 4px solid #d1d5db;
  transition: all 0.3s ease;
  cursor: pointer;
}

.color-button:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.color-button.selected {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.selected-colors {
  text-align: center;
}

.selected-color {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.preview-container {
  text-align: center;
}

.preview {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  border: 2px solid #333;
  transition: all 0.3s ease;
  margin: 0 auto;
}

.breed-info {
  text-align: center;
  padding: 15px;
  background: white;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.breed-image {
  max-width: 100%;
  height: auto;
  max-height: 200px;
  border-radius: 8px;
  margin-top: 15px;
  object-fit: cover;
}

.like-section {
  margin: 15px 0;
}

.like-button {
  background: #f0f0f0;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
}

.like-button:hover {
  background: #e0e0e0;
}

.like-button.liked {
  background: #ffebee;
  color: #d32f2f;
}

.paw-icon {
  font-size: 1.2em;
}

.like-feedback {
  margin-left: 10px;
  color: #4caf50;
  font-size: 0.9em;
}

.login-toast {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff3cd;
  color: #ff0000;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 16px 32px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  font-weight: bold;
  z-index: 1000;
  animation: fadeInOut 2.5s;
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
}
</style>