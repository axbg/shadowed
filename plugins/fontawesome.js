import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faMoon, faSun, faSpinner } from '@fortawesome/free-solid-svg-icons';

library.add(faGoogle, faGithub, faMoon, faSun, faSpinner);

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})