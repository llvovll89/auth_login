import React, { useState } from 'react'
import Header from '../components/header/Header'
import { useUserAuth } from '../context/UserAuthContext'
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap'

const Main = () => {
    const { user, logOut, changePassword } = useUserAuth();
    const [password, setPassword] = useState("");
    const [change, setChange] = useState("");
    const history = useNavigate();

    const logoutClick = async () => {
        try {
            await logOut();
            history('/')
        } catch (error) {
            console.log(error.message);
        }
    }

    const updatePassword = async (e) => {
        e.preventDefault();
        try {
            await changePassword(password)
            setChange('비밀번호 변경 성공!')
            setTimeout(() => {
                history('/main')
            }, 2000)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <Header />
            <section className="resister">
            <div className="p-4 box text-center">
            <h1>Password 변경</h1>
                <span>{user && user.email} 님</span>
            </div>
            <div className="d-grid gap-2">
                {change && <Alert>{change}</Alert>}
                <Form onSubmit={updatePassword}>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        className='mb-3'
                        aria-describedby="passwordHelpBlock"
                        value={password}
                        autoComplete="off"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button className='w-100 mb-1' style={{ height: "52px" }} variant='primary' type="submit">비밀번호변경</Button>
                    <Button className='w-100' style={{ height: "52px" }} variant='dark' onClick={logoutClick}>Log Out</Button>
                </Form>
            </div>
            </section>
        </>
    )
}

export default Main