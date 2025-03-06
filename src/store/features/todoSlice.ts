import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../types";

const initialState: { todos: Todo[]; loading: boolean; error: string } = {
  todos: [],
  loading: false,
  error: "",
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,

  reducers: {
    addTodo: (state, action) => {
      const newTodo: Todo = {
        id: Date.now(),
        ...action.payload,
        completed: false,
      };

      state.todos.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    toggleTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    copyFromLocalStorage: (state) => {
      state.todos = JSON.parse(localStorage.getItem("todos") || "[]");
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, copyFromLocalStorage } =
  todoSlice.actions;
export default todoSlice.reducer;
