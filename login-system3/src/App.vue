<template>
  <div class="link">
    <router-link to="/">Home</router-link>
    <span v-if="state.loading">Loading</span>
    <span v-else-if="state.user"
      >{{ state.user.name }}
      <a href="/" @click.prevent="handleLoginOut">退出</a></span
    >
    <router-link v-else to="/login">Login</router-link>
  </div>
  <router-view></router-view>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "./store/useLoginUser";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const init = async () => {
      await store.whoAmI();
      if (store.state.user) {
        router.push("/");
      }
    };
    init();

    const handleLoginOut = async () => {
      await store.loginOut();
      router.push("/login");
    };
    return {
      ...store,
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

