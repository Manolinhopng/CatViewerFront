/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/props-fallback.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/vue-3.4-shims.d.ts" />
import { defineComponent, ref } from 'vue';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/services/authService';
import { authFetch, API_URL } from '@/lib/api';
export default {};
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['upload-button']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "upload-container" },
});
/** @type {__VLS_StyleScopedClasses['upload-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "upload-button" },
});
/** @type {__VLS_StyleScopedClasses['upload-button']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onChange: (__VLS_ctx.handleUpload) },
    type: "file",
    accept: "image/*",
    ...{ class: "hidden" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
if (__VLS_ctx.uploading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "upload-status" },
    });
    /** @type {__VLS_StyleScopedClasses['upload-status']} */ ;
}
// @ts-ignore
[handleUpload, uploading,];
const __VLS_export = defineComponent({
    emits: ['upload-success'],
    setup(props, { emit }) {
        const { user } = useAuth();
        const uploading = ref(false);
        const handleUpload = async (event) => {
            const fileInput = event.target;
            if (!fileInput.files?.length)
                return;
            if (!user.value) {
                alert('Debes iniciar sesión para subir imágenes');
                return;
            }
            uploading.value = true;
            const file = fileInput.files[0];
            const filePath = `public/${Date.now()}_${file.name}`;
            try {
                const { data, error } = await supabase.storage
                    .from('cat-images')
                    .upload(filePath, file);
                if (error)
                    throw error;
                const { data: { publicUrl } } = supabase.storage
                    .from('cat-images')
                    .getPublicUrl(data.path);
                // Registrar en el backend (el JWT del header autentica y provee user_id)
                const response = await authFetch(`${API_URL}/api/images/upload`, {
                    method: 'POST',
                    body: JSON.stringify({
                        path: data.path,
                        public_url: publicUrl
                    })
                });
                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error || 'Error al registrar la imagen');
                }
                emit('upload-success', {
                    publicUrl,
                    path: data.path
                });
                alert('¡Gato subido con éxito!');
            }
            catch (error) {
                console.error('Error uploading:', error);
                alert('Error al subir la imagen: ' + error.message);
            }
            finally {
                uploading.value = false;
            }
        };
        return { handleUpload, uploading };
    }
});
