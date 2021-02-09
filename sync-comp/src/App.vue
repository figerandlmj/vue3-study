<template>
<div class="app">
  <div class="link">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.app{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .link{
    margin: 20px 0;
    a{
      padding-left: 10px;
      font-size: 16px;
      color: #333;
      text-decoration: none;
      &.router-link-active{
        color: #f40;
      }
    }
  }
}
</style>

