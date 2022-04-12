import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
  },
  getters: {
    allTodosCount(state) {
      return state.todos.length
    },
    completedTodosCount(state) {
      return state.todos.filter(todo => {
        return todo.completed
      }).length
    },
    uncompletedTodosCount(state) {
      return state.todos.filter(todo => {
        return !(todo.completed)
      }).length
    }
  },
  mutations: {
    // state 변경 요소 todos에 todo 추가
    // 동기적
    CREATE_TODO(state, newTodo) {
      state.todos.push(newTodo)
    },
    DELETE_TODO(state, targetTodo) {
      state.todos.splice(state.todos.indexOf(targetTodo), 1)
    },
    UPDATE_TODO(state, targetTodo) {
      state.todos = state.todos.map(todo => {
        if (todo.id === targetTodo.id) {
          return  {
            ...todo,
            ...targetTodo,
          }
        } 
        return todo
      })
    },
    SET_TODOS(state, todos) {
      state.todos = todos
    }
  },
  
  actions: {
    // state 변경 요소 todos에 todo 추가하는 commit 발생
    createTodo(context, content) {
      const newTodo = {
        id: new Date().getTime(),
        completed: false,
        content,
      }
      // 비동기 처리 할 수 있음
      localStorage.setItem('todos', JSON.stringify([
        ...context.state.todos,
        newTodo
      ]))
      context.commit('CREATE_TODO', newTodo)
    },
    deleteTodo ({ commit, state }, targetTodo) {
      // state의 todos에서 해당 todo를 제거하는 commit 을 발생 시킨다
      
      // 비동기!!
      const newTodos = state.todos.filter(todo => {
        return todo.id !== targetTodo.id
      })
      localStorage.setItem('todos', JSON.stringify(newTodos))
      commit('DELETE_TODO', targetTodo)
    },
    updateTodo ({ commit, state }, targetTodo) {
      const newTodos = state.todos.map(todo => {
        if (todo.id === targetTodo.id) {
          return {
            ...todo,
            ...targetTodo
          }
        }
        else {
          return todo
        }
      })
      localStorage.setItem('todos', JSON.stringify(newTodos))
      commit('UPDATE_TODO', targetTodo)
    },
    readTodo({ commit }) {
      const todos = JSON.parse(localStorage.getItem('todos')) || []
      commit('SET_TODOS', todos)
    },
  },
  modules: {
  }
})
