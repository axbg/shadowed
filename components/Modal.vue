<template>
  <div v-if="opened" class="modal">
    <div class="modal-content" @click="closeModal">
      <span class="close" @click="closeModal">&times;</span>
      <v-lazy-image
        :src="require('~/assets/pictures/' + picture)"
        src-placeholder="/loading.gif"
        class="full-picture"
        @click="preventDefault($event)" />
      <div class="picture-details" @click="preventDefault($event)">
        <p>{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Modal extends Vue {
  @Prop({ type: Boolean, required: true })
  opened: boolean = false;

  @Prop({ type: String, required: true })
  picture!: string;

  @Prop({ type: String, required: true })
  content!: string;

  closeModal () {
    this.$emit('closeModal')
  }

  preventDefault (event: any) {
    event.stopPropagation()
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.modal-content {
  background-color: #fefefe;
  text-align: center;
  border: 1px solid #888;
  width: 100%;
  height: 100%;
}

.full-picture {
  max-width: 100%;
  max-height: 80%;
  padding: 20px;
}

.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}

.picture-details {
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 5%;
}

.close {
  display: none;
  position: fixed;
  right: 5px;
  color: #aaa;
  font-size: 25px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

@media screen and (max-width: 1000px) {
  .full-picture {
    margin-top: 5%;
  }
  
  .close {
    display: block;
  }
}
</style>
