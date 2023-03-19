// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    modules: [
        '@nuxtjs/color-mode',
        '@kevinmarrec/nuxt-pwa'
    ],
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],
    pwa: {
        manifest: {
            name: 'shadowed',
            short_name: 'shadowed',
            description: 'lights & shadow',
            theme_color: 'black',
            background_color: 'black',
            orientation: 'portrait',
            lang: 'en'
        },
        meta: {
            title: 'shadowed'
        }
      }
})
