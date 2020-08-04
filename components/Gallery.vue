<template>
  <div class="container">
    <PictureColumn
      :pictures="firstColumn"
      :grayscaled="grayscaled"
      @hovered="triggerGrayscale(true)"
      @unhovered="triggerGrayscale(false)"
    />
    <PictureColumn
      :pictures="secondColumn"
      :grayscaled="grayscaled"
      @hovered="triggerGrayscale(true)"
      @unhovered="triggerGrayscale(false)"
    />
    <PictureColumn
      :pictures="thirdColumn"
      :grayscaled="grayscaled"
      @hovered="triggerGrayscale(true)"
      @unhovered="triggerGrayscale(false)"
    />
    <PictureColumn
      :pictures="fourthColumn"
      :grayscaled="grayscaled"
      @hovered="triggerGrayscale(true)"
      @unhovered="triggerGrayscale(false)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import PictureColumn from '~/components/PictureColumn.vue'

@Component({
  components: {
    PictureColumn
  }
})
export default class Gallery extends Vue {
  firstColumn: string[] = [];
  secondColumn: string[] = [];
  thirdColumn: string[] = [];
  fourthColumn: string[] = [];
  picturesTitles: string[] = [];
  currentChunk: number = 0;
  grayscaled: boolean = false;

  @Prop({ type: Number, required: true })
  photosChunkSize!: number;

  created () {
    this.initializePictures()
  }

  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  }

  initializePictures () {
    const pictures = require.context('~/assets/pictures', true, /^.*\.jpg$/)
    this.picturesTitles = pictures.keys().map(key => key.substr(2))

    this.splitIntoColumns()
  }

  handleScroll () {
    const currentOffset = document.documentElement.scrollTop + window.innerHeight
    const pageHeight = document.documentElement.offsetHeight

    if (currentOffset > 0.5 * pageHeight) {
      this.splitIntoColumns()
    }
  }

  triggerGrayscale (state: boolean) {
    if (state) {
      this.grayscaled = true
    } else {
      this.grayscaled = false
    }
  }

  splitIntoColumns () {
    const currentSize = this.currentChunk * this.photosChunkSize
    const remainingPictures = this.picturesTitles.length - currentSize > this.photosChunkSize
      ? this.photosChunkSize : this.picturesTitles.length - currentSize

    const remainder = remainingPictures % 4
    const divisibleLength = currentSize + remainingPictures - remainder

    this.currentChunk++

    for (let i = currentSize; i < divisibleLength; i += 4) {
      this.firstColumn.push(this.picturesTitles[i])
      this.secondColumn.push(this.picturesTitles[i + 1])
      this.thirdColumn.push(this.picturesTitles[i + 2])
      this.fourthColumn.push(this.picturesTitles[i + 3])
    }

    switch (remainder) {
      case 3:
        this.secondColumn.push(this.picturesTitles[divisibleLength + 2])
      case 2:
        this.thirdColumn.push(this.picturesTitles[divisibleLength + 1])
      case 1:
        this.fourthColumn.push(this.picturesTitles[divisibleLength])
        break
      default:
        break
    }
  }

  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
.container {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 0px 10px 10px 10px;
  align-items: baseline;
}
</style>
