import { useState } from "react";

export default function NewTodoForm({ onAdd }) {
  // ricevo onAdd come PROP (viene da TodoList) è (sotto altro nome) handleAdd
  const [text, setText] = useState(""); //creo text come STATE LOCALE

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(text); // chiama handleAdd(text) di TodoList — qui avviene il "collegamento"
    setText(""); //resetta lo state locale text
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text} // l'input MOSTRA sempre il valore corrente di text
          onChange={(e) => setText(e.target.value)} // OGNI volta che l'utente digita un carattere, aggiorna text
          placeholder="Write a new task..."
        />
        <button disabled={text.trim().length === 0} type="submit">
          Add
        </button>
      </form>
    </>
  );
}
