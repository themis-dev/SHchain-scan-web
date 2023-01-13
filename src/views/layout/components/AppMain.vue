<template>
  <div style="margin-bottom: 7rem">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>
  export default {
    name: 'AppMain',
    components: {
    },
    computed: {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
