<template>
  <div>
    <VitePwaManifest />
    <NuxtPage />
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

* {
  box-sizing: border-box;
  margin: 0;
  -webkit-tap-highlight-color: transparent;
}

::-webkit-scrollbar {
  width: 0px;
}
</style>
