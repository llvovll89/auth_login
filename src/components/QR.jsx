import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const QR = () => {
    const histrory = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            histrory('/');
        }, 2000);
    }, [histrory])

    return (
        <div>QR</div>
    )
}
