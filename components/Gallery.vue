<template>
  <div class="container">
    <PictureColumn :pictures="firstColumn"/>
    <PictureColumn :pictures="secondColumn"/>
    <PictureColumn :pictures="thirdColumn"/>
    <PictureColumn :pictures="fourthColumn"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
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

  constructor() {
    super();
  }

  created() {
    this.splitPictures();
  }

  splitPictures() {
    const pictures = require.context('~/assets/pictures', true, /^.*\.jpg$/);
    const keys = pictures.keys().map(key => key.substr(2));

    const remaining = keys.length % 4;
    const divisibleLength = keys.length - remaining;

    for(let i = 0; i < divisibleLength; i+=4) {
      this.firstColumn.push(keys[i]);
      this.secondColumn.push(keys[i+1]);
      this.thirdColumn.push(keys[i+2]);
      this.fourthColumn.push(keys[i+3]);
    }

    switch(remaining) {
      case 3:
        this.secondColumn.push(keys[divisibleLength + 2]);
      case 2:
        this.thirdColumn.push(keys[divisibleLength + 1]);
      case 1:
        this.fourthColumn.push(keys[divisibleLength]);
        break;
      default:
        break;
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
  padding: 5px;
  align-items: baseline;
}
</style>