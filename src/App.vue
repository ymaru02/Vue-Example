<template>
  <div id="app">
    <h1>Todo List</h1>
    <h2>ALL Todos: {{ allTodosCount }} </h2>
    <h2>Completed Todos: {{ completedTodosCount }} </h2>
    <h2>UnCompleted Todos: {{ uncompletedTodosCount }} </h2>
    <TodoForm />
    <TodoList />
  </div>
</template>

<script>
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoForm,
    TodoList,
  },
  computed: {
    allTodosCount () {
        return this.$store.getters.allTodosCount
    },
    completedTodosCount () {
        return this.$store.getters.completedTodosCount
    },
    uncompletedTodosCount () {
        return this.$store.getters.uncompletedTodosCount
    },
  },
  created() {
    this.$store.dispatch('readTodo')
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
