<template>
  <div>
    <div class="container">
      <div class="d-md-flex justify-content-between align-items-center py-3">
        <div class="mb-1 mb-md-0">
          <h1 class="h4 font-weight-normal mb-0">
            {{$t('validator.validatorset')}}
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
          <div class="d-md-flex justify-content-between mb-4">
            <p class="mb-2 mb-md-0">
              <i class="fa fa-spin fa-spinner fa-1x fa-pulse mr-1" :style="loading? '':'display: none;'"></i>
              {{$t('validator.showing')}} {{pageSize}} {{$t('validator.total')}} {{total}} {{$t('validator.snapshots')}}
            </p>
            <TablePagination @change="onChange" :total='list.pageCount||0' :current="list.pageNo||0"></TablePagination>
          </div>
          <div class="table-responsive mb-2 mb-md-0">
            <table class="table table-hover">
              <thead class="thead-light">
              <tr>
                <th scope="col" v-if="!timeFlag">
                  <a href="javascript:;" @click="switchAgeToDateTime()">{{$t('common.time')}}</a>
                </th>
                <th scope="col" v-else>
                  <a href="javascript:;" @click="switchAgeToDateTime()">{{$t('common.age')}}</a>
                </th>
                <th scope="col">{{$t('common.block')}}</th>
                <th scope="col">{{$t('navBar.navigation3')}}</th>
                <th scope="col">{{$t('validator.totalJailed')}}</th>
                <th scope="col">{{$t('validator.totalIncoming')}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="list.pageCount===0">
                <td colspan="5">
                  <div class="alert alert-warning" style='margin-bottom: 0' role="alert">{{$t('tableNoData')}}</div>
                </td>
              </tr>
              <tr v-else v-for="(item,index) in list.data" :key="index">
                <td v-if="!timeFlag">
                  <el-tooltip
                    :content="item.timestamp|timeFormatUTC"
                    placement="bottom" effect="dark">
                    <el-button type="text" class="font-weight-normal font-size-3 text-dark" style="padding: 0">
                      <span >{{item.timestamp|timeFormat}}</span>
                    </el-button>
                  </el-tooltip>
                </td>
                <td v-else>
                  <el-tooltip
                    :content="item.timestamp|timeFormat"
                    placement="bottom" effect="dark">
                    <el-button type="text" class="font-weight-normal font-size-3 text-dark" style="padding: 0">
                      <span >{{item.timestamp?formatTime(item.timestamp):''}}</span>
                    </el-button>
                  </el-tooltip>
                </td>
                <td><a :href="'/block/'+item.number">{{item.number}}</a></td>
                <td><span class="u-label u-label--value u-label--secondary text-dark rounded mr-1"><a
                  :href="'/validatorset/snapshot/'+item.number+'?validatorNum='+(item.validatorNum||0)+'&totalIncoming='+(item.totalIncoming||0)"><i class="fal fa-user"></i> {{item.validatorNum||0}}</a></span></td>
                <td>
                  <value-format className="text-dark font-size-3" :value="item.jailedHT||'0'"></value-format>
                </td>
                <td>
                  <value-format className="text-dark font-size-3" :value="item.totalIncoming||'0'"></value-format> DBOX
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-3">
            <div class="d-md-flex justify-content-between my-3">
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
              <TablePagination @change="onChange" :total='list.pageCount||0' :current="list.pageNo||0"></TablePagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getValidatorConfigList } from '@/api/chains'
  import TablePagination from '@/components/TablePagination'
  import { formatTime } from '@/utils/index'
  import ValueFormat from '@/components/ValueFormat'

  export default {
    data() {
      return {
        list: [],
        formatTime: formatTime,
        selectItem: this.$route.params.pageSize,
        pageSize: this.$route.params.pageSize,
        pageNo: this.$route.params.pageNo,
        timeFlag: false,
        loading: false,
        total: 0
      }
    },
    components: {
      TablePagination,
      ValueFormat
    },
    computed: {},
    mounted() {
      this.loading = true;
      const params = { pageSize: this.pageSize, pageNo: this.pageNo };
      getValidatorConfigList(params).then((res) => {
        this.loading = false;
        if (res.status === 1) {
          this.list = res.data;
          this.total = res.data.data.length > 0 ? res.data.data[0].number + 1 : 0
        }
      })
    },
    methods: {
      getTxListData(pageNo) {
        this.loading = true;
        const params = { pageSize: this.pageSize, pageNo: pageNo || this.pageNo };
        getValidatorConfigList(params).then((res) => {
          this.loading = false;
          if (res.status === 1) {
            this.list = res.data;
          }
        })
      },
      onChange(i) {
        this.pageNo = i;
        this.getTxListData(i);
        this.$router.push({ path: '/validatorset/' + this.pageSize + '/' + i, query: { ...this.$route.query }});
      },
      selectFn(e) {
        this.pageSize = e.target.value;
        this.pageNo = 1;
        this.getTxListData();
        this.$router.push({ path: '/validatorset/' + this.pageSize + '/' + this.pageNo, query: { ...this.$route.query }});
      },
      switchAgeToDateTime() {
        this.timeFlag = !this.timeFlag
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
