<template>
  <div v-if="opened" class="modal">
    <div class="modal-content" @click="closeModal">
      <span class="close" @click="closeModal">&times;</span>
      <div class="image-container">
        <img src="/loading.gif" class="loading">
        <img loading="lazy" :src="picture" class="full-picture hide-img-loading" :class="{ 'show-img-loaded': isLoaded }"
          @load="imgLoaded()" @click="preventDefault($event)" v-on:click="copyToClipboard()" />
      </div>
      <div class="picture-details" @click="preventDefault($event)">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as pkg from "vue-toastification"
const { useToast } = pkg

export default {
  props: ['opened', 'picture'],
  data() {
    return {
      isLoaded: false
    }
  },
  watch: {
    opened(oldValue, newValue) {
      if (newValue) {
        window.addEventListener('scroll', this.closeModal)
      } else {
        window.removeEventListener('scroll', this.closeModal)
      }
    }
  },
  methods: {
    closeModal() {
      this.isLoaded = false;
      this.$emit('closeModal')
    },
    preventDefault(event: any) {
      event.stopPropagation()
    },
    imgLoaded() {
      this.isLoaded = true;
    },
    copyToClipboard() {
      const pictureName = this.picture.split("/").pop();
      const path = new URL(this.picture, import.meta.url).host + "/?photo=" + encodeURIComponent(pictureName);
      navigator.clipboard.writeText(path);

      useToast().success("Photo URL copied to clipboard!", {
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: false,
        draggable: false,
        draggablePercent: 0.6,
        showCloseButtonOnHover: true,
        hideProgressBar: true,
        closeButton: false,
        icon: false,
        rtl: false
      });
    }
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
  background-color: var(--white-color);
  text-align: center;
  border: 1px solid var(--border-color);
  width: 100%;
  height: 100%;
}

.dark-mode .modal-content {
  background-color: var(--black-color);
  text-align: center;
  border: 1px solid var(--black-color);
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
  cursor: copy;
  top: 40%;
  transform: translateY(-50%);
}

.hide-img-loading {
  opacity: 0;
  filter: blur(10px);
  transition: all 0.7s ease;
}

.show-img-loaded {
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
  color: var(--black-color);
  font-size: 25px;
  font-weight: bold;
}

.dark-mode .close {
  color: var(--white-color);
}

.close:hover,
.close:focus {
  color: var(--black-color);
  text-decoration: none;
  cursor: pointer;
}

.dark-mode .close:hover,
.close:focus {
  color: var(--white-color);
}

@media screen and (max-width: 1000px) {
  .close {
    display: block;
  }
}
</style>
