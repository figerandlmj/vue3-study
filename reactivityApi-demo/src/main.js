import {reactive, watchEffect, watch} from 'vue';

const state = reactive({count: 0});

watchEffect(() => {
  console.log('watchEffect', state.count);
});

watch(() => state.count, (count, oldCount) => {
  console.log('watch', count, oldCount);
});

console.log('start');

setTimeout(() => {
  console.log('timeout');
  state.count ++;
  state.count ++;
});

state.count ++;
state.count ++;

console.log('end');

// watchEffect 0
// start
// end
// watchEffect 2
// watch 2 0
// timeout
// watchEffect 4
// watch 4 2




