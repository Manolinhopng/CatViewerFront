<template>
  <div class="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto py-8">
    <div class="w-full md:w-72 flex-shrink-0">
      <ranking-side-bar />
    </div>
    <div class="flex-1 bg-white rounded-xl shadow-md p-8">
      <h2 class="text-2xl font-bold text-yellow-700 mb-6 text-center">Ranking de Razas - {{ periodLabel }}</h2>
      <div>
        <div v-for="(breed, i) in topBreeds" :key="breed.id" class="flex items-center gap-4 py-3 border-b last:border-b-0 border-yellow-100">
          <span class="font-bold text-yellow-700 w-8 text-center text-xl">{{ i + 1 }}.</span>
          <span class="flex-1 font-medium text-gray-800 text-lg">{{ breed.name }}</span>
          <span class="text-yellow-600 font-bold text-lg">❤️ {{ breed.likes }}</span>
        </div>
        <div v-if="topBreeds.length === 0" class="text-gray-400 italic text-center mt-8">
          No hay datos para este periodo.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getTopBreedsAllTime, getTopBreedsMonth, getTopBreedsWeek } from '@/services/breedService'
import RankingSideBar from '@/components/rankingSideBar.vue'

const route = useRoute()

const period = computed(() => (route.query.period as string) || 'all')
const topBreeds = ref<any[]>([])

const periodLabel = computed(() => {
  if (period.value === 'all') return 'All Time'
  if (period.value === 'month') return 'Mensual'
  if (period.value === 'week') return 'Semanal'
  return period.value
})

const fetchRanking = async () => {
  if (period.value === 'all') {
    topBreeds.value = await getTopBreedsAllTime(10)
  } else if (period.value === 'month') {
    topBreeds.value = await getTopBreedsMonth(10)
  } else if (period.value === 'week') {
    topBreeds.value = await getTopBreedsWeek(10)
  } else {
    topBreeds.value = []
  }
}

onMounted(fetchRanking)
watch(period, fetchRanking)
</script> 