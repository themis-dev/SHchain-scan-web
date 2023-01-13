<template>
  <ul class="pagination pagination-sm">
    <li :class="['page-item',current===1||total===0?'disabled':'']" @click="change(1,1)">
      <a class="page-btn" href="javascript:;">
        <span>{{$t('pagination.first')}}</span>
      </a>
    </li>
    <li :class="['page-item',current===1||total===0?'disabled':'']" @click="change(current-1,1)">
      <a class="page-btn" href="javascript:;">
        <span>
          <i class="fa fa-chevron-left small"></i>
        </span>
      </a>
    </li>
    <li class="page-item disabled">
      <span class="page-btn text-nowrap">{{$t('pagination.page')}}
        <strong class="font-weight-medium">{{total<=0 ?'0':current}}</strong> {{$t('pagination.total')}}
        <strong class="font-weight-medium">{{total}}</strong>{{$t('pagination.pageN')}}
      </span>
    </li>
    <li :class="['page-item',current===total||total===0?'disabled':'']" @click="change(current+1,2)">
      <a class="page-btn" href="javascript:;">
        <span><i class="fa fa-chevron-right small"></i>
        </span>
      </a>
    </li>
    <li :class="['page-item',current===total||total===0?'disabled':'']" @click="change(total,2)">
      <a class="page-btn" href="javascript:;">
      <span>{{$t('pagination.last')}}</span>
    </a>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'TablePagination',
    props: {
      current: Number,
      total: Number
    },
    data() {
      return {
      }
    },
    mounted() {

    },
    methods: {
      change: function(v, type) {
        if (this.current === 1 && type === 1) {
          return
        }
        if (this.current === this.total && type === 2) {
          return
        }
        this.$emit('change', v)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .pagination{
    margin-bottom: 0;
  }

  .page-btn {
    // color: #3F7FFF;
    color: #1C9DBF;
    transition: all .2s ease-in-out
  }

  .page-btn, .page-btn.page-item.disabled {
    // background-color: rgba(52, 152, 219, .1)
    background-color: #eee
  }

  .page-btn:hover {
    background-color: #1C9DBF;
    color: #fff
  }

  .page-item.disabled .page-btn {
    // background-color: rgba(52, 152, 219, .1)
    background-color: #eee
  }

  .pagination .page-item:first-child {
    margin-left: 0
  }

  .pagination .page-item:last-child {
    margin-right: 0
  }

  .pagination-sm .page-btn {
    line-height: 1.7
  }

  .pagination-sm .page-item:first-child .page-btn {
    border-top-left-radius: .25rem;
    border-bottom-left-radius: .25rem
  }

  .pagination-sm .page-item:last-child .page-btn {
    border-top-right-radius: .25rem;
    border-bottom-right-radius: .25rem
  }
</style>
