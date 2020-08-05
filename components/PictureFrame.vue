<template>
  <div
    class="frame"
    @mouseover="toggleHover(true)"
    @mouseleave="toggleHover(false)">
    <img
      class="picture"
      :class="{grayscaled: grayscaled && !hovered}"
      :src="require('~/assets/pictures/' + picture)"
      @click="toggleModal(true)"
    >
    <div class="photo-content" :class="{active: hovered}">
      <p>{{frameInfo}}</p>
    </div>
    <div class="modal" v-if="modal">
      <div class="modal-content">
        <span class="close" @click="toggleModal(false)">&times;</span>
        <img :src="require('~/assets/pictures/' + picture)" class="full-picture">
        <p>{{frameInfo}}</p>
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
  frameInfo: string = "some exifs";

  @Prop({ type: Boolean, required: true })
  grayscaled!: boolean;

  @Prop({ type: String, required: true })
  picture!: string;

  toggleHover(state: boolean) {
    const event = state ? 'hovered' : 'unhovered';
    this.$emit(event);
    this.hovered = state;
  }
  
  toggleModal(state: boolean) {
    this.modal = state;

    if(state == false) {
      this.toggleHover(state);
    }
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

.grayscaled {
  filter: opacity(0);
}

.photo-content {
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
  transition: all 3s ease;
}

.modal {
  position: fixed; 
  z-index: 3; 
  left: 0;
  top: 0;
  width: 100%;
  height: 100%; 
  overflow: auto;
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 
}

.modal-content {
  background-color: #fefefe;
  text-align: center;
  padding: 10px;
  border: 1px solid #888;
  width: 100%;
  height: 100%;
}

.full-picture {
  max-width: 100%;
  max-height: 80%;
  margin-top: 2%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
