/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/props-fallback.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/vue-3.4-shims.d.ts" />
import { defineComponent, computed } from 'vue';
import { useBreedData } from '@/services/breedService';
import { useRouter } from 'vue-router';
export default {};
;
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "cat-display" },
});
/** @type {__VLS_StyleScopedClasses['cat-display']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "cat-visualization" },
});
/** @type {__VLS_StyleScopedClasses['cat-visualization']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: (__VLS_ctx.catImageUrl),
    alt: (`Gato ${__VLS_ctx.breedData?.breed ?? ''} ${__VLS_ctx.colorDescription}`),
    ...{ class: "cat-image" },
});
/** @type {__VLS_StyleScopedClasses['cat-image']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "pattern-overlay" },
    ...{ style: (__VLS_ctx.patternStyle) },
});
/** @type {__VLS_StyleScopedClasses['pattern-overlay']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "breed-data" },
});
/** @type {__VLS_StyleScopedClasses['breed-data']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
(__VLS_ctx.breedData?.breed);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
(__VLS_ctx.breedData?.description);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "color-info" },
});
/** @type {__VLS_StyleScopedClasses['color-info']} */ ;
for (const [color, i] of __VLS_vFor((__VLS_ctx.colorPalette))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (i),
        ...{ class: "color-swatch" },
        ...{ style: ({ backgroundColor: color }) },
    });
    /** @type {__VLS_StyleScopedClasses['color-swatch']} */ ;
    // @ts-ignore
    [catImageUrl, breedData, breedData, breedData, colorDescription, patternStyle, colorPalette,];
}
// @ts-ignore
[];
const __VLS_export = defineComponent({
    props: {
        primaryColor: {
            type: String,
            required: true
        },
        secondaryColor: {
            type: String,
            required: true
        },
        breedId: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const { getBreedById } = useBreedData();
        const breedData = computed(() => getBreedById(Number(props.breedId)));
        const catImageUrl = computed(() => breedData.value?.imageUrl || '');
        const router = useRouter();
        const patternStyle = computed(() => {
            return {
                background: `linear-gradient(45deg, ${props.primaryColor} 30%, ${props.secondaryColor} 70%)`,
                mixBlendMode: 'multiply'
            };
        });
        const colorDescription = computed(() => {
            return `${props.primaryColor} y ${props.secondaryColor}`;
        });
        const colorPalette = computed(() => {
            return generateColorPalette(props.primaryColor, props.secondaryColor);
        });
        function onSelectionChange(newBreedId, newPrimaryColor, newSecondaryColor) {
            router.push({
                name: 'ExploreBreedColor',
                params: {
                    breedId: newBreedId,
                    primaryColor: newPrimaryColor,
                    secondaryColor: newSecondaryColor
                }
            });
        }
        function generateColorPalette(primary, secondary) {
            // Lógica simple de ejemplo, reemplaza por la real si la tienes
            return [primary, secondary];
        }
        return { breedData, catImageUrl, patternStyle, colorDescription, colorPalette, onSelectionChange };
    }
});
