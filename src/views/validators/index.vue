<template>
  <div>
    <div class="container">
      <div class="d-md-flex justify-content-between align-items-center py-3">
        <div class="mb-1 mb-md-0">
          <h1 class="h4 font-weight-normal mb-0">{{$t('validator.validatorsLeaderboard')}}
            <p class="mb-0 text-break small">
              <span class="small text-secondary"></span>
            </p>
          </h1>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <div class="mb-2 mb-md-0">
            <div class="no-footer">
              <div>
                <div class="col-sm-12 col-md-6 mt-n2 mb-2 text-secondary">
                  <div class="dataTables_info">
                    <i class="fa fa-spin fa-spinner fa-1x fa-pulse mr-1" :style="loading? '':'display: none;'"></i>
                    {{list.pageCount===0 ? $t('validator.validatorsNo') : $t('validator.showing')+' 1 '+$t('block.to')+(list.data?list.data.length:0)+ $t('validator.of')+ (list.data?list.data.length:0)+ $t('validator.validatorsFound')}}
                  </div>
                </div>
                <div class="col-sm-12 col-md-6"></div>
              </div>
              <div class="table-responsive">
                <table class="table table-hover no-footer"role="grid">
                  <thead class="thead-light">
                  <tr role="row">
                    <th scope="col" class="text-right sorting_disabled" >{{$t('account.thead1')}}
                    </th>
                    <th scope="col" class="sorting_disabled">{{$t('common.address')}}</th>
                    <th scope="col">{{$t('validator.firstBlock')}}
                    </th>
                    <th scope="col" class="sorting">{{$t('validator.lastBlock')}}
                    </th>
                    <th scope="col" class="sorting">{{$t('validator.stakingAmount')}}
                    </th>
                    <th scope="col"  class="sorting">30 {{$t('validator.mins')}}
                    </th>
                    <th scope="col" class="sorting">1 {{$t('validator.hours')}}
                    </th>
                    <th scope="col" class="sorting_asc">2 {{$t('validator.hours')}}
                    </th>
                    <th scope="col" class="sorting_disabled">{{$t('validator.active')}}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-if="list.pageCount===0">
                    <td colspan="8">
                      <div class="alert alert-warning" style='margin-bottom: 0' role="alert">{{$t('tableNoData')}}</div>
                    </td>
                  </tr>
                  <tr v-else v-for="(item,index) in list.data" :key="index">
                    <td>
                      <div class="text-right text-secondary">{{(index+1)+((Number(pageNo)-1)*Number(pageSize))===1 ? '🥇':(index+1)+((Number(pageNo)-1)*Number(pageSize))===2 ? '🥈':(index+1)+((Number(pageNo)-1)*Number(pageSize))===3?'🥉':'#'}} {{(index+1)+((Number(pageNo)-1)*Number(pageSize))}}</div>
                    </td>
                    <td>
                      <el-tooltip
                        :content="item.address"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal font-size-3" style="padding: 0;color: #3F7FFF;">
                          <a :href="'/address/'+item.address" class="hash-tag text-truncate">{{item.address}}</a>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td><a :href="'/block/'+item.firstBlock">{{item.firstBlock}}</a></td>
                    <td><a :href="'/block/'+item.lastBlock">{{item.lastBlock}}</a></td>
                    <td>
                      <value-format className="text-dark font-size-3" :value="item.coinsToString||'0'" :unitCurrency="'DBOX'"></value-format>
                    </td>
                    <td>{{item.thirtyMinutesOutputBlockNum || 0}}</td>
                    <td>{{item.oneHourOutputBlockNum || 0}}</td>
                    <td class="sorting_1">{{item.twoHoursOutputBlockNum || 0}}</td>
                    <td>
                      <span class="text-success" v-show="item.status===1"><i class="fal fa-signal-alt-3"></i>{{$t('common.yes')}}</span>
                      <span class="text-danger" v-show="item.status===2"><i class="fal fa-signal-slash"></i>{{$t('common.no')}}</span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="mt-3">
                  <div class="d-md-flex justify-content-between my-3">
                    <div class="text-secondary  mb-2 mb-md-0">
                      {{$t('pagination.recodeShow')}}
                      <select class="custom-select custom-select-xs mx-2" v-model="selectItem" @change="selectFn($event)">
                        <option selected="selected" value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                      {{$t('pagination.records')}}
                    </div>
                    <TablePagination @change="onChange" :total='list.pageCount||0' :current="list.pageNo||0"></TablePagination>
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
  import { getMinersList } from '@/api/chains'
  import TablePagination from '@/components/TablePagination'
  import ValueFormat from '@/components/ValueFormat'

  export default {
    data() {
      return {
        list: {},
        selectItem: this.$route.params.pageSize,
        pageSize: this.$route.params.pageSize,
        pageNo: this.$route.params.pageNo,
        loading: false
      }
    },
    components: {
      TablePagination,
      ValueFormat
    },
    computed: {},
    mounted() {
      this.getTxListData()
    },
    methods: {
      getTxListData(pageNo) {
        this.loading = true;
        const params = { pageSize: this.pageSize, pageNo: pageNo || this.pageNo };
        getMinersList(params).then(res => {
          this.loading = false;
          if (res.status === 1) {
            this.list = res.data
          }
        })
      },
      onChange(i) {
        this.pageNo = i;
        this.getTxListData(i);
        this.$router.push({ path: '/validators/' + this.pageSize + '/' + i, query: { ...this.$route.query }});
      },
      selectFn(e) {
        this.pageSize = e.target.value;
        this.pageNo = 1;
        this.getTxListData();
        this.$router.push({ path: '/validators/' + this.pageSize + '/' + this.pageNo, query: { ...this.$route.query }});
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dataTables_info {
    padding-top: 0.85em;
    white-space: nowrap;
  }
</style>
