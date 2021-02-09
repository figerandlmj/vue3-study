<template>
  <div class="container">
    <div class="block">
      <h1>区域1</h1>
      <p>
        <button @click="modalVisible = true">打开蒙层</button>
      </p>
      <Teleport to="body">
        <Modal v-if="modalVisible">
          <button @click="modalVisible = false">关闭蒙层</button>
        </Modal>
      </Teleport>
    </div>
    <div class="block mid">
      <h1>区域2</h1>
    </div>
    <div class="block">
      <Block3 />
    </div>
    <div class="block">
      <h1>区域4</h1>
    </div>
    <div class="block mid">
      <Block5 />
    </div>
    <div class="block">
      <h1>区域6</h1>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import Modal from '../components/Modal.vue';
import {getAsyncComponent} from '../util';
const Block3 = getAsyncComponent('../components/Block3.vue');
const Block5 = getAsyncComponent('../components/Block5.vue');
export default {
  components: {
    Modal,
    Block3,
    Block5,
  },
  setup() {
    const modalVisibleRef = ref(false);
    return {
      modalVisible: modalVisibleRef
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  width: 920px;
  .block{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 150px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    &.mid{
      margin: 0 10px 20px;
    }
    h1{
      text-align: center;
      font-size: 16px;
      color: #333;
    }
  }
}
</style>