import { useState } from "react";
import NewTodoForm from "./NewTodoForm.jsx";
import TodoItem from "./TodoItem.jsx";
import { useEffect } from "react";
import {
  fetchTodos,
  createTodo,
  setTodoDone,
  deleteTodo,
} from "../services/todoService.js";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function load() {
      setTodos(await fetchTodos());
    }
    load();
  }, []);

  async function handleAdd(newTask) {
    const created = await createTodo(newTask);
    setTodos([...todos, created]);
  }

  async function handleToggle(id) {
    const todo = todos.find((t) => t.id === id);
    await setTodoDone(id, !todo.done);
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  async function handleDelete(idToDelete) {
    await deleteTodo(idToDelete);
    setTodos(todos.filter((each) => each.id !== idToDelete));
  }

  return (
    <div className="todo-container">
      <h1> My To Do List ({todos.length})</h1>
      <NewTodoForm onAdd={handleAdd} />
      {todos.length === 0 ? (
        <p>Nothing to do. Enjoy the afternoon.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
