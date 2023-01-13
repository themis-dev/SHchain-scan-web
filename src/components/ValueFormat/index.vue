<template>
  <!--<div class="value-format text-break">-->
    <el-tooltip
      :disabled="valueFormat.indexOf('...') === -1 ? true :false"
      :content="value"
      placement="top" effect="dark">
      <el-button type="text" :class="className" class="font-weight-normal" style="padding: 0;cursor: text;user-select:text" >
        <span :class="childenClass">{{currency}}{{valueFormat}} {{unitCurrency}}</span>
      </el-button>
    </el-tooltip>
  <!--</div>-->
</template>

<script>
  export default {
    name: 'ValueFormat',
    props: {
      value: String,
      className: String,
      unitCurrency: String,
      currency: String,
      childenClass: String
    },
    data() {
      return {
      }
    },
    mounted() {

    },
    computed: {
      valueFormat: function() {
        if (this.value && this.value.length > 100) {
          const index = this.value.indexOf('.') === -1 ? 100 : 101;
          return this.value.substring(0, index) + '...';
        }
        return this.value
      }
    },
    methods: {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .value-format{
    display: inline-block;
  }
</style>
