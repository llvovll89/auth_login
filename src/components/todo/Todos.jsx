import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form, InputGroup, ButtonGroup } from 'react-bootstrap';
import TodosDataService from '../../context/UserAuthContext'
import './Todos.css';

export const Todos = () => {
    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("사용가능")
    const [use, setUse] = useState(true);
    const [msg, setMsg] = useState({ err: false, message: "" })

    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");
        if (title === "" || username === "" || desc === "") {
            setMsg({ err: true, message: "TITLE, NAME, DESC PLZ 😡" })
            console.log(msg)
            return
        }

        const newTodo = {
            title,
            username,
            desc,
            status
        }

        console.log(newTodo);

        try {
            await TodosDataService.addTodos(newTodo);
            setMsg({ err: false, message: "새로운 할일목록 성공!" })
        } catch (error) {
            setMsg({ err: true, message: error.message });
        }

        setTitle("");
        setUsername("");
        setDesc("");

        // submit 시 todo페이지로 (All list)
        history('/todo')
    }

    return (
        <>
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
                    </Form.Group>

                    <ButtonGroup aria-label="Basic example" className="mb-3">
                        <Button variant='success' disabled={use} onClick={() => {
                            setStatus('사용가능.')
                            setUse(true);
                        }}>사용가능</Button>
                        <Button variant="danger" disabled={!use} onClick={() => {
                            setStatus('사용불가.')
                            setUse(false);
                        }}>사용불가</Button>
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
