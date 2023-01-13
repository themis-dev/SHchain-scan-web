<template>
  <div class="bg">
    <MainNavBar/>
    <div class="container d-lg-flex align-items-lg-center min-height-550 space-1">
      <div class="w-lg-60 w-xl-50">
        <div class="mb-5">
          <h1 class="text-primary font-weight-normal">{{$t('status.404')}}</h1>
          <p class="mb-0">{{$t('status.404Tip')}}</p>
        </div>
        <a class="btn btn-primary btn-wide transition-3d-hover" href="/">{{$t('status.back')}}</a>
      </div>
    </div>
  </div>

</template>

<script>
  import { MainNavBar } from './layout/components'

  export default {
    name: 'page404',
    components: {
      MainNavBar
    },
    data() {
      return {
      }
    },
    computed: {
      message() {
        return ''
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bg{
  background-image: url(../images/error-404.svg);
  background-size: auto 50%;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: calc(100vh - 50px)
}
  .app-main{
    .bg{
      background-image: url(../images/error-404-dark.svg);
    }
  }
</style>
