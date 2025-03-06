import "./App.css";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <main className="flex flex-col justify-start items-center h-full w-full gap-2 p-12 main-container">
      <h1 className="text-3xl font-bold">Todo List - Infimatrix</h1>
      <TodoForm />
      <TodoList />
      <ToastContainer />
    </main>
  );
}

export default App;
