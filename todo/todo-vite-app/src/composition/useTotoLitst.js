import { ref, watchEffect } from 'vue';
import { fetch, save } from '../util/tosoStorage.js';

export default function useTodoList() {
  const todoListRef = ref(fetch());
  watchEffect(() => {
    save(todoListRef.value);
  });
  return {
    todoListRef,
  };
}