<template>
  <div class="node-candidate container">
    <div class="node-candidate-header">
      <div class="header-left">
        <campaignHeader/>
      </div>
      <div class="header-right">
        <div class="my-campaign" @click="campaign">
          <!-- <img src="../images/myCampaign.png" alt=""> -->
          <span>{{$t('nodeCandidate.campaign')}}</span>
        </div>
      </div>
    </div>
    <div class="node-candidate-content">
      <div class="candidate-content" v-if="status === 0">
        <p class="content-title">{{$t('nodeCandidate.candidate')}}</p>
        <el-form>
          <el-row>
            <el-col :span="14">
              <el-form-item>
                <span>{{$t('nodeCandidate.name')}}</span>
                <el-input :placeholder="$t('nodeCandidate.enter')" v-model="name"></el-input>
              </el-form-item>
              <!-- <p class="content-body-num">可用1999FA</p> -->
              <el-form-item >
                <!-- <el-input type="number" placeholder="输入金额">
                  <span slot="suffix">Max</span>
                </el-input> -->
                <span>{{$t('nodeCandidate.pledgeAmount')}}</span>
                <span class="fa-num">500,000 AAC</span>
              </el-form-item>
              <!-- <el-form-item >
                <span>{{$t('nodeCandidate.apy')}}</span>
                <span class="fa-num">{{global.superNodeApy}}%</span>
              </el-form-item> -->
              <!-- <p class="content-body-expot">
                <img src="../../assets/images/tips.png" alt="">
                <span>最低质押限额为5000 AAC</span>
              </p> -->
              <el-button v-loading='pledgeLoading' @click="pledge" >{{$t('nodeCandidate.pledge')}}</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-dialog :visible.sync="show" width="30%" align="center">
        <!-- <img src="../images/node-icon.png" alt=""> -->
        <span>{{$t('nodeCandidate.congratulations')}}</span>
        <el-button class="button" @click="submit">{{$t('nodeCandidate.sure')}}</el-button>
      </el-dialog>
      <div class="candidate-detail" v-if="status === 1">
        <div class="candidate-detail-left">
          <p>
            <span>{{$t('nodeCandidate.name')}}</span>
            <span>{{info.name}}</span>
          </p>
          <p>
            <span>{{$t('nodeCandidate.votes')}}</span>
            <span>{{info.receiveVoteAmount}}{{$t('nodeCandidate.ticket')}}</span>
          </p>
          <p>
            <span>{{$t('nodeCandidate.address')}}</span>
            <span>{{info.votedUserNumber}}</span>
            <span class="detail-export">{{$t('nodeCandidate.tips')}}</span>
          </p>
          <p class="candidate-detail-left-p">
            <span>{{$t('nodeCandidate.pledgedAmount')}}</span>
            <span class="detail-FA">{{$t('nodeCandidate.pledged')}}500,000 AAC</span>
          </p>
           <p class="candidate-detail-left-p">
            <span>{{$t('nodeCandidate.revenue')}}</span>
            <span class="detail-FA">{{(Number(info.candidateReward) + Number(newReward)).toFixed(2)}} AAC</span>
            <span @click="getRewards" class="rewards">{{$t('nodeCandidate.receive')}}</span>
          </p>
          <!-- <p class="candidate-detail-left-p">
            <span>{{$t('nodeCandidate.apy')}}</span>
            <span class="detail-FA">{{global.superNodeApy}}%</span>
          </p> -->
          <p>
            <span>{{$t('nodeCandidate.out')}}</span>
            <span v-if="value === false">{{$t('nodeCandidate.no')}}</span>
            <span v-else>{{$t('nodeCandidate.yes')}}</span>
            <el-switch v-if="info.unlockTime === 0" v-model="value" active-color="#F6C738" inactive-color="#333639" @change='switchChange'></el-switch>
            <!-- <img src="../images/tips.png" alt=""> -->
            <span class="detail-tips">{{$t('nodeCandidate.quit')}}</span>
          </p>
        </div>
        <div class="candidate-detail-right" v-if="value === true">
          <!-- <span v-if="value === true">{{ seconds | secondFormat }}</span> -->
          <nodeCountdown :time='info.unlockTime' />
          <div class="redemption-next">
            <div class="number">{{$t('nodeCandidate.unclaimed')}}500,000 AAC</div>
            <div :class="locked ? 'widthdraw': 'widthdraw active' " v-if="locked" >{{$t('nodeCandidate.redeem')}}</div>
             <div :class="locked ? 'widthdraw': 'widthdraw active' " v-else  @click="withdraw">{{$t('nodeCandidate.redeem')}}</div>
          </div>
        </div>
        <!-- <div class="candidate-detail-h5">
          <span>已质押500,000个FA</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import { BigNumber, ethers } from 'ethers';
  import { commify, formatEther, parseEther, parseUnits } from 'ethers/lib/utils';
  import ERC20 from '../../contracts/erc20';
  import {toPrecision, toolNumber, IsPC, secondFormat, getUserBalance} from '../../utils/index'
  import { getDisplayBalance } from '../../utils/formatBalance'
  import Node from '../../contracts/node'
  import cfg from '../../contracts/abiConfig'
  import campaignHeader from './campaignHeader'
  import nodeCountdown from './nodeCountdown.vue'
  import { getNodeInfoApi } from '../../api/swap'
  
  export default {
    name: 'nodeCandidate',
    components:{
      campaignHeader,
      nodeCountdown
    },
    filters: {
      secondFormat
    },
    data() {
      return {
        account: '',
        show:false,
        value:false,
        status:0,
        seconds: 60,
        timer: null,
        info: {},
        name: '',
        pair1SymbolAllowance: 0,
        pair1SymbolLoading: false,
        pledgeLoading: false,
        locked: true,
        global: {},
        newName: '',
        newReceiveVoteAmount: '',
        newReward: 0
      }
    },
    created () {
    },
    async mounted() {
      await this.getAccountMsg()
      this.getUserMsg()
      // this.getStatusGlobal()
      this.intervalID = setInterval(async () => {
        await this.getAccountMsg()
        this.getUserMsg()
      }, 5000)
    },
    destroyed() {
      clearInterval(this.intervalID)
    },
    methods:{
      async getAccountMsg() {
        try {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          this.account = accounts[0].substr(0, 6) + '...' +  accounts[0].substr(38);
          // console.log(accounts)
          this.$store.commit('SET_ACCOUNT', accounts[0])
          this.account = accounts[0]
          console.log(this.account)
          getUserBalance(this.account).then(res => {
            console.log(res)
          })
        } catch (error) {
          console.log(error)
        }
      },
      getStatusGlobal(){
      this.$store.dispatch('GetWolfGlobal').then(res=>{
          this.global = res
          this.global.superNodeApy = res.superNodeApy ? res.superNodeApy.toFixed(2): 0
      })
      },
      async getUserMsg() {
        // this.allowance('AAC')
        const account = this.$store.getters.account
        const node = new Node()
        const info = await node.getAllInfo(account)
        const newReward = await node.getCandidateReward(account)
        this.newReward = Number(newReward) 
        this.info = info
        console.log(info)
        // const result = await getNodeInfoApi(account)
        // console.log(result)
        // if (result.data) {
        //   this.newReceiveVoteAmount = result.data.totalVoteAmount
        //   this.newName = result.data.name  //this.info.name === '速链云' ? '赵刘王' : this.info.name === '合作共赢–兄弟社区' ? '黑马社区' : this.info.name
        // }
        if (info.lockAmount === '0.0' && info.pledgedAmount === '0.0') {
          this.status = 0
        } else {
           this.status = 1
           this.pledgeLoading = false
        }
        this.value = this.info.unlockTime === 0 ? false :true
        const now = Date.parse(new Date())
        if (this.info.unlockTime - now >0) {
         this.locked = true
       } else {
         this.locked = false
       }
      },
      async getBalance(symbol) {
        const account = this.$store.getters.account
        const pair1SymbolERC = new ERC20(cfg[symbol].address, symbol ,18)
        return await pair1SymbolERC.displayedBalanceOf(account)
      },
      //质押
      async pledge(){
        // this.show = true
        this.pledgeLoading = true
        const account = this.$store.getters.account
        const parseBalance = await getUserBalance(this.account) //this.getBalance('AAC')
        const balance = getDisplayBalance(parseBalance)
        console.log(Number(balance))
        console.log(parseUnits('10', 18))
        if (Number(balance)< 500000) {
          this.pledgeLoading = false
          this.$notify({
              title: 'Error',
              message: this.$t('nodeCandidate.less'),
              type: 'error',
              duration: 8 * 1000
          });
          return
        }
        const node = new Node()
        if (this.name.length> 10) {
          this.pledgeLoading = false
          this.$notify({
              title: 'Error',
              message: this.$t('nodeCandidate.more'),
              type: 'error',
              duration: 8 * 1000
          });
          return
        }
        try {
           const result = await node.pledgeForCandidate(this.account, this.name, parseUnits('10', 18))
            this.$notify({
                    title: this.$t('tip.transfer'),
                    dangerouslyUseHTMLString: true,
                    message: `<a href="http://18.188.173.250/tx/${result.hash}" target="_blank">${this.$t('tip.check')}</a>`,
                    type: 'success',
                    duration: 8 * 1000
                });
          } catch (error) {
            console.log(error)
            this.pledgeLoading = false
            this.$notify({
                      title: 'Error',
                      message: IsPC() ? error.data.message: error.message,
                      type: 'error',
                      duration: 8 * 1000
                  });
          }
      },
      async allowance(symbol) {
        let allowanceAmount
        const erc20 = new ERC20(cfg[symbol].address)
        allowanceAmount = await erc20.allowance(this.$store.getters.account, cfg['proxy'].address)
        this.pair1SymbolAllowance = Number(allowanceAmount)
        if (Number(allowanceAmount) > 0) {
            this.pair1SymbolLoading = false
        }
      },
      async approve(symbol) {
          this.pair1SymbolLoading = true
          const APPROVE_AMOUNT = ethers.constants.MaxUint256;
          const erc20 = new ERC20(cfg[symbol].address)
          try {
              const result = await erc20.approve(cfg['proxy'].address, APPROVE_AMOUNT)
              this.$notify({
              title: this.$t('tip.approve'),
              dangerouslyUseHTMLString: true,
              message: `<a href="http://18.188.173.250/tx/${result.hash}" target="_blank">${this.$t('tip.check')}</a>`,
              type: 'success',
              duration: 8 * 1000
          });
          } catch (error) {
              console.log(error)
          }
      },
      async withdraw() {
        const node = new Node()
        try {
           const result = await node.withdrawPledge()
            this.$notify({
                    title: this.$t('tip.transfer'),
                    dangerouslyUseHTMLString: true,
                    message: `<a href="http://18.188.173.250/tx/${result.hash}" target="_blank">${this.$t('tip.check')}</a>`,
                    type: 'success',
                    duration: 8 * 1000
                });
          } catch (error) {
            console.log(error)
            this.$notify({
                      title: 'Error',
                      message: IsPC() ? error.data.message: error.message,
                      type: 'error',
                      duration: 8 * 1000
                  });
          }
      },
      async getRewards() {
        const node = new Node()
        if (Number(this.info.candidateReward) > 0) {
          try {
           const result = await node.claimCandidateReward()
            this.$notify({
                    title: this.$t('tip.transfer'),
                    dangerouslyUseHTMLString: true,
                    message: `<a href="http://18.188.173.250/tx/${result.hash}" target="_blank">${this.$t('tip.check')}</a>`,
                    type: 'success',
                    duration: 8 * 1000
                });
          } catch (error) {
            console.log(error)
            this.$notify({
                      title: 'Error',
                      message: IsPC() ? error.data.message: error.message,
                      type: 'error',
                      duration: 8 * 1000
                  });
          }
        }
        if (Number(this.info.candidateReward) === 0) {
          try {
            const result = await node.claimCandidateRewardNew()
            this.$notify({
                    title: this.$t('tip.transfer'),
                    dangerouslyUseHTMLString: true,
                    message: `<a href="http://18.188.173.250/tx/${result.hash}" target="_blank">${this.$t('tip.check')}</a>`,
                    type: 'success',
                    duration: 8 * 1000
                });
          } catch (error) {
            console.log(error)
            this.$notify({
                      title: 'Error',
                      message: IsPC() ? error.data.message: error.message,
                      type: 'error',
                      duration: 8 * 1000
                  });
          }
        }
        
          
      },
      async switchChange(val) {
        // console.log(val)
        if (val === true) {
          if (this.info.unlockTime === 0) {
              const node = new Node()
              try {
              const result = await node.requestQuitFromCandidate()
                this.$notify({
                        title: this.$t('tip.transfer'),
                        dangerouslyUseHTMLString: true,
                        message: `<a href="http://18.188.173.250/tx/${result.hash}" target="_blank">${this.$t('tip.check')}</a>`,
                        type: 'success',
                        duration: 8 * 1000
                    });
              } catch (error) {
                console.log(error)
                this.$notify({
                          title: 'Error',
                          message: IsPC() ? error.data.message: error.message,
                          type: 'error',
                          duration: 8 * 1000
                      });
              }
            }
          }
      },
      //弹窗确定
      submit(){
        this.status = 1
        this.show = false
      },
      //竞选首页
      campaign(){
        this.$router.push('/nodes')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @function sn($data){
    @return $data/414*100 + vw;
  }
  @function fn($data){
    @return $data/1920*100 + vw;
  }
  .node-candidate{
    .node-candidate-header{
      margin-bottom: 50px;
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      @media (max-width:959.95px) {
        flex-direction: column;
      }
      .header-left {
        display: flex;
        flex-direction: column;
        @media (max-width:959.95px) {
        flex-direction: column-reverse;
        align-items: center;
        }
      }
      .header-right {
        display: flex;
        flex-direction: column;
        align-items: center;
        @media (max-width:959.95px) {
          align-items: center;
        }
      }
      .my-campaign {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 169px;
        height: 35px;
        background: #F6C738;
        opacity: 1;
        border-radius: 17px;
        color: #28282E;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        margin-top: 20px;
        img {
          width: 20px;
          height: 20px;
          margin-right: 16px;
        }
        @media (max-width:959.95px) {
          width: 155px;
          height: 40px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 800;
          img {
            width: 23px;
            height: 23px;
            margin-right: 3px;
          }
        }
      }
    }
    .node-candidate-content{
      width: fn(1400);
      max-width: 1280px;
      margin: 0 auto;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.39);
box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.11);
      @media (max-width:959.95px) {
        width: 100%;
      }
      .candidate-content{
        padding: 43px 107px 65px;
        @media (max-width:959.95px) {
          padding: 15px 23px 41px;
        }
        .content-title{
          color: #F8CD1B;
          font-weight: bold;
        }
        .fa-num {
          font-size: 18px;
          color: #fff;
          font-weight: 600;
          text-align: left;
        }
        .el-form{
          margin-top: 27px;
          .el-col-14 {
            @media (max-width:959.95px) {
              width: 100%;
            }
          }
          .el-button{
            width: 203px;
            height: 35px;
            background: #F6C738;
            border-radius: 17px;
            border: none;
            color: #28282E;
            font-size: 14px;
            margin-top: 20px;
            float: right;
            margin-right: 180px;
            @media (max-width:959.95px){
              margin: 0;
              width: sn(236);
              height: 30px;
              padding: 7px 0 6px;
              float: right;
              font-size: 12px;
              margin-top: 20px;
            }
          }
          .el-col-12{
            @media (max-width:959.95px) {
              width: 100%;
            }
          }
          /deep/ .el-form-item{
            margin-bottom: 10px;
            @media (max-width:959.95px) {
              margin-bottom: 2px;
            }
            &:first-child{
              margin-bottom: 42px;
              @media (max-width:959.95px) {
                margin-bottom: 33px;
              }
            }
            &__label{
              color: #666;
              font-size: 16px;
              font-weight: bold;
              padding: 0 40px 0 0;
              @media (max-width:959.95px) {
                padding: 0 16px 0 0;
                font-size: 13px;
                text-align: left;
                width: 80px!important;
              }
            }
            &__content{
              display: flex;
              span{
                color: #666;
                font-size: 16px;
                font-weight: bold;
                margin-right: 30px;
                text-align: left;
                @media (max-width:959.95px) {
                  font-size: 13px;
                  margin-right: 20px;
                }
              }
            }
          }
          /deep/ .el-input{
            position: relative;
            // width: fn(300);
            flex: 0.8;
            @media (max-width:959.95px) {
                font-size: 12px;
                flex: 1;
              }
            &__inner{
              background: #E6E6E6;
              border: none;
              border-radius: 20px;
              color: #333333!important;
              font-weight: bold;
              @media (max-width:959.95px) {
                height: 32px;
                font-size: 12px;
              }
            }
            &__suffix-inner{
              color: #facd1b;
              font-size: 14px;
              line-height: 55px;
              span{
                font-weight: 900;
                position: absolute;
                top: -9px;
                left: -35px;
                font-family: Avenir;
                @media (max-width:959.95px) {
                  font-size: 12px;
                }
              }
            }
          }
          .content-body-num{
            font-size: 12px;
            color: #828589;
            text-align: right;
            font-weight: bold;
            margin-bottom: 7px;
            @media (max-width:959.95px) {
              font-size: sn(10);
              margin-bottom: 2px;
            }
          }
          .content-body-expot{
            margin-left: -98px;
            margin-bottom: 23px;
            @media (max-width:959.95px){
              margin-left:sn(12);
            }
            img{
              width: 12px;
              height: 12px;
              vertical-align: middle;
            }
            span{
              font-size: 12px;
              font-weight: 600;
              color: #737AB9;
            }
          }
        }
      }
      /deep/ .el-dialog{
        @media (max-width:959.95px)  {
          width: 80%!important;
        }
        .button{
          width: 203px;
          height: 35px;
          background: #F6C738;
          border-radius: 17px;
          border: none;
          color: #28282E;
          font-size: 14px;
          margin-top: 20px;
          span{
            color:#28282E;
          }
          @media (max-width:959.95px) {
            height: 36px;
            width: 100px;
            span{
              font-size: 13px;
            }
          }
        }
        img{
          width: 50px;
          height: 50px;
          display: block;
          margin-bottom: 17px;
          @media (max-width:959.95px) {
            margin-bottom: 10px;
          }
        }
        span{
          font-size: 18px;
          color: #fff;
          font-weight: 600;
        }
      }
      .candidate-detail{
        padding: 43px 107px 65px;
        display: flex;
        @media (max-width:959.95px) {
          padding: 31px 17.6px  22px;
          flex-direction: column;
        }
        .candidate-detail-left{
          flex: 1;
          .candidate-detail-left-p{
            @media (max-width:959.95px) {
              // display: none;
            }
            .rewards {
              cursor: pointer;
            }
          }
          p{
            margin-bottom: 28px;
            @media (max-width:959.95px) {
              margin-bottom: 26px;
            }
            span{
              color: #eba925;
              font-weight: bold;
              font-size: 14px;
              margin-right: 16px;
              &:first-child{
                font-size: 16px;
                color: #666;
                margin-right: 29px;
                @media (max-width:959.95px) {
                  font-size: 12px;
                  margin-right: 20px;
                }
              }
              @media (max-width:959.95px) {
                font-size: 12px;
                margin-right: 6px;
              }
            }
            .detail-FA{
              color:#F6C738
            }
            .detail-export{
              color: #726B60;
              font-weight: 400;
              @media (max-width:959.95px) {
                font-size: sn(10);
              }
            }
            /deep/ .el-switch__label{
              &.is-active{
                color: #DED1B6;
              }
              span{
                font-size: 14px;
                font-weight: bold;
              }
            }
            /deep/ .el-switch__core{
              background: #333639;
            }
            /deep/ .el-switch__button{
              background: #4E4E4E;
            }
            img{
              width: 12px;
              height: 12px;
              vertical-align: middle;
              margin-left: 16px;
              @media (max-width:959.95px) {
                display: none;
              }
            }
            .detail-tips{
              color: #737AB9;
              font-size: 12px;
              vertical-align: middle;
              @media (max-width:959.95px) {
                margin-left: 9px;
                font-size: sn(10);
              }
            }
          }
        }
        .candidate-detail-right{
          flex: 0.4;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          @media (max-width:959.95px) {
            // display: none;
          }
          span{
            font-size: 39px;
            font-family: 'AlibabaSans-Heavy';
            font-weight: 900;
            line-height: 60px;
            color: #FFDA76;
          }
        }
        .redemption-next {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .number {
          font-size: 16px;
          font-weight: bold;
          line-height: 22px;
          color: #F6C738;
          margin-top: 15px;
          @media (max-width:959.95px) {
            font-size: 14px;
          }
        }
        .widthdraw {
          width: 94px;
          height: 35px;
          background: #E6E6E6;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          color: #28282E;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          margin-top: 10px;
          cursor: pointer;
          @media (max-width:959.95px) {
            font-size: 13px;
            margin-top: 5px;
          }
          &.active {
            background: #F6C738;
            color: #28282E;
          }
        }
        .candidate-detail-h5{
          display: none;
          @media (max-width:959.95px) {
            display: block;
            font-size:14px;
            font-weight: bold;
            color: #F6C738;
            text-align: center;
          }
        }
      }
    }
  }
</style>
