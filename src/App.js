import React, { useEffect, useState } from "react";
import Main from "./components/Main";
import { UserContextProvider } from "./context/UserAuthContext";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ProtectRoute } from "./components/ProtectRoute";
import { Todos } from "./components/todo/Todos";
import { QR } from "./components/QR";
import TodoList from "./components/todo/TodoList";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [todoId, setTodoId] = useState("");

  const history = useNavigate();
  const getTodoHandler = (id) => {
    console.log(`The ID of Document to be edited : ${id}`);
    setTodoId(id);
    history("/todos");
  };

  const { innerHeghit } = window;
  useEffect(() => {
    window.addEventListener("DOMContentLoaded", (e) => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${innerHeghit}px`
      );
    });
  }, [innerHeghit]);

  return (
    <>
      <div id="wrap">
        <UserContextProvider>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route
              path="/main"
              element={
                <ProtectRoute>
                  <Main />
                </ProtectRoute>
              }
            />
            <Route path="/qrlogin" element={<QR />} />
            <Route
              path="/todos"
              element={<Todos id={todoId} setTodoId={setTodoId} />}
            />
            <Route
              path="/todo"
              element={<TodoList getTodosId={getTodoHandler} />}
            />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </UserContextProvider>
      </div>
    </>
  );
}

export default App;
