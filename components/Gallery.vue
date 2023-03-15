<template>
  <div class="container">
    <PictureColumn :pictures="firstColumn" :out-of-focus="outOfFocus" :hardLink="hardLink"
      @hovered="triggerGrayscale(true)" @unhovered="triggerGrayscale(false)" />
    <PictureColumn :pictures="secondColumn" :out-of-focus="outOfFocus" :hardLink="hardLink"
      @hovered="triggerGrayscale(true)" @unhovered="triggerGrayscale(false)" />
    <PictureColumn :pictures="thirdColumn" :out-of-focus="outOfFocus" :hardLink="hardLink"
      @hovered="triggerGrayscale(true)" @unhovered="triggerGrayscale(false)" />
    <PictureColumn :pictures="fourthColumn" :out-of-focus="outOfFocus" :hardLink="hardLink"
      @hovered="triggerGrayscale(true)" @unhovered="triggerGrayscale(false)" />
  </div>
</template>

<script lang="ts">
import PictureColumn from '~/components/PictureColumn.vue'
import { filename } from 'pathe/utils';

export default {
  props: ['photosChunkSize'],
  data() {
    return {
      firstColumn: [] as string[],
      secondColumn: [] as string[],
      thirdColumn: [] as string[],
      fourthColumn: [] as string[],
      picturesTitles: [] as any[],
      currentChunk: 0,
      outOfFocus: false,
      hardLink: "" as any
    }
  },
  created() {
    this.initializePictures();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.computeHardLink()
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    computeHardLink() {
      return this.$route.query.photo;
    },
    shuffle(a: any[]) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
      }
      return a
    },
    computePictureResources() {
      const imagesResource = import.meta.glob('~/assets/pictures.json', { eager: true });
      const images: any = Object.entries(imagesResource).map(([key, value]) => ({ 'name': filename(key), 'content': value.default }))
      return images[0]['content'];
    },
    initializePictures() {
      let pictures = this.shuffle(this.computePictureResources());

      this.hardLink = this.computeHardLink();
      if (this.hardLink) {
        pictures = this.swapHardLinkedPicture(pictures, decodeURIComponent(this.hardLink));
      }

      this.picturesTitles = pictures;
      this.splitIntoColumns();
    },
    swapHardLinkedPicture(pictures: any[], picture: string) {
      const hardPicture = pictures.indexOf(picture);
      pictures[hardPicture] = pictures[0];
      pictures[0] = picture;
      return pictures;
    },
    handleScroll() {
      const currentOffset = document.documentElement.scrollTop + window.innerHeight
      const pageHeight = document.documentElement.offsetHeight

      if (currentOffset > 0.5 * pageHeight) {
        this.splitIntoColumns()
      }
    },
    triggerGrayscale(state: boolean) {
      if (state) {
        this.outOfFocus = true
      } else {
        this.outOfFocus = false
      }
    },
    splitIntoColumns() {
      const currentSize = this.currentChunk * this.photosChunkSize
      const remainingPictures =
        this.picturesTitles.length - currentSize > this.photosChunkSize
          ? this.photosChunkSize
          : this.picturesTitles.length - currentSize

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
  }
}
</script>

<style>
.container {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 0px 35px 100px;
  align-items: baseline;
}

@media screen and (max-width: 1000px) {
  .container {
    padding: 0px 10px 100px;
  }
}
</style>
