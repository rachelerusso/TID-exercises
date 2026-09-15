//week2: Add useState for todos + form
import { useState } from "react";
import NewTodoForm from "./NewTodoForm.jsx";
import { useEffect } from "react";

/*const SAMPLE_TASKS = [
  "Buy milk",
  "Call the landlord",
  "Book the dentist",
  "Water the plants",
];

function randomTask() {
  return SAMPLE_TASKS[Math.floor(Math.random() * SAMPLE_TASKS.length)];
}*/

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}> Delete </button>
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
  //const [todos, setTodos] = useState(["Buy milk"]); //initial state of the component to be modified in object
  const [todos, setTodos] = useState(loadTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAdd(text) {
    const newTodo = {
      id: crypto.randomUUID(), //genera un id univoco
      text: text,
      done: false,
    };
    setTodos([...todos, newTodo]); // Usi la funzione setter per aggiornare lo stato (creando un nuovo array, not a push)
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
    <>
      <h1> My To Do List ({todos.length})</h1>
      <NewTodoForm onAdd={handleAdd} />
      {todos.length === 0 ? (
        <p>Nothing to do. Enjoy the afternoon.</p>
      ) : (
        <ul>
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
    </>
  );
}
