/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/props-fallback.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/vue-3.4-shims.d.ts" />
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useAuth } from '@/services/authService';
import { commentService } from '@/services/commentService';
export default {};
;
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['delete-button']} */ ;
/** @type {__VLS_StyleScopedClasses['like-button']} */ ;
/** @type {__VLS_StyleScopedClasses['like-button']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-button']} */ ;
/** @type {__VLS_StyleScopedClasses['comment-button']} */ ;
/** @type {__VLS_StyleScopedClasses['comment-button']} */ ;
/** @type {__VLS_StyleScopedClasses['login-link']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['login-toast']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "comments-section" },
});
/** @type {__VLS_StyleScopedClasses['comments-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "comments-title" },
});
/** @type {__VLS_StyleScopedClasses['comments-title']} */ ;
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "loading" },
    });
    /** @type {__VLS_StyleScopedClasses['loading']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
else if (__VLS_ctx.comments.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "no-comments" },
    });
    /** @type {__VLS_StyleScopedClasses['no-comments']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "comment-list" },
    });
    /** @type {__VLS_StyleScopedClasses['comment-list']} */ ;
    for (const [comment] of __VLS_vFor((__VLS_ctx.comments))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (comment.id),
            ...{ class: "comment-item" },
        });
        /** @type {__VLS_StyleScopedClasses['comment-item']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "comment-header" },
        });
        /** @type {__VLS_StyleScopedClasses['comment-header']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "comment-user" },
        });
        /** @type {__VLS_StyleScopedClasses['comment-user']} */ ;
        (comment.user_name || 'Usuario');
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "comment-date" },
        });
        /** @type {__VLS_StyleScopedClasses['comment-date']} */ ;
        (new Date(comment.created_at).toLocaleDateString());
        if (__VLS_ctx.user && comment.user_id === __VLS_ctx.user.id) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
                ...{ onClick: (...[$event]) => {
                        if (!!(__VLS_ctx.loading))
                            return;
                        if (!!(__VLS_ctx.comments.length === 0))
                            return;
                        if (!(__VLS_ctx.user && comment.user_id === __VLS_ctx.user.id))
                            return;
                        __VLS_ctx.deleteComment(comment.id);
                        // @ts-ignore
                        [loading, comments, comments, user, user, deleteComment,];
                    } },
                ...{ class: "delete-button" },
                title: "Eliminar comentario",
            });
            /** @type {__VLS_StyleScopedClasses['delete-button']} */ ;
        }
        if (comment.image_url) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "comment-image" },
            });
            /** @type {__VLS_StyleScopedClasses['comment-image']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.img, __VLS_intrinsics.img)({
                src: (comment.image_url),
                alt: ('Imagen del comentario'),
                ...{ class: "comment-img" },
            });
            /** @type {__VLS_StyleScopedClasses['comment-img']} */ ;
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "comment-text" },
        });
        /** @type {__VLS_StyleScopedClasses['comment-text']} */ ;
        (comment.text);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "comment-actions" },
        });
        /** @type {__VLS_StyleScopedClasses['comment-actions']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.comments.length === 0))
                        return;
                    __VLS_ctx.toggleLike(comment.id);
                    // @ts-ignore
                    [toggleLike,];
                } },
            ...{ class: "like-button" },
        });
        /** @type {__VLS_StyleScopedClasses['like-button']} */ ;
        (comment.likes_count || 0);
        // @ts-ignore
        [];
    }
}
if (__VLS_ctx.errorMessage) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "error-message" },
    });
    /** @type {__VLS_StyleScopedClasses['error-message']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.errorMessage);
}
if (__VLS_ctx.isAuthenticated()) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "add-comment" },
    });
    /** @type {__VLS_StyleScopedClasses['add-comment']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "comment-form" },
    });
    /** @type {__VLS_StyleScopedClasses['comment-form']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.textarea, __VLS_intrinsics.textarea)({
        value: (__VLS_ctx.newCommentText),
        placeholder: "Escribe tu comentario...",
        ...{ class: "comment-input" },
        disabled: (__VLS_ctx.loading),
    });
    /** @type {__VLS_StyleScopedClasses['comment-input']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "upload-section" },
    });
    /** @type {__VLS_StyleScopedClasses['upload-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input, __VLS_intrinsics.input)({
        ...{ onChange: (__VLS_ctx.handleImageUpload) },
        type: "file",
        accept: "image/*",
        ...{ class: "file-input" },
        ref: "fileInput",
    });
    /** @type {__VLS_StyleScopedClasses['file-input']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.triggerFileInput) },
        ...{ class: "upload-button" },
    });
    /** @type {__VLS_StyleScopedClasses['upload-button']} */ ;
    if (__VLS_ctx.selectedImage) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "selected-image" },
        });
        /** @type {__VLS_StyleScopedClasses['selected-image']} */ ;
        (__VLS_ctx.selectedImage.name);
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.addComment) },
        ...{ class: "comment-button" },
        disabled: (!__VLS_ctx.newCommentText.trim() || __VLS_ctx.loading),
    });
    /** @type {__VLS_StyleScopedClasses['comment-button']} */ ;
    (__VLS_ctx.loading ? 'Enviando...' : 'Comentar');
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "login-prompt" },
    });
    /** @type {__VLS_StyleScopedClasses['login-prompt']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    let __VLS_0;
    /** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
    routerLink;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        to: "/login",
        ...{ class: "login-link" },
    }));
    const __VLS_2 = __VLS_1({
        to: "/login",
        ...{ class: "login-link" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['login-link']} */ ;
    const { default: __VLS_5 } = __VLS_3.slots;
    // @ts-ignore
    [loading, loading, loading, errorMessage, errorMessage, isAuthenticated, newCommentText, newCommentText, handleImageUpload, triggerFileInput, selectedImage, selectedImage, addComment,];
    var __VLS_3;
}
if (__VLS_ctx.showLoginToast) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "login-toast" },
    });
    /** @type {__VLS_StyleScopedClasses['login-toast']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
// @ts-ignore
[showLoginToast,];
const __VLS_export = defineComponent({
    props: {
        breedId: { type: String, required: true },
        primaryColor: { type: String, required: true },
        secondaryColor: { type: String, required: true }
    },
    setup(props) {
        const { user, isAuthenticated } = useAuth();
        const newCommentText = ref('');
        const selectedImage = ref(null);
        const fileInput = ref();
        const comments = ref([]);
        const loading = ref(false);
        const errorMessage = ref('');
        const showLoginToast = ref(false);
        // Cargar comentarios cuando cambien las props
        const loadComments = async () => {
            try {
                loading.value = true;
                errorMessage.value = '';
                const fetchedComments = await commentService.getComments(props.breedId, props.primaryColor, props.secondaryColor);
                comments.value = fetchedComments;
            }
            catch (error) {
                console.error('Error loading comments:', error);
                errorMessage.value = 'Error al cargar comentarios';
            }
            finally {
                loading.value = false;
            }
        };
        // Cargar comentarios al montar el componente y cuando cambien las props
        onMounted(loadComments);
        watch([() => props.breedId, () => props.primaryColor, () => props.secondaryColor], loadComments);
        const handleImageUpload = (event) => {
            const fileInput = event.target;
            if (fileInput.files && fileInput.files[0]) {
                selectedImage.value = fileInput.files[0];
            }
        };
        const triggerFileInput = () => {
            fileInput.value?.click();
        };
        const addComment = async () => {
            if (!newCommentText.value.trim() || !isAuthenticated() || !user.value)
                return;
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
            }
            catch (error) {
                console.error('Error creating comment:', error);
                errorMessage.value = 'Error al crear comentario';
            }
            finally {
                loading.value = false;
            }
        };
        const toggleLike = async (commentId) => {
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
            }
            catch (error) {
                console.error('Error toggling like:', error);
                alert('Error al dar like: ' + error.message);
            }
        };
        const deleteComment = async (commentId) => {
            if (!user.value)
                return;
            if (!confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
                return;
            }
            try {
                await commentService.deleteComment(commentId);
                comments.value = comments.value.filter(c => c.id !== commentId);
            }
            catch (error) {
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
