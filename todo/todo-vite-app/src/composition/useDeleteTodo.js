import { filter } from '../util/tosoStorage';

export default function useDeleteTodo(todoListRef) {
  const onDelete = (todo) => {
    if (todo) {
      console.log(todoListRef.value.indexOf(todo))
      todoListRef.value.splice(todoListRef.value.indexOf(todo), 1);
    } else {
      todoListRef.value = filter(todoListRef.value, 'active');
    }
  }
  return {
    onDelete
  }
}