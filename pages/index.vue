<template>
  <div>
    <DarkMode @colorMode="updateColorMode" />
    <Avatar logo="left_logo.png" avatar="right_logo.png" profile="me.png" :mobile-width="1024" />
    <Gallery :photos-chunk-size="20" />
    <BackToTop />
  </div>
</template>

<script lang="ts">
import Gallery from "~/components/Gallery.vue";
import Avatar from "~/components/Avatar.vue";
import BackToTop from "~/components/BackToTop.vue";
import DarkMode from "~/components/DarkMode.vue";

export default {
  mounted() {
    const body = document.body;
    let timer: any;

    window.addEventListener('scroll', function () {
      clearTimeout(timer);

      if (!body.classList.contains('disable-hover')) {
        body.classList.add('disable-hover')
      }

      timer = setTimeout(function () {
        body.classList.remove('disable-hover')
      }, 250);

    }, false);
  },
  methods: {
    updateColorMode() {
      if (this.$colorMode.value === "dark") {
        this.$colorMode.preference = "light";
      } else if (this.$colorMode.value === "light") {
        this.$colorMode.preference = "dark";
      }
    }
  }
}
</script>

<style>
:root {
  --white-color: #EDEDED;
  --black-color: #121212;
  --border-color: #888;
}

body {
  transition: background-color 1000ms linear;
  background-color: var(--white-color);
  color: var(--black-color);
}

.disable-hover {
  pointer-events: none;
}

.dark-mode body {
  transition: background-color 1000ms linear;
  background-color: var(--black-color);
  color: var(--white-color);
}
</style>