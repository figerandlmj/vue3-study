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
    <button class="btn" :disabled="loading">
      {{ loading ? "Loading" : "登录" }}
    </button>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const loginIdRef = ref("");
    const loginPwdRef = ref("");
    const handleLogin = async () => {
      const user = await store.dispatch("loginUser/login", {
        loginId: loginIdRef.value,
        loginPwd: loginPwdRef.value,
      });
      if (user) {
        router.push("/");
      } else {
        alert("账号/密码错误");
      }
    };
    return {
      loginId: loginIdRef,
      loginPwd: loginPwdRef,
      loading: computed(() => store.state.loginUser.loading),
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