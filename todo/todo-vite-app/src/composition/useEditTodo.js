import { ref, computed } from 'vue';

let originTitle = '';
export default function useEditTodo(todoListRef) {
  const curEditTodoRef = ref(null);
  const onEditTodo = (todo) => {
    originTitle = todo.title;
    curEditTodoRef.value = todo;
  }
  const onEditDone = (todo) => {
    curEditTodoRef.value = null;
    const editValue = todo.title.trim();
    if (editValue) {
      todo.title = editValue;
    } else { // 删除
      const index = todoListRef.value.indexOf(todo);
      index >= 0 && todoListRef.value.splice(index, 1);
    }

  }
  const onEditCancle = (todo) => {
    curEditTodoRef.value = null;
    todo.title = originTitle;
  }
  const allDoneRef = computed({
    get() {
      return todoListRef.value.filter(it => !it.completed).length === 0;
    },
    set(checked) {
      todoListRef.value.forEach(it => {
        it.completed = checked;
      });
    }
  })
  return {
    curEditTodoRef,
    allDoneRef,
    onEditTodo,
    onEditDone,
    onEditCancle
  }
}