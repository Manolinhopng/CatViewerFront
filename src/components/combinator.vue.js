/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/props-fallback.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/vue-3.4-shims.d.ts" />
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { findBreedByColors } from '@/services/catService';
import { useAuth } from '@/services/authService';
import Comments from '@/components/comments.vue';
import { getBreedLikes } from '@/services/breedService';
import { toggleBreedLike } from '@/services/likeService';
import { commentService } from '@/services/commentService';
import { API_URL } from '@/lib/api';
// Colors that together can form a calico (need a 3rd)
const CALICO_PAIR_COLORS = new Set(['white', 'black', 'orange']);
function isCalicoPartialPair(a, b) {
    return CALICO_PAIR_COLORS.has(a) && CALICO_PAIR_COLORS.has(b) && a !== b;
}
export default {};
;
const __VLS_ctx = {};
const __VLS_componentsOption = { Comments };
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['color-button']} */ ;
/** @type {__VLS_StyleScopedClasses['color-button']} */ ;
/** @type {__VLS_StyleScopedClasses['show-combo-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['placeholder-cat']} */ ;
/** @type {__VLS_StyleScopedClasses['like-button']} */ ;
/** @type {__VLS_StyleScopedClasses['like-button']} */ ;
/** @type {__VLS_StyleScopedClasses['file-label']} */ ;
/** @type {__VLS_StyleScopedClasses['request-cat-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['request-cat-btn']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "combinator" },
});
/** @type {__VLS_StyleScopedClasses['combinator']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-2xl font-bold text-center mb-6" },
});
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "palettes-row" },
});
/** @type {__VLS_StyleScopedClasses['palettes-row']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "palette-block" },
});
/** @type {__VLS_StyleScopedClasses['palette-block']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "palette-title" },
});
/** @type {__VLS_StyleScopedClasses['palette-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "color-grid" },
});
/** @type {__VLS_StyleScopedClasses['color-grid']} */ ;
for (const [color] of __VLS_vFor((__VLS_ctx.availableColors))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selectPrimary(color);
                // @ts-ignore
                [availableColors, selectPrimary,];
            } },
        key: ('primary-' + color.id),
        ...{ class: ([
                'color-button',
                __VLS_ctx.primaryColor?.id === color.id ? 'selected' : ''
            ]) },
        ...{ style: ({ backgroundColor: color.hex }) },
        title: (color.name),
    });
    /** @type {__VLS_StyleScopedClasses['color-button']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sr-only" },
    });
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
    (color.name);
    // @ts-ignore
    [primaryColor,];
}
if (__VLS_ctx.primaryColor) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "selected-chip" },
    });
    /** @type {__VLS_StyleScopedClasses['selected-chip']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "chip-dot" },
        ...{ style: ({ backgroundColor: __VLS_ctx.primaryColor.hex }) },
    });
    /** @type {__VLS_StyleScopedClasses['chip-dot']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.primaryColor.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.clearPrimary) },
        ...{ class: "chip-remove" },
        title: "Quitar",
    });
    /** @type {__VLS_StyleScopedClasses['chip-remove']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "palette-divider" },
});
/** @type {__VLS_StyleScopedClasses['palette-divider']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "palette-block" },
});
/** @type {__VLS_StyleScopedClasses['palette-block']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "palette-title" },
});
/** @type {__VLS_StyleScopedClasses['palette-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "color-grid" },
});
/** @type {__VLS_StyleScopedClasses['color-grid']} */ ;
for (const [color] of __VLS_vFor((__VLS_ctx.availableColors))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selectSecondary(color);
                // @ts-ignore
                [availableColors, primaryColor, primaryColor, primaryColor, clearPrimary, selectSecondary,];
            } },
        key: ('secondary-' + color.id),
        ...{ class: ([
                'color-button',
                __VLS_ctx.secondaryColor?.id === color.id ? 'selected' : ''
            ]) },
        ...{ style: ({ backgroundColor: color.hex }) },
        title: (color.name),
    });
    /** @type {__VLS_StyleScopedClasses['color-button']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sr-only" },
    });
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
    (color.name);
    // @ts-ignore
    [secondaryColor,];
}
if (__VLS_ctx.secondaryColor) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "selected-chip" },
    });
    /** @type {__VLS_StyleScopedClasses['selected-chip']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "chip-dot" },
        ...{ style: ({ backgroundColor: __VLS_ctx.secondaryColor.hex }) },
    });
    /** @type {__VLS_StyleScopedClasses['chip-dot']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.secondaryColor.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.clearSecondary) },
        ...{ class: "chip-remove" },
        title: "Quitar",
    });
    /** @type {__VLS_StyleScopedClasses['chip-remove']} */ ;
}
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.transition | typeof __VLS_components.Transition | typeof __VLS_components.transition | typeof __VLS_components.Transition} */
transition;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    name: "fade",
}));
const __VLS_2 = __VLS_1({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.showThirdPalette) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "palette-block third-palette" },
    });
    /** @type {__VLS_StyleScopedClasses['palette-block']} */ ;
    /** @type {__VLS_StyleScopedClasses['third-palette']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "palette-title calico-title" },
    });
    /** @type {__VLS_StyleScopedClasses['palette-title']} */ ;
    /** @type {__VLS_StyleScopedClasses['calico-title']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "color-grid" },
    });
    /** @type {__VLS_StyleScopedClasses['color-grid']} */ ;
    for (const [color] of __VLS_vFor((__VLS_ctx.calicoThirdColors))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.showThirdPalette))
                        return;
                    __VLS_ctx.selectTertiary(color);
                    // @ts-ignore
                    [secondaryColor, secondaryColor, secondaryColor, clearSecondary, showThirdPalette, calicoThirdColors, selectTertiary,];
                } },
            key: ('third-' + color.id),
            ...{ class: ([
                    'color-button',
                    __VLS_ctx.tertiaryColor?.id === color.id ? 'selected' : ''
                ]) },
            ...{ style: ({ backgroundColor: color.hex }) },
            title: (color.name),
        });
        /** @type {__VLS_StyleScopedClasses['color-button']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "sr-only" },
        });
        /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
        (color.name);
        // @ts-ignore
        [tertiaryColor,];
    }
    if (__VLS_ctx.tertiaryColor) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "selected-chip" },
        });
        /** @type {__VLS_StyleScopedClasses['selected-chip']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "chip-dot" },
            ...{ style: ({ backgroundColor: __VLS_ctx.tertiaryColor.hex }) },
        });
        /** @type {__VLS_StyleScopedClasses['chip-dot']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (__VLS_ctx.tertiaryColor.name);
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.clearTertiary) },
            ...{ class: "chip-remove" },
            title: "Quitar",
        });
        /** @type {__VLS_StyleScopedClasses['chip-remove']} */ ;
    }
}
// @ts-ignore
[tertiaryColor, tertiaryColor, tertiaryColor, clearTertiary,];
var __VLS_3;
let __VLS_6;
/** @ts-ignore @type {typeof __VLS_components.transition | typeof __VLS_components.Transition | typeof __VLS_components.transition | typeof __VLS_components.Transition} */
transition;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    name: "fade",
}));
const __VLS_8 = __VLS_7({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
if (!__VLS_ctx.anyColorSelected && !__VLS_ctx.currentBreed) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "show-combo-section" },
    });
    /** @type {__VLS_StyleScopedClasses['show-combo-section']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "combo-hint" },
    });
    /** @type {__VLS_StyleScopedClasses['combo-hint']} */ ;
    if (__VLS_ctx.showSphynx) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.img, __VLS_intrinsics.img)({
            src: (`${__VLS_ctx.apiUrl}/img/GatoCalvo.jpg`),
            alt: "Gato Esfinge",
            ...{ class: "placeholder-cat mx-auto mb-6" },
        });
        /** @type {__VLS_StyleScopedClasses['placeholder-cat']} */ ;
        /** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
    }
    if (!__VLS_ctx.showSphynx) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.scrollToTopPalette) },
            ...{ class: "show-combo-btn" },
        });
        /** @type {__VLS_StyleScopedClasses['show-combo-btn']} */ ;
    }
}
// @ts-ignore
[anyColorSelected, currentBreed, showSphynx, showSphynx, apiUrl, scrollToTopPalette,];
var __VLS_9;
let __VLS_12;
/** @ts-ignore @type {typeof __VLS_components.transition | typeof __VLS_components.Transition | typeof __VLS_components.transition | typeof __VLS_components.Transition} */
transition;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    name: "fade",
}));
const __VLS_14 = __VLS_13({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const { default: __VLS_17 } = __VLS_15.slots;
if (__VLS_ctx.currentBreed) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "breed-info" },
    });
    /** @type {__VLS_StyleScopedClasses['breed-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-xl font-bold text-center mb-4" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    (__VLS_ctx.currentBreed.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (__VLS_ctx.currentBreed.image),
        alt: ('Imagen de gato ' + __VLS_ctx.currentBreed.name),
        ...{ class: "breed-image mx-auto mb-4" },
    });
    /** @type {__VLS_StyleScopedClasses['breed-image']} */ ;
    /** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-gray-700 mb-4 text-center" },
    });
    /** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    (__VLS_ctx.currentBreed.description);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "like-section text-center" },
    });
    /** @type {__VLS_StyleScopedClasses['like-section']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleLike) },
        ...{ class: ({ 'liked': __VLS_ctx.userLiked }) },
        ...{ class: "like-button" },
    });
    /** @type {__VLS_StyleScopedClasses['liked']} */ ;
    /** @type {__VLS_StyleScopedClasses['like-button']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "paw-icon" },
    });
    /** @type {__VLS_StyleScopedClasses['paw-icon']} */ ;
    (__VLS_ctx.breedLikes);
    if (__VLS_ctx.userLiked) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "like-feedback" },
        });
        /** @type {__VLS_StyleScopedClasses['like-feedback']} */ ;
    }
}
// @ts-ignore
[currentBreed, currentBreed, currentBreed, currentBreed, currentBreed, handleLike, userLiked, userLiked, breedLikes,];
var __VLS_15;
let __VLS_18;
/** @ts-ignore @type {typeof __VLS_components.transition | typeof __VLS_components.Transition | typeof __VLS_components.transition | typeof __VLS_components.Transition} */
transition;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    name: "fade",
}));
const __VLS_20 = __VLS_19({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_23 } = __VLS_21.slots;
if (__VLS_ctx.anyColorSelected && !__VLS_ctx.currentBreed && !__VLS_ctx.showThirdPalette) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "no-result" },
    });
    /** @type {__VLS_StyleScopedClasses['no-result']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    if (!__VLS_ctx.requestSent) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "request-container" },
        });
        /** @type {__VLS_StyleScopedClasses['request-container']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "request-text" },
        });
        /** @type {__VLS_StyleScopedClasses['request-text']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "upload-request-box" },
        });
        /** @type {__VLS_StyleScopedClasses['upload-request-box']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            ...{ class: "file-label" },
        });
        /** @type {__VLS_StyleScopedClasses['file-label']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input, __VLS_intrinsics.input)({
            ...{ onChange: (__VLS_ctx.handleRequestFileChange) },
            type: "file",
            accept: "image/*",
            ...{ class: "hidden-input" },
        });
        /** @type {__VLS_StyleScopedClasses['hidden-input']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "upload-icon" },
        });
        /** @type {__VLS_StyleScopedClasses['upload-icon']} */ ;
        (__VLS_ctx.requestFile ? __VLS_ctx.requestFile.name : 'Subir foto del gato');
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.requestNewCat) },
            disabled: (__VLS_ctx.isUploading),
            ...{ class: "request-cat-btn" },
        });
        /** @type {__VLS_StyleScopedClasses['request-cat-btn']} */ ;
        (__VLS_ctx.isUploading ? 'Subiendo...' : 'Solicitar agregar este gato');
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "request-feedback" },
        });
        /** @type {__VLS_StyleScopedClasses['request-feedback']} */ ;
    }
}
// @ts-ignore
[showThirdPalette, anyColorSelected, currentBreed, requestSent, handleRequestFileChange, requestFile, requestFile, requestNewCat, isUploading, isUploading,];
var __VLS_21;
if (__VLS_ctx.currentBreed) {
    let __VLS_24;
    /** @ts-ignore @type {typeof __VLS_components.Comments} */
    Comments;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
        breedId: (__VLS_ctx.currentBreed.id.toString()),
        primaryColor: (__VLS_ctx.primaryColor?.id || ''),
        secondaryColor: (__VLS_ctx.secondaryColor?.id || ''),
    }));
    const __VLS_26 = __VLS_25({
        breedId: (__VLS_ctx.currentBreed.id.toString()),
        primaryColor: (__VLS_ctx.primaryColor?.id || ''),
        secondaryColor: (__VLS_ctx.secondaryColor?.id || ''),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
}
if (__VLS_ctx.showLoginToast) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "login-toast" },
    });
    /** @type {__VLS_StyleScopedClasses['login-toast']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
// @ts-ignore
[primaryColor, secondaryColor, currentBreed, currentBreed, showLoginToast,];
const __VLS_export = defineComponent({
    name: 'Combinator',
    components: { Comments },
    emits: ['combination-change'],
    setup(props, { emit }) {
        const { user, isAuthenticated } = useAuth();
        const apiUrl = API_URL;
        const primaryColor = ref(null);
        const secondaryColor = ref(null);
        const tertiaryColor = ref(null);
        const currentBreed = ref(null);
        const userLiked = ref(false);
        const showLoginToast = ref(false);
        const breedLikes = ref(0);
        const requestSent = ref(false);
        const showSphynx = ref(false);
        const requestFile = ref(null);
        const isUploading = ref(false);
        const availableColors = [
            { id: 'white', name: 'Blanco', hex: '#f8f8f8' },
            { id: 'black', name: 'Negro', hex: '#222222' },
            { id: 'orange', name: 'Naranja', hex: '#ff6600' },
            { id: 'brown', name: 'Marrón', hex: '#8b4513' },
            { id: 'gray', name: 'Gris', hex: '#808080' },
            { id: 'cream', name: 'Crema', hex: '#f5deb3' },
        ];
        // The third calico color is whichever of the three calico colors is NOT already chosen
        const calicoThirdColors = computed(() => {
            if (!primaryColor.value || !secondaryColor.value)
                return [];
            const chosen = new Set([primaryColor.value.id, secondaryColor.value.id]);
            return availableColors.filter(c => CALICO_PAIR_COLORS.has(c.id) && !chosen.has(c.id));
        });
        const showThirdPalette = computed(() => {
            if (!primaryColor.value || !secondaryColor.value)
                return false;
            return isCalicoPartialPair(primaryColor.value.id, secondaryColor.value.id);
        });
        const anyColorSelected = computed(() => primaryColor.value !== null || secondaryColor.value !== null);
        const selectPrimary = (color) => {
            primaryColor.value = color;
            tertiaryColor.value = null; // Reset third when primary changes
            updateCombination();
        };
        const selectSecondary = (color) => {
            secondaryColor.value = color;
            tertiaryColor.value = null; // Reset third when secondary changes
            updateCombination();
        };
        const selectTertiary = (color) => {
            tertiaryColor.value = color;
            updateCombination();
        };
        const clearPrimary = () => {
            primaryColor.value = null;
            tertiaryColor.value = null;
            updateCombination();
        };
        const clearSecondary = () => {
            secondaryColor.value = null;
            tertiaryColor.value = null;
            updateCombination();
        };
        const clearTertiary = () => {
            tertiaryColor.value = null;
            updateCombination();
        };
        const updateCombination = () => {
            if (!primaryColor.value || !secondaryColor.value) {
                currentBreed.value = null;
                return;
            }
            const breed = findBreedByColors(primaryColor.value.id, secondaryColor.value.id, tertiaryColor.value?.id);
            currentBreed.value = breed;
            userLiked.value = false;
            if (breed) {
                emit('combination-change', {
                    primary: primaryColor.value.id,
                    secondary: secondaryColor.value.id,
                    ...(tertiaryColor.value ? { tertiary: tertiaryColor.value.id } : {}),
                    breed: breed.id
                });
            }
        };
        const handleLike = async () => {
            if (!isAuthenticated()) {
                showLoginToast.value = true;
                setTimeout(() => { showLoginToast.value = false; }, 2500);
                return;
            }
            if (!currentBreed.value)
                return;
            try {
                const result = await toggleBreedLike(currentBreed.value.id);
                breedLikes.value = result.newCount;
                userLiked.value = result.liked;
            }
            catch (error) {
                console.error('Error al votar:', error);
            }
        };
        const scrollToTopPalette = () => {
            showSphynx.value = true;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        const requestNewCat = async () => {
            isUploading.value = true;
            try {
                let imageUrl = '';
                if (requestFile.value) {
                    imageUrl = await commentService.uploadCommentImage(requestFile.value);
                }
                // Aquí se podría guardar en una base de datos de solicitudes
                console.log('Solicitud de nuevo gato:', {
                    primary: primaryColor.value?.id,
                    secondary: secondaryColor.value?.id,
                    tertiary: tertiaryColor.value?.id,
                    imageUrl: imageUrl
                });
                requestSent.value = true;
                requestFile.value = null;
                setTimeout(() => {
                    requestSent.value = false;
                }, 3000);
            }
            catch (error) {
                console.error('Error al enviar solicitud:', error);
                alert('Hubo un error al subir la imagen. Por favor intenta de nuevo.');
            }
            finally {
                isUploading.value = false;
            }
        };
        const handleRequestFileChange = (event) => {
            const input = event.target;
            if (input.files && input.files.length > 0) {
                requestFile.value = input.files[0];
            }
        };
        watch(currentBreed, async (newBreed) => {
            if (newBreed) {
                const result = await getBreedLikes(newBreed.id);
                breedLikes.value = result.count;
            }
            else {
                breedLikes.value = 0;
            }
        });
        onMounted(async () => {
            if (currentBreed.value) {
                const result = await getBreedLikes(currentBreed.value.id);
                breedLikes.value = result.count;
            }
        });
        return {
            availableColors,
            calicoThirdColors,
            primaryColor,
            secondaryColor,
            tertiaryColor,
            currentBreed,
            userLiked,
            showLoginToast,
            breedLikes,
            showThirdPalette,
            anyColorSelected,
            selectPrimary,
            selectSecondary,
            selectTertiary,
            clearPrimary,
            clearSecondary,
            clearTertiary,
            handleLike,
            isAuthenticated,
            scrollToTopPalette,
            requestNewCat,
            requestSent,
            showSphynx,
            requestFile,
            isUploading,
            handleRequestFileChange,
            apiUrl,
        };
    }
});
