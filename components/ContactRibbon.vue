<template>
  <div class="contact-container lazy-container" :class="{ loaded: loaded }">
    <a href="mailto:bisagalexstefan@gmail.com" title="Gmail" target="_blank" class="icon">
      <font-awesome-icon :icon="faGoogle()" />
    </a>
    <a href="https://encapsulated.dev" title="encapsulated" target="_blank" class="icon">
      <img v-if="$colorMode.value === 'light'" src="/encapsulated.png" alt="encapsulated"
        @load="handleLoaded()" />
      <img v-if="$colorMode.value === 'dark'" src="/encapsulated_dark.png" alt="encapsulated"
        @load="handleLoaded()" />
    </a>
    <a href="https://github.com/axbg" title="Github" target="_blank" class="icon">
      <font-awesome-icon :icon="faGithub()" />
    </a>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      loaded: false,
    }
  },
  methods: {
    handleLoaded() {
      this.loaded = true;
    },
    faGoogle(): string {
      return 'fab fa-google';
    },
    faGithub(): string {
      return 'fab fa-github';
    }
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
  color: var(--black-color);
  transition: all 0.5s ease;
}

.dark-mode .icon {
  color: var(--white-color);
}

.lazy-container {
  opacity: 0;
  transition: all 0.7s ease;
}

.loaded {
  opacity: 1;
}

.icon:hover {
  transform: translate(0px, -15px);
}
</style>
