<template>
  <ul class="navbar-nav header-navbar">
    <li
      class="nav-item has-menu menu-initialized"
      :class="[
        item.opened && index === activeIndex ? 'active menu-opened' : ''
      ]"
      v-for="(item, index) in navData"
      :key="index"
      @click="handleClick(index)"
      @mouseleave="hover(0)"
      @mouseenter="hover(index)"
    >
      <a
        v-if="item.subTitle"
        class=" nav-link-toggle nav-link header-nav-link "
        href="javascript:;"
        >{{ item.title }}</a
      >
      <a class="nav-link header-nav-link " href="/" v-else>{{ item.title }}</a>
      <ul
        v-if="item.subTitle"
        :class="[subTitleIndex === index ? 'slideInUp' : 'fadeOut']"
        class=" hb-mobile-state menu hb-header-sub-menu  hb-header-sub-menu--spacer animated"
        :style="[
          { display: subTitleIndex === index ? 'block' : 'none' },
          { minWidth: '140px' },
          { top: '100%' }
        ]"
      >
        <li
          v-for="(v, i) in item.subTitle"
          v-if="v.title !== 'divider'"
          :key="i"
        >
          <a :href="v.path" class="nav-link hb-header-sub-menu-nav-link"
            >{{ v.title }} <span v-if="v.icon" v-html="v.icon"></span
          ></a>
        </li>
        <li v-else class="dropdown-divider"></li>
      </ul>
    </li>
    <li
      class="nav-item has-menu menu-initialized"
      :class="[
        activeLang ? 'active menu-opened' : ''
      ]"
      @click="handleLanguageShow()"
      @mouseleave="hoverLanguageShow(false)"
      @mouseenter="hoverLanguageShow(true)"
    >
      <!-- <a
        class=" nav-link header-nav-link "
        href="javascript:;"
      >{{ currentNetwork }}</a
      >
      <ul
        class=" hb-mobile-state menu hb-header-sub-menu  hb-header-sub-menu--spacer animated"
        :class="[activeLang ? 'slideInUp' : 'fadeOut']"
        :style="[
          { display: activeLang ? 'block' : 'none' },
          { minWidth: '140px' },
          { top: '100%' }
        ]"
      >
        <li
          v-for="(v, i) in network"
          :key="i"
        >
          <a :href="v.path" class="nav-link hb-header-sub-menu-nav-link">{{ v.name }}</a>
        </li>
      </ul> -->
    </li>
  </ul>
</template>

<script>
export default {
  name: 'NavbarItem',
  components: {},
  props: {
    NavBarFlag: Boolean
  },
  computed: {},
  data() {
    return {
      value: this.$store.getters.nightMode,
      activeIndex: 0,
      subTitleIndex: 0,
      activeLang: false,
      navData: [
        {
          title: this.$t('navBar.navigation1')
        },
        {
          title: this.$t('navBar.navigation2'),
          opened: false,
          subTitle: [
            {
              title: this.$t('navBar.navigation2-1'),
              path: '/accounts/25/1'
            },
            // {
            //   title: "divider"
            // },
            {
              title: this.$t('navBar.navigation2-2'),
              path: '/txs/25/1'
            },
            {
              title: this.$t('navBar.navigation2-3'),
              path: '/blocks/25/1'
            },
            {
              title: this.$t('navBar.navigation2-4'),
              path: '/contractsVerified/25/1'
            }
          ]
        },
        {
          title: this.$t('navBar.navigation3'),
          opened: false,
          subTitle: [
            {
              title: this.$t('navBar.navigation3-1'),
              path: '/validators/25/1'
            },
            {
              title: this.$t('navBar.navigation3-2'),
              path: '/validatorset/25/1'
            }
          ]
        },
        {
          title: this.$t('navBar.navigation4'),
          opened: false,
          subTitle: [
            {
              title: this.$t('navBar.navigation4-1'),
              path: '/tokentxns/25/1'
            },
            {
              title: this.$t('navBar.navigation4-2'),
              path: '/tokentxns-nft/25/1'
            },
            {
              title: 'View ARC-1155 token',
              path: '/tokentxns-nft1155/25/1'
            }
          ]
        },
        {
          title: this.$t('navBar.navigation6'),
          opened: false,
          subTitle: [
            {
              title: this.$t('navBar.navigation5-1'),
              path: '/verifyContract'
            },
            // {
            //   title: this.$t('navBar.navigation5-2'),
            //   path: '/nodes'
            // }
          ]
        }
      ],
      currentLang: '',
      language: [
        // {
        //   name: '简体中文',
        //   id: 1
        // },
        {
          name: 'English',
          id: 2
        }
      ],
      currentNetwork: '',
      network: [
        {
          name: 'SHchain Mainnet',
          path: ''
        },
        {
          name: 'SHchain Testnet',
          path: ''
        },
      ]
    };
  },
  watch: {
    NavBarFlag(curVal, oldVal) {
      if (!curVal) {
        this.navData.map((v, i) => {
          v.opened = false;
        });
      }
    }
  },
  created() {
    if (process.env.NETWORK !== 'mainnet') {
      // 如果不是正式网，添加水龙头
      this.navData[this.navData.length - 1].subTitle.push({
        title: this.$t('navBar.navigation6-1'),
        path: '/faucet'
      });
    }
    if (process.env.CHAIN_ID === 512) {
      this.currentNetwork = 'Mainnet'
    } 
    if (process.env.CHAIN_ID === 513) {
      this.currentNetwork = 'Testnet'
    }
    if (process.env.CHAIN_ID === 572845) {
      this.currentNetwork = 'Devnet'
    }
    const language = navigator.language || navigator.userLanguage;
    const lang = 'en' //this.$cookies.get('CultureInfo') || language;
    this.currentLang = lang !== 'zh-CN' ? 'English' : '简体中文'
  },
  methods: {
    handleClick(index) {
      this.activeIndex = index;
      this.navData.map((v, i) => {
        if (i === index) {
          v.opened = !v.opened;
        } else {
          v.opened = false;
        }
      });
      this.subTitleIndex = this.navData[index].opened ? index : '';
    },
    hover(index) {
      this.subTitleIndex = index;
    },
    handleLanguageClick(v) {
      this.currentLang = v.name;
      const lang = v.id === 1 ? 'zh-CN' : 'en';
      if (lang === this.$cookies.get('CultureInfo')) {
        return
      }
      this.$router.go(0);
      this.$cookies.set('CultureInfo', lang);
      this.$i18n.locale = lang;
    },
    handleLanguageShow() {
      this.activeLang = !this.activeLang;
      this.navData.map((v, i) => {
        v.opened = false;
      })
    },
    hoverLanguageShow(flag) {
      this.activeLang = flag;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.brower-header__box {
  position: relative;
  z-index: 999;
  background-color: transparent;
  -webkit-box-shadow: 0 1px 10px rgba(151, 164, 175, 0.1);
  box-shadow: 0 1px 10px rgba(151, 164, 175, 0.1);
  padding: 0.25rem 0;
  .navbar {
    padding: 0.25rem 0;
    padding-top: 0;
    padding-bottom: 0;
  }
}
@media (min-width: 768px) {
  .navbar-expand-md .header-navbar .hb-header-sub-menu {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    width: max-content;
    border-top: none;
    border-bottom-right-radius: 0.35rem;
    border-bottom-left-radius: 0.35rem;
    -webkit-box-shadow: 0 8px 20px rgba(52, 152, 219, 0.075);
    box-shadow: 0 8px 20px rgba(52, 152, 219, 0.075);
    white-space: nowrap;
    left: 1rem;
    top: 80%;
    li:hover {
      background: #eff1f5;
    }
  }
  .navbar-expand-md .header-navbar .hb-header-sub-menu-nav-link {
    padding-right: 0.75rem;
    padding-left: 0.75rem;
  }
  .app-main {
    .navbar-expand-md .header-navbar .hb-header-sub-menu {
      li:hover {
        background: #37415c;
        a {
          color: #fff;
        }
      }
    }
  }
}
</style>
