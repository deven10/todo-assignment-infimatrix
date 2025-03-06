import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/features/todoSlice";
import { generateToast } from "../utils";

export const TodoForm = () => {
  const dispatch = useDispatch();

  const initialTodoState = {
    title: "",
    description: "",
    dueDate: "",
  };
  const [todo, setTodo] = useState(initialTodoState);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todo.title.trim() && todo.description.trim() && todo.dueDate) {
      dispatch(addTodo(todo));
      generateToast("Todo Added Successfully!", "success");
      setTodo(initialTodoState);
    } else {
      if (todo.title === "") {
        generateToast("Title is required!", "error");
      } else if (todo.description === "") {
        generateToast("Description is required!", "error");
      } else if (todo.dueDate === "") {
        generateToast("Due Date is required!", "error");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="my-3 flex flex-col bg-[#0003] rounded p-2 w-full">
      <h2 className="text-center">Create New Todo</h2>
      <form onSubmit={handleAddTodo} className="flex flex-col gap-2 px-1">
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={todo.title}
            onChange={handleChange}
            name="title"
            id="title"
            // required
            className="border rounded border-white px-2 py-1 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={todo.description}
            onChange={handleChange}
            name="description"
            id="description"
            // required
            className="border rounded border-white px-2 py-1 outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="dueDate">Due date</label>
          <input
            type="date"
            value={todo.dueDate}
            onChange={handleChange}
            name="dueDate"
            id="dueDate"
            // required
            className="border rounded border-white px-2 py-1 outline-none"
          />
        </div>
        <button
          className="p-1 my-2 border cursor-pointer rounded bg-[#111] text-white border-black"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};
