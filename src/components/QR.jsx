import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const QRcontainer = styled.section`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #181818;
    .text {
        display: flex;
        flex-flow: column;
        border: 1px solid #ccc;
        padding: 12px;
        color: red;
        text-align: center;
        border-radius: 12px;
        /* box-shadow: 0 6px 12px rgba(255,255,255,0.13); */
    }
    .text h1 {
        letter-spacing: 0.12rem;
    }
    .text span {
        display: inline-block;
        font-weight: 700;
        font-size: 1.15rem;
    }
`

export const QR = () => {
    const histrory = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            histrory('/');
        }, 2000);
    }, [histrory])

    return (
        <>
            <QRcontainer>
                <div className='text'>
                    <h1>404 Not Found page</h1>
                    <span>QR Page preparing </span>
                </div>
            </QRcontainer>
        </>
    )
}
