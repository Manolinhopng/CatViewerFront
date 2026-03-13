/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/props-fallback.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/vue-3.4-shims.d.ts" />
import { defineComponent } from 'vue';
import CatDisplay from '@/components/catDisplay.vue';
import LikeSystem from '@/components/likeSystem.vue';
import Comments from '@/components/comments.vue';
export default {};
;
const __VLS_ctx = {};
const __VLS_componentsOption = { CatDisplay, LikeSystem, Comments };
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "explore" },
});
/** @type {__VLS_StyleScopedClasses['explore']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-between items-center mb-4" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-2xl font-bold text-blue-600" },
});
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-600']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    to: "/",
    ...{ class: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" },
}));
const __VLS_2 = __VLS_1({
    to: "/",
    ...{ class: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
var __VLS_3;
let __VLS_6;
/** @ts-ignore @type {typeof __VLS_components.catDisplay | typeof __VLS_components.CatDisplay} */
catDisplay;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    primaryColor: __VLS_ctx.$route.params.primaryColor,
    secondaryColor: __VLS_ctx.$route.params.secondaryColor,
    breedId: __VLS_ctx.$route.params.breedId,
}));
const __VLS_8 = __VLS_7({
    primaryColor: __VLS_ctx.$route.params.primaryColor,
    secondaryColor: __VLS_ctx.$route.params.secondaryColor,
    breedId: __VLS_ctx.$route.params.breedId,
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_11;
/** @ts-ignore @type {typeof __VLS_components.likeSystem | typeof __VLS_components.LikeSystem} */
likeSystem;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    breedId: __VLS_ctx.$route.params.breedId,
    userId: ('temp-user-id'),
    ...{ class: "like-section" },
}));
const __VLS_13 = __VLS_12({
    breedId: __VLS_ctx.$route.params.breedId,
    userId: ('temp-user-id'),
    ...{ class: "like-section" },
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
/** @type {__VLS_StyleScopedClasses['like-section']} */ ;
let __VLS_16;
/** @ts-ignore @type {typeof __VLS_components.comments | typeof __VLS_components.Comments} */
comments;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
    breedId: __VLS_ctx.$route.params.breedId,
    primaryColor: __VLS_ctx.$route.params.primaryColor,
    secondaryColor: __VLS_ctx.$route.params.secondaryColor,
}));
const __VLS_18 = __VLS_17({
    breedId: __VLS_ctx.$route.params.breedId,
    primaryColor: __VLS_ctx.$route.params.primaryColor,
    secondaryColor: __VLS_ctx.$route.params.secondaryColor,
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_21;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
    to: "/community",
    ...{ class: "community-link" },
}));
const __VLS_23 = __VLS_22({
    to: "/community",
    ...{ class: "community-link" },
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
/** @type {__VLS_StyleScopedClasses['community-link']} */ ;
const { default: __VLS_26 } = __VLS_24.slots;
// @ts-ignore
[$route, $route, $route, $route, $route, $route, $route,];
var __VLS_24;
// @ts-ignore
[];
const __VLS_export = defineComponent({
    components: { CatDisplay, LikeSystem, Comments }
});
