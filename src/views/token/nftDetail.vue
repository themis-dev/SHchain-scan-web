<template>
  <div class="container space-top-md-1 space-bottom-2">
    <div class="d-block d-md-none py-4">
      <h1
        class="h2 text-dark font-weight-bold mb-0"
        data-toggle="tooltip"
        title=""
        data-original-title="Satin Vandal for Ukraine"
      >
       {{nftData.desc.worksName}}
      </h1>
    </div>

    <div class="row mx-n3">
      <div class="col-md-5 px-3 mb-4">
        <div class="card shadow-none sticky-top p-3">
          <div class="mb-0 w-100 nft-block nft-block-xl">
            <img
              class="nft-block-img"
              :src="nftData.desc.worksUrl"
              alt=""
              v-if="!isVideo"
            />
            <video 
            v-else
            :src="nftData.desc.worksUrl"
            :controls="videoOptions.controls"
            class="video-js vjs-big-play-centered vjs-fluid"
            webkit-playsinline="true"
            playsinline="true"
            x-webkit-airplay="allow"
            x5-playsinline
            style="width: 100%;"
            @play="onPlayerPlay"
            @pause="onPlayerPause"
            autoplay="autoplay"
            ref="video"
            height="500px"
            >
               </video>
          </div>
        </div>
      </div>
      <div class="col-md-7 px-3 mb-4">
        <div class="d-sm-flex justify-content-between mb-4">
          <div class="d-none d-md-block mr-4">
            <h1
              class="h2 text-dark font-weight-bold mb-0"
              data-toggle="tooltip"
              title=""
              data-original-title="Satin Vandal for Ukraine"
            >
              {{nftData.desc.worksName}}
            </h1>
          </div>
        </div>
        <div class="accordion">
          <div class="card shadow-none">
            <div class="card-header p-0" id="headingDetails">
              <button
                class="btn btn-block d-flex align-items-center px-3"
                type="button"
                data-toggle="collapse"
                data-target="#collapseDetails"
                aria-expanded="true"
                aria-controls="collapseDetails"
              >
                <h3 class="card-header-title">
                  <i class="far fa-list fa-fw mr-1"></i>Details
                </h3>
                <div class="text-dark ml-auto">
                  <span class="card-arrow-more"
                    ><i class="far fa-chevron-down fa-fw"></i
                  ></span>
                  <span class="card-arrow-less"
                    ><i class="far fa-chevron-up fa-fw"></i
                  ></span>
                </div>
              </button>
            </div>
            <div
              id="collapseDetails"
              class="collapse show"
              aria-labelledby="headingDetails"
            >
              <div class="card-body py-4">
                <div class="row mb-4">
                  <div class="col-4 text-secondary">
                    <i
                      class="fal fa-question-circle text-secondary"
                      data-container="body"
                      data-toggle="popover"
                      data-placement="top"
                      data-content="Address of this NFT contract"
                      data-original-title=""
                      title=""
                    ></i>
                    NFT ID:
                  </div>
                  <div class="col-7">
                    <div class="d-flex align-items-center">
                      <a
                        id="referralLink-1"
                        class="d-block text-truncate mr-2"
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        >{{nftData.seriesId + '-' + nftData.nftId}}</a
                      >
                      <input :value="nftData.seriesId + '-' + nftData.nftId" style='opacity: 0;position: absolute;left: 0' id="copyNftId">
                      <a class="btn btn-sm btn-icon btn-soft-secondary rounded-circle" @click="copyNftId" href="javascript:;"
                        title="">
                        <span class="far  btn-icon__inner" :class="!copyid ?'fa-copy':'fa-check'"></span>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="row mb-4">
                  <div class="col-4 text-secondary">
                    <i
                      class="fal fa-question-circle text-secondary"
                      data-container="body"
                      data-toggle="popover"
                      data-placement="top"
                      data-content="Address that deployed this NFT contract"
                      data-original-title=""
                      title=""
                    ></i>
                    作者名:
                  </div>
                  <div class="col-7">
                    <div class="d-flex align-items-center">
                      {{nftData.desc.authorName}}
                    </div>
                  </div>
                </div>

                 <div class="row mb-4">
                  <div class="col-4 text-secondary">
                    <i
                      class="fal fa-question-circle text-secondary"
                      data-container="body"
                      data-toggle="popover"
                      data-placement="top"
                      data-content="Address that deployed this NFT contract"
                      data-original-title=""
                      title=""
                    ></i>
                    作品名称:
                  </div>
                  <div class="col-7">
                    <div class="d-flex align-items-center">
                      {{nftData.desc.worksName}}
                    </div>
                  </div>
                </div>
                 <div class="row mb-4">
                  <div class="col-4 text-secondary">
                    <i
                      class="fal fa-question-circle text-secondary"
                      data-container="body"
                      data-toggle="popover"
                      data-placement="top"
                      data-content="Address that deployed this NFT contract"
                      data-original-title=""
                      title=""
                    ></i>
                    系列名:
                  </div>
                  <div class="col-7">
                    <div class="d-flex align-items-center">
                      {{nftData.desc.seriesName}}
                    </div>
                  </div>
                </div>

                  <div class="row mb-4">
                  <div class="col-4 text-secondary">
                    <i
                      class="fal fa-question-circle text-secondary"
                      data-container="body"
                      data-toggle="popover"
                      data-placement="top"
                      data-content="Address that deployed this NFT contract"
                      data-original-title=""
                      title=""
                    ></i>
                    系列ID:
                  </div>
                  <div class="col-7">
                    <div class="d-flex align-items-center">
                      {{nftData.seriesId}}
                    </div>
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-4 text-secondary">
                    <i
                      class="fal fa-question-circle text-secondary"
                      data-container="body"
                      data-toggle="popover"
                      data-placement="top"
                      data-content="Address that deployed this NFT contract"
                      data-original-title=""
                      title=""
                    ></i>
                    发行者:
                  </div>
                  <div class="col-7">
                    <div class="d-flex align-items-center">
                      0x089562e3402af5741be73cc20e4a7d0f04ff7c42
                      <input value='0x089562e3402af5741be73cc20e4a7d0f04ff7c42' style='opacity: 0;position: absolute;left: 0' id="copyAddress">
                      <a class="btn btn-sm btn-icon btn-soft-secondary rounded-circle" @click="copyAddress" href="javascript:;"
                        title="">
                        <span class="far  btn-icon__inner" :class="!copy ?'fa-copy':'fa-check'"></span>
                      </a>
                    </div>
                    
                  </div>
                </div>
                  <div class="row mb-4">
                  <div class="col-4 text-secondary">
                    <i
                      class="fal fa-question-circle text-secondary"
                      data-container="body"
                      data-toggle="popover"
                      data-placement="top"
                      data-content="Address that deployed this NFT contract"
                      data-original-title=""
                      title=""
                    ></i>
                    作品URL:
                  </div>
                  <div class="col-7">
                    <div class="d-flex align-items-center">
                      <a :href="nftData.desc.worksUrl" target="_blank">{{nftData.desc.worksUrl}}
                        <input :value='nftData.desc.worksUrl' style='opacity: 0;position: absolute;left: 0' id="copyURL">
                        <a class="btn btn-sm btn-icon btn-soft-secondary rounded-circle" @click="copyURL" href="javascript:;"
                          title="">
                          <span class="far  btn-icon__inner" :class="!copyURLTag ?'fa-copy':'fa-check'"></span>
                        </a>
                      </a>
                      
                    </div>
                  </div>
                </div>

                  <div class="row mb-4">
                  <div class="col-4 text-secondary">
                    <i
                      class="fal fa-question-circle text-secondary"
                      data-container="body"
                      data-toggle="popover"
                      data-placement="top"
                      data-content="Address that deployed this NFT contract"
                      data-original-title=""
                      title=""
                    ></i>
                    所有者:
                  </div>
                  <div class="col-7">
                    <div class="d-flex align-items-center">
                      {{nftData.ownerOf}}
                      <input :value='nftData.ownerOf' style='opacity: 0;position: absolute;left: 0' id="copyOwer">
                      <a class="btn btn-sm btn-icon btn-soft-secondary rounded-circle" @click="copyOwer" href="javascript:;"
                        title="">
                        <span class="far  btn-icon__inner" :class="!copyOwerTag ?'fa-copy':'fa-check'"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div
            id="ContentPlaceHolder1_divItemDescription"
            class="card shadow-none"
          >
            <div class="card-header p-0" id="headingDescription">
              <button
                class="btn btn-block d-flex align-items-center px-3 collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseDescription"
                aria-expanded="false"
                aria-controls="collapseDescription"
              >
                <h3 class="card-header-title">
                  <i class="far fa-list-alt fa-fw mr-1"></i>Description
                </h3>
                <div class="text-dark ml-auto">
                  <span class="card-arrow-more"
                    ><i class="far fa-chevron-down fa-fw"></i
                  ></span>
                  <span class="card-arrow-less"
                    ><i class="far fa-chevron-up fa-fw"></i
                  ></span>
                </div>
              </button>
            </div>
            <div
              id="collapseDescription"
              class="collapse"
              aria-labelledby="headingDescription"
              style=""
            >
              <div class="card-body pt-4">
                <p>
                  This collaboration between Wladimir Klitschko and WhIsBe is a
                  commitment to fighting back against the crimes being committed
                  by Putin. 100% of the proceeds will go to Red Cross Ukraine,
                  UNICEF Ukraine, and Ukrainian relief funds to support their
                  vital efforts to provide humanitarian relief to the people of
                  Ukraine.
                </p>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>


     <div class="card">
        <!-- <div class="card-header">
          <h2 class="card-header-title">Item Activity</h2>
        </div> -->
        <div class="card-body">
          <div class="table-title font-weight-medium">
            <p class="mb-2 mb-md-0" >
              <span>
                <h2 class="card-header-title">Item Activity</h2>
              </span>
            <!-- <span class="d-flex align-items-center" >
                <i class="fa fa-spin fa-spinner fa-1x fa-pulse mr-1" :style="loading? '':'display: none;'"></i>
                {{$t('account.accountTip1')}} {{total}} {{$t('transaction.tip')}}
              </span> -->
            </p>
            <!-- <TablePagination @change="onChange" :total='txData.pageCount||0' :current="txData.pageNo||0"></TablePagination> -->
          </div>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead class="thead-light">
              <tr>
                <th scope="col" width="1">{{$t('common.txhash')}}</th>
                <!-- <th scope="col" width="1">
                  {{$t('common.block')}}
                </th>
                <th scope="col" width="2">
                  Method
                </th> -->
                <th scope="col" v-if="!timeFlag">
                  <a href="javascript:;" @click="switchTime()">{{$t('common.time')}}</a>
                </th>
                <th scope="col" v-else>
                  <a href="javascript:;" @click="switchTime()">{{$t('common.age')}}</a>
                </th>
                <th scope="col">
                  Block
                </th>
                <th scope="col">
                  {{$t('common.from')}}
                </th>
                <th scope="col" width="30"></th>
                <th scope="col">
                  {{$t('common.to')}}
                </th>
                <!-- <th scope="col">
                  {{$t('common.value')}}
                </th> -->
                <!-- <th scope="col">
                    <span class="text-secondary">
                      {{$t('common.txFee')}}</span>
                </th> -->
              </tr>
              </thead>
              <tbody>
                <tr v-if="txData.length === 0">
                  <td colspan="9">
                    <div class="alert alert-warning" style='margin-bottom: 0' role="alert">{{$t('tableNoData')}}</div>
                  </td>
                </tr>
                <tr v-else v-for="(item,index) in txData" :key="index">
                  <td>
                    <span class="hash-tag text-truncate"  v-if="item.from == 'GENESIS'">{{item.txHash}}</span>
                    <el-tooltip
                      v-else
                      :content="item.txHash"
                      placement="bottom" effect="dark">
                      <el-button type="text" class="font-weight-normal" style="padding: 0;color: #3F7FFF;">
                        <a class="hash-tag text-truncate" :href="'/tx/'+item.txHash">{{item.txHash}}</a>
                      </el-button>
                    </el-tooltip>
                  </td>
                  <!-- <td>
                    <a :href="'/block/'+item.blcokNumber">{{item.blcokNumber}}</a>
                  </td>
                  <td>
                    <div class="func-name">{{item.funcName}}</div>
                  </td> -->
                  <td v-if="!timeFlag">
                    <el-tooltip
                      :content="item.timestamp|timeFormatUTC"
                      placement="bottom" effect="dark">
                      <el-button type="text" class="font-weight-normal text-dark font-size-3" style="padding: 0">
                        <span>{{item.timestamp|timeFormat}}</span>
                      </el-button>
                    </el-tooltip>
                  </td>
                  <td v-else>
                    <el-tooltip
                      :content="item.timestamp|timeFormat"
                      placement="bottom" effect="dark">
                      <el-button type="text" class="font-weight-normal text-dark font-size-3" style="padding: 0">
                        <span>{{formatTime(item.timestamp)}}</span>
                      </el-button>
                    </el-tooltip>
                  </td>
                  <td>
                    <div class="func-name">
                       {{item.number }}
                      <!-- <value-format className="text-dark font-size-3" :value="item.txValue / 10e18||'0'"></value-format> NOW -->
                    </div>
                  </td>
                  <td>
                     <el-tooltip
                       :content="'Contract'"
                        placement="bottom" effect="dark">
                      <i class="far fa-file-alt text-secondary" v-if="item.isFromContract" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Contract"></i>
                      </el-tooltip>
                    <span class="hash-tag text-truncate"  v-if="item.fromAddr == 'GENESIS'">{{item.fromAddr}}</span>
                    <el-tooltip
                      v-else
                      :content="item.fromAddr"
                      placement="bottom" effect="dark">
                      <el-button type="text" class="font-weight-normal" style="padding: 0;color: #3F7FFF;">
                        <a class="hash-tag text-truncate" :href="'/address/'+item.fromAddr">{{item.fromAddr}}</a>
                      </el-button>
                    </el-tooltip>
                  </td>
                  <td class="text-center">
                    <span v-if="item.fromAddr===address"  class="u-label u-label--xs u-label--warning color-strong text-uppercase text-cente rounded text-nowrap" style="width:100%">{{$t('common.out')}}</span>
                    <span class="u-label u-label--xs u-label--success color-strong text-uppercase text-center rounded text-nowrap" style="width:100%" v-else-if="item.toAddr===address" >&nbsp;{{$t('common.in')}}&nbsp;</span>
                    <span class="btn btn-xs btn-icon btn-soft-success rounded-circle" v-else>
                      <i class="fas fa-long-arrow-alt-right btn-icon__inner"></i>
                    </span>
                  </td>
                  <td>
                    <span style="white-space: nowrap;"  v-if="item.toAddr">
                        <el-tooltip
                          :content="'Contract'"
                          placement="bottom" effect="dark">
                          <i class="far fa-file-alt text-secondary" v-if="item.isToContract" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Contract"></i>
                        </el-tooltip>
                        <el-tooltip
                          :content="item.toAddr"
                          placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal" style="padding: 0;color: #3F7FFF;">
                          <a class="hash-tag text-truncate" :href="'/address/'+item.toAddr">{{item.toAddr}}</a>
                        </el-button>
                      </el-tooltip>
                      </span>
                    <span style="white-space: nowrap;" v-else>
                          <el-tooltip
                            :content="item.contractAddress"
                            placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal" style="padding: 0;color: #3F7FFF;">
                          <a class="hash-tag text-truncate" :href="'/address/'+item.contractAddress">{{$t('common.contractCreation')}}</a>
                        </el-button>
                      </el-tooltip>
                      </span>
                  </td>
                  <!-- <td>
                    <value-format className="text-dark font-size-3" :value="item.value||'0'"></value-format> NOW
                  </td> -->
                  <!-- <td style="display: flex;justify-content: space-between;align-items: center">
                    <value-format className="font-size-3 text-secondary" :value="item.txFee||'0'"></value-format>
                    <el-tooltip
                      :content="item.metaAddress + $t('common.pay')+ formatDecimal(accDiv(item.feePercent||0,100),2)+' % '+$t('common.transactionFee')"
                      placement="bottom" effect="dark">
                      <el-button type="text" class="font-weight-normal" style="padding: 0;color: #3F7FFF;">
                        <span class="u-label u-label--xs u-label--success color-strong text-uppercase text-center rounded text-nowrap" v-if="item.metaAddress" >&nbsp;META&nbsp;</span>
                      </el-button>
                    </el-tooltip>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <div class="list-title"> -->
            <!-- <div class="text-secondary mb-2 mb-md-0">
              {{$t('pagination.recodeShow')}}
              <select class="custom-select custom-select-xs mx-2" v-model="selectItem" @change="selectFn($event)">
                <option selected="selected" value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              {{$t('pagination.records')}}
            </div>
            <div class="mb-4 mb-md-0">
              <TablePagination @change="onChange" :total='txData.pageCount||0' :current="txData.pageNo||0"></TablePagination>
            </div> -->
          <!-- </div> -->
        </div>
    </div>

  </div>
</template>

<script>
import { getTokenList, getListNftDetail, getNftDetail, getNftDetailList } from '@/api/chains'
import TablePagination from '@/components/TablePagination'
import { getTxList, getSearch, getTxCount, getBlockTxsList, getAddressTxList } from '@/api/chains'
import { formatTime, accDiv, fxf, formatDecimal } from '@/utils/index'
import ValueFormat from '@/components/ValueFormat'

export default {
  components: {
    TablePagination,
  },
  data() {
    return {
      isVideo: false,
      videoOptions: {
                    controls:true,
                    src:
                        "xxxxxxx.mp4", // url地址
                },
                player: null,
                playTime:'',
                seekTime:'',
                current:'',
      list: {},
      selectItem: this.$route.params.pageSize || 100,
      pageSize: this.$route.params.pageSize || 100,
      pageNo: this.$route.params.pageNo || 1,
      loading: false,
      timeFlag: false,
      formatTime: formatTime,
      // total: {},
      txData: {},
      timeFlag: false,
      formatTime: formatTime,
      formatDecimal: formatDecimal,
      fxf: fxf,
      accDiv: accDiv,
      txDetailData: {},
      detailLoading: true,
      total: 0,
      block: 0,
      address: '',
      nftData: {desc:{}},
      copy: false,
      copyid: false,
      copyOwerTag:false,
      copyURLTag:false,
    }
  },
  components: {
      TablePagination,
      ValueFormat
    },
  mounted() {
    getNftDetail(this.$route.params.id).then(res => {
      res.data.desc = JSON.parse(res.data.desc)
      this.nftData = res.data
      console.log(this.nftData )
      const ll = this.nftData.desc.worksUrl.substring(this.nftData.desc.worksUrl.length-3)
      console.log(ll)
      if (ll === 'png' || ll=== 'jpg') {
        this.isVideo = false
      } else {
        this.isVideo = true
      }
      
    })
    this.getData();
    // this.getTxListData();
    //   getTxCount().then(res => {
    //     if (res.status === 1) {
    //       this.total = res.data
    //     }
    //   })
  },
  methods: {
    initVideo() {
                //原生初始化视频方法
                let myVideo = this.$refs.video;
                //ontimeupdate
                  myVideo.ontimeupdate = function() {myFunction()};
                  let _this = this;

                  function myFunction(){
                      let playTime = myVideo.currentTime
                      setTimeout(function () {
                          localStorage.setItem("cacheTime",playTime)
                      },500)
                      let time = localStorage.getItem("cacheTime")
                      // 当前播放位置发生变化时触发。
                      if(playTime - Number(time) > 2){
                          myVideo.currentTime = Number(time)
                      }else{
                      }
                  };
    },
            // 播放回调
            onPlayerPlay(player) {
                // this.globalSetting = true
                console.log("player play!", player);
                // document.getElementsByClassName("vjs-control-bar").style.display = "block";
                // document.getElementsByClassName("vjs-control-bar").style.display = "block";
            },

            // 暂停回调
            onPlayerPause(player) {
                // this.globalSetting.controls = false;
                // console.log("player pause!", player);
                // var video = document.getElementById("video");
                // video.controls=false;
                // document.getElementsByClassName("vjs-control-bar").style.display = "none";
            },
    beforeDestroy() {
            if (this.player) {
                this.player.dispose()
            }
        },
    copyURL() {
        document.getElementById('copyURL').select();
        document.execCommand('copy');
        this.copyURLTag = true;
        setTimeout(() => {
          this.copyURLTag = false
          document.getElementById('copyURL').blur()
        }, 1000)
      },
    copyAddress() {
        document.getElementById('copyAddress').select();
        document.execCommand('copy');
        this.copy = true;
        setTimeout(() => {
          this.copy = false
          document.getElementById('copyAddress').blur()
        }, 1000)
      },
      copyNftId() {
        document.getElementById('copyNftId').select();
        document.execCommand('copy');
        this.copyid = true;
        setTimeout(() => {
          this.copyid = false
          document.getElementById('copyNftId').blur()
        }, 1000)
      },
      copyOwer() {
        document.getElementById('copyOwer').select();
        document.execCommand('copy');
        this.copyOwerTag = true;
        setTimeout(() => {
          this.copyOwerTag = false
          document.getElementById('copyOwer').blur()
        }, 1000)
      },
    getData(pageNo) {
      this.loading = true
      const params = {
        pageSize: this.pageSize,
        pageNo: pageNo || this.pageNo,
        id: 'dd78e3efe4d5decc377651215e1ab9c2368529495bef33751f5cc817af1db34e-12',
      }
      getNftDetailList(params).then((res) => {
        this.loading = false
        if (res.status === 1) {
          this.txData = res.data
        }
      })
      console.log(this.txData)
    },
    // onChange(i) {
    //   this.pageNo = i
    //   this.getData(i)
    //   this.$router.push({
    //     path: '/tokentxns/' + this.pageSize + '/' + i,
    //     query: { ...this.$route.query },
    //   })
    // },
    // selectFn(e) {
    //   this.pageSize = e.target.value
    //   this.pageNo = 1
    //   this.getData()
    //   this.$router.push({
    //     path: '/tokentxns/' + this.pageSize + '/' + this.pageNo,
    //     query: { ...this.$route.query },
    //   })
    // },
    switchTime() {
      this.timeFlag = !this.timeFlag
    },
    getTxListData(pageNo) {
        this.loading = true;
        // const params = { pageSize: this.pageSize, pageNo: pageNo || this.pageNo };
        const params = {
        pageSize: this.pageSize,
        pageNo: pageNo || this.pageNo,
        id: 1,
        tokenAddress: '0x73c4f414e6687686bc633562ece50ff0d392ae00'
      }
        getListNftDetail(params).then(res => {
          this.loading = false;
          if (res.status === 1) {
            this.txData = res.data;
            console.log(this.txData)
          }
        });
      },
      getDetail(tx, from) {
        this.detailLoading = true;
        if (from === 'GENESIS') {
          this.detailLoading = false;
          return
        }
        getSearch(tx).then(res => {
          if (res.status === 1) {
            this.detailLoading = false;
            this.txDetailData = res.data
          }
        })
      },
      getTotal() {
        getTxCount({ address: this.address }).then((res) => {
          if (res.status === 1) {
            this.total = res.data
          }
        });
      },
      onChange(i) {
        this.pageNo = i;
        this.$router.push({ path: '/nft/' + this.pageSize + '/' + i, query: { ...this.$route.query }});
        this.getTxListData(i);
      },
      selectFn(e) {
        this.pageSize = e.target.value;
        this.pageNo = 1;
        this.$router.push({ path: '/nft/' + this.pageSize + '/' + this.pageNo, query: { ...this.$route.query }});
        this.getTxListData();
      },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.nft-block-img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 0.35rem;
}
</style>
