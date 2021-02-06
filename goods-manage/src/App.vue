<template>
  <div class="container">
    <div class="item">
      <label class="label">产品：</label>
      <CheckEditor v-for="item in procucts" :key="item.id" v-model="item.sell" v-model:title.cap="item.title" />
    </div>
    <div class="item">
      <label class="label">销售中：</label>
      <template v-for="(item, index) in sellProducts" :key="item.id">
        <label>{{index + 1}}.</label>
        <span class="title">{{item.title}}</span>
      </template>
    </div>
  </div>
</template>

<script>
import {ref, computed} from 'vue';
import CheckEditor from './components/CheckEditor.vue';
const defaultSells = [
  {
    id: 1,
    sell: true,
    title: 'iphone'
  },
  {
    id: 2,
    sell: true,
    title: 'xiaomi'
  },
  {
    id: 3,
    sell: false,
    title: 'huawei'
  },
  {
    id: 4,
    sell: false,
    title: 'vivo'
  }
]
export default {
  components: {
    CheckEditor
  },
  setup() {
    const productsRef = ref(defaultSells);
    const sellProductsRef = computed(() => productsRef.value.filter(item => item.sell));
    return {
      procucts: productsRef,
      sellProducts: sellProductsRef
    }
  },
}
</script>

<style lang="less" scoped>
.container{
  .item{
    display: flex;
    align-items: center;
    .title{
      display: inline-block;
      margin-right: 10px;
    }
  }
}
</style>