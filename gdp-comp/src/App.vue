<template>
  <h1 class="title">2019 GDP Top 5</h1>
  <div class="container">
    <!-- bar1 -->
    <Bar1 :gdp="gdp" />
    <!-- bar2 -->
    <Bar2 :gdp="gdp" />
  </div>
  <div class="controls">
    <div class="item" v-for="item in gdp" :key="item.country">
      <label>{{ item.country }}：</label>
      <input type="number" step="0.01" min="0" v-model="item.value" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Bar1 from './components/Bar1.vue';
import Bar2 from './components/Bar2.vue';
export default {
  components: {
    Bar1,
    Bar2
  },
  setup() {
    const gdp = ref([]);
    async function fetchGdp() {
      gdp.value = await fetch('/api/gdp.json').then((res) => res.json());
    }
    fetchGdp();
    // onMounted(fetchGdp);
    return {
      gdp
    };
  }
};
</script>

<style lang="less" scoped>
.title {
  text-align: center;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  .item {
    margin-left: 10px;
  }
}
</style>