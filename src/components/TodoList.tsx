import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  copyFromLocalStorage,
  deleteTodo,
  toggleTodo,
} from "../store/features/todoSlice";
import { formatDate } from "../utils";
import { useEffect, useState } from "react";
import { Todo } from "../types";

export const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const [todosData, setTodosData] = useState<Todo[]>([]);
  const [selectedType, setSelectedType] = useState("All");

  // updating redux todos slice with local storage todos
  useEffect(() => {
    const localStorageTodos = localStorage.getItem("todos");
    if (localStorageTodos) {
      dispatch(copyFromLocalStorage(JSON.parse(localStorageTodos)));
    }
  }, [dispatch]);

  // updating local todo state once redux todo slice updates
  useEffect(() => {
    const filteredTodos =
      selectedType === "Completed"
        ? todos.filter((todo) => todo.completed)
        : selectedType === "Pending"
        ? todos.filter((todo) => !todo.completed)
        : todos;

    setTodosData(
      filteredTodos
        .slice()
        .sort(
          (a: Todo, b: Todo) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        )
    );
  }, [todos, selectedType]);

  return (
    <>
      <div className="flex gap-3 justify-center items-center">
        <p className="text-[20px] font-normal">Filter by</p>
        <select
          className="border border-white rounded p-2 outline-none bg-[#000000b3]"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value={"All"}>All</option>
          <option value={"Completed"}>Completed</option>
          <option value={"Pending"}>Pending</option>
        </select>
      </div>
      {todosData.length > 0 ? (
        <div className="w-full">
          <p className="text-[18px] font-semibold mt-2">
            {selectedType} Todos ({todosData.length > 0 ? todosData.length : ""}
            )
          </p>
          <ul className="my-3 flex flex-col gap-3">
            {todosData.map((todo) => (
              <li
                key={todo.id}
                className="bg-[#0003] rounded px-3 py-2 flex flex-col"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between wrap gap-5 items-center">
                    <p
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      Title:{" "}
                      <span className="font-semibold"> {todo.title}</span>
                    </p>
                    <p
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                      className="font-semibold"
                    >
                      {formatDate(todo.dueDate)}
                    </p>
                  </div>
                  <p
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    Description: <br /> {todo.description}
                  </p>
                </div>
                <div className="flex gap-2 my-3">
                  <button
                    className="cursor-pointer px-2 border cursor-pointer rounded bg-[#111] text-white border-black h-max w-max"
                    onClick={() => dispatch(toggleTodo(todo.id))}
                  >
                    {todo.completed ? "Mark as not done" : "Mark as done"}
                  </button>
                  <button
                    className="cursor-pointer px-2 border cursor-pointer rounded bg-[#111] text-white border-black h-max w-max"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-[18px]">
          {selectedType === "Pending"
            ? "No Pending Todos Great 😀"
            : selectedType === "Completed"
            ? "No Completed Todos 😢"
            : "No Todos found, Please add a new one"}
        </p>
      )}
    </>
  );
};
