import { ref, type Ref } from 'vue'
import type { AuthUser } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

const user: Ref<AuthUser | null> = ref(null)

export function useAuth() {
  /**
   * Iniciar sesión con email y contraseña (usando backend)
   */
  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    if (response.ok) {
      user.value = data.user
      return { success: true, user: data.user }
    } else {
      return { success: false, error: data.error }
    }
  }

  /**
   * Registrar nuevo usuario (usando backend)
   */
  const signUp = async (name: string, email: string, password: string) => {
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    const data = await response.json()
    if (response.ok) {
      user.value = data.user
      return { success: true, user: data.user }
    } else {
      return { success: false, error: data.error }
    }
  }

  // Nueva función para saber si el usuario está autenticado
  const isAuthenticated = () => !!user.value;

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  return { login, signUp, isAuthenticated, user, logout };
}