import { authFetch, API_URL } from '@/lib/api';

export async function getLikes(image_id: string) {
  const response = await fetch(`${API_URL}/api/like/${image_id}`);
  return response.json();
}

export async function toggleLike(image_id: string) {
  // user_id ya no se envía: el backend lo extrae del JWT
  const response = await authFetch(`${API_URL}/api/like/toggle`, {
    method: 'POST',
    body: JSON.stringify({ image_id }),
  });
  return response.json();
}

export async function getBreedLikes(breed_id: string) {
  const response = await fetch(`${API_URL}/api/breedLikes/${breed_id}`);
  return response.json();
}

export async function toggleBreedLike(breed_id: string) {
  // user_id ya no se envía: el backend lo extrae del JWT
  const response = await authFetch(`${API_URL}/api/breedLikes/toggle`, {
    method: 'POST',
    body: JSON.stringify({ breed_id }),
  });
  return response.json();
}
