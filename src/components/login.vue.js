/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/props-fallback.d.ts" />
/// <reference types="C:/Users/estre/Desktop/proyectos_personales/catViewer/catViewerFront/node_modules/@vue/language-core/types/vue-3.4-shims.d.ts" />
import { useAuth } from '@/services/authService';
import { ref } from 'vue';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'vue-router';
const { login, signUp, user, isAuthenticated } = useAuth();
const email = ref('');
const password = ref('');
const name = ref('');
const errorMessage = ref('');
const isRegister = ref(false);
const showReset = ref(false);
const resetEmail = ref('');
const resetMessage = ref('');
const router = useRouter();
const infoMessage = ref('');
const handleLogin = async () => {
    errorMessage.value = '';
    const { success, error } = await login(email.value, password.value);
    if (!success) {
        if (error?.toLowerCase().includes('invalid login credentials')) {
            errorMessage.value = 'Correo o contraseña incorrectos.';
        }
        else if (error?.toLowerCase().includes('user not found')) {
            errorMessage.value = 'El correo no está registrado.';
        }
        else {
            errorMessage.value = error || 'Error desconocido';
        }
    }
    else {
        router.push('/');
    }
};
const handleRegister = async () => {
    const { success, error } = await signUp(name.value, email.value, password.value);
    if (!success) {
        errorMessage.value = error || 'Error desconocido';
    }
    else {
        errorMessage.value = 'Registro exitoso. Revisa tu correo.';
        isRegister.value = false;
        name.value = '';
        email.value = '';
        password.value = '';
    }
};
const handleResetPassword = async () => {
    resetMessage.value = '';
    if (!resetEmail.value) {
        resetMessage.value = 'Por favor ingresa tu correo.';
        return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.value, {
        redirectTo: 'http://localhost:5173/reset-password'
    });
    if (!error) {
        resetMessage.value = 'Si el correo está registrado, recibirás instrucciones para restablecer tu contraseña.';
    }
    else {
        resetMessage.value = error.message || 'No se pudo enviar el correo de recuperación.';
    }
};
// Helper para mostrar el nombre del usuario
function getUserName() {
    return user.value?.user_metadata?.name || user.value?.email || '';
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (!__VLS_ctx.isAuthenticated()) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "max-w-sm mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 items-center border-2 border-yellow-200 relative" },
    });
    /** @type {__VLS_StyleScopedClasses['max-w-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-yellow-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['relative']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "absolute -top-10 left-1/2 -translate-x-1/2" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['-top-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['left-1/2']} */ ;
    /** @type {__VLS_StyleScopedClasses['-translate-x-1/2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-6xl" },
    });
    /** @type {__VLS_StyleScopedClasses['text-6xl']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "text-2xl font-bold text-yellow-700 mb-2 mt-6" },
    });
    /** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-yellow-700']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
    if (!__VLS_ctx.showReset) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            type: "email",
            placeholder: "Email",
            ...{ class: "w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300" },
        });
        (__VLS_ctx.email);
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus:ring-yellow-300']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            type: "password",
            placeholder: "Contraseña",
            ...{ class: "w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300" },
        });
        (__VLS_ctx.password);
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus:ring-yellow-300']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.handleLogin) },
            ...{ class: "w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition" },
        });
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-yellow-400']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:bg-yellow-500']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(!__VLS_ctx.isAuthenticated()))
                        return;
                    if (!(!__VLS_ctx.showReset))
                        return;
                    __VLS_ctx.showReset = true;
                    // @ts-ignore
                    [isAuthenticated, showReset, showReset, email, password, handleLogin,];
                } },
            ...{ class: "text-xs text-yellow-600 hover:underline mt-1" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-yellow-600']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
        let __VLS_0;
        /** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
        routerLink;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            to: "/resend-verification",
            ...{ class: "text-xs text-yellow-600 hover:underline mt-1" },
        }));
        const __VLS_2 = __VLS_1({
            to: "/resend-verification",
            ...{ class: "text-xs text-yellow-600 hover:underline mt-1" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-yellow-600']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
        const { default: __VLS_5 } = __VLS_3.slots;
        // @ts-ignore
        [];
        var __VLS_3;
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-sm mt-2" },
        });
        /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
        let __VLS_6;
        /** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
        routerLink;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
            to: "/register",
            ...{ class: "text-yellow-600 hover:underline" },
        }));
        const __VLS_8 = __VLS_7({
            to: "/register",
            ...{ class: "text-yellow-600 hover:underline" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        /** @type {__VLS_StyleScopedClasses['text-yellow-600']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
        const { default: __VLS_11 } = __VLS_9.slots;
        // @ts-ignore
        [];
        var __VLS_9;
        if (__VLS_ctx.errorMessage) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "error text-red-500 mt-2" },
            });
            /** @type {__VLS_StyleScopedClasses['error']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
            /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
            (__VLS_ctx.errorMessage);
        }
        if (__VLS_ctx.infoMessage) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "text-green-600 mt-2" },
            });
            /** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
            /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
            (__VLS_ctx.infoMessage);
        }
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
            type: "email",
            placeholder: "Tu correo electrónico",
            ...{ class: "w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300" },
        });
        (__VLS_ctx.resetEmail);
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['focus:ring-yellow-300']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.handleResetPassword) },
            ...{ class: "w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition" },
        });
        /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-yellow-400']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:bg-yellow-500']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(!__VLS_ctx.isAuthenticated()))
                        return;
                    if (!!(!__VLS_ctx.showReset))
                        return;
                    __VLS_ctx.showReset = false;
                    // @ts-ignore
                    [showReset, errorMessage, errorMessage, infoMessage, infoMessage, resetEmail, handleResetPassword,];
                } },
            ...{ class: "text-xs text-yellow-600 hover:underlinse mt-1" },
        });
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-yellow-600']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:underlinse']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
        if (__VLS_ctx.resetMessage) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "text-yellow-700 mt-2" },
            });
            /** @type {__VLS_StyleScopedClasses['text-yellow-700']} */ ;
            /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
            (__VLS_ctx.resetMessage);
        }
    }
}
// @ts-ignore
[resetMessage, resetMessage,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
