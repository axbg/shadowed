<template>
  <div class="dark-mode-container">
    <p class="pointer" @click="triggerMode">
      <fa :icon="icon" size="2x" shake />
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

import {
  faMoon,
  faSun,
  faSpinner,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

@Component
export default class DarkMode extends Vue {
  triggerMode() {
    this.$emit("colorMode");
  }

  get icon(): IconDefinition {
    if (this.$colorMode.value === "dark") {
      return faSun;
    } else if (this.$colorMode.value === "light") {
      return faMoon;
    } else {
      return faSpinner;
    }
  }
}
</script>

<style>
.dark-mode-container {
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
}

.pointer {
  cursor: pointer;
  user-select: none;
  height: 50px;
}
</style>
