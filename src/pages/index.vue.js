/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/props-fallback.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/vue-3.4-shims.d.ts" />
import { defineComponent, ref } from 'vue';
import Combinator from '@/components/combinator.vue';
import RankingSideBar from '@/components/rankingSideBar.vue';
import { useAuth } from '@/services/authService';
export default {};
;
const __VLS_ctx = {};
const __VLS_componentsOption = { Combinator, RankingSideBar };
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "home flex flex-col md:flex-row gap-8" },
});
/** @type {__VLS_StyleScopedClasses['home']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full md:w-auto md:min-w-[260px] flex-shrink-0" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['md:min-w-[260px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.rankingSideBar | typeof __VLS_components.RankingSideBar} */
rankingSideBar;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onSelectPeriod': {} },
    vertical: (true),
    showLinks: (false),
    selectedPeriod: (__VLS_ctx.selectedPeriod),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSelectPeriod': {} },
    vertical: (true),
    showLinks: (false),
    selectedPeriod: (__VLS_ctx.selectedPeriod),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ selectPeriod: {} },
    { onSelectPeriod: (__VLS_ctx.handleSelectPeriod) });
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex-1" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
if (__VLS_ctx.isAuthenticated()) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bienvenida" },
    });
    /** @type {__VLS_StyleScopedClasses['bienvenida']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bienvenida-contenido" },
    });
    /** @type {__VLS_StyleScopedClasses['bienvenida-contenido']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "bienvenida-emoji" },
    });
    /** @type {__VLS_StyleScopedClasses['bienvenida-emoji']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "bienvenida-mensaje" },
    });
    /** @type {__VLS_StyleScopedClasses['bienvenida-mensaje']} */ ;
    (__VLS_ctx.getUserName());
}
let __VLS_7;
/** @ts-ignore @type {typeof __VLS_components.combinator | typeof __VLS_components.Combinator} */
combinator;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    ...{ 'onCombinationChange': {} },
    ...{ class: "combinator-section" },
}));
const __VLS_9 = __VLS_8({
    ...{ 'onCombinationChange': {} },
    ...{ class: "combinator-section" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_12;
const __VLS_13 = ({ combinationChange: {} },
    { onCombinationChange: (__VLS_ctx.handleCombinationChange) });
/** @type {__VLS_StyleScopedClasses['combinator-section']} */ ;
var __VLS_10;
var __VLS_11;
// @ts-ignore
[selectedPeriod, handleSelectPeriod, isAuthenticated, getUserName, handleCombinationChange,];
const __VLS_export = defineComponent({
    components: { Combinator, RankingSideBar },
    setup() {
        const currentCombination = ref({
            primary: '',
            secondary: '',
            breed: ''
        });
        const { user, isAuthenticated } = useAuth();
        const selectedPeriod = ref('all');
        const handleCombinationChange = (combination) => {
            currentCombination.value = combination;
        };
        function getUserName() {
            return user.value?.user_metadata?.name || user.value?.email || '';
        }
        function handleSelectPeriod(period) {
            selectedPeriod.value = period;
        }
        return { currentCombination, handleCombinationChange, isAuthenticated, getUserName, selectedPeriod, handleSelectPeriod };
    }
});
