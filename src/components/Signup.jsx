import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'
import styled from 'styled-components'
import { Alert } from 'react-bootstrap'

const Form = styled.form`
    display: block;
padding-top: 35px;
.login_input {
    margin-bottom: 14px;
    width: 100%;
    height: 56px;
    padding: 18px 16px;
    background-color: #fff;
    font-size: 15px;
    font-weight: 500;
    transition: border-color .15s linear;
    border: 1px solid #e5e8eb;
    }
    .login_input:active,
    .login_input:focus {
        border: 2px solid #07f;
    }
    .login_btn {
    width: 100%;
    height: 60px;
    font-size: 18px;
    font-family: NEXON Gothic Bold;
    color: #fff;
    background-color: #17191d;
    transition: all .15s linear;
    }

    .login_btn:hover,
    .login_btn:active {
    background-color: #07f;
    transition: all .2s linear;
    }
`

export const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const { signUp } = useUserAuth();
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            // submit 성공시 - signUp(email, password) 담기
            await signUp(email, password)
            // 가입시 -> router="/" 돌아가기 (useNaviagate로 리다이렉션) -> /main 로 바꿀것
            history('/')
        } catch (err) {
            // err 시 bootstrap Alert 창 띄우기
            setError(err.message)
        }

    }

    return (
        <>
            <div className="signup">
                <div className="signup_header">
                    <h2>
                        <Link>HOXEN 회원가입</Link>
                    </h2>
                </div>
                <div className="signup_top">
                    <Form onSubmit={handleSubmit}>
                        {error && <Alert variant='danger' >{error}</Alert>}
                        <input className='login_input' onChange={e => setEmail(e.target.value)} value={email}
                            type="email" placeholder='ID 또는 Email 입력..' />
                        <input className='login_input' onChange={e => setPassword(e.target.value)} value={password}
                            type="password" placeholder='비밀번호입력..' />
                        <button className='login_btn' type="submit">가입하기</button>
                    </Form>
                </div>
                <div className="signup_bt">
                    <button className='account_btn'>
                        계정이 있다면 <Link to="/">Log-in</Link>
                    </button>
                </div>
            </div>
        </>
    )
}
