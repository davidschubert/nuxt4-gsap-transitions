// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: false },

    app: {
        head: {
            htmlAttrs: {
                lang: "de",
            },
            title: "GSAP Transitions Demo",
            meta: [
                {
                    name: "description",
                    content:
                        "Nuxt 4 mit professionellen GSAP Animationen - Page Transitions, Loading Screens und On-Page Animationen",
                },
            ],
        },
    },
});
