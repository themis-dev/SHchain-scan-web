<template>
  <div class="container">
    <div class="list-title">
      <h1 class="h4">{{$t('common.blocks')}}
        <p class="mb-0 text-break small" v-show="address">
          <span class="small text-secondary">{{$t('home.miner')}} <a :href="'/address/'+address"><i class="fal fa-user"></i> {{address}}</a></span>
        </p>
      </h1>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="table-title">
          <p class="mb-2 mb-md-0"><i class="fa fa-spin fa-spinner fa-1x fa-pulse mr-1" :style="loading? '':'display: none;'"></i>
            {{$t('common.block')}} #{{last}} {{$t('block.to')}} #{{first}} ({{$t('block.total')}} {{total}} {{$t('block.blocks')}})
          </p>
          <TablePagination @change="onChange" :total='blockData.pageCount||0' :current="blockData.pageNo||0"></TablePagination>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="thead-light">
              <tr>
                <th scope="col">{{$t('common.block')}}</th>
                <th scope="col" v-if="!timeFlag">
                  <a href="javascript:;" @click="switchTime()">{{$t('common.time')}}</a>
                </th>
                <th scope="col" v-else>
                  <a href="javascript:;" @click="switchTime()">{{$t('common.age')}}</a>
                </th>
                <th scope="col">{{$t('common.txn')}}</th>
                <th scope="col">{{$t('common.validator')}}</th>
                <th scope="col">{{$t('common.gasUsed')}}</th>
                <th scope="col">{{$t('common.gasLimit')}}</th>
                <th scope="col">{{$t('common.reward')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="blockData.totalCount===0">
                <td colspan="7">
                  <div class="alert alert-warning" style='margin-bottom: 0' role="alert">{{$t('tableNoData')}}</div>
                </td>
              </tr>
              <tr v-else v-for="(item,index) in blockData.data" :key="index">
                <td>
                  <a :href="'/block/'+item.blockNumber">{{item.blockNumber}}</a>
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
                  <a :href="'/txs/25/1?block='+item.blockNumber">{{item.txs}}</a>
                </td>
                <td>
                  <el-tooltip
                    :content="item.miner"
                    placement="bottom" effect="dark">
                    <el-button type="text" class="font-weight-normal" style="padding: 0;color: #3F7FFF;">
                      <a class="hash-tag text-truncate" :href="'/address/'+item.miner">{{item.miner}}</a>
                    </el-button>
                  </el-tooltip>
                </td>
                <td>{{item.gasUsed}}
                  <span class="small text-secondary">({{formatDecimal(fxf(accDiv(item.gasUsed||0,item.gasLimit||0),100),2)}}%)</span>
                  <div class="progress" style="height:2px;margin-top: .25rem;">
                    <div class="progress-bar bg-primary" role="progressbar" :style="'width:'+fxf(accDiv(item.gasUsed,item.gasLimit),100)+'%;'" :aria-valuenow="fxf(accDiv(item.gasUsed,item.gasLimit),100)"
                         aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </td>
                <td>
                  {{item.gasLimit}}
                </td>
                <td>
                  <value-format className="text-dark font-size-3" :value="item.reward||'0'"></value-format> DBOX
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="list-title">
          <div class="text-secondary mb-2 mb-md-0">
            {{$t('pagination.recodeShow')}}
            <select class="custom-select custom-select-xs mx-2" v-model="selectItem" @change="selectFn($event)">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            {{$t('pagination.records')}}
          </div>
          <nav class="mb-4 mb-md-0" aria-label="page navigation">
            <TablePagination @change="onChange" :total='blockData.pageCount||0' :current="blockData.pageNo||0"></TablePagination>
          </nav>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { getBlockList, getLatestInfo, getMinedBlocksList, getMinedBlocksTotal } from '@/api/chains';
  import TablePagination from '@/components/TablePagination'
  import { formatTime, accDiv, fxf, formatDecimal } from '@/utils/index'
  import ValueFormat from '@/components/ValueFormat'

  export default {
    data() {
      return {
        blockData: {},
        selectItem: this.$route.params.pageSize,
        pageSize: this.$route.params.pageSize,
        pageNo: this.$route.params.pageNo,
        loading: false,
        timeFlag: false,
        formatTime: formatTime,
        formatDecimal: formatDecimal,
        accDiv: accDiv,
        fxf: fxf,
        first: 0,
        last: 0,
        total: 0,
        address: ''
      }
    },
    components: {
      TablePagination,
      ValueFormat
    },
    computed: {},
    mounted() {
      const address = this.$route.query.m;
      this.address = address;
      if (address) {
        this.getMinedBlockListData()
      } else {
        this.getBlockListData()
      }
    },
    methods: {
      getMinedBlockListData(pageNo) {
        this.loading = true;
        const params = { pageSize: this.pageSize, pageNo: pageNo || this.pageNo, address: this.address };
        getMinedBlocksList(params).then(res => {
          this.loading = false;
          if (res.status === 1) {
            this.blockData = res.data;
            this.first = res.data.data.length > 0 && res.data.data[0].blockNumber;
            this.last = res.data.data.length > 0 && res.data.data[res.data.data.length - 1].blockNumber
          }
        });
        getMinedBlocksTotal({ address: this.address }).then(response => {
          if (response.status === 1) {
            this.total = response.data.totalMinedBlockNum
          }
        })
      },
      getBlockListData(pageNo) {
        this.loading = true;
        const params = { pageSize: this.pageSize, pageNo: pageNo || this.pageNo };
        getBlockList(params).then(res => {
          this.loading = false;
          if (res.status === 1) {
            this.blockData = res.data;
            this.first = res.data.data.length > 0 && res.data.data[0].blockNumber
            this.last = res.data.data.length > 0 && res.data.data[res.data.data.length - 1].blockNumber
          }
        });
        getLatestInfo().then(res => {
          if (res.status === 1) {
            this.total = res.data.blockNumber + 1
          }
        })
      },
      onChange(i) {
        if (this.address) {
          this.getMinedBlockListData(i)
        } else {
          this.getBlockListData(i)
        }
        this.$router.push({ path: '/blocks/' + this.pageSize + '/' + i, query: { ...this.$route.query }});
      },
      selectFn(e) {
        this.pageSize = e.target.value;
        this.pageNo = 1
        if (this.address) {
          this.getMinedBlockListData()
        } else {
          this.getBlockListData()
        }
        this.$router.push({ path: '/blocks/' + this.pageSize + '/' + this.pageNo, query: { ...this.$route.query }});
      },
      switchTime() {
        this.timeFlag = !this.timeFlag
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
