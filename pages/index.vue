<template>
  <div>
    <Avatar logo="/logo.png" avatar="/logo.png" />
    <Gallery :photos-chunk-size="12" />
    <BackToTop />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Gallery from '~/components/Gallery.vue'
import Avatar from '~/components/Avatar.vue'
import BackToTop from '~/components/BackToTop.vue'

@Component({
  components: {
    Gallery,
    Avatar,
    BackToTop
  }
})
export default class App extends Vue {}
</script>
