<template>
  <div class="link">
    <router-link to="/">Home</router-link>
    <span v-if="loginUserStore.loading">Loading</span>
    <span v-else-if="loginUserStore.user"
      >{{ loginUserStore.user.name }}
      <a href="/" @click.prevent="handleLoginOut">退出</a></span
    >
    <router-link v-else to="/login">Login</router-link>
  </div>
  <router-view></router-view>
</template>

<script>
import { useRouter } from "vue-router";
import { loginUserStore, whoAmI, loginOut } from "./store/useLoginUser";
export default {
  setup() {
    const router = useRouter();

    const init = async () => {
      await whoAmI();
      if (loginUserStore.user) {
        router.push("/");
      }
    };
    init();

    const handleLoginOut = async () => {
      await loginOut();
      router.push("/login");
    };
    return {
      loginUserStore,
      handleLoginOut,
    };
  },
};
</script>

<style lang="less" scoped>
.link {
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    padding: 0 10px;
  }
  .router-link-active {
    color: #f40;
  }
}
</style>

