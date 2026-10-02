import { useState } from "react";
import NewTodoForm from "./NewTodoForm.jsx";
import TodoItem from "./TodoItem.jsx";
import { useEffect } from "react";
import NewListForm from "./NewListForm.jsx";
import {
  fetchTodos,
  createTodo,
  setTodoDone,
  deleteTodo,
} from "../services/todoService.js";

import { createList, fetchLists } from "../services/listService.js";

export default function TodoList({ username, userId }) {
  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function load() {
      const allTodos = await fetchTodos();
      setTodos(allTodos.filter((todo) => todo.user === userId)); //Refactor the useEffect to filter the items after they are fetched (fetch takes all the elements from the db )
      const allLists = await fetchLists();
      setLists(allLists);
    }
    load();
  }, [userId]);

  //Refactor your handleAdd to include the userId + vedi userId={user.id} in app.jsx
  async function handleAdd(newTask, list) {
    const created = await createTodo(newTask, list);
    setTodos([...todos, created]);
  }

  async function handleAddList(name) {
    const created = await createList(name);
    setLists([...lists, created]); //set the lists to include the item we created
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
      <h1> To Do List for {username} </h1>

      <NewListForm onAdd={handleAddList} />
      {lists.length === 0 ? (
        <p>No lists yet.</p>
      ) : (
        <ul>
          {lists.map((list) => (
            <li key={list.id}>
              {list.get("name")}
              <NewTodoForm list={list} onAdd={handleAdd} />
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
