import { ref, computed, watchEffect, onMounted, onUnmounted } from 'vue';
import { filter } from '../util/tosoStorage';

const filterList = [
  {
    key: 'all',
    title: 'All'
  },
  {
    key: 'active',
    title: 'Active'
  },
  {
    key: 'completed',
    title: 'Completed'
  }
];

const getHash = () => {
  const hash = location.hash.replace(/#\/?/, '');
  if (['active', 'completed'].includes(hash)) {
    return hash;
  } else {
    location.hash = '';
    return 'all';
  }
}

export default function useFilterTodo(todoListRef) {
  const curFilterRef = ref(getHash());
  const onHashChange = () => {
    curFilterRef.value = getHash();
  }
  const onFilter = filter => {
    location.hash = filter;
  }
  const filterTodoRef = computed(() => {
    return filter(todoListRef.value, curFilterRef.value);
  });
  const activeNumRef = computed(() => {
    return filter(todoListRef.value, 'active').length;
  });
  const completedNumRef = computed(() => {
    return filter(todoListRef.value, 'completed').length;
  });
  onMounted(() => {
    window.addEventListener('hashchange', onHashChange);
  });
  onUnmounted(() => {
    window.removeEventListener('hashchange', onHashChange);
  });
  return {
    filterList,
    curFilterRef,
    filterTodoRef,
    activeNumRef,
    completedNumRef,
    onFilter,
  }
}