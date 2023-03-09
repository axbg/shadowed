<template>
  <div class="frame" :class="{ hoveredFrame: hovered }" @mouseover="toggleHover(true)" @mouseleave="toggleHover(false)">
    <div @click="toggleModal(true)">
      <img class="picture hide-img-loading"
        :class="{ outOfFocus: outOfFocus && !hovered, hoveredPicture: hovered, 'show-img-loaded': isLoaded }"
        @load="imgLoaded()" loading="lazy" :src="thumbnail()" />
    </div>
    <div class="photo-content" :class="{ active: hovered }">
      <p>{{ title() }}</p>
    </div>
    <Modal :picture="pictureSource()" :opened="modalOpened" @closeModal="toggleModal(false)">
      <div>
        <p class="detail-container">{{ title() }}</p>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal from '~/components/Modal.vue';

export default {
  props: ['outOfFocus', 'picture', 'hardLink'],
  data() {
    return {
      hovered: false,
      modalOpened: false,
      isLoaded: false
    }
  },
  mounted() {
    if (this.hardLink === this.picture) {
      this.toggleModal(true);
    }
  },
  methods: {
    title() {
      return this.picture.split(".")[1];
    },
    thumbnail() {
      return new URL('/pictures/thumbnails/' + this.picture, import.meta.url);
    },
    pictureSource() {
      return '/pictures/full/' + this.picture;
    },
    imgLoaded() {
      this.isLoaded = true;
    },
    toggleHover(state: boolean) {
      if (this.hovered !== state) {
        const event = state ? 'hovered' : 'unhovered'
        this.$emit(event)
        this.hovered = state
      }
    },
    toggleModal(state: boolean) {
      this.modalOpened = state

      if (state === false) {
        this.toggleHover(false);
        history.pushState({}, "", this.$route.path);
      } else {
        history.pushState({}, "", this.$route.path + '?photo=' + this.picture);
      }
    },
  }
}
</script>

<style scoped>
.frame {
  position: relative;
}

.hoveredFrame {
  z-index: 2;
}

.picture {
  margin-top: 8px;
  vertical-align: middle;
  width: 100%;
  cursor: pointer;
  transition: all 1s ease;
}

.dark-mode .picture {
  filter: opacity(80%) grayscale(100%);
}

.hoveredPicture {
  transform: scale(1.1);
}

.dark-mode .hoveredPicture {
  filter: opacity(80%) grayscale(0%);
}

.hide-img-loading {
  opacity: 0;
}

.show-img-loaded {
  opacity: 1;
}

.outOfFocus {
  filter: opacity(30%) grayscale(100%);
}

.photo-content {
  display: block;
  position: absolute;
  background-color: var(--white-color);
  padding: 20px;
  border: 1px groove var(--black-color);
  width: 100%;
  text-align: center;
  filter: opacity(0);
  transition: all 0.5s ease;
}

.dark-mode .photo-content {
  bottom: 0;
  background-color: var(--black-color);
  border: 1px groove var(--white-color);
}

.active {
  z-index: 2;
  filter: opacity(1);
  transition: all 1.5s ease;
}

.detail-container {
  border-bottom: 1px groove var(--black-color);
  width: 25%;
  padding: 10px;
  margin: 0 auto;
}

.dark-mode .detail-container {
  border-bottom: 1px groove var(--white-color);
}

@media screen and (max-width: 1000px) {
  .photo-content {
    display: none;
  }
}
</style>
