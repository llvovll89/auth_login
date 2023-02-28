import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form, InputGroup, ButtonGroup } from 'react-bootstrap';
import TodosDataService from '../../context/UserAuthContext'
import './Todos.css';
import Header from '../header/Header';

export const Todos = ({ id, setTodoId }) => {
    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("성공")
    const [todays , setTodays] = useState("");
    const [use, setUse] = useState(true);
    const [msg, setMsg] = useState({ err: false, message: "" })

    const history = useNavigate();

    // today 날짜
    const today = new Date();
    const year = today.getFullYear();
    const hour = today.getHours();
    const min = today.getMinutes();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const modified  = `${year}-${month}-${day} | ${hour} : ${min}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");
        if (title === "" || username === "" || desc === "") {
            setMsg({ err: true, message: "TITLE, NAME, DESC PLZ 😡" })
            return
        }

        const newTodo = {
            title,
            username,
            desc,
            status,
            todays
        }

        try {
            if (id !== undefined && id !== "") {
                await TodosDataService.updateTodos(id, newTodo);
                setTodoId("");
                setMsg({ err: false, message: "수정에 성공하였습니다!" })
            } else {
                await TodosDataService.addTodos(newTodo);
                setMsg({ err: false, message: "새로운 할일목록 성공!" })
            }

        } catch (error) {
            setMsg({ err: true, message: error.message });
        }

        setTitle("");
        setUsername("");
        setDesc("");

        // submit 시 todo페이지로 (All list)
        setTimeout(() => {
            history('/main')
        } , 2000)
    }

    const dateClick = () => {
        setTodays(modified)
    }

    const editBtnClick = async () => {
        setMsg("");
        try {
            const todoGet = await TodosDataService.getTodos(id);
            // collection data 변경
            setTitle(todoGet.data().title);
            setUsername(todoGet.data().username);
            setDesc(todoGet.data().desc);
            setStatus(todoGet.data().status);
            setTodays(todoGet.data().todays)
        } catch (error) {
            setMsg({ err: true, message: error.message });
        }
    }

    useEffect(() => {
        if (id !== undefined && id !== "") {
            editBtnClick();
        }
    }, [id])


    return (
        <>
            <Header />
            <div className="todo_container">
                {msg?.message && (<Alert id="todo_alert" variant={msg?.err ? "danger" : "success"} dismissible onClose={() => setMsg("")}>{msg?.message}</Alert>)}
                <Form id="todo_form" onSubmit={handleSubmit}>
                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Text id="text">TITLE</InputGroup.Text>
                            <Form.Control id="input_text" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Todo 기록' autoComplete='off' />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Text id="text">NAME</InputGroup.Text>
                            <Form.Control id="input_text" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Todo 기록' />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="할일을 적어보세용~!"
                            style={{ height: '200px' }}
                        />
                        <Button className='date_btn' variant="success" style={{width: "100%"}}  onClick={dateClick}>날짜넣기</Button>
                    </Form.Group>

                    <ButtonGroup aria-label="Basic example" className="mb-1">
                        <Button variant='success' disabled={use} onClick={() => {
                            setStatus('성공')
                            setUse(true);
                        }}>성공</Button>
                        <Button variant="danger" disabled={!use} onClick={() => {
                            setStatus('실패')
                            setUse(false);
                        }}>실패</Button>
                    </ButtonGroup>
                    
                    <div className="d-grid gap-2"> 
                    <Button variant="primary" type="Submit" onSubmit={handleSubmit}>
                            Add/ Update
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}
