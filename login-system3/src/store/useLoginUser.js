import { reactive, readonly, inject } from 'vue';
import * as userApi from '../api/user';
const key = Symbol();// provide key

export function provideStore(app) {
  const state = reactive({
    user: null,
    loading: false
  });

  async function login(loginId, loginPwd) {
    state.loading = true;
    const user = await userApi.login(loginId, loginPwd);
    state.user = user;
    state.loading = false;
  }

  async function loginOut() {
    state.loading = true;
    await userApi.loginOut();
    state.user = null;
    state.loading = false;
  }

  async function whoAmI() {
    state.loading = true;
    const user = await userApi.whoAmI();
    state.user = user;
    state.loading = false;
  }

  app.provide(key, {
    state: readonly(state),
    login,
    loginOut,
    whoAmI
  });
}

export function useStore(defaultValue = null) {
  return inject(key, defaultValue);
}
