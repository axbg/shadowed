<template>
  <div
    class="frame"
    @mouseover="toggleHover(true)"
    @mouseleave="toggleHover(false)"
  >
    <img
      class="picture"
      :class="{outOfFocus: outOfFocus && !hovered}"
      :src="require('~/assets/pictures/' + picture)"
      @click="toggleModal(true)"
    >
    <div class="photo-content" :class="{active: hovered}">
      <p>{{ title }}</p>
    </div>
    <div v-if="modal" class="modal">
      <div class="modal-content" @click="toggleModal(false)">
        <span class="close" @click="toggleModal(false)">&times;</span>
        <img
          :src="require('~/assets/pictures/' + picture)"
          class="full-picture"
          @click="preventDefault($event)"
        >
        <div class="picture-details" @click="preventDefault($event)">
          <p>{{ title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class PictureFrame extends Vue {
  hovered: boolean = false;
  modal: boolean = false;
  frameInfo: string = 'ex';

  @Prop({ type: Boolean, required: true })
  outOfFocus!: boolean;

  @Prop({ type: String, required: true })
  picture!: string;

  get title () {
    return this.picture.split('.')[1]
  }

  toggleHover (state: boolean) {
    const event = state ? 'hovered' : 'unhovered'
    this.$emit(event)
    this.hovered = state
  }

  toggleModal (state: boolean) {
    this.modal = state

    if (state === false) {
      this.toggleHover(false)
    }
  }

  preventDefault (event: any) {
    event.stopPropagation()
  }
}
</script>

<style>
.frame {
  position: relative;
}

.picture {
  margin-top: 8px;
  vertical-align: middle;
  width: 100%;
  cursor: pointer;
  transition: all 1s ease;
}

.outOfFocus {
  filter: opacity(0);
}

.photo-content {
  display: block;
  position: absolute;
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 100%;
  z-index: -2;
  text-align: center;
  filter: opacity(0);
  transition: all .5s ease;
}

.active {
  z-index: 2;
  filter: opacity(1);
  transition: all 2.5s ease;
}

.modal {
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.modal-content {
  background-color: #fefefe;
  text-align: center;
  border: 1px solid #888;
  width: 100%;
  height: 100%;
}

.full-picture {
  max-width: 100%;
  max-height: 80%;
  margin-top: 2%;
  padding: 20px;
}

.picture-details {
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 5%;
}

.close {
  display: none;
  position: fixed;
  right: 5px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

@media screen and (max-width: 1000px) {
  .photo-content {
    display: none;
  }

  .close {
    display: block;
  }
}
</style>
