import { supabase } from '@/lib/supabase';
import { cats } from '@/lib/dataCats';

interface Breed {
    id: string;
    name: string;
    description: string;
    primaryColors: string[];
    secondaryColors: string[];
    image: string;
  }
  
  
  export function findBreedByColors(primary: string, secondary: string) {
    // Busca el gato que tenga ambos colores (sin importar el orden)
    const cat = cats.find(
      c =>
        (c.colorPrimario === primary && c.colorSecundario === secondary) ||
        (c.colorPrimario === secondary && c.colorSecundario === primary)
    );
    if (!cat) return null;
    return {
      id: cat.id,
      name: cat.breed,
      description: cat.description,
      image: cat.imageUrl,
      likes: 0 
    };
  }
  
  export function getTopBreeds(limit: number = 5): Breed[] {
    // Lógica para obtener razas más populares (usando likes)
    return breeds.slice(0, limit);
  }
  
export const likeBreed = async (breedId: string, userId: string) => {
  // Verificar si ya dio like
  const { data: existingLike, error: checkError } = await supabase
    .from('breed_likes')
    .select()
    .eq('breed_id', breedId)
    .eq('user_id', userId)
    .single();

  if (existingLike) {
    throw new Error('Ya has votado por esta raza');
  }

  // Registrar el like
  const { error: likeError } = await supabase
    .from('breed_likes')
    .insert({ breed_id: breedId, user_id: userId });

  if (likeError) throw likeError;

  // Actualizar contador de popularidad
  const { error: updateError } = await supabase.rpc('increment_breed_popularity', {
    breed_id: breedId
  });

  if (updateError) throw updateError;
};

