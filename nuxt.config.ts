// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: false,

  modules: [
      '@nuxtjs/color-mode',
      '@vite-pwa/nuxt'
  ],

  app: {
      head: {
          link: [{ rel: 'icon', type: 'image/png', href: '/assets/64.png' }]
      }
  },

  css: [
      '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  pwa: {
      injectRegister: "auto",
      registerType: 'autoUpdate',
      workbox: {
          globPatterns: ['**/*.{js,css}'],
          navigateFallback: null,
          runtimeCaching: [
              {
                  urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.includes("assets"),
                  handler: 'CacheFirst',
                  options: {
                      cacheName: 'assets',
                      expiration: {
                          maxAgeSeconds: 60 * 60 * 24 * 365
                      },
                      cacheableResponse: {
                          statuses: [0, 200, 304]
                      }
                  }
              },
              {
                  urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.includes("thumbnails"),
                  handler: 'CacheFirst',
                  options: {
                      cacheName: 'thumbnails',
                      expiration: {
                          maxAgeSeconds: 60 * 60 * 24 * 365
                      },
                      cacheableResponse: {
                          statuses: [0, 200, 304]
                      }
                  }
              },
              {
                  urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.includes("full"),
                  handler: 'CacheFirst',
                  options: {
                      cacheName: 'full',
                      expiration: {
                          maxEntries: 10,
                          maxAgeSeconds: 60 * 60 * 24 * 365
                      },
                      cacheableResponse: {
                          statuses: [0, 200, 304]
                      }
                  }
              }
          ],
      },
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
                  src: '/assets/64.png',
                  sizes: '64x64',
                  type: 'image/png'
              },
              {
                  src: '/assets/192.png',
                  sizes: '192x192',
                  type: 'image/png'
              },
              {
                  src: '/assets/512.png',
                  sizes: '512x512',
                  type: 'image/png'
              },
              {
                  src: '/assets/512.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'any'
              },
              {
                  src: '/assets/512.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'maskable'
              }
          ]
      },
      registerWebManifestInRouteRules: true,
      devOptions: {
          enabled: true
      }
  },

  compatibilityDate: '2024-12-26'
})