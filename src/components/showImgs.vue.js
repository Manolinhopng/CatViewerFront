/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/props-fallback.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/vue-3.4-shims.d.ts" />
import { defineComponent, computed } from 'vue';
import { supabase } from '@/lib/supabase';
export default {};
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: (__VLS_ctx.imageUrl),
    ...{ class: "cat-image" },
    alt: (__VLS_ctx.altText),
});
/** @type {__VLS_StyleScopedClasses['cat-image']} */ ;
// @ts-ignore
[imageUrl, altText,];
const __VLS_export = defineComponent({
    props: {
        imagePath: {
            type: String,
            required: true
        },
        altText: {
            type: String,
            default: 'Cat image'
        },
        width: {
            type: Number,
            default: 300
        }
    },
    setup(props) {
        const imageUrl = computed(() => {
            return supabase.storage
                .from('cat-images')
                .getPublicUrl(props.imagePath, {
                transform: {
                    width: props.width,
                    height: props.width,
                    resize: 'cover'
                }
            }).data.publicUrl;
        });
        return { imageUrl };
    }
});
