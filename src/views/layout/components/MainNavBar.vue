<template>
  <header class="browser-header">
    <div class="brower-header__box head1">
      <div class="container">
        <nav class="navbar navbar-expand-md header-navbar">
          <div>
            <a
              class="navbar-brand text-dark font-weight-bolder"
              href="/"
              aria-label="DBOXScan"
            >
              <img height="42" src="../../../images/logo3.png" alt="Logo" />
              <!-- <img
                height="20"
                :src="logotestsrc()"
                alt="test"
                v-if="showTestLogo"
              /> -->
            </a>
          </div>
          <div>
            <button type="button" class="hb-hamburger btn navbar-toggler" @click="showNavBar" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navBar" data-toggle="collapse" data-target="#navBar">
              <span  class="hb-hamburger__box">
                <span class="hb-hamburger__inner"></span>
              </span>
            </button>
          </div>
          <div class="header-right">
            <div
              id="navBar"
              class="collapse navbar-collapse header-navbar-collapse">
              <NavbarItem :NavBarFlag="navBarFlag" />
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="brower-header__box head2">
      <div class="container">
        <nav class="navbar navbar-expand-md header-navbar">
          <div class="value text-nowrap rounded">
            <span class="text-dark">DBOX: ${{ home.ethPrice || 0 }}</span>
            <span
              :class="
                home.increase > 0
                  ? 'text-success'
                  : home.increase < 0
                  ? 'text-danger'
                  : 'text-secondary'
              "
            >
              ({{ home.increase > 0 ? "+" : ""
              }}{{ formatDecimal(home.increase || 0, 2) || 0 }}%)</span
            >
          </div>

          <div class="header-right">
            <div class="search">
              <div class="input-group input-group-sm">
                <div class="input-group-prepend d-none d-md-block">
                  <select
                    name="f"
                    class="custom-select custom-select-sm  custom-arrow-select input-group-text font-size-base filterby"
                  >
                    <option selected value="0"> {{$t('navBar.allFilters')}}</option>
                    <option value="1">{{$t('navBar.filter1')}}</option>
                    <option value="2">{{$t('navBar.filter2')}}</option>
                    <option value="3">{{$t('navBar.filter3')}}</option>
                    <option value="4">{{$t('navBar.filter4')}}</option>
                  </select>
                </div>
                <div style="width: 72%; position: relative">
                  <input
                    v-model.trim="searchData"
                    @keyup.enter="handleSearchText()"
                    type="text"
                    class="form-control"
                    :placeholder="$t('navBar.searchBy')"
                    aria-describedby="button-header-search"
                    @input="searchFuc"
                  />
                  <ul
                    v-if="Array.isArray(assetSearch) && assetSearch.length > 0"
                    style="position: absolute;top: 40px;left: 0"
                    tabindex="0"
                    class="ui-menu ui-widget ui-widget-content ui-autocomplete ui-front"
                  >
                    <li
                      class="px-2 mt-2 mb-2 ether-search-heading ui-menu-item"
                    >
                      <div
                        class="bg-light py-1 rounded ui-menu-item-wrapper"
                        id="ui-id-34"
                        tabindex="-1"
                      >
                        <span class="h6 font-weight-bold">Tokens</span>
                      </div>
                    </li>
                    <li
                      class="px-2 mb-1 ui-menu-item"
                      @click="goToken(item.address)"
                      v-for="(item, index) in assetSearch"
                      :key="index"
                    >
                      <div
                        class="ether-search media rounded p-2 ui-menu-item-wrapper"
                        id="ui-id-35"
                        tabindex="-1"
                      >
                        <div class="media-body text-truncate">
                          <h6
                            class="d-flex align-items-center text-size-1 mb-0"
                          >
                            <div class="text-truncate mr-2">
                              {{ item.tokenName }} ({{ item.tokenSymbol }})
                            </div>
                            <span class="badge bg-soft-secondary mr-2">{{
                              item.type === 3
                                ? "ARC-20"
                                : item.type === 4
                                ? "ARC-721"
                                : ""
                            }}</span>
                            <!--<i class="fa fa-badge-check text-info ml-auto" style="padding-right: 2px;"></i>-->
                          </h6>
                          <span
                            class="text-secondary text-truncate font-size-1"
                            >{{ item.address }}</span
                          >
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="input-group-append">
                  <button
                    class="btn btn-primary"
                    style="cursor: pointer"
                    @click="handleSearchText"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
<script>
import NavbarItem from './NavbarItem.vue';
import { getSearch } from '@/api/chains';
import { formatDecimal } from '@/utils/index';

export default {
  name: 'MainNavBar',
  components: {
    NavbarItem
  },
  computed: {},
  data() {
    return {
      formatDecimal: formatDecimal,
      searchData: '',
      home: this.$store.getters.home,
      assetSearch: [],
      list: [],
      navBarFlag: false,
      showTestLogo: process.env.NETWORK !== 'mainnet'
    };
  },
  created() {},
  mounted() {
    this.getHome();
  },
  methods: {
    logosrc() {
      const nightMode = this.$store.getters.nightMode;
      // return require(`../../../images/logo${nightMode ? '2' : ''}.svg`);
      return require(`../../../images/logo${nightMode ? '2' : ''}.png`);
    },
    logotestsrc() {
      const filename = this.$t('language') || 'en'
      return require(`../../../images/test-${filename}.svg`)
    },
    getHome() {
      this.$store.dispatch('GetHomeChainOverview').then(res => {
        this.home = res;
      });
      setTimeout(() => {
        // this.getHome();
      }, 5000);
    },
    handleSearchText() {
      if (this.searchData) {
        getSearch(this.searchData).then(res => {
          if (res.status === 1) {
            if (!res.data) {
              this.$router.push({ path: '/404' });
              return;
            }
            const length = this.searchData.length;
            if (length === 42) {
              this.goAddress(this.searchData);
            }
            if (length === 40) {
              this.goAddress('0x' + this.searchData);
            }
            if (length === 66) {
              if (res.data.type === 0) {
                this.goTxDetail(this.searchData);
              }
              if (res.data.type === 1) {
                this.goblock(this.searchData);
              }
            }
            if (
              this.searchData.substring(0, 2) !== '0x' &&
              !isNaN(Number(this.searchData)) &&
              this.searchData
            ) {
              this.goblock(this.searchData);
            }
            if (Array.isArray(res.data) && res.data.length > 0) {
              this.goToken(res.data[0].address);
            }
            if (res.data.seriesId) {
                // this.$router.push({ path: '/nft/' + this.searchData })
                window.location.href = '/nft/' + this.searchData
              }
          } else {
            this.$router.push({ path: '/404' });
          }
        });
      }
    },
    goAddress(address) {
      this.$router.push({ path: '/address/' + address });
      if (this.$route.name === 'address') {
        this.$router.go(0);
      }
    },
    goTxDetail(tx) {
      this.$router.push({ path: '/tx/' + tx });
      if (this.$route.name === 'tx') {
        this.$router.go(0);
      }
    },
    goblock(id) {
      this.$router.push({ path: '/block/' + id });
      if (this.$route.name === 'blockDetail') {
        this.$router.go(0);
      }
    },
    goTx() {
      this.$router.push({ path: '/txs/25/1' });
      if (this.$route.name === 'txs') {
        this.$router.go(0);
      }
    },
    goBlocks() {
      this.$router.push({ path: '/blocks/25/1' });
      if (this.$route.name === 'blocks') {
        this.$router.go(0);
      }
    },
    goToken(address) {
      this.$router.push({ path: '/token/' + address + '/25/1' });
      if (this.$route.name === 'token') {
        this.$router.go(0);
      }
      this.assetSearch = [];
      this.searchData = '';
    },
    searchFuc(e) {
      if (!e.target.value) {
        this.assetSearch = [];
        return;
      }
      const data = e.target.value.trim();
      getSearch(data).then(res => {
        if (res.status === 1) {
          if (!res.data) {
            this.$router.push({ path: '/404' });
            return;
          }
          this.assetSearch = res.data;
        } else {
          this.assetSearch = [];
        }
      });
    },
    showNavBar() {
      this.navBarFlag = !this.navBarFlag;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.head1 {
  z-index: 3;
  background-color: #f8f9fa;
}
.head2 {
  z-index: 2 !important;
  background-color: #fff;
}
.brower-header__box {
  position: relative;
  .navbar {
    padding: 0.25rem 0;
    padding-top: 0;
    padding-bottom: 0;
  }
  .value {
    background-color: #f7fafc;
    font-weight: 500;
    letter-spacing: 0.5px;
    font-size: 0.7rem;
    padding: 0.8rem 0.8rem;
    margin-left: -0.25rem;
    line-height: 1.3;
    display: inline-block;
    margin-top: 12px;
    margin-bottom: 12px;
    border-radius: 88px !important;
  }
  .header-right {
    display: flex;
    width: 100%;
  }
  .search {
    width: 100%;
    margin-top: 0.5rem;
    margin-left: auto;
    margin-bottom: 0.5rem !important;
  }
  @media (min-width: 768px) {
    .search {
      margin-bottom: 0;
    }
  }
  @media (min-width: 992px) {
    .search {
      width: 55% !important;
    }
  }
}
.search {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -ms-flex-align: stretch;
  align-items: stretch;
  width: 100%;
  border-radius: 32px;
  height: 40px;
  background-color: #f7fafc !important;
  padding-left: 8px;
  select {
    max-width: 110px;
    height: 24px;
    line-height: 24px !important;
    border: 1px solid #cbd2da;
    box-sizing: border-box;
    border-radius: 80px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-top: 8px;
  }
  input {
    width: calc(100% - 16px);
    margin-top: 10px;
    margin-left: 0.8rem;
    height: 20px;
    border-radius: 0 !important;
    border: none !important;
    border-left: #cbd2da solid 1px !important;
    padding: 0 1rem !important;
    font-size: 14px;
    background: rgba(0, 0, 0, 0);
    &:focus {
      box-shadow: none;
    }
  }
  @media (max-width: 767.98px) {
    input {
      border-left: none !important;
    }
  }
  .btn {
    position: absolute;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    padding: 0;
    line-height: 24px;
    // background-color: #3f7fff !important;
    // border-color: #3f7fff !important;
     background-color: #1C9DBF !important;
      border-color: #1C9DBF !important;
    font-size: 12px;
    top: 8px;
    right: 8px;
    &:hover {
      // background-color: #5991ff !important;
      // border-color: #5991ff !important;
       background-color: #1C9DBF !important;
        border-color: #1C9DBF !important;
    }
  }
}
.ui-autocomplete {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 1px;
  z-index: 91199;
  width: 100%;
}

.ui-widget.ui-widget-content {
  border: 1px solid #c5c5c5;
}
.ui-widget-content {
  border: 1px solid #ddd;
  background: #fff;
  color: #333;
}
.ui-widget {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
}
.ui-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: block;
  outline: 0;
}
.app-main {
  .ui-autocomplete {
    background-color: #252525 !important;
    border-color: #013558;
  }
  .head1 {
    background-color: #262d40 !important;
  }
  .head2 {
    background-color: #222838 !important;
  }
  .search, .value{
    background-color: #20242E !important;
  }
}
</style>
