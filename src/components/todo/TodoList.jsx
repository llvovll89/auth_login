import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import TodosDataService from '../../context/UserAuthContext'
import Header from '../header/Header';
import { Link } from 'react-router-dom';

const TodoList = ({ getTodosId }) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getTodos();
    }, []);


    const getTodos = async () => {
        const data = await TodosDataService.getAllTodos();
        console.log(data);
        setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const delBtnClick = async (id) => {
        const qna = window.confirm('정말 삭제 하시겠습니까?');
        if(qna){
            await TodosDataService.delTodos(id);
            getTodos();
        }
    }

    return (
        <>  
            <Header />
            <section className='todos_list'>
               {/* <div className="refresh">
                    <Button variant='dark' onClick={getTodos}>LIST 새로고침</Button>
    </div> */}
                <div className="todos_container">
                <div className="content-head">
                            <div className="th"> 
                            <span>category</span>
                            </div>   
                            <div className="th">    
                                <span>No</span>
                                </div>
                                <div className="th">
                                <span>Title</span>
                                </div>
                                <div className="th">
                                <span>Author</span>
                                </div>
                                <div className="th">
                                <span>Date</span>
                                </div>
                            </div>
                    {todos.map((todo, index) => {
                        return (
                            <div className='todo_content' key={todo.id}>
                                <div className="textbox">
                                <span className='status'>{todo.status}</span>
                                    <span>{index >= 10 ? index : index + 1}</span>
                                    <Link to="/detail"><span className='title'>{todo.title}</span></Link>
                                    <span className='username'>{todo.author && todo.author.substr(0, 6)}</span>
                                    <span className='date'>{todo.todays}</span>
                                </div>
                                <div className="todos_bottom">
                                <div className="bottom_text">
                                    <span>호짱 게시판</span>
                                    <span>// 우측 버튼위치 또는 page새로</span>
                                </div>
                                <div className="btnbox">
                                <Button variant='secondary' className='edit_btn' onClick={(e) => getTodosId(todo.id)}>Edit</Button>
                                <Button variant='danger' className='del_btn' onClick={(e) => delBtnClick(todo.id)}>Delete</Button>
                                </div>
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

// <span className='desc'>{todo.desc && `${todo.desc.substr(0, 50) + "..."}`}</span>