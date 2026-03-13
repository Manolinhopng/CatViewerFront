import { authFetch, API_URL } from '@/lib/api';
import { supabase } from '@/lib/supabase';
const BASE_URL = `${API_URL}/api/comments`;
class CommentService {
    async getComments(breedId, primaryColor, secondaryColor) {
        try {
            const response = await fetch(`${BASE_URL}?breedId=${encodeURIComponent(breedId)}&primaryColor=${encodeURIComponent(primaryColor)}&secondaryColor=${encodeURIComponent(secondaryColor)}`);
            if (!response.ok) {
                throw new Error('Error al obtener comentarios');
            }
            const data = await response.json();
            return data.comments || [];
        }
        catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    }
    async createComment(commentData) {
        try {
            // user_id y user_name ya no se envían: el backend los extrae del JWT
            const response = await authFetch(BASE_URL, {
                method: 'POST',
                body: JSON.stringify(commentData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al crear comentario');
            }
            const data = await response.json();
            return data.comment;
        }
        catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    }
    async updateComment(commentId, updateData) {
        try {
            // user_id ya no se envía: el backend lo extrae del JWT
            const response = await authFetch(`${BASE_URL}/${commentId}`, {
                method: 'PUT',
                body: JSON.stringify(updateData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al actualizar comentario');
            }
            const data = await response.json();
            return data.comment;
        }
        catch (error) {
            console.error('Error updating comment:', error);
            throw error;
        }
    }
    async deleteComment(commentId) {
        try {
            // user_id ya no se envía: el backend lo extrae del JWT
            const response = await authFetch(`${BASE_URL}/${commentId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al eliminar comentario');
            }
        }
        catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    }
    async toggleCommentLike(commentId) {
        // user_id ya no se envía: el backend lo extrae del JWT
        const response = await authFetch(`${BASE_URL}/like`, {
            method: 'POST',
            body: JSON.stringify({ comment_id: commentId }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al dar like');
        }
        return response.json();
    }
    // Subir imagen del comentario a Supabase Storage (desde el frontend con anon key)
    async uploadCommentImage(file) {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${crypto.randomUUID()}.${fileExt}`;
            const filePath = `comment-images/${fileName}`;
            const { error } = await supabase.storage
                .from('cat-images')
                .upload(filePath, file);
            if (error) {
                throw new Error('Error al subir imagen: ' + error.message);
            }
            const { data: { publicUrl } } = supabase.storage
                .from('cat-images')
                .getPublicUrl(filePath);
            return publicUrl;
        }
        catch (error) {
            console.error('Error uploading comment image:', error);
            throw error;
        }
    }
}
export const commentService = new CommentService();
