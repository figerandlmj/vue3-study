<template>
  <div class="link">
    <router-link to="/">Home</router-link>
    <span v-if="loading">Loading</span>
    <span v-else-if="user"
      >{{ user.name }}
      <a href="/" @click.prevent="handleLoginOut">退出</a></span
    >
    <router-link v-else to="/login">Login</router-link>
  </div>
  <router-view></router-view>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const handleLoginOut = async () => {
      await store.dispatch("loginUser/loginOut");
      router.push("/login");
    };
    return {
      loading: computed(() => store.state.loginUser.loading),
      user: computed(() => store.state.loginUser.user),
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

