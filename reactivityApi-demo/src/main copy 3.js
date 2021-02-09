import {reactive, readonly, ref, computed} from 'vue';

function useUser(){
  const originUser = reactive({});
  const user = readonly(originUser);
  const setUserName = name => {
    originUser.name = name;
  };
  const setUserAge = age => {
    originUser.age = age;
  }
  return {
    user,
    setUserName,
    setUserAge
  }
}

window.myUser = useUser();

