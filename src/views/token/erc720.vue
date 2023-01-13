<template>
  <div>
    <div class="container">
      <div class="list-title">
        <h1 class="h4 font-weight-normal mb-0">
          {{$t('common.token')}}{{$t('address.tracker')}}
          <a class="u-label u-label--xs u-label--secondary rounded color-strong ml-2">ARC-721</a>
        </h1>
      </div>
    </div>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <div class="table-title">
            <p class="mb-2 mb-md-0">
              <i class="fa fa-spin fa-spinner fa-1x fa-pulse mr-1" :style="loading? '':'display: none;'"></i>
              {{$t('account.accountTip1')}}  {{list.totalCount||0}} {{$t('token.tip')}}
            </p>
            <TablePagination @change="onChange" :total='list.pageCount||0' :current="list.pageNo||0"></TablePagination>
          </div>
          <div class="table-responsive">
            <table class="table table-hover" style="width: 100%">
              <thead class="thead-light">
              <tr>
                <th scope="col">{{$t('account.thead1')}}</th>
                <th scope="col">{{$t('common.token')}}</th>
                <th scope="col">{{$t('common.address')}}</th>
                <th scope="col">
                  {{$t('token.totalTransfer')}}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="list.totalCount===0">
                <td colspan="8">
                  <div class="alert alert-warning" style='margin-bottom: 0' role="alert">{{$t('tableNoData')}}</div>
                </td>
              </tr>
              <tr v-else v-for="(item,index) in list.data" :key="index">
                <td>{{index+1}}</td>
                <td>
                  <a :href="'/token/'+item.address+'/25/1'">{{item.tokenName}}</a>
                </td>
                <td>
                  <a :href="'/token/'+item.address+'/25/1'">{{item.address}}</a>
                </td>
                <td>{{item.tokenTransferNum}}</td>
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
              <TablePagination @change="onChange" :total='list.pageCount||0' :current="list.pageNo||0"></TablePagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getTokenList } from '@/api/chains'
  import TablePagination from '@/components/TablePagination'
  import { formatTime } from '@/utils/index'

  export default {
    components: {
      TablePagination
    },
    data() {
      return {
        list: {},
        selectItem: this.$route.params.pageSize,
        pageSize: this.$route.params.pageSize,
        pageNo: this.$route.params.pageNo,
        loading: false,
        timeFlag: false,
        formatTime: formatTime,
        total: {}
      }
    },
    computed: {},
    mounted() {
      this.getData();
    },
    methods: {
      getData(pageNo) {
        this.loading = true;
        const params = { pageSize: this.pageSize, pageNo: pageNo || this.pageNo, type: 4 };
        getTokenList(params).then(res => {
          this.loading = false;
          if (res.status === 1 && res.data) {
            this.list = res.data;
          }
        });
      },
      onChange(i) {
        this.pageNo = i;
        this.getData(i);
        this.$router.push({ path: '/tokentxns-nft/' + this.pageSize + '/' + i, query: { ...this.$route.query }});
      },
      selectFn(e) {
        this.pageSize = e.target.value;
        this.pageNo = 1;
        this.getData();
        this.$router.push({ path: '/tokentxns-nft/' + this.pageSize + '/' + this.pageNo, query: { ...this.$route.query }});
      },
      switchTime() {
        this.timeFlag = !this.timeFlag
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
