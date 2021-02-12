<template>
  <div class="todo">
    <h1 class="top-title">todos</h1>
    <div class="box">
      <div class="input-wrap new-todo">
        <input class="select" type="checkbox" v-model="allDoneRef" />
        <input
          class="input"
          type="text"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addTodo"
        />
      </div>
      <ul class="todo-list">
        <li class="input-wrap" v-for="todo in filterTodoRef" :key="todo.id">
          <input class="select" type="checkbox" v-model="todo.completed" />
          <div class="title-wrap">
            <input
              v-show="todo === curEditTodoRef"
              class="input"
              type="text"
              v-model="todo.title"
              @blur="onEditDone(todo)"
              @keyup.enter="onEditDone(todo)"
              @keyup.esc="onEditCancle(todo)"
            />
            <p
              class="title"
              :class="{ completed: todo.completed }"
              @dblclick="onEditTodo(todo)"
            >
              {{ todo.title }}
            </p>
          </div>
          <span
            class="delete"
            v-show="todo !== curEditTodoRef"
            @click="onDelete(todo)"
            >x</span
          >
        </li>
      </ul>
      <div class="bottom" v-show="todoListRef.length > 0">
        <div class="item">
          {{ activeNumRef }} item{{ activeNumRef === "1" ? "" : "s" }} left
        </div>
        <ul class="filter-list">
          <li
            v-for="filter in filterList"
            :key="filter.key"
            :class="{ selected: filter.key === curFilterRef }"
            @click="onFilter(filter.key)"
          >
            {{ filter.title }}
          </li>
        </ul>
        <div class="btn" v-show="completedNumRef > 0" @click="onDelete(null)">
          Clear completed
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useTodoList from "./composition/useTotoLitst.js";
import useNewTodo from "./composition/useNewTodo.js";
import useFilterTodo from "./composition/useFilterTodo";
import useEditTodo from "./composition/useEditTodo";
import useDeleteTodo from "./composition/useDeleteTodo";

export default {
  setup() {
    const { todoListRef } = useTodoList();
    return {
      todoListRef,
      ...useNewTodo(todoListRef),
      ...useFilterTodo(todoListRef),
      ...useEditTodo(todoListRef),
      ...useDeleteTodo(todoListRef),
    };
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
