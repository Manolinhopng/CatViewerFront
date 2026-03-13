import { supabase } from '@/lib/supabase';

export const API_URL = import.meta.env.VITE_API_URL as string;

if (!API_URL) {
  throw new Error('VITE_API_URL no está definida en las variables de entorno.');
}

/**
 * Helper de fetch autenticado.
 * Obtiene el JWT del usuario actual de la sesión de Supabase
 * y lo envía en el header Authorization de cada petición.
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, { ...options, headers });
}
