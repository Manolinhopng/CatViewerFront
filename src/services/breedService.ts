import { cats } from '@/lib/dataCats';
import { ref } from 'vue';

const breeds = ref(cats);

export function useBreedData() {
  /**
   * Obtener raza por ID
   */
  const getBreedById = (id: number) => {
    return breeds.value.find(cat => cat.id === id) || null;
  };

  /**
   * Obtener razas que coinciden con colores
   */
  const getBreedsByColors = (primary: string, secondary: string) => {
    return breeds.value.filter(cat =>
      (cat.colorPrimario === primary && cat.colorSecundario === secondary) ||
      (cat.colorPrimario === secondary && cat.colorSecundario === primary)
    );
  };

  /**
   * Obtener razas más populares (placeholder: primeros 5)
   */
  const getTopBreeds = (limit: number = 5) => {
    return breeds.value.slice(0, limit);
  };

  /**
   * Buscar raza por combinación de colores (exacta, sin importar el orden)
   */
  const findBreedByColors = (primary: string, secondary: string) => {
    return breeds.value.find(cat =>
      (cat.colorPrimario === primary && cat.colorSecundario === secondary) ||
      (cat.colorPrimario === secondary && cat.colorSecundario === primary)
    ) || null;
  };

  return {
    breeds,
    getBreedById,
    getBreedsByColors,
    getTopBreeds,
    findBreedByColors
  };
}

export async function getBreedLikes(breedId: string) {
  const response = await fetch(`http://localhost:3001/api/breedLikes/${breedId}`);
  return await response.json();
}

export async function getTopBreedsAllTime(limit = 3) {
  const response = await fetch(`http://localhost:3001/api/breedLikes/top?period=all&limit=${limit}`)
  return await response.json()
}

export async function getTopBreedsMonth(limit = 3) {
  const response = await fetch(`http://localhost:3001/api/breedLikes/top?period=month&limit=${limit}`)
  return await response.json()
}

export async function getTopBreedsWeek(limit = 3) {
  const response = await fetch(`http://localhost:3001/api/breedLikes/top?period=week&limit=${limit}`)
  return await response.json()
}