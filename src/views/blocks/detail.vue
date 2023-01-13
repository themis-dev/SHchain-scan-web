<template>
  <div>
    <div class="container" style="padding-bottom: .75rem;padding-top: .75rem">
      <div class="h4" style="margin-bottom: 0">{{$t('common.block')}} <span
        class="small text-secondary">&nbsp;#{{blockData.number}}</span><br></div>
    </div>
    <div class="container">
      <div class="card">
        <div class="card-header" style="padding: 0">
          <ul class="nav nav-custom" id="nav_tabs">
            <li class="nav-item">
              <a class="nav-link active" href="#overview" data-toggle="tab">{{$t('block.overview')}}</a>
            </li>
          </ul>
        </div>
        <div class="tab-content">
          <div class="tab-pane fade show active" id="overview">
            <div class="card-body">
              <div class="row align-items-center" style="margin-top: .25rem">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal" style="margin-bottom: .25rem">
                  <el-tooltip
                    :content="$t('block.blockHeightTip')"
                    placement="top" effect="dark">
                    <el-button type="text"><i class="fal fa-question-circle text-secondary"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('block.blockHeight')}}:
                </div>
                <div class="col-md-9">
                  <span class="font-weight-sm-bold" style="margin-right: .5rem">{{blockData.number}}</span>
                  <a class="btn btn-xs btn-icon btn-soft-info" :class="blockData.number===0?'disabled':''"
                     style="margin-right: .25rem"
                     :href="'/block/'+ (blockData.number===0 ? blockData.number :blockData.number-1)"><i
                    class="fa fa-chevron-left btn-icon__inner"></i></a>
                  <a class="btn btn-xs btn-icon btn-soft-info" :class="blockData.number===total?'disabled':''" style="margin-right: .25rem"
                     :href="'/block/'+(blockData.number===total? blockData.number:blockData.number+1)"><i class="fa fa-chevron-right btn-icon__inner"></i></a>
                </div>
              </div>
              <hr class="hr-space">
              <div class="row align-items-center">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1">
                  <el-tooltip
                    :content="$t('block.timestampTip')"
                    placement="top" effect="dark">
                    <el-button type="text"><i class="fal fa-question-circle text-secondary"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('block.timestamp')}}:
                </div>
                <div class="col-md-9">
                  <el-tooltip
                    v-if="blockData.timestamp"
                    :content="moment(blockData.timestamp).utc().format('YYYY-MM-DD HH:mm:ss')+' UTC'"
                    placement="top" effect="dark">
                    <el-button type="text" class="text-dark font-weight-normal">
                      <i class="far fa-clock small mr-1"></i>{{formatTime(blockData.timestamp)}} ( {{ moment.parseZone(blockData.timestamp).local().format('YYYY-MM-DD HH:mm:ss')
                      }} )
                    </el-button>
                  </el-tooltip>
                </div>
              </div>
              <hr class="hr-space">
              <div class="row align-items-center">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                  <el-tooltip
                    :content="$t('block.hashTip')"
                    placement="top" effect="dark">
                    <el-button type="text"><i class="fal fa-question-circle text-secondary"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('block.hash')}}:
                </div>
                <div class="col-md-9">
                  {{blockData.hash}}
                </div>
              </div>
              <hr class="hr-space">
              <div class="row align-items-center">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                  <el-tooltip
                    :content="$t('block.transactionTip')"
                    placement="top" effect="dark">
                    <el-button type="text"><i class="fal fa-question-circle text-secondary"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('block.transactions')}}:
                </div>
                <div class="col-md-9">
                  <a class="u-label u-label--value u-label--primary rounded my-1" :href="'/txs/25/1?block='+blockData.number">{{blockData.txs}} {{$t('address.tab1Tip2')}}</a>
                </div>
              </div>
              <hr class="hr-space mt-2">
              <div class="row align-items-center">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                  <el-tooltip
                    :content="$t('block.validatedTip')"
                    placement="top" effect="dark">
                    <el-button type="text"><i class="fal fa-question-circle text-secondary"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('block.validated')}}:
                </div>
                <div class="col-md-9">
                  <a :href="'/address/'+blockData.miner">{{blockData.miner}}</a>
                </div>
              </div>
              <hr class="hr-space">
              <div class="row align-items-center">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                  <el-tooltip
                    :content="$t('block.blockRewardTip')"
                    placement="top" effect="dark">
                    <el-button type="text"><i class="fal fa-question-circle text-secondary"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('block.blockReward')}}:
                </div>
                <div class="col-md-9">
                  <value-format className="text-dark font-size-3 text-break text-left" :unitCurrency="'DBOX'"  :value="blockData.rewardToString||'0'"></value-format>
                </div>
              </div>
              <hr class="hr-space">
              <div class="row align-items-center d-none">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e"><i
                  class="fal fa-question-circle text-secondary mr-1"></i>Uncles Reward:
                </div>
                <div class="col-md-9">
                  <value-format className="text-dark font-size-3 text-break" :unitCurrency="'DBOX'"  :value="blockData.rewardToString||'0'"></value-format>
                </div>
              </div>
              <hr class="hr-space d-none">
              <div class="row align-items-center">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                  <el-tooltip
                    :content="$t('block.difficultyTip')"
                    placement="top" effect="dark">
                    <el-button type="text"><i class="fal fa-question-circle text-secondary"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('block.difficulty')}}:
                </div>
                <div class="col-md-9">
                  {{blockData.difficulty}}
                </div>
              </div>
              <hr class="hr-space">
              <div class="row align-items-center">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                  <el-tooltip
                    :content="$t('block.totalDifficultyTip')"
                    placement="top" effect="dark">
                    <el-button type="text"><i class="fal fa-question-circle text-secondary"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('block.totalDifficulty')}}:
                </div>
                <div class="col-md-9">
                  {{blockData.totalDifficulty}}
                </div>
              </div>
              <hr class="hr-space">
              <div class="row align-items-center">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                  <el-tooltip
                    :content="$t('block.sizeTip')"
                    placement="top" effect="dark">
                    <el-button type="text"><i class="fal fa-question-circle text-secondary"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('block.size')}}:
                </div>
                <div class="col-md-9">
                  {{blockData.size}} bytes
                </div>
              </div>
              <hr class="hr-space">
              <div class="row align-items-center">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                  <el-tooltip
                    :content="$t('block.gasUsedTip')"
                    placement="top" effect="dark">
                    <el-button type="text"><i class="fal fa-question-circle text-secondary"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('block.gasUsed')}}:
                </div>
                <div class="col-md-9">
                  {{blockData.gasUsed}} ( {{ blockData.gasLimit? formatDecimal(fxf(accDiv(blockData.gasUsed||0, blockData.gasLimit||0),100),2):'0'}}%)
                </div>
              </div>
              <hr class="hr-space">
              <div class="row align-items-center">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                  <el-tooltip
                    :content="$t('block.gasLimitTip')"
                    placement="top" effect="dark">
                    <el-button type="text"><i class="fal fa-question-circle text-secondary"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('block.gasLimit')}}:
                </div>
                <div class="col-md-9">
                  {{blockData.gasLimit}}
                </div>
              </div>
              <hr class="hr-space">
              <div class="row align-items-center">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                  <el-tooltip
                    :content="$t('block.dataTip')"
                    placement="top" effect="dark">
                    <el-button type="text"><i class="fal fa-question-circle text-secondary"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('block.data')}}:
                </div>
                <div class="col-md-9">
                  <textarea readonly="" spellcheck="false"
                            class="form-control bg-light text-secondary text-monospace p-3" rows="6" id="extraData">
                    {{blockData.extraData}}
                  </textarea>
                </div>
              </div>
              <hr class="hr-space">
              <div class="collapse  " id="collapsePanel">
                <div class="row align-items-center">
                  <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                    <el-tooltip
                      :content="$t('block.parentHashTip')"
                      placement="top" effect="dark">
                      <el-button type="text"><i class="fal fa-question-circle text-secondary"></i>
                      </el-button>
                    </el-tooltip>
                    {{$t('block.parentHash')}}:
                  </div>
                  <div class="col-md-9">
                    <a :href="'/block/'+blockData.parentHash">{{blockData.parentHash}}</a>
                  </div>
                </div>
                <hr class="hr-space">
                <div class="row align-items-center">
                  <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                    <el-tooltip
                      :content="$t('block.sha3UnclesTip')"
                      placement="top" effect="dark">
                      <el-button type="text"><i class="fal fa-question-circle text-secondary"></i>
                      </el-button>
                    </el-tooltip>
                    {{$t('block.sha3Uncles')}}:
                  </div>
                  <div class="col-md-9">
                    {{blockData.sha3Uncles}}
                  </div>
                </div>
                <hr class="hr-space">
                <div class="row align-items-center">
                  <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                    <el-tooltip
                      :content="$t('block.nonceTip')"
                      placement="top" effect="dark">
                      <el-button type="text"><i class="fal fa-question-circle text-secondary"></i>
                      </el-button>
                    </el-tooltip>
                    {{$t('block.nonce')}}:
                  </div>
                  <div class="col-md-9">
                    {{blockData.nonce}}
                  </div>
                </div>
                <hr class="hr-space">
              </div>
              <span>
                <a class="d-block collapsed" id="collapsedLink" data-toggle="collapse" href="#collapsePanel"
                   role="button" aria-expanded="false" aria-controls="collapsePanel">
                <span>
                {{$t('block.click')}}<span class="card-arrow-more">{{$t('block.more')}}</span><span class="card-arrow-less">{{$t('block.less')}}</span>
                <span class="card-btn-arrow card-btn-arrow--up ml-2">
                <span class="fas fa-arrow-up small"></span>
                </span>
                </span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getSearch, getLatestInfo } from '@/api/chains';
  import { formatTime, accDiv, fxf, formatDecimal } from '@/utils/index'
  import moment from 'moment'
  import ValueFormat from '@/components/ValueFormat'

  export default {
    data() {
      return {
        blockData: {},
        formatTime: formatTime,
        formatDecimal: formatDecimal,
        moment: moment,
        total: 0,
        accDiv: accDiv,
        fxf: fxf
      }
    },
    components: {
      ValueFormat
    },
    mounted() {
      const blockNum = this.$route.params.id;
      getSearch(blockNum).then(res => {
        if (res.status === 1) {
          this.blockData = res.data
        }
      });
      getLatestInfo().then(res => {
        if (res.status === 1) {
          this.total = res.data.blockNumber;
        }
      })
    },
    methods: {
      onChange(i) {
        this.getData(i)
      },
      selectFn(e) {
        this.pageSize = e.target.value;
        this.getData()
      },
      switchTime() {
        this.timeFlag = !this.timeFlag
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-button {
    padding: 0;
  }

  .el-tooltip__popper {
    word-wrap: break-word;
    word-break: normal;
    max-width: 17rem
  }
  .el-tooltip__popper.is-light {
    border: 1px solid lightgrey;
  }
</style>
