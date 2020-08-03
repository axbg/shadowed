<template>
    <div>
        <PictureFrame v-for="(picture, index) in pictures" :key="index" :picture="picture" /> 
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

    constructor() {
        super();
    }
}
</script>