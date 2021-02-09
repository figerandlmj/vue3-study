<template>
  <div class="loader"></div>
</template>

<style lang="less" scoped>
.loader {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #3498db;
  border-top: 2px solid transparent;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>