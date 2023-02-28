import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import TodosDataService from '../../context/UserAuthContext'
import Header from '../header/Header';

const TodoList = ({ getTodosId }) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getTodos();
    }, []);


    const getTodos = async () => {
        const data = await TodosDataService.getAllTodos();
        setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const delBtnClick = async (id) => {
        alert('정말 삭제 하시겠습니까?')
        await TodosDataService.delTodos(id);
        getTodos();
    }

    return (
        <>  
            <Header />
            <section className='todos_list'>
                <div className="refresh">
                    <Button variant='dark' onClick={getTodos}>LIST 새로고침</Button>
                </div>
                <div className="todos_container">
                    {todos.map((todo, index) => {
                        return (
                            <div className='todo_content' key={todo.id}>
                                <div className="textbox">
                                    <span>No. {index + 1}</span>
                                    <span>{todo.title}</span>
                                    <span>{todo.username}</span>
                                    <span>{todo.desc && `${todo.desc.substr(0, 50) + "..."}`}</span>
                                    <span>{todo.status}</span>
                                    <span>{todo.todays}</span>
                                </div>
                                <div className="todos_btnbox">
                                <Button variant='secondary' className='edit_btn' onClick={(e) => getTodosId(todo.id)}>수정하기</Button>
                                <Button variant='danger' className='del_btn' onClick={(e) => delBtnClick(todo.id)}>삭제하기</Button>
                                </div>
                                </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default TodoList