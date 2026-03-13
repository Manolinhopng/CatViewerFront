/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/props-fallback.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/vue-3.4-shims.d.ts" />
import { defineComponent, ref, onMounted } from 'vue';
import { getActiveImages, softDeleteImage } from '@/services/imageService';
import { useAuth } from '@/services/authService';
export default {};
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['image-card']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-btn']} */ ;
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "loading" },
    });
    /** @type {__VLS_StyleScopedClasses['loading']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "images-grid" },
    });
    /** @type {__VLS_StyleScopedClasses['images-grid']} */ ;
    for (const [image] of __VLS_vFor((__VLS_ctx.images))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (image.id),
            ...{ class: "image-card" },
        });
        /** @type {__VLS_StyleScopedClasses['image-card']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
            src: (image.public_url),
            alt: ('Gato ' + image.id),
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    __VLS_ctx.handleDelete(image.id);
                    // @ts-ignore
                    [loading, images, handleDelete,];
                } },
            ...{ class: "delete-btn" },
        });
        /** @type {__VLS_StyleScopedClasses['delete-btn']} */ ;
        // @ts-ignore
        [];
    }
}
// @ts-ignore
[];
const __VLS_export = defineComponent({
    name: 'DeleteImages',
    setup() {
        const images = ref([]);
        const loading = ref(false);
        const { user } = useAuth();
        const loadImages = async () => {
            if (!user.value)
                return;
            loading.value = true;
            try {
                images.value = await getActiveImages(user.value.id);
            }
            catch (error) {
                console.error("Error cargando imágenes:", error);
            }
            finally {
                loading.value = false;
            }
        };
        const handleDelete = async (imageId) => {
            if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?'))
                return;
            try {
                await softDeleteImage(imageId);
                await loadImages(); // Recargar lista después de eliminar
            }
            catch (error) {
                console.error("Error eliminando imagen:", error);
            }
        };
        onMounted(() => {
            loadImages();
        });
        return { images, loading, handleDelete };
    }
});
