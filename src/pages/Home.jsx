import React, {useState} from 'react'
import Header from '../components/header/Header'
import TodoList from '../components/todo/TodoList'
import { useNavigate, userNavigate } from 'react-router-dom';
import { Todos } from '../components/todo/Todos';

const Home = () => {
  const [todoId, setTodoId] = useState("");

  const history = useNavigate();

  const getTodoHandler = (id) => {
    setTodoId(id);
    history("/main");
  };


  return (
    <>
      <Header />
      <TodoList getTodosId={getTodoHandler} />

    </>
  )
}

export default Home