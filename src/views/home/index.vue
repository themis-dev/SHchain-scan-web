<template>
  <div class="homePage ">
    <section class="home">
      <div class="container home-top">
        <div class="row">
          <div class="col-md-12 col-lg-7">
            <h1 class="h4">
              SHchain {{title}} Explorer
            </h1>
            <div style="margin-top:1.75rem">
              <div class="search-box">
                <div
                  style="width:130px"
                  class="input-group-prepend d-none d-md-block"
                >
                  <select class="custom-select custom-arrow-select ">
                    <option selected value="0"> {{$t('navBar.allFilters')}}</option>
                    <option value="1">{{$t('navBar.filter1')}}</option>
                    <option value="2">{{$t('navBar.filter2')}}</option>
                    <option value="3">{{$t('navBar.filter3')}}</option>
                    <option value="4">{{$t('navBar.filter4')}}</option>
                  </select>
                </div>
                <div style="position: relative;flex:1">
                  <input
                    style="border: none;border-radius: 0"
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
                    style="position: absolute;top: 64px;left: 0"
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
                        <span class="h6 font-weight-bold">{{$t('navBar.navigation4')}}</span>
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
                <div style="margin-left: -1px; width: 52px">
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
        </div>
      </div>
    </section>
    <div class="container content">
      <div class="card total-card" style="margin-bottom: 1.25rem">
        <div class="card-body">
          <div class="row mx-gutters-md-1">
            <div class="col-md-6 col-lg-6 card-divider">
              <div class="card-top-item">
                <div class="avatar">
                  <img
                    style="width: 100%"
                    width="42"
                    src="../../images/logo3.png"
                    alt="Logo"
                  />
                </div>
                <div>
                  <h2 class="font-size-1 text-uppercase text-secondary">
                    {{$t('home.content1')}}
                  </h2>
                 <div class="text-size-1 text-link" href="javascript:;"
                        >${{home.ethPrice||0}}
                        <!-- <span class="text-secondary">
                          @ {{ formatDecimal(home.htToBtc || 0, 13) }} {{$t('home.content1-1')}}</span
                        ><span
                          class="small font-weight-medium"
                          :class="
                            home.increase > 0
                              ? 'text-success'
                              : home.increase < 0
                              ? 'text-danger'
                              : 'text-secondary'
                          "
                        >
                          {{ home.increase > 0 ? "+" : ""
                          }}{{
                            formatDecimal(home.increase || 0, 2) || 0
                          }}%</span> -->
                        </div
                      >
                </div>
              </div>
              <hr class="hr-divider" />
              <div class="card-top-item">
                <div class="avatar">
                  <img src="../../images/market.svg" alt="Market Cap" style="width: 100%"/>
                </div>
                <div>
                  <h2 class="font-size-1 text-uppercase text-secondary">
                    {{$t('home.content2')}}
                  </h2>
                  <el-tooltip class="item" effect="dark" placement="bottom">
                    <div slot="content">
                      {{$t('home.content2-1')}}
                    </div>
                    <el-button type="text">
                      <a class="text-size-1 text-link" href="javascript:;"
                        >${{ home.marketCap || 0 }}
                        <span class="small text-secondary text-link"
                          >({{ home.totalNums || 0 }} DBOX)</span
                        ></a
                      ></el-button
                    >
                  </el-tooltip>
                </div>
              </div>
              <hr class="d-md-none hr-divider" />
            </div>
            <div class="col-md-6 col-lg-6">
              <div class="card-top-item">
                <div class="avatar">
                  <img src="../../images/latest.svg" :alt="$t('home.content3')"  style="width: 100%" />
                </div>
                <div style="flex: 1">
                  <h2 class="font-size-1 text-uppercase text-secondary">
                    {{$t('home.content3')}}
                  </h2>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="$t('home.content3-1')"
                    placement="bottom"
                  >
                    <el-button type="text">
                      <a class="text-size-1 text-link" href="/blocks/25/1"
                        ><span>{{ home.latestBlock || 0 }}</span></a
                      >
                    </el-button>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="$t('home.content3-2')"
                    placement="right"
                  >
                    <el-button type="text">
                      <a
                        data-toggle="tooltip"
                        href="javascript:;"
                        class="small text-secondary text-link"
                        >(<span>{{ time / 1000 }}s</span>)</a
                      >
                    </el-button>
                  </el-tooltip>
                </div>
                <div class="text-right">
                  <h2 class="font-size-1 text-uppercase text-secondary">
                    {{$t('home.content4')}}
                  </h2>
                  <el-tooltip class="item" effect="dark" placement="left">
                    <div slot="content">
                      {{$t('home.content4-1')}}
                    </div>
                    <el-button type="text">
                      <a href="/txs/25/1" class="text-size-1 text-link">{{
                        bigNumberTransform(home.txNum || 0)
                      }}</a>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="$t('home.content4-2')"
                    placement="bottom"
                  >
                    <el-button type="text">
                      <span class="text-secondary small">
                        ({{ home.tps || 0 }} TPS)</span
                      >
                    </el-button>
                  </el-tooltip>
                </div>
              </div>
              <hr class="hr-divider" />
              <div class="card-top-item">
                <figure class="avatar">
                  <img src="../../images/active.svg" alt="SVG"  style="width: 100%"/>
                </figure>
                <div style="flex: 1">
                  <h2 class="font-size-1 text-uppercase text-secondary">
                    {{$t('home.content5')}}
                  </h2>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="$t('home.content5-1')"
                    placement="bottom"
                  >
                    <el-button type="text">
                      <a
                        class="text-size-1 text-link"
                        href="/validators/25/1"
                        >{{ home.activeMinerNum || 0 }}</a
                      >
                    </el-button>
                  </el-tooltip>
                </div>
              </div>
              <hr class="d-block d-md-none hr-divider" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <div class="card h-100">
            <div class="card-header">
              <h2 class="card-header-title">{{$t('home.blockList')}}</h2>
            </div>
            <div
              class="card-body overflow-hidden"
              style="position: relative;padding-bottom:0;height: 674px; overflow:hidden"
            >
              <div
                style="position: relative;overflow: hidden;height: 100%;max-width: 100%;outline: none;direction: ltr;"
                :class="cardIconClass('block')"
              >
                <div v-show="onLine">
                  <transition-group name="list" tag="div">
                    <div
                      v-for="(item, index) in blockData"
                      v-bind:key="item.number"
                      class="listline"
                    >
                      <div class="row">
                        <div class="col-sm-3">
                          <div class="card-top-item align-items-center">
                            <div class="d-none d-sm-flex mr-2">
                              <span class="btn btn-icon btn-soft-secondary">
                                <span class="btn-icon__inner text-dark"
                                  >Bk</span
                                >
                              </span>
                            </div>
                            <div class="media-body">
                              <span class="d-inline-block d-sm-none"
                                >{{$t('home.block')}}</span
                              >
                              <a :href="'/block/' + item.number">{{
                                item.number
                              }}</a>
                              <span
                                class="d-sm-block small text-secondary ml-1 ml-sm-0"
                                >{{ formatTime(item.blockTime) }}</span
                              >
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-9">
                          <div class="d-flex justify-content-between">
                            <div class="text-nowrap">
                              <el-tooltip
                                class="item"
                                effect="dark"
                                :content="item.miner"
                                placement="top"
                              >
                                <el-button type="text">
                                  <span class="d-block mb-1 mb-sm-0  text-dark font-size-3 font-weight-normal"
                                    >{{$t('home.miner')}}
                                    <a
                                      class="hash-tag text-truncate"
                                      :href="'/address/' + item.miner"
                                      >{{ item.minerName || item.miner }}</a>
                                  </span>
                                </el-button>
                              </el-tooltip>
                              <div>
                                <a :href="'/txs/25/1?block=' + item.number"
                                >{{ item.txs }} {{$t('home.txns')}}
                                </a>
                                <span class="small text-secondary">
                                {{$t('home.in')}} {{ secTime(item, index) }} {{$t('home.secs')}}
                              </span>
                              </div>

                              <span class="d-inline-block d-sm-none">
                                <el-tooltip
                                  class="item"
                                  effect="dark"
                                  :content="item.reward"
                                  placement="top"
                                >
                                  <el-button type="text">
                                    <span
                                      class="u-label u-label--xs u-label--badge-in u-label--secondary text-center"
                                    >
                                      {{item.reward}}
                                      <span class="danwei">DBOX</span>
                                    </span>
                                  </el-button>
                                </el-tooltip>
                              </span>
                            </div>
                            <div class="d-sm-block d-none">
                              <el-tooltip
                                class="item"
                                effect="dark"
                                :content="item.reward"
                                placement="top"
                              >
                                <el-button type="text">
                                  <span
                                    class="u-label u-label--xs u-label--badge-in u-label--secondary text-right htlabel"
                                    >
                                    <span class="htnum">{{item.reward}}</span>
                                    <span class="htname">DBOX</span>
                                    </span>
                                </el-button>
                              </el-tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- <hr class="hr-space" /> -->
                    </div>
                  </transition-group>
                </div>
              </div>
            </div>
            <div class="card-footer" v-if="blockData.length > 0 && onLine">
              <a
                class="btn btn-xs btn-block btn-soft-primary"
                href="/blocks/25/1"
                >{{$t('home.allBlock')}}</a
              >
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card h-100">
            <div class="card-header">
              <h2 class="card-header-title">{{$t('home.latestTxn')}}</h2>
            </div>
            <div
              class="card-body overflow-hidden"
              style="position: relative;padding-bottom:0;min-height: 674px"
            >
              <div
                style="position: relative;overflow: hidden;height: 100%;max-width: 100%;outline: none;direction: ltr;"
                :class="cardIconClass('tx')"
              >
                <div v-show="onLine">
                  <transition-group name="list" tag="div">
                    <div
                      v-for="(item) in txData"
                      v-bind:key="item.txhash"
                      class="listline"
                    >
                      <div class="row">
                        <div class="col-sm-4">
                          <div
                            class="media align-items-sm-center mr-4 mb-1 mb-sm-0"
                          >
                            <div class="d-none d-sm-flex mr-2">
                              <span
                                class="btn btn-icon btn-soft-secondary rounded-circle"
                              >
                                <span class="btn-icon__inner text-dark"
                                  >Tx</span
                                >
                              </span>
                            </div>
                            <div class="media-body">
                              <span class="d-inline-block d-sm-none mr-1"
                                >TX#</span
                              >
                              <span class="hash-tag text-truncate"  v-if="item.from == 'GENESIS'"><a class="hash-tag hash-tag--xs hash-tag-xs-down--md text-truncate">{{item.txhash}}</a></span>
                              <el-tooltip class="item" effect="dark" :content="item.txhash" placement="top" v-else>
                            <el-button type="text" class="font-weight-normal font-size-3" style="padding: 0;color: #3F7FFF;">
                              <a class="hash-tag hash-tag--xs hash-tag-xs-down--md text-truncate" :href="'/tx/'+item.txhash">{{item.txhash}}</a>
                            </el-button>
                          </el-tooltip>
                              <span
                                class="d-none d-sm-block small text-secondary"
                              >
                                {{ formatTime(item.timestamp) }}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-8">
                          <div class="d-sm-flex justify-content-between">
                            <div class="text-nowrap mr-4 mb-1 mb-sm-0">
                              <span
                                >{{$t('home.from')}}
                                <span class="hash-tag text-truncate"  v-if="item.from == 'GENESIS'">{{item.from}}</span>
                                <el-tooltip class="item" effect="dark" v-else :content="item.from" placement="top">
                              <el-button type="text" class="font-weight-normal font-size-3" style="padding: 0;color: #3F7FFF;">
                               <a class="hash-tag text-truncate" :href="'/address/'+item.from">{{item.from}}</a>
                              </el-button>
                            </el-tooltip>
                              </span>
                              <br class="d-sm-none" style="display:block" />
                              <span class="d-sm-block"
                                >{{$t('home.to')}}
                                <el-tooltip class="item" effect="dark" :content="item.to ? item.to : item.contractAddress" placement="top">
                              <el-button type="text" class="font-weight-normal font-size-3" style="padding: 0;color: #3F7FFF;" >
                               <a :href="'/address/'+item.to" class="hash-tag text-truncate" v-if="item.to">{{item.to}}</a>
                               <a  v-else :href="'/address/'+item.contractAddress" class="hash-tag text-truncate">Contract Creation</a>
                              </el-button>
                            </el-tooltip>
                              </span>
                            </div>
                            <div>
                              <el-tooltip
                                class="item"
                                effect="dark"
                                :content="item.value"
                                placement="top"
                              >
                                <el-button type="text">
                                  <span
                                    class="u-label u-label--xs u-label--badge-in u-label--secondary text-center text-truncate htlabel"
                                    >
                                    <span class="htnum">{{item.value}} </span>
                                    <span class="htname">DBOX</span>
                                    </span>
                                </el-button>
                              </el-tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- <hr class="hr-space" /> -->
                    </div>
                  </transition-group>
                </div>
              </div>
            </div>
            <div class="card-footer" v-if="txData.length > 0 && onLine">
              <a class="btn btn-xs btn-block btn-soft-primary" href="/txs/25/1"> {{$t('home.allTxn')}}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getSearch, getNewBlockList, getNewTxList } from '@/api/chains';
  import { formatTime, formatDecimal, bigNumberTransform } from '@/utils/index'

export default {
    name: 'home',
    data() {
      return {
        formatTime: formatTime,
        formatDecimal: formatDecimal,
        bigNumberTransform: bigNumberTransform,
        searchData: '',
        blockData: [],
        txData: [],
        home: this.$store.getters.home,
        time: 0,
        timer: null,
        assetSearch: [],
        onLine: window.navigator.onLine,
        title: process.env.NETWORKTITLE === 'Testnet' ? 'Testnet': process.env.NETWORKTITLE === 'Devnet' ? 'Devnet': ''
      };
    },
    components: {
    },
    computed: {},
    mounted() {
       this.getHome();
      this.getData();
      this.timer = setInterval(() => {
        this.getData();
      }, 5000);
      window.addEventListener('online', this.updateOnlineStatus);
      window.addEventListener('offline', this.updateOnlineStatus);
    },
    methods: {
      updateOnlineStatus(e) {
        const { type } = e;
        this.onLine = type === 'online';
      },
      getHome() {
        this.$store.dispatch('GetHomeChainOverview').then(res => {
          this.home = res;
        });
      },
      getData() {
        this.getBlockListData();
        this.getTxListData();
        // this.getHome();
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
              if (this.searchData.substring(0, 2) !== '0x' && !isNaN(Number(this.searchData)) && this.searchData) {
                this.goblock(this.searchData)
              }
              if (Array.isArray(res.data) && res.data.length > 0) {
                this.goToken(res.data[0].address)
              }
              if (res.data.seriesId) {
                this.$router.push({ path: '/nft/' + this.searchData })
              }
            }
          })
        }
      },
      getBlockListData() {
        getNewBlockList(10).then(res => {
          if (res.status === 1) {
            this.blockData = res.data;
            this.time = res.data && res.data.length > 0 ? (res.data[0].blockTime - res.data[res.data.length - 1].blockTime) / res.data.length : 0;
          }
        });
      },
      getTxListData() {
        getNewTxList(10).then(res => {
          if (res.status === 1) {
            this.txData = res.data;
          }
        });
      },
      goAddress(address) {
        this.$router.push({ path: '/address/' + address })
      },
      goTxDetail(tx) {
        this.$router.push({ path: '/tx/' + tx })
      },
      goblock(id) {
        this.$router.push({ path: '/block/' + id })
      },
      goTx() {
        this.$router.push({ path: '/txs/25/1' })
      },
      goBlocks() {
        this.$router.push({ path: '/blocks/25/1' })
      },
      secTime(item, index) {
        const data = index > 5 ? index : index + 1;
        return (item.blockTime - this.blockData[data].blockTime) / 1000
      },
      goToken(address) {
        this.$router.push({ path: '/token/' + address + '/25/1' });
        this.assetSearch = [];
        this.searchData = ''
      },
      searchFuc(e) {
        if (!e.target.value) {
          this.assetSearch = [];
          return
        }
        const data = e.target.value.trim();
        getSearch(data).then(res => {
          if (res.status === 1) {
            if (!res.data) {
              this.$router.push({ path: '/404' });
              return
            }
            this.assetSearch = res.data;
          } else {
            this.assetSearch = [];
          }
        });
      },

      cardIconClass(type) {
        if (!this.onLine) {
          return 'offLine';
        }
        if (this[`${type}Show`]) {
          return 'loading';
        }
        if (this[`${type}Data`].length === 0) {
          return 'noData';
        }
        return '';
      }
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      window.removeEventListener('online', this.updateOnlineStatus);
      window.removeEventListener('offline', this.updateOnlineStatus);
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.homePage {
  .home-top {
    padding-top: 3.25rem;
    padding-bottom: 4.5rem;
  }
  .h4 {
    color: #1C9DBF;
    font-size: 32px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
  }
  .ui-autocomplete {
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 1px;
    z-index: 91199;
    width: 100%;
  }
  .u-label--badge-in{
      padding-left: .5rem;
      border-top-left-radius: .25rem;
      border-bottom-left-radius: .25rem;
    }
  .card-header-title {
    font-size: 18px;
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
  .left-content {
    .u-label--badge-in {
      line-height: 1.2;
    }
    .danwei {
      width: 40px;
      display: inline-block;
      text-align: left;
    }
    .add {
      position: absolute;
      top: 0.1rem;
      left: 0;
      font-size: 22px;
      z-index: 9999;
    }
  }
  .total-card {
    font-weight: 500;
    .item {
      margin-top: 6px;
    }
  }
  .search-box {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -ms-flex-align: stretch;
    align-items: stretch;
    justify-content: space-between;
    width: 100%;
    border-radius: 80px;
    height: 64px;
    background-color: #fff !important;
    box-shadow: 0 0.5rem 1.2rem rgba(189, 197, 209, 0.2);
    select {
      position: absolute;
      max-width: 110px;
      height: 32px;
      left: 16px;
      top: 16px;
      border: 1px solid #cbd2da;
      box-sizing: border-box;
      border-radius: 80px;
      padding-top: 0;
      padding-bottom: 0;
    }
    option {
      margin-top: 20px;
    }
    input {
      position: absolute;
      height: 100%;
      width: calc(100% - 16px);
      border-radius: 0;
      margin-top: 20px;
      margin-left: 0.8rem;
      height: 24px;
      border-left: #cbd2da solid 1px !important;
      padding: 0 1rem;
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
      border-radius: 50%;
      width: 40px;
      height: 40px;
      padding: 0;
      line-height: 40px;
      // background-color: #3f7fff !important;
      // border-color: #3f7fff !important;
      background-color: #1C9DBF !important;
      border-color: #1C9DBF !important;
      font-size: 20px;
      margin-top: 12px;
      margin-right: 12px;
      &:hover {
        background-color: #1C9DBF !important;
        border-color: #1C9DBF !important;
      }
    }
  }

  .content {
    margin-top: 1.5rem;
    padding-bottom: 2rem;
    background-color: transparent;
    margin-bottom: 3rem;
    .text-uppercase {
      margin-bottom: 0;
    }
  }
  .home {
    background-image: url(../../images/home-banner.png);
    // background-color: #233370;
    // background-image: url(../../images/headright.svg),
    //   url(../../images/headleft.svg);
    background-repeat: no-repeat;
    // background-position: calc(50% + 430px) bottom, calc(50% - 650px) 10px;
  }
  .el-button {
    padding: 0;
    line-height: initial;
  }
  .el-button + .el-button {
    margin: 0;
  }
  .card-top-item {
    display: flex;
  }
  .hr-divider {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-top-style: dashed;
  }
  .avatar {
    width: 48px;
    height: 48px;
    margin-right: 16px;
  }

  .card-divider:after {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    border-right: 1px solid #e7eaf3;
    border-right-style: dashed;
    content: "";
    opacity: 1;
  }
  .text-dark {
    font-size: 18px;
  }
  .card-footer {
    border-top: none;
    .btn {
      padding-top: 0.8rem;
      padding-bottom: 0.8rem;
      font-size: 14px;
      font-weight: 500;
    }
  }
  .listline {
    margin-bottom: 25px;
    .media-body {
      white-space: nowrap;
    }
  }
  .hash-tag {
    max-width: 220px;
  }
  .hash-tag--xs {
    max-width: 125px;
  }
  .htlabel {
    width: 100px;
    display: flex;
    padding-left: 0;
    padding-right: 0;
    .htnum {
      flex: 1;
      overflow:hidden;
	    text-overflow:ellipsis;
      margin-left: 3px;
      text-align: right;
    }
    .htname {
      width: 4em;
      margin-right: 5px;
    }
  }
  @media (max-width: 991.98px) {
    .card-divider:after {
      display: none;
    }
  }
}
.noData {
  background: url(../../images/nodata.svg) no-repeat center 38%;
  background-size: 50% auto;
}
.offLine {
  background: url(../../images/offline.svg) no-repeat center 38%;
  background-size: 50% auto;
}
.loading {
  background: url(../../images/loading.svg) no-repeat center 38%;
  background-size: 50% auto;
}
.app-main .card-divider:after {
  opacity: 0.2;
}
.app-main {
  .ui-autocomplete {
    background-color: #252525 !important;
    border-color: #013558 !important;
  }
  .search-box {
    background-color: #20242e !important;
  }
  .noData {
    background-image: url(../../images/nodata2.svg);
  }
  .offLine {
    background-image: url(../../images/offline2.svg);
  }
}
</style>
