<template>
  <div class="combinator">
    <h2 class="text-2xl font-bold text-center mb-6">Selecciona los colores del gato</h2>

    <!-- Doble paleta -->
    <div class="palettes-row">
      <!-- Paleta color primario -->
      <div class="palette-block">
        <h3 class="palette-title">Color primario</h3>
        <div class="color-grid">
          <button
            v-for="color in availableColors"
            :key="'primary-' + color.id"
            @click="selectPrimary(color)"
            :class="[
              'color-button',
              primaryColor?.id === color.id ? 'selected' : ''
            ]"
            :style="{ backgroundColor: color.hex }"
            :title="color.name"
          >
            <span class="sr-only">{{ color.name }}</span>
          </button>
        </div>
        <div v-if="primaryColor" class="selected-chip">
          <span class="chip-dot" :style="{ backgroundColor: primaryColor.hex }"></span>
          <span>{{ primaryColor.name }}</span>
          <button @click="clearPrimary" class="chip-remove" title="Quitar">×</button>
        </div>
      </div>

      <div class="palette-divider">+</div>

      <!-- Paleta color secundario -->
      <div class="palette-block">
        <h3 class="palette-title">Color secundario</h3>
        <div class="color-grid">
          <button
            v-for="color in availableColors"
            :key="'secondary-' + color.id"
            @click="selectSecondary(color)"
            :class="[
              'color-button',
              secondaryColor?.id === color.id ? 'selected' : ''
            ]"
            :style="{ backgroundColor: color.hex }"
            :title="color.name"
          >
            <span class="sr-only">{{ color.name }}</span>
          </button>
        </div>
        <div v-if="secondaryColor" class="selected-chip">
          <span class="chip-dot" :style="{ backgroundColor: secondaryColor.hex }"></span>
          <span>{{ secondaryColor.name }}</span>
          <button @click="clearSecondary" class="chip-remove" title="Quitar">×</button>
        </div>
      </div>
    </div>

    <!-- Paleta de tercer color (calico) -->
    <transition name="fade">
      <div v-if="showThirdPalette" class="palette-block third-palette">
        <h3 class="palette-title calico-title">🎨 ¿Quisieras añadirle otro color?</h3>
        <div class="color-grid">
          <button
            v-for="color in calicoThirdColors"
            :key="'third-' + color.id"
            @click="selectTertiary(color)"
            :class="[
              'color-button',
              tertiaryColor?.id === color.id ? 'selected' : ''
            ]"
            :style="{ backgroundColor: color.hex }"
            :title="color.name"
          >
            <span class="sr-only">{{ color.name }}</span>
          </button>
        </div>
        <div v-if="tertiaryColor" class="selected-chip">
          <span class="chip-dot" :style="{ backgroundColor: tertiaryColor.hex }"></span>
          <span>{{ tertiaryColor.name }}</span>
          <button @click="clearTertiary" class="chip-remove" title="Quitar">×</button>
        </div>
      </div>
    </transition>

    <!-- Botón "Mostrar combinación": aparece solo cuando no hay ningún color elegido y no hay gato -->
    <transition name="fade">
      <div v-if="!anyColorSelected && !currentBreed" class="show-combo-section">
        <p class="combo-hint">Selecciona los colores para descubrir qué raza se forma</p>
        <img
          v-if="showSphynx"
          :src="`${apiUrl}/img/GatoCalvo.jpg`"
          alt="Gato Esfinge"
          class="placeholder-cat mx-auto mb-6"
        >
        <button v-if="!showSphynx" class="show-combo-btn" @click="scrollToTopPalette">
          🎨 Elegir colores
        </button>
      </div>
    </transition>

    <!-- Resultado: raza encontrada -->
    <transition name="fade">
      <div v-if="currentBreed" class="breed-info">
        <h3 class="text-xl font-bold text-center mb-4">¡Parece un gato {{ currentBreed.name }}!</h3>
        <img
          :src="currentBreed.image"
          :alt="'Imagen de gato ' + currentBreed.name"
          class="breed-image mx-auto mb-4"
        >
        <p class="text-gray-700 mb-4 text-center">{{ currentBreed.description }}</p>
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
    </transition>

    <!-- Sin resultado cuando se eligieron colores -->
    <transition name="fade">
      <div v-if="anyColorSelected && !currentBreed && !showThirdPalette" class="no-result">
        <p>😿 No encontramos una raza con esa combinación.</p>
        
        <div v-if="!requestSent" class="request-container">
          <p class="request-text">¿Conoces un gato así? ¡Ayúdanos a agregarlo!</p>
          
          <div class="upload-request-box">
            <label class="file-label">
              <input 
                type="file" 
                @change="handleRequestFileChange" 
                accept="image/*" 
                class="hidden-input"
              >
              <span class="upload-icon">📸</span>
              {{ requestFile ? requestFile.name : 'Subir foto del gato' }}
            </label>
          </div>

          <button 
            @click="requestNewCat" 
            :disabled="isUploading"
            class="request-cat-btn"
          >
            {{ isUploading ? 'Subiendo...' : 'Solicitar agregar este gato' }}
          </button>
        </div>
        
        <p v-else class="request-feedback">✅ ¡Solicitud enviada! Pronto lo agregaremos.</p>
      </div>
    </transition>

    <Comments
      v-if="currentBreed"
      :breed-id="currentBreed.id.toString()"
      :primary-color="primaryColor?.id || ''"
      :secondary-color="secondaryColor?.id || ''"
    />

    <div v-if="showLoginToast" class="login-toast">
      <span>Por favor inicia sesión para votar</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { findBreedByColors } from '@/services/catService';
import { useAuth } from '@/services/authService';
import Comments from '@/components/comments.vue';
import type { Breed } from '@/models/breed';
import { getBreedLikes } from '@/services/breedService';
import { toggleBreedLike } from '@/services/likeService';
import { commentService } from '@/services/commentService';
import { API_URL } from '@/lib/api';

interface Color {
  id: string;
  name: string;
  hex: string;
}

// Colors that together can form a calico (need a 3rd)
const CALICO_PAIR_COLORS = new Set(['white', 'black', 'orange']);

function isCalicoPartialPair(a: string, b: string): boolean {
  return CALICO_PAIR_COLORS.has(a) && CALICO_PAIR_COLORS.has(b) && a !== b;
}

export default defineComponent({
  name: 'Combinator',
  components: { Comments },
  emits: ['combination-change'],
  setup(props, { emit }) {
    const { user, isAuthenticated } = useAuth();
    const apiUrl = API_URL;

    const primaryColor = ref<Color | null>(null);
    const secondaryColor = ref<Color | null>(null);
    const tertiaryColor = ref<Color | null>(null);
    const currentBreed = ref<Breed | null>(null);
    const userLiked = ref(false);
    const showLoginToast = ref(false);
    const breedLikes = ref(0);
    const requestSent = ref(false);
    const showSphynx = ref(false);
    const requestFile = ref<File | null>(null);
    const isUploading = ref(false);

    const availableColors: Color[] = [
      { id: 'white',  name: 'Blanco',  hex: '#f8f8f8' },
      { id: 'black',  name: 'Negro',   hex: '#222222' },
      { id: 'orange', name: 'Naranja', hex: '#ff6600' },
      { id: 'brown',  name: 'Marrón',  hex: '#8b4513' },
      { id: 'gray',   name: 'Gris',    hex: '#808080' },
      { id: 'cream',  name: 'Crema',   hex: '#f5deb3' },
    ];

    // The third calico color is whichever of the three calico colors is NOT already chosen
    const calicoThirdColors = computed<Color[]>(() => {
      if (!primaryColor.value || !secondaryColor.value) return [];
      const chosen = new Set([primaryColor.value.id, secondaryColor.value.id]);
      return availableColors.filter(c => CALICO_PAIR_COLORS.has(c.id) && !chosen.has(c.id));
    });

    const showThirdPalette = computed(() => {
      if (!primaryColor.value || !secondaryColor.value) return false;
      return isCalicoPartialPair(primaryColor.value.id, secondaryColor.value.id);
    });

    const anyColorSelected = computed(() =>
      primaryColor.value !== null || secondaryColor.value !== null
    );

    const selectPrimary = (color: Color) => {
      primaryColor.value = color;
      tertiaryColor.value = null; // Reset third when primary changes
      updateCombination();
    };

    const selectSecondary = (color: Color) => {
      secondaryColor.value = color;
      tertiaryColor.value = null; // Reset third when secondary changes
      updateCombination();
    };

    const selectTertiary = (color: Color) => {
      tertiaryColor.value = color;
      updateCombination();
    };

    const clearPrimary = () => {
      primaryColor.value = null;
      tertiaryColor.value = null;
      updateCombination();
    };

    const clearSecondary = () => {
      secondaryColor.value = null;
      tertiaryColor.value = null;
      updateCombination();
    };

    const clearTertiary = () => {
      tertiaryColor.value = null;
      updateCombination();
    };

    const updateCombination = () => {
      if (!primaryColor.value || !secondaryColor.value) {
        currentBreed.value = null;
        return;
      }

      const breed = findBreedByColors(
        primaryColor.value.id,
        secondaryColor.value.id,
        tertiaryColor.value?.id
      );
      currentBreed.value = breed;
      userLiked.value = false;

      if (breed) {
        emit('combination-change', {
          primary: primaryColor.value.id,
          secondary: secondaryColor.value.id,
          ...(tertiaryColor.value ? { tertiary: tertiaryColor.value.id } : {}),
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
        const result = await toggleBreedLike(currentBreed.value.id);
        breedLikes.value = result.newCount;
        userLiked.value = result.liked;
      } catch (error) {
        console.error('Error al votar:', error);
      }
    };

    const scrollToTopPalette = () => {
      showSphynx.value = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const requestNewCat = async () => {
      isUploading.value = true;
      try {
        let imageUrl = '';
        if (requestFile.value) {
          imageUrl = await commentService.uploadCommentImage(requestFile.value);
        }

        // Aquí se podría guardar en una base de datos de solicitudes
        console.log('Solicitud de nuevo gato:', {
          primary: primaryColor.value?.id,
          secondary: secondaryColor.value?.id,
          tertiary: tertiaryColor.value?.id,
          imageUrl: imageUrl
        });

        requestSent.value = true;
        requestFile.value = null;
        setTimeout(() => {
          requestSent.value = false;
        }, 3000);
      } catch (error) {
        console.error('Error al enviar solicitud:', error);
        alert('Hubo un error al subir la imagen. Por favor intenta de nuevo.');
      } finally {
        isUploading.value = false;
      }
    };

    const handleRequestFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        requestFile.value = input.files[0];
      }
    };

    watch(currentBreed, async (newBreed) => {
      if (newBreed) {
        const result = await getBreedLikes(newBreed.id);
        breedLikes.value = result.count;
      } else {
        breedLikes.value = 0;
      }
    });

    onMounted(async () => {
      if (currentBreed.value) {
        const result = await getBreedLikes(currentBreed.value.id);
        breedLikes.value = result.count;
      }
    });

    return {
      availableColors,
      calicoThirdColors,
      primaryColor,
      secondaryColor,
      tertiaryColor,
      currentBreed,
      userLiked,
      showLoginToast,
      breedLikes,
      showThirdPalette,
      anyColorSelected,
      selectPrimary,
      selectSecondary,
      selectTertiary,
      clearPrimary,
      clearSecondary,
      clearTertiary,
      handleLike,
      isAuthenticated,
      scrollToTopPalette,
      requestNewCat,
      requestSent,
      showSphynx,
      requestFile,
      isUploading,
      handleRequestFileChange,
      apiUrl,
    };
  }
});
</script>

<style scoped>
.combinator {
  max-width: 860px;
  margin: 0 auto;
  padding: 24px 20px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* ---- Double palette layout ---- */
.palettes-row {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.palette-divider {
  font-size: 2.5rem;
  font-weight: bold;
  color: #9ca3af;
  align-self: center;
  margin-top: -12px;
}

.palette-block {
  flex: 1;
  min-width: 220px;
  max-width: 360px;
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
  text-align: center;
}

.palette-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #374151;
}

.calico-title {
  color: #b45309;
}

.color-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 12px;
}

.color-button {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 3px solid #d1d5db;
  cursor: pointer;
  transition: all 0.25s ease;
  outline: none;
}

.color-button:hover {
  transform: scale(1.12);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.color-button.selected {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
  transform: scale(1.1);
}

/* ---- Selected chip ---- */
.selected-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f3f4f6;
  border-radius: 999px;
  padding: 4px 10px 4px 6px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 4px;
}

.chip-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #d1d5db;
  flex-shrink: 0;
}

.chip-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: #ef4444;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1;
  padding: 0;
}

/* ---- Third calico palette ---- */
.third-palette {
  max-width: 100%;
  margin: 0 auto 20px;
  background: #fffbeb;
  border: 1px solid #fde68a;
}

/* ---- Show combo section ---- */
.show-combo-section {
  text-align: center;
  padding: 28px 16px;
}

.combo-hint {
  color: #6b7280;
  margin-bottom: 14px;
  font-size: 1rem;
}

.show-combo-btn {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  border: none;
  padding: 12px 28px;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
}

.show-combo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(99, 102, 241, 0.45);
}

.placeholder-cat {
  max-width: 180px;
  height: auto;
  border-radius: 12px;
  opacity: 0.8;
  filter: grayscale(0.2);
  transition: all 0.3s;
}

.placeholder-cat:hover {
  opacity: 1;
  filter: grayscale(0);
  transform: scale(1.05);
}

/* ---- Breed info ---- */
.breed-info {
  text-align: center;
  padding: 18px;
  background: white;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.07);
}

.breed-image {
  max-width: 100%;
  height: auto;
  max-height: 220px;
  border-radius: 10px;
  margin-top: 12px;
  object-fit: cover;
  margin-bottom: 12px;
}

.like-section {
  margin: 14px 0;
}

.like-button {
  background: #f0f0f0;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  font-size: 0.95rem;
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

/* ---- No result ---- */
.no-result {
  text-align: center;
  padding: 24px;
  color: #6b7280;
  font-size: 1rem;
  background: #fff;
  border-radius: 12px;
  border: 1px dashed #d1d5db;
  margin-top: 20px;
}

.request-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.request-text {
  font-size: 0.9rem;
  color: #4b5563;
}

.upload-request-box {
  width: 100%;
  max-width: 300px;
}

.file-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #f3f4f6;
  border: 2px dashed #d1d5db;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.file-label:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.hidden-input {
  display: none;
}

.upload-icon {
  font-size: 1.2rem;
}

.request-cat-btn {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.request-cat-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.request-cat-btn:not(:disabled):hover {
  background: #4338ca;
}

.request-feedback {
  margin-top: 12px;
  color: #059669;
  font-weight: 600;
}

/* ---- Toast ---- */
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

/* ---- Transition ---- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>