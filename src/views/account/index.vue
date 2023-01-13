<template>
  <div>
    <div class="container">
      <div class="list-title">
        <h1 class="h4 font-weight-normal mb-0">
          {{$t('account.title')}}
        </h1>
      </div>
    </div>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <div class="table-title">
            <p class="mb-2 mb-md-0">
              <i class="fa fa-spin fa-spinner fa-1x fa-pulse mr-1" :style="loading? '':'display: none;'"></i>
              {{$t('account.accountTip1')}} {{accountData.totalCount > 0 ? (accountData.totalCount):'0'}} {{$t('account.accountTip2')}}
              <span class="d-block text-secondary small">({{$t('account.accountTip3')}})</span>
            </p>
            <TablePagination @change="onChange" :total='accountData.pageCount||0' :current="accountData.pageNo||0"></TablePagination>
          </div>
          <div class="table-responsive">
            <table class="table table-hover" style="width: 100%">
              <thead class="thead-light">
              <tr>
                <th scope="col">{{$t('account.thead1')}}</th>
                <th scope="col">{{$t('account.thead2')}}</th>
                <th scope="col">{{$t('account.thead3')}}</th>
                <th scope="col">Percentage</th>
                <th scope="col">{{$t('account.thead4')}}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="accountData.totalCount===0">
                <td colspan="8">
                  <div class="alert alert-warning" style='margin-bottom: 0' role="alert">{{$t('tableNoData')}}</div>
                </td>
              </tr>
              <tr v-else v-for="(item,index) in accountData.data" :key="index">
                <td>{{(index+1)+((Number(pageNo)-1)*Number(pageSize))}}</td>
                <td>
                  <a :href="'/address/'+item.address">{{item.address}}</a>
                </td>
                <td>
                  <value-format className="text-dark font-size-3" :unitCurrency="'DBOX'" :value="item.value||'0'"></value-format>
                </td>
                <td>{{((item.balance/12000000000)*100).toFixed(8)}}%</td>
                <td>{{item.txNum||0}}</td>
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
              <TablePagination @change="onChange" :total='accountData.pageCount||0' :current="accountData.pageNo||0"></TablePagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getTopAccountList } from '@/api/chains'
  import TablePagination from '@/components/TablePagination'
  import { formatTime, formatDecimal } from '@/utils/index'
  import ValueFormat from '@/components/ValueFormat'

  export default {
    components: {
      TablePagination,
      ValueFormat
    },
    data() {
      return {
        accountData: {},
        selectItem: this.$route.params.pageSize,
        pageSize: this.$route.params.pageSize,
        pageNo: this.$route.params.pageNo,
        loading: false,
        timeFlag: false,
        formatTime: formatTime,
        formatDecimal: formatDecimal
      }
    },
    computed: {},
    mounted() {
      this.getData();
    },
    methods: {
      getData(pageNo) {
        this.loading = true;
        const params = { pageSize: this.pageSize, pageNo: pageNo || this.pageNo };
        getTopAccountList(params).then(res => {
          this.loading = false;
          if (res.status === 1 && res.data) {
            this.accountData = res.data;
          }
        });
      },
      onChange(i) {
        this.pageNo = i;
        this.getData(i);
        this.$router.push({ path: '/accounts/' + this.pageSize + '/' + i, query: { ...this.$route.query }});
      },
      selectFn(e) {
        this.pageSize = e.target.value;
        this.pageNo = 1;
        this.getData();
        this.$router.push({ path: '/accounts/' + this.pageSize + '/' + this.pageNo, query: { ...this.$route.query }});
      },
      switchTime() {
        this.timeFlag = !this.timeFlag
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
