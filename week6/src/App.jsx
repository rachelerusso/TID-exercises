import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import TodoList from "./components/TodoList.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import "./App.css";

import Parse from "parse";

Parse.initialize(
  "n1cIZm2X8RGLptMjifzhMuSULn1lmr1txeD8drR3", //appId
  "NXQu7KqU1808lihJae96bzOm1VRYFYsVddpHUBXb", //javascriptKey
);
Parse.serverURL = "https://parseapi.back4app.com/"; //api url

function App() {
  const [user, setUser] = useState(Parse.User.current());

  function handleAuthenticated(loggedInUser) {
    setUser(loggedInUser);
  }

  // conditional early return
  if (!user) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  function handleLogout() {
    Parse.User.logOut().then(() => setUser(null));
  }

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <div className="main-inner">
        <TodoList username={user.get("username")} userId={user.id} />
      </div>
    </>
  );
}

export default App;
