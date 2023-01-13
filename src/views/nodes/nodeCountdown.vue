<template>
  <div class="node-countdown" >
    <div class="count-down" :style="styles">{{hr1}}:{{min1}}:{{sec1}}</div>
  </div>
</template>

<script>
  export default {
    name: 'nodeCountdown',
    props:{
        time:{default: 0},
        styles:{default: ''},
    },
    data() {
        return {
        day1: 0, // 天
        hr1: '00', // 时
        min1: '00', // 分
        sec1: '00' // 秒
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
    destroyed() {
        clearInterval(this._interval)
    },
    methods: {
        countdown() {
        // let date = '2021-06-04 12:00:00'
        // date = date.replace(/-/g, '/')
        // const end = Date.parse(new Date(date))
        const now = Date.parse(new Date())
        const msec = this.time - now
        if (msec< 0) {
          this.start = true;
          this.hr1 = '00'
          this.min1 = '00'
          this.sec1 = '00'
          clearInterval(this._interval1)
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
    }
  }
</script>

<style lang="scss" scoped>
  .node-countdown{
      .count-down {
        font-size: 39px;
        font-weight: 900;
        color: #C49E48;
        -webkit-text-stroke: 1 #BF8E32;
        @media (max-width:959.95px) {
            font-size: 25px;
        }
    }
  }
</style>
