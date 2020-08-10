<template>
  <div class="contact-container">
    <a
      href="mailto:bisagalexstefan@gmail.com"
      title="Gmail"
      target="blank"
      class="icon"
    >
      <fa :icon="faGoogle" />
    </a>
    <a
      href="https://www.facebook.com/bisagalex/"
      title="Facebook"
      target="blank"
      class="icon"
    >
      <fa :icon="faFacebook" />
    </a>
    <a
      href="https://encapsulated.dev"
      title="encapsulated"
      target="blank"
      class="icon"
    >
      <v-lazy-image class="small" src="/encapsulated.png" alt="encapsulated" />
    </a>
    <a
      href="https://github.com/axbg"
      title="Github"
      target="blank"
      class="icon"
    >
      <fa :icon="faGithub" />
    </a>
    <a
      href="https://www.linkedin.com/in/alexbisag/"
      title="LinkedIn"
      target="blank"
      class="icon"
    >
      <fa :icon="faLinkedin" />
    </a>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import {
  faFacebook,
  faGoogle,
  faLinkedin,
  faGithub,
  IconDefinition
} from "@fortawesome/free-brands-svg-icons";

@Component
export default class ContactRibbon extends Vue {
  get faFacebook(): IconDefinition {
    return faFacebook;
  }
  get faGoogle(): IconDefinition {
    return faGoogle;
  }
  get faLinkedin(): IconDefinition {
    return faLinkedin;
  }
  get faGithub(): IconDefinition {
    return faGithub;
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

.small {
  height: 35px;
  transform: transition
}

.v-lazy-image {
  opacity: 0;
  transition: all 0.7s ease;
}
.v-lazy-image-loaded {
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
