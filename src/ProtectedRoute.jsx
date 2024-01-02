import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const { Component } = props;

    useEffect(() => {
        let login = localStorage.getItem('student_token');
        if (!login) {
            toast.error("Login first to access !!")
            navigate('/')
        }
    }, [])

    return (
        <div>
            <Component />
        </div>
    )
}

export default ProtectedRoute;