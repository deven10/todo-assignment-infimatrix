import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    addTodo: (state, action: PayloadAction<Omit<Todo, "id" | "completed">>) => {
      const newTodo: Todo = {
        id: Date.now(),
        ...action.payload,
        completed: false,
      };

      state.todos.push(newTodo);

      // Update localStorage correctly
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    toggleTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

      // Update localStorage correctly
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);

      // Update localStorage correctly
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    copyFromLocalStorage: (state) => {
      state.todos = JSON.parse(localStorage.getItem("todos") || "[]");
    },
  },
  // reducers: {
  //   addTodo: (state, action) => {
  //     const newTodo = {
  //       id: Date.now(),
  //       title: action.payload.title,
  //       description: action.payload.description,
  //       dueDate: action.payload.dueDate,
  //       completed: false,
  //     };

  //     state.todos.push(newTodo);

  //     // Update localStorage correctly
  //     localStorage.setItem("todos", JSON.stringify(state.todos));

  //     // updating local storage
  //     // const localStorageTodos = localStorage.getItem("todos");
  //     // console.log("localStorageTodos: ", localStorageTodos);
  //     // const updatedLocalStorageTodos =
  //     //   localStorageTodos && JSON.parse(localStorageTodos).length > 0
  //     //     ? JSON.parse(localStorageTodos).push(newTodo)
  //     //     : JSON.stringify([newTodo]);

  //     // console.log("updatedLocalStorageTodos: ", updatedLocalStorageTodos);
  //     // localStorage.setItem("todos", updatedLocalStorageTodos);
  //   },
  //   toggleTodo: (state, action) => {
  //     const todo = state.todos.find((todo) => todo.id === action.payload);
  //     if (todo) {
  //       todo.completed = !todo.completed;
  //     }

  //     // Update localStorage correctly
  //     localStorage.setItem("todos", JSON.stringify(state.todos));

  //     // updating local storage
  //     // const localStorageTodos = localStorage.getItem("todos");
  //     // const updatedLocalStorageTodos =
  //     //   localStorageTodos && localStorageTodos.length > 0
  //     //     ? JSON.parse(localStorageTodos).map((todo: Todo) =>
  //     //         todo.id === action.payload
  //     //           ? { ...todo, completed: !todo.completed }
  //     //           : todo
  //     //       )
  //     //     : [];

  //     // localStorage.setItem("todos", updatedLocalStorageTodos);
  //   },
  //   deleteTodo: (state, action) => {
  //     state.todos = state.todos.filter((todo) => todo.id !== action.payload);

  //     // Update localStorage correctly
  //     localStorage.setItem("todos", JSON.stringify(state.todos));

  //     // updating local storage
  //     // const localStorageTodos = localStorage.getItem("todos");
  //     // const updatedLocalStorageTodos =
  //     //   localStorageTodos && localStorageTodos.length > 0
  //     //     ? JSON.parse(localStorageTodos).filter(
  //     //         (todo: Todo) => todo.id !== action.payload
  //     //       )
  //     //     : [];

  //     // localStorage.setItem("todos", updatedLocalStorageTodos);
  //   },
  //   // copyFromLocalStorage: (state, action) => {
  //   //   state.todos = action.payload;
  //   // },
  //   copyFromLocalStorage: (state) => {
  //     state.todos = JSON.parse(localStorage.getItem("todos") || "[]");
  //   },
  // },
});

export const { addTodo, toggleTodo, deleteTodo, copyFromLocalStorage } =
  todoSlice.actions;
export default todoSlice.reducer;
