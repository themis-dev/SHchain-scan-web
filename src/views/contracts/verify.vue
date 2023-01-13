<template>
  <div class="container space-top-1 space-bottom-2">
    <div class="js-validate mt-2">
      <div class="text-center mb-3">
        <div class="w-md-75 w-lg-75 mx-md-auto ">
          <h1 class="h3">{{$t('contract.verifyTitle')}} </h1>
          <small class="d-block text-muted color-strong h4">{{$t('contract.verifyTip')}}</small>
        </div>
      </div>
      <div class="py-4">
        <img src="../../images/security.png" width="115" align="left" style="margin: 20px auto;display:block;float:none">
        <div class="row">
          <div class="col-md-10 offset-md-1 text-secondary mt-3 mb-2">
            {{$t('contract.verifyTip1')}}
          </div>
        </div>
        <div class="w-md-75 w-lg-50 mx-md-auto mt-5">
          <div class="form-group" :class="!address&&submitFlag?'u-has-error':''">
            <label class="d-block" for="txtUserName">{{$t('contract.contractAddress')}}</label>
            <input v-model.trim="address" maxlength="42" id="txtUserName" class="form-control form-control-sm" required="" placeholder="0x..." data-success-class="u-has-success" data-error-class="u-has-error" data-rule-minlength="40" type="search" data-msg-minlength="Invalid Length" data-msg="Required" data-name="txtContractAddress" data-rule-maxlength="42">
          </div>
          <div class="form-group" :class="!type&&submitFlag?'u-has-error':''">
            <label class="d-block mt-4">{{$t('contract.compilerType')}}</label>
            <select class="custom-select custom-select-sm mb-1" v-model="type" required="">
              <option value="">[{{$t('contract.select')}}]</option>
              <option value="1">{{$t('contract.singleFile')}}</option>
              <option value="2">{{$t('contract.multiFile')}}</option>
            </select>
          </div>
          <span>
          <div class="form-group" :class="!compilerVersion&&submitFlag?'u-has-error':''">
              <label class="d-block mt-4">{{$t('contract.compilerVersion')}}</label>
              <select class="custom-select custom-select-sm" v-model="compilerVersion" required="" data-msg="Required" data-error-class="u-has-error" data-success-class="u-has-success">
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
        </span>
          <span id="ContentPlaceHolder1_licenseType">
            <div class="js-form-message form-group" style="display:block">
              <label class="d-block mt-4">{{$t('contract.selectLicense')}}</label>
              <select v-model="license" class="custom-select custom-select-sm" required="" data-msg="Required" data-error-class="u-has-error" data-success-class="u-has-success">
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
          </span>
          <p align="center" class="mt-3">
          <span class="custom-control custom-checkbox align-items-center text-muted mb-2">
          <input type="checkbox" class="custom-control-input align-items-center" checked="checked">
          </span>
            <input type="submit" :value="$t('contract.reset')" @click="reset()" class="btn btn-soft-secondary mr-2">
            <input type="submit" :value="$t('contract.continue')" @click="submitData" class="btn btn-primary">
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        type: '',
        compilerVersion: '',
        license: 'None',
        address: '',
        submitFlag: false,
        loading: false,
        width: '',
        height: '',
        error: false

      }
    },
    computed: {},
    mounted() {
      this.address = this.$route.query.a;
    },
    methods: {
      submitData() {
        this.submitFlag = true;
        if (!this.address) {
          return
        }
        if (!this.type) {
          return
        }
        if (!this.compilerVersion) {
          return
        }
        const params = {
          compilerVersion: this.compilerVersion,
          license: this.license,
          address: this.address
        };
        this.loading = true;
        if (Number(this.type) === 1) {
          this.$router.push({ path: '/verifyContract-solc', query: params });
          return
        }
        this.$router.push({ path: '/verifyContract-solc-multiple', query: params })
      },
      reset() {
        this.$router.go(0)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.h3{
  font-size: 30px;
}
.h4{
  font-size: 16px;
}
.btn{
  width: 120px;
}
.app-main{
  .h4{
    color: #AFB5C0 !important;
  }
  .btn-soft-secondary{
    // background-color: #AFB5C0;
    // color: #fff;
    background-color: #eee !important;
    color: #999 !important;
    &:hover{
      background-color: #CBD2DA;
    }
  }
  .btn-primary{
    background-color: #3F7FFF !important;
    &:hover{
      background-color: #5991FF !important;
    }
  }
}
</style>
