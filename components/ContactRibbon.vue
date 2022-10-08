<template>
  <div class="contact-container lazy-container" :class="{ loaded: loaded }">
    <a
      href="mailto:bisagalexstefan@gmail.com"
      title="Gmail"
      target="_blank"
      class="icon"
    >
      <fa :icon="faGoogle" />
    </a>
    <a
      href="https://encapsulated.dev"
      title="encapsulated"
      target="_blank"
      class="icon"
    >
      <v-lazy-image
        src="/encapsulated.png"
        alt="encapsulated"
        @load="handleLoaded()"
      />
    </a>
    <a
      href="https://github.com/axbg"
      title="Github"
      target="_blank"
      class="icon"
    >
      <fa :icon="faGithub" />
    </a>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

import {
  faFacebookMessenger,
  faGoogle,
  faLinkedin,
  faGithub,
  // eslint-disable-next-line import/named
  IconDefinition
} from '@fortawesome/free-brands-svg-icons'

@Component
export default class ContactRibbon extends Vue {
  loaded: boolean = false;

  get faFacebookMessenger (): IconDefinition {
    return faFacebookMessenger
  }

  get faGoogle (): IconDefinition {
    return faGoogle
  }

  get faLinkedin (): IconDefinition {
    return faLinkedin
  }

  get faGithub (): IconDefinition {
    return faGithub
  }

  handleLoaded () {
    this.loaded = true
  }
}
</script>

<style scoped>
.contact-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 75%;
  max-width: 500px;
  margin: 0 auto;
}

.icon {
  font-size: 30px;
  color: black;
  transition: all 0.5s ease;
}

.lazy-container {
  opacity: 0;
  transition: all 0.7s ease;
}

.loaded {
  opacity: 1;
}

.icon:hover,
.icon:active {
  color: black;
}

.icon:hover {
  transform: translate(0px, -15px);
}
</style>
