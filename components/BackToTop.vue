<template>
  <div
    class="back-to-top-container"
    @click="backToTop"
  >
    <svg
      aria-hidden="true"
      focusable="false"
      class="chevron"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class BackToTop extends Vue {
  backToTop () {
    window.scrollTo(0, 0)
  }
}
</script>

<style>
.back-to-top-container {
  width: 150px;
  margin: 0 auto;
  text-align: center;
  color: var(--white-color);
  user-select: none;
}

.chevron {
  height: 25px;
  margin-bottom: 5px;
  cursor: pointer;
  color: var(--black-color);
  transition: all 0.5s ease;
}

.dark-mode .chevron {
  color: var(--white-color);
}

.chevron:hover {
  transform: translate(0px, -15px);
}

@media screen and (max-width: 600px) {
  .chevron {
    height: 20px;
  }
}
</style>
