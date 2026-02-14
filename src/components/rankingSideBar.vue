<template>
  <div class="bg-white rounded-xl shadow-md p-6 min-w-[260px] max-w-xs">
    <h3 class="text-lg font-bold text-yellow-700 mb-4">Ranking de Razas</h3>
    <ul class="flex flex-col gap-2 mb-4">
      <li v-for="p in periods" :key="p.value">
        <button
          :class="[
            'w-full px-3 py-1 rounded-lg font-medium transition block text-center',
            selectedPeriod === p.value
              ? 'bg-yellow-500 text-black hover:bg-yellow-600'
              : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-200'
          ]"
          @click="goToPeriod(p.value)"
        >{{ p.label }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

const periods = [
  { value: 'all', label: 'All Time' },
  { value: 'month', label: 'Mensual' },
  { value: 'week', label: 'Semanal' }
]

const route = useRoute()
const router = useRouter()

const selectedPeriod = computed(() => route.query.period || 'all')

function goToPeriod(period: string) {
  router.push({ path: '/ranking', query: { period } })
}
</script>
