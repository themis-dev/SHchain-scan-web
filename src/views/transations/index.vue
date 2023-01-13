<template>
  <div>
    <div class="container">
      <div class="list-title">
        <div class="mb-1 mb-md-0">
          <h1 class="h4 mb-0">{{$t('home.content4')}}&nbsp;<span class="small text-secondary"></span>
            <p class="mb-0 text-break small">
              <span v-if="block" class="small text-secondary">
              {{$t('transaction.for')}}{{$t('common.block')}} <a :href="'/block/'+block"><span class="text-primary text-break">{{block}}</span></a>
              </span>
              <span v-else-if="address" class="small text-secondary">
              {{$t('transaction.for')}} <a :href="'/address/'+address"><span class="text-primary text-break">{{address}}</span></a>
              </span>
            </p>
          </h1>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="table-title font-weight-medium">
            <p v-if="!block&&!address" class="mb-2 mb-md-0">
              <span><i class="fa fa-spin fa-spinner fa-1x fa-pulse mr-1" :style="loading? '':'display: none;'"></i>
                   {{$t('transaction.tip1')}} > {{total>0 ?total-1: total}} {{$t('transaction.tip')}}</span>
              <span class="d-block small">
                ({{$t('contract.tip1')}} 500000 {{$t('transaction.tip')}})
              </span>
            </p>
            <p class="mb-2 mb-md-0" v-else >
            <span class="d-flex align-items-center" >
                <i class="fa fa-spin fa-spinner fa-1x fa-pulse mr-1" :style="loading? '':'display: none;'"></i>
                {{$t('account.accountTip1')}} {{total}} {{$t('transaction.tip')}}
              </span>
            </p>
            <TablePagination @change="onChange" :total='txData.pageCount||0' :current="txData.pageNo||0"></TablePagination>
          </div>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead class="thead-light">
              <tr>
                <th scope="col" width="20"></th>
                <th scope="col" width="1">{{$t('common.txhash')}}</th>
                <th scope="col" width="1">
                  {{$t('common.block')}}
                </th>
                <th scope="col" width="2">
                  Method
                </th>
                <th scope="col" v-if="!timeFlag">
                  <a href="javascript:;" @click="switchTime()">{{$t('common.time')}}</a>
                </th>
                <th scope="col" v-else>
                  <a href="javascript:;" @click="switchTime()">{{$t('common.age')}}</a>
                </th>
                <th scope="col">
                  {{$t('common.from')}}
                </th>
                <th scope="col" width="30"></th>
                <th scope="col">
                  {{$t('common.to')}}
                </th>
                <th scope="col">
                  {{$t('common.value')}}
                </th>
                <th scope="col">
                    <span class="text-secondary">
                      {{$t('common.txFee')}}</span>
                </th>
              </tr>
              </thead>
              <tbody>
                <tr v-if="txData.totalCount===0">
                  <td colspan="9">
                    <div class="alert alert-warning" style='margin-bottom: 0' role="alert">{{$t('tableNoData')}}</div>
                  </td>
                </tr>
                <tr v-else v-for="(item,index) in txData.data" :key="index">
                  <td>
                    <el-popover
                      placement="right"
                      width="300"
                      trigger="click"
                      @show="getDetail(item.hash, item.from)"
                     >
                      <div v-loading="detailLoading" class="fadeIn" role="tooltip" >
                        <h3 class="popover-header"></h3>
                        <div class="popover-body" v-show="item.from != 'GENESIS'">
                          <h4 class="h5 mb-3">{{$t('transaction.additional')}}</h4>
                          <h5 class="font-size-1 font-weight-bold mb-1">{{$t('transaction.status')}}:</h5>
                          <span v-if="txDetailData.txstatus && txDetailData.txstatus !=='0x1'" class="text-danger" ><i class="fa fa-times-circle mr-1"></i>{{$t('common.fail')}}</span>
                          <span class="text-success" v-else><i class="fa fa-check-circle mr-1"></i>{{$t('common.success')}}</span>
                          <span class="text-secondary ml-1"> ( {{txDetailData.confirmations}} {{$t('transaction.blockConfirm')}})</span>
                          <hr class="hr-space">
                          <!-- Transaction Fee -->
                          <h5 class="font-size-1 font-weight-bold mb-1">{{$t('transaction.txFee')}}:</h5>
                          <div>{{item.txFee}} DBOX ($ {{item.txFeeDollar}})</div>
                          <!-- End Transaction Fee -->
                          <hr class="hr-space">
                          <!-- Gas Info -->
                          <h5 class="font-size-1 font-weight-bold mb-1">{{$t('transaction.gasInfo')}}:</h5>
                          <div>{{txDetailData.gasUsed}} Gas Used From {{txDetailData.gas}} Gas Limit @ {{formatDecimal(accDiv(txDetailData.gasPrice||0,1e18),9)}} DBOX ({{formatDecimal(accDiv(txDetailData.gasPrice||0,1e9),0)}} Gwei)</div>
                          <!-- End Gas Info -->
                          <hr class="hr-space">
                          <!-- Nonce -->
                          <h5 class="font-size-1 font-weight-bold mb-1">{{$t('block.nonce')}}:</h5>
                          <div><span>{{txDetailData.nonce}}</span> <span class="text-secondary">(in the position {{txDetailData.transactionIndex}})</span></div>
                          <!-- End Nonce -->
                          <hr class="hr-space">
                          <a :href="'/tx/'+item.hash">{{$t('transaction.more')}}
                            <i class="far fa-arrow-right small"></i>
                          </a>
                        </div>
                        <div class="popover-body" v-show="item.from == 'GENESIS'">
                          {{$t('transaction.noData')}}
                        </div>
                      </div>
                      <el-button type="text" slot="reference" style="padding: 0">
                        <span type="button" class="btn btn-xs btn-icon btn-soft-secondary">
                          <i class="far fa-question-circle btn-icon__inner"></i>
                        </span>
                      </el-button>
                    </el-popover>
                  </td>
                  <td>
                    <el-tooltip
                      v-show="item.txStatus!=='0x1'"
                      :content="$t('common.txError')"
                      placement="top" effect="dark">
                      <el-button type="text" style="padding: 0">
                        <strong class="text-danger">
                          <i class="fa fa-exclamation-circle"></i>
                        </strong>
                      </el-button>
                    </el-tooltip>
                    <span class="hash-tag text-truncate"  v-if="item.from == 'GENESIS'">{{item.hash}}</span>
                    <el-tooltip
                      v-else
                      :content="item.hash"
                      placement="bottom" effect="dark">
                      <el-button type="text" class="font-weight-normal" style="padding: 0;color: #3F7FFF;">
                        <a class="hash-tag text-truncate" :href="'/tx/'+item.hash">{{item.hash}}</a>
                      </el-button>
                    </el-tooltip>
                  </td>
                  <td>
                    <a :href="'/block/'+item.blcokNumber">{{item.blcokNumber}}</a>
                  </td>
                  <td>
                    <div class="func-name">{{item.funcName}}</div>
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
                       :content="'Contract'"
                        placement="bottom" effect="dark">
                      <i class="far fa-file-alt text-secondary" v-if="item.isFromContract" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Contract"></i>
                      </el-tooltip>
                    <span class="hash-tag text-truncate"  v-if="item.from == 'GENESIS'">{{item.from}}</span>
                    <el-tooltip
                      v-else
                      :content="item.from"
                      placement="bottom" effect="dark">
                      <el-button type="text" class="font-weight-normal" style="padding: 0;color: #3F7FFF;">
                        <a class="hash-tag text-truncate" :href="'/address/'+item.from">{{item.from}}</a>
                      </el-button>
                    </el-tooltip>
                  </td>
                  <td class="text-center">
                    <span v-if="item.from===address"  class="u-label u-label--xs u-label--warning color-strong text-uppercase text-cente rounded text-nowrap" style="width:100%">{{$t('common.out')}}</span>
                    <span class="u-label u-label--xs u-label--success color-strong text-uppercase text-center rounded text-nowrap" style="width:100%" v-else-if="item.to===address" >&nbsp;{{$t('common.in')}}&nbsp;</span>
                    <span class="btn btn-xs btn-icon btn-soft-success rounded-circle" v-else>
                      <i class="fas fa-long-arrow-alt-right btn-icon__inner"></i>
                    </span>
                  </td>
                  <td>
                    <span style="white-space: nowrap;"  v-if="item.to">
                        <el-tooltip
                          :content="'Contract'"
                          placement="bottom" effect="dark">
                          <i class="far fa-file-alt text-secondary" v-if="item.isToContract" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Contract"></i>
                        </el-tooltip>
                        <el-tooltip
                          :content="item.to"
                          placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal" style="padding: 0;color: #3F7FFF;">
                          <a class="hash-tag text-truncate" :href="'/address/'+item.to">{{item.to}}</a>
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
                  <td>
                    <value-format className="text-dark font-size-3" :value="item.value||'0'"></value-format> DBOX
                  </td>
                  <td style="display: flex;justify-content: space-between;align-items: center">
                    <value-format className="font-size-3 text-secondary" :value="item.txFee||'0'"></value-format>
                    <el-tooltip
                      :content="item.metaAddress + $t('common.pay')+ formatDecimal(accDiv(item.feePercent||0,100),2)+' % '+$t('common.transactionFee')"
                      placement="bottom" effect="dark">
                      <el-button type="text" class="font-weight-normal" style="padding: 0;color: #3F7FFF;">
                        <span class="u-label u-label--xs u-label--success color-strong text-uppercase text-center rounded text-nowrap" v-if="item.metaAddress" >&nbsp;META&nbsp;</span>
                      </el-button>
                    </el-tooltip>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="list-title">
            <div class="text-secondary mb-2 mb-md-0">
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
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import TablePagination from '@/components/TablePagination'
  import { getTxList, getSearch, getTxCount, getBlockTxsList, getAddressTxList } from '@/api/chains'
  import { formatTime, accDiv, fxf, formatDecimal } from '@/utils/index'
  import ValueFormat from '@/components/ValueFormat'

  export default {
    data() {
      return {
        loading: false,
        selectItem: this.$route.params.pageSize,
        pageSize: this.$route.params.pageSize,
        pageNo: this.$route.params.pageNo,
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
        address: ''
      }
    },
    components: {
      TablePagination,
      ValueFormat
    },
    computed: {},
    mounted() {
      const block = this.$route.query.block;
      this.block = block;
      if (block) {
        this.getBlockListData(block);
        return
      }
      const address = this.$route.query.address;
      this.address = address;
      if (address) {
        this.getAddressData(address);
        this.getTotal();
        return
      }
      this.getTxListData();
      getTxCount().then(res => {
        if (res.status === 1) {
          this.total = res.data
        }
      })
    },
    methods: {
      getTxListData(pageNo) {
        this.loading = true;
        const params = { pageSize: this.pageSize, pageNo: pageNo || this.pageNo };
        getTxList(params).then(res => {
          this.loading = false;
          if (res.status === 1) {
            this.txData = res.data;
          }
        });
      },
      getBlockListData(block, pageNo) {
        this.loading = true;
        const params = { blockNumber: block, pageSize: this.pageSize, pageNo: pageNo || this.pageNo };
        getBlockTxsList(params).then(res => {
          this.loading = false;
          if (res.status === 1) {
            this.txData = res.data;
            this.total = res.data.totalCount
          }
        });
      },
      getAddressData(address, pageNo) {
        this.loading = true;
        const params = { address: address, pageSize: this.pageSize, pageNo: pageNo || this.pageNo };
        getAddressTxList(params).then(res => {
          this.loading = false;
          if (res.status === 1 && res.data) {
            this.txData = res.data;
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
        this.$router.push({ path: '/txs/' + this.pageSize + '/' + i, query: { ...this.$route.query }});
        if (this.address) {
          this.getAddressData(this.address, i);
          return
        }
        if (this.block) {
          this.getBlockListData(this.block, i);
          return
        }
        this.getTxListData(i);
      },
      selectFn(e) {
        this.pageSize = e.target.value;
        this.pageNo = 1;
        this.$router.push({ path: '/txs/' + this.pageSize + '/' + this.pageNo, query: { ...this.$route.query }});
        if (this.address) {
          this.getAddressData(this.address);
          return
        }
        if (this.block) {
          this.getBlockListData(this.block);
          return
        }
        this.getTxListData();
      },
      switchTime() {
        this.timeFlag = !this.timeFlag
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.func-name {
    background-color: rgba(52,152,219,.1);
    font-size: .65625rem;
    line-height: 1.7;
    padding: 0.2rem 0.5rem;
    text-align: center!important;
    border-radius: 0.35rem!important;
    display: inline-block;
}
</style>
