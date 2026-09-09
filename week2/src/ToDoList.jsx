//week2: Add useState for todos
import { useState } from "react";

  const SAMPLE_TASKS = ["Buy milk", "Call the landlord", "Book the dentist", "Water the plants"];

  function randomTask() {
    return SAMPLE_TASKS[Math.floor(Math.random() * SAMPLE_TASKS.length)];
  }

  function TodoItem({ text }) {
    return <li>{text}</li>;         
  }

export default function TodoList() {

  const [todos, setTodos] = useState(["Buy milk"]);   //initial state of the component

  function handleAdd() {
    setTodos([...todos, randomTask()]);   // Usi la funzione setter per aggiornare lo stato (creando un nuovo array, not a push)
  }

  return (
    <>
      <h1> My To Do List ({todos.length})</h1>
      <ul>
        {todos.map((text, index) => (              
          <TodoItem key={index} text={text} />
        ))}
      </ul>
      <button onClick={handleAdd}> Add </button>
    </>
  );
}