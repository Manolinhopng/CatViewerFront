import { cats } from '@/lib/dataCats';
/**
 * Encuentra una raza por su combinación de colores.
 * Funciona con 2 o 3 colores, sin importar el orden.
 */
export function findBreedByColors(primary, secondary, tertiary) {
    const cat = cats.find(c => {
        const catColors = [c.colorPrimario, c.colorSecundario, c.colorTerciario].filter(Boolean);
        const inputColors = [primary, secondary, tertiary].filter(Boolean);
        if (catColors.length !== inputColors.length)
            return false;
        const catColorsCopy = [...catColors];
        return inputColors.every(ic => {
            const idx = catColorsCopy.indexOf(ic);
            if (idx === -1)
                return false;
            catColorsCopy.splice(idx, 1);
            return true;
        });
    });
    if (!cat)
        return null;
    return {
        id: cat.id.toString(),
        name: cat.breed,
        description: cat.description,
        image: cat.imageUrl,
        primaryColors: [cat.colorPrimario],
        secondaryColors: [cat.colorSecundario],
        likes: 0,
    };
}
/**
 * Obtiene las N primeras razas del catálogo.
 * Para el ranking real por likes, usar el endpoint /api/breedLikes/top.
 */
export function getTopBreeds(limit = 5) {
    return cats.slice(0, limit).map(c => ({
        id: c.id.toString(),
        name: c.breed,
        description: c.description,
        primaryColors: [c.colorPrimario],
        secondaryColors: [c.colorSecundario],
        image: c.imageUrl,
    }));
}
