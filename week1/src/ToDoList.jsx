//questo viene implementato usando gli stati vedi week 2
const todos = ["Buy milk", "Book the dentist", "Call the landlord"];

function TodoItem({ text }) {
    return <li>{text}</li>;         
  }


export default function TodoList() {
  function handleAdd() {
    todos.push("New task");
    console.log("Add was clicked");   //in console la variabile cambia, ma lo schermo non si aggiorna
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