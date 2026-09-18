import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import TodoList from "./TodoList.jsx";
import "./App.css";

import Parse from "parse";

Parse.initialize(
  "n1cIZm2X8RGLptMjifzhMuSULn1lmr1txeD8drR3",
  "NXQu7KqU1808lihJae96bzOm1VRYFYsVddpHUBXb",
);
Parse.serverURL = "https://parseapi.back4app.com/";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="main-inner">
        <TodoList />
      </div>
    </>
  );
}

export default App;
