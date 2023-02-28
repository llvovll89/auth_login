import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Emptypage = () => {
    const history = useNavigate();

  return (
    <>
        <div className="emptypage">
            <div className="notfound">
            <h1><span className="red">404 Not Fount</span> <br/> 잘못된  주소요청입니다.</h1>
            <Button variant='danger' onClick={() => history('/')}>메인페이지 가기</Button>
            </div>
        </div>
    </>
  )
}

export default Emptypage