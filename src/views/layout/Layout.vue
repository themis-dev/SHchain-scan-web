<template>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
</template>

<script>
import { Navbar, AppMain } from './components'

export default {
  name: 'layout',
  components: {
    Navbar,
    AppMain
  },
  computed: {
  },
  created() {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
