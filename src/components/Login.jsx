import React, { useState } from 'react'
import styled from 'styled-components'
import { useUserAuth } from '../context/UserAuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Container } from 'react-bootstrap'
import GoogleButton from 'react-google-button'

const Form = styled.form`
display: block;
padding-top: 60px;
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

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();
    const history = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            // submit 성공시 - logIn(email, password) 담기
            await logIn(email, password)
            // 가입시 -> router="/" 돌아가기 (useNaviagate로 리다이렉션) -> /main 로 바꿀것
            history('/todos')
        } catch (err) {
            // err 시 bootstrap Alert 창 띄우기
            setError(err.message)
        }

    }

    const googleLogin = async () => {
        try {
            await googleSignIn();
            history('/todos');
        } catch (error) {
            setError(error.message);
        }
    }

    const tapBtn = document.querySelectorAll('li button')
    tapBtn.forEach((btns) => {
        btns.addEventListener('click', () => {
            tapBtn.forEach((list) => {
                list.classList.remove('taps')
            })
            btns.classList.add('taps')
        })
    })

    return (

        <>
            <section className="login">
                <Container>
                    <div className="login_header">
                        <h2 className="login_title">
                            <Link to="/main">HOXEN</Link>
                        </h2>
                        <div className="login_center"></div>
                        <div className="login_tap">
                            <ul>
                                <li><button className='tap_btn' >ID 로그인</button></li>
                                <li><button className='tap_btn' >일회용 로그인</button></li>
                                <li><button className='tap_btn' ><Link to="/qrlogin">QR 로그인</Link></button></li>
                            </ul>
                        </div>
                    </div>
                    <Form onSubmit={loginSubmit}>
                        <input className='login_input' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='ID 또는 Email 입력..' />
                        <input className='login_input' onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='비밀번호입력..' />
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <button className='login_btn' type="submit">호슨ID 로그인</button>
                    </Form>
                    <p className='login_menu'>
                        <Link to="/signup">회원가입</Link>
                        <Link>ID 찾기</Link>
                        <Link>비밀번호 찾기</Link>
                    </p>
                    <GoogleButton style={{ width: "100%", marginTop: "12px" }} type="dark" onClick={googleLogin} />
                </Container>
            </section>
        </>
    )
}
