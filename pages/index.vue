<template>
  <div>
    <DarkMode @colorMode="updateColorMode" />
    <Avatar logo="left_logo.png" avatar="right_logo.png" :mobile-width="1024" />
    <Gallery :photos-chunk-size="20" />
    <BackToTop />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Gallery from "~/components/Gallery.vue";
import Avatar from "~/components/Avatar.vue";
import BackToTop from "~/components/BackToTop.vue";
import DarkMode from "~/components/DarkMode.vue";

@Component({
  components: {
    Gallery,
    Avatar,
    BackToTop,
    DarkMode,
  },
})
export default class App extends Vue {
  updateColorMode() {
    if (this.$colorMode.value === "dark") {
      this.$colorMode.preference = "light";
    } else if (this.$colorMode.value === "light") {
      this.$colorMode.preference = "dark";
    }
  }
}
</script>

<style>
body {
  transition: background-color 1000ms linear;
  background-color: white;
  color: black;
}

.dark-mode body {
  transition: background-color 1000ms linear;
  background-color: black;
  color: white;
}
</style>