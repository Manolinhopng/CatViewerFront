<template>
  <div class="community-container">
    <div class="header-section">
      <h1 class="text-3xl font-bold text-indigo-700 mb-2">Comunidad Gatuna</h1>
      <p class="text-gray-600 mb-6">Comparte tu gato y mira cuáles son las razas favoritas de todos.</p>
      <div class="upload-wrapper">
        <upload @upload-success="fetchImages" />
      </div>
    </div>

    <div class="content-grid">
      <!-- Ranking Section -->
      <section class="ranking-section">
        <h2 class="section-title">🏆 Top Razas (All Time)</h2>
        <div v-if="loadingRanking" class="loading">Cargando ranking...</div>
        <div v-else class="ranking-list">
          <div v-for="(breed, i) in topBreeds" :key="breed.id" class="ranking-item">
            <span class="rank-number">{{ i + 1 }}</span>
            <span class="breed-name">{{ breed.name }}</span>
            <span class="likes-count">❤️ {{ breed.likes }}</span>
          </div>
          <p v-if="topBreeds.length === 0" class="empty-msg">No hay votos aún.</p>
        </div>
        <router-link to="/ranking" class="view-more-link">Ver ranking completo →</router-link>
      </section>

      <!-- Gallery Section -->
      <section class="gallery-section">
        <h2 class="section-title">📸 Galería de la Comunidad</h2>
        <div v-if="loadingImages" class="loading">Cargando galería...</div>
        <div v-else class="images-grid">
          <div v-for="img in communityImages" :key="img.id" class="image-card">
            <img :src="img.public_url" :alt="'Gato subido por usuario'" class="cat-image" />
            <div class="image-overlay">
              <span>🐱</span>
            </div>
          </div>
          <p v-if="communityImages.length === 0" class="empty-msg">Nadie ha subido gatos aún. ¡Sé el primero!</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Upload from '@/components/upload.vue';
import { getTopBreedsAllTime } from '@/services/breedService';

export default defineComponent({
  components: { Upload },
  setup() {
    const topBreeds = ref<any[]>([]);
    const communityImages = ref<any[]>([]);
    const loadingRanking = ref(true);
    const loadingImages = ref(true);

    const fetchRanking = async () => {
      try {
        loadingRanking.value = true;
        topBreeds.value = await getTopBreedsAllTime(5);
      } catch (error) {
        console.error('Error fetching ranking:', error);
      } finally {
        loadingRanking.value = false;
      }
    };

    const fetchImages = async () => {
      try {
        loadingImages.value = true;
        const response = await fetch('http://localhost:3001/api/images/all');
        const data = await response.json();
        communityImages.value = data.images || [];
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        loadingImages.value = false;
      }
    };

    onMounted(() => {
      fetchRanking();
      fetchImages();
    });

    return { 
      topBreeds, 
      communityImages, 
      loadingRanking, 
      loadingImages,
      fetchImages 
    };
  }
});
</script>

<style scoped>
.community-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.header-section {
  text-align: center;
  margin-bottom: 50px;
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.content-grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 30px;
}

@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

.section-title {
  font-size: 1.5rem;
  font-bold: 600;
  margin-bottom: 20px;
  color: #374151;
}

.ranking-section {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

.ranking-item:last-child {
  border-bottom: none;
}

.rank-number {
  font-weight: 800;
  color: #6366f1;
  width: 24px;
}

.breed-name {
  flex: 1;
  font-weight: 500;
  color: #1f2937;
}

.likes-count {
  font-weight: 600;
  color: #ef4444;
}

.view-more-link {
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;
}

.view-more-link:hover {
  text-decoration: underline;
}

.gallery-section {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.image-card {
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background: #f3f4f6;
}

.cat-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.image-card:hover .cat-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.8);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.9rem;
}

.loading {
  text-align: center;
  color: #6b7280;
  padding: 20px;
}

.empty-msg {
  text-align: center;
  color: #9ca3af;
  padding: 40px 20px;
  font-style: italic;
}
</style>