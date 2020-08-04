<template>
  <div>
    <Avatar />
    <Gallery :photos-chunk-size="12" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Gallery from '~/components/Gallery.vue'
import Avatar from '~/components/Avatar.vue'

@Component({
  components: {
    Gallery,
    Avatar
  }
})
export default class App extends Vue {
}
</script>
