<template>
  <div class="container">
    <PictureColumn :pictures="firstColumn"/> 
    <PictureColumn :pictures="secondColumn" v-if="show2"/>
    <PictureColumn :pictures="thirdColumn" v-if="show1"/>
    <PictureColumn :pictures="fourthColumn" v-if="show2"/>
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
  currentWindowSize!: number;
  show2: boolean = true;
  show1: boolean = true;

  @Prop({type: Number, required: true})
  photosChunkSize!: number;

  constructor() {
    super();
  }

  created() {
    this.initializePictures();
  }

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  }

  initializePictures() {
    const pictures = require.context('~/assets/pictures', true, /^.*\.jpg$/);
    this.picturesTitles = pictures.keys().map(key => key.substr(2));

    this.splitIntoColumns();
  }

  handleScroll() {
    const currentOffset = document.documentElement.scrollTop + window.innerHeight;
    const pageHeight = document.documentElement.offsetHeight;

    if(currentOffset > 0.5 * pageHeight) {
      this.splitIntoColumns();
    }
  }

  splitIntoColumns() {
    const currentSize = this.currentChunk * this.photosChunkSize;
    const remainingPictures = this.picturesTitles.length - currentSize > this.photosChunkSize 
      ? this.photosChunkSize : this.picturesTitles.length - currentSize;

    const remainder = remainingPictures % 4;
    const divisibleLength = currentSize + remainingPictures - remainder;

    this.currentChunk++;

    for(let i = currentSize; i < divisibleLength; i += 4) {
      this.firstColumn.push(this.picturesTitles[i]);
      this.secondColumn.push(this.picturesTitles[i+1]);
      this.thirdColumn.push(this.picturesTitles[i+2]);
      this.fourthColumn.push(this.picturesTitles[i+3]);
    }

    switch(remainder) {
      case 3:
        this.secondColumn.push(this.picturesTitles[divisibleLength + 2]);
      case 2:
        this.thirdColumn.push(this.picturesTitles[divisibleLength + 1]);
      case 1:
        this.fourthColumn.push(this.picturesTitles[divisibleLength]);
        break;
      default:
        break;
    }
  }

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style>
.container {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 5px;
  align-items: baseline;
}
</style>