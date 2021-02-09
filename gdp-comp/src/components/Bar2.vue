<template>
  <div class="bar2">
    <div class="item" v-for="item in bars" :key="item.country">
      <label>{{ item.country }} {{ item.value }}万亿</label>
      <div class="bar" :style="{ width: item.size + 'px', background: item.color }"></div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import useGdp from '../composition/useGdp';

export default {
  props: ['gdp'],
  setup(props) {
    const gdpRef = computed(() => props.gdp);
    return {
      ...useGdp(gdpRef, 600)
    };
  }
};
</script>

<style lang="less" scoped>
.bar2 {
  position: relative;
  width: 600px;
  box-sizing: border-box;
  margin: 3em;
  &::before {
    position: absolute;
    left: 50%;
    display: block;
    width: 1px;
    height: 100%;
    content: '';
    background: #666;
  }
  .item {
    position: relative;
    display: flex;
    justify-content: center;
    height: 35px;
    line-height: 35px;
    margin: 1em 0;
    color: #fff;
    label {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    }
    .bar {
      width: 100px;
      height: 100%;
      margin-right: 1em;
      flex: 0 0 auto;
    }
  }
}
</style>