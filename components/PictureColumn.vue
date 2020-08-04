<template>
  <div class="column">
    <PictureFrame
      v-for="(picture, index) in pictures"
      :key="index"
      :picture="picture"
      :grayscaled="grayscaled"
      @hovered="catchAndEmit('hovered')"
      @unhovered="catchAndEmit('unhovered')"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import PictureFrame from '~/components/PictureFrame.vue'

@Component({
  components: {
    PictureFrame
  }
})
export default class PictureColumn extends Vue {
    @Prop({ type: Array, required: true })
    pictures!: string[];

    @Prop({ type: Boolean, required: true })
    grayscaled: boolean = false;

    catchAndEmit (event: string) {
      this.$emit(event)
    }
}
</script>

<style>
.column {
  -ms-flex: 25%;
  flex: 25%;
  max-width: 25%;
  padding: 0 4px;
}

@media screen and (max-width: 1000px) {
  .column {
    -ms-flex: 50%;
    flex: 50%;
    max-width: 50%;
  }
}
</style>
