/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/props-fallback.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/vue-3.4-shims.d.ts" />
import { defineComponent, ref, onMounted } from 'vue';
import Upload from '@/components/upload.vue';
import { getTopBreedsAllTime } from '@/services/breedService';
export default {};
;
const __VLS_ctx = {};
const __VLS_componentsOption = { Upload };
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['content-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-item']} */ ;
/** @type {__VLS_StyleScopedClasses['view-more-link']} */ ;
/** @type {__VLS_StyleScopedClasses['image-card']} */ ;
/** @type {__VLS_StyleScopedClasses['cat-image']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "community-container" },
});
/** @type {__VLS_StyleScopedClasses['community-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "header-section" },
});
/** @type {__VLS_StyleScopedClasses['header-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-3xl font-bold text-indigo-700 mb-2" },
});
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-indigo-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-gray-600 mb-6" },
});
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "upload-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['upload-wrapper']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.upload | typeof __VLS_components.Upload} */
upload;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onUploadSuccess': {} },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUploadSuccess': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ uploadSuccess: {} },
    { onUploadSuccess: (__VLS_ctx.fetchImages) });
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "content-grid" },
});
/** @type {__VLS_StyleScopedClasses['content-grid']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "ranking-section" },
});
/** @type {__VLS_StyleScopedClasses['ranking-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
if (__VLS_ctx.loadingRanking) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "loading" },
    });
    /** @type {__VLS_StyleScopedClasses['loading']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ranking-list" },
    });
    /** @type {__VLS_StyleScopedClasses['ranking-list']} */ ;
    for (const [breed, i] of __VLS_vFor((__VLS_ctx.topBreeds))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (breed.id),
            ...{ class: "ranking-item" },
        });
        /** @type {__VLS_StyleScopedClasses['ranking-item']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "rank-number" },
        });
        /** @type {__VLS_StyleScopedClasses['rank-number']} */ ;
        (i + 1);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "breed-name" },
        });
        /** @type {__VLS_StyleScopedClasses['breed-name']} */ ;
        (breed.name);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "likes-count" },
        });
        /** @type {__VLS_StyleScopedClasses['likes-count']} */ ;
        (breed.likes);
        // @ts-ignore
        [fetchImages, loadingRanking, topBreeds,];
    }
    if (__VLS_ctx.topBreeds.length === 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "empty-msg" },
        });
        /** @type {__VLS_StyleScopedClasses['empty-msg']} */ ;
    }
}
let __VLS_7;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    to: "/ranking",
    ...{ class: "view-more-link" },
}));
const __VLS_9 = __VLS_8({
    to: "/ranking",
    ...{ class: "view-more-link" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['view-more-link']} */ ;
const { default: __VLS_12 } = __VLS_10.slots;
// @ts-ignore
[topBreeds,];
var __VLS_10;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "gallery-section" },
});
/** @type {__VLS_StyleScopedClasses['gallery-section']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "section-title" },
});
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
if (__VLS_ctx.loadingImages) {
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
    for (const [img] of __VLS_vFor((__VLS_ctx.communityImages))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (img.id),
            ...{ class: "image-card" },
        });
        /** @type {__VLS_StyleScopedClasses['image-card']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
            src: (img.public_url),
            alt: ('Gato subido por usuario'),
            ...{ class: "cat-image" },
        });
        /** @type {__VLS_StyleScopedClasses['cat-image']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "image-overlay" },
        });
        /** @type {__VLS_StyleScopedClasses['image-overlay']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        // @ts-ignore
        [loadingImages, communityImages,];
    }
    if (__VLS_ctx.communityImages.length === 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "empty-msg" },
        });
        /** @type {__VLS_StyleScopedClasses['empty-msg']} */ ;
    }
}
// @ts-ignore
[communityImages,];
const __VLS_export = defineComponent({
    components: { Upload },
    setup() {
        const topBreeds = ref([]);
        const communityImages = ref([]);
        const loadingRanking = ref(true);
        const loadingImages = ref(true);
        const fetchRanking = async () => {
            try {
                loadingRanking.value = true;
                topBreeds.value = await getTopBreedsAllTime(5);
            }
            catch (error) {
                console.error('Error fetching ranking:', error);
            }
            finally {
                loadingRanking.value = false;
            }
        };
        const fetchImages = async () => {
            try {
                loadingImages.value = true;
                const response = await fetch('http://localhost:3001/api/images/all');
                const data = await response.json();
                communityImages.value = data.images || [];
            }
            catch (error) {
                console.error('Error fetching images:', error);
            }
            finally {
                loadingImages.value = false;
            }
        };
        onMounted(() => {
            fetchRanking();
            fetchImages();
        });
        return {
            topBreeds,
            communityImages,
            loadingRanking,
            loadingImages,
            fetchImages
        };
    }
});
