<template>
  <div
    class="frame"
    :class="{ hoveredFrame: hovered }"
    @mouseover="toggleHover(true)"
    @mouseleave="toggleHover(false)"
  >
    <div @click="toggleModal(true)">
      <v-lazy-image
        class="picture"
        :class="{ outOfFocus: outOfFocus && !hovered, hoveredPicture: hovered }"
        :src="require('~/assets/thumbnails/' + picture)"
      />
    </div>
    <div class="photo-content" :class="{ active: hovered }">
      <p>{{ title }}</p>
    </div>
    <Modal
      :picture="pictureLocation"
      :opened="modalOpened"
      @closeModal="toggleModal(false)"
    >
      <p>{{ title }}</p>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Modal from '~/components/Modal.vue'

@Component({
  components: {
    Modal
  }
})
export default class PictureFrame extends Vue {
  hovered: boolean = false;
  modalOpened: boolean = false;

  @Prop({ type: Boolean, required: true })
  outOfFocus!: boolean;

  @Prop({ type: String, required: true })
  picture!: string;

  get title () {
    return this.picture.split('.')[1]
  }

  get pictureLocation () {
    return 'pictures/' + this.picture
  }

  toggleHover (state: boolean) {
    if (this.hovered !== state) {
      const event = state ? 'hovered' : 'unhovered'
      this.$emit(event)
      this.hovered = state
    }
  }

  toggleModal (state: boolean) {
    this.modalOpened = state

    if (state === false) {
      this.toggleHover(false)
    }
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

.v-lazy-image {
  opacity: 0;
}
.v-lazy-image-loaded {
  opacity: 1;
}

.outOfFocus {
  filter: opacity(30%) grayscale(100%);
}

.photo-content {
  display: block;
  position: absolute;
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 100%;
  text-align: center;
  filter: opacity(0);
  transition: all 0.5s ease;
}

.dark-mode .photo-content {
  background-color: black;
}

.active {
  z-index: 2;
  filter: opacity(1);
  transition: all 1.5s ease;
}

@media screen and (max-width: 1000px) {
  .photo-content {
    display: none;
  }
}
</style>
