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
            setChange("로그아웃 합니다!")
            setTimeout(() => {
                history('/')
            }, 1500)
        } catch (error) {
            setChange(error.message);
        }
    }

    const updatePassword = async (e) => {
        e.preventDefault();
        try {
            if(password !== "" || password.length > 3){
                await changePassword(password)
                setChange('비밀번호 변경 성공!')
                setTimeout(() => {
                    history('/')
                }, 2000)
            } else {
                setChange('비밀번호를 다시 입력해주세요.');
            }
        } catch (error) {
            setChange(error.message);
        }
    }

    return (
        <>
            <section className="resister">
            <div className="p-4 box text-center">
            <h1>Password<span> 변경</span></h1>
                <span>USER: {user && user.email} 님</span>
            </div>
            <div className="d-grid gap-2">
                {change && <Alert>{change}</Alert>}
                <Form onSubmit={updatePassword}>
                    <Form.Control
                        style={{height: "56px"}}
                        type="password"
                        id="inputPassword5"
                        className='signup_password mb-3'
                        aria-describedby="passwordHelpBlock"
                        value={password}
                        autoComplete="off"
                        placeholder='바꿀 비밀번호 입력...'
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button className='w-100 mb-1' style={{ height: "52px" }} variant='primary' type="submit">비밀번호변경</Button>
                    <Button className='w-100 mb-1' style={{ height: "52px" }} variant='dark' onClick={logoutClick}>Log Out</Button>
                    <Button className='w-100' style={{ height: "52px" }} variant='success' onClick={() => history('/main')}>게시판으로</Button>
                </Form>
            </div>
            </section>
        </>
    )
}

export default Main