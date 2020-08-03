<template>
    <img class="picture" :src="require('~/assets/pictures/' + picture)" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class PictureFrame extends Vue {
  @Prop({type: String, required: true})
  picture!: string;

  constructor() {
    super();
  }
}
</script>

<style>
.picture {
  margin-top: 8px;
  vertical-align: middle;
  width: 100%;
  cursor: pointer;
}
</style>