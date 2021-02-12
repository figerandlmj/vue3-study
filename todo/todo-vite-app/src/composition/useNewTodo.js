import { ref } from 'vue';
import { generateId } from '../util/tosoStorage.js';

export default function useNewTodo(todoListRef) {
  const newTodoRef = ref('');
  const addTodo = () => {
    const value = newTodoRef.value.trim();
    if (!value) return;
    const todo = {
      id: generateId(),
      title: value,
      completed: false
    }
    todoListRef.value.push(todo);
    newTodoRef.value = '';
  }
  return {
    newTodoRef,
    addTodo
  }
}