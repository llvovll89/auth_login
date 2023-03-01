import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useUserAuth } from "../../context/UserAuthContext";
import './Header.css';

const Header = () => {
    const { user } = useUserAuth();

    return (
        
        <>
        <header className="header">
        <div className="logo">{user.email && user.email.substring(0, user.email.indexOf('@'))}</div>
                <ul className="navbars">
                    <li>
                        <Link to="/main">
                            <Button>MAIN</Button>
                        </Link>
                    </li>
                    <li>
                    <Link to="/todos">
                    <Button variant='success' >Add</Button>
                        </Link>
                    </li>
                </ul>
            <div className="auth">
                        <Link to="/resister">
                            <Button variant='dark'>USER</Button>
                        </Link>
            </div>
        </header>
    </>
  )
}

export default Header