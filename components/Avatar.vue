<template>
  <div
    class="avatar-container"
    @mouseover="rmove = true"
    @mouseout="rmove = false"
  >
    <div class="pic-container">
      <img src="~/static/logo.png" class="avatar" :class="{rmove: rmove}">
    </div>
    <div class="pic-container">
      <img src="~/static/logo.png" class="avatar" :class="{lmove: rmove}">
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Avatar extends Vue {
  rmove: boolean = false;
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

@media screen and (max-width: 1000px) {
  .avatar-container, .avatar {
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
  .avatar-container, .avatar {
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
