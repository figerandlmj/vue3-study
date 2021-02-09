import {reactive, readonly, ref, computed} from 'vue';

const state = reactive({
  firstName: '三',
  lastName: '张'
});

const fullName = computed(() => {
  console.log('changed');
  return `${state.lastName}${state.firstName}`;
});

console.log('state ready'); // state ready
// changed
console.log('fullName is ', fullName.value); // fullName is 张三
console.log('fullName is ', fullName.value); // fullName is 张三

const imState = readonly(state);
console.log(imState === state); // false

const stateRef = ref(state);
console.log(stateRef.value === state); // true

state.firstName = '四';
state.lastName = '李';

console.log(imState.firstName, imState.lastName); // 四 李
// changed
console.log('fullName is ', fullName.value); // fullName is 李四
console.log('fullName is ', fullName.value); // fullName is 李四

const imState2 = readonly(stateRef);
console.log(imState2.value === stateRef.value); // false
