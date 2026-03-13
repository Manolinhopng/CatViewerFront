import { ref } from 'vue';
import { supabase } from '@/lib/supabase';
import { API_URL } from '@/lib/api';
const user = ref(null);
// Restaurar sesión al cargar
supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
        user.value = session.user;
    }
});
// Escuchar cambios en la sesión
supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user || null;
});
export function useAuth() {
    /**
     * Iniciar sesión con email y contraseña (usando backend)
     */
    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                if (data.session) {
                    await supabase.auth.setSession(data.session);
                }
                user.value = data.user;
                return { success: true, user: data.user };
            }
            else {
                return { success: false, error: data.error };
            }
        }
        catch (err) {
            console.error('Login error:', err);
            return { success: false, error: 'Error de conexión con el servidor' };
        }
    };
    /**
     * Registrar nuevo usuario (usando backend)
     */
    const signUp = async (name, email, password) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                if (data.session) {
                    await supabase.auth.setSession(data.session);
                }
                user.value = data.user;
                return { success: true, user: data.user };
            }
            else {
                return { success: false, error: data.error };
            }
        }
        catch (err) {
            console.error('Signup error:', err);
            return { success: false, error: 'Error de conexión con el servidor' };
        }
    };
    const isAuthenticated = () => !!user.value;
    const logout = async () => {
        await supabase.auth.signOut();
        user.value = null;
    };
    return { login, signUp, isAuthenticated, user, logout };
}
