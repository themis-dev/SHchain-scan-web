<template>
  <div id="content">
    <div class="container py-3">
      <div class="d-lg-flex align-items-center">
        <div class="mb-3 mb-lg-0">
          <h1 class="h4 media align-items-center text-dark">
            <div class="media-body">
              {{$t('common.token')}}
              <span class="text-secondary small">{{tokenDetail.name}}</span>
            </div>
          </h1>
        </div>
      </div>
    </div>
    <div class="container space-bottom-2">
      <div class="row mb-4">
        <div class="col-md-6 mb-3 mb-md-0">
          <div class="card">
            <div class="card-header">
              <h2 class="card-header-title">
                {{$t('address.overview')}}
                <span class="u-label u-label--xs u-label--secondary rounded ml-1">
                  <b v-if="tokenDetail.type===3">ARC-20</b>
                  <b v-if="tokenDetail.type===4">ARC-721</b>
                  <b v-if="tokenDetail.type===5">ARC-1155</b>
                </span>
               </h2>
            </div>
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-md-4 mb-1 mb-md-0">
                  <span style="white-space: nowrap;">{{$t('token.totalSupply')}}:</span>
                </div>
                <div class="col-md-8 font-weight-medium">
                  <value-format className="text-dark font-size-3 text-break w-100 text-left" :unitCurrency="tokenDetail.name"  :value="tokenDetail.totalSupply||'0'"></value-format>
                </div>
              </div>
              <div>
                <hr class="hr-space">
                <div class="row align-items-center">
                  <div class="col-md-4 mb-1 mb-md-0">{{$t('token.transfers')}}:</div>
                  <div class="col-md-8"><span id="totaltxns">{{tokenDetail.txNums}}</span></div>
                  <hr class="hr-space">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <div class="d-flex d-none">
                <h2 class="card-header-title mr-1 mb-0 d-flex mb-1">{{$t('token.profileSummary')}}</h2>
              </div>
            </div>
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-md-4 mb-1 mb-md-0">{{$t('common.contract')}}:</div>
                <div class="col-md-8">
                  <div class="d-flex clipboard-hover">
                    <a class="text-truncate d-block mr-2"
                       :href="'/address/'+tokenDetail.address">{{tokenDetail.address}}</a>
                  </div>
                </div>
              </div>
              <hr class="hr-space">
                <div class="row align-items-center">
                  <div class="col-md-4 mb-1 mb-md-0" v-if="tokenDetail.type===3">{{$t('token.decimals')}}:</div>
                  <div class="col-md-8" v-if="tokenDetail.type===3">
                    {{tokenDetail.decimals}}
                  </div>
                  <hr class="hr-space">
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card mb-1" v-if="address">
        <div class="card-body">
          <div class="row mx-gutters-md-1">
            <div class="col-md u-ver-divider">
              <h6 class="small font-weight-bold text-dark mb-1">
                <i class="fa fa-address-book mr-1 text-warning">
                </i><span class="text-uppercase">{{$t('token.filteredTitle')}}</span> </h6>
              <div class="d-flex">
                <a class="font-weight-bold text-truncate d-block mr-2" :href="'/address/'+address">
                  {{address}}</a>
              </div>
              <hr class="d-block d-md-none my-2">
            </div>
            <div class="col-md">
              <h6 class="small text-uppercase text-secondary mb-1">{{$t('common.balance')}}</h6>
              <value-format className="text-dark font-size-3 text-break w-100 text-left" :unitCurrency="tokenDetail.name"  :value="balance||'0'"></value-format>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header d-md-flex align-items-start p-0">
          <ul class="nav nav-custom nav-borderless order-2 order-md-1" id="nav_tabs" role="tablist">
            <li class="nav-item">
              <a class="nav-link" :class="!hash||hash === 'transactions'?'active':''" @click="tabFuc('#transactions')" href="#transactions" data-toggle="tab">{{$t('token.transfers')}}</a>
            </li>
            <li class="nav-item" v-show="tokenHolder.totalCount>0">
              <a class="nav-link" :class="hash === 'balances'?'active':''" @click="tabFuc('#balances')"  href="#balances" data-toggle="tab">{{$t('token.tab2')}}</a>
            </li>
          </ul>
          <div class="d-flex  order-1 order-md-2 ml-md-auto my-2">
            <div class="btn-group order-2 order-md-1 ml-2 mr-md-2 " role="group"  v-if="address">
              <span class="btn btn-xss btn-soft-secondary ml-auto" style="padding: .1rem .6rem;">
                <span class="hash-tag text-truncate">{{address}}</span></span>
              <a class="btn btn-sm btn-icon btn-soft-secondary" :href="'/token/'+token+'/25/1'">
                <i class="fa fa-times btn-icon__inner"></i>
              </a>
            </div>
            <div class="position-relative order-1 order-md-2 mr-md-3 ml-3 ml-md-0">
              <a class="btn btn-sm btn-icon btn-primary" href="javascript:;" @click="showFilter()">
                <i class="fa fa-search btn-icon__inner"></i>
              </a>
              <div class="dropdown-menu dropdown-unfold dropdown-menu-sm-right p-2 u-unfold--css-animation" :style="{display:(showFilterFlag?'block':'none')}">
                <div class="input-group input-group-sm" style="width: 310px;">
                  <input class="form-control" v-model.trim="findAddress" @keyup.enter="findAddressFn()"  type="search" :placeholder="$t('token.filterBy') " maxlength="66">
                  <div class="input-group-append">
                    <button class="btn btn-primary" @click="findAddressFn()">{{$t('address.find')}}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body" style="min-height: 200px">
          <div class="tab-content">
            <div class="tab-pane fade" :class="!hash||hash === 'transactions'?'show active':''" id="transactions">
              <div :style="pageLoading&&loading? '':'display: none;'">
                <div id="overlay" class="py-3 text-center">
                  <img src="../../images/loadingblock.svg" alt="Loading">
                </div>
              </div>
              <div id="maindiv" v-show="!pageLoading">
                <div class="d-md-flex justify-content-between mb-4">
                  <p class="mb-2 mb-md-0">
                    <i class="fa fa-spin fa-spinner fa-1x fa-pulse mr-1" :style="loading? '':'display: none;'"></i>
                    <i class="fa fa-sort-amount-desc mr-1"></i>{{$t('account.accountTip1')}} {{transferList.totalCount||0}} {{$t('transaction.tip')}}
                  </p>
                  <TablePagination @change="onChange" :total='transferList.pageCount||0' :current="transferList.pageNo||0"></TablePagination>
                </div>
                <div class="table-responsive">
                  <table class="table table-md-text-normal table-hover mb-4">
                    <thead class="thead-light">
                    <tr>
                      <th scope="col">{{$t('common.txhash')}}</th>
                      <th scope="col" v-if="!timeFlag">
                        <a href="javascript:;" @click="switchTime()">{{$t('common.time')}}</a>
                      </th>
                      <th scope="col" v-else>
                        <a href="javascript:;" @click="switchTime()">{{$t('common.age')}}</a>
                      </th>
                      <th scope="col">{{$t('common.from')}}</th>
                      <th scope="col" width="30"></th>
                      <th scope="col">{{$t('common.to')}}</th>
                      <th scope="col" v-if="tokenDetail.type===3">
                        {{$t('token.quantity')}}
                      </th>
                      <th scope="col" v-else>
                        {{$t('token.tokenID')}}
                      </th>
                      <th scope="col" v-if="tokenDetail.type===5">
                        Value
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="transferList.totalCount===0">
                      <td colspan="6">
                        <div class="alert alert-warning" style='margin-bottom: 0' role="alert">{{$t('tableNoData')}}</div>
                      </td>
                    </tr>
                    <tr v-else v-for="(item,index) in transferList.data" :key="index">
                      <td>
                        <el-tooltip
                          :content="item.txHash"
                          placement="bottom" effect="dark">
                          <el-button type="text" class="font-weight-normal font-size-3" style="padding: 0;color: #3F7FFF;">
                            <a class="hash-tag text-truncate" :href="'/tx/'+item.txHash">{{item.txHash}}</a>
                          </el-button>
                        </el-tooltip>
                      </td>
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
                        <el-tooltip
                          :content="item.fromAddr"
                          placement="bottom" effect="dark">
                          <el-button type="text" class="font-weight-normal font-size-3" style="padding: 0;color: #3F7FFF;">
                            <a :href="'/token/'+token+'/25/1?a='+item.fromAddr" class="hash-tag text-truncate">{{item.fromAddr}}</a>
                          </el-button>
                        </el-tooltip>
                      </td>
                      <td>
                        <span v-if="item.fromAddr===address"  class="u-label u-label--xs u-label--warning color-strong text-uppercase text-cente rounded text-nowrap" style="width:100%">{{$t('common.out')}}</span>
                          <span class="u-label u-label--xs u-label--success color-strong text-uppercase text-center rounded text-nowrap" style="width:100%" v-else-if="item.toAddr===address" >&nbsp;{{$t('common.in')}}&nbsp;</span>
                          <span class="btn btn-xs btn-icon btn-soft-success rounded-circle" v-else>
                        <i class="fas fa-long-arrow-alt-right btn-icon__inner"></i>
                      </span>
                      </td>
                      <td>
                        <el-tooltip
                          :content="item.toAddr"
                          placement="bottom" effect="dark">
                          <el-button type="text" class="font-weight-normal font-size-3" style="padding: 0;color: #3F7FFF;">
                            <a :href="'/token/'+token+'/25/1?a='+item.toAddr" class="hash-tag text-truncate">{{item.toAddr}}</a>
                          </el-button>
                        </el-tooltip>
                      </td>
                      <td v-if="tokenDetail.type!==5">
                        <value-format className="text-dark font-size-3" :value="item.valueToString||'0'"></value-format>
                      </td>
                      <td v-if="tokenDetail.type===5">
                        <value-format className="text-dark font-size-3" :value="item.txIDS||'0'"></value-format>
                      </td>
                      <td v-if="tokenDetail.type===5">
                        <value-format className="text-dark font-size-3" :value="item.value||'0'"></value-format>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="d-flex justify-content-md-end align-items-center text-secondary mb-2 mb-md-0 my-3">
                  <div class="d-inline-block">
                    <TablePagination @change="onChange" :total='transferList.pageCount||0' :current="transferList.pageNo||0"></TablePagination>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" :class="hash === 'balances'?'show active':''" id="balances">
              <div style="overflow: auto; visibility: visible;">
                <div class="d-md-flex justify-content-between mb-4">
                  <p class="mb-2 mb-md-0"><i id="spinwheel" class="fa fa-spin fa-spinner fa-1x fa-pulse mr-1" style="display: none;"></i>
                    {{$t('token.top')}} {{tokenHolder.totalCount > 1000?'1000':tokenHolder.totalCount}} {{$t('token.holders')}}<span class="hidden-xs"> ({{$t('token.total')}} {{tokenHolder.totalCount}} {{$t('token.holders')}})</span>
                  </p>
                  <TablePagination @change="onChange" :total='tokenHolder.pageCount||0' :current="tokenHolder.pageNo||0"></TablePagination>
                </div>
                <div class="table-responsive">
                  <table class="table table-md-text-normal table-hover">
                    <thead class="thead-light">
                    <tr>
                      <th scope="col">{{$t('account.thead1')}}</th>
                      <th scope="col">{{$t('common.address')}}</th>
                      <th scope="col">{{$t('token.quantity')}}</th>
                      <th scope="col">{{$t('token.percentage')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="tokenHolder.totalCount===0">
                      <td colspan="6">
                        <div class="alert alert-warning" style='margin-bottom: 0' role="alert">{{$t('tableNoData')}}</div>
                      </td>
                    </tr>
                    <tr v-else v-for="(item,index) in tokenHolder.data" :key="index">
                      <td>{{(index+1)+((Number(pageNo)-1)*Number(pageSize))}}</td>
                      <td>
                        <el-tooltip
                          :content="item.address"
                          placement="bottom" effect="dark">
                          <el-button type="text" class="font-weight-normal font-size-3" style="padding: 0;color: #3F7FFF;">
                            <a class="hash-tag text-truncate" :href="'/token/'+item.tokenAddress+'/25/1?a='+item.address">{{item.address}}</a>
                          </el-button>
                        </el-tooltip>
                      </td>
                      <td>
                        <value-format className="text-dark font-size-3" :value="item.balanceToString||'0'"></value-format>
                       </td>
                      <td><value-format className="text-dark font-size-3" :value="item.percent||'0'"></value-format> %
                        <div class="progress mt-1" style="height:2px;">
                          <div class="progress-bar bg-primary" role="progressbar" :style="'width:'+item.percent+'%;'" :aria-valuenow="Number(item.percent)" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="d-flex justify-content-md-end align-items-center text-secondary mb-2 mb-md-0 my-3">
                  <TablePagination @change="onChange" :total='tokenHolder.pageCount||0' :current="tokenHolder.pageNo||0"></TablePagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TablePagination from '@/components/TablePagination'
  import { getTokenDetails, getTokenTrasferList, getTokenTxAddressList, getTokenBalance, getListTokenHolder } from '@/api/chains';
  import { formatDecimal, formatTime, accDiv, fxf } from '@/utils/index'
  import ValueFormat from '@/components/ValueFormat'

  export default {
    components: {
      TablePagination,
      ValueFormat
    },
    data() {
      return {
        blockData: {},
        pageSize: this.$route.params.pageSize,
        pageNo: this.$route.params.pageNo,
        formatDecimal: formatDecimal,
        formatTime: formatTime,
        accDiv: accDiv,
        fxf: fxf,
        token: '',
        tokenDetail: {},
        transferList: {},
        loading: false,
        pageLoading: true,
        timeFlag: false,
        address: '',
        showFilterFlag: false,
        findAddress: '',
        balance: '0',
        tokenHolder: [],
        hash: window.location.hash ? window.location.hash.split('#')[1] : ''
      }
    },
    mounted() {
      this.token = this.$route.params.id;
      getTokenDetails({ token: this.token }).then(res => {
        this.pageLoading = false;
        if (res.status === 1) {
          this.tokenDetail = res.data
        }
      });
      const address = this.$route.query.a;
      if (address) {
        this.address = address;
        this.getFilterData(1, address);
        getTokenBalance({ tokenAddress: this.token, address }).then(res => {
          this.balance = res.data || 0
        })
      } else {
        this.getData();
        this.getTokenHolderData();
      }
    },
    methods: {
      getData(pageNo) {
        this.loading = true;
        const params = { pageSize: this.pageSize, pageNo: pageNo || this.pageNo, token: this.token };
        getTokenTrasferList(params).then(res => {
          this.loading = false;
          if (res.status === 1) {
            this.transferList = res.data;
          }
        });
      },
      getFilterData(pageNo, address) {
        this.loading = true;
        const params = { address: address, pageSize: this.pageSize, pageNo: pageNo || this.pageNo, tokenAddress: this.token };
        getTokenTxAddressList(params).then(res => {
          this.loading = false;
          if (res.status === 1) {
            this.transferList = res.data;
          }
        })
      },
      getTokenHolderData(pageNo) {
        const params = { pageSize: this.pageSize, pageNo: pageNo || this.pageNo, tokenAddress: this.token };
        getListTokenHolder(params).then(res => {
          this.loading = false;
          if (res.status === 1) {
            this.tokenHolder = res.data;
          }
        });
      },
      onChange(i) {
        this.pageNo = i;
        this.getData(i);
        this.$router.push({ path: '/token/' + this.token + '/' + this.pageSize + '/' + i, query: { ...this.$route.query }});
      },
      switchTime() {
        this.timeFlag = !this.timeFlag
      },
      showFilter() {
        this.showFilterFlag = !this.showFilterFlag;
      },
      findAddressFn() {
        this.pageNo = 1;
        this.$router.push({ path: '/token/' + this.token + '/' + this.pageSize + '/' + this.pageNo, query: { a: this.findAddress }});
        this.$router.go(0)
      },
      tabFuc(tab) {
        this.$router.push({ path: '/token/' + this.token + '/25/1' + tab })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
.btn-primary {
    color: #fff;
    background-color: #1C9DBF !important;
    border-color: #1C9DBF !important;
}
</style>
