<template>
  <div class="address">
    <div class="container">
      <div class="address-content">
        <div>
          <h1 class="h4" style="margin-bottom: 0">
            <img class="u-xs-avatar rounded"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAD80lEQVR4Xu3dsXEVMRSFYZkGHDFOCByQ0YQzB5RCPa7CIZE7oAFnhCQeIjeAGUp4+jSjkfmJOZLeuf+euxLL7tWPr49vA/58+PUT1GO8vD6R/uOXb6RX8e/nBxri5vqe9H8+fSb9VQCQfyMASgAiqASoBRBAtYDuAQig7gHIvtE9QLuAdgF0DbUNbBtIAHUO0DkAAaTizgE6ByCGOgfoHIAA6hygcwACqHMAsq9zgNE5QOcAdA11DrD5HOD77R09D0DVH2Ps3sfr+lWv20id/yoA1ELTB8Dmu3grn6sDIACcIhihFgDmrZCWACXACo6mxygBpq1bIywBSoA1JE2OUgJMGrdKVgKUAKtYmhqnBJiybZ2oBCgB1tE0MVIJMGHaSkkJUAKs5OnisUqAiy1bKygBSoC1RF04Gj8StpvgC3/vu/vr+jxFAByORAAcXkBdfgCog4frA+DwAuryA0AdPFwfAIcXUJcfAOrg4foAOLyAuvwAUAcP1wfA4QXU5QeAOni4PgAOL6AuPwDUwcP1AXB4AXX5AaAOHq4/HgD9AbufR9i9fp1/+/MA+gMCwD6YEQDYAnYDrPMHQADYN4M0gpVgnR/rz+840vWrfyUAEqAFCAB8LFwNxPqXAFqA3VdQAOB3AwPAtmG7/eseACNgd4Lp/AEQAG0DhQG9AmsB7QKEP96F1ALIfn/ZdQlQAhCC2oJKALL/HSRAr4tHAlCuLQCnH70iRh1EfQDgPQD6v10eAAGwFcJawFb7/bNzuvwAUAdRXwuoBSBCJi8BzD9WlwAlAEMkA5QA4t4CbQlQAizAaH6IEmDeuyXKEqAEWALS7CAlwKxzi3QlQAmwCKW5YUqAOd+Wqf77BFAnb67vdQjSv7w+kX63eHsCqAEBYA4GgPk3SgA0UOUlgDlYAph/JQD6x/ISwCwsAcy/EgD9Y3kJYBaWAOZfCYD+sbwEMAtLAPOvBED/WF4CmIUlgPlXAqB/LC8BzMISwPwrAdA/lpcAZiG/IMKm3/9/43T9qtc3fOj8AaAOoj4Anh/QwrPlARAAWwmuBWy1318ypcsPAHUQ9bWAWgAiZPISwPxjdQlQAjBEMkAJIO4t0JYAJcACjOaHKAHmvVuiLAFKgCUgzQ5SAsw6t0hXApQAi1CaG6YEmPNtmWp7Auj3AvQH6AsSdH6t5O716/z8SJgWQH+Azh8At3dvYoIWIAD2fnm0BBD6hz/StvsCCoAAqAUIA7tbmM5fAkj1awH+SJMSrD0U6z92r1/nLwGQAC2AAqzzB0AAdBMoDOgVWALgPwapgVL8f9oAwLd97zYwADoKJgZ2A6zzdxNI5a8FDO3BSrDOj/U//h7gL/IK1G7WnNdlAAAAAElFTkSuQmCC"
                 alt="">
            {{status > 1 ? $t('common.contract') : $t('common.address')}}
            <span class="text-size-address text-secondary" data-placement="top">{{address}}</span>
            <input :value='address' style='opacity: 0;position: absolute;left: 0' id="copyAddress">
            <a class="btn btn-sm btn-icon btn-soft-secondary rounded-circle" @click="copyAddress" href="javascript:;"
               title="">
              <span class="far  btn-icon__inner" :class="!copy ?'fa-copy':'fa-check'"></span>
            </a>
            <a class="btn btn-sm btn-icon btn-soft-secondary rounded-circle" href="javascript:;" data-toggle="modal"
               data-target="#myModal">
              <i class="fa fa-qrcode btn-icon__inner"></i>
            </a>
          </h1>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row" style="margin-bottom: 1.25rem">
        <div class="col-md-6 mb-3 mb-md-0">
          <div class="card">
            <div class="card-header">
              <h2 class="card-header-title">{{$t('address.overview')}}</h2>
            </div>
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-md-4 mb-1 mb-md-0">{{$t('common.balance')}}:</div>
                <div class="col-md-8">
                  <value-format className="text-dark font-size-3 text-break w-100 text-left" :unitCurrency="'DBOX'"  :value="addressData.balance||'0'"></value-format>
                </div>
              </div>
              <hr class="hr-space">
              <div class="row align-items-center">
                <div class="col-md-4 mb-1 mb-md-0">{{$t('address.htValue')}}:</div>
                <div class="col-md-8">
                  <value-format currency="$" className="text-dark font-size-3 text-break w-100 text-left" :value="addressData.value||'0'"></value-format>
                  <!--<value-format className="text-dark font-size-3" :value="addressData.htValue||'0'"></value-format>-->
                </div>
              </div>
              <div v-if="assetList.length>0">
                <hr class="hr-space">
                <div class="row align-items-center">
                  <div class="col-md-4 mb-1 mb-md-0">
                    {{$t('common.token')}}:
                  </div>
                  <div class="col-md-8 d-flex justify-content-between">
                    <div class="position-relative mr-1" style="width: 100%;">
                      <a @click="showToken" class="btn btn-xs btn-custom btn-custom-balance dropdown-toggle"
                         :class="tokenShow?'active':''"
                         href="javascript:;">
                        <span class="badge badge-primary mx-1">{{assetList.length || 0}}</span>
                      </a>
                      <div class="dropdown-menu dropdown-unfold dropdown-balance u-unfold--css-animation "
                           :class="tokenShow?'slideInUp':'u-unfold--hidden fadeOut'"
                           aria-labelledby="balanceDropdown" style="width:100%;animation-duration: 300ms; left: 0px;">
                        <div class="pl-2 pr-3 js-focus-state">
                          <input @input="searchFuc" type="text" class="form-control form-control-xs search mb-3"
                                 :placeholder="$t('address.tokenSearch')">
                        </div>
                        <div
                          class="pl-2 pr-3"
                          style="max-height: 280px; position: relative; overflow: auto;">
                          <div style="max-height: none;" tabindex="0">
                            <div style="position:relative; top:0; left:0;">
                              <div class="list-not-found text-center pt-5" v-show="assetSearch.length<=0 && assetSearch721.length <=0 && assetSearch1155.length <=0 ">
                                <img class="mb-4" width="100"
                                     src="../../images/empty-search-state.svg" alt="Search Not Found">
                                <p class="lead mb-0">{{$t('tableNoData')}}!</p>
                              </div>
                              <ul class="list list-unstyled mb-0" v-show="assetSearch.length>0">
                                <li
                                  class="list-custom-divider d-flex justify-content-between align-items-center font-size-1 py-1 px-2 mb-1">
                                  <span><i
                                    class="fa fa-angle-right text-secondary"></i><strong>{{'ARC-20'}} {{$t('address.tokens')}}</strong> ({{assetSearch.length || 0}})</span>
                                </li>
                                <li class="list-custom list-custom-BEP-20" v-for="(item,index) in assetSearch"
                                    :key="index">
                                  <a
                                    class="link-hover d-flex justify-content-between align-items-center"
                                    :href="'/token/'+item.tokenAddress+'/25/1?a='+item.address">
                                    <div>
                                      <div class="d-flex align-items-center">
                                        <span class="list-name hash-tag text-truncate">
                                          <span><font
                                            color="">{{item.tokenName}}</font></span>{{item.symbol && '(' + item.symbol + ')'}} </span>
                                      </div>
                                        <value-format className=" list-amount link-hover__item font-size-3 text-break w-100 text-left" :unitCurrency="item.symbol" :value="item.balance||'0'"></value-format>
                                    </div>
                                  </a>
                                </li>
                              </ul>
                              <ul class="list list-unstyled mb-0" v-show="assetSearch721.length>0">
                                <li
                                  class="list-custom-divider d-flex justify-content-between align-items-center font-size-1 py-1 px-2 mb-1">
                                  <span><i
                                    class="fa fa-angle-right text-secondary"></i><strong>{{'ARC-721'}} {{$t('address.tokens')}}</strong> ({{assetSearch721.length || 0}})</span>
                                </li>
                                <li class="list-custom list-custom-BEP-20" v-for="(item,index) in assetSearch721"
                                    :key="index">
                                  <a
                                    class="link-hover d-flex justify-content-between align-items-center"
                                    :href="'/token/'+item.tokenAddress+'/25/1?a='+item.address">
                                    <div>
                                      <div class="d-flex align-items-center">
                                        <span class="list-name hash-tag text-truncate">
                                          <span><font
                                            color="">{{item.tokenName}}</font></span>{{item.symbol && '(' + item.symbol + ')'}} </span>
                                      </div>
                                        <value-format className=" list-amount link-hover__item font-size-3 text-break w-100 text-left" :unitCurrency="item.symbol" :value="item.balance||'0'"></value-format>
                                    </div>
                                  </a>
                                </li>
                              </ul>
                              <ul class="list list-unstyled mb-0" v-show="assetSearch1155.length>0">
                                <li
                                  class="list-custom-divider d-flex justify-content-between align-items-center font-size-1 py-1 px-2 mb-1">
                                  <span><i
                                    class="fa fa-angle-right text-secondary"></i><strong>{{'ARC-1155'}} {{$t('address.tokens')}}</strong> ({{assetSearch1155.length || 0}})</span>
                                </li>
                                <li class="list-custom list-custom-BEP-20" v-for="(item,index) in assetSearch1155"
                                    :key="index">
                                  <a
                                    class="link-hover d-flex justify-content-between align-items-center"
                                    :href="'/token/'+item.tokenAddress+'/25/1?a='+item.address">
                                    <div>
                                      <div class="d-flex align-items-center">
                                        <span class="list-name hash-tag text-truncate">
                                          <span><font
                                            color="">{{item.tokenName}}</font></span>{{item.symbol && '(' + item.symbol + ')'}} </span>
                                      </div>
                                        <value-format className=" list-amount link-hover__item font-size-3 text-break w-100 text-left" :unitCurrency="item.symbol" :value="item.balance||'0'"></value-format>
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6" v-show="status>1">
          <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center">
              <div class="d-flex">
                <h2 class="card-header-title mr-1">{{$t('address.more')}}</h2>
              </div>
            </div>
            <div class="card-body">
              <div>
                <div class="row align-items-center">
                  <div class="col-md-4 mb-1 mb-md-0">
                    <span class="d-md-none d-lg-inline-block mr-1">{{$t('common.contract')}}</span>{{$t('address.creator')}}:
                  </div>
                  <div
                    v-if="address.toLowerCase()!=='0x000000000000000000000000000000000000f000'&&address.toLowerCase()!=='0x000000000000000000000000000000000000f001'&&address.toLowerCase()!=='0x000000000000000000000000000000000000f002'"
                    class="col-md-8">
                    <el-tooltip
                      :content="$t('address.creatorAddress')"
                      placement="top" effect="dark">
                      <el-button type="text" style="padding: 0" class="font-weight-normal">
                      <a :href="'/address/'+contractDetail.owner"
                         class="hash-tag text-truncate font-weight-normal font-size-3">{{contractDetail.owner}}</a>
                      </el-button>
                    </el-tooltip>
                    <span
                      class="d-none d-lg-inline-block ml-1"> {{$t('address.atTxn')}}
                      <el-tooltip
                        :content="$t('address.creatorHash')"
                        placement="top" effect="dark">
                        <el-button type="text" style="padding: 0" class="font-weight-normal">
                          <a :href="'/tx/'+contractDetail.txHash" class="hash-tag text-truncate font-size-3">{{contractDetail.txHash}}</a>
                        </el-button>
                      </el-tooltip>
                      </span>
                  </div>
                  <div class="col-md-8" v-else>
                    <el-tooltip
                      :content="$t('address.creatorAddress')"
                      placement="top" effect="dark">
                      <el-button type="text" style="padding: 0" class="font-weight-normal">
                        <span class="text-dark">{{contractDetail.owner}}</span>
                      </el-button>
                    </el-tooltip>
                    <span
                      class="d-none d-lg-inline-block ml-1"> {{$t('address.atTxn')}}
                      <el-tooltip
                        :content="$t('address.creatorHash')"
                        placement="top" effect="dark">
                        <el-button type="text" style="padding: 0" class="font-weight-normal">
                          <span class="hash-tag text-truncate font-size-3 text-dark">{{contractDetail.txHash}}</span>
                        </el-button>
                      </el-tooltip>
                    </span>
                  </div>
                </div>
              </div>
              <hr class="hr-space">
              <div>
                <div class="row align-items-center" v-if="contractDetail.tokenName">
                  <div class="col-md-4 mb-1 mb-md-0">
                    <span class="d-md-none d-lg-inline-block mr-1">{{$t('common.token')}}</span>{{$t('address.tracker')}}:
                  </div>
                  <div class="col-md-8">
                    <a
                      :href="'/token/'+contractDetail.address+'/25/1'">{{contractDetail.tokenName}} ({{contractDetail.tokenSymbol}})</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center p-0">
          <ul class="nav nav-custom nav-borderless nav_tabs1" id="nav_tabs" role="tablist">
            <li class="nav-item">
              <a class="nav-link"
                 :class="!hash||hash === 'transactions'?'active':''"
                 href="#transactions"
                 data-toggle="tab"
                 @click="tabFuc('#transactions')"
              >{{$t('address.tab1')}}</a>
            </li>
            <li class="nav-item" v-show="status === 0">
              <a class="nav-link" :class="hash === 'mine'?'active':''" href="#mine" data-toggle="tab" @click="tabFuc('#mine')"
              >{{$t('address.tab2')}}</a>
            </li>
            <li class="nav-item" v-show="erc20List.length>0">
              <a class="nav-link" :class="hash === 'tokenTxns'?'active':''" href="#tokenTxns" @click="tabFuc('#tokenTxns')"
                 data-toggle="tab"
              >{{$t('address.tab3')}}</a>
            </li>
            <li class="nav-item" v-show="erc721List.length>0">
              <a class="nav-link" :class="hash === 'tokenTxns-nft'?'active':''" href="#tokenTxns-nft" @click="tabFuc('#tokenTxns-nft')"
                 data-toggle="tab"
              >{{$t('address.tab4')}}</a>
            </li>
            <li class="nav-item" v-show="erc1155List.length>0">
              <a class="nav-link" :class="hash === 'tokenTxns-nft1155'?'active':''" href="#tokenTxns-nft1155" @click="tabFuc('#tokenTxns-nft1155')"
                 data-toggle="tab"
              >{{'ARC-1155 Token Txns'}}</a>
            </li>
            <li class="nav-item" v-show="status>1">
              <a class="nav-link" :class="hash === 'code' || hash === 'readContract' || hash === 'writeContract' ?'active':''" href="#code"
                 data-toggle="tab" @click="tabFuc('#code')">
                <span>{{$t('common.contract')}} <sup v-if="contractDetail.openSource===1"><i class="fa fa-check-circle text-success"></i></sup></span>
              </a>
            </li>
            <li class="nav-item" v-show="status>1">
              <a class="nav-link" :class="hash === 'events'?'active':''" href="#events" @click="tabFuc('#events')" data-toggle="tab">{{$t('address.tab6')}}</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div :style="pageLoading? '':'display: none;'">
            <div id="overlay" class="py-3 text-center">
              <img src="../../images/loadingblock.svg" alt="Loading">
            </div>
          </div>
          <div class="tab-content" v-show="!pageLoading">
            <div class="tab-pane fade in" :class="!hash||hash === 'transactions'?'show active':''" id="transactions" role="tabpanel" aria-labelledby="transactions-tab">
              <div class="d-md-flex align-items-center mb-3">
                <p style="margin-bottom: 0">
                  <i class="fas fa-sort-amount-down text-secondary"></i>&nbsp;{{$t('address.tab1Tip1')}}
                  <el-tooltip
                    :content="$t('address.clickAll')"
                    placement="top" effect="dark">
                    <el-button type="text" style="padding: 0;">
                      <a :href="'/txs/25/1?address='+address">{{total}}</a>
                    </el-button>
                  </el-tooltip>
                  {{$t('address.tab1Tip2')}}
                </p>
              </div>
              <div class="table-responsive mb-2 mb-md-0">
                <table class="table table-hover">
                  <thead class="thead-light">
                  <tr>
                    <th scope="col" width="1">
                      {{$t('common.txhash')}}
                    </th>
                    <th scope="col" class="d-none d-sm-table-cell">
                      <div class="d-flex align-items-center">
                        <div class="mr-2"> {{$t('common.block')}}</div>
                      </div>
                    </th>
                    <th scope="col" width="2">
                      Method
                    </th>
                    <th scope="col">
                      <div class="d-flex align-items-center">
                        <div class="mr-2">
                          <a href="javascript:;" v-if="!timeFlag"
                             @click="switchAgeToDateTimeInAddPage">{{$t('common.time')}}</a>
                          <a href="javascript:;" @click="switchAgeToDateTimeInAddPage"
                             v-else>{{$t('common.age')}}</a>
                        </div>
                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-items-center">
                        <div class="mr-2">{{$t('common.from')}}</div>
                      </div>
                    </th>
                    <th scope="col" width="30"></th>
                    <th scope="col">
                      <div class="d-flex align-items-center">
                        <div class="mr-2">{{$t('common.to')}}</div>
                      </div>
                    </th>
                    <th scope="col">
                      {{$t('common.value')}}
                    </th>
                    <th scope="col">
                      <el-tooltip
                        content="(Gas Price * Gas Used by Txns) in HT"
                        placement="bottom" effect="dark">
                        <el-button type="text" style="padding: 0">
                          <span class="text-secondary font-weight-bold">{{$t('common.txFee')}}</span>
                        </el-button>
                      </el-tooltip>
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-if="txData.totalCount===0">
                    <td colspan="8">
                      <div class="alert alert-warning" style='margin-bottom: 0' role="alert">
                        {{$t('tableNoData')}}
                      </div>
                    </td>
                  </tr>
                  <tr v-else v-for="(item,index) in txData.data" :key="index">
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
                    <td class="d-none d-sm-table-cell">
                      <a :href="'/block/'+item.blcokNumber">{{item.blcokNumber}}</a>
                    </td>
                    <td>
                      <div class="func-name">{{item.funcName}}</div>
                    </td>
                    <td v-if='!timeFlag' class="showDate " style="">
                      <el-tooltip
                        :content="item.timestamp|timeFormatUTC"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal font-size-3 text-dark" style="padding: 0">
                          <span >{{item.timestamp|timeFormat}}</span>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td class="showAge " v-else>
                      <el-tooltip
                        :content="item.timestamp|timeFormat"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal font-size-3 text-dark" style="padding: 0">
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
                          <span class="hash-tag text-truncate"><a :href="'/address/'+item.from">{{item.from}}</a></span>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td>
                      <span v-if="item.from===address"
                            class="u-label u-label--xs u-label--warning color-strong text-uppercase text-center rounded text-nowrap"
                            style="width:100%">{{$t('common.out')}}</span>
                      <span
                        class="u-label u-label--xs u-label--success color-strong text-uppercase text-center rounded text-nowrap"
                        style="width:100%" v-else-if="item.to===address">&nbsp;{{$t('common.in')}}&nbsp;</span>
                      <span class="btn btn-xs btn-icon btn-soft-success rounded-circle" v-else>
                      <i class="fas fa-long-arrow-alt-right btn-icon__inner"></i>
                    </span>
                    </td>
                    <td>
                      <span style="white-space: nowrap;" v-if="item.to">
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
                          <a class="hash-tag text-truncate"
                             :href="'/address/'+item.contractAddress">{{$t('common.contractCreation')}}</a>
                        </el-button>
                      </el-tooltip>
                      </span>
                    </td>
                    <td>
                      <value-format :unitCurrency="'DBOX'" className="text-dark font-size-3" :value="item.value||'0'"></value-format>
                    </td>
                    <td style="display: flex;justify-content: space-between">
                      <value-format className="text-secondary font-size-3" :value="item.txFee||'0'"></value-format>
                      <el-tooltip
                        v-if="item.metaAddress"
                        :content="item.metaAddress+ $t('common.pay')+ formatDecimal(accDiv(item.feePercent||0,100),2)+' %'+$t('common.transactionFee')"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal" style="padding: 0;color: #3F7FFF;">
                          <span
                            class="u-label u-label--xs u-label--success color-strong text-uppercase text-center rounded text-nowrap">&nbsp;META&nbsp;</span>
                        </el-button>
                      </el-tooltip>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="tab-pane fade in" :class="hash === 'mine'?'show active':''" id="mine">
              <div class="d-md-flex justify-content-between align-items-center mb-4">
                <p class="mb-2 mb-lg-0">
                  <i class="fas fa-sort-amount-down text-secondary"></i>&nbsp;{{$t('address.tab2Tip1')}} <a
                  :href="'/blocks/25/1?m='+address">{{minedTotal.totalMinedBlockNum || 0}} {{$t('address.tab2Tip2')}} </a>
                  {{$t('address.tab2Tip3')}}
                  <value-format className="text-secondary font-size-3" :unitCurrency="'DBOX'" :value="minedTotal.fees||'0'"></value-format>
                  {{$t('address.tab2Tip4')}}
                </p>
                <nav class="mb-0 mb-md-0" aria-label="page navigation">
                  <a title="" class="btn btn-xss btn-primary" :href="'/blocks/25/1?m='+address">{{$t('address.viewAll')}}</a>
                </nav>
              </div>
              <!--validated Blocks-->
              <div class="table-responsive mb-2 mb-md-0">
                <table class="table table-hover">
                  <thead class="thead-light">
                  <tr>
                    <th scope="col">
                      {{$t('common.block')}}
                    </th>
                    <!-- <th scope="col">
                      Method
                    </th> -->
                    <th scope="col">
                      <a v-if="!timeFlag" href="javascript:;" @click="switchAgeToDateTimeInAddPage">{{$t('common.time')}}</a>
                      <a href="javascript:;" @click="switchAgeToDateTimeInAddPage" v-else>{{$t('common.age')}}</a>
                    </th>
                    <th scope="col">
                      {{$t('common.transaction')}}
                    </th>
                    <th scope="col">
                      {{$t('common.gasUsed')}}
                    </th>
                    <th scope="col">
                      {{$t('common.reward')}}
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-if="MinedBlocks&&MinedBlocks.length<0">
                    <td colspan="8">
                      <div class="alert alert-warning" style='margin-bottom: 0' role="alert">
                        {{$t('tableNoData')}}
                      </div>
                    </td>
                  </tr>
                  <tr v-else v-for="(item,index) in MinedBlocks" :key="index">
                    <td>
                      <span class="hash-tag text-truncate">
                        <a :href="'/block/'+item.blockNumber">{{item.blockNumber}}</a>
                      </span>
                    </td>
                    <td class="showDate " v-if="!timeFlag">
                      <el-tooltip
                        :content="item.timestamp|timeFormatUTC"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                          <span>{{item.timestamp | timeFormat}}</span>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td class="showAge " v-else>
                      <el-tooltip
                        :content="item.timestamp|timeFormat"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                          <span>{{formatTime(item.timestamp)}}</span>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td>{{item.txs}}</td>
                    <td>{{item.gasUsed}} <span
                      class="small text-secondary">({{formatDecimal(fxf(accDiv(item.gasUsed || 0, item.gasLimit || 0), 100), 2)}}%)</span>
                      <div class="progress mt-1" style="height:2px;">
                        <div class="progress-bar bg-primary" role="progressbar"
                             :style="'width:'+fxf(accDiv(item.gasUsed||0,item.gasLimit),100)+'%;'"
                             :aria-valuenow="fxf(accDiv(item.gasUsed,item.gasLimit),100)" aria-valuemin="0"
                             aria-valuemax="100"></div>
                      </div>
                    </td>
                    <td>
                      <value-format className="text-dark font-size-3" :unitCurrency="'DBOX'" :value="item.reward||'0'"></value-format>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="tab-pane fade in" :class="hash === 'tokenTxns'?'show active':''"  id="tokenTxns" v-show="erc20List.length>0" visible="false">
              <div class="d-md-flex justify-content-between align-items-center mb-4">
                <p class="mb-2 mb-lg-0">
                  <i class="fas fa-sort-amount-down"></i>&nbsp;{{$t('address.tab3Tip1')}}</p>
              </div>
              <div class="table-responsive mb-2 mb-md-0">
                <table class="table table-hover">
                  <thead class="thead-light">
                  <tr>
                    <th scope="col" width="1">
                      {{$t('common.txhash')}}
                    </th>
                     <!-- <th scope="col" width="1">
                       Method
                    </th> -->
                    <th scope="col">
                      <a v-if="!timeFlag" href="javascript:;" @click="switchAgeToDateTimeInAddPage">{{$t('common.time')}}</a>
                      <a href="javascript:;" @click="switchAgeToDateTimeInAddPage" v-else>{{$t('common.age')}}</a>
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
                      {{$t('common.token')}}
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-if="erc20List&&erc20List.length<0">
                    <td colspan="8">
                      <div class="alert alert-warning" style='margin-bottom: 0' role="alert">
                        {{$t('tableNoData')}}
                      </div>
                    </td>
                  </tr>
                  <tr v-else v-for="(item,index) in erc20List" :key="index">
                    <td>
                      <el-tooltip
                        :content="item.txHash"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal" style="padding: 0;color: #3F7FFF;">
                          <a class="hash-tag text-truncate" :href="'/tx/'+item.txHash">{{item.txHash}}</a>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td class="showDate " v-if="!timeFlag">
                      <el-tooltip
                        :content="item.timestamp|timeFormatUTC"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                          <span>{{item.timestamp | timeFormat}}</span>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td class="showAge " v-else>
                      <el-tooltip
                        :content="item.timestamp|timeFormat"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                          <span>{{formatTime(item.timestamp)}}</span>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td style="white-space: nowrap;">
                      <el-tooltip
                        :content="item.fromAddr"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                          <a class="hash-tag text-truncate" :href="'/address/'+item.fromAddr">{{item.fromAddr}}</a>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td>
                      <span v-if="item.fromAddr === address"
                            class="u-label u-label--xs u-label--warning color-strong text-uppercase text-center rounded text-nowrap"
                            style="width:100%">{{$t('common.out')}}</span>
                      <span
                        class="u-label u-label--xs u-label--success color-strong text-uppercase text-center rounded text-nowrap"
                        style="width:100%" v-else-if="item.toAddr === address">&nbsp;{{$t('common.in')}}&nbsp;</span>
                      <span v-else></span>
                    </td>
                    <td style="white-space: nowrap;">
                      <el-tooltip
                        :content="item.toAddr"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                          <a class="hash-tag text-truncate" :href="'/address/'+item.toAddr">{{item.toAddr}}</a>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td>
                      <value-format className="text-dark font-size-3" :value="item.valueToString||'0'"></value-format>
                    </td>
                    <td>
                      <a :href="'/token/'+item.address+'/25/1'">
                        {{item.tokenName}}
                      </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="tab-pane fade in" :class="hash === 'tokenTxns-nft'?'show active':''"  id="tokenTxns-nft" v-show="erc721List.length>0" visible="false">
              <div class="d-md-flex justify-content-between align-items-center mb-4">
                <p class="mb-2 mb-lg-0">
                  <i class="fas fa-sort-amount-down"></i>&nbsp;{{$t('address.tab4Tip1')}}</p>
              </div>
              <div class="table-responsive mb-2 mb-md-0">
                <table class="table table-hover">
                  <thead class="thead-light">
                  <tr>
                    <th scope="col" width="1">
                      {{$t('common.txhash')}}
                    </th>
                   <th scope="col" width="1">
                       Method
                    </th>
                    <th scope="col">
                      <a v-if="!timeFlag" href="javascript:;" @click="switchAgeToDateTimeInAddPage">{{$t('common.time')}}</a>
                      <a href="javascript:;" @click="switchAgeToDateTimeInAddPage" v-else>{{$t('common.age')}}</a>
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
                      {{$t('common.token')}}
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-if="erc721List&&erc721List.length<0">
                    <td colspan="8">
                      <div class="alert alert-warning" style='margin-bottom: 0' role="alert">
                        {{$t('tableNoData')}}
                      </div>
                    </td>
                  </tr>
                  <tr v-else v-for="(item,index) in erc721List" :key="index">
                    <td>
                      <el-tooltip
                        :content="item.txHash"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal" style="padding: 0;color: #3F7FFF;">
                          <a class="hash-tag text-truncate" :href="'/tx/'+item.txHash">{{item.txHash}}</a>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td class="showDate " v-if="!timeFlag">
                      <el-tooltip
                        :content="item.timestamp|timeFormatUTC"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                          <span>{{item.timestamp | timeFormat}}</span>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td class="showAge " v-else>
                      <el-tooltip
                        :content="item.timestamp|timeFormat"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                          <span>{{formatTime(item.timestamp)}}</span>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td style="white-space: nowrap;">
                      <el-tooltip
                        :content="item.fromAddr"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                          <a class="hash-tag text-truncate" :href="'/address/'+item.fromAddr">{{item.fromAddr}}</a>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td>
                      <span v-if="item.fromAddr === address"
                            class="u-label u-label--xs u-label--warning color-strong text-uppercase text-center rounded text-nowrap"
                            style="width:100%">{{$t('common.out')}}</span>
                      <span
                        class="u-label u-label--xs u-label--success color-strong text-uppercase text-center rounded text-nowrap"
                        style="width:100%" v-else-if="item.toAddr === address">{{$t('common.in')}}&nbsp;</span>
                      <span v-else></span>
                    </td>
                    <td style="white-space: nowrap;">
                      <el-tooltip
                        :content="item.toAddr"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                          <span class="hash-tag text-truncate">{{item.toAddr}}</span>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td>
                      <value-format className="text-dark font-size-3" :value="item.valueToString||'0'"></value-format>
                    </td>
                    <td>
                      <a :href="'/token/'+item.address+'/25/1'">
                        {{item.tokenName}}
                      </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
             <div class="tab-pane fade in" :class="hash === 'tokenTxns-nft1155'?'show active':''"  id="tokenTxns-nft1155" v-show="erc1155List.length>0" visible="false">
              <div class="d-md-flex justify-content-between align-items-center mb-4">
                <p class="mb-2 mb-lg-0">
                  <i class="fas fa-sort-amount-down"></i>&nbsp; Latest 25 ARC-1155 Token Transfer Events</p>
              </div>
              <div class="table-responsive mb-2 mb-md-0">
                <table class="table table-hover">
                  <thead class="thead-light">
                  <tr>
                    <th scope="col" width="1">
                      {{$t('common.txhash')}}
                    </th>
                   <!-- <th scope="col" width="1">
                       Method
                    </th> -->
                    <th scope="col">
                      <a v-if="!timeFlag" href="javascript:;" @click="switchAgeToDateTimeInAddPage">{{$t('common.time')}}</a>
                      <a href="javascript:;" @click="switchAgeToDateTimeInAddPage" v-else>{{$t('common.age')}}</a>
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
                      {{$t('common.token')}}
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-if="erc1155List&&erc1155List.length<0">
                    <td colspan="8">
                      <div class="alert alert-warning" style='margin-bottom: 0' role="alert">
                        {{$t('tableNoData')}}
                      </div>
                    </td>
                  </tr>
                  <tr v-else v-for="(item,index) in erc1155List" :key="index">
                    <td>
                      <el-tooltip
                        :content="item.txHash"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal" style="padding: 0;color: #3F7FFF;">
                          <a class="hash-tag text-truncate" :href="'/tx/'+item.txHash">{{item.txHash}}</a>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td class="showDate " v-if="!timeFlag">
                      <el-tooltip
                        :content="item.timestamp|timeFormatUTC"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                          <span>{{item.timestamp | timeFormat}}</span>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td class="showAge " v-else>
                      <el-tooltip
                        :content="item.timestamp|timeFormat"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                          <span>{{formatTime(item.timestamp)}}</span>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td style="white-space: nowrap;">
                      <el-tooltip
                        :content="item.fromAddr"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                          <a class="hash-tag text-truncate" :href="'/address/'+item.fromAddr">{{item.fromAddr}}</a>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td>
                      <span v-if="item.fromAddr === address"
                            class="u-label u-label--xs u-label--warning color-strong text-uppercase text-center rounded text-nowrap"
                            style="width:100%">{{$t('common.out')}}</span>
                      <span
                        class="u-label u-label--xs u-label--success color-strong text-uppercase text-center rounded text-nowrap"
                        style="width:100%" v-else-if="item.toAddr === address">{{$t('common.in')}}&nbsp;</span>
                      <span v-else></span>
                    </td>
                    <td style="white-space: nowrap;">
                      <el-tooltip
                        :content="item.toAddr"
                        placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                          <span class="hash-tag text-truncate">{{item.toAddr}}</span>
                        </el-button>
                      </el-tooltip>
                    </td>
                    <td>
                      <value-format className="text-dark font-size-3" :value="item.valueToString||'0'"></value-format>
                    </td>
                    <td>
                      <a :href="'/token/'+item.address+'/25/1'">
                        {{item.tokenName}}
                      </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="tab-pane fade in"  :class="hash === 'code' || hash === 'readContract' || hash === 'writeContract'?'show active':''" visible="false" style="min-height:300px">
              <div class="d-md-flex justify-content-between align-items-center sticky-top bg-white-content py-1 mb-3">
                <ul class="nav nav-pills nav-pills-secondary mb-3" id="nav_subtabs" role="tablist">
                <li id="ContentPlaceHolder1_li_code" class="nav-item" @click="tabFuc('#code')"><a :class="hash === 'code'?'nav-link show active':'nav-link'" href="#code" data-toggle="tab" ><span>Code</span></a></li>
                <li id="ContentPlaceHolder1_li_readContract" class="nav-item" v-if="readAbiData.length>0"><a :class="hash === 'readContract'?'nav-link show active':'nav-link'"  @click="tabFuc('#readContract')" href="#readContract" data-toggle="tab" >Read <span class="d-none d-sm-inline-block">Contract</span></a></li>
                <li id="ContentPlaceHolder1_li_writeContract" class="nav-item" v-if="writeAbiData.length>0"><a :class="hash === 'writeContract'?'nav-link show active':'nav-link'"  @click="tabFuc('#writeContract')" href="#writeContract" data-toggle="tab" >Write <span class="d-none d-sm-inline-block">Contract</span></a></li>
                </ul>
                <!-- <div class="input-group input-group-xs">
<input type="text" class="form-control" autocomplete="off" id="txtSearchContract" name="txtSearchContract" placeholder="Search Source Code" aria-label="Search Source Code" aria-describedby="button-header-search" maxlength="68" style="width: 250px; font-size: small;">
<div class="input-group-append">
<input type="hidden" id="hdnSearchCount" value="" />
<button class="btn btn-custom border" id="btnCustomNext" style="cursor:pointer;" @click="searchContractNext()"><i class="fas fa-chevron-down"></i></button>
<button class="btn btn-custom border" id="btnCustomPrevious" style="cursor:pointer;" onclick="searchContractPrevious();"><i class="fas fa-chevron-up"></i></button>
</div>
</div> -->
               </div>
              <div class="tab-pane fade"  :class="hash === 'code' ? 'block show active':'none'" id="code" >
                <span class="mb-3" v-if="contractDetail.openSource===0"><span class="h5 mb-0"><i
                  class="fa fa-info-circle text-secondary"></i></span> {{$t('address.tab5Tip1')}} <a
                  :href="'/verifyContract?a='+address"><b>{{$t('address.tab5Tip2')}}</b></a> {{$t('address.tab5Tip3')}}<br><br></span>
                <div v-else>
                  <div class="row py-1">
                    <div class="col-md-12">
                      <h3 class="h6 text-dark font-weight-bold mb-4">
                        <i class="fa fa-check-circle text-success"></i> <strong>{{$t('address.tab5Tip4')}}</strong>
                      </h3>
                    </div>
                  </div>
                  <div class="row mx-gutters-lg-1 mb-5">
                    <div class="col-md-6">
                      <div class="row align-items-center">
                        <div class="col-5 col-lg-4 mb-1 mb-md-0">{{$t('address.contractName')}}:</div>
                        <div class="col-7 col-lg-8">
                          <span class="h6 font-weight-bold mb-0">{{contractDetail.contractName}}</span>
                        </div>
                      </div>
                      <hr class="hr-space">
                      <div class="row">
                        <div class="col-5 col-lg-4 mb-1 mb-md-0">{{$t('address.compilerVersion')}}:</div>
                        <div class="col-7 col-lg-8">
                          <span class="h6 font-weight-bold mb-0">{{contractDetail.compilerVersion}}</span>
                        </div>
                      </div>
                      <hr class="d-block d-md-none">
                    </div>
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-5 col-lg-4 mb-1 mb-md-0">{{$t('address.optimizationEnabled')}}:</div>
                        <div class="col-7 col-lg-8">
                          <span class="h6 font-weight-bold mb-0" v-if="contractDetail.optimization===2">Yes <span
                            class="font-weight-normal">with</span> {{contractDetail.optimizationArg}} <span
                            class="font-weight-normal">runs</span></span>
                          <span class="h6 font-weight-bold mb-0" v-else>No</span>
                        </div>
                      </div>
                      <hr class="hr-space">
                      <div class="row">
                        <div class="col-5 col-lg-4 mb-1 mb-md-0">{{$t('address.otherSettings')}}:</div>
                        <div class="col-7 col-lg-8">
                        <span class="h6 font-weight-bold mb-0"><span
                          class="font-weight-normal">{{contractDetail.evmVersion}}, <b>{{contractDetail.license}}</b> <span
                          class="font-weight-normal"><a href="javascript:;">license</a></span>
                        </span></span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="dividcode">
                  <div class="mb-4" v-show="contractDetail.openSource===1">
                    <!-- <div class="d-md-flex justify-content-between align-items-center bg-white-content py-2">
                      <h4 class="card-header-title">
                        <i class="far fa-file-code text-secondary mr-1"></i>
                        {{$t('address.contractSourceCode')}}
                        <span class="font-weight-normal text-secondary">(Solidity)</span>
                      </h4>
                      <div class="mt-1 mt-md-0">
                        <a class="btn btn-sm btn-icon btn-secondary" href="javascript:;"
                           @click="copySourceCodeBtn"><i
                          class="far fa-copy btn-icon__inner"></i></a>
                        <a href="javascript:;" class="btn btn-xss btn-secondary"
                           @click="toggleFullScreen">
                          <i class="fa" :class="!expand?'fa-expand':'fa-compress'"></i>
                        </a></div>
                    </div> -->
                    <div v-for="(item, index) in contractDetail.code" :key="index">
                      <div class="d-md-flex justify-content-between align-items-center bg-white-content py-2">
                      <h4 class="card-header-title">
                        <i class="far fa-file-code text-secondary mr-1"></i>
                        {{$t('address.contractSourceCode')}}
                        <span class="font-weight-normal text-secondary">(Solidity)</span>
                      </h4>
                      <div class="mt-1 mt-md-0">
                        <a class="btn btn-sm btn-icon btn-secondary" href="javascript:;"
                           @click="copySourceCodeBtn(index)"><i
                          class="far fa-copy btn-icon__inner"></i></a>
                        <a href="javascript:;" class="btn btn-xss btn-secondary"
                           @click="toggleFullScreen(index)">
                          <i class="fa" :class="!expand[index]?'fa-expand':'fa-compress'"></i>
                        </a></div>
                    </div>
                      <span
                        class="text-secondary">File {{index + 1}} of {{contractDetail.code.length}} : {{item.fileName}}</span>
                      <pre class="editor ace_editor ace-dawn" :id="'editor' + index" style="margin-top: 5px; height: 400px">
                      {{item.code}}
                      </pre>
                      <br>
                    </div>
                  </div>
                  <div class="mb-4">
                    <div v-if="contractDetail.openSource===1"
                         class="d-md-flex justify-content-between align-items-center bg-white-content py-2"><h4
                      class="card-header-title"><i class="fa fa-tasks text-secondary mr-1"></i>Contract ABI
                    </h4>
                    </div>
                    <pre v-if="contractDetail.openSource===1" class="wordwrap"
                         style="height: 240px; max-height: 400px; margin-top: 5px; white-space: pre-wrap;"><div>{{contractDetail.abi}}</div></pre>
                    <br>
                    <div v-if="contractDetail.openSource===1"
                         class="d-md-flex justify-content-between align-items-center bg-white-content py-2"><h4
                      class="card-header-title"><i class="fa fa-code text-secondary mr-1"></i>{{$t('address.contractCreationCode')}}
                    </h4>
                    </div>
                    <pre class="wordwrap"
                         style="height: 200px; max-height: 400px; margin-top: 5px; white-space: pre-wrap;"><div>{{code}}</div></pre>
                    <br>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" v-if="contractDetail.openSource===1"  :class="hash === 'readContract' ? 'block show active':'none'" id="readContract" >
               <div id="readContractAccordion">
                <div class="card shadow-none mb-3" v-for="(item, k) in readAbiData " v-bind:key='k'>
                  <div class="card-header bg-light card-collapse p-0" id="readHeading1" @click="clickCollapse(item, k)">
                    <a class="btn btn-link btn-block text-dark d-flex justify-content-between align-items-center py-2 collapsed" data-toggle="collapse" :href="'#readCollapse' + k + 1" aria-expanded="false" :aria-controls="'readCollapse' + k +1">
                      {{k + 1}}. {{item.name}} <span class="accordion-arrow"><i class="fas fa-arrow-down small"></i></span>
                    </a>
                    </div>
                    <div :id="'readCollapse' + k +1" class="readContractFunction collapse" :aria-labelledby="'readHeading' + k +1" style="">
                      <div class="card-body p-3">
                        <form>
                          <div class="form-group" v-if="item.inputs.length === 0">{{item.outputs[0].type === 'uint256' ? Number(item.result): (item.result)}} <i><span class="text-monospace text-secondary">{{item.outputs[0].type}}</span></i></div>
                           <div class="form-group" v-if="item.inputs.length > 0">
                             <div class="form-group" v-for="item1 in item.inputs" v-bind:key='item1.name'>
                               <label>{{item1.name}} ({{item1.type}})</label><input type="text" class="form-control form-control-xs" v-model="item1.val"  :placeholder="item1.name + ' (' + item1.type+ ')'">
                               </div>
                               <div class="write-result">
                                <button type="button" id="btn_2" class="btn btn-xs btn-light border" @click="ethcall(item, k)">Query</button>
                                <div v-if="item.errorMsg" class="error">{{item.errorMsg}}</div>
                              </div>
                              <div v-if="item.result && !item.errorMsg">
                                <span ><br><br> [&nbsp;<b>{{item.name}}</b> method Response ]<br>&nbsp;<span class="text-success"><i class="fa  fa-angle-double-right"></i></span>  <strong></strong> &nbsp; <span class="text-secondary"><i>{{item.outputs[0].type}}</i></span> <b>:</b> &nbsp;{{item.outputs[0].type === 'uint256' ? Number(item.result): item.result}}<br><br></span>
                              </div>
                           </div>
                        </form>
                      </div>
                      </div>
                    </div>
                </div>
              </div>
               <div class="tab-pane fade" v-if="contractDetail.openSource===1"  :class="hash === 'writeContract' ? 'block show active':'none'" id="readContract" >
               <div id="ContractAccordion">
                 <div id="header">
                <div class="d-sm-flex justify-content-between mb-3">
                  <p class="ml-3 mr-3 mb-1" v-if="!account"><i id="connector" class="fa fa-circle text-danger mr-1"></i><a  href="javascript:;" data-toggle="modal"  data-target="#myModalConnect" id="connectStatus" class="forum-title connect">Connect to MetaMask</a></p>
                  <p class="ml-3 mr-3 mb-1" v-if="account"><i id="connector" class="fa fa-circle mr-1 text-success" title="" data-toggle-second="tooltip" data-original-title="Connected"></i><a id="connectStatus" class="forum-title">Connected - Web3 [<a target="_blank" :href="'/address/'+ account">{{account}}</a>]</a></p>
                  <a class="ml-3 mr-3" href="javascript:;" @click="reset">[Reset]</a>
                </div></div>
                <div class="card shadow-none mb-3" v-for="(item, k) in writeAbiData " v-bind:key='k'>
                  <div class="card-header bg-light card-collapse p-0" id="readHeading1" @click="clickCollapse(item, k)">
                    <a class="btn btn-link btn-block text-dark d-flex justify-content-between align-items-center py-2 collapsed" data-toggle="collapse" :href="'#readCollapse' + k + 1" aria-expanded="false" :aria-controls="'readCollapse' + k +1">
                      {{k + 1}}. {{item.name}} <span class="accordion-arrow"><i class="fas fa-arrow-down small"></i></span>
                    </a>
                    </div>
                    <div :id="'readCollapse' + k +1" class="readContractFunction collapse" :aria-labelledby="'readHeading' + k +1" style="">
                      <div class="card-body p-3">
                        <form>
                          <div class="form-group" v-if="item.inputs.length > 0">
                             <div class="form-group" v-for="(item1) in item.inputs" v-bind:key='item1.name'>
                               <label v-if="item1.name !== 'payableAmount' ">{{item1.name}} ({{item1.type}})</label><input type="text" class="form-control form-control-xs" v-model="item1.val"  :placeholder="item1.name !== 'payableAmount'? item1.name + ' (' + item1.type+ ')': 'payableAmount(DBOX)'">
                               </div>
                               <div class="write-result">
                                  <button type="button" id="btn_2" class="write-btn btn btn-xs btn-primary border" @click="ethcallWrite(item, k)">Write</button>
                                  <div v-if="item.errorMsg" class="error">{{item.errorMsg}}</div>
                                  <div v-if="item.writeHash"> <a :href="'/tx/'+ item.writeHash" target="_blank" class="write-hash">View your transaction</a></div>
                               </div>
                              
                              <div v-if="item.result">
                                <span ><br><br> [&nbsp;<b>{{item.name}}</b> method Response ]<br>&nbsp;<span class="text-success"><i class="fa  fa-angle-double-right"></i></span>  <strong></strong> &nbsp; <span class="text-secondary"><i>{{item.outputs[0].type}}</i></span> <b>:</b> &nbsp;{{item.result}}<br><br></span>
                              </div>
                           </div>
                           <div class="form-group" v-else>
                             <div class="form-group">
                               <div class="write-result">
                                  <button type="button" id="btn_2" class="write-btn btn btn-xs btn-primary border" @click="ethcallWrite(item, k)">Write</button>
                                  <div v-if="item.errorMsg" class="error">{{item.errorMsg}}</div>
                                  <div v-if="item.writeHash"> <a :href="'/tx/'+ item.writeHash" target="_blank" class="write-hash">View your transaction</a></div>
                               </div>
                                <div v-if="item.result">
                                  <span ><br><br> [&nbsp;<b>{{item.name}}</b> method Response ]<br>&nbsp;<span class="text-success"><i class="fa  fa-angle-double-right"></i></span>  <strong></strong> &nbsp; <span class="text-secondary"><i>{{item.outputs[0].type}}</i></span> <b>:</b> &nbsp;{{item.result}}<br><br></span>
                                </div>
                              </div>
                           </div>
                        </form>
                      </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade in" :class="hash === 'events'?'show active':''" id="events" visible="false">
              <div class="table-responsive">
                <div class="d-md-flex justify-content-between mb-4">
                  <p class="mb-2 mb-md-0">
                    <i class="fas fa-sort-amount-down"></i>{{$t('address.tab6Tip1')}}
                    <span class="d-block small text-secondary">{{$t('address.tab6Tip2')}}:
                      <a href="http://solidity.readthedocs.io/en/latest/contracts.html#events" target="_blank" rel="noopener noreferrer">{{$t('address.tab6Tip3')}}</a>
                     {{$t('address.tab6Tip4')}}</span>
                  </p>
                  <div class="mb-2 mb-md-0">
                    <div class="position-relative mr-3">
                      <div class="btn-group ml-auto mr-1" role="group" v-show="filterFlag">
                        <span class="btn btn-xss btn-soft-secondary ml-auto" style="padding: .1rem .6rem;">
                          <span v-if="typeof filterFlag === 'number' && !isNaN(filterFlag)" class="hash-tag text-truncate">{{$t('address.tab6Filter')}} [BlockNo] = {{filterFlag}}</span>
                          <span class="hash-tag text-truncate" v-else-if="filterError"> {{$t('address.invalid')}} '{{filterFlag}}'</span>
                          <span class="hash-tag text-truncate" v-else> {{$t('address.tab6Filter')}} [topic0] = {{filterFlag}}</span>
                        </span>
                        <a class="btn btn-sm btn-icon btn-soft-secondary" href="javascript:;"  @click="closeFilter()"  role="button">
                          <i class="fa fa-times btn-icon__inner"></i>
                        </a>
                      </div>
                      <a class="btn btn-sm btn-icon btn-primary" @click="showFilter()" href="javascript:;" role="button">
                        <i class="fa fa-search btn-icon__inner"></i>
                      </a>
                      <!-- Input -->
                      <div id="searchFilter" class="dropdown-menu dropdown-unfold dropdown-menu-right p-2 u-unfold--css-animation" :style="{display:(showFilterFlag?'block':'none')}">
                        <div class="input-group input-group-sm" style="width: 265px;">
                          <input name="txtSearch"  v-model.trim="findAddress"  @keyup.enter="findAddressFn()"  title="Search and filter Event Logs for this Address by BlockNo or Topic0 Hash" class="form-control" type="search" :placeholder="$t('address.searchPlaceholder')">
                          <div class="input-group-append">
                            <input type="submit" name="btnFind" :value="$t('address.find')" @click="findAddressFn()" class="btn btn-primary">
                          </div>
                        </div>
                      </div>
                      <!-- End Input -->
                    </div>
                  </div>
                </div>
                <table class="table table-md-text-normal table-hover">
                  <thead class="thead-light">
                  <tr>
                    <th scope="col">{{$t('common.txhash')}}</th>
                    <th scope="col"><i class="fa fa-indent mr-1"></i>{{$t('address.tab6Tip3')}}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-if="!TokenEvents[0]">
                    <td colspan="8">
                      <div class="alert alert-warning" style='margin-bottom: 0' role="alert">
                        {{$t('tableNoData')}}
                      </div>
                    </td>
                  </tr>
                  <tr v-else v-for="(item,index) in TokenEvents" :key="index">
                    <td>
                      <el-tooltip
                        :content="item.transactionHash"
                        placement="top" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                          <a class="hash-tag text-truncate" :href="'/tx/'+item.transactionHash">{{item.transactionHash}}</a>
                        </el-button>
                      </el-tooltip>
                      <br># <a :href="'/block/'+item.blockNumber" data-toggle="tooltip" title="" data-original-title="BlockNo">{{item.blockNumber}}</a>
                      <el-tooltip
                        :content="$t('address.filterBy')+' BlockNo='+item.blockNumber"
                        placement="top" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                          <i class="fa fa-filter small text-secondary" @click="findAddressFn(item.blockNumber)"></i>
                        </el-button>
                      </el-tooltip>
                      <br>
                      <span class="small text-secondary">
                        <el-tooltip
                          :content="item.timestamp|timeFormat"
                          placement="bottom" effect="dark">
                        <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                         <span class="u-label u-label--xs u-label--secondary rounded mt-1">{{formatTime(item.timestamp)}}</span>
                        </el-button>
                      </el-tooltip>
                      </span>
                    </td>
                    <td>
                      <div v-if="item.funcName">
                        <a class="accordion-toggle text-monospace" data-toggle="collapse" :data-target="'#event-item'+index" style="cursor: pointer;">
                        <span style="color:#3F7FFF">
                          <i class="fa fa-chevron-right small text-secondary"></i>
                           {{item.funcName}}
                        </span>
                        </a>
                        <span class="text-monospace mb-1">
                         (<span v-for="(v,i) in item.args" :key="i">
                            {{v.indexed ? 'indexed':''}} <span class="text-success">{{v.type}}</span>
                            <span class="text-danger">{{v.name}}</span>{{i === item.args.length-1?' ':','}}
                          </span>)
                      </span>
                        <br>
                        <div :id="'event-item'+index" class="collapse text-monospace">
                          <div>
                            <div v-for="(v,i) in item.args" :key="i">
                              &nbsp;&nbsp;&nbsp;
                              <i>
                                <span class="text-secondary">{{v.type}} </span>
                              </i> {{v.name}}<br>&nbsp;&nbsp;&nbsp;
                              <span style="display: inline-block; height: 25px;">
                              <a v-if="v.type==='address'" :href="'/address/'+v.data">{{v.data}}</a>
                              <span style="display: inline-block; height: 25px;" v-else>{{v.data}}</span>
                            </span>
                              <br>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span style="font-family: Monospace;">
                        <div :class="i===0 ?'text-secondary':''" v-for="(v,i) in item.topicList" :key="i">
                          [topic{{i}}] {{v.data}}
                          <el-tooltip
                            v-if="i===0"
                            :content="$t('address.filterBy')+'topic0'"
                            placement="top" effect="dark">
                            <el-button type="text" class="font-weight-normal text-dark" style="padding: 0;color: #3F7FFF;">
                              <i class="fa fa-filter small  text-secondary  ml-1" @click="findAddressFn(v.data)"></i>
                            </el-button>
                          </el-tooltip>
                        </div>
                        <div style="white-space: initial;overflow: hidden;word-break: break-all;" v-if="item.funcName">
                          <span style="margin-top: .5rem;display: inline-block">
                            {{$t('transaction.data')}} : {{item.changeData||item.data}}
                          </span>
                        </div>
                        <table class="table-borderless mt-2" v-else>
                          <tbody>
                          <tr class="no-hover">
                            <td width="52px" class="p-0">
                              <span class="dropdown">
                                <button class="btn btn-xss btn-custom dropdown-toggle" type="button" @click="showDataOptions(index)">
                                  <span>{{item.typeData||$t('common.hex')}}</span>
                                </button>
                                <div class="dropdown-menu" style="bottom: 23px;top: auto;" :class="dataOptions && setIndex===index ?'show':''">
                                  <a class="dropdown-item" href="javascript:;" @click="funcOnclick('Hex',item.data,item.id);">{{$t('common.hex')}}</a>
                                  <a class="dropdown-item" href="javascript:;" @click="funcOnclick('unit',item.data,item.id);">{{$t('common.number')}}</a>
                                  <a class="dropdown-item" href="javascript:;" @click="funcOnclick('Text',item.data,item.id);">{{$t('common.text')}}</a>
                                  <a class="dropdown-item" href="javascript:;" @click="funcOnclick('address',item.data,item.id);">{{$t('common.address')}}</a>
                                </div>
                              </span>
                            </td>
                            <td width="10px" class="p-2">
                              <i class="fas fa-arrow-right"></i>
                            </td>
                            <td style="white-space: initial;overflow: hidden;word-break: break-all;">&nbsp;
                              {{item.changeData||item.data}}
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header p-2">
            <h5 class="modal-title small text-left w-100"><span id="qraddress">{{address}}</span></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div id="qrcode" class="img-fluid"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="myModalConnect" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header p-2">
            <h2 class="modal-title text-left w-600">Connect a Wallet</h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" style="font-size: 24px;">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="connect-modal" @click="connect">
              <div>MetaMask</div>
              <img src="../../images/metamask.svg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { BigNumber, ethers, Wallet, Contract } from 'ethers'
  import { AbiCoder, commify, formatEther, keccak256, parseEther, parseUnits, hexValue, isAddress, toUtf8Bytes} from 'ethers/lib/utils';
  import {
    getSearch,
    getAddressTxList,
    getTxCount,
    getAddressType,
    getAddressCode,
    getAddressContractDetails,
    getMinedBlocksList,
    getMinedBlocksTotal,
    getTokenTxList,
    getAssets,
    getTokenEvents,
    getLogsByParam
  } from '@/api/chains'
  import { formatDecimal, formatTime, accDiv, fxf } from '@/utils/index'
  import QRCode from 'qrcodejs2'
  import { utils } from 'ethers';
  import { Alert, Message } from 'element-ui'
  import ValueFormat from '@/components/ValueFormat'

  export default {
    data() {
      return {
        addressData: {},
        formatDecimal: formatDecimal,
        formatTime: formatTime,
        accDiv: accDiv,
        fxf: fxf,
        txData: {},
        pageNo: 1,
        pageSize: 25,
        total: 0,
        status: -1, // 0目前的矿工或者曾经当过矿工 1 用户 2 普通合约 3 erc20代币合约  4 erc721代币合约
        code: '',
        address: '',
        contractDetail: {},
        expand: [false,false,false,false,false],
        copy: false,
        dialogTableVisible: false,
        qr: '',
        timeFlag: false,
        MinedBlocks: '',
        minedTotal: {},
        erc20List: [],
        erc721List: [],
        erc1155List: [],
        tokenShow: false,
        assetList: [],
        assetSearch: [],
        assetSearch721: [],
        assetSearch1155: [],
        TokenEvents: [],
        dataOptions: false,
        hash: window.location.hash ? window.location.hash.split('#')[1] : '',
        pageLoading: true,
        setIndex: '',
        showFilterFlag: false,
        findAddress: '',
        filterFlag: '',
        filterError: false,
        readAbiData: [],
        writeAbiData: [],
        provider: '',
        account: '',
        writeHash: '',
        errorMsg: ''
      }
    },
    components: {
      ValueFormat
    },
    computed: {},
    created() {
      // console.log(process.env.RPC_URL)
      const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
      this.provider = provider
    },
    mounted() {
      const address = this.$route.params.id;
      this.address = address;
      getSearch(address).then(res => {
        if (res.status === 1) {
          this.addressData = res.data;
        }
      });
      getAssets(address).then(res => {
        if (res.status === 1) {
          if (res.data[20]) {
            this.assetList = this.assetList.concat(res.data[20])
            this.assetSearch = res.data[20];
          }
          if (res.data[721]) {
             this.assetList = this.assetList.concat(res.data[721])
             this.assetSearch721 = res.data[721];
          }
          if (res.data[1155]) {
            this.assetList = this.assetList.concat(res.data[1155])
            this.assetSearch1155 = res.data[1155];
          }
         
          // this.assetSearch721 = res.data[721];
          // this.assetSearch1155 = res.data[1155];
        }
      })
      this.getData();
      getTxCount({ address }).then((res) => {
        if (res.status === 1) {
          this.total = res.data
        }
      });
      getTokenTxList({ address, tokenType: 3, pageSize: this.pageSize, pageNo: this.pageNo }).then((res) => {
        if (res.status === 1) {
          this.erc20List = res.data.data
        }
      });
      getTokenTxList({ address, tokenType: 4, pageSize: this.pageSize, pageNo: this.pageNo }).then((res) => {
        if (res.status === 1) {
          this.erc721List = res.data.data
        }
      });
       getTokenTxList({ address, tokenType: 5, pageSize: this.pageSize, pageNo: this.pageNo }).then((res) => {
        if (res.status === 1) {
          this.erc1155List = res.data.data
        }
      });
      getAddressType({ address }).then(res => {
        if (res.status === 1) {
          this.status = res.data;
          if (res.data === 0) {
            getMinedBlocksList({ address, pageSize: this.pageSize, pageNo: this.pageNo }).then(response => {
              if (response.status === 1) {
                this.MinedBlocks = response.data ? response.data.data : []
              }
            });
            getMinedBlocksTotal({ address }).then(response => {
              if (response.status === 1) {
                this.minedTotal = response.data
              }
            })
          }
          if (res.data > 1) {
            // 合约地址
            getAddressCode({ address }).then(response => {
              if (response.status === 1) {
                this.code = response.data
              }
            });
            getAddressContractDetails({ address }).then(async response => {
              this.pageLoading = false
              if (response.status === 1) {
                this.contractDetail = response.data;
                if (response.data.abi) {
                const abiData = JSON.parse(response.data.abi)
                // console.log(abiData)
                let readAbiData = []
                let writeAbiData = []
                abiData.map(v => {
                  v.errorMsg = ''
                  v.writeHash = ''
                  if (v.type === "function") {
                    if (v.stateMutability === "nonpayable" || v.stateMutability === "payable") {
                      if(v.stateMutability === "payable") {
                        // console.log(v)
                        let obj = {
                          internalType: "unit256",
                          name: "payableAmount",
                          type: "unit256",
                        }
                        v.inputs.unshift(obj)
                      }
                      writeAbiData.push(v)

                    } else {
                      readAbiData.push(v)
                    }
                  }
                })
                this.readAbiData = readAbiData
                this.writeAbiData = writeAbiData
                // console.log(this.writeAbiData)
                // console.log(this.readAbiData)
                }
                
                // $('.editor').each(function (index) { // eslint-disable-line
                //       editor = ace.edit(this); // eslint-disable-line
                //       editor.setTheme('ace/theme/dawn');
                //       editor.getSession().setMode('ace/mode/csharp');
                //       editor.setOptions({ maxLines: 25 });
                //       editor.getSession().setUseWrapMode(true);
                //       editor.setOption('indentedSoftWrap', false);
                //       editor.setReadOnly(true);
                //       editor.setValue(code[index].code);
                //       editor.setShowPrintMargin(false);
                //       editor.$blockScrolling = Infinity;
                //       editor.gotoLine(1);
                //     });
                const code = response.data.code;
                if (code && code.length > 0) {
                  setTimeout(() => {
                    let editor;
                    
                    code.map((v, index) => {
                       editor = ace.edit('editor'+ index); // eslint-disable-line
                        editor.setTheme('ace/theme/dawn');
                        editor.getSession().setMode('ace/mode/csharp');
                        editor.setOptions({ maxLines: 25 });
                        editor.getSession().setUseWrapMode(true);
                        editor.setOption('indentedSoftWrap', false);
                        editor.setReadOnly(true);
                        editor.setValue(v.code);
                        editor.setShowPrintMargin(false);
                        editor.$blockScrolling = Infinity;
                        editor.gotoLine(1);
                      })
                    // console.log(code)
                  }, 1000)

                }
              }
            })
          } else {
            this.pageLoading = false
          }
        }
      });
      this.crateQrcode();
    },
    methods: {
      searchContractNext() {
        var editorNext;
                  editorNext = ace.edit(nextEditor);
                  editorNext.findNext();
                  nextCount += 1;
                  if (!nFlag) {
                      smoothScroll(document.getElementById(nextEditor));
                      nFlag = true;
                  }
            // if (editorArr.length == 0) {
            //     alert("No matching result.");
            // } else {
            //     if (!isSearch) { searchContractOnThisPage(); }
            //     if (nextEditor == "") {
            //         x = 0;
            //         nextEditor = editorArr[x];
            //     }
            //     if (nextLoop == 0) {
            //         y = 0;
            //         nextLoop = parseInt(splitCount[y]);
            //     } else if (nextLoop == nextCount) {
            //         x += 1;
            //         y += 1;
            //         nextCount = 0;
            //         if (editorArr[x] == undefined) { x = 0; }
            //         if (splitCount[y] == undefined) { y = 0; }
            //         nextEditor = editorArr[x];
            //         nextLoop = splitCount[y];
            //         nFlag = false;
            //     }
            //     if ($("#txtSearchContract").val() != "") {
            //         var editorNext;
            //         editorNext = ace.edit(nextEditor);
            //         editorNext.findNext();
            //         nextCount += 1;
            //         if (!nFlag) {
            //             smoothScroll(document.getElementById(nextEditor));
            //             nFlag = true;
            //         }
            //     }
            // }
        },
      async clickCollapse(item, k) {
        this.errorMsg = ''
        this.writeHash = ''
        // console.log(item)
        if (item.inputs.length >0 ) return
        if (item.stateMutability === "nonpayable" || item.stateMutability === "payable") return
        let address = this.$route.params.id
        const readContract = new Contract(address, this.readAbiData, this.provider);
        let res = await readContract[item.name]()
        this.readAbiData[k].result = res
        this.$forceUpdate()
      },
      async ethcall(item, k) {
        // console.log(item)

        item.errorMsg = ''
        let obj = []
        item.inputs.map((v) => {
          if (v.type === 'bool') {
            JSON.parse(v.val)
            if (!v.val) {
              item.errorMsg = `Error: Invalid number of parameters for ${item.name}. Got 0 expected ${item.inputs.length}!`
            }
          }
          if (v.type === 'uint256' || v.type === 'uint') {
            // console.log(v.val)
            // console.log(v.val && isNaN(Number(v.val)))
            if(v.val && isNaN(Number(v.val))) {
              item.errorMsg = ` Error: invalid number (arg="${v.name}", coderType="${v.type}", value="${v.val}")`
            }
            v.val = BigNumber.from(v.val)
           if (!v.val) {
              item.errorMsg = `Error: Invalid number of parameters for ${item.name}. Got 0 expected ${item.inputs.length}!`
            }
          }
          if (v.type === 'address' ) {
            if (!v.val) {
              item.errorMsg = `Error: Invalid number of parameters for ${item.name}. Got 0 expected ${item.inputs.length}!`
            } else if (!isAddress(v.val)) {
              item.errorMsg = ` Error: invalid address (arg="${v.name}", coderType="${v.type}", value="${v.val}")`
            }
          }
          obj.push(v.val)
        })
        let address = this.$route.params.id
        try {
          const readContract = new Contract(address, this.readAbiData, this.provider);
        let res = await readContract[item.name](...obj)
        this.readAbiData[k].result = res
        this.$forceUpdate()
        } catch (err) {
          console.log(err.toString())
          // let errResult = "" + err.toString().escape() + "";
          // console.log(errResult)
          // item.errorMsg = err.toString()
        }
        
      },
      async connect() {
        if ((window.ethereum.chainId) !== hexValue(process.env.CHAIN_ID)) {
          alert('Please connect your MetaMask to '+ process.env.CHAIN_NAME)
          return
        }
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        this.account = accounts[0]
        // console.log( $('#myModalConnect'))
        $('#myModalConnect').trigger("click");
        // console.log(accounts[0])
      },
      reset() {
        window.location.reload()
      },
      async ethcallWrite(item, k) {
        item.errorMsg = ''
        item.writeHash = ''
        // console.log(item)
        try {
          // await ethereum.request({
          //   method: 'wallet_switchEthereumChain',
          //   params: [{ chainId: hexValue(process.env.CHAIN_ID) }],
          // });
          if (!this.account) {
            alert('Please connect to your Web3 provider!')
            return
          }
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: hexValue(process.env.CHAIN_ID) }],
          });
          let address = this.$route.params.id
          const newProvider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = newProvider.getSigner(0);
          const writeContract = new Contract(address, this.writeAbiData, signer);
          let obj = []
          let isPayable = false
          let payableAmount = 0
          const coder = new AbiCoder()
          let typeArr = []
          let valArr = []
          let funName = ''
          if(item.inputs.length >0) {
            item.inputs.map((v) => {
              if (v.type === 'bool') {
                JSON.parse(v.val)
              }
              if (v.type === 'uint256' || v.type === 'uint') {
              if(v.val && isNaN(Number(v.val))) {
                  item.errorMsg = ` Error: invalid number (arg="${v.name}", coderType="${v.type}", value="${v.val}")`
                }
              v.val = BigNumber.from(v.val)
              }
              if (v.type === 'address' ) {
                if (v.val && !isAddress(v.val)) {
                  item.errorMsg = ` Error: invalid address (arg="${v.name}", coderType="${v.type}", value="${v.val}")`
                }
              }
              if (v.name !== "payableAmount") {
                 obj.push(v.val)
                 typeArr.push(v.type)
                 valArr.push(v.val)
              } else {
                isPayable = true
                payableAmount = BigNumber.from(v.val)
              }
            })
            // console.log(...obj)
            // console.log(typeArr)
            // console.log(valArr)
            const codeVal = coder.encode(typeArr, valArr)
            // console.log(codeVal)
            funName = item.name + '(' + typeArr.join(',') + ')'
            // console.log(funName)
            const keccakString = keccak256(toUtf8Bytes(funName))
            // console.log(keccakString)
            const codeString = keccakString.substr(0, 10) + codeVal.substr(2)
            // console.log(codeString)
            try {
              let result
              // if (isPayable) {
              //   result = await writeContract[item.name](...obj, {
              //     // gasLimit: 2000000,
              //     // value: 10000000000000
              //   })
              // } else {
                // result = await writeContract[item.name](...obj)
              // }
              let tx = {
              // gasPrice: utils.bigNumberify("20000000000"),
                to: address,
                value: isPayable ? payableAmount: 0,
                data: codeString
              };
              result = await signer.sendTransaction(tx)
              item.writeHash = result.hash
              this.$forceUpdate()
            } catch (error) {
              console.log(error)
              item.inputs.map((v) => {
                if (v.val && !item.errorMsg) {
                  item.errorMsg = error.message
                }
              })
              // this.errorMsg = error.message
            }
          } else {
            try {
              const result = await writeContract[item.name]( {
                gasLimit: 2000000,
              })
              item.writeHash = result.hash
              this.$forceUpdate()
            } catch (error) {
              // item.inputs.map((v) => {
              //   if (v.val && !item.errorMsg) {
              //     item.errorMsg = error.message
              //   }
              // })
              // console.log(error.data.message)
              item.errorMsg = error.message
            }
          }
        
        
        
        
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          // if (switchError.code === 4902) {
          //   try {
          //     await ethereum.request({
          //       method: 'wallet_addEthereumChain',
          //       params: [
          //         {
          //           chainId: hexValue(process.env.CHAIN_ID),
          //           chainName: process.env.CHAIN_NAME,
          //           nativeCurrency: {
          //             name: 'NOW',
          //             symbol: 'NOW', // 2-6 characters long
          //             decimals: 18
          //           },
          //           rpcUrls: [process.env.RPC_URL],
          //           blockExplorerUrls: [process.env.BLOCKEXPLORERURLS]
          //         },
          //       ],
          //     });
          //   } catch (addError) {
          //     // handle "add" error
          //   }
          // }
          // handle other "switch" errors
        }
        
      },
      getData(pageNo) {
        this.loading = true;
        const params = { address: this.address, pageSize: this.pageSize, pageNo: this.pageNo };
        getAddressTxList(params).then(res => {
          this.loading = false;
          if (res.status === 1) {
            this.txData = res.data;
          }
        });
        this.getEvent()
      },
      getEvent() {
        this.pageLoading = true;
        getTokenEvents(this.address).then(res => {
          this.pageLoading = false;
          if (res.status === 1) {
            const { data } = res;
            this.TokenEvents = data || [];
            if (data && data.length > 0) {
              data.map(value => {
                if (!value.funcName) {
                  return
                }
                value.args = JSON.parse(value.args);
                const mulData = value.args.filter(v => { return !v.indexed });
                if (mulData.length > 1) { // 有多data
                  const mulArray = this.hexUnitMultData(value.data, mulData);
                  value.args.map((v, i) => {
                    if (v.indexed) {
                      v.data = value.topicList[i + 1].data;
                      return
                    }
                    const index = mulData.findIndex(v2 => { return v2.name === v.name });
                    v.data = mulArray[index].toString()
                  });
                } else {
                  // 单data
                  value.args.map((v, i) => {
                    if (v.indexed) {
                      v.data = this.funcHex(v.type, value.topicList[i + 1].data);
                    } else {
                      v.data = this.funcHex(v.type, value.data)
                    }
                  });
                }
              });
            }
          }
        });
      },
      toggleFullScreen(index) {
        this.expand[index] = !this.expand[index];
        this.$forceUpdate()
        // console.log($('.editor')[index])
        // console.log(ace.edit('editor' + index))
        //  $($('.editor')[index]).height('100%'); // eslint-disable-line
        //   const editor = ace.edit('editor'+ index); // eslint-disable-line
        //   editor.setOptions({
        //     maxLines: Infinity
        //   });
        if (this.expand[index]) {
          $($('.editor')[index]).height('100%'); // eslint-disable-line
          const editor = ace.edit('editor'+ index); // eslint-disable-line
          editor.setOptions({
            maxLines: Infinity
          });
        } else {
          $($('.editor')[index]).height('350px'); // eslint-disable-line
          const editor = ace.edit('editor'+ index); // eslint-disable-line
          editor.setOptions({
            maxLines: 25
          });
        }
      },
      switchAgeToDateTimeInAddPage() {
        this.timeFlag = !this.timeFlag;
      },
      showQR() {
        this.dialogTableVisible = true;
        if (!this.qr) {
          this.$nextTick(() => {
            this.crateQrcode()
          })
        }
      },
      // 生成二维码
      crateQrcode() {
        this.qr = new QRCode('qrcode', {
          width: 235,
          height: 235, // 高度
          text: this.address // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f'
          // foreground: '#ff0'
        })
      },
      copyAddress() {
        document.getElementById('copyAddress').select();
        document.execCommand('copy');
        this.copy = true;
        setTimeout(() => {
          this.copy = false
          document.getElementById('copyAddress').blur()
        }, 1000)
      },
      copySourceCodeBtn(index) {
        try {
          const editor = ace.edit('editor'+ index); // eslint-disable-line
          const sel = editor.selection.toJSON();
          editor.selectAll();
          editor.focus();
          document.execCommand('copy');
          editor.selection.fromJSON(sel);
          Message({
            message: this.$t('address.codeCopy'),
            type: 'success',
            duration: 1000
          });
        } catch (err) {
          console.log('Oops, unable to copy');
        }
      },
      showToken() {
        this.tokenShow = !this.tokenShow
      },
      searchFuc(e) {
        if (!e.target.value) {
          // this.assetSearch = this.assetList;
          let a20 = []
          let a721 = []
          let a1155 = []
          this.assetList.map(v => {
            if (v.tokenType === 3 || !v.tokenType) {
              a20.push(v)
            }
            if (v.tokenType === 4) {
              a721.push(v)
            }
            if (v.tokenType === 5) {
              a1155.push(v)
            }
          })
          this.assetSearch = a20
          this.assetSearch721 = a721
          this.assetSearch1155 = a1155
          return
        }
        const data = e.target.value.trim();
        const searchArr = this.assetList.filter((value) => { // 过滤数组元素
          const tokenName = value.tokenName.toLocaleLowerCase();
          const searchData = data.toLocaleLowerCase();
          return tokenName.includes(searchData);
        });
        let a20 = []
        let a721 = []
        let a1155 = []
        searchArr.map(v => {
          if (v.tokenType === 3 || !v.tokenType) {
            a20.push(v)
          }
          if (v.tokenType === 4) {
            a721.push(v)
          }
          if (v.tokenType === 5) {
            a1155.push(v)
          }
        })
        this.assetSearch = a20
        this.assetSearch721 = a721
        this.assetSearch1155 = a1155
      },
      funcOnclick(type, data, id) {
        const index = this.TokenEvents.findIndex(v => { return v.id === id })
        this.showDataOptions();
        if (type === 'Hex') {
          this.TokenEvents[index].changeData = '';
          this.TokenEvents[index].typeData = this.$t('common.hex');
          this.$set(this.TokenEvents, index, this.TokenEvents[index]);
          return
        }
        if (type === 'unit') {
          this.TokenEvents[index].changeData = this.hexUnit(data);
          this.TokenEvents[index].typeData = this.$t('common.number');
          this.$set(this.TokenEvents, index, this.TokenEvents[index]);
          return
        }
        if (type === 'uint256') {
          this.TokenEvents[index].changeData = this.hexUnit256(data);
          this.TokenEvents[index].typeData = 'uint256';
          this.$set(this.TokenEvents, index, this.TokenEvents[index]);
          return
        }
        if (type === 'address') {
          this.TokenEvents[index].changeData = this.hexAddress(data);
          this.TokenEvents[index].typeData = this.$t('common.address');
          this.$set(this.TokenEvents, index, this.TokenEvents[index]);
          return
        }
        this.TokenEvents[index].changeData = this.hex2utf8(data);
        this.TokenEvents[index].typeData = this.$t('common.text');
        this.$set(this.TokenEvents, index, this.TokenEvents[index]);
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
      showDataOptions(index) {
        this.setIndex = index
        this.dataOptions = !this.dataOptions
      },
      tabFuc(tab) {
        this.$router.push({ path: this.$route.path + tab });
        // console.log(this.$route)
        this.hash = this.$route.hash.substr(1)
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
      hexUnitMultData(hex, data) {
        const type = [];
        data.map(v => { type.push(v.type) });
        const abicode = new utils.AbiCoder();
        return abicode.decode(type, hex)
      },
      showFilter() {
        this.showFilterFlag = !this.showFilterFlag;
      },
      closeFilter() {
        this.getEvent();
        this.showFilterFlag = false;
        this.findAddress = '';
        this.filterFlag = '';
        this.filterError = false
      },
      findAddressFn(data) {
        if (data) {
          this.findAddress = data
        }
        if (this.findAddress) {
          this.filterFlag = this.findAddress.length === 66 ? this.findAddress : Number(this.findAddress);
          this.showFilterFlag = false;
          this.pageLoading = true;
          getLogsByParam(this.address, this.findAddress).then(res => {
            this.pageLoading = false;
            if (res.status === 1) {
              this.TokenEvents = res.data || [];
              if (res.data && res.data.length > 0) {
                res.data.map(value => {
                  if (!value.funcName) {
                    return
                  }
                  value.args = JSON.parse(value.args);
                  const mulData = value.args.filter(v => { return !v.indexed });
                  if (mulData.length > 1) { // 有多data
                    const mulArray = this.hexUnitMultData(value.data, mulData);
                    value.args.map((v, i) => {
                      if (v.indexed) {
                        v.data = value.topicList[i + 1].data;
                        return
                      }
                      const index = mulData.findIndex(v2 => { return v2.name === v.name });
                      v.data = mulArray[index].toString()
                    });
                  } else {
                    // 单data
                    value.args.map((v, i) => {
                      if (v.indexed) {
                        v.data = this.funcHex(v.type, value.topicList[i + 1].data);
                      } else {
                        v.data = this.funcHex(v.type, value.data)
                      }
                    });
                  }
                });
              }
            } else {
              this.filterError = true
            }
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .address-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.75rem;

  }
  .none  {
    display: none;
  }
  .block {
    display: block;
  }

  #qrcode {
    img {
      margin: auto !important;
    }
  }

  .btn-custom-balance {
    width: 100%;
    padding-left: .6rem;
    padding-right: .6rem;
    text-align: left;
  }

  .btn-custom-balance.dropdown-toggle:after {
    position: absolute;
    right: .6rem;
    top: 50%;
    transform: translateY(-50%);
    color: #77838f;
  }

  .dropdown-unfold[aria-labelledby].u-unfold--css-animation, .dropdown-unfold[aria-labelledby].u-unfold--jquery-slide, .dropdown-unfold[aria-labelledby][role=tabpanel] {
    display: block;
    opacity: 1;
  }

  .dropdown-unfold.u-unfold--css-animation.u-unfold--hidden, .u-unfold--css-animation.u-unfold--hidden {
    display: none;
    opacity: 0;
    visibility: hidden;
  }

  .list-custom-divider {
    background-color: rgba(231, 234, 243, .5);
    border-radius: .25rem;
  }

  .list-custom {
    border-bottom: 1px solid #e7eaf3;
    padding-bottom: .25rem;
    margin-bottom: .25rem;
  }

  .list-custom:last-child {
    border-bottom: 0;
    padding-bottom: 0;
    margin-bottom: 0;
  }
  .func-name {
    background-color: rgba(52,152,219,.1);
    font-size: .65625rem;
    line-height: 1.7;
    padding: 0.2rem 0.5rem;
    text-align: center!important;
    border-radius: 0.35rem!important;
    display: inline-block;
}
.connect {
  cursor: pointer;
}
.write-result {
  display: flex;
  align-items: center;
  .error {
    color: red;
    margin-left: 20px;
  }
  .write-hash {
    background-color: #1C9DBF;
    padding: 7px 8px;
    color: #fff;
    border-radius: 4px;
    margin-left: 20px;
  }
}
.connect-modal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  // background-color: #1C9DBF;
  border: 1px solid #d5dae2;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  &:hover {
    border: 1px solid #1C9DBF;
  }
  img {
    width: 40px;
  }
}
.form-control:first-child {
    padding-left: 0.6rem !important;
}
</style>

