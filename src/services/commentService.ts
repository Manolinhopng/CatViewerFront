import { supabase } from '@/lib/supabase';

export interface Comment {
  id: string;
  user_id: string;
  breed_id: string;
  primary_color: string;
  secondary_color: string;
  text: string;
  image_url?: string;
  created_at: string;
  updated_at?: string;
  user_name?: string;
  user_email?: string;
  likes_count?: number;
}

export interface CreateCommentData {
  user_id: string;
  breed_id: string;
  primary_color: string;
  secondary_color: string;
  text: string;
  image_url?: string;
}

export interface UpdateCommentData {
  text: string;
  image_url?: string;
}

class CommentService {
  private baseUrl = 'http://localhost:3001/api/comments';

  async getComments(breedId: string, primaryColor: string, secondaryColor: string): Promise<Comment[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}?breedId=${encodeURIComponent(breedId)}&primaryColor=${encodeURIComponent(primaryColor)}&secondaryColor=${encodeURIComponent(secondaryColor)}`
      );
      
      if (!response.ok) {
        throw new Error('Error al obtener comentarios');
      }
      
      const data = await response.json();
      return data.comments || [];
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  async createComment(commentData: CreateCommentData): Promise<Comment> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear comentario');
      }

      const data = await response.json();
      return data.comment;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }

  async updateComment(commentId: string, updateData: UpdateCommentData, userId: string): Promise<Comment> {
    try {
      const response = await fetch(`${this.baseUrl}/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updateData,
          user_id: userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar comentario');
      }

      const data = await response.json();
      return data.comment;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  }

  async deleteComment(commentId: string, userId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar comentario');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }

  async toggleCommentLike(commentId: string, userId: string): Promise<{ liked: boolean, newCount: number }> {
    const response = await fetch(`${this.baseUrl}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment_id: commentId,
        user_id: userId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al dar like');
    }

    const data = await response.json();
    return data;
  }

  // Función para subir imagen del comentario a Supabase Storage
  async uploadCommentImage(file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `comment-images/${fileName}`;

      const { data, error } = await supabase.storage
        .from('image')
        .upload(filePath, file);

      if (error) {
        console.error('Upload error:', error);
        throw new Error('Error al subir imagen: ' + error.message);
      }

      // Obtener la URL pública de la imagen
      const { data: { publicUrl } } = supabase.storage
        .from('image')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading comment image:', error);
      throw error;
    }
  }
}

export const commentService = new CommentService(); 