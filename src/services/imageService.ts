// src/services/imageService.ts
export async function saveImage(user_id: string, path: string, public_url: string) {
  const response = await fetch('http://localhost:3001/api/images/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, path, public_url })
  });
  return await response.json();
}
export async function getActiveImages(user_id: string) {
  const response = await fetch(`http://localhost:3001/api/images/active/${user_id}`);
  const data = await response.json();
  return data.images;
}
export async function softDeleteImage(imageId: string) {
  const response = await fetch('http://localhost:3001/api/images/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageId })
  });
  return await response.json();
}