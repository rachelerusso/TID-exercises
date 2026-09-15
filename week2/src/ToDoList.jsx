//week2: Add useState for todos + form
import { useState } from "react";
import NewTodoForm from "./NewTodoForm.jsx";

/*const SAMPLE_TASKS = [
  "Buy milk",
  "Call the landlord",
  "Book the dentist",
  "Water the plants",
];

function randomTask() {
  return SAMPLE_TASKS[Math.floor(Math.random() * SAMPLE_TASKS.length)];
}*/

function TodoItem({ text }) {
  return <li>{text}</li>;
}

export default function TodoList() {
  const [todos, setTodos] = useState(["Buy milk"]); //initial state of the component

  function handleAdd(text) {
    setTodos([...todos, text]); // Usi la funzione setter per aggiornare lo stato (creando un nuovo array, not a push)
  }

  return (
    <>
      <h1> My To Do List ({todos.length})</h1>
      <NewTodoForm onAdd={handleAdd} />
      <ul>
        {todos.map((text, index) => (
          <TodoItem key={index} text={text} />
        ))}
      </ul>
    </>
  );
}
