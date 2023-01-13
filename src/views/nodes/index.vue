<template>
  <!-- <div>
    节点竞选
    <div @click="getAccountMsg()">连接metamask</div>
    <div>{{account}}</div>
    <div class="campaign-page">
      <div class="header">
        <div class="header-left"></div>
      </div>
    </div>
 </div> -->
 <div class="campaign-page container">
   <!-- <div @click="getAccountMsg()">连接metamask</div> -->
      <div class="header">
      <div class="header-left">
         <campaignHeader :rid='rid'/>
        <div class="tickets">{{$t('campaign.voted')}} {{info.voteAmount}} / {{$t('campaign.available')}} {{TicketsBalance}}</div>
      </div>
      <div class="header-right">
        <div class="my-campaign" @click="campaign">
          <!-- <img src="../../assets/images/myCampaign.png" alt=""> -->
          {{$t('campaign.campaign')}}
        </div>
        <!-- <div class="rules" @click="goNode"> -->
          <!-- <img src="../../assets/images/rules.png" alt=""> -->
          <!-- <div>{{$t('campaign.rules')}}</div> -->
        <!-- </div> -->
      </div>
    </div>
    <div class="vote-msg">
      <div class="item-msg web">
        <div class="item-title"> {{$t('campaign.text1')}}</div>
        <div class="value">{{hr1}}:{{min1}}:{{sec1}}</div>
      </div>
      <div class="line web"></div>
      <div class="item-msg">
        <div class="item-title">{{$t('campaign.text2')}}</div>
        <div class="item-value">{{global.totalPledgedAmount}}</div>
      </div>
      <div class="line ph"></div>
      <div class="item-msg">
        <div class="item-title">{{$t('campaign.text3')}}</div>
        <div class="item-value">{{global.nodeNum}}</div>
      </div>
    </div>
    <div class="vote-rules">
      <div class="title">{{$t('campaign.text4')}}</div>
      <div class="vote-content">
        <div class="item">
          <span class="item-title">{{$t('campaign.text5')}}</span><span class="item-title-value">{{$t('campaign.text6')}}</span>
        </div>
        <div class="item">
          <span class="item-title">{{$t('campaign.text7')}}</span><span class="item-title-value">{{$t('campaign.text8')}}</span>
        </div>
        <div class="item">
          <span class="item-title">{{$t('campaign.text9')}}</span><span class="item-title-value">{{$t('campaign.text10')}}</span>
        </div>
      </div>
    </div>
    <div class="swap-tickets">
      <div class="tab-add-content">
        <div class="title">{{$t('campaign.votes')}} </div>
        <el-row :gutter="18" class="row">
          <el-col>
            <p class="content-value">
              <span>Balance</span>
              <span>{{pair1SymbolBalance}}</span>
            </p>
          </el-col>
          <el-col :span="17">
            <el-input  placeholder="" v-model="pair1" v-on:input="pair1HandleChange">
              <span slot="suffix" @click="() => max('pair1')" style="cursor: pointer;">Max</span>
            </el-input>
          </el-col>
          <el-col :span="7">
            <div class="content-fa">
              <!-- <img src="../../assets/images/fa-icon.png" alt=""> -->
              <div :class="pair1Symbol"></div>
              <span>{{pair1Symbol === 'Tickets' ? 'Vote': pair1Symbol}}</span>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="content-add">
              <img  src="../../images/swap.png" alt="" @click="switchCoin" />
            </div>
          </el-col>
          <el-col>
            <p class="content-value">
            <span>Balance</span>
            <span>{{pair2SymbolBalance}}</span>
          </p>
          </el-col>
          <el-col :span="17">
            <el-input  placeholder="" v-model="pair1" v-on:input="pair2HandleChange">
              <span slot="suffix" @click="() => max('pair2')" style="cursor: pointer;">Max</span>
            </el-input>
          </el-col>
          <el-col :span="7">
            <div class="content-fa">
              <!-- <img src="../../assets/images/tickets.png" alt=""> -->
              <div :class="pair2Symbol"></div>
              <span>{{pair2Symbol === 'Tickets' ? 'Vote': pair2Symbol}}</span>
              </div>
            </el-col>
            <el-col>
          </el-col>
          <el-col>
            <div class="swap" @click="swapCoin" v-if="pair1SymbolAllowance > 0 || pair1Symbol === 'Tickets'">{{$t('campaign.swap')}}</div>
            <div class="swap" v-loading='pair1SymbolLoading' v-if="pair1SymbolAllowance === 0 && pair1Symbol === 'AAC'" @click="() => approve('AAC')">{{$t('campaign.approve')}} AAC</div>
            <div class="tip"><i class="el-icon-warning"></i>{{$t('campaign.locked')}}</div>
          </el-col>
        </el-row>
      </div>
      <!-- v-if="Number(lockInfo.lockAmount)>0" -->
      <div class="redemption" v-if="Number(lockInfo.lockAmount)>0">
        <!-- <div class="count-down">55:18:59</div> -->
        <nodeCountdown :time='lockInfo.unlockTime' />
        <div class="redemption-next">
          <div class="number">{{$t('campaign.unclaimed')}} {{Number(lockInfo.lockAmount).toFixed(2)}} AAC</div>
          <div :class="locked || lockInfo.lockAmount === '0.0' ? 'widthdraw': 'widthdraw active' " @click="withdraw">{{$t('campaign.redeem')}}</div>
        </div>
      </div>
    </div>
<!-- v-if="Number(info.voteReward) > 0 || Number(info.voteAmount) > 0" -->
    <div class="my-vote" v-if="Number(info.voteReward) > 0 || Number(info.voteAmount) > 0">
      <div class="title-div">
        <div class="title">{{$t('campaign.myVote')}}</div>
        <div class="vote-btn" @click="() => cancleVote(index)" v-if="Number(info.voteAmount) > 0">{{$t('campaign.cancel')}}</div>
      </div>
      <div class="my-vote-table web">
        <table cellspacing="0" cellpadding="0" style="border-collapse:separate; border-spacing:0px 10px;">
          <tr>
            <th class="th1">{{$t('campaign.name')}}</th>
            <th class="th2">{{$t('campaign.number')}}</th>
            <th class="th3">{{$t('campaign.profit')}}</th>
            <th class="th4"></th>
          </tr>
          <tbody v-for="(item, index) in myVote" v-bind:key='index'>
            <tr >
              <td>{{item.voteCandidateName ? item.voteCandidateName: '--'}}</td>
              <td>{{item.voteAmount}}</td>
              <td>{{Number(item.voteReward).toFixed(2)}} AAC <span @click="claimVoteReward">{{$t('campaign.extract')}}</span></td>
              <td>
                <div class="vote-btn" @click="() => cancleVote(index)">{{$t('campaign.cancel')}}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="my-vote-table ph">
        <table cellspacing="0" cellpadding="0">
          <tr>
            <th class="th1">{{$t('campaign.number')}}</th>
            <th class="th2">{{$t('campaign.profit')}}</th>
          </tr>
          <tbody v-for="(item, index) in myVote" v-bind:key='index'>
            <tr >
              <td>
                <div class="td1"><span class="name">{{item.voteCandidateName ? item.voteCandidateName: '--'}}</span></div>
                <div class="td2"><span class="number">{{item.voteAmount}}</span></div>
              </td>
              <td class="td-right">
                <div class="earnings">{{Number(item.voteReward).toFixed(2)}} AAC <span class="extraction" @click="claimVoteReward">{{$t('campaign.extract')}}</span></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="vote">
      <div class="leaderboard">{{$t('campaign.list')}}</div>
      <div class="vote-table web">
        <table cellspacing="0" cellpadding="0">
          <tr>
            <th class="th1">{{$t('campaign.ranking')}}</th>
            <th class="th2">{{$t('campaign.name')}}</th>
            <th class="th3">{{$t('campaign.gain')}}</th>
            <th class="th4">{{$t('campaign.text12')}}</th>
            <th class="th4">{{$t('campaign.addresses')}}</th>
            <!-- <th class="th6">收益</th> -->
            <th class="th7"></th>
          </tr>
          <tbody v-for="(item, index) in voteData" v-bind:key='index'>
            <tr >
              <td><img src="../../images/crown.png" alt="" class="crown" v-show="index<9"> {{item.ranking}}</td>
              <td :class="Number(item.votedUserNumber) < 50?'less': ''">{{item.name}}</td>
              <td :class="Number(item.votedUserNumber) < 50?'less': ''">{{item.receiveVoteAmount}}</td>
              <td :class="Number(item.votedUserNumber) < 50?'less': ''">{{item.ratio}}%</td>
              <td :class="Number(item.votedUserNumber) < 50?'less': ''">{{item.votedUserNumber}} <span class="less-tip" v-if="Number(item.votedUserNumber) < 50"> {{$t('campaign.lessAddress')}}</span> </td>
              <!-- <td>{{item.voted}}</td> -->
              <!-- <td>{{item.rewards}} FA <span>提取</span></td> -->
              <td>
                <div class="vote-btn" @click="() => openDetail(index)">{{$t('campaign.vote')}}</div>
              </td>
            </tr>
            <tr v-show="index === target ">
              <td colspan="6">
                <div class="detail-box">
                  <!-- <div class="box-item">
                    <div class="box-apy">
                      <div class="apy-title">
                        <div>投票周期</div>
                        <div>APY年化</div>
                      </div>
                      <div :class="lockedDay === 0 ? 'apy-item active': 'apy-item'" @click="selectVoteApy(0)">
                        <div class="apy-item-title">不锁仓</div>
                        <div class="apy-item-val">11.32%</div>
                      </div>
                       <div :class="lockedDay === 30 ? 'apy-item active': 'apy-item'" @click="selectVoteApy(30)">
                        <div class="apy-item-title">30天</div>
                        <div class="apy-item-val">11.32%</div>
                      </div>
                      <div :class="lockedDay === 90 ? 'apy-item active': 'apy-item'" @click="selectVoteApy(90)">
                        <div class="apy-item-title">90天</div>
                        <div class="apy-item-val">11.32%</div>
                      </div>
                       <div :class="lockedDay === 180 ? 'apy-item active': 'apy-item'" @click="selectVoteApy(180)">
                        <div class="apy-item-title">180天</div>
                        <div class="apy-item-val">11.32%</div>
                      </div>
                    </div>
                  </div> -->
                  <div class="box-item">
                    <div class="box-input">
                      <div class="balance">可用{{TicketsBalance}}票</div>
                      <el-input
                        v-model="stakeNumber"
                        class="stake-input"
                        placeholder="">
                        <span slot="suffix" @click="maxClick">Max</span>
                      </el-input>
                      <div class="tip"><i class="el-icon-warning"></i> {{$t('campaign.min')}}</div>
                    </div>
                    <div class="btn" v-if="voteAllowance > 0" @click="() => vote(item.address)">{{$t('campaign.vote')}}</div>
                    <div class="btn" v-loading='voteLoading'  v-if="voteAllowance === 0" @click="() => voteApprove('Tickets')">{{$t('campaign.approve')}}</div>
                  </div>
                  <!-- <div class="box-item">
                    <div class="box-input">
                      <div class="balance">可用9,000票</div>
                      <el-input
                        v-model="stakeNumber"
                        class="stake-input"
                        type="number"
                        :placeholder="$t('overview.enterTheAmount')">
                        <span slot="suffix" @click="maxClick">{{$t("app.max")}} </span>
                      </el-input>
                    </div>
                    <div class="btn cancle">取消投票</div>
                  </div> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="vote-table ph">
        <table cellspacing="0" cellpadding="0">
          <tr>
            <th class="th1">{{$t('campaign.gain')}}/{{$t('campaign.addresses')}}/{{$t('campaign.text12')}}</th>
            <th class="th2">{{$t('campaign.vote')}}</th>
          </tr>
          <tbody v-for="(item, index) in voteData" v-bind:key='index'>
            <tr >
              <td>
                <div class="td1"><img src="../../images/crown.png" alt="" class="crown" v-show="index<9"> {{item.ranking}} <span class="name">{{item.name}}</span></div>
                <div class="td2"><span :class="Number(item.votedUserNumber) < 50?'less': 'number'">{{item.receiveVoteAmount}}</span><span :class="Number(item.votedUserNumber) < 50?'less': 'address'"> / {{item.votedUserNumber}}</span><span :class="Number(item.votedUserNumber) < 50?'less': 'address'"> / {{item.ratio}}%</span><span class="voted"></span><br><span class="less-tip" v-if="Number(item.votedUserNumber) < 50"> {{$t('campaign.lessAddress')}}</span></div>
              </td>
              <td>
                <div class="vote-btn" @click="() => openDetail(index)">{{$t('campaign.vote')}}</div>
                <!-- <div class="earnings">{{item.rewards}} FA <span class="extraction">提取</span></div> -->
              </td>
            </tr>
            <tr v-show="index === target ">
              <td colspan="2">
                <div class="detail-box">
                  <img src="../../images/expand.png" alt="" class="expand">
                  <i class="el-icon-error close" @click="() => close(index)"></i>
                   <!-- <div class="box-item">
                    <div class="box-apy">
                      <div class="apy-title">
                        <div>投票周期</div>
                        <div>APY年化</div>
                      </div>
                      <div :class="lockedDay === 0 ? 'apy-item active': 'apy-item'" @click="selectVoteApy(0)">
                        <div class="apy-item-title">不锁仓</div>
                        <div class="apy-item-val">11.32%</div>
                      </div>
                       <div :class="lockedDay === 30 ? 'apy-item active': 'apy-item'" @click="selectVoteApy(30)">
                        <div class="apy-item-title">30天</div>
                        <div class="apy-item-val">11.32%</div>
                      </div>
                      <div :class="lockedDay === 90 ? 'apy-item active': 'apy-item'" @click="selectVoteApy(90)">
                        <div class="apy-item-title">90天</div>
                        <div class="apy-item-val">11.32%</div>
                      </div>
                       <div :class="lockedDay === 180 ? 'apy-item active': 'apy-item'" @click="selectVoteApy(180)">
                        <div class="apy-item-title">180天</div>
                        <div class="apy-item-val">11.32%</div>
                      </div>
                    </div>
                  </div> -->
                  <div class="box-item">
                    <div class="box-input">
                      <div class="balance">{{$t('campaign.available')}}{{TicketsBalance}}{{$t('campaign.ticket')}}</div>
                      <el-input
                        v-model="stakeNumber"
                        class="stake-input"
                        placeholder="">
                        <span slot="suffix" @click="maxClick">Max</span>
                      </el-input>
                      <div class="tip"><i class="el-icon-warning"></i> {{$t('campaign.min')}}</div>
                    </div>
                     <div class="btn" v-if="voteAllowance > 0" @click="() => vote(item.address)">{{$t('campaign.vote')}}</div>
                    <div class="btn" v-loading='voteLoading'  v-if="voteAllowance === 0" @click="() => voteApprove('Tickets')">{{$t('campaign.approve')}}</div>
                  </div>
                  <!-- <div class="box-item">
                    <div class="box-input">
                      <div class="balance">可用9,000票</div>
                      <el-input
                        v-model="stakeNumber"
                        class="stake-input"
                        type="number"
                        :placeholder="$t('overview.enterTheAmount')">
                        <span slot="suffix" @click="maxClick">{{$t("app.max")}} </span>
                      </el-input>
                    </div>
                    <div class="btn cancle">取消投票</div>
                  </div> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>





  </div>
  

</template>

<script>
import { BigNumber, ethers } from 'ethers';
import { commify, formatEther, parseEther, parseUnits } from 'ethers/lib/utils';
import ERC20 from '../../contracts/erc20';
import {toPrecision, toolNumber, IsPC, getUserBalance} from '../../utils/index'
import { getDisplayBalance } from '../../utils/formatBalance'
import Node from '../../contracts/node'
import cfg from '../../contracts/abiConfig'
import { getNodeList } from '../../api/swap'
  import nodeCountdown from './nodeCountdown.vue'
  import campaignHeader from './campaignHeader.vue'
  export default {
    name: 'nodes',
    components: {
      nodeCountdown,
      campaignHeader
    },
    data() {
      return {
        account: '',
        info: {},
      lockInfo: {},
      locked: true,
      stakeNumber: '',
      pair1: '',
      pair2: '',
      pair1Symbol: 'AAC',
      pair2Symbol: 'Tickets',
      pair1SymbolBalance: '',
      pair2SymbolBalance: '',
      pair1SymbolAllowance: 1,
      pair1SymbolLoading: false,
      pair2SymbolAllowance: 0,
      pair2SymbolLoading: false,
      TicketsBalance: '0',
      target: null,
      voteAllowance: 0,
      voteLoading: false,
      rid: '',
      voteData: [
      ],
      myVote: [{
        voteCandidateName: '',
        voteAmount: '',
        voteReward: ''
      }],
      hr1: '00', 
      min1: '00', 
      sec1: '00', 
      global: {},
      lockedDay: 0,
      voteApproveAddress: cfg['superNode'].address,
      nowTime: new Date().getTime(),
      }
    },
    computed: {
    },
    created(){
      this.countdown()
      this._interval = setInterval(() => {
        this.countdown()
      }, 1000)
    },
  async mounted() {
    await this.getAccountMsg()
    this.getNodeListData()
    this.getUserMsg()
    this.intervalID1 = setInterval(async () => {
      await this.getAccountMsg()
      this.getNodeListData()
       this.getUserMsg()
    }, 10000)
   
  },
  destroyed() {
      clearInterval(this.intervalID1)
       clearInterval(this._interval)
  },
    methods: {
        async getAccountMsg() {
        try {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          this.account = accounts[0].substr(0, 6) + '...' +  accounts[0].substr(38);
          // console.log(accounts)
          this.$store.commit('SET_ACCOUNT', accounts[0])
          this.account = accounts[0]
        } catch (error) {
          console.log(error)
        }
      },
      campaign(){
        this.$router.push('/node-candidate')
      },
      goNode(){
        this.$router.push('/node')
      },

      selectVoteApy(day) {
      if(this.info.voteCandidateName && this.info.type === 'unlock') {
        return
      }
      if (this.info.voteID) {
        return
      }
      this.lockedDay = day
      if (day === 0) {
        this.voteApproveAddress = cfg['superNode'].address
      } else {
        this.voteApproveAddress = cfg['nodeStake-'+day].address
      }
      this.voteAllowanceFC('Tickets')
    },
    countdown() {
        this.nowTime = new Date().getTime()
        let date = '2021-06-06 12:00:00'
        date = date.replace(/-/g, '/')
        const end = this.endTime*1000 //Date.parse(new Date(date))
        const now = Date.parse(new Date())
        const msec =  this.endTime*1000 - now //end - now
        if (msec< 0) {
          this.hr1 = '00'
          this.min1 = '00'
          this.sec1 = '00'
          this.getRid()
          this.roundEndTime()
          // clearInterval(this._interval1)
          return
        }
        if (msec > 0) {
          const day1 = parseInt(msec / 1000 / 60 / 60 / 24)
          const hr1 = parseInt(msec / 1000 / 60 / 60 % 24 + day1* 24)
          const min1 = parseInt(msec / 1000 / 60 % 60)
          const sec1 = parseInt(msec / 1000 % 60)
          this.day1 = day1
          this.hr1 = hr1 > 9 ? hr1 : '0' + hr1
          this.min1 = min1 > 9 ? min1 : '0' + min1
          this.sec1 = sec1 > 9 ? sec1 : '0' + sec1
        } else {
          clearInterval(this._interval1)
        }
      },
      async roundEndTime() {
        const node = new Node()
        const endTime = await node.roundEndTime()
        this.endTime = endTime.toNumber()
      },
    //getUserMsg
    async getUserMsg() {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0]//this.$store.getters.account
      // console.log(account)
      this.account = accounts[0]
      const node = new Node()
      const info = await node.getAllInfo(account)
      // const lockInfo = await node.getLockAllInfo(account)
      // console.log(info)
      this.info = info
      // console.log(lockInfo)
      // var periodicity
      // if (Number(lockInfo.voteReward1)) {
      //   this.info = lockInfo
      //   this.info.voteReward = Number(lockInfo.voteReward1) +  Number(info.voteReward1)
      //   this.info.type = 'lock'
      //   periodicity = '--'
      // }
      // if (Number(info.voteReward1)) {
      //   this.info = info
      //   this.info.voteReward = Number(lockInfo.voteReward1) +  Number(info.voteReward1)
      //   this.info.type = 'unlock'
      //   periodicity = '--'
      // }
      // if ((lockInfo.voteCandidateName)) {
      //   this.info = lockInfo
      //   this.info.voteReward = Number(lockInfo.voteReward1) +  Number(info.voteReward1)
      //   this.info.type = 'lock'
      //   periodicity = this.lockedDay + this.$t('campaign.day')
      //   let time = 0
      //   if (this.info.voteID) {
      //     if (this.info.voteID === 1) time = 30 * 86400000
      //     if (this.info.voteID === 2) time = 90 * 86400000
      //     if (this.info.voteID === 3) time = 180 * 86400000
      //   }
      //   this.info.unlockTime = lockInfo.stakeTime + time
      // }
      // if ((info.voteCandidateName)) {
      //   this.info = info
      //   this.info.voteReward = Number(lockInfo.voteReward1) +  Number(info.voteReward1)
      //   this.info.type = 'unlock'
      //   periodicity = 3 + this.$t('campaign.day')  //this.$t('campaign.Nonlockedy')
      // }
      // if (this.info.voteID) {
      //   if (this.info.voteID === 1) this.lockedDay = 30
      //   if (this.info.voteID === 2) this.lockedDay = 90
      //   if (this.info.voteID === 3) this.lockedDay = 180
      // }
      // // this.info = (lockInfo.voteCandidateName) ?  lockInfo : info
      this.pair1SymbolBalance = commify(toPrecision(await this.getBalance(this.pair1Symbol), 3) )
      this.pair2SymbolBalance = commify(toPrecision(await this.getBalance(this.pair2Symbol), 3))
      this.TicketsBalance = commify(toPrecision(await this.getBalance('Tickets'), 3))
      // this.allowance('AAC')
      this.getLockInfo()
      this.getRid()
      this.roundEndTime()
      
      // // console.log(this.info)
      this.myVote[0] = {
        voteCandidateName: this.info.voteCandidateName,
        voteAmount: this.info.voteAmount,
        voteReward: Number(this.info.voteReward1), // this.info.voteReward
      }
      
      // console.log(this.myVote[0])
    },
    async getRid() {
      const node = new Node()
      const rid = await node.rid()
      this.rid = rid.toNumber()
    },
    getNodeListData() {
      getNodeList().then(res => {
        // console.log(res)
        this.voteData = res.data.nodeList
        this.global.totalPledgedAmount = commify(res.data.votedAmount ? res.data.votedAmount.toFixed(0): 0)
        this.global.nodeNum = res.data.nodeNum
      })
    },
    async getLockInfo() {
      const account = this.$store.getters.account
      const node = new Node()
      this.lockInfo = await node.getLockInfo(account)
       const now = Date.parse(new Date())
       if (this.lockInfo.unlockTime - now >0) {
         this.locked = true
       } else {
         this.locked = false
       }
    },
    async getBalance(symbol) {
      if (symbol === 'AAC') {
        const parseBalance = await getUserBalance(this.account) //this.getBalance('AAC')
        return getDisplayBalance(parseBalance)
      } else {
        const account = this.$store.getters.account
        const pair1SymbolERC = new ERC20(cfg[symbol].address, symbol ,18)
        return await pair1SymbolERC.displayedBalanceOf(account)
      }
      
    },
    async swapCoin() {
      const node = new Node()
      // console.log(parseEther(this.pair1))
      if (this.pair1Symbol === 'AAC') {
        try {
          const result = await node.exchangeForVToken(parseEther(this.pair1))
            this.$notify({
                    title: this.$t('tip.transfer'),
                    dangerouslyUseHTMLString: true,
                    message: `<a href="http://18.188.173.250/tx/${result.hash}" target="_blank">${this.$t('tip.check')}</a>`,
                    type: 'success',
                    duration: 8 * 1000
                });
        } catch (error) {
          console.log(error)
          // this.$notify({
          //           title: 'Error',
          //           message: error.data.message,
          //           type: 'success',
          //           duration: 8 * 1000
          //       });
        }
      } else {
        try {
          const result = await node.requestBackToOtoken(parseEther(this.pair1))
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
                    type: 'success',
                    duration: 8 * 1000
                });
        }
      }
    },
    async allowance(symbol) {
        let allowanceAmount
        const erc20 = new ERC20(cfg[symbol].address)
        allowanceAmount = await erc20.allowance(this.$store.getters.account, cfg['tokenConverter'].address)
        if (symbol === this.pair1Symbol) {
            this.pair1SymbolAllowance = Number(allowanceAmount)
            if (Number(allowanceAmount) > 0) {
                this.pair1SymbolLoading = false
            }
        }
        if (symbol === this.pair2Symbol) {
            this.pair2SymbolAllowance = Number(allowanceAmount)
            if (Number(allowanceAmount) > 0) {
                this.pair2SymbolLoading = false
            }
        }
    },
    async approve(symbol) {
        if (symbol === this.pair1Symbol) {
            this.pair1SymbolLoading = true
        }
        if (symbol === this.pair2Symbol) {
            this.pair2SymbolLoading = true
        }
        const APPROVE_AMOUNT = ethers.constants.MaxUint256;
        const erc20 = new ERC20(cfg[symbol].address)
        try {
            const result = await erc20.approve(cfg['tokenConverter'].address, APPROVE_AMOUNT)
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
    async switchCoin() {
      if (this.pair1Symbol === 'AAC') {
        this.pair1Symbol = 'Tickets'
        this.pair2Symbol = 'AAC'
        this.pair1SymbolBalance = commify(toPrecision(await this.getBalance(this.pair1Symbol), 3))
        this.pair2SymbolBalance = commify(toPrecision(await this.getBalance(this.pair2Symbol), 3))
        this.allowance('AAC')
      }
      else
      {
        this.pair1Symbol = 'AAC'
        this.pair2Symbol = 'Tickets'
        this.pair1SymbolBalance = commify(toPrecision(await this.getBalance(this.pair1Symbol), 3))
        this.pair2SymbolBalance = commify(toPrecision(await this.getBalance(this.pair2Symbol), 3))
      }

    },
    // withdraw
    async withdraw() {
      const node = new Node()
      try {
          const result = await node.withdraw()
            this.$notify({
                    title: this.$t('tip.transfer'),
                    dangerouslyUseHTMLString: true,
                    message: `<a href="http://18.188.173.250/tx/${result.hash}" target="_blank">${this.$t('tip.check')}</a>`,
                    type: 'success',
                    duration: 8 * 1000
                });
        } catch (error) {
          console.log(error)
          // this.$notify({
          //           title: 'Error',
          //           message: error.data.message,
          //           type: 'success',
          //           duration: 8 * 1000
          //       });
        }
    },
    openDetail(index, name) {
      // if (this.myVote[0].voteCandidateName && this.myVote[0].voteCandidateName !== name ) {
      //   return
      // }
      clearInterval(this.interval)
      this.stakeNumber = ''
      this.target = this.target === index ? null :index;
      this.voteAllowanceFC('Tickets')
      this.interval = setInterval(() => {
        this.voteAllowanceFC('Tickets')
      }, 5000)
    },
     async voteAllowanceFC(symbol) {
        let allowanceAmount
        const erc20 = new ERC20(cfg[symbol].address)
        allowanceAmount = await erc20.allowance(this.$store.getters.account, this.voteApproveAddress)
        console.log()
        this.voteAllowance = Number(allowanceAmount)
        if (Number(allowanceAmount) > 0) {
            this.voteLoading = false
        }
    },
    async voteApprove(symbol) {
        this.voteLoading = true
        const APPROVE_AMOUNT = ethers.constants.MaxUint256;
        const erc20 = new ERC20(cfg[symbol].address)
        try {
            const result = await erc20.approve(this.voteApproveAddress, APPROVE_AMOUNT)
            this.$notify({
            title: this.$t('tip.approve'),
            dangerouslyUseHTMLString: true,
            message: `<a href="http://18.188.173.250/tx/${result.hash}" target="_blank">${this.$t('tip.check')}</a>`,
            type: 'success',
            duration: 8 * 1000
        });
        } catch (error) {
          this.voteLoading = false
          console.log(error)
        }
    },
    close(index) {
      this.target = null
    },
    async max(symbol) {
      // console.log(symbol)
      if (symbol === 'pair1') {
        console.log(this.pair1SymbolBalance)
        this.pair1 = toPrecision(await this.getBalance(this.pair1Symbol), 3)
        console.log(this.pair1)
      }
      if (symbol === 'pair2') {
        this.pair1 = toPrecision(await this.getBalance(this.pair2Symbol), 3)
      }
    },
    pair1HandleChange() {

    },
    pair2HandleChange() {

    },
    async maxClick() {
      this.stakeNumber = toPrecision(await this.getBalance('Tickets'), 3)
    },
    // 更换节点
    async changeNode(address) {
      const node = new Node()
      await node.changeNode(address, this.lockedDay)
    },
    // vote 用户投票
    async vote(address) {
      const node = new Node()
      // console.log((this.stakeNumber))
      // console.log(parseEther(this.stakeNumber))
      try {
          const result = await node.voteForCandidate(address, parseEther(this.stakeNumber), this.lockedDay)
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
    // cancleVote
    async cancleVote() {
      const node = new Node()
      try {
          const result = await node.cancelVoteForCandidate()
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
    async lockCancleVote() {
      const node = new Node()
      try {
          const result = await node.cancelVoteForLockCandidate(this.info.voteID)
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
    // claimVoteReward
    async claimVoteReward() {
      const node = new Node()
      // const account = this.$store.getters.account
      // const lockInfo = await node.getLockAllInfo(account)
      // if ( Number(lockInfo.voteReward1) > 0 ) {
      //   try {
      //     const result = await node.claimVoteLockReward(this.info.voteID)
      //       this.$notify({
      //               title: this.$t('tip.transfer'),
      //               dangerouslyUseHTMLString: true,
      //               message: `<a href="http://18.188.173.250/tx/${result.hash}" target="_blank">${this.$t('tip.check')}</a>`,
      //               type: 'success',
      //               duration: 8 * 1000
      //           });
      //   } catch (error) {
      //     console.log(error)
      //     this.$notify({
      //               title: 'Error',
      //               message: IsPC() ? error.data.message: error.message,
      //               type: 'error',
      //               duration: 8 * 1000
      //           });
      //   }
      // } else {
      try {
          const result = await node.claimVoteReward()
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
      // }  
    }


    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@function fn($data){
  @return $data/1920*100 + vw;
}
@function sn($data){
  @return $data/414*100 + vw;
}
.campaign-page {
  /deep/ .el-loading-mask {
      background-color: rgba(255,255,255,0) !important;
      .el-loading-spinner {
        margin-top: -14px !important;
      }
      .el-loading-spinner .circular {
        width: 30px;
        height: 30px;
      }
    }
  .header {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    // align-items: center;
    @media (max-width:959.95px) {
      flex-direction: column;
    }
    .tickets {
      font-size: 18px;
      font-weight: bold;
      line-height: 25px;
      color: #F8CD1B;
      text-align: right;
      // margin-right: 100px;
      // margin-top: 6px;
      @media (max-width:959.95px) {
        margin-left: 0px;
        font-size: 14.6px;
        margin-top: 0px;
        margin-bottom: 5px;
        text-align: left;
      }
    }
    .header-left {
      display: flex;
      // flex-direction: column;
      align-items: center;
      @media (max-width:959.95px) {
       flex-direction: column-reverse;
      }
    }
    .header-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (max-width:959.95px) {
       flex-direction: row-reverse;
       justify-content: space-around;
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
        font-size: 16px;
        font-weight: 800;
        img {
          width: 23px;
          height: 23px;
          margin-right: 3px;
        }
      }
    }
    .rules {
      display: flex;
      color: #F6C738;
      font-size: 14px;
      font-weight: 500;
      align-items: center;
      margin-top: 20px;
      cursor: pointer;
      @media (max-width:959.95px) {
        font-size: 16px;
      }
      img {
        width: 18px;
        margin-right: 10px;
      }
    }
  }
  .vote-msg {
    background: rgba(255, 255, 255, 0.39);
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.11);
    border-radius: fn(16);
    margin-top: 38px;
    padding-left: fn(98);
    padding-right: fn(230);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 162px;
     @media (max-width:959.95px) {
      width: 100%;
      height: 95px;
      justify-content: space-around;
      padding-left: 19px;
      padding-right: 19px;
      border-radius: 5px;
    }
    .line {
      height: 104px;
      border: 1px solid #EAEAEA;
      opacity: 0.3;
      &.web {
        @media (max-width:959.95px) {
         display: none;
       }
      }
      &.ph {
        display: none;
        @media (max-width:959.95px) {
          height: 64px;
         display: flex;
          // margin-left:50px
       }
      }
    }
    .item-msg {
      @media (max-width:959.95px) {
         &:last-child {
          //  margin-right:60px
         }
       }
      &.web {
        @media (max-width:959.95px) {
         display: none;
       }
      }
      .item-title {
        font-size: 16px;
        font-weight: 600;
        line-height: 22px;
        color: #828589;
        @media (max-width:959.95px) {
          font-size: 13px;
        }
      }
      .value {
        width: 301px;
        height: 61px;
        background: rgba(246, 199, 56, 0.04);
        opacity: 1;
        border-radius: 7px;
        margin-top: 15px;
        font-size: 30px;
        font-family: Avenir;
        font-weight: 900;
        line-height: 41px;
        color: #C49E48;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .item-value {
        font-size: 30px;
        font-family: Avenir;
        font-weight: 900;
        // line-height: 41px;
        color: #333333;
        margin-top: 23px;
        @media (max-width:959.95px) {
          font-size: 20px;
          margin-top: 8px;
        }
      }
    }
  }
  .vote-rules {
    // height: 229px;
    background: rgba(255, 255, 255, 0.39);
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.11);
    border-radius: fn(16);
    margin-top: 38px;
    padding-left: fn(98);
    padding-right: fn(80);
    padding-bottom: 30px;
    @media (max-width:959.95px) {
      flex-direction: column;
      width: 100%;
      height: auto;
      padding-bottom: 50px;
      padding-left: 19px;
      padding-right: 19px;
      border-radius: 5px;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      color: #333333;
      padding-top: 35px;
       @media (max-width:959.95px) {
         font-size: 16px;
       }
    }
    .vote-content {
      margin-top: 17px;
      .item {
        font-size: 16px;
        font-weight: 500;
        color: #666666;
        margin-top: 22px;
        display: flex;
        .item-title {
          margin-right: 33px;
        }
        .item-title-value {
          color: #333;
        }
      }
      @media (max-width:959.95px) {
         .item {
            font-size: 13.7px;
            font-weight: 500;
            color: #666666;
            margin-top: 22px;
            display: flex;
            line-height: 1.3;
            flex-direction: column;
            .item-title {
              margin-right: 0px;
              color: #666666;
              margin-bottom: 8px;
            }
            .item-title-value {
              color: #333;
            }
          }
       }
    }
  }
  .swap-tickets {
    height: 370px;
    background: rgba(255, 255, 255, 0.39);
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.11);
    border-radius: fn(16);
    margin-top: 38px;
    padding-left: fn(143);
    padding-right: fn(230);
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width:959.95px) {
      flex-direction: column;
      width: 100%;
      height: auto;
      padding-bottom: 50px;
      padding-left: 19px;
      padding-right: 19px;
      border-radius: 5px;
    }
    .title {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    // padding-top: 50px;
    margin-left: fn(-45);
    @media (max-width:959.95px) {
      font-size: 16px;
      padding-top: 20px;
    }
  }
  }

  
  .tab-add-content{
    width: fn(534);
    @media (max-width:959.95px) {
      width: 100%;
    }
    .row {
      @media (max-width:959.95px) {
        margin-top: 10px;
      }
    }
    .el-col{
      @media (max-width:959.95px) {
        padding-left: 6px;
        padding-right: 6px;
      }
    }
    .content-value{
      color: #828589;
      font-size: 12px;
      font-weight: 900;
      float: right;
      margin-bottom: 7px;
    }
    /deep/ .el-input__inner{
      width: 100%;
      height: 38px;
      font-size: 12px;
      border-radius: 19px;
      border: none;
      background: #E6E6E6;
      position: relative;
      font-weight: 900;
      font-family: 'Avenir';
      @media (max-width:959.95px) {
        border-radius: 18px;
      }
      &:focus{
        border: none;
      }
    }
    /deep/ .el-input__suffix-inner{
      color: #facd1b;
      font-size: 14px;
      line-height: 55px;
      span{
        font-weight: 900;
        position: absolute;
        top: -9px;
        left: -35px;
        font-family: Avenir;
      }
    }
    
    .content-add{
      margin:20px 0 4px;
      display: flex;
      justify-content: center;
      @media (max-width:959.95px) {
        margin: 12px 0 0;
      }
      img{
        text-align: center;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
    .content-fa{
      height: 38px;
      border-radius: 20px;
      background: #E6E6E6;
      font-weight: 900;
      display: flex;
      padding: 0 16px;
      align-items: center;
      color: #333;
      @media (max-width:959.95px) {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:12px;
        padding: 0 6px;
      }
      img{
        width: 24px;
        height: 24px;
        margin-right: 12px;
        vertical-align: middle;
        @media (max-width:959.95px) {
          margin-right: 6px;
          width: 20px;
          height: 20px;
        }
      }
      .AAC {
        background-image: url('../../images/aac.png');
        background-repeat: no-repeat;
        background-size: contain;
        width: 24px;
        height: 24px;
        margin-right: 12px;
        @media (max-width:959.95px) {
          margin-right: 6px;
          width: 20px;
          height: 20px;
        }
      }
      .Tickets {
        background-image: url('../../images/tickets.png');
        background-repeat: no-repeat;
        background-size: contain;
        width: 24px;
        height: 24px;
        margin-right: 12px;
        @media (max-width:959.95px) {
          margin-right: 6px;
          width: 20px;
          height: 20px;
        }
      }
    }
    .content-equal{
      margin-top: 17px;
      color: #fff;
      font-weight: 500;
      @media (max-width:959.95px) {
        font-size: 14px;
        margin-top: 14px;
      }
      span{
        vertical-align: middle;
        font-family: 'Avenir';
        font-weight: 900;
      }
      img{
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 7px;
        @media (max-width:959.95px) {
          width: 18px;
          height: 18px;
          margin-right: 4px;
        }
      }
    }
    .swap {
      width: 100%;
      height: 35px;
      background:  #FFDA76;
      border-radius: 17px;
      font-size: 14px;
      font-weight: bold;
      color: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      cursor: pointer;
    }
    .tip {
      font-size: 12px;
      font-weight: 600;
      color: #737AB9;
      margin-top: 10px;
      i {
        margin-right: 5px;
      }
      @media (max-width:959.95px) {
        display: flex;
        font-size:11px;
      }
    }
  }
  .redemption {
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width:959.95px) {
      width: 100%;
      flex-direction: row;
      justify-content: space-around;
    }
    .count-down {
      font-size: 39px;
      font-weight: 900;
      color: #FFDA76;
      -webkit-text-stroke: 1 #BF8E32;
      @media (max-width:959.95px) {
        font-size: 25px;
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
      color: #9A9A9A;
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
  }
  .my-vote {
    background: rgba(255, 255, 255, 0.39);
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.11);
    border-radius: fn(16);
    margin-top: 38px;
    padding-left: fn(143);
    padding-right: fn(123);
    padding-bottom: 40px;
    position: relative;
    padding-top: 24px;
    .title-div {
      display: flex;
      align-items: center;
      margin-left: fn(-48);
      color: #333;
      .vote-btn {
        display: none;
        }
    }
     
    @media (max-width:959.95px) {
        width: 100%;
        padding-left: 19px;
        padding-right: 19px;
        border-radius: 5px;
        margin-top: 26px;
        padding-top: 0px;
        .title-div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .vote-btn {
              width: 91px;
              height: 25px;
              background: #F6C738;
              border-radius: 12px;
              font-size: 13px;
              font-weight: 600;
              color: #343434;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              margin-top: 20px;
            }
        }
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      @media (max-width:959.95px) {
      }
    }
    @media (min-width:959.95px) {
      .my-vote-table {
        padding-top: 25px;
        display: flex;
        justify-content: center;
        &.ph {
          display: none;
        }
        table {
            width: 90%;
            text-align: center;
          }
          th {
            font-size: 14px;
            font-weight: 400;
            color: #B7B7B7;
            height: 15px;
            // text-align: left;
          }
          .th1 {
            width: 25%;
          }
          .th2 {
            width: 15%;
          }
          .th2 {
            width: 15%;
          }
          .th3 {
            width: 25%;
          }
          .th4 {
            width: 25%;
          }
          td {
            background: #F8F8F8;
          }
          td {
            font-size: 14px;
            font-weight: bold;
            color: #333;
            height: 57px;
            // text-align: left;
            .crown {
              width: 13px;
              height: 11.5px;
            }
            .vote-btn {
              width: 106px;
              height: 35px;
              background: #F6C738;
              border-radius: 17px;
              font-size: 14px;
              font-weight: 500;
              color: #28282E;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              margin: 0 auto;
            }
            span {
              font-size: 14px;
              font-weight: bold;
              color: #F6C738;
              margin-left: 10px;
              cursor: pointer;
            }
          }
      }
     }
     @media (max-width:959.95px) {
      .my-vote-table  {
          width: 100%;
          padding-top: 20px;
          &.web {
            display: none;
          }
          table {
              width: 100%;
              text-align: center;
            }
            th {
              font-size: 13px;
              font-weight: 500;
              color: #333;
              height: 45px;
              text-align: left;
              border-bottom: 0.5px solid #B7B7B7;
            }
            .th1 {
              width: 45%;
            }
            .th3 {
              width: 20%;
            }
            .th2 {
              width: 50%;
              text-align: right;
            }
            td {
              font-size: 14px;
              font-weight: bold;
              color: #666;
              height: 68px;
              text-align: left;
              &:last-child {
                text-align: right;
              }
              .crown {
                width: 13px;
                height: 11.5px;
              }
              .earnings {
                font-size: 12px;
                color: #5CCD88;
                font-weight: Heavy;
                margin-top: 10px;
                .extraction {
                  font-size: 12px;
                  color: #F6C738;
                  margin-left: 10px;
                  cursor: pointer;
                }
              }
              // .vote-btn {
              //   width: 91px;
              //   height: 25px;
              //   background: #F6C738;
              //   border-radius: 12px;
              //   font-size: 13px;
              //   font-weight: 600;
              //   color: #343434;
              //   display: flex;
              //   align-items: center;
              //   justify-content: center;
              //   cursor: pointer;
              // }
            }
            .td1 {
              display: flex;
              align-items: center;
              img {
                margin-right: 3px;
              }
              .name {
                font-size: 17.3px;
                color: #F6C738;
                font-weight: 700;
              }
            }
            .td2 {
              color: #B5B5B5;
              font-size: 12.3px;
              margin-top: 10px;
              .number {
                color: #666;
              }
            }
        }
     }
  }
  .vote {
    background: rgba(255, 255, 255, 0.39);
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.11);
    border-radius: fn(16);
    margin-top: 38px;
    padding-left: fn(143);
    padding-right: fn(123);
    padding-bottom: 40px;
    position: relative;
    @media (max-width:959.95px) {
        width: 100%;
        padding-left: 19px;
        padding-right: 19px;
        background: none;
    }
    .leaderboard {
      width: 111px;
      height: 37px;
      background: linear-gradient(97deg, #C267AA 0%, #FF5205 100%);
      border-radius: 0px 12px 0px 12px;
      font-size: 18px;
      font-weight: bold;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: -20px;
      top: 37px;
       @media (max-width:959.95px) {
        width: 72px;
        height: 24px;
        background: linear-gradient(97deg, #C267AA 0%, #FF5205 100%);
        border-radius: 0px 16px 0px 16px;
        font-size: 14px;
        left: 50%;
        top: -7px;
        transform: translate(-50%);
       }
    }
     @media (min-width:959.95px) {
      .vote-table {
        padding-top: 25px;
        &.ph {
          display: none;
        }
        table {
            width: 100%;
            text-align: center;
          }
          th {
            font-size: 14px;
            font-weight: 400;
            color: #B7B7B7;
            height: 55px;
            text-align: left;
          }
          .th1 {
            width: 20%;
          }
          .th2 {
            width: 25%;
          }
          .th3 {
            width: 20%;
          }
          .th4 {
            width: 20%;
          }
          .th5 {
            width: 10%;
          }
          td {
            font-size: 14px;
            font-weight: bold;
            color: #333;
            height: 48px;
            text-align: left;
            &.less {
              color: #F17149;
            }
            .less-tip {
              margin-left: 0px;
              .svg-icon {
                margin-right: 3px;
              }
              color: #F17149;
              font-size: 14px;
            }
            .crown {
              width: 13px;
              height: 11.5px;
            }
            .vote-btn {
              width: 106px;
              height: 35px;
              background: #F6C738;
              border-radius: 17px;
              font-size: 14px;
              font-weight: 500;
              color: #28282E;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              &.haved {
                 background: rgb(227, 220, 220);
                 color: #333;
              }
            }
            span {
              font-size: 14px;
              font-weight: bold;
              color: #F6C738;
              margin-left: 10px;
              cursor: pointer;
            }
          }
          .detail-box {
            width: 100%;
            height: 138px;
            background: #eee;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            .box-item {
              width: 80%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .box-apy {
              display: flex;
              line-height: 2;
              justify-content: space-evenly;
              width: 400px;
              padding: 10px;
              .apy-title {
                font-size: 13.3px;
                color: #fff;
                padding: 6px;
              }
              .apy-item {
                cursor: pointer;
                text-align: center;
                padding: 6px;
                .apy-item-title {
                  font-size: 13.3px;
                  color: #848484;
                }
                .apy-item-val {
                  font-size: 13.3px;
                  color: #5CCD88;
                }
                &.active {
                  background-color: #F6C738;
                  border-radius: 6px;
                  .apy-item-title {
                    color: #313138;
                  }
                  .apy-item-val {
                    color: #313138;
                  }
                }
              }
            }
            .box-input {
              width: 300px;
              .balance {
                font-size: 12px;
                font-weight: bold;
                line-height: 18px;
                color: #828589;
                text-align: right;
              }
            }
            /deep/ .stake-input{
              min-height: 29px;
              @media (max-width: 959.95px){
                margin-bottom: 10px;
              }
              .el-input__suffix-inner {
                line-height: 40px;
                font-size: 12px;
                margin-right: 10px;
                cursor: pointer;
                color: #FACD1B;
                font-weight: 500;
              }
              .el-input__inner {
                color: #828589;
                font-weight: 900;
                font-size: 12px;
                border-radius: 0;
                width: 100%;
                border: 0;
                margin: 0;
                background: #E6E6E6;
                display: block;
                min-height: 29px;
                padding-left: 20px;
                padding-right: 50px;
                border-radius: 22px;
              }
            }
            .btn {
              width: 120px;
              height: 35px;
              background: #F6C738;
              border-radius: 17px;
              font-size: 14px;
              font-weight: 500;
              color: #28282E;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              margin-left: 20px;
              &.cancle {
                margin-top: 15px;
              }
            }
            .tip {
              font-size: 12px;
              font-weight: 600;
              color: #737AB9;
              margin-top: 5px;
              i {
                margin-right: 5px;
              }
            }
          }
      }
     }
    @media (max-width:959.95px) {
        .vote-table {
          width: 100%;
          padding-top: 25px;
          &.web {
            display: none;
          }
          table {
              width: 100%;
              text-align: center;
            }
            th {
              font-size: 13px;
              font-weight: 500;
              color: #333;
              height: 45px;
              text-align: left;
              border-bottom: 0.5px solid #B7B7B7;
            }
            .th1 {
              width: 70%;
            }
            .th2 {
              width: 30%;
            }
            td {
              font-size: 14px;
              font-weight: bold;
              color: #333;
              height: 68px;
              text-align: left;
              .less {
                color: #F17149;
              }
              .less-tip {
                margin-left: 5px;
                .svg-icon {
                  // margin-right: 3px;
                  margin-top: 3px;
                }
                color: #F17149;
                font-size: 12px;
              }
              .crown {
                width: 13px;
                height: 11.5px;
              }
              .earnings {
                font-size: 12px;
                color: #fff;;
                font-weight: normal;
                margin-top: 10px;
                .extraction {
                  font-size: 12px;
                  color: #F6C738;
                  margin-left: 10px;
                  cursor: pointer;
                }
              }
              .vote-btn {
                width: 71px;
                height: 25px;
                background: #F6C738;
                border-radius: 12px;
                font-size: 13px;
                font-weight: 600;
                color: #343434;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                &.haved {
                 background: rgb(227, 220, 220);
                 color: #333;
              }
              }
            }
            .td1 {
              display: flex;
              align-items: center;
              img {
                margin-right: 3px;
              }
              .name {
                font-size: 17.3px;
                color: #fff;
                margin-left: 10px;
                font-weight: 700;
              }
            }
            .td2 {
              color: #B5B5B5;
              font-size: 12.3px;
              margin-top: 10px;
              .number {
                color: #fff;
              }
            }
            .detail-box {
              width: 100%;
              height: auto;
              background: #eee;
              border-radius: 0px 0px 4px 4px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-around;
              padding: 40px 20px 33px 20px;
              position: relative;
              .expand {
                width: 13px;
                margin-top: -42px;
              }
              .close {
                position: absolute;
                top: 6px;
                right: 7px;
                color: #909090;
                font-size: 18px;
              }
              .box-item {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 35px;
                &:last-child {
                  margin-top: 30px;
                }
              }
              .box-apy {
                display: flex;
                line-height: 2;
                justify-content: space-evenly;
                width: 100%;
              .apy-title {
                font-size: 10.3px;
                color: #fff;
                padding: 6px;
              }
              .apy-item {
                cursor: pointer;
                text-align: center;
                padding: 6px;
                .apy-item-title {
                  font-size: 10.3px;
                  color: #848484;
                }
                .apy-item-val {
                  font-size: 10.3px;
                  color: #5CCD88;
                }
                &.active {
                  background-color: #F6C738;
                  border-radius: 6px;
                  .apy-item-title {
                    color: #313138;
                  }
                  .apy-item-val {
                    color: #313138;
                  }
                }
              }
            }
              .box-input {
                width: 100%;
                .balance {
                  font-size: 12px;
                  font-weight: bold;
                  color: #828589;
                  text-align: right;
                  margin-bottom: 5px;
                }
              }
              /deep/ .stake-input{
                min-height: 29px;
                @media (max-width: 959.95px){
                  margin-bottom: 10px;
                }
                .el-input__suffix-inner {
                  line-height: 40px;
                  font-size: 12px;
                  margin-right: 10px;
                  cursor: pointer;
                  color: #FACD1B;
                  font-weight: 500;
                }
                .el-input__inner {
                  color: #666;
                  font-size: 12px;
                  border-radius: 0;
                  width: 100%;
                  border: 0;
                  margin: 0;
                  background: #E6E6E6;
                  display: block;
                  min-height: 29px;
                  padding-left: 20px;
                  padding-right: 50px;
                  border-radius: 22px;
                }
              }
              .btn {
                width: 100%;
                height: 35px;
                background: #F6C738;
                border-radius: 16px;
                font-size: 13px;
                font-weight: 500;
                color: #28282E;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                margin-top: 15px;
                &.cancle {
                  // margin-top: 15px;
                }
              }
              .tip {
                font-size: 10px;
                font-weight: 600;
                color: #737AB9;
                margin-top: 0px;
                i {
                  margin-right: 5px;
                }
              }
            }
        }
      }

  }
}
</style>
