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
        injectRegister: "auto",
        registerType: 'autoUpdate',
        manifest: {
            name: 'shadowed',
            short_name: 'shadowed',
            description: 'lights & shadows',
            theme_color: 'black',
            background_color: 'black',
            orientation: 'portrait',
            lang: 'en',
            icons: [
                {
                    src: '192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: '512.png',
                    sizes: '512x512',
                    type: 'image/png'
                },
                {
                    src: '512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any'
                },
                {
                    src: '512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable'
                }
            ]
        },
        workbox: {
            runtimeCaching: [
                {
                    urlPattern: "/",
                    handler: 'NetworkFirst',
                },
            ]
        },
        registerWebManifestInRouteRules: true,
        devOptions: {
            enabled: true
        }
    }
})
