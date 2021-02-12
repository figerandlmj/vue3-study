<template>
  <form class="form" @submit.prevent="handleLogin">
    <div class="item">
      <label>账号：</label>
      <input type="text" v-model="loginId" />
    </div>
    <div class="item">
      <label>密码：</label>
      <input type="password" v-model="loginPwd" />
    </div>
    <button class="btn" :disabled="loginUserStore.loading">
      {{ loginUserStore.loading ? "Loading" : "登录" }}
    </button>
  </form>
</template>

<script>
import { loginUserStore, login } from "../store/useLoginUser";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const loginIdRef = ref("");
    const loginPwdRef = ref("");
    const handleLogin = async () => {
      await login(loginIdRef.value, loginPwdRef.value);
      if (loginUserStore.user) {
        router.push("/");
      } else {
        alert("账号/密码错误");
      }
    };
    return {
      loginId: loginIdRef,
      loginPwd: loginPwdRef,
      loginUserStore,
      handleLogin,
    };
  },
};
</script>

<style lang="less" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  .item {
    margin-top: 10px;
  }
  .btn {
    margin-top: 10px;
  }
}
</style>