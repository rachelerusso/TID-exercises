import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

import TodoList from './todoList';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TodoList/>
    </>
  );
}

export default App
