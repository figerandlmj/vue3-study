import {reactive, readonly, ref, computed} from 'vue';

function useDebounce(obj, duration) {
  const originValue = reactive(obj);
  const value = readonly(originValue);
  let timer = null;
  const setValue = newValue => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log('值变化了');
      console.log(Object.entries(newValue))
      Object.entries(newValue).forEach(([k, v]) => {
        originValue[k] = v;
      });
      console.log(value);
    }, duration);
  }
  return {
    value,
    setValue
  }
}

const {value, setValue} = useDebounce({a: 1, b: 2}, 3000);
setValue({a: 5, c: 4});


