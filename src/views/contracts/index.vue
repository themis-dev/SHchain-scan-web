<template>
  <div>
    <div class="list-title">
      <div class="container">
        <h1 class="h4 font-weight-normal mb-0">{{$t('contract.Contracts')}} <span class="small text-secondary">{{$t('contract.tip')}}</span>
        </h1>
      </div>
    </div>
    <div id="ContentPlaceHolder1_mainrow" class="container">
      <div class="card">
        <div class="card-body">
          <div class="tab-content">
            <div class="tab-pane fade show active" id="transfers" role="tabpanel"
                 aria-labelledby="contractsverified-tab">
              <div class="d-md-flex justify-content-between mb-4">
                <p class="mb-2 mb-md-0">
                  <i class="fa fa-spin fa-spinner fa-1x fa-pulse mr-1" :style="loading? '':'display: none;'"></i>
                  &nbsp;{{$t('contract.tip1')}} 500 {{$t('contract.tip2')}}
                </p>
                <nav aria-label="page navigation">
                  <TablePagination @change="onChange" :total='contractData.pageCount||0' :current="contractData.pageNo||0"></TablePagination>
                </nav>
              </div>
              <div class="table-responsive mb-2 mb-md-0">
                <table class="table table-hover">
                  <thead class="thead-light">
                  <tr>
                    <th scope="col" width="1">{{$t('common.address')}}</th>
                    <th scope="col">{{$t('contract.thead2')}}</th>
                    <th scope="col">{{$t('contract.thead3')}}</th>
                    <th scope="col">{{$t('contract.thead4')}}</th>
                    <th scope="col">{{$t('common.balance')}}</th>
                    <th scope="col">{{$t('contract.thead5')}}</th>
                    <th scope="col">{{$t('contract.thead6')}}</th>
                    <th scope="col">{{$t('contract.thead7')}}</th>
                    <th scope="col">{{$t('contract.thead8')}}
                      <el-tooltip
                        :content="$t('contract.licenseType')"
                        placement="top" effect="dark">
                        <el-button style="color: #6c757e;padding: 0;"  type="text">
                          <span href="javascript:;"><i class="far fa-info-circle"></i></span>
                        </el-button>
                      </el-tooltip>
                      </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-if="contractData.totalCount===0">
                    <td colspan="9">
                      <div class="alert alert-warning" style='margin-bottom: 0' role="alert">{{$t('tableNoData')}}</div>
                    </td>
                  </tr>
                  <tr v-else v-for="(item,index) in contractData.data" :key="index">
                    <td>
                      <el-tooltip
                        :content="$t('contract.verifiedCode')"
                        placement="top" effect="dark">
                        <el-button style="padding: 0;"  type="text">
                          <span size="2"><i class="fas fa-check-circle text-success"></i></span>
                        </el-button>
                      </el-tooltip>
                      <el-tooltip
                        :content="item.address"
                        placement="top" effect="dark">
                        <el-button style="padding: 0;margin: 0"  type="text">
                          <a :href="'/address/'+item.address"
                              class="hash-tag text-truncate font-weight-normal" style="color: #3F7FFF;">{{item.address}}</a>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td>{{item.contractName}}</td>
                    <td>{{item.compiler}}</td>
                    <td>
                       {{item.compilerVersion}}
                    </td>
                    <td>
                      <value-format className="text-dark font-size-3" :value="item.balance || '0'"></value-format> DBOX
                    </td>
                    <td>{{item.txNum||0}}</td>
                    <td>
                      <el-tooltip
                        v-show="item.optimization===2"
                        :content="$t('contract.optimizationEnabled')"
                        placement="top" effect="dark">
                        <el-button style="padding: 0;margin: 0"  type="text">
                          <span class="btn btn-xs btn-icon btn-soft-secondary rounded-circle">
                            <i class="fas fa-bolt btn-icon__inner"></i></span>
                        </el-button>
                      </el-tooltip>
                      <el-tooltip
                        v-show="item.constructor===2"
                        :content="$t('contract.constructorArguments')"
                        placement="top" effect="dark">
                        <el-button style="padding: 0;margin: 0"  type="text">
                         <span class="btn btn-xs btn-icon btn-soft-secondary rounded-circle"><i
                           class="fas fa-wrench btn-icon__inner"></i></span>
                        </el-button>
                      </el-tooltip>
                      <span v-show=" item.optimization===1 && item.constructor===1 || !item.optimization && ! item.constructor">-</span>
                       </td>
                    <td>
                      <el-tooltip
                        :content="item.timestamp|timeFormatUTC"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark font-size-3" style="padding: 0">
                          <span>{{item.timestamp|timeFormat}}</span>
                        </el-button>
                      </el-tooltip>
                    <td>{{item.license||'None'}}</td>
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
                  <TablePagination @change="onChange" :total='contractData.pageCount||0' :current="contractData.pageNo||0"></TablePagination>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVerifiedContractsList } from '@/api/chains'
import TablePagination from '@/components/TablePagination'
import { formatTime } from '@/utils/index'
import ValueFormat from '@/components/ValueFormat'

export default {
  components: {
    TablePagination,
    ValueFormat
  },
  data() {
    return {
      contractData: {},
      selectItem: this.$route.params.pageSize,
      pageSize: this.$route.params.pageSize,
      pageNo: this.$route.params.pageNo,
      loading: false,
      timeFlag: false,
      formatTime: formatTime,
      total: {},
      active: false
    }
  },
  computed: {},
  mounted() {
    this.getData()
  },
  methods: {
    getData(pageNo) {
      this.loading = true;
      const params = { pageSize: this.pageSize, pageNo: pageNo || this.pageNo };
      getVerifiedContractsList(params).then(res => {
        this.loading = false;
        if (res.status === 1) {
          this.contractData = res.data;
        }
      });
    },
    onChange(i) {
      this.pageNo = i;
      this.getData(i);
      this.$router.push({ path: '/contractsVerified/' + this.pageSize + '/' + i, query: { ...this.$route.query }});
    },
    selectFn(e) {
      this.pageSize = e.target.value;
      this.pageNo = 1;
      this.getData();
      this.$router.push({ path: '/contractsVerified/' + this.pageSize + '/' + this.pageNo, query: { ...this.$route.query }});
    },
    switchTime() {
      this.timeFlag = !this.timeFlag
    },
    dropdown() {
      this.active = !this.active
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
