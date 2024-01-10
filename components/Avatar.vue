<template>
  <div class="avatar-container" @mouseover="toggleHover(true)" @mouseleave="toggleHover(false)">
    <div class="pic-container" @click="toggleModal(true)">
      <div class="half">
        <img :src="computedAvatar" class="avatar" :class="{ rmove: hovered }" />
      </div>
      <div class="half">
        <img :src="computedLogo" class="avatar" :class="{ lmove: hovered }" />
      </div>
    </div>
    <Modal :picture="computedProfile" :opened="modalOpened" :allowCopy="false" @closeModal="toggleModal(false)">
      <ContactRibbon />
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal from "~/components/Modal.vue";
import ContactRibbon from "~/components/ContactRibbon.vue";

export default {
  props: ['logo', 'mobileWidth', 'avatar', 'profile'],
  data() {
    return {
      hovered: false,
      modalOpened: false,
      clickDebounce: 0,
      computedLogo: "",
      computedAvatar: "",
      computedProfile: ""
    }
  },
  mounted() {
    this.updateAssets();
  },
  unmounted() {
    window.clearTimeout(this.clickDebounce);
  },
  watch: {
    '$colorMode.value': function () {
      this.updateAssets();
    }
  },
  methods: {
    updateAssets() {
      if (this.$colorMode.value === "dark") {
        this.computedLogo = "/assets/dark@" + this.logo;
        this.computedAvatar = "/assets/dark@" + this.avatar;
        this.computedProfile = "/assets/dark@" + this.profile;
      } else {
        this.computedLogo = "/assets/" + this.logo;
        this.computedAvatar = "/assets/" + this.avatar;
        this.computedProfile = "/assets/" + this.profile;
      }
    },
    toggleModal(state: boolean) {
      if (state === true && window.innerWidth <= this.mobileWidth) {
        if (this.clickDebounce) {
          window.clearTimeout(this.clickDebounce);
        }

        this.clickDebounce = window.setTimeout(
          () => (this.modalOpened = true),
          1000
        );
      } else {
        this.modalOpened = this.hovered = state;
      }
    },
    toggleHover(state: boolean) {
      if (this.hovered !== state) {
        this.hovered = state;
      }
    }
  }
}
</script>

<style scoped>
.avatar-container {
  position: relative;
  width: 200px;
  height: 120px;
  margin: 150px auto;
  text-align: center;
}

.pic-container {
  cursor: pointer;
}

.half {
  position: absolute;
  width: 100%;
}

.avatar {
  height: 140px;
  border-radius: 50%;
  transition: all 1s ease;
}

.rmove {
  transform: translate(56px);
}

.lmove {
  transform: translate(-56px);
}

.bits {
  transform: opacity(0);
  transition: all 0.5s ease;
}

.active {
  transform: opacity(1);
}

@media screen and (max-width: 1000px) {

  .avatar-container,
  .avatar {
    height: 110px;
  }

  .avatar-container {
    margin: 120px auto;
  }

  .rmove {
    transform: translate(51px);
  }

  .lmove {
    transform: translate(-51px);
  }
}

@media screen and (max-width: 500px) {

  .avatar-container,
  .avatar {
    height: 80px;
  }

  .avatar-container {
    margin: 80px auto;
  }

  .rmove {
    transform: translate(37px);
  }

  .lmove {
    transform: translate(-37px);
  }
}
</style>
