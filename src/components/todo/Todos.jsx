import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form, InputGroup, ButtonGroup } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/ko';
import TodosDataService from '../../context/UserAuthContext'
import Header from '../header/Header';
import './Todos.css';

// 날짜 (YYYY MMMM Do ) 생략
const myDate = moment().format(`MMM Do`);

export const Todos = ({ id, setTodoId }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("꿀잼")
    const [todays , setTodays] = useState("");
    const [use, setUse] = useState(true);
    const [msg, setMsg] = useState({ err: false, message: "" })

    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");
        if (title === "" || author === "" || desc === "") {
            setMsg({ err: true, message: "TITLE, NAME, DESC PLZ 😡" })
            return
        }

        const newTodo = {
            title,
            author,
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
        setAuthor("");
        setDesc("");

        // submit 시 todo페이지로 (All list)
        setTimeout(() => {
            history('/main')
        } , 2000)
    }

    const dateClick = () => {
        setTodays(myDate)
    }

    const editBtnClick = async () => {
        setMsg("");
        try {
            const todoGet = await TodosDataService.getTodos(id);
            // collection data 변경
            setTitle(todoGet.data().title);
            setAuthor(todoGet.data().username);
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
                            <Form.Control id="input_text" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='TITLE..' autoComplete='off' />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Text id="text">NAME</InputGroup.Text>
                            <Form.Control id="input_text" type="text" maxLength="8" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='USERNAME..' />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="DESC..."
                            style={{ height: '200px' }}
                        />
                        <Button className='date_btn' variant="success" style={{width: "100%"}}  onClick={dateClick}>날짜넣기</Button>
                    </Form.Group>

                    <ButtonGroup aria-label="Basic example" className="mb-1">
                        <Button variant='success' disabled={use} onClick={() => {
                            setStatus('꿀잼')
                            setUse(true);
                        }}>꿀잼</Button>
                        <Button variant="danger" disabled={!use} onClick={() => {
                            setStatus('노잼')
                            setUse(false);
                        }}>노잼</Button>
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
