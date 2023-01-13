<template>
  <header class="browser-header">
    <div class="brower-header__box">
      <div class="container">
        <nav class="navbar navbar-expand-md">
          <div>
            <a class="navbar-brand text-dark font-weight-bolder" href="/">
            <img height="42" src="../../../images/logo3.png" alt="Logo" />
              <!-- <img height="42" :src="logosrc()" alt="Logo" /> -->
               <!-- <img
                height="20"
                :src="logotestsrc()"
                alt="test"
                v-if="showTestLogo"
              /> -->
            </a>
          </div>
          <div>
            <button
              type="button"
              class="hb-hamburger btn navbar-toggler"
              @click="showNavBar"
              aria-label="Toggle navigation"
              aria-expanded="false"
              aria-controls="navBar"
              data-toggle="collapse"
              data-target="#navBar"
            >
              <span class="hb-hamburger__box">
                <span class="hb-hamburger__inner"></span>
              </span>
            </button>
          </div>
          <div style="width: 100%">
            <div id="navBar" class="collapse navbar-collapse">
              <NavbarItem :NavBarFlag="navBarFlag" />
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import NavbarItem from './NavbarItem.vue'

export default {
  components: {
    NavbarItem
  },
  computed: {},
  data() {
    return {
      navBarFlag: false,
      showTestLogo: process.env.NETWORK !== 'mainnet'
    }
  },
  created() {},
  mounted() {},
  methods: {
    showNavBar() {
      this.navBarFlag = !this.navBarFlag
    },
    logosrc() {
      const nightMode = this.$store.getters.nightMode
      // return require(`../../../images/logo${nightMode ? '2' : ''}.svg`)
      return require(`../../../images/logo${nightMode ? '2' : ''}.png`)
    },
    logotestsrc() {
      const filename = this.$t('language') || 'en'
      return require(`../../../images/test-${filename}.svg`)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.brower-header__box {
  position: relative;
  z-index: 999;
  background-color: transparent;
  -webkit-box-shadow: 0 1px 10px rgba(151, 164, 175, 0.1);
  box-shadow: 0 1px 10px rgba(151, 164, 175, 0.1);
  padding: 0.3rem 0;
  .navbar {
    padding: 0.3rem 0;
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
