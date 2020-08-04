<template>
  <img
    class="picture"
    :class="{grayscaled: grayscaled && !hovered}"
    :src="require('~/assets/pictures/' + picture)"
    @mouseover="hover"
    @mouseleave="unhover"
  >
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class PictureFrame extends Vue {
  hovered: boolean = false;

  @Prop({ type: Boolean, required: true })
  grayscaled: boolean = false;

  @Prop({ type: String, required: true })
  picture!: string;

  hover () {
    this.hovered = true
    this.$emit('hovered')
  }

  unhover () {
    this.hovered = false
    this.$emit('unhovered')
  }
}
</script>

<style>
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
</style>
