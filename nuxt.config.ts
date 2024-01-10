// https://nuxt.com/docs/api/configuration/nuxt-config
import { VitePWA } from 'vite-plugin-pwa'

export default defineNuxtConfig({
    ssr: false,
    modules: [
        '@nuxtjs/color-mode',
        '@vite-pwa/nuxt'
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
        }
    },
    vite: {
        plugins: [
            VitePWA({ registerType: 'autoUpdate' })
        ]
    }
})
