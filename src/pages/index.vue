<template>
  <div class="home flex flex-col md:flex-row gap-8">
    <div class="w-full md:w-auto md:min-w-[260px] flex-shrink-0">
      <ranking-side-bar
        :vertical="true"
        :showLinks="false"
        :selectedPeriod="selectedPeriod"
        @select-period="handleSelectPeriod"
      />
    </div>
    <div class="flex-1">
      <div v-if="isAuthenticated()" class="bienvenida">
        <div class="bienvenida-contenido">
          <span class="bienvenida-emoji">😺</span>
          <span class="bienvenida-mensaje">Bienvenido, {{ getUserName() }}</span>
        </div>
      </div>
      <combinator 
        @combination-change="handleCombinationChange"
        class="combinator-section"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Combinator from '@/components/combinator.vue';
import RankingSideBar from '@/components/rankingSideBar.vue';
import { useAuth } from '@/services/authService'

export default defineComponent({
  components: { Combinator, RankingSideBar },
  setup() {
    const currentCombination = ref({
      primary: '',
      secondary: '',
      breed: ''
    });

    const { user, isAuthenticated } = useAuth()

    const selectedPeriod = ref<'all' | 'month' | 'week'>('all')

    const handleCombinationChange = (combination: any) => {
      currentCombination.value = combination;
    };

    function getUserName() {
      return user.value?.user_metadata?.name || user.value?.email || ''
    }

    function handleSelectPeriod(period: 'all' | 'month' | 'week') {
      selectedPeriod.value = period
    }

    return { currentCombination, handleCombinationChange, isAuthenticated, getUserName, selectedPeriod, handleSelectPeriod };
  }
});
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.bienvenida {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
}

.bienvenida-contenido {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(90deg, #fef6e4 0%, #f9dcc4 100%);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 24px 40px;
  border: 2px solid #fde68a;
}

.bienvenida-emoji {
  font-size: 3.5rem;
  margin-bottom: 8px;
}

.bienvenida-mensaje {
  font-size: 1.35rem;
  font-weight: 600;
  color: #b45309;
  letter-spacing: 0.5px;
}

.combinator-section {
  margin-bottom: 40px;
}
</style>