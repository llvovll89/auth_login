import React, { useState } from 'react'
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
        } catch (error) {
            console.log(error.message);
        }
    }

    const updatePassword = async (e) => {
        e.preventDefault();
        try {
            setChange('비밀번호 변경 성공!')
            await changePassword(password)
            setTimeout(() => {
                history('/')
            }, 2000)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <div className="p-4 box mt-3 text-center">Hello Main
                <br />
                {user && user.email}
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
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button className='w-100 mb-1' style={{ height: "52px" }} variant='primary' type="submit">비밀번호변경</Button>
                    <Button className='w-100' style={{ height: "52px" }} variant='dark' onClick={logoutClick}>Log Out</Button>
                </Form>
            </div>
        </>
    )
}

export default Main