<template>
    <img :src="require('~/assets/pictures/' + picture)" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class PictureFrame extends Vue {
  @Prop({type: String, required: true})
  picture!: string;

  constructor() {
    super();

    console.log(this.picture);
  }
}
</script>