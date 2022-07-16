<template>
  <div
    class="avatar-container"
    @mouseover="toggleHover(true)"
    @mouseleave="toggleHover(false)"
  >
    <div class="pic-container" @click="toggleModal(true)">
      <div class="half">
        <img :src="computedAvatar" class="avatar" :class="{ rmove: hovered }" />
      </div>
      <div class="half">
        <img :src="computedLogo" class="avatar" :class="{ lmove: hovered }" />
      </div>
    </div>
    <Modal
      picture="me.png"
      :opened="modalOpened"
      @closeModal="toggleModal(false)"
    >
      <ContactRibbon />
    </Modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import Modal from "~/components/Modal.vue";
import ContactRibbon from "~/components/ContactRibbon.vue";

@Component({
  components: {
    Modal,
    ContactRibbon,
  },
})
export default class Avatar extends Vue {
  hovered: boolean = false;
  modalOpened: boolean = false;
  clickDebounce: any = null;
  computedLogo: string = "";
  computedAvatar: string = "";

  @Prop({ type: String, required: true })
  logo!: string;

  @Prop({ type: Number, required: true })
  mobileWidth!: number;

  @Prop({ type: String, required: true })
  avatar!: string;

  mounted() {
    this.updateAssets();
  }

  @Watch("$colorMode.value")
  onPropertyChanged() {
    this.updateAssets();
  }

  updateAssets() {
    if (this.$colorMode.value === "dark") {
      this.computedLogo = "dark@" + this.logo;
      this.computedAvatar = "dark@" + this.avatar;
    } else {
      this.computedLogo = this.logo;
      this.computedAvatar = this.avatar;
    }
  }

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
  }

  toggleHover(state: boolean) {
    if (this.hovered !== state) {
      this.hovered = state;
    }
  }

  destroyed() {
    window.clearTimeout(this.clickDebounce);
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
  height: 120px;
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
