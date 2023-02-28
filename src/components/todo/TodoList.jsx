import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TodosDataService from '../../context/UserAuthContext'

const TodoList = ({ getTodosId }) => {
    const [todos, setTodos] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        getTodos();
    }, []);

    const addTodos = () => {
        history('/todos')
    }

    const getTodos = async () => {
        const data = await TodosDataService.getAllTodos();
        console.log(data.docs);
        setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const delBtnClick = async (id) => {
        await TodosDataService.delTodos(id);
        getTodos();
    }

    return (
        <>
            <section className='todos_list'>
                <div className="refresh">
                    <Button variant='dark' onClick={getTodos}>LIST 새로고침</Button>
                </div>
                <div className="add_todos">
                    <Button variant='success' onClick={addTodos}>할일 추가</Button>
                </div>
                <div className="todos_container">
                    {todos.map((todo, index) => {
                        return (
                            <div className='todo_content' key={todo.id}>
                                <div className="textbox">
                                    <span>No.{index + 1}</span>
                                    <span>TITLE: {todo.title}</span>
                                    <span>USERNAME: {todo.username}</span>
                                    <span>DESC: {todo.desc && `${todo.desc.substr(0, 50) + "..."}`}</span>
                                    <span>사용여부: {todo.status}</span>
                                </div>
                                <Button variant='secondary' className='edit_btn' onClick={(e) => getTodosId(todo.id)}>수정하기</Button>
                                <Button variant='danger' className='del_btn' onClick={(e) => delBtnClick(todo.id)}>삭제하기</Button>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default TodoList