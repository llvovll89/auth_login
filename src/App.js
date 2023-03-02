import React, { useState } from 'react';
import Main from './components/Resister';
import { UserContextProvider } from './context/UserAuthContext';
import Resister from './components/Resister';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ProtectRoute } from './components/ProtectRoute';
import { Todos } from './components/todo/Todos';
import { QR } from './components/QR';
import TodoList from './components/todo/TodoList';
import Home from './pages/Home';
import Emptypage from './components/Emptypage';
import 'bootstrap/dist/css/bootstrap.css';
import DetailPages from './components/detailpage/DetailPages';

function App() {
  const [todoId, setTodoId] = useState('');

  const history = useNavigate();
  const getTodoHandler = (id) => {
    setTodoId(id);
    history('/todos');
  };

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
                <TodoList getTodosId={getTodoHandler} />
                </ProtectRoute>
              }
            />
            <Route path="/detail" element={<DetailPages getTodosId={getTodoHandler} />} />
            <Route path="/qrlogin" element={<QR />} />
            <Route
              path="/todos"
              element={<Todos id={todoId} setTodoId={setTodoId} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resister" element={<Resister />} />
            <Route path="*" element={<Emptypage />} />
          </Routes>
        </UserContextProvider>
      </div>
    </>
  );
}

export default App;
