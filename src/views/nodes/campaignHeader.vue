<template>
  <div class="campaign-header">
    <div class="header-content">
        <div class="title">{{$t('compaignHeader.nodeCampaign')}}</div>
        <div class="right">
            <div class="count-down">{{hr1}}:{{min1}}:{{sec1}}</div>
            <div class="number">{{$t('compaignHeader.first', {msg: rid})}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import Node from '../../contracts/node'

  export default {
    name: 'campaignHeader',
    props:{
      // rid:{default: 0}
    },
    data() {
        return {
          rid: 1,
        day1: 0, // 天
        hr1: '00', // 时
        min1: '00', // 分
        sec1: '00', // 秒
        msec: '',
        }
    },
    computed:{
    },
    created(){
      this.countdown()
      this._interval = setInterval(() => {
        this.countdown()
      }, 1000)
    },
    mounted() {
      this.getRid()
      this._interval1 = setInterval(() => {
        this.getRid()
        this.roundEndTime()
      }, 5000)
      this.roundEndTime()
    },
    destroyed() {
        clearInterval(this._interval)
        clearInterval(this._interval1)
    },
    methods: {
        countdown() {
        let date = '2021-06-06 12:00:00'
        date = date.replace(/-/g, '/')
        const end = this.endTime*1000 //Date.parse(new Date(date))
        const now = Date.parse(new Date())
        const msec =  this.endTime*1000 - now //end - now
        if (msec< 0) {
          this.start = true;
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
          this.start = true
          clearInterval(this._interval1)
        }
      },
      async getRid() {
        const node = new Node()
        const rid = await node.rid()
        this.rid = rid.toNumber()
        // console.log(this.rid)
      },
      async roundEndTime() {
        const node = new Node()
        const endTime = await node.roundEndTime()
        this.endTime = endTime.toNumber()
        // console.log(111)
        // console.log(this.endTime)
      },
    }
  }
</script>

<style lang="scss" scoped>
 @media (min-width:959.95px) {
  .campaign-header {
      .header-content {
        width: 775px;
        height: 72px;
        // background: linear-gradient(85deg, #F8CD1B 0%, #CBA719 47%, #B7981C 57%, #B0921D 61%, #9E841F 69%, #28282E 100%);
        opacity: 1;
        border-radius: 16px;
        display: flex;
        align-items: center;
        padding-left: 42px;
        position: relative;
        .title {
            font-size: 38px;
            font-weight: 800;
            // font-family: 'WenYue XinQingNianTi';
            color: #28282E;
        }
        .right {
            display: flex;
            align-items: center;
        }
        .count-down {
            font-size: 39px;
            font-weight: 900;
            line-height: 60px;
            color: #FFDA76;
            -webkit-text-stroke: 1 #BF8E32;
            margin-left: 60px;
            display: none;

        }
        .number {
            font-size: 18px;
            font-weight: bold;
            line-height: 28px;
            color: #8B8B8B;
            margin-left: 100px;
        }
        img {
            width: 202px;
            position: absolute;
            right: -60px;
            top: -80px;
        }
      }
  }
 }
   @media (max-width:959.95px) {
        .campaign-header {
            .header-content {
                // width: 100%;
                height: 95px;
                // background: linear-gradient(85deg, #F8CD1B 0%, #CBA719 47%, #B7981C 57%, #B0921D 61%, #9E841F 69%, #28282E 100%);
                border-radius: 16px 0px 0px 16px;
                display: flex;
                flex-direction: column;
                padding-left: 22px;
                position: relative;
                .title {
                    font-size: 22px;
                    font-weight: 800;
                    // font-family: 'WenYue XinQingNianTi';
                    color: #28282E;
                    margin-top: 12px;
                }
                .right {
                    display: flex;
                    align-items: center;
                    margin-top: 8px;
                }
                .count-down {
                    font-size: 29px;
                    font-weight: 900;
                    color: #BF8E32;
                    -webkit-text-stroke: 1 #BF8E32;
                }
                .number {
                    font-size: 17px;
                    font-weight: bold;
                    color: #666;
                    margin-left: 24px;
                }
                img {
                    width: 136px;
                    position: absolute;
                    right: -12px;
                    top: -27px;
                }
            }
        }
    }
</style>
