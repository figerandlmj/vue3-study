<template>
  <div class="bar1">
    <div class="item" v-for="item in bars" :key="item.country">
      <label>{{ item.country }}</label>
      <div class="bar" :style="{ width: item.size + 'px', background: item.color }"></div>
      <div class="value">{{ item.value }}万亿</div>
    </div>
  </div>
</template>

<script>
import { computed, toRef } from 'vue';
import useGdp from '../composition/useGdp';

export default {
  props: ['gdp'],
  setup(props) {
    const gdpRef = toRef(props, 'gdp');
    return {
      ...useGdp(gdpRef, 400)
    };
  }
};
</script>

<style lang="less" scoped>
.bar1 {
  width: 500px;
  box-sizing: border-box;
  margin: 3em;
  border-left: 1px solid #333;
  .item {
    position: relative;
    display: flex;
    height: 35px;
    line-height: 35px;
    margin: 1em 0;
    label {
      position: absolute;
      left: -50px;
    }
    .bar {
      width: 100px;
      height: 100%;
      margin-right: 1em;
      flex: 0 0 auto;
    }
    .value {
      flex: 0 0 auto;
    }
  }
}
</style>