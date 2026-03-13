import { cats } from '@/lib/dataCats';
import { ref } from 'vue';
import { API_URL } from '@/lib/api';
const breeds = ref(cats);
export function useBreedData() {
    /**
     * Obtener raza por ID
     */
    const getBreedById = (id) => {
        return breeds.value.find(cat => cat.id === id) || null;
    };
    /**
     * Obtener razas que coinciden con colores
     */
    const getBreedsByColors = (primary, secondary) => {
        return breeds.value.filter(cat => (cat.colorPrimario === primary && cat.colorSecundario === secondary) ||
            (cat.colorPrimario === secondary && cat.colorSecundario === primary));
    };
    /**
     * Buscar raza por combinación de colores (exacta, sin importar el orden)
     */
    const findBreedByColors = (primary, secondary) => {
        return breeds.value.find(cat => (cat.colorPrimario === primary && cat.colorSecundario === secondary) ||
            (cat.colorPrimario === secondary && cat.colorSecundario === primary)) || null;
    };
    return {
        breeds,
        getBreedById,
        getBreedsByColors,
        findBreedByColors,
    };
}
export async function getBreedLikes(breedId) {
    const response = await fetch(`${API_URL}/api/breedLikes/${breedId}`);
    return response.json();
}
export async function getTopBreedsAllTime(limit = 3) {
    const response = await fetch(`${API_URL}/api/breedLikes/top?period=all&limit=${limit}`);
    return response.json();
}
export async function getTopBreedsMonth(limit = 3) {
    const response = await fetch(`${API_URL}/api/breedLikes/top?period=month&limit=${limit}`);
    return response.json();
}
export async function getTopBreedsWeek(limit = 3) {
    const response = await fetch(`${API_URL}/api/breedLikes/top?period=week&limit=${limit}`);
    return response.json();
}
