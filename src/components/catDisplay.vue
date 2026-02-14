<template>
    <div class="cat-display">
      <div class="cat-visualization">
        <img 
          :src="catImageUrl" 
          :alt="`Gato ${breedData?.breed ?? ''} ${colorDescription}`"
          class="cat-image"
        />
        
        <div 
          class="pattern-overlay"
          :style="patternStyle"
        ></div>
      </div>
      
      <div class="breed-data">
        <h2>{{ breedData?.breed }}</h2>
        <p>{{ breedData?.description }}</p>
        
        <div class="color-info">
          <div 
            v-for="(color, i) in colorPalette" 
            :key="i"
            class="color-swatch"
            :style="{ backgroundColor: color }"
          ></div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed, PropType } from 'vue';
  import { useBreedData } from '@/services/breedService';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    props: {
      primaryColor: {
        type: String,
        required: true
      },
      secondaryColor: {
        type: String,
        required: true
      },
      breedId: {
        type: String,
        required: true
      }
    },
    setup(props) {
        const { getBreedById } = useBreedData();
  const breedData = computed(() => getBreedById(Number(props.breedId)));
  const catImageUrl = computed(() => breedData.value?.imageUrl || '');
  
  const router = useRouter();
  
  const patternStyle = computed(() => {
    return {
      background: `linear-gradient(45deg, ${props.primaryColor} 30%, ${props.secondaryColor} 70%)`,
      mixBlendMode: 'multiply'
    };
  });
  
  const colorDescription = computed(() => {
    return `${props.primaryColor} y ${props.secondaryColor}`;
  });
  
  const colorPalette = computed(() => {
    return generateColorPalette(props.primaryColor, props.secondaryColor);
  });
  
  function onSelectionChange(newBreedId: string, newPrimaryColor: string, newSecondaryColor: string) {
    router.push({
      name: 'ExploreBreedColor',
      params: {
        breedId: newBreedId,
        primaryColor: newPrimaryColor,
        secondaryColor: newSecondaryColor
      }
    });
  }
  
  function generateColorPalette(primary: string, secondary: string): string[] {
    // Lógica simple de ejemplo, reemplaza por la real si la tienes
    return [primary, secondary];
  }
  
  return { breedData, catImageUrl, patternStyle, colorDescription, colorPalette, onSelectionChange };
    }
  });
  </script>