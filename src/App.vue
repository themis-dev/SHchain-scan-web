<template>
  <div id="app" :class="this.$store.getters.nightMode ? 'app-main': ''">
    <div class="content">
      <router-view></router-view>
    </div>
    <DefaultFooter/>
  </div>
</template>

<script>
  import { default as DefaultFooter } from './views/layout/components/Footer.vue'
  export default {
    name: 'App',
    components: {
      DefaultFooter
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  #app{
    height: 100%;
  }
  .app-main{
    .content{
      background-color: #252525!important;
    }
    .brower-header__box{
      background-color: #252525!important;
    }
  }
  .content{
    height: auto!important;
    margin: 0 auto -99px;
    min-height: 100%;
    background-color: #f8f9fa;
    padding-bottom: 2rem;
  }
</style>
