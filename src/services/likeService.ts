export async function getLikes(image_id: string) {
  const response = await fetch(`http://localhost:3001/api/like/${image_id}`);
  return await response.json();
}

export async function toggleLike(user_id: string, image_id: string) {
  const response = await fetch('http://localhost:3001/api/like/toggle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, image_id })
  });
  return await response.json(); // { liked: true, newCount: ... }
}

export async function getBreedLikes(breed_id: string) {
  const response = await fetch(`http://localhost:3001/api/breedLikes/${breed_id}`);
  return await response.json(); // { count: ... }
}

export async function toggleBreedLike(user_id: string, breed_id: string) {
  const response = await fetch('http://localhost:3001/api/breedLikes/toggle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, breed_id })
  });
  return await response.json(); // { liked: true, newCount: ... }
}
