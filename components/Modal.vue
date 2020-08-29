<template>
  <div v-if="opened" class="modal">
    <div class="modal-content" @click="closeModal">
      <span class="close" @click="closeModal">&times;</span>
      <div class="image-container">
        <img src="/loading.gif" class="loading" />
        <v-lazy-image
          :src="require('~/assets/' + picture)"
          class="full-picture"
          @click="preventDefault($event)"
        />
      </div>
      <div class="picture-details" @click="preventDefault($event)">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";

@Component
export default class Modal extends Vue {
  loaded: boolean = false;

  @Prop({ type: Boolean, required: true })
  opened: boolean = false;

  @Prop({ type: String, required: true })
  picture!: string;

  @Watch("opened")
  onPropertyChanged(value: string, oldValue: string) {
    if (value) {
      window.addEventListener("scroll", this.closeModal);
    } else {
      window.removeEventListener("scroll", this.closeModal);
    }
  }

  closeModal() {
    this.$emit("closeModal");
  }

  preventDefault(event: any) {
    event.stopPropagation();
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

.image-container {
  height: 100%;
}

.loading {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}

.full-picture {
  max-width: 100%;
  max-height: 80%;
  padding: 20px;
  position: relative;
  top: 40%;
  transform: translateY(-50%);
}

.v-lazy-image {
  opacity: 0;
  filter: blur(10px);
  transition: all 0.7s ease;
}

.v-lazy-image-loaded {
  opacity: 1;
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
  .close {
    display: block;
  }
}
</style>
