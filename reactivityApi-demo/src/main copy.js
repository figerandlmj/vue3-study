import {reactive, readonly, ref, computed} from 'vue';

const state = reactive({a: 1, b: 2});

const sum = computed(() => {
  console.log('compute');
  return state.a + state.b;
});

// compute
console.log(sum.value); // 3
console.log(sum.value); // 3
console.log(sum.value); // 3

state.a = 5;
state.b = 6;
// compute
console.log(sum.value); // 11
console.log(sum.value); // 11
console.log(sum.value); // 11
