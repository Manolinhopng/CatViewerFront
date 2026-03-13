<template>
  <div class="comments-section">
    <h3 class="comments-title">💬 Comentarios sobre este gato</h3>
    
    <div v-if="loading" class="loading">
      <p>Cargando comentarios...</p>
    </div>
    
    <div v-else-if="comments.length === 0" class="no-comments">
      <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
    </div>
    
    <div v-else class="comment-list">
      <div 
        v-for="comment in comments" 
        :key="comment.id"
        class="comment-item"
      >
        <div class="comment-header">
          <span class="comment-user">{{ comment.user_name || 'Usuario' }}</span>          
          <span class="comment-date">{{ new Date(comment.created_at).toLocaleDateString() }}</span>
          <button 
            v-if="user && comment.user_id === user.id"
            @click="deleteComment(comment.id)"
            class="delete-button"
            title="Eliminar comentario"
          >
            🗑️
          </button>
        </div>
        
        <div v-if="comment.image_url" class="comment-image">
          <img :src="comment.image_url" :alt="'Imagen del comentario'" class="comment-img">
        </div>
        
        <p class="comment-text">{{ comment.text }}</p>
        
        <div class="comment-actions">
          <button 
            @click="toggleLike(comment.id)" 
            class="like-button"
          >
            ❤️ {{ comment.likes_count || 0 }} likes
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
    
    <div v-if="isAuthenticated()" class="add-comment">
      <div class="comment-form">
        <textarea 
          v-model="newCommentText" 
          placeholder="Escribe tu comentario..."
          class="comment-input"
          :disabled="loading"
        ></textarea>
        
        <div class="upload-section">
          <input 
            type="file" 
            @change="handleImageUpload" 
            accept="image/*"
            class="file-input"
            ref="fileInput"
          >
          <button @click="triggerFileInput" class="upload-button">
            📷 Subir foto
          </button>
          <span v-if="selectedImage" class="selected-image">
            Imagen seleccionada: {{ selectedImage.name }}
          </span>
        </div>
        
        <button @click="addComment" class="comment-button" :disabled="!newCommentText.trim() || loading">
          {{ loading ? 'Enviando...' : 'Comentar' }}
        </button>
      </div>
    </div>
    
    <div v-else class="login-prompt">
      <p>💬 Para comentar, por favor <router-link to="/login" class="login-link">inicia sesión</router-link></p>
    </div>

    <div v-if="showLoginToast" class="login-toast">
      <span>Por favor inicia sesión para dar like</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useAuth } from '@/services/authService';
import { commentService, type Comment } from '@/services/commentService';

export default defineComponent({
  props: {
    breedId: { type: String, required: true },
    primaryColor: { type: String, required: true },
    secondaryColor: { type: String, required: true }
  },
  setup(props) {
    const { user, isAuthenticated } = useAuth();
    const newCommentText = ref('');
    const selectedImage = ref<File | null>(null);
    const fileInput = ref<HTMLInputElement>();
    const comments = ref<Comment[]>([]);
    const loading = ref(false);
    const errorMessage = ref('');
    const showLoginToast = ref(false);

    // Cargar comentarios cuando cambien las props
    const loadComments = async () => {
      try {
        loading.value = true;
        errorMessage.value = '';
        const fetchedComments = await commentService.getComments(
          props.breedId,
          props.primaryColor,
          props.secondaryColor
        );
        comments.value = fetchedComments;
      } catch (error) {
        console.error('Error loading comments:', error);
        errorMessage.value = 'Error al cargar comentarios';
      } finally {
        loading.value = false;
      }
    };

    // Cargar comentarios al montar el componente y cuando cambien las props
    onMounted(loadComments);
    watch([() => props.breedId, () => props.primaryColor, () => props.secondaryColor], loadComments);

    const handleImageUpload = (event: Event) => {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        selectedImage.value = fileInput.files[0];
      }
    };

    const triggerFileInput = () => {
      fileInput.value?.click();
    };

    const addComment = async () => {
      if (!newCommentText.value.trim() || !isAuthenticated() || !user.value) return;
      
      try {
        loading.value = true;
        errorMessage.value = '';
        
        let imageUrl = '';
        if (selectedImage.value) {
          imageUrl = await commentService.uploadCommentImage(selectedImage.value);
        }
        
        const commentData = {
          breed_id: props.breedId,
          primary_color: props.primaryColor,
          secondary_color: props.secondaryColor,
          text: newCommentText.value,
          image_url: imageUrl || undefined,
        };
        
        const newComment = await commentService.createComment(commentData);
        comments.value.unshift(newComment);
        
        newCommentText.value = '';
        selectedImage.value = null;
      } catch (error) {
        console.error('Error creating comment:', error);
        errorMessage.value = 'Error al crear comentario';
      } finally {
        loading.value = false;
      }
    };

    const toggleLike = async (commentId: string) => {
      if (!isAuthenticated() || !user.value) {
        showLoginToast.value = true;
        setTimeout(() => { showLoginToast.value = false; }, 2500);
        return;
      }

      try {
        const result = await commentService.toggleCommentLike(commentId);
        // Busca el comentario en el array y actualiza su likes_count
        const comment = comments.value.find(c => c.id === commentId);
        if (comment && result && typeof result.newCount === 'number') {
          comment.likes_count = result.newCount;
        }
      } catch (error) {
        console.error('Error toggling like:', error);
        alert('Error al dar like: ' + (error as Error).message);
      }
    };

    const deleteComment = async (commentId: string) => {
      if (!user.value) return;
      
      if (!confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
        return;
      }

      try {
        await commentService.deleteComment(commentId);
        comments.value = comments.value.filter(c => c.id !== commentId);
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Error al eliminar comentario');
      }
    };

    return { 
      comments, 
      addComment, 
      isAuthenticated,
      newCommentText,
      selectedImage,
      handleImageUpload,
      toggleLike,
      deleteComment,
      fileInput,
      triggerFileInput,
      loading,
      errorMessage,
      user,
      showLoginToast
    };
  }
});
</script>

<style scoped>
.comments-section {
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-left: 4px solid #3b82f6;
}

.comments-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e5e7eb;
}

.no-comments {
  text-align: center;
  padding: 20px;
  color: #6b7280;
  font-style: italic;
}

.comment-list {
  margin-bottom: 20px;
}

.comment-item {
  padding: 15px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 10px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.comment-user {
  font-weight: bold;
  color: #374151;
}

.comment-date {
  color: #6b7280;
  font-size: 0.875rem;
}

.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #ef4444;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.delete-button:hover {
  background: #fef2f2;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #6b7280;
}

.comment-image {
  margin: 10px 0;
}

.comment-img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
}

.comment-text {
  color: #1f2937;
  line-height: 1.5;
  margin-bottom: 8px;
}

.comment-actions {
  margin-top: 10px;
}

.like-button {
  background: none;
  border: 1px solid #e5e7eb;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.like-button:hover {
  background: #f3f4f6;
}

.like-button.liked {
  background: #fef2f2;
  color: #dc2626;
  border-color: #fecaca;
}

.add-comment {
  margin-top: 20px;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.comment-input {
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
}

.upload-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-input {
  display: none;
}

.upload-button {
  background: #10b981;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.upload-button:hover {
  background: #059669;
}

.selected-image {
  color: #059669;
  font-size: 0.875rem;
}

.comment-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
  align-self: flex-end;
}

.comment-button:hover:not(:disabled) {
  background: #2563eb;
}

.comment-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.login-prompt {
  text-align: center;
  padding: 20px;
  background: #fef3c7;
  border-radius: 8px;
  margin-top: 20px;
}

.login-link {
  color: #d97706;
  text-decoration: underline;
  font-weight: bold;
}

.login-link:hover {
  color: #b45309;
}

.error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.error-message p {
  margin: 0;
  font-size: 0.875rem;
}

.login-toast {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 16px 32px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  font-weight: bold;
  z-index: 1000;
  animation: fadeInOut 2.5s;
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
}

.login-toast span {
  color: #dc2626;
  font-size: 0.95rem;
}
</style>