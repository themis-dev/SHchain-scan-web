<template>
  <div>
    <div class="container">
      <div class="d-md-flex justify-content-between align-items-center py-3">
        <div class="mb-1 mb-md-0">
          <h1 class="h4 font-weight-normal mb-0">
            {{$t('validator.setInfoByBlock')}}
            <p class="mb-0 text-break small" v-if="type===2">
              <span class="small text-secondary">{{$t('validator.snapshotBlock')}} <a :href="'/block/'+block"><span
                class="text-primary text-break">{{block}}</span></a></span>
            </p>
            <p class="mb-0 text-break small" v-else>
              <span class="small text-secondary">{{$t('validator.snapshotValidators')}} <a :href="'/address/'+block"><span
                class="text-primary text-break">{{block}}</span></a></span>
            </p>
          </h1>
        </div>
      </div>
    </div>
    <div class="container mt-1">
      <div class="row" v-if="type===2">
        <div class="col-md-4 mb-3">
          <div class="card h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <h2 class="small text-uppercase font-weight-medium text-secondary mr-1"><i class="fal fa-user"></i>
                  {{$t('navBar.navigation3')}}</h2>
                <span class="btn btn-xs btn-soft-secondary btn-status py-1 px-2"><strong
                  class="text-right">{{validatorNum}}  {{$t('navBar.navigation3')}}</strong> </span></div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="card h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <h2 class="small text-uppercase font-weight-medium text-secondary mr-1"><i class="fal fa-inbox-in"></i>
                  {{$t('validator.incoming')}}</h2>
                <span class="btn btn-xs btn-soft-secondary btn-status py-1 px-2"><strong
                  class=" text-right">{{totalIncoming}} DBOX</strong> </span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="d-md-flex justify-content-between mb-4">
            <p class="mb-2 mb-md-0">
              <i class="fa fa-spin fa-spinner fa-1x fa-pulse mr-1" :style="loading? '':'display: none;'"></i>
              {{$t('account.accountTip1')}} {{list.length}} {{$t('validator.found')}}
            </p>
          </div>
          <div class="table-responsive mb-2 mb-md-0">
            <table class="table table-hover">
              <thead class="thead-light">
              <tr>
                <th scope="col">{{$t('validator.consensusAddress')}}</th>
                <th scope="col">{{$t('validator.feeAddress')}}</th>
                <th scope="col">{{$t('transaction.status')}}</th>
                <th scope="col">{{$t('validator.incoming')}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="list.length===0">
                <td colspan="4">
                  <div class="alert alert-warning" style='margin-bottom: 0' role="alert">{{$t('tableNoData')}}</div>
                </td>
              </tr>
              <tr v-else v-for="(item,index) in list" :key="index">
                <td>
                  <el-tooltip
                    :content="item.address"
                    placement="bottom" effect="dark">
                    <el-button type="text" class="font-weight-normal" style="padding: 0;color: #3F7FFF;">
                      <a href="javascript:;" class="hash-tag text-truncate text-dark font-size-3" >
                        <i class="fal fa-user"></i> {{item.address}}</a>
                    </el-button>
                  </el-tooltip>
                </td>
                <td>
                  <el-tooltip
                    :content="item.feeAddress"
                    placement="bottom" effect="dark">
                    <el-button type="text" class="font-weight-normal" style="padding: 0;color: #3F7FFF;">
                      <a :href="'/address/'+item.feeAddress" class="hash-tag text-truncate font-size-3">{{item.feeAddress}}</a>
                    </el-button>
                  </el-tooltip>
                </td>
                <td>{{item.status===1 ? $t('validator.tableActive'):$t('validator.jailed')}}</td>
                <td>
                  <value-format className="text-dark font-size-3" :unitCurrency="'DBOX'" :value="item.incomeHT ? String(item.incomeHT): '0'"></value-format>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getMinerByNumber } from '@/api/chains'
  import TablePagination from '@/components/TablePagination'
  import ValueFormat from '@/components/ValueFormat'

  export default {
    data() {
      return {
        list: [],
        timeFlag: false,
        loading: false,
        block: 0,
        totalIncoming: 0,
        validatorNum: 0,
        type: 0
      }
    },
    components: {
      TablePagination,
      ValueFormat
    },
    computed: {},
    mounted() {
      this.block = this.$route.params.id;
      this.type = this.block.substr(0, 2) === '0x' ? 1 : 2;
      this.validatorNum = this.$route.query.validatorNum;
      this.totalIncoming = this.$route.query.totalIncoming;
      this.getTxListData()
    },
    methods: {
      getTxListData() {
        this.loading = true;
        getMinerByNumber(this.block).then((res) => {
          this.loading = false;
          if (res.status === 1) {
            this.list = res.data;
          }
        })
      },
      switchAgeToDateTime() {
        this.timeFlag = !this.timeFlag
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
