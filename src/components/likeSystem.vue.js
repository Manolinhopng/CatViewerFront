/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/props-fallback.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/vue-3.4-shims.d.ts" />
import { defineComponent, ref, onMounted } from 'vue';
import { getBreedLikes, toggleBreedLike } from '@/services/likeService';
export default {};
;
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['like-button']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "like-system" },
});
/** @type {__VLS_StyleScopedClasses['like-system']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.toggleLike) },
    ...{ class: ({ 'liked': __VLS_ctx.isLiked }) },
    ...{ class: "like-button" },
});
/** @type {__VLS_StyleScopedClasses['liked']} */ ;
/** @type {__VLS_StyleScopedClasses['like-button']} */ ;
(__VLS_ctx.likeCount);
// @ts-ignore
[toggleLike, isLiked, likeCount,];
const __VLS_export = defineComponent({
    name: 'LikeSystem',
    props: {
        breedId: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const isLiked = ref(false);
        const likeCount = ref(0);
        const toggleLike = async () => {
            try {
                const result = await toggleBreedLike(props.breedId);
                if (result && result.newCount !== undefined) {
                    isLiked.value = !isLiked.value;
                    likeCount.value = result.newCount;
                }
            }
            catch (error) {
                console.error("Error al dar like:", error);
            }
        };
        onMounted(async () => {
            try {
                const result = await getBreedLikes(props.breedId);
                if (result && result.count !== undefined) {
                    likeCount.value = result.count;
                }
            }
            catch (error) {
                console.error("Error al obtener likes:", error);
            }
        });
        return { isLiked, likeCount, toggleLike };
    }
});
