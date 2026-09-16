import { useState } from "react";
import NewTodoForm from "./NewTodoForm.jsx";
import { useEffect } from "react";
import "./ToDoList.css";

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button className="todo-item button" onClick={() => onDelete(todo.id)}>
        {" "}
        Delete{" "}
      </button>
    </li>
  );
}

function loadTodos() {
  const saved = localStorage.getItem("todos");
  return saved
    ? JSON.parse(saved)
    : [{ id: "1", text: "Buy milk", done: false }];
}

export default function TodoList() {
  const [todos, setTodos] = useState(loadTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAdd(text) {
    const newTodo = {
      id: crypto.randomUUID(),
      text: text,
      done: false,
    };
    setTodos([...todos, newTodo]);
  }

  function handleToggle(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
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
