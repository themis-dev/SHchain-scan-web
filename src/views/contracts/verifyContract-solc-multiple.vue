<template>
  <div class="container space-top-1 space-bottom-2">
    <div class="text-center mb-4">
      <div class="w-md-75 w-lg-75 mx-md-auto ">
        <h1 class="h4">{{$t('contract.verifyTitle')}}  </h1>
        <span class="badge badge-primary py-2" style="border-radius: 5rem; padding-left:15px; padding-right:15px">Compiler Type: SOLIDITY MULTI-PART VERIFIER (IMPORTS)</span>
      </div>
    </div>
    <div class="container">
      <div class="border-top py-1">
        <p class="mb-0">
          <span class="d-none d-md-inline-block u-label u-label--price rounded mt-1 ml-n1">{{$t('contract.info')}}:</span>
          This is an experimental source code verifier which supports verification of multi-part solidity files (imports).</p>
      </div>
    </div>
    <div class="mt-2">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center p-0">
          <ul class="nav nav-custom nav-borderless nav-tabs1" id="myTab" role="tablist">
            <li class="nav-item" id="anchor1">
              <a class="nav-link active" id="tab1" data-toggle="tab" href="#contractsource" role="tab" aria-controls="overview" aria-selected="true">Contract Source Code</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content py-1 ml-1 mr-1">
            <div class="tab-pane fade show active" id="contractsource">
              <div>
                <div v-if="error" class="alert alert-danger alert-dismissible fade show font-size-1">
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                  <div>Error! Failed to verify Contract Code at <a :href="'/address/'+address">{{address}}</a></div>
                </div>
                <!-- Notes -->
                <div class="alert alert-dark alert-dismissible fade show font-size-1" style="background-color:#E9ECF1">
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                  <ul class="list-unstyled list-xs-space alert-text mb-0 mt-2">
                    <li>1. If the contract compiles correctly at <a href="https://remix.ethereum.org/" target="_blank" rel="noopener noreferrer">REMIX</a>, it should also compile correctly here.</li>
                    <li>2. As this is an beta release module, there is limited support for external libraries</li>
                  </ul>
                </div>
                <!-- End Notes -->
                <div class="row mb-4">
                  <div class="col-md-5 mb-3 mb-md-0" :class="!address&&submitFlag?'u-has-error':''">
                    <label for="txtContractAddress" id="lblContractAddress">{{$t('contract.contractAddressTitle')}}</label>
                    <input  type="text" v-model.trim="address" maxlength="42" id="txtContractAddress" class="form-control form-control-sm" required=""  data-success-class="u-has-success" data-error-class="u-has-error" data-msg="Required"  placeholder="0x..." >
                  </div>
                  <div class=" col-md-5 mb-3 mb-md-0">
                    <label for="CompilerVersions">{{$t('contract.thead3')}} </label>
                    <div class="input-group input-group-sm mb-2" :class="!compilerVersion&&submitFlag?'u-has-error':''">
                      <select  id="CompilerVersions" class=" custom-select custom-select-sm" v-model="compilerVersion" required=""  data-success-class="u-has-success" data-error-class="u-has-error" data-msg="Required">
                        <option value="">[{{$t('contract.select')}}]</option>
                        <option value="v0.8.12+commit.f00d7308">v0.8.12+commit.f00d7308</option>
                        <option value="v0.8.11+commit.d7f03943">v0.8.11+commit.d7f03943</option>
                        <option value="v0.8.10+commit.fc410830">v0.8.10+commit.fc410830</option>
                        <option value="v0.8.9+commit.e5eed63a">v0.8.9+commit.e5eed63a</option>
                        <option value="v0.8.8+commit.dddeac2f">v0.8.8+commit.dddeac2f</option>
                        <option value="v0.8.7+commit.e28d00a7">v0.8.7+commit.e28d00a7</option>
                        <option value="v0.8.6+commit.11564f7e">v0.8.6+commit.11564f7e</option>
                        <option value="v0.8.5+commit.a4f2e591">v0.8.5+commit.a4f2e591</option>
                        <option value="v0.8.4+commit.c7e474f2">v0.8.4+commit.c7e474f2</option>
                        <option value="v0.8.3+commit.8d00100c">v0.8.3+commit.8d00100c</option>
                        <option value="v0.8.2+commit.661d1103">v0.8.2+commit.661d1103</option>
                        <option value="v0.8.1+commit.df193b15">v0.8.1+commit.df193b15</option>
                        <option value="v0.8.0+commit.c7dfd78e">v0.8.0+commit.c7dfd78e</option>
                        <option value="v0.7.6+commit.7338295f">v0.7.6+commit.7338295f</option>
                        <option value="v0.7.5+commit.eb77ed08">v0.7.5+commit.eb77ed08</option>
                        <option value="v0.7.4+commit.3f05b770">v0.7.4+commit.3f05b770</option>
                        <option value="v0.7.3+commit.9bfce1f6">v0.7.3+commit.9bfce1f6</option>
                        <option value="v0.7.2+commit.51b20bc0">v0.7.2+commit.51b20bc0</option>
                        <option value="v0.7.1+commit.f4a555be">v0.7.1+commit.f4a555be</option>
                        <option value="v0.7.0+commit.9e61f92b">v0.7.0+commit.9e61f92b</option>
                        <option value="v0.6.12+commit.27d51765">v0.6.12+commit.27d51765</option>
                        <option value="v0.6.11+commit.5ef660b1">v0.6.11+commit.5ef660b1</option>
                        <option value="v0.6.10+commit.00c0fcaf">v0.6.10+commit.00c0fcaf</option>
                        <option value="v0.6.9+commit.3e3065ac">v0.6.9+commit.3e3065ac</option>
                        <option value="v0.6.8+commit.0bbfe453">v0.6.8+commit.0bbfe453</option>
                        <option value="v0.6.7+commit.b8d736ae">v0.6.7+commit.b8d736ae</option>
                        <option value="v0.6.6+commit.6c089d02">v0.6.6+commit.6c089d02</option>
                        <option value="v0.6.5+commit.f956cc89">v0.6.5+commit.f956cc89</option>
                        <option value="v0.6.4+commit.1dca32f3">v0.6.4+commit.1dca32f3</option>
                        <option value="v0.6.3+commit.8dda9521">v0.6.3+commit.8dda9521</option>
                        <option value="v0.6.2+commit.bacdbe57">v0.6.2+commit.bacdbe57</option>
                        <option value="v0.6.1+commit.e6f7d5a4">v0.6.1+commit.e6f7d5a4</option>
                        <option value="v0.6.0+commit.26b70077">v0.6.0+commit.26b70077</option>
                        <option value="v0.5.17+commit.d19bba13">v0.5.17+commit.d19bba13</option>
                        <option value="v0.5.16+commit.9c3226ce">v0.5.16+commit.9c3226ce</option>
                        <option value="v0.5.15+commit.6a57276f">v0.5.15+commit.6a57276f</option>
                        <option value="v0.5.14+commit.01f1aaa4">v0.5.14+commit.01f1aaa4</option>
                        <option value="v0.5.13+commit.5b0b510c">v0.5.13+commit.5b0b510c</option>
                        <option value="v0.5.12+commit.7709ece9">v0.5.12+commit.7709ece9</option>
                        <option value="v0.5.11+commit.22be8592">v0.5.11+commit.22be8592</option>
                        <option value="v0.5.11+commit.c082d0b4">v0.5.11+commit.c082d0b4</option>
                        <option value="v0.5.10+commit.5a6ea5b1">v0.5.10+commit.5a6ea5b1</option>
                        <option value="v0.5.9+commit.c68bc34e">v0.5.9+commit.c68bc34e</option>
                        <option value="v0.5.9+commit.e560f70d">v0.5.9+commit.e560f70d</option>
                        <option value="v0.5.8+commit.23d335f2">v0.5.8+commit.23d335f2</option>
                        <option value="v0.5.7+commit.6da8b019">v0.5.7+commit.6da8b019</option>
                        <option value="v0.5.6+commit.b259423e">v0.5.6+commit.b259423e</option>
                        <option value="v0.5.5+commit.47a71e8f">v0.5.5+commit.47a71e8f</option>
                        <option value="v0.5.4+commit.9549d8ff">v0.5.4+commit.9549d8ff</option>
                        <option value="v0.5.3+commit.10d17f24">v0.5.3+commit.10d17f24</option>
                        <option value="v0.5.2+commit.1df8f40c">v0.5.2+commit.1df8f40c</option>
                        <option value="v0.5.1+commit.c8a2cb62">v0.5.1+commit.c8a2cb62</option>
                        <option value="v0.5.0+commit.1d4f565a">v0.5.0+commit.1d4f565a</option>
                        <option value="v0.4.26+commit.4563c3fc">v0.4.26+commit.4563c3fc</option>
                        <option value="v0.4.25+commit.59dbf8f1">v0.4.25+commit.59dbf8f1</option>
                        <option value="v0.4.24+commit.e67f0147">v0.4.24+commit.e67f0147</option>
                        <option value="v0.4.23+commit.124ca40d">v0.4.23+commit.124ca40d</option>
                        <option value="v0.4.22+commit.4cb486ee">v0.4.22+commit.4cb486ee</option>
                        <option value="v0.4.21+commit.dfe3193c">v0.4.21+commit.dfe3193c</option>
                        <option value="v0.4.20+commit.3155dd80">v0.4.20+commit.3155dd80</option>
                        <option value="v0.4.19+commit.c4cbbb05">v0.4.19+commit.c4cbbb05</option>
                        <option value="v0.4.18+commit.9cf6e910">v0.4.18+commit.9cf6e910</option>
                        <option value="v0.4.17+commit.bdeb9e52">v0.4.17+commit.bdeb9e52</option>
                        <option value="v0.4.16+commit.d7661dd9">v0.4.16+commit.d7661dd9</option>
                        <option value="v0.4.15+commit.8b45bddb">v0.4.15+commit.8b45bddb</option>
                        <option value="v0.4.15+commit.bbb8e64f">v0.4.15+commit.bbb8e64f</option>
                        <option value="v0.4.14+commit.c2215d46">v0.4.14+commit.c2215d46</option>
                        <option value="v0.4.13+commit.0fb4cb1a">v0.4.13+commit.0fb4cb1a</option>
                        <option value="v0.4.12+commit.194ff033">v0.4.12+commit.194ff033</option>
                        <option value="v0.4.11+commit.68ef5810">v0.4.11+commit.68ef5810</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md mb-3 mb-md-0">
                    <el-tooltip
                      placement="top" effect="dark">
                      <div slot="content"><p class='text-white text-left'>{{$t('contract.selectOption')}}</p></div>
                      <el-button style="padding: 0;"  type="text">
                        <i class="far fa-question-circle text-muted"></i>
                      </el-button>
                    </el-tooltip>
                    <label for="ddlOptimization">{{$t('contract.optimization')}}</label>
                    <div class="input-group input-group-sm mb-2">
                      <select id="ddlOptimization" class="custom-select custom-select-sm" v-model="optimization">
                        <option value="2">{{$t('common.yes')}}</option>
                        <option value="1">{{$t('common.no')}}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <!-- Basics Accordion -->
                <div id="basicsAccordion">
                  <!-- Card 3 -->
                  <div class="card mb-3">
                    <div class="card-header card-collapse" id="basicsHeadingThree">
                      <button type="button" class="btn btn-link btn-block d-flex justify-content-between card-btn p-3" data-toggle="collapse" data-target="#basicsCollapseThree" aria-expanded="false" aria-controls="basicsCollapseThree">
                        <label>Misc Settings <span class="text-secondary">(Runs, EvmVersion &amp; License Type settings)</span></label>
                        <span class="card-btn-arrow"><span class="fas fa-arrow-down small"></span>
                        </span>
                      </button>
                    </div>
                    <div id="basicsCollapseThree" class="collapse show" aria-labelledby="basicsHeadingThree" data-parent="#basicsAccordion">
                      <div class="card-body">
                        <div class="row mb-4">
                          <div class="col-md-4 mb-2">
                            <el-tooltip
                              placement="top" effect="dark">
                              <div slot="content">(Applicable when Optimization = Yes) <br>Optimize for how many times you  <br>intend to run the code.Lower values <br> will optimize more for initial deployment<br> cost, higher values will optimize more for <br> high-frequency usage.</div>
                              <el-button style="padding: 0;"  type="text">
                                <i class="far fa-question-circle text-muted"></i>
                              </el-button>
                            </el-tooltip>
                            <label>{{$t('contract.runsTitle')}}</label>
                            <div>
                              <el-tooltip
                                placement="top" effect="dark">
                                <div slot="content">Do not change if you are unsure. Previous <br> versions of truffle defaulted to a value of 0</div>
                                <el-button style="padding: 0; width: 100%"  type="text">
                                  <input v-model.trim="optimizationArg" type="text"  maxlength="8" class="form-control form-control-sm" required="" data-rule-maxlength="8" title="" data-success-class="u-has-success" data-rule-minlength="1" data-error-class="u-has-error" data-msg-minlength="Invalid Length" data-msg="Required">
                                </el-button>
                              </el-tooltip>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <el-tooltip
                              placement="top" effect="dark">
                              <div slot="content">When you compile your contract <br> code you can specify the Double-A Chain  <br> virtual machine version to compile  <br> for to avoid particular features or <br> behaviours.</div>
                              <el-button style="padding: 0;"  type="text">
                                <i class="far fa-question-circle text-muted"></i>
                              </el-button>
                            </el-tooltip>
                            <label>EVM Version to target</label>
                            <div>
                              <el-tooltip
                                placement="top" effect="dark">
                                <div slot="content">A list of target EVM versions and the <br> compiler-relevant changes introduced <br> at each  version. Backward compatibility <br> is not guaranteed between each version.</div>
                                <el-button style="padding: 0; width: 100%"  type="text">
                                  <select class="custom-select custom-select-sm mb-1" v-model="evmVersion" >
                                    <option value="default">default</option>
                                    <option value="istanbul">istanbul (default for &gt;= v0.5.14)</option>
                                    <option value="homestead">homestead (oldest version)</option>
                                    <option value="tangerineWhistle">tangerineWhistle</option>
                                    <option value="spuriousDragon">spuriousDragon</option>
                                    <option value="byzantium">byzantium (default for &lt;= v0.5.4)</option>
                                    <option value="constantinople">constantinople</option>
                                    <option value="petersburg">petersburg (default for &gt;= v0.5.5)</option>
                                  </select>
                                </el-button>
                              </el-tooltip>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <label>LicenseType</label>
                            <select  title="Select a suitable license type" v-model="license" class="custom-select custom-select-sm" required="" data-msg="Required" data-error-class="u-has-error" data-success-class="u-has-success">
                              <option value="None">1) No License (None)</option>
                              <option value="Unlicense">2) The Unlicense (Unlicense)</option>
                              <option value="MIT">3) MIT License (MIT)</option>
                              <option value="GNU GPLv2">4) GNU General Public License v2.0 (GNU GPLv2)</option>
                              <option value="GNU GPLv3">5) GNU General Public License v3.0 (GNU GPLv3)</option>
                              <option value="GNU LGPLv2.1">6) GNU Lesser General Public License v2.1 (GNU LGPLv2.1)</option>
                              <option value="NU LGPLv3">7) GNU Lesser General Public License v3.0 (GNU LGPLv3)</option>
                              <option value='BSD-2-Clause'>8) BSD 2-clause "Simplified" license (BSD-2-Clause)</option>
                              <option value='BSD-3-Clause'>9) BSD 3-clause "New" Or "Revised" license (BSD-3-Clause)</option>
                              <option value="MPL-2.0">10) Mozilla Public License 2.0 (MPL-2.0)</option>
                              <option value="OSL-3.0">11) Open Software License 3.0 (OSL-3.0)</option>
                              <option value="Apache-2.0">12) Apache 2.0 (Apache-2.0)</option>
                              <option value="GNU AGPLv3">13) GNU Affero General Public License (GNU AGPLv3)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- End Card -->
                </div>
                <!-- End Basics Accordion -->
                <div class="row mb-4">
                  <div class="col col-md-12 col-sm-12">
                    <br>
                    <div class="card">
                      <div class="mt-3 mr-2 ml-3 form-group">
                        <label class="d-block">
                          <b>{{$t('contract.uploadSolidity')}}</b> <span class="text-danger">*</span><br>
                        </label>
                        <br>
                        {{$t('contract.step1')}}:

                        <div class="file">{{$t('contract.upload')}}<input type="file" multiple="multiple" title="CTRL click to select Multiple files" accept=".sol" @change="onchangeMulty"></div>
                        <span style="background: transparent;min-width: 200px;display: inline-block;padding:10px 0">
                          <span class="u-label u-label--price rounded ml-2" v-for="(item, index) in files" :key="index">{{item.name}}</span>
                        </span>
                        <br>
                        <br>
                        <div v-show="mainContractNameShow" :class="!mainContractName&&submitFlag?'u-has-error':''">
                          <span>{{$t('contract.step2')}}:</span>
                          <label>{{$t('contract.mainContract')}}</label>
                          <select v-model="mainContractName" class="custom-select custom-select-sm" style="width: 30%;display: inline-block" required="" data-msg="Required" data-error-class="u-has-error" data-success-class="u-has-success">
                            <option :value="item.name" v-for="(item, index) in files" :key="index">{{item.name}}</option>
                          </select>
                        </div>
                        <br>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-center mb-4">
                  <input type="submit" :value="$t('address.tab5Tip2')" class="btn btn-primary mr-2 btn-submit" @click="submitData">
                  <input type="submit" :value="$t('contract.reset')" @click="reset()" class="btn btn-soft-secondary"> &nbsp;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div  class="loading-box" v-show="loading" :style="{width:width+'px',height:height+'px'}">
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { postOpenSource } from '@/api/chains'
  import { Message } from 'element-ui'

  export default {
    components: {
    },
    data() {
      return {
        compilerVersion: '',
        optimization: '1',
        optimizationArg: 200,
        sourceCode: '',
        evmVersion: 'default',
        license: 'None',
        address: '',
        submitFlag: false,
        loading: false,
        width: '',
        height: '',
        error: false,
        mainContractName: '',
        files: [],
        mainContractNameShow: false
      }
    },
    computed: {},
    mounted() {
      this.address = this.$route.query.address;
      this.compilerVersion = this.$route.query.compilerVersion;
      this.license = this.$route.query.license;
      this.width = document.documentElement.clientWidth;
      this.height = document.getElementsByClassName('main-container')[0].clientHeight + 320
    },
    methods: {
      onchangeMulty(e) {
        this.submitFlag = false
        this.files = [...e.target.files];
        if (e.target.files && e.target.files.length > 1) {
          this.mainContractNameShow = true;
          return
        }
        this.mainContractNameShow = false
      },
      submitData() {
        this.submitFlag = true;
        if (!this.address) {
          return
        }
        if (!this.compilerVersion) {
          return
        }
        if (!this.files[0]) {
          Message({
            message: this.$t('contract.uploadSolidity'),
            type: 'error',
            duration: 1000
          });
          return
        }
        if (this.files.length > 1 && !this.mainContractName) {
          return
        }
        const params = {
          compilerVersion: this.compilerVersion,
          optimization: Number(this.optimization),
          optimizationArg: this.optimizationArg,
          files: this.files,
          mainContractName: this.mainContractName,
          evmVersion: this.evmVersion,
          license: this.license,
          address: this.address
        };
        this.loading = true;
        postOpenSource(params).then(res => {
          this.loading = false;
          if (res.status === 1) {
            Message({
              message: this.$t('common.success'),
              type: 'success',
              duration: 1000
            });
            this.$router.push({ path: '/address/' + this.address });
          } else {
            this.error = true;
            Message({
              message: this.$t('contract.contractError'),
              type: 'error',
              duration: 1000
            });
          }
        })
      },
      reset() {
        this.$router.go(0)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  div.file{
    display:inline-block;
    width:100px;
    height:30px;
    line-height:30px;
    position:relative;
    overflow:hidden;
    background: rgba(119, 131, 143, 0.1);
    border: 1px solid lightgrey;
    text-align: center;
    vertical-align: middle;
    color: #0c0d0e;
  }
  .app-main div.file{
    color: #ffffff;
  }
  div.file input{position:absolute;left:0px;top:0px;zoom:1;filter:alpha(opacity=0);opacity:0;font-size:20px}

  .loading-box{
    position: absolute;
    top:0;
    left: 0;
    z-index: 9999;
    background: rgba(250,250,250,0.5);
  }
  .spinner {
    margin: 800px auto 0;
    width: 50px;
    height: 60px;
    text-align: center;
    font-size: 10px;
  }

  .spinner > div {
    background-color: #3F7FFF;
    height: 100%;
    width: 6px;
    display: inline-block;

    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
  }

  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  @-webkit-keyframes stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
    20% { -webkit-transform: scaleY(1.0) }
  }

  @keyframes stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }  20% {
         transform: scaleY(1.0);
         -webkit-transform: scaleY(1.0);
       }
  }
</style>
