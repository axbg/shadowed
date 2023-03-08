<template>
  <div class="dark-mode-container">
    <p class="pointer" @click="triggerMode">
      <font-awesome-icon :icon="icon()" size="2x" />
    </p>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    triggerMode() {
      this.$emit("colorMode");
    },
    icon(): string {
      if (this.$colorMode.value === "dark") {
        return 'sun';
      } else if (this.$colorMode.value === "light") {
        return 'moon';
      } else {
        return 'spinner';
      }
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
  margin-right: 2%;
}

.pointer {
  cursor: pointer;
  user-select: none;
  height: 50px;
}
</style>
