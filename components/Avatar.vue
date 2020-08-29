<template>
  <div>
    <div
      class="avatar-container"
      @mouseover="hovered = true"
      @mouseout="hovered = false"
      @click="toggleModal(true)"
    >
      <div class="pic-container">
        <img :src="avatar" class="avatar" :class="{ rmove: hovered }">
      </div>
      <div class="pic-container">
        <img :src="logo" class="avatar" :class="{ lmove: hovered }">
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
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Modal from '~/components/Modal.vue'
import ContactRibbon from '~/components/ContactRibbon.vue'

@Component({
  components: {
    Modal,
    ContactRibbon
  }
})
export default class Avatar extends Vue {
  hovered: boolean = false;
  modalOpened: boolean = false;

  @Prop({ type: String, required: true })
  logo!: string;

  @Prop({ type: Number, required: true })
  mobileWidth!: number;

  @Prop({ type: String, required: true })
  avatar!: string;

  clickDebounce: any = null;

  toggleModal (state: boolean) {
    if (state === true && window.innerWidth <= this.mobileWidth) {
      if (this.clickDebounce) {
        window.clearTimeout(this.clickDebounce)
      }

      this.clickDebounce = window.setTimeout(
        () => (this.modalOpened = true),
        1000
      )
    } else {
      this.modalOpened = state
      this.hovered = state
    }
  }

  destroyed () {
    window.clearTimeout(this.clickDebounce)
  }
}
</script>

<style>
.avatar-container {
  position: relative;
  cursor: pointer;
  width: 200px;
  height: 120px;
  margin: 150px auto;
  text-align: center;
}

.pic-container {
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
