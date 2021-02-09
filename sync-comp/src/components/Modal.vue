<template>
  <div class="modal">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.modal{
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
}
</style>