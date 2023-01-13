<template>
  <div class="bg">
    <MainNavBar />
    <div class="container flex-center">
      <div class="w-md-55 faucet-container">
        <div class="mb-5">
          <h1 class="text-primary font-weight">{{$t('faucet.title')}}</h1>
          <h5 class="text-primary" v-html="$t('faucet.tip1')" v-if="isHTFaucet"></h5>
          <h5 class="text-primary" v-html="$t('faucet.tip2')" v-if="!isHTFaucet"></h5>
        </div>
        <div class="card-container">
          <span class="card-one" :class="{ 'active': isHTFaucet }" @click="switchToHT">AAC</span>
          <span class="card-two" :class="{ 'active': !isHTFaucet }" @click="switchToErc">ARC20</span>
        </div>
        <div class="mb-5 input-container" v-if="!isHTFaucet">
          <select v-model="contractAddress" class="custom-select custom-select-sm">
            <option value="">{{ $t('faucet.select') }}</option>
            <option
              v-for="(item, index) in contractList"
              :key="index"
              :value="item.address">
              [ {{item.symbol}} ]   {{item.address}}
            </option>
          </select>
        </div>
        <div class="input-container input-group">
          <input
            v-model.trim="address"
            class="form-control input-form"
            placeholder="0x..."
            @keyup.enter="showDialog"
          />
          <button
            class="btn btn-primary btn-wide btn-input"
            :disabled="disabled"
            @click="showDialog"
          >
            {{ $t('faucet.submit') }}
          </button>
        </div>
      </div>
    </div>
    <el-dialog
      :title="$t('faucet.verify')"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :before-close="beforeClose"
      width="90%"
      custom-class="max-width-5"
    >
      <div class="input-container input-image-container input-group">
        <input
          v-model.trim="image"
          maxlength="4"
          class="form-control input-form"
          :placeholder="$t('faucet.placeholder')"
          @keyup.enter="getFaucet"
        />
        <img class="pointer" alt="Verify" :src="captcha" @click="getImg" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="beforeClose">{{ $t('faucet.cancel') }}</el-button>
        <el-button type="primary" :disabled="imgDisabled" @click="getFaucet">{{
          $t('faucet.confirm')
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { MainNavBar } from '../layout/components'
  import { getImageUrl, getContractList, faucet } from '@/api/chains'

  export default {
    name: 'faucet',
    components: {
      MainNavBar
    },
    data() {
      return {
        address: '',
        image: '',
        captcha: '',
        key: '',
        contractAddress: '',
        contractList: [],
        isHTFaucet: true,
        dialogVisible: false
      }
    },
    computed: {
      disabled() {
        if (this.isHTFaucet && this.address || !this.isHTFaucet && this.contractAddress && this.address) {
          return false;
        }
        return true;
      },
      imgDisabled() {
        if (this.image) {
          return false;
        }
        return true;
      }
    },
    async created() {
      const res = await getContractList();
      if (res && res.status >= 1) {
        this.contractList = res.data;
      }
    },
    methods: {
      async getImg() {
        const res = await getImageUrl();
        if (res.status >= 1) {
          this.key = res.data.key;
          this.captcha = res.data.verCode;
        }
      },
      showDialog() {
        this.getImg();
        this.dialogVisible = true;
      },
      beforeClose() {
        this.image = '';
        this.dialogVisible = false;
      },
      switchToHT() {
        this.isHTFaucet = true;
        this.contractAddress = '';
      },
      switchToErc() {
        this.isHTFaucet = false;
        this.contractAddress = '';
      },
      async getFaucet() {
        const res = await faucet(this.address, this.contractAddress, this.image, this.key);
        if (res && res.status >= 0) {
          this.$message.success(`${res.message}, Tx: ${res.data}`);
          this.beforeClose();
          this.$router.push({ path: '/tx/' + res.data });
        } else if (res) {
          this.$message.error(res.message);
          this.getImg();
          this.image = '';
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.pre {
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  overflow: auto;
  word-break: break-all;
  word-wrap: break-word;
}
.bg {
  background-image: url(../../images/faucet.svg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: calc(100vh - 50px);
}
.app-main {
  .bg {
    background: #252525 !important;
  }
  .card-container {
    background-color: #252525;
    border-color: #323232;
  }
}
.flex-center {
  margin-top: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.faucet-container {
  width: 35rem;
}
.input-container {
  display: flex;
  width: 35rem;
  &.input-image-container {
    width: 100%;
  }
  input {
    width: 100%;
  }
}
@media (max-width: 768px) {
  .container {
    margin-top: 8vh;
  }
  .faucet-container {
    width: 21rem;
  }
  .input-container {
    display: flex;
    width: 21rem;
  }
}
.btn-input {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  cursor: pointer !important;
  &:disabled {
    cursor: not-allowed !important;
  }
}
.input-form {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.pointer {
  cursor: pointer;
}
.card-container {
  margin-bottom: 1rem;
  display: inline-flex;
  white-space: nowrap;
  vertical-align: middle;
  background: #fff;
  border: 1px solid #dcdfe6;
  font-weight: 500;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 4px;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  span {
    padding: 12px 20px;
    &.active {
      background-color: #f7dc0d;
      color: #fff;
    }
  }
}
.card-one.active {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.card-two.active {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
