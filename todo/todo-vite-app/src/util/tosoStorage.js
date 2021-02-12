const LOCAL_KEY = 'todomvc';

// 获取唯一id
export function generateId() {
  return +new Date() + Math.random().toString(16).substr(2, 6);
}

// 获取todo列表
export function fetch() {
  const list = localStorage.getItem(LOCAL_KEY);
  if (list) {
    return JSON.parse(list);
  }
  return [];
}

// 保存todo
export function save(list) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
}

// 筛选todo
export function filter(list, filter) {
  if (filter === 'all') {
    return list;
  } else if (filter === 'active') {
    return list.filter(todo => !todo.completed);
  } else if (filter === 'completed') {
    return list.filter(todo => todo.completed);
  }
  return new Error('invalid filter value');
}