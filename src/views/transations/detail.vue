<template>
  <div>
    <div class="container" style="padding-bottom: .75rem;padding-top: .75rem">
      <input :value='txData.thash' style='opacity: 0;position: absolute;top:0' id="copyAddress">
      <input :value='txData.fromAddr' style='opacity: 0;position: absolute;top:0' id="copyAddress1">
      <input :value='txData.toAddr||txData.contractAddress' style='opacity: 0;position: absolute;top:0' id="copyAddress2">
      <div style="margin-bottom: 0" class="h4">{{$t('transaction.detail')}} </div>
    </div>
    <div class="container">
      <div class="card">
        <div class="card-header" style="padding: 0">
          <ul class="nav nav-custom">
            <li class="nav-item">
              <a class="nav-link" :class="!hash||hash === 'home'?'active':''" @click="tabFuc('#home')" data-toggle="tab" href="#home">{{$t('transaction.overview')}}</a>
            </li>
            <li class="nav-item" v-show="txLogs.length>0">
              <a class="nav-link" :class="hash === 'eventlog'?'active':''" @click="tabFuc('#eventlog')" data-toggle="tab" href="#eventlog" aria-controls="eventlog" aria-selected="false">{{$t('address.tab6Tip3')}} ({{txLogs.length}})</a>
            </li>
          </ul>
        </div>
        <div class="tab-content">
          <div class="tab-pane fade" :class="!hash||hash === 'home'?'show active':''"  id="home" role="tabpanel">
            <div class="card-body">
              <div class="row align-items-center mt-1">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0">
                  <el-tooltip
                    :content="$t('transaction.txHashTip')"
                    placement="top" effect="dark">
                    <el-button type="text"><i class="fal fa-question-circle text-secondary"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('transaction.txHash')}}:
                </div>
                <div class="col-md-9">
                  <span class="mr-1">{{txData.thash}}</span>
                  <el-tooltip
                    :content="$t('transaction.txHashTip1')"
                    placement="top" effect="dark">
                    <el-button type="text">
                      <a class="text-muted" href="javascript:;" @click="copyData">
                        <span class="far" :class="!copy ?'fa-copy':'fa-check'"></span>
                      </a>
                    </el-button>
                  </el-tooltip>
                </div>
              </div>
              <hr class="hr-space">
              <div class="row align-items-center mn-3">
                <div class="col-auto col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0">
                  <el-tooltip
                    :content="$t('transaction.statusTip')"
                    placement="top" effect="dark">
                    <el-button type="text"><i
                      class="fal fa-question-circle text-secondary d-none d-sm-inline-block mr-1"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('transaction.status')}}:
                </div>
                <div class="col col-md-9">
                  <el-tooltip
                    :content="$t('transaction.statusTip1')"
                    placement="top" effect="dark">
                    <el-button type="text">
                      <span v-if="txData.txstatus && txData.txstatus!=='0x1'"
                            class="u-label u-label--sm u-label--danger rounded"><i class="fa fa-times-circle mr-1"></i>{{$t('common.fail')}}</span>
                      <span class="u-label u-label--sm u-label--secondary rounded"
                            v-else-if="!txData.blockHash && !txData.blockNumber"><i
                        class="fa fa-dot-circle mr-1"></i>{{$t('common.pending')}}</span>
                      <span class="u-label u-label--sm u-label--success rounded" v-else><i
                        class="fa fa-check-circle mr-1"></i>{{$t('common.success')}}</span>
                    </el-button>
                  </el-tooltip>
                </div>
              </div>
              <hr class="hr-space">
              <div class="row align-items-center">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0">
                  <el-tooltip
                    :content="$t('transaction.blockTip')"
                    placement="top" effect="dark">
                    <el-button type="text"><i
                      class="fal fa-question-circle text-secondary d-none d-sm-inline-block mr-1"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('common.block')}}:
                </div>
                <div class="col-md-9">
                  <i v-if="!txData.blockHash && !txData.blockNumber">
                    ({{$t('common.pending')}})
                  </i>
                  <div v-else>
                    <a :href="'/block/'+txData.blockNumber">{{txData.blockNumber}}</a>
                    <el-tooltip
                      :content="$t('transaction.blockTip1')"
                      placement="top" effect="dark">
                      <el-button type="text">
                        <span class="u-label u-label--value u-label--secondary rounded mr-1">{{txData.confirmations || 0}} {{$t('transaction.blockConfirm')}}</span>
                      </el-button>
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <hr class="hr-space" v-show="txData.timestamp">
              <div class="row align-items-center" v-show="txData.timestamp">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0">
                  <el-tooltip
                    :content="$t('transaction.timestampTip')"
                    placement="top" effect="dark">
                    <el-button type="text">
                      <i class="fal fa-question-circle text-secondary d-none d-sm-inline-block mr-1"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('block.timestamp')}}:
                </div>
                <div class="col-md-9">
                  <el-tooltip
                    v-if="txData.timestamp"
                    :content="moment(txData.timestamp*1000).utc().format('YYYY-MM-DD HH:mm:ss')+' UTC'"
                    placement="top" effect="dark">
                    <el-button type="text" class="text-dark">
                      <i class="far fa-clock small mr-1"></i>{{formatTime(txData.timestamp * 1000)}} ( {{moment.parseZone(txData.timestamp *1000).local().format('YYYY-MM-DD HH:mm:ss')
                      }} )
                    </el-button>
                  </el-tooltip>
                </div>
              </div>
              <hr class="hr-space">
              <div class="row align-items-center">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0">
                  <el-tooltip
                    :content="$t('transaction.fromTip')"
                    placement="top" effect="dark">
                    <el-button type="text">
                      <i class="fal fa-question-circle text-secondary d-none d-sm-inline-block mr-1"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('common.from')}}:
                </div>
                <div class="col-md-9">
                  <a class="mr-1" :href="'/address/'+txData.fromAddr">{{txData.fromAddr}}</a>
                  <el-tooltip
                    :content="$t('transaction.fromTip1')"
                    placement="top" effect="dark">
                    <el-button type="text">
                      <a class="text-muted" href="javascript:;" @click="copyData1">
                        <span class="far" :class="!copy1 ?'fa-copy':'fa-check'"></span>
                      </a>
                    </el-button>
                  </el-tooltip>
                </div>
              </div>
              <hr class="hr-space">
              <div class="row">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0">
                  <el-tooltip
                    :content="$t('transaction.toTip')"
                    placement="top" effect="dark">
                    <el-button type="text">
                      <i class="fal fa-question-circle text-secondary d-none d-sm-inline-block mr-1"></i>
                    </el-button>
                  </el-tooltip>
                  {{txData.accountType === 1 && txData.toAddr ? $t('common.to') : $t('transaction.to')}}
                </div>
                <div class="col-md-9">
                   <span v-if="!txData.toAddr">[{{$t('common.contract')}}
                    <a :href="'/address/'+txData.contractAddress" class="wordwrap mr-1">{{txData.contractAddress}}</a>
                      {{$t('transaction.created')}}]
                  </span>
                  <span v-else-if="txData.isToContract">
                    <a href="#internal" data-target="#nav_tabs"
                       data-type="static">
                      <!--<i class="fa fa-search-plus small mb-2" data-toggle="tooltip" title=""-->
                      <!--data-original-title="View Contract Internal Transactions"></i>-->
                    </a>{{$t('common.contract')}}
                    <a :href="'/address/'+txData.toAddr" class="wordwrap mr-1">{{txData.toAddr}}</a>
                  </span>
                  <span v-else><a :href="'/address/'+txData.toAddr" class="wordwrap mr-1">{{txData.toAddr}}</a></span>
                  <el-tooltip
                    :content="$t('transaction.toTip1')"
                    placement="top" effect="dark">
                    <el-button type="text">
                      <a class="text-muted" href="javascript:;" @click="copyData2">
                        <span class="far" :class="!copy2 ?'fa-copy':'fa-check'"></span>
                      </a>
                    </el-button>
                  </el-tooltip>
                </div>
              </div>
              <hr class="hr-space" v-show="txData.tokenTxes">
              <div class="row" v-show="txData.tokenTxes">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0">
                  <div class="d-flex align-items-center"><span class="mr-1" title="100 Token Transfers">
                     <el-tooltip
                       :content="$t('transaction.tokensTransferredTip')"
                       placement="top" effect="dark">
                    <el-button type="text">
                      <i class="fal fa-question-circle text-secondary d-none d-sm-inline-block mr-1"></i>
                    </el-button>
                  </el-tooltip>
                   {{$t('transaction.tokensTransferred')}}: </span><span v-if="txData.tokenTxes&&txData.tokenTxes.length>1"
                                                    class="badge badge-pill badge-secondary">{{txData.tokenTxes.length}}</span>
                  </div>
                </div>
                <div class="col-md-9">
                  <div style="max-height: 300px; overflow:auto;">
                    <div>
                      <ul class="list-unstyled">
                        <li class="media align-items-baseline mb-2" v-for="(item,index) in txData.tokenTxes"
                            :key="index">
                            <span class="row-count text-secondary small mr-1">
                              <i class="fa fa-caret-right"></i>
                            </span>
                          <div class="media-body">
                            <span class=""><b>{{$t('common.from')}}</b> </span>
                            <span class="hash-tag text-truncate  mr-1">
                                  <el-tooltip
                                    :content="item.tokenFrom ? item.tokenFrom :'0x0000000000000000000000000000000000000000'"
                                    placement="top" effect="dark">
                                    <el-button type="text">
                                        <a :href="'/address/'+item.tokenFrom">
                                        <span class="hash-tag text-truncate hash-tag-custom-from tooltip-address">
                                      {{item.tokenFrom ? item.tokenFrom :'0x0000000000000000000000000000000000000000'}}</span>
                                        </a>
                                    </el-button>
                                  </el-tooltip>
                              </span>
                            <span class="mr-1"><b>{{$t('common.to')}}</b> </span>
                            <span class="hash-tag text-truncate ">
                                <el-tooltip
                                  :content="item.tokenTo ? item.tokenTo : '0x0000000000000000000000000000000000000000'"
                                  placement="top" effect="dark">
                                    <el-button type="text">
                                        <a :href="'/address/'+item.tokenTo">
                                        <span class="hash-tag text-truncate hash-tag-custom-to tooltip-address">
                                          {{item.tokenTo ? item.tokenTo : '0x0000000000000000000000000000000000000000'}}</span>
                                   </a>
                                    </el-button>
                                  </el-tooltip>
                              </span>
                            <span class="mr-1">
                                <b>For</b>
                              </span>
                              <span v-show="item.txType === 4">ARC-721 TokenID  [<value-format className="text-dark font-size-3 text-left text-break" :value="item.tokenValueToString||'0'"></value-format>]</span>
                            <span class="mr-1" v-show="item.txType !== 5 && item.txType !== 4">
                              <value-format className="text-dark font-size-3 text-left text-break" :value="item.tokenValueToString||'0'"></value-format>
                              </span>
                            <a :href="'/token/'+item.tokenAddress+'/25/1'">
                              <span><font color="">{{item.tokenName}}</font></span>
                            </a>
                            <div v-show="item.txType === 5" v-for="arcItem in item.arcData" v-bind:key='arcItem.ids'>ARC-1155 For {{arcItem.tokenValue}} of Token ID [{{arcItem.ids}}] {{item.tokenName}}</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <span class="small text-muted"
                        v-show="txData.tokenTxes&&txData.tokenTxes.length>11">{{$t('transaction.scrollMore')}} <i
                    class="fa fa-angle-double-down small ml-1"></i></span></div>
              </div>
              <hr class="hr-space">
              <div class="row align-items-center mn-3">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0">
                  <el-tooltip
                    :content="$t('transaction.valueTip')"
                    placement="top" effect="dark">
                    <el-button type="text">
                      <i class="fal fa-question-circle text-secondary d-none d-sm-inline-block mr-1"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('common.value')}}:
                </div>
                <div class="col-md-9 ">
                    <el-tooltip
                      :content="$t('transaction.valueTip1')"
                      placement="top" effect="dark"
                      class="text-left"
                    >
                    <el-button type="text" class="text-break">
                        <value-format className="text-dark font-size-3 text-left text-break" childenClass="u-label u-label--value u-label--secondary rounded mr-1" :value="txData.value||'0'" :unitCurrency="'DBOX'"></value-format>
                        <value-format class="text-dark font-size-3 text-left text-break" currency="( $" :value="txData.valueDollar||'0'" :unitCurrency="')'"></value-format>
                    </el-button>
                  </el-tooltip>
                </div>
              </div>
              <hr class="hr-space">
              <div class="row align-items-center">
                <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0">
                  <el-tooltip
                    :content="$t('transaction.txFeeTip')"
                    placement="top" effect="dark">
                    <el-button type="text">
                      <i class="fal fa-question-circle text-secondary d-none d-sm-inline-block mr-1"></i>
                    </el-button>
                  </el-tooltip>
                  {{$t('transaction.txFee')}}:
                </div>
                <div class="col-md-9">
                  <span>
                    <el-tooltip
                      class="text-left"
                      :content="$t('transaction.txFeeTip1')"
                      placement="top" effect="dark">
                    <el-button type="text" class="text-break">
                      <value-format className="text-dark font-size-3 text-left text-break" :value="txData.fee||'0'" :unitCurrency="'DBOX'"></value-format>
                      <value-format class="text-dark font-size-3 text-left text-break" currency="( $" :value="txData.feeDollar||'0'" :unitCurrency="')'"></value-format>
                    </el-button>
                  </el-tooltip>
                    </span>
                  <br>
                  <span v-if="txData.metaAddress"> ( <a :href="'/address/'+txData.metaAddress"
                                                        class="wordwrap mr-1">{{ txData.metaAddress}}</a> {{$t('common.pay')}} {{formatDecimal((txData.feePercent / 100), 2)}} % {{$t('common.transactionFee')}})</span>
                  <span class="u-label u-label--xs u-label--success color-strong text-uppercase text-center rounded text-nowrap" v-if="txData.metaAddress" >&nbsp;META&nbsp;</span>
                </div>
              </div>
              <hr class="hr-space">
              <div id="more" class="collapse">
                <div class="row align-items-center">
                  <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0">
                    <el-tooltip
                      :content="$t('transaction.gasLimitTip')"
                      placement="top" effect="dark">
                      <el-button type="text">
                        <i class="fal fa-question-circle text-secondary d-none d-sm-inline-block mr-1"></i>
                      </el-button>
                    </el-tooltip>
                    {{$t('common.gasLimit')}}:
                  </div>
                  <div class="col-md-9">
                    <el-tooltip
                      :content="$t('transaction.gasLimitTip1')"
                      placement="top" effect="dark">
                      <el-button type="text">
                        <span class="text-dark">{{txData.gas}}</span>
                      </el-button>
                    </el-tooltip>
                  </div>
                </div>
                <hr class="hr-space">
                <div class="row align-items-center">
                  <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0">
                    <el-tooltip
                      :content="$t('transaction.gasUsedTip')"
                      placement="top" effect="dark">
                      <el-button type="text">
                        <i class="fal fa-question-circle text-secondary d-none d-sm-inline-block mr-1"></i>
                      </el-button>
                    </el-tooltip>
                    {{$t('transaction.gasUsed')}}:
                  </div>
                  <div class="col-md-9">
                    <i v-if="!txData.blockHash && !txData.blockNumber">
                      Pending
                    </i>
                    <el-tooltip
                      :content="$t('transaction.gasUsedTip1')"
                      placement="top" effect="dark" v-else>
                      <el-button type="text">
                        <span
                          class="text-dark">{{txData.gasUsed}} ({{formatDecimal(fxf(accDiv(txData.gasUsed || 0, txData.gas || 0), 100), 2)}}%)</span>
                      </el-button>
                    </el-tooltip>
                  </div>
                </div>
                <hr class="hr-space">
                <div class="row align-items-center">
                  <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0">
                    <el-tooltip
                      :content="$t('transaction.gasPriceTip')"
                      placement="top" effect="dark">
                      <el-button type="text">
                        <i class="fal fa-question-circle text-secondary d-none d-sm-inline-block mr-1"></i>
                      </el-button>
                    </el-tooltip>
                    {{$t('common.gasPrice')}}:
                  </div>
                  <div class="col-md-9">
                    <el-tooltip
                      :content="$t('transaction.gasPriceTip1')"
                      placement="top" effect="dark">
                      <el-button type="text">
                        <span
                          class="text-dark">{{formatDecimal(accDiv(txData.gasPrice || 0, 1e18), 9)}} DBOX ({{formatDecimal(accDiv(txData.gasPrice || 0, 1e9), 0)}} Gwei)</span>
                      </el-button>
                    </el-tooltip>
                  </div>
                </div>
                <hr class="hr-space">
                <div class="row  mn-3">
                  <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0">
                    <el-tooltip
                      :content="$t('transaction.nonceTip')"
                      placement="top" effect="dark">
                      <el-button type="text">
                        <i class="fal fa-question-circle text-secondary d-none d-sm-inline-block mr-1"></i>
                      </el-button>
                    </el-tooltip>
                    {{$t('block.nonce')}}
                    <el-tooltip
                      :content="$t('transaction.positionTip')"
                      placement="top" effect="dark">
                      <el-button type="text">
                        <span class="u-label u-label--xs u-label--badge-out u-label--secondary ml-1">{{$t('transaction.position')}}</span>
                      </el-button>
                    </el-tooltip>
                  </div>
                  <div class="col-md-9">
                    <el-tooltip
                      :content="$t('transaction.txnNonce')"
                      placement="top" effect="dark">
                      <el-button type="text">
                        <span class="text-dark">{{txData.nonce}}</span>
                      </el-button>
                    </el-tooltip>
                    <el-tooltip
                      :content="$t('transaction.indexPosition')"
                      placement="top" effect="dark">
                      <el-button type="text">
                        <span
                          class="u-label u-label--xs u-label--badge-out u-label--secondary ml-1 mr-3">{{!txData.blockHash && !txData.blockNumber ? $t('common.pending') : txData.transactionIndex}}</span>
                      </el-button>
                    </el-tooltip>
                  </div>
                </div>
                <hr class="hr-space">
                <div class="row">
                  <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0">
                    <el-tooltip
                      :content="$t('transaction.inputDataTip')"
                      placement="top" effect="dark">
                      <el-button type="text">
                        <i class="fal fa-question-circle text-secondary d-none d-sm-inline-block mr-1"></i>
                      </el-button>
                    </el-tooltip>
                    {{$t('transaction.inputData')}}:
                  </div>
                  <div class="col-md-9">
                    <div data-target-group="inputDataGroup">
                      <el-tooltip
                        :content="$t('transaction.inputDataTip1')"
                        placement="top" effect="dark">
                        <el-button type="text" style="width: 100%">
                         <span>
                        <textarea v-if="index===3" readonly="" spellcheck="false"
                                  class="form-control bg-light text-secondary text-monospace p-3" rows="10"
                        >{{txData.input}}</textarea>
                           <textarea readonly="" spellcheck="false"
                                     class="form-control bg-light text-secondary text-monospace p-3" rows="10"
                                     v-else-if="index===2"
                           >{{utf8}}</textarea>
                           <textarea readonly="" spellcheck="false"
                                     class="form-control bg-light text-secondary text-monospace p-3" rows="10"
                                     v-else-if="index===1 && txData.args && txData.encodeArgs && txData.funcName && txData.methodID"
                           >Function: {{txData.funcName}}({{show(txData.args)}}) &#13;&#13;MethodID: {{txData.methodID}}{{ShowArgs(txData.encodeArgs)}}
                           </textarea>
                           <textarea v-else-if="index===1 || !txData.args || !txData.encodeArgs || !txData.funcName || !txData.methodID" readonly="" spellcheck="false"
                                  class="form-control bg-light text-secondary text-monospace p-3" rows="10"
                            >{{txData.input}}</textarea>
                         </span>
                        </el-button>
                      </el-tooltip>
                      <span class="dropdown">
                        <button style="margin-top: 0.25rem;cursor: pointer"
                                class="btn btn-xss btn-secondary dropdown-toggle" @click="showOptions">
                        {{$t('transaction.viewInput')}}
                        </button>
                          <div class="dropdown-menu" :class="options?'show':''"
                               style="position: absolute; transform: translate3d(0px, 23px, 0px); top: 0px; left: 0px; will-change: transform;">
                            <a v-for="(item,index) in optionsList" :key="index" href="javascript:;"
                               class="dropdown-item" :class="index===item.type?'active':''"
                               @click="convertstr2(item.type);">{{item.name}}</a>
                        </div>
                        </span>
                    </div>
                    <div data-target-group="inputDataGroup" style="display: none; opacity: 0;">
                    <span>
                    <div align="center">
                     <img src="../../images/loadingblock.svg" alt="Loading">
                    </div>
                    </span>
                    </div>
                  </div>
                </div>
                <hr class="hr-space">
              </div>
              <span>
                <a class="d-block collapsed" href="#more" data-toggle="collapse"
                   role="button" aria-expanded="false" aria-controls="more">
                <span>{{$t('block.click')}}<span class="card-arrow-more">{{$t('block.more')}}</span><span class="card-arrow-less">{{$t('block.less')}}</span>
                <span class="card-btn-arrow card-btn-arrow--up ml-2">
                <span class="fas fa-arrow-up small"></span>
                </span>
                </span>
                </a>
                </span>
              <div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" :class="hash === 'eventlog'?'show active':''" id="eventlog" role="tabpanel" aria-labelledby="eventlog-tab">
            <div class="card-body">
              <h6 clsass="font-weight-normal mb-4">
                {{$t('transaction.txnEvent')}}
              </h6>
              <div v-for="(item,index) in txLogs " :key="index">
                <div class="media">
                  <div class="mt-1 mr-3">
                  <span class="btn btn-icon btn-soft-success rounded-circle">
                    <span class="btn-icon__inner">{{item.logIndex}}</span>
                  </span>
                  </div>
                  <div class="media-body">
                    <dl class="row align-items-baseline mb-3">
                      <dt class="col-md-2 col-lg-1 text-md-right">
                        <h6 class="font-weight-bold mb-0">{{$t('common.address')}}</h6>
                      </dt>
                      <dd class="col-md-10 mb-0">
                        <a class="text-break mr-2" :href="'/address/'+item.address">{{item.address}}</a>
                      </dd>
                    </dl>
                    <dl class="row align-items-baseline mb-3" v-show="item.funcName">
                      <dt class="col-md-2 col-lg-1 text-md-right">
                        <h6 class="mb-0">{{$t('transaction.name')}}</h6>
                      </dt>
                      <dd class="col-md-10 mb-0">
                        <p class="text-secondary text-monospace mb-0">
                        <span id="funcname_0" style="display: inline-block; margin-bottom:6px">{{item.funcName}}
                          (<span v-for="(v,i) in JSON.parse(item.args)" :key="i">
                            {{v.indexed ? 'indexed':''}} <span class="text-success">{{v.type}}</span>
                            <span class="text-danger">{{v.name}}</span>{{i === JSON.parse(item.args).length-1?' ':','}}
                          </span>)
                          <a :href="'/address/'+item.address+'#contracts'" class="ml-1" >{{$t('transaction.viewSource')}}</a>
                        </span>
                        </p></dd>
                    </dl>
                    <dl class="row align-items-baseline mb-3">
                      <dt class="col-md-2 col-lg-1 text-md-right">
                        <h6 class="mb-0">{{$t('transaction.topic')}}</h6>
                      </dt>
                      <dd class="col-md-10 mb-0">
                        <ul class="list-unstyled list-xs-space mb-0">
                          <li v-for="(v,i) in item.topicList" :key="i">
                            <span class="u-label u-label--xs u-label--secondary rounded mr-1">{{i}}</span>
                            <span class="dropdown" v-if="item.funcName && i>0">
                            <button type="button" class="btn btn-xss btn-custom dropdown-toggle" @click="showItemData(item.id +'-'+ i)"> {{v.typeData||$t('common.dec')}}</button>
                            <div class="dropdown-menu" :class="itemOptions && item.id+'-'+i === id?'show':''">
                              <a class="dropdown-item" href="javascript:;" @click="funcItemOnclick('',v.data,item.id,JSON.parse(item.args),i)">{{$t('common.dec')}} </a>
                              <a class="dropdown-item" href="javascript:;" @click="funcItemOnclick('Hex',v.data,item.id,'',i);"> {{$t('common.hex')}}</a>
                            </div>
                          </span>
                            <i class="fa fa-long-arrow-alt-right text-secondary mx-1"></i>
                            <span v-if="item.funcName" class="text-monospace text-break">
                              <a v-if="i > 0" :href="JSON.parse(item.args)[i-1].type=== 'address'? '/address/'+funcHex('address',v.data):'javascript:;'">{{v.changeData|| funcHex(JSON.parse(item.args)[i-1].type,v.data)}}</a>
                              <span v-else>{{v.changeData||v.data}}</span>
                            </span>
                            <span class="text-monospace text-break" v-else>
                              <span>{{v.data}}</span>
                            </span>
                          </li>
                        </ul>
                      </dd>
                    </dl>
                    <dl class="row align-items-baseline mb-0">
                      <dt class="col-md-2 col-lg-1 text-md-right">
                        <h6 class="font-italic mb-0">{{$t('transaction.data')}}</h6>
                      </dt>
                      <dd v-if="!item.funcName" class="col-md-10 mb-0">
                        <ul class="list-unstyled list-xs-space bg-light rounded p-4 mb-0">
                          <li>
                            <span class="dropdown">
                              <button class="btn btn-xss btn-custom dropdown-toggle" type="button" @click="showDataOptions(index)">{{item.typeData||$t('common.hex')}}</button>
                              <div class="dropdown-menu" style="top:auto" :class="dataOptions && index === setIndex ?'show':''">
                                <a class="dropdown-item" href="javascript:;" @click="funcOnclick('Hex',item.data,item.id);">{{$t('common.hex')}}</a>
                                <a class="dropdown-item" href="javascript:;" @click="funcOnclick('unit',item.data,item.id);">{{$t('common.number')}}</a>
                                <a class="dropdown-item" href="javascript:;" @click="funcOnclick('Text',item.data,item.id);">{{$t('common.text')}}</a>
                                <a class="dropdown-item" href="javascript:;" @click="funcOnclick('address',item.data,item.id);">{{$t('common.address')}}</a>
                              </div>
                              <span>
                                <i class="fa fa-long-arrow-alt-right mx-1"></i>
                                <a class="text-break" v-if="item.typeData==='Address'" :href="'/address/'+item.changeData">{{item.changeData||item.data}}</a>
                                <span class="text-monospace text-break" v-else>{{item.changeData||item.data}}</span>
                              </span>
                            </span>
                          </li>
                        </ul>
                      </dd>
                      <dd v-else-if="item.funcName" class="col-md-10 mb-0">
                        <ul
                          class="list-unstyled list-xs-space bg-light rounded p-4 mb-2 d-md-flex justify-content-between ">
                          <div id="event_dec_data_1" v-if="item.changeData">
                            <li v-if="Array.isArray(item.changeData)" >
                              <div class="mt-2 mt-sm-1 d-lg-flex" v-for="(value,i) in item.changeData" :key="i">
                                <span class="text-secondary rounded mr-1 text-truncate">{{JSON.parse(item.args)[i].type}} :</span>
                                <span class="text-monospace text-break d-block d-sm-inline-block">{{value.toString()}}</span>
                              </div>
                            </li>
                            <li class="mt-2 mt-sm-1 d-lg-flex" v-else>
                              <span class="text-secondary rounded mr-1 text-truncate">{{item.name ? item.name + ':':''}}</span>
                              <span class="text-monospace text-break d-block d-sm-inline-block">{{item.changeData}}</span>
                            </li>
                          </div>
                          <span id="event_raw_data_1" class="text-monospace text-break" v-else>{{item.data}}</span>
                          <div class="d-flex align-items-start mt-3 mt-md-0 ml-md-3">
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                              <label class="btn btn-xs btn-secondary cursor-pointer">
                                <input type="radio" name="options" id="option1" autocomplete="off" @click="hexUnitMultData('',item.data,item.id,JSON.parse(item.args))">{{$t('common.dec')}}
                              </label>
                              <label class="btn btn-xs btn-secondary cursor-pointer active">
                                <input type="radio" name="options" id="option2" autocomplete="off" checked @click="funcOnclick('Hex',item.data,item.id)"> {{$t('common.hex')}}</label></div>
                          </div>
                        </ul>
                      </dd>
                    </dl>
                  </div>
                </div>
                <hr class="my-4">
              </div>
              <div class="mb-5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getSearch, getTxLogs } from '@/api/chains';
  import { formatTime, accDiv, fxf, formatDecimal } from '@/utils/index'
  import { utils } from 'ethers';
  import moment from 'moment'
  import ValueFormat from '@/components/ValueFormat'

  export default {
    data() {
      return {
        txData: {},
        formatTime: formatTime,
        accDiv: accDiv,
        fxf: fxf,
        formatDecimal: formatDecimal,
        copy: false,
        copy1: false,
        copy2: false,
        moment: moment,
        options: false,
        dataOptions: false,
        itemOptions: false,
        optionsList: [
          { type: 2, name: 'UTF-8' },
          { type: 3, name: 'Original' }
        ],
        index: 0,
        txLogs: [],
        txLogsLocal: [],
        id: '',
        setIndex: '',
        hash: window.location.hash ? window.location.hash.split('#')[1] : ''
      }
    },
    components: {
      ValueFormat
    },
    mounted() {
      const tx = this.$route.params.id;
      getSearch(tx).then(res => {
       
        if (res.status === 1) {
          this.txData = res.data;
          if (res.data.funcName) {
            this.optionsList.unshift({ type: 1, name: 'Default View' })
          }
          if (this.txData.tokenTxes && this.txData.tokenTxes.length > 0) {
            this.txData.tokenTxes.map(v => {
              if (v.txType === 5) {
                const idsArr = v.ids.split(',')
                const tokenValue = v.tokenValue.split(',')
                console.log(idsArr)
                v.arcData = []
                idsArr.map((v1, k1) => {
                  let obj = {
                    ids: v1,
                    tokenValue: tokenValue[k1]
                  }
                  v.arcData.push(obj)
                })
                console.log(this.txData.tokenTxes)
              }
            })
          }
          this.index = res.data.funcName ? 1 : 3
        }
      });
      getTxLogs(tx).then(res => {
        if (res.status === 1) {
          const { data } = res;
          this.txLogs = data || [];
          this.txLogsLocal = data || [];
        }
      });
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
      },
      copyData() {
        document.getElementById('copyAddress').select();
        document.execCommand('copy');
        this.copy = true;
        setTimeout(() => {
          this.copy = false
          document.getElementById('copyAddress').blur()
        }, 1000)
      },
      copyData1() {
        document.getElementById('copyAddress1').select();
        document.execCommand('copy');
        this.copy1 = true;
        setTimeout(() => {
          this.copy1 = false
          document.getElementById('copyAddress1').blur()
        }, 1000)
      },
      copyData2() {
        document.getElementById('copyAddress2').select();
        document.execCommand('copy');
        this.copy2 = true;
        setTimeout(() => {
          this.copy2 = false
          document.getElementById('copyAddress2').blur()
        }, 1000)
      },
      show(v) {
        let data = '';
        if ( typeof v === 'string') {
          v = JSON.parse(v)
        }
        console.log(v)
        if (v) {
            v.map((item, i) => {
            const argslist = item.type + ' ' + item.name;
            data = data + ',' + argslist
          })
        }
        return data.substr(1)
      },
      ShowArgs(v) {
        let data = '';
        if ( typeof v === 'string') {
          v = JSON.parse(v)
        }
        console.log(v)
        if (v) {
            v.map((item, i) => {
            const argslist = '[' + i + ']: ' + item;
            data = data + '\n' + argslist
          })
        }
        return data
      },
      showOptions() {
        this.options = !this.options
      },
      showItemData(id) {
        this.id = id;
        this.itemOptions = !this.itemOptions
      },
      convertstr2(type) {
        this.index = type;
        if (type === 2) {
          this.utf8 = this.hex2utf8(this.txData.input)
        }
        this.options = false
      },
      hex2utf8(pStr) {
        let tempstr = '';
        try {
          if (pStr.startsWith('0x')) {
            pStr = pStr.slice(2);
            tempstr = decodeURIComponent(pStr.replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&'));
          }
        } catch (err) {
          tempstr = this.hex2asc(pStr);
        }
        return tempstr;
      },
      hex2asc(pStr) {
        let tempstr = '';
        for (let b = 0; b < pStr.length; b = b + 2) {
          tempstr = tempstr + String.fromCharCode(parseInt(pStr.substr(b, 2), 16));
        }
        return tempstr;
      },
      hex2int(hex) {
        const len = hex.length;
        const a = new Array(len);
        let code;
        for (let i = 0; i < len; i++) {
          code = hex.charCodeAt(i);
          if (code >= 48 && code < 58) {
            code -= 48;
          } else {
            code = (code & 0xdf) - 65 + 10;
          }
          a[i] = code;
        }
        return a.reduce(function(acc, c) {
          acc = 16 * acc + c;
          return acc;
        }, 0);
      },
      funcOnclick(type, data, id, args) {
        if (!type) {
          const indexed = args.findIndex(v => { return !v.indexed })
          type = indexed > -1 ? args[indexed].type : ''
        }
        const index = this.txLogs.findIndex(v => { return v.id === id });
        if (args) {
          const indexed = args.findIndex(v => { return !v.indexed })
          this.txLogs[index].name = indexed > -1 ? args[indexed].name : '';
        }
        this.showDataOptions();
        if (type === 'Hex') {
          this.txLogs[index].changeData = '';
          this.txLogs[index].typeData = this.$t('common.hex');
          this.$set(this.txLogs, index, this.txLogs[index]);
          return
        }
        if (type === 'unit') {
          this.txLogs[index].changeData = this.hexUnit(data);
          this.txLogs[index].typeData = this.$t('common.number');
          this.$set(this.txLogs, index, this.txLogs[index]);
          return
        }
        if (type === 'uint256') {
          this.txLogs[index].changeData = this.hexUnit256(data);
          this.txLogs[index].typeData = 'uint256';
          this.$set(this.txLogs, index, this.txLogs[index]);
          return
        }
        if (type === 'address') {
          this.txLogs[index].changeData = this.hexAddress(data);
          this.txLogs[index].typeData = this.$t('common.address');
          this.$set(this.txLogs, index, this.txLogs[index]);
          return
        }
        this.txLogs[index].changeData = this.hex2utf8(data) || ' ';
        this.txLogs[index].typeData = this.$t('common.text');
        this.$set(this.txLogs, index, this.txLogs[index]);
      },
      funcItemOnclick(type, data, id, args, i) {
        if (!type) {
          type = args[i - 1].type
        }
        const index = this.txLogs.findIndex(v => { return v.id === id })
        this.showItemData();
        if (type === 'Hex') {
          this.txLogs[index].topicList[i].changeData = this.txLogs[index].topicList[i].data;
          this.txLogs[index].topicList[i].typeData = this.$t('common.hex');
          this.$set(this.txLogs, index, this.txLogs[index])
          return
        }
        if (type === 'unit') {
          this.txLogs[index].topicList[i].changeData = this.hexUnit(data);
          this.txLogs[index].topicList[i].typeData = this.$t('common.dec');
          this.$set(this.txLogs, index, this.txLogs[index])
          return
        }
        if (type === 'uint256') {
          this.txLogs[index].topicList[i].changeData = this.hexUnit256(data);
          this.txLogs[index].topicList[i].typeData = this.$t('common.dec');
          this.$set(this.txLogs, index, this.txLogs[index])
          return
        }
        if (type === 'address') {
          this.txLogs[index].topicList[i].changeData = this.hexAddress(data);
          this.txLogs[index].topicList[i].typeData = this.$t('common.dec');
          this.$set(this.txLogs, index, this.txLogs[index])
          return
        }
        this.txLogs[index].topicList[i].changeData = this.hex2utf8(data);
        this.txLogs[index].topicList[i].typeData = 'Decode';
        this.$set(this.txLogs, index, this.txLogs[index]);
      },
      showDataOptions(index) {
        this.setIndex = index
        this.dataOptions = !this.dataOptions
      },
      hexAddress(hex) {
        const type = ['address'];
        const abicode = new utils.AbiCoder();
        const decode = abicode.decode(type, hex);
        return decode[0].toString()
      },
      hexUnit(hex) {
        const type = ['uint'];
        const abicode = new utils.AbiCoder();
        const decode = abicode.decode(type, hex);
        return decode[0].toString()
      },
      hexUnit256(hex) {
        const type = ['uint256'];
        const abicode = new utils.AbiCoder();
        const decode = abicode.decode(type, hex);
        return decode[0].toString()
      },
      funcHex(type, data) {
        if (type === 'unit') {
          return this.hexUnit(data);
        }
        if (type === 'uint256') {
          return this.hexUnit256(data);
        }
        if (type === 'address') {
          return this.hexAddress(data);
        }
        return this.hex2utf8(data);
      },
      tabFuc(tab) {
        this.$router.push({ path: tab });
      },
      hexUnitMultData(type, hex, id, args) {
        const data = args.filter(v => { return !v.indexed })
        if (data.length > 1) {
          const type1 = [];
          data.map(v => {
            type1.push(v.type)
          });
          const index = this.txLogs.findIndex(v => { return v.id === id })
          const abicode = new utils.AbiCoder();
          this.txLogs[index].changeData = abicode.decode(type1, hex);
          this.$set(this.txLogs, index, this.txLogs[index]);
        } else {
          this.funcOnclick(type, hex, id, args)
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-button {
    padding: 0;
  }

  .el-button--text {
    color: #12161c;
    font-weight: 400;
  }

  .el-tooltip__popper {
    word-wrap: break-word;
    word-break: normal;
    max-width: 17rem
  }

  /*.el-tooltip__popper.is-light {*/
  /*border: 1px solid lightgrey;*/
  /*}*/
</style>

